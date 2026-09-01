import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  Search,
  X,
} from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { InventoryService } from '../../services/inventory.service';
import {
  CreateTransferDialogData,
  TransferContext,
  TransferContextBatch,
  TransferDestinationBranch,
  TransferDestinationWarehouse,
} from '../../models/inventory-transfer.model';
import { InventorySummaryItem } from '../../models/inventory-item.model';
import {
  InventoryLocationFiscal,
  InventoryLocationBranch,
  InventoryLocationWarehouse,
} from '../../models/inventory-location.model';
import { ToastService } from '../../../../core/services/toast.service';
import {
  TransferLocationView,
  branchLine,
  destinationBranchLabel,
  destinationToLocationView,
  fiscalOptionLabel,
  fromContextWarehouse,
  isSameFiscal,
  shortFiscalLabel,
} from '../../utils/transfer-location.util';
import { TransferLocationPathComponent } from '../transfer-location-path/transfer-location-path.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

interface BatchLineState {
  batch: TransferContextBatch;
  selected: boolean;
  quantity: number;
}

type TransferStep = 1 | 2 | 3;

@Component({
  selector: 'app-create-transfer-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, TransferLocationPathComponent, SpinnerComponent],
  templateUrl: './create-transfer-dialog.component.html',
  styleUrl: './create-transfer-dialog.component.scss',
})
export class CreateTransferDialogComponent implements OnInit {
  readonly X = X;
  readonly ArrowRightLeft = ArrowRightLeft;
  readonly ArrowRight = ArrowRight;
  readonly Search = Search;
  readonly Check = Check;

  /** false = elegir producto/almacén origen; true = flujo de transferencia */
  stepReady = signal(false);
  activeStep = signal<TransferStep>(1);

  context = signal<TransferContext | null>(null);
  batchLines = signal<BatchLineState[]>([]);
  loading = signal(false);
  submitting = signal(false);
  searchingOrigin = signal(false);

  locations = signal<InventoryLocationFiscal[]>([]);
  originCandidates = signal<InventorySummaryItem[]>([]);

  originFiscalId = signal('');
  originBranchId = signal('');
  originWarehouseId = signal('');
  originSearch = signal('');

  selectedFiscalId = signal('');
  selectedBranchId = signal('');
  selectedWarehouseId = signal('');
  notes = signal('');

  private productId = '';
  private warehouseId = '';
  /** UOM del stock a transferir (lote / totalizado), no el default del producto */
  private uomId = '';

  originFiscal = computed(() =>
    this.locations().find(f => f.id === this.originFiscalId()) ?? null
  );

  originBranches = computed(() => this.originFiscal()?.branches ?? []);

  originWarehouses = computed(() =>
    this.originBranches().find(b => b.id === this.originBranchId())?.warehouses ?? []
  );

  destinations = computed(() => this.context()?.destinations ?? []);

  selectedFiscal = computed(() =>
    this.destinations().find(f => f.id === this.selectedFiscalId()) ?? null
  );

  destinationBranches = computed(() => this.selectedFiscal()?.branches ?? []);

  selectedBranch = computed(() =>
    this.destinationBranches().find(b => b.id === this.selectedBranchId()) ?? null
  );

  destinationWarehouses = computed(() => this.selectedBranch()?.warehouses ?? []);

  selectedWarehouse = computed(() =>
    this.destinationWarehouses().find(w => w.id === this.selectedWarehouseId()) ?? null
  );

  sourceLocation = computed<TransferLocationView | null>(() => {
    const wh = this.context()?.source_warehouse;
    return wh ? fromContextWarehouse(wh) : null;
  });

  destinationLocation = computed<TransferLocationView | null>(() => {
    const fiscal = this.selectedFiscal();
    const branch = this.selectedBranch();
    const warehouse = this.selectedWarehouse();
    if (!fiscal && !branch && !warehouse) return null;
    return destinationToLocationView(
      fiscal,
      branch,
      warehouse?.name ?? '',
      warehouse?.id ?? '',
      warehouse?.code ?? ''
    );
  });

  crossingFiscal = computed(() => {
    const source = this.sourceLocation();
    const dest = this.destinationLocation();
    if (!source || !dest || !this.selectedWarehouseId()) return false;
    const same = isSameFiscal(source, dest);
    return same === false;
  });

  totalToTransfer = computed(() =>
    this.batchLines()
      .filter(l => l.selected)
      .reduce((sum, l) => sum + (l.quantity || 0), 0)
  );

