import { Component, TemplateRef, ViewChild, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { InventoryBatchService, BatchFilters } from '../../services/inventory-batch.service';
import { InventoryListState } from '../../services/inventory-list-state.service';
import { formatInventoryDate, inventoryLocationLabel } from '../../utils/inventory-list.util';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

@Component({
  selector: 'app-inventory-batches-view',
  standalone: true,
  imports: [CommonModule, RemoveTrailingZerosPipe, DatatableWrapperComponent],
  templateUrl: './inventory-batches-view.component.html',
  styleUrl: './inventory-batches-view.component.scss',
})
export class InventoryBatchesViewComponent {
  private readonly batchService = inject(InventoryBatchService);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);
  readonly state = inject(InventoryListState);

  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  private pagination = signal({ page: 1, limit: 20 });

  tableConfig = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Lote', prop: 'batch_number', sortable: true, canAutoResize: false, width: 200 },
      { name: 'Producto', prop: 'product_name', sortable: true, canAutoResize: false, width: 180 },
      { name: 'Sucursal', prop: 'sucursal', sortable: false, canAutoResize: false, width: 190 },
      { name: 'Almacén', prop: 'warehouse_name', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Cantidad', prop: 'quantity', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Orden de Compra', prop: 'purchase_order_id', sortable: false, canAutoResize: false, width: 140 },
      { name: 'TAG', prop: 'source_tag_identifier', sortable: false, canAutoResize: false, width: 160 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 160 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: true,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron lotes de inventario' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor() {
    effect(() => {
      if (!this.state.locationsReady()) return;
      this.state.listEpoch();
      untracked(() => {
        this.pagination.set({ ...this.pagination(), page: 1 });
        this.loadBatches();
      });
    });
  }

  locationLabel = inventoryLocationLabel;
  formatDate = formatInventoryDate;

  onPageChange(event: IPaginationEvent): void {
    this.pagination.set({ page: event.page, limit: event.limit });
    this.loadBatches();
  }

  onSortChange(_event: ISortEvent): void {}

  openBatchDetail(batch: InventoryBatch): void {
    this.dialog.open(BatchDetailDialogComponent, {
      ...BATCH_DETAIL_DIALOG_OPTIONS,
      data: { batchId: batch.id },
    });
  }

  openPurchaseOrderDetail(batch: InventoryBatch, event: Event): void {
    event.stopPropagation();
    if (!batch.purchase_order_id) return;
    this.dialog.open(OrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: batch.purchase_order_id },
    });
  }

  private loadBatches(): void {
    this.tableConfig.update((c) => ({ ...c, loading: true }));

    const { page, limit } = this.pagination();
    const filters: BatchFilters = {
      page,
      limit,
      search: this.state.searchTerm() || undefined,
      ...this.state.locationFilters(),
    };

    this.batchService.getBatches(filters).subscribe({
      next: (response) => {
        const batches = response.data || [];
        const total = response.total || 0;
        const hasNext = response.page < response.totalPages;

        this.tableConfig.update((c) => ({
          ...c,
          rows: batches,
          totalResults: total,
          page,
          hasNext,
          loading: false,
        }));
      },
      error: (err) => {
        this.tableConfig.update((c) => ({ ...c, loading: false }));
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron cargar los lotes'));
      },
    });
  }
}
