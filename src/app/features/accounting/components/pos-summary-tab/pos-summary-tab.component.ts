import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import {
  AccountingPeriod,
  CollectionCustomerType,
  CollectionTerminalSummary,
  PosDaySummary,
  PosEnteredOrder,
  PosOpenDailyShiftSummary,
} from '../../models/accounting.model';
import { dailyShiftIsOpen, formatPosShiftDate } from '../../../pos/models/pos-daily-shift.model';
import { PosCollectionsDialogComponent } from '../pos-collections-dialog/pos-collections-dialog.component';
import { PosShiftsDialogComponent, PosShiftsDialogView } from '../pos-shifts-dialog/pos-shifts-dialog.component';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';

@Component({
  selector: 'app-pos-summary-tab',
  standalone: true,
  imports: [CommonModule, DatatableWrapperComponent],
  templateUrl: './pos-summary-tab.component.html',
  styleUrl: './pos-summary-tab.component.scss',
})
export class PosSummaryTabComponent implements OnChanges {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  @Input() billingBranchId = '';
  @Input() period: AccountingPeriod = 'today';
  @Input() dateFrom = '';
  @Input() dateTo = '';
  @Input() reloadToken = 0;
  @Output() summaryChange = new EventEmitter<PosDaySummary>();

  branchMissing = signal(false);
  loadError = signal(false);
  collectionTerminal = signal<CollectionTerminalSummary>(this.emptyCollectionTerminal());

  tableConfig = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Hora', prop: 'created_at', sortable: false, canAutoResize: false, width: 90 },
      { name: 'Cliente', prop: 'customer_display_name', sortable: false, canAutoResize: false, width: 200 },
      { name: 'Origen', prop: 'channel', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Terminal', prop: 'terminal_name', sortable: false, canAutoResize: false, width: 160 },
      { name: 'Total', prop: 'total', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Cobro', prop: 'payment_status', sortable: false, canAutoResize: false, width: 120 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin órdenes', subtitle: 'No entraron ventas de caja ni de sucursal en el día seleccionado' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private accountingService: AccountingService,
    private dialog: MatDialog,
    private taxCalculator: TaxCalculatorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['reloadToken'] ||
      changes['billingBranchId'] ||
      changes['period'] ||
      changes['dateFrom'] ||
      changes['dateTo']
    ) {
      this.loadSummary();
    }
  }

  formatCurrency(value: number): string {
    return this.taxCalculator.formatCurrency(value);
  }

  formatTime(value?: string): string {
    if (!value) {
      return '—';
    }
    const hasZone = /[zZ]|[+-]\d{2}:\d{2}$/.test(value);
    const normalized = hasZone ? value : `${value.replace(' ', 'T')}Z`;
    const parsed = new Date(normalized);
    if (Number.isNaN(parsed.getTime())) {
      return value;
    }
    return parsed.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Mexico_City',
    });
  }

  originLabel(order: PosEnteredOrder): string {
    return order.channel === 'branch' ? 'Sucursal' : 'Caja';
  }

  paymentLabel(order: PosEnteredOrder): string {
    if ((order.amount_collected ?? 0) > 0 || order.payment_status === 'Pagado') {
      return 'Cobrado';
    }
    return 'Por cobrar';
  }

  isCollected(order: PosEnteredOrder): boolean {
    return (order.amount_collected ?? 0) > 0 || order.payment_status === 'Pagado';
  }

  onOrderRow(event: { data?: PosEnteredOrder }): void {
    if (event?.data) {
      this.openOrder(event.data);
    }
  }

  openOrder(order: PosEnteredOrder): void {
    if (!order.id) {
      return;
    }
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: order.id },
    });
  }

  openShiftLabel(shift: PosOpenDailyShiftSummary | null | undefined): string {
    if (!shift) {
      return '—';
    }

    const dateLabel = this.formatShiftDate(shift.shift_date);
    const partials = shift.partial_shifts_count ?? 0;
    const statusLabel = dailyShiftIsOpen(shift) ? 'Abierto' : 'Cerrado';

    return `${statusLabel} · ${dateLabel} · ${partials} parc.`;
  }

  collectionOpenShiftLabel(): string {
    return this.openShiftLabel(this.collectionTerminal().open_daily_shift);
  }

  openShifts(view: PosShiftsDialogView, initialShiftId?: string): void {
    if (!this.billingBranchId) {
      return;
    }

    this.dialog.open(PosShiftsDialogComponent, {
      width: '96vw',
      maxWidth: '1100px',
      maxHeight: '90vh',
      data: {
        billingBranchId: this.billingBranchId,
        period: this.period,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        view,
        initialShiftId,
      },
    });
  }

  openCollections(customerType: CollectionCustomerType): void {
    if (!this.billingBranchId) {
      return;
    }

    this.dialog.open(PosCollectionsDialogComponent, {
      width: '96vw',
      maxWidth: '1280px',
      maxHeight: '90vh',
      data: {
        collection: this.collectionTerminal(),
        billingBranchId: this.billingBranchId,
        period: this.period,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        customerType,
      },
    });
  }

  private loadSummary(): void {
    if (!this.billingBranchId) {
      this.branchMissing.set(true);
      this.loadError.set(false);
      this.collectionTerminal.set(this.emptyCollectionTerminal());
      this.publishSummary(this.emptySummary());
      this.tableConfig.update((cfg) => ({ ...cfg, rows: [], loading: false, totalResults: 0 }));
      return;
    }

    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      return;
    }

    this.branchMissing.set(false);
    this.loadError.set(false);
    this.tableConfig.update((cfg) => ({ ...cfg, loading: true }));

    this.accountingService
      .getPosSummary({
        period: this.period,
        billing_branch_id: this.billingBranchId,
        date_from: this.period === 'range' ? this.dateFrom : undefined,
        date_to: this.period === 'range' ? this.dateTo : undefined,
      })
      .subscribe({
        next: (res) => {
          const orders = res.entered_orders ?? [];
          this.collectionTerminal.set(res.collection_terminal ?? this.emptyCollectionTerminal());
          this.publishSummary(res.summary ?? this.emptySummary());
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: orders,
            totalResults: orders.length,
            loading: false,
          }));
        },
        error: () => {
          this.loadError.set(true);
          this.collectionTerminal.set(this.emptyCollectionTerminal());
          this.publishSummary(this.emptySummary());
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: [],
            totalResults: 0,
            loading: false,
          }));
        },
      });
  }

  private publishSummary(summary: PosDaySummary): void {
    this.summaryChange.emit(summary);
  }

  private emptySummary(): PosDaySummary {
    return {
      orders_entered: 0,
      amount_entered: 0,
      orders_collected: 0,
      amount_collected: 0,
      orders_pending: 0,
      amount_pending: 0,
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

  private formatShiftDate(value: string): string {
    return formatPosShiftDate(value);
  }
}
