import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { OvertimePayment, OvertimeRequest } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import {
  formatOvertimeDate,
  formatOvertimeHours,
  formatOvertimeMoney,
} from '../../utils/overtime.util';

export interface OvertimeReviewDialogData {
  request: OvertimeRequest;
}

@Component({
  selector: 'app-overtime-review-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, ButtonComponent],
  templateUrl: './overtime-review-dialog.component.html',
  styleUrls: ['./overtime-review-dialog.component.scss'],
})
export class OvertimeReviewDialogComponent implements OnDestroy {
  saving = signal(false);
  previewing = signal(false);
  preview = signal<OvertimePayment | null>(null);
  previewError = signal('');
  form: FormGroup;

  readonly formatDate = formatOvertimeDate;
  readonly formatHours = formatOvertimeHours;
  readonly formatMoney = formatOvertimeMoney;

  private previewTimer?: ReturnType<typeof setTimeout>;
  private previewSeq = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OvertimeReviewDialogData,
    private dialogRef: MatDialogRef<OvertimeReviewDialogComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private interceptor: InterceptorService
  ) {
    const hours = data.request.approved_hours ?? data.request.requested_hours;
    this.form = this.fb.group({
      approved_hours: [hours, [Validators.required, Validators.min(0.01), Validators.max(24)]],
      review_notes: [data.request.review_notes ?? ''],
    });
    this.form.get('approved_hours')?.valueChanges.subscribe(() => this.schedulePreview());
    this.loadPreview();
  }

  ngOnDestroy(): void {
    clearTimeout(this.previewTimer);
  }

  get employeeName(): string {
    const employee = this.data.request.employee;
    const name = `${employee?.first_name ?? ''} ${employee?.last_name ?? ''}`.trim();
    return name || employee?.email || 'Empleado';
  }

  close(): void {
    if (!this.saving()) {
      this.dialogRef.close(false);
    }
  }

  approve(): void {
    const hours = Number(this.form.get('approved_hours')?.value);
    if (!Number.isFinite(hours) || hours <= 0 || this.previewError()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submit('approved', hours);
  }

  reject(): void {
    this.submit('rejected');
  }

  private submit(status: 'approved' | 'rejected', approvedHours?: number): void {
    this.saving.set(true);
    this.employeeService
      .reviewOvertimeRequest(this.data.request.id, {
        status,
        approved_hours: approvedHours,
        review_notes: String(this.form.get('review_notes')?.value ?? '').trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.interceptor.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: status === 'approved' ? 'Horas extras aprobadas' : 'Solicitud rechazada',
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.saving.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.message || 'No se pudo guardar la revisión',
          });
        },
      });
  }

  private schedulePreview(): void {
    clearTimeout(this.previewTimer);
    this.previewTimer = setTimeout(() => this.loadPreview(), 250);
  }

  private loadPreview(): void {
    const hours = Number(this.form.get('approved_hours')?.value);
    if (!Number.isFinite(hours) || hours <= 0 || hours > 24) {
      this.preview.set(null);
      this.previewError.set('Las horas autorizadas deben ser mayores a 0 y no superar 24');
      return;
    }
    const seq = ++this.previewSeq;
    this.previewing.set(true);
    this.previewError.set('');
    this.employeeService.previewOvertimeRequest(this.data.request.id, hours).subscribe({
      next: (result) => {
        if (seq !== this.previewSeq) return;
        this.previewing.set(false);
        this.preview.set(result.payment);
      },
      error: (error) => {
        if (seq !== this.previewSeq) return;
        this.previewing.set(false);
        this.preview.set(null);
        this.previewError.set(error?.message || 'No se pudo calcular el importe');
      },
    });
  }
}
