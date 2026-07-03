import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AccountingService } from '../../services/accounting.service';
import { AccountsPayableOrderRow, AccountsPayableVendorDetail } from '../../models/accounting.model';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

export interface VendorPayableDetailDialogData {
  vendorId: string;
  vendorLabel: string;
}

@Component({
  selector: 'app-vendor-payable-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './vendor-payable-detail-dialog.component.html',
  styleUrl: './vendor-payable-detail-dialog.component.scss',
})
export class VendorPayableDetailDialogComponent implements OnInit {
  detail = signal<AccountsPayableVendorDetail | null>(null);
  loading = signal(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VendorPayableDetailDialogData,
    private dialogRef: MatDialogRef<VendorPayableDetailDialogComponent>,
    private accountingService: AccountingService,
    private router: Router,
    private taxCalculator: TaxCalculatorService
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

  orderStatus(row: AccountsPayableOrderRow): string {
    return row.general_status || row.status || '—';
  }

  openPurchaseOrder(row: AccountsPayableOrderRow): void {
    if (!row.id) return;
    this.dialogRef.close();
    void this.router.navigate(['/purchase-orders', row.id]);
  }
}
