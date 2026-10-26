import { Component, Inject, OnDestroy, ViewEncapsulation, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideAngularModule, Stethoscope, X, FileText } from 'lucide-angular';
import { catchError, concatMap, from, last, of, switchMap, throwError } from 'rxjs';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeePortalService } from '../../../employee-portal/services/employee-portal.service';
import { EmployeeService } from '../../services/employee.service';
import { CreateLeaveRequestDto, LeaveRequest } from '../../models/employee.model';
import { getLeaveDays } from '../../utils/mexican-labor.util';

export interface SickLeaveDialogData {
  source: 'employee' | 'portal';
  employeeId?: string;
  employeeName?: string;
  request?: LeaveRequest;
}

interface PendingFile {
  id: string;
  file: File;
  previewUrl: string | null;
}

const MAX_FILES = 8;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = '.pdf,.png,.jpg,.jpeg,.webp,.heic,.heif,application/pdf,image/*';

@Component({
  selector: 'app-sick-leave-request-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './sick-leave-request-dialog.component.html',
  styleUrls: ['./sick-leave-request-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SickLeaveRequestDialogComponent implements OnDestroy {
  readonly stethoscope = Stethoscope;
  readonly closeIcon = X;
  readonly fileIcon = FileText;
  readonly accept = ACCEPT;
  readonly isEdit: boolean;

  saving = signal(false);
  dragging = signal(false);
  halfDay = signal(false);
  files = signal<PendingFile[]>([]);
  reasonLength = signal(0);

  form: FormGroup;
  private formValue;

  singleDay = computed(() => {
    const value = this.formValue();
    return !!value?.start_date && value.start_date === value.end_date;
  });

  previewDays = computed(() => {
    const value = this.formValue();
    const full = getLeaveDays(value?.start_date, value?.end_date, 'sick_leave', true);
    if (this.singleDay() && this.halfDay()) {
      return 0.5;
    }
    return full;
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SickLeaveDialogData,
    private dialogRef: MatDialogRef<SickLeaveRequestDialogComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private portalService: EmployeePortalService,
    private interceptor: InterceptorService
  ) {
    const request = data.request;
    this.isEdit = !!request;
    const start = toDateInput(request?.start_date);
    const end = toDateInput(request?.end_date);
    this.halfDay.set(!!request && start === end && Number(request.days) === 0.5);
    this.form = this.fb.group({
      start_date: [start, Validators.required],
      end_date: [end, Validators.required],
      reason: [request?.reason ?? '', Validators.maxLength(500)],
      is_paid: [request?.is_paid !== false],
    });
    this.reasonLength.set((request?.reason ?? '').length);
    this.formValue = toSignal(this.form.valueChanges, { initialValue: this.form.value });
    this.form.get('reason')?.valueChanges.subscribe((value) => {
      this.reasonLength.set(String(value ?? '').length);
    });
    this.form.get('start_date')?.valueChanges.subscribe(() => this.syncHalfDay());
    this.form.get('end_date')?.valueChanges.subscribe(() => this.syncHalfDay());
  }

  ngOnDestroy(): void {
    for (const item of this.files()) {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    }
  }

  close(): void {
    if (!this.saving()) {
      this.dialogRef.close(false);
    }
  }

  togglePaid(): void {
    const control = this.form.get('is_paid');
    control?.setValue(!control.value);
  }

  setHalfDay(value: boolean): void {
    this.halfDay.set(value);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    const current = event.currentTarget as HTMLElement | null;
    const next = event.relatedTarget as Node | null;
    if (current && next && current.contains(next)) {
      return;
    }
    this.dragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    this.addFiles(event.dataTransfer?.files);
  }

  onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.addFiles(input.files);
    input.value = '';
  }

  removeFile(id: string): void {
    const current = this.files();
    const target = current.find((item) => item.id === id);
    if (target?.previewUrl) {
      URL.revokeObjectURL(target.previewUrl);
    }
    this.files.set(current.filter((item) => item.id !== id));
  }

  dayLabel(days: number): string {
    return days === 1 ? 'día natural' : 'días naturales';
  }

  submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    if (value.start_date > value.end_date) {
      this.interceptor.openSnackbar({
        type: 'warning',
        title: 'Fechas',
        message: 'La fecha inicial tiene que ser anterior o igual a la final',
      });
      return;
    }

    const payload = this.buildPayload();
    const pending = this.files().map((item) => item.file);
    let uploadFailed = false;
    this.saving.set(true);
    this.dialogRef.disableClose = true;

    const created$ = this.isEdit
      ? this.employeeService.updateLeaveRequest(this.data.request!.id, payload)
      : this.createRequest(payload);

    created$
      .pipe(
        switchMap((saved) => {
          if (!pending.length) {
            return of(saved);
          }
          return from(pending).pipe(
            concatMap((file) =>
              this.uploadOne(saved.id, file).pipe(
                catchError((error) => {
                  uploadFailed = true;
                  return throwError(() => error);
                })
              )
            ),
            last(),
            catchError((error) => {
              this.interceptor.openSnackbar({
                type: 'warning',
                title: 'Solicitud registrada',
                message:
                  error?.message ||
                  'No se pudo subir un comprobante. Puedes adjuntarlo en el mismo renglón.',
              });
              return of(saved);
            })
          );
        })
      )
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.dialogRef.disableClose = false;
          if (!uploadFailed) {
            this.interceptor.openSnackbar({
              type: 'success',
              title: 'Listo',
              message: this.isEdit
                ? 'Incapacidad actualizada'
                : 'Incapacidad enviada. Queda pendiente de aprobación.',
            });
          }
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.saving.set(false);
          this.dialogRef.disableClose = false;
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'No se pudo guardar',
            message: error?.message || 'Revisa las fechas e inténtalo de nuevo',
          });
        },
      });
  }

  private createRequest(payload: CreateLeaveRequestDto) {
    if (this.data.source === 'portal') {
      return this.portalService.createMyLeaveRequest(payload);
    }
    if (!this.data.employeeId) {
      return throwError(() => new Error('Falta el empleado para registrar la incapacidad'));
    }
    return this.employeeService.createLeaveRequest(this.data.employeeId, payload);
  }

  private uploadOne(requestId: string, file: File) {
    return this.data.source === 'portal'
      ? this.portalService.uploadMyLeaveDocument(requestId, file)
      : this.employeeService.uploadLeaveDocument(requestId, file);
  }

  private buildPayload(): CreateLeaveRequestDto {
    const value = this.form.value;
    const reason = String(value.reason ?? '').trim();
    const payload: CreateLeaveRequestDto = {
      type: 'sick_leave',
      start_date: value.start_date,
      end_date: value.end_date,
      reason: this.isEdit ? reason : reason || undefined,
      is_paid: !!value.is_paid,
    };
    if (this.singleDay() && this.halfDay()) {
      payload.days = 0.5;
    }
    return payload;
  }

  private addFiles(list: FileList | null | undefined): void {
    if (!list?.length) {
      return;
    }
    const next = [...this.files()];
    for (const file of Array.from(list)) {
      if (next.length >= MAX_FILES) {
        this.interceptor.openSnackbar({
          type: 'warning',
          title: 'Comprobantes',
          message: `Puedes adjuntar hasta ${MAX_FILES} archivos`,
        });
        break;
      }
      const error = fileError(file);
      if (error) {
        this.interceptor.openSnackbar({
          type: 'warning',
          title: file.name,
          message: error,
        });
        continue;
      }
      const duplicate = next.some(
        (item) => item.file.name === file.name && item.file.size === file.size
      );
      if (duplicate) {
        continue;
      }
      const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      next.push({ id: `${file.name}-${file.size}-${next.length}`, file, previewUrl });
    }
    this.files.set(next);
  }

  private syncHalfDay(): void {
    const value = this.form.value;
    if (value.start_date !== value.end_date) {
      this.halfDay.set(false);
    }
  }
}

function toDateInput(value: string | undefined): string {
  return value ? value.slice(0, 10) : '';
}

function fileError(file: File): string | null {
  if (file.size > MAX_BYTES) {
    return 'El archivo supera 10 MB';
  }
  const okType =
    /pdf|jpe?g|png|webp|heic|heif/i.test(file.type) ||
    /\.(pdf|jpe?g|png|webp|heic|heif)$/i.test(file.name);
  if (!okType) {
    return 'Sube un PDF o una imagen';
  }
  return null;
}
