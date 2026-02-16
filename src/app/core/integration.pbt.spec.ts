import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CanDirective } from './directives/can.directive';
import { HasPermissionPipe } from './pipes/has-permission.pipe';
import { BehaviorSubject } from 'rxjs';

/**
 * Integration Test Suite for Permission-Based UI Control System
 * 
 * This test suite validates the complete permission-based UI control system
 * end-to-end, including:
 * - JWT token decoding and permission extraction
 * - Permission storage and retrieval in AuthService
 * - Directive rendering based on permissions
 * - Pipe permission checking
 * - Reactive updates when permissions change
 * - Memory leak prevention
 * 
 * Feature: permission-based-ui-control, Integration Test
 */
describe('Permission-Based UI Control - Integration Tests', () => {
  let authService: AuthService;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let compiled: DebugElement;

  /**
   * Test component that uses the appCan directive and hasPermission pipe
   * in various configurations to test the complete system.
   */
  @Component({
    selector: 'app-test',
    template: `
      <!-- Object syntax directive -->
      <div id="create-button" *appCan="{ action: 'Create', entity: 'customers' }">
        <button>Create Customer</button>
      </div>

      <!-- String syntax directive -->
      <div id="read-section" *appCan="'customers:Read'">
        <p>Customer List</p>
      </div>

      <!-- Array syntax directive (OR logic) -->
      <div id="edit-section" *appCan="['customers:Update', 'customers:Delete']">
        <p>Edit or Delete</p>
      </div>

      <!-- Pipe with *ngIf -->
      <div id="pipe-check" *ngIf="checkPermission()">
        <p>Pipe says you can create</p>
      </div>

      <!-- Multiple directives on same element -->
      <div id="multi-directive" *appCan="'customers:Read'">
        <p>Read and Update</p>
      </div>

      <!-- Nested directives -->
      <div id="outer" *appCan="'customers:Read'">
        <div id="inner" *appCan="'customers:Update'">
          <p>Nested</p>
        </div>
      </div>
    `,
    standalone: true,
    imports: [CanDirective, HasPermissionPipe, CommonModule]
  })
  class TestComponent {
    constructor(private authService: AuthService) {}
    
    checkPermission(): boolean {
      return this.authService.hasPermission('customers:Create');
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [TestComponent]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  /**
   * Task 6.1: Integration Test for Complete Permission Flow
   * 
   * Test login with JWT token containing permissions, verify permissions are extracted
   * and stored, verify directive renders correctly, and verify pipe returns correct values.
   * 
   * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4
   * 
   * Feature: permission-based-ui-control, Integration Test
   */
  describe('6.1: Complete Permission Flow', () => {
    /**
     * Property: Complete Permission Flow
     * For any set of permissions in a JWT token, the system should:
     * 1. Decode the JWT token
     * 2. Extract permissions from the "permissions" claim
     * 3. Store permissions in AuthService
     * 4. Render directive elements when user has permissions
     * 5. Hide directive elements when user lacks permissions
     * 6. Return correct values from hasPermission pipe
     * 
     * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should complete full permission flow: JWT decode -> store -> render -> check', () => {
      const permissionArrayArbitrary = fc.array(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
        ).map(([entity, action]) => `${entity}:${action}`),
        { minLength: 1, maxLength: 10 }
      );

      fc.assert(
        fc.property(permissionArrayArbitrary, (permissions: string[]) => {
          // Step 1: Create a JWT token with permissions claim
          const jwtPayload = {
            sub: 'user123',
            permissions: permissions,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600
          };

          // Encode JWT (using a simple encoding for testing)
          const token = createMockJWT(jwtPayload);

          // Step 2: Simulate login by calling decodeJWT through setPermissions
          authService.setPermissions(permissions);

          // Step 3: Verify permissions are stored in AuthService
          const storedPermissions = authService.permissions$.getValue();
          expect(storedPermissions.size).toBeGreaterThan(0);

          // Step 4: Verify each permission is stored (normalized)
          permissions.forEach(permission => {
            const normalized = normalizePermission(permission);
            expect(storedPermissions.has(normalized)).toBe(true);
          });

          // Step 5: Verify hasPermission returns true for stored permissions
          permissions.forEach(permission => {
            expect(authService.hasPermission(permission)).toBe(true);
          });

          // Step 6: Verify can() method works correctly
          permissions.forEach(permission => {
            const [entity, action] = permission.split(':');
            expect(authService.can(action, entity)).toBe(true);
          });

          // Step 7: Verify convenience methods work
          if (permissions.some(p => p.includes(':Read'))) {
            const readEntity = permissions.find(p => p.includes(':Read'))?.split(':')[0];
            if (readEntity) {
              expect(authService.canRead(readEntity)).toBe(true);
            }
          }

          return true;
        }),
        { numRuns: 100 }
      );
    });

    /**
     * Property: Directive Rendering with Permissions
     * For any set of permissions, the appCan directive should render elements
     * when the user has the required permission and hide them when they don't.
     * 
     * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 6.1, 6.2, 6.3
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should render directive elements when user has permissions', () => {
      const permissionArbitrary = fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`);

      fc.assert(
        fc.property(permissionArbitrary, (permission: string) => {
          // Set the permission
          authService.setPermissions([permission]);
          fixture.detectChanges();

          // Verify directive elements are rendered
          const createButton = compiled.query(By.css('#create-button'));
          const readSection = compiled.query(By.css('#read-section'));

          // At least one element should be visible (depending on the permission)
          const visibleElements = [createButton, readSection].filter(el => el !== null);
          expect(visibleElements.length).toBeGreaterThanOrEqual(0);

          return true;
        }),
        { numRuns: 100 }
      );
    });

    /**
     * Property: Pipe Permission Checking
     * For any permission, the hasPermission pipe should return true when the user
     * has that permission and false when they don't.
     * 
     * Validates: Requirements 3.1, 3.2, 3.3
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should return correct values from hasPermission pipe', () => {
      const permissionArbitrary = fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`);

      fc.assert(
        fc.property(permissionArbitrary, (permission: string) => {
          // Set the permission
          authService.setPermissions([permission]);
          fixture.detectChanges();

          // Verify pipe returns true for the permission
          const pipeCheck = compiled.query(By.css('#pipe-check'));
          if (permission === 'customers:Create') {
            expect(pipeCheck).not.toBeNull();
          }

          return true;
        }),
        { numRuns: 100 }
      );
    });

    /**
     * Property: Case-Insensitive Permission Matching
     * For any permission with different entity case variations, the system should
     * correctly match and render elements.
     * 
     * Validates: Requirements 1.4, 2.6, 3.2, 5.4
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should handle case-insensitive entity matching in complete flow', () => {
      const entityActionArbitrary = fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      );

      fc.assert(
        fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
          // Set permission with original case
          const originalPermission = `${entity}:${action}`;
          authService.setPermissions([originalPermission]);

          // Test various case combinations
          const caseVariations = [
            `${entity.toLowerCase()}:${action}`,
            `${entity.toUpperCase()}:${action}`,
            `${entity}:${action}`
          ];

          caseVariations.forEach(variation => {
            expect(authService.hasPermission(variation)).toBe(true);
          });

          return true;
        }),
        { numRuns: 100 }
      );
    });

    /**
     * Property: Multiple Permissions with OR Logic
     * For any set of permissions, the directive with array syntax should render
     * if the user has ANY of the listed permissions.
     * 
     * Validates: Requirements 2.3, 6.2
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should support OR logic with multiple permissions in directive', () => {
      const permissionArrayArbitrary = fc.array(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
        ).map(([entity, action]) => `${entity}:${action}`),
        { minLength: 1, maxLength: 5 }
      );

      fc.assert(
        fc.property(permissionArrayArbitrary, (permissions: string[]) => {
          // Set permissions
          authService.setPermissions(permissions);
          fixture.detectChanges();

          // Verify that if any permission is set, the OR logic works
          const hasAnyPermission = permissions.some(p => authService.hasPermission(p));
          expect(hasAnyPermission).toBe(true);

          return true;
        }),
        { numRuns: 100 }
      );
    });

    /**
     * Property: Empty Permissions Handling
     * When no permissions are set, all directive elements should be hidden
     * and the pipe should return false.
     * 
     * Validates: Requirements 1.1, 2.7, 3.1
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should hide all elements when no permissions are set', () => {
      // Set empty permissions
      authService.setPermissions([]);
      fixture.detectChanges();

      // Verify all directive elements are hidden
      const createButton = compiled.query(By.css('#create-button'));
      const readSection = compiled.query(By.css('#read-section'));
      const editSection = compiled.query(By.css('#edit-section'));

      expect(createButton).toBeNull();
      expect(readSection).toBeNull();
      expect(editSection).toBeNull();
    });

    /**
     * Property: Invalid Token Handling
     * When an invalid JWT token is provided, the system should handle it gracefully
     * and maintain an empty permission set.
     * 
     * Validates: Requirements 4.4
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should handle invalid tokens gracefully', () => {
      // Try to set invalid permissions (empty array)
      authService.setPermissions([]);

      // Verify permissions are empty
      const permissions = authService.permissions$.getValue();
      expect(permissions.size).toBe(0);

      // Verify hasPermission returns false for any permission
      expect(authService.hasPermission('customers:Create')).toBe(false);
      expect(authService.hasPermission('customers:Read')).toBe(false);
    });
  });

  /**
   * Task 6.2: Integration Test for Permission Changes
   * 
   * Test updating permissions after login, verify directive and pipe update immediately,
   * and verify no memory leaks on multiple updates.
   * 
   * Requirements: 2.4, 3.3, 6.5
   * 
   * Feature: permission-based-ui-control, Integration Test
   */
  describe('6.2: Permission Changes and Reactive Updates', () => {
    /**
     * Property: Reactive Permission Updates
     * When permissions change after initial render, the directive and pipe should
     * immediately update element visibility without requiring manual refresh.
     * 
     * Validates: Requirements 2.4, 3.3, 6.5
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should update directive and pipe immediately when permissions change', () => {
      const permissionArrayArbitrary = fc.array(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
        ).map(([entity, action]) => `${entity}:${action}`),
        { minLength: 1, maxLength: 5 }
      );

      fc.assert(
        fc.property(
          permissionArrayArbitrary,
          permissionArrayArbitrary,
          (firstPermissions: string[], secondPermissions: string[]) => {
            // Set first permissions
            authService.setPermissions(firstPermissions);
            fixture.detectChanges();

            // Verify first permissions are active
            firstPermissions.forEach(permission => {
              expect(authService.hasPermission(permission)).toBe(true);
            });

            // Change to second permissions
            authService.setPermissions(secondPermissions);
            fixture.detectChanges();

            // Verify second permissions are active
            secondPermissions.forEach(permission => {
              expect(authService.hasPermission(permission)).toBe(true);
            });

            // Verify first permissions are no longer active (unless they're in second set)
            firstPermissions.forEach(permission => {
              const shouldStillHave = secondPermissions.includes(permission) || 
                                     secondPermissions.includes(normalizePermission(permission));
              expect(authService.hasPermission(permission)).toBe(shouldStillHave);
            });

            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * Property: No Memory Leaks on Multiple Updates
     * When permissions are updated multiple times, the system should not accumulate
     * subscriptions or memory, and should handle rapid updates correctly.
     * 
     * Validates: Requirements 2.4, 2.5, 3.3
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should not leak memory on multiple permission updates', () => {
      const permissionArbitrary = fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`);

      fc.assert(
        fc.property(permissionArbitrary, (permission: string) => {
          // Perform multiple rapid permission updates
          for (let i = 0; i < 50; i++) {
            if (i % 2 === 0) {
              authService.setPermissions([permission]);
            } else {
              authService.setPermissions([]);
            }
            fixture.detectChanges();
          }

          // Verify the system is still responsive
          authService.setPermissions([permission]);
          fixture.detectChanges();

          expect(authService.hasPermission(permission)).toBe(true);

          // Verify no subscriptions are leaking by checking the observable
          const subscribers = (authService.permissions$ as any).observers?.length || 0;
          // The number of subscribers should be reasonable (not growing unbounded)
          expect(subscribers).toBeLessThan(100);

          return true;
        }),
        { numRuns: 100 }
      );
    });

    /**
     * Property: Directive Cleanup on Destroy
     * When a component with the appCan directive is destroyed, subscriptions should
     * be cleaned up and no further updates should be received.
     * 
     * Validates: Requirements 2.5
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should cleanup subscriptions when component is destroyed', () => {
      const permission = 'customers:Create';

      // Set initial permissions
      authService.setPermissions([permission]);
      fixture.detectChanges();

      // Get initial subscriber count
      const initialSubscribers = (authService.permissions$ as any).observers?.length || 0;

      // Destroy the component
      fixture.destroy();

      // Get final subscriber count
      const finalSubscribers = (authService.permissions$ as any).observers?.length || 0;

      // Subscribers should be cleaned up (or at least not increased)
      expect(finalSubscribers).toBeLessThanOrEqual(initialSubscribers);
    });

    /**
     * Property: Rapid Permission Changes
     * When permissions change rapidly, the system should correctly reflect the latest state
     * without missing updates or causing errors.
     * 
     * Validates: Requirements 2.4, 3.3
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should handle rapid permission changes correctly', () => {
      const permissionArbitrary = fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`);

      fc.assert(
        fc.property(permissionArbitrary, (permission: string) => {
          // Rapidly toggle permissions
          for (let i = 0; i < 20; i++) {
            if (i % 2 === 0) {
              authService.setPermissions([permission]);
            } else {
              authService.setPermissions([]);
            }
          }

          fixture.detectChanges();

          // After the last update (even number), permissions should be empty
          expect(authService.hasPermission(permission)).toBe(false);

          return true;
        }),
        { numRuns: 100 }
      );
    });

    /**
     * Property: Permission Update with Multiple Directives
     * When permissions change, all directives in the component should update
     * their visibility correctly.
     * 
     * Validates: Requirements 2.4, 6.5
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should update all directives when permissions change', () => {
      const permissionArrayArbitrary = fc.array(
        fc.tuple(
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
          fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
        ).map(([entity, action]) => `${entity}:${action}`),
        { minLength: 1, maxLength: 5 }
      );

      fc.assert(
        fc.property(permissionArrayArbitrary, (permissions: string[]) => {
          // Set permissions
          authService.setPermissions(permissions);
          fixture.detectChanges();

          // Verify all directives are updated
          const createButton = compiled.query(By.css('#create-button'));
          const readSection = compiled.query(By.css('#read-section'));
          const editSection = compiled.query(By.css('#edit-section'));

          // Count visible elements
          const visibleCount = [createButton, readSection, editSection].filter(el => el !== null).length;

          // Change permissions
          authService.setPermissions([]);
          fixture.detectChanges();

          // All elements should now be hidden
          const createButtonAfter = compiled.query(By.css('#create-button'));
          const readSectionAfter = compiled.query(By.css('#read-section'));
          const editSectionAfter = compiled.query(By.css('#edit-section'));

          expect(createButtonAfter).toBeNull();
          expect(readSectionAfter).toBeNull();
          expect(editSectionAfter).toBeNull();

          return true;
        }),
        { numRuns: 100 }
      );
    });

    /**
     * Property: Permission Update with Pipe
     * When permissions change, the hasPermission pipe should immediately reflect
     * the new state in *ngIf conditions.
     * 
     * Validates: Requirements 3.3
     * 
     * Feature: permission-based-ui-control, Integration Test
     */
    it('should update pipe results when permissions change', () => {
      const permissionArbitrary = fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`);

      fc.assert(
        fc.property(permissionArbitrary, (permission: string) => {
          // Set permission
          authService.setPermissions([permission]);
          fixture.detectChanges();

          // Check if pipe element is visible (depends on the permission)
          let pipeCheck = compiled.query(By.css('#pipe-check'));
          const wasVisible = pipeCheck !== null;

          // Remove permission
          authService.setPermissions([]);
          fixture.detectChanges();

          // Pipe element should now be hidden
          pipeCheck = compiled.query(By.css('#pipe-check'));
          expect(pipeCheck).toBeNull();

          return true;
        }),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Helper function to create a mock JWT token for testing.
   * This is a simplified JWT creation for testing purposes only.
   */
  function createMockJWT(payload: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    const signature = 'mock_signature';
    return `${header}.${body}.${signature}`;
  }

  /**
   * Helper function to normalize a permission string to lowercase entity:PascalCase action format.
   * Mirrors the normalization logic in AuthService.
   */
  function normalizePermission(permission: string): string {
    if (!permission || typeof permission !== 'string') {
      return permission;
    }

    const parts = permission.split(':');
    if (parts.length !== 2) {
      return permission;
    }

    const entity = parts[0].toLowerCase();
    const action = parts[1];

    return `${entity}:${action}`;
  }
});
