import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IColumn, IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ToastService } from '../../../../core/services/toast.service';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { AccountingService } from '../../services/accounting.service';
import { AccountsPayableListSummary, AccountsPayableVendorRow, PayableCurrencyView } from '../../models/accounting.model';

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
    private router: Router,
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

  /** Abre en otra pestaña las OC del proveedor que aún no están pagadas. */
  openVendorPurchaseOrders(row: AccountsPayableVendorRow): void {
    if (!row.vendor_id) {
      return;
    }

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/purchase-orders'], {
        queryParams: {
          vendor_id: row.vendor_id,
          unpaid: '1',
        },
      })
    );

    window.open(url, '_blank', 'noopener,noreferrer');
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

    if (view === 'mxn') return [vendor, mxn, progress];
    if (view === 'usd') return [vendor, usd, progress];
    return [vendor, mxn, usd, progress];
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
