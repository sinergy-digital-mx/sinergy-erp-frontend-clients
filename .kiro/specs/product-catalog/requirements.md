# Product Catalog Management - Requirements Document

## Introduction

The Product Catalog Management feature provides a comprehensive interface within the settings module for managing products in a multi-tenant system. This feature enables users to create, view, edit, and delete products with their associated metadata (SKU, name, description). The implementation follows existing patterns from warehouse and vendor management components, ensuring consistency across the settings module. All operations maintain multi-tenant isolation through tenant_id, with SKU uniqueness enforced per tenant.

## Glossary

- **Product**: A catalog item with unique SKU, name, and description within a tenant
- **SKU**: Stock Keeping Unit - a unique identifier for a product within a tenant
- **Tenant**: An isolated organizational context for multi-tenant data separation
- **Product_List**: The component displaying all products in a paginated table
- **Product_Detail_Modal**: The modal dialog for creating or editing product details
- **Settings_Module**: The Angular feature module containing configuration management components
- **REST_API**: Backend endpoints for product operations (POST, GET, PATCH, DELETE)
- **Cascade_Delete**: Automatic deletion of related entities when a product is deleted
- **Multi_Tenant_Isolation**: Data segregation ensuring products are only visible to their owning tenant

## Requirements

### Requirement 1: Display Product List

**User Story:** As a user, I want to view all products in my catalog, so that I can see what products are available and manage them.

#### Acceptance Criteria

1. WHEN the product list component loads THEN the system SHALL display a paginated table with all products for the current tenant
2. WHEN the product list is displayed THEN the system SHALL show columns for SKU, Name, and Description
3. WHEN a user searches for a product THEN the system SHALL filter the product list by SKU or Name and display matching results
4. WHEN the product list is empty THEN the system SHALL display an empty state message indicating no products exist
5. WHEN a user clicks on a product row THEN the system SHALL open the product detail modal for viewing/editing
6. WHEN a user clicks the delete button for a product THEN the system SHALL display a confirmation dialog before deletion

### Requirement 2: Create New Product

**User Story:** As a user, I want to create new products in the catalog, so that I can add items to manage.

#### Acceptance Criteria

1. WHEN a user clicks the "Create Product" button THEN the system SHALL open the product detail modal in create mode
2. WHEN the modal is in create mode THEN the system SHALL display empty form fields for SKU, Name, and Description
3. WHEN a user enters a SKU that already exists for the tenant THEN the system SHALL display a validation error
4. WHEN a user submits the form with valid data THEN the system SHALL create the product via REST API and close the modal
5. WHEN product creation succeeds THEN the system SHALL display a success message and refresh the product list
6. WHEN product creation fails THEN the system SHALL display an error message with details from the API response

### Requirement 3: Edit Product Details

**User Story:** As a user, I want to edit product details, so that I can update product information.

#### Acceptance Criteria

1. WHEN a user opens the product detail modal in edit mode THEN the system SHALL populate form fields with current product data
2. WHEN a user modifies product fields (Name, Description) THEN the system SHALL enable the save button
3. WHEN a user attempts to change the SKU to a value that already exists THEN the system SHALL display a validation error
4. WHEN a user submits the form with valid changes THEN the system SHALL update the product via REST API
5. WHEN product update succeeds THEN the system SHALL display a success message and refresh the product list
6. WHEN product update fails THEN the system SHALL display an error message with details from the API response

### Requirement 4: Delete Product

**User Story:** As a user, I want to delete products from the catalog, so that I can remove items that are no longer needed.

#### Acceptance Criteria

1. WHEN a user clicks the delete button for a product THEN the system SHALL display a confirmation dialog with the product name
2. WHEN a user confirms deletion THEN the system SHALL delete the product via REST API
3. WHEN a user cancels the deletion confirmation THEN the system SHALL close the dialog without deleting
4. WHEN product deletion succeeds THEN the system SHALL display a success message and refresh the product list
5. WHEN product deletion fails THEN the system SHALL display an error message with details from the API response
6. WHEN a product is deleted THEN the system SHALL cascade delete all related entities (UoMs, vendor prices, photos)

