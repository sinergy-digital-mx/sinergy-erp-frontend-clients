import { Component, signal, TemplateRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ArrowRight, Plus, LucideAngularModule } from 'lucide-angular';
import { CustomerService } from '../../../../core/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IColumn, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerGroupDropdownComponent } from '../../components/customer-group-dropdown/customer-group-dropdown.component';
import { FilterIndicatorComponent } from '../../components/filter-indicator/filter-indicator.component';
import { CustomerEditModalComponent } from '../../components/customer-edit-modal/customer-edit-modal.component';
import { CUSTOMER_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { FilterStateService } from '../../services/filter-state.service';
import {
  Customer,
  CustomerRegistrationFiscalOption,
  CustomerStatus,
} from '../../models/customer-group.model';
import {
  getCustomerFullName,
  getCustomerStatusLabel,
  getCustomerStatusPillClass,
} from '../../utils/customer-status.util';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import {
  CustomerExportDialogComponent,
  CustomerExportDialogResult,
} from '../../components/customer-export-dialog/customer-export-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { AuthService } from '../../../../core/services/auth.service';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { CUSTOMER_PERMISSIONS } from '../../config/permissions.config';
import { CustomerListStatsComponent } from '../../components/customer-list-stats/customer-list-stats.component';
import { CustomerListStats } from '../../../../core/services/customer.service';
import {
  CustomerListInsight,
  customerInsightLabel,
  isCustomerListInsight,
} from '../../utils/customer-list-insight';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    ApiDatePipe,
    FormsModule,
    TagModule,
    ButtonModule,
    SearchComponent,
    SelectComponent,
    DatatableWrapperComponent,
    CustomerGroupDropdownComponent,
    FilterIndicatorComponent,
    LucideAngularModule,
    FilterClearButtonComponent,
    SpinnerComponent,
    EmptyStageComponent,
    HasPermissionDirective,
    CustomerListStatsComponent,
  ],
  templateUrl: './customers-list.html',
  styleUrl: './customers-list.scss',
})
export class CustomersList implements OnInit, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Cliente', prop: 'name', sortable: true, canAutoResize: true },
      { name: 'Razón social', prop: 'fiscal_razon_social', sortable: false, canAutoResize: true },
      { name: 'Correo', prop: 'email', sortable: true, canAutoResize: true },
      { name: 'Grupo', prop: 'group_id', sortable: true, canAutoResize: true },
      { name: 'Estatus', prop: 'status', sortable: true, canAutoResize: true },
      { name: 'Creado', prop: 'created_at', sortable: true, canAutoResize: true },
      { name: '', prop: 'actions', sortable: false, canAutoResize: false, width: 64 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron clientes' },
    columnMode: 'force',
    reorderable: false,
  });

  ArrowRight = ArrowRight;
  Plus = Plus;
  readonly permissions = CUSTOMER_PERMISSIONS;
  readonly Math = Math;
  search = '';
  selectedGroupId: string | null = null;
  selectedGroupName: string | null = null;
  selectedStatusId: string | null = null;
  selectedStatusName: string | null = null;
  selectedFiscalId: string | null = null;
  selectedFiscalName: string | null = null;
  selectedInsight: CustomerListInsight | null = null;
  customerStats: CustomerListStats | null = null;
  statsLoading = false;
  statsError = false;
  currentSort: ISortEvent | null = null;
  private statsRequest = 0;
  private statsScopeKey = '';
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';
  private customerStatuses: CustomerStatus[] = [];
  private fiscalOptions: CustomerRegistrationFiscalOption[] = [];

  statusSelectConfig: ISelect = {
    placeholder: 'Estatus',
    name_select: 'customer_status',
    value: 'id',
    option: 'name',
    value_default: null,
    data: [],
    all: true,
    all_message: 'Todos',
  };

  fiscalSelectConfig: ISelect = {
    placeholder: 'Razón social',
    name_select: 'registered_fiscal',
    value: 'id',
    option: 'label',
    value_default: null,
    data: [],
    all: true,
    all_message: 'Razón social',
  };

  constructor(
    private router: Router,
    public customer_service: CustomerService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private filterStateService: FilterStateService,
    private toast: ToastService,
    private authService: AuthService,
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      
      // Only process if query params actually changed
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;

      this.search = query?.search ?? '';
      this.selectedGroupId = query?.group_id ?? null;
      this.selectedStatusId = query?.status_id ?? null;
      this.selectedStatusName = this.resolveStatusName(this.selectedStatusId);
      this.selectedFiscalId = query?.registered_fiscal_configuration_id ?? null;
      this.syncFiscalFilterConfig();
      const insight = typeof query?.insight === 'string' ? query.insight : null;
      this.selectedInsight = this.canViewStats && isCustomerListInsight(insight) ? insight : null;

      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;

      this.table_config.update(c => ({
        ...c,
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit,
      }));

      this.getCustomers();
    });
  }

  ngOnInit(): void {
    this.customer_service.getRegistrationOptions().subscribe({
      next: (options) => {
        this.fiscalOptions = options.fiscal_configurations ?? [];
        this.syncFiscalFilterConfig();
      },
    });
    this.customer_service.getCustomerStatuses().subscribe({
      next: (statuses) => {
        this.customerStatuses = statuses;
        this.syncStatusFilterConfig();
      },
    });
    this.authService.permissions$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const insight = this.route.snapshot.queryParamMap.get('insight');
      const next = this.canViewStats && isCustomerListInsight(insight) ? insight : null;
      const gainedInsight = !!next && next !== this.selectedInsight;
      const lostInsight = !!this.selectedInsight && !next;
      this.selectedInsight = next;
      if (!this.canViewStats) {
        this.customerStats = null;
        this.statsLoading = false;
        if (lostInsight) this.getCustomers();
        return;
      }
      if (gainedInsight) {
        this.getCustomers();
        return;
      }
      if (!this.customerStats && !this.statsLoading) {
        this.loadStats();
      }
    });
  }

  get canViewStats(): boolean {
    return this.authService.hasPermission(this.permissions.viewStats);
  }

  get insightLabel(): string | null {
    return this.selectedInsight ? customerInsightLabel(this.selectedInsight) : null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCustomers() {
    this.table_config.update(c => ({ ...c, loading: true }));
    const config = this.table_config();
    const page = isNaN(config.page) ? 1 : config.page;
    const limit = isNaN(config.limit) ? 20 : config.limit;
    
    let data: any = {
      page: page,
      limit: limit,
      ...(this.search && { search: this.search }),
      ...(this.selectedGroupId && { group_id: this.selectedGroupId }),
      ...(this.selectedStatusId && { status_id: this.selectedStatusId }),
      ...(this.selectedFiscalId && { registered_fiscal_configuration_id: this.selectedFiscalId }),
      ...(this.canViewStats && this.selectedInsight && { insight: this.selectedInsight }),
      ...(this.currentSort && this.currentSort.direction && { sort: this.currentSort.column.prop, order: this.currentSort.direction })
    };
    this.loadStats();
    this.customer_service.getCustomers(data).subscribe({
      next: (res) => {
        this.table_config.update(c => ({
          ...c,
          rows: res?.data ?? [],
          totalResults: res?.total ?? 0,
          hasNext: res?.hasNext ?? false,
          loading: false,
        }));
      },
      error: () => {
        this.table_config.update(c => ({ ...c, loading: false }));
      },
    });
  }

  private loadStats(): void {
    if (!this.canViewStats) {
      this.customerStats = null;
      this.statsLoading = false;
      this.statsError = false;
      this.statsScopeKey = '';
      return;
    }
    const scopeKey = `${this.search}|${this.selectedGroupId ?? ''}|${this.selectedStatusId ?? ''}|${this.selectedFiscalId ?? ''}`;
    if (scopeKey === this.statsScopeKey && (this.customerStats || this.statsLoading)) {
      return;
    }
    this.statsScopeKey = scopeKey;
    const request = ++this.statsRequest;
    this.statsLoading = true;
    this.statsError = false;
    this.customer_service.getCustomerListStats({
      ...(this.search && { search: this.search }),
      ...(this.selectedGroupId && { group_id: this.selectedGroupId }),
      ...(this.selectedStatusId && { status_id: this.selectedStatusId }),
      ...(this.selectedFiscalId && { registered_fiscal_configuration_id: this.selectedFiscalId }),
    }).subscribe({
      next: (stats) => {
        if (request !== this.statsRequest) return;
        this.customerStats = stats;
        this.statsLoading = false;
      },
      error: () => {
        if (request !== this.statsRequest) return;
        this.statsLoading = false;
        this.statsError = !this.customerStats;
        this.statsScopeKey = '';
      },
    });
  }

  private navigateList(page: number, extra: Record<string, unknown> = {}): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page,
        search: this.search || undefined,
        group_id: this.selectedGroupId || undefined,
        status_id: this.selectedStatusId || undefined,
        registered_fiscal_configuration_id: this.selectedFiscalId || null,
        insight: this.canViewStats && this.selectedInsight ? this.selectedInsight : null,
        ...extra,
      },
      queryParamsHandling: 'merge',
    });
  }

  private syncStatusFilterConfig(): void {
    this.statusSelectConfig = {
      ...this.statusSelectConfig,
      data: this.customerStatuses.map((s) => ({ id: s.id, name: s.name })),
      value_default: this.selectedStatusId ? Number(this.selectedStatusId) : null,
    };
    this.selectedStatusName = this.resolveStatusName(this.selectedStatusId);
  }

  private syncFiscalFilterConfig(): void {
    this.selectedFiscalName = this.resolveFiscalName(this.selectedFiscalId);
    this.fiscalSelectConfig = {
      ...this.fiscalSelectConfig,
      data: this.fiscalOptions.map((item) => ({
        id: item.id,
        label: this.fiscalOptionLabel(item),
      })),
      value_default: this.selectedFiscalId,
    };
  }

  private resolveFiscalName(fiscalId: string | null): string | null {
    if (!fiscalId) return null;
    const match = this.fiscalOptions.find((item) => item.id === fiscalId);
    return match ? this.fiscalOptionLabel(match) : null;
  }

  private fiscalOptionLabel(item: CustomerRegistrationFiscalOption): string {
    const name = item.razon_social?.trim() || 'Sin razón social';
    const rfc = item.rfc?.trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  private resolveStatusName(statusId: string | null): string | null {
    if (!statusId) return null;
    const id = Number(statusId);
    return this.customerStatuses.find((s) => s.id === id)?.name ?? null;
  }

  onPageChange(event: IPaginationEvent) {
    this.navigateList(event.page, { limit: event.limit });
  }

  onSortChange(event: ISortEvent) {
    this.currentSort = event;
    this.table_config.update(c => ({ ...c, page: 1 }));
    this.navigateList(1);
  }

  onRowClick(event: any) {
    this.viewDetail(event.data);
  }

  onGroupSelect(event: { groupId: string | null; groupName: string | null }) {
    this.selectedGroupId = event.groupId;
    this.selectedGroupName = event.groupName;
    this.navigateList(1);
  }

  onFiscalSelect(event: { value?: string | null }): void {
    const fiscalId = event?.value != null && event.value !== '' ? String(event.value) : null;
    this.selectedFiscalId = fiscalId;
    this.syncFiscalFilterConfig();
    this.navigateList(1);
  }

  onStatusSelect(event: any): void {
    const statusId = event?.value != null && event?.value !== '' ? String(event.value) : null;
    this.selectedStatusId = statusId;
    this.selectedStatusName = this.resolveStatusName(statusId);
    this.statusSelectConfig = {
      ...this.statusSelectConfig,
      value_default: statusId ? Number(statusId) : null,
    };
    this.navigateList(1);
  }

  onInsightChange(insight: CustomerListInsight | null): void {
    if (!this.canViewStats || insight === this.selectedInsight) return;
    this.selectedInsight = insight;
    this.navigateList(1);
  }

  get hasActiveFilters(): boolean {
    return !!(
      this.search ||
      this.selectedGroupId ||
      this.selectedStatusId ||
      this.selectedFiscalId ||
      this.selectedInsight
    );
  }

  get statsAreScoped(): boolean {
    return !!(this.search || this.selectedGroupId || this.selectedStatusId || this.selectedFiscalId);
  }

  onFilterClear(filterType: 'status' | 'group' | 'fiscal' | 'search' | 'insight' | 'all') {
    if (filterType === 'all') {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
      this.selectedStatusId = null;
      this.selectedStatusName = null;
      this.statusSelectConfig = { ...this.statusSelectConfig, value_default: null };
      this.selectedFiscalId = null;
      this.selectedFiscalName = null;
      this.syncFiscalFilterConfig();
      this.search = '';
      this.selectedInsight = null;
    } else if (filterType === 'fiscal') {
      this.selectedFiscalId = null;
      this.selectedFiscalName = null;
      this.syncFiscalFilterConfig();
    } else if (filterType === 'group') {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
    } else if (filterType === 'status') {
      this.selectedStatusId = null;
      this.selectedStatusName = null;
      this.statusSelectConfig = { ...this.statusSelectConfig, value_default: null };
    } else if (filterType === 'search') {
      this.search = '';
    } else if (filterType === 'insight') {
      this.selectedInsight = null;
    }

    this.navigateList(1);
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.navigateList(1);
  }

  editCustomer(customer: Customer) {
    // Removed - editing only available on detail page
  }
  
  createCustomer() {
    if (!this.authService.hasEntityPermission('customers', 'Create')) return;
    this.dialog.open(CustomerEditModalComponent, {
      ...CUSTOMER_FORM_DIALOG_CONFIG,
      data: { customer: null },
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomers();
      }
    });
  }
  
  getSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'Al corriente': return 'success';
      case 'Atrasado': return 'danger';
      case 'Sin iniciar': return 'info';
      default: return 'warn';
    }
  }

  viewDetail(row: any) {
    this.router.navigate(['/customers/detail', row.id]);
  }

  getStatusPillClass(customer: Customer): string {
    return getCustomerStatusPillClass(customer);
  }

  getStatusLabel(customer: Customer): string {
    return getCustomerStatusLabel(customer);
  }

  formatCustomerName(customer: Customer): string {
    return getCustomerFullName(customer);
  }

  getFullCustomerName(customer: Customer): string {
    return getCustomerFullName(customer);
  }

  fiscalName(customer: Customer): string {
    return customer.fiscal_razon_social?.trim() || '—';
  }

  fiscalRfc(customer: Customer): string {
    return customer.fiscal_rfc?.trim() || '';
  }

  fiscalTitle(customer: Customer): string {
    const name = this.fiscalName(customer);
    const rfc = this.fiscalRfc(customer);
    return rfc && name !== '—' ? `${name} · ${rfc}` : name;
  }

  openExportModal(): void {
    this.dialog
      .open(CustomerExportDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: false,
        data: {
          search: this.search || undefined,
          status_id: this.selectedStatusId,
          status_name: this.selectedStatusName,
          group_id: this.selectedGroupId,
          group_name: this.selectedGroupName,
          registered_fiscal_configuration_id: this.selectedFiscalId,
          fiscal_name: this.selectedFiscalName,
          insight: this.canViewStats ? this.selectedInsight : null,
          insight_label: this.canViewStats ? this.insightLabel : null,
        },
      })
      .afterClosed()
      .subscribe((result: CustomerExportDialogResult | undefined) => {
        if (result?.downloaded) {
          this.toast.success('Reporte descargado');
        }
      });
  }
}
