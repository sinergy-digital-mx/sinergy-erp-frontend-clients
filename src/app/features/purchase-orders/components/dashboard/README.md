# Dashboard Component

## Overview

The DashboardComponent displays visual metrics for purchase orders using PrimeNG pie charts. It shows the distribution of orders by status and payment status.

## Features

- **Status Distribution Chart**: Shows orders grouped by "En Proceso", "Recibida", and "Cancelada"
- **Payment Status Distribution Chart**: Shows orders grouped by "Pagada", "Parcial", and "No pagado"
- **Responsive Grid Layout**: 
  - Desktop (>1024px): 3 columns
  - Tablet (768-1024px): 2 columns
  - Mobile (<768px): 1 column
- **Accessibility**: ARIA labels, roles, and screen reader support
- **Empty State Handling**: Shows appropriate message when no data is available

## Usage

```typescript
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  imports: [DashboardComponent],
  template: `
    <app-dashboard [orders]="orders()"></app-dashboard>
  `
})
export class MyComponent {
  orders = signal<PurchaseOrder[]>([]);
}
```

## Inputs

- `orders: PurchaseOrder[]` - Array of purchase orders to display metrics for

## Methods

### calculateStatusDistribution()
Calculates the distribution of orders by status (En Proceso, Recibida, Cancelada).

Returns: `StatusDistribution[]` with count and percentage for each status.

### calculatePaymentStatusDistribution()
Calculates the distribution of orders by payment status (Pagada, Parcial, No pagado).

Returns: `PaymentStatusDistribution[]` with count and percentage for each payment status.

## Chart Colors

### Status Chart
- **En Proceso**: Orange (#FFA726)
- **Recibida**: Green (#66BB6A)
- **Cancelada**: Red (#EF5350)

### Payment Status Chart
- **Pagada**: Green (#66BB6A)
- **Parcial**: Orange (#FFA726)
- **No pagado**: Red (#EF5350)

## Requirements Validated

- **9.1**: Dashboard displays in the module
- **9.2**: Shows "Por Estado" pie chart
- **9.3**: Shows "Estado de Pago" pie chart
- **9.4**: Calculates metrics from loaded data
- **10.1-10.6**: Responsive design for desktop, tablet, and mobile

## Testing

Unit tests are provided in `dashboard.component.spec.ts` covering:
- Component creation
- Status distribution calculation
- Payment status distribution calculation
- Chart data updates
- Chart color configuration

Run tests with:
```bash
npx vitest run src/app/features/purchase-orders/components/dashboard/dashboard.component.spec.ts
```

## Dependencies

- **PrimeNG**: Chart component
- **Chart.js**: Charting library (peer dependency of PrimeNG)