### Requirement 5: Form Validation

**User Story:** As a user, I want form validation to prevent invalid data entry, so that the catalog maintains data integrity.

#### Acceptance Criteria

1. WHEN a user leaves the SKU field empty THEN the system SHALL display a validation error
2. WHEN a user leaves the Name field empty THEN the system SHALL display a validation error
3. WHEN a user enters a Name with fewer than 2 characters THEN the system SHALL display a validation error
4. WHEN a user enters a SKU that already exists for the tenant THEN the system SHALL display a validation error
5. WHEN all required fields are valid THEN the system SHALL enable the save button
6. WHEN any required field is invalid THEN the system SHALL disable the save button

### Requirement 6: Multi-Tenant Isolation

**User Story:** As a system administrator, I want products to be isolated by tenant, so that each organization only sees their own products.

#### Acceptance Criteria

1. WHEN a user loads the product list THEN the system SHALL only display products belonging to the current tenant
2. WHEN a user creates a product THEN the system SHALL automatically associate it with the current tenant
3. WHEN a user attempts to access a product from another tenant THEN the system SHALL prevent access and display an error
4. WHEN the tenant context changes THEN the system SHALL reload the product list with products from the new tenant

### Requirement 7: Integration with Settings Module

**User Story:** As a user, I want the product catalog management to be integrated into the settings module, so that I can access it alongside other configuration tools.

#### Acceptance Criteria

1. WHEN the settings module loads THEN the system SHALL display a "Products" menu item or section
2. WHEN a user navigates to the Products section THEN the system SHALL display the product list component
3. WHEN the product list component is active THEN the system SHALL maintain the same styling and layout as other settings components
4. WHEN a user navigates away from the Products section THEN the system SHALL preserve the product list state for return visits

### Requirement 8: Error Handling and User Feedback

**User Story:** As a user, I want clear error messages and feedback, so that I understand what went wrong and how to fix it.

#### Acceptance Criteria

1. WHEN an API request fails THEN the system SHALL display a snackbar with an error message
2. WHEN a SKU uniqueness constraint is violated THEN the system SHALL display a specific error message indicating the SKU already exists
3. WHEN a network error occurs THEN the system SHALL display a user-friendly error message
4. WHEN an operation succeeds THEN the system SHALL display a success message in a snackbar
5. WHEN a user performs a destructive action (delete) THEN the system SHALL display a confirmation dialog before proceeding
6. WHEN a form submission is in progress THEN the system SHALL disable the save button and show a loading indicator

### Requirement 9: Product List Sorting and Pagination

**User Story:** As a user, I want to sort and paginate the product list, so that I can efficiently navigate large catalogs.

#### Acceptance Criteria

1. WHEN the product list is displayed THEN the system SHALL support sorting by SKU, Name, and Description columns
2. WHEN a user clicks a column header THEN the system SHALL sort the list by that column
3. WHEN the product list contains more than 20 items THEN the system SHALL display pagination controls
4. WHEN a user changes the page THEN the system SHALL load and display products for the selected page
5. WHEN a user changes the sort order THEN the system SHALL reset to page 1 and display sorted results

### Requirement 10: REST API Integration

**User Story:** As a developer, I want the component to use REST API endpoints, so that product operations are persisted to the backend.

#### Acceptance Criteria

1. WHEN the product list loads THEN the system SHALL call GET /products endpoint
2. WHEN a user creates a product THEN the system SHALL call POST /products endpoint with SKU, Name, and Description
3. WHEN a user updates a product THEN the system SHALL call PATCH /products/:id endpoint with updated fields
4. WHEN a user deletes a product THEN the system SHALL call DELETE /products/:id endpoint
5. WHEN an API response includes pagination metadata THEN the system SHALL use it to update the table configuration
6. WHEN an API error response includes a message THEN the system SHALL display that message to the user
