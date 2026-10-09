import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ToastService } from '../../../../core/services/toast.service';
import {
  jobCustomerName,
  salesQtyToBase,
  taskLinePickedQty,
  taskLineSalesOrderedQty,
  WarehouseControlJob,
  WarehouseControlTask,
  WarehouseControlTaskLine,
  warehouseControlTaskStatusLabel,
} from '../../models/warehouse-control.model';
import { WarehouseControlService } from '../../services/warehouse-control.service';

export interface WarehousePickLinesDialogData {
  job: WarehouseControlJob;
  task: WarehouseControlTask;
}

@Component({
  selector: 'app-warehouse-pick-lines-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SpinnerComponent],
  templateUrl: './warehouse-pick-lines-dialog.component.html',
  styleUrl: './warehouse-pick-lines-dialog.component.scss',
})
export class WarehousePickLinesDialogComponent {
  private dialogRef = inject(MatDialogRef<WarehousePickLinesDialogComponent, boolean>);
  private data = inject<WarehousePickLinesDialogData>(MAT_DIALOG_DATA);
  private warehouseControlService = inject(WarehouseControlService);
  private toast = inject(ToastService);

  job = signal<WarehouseControlJob>(this.data.job);
  task = signal<WarehouseControlTask>(this.data.task);
  acting = signal(false);
  query = signal('');
  qty = signal<Record<string, number>>({});
  private changed = false;

  lines = computed(() => this.task().lines ?? []);
  visibleLines = computed(() => {
    const q = this.query().trim().toLowerCase();
    const lines = this.lines();
    if (!q) return lines;
    return lines.filter((line) => {
      const name = (line.product_name || '').toLowerCase();
      const sku = (line.product_sku || '').toLowerCase();
      return name.includes(q) || sku.includes(q);
    });
  });
  editable = computed(() => this.task().status === 'in_progress');
  pending = computed(() => this.task().status === 'pending');
  closed = computed(() => this.task().status === 'picked' || this.task().status === 'short');
  includedCount = computed(
    () => this.lines().filter((line) => this.qtyOf(line) > 0).length
  );
  shortCount = computed(
    () => this.lines().filter((line) => this.qtyOf(line) + 0.0005 < this.orderedOf(line)).length
  );

  constructor() {
    this.seedQty(this.data.task);
  }

  close(): void {
    this.dialogRef.close(this.changed);
  }

  orderedOf(line: WarehouseControlTaskLine): number {
    return taskLineSalesOrderedQty(line);
  }

  pickedOf(line: WarehouseControlTaskLine): number {
    return taskLinePickedQty(line);
  }

  qtyOf(line: WarehouseControlTaskLine): number {
    return Number(this.qty()[line.id] ?? 0);
  }

  isShort(line: WarehouseControlTaskLine): boolean {
    return this.qtyOf(line) + 0.0005 < this.orderedOf(line);
  }

  customerName(): string {
    return jobCustomerName(this.job());
  }

  taskStatusLabel(): string {
    return warehouseControlTaskStatusLabel(this.task().status);
  }

  positionLabel(): string {
    return this.job().position?.code || 'Sin posición';
  }

  formatQty(value: number): string {
    return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 3 }).format(value || 0);
  }

  onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value || '');
  }

  addLine(line: WarehouseControlTaskLine): void {
    this.setQty(line, this.orderedOf(line));
  }

  clearLine(line: WarehouseControlTaskLine): void {
    this.setQty(line, 0);
  }

  bump(line: WarehouseControlTaskLine, delta: number): void {
    const next = this.qtyOf(line) + delta;
    this.setQty(line, next);
  }

  onQtyInput(line: WarehouseControlTaskLine, event: Event): void {
    const raw = Number((event.target as HTMLInputElement).value);
    this.setQty(line, Number.isFinite(raw) ? raw : 0);
  }

  fillAll(): void {
    const next: Record<string, number> = {};
    for (const line of this.lines()) {
      if (line.id) next[line.id] = this.orderedOf(line);
    }
    this.qty.set(next);
  }

  clearAll(): void {
    const next: Record<string, number> = {};
    for (const line of this.lines()) {
      if (line.id) next[line.id] = 0;
    }
    this.qty.set(next);
  }

  start(): void {
    if (this.acting() || !this.pending()) return;
    this.acting.set(true);
    this.warehouseControlService.startTask(this.job().id, this.task().id).subscribe({
      next: (job) => {
        this.acting.set(false);
        this.changed = true;
        const next =
          (job.pick_tasks ?? job.tasks ?? []).find((item) => item.id === this.task().id) ??
          { ...this.task(), status: 'in_progress' };
        this.job.set({ ...this.job(), ...job, position: job.position ?? this.job().position });
        this.task.set({ ...this.task(), ...next, status: next.status || 'in_progress' });
        this.seedQty(this.task());
        this.toast.success('Picking iniciado');
      },
      error: (err) => {
        this.acting.set(false);
        this.toast.error(err?.error?.message || 'No se pudo iniciar el surtido');
      },
    });
  }

  confirm(full = false): void {
    if (this.acting() || !this.editable()) return;
    this.acting.set(true);
    const request = full
      ? this.warehouseControlService.completeTask(this.job().id, this.task().id)
      : this.warehouseControlService.completeTask(this.job().id, this.task().id, {
          lines: this.lines()
            .filter((line) => !!line.id)
            .map((line) => ({
              id: line.id,
              quantity_base_picked: salesQtyToBase(line, this.qtyOf(line)),
            })),
        });
    request.subscribe({
      next: () => {
        this.acting.set(false);
        this.changed = true;
        this.toast.success(full || this.shortCount() === 0 ? 'Almacén surtido' : 'Surtido con faltante');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.acting.set(false);
        this.toast.error(err?.error?.message || 'No se pudo cerrar el surtido');
      },
    });
  }

  private seedQty(task: WarehouseControlTask): void {
    const next: Record<string, number> = {};
    for (const line of task.lines ?? []) {
      if (!line.id) continue;
      next[line.id] = 0;
    }
    this.qty.set(next);
  }

  private setQty(line: WarehouseControlTaskLine, value: number): void {
    if (!line.id || !this.editable()) return;
    const ordered = this.orderedOf(line);
    const next = Math.min(ordered, Math.max(0, value));
    this.qty.update((current) => ({ ...current, [line.id]: next }));
  }
}
