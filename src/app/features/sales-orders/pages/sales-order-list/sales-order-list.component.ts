import { Component, OnInit, signal, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder, PaginationParams } from '../../models/sales-order.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';

@Component({
  selector: 'app-sales-order-list',
  standalone: true,
  imports: [CommonModule, DatatableWrapperComponent],
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;

  // State signals
  private ordersData = signal<SalesOrder[]>([]);
  private paginationState = signal<PaginationParams>({ page: 1, limit: 15 });
  private loadingState = signal<boolean>(false);
  private totalResultsState = signal<number>(0);
  private hasMoreState = signal<boolean>(true);
  
  // Table configuration
  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'ID', prop: 'id', sortable: true, canAutoResize: false, width: 80 },
      { name: 'Cliente', prop: 'customer', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Almacén', prop: 'warehouse', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Fecha Entrega', prop: 'delivery_date', sortable: true, canAutoResize: false, width: 110 },
      { name: 'Total', prop: 'grand_total', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Fecha Creación', prop: 'created_at', sortable: true, canAutoResize: false, width: 110 },
      { name: '', prop: 'actions', sortable: false, canAutoResize: false, width: 45 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron órdenes de venta' },
    columnMode: 'force',
    reorderable: false,
  });
  
  // Public readonly signals
  orders = this.ordersData.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  
  statuses = [
    { value: 'draft', label: 'Borrador' },
    { value: 'confirmed', label: 'Confirmada' },
    { value: 'processing', label: 'En Proceso' },
    { value: 'completed', label: 'Completada' },
    { value: 'cancelled', label: 'Cancelada' }
  ];

  constructor(
    private salesOrderService: SalesOrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  /**
   * Load orders from API
   */
  loadOrders(): void {
    this.loadingState.set(true);
    this.table_config.update(c => ({ ...c, loading: true }));
    
    this.salesOrderService
      .getOrders({}, this.paginationState())
      .subscribe({
        next: (response) => {
          console.log('Sales orders response:', response);
          let orders: SalesOrder[] = [];
          let total = 0;
          let hasNext = false;

          if (Array.isArray(response)) {
            orders = response as any;
            total = orders.length;
            hasNext = false;
          } else if (response.data) {
            orders = response.data;
            total = response.total || response.data.length;
            hasNext = response.hasNext || false;
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
          console.error('Error loading sales orders:', error);
          this.snackBar.open(
            error.message || 'Error al cargar órdenes de venta',
            'Cerrar',
            { duration: 5000 }
          );
          this.loadingState.set(false);
          this.table_config.update(c => ({ ...c, loading: false }));
        }
      });
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
    // Implement sort logic if needed
  }

  /**
   * Navigate to order detail
   */
  navigateToDetail(row: SalesOrder): void {
    this.router.navigate(['/sales-orders', row.id]);
  }

  /**
   * Navigate to create order
   */
  navigateToCreate(): void {
    this.router.navigate(['/sales-orders/create']);
  }

  /**
   * Get status class for badge
   */
  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'draft': 'status-draft',
      'confirmed': 'status-confirmed',
      'processing': 'status-processing',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || '';
  }

  /**
   * Get status label
   */
  getStatusLabel(status: string): string {
    const statusObj = this.statuses.find(s => s.value === status);
    return statusObj?.label || status;
  }

  /**
   * Format currency
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }

  /**
   * Handle status change
   */
  handleStatusChange(event: { id: string; status: string }): void {
    this.salesOrderService.updateOrder(event.id, { status: event.status as any }).subscribe({
      next: () => {
        this.snackBar.open('Estado actualizado exitosamente', 'Cerrar', {
          duration: 3000
        });
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error updating status:', error);
        this.snackBar.open(
          error.message || 'Error al actualizar estado',
          'Cerrar',
          { duration: 5000 }
        );
      }
    });
  }

  /**
   * Handle delete order
   */
  handleDeleteOrder(id: string): void {
    this.salesOrderService.deleteOrder(id).subscribe({
      next: () => {
        this.snackBar.open('Orden eliminada exitosamente', 'Cerrar', {
          duration: 3000
        });
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error deleting order:', error);
        this.snackBar.open(
          error.message || 'Error al eliminar orden',
          'Cerrar',
          { duration: 5000 }
        );
      }
    });
  }
}
