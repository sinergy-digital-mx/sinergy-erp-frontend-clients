import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { WarehouseService } from '../../../../features/settings/services/warehouse.service';
import { PurchaseOrder, OrderStatus, PaymentStatus } from '../../models/purchase-order.model';
import { OrderFilters, PaginationParams } from '../../models/filters.model';
import { Warehouse } from '../../../../features/settings/models/warehouse.model';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { OrderDetailDialogComponent } from '../../components/order-detail-dialog/order-detail-dialog.component';
import { CreatePurchaseOrderModalComponent } from '../../components/create-purchase-order-modal/create-purchase-order-modal.component';
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
      { name: 'Folio', prop: 'folio', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Proveedor', prop: 'vendor', sortable: true, canAutoResize: false, width: 150 },
      { name: 'Cedis', prop: 'warehouse', sortable: false, canAutoResize: false, width: 150 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Total', prop: 'requested_total', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 160 },
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
    return this.ordersData().reduce((sum, order) => sum + this.getOrderTotal(order), 0);
  });
  
  // Status stats
  creadasCount = computed(() => this.ordersData().filter(o => o.general_status === 'Creada').length);
  recibidasCount = computed(() => this.ordersData().filter(o => o.general_status === 'Recibida').length);
  canceladasCount = computed(() => this.ordersData().filter(o => o.general_status === 'Cancelada').length);
  
  creadasAmount = computed(() => 
    this.ordersData()
      .filter(o => o.general_status === 'Creada')
      .reduce((sum, order) => sum + this.getOrderTotal(order), 0)
  );
  recibidasAmount = computed(() => 
    this.ordersData()
      .filter(o => o.general_status === 'Recibida')
      .reduce((sum, order) => sum + this.getOrderTotal(order), 0)
  );
  canceladasAmount = computed(() => 
    this.ordersData()
      .filter(o => o.general_status === 'Cancelada')
      .reduce((sum, order) => sum + this.getOrderTotal(order), 0)
  );
  
  // Payment stats
  pagadasCount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pagada').length);
  parcialesCount = computed(() => this.ordersData().filter(o => o.payment_status === 'Parcial').length);
  pendientesCount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pendiente').length);
  
  pagadasAmount = computed(() => 
    this.ordersData()
      .filter(o => o.payment_status === 'Pagada')
      .reduce((sum, order) => sum + this.getOrderTotal(order), 0)
  );
  parcialesAmount = computed(() => 
    this.ordersData()
      .filter(o => o.payment_status === 'Parcial')
      .reduce((sum, order) => sum + this.getOrderTotal(order), 0)
  );
  pendientesAmount = computed(() => 
    this.ordersData()
      .filter(o => o.payment_status === 'Pendiente')
      .reduce((sum, order) => sum + this.getOrderTotal(order), 0)
  );
  
  // Percentages for progress bars
  creadasPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? (this.creadasCount() / total) * 100 : 0;
  });
  recibidasPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? (this.recibidasCount() / total) * 100 : 0;
  });
  canceladasPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? (this.canceladasCount() / total) * 100 : 0;
  });
  
  pagadasPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? (this.pagadasCount() / total) * 100 : 0;
  });
  parcialesPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? (this.parcialesCount() / total) * 100 : 0;
  });
  pendientesPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? (this.pendientesCount() / total) * 100 : 0;
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
      case 'Creada':
        return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700';
      case 'Recibida':
        return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700';
      case 'Cancelada':
        return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700';
      default:
        return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700';
    }
  }

  /**
   * Get payment status badge class
   */
  getPaymentStatusClass(paymentStatus: PaymentStatus): string {
    switch (paymentStatus) {
      case 'Pagada':
        return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700';
      case 'Parcial':
        return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700';
      case 'Pendiente':
        return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700';
      default:
        return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700';
    }
  }

  /**
   * Format currency amount
   */
  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }

  /**
   * Format date to human readable format (e.g., "Marzo 20 3:33 PM")
   */
  formatDateHuman(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const hours = d.getHours() % 12 || 12;
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    return `${month} ${day} ${hours}:${minutes} ${ampm}`;
  }

  /**
   * Get total amount from order
   */
  getOrderTotal(order: PurchaseOrder): number {
    return parseFloat(order.requested_total || '0') || 0;
  }

  /**
   * Navigate to order detail
   */
  navigateToDetail(order: PurchaseOrder): void {
    this.dialog.open(OrderDetailDialogComponent, {
      data: { orderId: order.id },
      width: '1400px',
      maxWidth: '95vw',
      height: '90vh',
      maxHeight: '90vh',
      panelClass: 'order-detail-dialog-container'
    });
  }

  /**
   * Navigate to create order
   */
  navigateToCreate(): void {
    this.dialog.open(CreatePurchaseOrderModalComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'create-purchase-order-modal'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
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
