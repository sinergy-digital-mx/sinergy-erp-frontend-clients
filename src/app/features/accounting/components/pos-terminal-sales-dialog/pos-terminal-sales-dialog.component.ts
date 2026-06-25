import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import { AccountingPeriod, PosTerminalSaleRow, SalesTerminalSummary } from '../../models/accounting.model';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { formatPosUser } from '../../../sales-orders/utils/pos-user-display.util';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

export interface PosTerminalSalesDialogData {
  terminal: SalesTerminalSummary;
  billingBranchId: string;
  period: AccountingPeriod;
  dateFrom: string;
  dateTo: string;
}

@Component({
  selector: 'app-pos-terminal-sales-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, DatatableWrapperComponent],
  templateUrl: './pos-terminal-sales-dialog.component.html',
  styleUrl: './pos-terminal-sales-dialog.component.scss',
})
export class PosTerminalSalesDialogComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  tableConfig: IDatatableConfig = {
    rows: [] as PosTerminalSaleRow[],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Fecha', prop: 'created_at', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Cliente', prop: 'customer', sortable: false, canAutoResize: false, width: 180 },
      { name: 'Vendedor', prop: 'seller', sortable: false, canAutoResize: false, width: 160 },
      { name: 'Total', prop: 'total', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Estatus pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 120 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin ventas', subtitle: 'No hay órdenes para esta terminal en el periodo' },
    columnMode: 'force',
    reorderable: false,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosTerminalSalesDialogData,
    private dialogRef: MatDialogRef<PosTerminalSalesDialogComponent>,
    private dialog: MatDialog,
    private accountingService: AccountingService,
    private taxCalculator: TaxCalculatorService
  ) {}

  ngOnInit(): void {
    this.loadPage(1);
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

  sellerLabel(row: PosTerminalSaleRow): string {
    return formatPosUser(row.seller_user);
  }

  onPageChange(event: IPaginationEvent): void {
    this.loadPage(event.page);
  }

  openSalesOrder(row: PosTerminalSaleRow): void {
    if (!row.id) return;
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: row.id },
    });
  }

  private loadPage(page: number): void {
    this.tableConfig = { ...this.tableConfig, loading: true, page };

    this.accountingService
      .getPosTerminalSales(this.data.terminal.terminal_user_id, {
        period: this.data.period,
        billing_branch_id: this.data.billingBranchId,
        date_from: this.data.period === 'range' ? this.data.dateFrom : undefined,
        date_to: this.data.period === 'range' ? this.data.dateTo : undefined,
      }, page, this.tableConfig.limit)
      .subscribe({
        next: (res) => {
          this.tableConfig = {
            ...this.tableConfig,
            rows: res.data,
            page: res.page,
            totalResults: res.total,
            loading: false,
          };
        },
        error: () => {
          this.tableConfig = {
            ...this.tableConfig,
            rows: [],
            totalResults: 0,
            loading: false,
          };
        },
      });
  }
}
