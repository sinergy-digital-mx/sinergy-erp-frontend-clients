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
import { HoverTipDirective } from './hover-tip.directive';
import {
  isCedisBranch,
  labelBranches,
  readBranchVisibility,
  resolveHiddenBranchIds,
  writeBranchVisibility,
} from '../../utils/branch-visibility';

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
  imports: [CommonModule, FormsModule, HoverTipDirective],
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
  branchPanelOpen = false;
  exporting = signal(false);
  orderQty = signal<Record<string, number>>({});
  private readonly hiddenBranchIds = signal<string[]>([]);
  private branchOnHand = new Map<string, number>();

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

  get visibleBranches(): Array<{ id: string; name: string; label: string }> {
    const hidden = new Set(this.hiddenBranchIds());
    return labelBranches(this.report()?.branches ?? []).filter((branch) => !hidden.has(branch.id));
  }

  get branchChoices(): Array<{
    id: string;
    label: string;
    onHand: number;
    cedis: boolean;
    visible: boolean;
  }> {
    const hidden = new Set(this.hiddenBranchIds());
    return labelBranches(this.report()?.branches ?? []).map((branch) => ({
      id: branch.id,
      label: branch.label,
      onHand: this.branchOnHand.get(branch.id) ?? 0,
      cedis: isCedisBranch(branch.name),
      visible: !hidden.has(branch.id),
    }));
  }

  get hiddenBranchCount(): number {
    return (this.report()?.branches.length ?? 0) - this.visibleBranches.length;
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
          this.rememberBranchStock(report);
          this.hiddenBranchIds.set(resolveHiddenBranchIds(report.branches, readBranchVisibility()));
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

  readonly periodFieldTip =
    'De cuántos días se toman las ventas ya surtidas. Con ese total se calcula la venta diaria del producto.';
  readonly coverFieldTip =
    'Para cuántos días de venta quieres dejar existencia. De aquí salen el mínimo y el máximo a comprar.';
  readonly productsTip =
    'Productos activos de este proveedor. Agotados: existencia en cero y con ventas en el periodo.';
  readonly toBuyTip =
    'Productos con cantidad a comprar mayor a cero. Las unidades son la suma de lo escrito en Comprar. Ese número nace igual a lo recomendado y se puede cambiar.';
  readonly investmentTip =
    'Suma de cantidad a comprar × costo del proveedor, en pesos. Si el costo está en dólares, se convierte con el tipo de cambio del día. Si falta costo, ese producto no entra.';
  readonly salesTip =
    'Suma de cantidad a comprar × precio promedio. El precio sale de lo vendido en el periodo; si no hubo ventas, se usa el precio de lista.';
  readonly profitTip =
    'Suma de cantidad a comprar × (precio promedio − costo). El porcentaje es esa utilidad dividida entre la venta potencial.';
  readonly priceTip =
    'Precio promedio de lo vendido en el periodo: importe entre unidades. Si no hubo ventas, se usa el precio de lista de la unidad base.';
  readonly marginTip =
    'Precio promedio menos el costo del proveedor, en pesos. El porcentaje es esa utilidad entre el precio.';
  readonly minTip =
    'Piso de seguridad: venta diaria ajustada × 25% de los días a cubrir. Debajo de esto el producto pide reposición.';
  readonly maxTip =
    'Objetivo de inventario: venta diaria ajustada × los días a cubrir. La compra recomendada llega hasta aquí.';
  readonly coverColTip =
    'Días que alcanza la existencia de hoy si se sigue vendiendo al ritmo ajustado. Existencia ÷ venta diaria.';
  readonly recommendedTip =
    'Máximo menos existencia. Solo se recomienda comprar si hubo ventas y la existencia está debajo del máximo.';
  readonly buyTip =
    'Empieza igual a lo recomendado y se puede editar. Las tarjetas y el pie usan este número, no el recomendado.';
  readonly onHandTip = 'Existencia disponible hoy en esa sucursal.';
  readonly soldTip = 'Unidades vendidas en esa sucursal dentro del periodo, de órdenes surtidas.';
  readonly differenceTip =
    'Existencia menos la venta del periodo. Si sale negativo, en esos días se vendió más de lo que hay hoy.';

  statusLabel(status: StockReplenishmentStatus): string {
    return STATUS_LABEL[status];
  }

  trendLabel(trend: StockReplenishmentTrend): string {
    return TREND_LABEL[trend];
  }

  periodTip(days: number): string {
    return `Ventas surtidas de los últimos ${days} días. La venta diaria es ese total dividido entre ${days}. Si el periodo anterior, del mismo largo, vendió distinto, la venta diaria se ajusta entre 75% y 150%.`;
  }

  coverTip(days: number): string {
    const safety = Math.min(days, Math.max(1, Math.round(days * 0.25)));
    return `El máximo es la venta diaria ajustada × ${days} días. El mínimo de seguridad es esa venta × ${safety} días, un cuarto del plazo.`;
  }

  statusTip(row: StockReplenishmentRow): string {
    const detail = `Hoy hay ${this.qty(row.on_hand)}, se vendieron ${this.qty(row.sold_qty)}, el mínimo es ${this.qty(row.min_stock)} y el máximo ${this.qty(row.max_stock)}.`;
    switch (row.status) {
      case 'out':
        return `Agotado: no hay existencia y sí hubo ventas, así que se recomienda comprar hasta el máximo. ${detail}`;
      case 'reorder':
        return `Reponer: la existencia está debajo del mínimo de seguridad. Conviene comprar hasta el máximo. ${detail}`;
      case 'fill':
        return `Completar: ya se pasó el mínimo, pero todavía no se llega al máximo. Se sugiere completar hasta el máximo. ${detail}`;
      case 'healthy':
        return `Sano: la existencia está entre el máximo y 25% arriba. No se recomienda comprar. ${detail}`;
      case 'overstock':
        return `Sobrestock: hay más de 25% arriba del máximo. No se recomienda comprar. ${detail}`;
      default:
        return `Sin venta: en el periodo no hubo ventas surtidas, así que no se recomienda comprar. ${detail}`;
    }
  }

  trendTip(row: StockReplenishmentRow): string {
    const current = this.qty(row.sold_qty);
    const previous = this.qty(row.previous_sold_qty);
    const factor = `${new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(row.trend_factor * 100)}%`;
    if (row.trend === 'up') {
      return `Sube: se vendieron ${current} y en el periodo anterior ${previous}, al menos 15% más. La venta diaria se ajusta a ${factor}, sin pasar de 150%.`;
    }
    if (row.trend === 'down') {
      return `Baja: se vendieron ${current} y en el periodo anterior ${previous}, al menos 15% menos. La venta diaria se ajusta a ${factor}, sin bajar de 75%.`;
    }
    return `Estable: se vendieron ${current} y en el periodo anterior ${previous}. El cambio está entre 85% y 115%, así que la venta diaria casi no se mueve.`;
  }

  readonly transferTip =
    'En alguna sucursal se vendió más de lo que hay ahí, pero el total de la empresa alcanza. Conviene traspasar antes de comprar.';

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

  setBranchVisible(branchId: string, visible: boolean): void {
    const hidden = new Set(this.hiddenBranchIds());
    if (visible) {
      hidden.delete(branchId);
    } else {
      hidden.add(branchId);
    }
    this.persistHidden(hidden);
  }

  hideCedis(): void {
    const hidden = new Set(this.hiddenBranchIds());
    for (const branch of this.report()?.branches ?? []) {
      if (isCedisBranch(branch.name)) {
        hidden.add(branch.id);
      }
    }
    this.persistHidden(hidden);
  }

  showAllBranches(): void {
    this.persistHidden(new Set());
  }

  async downloadExcel(): Promise<void> {
    const current = this.report();
    if (!current || this.exporting()) {
      return;
    }
    const rows = this.visibleRows;
    if (!rows.length) {
      this.toast.error('No hay productos para descargar.');
      return;
    }
    const branches = this.visibleBranches;
    const totals = this.visibleTotals;
    this.exporting.set(true);
    try {
      const { downloadStockReplenishmentExcel } = await import('../../utils/stock-replenishment-excel');
      await downloadStockReplenishmentExcel({
        vendorName: current.vendor.legal_name,
        rfc: current.vendor.rfc,
        periodLabel: current.period_label,
        periodDays: current.period_days,
        coverDays: current.cover_days,
        exchangeRate: current.exchange_rate,
        filterNote: this.filterNote(),
        branches: branches.map((branch) => ({ id: branch.id, name: branch.label })),
        rows: rows.map((row) => ({
          sku: row.sku,
          externalSku: row.external_sku && row.external_sku !== row.sku ? row.external_sku : null,
          name: row.name,
          uom: row.uom_name,
          status: this.excelStatus(row),
          cells: branches.map((branch) => {
            const value = this.cell(row, branch.id);
            return { onHand: value.on_hand, sold: value.sold_qty, difference: value.difference };
          }),
          averagePrice: row.average_price,
          unitCost: row.unit_cost,
          unitMargin: row.unit_margin,
          marginPercent: row.margin_percent,
          minStock: row.min_stock,
          maxStock: row.max_stock,
          daysOfCover: row.days_of_cover,
          recommendedQty: row.recommended_qty,
          orderQty: this.qtyOf(row.product_id),
        })),
        totals: {
          cells: branches.map((branch) => ({
            onHand: this.branchSum(branch.id, 'on_hand'),
            sold: this.branchSum(branch.id, 'sold_qty'),
            difference: this.branchSum(branch.id, 'difference'),
          })),
          potentialSales: totals.potentialSales,
          potentialProfit: totals.potentialProfit,
          marginPercent: totals.marginPercent,
          investment: totals.investment,
          recommendedQty: totals.recommendedQty,
          orderQty: totals.orderQty,
          toBuyCount: totals.toBuyCount,
          productCount: rows.length,
        },
      });
    } catch {
      this.toast.error('No se pudo armar el Excel.');
    } finally {
      this.exporting.set(false);
    }
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

  private persistHidden(hidden: Set<string>): void {
    const branches = this.report()?.branches ?? [];
    const hiddenIds = branches.filter((branch) => hidden.has(branch.id)).map((branch) => branch.id);
    this.hiddenBranchIds.set(hiddenIds);
    writeBranchVisibility({
      hiddenIds,
      seenIds: branches.map((branch) => branch.id),
    });
  }

  private rememberBranchStock(report: StockReplenishmentReport): void {
    const totals = new Map<string, number>();
    for (const row of report.rows) {
      for (const cell of row.branches) {
        totals.set(cell.branch_id, (totals.get(cell.branch_id) ?? 0) + cell.on_hand);
      }
    }
    this.branchOnHand = totals;
  }

  private filterNote(): string | null {
    const parts: string[] = [];
    const term = this.search.trim();
    if (term) {
      parts.push(`búsqueda “${term}”`);
    }
    if (this.onlyToBuy) {
      parts.push('solo por comprar');
    }
    return parts.length ? parts.join(' · ') : null;
  }

  private excelStatus(row: StockReplenishmentRow): string {
    const parts = [this.statusLabel(row.status)];
    const trend = this.trendLabel(row.trend);
    if (trend) {
      parts.push(trend);
    }
    if (row.transfer_hint) {
      parts.push('Traspasar');
    }
    return parts.join(' · ');
  }
}
