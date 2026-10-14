import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IColumn, IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ToastService } from '../../../../core/services/toast.service';
import { formatUnitAmount, formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { AccountingService } from '../../services/accounting.service';
import { AverageCostBasis, AverageCostReportRow, AverageCostReportSummary } from '../../models/accounting.model';

@Component({
  selector: 'app-average-cost-report-tab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatatableWrapperComponent],
  templateUrl: './average-cost-report-tab.component.html',
  styleUrl: './average-cost-report-tab.component.scss',
})
export class AverageCostReportTabComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<unknown>;

  @Input() reloadToken = 0;

  searchControl = new FormControl('', { nonNullable: true });
  private destroy$ = new Subject<void>();
  summary = signal<AverageCostReportSummary | null>(null);
  exporting = signal(false);
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
      title: 'Sin artículos con compras',
      subtitle: 'No hay ingresos de compra para calcular el costo promedio',
    },
    columnMode: 'standard',
    reorderable: false,
  });

  constructor(
    private accountingService: AccountingService,
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

  formatMoney(value: number | null | undefined): string {
    if (value == null) return '—';
    return formatUnitCurrency(value, 'MXN');
  }

  formatQty(value: number | null | undefined): string {
    return formatUnitAmount(value ?? 0);
  }

  formatPercent(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) return '—';
    return `${new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)}%`;
  }

  pedimentoText(row: AverageCostReportRow): string {
    return row.pedimentos?.length ? row.pedimentos.join(' · ') : '—';
  }

  costTitle(basis: AverageCostBasis): string {
    if (basis === 'real') return 'Costo real de las compras';
    if (basis === 'mixed') return 'Parte con costo real y parte con el costo de la compra';
    return 'Costo de las compras, sin costo real';
  }

  onPageChange(event: IPaginationEvent): void {
    if (event.limit && event.limit !== this.tableConfig().limit) {
      this.tableConfig.update((cfg) => ({ ...cfg, limit: event.limit }));
    }
    this.loadPage(event.page);
  }

  downloadExcel(): void {
    if (this.exporting()) return;

    this.exporting.set(true);
    this.accountingService.exportAverageCostReportExcel(this.searchControl.value).subscribe({
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
    const limit = this.tableConfig().limit;
    const requestId = ++this.requestId;
    this.tableConfig.update((cfg) => ({ ...cfg, loading: true, page }));

    this.accountingService.getAverageCostReport(this.searchControl.value, page, limit).subscribe({
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
        this.toast.error('No se pudo cargar el reporte de costo promedio');
      },
    });
  }

  private columns(): IColumn[] {
    return [
      { name: 'Artículo', prop: 'name', sortable: false, canAutoResize: true, width: 280 },
      { name: 'SAT', prop: 'sat_clave', sortable: false, canAutoResize: false, width: 88 },
      { name: 'Pedimento', prop: 'pedimentos', sortable: false, canAutoResize: false, width: 168 },
      { name: 'Precio 1', prop: 'price', sortable: false, canAutoResize: false, width: 88 },
      { name: 'Costo', prop: 'average_cost', sortable: false, canAutoResize: false, width: 88 },
      { name: 'Cant.', prop: 'quantity', sortable: false, canAutoResize: false, width: 72 },
      { name: 'Total', prop: 'total_cost', sortable: false, canAutoResize: false, width: 96 },
      { name: 'Margen %', prop: 'margin_percent', sortable: false, canAutoResize: false, width: 76 },
      { name: 'Margen $', prop: 'margin_amount', sortable: false, canAutoResize: false, width: 88 },
    ];
  }
}
