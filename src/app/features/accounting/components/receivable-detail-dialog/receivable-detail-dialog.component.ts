import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountingService } from '../../services/accounting.service';
import { AccountsReceivableDetail, AccountsReceivableOrderRow } from '../../models/accounting.model';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { formatPosUser } from '../../../sales-orders/utils/pos-user-display.util';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { ToastService } from '../../../../core/services/toast.service';
import { PosReceiptPreviewDialogComponent } from '../../../pos/components/pos-receipt-preview-dialog/pos-receipt-preview-dialog.component';
import { SalesOrderInvoiceService } from '../../../sales-orders/services/sales-order-invoice.service';
import { openStampedInvoicePdf } from '../../utils/open-stamped-invoice-pdf';

export interface ReceivableDetailDialogData {
  razonSocial: string;
  fiscalRfc?: string;
  fiscalConfigurationId?: string;
}

@Component({
  selector: 'app-receivable-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTooltipModule, SpinnerComponent],
  templateUrl: './receivable-detail-dialog.component.html',
  styleUrl: './receivable-detail-dialog.component.scss',
})
export class ReceivableDetailDialogComponent implements OnInit {
  detail = signal<AccountsReceivableDetail | null>(null);
  loading = signal(true);
  openingPdfId = signal<string | null>(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReceivableDetailDialogData,
    private dialogRef: MatDialogRef<ReceivableDetailDialogComponent>,
    private dialog: MatDialog,
    private accountingService: AccountingService,
    private invoices: SalesOrderInvoiceService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.accountingService
      .getAccountsReceivableOrders(this.data.razonSocial, this.data.fiscalConfigurationId)
      .subscribe({
        next: (detail) => {
          this.detail.set(detail);
          this.loading.set(false);
        },
        error: () => {
          this.detail.set(null);
          this.loading.set(false);
        },
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  formatCurrency(value: number | string | undefined | null, currency: 'MXN' | 'USD' = 'MXN'): string {
    const n = value == null ? 0 : typeof value === 'number' ? value : Number(value);
    return formatUnitCurrency(Number.isFinite(n) ? n : 0, currency);
  }

  orderCurrency(row: AccountsReceivableOrderRow): 'MXN' | 'USD' {
    return String(row.currency ?? '').trim().toUpperCase() === 'USD' ? 'USD' : 'MXN';
  }

  formatDate(value?: string): string {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  sellerLabel(row: AccountsReceivableOrderRow): string {
    return formatPosUser(row.seller_user);
  }

  openTicket(row: AccountsReceivableOrderRow): void {
    if (!row.id) return;
    this.dialog.open(PosReceiptPreviewDialogComponent, {
      width: '480px',
      maxWidth: '95vw',
      panelClass: 'pos-dialog-panel',
      autoFocus: false,
      data: {
        salesOrderId: row.id,
        useSalesOrderTicketApi: true,
        title: `Ticket ${row.folio || row.id}`,
      },
    });
  }

  openInvoicePdf(row: AccountsReceivableOrderRow): void {
    if (!row.id || this.openingPdfId()) return;
    openStampedInvoicePdf(
      this.dialog,
      this.invoices,
      this.toast,
      row.id,
      (busy) => this.openingPdfId.set(busy ? row.id : null),
      null,
      row.folio ? `Factura ${row.folio}` : 'Factura',
    );
  }

  openSalesOrder(row: AccountsReceivableOrderRow): void {
    if (!row.id) return;
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: row.id },
    });
  }
}
