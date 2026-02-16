# RBAC Tenant UI - Settings Structure

## Overview

The RBAC Tenant UI has been reorganized with a new Settings menu structure. All management features are now accessible through a grid-based settings interface.

## Navigation Structure

```
/settings (Settings Home - Grid Menu)
├── /settings/users (Users Management)
└── /settings/roles (Roles & Permissions Management)
```

## Components

### SettingsComponent
- **Path**: `pages/settings/settings.component.ts`
- **Purpose**: Main settings page with grid menu
- **Features**:
  - Grid layout displaying available management sections
  - Navigation cards for Users and Roles management
  - Responsive design (1 column on mobile, 2 on tablet, 3 on desktop)

### RbacTenantUIComponent
- **Path**: `rbac-tenant-ui.component.ts`
- **Purpose**: Main container component for RBAC module
- **Features**:
  - Handles routing between Settings, Users, and Roles views
  - Provides router outlet for child components

### UsersManagementComponent
- **Path**: `pages/users-management/users-management.component.ts`
- **Purpose**: Manage tenant users and their roles
- **Features**:
  - Two-column layout (user list + details)
  - Search and filter users
  - Assign/replace roles
  - Back button to Settings

### RolesManagementComponent
- **Path**: `pages/roles-management/roles-management.component.ts`
- **Purpose**: Manage tenant roles and permissions
- **Features**:
  - Two-column layout (role list + details)
  - Search roles
  - Create new roles
  - Back button to Settings

## Routing Configuration

The routing is configured in `rbac-tenant-ui.routes.ts`:

```typescript
{
  path: 'settings',
  loadChildren: () =>
    import('./features/rbac-tenant-ui/rbac-tenant-ui.routes')
      .then(m => m.RBAC_TENANT_UI_ROUTES),
}
```

## Usage

### Accessing Settings
Navigate to `/settings` to view the settings grid menu.

### Accessing Users Management
Click the "Users" card or navigate to `/settings/users`.

### Accessing Roles Management
Click the "Roles & Permissions" card or navigate to `/settings/roles`.

### Returning to Settings
Each management view has a "Back to Settings" button in the header.

## Styling

All components use TailwindCSS for styling:
- Responsive grid layout
- Consistent color scheme (blue primary)
- Hover effects and transitions
- Accessible focus states

## Future Enhancements

- Add more management sections to the settings grid
- Implement breadcrumb navigation
- Add settings search functionality
- Create settings preferences/configuration section
