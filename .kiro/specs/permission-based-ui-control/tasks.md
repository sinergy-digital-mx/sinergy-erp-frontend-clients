# Implementation Plan: Permission-Based Dynamic UI Control

## Overview

This implementation plan breaks down the Permission-Based Dynamic UI Control system into discrete coding tasks. The system will be built incrementally, starting with the AuthService enhancement, followed by the appCan directive, hasPermission pipe, and finally integration tests. Each task builds on previous work, with property-based tests validating correctness properties at each step.

## Tasks

- [x] 1. Enhance AuthService with permission management
  - [x] 1.1 Create permission storage with BehaviorSubject<Set<string>>
    - Add permissions$ BehaviorSubject to AuthService
    - Initialize with empty Set
    - _Requirements: 1.1, 1.2, 1.8_
  
  - [x] 1.2 Implement setPermissions() method
    - Accept string array of permissions
    - Normalize permissions to lowercase entity:PascalCase action
    - Update permissions$ observable
    - _Requirements: 1.2, 5.5_
  
  - [x] 1.3 Write property test for setPermissions and permissions$ emission
    - **Property 1: Permission Set Emission**
    - **Validates: Requirements 1.2, 1.8**
  
  - [x] 1.4 Implement hasPermission() method
    - Accept permission string
    - Perform case-insensitive entity matching
    - Return boolean
    - _Requirements: 1.3, 1.4_
  
  - [x] 1.5 Write property test for hasPermission with case-insensitive matching
    - **Property 2: Permission Existence Check**
    - **Property 3: Case-Insensitive Entity Matching**
    - **Validates: Requirements 1.3, 1.4, 5.2, 5.4_
  
  - [x] 1.6 Implement can(action, entity) method
    - Construct "entity:Action" format
    - Delegate to hasPermission()
    - _Requirements: 1.5_
  
  - [x] 1.7 Implement convenience methods: canRead, canCreate, canUpdate, canDelete
    - Each delegates to can() with appropriate action
    - _Requirements: 1.6_
  
  - [x] 1.8 Write property test for can() and convenience methods
    - **Property 4: Action/Entity Delegation**
    - **Property 5: Convenience Method Delegation**
    - **Validates: Requirements 1.5, 1.6_

- [x] 2. Implement JWT token decoding and permission extraction
  - [x] 2.1 Add decodeJWT() private method to AuthService
    - Decode JWT without signature validation
    - Extract "permissions" claim
    - Handle invalid tokens gracefully
    - _Requirements: 4.1, 4.2, 4.4_
  
  - [x] 2.2 Integrate JWT decoding into login flow
    - Call decodeJWT() after successful login
    - Extract permissions from token
    - Call setPermissions() with extracted array
    - _Requirements: 1.7, 4.3_
  
  - [x] 2.3 Write property test for JWT decoding and permission extraction
    - **Property 6: JWT Decoding and Permission Extraction**
    - **Validates: Requirements 1.7, 4.1, 4.2, 4.3_
  
  - [x] 2.4 Write unit test for invalid token handling
    - Test with malformed JWT tokens
    - Test with missing permissions claim
    - Verify graceful error handling
    - **Property 18: Invalid Token Handling**
    - **Validates: Requirements 4.4_

- [x] 3. Create appCan directive
  - [x] 3.1 Generate appCan directive scaffold
    - Create src/core/directives/can.directive.ts
    - Define CanInput type supporting three syntaxes
    - Inject TemplateRef, ViewContainerRef, AuthService
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 3.2 Implement directive input parsing
    - Parse object syntax: { action: 'Create', entity: 'customers' }
    - Parse string syntax: 'customers:Create'
    - Parse array syntax: ['customers:Create', 'customers:Update']
    - Normalize all to string array format
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 3.3 Implement directive permission checking logic
    - Subscribe to permissions$ observable
    - Check if user has required permission(s)
    - Support OR logic for array syntax
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 3.4 Implement directive DOM manipulation
    - Render element when permission exists
    - Remove element from DOM when permission missing (not just hide)
    - Update view reactively on permission changes
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.7_
  
  - [x] 3.5 Implement directive cleanup on destroy
    - Unsubscribe from permissions$ on ngOnDestroy
    - Use takeUntil pattern with destroy$ subject
    - _Requirements: 2.5_
  
  - [x] 3.6 Write property test for directive with object syntax
    - **Property 7: Directive Renders with Object Syntax**
    - **Validates: Requirements 2.1, 6.1_
  
  - [x] 3.7 Write property test for directive with string syntax
    - **Property 8: Directive Renders with String Syntax**
    - **Validates: Requirements 2.2, 6.3_
  
  - [x] 3.8 Write property test for directive with array syntax (OR logic)
    - **Property 9: Directive Renders with Array Syntax (OR Logic)**
    - **Validates: Requirements 2.3, 6.2_
  
  - [x] 3.9 Write property test for directive reactive updates
    - **Property 10: Directive Reactive Updates**
    - **Validates: Requirements 2.4, 6.5_
  
  - [x] 3.10 Write property test for directive cleanup
    - **Property 11: Directive Cleanup on Destroy**
    - **Validates: Requirements 2.5_
  
  - [x] 3.11 Write property test for directive case-insensitive matching
    - **Property 12: Directive Case-Insensitive Matching**
    - **Validates: Requirements 2.6, 5.4_
  
  - [x] 3.12 Write property test for directive DOM removal
    - **Property 13: Directive DOM Removal**
    - **Validates: Requirements 2.7_

- [x] 4. Create hasPermission pipe
  - [x] 4.1 Generate hasPermission pipe scaffold
    - Create src/core/pipes/has-permission.pipe.ts
    - Set pure: false for reactive updates
    - Inject AuthService
    - _Requirements: 3.1, 3.3_
  
  - [x] 4.2 Implement pipe transform method
    - Accept permission string
    - Call authService.hasPermission()
    - Return boolean
    - _Requirements: 3.1_
  
  - [x] 4.3 Write property test for pipe permission check
    - **Property 14: Pipe Permission Check**
    - **Validates: Requirements 3.1_
  
  - [x] 4.4 Write property test for pipe case-insensitive matching
    - **Property 15: Pipe Case-Insensitive Matching**
    - **Validates: Requirements 3.2, 5.4_
  
  - [x] 4.5 Write property test for pipe reactive updates
    - **Property 16: Pipe Reactive Updates**
    - **Validates: Requirements 3.3_

- [x] 5. Checkpoint - Ensure all core tests pass
  - Ensure all property tests and unit tests pass
  - Verify no console errors or warnings
  - Ask the user if questions arise

- [x] 6. Create integration tests
  - [x] 6.1 Write integration test for complete permission flow
    - Test login with JWT token containing permissions
    - Verify permissions are extracted and stored
    - Verify directive renders correctly
    - Verify pipe returns correct values
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4_
  
  - [x] 6.2 Write integration test for permission changes
    - Test updating permissions after login
    - Verify directive and pipe update immediately
    - Verify no memory leaks on multiple updates
    - _Requirements: 2.4, 3.3, 6.5_

- [x] 7. Create example usage components
  - [x] 7.1 Create example component with directive usage
    - Demonstrate all three directive syntaxes
    - Show button visibility control
    - Show menu section control
    - _Requirements: 6.1, 6.2_
  
  - [x] 7.2 Create example component with pipe usage
    - Demonstrate pipe in *ngIf conditions
    - Show conditional rendering
    - _Requirements: 6.3, 6.4_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all property tests, unit tests, and integration tests pass
  - Verify example components work correctly
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation
- All code should follow Angular best practices and style guidelines
- Use TypeScript strict mode for type safety

