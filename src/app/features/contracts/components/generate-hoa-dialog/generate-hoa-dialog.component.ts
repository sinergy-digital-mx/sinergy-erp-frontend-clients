import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contract } from '../../models/contract.model';

@Component({
  selector: 'app-generate-hoa-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="dialog-overlay">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2 class="text-xl font-semibold text-gray-900">Generar Pagos de HOA</h2>
          <button
            type="button"
            (click)="closeDialog()"
            class="text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="dialog-body">
            <p class="text-sm text-gray-600 mb-4">
              Genera pagos mensuales de HOA para el contrato <strong>{{ data.contract.contract_number }}</strong>
            </p>

            <div class="space-y-4">
              <!-- Fecha de Inicio -->
              <div>
                <label for="start_date" class="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Inicio
                </label>
                <input
                  id="start_date"
                  type="date"
                  formControlName="start_date"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  [class.border-red-500]="form.get('start_date')?.invalid && form.get('start_date')?.touched">
                <p *ngIf="form.get('start_date')?.invalid && form.get('start_date')?.touched" 
                   class="mt-1 text-xs text-red-600">
                  La fecha de inicio es requerida
                </p>
              </div>

              <!-- Fecha de Fin -->
              <div>
                <label for="end_date" class="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Fin
                </label>
                <input
                  id="end_date"
                  type="date"
                  formControlName="end_date"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  [class.border-red-500]="form.get('end_date')?.invalid && form.get('end_date')?.touched">
                <p *ngIf="form.get('end_date')?.invalid && form.get('end_date')?.touched" 
                   class="mt-1 text-xs text-red-600">
                  La fecha de fin es requerida
                </p>
                <p *ngIf="form.hasError('endDateBeforeStart')" 
                   class="mt-1 text-xs text-red-600">
                  La fecha de fin debe ser posterior a la fecha de inicio
                </p>
              </div>

              <!-- Monto -->
              <div>
                <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
                  Monto Mensual
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    formControlName="amount"
                    placeholder="0.00"
                    class="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="form.get('amount')?.invalid && form.get('amount')?.touched">
                </div>
                <p *ngIf="form.get('amount')?.invalid && form.get('amount')?.touched" 
                   class="mt-1 text-xs text-red-600">
                  El monto es requerido y debe ser mayor a 0
                </p>
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button
              type="button"
              (click)="closeDialog()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || generating()"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ generating() ? 'Generando...' : 'Generar Pagos' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog-container {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .dialog-body {
      padding: 1.5rem;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }
  `]
})
export class GenerateHoaDialogComponent {
  form: FormGroup;
  generating = signal(false);

  constructor(
    public dialogRef: MatDialogRef<GenerateHoaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contract: Contract },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      start_date: [this.data.contract.contract_date, Validators.required],
      end_date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    }, { validators: this.dateRangeValidator });
  }

  dateRangeValidator(group: FormGroup) {
    const startDate = group.get('start_date')?.value;
    const endDate = group.get('end_date')?.value;
    
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      return { endDateBeforeStart: true };
    }
    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
