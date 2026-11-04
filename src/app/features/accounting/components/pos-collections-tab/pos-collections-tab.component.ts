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
import { BUSINESS_TIME_ZONE, formatBusinessDateTime, parseApiDateTime } from '../../../../core/utils/api-datetime.util';
import { AccountingService } from '../../services/accounting.service';
import {
  AccountingPeriod,
  CollectionCustomerType,
  PosCollectionPaymentMethodKey,
  PosCollectionPaymentMethodTotal,
  PosCollectionRow,
  PosCollectionsSummary,
} from '../../models/accounting.model';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { PosReceiptPreviewDialogComponent } from '../../../pos/components/pos-receipt-preview-dialog/pos-receipt-preview-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { paymentMethodLabel } from '../../../pos/models/pos-collected-sales.model';
import { PosUserSummary, isForShippingFlag } from '../../../sales-orders/models/sales-order.model';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

interface CollectionFilterChip {
  type: CollectionCustomerType;
  label: string;
  count: number;
  icon: string;
}

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'] as const;

interface PaymentFilterChip {
  key: PosCollectionPaymentMethodKey;
  label: string;
  count: number;
  amount: number;
  icon: string;
}

interface PaymentMethodCard {
  key: PosCollectionPaymentMethodKey;
  label: string;
  icon: string;
  totals: PosCollectionPaymentMethodTotal;
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
  paymentMethod = signal<PosCollectionPaymentMethodKey | null>(null);
  forShipping = signal(false);
  search = signal('');
  listTotal = signal(0);
  filteredAmount = signal(0);
  appliedFrom = signal('');
  appliedTo = signal('');
  exporting = signal(false);
  summary = signal<PosCollectionsSummary>(this.emptySummary());
  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  tableConfig = signal<IDatatableConfig>({
    rows: [] as PosCollectionRow[],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Fechas', prop: 'created_at', sortable: false, canAutoResize: false, width: 168 },
      { name: 'Sucursal', prop: 'billing_branch', sortable: false, canAutoResize: false, width: 108 },
      { name: 'Cliente', prop: 'customer', sortable: false, canAutoResize: false, width: 136 },
      { name: 'Vendedor / cajero', prop: 'seller', sortable: false, canAutoResize: true, width: 260 },
      { name: 'Pago', prop: 'payment_method', sortable: false, canAutoResize: false, width: 148 },
      { name: 'Total', prop: 'total', sortable: false, canAutoResize: false, width: 96 },
      { name: 'Anticipo', prop: 'advance_given', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Pendiente', prop: 'amount_pending', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Estatus', prop: 'payment_status', sortable: false, canAutoResize: false, width: 88 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin ventas en estas fechas', subtitle: 'No hay cobros ni abonos de crédito en el periodo' },
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
      this.paymentMethod.set(null);
      this.forShipping.set(false);
      this.search.set('');
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }
      this.reload(1);
    }
  }

  paymentMethodCards(): PaymentMethodCard[] {
    const methods = this.summary().by_payment_method;
    const empty: PosCollectionPaymentMethodTotal = { orders: 0, amount: 0, ticket: 0 };
    return [
      { key: 'transfer', label: 'Transferencias', icon: 'fi-rr-bank', totals: methods?.transfer ?? empty },
      { key: 'cash', label: 'Efectivo', icon: 'fi-rr-money', totals: methods?.cash ?? empty },
      { key: 'card', label: 'Tarjetas', icon: 'fi-rr-credit-card', totals: methods?.card ?? empty },
      { key: 'check', label: 'Cheques', icon: 'fi-rr-document', totals: methods?.check ?? empty },
      { key: 'credit', label: 'Crédito', icon: 'fi-rr-handshake', totals: methods?.credit ?? empty },
    ];
  }

  filterChips(): CollectionFilterChip[] {
    const summary = this.summary();
    return [
      { type: 'all', label: 'Todas', count: summary.orders_collected, icon: 'fi-rr-apps' },
      { type: 'walk_in', label: 'Público en General', count: summary.walk_in_count, icon: 'fi-rr-user' },
      { type: 'invoiced', label: 'Facturadas', count: summary.invoiced_count, icon: 'fi-rr-file-invoice' },
    ];
  }

