import { Component, Inject, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import {
  ArrowRight,
  ArrowRightLeft,
  Package,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { InventoryTransferService } from '../../services/inventory-transfer.service';
import { InventoryService } from '../../services/inventory.service';
import {
  CreateTransferDialogData,
  TransferContext,
  TransferContextBatch,
} from '../../models/inventory-transfer.model';
import { InventorySummaryItem } from '../../models/inventory-item.model';
import {
  InventoryLocationBranch,
  InventoryLocationFiscal,
  InventoryLocationWarehouse,
} from '../../models/inventory-location.model';
import { ToastService } from '../../../../core/services/toast.service';
import { fiscalOptionLabel } from '../../utils/transfer-location.util';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

interface CartLot {
  batch: TransferContextBatch;
  selected: boolean;
  quantity: number;
}

interface CartItem {
  key: string;
  product_id: string;
  product_name: string;
  product_sku: string;
  uom_id: string;
  uom_name: string;
  total_available: number;
  lots: CartLot[];
}

@Component({
  selector: 'app-create-transfer-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './create-transfer-dialog.component.html',
  styleUrl: './create-transfer-dialog.component.scss',
})
export class CreateTransferDialogComponent implements OnInit, OnDestroy {
  readonly X = X;
  readonly ArrowRightLeft = ArrowRightLeft;
  readonly ArrowRight = ArrowRight;
  readonly Search = Search;
  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly Package = Package;

  bootstrapping = signal(false);
  searching = signal(false);
  searched = signal(false);
  addingKey = signal<string | null>(null);
  submitting = signal(false);

  locations = signal<InventoryLocationFiscal[]>([]);
  candidates = signal<InventorySummaryItem[]>([]);
  cart = signal<CartItem[]>([]);
  search = signal('');
  notes = signal('');

  originFiscalId = signal('');
  originBranchId = signal('');
  originWarehouseId = signal('');
  destFiscalId = signal('');
  destBranchId = signal('');
  destWarehouseId = signal('');

  private searchTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly preset: CreateTransferDialogData;

  activeLocations = computed(() => this.onlyActive(this.locations()));

  originBranches = computed(
    () => this.activeLocations().find((fiscal) => fiscal.id === this.originFiscalId())?.branches ?? []
  );

  originWarehouses = computed(
    () => this.originBranches().find((branch) => branch.id === this.originBranchId())?.warehouses ?? []
  );

  destinationTree = computed(() => {
    const sourceId = this.originWarehouseId();
    return this.activeLocations()
      .map((fiscal) => ({
        ...fiscal,
        branches: fiscal.branches
          .map((branch) => ({
            ...branch,
            warehouses: branch.warehouses.filter((warehouse) => warehouse.id !== sourceId),
          }))
          .filter((branch) => branch.warehouses.length > 0),
      }))
      .filter((fiscal) => fiscal.branches.length > 0);
  });

  destBranches = computed(
    () => this.destinationTree().find((fiscal) => fiscal.id === this.destFiscalId())?.branches ?? []
  );

  destWarehouses = computed(
    () => this.destBranches().find((branch) => branch.id === this.destBranchId())?.warehouses ?? []
  );

  originWarehouseName = computed(
    () => this.originWarehouses().find((warehouse) => warehouse.id === this.originWarehouseId())?.name ?? ''
  );

  destWarehouseName = computed(
    () => this.destWarehouses().find((warehouse) => warehouse.id === this.destWarehouseId())?.name ?? ''
  );

  readyItems = computed(() =>
    this.cart().filter((item) => this.itemQuantity(item) > 0 && this.itemLotsValid(item))
  );

  linesValid = computed(() =>
    this.cart().every((item) => item.lots.every((lot) => this.lotValid(lot)))
  );

  sameUomTotal = computed(() => {
    const items = this.readyItems();
    if (items.length === 0) return null;
    const uom = items[0].uom_name;
    if (items.some((item) => item.uom_name !== uom)) return null;
    const total = items.reduce((sum, item) => sum + this.itemQuantity(item), 0);
    return { total, uom };
  });

  payloadReady = computed(() => {
    const origin = this.originWarehouseId();
    const dest = this.destWarehouseId();
    if (!origin || !dest || origin === dest) return false;
    if (this.readyItems().length === 0 || !this.linesValid()) return false;
    return true;
  });

  canSubmit = computed(() => {
    if (this.submitting() || this.bootstrapping() || this.addingKey()) return false;
    return this.payloadReady();
  });

  submitHint = computed(() => {
    if (!this.originWarehouseId()) return 'Elige el almacén de origen';
    if (!this.destWarehouseId()) return 'Elige el almacén de destino';
    if (this.originWarehouseId() === this.destWarehouseId()) return 'Origen y destino deben ser distintos';
    if (!this.linesValid()) return 'Revisa las cantidades marcadas';
    if (this.readyItems().length === 0) return 'Agrega al menos un producto con cantidad';
    return '';
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) data: CreateTransferDialogData | null,
    private dialogRef: MatDialogRef<CreateTransferDialogComponent>,
    private transferService: InventoryTransferService,
    private inventoryService: InventoryService,
    private toast: ToastService
  ) {
    this.preset = data ?? {};
  }

  ngOnInit(): void {
    if (this.preset.product_id && this.preset.warehouse_id) {
      this.bootstrapping.set(true);
    }

    this.inventoryService.getLocations().subscribe({
      next: (locations) => {
        this.locations.set(locations);
        if (this.preset.product_id && this.preset.warehouse_id) {
          this.loadPreset();
        }
      },
      error: () => {
        this.bootstrapping.set(false);
        this.toast.error('No se pudo cargar el catálogo de ubicaciones');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
  }

  fiscalLabel(fiscal: { razon_social?: string; rfc?: string }): string {
    return fiscalOptionLabel(fiscal);
  }

  branchLabel(branch: InventoryLocationBranch): string {
    return branch.name;
  }

  warehouseLabel(warehouse: InventoryLocationWarehouse): string {
    return warehouse.name;
  }

  toNum(val: string | number | undefined): number {
    if (val === undefined || val === null) return 0;
    const n = typeof val === 'string' ? parseFloat(val) : val;
    return Number.isFinite(n) ? n : 0;
  }

  formatQty(val: string | number | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(this.toNum(val));
  }

  itemKey(item: { product_id: string; uom_id: string }): string {
    return `${item.product_id}:${item.uom_id}`;
  }

  isInCart(item: InventorySummaryItem): boolean {
    return this.cart().some((entry) => entry.key === this.itemKey(item));
  }

  itemQuantity(item: CartItem): number {
    return item.lots.filter((lot) => lot.selected).reduce((sum, lot) => sum + (lot.quantity || 0), 0);
  }

  itemSelectedLots(item: CartItem): number {
    return item.lots.filter((lot) => lot.selected && lot.quantity > 0).length;
  }

  lotError(lot: CartLot): string | null {
    if (!lot.selected) return null;
    const available = this.toNum(lot.batch.available_quantity);
    if (lot.quantity <= 0) return 'Indica una cantidad mayor a 0';
    if (lot.quantity > available) return `Máximo ${this.formatQty(available)}`;
    return null;
  }

  onSearchInput(value: string): void {
    this.search.set(value);
    this.scheduleSearch();
  }

  onOriginFiscalChange(fiscalId: string): void {
    const hadStock = !!this.originWarehouseId() && this.cart().length > 0;
    this.originFiscalId.set(fiscalId);
    this.originBranchId.set('');
    this.originWarehouseId.set('');
    this.resetSearch();
    if (hadStock) this.clearCartBecauseOriginChanged();
  }

  onOriginBranchChange(branchId: string): void {
    const hadStock = !!this.originWarehouseId() && this.cart().length > 0;
    this.originBranchId.set(branchId);
    this.originWarehouseId.set('');
    this.resetSearch();
    if (hadStock) this.clearCartBecauseOriginChanged();
  }

  onOriginWarehouseChange(warehouseId: string): void {
    const previous = this.originWarehouseId();
    this.originWarehouseId.set(warehouseId);
    if (previous && previous !== warehouseId && this.cart().length > 0) {
      this.clearCartBecauseOriginChanged();
    }
    if (warehouseId && warehouseId === this.destWarehouseId()) {
      this.destWarehouseId.set('');
      this.toast.info('El destino no puede ser el mismo almacén de origen');
    }
    this.scheduleSearch();
  }

  onDestFiscalChange(fiscalId: string): void {
    this.destFiscalId.set(fiscalId);
    this.destBranchId.set('');
    this.destWarehouseId.set('');
  }

  onDestBranchChange(branchId: string): void {
    this.destBranchId.set(branchId);
    this.destWarehouseId.set('');
  }

  onDestWarehouseChange(warehouseId: string): void {
    this.destWarehouseId.set(warehouseId);
  }

  searchProducts(): void {
    const warehouseId = this.originWarehouseId();
    const fiscalId = this.originFiscalId();
    const branchId = this.originBranchId();
    if (!warehouseId || !fiscalId || !branchId) {
      this.candidates.set([]);
      this.searched.set(false);
      this.searching.set(false);
      return;
    }

    this.searching.set(true);
    this.inventoryService
      .getSummary(
        {
          fiscal_configuration_id: fiscalId,
          billing_branch_id: branchId,
          warehouse_id: warehouseId,
          search: this.search().trim() || undefined,
          only_available: true,
        },
        { page: 1, limit: 20 }
      )
      .subscribe({
        next: (response) => {
          this.candidates.set(response.data || []);
          this.searched.set(true);
          this.searching.set(false);
        },
        error: (err) => {
          this.searching.set(false);
          this.toast.error(err?.message || 'No se pudo buscar stock en el almacén');
        },
      });
  }

  addProduct(item: InventorySummaryItem): void {
    const key = this.itemKey(item);
    if (this.cart().some((entry) => entry.key === key)) {
      this.toast.info('Ese producto ya está en la transferencia');
      return;
    }
    if (!this.originWarehouseId()) {
      this.toast.error('Selecciona el almacén de origen');
      return;
    }

    this.addingKey.set(key);
    this.transferService.getContext(item.product_id, item.warehouse_id, item.uom_id).subscribe({
      next: (ctx) => {
        this.cart.update((items) => [this.toCartItem(ctx, false), ...items]);
        this.addingKey.set(null);
        this.search.set('');
        this.scheduleSearch();
      },
      error: (err) => {
        this.addingKey.set(null);
        this.toast.error(err.message || 'No se pudo cargar el stock de ese producto');
      },
    });
  }

  removeProduct(key: string): void {
    this.cart.update((items) => items.filter((item) => item.key !== key));
  }

  toggleLot(key: string, index: number, selected: boolean): void {
    this.updateLot(key, index, (lot) => {
      const available = this.toNum(lot.batch.available_quantity);
      return {
        ...lot,
        selected,
        quantity: selected ? (lot.quantity > 0 ? lot.quantity : available) : 0,
      };
    });
  }

  updateQuantity(key: string, index: number, value: number | string | null): void {
    const quantity = value === null || value === '' ? 0 : Number(value);
    this.updateLot(key, index, (lot) => ({
      ...lot,
      quantity: Number.isFinite(quantity) ? quantity : 0,
      selected: true,
    }));
  }

  fillLot(key: string, index: number): void {
    this.updateLot(key, index, (lot) => ({
      ...lot,
      selected: true,
      quantity: this.toNum(lot.batch.available_quantity),
    }));
  }

  fillProduct(key: string): void {
    this.cart.update((items) =>
      items.map((item) => {
        if (item.key !== key) return item;
        return {
          ...item,
          lots: item.lots.map((lot) => ({
            ...lot,
            selected: this.toNum(lot.batch.available_quantity) > 0,
            quantity: this.toNum(lot.batch.available_quantity),
          })),
        };
      })
    );
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    if (!this.canSubmit()) return;

    const origin = this.originWarehouseId();
    const dest = this.destWarehouseId();
    if (origin === dest) {
      this.toast.error('El almacén de origen y destino deben ser diferentes');
      return;
    }

    const items = this.cart().filter((item) => this.itemQuantity(item) > 0);
    this.submitting.set(true);

    forkJoin(
      items.map((item) => this.transferService.getContext(item.product_id, origin, item.uom_id))
    ).subscribe({
      next: (contexts) => {
        const stockError = this.applyFreshStock(contexts);
        if (stockError || !this.payloadReady()) {
          this.submitting.set(false);
          this.toast.error(stockError || 'Revisa las cantidades antes de transferir');
          return;
        }
        this.submitTransfer();
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.message || 'No se pudo refrescar el stock disponible');
      },
    });
  }

  private submitTransfer(): void {
    const lines = this.cart().flatMap((item) =>
      item.lots
        .filter((lot) => lot.selected && lot.quantity > 0)
        .map((lot) => ({
          inventory_batch_id: lot.batch.batch_id,
          quantity: lot.quantity,
        }))
    );

    this.transferService
      .createTransfer({
        source_warehouse_id: this.originWarehouseId(),
        destination_warehouse_id: this.destWarehouseId(),
        notes: this.notes().trim() || undefined,
        lines,
      })
      .subscribe({
        next: (result) => {
          this.submitting.set(false);
          const count = this.readyItems().length;
          const detail = count > 1 ? ` · ${count} productos` : '';
          this.toast.success(`Transferencia ${result.folio} creada${detail}`);
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.submitting.set(false);
          this.toast.error(err.message || 'No se pudo crear la transferencia');
        },
      });
  }

  private loadPreset(): void {
    const productId = this.preset.product_id;
    const warehouseId = this.preset.warehouse_id;
    if (!productId || !warehouseId) {
      this.bootstrapping.set(false);
      return;
    }

    this.transferService.getContext(productId, warehouseId, this.preset.uom_id).subscribe({
      next: (ctx) => {
        const branch = ctx.source_warehouse.billing_branch;
        this.originFiscalId.set(branch?.fiscal_configuration?.id ?? '');
        this.originBranchId.set(branch?.id ?? '');
        this.originWarehouseId.set(ctx.source_warehouse.id);
        this.cart.set([this.toCartItem(ctx, true)]);
        this.bootstrapping.set(false);
        this.searchProducts();
      },
      error: (err) => {
        this.bootstrapping.set(false);
        this.toast.error(err.message || 'No se pudo cargar el producto de origen');
        this.dialogRef.close(false);
      },
    });
  }

  private toCartItem(ctx: TransferContext, fromPreset: boolean): CartItem {
    const preselectedId = fromPreset ? this.preset.preselected_batch_id : undefined;
    const preselectedQty = this.preset.preselected_quantity;

    const availableLots = ctx.batches.filter((batch) => this.toNum(batch.available_quantity) > 0);
    const selectSingleLot = !preselectedId && availableLots.length === 1;

    const lots: CartLot[] = ctx.batches.map((batch) => {
      const available = this.toNum(batch.available_quantity);
      const isPreselected = !!preselectedId && preselectedId === batch.batch_id;
      const selected = isPreselected || (selectSingleLot && available > 0);
      let quantity = 0;
      if (isPreselected) {
        quantity = Math.min(preselectedQty ?? available, available);
      } else if (selected) {
        quantity = available;
      }
      return { batch, selected, quantity };
    });

    return {
      key: `${ctx.product_id}:${ctx.uom_id}`,
      product_id: ctx.product_id,
      product_name: ctx.product_name,
      product_sku: ctx.product_sku,
      uom_id: ctx.uom_id,
      uom_name: ctx.uom_name,
      total_available: this.toNum(ctx.total_available_quantity),
      lots,
    };
  }

  private applyFreshStock(contexts: TransferContext[]): string | null {
    const byKey = new Map(contexts.map((ctx) => [`${ctx.product_id}:${ctx.uom_id}`, ctx]));
    let error: string | null = null;

    this.cart.update((items) =>
      items.map((item) => {
        const ctx = byKey.get(item.key);
        if (!ctx) return item;

        const lots = item.lots.map((lot) => {
          const fresh = ctx.batches.find((batch) => batch.batch_id === lot.batch.batch_id);
          if (!fresh) {
            if (lot.selected && lot.quantity > 0) {
              error = `El lote ${lot.batch.batch_number} ya no tiene stock`;
            }
            return {
              ...lot,
              selected: false,
              quantity: 0,
              batch: { ...lot.batch, available_quantity: '0.000' },
            };
          }

          const available = this.toNum(fresh.available_quantity);
          if (lot.selected && lot.quantity > available) {
            error = `Stock insuficiente en lote ${fresh.batch_number}. Disponible: ${this.formatQty(available)}`;
            return { ...lot, batch: fresh, quantity: available };
          }
          return { ...lot, batch: fresh };
        });

        return {
          ...item,
          lots,
          total_available: this.toNum(ctx.total_available_quantity),
        };
      })
    );

    return error;
  }

  private updateLot(key: string, index: number, mapLot: (lot: CartLot) => CartLot): void {
    this.cart.update((items) =>
      items.map((item) => {
        if (item.key !== key) return item;
        const lots = item.lots.map((lot, lotIndex) => (lotIndex === index ? mapLot(lot) : lot));
        return { ...item, lots };
      })
    );
  }

  private lotValid(lot: CartLot): boolean {
    if (!lot.selected) return true;
    const available = this.toNum(lot.batch.available_quantity);
    return lot.quantity > 0 && lot.quantity <= available;
  }

  private itemLotsValid(item: CartItem): boolean {
    return item.lots.every((lot) => this.lotValid(lot));
  }

  private scheduleSearch(): void {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.searchProducts(), 280);
  }

  private resetSearch(): void {
    this.candidates.set([]);
    this.searched.set(false);
    this.searching.set(false);
  }

  private clearCartBecauseOriginChanged(): void {
    this.cart.set([]);
    this.toast.info('Se vació la lista porque cambió el almacén de origen');
  }

  private onlyActive(fiscals: InventoryLocationFiscal[]): InventoryLocationFiscal[] {
    return fiscals
      .filter((fiscal) => fiscal.status === 'active')
      .map((fiscal) => ({
        ...fiscal,
        branches: (fiscal.branches ?? [])
          .filter((branch) => branch.status === 1 || branch.status === '1')
          .map((branch) => ({
            ...branch,
            warehouses: (branch.warehouses ?? []).filter((warehouse) => warehouse.status === 'active'),
          }))
          .filter((branch) => branch.warehouses.length > 0),
      }))
      .filter((fiscal) => fiscal.branches.length > 0);
  }
}
