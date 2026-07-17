import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { AuthService } from '../../../../core/services/auth.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeeService } from '../../services/employee.service';
import {
  Employee,
  LeaveRequest,
  LeaveStatus,
  LeaveType,
  getLeaveStatusLabel,
  getLeaveTypeLabel,
} from '../../models/employee.model';
import { EMPLOYEE_PERMISSIONS } from '../../config/permissions.config';
import { LeaveReviewDialogComponent } from '../../components/leave-review-dialog/leave-review-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TabComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  readonly permissions = EMPLOYEE_PERMISSIONS;
  readonly getLeaveTypeLabel = getLeaveTypeLabel;
  readonly getLeaveStatusLabel = getLeaveStatusLabel;

  readonly tabs: TabItem[] = [
    { id: 'employees', title: 'Empleados' },
    { id: 'requests', title: 'Solicitudes' },
  ];
  activeTab = 'employees';

  // Employees list state
  employees = signal<Employee[]>([]);
  loading = signal(false);
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  readonly limit = 20;

  search = '';
  statusFilter = '';
  departmentFilter = '';
  private searchSubject = new Subject<string>();

  // Leave requests state
  leaveRequests = signal<LeaveRequest[]>([]);
  leaveLoading = signal(false);
  leavePage = signal(1);
  leaveTotalPages = signal(1);
  leaveStatusFilter: LeaveStatus | '' = '';
  leaveTypeFilter: LeaveType | '' = '';

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private interceptor: InterceptorService
  ) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe(() => {
        this.page.set(1);
        this.loadEmployees();
      });
    this.loadEmployees();
  }

  get canManageLeave(): boolean {
    return this.auth.hasPermission(this.permissions.manageLeave) || this.auth.hasAdminRole();
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
    if (tabId === 'requests' && this.leaveRequests().length === 0) {
      this.loadLeaveRequests();
    }
  }

  // ── Employees ──────────────────────────────────────────────────────────────

  loadEmployees(): void {
    this.loading.set(true);
    this.employeeService
      .getEmployees(
        {
          search: this.search || undefined,
          status: this.statusFilter || undefined,
          department: this.departmentFilter || undefined,
        },
        { page: this.page(), limit: this.limit }
      )
      .subscribe({
        next: (res) => {
          this.employees.set(res.data ?? []);
          this.total.set(res.total ?? 0);
          this.totalPages.set(res.totalPages ?? 1);
          this.loading.set(false);
        },
        error: (error) => {
          this.loading.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.message || 'No se pudieron cargar los empleados',
          });
        },
      });
  }

  onSearchChange(value: string): void {
    this.search = value;
    this.searchSubject.next(value);
  }

  onFilterChange(): void {
    this.page.set(1);
    this.loadEmployees();
  }

  prevPage(): void {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
      this.loadEmployees();
    }
  }

  nextPage(): void {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.loadEmployees();
    }
  }

  openEmployee(employee: Employee): void {
    this.router.navigate(['/employees', employee.id]);
  }

  fullName(item: { first_name?: string; last_name?: string; email?: string }): string {
    const name = `${item.first_name ?? ''} ${item.last_name ?? ''}`.trim();
    return name || item.email || 'Empleado';
  }

  initials(item: { first_name?: string; last_name?: string; email?: string }): string {
    const first = item.first_name?.trim().charAt(0) ?? '';
    const last = item.last_name?.trim().charAt(0) ?? '';
    return (`${first}${last}`.toUpperCase() || item.email?.charAt(0)?.toUpperCase() || '?');
  }

  // ── Leave requests (RH) ─────────────────────────────────────────────────────

  loadLeaveRequests(): void {
    this.leaveLoading.set(true);
    this.employeeService
      .getAllLeaveRequests(
        { status: this.leaveStatusFilter, type: this.leaveTypeFilter },
        { page: this.leavePage(), limit: this.limit }
      )
      .subscribe({
        next: (res) => {
          this.leaveRequests.set(res.data ?? []);
          this.leaveTotalPages.set(res.totalPages ?? 1);
          this.leaveLoading.set(false);
        },
        error: (error) => {
          this.leaveLoading.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.message || 'No se pudieron cargar las solicitudes',
          });
        },
      });
  }

  onLeaveFilterChange(): void {
    this.leavePage.set(1);
    this.loadLeaveRequests();
  }

  prevLeavePage(): void {
    if (this.leavePage() > 1) {
      this.leavePage.update((p) => p - 1);
      this.loadLeaveRequests();
    }
  }

  nextLeavePage(): void {
    if (this.leavePage() < this.leaveTotalPages()) {
      this.leavePage.update((p) => p + 1);
      this.loadLeaveRequests();
    }
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
          this.loadLeaveRequests();
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
        this.loadLeaveRequests();
      },
      error: (error) => {
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo cancelar la solicitud',
        });
      },
    });
  }
}
