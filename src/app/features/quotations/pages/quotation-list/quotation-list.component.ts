import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { QuotationService } from '../../services/quotation.service';
import { Quotation, QuotationFilters, QuotationType } from '../../models/quotation.model';
import { QuotationDetailDialogComponent } from '../../components/quotation-detail-dialog/quotation-detail-dialog.component';
import { CreateSalesOrderModalComponent } from '../../../sales-orders/components/create-sales-order-modal/create-sales-order-modal.component';
import { SalesFilterBarComponent } from '../../../sales-orders/components/sales-filter-bar/sales-filter-bar.component';
import { SalesOrderFilters } from '../../../sales-orders/models/sales-order.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { AuthService } from '../../../../core/services/auth.service';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { QUOTATION_PERMISSIONS } from '../../config/permissions.config';
import {
  getSalesOrderListBranchLabel,
  getSalesOrderListCompanyName,
  getSalesOrderListCustomerName,
  getSalesOrderListFiscalLabel,
} from '../../../sales-orders/utils/sales-order-display.util';

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CommonModule, SalesFilterBarComponent, DatatableWrapperComponent, EmptyStageComponent],
  templateUrl: './quotation-list.component.html',
  styleUrls: [
    '../../../sales-orders/pages/sales-order-list/sales-order-list.component.scss',
    './quotation-list.component.scss',
  ],
})
export class QuotationListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  private rows = signal<Quotation[]>([]);
  private filters = signal<QuotationFilters>({});
  private pagination = signal({ page: 1, limit: 15 });
  private totalResults = signal(0);
  loading = signal(false);
  canCreate = false;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: true, canAutoResize: false, width: 140 },
      { name: 'Cliente', prop: 'customer', sortable: true, canAutoResize: false, width: 140 },
      { name: 'Sucursal', prop: 'billing_branch', sortable: false, canAutoResize: false, width: 190 },
      { name: 'Estado', prop: 'general_status', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Total', prop: 'total', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Tipo', prop: 'quotation_type', sortable: false, canAutoResize: false, width: 186 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 160 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron cotizaciones' },
    columnMode: 'force',
    reorderable: false,
  });

  totalOrders = computed(() => this.totalResults());
  totalAmount = computed(() =>
    this.rows().reduce((sum, row) => sum + this.getTotal(row), 0),
  );

  creadasCount = computed(() => this.rows().filter((r) => r.general_status === 'Creada').length);
  convertidasCount = computed(() => this.rows().filter((r) => r.general_status === 'Convertida').length);

  creadasAmount = computed(() =>
    this.rows().filter((r) => r.general_status === 'Creada').reduce((s, r) => s + this.getTotal(r), 0),
  );
  convertidasAmount = computed(() =>
    this.rows().filter((r) => r.general_status === 'Convertida').reduce((s, r) => s + this.getTotal(r), 0),
  );

  posCount = computed(() => this.rows().filter((r) => r.quotation_type === 'POS').length);
  manualCount = computed(() => this.rows().filter((r) => r.quotation_type === 'MANUAL').length);
  posAmount = computed(() =>
    this.rows().filter((r) => r.quotation_type === 'POS').reduce((s, r) => s + this.getTotal(r), 0),
  );
  manualAmount = computed(() =>
    this.rows().filter((r) => r.quotation_type === 'MANUAL').reduce((s, r) => s + this.getTotal(r), 0),
  );

  creadasPercent = computed(() => (this.totalOrders() > 0 ? (this.creadasCount() / this.totalOrders()) * 100 : 0));
  convertidasPercent = computed(() =>
    this.totalOrders() > 0 ? (this.convertidasCount() / this.totalOrders()) * 100 : 0,
  );
  posPercent = computed(() => (this.totalOrders() > 0 ? (this.posCount() / this.totalOrders()) * 100 : 0));
  manualPercent = computed(() => (this.totalOrders() > 0 ? (this.manualCount() / this.totalOrders()) * 100 : 0));

  constructor(
    private quotationService: QuotationService,
    private dialog: MatDialog,
    private auth: AuthService,
    private taxCalculator: TaxCalculatorService,
  ) {}

  ngOnInit(): void {
    this.canCreate = this.auth.hasPermission(QUOTATION_PERMISSIONS.create);
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.table_config.update((c) => ({ ...c, loading: true }));
    this.quotationService.getQuotations(this.filters(), this.pagination()).subscribe({
      next: (res) => {
        const data = res.data || [];
        this.rows.set(data);
        this.totalResults.set(res.total || 0);
        this.table_config.update((c) => ({
          ...c,
          rows: data,
          totalResults: res.total || 0,
          hasNext: res.page < res.totalPages,
          loading: false,
        }));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.table_config.update((c) => ({ ...c, loading: false }));
      },
    });
  }

  applyFilters(filters: SalesOrderFilters): void {
    const type = filters.sales_order_type;
    this.filters.set({
      search: filters.search,
      general_status: filters.status,
      fiscal_configuration_id: filters.fiscal_configuration_id,
      billing_branch_id: filters.billing_branch_id,
      created_from: filters.dateFrom,
      created_to: filters.dateTo,
      quotation_type: type === 'POS' || type === 'MANUAL' ? (type as QuotationType) : undefined,
    });
    this.pagination.set({ page: 1, limit: 15 });
    this.load();
  }

  onPageChange(event: IPaginationEvent): void {
    this.pagination.set({ page: event.page, limit: event.limit });
    this.load();
  }

  onSortChange(_event: ISortEvent): void {}

  openCreate(): void {
    this.dialog
      .open(CreateSalesOrderModalComponent, {
        width: '900px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        panelClass: 'create-purchase-order-modal',
        data: { asQuotation: true },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.load();
      });
  }

  openDetail(row: Quotation): void {
    this.dialog
      .open(QuotationDetailDialogComponent, {
        ...ORDER_DETAIL_DIALOG_OPTIONS,
        data: { quotationId: row.id },
      })
      .afterClosed()
      .subscribe(() => this.load());
  }

  customerName(row: Quotation): string {
    return getSalesOrderListCustomerName(row as any, '—');
  }

  companyName(row: Quotation): string {
    return getSalesOrderListCompanyName(row as any);
  }

  fiscalLabel(row: Quotation): string {
    return getSalesOrderListFiscalLabel(row as any);
  }

  branchLabel(row: Quotation): string {
    return getSalesOrderListBranchLabel(row as any);
  }

  statusClass(status: string): string {
    const base = 'dt-status-pill';
    switch (status) {
      case 'Creada':
        return `${base} dt-status-pill--info`;
      case 'Convertida':
        return `${base} dt-status-pill--success`;
      case 'Cancelada':
        return `${base} dt-status-pill--danger`;
      default:
        return `${base} dt-status-pill--neutral`;
    }
  }

  typeClass(type: string): string {
    const base = 'dt-status-pill';
    return type === 'POS' ? `${base} dt-status-pill--sky` : `${base} dt-status-pill--neutral`;
  }

  typeLabel(type: string): string {
    return type === 'POS' ? 'POS' : 'Manual';
  }

  formatCurrency(amount: number | string | undefined): string {
    return this.taxCalculator.formatCurrency(Number(amount || 0));
  }

  formatDateHuman(date: string | Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    return `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
  }

  getTotal(row: Quotation): number {
    return Number(row.total || 0);
  }
}
