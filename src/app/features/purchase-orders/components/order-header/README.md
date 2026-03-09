# OrderHeaderComponent

## Overview

The OrderHeaderComponent displays the header section of a purchase order detail page, showing key order information and action buttons based on user permissions and order status.

## Features

- Displays order information: folio, vendor, warehouse, dates, status, purpose
- Shows status badge with color-coded styling
- Displays cancellation reason when applicable
- Action buttons with permission-based visibility:
  - **Editar**: Edit the order (shown when canEdit is true)
  - **Cambiar Estado**: Change order status (shown when canChangeStatus is true and status is "En Proceso")
  - **Cancelar**: Cancel the order (shown when status is "En Proceso")
  - **Eliminar**: Delete the order (shown when canDelete is true)
- Responsive layout (desktop/tablet/mobile)
- Accessible with ARIA labels and keyboard navigation

## Usage

```typescript
import { OrderHeaderComponent } from './components/order-header/order-header.component';

@Component({
  imports: [OrderHeaderComponent]
})
export class PurchaseOrderDetailComponent {
  order = signal<PurchaseOrder>(...);
  canEdit = computed(() => ...);
  canDelete = computed(() => ...);
  canChangeStatus = computed(() => ...);
}
```

```html
<app-order-header
  [order]="order()!"
  [canEdit]="canEdit()"
  [canDelete]="canDelete()"
  [canChangeStatus]="canChangeStatus()"
  (edit)="editOrder()"
  (changeStatus)="changeStatus('Recibida')"
  (cancel)="cancelOrder()"
  (delete)="deleteOrder()"
></app-order-header>
```

## Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| order | PurchaseOrder | Yes | The purchase order to display |
| canEdit | boolean | No | Whether the user can edit the order (default: false) |
| canDelete | boolean | No | Whether the user can delete the order (default: false) |
| canChangeStatus | boolean | No | Whether the user can change order status (default: false) |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| edit | void | Emitted when the edit button is clicked |
| changeStatus | void | Emitted when the change status button is clicked |
| cancel | void | Emitted when the cancel button is clicked |
| delete | void | Emitted when the delete button is clicked |

## Status Badge Styling

The component uses color-coded badges for order status:

- **En Proceso**: Orange background (#fff3e0) with dark orange text (#e65100)
- **Recibida**: Green background (#e8f5e9) with dark green text (#2e7d32)
- **Cancelada**: Red background (#ffebee) with dark red text (#c62828)

## Button Visibility Logic

| Button | Visibility Condition |
|--------|---------------------|
| Editar | canEdit === true |
| Cambiar Estado | canChangeStatus === true AND order.status === 'En Proceso' |
| Cancelar | order.status === 'En Proceso' |
| Eliminar | canDelete === true |

## Responsive Behavior

- **Desktop (>1024px)**: Two-column grid layout for order fields, buttons in a row
- **Tablet (768px-1024px)**: Two-column grid layout, buttons in a row
- **Mobile (<768px)**: Single-column layout, buttons stacked vertically

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Enter, Space)
- Minimum touch target size of 44x44px on mobile
- Color contrast meets WCAG 2.1 Level AA standards
- Screen reader friendly with semantic HTML

## Styling

The component uses BEM methodology for CSS classes:
- `.order-header` - Main container
- `.order-header__info` - Information section
- `.order-header__row` - Row of fields
- `.order-header__field` - Individual field
- `.order-header__actions` - Action buttons section
- `.status-badge` - Status badge
- `.btn` - Button base class with modifiers (--primary, --success, --warning, --danger)

## Requirements Covered

- Requirements 3.3: Display order information
- Requirements 3.8: Show action buttons based on permissions
- Requirements 3.9: Show/hide buttons based on order status
- Requirements 3.10: Display status badge
- Requirements 10.1-10.6: Responsive design for all devices

## Related Components

- `PurchaseOrderDetailComponent` - Parent component that uses this header
- `LineItemsTableComponent` - Displays order line items
- `PaymentsListComponent` - Displays order payments
