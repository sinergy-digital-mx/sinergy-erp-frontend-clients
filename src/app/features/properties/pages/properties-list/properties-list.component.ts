import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from '../../services/property.service';
import { Property, PropertyStatus } from '../../models/property.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { PropertyEditModalComponent } from '../../components/property-edit-modal/property-edit-modal.component';
import { PROPERTY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { PropertyGroupDropdownComponent } from '../../components/property-group-dropdown/property-group-dropdown.component';
import { PropertyStatusDropdownComponent } from '../../components/property-status-dropdown/property-status-dropdown.component';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { PropertyFilterIndicatorComponent } from '../../components/property-filter-indicator/property-filter-indicator.component';
import { ArrowRight, Plus, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    PropertyGroupDropdownComponent,
    PropertyStatusDropdownComponent,
    FilterClearButtonComponent,
    PropertyFilterIndicatorComponent,
    LucideAngularModule,
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
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: false, width: 180 },
      { name: 'Proyecto', prop: 'group', sortable: false, canAutoResize: true, width: 130 },
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
  search = '';
  selectedGroupId: string | null = null;
  selectedGroupName: string | null = null;
  selectedStatus: PropertyStatus | null = null;
  currentSort: ISortEvent | null = null;
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private dialog: MatDialog
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;

      this.search = query?.search ?? '';
      this.selectedGroupId = query?.groupId ?? null;
      this.selectedStatus = query?.status ?? null;
      if (!this.selectedGroupId) {
        this.selectedGroupName = null;
      }
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;

      this.table_config.update(c => ({
        ...c,
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit,
      }));

      this.getProperties();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProperties() {
    this.table_config.update(c => ({ ...c, loading: true }));
    const config = this.table_config();
    
    let data: any = {
      page: config.page,
      limit: config.limit,
      ...(this.search && { search: this.search }),
      ...(this.selectedGroupId && { groupId: this.selectedGroupId }),
      ...(this.selectedStatus && { status: this.selectedStatus }),
      ...(this.currentSort && this.currentSort.direction && { 
        sort: this.currentSort.column.prop, 
        order: this.currentSort.direction 
      })
    };

    this.propertyService.getProperties(data).subscribe(res => {
      // Handle both array response and paginated response
      const properties = Array.isArray(res) ? res : (res?.data ?? []);
      const total = Array.isArray(res) ? res.length : (res?.total ?? 0);
      
      this.table_config.update(c => ({
        ...c,
        rows: properties,
        totalResults: total,
        hasNext: res?.hasNext ?? false,
        loading: false,
      }));
    });
  }

  onPageChange(event: IPaginationEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page,
        limit: event.limit,
        search: this.search || undefined,
        groupId: this.selectedGroupId || undefined,
        status: this.selectedStatus || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onSortChange(event: ISortEvent) {
    this.currentSort = event;
    this.table_config.update(c => ({ ...c, page: 1 }));
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: this.search || undefined,
        groupId: this.selectedGroupId || undefined,
        status: this.selectedStatus || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onRowClick(event: any) {
    const row = event?.data || event;
    this.editProperty(row);
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || undefined,
        groupId: this.selectedGroupId || undefined,
        status: this.selectedStatus || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onGroupSelect(event: { groupId: string | null; groupName: string | null }) {
    this.selectedGroupId = event.groupId;
    this.selectedGroupName = event.groupName;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        groupId: event.groupId || undefined,
        search: this.search || undefined,
        status: this.selectedStatus || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onStatusSelect(event: { status: PropertyStatus | null }) {
    this.selectedStatus = event.status;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        status: event.status || undefined,
        search: this.search || undefined,
        groupId: this.selectedGroupId || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  get hasActiveFilters(): boolean {
    return !!(this.search || this.selectedGroupId || this.selectedStatus);
  }

  clearAllFilters(): void {
    this.selectedGroupId = null;
    this.selectedGroupName = null;
    this.selectedStatus = null;
    this.onSearchChange('');
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
      }
    });
  }

  formatArea(property: Property): string {
    const unit = property.measurement_unit?.symbol || 'm²';
    const area = property.total_area ?? '—';
    return `${area} ${unit}`;
  }

  formatPrice(property: Property): string {
    const value = Number(property.total_price ?? 0);
    const currency = property.currency || 'MXN';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number.isFinite(value) ? value : 0);
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
    const owner = property.contracts?.[0]?.customer;
    if (!owner) return '—';
    
    // Mostrar nombre + primer apellido
    const firstLastname = owner.lastname?.split(' ')[0] || '';
    return `${owner.name} ${firstLastname}`.trim();
  }

  hasOwner(property: Property): boolean {
    return !!(property.contracts && property.contracts.length > 0 && property.contracts[0].customer);
  }

  navigateToCustomer(property: Property): void {
    const customerId = property.contracts?.[0]?.customer?.id;
    if (customerId) {
      this.router.navigate(['/customers/detail', customerId]);
    }
  }
}
