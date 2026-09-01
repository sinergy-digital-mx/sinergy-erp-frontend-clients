import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { WAREHOUSE_CONTROL_PERMISSIONS } from '../../config/permissions.config';
import {
  allTasksClosed,
  jobCustomerName,
  isTaskClosed,
  taskLineOrderedQty,
  taskLinePickedQty,
  taskLineShortQty,
  taskProgress,
  warehouseControlJobStatusLabel,
  warehouseControlJobStatusTooltip,
  warehouseControlTaskStatusLabel,
  warehouseNameOf,
  WarehouseControlJob,
  WarehouseControlPosition,
  WarehouseControlTask,
  WarehouseControlTaskLine,
  WarehouseControlView,
} from '../../models/warehouse-control.model';
import { WarehouseControlService } from '../../services/warehouse-control.service';

export interface WarehouseControlDetailPanelData {
  jobId: string;
  view?: WarehouseControlView;
  hasPositions?: boolean;
  billingBranchId?: string;
}

interface WarehouseTaskGroup {
  warehouseName: string;
  warehouseId?: string;
  tasks: WarehouseControlTask[];
}

@Component({
  selector: 'app-warehouse-control-detail-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatTooltipModule, SpinnerComponent],
  templateUrl: './warehouse-control-detail-panel.component.html',
  styleUrl: './warehouse-control-detail-panel.component.scss',
})
export class WarehouseControlDetailPanelComponent implements OnInit {
  job = signal<WarehouseControlJob | null>(null);
  loading = signal(true);
  acting = signal(false);
  notes = '';
  selectedPositionId = '';
  freePositions = signal<WarehouseControlPosition[]>([]);
  changed = false;

  isAdminView = computed(() => (this.data.view ?? 'admin') !== 'warehouse');
  canManageDesk = computed(
    () =>
      this.isAdminView() &&
      (this.authService.hasAdminRole() ||
        this.authService.hasPermission(WAREHOUSE_CONTROL_PERMISSIONS.update))
  );

  taskGroups = computed<WarehouseTaskGroup[]>(() => {
    const groups = new Map<string, WarehouseTaskGroup>();
    for (const task of this.job()?.tasks ?? []) {
      const key = task.warehouse_id || task.warehouse?.id || warehouseNameOf(task);
      const existing = groups.get(key);
      if (existing) {
        existing.tasks.push(task);
      } else {
        groups.set(key, {
          warehouseName: warehouseNameOf(task),
          warehouseId: task.warehouse_id || task.warehouse?.id,
          tasks: [task],
        });
      }
    }
    return [...groups.values()];
  });

  missing = computed(() => this.job()?.missing ?? []);
  allClosed = computed(() => allTasksClosed(this.job()?.tasks));
  hasPosition = computed(() => !!(this.job()?.position?.id || this.job()?.position?.code));
  hasPositionsCatalog = computed(
    () => this.data.hasPositions === true || this.freePositions().length > 0 || this.hasPosition()
  );

  canAssign = computed(() => this.canManageDesk() && !this.hasPosition());
  canAssemble = computed(() => {
    if (!this.canManageDesk() || !this.allClosed()) return false;
    const status = this.job()?.status;
    return status === 'waiting_assembly' || status === 'assembling';
  });
  canCorroborate = computed(() => {
    if (!this.canManageDesk()) return false;
    const status = this.job()?.status;
    if (status === 'assembled' || status === 'assembling') return true;
    return status === 'waiting_assembly' && !this.hasPositionsCatalog();
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WarehouseControlDetailPanelData,
    private dialogRef: MatDialogRef<WarehouseControlDetailPanelComponent, boolean>,
    private warehouseControlService: WarehouseControlService,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDetail();
    if (this.data.billingBranchId && this.canManageDesk()) {
      this.warehouseControlService.listPositions(this.data.billingBranchId).subscribe({
        next: (positions) => this.freePositions.set(positions.filter((p) => !p.occupied)),
        error: () => this.freePositions.set([]),
      });
    }
  }

  loadDetail(): void {
    this.loading.set(true);
    this.warehouseControlService.getJob(this.data.jobId).subscribe({
      next: (job) => {
        this.job.set(job);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err?.error?.message || 'No se pudo cargar el detalle');
        this.dialogRef.close(this.changed);
      },
    });
  }

