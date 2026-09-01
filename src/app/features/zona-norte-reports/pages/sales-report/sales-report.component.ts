import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import {
  ReportPeriod,
  ReportPeriodSelectorComponent,
} from '../../../../core/components/report-period-selector/report-period-selector.component';
import { ToastService } from '../../../../core/services/toast.service';
import { SalesReportService } from '../../services/sales-report.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { BranchService } from '../../../settings/services/branch.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Branch } from '../../../settings/models/branch.model';
import { SellerOrdersDialogComponent } from '../../components/seller-orders-dialog/seller-orders-dialog.component';
import {
  SalesGoalMetricType,
  SalesReportApiRow,
  SalesReportFiltersApplied,
  SalesReportGoals,
  SalesReportPeriod,
  SalesReportQueryParams,
  SalesReportSummary,
  SalesReportSummaryBranch,
  SalesReportView,
  SellerSalesRow,
} from '../../models/sales-report.model';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatatableWrapperComponent,
    ReportPeriodSelectorComponent,
    EmptyStageComponent,
  ],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss',
})
export class SalesReportComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  view: SalesReportView = 'sales';
  datePreset: SalesReportPeriod = 'month';
  customDateFrom = '';
  customDateTo = '';
  fiscalConfigurationId = '';
  billingBranchId = '';

  fiscalConfigurations: FiscalConfiguration[] = [];
  branches: Branch[] = [];

  summary = signal<SalesReportSummary | null>(null);
  goals = signal<SalesReportGoals | null>(null);
  filtersApplied = signal<SalesReportFiltersApplied | null>(null);
  viewLabel = signal('Ventas por vendedor');
  exporting = signal(false);

  readonly emptyParams = {
    icon_size: 28,
    row_gap: 12,
    width: 52,
    height: 52,
    wrapper_icon_circle: true,
  };

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: this.buildColumns('sales'),
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: this.buildEmptyState('Ventas por vendedor'),
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private salesReportService: SalesReportService,
    private fiscalConfigService: FiscalConfigurationService,
    private branchService: BranchService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadFiscalConfigurations();
    this.loadBranches();
    this.loadReport();
  }

  get rangeIncomplete(): boolean {
    return this.datePreset === 'range' && (!this.customDateFrom || !this.customDateTo);
  }

  get subtitle(): string {
    const viewLabel = this.viewLabel();
    const periodLabel = this.filtersApplied()?.period_label?.trim();
    if (viewLabel && periodLabel) {
      return `${viewLabel} · ${periodLabel}`;
    }
    return viewLabel || periodLabel || 'Zona Norte';
  }

  get peopleLabel(): string {
    return this.summary()?.people_label?.trim() || (this.view === 'commissions' ? 'Comisionados' : 'Vendedores');
  }

  get peopleCount(): number {
    const s = this.summary();
    return s?.people_count ?? s?.total_sellers ?? 0;
  }

  get emptyTitle(): string {
    return `Sin ${this.viewLabel().toLowerCase()} en este periodo.`;
  }

  get emptySubtitle(): string {
    return this.billingBranchId ? 'Prueba otro rango o todas las sucursales.' : 'Prueba otro rango.';
  }

  get branchBars(): SalesReportSummaryBranch[] {
    return this.summary()?.branches ?? [];
  }

  setView(view: SalesReportView): void {
    if (this.view === view) {
      return;
    }
    this.view = view;
    this.loadReport();
  }

  onPeriodChange(preset: ReportPeriod): void {
    this.datePreset = preset;
    if (preset === 'range') {
      return;
    }
    this.customDateFrom = '';
    this.customDateTo = '';
    this.loadReport();
  }

  onRangeChange(range: { dateFrom: string; dateTo: string }): void {
    this.customDateFrom = range.dateFrom;
    this.customDateTo = range.dateTo;
    this.datePreset = 'range';
    this.loadReport();
  }

  onFiscalConfigChange(): void {
    this.billingBranchId = '';
    this.loadBranches(this.fiscalConfigurationId || undefined);
    this.loadReport();
  }

  onTryAnotherRange(): void {
    const to = this.startOfDay(new Date());
    const from = new Date(to);
    from.setDate(from.getDate() - 30);
    this.datePreset = 'range';
    this.customDateFrom = this.toInputDate(from);
    this.customDateTo = this.toInputDate(to);
    this.loadReport();
  }

  clearBranchFilter(): void {
    this.billingBranchId = '';
    this.loadReport();
  }

  onTableRowClick(event: { data?: SellerSalesRow }): void {
    if (event?.data) {
      this.openSellerOrders(event.data);
    }
  }

  openSellerOrders(row: SellerSalesRow): void {
    if (!row.sellerId || !row.billingBranchId || this.rangeIncomplete) {
      return;
    }

    const query = this.currentQuery();
    this.dialog.open(SellerOrdersDialogComponent, {
      width: '1120px',
      maxWidth: '95vw',
      data: {
        view: this.view,
        sellerId: row.sellerId,
        sellerDisplayName: row.sellerDisplayName,
        billingBranchId: row.billingBranchId,
        branchName: row.branchName || row.branchCode,
        period: query.period,
        fiscalConfigurationId: query.fiscal_configuration_id,
        dateFrom: query.date_from,
        dateTo: query.date_to,
        salesCount: row.salesCount,
      },
    });
  }

  downloadExcel(): void {
    if (this.rangeIncomplete || this.exporting()) {
      return;
    }

    this.exporting.set(true);
    this.salesReportService.exportBySellerExcel(this.currentQuery()).subscribe({
      next: ({ blob, filename }) => {
        triggerBrowserDownload(blob, filename);
        this.exporting.set(false);
      },
      error: (err: Error) => {
        this.exporting.set(false);
        this.toast.error(err.message || 'No se pudo descargar el Excel');
      },
    });
  }

  loadReport(): void {
    if (this.rangeIncomplete) {
      return;
    }

    this.table_config.update((c) => ({ ...c, loading: true }));

    this.salesReportService.getBySeller(this.currentQuery()).subscribe({
      next: (res) => {
        if (res.view === 'sales' || res.view === 'commissions') {
          this.view = res.view;
        }
        this.summary.set(res.summary);
        this.goals.set(res.goals ?? null);
        this.filtersApplied.set(res.filters_applied ?? null);
        const viewLabel = res.view_label?.trim() || this.defaultViewLabel(this.view);
        this.viewLabel.set(viewLabel);
        const rows = (res.rows ?? []).map((r) => this.mapRow(r));
        this.table_config.update((c) => ({
          ...c,
          columns: this.buildColumns(this.view),
          rows,
          totalResults: this.peopleCount,
          loading: false,
          emptyState: this.buildEmptyState(viewLabel),
        }));
      },
      error: () => {
        this.summary.set(null);
        this.goals.set(null);
        this.filtersApplied.set(null);
        this.viewLabel.set(this.defaultViewLabel(this.view));
        this.table_config.update((c) => ({
          ...c,
          columns: this.buildColumns(this.view),
          rows: [],
          totalResults: 0,
          loading: false,
          emptyState: this.buildEmptyState(this.viewLabel()),
        }));
      },
    });
  }

  branchLabel(b: Branch): string {
    return b.display_name?.trim() || `${b.city} (${b.code})`;
  }

  branchBarWidth(branch: SalesReportSummaryBranch): number {
    const max = Math.max(...this.branchBars.map((b) => b.amount || 0), 0);
    if (max <= 0) {
      return 0;
    }
    return Math.min(100, Math.round(((branch.amount || 0) / max) * 10000) / 100);
  }

  formatCurrency(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(Number(value))) {
      return '—';
    }
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));
  }

  formatGoalValue(value: number, metricType: SalesGoalMetricType): string {
    if (metricType === 'sales_count') {
      return `${new Intl.NumberFormat('es-MX').format(value)} ventas`;
    }
    return this.formatCurrency(value);
  }

  formatProgressPct(value: number, withParens = false): string {
    const formatted = `${this.roundProgress(value)}%`;
    return withParens ? `(${formatted})` : formatted;
  }

  progressWidth(value: number): number {
    return Math.min(Math.max(this.roundProgress(value), 0), 100);
  }

  progressColor(pct: number): 'success' | 'warning' | 'danger' {
    const value = this.roundProgress(pct);
    if (value >= 70) return 'success';
    if (value >= 30) return 'warning';
    return 'danger';
  }

  private currentQuery(): SalesReportQueryParams {
    return {
      view: this.view,
      period: this.datePreset,
      fiscal_configuration_id: this.fiscalConfigurationId || undefined,
      billing_branch_id: this.billingBranchId || undefined,
      date_from: this.datePreset === 'range' ? this.customDateFrom : undefined,
      date_to: this.datePreset === 'range' ? this.customDateTo : undefined,
    };
  }

  private defaultViewLabel(view: SalesReportView): string {
    return view === 'commissions' ? 'Comisiones por comisionado' : 'Ventas por vendedor';
  }

  private buildEmptyState(viewLabel: string) {
    return {
      title: `Sin ${viewLabel.toLowerCase()} en este periodo.`,
      subtitle: 'Prueba otro rango o todas las sucursales.',
    };
  }

  private roundProgress(value: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.round(value * 100) / 100;
  }

  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private startOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  private loadFiscalConfigurations(): void {
    this.fiscalConfigService.listFiscalConfigurations({ status: 'active', limit: 100 }).subscribe({
      next: (res) => {
        this.fiscalConfigurations = res.data ?? [];
      },
      error: () => {
        this.fiscalConfigurations = [];
      },
    });
  }

  private loadBranches(fiscalConfigId?: string): void {
    const request$ = fiscalConfigId
      ? this.branchService.getBranches(fiscalConfigId)
      : this.branchService.getAllBranches();

    request$.subscribe({
      next: (branches) => {
        this.branches = branches ?? [];
      },
      error: () => {
        this.branches = [];
      },
    });
  }

  private buildColumns(view: SalesReportView) {
    const personLabel = view === 'commissions' ? 'Comisionado' : 'Vendedor';
    const extra =
      view === 'commissions'
        ? { name: 'Comisión', prop: 'commission', sortable: false, canAutoResize: false, width: 140 }
        : { name: 'Ticket', prop: 'ticket', sortable: false, canAutoResize: false, width: 120 };

    return [
      { name: 'Sucursal', prop: 'branch', sortable: false, canAutoResize: false, width: 180 },
      { name: personLabel, prop: 'seller', sortable: false, canAutoResize: false, width: 200 },
      { name: 'Ventas', prop: 'salesCount', sortable: false, canAutoResize: false, width: 90 },
      { name: 'Monto', prop: 'totalSold', sortable: false, canAutoResize: false, width: 120 },
      extra,
      { name: 'Meta', prop: 'goal', sortable: false, canAutoResize: false, width: 200 },
    ];
  }

  private mapRow(r: SalesReportApiRow): SellerSalesRow {
    const posCode = r.seller_pos_user_code ?? null;
    const sellerName = r.seller_name?.trim() || 'Sin nombre';
    const sellerDisplayName =
      posCode != null && String(posCode).trim() !== '' ? `${sellerName} (${posCode})` : sellerName;

    const goal = r.goal;
    const hasGoal = !!goal?.has_goal;
    const initials =
      r.branch_initials?.trim() ||
      (r.branch_code || r.branch_name || '?')
        .replace(/[^A-Za-z0-9]/g, '')
        .slice(0, 2)
        .toUpperCase();

    return {
      billingBranchId: r.billing_branch_id,
      branchCode: r.branch_code,
      branchName: r.branch_name,
      branchInitials: initials || '—',
      sellerId: r.seller_id,
      sellerName,
      sellerPosUserCode: posCode,
      sellerDisplayName,
      salesCount: r.total_sales_count,
      averageTicket: r.average_ticket ?? null,
      commissionRatePct: r.commission_percentage ?? null,
      commissionAmount: r.commission_amount ?? null,
      totalSold: r.amount_sold,
      hasGoal,
      goalMetricType: hasGoal ? (goal?.metric_type ?? null) : null,
      goalTargetValue: hasGoal ? (goal?.target_value ?? null) : null,
      goalCurrentValue: hasGoal ? (goal?.current_value ?? null) : null,
      goalProgressPct: hasGoal ? (goal?.progress_percentage ?? null) : null,
    };
  }
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
