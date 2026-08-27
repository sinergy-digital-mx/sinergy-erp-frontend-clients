import { Component, DestroyRef, OnInit, inject, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import {
  PurchaseOrder,
  OrderStatus,
  PaymentStatus,
  PaymentCurrency,
  PurchaseOrderListStats,
  emptyPurchaseOrderListStats,
  normalizePurchaseOrderListStats,
} from '../../models/purchase-order.model';
import { OrderFilters, PaginationParams } from '../../models/filters.model';
import {
  getPurchaseOrderListBranchLabel,
  getPurchaseOrderListFiscalLabel,
  getPurchaseOrderListWarehouseLabel,
} from '../../utils/purchase-order-display.util';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { OrderDetailDialogComponent } from '../../components/order-detail-dialog/order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { CreatePurchaseOrderModalComponent } from '../../components/create-purchase-order-modal/create-purchase-order-modal.component';
import { PurchaseOrderExportDialogComponent } from '../../components/purchase-order-export-dialog/purchase-order-export-dialog.component';
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

  private readonly destroyRef = inject(DestroyRef);

  readonly Math = Math;

  // State signals
  private ordersData = signal<PurchaseOrder[]>([]);
  private filtersState = signal<OrderFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 15 });
  private loadingState = signal<boolean>(true);
  private totalResultsState = signal<number>(0);
  private hasMoreState = signal<boolean>(true);
  private statsState = signal<PurchaseOrderListStats>(emptyPurchaseOrderListStats());
  
  // Table configuration
  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Proveedor', prop: 'vendor', sortable: true, canAutoResize: false, width: 150 },
      { name: 'Razón social', prop: 'razon_social', sortable: false, canAutoResize: false, width: 150 },
      { name: 'Sucursal', prop: 'sucursal', sortable: false, canAutoResize: false, width: 150 },
      { name: 'Almacén', prop: 'warehouse', sortable: false, canAutoResize: false, width: 130 },
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
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron órdenes de compra' },
    columnMode: 'force',
    reorderable: false,
    loading: true,
  });
  
  // Public readonly signals
  orders = this.ordersData.asReadonly();
  filters = this.filtersState.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();

  /** Cards leen stats del GET (todos los filtros), no la página. */
  totalOrders = computed(() => this.statsState().count || this.totalResultsState());
  hasUsd = computed(() => this.statNumber(this.statsState().by_currency.USD.count) > 0);

  creadasCount = computed(() => this.statusCount('Creada'));
  recibidasCount = computed(() => this.statusCount('Recibida'));
  pagadasCount = computed(() => this.paymentCount('Pagado'));
  pendientesCount = computed(() => this.paymentCount('Pendiente'));

  creadasPercent = computed(() => this.countPercent(this.creadasCount()));
  recibidasPercent = computed(() => this.countPercent(this.recibidasCount()));
  pagadasPercent = computed(() => this.countPercent(this.pagadasCount()));
  hasAnyDebt = computed(() =>
    this.paymentAmount('Pendiente', 'MXN') > 0 || this.paymentAmount('Pendiente', 'USD') > 0
  );

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private taxCalculator: TaxCalculatorService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.filtersState.update((prev) => this.mergeQueryParamsIntoFilters(prev, params));
        this.paginationState.set({ page: 1, limit: 15 });
        this.loadOrders();
      });
  }

  private mergeQueryParamsIntoFilters(prev: OrderFilters, params: ParamMap): OrderFilters {
    const next: OrderFilters = { ...prev };

    const search = params.get('search')?.trim() || undefined;
    if (search) {
      next.search = search;
    } else {
      delete next.search;
    }

    const vendorId = params.get('vendor_id')?.trim() || undefined;
    if (vendorId) {
      next.vendorId = vendorId;
    } else {
      delete next.vendorId;
    }

    const unpaidParam = params.get('unpaid')?.trim().toLowerCase();
    const unpaid = unpaidParam === '1' || unpaidParam === 'true';
    if (unpaid) {
      next.unpaid = true;
      delete next.paymentStatus;
    } else {
      delete next.unpaid;
      const paymentStatus = params.get('payment_status')?.trim() || undefined;
      if (paymentStatus) {
        next.paymentStatus = paymentStatus;
      } else {
        delete next.paymentStatus;
      }
    }

    return next;
  }

  private queryScopedFilters(filters: OrderFilters): OrderFilters {
    const params = this.route.snapshot.queryParamMap;
    return this.mergeQueryParamsIntoFilters(filters, params);
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
          this.statsState.set(
            normalizePurchaseOrderListStats(
              Array.isArray(response) ? undefined : response.stats,
              total
            )
          );
          
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
   * Apply filters
   */
  applyFilters(filters: OrderFilters): void {
    this.filtersState.set({
      ...this.queryScopedFilters(filters),
      ...filters,
    });
    this.paginationState.set({ page: 1, limit: 15 });
    const currentSearch = this.route.snapshot.queryParamMap.get('search')?.trim() || undefined;
    const nextSearch = filters.search?.trim() || undefined;

    if (currentSearch !== nextSearch) {
      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: nextSearch ?? null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
      return;
    }

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
    const base = 'dt-status-pill';
    switch (status) {
      case 'Creada':
        return `${base} dt-status-pill--info`;
      case 'Recibida':
        return `${base} dt-status-pill--success`;
      case 'Cancelada':
        return `${base} dt-status-pill--danger`;
      default:
        return `${base} dt-status-pill--neutral`;
    }
  }

  getFiscalLabel(order: PurchaseOrder): string {
    return getPurchaseOrderListFiscalLabel(order);
  }

  getBranchLabel(order: PurchaseOrder): string {
    return getPurchaseOrderListBranchLabel(order);
  }

  getWarehouseLabel(order: PurchaseOrder): string {
    return getPurchaseOrderListWarehouseLabel(order);
  }

  getPaymentStatusClass(paymentStatus: PaymentStatus | string): string {
    const base = 'dt-status-pill';
    if (this.isPaymentPaid(paymentStatus)) {
      return `${base} dt-status-pill--success`;
    }
    switch (paymentStatus) {
      case 'Parcial':
        return `${base} dt-status-pill--warning`;
      case 'Pendiente':
        return `${base} dt-status-pill--danger`;
      default:
        return `${base} dt-status-pill--neutral`;
    }
  }

  private isPaymentPaid(paymentStatus: PaymentStatus | string | undefined): boolean {
    const normalized = (paymentStatus ?? '').toString().toLowerCase();
    return normalized === 'pagada' || normalized === 'pagado';
  }

  currencyAmount(currency: PaymentCurrency): number {
    return this.statNumber(this.statsState().by_currency[currency].amount);
  }

  statusAmount(status: 'Creada' | 'Recibida', currency: PaymentCurrency): number {
    return this.statNumber(this.statsState().by_currency[currency].by_status[status].amount);
  }

  paymentAmount(status: 'Pagado' | 'Pendiente', currency: PaymentCurrency): number {
    return this.statNumber(this.statsState().by_currency[currency].by_payment[status].amount);
  }

  /** Formato de cards: `MXN $1,045,914.40`. Nunca un $ genérico mezclado. */
  formatStatsAmount(amount: number, currency: PaymentCurrency): string {
    const body = new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.statNumber(amount));
    return `${currency} $${body}`;
  }

  /**
   * Format currency amount
   */
  formatCurrency(amount: number, currency: 'MXN' | 'USD' = 'MXN'): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount ?? 0);
  }

  getOrderCurrency(order: PurchaseOrder): 'MXN' | 'USD' {
    return order.payments_summary?.currency ?? order.payment_currency ?? 'MXN';
  }

  /**
   * Format date to human readable format (e.g., "Marzo 20 3:33 PM")
   */
  formatDateHuman(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
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
    this.dialog
      .open(OrderDetailDialogComponent, {
        ...ORDER_DETAIL_DIALOG_OPTIONS,
        data: { orderId: order.id },
      })
      .afterClosed()
      .subscribe(() => {
        this.loadOrders();
      });
  }

  /**
   * Navigate to create order
   */
  navigateToCreate(): void {
    this.dialog.open(CreatePurchaseOrderModalComponent, {
      width: '1100px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'create-purchase-order-modal'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadOrders();
      }
    });
  }

  openExportModal(): void {
    this.dialog.open(PurchaseOrderExportDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      autoFocus: false,
      data: { filters: { ...this.filtersState() } },
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

  private statusCount(status: 'Creada' | 'Recibida'): number {
    const stats = this.statsState().by_currency;
    return this.statNumber(stats.MXN.by_status[status].count)
      + this.statNumber(stats.USD.by_status[status].count);
  }

  private paymentCount(status: 'Pagado' | 'Pendiente'): number {
    const stats = this.statsState().by_currency;
    return this.statNumber(stats.MXN.by_payment[status].count)
      + this.statNumber(stats.USD.by_payment[status].count);
  }

  private countPercent(count: number): number {
    const total = this.totalOrders();
    return total > 0 ? (count / total) * 100 : 0;
  }

  private statNumber(value: number | string | undefined | null): number {
    return Number(value) || 0;
  }
}
