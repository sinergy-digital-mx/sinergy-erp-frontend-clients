import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PropertyEditModalComponent } from '../../components/property-edit-modal/property-edit-modal.component';
import { PropertyGroupDropdownComponent } from '../../components/property-group-dropdown/property-group-dropdown.component';
import { ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    PropertyGroupDropdownComponent
  ],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.scss'
})
export class PropertiesListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Código', prop: 'code', sortable: true, canAutoResize: true },
      { name: 'Manzana', prop: 'block', sortable: true, canAutoResize: true },
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true },
      { name: 'Proyecto', prop: 'group', sortable: false, canAutoResize: true },
      { name: 'Cliente', prop: 'contracts', sortable: false, canAutoResize: true },
      { name: 'Área', prop: 'total_area', sortable: true, canAutoResize: true },
      { name: 'Precio', prop: 'total_price', sortable: true, canAutoResize: true },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: true },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true },
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
  search = '';
  selectedGroupId: string | null = null;
  selectedGroupName: string | null = null;
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
        groupId: this.selectedGroupId || undefined
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
        groupId: this.selectedGroupId || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onRowClick(row: Property) {
    this.editProperty(row);
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || undefined,
        groupId: this.selectedGroupId || undefined
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
        search: this.search || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  createProperty() {
    this.dialog.open(PropertyEditModalComponent, {
      data: { property: null }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getProperties();
      }
    });
  }

  editProperty(property: Property) {
    this.dialog.open(PropertyEditModalComponent, {
      data: { property }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getProperties();
      }
    });
  }

  viewDetail(row: Property) {
    this.router.navigate(['/properties/detail', row.id]);
  }

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'disponible': 'bg-green-100 text-green-800',
      'vendido': 'bg-blue-100 text-blue-800',
      'reservado': 'bg-yellow-100 text-yellow-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status] || 'bg-gray-100 text-gray-800'}`;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'disponible': 'Disponible',
      'vendido': 'Vendido',
      'reservado': 'Reservado',
      'cancelado': 'Cancelado'
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
