import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forkJoin, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { User, UserEmployeeProfile, ManagerReport, POS_USER_TYPE_OPTIONS, POS_USER_TYPE_AMBOS_OPTION, PosUserType, CatalogStatus, isOpenGlobalCutBlockMessage, userHasOpenGlobalCut, POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE, getUserStatusId, getUserStatusCode } from '../../models';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PAYMENT_FREQUENCY_OPTIONS } from '../../../employees/models/employee.model';
import { EmployeeService } from '../../../employees/services/employee.service';
import {
  calculatePayroll,
  getEntitledVacationDays,
  getYearsOfService,
} from '../../../employees/utils/mexican-labor.util';

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TabComponent, ButtonComponent],
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss']
})
export class UserDetailModalComponent implements OnInit {
  get posUserTypeOptions(): ReadonlyArray<{
    value: PosUserType;
    label: string;
    description: string;
  }> {
    const isManager = !!this.form?.get('is_manager')?.value;
    const currentType = this.form?.get('pos_user_type')?.value as PosUserType | null;
    if (isManager || currentType === 'AMBOS') {
      return [...POS_USER_TYPE_OPTIONS, POS_USER_TYPE_AMBOS_OPTION];
    }
    return POS_USER_TYPE_OPTIONS;
  }
  readonly paymentFrequencyOptions = PAYMENT_FREQUENCY_OPTIONS;

  private readonly baseTabs: TabItem[] = [
    { id: 'general', title: 'Información general' },
    { id: 'pos', title: 'POS' },
    { id: 'employee', title: 'Empleado' },
    { id: 'manager', title: 'Gerente' },
    { id: 'branches', title: 'Sucursales asignadas' }
  ];

  activeTab = 'general';
  isNew: boolean;
  saving = signal(false);
  changingPassword = signal(false);
  passwordError = signal<string | null>(null);
  loading = signal(true);
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  branches = signal<Branch[]>([]);
  warehouses = signal<Warehouse[]>([]);
  selectedWarehouseIds = signal<string[]>([]);
  selectedBranchId = signal<string>('');
  statuses = signal<CatalogStatus[]>([]);
  showPosTypeChangeWarning = signal(false);
  hasOpenGlobalCut = signal(false);

  // Employee (RH / nómina) preview state
  employeeId = signal<string | null>(null);
  photoUrl = signal<string | null>(null);
  uploadingPhoto = signal(false);

  /** Usuarios a cargo (tab Gerente). Independiente de Guardar cambios. */
  reports = signal<ManagerReport[]>([]);
  allUsers = signal<User[]>([]);
  loadingReports = signal(false);
  addingReport = signal(false);
  removingReportId = signal<string | null>(null);
  selectedReportUserId = signal('');
  persistingManager = signal(false);
  /** Valor persistido en API; agregar/quitar reportes solo si ya es gerente guardado. */
  savedIsManager = false;
  /** Si hubo cambios de gerente/reportes, al cerrar se refresca la lista. */
  private managerDirty = false;
  private editedUserId: string | null = null;

  private hireDate = signal<string | null>(null);
  private monthlySalary = signal<number>(0);
  private vacationCarryover = signal<number>(0);

  /** Whole years of service derived from the hire date. */
  yearsOfService = computed(() => getYearsOfService(this.hireDate()));

  /** Entitled vacation days per Mexican LFT ("Vacaciones dignas"). */
  entitledVacationDays = computed(() =>
    this.hireDate() ? getEntitledVacationDays(this.yearsOfService()) : 0
  );

  carryoverDaysPreview = computed(() => this.vacationCarryover());

  /** Preview: días de ley + arrastre (sin tomados/pendientes). */
  previewAvailableDays = computed(
    () => this.entitledVacationDays() + this.vacationCarryover()
  );

  /** Live payroll breakdown derived from the monthly salary. */
  payrollPreview = computed(() =>
    calculatePayroll(this.monthlySalary(), Math.max(1, this.yearsOfService()))
  );

  /**
   * Candidatos a asignar: misma org, sin el gerente actual,
   * sin los que ya están en reports y sin los que ya tienen responsable.
   */
  availableWarehouses = computed(() => {
    const branchId = this.selectedBranchId();
    const all = this.warehouses();
    if (!branchId) {
      return all;
    }
    return all.filter((warehouse) => warehouse.billing_branch_id === branchId);
  });

  assignableUsers = computed(() => {
    const managerId = this.editedUserId;
    const reportIds = new Set(this.reports().map((item) => item.id));
    return this.allUsers().filter((user) => {
      if (managerId && user.id === managerId) {
        return false;
      }
      if (reportIds.has(user.id)) {
        return false;
      }
      if (user.manager?.id) {
        return false;
      }
      return true;
    });
  });

  private originalIsPosUser = false;
  private originalBillingBranchId: string | null = null;
  private originalPosUserType: PosUserType | null = null;
  private originalStatusId: number | null = null;

  form: FormGroup;
  passwordForm: FormGroup;

  /** Tab Seguridad: perfil propio o permiso para restablecer contraseñas ajenas. */
  get isOwnProfile(): boolean {
    const editedId = this.data.user?.id;
    const loggedId = this.loggedInUserId;
    return !this.isNew && !!editedId && !!loggedId && String(editedId) === String(loggedId);
  }

  /** `user:Reset_Password` en permissions_flat; Admin lo bypasea. */
  get canResetOthers(): boolean {
    return this.authService.hasEntityPermission('User', 'Reset_Password');
  }

