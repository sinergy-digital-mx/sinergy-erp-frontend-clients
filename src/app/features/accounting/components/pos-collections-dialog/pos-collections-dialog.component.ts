import { Component, Inject, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import {
  AccountingPeriod,
  CollectionCustomerType,
  CollectionTerminalSummary,
  PosCollectionRow,
} from '../../models/accounting.model';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { formatPosUser } from '../../../sales-orders/utils/pos-user-display.util';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

export interface PosCollectionsDialogData {
  collection: CollectionTerminalSummary;
  billingBranchId: string;
  period: AccountingPeriod;
  dateFrom: string;
  dateTo: string;
  customerType?: CollectionCustomerType;
}

interface CollectionFilterChip {
  type: CollectionCustomerType;
  label: string;
  count: number;
}

@Component({
  selector: 'app-pos-collections-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, DatatableWrapperComponent],
  templateUrl: './pos-collections-dialog.component.html',
  styleUrl: './pos-collections-dialog.component.scss',
})
export class PosCollectionsDialogComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  customerType = signal<CollectionCustomerType>('all');
  listTotal = signal(0);

  readonly filterChips: CollectionFilterChip[];

  tableConfig = signal<IDatatableConfig>({
    rows: [] as PosCollectionRow[],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Fecha venta', prop: 'created_at', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Fecha cobro', prop: 'collected_at', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Cliente', prop: 'customer', sortable: false, canAutoResize: false, width: 170 },
      { name: 'Vendedor', prop: 'seller', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Cajero', prop: 'cashier', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Total', prop: 'total', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Estatus pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 110 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin cobros', subtitle: 'No hay órdenes cobradas para este filtro en el periodo' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosCollectionsDialogData,
    private dialogRef: MatDialogRef<PosCollectionsDialogComponent>,
    private dialog: MatDialog,
    private accountingService: AccountingService,
    private taxCalculator: TaxCalculatorService
  ) {
    const collection = data.collection;
    this.filterChips = [
      { type: 'all', label: 'Todas', count: collection.orders_collected },
      { type: 'walk_in', label: 'Público en General', count: collection.walk_in_count },
      { type: 'invoiced', label: 'Facturadas', count: collection.invoiced_count },
    ];
    this.customerType.set(data.customerType ?? 'all');
  }

  get terminalTitle(): string {
    return this.data.collection.terminal_name?.trim() || 'Cobranza';
  }

  ngOnInit(): void {
    this.loadPage(1);
  }

  close(): void {
    this.dialogRef.close();
  }

  setCustomerType(type: CollectionCustomerType): void {
    if (this.customerType() === type || this.tableConfig().loading) {
      return;
    }
    this.customerType.set(type);
    this.loadPage(1);
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

  sellerLabel(row: PosCollectionRow): string {
    return formatPosUser(row.seller_user);
  }

  cashierLabel(row: PosCollectionRow): string {
    return formatPosUser(row.collected_by_user);
  }

  onPageChange(event: IPaginationEvent): void {
    this.loadPage(event.page);
  }

  openSalesOrder(row: PosCollectionRow): void {
    if (!row.id) return;
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: row.id },
    });
  }

  private loadPage(page: number): void {
    this.tableConfig.update((cfg) => ({ ...cfg, loading: true, page }));

    this.accountingService
      .getPosCollections(
        {
          period: this.data.period,
          billing_branch_id: this.data.billingBranchId,
          date_from: this.data.period === 'range' ? this.data.dateFrom : undefined,
          date_to: this.data.period === 'range' ? this.data.dateTo : undefined,
        },
        this.customerType(),
        page,
        this.tableConfig().limit
      )
      .subscribe({
        next: (res) => {
          this.listTotal.set(res.total);
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: res.data,
            page: res.page,
            totalResults: res.total,
            loading: false,
          }));
        },
        error: () => {
          this.listTotal.set(0);
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
