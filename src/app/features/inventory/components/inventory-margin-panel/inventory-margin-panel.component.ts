import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import {
  InventoryMarginExplanation,
  InventoryMarginLine,
} from '../../models/inventory-margin.model';

@Component({
  selector: 'app-inventory-margin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-margin-panel.component.html',
  styleUrl: './inventory-margin-panel.component.scss',
})
export class InventoryMarginPanelComponent {
  @Input() explanation: InventoryMarginExplanation | null | undefined = null;
  @Input() heading = '';
  @Input() costLabel = 'Costo';

  get tone(): 'up' | 'down' | 'flat' | 'empty' {
    const value = Number(this.explanation?.margin.margin_percentage);
    if (!Number.isFinite(value) || this.explanation?.margin.margin_percentage == null) return 'empty';
    if (value < 0) return 'down';
    if (value > 0) return 'up';
    return 'flat';
  }

  get percentLabel(): string {
    const raw = this.explanation?.margin.margin_percentage;
    const value = Number(raw);
    if (raw == null || !Number.isFinite(value)) return '—';
    return `${new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(value)}%`;
  }

  money(value: string | null | undefined, currency: 'MXN' | 'USD' | null = 'MXN'): string {
    if (value == null || value === '') return '—';
    return formatUnitCurrency(value, currency === 'USD' ? 'USD' : 'MXN');
  }

  lineMoney(line: InventoryMarginLine): string {
    return this.money(line.amount, line.currency);
  }
}