  selectedLinesCount = computed(() =>
    this.batchLines().filter(l => l.selected && l.quantity > 0).length
  );

  linesValid = computed(() => {
    const selected = this.batchLines().filter(l => l.selected);
    if (selected.length === 0) return false;
    return selected.every(l => l.quantity > 0 && l.quantity <= this.toNum(l.batch.available_quantity));
  });

  canGoToDestination = computed(() => this.totalToTransfer() > 0 && this.linesValid());

  canGoToConfirm = computed(
    () => this.canGoToDestination() && !!this.selectedWarehouseId()
  );

  canSubmit = computed(() => {
    if (this.submitting() || this.loading() || !this.stepReady()) return false;
    if (!this.selectedWarehouseId()) return false;
    if (!this.canGoToDestination()) return false;
    const sourceId = this.context()?.source_warehouse.id ?? this.warehouseId;
    return this.selectedWarehouseId() !== sourceId;
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateTransferDialogData,
    private dialogRef: MatDialogRef<CreateTransferDialogComponent>,
    private transferService: InventoryTransferService,
    private inventoryService: InventoryService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadLocations();

    if (this.data.product_id && this.data.warehouse_id) {
      this.productId = this.data.product_id;
      this.warehouseId = this.data.warehouse_id;
      this.uomId = this.data.uom_id || '';
      this.stepReady.set(true);
      this.loadContext();
    } else {
      this.stepReady.set(false);
      this.loading.set(false);
    }
  }

  private loadLocations(): void {
    this.inventoryService.getLocations().subscribe({
      next: (locations) => this.locations.set(locations),
      error: () => this.toast.error('No se pudo cargar el catálogo de ubicaciones'),
    });
  }

  private loadContext(): void {
    this.loading.set(true);
    this.transferService.getContext(this.productId, this.warehouseId, this.uomId || undefined).subscribe({
      next: (ctx) => {
        this.applyContext(ctx);
        this.initBatchLines(ctx);
        this.resetDestination();
        this.activeStep.set(1);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err.message || 'No se pudo cargar el contexto de transferencia');
        if (this.data.product_id) {
          this.dialogRef.close(false);
        } else {
          this.stepReady.set(false);
        }
      },
    });
  }

  private applyContext(ctx: TransferContext): void {
    if (this.uomId) {
      ctx = { ...ctx, uom_id: this.uomId };
    } else if (ctx.uom_id) {
      this.uomId = ctx.uom_id;
    }
    this.context.set({
      ...ctx,
      destinations: ctx.destinations ?? [],
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
        selected: isPreselected || (!preselectedId && available > 0 && ctx.batches.length === 1),
        quantity: isPreselected
          ? (preselectedQty ?? available)
          : (!preselectedId && ctx.batches.length === 1 ? available : 0),
      };
    });

