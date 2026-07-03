import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { SalesOrder, SalesOrderFilters, PaginationParams } from '../../../sales-orders/models/sales-order.model';
import { getSalesOrderTotal } from '../../../sales-orders/utils/sales-order-display.util';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { CreateSalesOrderModalComponent } from '../../../sales-orders/components/create-sales-order-modal/create-sales-order-modal.component';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { Plus } from 'lucide-angular';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';

@Component({
  selector: 'app-customer-sales-orders',
  standalone: true,
  imports: [CommonModule, ButtonComponent, HasPermissionDirective],
  templateUrl: './customer-sales-orders.component.html',
  styleUrl: './customer-sales-orders.component.scss'
})
export class CustomerSalesOrdersComponent implements OnInit {
  @Input({ required: true }) customerId!: number | string;

  orders = signal<SalesOrder[]>([]);
  loading = signal(false);
  total = signal(0);
  page = signal(1);
  readonly pageSize = 15;

  readonly PlusIcon = Plus;
  /** Variantes que usa RBAC en distintos tenants */
  readonly createSalesOrderPermissions = [
    PERMISSIONS.salesOrders.create,
    'salesOrders:Create'
  ];

  constructor(
    private salesOrderService: SalesOrderService,
    private taxCalculator: TaxCalculatorService,
    private dialog: MatDialog,
    private interceptorService: InterceptorService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(page = 1): void {
    this.loading.set(true);
    this.page.set(page);

    const filters: SalesOrderFilters = { customer_id: this.customerId };
    const pagination: PaginationParams = { page, limit: this.pageSize };

    this.salesOrderService.getOrders(filters, pagination).subscribe({
      next: (response) => {
        this.orders.set(response.data || []);
        this.total.set(response.total || 0);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar las órdenes de venta'
        });
      }
    });
  }

  openOrderDetail(order: SalesOrder): void {
    this.dialog
      .open(SalesOrderDetailDialogComponent, {
        ...ORDER_DETAIL_DIALOG_OPTIONS,
        data: { orderId: order.id }
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.loadOrders(this.page());
        }
      });
  }

  openCreateModal(): void {
    this.dialog
      .open(CreateSalesOrderModalComponent, {
        width: '900px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        panelClass: 'create-purchase-order-modal',
        data: { customerId: this.customerId }
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.loadOrders(1);
        }
      });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total() / this.pageSize));
  }

  get hasPrevPage(): boolean {
    return this.page() > 1;
  }

  get hasNextPage(): boolean {
    return this.page() < this.totalPages;
  }

  goToPrevPage(): void {
    if (this.hasPrevPage) {
      this.loadOrders(this.page() - 1);
    }
  }

  goToNextPage(): void {
    if (this.hasNextPage) {
      this.loadOrders(this.page() + 1);
    }
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'Creada':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800';
      case 'Surtida':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800';
      case 'Cancelada':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800';
      default:
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800';
    }
  }

  getPaymentStatusClass(status: string | undefined): string {
    switch (status) {
      case 'Pagado':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800';
      case 'Pendiente':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800';
      default:
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800';
    }
  }

  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }

  getOrderTotal(order: SalesOrder): number {
    return getSalesOrderTotal(order);
  }

  getOrderStatus(order: SalesOrder): string {
    return order.general_status || order.status || '—';
  }
}