  paymentFilters(): PaymentFilterChip[] {
    const methods = this.summary().by_payment_method;
    return [
      { key: 'cash', label: 'Efectivo', count: methods?.cash?.orders ?? 0, amount: methods?.cash?.amount ?? 0, icon: 'fi-rr-money' },
      { key: 'card', label: 'Tarjeta', count: methods?.card?.orders ?? 0, amount: methods?.card?.amount ?? 0, icon: 'fi-rr-credit-card' },
      { key: 'transfer', label: 'Transferencia', count: methods?.transfer?.orders ?? 0, amount: methods?.transfer?.amount ?? 0, icon: 'fi-rr-bank' },
      { key: 'check', label: 'Cheque', count: methods?.check?.orders ?? 0, amount: methods?.check?.amount ?? 0, icon: 'fi-rr-document' },
      { key: 'credit', label: 'Crédito', count: methods?.credit?.orders ?? 0, amount: methods?.credit?.amount ?? 0, icon: 'fi-rr-handshake' },
    ];
  }

  toggleShipping(): void {
    if (this.tableConfig().loading) {
      return;
    }
    this.forShipping.set(!this.forShipping());
    this.fetchPage(1);
  }

  togglePaymentMethod(key: PosCollectionPaymentMethodKey): void {
    if (this.tableConfig().loading) {
      return;
    }
    this.paymentMethod.set(this.paymentMethod() === key ? null : key);
    this.fetchPage(1);
  }

  periodCaption(): string {
    const from = this.appliedFrom();
    const to = this.appliedTo();
    if (!from || !to) {
      return '';
    }
    if (from === to) {
      return this.formatIsoDay(from);
    }
    return `Del ${this.formatIsoDay(from)} al ${this.formatIsoDay(to)}`;
  }

  setCustomerType(type: CollectionCustomerType): void {
    if (this.customerType() === type || this.tableConfig().loading) {
      return;
    }
    this.customerType.set(type);
    this.fetchPage(1);
  }

  onSearchChange(value: string): void {
    this.search.set(value);
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(() => this.fetchPage(1), 300);
  }

  formatCurrency(value: number | string | undefined | null): string {
    const n = value == null ? 0 : typeof value === 'number' ? value : Number(value);
    return this.taxCalculator.formatCurrency(Number.isFinite(n) ? n : 0);
  }

  formatDate(value?: string | null): string {
    return formatBusinessDateTime(value)?.date ?? '—';
  }

  /** Fecha de pago: día de calendario, sin corrimiento de zona. */
  formatPaymentDate(value?: string | null): string {
    const day = (value || '').slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(day) ? this.formatIsoDay(day) : '—';
  }

  personName(user?: PosUserSummary | null): string {
    if (!user) {
      return '—';
    }
    return [user.first_name, user.last_name].filter(Boolean).join(' ').trim() || '—';
  }

  isForShipping(row: PosCollectionRow): boolean {
    return isForShippingFlag(row.for_shipping);
  }

  hasCollectedMoney(row: PosCollectionRow): boolean {
    const total = row.total == null ? 0 : typeof row.total === 'number' ? row.total : Number(row.total);
    return Number.isFinite(total) && total > 0;
  }

  branchCity(row: PosCollectionRow): string {
    return row.billing_branch?.city?.trim() || row.billing_branch?.label?.trim() || '—';
  }

  branchCode(row: PosCollectionRow): string {
    const code = row.billing_branch?.code?.trim() || '';
    const city = row.billing_branch?.city?.trim() || '';
    if (!code || code === city) {
      return '';
    }
    return code;
  }

  methodLabel(row: PosCollectionRow): string {
    return row.payment_method_label || paymentMethodLabel(row.payment_method);
  }

  /** Combinación del mixto (`Efectivo + Tarjeta`). Vacío si es un solo método. */
  methodDetail(row: PosCollectionRow): string {
    const detail = row.payment_breakdown_label?.trim() || '';
    if (!detail || detail === this.methodLabel(row)) {
      return '';
    }
    return detail;
  }

