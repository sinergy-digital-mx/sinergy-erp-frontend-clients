# LineItemsTableComponent

## Overview

The `LineItemsTableComponent` displays purchase order line items in a responsive table format with automatic totals calculation. It supports virtual scrolling for large datasets (> 50 items) and adapts to different screen sizes.

## Features

- **Responsive Design**: Table view on desktop/tablet, card view on mobile
- **Virtual Scrolling**: Automatically enabled for > 50 line items
- **Automatic Totals**: Calculates and displays subtotal, IVA, IEPS, and grand total
- **Currency Formatting**: All monetary amounts formatted with 2 decimals and currency symbol
- **Accessibility**: WCAG 2.1 Level AA compliant with proper ARIA labels
- **Performance**: OnPush change detection strategy for optimal performance

## Usage

```typescript
import { LineItemsTableComponent } from './components/line-items-table/line-items-table.component';

@Component({
  selector: 'app-purchase-order-detail',
  imports: [LineItemsTableComponent],
  template: `
    <app-line-items-table
      [lineItems]="order.line_items"
      [editable]="false"
      (lineItemChange)="onLineItemChange($event)"
      (lineItemRemove)="onLineItemRemove($event)"
    />
  `
})
export class PurchaseOrderDetailComponent {
  order: PurchaseOrder;

  onLineItemChange(item: LineItem): void {
    // Handle line item change
  }

  onLineItemRemove(index: number): void {
    // Handle line item removal
  }
}
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `lineItems` | `LineItem[]` | `[]` | Array of line items to display |
| `editable` | `boolean` | `false` | Whether line items can be edited/removed |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `lineItemChange` | `EventEmitter<LineItem>` | Emitted when a line item is changed (only if editable) |
| `lineItemRemove` | `EventEmitter<number>` | Emitted when a line item should be removed (only if editable) |

## Columns

The table displays the following columns:

1. **PRODUCTO**: Product name
2. **UOM**: Unit of measure abbreviation
3. **CANTIDAD**: Quantity
4. **PRECIO**: Unit price (formatted as currency)
5. **SUBTOTAL**: Line subtotal (formatted as currency)
6. **IVA**: IVA tax amount (formatted as currency)
7. **IEPS**: IEPS tax amount (formatted as currency)
8. **TOTAL**: Line total (formatted as currency)

## Totals Row

The component automatically calculates and displays totals:

- **Total Subtotal**: Sum of all line subtotals
- **Total IVA**: Sum of all IVA amounts
- **Total IEPS**: Sum of all IEPS amounts
- **Grand Total**: Sum of all line totals

## Virtual Scrolling

Virtual scrolling is automatically enabled when there are more than 50 line items. This improves performance by only rendering visible items in the viewport.

The viewport height is set to 400px and can be adjusted in the SCSS file.

## Responsive Behavior

### Desktop (> 1024px)
- Full table with all columns visible
- Sticky header for easy navigation
- Hover effects on rows

### Tablet (768px - 1024px)
- Full table with slightly reduced padding
- All columns visible

### Mobile (< 768px)
- Card-based layout instead of table
- Each line item displayed as a card
- Totals summary at the bottom
- Touch-optimized spacing

## Accessibility

The component follows WCAG 2.1 Level AA guidelines:

- Proper ARIA roles (`table`, `row`, `cell`, `columnheader`)
- ARIA labels for screen readers
- Keyboard navigation support
- Sufficient color contrast (4.5:1 minimum)
- Focus indicators for keyboard users

## Styling

The component uses BEM methodology for CSS classes:

- `.line-items-table-container`: Main container
- `.line-items-table`: Table element
- `.line-item-card`: Mobile card element
- `.totals-summary`: Totals section
- `.empty-state`: Empty state message

## Dependencies

- `@angular/common`: CommonModule for directives
- `@angular/cdk/scrolling`: ScrollingModule for virtual scrolling
- `TaxCalculatorService`: For currency formatting and totals calculation

## Requirements Validated

This component validates the following requirements:

- **3.4**: Display all line items with product, UOM, quantity, price, subtotal, taxes, total
- **11.7**: Format all monetary amounts with 2 decimals and currency symbol
- **15.7**: Add virtual scrolling if > 50 items
- **10.1-10.6**: Responsive layout for desktop, tablet, mobile

## Testing

Unit tests should cover:

- Table rendering with sample line items
- Totals calculation display
- Virtual scrolling activation (> 50 items)
- Empty state rendering
- Currency formatting
- Responsive layout switching

Property-based tests should verify:

- Currency formatting for any monetary amount
- Totals calculation for any collection of line items

## Performance Considerations

- Uses `OnPush` change detection strategy
- Virtual scrolling for large datasets
- `trackBy` function for efficient list rendering
- Minimal re-renders with immutable data patterns

## Future Enhancements

Potential improvements for future iterations:

- Inline editing of line items
- Sorting by column
- Filtering line items
- Export to CSV/Excel
- Print-optimized layout
