import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ToastService } from '../../../../core/services/toast.service';
import {
  PurchaseTotals,
  StockReplenishmentBranchCell,
  StockReplenishmentReport,
  StockReplenishmentRow,
  StockReplenishmentStatus,
  StockReplenishmentTrend,
  StockReplenishmentVendor,
  buildPurchaseTotals,
} from '../../models/stock-replenishment.model';
import { StockReplenishmentService } from '../../services/stock-replenishment.service';

const PERIOD_OPTIONS = [30, 60, 90] as const;
const COVER_OPTIONS = [15, 30, 45, 60] as const;

const STATUS_LABEL: Record<StockReplenishmentStatus, string> = {
  out: 'Agotado',
  reorder: 'Reponer',
  fill: 'Completar',
  healthy: 'Sano',
  overstock: 'Sobrestock',
  no_movement: 'Sin venta',
};

const TREND_LABEL: Record<StockReplenishmentTrend, string> = {
  up: 'Sube',
  down: 'Baja',
  flat: 'Estable',
  none: '',
};

@Component({
  selector: 'app-stock-replenishment-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-replenishment-page.component.html',
  styleUrl: './stock-replenishment-page.component.scss',
})
export class StockReplenishmentPageComponent implements OnInit {
  readonly periodOptions = PERIOD_OPTIONS;
  readonly coverOptions = COVER_OPTIONS;

  vendors = signal<StockReplenishmentVendor[]>([]);
  vendorsLoading = signal(true);
  report = signal<StockReplenishmentReport | null>(null);
  loading = signal(false);
  vendorId = '';
  vendorQuery = '';
  periodDays: (typeof PERIOD_OPTIONS)[number] = 30;
  coverDays: (typeof COVER_OPTIONS)[number] = 30;
  search = '';
  onlyToBuy = false;
  orderQty = signal<Record<string, number>>({});

  readonly supplierTotals = computed(() =>
    buildPurchaseTotals(this.report()?.rows ?? [], (productId) => this.qtyOf(productId)),
  );

  get visibleRows(): StockReplenishmentRow[] {
    this.orderQty();
    const rows = this.report()?.rows ?? [];
    const term = this.search.trim().toLocaleLowerCase('es');
    return rows.filter((row) => {
      if (this.onlyToBuy && this.qtyOf(row.product_id) <= 0 && row.recommended_qty <= 0) {
        return false;
      }
      if (!term) {
        return true;
      }
      return (
        row.name.toLocaleLowerCase('es').includes(term) ||
        row.sku.toLocaleLowerCase('es').includes(term) ||
        (row.external_sku ?? '').toLocaleLowerCase('es').includes(term)
      );
    });
  }

  get visibleTotals(): PurchaseTotals {
    return buildPurchaseTotals(this.visibleRows, (productId) => this.qtyOf(productId));
  }

  private readonly moneyFormat = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  private readonly qtyFormat = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

  constructor(
    private readonly reports: StockReplenishmentService,
    private readonly toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.reports.listVendors().subscribe({
      next: (response) => {
        this.vendors.set(response.vendors ?? []);
        this.vendorsLoading.set(false);
        if (response.vendors?.length === 1) {
          this.vendorId = response.vendors[0].id;
          this.loadReport();
        }
      },
      error: (error: unknown) => {
        this.vendorsLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudieron cargar los proveedores.'));
      },
    });
  }

  get filteredVendors(): StockReplenishmentVendor[] {
    const term = this.vendorQuery.trim().toLocaleLowerCase('es');
    const vendors = this.vendors();
    const matched = term
      ? vendors.filter((vendor) => {
          const name = vendor.legal_name.toLocaleLowerCase('es');
          const rfc = (vendor.rfc ?? '').toLocaleLowerCase('es');
          return name.includes(term) || rfc.includes(term);
        })
      : vendors;
    if (this.vendorId && !matched.some((vendor) => vendor.id === this.vendorId)) {
      const selected = vendors.find((vendor) => vendor.id === this.vendorId);
      return selected ? [selected, ...matched] : matched;
    }
    return matched;
  }

