import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import { AccountsReceivableListSummary, AccountsReceivableRow } from '../../models/accounting.model';
import { ReceivableDetailDialogComponent } from '../receivable-detail-dialog/receivable-detail-dialog.component';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

@Component({
  selector: 'app-accounts-receivable-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatatableWrapperComponent],
  templateUrl: './accounts-receivable-tab.component.html',
  styleUrl: './accounts-receivable-tab.component.scss',
})
export class AccountsReceivableTabComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  @Input() billingBranchId?: string;
  @Input() reloadToken = 0;

  searchControl = new FormControl('', { nonNullable: true });
  private destroy$ = new Subject<void>();
  summary: AccountsReceivableListSummary | null = null;

  tableConfig: IDatatableConfig = {
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
    if (changes['billingBranchId'] && !changes['billingBranchId'].firstChange) {
      this.loadPage(1);
      return;
    }
    if (changes['reloadToken'] && !changes['reloadToken'].firstChange) {
      this.loadPage(this.tableConfig.page);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.tableConfig = { ...this.tableConfig, loading: true, page };

    this.accountingService
      .getAccountsReceivable(this.billingBranchId, this.searchControl.value, page, this.tableConfig.limit)
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
