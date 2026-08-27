import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LineItem } from '../../models/line-item.model';
import { PaymentCurrency, PurchaseOrder } from '../../models/purchase-order.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';

export interface EditPurchaseOrderLineDialogData {
  orderId: string;
  folio?: string;
  currency: PaymentCurrency;
  lineItem: LineItem;
}

@Component({
  selector: 'app-edit-purchase-order-line-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './edit-purchase-order-line-dialog.component.html',
  styleUrl: './edit-purchase-order-line-dialog.component.scss',
})
export class EditPurchaseOrderLineDialogComponent {
  readonly taxPresets = [0, 8, 16];
  quantity = 0;
  unitTotal = 0;
  ivaPercentage = 0;
  iepsPercentage = 0;
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditPurchaseOrderLineDialogData,
    private dialogRef: MatDialogRef<EditPurchaseOrderLineDialogComponent, PurchaseOrder | undefined>,
    private purchaseOrderService: PurchaseOrderService
  ) {
    const item = data.lineItem;
    this.quantity = Number(item.quantity || 0);
    this.unitTotal = Number(item.unit_total ?? item.unit_price ?? 0);
    this.ivaPercentage = Number(item.iva_percentage || 0);
    this.iepsPercentage = Number(item.ieps_percentage || 0);
  }

  get productName(): string {
    return this.data.lineItem.product?.name || 'Producto';
  }

  get dialogTitle(): string {
    return this.data.folio ? `Editar línea — #${this.data.folio}` : 'Editar línea';
  }

  setIva(value: number): void {
    this.ivaPercentage = value;
  }

  setIeps(value: number): void {
    this.iepsPercentage = value;
  }

  isTaxPreset(current: number, preset: number): boolean {
    return Number(current) === preset;
  }

  cancel(): void {
    if (this.saving()) {
      return;
    }
    this.dialogRef.close();
  }

  save(): void {
    if (this.saving()) {
      return;
    }

    const quantity = Number(this.quantity);
    const unitTotal = Number(this.unitTotal);
    const iva = Number(this.ivaPercentage);
    const ieps = Number(this.iepsPercentage);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.errorMessage.set('La cantidad debe ser mayor a 0');
      return;
    }
    if (!Number.isFinite(unitTotal) || unitTotal < 0) {
      this.errorMessage.set('El costo unitario no puede ser negativo');
      return;
    }
    if (!Number.isFinite(iva) || iva < 0 || iva > 100) {
      this.errorMessage.set('El IVA debe estar entre 0 y 100');
      return;
    }
    if (!Number.isFinite(ieps) || ieps < 0 || ieps > 100) {
      this.errorMessage.set('El IEPS debe estar entre 0 y 100');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    this.purchaseOrderService
      .patchLineItem(this.data.orderId, this.data.lineItem.id, {
        quantity,
        unit_total: unitTotal,
        iva_percentage: iva,
        ieps_percentage: ieps,
      })
      .subscribe({
        next: (order) => {
          this.dialogRef.close(order);
        },
        error: (err: Error) => {
          this.errorMessage.set(err.message || 'No se pudo actualizar la línea');
          this.saving.set(false);
        },
      });
  }
}
