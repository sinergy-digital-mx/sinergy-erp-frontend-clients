import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import {
  collectVendorInvoiceInputs,
  VENDOR_INVOICE_MAX_COUNT,
  VENDOR_INVOICE_MAX_LENGTH,
  vendorInvoiceDraftFromOrder,
} from '../../utils/purchase-order-display.util';

export interface PurchaseOrderVendorInvoiceDialogData {
  orderId: string;
  vendorInvoiceNumbers?: string[] | null;
  vendorInvoiceNumber?: string | null;
  folio?: string;
}

export interface PurchaseOrderVendorInvoiceDialogResult {
  saved: true;
  vendor_invoice_number: string | null;
  vendor_invoice_numbers: string[];
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
  readonly maxCount = VENDOR_INVOICE_MAX_COUNT;
  invoiceInputs = signal<string[]>([]);
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
    this.invoiceInputs.set(
      vendorInvoiceDraftFromOrder({
        vendor_invoice_numbers: data.vendorInvoiceNumbers,
        vendor_invoice_number: data.vendorInvoiceNumber,
      })
    );
  }

  get dialogTitle(): string {
    return this.data.folio
      ? `Facturas de proveedor — #${this.data.folio}`
      : 'Editar facturas de proveedor';
  }

  canAddMore(): boolean {
    return this.invoiceInputs().length < this.maxCount;
  }

  addInvoice(): void {
    if (!this.canAddMore() || this.saving()) {
      return;
    }
    this.invoiceInputs.update((current) => [...current, '']);
  }

  removeInvoice(index: number): void {
    if (this.saving()) {
      return;
    }
    this.invoiceInputs.update((current) => {
      const next = current.filter((_, i) => i !== index);
      return next.length ? next : [''];
    });
  }

  updateInvoice(index: number, value: string): void {
    this.invoiceInputs.update((current) =>
      current.map((item, i) => (i === index ? value : item))
    );
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

    const payload = collectVendorInvoiceInputs(this.invoiceInputs());

    this.purchaseOrderService.updateOrderVendorInvoice(this.data.orderId, payload).subscribe({
      next: (res) => {
        this.dialogRef.close({
          saved: true,
          vendor_invoice_number: res.vendor_invoice_number,
          vendor_invoice_numbers: res.vendor_invoice_numbers,
        });
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message || 'No se pudieron guardar las facturas de proveedor');
        this.saving.set(false);
      },
    });
  }
}
