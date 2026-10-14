import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import { AccountsReceivableListSummary, AccountsReceivableRow } from '../../models/accounting.model';
import { ReceivableDetailDialogComponent } from '../receivable-detail-dialog/receivable-detail-dialog.component';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

@Component({
  selector: 'app-accounts-receivable-tab',
  standalone: true,
  imports: [CommonModule, DatatableWrapperComponent],
  templateUrl: './accounts-receivable-tab.component.html',
  styleUrl: './accounts-receivable-tab.component.scss',
})
export class AccountsReceivableTabComponent implements OnInit, OnChanges {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  @Input() billingBranchId?: string;
  @Input() search = '';
  @Input() reloadToken = 0;

  summary = signal<AccountsReceivableListSummary | null>(null);

  tableConfig = signal<IDatatableConfig>({
    rows: [] as AccountsReceivableRow[],
    columns: [
      { name: 'Razón social', prop: 'razon_social', sortable: false, canAutoResize: false, width: 240 },
      { name: 'RFC', prop: 'fiscal_rfc', sortable: false, canAutoResize: false, width: 160 },
      { name: '# Órdenes', prop: 'pending_order_count', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Debe', prop: 'amount_pending', sortable: false, canAutoResize: false, width: 140 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin adeudos', subtitle: 'No hay cuentas por cobrar pendientes' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private accountingService: AccountingService,
    private dialog: MatDialog,
    private taxCalculator: TaxCalculatorService
  ) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const branchChanged = !!changes['billingBranchId'] && !changes['billingBranchId'].firstChange;
    const searchChanged = !!changes['search'] && !changes['search'].firstChange;
    if (branchChanged || searchChanged) {
      this.loadPage(1);
      return;
    }
    if (changes['reloadToken'] && !changes['reloadToken'].firstChange) {
      this.loadPage(this.tableConfig().page ?? 1);
    }
  }

  formatCurrency(value: number): string {
    return this.taxCalculator.formatCurrency(value);
  }

  onPageChange(event: IPaginationEvent): void {
    this.loadPage(event.page);
  }

  openReceivableDetail(row: AccountsReceivableRow): void {
    this.dialog.open(ReceivableDetailDialogComponent, {
      width: '92vw',
      maxWidth: '1200px',
      maxHeight: '90vh',
      data: {
        razonSocial: row.razon_social,
        fiscalRfc: row.fiscal_rfc,
        billingBranchId: this.billingBranchId,
      },
    });
  }

  private loadPage(page: number): void {
    this.tableConfig.update((cfg) => ({ ...cfg, loading: true, page }));

    this.accountingService
      .getAccountsReceivable(this.billingBranchId, this.search, page, this.tableConfig().limit)
      .subscribe({
        next: (res) => {
          this.summary.set(res.summary ?? null);
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: res.data,
            page: res.page,
            totalResults: res.total,
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
