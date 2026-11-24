import { Component, DestroyRef, OnDestroy, OnInit, inject, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../services/sales-order.service';
import {
  emptySalesOrderListStats,
  normalizeSalesOrderListStats,
  SalesOrder,
  SalesOrderFilters,
  SalesOrderInvoiceShortcut,
  SalesOrderListStats,
  SalesOrderTrend,
  PaginationParams,
} from '../../models/sales-order.model';
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
import { AuthService } from '../../../../core/services/auth.service';
import { SALES_ORDER_PERMISSIONS } from '../../config/permissions.config';
import { GlanceSwitchComponent } from '../../../../core/components/glance-switch/glance-switch.component';
import { ListStatCard, ListStatStripComponent } from '../../../../core/components/list-stat-strip/list-stat-strip.component';
import { ChevronRight, CircleAlert, CircleDollarSign, ClipboardList, LucideAngularModule, Package, Plus, ShoppingBag } from 'lucide-angular';

@Component({
  selector: 'app-sales-order-list',
  standalone: true,
  imports: [CommonModule, SalesFilterBarComponent, DatatableWrapperComponent, EmptyStageComponent, SalesOrderTrendComponent, ListStatStripComponent, GlanceSwitchComponent, LucideAngularModule],
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent implements OnInit, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  readonly canViewStats = signal(this.authService.hasPermission(SALES_ORDER_PERMISSIONS.viewStats));

  readonly Math = Math;
  readonly Plus = Plus;
  readonly ChevronRight = ChevronRight;
  readonly cardSkeletonSlots = [1, 2, 3, 4];

  private ordersData = signal<SalesOrder[]>([]);
  private filtersState = signal<SalesOrderFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 15 });
  private loadingState = signal<boolean>(true);
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
    columns: this.listColumns(true),
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    pageSizeOptions: [15, 30, 50, 100],
    totalResults: 0,
    loading: true,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron órdenes de venta' },
    columnMode: 'force',
    reorderable: false,
  });

  orders = this.ordersData.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();

  private statsState = signal<SalesOrderListStats>(emptySalesOrderListStats());
  statsReady = signal(false);
  statsError = signal(false);

  /** Cards leen stats del GET (todo el filtro), no la página. */
  totalOrders = computed(() => this.statsState().count);
  hasUsd = computed(() => this.statNumber(this.statsState().by_currency.USD.count) > 0);
  openCount = computed(() => this.bucketCount('open'));
  deliveredCount = computed(() => this.bucketCount('delivered'));
  pagadasCount = computed(() => this.bucketCount('paid'));
  pendientesCount = computed(() => this.bucketCount('pending'));

  readonly statCards = computed((): ListStatCard[] => {
    const total = this.totalOrders();
    const share = (count: number) => (total > 0 ? Math.min(100, Math.round((count / total) * 100)) : 0);
    const pending = this.pendientesCount() > 0 || this.bucketAmount('pending', 'MXN') > 0 || this.bucketAmount('pending', 'USD') > 0;
    const lines = (mxn: number, usd: number) => this.moneyLines(mxn, usd);
    const totalLines = lines(this.currencyAmount('MXN'), this.currencyAmount('USD'));
    const openLines = lines(this.bucketAmount('open', 'MXN'), this.bucketAmount('open', 'USD'));
    const deliveredLines = lines(this.bucketAmount('delivered', 'MXN'), this.bucketAmount('delivered', 'USD'));
    const paidLines = lines(this.bucketAmount('paid', 'MXN'), this.bucketAmount('paid', 'USD'));
    const pendingLines = lines(this.bucketAmount('pending', 'MXN'), this.bucketAmount('pending', 'USD'));
    return [
      {
        key: 'total',
        label: 'Órdenes',
        hint: 'Todas las órdenes del filtro. El monto es el total, MXN y USD por separado.',
        tone: 'slate',
        icon: ShoppingBag,
        value: total,
        share: total > 0 ? 100 : 0,
        footer: totalLines[0] || '',
        footerLines: totalLines,
        footerKind: 'pill',
      },
      {
        key: 'open',
        label: 'Abiertas',
        hint: 'Aún no surtidas. Las canceladas no entran.',
        tone: 'indigo',
        icon: ClipboardList,
        value: this.openCount(),
        share: share(this.openCount()),
        footer: openLines[0] || '',
        footerLines: openLines,
        footerKind: 'pill',
      },
      {
        key: 'delivered',
        label: 'Entregadas',
        hint: 'Órdenes surtidas de todo el filtro.',
        tone: 'emerald',
        icon: Package,
        value: this.deliveredCount(),
        share: share(this.deliveredCount()),
        footer: deliveredLines[0] || '',
        footerLines: deliveredLines,
        footerKind: 'pill',
      },
      {
        key: 'paid',
        label: 'Pagadas',
        hint: 'Órdenes pagadas de todo el filtro',
        tone: 'sky',
        icon: CircleDollarSign,
        value: this.pagadasCount(),
        share: share(this.pagadasCount()),
        footer: paidLines[0] || '',
        footerLines: paidLines,
        footerKind: 'pill',
      },
      {
        key: 'pending',
        label: 'Pendientes',
        hint: 'Órdenes sin pagar de todo el filtro',
        tone: pending ? 'rose' : 'emerald',
        icon: CircleAlert,
        value: this.pendientesCount(),
        share: share(this.pendientesCount()),
        footer: pending ? (pendingLines[0] || '') : 'Sin pendiente',
        footerLines: pending ? pendingLines : undefined,
        footerKind: pending ? 'debt' : 'ok',
      },
    ];
  });

  readonly initialSearch: string;
  readonly initialCustomerId: string;
  readonly initialCustomerLabel: string;
  readonly initialFiscalConfigurationId: string;
  readonly initialBillingBranchId: string;

  constructor(
    private salesOrderService: SalesOrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private taxCalculator: TaxCalculatorService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const params = this.route.snapshot.queryParamMap;
    this.initialSearch = params.get('search')?.trim() || '';
    this.initialCustomerId = params.get('customer_id')?.trim() || '';
    this.initialCustomerLabel = params.get('customer')?.trim() || '';
    const queryFiscal = params.get('fiscal_configuration_id')?.trim() || '';
    const queryBranch = params.get('billing_branch_id')?.trim() || '';
    const defaultFiscal = this.authService.getDefaultListFiscalConfigurationId() || '';
    const defaultBranch = this.authService.getDefaultListBillingBranchId() || '';
    this.initialFiscalConfigurationId = queryFiscal || defaultFiscal;
    const fiscalIsDefault = !queryFiscal || queryFiscal === defaultFiscal;
    this.initialBillingBranchId = queryBranch || (fiscalIsDefault ? defaultBranch : '');
    this.filtersState.set({
      ...(this.initialSearch ? { search: this.initialSearch } : {}),
      ...(this.initialCustomerId ? { customer_id: this.initialCustomerId } : {}),
      ...(this.initialFiscalConfigurationId
        ? { fiscal_configuration_id: this.initialFiscalConfigurationId }
        : {}),
      ...(this.initialBillingBranchId ? { billing_branch_id: this.initialBillingBranchId } : {}),
    });
    this.syncBranchColumn();
  }

  ngOnInit(): void {
    this.loadOrders();
    let known = false;
    this.authService.permissions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const allowed = this.authService.hasPermission(SALES_ORDER_PERMISSIONS.viewStats);
      const changed = known && allowed !== this.canViewStats();
      const first = !known;
      known = true;
      this.canViewStats.set(allowed);
      if (!allowed) {
        this.stopGlance();
        this.trend.set(null);
        this.trendLoading.set(false);
        this.trendError.set(false);
        return;
      }
      if (first || changed) {
        this.loadTrend();
        if (changed && allowed) this.loadOrders();
        if (this.glanceTimer == null) this.startGlance();
      }
    });
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

        if (response.stats) {
          this.statsState.set(normalizeSalesOrderListStats(response.stats, total));
          this.statsReady.set(true);
          this.statsError.set(false);
        } else if (!this.statsReady() && this.canViewStats()) {
          this.statsError.set(true);
        }
        this.loadingState.set(false);
      },
      error: (error) => {
        if (seq !== this.loadSeq) return;
        console.error('Error loading sales orders:', error);
        if (!this.statsReady()) this.statsError.set(true);
        this.loadingState.set(false);
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
  }

  showBranchColumn(): boolean {
    return !this.filtersState().billing_branch_id?.trim();
  }

  private listColumns(showBranch: boolean): IDatatableConfig['columns'] {
    return [
      { name: 'Folio', prop: 'folio', sortable: true, canAutoResize: false, width: 140 },
      { name: 'Tipo', prop: 'sale_scope', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Cliente', prop: 'customer', sortable: true, canAutoResize: false, width: 140 },
      ...(showBranch
        ? [{ name: 'Sucursal', prop: 'billing_branch', sortable: false, canAutoResize: false, width: 190 }]
        : []),
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Total', prop: 'requested_total', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 186 },
      { name: 'Factura', prop: 'invoice', sortable: false, canAutoResize: false, width: 148 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 160 },
    ];
  }

  private syncBranchColumn(): void {
    const columns = this.listColumns(this.showBranchColumn());
    this.table_config.update((config) => ({ ...config, columns }));
  }

  applyFilters(filters: SalesOrderFilters): void {
    const { customer_label: customerLabel, ...apiFilters } = filters;
    this.filtersState.set(apiFilters);
    this.syncBranchColumn();
    this.paginationState.set({ page: 1, limit: this.paginationState().limit || 15 });
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: apiFilters.search?.trim() || null,
        customer_id: apiFilters.customer_id ?? null,
        customer: customerLabel ?? null,
        fiscal_configuration_id: apiFilters.fiscal_configuration_id ?? null,
        billing_branch_id: apiFilters.billing_branch_id ?? null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.loadOrders();
    if (this.canViewStats()) this.loadTrend();
  }

  loadTrend(): void {
    if (!this.canViewStats()) {
      this.trend.set(null);
      this.trendLoading.set(false);
      this.trendError.set(false);
      return;
    }
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
      width: '1200px',
      maxWidth: '96vw',
      maxHeight: '92vh',
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

  private statNumber(value: number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private bucketCount(key: 'open' | 'delivered' | 'paid' | 'pending'): number {
    const stats = this.statsState().by_currency;
    return this.statNumber(stats.MXN[key].count) + this.statNumber(stats.USD[key].count);
  }

  private currencyAmount(currency: 'MXN' | 'USD'): number {
    return this.statNumber(this.statsState().by_currency[currency].amount);
  }

  private bucketAmount(key: 'open' | 'delivered' | 'paid' | 'pending', currency: 'MXN' | 'USD'): number {
    return this.statNumber(this.statsState().by_currency[currency][key].amount);
  }

  /** Una línea por moneda, para que el monto no se recorte. */
  private moneyLines(mxn: number, usd: number): string[] {
    if (!this.hasUsd() && usd <= 0) return [this.formatCurrency(mxn)];
    const lines = [`MXN ${this.formatCurrency(mxn)}`];
    if (usd > 0) lines.push(`USD ${this.formatCurrency(usd)}`);
    return lines;
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

  partyInitials(name: string | null | undefined): string {
    const raw = String(name || '').trim();
    if (!raw || /^sin\s/i.test(raw) || raw === '—') return '•';
    const parts = raw.split(/\s+/).filter((part) => part && part !== '—');
    const first = parts[0]?.charAt(0) || '';
    const second = parts.length > 1 ? parts[1].charAt(0) : parts[0]?.charAt(1) || '';
    return `${first}${second}`.toLocaleUpperCase('es-MX') || '•';
  }
}
