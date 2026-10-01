import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CustomerPurchaseTrend, CustomerService } from '../../../../core/services/customer.service';

const purchaseTrendGlow = {
  id: 'purchaseTrendGlow',
  beforeDatasetsDraw(chart: { ctx: CanvasRenderingContext2D }) {
    chart.ctx.save();
    chart.ctx.shadowColor = 'rgba(79, 70, 229, 0.28)';
    chart.ctx.shadowBlur = 18;
    chart.ctx.shadowOffsetY = 8;
  },
  afterDatasetsDraw(chart: { ctx: CanvasRenderingContext2D }) {
    chart.ctx.restore();
  },
};

@Component({
  selector: 'app-customer-purchase-trend',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './customer-purchase-trend.component.html',
  styleUrl: './customer-purchase-trend.component.scss',
})
export class CustomerPurchaseTrendComponent implements OnChanges {
  @Input({ required: true }) customerId!: number | string;

  trend = signal<CustomerPurchaseTrend | null>(null);
  chartData = signal<Record<string, unknown> | null>(null);
  loading = signal(false);
  error = signal(false);

  chartOptions = signal(this.createChartOptions(1));
  readonly chartPlugins = [purchaseTrendGlow];

  private months: CustomerPurchaseTrend['months'] = [];
  private requestId = 0;

  constructor(private customerService: CustomerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerId'] && this.customerId != null && this.customerId !== '') {
      this.load();
    }
  }

  load(): void {
    const requestId = ++this.requestId;
    this.loading.set(true);
    this.error.set(false);

    this.customerService.getCustomerPurchaseTrend(String(this.customerId)).subscribe({
      next: (trend) => {
        if (requestId !== this.requestId) return;
        this.months = trend.months ?? [];
        this.trend.set(trend);
        const peak = Math.max(0, ...this.months.map((month) => month.total));
        this.chartOptions.set(this.createChartOptions(peak));
        this.chartData.set(this.createChartData(this.months));
        this.loading.set(false);
      },
      error: () => {
        if (requestId !== this.requestId) return;
        this.trend.set(null);
        this.chartData.set(null);
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  formatMoney(value: number | null | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value ?? 0));
  }

  ordersLabel(count: number): string {
    return `${count} ${count === 1 ? 'orden' : 'órdenes'}`;
  }

  peakLabel(): string | null {
    const months = this.trend()?.months ?? [];
    const peak = months.reduce<CustomerPurchaseTrend['months'][number] | null>(
      (best, month) => (!best || month.total > best.total ? month : best),
      null,
    );
    if (!peak || peak.total <= 0) return null;
    return peak.label;
  }

  /** Variación del mes en curso contra el anterior. */
  monthDelta(): { text: string; up: boolean } | null {
    const months = this.trend()?.months ?? [];
    if (months.length < 2) return null;
    const current = months[months.length - 1];
    const previous = months[months.length - 2];
    if (previous.total <= 0) return null;
    const pct = ((current.total - previous.total) / previous.total) * 100;
    const rounded = Math.abs(pct).toLocaleString('es-MX', { maximumFractionDigits: 0 });
    return {
      text: `${pct >= 0 ? '+' : '−'}${rounded}% vs ${previous.label}`,
      up: pct >= 0,
    };
  }

  private createChartData(months: CustomerPurchaseTrend['months']) {
    const last = months.length - 1;
    return {
      labels: months.map((month) => month.label),
      datasets: [
        {
          label: 'Compras',
          data: months.map((month) => month.total),
          borderColor: (context: { chart: ChartLike }) => this.lineStroke(context.chart),
          backgroundColor: (context: { chart: ChartLike }) => this.areaFill(context.chart),
          borderWidth: 3,
          tension: 0.5,
          fill: true,
          pointRadius: months.map((_, index) => (index === last ? 5 : 0)),
          pointHoverRadius: 6,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#4f46e5',
          pointBorderWidth: 2.5,
          pointHoverBackgroundColor: '#4f46e5',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
        },
      ],
    };
  }

  private createChartOptions(peak: number) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      animation: { duration: 900, easing: 'easeOutQuart' },
      layout: { padding: { top: 8, right: 8, left: 4, bottom: 8 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(30, 27, 75, 0.94)',
          titleColor: '#e0e7ff',
          bodyColor: '#ffffff',
          padding: 12,
          cornerRadius: 12,
          displayColors: false,
          caretPadding: 8,
          callbacks: {
            title: (items: Array<{ dataIndex: number }>) =>
              this.months[items[0]?.dataIndex]?.label ?? '',
            label: (item: { dataIndex: number; parsed: { y: number } }) => {
              const month = this.months[item.dataIndex];
              return ` ${this.formatMoney(item.parsed.y)} · ${this.ordersLabel(month?.orders_count ?? 0)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#94a3b8',
            font: { size: 11, weight: '500' },
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 8,
          },
        },
        y: {
          beginAtZero: true,
          ...(peak === 0 ? { suggestedMax: 1 } : {}),
          grid: { color: 'rgba(148, 163, 184, 0.16)', drawTicks: false },
          border: { display: false },
          ticks: {
            color: '#94a3b8',
            font: { size: 11 },
            padding: 10,
            maxTicksLimit: 4,
            callback: (value: string | number) => this.compactMoney(Number(value)),
          },
        },
      },
    };
  }

  private areaFill(chart: ChartLike): CanvasGradient | string {
    const { ctx, chartArea } = chart;
    if (!chartArea) return 'rgba(99, 102, 241, 0.18)';
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.42)');
    gradient.addColorStop(0.42, 'rgba(129, 140, 248, 0.16)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
    return gradient;
  }

  private lineStroke(chart: ChartLike): CanvasGradient | string {
    const { ctx, chartArea } = chart;
    if (!chartArea) return '#4f46e5';
    const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    gradient.addColorStop(0, '#a5b4fc');
    gradient.addColorStop(0.45, '#6366f1');
    gradient.addColorStop(1, '#4338ca');
    return gradient;
  }

  private compactMoney(value: number): string {
    const abs = Math.abs(value);
    if (abs >= 1_000_000) {
      return `$${(value / 1_000_000).toLocaleString('es-MX', { maximumFractionDigits: 1 })}M`;
    }
    if (abs >= 10_000) {
      return `$${(value / 1_000).toLocaleString('es-MX', { maximumFractionDigits: 1 })}k`;
    }
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(value);
  }
}

interface ChartLike {
  ctx: CanvasRenderingContext2D;
  chartArea?: { top: number; bottom: number; left: number; right: number };
}
