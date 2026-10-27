import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeePortalService } from '../../../employee-portal/services/employee-portal.service';
import { OvertimeRequest } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { formatOvertimeHours, overtimeHours, todayInMexico } from '../../utils/overtime.util';

export interface OvertimeRequestDialogData {
  source: 'employee' | 'portal';
  employeeId?: string;
  employeeName?: string;
  request?: OvertimeRequest;
}

@Component({
  selector: 'app-overtime-request-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, ButtonComponent],
  templateUrl: './overtime-request-dialog.component.html',
  styleUrls: ['./overtime-request-dialog.component.scss'],
})
export class OvertimeRequestDialogComponent {
  saving = signal(false);
  form: FormGroup;
  readonly today = todayInMexico();
  readonly isEdit: boolean;
  readonly formatHours = formatOvertimeHours;

  private formValue;
  requestedHours = computed(() => {
    const value = this.formValue();
    return overtimeHours(value?.start_time, value?.end_time);
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OvertimeRequestDialogData,
    private dialogRef: MatDialogRef<OvertimeRequestDialogComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private portalService: EmployeePortalService,
    private interceptor: InterceptorService
  ) {
    this.isEdit = !!data.request;
    const request = data.request;
    this.form = this.fb.group({
      work_date: [request?.work_date?.slice(0, 10) ?? '', Validators.required],
      start_time: [request?.start_time ?? '', Validators.required],
      end_time: [request?.end_time ?? '', Validators.required],
      reason: [request?.reason ?? '', [Validators.required, Validators.maxLength(500)]],
      notes: [request?.notes ?? '', Validators.maxLength(500)],
    });
    this.formValue = toSignal(this.form.valueChanges, {
      initialValue: this.form.value,
    });
  }

  close(): void {
    if (!this.saving()) {
      this.dialogRef.close(false);
    }
  }

  submit(): void {
    if (this.form.invalid || this.requestedHours() == null) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const payload = {
      work_date: value.work_date,
      start_time: value.start_time,
      end_time: value.end_time,
      reason: String(value.reason).trim(),
      notes: String(value.notes ?? '').trim() || undefined,
    };
    this.saving.set(true);

    const request$ = this.isEdit
      ? this.data.source === 'portal'
        ? this.portalService.updateMyOvertimeRequest(this.data.request!.id, {
            ...payload,
            notes: payload.notes ?? null,
          })
        : this.employeeService.updateOvertimeRequest(this.data.request!.id, {
            ...payload,
            notes: payload.notes ?? null,
          })
      : this.data.source === 'portal'
        ? this.portalService.createMyOvertimeRequest(payload)
        : this.employeeService.createOvertimeRequest(this.data.employeeId ?? '', payload);

    request$.subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: this.isEdit
            ? 'Solicitud actualizada'
            : `Solicitud enviada: ${formatOvertimeHours(saved.requested_hours)}`,
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo enviar la solicitud',
        });
      },
    });
  }
}
