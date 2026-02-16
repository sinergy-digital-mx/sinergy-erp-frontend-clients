# RBAC Tenant UI Module

This module provides a comprehensive interface for managing tenant users and their role-based access control permissions.

## Directory Structure

```
rbac-tenant-ui/
├── models/
│   └── index.ts              # TypeScript interfaces and types
├── services/
│   ├── index.ts              # Service exports
│   ├── module.service.ts      # Module and permission management
│   ├── user.service.ts        # User management
│   ├── role.service.ts        # Role management
│   └── state.service.ts       # Centralized state management
├── components/
│   ├── users-management/      # Users management container
│   ├── roles-management/      # Roles management container
│   └── ...                    # Other components
└── README.md                  # This file
```

## Services

### ModuleService
Handles fetching and caching of available modules and their permissions.

**Methods:**
- `getModules(): Observable<Module[]>` - Fetch all modules with caching
- `getModulePermissions(): Observable<ModulePermission[]>` - Fetch all module permissions with caching
- `clearCache(): void` - Clear the module cache

### UserService
Handles user-related API calls and caching.

**Methods:**
- `getUsers(): Observable<User[]>` - Fetch all users with caching
- `getUserRoles(userId: string): Observable<Role[]>` - Fetch roles for a specific user
- `assignRoleToUser(userId: string, roleId: string): Observable<void>` - Assign a role to a user
- `replaceUserRole(userId: string, oldRoleId: string, newRoleId: string): Observable<void>` - Replace a user's role
- `clearCache(): void` - Clear the user cache

### RoleService
Handles role-related API calls and caching.

**Methods:**
- `getRoles(): Observable<Role[]>` - Fetch all roles with caching
- `getRoleById(roleId: string): Observable<Role>` - Fetch a specific role
- `createRole(roleDefinition: RoleDefinition): Observable<Role>` - Create a new role
- `updateRole(roleId: string, roleDefinition: RoleDefinition): Observable<Role>` - Update an existing role
- `deleteRole(roleId: string): Observable<void>` - Delete a role
- `clearCache(): void` - Clear the role cache

### StateService
Centralized RxJS-based state management for the RBAC Tenant UI.

**Observables:**
- `users$: Observable<User[]>` - All users
- `roles$: Observable<Role[]>` - All roles
- `modules$: Observable<Module[]>` - All modules
- `selectedUserId$: Observable<string | null>` - Currently selected user ID
- `selectedRoleId$: Observable<string | null>` - Currently selected role ID
- `filteredUsers$: Observable<User[]>` - Users filtered by search and status
- `filteredRoles$: Observable<Role[]>` - Roles filtered by search

**Methods:**
- User management: `selectUser()`, `clearUserSelection()`, `setUserSearchFilter()`, `setUserStatusFilter()`, `updateUsers()`
- Role management: `selectRole()`, `clearRoleSelection()`, `setRoleSearchFilter()`, `updateRoles()`
- Module management: `updateModules()`
- Utilities: `resetFilters()`, `resetSelections()`

## Models

### User
```typescript
interface User {
  id: string;
  email: string;
  status: UserStatus; // 'active' | 'inactive' | 'pending'
  createdAt: Date;
  updatedAt: Date;
}
```

### Role
```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Array of permission IDs
  createdAt: Date;
  updatedAt: Date;
}
```

### Module
```typescript
interface Module {
  id: string;
  name: string;
  permissions: Permission[];
}
```

### Permission
```typescript
interface Permission {
  id: string;
  type: PermissionType; // 'read' | 'create' | 'edit' | 'delete' | 'download' | 'export'
  displayName: string;
}
```

### RoleDefinition
```typescript
interface RoleDefinition {
  name: string;
  description: string;
  permissions: string[];
}
```

## HTTP Interceptor Integration

All services use Angular's `HttpClient` which is automatically integrated with the existing HTTP interceptor (`src/app/core/services/interceptor.service.ts`). This ensures:
- Consistent error handling across all API calls
- Automatic token injection for authentication
- Request/response transformation

## Usage Example

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService, StateService } from './services';

@Component({
  selector: 'app-users-management',
  template: `...`
})
export class UsersManagementComponent implements OnInit {
  users$ = this.state.filteredUsers$;
  selectedUserId$ = this.state.selectedUserId$;

  constructor(
    private userService: UserService,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.state.updateUsers(users);
    });
  }

  selectUser(userId: string): void {
    this.state.selectUser(userId);
  }

  searchUsers(query: string): void {
    this.state.setUserSearchFilter(query);
  }
}
```