  customerName(): string {
    return jobCustomerName(this.job());
  }

  branchLabel(): string {
    const b = this.job()?.billing_branch;
    if (!b) return '—';
    if (b.display_name && b.code) return `${b.display_name} (${b.code})`;
    return b.display_name || b.code || '—';
  }

  jobStatusLabel(): string {
    return warehouseControlJobStatusLabel(this.job()?.status);
  }

  statusTooltip(): string {
    return warehouseControlJobStatusTooltip(this.job()?.status);
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

  taskStatusLabel(status?: string | null): string {
    return warehouseControlTaskStatusLabel(status);
  }

  taskChip(task: WarehouseControlTask): string {
    const progress = taskProgress(task);
    return `${progress.closed}/${progress.total}`;
  }

  groupProgress(group: WarehouseTaskGroup): { closed: number; total: number; pct: number } {
    let closed = 0;
    let total = 0;
    for (const task of group.tasks) {
      const progress = taskProgress(task);
      closed += progress.closed;
      total += progress.total;
    }
    return { closed, total, pct: total > 0 ? Math.round((closed / total) * 100) : 0 };
  }

  warehousesDoneLabel(): string {
    const groups = this.taskGroups();
    const done = groups.filter((group) => group.tasks.every((task) => isTaskClosed(task.status))).length;
    return `${done}/${groups.length} almacenes`;
  }

  formatQty(value: number | string | null | undefined): string {
    if (value == null || value === '') return '—';
    const n = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(n)) return String(value);
    return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 4 }).format(n);
  }

  orderedQty(line: WarehouseControlTaskLine): string {
    return this.formatQty(taskLineOrderedQty(line));
  }

  pickedQty(line: WarehouseControlTaskLine): string {
    return this.formatQty(taskLinePickedQty(line));
  }

  shortQty(line: WarehouseControlTaskLine): string {
    return this.formatQty(taskLineShortQty(line));
  }

  isShortLine(line: WarehouseControlTaskLine): boolean {
    return taskLineShortQty(line) > 0;
  }

  isClosed(status?: string | null): boolean {
    return isTaskClosed(status);
  }

  missingLabel(item: { product_name?: string; warehouse_name?: string }): string {
    return `Falta ${item.product_name || 'producto'} — ${item.warehouse_name || 'almacén'}`;
  }

  close(): void {
    this.dialogRef.close(this.changed);
  }

  assignNextFree(): void {
    this.run(() => this.warehouseControlService.assignPosition(this.data.jobId), 'Posición asignada');
  }

  assignSelected(): void {
    if (!this.selectedPositionId) return;
    this.run(
      () =>
        this.warehouseControlService.assignPosition(this.data.jobId, {
          position_id: this.selectedPositionId,
        }),
      'Posición asignada'
    );
  }

  assemble(): void {
    this.run(() => this.warehouseControlService.assemble(this.data.jobId), 'Orden marcada en armado');
  }

  corroborate(): void {
    const payload = this.notes.trim() ? { notes: this.notes.trim() } : undefined;
    this.run(
      () => this.warehouseControlService.corroborate(this.data.jobId, payload),
      'Orden corroborada. Lista para entrega.',
      true
    );
  }

  private run(
    factory: () => ReturnType<WarehouseControlService['assemble']>,
    success: string,
    closeOnSuccess = false
  ): void {
    if (this.acting()) return;
    this.acting.set(true);
    factory().subscribe({
      next: (job) => {
        this.acting.set(false);
        this.changed = true;
        this.job.set(job);
        this.toast.success(success);
        if (closeOnSuccess) {
          this.dialogRef.close(true);
        }
      },
      error: (err) => {
        this.acting.set(false);
        this.toast.error(err?.error?.message || 'No se pudo completar la acción');
      },
    });
  }
}
