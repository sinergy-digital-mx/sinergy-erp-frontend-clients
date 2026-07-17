import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { EmployeeService } from '../../services/employee.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LEAVE_TYPE_OPTIONS, LeaveType } from '../../models/employee.model';
import { getInclusiveDays } from '../../utils/mexican-labor.util';

export interface LeaveRequestDialogData {
  employeeId: string;
  employeeName?: string;
  availableDays?: number;
}

/**
 * Registers a vacation / absence request on behalf of an employee (RH view).
 */
@Component({
  selector: 'app-leave-request-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, ButtonComponent],
  templateUrl: './leave-request-dialog.component.html',
  styleUrls: ['./leave-request-dialog.component.scss'],
})
export class LeaveRequestDialogComponent {
  readonly leaveTypeOptions = LEAVE_TYPE_OPTIONS;
  saving = signal(false);
  form: FormGroup;

  private formValue;
  requestedDays = computed(() => {
    const value = this.formValue();
    return getInclusiveDays(value?.start_date, value?.end_date);
  });

  exceedsAvailable = computed(() => {
    const value = this.formValue();
    if (value?.type !== 'vacation' || this.data.availableDays == null) {
      return false;
    }
    return this.requestedDays() > this.data.availableDays;
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LeaveRequestDialogData,
    private dialogRef: MatDialogRef<LeaveRequestDialogComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private interceptor: InterceptorService
  ) {
    this.form = this.fb.group({
      type: ['vacation' as LeaveType, Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      reason: [''],
      is_paid: [true],
    });
    this.formValue = toSignal(this.form.valueChanges, { initialValue: this.form.value });
  }

  close(): void {
    if (!this.saving()) {
      this.dialogRef.close(false);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    if (value.start_date > value.end_date) {
      this.interceptor.openSnackbar({
        type: 'warning',
        title: 'Fechas inválidas',
        message: 'La fecha inicial debe ser anterior o igual a la final',
      });
      return;
    }

    if (this.exceedsAvailable()) {
      this.interceptor.openSnackbar({
        type: 'warning',
        title: 'Sin días suficientes',
        message: `El empleado solo tiene ${this.data.availableDays} día(s) de vacaciones disponibles`,
      });
      return;
    }

    this.saving.set(true);
    this.employeeService
      .createLeaveRequest(this.data.employeeId, {
        type: value.type,
        start_date: value.start_date,
        end_date: value.end_date,
        reason: value.reason || undefined,
        is_paid: value.is_paid,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.interceptor.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: 'Solicitud registrada',
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.saving.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.message || 'No se pudo registrar la solicitud',
          });
        },
      });
  }
}
