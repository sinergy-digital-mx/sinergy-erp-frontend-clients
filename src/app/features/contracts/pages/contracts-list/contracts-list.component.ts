import { Component, signal, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
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
import { ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-contracts-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
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
      { name: 'Fecha', prop: 'contract_date', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Precio Total', prop: 'total_price', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Saldo Pendiente', prop: 'remaining_balance', sortable: true, canAutoResize: true, width: 130 },
      { name: 'Siguiente Pago', prop: 'first_payment_date', sortable: true, canAutoResize: true, width: 130 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 120 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron contratos' },
    columnMode: 'force',
    reorderable: false,
  });

  ArrowRight = ArrowRight;
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
    private dialog: MatDialog
  ) {
    this.loadStats();
    
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;

      this.search = query?.search ?? '';
      
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
    const queryParams: any = { 
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
    const queryParams = this.route.snapshot.queryParams;
    
    let data: any = {
      ...(this.search && { search: this.search }),
      ...(queryParams.status && { status: queryParams.status }),
      ...(queryParams.hasOverdue && { hasOverdue: queryParams.hasOverdue })
    };
    
    this.contractService.getContracts(data).subscribe((res: any) => {
      // Handle both array response and paginated response
      const contracts = Array.isArray(res) ? res : (res?.data ?? []);
      const total = Array.isArray(res) ? res.length : (res?.total ?? 0);
      
      this.table_config.update(c => ({
        ...c,
        rows: contracts,
        totalResults: total,
        loading: false,
      }));
    });
  }

  onPageChange(event: IPaginationEvent) {
    // Client-side pagination - no need to reload data
  }

  onSortChange(event: ISortEvent) {
    // Client-side sorting - no need to reload data
    this.currentSort = event;
  }

  onRowClick(row: Contract) {
    this.viewDetail(row);
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: searchTerm || undefined
      },
      queryParamsHandling: 'merge'
    });
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
    this.dialog.open(ContractDetailModalComponent, {
      data: { contract }
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
}
