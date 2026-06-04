import { Component, OnInit, signal, TemplateRef, ViewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import {
  LucideAngularModule,
  TrendingUp,
  DollarSign,
  Ruler,
  Home,
  Tag,
  HandCoins,
  Percent,
  ArrowUpDown,
  Banknote,
  CalendarClock,
  Users,
  Loader2,
  AlertCircle,
} from 'lucide-angular';
import { forkJoin } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { DivinoDashboardService } from '../../services/divino-dashboard.service';
import {
  DashboardFilterMode,
  DashboardKpis,
  DashboardQueryParams,
  LeadOriginRow,
  RevenueSeriesPeriod,
  SellerRow,
  YearlyBreakdownRow,
} from '../../models/divino-dashboard.model';

interface KpiCard {
  key: string;
  label: string;
  icon: typeof TrendingUp;
  accent: string;
  format: 'currency' | 'number' | 'area' | 'percent' | 'combo' | 'cashFin';
  valueKey?: keyof DashboardKpis;
  valueKey2?: keyof DashboardKpis;
  semantic?: 'diffPct';
}

const MONTH_LABELS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

@Component({
  selector: 'app-divino-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartModule, LucideAngularModule, DatatableWrapperComponent],
  templateUrl: './divino-dashboard.component.html',
  styleUrl: './divino-dashboard.component.scss',
})
export class DivinoDashboardComponent implements OnInit {
  @ViewChild('sellersTemplate') sellersTemplate!: TemplateRef<unknown>;

  readonly icons = {
    TrendingUp, DollarSign, Ruler, Home, Tag, HandCoins, Percent,
    ArrowUpDown, Banknote, CalendarClock, Users, Loader2, AlertCircle,
  };

  readonly monthOptions = MONTH_LABELS.map((label, i) => ({ value: i + 1, label }));
  readonly yearOptions = this.buildYearOptions();
  readonly periodTabs: { label: string; value: RevenueSeriesPeriod }[] = [
    { label: 'M', value: 'monthly' },
    { label: 'Q', value: 'quarterly' },
    { label: 'S', value: 'semiannual' },
    { label: 'A', value: 'annual' },
  ];

  readonly kpiCards: KpiCard[] = [
    { key: 'avg_m2', label: 'Precio promedio $/m²', icon: TrendingUp, accent: 'indigo', format: 'currency', valueKey: 'avg_price_per_m2' },
    { key: 'total_amount', label: 'Total vendido', icon: DollarSign, accent: 'emerald', format: 'currency', valueKey: 'total_sold_amount' },
    { key: 'total_m2', label: 'Total vendido (m²)', icon: Ruler, accent: 'sky', format: 'area', valueKey: 'total_sold_m2' },
    { key: 'lots', label: 'Lotes vendidos', icon: Home, accent: 'violet', format: 'number', valueKey: 'lots_sold' },
    { key: 'avg_list', label: 'Precio lista promedio', icon: Tag, accent: 'slate', format: 'currency', valueKey: 'avg_list_price' },
    { key: 'avg_close', label: 'Precio cierre promedio', icon: HandCoins, accent: 'blue', format: 'currency', valueKey: 'avg_close_price' },
    { key: 'diff_amount', label: 'Diferencia lista vs cierre', icon: ArrowUpDown, accent: 'amber', format: 'currency', valueKey: 'list_vs_close_diff_amount', semantic: 'diffPct' },
    { key: 'diff_pct', label: 'Diferencia lista vs cierre (%)', icon: Percent, accent: 'rose', format: 'percent', valueKey: 'list_vs_close_diff_pct', semantic: 'diffPct' },
    { key: 'minmax', label: 'Mín / Máx $/m²', icon: TrendingUp, accent: 'cyan', format: 'combo', valueKey: 'min_price_per_m2', valueKey2: 'max_price_per_m2' },
    { key: 'cash_fin', label: 'Contado vs financiado', icon: Banknote, accent: 'teal', format: 'cashFin' },
    { key: 'avg_dp', label: 'Enganche promedio', icon: DollarSign, accent: 'orange', format: 'currency', valueKey: 'avg_down_payment' },
    { key: 'avg_monthly', label: 'Mensualidad promedio', icon: CalendarClock, accent: 'purple', format: 'currency', valueKey: 'avg_monthly_payment' },
  ];

  filterMode = signal<DashboardFilterMode>('month');
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;
  revenuePeriod = signal<RevenueSeriesPeriod>('monthly');

  loading = signal(false);
  error = signal<string | null>(null);
  kpis = signal<DashboardKpis | null>(null);
  yearlyBreakdown = signal<YearlyBreakdownRow[]>([]);
  leadOrigins = signal<LeadOriginRow[]>([]);

  revenueChartData = signal<any>(null);
  trendChartData = signal<any>(null);
  originChartData = signal<any>(null);
  chartOptions = signal<any>(null);
  trendChartOptions = signal<any>(null);
  originChartOptions = signal<any>(null);

  readonly isAllTime = computed(() => this.filterMode() === 'all_time');

  tableConfig = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Vendedor', prop: 'seller_name', sortable: true, canAutoResize: false, width: 220 },
      { name: 'Lotes', prop: 'lots_sold', sortable: true, canAutoResize: false, width: 90 },
      { name: 'Revenue', prop: 'revenue', sortable: true, canAutoResize: false, width: 140 },
      { name: 'm²', prop: 'm2_sold', sortable: true, canAutoResize: false, width: 100 },
      { name: 'Tours', prop: 'tours_count', sortable: true, canAutoResize: false, width: 90 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 100,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin datos', subtitle: 'No hay ventas por vendedor en este periodo' },
    columnMode: 'force',
    reorderable: false,
  });

  periodLabel = computed(() => {
    if (this.filterMode() === 'all_time') {
      return 'Histórico completo';
    }
    if (this.filterMode() === 'month') {
      const m = this.monthOptions.find((o) => o.value === this.selectedMonth);
      return `${m?.label ?? ''} ${this.selectedYear}`;
    }
    return `Año ${this.selectedYear}`;
  });

  revenueChartSubtitle = computed(() =>
    this.isAllTime()
      ? 'Ingresos y lotes por año (histórico)'
      : 'Ingresos y lotes vendidos por periodo',
  );

  constructor(private dashboardService: DivinoDashboardService) {}

  ngOnInit(): void {
    this.initChartOptions();
    this.loadDashboard();
  }

  setFilterMode(mode: DashboardFilterMode): void {
    if (this.filterMode() === mode) return;
    this.filterMode.set(mode);
    this.loadDashboard();
  }

  onYearChange(): void {
    this.loadDashboard();
  }

  onMonthChange(): void {
    this.loadDashboard();
  }

  setRevenuePeriod(period: RevenueSeriesPeriod): void {
    if (this.isAllTime() || this.revenuePeriod() === period) return;
    this.revenuePeriod.set(period);
    this.loadRevenueSeries();
  }

  loadDashboard(): void {
    this.loading.set(true);
    this.error.set(null);

    const params = this.buildQueryParams();

    forkJoin({
      summary: this.dashboardService.getSummary(params),
      sellers: this.dashboardService.getSellers(params),
      leadOrigins: this.dashboardService.getLeadOrigins(params),
      revenue: this.dashboardService.getRevenueSeries(this.buildRevenueParams()),
    }).subscribe({
      next: ({ summary, sellers, leadOrigins, revenue }) => {
        this.kpis.set(summary.kpis);
        const breakdown = [...(summary.yearly_breakdown ?? [])].sort((a, b) => a.year - b.year);
        this.yearlyBreakdown.set(breakdown);
        this.updateSellersTable(sellers.rows);
        this.leadOrigins.set(leadOrigins.rows);
        this.updateOriginChart(leadOrigins.rows);
        this.updateRevenueChart(revenue.series);
        if (this.isAllTime()) {
          this.updateTrendChart(breakdown);
        } else {
          this.trendChartData.set(null);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.kpis.set(null);
        this.yearlyBreakdown.set([]);
        this.leadOrigins.set([]);
        this.updateSellersTable([]);
        this.revenueChartData.set(null);
        this.trendChartData.set(null);
        this.originChartData.set(null);
        const msg = err.status === 403
          ? 'Divino Dashboard no está habilitado para este tenant.'
          : 'No se pudieron cargar los datos del dashboard.';
        this.error.set(msg);
      },
    });
  }

  private loadRevenueSeries(): void {
    this.dashboardService.getRevenueSeries(this.buildRevenueParams()).subscribe({
      next: (res) => this.updateRevenueChart(res.series),
      error: () => this.revenueChartData.set(null),
    });
  }

  private buildQueryParams(): DashboardQueryParams {
    if (this.filterMode() === 'all_time') {
      return { scope: 'all_time' };
    }
    const year = this.selectedYear;
    if (this.filterMode() === 'month') {
      return { scope: 'period', year, month: this.selectedMonth };
    }
    return { scope: 'period', year };
  }

  private buildRevenueParams(): DashboardQueryParams {
    const base = this.buildQueryParams();
    if (base.scope === 'all_time') {
      return base;
    }
    return { ...base, period: this.revenuePeriod() };
  }

  private updateSellersTable(rows: SellerRow[]): void {
    const mapped = rows.map((r) => ({
      ...r,
      seller_name: r.seller_name || 'Sin vendedor',
    }));
    this.tableConfig.update((c) => ({
      ...c,
      rows: mapped,
      totalResults: mapped.length,
      loading: false,
    }));
  }

  private updateRevenueChart(series: { bucket: string; revenue: number; lots_sold: number }[]): void {
    if (!series?.length) {
      this.revenueChartData.set(null);
      return;
    }

    const gradient = '#6366f1';
    this.revenueChartData.set({
      labels: series.map((s) => s.bucket),
      datasets: [
        {
          label: 'Revenue (MXN)',
          data: series.map((s) => s.revenue),
          backgroundColor: 'rgba(99, 102, 241, 0.85)',
          borderColor: gradient,
          borderWidth: 0,
          borderRadius: 8,
          borderSkipped: false,
          yAxisID: 'y',
        },
        {
          label: 'Lotes',
          data: series.map((s) => s.lots_sold),
          type: 'line',
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#10b981',
          tension: 0.35,
          yAxisID: 'y1',
        },
      ],
    });
  }

  private updateTrendChart(rows: YearlyBreakdownRow[]): void {
    if (!rows?.length) {
      this.trendChartData.set(null);
      return;
    }

    this.trendChartData.set({
      labels: rows.map((r) => String(r.year)),
      datasets: [
        {
          label: 'Total vendido',
          data: rows.map((r) => r.total_sold_amount),
          backgroundColor: 'rgba(99, 102, 241, 0.75)',
          borderRadius: 6,
          yAxisID: 'y',
        },
        {
          label: 'Lotes',
          data: rows.map((r) => r.lots_sold),
          type: 'line',
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          borderWidth: 2.5,
          pointRadius: 4,
          tension: 0.3,
          yAxisID: 'y1',
        },
      ],
    });
  }

  private updateOriginChart(rows: LeadOriginRow[]): void {
    if (!rows?.length) {
      this.originChartData.set(null);
      return;
    }

    const palette = [
      '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
      '#06b6d4', '#ef4444', '#84cc16', '#f97316', '#64748b',
    ];

    this.originChartData.set({
      labels: rows.map((r) => r.origin),
      datasets: [
        {
          data: rows.map((r) => r.revenue),
          backgroundColor: rows.map((_, i) => palette[i % palette.length]),
          hoverOffset: 8,
          borderWidth: 0,
        },
      ],
    });
  }

  private initChartOptions(): void {
    this.chartOptions.set({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: { usePointStyle: true, padding: 16, font: { size: 12, weight: '500' } },
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: (ctx: any) => {
              if (ctx.datasetIndex === 0) {
                return ` ${this.formatCurrency(ctx.parsed.y)}`;
              }
              return ` ${ctx.parsed.y} lotes`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 }, color: '#64748b' },
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(148, 163, 184, 0.15)' },
          ticks: {
            color: '#64748b',
            callback: (v: number) => this.formatCompactCurrency(v),
          },
        },
        y1: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#10b981', stepSize: 1 },
        },
      },
    });

    this.originChartOptions.set({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'right',
          labels: { usePointStyle: true, padding: 12, font: { size: 11 } },
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: (ctx: any) => {
              const row = this.leadOrigins()[ctx.dataIndex];
              if (!row) return '';
              return [
                ` Revenue: ${this.formatCurrency(row.revenue)}`,
                ` Ventas: ${row.count}`,
                ` ${row.pct_of_sales.toFixed(1)}% del total`,
              ];
            },
          },
        },
      },
    });

    this.trendChartOptions.set({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: { usePointStyle: true, padding: 12, font: { size: 11 } },
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: (ctx: any) => {
              if (ctx.datasetIndex === 0) {
                return ` Total: ${this.formatCurrency(ctx.parsed.y)}`;
              }
              return ` Lotes: ${ctx.parsed.y}`;
            },
            afterBody: (items: any[]) => {
              const row = this.yearlyBreakdown()[items[0]?.dataIndex];
              if (!row) return [];
              return [
                `m²: ${this.formatNumber(row.total_sold_m2)}`,
                `$/m² prom.: ${this.formatCurrency(row.avg_price_per_m2)}`,
                `Lista prom.: ${this.formatCurrency(row.avg_list_price)}`,
                `Cierre prom.: ${this.formatCurrency(row.avg_close_price)}`,
              ];
            },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#64748b' } },
        y: {
          position: 'left',
          grid: { color: 'rgba(148, 163, 184, 0.12)' },
          ticks: { color: '#64748b', callback: (v: number) => this.formatCompactCurrency(v) },
        },
        y1: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#10b981', stepSize: 1 },
        },
      },
    });
  }

  getKpiValue(card: KpiCard): string {
    const k = this.kpis();
    if (!k) return '—';

    if (card.format === 'combo' && card.valueKey && card.valueKey2) {
      return `${this.formatCurrency(k[card.valueKey])} / ${this.formatCurrency(k[card.valueKey2])}`;
    }

    if (card.format === 'cashFin') {
      return `${k.cash_pct.toFixed(0)}% / ${k.financed_pct.toFixed(0)}%`;
    }

    if (!card.valueKey) return '—';
    const val = k[card.valueKey];

    switch (card.format) {
      case 'currency':
        return this.formatCurrency(val as number);
      case 'area':
        return `${this.formatNumber(val as number)} m²`;
      case 'percent':
        return `${(val as number).toFixed(2)}%`;
      default:
        return String(val ?? '—');
    }
  }

  getKpiSubtext(card: KpiCard): string | null {
    const k = this.kpis();
    if (!k) return null;

    if (card.format === 'cashFin') {
      return `${k.cash_count} contado · ${k.financed_count} financiado`;
    }
    return null;
  }

  isDiffPositive(card: KpiCard): boolean | null {
    if (card.semantic !== 'diffPct') return null;
    const k = this.kpis();
    if (!k) return null;
    return k.list_vs_close_diff_pct > 0;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value ?? 0);
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value ?? 0);
  }

  private formatCompactCurrency(value: number): string {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
  }

  private buildYearOptions(): number[] {
    const current = new Date().getFullYear();
    return Array.from({ length: 8 }, (_, i) => current - i);
  }
}
