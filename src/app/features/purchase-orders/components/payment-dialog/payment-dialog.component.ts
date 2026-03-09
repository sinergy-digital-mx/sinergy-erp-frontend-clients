import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';

export interface PaymentDialogData {
  remainingAmount: number;
}

export interface PaymentFormData {
  amount: number;
  payment_date: string;
  payment_method: string;
  reference?: string;
  notes?: string;
}

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent {
  readonly X = X;
  loading = signal(false);
  
  form: FormGroup;
  remainingAmount: number;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData
  ) {
    this.remainingAmount = data.remainingAmount;
    
    // Initialize form with validation
    this.form = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.max(this.remainingAmount)
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
      reference: [''],
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
      amount: parseFloat(formValue.amount),
      payment_date: formValue.payment_date,
      payment_method: formValue.payment_method,
      reference: formValue.reference || undefined,
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

    if (control.errors['min']) {
      return 'El monto debe ser mayor a cero';
    }

    if (control.errors['max']) {
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
      currency: 'MXN'
    }).format(amount);
  }
}
