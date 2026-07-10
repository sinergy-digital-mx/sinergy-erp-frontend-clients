import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LucideAngularModule, ExternalLink } from 'lucide-angular';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, switchMap, catchError, finalize, map } from 'rxjs/operators';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { WritePurchaseOrderDto } from '../../models/filters.model';
import { FiscalConfigurationService } from '../../../../features/settings/services/fiscal-configuration.service';
import { WarehouseService } from '../../../../features/settings/services/warehouse.service';
import { VendorService } from '../../../../features/settings/services/vendor.service';
import { VendorQueryParams } from '../../../../features/settings/models/vendor.model';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { ProductDetailModalComponent } from '../../../../features/settings/components/product-detail-modal/product-detail-modal.component';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';

const VENDOR_SEARCH_LIMIT = 100;
const VENDOR_SEARCH_MIN_CHARS = 2;

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
  vendorProducts: any[] = [];
  loadingProducts = false;

  // Dropdowns data
  fiscalConfigurations: any[] = [];
  warehouses: any[] = [];
  filteredVendors: any[] = [];
  loadingVendors = false;
  hasSearchedVendors = false;
  private destroy$ = new Subject<void>();
  tabs: TabItem[] = [
    { id: 'info', title: 'Información' },
    { id: 'products', title: 'Productos' }
  ];
  activeTab = 'info';
  addProductModalOpen = false;
  productSearchTerm = '';
  selectedProduct: any = null;
  selectedUomId = '';
  selectedQuantity = 1;
  selectedUnitTotal = 0;
  selectedIva = 16;
  selectedIeps = 0;
  readonly ExternalLink = ExternalLink;

  constructor(
    private fb: FormBuilder,
    private purchaseOrderService: PurchaseOrderService,
    private fiscalConfigService: FiscalConfigurationService,
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
      warehouse_id: ['', Validators.required],
      vendor_search: [''],
      vendor_id: ['', Validators.required],
      expected_delivery_date: ['', Validators.required],
      payment_status: ['Pendiente', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
    this.setupVendorSearch();
  }

  private setupVendorSearch(): void {
    this.form.get('vendor_search')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          if (value && typeof value !== 'string') {
            return of(null);
          }

          if (typeof value === 'string') {
            this.form.patchValue({ vendor_id: '' }, { emitEvent: false });
          }

          const term = typeof value === 'string' ? value.trim() : '';
          if (term.length < VENDOR_SEARCH_MIN_CHARS) {
            this.filteredVendors = [];
            this.hasSearchedVendors = false;
            this.loadingVendors = false;
            return of(null);
          }

          this.loadingVendors = true;
          const params: VendorQueryParams = {
            limit: VENDOR_SEARCH_LIMIT,
            status: 'active',
            search: term,
          };

          return this.vendorService.getVendors(params).pipe(
            map((response) => ({ term, response })),
            catchError((error) => {
              console.error('Error searching vendors:', error);
              this.toast.error('Error al buscar proveedores');
              return of({ term, response: { data: [] } });
            }),
            finalize(() => {
              this.loadingVendors = false;
              this.cdr.detectChanges();
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        if (!result) {
          this.cdr.detectChanges();
          return;
        }

        this.hasSearchedVendors = true;
        this.filteredVendors = (result.response?.data || []).map((vendor: any) => ({
          ...vendor,
          display_name: this.formatVendorLabel(vendor),
        }));
        this.cdr.detectChanges();
      });
  }

  get vendorSearchTooShort(): boolean {
    const value = this.form.get('vendor_search')?.value;
    if (value && typeof value !== 'string') {
      return false;
    }
    const term = String(value || '').trim();
    return term.length > 0 && term.length < VENDOR_SEARCH_MIN_CHARS;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
  }

  loadDropdownData(): void {
    this.loading = true;
    
    // Load all dropdown data in parallel
    Promise.all([
      this.fiscalConfigService.listFiscalConfigurations().toPromise(),
      this.warehouseService.getWarehouses().toPromise(),
    ]).then(([fiscalConfigs, warehouses]) => {
      this.fiscalConfigurations = fiscalConfigs?.data || [];
      this.warehouses = warehouses?.data || [];
      this.loading = false;
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('Error loading dropdown data:', error);
      this.toast.error('Error al cargar datos');
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  onVendorChange(): void {
    const vendorId = this.form.get('vendor_id')?.value;
    if (!vendorId) {
      this.vendorProducts = [];
      this.lineItems = [];
      this.resetAddProductForm();
      return;
    }

    this.loadingProducts = true;
    this.purchaseOrderService.getVendorProducts(vendorId).subscribe({
      next: (products) => {
        this.vendorProducts = products;
        this.lineItems = this.lineItems.map((item) => ({
          ...item,
          product_id: '',
          product_name: '',
          product_sku: '',
          uom_id: ''
        }));
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
    this.form.patchValue({
      vendor_id: vendor.id,
      vendor_search: vendor.display_name
    }, { emitEvent: false });
    this.onVendorChange();
  }

  displayVendor(vendor: any): string {
    if (!vendor) return '';
    if (typeof vendor === 'string') return vendor;
    return vendor?.display_name || this.formatVendorLabel(vendor) || '';
  }

  private formatVendorLabel(vendor: any): string {
    if (!vendor) return '';
    const name = (vendor.name || '').trim();
    const rfc = (vendor.rfc || '').trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  get filteredProductsForModal(): any[] {
    const raw =
      typeof this.productSearchTerm === 'string'
        ? this.productSearchTerm
        : this.getProductOptionLabel(this.productSearchTerm);
    const term = String(raw || '').toLowerCase().trim();
    if (!term) return this.vendorProducts;
    return this.vendorProducts.filter((product) => {
      const haystack = `${product.product_name || ''} ${product.product_sku || product.sku || ''}`.toLowerCase();
      return haystack.includes(term);
    });
  }

  get selectedProductUoms(): any[] {
    if (!this.selectedProduct) return [];
    return this.selectedProduct?.uoms || [];
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
    this.selectedUnitTotal = Number(firstUom?.cost || 0);
    this.selectedIva = Number(firstUom?.iva_percentage || 0);
    this.selectedIeps = Number(firstUom?.ieps_percentage || 0);
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
        const updated = products.find((product) => product.product_id === productId);
        if (!updated) {
          this.cdr.detectChanges();
          return;
        }

        this.selectedProduct = updated;
        this.productSearchTerm = updated;

        const uoms = updated.uoms || [];
        const uom =
          uoms.find((row: any) => row.uom_id === preferredUomId) ||
          uoms[0];

        if (uom) {
          this.selectedUomId = uom.uom_id;
          this.selectedUnitTotal = Number(uom.cost || 0);
          this.selectedIva = Number(uom.iva_percentage || 0);
          this.selectedIeps = Number(uom.ieps_percentage || 0);
        }

        this.cdr.detectChanges();
      },
      error: () => {
        this.toast.error('No se pudo actualizar la información del producto');
      },
    });
  }

  onSelectedUomChange(): void {
    const uom = this.selectedProductUoms.find((row) => row.uom_id === this.selectedUomId);
    if (!uom) return;
    this.selectedUnitTotal = Number(uom.cost || 0);
    this.selectedIva = Number(uom.iva_percentage || 0);
    this.selectedIeps = Number(uom.ieps_percentage || 0);
  }

  confirmAddProduct(): void {
    if (!this.selectedProduct || !this.selectedUomId) {
      this.toast.warning('Selecciona producto y UOM');
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
      ieps_unit: 0
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
    return `${name}${sku}`;
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
        item.unit_total = selectedUom.cost || 0;
        item.iva_percentage = selectedUom.iva_percentage || 0;
        item.ieps_percentage = selectedUom.ieps_percentage || 0;
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
    const fv = this.form.value;
    const line_items = this.lineItems.map((li) => ({
      product_id: li.product_id,
      uom_id: li.uom_id,
      quantity: Number(li.quantity),
      unit_total: Number(li.unit_total),
      iva_percentage: Number(li.iva_percentage),
      ieps_percentage: Number(li.ieps_percentage)
    }));

    const payload: WritePurchaseOrderDto = {
      fiscal_configuration_id: fv.fiscal_configuration_id,
      warehouse_id: fv.warehouse_id,
      vendor_id: fv.vendor_id,
      expected_delivery_date: fv.expected_delivery_date,
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
        const errorMessage = error.error?.message || 'Error al crear la orden de compra';
        this.toast.error(errorMessage);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