  get selectedVendor(): StockReplenishmentVendor | null {
    return this.vendors().find((vendor) => vendor.id === this.vendorId) ?? null;
  }

  get hasUsdCost(): boolean {
    return (this.report()?.rows ?? []).some((row) => row.cost_currency === 'USD');
  }

  get filterActive(): boolean {
    return this.search.trim().length > 0 || this.onlyToBuy;
  }

  get anyDirty(): boolean {
    return (this.report()?.rows ?? []).some((row) => this.isDirty(row));
  }

  onVendorChange(): void {
    this.search = '';
    this.onlyToBuy = false;
    this.loadReport();
  }

  setPeriod(days: (typeof PERIOD_OPTIONS)[number]): void {
    if (this.periodDays === days) {
      return;
    }
    this.periodDays = days;
    this.loadReport();
  }

  setCover(days: (typeof COVER_OPTIONS)[number]): void {
    if (this.coverDays === days) {
      return;
    }
    this.coverDays = days;
    this.loadReport();
  }

  loadReport(): void {
    if (!this.vendorId) {
      this.report.set(null);
      this.orderQty.set({});
      return;
    }
    this.loading.set(true);
    this.reports
      .getReport({
        vendor_id: this.vendorId,
        period_days: this.periodDays,
        cover_days: this.coverDays,
      })
      .subscribe({
        next: (report) => {
          const nextQty: Record<string, number> = {};
          for (const row of report.rows) {
            nextQty[row.product_id] = row.recommended_qty;
          }
          this.orderQty.set(nextQty);
          this.report.set(report);
          this.loading.set(false);
        },
        error: (error: unknown) => {
          this.loading.set(false);
          this.report.set(null);
          this.toast.error(resolveHttpErrorMessage(error, 'No se pudo armar el reporte.'));
        },
      });
  }

  cell(row: StockReplenishmentRow, branchId: string): StockReplenishmentBranchCell {
    return (
      row.branches.find((branch) => branch.branch_id === branchId) ?? {
        branch_id: branchId,
        on_hand: 0,
        sold_qty: 0,
        difference: 0,
      }
    );
  }

  toneClass(index: number, extra = ''): string {
    return `${extra} tone-${index % 4}`.trim();
  }

  statusLabel(status: StockReplenishmentStatus): string {
    return STATUS_LABEL[status];
  }

  trendLabel(trend: StockReplenishmentTrend): string {
    return TREND_LABEL[trend];
  }

  priceSourceLabel(row: StockReplenishmentRow): string {
    if (row.price_source === 'sales') {
      return 'de ventas';
    }
    if (row.price_source === 'list') {
      return 'de lista';
    }
    return 'sin precio';
  }

  qtyOf(productId: string): number {
    return this.orderQty()[productId] ?? 0;
  }

  isDirty(row: StockReplenishmentRow): boolean {
    return Math.abs(this.qtyOf(row.product_id) - row.recommended_qty) > 0.0001;
  }

  setQty(productId: string, raw: string | number): void {
    const parsed = typeof raw === 'number' ? raw : Number(raw);
    const qty = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    this.orderQty.update((current) => ({ ...current, [productId]: qty }));
  }

  restoreRow(row: StockReplenishmentRow): void {
    this.orderQty.update((current) => ({ ...current, [row.product_id]: row.recommended_qty }));
  }

  restoreAll(): void {
    const next: Record<string, number> = {};
    for (const row of this.report()?.rows ?? []) {
      next[row.product_id] = row.recommended_qty;
    }
    this.orderQty.set(next);
  }

  branchSum(branchId: string, field: 'on_hand' | 'sold_qty' | 'difference'): number {
    return this.visibleRows.reduce((sum, row) => sum + this.cell(row, branchId)[field], 0);
  }

  money(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) {
      return '—';
    }
    return this.moneyFormat.format(value);
  }

  qty(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) {
      return '—';
    }
    return this.qtyFormat.format(value);
  }

  percent(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) {
      return '—';
    }
    return `${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 1 }).format(value)}%`;
  }

  totalsLabel(totals: PurchaseTotals): string {
    return totals.toBuyCount === 1 ? '1 producto' : `${totals.toBuyCount} productos`;
  }
}
