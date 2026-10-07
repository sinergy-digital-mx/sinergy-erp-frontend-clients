import { Component, OnDestroy, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder, SalesOrderFilters, SalesOrderInvoiceShortcut, SalesOrderTrend, PaginationParams } from '../../models/sales-order.model';
import { SalesOrderTrendComponent } from '../../components/sales-order-trend/sales-order-trend.component';
import { SalesFilterBarComponent } from '../../components/sales-filter-bar/sales-filter-bar.component';
import { CreateSalesOrderModalComponent } from '../../components/create-sales-order-modal/create-sales-order-modal.component';
import { SalesOrderDetailDialogComponent } from '../../components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import {
  SalesOrderExportDialogComponent,
  SalesOrderExportDialogResult,
} from '../../components/sales-order-export-dialog/sales-order-export-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { ToastService } from '../../../../core/services/toast.service';
import { formatApiDate } from '../../../../core/utils/api-datetime.util';
import {
  getSalesOrderListBranchLabel,
  getSalesOrderListCompanyName,
  getSalesOrderListCustomerName,
  getSalesOrderListFiscalLabel,
  getSalesOrderStatus,
  getSalesOrderTotal,
} from '../../utils/sales-order-display.util';
import { salesOrderListPaymentMetaLabel } from '../../utils/sales-order-collection.util';
import { getInvoiceStatusLabel } from '../../utils/cfdi-xml-builder.util';

