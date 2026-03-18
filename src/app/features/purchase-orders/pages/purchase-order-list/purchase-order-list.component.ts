import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { WarehouseService } from '../../services/warehouse.service';
import { PurchaseOrder, OrderStatus, PaymentStatus } from '../../models/purchase-order.model';
import { OrderFilters, PaginationParams } from '../../models/filters.model';
import { Warehouse } from '../../models/warehouse.model';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { OrderDetailDialogComponent } from '../../components/order-detail-dialog/order-detail-dialog.component';
import { TaxCalculatorService } from '../../services/tax-calculator.service';

@Component({
  selector: 'app-purchase-order-list',
  standalone: true,
  imports: [CommonModule, FilterBarComponent, DatatableWrapperComponent],
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;

  // State signals
  private ordersData = signal<PurchaseOrder[]>([]);
  private filtersState = signal<OrderFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 15 });
  private loadingState = signal<boolean>(false);
  private totalResultsState = signal<number>(0);
  private hasMoreState = signal<boolean>(true);
  
  // Table configuration
  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Tipo', prop: 'purpose', sortable: false, canAutoResize: false, width: 80 },
      { name: 'Proveedor', prop: 'vendor', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Cedis', prop: 'warehouse', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Total', prop: 'grand_total', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 100 },
      { name: '', prop: 'actions', sortable: false, canAutoResize: false, width: 45 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron órdenes de compra' },
    columnMode: 'force',
    reorderable: false,
  });
  
  // Public readonly signals
  orders = this.ordersData.asReadonly();
  filters = this.filtersState.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  
  // Warehouses for filters
  warehouses = signal<Warehouse[]>([]);
  
  // Computed: stats
  totalOrders = computed(() => this.totalResultsState());
  totalAmount = computed(() => {
    return this.ordersData().reduce((sum, order) => sum + (order.grand_total || 0), 0);
  });
  paidAmount = computed(() => {
    return this.ordersData()
      .filter(order => order.payment_status === 'Pagada')
      .reduce((sum, order) => sum + (order.grand_total || 0), 0);
  });

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private warehouseService: WarehouseService,
    private router: Router,
    private dialog: MatDialog,
    private taxCalculator: TaxCalculatorService
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
    this.table_config.update(c => ({ ...c, loading: true }));
    
    this.purchaseOrderService
      .getOrders(this.filtersState(), this.paginationState())
      .subscribe({
        next: (response) => {
          console.log('Orders response:', response);
          let orders: PurchaseOrder[] = [];
          let total = 0;
          let hasNext = false;

          if (Array.isArray(response)) {
            orders = response as any;
            total = orders.length;
            hasNext = false;
          } else if (response.data) {
            orders = response.data;
            total = response.total || response.data.length;
            hasNext = response.page < response.totalPages;
          } else {
            console.error('Unknown response format:', response);
          }

          this.ordersData.set(orders);
          this.totalResultsState.set(total);
          this.hasMoreState.set(hasNext);
          
          this.table_config.update(c => ({
            ...c,
            rows: orders,
            totalResults: total,
            hasNext: hasNext,
            loading: false,
          }));
          
          this.loadingState.set(false);
        },
        error: (error) => {
          console.error('Error loading orders:', error);
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
  applyFilters(filters: OrderFilters): void {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: 15 });
    this.loadOrders();
  }

  /**
   * Handle pagination change
   */
  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadOrders();
  }

  /**
   * Handle sort change
   */
  onSortChange(event: ISortEvent): void {
    console.log('Sort changed:', event);
  }

  /**
   * Get status badge class
   */
  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case 'En Proceso':
        return 'status-badge status-badge--en-proceso';
      case 'Recibida':
        return 'status-badge status-badge--recibida';
      case 'Cancelada':
        return 'status-badge status-badge--cancelada';
      default:
        return 'status-badge';
    }
  }

  /**
   * Get payment status badge class
   */
  getPaymentStatusClass(paymentStatus: PaymentStatus): string {
    switch (paymentStatus) {
      case 'Pagada':
        return 'payment-badge payment-badge--pagada';
      case 'Parcial':
        return 'payment-badge payment-badge--parcial';
      case 'No pagado':
        return 'payment-badge payment-badge--no-pagado';
      default:
        return 'payment-badge';
    }
  }

  /**
   * Format currency amount
   */
  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }

  /**
   * Navigate to order detail
   */
  navigateToDetail(order: PurchaseOrder): void {
    this.dialog.open(OrderDetailDialogComponent, {
      data: { orderId: order.id },
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
}
