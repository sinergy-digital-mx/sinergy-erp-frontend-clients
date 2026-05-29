import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SalesReportService } from '../../services/sales-report.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { BranchService } from '../../../settings/services/branch.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Branch } from '../../../settings/models/branch.model';
import {
  SalesReportPeriod,
  SalesReportSummary,
  SellerSalesRow,
} from '../../models/sales-report.model';

const COMMISSION_RATE = 4.5;

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule, DatatableWrapperComponent],
  template: `
    <div class="purchase-order-list-container">
      <div class="purchase-content">
        <div class="px-4 pb-8">
          <div class="zn-report-header mb-5">
            <div>
              <h2 class="text-2xl font-semibold text-gray-800">Reporte de Ventas - Zona Norte</h2>
              <p class="text-sm text-gray-600 mt-1">Desempeño por vendedor y sucursal</p>
            </div>

            <div class="zn-period-bar" role="search" aria-label="Periodo del reporte">
              <div
                class="zn-period-panel"
                [class.zn-period-panel--range]="datePreset === 'range'">
                <div class="zn-period-toggle" role="group">
                  @for (opt of periodOptions; track opt.value) {
                    <button
                      type="button"
                      class="zn-period-toggle__btn"
                      [class.zn-period-toggle__btn--active]="datePreset === opt.value"
                      [attr.aria-pressed]="datePreset === opt.value"
                      (click)="selectPeriod(opt.value)">
                      {{ opt.label }}
                    </button>
                  }
                  <button
                    type="button"
                    class="zn-period-toggle__btn zn-period-toggle__btn--range"
                    [class.zn-period-toggle__btn--active]="datePreset === 'range'"
                    [attr.aria-pressed]="datePreset === 'range'"
                    [attr.aria-label]="customRangeAriaLabel()"
                    (click)="selectPeriod('range')">
                    <svg
                      class="zn-period-toggle__icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <span>Rango</span>
                  </button>
                </div>

                @if (datePreset === 'range') {
                  <div class="zn-date-range" aria-label="Rango de fechas personalizado">
                    <div class="zn-date-range__field">
                      <label class="zn-date-range__label" for="zn-date-from">Inicio</label>
                      <div class="zn-date-range__control">
                        <input
                          id="zn-date-from"
                          type="date"
                          class="zn-date-range__input"
                          [(ngModel)]="customDateFrom"
                          (change)="onCustomRangeChange()"
                          [max]="customDateTo || undefined"
                          aria-label="Fecha de inicio" />
                      </div>
                    </div>
                    <span class="zn-date-range__sep" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <div class="zn-date-range__field">
                      <label class="zn-date-range__label" for="zn-date-to">Fin</label>
                      <div class="zn-date-range__control">
                        <input
                          id="zn-date-to"
                          type="date"
                          class="zn-date-range__input"
                          [(ngModel)]="customDateTo"
                          (change)="onCustomRangeChange()"
                          [min]="customDateFrom || undefined"
                          aria-label="Fecha de fin" />
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
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

          <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <app-datatable-wrapper
              [config]="table_config()"
              [rowTemplate]="tableTemplate">
            </app-datatable-wrapper>
          </div>
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
        <p class="text-sm font-medium text-gray-900 m-0">{{ item.sellerName }}</p>
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
      .zn-period-bar {
        flex-shrink: 0;
      }
      .zn-period-panel {
        display: inline-flex;
        flex-direction: column;
        align-items: stretch;
        width: fit-content;
        max-width: 100%;
        background: #fff;
        border-radius: 16px;
        padding: 0.25rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 1px #e2e8f0;
        transition: padding 0.2s ease, min-width 0.2s ease;
      }
      .zn-period-panel--range {
        padding: 0.25rem 0.35rem 0.65rem;
        min-width: min(100%, 22rem);
      }
      .zn-period-toggle {
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: 0.125rem;
        padding: 0.15rem;
        width: 100%;
        flex-shrink: 0;
      }
      .zn-period-toggle__btn {
        border: none;
        background: transparent;
        color: #475569;
        font-size: 0.8125rem;
        font-weight: 600;
        padding: 0.4rem 0.75rem;
        border-radius: 9999px;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
        white-space: nowrap;
        line-height: 1.25;
        flex-shrink: 0;
      }
      .zn-period-toggle__btn:hover:not(.zn-period-toggle__btn--active) {
        background: #f8fafc;
        color: #334155;
      }
      .zn-period-toggle__btn--active {
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        color: #fff;
        box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
      }
      .zn-period-toggle__btn--range {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }
      .zn-period-toggle__icon {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .zn-date-range {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: end;
        gap: 0.5rem 0.4rem;
        width: 100%;
        padding: 0.6rem 0.35rem 0.15rem;
        margin-top: 0.15rem;
        border-top: 1px solid #f1f5f9;
      }
      .zn-date-range__field {
        min-width: 0;
      }
      .zn-date-range__label {
        display: block;
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        color: #64748b;
        margin-bottom: 0.35rem;
      }
      .zn-date-range__control {
        display: flex;
        align-items: center;
        min-height: 2.5rem;
        padding: 0 0.65rem;
        background: linear-gradient(180deg, #fafafa 0%, #f4f4f5 100%);
        border: 1px solid #e4e4e7;
        border-radius: 10px;
        transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      }
      .zn-date-range__control:focus-within {
        border-color: #a5b4fc;
        background: #fff;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
      .zn-date-range__input {
        width: 100%;
        min-width: 0;
        padding: 0.45rem 0;
        border: none;
        background: transparent;
        font-size: 0.875rem;
        font-weight: 500;
        color: #1e293b;
        cursor: pointer;
        font-family: Inter, sans-serif !important;
      }
      .zn-date-range__input:focus {
        outline: none;
      }
      .zn-date-range__input::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.55;
        margin-left: 0.25rem;
      }
      .zn-date-range__sep {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 0.65rem;
        color: #cbd5e1;
        flex-shrink: 0;
      }
      .zn-date-range__sep svg {
        width: 1.125rem;
        height: 1.125rem;
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
      @media (max-width: 640px) {
        .zn-period-toggle__btn {
          padding: 0.35rem 0.55rem;
          font-size: 0.75rem;
        }
        .zn-period-bar,
        .zn-period-panel,
        .zn-period-panel--range {
          width: 100%;
          min-width: 0;
        }
        .zn-date-range {
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }
        .zn-date-range__sep {
          display: none;
        }
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

  readonly periodOptions: { label: string; value: Exclude<SalesReportPeriod, 'range'> }[] = [
    { label: 'Hoy', value: 'today' },
    { label: 'Semana', value: 'week' },
    { label: 'Mes', value: 'month' },
    { label: 'Año', value: 'year' },
  ];

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Sucursal', prop: 'branch', sortable: true, canAutoResize: false, width: 180 },
      { name: 'Vendedor', prop: 'seller', sortable: true, canAutoResize: false, width: 200 },
      { name: 'Total ventas', prop: 'salesCount', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Comisión', prop: 'commission', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Monto vendido', prop: 'totalSold', sortable: true, canAutoResize: false, width: 140 },
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
  ) {}

  ngOnInit(): void {
    this.loadFiscalConfigurations();
    this.loadBranches();
    this.selectPeriod('month');
  }

  selectPeriod(preset: SalesReportPeriod): void {
    this.datePreset = preset;

    if (preset === 'range') {
      if (!this.customDateFrom || !this.customDateTo) {
        const to = this.startOfDay(new Date());
        const from = new Date(to);
        from.setDate(from.getDate() - 30);
        this.customDateFrom = this.toInputDate(from);
        this.customDateTo = this.toInputDate(to);
      }
      this.loadReport();
      return;
    }

    this.loadReport();
  }

  onCustomRangeChange(): void {
    if (this.datePreset !== 'range' || !this.customDateFrom || !this.customDateTo) {
      return;
    }

    const from = this.parseInputDate(this.customDateFrom);
    const to = this.parseInputDate(this.customDateTo);
    if (!from || !to) {
      return;
    }

    if (from > to) {
      const tmp = this.customDateFrom;
      this.customDateFrom = this.customDateTo;
      this.customDateTo = tmp;
    }

    this.loadReport();
  }

  onFiscalConfigChange(): void {
    this.billingBranchId = '';
    this.loadBranches(this.fiscalConfigurationId || undefined);
    this.loadReport();
  }

  loadReport(): void {
    if (this.datePreset === 'range' && (!this.customDateFrom || !this.customDateTo)) {
      return;
    }

    this.table_config.update((c) => ({ ...c, loading: true }));

    this.salesReportService
      .getBySeller({
        period: this.datePreset,
        commission_rate: COMMISSION_RATE,
        fiscal_configuration_id: this.fiscalConfigurationId || undefined,
        billing_branch_id: this.billingBranchId || undefined,
        date_from: this.datePreset === 'range' ? this.customDateFrom : undefined,
        date_to: this.datePreset === 'range' ? this.customDateTo : undefined,
      })
      .subscribe({
        next: (res) => {
          this.summary.set(res.summary);
          const rows = res.rows.map((r) => this.mapRow(r));
          this.table_config.update((c) => ({
            ...c,
            rows,
            totalResults: res.summary.total_sellers,
            loading: false,
          }));
        },
        error: () => {
          this.summary.set(null);
          this.table_config.update((c) => ({
            ...c,
            rows: [],
            totalResults: 0,
            loading: false,
          }));
        },
      });
  }

  customRangeAriaLabel(): string {
    if (this.datePreset === 'range' && this.customDateFrom && this.customDateTo) {
      return `Rango personalizado: ${this.customDateFrom} a ${this.customDateTo}`;
    }
    return 'Seleccionar rango de fechas personalizado';
  }

  branchLabel(b: Branch): string {
    return b.display_name?.trim() || `${b.city} (${b.code})`;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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

  private mapRow(r: {
    billing_branch_id: string;
    branch_code: string;
    branch_name: string;
    seller_id: string;
    seller_name: string;
    total_sales_count: number;
    amount_sold: number;
    commission_percentage: number;
    commission_amount: number;
  }): SellerSalesRow {
    return {
      billingBranchId: r.billing_branch_id,
      branchCode: r.branch_code,
      branchName: r.branch_name,
      sellerId: r.seller_id,
      sellerName: r.seller_name,
      salesCount: r.total_sales_count,
      commissionRatePct: r.commission_percentage,
      commissionAmount: r.commission_amount,
      totalSold: r.amount_sold,
    };
  }

  private startOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private parseInputDate(value: string): Date | null {
    const [y, m, d] = value.split('-').map(Number);
    if (!y || !m || !d) {
      return null;
    }
    const date = new Date(y, m - 1, d);
    return Number.isNaN(date.getTime()) ? null : date;
  }
}
