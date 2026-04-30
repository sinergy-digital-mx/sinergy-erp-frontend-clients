import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';

export interface PaymentDialogData {
  remainingAmount: number;
  totalAmount?: number;
  currency?: 'MXN' | 'USD';
}

export interface PaymentFormData {
  amount: number;
  payment_date: string;
  payment_method: string;
  currency: 'MXN' | 'USD';
  reference_number?: string;
  notes?: string;
}

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule
  ],
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent {
  readonly X = X;
  loading = signal(false);
  
  form: FormGroup;
  remainingAmount: number;
  totalAmount: number;
  selectedCurrency: 'MXN' | 'USD';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData
  ) {
    this.remainingAmount = data.remainingAmount;
    this.totalAmount = data.totalAmount ?? data.remainingAmount;
    this.selectedCurrency = data.currency ?? 'MXN';
    
    // Initialize form with validation
    this.form = this.fb.group({
      amount: [
        this.remainingAmount > 0 ? this.remainingAmount.toFixed(2) : '',
        [
          Validators.required,
          this.amountFormatValidator(),
          this.amountRangeValidator(0.01, this.remainingAmount)
        ]
      ],
      payment_date: [
        new Date().toISOString().split('T')[0],
        [Validators.required]
      ],
      payment_method: [
        'Transferencia',
        [Validators.required]
      ],
      currency: [this.selectedCurrency, [Validators.required]],
      reference_number: [''],
      notes: ['']
    });
  }

  /**
   * Close dialog without saving
   */
  closeDialog(): void {
    if (!this.loading()) {
      this.dialogRef.close(null);
    }
  }

  /**
   * Submit payment form
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const paymentData: PaymentFormData = {
      amount: this.parseLocalizedAmount(formValue.amount),
      payment_date: formValue.payment_date,
      payment_method: formValue.payment_method,
      currency: formValue.currency,
      reference_number: formValue.reference_number || undefined,
      notes: formValue.notes || undefined
    };

    this.dialogRef.close(paymentData);
  }

  /**
   * Get validation error message for amount field
   */
  getAmountError(): string | null {
    const control = this.form.get('amount');
    
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.errors['required']) {
      return 'El monto es requerido';
    }

    if (control.errors['invalidAmount']) {
      return 'Ingresa un monto valido (ej: 1250.50 o 1250,50)';
    }

    if (control.errors['amountMin']) {
      return 'El monto debe ser mayor a cero';
    }

    if (control.errors['amountMax']) {
      return `El monto no puede exceder el saldo pendiente (${this.formatCurrency(this.remainingAmount)})`;
    }

    return 'Monto inválido';
  }

  /**
   * Format currency for display
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this.form.get('currency')?.value || this.selectedCurrency
    }).format(amount);
  }

  private parseLocalizedAmount(value: unknown): number {
    if (value === null || value === undefined) return NaN;
    const normalized = String(value).trim().replace(/\s+/g, '').replace(',', '.');
    const amount = parseFloat(normalized);
    return Number.isFinite(amount) ? amount : NaN;
  }

  private amountFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const raw = control.value;
      if (raw === null || raw === undefined || raw === '') return null;
      const normalized = String(raw).trim();
      const validPattern = /^\d+([.,]\d{1,2})?$/;
      return validPattern.test(normalized) ? null : { invalidAmount: true };
    };
  }

  private amountRangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const raw = control.value;
      if (raw === null || raw === undefined || raw === '') return null;
      const amount = this.parseLocalizedAmount(raw);
      if (!Number.isFinite(amount)) {
        return { invalidAmount: true };
      }
      if (amount < min) {
        return { amountMin: true };
      }
      if (amount > max) {
        return { amountMax: true };
      }
      return null;
    };
  }
}
