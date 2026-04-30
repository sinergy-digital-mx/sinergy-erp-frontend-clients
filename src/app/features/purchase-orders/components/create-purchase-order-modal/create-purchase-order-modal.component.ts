import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { WritePurchaseOrderDto } from '../../models/filters.model';
import { FiscalConfigurationService } from '../../../../features/settings/services/fiscal-configuration.service';
import { WarehouseService } from '../../../../features/settings/services/warehouse.service';
import { VendorService } from '../../../../features/settings/services/vendor.service';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';

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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, TabComponent],
  templateUrl: './create-purchase-order-modal.component.html',
  styleUrls: ['./create-purchase-order-modal.component.scss']
})
export class CreatePurchaseOrderModalComponent implements OnInit {
  form: FormGroup;
  loading = false;
  saving = false;
  lineItems: LineItem[] = [];
  vendorProducts: any[] = [];
  loadingProducts = false;

  // Dropdowns data
  fiscalConfigurations: any[] = [];
  warehouses: any[] = [];
  vendors: any[] = [];
  filteredVendors: any[] = [];
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

  constructor(
    private fb: FormBuilder,
    private purchaseOrderService: PurchaseOrderService,
    private fiscalConfigService: FiscalConfigurationService,
    private warehouseService: WarehouseService,
    private vendorService: VendorService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
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
    this.form.get('vendor_search')?.valueChanges.subscribe((value) => {
      this.filterVendors(value ?? '');
    });
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
      this.vendorService.getVendors().toPromise()
    ]).then(([fiscalConfigs, warehouses, vendors]) => {
      // Handle different response formats - all endpoints return paginated responses with data property
      this.fiscalConfigurations = fiscalConfigs?.data || [];
      this.warehouses = warehouses?.data || [];
      const vendorRows = vendors?.data || [];
      this.vendors = vendorRows.map((vendor: any) => ({
        ...vendor,
        display_name: this.formatVendorLabel(vendor)
      }));
      this.filteredVendors = [...this.vendors];
      this.loading = false;
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error('Error loading dropdown data:', error);
      this.snackBar.open('Error al cargar datos', 'Cerrar', { duration: 3000 });
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
        this.snackBar.open('Error al cargar productos del proveedor', 'Cerrar', { duration: 3000 });
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

  private filterVendors(search: string): void {
    const raw =
      typeof search === 'string'
        ? search
        : (search as any)?.display_name || this.formatVendorLabel(search);
    const term = String(raw || '').toLowerCase().trim();
    if (!term) {
      this.filteredVendors = [...this.vendors];
      return;
    }
    this.filteredVendors = this.vendors.filter((vendor) =>
      String(vendor.display_name || '').toLowerCase().includes(term)
    );
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

  private formatVendorLabel(vendor: any): string {
    if (!vendor) return '';
    const name = (vendor.name || '').trim();
    const rfc = (vendor.rfc || '').trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  openAddProductModal(): void {
    if (!this.form.get('vendor_id')?.value) {
      this.snackBar.open('Selecciona un proveedor antes de agregar productos', 'Cerrar', { duration: 3000 });
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

  onSelectedUomChange(): void {
    const uom = this.selectedProductUoms.find((row) => row.uom_id === this.selectedUomId);
    if (!uom) return;
    this.selectedUnitTotal = Number(uom.cost || 0);
    this.selectedIva = Number(uom.iva_percentage || 0);
    this.selectedIeps = Number(uom.ieps_percentage || 0);
  }

  confirmAddProduct(): void {
    if (!this.selectedProduct || !this.selectedUomId) {
      this.snackBar.open('Selecciona producto y UOM', 'Cerrar', { duration: 2500 });
      return;
    }
    const quantity = Number(this.selectedQuantity || 0);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.snackBar.open('Cantidad inválida', 'Cerrar', { duration: 2500 });
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
      this.snackBar.open('Por favor completa todos los campos y agrega al menos un producto', 'Cerrar', { duration: 3000 });
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
        this.snackBar.open('Orden de compra creada exitosamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(order);
      },
      error: (error) => {
        this.saving = false;
        this.cdr.detectChanges();
        console.error('Error creating order:', error);
        const errorMessage = error.error?.message || 'Error al crear la orden de compra';
        this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
