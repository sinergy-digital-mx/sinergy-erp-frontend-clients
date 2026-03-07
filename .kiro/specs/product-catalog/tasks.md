# Implementation Plan: Product Catalog Management

## Overview

This implementation plan breaks down the Product Catalog Management feature into discrete, incremental coding tasks. The feature will be built in phases: first establishing the core service and models, then implementing the product list component with table display and search, followed by the product detail modal for create/edit operations, and finally integrating property-based tests to validate correctness properties. Each task builds on previous work, with no orphaned code.

## Tasks

- [x] 1. Set up project structure, models, and service
  - Create product model interfaces (Product, CreateProductDto, UpdateProductDto, ProductListResponse, ProductQueryParams)
  - Create product service with HTTP methods for CRUD operations
  - Set up service injection and environment configuration
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 2. Implement product list component - core structure and data loading
  - Create product-list component with standalone configuration
  - Implement table configuration with columns (SKU, Name, Description, Detail, Delete)
  - Implement loadProducts() method to fetch from API
  - Set up datatable wrapper integration
  - _Requirements: 1.1, 1.2, 10.1, 10.5_

- [x]* 2.1 Write property test for product list data display
  - **Property 1: Product List Reflects API Data**
  - **Validates: Requirements 1.1, 1.2**

- [x] 3. Implement product list search and filtering
  - Add search component integration
  - Implement onSearchChange() method to filter products
  - Add search parameter to API calls
  - _Requirements: 1.3_

- [x]* 3.1 Write property test for search filtering
  - **Property 2: Search Filters Products Correctly**
  - **Validates: Requirements 1.3**

- [x] 4. Implement product list empty state and error handling
  - Configure empty state message in table config
  - Implement error handling for API failures
  - Display error snackbar on load failure
  - _Requirements: 1.4, 8.1, 8.3_

- [x] 5. Implement product detail modal component - create mode
  - Create product-detail-modal component with standalone configuration
  - Implement reactive form with SKU, Name, Description fields
  - Add form validators (required, minLength)
  - Implement createForm() method
  - _Requirements: 2.1, 2.2, 5.1, 5.2, 5.3_

- [x]* 5.1 Write property test for form validation
  - **Property 7: Form Validation Enables Save Button**
  - **Validates: Requirements 5.5, 5.6**

- [x] 6. Implement product detail modal - save functionality for create
  - Implement save() method for create mode
  - Call productService.createProduct() with form data
  - Handle success response and close modal
  - Display success snackbar message
  - _Requirements: 2.4, 2.5_

- [x]* 6.1 Write property test for create product round trip
  - **Property 3: Create Product Round Trip**
  - **Validates: Requirements 2.4, 2.5**

- [x] 7. Implement product detail modal - edit mode
  - Implement ngOnInit() to load product data in edit mode
  - Populate form fields with product data
  - Distinguish between create and edit modes
  - _Requirements: 3.1_

- [x]* 7.1 Write property test for modal state persistence
  - **Property 9: Modal State Persistence**
  - **Validates: Requirements 3.1**

- [x] 8. Implement product detail modal - save functionality for edit
  - Implement save() method for edit mode
  - Call productService.updateProduct() with form data
  - Handle success response and close modal
  - Display success snackbar message
  - _Requirements: 3.4, 3.5_

- [x]* 8.1 Write property test for update product
  - **Property 4: Update Product Preserves Data**
  - **Validates: Requirements 3.4, 3.5**

- [x] 9. Implement SKU uniqueness validation
  - Add async validator for SKU uniqueness check
  - Implement validation error display in form
  - Handle SKU conflict error from API (409 response)
  - Display specific error message for duplicate SKU
  - _Requirements: 2.3, 3.3, 5.4, 8.2_

- [x]* 9.1 Write property test for SKU uniqueness validation
  - **Property 6: SKU Uniqueness Validation**
  - **Validates: Requirements 2.3, 5.4**

- [x] 10. Implement product list - open detail modal for create
  - Add "Create Product" button to product list
  - Implement openCreateProductModal() method
  - Open modal with warehouse: null to indicate create mode
  - Refresh product list after successful creation
  - _Requirements: 2.1_

