import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryService } from '../../services/inventory.service';
import { WarehouseService } from '../../../purchase-orders/services/warehouse.service';
import { InventoryItem, InventoryFilters, PaginationParams } from '../../models/inventory-item.model';
import { Warehouse } from '../../../purchase-orders/models/warehouse.model';
import { InventoryFilterBarComponent } from '../../components/inventory-filter-bar/inventory-filter-bar.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AdjustmentDialogComponent, AdjustmentFormData } from '../../components/adjustment-dialog/adjustment-dialog.component';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, InventoryFilterBarComponent, DatatableWrapperComponent],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;

  // State signals
  private itemsData = signal<InventoryItem[]>([]);
  private filtersState = signal<InventoryFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 15 });
  private loadingState = signal<boolean>(false);
  private totalResultsState = signal<number>(0);
  private hasMoreState = signal<boolean>(true);
  
  // Table configuration
  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Producto', prop: 'product', sortable: true, canAutoResize: false, width: 120 },
      { name: 'SKU', prop: 'sku', sortable: true, canAutoResize: false, width: 80 },
      { name: 'Almacén', prop: 'warehouse', sortable: false, canAutoResize: false, width: 100 },
      { name: 'En Mano', prop: 'quantity_on_hand', sortable: true, canAutoResize: false, width: 90 },
      { name: 'Reservado', prop: 'quantity_reserved', sortable: false, canAutoResize: false, width: 90 },
      { name: 'Disponible', prop: 'quantity_available', sortable: true, canAutoResize: false, width: 90 },
      { name: 'Ubicación', prop: 'location', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Costo Unit.', prop: 'unit_cost', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Valor Total', prop: 'total_value', sortable: true, canAutoResize: false, width: 100 },
      { name: '', prop: 'actions', sortable: false, canAutoResize: false, width: 45 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron artículos de inventario' },
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
  
  // Computed: summary statistics
  totalValue = computed(() => {
    return this.itemsData().reduce((sum, item) => sum + (item.total_value || 0), 0);
  });

  totalItems = computed(() => {
    return this.itemsData().reduce((sum, item) => sum + (item.quantity_on_hand || 0), 0);
  });

  lowStockCount = computed(() => {
    return this.itemsData().filter(item => item.quantity_available < 10).length;
  });

  constructor(
    private inventoryService: InventoryService,
    private warehouseService: WarehouseService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadWarehouses();
  }

  /**
   * Load inventory items from API
   */
  loadItems(): void {
    this.loadingState.set(true);
    this.table_config.update(c => ({ ...c, loading: true }));
    
    this.inventoryService
      .getItems(this.filtersState(), this.paginationState())
      .subscribe({
        next: (response) => {
          console.log('Inventory items response:', response);
          let items: InventoryItem[] = [];
          let total = 0;
          let hasNext = false;

          if (Array.isArray(response)) {
            items = response as any;
            total = items.length;
            hasNext = false;
          } else if (response.data) {
            items = response.data;
            total = response.total || response.data.length;
            hasNext = response.page < response.totalPages;
          } else {
            console.error('Unknown response format:', response);
          }

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
          console.error('Error loading inventory items:', error);
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
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
      }
    });
  }

  /**
   * Apply filters
   */
  applyFilters(filters: InventoryFilters): void {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: 15 });
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
  formatNumber(value: number | undefined): string {
    if (value === undefined || value === null) return '0';
    return new Intl.NumberFormat('es-MX').format(value);
  }

  /**
   * Check if item has low stock
   */
  isLowStock(item: InventoryItem): boolean {
    return item.quantity_available < 10;
  }

  /**
   * Navigate to item detail
   */
  navigateToDetail(item: InventoryItem): void {
    this.router.navigate(['/inventory', item.id]);
  }

  /**
   * Open adjustment dialog
   */
  openAdjustmentDialog(): void {
    const dialogRef = this.dialog.open(AdjustmentDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: AdjustmentFormData | null) => {
      if (result) {
        this.createAdjustment(result);
      }
    });
  }

  /**
   * Create inventory adjustment
   */
  private createAdjustment(data: AdjustmentFormData): void {
    this.loadingState.set(true);

    this.inventoryService.createAdjustment(data).subscribe({
      next: (movement) => {
        console.log('Adjustment created:', movement);
        this.snackBar.open('Ajuste aplicado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loadItems();
      },
      error: (error) => {
        console.error('Error creating adjustment:', error);
        this.snackBar.open(
          error.message || 'Error al aplicar el ajuste',
          'Cerrar',
          {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          }
        );
        this.loadingState.set(false);
      }
    });
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
