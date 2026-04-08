import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { InventoryBatchService, BatchFilters } from '../../services/inventory-batch.service';
import { InventoryBatch } from '../../models/inventory-batch.model';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';

@Component({
  selector: 'app-inventory-batch-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule, RemoveTrailingZerosPipe],
  templateUrl: './inventory-batch-list.component.html',
  styleUrl: './inventory-batch-list.component.scss'
})
export class InventoryBatchListComponent implements OnInit {
  batches = signal<InventoryBatch[]>([]);
  loading = signal<boolean>(false);
  activeTabIndex = signal<number>(0);
  
  // Filters
  searchTerm = signal<string>('');
  selectedWarehouse = signal<string>('');
  warehouses = signal<Warehouse[]>([]);
  
  // Pagination
  page = signal<number>(1);
  limit = signal<number>(20);
  total = signal<number>(0);
  pages = signal<number>(0);

  // Computed totals for "Totalizado" tab
  totalQuantity = computed(() => {
    return this.batches().reduce((sum, batch) => {
      const qty = typeof batch.quantity === 'string' ? parseFloat(batch.quantity) : batch.quantity;
      return sum + (isNaN(qty) ? 0 : qty);
    }, 0);
  });

  // Computed warehouse totals
  warehouseTotals = computed(() => {
    const totals: { [key: string]: number } = {};
    this.warehouses().forEach(w => {
      totals[w.id] = this.getWarehouseTotalQuantity(w.id);
    });
    return totals;
  });

  // Computed warehouses with data
  warehousesWithData = computed(() => {
    return this.warehouses().filter(w => this.warehouseTotals()[w.id] > 0);
  });

  constructor(
    private inventoryBatchService: InventoryBatchService,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit() {
    this.loadWarehouses();
    this.loadBatches();
  }

  /**
   * Load warehouses for filter
   */
  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (response) => {
        this.warehouses.set(response.data || []);
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
      }
    });
  }

  /**
   * Load batches from API with filters
   */
  loadBatches(): void {
    this.loading.set(true);
    
    const filters: BatchFilters = {
      page: this.page(),
      limit: this.limit(),
      warehouse_id: this.selectedWarehouse() || undefined,
      batch_number: this.searchTerm() || undefined
    };

    this.inventoryBatchService.getBatches(filters).subscribe({
      next: (response) => {
        this.batches.set(response.data);
        this.total.set(response.total || response.pagination?.total || 0);
        this.pages.set(response.totalPages || response.pagination?.pages || 0);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading batches:', error);
        this.loading.set(false);
      }
    });
  }

  /**
   * Handle search
   */
  onSearch(): void {
    this.page.set(1);
    this.loadBatches();
  }

  /**
   * Handle warehouse filter change
   */
  onWarehouseChange(): void {
    this.page.set(1);
    this.loadBatches();
  }

  /**
   * Clear filters
   */
  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedWarehouse.set('');
    this.page.set(1);
    this.loadBatches();
  }

  /**
   * Handle pagination change
   */
  onPageChange(event: PageEvent): void {
    this.page.set(event.pageIndex + 1);
    this.limit.set(event.pageSize);
    this.loadBatches();
  }

  /**
   * Format date
   */
  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Format quantity
   */
  formatQuantity(quantity: number, uomName: string): string {
    return `${quantity} ${uomName || ''}`;
  }

  /**
   * Get warehouse name by ID
   */
  getWarehouseName(warehouseId: string): string {
    const warehouse = this.warehouses().find(w => w.id === warehouseId);
    return warehouse?.name || 'N/A';
  }

  /**
   * Get total quantity for a warehouse
   */
  getWarehouseTotalQuantity(warehouseId: string): number {
    return this.batches()
      .filter(b => b.warehouse_id === warehouseId)
      .reduce((sum, b) => {
        const qty = typeof b.quantity === 'string' ? parseFloat(b.quantity) : b.quantity;
        return sum + (isNaN(qty) ? 0 : qty);
      }, 0);
  }
}
