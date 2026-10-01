import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { QuotationService } from '../../../quotations/services/quotation.service';
import { SalesOrderInvoiceService } from '../../services/sales-order-invoice.service';

export type AdvanceInvoiceDialogMode = 'stamp' | 'apply';
export type AdvanceInvoiceDialogSource = 'quotation' | 'sales_order';

export interface AdvanceInvoiceDialogData {
  mode: AdvanceInvoiceDialogMode;
  source: AdvanceInvoiceDialogSource;
  documentId: string;
  folio: string;
  defaultBase?: number;
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
export class AdvanceInvoiceDialogComponent {
  saving = signal(false);
  error = signal('');

  form;

  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AdvanceInvoiceDialogData,
    private readonly dialogRef: MatDialogRef<AdvanceInvoiceDialogComponent, boolean>,
    private readonly quotations: QuotationService,
    private readonly invoices: SalesOrderInvoiceService,
  ) {
    this.form = this.fb.group({
      percent: [100, data.mode === 'stamp' ? [Validators.required, Validators.min(1), Validators.max(100)] : []],
      base_amount: [data.defaultBase ?? null, data.mode === 'stamp' ? [Validators.required, Validators.min(0.01)] : []],
      iva_percentage: [data.defaultIva ?? 8, data.mode === 'stamp' ? [Validators.required, Validators.min(0), Validators.max(16)] : []],
      uso_cfdi: ['G01', Validators.required],
      forma_pago: ['01', Validators.required],
      regimen_fiscal_receptor: ['601', Validators.required],
    });
    this.form.get('percent')?.valueChanges.subscribe((percent) => {
      const full = Number(this.data.defaultBase ?? 0);
      const pct = Number(percent);
      if (!Number.isFinite(full) || full <= 0 || !Number.isFinite(pct)) return;
      const base = Math.round(full * (pct / 100) * 100) / 100;
      this.form.patchValue({ base_amount: Math.max(base, 0.01) }, { emitEvent: false });
    });
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
    return `Anticipo del ${Number(this.form.get('percent')?.value ?? 100)}% de la cotización ${this.data.folio}. El total con IVA entra al corte de la sucursal.`;
  }

  get chargeTotal(): number {
    const base = Number(this.form.get('base_amount')?.value ?? 0);
    const iva = Number(this.form.get('iva_percentage')?.value ?? 0);
    if (!Number.isFinite(base) || !Number.isFinite(iva)) return 0;
    return Math.round(base * (1 + iva / 100) * 100) / 100;
  }

  close(): void {
    if (!this.saving()) this.dialogRef.close(false);
  }

  submit(): void {
    if (this.form.invalid || this.saving()) return;
    const value = this.form.getRawValue();
    this.saving.set(true);
    this.error.set('');
    const request = this.data.mode === 'apply'
      ? this.invoices.applyAdvance(this.data.documentId, {
          uso_cfdi: String(value.uso_cfdi),
          forma_pago: String(value.forma_pago),
          regimen_fiscal_receptor: String(value.regimen_fiscal_receptor),
          metodo_pago: 'PUE',
        })
      : this.data.source === 'quotation'
        ? this.quotations.stampAdvance(this.data.documentId, {
            base_amount: Number(value.base_amount),
            iva_percentage: Number(value.iva_percentage),
            uso_cfdi: String(value.uso_cfdi),
            forma_pago: String(value.forma_pago),
            regimen_fiscal_receptor: String(value.regimen_fiscal_receptor),
            metodo_pago: 'PUE',
          })
        : this.invoices.stampAdvance(this.data.documentId, {
            base_amount: Number(value.base_amount),
            iva_percentage: Number(value.iva_percentage),
            uso_cfdi: String(value.uso_cfdi),
            forma_pago: String(value.forma_pago),
            regimen_fiscal_receptor: String(value.regimen_fiscal_receptor),
            metodo_pago: 'PUE',
          });

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(err?.error?.message || 'No se pudo timbrar');
      },
    });
  }
}
