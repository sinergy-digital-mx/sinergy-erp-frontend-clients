import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { WarehouseService } from '../../services/warehouse.service';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { OrderFilters, PaginationParams } from '../../models/filters.model';
import { Warehouse } from '../../models/warehouse.model';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { OrderDetailDialogComponent } from '../../components/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-purchase-order-list',
  standalone: true,
  imports: [CommonModule, DashboardComponent, FilterBarComponent, OrdersTableComponent],
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {
  // State signals
  private ordersData = signal<PurchaseOrder[]>([]);
  private filtersState = signal<OrderFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 20 });
  private loadingState = signal<boolean>(false);
  private hasMoreState = signal<boolean>(true);
  
  // Public readonly signals
  orders = this.ordersData.asReadonly();
  filters = this.filtersState.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  
  // Warehouses for filters
  warehouses = signal<Warehouse[]>([]);
  
  // Computed: filtered orders (client-side filtering for demo)
  filteredOrders = computed(() => {
    const orders = this.ordersData();
    const filters = this.filtersState();
    
    if (!filters.search && !filters.status && !filters.warehouseId) {
      return orders;
    }
    
    return orders.filter(order => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          order.id.toLowerCase().includes(searchLower) ||
          order.purpose.toLowerCase().includes(searchLower) ||
          order.vendor?.name?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      if (filters.status && order.status !== filters.status) {
        return false;
      }
      
      if (filters.warehouseId && order.warehouse_id !== filters.warehouseId) {
        return false;
      }
      
      return true;
    });
  });

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private warehouseService: WarehouseService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadWarehouses();
  }

  /**
   * Load orders from API
   */
  loadOrders(): void {
    this.loadingState.set(true);
    
    this.purchaseOrderService
      .getOrders(this.filtersState(), this.paginationState())
      .subscribe({
        next: (response) => {
          console.log('Orders response:', response);
          // Handle both paginated and non-paginated responses
          if (Array.isArray(response)) {
            // Direct array response
            this.ordersData.set(response as any);
            this.hasMoreState.set(false);
          } else if (response.data) {
            // Paginated response
            this.ordersData.set(response.data);
            this.hasMoreState.set(response.page < response.totalPages);
          } else {
            // Unknown format
            console.error('Unknown response format:', response);
            this.ordersData.set([]);
            this.hasMoreState.set(false);
          }
          this.loadingState.set(false);
        },
        error: (error) => {
          console.error('Error loading orders:', error);
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
        // Handle both array and {data: array} formats
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
  applyFilters(filters: OrderFilters): void {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: 20 });
    this.loadOrders();
  }

  /**
   * Load more orders (infinite scroll)
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
    
    this.loadOrders();
  }

  /**
   * Navigate to order detail
   */
  navigateToDetail(id: string): void {
    this.dialog.open(OrderDetailDialogComponent, {
      data: { orderId: id },
      width: '1200px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'order-detail-dialog-container'
    });
  }

  /**
   * Navigate to create order
   */
  navigateToCreate(): void {
    this.router.navigate(['/purchase-orders/create']);
  }
}
