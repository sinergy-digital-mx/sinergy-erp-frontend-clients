import { Component, Inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CFDI_FORMA_PAGO_OPTIONS,
  CFDI_REGIMEN_RECEPTOR_OPTIONS,
  CFDI_USO_OPTIONS,
  defaultStampEnvironment,
  FinkokConfigurationsResponse,
  getFinkokEnvironmentConfig,
  hasFinkokEnvironmentCredentials,
  InvoiceValidationIssue,
  isLocalStampHost,
  StampSalesOrderInvoicePayload,
} from '../../models/sales-order-electronic-invoice.model';
import type { FinkokEnvironment } from '../../models/sales-order-electronic-invoice.model';
import { SalesOrder, SalesOrderLineItem, Customer } from '../../models/sales-order.model';
import {
  buildCfdiXml,
  CfdiWizardFormValues,
  defaultCfdiWizardForm,
  ensureCfdi40RootNamespaces,
  fiscalPrefixAsSeries,
  getLugarExpedicion,
  getReceptorDomicilioFiscal,
  isGenericPublicReceptor,
  SAT_GENERIC_PUBLIC_NAME,
  SAT_GENERIC_PUBLIC_RFC,
} from '../../utils/cfdi-xml-builder.util';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

export interface SalesOrderInvoiceStampDialogData {
  orderId: string;
  order: SalesOrder;
  lineItems: SalesOrderLineItem[];
  finkokConfig: FinkokConfigurationsResponse | null;
  validationIssues: InvoiceValidationIssue[];
  canStamp: boolean;
}

export interface SalesOrderInvoiceStampDialogResult {
  stamped?: boolean;
}

@Component({
  selector: 'app-sales-order-invoice-stamp-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-order-invoice-stamp-dialog.component.html',
  styleUrl: './sales-order-invoice-stamp-dialog.component.scss',
})
export class SalesOrderInvoiceStampDialogComponent implements OnInit {
  form: FormGroup;
  showXml = signal(false);
  stamping = signal(false);
  stampError = signal<string | null>(null);
  finkokConfig = signal<FinkokConfigurationsResponse | null>(null);
  stampEnvironment = signal<FinkokEnvironment>(defaultStampEnvironment());

  readonly usoOptions = CFDI_USO_OPTIONS;
  readonly formaPagoOptions = CFDI_FORMA_PAGO_OPTIONS;
  readonly regimenOptions = CFDI_REGIMEN_RECEPTOR_OPTIONS;

  selectedEnvConfig = computed(() =>
    getFinkokEnvironmentConfig(this.finkokConfig(), this.stampEnvironment())
  );

  hasSelectedEnvCredentials = computed(() =>
    hasFinkokEnvironmentCredentials(this.finkokConfig(), this.stampEnvironment())
  );

  selectedFinkokUsername = computed(() => this.selectedEnvConfig()?.finkok_username?.trim() || '');

  canSubmitStamp = computed(
    () => this.data.canStamp && this.hasSelectedEnvCredentials() && !this.stamping()
  );

