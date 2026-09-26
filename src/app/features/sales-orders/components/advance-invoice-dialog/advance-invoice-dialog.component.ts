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
  template: `
    <form class="advance-dialog" [formGroup]="form" (ngSubmit)="submit()">
      <h2>{{ title }}</h2>
      <p class="advance-dialog__hint">{{ hint }}</p>
      @if (data.mode === 'stamp') {
        <label>
          Base sin IVA
          <input type="number" min="0.01" step="0.01" formControlName="base_amount" />
        </label>
        <label>
          IVA %
          <input type="number" min="0" max="16" step="0.01" formControlName="iva_percentage" />
        </label>
      }
      <label>
        Uso CFDI
        <input type="text" formControlName="uso_cfdi" />
      </label>
      <label>
        Forma de pago
        <input type="text" formControlName="forma_pago" />
      </label>
      <label>
        Régimen del receptor
        <input type="text" formControlName="regimen_fiscal_receptor" />
      </label>
      @if (error()) {
        <p class="advance-dialog__error">{{ error() }}</p>
      }
      <div class="advance-dialog__actions">
        <button type="button" (click)="close()" [disabled]="saving()">Volver</button>
        <button type="submit" [disabled]="saving() || form.invalid">
          {{ saving() ? 'Timbrando…' : 'Timbrar' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .advance-dialog { display: flex; flex-direction: column; gap: 12px; padding: 8px 4px 4px; min-width: 320px; }
    h2 { margin: 0; font-size: 18px; }
    label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; }
    input { border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; }
    .advance-dialog__hint { margin: 0; color: #475569; font-size: 13px; }
    .advance-dialog__error { margin: 0; color: #b91c1c; font-size: 13px; }
    .advance-dialog__actions { display: flex; justify-content: flex-end; gap: 8px; }
  `],
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
      base_amount: [data.defaultBase ?? null, data.mode === 'stamp' ? [Validators.required, Validators.min(0.01)] : []],
      iva_percentage: [data.defaultIva ?? 8, data.mode === 'stamp' ? [Validators.required, Validators.min(0), Validators.max(16)] : []],
      uso_cfdi: [data.mode === 'apply' ? 'G01' : 'G01', Validators.required],
      forma_pago: ['03', Validators.required],
      regimen_fiscal_receptor: ['601', Validators.required],
    });
  }

  get title(): string {
    return this.data.mode === 'apply' ? 'Aplicar anticipo' : 'Factura de anticipo';
  }

  get hint(): string {
    if (this.data.mode === 'apply') {
      return `Se timbran dos comprobantes ligados al anticipo ${this.data.advanceUuid || ''}: la factura de la mercancía y la nota de crédito.`;
    }
    return `Un solo concepto SAT (84111506, unidad ACT) por el anticipo de ${this.data.folio}.`;
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