  methodClass(row: PosCollectionRow): string {
    const method = (row.payment_method || '').toLowerCase();
    if (method === 'cash' || method === 'card' || method === 'transfer' || method === 'check' || method === 'mixed' || method === 'credit') {
      return `pay-badge pay-badge--${method}`;
    }
    return 'pay-badge';
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

  shiftNote(row: PosCollectionRow): string {
    const shift = (row.shift_date || '').slice(0, 10);
    const collected = this.calendarDay(row.collected_at);
    if (!shift || !collected || shift === collected) {
      return '';
    }
    return `Corte ${this.formatIsoDay(shift)}`;
  }

  onPageChange(event: IPaginationEvent): void {
    this.fetchPage(event.page);
  }

  orderId(row: PosCollectionRow): string {
    return row.sales_order_id || row.id;
  }

  openSalesOrder(row: PosCollectionRow): void {
    const orderId = this.orderId(row);
    if (!orderId) return;
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId },
    });
  }

  openTicket(row: PosCollectionRow): void {
    const orderId = this.orderId(row);
    if (!orderId || !this.hasCollectedMoney(row)) {
      return;
    }
    this.dialog.open(PosReceiptPreviewDialogComponent, {
      width: '480px',
      maxWidth: '95vw',
      panelClass: 'pos-dialog-panel',
      autoFocus: false,
      data: {
        salesOrderId: orderId,
        useSalesOrderTicketApi: true,
        title: `Ticket ${row.folio || orderId}`,
      },
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
      .exportPosCollectionsExcel(
        this.periodQuery(),
        this.customerType(),
        this.search(),
        this.paymentMethod(),
        false,
        'paid',
        this.forShipping()
      )
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

  private reload(page: number): void {
    if (!this.billingBranchId) {
      this.branchMissing.set(true);
      this.summary.set(this.emptySummary());
      this.filteredAmount.set(0);
      this.appliedFrom.set('');
      this.appliedTo.set('');
      this.listTotal.set(0);
      this.tableConfig.update((cfg) => ({ ...cfg, rows: [], loading: false, totalResults: 0 }));
      return;
    }

    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      return;
    }

    this.branchMissing.set(false);
    this.fetchPage(page);
  }

  private fetchPage(page: number): void {
    if (!this.billingBranchId) {
      return;
    }
    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      return;
    }

    this.tableConfig.update((cfg) => ({ ...cfg, loading: true, page }));
    this.accountingService
      .getPosCollections(
        this.periodQuery(),
        this.customerType(),
        page,
        this.tableConfig().limit,
        this.search(),
        this.paymentMethod(),
        false,
        'paid',
        this.forShipping()
      )
      .subscribe({
        next: (res) => {
          this.listTotal.set(res.total);
          this.filteredAmount.set(res.filtered_amount);
          this.summary.set(res.summary);
          this.appliedFrom.set(res.filters_applied.date_from || '');
          this.appliedTo.set(res.filters_applied.date_to || '');
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
          this.filteredAmount.set(0);
          this.summary.set(this.emptySummary());
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
      date_basis: 'collected' as const,
    };
  }

  private calendarDay(value?: string | null): string {
    const instant = parseApiDateTime(value);
    if (!instant) {
      return '';
    }
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: BUSINESS_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(instant);
  }

  private formatIsoDay(iso: string): string {
    const [year, month, day] = iso.slice(0, 10).split('-').map(Number);
    if (!year || !month || !day) {
      return iso;
    }
    return `${day} ${MONTHS[month - 1]} ${year}`;
  }

  private emptySummary(): PosCollectionsSummary {
    const empty = { orders: 0, amount: 0, ticket: 0 };
    return {
      orders_collected: 0,
      amount_collected: 0,
      walk_in_count: 0,
      invoiced_count: 0,
      shipping_count: 0,
      shipping_amount: 0,
      by_payment_method: {
        cash: { ...empty },
        transfer: { ...empty },
        card: { ...empty },
        check: { ...empty },
        credit: { ...empty },
      },
    };
  }
}
