import { Component, Inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Payment } from '../../models/payment.model';
import { PaymentService } from '../../services/payment.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-partial-payment-modal',
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
  templateUrl: './partial-payment-modal.component.html',
  styleUrl: './partial-payment-modal.component.scss'
})
export class PartialPaymentModalComponent {
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
    @Inject(MAT_DIALOG_DATA) public data: { payment: Payment; contractId: string; currency: string },
    private dialogRef: MatDialogRef<PartialPaymentModalComponent>,
    private fb: FormBuilder,
    private paymentService: PaymentService,
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
    return amount === this.amountPending;
  }

  get paymentTypeMessage(): string {
    if (this.isFullPayment) {
      return 'Se marcará como pagado completo';
    }
    return 'Se registrará como pago parcial';
  }

  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Completa todos los campos requeridos correctamente'
      });
      return;
    }

    this.saving.set(true);
    this.paymentService.registerPartialPayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago registrado correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al registrar el pago'
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
