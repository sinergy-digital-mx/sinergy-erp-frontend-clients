import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LineItem } from '../../models/line-item.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';

export interface ReceiptCorrectionDialogData {
  orderId: string;
  lines: LineItem[];
}

@Component({
  selector: 'app-receipt-correction-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  template: `
    <h2>Corregir recibo</h2>
    <p class="hint">Solo si el lote sigue completo. Si ya se movió, primero audítalo.</p>
    @for (row of rows; track row.id) {
      <div class="row">
        <strong>{{ row.name }}</strong>
        <label>
          Cantidad
          <input type="number" min="0.001" step="0.001" [(ngModel)]="row.quantity" />
        </label>
        <label>
          Precio
          <input type="number" min="0" step="0.0001" [(ngModel)]="row.unitTotal" />
        </label>
      </div>
    }
    @if (error()) {
      <p class="error">{{ error() }}</p>
    }
    <div class="actions">
      <button type="button" (click)="dialogRef.close(false)" [disabled]="saving()">Cerrar</button>
      <button type="button" class="primary" (click)="save()" [disabled]="saving()">
        {{ saving() ? 'Guardando…' : 'Guardar corrección' }}
      </button>
    </div>
  `,
  styles: [`
    h2 { margin: 0 0 0.35rem; font-size: 1.05rem; color: #1e293b; }
    .hint { margin: 0 0 0.85rem; font-size: 0.8rem; color: #64748b; }
    .row { display: grid; gap: 0.45rem; margin-bottom: 0.85rem; }
    label { display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.75rem; color: #475569; font-weight: 600; }
    input { border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.4rem 0.55rem; font-size: 0.875rem; }
    .error { white-space: pre-wrap; color: #b91c1c; font-size: 0.8rem; }
    .actions { display: flex; justify-content: flex-end; gap: 0.5rem; }
    button { border: 1px solid #e2e8f0; background: #fff; border-radius: 8px; padding: 0.45rem 0.75rem; cursor: pointer; }
    .primary { background: #4b3e8e; color: #fff; border-color: #4b3e8e; }
  `],
})
export class ReceiptCorrectionDialogComponent {
  saving = signal(false);
  error = signal('');
  rows: Array<{ id: string; name: string; quantity: number; unitTotal: number }> = [];
  private readonly orderId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: ReceiptCorrectionDialogData,
    public dialogRef: MatDialogRef<ReceiptCorrectionDialogComponent, boolean>,
    private purchaseOrderService: PurchaseOrderService,
  ) {
    this.orderId = data.orderId;
    this.rows = (data.lines ?? [])
      .filter((line) => Number(line.received_original_quantity ?? 0) > 0)
      .map((line) => ({
        id: line.id,
        name: line.product?.name || line.received_product?.name || 'Producto',
        quantity: Number(line.received_original_quantity ?? 0),
        unitTotal: Number(line.received_original_unit_total ?? 0),
      }));
  }

  save(): void {
    this.saving.set(true);
    this.error.set('');
    this.purchaseOrderService.correctReceipt(
      this.orderId,
      this.rows.map((row) => ({
        line_item_id: row.id,
        quantity: Number(row.quantity),
        unit_total: Number(row.unitTotal),
      })),
    ).subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.error.set(error?.message || 'No se pudo corregir el recibo');
      },
    });
  }
}
