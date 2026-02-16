# Design Document: RBAC Tenant UI

## Overview

The RBAC Tenant UI is an Angular-based administrative interface for managing tenant users and their role-based access control permissions. The system provides two primary views: Users Management and Roles & Permissions Management. The architecture leverages RxJS for reactive state management, Angular's component-based structure for modularity, and TailwindCSS for responsive styling.

The design emphasizes:
- **Separation of Concerns**: Distinct services for API communication, state management, and business logic
- **Reactive Architecture**: RxJS observables for data flow and state updates
- **User Experience**: Immediate visual feedback, confirmation dialogs for destructive actions, and clear error messaging
- **Performance**: Client-side caching of modules, users, and roles to minimize API calls
- **Maintainability**: Modular components with clear responsibilities and testable interfaces

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    RBAC Tenant UI                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐      ┌──────────────────────┐   │
│  │  Users Management    │      │ Roles & Permissions  │   │
│  │      Component       │      │    Management        │   │
│  │                      │      │    Component         │   │
│  └──────────────────────┘      └──────────────────────┘   │
│           │                              │                 │
│           └──────────────┬───────────────┘                 │
│                          │                                 │
│                  ┌───────▼────────┐                        │
│                  │  State Service │                        │
│                  │  (RxJS Store)  │                        │
│                  └───────┬────────┘                        │
│                          │                                 │
│        ┌─────────────────┼─────────────────┐              │
│        │                 │                 │              │
│   ┌────▼────┐    ┌──────▼──────┐   ┌─────▼────┐         │
│   │  User   │    │  Role       │   │ Module   │         │
│   │ Service │    │ Service     │   │ Service  │         │
│   └────┬────┘    └──────┬──────┘   └─────┬────┘         │
│        │                │                │              │
│        └────────────────┼────────────────┘              │
│                         │                              │
│                  ┌──────▼──────┐                       │
│                  │ HTTP Client │                       │
│                  │  (Angular)  │                       │
│                  └──────┬──────┘                       │
│                         │                              │
└─────────────────────────┼──────────────────────────────┘
                          │
                   ┌──────▼──────┐
                   │   Backend   │
                   │     API     │
                   └─────────────┘
