# Requirements Document: Permission-Based Dynamic UI Control

## Introduction

This system provides efficient permission-based control of UI elements in Angular applications. It enables showing/hiding buttons, menus, columns, and form fields based on authenticated user permissions extracted from JWT tokens. The system uses O(1) permission lookups via Set data structures and supports multiple permission syntaxes for flexibility.

## Glossary

- **Permission**: A string in format "entity:Action" (e.g., "customers:Create") representing a user capability
- **Entity**: The resource type being controlled (e.g., "customers", "leads", "users")
- **Action**: The operation type in PascalCase (Create, Read, Update, Delete, Download, Export, Edit)
- **JWT Token**: JSON Web Token containing a "permissions" claim with array of permission strings
- **AuthService**: Angular service managing authentication state and permission validation
- **appCan Directive**: Structural directive controlling element visibility based on permissions
- **hasPermission Pipe**: Pipe validating permissions in templates
- **BehaviorSubject**: RxJS subject maintaining current permission state as observable
- **Permission Set**: Internal Set<string> data structure for O(1) permission lookups

## Requirements

### Requirement 1: AuthService Permission Storage and Retrieval

**User Story:** As a developer, I want the AuthService to efficiently store and retrieve user permissions, so that permission checks are fast and the system remains responsive.

#### Acceptance Criteria

1. WHEN the AuthService is initialized, THE AuthService SHALL maintain permissions in a BehaviorSubject containing a Set<string> for O(1) lookups
2. WHEN setPermissions(permissions: string[]) is called, THE AuthService SHALL update the internal permission Set and emit the new state through permissions$ observable
3. WHEN hasPermission(permission: string) is called, THE AuthService SHALL return true if the permission exists in the Set, false otherwise
4. WHEN hasPermission is called with different case variations, THE AuthService SHALL perform case-insensitive entity matching (e.g., "Customers:Create" matches "customers:Create")
5. WHEN can(action: string, entity: string) is called, THE AuthService SHALL construct "entity:Action" format and check if it exists in the permission Set
6. WHEN canRead(entity: string), canCreate(entity: string), canUpdate(entity: string), or canDelete(entity: string) is called, THE AuthService SHALL delegate to can() with the appropriate action
7. WHEN a JWT token is decoded on login, THE AuthService SHALL extract the "permissions" claim and call setPermissions() with the array value
8. WHEN permissions$ observable is subscribed to, THE AuthService SHALL emit the current permission Set and all future updates

### Requirement 2: appCan Directive for Conditional Rendering

**User Story:** As a developer, I want to use a directive to conditionally render UI elements based on permissions, so that I can control visibility declaratively in templates.

#### Acceptance Criteria

1. WHEN *appCan="{ action: 'Create', entity: 'customers' }" is used, THE directive SHALL render the element only if the user has the "customers:Create" permission
2. WHEN *appCan="'customers:Create'" is used, THE directive SHALL render the element only if the user has that exact permission
3. WHEN *appCan="['customers:Create', 'customers:Update']" is used, THE directive SHALL render the element if the user has ANY of the listed permissions (OR logic)
4. WHEN the user's permissions change, THE directive SHALL immediately update element visibility without requiring manual refresh
5. WHEN the directive is destroyed, THE directive SHALL unsubscribe from the permissions$ observable to prevent memory leaks
6. WHEN the directive evaluates permissions, THE directive SHALL use case-insensitive entity matching
7. WHEN an element is hidden by the directive, THE element SHALL be completely removed from the DOM (not just hidden with CSS)

### Requirement 3: hasPermission Pipe for Template Validation

**User Story:** As a developer, I want to use a pipe to check permissions in templates, so that I can conditionally render elements with *ngIf syntax.

#### Acceptance Criteria

1. WHEN 'customers:Create' | hasPermission is used in a template, THE pipe SHALL return true if the user has that permission, false otherwise
2. WHEN the pipe receives a permission string, THE pipe SHALL perform case-insensitive entity matching
3. WHEN the user's permissions change, THE pipe SHALL automatically update its output (pure: false)
4. WHEN the pipe is used multiple times in a template, THE pipe SHALL efficiently check permissions without redundant lookups

### Requirement 4: JWT Token Decoding and Permission Extraction

**User Story:** As a developer, I want the system to automatically extract permissions from JWT tokens, so that permissions are available immediately after login.

#### Acceptance Criteria

1. WHEN a JWT token is provided to the AuthService, THE AuthService SHALL decode the token without signature validation (UI-only validation)
2. WHEN the JWT token is decoded, THE AuthService SHALL extract the "permissions" claim containing an array of permission strings
3. WHEN the permissions claim is extracted, THE AuthService SHALL call setPermissions() to update the internal state
4. WHEN the JWT token is invalid or missing the permissions claim, THE AuthService SHALL handle the error gracefully and maintain an empty permission Set

### Requirement 5: Permission Format and Case Handling

**User Story:** As a developer, I want consistent permission formatting and case handling, so that permission checks work reliably across the application.

#### Acceptance Criteria

1. THE system SHALL support permission format "entity:Action" where entity is lowercase and Action is PascalCase
2. WHEN checking permissions, THE system SHALL normalize entity names to lowercase for comparison
3. WHEN checking permissions, THE system SHALL preserve Action case as-is (PascalCase)
4. WHEN a user checks "customers:Create", THE system SHALL match "Customers:Create", "CUSTOMERS:Create", and "customers:create" (case-insensitive entity only)
5. WHEN permissions are stored, THE system SHALL store them in normalized format (lowercase entity:PascalCase action)

### Requirement 6: Integration with Angular Components

**User Story:** As a developer, I want to easily integrate permission checks into existing Angular components, so that I can control button visibility, menu sections, table columns, and form fields.

#### Acceptance Criteria

1. WHEN a Create button is decorated with *appCan="{ action: 'Create', entity: 'customers' }", THE button SHALL only render if the user has "customers:Create" permission
2. WHEN a menu section is decorated with *appCan="['customers:Read', 'customers:Update']", THE menu SHALL only render if the user has at least one of those permissions
3. WHEN a table column is decorated with *appCan="'customers:Delete'", THE column SHALL only render if the user has "customers:Delete" permission
4. WHEN a form field is decorated with *appCan="{ action: 'Update', entity: 'customers' }", THE field SHALL only render if the user has "customers:Update" permission
5. WHEN permissions change after initial render, THE component SHALL automatically update element visibility without manual intervention

