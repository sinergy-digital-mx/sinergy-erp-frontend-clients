import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef, signal } from '@angular/core';
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
import { VendorService } from '../../../../features/settings/services/vendor.service';
import { Vendor } from '../../../../features/settings/models/vendor.model';
import { VendorDetailModalComponent } from '../../../../features/settings/components/vendor-detail-modal/vendor-detail-modal.component';
import { PurchaseOrderLocationBranch, PurchaseOrderLocationFiscal, PurchaseOrderLocationWarehouse, PurchaseOrderWarehouseLookup } from '../../models/purchase-order-location.model';
import {
  activePurchaseOrderBranches,
  activePurchaseOrderFiscals,
  activePurchaseOrderWarehouses,
  filterWarehouseLookups,
  flattenPurchaseOrderWarehouses,
  warehouseLookupLabel,
} from '../../utils/purchase-order-location.util';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { ProductDetailModalComponent } from '../../../../features/settings/components/product-detail-modal/product-detail-modal.component';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import {
  catalogInputNumber,
  formatVendorPickerLabel,
  collectVendorInvoiceInputs,
  PEDIMENTO_MAX_LENGTH,
  sortVendorsByLabel,
  VENDOR_INVOICE_MAX_COUNT,
  VENDOR_INVOICE_MAX_LENGTH,
} from '../../utils/purchase-order-display.util';
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
  quantity: number | null;
  unit_total: number | null;
  iva_percentage: number | null;
  iva_unit: number;
  ieps_percentage: number | null;
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
  locationTree: PurchaseOrderLocationFiscal[] = [];
  fiscalConfigurations: PurchaseOrderLocationFiscal[] = [];
  branches: PurchaseOrderLocationBranch[] = [];
  warehouses: PurchaseOrderLocationWarehouse[] = [];
  warehouseLookups: PurchaseOrderWarehouseLookup[] = [];
  filteredWarehouseLookups: PurchaseOrderWarehouseLookup[] = [];
  vendorOptions: any[] = [];
  filteredVendors: any[] = [];
  loadingVendors = false;
  locationHint = '';
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
  selectedQuantity: number | null = null;
  selectedUnitTotal: number | null = null;
  selectedIva: number | null = null;
  selectedIeps: number | null = null;
  selectedCurrency: VendorCostCurrency = 'MXN';
  selectedCurrencyLocked = false;
  readonly ExternalLink = ExternalLink;
  readonly Pencil = Pencil;
  readonly Plus = Plus;
  readonly ChevronDown = ChevronDown;
  readonly pedimentoMaxLength = PEDIMENTO_MAX_LENGTH;
  readonly vendorInvoiceMaxLength = VENDOR_INVOICE_MAX_LENGTH;
  readonly vendorInvoiceMaxCount = VENDOR_INVOICE_MAX_COUNT;
  vendorInvoiceInputs = signal<string[]>(['']);
  selectedVendor: (Vendor & { display_name?: string }) | null = null;

  constructor(
    private fb: FormBuilder,
    private purchaseOrderService: PurchaseOrderService,
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
      warehouse_search: [''],
      vendor_search: [''],
      vendor_id: ['', Validators.required],
      expected_delivery_date: ['', Validators.required],
      payment_status: ['Pendiente', Validators.required],
      pedimento_number: ['', [Validators.maxLength(PEDIMENTO_MAX_LENGTH)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadLocations();
    this.setupLocationCascade();
    this.loadVendorOptions();
    this.setupVendorSearch();
    this.setupWarehouseSearch();
  }

  private loadLocations(): void {
    this.loading = true;
    this.purchaseOrderService.getLocations().subscribe({
      next: (res) => {
        this.locationTree = res.data ?? [];
        this.fiscalConfigurations = activePurchaseOrderFiscals(this.locationTree);
        this.warehouseLookups = flattenPurchaseOrderWarehouses(
          this.locationTree,
          res.unassigned_warehouses ?? [],
        );
        this.filteredWarehouseLookups = this.warehouseLookups;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toast.error('Error al cargar razones sociales y almacenes');
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  private setupLocationCascade(): void {
    this.form.get('fiscal_configuration_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((fiscalId) => {
        this.applyFiscal(fiscalId, { resetChildren: true });
        this.cdr.detectChanges();
      });

    this.form.get('billing_branch_id')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((branchId) => {
        this.applyBranch(branchId, { resetWarehouse: true });
        this.cdr.detectChanges();
      });
  }

  private setupWarehouseSearch(): void {
    this.form.get('warehouse_search')?.valueChanges
      .pipe(debounceTime(120), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value && typeof value !== 'string') {
          return;
        }
        this.filteredWarehouseLookups = filterWarehouseLookups(this.warehouseLookups, value || '');
        this.cdr.detectChanges();
      });
  }

  private applyFiscal(fiscalId: string, options: { resetChildren: boolean }): void {
    const fiscal = this.fiscalConfigurations.find((item) => item.id === fiscalId);
    if (options.resetChildren) {
      this.form.patchValue({ billing_branch_id: '', warehouse_id: '' }, { emitEvent: false });
    }
    this.branches = activePurchaseOrderBranches(fiscal);
    this.warehouses = [];
    this.locationHint = '';

    if (fiscalId) {
      this.form.get('billing_branch_id')?.enable({ emitEvent: false });
      if (!this.branches.length) {
        this.locationHint = 'Esta razón social no tiene sucursales activas.';
      }
    } else {
      this.form.get('billing_branch_id')?.disable({ emitEvent: false });
    }
    this.form.get('warehouse_id')?.disable({ emitEvent: false });
  }

  private applyBranch(branchId: string, options: { resetWarehouse: boolean }): void {
    const fiscalId = this.form.get('fiscal_configuration_id')?.value;
    const fiscal = this.fiscalConfigurations.find((item) => item.id === fiscalId);
    const branch = this.branches.find((item) => item.id === branchId)
      ?? fiscal?.branches.find((item) => item.id === branchId);
    if (options.resetWarehouse) {
      this.form.patchValue({ warehouse_id: '' }, { emitEvent: false });
    }
    this.warehouses = activePurchaseOrderWarehouses(branch);
    this.locationHint = '';

    if (branchId) {
      this.form.get('warehouse_id')?.enable({ emitEvent: false });
      if (!this.warehouses.length) {
        this.locationHint = 'Esta sucursal no tiene almacenes activos. Revisa que el CEDIS / bodega tenga sucursal asignada.';
      }
    } else {
      this.form.get('warehouse_id')?.disable({ emitEvent: false });
    }
  }

  branchLabel(branch: PurchaseOrderLocationBranch): string {
    return branch.name?.trim() || '—';
  }

  displayWarehouseLookup = (item: PurchaseOrderWarehouseLookup | string | null): string => {
    if (!item) {
      return '';
    }
    if (typeof item === 'string') {
      return item;
    }
    return warehouseLookupLabel(item);
  };

  onWarehouseLookupFocus(): void {
    const term = String(this.form.get('warehouse_search')?.value || '');
    this.filteredWarehouseLookups = filterWarehouseLookups(
      this.warehouseLookups,
      typeof term === 'string' ? term : '',
    );
  }

  onWarehouseLookupSelected(item: PurchaseOrderWarehouseLookup): void {
    if (!item?.id) {
      return;
    }
    if (!item.assigned || !item.fiscalId || !item.branchId) {
      this.toast.warning(
        `${item.name} no tiene sucursal ni razón social. Asígnasela en Configuración → Almacenes.`,
      );
      this.form.patchValue({ warehouse_search: '' }, { emitEvent: false });
      this.filteredWarehouseLookups = this.warehouseLookups;
      this.cdr.detectChanges();
      return;
    }

    this.form.patchValue({ fiscal_configuration_id: item.fiscalId }, { emitEvent: false });
    this.applyFiscal(item.fiscalId, { resetChildren: false });
    this.form.patchValue({ billing_branch_id: item.branchId }, { emitEvent: false });
    this.applyBranch(item.branchId, { resetWarehouse: false });
    this.form.patchValue({ warehouse_id: item.id, warehouse_search: item.name }, { emitEvent: false });
    this.cdr.detectChanges();
  }

  private loadVendorOptions(): void {
    this.loadingVendors = true;
    this.vendorService.getAllActiveVendors().subscribe({
      next: (vendors) => {
        this.vendorOptions = sortVendorsByLabel(
          vendors.map((vendor) => ({
            ...vendor,
            display_name: this.formatVendorLabel(vendor),
          })),
          (vendor) => vendor.display_name || '',
        );
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

  canAddVendorInvoice(): boolean {
    return this.vendorInvoiceInputs().length < this.vendorInvoiceMaxCount;
  }

  addVendorInvoice(): void {
    if (!this.canAddVendorInvoice()) {
      return;
    }
    this.vendorInvoiceInputs.update((current) => [...current, '']);
  }

  removeVendorInvoice(index: number): void {
    this.vendorInvoiceInputs.update((current) => {
      const next = current.filter((_, i) => i !== index);
      return next.length ? next : [''];
    });
  }

  updateVendorInvoice(index: number, value: string): void {
    this.vendorInvoiceInputs.update((current) =>
      current.map((item, i) => (i === index ? value : item))
    );
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
      this.vendorOptions = sortVendorsByLabel(
        [this.selectedVendor, ...this.vendorOptions],
        (row) => row.display_name || '',
      );
    }
    this.filteredVendors = this.filterVendorsLocally('');
    if (reloadProducts) {
      this.onVendorChange();
    }
    this.cdr.detectChanges();
  }

  private formatVendorLabel(vendor: any): string {
    return formatVendorPickerLabel(vendor);
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
      this.selectedUnitTotal = null;
      this.selectedIva = null;
      this.selectedIeps = null;
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

    this.selectedUnitTotal = catalogInputNumber(uom.cost);
    this.selectedIva = catalogInputNumber(uom.iva_percentage);
    this.selectedIeps = catalogInputNumber(uom.ieps_percentage);
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
      unit_total: this.selectedUnitTotal,
      iva_percentage: this.selectedIva,
      iva_unit: 0,
      ieps_percentage: this.selectedIeps,
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
    this.selectedQuantity = null;
    this.selectedUnitTotal = null;
    this.selectedIva = null;
    this.selectedIeps = null;
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
    const unit = Number(item.unit_total || 0);
    const iva = Number(item.iva_percentage || 0);
    const ieps = Number(item.ieps_percentage || 0);
    item.iva_unit = (unit * iva) / 100;
    item.ieps_unit = (unit * ieps) / 100;
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
      item.unit_total = catalogInputNumber(defaultUom.cost);
      item.iva_percentage = catalogInputNumber(defaultUom.iva_percentage);
      item.ieps_percentage = catalogInputNumber(defaultUom.ieps_percentage);
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
        item.unit_total = catalogInputNumber(selectedUom.cost);
        item.iva_percentage = catalogInputNumber(selectedUom.iva_percentage);
        item.ieps_percentage = catalogInputNumber(selectedUom.ieps_percentage);
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
      unit_total: Number(li.unit_total || 0),
      iva_percentage: Number(li.iva_percentage || 0),
      ieps_percentage: Number(li.ieps_percentage || 0),
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
    payload.vendor_invoice_numbers = collectVendorInvoiceInputs(this.vendorInvoiceInputs());

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
