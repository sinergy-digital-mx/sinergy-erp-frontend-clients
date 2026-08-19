import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-credit-usage-bar',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DecimalPipe],
  template: `
    <div class="credit-usage">
      <div class="credit-usage__row">
        <span>Utilizado {{ used | currency:'MXN':'symbol':'1.2-2' }}</span>
        <span>Límite {{ limit | currency:'MXN':'symbol':'1.2-2' }}</span>
      </div>
      <div class="credit-usage__track" role="progressbar" [attr.aria-valuenow]="percent" aria-valuemin="0" aria-valuemax="100">
        <div
          class="credit-usage__fill"
          [class.credit-usage__fill--warn]="percent >= 90"
          [style.width.%]="barWidth">
        </div>
      </div>
      <div class="credit-usage__meta">
        <span>Disponible {{ available | currency:'MXN':'symbol':'1.2-2' }}</span>
        <strong>{{ percent | number:'1.0-0' }}%</strong>
        @if (days != null) {
          <span>{{ days }} días</span>
        }
      </div>
    </div>
  `,
  styles: [`
    .credit-usage {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .credit-usage__row,
    .credit-usage__meta {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      font-size: 0.72rem;
      color: #64748b;
    }

    .credit-usage__meta strong {
      color: #4b3e8e;
      font-weight: 700;
    }

    .credit-usage__track {
      height: 8px;
      border-radius: 999px;
      background: #e5e7eb;
      overflow: hidden;
    }

    .credit-usage__fill {
      height: 100%;
      border-radius: 999px;
      background: #6b46c1;
      transition: width 200ms ease, background 200ms ease;
    }

    .credit-usage__fill--warn {
      background: linear-gradient(90deg, #f97316, #dc2626);
    }
  `],
})
export class CreditUsageBarComponent {
  @Input() used = 0;
  @Input() available = 0;
  @Input() limit = 0;
  @Input() percent = 0;
  @Input() days: number | null = null;

  get barWidth(): number {
    return Math.max(0, Math.min(100, this.percent || 0));
  }
}
