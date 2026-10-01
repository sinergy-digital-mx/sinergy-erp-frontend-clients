import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { SalesOrder, SalesOrderFilters, PaginationParams, SalesOrderInvoiceShortcut } from '../../../sales-orders/models/sales-order.model';
import { SalesOrderInvoiceService } from '../../../sales-orders/services/sales-order-invoice.service';
import {
  getSalesOrderListBranchLabel,
  getSalesOrderListFiscalLabel,
  getSalesOrderTotal,
} from '../../../sales-orders/utils/sales-order-display.util';
import { salesOrderListPaymentMetaLabel } from '../../../sales-orders/utils/sales-order-collection.util';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { CreateSalesOrderModalComponent } from '../../../sales-orders/components/create-sales-order-modal/create-sales-order-modal.component';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Plus } from 'lucide-angular';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { formatBusinessDateTime } from '../../../../core/utils/api-datetime.util';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

@Component({
  selector: 'app-customer-sales-orders',
  standalone: true,
  imports: [CommonModule, ButtonComponent, HasPermissionDirective, SpinnerComponent],
  templateUrl: './customer-sales-orders.component.html',
  styleUrl: './customer-sales-orders.component.scss'
})
export class CustomerSalesOrdersComponent implements OnInit {
  @Input({ required: true }) customerId!: number | string;

  orders = signal<SalesOrder[]>([]);
  loading = signal(false);
  total = signal(0);
  page = signal(1);
  readonly pageSize = 10;
  invoiceTip = signal<{ x: number; y: number; above: boolean; invoice: SalesOrderInvoiceShortcut } | null>(null);
  downloadingKey = signal<string | null>(null);

  readonly PlusIcon = Plus;
  /** Variantes que usa RBAC en distintos tenants */
  readonly createSalesOrderPermissions = [
    PERMISSIONS.salesOrders.create,
    'salesOrders:Create'
  ];

  constructor(
    private salesOrderService: SalesOrderService,
    private invoiceService: SalesOrderInvoiceService,
    private taxCalculator: TaxCalculatorService,
    private dialog: MatDialog,
    private interceptorService: InterceptorService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  orderWhen(value: string | Date | null | undefined): { date: string; time: string } | null {
    return formatBusinessDateTime(value);
  }

  whenLabel(value: string | null | undefined): string {
    const when = formatBusinessDateTime(value);
    return when ? `${when.date} · ${when.time}` : '—';
  }

  invoiceFolio(invoice: SalesOrderInvoiceShortcut): string {
    const folio = [invoice.series, invoice.folio].filter(Boolean).join('-');
    return folio || 'Sin folio';
  }

  invoiceTipo(invoice: SalesOrderInvoiceShortcut): string {
    const labels: Record<string, string> = {
      I: 'Ingreso',
      E: 'Egreso',
      P: 'Pago',
      T: 'Traslado',
      N: 'Nómina',
    };
    const code = (invoice.tipo_comprobante || '').trim().toUpperCase();
    return labels[code] || code || '—';
  }

  stampLabel(status: string | null | undefined): string {
    const labels: Record<string, string> = {
      stamped: 'Timbrada',
      stamp_error: 'Error de timbrado',
      cancel_pending: 'Cancelación pendiente',
      cancel_error: 'Error de cancelación',
      cancelled: 'Cancelada',
      pending_stamp: 'Pendiente',
    };
    const key = (status || '').trim();
    return labels[key] || key || '—';
  }

  showInvoiceTip(event: MouseEvent, invoice: SalesOrderInvoiceShortcut): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const below = rect.bottom + 8;
    const above = below + 240 > window.innerHeight;
    this.invoiceTip.set({
      x: Math.max(8, Math.min(rect.left, window.innerWidth - 288)),
      y: above ? rect.top - 8 : below,
      above,
      invoice,
    });
  }

  hideInvoiceTip(): void {
    this.invoiceTip.set(null);
  }

  downloadInvoice(order: SalesOrder, invoice: SalesOrderInvoiceShortcut, event: Event): void {
    event.stopPropagation();
    const key = `invoice:${order.id}`;
    if (this.downloadingKey()) return;
    this.downloadingKey.set(key);
    this.invoiceService.getInvoicePdf(order.id, invoice.id).subscribe({
      next: (file) => {
        this.downloadingKey.set(null);
        if (!file.signedUrl) {
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Factura',
            message: 'No hay PDF de esta factura',
          });
          return;
        }
        window.open(file.signedUrl, '_blank', 'noopener');
      },
      error: () => {
        this.downloadingKey.set(null);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Factura',
          message: 'No se pudo descargar la factura',
        });
      },
    });
  }

  downloadTicket(order: SalesOrder, event: Event): void {
    event.stopPropagation();
    const key = `ticket:${order.id}`;
    if (this.downloadingKey()) return;
    this.downloadingKey.set(key);
    this.salesOrderService.downloadTicketPdf(order.id).subscribe({
      next: (blob) => {
        this.downloadingKey.set(null);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `TICKET-${order.folio || 'orden'}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.downloadingKey.set(null);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Ticket',
          message: 'No se pudo descargar el ticket',
        });
      },
    });
  }

  orderDocumentLabel(kind: 'original' | 'delivery'): string {
    return kind === 'delivery' ? 'Entrega' : 'Orden';
  }

  loadOrders(page = 1): void {
    if (!this.authService.hasEntityAccess('sales_orders')) {
      this.orders.set([]);
      this.total.set(0);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.page.set(page);

    const filters: SalesOrderFilters = {
      customer_id: this.customerId,
      with_downloads: true,
    };
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
      case 'En Selección':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800';
      case 'Lista para entrega':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-teal-100 text-teal-800';
      case 'Surtida':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800';
      case 'En Camino':
        return 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800';
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

  paymentMetaLabel(order: SalesOrder): string {
    return salesOrderListPaymentMetaLabel(order);
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

  branchLabel(order: SalesOrder): string {
    return getSalesOrderListBranchLabel(order);
  }

  fiscalLabel(order: SalesOrder): string {
    return getSalesOrderListFiscalLabel(order);
  }
}
