import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import {
  AccountingPeriod,
  CollectionCustomerType,
  CollectionTerminalSummary,
  PosOpenDailyShiftSummary,
  PosTerminalType,
  SalesTerminalSummary,
} from '../../models/accounting.model';
import { dailyShiftIsOpen } from '../../../pos/models/pos-daily-shift.model';
import { PosTerminalSalesDialogComponent } from '../pos-terminal-sales-dialog/pos-terminal-sales-dialog.component';
import { PosCollectionsDialogComponent } from '../pos-collections-dialog/pos-collections-dialog.component';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

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

  branchMissing = signal(false);
  collectionTerminal = signal<CollectionTerminalSummary>(this.emptyCollectionTerminal());

  tableConfig = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Terminal', prop: 'terminal_name', sortable: false, canAutoResize: false, width: 180 },
      { name: 'Tipo', prop: 'terminal_type', sortable: false, canAutoResize: false, width: 90 },
      { name: '# Ventas/Cobros', prop: 'sales_count', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Monto', prop: 'amount_sold', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Cortes globales', prop: 'daily_shifts_count', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Cortes parciales', prop: 'partial_shifts_count', sortable: false, canAutoResize: false, width: 115 },
      { name: 'Corte abierto', prop: 'open_daily_shift', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Acción', prop: 'action', sortable: false, canAutoResize: false, width: 110 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin terminales', subtitle: 'No hay ventas POS en el periodo seleccionado' },
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

  terminalTypeLabel(type: PosTerminalType): string {
    return type === 'COBRANZA' ? 'Cobranza' : 'Ventas';
  }

  isCollectionTerminal(terminal: SalesTerminalSummary): boolean {
    return terminal.terminal_type === 'COBRANZA';
  }

  transactionCount(terminal: SalesTerminalSummary): number {
    if (this.isCollectionTerminal(terminal)) {
      return terminal.orders_collected ?? terminal.sales_count;
    }
    return terminal.sales_count;
  }

  transactionAmount(terminal: SalesTerminalSummary): number {
    if (this.isCollectionTerminal(terminal)) {
      return terminal.amount_collected ?? terminal.amount_sold;
    }
    return terminal.amount_sold;
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

  openTerminalAction(terminal: SalesTerminalSummary): void {
    if (this.isCollectionTerminal(terminal)) {
      this.openCollections('all');
      return;
    }
    this.openTerminalDetail(terminal);
  }

  openTerminalDetail(terminal: SalesTerminalSummary): void {
    this.dialog.open(PosTerminalSalesDialogComponent, {
      width: '92vw',
      maxWidth: '1200px',
      maxHeight: '90vh',
      data: {
        terminal,
        billingBranchId: this.billingBranchId,
        period: this.period,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
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
      this.collectionTerminal.set(this.emptyCollectionTerminal());
      this.tableConfig.update((cfg) => ({ ...cfg, rows: [], loading: false, totalResults: 0 }));
      return;
    }

    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      return;
    }

    this.branchMissing.set(false);
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
          const salesTerminals = res.sales_terminals ?? [];
          this.collectionTerminal.set(res.collection_terminal ?? this.emptyCollectionTerminal());
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: salesTerminals,
            totalResults: salesTerminals.length,
            loading: false,
          }));
        },
        error: () => {
          this.collectionTerminal.set(this.emptyCollectionTerminal());
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: [],
            totalResults: 0,
            loading: false,
          }));
        },
      });
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
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  }
}
