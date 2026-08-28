import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarClock,
  CheckCircle2,
  LandPlot,
  LucideAngularModule,
  Ruler,
} from 'lucide-angular';
import { EMPTY_PROPERTY_STATS, PropertyStats } from '../../models/property.model';

@Component({
  selector: 'app-property-stats-cards',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './property-stats-cards.component.html',
  styleUrl: './property-stats-cards.component.scss',
})
export class PropertyStatsCardsComponent {
  @Input() stats: PropertyStats | null = null;
  @Input() loading = false;

  readonly LandPlot = LandPlot;
  readonly CheckCircle2 = CheckCircle2;
  readonly CalendarClock = CalendarClock;
  readonly Ruler = Ruler;
  readonly skeletonSlots = [0, 1, 2, 3];

  get displayStats(): PropertyStats {
    return this.stats ?? EMPTY_PROPERTY_STATS;
  }

  get soldReservedChip(): string | null {
    const sold = this.displayStats.sold?.count ?? 0;
    const reserved = this.displayStats.reserved?.count ?? 0;
    if (sold <= 0 && reserved <= 0) {
      return null;
    }
    const parts: string[] = [];
    if (sold > 0) {
      parts.push(`${this.formatCount(sold)} vendidos`);
    }
    if (reserved > 0) {
      parts.push(`${this.formatCount(reserved)} reservados`);
    }
    return parts.join(' · ');
  }

  formatCount(value: number | undefined): string {
    return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(value ?? 0);
  }

  formatMoney(value: number | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.toNumber(value));
  }

  formatArea(value: number | undefined): string {
    return `${new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.toNumber(value))} m²`;
  }

  private toNumber(value: number | undefined): number {
    return Number.isFinite(value) ? Number(value) : 0;
  }
}
