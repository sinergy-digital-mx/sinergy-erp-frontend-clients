import { Component, Inject, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import {
  SalesReportPeriod,
  SellerOrderRow,
  SellerOrdersSummary,
} from '../../models/sales-report.model';
import { SalesReportService } from '../../services/sales-report.service';

export interface SellerOrdersDialogData {
  sellerId: string;
  sellerDisplayName: string;
  billingBranchId: string;
  branchName?: string;
  period: SalesReportPeriod;
  fiscalConfigurationId?: string;
  dateFrom?: string;
  dateTo?: string;
  salesCount?: number;
}

@Component({
  selector: 'app-seller-orders-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, DatatableWrapperComponent],
  templateUrl: './seller-orders-dialog.component.html',
  styleUrl: './seller-orders-dialog.component.scss',
})
export class SellerOrdersDialogComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  summary = signal<SellerOrdersSummary | null>(null);

  tableConfig = signal<IDatatableConfig>({
    rows: [] as SellerOrderRow[],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Fecha', prop: 'created_at', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Cliente', prop: 'customer', sortable: false, canAutoResize: false, width: 200 },
      { name: 'Total', prop: 'total', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 120 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 100,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin ventas', subtitle: 'No hay órdenes para este vendedor en el periodo' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SellerOrdersDialogData,
    private dialogRef: MatDialogRef<SellerOrdersDialogComponent>,
    private dialog: MatDialog,
    private salesReportService: SalesReportService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  close(): void {
    this.dialogRef.close();
  }

  formatCurrency(value: number | string | undefined | null): string {
    const n = value == null ? 0 : typeof value === 'number' ? value : Number(value);
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number.isFinite(n) ? n : 0);
  }

  formatDate(value?: string | null): string {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  customerLabel(row: SellerOrderRow): string {
    return (
      row.customer_display_name?.trim() ||
      row.customer_company_name?.trim() ||
      row.customer_person_name?.trim() ||
      row.customer_name?.trim() ||
      '—'
    );
  }

  orderTotal(row: SellerOrderRow): number | string | null | undefined {
    return row.total ?? row.amount;
  }

  orderDate(row: SellerOrderRow): string | null | undefined {
    return row.created_at ?? row.order_date;
  }

  isPaid(status?: string | null): boolean {
    return (status ?? '').trim().toLowerCase() === 'pagado';
  }

  openSalesOrder(row: SellerOrderRow): void {
    if (!row.id) return;
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: row.id },
    });
  }

  private loadOrders(): void {
    this.tableConfig.update((cfg) => ({ ...cfg, loading: true }));

    this.salesReportService
      .getBySellerOrders({
        seller_id: this.data.sellerId,
        billing_branch_id: this.data.billingBranchId,
        period: this.data.period,
        fiscal_configuration_id: this.data.fiscalConfigurationId,
        date_from: this.data.period === 'range' ? this.data.dateFrom : undefined,
        date_to: this.data.period === 'range' ? this.data.dateTo : undefined,
      })
      .subscribe({
        next: (res) => {
          const orders = res.orders ?? res.data ?? res.rows ?? [];
          this.summary.set(res.summary ?? null);
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: orders,
            totalResults: orders.length,
            loading: false,
          }));
        },
        error: () => {
          this.summary.set(null);
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: [],
            totalResults: 0,
            loading: false,
          }));
        },
      });
  }
}
