# Implementation Plan: Purchase Orders Module

## Overview

Este plan descompone la implementación del módulo de Purchase Orders en tareas ejecutables organizadas por fases. El módulo es una aplicación Angular standalone que gestiona el ciclo completo de órdenes de compra, desde su creación hasta su recepción y pago, con integración a APIs REST existentes.

**Tecnologías**: Angular 17+ (Standalone Components), PrimeNG, RxJS + Signals, Reactive Forms, Vitest + fast-check

**Estructura**: 13 componentes, 5 servicios, 7 modelos, routing y utilidades de validación

## Tasks

### Phase 1: Core Infrastructure

- [x] 1. Setup module structure and core models
  - [x] 1.1 Create directory structure for purchase-orders feature
    - Create folders: components/, pages/, services/, models/, utils/
    - Create purchase-orders.routes.ts file
    - _Requirements: All requirements depend on this structure_

  - [x] 1.2 Implement core data models
    - Create purchase-order.model.ts with PurchaseOrder, OrderStatus, PaymentStatus interfaces
    - Create line-item.model.ts with LineItem interface
    - Create payment.model.ts with Payment interface
    - Create vendor.model.ts with Vendor interface
    - Create product.model.ts with Product, UnitOfMeasure interfaces
    - Create warehouse.model.ts with Warehouse interface
    - Create filters.model.ts with OrderFilters, PaginationParams, PaginatedResponse, LineItemCalculations, TotalCalculations, DashboardMetrics interfaces
    - _Requirements: 1.1-1.10, 2.1-2.10, 3.1-3.10, 4.1-4.10_

  - [ ]* 1.3 Write property test for tax calculation formulas
    - **Property 1: Line Item Tax Calculations**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.4**
    - Test that for any quantity, unit_price, iva_percentage, ieps_percentage: subtotal = quantity × unit_price, iva_amount = subtotal × (iva_percentage / 100), ieps_amount = subtotal × (ieps_percentage / 100), line_total = subtotal + iva_amount + ieps_amount

- [x] 2. Implement base services
  - [x] 2.1 Create TaxCalculatorService
    - Implement calculateLineItem() method with formulas for subtotal, IVA, IEPS, line total
    - Implement calculateOrderTotals() method to sum all line items
    - Implement calculateRemainingAmount() method
    - Implement determinePaymentStatus() method
    - Implement formatCurrency() method
    - _Requirements: 11.1-11.8, 1.7, 1.8_

  - [ ]* 2.2 Write unit tests for TaxCalculatorService
    - Test standard calculations, zero quantity, zero price edge cases
    - Test payment status determination for fully paid, partially paid, not paid
    - _Requirements: 11.1-11.8_

  - [ ]* 2.3 Write property test for order totals calculation
    - **Property 2: Order Total Calculations**
    - **Validates: Requirements 1.8, 11.5**
    - Test that for any collection of line items: total_subtotal = Σ(subtotals), total_iva = Σ(iva_amounts), total_ieps = Σ(ieps_amounts), grand_total = Σ(line_totals)

  - [x] 2.4 Create VendorService
    - Implement getVendors() method to fetch from /tenant/vendors
    - Implement searchVendors() method with query parameter
    - Add caching with 5-minute duration
    - _Requirements: 1.3_

  - [x] 2.5 Create ProductService
    - Implement getProducts() method to fetch from /tenant/products
    - Implement searchProducts() method with query parameter
    - Implement getProductById() method to fetch product with UOMs
    - Add caching with 5-minute duration
    - _Requirements: 1.5, 1.6_

  - [x] 2.6 Create WarehouseService
    - Implement getWarehouses() method to fetch from /tenant/warehouses
    - Add caching with 5-minute duration
    - _Requirements: 1.4_

  - [x] 2.7 Create PurchaseOrderService with CRUD operations
    - Implement getOrders() method with filters and pagination (GET /tenant/purchase-orders)
    - Implement getOrderById() method (GET /tenant/purchase-orders/:id)
    - Implement createOrder() method (POST /tenant/purchase-orders)
    - Implement updateOrder() method (PUT /tenant/purchase-orders/:id)
    - Implement changeStatus() method (PUT /tenant/purchase-orders/:id/status)
    - Implement cancelOrder() method (POST /tenant/purchase-orders/:id/cancel)
    - Implement deleteOrder() method (DELETE /tenant/purchase-orders/:id)
    - Implement registerPayment() method (POST /tenant/purchase-orders/:id/payments)
    - Add error handling for 401, 403, 404, 422, 500, network errors
    - _Requirements: 1.9, 2.1, 3.2, 4.7, 5.3, 6.3, 7.6, 8.2, 12.1-12.8_

  - [ ]* 2.8 Write unit tests for PurchaseOrderService
    - Test getOrders with filters
    - Test error handling for 404, 422, 500
    - Mock HttpClient with HttpTestingController
    - _Requirements: 12.1-12.8_

