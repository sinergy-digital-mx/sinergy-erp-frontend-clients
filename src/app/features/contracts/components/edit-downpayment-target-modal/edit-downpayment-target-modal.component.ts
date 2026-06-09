import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { DownpaymentPaymentService } from '../../services/downpayment-payment.service';

@Component({
  selector: 'app-edit-downpayment-target-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    LucideAngularModule
  ],
  templateUrl: './edit-downpayment-target-modal.component.html',
  styleUrl: './edit-downpayment-target-modal.component.scss'
})
export class EditDownpaymentTargetModalComponent {
  readonly X = X;
  form: FormGroup;
  saving = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      contractId: string;
      currency: string;
      currentTarget: number | null;
      appliedAmount: number;
    },
    private dialogRef: MatDialogRef<EditDownpaymentTargetModalComponent>,
    private fb: FormBuilder,
    private downpaymentService: DownpaymentPaymentService,
    private interceptorService: InterceptorService
  ) {
    this.form = this.fb.group({
      down_payment_target: [
        data.currentTarget ?? '',
        [Validators.required, Validators.min(0.01)]
      ]
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const target = Number(this.form.get('down_payment_target')?.value);
    if (!Number.isFinite(target) || target <= 0) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'La meta de enganche debe ser mayor a 0'
      });
      return;
    }

    this.saving.set(true);
    this.downpaymentService.updateTarget(this.data.contractId, { down_payment_target: target }).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Meta de enganche actualizada correctamente'
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo actualizar la meta de enganche'
        });
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
