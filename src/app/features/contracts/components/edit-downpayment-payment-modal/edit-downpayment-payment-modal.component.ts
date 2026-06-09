import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { DownPaymentPayment, UpdateDownPaymentPaymentDto } from '../../models/downpayment-payment.model';
import { DownpaymentPaymentService } from '../../services/downpayment-payment.service';

@Component({
  selector: 'app-edit-downpayment-payment-modal',
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
  templateUrl: './edit-downpayment-payment-modal.component.html',
  styleUrls: ['./edit-downpayment-payment-modal.component.scss']
})
export class EditDownpaymentPaymentModalComponent {
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
    @Inject(MAT_DIALOG_DATA) public data: { payment: DownPaymentPayment; contractId: string; currency: string },
    private dialogRef: MatDialogRef<EditDownpaymentPaymentModalComponent>,
    private fb: FormBuilder,
    private downpaymentService: DownpaymentPaymentService,
    private interceptorService: InterceptorService
  ) {
    this.form = this.fb.group({
      amount: [this.data.payment.amount, [Validators.required, Validators.min(0.01)]],
      due_date: [this.toDateInputValue(this.data.payment.due_date)],
      amount_paid: [this.data.payment.amount_paid ?? 0, [Validators.min(0)]],
      payment_method: [this.data.payment.payment_method || ''],
      notes: [this.data.payment.notes || '']
    });

    this.paymentMethodSelectConfig.form_control = this.form.get('payment_method');
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Completa los campos requeridos'
      });
      return;
    }

    const amount = Number(this.form.get('amount')?.value);
    const amountPaidRaw = this.form.get('amount_paid')?.value;
    const amountPaid = amountPaidRaw === '' || amountPaidRaw == null ? undefined : Number(amountPaidRaw);

    if (!Number.isFinite(amount) || amount <= 0) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'El monto debe ser mayor a 0'
      });
      return;
    }

    if (amountPaid != null && Number.isFinite(amountPaid) && amount < amountPaid) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'El monto no puede ser menor a lo ya pagado en esta cuota'
      });
      return;
    }

    const payload: UpdateDownPaymentPaymentDto = { amount };

    const dueDate = this.form.get('due_date')?.value;
    if (dueDate) {
      payload.due_date = dueDate;
    }

    if (amountPaid != null && Number.isFinite(amountPaid)) {
      payload.amount_paid = amountPaid;
    }

    const paymentMethod = this.form.get('payment_method')?.value;
    if (paymentMethod) {
      payload.payment_method = paymentMethod;
    }

    const notes = this.form.get('notes')?.value;
    payload.notes = notes?.trim() ? notes.trim() : null;

    this.saving.set(true);
    this.downpaymentService.updatePayment(this.data.contractId, this.data.payment.id, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Cuota de enganche actualizada correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al actualizar la cuota de enganche'
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  private toDateInputValue(value: string | null | undefined): string {
    if (!value) return '';
    return value.length >= 10 ? value.slice(0, 10) : value;
  }
}
