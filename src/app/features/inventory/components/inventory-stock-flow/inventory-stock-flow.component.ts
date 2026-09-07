import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';
import {
  ReportPeriod,
  ReportPeriodSelectorComponent,
} from '../../../../core/components/report-period-selector/report-period-selector.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { BackButtonComponent } from '../../../rbac-tenant-ui/components/back-button/back-button.component';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { VendorService } from '../../../settings/services/vendor.service';
import { Vendor } from '../../../settings/models/vendor.model';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { InventoryService } from '../../services/inventory.service';
import { InventoryStockFlowService } from '../../services/inventory-stock-flow.service';
import { InventoryLocationFiscal } from '../../models/inventory-location.model';
import {
  StockFlowFiltersApplied,
  StockFlowLedgerRow,
  StockFlowPeriod,
  StockFlowQueryParams,
  StockFlowSummaryRow,
  StockFlowTotalizedRow,
  StockFlowView,
} from '../../models/inventory-stock-flow.model';
import { TransferDetailDialogComponent } from '../transfer-detail-dialog/transfer-detail-dialog.component';
import { AuditDetailDialogComponent } from '../audit-detail-dialog/audit-detail-dialog.component';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { AUDIT_DETAIL_DIALOG_OPTIONS } from '../../config/audit-dialog.config';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';

type StockFlowVendorOption = Vendor & { display_name: string };

@Component({
  selector: 'app-inventory-stock-flow',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    LucideAngularModule,
    ReportPeriodSelectorComponent,
    EmptyStageComponent,
    BackButtonComponent,
    PaginationComponent,
  ],
  templateUrl: './inventory-stock-flow.component.html',
  styleUrl: './inventory-stock-flow.component.scss',
})
export class InventoryStockFlowComponent implements OnInit {

  view: StockFlowView = 'summary';
  datePreset: StockFlowPeriod = 'month';
  customDateFrom = '';
  customDateTo = '';
  fiscalConfigurationId = '';
  billingBranchId = '';
  vendorId = '';
  vendorSearch = '';
  vendorOptions: StockFlowVendorOption[] = [];
  filteredVendors: StockFlowVendorOption[] = [];
  loadingVendors = false;
  readonly ChevronDown = ChevronDown;
  productId = '';
  search = '';
  page = 1;
  limit = 50;

  locations = signal<InventoryLocationFiscal[]>([]);
  summary = signal<StockFlowSummaryRow[]>([]);
  totalized = signal<StockFlowTotalizedRow[]>([]);
  ledger = signal<StockFlowLedgerRow[]>([]);
  filtersApplied = signal<StockFlowFiltersApplied | null>(null);
  total = signal(0);
  totalPages = signal(0);
  loading = signal(false);
  exporting = signal(false);

  readonly emptyParams = {
    icon_size: 28,
    row_gap: 12,
    width: 52,
    height: 52,
    wrapper_icon_circle: true,
  };

  readonly pageSizeOptions = [25, 50, 100];

  branchOptions = computed(() => {
    const fiscal = this.locations().find((f) => f.id === this.fiscalConfigurationId);
    return fiscal?.branches ?? [];
  });

  /** Pie del totalizado (solo filas de la página actual) */
  totalizedTotals = computed(() => {
    const rows = this.totalized();
    const sum = (pick: (r: StockFlowTotalizedRow) => string) =>
      rows.reduce((acc, r) => acc + (parseFloat(pick(r)) || 0), 0);

    return {
      opening_qty: sum((r) => r.opening_qty),
      opening_cost_mxn: sum((r) => r.opening_cost_mxn),
      opening_sale_mxn: sum((r) => r.opening_sale_mxn),
      purchases_qty: sum((r) => r.purchases_qty),
      purchases_cost_mxn: sum((r) => r.purchases_cost_mxn),
      sales_qty: sum((r) => r.sales_qty),
      sales_cost_mxn: sum((r) => r.sales_cost_mxn),
      sales_revenue_mxn: sum((r) => r.sales_revenue_mxn),
      transfer_in_qty: sum((r) => r.transfer_in_qty),
      transfer_in_cost_mxn: sum((r) => r.transfer_in_cost_mxn),
      transfer_out_qty: sum((r) => r.transfer_out_qty),
      transfer_out_cost_mxn: sum((r) => r.transfer_out_cost_mxn),
      adjustments_qty: sum((r) => r.adjustments_qty),
      adjustments_cost_mxn: sum((r) => r.adjustments_cost_mxn),
      closing_qty: sum((r) => r.closing_qty),
      closing_cost_mxn: sum((r) => r.closing_cost_mxn),
      closing_sale_mxn: sum((r) => r.closing_sale_mxn),
    };
  });

