import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import {
  ReportPeriod,
  ReportPeriodSelectorComponent,
} from '../../../../core/components/report-period-selector/report-period-selector.component';
import { SalesReportService } from '../../services/sales-report.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { BranchService } from '../../../settings/services/branch.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Branch } from '../../../settings/models/branch.model';
import {
  SellerOrdersDialogComponent,
} from '../../components/seller-orders-dialog/seller-orders-dialog.component';
import {
  SalesGoalMetricType,
  SalesReportApiRow,
  SalesReportGoals,
  SalesReportPeriod,
  SalesReportSummary,
  SellerSalesRow,
} from '../../models/sales-report.model';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule, DatatableWrapperComponent, ReportPeriodSelectorComponent],
  template: `
    <div class="purchase-order-list-container">
      <div class="purchase-content">
        <div class="px-4 pb-8">
          <div class="zn-report-header mb-5">
            <div>
              <h2 class="text-2xl font-semibold text-gray-800">Reporte de Ventas - Zona Norte</h2>
              <p class="text-sm text-gray-600 mt-1">Desempeño por vendedor y sucursal</p>
            </div>

            <app-report-period-selector
              [period]="datePreset"
              [dateFrom]="customDateFrom"
              [dateTo]="customDateTo"
              [includeYear]="true"
              dateFromId="zn-date-from"
              dateToId="zn-date-to"
              ariaLabel="Periodo del reporte"
              (periodChange)="onPeriodChange($event)"
              (rangeChange)="onRangeChange($event)" />
          </div>

          <div class="zn-filters mb-5">
            <div class="zn-filters__panel">
              <div class="zn-filters__field">
                <label class="zn-filters__label" for="zn-fiscal-config">Razón social</label>
                <select
                  id="zn-fiscal-config"
                  class="zn-filters__select"
                  [(ngModel)]="fiscalConfigurationId"
                  (change)="onFiscalConfigChange()"
                  aria-label="Filtrar por razón social">
                  <option value="">Todas las razones sociales</option>
                  @for (fc of fiscalConfigurations; track fc.id) {
                    <option [value]="fc.id">{{ fc.razon_social }}</option>
                  }
                </select>
              </div>
              <div class="zn-filters__field">
                <label class="zn-filters__label" for="zn-branch">Sucursal</label>
                <select
                  id="zn-branch"
                  class="zn-filters__select"
                  [(ngModel)]="billingBranchId"
                  (change)="loadReport()"
                  aria-label="Filtrar por sucursal">
                  <option value="">Todas las sucursales</option>
                  @for (b of branches; track b.id) {
                    <option [value]="b.id">{{ branchLabel(b) }}</option>
                  }
                </select>
              </div>
            </div>
          </div>

          @if (goals(); as g) {
            @if (!g.has_active_goals && g.message) {
              <div class="zn-goals-banner mb-5" role="status">
                <i class="fi fi-rr-info" aria-hidden="true"></i>
                <span>{{ g.message }}</span>
              </div>
            }

            @if (g.branch_goal; as branchGoal) {
              <div class="zn-branch-goal mb-5">
                <div class="zn-branch-goal__header">
                  <div>
                    <p class="zn-branch-goal__title">Meta sucursal</p>
                    <p class="zn-branch-goal__branch">{{ branchGoal.branch_name }}</p>
                  </div>
                  <div class="zn-branch-goal__values">
                    <span class="zn-branch-goal__current">
                      {{ formatGoalValue(branchGoal.current_value, branchGoal.metric_type) }}
                    </span>
                    <span class="zn-branch-goal__sep">/</span>
                    <span class="zn-branch-goal__target">
                      {{ formatGoalValue(branchGoal.target_value, branchGoal.metric_type) }}
                    </span>
                    <span class="zn-branch-goal__pct">
                      ({{ formatProgressPct(branchGoal.progress_percentage) }})
                    </span>
                  </div>
                </div>
                <div class="zn-progress" aria-hidden="true">
                  <div
                    class="zn-progress__fill zn-progress__fill--{{ progressColor(branchGoal.progress_percentage) }}"
                    [style.width.%]="progressWidth(branchGoal.progress_percentage)">
                  </div>
                </div>
              </div>
            }
          }

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-violet-600">Vendedores</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ summary()?.total_sellers ?? 0 }}</p>
            </div>
            <div class="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-emerald-600">Ventas acumuladas</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ summary()?.total_sales_count ?? 0 }}</p>
            </div>
            <div class="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-amber-700">Monto total</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ formatCurrency(summary()?.total_amount ?? 0) }}
              </p>
            </div>
          </div>

          <app-datatable-wrapper
            [config]="table_config()"
            [rowTemplate]="tableTemplate">
          </app-datatable-wrapper>
        </div>
      </div>
    </div>

    <ng-template #tableTemplate let-item="$implicit">
      <td class="px-2 py-2">
        <span class="inline-flex items-center w-fit px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-800">
          {{ item.branchCode }}
        </span>
      </td>
      <td class="px-2 py-2">
        <button
          type="button"
          class="zn-seller-link"
          (click)="openSellerOrders(item); $event.stopPropagation()">
          {{ item.sellerDisplayName }}
        </button>
      </td>
      <td class="px-2 py-2">
        <span class="inline-flex items-center justify-center min-w-[2.5rem] px-2 py-0.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-800">
          {{ item.salesCount }}
        </span>
      </td>
      <td class="px-2 py-2">
        <div class="flex flex-col">
          <span class="text-xs text-gray-500">{{ item.commissionRatePct }}% del monto</span>
          <span class="text-sm font-semibold text-emerald-700">{{ formatCurrency(item.commissionAmount) }}</span>
        </div>
      </td>
      <td class="px-2 py-2">
        <p class="text-sm font-semibold text-gray-900 m-0">{{ formatCurrency(item.totalSold) }}</p>
      </td>
      <td class="px-2 py-2">
        @if (item.hasGoal && item.goalTargetValue != null) {
          <div class="zn-row-goal">
            <div class="zn-row-goal__values">
              <span class="zn-row-goal__current">
                {{ formatGoalValue(item.goalCurrentValue ?? 0, item.goalMetricType ?? 'amount') }}
              </span>
              <span class="zn-row-goal__sep">/</span>
              <span class="zn-row-goal__target">
                {{ formatGoalValue(item.goalTargetValue, item.goalMetricType ?? 'amount') }}
              </span>
              @if (item.goalProgressPct != null) {
                <span class="zn-row-goal__pct">{{ formatProgressPct(item.goalProgressPct, false) }}</span>
              }
            </div>
            @if (item.goalProgressPct != null) {
              <div class="zn-progress zn-progress--row" aria-hidden="true">
                <div
                  class="zn-progress__fill zn-progress__fill--{{ progressColor(item.goalProgressPct) }}"
                  [style.width.%]="progressWidth(item.goalProgressPct)">
                </div>
              </div>
            }
          </div>
        } @else {
          <span class="text-xs text-gray-400">—</span>
        }
      </td>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
      .zn-report-header {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem 1.5rem;
      }
      .zn-filters__panel {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem 1rem;
        max-width: 42rem;
      }
      .zn-filters__field {
        min-width: 0;
      }
      .zn-filters__label {
        display: block;
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        color: #64748b;
        margin-bottom: 0.35rem;
      }
      .zn-filters__select {
        width: 100%;
        min-height: 2.5rem;
        padding: 0.5rem 2.25rem 0.5rem 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        font-size: 0.8125rem;
        font-weight: 500;
        color: #334155;
        background: #fff;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.65rem center;
        background-size: 16px;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .zn-filters__select:hover {
        border-color: #cbd5e1;
      }
      .zn-filters__select:focus {
        outline: none;
        border-color: #a5b4fc;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
      .zn-goals-banner {
        display: flex;
        align-items: flex-start;
        gap: 0.65rem;
        padding: 0.875rem 1rem;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        background: #f8fafc;
        color: #475569;
        font-size: 0.875rem;
        line-height: 1.4;
      }
      .zn-goals-banner i {
        margin-top: 0.1rem;
        color: #64748b;
        flex-shrink: 0;
      }
      .zn-branch-goal {
        padding: 1rem 1.125rem;
        border-radius: 14px;
        border: 1px solid #ddd6fe;
        background: linear-gradient(135deg, #f5f3ff 0%, #ffffff 70%);
      }
      .zn-branch-goal__header {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
        gap: 0.75rem 1rem;
        margin-bottom: 0.75rem;
      }
      .zn-branch-goal__title {
        margin: 0;
        font-size: 0.6875rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #7c3aed;
      }
      .zn-branch-goal__branch {
        margin: 0.2rem 0 0;
        font-size: 0.9375rem;
        font-weight: 600;
        color: #1e1b4b;
      }
      .zn-branch-goal__values {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.25rem;
        font-size: 0.875rem;
        color: #475569;
      }
      .zn-branch-goal__current {
        font-weight: 700;
        color: #0f172a;
      }
      .zn-branch-goal__sep {
        color: #94a3b8;
      }
      .zn-branch-goal__pct {
        margin-left: 0.15rem;
        font-weight: 600;
        color: #7c3aed;
      }
      .zn-progress {
        height: 0.55rem;
        background: #e2e8f0;
        border-radius: 9999px;
        overflow: hidden;
      }
      .zn-progress--row {
        width: 100%;
        height: 0.45rem;
        min-width: 0;
      }
      .zn-progress__fill {
        height: 100%;
        border-radius: 9999px;
        transition: width 0.2s ease;
      }
      .zn-progress__fill--success {
        background: #22c55e;
      }
      .zn-progress__fill--warning {
        background: #eab308;
      }
      .zn-progress__fill--danger {
        background: #ef4444;
      }
      .zn-row-goal {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        min-width: 10rem;
      }
      .zn-row-goal__values {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 0.2rem;
        font-size: 0.75rem;
        line-height: 1.2;
        color: #475569;
      }
      .zn-row-goal__current {
        font-weight: 700;
        color: #0f172a;
      }
      .zn-row-goal__sep {
        color: #94a3b8;
      }
      .zn-row-goal__target {
        font-weight: 600;
        color: #334155;
      }
      .zn-row-goal__pct {
        margin-left: 0.15rem;
        font-weight: 600;
        color: #7c3aed;
      }
      .zn-seller-link {
        border: none;
        background: transparent;
        padding: 0;
        margin: 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: #4f46e5;
        cursor: pointer;
        text-align: left;
      }
      .zn-seller-link:hover {
        text-decoration: underline;
      }
      @media (max-width: 640px) {
        .zn-filters__panel {
          grid-template-columns: 1fr;
          max-width: 100%;
        }
      }
    `,
  ],
})
export class SalesReportComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  datePreset: SalesReportPeriod = 'month';
  customDateFrom = '';
  customDateTo = '';
  fiscalConfigurationId = '';
  billingBranchId = '';

  fiscalConfigurations: FiscalConfiguration[] = [];
  branches: Branch[] = [];

  summary = signal<SalesReportSummary | null>(null);
  goals = signal<SalesReportGoals | null>(null);

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Sucursal', prop: 'branch', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Vendedor', prop: 'seller', sortable: false, canAutoResize: false, width: 200 },
      { name: 'Total ventas', prop: 'salesCount', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Comisión', prop: 'commission', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Monto vendido', prop: 'totalSold', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Meta', prop: 'goal', sortable: false, canAutoResize: false, width: 200 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin datos', subtitle: 'No hay ventas para el periodo seleccionado' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private salesReportService: SalesReportService,
    private fiscalConfigService: FiscalConfigurationService,
    private branchService: BranchService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.applyMonthRange(new Date().getMonth());
    this.loadFiscalConfigurations();
    this.loadBranches();
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

  /** Rango calendario del mes (1 → último día o hoy si es el mes en curso). */
  private applyMonthRange(monthIndex: number): void {
    const now = new Date();
    const year = now.getFullYear();
    const from = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const to = lastDay > today ? today : lastDay;
    this.datePreset = 'range';
    this.customDateFrom = this.toInputDate(from);
    this.customDateTo = this.toInputDate(to);
  }

  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  onFiscalConfigChange(): void {
    this.billingBranchId = '';
    this.loadBranches(this.fiscalConfigurationId || undefined);
    this.loadReport();
  }

  openSellerOrders(row: SellerSalesRow): void {
    if (!row.sellerId || !row.billingBranchId) {
      return;
    }

    if (this.datePreset === 'range' && (!this.customDateFrom || !this.customDateTo)) {
      return;
    }

    this.dialog.open(SellerOrdersDialogComponent, {
      width: '920px',
      maxWidth: '95vw',
      data: {
        sellerId: row.sellerId,
        sellerDisplayName: row.sellerDisplayName,
        billingBranchId: row.billingBranchId,
        branchName: row.branchName || row.branchCode,
        period: this.datePreset,
        fiscalConfigurationId: this.fiscalConfigurationId || undefined,
        dateFrom: this.datePreset === 'range' ? this.customDateFrom : undefined,
        dateTo: this.datePreset === 'range' ? this.customDateTo : undefined,
        salesCount: row.salesCount,
      },
    });
  }

  loadReport(): void {
    if (this.datePreset === 'range' && (!this.customDateFrom || !this.customDateTo)) {
      return;
    }

    this.table_config.update((c) => ({ ...c, loading: true }));

    this.salesReportService
      .getBySeller({
        period: this.datePreset,
        fiscal_configuration_id: this.fiscalConfigurationId || undefined,
        billing_branch_id: this.billingBranchId || undefined,
        date_from: this.datePreset === 'range' ? this.customDateFrom : undefined,
        date_to: this.datePreset === 'range' ? this.customDateTo : undefined,
      })
      .subscribe({
        next: (res) => {
          this.summary.set(res.summary);
          this.goals.set(res.goals ?? null);
          const commissionRate = res.filters_applied?.commission_rate ?? null;
          // Backend already sorts by competitiveness (progress_percentage DESC).
          const rows = res.rows.map((r) => this.mapRow(r));
          this.table_config.update((c) => ({
            ...c,
            columns: this.buildColumns(commissionRate),
            rows,
            totalResults: res.summary.total_sellers,
            loading: false,
          }));
        },
        error: () => {
          this.summary.set(null);
          this.goals.set(null);
          this.table_config.update((c) => ({
            ...c,
            columns: this.buildColumns(null),
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

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
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

  private roundProgress(value: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.round(value * 100) / 100;
  }

  private loadFiscalConfigurations(): void {
    this.fiscalConfigService
      .listFiscalConfigurations({ status: 'active', limit: 100 })
      .subscribe({
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

  private buildColumns(commissionRate: number | null) {
    const commissionLabel =
      commissionRate != null && Number.isFinite(commissionRate)
        ? `Comisión (${commissionRate}%)`
        : 'Comisión';

    return [
      { name: 'Sucursal', prop: 'branch', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Vendedor', prop: 'seller', sortable: false, canAutoResize: false, width: 200 },
      { name: 'Total ventas', prop: 'salesCount', sortable: false, canAutoResize: false, width: 110 },
      { name: commissionLabel, prop: 'commission', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Monto vendido', prop: 'totalSold', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Meta', prop: 'goal', sortable: false, canAutoResize: false, width: 200 },
    ];
  }

  private mapRow(r: SalesReportApiRow): SellerSalesRow {
    const posCode = r.seller_pos_user_code ?? null;
    const sellerName = r.seller_name?.trim() || 'Sin nombre';
    const sellerDisplayName =
      posCode != null && String(posCode).trim() !== ''
        ? `${sellerName} (${posCode})`
        : sellerName;

    const goal = r.goal;
    const hasGoal = !!goal?.has_goal;

    return {
      billingBranchId: r.billing_branch_id,
      branchCode: r.branch_code,
      branchName: r.branch_name,
      sellerId: r.seller_id,
      sellerName,
      sellerPosUserCode: posCode,
      sellerDisplayName,
      salesCount: r.total_sales_count,
      commissionRatePct: r.commission_percentage,
      commissionAmount: r.commission_amount,
      totalSold: r.amount_sold,
      hasGoal,
      goalMetricType: hasGoal ? (goal?.metric_type ?? null) : null,
      goalTargetValue: hasGoal ? (goal?.target_value ?? null) : null,
      goalCurrentValue: hasGoal ? (goal?.current_value ?? null) : null,
      goalProgressPct: hasGoal ? (goal?.progress_percentage ?? null) : null,
    };
  }
}
