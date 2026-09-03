import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import {
  ReportPeriod,
  ReportPeriodSelectorComponent,
} from '../../../../core/components/report-period-selector/report-period-selector.component';
import { ToastService } from '../../../../core/services/toast.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { BranchService } from '../../../settings/services/branch.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Branch } from '../../../settings/models/branch.model';
import { CustomerSalesReportService } from '../../services/customer-sales-report.service';
import {
  CustomerSalesReportApiRow,
  CustomerSalesReportFiltersApplied,
  CustomerSalesReportPeriod,
  CustomerSalesReportQueryParams,
  CustomerSalesReportSummary,
  CustomerSalesReportSummaryBranch,
  CustomerSalesRow,
} from '../../models/customer-sales-report.model';

@Component({
  selector: 'app-customer-sales-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatatableWrapperComponent,
    ReportPeriodSelectorComponent,
    EmptyStageComponent,
  ],
  templateUrl: './customer-sales-report.component.html',
  styleUrl: './customer-sales-report.component.scss',
})
export class CustomerSalesReportComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  datePreset: CustomerSalesReportPeriod = 'month';
  customDateFrom = '';
  customDateTo = '';
  fiscalConfigurationId = '';
  billingBranchId = '';

  fiscalConfigurations: FiscalConfiguration[] = [];
  branches: Branch[] = [];

  summary = signal<CustomerSalesReportSummary | null>(null);
  filtersApplied = signal<CustomerSalesReportFiltersApplied | null>(null);
  viewLabel = signal('Top de clientes por sucursal / razón social (Ventas y total comprado)');
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
    columns: this.buildColumns(),
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: {
      title: 'Sin top de clientes en este periodo.',
      subtitle: 'Prueba otro rango o todas las sucursales.',
    },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private customerSalesReportService: CustomerSalesReportService,
    private fiscalConfigService: FiscalConfigurationService,
    private branchService: BranchService,
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
    return viewLabel || periodLabel || 'Reporte de ventas clientes';
  }

  get emptyTitle(): string {
    return 'Sin top de clientes en este periodo.';
  }

  get emptySubtitle(): string {
    return this.billingBranchId ? 'Prueba otro rango o todas las sucursales.' : 'Prueba otro rango.';
  }

  get branchBars(): CustomerSalesReportSummaryBranch[] {
    return this.summary()?.branches ?? [];
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

  downloadExcel(): void {
    if (this.rangeIncomplete || this.exporting()) {
      return;
    }

    this.exporting.set(true);
    this.customerSalesReportService.exportExcel(this.currentQuery()).subscribe({
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

    this.customerSalesReportService.getTopCustomers(this.currentQuery()).subscribe({
      next: (res) => {
        this.summary.set(res.summary);
        this.filtersApplied.set(res.filters_applied ?? null);
        this.viewLabel.set(
          res.view_label?.trim() ||
            'Top de clientes por sucursal / razón social (Ventas y total comprado)'
        );
        const rows = (res.rows ?? []).map((r) => this.mapRow(r));
        this.table_config.update((c) => ({
          ...c,
          rows,
          totalResults: res.summary?.customers_count ?? rows.length,
          loading: false,
        }));
      },
      error: () => {
        this.summary.set(null);
        this.filtersApplied.set(null);
        this.table_config.update((c) => ({
          ...c,
          rows: [],
          totalResults: 0,
          loading: false,
        }));
      },
    });
  }

  branchLabel(b: Branch): string {
    return b.display_name?.trim() || `${b.city} (${b.code})`;
  }

  branchBarWidth(branch: CustomerSalesReportSummaryBranch): number {
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

  private currentQuery(): CustomerSalesReportQueryParams {
    return {
      period: this.datePreset,
      fiscal_configuration_id: this.fiscalConfigurationId || undefined,
      billing_branch_id: this.billingBranchId || undefined,
      date_from: this.datePreset === 'range' ? this.customDateFrom : undefined,
      date_to: this.datePreset === 'range' ? this.customDateTo : undefined,
    };
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

  private buildColumns() {
    return [
      { name: '#', prop: 'rank', sortable: false, canAutoResize: false, width: 60 },
      { name: 'Cliente', prop: 'customerName', sortable: false, canAutoResize: true, width: 220 },
      { name: 'RFC', prop: 'customerRfc', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Ventas', prop: 'salesCount', sortable: false, canAutoResize: false, width: 90 },
      { name: 'Total comprado', prop: 'totalPurchased', sortable: false, canAutoResize: false, width: 150 },
      { name: 'Ticket', prop: 'averageTicket', sortable: false, canAutoResize: false, width: 130 },
    ];
  }

  private mapRow(r: CustomerSalesReportApiRow): CustomerSalesRow {
    const name = r.customer_name?.trim() || 'Cliente';

    return {
      rank: r.rank,
      customerId: r.customer_id,
      customerName: name,
      customerRfc: r.customer_rfc?.trim() || null,
      salesCount: r.total_sales_count,
      totalPurchased: r.total_purchased,
      averageTicket: r.average_ticket ?? null,
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
