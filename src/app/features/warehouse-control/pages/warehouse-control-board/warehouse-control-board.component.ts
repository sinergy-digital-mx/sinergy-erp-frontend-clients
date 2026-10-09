import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { BranchService } from '../../../settings/services/branch.service';
import { AddToShippingDialogComponent } from '../../components/add-to-shipping-dialog/add-to-shipping-dialog.component';
import { WarehouseControlDetailPanelComponent } from '../../components/warehouse-control-detail-panel/warehouse-control-detail-panel.component';
import { WarehouseControlProgressComponent } from '../../components/warehouse-control-progress/warehouse-control-progress.component';
import { WarehousePickLinesDialogComponent } from '../../components/warehouse-pick-lines-dialog/warehouse-pick-lines-dialog.component';
import { WAREHOUSE_CONTROL_PERMISSIONS } from '../../config/permissions.config';
import {
  AssignedWarehouse,
  allTasksClosed,
  jobCustomerName,
  EMPTY_WAREHOUSE_CONTROL_STATS,
  matchesPickPosition,
  matchesPickStatus,
  readCachedWarehouseControlBranchId,
  resolveWarehouseControlView,
  writeCachedWarehouseControlBranchId,
  taskLineSalesOrderedQty,
  taskProgress,
  WarehousePickStatusFilter,
  warehouseControlJobStatusLabel,
  warehouseControlJobStatusTooltip,
  warehouseKindFromLabel,
  warehouseKindLabel as warehouseKindLabelOf,
  warehouseKindOf,
  WarehouseControlBillingBranch,
  warehouseNameOf,
  WarehouseControlBoardResponse,
  WarehouseControlJob,
  WarehouseControlPosition,
  WarehouseControlStats,
  WarehouseControlTask,
  WarehouseControlView,
} from '../../models/warehouse-control.model';
import { WarehouseControlService } from '../../services/warehouse-control.service';

interface FloorCell {
  key: string;
  position: WarehouseControlPosition | null;
  row: number;
  col: number;
}

interface PickRow {
  job: WarehouseControlJob;
  task: WarehouseControlTask;
}

