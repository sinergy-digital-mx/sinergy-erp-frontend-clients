import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContractService } from '../../services/contract.service';
import { Contract, ContractStats } from '../../models/contract.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PropertyService } from '../../../properties/services/property.service';
import { PropertyEditModalComponent } from '../../../properties/components/property-edit-modal/property-edit-modal.component';
import { ContractDetailModalComponent } from '../../components/contract-detail-modal/contract-detail-modal.component';
import { ContractCreateModalComponent } from '../../components/contract-create-modal/contract-create-modal.component';
import { ContractFilterIndicatorComponent } from '../../components/contract-filter-indicator/contract-filter-indicator.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { ArrowRight, AlertTriangle, Download } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

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
    MatTooltipModule
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
      { name: 'Cliente', prop: 'customer', sortable: false, canAutoResize: false, width: 200 },
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
  AlertTriangle = AlertTriangle;
  Download = Download;
  search = '';
  currentSort: ISortEvent | null = null;
  stats = signal<ContractStats | null>(null);
  activeFilter = signal<string | null>(null);
  private destroy$ = new Subject<void>();
  private lastQueryParams: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contractService: ContractService,
    private propertyService: PropertyService,
    private dialog: MatDialog,
    private interceptorService: InterceptorService
  ) {
    this.loadStats();
    
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;

      this.search = query?.search ?? '';
      
      // Update pagination from query params
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;
      
      this.table_config.update(c => ({
        ...c,
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit,
      }));
      
      // Detect active filter from query params
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

      // Initialize URL with pagination params if not present
      if (!query?.page || !query?.limit) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: page,
            limit: limit,
            ...(this.search && { search: this.search }),
            ...(query?.status && { status: query.status }),
            ...(query?.hasOverdue && { hasOverdue: query.hasOverdue })
          },
          replaceUrl: true
        });
        return; // Exit early, the new query params will trigger another subscription
      }

      this.getContracts();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStats() {
    this.contractService.getContractStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  applyFilter(filter: 'total' | 'completed' | 'pending' | 'overdue') {
    const config = this.table_config();
    const queryParams: any = { 
      page: 1,
      limit: config.limit,
      // Preserve search if exists
      ...(this.search && { search: this.search })
    };
    
    switch (filter) {
      case 'completed':
        queryParams.status = 'completado';
        break;
      case 'pending':
        queryParams.status = 'activo';
        break;
      case 'overdue':
        queryParams.hasOverdue = 'true';
        break;
      case 'total':
      default:
        // No filter params for total - remove status and hasOverdue
        break;
    }
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  getContracts() {
    this.table_config.update(c => ({ ...c, loading: true }));
    const config = this.table_config();
    const page = isNaN(config.page) ? 1 : config.page;
    const limit = isNaN(config.limit) ? 20 : config.limit;
    
    const queryParams = this.route.snapshot.queryParams;
    
    let data: any = {
      page: page,
      limit: limit,
      ...(this.search && { search: this.search }),
      ...(queryParams.status && { status: queryParams.status }),
      ...(queryParams.hasOverdue && { hasOverdue: queryParams.hasOverdue })
    };
    
    console.log('🔍 Requesting contracts with:', data);
    
    this.contractService.getContracts(data).subscribe((res: any) => {
      console.log('📦 API Response:', res);
      
      // Handle both array response and paginated response
      let contracts = [];
      let total = 0;
      let hasNext = false;
      
      if (Array.isArray(res)) {
        // Direct array response
        console.log('⚠️ API returned array directly, length:', res.length);
        contracts = res;
        total = res.length;
        hasNext = false;
      } else if (res?.data) {
        // Paginated response with data property
        console.log('✅ API returned paginated response, data length:', res.data.length, 'total:', res.pagination?.total ?? res.total);
        contracts = res.data;
        total = res.pagination?.total ?? res.total ?? res.data.length;
        hasNext = res.pagination?.hasNext ?? (page * limit < total);
      }
      
      console.log('📊 Setting table with:', { rows: contracts.length, total, hasNext, page, limit });
      
      this.table_config.update(c => ({
        ...c,
        rows: contracts,
        totalResults: total,
        hasNext: hasNext,
        loading: false,
      }));
    });
  }

  onPageChange(event: IPaginationEvent) {
    this.table_config.update(c => ({
      ...c,
      page: event.page,
      limit: event.limit
    }));
    this.updateUrlParams();
  }

  onSortChange(event: ISortEvent) {
    // Client-side sorting - no need to reload data
    this.currentSort = event;
  }

  updateUrlParams() {
    const config = this.table_config();
    const params: any = {
      page: config.page,
      limit: config.limit,
    };

    // Add search if present
    if (this.search) {
      params.search = this.search;
    }

    // Add status filter if active
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.status) {
      params.status = queryParams.status;
    }
    if (queryParams.hasOverdue) {
      params.hasOverdue = queryParams.hasOverdue;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true
    });
  }

  onRowClick(row: any) {
    // Extract the actual contract from the row object
    const contract = row?.data || row;
    console.log('📋 Row clicked:', contract);
    console.log('📋 Row ID:', contract?.id);
    this.viewDetail(contract);
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    const config = this.table_config();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        limit: config.limit,
        search: searchTerm || undefined
      },
      queryParamsHandling: 'merge'
    });
  }

  clearFilters() {
    this.search = '';
    this.activeFilter.set(null);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  onFilterClear(filterType: 'search' | 'status' | 'all') {
    if (filterType === 'search' || filterType === 'all') {
      this.search = '';
    }
    
    if (filterType === 'status' || filterType === 'all') {
      this.activeFilter.set(null);
    }

    const queryParams: any = {};
    if (filterType !== 'all') {
      // Si solo limpiamos un filtro, preservar el otro
      if (filterType === 'search') {
        queryParams.status = this.route.snapshot.queryParams.status || undefined;
      } else if (filterType === 'status') {
        queryParams.search = this.search || undefined;
      }
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }

  getActiveStatusFilter(): string | null {
    const queryParams = this.route.snapshot.queryParams;
    return queryParams.status || null;
  }

  createContract() {
    // Open create modal
    console.log('Create contract');
  }

  openCreateContractModal() {
    const dialogRef = this.dialog.open(ContractCreateModalComponent, {
      width: '900px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getContracts();
      }
    });
  }

  viewDetail(contract: Contract) {
    if (!contract || !contract.id) {
      console.error('❌ Contract or contract.id is missing:', contract);
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'No se pudo cargar el contrato. ID no disponible.'
      });
      return;
    }

    const dialogRef = this.dialog.open(ContractDetailModalComponent, {
      data: { contract }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted' || result === true) {
        this.getContracts();
        this.loadStats(); // También recargar estadísticas
      }
    });
  }

  navigateToCustomer(customerId: number) {
    this.router.navigate(['/customers/detail', customerId]);
  }

  navigateToProperty(propertyId: string) {
    // Fetch property details and open modal
    this.propertyService.getProperty(propertyId).subscribe({
      next: (property) => {
        this.dialog.open(PropertyEditModalComponent, {
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

  downloadGeneralReport(): void {
    this.contractService.exportToExcel().subscribe({
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
}
