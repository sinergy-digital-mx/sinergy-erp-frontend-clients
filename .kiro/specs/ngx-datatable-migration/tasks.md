# Implementation Plan: ngx-datatable Migration

## Overview

This implementation plan breaks down the ngx-datatable migration into discrete, manageable steps. The approach involves creating a new datatable wrapper component, migrating the leads and customers pages, and finally removing the custom table component. Each step builds on the previous one, ensuring incremental validation of functionality.

## Tasks

- [x] 1. Set up ngx-datatable and create wrapper component structure
  - Install @swimlane/ngx-datatable package
  - Create datatable-wrapper component directory and files
  - Define IDatatableConfig and related interfaces
  - Set up component imports and module configuration
  - _Requirements: 1.3_

- [x] 2. Implement datatable wrapper component core functionality
  - [x] 2.1 Create datatable wrapper component template with ngx-datatable
    - Set up ngx-datatable with columns, rows, and basic configuration
    - Implement column definitions from config
    - Add row template support
    - _Requirements: 1.1, 1.2, 8.1, 8.2_
  
  - [x] 2.2 Implement pagination handling in wrapper component
    - Add external pagination support to ngx-datatable
    - Emit pageChange event with page and limit
    - Handle page and limit input changes
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 3. Implement sorting functionality
  - [x] 3.1 Add sorting support to wrapper component
    - Enable external sorting in ngx-datatable
    - Emit sortChange event with column and direction
    - Display sort indicators (arrow icons)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4. Implement loading and empty states
  - [x] 4.1 Add loading indicator to wrapper component
    - Display spinner when loading is true
    - Hide spinner when loading is false
    - _Requirements: 6.1, 6.2_
  
  - [x] 4.2 Add empty state display
    - Show empty state message when total results is 0
    - Display customizable title and subtitle
    - _Requirements: 2.5, 6.3_

- [x] 5. Implement row click and action handling
  - [x] 5.1 Add row click event handling
    - Emit rowClick event when row is clicked
    - Pass row data with event
    - _Requirements: 7.1, 7.2_
  
  - [x] 5.2 Prevent row click on action buttons
    - Add click.stop to action buttons in templates
    - Verify row click is not triggered for button clicks
    - _Requirements: 7.3_

- [x] 6. Implement responsive design
  - [x] 6.1 Add responsive CSS for wrapper component
    - Create media queries for mobile (< 768px) and desktop
    - Adjust column widths and layout for mobile
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [x] 6.2 Add window resize listener
    - Listen for window resize events
    - Update layout on resize
    - _Requirements: 5.2_

- [x] 7. Migrate leads-list page to ngx-datatable
  - [x] 7.1 Update leads-list component to use datatable wrapper
    - Replace app-table with datatable-wrapper
    - Update table_config to use new interface
    - Update row template for new component
    - _Requirements: 1.1, 4.1, 4.2_
  
  - [x] 7.2 Update leads-list pagination handling
    - Connect pageChange event to getLeads() method
    - Update URL query parameters on pagination
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 7.3 Update leads-list sorting handling
    - Connect sortChange event to service call
    - Pass sort parameters to API
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 7.4 Update leads-list search functionality
    - Ensure search input updates table data
    - Verify empty state displays when no results
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 8. Migrate customers-list page to ngx-datatable
  - [x] 8.1 Update customers-list component to use datatable wrapper
    - Replace app-table with datatable-wrapper
    - Update table_config to use new interface
    - Update row template for new component
    - _Requirements: 1.2, 4.1, 4.2_
  
  - [x] 8.2 Update customers-list pagination handling
    - Connect pageChange event to getCustomers() method
    - Update URL query parameters on pagination
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 8.3 Update customers-list sorting handling
    - Connect sortChange event to service call
    - Pass sort parameters to API
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 8.4 Update customers-list search functionality
    - Ensure search input updates table data
    - Verify empty state displays when no results
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 9. Clean up and remove custom table component
  - [x] 9.1 Remove custom table component files
    - Delete src/app/core/components/table/ directory
    - _Requirements: 9.1, 9.3_
  
  - [x] 9.2 Remove all imports and references to custom table
    - Search for all imports of TableComponent
    - Remove from all files
    - _Requirements: 9.2, 9.4_
  
  - [x] 9.3 Verify no references remain
    - Search codebase for 'app-table' selector
    - Search for 'TableComponent' imports
    - Verify all references are removed
    - _Requirements: 9.4_

