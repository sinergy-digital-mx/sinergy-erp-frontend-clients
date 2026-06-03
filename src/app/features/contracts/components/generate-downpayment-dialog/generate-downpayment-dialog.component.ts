import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contract } from '../../models/contract.model';

@Component({
  selector: 'app-generate-downpayment-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="dialog-overlay">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2 class="text-xl font-semibold text-gray-900">Generar cuotas del saldo</h2>
          <button type="button" (click)="closeDialog()" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="dialog-body">
            <p class="text-sm text-gray-600 mb-4">
              Contrato <strong>{{ data.contract.contract_number }}</strong>.
              Abonado hasta ahora:
              <strong>{{ appliedAmount | currency:data.contract.currency }}</strong>.
            </p>

            <div class="space-y-4">
              <div>
                <label for="down_payment_target" class="block text-sm font-medium text-gray-700 mb-1">
                  Meta total de enganche *
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    id="down_payment_target"
                    type="number"
                    step="0.01"
                    min="0.01"
                    formControlName="down_payment_target"
                    class="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="form.get('down_payment_target')?.invalid && form.get('down_payment_target')?.touched">
                </div>
                <p *ngIf="remainingToSchedule > 0" class="mt-1 text-xs text-blue-700">
                  Saldo a cuotizar: {{ remainingToSchedule | currency:data.contract.currency }}
                </p>
              </div>

              <div>
                <label for="down_payment_months" class="block text-sm font-medium text-gray-700 mb-1">Meses *</label>
                <input
                  id="down_payment_months"
                  type="number"
                  min="1"
                  step="1"
                  formControlName="down_payment_months"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              </div>

              <div>
                <label for="first_payment_date" class="block text-sm font-medium text-gray-700 mb-1">Fecha primer pago *</label>
                <input
                  id="first_payment_date"
                  type="date"
                  formControlName="first_payment_date"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              </div>

              <div>
                <label for="payment_day" class="block text-sm font-medium text-gray-700 mb-1">Día de pago mensual</label>
                <input
                  id="payment_day"
                  type="number"
                  min="1"
                  max="31"
                  step="1"
                  formControlName="payment_day"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button type="button" (click)="closeDialog()" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || generating()"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50">
              {{ generating() ? 'Generando...' : 'Generar cuotas' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .dialog-container { background: white; border-radius: 12px; width: 90%; max-width: 500px; box-shadow: 0 20px 25px -5px rgba(0,0,0,.1); }
    .dialog-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #e5e7eb; }
    .dialog-body { padding: 1.5rem; }
    .dialog-footer { display: flex; justify-content: flex-end; gap: .75rem; padding: 1.5rem; border-top: 1px solid #e5e7eb; }
  `]
})
export class GenerateDownpaymentDialogComponent {
  form: FormGroup;
  generating = signal(false);

  constructor(
    public dialogRef: MatDialogRef<GenerateDownpaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contract: Contract; appliedAmount?: number },
    private fb: FormBuilder
  ) {
    const target = data.contract.down_payment_target ?? data.contract.down_payment ?? null;
    this.form = this.fb.group({
      down_payment_target: [target, [Validators.required, Validators.min(0.01)]],
      down_payment_months: [data.contract.down_payment_months || 8, [Validators.required, Validators.min(1)]],
      first_payment_date: [
        data.contract.down_payment_first_payment_date || data.contract.first_payment_date || '',
        Validators.required
      ],
      payment_day: [data.contract.down_payment_payment_day || 5, [Validators.min(1), Validators.max(31)]]
    });
  }

  get appliedAmount(): number {
    return this.data.appliedAmount ?? this.data.contract.down_payment ?? 0;
  }

  get remainingToSchedule(): number {
    const target = Number(this.form.get('down_payment_target')?.value) || 0;
    return Math.max(0, target - this.appliedAmount);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
