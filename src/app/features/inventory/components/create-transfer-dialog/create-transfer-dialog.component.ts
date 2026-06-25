import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X, ArrowRightLeft } from 'lucide-angular';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { BranchService } from '../../../settings/services/branch.service';
import {
  CreateTransferDialogData,
  TransferContext,
  TransferContextBatch,
} from '../../models/inventory-transfer.model';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { Branch } from '../../../settings/models/branch.model';
import { ToastService } from '../../../../core/services/toast.service';

interface BatchLineState {
  batch: TransferContextBatch;
  selected: boolean;
  quantity: number;
}

@Component({
  selector: 'app-create-transfer-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './create-transfer-dialog.component.html',
  styleUrl: './create-transfer-dialog.component.scss',
})
export class CreateTransferDialogComponent implements OnInit {
  readonly X = X;
  readonly ArrowRightLeft = ArrowRightLeft;

  context = signal<TransferContext | null>(null);
  batchLines = signal<BatchLineState[]>([]);
  loading = signal(true);
  submitting = signal(false);

  branches = signal<Branch[]>([]);
  warehouses = signal<Warehouse[]>([]);

  selectedBranchId = signal('');
  selectedWarehouseId = signal('');
  notes = signal('');

  destinationWarehouses = computed(() => {
    const branchId = this.selectedBranchId();
    const sourceId = this.context()?.source_warehouse.id;
    if (!branchId) return [];

    return this.warehouses().filter(
      w => w.billing_branch_id === branchId && w.status === 'active' && w.id !== sourceId
    );
  });

  totalToTransfer = computed(() =>
    this.batchLines()
      .filter(l => l.selected)
      .reduce((sum, l) => sum + (l.quantity || 0), 0)
  );

  selectedLinesCount = computed(() =>
    this.batchLines().filter(l => l.selected && l.quantity > 0).length
  );

  canSubmit = computed(() => {
    if (this.submitting() || this.loading()) return false;
    if (!this.selectedWarehouseId()) return false;
    if (this.totalToTransfer() <= 0) return false;
    if (this.selectedLinesCount() === 0) return false;
    if (this.destinationWarehouses().length === 0 && this.selectedBranchId()) return false;
    return this.batchLines()
      .filter(l => l.selected)
      .every(l => l.quantity > 0 && l.quantity <= this.toNum(l.batch.available_quantity));
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateTransferDialogData,
    private dialogRef: MatDialogRef<CreateTransferDialogComponent>,
    private transferService: InventoryTransferService,
    private warehouseService: WarehouseService,
    private branchService: BranchService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadContext();
    this.loadBranchesAndWarehouses();
  }

  private loadContext(): void {
    this.loading.set(true);
    this.transferService.getContext(this.data.product_id, this.data.warehouse_id).subscribe({
      next: (ctx) => {
        this.context.set(ctx);
        this.initBatchLines(ctx);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err.message || 'No se pudo cargar el contexto de transferencia');
        this.dialogRef.close(false);
      },
    });
  }

  private initBatchLines(ctx: TransferContext): void {
    const preselectedId = this.data.preselected_batch_id;
    const preselectedQty = this.data.preselected_quantity;

    const lines: BatchLineState[] = ctx.batches.map(batch => {
      const isPreselected = preselectedId === batch.batch_id;
      const available = this.toNum(batch.available_quantity);
      return {
        batch,
        selected: isPreselected,
        quantity: isPreselected ? (preselectedQty ?? available) : 0,
      };
    });

    this.batchLines.set(lines);
  }

