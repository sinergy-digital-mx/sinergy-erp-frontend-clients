import { Component, Inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LucideAngularModule, X } from 'lucide-angular';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';

@Component({
  selector: 'app-edit-payment-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    LucideAngularModule,
    LocalDatePipe
  ],
  providers: [DatePipe],
  templateUrl: './edit-payment-modal.component.html',
  styleUrls: ['./edit-payment-modal.component.scss']
})
export class EditPaymentModalComponent {
  readonly X = X;
  form: FormGroup;
  saving = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { payment: Payment; contractId: string; currency: string },
    private dialogRef: MatDialogRef<EditPaymentModalComponent>,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private interceptorService: InterceptorService
  ) {
    this.form = this.fb.group({
      amount: [this.data.payment.amount, [Validators.required, Validators.min(0.01)]],
      due_date: [this.data.payment.due_date, Validators.required],
      notes: [this.data.payment.notes || '']
    });
  }

  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Completa todos los campos requeridos'
      });
      return;
    }

    this.saving.set(true);
    this.paymentService.updatePayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago actualizado correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al actualizar el pago'
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}

