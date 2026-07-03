import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, Edit2, Trash2 } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { ConfirmDialogComponent } from '../../../rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { RoleService } from '../../../rbac-tenant-ui/services/role.service';
import { Role } from '../../../rbac-tenant-ui/models';
import { GoalFormDialogComponent } from '../../components/goal-form-dialog/goal-form-dialog.component';
import { GOAL_PERMISSIONS } from '../../config/permissions.config';
import { Goal, GoalListParams, GoalSettings } from '../../models/goal.model';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-goals-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    DatatableWrapperComponent,
    FilterClearButtonComponent,
    HasPermissionDirective,
    LucideAngularModule,
  ],
  templateUrl: './goals-list.component.html',
  styleUrl: './goals-list.component.scss',
})
export class GoalsListComponent implements OnInit, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Edit2 = Edit2;
  readonly Trash2 = Trash2;
  readonly permissions = GOAL_PERMISSIONS;

  private readonly destroy$ = new Subject<void>();
  private readonly branchMap = new Map<string, string>();
  private readonly roleMap = new Map<string, string>();

  branches: Branch[] = [];
  roles: Role[] = [];

  commissionRate = new FormControl<number | null>(1, {
    validators: [],
  });
  settingsLoading = signal(false);
  settingsSaving = signal(false);
  settingsIsDefault = signal(false);
  private savedCommissionRate: number | null = null;

  branchFilter = new FormControl<string>('', { nonNullable: true });
  yearFilter = new FormControl<string>('', { nonNullable: true });
  monthFilter = new FormControl<string>('', { nonNullable: true });
  activeFilter = new FormControl<string>('true', { nonNullable: true });

  yearOptions: string[] = [];
  readonly monthOptions = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Sucursal', prop: 'branch', sortable: false, canAutoResize: true, width: 180 },
      { name: 'Tipo', prop: 'scope', sortable: false, canAutoResize: true, width: 140 },
      { name: 'Métrica', prop: 'metric', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Meta', prop: 'target', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Periodo', prop: 'period', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: true, width: 100 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 110 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron metas' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private goalService: GoalService,
    private branchService: BranchService,
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    const now = new Date();
    const currentYear = now.getFullYear();
    this.yearOptions = [
      String(currentYear - 2),
      String(currentYear - 1),
      String(currentYear),
      String(currentYear + 1),
      String(currentYear + 2),
    ];
    this.yearFilter.setValue(String(currentYear));
    this.monthFilter.setValue(String(now.getMonth() + 1));
  }

  ngOnInit(): void {
    this.loadSettings();
    this.loadLookups();
    this.loadGoals();

    this.branchFilter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.loadGoals());
    this.yearFilter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.loadGoals());
    this.monthFilter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.loadGoals());
    this.activeFilter.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.loadGoals());
  }

  get commissionDirty(): boolean {
    const current = this.normalizeCommissionRate(this.commissionRate.value);
    return current != null && current !== this.savedCommissionRate;
  }

  get commissionInvalid(): boolean {
    const value = this.normalizeCommissionRate(this.commissionRate.value);
    return value == null || value < 0 || value > 100;
  }

  saveCommissionSettings(): void {
    const rate = this.normalizeCommissionRate(this.commissionRate.value);
    if (rate == null || rate < 0 || rate > 100 || this.settingsSaving()) {
      this.commissionRate.markAsTouched();
      return;
    }

    this.settingsSaving.set(true);
    this.setCommissionControlEnabled(false);
    this.goalService.updateSettings({ commission_rate: rate }).subscribe({
      next: (settings) => {
        this.applySettings(settings);
        this.settingsSaving.set(false);
        this.setCommissionControlEnabled(true);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Comisión guardada correctamente', type: 'success' },
          duration: 3000,
        });
      },
      error: (error) => {
        this.settingsSaving.set(false);
        this.setCommissionControlEnabled(true);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error?.error?.message || 'Error al guardar la comisión',
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get hasActiveFilters(): boolean {
    const now = new Date();
    return (
      !!this.branchFilter.value ||
      this.yearFilter.value !== String(now.getFullYear()) ||
      this.monthFilter.value !== String(now.getMonth() + 1) ||
      this.activeFilter.value !== 'true'
    );
  }

  clearFilters(): void {
    const now = new Date();
    this.branchFilter.setValue('', { emitEvent: false });
    this.yearFilter.setValue(String(now.getFullYear()), { emitEvent: false });
    this.monthFilter.setValue(String(now.getMonth() + 1), { emitEvent: false });
    this.activeFilter.setValue('true', { emitEvent: false });
    this.loadGoals();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(GoalFormDialogComponent, {
      width: '560px',
      maxWidth: '95vw',
      data: { goal: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGoals();
      }
    });
  }

  openEditModal(goal: Goal): void {
    const dialogRef = this.dialog.open(GoalFormDialogComponent, {
      width: '560px',
      maxWidth: '95vw',
      data: { goal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGoals();
      }
    });
  }

  deleteGoal(goal: Goal): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Eliminar meta',
        message: `¿Eliminar la meta de ${this.getBranchLabel(goal)} (${this.getPeriodLabel(goal)})?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        isDangerous: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.goalService.deleteGoal(goal.id).subscribe({
        next: () => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Meta eliminada correctamente', type: 'success' },
            duration: 3000,
          });
          this.loadGoals();
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: error?.error?.message || 'Error al eliminar la meta',
              type: 'error',
            },
            duration: 5000,
          });
        },
      });
    });
  }

  getBranchLabel(goal: Goal): string {
    return (
      goal.billing_branch?.display_name ||
      goal.billing_branch?.name ||
      goal.billing_branch?.code ||
      this.branchMap.get(goal.billing_branch_id) ||
      '—'
    );
  }

  getScopeLabel(goal: Goal): string {
    if (goal.goal_scope === 'user_role') {
      const roleName =
        goal.role?.name ||
        (goal.role_id ? this.roleMap.get(goal.role_id) : null) ||
        'Rol';
      return `Rol: ${roleName}`;
    }
    return 'Sucursal';
  }

  getMetricLabel(goal: Goal): string {
    return goal.metric_type === 'sales_count' ? '# ventas' : '$';
  }

  getTargetLabel(goal: Goal): string {
    const value = Number(goal.target_value ?? 0);
    if (goal.metric_type === 'amount') {
      return value.toLocaleString('es-MX', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }
    return value.toLocaleString('es-MX');
  }

  getPeriodLabel(goal: Goal): string {
    const month = this.monthOptions.find(
      (item) => Number(item.value) === Number(goal.period_month)
    );
    const monthLabel = month?.label?.slice(0, 3) ?? String(goal.period_month ?? '—');
    return `${monthLabel} ${goal.period_year ?? ''}`.trim();
  }

  getStatusClass(goal: Goal): string {
    return goal.is_active === false
      ? 'settings-badge--status-inactive'
      : 'settings-badge--status-active';
  }

  getStatusLabel(goal: Goal): string {
    return goal.is_active === false ? 'Inactiva' : 'Activa';
  }

  private loadSettings(): void {
    this.settingsLoading.set(true);
    this.setCommissionControlEnabled(false);
    this.goalService.getSettings().subscribe({
      next: (settings) => {
        this.applySettings(settings);
        this.settingsLoading.set(false);
        this.setCommissionControlEnabled(true);
      },
      error: (error) => {
        this.settingsLoading.set(false);
        this.commissionRate.setValue(1);
        this.savedCommissionRate = 1;
        this.settingsIsDefault.set(true);
        this.setCommissionControlEnabled(true);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error?.error?.message || 'Error al cargar la comisión activa',
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }

  private applySettings(settings: GoalSettings): void {
    const rate = this.normalizeCommissionRate(settings?.commission_rate) ?? 1;
    this.commissionRate.setValue(rate);
    this.savedCommissionRate = rate;
    this.settingsIsDefault.set(!!settings?.is_default);
  }

  private setCommissionControlEnabled(enabled: boolean): void {
    if (enabled) {
      this.commissionRate.enable({ emitEvent: false });
    } else {
      this.commissionRate.disable({ emitEvent: false });
    }
  }

  private normalizeCommissionRate(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const rate = Number(value);
    if (!Number.isFinite(rate)) {
      return null;
    }
    return Math.round(rate * 100) / 100;
  }

  private loadLookups(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches = branches ?? [];
        this.branchMap.clear();
        this.branches.forEach((branch) => {
          this.branchMap.set(branch.id, branch.display_name || branch.code || branch.id);
        });
      },
    });

    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles ?? [];
        this.roleMap.clear();
        this.roles.forEach((role) => {
          this.roleMap.set(role.id, role.name);
        });
      },
    });
  }

  private loadGoals(): void {
    this.table_config.update((config) => ({ ...config, loading: true }));

    const filters: GoalListParams = {};
    if (this.branchFilter.value) {
      filters.billing_branch_id = this.branchFilter.value;
    }
    if (this.yearFilter.value) {
      filters.period_year = Number(this.yearFilter.value);
    }
    if (this.monthFilter.value) {
      filters.period_month = Number(this.monthFilter.value);
    }
    if (this.activeFilter.value === 'true') {
      filters.is_active = true;
    } else if (this.activeFilter.value === 'false') {
      filters.is_active = false;
    }

    this.goalService.getGoals(filters).subscribe({
      next: (goals) => {
        this.table_config.update((config) => ({
          ...config,
          rows: goals,
          totalResults: goals.length,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading goals:', error);
        this.table_config.update((config) => ({ ...config, loading: false, rows: [], totalResults: 0 }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error?.error?.message || 'Error al cargar las metas',
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }
}
