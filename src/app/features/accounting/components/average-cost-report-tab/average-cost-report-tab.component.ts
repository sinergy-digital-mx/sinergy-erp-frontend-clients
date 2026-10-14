import { Component, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IColumn, IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { ToastService } from '../../../../core/services/toast.service';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { AccountingPeriod, AverageCostReportRow, AverageCostReportSummary } from '../../models/accounting.model';
import { AccountingService } from '../../services/accounting.service';

@Component({
  selector: 'app-average-cost-report-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatatableWrapperComponent],
  templateUrl: './average-cost-report-tab.component.html',
  styleUrl: './average-cost-report-tab.component.scss',
  inputs: ['billingBranchId', 'period', 'dateFrom', 'dateTo', 'reloadToken'],
})
export class AverageCostReportTabComponent implements OnChanges, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  @Input() billingBranchId = '';
  @Input() period: AccountingPeriod = 'month';
  @Input() dateFrom = '';
  @Input() dateTo = '';
  @Input() reloadToken = 0;

  /** Búsqueda de cliente, folio, tipo o estatus. */
  searchControl = new FormControl('', { nonNullable: true });
  private destroy$ = new Subject<void>();
  summary = signal<AverageCostReportSummary | null>(null);
  exporting = signal(false);
  branchMissing = signal(false);
  private requestId = 0;

  tableConfig = signal<IDatatableConfig>({
    rows: [] as AverageCostReportRow[],
    columns: this.columns(),
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: {
      title: 'Sin ventas en este periodo',
      subtitle: 'No hay recibos, facturas ni notas para la sucursal y las fechas elegidas',
    },
    columnMode: 'standard',
    reorderable: false,
  });

  constructor(
    private accountingService: AccountingService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.loadPage(1));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['reloadToken'] ||
      changes['billingBranchId'] ||
      changes['period'] ||
      changes['dateFrom'] ||
      changes['dateTo']
    ) {
      this.loadPage(1);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formatMoney(value: number | null | undefined, currency = 'MXN'): string {
    if (value == null || !Number.isFinite(value)) return '—';
    return formatUnitCurrency(value, currency === 'USD' ? 'USD' : 'MXN');
  }

  formatDay(value?: string | null): string {
    const iso = (value || '').slice(0, 10);
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    return match ? `${match[3]}/${match[2]}/${match[1]}` : '—';
  }

  periodCaption(): string {
    const summary = this.summary();
    const from = summary?.date_from;
    const to = summary?.date_to;
    if (!from || !to) return '';
    const branch = summary?.branch_label?.trim();
    const dates = from === to ? this.formatDay(from) : `${this.formatDay(from)} – ${this.formatDay(to)}`;
    return branch ? `${branch} · ${dates}` : dates;
  }

  onPageChange(event: IPaginationEvent): void {
    if (event.limit && event.limit !== this.tableConfig().limit) {
      this.tableConfig.update((cfg) => ({ ...cfg, limit: event.limit }));
    }
    this.loadPage(event.page);
  }

  openDocument(row: AverageCostReportRow): void {
    if (!row.sales_order_id) return;
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: row.sales_order_id },
    });
  }

  downloadExcel(): void {
    if (this.exporting() || !this.canQuery()) return;

    this.exporting.set(true);
    this.accountingService.exportAverageCostReportExcel(this.periodQuery(), this.searchControl.value).subscribe({
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
    if (!this.billingBranchId) {
      this.branchMissing.set(true);
      this.summary.set(null);
      this.tableConfig.update((cfg) => ({ ...cfg, rows: [], totalResults: 0, loading: false, page: 1 }));
      return;
    }
    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) {
      return;
    }

    this.branchMissing.set(false);
    const limit = this.tableConfig().limit;
    const requestId = ++this.requestId;
    this.tableConfig.update((cfg) => ({ ...cfg, loading: true, page }));

    this.accountingService
      .getAverageCostReport(this.periodQuery(), this.searchControl.value, page, limit)
      .subscribe({
        next: (res) => {
          if (requestId !== this.requestId) return;
          this.summary.set(res.summary ?? null);
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: res.data,
            page: res.page,
            limit: res.limit || limit,
            totalResults: res.total,
            loading: false,
          }));
        },
        error: () => {
          if (requestId !== this.requestId) return;
          this.summary.set(null);
          this.tableConfig.update((cfg) => ({
            ...cfg,
            rows: [],
            totalResults: 0,
            loading: false,
          }));
          this.toast.error('No se pudo cargar el reporte de ventas a costo promedio');
        },
      });
  }

  private canQuery(): boolean {
    if (!this.billingBranchId) return false;
    if (this.period === 'range' && (!this.dateFrom || !this.dateTo)) return false;
    return true;
  }

  private periodQuery() {
    return {
      period: this.period,
      billing_branch_id: this.billingBranchId,
      date_from: this.dateFrom || undefined,
      date_to: this.dateTo || undefined,
    };
  }

  private columns(): IColumn[] {
    return [
      { name: 'Cliente', prop: 'customer_name', sortable: false, canAutoResize: true, width: 220 },
      { name: 'Documento', prop: 'document', sortable: false, canAutoResize: false, width: 118 },
      { name: 'Fecha', prop: 'date', sortable: false, canAutoResize: false, width: 96 },
      { name: 'Tipo', prop: 'type_code', sortable: false, canAutoResize: false, width: 148 },
      { name: 'Stat', prop: 'status_code', sortable: false, canAutoResize: false, width: 108 },
      { name: 'Importe', prop: 'amount', sortable: false, canAutoResize: false, width: 100 },
      { name: 'Descto', prop: 'discount', sortable: false, canAutoResize: false, width: 88 },
      { name: 'Impuesto', prop: 'tax', sortable: false, canAutoResize: false, width: 96 },
      { name: 'Total venta', prop: 'sale_total', sortable: false, canAutoResize: false, width: 108 },
      { name: 'Total costo', prop: 'cost_total', sortable: false, canAutoResize: false, width: 108 },
    ];
  }
}
