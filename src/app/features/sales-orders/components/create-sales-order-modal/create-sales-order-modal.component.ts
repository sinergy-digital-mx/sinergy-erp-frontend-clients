import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerEditModalComponent } from '../../../customers/components/customer-edit-modal/customer-edit-modal.component';
import { ToastService } from '../../../../core/services/toast.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
  pricing_options?: any[];
  selected_pricing_option_id?: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  iva_percentage: number;
  ieps_percentage: number;
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
  addProductModalOpen = false;
  productSearchTerm: any = '';
  selectedProduct: any = null;
  selectedUomId = '';
  selectedQuantity = 1;
  selectedUnitPrice = 0;
  selectedIva = 16;
  selectedIeps = 0;
  selectedPricingOptionId = '';
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
  private productSearch$ = new Subject<string>();
  private productsSub?: Subscription;

  get asQuotation(): boolean {
    return this.data?.asQuotation === true;
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
      requires_selection_assembly: [false],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
    this.setupLocationCascade();
    this.productSearch$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => this.loadProducts(term));
    this.form.get('sale_scope')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((scope: SalesOrderSaleScope) => {
        this.lineItems = [];
        this.tabs = this.tabs.map((tab) =>
          tab.id === 'products'
            ? { ...tab, title: scope === 'services' ? 'Servicios' : 'Productos' }
            : tab
        );
        if (scope === 'services') {
          this.form.patchValue({ requires_selection_assembly: false }, { emitEvent: false });
        }
        if (this.hasBillingBranch) {
          this.loadProducts();
        }
        this.cdr.detectChanges();
      });
    this.form.get('customer_search')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
      if (typeof value === 'string') {
        this.form.patchValue({ customer_id: '' }, { emitEvent: false });
      }
      this.filterCustomers(value ?? '');
    });
  }

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
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

  get canConfirmAddProduct(): boolean {
    const quantity = Number(this.selectedQuantity || 0);
    const hasStockOrService =
      this.isServiceProduct(this.selectedProduct) || this.getAvailableQty(this.selectedProduct) > 0;
    return !!(
      this.selectedProduct &&
      this.selectedUomId &&
      Number.isFinite(quantity) &&
      quantity > 0 &&
      hasStockOrService
    );
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
  }

  branchLabel(branch: Branch): string {
    return branch.code?.trim() || branch.display_name?.trim() || '—';
  }

  loadDropdownData(): void {
    this.loading = true;

    Promise.all([
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
      this.loading = false;
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('Error loading dropdown data:', error);
      this.toast.error('Error al cargar datos');
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private setupLocationCascade(): void {
    this.form.get('fiscal_configuration_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fiscalId) => {
        this.form.patchValue({ billing_branch_id: '' }, { emitEvent: false });
        this.branches = [];
        this.form.get('billing_branch_id')?.disable({ emitEvent: false });
        this.resetProductsState();

        if (fiscalId) {
          this.loadBranches(fiscalId);
          this.form.get('billing_branch_id')?.enable({ emitEvent: false });
        }
        this.cdr.detectChanges();
      });

    this.form.get('billing_branch_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((branchId) => {
        this.resetProductsState();
        if (branchId) {
          this.setProductsTabEnabled(true);
          this.loadProducts();
        }
        this.cdr.detectChanges();
      });
  }

  private loadBranches(fiscalConfigurationId: string): void {
    this.branchService.getBranches(fiscalConfigurationId).subscribe({
      next: (branches) => {
        this.branches = Array.isArray(branches) ? branches : [];
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
    this.closeAddProductModal();
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
    this.productsSub = this.salesOrderService.getProductsSummary({
      fiscal_configuration_id: fiscalId,
      billing_branch_id: branchId,
      search: search.trim() || undefined,
      limit: 100,
      sale_scope: this.saleScope,
    }).subscribe({
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

  openAddProductModal(): void {
    if (!this.hasBillingBranch) {
      this.toast.warning('Selecciona una sucursal antes de agregar productos');
      return;
    }
    this.addProductModalOpen = true;
    this.resetAddProductForm();
    this.loadProducts();
  }

  closeAddProductModal(): void {
    this.addProductModalOpen = false;
  }

  onProductSearchChange(value: any): void {
    this.productSearchTerm = value;
    if (typeof value !== 'string') return;
    this.productSearch$.next(value);
  }

  get filteredProductsForModal(): any[] {
    return this.products;
  }

  get selectedProductUoms(): any[] {
    if (!this.selectedProduct) return [];
    return this.selectedProduct?.uoms || [];
  }

  onProductSelectedForModal(product: any): void {
    this.selectedProduct = product;
    this.productSearchTerm = product;
    const firstUom = (product?.uoms || [])[0];
    this.selectedUomId = firstUom?.id || firstUom?.product_uom_id || firstUom?.uom_id || '';
    this.selectedUnitPrice = Number(firstUom?.cost || 0);
    this.selectedIva = Number(firstUom?.iva_percentage || 0);
    this.selectedIeps = Number(firstUom?.ieps_percentage || 0);
    this.selectedPricingOptionId = '';
  }

  onSelectedUomChange(): void {
    const uom = this.selectedProductUoms.find((row) => (row.id || row.product_uom_id || row.uom_id) === this.selectedUomId);
    if (!uom) return;
    this.selectedUnitPrice = Number(uom.cost || 0);
    this.selectedIva = Number(uom.iva_percentage || 0);
    this.selectedIeps = Number(uom.ieps_percentage || 0);
    this.selectedPricingOptionId = '';
  }

  get selectedModalPricingOptions(): any[] {
    const uom = this.selectedProductUoms.find((row) => (row.id || row.product_uom_id || row.uom_id) === this.selectedUomId);
    return Array.isArray(uom?.pricing_options) ? uom.pricing_options : [];
  }

  onSelectedPricingOptionChange(): void {
    const option = this.selectedModalPricingOptions.find((row) => (row.price_list_id || row.id) === this.selectedPricingOptionId);
    if (!option) return;
    this.selectedUnitPrice = Number(option.price ?? 0);
    this.selectedIva = Number(option.iva_percentage ?? 0);
    this.selectedIeps = Number(option.ieps_percentage ?? 0);
  }

  confirmAddProduct(): void {
    if (!this.selectedProduct || !this.selectedUomId) {
      this.toast.warning('Selecciona producto y UOM');
      return;
    }
    const available = this.getAvailableQty(this.selectedProduct);
    const isService = this.isServiceProduct(this.selectedProduct);
    if (!isService && available <= 0) {
      this.toast.warning('Este producto no tiene stock disponible en la sucursal');
      return;
    }
    const quantity = Number(this.selectedQuantity || 0);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.toast.warning('Cantidad inválida');
      return;
    }
    const selectedUom = this.selectedProductUoms.find((row) => (row.id || row.product_uom_id || row.uom_id) === this.selectedUomId);
    const newItem: LineItem = {
      product_id: this.selectedProduct.product_id,
      product_uom_id: this.selectedUomId,
      product_name: this.selectedProduct.product_name,
      product_sku: this.selectedProduct.product_sku || this.selectedProduct.sku || '',
      description: this.selectedProduct.description || this.selectedProduct.product_description || '',
      item_kind: isService ? 'service' : 'goods',
      available_quantity: isService ? undefined : available,
      warehouse_names: Array.isArray(this.selectedProduct.warehouse_names)
        ? this.selectedProduct.warehouse_names
        : [],
      uom_name: selectedUom?.uom_name || selectedUom?.name || '',
      pricing_options: Array.isArray(selectedUom?.pricing_options) ? selectedUom.pricing_options : [],
      selected_pricing_option_id: this.selectedPricingOptionId || undefined,
      quantity,
      unit_price: Number(this.selectedUnitPrice || 0),
      discount_percentage: 0,
      iva_percentage: Number(this.selectedIva || 0),
      ieps_percentage: Number(this.selectedIeps || 0)
    };
    this.lineItems.push(newItem);
    this.closeAddProductModal();
  }

  private resetAddProductForm(): void {
    this.productSearchTerm = '';
    this.selectedProduct = null;
    this.selectedUomId = '';
    this.selectedQuantity = 1;
    this.selectedUnitPrice = 0;
    this.selectedIva = 16;
    this.selectedIeps = 0;
    this.selectedPricingOptionId = '';
  }

  getProductOptionLabel(product: any): string {
    const name = product?.product_name || product?.name || 'Producto';
    const sku = product?.product_sku || product?.sku ? ` | SKU: ${product?.product_sku || product?.sku}` : '';
    if (this.isServiceProduct(product)) {
      return `${name}${sku} | Servicio`;
    }
    const available = this.getAvailableQty(product);
    const warehouses = this.getWarehouseNamesLabel(product);
    const warehouseSuffix = warehouses ? ` | ${warehouses}` : '';
    return `${name}${sku} | Disp: ${available}${warehouseSuffix}`;
  }

  isServiceProduct(product: any): boolean {
    return product?.item_kind === 'service' || this.saleScope === 'services';
  }

  getWarehouseNamesLabel(product: any): string {
    const names = product?.warehouse_names;
    if (!Array.isArray(names) || names.length === 0) return '';
    return names.filter((name: unknown) => !!name).join(', ');
  }

  displayProduct(value: any): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return this.getProductOptionLabel(value);
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
    if (!item.product_id) return [];
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
      item.unit_price = Number(uom.cost || item.unit_price || 0);
      item.discount_percentage = Number(item.discount_percentage || 0);
      item.iva_percentage = Number(uom.iva_percentage || item.iva_percentage || 0);
      item.ieps_percentage = Number(uom.ieps_percentage || item.ieps_percentage || 0);
      item.pricing_options = Array.isArray(uom.pricing_options) ? uom.pricing_options : [];
      item.selected_pricing_option_id = undefined;
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
    item.ieps_percentage = Number(uom.ieps_percentage || item.ieps_percentage || 0);
    item.pricing_options = Array.isArray(uom.pricing_options) ? uom.pricing_options : [];
    item.selected_pricing_option_id = undefined;
  }

  onLinePricingOptionChange(index: number): void {
    const item = this.lineItems[index];
    const option = (item.pricing_options || []).find((row) => (row.price_list_id || row.id) === item.selected_pricing_option_id);
    if (!option) return;
    item.unit_price = Number(option.price ?? item.unit_price ?? 0);
    item.iva_percentage = Number(option.iva_percentage ?? item.iva_percentage ?? 0);
    item.ieps_percentage = Number(option.ieps_percentage ?? item.ieps_percentage ?? 0);
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
      iva_percentage: Number(li.iva_percentage),
      ieps_percentage: Number(li.ieps_percentage)
    }));

    if (this.asQuotation) {
      this.quotationService.create({
        fiscal_configuration_id: fv.fiscal_configuration_id,
        billing_branch_id: fv.billing_branch_id,
        customer_id: fv.customer_id,
        expected_delivery_date: fv.expected_delivery_date,
        notes: (fv.notes || '').trim() || undefined,
        line_items: lineItems,
      }).subscribe({
        next: (quotation) => {
          this.saving = false;
          this.toast.success('Cotización creada. No se retuvo inventario.');
          this.dialogRef.close(quotation);
        },
        error: (error) => {
          this.saving = false;
          this.cdr.detectChanges();
          const msg = error.error?.message || error.message || 'Error al crear la cotización';
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
      notes: (fv.notes || '').trim() || undefined,
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
          quantity: 1,
          unit_price: Number(this.newService.unit_price || 0),
          discount_percentage: 0,
          iva_percentage: Number(this.newService.iva_percentage || 0),
          ieps_percentage: 0,
        });
        this.savingService = false;
        this.closeCreateServiceModal();
        this.closeAddProductModal();
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
