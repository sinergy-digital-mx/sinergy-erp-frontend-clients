import { Component, signal, TemplateRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Customer, CustomerStatus } from '../../models/customer-group.model';
import { PhoneComponent } from '../../../../core/components/phone/phone.component';
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

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TagModule,
    ButtonModule,
    SearchComponent,
    SelectComponent,
    DatatableWrapperComponent,
    CustomerGroupDropdownComponent,
    FilterIndicatorComponent,
    PhoneComponent,
    LucideAngularModule,
    FilterClearButtonComponent
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
      { name: 'Teléfono', prop: 'phone', sortable: true, canAutoResize: true },
      { name: 'Grupo', prop: 'group_id', sortable: true, canAutoResize: true },
      { name: 'Lotes', prop: 'contracts', sortable: false, canAutoResize: true },
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
  readonly Math = Math;
  search = '';
  selectedGroupId: string | null = null;
  selectedGroupName: string | null = null;
  selectedStatusId: string | null = null;
  selectedStatusName: string | null = null;
  currentSort: ISortEvent | null = null;
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';
  private customerStatuses: CustomerStatus[] = [];

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

  constructor(
    private router: Router,
    public customer_service: CustomerService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private filterStateService: FilterStateService,
    private toast: ToastService
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
    this.customer_service.getCustomerStatuses().subscribe({
      next: (statuses) => {
        this.customerStatuses = statuses;
        this.syncStatusFilterConfig();
      },
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

  private syncStatusFilterConfig(): void {
    this.statusSelectConfig = {
      ...this.statusSelectConfig,
      data: this.customerStatuses.map((s) => ({ id: s.id, name: s.name })),
      value_default: this.selectedStatusId ? Number(this.selectedStatusId) : null,
    };
    this.selectedStatusName = this.resolveStatusName(this.selectedStatusId);
  }

  private resolveStatusName(statusId: string | null): string | null {
    if (!statusId) return null;
    const id = Number(statusId);
    return this.customerStatuses.find((s) => s.id === id)?.name ?? null;
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

  onRowClick(event: any) {
    this.viewDetail(event.data);
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

  onStatusSelect(event: any): void {
    const statusId = event?.value != null && event?.value !== '' ? String(event.value) : null;
    this.selectedStatusId = statusId;
    this.selectedStatusName = this.resolveStatusName(statusId);
    this.statusSelectConfig = {
      ...this.statusSelectConfig,
      value_default: statusId ? Number(statusId) : null,
    };
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

  get hasActiveFilters(): boolean {
    return !!(this.search || this.selectedGroupId || this.selectedStatusId);
  }

  onFilterClear(filterType: 'status' | 'group' | 'search' | 'all') {
    if (filterType === 'all') {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
      this.selectedStatusId = null;
      this.selectedStatusName = null;
      this.statusSelectConfig = { ...this.statusSelectConfig, value_default: null };
      this.search = '';
    } else if (filterType === 'group') {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
    } else if (filterType === 'status') {
      this.selectedStatusId = null;
      this.selectedStatusName = null;
      this.statusSelectConfig = { ...this.statusSelectConfig, value_default: null };
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
