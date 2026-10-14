import { Component, ElementRef, Inject, OnInit, ViewChild, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { QuotationService } from '../../../quotations/services/quotation.service';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';
import {
  defaultStampEnvironment,
  FinkokConfigurationsResponse,
  getFinkokEnvironmentConfig,
  hasFinkokEnvironmentCredentials,
  isLocalStampHost,
} from '../../models/sales-order-electronic-invoice.model';
import type { FinkokEnvironment } from '../../models/sales-order-electronic-invoice.model';

export type AdvanceInvoiceDialogMode = 'stamp' | 'apply';
export type AdvanceInvoiceDialogSource = 'quotation' | 'sales_order';

export interface AdvanceInvoiceDialogData {
  mode: AdvanceInvoiceDialogMode;
  source: AdvanceInvoiceDialogSource;
  documentId: string;
  folio: string;
  defaultBase?: number;
  defaultTotal?: number;
  defaultIva?: number;
  advanceTotal?: number | null;
  advanceUuid?: string | null;
}

@Component({
  selector: 'app-advance-invoice-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './advance-invoice-dialog.component.html',
  styleUrl: './advance-invoice-dialog.component.scss',
})
export class AdvanceInvoiceDialogComponent implements OnInit {
  @ViewChild('dialogBody') private dialogBody?: ElementRef<HTMLElement>;

  saving = signal(false);
  error = signal('');
  finkokConfig = signal<FinkokConfigurationsResponse | null>(null);
  stampEnvironment = signal<FinkokEnvironment>(defaultStampEnvironment());

  selectedEnvConfig = computed(() =>
    getFinkokEnvironmentConfig(this.finkokConfig(), this.stampEnvironment()),
  );

  hasSelectedEnvCredentials = computed(() =>
    hasFinkokEnvironmentCredentials(this.finkokConfig(), this.stampEnvironment()),
  );

  selectedFinkokUsername = computed(() => this.selectedEnvConfig()?.finkok_username?.trim() || '');

  form;

  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AdvanceInvoiceDialogData,
    private readonly dialogRef: MatDialogRef<AdvanceInvoiceDialogComponent, boolean>,
    private readonly quotations: QuotationService,
    private readonly invoices: SalesOrderInvoiceService,
    private readonly router: Router,
    private readonly toast: ToastService,
  ) {
    const iva = data.defaultIva ?? 8;
    const defaultGross = this.roundMoney(
      data.defaultTotal ??
        (data.defaultBase != null ? Number(data.defaultBase) * (1 + iva / 100) : 0),
    );
    this.form = this.fb.group({
      amount_with_iva: [
        defaultGross || null,
        data.mode === 'stamp'
          ? [Validators.required, Validators.min(0.01), Validators.max(Math.max(defaultGross || 0.01, 0.01))]
          : [],
      ],
      iva_percentage: [iva, data.mode === 'stamp' ? [Validators.required, Validators.min(0), Validators.max(16)] : []],
      uso_cfdi: ['G01', Validators.required],
      forma_pago: ['01', Validators.required],
      regimen_fiscal_receptor: ['601', Validators.required],
    });
  }

  ngOnInit(): void {
    this.invoices.getFinkokConfiguration().subscribe({
      next: (config) => this.finkokConfig.set(config),
      error: () => this.finkokConfig.set(null),
    });
  }

  selectEnvironment(environment: FinkokEnvironment): void {
    if (this.saving() || environment === this.stampEnvironment()) return;
    if (environment === 'production' && isLocalStampHost()) {
      const confirmed = window.confirm(
        'Esto timbrará un CFDI real con Finkok producción. ¿Continuar?',
      );
      if (!confirmed) return;
    }
    this.stampEnvironment.set(environment);
  }

  environmentLabel(environment: FinkokEnvironment): string {
    return environment === 'demo' ? 'Demo' : 'Producción';
  }

  goToFinkokConfig(): void {
    if (this.saving()) return;
    this.dialogRef.close(false);
    void this.router.navigate(['/settings/fiscal-configurations'], {
      queryParams: { tab: 'finkok' },
    });
  }

  private roundMoney(value: number): number {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  private baseFromGross(gross: number, ivaPct: number): number {
    const rate = Number(ivaPct) || 0;
    if (rate <= 0) {
      return this.roundMoney(gross);
    }
    return this.roundMoney(gross / (1 + rate / 100));
  }

  get title(): string {
    return this.data.mode === 'apply' ? 'Aplicar anticipo' : 'Factura de anticipo';
  }

  get submitLabel(): string {
    return this.data.mode === 'apply' ? 'Aplicar' : 'Timbrar';
  }

  formatMoney(amount: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount || 0);
  }

  get hint(): string {
    if (this.data.mode === 'apply') {
      return `Se timbran dos comprobantes ligados al anticipo ${this.data.advanceUuid || ''}: la factura de la mercancía y la nota de crédito.`;
    }
    return `Captura lo que dejó el cliente, con IVA, sobre el total de ${this.data.folio}. Ese monto entra al corte de la sucursal.`;
  }

  get quotationTotal(): number {
    return this.roundMoney(this.data.defaultTotal ?? 0);
  }

  get chargeTotal(): number {
    return this.roundMoney(Number(this.form.get('amount_with_iva')?.value ?? 0));
  }

  get remainingTotal(): number {
    return this.roundMoney(Math.max(0, this.quotationTotal - this.chargeTotal));
  }

  close(): void {
    if (!this.saving()) this.dialogRef.close(false);
  }

  submit(): void {
    if (this.form.invalid || this.saving() || !this.hasSelectedEnvCredentials()) return;
    const value = this.form.getRawValue();
    const environment = this.stampEnvironment();
    this.saving.set(true);
    this.error.set('');
    const request = this.data.mode === 'apply'
      ? this.invoices.applyAdvance(this.data.documentId, {
          uso_cfdi: String(value.uso_cfdi),
          forma_pago: String(value.forma_pago),
          regimen_fiscal_receptor: String(value.regimen_fiscal_receptor),
          metodo_pago: 'PUE',
          environment,
        })
      : this.data.source === 'quotation'
        ? this.quotations.stampAdvance(this.data.documentId, {
            base_amount: this.baseFromGross(Number(value.amount_with_iva), Number(value.iva_percentage)),
            iva_percentage: Number(value.iva_percentage),
            uso_cfdi: String(value.uso_cfdi),
            forma_pago: String(value.forma_pago),
            regimen_fiscal_receptor: String(value.regimen_fiscal_receptor),
            metodo_pago: 'PUE',
            environment,
          })
        : this.invoices.stampAdvance(this.data.documentId, {
            base_amount: this.baseFromGross(Number(value.amount_with_iva), Number(value.iva_percentage)),
            iva_percentage: Number(value.iva_percentage),
            uso_cfdi: String(value.uso_cfdi),
            forma_pago: String(value.forma_pago),
            regimen_fiscal_receptor: String(value.regimen_fiscal_receptor),
            metodo_pago: 'PUE',
            environment,
          });

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        const message = resolveHttpErrorMessage(err, 'No se pudo timbrar');
        this.error.set(message);
        this.toast.error(message, { title: 'No se pudo timbrar', duration: 12000 });
        setTimeout(() => {
          this.dialogBody?.nativeElement.scrollTo({ top: 0 });
        });
      },
    });
  }
}