  get showSecurityTab(): boolean {
    return !this.isNew && (this.isOwnProfile || this.canResetOthers);
  }

  get passwordSubmitLabel(): string {
    return this.isOwnProfile ? 'Cambiar contraseña' : 'Restablecer contraseña';
  }

  get tabs(): TabItem[] {
    if (!this.showSecurityTab) {
      return this.baseTabs;
    }
    return [...this.baseTabs, { id: 'security', title: 'Seguridad' }];
  }

  get selectableStatuses(): CatalogStatus[] {
    const fromApi = this.statuses().filter((item) => item.code !== 'deleted');
    if (fromApi.length > 0) {
      return fromApi;
    }
    return [
      { id: 1, code: 'active', name: 'Activo' },
      { id: 2, code: 'inactive', name: 'Inactivo' },
    ];
  }

  get canChangeStatus(): boolean {
    if (this.isNew || this.isOwnProfile) {
      return false;
    }
    const code = getUserStatusCode(this.data.user?.status);
    if (code === 'deleted') {
      return false;
    }
    return (
      this.authService.hasEntityPermission('User', 'Update') ||
      this.authService.hasEntityPermission('users', 'Update')
    );
  }

  /** user.id del login (JWT `sub`). */
  private get loggedInUserId(): string | undefined {
    return this.authService.user_info?.sub;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User | null; isNew?: boolean },
    private dialogRef: MatDialogRef<UserDetailModalComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private branchService: BranchService,
    private warehouseService: WarehouseService,
    private authService: AuthService,
    private interceptorService: InterceptorService,
    private employeeService: EmployeeService
  ) {
    this.isNew = data.isNew ?? !data.user;
    this.editedUserId = data.user?.id ?? null;
    this.form = this.createForm();
    this.passwordForm = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.setupPosFieldBehavior();
    this.setupBranchFieldBehavior();
    this.setupEmployeeFieldBehavior();
    this.setupManagerFieldBehavior();
    this.loadData();
  }

  private createForm(): FormGroup {
    const user = this.data.user;
    this.originalIsPosUser = user?.is_pos_user ?? false;
    this.originalPosUserType = user?.pos_user_type ?? null;
    this.originalBillingBranchId = user?.billing_branch_id ?? null;
    this.originalStatusId = getUserStatusId(user);
    this.hasOpenGlobalCut.set(!this.isNew && userHasOpenGlobalCut(user));

    const employee = user?.employee ?? null;
    this.savedIsManager = !this.isNew && !!user?.is_manager;

    return this.fb.group({
      first_name: [user?.first_name || '', Validators.required],
      last_name: [user?.last_name || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      phone: [user?.phone || ''],
      password: ['', this.isNew ? Validators.required : []],
      confirm_password: ['', this.isNew ? Validators.required : []],
      status_id: [getUserStatusId(user) ?? 1],
      billing_branch_id: [user?.billing_branch_id ?? ''],
      is_pos_user: [user?.is_pos_user ?? false],
      pos_user_type: [user?.pos_user_type ?? null],
      pos_user_code: [user?.pos_user_code ?? null],

      // Employee (RH / nómina)
      is_employee: [user?.is_employee ?? false],
      is_manager: [user?.is_manager ?? false],
      employee: this.fb.group({
        employee_code: [employee?.employee_code ?? ''],
        rfc: [employee?.rfc ?? ''],
        curp: [employee?.curp ?? ''],
        nss: [employee?.nss ?? ''],
        position: [employee?.position ?? ''],
        department: [employee?.department ?? ''],
        hire_date: [employee?.hire_date ?? ''],
        birth_date: [employee?.birth_date ?? ''],
        vacation_carryover_days: [employee?.vacation_carryover_days ?? null],
        monthly_salary: [employee?.monthly_salary ?? null],
        payment_frequency: [employee?.payment_frequency ?? 'biweekly'],
        bank_name: [employee?.bank_name ?? ''],
        clabe: [employee?.clabe ?? ''],
        bank_account: [employee?.bank_account ?? ''],
      }),
    });
  }

  private setupEmployeeFieldBehavior(): void {
    const employeeGroup = this.form.get('employee') as FormGroup;

    const applyEmployeeState = (isEmployee: boolean) => {
      const positionControl = employeeGroup.get('position');
      const hireDateControl = employeeGroup.get('hire_date');
      const salaryControl = employeeGroup.get('monthly_salary');
      const curpControl = employeeGroup.get('curp');
      const clabeControl = employeeGroup.get('clabe');
      const nssControl = employeeGroup.get('nss');
      const rfcControl = employeeGroup.get('rfc');

      if (isEmployee) {
        positionControl?.setValidators([Validators.required]);
        hireDateControl?.setValidators([Validators.required]);
        salaryControl?.setValidators([Validators.required, Validators.min(0)]);
        // Optional fields: if filled, must match Mexican lengths
        curpControl?.setValidators([Validators.minLength(18), Validators.maxLength(18)]);
        clabeControl?.setValidators([Validators.minLength(18), Validators.maxLength(18)]);
        nssControl?.setValidators([Validators.minLength(11), Validators.maxLength(11)]);
        rfcControl?.setValidators([Validators.minLength(12), Validators.maxLength(13)]);
      } else {
        positionControl?.clearValidators();
        hireDateControl?.clearValidators();
        salaryControl?.clearValidators();
        curpControl?.clearValidators();
        clabeControl?.clearValidators();
        nssControl?.clearValidators();
        rfcControl?.clearValidators();
      }
      positionControl?.updateValueAndValidity({ emitEvent: false });
      hireDateControl?.updateValueAndValidity({ emitEvent: false });
      salaryControl?.updateValueAndValidity({ emitEvent: false });
      curpControl?.updateValueAndValidity({ emitEvent: false });
      clabeControl?.updateValueAndValidity({ emitEvent: false });
      nssControl?.updateValueAndValidity({ emitEvent: false });
      rfcControl?.updateValueAndValidity({ emitEvent: false });
    };

    employeeGroup.get('hire_date')?.valueChanges.subscribe((value: string) => {
      this.hireDate.set(value || null);
    });
    employeeGroup.get('monthly_salary')?.valueChanges.subscribe((value) => {
      this.monthlySalary.set(Number(value) || 0);
    });
    employeeGroup.get('vacation_carryover_days')?.valueChanges.subscribe((value) => {
      this.vacationCarryover.set(Number(value) || 0);
    });

    this.form.get('is_employee')?.valueChanges.subscribe(applyEmployeeState);

    this.hireDate.set((employeeGroup.get('hire_date')?.value as string) || null);
    this.monthlySalary.set(Number(employeeGroup.get('monthly_salary')?.value) || 0);
    this.vacationCarryover.set(Number(employeeGroup.get('vacation_carryover_days')?.value) || 0);
    applyEmployeeState(!!this.form.get('is_employee')?.value);
  }

  private setupPosFieldBehavior(): void {
    const applyPosState = (isPosUser: boolean) => {
      const codeControl = this.form.get('pos_user_code');
      const typeControl = this.form.get('pos_user_type');
      if (!codeControl || !typeControl) {
        return;
      }

      codeControl.enable({ emitEvent: false });
      codeControl.setValidators([Validators.min(1)]);

      if (isPosUser) {
        typeControl.enable({ emitEvent: false });
        typeControl.setValidators([Validators.required]);
      } else {
        typeControl.clearValidators();
        typeControl.setValue(null, { emitEvent: false });
        typeControl.disable({ emitEvent: false });
        this.showPosTypeChangeWarning.set(false);
      }

      codeControl.updateValueAndValidity({ emitEvent: false });
      typeControl.updateValueAndValidity({ emitEvent: false });
      this.applyBranchValidators(isPosUser);
    };

    this.form.get('is_pos_user')?.valueChanges.subscribe((isPosUser: boolean) => {
      applyPosState(isPosUser);
      this.syncPosTypeWithManager(!!this.form.get('is_manager')?.value, isPosUser);
    });
    this.form.get('pos_user_type')?.valueChanges.subscribe((value: PosUserType | null) => {
      this.updatePosTypeChangeWarning(value);
    });

    applyPosState(!!this.form.get('is_pos_user')?.value);
    this.syncPosTypeWithManager(!!this.form.get('is_manager')?.value);
  }

  /**
   * AMBOS solo es válido con is_manager. Si se apaga gerente, quitar AMBOS.
   * Si se enciende gerente en un POS, preseleccionar AMBOS.
   */
  private syncPosTypeWithManager(
    isManager: boolean,
    isPosUser = !!this.form.get('is_pos_user')?.value,
    preferAmbos = false
  ): void {
    const typeControl = this.form.get('pos_user_type');
    if (!typeControl || !isPosUser) {
      return;
    }

    const currentType = typeControl.value as PosUserType | null;
    if (!isManager && currentType === 'AMBOS') {
      typeControl.setValue(null);
      return;
    }

    if (isManager && (preferAmbos || !currentType)) {
      typeControl.setValue('AMBOS');
    }
  }

  private updatePosTypeChangeWarning(currentType: PosUserType | null): void {
    if (this.isNew || !this.data.user?.is_pos_user) {
      this.showPosTypeChangeWarning.set(false);
      return;
    }

    this.showPosTypeChangeWarning.set(
      !!this.originalPosUserType &&
        !!currentType &&
        currentType !== this.originalPosUserType
    );
  }

  private setupBranchFieldBehavior(): void {
    this.form.get('is_pos_user')?.valueChanges.subscribe((isPosUser: boolean) => {
      if (isPosUser && !this.form.get('billing_branch_id')?.value) {
        this.form.get('billing_branch_id')?.markAsTouched();
      }
    });
    this.form.get('billing_branch_id')?.valueChanges.subscribe((branchId: string) => {
      this.selectedBranchId.set(branchId || '');
      this.pruneWarehousesOutsideBranch(branchId || '');
    });
  }

  private applyBranchValidators(isPosUser: boolean): void {
    const branchControl = this.form.get('billing_branch_id');
    if (!branchControl) {
      return;
    }

    if (isPosUser) {
      branchControl.setValidators([Validators.required]);
    } else {
      branchControl.clearValidators();
    }

    branchControl.updateValueAndValidity({ emitEvent: false });
  }

  private loadData(): void {
    const branches$ = this.branchService.getAllBranches();
    const warehouses$ = this.warehouseService.getWarehouses({ limit: 500 }).pipe(
      map((res) => (Array.isArray(res) ? res : res?.data || [])),
      catchError(() => of([] as Warehouse[]))
    );
    const statuses$ = this.userService.getUserStatuses().pipe(catchError(() => of([] as CatalogStatus[])));
    const userBranch$ =
      this.isNew || !this.data.user
        ? of<string | null>(this.data.user?.billing_branch_id ?? null)
        : this.userService.getUserBranch(this.data.user.id);

    forkJoin({
      branches: branches$,
      warehouses: warehouses$,
      statuses: statuses$,
      userBranch: userBranch$,
    }).subscribe({
      next: ({ branches, warehouses, statuses, userBranch }) => {
        this.branches.set(branches);
        this.warehouses.set(warehouses);
        this.statuses.set(statuses);
        this.applyAssignedWarehouses(this.data.user);

        const billingBranchId =
          userBranch ?? this.data.user?.billing_branch_id ?? null;

        const statusId = getUserStatusId(this.data.user) ?? this.form.get('status_id')?.value ?? 1;
        this.originalStatusId = getUserStatusId(this.data.user) ?? statusId;

        this.form.patchValue({
          billing_branch_id: billingBranchId ?? '',
          status_id: statusId,
        });
        this.selectedBranchId.set(billingBranchId ?? '');
        this.pruneWarehousesOutsideBranch(billingBranchId ?? '');

        this.applyBranchValidators(!!this.form.get('is_pos_user')?.value);
        this.originalBillingBranchId = billingBranchId ?? null;
        this.applyOpenCutEditLock();
        this.applyStatusFieldState();
        this.loadEmployeeProfile();
        this.loadManagerData();
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar las sucursales'
        });
      }
    });
  }

  /**
   * When editing an existing user, fetch the full record so the employee
   * profile (is_employee + employee object + photo_url) is preloaded.
   */
  private loadEmployeeProfile(): void {
    if (this.isNew || !this.data.user?.id) {
      return;
    }

    // Preload from the row we already have (list may already include it).
    this.applyEmployeeProfile(this.data.user);

    this.userService.getUserById(this.data.user.id).subscribe({
      next: (user) => {
        this.applyEmployeeProfile(user);
        this.applyAssignedWarehouses(user);
        this.pruneWarehousesOutsideBranch(this.selectedBranchId());
        this.applyManagerState(user);
        const statusId = getUserStatusId(user);
        if (statusId != null) {
          this.originalStatusId = statusId;
          this.form.get('status_id')?.setValue(statusId, { emitEvent: false });
        }
        this.applyStatusFieldState();
        if (user.is_manager && user.id && !this.loadingReports()) {
          this.loadReports(user.id);
        }
      },
      error: () => {
        /* keep whatever we already have from the list row */
      },
    });
  }

  private applyEmployeeProfile(user: User | null): void {
    if (!user) {
      return;
    }

    if (user.is_employee != null) {
      this.form.get('is_employee')?.setValue(!!user.is_employee, { emitEvent: true });
    }

    const employee = user.employee;
    if (!employee) {
      return;
    }

    this.employeeId.set(employee.id ?? null);
    this.photoUrl.set(employee.photo_url ?? null);

    this.form.get('employee')?.patchValue(
      {
        employee_code: employee.employee_code ?? '',
        rfc: employee.rfc ?? '',
        curp: employee.curp ?? '',
        nss: employee.nss ?? '',
        position: employee.position ?? '',
        department: employee.department ?? '',
        hire_date: this.toDateInput(employee.hire_date),
        birth_date: this.toDateInput(employee.birth_date),
        vacation_carryover_days: this.resolveCarryoverDays(employee),
        monthly_salary: employee.monthly_salary ?? null,
        payment_frequency: employee.payment_frequency ?? 'biweekly',
        bank_name: employee.bank_name ?? '',
        clabe: employee.clabe ?? '',
        bank_account: employee.bank_account ?? '',
      },
      { emitEvent: true }
    );
  }

  private toDateInput(value: string | undefined | null): string {
    if (!value) {
      return '';
    }
    return value.length >= 10 ? value.slice(0, 10) : value;
  }

  /** Agregar/quitar gente a cargo usa endpoints propios; requiere gerente ya persistido. */
  get canManageReports(): boolean {
    return !!this.editedUserId && this.savedIsManager;
  }

  private setupManagerFieldBehavior(): void {
    this.form.get('is_manager')?.valueChanges.subscribe((value: boolean) => {
      this.syncPosTypeWithManager(!!value, undefined, true);
      this.persistManagerFlag(!!value);
    });
  }

  /** En edición, el toggle se guarda al instante y el modal no se cierra. */
  private persistManagerFlag(isManager: boolean): void {
    if (this.isNew || !this.editedUserId) {
      return;
    }
    if (isManager === this.savedIsManager || this.persistingManager()) {
      return;
    }

    const userId = this.editedUserId;
    this.persistingManager.set(true);

    this.userService.updateUser(userId, { is_manager: isManager }).subscribe({
      next: () => {
        this.persistingManager.set(false);
        this.savedIsManager = isManager;
        this.managerDirty = true;
        if (this.data.user) {
          this.data.user.is_manager = isManager;
        }
        if (isManager) {
          this.loadReports(userId);
        } else {
          this.reports.set([]);
        }
      },
      error: (error) => {
        this.persistingManager.set(false);
        this.form.get('is_manager')?.setValue(this.savedIsManager, { emitEvent: false });
        this.syncPosTypeWithManager(this.savedIsManager);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: this.extractBackendMessages(error)[0] || 'No se pudo actualizar el gerente',
        });
      },
    });
  }

  private loadManagerData(): void {
    this.applyManagerState(this.data.user);

    this.userService.getUsers().subscribe({
      next: (users) => this.allUsers.set(users),
      error: () => {
        /* el selector queda vacío; se puede reintentar al reabrir */
      },
    });

    if (this.isNew || !this.editedUserId) {
      return;
    }

    if (this.savedIsManager) {
      this.loadReports(this.editedUserId);
    }
  }

  private applyManagerState(user: User | null): void {
    if (!user) {
      return;
    }

    if (user.is_manager != null) {
      this.form.get('is_manager')?.setValue(!!user.is_manager, { emitEvent: false });
      this.savedIsManager = !!user.is_manager;
    }

    if (Array.isArray(user.reports)) {
      this.reports.set(user.reports);
    }
  }

  private loadReports(userId: string): void {
    this.loadingReports.set(true);
    this.userService.getManagerReports(userId).subscribe({
      next: (result) => {
        this.loadingReports.set(false);
        this.savedIsManager = !!result.is_manager;
        this.form.get('is_manager')?.setValue(!!result.is_manager, { emitEvent: false });
        this.reports.set(result.reports ?? []);
      },
      error: (error) => {
        this.loadingReports.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: this.extractBackendMessages(error)[0] || 'No se pudieron cargar los usuarios a cargo',
        });
      },
    });
  }

  reportDisplayName(item: { first_name?: string; last_name?: string; email?: string }): string {
    const name = `${item.first_name || ''} ${item.last_name || ''}`.trim();
    return name || item.email || 'Usuario';
  }

  onReportUserSelected(event: Event): void {
    this.selectedReportUserId.set((event.target as HTMLSelectElement).value || '');
  }

  addReport(): void {
    const managerId = this.editedUserId;
    const reportUserId = this.selectedReportUserId();
    if (!this.canManageReports || !managerId || !reportUserId) {
      return;
    }

    if (this.reports().some((item) => item.id === reportUserId)) {
      return;
    }

    this.addingReport.set(true);
    this.userService.addManagerReport(managerId, reportUserId).subscribe({
      next: (result) => {
        this.addingReport.set(false);
        const added = result.report;
        if (added?.id && !this.reports().some((item) => item.id === added.id)) {
          this.reports.update((list) => [...list, added]);
        }
        if (added?.id) {
          this.allUsers.update((users) =>
            users.map((user) =>
              user.id === added.id
                ? {
                    ...user,
                    manager: {
                      id: managerId,
                      email: this.data.user?.email || '',
                      first_name: this.data.user?.first_name,
                      last_name: this.data.user?.last_name,
                    },
                  }
                : user
            )
          );
        }
        this.selectedReportUserId.set('');
        this.managerDirty = true;
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: result.message || 'Usuario asignado al gerente',
        });
      },
      error: (error) => this.onManagerReportError(error),
    });
  }

  removeReport(reportUserId: string): void {
    const managerId = this.editedUserId;
    if (!this.canManageReports || !managerId || !reportUserId) {
      return;
    }

    this.removingReportId.set(reportUserId);
    this.userService.removeManagerReport(managerId, reportUserId).subscribe({
      next: (result) => {
        this.removingReportId.set(null);
        this.reports.update((list) => list.filter((item) => item.id !== reportUserId));
        this.allUsers.update((users) =>
          users.map((user) => (user.id === reportUserId ? { ...user, manager: null } : user))
        );
        this.managerDirty = true;
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: result.message || 'Usuario desasignado del gerente',
        });
      },
      error: (error) => this.onManagerReportError(error),
    });
  }

  private onManagerReportError(error: any): void {
    this.addingReport.set(false);
    this.removingReportId.set(null);
    const message =
      this.extractBackendMessages(error)[0] || 'No se pudo actualizar los usuarios a cargo';
    this.interceptorService.openSnackbar({
      type: 'error',
      title: 'Error',
      message,
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const employeeId = this.employeeId();
    if (!employeeId) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Guarda primero',
        message: 'Guarda el empleado antes de subir una foto.',
      });
      input.value = '';
      return;
    }

    this.uploadingPhoto.set(true);
    this.employeeService.uploadPhoto(employeeId, file).subscribe({
      next: (result) => {
        this.uploadingPhoto.set(false);
        this.photoUrl.set(result.photo_url);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Foto actualizada correctamente',
        });
      },
      error: (error) => {
        this.uploadingPhoto.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error?.message || 'No se pudo subir la foto',
        });
      },
    });
    input.value = '';
  }

  branchLabel(branch: Branch): string {
    return branch.display_name || branch.code;
  }

  isBranchOptionSelected(branchId: string): boolean {
    return this.form.get('billing_branch_id')?.value === branchId;
  }

  isAllBranchesSelected(): boolean {
    return !this.form.get('billing_branch_id')?.value;
  }

  warehouseLabel(warehouse: Warehouse): string {
    return warehouse.code ? `${warehouse.name} (${warehouse.code})` : warehouse.name;
  }

  isWarehouseSelected(warehouseId: string): boolean {
    return this.selectedWarehouseIds().includes(warehouseId);
  }

  toggleWarehouse(warehouseId: string): void {
    const current = this.selectedWarehouseIds();
    this.selectedWarehouseIds.set(
      current.includes(warehouseId)
        ? current.filter((id) => id !== warehouseId)
        : [...current, warehouseId]
    );
  }

  private applyAssignedWarehouses(user: User | null | undefined): void {
    const rows = user?.assigned_warehouses ?? [];
    this.selectedWarehouseIds.set(
      rows.map((item) => item.id).filter((id): id is string => !!id)
    );
  }

  private pruneWarehousesOutsideBranch(branchId: string): void {
    if (!branchId) {
      return;
    }
    const allowed = new Set(
      this.warehouses()
        .filter((warehouse) => warehouse.billing_branch_id === branchId)
        .map((warehouse) => warehouse.id)
    );
    this.selectedWarehouseIds.set(this.selectedWarehouseIds().filter((id) => allowed.has(id)));
  }

  isPosEditLockedByOpenCut(): boolean {
    return this.hasOpenGlobalCut();
  }

  private shouldLockPosEditByOpenCut(): boolean {
    return (
      !this.isNew &&
      this.hasOpenGlobalCut() &&
      (this.data.user?.pos_user_type === 'COBRANZA' ||
        this.data.user?.pos_user_type === 'AMBOS') &&
      !!this.data.user?.is_pos_user
    );
  }

  private applyOpenCutEditLock(): void {
    if (!this.shouldLockPosEditByOpenCut()) {
      return;
    }

    this.form.get('is_pos_user')?.disable({ emitEvent: false });
    this.form.get('pos_user_type')?.disable({ emitEvent: false });
    this.form.get('billing_branch_id')?.disable({ emitEvent: false });
  }

  private applyStatusFieldState(): void {
    const control = this.form.get('status_id');
    if (!control) {
      return;
    }
    if (this.canChangeStatus) {
      control.enable({ emitEvent: false });
    } else {
      control.disable({ emitEvent: false });
    }
  }

  private restoreLockedPosFields(): void {
    const user = this.data.user;
    if (!user) {
      return;
    }

    this.form.patchValue(
      {
        is_pos_user: user.is_pos_user ?? false,
        pos_user_type: user.pos_user_type ?? null,
        billing_branch_id: user.billing_branch_id ?? '',
      },
      { emitEvent: false }
    );
    this.applyOpenCutEditLock();
  }

  private hasBlockedPosFieldChanges(
    isPosUser: boolean,
    posUserType: PosUserType | null,
    billingBranchId: string | null
  ): boolean {
    if (!this.shouldLockPosEditByOpenCut()) {
      return false;
    }

    return (
      isPosUser !== this.originalIsPosUser ||
      posUserType !== this.originalPosUserType ||
      billingBranchId !== this.originalBillingBranchId
    );
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((v) => !v);
  }

  cancelPasswordChange(): void {
    this.passwordForm.reset({ new_password: '', confirm_password: '' });
    this.passwordError.set(null);
    this.showPassword.set(false);
    this.showConfirmPassword.set(false);
  }

  changePassword(): void {
    const userId = this.data.user?.id ?? this.editedUserId;
    if (!this.showSecurityTab || !userId) {
      return;
    }

    this.passwordError.set(null);
    const newPassword = String(this.passwordForm.get('new_password')?.value ?? '');
    const confirmPassword = String(this.passwordForm.get('confirm_password')?.value ?? '');

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.passwordError.set('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      this.passwordForm.get('confirm_password')?.markAsTouched();
      this.passwordError.set('Las contraseñas no coinciden');
      return;
    }

    this.changingPassword.set(true);
    this.userService
      .changePassword(userId, {
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
      .subscribe({
        next: (response) => {
          this.changingPassword.set(false);
          this.cancelPasswordChange();
          this.interceptorService.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: response?.message || 'Contraseña actualizada correctamente',
          });
        },
        error: (error) => {
          this.changingPassword.set(false);
          const fallback = this.isOwnProfile
            ? 'No se pudo cambiar la contraseña'
            : 'No se pudo restablecer la contraseña';
          const message = this.extractBackendMessages(error)[0] || fallback;

          if (error?.status === 400) {
            this.passwordError.set(message);
          }

          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message,
          });

          if (error?.status === 404) {
            this.dialogRef.close(false);
          }
        },
      });
  }

  close(): void {
    if (!this.saving() && !this.changingPassword() && !this.persistingManager()) {
      this.dialogRef.close(this.managerDirty);
    }
  }

  save(): void {
    const isPosUser = !!this.form.get('is_pos_user')?.value;
    const billingBranchRaw = this.form.get('billing_branch_id')?.value;
    const billingBranchId = billingBranchRaw ? billingBranchRaw : null;

    if (isPosUser && !billingBranchId) {
      this.form.get('billing_branch_id')?.markAsTouched();
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'El usuario POS debe tener una sucursal asignada'
      });
      this.activeTab = 'branches';
      return;
    }

    const posUserType = this.form.get('pos_user_type')?.value as PosUserType | null;
    const isManager = !!this.form.get('is_manager')?.value;
    if (isPosUser && !posUserType) {
      this.form.get('pos_user_type')?.markAsTouched();
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'pos_user_type es requerido cuando is_pos_user es true'
      });
      this.activeTab = 'pos';
      return;
    }

    if (isPosUser && posUserType === 'AMBOS' && !isManager) {
      this.form.get('pos_user_type')?.markAsTouched();
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Ventas y cobranza solo aplica a gerentes. Marca Es gerente o elige Ventas o Cobranza.'
      });
      this.activeTab = 'pos';
      return;
    }

    const isEmployee = !!this.form.get('is_employee')?.value;
    if (isEmployee) {
      const employeeGroup = this.form.get('employee') as FormGroup;
      if (employeeGroup.invalid) {
        employeeGroup.markAllAsTouched();
        this.interceptorService.openSnackbar({
          type: 'warning',
          title: 'Advertencia',
          message: this.getEmployeeFormErrorMessage(employeeGroup),
        });
        this.activeTab = 'employee';
        return;
      }
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Completa los campos requeridos'
      });
      return;
    }

    if (this.isNew) {
      const password = this.form.get('password')?.value;
      const confirmPassword = this.form.get('confirm_password')?.value;
      if (password !== confirmPassword) {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'Las contraseñas no coinciden'
        });
        this.activeTab = 'general';
        return;
      }
    }

    const rawPosCode = this.form.getRawValue().pos_user_code;
    const posCode =
      rawPosCode === null || rawPosCode === undefined || rawPosCode === ''
        ? null
        : Number(rawPosCode);

    if (posCode !== null && (!Number.isInteger(posCode) || posCode < 1)) {
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'El código debe ser un número entero mayor a 0'
      });
      this.activeTab = 'pos';
      return;
    }

    if (this.hasBlockedPosFieldChanges(isPosUser, posUserType, billingBranchId)) {
      this.restoreLockedPosFields();
      this.showOpenCutBlockMessage();
      return;
    }

    this.saving.set(true);

    const commonPayload: Record<string, unknown> = {
      first_name: this.form.get('first_name')?.value,
      last_name: this.form.get('last_name')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value || undefined,
      billing_branch_id: billingBranchId,
      warehouse_ids: this.selectedWarehouseIds(),
      is_pos_user: isPosUser,
      pos_user_type: isPosUser ? posUserType : null,
      pos_user_code: posCode,
      is_employee: isEmployee,
      is_manager: isManager,
    };

    if (isEmployee) {
      commonPayload['employee'] = this.buildEmployeePayload();
    }

    if (this.shouldLockPosEditByOpenCut()) {
      delete commonPayload['billing_branch_id'];
      delete commonPayload['is_pos_user'];
      delete commonPayload['pos_user_type'];
    }

    if (this.isNew) {
      const payload = {
        ...commonPayload,
        tenant_id: this.authService.user_info.tenant_id,
        status_id: 1,
        password: this.form.get('password')?.value
      };

      this.userService.createUser(payload as any).subscribe({
        next: (created) => this.onSaveSuccess('Usuario creado exitosamente', created),
        error: (error) => this.onSaveError(error)
      });
      return;
    }

    this.userService.updateUser(this.data.user!.id, commonPayload as any).pipe(
      switchMap((updated) => {
        const statusId = Number(this.form.getRawValue().status_id);
        if (
          !this.canChangeStatus ||
          !statusId ||
          statusId === this.originalStatusId
        ) {
          return of(updated);
        }
        return this.userService.updateUserStatus(this.data.user!.id, statusId).pipe(
          map((result) => result.user ?? updated)
        );
      })
    ).subscribe({
      next: (updated) => this.onSaveSuccess('Usuario actualizado correctamente', updated),
      error: (error) => this.onSaveError(error)
    });
  }

  /** Cleans the employee sub-form into the `employee` API object. */
  private buildEmployeePayload(): UserEmployeeProfile {
    const raw = (this.form.get('employee') as FormGroup).getRawValue();
    const payload: UserEmployeeProfile = {};

    const upperFields: (keyof UserEmployeeProfile)[] = ['rfc', 'curp'];
    const plainFields: (keyof UserEmployeeProfile)[] = [
      'employee_code',
      'nss',
      'position',
      'department',
      'hire_date',
      'birth_date',
      'payment_frequency',
      'bank_name',
      'clabe',
      'bank_account',
    ];

    for (const field of upperFields) {
      const value = raw[field];
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        (payload as Record<string, unknown>)[field] = String(value).trim().toUpperCase();
      }
    }

    for (const field of plainFields) {
      const value = raw[field];
      if (value !== null && value !== undefined && String(value).trim() !== '') {
        (payload as Record<string, unknown>)[field] = String(value).trim();
      }
    }

    if (raw.monthly_salary !== null && raw.monthly_salary !== undefined && raw.monthly_salary !== '') {
      payload.monthly_salary = Number(raw.monthly_salary);
    }

    if (
      raw.vacation_carryover_days !== null &&
      raw.vacation_carryover_days !== undefined &&
      raw.vacation_carryover_days !== ''
    ) {
      payload.vacation_carryover_days = Number(raw.vacation_carryover_days);
    }

    return payload;
  }

  private resolveCarryoverDays(employee: UserEmployeeProfile): number | null {
    if (employee.vacation_carryover_days != null && String(employee.vacation_carryover_days) !== '') {
      const n = Number(employee.vacation_carryover_days);
      return Number.isFinite(n) ? n : null;
    }
    const fromVacation = employee.vacation?.['carryover_days'];
    return typeof fromVacation === 'number' ? fromVacation : null;
  }

  private getEmployeeFormErrorMessage(employeeGroup: FormGroup): string {
    const labels: Record<string, string> = {
      position: 'puesto',
      hire_date: 'fecha de ingreso',
      monthly_salary: 'salario mensual',
      curp: 'CURP (18 caracteres)',
      clabe: 'CLABE (18 dígitos)',
      nss: 'NSS (11 dígitos)',
      rfc: 'RFC (12 o 13 caracteres)',
    };

    const issues: string[] = [];
    for (const [key, label] of Object.entries(labels)) {
      const control = employeeGroup.get(key);
      if (!control || control.valid || !control.errors) {
        continue;
      }
      if (control.errors['required']) {
        issues.push(label);
      } else if (control.errors['minlength'] || control.errors['maxlength']) {
        issues.push(label);
      }
    }

    if (issues.length === 0) {
      return 'Completa puesto, fecha de ingreso y salario mensual del empleado';
    }
    return `Revisa: ${issues.join(', ')}`;
  }

  private showOpenCutBlockMessage(): void {
    this.interceptorService.openSnackbar({
      type: 'warning',
      title: 'Corte abierto',
      message: POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE
    });
    this.activeTab = 'pos';
  }

  private onSaveSuccess(message: string, savedUser?: User | null): void {
    this.saving.set(false);
    this.interceptorService.openSnackbar({
      type: 'success',
      title: 'Éxito',
      message
    });

    const isManager = !!this.form.getRawValue().is_manager;
    const userId = savedUser?.id || this.editedUserId;
    if (isManager && userId) {
      this.stayOpenAsManager(savedUser ?? this.data.user, userId);
      return;
    }

    this.dialogRef.close(true);
  }

  /** Tras guardar un gerente, el modal sigue abierto para asignar gente a cargo. */
  private stayOpenAsManager(user: User | null, userId: string): void {
    this.isNew = false;
    this.editedUserId = userId;
    this.savedIsManager = true;
    this.managerDirty = true;
    this.activeTab = 'manager';
    if (user) {
      this.data.user = { ...user, id: userId, is_manager: true };
    } else if (this.data.user) {
      this.data.user.is_manager = true;
    } else {
      this.data.user = {
        id: userId,
        email: this.form.get('email')?.value,
        first_name: this.form.get('first_name')?.value,
        last_name: this.form.get('last_name')?.value,
        status: 'active',
        is_manager: true,
      };
    }
    this.form.get('is_manager')?.setValue(true, { emitEvent: false });
    this.loadReports(userId);
    if (this.allUsers().length === 0) {
      this.userService.getUsers().subscribe({
        next: (users) => this.allUsers.set(users),
      });
    }
  }

  /** NestJS often returns `message` as string[] for class-validator errors. */
  private extractBackendMessages(error: any): string[] {
    const raw = error?.error?.message ?? error?.message;
    if (Array.isArray(raw)) {
      return raw.map((m) => String(m)).filter(Boolean);
    }
    if (typeof raw === 'string' && raw.trim()) {
      return [raw];
    }
    return [];
  }

  private translateEmployeeValidationMessage(message: string): string {
    const map: Array<[RegExp, string]> = [
      [/employee\.curp.*18/i, 'El CURP debe tener exactamente 18 caracteres'],
      [/employee\.clabe.*18/i, 'La CLABE debe tener exactamente 18 dígitos'],
      [/employee\.nss.*11/i, 'El NSS debe tener exactamente 11 dígitos'],
      [/employee\.rfc/i, 'El RFC debe tener 12 o 13 caracteres'],
      [/employee\.position/i, 'El puesto es obligatorio'],
      [/employee\.hire_date/i, 'La fecha de ingreso es obligatoria'],
      [/employee\.monthly_salary/i, 'El salario mensual es obligatorio'],
    ];
    for (const [pattern, label] of map) {
      if (pattern.test(message)) {
        return label;
      }
    }
    return message.replace(/^employee\./i, '');
  }

  private onSaveError(error: any): void {
    this.saving.set(false);

    if (error?.status === 409) {
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Código duplicado',
        message: 'Ese código ya está en uso por otro usuario.'
      });
      this.activeTab = 'pos';
      return;
    }

    const backendMessages = this.extractBackendMessages(error);
    const joinedForCheck = backendMessages.join(' ');

    if (error?.status === 400 && isOpenGlobalCutBlockMessage(joinedForCheck)) {
      this.hasOpenGlobalCut.set(true);
      this.restoreLockedPosFields();
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Corte abierto',
        message: POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE
      });
      this.activeTab = 'pos';
      return;
    }

    const knownMessages: Record<string, string> = {
      'pos_user_type es requerido cuando is_pos_user es true':
        'Selecciona el tipo de terminal POS (Ventas, Cobranza, o ambos si es gerente).',
      'pos_user_type solo aplica cuando el usuario es de tipo POS':
        'El tipo de terminal solo aplica para usuarios POS.',
      'El usuario POS debe tener una sucursal asignada':
        'Asigna una sucursal en la pestaña Sucursales.',
      [POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE]: POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE,
    };

    const translated = backendMessages.map((msg) => {
      if (knownMessages[msg]) {
        return knownMessages[msg];
      }
      if (/^employee\./i.test(msg) || /employee\./i.test(msg)) {
        return this.translateEmployeeValidationMessage(msg);
      }
      return msg;
    });

    const message =
      translated.length > 0
        ? translated.join('. ')
        : 'Error al guardar el usuario';

    if (isOpenGlobalCutBlockMessage(joinedForCheck)) {
      this.activeTab = 'pos';
    } else if (/employee\./i.test(joinedForCheck)) {
      this.activeTab = 'employee';
      (this.form.get('employee') as FormGroup)?.markAllAsTouched();
    } else if (/is_manager|gerente/i.test(joinedForCheck)) {
      this.activeTab = 'manager';
    } else if (joinedForCheck.includes('sucursal')) {
      this.activeTab = 'branches';
    } else if (joinedForCheck.includes('pos_user_type')) {
      this.activeTab = 'pos';
    }

    this.interceptorService.openSnackbar({
      type: 'error',
      title: 'Error',
      message
    });
  }
}
