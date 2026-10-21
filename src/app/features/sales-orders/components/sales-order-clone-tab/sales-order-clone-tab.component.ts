import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { SalesOrder, SalesOrderLineItem } from '../../models/sales-order.model';
import { SalesOrderService } from '../../services/sales-order.service';

interface CloneRow {
  lineId: string;
  productName: string;
  uom: string;
  quantity: number;
  description: string;
  unitPrice: number | null;
}

/** Pestaña «Clonar orden»: edita concepto y precio de cada línea y crea una venta nueva. */
@Component({
  selector: 'app-sales-order-clone-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="clone-tab">
      @if (!isManual) {
        <p class="clone-tab__empty">Solo se pueden clonar órdenes manuales.</p>
      } @else {
        <p class="clone-tab__intro">
          Se crea una venta nueva con los mismos datos. Cambia el concepto o el precio de cada línea; lo demás
          queda igual.
        </p>

        <div class="clone-tab__table-wrap">
          <table class="clone-tab__table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Concepto en la nueva venta</th>
                <th class="num">Cant.</th>
                <th class="num">Precio unitario</th>
              </tr>
            </thead>
            <tbody>
              @for (row of rows(); track row.lineId) {
                <tr>
                  <td>
                    <strong>{{ row.productName }}</strong>
                    <small>{{ row.uom }}</small>
                  </td>
                  <td>
                    <input
                      type="text"
                      maxlength="255"
                      [(ngModel)]="row.description"
                      [name]="'d' + row.lineId"
                      [disabled]="saving()"
                      placeholder="Ej. Desarrollo de software septiembre" />
                  </td>
                  <td class="num">{{ row.quantity }}</td>
                  <td class="num">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      class="clone-tab__price"
                      [(ngModel)]="row.unitPrice"
                      [name]="'p' + row.lineId"
                      [disabled]="saving()" />
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <label class="clone-tab__notes">
          <span>Notas libres de la nueva venta</span>
          <textarea rows="3" [(ngModel)]="notes" name="notes" [disabled]="saving()"></textarea>
        </label>

        <div class="clone-tab__actions">
          <button type="button" class="clone-tab__btn" [disabled]="saving() || !canSubmit()" (click)="submit()">
            {{ saving() ? 'Creando…' : 'Crear orden clonada' }}
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .clone-tab { display: flex; flex-direction: column; gap: 0.85rem; padding: 0.25rem 0 1rem; }
    .clone-tab__empty, .clone-tab__intro { margin: 0; font-size: 0.85rem; color: #64748b; }
    .clone-tab__table-wrap { overflow-x: auto; }
    .clone-tab__table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    .clone-tab__table th {
      text-align: left; padding: 0.5rem 0.6rem; font-size: 0.72rem; text-transform: uppercase;
      letter-spacing: 0.03em; color: #64748b; border-bottom: 1px solid #e2e8f0;
    }
    .clone-tab__table td { padding: 0.5rem 0.6rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    .clone-tab__table td small { display: block; color: #94a3b8; font-size: 0.72rem; }
    .clone-tab__table .num { text-align: right; white-space: nowrap; }
    .clone-tab__table input, .clone-tab__notes textarea {
      width: 100%; padding: 0.45rem 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;
      font: inherit; color: #1e293b; background: #fff; box-sizing: border-box;
    }
    .clone-tab__table input:focus, .clone-tab__notes textarea:focus {
      outline: none; border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.15);
    }
    .clone-tab__price { max-width: 9rem; text-align: right; }
    .clone-tab__notes { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.8rem; color: #475569; }
    .clone-tab__actions { display: flex; justify-content: flex-end; }
    .clone-tab__btn {
      padding: 0.55rem 1.1rem; border: 0; border-radius: 8px; background: #4f46e5; color: #fff;
      font-weight: 600; cursor: pointer;
    }
    .clone-tab__btn:disabled { opacity: 0.55; cursor: not-allowed; }
  `],
})
export class SalesOrderCloneTabComponent implements OnChanges {
  private readonly salesOrders = inject(SalesOrderService);
  private readonly toast = inject(ToastService);

  @Input({ required: true }) order!: SalesOrder;
  @Input() lineItems: SalesOrderLineItem[] = [];
  /** Emite el ID de la orden creada. */
  @Output() cloned = new EventEmitter<string>();

  rows = signal<CloneRow[]>([]);
  saving = signal(false);
  notes = '';

  get isManual(): boolean {
    return (this.order?.sales_order_type ?? 'MANUAL') === 'MANUAL';
  }

  ngOnChanges(): void {
    this.rows.set(
      this.lineItems
        .filter((item) => !!item.id)
        .map((item) => ({
          lineId: item.id!,
          productName: item.product?.name || 'Producto',
          uom: item.product_uom?.uom?.name || item.uom_name || '',
          quantity: Number(item.quantity) || 0,
          description: item.custom_description?.trim() || item.product?.name || '',
          unitPrice: Number(item.unit_price) || 0,
        })),
    );
    this.notes = this.order?.notes ?? '';
  }

  canSubmit(): boolean {
    const rows = this.rows();
    return rows.length > 0 && rows.every((row) => row.unitPrice !== null && Number(row.unitPrice) >= 0);
  }

  submit(): void {
    if (!this.canSubmit() || this.saving()) return;
    const lines = this.rows().map((row) => ({
      line_id: row.lineId,
      custom_description: row.description.trim(),
      unit_price: Number(row.unitPrice),
    }));
    this.saving.set(true);
    this.salesOrders
      .cloneOrder(this.order.id, { lines, notes: this.notes.trim() })
      .subscribe({
        next: (created) => {
          this.saving.set(false);
          this.toast.success(`Orden ${created.folio ?? ''} creada`.trim());
          this.cloned.emit(created.id);
        },
        error: (error: Error) => {
          this.saving.set(false);
          this.toast.error(error?.message || 'No se pudo clonar la orden');
        },
      });
  }
}
