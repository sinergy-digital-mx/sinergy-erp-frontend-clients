import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerEditModalComponent } from '../../../customers/components/customer-edit-modal/customer-edit-modal.component';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SalesOrderService } from '../../services/sales-order.service';
import { QuotationService } from '../../../quotations/services/quotation.service';
import { ProductService } from '../../../settings/services/product.service';
import { SalesOrderSaleScope } from '../../models/sales-order.model';
import { UoMCatalog } from '../../../settings/models/product.model';
import { CustomerService } from '../../../../core/services/customer.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { BranchService } from '../../../settings/services/branch.service';
import { Branch } from '../../../settings/models/branch.model';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { isFiscalFlagOn } from '../../../settings/utils/fiscal-tax-flags.util';
import { ExchangeRateService } from '../../../../core/services/exchange-rate.service';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';

interface LineItem {
  product_id: string;
  product_uom_id: string;
  product_name?: string;
  product_sku?: string;
  description?: string;
  item_kind?: 'goods' | 'service';
  available_quantity?: number;
  warehouse_names?: string[];
  uom_name?: string;
  uoms?: any[];
  pricing_options?: any[];
  selected_pricing_option_id?: string;
  product_discount_id?: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  iva_percentage: number;
  ieps_percentage: number;
  notes?: string;
}

