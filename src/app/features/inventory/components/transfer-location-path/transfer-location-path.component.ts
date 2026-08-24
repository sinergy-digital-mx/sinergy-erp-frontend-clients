import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferLocationView, branchLine } from '../../utils/transfer-location.util';

@Component({
  selector: 'app-transfer-location-path',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (location) {
      <div class="loc-path" [class.loc-path--detail]="variant === 'detail'">
        @if (showFiscal && location.fiscalName) {
          <span class="loc-path__fiscal" [class.loc-path__fiscal--bold]="fiscalBold" [title]="location.fiscalName">
            {{ location.fiscalName }}
          </span>
        }
        @if (showRfc && location.rfc) {
          <span class="loc-path__rfc">RFC {{ location.rfc }}</span>
        }
        <span class="loc-path__branch">{{ branchText }}</span>
        <span class="loc-path__warehouse">{{ location.warehouseName }}</span>
      </div>
    }
  `,
  styles: [`
    .loc-path {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
      min-width: 0;
      line-height: 1.3;
    }

    .loc-path__fiscal {
      font-size: 0.75rem;
      font-weight: 500;
      color: #9ca3af;
      letter-spacing: 0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .loc-path__fiscal--bold {
      font-weight: 700;
      color: #111827;
    }

    .loc-path__rfc {
      font-size: 0.6875rem;
      font-weight: 500;
      color: #9ca3af;
      letter-spacing: 0.02em;
    }

    .loc-path__branch {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .loc-path__warehouse {
      font-size: 1rem;
      font-weight: 650;
      color: #111827;
      letter-spacing: -0.01em;
    }

    .loc-path--detail {
      gap: 0.2rem;

      .loc-path__fiscal {
        font-size: 0.75rem;
        font-weight: 650;
        color: #111827;
        white-space: normal;
      }

      .loc-path__branch {
        font-size: 0.875rem;
      }

      .loc-path__warehouse {
        font-size: 1.05rem;
        font-weight: 700;
      }
    }
  `],
})
export class TransferLocationPathComponent {
  @Input({ required: true }) location!: TransferLocationView;
  @Input() showFiscal = true;
  @Input() showRfc = false;
  @Input() fiscalBold = false;
  @Input() variant: 'list' | 'detail' = 'list';
  @Input() withState = false;

  get branchText(): string {
    return branchLine(this.location, this.withState);
  }
}
