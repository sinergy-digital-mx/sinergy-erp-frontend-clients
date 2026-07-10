import { Component, Inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CFDI_FORMA_PAGO_OPTIONS,
  CFDI_REGIMEN_RECEPTOR_OPTIONS,
  CFDI_USO_OPTIONS,
  FinkokConfigurationsResponse,
  InvoiceValidationIssue,
} from '../../models/sales-order-electronic-invoice.model';
import { SalesOrder, SalesOrderLineItem, Customer } from '../../models/sales-order.model';
import {
  buildCfdiXml,
  CfdiWizardFormValues,
  defaultCfdiWizardForm,
} from '../../utils/cfdi-xml-builder.util';
import { StampSalesOrderInvoicePayload } from '../../models/sales-order-electronic-invoice.model';

export interface SalesOrderInvoiceStampDialogData {
  order: SalesOrder;
  lineItems: SalesOrderLineItem[];
  finkokConfig: FinkokConfigurationsResponse | null;
  validationIssues: InvoiceValidationIssue[];
  canStamp: boolean;
}

export interface SalesOrderInvoiceStampDialogResult {
  payload: StampSalesOrderInvoicePayload;
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

  readonly usoOptions = CFDI_USO_OPTIONS;
  readonly formaPagoOptions = CFDI_FORMA_PAGO_OPTIONS;
  readonly regimenOptions = CFDI_REGIMEN_RECEPTOR_OPTIONS;

  generatedXml = computed(() => {
    const values = this.form?.value as CfdiWizardFormValues;
    if (!values) return '';
    return buildCfdiXml({
      order: this.data.order,
      lineItems: this.data.lineItems,
      form: values,
    });
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesOrderInvoiceStampDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderInvoiceStampDialogData
  ) {
    const defaults = defaultCfdiWizardForm(data.order);
    this.form = this.fb.group({
      series: [defaults.series],
      folio: [defaults.folio, Validators.required],
      usoCfdi: [defaults.usoCfdi, Validators.required],
      formaPago: [defaults.formaPago, Validators.required],
      metodoPago: [defaults.metodoPago, Validators.required],
      regimenReceptor: [defaults.regimenReceptor, Validators.required],
      domicilioFiscalReceptor: [defaults.domicilioFiscalReceptor],
      xml: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.syncXmlFromForm();
    this.form.valueChanges.subscribe(() => this.syncXmlFromForm());
  }

  private syncXmlFromForm(): void {
    const xml = this.generatedXml();
    this.form.patchValue({ xml }, { emitEvent: false });
  }

  get fiscal() {
    return this.data.order.fiscal_configuration;
  }

  get customer(): Customer | undefined {
    return this.data.order.customer;
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
    this.dialogRef.close();
  }

  submit(): void {
    if (!this.data.canStamp || this.form.invalid || this.stamping()) return;

    const value = this.form.value;
    const payload: StampSalesOrderInvoicePayload = {
      xml: value.xml,
      series: value.series?.trim() || undefined,
      folio: value.folio?.trim() || undefined,
      certificate_serial:
        (this.fiscal as { certificate_serial_number?: string } | undefined)?.certificate_serial_number || undefined,
    };

    this.dialogRef.close({ payload } satisfies SalesOrderInvoiceStampDialogResult);
  }
}
