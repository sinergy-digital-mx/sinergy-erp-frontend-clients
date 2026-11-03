import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { InventoryMarginSnapshot } from '../../models/inventory-margin.model';

@Component({
  selector: 'app-inventory-margin-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-margin-chip.component.html',
  styleUrl: './inventory-margin-chip.component.scss',
})
export class InventoryMarginChipComponent {
  @Input() margin: InventoryMarginSnapshot | null | undefined = null;

  get tone(): 'up' | 'down' | 'flat' | 'empty' {
    const value = Number(this.margin?.margin_percentage);
    if (!Number.isFinite(value) || this.margin?.margin_percentage == null) return 'empty';
    if (value < 0) return 'down';
    if (value > 0) return 'up';
    return 'flat';
  }

  get percentLabel(): string {
    const value = Number(this.margin?.margin_percentage);
    if (!Number.isFinite(value) || this.margin?.margin_percentage == null) return '—';
    return `${new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(value)}%`;
  }

  money(value: string | null | undefined): string {
    if (value == null || value === '') return '—';
    return formatUnitCurrency(value);
  }
}
