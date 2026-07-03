import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AccountingService } from '../../services/accounting.service';
import { AccountsReceivableDetail, AccountsReceivableOrderRow } from '../../models/accounting.model';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { formatPosUser } from '../../../sales-orders/utils/pos-user-display.util';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

export interface ReceivableDetailDialogData {
  razonSocial: string;
  fiscalRfc?: string;
  billingBranchId?: string;
}

@Component({
  selector: 'app-receivable-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './receivable-detail-dialog.component.html',
  styleUrl: './receivable-detail-dialog.component.scss',
})
export class ReceivableDetailDialogComponent implements OnInit {
  detail = signal<AccountsReceivableDetail | null>(null);
  loading = signal(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReceivableDetailDialogData,
    private dialogRef: MatDialogRef<ReceivableDetailDialogComponent>,
    private dialog: MatDialog,
    private accountingService: AccountingService,
    private taxCalculator: TaxCalculatorService
  ) {}

  ngOnInit(): void {
    this.accountingService
      .getAccountsReceivableOrders(this.data.razonSocial, this.data.billingBranchId)
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

  formatCurrency(value: number | string | undefined | null): string {
    const n = value == null ? 0 : typeof value === 'number' ? value : Number(value);
    return this.taxCalculator.formatCurrency(Number.isFinite(n) ? n : 0);
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

  openSalesOrder(row: AccountsReceivableOrderRow): void {
    if (!row.id) return;
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: row.id },
    });
  }
}
