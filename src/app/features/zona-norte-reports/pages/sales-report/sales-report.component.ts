import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';

export interface ZonaNorteBranch {
  id: string;
  name: string;
}

export interface SellerSalesDemoRow {
  branchId: string;
  branchName: string;
  sellerName: string;
  salesCount: number;
  commissionRatePct: number;
  totalSold: number;
}

function buildDemoRows(): SellerSalesDemoRow[] {
  const branches: ZonaNorteBranch[] = [
    { id: 'mty-centro', name: 'Monterrey Centro' },
    { id: 'slt-norte', name: 'Saltillo Norte' },
    { id: 'trn-plaza', name: 'Torreón Plaza' },
    { id: 'chh-juarez', name: 'Ciudad Juárez' },
  ];

  const sellersByBranch: Record<string, string[]> = {
    'mty-centro': [
      'Ana López',
      'Luis Hernández',
      'María González',
      'Carlos Ruiz',
      'Patricia Vega',
    ],
    'slt-norte': [
      'Jorge Mendoza',
      'Laura Castillo',
      'Miguel Torres',
      'Sofía Ramírez',
      'Diego Flores',
    ],
    'trn-plaza': [
      'Fernanda Ortiz',
      'Ricardo Soto',
      'Gabriela Núñez',
      'Andrés Campos',
      'Valeria Medina',
    ],
    'chh-juarez': [
      'Daniel Ibarra',
      'Paula Reyes',
      'Héctor Luna',
      'Natalia Cruz',
      'Óscar Delgado',
    ],
  };

  const seeds = [
    { sales: 52, rate: 4.5, base: 184_200 },
    { sales: 41, rate: 4.0, base: 142_800 },
    { sales: 63, rate: 5.0, base: 228_450 },
    { sales: 38, rate: 3.5, base: 119_600 },
    { sales: 47, rate: 4.25, base: 167_320 },
  ];

  const rows: SellerSalesDemoRow[] = [];
  for (const b of branches) {
    const names = sellersByBranch[b.id] ?? [];
    names.forEach((sellerName, i) => {
      const s = seeds[i % seeds.length];
      const jitter = 1 + (b.id.charCodeAt(0) % 5) * 0.02 + i * 0.015;
      const totalSold = Math.round(s.base * jitter);
      rows.push({
        branchId: b.id,
        branchName: b.name,
        sellerName,
        salesCount: s.sales + i * 3,
        commissionRatePct: s.rate,
        totalSold,
      });
    });
  }
  return rows;
}

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, FormsModule, DatatableWrapperComponent],
  template: `
    <div class="purchase-order-list-container">
      <div class="purchase-content">
        <div class="px-4 pb-8">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 class="text-2xl font-semibold text-gray-800">Reporte de Ventas - Zona Norte</h2>
              <p class="text-sm text-gray-600 mt-1">Vista demo: desempeño por vendedor y sucursal</p>
            </div>
          </div>

          <div class="mb-4">
            <div class="zn-filter-bar" role="search" aria-label="Filtros del reporte">
              <div class="zn-filter-bar__inner">
                <label class="zn-filter-bar__label" for="zn-sucursal">Sucursal</label>
                <select
                  id="zn-sucursal"
                  class="zn-filter-bar__select"
                  [(ngModel)]="selectedSucursalId"
                  (change)="applyFilter()"
                  aria-label="Filtrar por sucursal">
                  <option value="">Todas las sucursales</option>
                  @for (b of branches; track b.id) {
                    <option [value]="b.id">{{ b.name }}</option>
                  }
                </select>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-violet-600">Vendedores (demo)</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ table_config().totalResults }}</p>
            </div>
            <div class="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-emerald-600">Ventas acumuladas</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ totalSalesCount() }}
              </p>
            </div>
            <div class="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-amber-700">Monto total (demo)</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ formatCurrency(totalSoldSum()) }}
              </p>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <app-datatable-wrapper
              [config]="table_config()"
              [rowTemplate]="tableTemplate">
            </app-datatable-wrapper>
          </div>

          <p class="text-xs text-gray-400 mt-4 text-center">Datos de demostración — conecta el API cuando esté listo.</p>
        </div>
      </div>
    </div>

    <ng-template #tableTemplate let-item="$implicit">
      <td class="px-2 py-2">
        <div class="flex flex-col gap-0.5">
          <span class="inline-flex items-center w-fit px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-800">
            {{ branchShortLabel(item.branchName) }}
          </span>
          <span class="text-xs text-gray-600 truncate max-w-[170px]">{{ item.branchName }}</span>
        </div>
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
          <span class="text-sm font-semibold text-emerald-700">{{ formatCurrency(commissionAmount(item)) }}</span>
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
      .zn-filter-bar__inner {
        max-width: 320px;
      }
      .zn-filter-bar__label {
        display: block;
        font-size: 0.75rem;
        font-weight: 600;
        color: #4b5563;
        margin-bottom: 0.35rem;
      }
      .zn-filter-bar__select {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 0.875rem;
        color: #1f2937;
        background: #fff;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        padding-right: 2.25rem;
      }
      .zn-filter-bar__select:focus {
        outline: none;
        border-color: #818cf8;
        box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.2);
      }
    `,
  ],
})
export class SalesReportComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  readonly branches: ZonaNorteBranch[] = [
    { id: 'mty-centro', name: 'Monterrey Centro' },
    { id: 'slt-norte', name: 'Saltillo Norte' },
    { id: 'trn-plaza', name: 'Torreón Plaza' },
    { id: 'chh-juarez', name: 'Ciudad Juárez' },
  ];

  selectedSucursalId = '';
  private readonly allRows = buildDemoRows();

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
    emptyState: { title: 'Sin datos', subtitle: 'No hay vendedores para esta sucursal' },
    columnMode: 'force',
    reorderable: false,
  });

  ngOnInit(): void {
    this.applyFilter();
  }

  totalSalesCount(): number {
    return this.table_config().rows.reduce((a, r) => a + (r as SellerSalesDemoRow).salesCount, 0);
  }

  totalSoldSum(): number {
    return this.table_config().rows.reduce((a, r) => a + (r as SellerSalesDemoRow).totalSold, 0);
  }

  applyFilter(): void {
    const filtered = this.selectedSucursalId
      ? this.allRows.filter((r) => r.branchId === this.selectedSucursalId)
      : this.allRows;
    this.table_config.update((c) => ({
      ...c,
      rows: filtered,
      totalResults: filtered.length,
    }));
  }

  commissionAmount(row: SellerSalesDemoRow): number {
    return Math.round((row.totalSold * row.commissionRatePct) / 100);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  branchShortLabel(name: string): string {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }
}