    this.batchLines.set(lines);
  }

  toNum(val: string | number | undefined): number {
    if (val === undefined || val === null) return 0;
    const n = typeof val === 'string' ? parseFloat(val) : val;
    return isNaN(n) ? 0 : n;
  }

  formatQty(val: string | number | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(this.toNum(val));
  }

  fiscalLabel(fiscal: { razon_social?: string; rfc?: string }): string {
    return fiscalOptionLabel(fiscal);
  }

  originBranchLabel(branch: InventoryLocationBranch): string {
    return branch.name;
  }

  originWarehouseLabel(wh: InventoryLocationWarehouse): string {
    return wh.name;
  }

  destBranchLabel(branch: TransferDestinationBranch): string {
    return destinationBranchLabel(branch);
  }

  destWarehouseLabel(wh: TransferDestinationWarehouse): string {
    return wh.name;
  }

  onOriginFiscalChange(fiscalId: string): void {
    this.originFiscalId.set(fiscalId);
    this.originBranchId.set('');
    this.originWarehouseId.set('');
    this.originCandidates.set([]);
  }

  onOriginBranchChange(branchId: string): void {
    this.originBranchId.set(branchId);
    this.originWarehouseId.set('');
    this.originCandidates.set([]);
  }

  onOriginWarehouseChange(warehouseId: string): void {
    this.originWarehouseId.set(warehouseId);
    this.originCandidates.set([]);
    if (warehouseId) {
      this.searchOriginProducts();
    }
  }

  searchOriginProducts(): void {
    const warehouseId = this.originWarehouseId();
    if (!warehouseId) {
      this.toast.error('Selecciona el almacén origen');
      return;
    }

    this.searchingOrigin.set(true);
    this.inventoryService
      .getSummary(
        {
          warehouse_id: warehouseId,
          search: this.originSearch().trim() || undefined,
          only_available: true,
        },
        { page: 1, limit: 50 }
      )
      .subscribe({
        next: (response) => {
          this.originCandidates.set(response.data || []);
          this.searchingOrigin.set(false);
        },
        error: () => {
          this.searchingOrigin.set(false);
          this.toast.error('No se pudo buscar stock en el almacén');
        },
      });
  }

  selectOrigin(item: InventorySummaryItem): void {
    this.productId = item.product_id;
    this.warehouseId = item.warehouse_id;
    this.uomId = item.uom_id;
    this.stepReady.set(true);
    this.loadContext();
  }

  backToOrigin(): void {
    this.stepReady.set(false);
    this.context.set(null);
    this.batchLines.set([]);
    this.resetDestination();
    this.notes.set('');
    this.activeStep.set(1);
    this.productId = '';
    this.warehouseId = '';
    this.uomId = '';
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

  onFiscalChange(fiscalId: string): void {
    this.selectedFiscalId.set(fiscalId);
    this.selectedBranchId.set('');
    this.selectedWarehouseId.set('');
  }

  onBranchChange(branchId: string): void {
    this.selectedBranchId.set(branchId);
    this.selectedWarehouseId.set('');
  }

  onWarehouseChange(warehouseId: string): void {
    this.selectedWarehouseId.set(warehouseId);
  }

  private resetDestination(): void {
    this.selectedFiscalId.set('');
    this.selectedBranchId.set('');
    this.selectedWarehouseId.set('');
  }

  getLineError(line: BatchLineState): string | null {
    if (!line.selected) return null;
    const available = this.toNum(line.batch.available_quantity);
    if (line.quantity <= 0) return 'Cantidad debe ser mayor a 0';
    if (line.quantity > available) return `Máximo ${this.formatQty(available)}`;
    return null;
  }

  goToStep(step: TransferStep): void {
    if (step === 1) {
      this.activeStep.set(1);
      return;
    }
    if (step === 2 && this.canGoToDestination()) {
      this.activeStep.set(2);
      return;
    }
    if (step === 3 && this.canGoToConfirm()) {
      this.activeStep.set(3);
    }
  }

  continue(): void {
    if (this.activeStep() === 1 && this.canGoToDestination()) {
      this.activeStep.set(2);
      return;
    }
    if (this.activeStep() === 2 && this.canGoToConfirm()) {
      this.activeStep.set(3);
    }
  }

  back(): void {
    if (this.activeStep() === 3) {
      this.activeStep.set(2);
      return;
    }
    if (this.activeStep() === 2) {
      this.activeStep.set(1);
    }
  }

  isStepUnlocked(step: TransferStep): boolean {
    if (step === 1) return true;
    if (step === 2) return this.canGoToDestination();
    return this.canGoToConfirm();
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

    this.transferService.getContext(this.productId, this.warehouseId, this.uomId || undefined).subscribe({
      next: (freshCtx) => {
        this.applyContext(freshCtx);
        this.submitTransfer(this.context()!);
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

    const uomId = this.uomId || ctx.uom_id;
    if (!uomId) {
      this.submitting.set(false);
      this.toast.error('No se pudo determinar la unidad de medida del lote');
      return;
    }

    const payload = {
      product_id: ctx.product_id,
      uom_id: uomId,
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

  footerRoute = computed(() => {
    const source = this.sourceLocation();
    const dest = this.destinationLocation();
    const fromWarehouse = source?.warehouseName || 'Origen';

    if (!this.selectedWarehouseId() || !dest) {
      return { from: fromWarehouse, to: '' };
    }

    if (this.crossingFiscal() && source) {
      return {
        from: `${shortFiscalLabel(source)} / ${source.branchCode || '—'} / ${source.warehouseName}`,
        to: `${shortFiscalLabel(dest)} / ${dest.branchCode || '—'} / ${dest.warehouseName}`,
      };
    }

    return {
      from: fromWarehouse,
      to: `${dest.branchCode || '—'} / ${dest.warehouseName}`,
    };
  });

  sourceBranchLine(withState = true): string {
    const loc = this.sourceLocation();
    return loc ? branchLine(loc, withState) : '';
  }

  get openedFromList(): boolean {
    return !this.data.product_id || !this.data.warehouse_id;
  }
}
