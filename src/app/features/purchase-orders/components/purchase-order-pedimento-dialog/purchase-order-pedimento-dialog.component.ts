import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PedimentoMaskDirective } from '../../directives/pedimento-mask.directive';
import {
  PEDIMENTO_HINT,
  PEDIMENTO_INPUT_MAX_LENGTH,
  PEDIMENTO_MASK_PLACEHOLDER,
  parsePedimentoNumber,
  pedimentoDigits,
  pedimentoInputValue,
} from '../../utils/pedimento-number.util';

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
  imports: [CommonModule, FormsModule, MatDialogModule, PedimentoMaskDirective],
  templateUrl: './purchase-order-pedimento-dialog.component.html',
  styleUrl: './purchase-order-pedimento-dialog.component.scss',
})
export class PurchaseOrderPedimentoDialogComponent {
  readonly maxLength = PEDIMENTO_INPUT_MAX_LENGTH;
  readonly placeholder = PEDIMENTO_MASK_PLACEHOLDER;
  readonly hint = PEDIMENTO_HINT;
  pedimentoText = signal('');
  saving = signal(false);
  errorMessage = signal('');
  attempted = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderPedimentoDialogData,
    private dialogRef: MatDialogRef<
      PurchaseOrderPedimentoDialogComponent,
      PurchaseOrderPedimentoDialogResult | undefined
    >,
    private purchaseOrderService: PurchaseOrderService
  ) {
    this.pedimentoText.set(pedimentoInputValue(data.pedimentoNumber));
  }

  onPedimentoChange(value: string): void {
    this.pedimentoText.set(pedimentoInputValue(value));
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }

  shownError(): string {
    const parsed = parsePedimentoNumber(this.pedimentoText());
    if (parsed.valid) {
      return this.errorMessage();
    }
    const complete = pedimentoDigits(this.pedimentoText()).length >= 15;
    if (complete || this.attempted()) {
      return parsed.message || this.errorMessage();
    }
    return this.errorMessage();
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

    const parsed = parsePedimentoNumber(this.pedimentoText());
    if (!parsed.valid) {
      this.attempted.set(true);
      this.errorMessage.set(parsed.message || 'El pedimento no tiene el formato del SAT');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');

    const payload = parsed.formatted;

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