  constructor(
    private readonly stockFlowService: InventoryStockFlowService,
    private readonly inventoryService: InventoryService,
    private readonly vendorService: VendorService,
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {}

  get vendorSearchTerm(): string {
    return this.vendorSearch.trim().toLowerCase();
  }

  readonly displayVendor = (value: StockFlowVendorOption | string | null): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value.display_name || this.formatVendorLabel(value);
  };

  ngOnInit(): void {
    this.loadVendorOptions();

    this.inventoryService.getLocations().subscribe({
      next: (data) => {
        const list = data ?? [];
        this.locations.set(list);
        if (!this.fiscalConfigurationId && list.length > 0) {
          this.fiscalConfigurationId = list[0].id;
        }
        this.loadReport();
      },
      error: () => {
        this.locations.set([]);
        this.loadReport();
      },
    });
  }

  get rangeIncomplete(): boolean {
    return this.datePreset === 'range' && (!this.customDateFrom || !this.customDateTo);
  }

  get fiscalRequired(): boolean {
    return !this.fiscalConfigurationId;
  }

  get subtitle(): string {
    const viewLabel =
      this.view === 'ledger'
        ? 'Flujo detallado'
        : this.view === 'totalized'
          ? 'Totalizado por sucursal'
          : 'Resumen';
    const periodLabel = this.filtersApplied()?.period_label?.trim();
    if (periodLabel) {
      return `${viewLabel} · ${periodLabel}`;
    }
    return viewLabel;
  }

  get totalizedFooterLabel(): string {
    return this.totalPages() > 1 ? 'Subtotal página' : 'Total global';
  }

  goBack(): void {
    void this.router.navigate(['/inventory']);
  }

  setView(view: StockFlowView): void {
    if (this.view === view) return;
    this.view = view;
    if (view === 'totalized') {
      this.productId = '';
      this.search = '';
    }
    this.resetPageAndLoad();
  }

  onPeriodChange(period: ReportPeriod): void {
    this.datePreset = period as StockFlowPeriod;
    if (period !== 'range') {
      this.customDateFrom = '';
      this.customDateTo = '';
    }
    this.resetPageAndLoad();
  }

  onRangeChange(range: { dateFrom: string; dateTo: string }): void {
    this.datePreset = 'range';
    this.customDateFrom = range.dateFrom;
    this.customDateTo = range.dateTo;
    this.resetPageAndLoad();
  }

  onFiscalChange(): void {
    this.billingBranchId = '';
    this.resetPageAndLoad();
  }

  onBranchChange(): void {
    this.resetPageAndLoad();
  }

  onVendorSearchFocus(): void {
    this.filteredVendors = this.filterVendorsLocally(this.vendorSearch);
    if (!this.vendorOptions.length && !this.loadingVendors) {
      this.loadVendorOptions();
    }
  }

  onVendorSearchChange(value: unknown): void {
    if (value && typeof value === 'object') {
      return;
    }
    const term = typeof value === 'string' ? value : '';
    this.vendorSearch = term;
    this.filteredVendors = this.filterVendorsLocally(term);
    if (this.vendorId && term.trim() !== this.selectedVendorLabel) {
      this.vendorId = '';
    }
  }