- [x] 3. Setup routing and guards
  - [x] 3.1 Implement purchase-orders.routes.ts
    - Define route for list page (path: '')
    - Define route for create page (path: 'create')
    - Define route for detail page (path: ':id')
    - Define route for edit page (path: ':id/edit')
    - Add AuthGuard to all routes
    - Add permission checks: purchase_orders:Read, purchase_orders:Create, purchase_orders:Update
    - _Requirements: 14.1-14.6_

  - [x] 3.2 Create order validators utility
    - Implement validateQuantity() - must be > 0
    - Implement validatePrice() - must be >= 0
    - Implement validateTaxPercentage() - must be 0-100
    - Implement validateLineItems() - must have at least 1 item
    - Implement validatePaymentAmount() - must be > 0 and <= remaining
    - _Requirements: 13.1-13.9_

  - [ ]* 3.3 Write property tests for validators
    - **Property 11: Quantity Validation**
    - **Validates: Requirements 13.5**
    - **Property 12: Price Validation**
    - **Validates: Requirements 13.6**
    - **Property 13: Tax Percentage Validation**
    - **Validates: Requirements 13.7**

- [x] 4. Checkpoint - Core infrastructure complete
  - Ensure all tests pass, ask the user if questions arise.

### Phase 2: List and Dashboard

- [x] 5. Implement list page and dashboard
  - [x] 5.1 Create PurchaseOrderListComponent page
    - Setup component with signals for orders, filters, loading, pagination
    - Implement loadOrders() method calling PurchaseOrderService
    - Implement applyFilters() method to update filters signal
    - Implement loadMore() method for infinite scroll
    - Implement navigateToDetail() and navigateToCreate() methods
    - Add permission check for purchase_orders:Read
    - Add permission check to show/hide "Crear" button (purchase_orders:Create)
    - Create component template with dashboard, filter-bar, and orders-table
    - _Requirements: 2.1, 2.2, 1.1, 14.1, 14.2_

  - [x] 5.2 Create DashboardComponent
    - Add @Input() orders: PurchaseOrder[]
    - Implement calculateStatusDistribution() method
    - Implement calculatePaymentStatusDistribution() method
    - Create template with two PrimeNG pie charts (Por Estado, Estado de Pago)
    - Add responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
    - Add ARIA labels and roles for accessibility
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 10.1-10.6_

  - [ ]* 5.3 Write property test for dashboard metrics
    - **Property 10: Dashboard Metrics Calculation**
    - **Validates: Requirements 9.4, 9.5**
    - Test that for any collection of orders, metrics accurately reflect distribution by status and payment status

  - [ ]* 5.4 Write unit tests for DashboardComponent
    - Test metric calculations with sample data
    - Test empty state rendering
    - _Requirements: 9.1-9.6_

