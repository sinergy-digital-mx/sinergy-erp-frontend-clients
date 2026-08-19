import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PEDIMENTO_MAX_LENGTH } from '../../utils/purchase-order-display.util';

export interface PurchaseOrderPedimentoDialogData {
  orderId: string;
  pedimentoNumber?: string | null;
  folio?: string;
}

export interface PurchaseOrderPedimentoDialogResult {
  saved: true;
  pedimento_number: string | null;
}

@Component({
  selector: 'app-purchase-order-pedimento-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './purchase-order-pedimento-dialog.component.html',
  styleUrl: './purchase-order-pedimento-dialog.component.scss',
})
export class PurchaseOrderPedimentoDialogComponent {
  readonly maxLength = PEDIMENTO_MAX_LENGTH;
  pedimentoText = signal('');
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderPedimentoDialogData,
    private dialogRef: MatDialogRef<
      PurchaseOrderPedimentoDialogComponent,
      PurchaseOrderPedimentoDialogResult | undefined
    >,
    private purchaseOrderService: PurchaseOrderService
  ) {
    this.pedimentoText.set(data.pedimentoNumber?.trim() ? data.pedimentoNumber.trim() : '');
  }

  get dialogTitle(): string {
    return this.data.folio ? `Pedimento — #${this.data.folio}` : 'Editar pedimento';
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

    this.saving.set(true);
    this.errorMessage.set('');

    const trimmed = this.pedimentoText().trim();
    const payload = trimmed ? trimmed : null;

    this.purchaseOrderService.updateOrderPedimento(this.data.orderId, payload).subscribe({
      next: (res) => {
        this.dialogRef.close({ saved: true, pedimento_number: res.pedimento_number });
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message || 'No se pudo guardar el pedimento');
        this.saving.set(false);
      },
    });
  }
}
