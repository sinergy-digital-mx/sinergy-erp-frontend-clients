import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  isTaskClosed,
  jobCustomerName,
  taskProgress,
  warehouseControlJobStatusLabel,
  warehouseControlJobStatusTooltip,
  warehouseKindFromLabel,
  warehouseKindOf,
  warehouseNameOf,
  WarehouseControlJob,
  WarehouseControlStats,
  WarehouseKind,
} from '../../models/warehouse-control.model';

interface WarehousePace {
  id: string;
  name: string;
  kind: WarehouseKind;
  pending: number;
  inProgress: number;
  picked: number;
  short: number;
  openJobs: number;
  linesClosed: number;
  linesTotal: number;
  pct: number;
}

interface OrderPace {
  id: string;
  folio: string;
  customer: string;
  status: string;
  position: string;
  done: number;
  total: number;
  pct: number;
  blockers: string[];
  shortage: boolean;
  ready: boolean;
}

@Component({
  selector: 'app-warehouse-control-progress',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './warehouse-control-progress.component.html',
  styleUrl: './warehouse-control-progress.component.scss',
})
export class WarehouseControlProgressComponent {
  jobs = input<WarehouseControlJob[]>([]);
  queue = input<WarehouseControlJob[]>([]);
  stats = input<WarehouseControlStats | null>(null);
  statusLabel = input('');
  jobSelected = output<string>();

  private readonly statusRank: Record<string, number> = {
    waiting_assembly: 0,
    assembling: 0,
    picking: 1,
    released: 2,
    assembled: 3,
  };

  orders = computed<OrderPace[]>(() => {
    const seen = new Set<string>();
    const rows: OrderPace[] = [];
    for (const job of [...this.queue(), ...this.jobs()]) {
      if (!job?.id || seen.has(job.id)) continue;
      seen.add(job.id);
      const tasks = job.tasks ?? [];
      const done = tasks.filter((task) => isTaskClosed(task.status)).length;
      const total = job.progress?.warehouses_total ?? tasks.length;
      const closed = job.progress?.warehouses_done ?? done;
      const blockers = tasks.filter((task) => !isTaskClosed(task.status)).map((task) => warehouseNameOf(task));
      rows.push({
        id: job.id,
        folio: job.folio || job.id.slice(0, 8),
        customer: jobCustomerName(job),
        status: String(job.status || ''),
        position: job.position?.code || 'Sin posición',
        done: closed,
        total,
        pct: total > 0 ? Math.round((closed / total) * 100) : 0,
        blockers,
        shortage: Boolean(job.has_shortage),
        ready: job.status === 'waiting_assembly' || job.status === 'assembling',
      });
    }
    return rows.sort((a, b) => {
      const rank = (this.statusRank[a.status] ?? 9) - (this.statusRank[b.status] ?? 9);
      if (rank !== 0) return rank;
      if (a.pct !== b.pct) return a.pct - b.pct;
      return a.folio.localeCompare(b.folio, 'es', { numeric: true });
    });
  });

  warehouses = computed<WarehousePace[]>(() => {
    const map = new Map<string, WarehousePace>();
    for (const order of this.sourceJobs()) {
      const seenInJob = new Set<string>();
      for (const task of order.tasks ?? []) {
        const id = task.warehouse_id || task.warehouse?.id || warehouseNameOf(task);
        const row = map.get(id) ?? {
          id,
          name: warehouseNameOf(task),
          kind: warehouseKindOf(task),
          pending: 0,
          inProgress: 0,
          picked: 0,
          short: 0,
          openJobs: 0,
          linesClosed: 0,
          linesTotal: 0,
          pct: 0,
        };
        if (task.status === 'pending') row.pending += 1;
        else if (task.status === 'in_progress') row.inProgress += 1;
        else if (task.status === 'short') row.short += 1;
        else if (task.status === 'picked') row.picked += 1;
        if (!isTaskClosed(task.status) && !seenInJob.has(id)) {
          row.openJobs += 1;
          seenInJob.add(id);
        }
        const progress = taskProgress(task);
        row.linesClosed += progress.closed;
        row.linesTotal += progress.total;
        row.kind = row.kind === 'other' ? warehouseKindFromLabel(row.name) : row.kind;
        map.set(id, row);
      }
    }
    return [...map.values()]
      .map((row) => ({
        ...row,
        pct: row.linesTotal > 0 ? Math.round((row.linesClosed / row.linesTotal) * 100) : 0,
      }))
      .sort((a, b) => b.openJobs - a.openJobs || b.pending + b.inProgress - (a.pending + a.inProgress));
  });

  bottleneck = computed(() => this.warehouses().find((row) => row.openJobs > 0) ?? null);

  readyCount = computed(() => this.stat('assembling'));

  funnel = computed(() => {
    const steps = [
      { key: 'queue' as const, label: 'Por surtir', tone: 'slate' },
      { key: 'picking' as const, label: 'Picking', tone: 'amber' },
      { key: 'assembling' as const, label: 'Armando', tone: 'violet' },
      { key: 'assembled' as const, label: 'Armadas', tone: 'emerald' },
      { key: 'assembled_today' as const, label: 'Armadas hoy', tone: 'sky' },
    ];
    const max = Math.max(1, ...steps.map((step) => this.stat(step.key)));
    return steps.map((step) => {
      const value = this.stat(step.key);
      return {
        ...step,
        value,
        width: value ? Math.max(Math.round((value / max) * 100), 8) : 0,
      };
    });
  });

  insight = computed(() => {
    const assembling = this.stat('assembling');
    const block = this.bottleneck();
    const parts: string[] = [];
    if (assembling > 0) {
      parts.push(
        `${assembling} ${assembling === 1 ? 'pedido ya puede armarse' : 'pedidos ya pueden armarse'}`
      );
    }
    if (block) {
      parts.push(`${block.name} frena ${block.openJobs} ${block.openJobs === 1 ? 'pedido' : 'pedidos'}`);
    }
    if (!parts.length) return 'La mesa va al día. No hay almacenes frenando pedidos.';
    return parts.join(' · ') + '.';
  });

  floorLabel(): string {
    const free = this.stat('positions_free');
    const busy = this.stat('positions_occupied');
    const total = free + busy;
    if (!total) return 'Sin mapa';
    return `${busy}/${total}`;
  }

  stat(key: keyof WarehouseControlStats): number {
    const value = this.stats()?.[key];
    return typeof value === 'number' ? value : 0;
  }

  warehouseStat(key: 'pending' | 'in_progress' | 'picked_today'): number {
    return Number(this.stats()?.warehouse?.[key] ?? 0);
  }

  statusLabelOf(status: string): string {
    return warehouseControlJobStatusLabel(status);
  }

  statusTip(status: string): string {
    return warehouseControlJobStatusTooltip(status);
  }

  statusClass(status: string): string {
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

  kindClass(kind: WarehouseKind): string {
    return `wc-kind wc-kind--${kind}`;
  }

  open(id: string): void {
    this.jobSelected.emit(id);
  }

  private sourceJobs(): WarehouseControlJob[] {
    const seen = new Set<string>();
    const rows: WarehouseControlJob[] = [];
    for (const job of [...this.queue(), ...this.jobs()]) {
      if (!job?.id || seen.has(job.id)) continue;
      seen.add(job.id);
      rows.push(job);
    }
    return rows;
  }
}
