import { Component, Input, Output, EventEmitter, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Product } from '../../models/product.model';
import { getErrorMessage } from '../../utils/order-validators';
import { TaxCalculatorService } from '../../services/tax-calculator.service';

/**
 * LineItemFormComponent
 * 
 * Presentational component for line item form fields.
 * Handles product selection, UOM selection, quantity, unit price, and tax percentages.
 * Displays calculated values (subtotal, IVA, IEPS, total) in real-time.
 * 
 * @Input formGroup - The reactive form group containing line item fields
 * @Input products - List of available products for dropdown
 * @Output productSelect - Emits when a product is selected
 */
@Component({
  selector: 'app-line-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './line-item-form.component.html',
  styleUrls: ['./line-item-form.component.scss']
})
export class LineItemFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() products: Product[] = [];
  @Output() productSelect = new EventEmitter<Product>();

  // Signal for selected product
  selectedProduct = signal<Product | null>(null);

  // Computed: available UOMs for selected product
  availableUoms = computed(() => {
    const product = this.selectedProduct();
    return product?.uoms || [];
  });

  // Computed: line item calculations
  lineCalculations = computed(() => {
    const quantity = this.formGroup.get('quantity')?.value || 0;
    const unitPrice = this.formGroup.get('unit_price')?.value || 0;
    const ivaPercentage = this.formGroup.get('iva_percentage')?.value || 0;
    const iepsPercentage = this.formGroup.get('ieps_percentage')?.value || 0;

    return this.taxCalculator.calculateLineItem(
      quantity,
      unitPrice,
      ivaPercentage,
      iepsPercentage
    );
  });

  constructor(private taxCalculator: TaxCalculatorService) {}

  ngOnInit(): void {
    // Initialize selected product if product_id is already set
    const productId = this.formGroup.get('product_id')?.value;
    if (productId) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        this.selectedProduct.set(product);
      }
    }

    // Subscribe to product_id changes to update selected product
    this.formGroup.get('product_id')?.valueChanges.subscribe(productId => {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        this.selectedProduct.set(product);
        this.productSelect.emit(product);
      } else {
        this.selectedProduct.set(null);
      }
    });
  }

  /**
   * Get error message for a form field
   */
  getFieldError(fieldName: string): string | null {
    return getErrorMessage(this.formGroup.get(fieldName), fieldName);
  }

  /**
   * Format currency
   */
  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }
}