- [x] 6. Implement filter bar
  - [x] 6.1 Create FilterBarComponent
    - Add @Input() warehouses: Warehouse[]
    - Add @Output() filtersChange: EventEmitter<OrderFilters>
    - Create FormControl for search with debounce (300ms)
    - Create FormControl for date range (dateFrom, dateTo)
    - Create FormControl for status dropdown
    - Create FormControl for warehouse dropdown
    - Emit filtersChange when any filter changes
    - Create template with search input, date pickers, dropdowns
    - Add responsive layout (row on desktop, column on mobile)
    - Add ARIA labels for accessibility
    - _Requirements: 2.5, 2.6, 2.7, 2.8, 15.3, 10.1-10.6_

  - [ ]* 6.2 Write property test for filtering logic
    - **Property 5: Order Filtering**
    - **Validates: Requirements 2.5, 2.6, 2.7, 2.8**
    - Test that for any collection of orders and filter criteria, results contain only matching orders

  - [ ]* 6.3 Write unit tests for FilterBarComponent
    - Test debounce behavior on search input
    - Test filter emission on changes
    - _Requirements: 2.5-2.8, 15.3_

- [x] 7. Implement orders table
  - [x] 7.1 Create OrdersTableComponent
    - Add @Input() orders: PurchaseOrder[]
    - Add @Input() loading: boolean
    - Add @Output() orderClick: EventEmitter<string>
    - Add @Output() loadMore: EventEmitter<void>
    - Create table with columns: FOLIO, TIPO, PROVEEDOR, CEDIS, ESTADO, TOTAL, PAGO, FECHA CREACIÓN
    - Implement status badges with colors (En Proceso: orange, Recibida: green, Cancelada: red)
    - Implement payment status badges (Pagada, Parcial, No pagado)
    - Add infinite scroll detection using Intersection Observer
    - Format currency amounts with formatCurrency()
    - Format dates with DatePipe
    - Add responsive behavior: hide secondary columns on tablet, show cards on mobile
    - Add keyboard navigation (tabindex, enter/space handlers)
    - Add ARIA labels and roles
    - _Requirements: 2.2, 2.3, 2.4, 2.9, 2.10, 10.1-10.6, 11.7, 15.1, 15.2_

  - [ ]* 7.2 Write property test for status badge rendering
    - **Property 4: Status Badge Rendering**
    - **Validates: Requirements 2.3, 2.4**
    - Test that for any status, appropriate badge styling is applied

  - [ ]* 7.3 Write unit tests for OrdersTableComponent
    - Test table rendering with sample data
    - Test empty state
    - Test infinite scroll trigger
    - Test responsive card layout on mobile
    - _Requirements: 2.2-2.10, 10.1-10.6_

- [x] 8. Checkpoint - List and dashboard complete
  - Ensure all tests pass, ask the user if questions arise.

### Phase 3: Detail View

- [x] 9. Implement detail page
  - [x] 9.1 Create PurchaseOrderDetailComponent page
    - Setup component with signal for order, loading, permission flags
    - Implement loadOrder() method calling PurchaseOrderService.getOrderById()
    - Implement computed signals for canEdit, canDelete, canChangeStatus based on permissions
    - Implement editOrder() method to navigate to edit page
    - Implement changeStatus() method to call service and reload
    - Implement cancelOrder() method to show dialog and call service
    - Implement deleteOrder() method to show confirmation and call service
    - Implement registerPayment() method to show dialog and call service
    - Create template with order-header, line-items-table, payments-list
    - Add error handling and loading states
    - _Requirements: 3.1, 3.2, 3.8, 3.9, 3.10, 4.1, 5.1-5.8, 6.1-6.7, 7.1-7.8, 8.1-8.6, 14.3, 14.4_

  - [ ]* 9.2 Write unit tests for PurchaseOrderDetailComponent
    - Test order loading
    - Test permission-based button visibility
    - Test navigation to edit page
    - _Requirements: 3.1-3.10, 14.3, 14.4_

