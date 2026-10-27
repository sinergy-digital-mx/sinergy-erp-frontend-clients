import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeePortalService } from '../../../employee-portal/services/employee-portal.service';
import { OvertimeRequest, getOvertimeStatusLabel } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import {
  formatOvertimeDate,
  formatOvertimeHours,
  formatOvertimeMoney,
  formatOvertimeWhen,
} from '../../utils/overtime.util';
import { OvertimeRequestDialogComponent } from '../overtime-request-dialog/overtime-request-dialog.component';
import { OvertimeReviewDialogComponent } from '../overtime-review-dialog/overtime-review-dialog.component';

@Component({
  selector: 'app-overtime-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overtime-section.component.html',
  styleUrls: ['./overtime-section.component.scss'],
})
export class OvertimeSectionComponent implements OnInit {
  @Input() source: 'employee' | 'portal' = 'employee';
  @Input() employeeId = '';
  @Input() employeeName = '';
  @Input() canRequest = false;
  @Input() canReview = false;

  requests = signal<OvertimeRequest[]>([]);
  loading = signal(true);
  confirmingPayId = signal<string | null>(null);
  payingId = signal<string | null>(null);

  readonly statusLabel = getOvertimeStatusLabel;
  readonly formatDate = formatOvertimeDate;
  readonly formatHours = formatOvertimeHours;
  readonly formatMoney = formatOvertimeMoney;
  readonly formatWhen = formatOvertimeWhen;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private portalService: EmployeePortalService,
    private interceptor: InterceptorService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    const request$ =
      this.source === 'portal'
        ? this.portalService.getMyOvertimeRequests()
        : this.employeeService.getEmployeeOvertimeRequests(this.employeeId);
    request$.subscribe({
      next: (rows) => {
        this.requests.set(rows ?? []);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudieron cargar las horas extras',
        });
      },
    });
  }

  openCreate(): void {
    this.openDialog();
  }

  openEdit(request: OvertimeRequest): void {
    this.openDialog(request);
  }

  openReview(request: OvertimeRequest): void {
    this.dialog
      .open(OvertimeReviewDialogComponent, {
        width: '560px',
        maxWidth: '94vw',
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        data: { request },
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed) this.load();
      });
  }

  askPay(request: OvertimeRequest): void {
    this.confirmingPayId.set(request.id);
  }

  cancelPay(): void {
    this.confirmingPayId.set(null);
  }

  confirmPay(request: OvertimeRequest): void {
    this.payingId.set(request.id);
    this.employeeService.markOvertimePaid(request.id).subscribe({
      next: () => {
        this.payingId.set(null);
        this.confirmingPayId.set(null);
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Horas extras marcadas como pagadas',
        });
        this.load();
      },
      error: (error) => {
        this.payingId.set(null);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo registrar el pago',
        });
      },
    });
  }

  private openDialog(request?: OvertimeRequest): void {
    this.dialog
      .open(OvertimeRequestDialogComponent, {
        width: '520px',
        maxWidth: '94vw',
        autoFocus: false,
        panelClass: 'custom-dialog-container',
        data: {
          source: this.source,
          employeeId: this.employeeId,
          employeeName: this.employeeName,
          request,
        },
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed) this.load();
      });
  }
}
