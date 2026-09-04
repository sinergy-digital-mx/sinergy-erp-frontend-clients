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
    const viewLabel = this.view === 'ledger' ? 'Flujo detallado' : 'Resumen';
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
        this.ledger.set(res.ledger ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.summary.set([]);
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

  formatQty(value: string | null | undefined): string {
    if (value == null || value === '') return '—';
    const n = parseFloat(value);
    if (!Number.isFinite(n)) return value;
    return n.toLocaleString('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
  }

  formatDate(iso: string): string {
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
      product_id: this.productId || undefined,
      search: this.search.trim() || undefined,
    };
  }
}