- [x] 10. Implement order header component
  - [x] 10.1 Create OrderHeaderComponent
    - Add @Input() order: PurchaseOrder
    - Add @Input() canEdit: boolean
    - Add @Input() canDelete: boolean
    - Add @Input() canChangeStatus: boolean
    - Add @Output() edit, changeStatus, cancel, delete EventEmitters
    - Create template showing: vendor info, warehouse, dates, status, purpose
    - Add action buttons: Editar, Cambiar Estado, Cancelar, Eliminar
    - Show/hide buttons based on permissions and order status
    - Add status badge with appropriate styling
    - Add responsive layout
    - _Requirements: 3.3, 3.8, 3.9, 3.10, 10.1-10.6_

  - [ ]* 10.2 Write unit tests for OrderHeaderComponent
    - Test button visibility based on permissions
    - Test button visibility based on order status
    - _Requirements: 3.8, 3.9, 3.10_

- [x] 11. Implement line items table component
  - [x] 11.1 Create LineItemsTableComponent
    - Add @Input() lineItems: LineItem[]
    - Add @Input() editable: boolean
    - Add @Output() lineItemChange, lineItemRemove EventEmitters
    - Create table with columns: PRODUCTO, UOM, CANTIDAD, PRECIO, SUBTOTAL, IVA, IEPS, TOTAL
    - Format all monetary amounts with 2 decimals and currency symbol
    - Show totals row at bottom
    - Add virtual scrolling if > 50 items
    - Add responsive layout
    - _Requirements: 3.4, 11.7, 15.7, 10.1-10.6_

  - [ ]* 11.2 Write property test for currency formatting
    - **Property 15: Currency Formatting**
    - **Validates: Requirements 11.7**
    - Test that for any monetary amount, formatting includes 2 decimals and currency symbol

  - [ ]* 11.3 Write unit tests for LineItemsTableComponent
    - Test table rendering with sample line items
    - Test totals calculation display
    - Test virtual scrolling activation
    - _Requirements: 3.4, 11.7_

- [x] 12. Implement payments list component
  - [x] 12.1 Create PaymentsListComponent
    - Add @Input() payments: Payment[]
    - Add @Input() canAddPayment: boolean
    - Add @Output() addPayment EventEmitter
    - Create list showing: monto, fecha, método, referencia, notas
    - Add "Registrar Pago" button if canAddPayment is true
    - Format payment amounts and dates
    - Show empty state if no payments
    - Add responsive layout
    - _Requirements: 3.5, 7.1, 7.7, 10.1-10.6_

  - [ ]* 12.2 Write unit tests for PaymentsListComponent
    - Test payments list rendering
    - Test empty state
    - Test button visibility based on canAddPayment
    - _Requirements: 3.5, 7.1, 7.7_

- [x] 13. Implement dialog components
  - [x] 13.1 Create PaymentDialogComponent
    - Add @Input() remainingAmount: number
    - Add @Output() paymentSubmit: EventEmitter<Payment>
    - Add @Output() cancel EventEmitter
    - Create reactive form with: amount, payment_date, payment_method, reference, notes
    - Add validation: amount > 0 and amount <= remainingAmount
    - Show remaining amount in dialog
    - Add focus management for accessibility
    - _Requirements: 7.2, 7.3, 7.8_

  - [ ]* 13.2 Write property test for payment amount validation
    - **Property 6: Payment Amount Validation**
    - **Validates: Requirements 7.3**
    - Test that payment amount must be > 0 and <= remaining amount

  - [ ]* 13.3 Write unit tests for PaymentDialogComponent
    - Test form validation
    - Test amount validation against remaining amount
    - _Requirements: 7.2, 7.3_

  - [x] 13.4 Create CancelDialogComponent
    - Add @Output() confirm: EventEmitter<string>
    - Add @Output() cancel EventEmitter
    - Create form with cancellation_reason textarea (required)
    - Add focus management for accessibility
    - _Requirements: 6.1, 6.2, 6.4_

  - [ ]* 13.5 Write unit tests for CancelDialogComponent
    - Test form validation
    - Test reason requirement
    - _Requirements: 6.1, 6.2_

