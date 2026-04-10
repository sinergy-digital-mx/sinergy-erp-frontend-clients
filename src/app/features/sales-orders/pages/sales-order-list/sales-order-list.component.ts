import { Component, OnInit, signal, computed, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../services/sales-order.service';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { SalesOrder, SalesOrderFilters, PaginationParams } from '../../models/sales-order.model';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { SalesFilterBarComponent } from '../../components/sales-filter-bar/sales-filter-bar.component';
import { CreateSalesOrderModalComponent } from '../../components/create-sales-order-modal/create-sales-order-modal.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent, ISortEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

@Component({
  selector: 'app-sales-order-list',
  standalone: true,
  imports: [CommonModule, SalesFilterBarComponent, DatatableWrapperComponent],
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly Math = Math;

  private ordersData = signal<SalesOrder[]>([]);
  private filtersState = signal<SalesOrderFilters>({});
  private paginationState = signal<PaginationParams>({ page: 1, limit: 15 });
  private loadingState = signal<boolean>(false);
  private totalResultsState = signal<number>(0);
  private hasMoreState = signal<boolean>(true);

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Cliente', prop: 'customer', sortable: true, canAutoResize: false, width: 150 },
      { name: 'Almacén', prop: 'warehouse', sortable: false, canAutoResize: false, width: 150 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Total', prop: 'requested_total', sortable: true, canAutoResize: false, width: 120 },
      { name: 'Pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Fecha', prop: 'created_at', sortable: true, canAutoResize: false, width: 160 },
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron órdenes de venta' },
    columnMode: 'force',
    reorderable: false,
  });

  orders = this.ordersData.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  warehouses = signal<Warehouse[]>([]);

  // Stats
  totalOrders = computed(() => this.totalResultsState());
  totalAmount = computed(() =>
    this.ordersData().reduce((sum, o) => sum + this.getOrderTotal(o), 0)
  );

  creadasCount = computed(() => this.ordersData().filter(o => o.status === 'Creada').length);
  surtidasCount = computed(() => this.ordersData().filter(o => o.status === 'Surtida').length);
  canceladasCount = computed(() => this.ordersData().filter(o => o.status === 'Cancelada').length);

  creadasAmount = computed(() => this.ordersData().filter(o => o.status === 'Creada').reduce((s, o) => s + this.getOrderTotal(o), 0));
  surtidasAmount = computed(() => this.ordersData().filter(o => o.status === 'Surtida').reduce((s, o) => s + this.getOrderTotal(o), 0));

  pagadasCount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pagada').length);
  pendientesCount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pendiente').length);
  pagadasAmount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pagada').reduce((s, o) => s + this.getOrderTotal(o), 0));
  pendientesAmount = computed(() => this.ordersData().filter(o => o.payment_status === 'Pendiente').reduce((s, o) => s + this.getOrderTotal(o), 0));

  creadasPercent = computed(() => this.totalOrders() > 0 ? (this.creadasCount() / this.totalOrders()) * 100 : 0);
  surtidasPercent = computed(() => this.totalOrders() > 0 ? (this.surtidasCount() / this.totalOrders()) * 100 : 0);
  pagadasPercent = computed(() => this.totalOrders() > 0 ? (this.pagadasCount() / this.totalOrders()) * 100 : 0);
  pendientesPercent = computed(() => this.totalOrders() > 0 ? (this.pendientesCount() / this.totalOrders()) * 100 : 0);

  constructor(
    private salesOrderService: SalesOrderService,
    private warehouseService: WarehouseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private taxCalculator: TaxCalculatorService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadWarehouses();
  }

  loadOrders(): void {
    this.loadingState.set(true);
    this.table_config.update(c => ({ ...c, loading: true }));

    this.salesOrderService.getOrders(this.filtersState(), this.paginationState()).subscribe({
      next: (response) => {
        const orders = response.data || [];
        const total = response.total || 0;
        const hasNext = response.page < response.totalPages;

        this.ordersData.set(orders);
        this.totalResultsState.set(total);
        this.hasMoreState.set(hasNext);

        this.table_config.update(c => ({
          ...c,
          rows: orders,
          totalResults: total,
          hasNext,
          loading: false,
        }));

        this.loadingState.set(false);
      },
      error: (error) => {
        console.error('Error loading sales orders:', error);
        this.loadingState.set(false);
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
  }

  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (res) => this.warehouses.set(Array.isArray(res) ? res : (res as any).data || []),
      error: (err) => console.error('Error loading warehouses:', err)
    });
  }

  applyFilters(filters: SalesOrderFilters): void {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: 15 });
    this.loadOrders();
  }

  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadOrders();
  }

  onSortChange(event: ISortEvent): void {
    console.log('Sort changed:', event);
  }

  navigateToCreate(): void {
    this.dialog.open(CreateSalesOrderModalComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'create-purchase-order-modal'
    }).afterClosed().subscribe(result => {
      if (result) this.loadOrders();
    });
  }

  navigateToDetail(order: SalesOrder): void {
    // TODO: open detail dialog
    console.log('Open detail for:', order.id);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Creada': return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700';
      case 'Surtida': return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700';
      case 'Cancelada': return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700';
      default: return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700';
    }
  }

  getPaymentStatusClass(status: string): string {
    switch (status) {
      case 'Pagada': return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700';
      case 'Parcial': return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700';
      case 'Pendiente': return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700';
      default: return 'inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700';
    }
  }

  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }

  formatDateHuman(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const hours = d.getHours() % 12 || 12;
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    return `${months[d.getMonth()]} ${d.getDate()} ${hours}:${minutes} ${ampm}`;
  }

  getOrderTotal(order: SalesOrder): number {
    return parseFloat(order.requested_total || '0') || order.grand_total || 0;
  }
}