@Component({
  selector: 'app-create-sales-order-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, TabComponent],
  templateUrl: './create-sales-order-modal.component.html',
  styleUrl: './create-sales-order-modal.component.scss'
})
export class CreateSalesOrderModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading = false;
  saving = false;
  lineItems: LineItem[] = [];
  products: any[] = [];
  loadingProducts = false;

  customers: any[] = [];
  filteredCustomers: any[] = [];
  fiscalConfigurations: any[] = [];
  branches: Branch[] = [];
  tabs: TabItem[] = [
    { id: 'info', title: 'Información' },
    { id: 'products', title: 'Productos', disabled: true }
  ];
  activeTab = 'info';
  productSearchTerm = '';
  selectedProduct: any = null;
  customerPriceListIds: string[] = [];
  customerDefaultPriceListId = '';
  readonly ivaPresets = [0, 8, 16];

  @ViewChild('productSearchInput') productSearchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('productSearchTrigger') productSearchTrigger?: MatAutocompleteTrigger;
  @ViewChild('linesEnd') linesEnd?: ElementRef<HTMLElement>;
  refreshingProductUoms = false;
  createServiceModalOpen = false;
  savingService = false;
  uomCatalog: UoMCatalog[] = [];
  newService = {
    name: '',
    description: '',
    sku: '',
    sat_clave: '',
    base_uom_catalog_id: '',
    unit_price: 0,
    iva_percentage: 16,
  };

  private destroy$ = new Subject<void>();
  dailyExchangeRate: number | null = null;
  private productSearch$ = new Subject<string>();
  private productsSub?: Subscription;
  private customerPriceListSub?: Subscription;
  private customerPriceListRequest = 0;
  private hydrating = false;
  private editingWarehouseId: string | null = null;
  private editingSellerUserId: string | null = null;
  private editingGlobalDiscountId: string | null = null;
  private editingQuotationType: 'POS' | 'MANUAL' | null = null;
  editingFolio: string | null = null;

  get asQuotation(): boolean {
    return this.data?.asQuotation === true;
  }

  get quotationId(): string | null {
    const id = this.data?.quotationId;
    return typeof id === 'string' && id.trim() ? id.trim() : null;
  }

  get isEditingQuotation(): boolean {
    return this.asQuotation && !!this.quotationId;
  }

  get lockLocation(): boolean {
    return this.isEditingQuotation && this.editingQuotationType === 'POS';
  }

  constructor(
    private fb: FormBuilder,
    private salesOrderService: SalesOrderService,
    private quotationService: QuotationService,
    private fiscalConfigService: FiscalConfigurationService,
    private branchService: BranchService,
    private customerService: CustomerService,
    private productService: ProductService,
    private dialog: MatDialog,
    private toast: ToastService,
    private auth: AuthService,
    private exchangeRateService: ExchangeRateService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CreateSalesOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      fiscal_configuration_id: ['', Validators.required],
      billing_branch_id: [{ value: '', disabled: true }, Validators.required],
      customer_search: [''],
      customer_id: ['', Validators.required],
      expected_delivery_date: ['', Validators.required],
      sale_scope: ['inventory' as SalesOrderSaleScope, Validators.required],
      currency: ['MXN' as 'MXN' | 'USD', Validators.required],
      requires_selection_assembly: [false],
      for_shipping: [false],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.setupLocationCascade();
    this.productSearch$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => this.loadProducts(term));
    this.form.get('sale_scope')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((scope: SalesOrderSaleScope) => {
        if (!this.hydrating) {
          this.lineItems = [];
          this.resetAddProductForm();
        }
        this.tabs = this.tabs.map((tab) =>
          tab.id === 'products'
            ? { ...tab, title: scope === 'services' ? 'Servicios' : 'Productos' }
            : tab
        );
        if (scope === 'services') {
          this.form.patchValue({ requires_selection_assembly: false }, { emitEvent: false });
        }
        if (this.hasBillingBranch && !this.hydrating) {
          this.loadProducts();
        }
        this.cdr.detectChanges();
      });
    this.form.get('customer_search')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
      if (typeof value === 'string') {
        const hadCustomer = !!this.form.get('customer_id')?.value;
        this.form.patchValue({ customer_id: '' }, { emitEvent: false });
        if (hadCustomer) {
          this.clearCustomerPriceLists();
        }
      }
      this.filterCustomers(value ?? '');
    });
    if (!this.asQuotation) {
      this.exchangeRateService.getDailyExchangeRate().subscribe({
        next: (rate) => {
          const value = Number(rate?.exchange_rate);
          this.dailyExchangeRate = value > 0 ? value : null;
          this.cdr.detectChanges();
        },
        error: () => {
          this.dailyExchangeRate = null;
        },
      });
    }
    void this.initForm();
  }

  get orderCurrency(): 'MXN' | 'USD' {
    return this.form.get('currency')?.value === 'USD' ? 'USD' : 'MXN';
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
    this.customerPriceListSub?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  get hasBillingBranch(): boolean {
    return !!this.form.get('billing_branch_id')?.value;
  }

  get saleScope(): SalesOrderSaleScope {
    return (this.form.get('sale_scope')?.value as SalesOrderSaleScope) || 'inventory';
  }

  get showAssemblyCheckbox(): boolean {
    return !this.asQuotation && this.saleScope !== 'services';
  }

  get canCreateServiceInline(): boolean {
    return this.saleScope === 'services' || this.saleScope === 'combined';
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
    if (tabId === 'products') {
      this.focusProductSearch();
    }
  }

  get capturePlaceholder(): string {
    return this.saleScope === 'services'
      ? 'Código, SKU o nombre del servicio'
      : 'Código, SKU o nombre';
  }

  get productSearchText(): string {
    return typeof this.productSearchTerm === 'string' ? this.productSearchTerm.trim() : '';
  }

  branchLabel(branch: Branch): string {
    return branch.code?.trim() || branch.display_name?.trim() || '—';
  }

  loadDropdownData(): Promise<void> {
    this.loading = true;

    return Promise.all([
      this.fiscalConfigService.listFiscalConfigurations({ status: 'active', limit: 100 }).toPromise(),
      this.customerService.getCustomers({ limit: 100 }).toPromise()
    ]).then(([fiscalConfigs, customers]) => {
      this.fiscalConfigurations = (fiscalConfigs as any)?.data || [];
      const customerRows = (customers as any)?.data || [];
      this.customers = customerRows.map((customer: any) => ({
        ...customer,
        display_name: this.formatCustomerLabel(customer)
      }));
      this.filteredCustomers = [...this.customers];
      this.prefillCustomerIfProvided();
      if (!this.isEditingQuotation) {
        this.prefillFiscalAndBranch();
      }
      this.loading = false;
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('Error loading dropdown data:', error);
      this.toast.error('Error al cargar datos');
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private async initForm(): Promise<void> {
    await this.loadDropdownData();
    if (this.isEditingQuotation) {
      await this.hydrateQuotation();
    }
  }

  private hydrateQuotation(): Promise<void> {
    const id = this.quotationId;
    if (!id) {
      return Promise.resolve();
    }

    this.loading = true;
    this.hydrating = true;

    return new Promise((resolve) => {
      this.quotationService.getDetail(id).subscribe({
        next: (payload) => {
          const header = payload.header;
          this.editingFolio = header.folio || null;
          this.editingQuotationType = header.quotation_type === 'POS' ? 'POS' : 'MANUAL';
          this.editingWarehouseId = header.warehouse_id ?? null;
          this.editingSellerUserId = header.seller_user_id ?? header.seller_user?.id ?? null;
          this.editingGlobalDiscountId = header.global_discount_id ?? null;

          const fiscalId =
            header.fiscal_configuration_id || header.fiscal_configuration?.id || '';
          const branchId = header.billing_branch_id || header.billing_branch?.id || '';
          const customerId = header.customer_id ?? header.customer?.id ?? '';
          const customerLabel =
            header.customer_display_name ||
            this.formatCustomerLabel(header.customer) ||
            this.formatCustomerLabel(header.customer_summary);

          this.form.patchValue(
            {
              fiscal_configuration_id: fiscalId,
              expected_delivery_date: this.toDateInput(header.expected_delivery_date),
              notes: header.notes || '',
              customer_id: customerId,
              customer_search: customerLabel,
            },
            { emitEvent: false },
          );
          if (customerId) {
            this.loadCustomerPriceLists(customerId, false);
          }
          this.form.get('sale_scope')?.disable({ emitEvent: false });

          this.lineItems = (payload.line_items || []).map((item) => ({
            product_id: item.product_id,
            product_uom_id: item.product_uom_id,
            product_name: item.product?.name || 'Producto',
            product_sku: item.product?.sku || '',
            item_kind: item.product?.item_kind === 'service' ? 'service' : 'goods',
            uom_name: item.uom_name || '',
            product_discount_id: item.product_discount_id || item.applied_product_discount?.id,
            quantity: Number(item.quantity || 0),
            unit_price: Number(item.unit_price || 0),
            discount_percentage: Number(item.discount_percentage || 0),
            iva_percentage: Number(item.iva_percentage || 0),
            ieps_percentage: Number(item.ieps_percentage || 0),
            notes: '',
          }));

          if (fiscalId) {
            this.form.get('billing_branch_id')?.enable({ emitEvent: false });
            this.loadBranches(fiscalId, () => {
              this.form.patchValue({ billing_branch_id: branchId }, { emitEvent: false });
              if (this.lockLocation) {
                this.form.get('fiscal_configuration_id')?.disable({ emitEvent: false });
                this.form.get('billing_branch_id')?.disable({ emitEvent: false });
              }
              this.setProductsTabEnabled(!!branchId);
              this.loadProducts();
              this.hydrating = false;
              this.loading = false;
              this.cdr.detectChanges();
              resolve();
            });
            return;
          }

          this.hydrating = false;
          this.loading = false;
          this.cdr.detectChanges();
          resolve();
        },
        error: () => {
          this.hydrating = false;
          this.loading = false;
          this.toast.error('No se pudo cargar la cotización');
          this.cdr.detectChanges();
          resolve();
        },
      });
    });
  }

  private toDateInput(value?: string | null): string {
    if (!value) return '';
    const raw = String(value);
    if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
      return raw.slice(0, 10);
    }
    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private setupLocationCascade(): void {
    this.form.get('fiscal_configuration_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fiscalId) => {
        if (this.hydrating) {
          return;
        }
        this.form.patchValue({ billing_branch_id: '' }, { emitEvent: false });
        this.branches = [];
        this.form.get('billing_branch_id')?.disable({ emitEvent: false });
        this.resetProductsState();

        if (fiscalId) {
          this.loadBranches(fiscalId);
          this.form.get('billing_branch_id')?.enable({ emitEvent: false });
        }
        this.clampLineTaxes();
        this.cdr.detectChanges();
      });

    this.form.get('billing_branch_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((branchId) => {
        if (this.hydrating) {
          return;
        }
        this.resetProductsState();
        if (branchId) {
          this.setProductsTabEnabled(true);
          this.loadProducts();
        }
        this.cdr.detectChanges();
      });
  }

  private loadBranches(fiscalConfigurationId: string, then?: () => void): void {
    this.branchService.getBranches(fiscalConfigurationId).subscribe({
      next: (branches) => {
        this.branches = Array.isArray(branches) ? branches : [];
        const current = this.form.get('billing_branch_id')?.value;
        if (!current && !this.hydrating) {
          const preferred = this.auth.getBillingBranchId();
          const match = this.branches.find((branch) => branch.id === preferred);
          const pick = match || (this.branches.length === 1 ? this.branches[0] : null);
          if (pick) {
            this.form.get('billing_branch_id')?.enable({ emitEvent: false });
            this.form.patchValue({ billing_branch_id: pick.id });
          }
        }
        then?.();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading branches:', error);
        this.toast.error('Error al cargar sucursales');
        this.branches = [];
        this.cdr.detectChanges();
      }
    });
  }

  private resetProductsState(): void {
    this.productsSub?.unsubscribe();
    this.products = [];
    this.lineItems = [];
    this.loadingProducts = false;
    this.resetAddProductForm();
    this.setProductsTabEnabled(false);
  }

  private setProductsTabEnabled(enabled: boolean): void {
    this.tabs = this.tabs.map((tab) =>
      tab.id === 'products' ? { ...tab, disabled: !enabled } : tab
    );
    if (!enabled && this.activeTab === 'products') {
      this.activeTab = 'info';
    }
  }

  onCustomerSelected(customer: any): void {
    if (!customer) return;
    this.form.patchValue({
      customer_id: customer.id,
      customer_search: customer.display_name
    }, { emitEvent: false });
    this.loadCustomerPriceLists(customer.id, true);
  }

  openCreateCustomerModal(): void {
    const dialogRef = this.dialog.open(CustomerEditModalComponent, {
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'customer-edit-dialog',
      autoFocus: 'first-tabbable',
      data: { customer: null }
    });

    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.reloadCustomers();
      }
    });
  }

  private reloadCustomers(): void {
    this.customerService.getCustomers({ limit: 100 }).subscribe({
      next: (customers) => {
        const customerRows = (customers as any)?.data || [];
        this.customers = customerRows.map((customer: any) => ({
          ...customer,
          display_name: this.formatCustomerLabel(customer)
        }));
        const search = this.form.get('customer_search')?.value ?? '';
        this.filterCustomers(search);
        this.cdr.detectChanges();
      },
      error: () => {
        this.toast.error('No se pudieron actualizar los clientes');
      }
    });
  }

  displayCustomer(customer: any): string {
    if (!customer) return '';
    if (typeof customer === 'string') return customer;
    return customer?.display_name || this.formatCustomerLabel(customer) || '';
  }

  private filterCustomers(search: string): void {
    const raw =
      typeof search === 'string'
        ? search
        : (search as any)?.display_name || this.formatCustomerLabel(search);
    const term = String(raw || '').toLowerCase().trim();
    if (!term) {
      this.filteredCustomers = [...this.customers];
      return;
    }
    this.filteredCustomers = this.customers.filter((customer) =>
      String(customer.display_name || '').toLowerCase().includes(term)
    );
  }

  private prefillFiscalAndBranch(): void {
    if (this.form.get('fiscal_configuration_id')?.value) {
      return;
    }
    const activeFiscal = this.auth.getFiscalConfigurationId();
    const match = this.fiscalConfigurations.find((row) => row.id === activeFiscal);
    const pick = match || (this.fiscalConfigurations.length === 1 ? this.fiscalConfigurations[0] : null);
    if (pick?.id) {
      this.form.patchValue({ fiscal_configuration_id: pick.id });
    }
  }

  private prefillCustomerIfProvided(): void {
    const customerId = this.data?.customerId;
    if (customerId == null || customerId === '') return;

    const customer = this.customers.find(
      (c) => String(c.id) === String(customerId)
    );
    if (customer) {
      this.onCustomerSelected(customer);
    }
  }

  private formatCustomerLabel(customer: any): string {
    if (!customer) return '';
    const fullName = `${customer.name || ''} ${customer.lastname || ''}`.trim();
    const company = (customer.company_name || '').trim();
    if (fullName && company) return `${fullName} - ${company}`;
    if (fullName) return fullName;
    if (company) return company;
    return customer.email || `Cliente ${customer.id}`;
  }

  loadProducts(search = ''): void {
    const fiscalId = this.form.get('fiscal_configuration_id')?.value;
    const branchId = this.form.get('billing_branch_id')?.value;
    if (!fiscalId || !branchId) {
      this.products = [];
      return;
    }

    this.productsSub?.unsubscribe();
    this.loadingProducts = true;
    const request = this.asQuotation
      ? this.quotationService.getProductsSummary({
          fiscal_configuration_id: fiscalId,
          billing_branch_id: branchId,
          search: search.trim() || undefined,
          limit: 100,
          sale_scope: this.saleScope,
        })
      : this.salesOrderService.getProductsSummary({
          fiscal_configuration_id: fiscalId,
          billing_branch_id: branchId,
          search: search.trim() || undefined,
          limit: 100,
          sale_scope: this.saleScope,
        });
    this.productsSub = request.subscribe({
      next: (res: any) => {
        this.products = this.normalizeWarehouseProducts(res);
        this.loadingProducts = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.products = [];
        this.loadingProducts = false;
        this.cdr.detectChanges();
      }
    });
  }

  private normalizeWarehouseProducts(res: any): any[] {
    const rows = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.items)
          ? res.items
          : [];

    return rows.map((row: any) => {
      const productId = row.product_id || row.id;
      const name = row.product_name || row.name || 'Producto';
      const sku = row.product_sku || row.sku || '';
      const available = this.getAvailableQty(row);
      const warehouseNames = Array.isArray(row.warehouse_names) ? row.warehouse_names : [];
      const uoms = this.normalizeUoms(row);

      return {
        ...row,
        product_id: productId,
        id: productId,
        product_name: name,
        name,
        product_sku: sku,
        sku,
        description: row.product_description || row.description || '',
        available_quantity: available,
        warehouse_names: warehouseNames,
        item_kind: row.item_kind === 'service' ? 'service' : 'goods',
        uoms
      };
    });
  }

  private normalizeUoms(product: any): any[] {
    const rows = Array.isArray(product?.uoms) ? product.uoms : [];
    if (rows.length > 0) {
      return rows.map((u: any) => ({
        ...u,
        id: u.id || u.product_uom_id || u.uom_id,
        product_uom_id: u.product_uom_id || u.id || u.uom_id,
        uom_id: u.uom_id || u.id,
        name: u.name || u.uom_name || 'UOM',
        uom_name: u.uom_name || u.name || 'UOM',
        cost: Number(u.suggested_unit_price ?? u.cost ?? u.unit_price ?? 0),
        iva_percentage: Number(u.suggested_iva_percentage ?? u.iva_percentage ?? 16),
        ieps_percentage: Number(u.suggested_ieps_percentage ?? u.ieps_percentage ?? 0),
        pricing_options: Array.isArray(u.pricing_options) ? u.pricing_options : []
      }));
    }

    const fallbackId = product.product_uom_id || product.uom_id || '';
    if (!fallbackId) return [];
    return [{
      id: fallbackId,
      product_uom_id: fallbackId,
      uom_id: product.uom_id || fallbackId,
      name: product.uom_name || 'UOM',
      uom_name: product.uom_name || 'UOM',
      cost: Number(product.suggested_unit_price ?? product.cost ?? product.unit_price ?? 0),
      iva_percentage: Number(product.suggested_iva_percentage ?? product.iva_percentage ?? 16),
      ieps_percentage: Number(product.suggested_ieps_percentage ?? product.ieps_percentage ?? 0),
      pricing_options: Array.isArray(product.pricing_options) ? product.pricing_options : []
    }];
  }

  onProductSearchChange(value: unknown): void {
    if (typeof value !== 'string') {
      this.productSearchTerm = '';
      return;
    }
    this.productSearchTerm = value;
    this.productSearch$.next(value);
  }

  onProductPicked(event: MatAutocompleteSelectedEvent): void {
    this.addLineFromProduct(event.option?.value);
    this.clearProductSearch();
  }

  get showIva(): boolean {
    const fiscalId = this.form?.get('fiscal_configuration_id')?.value;
    const fiscal = this.fiscalConfigurations.find((row) => row.id === fiscalId);
    return isFiscalFlagOn(fiscal?.iva_enabled, true);
  }

  get showIeps(): boolean {
    const fiscalId = this.form?.get('fiscal_configuration_id')?.value;
    const fiscal = this.fiscalConfigurations.find((row) => row.id === fiscalId);
    return isFiscalFlagOn(fiscal?.ieps_enabled, true);
  }

  private clampLineTaxes(): void {
    if (this.showIva && this.showIeps) return;
    for (const item of this.lineItems) {
      if (!this.showIva) item.iva_percentage = 0;
      if (!this.showIeps) item.ieps_percentage = 0;
    }
  }

  get filteredProductsForModal(): any[] {
    return this.products;
  }

  get selectedProductUoms(): any[] {
    if (!this.selectedProduct) return [];
    return this.selectedProduct?.uoms || [];
  }

  get missingProductUom(): boolean {
    return !!this.selectedProduct && this.selectedProductUoms.length === 0;
  }

  openProductUomEditor(): void {
    const productId = this.selectedProduct?.product_id || this.selectedProduct?.id;
    if (!productId) return;

    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      ...PRODUCT_DETAIL_DIALOG_CONFIG,
      data: {
        product: {
          id: productId,
          name: this.selectedProduct?.product_name || this.selectedProduct?.name,
          sku: this.selectedProduct?.product_sku || this.selectedProduct?.sku,
        },
        isNew: false,
        initialTab: 'uoms',
        iepsEnabled: this.showIeps,
      },
    });

    dialogRef.afterClosed().subscribe(() => this.reloadSelectedProductUoms(productId));
  }

  private reloadSelectedProductUoms(productId: string): void {
    const currentId = this.selectedProduct?.product_id || this.selectedProduct?.id;
    if (currentId !== productId) return;

    this.refreshingProductUoms = true;
    this.productService.getAssignedUoMs(productId).subscribe({
      next: (rows) => {
        if ((this.selectedProduct?.product_id || this.selectedProduct?.id) !== productId) {
          this.refreshingProductUoms = false;
          return;
        }
        const uoms = this.mapAssignedUoms(rows);
        const product = { ...(this.selectedProduct || {}), uoms };
        this.products = this.products.map((row) =>
          (row.product_id || row.id) === productId ? { ...row, uoms } : row
        );
        this.refreshingProductUoms = false;
        if (uoms.length) {
          this.selectedProduct = null;
          this.addLineFromProduct(product);
          this.clearProductSearch();
        } else {
          this.selectedProduct = product;
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.refreshingProductUoms = false;
        this.toast.error('No se pudieron cargar las unidades del producto');
        this.cdr.detectChanges();
      },
    });
  }

  private mapAssignedUoms(rows: any[]): any[] {
    return (Array.isArray(rows) ? rows : [])
      .map((uom) => ({
        id: uom.id,
        product_uom_id: uom.id,
        uom_id: uom.uom_catalog_id || uom.uom?.id || '',
        name: uom.uom?.name || uom.name || 'Unidad',
        uom_name: uom.uom?.name || uom.uom_name || uom.name || 'Unidad',
        cost: Number(uom.cost ?? uom.suggested_unit_price ?? 0),
        iva_percentage: Number(uom.iva_percentage ?? uom.suggested_iva_percentage ?? (this.showIva ? 16 : 0)),
        ieps_percentage: Number(uom.ieps_percentage ?? uom.suggested_ieps_percentage ?? 0),
      }))
      .filter((uom) => !!uom.id);
  }

  private addLineFromProduct(product: any): void {
    if (!product || typeof product !== 'object') return;
    const uoms = Array.isArray(product.uoms) ? product.uoms : [];
    if (!uoms.length) {
      this.selectedProduct = product;
      return;
    }

    const available = this.getAvailableQty(product);
    const isService = this.isServiceProduct(product);
    if (!isService && !this.asQuotation && available <= 0) {
      this.selectedProduct = null;
      this.toast.warning('Este producto no tiene stock disponible en la sucursal');
      return;
    }

    const uom = uoms[0];
    const item: LineItem = {
      product_id: product.product_id || product.id,
      product_uom_id: uom.id || uom.product_uom_id || uom.uom_id || '',
      product_name: product.product_name || product.name || '',
      product_sku: product.product_sku || product.sku || '',
      description: product.description || product.product_description || '',
      item_kind: isService ? 'service' : 'goods',
      available_quantity: isService ? undefined : available,
      warehouse_names: Array.isArray(product.warehouse_names) ? product.warehouse_names : [],
      uom_name: uom.uom_name || uom.name || '',
      uoms,
      pricing_options: Array.isArray(uom.pricing_options) ? uom.pricing_options : [],
      selected_pricing_option_id: '',
      quantity: 1,
      unit_price: Number(uom.cost || 0),
      discount_percentage: 0,
      iva_percentage: this.showIva ? Number(uom.iva_percentage || 0) : 0,
      ieps_percentage: this.showIeps ? Number(uom.ieps_percentage || 0) : 0,
      notes: '',
    };
    this.lineItems.push(item);
    this.selectedProduct = null;
    this.applyDefaultPriceListToLine(this.lineItems.length - 1);
    this.scrollLinesToEnd();
  }

  visiblePricingOptions(options: any[] | null | undefined): any[] {
    const rows = Array.isArray(options) ? options : [];
    if (!this.customerPriceListIds.length) return rows;
    return rows.filter((row) =>
      this.customerPriceListIds.includes(String(row?.price_list_id || row?.id || '')),
    );
  }

  private loadCustomerPriceLists(customerId: string | number, applyToLines: boolean): void {
    const requestId = ++this.customerPriceListRequest;
    this.customerPriceListSub?.unsubscribe();
    this.customerPriceListSub = this.customerService.getCustomerPriceLists(String(customerId)).subscribe({
      next: (rows) => {
        if (requestId !== this.customerPriceListRequest) return;
        this.customerPriceListIds = rows.map((row) => row.price_list_id);
        this.customerDefaultPriceListId =
          rows.find((row) => row.is_default)?.price_list_id || this.customerPriceListIds[0] || '';
        if (applyToLines) {
          this.lineItems.forEach((_, index) => this.reconcileLinePriceList(index));
        }
        this.cdr.detectChanges();
      },
      error: () => {
        if (requestId !== this.customerPriceListRequest) return;
        this.customerPriceListIds = [];
        this.customerDefaultPriceListId = '';
        this.cdr.detectChanges();
      },
    });
  }

  private clearCustomerPriceLists(): void {
    this.customerPriceListRequest += 1;
    this.customerPriceListSub?.unsubscribe();
    this.customerPriceListIds = [];
    this.customerDefaultPriceListId = '';
  }

  private reconcileLinePriceList(index: number): void {
    const item = this.lineItems[index];
    if (!item) return;
    const current = String(item.selected_pricing_option_id || '');
    const currentAllowed =
      !this.customerPriceListIds.length || !current || this.customerPriceListIds.includes(current);
    if (current && currentAllowed) return;

    const match = this.visiblePricingOptions(item.pricing_options).find(
      (row) => String(row.price_list_id || row.id || '') === this.customerDefaultPriceListId,
    );
    if (!match) {
      if (current) {
        item.selected_pricing_option_id = '';
        this.onLinePricingOptionChange(index);
      }
      return;
    }
    item.selected_pricing_option_id = String(match.price_list_id || match.id);
    this.onLinePricingOptionChange(index);
  }

  private applyDefaultPriceListToLine(index: number): void {
    const item = this.lineItems[index];
    if (!item || !this.customerDefaultPriceListId) return;
    const match = this.visiblePricingOptions(item.pricing_options).find(
      (row) => String(row.price_list_id || row.id || '') === this.customerDefaultPriceListId,
    );
    if (!match) return;
    item.selected_pricing_option_id = String(match.price_list_id || match.id);
    this.onLinePricingOptionChange(index);
  }

  private resetAddProductForm(): void {
    this.clearProductSearch();
    this.selectedProduct = null;
  }

  private clearProductSearch(): void {
    this.productSearchTerm = '';
    setTimeout(() => {
      const input = this.productSearchInput?.nativeElement;
      if (input) input.value = '';
      this.productSearchTrigger?.closePanel();
    });
  }

  isServiceProduct(product: any): boolean {
    return product?.item_kind === 'service' || this.saleScope === 'services';
  }

  displayProduct = (value: unknown): string => (typeof value === 'string' ? value : '');

  stockLabel(product: any): string {
    if (this.isServiceProduct(product)) return 'Servicio';
    const available = this.getAvailableQty(product);
    return available > 0 ? `${this.formatQty(available)} disp.` : 'Sin stock';
  }

  lineStockLabel(item: LineItem): string {
    if (item.item_kind === 'service') return 'Servicio';
    const available = Number(item.available_quantity ?? 0);
    return available > 0 ? `${this.formatQty(available)} disp.` : 'Sin stock';
  }

  ivaChoices(current: number): number[] {
    const value = Number(current);
    if (!Number.isFinite(value) || this.ivaPresets.includes(value)) {
      return this.ivaPresets;
    }
    return [...this.ivaPresets, value].sort((left, right) => left - right);
  }

  setLineIva(index: number, value: number | string): void {
    const item = this.lineItems[index];
    if (!item) return;
    const rate = Number(value);
    item.iva_percentage = Number.isFinite(rate) ? rate : 0;
  }

  lineNet(item: LineItem): number {
    const quantity = Number(item.quantity) || 0;
    const unitPrice = Number(item.unit_price) || 0;
    const discount = this.clampPercent(item.discount_percentage);
    return quantity * unitPrice * (1 - discount / 100);
  }

  lineTotal(item: LineItem): number {
    const net = this.lineNet(item);
    const iva = this.showIva ? (net * (Number(item.iva_percentage) || 0)) / 100 : 0;
    const ieps = this.showIeps ? (net * (Number(item.ieps_percentage) || 0)) / 100 : 0;
    return net + iva + ieps;
  }

  get draftSubtotal(): number {
    return this.lineItems.reduce((sum, item) => sum + this.lineNet(item), 0);
  }

  get draftIva(): number {
    if (!this.showIva) return 0;
    return this.lineItems.reduce((sum, item) => {
      const net = this.lineNet(item);
      return sum + (net * (Number(item.iva_percentage) || 0)) / 100;
    }, 0);
  }

  get draftIeps(): number {
    if (!this.showIeps) return 0;
    return this.lineItems.reduce((sum, item) => {
      const net = this.lineNet(item);
      return sum + (net * (Number(item.ieps_percentage) || 0)) / 100;
    }, 0);
  }

  get draftTotal(): number {
    return this.draftSubtotal + this.draftIva + this.draftIeps;
  }

  formatMoney(value: number): string {
    const amount = Number.isFinite(value) ? value : 0;
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  private clampPercent(value: number): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) return 0;
    return Math.min(100, parsed);
  }

  private formatQty(value: number): string {
    if (!Number.isFinite(value)) return '0';
    return Number.isInteger(value) ? String(value) : String(Math.round(value * 1000) / 1000);
  }

  private focusProductSearch(): void {
    setTimeout(() => {
      const input = this.productSearchInput?.nativeElement;
      if (!input || input.disabled) return;
      input.focus();
      input.select();
    });
  }

  private scrollLinesToEnd(): void {
    setTimeout(() => this.linesEnd?.nativeElement.scrollIntoView({ block: 'nearest' }));
  }

  getAvailableQty(product: any): number {
    const raw = product?.total_available_quantity ?? product?.available_quantity ?? product?.available_qty ?? product?.stock ?? product?.on_hand ?? product?.inventory_qty ?? 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  removeLineItem(index: number): void {
    this.lineItems.splice(index, 1);
  }

  getProductUoms(index: number): any[] {
    const item = this.lineItems[index];
    if (!item?.product_id) return [];
    if (item.uoms?.length) return item.uoms;
    const product = this.products.find(p => p.product_id === item.product_id || p.id === item.product_id);
    return product?.uoms || [];
  }

  onProductChange(index: number): void {
    const item = this.lineItems[index];
    const product = this.products.find(p => p.product_id === item.product_id || p.id === item.product_id);
    if (product?.uoms?.length > 0) {
      const uom = product.uoms[0];
      item.product_uom_id = uom.id || uom.product_uom_id || uom.uom_id;
      item.product_name = product.product_name || product.name || '';
      item.product_sku = product.product_sku || product.sku || '';
      item.available_quantity = this.getAvailableQty(product);
      item.warehouse_names = Array.isArray(product.warehouse_names) ? product.warehouse_names : [];
      item.uom_name = uom.uom_name || uom.name || '';
      item.uoms = product.uoms;
      item.unit_price = Number(uom.cost || item.unit_price || 0);
      item.discount_percentage = Number(item.discount_percentage || 0);
      item.iva_percentage = Number(uom.iva_percentage || item.iva_percentage || 0);
      item.ieps_percentage = this.showIeps ? Number(uom.ieps_percentage || item.ieps_percentage || 0) : 0;
      item.pricing_options = Array.isArray(uom.pricing_options) ? uom.pricing_options : [];
      item.selected_pricing_option_id = '';
      this.applyDefaultPriceListToLine(index);
    }
  }

  onLineUomChange(index: number): void {
    const item = this.lineItems[index];
    const uom = this.getProductUoms(index).find((row) => (row.id || row.product_uom_id || row.uom_id) === item.product_uom_id);
    if (!uom) return;
    item.uom_name = uom.uom_name || uom.name || '';
    item.unit_price = Number(uom.cost || item.unit_price || 0);
    item.discount_percentage = Number(item.discount_percentage || 0);
    item.iva_percentage = Number(uom.iva_percentage || item.iva_percentage || 0);
    item.ieps_percentage = this.showIeps ? Number(uom.ieps_percentage || item.ieps_percentage || 0) : 0;
    item.pricing_options = Array.isArray(uom.pricing_options) ? uom.pricing_options : [];
    item.selected_pricing_option_id = '';
    this.applyDefaultPriceListToLine(index);
  }

  onLinePricingOptionChange(index: number): void {
    const item = this.lineItems[index];
    if (!item.selected_pricing_option_id) {
      const uom = this.getProductUoms(index).find((row) => (row.id || row.product_uom_id || row.uom_id) === item.product_uom_id);
      if (!uom) return;
      item.unit_price = Number(uom.cost || item.unit_price || 0);
      item.iva_percentage = this.showIva ? Number(uom.iva_percentage || item.iva_percentage || 0) : 0;
      item.ieps_percentage = this.showIeps ? Number(uom.ieps_percentage || item.ieps_percentage || 0) : 0;
      return;
    }
    const option = (item.pricing_options || []).find((row) => (row.price_list_id || row.id) === item.selected_pricing_option_id);
    if (!option) return;
    item.unit_price = Number(option.price ?? item.unit_price ?? 0);
    item.iva_percentage = this.showIva ? Number(option.iva_percentage ?? item.iva_percentage ?? 0) : 0;
    item.ieps_percentage = this.showIeps ? Number(option.ieps_percentage ?? item.ieps_percentage ?? 0) : 0;
  }

  save(): void {
    if (!this.form.valid || this.lineItems.length === 0) {
      this.toast.warning('Por favor completa todos los campos y agrega al menos un renglón');
      return;
    }

    this.saving = true;
    const fv = this.form.getRawValue();
    const lineItems = this.lineItems.map((li) => ({
      product_id: li.product_id,
      product_uom_id: li.product_uom_id,
      quantity: Number(li.quantity),
      unit_price: Number(li.unit_price),
      discount_percentage: Number(li.discount_percentage || 0),
      iva_percentage: this.showIva ? Number(li.iva_percentage || 0) : 0,
      ieps_percentage: this.showIeps ? Number(li.ieps_percentage || 0) : 0,
      ...(li.product_discount_id ? { product_discount_id: li.product_discount_id } : {}),
      ...(!this.asQuotation && li.notes?.trim() ? { notes: li.notes.trim() } : {}),
    }));

    if (this.asQuotation) {
      const payload = {
        fiscal_configuration_id: fv.fiscal_configuration_id,
        billing_branch_id: fv.billing_branch_id,
        customer_id: fv.customer_id,
        expected_delivery_date: fv.expected_delivery_date,
        notes: (fv.notes || '').trim(),
        line_items: lineItems,
        ...(this.editingGlobalDiscountId
          ? { global_discount_id: this.editingGlobalDiscountId }
          : {}),
        ...(this.editingQuotationType === 'POS'
          ? {
              quotation_type: 'POS' as const,
              warehouse_id: this.editingWarehouseId || undefined,
              seller_user_id: this.editingSellerUserId || undefined,
            }
          : {}),
      };

      const request = this.isEditingQuotation && this.quotationId
        ? this.quotationService.update(this.quotationId, payload)
        : this.quotationService.create(payload);

      request.subscribe({
        next: (quotation) => {
          this.saving = false;
          this.toast.success(
            this.isEditingQuotation
              ? 'Cotización actualizada. El PDF se regeneró.'
              : 'Cotización creada. No se retuvo inventario.',
          );
          this.dialogRef.close(quotation);
        },
        error: (error) => {
          this.saving = false;
          this.cdr.detectChanges();
          const msg =
            error.error?.message ||
            error.message ||
            (this.isEditingQuotation
              ? 'Error al actualizar la cotización'
              : 'Error al crear la cotización');
          this.toast.error(msg);
        }
      });
      return;
    }

    const payload = {
      fiscal_configuration_id: fv.fiscal_configuration_id,
      billing_branch_id: fv.billing_branch_id,
      customer_id: fv.customer_id,
      expected_delivery_date: fv.expected_delivery_date,
      sale_scope: fv.sale_scope || 'inventory',
      requires_selection_assembly: fv.sale_scope === 'services' ? false : !!fv.requires_selection_assembly,
      for_shipping: !!fv.for_shipping,
      notes: (fv.notes || '').trim() || undefined,
      currency: (fv.currency === 'USD' ? 'USD' : 'MXN') as 'MXN' | 'USD',
      line_items: lineItems,
    };

    this.salesOrderService.createOrder(payload).subscribe({
      next: (order) => {
        this.saving = false;
        this.toast.success('Orden de venta creada exitosamente');
        this.dialogRef.close(order);
      },
      error: (error) => {
        this.saving = false;
        this.cdr.detectChanges();
        const msg = error.error?.message || error.message || 'Error al crear la orden de venta';
        this.toast.error(msg);
      }
    });
  }

  openCreateServiceModal(): void {
    this.createServiceModalOpen = true;
    this.newService = {
      name: '',
      description: '',
      sku: '',
      sat_clave: '',
      base_uom_catalog_id: '',
      unit_price: 0,
      iva_percentage: 16,
    };
    if (this.uomCatalog.length === 0) {
      this.productService.getUOMCatalog({ limit: 100 }).subscribe({
        next: (rows) => {
          this.uomCatalog = rows ?? [];
          this.cdr.detectChanges();
        },
        error: () => {
          this.toast.error('No se pudieron cargar las unidades');
        },
      });
    }
  }

  closeCreateServiceModal(): void {
    this.createServiceModalOpen = false;
    this.savingService = false;
  }

  get canConfirmCreateService(): boolean {
    return !!(
      this.newService.name.trim() &&
      this.newService.base_uom_catalog_id &&
      Number(this.newService.unit_price) >= 0
    );
  }

  confirmCreateService(): void {
    if (!this.canConfirmCreateService || this.savingService) {
      return;
    }
    this.savingService = true;
    this.productService.createProduct({
      name: this.newService.name.trim(),
      description: this.newService.description.trim() || undefined,
      sku: this.newService.sku.trim() || undefined,
      sat_clave: this.newService.sat_clave.trim() || undefined,
      sat_code: this.newService.sat_clave.trim() || undefined,
      item_kind: 'service',
      base_uom_catalog_id: this.newService.base_uom_catalog_id,
    }).subscribe({
      next: (created) => {
        const productUomId = created.product_uom_id || created.base_product_uom_id || '';
        const uom = this.uomCatalog.find((row) => row.id === this.newService.base_uom_catalog_id);
        this.lineItems.push({
          product_id: created.id,
          product_uom_id: productUomId,
          product_name: created.name,
          product_sku: created.sku,
          description: this.newService.description.trim() || created.description || '',
          item_kind: 'service',
          uom_name: uom?.name || uom?.abbreviation || '',
          uoms: productUomId
            ? [{
                id: productUomId,
                product_uom_id: productUomId,
                name: uom?.name || uom?.abbreviation || 'UOM',
                uom_name: uom?.name || uom?.abbreviation || 'UOM',
                cost: Number(this.newService.unit_price || 0),
                iva_percentage: Number(this.newService.iva_percentage || 0),
                ieps_percentage: 0,
                pricing_options: [],
              }]
            : [],
          quantity: 1,
          unit_price: Number(this.newService.unit_price || 0),
          discount_percentage: 0,
          iva_percentage: Number(this.newService.iva_percentage || 0),
          ieps_percentage: 0,
          notes: '',
        });
        this.savingService = false;
        this.closeCreateServiceModal();
        this.resetAddProductForm();
        this.focusProductSearch();
        this.scrollLinesToEnd();
        this.toast.success('Servicio creado y agregado a la orden');
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.savingService = false;
        this.cdr.detectChanges();
        this.toast.error(error.error?.message || error.message || 'No se pudo crear el servicio');
      },
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
