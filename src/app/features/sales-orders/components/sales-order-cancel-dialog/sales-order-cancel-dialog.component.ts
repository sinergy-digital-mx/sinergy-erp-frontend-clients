import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SalesOrderService } from '../../services/sales-order.service';

export interface SalesOrderCancelDialogData {
  orderId: string;
  folio?: string;
}

export type SalesOrderCancelDialogResult =
  | { cancelled: true }
  | { blockedCfdi: true; message: string };

@Component({
  selector: 'app-sales-order-cancel-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './sales-order-cancel-dialog.component.html',
  styleUrl: './sales-order-cancel-dialog.component.scss',
})
export class SalesOrderCancelDialogComponent {
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderCancelDialogData,
    private dialogRef: MatDialogRef<
      SalesOrderCancelDialogComponent,
      SalesOrderCancelDialogResult | undefined
    >,
    private salesOrderService: SalesOrderService
  ) {
    this.dialogRef.disableClose = false;
  }

  get folioLabel(): string {
    return this.data.folio?.trim() || this.data.orderId.substring(0, 8);
  }

  close(): void {
    if (this.saving()) {
      return;
    }
    this.dialogRef.close();
  }

  confirm(): void {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');
    this.dialogRef.disableClose = true;

    this.salesOrderService.cancelOrder(this.data.orderId).subscribe({
      next: () => {
        this.dialogRef.disableClose = false;
        this.dialogRef.close({ cancelled: true });
      },
      error: (err: Error) => {
        this.saving.set(false);
        this.dialogRef.disableClose = false;
        const message = err.message || 'No se pudo cancelar la orden';
        if (this.isCfdiBlock(message)) {
          this.dialogRef.close({ blockedCfdi: true, message });
          return;
        }
        this.errorMessage.set(message);
      },
    });
  }

  private isCfdiBlock(message: string): boolean {
    const lower = message.toLowerCase();
    return lower.includes('cfdi') || (lower.includes('factura') && lower.includes('vigente'));
  }
}
