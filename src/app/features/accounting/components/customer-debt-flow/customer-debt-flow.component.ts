import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  ReportPeriod,
  ReportPeriodSelectorComponent,
} from '../../../../core/components/report-period-selector/report-period-selector.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { BackButtonComponent } from '../../../rbac-tenant-ui/components/back-button/back-button.component';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { InventoryService } from '../../../inventory/services/inventory.service';
import { InventoryLocationFiscal } from '../../../inventory/models/inventory-location.model';
import { CustomerDebtFlowService } from '../../services/customer-debt-flow.service';
import {
  DebtAgingRow,
  DebtAgingTotals,
  DebtFlowPeriod,
  DebtFlowQueryParams,
  DebtFlowView,
  DebtLedgerRow,
  DebtMovementType,
} from '../../models/customer-debt-flow.model';

@Component({
  selector: 'app-customer-debt-flow',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReportPeriodSelectorComponent,
    EmptyStageComponent,
    BackButtonComponent,
    PaginationComponent,
  ],
  templateUrl: './customer-debt-flow.component.html',
  styleUrl: './customer-debt-flow.component.scss',
})
export class CustomerDebtFlowComponent implements OnInit {
  view: DebtFlowView = 'aging';
  datePreset: DebtFlowPeriod = 'month';
  customDateFrom = '';
  customDateTo = '';
  fiscalConfigurationId = '';
  billingBranchId = '';
  customerId: number | null = null;
  customerName = '';
  search = '';
  page = 1;
  limit = 50;

  locations = signal<InventoryLocationFiscal[]>([]);
  aging = signal<DebtAgingRow[]>([]);
  agingTotals = signal<DebtAgingTotals | null>(null);
  ledger = signal<DebtLedgerRow[]>([]);
  periodLabel = signal('');
  total = signal(0);
  loading = signal(false);
  exporting = signal(false);

  readonly emptyParams = {
    icon_size: 28,
    row_gap: 12,
    width: 52,
    height: 52,
    wrapper_icon_circle: true,
  };
  readonly pageSizeOptions = [25, 50, 100];

  branchOptions = computed(() => {
    const fiscal = this.locations().find((item) => item.id === this.fiscalConfigurationId);
    return fiscal?.branches ?? [];
  });

  constructor(
    private inventoryService: InventoryService,
    private debtFlowService: CustomerDebtFlowService,
    private dialog: MatDialog,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.inventoryService.getLocations().subscribe({
      next: (data) => {
        const list = data ?? [];
        this.locations.set(list);
        if (!this.fiscalConfigurationId && list.length > 0) {
          this.fiscalConfigurationId = list[0].id;
        }
        this.loadReport();
      },
      error: () => {
        this.locations.set([]);
        this.loadReport();
      },
    });
  }

  get rangeIncomplete(): boolean {
    return this.datePreset === 'range' && (!this.customDateFrom || !this.customDateTo);
  }

  get fiscalRequired(): boolean {
    return !this.fiscalConfigurationId;
  }

  get subtitle(): string {
    const viewLabel = this.view === 'ledger' ? 'Flujo de cargos y abonos' : 'Antigüedad de saldos';
    const period = this.periodLabel().trim();
    return period ? `${viewLabel} · ${period}` : viewLabel;
  }

  goBack(): void {
    this.router.navigate(['/accounting']);
  }

  setView(view: DebtFlowView): void {
    if (this.view === view) return;
    this.view = view;
    this.resetPageAndLoad();
  }

  onPeriodChange(period: ReportPeriod): void {
    this.datePreset = period;
    if (period !== 'range') {
      this.customDateFrom = '';
      this.customDateTo = '';
      this.resetPageAndLoad();
    }
  }

  onRangeChange(range: { dateFrom: string; dateTo: string }): void {
    this.customDateFrom = range.dateFrom;
    this.customDateTo = range.dateTo;
    if (!this.rangeIncomplete) this.resetPageAndLoad();
  }

