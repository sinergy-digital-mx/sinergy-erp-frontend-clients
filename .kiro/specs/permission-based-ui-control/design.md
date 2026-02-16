# Design Document: Permission-Based Dynamic UI Control

## Overview

The Permission-Based Dynamic UI Control system provides a declarative, efficient mechanism for controlling UI element visibility based on user permissions in Angular applications. The system consists of three main components:

1. **AuthService Enhancement**: Manages permission state with O(1) lookups using Set<string>
2. **appCan Directive**: Structural directive for conditional element rendering
3. **hasPermission Pipe**: Template pipe for permission validation

The system integrates with JWT tokens from the backend, extracting permissions from the "permissions" claim and maintaining them in a reactive BehaviorSubject. All permission checks are case-insensitive for entity names while preserving PascalCase for actions.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Angular Application                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              AuthService (Enhanced)                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • permissions$: BehaviorSubject<Set<string>>         │   │
│  │ • setPermissions(permissions: string[]): void        │   │
│  │ • hasPermission(permission: string): boolean         │   │
│  │ • can(action: string, entity: string): boolean       │   │
│  │ • canRead/Create/Update/Delete(entity: string)       │   │
│  │ • decodeJWT(token: string): void                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ▲                                   │
│                           │ (emits updates)                   │
│                           │                                   │
│  ┌────────────────────────┴──────────────────────────────┐   │
│  │                                                        │   │
│  │  ┌──────────────────────┐  ┌──────────────────────┐  │   │
│  │  │   appCan Directive   │  │  hasPermission Pipe  │  │   │
│  │  ├──────────────────────┤  ├──────────────────────┤  │   │
│  │  │ • Subscribes to      │  │ • Checks permission  │  │   │
│  │  │   permissions$       │  │ • Returns boolean    │  │   │
│  │  │ • Controls DOM       │  │ • Pure: false        │  │   │
│  │  │   visibility         │  │                      │  │   │
│  │  │ • Supports 3 syntaxes│  │                      │  │   │
│  │  └──────────────────────┘  └──────────────────────┘  │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Component Templates (Usage)                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ • *appCan="{ action: 'Create', entity: 'customers'}"│   │
│  │ • *appCan="'customers:Create'"                       │   │
│  │ • *appCan="['customers:Create', 'customers:Update']"│   │
│  │ • *ngIf="'customers:Create' | hasPermission"        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### AuthService Enhancement

```typescript
// Core interfaces
interface PermissionCheckConfig {
  action: string;      // PascalCase: Create, Read, Update, Delete, Download, Export, Edit
  entity: string;      // lowercase entity name
}

// AuthService methods
class AuthService {
  // Observable for reactive updates
  permissions$: BehaviorSubject<Set<string>>;

  // Set permissions from array (called after JWT decode)
  setPermissions(permissions: string[]): void;

  // Check single permission string
  hasPermission(permission: string): boolean;

  // Check permission with action/entity format
  can(action: string, entity: string): boolean;

  // Convenience methods for common actions
  canRead(entity: string): boolean;
  canCreate(entity: string): boolean;
  canUpdate(entity: string): boolean;
  canDelete(entity: string): boolean;

  // Decode JWT and extract permissions claim
  private decodeJWT(token: string): any;
}
```

### appCan Directive

```typescript
// Directive input types
type CanInput = 
  | PermissionCheckConfig                    // { action: 'Create', entity: 'customers' }
  | string                                   // 'customers:Create'
  | string[];                                // ['customers:Create', 'customers:Update']

// Directive implementation
@Directive({
  selector: '[appCan]'
})
class CanDirective implements OnInit, OnDestroy {
  @Input() set appCan(value: CanInput);
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  );
  
  ngOnInit(): void;
  ngOnDestroy(): void;
  
  private updateView(): void;
  private normalizePermissions(input: CanInput): string[];
}
```

### hasPermission Pipe

```typescript
@Pipe({
  name: 'hasPermission',
  pure: false  // Impure to react to permission changes
})
class HasPermissionPipe implements PipeTransform {
  constructor(private authService: AuthService);
  
  transform(permission: string): boolean;
}
```

