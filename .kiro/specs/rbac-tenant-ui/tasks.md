# Implementation Plan: RBAC Tenant UI

## Overview

The implementation follows a modular, incremental approach building from core services through UI components to integration. The architecture leverages existing core components (AlertDialog, Search, Snackbar, Button, Select, Table, Spinner) to accelerate development. State management uses RxJS observables for reactive data flow. Each task builds on previous tasks with checkpoints to validate progress.

## Tasks

- [x] 1. Set up project structure and core services
  - Create RBAC module directory structure under `src/app/features/rbac-tenant-ui/`
  - Create service files: `user.service.ts`, `role.service.ts`, `module.service.ts`, `state.service.ts`
  - Set up HTTP interceptor integration for API calls
  - Create TypeScript interfaces for User, Role, Module, Permission, RoleDefinition
  - _Requirements: 1.1, 2.1, 8.1_

- [x] 2. Implement Module Service
  - [x] 2.1 Create ModuleService with getModules() and getModulePermissions() methods
    - Implement API call to GET /tenant/modules
    - Implement in-memory caching to avoid redundant API calls
    - Return Observable<Module[]> with module grouping
    - _Requirements: 1.1, 1.5_
  
  - [x] 2.2 Write property test for module caching
    - **Property 1: Module Caching**
    - **Validates: Requirements 1.1, 1.5**
  
  - [x] 2.3 Write property test for module grouping
    - **Property 2: Module Grouping Completeness**
    - **Validates: Requirements 1.2, 1.3**

- [x] 3. Implement User Service
  - [x] 3.1 Create UserService with getUsers(), getUserRoles(), assignRoleToUser(), replaceUserRole() methods
    - Implement API calls for all user endpoints
    - Implement in-memory caching for user list
    - Return Observables for all operations
    - _Requirements: 2.1, 5.3, 6.3, 7.2_
  
  - [x] 3.2 Write property tests for user operations
    - **Property 3: User Caching**
    - **Property 9: Role Assignment API Call**
    - **Property 12: Role Replacement API Call**
    - **Validates: Requirements 2.1, 2.5, 6.3, 7.2**

- [x] 4. Implement Role Service
  - [x] 4.1 Create RoleService with getRoles(), getRoleById(), createRole(), updateRole(), deleteRole() methods
    - Implement API calls for all role endpoints
    - Implement in-memory caching for role list
    - Return Observables for all operations
    - _Requirements: 8.1, 11.4, 12.3, 13.4_
  
  - [x] 4.2 Write property tests for role operations
    - **Property 15: Role Caching**
    - **Property 20: Role Creation API Call**
    - **Property 23: Role Update API Call**
    - **Property 26: Role Deletion API Call**
    - **Validates: Requirements 8.1, 8.5, 11.4, 12.3, 13.4**

- [x] 5. Implement State Service (RxJS Store)
  - [x] 5.1 Create StateService with BehaviorSubjects for users, roles, modules, selectedUserId, selectedRoleId
    - Implement filter streams for filtered users and roles
    - Implement search and status filter logic
    - Expose observables for component subscription
    - _Requirements: 3.2, 3.3, 4.2, 4.3, 4.4, 9.2, 9.3, 16.1_
  
  - [x] 5.2 Write property tests for state management
    - **Property 4: User Email Search Filtering**
    - **Property 5: User Status Filtering**
    - **Property 6: Combined User Filters**
    - **Property 16: Role Name Search Filtering**
    - **Validates: Requirements 3.2, 3.3, 4.2, 4.3, 4.4, 9.2, 9.3**

- [x] 6. Create Users Management container component
  - [x] 6.1 Create UsersManagementComponent with left and right panel layout
    - Set up two-column layout using TailwindCSS
    - Subscribe to state observables for users, selected user, filtered users
    - Implement panel switching logic
    - _Requirements: 2.1, 3.1, 4.1, 5.1_
  
  - [x] 6.2 Write unit tests for Users Management layout
    - Test left and right panel rendering
    - Test panel switching on user selection
    - _Requirements: 2.1, 5.1_

