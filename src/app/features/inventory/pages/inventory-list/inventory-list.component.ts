import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryService } from '../../services/inventory.service';
import { WarehouseService } from '../../../purchase-orders/services/warehouse.service';
import { InventoryItem, InventoryFilters, PaginationParams } from '../../models/inventory-item.model';
import { Warehouse } from '../../../purchase-orders/models/warehouse.model';
import { InventoryFilterBarComponent } from '../../components/inventory-filter-bar/inventory-filter-bar.component';
import { InventoryTableComponent } from '../../components/inventory-table/inventory-table.component';
import { AdjustmentDialogComponent, AdjustmentFormData } from '../../components/adjustment-dialog/adjustment-dialog.component';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, InventoryFilterBarComponent, InventoryTableComponent],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {
  // State signals
  private itemsData = signal<InventoryItem[]>([]);
  private filtersState = signal<InventoryFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 50 });
  private loadingState = signal<boolean>(false);
  private hasMoreState = signal<boolean>(true);
  
  // Public readonly signals
  items = this.itemsData.asReadonly();
  filters = this.filtersState.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  
  // Warehouses for filters
  warehouses = signal<Warehouse[]>([]);
  
  // Computed: filtered items (client-side filtering for demo)
  filteredItems = computed(() => {
    const items = this.itemsData();
    const filters = this.filtersState();
    
    if (!filters.search && !filters.warehouse_id && !filters.low_stock) {
      return items;
    }
    
    return items.filter(item => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          item.product?.name?.toLowerCase().includes(searchLower) ||
          item.product?.sku?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      if (filters.warehouse_id && item.warehouse_id !== filters.warehouse_id) {
        return false;
      }
      
      if (filters.low_stock && item.quantity_available >= 10) {
        return false;
      }
      
      return true;
    });
  });

  // Computed: summary statistics
  totalValue = computed(() => {
    return this.filteredItems().reduce((sum, item) => sum + (item.total_value || 0), 0);
  });

  totalItems = computed(() => {
    return this.filteredItems().reduce((sum, item) => sum + (item.quantity_on_hand || 0), 0);
  });

  lowStockCount = computed(() => {
    return this.filteredItems().filter(item => item.quantity_available < 10).length;
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
    
    this.inventoryService
      .getItems(this.filtersState(), this.paginationState())
      .subscribe({
        next: (response) => {
          console.log('Inventory items response:', response);
          // Handle both paginated and non-paginated responses
          if (Array.isArray(response)) {
            this.itemsData.set(response as any);
            this.hasMoreState.set(false);
          } else if (response.data) {
            this.itemsData.set(response.data);
            this.hasMoreState.set(response.page < response.totalPages);
          } else {
            console.error('Unknown response format:', response);
            this.itemsData.set([]);
            this.hasMoreState.set(false);
          }
          this.loadingState.set(false);
        },
        error: (error) => {
          console.error('Error loading inventory items:', error);
          this.loadingState.set(false);
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
    this.paginationState.set({ page: 1, limit: 50 });
    this.loadItems();
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

  /**
   * Navigate to item detail
   */
  navigateToDetail(id: string): void {
    this.router.navigate(['/inventory', id]);
  }

  /**
   * Format currency
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  }

  /**
   * Format number
   */
  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-MX').format(value);
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
        // Reload items to reflect the adjustment
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
}
