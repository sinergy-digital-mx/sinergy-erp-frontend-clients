import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ToastService } from '../../../../core/services/toast.service';
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
import { paymentMethodLabel } from '../../../pos/models/pos-collected-sales.model';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

interface CollectionFilterChip {
  type: CollectionCustomerType;
  label: string;
  count: number;
}

@Component({
  selector: 'app-pos-collections-tab',
  standalone: true,
  imports: [CommonModule, FormsModule, DatatableWrapperComponent],
  templateUrl: './pos-collections-tab.component.html',
  styleUrl: './pos-collections-tab.component.scss',
})
export class PosCollectionsTabComponent implements OnChanges {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  @Input() billingBranchId = '';
  @Input() period: AccountingPeriod = 'month';
  @Input() dateFrom = '';
  @Input() dateTo = '';
  @Input() reloadToken = 0;

  branchMissing = signal(false);
  customerType = signal<CollectionCustomerType>('all');
  search = signal('');
  listTotal = signal(0);
  exporting = signal(false);
  collectionTerminal = signal<CollectionTerminalSummary>(this.emptyCollectionTerminal());
  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  tableConfig = signal<IDatatableConfig>({
    rows: [] as PosCollectionRow[],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Fecha venta', prop: 'created_at', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Fecha cobro', prop: 'collected_at', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Cliente', prop: 'customer', sortable: false, canAutoResize: false, width: 180 },
      { name: 'Vendedor', prop: 'seller', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Cajero', prop: 'cashier', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Pago', prop: 'payment_method', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Total', prop: 'total', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Estatus', prop: 'payment_status', sortable: false, canAutoResize: false, width: 100 },
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
    private accountingService: AccountingService,
    private dialog: MatDialog,
    private taxCalculator: TaxCalculatorService,
    private toast: ToastService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['reloadToken'] ||
      changes['billingBranchId'] ||
      changes['period'] ||
      changes['dateFrom'] ||
      changes['dateTo']
    ) {
      this.customerType.set('all');
      this.search.set('');
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }
      this.loadSummaryAndPage(1);
    }
  }

  filterChips(): CollectionFilterChip[] {
    const collection = this.collectionTerminal();
    return [
      { type: 'all', label: 'Todas', count: collection.orders_collected },
      { type: 'walk_in', label: 'Público en General', count: collection.walk_in_count },
      { type: 'invoiced', label: 'Facturadas', count: collection.invoiced_count },
    ];
  }

  setCustomerType(type: CollectionCustomerType): void {
    if (this.customerType() === type || this.tableConfig().loading) {
      return;
    }
    this.customerType.set(type);
    this.loadPage(1);
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(() => this.loadPage(1), 300);
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

  methodLabel(row: PosCollectionRow): string {
    return row.payment_method_label || paymentMethodLabel(row.payment_method);
  }

  customerPrimary(row: PosCollectionRow): string {
    return (
      row.walk_in_name?.trim() ||
      row.customer_company_name ||
      row.customer_person_name ||
      row.customer_display_name ||
      'Público en General'
    );
  }

  customerSecondary(row: PosCollectionRow): string {
    if (row.walk_in_name?.trim()) {
      return row.walk_in_rfc?.trim() || row.customer_person_name || '';
    }
    if (row.customer_company_name && row.customer_person_name) {
      return row.customer_person_name;
    }
    return row.walk_in_rfc?.trim() || '';
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

  downloadExcel(): void {
    if (!this.billingBranchId || this.exporting()) {
      return;
    }
    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      this.toast.error('Indica fecha desde y hasta');
      return;
    }

    this.exporting.set(true);
    this.accountingService
      .exportPosCollectionsExcel(this.periodQuery(), this.customerType(), this.search())
      .subscribe({
        next: ({ blob, filename }) => {
          this.exporting.set(false);
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = filename;
          anchor.click();
          URL.revokeObjectURL(url);
        },
        error: (error) => {
          this.exporting.set(false);
          this.toast.error(error?.message || 'No se pudo descargar el Excel');
        },
      });
  }

  private loadSummaryAndPage(page: number): void {
    if (!this.billingBranchId) {
      this.branchMissing.set(true);
      this.collectionTerminal.set(this.emptyCollectionTerminal());
      this.listTotal.set(0);
      this.tableConfig.update((cfg) => ({ ...cfg, rows: [], loading: false, totalResults: 0 }));
      return;
    }

    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      return;
    }

    this.branchMissing.set(false);
    this.accountingService.getPosSummary(this.periodQuery()).subscribe({
      next: (res) => {
        this.collectionTerminal.set(res.collection_terminal ?? this.emptyCollectionTerminal());
      },
      error: () => {
        this.collectionTerminal.set(this.emptyCollectionTerminal());
      },
    });
    this.loadPage(page);
  }

  private loadPage(page: number): void {
    if (!this.billingBranchId) {
      return;
    }
    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      return;
    }

    this.tableConfig.update((cfg) => ({ ...cfg, loading: true, page }));
    this.accountingService
      .getPosCollections(this.periodQuery(), this.customerType(), page, this.tableConfig().limit, this.search())
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

  private periodQuery() {
    return {
      period: this.period,
      billing_branch_id: this.billingBranchId,
      date_from: this.period === 'range' ? this.dateFrom : undefined,
      date_to: this.period === 'range' ? this.dateTo : undefined,
    };
  }

  private emptyCollectionTerminal(): CollectionTerminalSummary {
    return {
      terminal_user_id: null,
      terminal_name: null,
      orders_collected: 0,
      amount_collected: 0,
      walk_in_count: 0,
      invoiced_count: 0,
      daily_shifts_count: 0,
      partial_shifts_count: 0,
      open_daily_shift: null,
    };
  }
}
