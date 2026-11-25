import { Component, signal, TemplateRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ArrowRight, ChevronRight, Plus, LucideAngularModule } from 'lucide-angular';
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
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { AuthService } from '../../../../core/services/auth.service';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { CUSTOMER_PERMISSIONS } from '../../config/permissions.config';
import { CustomerListStatsComponent } from '../../components/customer-list-stats/customer-list-stats.component';
import { MobileFilterSheetComponent } from '../../../../core/components/mobile-filter-sheet/mobile-filter-sheet.component';
import { CustomerListStats } from '../../../../core/services/customer.service';
import {
  CustomerListInsight,
  customerInsightLabel,
  isCustomerListInsight,
} from '../../utils/customer-list-insight';
import {
  CustomerListPrefilter,
  normalizeCustomerListPrefilter,
  shouldPrefilterCustomerList,
} from '../../utils/customer-list-prefilter.util';

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
    EmptyStageComponent,
    HasPermissionDirective,
    CustomerListStatsComponent,
    MobileFilterSheetComponent,
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
  ChevronRight = ChevronRight;
  Plus = Plus;
  readonly cardSkeletonSlots = [1, 2, 3, 4, 5];
  readonly permissions = CUSTOMER_PERMISSIONS;
  readonly Math = Math;
  search = '';
  selectedGroupId: string | null = null;
  selectedGroupName: string | null = null;
  selectedStatusId: string | null = null;
  selectedStatusName: string | null = null;
  selectedFiscalId: string | null = null;
  selectedFiscalName: string | null = null;
  selectedBranchId: string | null = null;
  selectedBranchName: string | null = null;
  /** El usuario eligió ver todas las razones. No se vuelve a poner la suya hasta limpiar. */
  viewAllLocations = false;
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
  private prefilter: CustomerListPrefilter = 'sellers';
  private prefilterLoaded = false;
  private locationReady = false;

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
    all_message: 'Todas las razones sociales',
  };

  branchSelectConfig: ISelect = {
    placeholder: 'Sucursal',
    name_select: 'registered_branch',
    value: 'id',
    option: 'label',
    value_default: null,
    data: [],
    all: true,
    all_message: 'Todas las sucursales',
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
      this.viewAllLocations = query?.location_scope === 'all';
      this.selectedFiscalId = this.viewAllLocations
        ? null
        : (query?.registered_fiscal_configuration_id ?? null);
      this.selectedBranchId = this.viewAllLocations
        ? null
        : (query?.registered_billing_branch_id ?? null);
      this.syncFiscalFilterConfig();
      this.syncBranchFilterConfig();
      const insight = typeof query?.insight === 'string' ? query.insight : null;
      this.selectedInsight = this.canViewStats && isCustomerListInsight(insight) ? insight : null;

      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;

      this.table_config.update(c => ({
        ...c,
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit,
      }));

      this.resolveLocationAndLoad(query);
    });
  }

  ngOnInit(): void {
    this.customer_service.getCustomerListSettings().subscribe({
      next: (settings) => this.finishPrefilter(normalizeCustomerListPrefilter(settings?.prefilter)),
      error: () => this.finishPrefilter('sellers'),
    });
    this.customer_service.getRegistrationOptions().subscribe({
      next: (options) => {
        this.fiscalOptions = options.fiscal_configurations ?? [];
        this.syncFiscalFilterConfig();
        this.syncBranchFilterConfig();
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
        if (lostInsight && this.locationReady) this.getCustomers();
        return;
      }
      if (gainedInsight && this.locationReady) {
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

  /** Admin y quien tiene customers:ViewAll no entran prefiltrados en el modo vendedores. */
  private skipsLocationPrefilter(): boolean {
    return (
      this.authService.hasAdminRole() ||
      this.authService.hasGrantedPermission(this.permissions.viewAll)
    );
  }

  private hasExplicitLocation(query: {
    location_scope?: string;
    registered_fiscal_configuration_id?: string;
    registered_billing_branch_id?: string;
  }): boolean {
    return (
      query?.location_scope === 'all' ||
      !!query?.registered_fiscal_configuration_id ||
      !!query?.registered_billing_branch_id
    );
  }

  private resolveLocationAndLoad(query: {
    location_scope?: string;
    registered_fiscal_configuration_id?: string;
    registered_billing_branch_id?: string;
  }): void {
    if (!this.prefilterLoaded && !this.hasExplicitLocation(query)) {
      this.table_config.update((c) => ({ ...c, loading: true }));
      return;
    }
    if (this.prefilterLoaded && !this.hasExplicitLocation(query) && this.applyAssignedLocation()) {
      return;
    }
    this.locationReady = true;
    this.getCustomers();
  }

  /** Escribe la razón y sucursal del usuario en la URL. Devuelve false si no hay que prefiltrar. */
  private applyAssignedLocation(): boolean {
    if (!shouldPrefilterCustomerList(this.prefilter, this.skipsLocationPrefilter())) {
      return false;
    }
    const fiscalId = this.authService.getDefaultListFiscalConfigurationId();
    const branchId = this.authService.getDefaultListBillingBranchId();
    if (!fiscalId) return false;
    this.viewAllLocations = false;
    this.selectedFiscalId = fiscalId;
    this.selectedBranchId = branchId;
    this.syncFiscalFilterConfig();
    this.syncBranchFilterConfig();
    this.navigateList(this.table_config().page || 1);
    return true;
  }

  private finishPrefilter(mode: CustomerListPrefilter): void {
    this.prefilter = mode;
    this.prefilterLoaded = true;
    if (this.locationReady) return;
    this.resolveLocationAndLoad(this.route.snapshot.queryParams);
  }

  get insightLabel(): string | null {
    return this.selectedInsight ? customerInsightLabel(this.selectedInsight) : null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCustomers() {
    if (!this.locationReady) return;
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
      ...(this.selectedBranchId && { registered_billing_branch_id: this.selectedBranchId }),
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
    if (!this.canViewStats || !this.locationReady) {
      if (!this.canViewStats) {
        this.customerStats = null;
        this.statsLoading = false;
        this.statsError = false;
        this.statsScopeKey = '';
      }
      return;
    }
    const scopeKey = `${this.search}|${this.selectedGroupId ?? ''}|${this.selectedStatusId ?? ''}|${this.selectedFiscalId ?? ''}|${this.selectedBranchId ?? ''}`;
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
      ...(this.selectedBranchId && { registered_billing_branch_id: this.selectedBranchId }),
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
        registered_billing_branch_id: this.selectedBranchId || null,
        location_scope: this.viewAllLocations ? 'all' : null,
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

  private syncBranchFilterConfig(): void {
    const fiscal = this.selectedFiscalId
      ? this.fiscalOptions.find((item) => item.id === this.selectedFiscalId)
      : undefined;
    const branches = fiscal?.branches ?? [];
    if (
      this.selectedBranchId &&
      fiscal &&
      !branches.some((branch) => branch.id === this.selectedBranchId)
    ) {
      this.selectedBranchId = null;
    }
    this.selectedBranchName = this.resolveBranchName(this.selectedBranchId);
    this.branchSelectConfig = {
      ...this.branchSelectConfig,
      data: branches.map((branch) => ({
        id: branch.id,
        label: branch.name?.trim() || 'Sucursal',
      })),
      value_default: this.selectedBranchId,
    };
  }

  private branchesForSelectedFiscal() {
    if (!this.selectedFiscalId) return [];
    return this.fiscalOptions.find((item) => item.id === this.selectedFiscalId)?.branches ?? [];
  }

  private resolveBranchName(branchId: string | null): string | null {
    if (!branchId) return null;
    const match = this.branchesForSelectedFiscal().find((branch) => branch.id === branchId);
    return match?.name?.trim() || null;
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
    this.viewAllLocations = !fiscalId;
    this.selectedFiscalId = fiscalId;
    this.selectedBranchId = null;
    this.syncFiscalFilterConfig();
    this.syncBranchFilterConfig();
    this.navigateList(1);
  }

  onBranchSelect(event: { value?: string | null }): void {
    const branchId = event?.value != null && event.value !== '' ? String(event.value) : null;
    this.selectedBranchId = branchId;
    this.syncBranchFilterConfig();
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

  get sheetFilterCount(): number {
    return [this.selectedGroupId, this.selectedStatusId, this.selectedFiscalId, this.selectedBranchId].filter(Boolean).length;
  }

  get hasActiveFilters(): boolean {
    return !!(
      this.search ||
      this.selectedGroupId ||
      this.selectedStatusId ||
      this.selectedFiscalId ||
      this.selectedBranchId ||
      this.selectedInsight
    );
  }

  get statsAreScoped(): boolean {
    return !!(this.search || this.selectedGroupId || this.selectedStatusId || this.selectedFiscalId || this.selectedBranchId);
  }

  onFilterClear(filterType: 'status' | 'group' | 'fiscal' | 'branch' | 'search' | 'insight' | 'all') {
    if (filterType === 'all') {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
      this.selectedStatusId = null;
      this.selectedStatusName = null;
      this.statusSelectConfig = { ...this.statusSelectConfig, value_default: null };
      this.viewAllLocations = false;
      this.selectedFiscalId = null;
      this.selectedFiscalName = null;
      this.selectedBranchId = null;
      this.selectedBranchName = null;
      this.syncFiscalFilterConfig();
      this.syncBranchFilterConfig();
      this.search = '';
      this.selectedInsight = null;
    } else if (filterType === 'fiscal') {
      this.viewAllLocations = true;
      this.selectedFiscalId = null;
      this.selectedFiscalName = null;
      this.selectedBranchId = null;
      this.selectedBranchName = null;
      this.syncFiscalFilterConfig();
      this.syncBranchFilterConfig();
    } else if (filterType === 'branch') {
      this.selectedBranchId = null;
      this.selectedBranchName = null;
      this.syncBranchFilterConfig();
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

  clearSheetFilters(): void {
    this.selectedGroupId = null;
    this.selectedGroupName = null;
    this.selectedStatusId = null;
    this.selectedStatusName = null;
    this.statusSelectConfig = { ...this.statusSelectConfig, value_default: null };
    this.viewAllLocations = false;
    this.selectedFiscalId = null;
    this.selectedFiscalName = null;
    this.selectedBranchId = null;
    this.selectedBranchName = null;
    this.syncFiscalFilterConfig();
    this.syncBranchFilterConfig();
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

  customerInitials(customer: Customer): string {
    const source = getCustomerFullName(customer);
    if (!source || source === '—') return '?';
    const parts = source.split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map((part) => part.charAt(0).toUpperCase()).join('') || '?';
  }

  customerCardMeta(customer: Customer): string {
    const company = customer.company_name?.trim();
    const email = customer.email?.trim();
    if (company && email) return `${company} · ${email}`;
    return company || email || 'Sin correo';
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
          registered_billing_branch_id: this.selectedBranchId,
          branch_name: this.selectedBranchName,
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
