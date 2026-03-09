import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { VendorService } from '../../services/vendor.service';
import { ProductService } from '../../services/product.service';
import { WarehouseService } from '../../services/warehouse.service';
import { Vendor } from '../../models/vendor.model';
import { Product } from '../../models/product.model';
import { Warehouse } from '../../models/warehouse.model';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { validateQuantity, validatePrice, validateTaxPercentage, getErrorMessage } from '../../utils/order-validators';

@Component({
  selector: 'app-purchase-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-order-form.component.html',
  styleUrls: ['./purchase-order-form.component.scss']
})
export class PurchaseOrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  isEditMode = signal<boolean>(false);
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);
  
  // Data for dropdowns
  vendors = signal<Vendor[]>([]);
  products = signal<Product[]>([]);
  warehouses = signal<Warehouse[]>([]);
  
  // Signal for totals (updated on form changes)
  totalCalculations = signal({
    total_subtotal: 0,
    total_iva: 0,
    total_ieps: 0,
    grand_total: 0
  });

  get lineItems(): FormArray {
    return this.orderForm.get('line_items') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private taxCalculator: TaxCalculatorService,
    private vendorService: VendorService,
    private productService: ProductService,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownData();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.loadOrder(id);
    }
  }

  /**
   * Initialize form
   */
  initForm(order?: PurchaseOrder): void {
    this.orderForm = this.fb.group({
      vendor_id: [order?.vendor_id || '', Validators.required],
      purpose: [order?.purpose || '', Validators.required],
      warehouse_id: [order?.warehouse_id || '', Validators.required],
      tentative_receipt_date: [order?.tentative_receipt_date || '', Validators.required],
      line_items: this.fb.array([], Validators.minLength(1))
    });
    
    if (order?.line_items) {
      order.line_items.forEach(item => {
        this.addLineItem(item);
      });
    }

    // Subscribe to form changes to recalculate totals
    this.orderForm.get('line_items')?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }

  /**
   * Calculate totals from line items
   */
  calculateTotals(): void {
    const lineItems = this.lineItems.value;
    
    if (!lineItems || lineItems.length === 0) {
      this.totalCalculations.set({
        total_subtotal: 0,
        total_iva: 0,
        total_ieps: 0,
        grand_total: 0
      });
      return;
    }
    
    let total_subtotal = 0;
    let total_iva = 0;
    let total_ieps = 0;
    let grand_total = 0;
    
    lineItems.forEach((item: any) => {
      const calculations = this.taxCalculator.calculateLineItem(
        item.quantity || 0,
        item.unit_price || 0,
        item.iva_percentage || 0,
        item.ieps_percentage || 0
      );
      
      total_subtotal += calculations.subtotal;
      total_iva += calculations.iva_amount;
      total_ieps += calculations.ieps_amount;
      grand_total += calculations.line_total;
    });
    
    this.totalCalculations.set({
      total_subtotal,
      total_iva,
      total_ieps,
      grand_total
    });
  }

  /**
   * Load dropdown data
   */
  loadDropdownData(): void {
    this.vendorService.getVendors().subscribe({
      next: (vendors) => {
        console.log('Vendors response:', vendors);
        // Handle both array and {data: array} formats
        const vendorArray = Array.isArray(vendors) ? vendors : (vendors as any).data || [];
        this.vendors.set(vendorArray);
      },
      error: (error) => console.error('Error loading vendors:', error)
    });
    
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Products response:', products);
        // Handle both array and {data: array} formats
        const productArray = Array.isArray(products) ? products : (products as any).data || [];
        this.products.set(productArray);
      },
      error: (error) => console.error('Error loading products:', error)
    });
    
    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        console.log('Warehouses response:', warehouses);
        // Handle both array and {data: array} formats
        const warehouseArray = Array.isArray(warehouses) ? warehouses : (warehouses as any).data || [];
        this.warehouses.set(warehouseArray);
      },
      error: (error) => console.error('Error loading warehouses:', error)
    });
  }

  /**
   * Load order for editing
   */
  loadOrder(id: string): void {
    this.loading.set(true);
    
    this.purchaseOrderService.getOrderById(id).subscribe({
      next: (order) => {
        this.initForm(order);
        this.loading.set(false);
      },
      error: (error) => {
        alert(`Error: ${error.message}`);
        this.loading.set(false);
      }
    });
  }

  /**
   * Create line item form group
   */
  createLineItemFormGroup(item?: any): FormGroup {
    return this.fb.group({
      product_id: [item?.product_id || '', Validators.required],
      uom_id: [item?.uom_id || '', Validators.required],
      quantity: [item?.quantity || 1, [Validators.required, validateQuantity()]],
      unit_price: [item?.unit_price || 0, [Validators.required, validatePrice()]],
      iva_percentage: [item?.iva_percentage || 16, [Validators.required, validateTaxPercentage()]],
      ieps_percentage: [item?.ieps_percentage || 0, [Validators.required, validateTaxPercentage()]]
    });
  }

  /**
   * Add line item
   */
  addLineItem(item?: any): void {
    this.lineItems.push(this.createLineItemFormGroup(item));
  }

  /**
   * Remove line item
   */
  removeLineItem(index: number): void {
    this.lineItems.removeAt(index);
  }

  /**
   * Get product by ID
   */
  getProduct(productId: string): Product | undefined {
    const products = this.products();
    return products ? products.find(p => p.id === productId) : undefined;
  }

  /**
   * On product selection, update UOM
   */
  onProductSelect(index: number, productId: string): void {
    const product = this.getProduct(productId);
    if (product && product.uoms && product.uoms.length > 0) {
      this.lineItems.at(index).patchValue({
        uom_id: product.base_uom_id,
        unit_price: product.cost
      });
    }
  }

  /**
   * Get line item calculations
   */
  getLineCalculations(index: number): any {
    const item = this.lineItems.at(index).value;
    return this.taxCalculator.calculateLineItem(
      item.quantity || 0,
      item.unit_price || 0,
      item.iva_percentage || 0,
      item.ieps_percentage || 0
    );
  }

  /**
   * Get error message for field
   */
  getFieldError(fieldName: string): string | null {
    return getErrorMessage(this.orderForm.get(fieldName), fieldName);
  }

  /**
   * Get error message for line item field
   */
  getLineItemFieldError(index: number, fieldName: string): string | null {
    return getErrorMessage(this.lineItems.at(index).get(fieldName), fieldName);
  }

  /**
   * Save order
   */
  save(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      alert('Por favor, completa todos los campos requeridos');
      return;
    }
    
    this.saving.set(true);
    const formData = this.orderForm.value;
    
    console.log('Form data being sent:', formData);
    console.log('Line items:', formData.line_items);
    
    if (this.isEditMode()) {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.purchaseOrderService.updateOrder(id, formData).subscribe({
        next: (order) => {
          alert('Orden actualizada exitosamente');
          this.router.navigate(['/purchase-orders', order.id]);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
          this.saving.set(false);
        }
      });
    } else {
      this.purchaseOrderService.createOrder(formData).subscribe({
        next: (order) => {
          alert('Orden creada exitosamente');
          this.router.navigate(['/purchase-orders', order.id]);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
          this.saving.set(false);
        }
      });
    }
  }

  /**
   * Cancel and go back
   */
  cancel(): void {
    if (confirm('¿Descartar cambios?')) {
      this.router.navigate(['/purchase-orders']);
    }
  }

  /**
   * Format currency
   */
  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }
}
