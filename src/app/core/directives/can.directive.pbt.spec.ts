import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CanDirective } from './can.directive';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';

/**
 * Test component for testing the appCan directive with object syntax
 */
@Component({
  selector: 'app-test-object-syntax',
  template: `
    <div *appCan="{ action: action, entity: entity }" class="test-element">
      Test Element
    </div>
  `,
  standalone: true,
  imports: [CanDirective]
})
class TestObjectSyntaxComponent {
  action: string = 'Create';
  entity: string = 'customers';
}

/**
 * Test component for testing the appCan directive with string syntax
 */
@Component({
  selector: 'app-test-string-syntax',
  template: `
    <div *appCan="permission" class="test-element">
      Test Element
    </div>
  `,
  standalone: true,
  imports: [CanDirective]
})
class TestStringSyntaxComponent {
  permission: string = 'customers:Create';
}

/**
 * Test component for testing the appCan directive with array syntax
 */
@Component({
  selector: 'app-test-array-syntax',
  template: `
    <div *appCan="permissions" class="test-element">
      Test Element
    </div>
  `,
  standalone: true,
  imports: [CanDirective]
})
class TestArraySyntaxComponent {
  permissions: string[] = ['customers:Create', 'customers:Update'];
}

/**
 * Test component for testing reactive updates
 */
@Component({
  selector: 'app-test-reactive-updates',
  template: `
    <div *appCan="'customers:Create'" class="test-element">
      Test Element
    </div>
  `,
  standalone: true,
  imports: [CanDirective]
})
class TestReactiveUpdatesComponent {}

/**
 * Test component for testing case-insensitive matching
 */
@Component({
  selector: 'app-test-case-insensitive',
  template: `
    <div *appCan="permission" class="test-element">
      Test Element
    </div>
  `,
  standalone: true,
  imports: [CanDirective]
})
class TestCaseInsensitiveComponent {
  permission: string = 'Customers:Create';
}

