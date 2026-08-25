import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LucideAngularModule, ExternalLink, Pencil, Plus, ChevronDown } from 'lucide-angular';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { WritePurchaseOrderDto } from '../../models/filters.model';
import { FiscalConfigurationService } from '../../../../features/settings/services/fiscal-configuration.service';
import { BranchService } from '../../../../features/settings/services/branch.service';
import { WarehouseService } from '../../../../features/settings/services/warehouse.service';
import { VendorService } from '../../../../features/settings/services/vendor.service';
import { Vendor } from '../../../../features/settings/models/vendor.model';
import { VendorDetailModalComponent } from '../../../../features/settings/components/vendor-detail-modal/vendor-detail-modal.component';
import { Branch } from '../../../../features/settings/models/branch.model';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { ProductDetailModalComponent } from '../../../../features/settings/components/product-detail-modal/product-detail-modal.component';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { PEDIMENTO_MAX_LENGTH } from '../../utils/purchase-order-display.util';
import { VendorCatalogProduct, VendorCatalogUom } from '../../models/vendor-catalog.model';
import {
  VendorCostCurrency,
  currencyMismatchMessage,
  normalizeVendorCostCurrency,
} from '../../../settings/utils/vendor-cost-currency.util';

interface LineItem {
  product_id: string;
  product_name?: string;
  product_sku?: string;
  uom_id: string;
  quantity: number;
  unit_total: number;
  iva_percentage: number;
  iva_unit: number;
  ieps_percentage: number;
  ieps_unit: number;
  currency: VendorCostCurrency;
}

