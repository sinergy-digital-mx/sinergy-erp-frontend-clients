import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { FiscalConfigurationService } from '../../../../features/settings/services/fiscal-configuration.service';
import { WarehouseService } from '../../../../features/settings/services/warehouse.service';
import { VendorService } from '../../../../features/settings/services/vendor.service';

interface LineItem {
  product_id: string;
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
      vendor_id: ['', Validators.required],
      expected_delivery_date: ['', Validators.required],
      payment_status: ['Pendiente', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
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
      this.vendors = vendors?.data || [];
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
      return;
    }

    this.loadingProducts = true;
    this.purchaseOrderService.getVendorProducts(vendorId).subscribe({
      next: (products) => {
        this.vendorProducts = products;
        this.loadingProducts = false;
      },
      error: (error) => {
        console.error('Error loading vendor products:', error);
        this.snackBar.open('Error al cargar productos del proveedor', 'Cerrar', { duration: 3000 });
        this.loadingProducts = false;
      }
    });
  }

  addLineItem(): void {
    const newItem: LineItem = {
      product_id: '',
      uom_id: '',
      quantity: 1,
      unit_total: 0,
      iva_percentage: 16,
      iva_unit: 0,
      ieps_percentage: 0,
      ieps_unit: 0
    };
    this.lineItems.push(newItem);
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
    const formData = {
      ...this.form.value,
      line_items: this.lineItems
    };

    this.purchaseOrderService.createOrder(formData).subscribe({
      next: (order) => {
        this.saving = false;
        this.snackBar.open('Orden de compra creada exitosamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(order);
      },
      error: (error) => {
        this.saving = false;
        console.error('Error creating order:', error);
        this.snackBar.open('Error al crear la orden de compra', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
