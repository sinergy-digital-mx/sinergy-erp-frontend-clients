# PaymentDialogComponent

## Overview

The `PaymentDialogComponent` is a modal dialog component used to register payments for purchase orders. It provides a form interface for entering payment details with validation to ensure the payment amount does not exceed the remaining balance.

## Features

- **Reactive Form Validation**: Uses Angular Reactive Forms with built-in validators
- **Amount Validation**: Ensures payment amount is greater than zero and does not exceed remaining amount
- **Remaining Amount Display**: Shows the current outstanding balance prominently
- **Payment Method Selection**: Dropdown with common payment methods (Transferencia, Efectivo, Cheque, Tarjeta)
- **Optional Fields**: Reference and notes fields for additional payment information
- **Accessibility**: Full ARIA labels, keyboard navigation, and focus management
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens
- **Loading State**: Prevents dialog closure during submission

## Usage

### Opening the Dialog

```typescript
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent, PaymentFormData } from './payment-dialog.component';

constructor(private dialog: MatDialog) {}

registerPayment(): void {
  const dialogRef = this.dialog.open(PaymentDialogComponent, {
    width: '500px',
    data: {
      remainingAmount: 1000.00
    },
    disableClose: false
  });

  dialogRef.afterClosed().subscribe((paymentData: PaymentFormData | null) => {
    if (paymentData) {
      // Process the payment
      console.log('Payment data:', paymentData);
    }
  });
}
```

### Input Data

The dialog expects a `PaymentDialogData` object:

```typescript
interface PaymentDialogData {
  remainingAmount: number;  // The outstanding balance
}
```

### Output Data

When the user submits the form, the dialog returns a `PaymentFormData` object:

```typescript
interface PaymentFormData {
  amount: number;           // Payment amount (required)
  payment_date: string;     // ISO date string (required)
  payment_method: string;   // Payment method (required)
  reference?: string;       // Optional reference number
  notes?: string;          // Optional notes
}
```

If the user cancels, the dialog returns `null`.

## Form Fields

### Required Fields

1. **Monto (Amount)**
   - Type: Number
   - Validation: Required, min: 0.01, max: remainingAmount
   - Error messages:
     - "El monto es requerido"
     - "El monto debe ser mayor a cero"
     - "El monto no puede exceder el saldo pendiente ($X,XXX.XX)"

2. **Fecha de Pago (Payment Date)**
   - Type: Date
   - Validation: Required
   - Default: Current date
   - Error message: "La fecha de pago es requerida"

3. **Método de Pago (Payment Method)**
   - Type: Select
   - Options: Transferencia, Efectivo, Cheque, Tarjeta
   - Default: Transferencia
   - Validation: Required
   - Error message: "El método de pago es requerido"

### Optional Fields

4. **Referencia (Reference)**
   - Type: Text
   - Placeholder: "Número de referencia o folio"

5. **Notas (Notes)**
   - Type: Textarea
   - Placeholder: "Notas adicionales sobre el pago"
   - Rows: 3

## Validation Rules

- **Amount > 0**: Payment must be a positive number
- **Amount <= Remaining Amount**: Cannot pay more than what is owed
- **Date Required**: Payment date must be provided
- **Method Required**: Payment method must be selected

## Accessibility Features

- **ARIA Labels**: All form fields have proper labels and descriptions
- **ARIA Invalid**: Form fields indicate invalid state to screen readers
- **ARIA Required**: Required fields are marked for assistive technologies
- **Focus Management**: First input receives focus when dialog opens
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Escape)
- **Error Announcements**: Validation errors are announced to screen readers
- **Role Attributes**: Dialog has proper role="dialog" and aria-modal="true"

## Responsive Behavior

### Desktop (>768px)
- Fixed width: 500px
- Horizontal button layout
- Standard padding

### Mobile (<768px)
- Full screen width
- Vertical button layout (stacked)
- Full-width buttons
- Adjusted padding for touch targets

## Styling

The component uses SCSS with BEM methodology and follows the project's design system:

- **Colors**: Uses project color palette
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standard padding and margins
- **Transitions**: Smooth hover and focus effects
- **Shadows**: Material Design elevation

## Testing

The component includes comprehensive unit tests covering:

- Form initialization
- Validation rules
- Error messages
- Submit behavior
- Cancel behavior
- Currency formatting
- Edge cases

Run tests with:
```bash
npm test -- --include="**/payment-dialog.component.spec.ts"
```

## Integration

This component is used in:
- `PurchaseOrderDetailComponent`: For registering payments on purchase orders

## Requirements Satisfied

This component satisfies the following requirements from the spec:

- **Requirement 7.2**: Form with amount, payment_date, payment_method, reference, notes
- **Requirement 7.3**: Validation that amount > 0 and amount <= remainingAmount
- **Requirement 7.8**: Shows remaining amount in dialog
- **Accessibility NFR**: Focus management and WCAG 2.1 Level AA compliance

## Future Enhancements

Potential improvements for future iterations:

- Multiple payment methods selection
- Attachment upload for payment receipts
- Payment schedule/installments
- Currency conversion support
- Payment history preview
