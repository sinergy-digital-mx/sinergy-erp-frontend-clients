import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { EmployeeService } from '../../services/employee.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import {
  CreateLeaveRequestDto,
  LEAVE_TYPE_OPTIONS,
  LeaveRequest,
  LeaveType,
  UpdateLeaveRequestDto,
} from '../../models/employee.model';
import { getLeaveDays } from '../../utils/mexican-labor.util';

export interface LeaveRequestDialogData {
  employeeId?: string;
  employeeName?: string;
  availableDays?: number;
  /** Si viene, el diálogo corrige la solicitud (PUT). */
  request?: LeaveRequest;
}

/**
 * Registra o corrige una solicitud de vacaciones / ausencia (vista RH).
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
  readonly isEdit: boolean;
  saving = signal(false);
  form: FormGroup;
  private daysTouched = false;
  private readonly originalStart: string;
  private readonly originalEnd: string;

  private formValue;
  calculatedDays = computed(() => {
    const value = this.formValue();
    return getLeaveDays(
      value?.start_date,
      value?.end_date,
      value?.type,
      !!value?.count_weekends
    );
  });

  requestedDays = computed(() => {
    const override = this.parseOptionalDays(this.formValue()?.days);
    return override ?? this.calculatedDays();
  });

  hasDaysOverride = computed(() => this.parseOptionalDays(this.formValue()?.days) != null);

  exceedsAvailable = computed(() => {
    const value = this.formValue();
    const available = this.effectiveAvailableDays();
    if (value?.type !== 'vacation' || available == null) {
      return false;
    }
    return this.requestedDays() > available;
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LeaveRequestDialogData,
    private dialogRef: MatDialogRef<LeaveRequestDialogComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private interceptor: InterceptorService
  ) {
    const request = data.request;
    this.isEdit = !!request;
    this.originalStart = this.toDateInput(request?.start_date);
    this.originalEnd = this.toDateInput(request?.end_date);
    this.form = this.fb.group({
      type: [request?.type ?? ('vacation' as LeaveType), Validators.required],
      start_date: [this.toDateInput(request?.start_date), Validators.required],
      end_date: [this.toDateInput(request?.end_date), Validators.required],
      reason: [request?.reason ?? ''],
      is_paid: [request?.is_paid ?? true],
      days: [''],
      count_weekends: [!!request?.count_weekends],
    });
    this.formValue = toSignal(this.form.valueChanges, { initialValue: this.form.value });
    this.form.get('days')?.valueChanges.subscribe(() => {
      this.daysTouched = true;
    });
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
        message: `El empleado solo tiene ${this.effectiveAvailableDays()} día(s) de vacaciones disponibles`,
      });
      return;
    }

    const payload = this.buildPayload();
    this.saving.set(true);

    if (!this.isEdit && !this.data.employeeId) {
      this.interceptor.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'Falta el empleado para registrar la solicitud',
      });
      return;
    }

    const request$ = this.isEdit
      ? this.employeeService.updateLeaveRequest(this.data.request!.id, payload)
      : this.employeeService.createLeaveRequest(this.data.employeeId!, payload as CreateLeaveRequestDto);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: this.isEdit ? 'Solicitud corregida' : 'Solicitud registrada',
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message:
            error?.message ||
            (this.isEdit ? 'No se pudo corregir la solicitud' : 'No se pudo registrar la solicitud'),
        });
      },
    });
  }

  private buildPayload(): CreateLeaveRequestDto | UpdateLeaveRequestDto {
    const value = this.form.value;
    const payload: CreateLeaveRequestDto = {
      type: value.type,
      start_date: value.start_date,
      end_date: value.end_date,
      reason: value.reason || undefined,
      is_paid: value.is_paid,
    };

    if (value.type === 'vacation') {
      payload.count_weekends = !!value.count_weekends;
    }

    const datesChanged =
      this.isEdit &&
      (value.start_date !== this.originalStart || value.end_date !== this.originalEnd);
    const daysOverride = this.parseOptionalDays(value.days);
    // Si cambian fechas y RH no tocó días, el API recalcula (hábiles en vacation).
    if (daysOverride != null && (!datesChanged || this.daysTouched)) {
      payload.days = daysOverride;
    }

    return payload;
  }

  /**
   * Al corregir una vacación, los días de esa solicitud ya están en pending/taken.
   * Se reintegran para no bloquear un ajuste sobre el mismo periodo.
   */
  private effectiveAvailableDays(): number | null {
    if (this.data.availableDays == null) {
      return null;
    }
    const original = this.data.request;
    const originalDays =
      original?.type === 'vacation' ? Number(original.days) || 0 : 0;
    return this.data.availableDays + originalDays;
  }

  private parseOptionalDays(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const n = Number(value);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  private toDateInput(value: string | undefined): string {
    if (!value) {
      return '';
    }
    return value.slice(0, 10);
  }
}
