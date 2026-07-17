import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { EmployeeService } from '../../services/employee.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LeaveRequest, getLeaveTypeLabel } from '../../models/employee.model';

export interface LeaveReviewDialogData {
  request: LeaveRequest;
  decision: 'approved' | 'rejected';
}

/**
 * Approve / reject a leave request with optional review notes.
 */
@Component({
  selector: 'app-leave-review-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, ButtonComponent],
  templateUrl: './leave-review-dialog.component.html',
  styleUrls: ['./leave-review-dialog.component.scss'],
})
export class LeaveReviewDialogComponent {
  saving = signal(false);
  form: FormGroup;

  readonly isApproval: boolean;
  readonly typeLabel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LeaveReviewDialogData,
    private dialogRef: MatDialogRef<LeaveReviewDialogComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private interceptor: InterceptorService
  ) {
    this.isApproval = data.decision === 'approved';
    this.typeLabel = getLeaveTypeLabel(data.request.type);
    this.form = this.fb.group({ review_notes: [''] });
  }

  close(): void {
    if (!this.saving()) {
      this.dialogRef.close(false);
    }
  }

  confirm(): void {
    this.saving.set(true);
    this.employeeService
      .reviewLeaveRequest(this.data.request.id, {
        status: this.data.decision,
        review_notes: this.form.get('review_notes')?.value || undefined,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.interceptor.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: this.isApproval ? 'Solicitud aprobada' : 'Solicitud rechazada',
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.saving.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.message || 'No se pudo procesar la solicitud',
          });
        },
      });
  }
}