@Component({
  selector: 'app-sales-order-list',
  standalone: true,
  imports: [CommonModule, SalesFilterBarComponent, DatatableWrapperComponent, EmptyStageComponent, SalesOrderTrendComponent],
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent implements OnInit, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;

  private ordersData = signal<SalesOrder[]>([]);
  private filtersState = signal<SalesOrderFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 15 });
  private loadingState = signal<boolean>(false);
  private totalResultsState = signal<number>(0);
  private hasMoreState = signal<boolean>(true);
  private loadSeq = 0;
  private trendSeq = 0;
  private glanceTimer: ReturnType<typeof setInterval> | null = null;

  /** 0 = tarjetas de estado y pago. 1 = ventas de 12 meses. */
  glancePanel = signal<0 | 1>(0);
  trend = signal<SalesOrderTrend | null>(null);
  trendLoading = signal(false);
  trendError = signal(false);
  invoicePop = signal<{ top: number; left: number; invoice: SalesOrderInvoiceShortcut } | null>(null);

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: true, canAutoResize: false, width: 140 },
      { name: 'Tipo', prop: 'sale_scope', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Cliente', prop: 'customer', sortable: true, canAutoResize: false, width: 140 },
      { name: 'Sucursal', prop: 'billing_branch', sortable: false, canAutoResize: false, width: 190 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Total', prop: 'requested_total', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 186 },
      { name: 'Factura', prop: 'invoice', sortable: false, canAutoResize: false, width: 148 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 160 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    pageSizeOptions: [15, 30, 50, 100],
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron órdenes de venta' },
    columnMode: 'force',
    reorderable: false,
  });

  orders = this.ordersData.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();

  // Stats
  totalOrders = computed(() => this.totalResultsState());
  totalAmount = computed(() =>
    this.ordersData().reduce((sum, o) => sum + this.getOrderTotal(o), 0)
  );

  creadasCount = computed(() => this.ordersData().filter(o => getSalesOrderStatus(o) === 'Creada').length);
  surtidasCount = computed(() => this.ordersData().filter(o => getSalesOrderStatus(o) === 'Surtida').length);
  canceladasCount = computed(() => this.ordersData().filter(o => getSalesOrderStatus(o) === 'Cancelada').length);

  creadasAmount = computed(() => this.ordersData().filter(o => getSalesOrderStatus(o) === 'Creada').reduce((s, o) => s + this.getOrderTotal(o), 0));
  surtidasAmount = computed(() => this.ordersData().filter(o => getSalesOrderStatus(o) === 'Surtida').reduce((s, o) => s + this.getOrderTotal(o), 0));

  pagadasCount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pagado').length);
  pendientesCount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pendiente').length);
  pagadasAmount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pagado').reduce((s, o) => s + this.getOrderTotal(o), 0));
  pendientesAmount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pendiente').reduce((s, o) => s + this.getOrderTotal(o), 0));

  creadasPercent = computed(() => this.totalOrders() > 0 ? (this.creadasCount() / this.totalOrders()) * 100 : 0);
  surtidasPercent = computed(() => this.totalOrders() > 0 ? (this.surtidasCount() / this.totalOrders()) * 100 : 0);
  pagadasPercent = computed(() => this.totalOrders() > 0 ? (this.pagadasCount() / this.totalOrders()) * 100 : 0);
  pendientesPercent = computed(() => this.totalOrders() > 0 ? (this.pendientesCount() / this.totalOrders()) * 100 : 0);

  constructor(
    private salesOrderService: SalesOrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private taxCalculator: TaxCalculatorService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadTrend();
    this.startGlance();
  }

  ngOnDestroy(): void {
    this.stopGlance();
  }

  /** Un clic fija la vista y detiene el cambio automático. */
  selectGlance(panel: 0 | 1): void {
    this.glancePanel.set(panel);
    this.stopGlance();
  }

  private startGlance(): void {
    this.stopGlance();
    this.glanceTimer = setInterval(() => {
      this.glancePanel.update((panel) => (panel === 0 ? 1 : 0));
    }, 10_000);
  }

  private stopGlance(): void {
    if (this.glanceTimer == null) return;
    clearInterval(this.glanceTimer);
    this.glanceTimer = null;
  }

  loadOrders(): void {
    const seq = ++this.loadSeq;
    const requested = this.paginationState();
    this.loadingState.set(true);
    this.table_config.update(c => ({
      ...c,
      loading: true,
      page: requested.page,
      limit: requested.limit,
    }));

    this.salesOrderService.getOrders(this.filtersState(), requested).subscribe({
      next: (response) => {
        if (seq !== this.loadSeq) return;
        const orders = Array.isArray(response.data) ? response.data : [];
        const limit = Number(response.limit) || requested.limit;
        const total = Number(response.total) || 0;
        const page = Number(response.page) || requested.page;
        const totalPages = Number(response.totalPages) || Math.ceil(total / Math.max(limit, 1));
        const hasNext = page < totalPages;

        this.ordersData.set(orders);
        this.totalResultsState.set(total);
        this.hasMoreState.set(hasNext);

        this.table_config.update(c => ({
          ...c,
          rows: orders,
          totalResults: total,
          page,
          limit,
          hasNext,
          loading: false,
        }));

        this.loadingState.set(false);
      },
      error: (error) => {
        if (seq !== this.loadSeq) return;
        console.error('Error loading sales orders:', error);
        this.loadingState.set(false);
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
  }

  applyFilters(filters: SalesOrderFilters): void {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: this.paginationState().limit || 15 });
    this.loadOrders();
    this.loadTrend();
  }

  loadTrend(): void {
    const seq = ++this.trendSeq;
    this.trendLoading.set(true);
    this.trendError.set(false);
    this.salesOrderService.getSalesTrend(this.filtersState()).subscribe({
      next: (trend) => {
        if (seq !== this.trendSeq) return;
        this.trend.set(trend);
        this.trendLoading.set(false);
      },
      error: () => {
        if (seq !== this.trendSeq) return;
        this.trend.set(null);
        this.trendError.set(true);
        this.trendLoading.set(false);
      },
    });
  }

  onPageChange(event: IPaginationEvent): void {
    const page = Number(event.page) || 1;
    const limit = Number(event.limit) || this.paginationState().limit || 15;
    this.paginationState.set({ page, limit });
    this.table_config.update(c => ({ ...c, page, limit }));
    this.loadOrders();
  }

  onSortChange(event: ISortEvent): void {
    console.log('Sort changed:', event);
  }

  navigateToCreate(): void {
    this.dialog.open(CreateSalesOrderModalComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'create-purchase-order-modal'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
        this.loadTrend();
      }
    });
  }

  openExportModal(): void {
    this.dialog
      .open(SalesOrderExportDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: false,
        data: { filters: this.filtersState() },
      })
      .afterClosed()
      .subscribe((result: SalesOrderExportDialogResult | undefined) => {
        if (result?.downloaded) {
          this.toast.success('Reporte descargado');
        }
      });
  }

  navigateToDetail(order: SalesOrder): void {
    this.dialog
      .open(SalesOrderDetailDialogComponent, {
        ...ORDER_DETAIL_DIALOG_OPTIONS,
        data: { orderId: order.id },
      })
      .afterClosed()
      .subscribe(() => {
        this.loadOrders();
        this.loadTrend();
      });
  }

  getStatusClass(status: string): string {
    const base = 'dt-status-pill';
    switch (status) {
      case 'Creada': return `${base} dt-status-pill--info`;
      case 'En Selección': return `${base} dt-status-pill--warning`;
      case 'Lista para entrega': return `${base} dt-status-pill--sky`;
      case 'Surtida': return `${base} dt-status-pill--success`;
      case 'En Camino': return `${base} dt-status-pill--sky`;
      case 'Cancelada': return `${base} dt-status-pill--danger`;
      default: return `${base} dt-status-pill--neutral`;
    }
  }

  getPaymentStatusClass(status: string): string {
    const base = 'dt-status-pill';
    switch (status) {
      case 'Pagado': return `${base} dt-status-pill--success`;
      case 'Parcial': return `${base} dt-status-pill--warning`;
      case 'Pendiente': return `${base} dt-status-pill--danger`;
      default: return `${base} dt-status-pill--neutral`;
    }
  }

  paymentMetaLabel(order: SalesOrder): string {
    return salesOrderListPaymentMetaLabel(order);
  }

  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }

  formatDateHuman(date: string | Date): string {
    if (!date) return '';
    const formatted = formatApiDate(date, 'human');
    return formatted === '—' ? '' : formatted;
  }

  getOrderTotal(order: SalesOrder): number {
    return getSalesOrderTotal(order);
  }

  getOrderStatus(order: SalesOrder): string {
    return String(getSalesOrderStatus(order) || '—');
  }

  getOrderCustomerName(order: SalesOrder): string {
    return getSalesOrderListCustomerName(order);
  }

  getOrderCompanyName(order: SalesOrder): string {
    return getSalesOrderListCompanyName(order);
  }

  getFiscalLabel(order: SalesOrder): string {
    return getSalesOrderListFiscalLabel(order);
  }

  getBranchLabel(order: SalesOrder): string {
    return getSalesOrderListBranchLabel(order);
  }

  orderInvoice(order: SalesOrder): SalesOrderInvoiceShortcut | null {
    return order.invoice ?? order.downloads?.invoice ?? null;
  }

  invoiceBadgeLabel(invoice: SalesOrderInvoiceShortcut): string {
    const folio = [invoice.series, invoice.folio].filter(Boolean).join('-');
    return folio || 'CFDI';
  }

  invoiceStatusLabel(invoice: SalesOrderInvoiceShortcut): string {
    return getInvoiceStatusLabel(invoice);
  }

  invoiceTone(invoice: SalesOrderInvoiceShortcut): 'ok' | 'warn' | 'bad' | 'muted' {
    const label = `${invoice.sat_status || ''} ${invoice.stamp_status || ''}`.toLowerCase();
    if (label.includes('vigente') || invoice.stamp_status === 'stamped') return 'ok';
    if (label.includes('error')) return 'bad';
    if (label.includes('cancel') && !label.includes('pending')) return 'bad';
    if (label.includes('pending') || label.includes('pendiente')) return 'warn';
    return 'muted';
  }

  showInvoicePop(event: MouseEvent, invoice: SalesOrderInvoiceShortcut): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const width = 280;
    const left = Math.min(Math.max(12, rect.left), window.innerWidth - width - 12);
    this.invoicePop.set({ top: rect.bottom - 2, left, invoice });
  }

  hideInvoicePop(): void {
    this.invoicePop.set(null);
  }

  openInvoiceInSat(event: MouseEvent, invoice: SalesOrderInvoiceShortcut): void {
    event.preventDefault();
    event.stopPropagation();
    const uuid = invoice.uuid?.trim();
    if (!uuid) return;
    const params = new URLSearchParams({
      id: uuid,
      re: invoice.rfc_emisor?.trim() || '',
      rr: invoice.rfc_receptor?.trim() || '',
      tt: (Number(invoice.total) || 0).toFixed(6),
    });
    window.open(
      `https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?${params.toString()}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  getSaleScopeLabel(order: SalesOrder): string {
    if (order.sale_scope === 'services') return 'Servicios';
    if (order.sale_scope === 'combined') return 'Prod. y serv.';
    return 'Inventario';
  }
}
