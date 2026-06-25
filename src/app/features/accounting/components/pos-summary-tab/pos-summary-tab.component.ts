import { Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import {
  AccountingPeriod,
  CollectionTerminalSummary,
  SalesTerminalSummary,
} from '../../models/accounting.model';
import { PosTerminalSalesDialogComponent } from '../pos-terminal-sales-dialog/pos-terminal-sales-dialog.component';
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
  @Input() period: AccountingPeriod = 'month';
  @Input() dateFrom = '';
  @Input() dateTo = '';
  @Input() reloadToken = 0;

  salesTerminals: SalesTerminalSummary[] = [];
  collectionTerminal: CollectionTerminalSummary = this.emptyCollectionTerminal();
  loading = false;
  branchMissing = false;

  tableConfig: IDatatableConfig = {
    rows: [],
    columns: [
      { name: 'Terminal', prop: 'terminal_name', sortable: false, canAutoResize: false, width: 220 },
      { name: '# Ventas', prop: 'sales_count', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Monto vendido', prop: 'amount_sold', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Acción', prop: 'action', sortable: false, canAutoResize: false, width: 120 },
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
  };

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

  collectionMetrics(): CollectionTerminalSummary {
    return this.collectionTerminal;
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

  private loadSummary(): void {
    if (!this.billingBranchId) {
      this.branchMissing = true;
      this.salesTerminals = [];
      this.collectionTerminal = this.emptyCollectionTerminal();
      this.tableConfig = { ...this.tableConfig, rows: [], loading: false, totalResults: 0 };
      return;
    }

    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      return;
    }

    this.branchMissing = false;
    this.loading = true;
    this.tableConfig = { ...this.tableConfig, loading: true };

    this.accountingService
      .getPosSummary({
        period: this.period,
        billing_branch_id: this.billingBranchId,
        date_from: this.period === 'range' ? this.dateFrom : undefined,
        date_to: this.period === 'range' ? this.dateTo : undefined,
      })
      .subscribe({
        next: (res) => {
          this.salesTerminals = res.sales_terminals ?? [];
          this.collectionTerminal = res.collection_terminal ?? this.emptyCollectionTerminal();
          this.tableConfig = {
            ...this.tableConfig,
            rows: this.salesTerminals,
            totalResults: this.salesTerminals.length,
            loading: false,
          };
          this.loading = false;
        },
        error: () => {
          this.salesTerminals = [];
          this.collectionTerminal = this.emptyCollectionTerminal();
          this.tableConfig = { ...this.tableConfig, rows: [], totalResults: 0, loading: false };
          this.loading = false;
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
    };
  }
}
