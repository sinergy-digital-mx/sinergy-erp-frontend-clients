import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { contractSaleBadge, ContractSaleType } from '../../utils/contract-sale-type';

@Component({
  selector: 'app-contract-sale-badge',
  standalone: true,
  imports: [MatTooltipModule],
  template: `
    <span
      class="sale-badge"
      [class.sale-badge--cash]="badge.kind === 'cash'"
      [class.sale-badge--mix]="badge.kind === 'down_payment_and_financing'"
      [matTooltip]="badge.hint"
      matTooltipPosition="above">
      <span>{{ badge.name }}</span>
      @if (badge.mark) {
        <span class="sale-badge__mark">{{ badge.mark }}</span>
      }
    </span>
  `,
  styles: [`
    :host { display: inline-flex; max-width: 100%; }
    .sale-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.28rem;
      max-width: 100%;
      padding: 0.12rem 0.42rem;
      border-radius: 999px;
      background: #e0e7ff;
      color: #3730a3;
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      line-height: 1.3;
      white-space: nowrap;
      cursor: default;
    }
    .sale-badge--cash {
      background: #ecfdf5;
      color: #047857;
    }
    .sale-badge--mix {
      background: #fff7ed;
      color: #9a3412;
    }
    .sale-badge__mark {
      padding: 0 0.28rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.72);
      font-weight: 800;
    }
  `],
})
export class ContractSaleBadgeComponent {
  @Input() saleType: ContractSaleType | string | null | undefined;
  @Input() downPaymentFinanced = false;

  get badge() {
    return contractSaleBadge({
      sale_type: this.saleType,
      down_payment_financed: this.downPaymentFinanced,
    });
  }
}
