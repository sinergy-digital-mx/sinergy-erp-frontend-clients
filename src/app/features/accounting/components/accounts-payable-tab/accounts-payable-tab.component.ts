import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import { AccountsPayableListSummary, AccountsPayableVendorRow } from '../../models/accounting.model';
import { VendorPayableDetailDialogComponent } from '../vendor-payable-detail-dialog/vendor-payable-detail-dialog.component';
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
  summary: AccountsPayableListSummary | null = null;

  tableConfig: IDatatableConfig = {
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
  };

  constructor(
    private accountingService: AccountingService,
    private dialog: MatDialog,
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
      this.loadPage(this.tableConfig.page);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  vendorLabel(row: AccountsPayableVendorRow): string {
    return row.razon_social?.trim() || row.company_name?.trim() || row.vendor_name?.trim() || '—';
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

  openVendorDetail(row: AccountsPayableVendorRow): void {
    this.dialog.open(VendorPayableDetailDialogComponent, {
      width: '92vw',
      maxWidth: '1100px',
      maxHeight: '90vh',
      data: { vendorId: row.vendor_id, vendorLabel: this.vendorLabel(row) },
    });
  }

  private loadPage(page: number): void {
    this.tableConfig = { ...this.tableConfig, loading: true, page };

    this.accountingService
      .getAccountsPayable(this.searchControl.value, page, this.tableConfig.limit)
      .subscribe({
        next: (res) => {
          this.summary = res.summary ?? null;
          this.tableConfig = {
            ...this.tableConfig,
            rows: res.data,
            page: res.page,
            totalResults: res.total,
            loading: false,
          };
        },
        error: () => {
          this.summary = null;
          this.tableConfig = { ...this.tableConfig, rows: [], totalResults: 0, loading: false };
        },
      });
  }
}
