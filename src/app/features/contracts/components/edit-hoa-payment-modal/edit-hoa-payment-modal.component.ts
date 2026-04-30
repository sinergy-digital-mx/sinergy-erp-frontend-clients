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
import { HoaPayment } from '../../models/hoa-payment.model';
import { HoaPaymentService } from '../../services/hoa-payment.service';

@Component({
  selector: 'app-edit-hoa-payment-modal',
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
  templateUrl: './edit-hoa-payment-modal.component.html',
  styleUrls: ['./edit-hoa-payment-modal.component.scss']
})
export class EditHoaPaymentModalComponent {
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
    private dialogRef: MatDialogRef<EditHoaPaymentModalComponent>,
    private fb: FormBuilder,
    private hoaPaymentService: HoaPaymentService,
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
    this.hoaPaymentService.updatePayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago HOA actualizado correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al actualizar el pago HOA'
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