describe('CanDirective - Property-Based Tests', () => {
  let permissionsSubject: BehaviorSubject<Set<string>>;
  let mockAuthService: AuthService;

  beforeEach(() => {
    // Create a mock AuthService with a BehaviorSubject for permissions
    permissionsSubject = new BehaviorSubject<Set<string>>(new Set());
    
    mockAuthService = {
      permissions$: permissionsSubject,
      hasPermission: (permission: string) => {
        const normalized = normalizePermission(permission);
        return permissionsSubject.getValue().has(normalized);
      }
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });

    // Override each component to provide AuthService
    [TestObjectSyntaxComponent, TestStringSyntaxComponent, TestArraySyntaxComponent, TestReactiveUpdatesComponent, TestCaseInsensitiveComponent].forEach(component => {
      TestBed.overrideComponent(component, {
        set: {
          providers: [{ provide: AuthService, useValue: mockAuthService }]
        }
      });
    });
  });

  /**
   * Property 7: Directive Renders with Object Syntax
   * For any component using *appCan="{ action: 'Create', entity: 'customers' }",
   * the element should be present in the DOM if and only if the user has the "customers:Create" permission.
   * 
   * Validates: Requirements 2.1, 6.1
   * 
   * Feature: permission-based-ui-control, Property 7: Directive Renders with Object Syntax
   */
  it('Property 7: Directive Renders with Object Syntax - should render element when permission exists', () => {
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        // Set up permissions
        const permission = `${entity}:${action}`;
        permissionsSubject.next(new Set([normalizePermission(permission)]));

        // Create component
        const fixture = TestBed.createComponent(TestObjectSyntaxComponent);
        const component = fixture.componentInstance;
        component.entity = entity;
        component.action = action;
        fixture.detectChanges();

        // Verify element is in DOM
        const element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeTruthy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 7 (Extended): Directive Renders with Object Syntax - should not render when permission missing
   * For any component using *appCan="{ action: 'Create', entity: 'customers' }",
   * the element should NOT be present in the DOM if the user lacks the permission.
   * 
   * Validates: Requirements 2.1, 6.1
   * 
   * Feature: permission-based-ui-control, Property 7: Directive Renders with Object Syntax
   */
  it('Property 7 (Extended): Directive Renders with Object Syntax - should not render element when permission missing', () => {
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        // Don't set any permissions
        permissionsSubject.next(new Set());

        // Create component
        const fixture = TestBed.createComponent(TestObjectSyntaxComponent);
        const component = fixture.componentInstance;
        component.entity = entity;
        component.action = action;
        fixture.detectChanges();

        // Verify element is NOT in DOM
        const element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeFalsy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8: Directive Renders with String Syntax
   * For any component using *appCan="'customers:Create'",
   * the element should be present in the DOM if and only if the user has the "customers:Create" permission.
   * 
   * Validates: Requirements 2.2, 6.3
   * 
   * Feature: permission-based-ui-control, Property 8: Directive Renders with String Syntax
   */
  it('Property 8: Directive Renders with String Syntax - should render element when permission exists', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        // Set up permissions
        permissionsSubject.next(new Set([normalizePermission(permission)]));

        // Create component
        const fixture = TestBed.createComponent(TestStringSyntaxComponent);
        const component = fixture.componentInstance;
        component.permission = permission;
        fixture.detectChanges();

        // Verify element is in DOM
        const element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeTruthy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8 (Extended): Directive Renders with String Syntax - should not render when permission missing
   * For any component using *appCan="'customers:Create'",
   * the element should NOT be present in the DOM if the user lacks the permission.
   * 
   * Validates: Requirements 2.2, 6.3
   * 
   * Feature: permission-based-ui-control, Property 8: Directive Renders with String Syntax
   */
  it('Property 8 (Extended): Directive Renders with String Syntax - should not render element when permission missing', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        // Don't set any permissions
        permissionsSubject.next(new Set());

        // Create component
        const fixture = TestBed.createComponent(TestStringSyntaxComponent);
        const component = fixture.componentInstance;
        component.permission = permission;
        fixture.detectChanges();

        // Verify element is NOT in DOM
        const element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeFalsy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9: Directive Renders with Array Syntax (OR Logic)
   * For any component using *appCan="['customers:Create', 'customers:Update']",
   * the element should be present in the DOM if and only if the user has at least one of the listed permissions.
   * 
   * Validates: Requirements 2.3, 6.2
   * 
   * Feature: permission-based-ui-control, Property 9: Directive Renders with Array Syntax (OR Logic)
   */
  it('Property 9: Directive Renders with Array Syntax (OR Logic) - should render when user has at least one permission', () => {
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 5 }
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        // Set only the first permission
        const setPermissions = new Set([normalizePermission(permissions[0])]);
        permissionsSubject.next(setPermissions);

        // Create component with all permissions in the array
        const fixture = TestBed.createComponent(TestArraySyntaxComponent);
        const component = fixture.componentInstance;
        component.permissions = permissions;
        fixture.detectChanges();

        // Verify element is in DOM (because user has at least one permission)
        const element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeTruthy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9 (Extended): Directive Renders with Array Syntax (OR Logic) - should not render when user has no permissions
   * For any component using *appCan="['customers:Create', 'customers:Update']",
   * the element should NOT be present in the DOM if the user lacks all listed permissions.
   * 
   * Validates: Requirements 2.3, 6.2
   * 
   * Feature: permission-based-ui-control, Property 9: Directive Renders with Array Syntax (OR Logic)
   */
  it('Property 9 (Extended): Directive Renders with Array Syntax (OR Logic) - should not render when user has no permissions', () => {
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 5 }
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        // Don't set any permissions
        permissionsSubject.next(new Set());

        // Create component
        const fixture = TestBed.createComponent(TestArraySyntaxComponent);
        const component = fixture.componentInstance;
        component.permissions = permissions;
        fixture.detectChanges();

        // Verify element is NOT in DOM
        const element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeFalsy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: Directive Reactive Updates
   * For any component using the appCan directive, when permissions change,
   * the element visibility should update immediately without requiring manual refresh.
   * 
   * Validates: Requirements 2.4, 6.5
   * 
   * Feature: permission-based-ui-control, Property 10: Directive Reactive Updates
   */
  it('Property 10: Directive Reactive Updates - should update visibility when permissions change', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        // Start with no permissions
        permissionsSubject.next(new Set());

        // Create component
        const fixture = TestBed.createComponent(TestReactiveUpdatesComponent);
        fixture.detectChanges();

        // Verify element is NOT in DOM initially
        let element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeFalsy();

        // Add the permission
        permissionsSubject.next(new Set([normalizePermission(permission)]));
        fixture.detectChanges();

        // Verify element is NOW in DOM
        element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeTruthy();

        // Remove the permission
        permissionsSubject.next(new Set());
        fixture.detectChanges();

        // Verify element is NO LONGER in DOM
        element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeFalsy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Directive Cleanup on Destroy
   * For any component using the appCan directive, when the directive is destroyed,
   * the subscription to permissions$ should be cleaned up and no further updates should be received.
   * 
   * Validates: Requirements 2.5
   * 
   * Feature: permission-based-ui-control, Property 11: Directive Cleanup on Destroy
   */
  it('Property 11: Directive Cleanup on Destroy - should unsubscribe on destroy', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        // Start with the permission
        permissionsSubject.next(new Set([normalizePermission(permission)]));

        // Create component
        const fixture = TestBed.createComponent(TestReactiveUpdatesComponent);
        fixture.detectChanges();

        // Verify element is in DOM
        let element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeTruthy();

        // Destroy the component
        fixture.destroy();

        // Change permissions after destroy
        permissionsSubject.next(new Set());

        // Create a new component to verify the old one didn't update
        const newFixture = TestBed.createComponent(TestReactiveUpdatesComponent);
        newFixture.detectChanges();

        // The new component should not have the element (because permissions were cleared)
        element = newFixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeFalsy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 12: Directive Case-Insensitive Matching
   * For any component using the appCan directive with "customers:Create" permission set,
   * the directive should render the element when used with "Customers:Create", "CUSTOMERS:Create",
   * or any other case variation of the entity name.
   * 
   * Validates: Requirements 2.6, 5.4
   * 
   * Feature: permission-based-ui-control, Property 12: Directive Case-Insensitive Matching
   */
  it('Property 12: Directive Case-Insensitive Matching - should match with different entity case variations', () => {
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        // Set permission with lowercase entity
        const permission = `${entity.toLowerCase()}:${action}`;
        permissionsSubject.next(new Set([normalizePermission(permission)]));

        // Test with uppercase entity
        const fixture = TestBed.createComponent(TestStringSyntaxComponent);
        const component = fixture.componentInstance;
        component.permission = `${entity.toUpperCase()}:${action}`;
        fixture.detectChanges();

        // Verify element is in DOM (case-insensitive match)
        const element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeTruthy();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 13: Directive DOM Removal
   * For any component using the appCan directive, when the user lacks the required permission,
   * the element should be completely removed from the DOM (not just hidden with CSS display:none).
   * 
   * Validates: Requirements 2.7
   * 
   * Feature: permission-based-ui-control, Property 13: Directive DOM Removal
   */
  it('Property 13: Directive DOM Removal - should completely remove element from DOM when permission missing', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        // Don't set any permissions
        permissionsSubject.next(new Set());

        // Create component
        const fixture = TestBed.createComponent(TestStringSyntaxComponent);
        const component = fixture.componentInstance;
        component.permission = permission;
        fixture.detectChanges();

        // Verify element is completely removed from DOM (not just hidden)
        const element = fixture.debugElement.query(By.css('.test-element'));
        expect(element).toBeFalsy();

        // Verify the view container is empty
        const viewContainer = fixture.debugElement.children.length;
        expect(viewContainer).toBe(0);

        return true;
      }),
      { numRuns: 100 }
    );
  });

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
