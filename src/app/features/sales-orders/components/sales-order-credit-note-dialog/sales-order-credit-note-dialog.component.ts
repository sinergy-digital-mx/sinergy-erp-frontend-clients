import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CFDI_USO_OPTIONS,
  defaultStampEnvironment,
  isLocalStampHost,
  SalesOrderElectronicInvoice,
} from '../../models/sales-order-electronic-invoice.model';
import type { FinkokEnvironment } from '../../models/sales-order-electronic-invoice.model';

export interface SalesOrderCreditNoteDialogData {
  invoice: SalesOrderElectronicInvoice;
  available: number;
  currency: 'MXN' | 'USD';
  orderPaid: boolean;
}

export interface SalesOrderCreditNoteDialogResult {
  amount: number;
  reason: string;
  uso_cfdi: string;
  environment: FinkokEnvironment;
}

@Component({
  selector: 'app-sales-order-credit-note-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-order-credit-note-dialog.component.html',
  styleUrl: './sales-order-credit-note-dialog.component.scss',
})
export class SalesOrderCreditNoteDialogComponent {
  form: FormGroup;
  readonly usoOptions = CFDI_USO_OPTIONS;
  readonly localHost = isLocalStampHost();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesOrderCreditNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderCreditNoteDialogData,
  ) {
    this.form = this.fb.group({
      amount: [this.roundMoney(data.available), [Validators.required, Validators.min(0.01)]],
      reason: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      uso_cfdi: ['G02', Validators.required],
      environment: [defaultStampEnvironment(), Validators.required],
    });
  }

  get currencyLabel(): string {
    return this.data.currency === 'USD' ? 'USD' : 'MXN';
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const amount = this.roundMoney(this.form.value.amount);
    const available = this.roundMoney(this.data.available);
    if (amount > available + 0.009) {
      this.form.get('amount')?.setErrors({ max: true });
      return;
    }
    const environment = this.form.value.environment as FinkokEnvironment;
    if (environment === 'production' && this.localHost) {
      const confirmed = window.confirm('Esto timbrará una nota de crédito real. ¿Continuar?');
      if (!confirmed) return;
    }
    const result: SalesOrderCreditNoteDialogResult = {
      amount,
      reason: String(this.form.value.reason || '').trim(),
      uso_cfdi: this.form.value.uso_cfdi,
      environment,
    };
    this.dialogRef.close(result);
  }

  private roundMoney(value: unknown): number {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return 0;
    return Math.round((amount + Number.EPSILON) * 100) / 100;
  }
}