```

### Data Flow

1. **Component Initialization**: Components subscribe to state observables
2. **User Interaction**: User actions trigger service methods
3. **API Communication**: Services communicate with backend via HTTP
4. **State Update**: Services update the state store with API responses
5. **UI Refresh**: Components receive updated state and re-render

## Components and Interfaces

### Core Components

#### 1. RbacTenantUIComponent (Container)
- **Responsibility**: Route between Users Management and Roles & Permissions Management views
- **Inputs**: None
- **Outputs**: None
- **Dependencies**: Router, State Service

#### 2. UsersManagementComponent
- **Responsibility**: Display and manage tenant users
- **Structure**:
  - Left Panel: User list with search and filter
  - Right Panel: User details and role assignment
- **Inputs**: None
- **Outputs**: None
- **Dependencies**: User Service, State Service, Role Service

#### 3. RolesManagementComponent
- **Responsibility**: Display and manage tenant roles
- **Structure**:
  - Left Panel: Role list with search and create button
  - Right Panel: Role details and permission management
- **Inputs**: None
- **Outputs**: None
- **Dependencies**: Role Service, Module Service, State Service

#### 4. UserListComponent (Presentational)
- **Responsibility**: Display filtered user list
- **Inputs**: users$: Observable<User[]>, selectedUserId$: Observable<string>
- **Outputs**: userSelected: EventEmitter<User>
- **Dependencies**: None

#### 5. UserDetailsComponent (Presentational)
- **Responsibility**: Display user details and role assignment interface
- **Inputs**: user$: Observable<User>, userRoles$: Observable<Role[]>, availableRoles$: Observable<Role[]>
- **Outputs**: roleAssigned: EventEmitter<{userId: string, roleId: string}>, roleReplaced: EventEmitter<{userId: string, oldRoleId: string, newRoleId: string}>
- **Dependencies**: None

#### 6. RoleListComponent (Presentational)
- **Responsibility**: Display filtered role list
- **Inputs**: roles$: Observable<Role[]>, selectedRoleId$: Observable<string>
- **Outputs**: roleSelected: EventEmitter<Role>, createRoleClicked: EventEmitter<void>
- **Dependencies**: None

#### 7. RoleDetailsComponent (Presentational)
- **Responsibility**: Display role details and permission management interface
- **Inputs**: role$: Observable<Role>, modules$: Observable<Module[]>, isNewRole$: Observable<boolean>
- **Outputs**: roleSaved: EventEmitter<RoleDefinition>, roleDeleted: EventEmitter<string>, roleCanceled: EventEmitter<void>
- **Dependencies**: None

#### 8. PermissionCheckboxGroupComponent (Presentational)
- **Responsibility**: Display module-grouped permission checkboxes
- **Inputs**: modules$: Observable<Module[]>, selectedPermissions$: Observable<string[]>
- **Outputs**: permissionsChanged: EventEmitter<string[]>
- **Dependencies**: None

#### 9. ConfirmationDialogComponent (Reused from Core)
- **Responsibility**: Display confirmation dialog for destructive actions
- **Source**: `src/app/core/components/alert-dialog/alert-dialog.component.ts`
- **Usage**: Leverage existing AlertDialogComponent for confirmation dialogs
- **Inputs**: MAT_DIALOG_DATA with title, message, confirmText, cancelText
- **Outputs**: Dialog result (true for confirm, false for cancel)
- **Dependencies**: Angular Material Dialog

### Service Interfaces

#### Reusable Core Components

The following existing components from `src/app/core/components/` will be reused:

1. **AlertDialogComponent** (`alert-dialog/`): For confirmation dialogs on destructive actions
   - Uses Angular Material Dialog
   - Accepts data via MAT_DIALOG_DATA
   - Returns boolean result

2. **SearchComponent** (`search/`): For user and role search filtering
   - Provides debounced search input with 600ms delay
   - Emits searchChange events
   - Supports query parameter integration
   - Can be configured with placeholder and label

3. **CustomSnackbarComponent** (`custom-snackbar/`): For error and success messages
   - Uses Angular Material Snack Bar
   - Displays toast notifications
   - Accepts data via MAT_SNACK_BAR_DATA

4. **ButtonComponent** (`button/`): For action buttons (Save, Delete, Create, etc.)
   - Reusable button with consistent styling
   - Supports different button types and states

5. **SelectComponent** (`select/`): For role dropdown selection
   - Provides dropdown/select functionality
   - Can be configured with options

6. **TableComponent** (`table/`): For displaying user and role lists
   - Provides table layout with sorting and pagination
   - Can be configured with columns and data

7. **SpinnerComponent** (`spinner/`): For loading states
   - Shows loading indicator during API calls

#### Custom Service Interfaces

#### UserService
```typescript
interface UserService {
  getUsers(): Observable<User[]>;
  getUserRoles(userId: string): Observable<Role[]>;
  assignRoleToUser(userId: string, roleId: string): Observable<void>;
  replaceUserRole(userId: string, oldRoleId: string, newRoleId: string): Observable<void>;
}
```

#### RoleService
```typescript
interface RoleService {
  getRoles(): Observable<Role[]>;
  getRoleById(roleId: string): Observable<Role>;
  createRole(roleDefinition: RoleDefinition): Observable<Role>;
  updateRole(roleId: string, roleDefinition: RoleDefinition): Observable<Role>;
  deleteRole(roleId: string): Observable<void>;
}
```

#### ModuleService
```typescript
interface ModuleService {
  getModules(): Observable<Module[]>;
  getModulePermissions(): Observable<ModulePermission[]>;
}
```

#### StateService
```typescript
interface StateService {
  users$: Observable<User[]>;
  roles$: Observable<Role[]>;
  modules$: Observable<Module[]>;
  selectedUserId$: Observable<string | null>;
  selectedRoleId$: Observable<string | null>;
  filteredUsers$: Observable<User[]>;
  filteredRoles$: Observable<Role[]>;
  
  selectUser(userId: string): void;
  selectRole(roleId: string): void;
  setUserSearchFilter(filter: string): void;
  setUserStatusFilter(status: UserStatus): void;
  setRoleSearchFilter(filter: string): void;
  updateUsers(users: User[]): void;
  updateRoles(roles: Role[]): void;
  updateModules(modules: Module[]): void;
}
```

## Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  status: UserStatus; // 'active' | 'inactive' | 'pending'
  createdAt: Date;
  updatedAt: Date;
}
```

### Role Model
```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Array of permission IDs (e.g., 'leads.read', 'customers.create')
  createdAt: Date;
  updatedAt: Date;
}
```

### Module Model
```typescript
interface Module {
  id: string;
  name: string; // 'Leads', 'Customers', 'Activities'
  permissions: Permission[];
}

interface Permission {
  id: string;
  type: PermissionType; // 'read' | 'create' | 'edit' | 'delete' | 'download' | 'export'
  displayName: string;
}
```

### RoleDefinition Model (for creation/update)
```typescript
interface RoleDefinition {
  name: string;
  description: string;
  permissions: string[]; // Array of permission IDs
}
```

### UserStatus Type
```typescript
type UserStatus = 'active' | 'inactive' | 'pending';
```

## Error Handling

### Error Types

1. **Network Errors**: Connectivity issues with backend
   - Display: "Unable to connect to server. Please check your connection."
   - Action: Provide retry button

