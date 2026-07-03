import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import { AccountsPayableListSummary, AccountsPayableVendorRow } from '../../models/accounting.model';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

@Component({
  selector: 'app-accounts-payable-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatatableWrapperComponent],
  templateUrl: './accounts-payable-tab.component.html',
  styleUrl: './accounts-payable-tab.component.scss',
})
export class AccountsPayableTabComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  readonly Math = Math;

  @Input() reloadToken = 0;

  searchControl = new FormControl('', { nonNullable: true });
  private destroy$ = new Subject<void>();
  summary = signal<AccountsPayableListSummary | null>(null);

  tableConfig = signal<IDatatableConfig>({
    rows: [] as AccountsPayableVendorRow[],
    columns: [
      { name: 'Proveedor', prop: 'vendor', sortable: false, canAutoResize: false, width: 220 },
      { name: '# OC pendientes', prop: 'pending_order_count', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Monto adeudado', prop: 'amount_pending', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Progreso', prop: 'progress', sortable: false, canAutoResize: false, width: 180 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin proveedores', subtitle: 'No hay cuentas por pagar pendientes' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private accountingService: AccountingService,
    private router: Router,
    private taxCalculator: TaxCalculatorService
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

  vendorLabel(row: AccountsPayableVendorRow): string {
    return row.vendor_name?.trim() || row.razon_social?.trim() || row.company_name?.trim() || '—';
  }

  formatCurrency(value: number): string {
    return this.taxCalculator.formatCurrency(value);
  }

  progressColor(pct: number): string {
    if (pct > 80) return 'danger';
    if (pct >= 50) return 'warning';
    return 'success';
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

  private loadPage(page: number): void {
    this.tableConfig.update((cfg) => ({ ...cfg, loading: true, page }));

    this.accountingService
      .getAccountsPayable(this.searchControl.value, page, this.tableConfig().limit)
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
