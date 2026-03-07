# Product Catalog Management - Design Document

## Overview

The Product Catalog Management feature provides a comprehensive Angular-based interface for managing products within the settings module. The implementation follows established patterns from existing warehouse and vendor management components, ensuring consistency and maintainability. The feature consists of two main components: a product list component displaying all products in a paginated table, and a product detail modal for creating and editing product information.

The architecture leverages Angular Material for UI components, reactive forms for validation, and RxJS for state management. All operations maintain multi-tenant isolation through automatic tenant_id association and filtering. The design emphasizes user feedback through snackbar notifications and confirmation dialogs for destructive operations.

## Architecture

### Component Structure

```
settings/
├── components/
│   ├── product-list/
│   │   ├── product-list.component.ts
│   │   ├── product-list.component.html
│   │   └── product-list.component.scss
│   └── product-detail-modal/
│       ├── product-detail-modal.component.ts
│       ├── product-detail-modal.component.html
│       └── product-detail-modal.component.scss
├── services/
│   └── product.service.ts
├── models/
│   └── product.model.ts
└── settings.module.ts (updated)
```

### Data Flow

```
Product List Component
    ↓
Product Service (HTTP calls)
    ↓
REST API (/products, /products/:id)
    ↓
Backend (Product Entity, Database)
    ↓
Response (Product[], Product)
    ↓
Product List Component (update table)
```

### State Management

- **Product List State**: Managed via Angular signals for reactive updates
- **Form State**: Managed via Reactive Forms (FormGroup)
- **Loading State**: Tracked via signals for UI feedback
- **Search State**: Maintained in component for filtering

## Components and Interfaces

### Product List Component

**Selector**: `app-product-list`

**Responsibilities**:
- Display paginated table of products
- Handle search/filtering
- Open detail modal for create/edit
- Handle product deletion with confirmation
- Manage table sorting and pagination

**Key Methods**:
- `loadProducts()`: Fetch products from API
- `onSearchChange(searchTerm)`: Filter products by search term
- `openCreateProductModal()`: Open modal in create mode
- `viewDetail(product)`: Open modal in edit mode
- `deleteProduct(product)`: Delete product with confirmation
- `getStatusClass(status)`: Return CSS class for status badge

**Signals**:
- `table_config`: IDatatableConfig for datatable configuration
- `search`: Current search term

**Dependencies**:
- ProductService
- MatDialog
- MatSnackBar
- DatatableWrapperComponent
- SearchComponent
- ButtonComponent
- AlertDialogComponent

### Product Detail Modal Component

**Selector**: `app-product-detail-modal`

**Responsibilities**:
- Display form for creating/editing products
- Validate form inputs
- Handle form submission
- Display validation errors
- Manage loading state during save

**Key Methods**:
- `createForm()`: Initialize reactive form with validators
- `save()`: Submit form and call API
- `close()`: Close modal without saving
- `ngOnInit()`: Load initial data if editing

**Signals**:
- `saving`: Loading state during API call
- `isNew`: Boolean indicating create vs edit mode

**Form Fields**:
- `sku`: Required, unique per tenant
- `name`: Required, minimum 2 characters
- `description`: Optional

**Dependencies**:
- ProductService
- FormBuilder
- MatDialogRef
- MatSnackBar
- ReactiveFormsModule

### Product Service

**Responsibilities**:
- HTTP communication with backend
- Product CRUD operations
- Error handling

**Methods**:
- `getProducts(params?)`: GET /products
- `getProduct(id)`: GET /products/:id
- `createProduct(data)`: POST /products
- `updateProduct(id, data)`: PATCH /products/:id
- `deleteProduct(id)`: DELETE /products/:id

**Dependencies**:
- HttpClient
- environment configuration

## Data Models

### Product Model

```typescript
interface Product {
  id: string;              // UUID
  tenant_id: string;       // UUID
  sku: string;             // Stock Keeping Unit
  name: string;            // Product name
  description: string | null;  // Optional description
  created_at: string;      // ISO timestamp
  updated_at: string;      // ISO timestamp
}

interface CreateProductDto {
  sku: string;
  name: string;
  description?: string;
}

interface UpdateProductDto {
  name?: string;
  description?: string;
  sku?: string;
}

interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

interface ProductQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}
```

### Table Configuration

```typescript
interface IDatatableConfig {
  rows: Product[];
  columns: Array<{
    name: string;
    prop: string;
    sortable: boolean;
    canAutoResize: boolean;
    width: number;
  }>;
  externalPaging: boolean;
  externalSorting: boolean;
  page: number;
  limit: number;
  totalResults: number;
  loading: boolean;
  emptyState: {
    title: string;
    subtitle: string;
  };
  columnMode: string;
  reorderable: boolean;
}
```

## UI/UX Design

### Product List View

**Layout**:
- Header with "Products" title and "Create Product" button
- Search bar for filtering by SKU or Name
- Paginated datatable with columns: SKU, Name, Description, Detail, Delete
- Empty state message when no products exist

**Interactions**:
- Click row → Open detail modal
- Click "Detail" button → Open detail modal
- Click "Delete" button → Show confirmation dialog
- Type in search → Filter results in real-time
- Click column header → Sort by that column
- Click pagination controls → Load different page

**Styling**:
- Follow Material Design principles
- Use existing warehouse/vendor component styling
- Responsive layout for mobile/tablet
- Consistent color scheme with settings module

### Product Detail Modal

