import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { OrderFilters } from '../../models/filters.model';
import { OrderStatus, PaymentStatus } from '../../models/purchase-order.model';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { BranchService } from '../../../settings/services/branch.service';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { VendorService } from '../../../settings/services/vendor.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Branch } from '../../../settings/models/branch.model';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { Vendor } from '../../../settings/models/vendor.model';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FilterClearButtonComponent
  ],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent implements OnInit, OnChanges, OnDestroy {
  /** Sincroniza el campo búsqueda con la URL o el listado (p. ej. ?search=uuid tras editar). */
  @Input() initialSearch: string | null = null;
  @Input() refreshing = false;
  @Output() filtersChange = new EventEmitter<OrderFilters>();
  @Output() refresh = new EventEmitter<void>();

  searchControl = new FormControl<string>('', { nonNullable: true });
  dateRangeControl = new FormControl<string>('', { nonNullable: true });
  dateFromControl = new FormControl<string>('', { nonNullable: true });
  dateToControl = new FormControl<string>('', { nonNullable: true });
  statusControl = new FormControl<string>('', { nonNullable: true });
  paymentStatusControl = new FormControl<string>('', { nonNullable: true });
  vendorControl = new FormControl<string>('', { nonNullable: true });
  fiscalConfigurationControl = new FormControl<string>('', { nonNullable: true });
  billingBranchControl = new FormControl<string>('', { nonNullable: true });
  warehouseControl = new FormControl<string>('', { nonNullable: true });

  fiscalConfigurations: FiscalConfiguration[] = [];
  branches: Branch[] = [];
  warehouses: Warehouse[] = [];
  vendors: Vendor[] = [];

  dateRangeOptions = [
    { label: 'Hoy', value: 'today' },
    { label: 'Semana', value: 'week' },
    { label: 'Mes', value: 'month' },
    { label: 'Rango', value: 'range' }
  ];

  showCustomDateRange = false;

  statusOptions: { label: string; value: OrderStatus }[] = [
    { label: 'Creada', value: 'Creada' },
    { label: 'Recibida', value: 'Recibida' },
    { label: 'Cancelada', value: 'Cancelada' }
  ];

  paymentStatusOptions: { label: string; value: Extract<PaymentStatus, 'Pendiente' | 'Pagado'> }[] = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'Pagado', value: 'Pagado' }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fiscalConfigurationService: FiscalConfigurationService,
    private branchService: BranchService,
    private warehouseService: WarehouseService,
    private vendorService: VendorService,
    private cdr: ChangeDetectorRef
  ) {}

  get hasActiveFilters(): boolean {
    return Boolean(
      this.searchControl.value.trim() ||
      this.dateRangeControl.value ||
      this.dateFromControl.value ||
      this.dateToControl.value ||
      this.statusControl.value ||
      this.paymentStatusControl.value ||
      this.vendorControl.value ||
      this.fiscalConfigurationControl.value ||
      this.billingBranchControl.value ||
      this.warehouseControl.value
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['initialSearch']) {
      return;
    }
    const v = (this.initialSearch ?? '').trim();
    if (this.searchControl.value !== v) {
      this.searchControl.setValue(v, { emitEvent: false });
    }
  }

  ngOnInit(): void {
    this.loadFiscalConfigurations();
    this.loadAllBranches();
    this.loadAllWarehouses();
    this.loadVendors();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.dateRangeControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.onDateRangeChange(value));

    this.dateFromControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.dateToControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.statusControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.paymentStatusControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.vendorControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());

    this.fiscalConfigurationControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onFiscalConfigurationChange());

    this.billingBranchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onBillingBranchChange());

    this.warehouseControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.emitFilters());
  }

  fiscalOptionLabel(fc: FiscalConfiguration): string {
    const name = fc.razon_social?.trim() || 'Sin razón social';
    const rfc = fc.rfc?.trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  branchLabel(branch: Branch): string {
    return branch.code?.trim() || branch.display_name?.trim() || '—';
  }

  vendorLabel(vendor: Vendor): string {
    return vendor.company_name?.trim() || vendor.name?.trim() || vendor.razon_social?.trim() || '—';
  }

  onDateRangeChange(value: string): void {
    const today = new Date();
    let dateFrom: Date | null = null;
    let dateTo: Date | null = null;

    switch (value) {
      case 'today':
        dateFrom = new Date(today.setHours(0, 0, 0, 0));
        dateTo = new Date(today.setHours(23, 59, 59, 999));
        this.showCustomDateRange = false;
        break;
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        dateFrom = weekStart;
        dateTo = new Date();
        this.showCustomDateRange = false;
        break;
      case 'month':
        dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);
        dateTo = new Date();
        this.showCustomDateRange = false;
        break;
      case 'range':
        this.showCustomDateRange = true;
        return;
      default:
        this.showCustomDateRange = false;
        this.dateFromControl.setValue('', { emitEvent: false });
        this.dateToControl.setValue('', { emitEvent: false });
        this.emitFilters();
        break;
    }

    if (dateFrom && dateTo && !this.showCustomDateRange) {
      this.dateFromControl.setValue(this.formatDateForInput(dateFrom), { emitEvent: false });
      this.dateToControl.setValue(this.formatDateForInput(dateTo), { emitEvent: false });
      this.emitFilters();
    }
  }

  formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  clearFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.dateRangeControl.setValue('', { emitEvent: false });
    this.dateFromControl.setValue('', { emitEvent: false });
    this.dateToControl.setValue('', { emitEvent: false });
    this.statusControl.setValue('', { emitEvent: false });
    this.paymentStatusControl.setValue('', { emitEvent: false });
    this.vendorControl.setValue('', { emitEvent: false });
    this.fiscalConfigurationControl.setValue('', { emitEvent: false });
    this.billingBranchControl.setValue('', { emitEvent: false });
    this.warehouseControl.setValue('', { emitEvent: false });
    this.loadAllBranches();
    this.loadAllWarehouses();
    this.showCustomDateRange = false;
    this.emitFilters();
  }

  onRefresh(): void {
    if (this.refreshing) return;
    this.refresh.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onFiscalConfigurationChange(): void {
    const fiscalId = this.toQueryValue(this.fiscalConfigurationControl.value);
    this.billingBranchControl.setValue('', { emitEvent: false });
    this.warehouseControl.setValue('', { emitEvent: false });

    if (fiscalId) {
      this.loadBranches(fiscalId);
    } else {
      this.loadAllBranches();
    }
    this.loadAllWarehouses();

    this.emitFilters();
  }

  private onBillingBranchChange(): void {
    const branchId = this.toQueryValue(this.billingBranchControl.value);
    this.warehouseControl.setValue('', { emitEvent: false });

    if (branchId) {
      this.loadWarehouses(branchId);
    } else {
      this.loadAllWarehouses();
    }

    this.emitFilters();
  }

  private loadFiscalConfigurations(): void {
    this.fiscalConfigurationService
      .listFiscalConfigurations({ status: 'active', limit: 100 })
      .subscribe({
        next: (res) => {
          this.fiscalConfigurations = Array.isArray(res) ? res : (res.data ?? []);
          this.cdr.detectChanges();
        },
        error: () => {
          this.fiscalConfigurations = [];
          this.cdr.detectChanges();
        },
      });
  }

  private loadAllBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches = Array.isArray(branches) ? branches : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.branches = [];
        this.cdr.detectChanges();
      },
    });
  }

  private loadAllWarehouses(): void {
    this.warehouseService
      .getWarehouses({ status: 'active', limit: 100 })
      .subscribe({
        next: (res) => {
          this.warehouses = res.data ?? [];
          this.cdr.detectChanges();
        },
        error: () => {
          this.warehouses = [];
          this.cdr.detectChanges();
        },
      });
  }

  private loadVendors(): void {
    this.vendorService.getAllActiveVendors().subscribe({
      next: (vendors) => {
        this.vendors = vendors;
        this.cdr.detectChanges();
      },
      error: () => {
        this.vendors = [];
        this.cdr.detectChanges();
      },
    });
  }

  private loadBranches(fiscalConfigurationId: string): void {
    this.branchService.getBranches(fiscalConfigurationId).subscribe({
      next: (branches) => {
        this.branches = Array.isArray(branches) ? branches : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.branches = [];
        this.cdr.detectChanges();
      },
    });
  }

  private loadWarehouses(billingBranchId: string): void {
    this.warehouseService
      .getWarehouses({ billing_branch_id: billingBranchId, status: 'active', limit: 100 })
      .subscribe({
        next: (res) => {
          this.warehouses = res.data ?? [];
          this.cdr.detectChanges();
        },
        error: () => {
          this.warehouses = [];
          this.cdr.detectChanges();
        },
      });
  }

  private emitFilters(): void {
    const filters: OrderFilters = {};

    const search = this.toQueryValue(this.searchControl.value);
    if (search) {
      filters.search = search;
    }

    const dateFrom = this.toQueryValue(this.dateFromControl.value);
    if (dateFrom) {
      filters.dateFrom = dateFrom;
    }

    const dateTo = this.toQueryValue(this.dateToControl.value);
    if (dateTo) {
      filters.dateTo = dateTo;
    }

    const status = this.toQueryValue(this.statusControl.value);
    if (status) {
      filters.status = status as OrderStatus;
    }

    const paymentStatus = this.toQueryValue(this.paymentStatusControl.value);
    if (paymentStatus) {
      filters.paymentStatus = paymentStatus;
    }

    const vendorId = this.toQueryValue(this.vendorControl.value);
    if (vendorId) {
      filters.vendorId = vendorId;
    }

    const fiscalConfigurationId = this.toQueryValue(this.fiscalConfigurationControl.value);
    if (fiscalConfigurationId) {
      filters.fiscal_configuration_id = fiscalConfigurationId;
    }

    const billingBranchId = this.toQueryValue(this.billingBranchControl.value);
    if (billingBranchId) {
      filters.billing_branch_id = billingBranchId;
    }

    const warehouseId = this.toQueryValue(this.warehouseControl.value);
    if (warehouseId) {
      filters.warehouseId = warehouseId;
    }

    this.filtersChange.emit(filters);
  }

  private toQueryValue(value: string | null | undefined): string | undefined {
    const trimmed = (value ?? '').trim();
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') {
      return undefined;
    }
    return trimmed;
  }
}
