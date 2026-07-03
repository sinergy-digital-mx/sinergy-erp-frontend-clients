import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  RegisterSalesOrderPaymentPayload,
  SalesOrderPaymentCurrency,
  SalesOrderPaymentMethod,
} from '../../models/sales-order-payment.model';

export interface SalesOrderPaymentDialogData {
  remainingAmount: number;
  totalAmount: number;
  amountPaid?: number;
  currency?: SalesOrderPaymentCurrency;
}

export interface SalesOrderPaymentDialogResult {
  payload: RegisterSalesOrderPaymentPayload;
  file?: File | null;
}

@Component({
  selector: 'app-sales-order-payment-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-order-payment-dialog.component.html',
  styleUrls: ['./sales-order-payment-dialog.component.scss'],
})
export class SalesOrderPaymentDialogComponent {
  loading = signal(false);
  selectedFile = signal<File | null>(null);
  fileError = signal<string | null>(null);

  form: FormGroup;
  remainingAmount: number;
  totalAmount: number;
  amountPaid: number;
  selectedCurrency: SalesOrderPaymentCurrency;

  readonly paymentMethods: Array<{ value: SalesOrderPaymentMethod; label: string }> = [
    { value: 'cash', label: 'Efectivo' },
    { value: 'card', label: 'Tarjeta' },
    { value: 'transfer', label: 'Transferencia' },
    { value: 'mixed', label: 'Mixto' },
  ];

  private readonly maxFileBytes = 10 * 1024 * 1024;
  private readonly allowedMimeTypes = new Set([
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/heic',
    'image/heif',
  ]);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalesOrderPaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderPaymentDialogData
  ) {
    this.remainingAmount = this.roundMoney(Number(data.remainingAmount) || 0);
    this.totalAmount = this.roundMoney(Number(data.totalAmount) || 0);
    this.amountPaid = this.roundMoney(
      Number(data.amountPaid ?? Math.max(this.totalAmount - this.remainingAmount, 0)) || 0
    );
    this.selectedCurrency = data.currency ?? 'MXN';

    const defaultAmount =
      this.remainingAmount > 0 ? this.remainingAmount.toFixed(2) : '';

    this.form = this.fb.group({
      amount: [
        defaultAmount,
        [
          Validators.required,
          this.amountFormatValidator(),
          this.amountRangeValidator(0.01, this.remainingAmount),
        ],
      ],
      payment_date: [new Date().toISOString().split('T')[0], [Validators.required]],
      payment_method: ['transfer' as SalesOrderPaymentMethod, [Validators.required]],
      currency: [this.selectedCurrency, [Validators.required]],
      reference_number: [''],
      notes: [''],
    });

    this.form.get('payment_method')?.valueChanges.subscribe((method) => {
      this.updateReferenceValidators(method);
    });
    this.updateReferenceValidators(this.form.get('payment_method')?.value);
  }

  get isTransfer(): boolean {
    return this.form.get('payment_method')?.value === 'transfer';
  }

  closeDialog(): void {
    if (!this.loading()) {
      this.dialogRef.close(null);
    }
  }

  canSubmit(): boolean {
    if (this.loading() || this.fileError()) return false;

    const amountControl = this.form.get('amount');
    const raw = String(amountControl?.value ?? '').trim();
    if (!raw) return false;
    if (!/^\d+([.,]\d{1,2})?$/.test(raw)) return false;

    const amount = this.parseLocalizedAmount(raw);
    if (!Number.isFinite(amount) || amount < 0.01) return false;
    if (this.toCents(amount) > this.toCents(this.remainingAmount)) return false;

    if (this.isTransfer) {
      const reference = String(this.form.get('reference_number')?.value ?? '').trim();
      if (!reference) return false;
    }

    return (
      !this.form.get('payment_date')?.invalid &&
      !this.form.get('payment_method')?.invalid &&
      !this.form.get('currency')?.invalid
    );
  }

  submit(): void {
    if (!this.canSubmit()) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const method = formValue.payment_method as SalesOrderPaymentMethod;
    const payload: RegisterSalesOrderPaymentPayload = {
      amount: this.roundMoney(this.parseLocalizedAmount(formValue.amount)),
      payment_date: formValue.payment_date,
      payment_method: method,
      currency: formValue.currency,
      reference_number: formValue.reference_number?.trim() || undefined,
      notes: formValue.notes?.trim() || undefined,
    };

    if (method === 'transfer' && !payload.reference_number) {
      this.form.get('reference_number')?.setErrors({ required: true });
      this.form.get('reference_number')?.markAsTouched();
      return;
    }

    const result: SalesOrderPaymentDialogResult = {
      payload,
      file: this.selectedFile(),
    };
    this.dialogRef.close(result);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.fileError.set(null);

    if (!file) {
      this.selectedFile.set(null);
      return;
    }

    if (file.size > this.maxFileBytes) {
      this.selectedFile.set(null);
      this.fileError.set('El archivo no puede superar 10 MB');
      input.value = '';
      return;
    }

    const mime = (file.type || '').toLowerCase();
    const name = file.name.toLowerCase();
    const allowedExtension =
      name.endsWith('.pdf') ||
      name.endsWith('.jpg') ||
      name.endsWith('.jpeg') ||
      name.endsWith('.png') ||
      name.endsWith('.heic') ||
      name.endsWith('.heif');

    if (mime && !this.allowedMimeTypes.has(mime) && !allowedExtension) {
      this.selectedFile.set(null);
      this.fileError.set('Solo se permiten PDF, JPEG, PNG o HEIC');
      input.value = '';
      return;
    }

    if (!mime && !allowedExtension) {
      this.selectedFile.set(null);
      this.fileError.set('Solo se permiten PDF, JPEG, PNG o HEIC');
      input.value = '';
      return;
    }

    this.selectedFile.set(file);
  }

  clearFile(input?: HTMLInputElement): void {
    this.selectedFile.set(null);
    this.fileError.set(null);
    if (input) {
      input.value = '';
    }
  }

  getAmountError(): string | null {
    const control = this.form.get('amount');
    if (!control || !control.errors || !control.touched) {
      return null;
    }
    if (control.errors['required']) return 'El monto es requerido';
    if (control.errors['invalidAmount']) {
      return 'Ingresa un monto válido (ej: 1250.50 o 1250,50)';
    }
    if (control.errors['amountMin']) return 'El monto debe ser mayor a cero';
    if (control.errors['amountMax']) {
      return `El monto no puede exceder el saldo pendiente (${this.formatCurrency(this.remainingAmount)})`;
    }
    return 'Monto inválido';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this.form.get('currency')?.value || this.selectedCurrency,
    }).format(amount);
  }

  private updateReferenceValidators(method: SalesOrderPaymentMethod): void {
    const control = this.form.get('reference_number');
    if (!control) return;
    if (method === 'transfer') {
      control.setValidators([Validators.required]);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity({ emitEvent: false });
  }

  private parseLocalizedAmount(value: unknown): number {
    if (value === null || value === undefined) return NaN;
    const normalized = String(value).trim().replace(/\s+/g, '').replace(',', '.');
    const amount = parseFloat(normalized);
    return Number.isFinite(amount) ? amount : NaN;
  }

  private roundMoney(value: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.round(value * 100) / 100;
  }

  private toCents(value: number): number {
    return Math.round(this.roundMoney(value) * 100);
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
      if (this.toCents(amount) < this.toCents(min)) {
        return { amountMin: true };
      }
      if (this.toCents(amount) > this.toCents(max)) {
        return { amountMax: true };
      }
      return null;
    };
  }
}