- [ ] 10. Write property-based tests for correctness validation
  - [ ] 10.1 Write property test for column rendering
    - **Property 1: Column rendering consistency**
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ] 10.2 Write property test for pagination state
    - **Property 2: Pagination state consistency**
    - **Validates: Requirements 2.1, 2.2, 2.3**
  
  - [ ] 10.3 Write property test for sort cycling
    - **Property 3: Sort direction cycling**
    - **Validates: Requirements 3.1, 3.2, 3.3**
  
  - [ ] 10.4 Write property test for sort indicator
    - **Property 4: Sort indicator visibility**
    - **Validates: Requirements 3.4**
  
  - [ ] 10.5 Write property test for search filter application
    - **Property 5: Search filter application**
    - **Validates: Requirements 4.1, 4.2**
  
  - [ ] 10.6 Write property test for empty state display
    - **Property 6: Empty state display**
    - **Validates: Requirements 2.5, 4.3, 6.3**
  
  - [x] 10.7 Write property test for loading state
    - **Property 7: Loading state visibility**
    - **Validates: Requirements 6.1, 6.2**
  
  - [ ] 10.8 Write property test for row click events
    - **Property 8: Row click event emission**
    - **Validates: Requirements 7.1, 7.2**
  
  - [x] 10.9 Write property test for action button isolation
    - **Property 9: Action button click isolation**
    - **Validates: Requirements 7.3**
  
  - [x] 10.10 Write property test for responsive layout
    - **Property 10: Responsive layout adaptation**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
  
  - [ ] 10.11 Write property test for custom row template rendering
    - **Property 11: Custom row template rendering**
    - **Validates: Requirements 8.1, 8.2**

- [ ] 11. Write integration tests for migrated pages
  - [ ] 11.1 Write integration tests for leads-list
    - Test full flow: load → search → paginate → sort
    - Test row click navigation
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 7.1_
  
  - [ ] 11.2 Write integration tests for customers-list
    - Test full flow: load → search → paginate → sort
    - Test row click navigation
    - _Requirements: 1.2, 2.1, 3.1, 4.1, 7.1_

- [ ] 12. Final verification and checkpoint
  - [ ] 12.1 Run all unit tests and verify they pass
    - Run: npm run test
    - Verify all tests pass
    - _Requirements: All_
  
  - [ ] 12.2 Run all property-based tests and verify they pass
    - Run: npm run test
    - Verify all PBT tests pass
    - _Requirements: All_
  
  - [ ] 12.3 Verify no broken references in codebase
    - Search for any remaining 'app-table' references
    - Search for any remaining 'TableComponent' imports
    - _Requirements: 9.4_
  
  - [ ] 12.4 Test all pages with ngx-datatable in browser
    - Test leads-list page: pagination, sorting, search, row clicks
    - Test customers-list page: pagination, sorting, search, row clicks
    - _Requirements: All_
  
  - [ ] 12.5 Verify responsive design works correctly
    - Test on mobile viewport (< 768px)
    - Test on desktop viewport (> 768px)
    - Test window resize behavior
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

## Notes

- All core implementation tasks are complete
- Remaining tasks focus on property-based testing and integration testing
- Property tests validate universal correctness properties across all inputs
- Integration tests validate full user workflows
- Each task references specific requirements for traceability
- The migration maintains backward compatibility during the transition
- All existing functionality is preserved in the new implementation