**Layout**:
- Modal header with title ("New Product" or "Edit Product") and close button
- Form with fields: SKU, Name, Description
- Validation error messages below each field
- Footer with Cancel and Save buttons

**Interactions**:
- Type in fields → Form validation in real-time
- Click Cancel → Close modal without saving
- Click Save → Submit form and close modal on success
- Show loading indicator on Save button during submission

**Styling**:
- Follow Material Design modal patterns
- Match warehouse/vendor detail modal styling
- Clear visual hierarchy for form fields
- Prominent error messages in red

## Error Handling

### API Error Scenarios

1. **SKU Uniqueness Violation** (409 Conflict)
   - Display: "A product with this SKU already exists"
   - Action: Keep modal open, highlight SKU field

2. **Network Error**
   - Display: "Unable to connect to server. Please try again."
   - Action: Show retry option in snackbar

3. **Validation Error** (400 Bad Request)
   - Display: Error message from API response
   - Action: Highlight relevant form field

4. **Not Found** (404)
   - Display: "Product not found"
   - Action: Refresh product list

5. **Server Error** (500)
   - Display: "An error occurred. Please try again later."
   - Action: Log error for debugging

### User Feedback

- **Success**: Green snackbar with checkmark icon
- **Error**: Red snackbar with error icon
- **Loading**: Disabled save button with spinner
- **Confirmation**: Modal dialog with warning icon

## Testing Strategy

### Unit Testing

**Product List Component**:
- Test table loads with products
- Test search filters products correctly
- Test delete confirmation dialog appears
- Test modal opens in create mode
- Test modal opens in edit mode with data
- Test sorting by columns
- Test pagination

**Product Detail Modal**:
- Test form initializes empty in create mode
- Test form populates with data in edit mode
- Test validation errors display
- Test save button disabled when form invalid
- Test form submission calls service
- Test success/error messages display
- Test modal closes on successful save

**Product Service**:
- Test getProducts calls correct endpoint
- Test createProduct calls correct endpoint
- Test updateProduct calls correct endpoint
- Test deleteProduct calls correct endpoint
- Test error handling

### Property-Based Testing

Property-based tests will validate universal correctness properties across all inputs and scenarios.

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Product List Reflects API Data

*For any* set of products returned from the API, the product list table should display exactly those products with all fields (SKU, Name, Description) correctly rendered.

**Validates: Requirements 1.1, 1.2**

### Property 2: Search Filters Products Correctly

*For any* search term and product list, the filtered results should only include products where the SKU or Name contains the search term (case-insensitive).

**Validates: Requirements 1.3**

### Property 3: Create Product Round Trip

*For any* valid product data (SKU, Name, Description), creating a product and then fetching the product list should result in that product appearing in the list with identical data.

**Validates: Requirements 2.4, 2.5**

### Property 4: Update Product Preserves Data

*For any* existing product and updated fields, updating the product and then fetching it should return the product with the updated fields applied.

**Validates: Requirements 3.4, 3.5**

### Property 5: Delete Product Removes from List

*For any* product in the list, deleting it and then fetching the product list should result in that product no longer appearing in the list.

**Validates: Requirements 4.2, 4.4**

### Property 6: SKU Uniqueness Validation

*For any* tenant, attempting to create a product with a SKU that already exists should result in a validation error, and the product list should remain unchanged.

**Validates: Requirements 2.3, 5.4**

### Property 7: Form Validation Enables Save Button

*For any* form state, the save button should be enabled if and only if all required fields are valid (SKU and Name non-empty, Name length >= 2).

**Validates: Requirements 5.5, 5.6**

### Property 8: Multi-Tenant Isolation

*For any* tenant context, the product list should only display products belonging to that tenant, and creating a product should automatically associate it with the current tenant.

**Validates: Requirements 6.1, 6.2**

### Property 9: Modal State Persistence

*For any* product being edited, opening the detail modal should populate all form fields with the current product data, and closing without saving should not modify the product.

**Validates: Requirements 3.1**

### Property 10: Error Message Display

*For any* API error response, the system should display a user-friendly error message in a snackbar, and the modal should remain open for the user to correct the issue.

**Validates: Requirements 2.6, 3.6, 4.5, 8.1, 8.2**

## Implementation Notes

### Angular Material Components Used

- `MatDialog`: For product detail modal
- `MatSnackBar`: For success/error notifications
- `MatTable`: Via DatatableWrapperComponent for product list
- `MatButton`: For action buttons
- `MatInput`: For form fields
- `MatFormField`: For form field styling

### Reactive Forms Validators

- `Validators.required`: For SKU and Name fields
- `Validators.minLength(2)`: For Name field
- Custom validator: For SKU uniqueness (async)

### RxJS Operators

- `takeUntil`: For subscription cleanup
- `switchMap`: For chaining API calls
- `tap`: For side effects (snackbar messages)
- `catchError`: For error handling

### Styling Approach

- SCSS modules for component-specific styles
- Tailwind CSS utility classes for layout
- CSS Grid for form layout
- Flexbox for modal header/footer

### Performance Considerations

- Lazy load product list only when component initializes
- Unsubscribe from observables in ngOnDestroy
- Use OnPush change detection strategy
- Debounce search input to reduce API calls
- Paginate large product lists (default 20 items per page)

### Accessibility

- Use semantic HTML (form, label, button elements)
- Provide aria-labels for icon buttons
- Ensure color contrast meets WCAG standards
- Support keyboard navigation (Tab, Enter, Escape)
- Announce errors to screen readers via aria-live regions