## Data Models

### Permission Format

```typescript
// Permission string format: "entity:Action"
// Examples:
// - "customers:Create"
// - "customers:Read"
// - "leads:Update"
// - "users:Delete"
// - "reports:Download"
// - "documents:Export"

// Internal storage: Set<string>
// Normalized format: lowercase entity + ":" + PascalCase action
// Example: Set { "customers:Create", "customers:Read", "leads:Update" }
```

### JWT Token Structure

```typescript
// JWT payload structure (decoded)
interface JWTPayload {
  permissions: string[];  // Array of "entity:Action" strings
  // ... other claims
}

// Example JWT permissions claim:
{
  "permissions": [
    "customers:Create",
    "customers:Read",
    "customers:Update",
    "leads:Update",
    "users:Delete"
  ]
}
```

### Permission Normalization

```typescript
// Normalization rules:
// 1. Entity: Convert to lowercase
// 2. Action: Preserve PascalCase
// 3. Separator: Use colon ":"

// Examples:
// Input: "Customers:Create" → Normalized: "customers:Create"
// Input: "CUSTOMERS:CREATE" → Normalized: "customers:Create"
// Input: "customers:Create" → Normalized: "customers:Create"
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Permission Set Emission

*For any* array of permission strings, calling setPermissions() should emit the new Set through the permissions$ observable, and subsequent subscriptions should receive the current state.

**Validates: Requirements 1.2, 1.8**

### Property 2: Permission Existence Check

*For any* permission string that has been set, hasPermission() should return true; for any permission string that has not been set, hasPermission() should return false.

**Validates: Requirements 1.3**

### Property 3: Case-Insensitive Entity Matching

*For any* permission "entity:Action" that has been set, hasPermission() should return true when called with "Entity:Action", "ENTITY:Action", or any other case variation of the entity name.

**Validates: Requirements 1.4, 5.2, 5.4**

### Property 4: Action/Entity Delegation

*For any* action and entity pair, calling can(action, entity) should return the same result as hasPermission("entity:Action") after normalizing the entity to lowercase.

**Validates: Requirements 1.5**

### Property 5: Convenience Method Delegation

*For any* entity, calling canRead(entity), canCreate(entity), canUpdate(entity), or canDelete(entity) should return the same result as calling can() with the corresponding action.

**Validates: Requirements 1.6**

### Property 6: JWT Decoding and Permission Extraction

*For any* valid JWT token containing a "permissions" claim with an array of permission strings, decoding the token should extract the permissions and call setPermissions() with the exact array.

**Validates: Requirements 1.7, 4.1, 4.2, 4.3**

### Property 7: Directive Renders with Object Syntax

*For any* component using *appCan="{ action: 'Create', entity: 'customers' }", the element should be present in the DOM if and only if the user has the "customers:Create" permission.

**Validates: Requirements 2.1, 6.1**

### Property 8: Directive Renders with String Syntax

*For any* component using *appCan="'customers:Create'", the element should be present in the DOM if and only if the user has the "customers:Create" permission.

**Validates: Requirements 2.2, 6.3**

### Property 9: Directive Renders with Array Syntax (OR Logic)

*For any* component using *appCan="['customers:Create', 'customers:Update']", the element should be present in the DOM if and only if the user has at least one of the listed permissions.

**Validates: Requirements 2.3, 6.2**

### Property 10: Directive Reactive Updates

*For any* component using the appCan directive, when permissions change, the element visibility should update immediately without requiring manual refresh or component re-initialization.

**Validates: Requirements 2.4, 6.5**

### Property 11: Directive Cleanup on Destroy

*For any* component using the appCan directive, when the directive is destroyed, the subscription to permissions$ should be cleaned up and no further updates should be received.

**Validates: Requirements 2.5**

### Property 12: Directive Case-Insensitive Matching

*For any* component using the appCan directive with "customers:Create" permission set, the directive should render the element when used with "Customers:Create", "CUSTOMERS:Create", or any other case variation of the entity name.

**Validates: Requirements 2.6, 5.4**

### Property 13: Directive DOM Removal

*For any* component using the appCan directive, when the user lacks the required permission, the element should be completely removed from the DOM (not just hidden with CSS display:none).

**Validates: Requirements 2.7**

### Property 14: Pipe Permission Check

*For any* permission string, calling the hasPermission pipe's transform() method should return true if the user has that permission, false otherwise.

**Validates: Requirements 3.1**

### Property 15: Pipe Case-Insensitive Matching

*For any* permission "entity:Action" that has been set, the hasPermission pipe should return true when called with "Entity:Action", "ENTITY:Action", or any other case variation of the entity name.

**Validates: Requirements 3.2, 5.4**

### Property 16: Pipe Reactive Updates

*For any* template using the hasPermission pipe, when permissions change, the pipe should return different values without requiring manual refresh.

**Validates: Requirements 3.3**

### Property 17: Permission Normalization

*For any* permission string provided to setPermissions(), the system should normalize it to lowercase entity + ":" + PascalCase action format before storage.

**Validates: Requirements 5.2, 5.3, 5.5**

### Property 18: Invalid Token Handling

*For any* invalid JWT token or token missing the "permissions" claim, the AuthService should handle the error gracefully and maintain an empty permission Set without throwing exceptions.

**Validates: Requirements 4.4**

## Error Handling

The system handles the following error scenarios:

1. **Invalid JWT Token**: If a JWT token cannot be decoded, the system logs the error and maintains an empty permission Set
2. **Missing Permissions Claim**: If the JWT token lacks a "permissions" claim, the system treats it as an empty permission array
3. **Malformed Permission Strings**: Permission strings that don't follow "entity:Action" format are stored as-is but may not match expected patterns
4. **Null/Undefined Inputs**: The system validates inputs and treats null/undefined as empty permission arrays

## Testing Strategy

### Unit Testing

Unit tests validate specific examples and edge cases:

- Permission storage and retrieval with various permission arrays
- Case-insensitive entity matching with different case combinations
- JWT token decoding with valid and invalid tokens
- Directive rendering with all three syntax variations
- Pipe transform with various permission strings
- Error handling for invalid tokens and missing claims

### Property-Based Testing

Property-based tests validate universal properties across all inputs:

- **Property 1**: Permission Set Emission - Generate random permission arrays and verify emissions
- **Property 2**: Permission Existence Check - Generate random permissions and verify lookups
- **Property 3**: Case-Insensitive Entity Matching - Generate case variations and verify matching
- **Property 4**: Action/Entity Delegation - Generate random actions and entities and verify delegation
- **Property 5**: Convenience Method Delegation - Generate random entities and verify method delegation
- **Property 6**: JWT Decoding - Generate valid JWT tokens with random permissions and verify extraction
- **Property 7**: Directive Object Syntax - Generate random permissions and verify directive rendering
- **Property 8**: Directive String Syntax - Generate random permissions and verify directive rendering
- **Property 9**: Directive Array Syntax - Generate random permission arrays and verify OR logic
- **Property 10**: Directive Reactive Updates - Generate permission changes and verify immediate updates
- **Property 11**: Directive Cleanup - Verify subscriptions are cleaned up on destroy
- **Property 12**: Directive Case-Insensitive - Generate case variations and verify matching
- **Property 13**: Directive DOM Removal - Verify elements are removed from DOM, not just hidden
- **Property 14**: Pipe Permission Check - Generate random permissions and verify pipe output
- **Property 15**: Pipe Case-Insensitive - Generate case variations and verify pipe matching
- **Property 16**: Pipe Reactive Updates - Generate permission changes and verify pipe updates
- **Property 17**: Permission Normalization - Generate various permission formats and verify normalization
- **Property 18**: Invalid Token Handling - Generate invalid tokens and verify graceful handling

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with: **Feature: permission-based-ui-control, Property {number}: {property_text}**
- Tests use fast-check or similar library for TypeScript/Angular

