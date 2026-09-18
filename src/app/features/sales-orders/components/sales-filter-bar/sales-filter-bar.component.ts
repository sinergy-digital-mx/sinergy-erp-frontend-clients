import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { SalesOrderFilters, SalesOrderStatus, SalesPaymentStatus, SalesOrderCollectionChannel, SalesOrderSaleScope, PosUserSummary } from '../../models/sales-order.model';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import { MoreFiltersPanelComponent } from '../../../../core/components/more-filters-panel/more-filters-panel.component';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { BranchService } from '../../../settings/services/branch.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Branch } from '../../../settings/models/branch.model';
import { formatPosUser } from '../../utils/pos-user-display.util';

@Component({
  selector: 'app-sales-filter-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilterClearButtonComponent, MoreFiltersPanelComponent],
  templateUrl: './sales-filter-bar.component.html',
  styleUrl: './sales-filter-bar.component.scss'
})
export class SalesFilterBarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() refreshing = false;
  /** `quotation` oculta pago/crédito y usa estados de cotización. */
  @Input() mode: 'sales' | 'quotation' = 'sales';
  @Input() showSellerFilter = false;
  @Input() sellers: PosUserSummary[] = [];
  /** `null` = todas. Array = solo esas sucursales (cotizaciones sin ViewAllBranches). */
  @Input() restrictBranchIds: string[] | null = null;
  @Output() filtersChange = new EventEmitter<SalesOrderFilters>();
  @Output() refresh = new EventEmitter<void>();

  searchControl = new FormControl<string>('', { nonNullable: true });
  dateRangeControl = new FormControl<string>('', { nonNullable: true });
  dateFromControl = new FormControl<string>('', { nonNullable: true });
  dateToControl = new FormControl<string>('', { nonNullable: true });
  statusControl = new FormControl<string | null>(null);
  paymentStatusControl = new FormControl<string>('', { nonNullable: true });
  collectionChannelControl = new FormControl<string>('', { nonNullable: true });
  fiscalConfigurationControl = new FormControl<string>('', { nonNullable: true });
  billingBranchControl = new FormControl<string>('', { nonNullable: true });
  creditControl = new FormControl<string>('', { nonNullable: true });
  saleScopeControl = new FormControl<string>('', { nonNullable: true });

  @ViewChild(MoreFiltersPanelComponent) moreFilters?: MoreFiltersPanelComponent;

  fiscalConfigurations: FiscalConfiguration[] = [];
  branches: Branch[] = [];
  private allLoadedBranches: Branch[] = [];

  dateRangeOptions = [
    { label: 'Hoy', value: 'today' },
    { label: 'Semana', value: 'week' },
    { label: 'Mes', value: 'month' },
    { label: 'Rango', value: 'range' }
  ];

  showCustomDateRange = false;

  statusOptions: { label: string; value: string }[] = [
    { label: 'Creada', value: 'Creada' },
    { label: 'En Selección', value: 'En Selección' },
    { label: 'Lista para entrega', value: 'Lista para entrega' },
    { label: 'Surtida', value: 'Surtida' },
    { label: 'En Camino', value: 'En Camino' },
    { label: 'Cancelada', value: 'Cancelada' }
  ];

  quotationStatusOptions: { label: string; value: string }[] = [
    { label: 'Creada', value: 'Creada' },
    { label: 'Convertida', value: 'Convertida' },
    { label: 'Cancelada', value: 'Cancelada' },
  ];

  typeOptions = [
    { label: 'POS', value: 'POS' },
    { label: 'Manual', value: 'MANUAL' },
  ];

  typeControl = new FormControl<string>('', { nonNullable: true });
  sellerControl = new FormControl<string>('', { nonNullable: true });

  saleScopeOptions: { label: string; value: SalesOrderSaleScope }[] = [
    { label: 'Inventario', value: 'inventory' },
    { label: 'Servicios', value: 'services' },
    { label: 'Productos y servicios', value: 'combined' },
  ];

  paymentStatusOptions: { label: string; value: SalesPaymentStatus }[] = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'Pagado', value: 'Pagado' },
  ];

  collectionChannelOptions: { label: string; value: SalesOrderCollectionChannel }[] = [
    { label: 'POS Caja', value: 'pos_cobranza' },
    { label: 'Cobrada manual', value: 'manual' },
    { label: 'POS Caja + Manual', value: 'mixed' },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fiscalConfigurationService: FiscalConfigurationService,
    private branchService: BranchService,
    private cdr: ChangeDetectorRef
  ) {}

  get hasActiveFilters(): boolean {
    return Boolean(
      this.searchControl.value.trim() ||
      this.fiscalConfigurationControl.value ||
      this.billingBranchControl.value ||
      this.extraFilterCount
    );
  }

  get extraFilterCount(): number {
    let count = 0;
    if (this.dateRangeControl.value || this.dateFromControl.value || this.dateToControl.value) count += 1;
    if (this.statusControl.value) count += 1;
    if (this.paymentStatusControl.value) count += 1;
    if (this.collectionChannelControl.value) count += 1;
    if (this.creditControl.value) count += 1;
    if (this.typeControl.value) count += 1;
    if (this.saleScopeControl.value) count += 1;
    if (this.sellerControl.value) count += 1;
    return count;
  }

  ngOnInit(): void {
    this.loadFiscalConfigurations();
    this.loadAllBranches();

    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.dateRangeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => this.onDateRangeChange(v));
    this.dateFromControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.dateToControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.statusControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.paymentStatusControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.collectionChannelControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.fiscalConfigurationControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.onFiscalConfigurationChange());
    this.billingBranchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.creditControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.typeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.saleScopeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.sellerControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['restrictBranchIds'] && !changes['restrictBranchIds'].firstChange) {
      this.applyBranchRestriction();
    }
  }

  get allBranchesOptionLabel(): string {
    return this.restrictBranchIds ? 'Tus sucursales' : 'Todas las sucursales';
  }

  fiscalOptionLabel(fc: FiscalConfiguration): string {
    const name = fc.razon_social?.trim() || 'Sin razón social';
    const rfc = fc.rfc?.trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  branchLabel(branch: Branch): string {
    return branch.code?.trim() || branch.display_name?.trim() || '—';
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

    if (dateFrom && dateTo) {
      this.dateFromControl.setValue(this.fmt(dateFrom), { emitEvent: false });
      this.dateToControl.setValue(this.fmt(dateTo), { emitEvent: false });
      this.emitFilters();
    }
  }

  fmt(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  clearFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.dateRangeControl.setValue('', { emitEvent: false });
    this.dateFromControl.setValue('', { emitEvent: false });
    this.dateToControl.setValue('', { emitEvent: false });
    this.statusControl.setValue(null, { emitEvent: false });
    this.paymentStatusControl.setValue('', { emitEvent: false });
    this.collectionChannelControl.setValue('', { emitEvent: false });
    this.fiscalConfigurationControl.setValue('', { emitEvent: false });
    this.billingBranchControl.setValue('', { emitEvent: false });
    this.creditControl.setValue('', { emitEvent: false });
    this.typeControl.setValue('', { emitEvent: false });
    this.saleScopeControl.setValue('', { emitEvent: false });
    this.sellerControl.setValue('', { emitEvent: false });
    this.branches = [];
    this.allLoadedBranches = [];
    this.showCustomDateRange = false;
    this.loadAllBranches();
    this.moreFilters?.close();
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
    const fiscalId = this.fiscalConfigurationControl.value || undefined;
    this.billingBranchControl.setValue('', { emitEvent: false });

    if (fiscalId) {
      this.loadBranches(fiscalId);
    } else {
      this.loadAllBranches();
    }

    this.emitFilters();
  }

  private loadAllBranches(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.setLoadedBranches(Array.isArray(branches) ? branches : []);
      },
      error: () => {
        this.setLoadedBranches([]);
      },
    });
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

  private loadBranches(fiscalConfigurationId: string): void {
    this.branchService.getBranches(fiscalConfigurationId).subscribe({
      next: (branches) => {
        this.setLoadedBranches(Array.isArray(branches) ? branches : []);
      },
      error: () => {
        this.setLoadedBranches([]);
      },
    });
  }

  private setLoadedBranches(branches: Branch[]): void {
    this.allLoadedBranches = branches;
    this.applyBranchRestriction();
  }

  private applyBranchRestriction(): void {
    const allowed = this.restrictBranchIds;
    this.branches = allowed
      ? this.allLoadedBranches.filter((branch) => allowed.includes(branch.id))
      : this.allLoadedBranches;
    const selected = this.billingBranchControl.value;
    if (selected && this.branches.every((branch) => branch.id !== selected)) {
      this.billingBranchControl.setValue('', { emitEvent: false });
    }
    this.cdr.detectChanges();
  }

  private emitFilters(): void {
    const filters: SalesOrderFilters = {};
    const search = this.searchControl.value.trim();
    if (search) filters.search = search;
    const dateFrom = this.dateFromControl.value;
    if (dateFrom) filters.dateFrom = new Date(dateFrom).toISOString();
    const dateTo = this.dateToControl.value;
    if (dateTo) filters.dateTo = new Date(dateTo).toISOString();
    const status = this.statusControl.value;
    if (status) filters.status = status as SalesOrderStatus;
    const paymentStatus = this.paymentStatusControl.value;
    if (paymentStatus === 'Pendiente' || paymentStatus === 'Pagado') {
      filters.payment_status = paymentStatus;
    }
    const collectionChannel = this.collectionChannelControl.value;
    if (
      collectionChannel === 'pos_cobranza' ||
      collectionChannel === 'manual' ||
      collectionChannel === 'mixed'
    ) {
      filters.collection_channel = collectionChannel;
    }
    const fiscalConfigurationId = this.fiscalConfigurationControl.value;
    if (fiscalConfigurationId) filters.fiscal_configuration_id = fiscalConfigurationId;
    const billingBranchId = this.billingBranchControl.value;
    if (billingBranchId) filters.billing_branch_id = billingBranchId;
    if (this.creditControl.value === 'true') filters.is_credit = true;
    const type = this.typeControl.value;
    if (type === 'POS' || type === 'MANUAL') {
      filters.sales_order_type = type;
    }
    const saleScope = this.saleScopeControl.value;
    if (saleScope === 'inventory' || saleScope === 'services' || saleScope === 'combined') {
      filters.sale_scope = saleScope;
    }
    const sellerId = this.sellerControl.value;
    if (sellerId) filters.assigned_seller_user_id = sellerId;
    this.filtersChange.emit(filters);
  }

  sellerOptionLabel(seller: PosUserSummary): string {
    return formatPosUser(seller);
  }
}
