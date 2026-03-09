# LineItemFormComponent

## Overview

Presentational component for line item form fields in purchase orders. Handles product selection, UOM selection, quantity, unit price, and tax percentages. Displays calculated values (subtotal, IVA, IEPS, total) in real-time as the user types.

## Purpose

This component is used within the PurchaseOrderFormComponent to allow users to add and edit line items for purchase orders. It provides a user-friendly interface for entering product details and automatically calculates tax amounts and totals.

## Inputs

- `formGroup: FormGroup` - The reactive form group containing line item fields (product_id, uom_id, quantity, unit_price, iva_percentage, ieps_percentage)
- `products: Product[]` - List of available products for the dropdown

## Outputs

- `productSelect: EventEmitter<Product>` - Emits when a product is selected, allowing parent component to react (e.g., auto-fill UOM and price)

## Features

### Product Selection
- Dropdown with all available products
- Displays product name and SKU
- Emits event when product is selected

### UOM Selection
- Dynamically loads UOMs based on selected product
- Disabled until a product is selected
- Shows UOM name and abbreviation

### Input Fields
- Quantity: Number input with min 0.01, step 0.01
- Unit Price: Number input with min 0, step 0.01
- IVA Percentage: Number input with min 0, max 100
- IEPS Percentage: Number input with min 0, max 100

### Real-time Calculations
- Subtotal = quantity × unit_price
- IVA = subtotal × (iva_percentage / 100)
- IEPS = subtotal × (ieps_percentage / 100)
- Total = subtotal + IVA + IEPS
- All calculations update automatically as user types

### Validation
- All fields are required
- Quantity must be > 0
- Unit price must be >= 0
- Tax percentages must be between 0 and 100
- Error messages displayed below each field

### Accessibility
- ARIA labels and roles
- Error announcements with aria-live
- Keyboard navigation support
- Touch-friendly targets on mobile (min 44px)

### Responsive Design
- Desktop (>1024px): 3-column grid
- Tablet (768-1024px): 2-column grid
- Mobile (<768px): 1-column layout with optimized calculations display

## Usage Example

```typescript
// In parent component
import { LineItemFormComponent } from './components/line-item-form/line-item-form.component';

@Component({
  selector: 'app-purchase-order-form',
  imports: [LineItemFormComponent],
  template: `
    <app-line-item-form
      [formGroup]="lineItems.at(i)"
      [products]="products()"
      (productSelect)="onProductSelect(i, $event)"
    />
  `
})
export class PurchaseOrderFormComponent {
  products = signal<Product[]>([]);
  
  onProductSelect(index: number, product: Product): void {
    // Auto-fill UOM and price
    this.lineItems.at(index).patchValue({
      uom_id: product.base_uom_id,
      unit_price: product.cost
    });
  }
}
```

## Requirements Covered

- **1.5**: Product selection from dropdown
- **1.6**: UOM selection based on product
- **1.7**: Automatic calculation of subtotal, IVA, IEPS, total
- **13.5**: Quantity validation (must be > 0)
- **13.6**: Price validation (must be >= 0)
- **13.7**: Tax percentage validation (must be 0-100)
- **10.1-10.6**: Responsive layout for all devices

## Dependencies

- `TaxCalculatorService` - For calculating line item totals
- `order-validators` - For form validation and error messages
- `Product` model - For product data structure
- `FormGroup` from `@angular/forms` - For reactive form integration

## Testing

Unit tests are located in `line-item-form.component.spec.ts` and cover:
- Component initialization
- Product selection and UOM loading
- Real-time calculations
- Validation error display
- Responsive behavior

## Notes

- The component uses Angular Signals for reactive state management
- Calculations are performed using computed signals for optimal performance
- All monetary values are formatted with 2 decimal places
- The component follows the same pattern as OrderFormComponent for consistency
