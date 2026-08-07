import { Component, Inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { WAREHOUSE_CONTROL_PERMISSIONS } from '../../config/permissions.config';
import {
  WarehouseControlLine,
  WarehouseControlOrder,
} from '../../models/warehouse-control.model';
import { WarehouseControlService } from '../../services/warehouse-control.service';

export interface WarehouseControlDetailPanelData {
  orderId: string;
}

@Component({
  selector: 'app-warehouse-control-detail-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './warehouse-control-detail-panel.component.html',
  styleUrl: './warehouse-control-detail-panel.component.scss',
})
export class WarehouseControlDetailPanelComponent implements OnInit {
  order = signal<WarehouseControlOrder | null>(null);
  loading = signal(true);
  confirming = signal(false);
  notes = '';

  canCorroborate = computed(() =>
    this.authService.hasPermission(WAREHOUSE_CONTROL_PERMISSIONS.corroborate) ||
    this.authService.hasPermission(WAREHOUSE_CONTROL_PERMISSIONS.read)
  );

  lines = computed(() => {
    const o = this.order();
    return o?.line_items ?? o?.lines ?? [];
  });

  hasInsufficientStock = computed(() =>
    this.lines().some((line) => this.isInsufficientStock(line))
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WarehouseControlDetailPanelData,
    private dialogRef: MatDialogRef<WarehouseControlDetailPanelComponent, boolean>,
    private warehouseControlService: WarehouseControlService,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDetail();
  }

  loadDetail(): void {
    this.loading.set(true);
    this.warehouseControlService.getById(this.data.orderId).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err?.error?.message || 'No se pudo cargar el detalle');
        this.dialogRef.close(false);
      },
    });
  }

  customerName(): string {
    const c = this.order()?.customer;
    if (!c) return '—';
    if (c.display_name?.trim()) return c.display_name.trim();
    const company = c.company_name?.trim() || '';
    const person = [c.name, c.lastname].filter(Boolean).join(' ').trim();
    if (company && person) return `${company} - ${person}`;
    return company || person || '—';
  }

  branchLabel(): string {
    const b = this.order()?.billing_branch;
    if (!b) return '—';
    if (b.display_name && b.code) return `${b.display_name} (${b.code})`;
    return b.display_name || b.code || '—';
  }

  warehouseLabel(): string {
    return this.order()?.warehouse?.name || '—';
  }

  formatCurrency(value: number | string | null | undefined): string {
    const n = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(n)) return '—';
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);
  }

  formatDate(value?: string | null): string {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  formatQty(value: number | string | null | undefined): string {
    if (value == null || value === '') return '—';
    const n = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(n)) return String(value);
    return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 4 }).format(n);
  }

  toNumber(value: number | string | null | undefined): number {
    if (value == null || value === '') return 0;
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  isInsufficientStock(line: WarehouseControlLine): boolean {
    const available = this.toNumber(line.available_quantity);
    const needed = this.toNumber(line.quantity_base_uom ?? line.quantity);
    return available < needed;
  }

  close(): void {
    this.dialogRef.close(false);
  }

  corroborate(): void {
    if (!this.canCorroborate() || this.confirming()) return;
    this.confirming.set(true);
    const payload = this.notes.trim() ? { notes: this.notes.trim() } : undefined;
    this.warehouseControlService.corroborate(this.data.orderId, payload).subscribe({
      next: () => {
        this.confirming.set(false);
        this.toast.success('Orden corroborada. Lista para entrega.');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.confirming.set(false);
        this.toast.error(err?.error?.message || 'No se pudo corroborar la orden');
      },
    });
  }
}
