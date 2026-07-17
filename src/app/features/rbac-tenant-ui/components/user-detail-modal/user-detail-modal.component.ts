import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forkJoin, of } from 'rxjs';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { User, UserEmployeeProfile, POS_USER_TYPE_OPTIONS, PosUserType, isOpenGlobalCutBlockMessage, userHasOpenGlobalCut, POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE } from '../../models';
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
  readonly posUserTypeOptions = POS_USER_TYPE_OPTIONS;
  readonly paymentFrequencyOptions = PAYMENT_FREQUENCY_OPTIONS;

  readonly tabs: TabItem[] = [
    { id: 'general', title: 'Información general' },
    { id: 'pos', title: 'POS' },
    { id: 'employee', title: 'Empleado' },
    { id: 'branches', title: 'Sucursales asignadas' }
  ];

  activeTab = 'general';
  isNew: boolean;
  saving = signal(false);
  loading = signal(true);
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  branches = signal<Branch[]>([]);
  showPosTypeChangeWarning = signal(false);
  hasOpenGlobalCut = signal(false);

  // Employee (RH / nómina) preview state
  employeeId = signal<string | null>(null);
  photoUrl = signal<string | null>(null);
  uploadingPhoto = signal(false);
  private hireDate = signal<string | null>(null);
  private monthlySalary = signal<number>(0);

  /** Whole years of service derived from the hire date. */
  yearsOfService = computed(() => getYearsOfService(this.hireDate()));

  /** Entitled vacation days per Mexican LFT ("Vacaciones dignas"). */
  entitledVacationDays = computed(() =>
    this.hireDate() ? getEntitledVacationDays(this.yearsOfService()) : 0
  );

  /** Live payroll breakdown derived from the monthly salary. */
  payrollPreview = computed(() =>
    calculatePayroll(this.monthlySalary(), Math.max(1, this.yearsOfService()))
  );

  private originalIsPosUser = false;
  private originalBillingBranchId: string | null = null;
  private originalPosUserType: PosUserType | null = null;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User | null; isNew?: boolean },
    private dialogRef: MatDialogRef<UserDetailModalComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private branchService: BranchService,
    private authService: AuthService,
    private interceptorService: InterceptorService,
    private employeeService: EmployeeService
  ) {
    this.isNew = data.isNew ?? !data.user;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.setupPosFieldBehavior();
    this.setupBranchFieldBehavior();
    this.setupEmployeeFieldBehavior();
    this.loadData();
  }

  private createForm(): FormGroup {
    const user = this.data.user;
    this.originalIsPosUser = user?.is_pos_user ?? false;
    this.originalPosUserType = user?.pos_user_type ?? null;
    this.originalBillingBranchId = user?.billing_branch_id ?? null;
    this.hasOpenGlobalCut.set(!this.isNew && userHasOpenGlobalCut(user));

    const employee = user?.employee ?? null;

    return this.fb.group({
      first_name: [user?.first_name || '', Validators.required],
      last_name: [user?.last_name || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      phone: [user?.phone || ''],
      password: ['', this.isNew ? Validators.required : []],
      confirm_password: ['', this.isNew ? Validators.required : []],
      billing_branch_id: [user?.billing_branch_id ?? ''],
      is_pos_user: [user?.is_pos_user ?? false],
      pos_user_type: [user?.pos_user_type ?? null],
      pos_user_code: [user?.pos_user_code ?? null],

      // Employee (RH / nómina)
      is_employee: [user?.is_employee ?? false],
      employee: this.fb.group({
        employee_code: [employee?.employee_code ?? ''],
        rfc: [employee?.rfc ?? ''],
        curp: [employee?.curp ?? ''],
        nss: [employee?.nss ?? ''],
        position: [employee?.position ?? ''],
        department: [employee?.department ?? ''],
        hire_date: [employee?.hire_date ?? ''],
        birth_date: [employee?.birth_date ?? ''],
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

    this.form.get('is_employee')?.valueChanges.subscribe(applyEmployeeState);

    this.hireDate.set((employeeGroup.get('hire_date')?.value as string) || null);
    this.monthlySalary.set(Number(employeeGroup.get('monthly_salary')?.value) || 0);
    applyEmployeeState(!!this.form.get('is_employee')?.value);
  }

  private setupPosFieldBehavior(): void {
    const applyPosState = (isPosUser: boolean) => {
      const codeControl = this.form.get('pos_user_code');
      const typeControl = this.form.get('pos_user_type');
      if (!codeControl || !typeControl) {
        return;
      }

      if (isPosUser) {
        codeControl.clearValidators();
        codeControl.setValue(null, { emitEvent: false });
        codeControl.disable({ emitEvent: false });
        typeControl.enable({ emitEvent: false });
        typeControl.setValidators([Validators.required]);
      } else {
        codeControl.enable({ emitEvent: false });
        codeControl.setValidators([Validators.min(1)]);
        typeControl.clearValidators();
        typeControl.setValue(null, { emitEvent: false });
        typeControl.disable({ emitEvent: false });
        this.showPosTypeChangeWarning.set(false);
      }

      codeControl.updateValueAndValidity({ emitEvent: false });
      typeControl.updateValueAndValidity({ emitEvent: false });
      this.applyBranchValidators(isPosUser);
    };

    this.form.get('is_pos_user')?.valueChanges.subscribe(applyPosState);
    this.form.get('pos_user_type')?.valueChanges.subscribe((value: PosUserType | null) => {
      this.updatePosTypeChangeWarning(value);
    });

    applyPosState(!!this.form.get('is_pos_user')?.value);
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
    const userBranch$ =
      this.isNew || !this.data.user
        ? of<string | null>(this.data.user?.billing_branch_id ?? null)
        : this.userService.getUserBranch(this.data.user.id);

    forkJoin({ branches: branches$, userBranch: userBranch$ }).subscribe({
      next: ({ branches, userBranch }) => {
        this.branches.set(branches);

        const billingBranchId =
          userBranch ?? this.data.user?.billing_branch_id ?? null;

        this.form.patchValue({
          billing_branch_id: billingBranchId ?? ''
        });

        this.applyBranchValidators(!!this.form.get('is_pos_user')?.value);
        this.originalBillingBranchId = billingBranchId ?? null;
        this.applyOpenCutEditLock();
        this.loadEmployeeProfile();
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
      next: (user) => this.applyEmployeeProfile(user),
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

  isPosEditLockedByOpenCut(): boolean {
    return this.hasOpenGlobalCut();
  }

  private shouldLockPosEditByOpenCut(): boolean {
    return (
      !this.isNew &&
      this.hasOpenGlobalCut() &&
      this.data.user?.pos_user_type === 'COBRANZA' &&
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

  close(): void {
    if (!this.saving()) {
      this.dialogRef.close(false);
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

    const rawPosCode = this.form.get('pos_user_code')?.value;
    const posCode =
      rawPosCode === null || rawPosCode === undefined || rawPosCode === ''
        ? null
        : Number(rawPosCode);

    if (!isPosUser && posCode !== null && (!Number.isInteger(posCode) || posCode < 1)) {
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
      is_pos_user: isPosUser,
      pos_user_type: isPosUser ? posUserType : null,
      is_employee: isEmployee,
    };

    if (isEmployee) {
      commonPayload['employee'] = this.buildEmployeePayload();
    }

    if (this.shouldLockPosEditByOpenCut()) {
      delete commonPayload['billing_branch_id'];
      delete commonPayload['is_pos_user'];
      delete commonPayload['pos_user_type'];
    }

    if (!isPosUser && posCode !== null) {
      commonPayload['pos_user_code'] = posCode;
    }

    if (this.isNew) {
      const payload = {
        ...commonPayload,
        tenant_id: this.authService.user_info.tenant_id,
        status_id: 1,
        password: this.form.get('password')?.value
      };

      this.userService.createUser(payload as any).subscribe({
        next: () => this.onSaveSuccess('Usuario creado exitosamente'),
        error: (error) => this.onSaveError(error)
      });
      return;
    }

    this.userService.updateUser(this.data.user!.id, commonPayload as any).subscribe({
      next: () => this.onSaveSuccess('Usuario actualizado correctamente'),
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

    return payload;
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

  private onSaveSuccess(message: string): void {
    this.saving.set(false);
    this.interceptorService.openSnackbar({
      type: 'success',
      title: 'Éxito',
      message
    });
    this.dialogRef.close(true);
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
        'Selecciona el tipo de terminal POS (Ventas o Cobranza).',
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
