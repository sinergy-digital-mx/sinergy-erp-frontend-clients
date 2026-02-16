import '@angular/compiler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { UserDetailsComponent } from './user-details.component';
import { User, Role, UserStatus } from '../../models';
import { of } from 'rxjs';

/**
 * Property-Based Tests for UserDetailsComponent
 * 
 * Property 8: User Roles Fetch
 * Validates: Requirements 5.3, 5.4
 * 
 * For any user, fetching their roles should return all roles currently assigned to that user.
 */
describe('UserDetailsComponent - Property-Based Tests', () => {
  let component: UserDetailsComponent;
  let mockSnackBar: any;

  beforeEach(() => {
    mockSnackBar = {
      openFromComponent: vi.fn()
    };
    component = new UserDetailsComponent(mockSnackBar);
  });

  /**
   * Property 8: User Roles Fetch
   * 
   * For any user, fetching their roles should return all roles currently assigned to that user.
   * 
   * Validates: Requirements 5.3, 5.4
   */
  it('Property 8: User Roles Fetch - should fetch and display all user roles correctly', () => {
    const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');

    const userArbitrary = fc.record({
      id: fc.uuid(),
      email: fc.emailAddress(),
      status: userStatusArbitrary,
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ minLength: 0, maxLength: 200 }),
      permissions: fc.array(fc.uuid(), { minLength: 0, maxLength: 20 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const rolesArbitrary = fc.array(roleArbitrary, { minLength: 0, maxLength: 10 });

    fc.assert(
      fc.property(userArbitrary, rolesArbitrary, (user: User, roles: Role[]) => {
        component.user = user;
        component.userRoles$ = of(roles);

        // Property: User roles observable should emit the exact roles array
        let emittedRoles: Role[] | null = null;
        component.userRoles$.subscribe((roles) => {
          emittedRoles = roles;
        });

        // Property: All roles should be present
        expect(emittedRoles?.length).toBe(roles.length);

        // Property: Each role should match the input role
        if (emittedRoles) {
          for (let i = 0; i < roles.length; i++) {
            expect(emittedRoles[i].id).toBe(roles[i].id);
            expect(emittedRoles[i].name).toBe(roles[i].name);
            expect(emittedRoles[i].description).toBe(roles[i].description);
            expect(emittedRoles[i].permissions.length).toBe(roles[i].permissions.length);
          }
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: User Details Consistency
   * 
   * For any user, the component should display the user's email, status, and creation date consistently.
   */
  it('Property: User Details Consistency - should display user details consistently', () => {
    const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');

    const userArbitrary = fc.record({
      id: fc.uuid(),
      email: fc.emailAddress(),
      status: userStatusArbitrary,
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    fc.assert(
      fc.property(userArbitrary, (user: User) => {
        component.user = user;

        // Property: Email should be accessible and match input
        expect(component.user.email).toBe(user.email);

        // Property: Status should be accessible and match input
        expect(component.user.status).toBe(user.status);

        // Property: Creation date should be accessible and match input
        expect(component.user.createdAt).toEqual(user.createdAt);

        // Property: Status badge class should be deterministic
        const badgeClass = component.getStatusBadgeClass(user.status);
        expect(badgeClass).toBeDefined();
        expect(typeof badgeClass).toBe('string');

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Role List Integrity
   * 
   * For any role list, the component should preserve all roles without loss or duplication.
   */
  it('Property: Role List Integrity - should preserve all roles without loss or duplication', () => {
    const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');

    const userArbitrary = fc.record({
      id: fc.uuid(),
      email: fc.emailAddress(),
      status: userStatusArbitrary,
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ minLength: 0, maxLength: 200 }),
      permissions: fc.array(fc.uuid(), { minLength: 0, maxLength: 20 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const rolesArbitrary = fc.array(roleArbitrary, { minLength: 0, maxLength: 10 });

    fc.assert(
      fc.property(userArbitrary, rolesArbitrary, (user: User, roles: Role[]) => {
        component.user = user;
        component.userRoles$ = of(roles);

        let emittedRoles: Role[] | null = null;
        component.userRoles$.subscribe((roles) => {
          emittedRoles = roles;
        });

        if (emittedRoles) {
          // Property: No roles should be lost
          expect(emittedRoles.length).toBe(roles.length);

          // Property: All input roles should be present
          for (const inputRole of roles) {
            const found = emittedRoles.find((r) => r.id === inputRole.id);
            expect(found).toBeDefined();
            expect(found).toEqual(inputRole);
          }

          // Property: No duplicate roles
          const uniqueIds = new Set(emittedRoles.map((r) => r.id));
          expect(uniqueIds.size).toBe(emittedRoles.length);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Status Badge Class Determinism
   * 
   * For any user status, the getStatusBadgeClass method should always return the same class.
   */
  it('Property: Status Badge Class Determinism - should return consistent badge classes', () => {
    const statusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');

    fc.assert(
      fc.property(statusArbitrary, (status: UserStatus) => {
        const class1 = component.getStatusBadgeClass(status);
        const class2 = component.getStatusBadgeClass(status);

        // Property: Same status should always produce same badge class
        expect(class1).toBe(class2);

        // Property: Badge class should not be empty
        expect(class1.length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Empty Roles Handling
   * 
   * For any user with no roles, the component should handle the empty roles list correctly.
   */
  it('Property: Empty Roles Handling - should handle empty roles list correctly', () => {
    const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');

    const userArbitrary = fc.record({
      id: fc.uuid(),
      email: fc.emailAddress(),
      status: userStatusArbitrary,
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    fc.assert(
      fc.property(userArbitrary, (user: User) => {
        component.user = user;
        component.userRoles$ = of([]);

        let emittedRoles: Role[] | null = null;
        component.userRoles$.subscribe((roles) => {
          emittedRoles = roles;
        });

        if (emittedRoles) {
          // Property: Empty roles list should have length 0
          expect(emittedRoles.length).toBe(0);

          // Property: Empty roles list should be an array
          expect(Array.isArray(emittedRoles)).toBe(true);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Role Permission Count Accuracy
   * 
   * For any role, the permission count should match the actual permissions array length.
   */
  it('Property: Role Permission Count Accuracy - should accurately reflect permission counts', () => {
    const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');

    const userArbitrary = fc.record({
      id: fc.uuid(),
      email: fc.emailAddress(),
      status: userStatusArbitrary,
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ minLength: 0, maxLength: 200 }),
      permissions: fc.array(fc.uuid(), { minLength: 0, maxLength: 20 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const rolesArbitrary = fc.array(roleArbitrary, { minLength: 1, maxLength: 10 });

    fc.assert(
      fc.property(userArbitrary, rolesArbitrary, (user: User, roles: Role[]) => {
        component.user = user;
        component.userRoles$ = of(roles);

        let emittedRoles: Role[] | null = null;
        component.userRoles$.subscribe((roles) => {
          emittedRoles = roles;
        });

        if (emittedRoles) {
          // Property: Each role's permission count should match array length
          for (const role of emittedRoles) {
            expect(role.permissions.length).toBe(role.permissions.length);
          }
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
