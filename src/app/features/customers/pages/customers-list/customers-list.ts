import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ArrowRight } from 'lucide-angular';
import { CustomerService } from '../../../../core/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IColumn, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomerGroupDropdownComponent } from '../../components/customer-group-dropdown/customer-group-dropdown.component';
import { FilterIndicatorComponent } from '../../components/filter-indicator/filter-indicator.component';
import { CustomerEditModalComponent } from '../../components/customer-edit-modal/customer-edit-modal.component';
import { FilterStateService } from '../../services/filter-state.service';
import { Customer } from '../../models/customer-group.model';
import { PhoneComponent } from '../../../../core/components/phone/phone.component';

@Component({
  selector: 'app-customers-list',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    ButtonModule,
    SearchComponent,
    ButtonComponent,
    SelectComponent,
    DatatableWrapperComponent,
    CustomerGroupDropdownComponent,
    FilterIndicatorComponent,
    PhoneComponent
  ],
  templateUrl: './customers-list.html',
  styleUrl: './customers-list.scss',
})
export class CustomersList implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true },
      { name: 'Email', prop: 'email', sortable: true, canAutoResize: true },
      { name: 'Teléfono', prop: 'phone', sortable: true, canAutoResize: true },
      { name: 'Grupo', prop: 'group_id', sortable: true, canAutoResize: true },
      { name: 'Lotes', prop: 'contracts', sortable: false, canAutoResize: true },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: true },
      { name: 'Creado', prop: 'created_at', sortable: true, canAutoResize: true },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true },
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
  search = '';
  selectedGroupId: string | null = null;
  selectedGroupName: string | null = null;
  selectedStatusId: string | null = null;
  currentSort: ISortEvent | null = null;
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';

  statusSelectConfig = {
    placeholder: 'Filtrar por estado',
    data: [
      { id: 'active', name: 'Activo' },
      { id: 'inactive', name: 'Inactivo' }
    ],
    value: null,
    option: 'name',
    all: true,
    all_message: 'Ver Todos'
  };

  constructor(
    private router: Router,
    public customer_service: CustomerService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private filterStateService: FilterStateService
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
      ...(this.currentSort && this.currentSort.direction && { sort: this.currentSort.column.prop, order: this.currentSort.direction })
    };
    this.customer_service.getCustomers(data).subscribe(res => {
      console.log('Customers with contracts:', res?.data?.map(c => ({ 
        name: c.name, 
        contractsCount: c.contracts?.length || 0,
        contracts: c.contracts 
      })));
      this.table_config.update(c => ({
        ...c,
        rows: res?.data ?? [],
        totalResults: res?.total ?? 0,
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
        group_id: this.selectedGroupId || undefined,
        status_id: this.selectedStatusId || undefined
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
        group_id: this.selectedGroupId || undefined,
        status_id: this.selectedStatusId || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onRowClick(row: any) {
    this.viewDetail(row);
  }

  onGroupSelect(event: { groupId: string | null; groupName: string | null }) {
    this.selectedGroupId = event.groupId;
    this.selectedGroupName = event.groupName;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        group_id: event.groupId || undefined,
        search: this.search || undefined,
        status_id: this.selectedStatusId || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onStatusSelect(event: any) {
    const statusId = event?.value || null;
    this.selectedStatusId = statusId;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        status_id: statusId || undefined,
        search: this.search || undefined,
        group_id: this.selectedGroupId || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onFilterClear(filterType: 'status' | 'group' | 'search' | 'all') {
    if (filterType === 'all') {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
      this.selectedStatusId = null;
      this.search = '';
    } else if (filterType === 'group') {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
    } else if (filterType === 'status') {
      this.selectedStatusId = null;
    } else if (filterType === 'search') {
      this.search = '';
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: this.search || undefined,
        group_id: this.selectedGroupId || undefined,
        status_id: this.selectedStatusId || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || undefined,
        group_id: this.selectedGroupId || undefined,
        status_id: this.selectedStatusId || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  editCustomer(customer: Customer) {
    // Removed - editing only available on detail page
  }
  
  createCustomer() {
    this.dialog.open(CustomerEditModalComponent, {
      data: { customer: null },
      width: '500px'
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

  getFirstLotCode(customer: Customer): string {
    if (!customer.contracts || customer.contracts.length === 0) {
      return '—';
    }
    return customer.contracts[0].property.code;
  }

  getAdditionalLotsCount(customer: Customer): number {
    if (!customer.contracts || customer.contracts.length <= 1) {
      return 0;
    }
    return customer.contracts.length - 1;
  }

  hasMultipleLots(customer: Customer): boolean {
    return (customer.contracts?.length || 0) > 1;
  }
}
