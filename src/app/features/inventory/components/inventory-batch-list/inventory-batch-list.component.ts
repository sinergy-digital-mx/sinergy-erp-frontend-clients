import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InventoryBatchService, BatchFilters } from '../../services/inventory-batch.service';
import { InventoryService } from '../../services/inventory.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { InventorySummaryFilters, InventorySummaryItem } from '../../models/inventory-item.model';
import {
  InventoryLocationFilters,
  InventoryLocationFiscal,
} from '../../models/inventory-location.model';
import { InventoryStats } from '../../models/inventory-stats.model';
import { InventoryStatsCardsComponent } from '../inventory-stats-cards/inventory-stats-cards.component';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { AuthService } from '../../../../core/services/auth.service';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { CreateTransferDialogComponent } from '../create-transfer-dialog/create-transfer-dialog.component';
import { ChevronRight, ChevronDown, ArrowRightLeft } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import {
  InventoryExportDialogComponent,
  InventoryExportDialogResult,
} from '../inventory-export-dialog/inventory-export-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

@Component({
  selector: 'app-inventory-batch-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RemoveTrailingZerosPipe, DatatableWrapperComponent, LucideAngularModule, FilterClearButtonComponent, InventoryStatsCardsComponent],
  templateUrl: './inventory-batch-list.component.html',
  styleUrl: './inventory-batch-list.component.scss'
})
export class InventoryBatchListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;
  readonly ChevronRight = ChevronRight;
  readonly ChevronDown = ChevronDown;
  readonly ArrowRightLeft = ArrowRightLeft;

  activeTabIndex = signal<number>(0);

  // Filters
  searchTerm = signal<string>('');
  selectedFiscalId = signal<string>('');
  selectedBranchId = signal<string>('');
  selectedWarehouseId = signal<string>('');
  locations = signal<InventoryLocationFiscal[]>([]);
  stats = signal<InventoryStats | null>(null);
  statsLoading = signal(true);
  statsFailed = signal(false);

  selectedFiscal = computed(() =>
    this.locations().find((fiscal) => fiscal.id === this.selectedFiscalId()) ?? null
  );

  branchOptions = computed(() => this.selectedFiscal()?.branches ?? []);

  warehouseOptions = computed(() =>
    this.branchOptions().find((branch) => branch.id === this.selectedBranchId())?.warehouses ?? []
  );

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

  constructor(
    private inventoryBatchService: InventoryBatchService,
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  get canCreateTransfer(): boolean {
    return (
      this.authService.hasPermission(PERMISSIONS.inventory.write) ||
      this.authService.hasPermission(PERMISSIONS.inventory.transfer) ||
      this.authService.hasPermission(PERMISSIONS.inventory.create)
    );
  }

  ngOnInit() {
    this.loadLocations();
    this.loadStats();
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
    const filters: InventorySummaryFilters = {
      search: this.searchTerm() || undefined,
      only_available: true,
      ...this.locationFilters(),
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
        this.summaryLoadingState.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el inventario totalizado'));
      }
    });
  }

  loadLocations(): void {
    this.inventoryService.getLocations().subscribe({
      next: (locations) => this.locations.set(locations),
      error: (err) => {
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el catálogo de ubicaciones'));
      }
    });
  }

  loadStats(): void {
    this.statsLoading.set(true);
    this.statsFailed.set(false);

    this.inventoryService.getStats(this.locationFilters()).subscribe({
      next: (stats) => {
        this.stats.set(stats);
        this.statsLoading.set(false);
      },
      error: (err) => {
        this.stats.set(null);
        this.statsFailed.set(true);
        this.statsLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron cargar las estadísticas de inventario'));
      }
    });
  }

  loadBatches(): void {
    this.loadingState.set(true);
    this.table_config.update(c => ({ ...c, loading: true }));

    const { page, limit } = this.paginationState();
    const location = this.locationFilters();
    const filters: BatchFilters = {
      page,
      limit,
      search: this.searchTerm() || undefined,
      ...location,
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
        this.loadingState.set(false);
        this.table_config.update(c => ({ ...c, loading: false }));
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron cargar los lotes'));
      }
    });
  }

  openBatchDetail(batch: InventoryBatch): void {
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId: batch.id },
      width: 'min(1120px, 96vw)',
      maxWidth: '96vw',
      maxHeight: '90vh',
    });
  }

  openTransfer(item: InventorySummaryItem, event?: Event): void {
    event?.stopPropagation();
    this.dialog.open(CreateTransferDialogComponent, {
      data: {
        product_id: item.product_id,
        warehouse_id: item.warehouse_id,
        uom_id: item.uom_id,
      },
      width: 'min(1180px, 96vw)',
      maxWidth: '96vw',
      maxHeight: '92vh',
      panelClass: 'transfer-dialog-panel',
    }).afterClosed().subscribe((success) => {
      if (success) {
        this.loadStats();
        this.loadSummary();
        if (this.activeTabIndex() === 0) {
          this.loadBatches();
        }
      }
    });
  }

  openPurchaseOrderDetail(batch: InventoryBatch, event: Event): void {
    event.stopPropagation();
    if (!batch.purchase_order_id) return;
    this.dialog.open(OrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: batch.purchase_order_id }
    });
  }

  onSearch(): void {
    this.reloadInventory();
  }

  onFiscalChange(id: string): void {
    this.selectedFiscalId.set(id || '');
    this.selectedBranchId.set('');
    this.selectedWarehouseId.set('');
    this.reloadLocationScope();
  }

  onBranchChange(id: string): void {
    this.selectedBranchId.set(id || '');
    this.selectedWarehouseId.set('');
    this.reloadLocationScope();
  }

  onWarehouseChange(id: string): void {
    this.selectedWarehouseId.set(id || '');
    this.reloadLocationScope();
  }

  get hasActiveFilters(): boolean {
    return !!(this.searchTerm() || this.selectedFiscalId() || this.selectedBranchId() || this.selectedWarehouseId());
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedFiscalId.set('');
    this.selectedBranchId.set('');
    this.selectedWarehouseId.set('');
    this.reloadLocationScope();
  }

  locationLabel(value?: string | null): string {
    const trimmed = value?.trim();
    return trimmed ? trimmed : '—';
  }

  fiscalOptionLabel(fiscal: InventoryLocationFiscal): string {
    const name = fiscal.razon_social?.trim() || 'Sin razón social';
    const rfc = fiscal.rfc?.trim();
    return rfc ? `${name} (${rfc})` : name;
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

  /**
   * Recarga stats + listado al cambiar razón / sucursal / almacén.
   */
  private reloadLocationScope(): void {
    this.loadStats();
    this.reloadInventory();
  }

  /**
   * Recarga el listado activo desde página 1.
   */
  private reloadInventory(): void {
    this.paginationState.set({ ...this.paginationState(), page: 1 });
    this.summaryPaginationState.set({ ...this.summaryPaginationState(), page: 1 });
    if (this.activeTabIndex() === 0) {
      this.loadBatches();
    } else {
      this.loadSummary();
    }
  }

  /**
   * "Todas" = no enviar el param. Nunca sucursal sin razón ni almacén sin sucursal.
   */
  private locationFilters(): InventoryLocationFilters {
    const fiscalId = this.selectedFiscalId() || undefined;
    const branchId = fiscalId ? (this.selectedBranchId() || undefined) : undefined;
    const warehouseId = branchId ? (this.selectedWarehouseId() || undefined) : undefined;
    return {
      fiscal_configuration_id: fiscalId,
      billing_branch_id: branchId,
      warehouse_id: warehouseId,
    };
  }

  openExportModal(): void {
    const defaultType = this.activeTabIndex() === 1 ? 'summary' : 'batches';

    this.dialog
      .open(InventoryExportDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: false,
        data: {
          defaultType,
          search: this.searchTerm() || undefined,
          ...this.locationFilters(),
          only_available: defaultType === 'summary' ? true : undefined,
        },
      })
      .afterClosed()
      .subscribe((result: InventoryExportDialogResult | undefined) => {
        if (result?.downloaded) {
          this.toast.success('Reporte descargado');
        }
      });
  }
}
