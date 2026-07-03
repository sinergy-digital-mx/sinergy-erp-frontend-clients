import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { RoleService } from '../../../rbac-tenant-ui/services/role.service';
import { Role } from '../../../rbac-tenant-ui/models';
import { GoalService } from '../../services/goal.service';
import { CreateGoalDto, Goal, UpdateGoalDto } from '../../models/goal.model';

export interface GoalFormDialogData {
  goal?: Goal | null;
}

@Component({
  selector: 'app-goal-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    SelectComponent,
    LucideAngularModule,
  ],
  templateUrl: './goal-form-dialog.component.html',
  styleUrl: './goal-form-dialog.component.scss',
})
export class GoalFormDialogComponent implements OnInit, OnDestroy {
  readonly X = X;

  form: FormGroup;
  saving = signal(false);
  loadingLookups = signal(true);
  isNew = true;

  branches: Branch[] = [];
  roles: Role[] = [];

  branchSelectConfig: any;
  roleSelectConfig: any;
  yearSelectConfig: any;
  monthSelectConfig: any;
  activeSelectConfig: any;

  private readonly destroy$ = new Subject<void>();

  readonly monthOptions = [
    { id: 1, name: 'Enero' },
    { id: 2, name: 'Febrero' },
    { id: 3, name: 'Marzo' },
    { id: 4, name: 'Abril' },
    { id: 5, name: 'Mayo' },
    { id: 6, name: 'Junio' },
    { id: 7, name: 'Julio' },
    { id: 8, name: 'Agosto' },
    { id: 9, name: 'Septiembre' },
    { id: 10, name: 'Octubre' },
    { id: 11, name: 'Noviembre' },
    { id: 12, name: 'Diciembre' },
  ];

  readonly activeOptions = [
    { id: true, name: 'Activa' },
    { id: false, name: 'Inactiva' },
  ];

