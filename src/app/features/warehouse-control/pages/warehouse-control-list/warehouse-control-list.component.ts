import { Component, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { Branch } from '../../../settings/models/branch.model';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { BranchService } from '../../../settings/services/branch.service';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { WarehouseControlDetailPanelComponent } from '../../components/warehouse-control-detail-panel/warehouse-control-detail-panel.component';
import {
  WarehouseControlFilters,
  WarehouseControlOrder,
} from '../../models/warehouse-control.model';
import { WarehouseControlService } from '../../services/warehouse-control.service';

@Component({
  selector: 'app-warehouse-control-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatatableWrapperComponent,
    FilterClearButtonComponent,
  ],
  templateUrl: './warehouse-control-list.component.html',
  styleUrl: './warehouse-control-list.component.scss',
})
export class WarehouseControlListComponent implements OnInit, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate!: TemplateRef<unknown>;

  private destroy$ = new Subject<void>();
  private filtersState = signal<WarehouseControlFilters>({});
  private paginationState = signal({ page: 1, limit: 20 });

  branches = signal<Branch[]>([]);
  warehouses = signal<Warehouse[]>([]);
  filteredWarehouses = signal<Warehouse[]>([]);
  loading = signal(false);

  searchControl = new FormControl('', { nonNullable: true });
  branchControl = new FormControl('', { nonNullable: true });
  warehouseControl = new FormControl('', { nonNullable: true });

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Cliente', prop: 'customer', sortable: false, canAutoResize: false, width: 180 },
      { name: 'CEDIS', prop: 'billing_branch', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Almacén', prop: 'warehouse', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Fecha entrega', prop: 'expected_delivery_date', sortable: false, canAutoResize: false, width: 130 },
      { name: 'Total', prop: 'total', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Pago', prop: 'payment_status', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Creada', prop: 'created_at', sortable: false, canAutoResize: false, width: 150 },
      { name: 'Creada por', prop: 'created_by_user', sortable: false, canAutoResize: false, width: 140 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: {
      title: 'Sin órdenes en selección',
      subtitle: 'No hay órdenes pendientes de corroboración',
    },
    columnMode: 'force',
    reorderable: false,
  });

  get hasActiveFilters(): boolean {
    return Boolean(
      this.searchControl.value.trim() ||
        this.branchControl.value ||
        this.warehouseControl.value
    );
  }

  constructor(
    private warehouseControlService: WarehouseControlService,
    private branchService: BranchService,
    private warehouseService: WarehouseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBranches();
    this.loadWarehouses();
    this.loadOrders();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.applyFilters());

    this.branchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((branchId) => {
      this.onBranchChange(branchId);
      this.applyFilters();
    });

    this.warehouseControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => this.branches.set(branches || []),
      error: () => this.branches.set([]),
    });
  }

  loadWarehouses(): void {
    this.warehouseService.getWarehouses({ limit: 500 }).subscribe({
      next: (res) => {
        const rows = Array.isArray(res) ? res : res?.data || [];
        this.warehouses.set(rows);
        this.applyWarehouseFilter(this.branchControl.value);
      },
      error: () => {
        this.warehouses.set([]);
        this.filteredWarehouses.set([]);
      },
    });
  }

  onBranchChange(branchId: string): void {
    this.applyWarehouseFilter(branchId);
    const currentWarehouse = this.warehouseControl.value;
    if (
      currentWarehouse &&
      !this.filteredWarehouses().some((w) => w.id === currentWarehouse)
    ) {
      this.warehouseControl.setValue('', { emitEvent: false });
    }
  }

  applyWarehouseFilter(branchId: string): void {
    const all = this.warehouses();
    if (!branchId) {
      this.filteredWarehouses.set(all);
      return;
    }
    this.filteredWarehouses.set(all.filter((w) => w.billing_branch_id === branchId));
  }

  applyFilters(): void {
    const filters: WarehouseControlFilters = {};
    const search = this.searchControl.value.trim();
    if (search) filters.search = search;
    if (this.branchControl.value) filters.billing_branch_id = this.branchControl.value;
    if (this.warehouseControl.value) filters.warehouse_id = this.warehouseControl.value;

    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: this.paginationState().limit });
    this.loadOrders();
  }

  clearFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.branchControl.setValue('', { emitEvent: false });
    this.warehouseControl.setValue('', { emitEvent: false });
    this.applyWarehouseFilter('');
    this.filtersState.set({});
    this.paginationState.set({ page: 1, limit: this.paginationState().limit });
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    this.table_config.update((c) => ({ ...c, loading: true }));

    this.warehouseControlService
      .list(this.filtersState(), this.paginationState())
      .subscribe({
        next: (response) => {
          const rows = response.data || [];
          const total = response.total || 0;
          this.table_config.update((c) => ({
            ...c,
            rows,
            page: response.page || this.paginationState().page,
            limit: response.limit || this.paginationState().limit,
            totalResults: total,
            hasNext: response.hasNext ?? response.page < response.totalPages,
            loading: false,
          }));
          this.loading.set(false);
        },
        error: () => {
          this.table_config.update((c) => ({ ...c, rows: [], totalResults: 0, loading: false }));
          this.loading.set(false);
        },
      });
  }

  onPageChange(event: IPaginationEvent): void {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadOrders();
  }

  openDetail(order: WarehouseControlOrder): void {
    this.dialog
      .open(WarehouseControlDetailPanelComponent, {
        width: '720px',
        maxWidth: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        position: { right: '0', top: '0' },
        panelClass: 'warehouse-control-side-panel',
        autoFocus: false,
        data: { orderId: order.id },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) this.loadOrders();
      });
  }

  customerName(order: WarehouseControlOrder): string {
    const c = order.customer;
    if (!c) return '—';
    if (c.display_name?.trim()) return c.display_name.trim();
    const company = c.company_name?.trim() || '';
    const person = [c.name, c.lastname].filter(Boolean).join(' ').trim();
    if (company && person) return `${company} - ${person}`;
    return company || person || '—';
  }

  branchLabel(order: WarehouseControlOrder): string {
    const b = order.billing_branch;
    if (!b) return '—';
    return b.display_name || b.code || '—';
  }

  warehouseLabel(order: WarehouseControlOrder): string {
    return order.warehouse?.name || '—';
  }

  createdByLabel(order: WarehouseControlOrder): string {
    const u = order.created_by_user;
    if (!u) return '—';
    const name = [u.first_name, u.last_name].filter(Boolean).join(' ').trim();
    return name || u.email || '—';
  }

  formatCurrency(value: number | string | null | undefined): string {
    const n = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(n)) return '—';
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);
  }

  formatDate(value?: string | null): string {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  formatDateTime(value?: string | null): string {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString('es-MX', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getStatusClass(): string {
    return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800';
  }
}
