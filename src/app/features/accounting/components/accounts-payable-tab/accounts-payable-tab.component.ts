import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IColumn, IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ToastService } from '../../../../core/services/toast.service';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { AccountingService } from '../../services/accounting.service';
import { AccountsPayableListSummary, AccountsPayableVendorRow, PayableCurrencyView } from '../../models/accounting.model';
import { VendorPayableDetailDialogComponent } from '../vendor-payable-detail-dialog/vendor-payable-detail-dialog.component';

@Component({
  selector: 'app-accounts-payable-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatatableWrapperComponent],
  templateUrl: './accounts-payable-tab.component.html',
  styleUrl: './accounts-payable-tab.component.scss',
})
export class AccountsPayableTabComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  @Input() reloadToken = 0;

  readonly views: { id: PayableCurrencyView; label: string }[] = [
    { id: 'all', label: 'Ambos' },
    { id: 'mxn', label: 'Pesos' },
    { id: 'usd', label: 'Dólares' },
  ];

  searchControl = new FormControl('', { nonNullable: true });
  private destroy$ = new Subject<void>();
  summary = signal<AccountsPayableListSummary | null>(null);
  currencyView = signal<PayableCurrencyView>('all');
  exporting = signal(false);

  tableConfig = signal<IDatatableConfig>({
    rows: [] as AccountsPayableVendorRow[],
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
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.loadPage(1));

    this.loadPage(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reloadToken'] && !changes['reloadToken'].firstChange) {
      this.loadPage(this.tableConfig().page ?? 1);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  vendorLabel(row: AccountsPayableVendorRow): string {
    return row.vendor_name?.trim() || row.razon_social?.trim() || row.company_name?.trim() || '—';
  }

  formatMoney(value: number | null | undefined, currency: 'MXN' | 'USD'): string {
    return formatUnitCurrency(value ?? 0, currency);
  }

  summaryTotalLabel(): string {
    const total = this.summary()?.total_amount_pending_total_mxn;
    if (total == null || !Number.isFinite(total)) return '—';
    return this.formatMoney(total, 'MXN');
  }

  totalMoney(row: AccountsPayableVendorRow): string {
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

  barWidth(pct: number | null | undefined): number {
    const value = Number(pct ?? 0);
    if (!Number.isFinite(value) || value < 0) return 0;
    return Math.min(value, 100);
  }

  progressColor(pct: number): string {
    if (pct > 80) return 'danger';
    if (pct >= 50) return 'warning';
    return 'success';
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

  /** Modal con las OC pendientes de este proveedor, sin salir de cobranza. */
  openVendorPurchaseOrders(row: AccountsPayableVendorRow): void {
    if (!row.vendor_id) {
      return;
    }

    this.dialog.open(VendorPayableDetailDialogComponent, {
      width: '92vw',
      maxWidth: '980px',
      maxHeight: '90vh',
      autoFocus: false,
      data: {
        vendorId: row.vendor_id,
        vendorLabel: this.vendorLabel(row),
        currency: this.currencyView(),
      },
    });
  }

  downloadExcel(): void {
    if (this.exporting()) return;

    this.exporting.set(true);
    this.accountingService.exportAccountsPayableExcel(this.searchControl.value, this.currencyView()).subscribe({
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
      .getAccountsPayable(this.searchControl.value, page, this.tableConfig().limit, currency)
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
    const vendor: IColumn = { name: 'Proveedor', prop: 'vendor', sortable: false, canAutoResize: false, width: 240 };
    const progress: IColumn = {
      name: 'Progreso',
      prop: 'progress',
      sortable: false,
      canAutoResize: false,
      width: view === 'all' ? 280 : 220,
    };
    const mxn: IColumn = {
      name: 'Monto adeudado en pesos',
      prop: 'amount_pending_mxn',
      sortable: false,
      canAutoResize: false,
      width: 220,
    };
    const usd: IColumn = {
      name: 'Monto adeudado en dólares',
      prop: 'amount_pending_usd',
      sortable: false,
      canAutoResize: false,
      width: 230,
    };
    const rate: IColumn = {
      name: 'Tipo de cambio',
      prop: 'exchange_rate',
      sortable: false,
      canAutoResize: false,
      width: 140,
    };
    const total: IColumn = {
      name: 'Total en pesos',
      prop: 'amount_pending_total_mxn',
      sortable: false,
      canAutoResize: false,
      width: 180,
    };

    if (view === 'mxn') return [vendor, mxn, rate, total, progress];
    if (view === 'usd') return [vendor, usd, rate, total, progress];
    return [vendor, mxn, usd, rate, total, progress];
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

  private emptyStateFor(view: PayableCurrencyView): { title: string; subtitle: string } {
    if (view === 'mxn') {
      return { title: 'Sin adeudos en pesos', subtitle: 'No hay órdenes de compra pendientes en MXN' };
    }
    if (view === 'usd') {
      return { title: 'Sin adeudos en dólares', subtitle: 'No hay órdenes de compra pendientes en USD' };
    }
    return { title: 'Sin proveedores', subtitle: 'No hay cuentas por pagar pendientes' };
  }
}
