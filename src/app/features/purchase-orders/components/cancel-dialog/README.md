# CancelDialogComponent

## Overview

The `CancelDialogComponent` is a Material Dialog component that provides a user interface for canceling purchase orders. It requires users to provide a mandatory cancellation reason before confirming the cancellation action.

## Features

- **Required Cancellation Reason**: Users must provide a reason for canceling the order
- **Form Validation**: Real-time validation with error messages
- **Focus Management**: Automatically focuses the textarea when the dialog opens for better accessibility
- **Accessibility**: Full WCAG 2.1 Level AA compliance with proper ARIA attributes
- **Responsive Design**: Adapts to different screen sizes (mobile, tablet, desktop)
- **Spanish UI**: All labels and messages are in Spanish

## Usage

### Opening the Dialog

```typescript
import { MatDialog } from '@angular/material/dialog';
import { CancelDialogComponent } from './components/cancel-dialog/cancel-dialog.component';

constructor(private dialog: MatDialog) {}

cancelOrder(): void {
  const dialogRef = this.dialog.open(CancelDialogComponent, {
    width: '500px',
    disableClose: true // Prevent closing by clicking outside
  });

  dialogRef.afterClosed().subscribe((cancellationReason: string | null) => {
    if (cancellationReason) {
      // User confirmed cancellation with a reason
      this.purchaseOrderService.cancelOrder(orderId, { cancellation_reason: cancellationReason })
        .subscribe({
          next: () => {
            this.notificationService.showSuccess('Orden cancelada exitosamente');
          },
          error: (error) => {
            this.notificationService.showError('Error al cancelar la orden');
          }
        });
    } else {
      // User cancelled the dialog (clicked Cancel or X button)
      console.log('Cancellation aborted');
    }
  });
}
```

## Component API

### Inputs

This component does not accept any inputs.

### Outputs

The component returns data through the `MatDialogRef.afterClosed()` observable:

- **Success**: Returns the cancellation reason as a `string` (trimmed)
- **Cancel**: Returns `null` when the user closes the dialog without confirming

### Methods

#### `closeDialog(): void`
Closes the dialog without saving, returning `null` to the caller.

#### `submit(): void`
Validates the form and closes the dialog with the cancellation reason if valid.

#### `getReasonError(): string | null`
Returns the appropriate error message for the cancellation_reason field, or `null` if no error.

## Form Structure

```typescript
{
  cancellation_reason: string // Required field
}
```

### Validation Rules

- **cancellation_reason**: Required field
  - Error message: "La razón de cancelación es requerida"

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Escape)
- **Focus Management**: Auto-focuses the textarea on dialog open
- **ARIA Attributes**:
  - `role="dialog"` on the dialog container
  - `aria-labelledby` pointing to the dialog title
  - `aria-modal="true"` to indicate modal behavior
  - `aria-required="true"` on the textarea
  - `aria-invalid` dynamically set based on validation state
  - `aria-describedby` linking to error messages
  - `role="alert"` on error messages for screen reader announcements
- **Screen Reader Support**: All interactive elements have proper labels

## Styling

The component uses a consistent styling pattern with other dialogs in the purchase orders module:

- **Dialog Overlay**: Semi-transparent black background
- **Dialog Container**: White background with rounded corners and shadow
- **Warning Info**: Orange/amber background to indicate the irreversible nature of the action
- **Form Elements**: Consistent with the design system
- **Buttons**: Secondary (Cancel) and Danger (Confirm) variants

### Responsive Behavior

- **Desktop (>768px)**: Standard dialog with max-width of 500px
- **Mobile (<768px)**: Full-screen dialog with stacked buttons

## Requirements Validation

This component validates the following requirements from the spec:

- **Requirement 6.1**: Shows dialog requesting cancellation reason when user clicks "Cancelar"
- **Requirement 6.2**: Only allows cancellation when order status is "En Proceso"
- **Requirement 6.4**: Records cancellation date and reason when cancellation is successful

## Testing

The component includes comprehensive unit tests covering:

- Form initialization and validation
- Error message display
- Dialog closing behavior
- Form submission with valid/invalid data
- Whitespace trimming
- Focus management
- Accessibility attributes
- UI element rendering

Run tests with:
```bash
npm test -- cancel-dialog.component.spec.ts
```

## Related Components

- **PaymentDialogComponent**: Similar dialog pattern for registering payments
- **PurchaseOrderDetailComponent**: Parent component that opens this dialog

## Notes

- The component automatically trims whitespace from the cancellation reason
- The dialog cannot be closed while loading (when `loading()` signal is true)
- The submit button is disabled when the form is invalid or loading
- The component follows Angular 17+ standalone component pattern
