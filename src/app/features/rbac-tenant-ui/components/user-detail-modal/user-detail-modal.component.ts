import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forkJoin, of } from 'rxjs';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { User, POS_USER_TYPE_OPTIONS, PosUserType, isOpenGlobalCutBlockMessage, userHasOpenGlobalCut, POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE } from '../../models';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TabComponent, ButtonComponent],
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss']
})
export class UserDetailModalComponent implements OnInit {
  readonly posUserTypeOptions = POS_USER_TYPE_OPTIONS;

  readonly tabs: TabItem[] = [
    { id: 'general', title: 'Información general' },
    { id: 'pos', title: 'POS' },
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
    private interceptorService: InterceptorService
  ) {
    this.isNew = data.isNew ?? !data.user;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.setupPosFieldBehavior();
    this.setupBranchFieldBehavior();
    this.loadData();
  }

  private createForm(): FormGroup {
    const user = this.data.user;
    this.originalIsPosUser = user?.is_pos_user ?? false;
    this.originalPosUserType = user?.pos_user_type ?? null;
    this.originalBillingBranchId = user?.billing_branch_id ?? null;
    this.hasOpenGlobalCut.set(!this.isNew && userHasOpenGlobalCut(user));

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
      pos_user_code: [user?.pos_user_code ?? null]
    });
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
    };

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

    const backendMessage = error.error?.message as string | undefined;

    if (error?.status === 400 && isOpenGlobalCutBlockMessage(backendMessage)) {
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

    const message =
      (backendMessage && knownMessages[backendMessage]) ||
      backendMessage ||
      'Error al guardar el usuario';

    if (isOpenGlobalCutBlockMessage(backendMessage)) {
      this.activeTab = 'pos';
    } else if (backendMessage?.includes('sucursal')) {
      this.activeTab = 'branches';
    } else if (backendMessage?.includes('pos_user_type')) {
      this.activeTab = 'pos';
    }

    this.interceptorService.openSnackbar({
      type: 'error',
      title: 'Error',
      message
    });
  }
}
