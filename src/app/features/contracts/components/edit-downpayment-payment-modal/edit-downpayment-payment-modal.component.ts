import { Component, Inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';
import { DownPaymentPayment } from '../../models/downpayment-payment.model';
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
    LucideAngularModule,
    LocalDatePipe
  ],
  providers: [DatePipe],
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
    const isPaid = this.data.payment.status === 'pagado';
    this.form = this.fb.group({
      amount_paid: [this.data.payment.amount_paid || this.data.payment.amount, [Validators.required, Validators.min(0.01)]],
      paid_date: [this.data.payment.paid_date || '', isPaid ? Validators.required : []],
      payment_method: [this.data.payment.payment_method || '', isPaid ? Validators.required : []],
      notes: [this.data.payment.notes || '']
    });

    this.paymentMethodSelectConfig.form_control = this.form.get('payment_method');
  }

  save(): void {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Completa todos los campos requeridos'
      });
      return;
    }

    this.saving.set(true);
    this.downpaymentService.updatePayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago de enganche actualizado correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al actualizar el pago de enganche'
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
