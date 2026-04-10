import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InventoryBatchService, BatchFilters } from '../../services/inventory-batch.service';
import { InventoryService } from '../../services/inventory.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { ChevronRight, ChevronDown } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-inventory-batch-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RemoveTrailingZerosPipe, DatatableWrapperComponent, LucideAngularModule],
  templateUrl: './inventory-batch-list.component.html',
  styleUrl: './inventory-batch-list.component.scss'
})
export class InventoryBatchListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;
  readonly ChevronRight = ChevronRight;
  readonly ChevronDown = ChevronDown;

  activeTabIndex = signal<number>(0);

  // Filters
  searchTerm = signal<string>('');
  selectedWarehouse = signal<string>('');
  warehouses = signal<Warehouse[]>([]);

  // State for batches (Por Lotes tab)
  private batchesData = signal<InventoryBatch[]>([]);
  private loadingState = signal<boolean>(false);
  private totalResultsState = signal<number>(0);
  private paginationState = signal<{ page: number; limit: number }>({ page: 1, limit: 20 });

  // State for summary (Totalizado tab)
  private summaryData = signal<any[]>([]);
  private summaryLoadingState = signal<boolean>(false);
  private summaryTotalResultsState = signal<number>(0);
  private summaryPaginationState = signal<{ page: number; limit: number }>({ page: 1, limit: 20 });
  expandedItems = signal<Set<string>>(new Set());

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Lote', prop: 'batch_number', sortable: true, canAutoResize: false, width: 130 },
      { name: 'Producto', prop: 'product_name', sortable: true, canAutoResize: false, width: 180 },
      { name: 'Almacén', prop: 'warehouse_name', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Cantidad', prop: 'quantity', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Orden de Compra', prop: 'purchase_order_id', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 160 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron lotes de inventario' },
    columnMode: 'force',
    reorderable: false,
  });

  // Computed totals for "Totalizado" tab
  totalQuantity = computed(() =>
    this.batchesData().reduce((sum, batch) => {
      const qty = typeof batch.quantity === 'string' ? parseFloat(batch.quantity) : batch.quantity;
      return sum + (isNaN(qty) ? 0 : qty);
    }, 0)
  );

  warehouseTotals = computed(() => {
    const totals: { [key: string]: number } = {};
    this.warehouses().forEach(w => { totals[w.id] = this.getWarehouseTotalQuantity(w.id); });
    return totals;
  });

  warehousesWithData = computed(() =>
    this.warehouses().filter(w => this.warehouseTotals()[w.id] > 0)
  );

  constructor(
    private inventoryBatchService: InventoryBatchService,
    private inventoryService: InventoryService,
    private warehouseService: WarehouseService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadWarehouses();
    this.loadBatches();
  }

  onTabChange(index: number): void {
    this.activeTabIndex.set(index);
    if (index === 1) {
      this.loadSummary();
    }
  }

  loadSummary(): void {
    this.summaryLoadingState.set(true);

    const { page, limit } = this.summaryPaginationState();
    const filters: any = {
      page,
      limit,
      warehouse_id: this.selectedWarehouse() || undefined,
      search: this.searchTerm() || undefined,
      only_available: true
    };

    this.inventoryService.getSummary(filters, { page, limit }).subscribe({
      next: (response) => {
        const items = response.data || [];
        const total = response.total || 0;

        this.summaryData.set(items);
        this.summaryTotalResultsState.set(total);
        this.summaryLoadingState.set(false);
      },
      error: (err) => {
        console.error('Error loading summary:', err);
        this.summaryLoadingState.set(false);
      }
    });
  }

  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (response) => this.warehouses.set(response.data || []),
      error: (err) => console.error('Error loading warehouses:', err)
    });
  }

  loadBatches(): void {
    this.loadingState.set(true);
    this.table_config.update(c => ({ ...c, loading: true }));

    const { page, limit } = this.paginationState();
    const filters: BatchFilters = {
      page,
      limit,
      warehouse_id: this.selectedWarehouse() || undefined,
      search: this.searchTerm() || undefined
    };

    this.inventoryBatchService.getBatches(filters).subscribe({
      next: (response) => {
        const batches = response.data || [];
        const total = response.total || 0;
        const hasNext = response.page < response.totalPages;

        this.batchesData.set(batches);
        this.totalResultsState.set(total);

        this.table_config.update(c => ({
          ...c,
          rows: batches,
          totalResults: total,
          page,
          hasNext,
          loading: false,
        }));

        this.loadingState.set(false);
      },
      error: (err) => {
        console.error('Error loading batches:', err);
        this.loadingState.set(false);
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
  }

  openBatchDetail(batch: InventoryBatch): void {
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId: batch.id },
      width: '920px',
      maxWidth: '95vw',
      maxHeight: '90vh',
    });
  }

  openPurchaseOrderDetail(batch: InventoryBatch, event: Event): void {
    event.stopPropagation();
    if (!batch.purchase_order_id) return;
    this.dialog.open(OrderDetailDialogComponent, {
      data: { orderId: batch.purchase_order_id },
      width: '1400px',
      maxWidth: '95vw',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'order-detail-dialog-container'
    });
  }

  onSearch(): void {
    this.paginationState.set({ ...this.paginationState(), page: 1 });
    this.summaryPaginationState.set({ ...this.summaryPaginationState(), page: 1 });
    if (this.activeTabIndex() === 0) {
      this.loadBatches();
    } else {
      this.loadSummary();
    }
  }

  onWarehouseChange(): void {
    this.paginationState.set({ ...this.paginationState(), page: 1 });
    this.summaryPaginationState.set({ ...this.summaryPaginationState(), page: 1 });
    if (this.activeTabIndex() === 0) {
      this.loadBatches();
    } else {
      this.loadSummary();
    }
  }

  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadBatches();
  }

  onSortChange(event: ISortEvent): void {
    console.log('Sort changed:', event);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const d = new Date(dateString);
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  getWarehouseTotalQuantity(warehouseId: string): number {
    return this.batchesData()
      .filter(b => b.warehouse_id === warehouseId)
      .reduce((sum, b) => {
        const qty = typeof b.quantity === 'string' ? parseFloat(b.quantity) : b.quantity;
        return sum + (isNaN(qty) ? 0 : qty);
      }, 0);
  }

  // Summary tab methods
  toggleBatches(item: any): void {
    const key = `${item.product_id}_${item.warehouse_id}`;
    const expanded = this.expandedItems();
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
    }
    this.expandedItems.set(new Set(expanded));
  }

  isExpanded(item: any): boolean {
    const key = `${item.product_id}_${item.warehouse_id}`;
    return this.expandedItems().has(key);
  }

  formatNumber(value: string | number | undefined): string {
    if (value === undefined || value === null) return '0';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '0';
    
    // Check if the number has decimals
    const hasDecimals = numValue % 1 !== 0;
    
    if (hasDecimals) {
      // Has decimals, show up to 3 decimal places (remove trailing zeros)
      return new Intl.NumberFormat('es-MX', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 3 
      }).format(numValue);
    } else {
      // No decimals, show as integer
      return new Intl.NumberFormat('es-MX', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
      }).format(numValue);
    }
  }

  onSummaryPageChange(page: number): void {
    this.summaryPaginationState.update(p => ({ ...p, page }));
    this.loadSummary();
  }

  get summaryItems() {
    return this.summaryData();
  }

  get summaryLoading() {
    return this.summaryLoadingState();
  }

  get summaryPage() {
    return this.summaryPaginationState().page;
  }

  get summaryLimit() {
    return this.summaryPaginationState().limit;
  }

  get summaryTotal() {
    return this.summaryTotalResultsState();
  }

  get summaryTotalPages() {
    return Math.ceil(this.summaryTotal / this.summaryLimit);
  }
}