- [x] 7. Create user list presentational component
  - [x] 7.1 Create UserListComponent to display filtered user list
    - Display users with email and status
    - Implement user selection with click handler
    - Emit userSelected event
    - _Requirements: 2.2, 2.3, 5.1_
  
  - [x] 7.2 Write property test for user list display
    - **Property 7: User Details Display**
    - **Validates: Requirements 2.2, 2.3**

- [x] 8. Create user search and filter component
  - [x] 8.1 Create search input using existing SearchComponent
    - Integrate SearchComponent for email search
    - Emit search filter changes to state service
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [x] 8.2 Create status filter dropdown using existing SelectComponent
    - Provide filter options: All, Active, Inactive, Pending
    - Emit status filter changes to state service
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [x] 8.3 Write property tests for search and filter
    - **Property 4: User Email Search Filtering**
    - **Property 5: User Status Filtering**
    - **Property 6: Combined User Filters**
    - **Validates: Requirements 3.2, 3.3, 4.2, 4.3, 4.4**

- [x] 9. Create user details presentational component
  - [x] 9.1 Create UserDetailsComponent to display selected user information
    - Display user email, status, and creation date
    - Display user's current roles
    - Show message if no roles assigned
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 9.2 Write property tests for user details
    - **Property 8: User Roles Fetch**
    - **Validates: Requirements 5.3, 5.4**

- [x] 10. Create role assignment interface
  - [x] 10.1 Create role assignment dropdown using existing SelectComponent
    - Display available roles in dropdown
    - Emit roleAssigned event when role is selected
    - Handle role assignment API call through UserService
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 10.2 Implement role assignment success/error handling
    - Update user's role list on successful assignment
    - Display error message on failure using CustomSnackbarComponent
    - Preserve UI state on error
    - _Requirements: 6.4, 6.5, 16.1, 16.2_
  
  - [x] 10.3 Write property tests for role assignment
    - **Property 10: Role Assignment UI Update**
    - **Property 11: Role Assignment Error Handling**
    - **Validates: Requirements 6.4, 6.5**

- [x] 11. Create role replacement interface
  - [x] 11.1 Create role replacement dropdown for users with existing roles
    - Display available roles in dropdown
    - Emit roleReplaced event when new role is selected
    - Handle role replacement API call through UserService
    - _Requirements: 7.1, 7.2_
  
  - [x] 11.2 Implement role replacement success/error handling
    - Update user's displayed role on successful replacement
    - Display error message on failure using CustomSnackbarComponent
    - Preserve previous role on error
    - _Requirements: 7.3, 7.4, 16.1, 16.2_
  
  - [x] 11.3 Write property tests for role replacement
    - **Property 13: Role Replacement UI Update**
    - **Property 14: Role Replacement Error Handling**
    - **Validates: Requirements 7.3, 7.4**

- [x] 12. Checkpoint - Users Management view complete
  - Ensure all tests pass for Users Management view
  - Verify user list displays correctly with search and filter
  - Verify user details display with role assignment and replacement
  - Ask the user if questions arise

- [x] 13. Create Roles & Permissions Management container component
  - [x] 13.1 Create RolesManagementComponent with left and right panel layout
    - Set up two-column layout using TailwindCSS
    - Subscribe to state observables for roles, selected role, filtered roles
    - Implement panel switching logic
    - _Requirements: 8.1, 9.1, 10.1_
  
  - [x] 13.2 Write unit tests for Roles Management layout
    - Test left and right panel rendering
    - Test panel switching on role selection
    - _Requirements: 8.1, 10.1_

