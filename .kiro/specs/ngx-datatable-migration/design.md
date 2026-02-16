# Design Document: ngx-datatable Migration

## Overview

This design document outlines the migration strategy from a custom table component to ngx-datatable (by Swimlane). The migration maintains all existing functionality while leveraging a mature, well-maintained library. The approach involves creating a wrapper component that provides a consistent interface for existing pages, then gradually migrating each page to use ngx-datatable directly.

**Key Design Decisions:**
- Use ngx-datatable as the underlying table implementation
- Create a wrapper component to maintain backward compatibility during migration
- Implement server-side pagination and sorting
- Maintain responsive design through CSS media queries
- Use ngx-datatable's built-in features for loading states and empty states

## Architecture

### Component Structure

```
src/app/core/components/
├── datatable-wrapper/          (NEW - wrapper component)
│   ├── datatable-wrapper.component.ts
│   ├── datatable-wrapper.component.html
│   ├── datatable-wrapper.component.scss
│   └── datatable-wrapper.interface.ts
├── table/                       (DEPRECATED - to be removed)
│   ├── table.component.ts
│   ├── table.component.html
│   └── table.component.scss
```

### Data Flow

```
Page Component (leads-list, customers-list)
    ↓
Datatable Wrapper Component
    ↓
ngx-datatable Component
    ↓
Service (LeadService, CustomerService)
    ↓
Backend API
```

## Components and Interfaces

### 1. Datatable Wrapper Component

**Purpose:** Provides a consistent interface for pages using ngx-datatable, abstracting away library-specific details.

**Inputs:**
- `config: IDatatableConfig` - Configuration object containing data, columns, pagination settings
- `rowTemplate: TemplateRef<any>` - Custom template for rendering table rows

**Outputs:**
- `pageChange: EventEmitter<IPaginationEvent>` - Emitted when page or limit changes
- `sortChange: EventEmitter<ISortEvent>` - Emitted when column sorting changes
- `rowClick: EventEmitter<any>` - Emitted when a row is clicked

**Key Methods:**
- `onPageChange(event)` - Handles pagination changes
- `onSortChange(event)` - Handles sort changes
- `onRowClick(row)` - Handles row click events
- `onLoadingChange()` - Manages loading state

### 2. Configuration Interface

```typescript
interface IDatatableConfig {
  // Data
  rows: any[];
  columns: IColumn[];
  
  // Pagination
  externalPaging: boolean;
  externalSorting: boolean;
  page: number;
  limit: number;
  totalResults: number;
  
  // UI
  loading: boolean;
  emptyState: {
    title: string;
    subtitle: string;
  };
  
  // Features
  columnMode: 'force' | 'standard';
  selectionType: 'checkbox' | 'none';
  reorderable: boolean;
  
  // Styling
  cssClasses: {
    sortAscending: string;
    sortDescending: string;
  };
}

interface IColumn {
  name: string;
  prop: string;
  width?: number;
  sortable?: boolean;
  canAutoResize?: boolean;
}

interface IPaginationEvent {
  page: number;
  limit: number;
}

interface ISortEvent {
  column: IColumn;
  direction: 'asc' | 'desc' | '';
}
```

## Data Models

### Leads Data Model
```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
}
```

### Customers Data Model
```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Pagination State Consistency

*For any* page number and limit value, when the user navigates to a new page, the ngx-datatable SHALL display the correct subset of data corresponding to that page and limit, and the URL query parameters SHALL be updated to reflect the current pagination state.

**Validates: Requirements 2.1, 2.2, 2.3**

### Property 2: Sort Direction Cycling

*For any* sortable column, clicking the column header SHALL cycle through three states: ascending sort, descending sort, and no sort (original order), with each click advancing to the next state.

**Validates: Requirements 3.1, 3.2, 3.3**

### Property 3: Sort Indicator Visibility

*For any* sorted column, the ngx-datatable SHALL display a visual sort indicator (arrow icon) that correctly reflects the current sort direction (ascending, descending, or none).

**Validates: Requirements 3.4**

### Property 4: Search Filter Application

*For any* search term entered by the user, the ngx-datatable SHALL display only rows where the data matches the search criteria, and the filtered results SHALL be paginated correctly.

**Validates: Requirements 4.1, 4.2**

### Property 5: Empty State Display

*For any* query that returns zero results, the ngx-datatable SHALL display the empty state message instead of an empty table, and the empty state message SHALL be customizable.

**Validates: Requirements 2.5, 4.3, 6.3**

### Property 6: Loading State Visibility

*For any* data fetch operation, when loading is true, the ngx-datatable SHALL display a loading indicator, and when loading is false, the indicator SHALL be hidden and data SHALL be displayed.

**Validates: Requirements 6.1, 6.2**

### Property 7: Row Click Event Emission

*For any* row in the table, when the user clicks on the row, the ngx-datatable SHALL emit a row click event containing the row data, and the parent component SHALL be able to handle this event.

**Validates: Requirements 7.1, 7.2**

### Property 8: Action Button Click Isolation

*For any* action button within a row template, when the user clicks the button, the row click event SHALL NOT be triggered, allowing the button's own click handler to execute.

**Validates: Requirements 7.3**

### Property 9: Responsive Layout Adaptation

*For any* viewport width change, the ngx-datatable SHALL adapt its layout appropriately, showing all columns on desktop and using a mobile-friendly layout on smaller screens.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 10: Custom Row Template Rendering

*For any* custom row template provided to the ngx-datatable, the template SHALL be rendered for each row with access to the row data and index, and the template content SHALL be displayed correctly.

**Validates: Requirements 8.1, 8.2**

## Error Handling

### Data Loading Errors
- If the service fails to fetch data, display an error message in the empty state
- Provide a retry button to allow users to attempt loading again
- Log errors to the console for debugging

### Invalid Configuration
- Validate configuration object on component initialization
- Throw descriptive errors if required properties are missing
- Provide default values for optional properties

### Pagination Errors
- If page number exceeds total pages, reset to the last valid page
- If limit is invalid, use the default limit value
- Validate that page and limit are positive integers

## Testing Strategy

### Unit Tests
- Test configuration validation and default values
- Test event emission for pagination, sorting, and row clicks
- Test empty state and loading state display
- Test responsive behavior with different viewport sizes
- Test custom row template rendering

### Property-Based Tests
- **Property 1:** Generate random page numbers and limits, verify correct data subset is displayed
- **Property 2:** Generate random columns, verify sort cycling works correctly
- **Property 3:** Generate random sort states, verify indicator displays correctly
- **Property 4:** Generate random search terms, verify filtering works correctly
- **Property 5:** Generate queries with zero results, verify empty state displays
- **Property 6:** Generate loading state changes, verify indicator visibility
- **Property 7:** Generate random rows, verify click events are emitted
- **Property 8:** Generate rows with action buttons, verify row click is not triggered
- **Property 9:** Generate viewport size changes, verify layout adapts
- **Property 10:** Generate custom templates, verify rendering is correct

### Integration Tests
- Test full flow: load data → search → paginate → sort → click row
- Test navigation between pages with search active
- Test sort persistence across pagination
- Test responsive behavior on actual mobile devices
- Test with real backend API responses

### Test Configuration
- Minimum 100 iterations per property-based test
- Use realistic data generators for leads and customers
- Mock backend API responses
- Test both success and error scenarios
