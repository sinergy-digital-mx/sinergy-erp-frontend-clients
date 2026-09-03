import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from '../../services/property.service';
import {
  Property,
  PropertyListFilters,
  PropertyStatus,
  PropertyStats,
  EMPTY_PROPERTY_STATS,
  displayCadastralKey,
} from '../../models/property.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { PropertyEditModalComponent } from '../../components/property-edit-modal/property-edit-modal.component';
import { PROPERTY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { PropertyStatusDropdownComponent } from '../../components/property-status-dropdown/property-status-dropdown.component';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { PropertyFilterIndicatorComponent } from '../../components/property-filter-indicator/property-filter-indicator.component';
import { PropertyStatsCardsComponent } from '../../components/property-stats-cards/property-stats-cards.component';
import { ArrowRight, Plus, LucideAngularModule } from 'lucide-angular';
import { CustomerGroupDropdownComponent } from '../../../customers/components/customer-group-dropdown/customer-group-dropdown.component';
import { CustomerGroupFetchService } from '../../../customers/services/customer-group-fetch.service';
import { ToastService } from '../../../../core/services/toast.service';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import {
  formatPolluxAmount,
  resolvePolluxCurrency,
} from '../../../../core/utils/pollux-money.util';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    EmptyStageComponent,
    SearchComponent,
    PropertyStatusDropdownComponent,
    FilterClearButtonComponent,
    PropertyFilterIndicatorComponent,
    PropertyStatsCardsComponent,
    LucideAngularModule,
    CustomerGroupDropdownComponent,
  ],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.scss'
})
export class PropertiesListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Código', prop: 'code', sortable: true, canAutoResize: true, width: 110 },
      { name: 'Manzana', prop: 'block', sortable: true, canAutoResize: true, width: 90 },
      { name: 'Clave catastral', prop: 'cadastral_key', sortable: false, canAutoResize: true, width: 160 },
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: false, width: 180 },
      { name: 'Grupo', prop: 'group', sortable: false, canAutoResize: true, width: 140 },
      { name: 'Cliente', prop: 'contracts', sortable: false, canAutoResize: true, width: 150 },
      { name: 'Área', prop: 'total_area', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Precio', prop: 'total_price', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: true, width: 120 },
      { name: '', prop: 'actions', sortable: false, canAutoResize: false, width: 64 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron lotes' },
    columnMode: 'force',
    reorderable: false,
  });

  ArrowRight = ArrowRight;
  Plus = Plus;
  readonly Math = Math;
  readonly displayCadastralKey = displayCadastralKey;
  search = '';
  selectedGroupId: string | null = null;
  selectedGroupName: string | null = null;
  selectedStatus: PropertyStatus | null = null;
  currentSort: ISortEvent | null = null;
  stats = signal<PropertyStats>(EMPTY_PROPERTY_STATS);
  statsLoading = signal(true);
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';
  private lastFilterKey = '';
  private listRequestId = 0;
  private statsRequestId = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private dialog: MatDialog,
    private toast: ToastService,
    private customerGroupFetch: CustomerGroupFetchService
  ) {
    this.customerGroupFetch.fetchGroups().pipe(takeUntil(this.destroy$)).subscribe({
      next: (groups) => {
        if (this.selectedGroupId) {
          this.selectedGroupName =
            groups.find((group) => group.id === this.selectedGroupId)?.name ?? null;
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
      this.selectedStatus = query?.status ?? null;
      this.selectedGroupId = query?.group_id ?? query?.customer_group_id ?? null;
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

      const filters = this.buildApiFilters();
      const filterKey = JSON.stringify(filters);
      const reloadStats = filterKey !== this.lastFilterKey;
      this.lastFilterKey = filterKey;

      this.getProperties();
      if (reloadStats) {
        this.loadStats();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProperties() {
    const requestId = ++this.listRequestId;
    this.table_config.update(c => ({ ...c, loading: true }));
    const config = this.table_config();

    const data: PropertyListFilters = {
      page: config.page,
      limit: config.limit,
      ...this.buildApiFilters(),
      ...(this.currentSort && this.currentSort.direction && {
        sort: this.currentSort.column.prop,
        order: this.currentSort.direction
      })
    };

    this.propertyService.getProperties(data).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (requestId !== this.listRequestId) {
          return;
        }
        const properties = Array.isArray(res) ? res : (res?.data ?? []);
        const total = Array.isArray(res) ? res.length : (res?.total ?? 0);

        this.table_config.update(c => ({
          ...c,
          rows: properties,
          totalResults: total,
          hasNext: res?.hasNext ?? false,
          loading: false,
        }));
      },
      error: () => {
        if (requestId !== this.listRequestId) {
          return;
        }
        this.table_config.update(c => ({ ...c, loading: false }));
        this.toast.error('No se pudieron cargar los lotes');
      }
    });
  }

  loadStats() {
    const requestId = ++this.statsRequestId;
    this.statsLoading.set(true);
    this.propertyService.getPropertyStats(this.buildApiFilters()).pipe(
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
        this.stats.set(EMPTY_PROPERTY_STATS);
        this.statsLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudieron cargar las estadísticas de lotes'));
      }
    });
  }

  onPageChange(event: IPaginationEvent) {
    this.navigateWithParams({ page: event.page, limit: event.limit });
  }

  onSortChange(event: ISortEvent) {
    this.currentSort = event;
    const alreadyFirstPage = (this.table_config().page ?? 1) === 1;
    this.table_config.update(c => ({ ...c, page: 1 }));
    this.navigateWithParams({ page: 1 });
    if (alreadyFirstPage) {
      this.getProperties();
    }
  }

  onRowClick(event: any) {
    const row = event?.data || event;
    this.editProperty(row);
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

  onStatusSelect(event: { status: PropertyStatus | null }) {
    this.selectedStatus = event.status;
    this.navigateWithParams({ page: 1, status: event.status || undefined });
  }

  get hasActiveFilters(): boolean {
    return !!(this.search || this.selectedGroupId || this.selectedStatus);
  }

  clearAllFilters(): void {
    this.selectedGroupId = null;
    this.selectedGroupName = null;
    this.selectedStatus = null;
    this.search = '';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  onFilterClear(type: 'status' | 'group' | 'search' | 'all'): void {
    if (type === 'all') {
      this.clearAllFilters();
      return;
    }
    if (type === 'search') {
      this.onSearchChange('');
      return;
    }
    if (type === 'group') {
      this.onGroupSelect({ groupId: null, groupName: null });
      return;
    }
    if (type === 'status') {
      this.onStatusSelect({ status: null });
    }
  }

  createProperty() {
    this.dialog.open(PropertyEditModalComponent, {
      ...PROPERTY_FORM_DIALOG_CONFIG,
      data: { property: null }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getProperties();
        this.loadStats();
      }
    });
  }

  editProperty(property: Property) {
    this.dialog.open(PropertyEditModalComponent, {
      ...PROPERTY_FORM_DIALOG_CONFIG,
      data: { property },
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getProperties();
        this.loadStats();
      }
    });
  }

  formatArea(property: Property): string {
    const unit = property.measurement_unit?.symbol || 'm²';
    const area = property.total_area ?? '—';
    return `${area} ${unit}`;
  }

  formatPrice(property: Property): string {
    return formatPolluxAmount(property.total_price);
  }

  resolveCurrency(property: Property): string {
    return resolvePolluxCurrency(property.currency);
  }

  getStatusPillClass(status: string): string {
    const statusMap: Record<string, string> = {
      disponible: 'status-pill--disponible',
      vendido: 'status-pill--vendido',
      reservado: 'status-pill--reservado',
      cancelado: 'status-pill--cancelado',
    };
    return statusMap[status] || 'status-pill--default';
  }

  viewDetail(row: Property) {
    this.router.navigate(['/properties/detail', row.id]);
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      disponible: 'Disponible',
      vendido: 'Vendido',
      reservado: 'Reservado',
      cancelado: 'Cancelado',
    };
    return labels[status] || status;
  }

  getOwnerName(property: Property): string {
    const owner = this.getOwner(property);
    if (!owner) return '—';

    if (owner.fullName?.trim()) {
      return owner.fullName.trim();
    }
    const firstLastname = owner.lastname?.split(' ')[0] || '';
    return `${owner.name} ${firstLastname}`.trim();
  }

  getGroupName(property: Property): string {
    return property.group?.name ?? '—';
  }

  hasOwner(property: Property): boolean {
    return !!this.getOwner(property);
  }

  navigateToCustomer(property: Property): void {
    const customerId = this.getOwner(property)?.id;
    if (customerId) {
      this.router.navigate(['/customers/detail', customerId]);
    }
  }

  private getOwner(property: Property) {
    return property.customer ?? property.contracts?.[0]?.customer ?? null;
  }

  private buildApiFilters(): PropertyListFilters {
    return {
      ...(this.search && { search: this.search }),
      ...(this.selectedGroupId && { group_id: this.selectedGroupId }),
      ...(this.selectedStatus && { status: this.selectedStatus }),
    };
  }

  private navigateWithParams(overrides: Record<string, string | number | undefined> = {}): void {
    const config = this.table_config();
    const search = 'search' in overrides ? overrides['search'] : this.search || undefined;
    const groupId = 'group_id' in overrides ? overrides['group_id'] : this.selectedGroupId || undefined;
    const status = 'status' in overrides ? overrides['status'] : this.selectedStatus || undefined;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: overrides['page'] ?? config.page ?? 1,
        limit: overrides['limit'] ?? config.limit ?? 20,
        ...(search && { search }),
        ...(groupId && { group_id: groupId }),
        ...(status && { status }),
      },
    });
  }
}