2. **Validation Errors**: Invalid input or business rule violations
   - Display: Specific error message from backend
   - Action: Highlight invalid fields, provide guidance

3. **Authorization Errors**: User lacks permission for operation
   - Display: "You do not have permission to perform this action."
   - Action: Disable operation, show reason

4. **Not Found Errors**: Resource doesn't exist
   - Display: "The requested resource was not found."
   - Action: Refresh list, clear selection

5. **Conflict Errors**: Operation conflicts with current state
   - Display: "This operation cannot be completed. The resource may have been modified."
   - Action: Refresh data, allow retry

### Error Handling Strategy

- All API calls wrapped in error handlers
- Errors displayed in toast notifications or inline messages
- UI state preserved on error (no partial updates)
- Retry mechanisms for transient failures
- Logging of errors for debugging

## Testing Strategy

### Unit Testing

Unit tests validate specific examples, edge cases, and error conditions:

1. **Component Tests**:
   - User list filtering by email and status
   - Role list filtering by name
   - Permission checkbox state management
   - Confirmation dialog interactions
   - Error message display

2. **Service Tests**:
   - API call construction and parameters
   - Response transformation and caching
   - Error handling and retry logic
   - State update correctness

3. **Edge Cases**:
   - Empty user/role lists
   - Users with no roles assigned
   - Roles with no permissions
   - Special characters in search filters
   - Concurrent API requests

### Property-Based Testing

Property-based tests validate universal properties across all inputs using a PBT library (e.g., fast-check for TypeScript):

1. **Search and Filter Properties**:
   - Filtering preserves list integrity (no items lost or duplicated)
   - Search results are subset of original list
   - Combining filters produces correct intersection

2. **Permission Management Properties**:
   - Permission selections are idempotent (selecting twice = selecting once)
   - Permission state round-trips correctly (save → load → save produces same result)
   - Module grouping preserves all permissions

3. **Role Assignment Properties**:
   - Role assignment is atomic (succeeds completely or fails completely)
   - User role list reflects all assignments
   - Role deletion removes it from all references

4. **State Consistency Properties**:
   - Selected item remains valid after list updates
   - Cached data matches backend state after refresh
   - UI state never enters invalid combinations

### Test Configuration

- Minimum 100 iterations per property test
- Each property test tagged with feature name and property number
- Unit tests focus on specific examples and error conditions
- Property tests focus on universal correctness across random inputs
- Both test types required for comprehensive coverage

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property-Based Testing Overview

Property-based testing (PBT) validates software correctness by testing universal properties across many generated inputs. Each property is a formal specification that should hold for all valid inputs.

### Core Principles

1. **Universal Quantification**: Every property must contain an explicit "for all" statement
2. **Requirements Traceability**: Each property must reference the requirements it validates
3. **Executable Specifications**: Properties must be implementable as automated tests
4. **Comprehensive Coverage**: Properties should cover all testable acceptance criteria

### Correctness Properties

#### Property 1: Module Caching
*For any* module fetch operation, fetching modules a second time should return the same modules without making another API call.
**Validates: Requirements 1.1, 1.5**

#### Property 2: Module Grouping Completeness
*For any* set of modules and their permissions, all permissions should be grouped by their module, with no permissions lost or duplicated.
**Validates: Requirements 1.2, 1.3**

#### Property 3: User Caching
*For any* user fetch operation, fetching users a second time should return the same users without making another API call.
**Validates: Requirements 2.1, 2.5**

#### Property 4: User Email Search Filtering
*For any* user list and search query, the filtered results should only contain users whose email contains the search text (case-insensitive).
**Validates: Requirements 3.2, 3.3**

#### Property 5: User Status Filtering
*For any* user list and status filter, the filtered results should only contain users matching the selected status, or all users if "All" is selected.
**Validates: Requirements 4.2, 4.3**

#### Property 6: Combined User Filters
*For any* user list, search query, and status filter, applying both filters should produce the intersection of results that match both criteria.
**Validates: Requirements 4.4**

#### Property 7: User Details Display
*For any* selected user, the user details panel should display the user's email, status, and creation date.
**Validates: Requirements 5.1, 5.2**

#### Property 8: User Roles Fetch
*For any* user, fetching their roles should return all roles currently assigned to that user.
**Validates: Requirements 5.3, 5.4**

#### Property 9: Role Assignment API Call
*For any* user and role, assigning the role should send an API request with the correct user ID and role ID.
**Validates: Requirements 6.3**

#### Property 10: Role Assignment UI Update
*For any* successful role assignment, the user's role list should immediately include the newly assigned role.
**Validates: Requirements 6.4**

#### Property 11: Role Assignment Error Handling
*For any* failed role assignment, the UI state should remain unchanged and an error message should be displayed.
**Validates: Requirements 6.5**

