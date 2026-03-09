# OrderFormComponent

Presentational component for the general order information form fields in the Purchase Orders module.

## Purpose

This component handles the display and validation of the main order fields:
- Vendor selection
- Purpose/description
- Warehouse selection  
- Tentative receipt date

## Usage

```typescript
import { OrderFormComponent } from './components/order-form/order-form.component';

// In your parent component
@Component({
  template: `
    <app-order-form
      [formGroup]="orderForm"
      [vendors]="vendors()"
      [warehouses]="warehouses()"
    />
  `
})
export class ParentComponent {
  orderForm = this.fb.group({
    vendor_id: ['', Validators.required],
    purpose: ['', Validators.required],
    warehouse_id: ['', Validators.required],
    tentative_receipt_date: ['', Validators.required]
  });
  
  vendors = signal<Vendor[]>([]);
  warehouses = signal<Warehouse[]>([]);
}
```

## Inputs

- `formGroup: FormGroup` - The reactive form group containing order fields (required)
- `vendors: Vendor[]` - List of available vendors for dropdown (default: [])
- `warehouses: Warehouse[]` - List of available warehouses for dropdown (default: [])

## Features

- **Validation**: Displays error messages below each field when invalid and touched
- **Required Fields**: All fields marked with asterisk (*)
- **Accessibility**: 
  - ARIA labels and roles
  - Error announcements with `role="alert"` and `aria-live="polite"`
  - `aria-invalid` and `aria-describedby` attributes
- **Responsive**: 
  - 2-column grid on desktop
  - Single column on tablet/mobile
  - Touch-friendly inputs on mobile (min 44px height)
- **Spanish Labels**: All UI text in Spanish

## Validation Messages

The component uses the `getErrorMessage` utility from `order-validators` to display:
- "Proveedor es requerido" - when vendor is not selected
- "Almacén es requerido" - when warehouse is not selected
- "Propósito es requerido" - when purpose is empty
- "Fecha tentativa de recepción es requerida" - when date is not selected

## Styling

The component uses CSS custom properties for theming:
- `--text-color` - Text color
- `--surface-border` - Border color
- `--surface-ground` - Background color
- `--primary-color` - Focus border color
- `--primary-color-alpha` - Focus shadow color
- `--red-500` - Error color

## Requirements Covered

- Requirements 1.2, 1.3, 1.4 - Vendor, warehouse, and date selection
- Requirements 13.1, 13.2, 13.3 - Field validation
- Requirements 10.1-10.6 - Responsive design
- Accessibility NFR - WCAG 2.1 Level AA compliance