- [x]* 10.1 Write property test for create modal opening
  - **Property 1: Product List Reflects API Data** (after create)
  - **Validates: Requirements 2.1, 2.5**

- [x] 11. Implement product list - open detail modal for edit
  - Implement viewDetail() method to open modal in edit mode
  - Pass selected product to modal
  - Refresh product list after successful update
  - _Requirements: 1.5, 3.1_

- [x]* 11.1 Write property test for edit modal opening
  - **Property 9: Modal State Persistence**
  - **Validates: Requirements 1.5, 3.1**

- [x] 12. Implement product list - delete functionality
  - Implement deleteProduct() method with confirmation dialog
  - Call productService.deleteProduct() on confirmation
  - Handle success response and refresh product list
  - Display success snackbar message
  - _Requirements: 1.6, 4.1, 4.2, 4.3, 4.4_

- [x]* 12.1 Write property test for delete product
  - **Property 5: Delete Product Removes from List**
  - **Validates: Requirements 4.2, 4.4**

- [x] 13. Implement error handling for all operations
  - Add error handling for create, update, delete operations
  - Display error snackbar with API error message
  - Keep modal open on error for user correction
  - Handle specific error codes (409 for SKU conflict, 404 for not found)
  - _Requirements: 2.6, 3.6, 4.5, 8.1, 8.2, 8.3, 10.6_

- [x]* 13.1 Write property test for error message display
  - **Property 10: Error Message Display**
  - **Validates: Requirements 2.6, 3.6, 4.5, 8.1, 8.2**

- [x] 14. Implement loading state and user feedback
  - Add saving signal to track form submission state
  - Disable save button during submission
  - Show loading indicator on save button
  - Display loading state in table during data fetch
  - _Requirements: 8.6_

- [x]* 14.1 Write property test for loading state
  - **Property 10: Error Message Display** (includes loading state)
  - **Validates: Requirements 8.6**

- [x] 15. Implement sorting and pagination
  - Configure sortable columns in table config
  - Implement column click handlers for sorting
  - Add pagination controls to table
  - Handle page changes and sort changes
  - Reset to page 1 when sort changes
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x]* 15.1 Write property test for sorting and pagination
  - **Property 9: Modal State Persistence** (pagination state)
  - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

- [x] 16. Implement multi-tenant isolation
  - Verify tenant_id is automatically set by backend
  - Verify product list only shows current tenant's products
  - Implement tenant context change detection
  - Reload product list when tenant changes
  - _Requirements: 6.1, 6.2, 6.4_

- [x]* 16.1 Write property test for multi-tenant isolation
  - **Property 8: Multi-Tenant Isolation**
  - **Validates: Requirements 6.1, 6.2**

- [x] 17. Integrate product list into settings module
  - Add product-list component to settings module declarations
  - Add product-detail-modal component to settings module declarations
  - Create routing for product list in settings
  - Add "Products" menu item to settings navigation
  - _Requirements: 7.1, 7.2, 7.4_

- [x]* 17.1 Write integration test for settings module integration
  - **Property 7: Form Validation Enables Save Button** (integration)
  - **Validates: Requirements 7.1, 7.2, 7.4**

- [x] 18. Implement form field styling and accessibility
  - Add Material form field styling
  - Implement error message display below fields
  - Add aria-labels for accessibility
  - Ensure keyboard navigation support
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 19. Checkpoint - Ensure all tests pass
  - Run all unit tests and verify they pass
  - Run all property-based tests with minimum 100 iterations
  - Verify no console errors or warnings
  - Ask the user if questions arise

- [x] 20. Final integration and wiring
  - Wire all components together in settings module
  - Verify product list loads on component init
  - Verify modal opens/closes correctly
  - Verify all CRUD operations work end-to-end
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 10.1, 10.2, 10.3, 10.4_

- [x]* 20.1 Write end-to-end integration tests
  - Test complete create flow
  - Test complete edit flow
  - Test complete delete flow
  - Test search and filter flow
  - _Requirements: 1.1, 2.4, 3.4, 4.2_

- [x] 21. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests should run with minimum 100 iterations for comprehensive coverage
- All components use Angular Material and follow existing warehouse/vendor patterns
- Multi-tenant isolation is handled automatically by the backend API
- Cascade delete is handled by the backend when a product is deleted
