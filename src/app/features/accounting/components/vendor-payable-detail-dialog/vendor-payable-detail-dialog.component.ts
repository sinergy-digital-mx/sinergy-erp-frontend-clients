import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { OrderDetailDialogComponent } from '../../../purchase-orders/components/order-detail-dialog/order-detail-dialog.component';
import { AccountingService } from '../../services/accounting.service';
import {
  AccountsPayableOrderRow,
  AccountsPayableVendorDetail,
  PayableCurrencyView,
} from '../../models/accounting.model';

export interface VendorPayableDetailDialogData {
  vendorId: string;
  vendorLabel: string;
  currency?: PayableCurrencyView;
}

@Component({
  selector: 'app-vendor-payable-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SpinnerComponent],
  templateUrl: './vendor-payable-detail-dialog.component.html',
  styleUrl: './vendor-payable-detail-dialog.component.scss',
})
export class VendorPayableDetailDialogComponent implements OnInit {
  detail = signal<AccountsPayableVendorDetail | null>(null);
  loading = signal(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VendorPayableDetailDialogData,
    private dialogRef: MatDialogRef<VendorPayableDetailDialogComponent>,
    private dialog: MatDialog,
    private accountingService: AccountingService
  ) {}

  ngOnInit(): void {
    this.accountingService.getAccountsPayableVendorDetail(this.data.vendorId).subscribe({
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

  vendorDisplayName(): string {
    const detail = this.detail();
    if (!detail) {
      return this.data.vendorLabel;
    }
    return (
      detail.vendor_name?.trim() ||
      detail.razon_social?.trim() ||
      detail.company_name?.trim() ||
      this.data.vendorLabel
    );
  }

  visibleOrders(): AccountsPayableOrderRow[] {
    const orders = this.detail()?.orders ?? [];
    const view = this.data.currency ?? 'all';
    if (view === 'all') {
      return orders;
    }
    const currency = view === 'usd' ? 'USD' : 'MXN';
    return orders.filter((row) => this.orderCurrency(row) === currency);
  }

  orderCount(currency: 'MXN' | 'USD'): number {
    return this.visibleOrders().filter((row) => this.orderCurrency(row) === currency).length;
  }

  pendingTotal(currency: 'MXN' | 'USD'): number {
    return this.visibleOrders()
      .filter((row) => this.orderCurrency(row) === currency)
      .reduce((sum, row) => sum + this.asNumber(row.amount_pending), 0);
  }

  showsMxn(): boolean {
    return (this.data.currency ?? 'all') !== 'usd';
  }

  showsUsd(): boolean {
    return (this.data.currency ?? 'all') !== 'mxn';
  }

  close(): void {
    this.dialogRef.close();
  }

  formatCurrency(value: number | string | undefined | null, currency: 'MXN' | 'USD'): string {
    return formatUnitCurrency(this.asNumber(value), currency);
  }

  orderCurrency(row: AccountsPayableOrderRow): 'MXN' | 'USD' {
    return String(row.payment_currency ?? '').trim().toUpperCase() === 'USD' ? 'USD' : 'MXN';
  }

  formatDate(value?: string): string {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  orderStatus(row: AccountsPayableOrderRow): string {
    return row.general_status || row.status || '—';
  }

  openPurchaseOrder(row: AccountsPayableOrderRow): void {
    if (!row.id) return;
    this.dialog.open(OrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: row.id },
    });
  }

  private asNumber(value: number | string | undefined | null): number {
    const amount = value == null ? 0 : typeof value === 'number' ? value : Number(value);
    return Number.isFinite(amount) ? amount : 0;
  }
}
