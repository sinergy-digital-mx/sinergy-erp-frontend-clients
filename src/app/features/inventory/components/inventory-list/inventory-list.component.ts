import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { WarehouseService } from '../../../purchase-orders/services/warehouse.service';
import { InventorySummaryItem, InventorySummaryFilters, PaginationParams } from '../../models/inventory-item.model';
import { Warehouse } from '../../../purchase-orders/models/warehouse.model';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;

  // State signals
  private itemsData = signal<InventorySummaryItem[]>([]);
  private filtersState = signal<InventorySummaryFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 20 });
  private loadingState = signal<boolean>(false);
  private totalResultsState = signal<number>(0);
  private hasMoreState = signal<boolean>(true);
  
  // Table configuration
  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Producto', prop: 'product_name', sortable: true, canAutoResize: false, width: 150 },
      { name: 'SKU', prop: 'product_sku', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Almacén', prop: 'warehouse_name', sortable: false, canAutoResize: false, width: 120 },
      { name: 'UOM', prop: 'uom_name', sortable: false, canAutoResize: false, width: 80 },
      { name: 'Disponible', prop: 'total_available_quantity', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Inicial', prop: 'total_initial_quantity', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Lotes', prop: 'total_batches', sortable: false, canAutoResize: false, width: 80 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron productos en inventario' },
    columnMode: 'force',
    reorderable: false,
  });
  
  // Public readonly signals
  items = this.itemsData.asReadonly();
  filters = this.filtersState.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  
  // Warehouses for filters
  warehouses = signal<Warehouse[]>([]);
  selectedWarehouse = signal<string | null>(null);
  expandedItems = signal<Set<string>>(new Set());

  constructor(
    private inventoryService: InventoryService,
    private warehouseService: WarehouseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route params to get warehouse_id
    this.route.queryParams.subscribe(params => {
      const warehouseId = params['warehouse_id'];
      if (warehouseId) {
        this.selectedWarehouse.set(warehouseId);
        this.filtersState.update(f => ({ ...f, warehouse_id: warehouseId }));
        this.loadItems();
      }
    });
    
    this.loadWarehouses();
  }

  /**
   * Load inventory summary from API
   */
  loadItems(): void {
    this.loadingState.set(true);
    this.table_config.update(c => ({ ...c, loading: true }));
    
    this.inventoryService
      .getSummary(this.filtersState(), this.paginationState())
      .subscribe({
        next: (response) => {
          console.log('Inventory summary response:', response);
          const items = response.data || [];
          const total = response.total || 0;
          const hasNext = response.page < response.totalPages;

          this.itemsData.set(items);
          this.totalResultsState.set(total);
          this.hasMoreState.set(hasNext);
          
          this.table_config.update(c => ({
            ...c,
            rows: items,
            totalResults: total,
            hasNext: hasNext,
            loading: false,
          }));
          
          this.loadingState.set(false);
        },
        error: (error) => {
          console.error('Error loading inventory summary:', error);
          this.loadingState.set(false);
          this.table_config.update(c => ({ ...c, loading: false }));
        }
      });
  }

  /**
   * Load warehouses for filter dropdown
   */
  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        console.log('Warehouses response:', warehouses);
        const warehouseArray = Array.isArray(warehouses) ? warehouses : (warehouses as any).data || [];
        this.warehouses.set(warehouseArray);
        
        // Set first warehouse as default if no warehouse is selected
        if (warehouseArray.length > 0 && !this.selectedWarehouse()) {
          const firstWarehouse = warehouseArray[0];
          this.selectedWarehouse.set(firstWarehouse.id);
          this.onWarehouseChange(firstWarehouse.id);
        }
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
      }
    });
  }

  /**
   * Handle warehouse change
   */
  onWarehouseChange(warehouseId: string): void {
    this.selectedWarehouse.set(warehouseId);
    this.filtersState.update(f => ({ ...f, warehouse_id: warehouseId }));
    this.paginationState.set({ page: 1, limit: 20 });
    
    // Update URL with warehouse_id
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { warehouse_id: warehouseId },
      queryParamsHandling: 'merge'
    });
    
    this.loadItems();
  }

  /**
   * Apply filters
   */
  applyFilters(filters: InventorySummaryFilters): void {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: 20 });
    this.loadItems();
  }

  /**
   * Handle pagination change
   */
  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadItems();
  }

  /**
   * Handle sort change
   */
  onSortChange(event: ISortEvent): void {
    console.log('Sort changed:', event);
  }

  /**
   * Format currency
   */
  formatCurrency(value: number | string | undefined): string {
    if (value === undefined || value === null) return '$0.00';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '$0.00';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(numValue);
  }

  /**
   * Format number
   */
  formatNumber(value: string | number | undefined): string {
    if (value === undefined || value === null) return '0';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '0';
    return new Intl.NumberFormat('es-MX', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(numValue);
  }

  /**
   * Toggle batches expansion
   */
  toggleBatches(item: InventorySummaryItem): void {
    const key = `${item.product_id}_${item.warehouse_id}`;
    const expanded = this.expandedItems();
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
    }
    this.expandedItems.set(new Set(expanded));
  }

  /**
   * Check if item is expanded
   */
  isExpanded(item: InventorySummaryItem): boolean {
    const key = `${item.product_id}_${item.warehouse_id}`;
    return this.expandedItems().has(key);
  }

  /**
   * Handle search change
   */
  onSearchChange(event: Event): void {
    const search = (event.target as HTMLInputElement).value;
    this.filtersState.update(f => ({ ...f, search }));
    this.paginationState.set({ page: 1, limit: 20 });
    this.loadItems();
  }

  /**
   * Navigate to item detail
   */
  navigateToDetail(item: InventorySummaryItem): void {
    // Navigate to product detail or batch list
    console.log('Navigate to detail:', item);
  }

  /**
   * Load more items (infinite scroll)
   */
  loadMore(): void {
    if (!this.hasMoreState() || this.loadingState()) {
      return;
    }
    
    const currentPagination = this.paginationState();
    this.paginationState.set({
      ...currentPagination,
      page: currentPagination.page + 1
    });
    
    this.loadItems();
  }
}