- [x] 14. Create role list presentational component
  - [x] 14.1 Create RoleListComponent to display filtered role list
    - Display roles with name and permission count
    - Implement role selection with click handler
    - Emit roleSelected event
    - _Requirements: 8.2, 8.3_
  
  - [x] 14.2 Write property test for role list display
    - **Property 16: Role Name Search Filtering**
    - **Validates: Requirements 8.2, 8.3**

- [x] 15. Create role search component
  - [x] 15.1 Create search input using existing SearchComponent
    - Integrate SearchComponent for role name search
    - Emit search filter changes to state service
    - _Requirements: 9.1, 9.2, 9.3_
  
  - [x] 15.2 Write property test for role search
    - **Property 16: Role Name Search Filtering**
    - **Validates: Requirements 9.2, 9.3**

- [x] 16. Create "Create New Role" button and form
  - [x] 16.1 Create button using existing ButtonComponent
    - Display "Create New Role" button in left panel
    - Emit createRoleClicked event
    - _Requirements: 11.1_
  
  - [x] 16.2 Create role creation form component
    - Display form for role name and description input
    - Display permission checkboxes grouped by module
    - Enable save button only when name is entered and permissions selected
    - _Requirements: 11.2, 11.3, 17.1, 17.2, 17.3_
  
  - [x] 16.3 Write property test for role creation form
    - **Property 20: Role Creation API Call**
    - **Property 21: Role Creation UI Update**
    - **Validates: Requirements 11.4, 11.5**

- [x] 17. Create permission checkbox group component
  - [x] 17.1 Create PermissionCheckboxGroupComponent to display module-grouped permissions
    - Fetch modules from ModuleService
    - Display modules as collapsible sections
    - Display permissions as checkboxes within each module
    - Show permission types clearly (Read, Create, Edit, Delete, Download, Export)
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_
  
  - [x] 17.2 Write property tests for permission display
    - **Property 39: Permission Module Grouping**
    - **Property 40: Module Permission Completeness**
    - **Property 41: Permission Type Display**
    - **Validates: Requirements 17.1, 17.3, 17.5**

- [x] 18. Create role details presentational component
  - [x] 18.1 Create RoleDetailsComponent to display selected role information
    - Display role name and description
    - Display permission checkboxes using PermissionCheckboxGroupComponent
    - Mark checkboxes as checked/unchecked based on role's permissions
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [x] 18.2 Write property tests for role details
    - **Property 17: Role Details Display**
    - **Property 18: Role Permissions Display**
    - **Property 19: Role Permission Checkbox State**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

- [x] 19. Implement role modification and save functionality
  - [x] 19.1 Implement permission checkbox change tracking
    - Track which permissions have been modified
    - Enable save button when modifications detected
    - _Requirements: 12.2_
  
  - [x] 19.2 Implement role update API call and success handling
    - Call RoleService.updateRole() with modified permissions
    - Update role in role list on success
    - Update role details display on success
    - _Requirements: 12.3, 12.4_
  
  - [x] 19.3 Implement role update error handling
    - Display error message using CustomSnackbarComponent
    - Revert permission checkboxes to previous state on error
    - Preserve UI state for retry
    - _Requirements: 12.5, 16.1, 16.2_
  
  - [x] 19.4 Write property tests for role modification
    - **Property 22: Role Modification State Tracking**
    - **Property 24: Role Update UI Update**
    - **Property 25: Role Update Error Handling**
    - **Validates: Requirements 12.2, 12.4, 12.5**

- [x] 20. Implement role deletion functionality
  - [x] 20.1 Create delete button using existing ButtonComponent
    - Display "Delete Role" button in role details panel
    - _Requirements: 13.1_
  
  - [x] 20.2 Implement confirmation dialog using existing AlertDialogComponent
    - Display confirmation dialog on delete button click
    - Show consequences of deletion
    - Provide Cancel and Confirm buttons
    - _Requirements: 13.2, 13.3, 14.1, 14.2, 14.3_
  
  - [x] 20.3 Implement role deletion API call and success handling
    - Call RoleService.deleteRole() on confirmation
    - Remove role from role list on success
    - Clear role details panel on success
    - _Requirements: 13.4, 13.5_
  
  - [x] 20.4 Implement confirmation dialog cancellation
    - Close dialog without executing deletion on Cancel click
    - Maintain current UI state
    - _Requirements: 14.4_
  
  - [x] 20.5 Write property tests for role deletion
    - **Property 27: Role Deletion UI Update**
    - **Property 28: Confirmation Dialog Cancellation**
    - **Property 29: Confirmation Dialog Confirmation**
    - **Validates: Requirements 13.5, 14.4, 14.5**

