import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, Plus, Paperclip, X } from 'lucide-angular';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeePortalService } from '../../../employee-portal/services/employee-portal.service';
import { EmployeeService } from '../../services/employee.service';
import {
  LeaveDocument,
  LeaveRequest,
  SickLeaveYearSummary,
  getLeaveStatusLabel,
} from '../../models/employee.model';
import { LeaveReviewDialogComponent } from '../leave-review-dialog/leave-review-dialog.component';
import { SickLeaveRequestDialogComponent } from '../sick-leave-request-dialog/sick-leave-request-dialog.component';

const MAX_FILES = 8;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = '.pdf,.png,.jpg,.jpeg,.webp,.heic,.heif,application/pdf,image/*';

@Component({
  selector: 'app-sick-leave-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sick-leave-section.component.html',
  styleUrls: ['./sick-leave-section.component.scss'],
})
export class SickLeaveSectionComponent {
  @Input() source: 'employee' | 'portal' = 'employee';
  @Input() employeeId = '';
  @Input() employeeName = '';
  @Input() requests: LeaveRequest[] = [];
  @Input() summary: SickLeaveYearSummary | null = null;
  @Input() canRequest = false;
  @Input() canReview = false;
  @Input() canCorrect = false;
  @Input() canCancel = false;
  @Output() refreshed = new EventEmitter<void>();

  readonly plus = Plus;
  readonly paperclip = Paperclip;
  readonly closeIcon = X;
  readonly accept = ACCEPT;
  readonly statusLabel = getLeaveStatusLabel;

  uploadingId = signal<string | null>(null);
  removingId = signal<string | null>(null);
  confirmingId = signal<string | null>(null);

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private portalService: EmployeePortalService,
    private interceptor: InterceptorService
  ) {}

  get rows(): LeaveRequest[] {
    return (this.requests ?? []).filter((request) => request.type === 'sick_leave');
  }

  get year(): number {
    return this.summary?.year ?? new Date().getFullYear();
  }

  get approvedDays(): number {
    return Number(this.summary?.approved_days ?? 0);
  }

  get pendingDays(): number {
    return Number(this.summary?.pending_days ?? 0);
  }

  get requestCount(): number {
    return Number(this.summary?.request_count ?? 0);
  }

  openCreate(): void {
    this.openDialog();
  }

  openCorrect(request: LeaveRequest): void {
    this.openDialog(request);
  }

  canAttach(request: LeaveRequest): boolean {
    if (request.status === 'cancelled' || request.status === 'rejected') {
      return false;
    }
    if ((request.documents?.length ?? 0) >= MAX_FILES) {
      return false;
    }
    return this.canRequest || this.canCorrect || this.canReview;
  }

  canRemove(request: LeaveRequest): boolean {
    if (request.status === 'cancelled' || request.status === 'rejected') {
      return false;
    }
    return this.canRequest || this.canCorrect || this.canReview;
  }

  onFile(request: LeaveRequest, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }
    const error = this.fileError(file);
    if (error) {
      this.interceptor.openSnackbar({ type: 'warning', title: 'Comprobante', message: error });
      return;
    }
    this.uploadingId.set(request.id);
    this.upload(request.id, file).subscribe({
      next: () => {
        this.uploadingId.set(null);
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Comprobante',
          message: 'El archivo quedó en esta solicitud',
        });
        this.refreshed.emit();
      },
      error: (err) => {
        this.uploadingId.set(null);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'No se pudo subir',
          message: err?.message || 'Inténtalo de nuevo',
        });
      },
    });
  }

  askRemove(documentId: string): void {
    this.confirmingId.set(this.confirmingId() === documentId ? null : documentId);
  }

  remove(request: LeaveRequest, document: LeaveDocument): void {
    this.confirmingId.set(null);
    this.removingId.set(document.id);
    const call =
      this.source === 'portal'
        ? this.portalService.removeMyLeaveDocument(request.id, document.id)
        : this.employeeService.removeLeaveDocument(request.id, document.id);
    call.subscribe({
      next: () => {
        this.removingId.set(null);
        this.refreshed.emit();
      },
      error: (err) => {
        this.removingId.set(null);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'No se pudo quitar',
          message: err?.message || 'Inténtalo de nuevo',
        });
      },
    });
  }

  review(request: LeaveRequest, decision: 'approved' | 'rejected'): void {
    this.dialog
      .open(LeaveReviewDialogComponent, {
        width: '460px',
        panelClass: 'custom-dialog-container',
        data: { request, decision },
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed) {
          this.refreshed.emit();
        }
      });
  }

  cancel(request: LeaveRequest): void {
    const call =
      this.source === 'portal'
        ? this.portalService.cancelMyLeaveRequest(request.id)
        : this.employeeService.cancelLeaveRequest(request.id);
    call.subscribe({
      next: () => {
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Solicitud',
          message: 'La incapacidad quedó cancelada',
        });
        this.refreshed.emit();
      },
      error: (err) => {
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'No se pudo cancelar',
          message: err?.message || 'Inténtalo de nuevo',
        });
      },
    });
  }

  rangeLabel(request: LeaveRequest): string {
    const start = request.start_date?.slice(0, 10) ?? '';
    const end = request.end_date?.slice(0, 10) ?? '';
    if (!start) {
      return 'Sin fechas';
    }
    if (start === end) {
      return formatDay(start, true);
    }
    const sameYear = start.slice(0, 4) === end.slice(0, 4);
    return `${formatDay(start, !sameYear)} — ${formatDay(end, true)}`;
  }

  daysLabel(value: number): string {
    const text = this.dayFigure(value);
    const rounded = Number(text);
    return `${text} ${rounded === 1 ? 'día' : 'días'}`;
  }

  dayFigure(value: number): string {
    const rounded = Math.round(Number(value) * 10) / 10;
    if (!Number.isFinite(rounded)) {
      return '0';
    }
    return Number.isInteger(rounded) ? String(rounded) : String(rounded);
  }

  isImage(document: LeaveDocument): boolean {
    if ((document.mime_type || '').startsWith('image/')) {
      return true;
    }
    return /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(document.file_name || '');
  }

  extLabel(document: LeaveDocument): string {
    const match = /\.([a-z0-9]+)$/i.exec(document.file_name || '');
    return (match?.[1] || 'PDF').slice(0, 4).toUpperCase();
  }

  private openDialog(request?: LeaveRequest): void {
    this.dialog
      .open(SickLeaveRequestDialogComponent, {
        width: '640px',
        maxWidth: '94vw',
        autoFocus: false,
        panelClass: 'sick-leave-dialog',
        data: {
          source: this.source,
          employeeId: this.employeeId,
          employeeName: this.employeeName,
          request,
        },
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.refreshed.emit();
        }
      });
  }

  private upload(requestId: string, file: File) {
    return this.source === 'portal'
      ? this.portalService.uploadMyLeaveDocument(requestId, file)
      : this.employeeService.uploadLeaveDocument(requestId, file);
  }

  private fileError(file: File): string | null {
    if (file.size > MAX_BYTES) {
      return 'El archivo supera 10 MB';
    }
    const ok =
      /pdf|jpe?g|png|webp|heic|heif/i.test(file.type) ||
      /\.(pdf|jpe?g|png|webp|heic|heif)$/i.test(file.name);
    return ok ? null : 'Sube un PDF o una imagen';
  }
}

function formatDay(iso: string, withYear: boolean): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) {
    return iso;
  }
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: withYear ? 'numeric' : undefined,
  })
    .format(date)
    .replace(/\./g, '');
}
