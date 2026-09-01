import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrderMovement } from '../../models/purchase-order-movement.model';

@Component({
  selector: 'app-purchase-order-movements-tab',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './purchase-order-movements-tab.component.html',
  styleUrl: './purchase-order-movements-tab.component.scss',
})
export class PurchaseOrderMovementsTabComponent implements OnChanges {
  private readonly purchaseOrderService = inject(PurchaseOrderService);
  private readonly toast = inject(ToastService);

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
    const list = this.items();
    return type ? list.filter((item) => item.type === type) : list;
  }

  filterTypes(): Array<{ type: string; label: string }> {
    const seen = new Map<string, string>();
    for (const item of this.items()) {
      if (item.type && !seen.has(item.type)) {
        seen.set(item.type, item.type_label || item.type);
      }
    }
    return [...seen.entries()].map(([type, label]) => ({ type, label }));
  }

  setType(type: string): void {
    this.selectedType.set(type);
  }

  actorName(item: PurchaseOrderMovement): string {
    return item.actor_name?.trim() || '—';
  }

  movementText(item: PurchaseOrderMovement): string {
    return item.description?.trim() || item.title?.trim() || item.type_label || '—';
  }

  hasChanges(item: PurchaseOrderMovement): boolean {
    return (item.changes?.length ?? 0) > 0;
  }

  changeLabel(change: { field?: string; field_label?: string }): string {
    return change.field_label?.trim() || change.field || 'Campo';
  }

  formatOccurredAt(value?: string | null): string {
    if (!value) {
      return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '—';
    }
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
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
