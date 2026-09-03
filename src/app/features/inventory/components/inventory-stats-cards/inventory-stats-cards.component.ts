import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  AlertTriangle,
  Layers,
  LucideAngularModule,
  Package,
  Receipt,
  Tag,
  TrendingUp,
} from 'lucide-angular';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { InventoryStats } from '../../models/inventory-stats.model';

@Component({
  selector: 'app-inventory-stats-cards',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MatTooltipModule],
  templateUrl: './inventory-stats-cards.component.html',
  styleUrl: './inventory-stats-cards.component.scss',
})
export class InventoryStatsCardsComponent {
  @Input() stats: InventoryStats | null = null;
  @Input() loading = false;
  @Input() failed = false;

  readonly Layers = Layers;
  readonly Receipt = Receipt;
  readonly Tag = Tag;
  readonly TrendingUp = TrendingUp;
  readonly Package = Package;
  readonly AlertTriangle = AlertTriangle;
  readonly skeletonSlots = [0, 1, 2, 3, 4];

  get isNegativeMargin(): boolean {
    if (this.failed || !this.stats) {
      return false;
    }
    return this.toNumber(this.stats.gross_margin) < 0;
  }

  get showWarningChips(): boolean {
    if (this.loading || this.failed || !this.stats) {
      return false;
    }
    return this.stats.batches_without_cost > 0 || this.stats.products_without_price > 0;
  }

  formatCount(value: number | undefined): string {
    if (this.failed) {
      return '—';
    }
    return new Intl.NumberFormat('es-MX').format(value ?? 0);
  }

  formatMoney(value: string | number | undefined): string {
    if (this.failed) {
      return '—';
    }
    return formatUnitCurrency(this.toNumber(value));
  }

  formatQuantity(value: string | number | undefined): string {
    if (this.failed) {
      return '—';
    }
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    }).format(this.toNumber(value));
  }

  formatPercent(value: string | number | undefined): string {
    if (this.failed) {
      return '—';
    }
    return `${new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(this.toNumber(value))}%`;
  }

  batchesSub(): string {
    if (this.failed) {
      return '—';
    }
    const withStock = this.formatCount(this.stats?.batches_with_stock);
    const depleted = this.formatCount(this.stats?.batches_depleted);
    return `${withStock} con stock · ${depleted} agotados`;
  }

  costSub(): string {
    if (this.failed) {
      return '—';
    }
    return `Promedio ${this.formatMoney(this.stats?.average_unit_cost)} / u`;
  }

  priceSub(): string {
    if (this.failed) {
      return '—';
    }
    return `Promedio ${this.formatMoney(this.stats?.average_unit_price)} / u`;
  }

  stockSub(): string {
    if (this.failed) {
      return '—';
    }
    const products = this.formatCount(this.stats?.total_products);
    const warehouses = this.formatCount(this.stats?.total_warehouses);
    return `${products} productos · ${warehouses} almacenes`;
  }

  quantityWithoutCostTooltip(): string {
    return `${this.formatQuantity(this.stats?.quantity_without_cost)} u sin costo de OC`;
  }

  quantityWithoutPriceTooltip(): string {
    return `${this.formatQuantity(this.stats?.quantity_without_price)} u sin lista de precios`;
  }

  private toNumber(value: string | number | undefined): number {
    if (value === undefined || value === null || value === '') {
      return 0;
    }
    const parsed = typeof value === 'string' ? parseFloat(value) : value;
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