@Component({
  selector: 'app-create-purchase-order-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, TabComponent, LucideAngularModule],
  templateUrl: './create-purchase-order-modal.component.html',
  styleUrls: ['./create-purchase-order-modal.component.scss']
})
export class CreatePurchaseOrderModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading = false;
  saving = false;
  lineItems: LineItem[] = [];
  vendorProducts: VendorCatalogProduct[] = [];
  loadingProducts = false;

  // Dropdowns data
  fiscalConfigurations: any[] = [];
  branches: Branch[] = [];
  warehouses: any[] = [];
  vendorOptions: any[] = [];
  filteredVendors: any[] = [];
  loadingVendors = false;
  private destroy$ = new Subject<void>();
  tabs: TabItem[] = [
    { id: 'info', title: 'Información' },
    { id: 'products', title: 'Productos' }
  ];
  activeTab = 'info';
  addProductModalOpen = false;
  productSearchTerm: string | VendorCatalogProduct = '';
  selectedProduct: any = null;
  selectedUomId = '';
  selectedQuantity = 1;
  selectedUnitTotal = 0;
  selectedIva = 16;
  selectedIeps = 0;
  selectedCurrency: VendorCostCurrency = 'MXN';
  selectedCurrencyLocked = false;
  readonly ExternalLink = ExternalLink;
  readonly Pencil = Pencil;
  readonly Plus = Plus;
  readonly ChevronDown = ChevronDown;
  readonly pedimentoMaxLength = PEDIMENTO_MAX_LENGTH;
  selectedVendor: (Vendor & { display_name?: string }) | null = null;

  constructor(
    private fb: FormBuilder,
    private purchaseOrderService: PurchaseOrderService,
    private fiscalConfigService: FiscalConfigurationService,
    private branchService: BranchService,
    private warehouseService: WarehouseService,
    private vendorService: VendorService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreatePurchaseOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      fiscal_configuration_id: ['', Validators.required],
      billing_branch_id: [{ value: '', disabled: true }, Validators.required],
      warehouse_id: [{ value: '', disabled: true }, Validators.required],
      vendor_search: [''],
      vendor_id: ['', Validators.required],
      expected_delivery_date: ['', Validators.required],
      payment_status: ['Pendiente', Validators.required],
      pedimento_number: ['', [Validators.maxLength(PEDIMENTO_MAX_LENGTH)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadFiscalConfigurations();
    this.setupLocationCascade();
    this.loadVendorOptions();
    this.setupVendorSearch();
  }

  private setupLocationCascade(): void {
    this.form.get('fiscal_configuration_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fiscalId) => {
        this.form.patchValue({ billing_branch_id: '', warehouse_id: '' }, { emitEvent: false });
        this.branches = [];
        this.warehouses = [];
        this.form.get('billing_branch_id')?.disable({ emitEvent: false });
        this.form.get('warehouse_id')?.disable({ emitEvent: false });

        if (fiscalId) {
          this.loadBranches(fiscalId);
          this.form.get('billing_branch_id')?.enable({ emitEvent: false });
        }
        this.cdr.detectChanges();
      });

    this.form.get('billing_branch_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((branchId) => {
        this.form.patchValue({ warehouse_id: '' }, { emitEvent: false });
        this.warehouses = [];
        this.form.get('warehouse_id')?.disable({ emitEvent: false });

        if (branchId) {
          this.loadWarehouses(branchId);
          this.form.get('warehouse_id')?.enable({ emitEvent: false });
        }
        this.cdr.detectChanges();
      });
  }

  branchLabel(branch: Branch): string {
    return branch.code?.trim() || branch.display_name?.trim() || '—';
  }

  private loadFiscalConfigurations(): void {
    this.loading = true;
    this.fiscalConfigService.listFiscalConfigurations({ status: 'active', limit: 100 }).subscribe({
      next: (res) => {
        this.fiscalConfigurations = res.data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading fiscal configurations:', error);
        this.toast.error('Error al cargar razones sociales');
        this.loading = false;
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
      error: (error) => {
        console.error('Error loading branches:', error);
        this.toast.error('Error al cargar sucursales');
        this.branches = [];
        this.cdr.detectChanges();
      },
    });
  }

  private loadWarehouses(billingBranchId: string): void {
    this.warehouseService.getWarehouses({
      billing_branch_id: billingBranchId,
      status: 'active',
      limit: 100,
    }).subscribe({
      next: (res) => {
        this.warehouses = res.data ?? [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
        this.toast.error('Error al cargar almacenes');
        this.warehouses = [];
        this.cdr.detectChanges();
      },
    });
  }

  private loadVendorOptions(): void {
    this.loadingVendors = true;
    this.vendorService.getAllActiveVendors().subscribe({
      next: (vendors) => {
        this.vendorOptions = vendors.map((vendor) => ({
          ...vendor,
          display_name: this.formatVendorLabel(vendor),
        }));
        this.filteredVendors = this.filterVendorsLocally(this.currentVendorSearchTerm());
        this.loadingVendors = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingVendors = false;
        this.toast.error('Error al cargar proveedores');
        this.cdr.detectChanges();
      },
    });
  }

  private setupVendorSearch(): void {
    this.form.get('vendor_search')?.valueChanges
      .pipe(debounceTime(120), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value && typeof value !== 'string') {
          return;
        }

        if (typeof value === 'string') {
          this.selectedVendor = null;
          this.form.patchValue({ vendor_id: '', pedimento_number: '' }, { emitEvent: false });
        }

        this.filteredVendors = this.filterVendorsLocally(typeof value === 'string' ? value : '');
        this.cdr.detectChanges();
      });
  }

  onVendorSearchFocus(): void {
    this.filteredVendors = this.filterVendorsLocally(this.currentVendorSearchTerm());
    if (!this.vendorOptions.length && !this.loadingVendors) {
      this.loadVendorOptions();
    }
  }

  currentVendorSearchTerm(): string {
    const value = this.form.get('vendor_search')?.value;
    if (!value || typeof value !== 'string') return '';
    return value.trim().toLowerCase();
  }

  private filterVendorsLocally(term: string): any[] {
    const query = term.trim().toLowerCase();
    if (!query) return this.vendorOptions;
    return this.vendorOptions.filter((vendor) => {
      const haystack = `${vendor.display_name || ''} ${vendor.name || ''} ${vendor.rfc || ''}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
  }

  onVendorChange(): void {
    const vendorId = this.form.get('vendor_id')?.value;
    if (!vendorId) {
      this.selectedVendor = null;
      this.form.patchValue({ pedimento_number: '' }, { emitEvent: false });
      this.vendorProducts = [];
      this.lineItems = [];
      this.resetAddProductForm();
      return;
    }

    this.loadingProducts = true;
    this.purchaseOrderService.getVendorProducts(vendorId).subscribe({
      next: (products) => {
        this.vendorProducts = products;
        this.lineItems = [];
        this.resetAddProductForm();
        this.loadingProducts = false;
      },
      error: (error) => {
        console.error('Error loading vendor products:', error);
        this.toast.error('Error al cargar productos del proveedor');
        this.loadingProducts = false;
      }
    });
  }

  onVendorSelected(vendor: any): void {
    if (!vendor) return;
    this.selectedVendor = vendor;
    const patch: Record<string, string> = {
      vendor_id: vendor.id,
      vendor_search: vendor.display_name
    };
    if (vendor.vendor_type !== 'INTERNATIONAL') {
      patch['pedimento_number'] = '';
    }
    this.form.patchValue(patch, { emitEvent: false });
    this.onVendorChange();
  }

  get isInternationalVendor(): boolean {
    return this.selectedVendor?.vendor_type === 'INTERNATIONAL';
  }

  openCreateVendor(): void {
    this.dialog.open(VendorDetailModalComponent, {
      width: '80vw',
      maxWidth: '1000px',
      data: { vendor: null },
    }).afterClosed().subscribe((created?: Vendor) => {
      if (!created) return;
      this.applySelectedVendor(created, true);
    });
  }

  openSelectedVendorDetail(): void {
    const vendorId = this.form.get('vendor_id')?.value;
    if (!vendorId) {
      this.toast.warning('Selecciona un proveedor primero');
      return;
    }

    const openModal = (vendor: Vendor) => {
      this.dialog.open(VendorDetailModalComponent, {
        width: '80vw',
        maxWidth: '1000px',
        data: { vendor },
      }).afterClosed().subscribe((updated?: Vendor) => {
        if (!updated) return;
        this.applySelectedVendor(updated, false);
      });
    };

    this.vendorService.getVendor(String(vendorId)).subscribe({
      next: (vendor) => openModal(vendor),
      error: () => {
        if (this.selectedVendor?.id) {
          openModal(this.selectedVendor);
          return;
        }
        this.toast.error('No se pudo cargar el proveedor');
      },
    });
  }

  displayVendor(vendor: any): string {
    if (!vendor) return '';
    if (typeof vendor === 'string') return vendor;
    return vendor?.display_name || this.formatVendorLabel(vendor) || '';
  }

  private applySelectedVendor(vendor: Vendor, reloadProducts: boolean): void {
    const displayName = this.formatVendorLabel(vendor);
    this.selectedVendor = { ...vendor, display_name: displayName };
    const patch: Record<string, string> = {
      vendor_id: vendor.id,
      vendor_search: displayName,
    };
    if (vendor.vendor_type !== 'INTERNATIONAL') {
      patch['pedimento_number'] = '';
    }
    this.form.patchValue(patch, { emitEvent: false });
    const exists = this.vendorOptions.some((row) => row.id === vendor.id);
    if (!exists) {
      this.vendorOptions = [this.selectedVendor, ...this.vendorOptions];
    }
    this.filteredVendors = this.filterVendorsLocally('');
    if (reloadProducts) {
      this.onVendorChange();
    }
    this.cdr.detectChanges();
  }

  private formatVendorLabel(vendor: any): string {
    if (!vendor) return '';
    const name = (vendor.name || '').trim();
    const rfc = (vendor.rfc || '').trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  get filteredProductsForModal(): VendorCatalogProduct[] {
    const term = this.currentProductSearchTerm();
    if (!term) return this.vendorProducts;
    return this.vendorProducts.filter((product) => {
      const haystack = `${product.product_name || ''} ${product.product_sku || product.sku || ''}`.toLowerCase();
      return haystack.includes(term);
    });
  }

  get selectedProductUoms(): VendorCatalogUom[] {
    if (!this.selectedProduct) return [];
    return this.selectedProduct?.uoms || [];
  }

  get selectedProductHasVendorCost(): boolean {
    return this.productHasVendorCost(this.selectedProduct);
  }

  get orderCurrency(): VendorCostCurrency | null {
    const first = this.lineItems[0]?.currency;
    return normalizeVendorCostCurrency(first);
  }

  get selectedUom(): VendorCatalogUom | undefined {
    return this.selectedProductUoms.find((row) => row.uom_id === this.selectedUomId);
  }

  get selectedLineCurrency(): VendorCostCurrency {
    return this.selectedUomCurrency ?? this.selectedCurrency;
  }

  get selectedUomCurrency(): VendorCostCurrency | null {
    return normalizeVendorCostCurrency(this.selectedUom?.currency);
  }

  get selectedCurrencyMismatch(): boolean {
    const order = this.orderCurrency;
    const product = this.selectedLineCurrency;
    return !!order && order !== product;
  }

  get currencyMismatchText(): string {
    const order = this.orderCurrency;
    if (!order || !this.selectedCurrencyMismatch) return '';
    return currencyMismatchMessage(order, this.selectedLineCurrency);
  }

  get canConfirmAddProduct(): boolean {
    return !!(
      this.selectedProduct &&
      this.selectedUomId &&
      Number(this.selectedQuantity) > 0 &&
      !this.selectedCurrencyMismatch
    );
  }

  productHasVendorCost(product: VendorCatalogProduct | null): boolean {
    if (!product) return false;
    if (typeof product.has_vendor_cost === 'boolean') {
      return product.has_vendor_cost;
    }
    return (product.uoms || []).length > 0;
  }

  private currentProductSearchTerm(): string {
    const raw =
      typeof this.productSearchTerm === 'string'
        ? this.productSearchTerm
        : this.getProductOptionLabel(this.productSearchTerm);
    return String(raw || '').toLowerCase().trim();
  }

  openAddProductModal(): void {
    if (!this.form.get('vendor_id')?.value) {
      this.toast.warning('Selecciona un proveedor antes de agregar productos');
      return;
    }
    this.addProductModalOpen = true;
    this.resetAddProductForm();
  }

  closeAddProductModal(): void {
    this.addProductModalOpen = false;
  }

  onProductSelectedForModal(product: any): void {
    this.selectedProduct = product;
    this.productSearchTerm = product;
    const firstUom = (product?.uoms || [])[0];
    this.selectedUomId = firstUom?.uom_id || '';
    this.applySelectedUom();
  }

  openSelectedProductDetail(): void {
    const productId = this.selectedProduct?.product_id;
    if (!productId) {
      this.toast.warning('Selecciona un producto primero');
      return;
    }

    const productIdToRefresh = productId;
    const uomIdToRestore = this.selectedUomId;

    this.dialog.open(ProductDetailModalComponent, {
      ...PRODUCT_DETAIL_DIALOG_CONFIG,
      data: {
        product: {
          id: productId,
          name: this.selectedProduct?.product_name,
          sku: this.selectedProduct?.product_sku || this.selectedProduct?.sku,
        },
        isNew: false,
        initialTab: 'costos',
      },
    }).afterClosed().subscribe(() => {
      this.refreshSelectedProductFromVendor(productIdToRefresh, uomIdToRestore);
    });
  }

  private refreshSelectedProductFromVendor(productId: string, preferredUomId: string): void {
    const vendorId = this.form.get('vendor_id')?.value;
    if (!vendorId) return;

    this.purchaseOrderService.getVendorProducts(vendorId).subscribe({
      next: (products) => {
        this.vendorProducts = products;
        const wasMissingCost = !this.productHasVendorCost(this.selectedProduct);
        const updated = products.find((product) => product.product_id === productId);
        if (!updated) {
          this.toast.warning('El producto sigue sin costo de proveedor. Puedes capturarlo aquí o configurarlo en el producto.');
          this.cdr.detectChanges();
          return;
        }

        this.selectedProduct = updated;
        this.productSearchTerm = updated;
        this.selectedUomId = preferredUomId || updated.uoms?.[0]?.uom_id || '';
        this.applySelectedUom();

        if (!this.productHasVendorCost(updated)) {
          this.toast.info('Sin costo de proveedor. Captura costo y moneda para agregarlo.');
          this.cdr.detectChanges();
          return;
        }

        if (wasMissingCost) {
          this.toast.success('Costo de proveedor actualizado. Ya puedes agregar el producto.');
        }

        this.cdr.detectChanges();
      },
      error: () => {
        this.toast.error('No se pudo actualizar la información del producto');
      },
    });
  }

  setSelectedCurrency(currency: VendorCostCurrency): void {
    if (this.selectedCurrencyLocked) return;
    this.selectedCurrency = currency;
  }

  onSelectedUomChange(): void {
    this.applySelectedUom();
  }

  private applySelectedUom(): void {
    const uom = this.selectedUom;
    if (!uom) {
      this.selectedCurrencyLocked = false;
      this.selectedCurrency = this.orderCurrency ?? 'MXN';
      return;
    }

    const locked = this.selectedUomCurrency;
    if (locked) {
      this.selectedCurrency = locked;
      this.selectedCurrencyLocked = true;
    } else if (this.orderCurrency) {
      this.selectedCurrency = this.orderCurrency;
      this.selectedCurrencyLocked = true;
    } else {
      this.selectedCurrency = 'MXN';
      this.selectedCurrencyLocked = false;
    }

    this.selectedUnitTotal = Number(uom.cost || 0);
    this.selectedIva = Number(uom.iva_percentage || 0);
    this.selectedIeps = Number(uom.ieps_percentage || 0);
  }

  confirmAddProduct(): void {
    if (!this.selectedProduct || !this.selectedUomId) {
      this.toast.warning('Selecciona producto y UOM');
      return;
    }
    if (this.selectedCurrencyMismatch) {
      this.toast.warning(this.currencyMismatchText);
      return;
    }
    const quantity = Number(this.selectedQuantity || 0);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.toast.warning('Cantidad inválida');
      return;
    }

    const newItem: LineItem = {
      product_id: this.selectedProduct.product_id,
      product_name: this.selectedProduct.product_name,
      product_sku: this.selectedProduct.product_sku || this.selectedProduct.sku || '',
      uom_id: this.selectedUomId,
      quantity,
      unit_total: Number(this.selectedUnitTotal || 0),
      iva_percentage: Number(this.selectedIva || 0),
      iva_unit: 0,
      ieps_percentage: Number(this.selectedIeps || 0),
      ieps_unit: 0,
      currency: this.selectedLineCurrency
    };
    this.calculateTotals(newItem);
    this.lineItems.push(newItem);
    this.closeAddProductModal();
  }

  private resetAddProductForm(): void {
    this.productSearchTerm = '';
    this.selectedProduct = null;
    this.selectedUomId = '';
    this.selectedQuantity = 1;
    this.selectedUnitTotal = 0;
    this.selectedIva = 16;
    this.selectedIeps = 0;
    this.selectedCurrency = this.orderCurrency ?? 'MXN';
    this.selectedCurrencyLocked = !!this.orderCurrency;
  }

  getAvailableQty(product: any): number {
    const raw = product?.available_quantity ?? product?.available_qty ?? product?.stock ?? product?.on_hand ?? product?.inventory_qty ?? 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  getProductOptionLabel(product: any): string {
    const name = product?.product_name || 'Producto';
    const productSku = product?.product_sku || product?.sku || '';
    const sku = productSku ? ` | SKU: ${productSku}` : '';
    const missing = this.productHasVendorCost(product) ? '' : ' · Sin costo de proveedor';
    return `${name}${sku}${missing}`;
  }

  displayProductSearch(): string {
    return this.selectedProduct ? this.getProductOptionLabel(this.selectedProduct) : '';
  }

  displayProduct(value: any): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return this.getProductOptionLabel(value);
  }

  removeLineItem(index: number): void {
    this.lineItems.splice(index, 1);
  }

  calculateTotals(item: LineItem): void {
    item.iva_unit = (item.unit_total * item.iva_percentage) / 100;
    item.ieps_unit = (item.unit_total * item.ieps_percentage) / 100;
  }

  getProductUoms(lineItemIndex: number): any[] {
    const item = this.lineItems[lineItemIndex];
    if (!item.product_id) return [];
    
    const product = this.vendorProducts.find(p => p.product_id === item.product_id);
    return product?.uoms || [];
  }

  onProductChange(lineItemIndex: number): void {
    const item = this.lineItems[lineItemIndex];
    const product = this.vendorProducts.find(p => p.product_id === item.product_id);
    
    if (product && product.uoms && product.uoms.length > 0) {
      // Set default UOM to the first one
      const defaultUom = product.uoms[0];
      item.uom_id = defaultUom.uom_id;
      item.unit_total = defaultUom.cost || 0;
      item.iva_percentage = defaultUom.iva_percentage || 0;
      item.ieps_percentage = defaultUom.ieps_percentage || 0;
      this.calculateTotals(item);
    }
  }

  onUomChange(lineItemIndex: number): void {
    const item = this.lineItems[lineItemIndex];
    const product = this.vendorProducts.find(p => p.product_id === item.product_id);
    
    if (product && product.uoms) {
      const selectedUom = product.uoms.find(u => u.uom_id === item.uom_id);
      if (selectedUom) {
        const uomCurrency = normalizeVendorCostCurrency(selectedUom.currency);
        if (uomCurrency && this.orderCurrency && uomCurrency !== this.orderCurrency) {
          this.toast.warning(currencyMismatchMessage(this.orderCurrency, uomCurrency));
        }
        item.unit_total = selectedUom.cost || 0;
        item.iva_percentage = selectedUom.iva_percentage || 0;
        item.ieps_percentage = selectedUom.ieps_percentage || 0;
        item.currency = uomCurrency ?? item.currency ?? this.orderCurrency ?? 'MXN';
        this.calculateTotals(item);
      }
    }
  }

  save(): void {
    if (!this.form.valid || this.lineItems.length === 0) {
      this.toast.warning('Por favor completa todos los campos y agrega al menos un producto');
      return;
    }

    this.saving = true;
    const fv = this.form.getRawValue();
    const paymentCurrency = this.orderCurrency ?? this.lineItems[0]?.currency ?? 'MXN';
    const line_items = this.lineItems.map((li) => ({
      product_id: li.product_id,
      uom_id: li.uom_id,
      quantity: Number(li.quantity),
      unit_total: Number(li.unit_total),
      iva_percentage: Number(li.iva_percentage),
      ieps_percentage: Number(li.ieps_percentage),
      currency: li.currency || paymentCurrency
    }));

    const payload: WritePurchaseOrderDto = {
      fiscal_configuration_id: fv.fiscal_configuration_id,
      billing_branch_id: fv.billing_branch_id,
      warehouse_id: fv.warehouse_id,
      vendor_id: fv.vendor_id,
      expected_delivery_date: fv.expected_delivery_date,
      payment_currency: paymentCurrency,
      line_items
    };

    const ps = (fv.payment_status || '').trim();
    if (ps) {
      payload.payment_status = ps === 'Pagada' ? 'Pagado' : ps;
    }
    const notes = (fv.notes || '').trim();
    if (notes) {
      payload.notes = notes;
    }
    if (this.isInternationalVendor) {
      const pedimento = String(fv.pedimento_number || '').trim();
      payload.pedimento_number = pedimento || null;
    }

    this.purchaseOrderService.createOrder(payload).subscribe({
      next: (order) => {
        this.saving = false;
        this.cdr.detectChanges();
        this.toast.success('Orden de compra creada exitosamente');
        this.dialogRef.close(order);
      },
      error: (error) => {
        this.saving = false;
        this.cdr.detectChanges();
        console.error('Error creating order:', error);
        const errorMessage = error.message || error.error?.message || 'Error al crear la orden de compra';
        this.toast.error(errorMessage);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