  constructor(
    private fb: FormBuilder,
    private goalService: GoalService,
    private branchService: BranchService,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GoalFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GoalFormDialogData
  ) {
    this.isNew = !data?.goal;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadLookups();
    this.form
      .get('goal_scope')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((scope) => this.onScopeChange(scope));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isUserRoleScope(): boolean {
    return this.form.get('goal_scope')?.value === 'user_role';
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    if (this.isNew) {
      this.createGoal();
      return;
    }

    this.updateGoal();
  }

  private createForm(): FormGroup {
    const now = new Date();
    const goal = this.data?.goal;

    return this.fb.group(
      {
        goal_scope: [goal?.goal_scope ?? 'branch', Validators.required],
        billing_branch_id: [goal?.billing_branch_id ?? null, Validators.required],
        role_id: [goal?.role_id ?? null],
        metric_type: [goal?.metric_type ?? 'amount', Validators.required],
        target_value: [
          goal?.target_value ?? null,
          [Validators.required, Validators.min(0.01)],
        ],
        period_year: [goal?.period_year ?? now.getFullYear(), Validators.required],
        period_month: [
          goal?.period_month ?? now.getMonth() + 1,
          Validators.required,
        ],
        is_active: [goal?.is_active ?? true],
        notes: [goal?.notes ?? ''],
      },
      { validators: [this.roleRequiredWhenUserRole] }
    );
  }

  private roleRequiredWhenUserRole(control: AbstractControl): ValidationErrors | null {
    const scope = control.get('goal_scope')?.value;
    const roleId = control.get('role_id')?.value;
    if (scope === 'user_role' && !roleId) {
      return { roleRequired: true };
    }
    return null;
  }

  private onScopeChange(scope: string): void {
    const roleControl = this.form.get('role_id');
    if (!roleControl) {
      return;
    }

    if (scope === 'user_role') {
      roleControl.setValidators([Validators.required]);
    } else {
      roleControl.clearValidators();
      roleControl.setValue(null);
    }
    roleControl.updateValueAndValidity();
    this.initializeSelectConfigs();
  }

  private loadLookups(): void {
    this.loadingLookups.set(true);

    let pending = 2;
    const done = () => {
      pending -= 1;
      if (pending <= 0) {
        this.initializeSelectConfigs();
        this.loadingLookups.set(false);
        if (!this.isNew) {
          this.onScopeChange(this.form.get('goal_scope')?.value);
        }
      }
    };

    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches = branches ?? [];
        done();
      },
      error: () => {
        this.showError('No se pudieron cargar las sucursales');
        done();
      },
    });

    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles ?? [];
        done();
      },
      error: () => {
        this.showError('No se pudieron cargar los roles');
        done();
      },
    });
  }

  private initializeSelectConfigs(): void {
    this.branchSelectConfig = {
      placeholder: 'Selecciona sucursal',
      data: this.branches.map((branch) => ({
        id: branch.id,
        name: branch.display_name || branch.code || branch.id,
      })),
      value: 'id',
      option: 'name',
      form_control: this.form.get('billing_branch_id'),
      name_select: 'billing_branch_id',
      all: false,
    };

    this.roleSelectConfig = {
      placeholder: 'Selecciona rol',
      data: this.roles.map((role) => ({
        id: role.id,
        name: role.name,
      })),
      value: 'id',
      option: 'name',
      form_control: this.form.get('role_id'),
      name_select: 'role_id',
      all: false,
    };

    this.yearSelectConfig = {
      placeholder: 'Año',
      data: this.buildYearOptions(),
      value: 'id',
      option: 'name',
      form_control: this.form.get('period_year'),
      name_select: 'period_year',
      all: false,
    };

    this.monthSelectConfig = {
      placeholder: 'Mes',
      data: this.monthOptions,
      value: 'id',
      option: 'name',
      form_control: this.form.get('period_month'),
      name_select: 'period_month',
      all: false,
    };

    this.activeSelectConfig = {
      placeholder: 'Estado',
      data: this.activeOptions,
      value: 'id',
      option: 'name',
      form_control: this.form.get('is_active'),
      name_select: 'is_active',
      all: false,
    };
  }

  private buildYearOptions(): Array<{ id: number; name: string }> {
    const currentYear = new Date().getFullYear();
    const years: Array<{ id: number; name: string }> = [];
    for (let year = currentYear - 2; year <= currentYear + 2; year++) {
      years.push({ id: year, name: String(year) });
    }
    return years;
  }

  private createGoal(): void {
    const value = this.form.getRawValue();
    const payload: CreateGoalDto = {
      goal_scope: value.goal_scope,
      billing_branch_id: value.billing_branch_id,
      metric_type: value.metric_type,
      target_value: Number(value.target_value),
      period_type: 'month',
      period_year: Number(value.period_year),
      period_month: Number(value.period_month),
    };

    if (value.goal_scope === 'user_role' && value.role_id) {
      payload.role_id = value.role_id;
    }

    const notes = (value.notes ?? '').trim();
    if (notes) {
      payload.notes = notes;
    }

    this.goalService.createGoal(payload).subscribe({
      next: () => {
        this.showSuccess('Meta creada correctamente');
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.showError(error?.error?.message || 'Error al crear la meta');
        this.saving.set(false);
      },
    });
  }

  private updateGoal(): void {
    const goal = this.data.goal;
    if (!goal) {
      return;
    }

    const value = this.form.getRawValue();
    const payload: UpdateGoalDto = {
      goal_scope: value.goal_scope,
      billing_branch_id: value.billing_branch_id,
      metric_type: value.metric_type,
      target_value: Number(value.target_value),
      period_type: 'month',
      period_year: Number(value.period_year),
      period_month: Number(value.period_month),
      is_active: value.is_active,
      notes: (value.notes ?? '').trim() || null,
      role_id:
        value.goal_scope === 'user_role' && value.role_id ? value.role_id : null,
    };

    this.goalService.updateGoal(goal.id, payload).subscribe({
      next: () => {
        this.showSuccess('Meta actualizada correctamente');
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.showError(error?.error?.message || 'Error al actualizar la meta');
        this.saving.set(false);
      },
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type: 'success' },
      duration: 3000,
    });
  }

  private showError(message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type: 'error' },
      duration: 5000,
    });
  }
}
