import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { VENDOR_INVOICE_MAX_LENGTH } from '../../utils/purchase-order-display.util';

export interface PurchaseOrderVendorInvoiceDialogData {
  orderId: string;
  vendorInvoiceNumber?: string | null;
  folio?: string;
}

export interface PurchaseOrderVendorInvoiceDialogResult {
  saved: true;
  vendor_invoice_number: string | null;
}

@Component({
  selector: 'app-purchase-order-vendor-invoice-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './purchase-order-vendor-invoice-dialog.component.html',
  styleUrl: './purchase-order-vendor-invoice-dialog.component.scss',
})
export class PurchaseOrderVendorInvoiceDialogComponent {
  readonly maxLength = VENDOR_INVOICE_MAX_LENGTH;
  invoiceText = signal('');
  saving = signal(false);
  errorMessage = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PurchaseOrderVendorInvoiceDialogData,
    private dialogRef: MatDialogRef<
      PurchaseOrderVendorInvoiceDialogComponent,
      PurchaseOrderVendorInvoiceDialogResult | undefined
    >,
    private purchaseOrderService: PurchaseOrderService
  ) {
    this.invoiceText.set(data.vendorInvoiceNumber?.trim() ? data.vendorInvoiceNumber.trim() : '');
  }

  get dialogTitle(): string {
    return this.data.folio
      ? `No. Factura de Proveedor — #${this.data.folio}`
      : 'Editar factura de proveedor';
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

    const trimmed = this.invoiceText().trim();
    const payload = trimmed ? trimmed : null;

    this.purchaseOrderService.updateOrderVendorInvoice(this.data.orderId, payload).subscribe({
      next: (res) => {
        this.dialogRef.close({ saved: true, vendor_invoice_number: res.vendor_invoice_number });
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message || 'No se pudo guardar la factura de proveedor');
        this.saving.set(false);
      },
    });
  }
}