  onFiscalChange(): void {
    this.billingBranchId = '';
    this.clearCustomerFilter(false);
    this.resetPageAndLoad();
  }

  onBranchChange(): void {
    this.resetPageAndLoad();
  }

  onSearch(): void {
    this.resetPageAndLoad();
  }

  openCustomerFlow(row: DebtAgingRow): void {
    this.customerId = row.customer_id;
    this.customerName = row.customer_name;
    this.view = 'ledger';
    this.resetPageAndLoad();
  }

  clearCustomerFilter(reload = true): void {
    this.customerId = null;
    this.customerName = '';
    if (reload) this.resetPageAndLoad();
  }

  onPageChange(event: { page?: number; limit?: number }): void {
    if (event.limit != null && event.limit !== this.limit) {
      this.limit = event.limit;
      this.page = 1;
    } else if (event.page != null) {
      this.page = event.page;
    }
    this.loadReport();
  }

  openOrder(row: DebtLedgerRow, event?: Event): void {
    event?.stopPropagation();
    if (!row.sales_order_id) return;
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId: row.sales_order_id },
    });
  }

  movementBadgeClass(type: DebtMovementType): string {
    switch (type) {
      case 'charge':
        return 'dt-status-pill dt-status-pill--danger';
      case 'payment':
        return 'dt-status-pill dt-status-pill--success';
      case 'charge_reversal':
      case 'payment_reversal':
        return 'dt-status-pill dt-status-pill--warning';
      default:
        return 'dt-status-pill dt-status-pill--neutral';
    }
  }

  formatMoney(value: number | null | undefined): string {
    if (value == null) return '—';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(value);
  }

  formatDate(value: string | null, dateOnly = false): string {
    if (!value) return '—';
    const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    const parsed = day
      ? new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3]))
      : new Date(value);
    if (Number.isNaN(parsed.getTime())) return value.slice(0, 10);
    if (dateOnly || day) {
      return parsed.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
    return parsed.toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  loadReport(): void {
    if (this.rangeIncomplete || this.fiscalRequired) {
      this.aging.set([]);
      this.agingTotals.set(null);
      this.ledger.set([]);
      this.periodLabel.set('');
      this.total.set(0);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.debtFlowService.getReport(this.currentQuery()).subscribe({
      next: (res) => {
        this.aging.set(res.aging ?? []);
        this.agingTotals.set(res.aging_totals ?? null);
        this.ledger.set(res.ledger ?? []);
        this.periodLabel.set(res.filters_applied?.period_label ?? '');
        this.total.set(Number(res.total ?? 0));
        this.page = Number(res.page ?? this.page);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.aging.set([]);
        this.agingTotals.set(null);
        this.ledger.set([]);
        this.total.set(0);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el flujo de deuda'));
      },
    });
  }

  downloadExcel(): void {
    if (this.rangeIncomplete || this.fiscalRequired || this.exporting()) return;
    this.exporting.set(true);
    const query = this.currentQuery();
    delete query.page;
    delete query.limit;
    this.debtFlowService.exportExcel(query).subscribe({
      next: ({ blob, filename }) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        anchor.click();
        URL.revokeObjectURL(url);
        this.exporting.set(false);
      },
      error: (err) => {
        this.exporting.set(false);
        const message = err instanceof Error ? err.message : 'No se pudo descargar el Excel';
        this.toast.error(message);
      },
    });
  }

  private resetPageAndLoad(): void {
    this.page = 1;
    this.loadReport();
  }

  private currentQuery(): DebtFlowQueryParams {
    const query: DebtFlowQueryParams = {
      fiscal_configuration_id: this.fiscalConfigurationId,
      view: this.view,
      period: this.datePreset,
      page: this.page,
      limit: this.limit,
    };
    if (this.billingBranchId) query.billing_branch_id = this.billingBranchId;
    if (this.customerId) query.customer_id = this.customerId;
    if (this.search.trim()) query.search = this.search.trim();
    if (this.datePreset === 'range') {
      query.date_from = this.customDateFrom;
      query.date_to = this.customDateTo;
    }
    return query;
  }
}
