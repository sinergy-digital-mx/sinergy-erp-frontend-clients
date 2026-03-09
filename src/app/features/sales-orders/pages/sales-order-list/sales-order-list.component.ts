import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder, SalesOrderFilters, PaginationParams } from '../../models/sales-order.model';
import { SalesFilterBarComponent } from '../../components/sales-filter-bar/sales-filter-bar.component';
import { SalesTableComponent } from '../../components/sales-table/sales-table.component';

@Component({
  selector: 'app-sales-order-list',
  standalone: true,
  imports: [CommonModule, SalesFilterBarComponent, SalesTableComponent],
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent implements OnInit {
  // State signals
  private ordersData = signal<SalesOrder[]>([]);
  private filtersState = signal<SalesOrderFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 20 });
  private loadingState = signal<boolean>(false);
  private hasMoreState = signal<boolean>(true);
  
  // Public readonly signals
  orders = this.ordersData.asReadonly();
  filters = this.filtersState.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  
  // Computed: filtered orders
  filteredOrders = computed(() => {
    return this.ordersData();
  });

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
    
    this.salesOrderService
      .getOrders(this.filtersState(), this.paginationState())
      .subscribe({
        next: (response) => {
          console.log('Sales orders response:', response);
          if (Array.isArray(response)) {
            this.ordersData.set(response as any);
            this.hasMoreState.set(false);
          } else if (response.data) {
            this.ordersData.set(response.data);
            this.hasMoreState.set(response.hasNext);
          } else {
            console.error('Unknown response format:', response);
            this.ordersData.set([]);
            this.hasMoreState.set(false);
          }
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
        }
      });
  }

  /**
   * Apply filters
   */
  applyFilters(filters: SalesOrderFilters): void {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: 20 });
    this.loadOrders();
  }

  /**
   * Navigate to order detail
   */
  navigateToDetail(id: string): void {
    this.router.navigate(['/sales-orders', id]);
  }

  /**
   * Navigate to create order
   */
  navigateToCreate(): void {
    this.router.navigate(['/sales-orders/create']);
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