@Component({
  selector: 'app-warehouse-control-board',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    EmptyStageComponent,
    FilterClearButtonComponent,
    SpinnerComponent,
    MatTooltipModule,
    WarehouseControlProgressComponent,
  ],
  templateUrl: './warehouse-control-board.component.html',
  styleUrl: './warehouse-control-board.component.scss',
})
export class WarehouseControlBoardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  branches = signal<WarehouseControlBillingBranch[]>([]);
  billingBranches = signal<WarehouseControlBillingBranch[]>([]);
  scopeLabel = signal('');
  loading = signal(false);
  acting = signal(false);
  stats = signal<WarehouseControlStats>({ ...EMPTY_WAREHOUSE_CONTROL_STATS });
  jobs = signal<WarehouseControlJob[]>([]);
  positions = signal<WarehouseControlPosition[]>([]);
  queue = signal<WarehouseControlJob[]>([]);
  view = signal<WarehouseControlView>('admin');
  adminPane = signal<'desk' | 'progress'>('desk');
  assignedWarehouses = signal<AssignedWarehouse[]>([]);
  pickStatusFilter = signal<WarehousePickStatusFilter>('all');
  pickPositionFilter = signal('all');

  searchControl = new FormControl('', { nonNullable: true });
  branchControl = new FormControl('', { nonNullable: true });
  statusControl = new FormControl('', { nonNullable: true });

  floorGrid = computed(() => this.buildFloorGrid(this.positions()));
  pickRows = computed<PickRow[]>(() => {
    const rows: PickRow[] = [];
    for (const job of this.jobs()) {
      for (const task of job.pick_tasks ?? []) {
        rows.push({ job, task });
      }
    }
    return rows;
  });
  filteredPickRows = computed(() =>
    this.pickRows().filter(
      (row) =>
        matchesPickStatus(row.task.status, this.pickStatusFilter()) &&
        matchesPickPosition(row.job.position?.code, this.pickPositionFilter())
    )
  );
  pickStatusCounts = computed(() => {
    const counts: Record<WarehousePickStatusFilter, number> = {
      all: 0,
      pending: 0,
      in_progress: 0,
      picked: 0,
      short: 0,
    };
    for (const row of this.pickRows()) {
      if (!matchesPickPosition(row.job.position?.code, this.pickPositionFilter())) continue;
      counts.all += 1;
      if (row.task.status === 'pending') counts.pending += 1;
      else if (row.task.status === 'in_progress') counts.in_progress += 1;
      else if (row.task.status === 'picked') counts.picked += 1;
      else if (row.task.status === 'short') counts.short += 1;
    }
    return counts;
  });
  pickPositionOptions = computed(() => {
    const counts = new Map<string, number>();
    const known = new Set<string>();
    let none = 0;
    let all = 0;
    let hasUnassigned = false;
    for (const row of this.pickRows()) {
      const code = row.job.position?.code?.trim() || '';
      if (!code) hasUnassigned = true;
      else known.add(code);
      if (!matchesPickStatus(row.task.status, this.pickStatusFilter())) continue;
      all += 1;
      if (!code) none += 1;
      else counts.set(code, (counts.get(code) ?? 0) + 1);
    }
    const codes = [...known].sort((a, b) => a.localeCompare(b, 'es', { numeric: true }));
    return { all, none, codes, counts, hasUnassigned };
  });
  freePositions = computed(() => this.positions().filter((p) => !p.occupied));
  hasPositionsCatalog = computed(() => this.positions().length > 0);
  canConfigure = computed(
    () =>
      this.view() === 'admin' &&
      (this.authService.hasAdminRole() ||
        this.authService.hasPermission(WAREHOUSE_CONTROL_PERMISSIONS.create))
  );
  canSwitchView = computed(
    () => this.authService.hasAdminRole() && this.assignedWarehouses().length > 0
  );
  warehouseStats = computed(() => this.stats().warehouse ?? { pending: 0, in_progress: 0, picked_today: 0 });
  branchOptions = computed<WarehouseControlBillingBranch[]>(() =>
    this.view() === 'warehouse' ? this.billingBranches() : this.branches()
  );
  showBranchCombo = computed(
    () => this.view() === 'admin' || this.branchOptions().length > 1
  );
  scopeChip = computed(() => {
    const label =
      this.scopeLabel() ||
      this.assignedWarehouses()[0]?.name ||
      '';
    const branch =
      this.branchOptions().find((item) => item.id === this.branchControl.value) ||
      this.branchOptions()[0];
    const code = branch?.code || '';
    if (label && code) return `${label} · ${code}`;
    return label || code;
  });
  scopeKindClass = computed(
    () => `wc-wh wc-wh--${warehouseKindFromLabel(this.scopeLabel() || this.assignedWarehouses()[0]?.name)}`
  );

  readonly statusRows: Array<{
    key: keyof WarehouseControlStats;
    label: string;
    fill: string;
    status: string;
  }> = [
    { key: 'queue', label: 'Por surtir', fill: 'slate', status: 'queue' },
    { key: 'picking', label: 'Picking', fill: 'amber', status: 'picking' },
    { key: 'assembling', label: 'Armando', fill: 'violet', status: 'assembling' },
    { key: 'assembled', label: 'Armadas', fill: 'emerald', status: 'assembled' },
    { key: 'assembled_today', label: 'Hoy', fill: 'slate', status: 'today' },
  ];

  readonly statusLegend: Array<{ status: string; label: string; dot: string }> = [
    { status: 'released', label: 'Por surtir', dot: 'released' },
    { status: 'picking', label: 'Picking', dot: 'picking' },
    { status: 'assembling', label: 'Armando', dot: 'assembling' },
    { status: 'assembled', label: 'Armada', dot: 'assembled' },
  ];

  readonly emptyParams = { icon_size: 28, width: 56, height: 56, row_gap: 10 };

  constructor(
    private warehouseControlService: WarehouseControlService,
    private branchService: BranchService,
    private dialog: MatDialog,
    private toast: ToastService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignedWarehouses.set(this.authService.getAssignedWarehouses());
    this.scopeLabel.set(this.assignedWarehouses()[0]?.name || '');
    this.view.set(
      resolveWarehouseControlView(
        this.assignedWarehouses(),
        this.authService.hasAdminRole(),
        this.route.snapshot.queryParamMap.get('view')
      )
    );

    const branchFromQuery = this.route.snapshot.queryParamMap.get('billing_branch_id')?.trim() || '';
    const assignedBranchIds = this.assignedWarehouses()
      .map((item) => item.billing_branch_id)
      .filter((id): id is string => !!id);
    const cached = readCachedWarehouseControlBranchId();
    const cacheOk =
      !!cached &&
      (this.view() === 'admin' || assignedBranchIds.length === 0 || assignedBranchIds.includes(cached));
    const defaultBranch =
      branchFromQuery ||
      (cacheOk ? cached : '') ||
      this.assignedWarehouses()[0]?.billing_branch_id ||
      this.authService.user_info?.billing_branch_id ||
      '';
    if (defaultBranch) {
      this.branchControl.setValue(defaultBranch, { emitEvent: false });
      writeCachedWarehouseControlBranchId(defaultBranch);
    }

    if (this.view() === 'admin') {
      this.loadBranches();
    }
    this.loadBoard();

    const jobId = this.route.snapshot.queryParamMap.get('jobId');
    if (jobId) {
      this.openJob(jobId);
    }

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.loadBoard());

    this.branchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((branchId) => {
      writeCachedWarehouseControlBranchId(branchId);
      this.loadBoard();
    });
    this.statusControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.loadBoard());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        const list = (branches || []).map((branch) => ({
          id: branch.id,
          display_name: branch.display_name || branch.name,
          name: branch.name,
          code: branch.code,
        }));
        this.branches.set(list);
        const current = this.branchControl.value;
        if (current && list.length && !list.some((branch) => branch.id === current)) {
          this.branchControl.setValue('', { emitEvent: false });
          writeCachedWarehouseControlBranchId('');
          this.loadBoard();
        }
      },
      error: () => this.branches.set([]),
    });
  }

  loadBoard(): void {
    this.loading.set(true);
    this.warehouseControlService
      .getBoard({
        billing_branch_id: this.branchControl.value || undefined,
        search: this.searchControl.value.trim() || undefined,
        stage: this.statusControl.value || undefined,
        view: this.view(),
        page: 1,
        limit: 200,
      })
      .subscribe({
        next: (board) => {
          const sentBranch = this.branchControl.value;
          this.applyBoard(board);
          this.syncWarehouseScope(board, sentBranch);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.stats.set({ ...EMPTY_WAREHOUSE_CONTROL_STATS });
          this.jobs.set([]);
          this.positions.set([]);
          this.queue.set([]);
          this.toast.error(err?.error?.message || 'No se pudo cargar Mesa de Control');
        },
      });
  }

  setView(view: WarehouseControlView): void {
    if (this.view() === view) return;
    this.view.set(view);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    if (view === 'admin') {
      this.loadBranches();
    }
    this.loadBoard();
  }

  openJob(jobId: string): void {
    this.dialog
      .open(WarehouseControlDetailPanelComponent, {
        width: '760px',
        maxWidth: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        position: { right: '0', top: '0' },
        panelClass: 'warehouse-control-side-panel',
        autoFocus: false,
        data: {
          jobId,
          view: this.view(),
          hasPositions: this.hasPositionsCatalog(),
          billingBranchId: this.branchControl.value || undefined,
        },
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed) this.loadBoard();
      });
  }

  canMarkAssembled(job: WarehouseControlJob): boolean {
    const status = job.status;
    return (
      (status === 'assembling' || status === 'waiting_assembly') && allTasksClosed(job.tasks)
    );
  }

  canAddToShipping(job: WarehouseControlJob): boolean {
    return job.status === 'assembled' || job.sales_order?.general_status === 'Lista para entrega';
  }

  markAssembled(job: WarehouseControlJob, event?: Event): void {
    event?.stopPropagation();
    this.runAction(
      () => this.warehouseControlService.corroborate(job.id),
      'Orden armada. Ya se puede agregar a un viaje en Creado.',
    );
  }

  addToShipping(job: WarehouseControlJob, event?: Event): void {
    event?.stopPropagation();
    const salesOrderId = job.sales_order_id || job.sales_order?.id;
    if (!salesOrderId) return;
    this.dialog
      .open(AddToShippingDialogComponent, {
        width: '440px',
        maxWidth: '96vw',
        data: {
          salesOrderId,
          billingBranchId: this.branchControl.value || job.billing_branch?.id,
        },
      })
      .afterClosed()
      .subscribe((added) => {
        if (added) {
          this.toast.success('Orden agregada al viaje');
          this.loadBoard();
        }
      });
  }

  assignNextFree(jobId: string, event?: Event): void {
    event?.stopPropagation();
    this.runAction(() => this.warehouseControlService.assignPosition(jobId), 'Posición asignada');
  }

  assignPosition(jobId: string, positionId: string, event?: Event): void {
    event?.stopPropagation();
    if (!positionId) return;
    this.runAction(
      () => this.warehouseControlService.assignPosition(jobId, { position_id: positionId }),
      'Posición asignada'
    );
  }

  startTask(job: WarehouseControlJob, task: WarehouseControlTask, event?: Event): void {
    event?.stopPropagation();
    this.runAction(() => this.warehouseControlService.startTask(job.id, task.id), 'Picking iniciado');
  }

  completeTask(job: WarehouseControlJob, task: WarehouseControlTask, event?: Event): void {
    event?.stopPropagation();
    this.runAction(
      () => this.warehouseControlService.completeTask(job.id, task.id),
      'Almacén surtido'
    );
  }

  openPickLines(job: WarehouseControlJob, task: WarehouseControlTask, event?: Event): void {
    event?.stopPropagation();
    this.dialog
      .open(WarehousePickLinesDialogComponent, {
        width: '720px',
        maxWidth: 'calc(100vw - 1.5rem)',
        maxHeight: '86vh',
        panelClass: 'wc-pick-lines-panel',
        autoFocus: false,
        data: { job, task },
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed) this.loadBoard();
      });
  }

  setPickStatus(status: WarehousePickStatusFilter): void {
    this.pickStatusFilter.set(status);
  }

  setPickPosition(code: string): void {
    this.pickPositionFilter.set(code);
  }

  positionCount(code: string): number {
    return this.pickPositionOptions().counts.get(code) ?? 0;
  }

  setAdminPane(pane: 'desk' | 'progress'): void {
    this.adminPane.set(pane);
  }

  activeStageLabel(): string {
    const value = this.statusControl.value;
    return this.statusRows.find((row) => row.status === value)?.label || '';
  }

  pickSummary(task: WarehouseControlTask): string {
    const lines = task.lines ?? [];
    const count = lines.length || Number(task.lines_count ?? task.lines_total ?? 0);
    const qty = lines.length
      ? lines.reduce((sum, line) => sum + taskLineSalesOrderedQty(line), 0)
      : Number(task.quantity_requested_total ?? 0);
    const products = count === 1 ? '1 producto' : `${count} productos`;
    return `${products} · Pedido ${this.formatLineQty(qty)}`;
  }

  customerName(job: WarehouseControlJob): string {
    return jobCustomerName(job);
  }

  jobStatusLabel(status?: string | null): string {
    return warehouseControlJobStatusLabel(status);
  }

  statusTooltip(status?: string | null): string {
    return warehouseControlJobStatusTooltip(status);
  }

  warehouseLabel(task: WarehouseControlTask): string {
    return warehouseNameOf(task);
  }

  warehouseKindLabel(task: WarehouseControlTask): string {
    return warehouseKindLabelOf(task);
  }

  taskChip(task: WarehouseControlTask): string {
    const progress = taskProgress(task);
    return `${warehouseKindLabelOf(task)} ${progress.closed}/${progress.total}`;
  }

  warehouseKindClass(task: WarehouseControlTask): string {
    return `wc-wh wc-wh--${warehouseKindOf(task)}`;
  }

  positionCode(job: WarehouseControlJob): string {
    return job.position?.code || 'Sin posición';
  }

  branchLabel(branch: WarehouseControlBillingBranch): string {
    if (branch.display_name && branch.code) return `${branch.display_name} (${branch.code})`;
    return branch.display_name || branch.name || branch.code || branch.id;
  }

  selectedBranchName(): string {
    const branch = this.branchOptions().find((item) => item.id === this.branchControl.value);
    return branch ? this.branchLabel(branch) : '';
  }

  get hasActiveFilters(): boolean {
    return !!(this.searchControl.value.trim() || this.statusControl.value);
  }

  hasBoardData(): boolean {
    return this.jobs().length > 0 || this.queue().length > 0 || this.positions().length > 0;
  }

  statValue(key: keyof WarehouseControlStats): number {
    const value = this.stats()[key];
    return typeof value === 'number' ? value : 0;
  }

  jobTasks(job: WarehouseControlJob): WarehouseControlTask[] {
    return job.tasks ?? job.pick_tasks ?? [];
  }

  jobProgress(job: WarehouseControlJob): { closed: number; total: number; pct: number } {
    let closed = 0;
    let total = 0;
    for (const task of this.jobTasks(job)) {
      const progress = taskProgress(task);
      closed += progress.closed;
      total += progress.total;
    }
    return { closed, total, pct: total > 0 ? Math.round((closed / total) * 100) : 0 };
  }

  statusPillClass(status?: string | null): string {
    switch (status) {
      case 'picking':
        return 'dt-status-pill--warning';
      case 'waiting_assembly':
        return 'dt-status-pill--sky';
      case 'assembling':
        return 'dt-status-pill--info';
      case 'assembled':
        return 'dt-status-pill--success';
      default:
        return 'dt-status-pill--neutral';
    }
  }

  listTitle(): string {
    switch (this.statusControl.value) {
      case 'queue':
        return 'Por surtir';
      case 'picking':
        return 'En picking';
      case 'assembling':
        return 'Armando';
      case 'assembled':
        return 'Armadas';
      case 'today':
        return 'Armadas hoy';
      default:
        return 'Órdenes en mesa';
    }
  }

  filterByStatus(status: string): void {
    const next = this.statusControl.value === status ? '' : status;
    this.statusControl.setValue(next);
  }

  showAllJobs(): void {
    if (!this.statusControl.value) return;
    this.statusControl.setValue('');
  }

  clearFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.statusControl.setValue('', { emitEvent: false });
    this.loadBoard();
  }

  formatLineQty(value: number | string | null | undefined): string {
    if (value == null || value === '') return '0';
    const n = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(n)) return String(value);
    return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 2 }).format(n);
  }

  isKpiActive(status: string): boolean {
    return !!status && this.statusControl.value === status;
  }

  cellJob(cell: FloorCell): WarehouseControlJob | null {
    const job = cell.position?.job ?? null;
    if (!job?.id) return job;
    const full = this.jobs().find((item) => item.id === job.id);
    if (!full) return job;
    return {
      ...job,
      ...full,
      customer: full.customer ?? job.customer,
      customer_name: full.customer_name || job.customer_name,
      customer_display_name: full.customer_display_name || job.customer_display_name,
    };
  }

  bayFocused(cell: FloorCell): boolean {
    const filter = this.pickPositionFilter();
    return this.view() === 'warehouse' && filter !== 'all' && filter !== 'none' && cell.position?.code === filter;
  }

  bayDimmed(cell: FloorCell): boolean {
    if (this.view() !== 'warehouse') return false;
    const filter = this.pickPositionFilter();
    if (!filter || filter === 'all') return false;
    if (filter === 'none') return Boolean(cell.position?.occupied);
    return cell.position?.code !== filter;
  }

  onCellClick(cell: FloorCell): void {
    if (this.view() === 'warehouse') return;
    const job = this.cellJob(cell);
    if (job?.id) this.openJob(job.id);
  }

  trackCell(_index: number, cell: FloorCell): string {
    return cell.key;
  }

  private applyBoard(board: WarehouseControlBoardResponse): void {
    const jobs = board.jobs ?? [];
    const byId = new Map(jobs.map((job) => [job.id, job]));
    this.stats.set(board.stats ?? { ...EMPTY_WAREHOUSE_CONTROL_STATS });
    this.jobs.set(jobs);
    this.positions.set(
      (board.positions ?? []).map((position) => {
        const full = position.job?.id ? byId.get(position.job.id) : undefined;
        if (!full) return position;
        return {
          ...position,
          job: {
            ...position.job,
            ...full,
            customer: full.customer ?? position.job?.customer,
            customer_name: full.customer_name || position.job?.customer_name,
            customer_display_name: full.customer_display_name || position.job?.customer_display_name,
          },
        };
      })
    );
    this.queue.set(board.queue ?? []);
    if (board.scope_label) {
      this.scopeLabel.set(board.scope_label);
    }
    if (board.assigned_warehouses?.length) {
      this.assignedWarehouses.set(board.assigned_warehouses);
    }
    if (board.billing_branches?.length) {
      this.billingBranches.set(board.billing_branches);
    }
  }

  private syncWarehouseScope(board: WarehouseControlBoardResponse, sentBranchId: string): void {
    if (this.view() !== 'warehouse') return;
    const scoped = board.billing_branches?.length ? board.billing_branches : this.billingBranches();
    const allowed = scoped.map((item) => item.id);
    const serverId =
      board.billing_branch_id?.trim() || (allowed.length === 1 ? allowed[0] : '');
    if (!serverId) return;
    const current = this.branchControl.value;
    if (current === serverId) return;
    this.branchControl.setValue(serverId, { emitEvent: false });
    writeCachedWarehouseControlBranchId(serverId);
    const sentWrong = !!sentBranchId && sentBranchId !== serverId && allowed.includes(serverId);
    if (sentWrong) {
      this.loadBoard();
    }
  }

  private buildFloorGrid(positions: WarehouseControlPosition[]): {
    columns: number;
    cells: FloorCell[];
  } {
    if (!positions.length) {
      return { columns: 0, cells: [] };
    }
    const maxRow = Math.max(...positions.map((p) => Number(p.row) || 0));
    const maxCol = Math.max(...positions.map((p) => Number(p.col) || 0));
    const byKey = new Map<string, WarehouseControlPosition>();
    for (const position of positions) {
      byKey.set(`${Number(position.row) || 0}:${Number(position.col) || 0}`, position);
    }
    const cells: FloorCell[] = [];
    for (let row = 0; row <= maxRow; row += 1) {
      for (let col = 0; col <= maxCol; col += 1) {
        const position = byKey.get(`${row}:${col}`) ?? null;
        cells.push({
          key: `${row}:${col}`,
          position,
          row,
          col,
        });
      }
    }
    return { columns: maxCol + 1, cells };
  }

  private runAction(factory: () => ReturnType<WarehouseControlService['assemble']>, success: string): void {
    if (this.acting()) return;
    this.acting.set(true);
    factory().subscribe({
      next: () => {
        this.acting.set(false);
        this.toast.success(success);
        this.loadBoard();
      },
      error: (err) => {
        this.acting.set(false);
        this.toast.error(err?.error?.message || 'No se pudo completar la acción');
      },
    });
  }
}