#### Property 12: Role Replacement API Call
*For any* user and new role, replacing the user's role should send an API request with the correct parameters.
**Validates: Requirements 7.2**

#### Property 13: Role Replacement UI Update
*For any* successful role replacement, the user's displayed role should immediately reflect the new role.
**Validates: Requirements 7.3**

#### Property 14: Role Replacement Error Handling
*For any* failed role replacement, the user's displayed role should remain unchanged and an error message should be displayed.
**Validates: Requirements 7.4**

#### Property 15: Role Caching
*For any* role fetch operation, fetching roles a second time should return the same roles without making another API call.
**Validates: Requirements 8.1, 8.5**

#### Property 16: Role Name Search Filtering
*For any* role list and search query, the filtered results should only contain roles whose name contains the search text (case-insensitive).
**Validates: Requirements 9.2, 9.3**

#### Property 17: Role Details Display
*For any* selected role, the role details panel should display the role name and description.
**Validates: Requirements 10.1, 10.2**

#### Property 18: Role Permissions Display
*For any* role, all available modules and their permissions should be displayed as checkboxes in the role details panel.
**Validates: Requirements 10.3**

#### Property 19: Role Permission Checkbox State
*For any* role, checkboxes for permissions assigned to that role should be checked, and checkboxes for unassigned permissions should be unchecked.
**Validates: Requirements 10.4, 10.5**

#### Property 20: Role Creation API Call
*For any* role name, description, and permission set, creating a role should send an API request with the correct parameters.
**Validates: Requirements 11.4**

#### Property 21: Role Creation UI Update
*For any* successfully created role, the new role should immediately appear in the role list.
**Validates: Requirements 11.5**

#### Property 22: Role Modification State Tracking
*For any* role with modified permissions, the UI should indicate that the role has been modified (e.g., enable save button).
**Validates: Requirements 12.2**

#### Property 23: Role Update API Call
*For any* role with modified permissions, saving should send an API request with the updated permission set.
**Validates: Requirements 12.3**

#### Property 24: Role Update UI Update
*For any* successfully updated role, the role list and details panel should immediately reflect the updated permissions.
**Validates: Requirements 12.4**

#### Property 25: Role Update Error Handling
*For any* failed role update, the permission checkboxes should revert to their previous state and an error message should be displayed.
**Validates: Requirements 12.5**

#### Property 26: Role Deletion API Call
*For any* role, deleting it should send an API request with the correct role ID.
**Validates: Requirements 13.4**

#### Property 27: Role Deletion UI Update
*For any* successfully deleted role, the role should immediately be removed from the role list and the details panel should be cleared.
**Validates: Requirements 13.5**

#### Property 28: Confirmation Dialog Cancellation
*For any* confirmation dialog, clicking "Cancel" should close the dialog without executing the destructive action and maintain the current UI state.
**Validates: Requirements 14.4**

#### Property 29: Confirmation Dialog Confirmation
*For any* confirmation dialog, clicking "Confirm" should close the dialog and proceed with the destructive action.
**Validates: Requirements 14.5**

#### Property 30: Permission Update Immediacy
*For any* role with modified permissions that are successfully saved, the permission display should immediately reflect the changes.
**Validates: Requirements 15.1**

#### Property 31: User Role Assignment Immediacy
*For any* user with a newly assigned role, the user's role display should immediately reflect the assignment.
**Validates: Requirements 15.2**

#### Property 32: New Role List Addition
*For any* newly created role, it should immediately appear in the role list.
**Validates: Requirements 15.3**

#### Property 33: Deleted Role List Removal
*For any* deleted role, it should immediately be removed from the role list.
**Validates: Requirements 15.4**

#### Property 34: API Error Display
*For any* failed API request, an error message should be displayed to the user.
**Validates: Requirements 16.1**

#### Property 35: Error State Preservation
*For any* failed operation, the UI state should remain unchanged, allowing the user to retry.
**Validates: Requirements 16.2**

#### Property 36: Network Error Messaging
*For any* network connectivity error, a message indicating connectivity issues should be displayed.
**Validates: Requirements 16.3**

#### Property 37: Validation Error Details
*For any* validation error from the backend, specific information about the validation failure should be displayed.
**Validates: Requirements 16.4**

#### Property 38: Error Dismissal
*For any* displayed error message, the user should be able to dismiss it.
**Validates: Requirements 16.5**

#### Property 39: Permission Module Grouping
*For any* set of permissions, they should be grouped by their module name with no permissions lost or duplicated.
**Validates: Requirements 17.1**

#### Property 40: Module Permission Completeness
*For any* expanded module section, all available permissions for that module should be displayed.
**Validates: Requirements 17.3**

#### Property 41: Permission Type Display
*For any* permission, its type (Read, Create, Edit, Delete, Download, Export) should be clearly displayed.
**Validates: Requirements 17.5**

