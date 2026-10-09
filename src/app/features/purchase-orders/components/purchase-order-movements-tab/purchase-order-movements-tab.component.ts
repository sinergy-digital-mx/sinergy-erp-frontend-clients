import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { formatBusinessDateTime } from '../../../../core/utils/api-datetime.util';
import {
  PurchaseOrderMovement,
  movementChipTone,
} from '../../models/purchase-order-movement.model';
import { AuthService } from '../../../../core/services/auth.service';
import { canViewPurchaseOrderRealCost } from '../../utils/purchase-order-real-cost-access.util';
import {
  MovementDayGroup,
  actorInitials,
  groupMovementsByDay,
  humanizeMovementText,
  movementClock,
} from '../../utils/purchase-order-movement-display.util';

@Component({
  selector: 'app-purchase-order-movements-tab',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './purchase-order-movements-tab.component.html',
  styleUrl: './purchase-order-movements-tab.component.scss',
})
export class PurchaseOrderMovementsTabComponent implements OnChanges {
  private readonly purchaseOrderService = inject(PurchaseOrderService);
  private readonly toast = inject(ToastService);
  private readonly authService = inject(AuthService);

  @Input() orderId = '';
  @Input() movements: PurchaseOrderMovement[] = [];
  @Input() total = 0;

  readonly items = signal<PurchaseOrderMovement[]>([]);
  readonly loading = signal(false);
  readonly selectedType = signal<string>('');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movements'] || changes['total']) {
      this.items.set(this.movements ?? []);
    }
    if (changes['orderId'] && this.orderId && !(this.movements?.length)) {
      this.refresh();
    }
  }

  displayedItems(): PurchaseOrderMovement[] {
    const type = this.selectedType();
    const list = type ? this.visibleItems().filter((item) => item.type === type) : this.visibleItems();
    return [...list].sort((a, b) => {
      const tb = Date.parse(b.occurred_at || '') || 0;
      const ta = Date.parse(a.occurred_at || '') || 0;
      return tb - ta;
    });
  }

  dayGroups(): MovementDayGroup[] {
    return groupMovementsByDay(this.displayedItems());
  }

  filterTypes(): Array<{ type: string; label: string; count: number }> {
    const seen = new Map<string, { label: string; count: number }>();
    for (const item of this.visibleItems()) {
      if (!item.type) {
        continue;
      }
      const current = seen.get(item.type);
      if (current) {
        current.count += 1;
      } else {
        seen.set(item.type, { label: item.type_label || item.type, count: 1 });
      }
    }
    return [...seen.entries()].map(([type, value]) => ({ type, ...value }));
  }

  setType(type: string): void {
    this.selectedType.set(type);
  }

  visibleCount(): number {
    return this.visibleItems().length;
  }

  private visibleItems(): PurchaseOrderMovement[] {
    const list = this.items();
    if (canViewPurchaseOrderRealCost(this.authService)) {
      return list;
    }
    return list.filter((item) => item.type !== 'real_cost_updated');
  }

  actorName(item: PurchaseOrderMovement): string {
    return item.actor_name?.trim() || '';
  }

  initials(item: PurchaseOrderMovement): string {
    return actorInitials(this.actorName(item));
  }

  chipTone(item: PurchaseOrderMovement): string {
    return movementChipTone(item.type);
  }

  timeLabel(item: PurchaseOrderMovement): string {
    return movementClock(item.occurred_at)?.timeLabel ?? '—';
  }

  fullWhen(item: PurchaseOrderMovement): string {
    const clock = formatBusinessDateTime(item.occurred_at);
    if (!clock) {
      return '';
    }
    return `${clock.date}, ${clock.time}`;
  }

  movementText(item: PurchaseOrderMovement): string {
    return humanizeMovementText(item.description?.trim() || item.title?.trim() || item.type_label);
  }

  hasChanges(item: PurchaseOrderMovement): boolean {
    return (item.changes?.length ?? 0) > 0;
  }

  changeLabel(change: { field?: string; field_label?: string }): string {
    return change.field_label?.trim() || change.field || 'Campo';
  }

  refresh(): void {
    if (!this.orderId || this.loading()) {
      return;
    }
    this.loading.set(true);
    this.purchaseOrderService.getOrderMovements(this.orderId).subscribe({
      next: (response) => {
        this.items.set(response.data ?? []);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el historial'));
      },
    });
  }
}
