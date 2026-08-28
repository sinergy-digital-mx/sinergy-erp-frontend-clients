import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContractService } from '../../services/contract.service';
import {
  Contract,
  ContractListFilters,
  ContractStats,
  EMPTY_CONTRACT_STATS,
} from '../../models/contract.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PropertyService } from '../../../properties/services/property.service';
import { PropertyEditModalComponent } from '../../../properties/components/property-edit-modal/property-edit-modal.component';
import { ContractCreateModalComponent } from '../../components/contract-create-modal/contract-create-modal.component';
import { CONTRACT_CREATE_DIALOG_CONFIG, PROPERTY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { ContractFilterIndicatorComponent } from '../../components/contract-filter-indicator/contract-filter-indicator.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { ArrowRight, AlertCircle, Download } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { CustomerGroupDropdownComponent } from '../../../customers/components/customer-group-dropdown/customer-group-dropdown.component';
import { CustomerGroupFetchService } from '../../../customers/services/customer-group-fetch.service';

@Component({
  selector: 'app-contracts-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    ContractFilterIndicatorComponent,
    LucideAngularModule,
    MatTooltipModule,
    FilterClearButtonComponent,
    CustomerGroupDropdownComponent,
  ],
  templateUrl: './contracts-list.component.html',
  styleUrl: './contracts-list.component.scss'
})
export class ContractsListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Número', prop: 'contract_number', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Cliente', prop: 'customer', sortable: false, canAutoResize: false, width: 180 },
      { name: 'Grupo', prop: 'customer_group', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Lote', prop: 'property', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Fecha Inicio', prop: 'contract_date', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Precio Total', prop: 'total_price', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Saldo Pendiente', prop: 'remaining_balance', sortable: true, canAutoResize: true, width: 130 },
      { name: 'Siguiente Pago', prop: 'first_payment_date', sortable: true, canAutoResize: true, width: 130 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 120 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron contratos' },
    columnMode: 'force',
    reorderable: false,
  });

  ArrowRight = ArrowRight;
  AlertCircle = AlertCircle;
  Download = Download;
  readonly Math = Math;
  readonly skeletonSlots = [0, 1, 2, 3];
  search = '';
  selectedGroupId: string | null = null;
  selectedGroupName: string | null = null;
  currentSort: ISortEvent | null = null;
  stats = signal<ContractStats>(EMPTY_CONTRACT_STATS);
  statsLoading = signal(true);
  activeFilter = signal<string | null>(null);
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';
  private lastFilterKey = '';
  private listRequestId = 0;
  private statsRequestId = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private propertyService: PropertyService,
    private dialog: MatDialog,
    private interceptorService: InterceptorService,
    private toast: ToastService,
    private customerGroupFetch: CustomerGroupFetchService
  ) {
    this.customerGroupFetch.fetchGroups().pipe(takeUntil(this.destroy$)).subscribe({
      next: (groups) => {
        if (this.selectedGroupId) {
          this.selectedGroupName = groups.find((group) => group.id === this.selectedGroupId)?.name ?? null;
        }
      },
      error: () => undefined,
    });

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);

      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;

      this.search = query?.search ?? '';
      this.selectedGroupId = query?.group_id ?? null;
      if (!this.selectedGroupId) {
        this.selectedGroupName = null;
      } else {
        this.selectedGroupName =
          this.customerGroupFetch.getCachedGroups().find((group) => group.id === this.selectedGroupId)?.name
          ?? this.selectedGroupName;
      }

      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;

      this.table_config.update(c => ({
        ...c,
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit,
      }));

      if (query?.status === 'completado') {
        this.activeFilter.set('completed');
      } else if (query?.status === 'activo') {
        this.activeFilter.set('pending');
      } else if (query?.hasOverdue === 'true') {
        this.activeFilter.set('overdue');
      } else if (!query?.status && !query?.hasOverdue) {
        this.activeFilter.set('total');
      } else {
        this.activeFilter.set(null);
      }

      if (!query?.page || !query?.limit) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: this.buildUrlParams({ page, limit }),
          replaceUrl: true
        });
        return;
      }

      const filters = this.buildApiFilters();
      const filterKey = JSON.stringify(filters);
      const reloadStats = filterKey !== this.lastFilterKey;
      this.lastFilterKey = filterKey;

      this.getContracts();
      if (reloadStats) {
        this.loadStats();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStats() {
    const requestId = ++this.statsRequestId;
    this.statsLoading.set(true);
    this.contractService.getContractStats(this.buildApiFilters()).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (stats) => {
        if (requestId !== this.statsRequestId) {
          return;
        }
        this.stats.set(stats);
        this.statsLoading.set(false);
      },
      error: (error) => {
        if (requestId !== this.statsRequestId) {
          return;
        }
        this.stats.set(EMPTY_CONTRACT_STATS);
        this.statsLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudieron cargar las estadísticas de contratos'));
      }
    });
  }

  applyFilter(filter: 'total' | 'completed' | 'pending' | 'overdue') {
    const queryParams: Record<string, string | number | undefined> = {
      page: 1,
      limit: this.table_config().limit,
      ...(this.search && { search: this.search }),
      ...(this.selectedGroupId && { group_id: this.selectedGroupId }),
    };

    const snapshot = this.route.snapshot.queryParams;
    if (snapshot['customerId']) {
      queryParams['customerId'] = snapshot['customerId'];
    }
    if (snapshot['propertyId']) {
      queryParams['propertyId'] = snapshot['propertyId'];
    }

    switch (filter) {
      case 'completed':
        queryParams['status'] = 'completado';
        break;
      case 'pending':
        queryParams['status'] = 'activo';
        break;
      case 'overdue':
        queryParams['hasOverdue'] = 'true';
        break;
      default:
        break;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  getContracts() {
    const requestId = ++this.listRequestId;
    this.table_config.update(c => ({ ...c, loading: true }));
    const config = this.table_config();
    const page = isNaN(config.page) ? 1 : config.page;
    const limit = isNaN(config.limit) ? 20 : config.limit;

    this.contractService.getContracts({
      ...this.buildApiFilters(),
      page,
      limit,
    }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (requestId !== this.listRequestId) {
          return;
        }

        let contracts = [];
        let total = 0;
        let hasNext = false;

        if (Array.isArray(res)) {
          contracts = res;
          total = res.length;
          hasNext = false;
        } else if (res?.data) {
          contracts = res.data;
          total = res.pagination?.total ?? res.total ?? res.data.length;
          hasNext = res.pagination?.hasNext ?? (page * limit < total);
        }

        this.table_config.update(c => ({
          ...c,
          rows: contracts,
          totalResults: total,
          hasNext: hasNext,
          loading: false,
        }));
      },
      error: () => {
        if (requestId !== this.listRequestId) {
          return;
        }
        this.table_config.update(c => ({ ...c, loading: false }));
        this.toast.error('No se pudieron cargar los contratos');
      }
    });
  }

  onPageChange(event: IPaginationEvent) {
    this.table_config.update(c => ({
      ...c,
      page: event.page,
      limit: event.limit
    }));
    this.navigateWithParams({ page: event.page, limit: event.limit });
  }

  onSortChange(event: ISortEvent) {
    this.currentSort = event;
  }

  onRowClick(row: any) {
    const contract = row?.data || row;
    this.viewDetail(contract);
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.navigateWithParams({ page: 1, search: searchTerm || undefined });
  }

  onGroupSelect(event: { groupId: string | null; groupName: string | null }) {
    this.selectedGroupId = event.groupId;
    this.selectedGroupName = event.groupName;
    this.navigateWithParams({ page: 1, group_id: event.groupId || undefined });
  }

  clearFilters() {
    this.search = '';
    this.selectedGroupId = null;
    this.selectedGroupName = null;
    this.activeFilter.set(null);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  get hasActiveFilters(): boolean {
    const query = this.route.snapshot.queryParams;
    return !!(this.search || this.selectedGroupId || query['status'] || query['hasOverdue']);
  }

  onFilterClear(filterType: 'search' | 'status' | 'group' | 'all') {
    if (filterType === 'all') {
      this.clearFilters();
      return;
    }

    if (filterType === 'search') {
      this.search = '';
    }
    if (filterType === 'status') {
      this.activeFilter.set(null);
    }
    if (filterType === 'group') {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
    }

    this.navigateWithParams({
      page: 1,
      search: filterType === 'search' ? undefined : this.search || undefined,
      group_id: filterType === 'group' ? undefined : this.selectedGroupId || undefined,
      status: filterType === 'status' ? undefined : this.route.snapshot.queryParams['status'],
      hasOverdue: filterType === 'status' ? undefined : this.route.snapshot.queryParams['hasOverdue'],
    });
  }

  getActiveStatusFilter(): string | null {
    return this.route.snapshot.queryParams['status'] || null;
  }

  openCreateContractModal() {
    const dialogRef = this.dialog.open(ContractCreateModalComponent, {
      ...CONTRACT_CREATE_DIALOG_CONFIG,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getContracts();
        this.loadStats();
      }
    });
  }

  viewDetail(contract: Contract) {
    if (!contract || !contract.id) {
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'No se pudo cargar el contrato. ID no disponible.'
      });
      return;
    }
    this.router.navigate(['/contracts/detail', contract.id]);
  }

  navigateToCustomer(customerId: number) {
    this.router.navigate(['/customers/detail', customerId]);
  }

  navigateToProperty(propertyId: string) {
    this.propertyService.getProperty(propertyId).subscribe({
      next: (property) => {
        this.dialog.open(PropertyEditModalComponent, {
          ...PROPERTY_FORM_DIALOG_CONFIG,
          data: { property }
        });
      },
      error: (error) => {
        console.error('Error loading property:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'activo': 'bg-green-100 text-green-800',
      'completado': 'bg-blue-100 text-blue-800',
      'cancelado': 'bg-red-100 text-red-800',
      'suspendido': 'bg-yellow-100 text-yellow-800'
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status] || 'bg-gray-100 text-gray-800'}`;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'activo': 'Activo',
      'completado': 'Completado',
      'cancelado': 'Cancelado',
      'suspendido': 'Suspendido'
    };
    return labels[status] || status;
  }

  getCustomerName(contract: Contract): string {
    if (!contract.customer) return '—';
    return `${contract.customer.name} ${contract.customer.lastname}`;
  }

  getCustomerGroupName(contract: Contract): string {
    return contract.customer?.group?.name ?? '—';
  }

  downloadGeneralReport(): void {
    this.contractService.exportToExcel(this.buildApiFilters()).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'contratos.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al descargar el reporte'
        });
      }
    });
  }

  private buildApiFilters(): ContractListFilters {
    const query = this.route.snapshot.queryParams;
    return {
      ...(this.search && { search: this.search }),
      ...(this.selectedGroupId && { group_id: this.selectedGroupId }),
      ...(query['status'] && { status: query['status'] }),
      ...(query['hasOverdue'] && { hasOverdue: query['hasOverdue'] }),
      ...(query['customerId'] && { customerId: query['customerId'] }),
      ...(query['propertyId'] && { propertyId: query['propertyId'] }),
    };
  }

  private buildUrlParams(overrides: Record<string, string | number | undefined> = {}): Record<string, string | number | undefined> {
    const config = this.table_config();
    const query = this.route.snapshot.queryParams;
    const search = 'search' in overrides ? overrides['search'] : this.search || undefined;
    const groupId = 'group_id' in overrides ? overrides['group_id'] : this.selectedGroupId || undefined;
    const status = 'status' in overrides ? overrides['status'] : query['status'];
    const hasOverdue = 'hasOverdue' in overrides ? overrides['hasOverdue'] : query['hasOverdue'];
    const customerId = 'customerId' in overrides ? overrides['customerId'] : query['customerId'];
    const propertyId = 'propertyId' in overrides ? overrides['propertyId'] : query['propertyId'];

    return {
      page: overrides['page'] ?? config.page ?? 1,
      limit: overrides['limit'] ?? config.limit ?? 20,
      ...(search && { search }),
      ...(groupId && { group_id: groupId }),
      ...(status && { status }),
      ...(hasOverdue && { hasOverdue }),
      ...(customerId && { customerId }),
      ...(propertyId && { propertyId }),
    };
  }

  private navigateWithParams(overrides: Record<string, string | number | undefined> = {}): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.buildUrlParams(overrides),
    });
  }
}
