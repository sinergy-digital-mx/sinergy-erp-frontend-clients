import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IColumn, IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ToastService } from '../../../../core/services/toast.service';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { AccountingService } from '../../services/accounting.service';
import { AccountsReceivableListSummary, AccountsReceivableRow, PayableCurrencyView } from '../../models/accounting.model';
import { ReceivableDetailDialogComponent } from '../receivable-detail-dialog/receivable-detail-dialog.component';

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

  readonly views: { id: PayableCurrencyView; label: string }[] = [
    { id: 'all', label: 'Ambos' },
    { id: 'mxn', label: 'Pesos' },
    { id: 'usd', label: 'Dólares' },
  ];

  summary = signal<AccountsReceivableListSummary | null>(null);
  currencyView = signal<PayableCurrencyView>('all');
  exporting = signal(false);

  tableConfig = signal<IDatatableConfig>({
    rows: [] as AccountsReceivableRow[],
    columns: this.columnsFor('all'),
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: this.emptyStateFor('all'),
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private accountingService: AccountingService,
    private dialog: MatDialog,
    private toast: ToastService
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

  setCurrencyView(view: PayableCurrencyView): void {
    if (this.currencyView() === view) return;
    this.currencyView.set(view);
    this.tableConfig.update((cfg) => ({
      ...cfg,
      columns: this.columnsFor(view),
      emptyState: this.emptyStateFor(view),
      page: 1,
      loading: true,
    }));
    this.loadPage(1);
  }

  formatMoney(value: number | null | undefined, currency: 'MXN' | 'USD'): string {
    return formatUnitCurrency(value ?? 0, currency);
  }

  summaryTotalLabel(): string {
    const total = this.summary()?.total_amount_pending_total_mxn;
    if (total == null || !Number.isFinite(total)) return '—';
    return this.formatMoney(total, 'MXN');
  }

  totalMoney(row: AccountsReceivableRow): string {
    const total = row.amount_pending_total_mxn;
    if (total == null || !Number.isFinite(total)) return '—';
    return this.formatMoney(total, 'MXN');
  }

  exchangeRateText(): string {
    const rate = this.summary()?.exchange_rate;
    if (rate == null || !Number.isFinite(rate) || rate <= 0) return '—';
    return this.formatRate(rate);
  }

  exchangeRateCaption(): string {
    const rate = this.summary()?.exchange_rate;
    if (rate == null || !Number.isFinite(rate) || rate <= 0) return 'Sin tipo de cambio del día';
    const date = this.formatRateDate(this.summary()?.exchange_rate_date);
    return date ? `TC del día ${this.formatRate(rate)} · ${date}` : `TC del día ${this.formatRate(rate)}`;
  }

  totalOrderCount(): number {
    const summary = this.summary();
    if (!summary) return 0;
    const mxn = this.showsMxn() ? Number(summary.total_pending_orders_mxn ?? 0) : 0;
    const usd = this.showsUsd() ? Number(summary.total_pending_orders_usd ?? 0) : 0;
    return mxn + usd;
  }

  showsMxn(): boolean {
    return this.currencyView() !== 'usd';
  }

  showsUsd(): boolean {
    return this.currencyView() !== 'mxn';
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

  downloadExcel(): void {
    if (this.exporting()) return;

    this.exporting.set(true);
    this.accountingService
      .exportAccountsReceivableExcel(this.billingBranchId, this.search, this.currencyView())
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

  private loadPage(page: number): void {
    const currency = this.currencyView();
    this.tableConfig.update((cfg) => ({ ...cfg, loading: true, page }));

    this.accountingService
      .getAccountsReceivable(this.billingBranchId, this.search, page, this.tableConfig().limit, currency)
      .subscribe({
        next: (res) => {
          if (this.currencyView() !== currency) return;
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
          if (this.currencyView() !== currency) return;
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

  private columnsFor(view: PayableCurrencyView): IColumn[] {
    const account: IColumn = { name: 'Razón social', prop: 'razon_social', sortable: false, canAutoResize: false, width: 240 };
    const rfc: IColumn = { name: 'RFC', prop: 'fiscal_rfc', sortable: false, canAutoResize: false, width: 150 };
    const mxn: IColumn = { name: 'Por cobrar en pesos', prop: 'amount_pending_mxn', sortable: false, canAutoResize: false, width: 200 };
    const usd: IColumn = { name: 'Por cobrar en dólares', prop: 'amount_pending_usd', sortable: false, canAutoResize: false, width: 210 };
    const rate: IColumn = { name: 'Tipo de cambio', prop: 'exchange_rate', sortable: false, canAutoResize: false, width: 140 };
    const total: IColumn = { name: 'Total en pesos', prop: 'amount_pending_total_mxn', sortable: false, canAutoResize: false, width: 170 };

    if (view === 'mxn') return [account, rfc, mxn, rate, total];
    if (view === 'usd') return [account, rfc, usd, rate, total];
    return [account, rfc, mxn, usd, rate, total];
  }

  private emptyStateFor(view: PayableCurrencyView): { title: string; subtitle: string } {
    if (view === 'mxn') {
      return { title: 'Sin adeudos en pesos', subtitle: 'No hay órdenes pendientes en MXN' };
    }
    if (view === 'usd') {
      return { title: 'Sin adeudos en dólares', subtitle: 'No hay órdenes pendientes en USD' };
    }
    return { title: 'Sin adeudos', subtitle: 'No hay cuentas por cobrar pendientes' };
  }

  private formatRate(rate: number): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(rate);
  }

  private formatRateDate(value: string | null | undefined): string | null {
    if (!value) return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
    if (!match) return value;
    return `${match[3]}/${match[2]}/${match[1]}`;
  }
}