- [x] 21. Implement real-time UI updates
  - [x] 21.1 Implement immediate permission display updates
    - Update permission display immediately after successful save
    - _Requirements: 15.1_
  
  - [x] 21.2 Implement immediate user role display updates
    - Update user's role display immediately after successful assignment/replacement
    - _Requirements: 15.2_
  
  - [x] 21.3 Implement immediate role list updates
    - Add new roles to role list immediately after creation
    - Remove deleted roles from role list immediately after deletion
    - _Requirements: 15.3, 15.4_
  
  - [x] 21.4 Write property tests for real-time updates
    - **Property 30: Permission Update Immediacy**
    - **Property 31: User Role Assignment Immediacy**
    - **Property 32: New Role List Addition**
    - **Property 33: Deleted Role List Removal**
    - **Validates: Requirements 15.1, 15.2, 15.3, 15.4**

- [x] 22. Implement comprehensive error handling
  - [x] 22.1 Implement API error display using CustomSnackbarComponent
    - Display error messages for all failed API calls
    - Show specific error details when available
    - _Requirements: 16.1, 16.4_
  
  - [x] 22.2 Implement error state preservation
    - Preserve UI state on all errors
    - Allow user to retry operations
    - _Requirements: 16.2_
  
  - [x] 22.3 Implement network error handling
    - Display connectivity error messages
    - Provide retry mechanism
    - _Requirements: 16.3_
  
  - [x] 22.4 Implement error dismissal
    - Allow users to dismiss error messages
    - _Requirements: 16.5_
  
  - [x] 22.5 Write property tests for error handling
    - **Property 34: API Error Display**
    - **Property 35: Error State Preservation**
    - **Property 36: Network Error Messaging**
    - **Property 37: Validation Error Details**
    - **Property 38: Error Dismissal**
    - **Validates: Requirements 16.1, 16.2, 16.3, 16.4, 16.5**

- [x] 23. Checkpoint - Roles & Permissions Management view complete
  - Ensure all tests pass for Roles & Permissions Management view
  - Verify role list displays correctly with search
  - Verify role details display with permission management
  - Verify role creation, modification, and deletion work correctly
  - Ask the user if questions arise

- [x] 24. Create main RBAC Tenant UI container component
  - [x] 24.1 Create RbacTenantUIComponent to route between views
    - Set up routing between Users Management and Roles & Permissions Management
    - Create navigation tabs or menu
    - Initialize services and state on component load
    - _Requirements: 1.1, 2.1, 8.1_
  
  - [x] 24.2 Write unit tests for main container
    - Test view switching
    - Test service initialization
    - _Requirements: 1.1, 2.1, 8.1_

- [x] 25. Integration and wiring
  - [x] 25.1 Wire all components together in RBAC module
    - Import all components and services in module
    - Set up dependency injection
    - Configure routing
    - _Requirements: All_
  
  - [x] 25.2 Write integration tests
    - Test complete user management flow
    - Test complete role management flow
    - Test error scenarios
    - _Requirements: All_

- [x] 26. Final checkpoint - Complete RBAC Tenant UI
  - Ensure all tests pass
  - Verify all requirements are met
  - Verify all properties are validated
  - Ask the user if questions arise

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Existing core components are reused to accelerate development
- All API calls use the existing HTTP interceptor for consistent error handling
