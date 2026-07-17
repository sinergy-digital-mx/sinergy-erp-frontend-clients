import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeeService } from '../../services/employee.service';
import {
  Employee,
  LeaveRequest,
  getLeaveStatusLabel,
  getLeaveTypeLabel,
  getPaymentFrequencyLabel,
} from '../../models/employee.model';
import { EMPLOYEE_PERMISSIONS } from '../../config/permissions.config';
import { LeaveRequestDialogComponent } from '../../components/leave-request-dialog/leave-request-dialog.component';
import { LeaveReviewDialogComponent } from '../../components/leave-review-dialog/leave-review-dialog.component';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  readonly permissions = EMPLOYEE_PERMISSIONS;
  readonly getLeaveTypeLabel = getLeaveTypeLabel;
  readonly getLeaveStatusLabel = getLeaveStatusLabel;
  readonly getPaymentFrequencyLabel = getPaymentFrequencyLabel;

  employee = signal<Employee | null>(null);
  leaveRequests = signal<LeaveRequest[]>([]);
  loading = signal(true);
  uploadingPhoto = signal(false);

  private employeeId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private auth: AuthService,
    private interceptor: InterceptorService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.employeeId) {
      this.load();
    }
  }

  get canManageLeave(): boolean {
    return this.auth.hasPermission(this.permissions.manageLeave) || this.auth.hasAdminRole();
  }

  get canUpdate(): boolean {
    return this.auth.hasPermission(this.permissions.update) || this.auth.hasAdminRole();
  }

  load(): void {
    this.loading.set(true);
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (emp) => {
        this.employee.set(emp);
        this.leaveRequests.set(emp.leave_requests ?? []);
        this.loading.set(false);
        if (!emp.leave_requests) {
          this.loadLeaveRequests();
        }
      },
      error: (error) => {
        this.loading.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo cargar el empleado',
        });
      },
    });
  }

  private loadLeaveRequests(): void {
    this.employeeService.getEmployeeLeaveRequests(this.employeeId).subscribe({
      next: (requests) => this.leaveRequests.set(requests),
      error: () => {},
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  fullName(emp: Employee): string {
    const name = `${emp.first_name ?? ''} ${emp.last_name ?? ''}`.trim();
    return name || emp.email || 'Empleado';
  }

  initials(emp: Employee): string {
    const first = emp.first_name?.trim().charAt(0) ?? '';
    const last = emp.last_name?.trim().charAt(0) ?? '';
    return `${first}${last}`.toUpperCase() || emp.email?.charAt(0)?.toUpperCase() || '?';
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.uploadingPhoto.set(true);
    this.employeeService.uploadPhoto(this.employeeId, file).subscribe({
      next: (result) => {
        this.uploadingPhoto.set(false);
        this.employee.update((emp) => (emp ? { ...emp, photo_url: result.photo_url } : emp));
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Foto actualizada',
        });
      },
      error: (error) => {
        this.uploadingPhoto.set(false);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo subir la foto',
        });
      },
    });
    input.value = '';
  }

  openLeaveRequest(): void {
    const emp = this.employee();
    if (!emp) {
      return;
    }
    this.dialog
      .open(LeaveRequestDialogComponent, {
        width: '480px',
        panelClass: 'custom-dialog-container',
        data: {
          employeeId: emp.id,
          employeeName: this.fullName(emp),
          availableDays: emp.vacation?.available_days,
        },
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.load();
        }
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
          this.load();
        }
      });
  }

  cancel(request: LeaveRequest): void {
    this.employeeService.cancelLeaveRequest(request.id).subscribe({
      next: () => {
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Solicitud cancelada',
        });
        this.load();
      },
      error: (error) => {
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo cancelar',
        });
      },
    });
  }
}