- [x] 14. Checkpoint - Detail view complete
  - Ensure all tests pass, ask the user if questions arise.

### Phase 4: Form and CRUD

- [x] 15. Implement form page
  - [x] 15.1 Create PurchaseOrderFormComponent page
    - Setup component with reactive FormGroup for order
    - Add FormArray for line_items
    - Implement initForm() method to initialize or pre-fill form
    - Implement addLineItem() method to add new line to FormArray
    - Implement removeLineItem() method to remove line from FormArray
    - Implement calculateTotals() as computed signal using TaxCalculatorService
    - Implement save() method to call createOrder or updateOrder
    - Implement cancel() method to navigate back
    - Load vendors, products, warehouses on init
    - Detect edit mode from route params
    - Add form validation
    - Create template with order-form and line-item-form components
    - Show calculated totals in real-time
    - _Requirements: 1.1-1.10, 4.1-4.10, 13.1-13.9_

  - [ ]* 15.2 Write property test for automatic recalculation
    - **Property 3: Automatic Recalculation on Changes**
    - **Validates: Requirements 1.7, 4.4, 4.6, 11.6**
    - Test that when quantity, price, or tax percentages change, all calculations update automatically

  - [ ]* 15.3 Write property test for form validity and save button
    - **Property 14: Form Validity and Save Button State**
    - **Validates: Requirements 13.8, 13.9**
    - Test that save button is disabled when form has errors, enabled when valid

  - [ ]* 15.4 Write unit tests for PurchaseOrderFormComponent
    - Test form initialization
    - Test adding/removing line items
    - Test totals calculation
    - Test validation errors
    - Test save button state
    - Test edit mode pre-filling
    - _Requirements: 1.1-1.10, 4.1-4.10, 13.1-13.9_

- [x] 16. Implement order form component
  - [x] 16.1 Create OrderFormComponent
    - Add @Input() formGroup: FormGroup
    - Add @Input() vendors: Vendor[]
    - Add @Input() warehouses: Warehouse[]
    - Create template with fields: vendor dropdown, purpose input, warehouse dropdown, tentative_receipt_date datepicker
    - Add validation error messages below each field
    - Mark required fields with asterisk
    - Add ARIA labels and error announcements
    - Add responsive layout
    - _Requirements: 1.2, 1.3, 1.4, 13.1, 13.2, 13.3, 10.1-10.6_

  - [ ]* 16.2 Write unit tests for OrderFormComponent
    - Test field rendering
    - Test validation error display
    - Test required field indicators
    - _Requirements: 1.2-1.4, 13.1-13.3_

- [x] 17. Implement line item form component
  - [x] 17.1 Create LineItemFormComponent
    - Add @Input() formGroup: FormGroup
    - Add @Input() products: Product[]
    - Add @Output() productSelect: EventEmitter<Product>
    - Create template with fields: product dropdown, uom dropdown, quantity input, unit_price input, iva_percentage input, ieps_percentage input
    - Load UOMs when product is selected
    - Add validation error messages
    - Add calculated subtotal, IVA, IEPS, total display (read-only)
    - Add responsive layout
    - _Requirements: 1.5, 1.6, 1.7, 13.5, 13.6, 13.7, 10.1-10.6_

  - [ ]* 17.2 Write unit tests for LineItemFormComponent
    - Test product selection
    - Test UOM loading
    - Test validation errors
    - Test calculated values display
    - _Requirements: 1.5-1.7, 13.5-13.7_

- [x] 18. Checkpoint - Form and CRUD complete
  - Ensure all tests pass, ask the user if questions arise.

### Phase 5: Advanced Features

