import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { DownpaymentPaymentService } from '../../services/downpayment-payment.service';

@Component({
  selector: 'app-add-manual-downpayment-dialog',
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
  templateUrl: './add-manual-downpayment-dialog.component.html',
  styleUrl: './add-manual-downpayment-dialog.component.scss'
})
export class AddManualDownpaymentDialogComponent {
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
    private dialogRef: MatDialogRef<AddManualDownpaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contractId: string; currency: string },
    private fb: FormBuilder,
    private downpaymentService: DownpaymentPaymentService,
    private interceptorService: InterceptorService
  ) {
    const today = this.getLocalDateString(new Date());
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      due_date: [today, Validators.required],
      record_as_paid: [true],
      payment_method: ['efectivo'],
      payment_date: [today],
      reference_number: [''],
      notes: ['']
    });

    this.paymentMethodSelectConfig.form_control = this.form.get('payment_method');
    this.applyRecordAsPaidRules(!!this.form.get('record_as_paid')!.value);
    this.form.get('record_as_paid')!.valueChanges.subscribe((v) => this.applyRecordAsPaidRules(!!v));
  }

  private getLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private applyRecordAsPaidRules(recordAsPaid: boolean): void {
    const method = this.form.get('payment_method')!;
    const paymentDate = this.form.get('payment_date')!;
    if (recordAsPaid) {
      method.setValidators([Validators.required]);
      paymentDate.setValidators([Validators.required]);
    } else {
      method.clearValidators();
      paymentDate.clearValidators();
    }
    method.updateValueAndValidity({ emitEvent: false });
    paymentDate.updateValueAndValidity({ emitEvent: false });
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

    const raw = this.form.value;
    const payload: Record<string, unknown> = {
      amount: Number(raw.amount),
      due_date: raw.due_date,
      record_as_paid: !!raw.record_as_paid
    };

    if (raw.record_as_paid) {
      payload['payment_method'] = raw.payment_method;
      payload['payment_date'] = raw.payment_date;
    }
    if (raw.reference_number) payload['reference_number'] = raw.reference_number;
    if (raw.notes) payload['notes'] = raw.notes;

    this.saving.set(true);
    this.downpaymentService.createManualPayment(this.data.contractId, payload as any).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Abono de enganche registrado correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo registrar el abono'
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