  onVendorSelected(vendor: StockFlowVendorOption | null): void {
    if (!vendor) {
      this.vendorId = '';
      this.vendorSearch = '';
      this.filteredVendors = this.vendorOptions;
      this.resetPageAndLoad();
      return;
    }
    this.vendorId = vendor.id;
    this.vendorSearch = vendor.display_name;
    this.resetPageAndLoad();
  }

  onVendorPickerBlur(): void {
    // blur corre antes que optionSelected; esperar a que se aplique la opción.
    setTimeout(() => {
      if (this.vendorId) {
        this.vendorSearch = this.selectedVendorLabel;
        return;
      }
      if (this.vendorSearch.trim()) {
        this.vendorSearch = '';
        this.filteredVendors = this.vendorOptions;
      }
    }, 150);
  }

  onSearch(): void {
    if (this.view === 'totalized') return;
    this.resetPageAndLoad();
  }

  clearProductFilter(): void {
    this.productId = '';
    this.resetPageAndLoad();
  }

  onPageChange(event: { page?: number; limit?: number }): void {
    if (event.limit != null && event.limit !== this.limit) {
      this.limit = event.limit;
      this.page = 1;
    } else if (event.page != null) {
      this.page = event.page;
    }
    this.loadReport();
  }

  openLedgerForProduct(row: StockFlowSummaryRow): void {
    this.productId = row.product_id;
    this.billingBranchId = row.billing_branch_id;
    this.view = 'ledger';
    this.resetPageAndLoad();
  }

  openProductDetail(productId: string, event?: Event): void {
    event?.stopPropagation();
    if (!productId) return;
    this.dialog.open(ProductDetailModalComponent, {
      ...PRODUCT_DETAIL_DIALOG_CONFIG,
      data: { product: { id: productId }, isNew: false },
    });
  }

  canOpenReference(row: StockFlowLedgerRow): boolean {
    return !!(row.reference_id && row.reference_type && row.reference_folio);
  }

  openReference(row: StockFlowLedgerRow, event?: Event): void {
    event?.stopPropagation();
    if (!this.canOpenReference(row) || !row.reference_id) return;

    switch (row.reference_type) {
      case 'sales_order':
        this.dialog.open(SalesOrderDetailDialogComponent, {
          ...ORDER_DETAIL_DIALOG_OPTIONS,
          data: { orderId: row.reference_id },
        });
        return;
      case 'purchase_order':
        this.dialog.open(OrderDetailDialogComponent, {
          ...ORDER_DETAIL_DIALOG_OPTIONS,
          data: { orderId: row.reference_id },
        });
        return;
      case 'inventory_transfer':
        this.dialog.open(TransferDetailDialogComponent, {
          data: { transferId: row.reference_id },
          width: 'min(1100px, 96vw)',
          maxWidth: '96vw',
          maxHeight: '92vh',
        });
        return;
      case 'inventory_audit':
        this.dialog.open(AuditDetailDialogComponent, {
          ...AUDIT_DETAIL_DIALOG_OPTIONS,
          data: { auditId: row.reference_id },
        });
        return;
      case 'inventory_batch':
        this.dialog.open(BatchDetailDialogComponent, {
          ...BATCH_DETAIL_DIALOG_OPTIONS,
          data: { batchId: row.reference_id },
        });
        return;
      default:
        this.toast.error('No se puede abrir este documento desde el flujo');
    }
  }

  movementBadgeClass(type: string): string {
    switch (type) {
      case 'purchase_receipt':
      case 'import':
      case 'transfer_in':
      case 'sale_reversal':
        return 'dt-status-pill dt-status-pill--success';
      case 'sale':
      case 'transfer_out':
        return 'dt-status-pill dt-status-pill--danger';
      case 'audit_adjustment':
        return 'dt-status-pill dt-status-pill--warning';
      case 'opening_balance':
        return 'dt-status-pill dt-status-pill--neutral';
      default:
        return 'dt-status-pill dt-status-pill--sky';
    }
  }

