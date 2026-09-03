import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SalesOrderDetailPayload, SalesOrderLineItem } from '../../models/sales-order.model';
import { SalesOrderPaymentCurrency } from '../../models/sales-order-payment.model';
import { SalesOrderService } from '../../services/sales-order.service';

export interface EditSalesOrderLineDialogData {
  orderId: string;
  folio?: string;
  currency: SalesOrderPaymentCurrency;
  lineItem: SalesOrderLineItem;
}

@Component({
  selector: 'app-edit-sales-order-line-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './edit-sales-order-line-dialog.component.html',
  styleUrl: './edit-sales-order-line-dialog.component.scss',
})
export class EditSalesOrderLineDialogComponent {
  readonly taxPresets = [0, 8, 16];
  quantity = 0;
  unitPrice = 0;
  ivaPercentage = 0;
  iepsPercentage = 0;
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditSalesOrderLineDialogData,
    private dialogRef: MatDialogRef<EditSalesOrderLineDialogComponent, SalesOrderDetailPayload | undefined>,
    private salesOrderService: SalesOrderService
  ) {
    const item = data.lineItem;
    this.quantity = Number(item.quantity || 0);
    this.unitPrice = Number(item.unit_price || 0);
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
    const unitPrice = Number(this.unitPrice);
    const iva = Number(this.ivaPercentage);
    const ieps = Number(this.iepsPercentage);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.errorMessage.set('La cantidad debe ser mayor a 0');
      return;
    }
    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      this.errorMessage.set('El precio unitario no puede ser negativo');
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

    this.salesOrderService
      .patchLineItem(this.data.orderId, String(this.data.lineItem.id), {
        quantity,
        unit_price: unitPrice,
        iva_percentage: iva,
        ieps_percentage: ieps,
      })
      .subscribe({
        next: (payload) => {
          this.dialogRef.close(payload);
        },
        error: (err: Error) => {
          this.errorMessage.set(err.message || 'No se pudo actualizar la línea');
          this.saving.set(false);
        },
      });
  }
}