  generatedXml = computed(() => {
    const values = this.form?.getRawValue() as CfdiWizardFormValues;
    if (!values) return '';
    return buildCfdiXml({
      order: this.data.order,
      lineItems: this.data.lineItems,
      form: {
        ...values,
        domicilioFiscalReceptor: getReceptorDomicilioFiscal(this.data.order) || values.domicilioFiscalReceptor,
      },
    });
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesOrderInvoiceStampDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderInvoiceStampDialogData,
    private invoiceService: SalesOrderInvoiceService,
    private toast: ToastService,
    private router: Router
  ) {
    const defaults = defaultCfdiWizardForm(data.order);
    this.finkokConfig.set(data.finkokConfig);
    this.form = this.fb.group({
      series: [defaults.series],
      folio: [defaults.folio, Validators.required],
      usoCfdi: [defaults.usoCfdi, Validators.required],
      formaPago: [defaults.formaPago, Validators.required],
      metodoPago: [defaults.metodoPago, Validators.required],
      regimenReceptor: [defaults.regimenReceptor, Validators.required],
      domicilioFiscalReceptor: [{ value: defaults.domicilioFiscalReceptor, disabled: true }],
      xml: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.syncXmlFromForm();
    this.form.valueChanges.subscribe(() => this.syncXmlFromForm());
    this.invoiceService.getFinkokConfiguration().subscribe({
      next: (config) => this.finkokConfig.set(config),
      error: () => this.finkokConfig.set(null),
    });
  }

  selectEnvironment(environment: FinkokEnvironment): void {
    if (this.stamping() || environment === this.stampEnvironment()) return;
    if (environment === 'production' && isLocalStampHost()) {
      const confirmed = window.confirm(
        'Esto timbrará un CFDI real con Finkok producción. ¿Continuar?'
      );
      if (!confirmed) return;
    }
    this.stampEnvironment.set(environment);
  }

  environmentLabel(environment: FinkokEnvironment): string {
    return environment === 'demo' ? 'Demo' : 'Producción';
  }

  goToFinkokConfig(): void {
    if (this.stamping()) return;
    this.dialogRef.close();
    void this.router.navigate(['/settings/fiscal-configurations'], {
      queryParams: { tab: 'finkok' },
    });
  }

  isMissingEnvCredentialsError(): boolean {
    return /credenciales finkok/i.test(this.stampError() || '');
  }

  private syncXmlFromForm(): void {
    const xml = this.generatedXml();
    this.form.patchValue({ xml }, { emitEvent: false });
  }

  get fiscal() {
    return this.data.order.fiscal_configuration;
  }

  get seriesLocked(): boolean {
    return !!fiscalPrefixAsSeries(this.data.order);
  }

  get customer(): Customer | undefined {
    return this.data.order.customer;
  }

  get isGenericPublic(): boolean {
    return isGenericPublicReceptor(this.data.order);
  }

  get lugarExpedicion(): string {
    return getLugarExpedicion(this.data.order);
  }

  get receptorRfc(): string {
    return this.isGenericPublic ? SAT_GENERIC_PUBLIC_RFC : this.customer?.fiscal_rfc?.trim() || '';
  }

  get receptorNombre(): string {
    return this.isGenericPublic
      ? SAT_GENERIC_PUBLIC_NAME
      : this.customer?.fiscal_razon_social?.trim() || '';
  }

  formatCurrency(value: number | string | undefined | null): string {
    const n = Number(value);
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number.isFinite(n) ? n : 0);
  }

  getLineImport(item: SalesOrderLineItem): number {
    const qty = Number(item.quantity) || 0;
    const unit = Number(item.unit_price) || 0;
    const discountPct = Number(item.discount_percentage) || 0;
    const gross = unit * qty;
    return Math.max(gross - gross * (discountPct / 100), 0);
  }

  close(): void {
    if (this.stamping()) return;
    this.dialogRef.close();
  }

  submit(): void {
    if (!this.canSubmitStamp() || this.form.invalid) return;

    const value = this.form.getRawValue();
    const payload: StampSalesOrderInvoicePayload = {
      xml: ensureCfdi40RootNamespaces(
        buildCfdiXml({
          order: this.data.order,
          lineItems: this.data.lineItems,
          form: {
            series: value.series,
            folio: value.folio,
            usoCfdi: value.usoCfdi,
            formaPago: value.formaPago,
            metodoPago: value.metodoPago,
            regimenReceptor: value.regimenReceptor,
            domicilioFiscalReceptor:
              getReceptorDomicilioFiscal(this.data.order) || value.domicilioFiscalReceptor,
          },
        })
      ),
      series: value.series?.trim() || undefined,
      folio: value.folio?.trim() || undefined,
      environment: this.stampEnvironment(),
      certificate_serial:
        (this.fiscal as { certificate_serial_number?: string } | undefined)?.certificate_serial_number || undefined,
    };

    this.stampError.set(null);
    this.stamping.set(true);
    this.dialogRef.disableClose = true;

    this.invoiceService.stampInvoice(this.data.orderId, payload).subscribe({
      next: () => {
        this.stamping.set(false);
        this.dialogRef.disableClose = false;
        this.toast.success('Factura timbrada correctamente');
        this.dialogRef.close({ stamped: true } satisfies SalesOrderInvoiceStampDialogResult);
      },
      error: (error) => {
        this.stamping.set(false);
        this.dialogRef.disableClose = false;
        const message = resolveHttpErrorMessage(error, 'Error al timbrar factura');
        this.stampError.set(message);
        this.toast.error(message, { duration: 12000 });
      },
    });
  }
}