  private loadBranchesAndWarehouses(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => this.branches.set(branches),
      error: () => this.toast.error('No se pudieron cargar las sucursales'),
    });

    this.warehouseService.getWarehouses({ limit: 500, status: 'active' }).subscribe({
      next: (response) => this.warehouses.set(response.data || []),
      error: () => this.toast.error('No se pudieron cargar los almacenes'),
    });
  }

  toNum(val: string | number | undefined): number {
    if (val === undefined || val === null) return 0;
    const n = typeof val === 'string' ? parseFloat(val) : val;
    return isNaN(n) ? 0 : n;
  }

  formatQty(val: string | number | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(this.toNum(val));
  }

  branchLabel(branch: Branch): string {
    return `${branch.code} — ${branch.city}, ${branch.state}`;
  }

  toggleBatch(index: number, selected: boolean): void {
    this.batchLines.update(lines => {
      const updated = [...lines];
      const line = { ...updated[index] };
      line.selected = selected;
      if (selected && line.quantity <= 0) {
        line.quantity = this.toNum(line.batch.available_quantity);
      }
      if (!selected) {
        line.quantity = 0;
      }
      updated[index] = line;
      return updated;
    });
  }

  updateQuantity(index: number, value: number): void {
    this.batchLines.update(lines => {
      const updated = [...lines];
      updated[index] = { ...updated[index], quantity: value };
      return updated;
    });
  }

  fillBatchAvailable(index: number): void {
    const available = this.toNum(this.batchLines()[index].batch.available_quantity);
    this.batchLines.update(lines => {
      const updated = [...lines];
      updated[index] = { ...updated[index], selected: true, quantity: available };
      return updated;
    });
  }

  transferAll(): void {
    this.batchLines.update(lines =>
      lines.map(line => ({
        ...line,
        selected: this.toNum(line.batch.available_quantity) > 0,
        quantity: this.toNum(line.batch.available_quantity),
      }))
    );
  }

  onBranchChange(branchId: string): void {
    this.selectedBranchId.set(branchId);
    this.selectedWarehouseId.set('');
  }

  onWarehouseChange(warehouseId: string): void {
    this.selectedWarehouseId.set(warehouseId);
  }

  getLineError(line: BatchLineState): string | null {
    if (!line.selected) return null;
    const available = this.toNum(line.batch.available_quantity);
    if (line.quantity <= 0) return 'Cantidad debe ser mayor a 0';
    if (line.quantity > available) return `Máximo ${this.formatQty(available)}`;
    return null;
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    if (!this.canSubmit()) return;

    const ctx = this.context();
    if (!ctx) return;

    const destId = this.selectedWarehouseId();
    if (destId === ctx.source_warehouse.id) {
      this.toast.error('El almacén de origen y destino deben ser diferentes');
      return;
    }

    this.submitting.set(true);

    this.transferService.getContext(this.data.product_id, this.data.warehouse_id).subscribe({
      next: (freshCtx) => {
        this.context.set(freshCtx);
        this.submitTransfer(freshCtx);
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.message || 'No se pudo refrescar el stock disponible');
      },
    });
  }

  private submitTransfer(ctx: TransferContext): void {
    const lines = this.batchLines()
      .filter(l => l.selected && l.quantity > 0)
      .map(l => ({
        inventory_batch_id: l.batch.batch_id,
        quantity: l.quantity,
      }));

    const payload = {
      product_id: ctx.product_id,
      uom_id: ctx.uom_id,
      source_warehouse_id: ctx.source_warehouse.id,
      destination_warehouse_id: this.selectedWarehouseId(),
      notes: this.notes().trim() || undefined,
      lines,
    };

    this.transferService.createTransfer(payload).subscribe({
      next: (result) => {
        this.submitting.set(false);
        this.toast.success(`Transferencia ${result.folio} creada correctamente`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.message || 'No se pudo crear la transferencia');
      },
    });
  }

  get destinationBranchLabel(): string {
    const branch = this.branches().find(b => b.id === this.selectedBranchId());
    return branch ? this.branchLabel(branch) : '';
  }

  get destinationWarehouseName(): string {
    const wh = this.warehouses().find(w => w.id === this.selectedWarehouseId());
    return wh?.name ?? '';
  }

  get sourceBranchLabel(): string {
    const wh = this.context()?.source_warehouse;
    if (!wh?.billing_branch) return '';
    const bb = wh.billing_branch;
    return `${bb.code} — ${bb.city}, ${bb.state}`;
  }
}