  loadReport(): void {
    if (this.rangeIncomplete || this.fiscalRequired) {
      this.summary.set([]);
      this.totalized.set([]);
      this.ledger.set([]);
      this.filtersApplied.set(null);
      this.total.set(0);
      this.totalPages.set(0);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.stockFlowService.getReport(this.currentQuery()).subscribe({
      next: (res) => {
        this.filtersApplied.set(res.filters_applied);
        this.summary.set(res.summary ?? []);
        this.totalized.set(res.totalized ?? []);
        this.ledger.set(res.ledger ?? []);
        this.total.set(Number(res.total ?? 0));
        this.totalPages.set(Number(res.total_pages ?? 0));
        this.page = Number(res.page ?? this.page);
        this.limit = Number(res.limit ?? this.limit);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.summary.set([]);
        this.totalized.set([]);
        this.ledger.set([]);
        this.total.set(0);
        this.totalPages.set(0);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el reporte'));
      },
    });
  }

  downloadExcel(): void {
    if (this.rangeIncomplete || this.fiscalRequired || this.exporting()) return;
    this.exporting.set(true);
    const query = this.currentQuery();
    delete query.page;
    delete query.limit;
    this.stockFlowService.exportExcel(query).subscribe({
      next: ({ blob, filename }) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        this.exporting.set(false);
      },
      error: (err) => {
        this.exporting.set(false);
        this.toast.error(
          err instanceof Error
            ? err.message
            : resolveHttpErrorMessage(err, 'No se pudo descargar el Excel'),
        );
      },
    });
  }

  formatQty(value: string | number | null | undefined): string {
    if (value == null || value === '') return '—';
    const n = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(n)) return String(value);
    return n.toLocaleString('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
  }

  formatMoney(value: string | number | null | undefined): string {
    if (value == null || value === '') return '—';
    const n = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(n)) return String(value);
    return n.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  formatDate(iso: string, calendarDay = false): string {
    if (calendarDay) {
      const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
      if (match) {
        const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
        return d.toLocaleDateString('es-MX', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      }
    }
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  private get selectedVendorLabel(): string {
    return this.vendorOptions.find((v) => v.id === this.vendorId)?.display_name || '';
  }

  private loadVendorOptions(): void {
    this.loadingVendors = true;
    this.vendorService.getAllActiveVendors().subscribe({
      next: (list) => {
        this.vendorOptions = (list ?? []).map((vendor) => ({
          ...vendor,
          display_name: this.formatVendorLabel(vendor),
        }));
        this.filteredVendors = this.filterVendorsLocally(this.vendorSearch);
        this.loadingVendors = false;
      },
      error: () => {
        this.vendorOptions = [];
        this.filteredVendors = [];
        this.loadingVendors = false;
      },
    });
  }

  private filterVendorsLocally(term: string): StockFlowVendorOption[] {
    const query = term.trim().toLowerCase();
    if (!query) return this.vendorOptions;
    return this.vendorOptions.filter((vendor) => {
      const haystack = `${vendor.display_name || ''} ${vendor.name || ''} ${vendor.rfc || ''}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  private formatVendorLabel(vendor: Vendor): string {
    const name = (vendor.name || '').trim();
    const rfc = (vendor.rfc || '').trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  private resetPageAndLoad(): void {
    this.page = 1;
    this.loadReport();
  }

  private currentQuery(): StockFlowQueryParams {
    return {
      period: this.datePreset,
      view: this.view,
      date_from: this.customDateFrom || undefined,
      date_to: this.customDateTo || undefined,
      fiscal_configuration_id: this.fiscalConfigurationId,
      billing_branch_id: this.billingBranchId || undefined,
      vendor_id: this.vendorId || undefined,
      product_id: this.view === 'totalized' ? undefined : this.productId || undefined,
      search: this.view === 'totalized' ? undefined : this.search.trim() || undefined,
      page: this.page,
      limit: this.limit,
    };
  }
}
