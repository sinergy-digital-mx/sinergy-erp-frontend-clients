import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ReportPeriod,
  ReportPeriodSelectorComponent,
} from '../../../../core/components/report-period-selector/report-period-selector.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { BackButtonComponent } from '../../../rbac-tenant-ui/components/back-button/back-button.component';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
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

@Component({
  selector: 'app-inventory-stock-flow',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReportPeriodSelectorComponent,
    EmptyStageComponent,
    BackButtonComponent,
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
  productId = '';
  search = '';

  locations = signal<InventoryLocationFiscal[]>([]);
  summary = signal<StockFlowSummaryRow[]>([]);
  totalized = signal<StockFlowTotalizedRow[]>([]);
  ledger = signal<StockFlowLedgerRow[]>([]);
  filtersApplied = signal<StockFlowFiltersApplied | null>(null);
  loading = signal(false);
  exporting = signal(false);

  readonly emptyParams = {
    icon_size: 28,
    row_gap: 12,
    width: 52,
    height: 52,
    wrapper_icon_circle: true,
  };

  branchOptions = computed(() => {
    const fiscal = this.locations().find((f) => f.id === this.fiscalConfigurationId);
    return fiscal?.branches ?? [];
  });

  /** Pie tipo TOTAL GLOBAL del totalizado */
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
    private readonly toast: ToastService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
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
    this.loadReport();
  }

  onPeriodChange(period: ReportPeriod): void {
    this.datePreset = period as StockFlowPeriod;
    if (period !== 'range') {
      this.customDateFrom = '';
      this.customDateTo = '';
    }
    this.loadReport();
  }

  onRangeChange(range: { dateFrom: string; dateTo: string }): void {
    this.datePreset = 'range';
    this.customDateFrom = range.dateFrom;
    this.customDateTo = range.dateTo;
    this.loadReport();
  }

  onFiscalChange(): void {
    this.billingBranchId = '';
    this.loadReport();
  }

  onBranchChange(): void {
    this.loadReport();
  }

  onSearch(): void {
    if (this.view === 'totalized') return;
    this.loadReport();
  }

  clearProductFilter(): void {
    this.productId = '';
    this.loadReport();
  }

  openLedgerForProduct(row: StockFlowSummaryRow): void {
    this.productId = row.product_id;
    this.billingBranchId = row.billing_branch_id;
    this.view = 'ledger';
    this.loadReport();
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
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.summary.set([]);
        this.totalized.set([]);
        this.ledger.set([]);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el reporte'));
      },
    });
  }

  downloadExcel(): void {
    if (this.rangeIncomplete || this.fiscalRequired || this.exporting()) return;
    this.exporting.set(true);
    this.stockFlowService.exportExcel(this.currentQuery()).subscribe({
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

  private currentQuery(): StockFlowQueryParams {
    return {
      period: this.datePreset,
      view: this.view,
      date_from: this.customDateFrom || undefined,
      date_to: this.customDateTo || undefined,
      fiscal_configuration_id: this.fiscalConfigurationId,
      billing_branch_id: this.billingBranchId || undefined,
      product_id: this.view === 'totalized' ? undefined : this.productId || undefined,
      search: this.view === 'totalized' ? undefined : this.search.trim() || undefined,
    };
  }
}