- [x] 19. Implement status change functionality
  - [x] 19.1 Add status change logic to PurchaseOrderDetailComponent
    - Implement changeStatus() method with confirmation dialog
    - Validate order is in "En Proceso" before allowing change to "Recibida"
    - Call PurchaseOrderService.changeStatus()
    - Show success/error notifications
    - Reload order after successful change
    - Disable status change button if order is "Recibida" or "Cancelada"
    - _Requirements: 5.1-5.8_

  - [ ]* 19.2 Write property test for edit restrictions by status
    - **Property 9: Edit Restrictions by Status**
    - **Validates: Requirements 4.9**
    - Test that orders in "Recibida" or "Cancelada" status have editing disabled

  - [ ]* 19.3 Write unit tests for status change
    - Test status change flow
    - Test validation for status transitions
    - Test button disable logic
    - _Requirements: 5.1-5.8_

- [x] 20. Implement payment registration
  - [x] 20.1 Add payment registration logic to PurchaseOrderDetailComponent
    - Implement registerPayment() method to open PaymentDialogComponent
    - Pass remainingAmount to dialog
    - Call PurchaseOrderService.registerPayment() on submit
    - Update order with new payment in payments array
    - Recalculate remaining_amount using TaxCalculatorService
    - Update payment_status using TaxCalculatorService.determinePaymentStatus()
    - Show success/error notifications
    - Disable "Registrar Pago" button if order is fully paid
    - _Requirements: 7.1-7.8_

  - [ ]* 20.2 Write property test for payment status determination
    - **Property 7: Payment Status Determination**
    - **Validates: Requirements 7.4**
    - Test that payment status is correctly determined based on total and paid amounts

  - [ ]* 20.3 Write property test for remaining amount calculation
    - **Property 8: Remaining Amount Calculation**
    - **Validates: Requirements 7.5**
    - Test that remaining amount = grand_total - Σ(payments.amount)

  - [ ]* 20.4 Write unit tests for payment registration
    - Test payment dialog opening
    - Test payment submission
    - Test remaining amount update
    - Test payment status update
    - Test button disable when fully paid
    - _Requirements: 7.1-7.8_

- [x] 21. Implement order cancellation
  - [x] 21.1 Add cancellation logic to PurchaseOrderDetailComponent
    - Implement cancelOrder() method to open CancelDialogComponent
    - Validate order is in "En Proceso" status
    - Call PurchaseOrderService.cancelOrder() with reason
    - Update order status to "Cancelada"
    - Show success/error notifications
    - Hide cancel button if order is "Recibida" or already "Cancelada"
    - _Requirements: 6.1-6.7_

  - [ ]* 21.2 Write unit tests for order cancellation
    - Test cancellation dialog flow
    - Test status validation
    - Test button visibility logic
    - Test historical data preservation
    - _Requirements: 6.1-6.7_

- [x] 22. Implement order deletion
  - [x] 22.1 Add deletion logic to PurchaseOrderDetailComponent
    - Implement deleteOrder() method with confirmation dialog
    - Validate order has no payments registered
    - Validate order is not in "Recibida" status
    - Call PurchaseOrderService.deleteOrder()
    - Navigate to list page on success
    - Show error message if validation fails
    - Show success/error notifications
    - _Requirements: 8.1-8.6_

  - [ ]* 22.2 Write unit tests for order deletion
    - Test deletion confirmation flow
    - Test validation for payments
    - Test validation for status
    - Test navigation after deletion
    - _Requirements: 8.1-8.6_

- [x] 23. Checkpoint - Advanced features complete
  - Ensure all tests pass, ask the user if questions arise.

### Phase 6: Polish and Testing

- [x] 24. Implement responsive design refinements
  - [x] 24.1 Add responsive styles to all components
    - Create _breakpoints.scss with mobile, tablet, desktop mixins
    - Apply responsive grid layouts to dashboard (3/2/1 columns)
    - Apply responsive layouts to filter bar (row/column)
    - Apply responsive table/cards to orders table
    - Apply responsive form layouts (2/1 columns)
    - Test on different screen sizes: desktop (>1024px), tablet (768-1024px), mobile (<768px)
    - _Requirements: 10.1-10.6_

  - [x] 24.2 Add touch optimization for mobile
    - Add inputmode="decimal" for number inputs on mobile
    - Ensure touch targets are at least 44x44px
    - Add -webkit-overflow-scrolling: touch for scrollable areas
    - Test touch interactions on mobile devices
    - _Requirements: 10.6_

  - [ ]* 24.3 Write unit tests for responsive behavior
    - Test component rendering at different breakpoints
    - Test table/card switching on mobile
    - _Requirements: 10.1-10.6_

