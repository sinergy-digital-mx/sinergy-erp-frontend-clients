import { Component, Inject, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { formatBusinessDateTime } from '../../../../core/utils/api-datetime.util';
import { AccountingService } from '../../services/accounting.service';
import {
  AccountingPeriod,
  CollectionCustomerType,
  CollectionTerminalSummary,
  PosCollectionPaymentMethodKey,
  PosCollectionRow,
} from '../../models/accounting.model';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { PosReceiptPreviewDialogComponent } from '../../../pos/components/pos-receipt-preview-dialog/pos-receipt-preview-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { PosUserSummary, isForShippingFlag } from '../../../sales-orders/models/sales-order.model';
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
  icon: string;
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
  paymentMethod = signal<PosCollectionPaymentMethodKey | null>(null);
  listTotal = signal(0);

  readonly filterChips: CollectionFilterChip[];
  readonly creditCount: number;

  tableConfig = signal<IDatatableConfig>({
    rows: [] as PosCollectionRow[],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Fecha venta', prop: 'created_at', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Fecha pago', prop: 'payment_date', sortable: false, canAutoResize: false, width: 110 },
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
      { type: 'all', label: 'Todas', count: collection.orders_collected, icon: 'fi-rr-apps' },
      { type: 'walk_in', label: 'Público en General', count: collection.walk_in_count, icon: 'fi-rr-user' },
      { type: 'invoiced', label: 'Facturadas', count: collection.invoiced_count, icon: 'fi-rr-file-invoice' },
    ];
    this.creditCount = collection.credit_count ?? 0;
    this.customerType.set(data.customerType ?? 'all');
  }

  get terminalTitle(): string {
    return this.data.collection.terminal_name?.trim() || 'Caja';
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

  toggleCredit(): void {
    if (this.tableConfig().loading) {
      return;
    }
    this.paymentMethod.set(this.paymentMethod() === 'credit' ? null : 'credit');
    this.loadPage(1);
  }

  isForShipping(row: PosCollectionRow): boolean {
    return isForShippingFlag(row.for_shipping);
  }

  formatCurrency(value: number | string | undefined | null): string {
    const n = value == null ? 0 : typeof value === 'number' ? value : Number(value);
    return this.taxCalculator.formatCurrency(Number.isFinite(n) ? n : 0);
  }

  formatDate(value?: string): string {
    return formatBusinessDateTime(value)?.date ?? '—';
  }

  formatPaymentDate(value?: string | null): string {
    const day = (value || '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
      return '—';
    }
    const [year, month, dayNum] = day.split('-').map(Number);
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${dayNum} ${months[month - 1]} ${year}`;
  }

  sellerLabel(row: PosCollectionRow): string {
    return this.personName(row.seller_user);
  }

  cashierLabel(row: PosCollectionRow): string {
    return this.personName(row.collected_by_user);
  }

  hasCollectedMoney(row: PosCollectionRow): boolean {
    const total = row.total == null ? 0 : typeof row.total === 'number' ? row.total : Number(row.total);
    return Number.isFinite(total) && total > 0;
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

  openTicket(row: PosCollectionRow): void {
    if (!row.id || !this.hasCollectedMoney(row)) {
      return;
    }
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

  private personName(user?: PosUserSummary | null): string {
    if (!user) {
      return '—';
    }
    return [user.first_name, user.last_name].filter(Boolean).join(' ').trim() || '—';
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
        this.tableConfig().limit,
        undefined,
        this.paymentMethod()
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
