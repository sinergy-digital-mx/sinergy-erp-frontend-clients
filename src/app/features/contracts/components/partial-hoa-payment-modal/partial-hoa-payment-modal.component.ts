import { Component, Inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { HoaPayment } from '../../models/hoa-payment.model';
import { HoaPaymentService } from '../../services/hoa-payment.service';

@Component({
  selector: 'app-partial-hoa-payment-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule
  ],
  providers: [DatePipe],
  templateUrl: './partial-hoa-payment-modal.component.html',
  styleUrl: './partial-hoa-payment-modal.component.scss'
})
export class PartialHoaPaymentModalComponent {
  readonly X = X;
  form: FormGroup;
  saving = signal(false);

  paymentMethodSelectConfig: ISelect = {
    placeholder: 'Selecciona un método',
    data: [
      { value: 'transferencia', label: 'Transferencia' },
      { value: 'efectivo', label: 'Efectivo' },
      { value: 'tarjeta', label: 'Tarjeta' },
      { value: 'cheque', label: 'Cheque' }
    ],
    value: 'value',
    option: 'label',
    form_control: null
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { payment: HoaPayment; contractId: string; currency: string },
    private dialogRef: MatDialogRef<PartialHoaPaymentModalComponent>,
    private fb: FormBuilder,
    private hoaPaymentService: HoaPaymentService,
    private interceptorService: InterceptorService
  ) {
    const today = this.getLocalDateString(new Date());
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01), this.maxAmountValidator.bind(this)]],
      payment_date: [today, Validators.required],
      payment_method: ['', Validators.required],
      reference_number: [''],
      notes: ['']
    });

    this.paymentMethodSelectConfig.form_control = this.form.get('payment_method');
    this.form.get('amount')?.setValue(this.data.payment.amount_pending);
  }

  private getLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private maxAmountValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const amount = parseFloat(control.value);
    if (amount > this.data.payment.amount_pending) {
      return { maxAmount: { max: this.data.payment.amount_pending, actual: amount } };
    }
    return null;
  }

  get amountPending(): number {
    return this.data.payment.amount_pending;
  }

  get isFullPayment(): boolean {
    const amount = parseFloat(this.form.get('amount')?.value || 0);
    return Math.abs(amount - this.amountPending) < 0.01;
  }

  get paymentTypeMessage(): string {
    return this.isFullPayment ? 'Se marcará como pagado completo' : 'Se registrará como pago parcial';
  }

  save(): void {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Completa todos los campos requeridos correctamente'
      });
      return;
    }

    this.saving.set(true);
    this.hoaPaymentService.registerPayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago HOA registrado correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al registrar el pago HOA'
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
