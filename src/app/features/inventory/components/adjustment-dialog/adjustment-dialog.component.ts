import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { ProductService } from '../../../purchase-orders/services/product.service';
import { WarehouseService } from '../../../purchase-orders/services/warehouse.service';
import { Product } from '../../../purchase-orders/models/product.model';
import { Warehouse } from '../../../purchase-orders/models/warehouse.model';

export interface AdjustmentFormData {
  product_id: string;
  warehouse_id: string;
  uom_id: string;
  quantity: number;
  unit_cost: number;
  notes?: string;
}

@Component({
  selector: 'app-adjustment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ButtonComponent
  ],
  templateUrl: './adjustment-dialog.component.html',
  styleUrls: ['./adjustment-dialog.component.scss']
})
export class AdjustmentDialogComponent implements OnInit {
  readonly X = X;
  loading = signal(false);
  
  form: FormGroup;
  products = signal<Product[]>([]);
  warehouses = signal<Warehouse[]>([]);
  filteredProducts = signal<Product[]>([]);
  showProductDropdown = signal(false);
  productSearchTerm = signal('');
  selectedProduct = signal<Product | null>(null);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdjustmentDialogComponent>,
    private productService: ProductService,
    private warehouseService: WarehouseService
  ) {
    // Initialize form with validation
    this.form = this.fb.group({
      product_id: ['', [Validators.required]],
      product_search: ['', [Validators.required]],
      warehouse_id: ['', [Validators.required]],
      uom_id: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unit_cost: ['', [Validators.required, Validators.min(0)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadWarehouses();
  }

  /**
   * Load products from API
   */
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        const productArray = Array.isArray(response) ? response : (response as any).data || [];
        this.products.set(productArray);
        this.filteredProducts.set(productArray);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  /**
   * Load warehouses from API
   */
  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (response) => {
        const warehouseArray = Array.isArray(response) ? response : (response as any).data || [];
        this.warehouses.set(warehouseArray);
      },
      error: (error) => {
        console.error('Error loading warehouses:', error);
      }
    });
  }

  /**
   * Filter products based on search term
   */
  onProductSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();
    this.productSearchTerm.set(searchTerm);
    this.showProductDropdown.set(true);

    if (!searchTerm) {
      this.filteredProducts.set(this.products());
      return;
    }

    const filtered = this.products().filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.sku?.toLowerCase().includes(searchTerm)
    );
    this.filteredProducts.set(filtered);
  }

  /**
   * Select a product from dropdown
   */
  selectProduct(product: Product): void {
    this.selectedProduct.set(product);
    this.form.patchValue({
      product_id: product.id,
      product_search: `${product.name} (${product.sku})`,
      uom_id: product.base_uom_id || '' // Pre-select base UoM
    });
    this.showProductDropdown.set(false);
  }

  /**
   * Show product dropdown on focus
   */
  onProductFocus(): void {
    this.showProductDropdown.set(true);
  }

  /**
   * Hide product dropdown
   */
  hideProductDropdown(): void {
    setTimeout(() => {
      this.showProductDropdown.set(false);
    }, 300);
  }

  /**
   * Close dialog without saving
   */
  closeDialog(): void {
    if (!this.loading()) {
      this.dialogRef.close(null);
    }
  }

  /**
   * Submit adjustment form
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const adjustmentData: AdjustmentFormData = {
      product_id: formValue.product_id,
      warehouse_id: formValue.warehouse_id,
      uom_id: formValue.uom_id,
      quantity: parseFloat(formValue.quantity),
      unit_cost: parseFloat(formValue.unit_cost),
      notes: formValue.notes || undefined
    };

    this.dialogRef.close(adjustmentData);
  }

  /**
   * Get validation error message for quantity field
   */
  getQuantityError(): string | null {
    const control = this.form.get('quantity');
    
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.errors['required']) {
      return 'La cantidad es requerida';
    }

    return 'Cantidad inválida';
  }
}
