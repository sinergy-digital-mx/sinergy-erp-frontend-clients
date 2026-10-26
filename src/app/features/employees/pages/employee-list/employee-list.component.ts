import { Component, ElementRef, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { AuthService } from '../../../../core/services/auth.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { EmployeeService } from '../../services/employee.service';
import { MobileFilterSheetComponent } from '../../../../core/components/mobile-filter-sheet/mobile-filter-sheet.component';
import {
  Employee,
  LeaveRequest,
  LeaveStatus,
  LeaveType,
  canCorrectLeaveRequest,
  getLeaveStatusLabel,
  getLeaveTypeLabel,
} from '../../models/employee.model';
import { EMPLOYEE_PERMISSIONS } from '../../config/permissions.config';
import { LeaveReviewDialogComponent } from '../../components/leave-review-dialog/leave-review-dialog.component';
import { LeaveRequestDialogComponent } from '../../components/leave-request-dialog/leave-request-dialog.component';
import { SickLeaveRequestDialogComponent } from '../../components/sick-leave-request-dialog/sick-leave-request-dialog.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TabComponent, EmptyStageComponent, MobileFilterSheetComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  @ViewChild('mobileSentinel') set mobileSentinel(ref: ElementRef<HTMLElement> | undefined) {
    this.observeMobileSentinel(ref);
  }
  readonly permissions = EMPLOYEE_PERMISSIONS;
  readonly getLeaveTypeLabel = getLeaveTypeLabel;
  readonly getLeaveStatusLabel = getLeaveStatusLabel;
  readonly canCorrectLeaveRequest = canCorrectLeaveRequest;

  readonly tabs: TabItem[] = [
    { id: 'employees', title: 'Empleados' },
    { id: 'requests', title: 'Solicitudes' },
  ];
  activeTab = 'employees';

  // Employees list state
  employees = signal<Employee[]>([]);
  mobileFeed = signal<Employee[]>([]);
  loading = signal(false);
  loadingMore = signal(false);
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  readonly limit = 20;
  readonly cardSkeletonSlots = [0, 1, 2, 3, 4];
  private mobileObserver?: IntersectionObserver;
  private mobileSentinelEl?: HTMLElement;

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

  get canSeeAll(): boolean {
    return this.auth.hasPermission(this.permissions.viewList) || this.auth.hasAdminRole();
  }

  get canManageLeave(): boolean {
    return this.auth.hasPermission(this.permissions.manageLeave) || this.auth.hasAdminRole();
  }

  get canUpdate(): boolean {
    return this.auth.hasPermission(this.permissions.update) || this.auth.hasAdminRole();
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
    if (tabId === 'requests' && this.leaveRequests().length === 0) {
      this.loadLeaveRequests();
    }
  }

  // ── Employees ──────────────────────────────────────────────────────────────

  ngOnDestroy(): void {
    this.mobileObserver?.disconnect();
  }

  get employeeFilterCount(): number {
    return Number(!!this.departmentFilter.trim()) + Number(!!this.statusFilter);
  }

  get leaveFilterCount(): number {
    return Number(!!this.leaveStatusFilter) + Number(!!this.leaveTypeFilter);
  }

  loadEmployees(append = false): void {
    if (append) {
      if (this.loadingMore() || this.loading() || this.page() >= this.totalPages()) {
        return;
      }
      this.loadingMore.set(true);
      this.page.update((p) => p + 1);
    } else {
      this.loading.set(true);
      this.loadingMore.set(false);
    }

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
          const rows = res.data ?? [];
          this.employees.set(append ? [...this.employees(), ...rows] : rows);
          this.mobileFeed.set(append ? [...this.mobileFeed(), ...rows] : rows);
          this.total.set(res.total ?? 0);
          this.totalPages.set(res.totalPages ?? 1);
          this.loading.set(false);
          this.loadingMore.set(false);
          queueMicrotask(() => this.continueMobileLoadIfVisible());
        },
        error: (error) => {
          this.loading.set(false);
          this.loadingMore.set(false);
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: error?.message || 'No se pudieron cargar los empleados',
          });
        },
      });
  }

  loadMoreMobile(): void {
    this.loadEmployees(true);
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

  correct(request: LeaveRequest): void {
    if (request.type === 'sick_leave') {
      this.dialog
        .open(SickLeaveRequestDialogComponent, {
          width: '640px',
          maxWidth: '94vw',
          autoFocus: false,
          panelClass: 'sick-leave-dialog',
          data: {
            source: 'employee',
            employeeId: request.employee_id || request.employee?.id,
            employeeName: this.fullName(request.employee || {}),
            request,
          },
        })
        .afterClosed()
        .subscribe((changed) => {
          if (changed) {
            this.loadLeaveRequests();
          }
        });
      return;
    }
    this.dialog
      .open(LeaveRequestDialogComponent, {
        width: '520px',
        panelClass: 'custom-dialog-container',
        data: {
          employeeId: request.employee_id || request.employee?.id,
          employeeName: this.fullName(request.employee || {}),
          request,
        },
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed) {
          this.loadLeaveRequests();
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
          this.loadLeaveRequests();
        }
      });
  }

  private observeMobileSentinel(ref?: ElementRef<HTMLElement>): void {
    this.mobileObserver?.disconnect();
    this.mobileSentinelEl = ref?.nativeElement;
    if (!this.mobileSentinelEl) {
      return;
    }
    this.mobileObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.loadMoreMobile();
        }
      },
      { root: null, rootMargin: '240px', threshold: 0.01 },
    );
    this.mobileObserver.observe(this.mobileSentinelEl);
  }

  private continueMobileLoadIfVisible(): void {
    const el = this.mobileSentinelEl;
    if (!el || this.loadingMore() || this.loading() || this.page() >= this.totalPages()) {
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight + 240) {
      this.loadMoreMobile();
    }
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