- [x] 25. Implement accessibility improvements
  - [x] 25.1 Add ARIA labels and roles to all components
    - Add role="region" and aria-label to dashboard
    - Add role="search" to filter bar
    - Add role="table" to tables
    - Add aria-required, aria-invalid, aria-describedby to form fields
    - Add role="alert" to error messages
    - Add role="status" and aria-live to loading states
    - _Requirements: Accessibility NFR_

  - [x] 25.2 Implement keyboard navigation
    - Add tabindex to all interactive elements
    - Add keydown.enter and keydown.space handlers to clickable rows
    - Implement focus management in dialogs
    - Test full keyboard navigation flow
    - _Requirements: Accessibility NFR_

  - [x] 25.3 Ensure color contrast compliance
    - Verify all text has 4.5:1 contrast ratio (WCAG AA)
    - Verify status badges have sufficient contrast
    - Add .sr-only class for screen reader only content
    - Test with screen reader (NVDA/JAWS)
    - _Requirements: Accessibility NFR_

  - [ ]* 25.4 Write accessibility tests
    - Test ARIA attributes presence
    - Test keyboard navigation
    - Test focus management
    - _Requirements: Accessibility NFR_

- [x] 26. Implement performance optimizations
  - [x] 26.1 Add caching to integration services
    - Implement 5-minute cache in VendorService
    - Implement 5-minute cache in ProductService
    - Implement 5-minute cache in WarehouseService
    - Add clearCache() methods
    - _Requirements: 15.6_

  - [x] 26.2 Add change detection optimization
    - Use OnPush strategy for presentational components
    - Use computed signals for derived state
    - Avoid unnecessary re-renders in form components
    - _Requirements: 15.5_

  - [x] 26.3 Add virtual scrolling for large lists
    - Implement virtual scrolling in LineItemsTableComponent if > 50 items
    - Test with large datasets
    - _Requirements: 15.7_

  - [ ]* 26.4 Write performance tests
    - Test initial load time
    - Test calculation performance
    - Test filter debounce behavior
    - _Requirements: 15.1-15.7, Performance NFR_

- [ ] 27. Integration testing
  - [ ]* 27.1 Write integration test for create order flow
    - Test full flow: navigate to create → fill form → add line items → calculate totals → save → navigate to detail
    - _Requirements: 1.1-1.10_

  - [ ]* 27.2 Write integration test for edit order flow
    - Test full flow: load order → edit fields → modify line items → recalculate → save → verify updates
    - _Requirements: 4.1-4.10_

  - [ ]* 27.3 Write integration test for payment flow
    - Test full flow: open detail → register payment → verify remaining amount → verify payment status
    - _Requirements: 7.1-7.8_

  - [ ]* 27.4 Write integration test for status change flow
    - Test full flow: change status to "Recibida" → verify status update → verify edit restrictions
    - _Requirements: 5.1-5.8_

- [x] 28. Final checkpoint - Module complete
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all requirements are covered
  - Verify all properties are tested
  - Verify accessibility compliance
  - Verify responsive design on all devices
  - Verify performance meets NFRs

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end flows
- All monetary calculations use 2 decimal precision
- All dates use ISO 8601 format
- All API calls include JWT Bearer Token
- All components follow Angular standalone pattern
- All forms use Reactive Forms
- All state management uses Signals
- All styling uses SCSS with BEM methodology
- All components are responsive (desktop, tablet, mobile)
- All components meet WCAG 2.1 Level AA accessibility standards
