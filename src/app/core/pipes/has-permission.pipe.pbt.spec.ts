import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { HasPermissionPipe } from './has-permission.pipe';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject } from 'rxjs';

describe('HasPermissionPipe - Property-Based Tests', () => {
  let pipe: HasPermissionPipe;
  let mockAuthService: AuthService;
  let permissionsSubject: BehaviorSubject<Set<string>>;

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

    // Create the pipe with the mock service
    pipe = new HasPermissionPipe(mockAuthService);
  });

  /**
   * Property 14: Pipe Permission Check
   * For any permission string, calling the hasPermission pipe's transform() method should return true
   * if the user has that permission, false otherwise.
   * 
   * Validates: Requirements 3.1
   * 
   * Feature: permission-based-ui-control, Property 14: Pipe Permission Check
   */
  it('Property 14: Pipe Permission Check - should return true for set permissions', () => {
    // Generate arbitrary arrays of permission strings
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 10 }
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        // Set the permissions
        const normalizedPermissions = new Set(permissions.map(p => normalizePermission(p)));
        permissionsSubject.next(normalizedPermissions);

        // For each permission that was set, the pipe should return true
        permissions.forEach(permission => {
          const result = pipe.transform(permission);
          expect(result).toBe(true);
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 14 (Extended): Pipe Permission Check - Non-existent Permissions
   * For any permission string that has not been set, the hasPermission pipe should return false.
   * 
   * Validates: Requirements 3.1
   * 
   * Feature: permission-based-ui-control, Property 14: Pipe Permission Check
   */
  it('Property 14 (Extended): Pipe Permission Check - should return false for non-existent permissions', () => {
    // Generate two different permission arrays
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
        (setPermissions: string[], checkPermissions: string[]) => {
          // Set the first set of permissions
          const normalizedPermissions = new Set(setPermissions.map(p => normalizePermission(p)));
          permissionsSubject.next(normalizedPermissions);

          // For each permission that was NOT set, the pipe should return false
          checkPermissions.forEach(permission => {
            // Only check if this permission is not in the set
            if (!setPermissions.includes(permission) && !setPermissions.includes(normalizePermission(permission))) {
              const result = pipe.transform(permission);
              expect(result).toBe(false);
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 14 (Extended): Pipe Permission Check - Empty Permissions
   * When no permissions are set, the hasPermission pipe should return false for any permission.
   * 
   * Validates: Requirements 3.1
   * 
   * Feature: permission-based-ui-control, Property 14: Pipe Permission Check
   */
  it('Property 14 (Extended): Pipe Permission Check - should return false when no permissions are set', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        // Don't set any permissions (empty set)
        permissionsSubject.next(new Set());

        // The pipe should return false for any permission
        const result = pipe.transform(permission);
        expect(result).toBe(false);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 15: Pipe Case-Insensitive Matching
   * For any permission "entity:Action" that has been set, the hasPermission pipe should return true
   * when called with "Entity:Action", "ENTITY:Action", or any other case variation of the entity name.
   * The action part should remain case-sensitive (PascalCase).
   * 
   * Validates: Requirements 3.2, 5.4
   * 
   * Feature: permission-based-ui-control, Property 15: Pipe Case-Insensitive Matching
   */
  it('Property 15: Pipe Case-Insensitive Matching - should match with different entity case variations', () => {
    // Generate arbitrary entity and action strings
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        // Set permission with original entity case
        const originalPermission = `${entity}:${action}`;
        const normalizedPermission = normalizePermission(originalPermission);
        permissionsSubject.next(new Set([normalizedPermission]));

        // Test various case combinations of the entity
        const caseVariations = [
          `${entity.toLowerCase()}:${action}`,
          `${entity.toUpperCase()}:${action}`,
          `${entity.charAt(0).toUpperCase()}${entity.slice(1).toLowerCase()}:${action}`,
          `${entity}:${action}` // original
        ];

        caseVariations.forEach(variation => {
          const result = pipe.transform(variation);
          expect(result).toBe(true);
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 15 (Extended): Pipe Case-Insensitive Matching - Action Case Sensitivity
   * The action part should remain case-sensitive. Different action cases should not match.
   * 
   * Validates: Requirements 3.2, 5.4
   * 
   * Feature: permission-based-ui-control, Property 15: Pipe Case-Insensitive Matching
   */
  it('Property 15 (Extended): Pipe Case-Insensitive Matching - action should be case-sensitive', () => {
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        // Set permission with specific action case
        const originalPermission = `${entity}:${action}`;
        const normalizedPermission = normalizePermission(originalPermission);
        permissionsSubject.next(new Set([normalizedPermission]));

        // Test with different action cases (should not match if action is different)
        const differentActionCases = [
          `${entity}:${action.toLowerCase()}`,
          `${entity}:${action.toUpperCase()}`
        ];

        differentActionCases.forEach(variation => {
          // These should only match if the action case happens to be the same
          const shouldMatch = variation === originalPermission;
          const result = pipe.transform(variation);
          expect(result).toBe(shouldMatch);
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 15 (Extended): Pipe Case-Insensitive Matching - Multiple Permissions
   * When multiple permissions are set with different entity cases, the pipe should
   * correctly match all case variations.
   * 
   * Validates: Requirements 3.2, 5.4
   * 
   * Feature: permission-based-ui-control, Property 15: Pipe Case-Insensitive Matching
   */
  it('Property 15 (Extended): Pipe Case-Insensitive Matching - should handle multiple permissions with case variations', () => {
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 5 }
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        // Set the permissions
        const normalizedPermissions = new Set(permissions.map(p => normalizePermission(p)));
        permissionsSubject.next(normalizedPermissions);

        // For each permission, test various case combinations
        permissions.forEach(permission => {
          const [entity, action] = permission.split(':');

          // Test lowercase entity
          expect(pipe.transform(`${entity.toLowerCase()}:${action}`)).toBe(true);

          // Test uppercase entity
          expect(pipe.transform(`${entity.toUpperCase()}:${action}`)).toBe(true);

          // Test mixed case entity
          if (entity.length > 1) {
            const mixedCase = entity.charAt(0).toUpperCase() + entity.slice(1).toLowerCase();
            expect(pipe.transform(`${mixedCase}:${action}`)).toBe(true);
          }
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 16: Pipe Reactive Updates
   * For any template using the hasPermission pipe, when permissions change,
   * the pipe should return different values without requiring manual refresh.
   * 
   * Validates: Requirements 3.3
   * 
   * Feature: permission-based-ui-control, Property 16: Pipe Reactive Updates
   */
  it('Property 16: Pipe Reactive Updates - should return different values when permissions change', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        // Start with no permissions
        permissionsSubject.next(new Set());

        // Pipe should return false initially
        let result = pipe.transform(permission);
        expect(result).toBe(false);

        // Add the permission
        const normalizedPermission = normalizePermission(permission);
        permissionsSubject.next(new Set([normalizedPermission]));

        // Pipe should now return true
        result = pipe.transform(permission);
        expect(result).toBe(true);

        // Remove the permission
        permissionsSubject.next(new Set());

        // Pipe should return false again
        result = pipe.transform(permission);
        expect(result).toBe(false);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 16 (Extended): Pipe Reactive Updates - Multiple Permission Changes
   * When permissions change multiple times, the pipe should correctly reflect each change.
   * 
   * Validates: Requirements 3.3
   * 
   * Feature: permission-based-ui-control, Property 16: Pipe Reactive Updates
   */
  it('Property 16 (Extended): Pipe Reactive Updates - should handle multiple permission changes', () => {
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
          const normalizedFirst = new Set(firstPermissions.map(p => normalizePermission(p)));
          permissionsSubject.next(normalizedFirst);

          // Verify pipe returns correct values for first permissions
          firstPermissions.forEach(permission => {
            const result = pipe.transform(permission);
            expect(result).toBe(true);
          });

          // Set second permissions
          const normalizedSecond = new Set(secondPermissions.map(p => normalizePermission(p)));
          permissionsSubject.next(normalizedSecond);

          // Verify pipe returns correct values for second permissions
          secondPermissions.forEach(permission => {
            const result = pipe.transform(permission);
            expect(result).toBe(true);
          });

          // Verify pipe returns false for permissions that were in first but not in second
          firstPermissions.forEach(permission => {
            if (!secondPermissions.includes(permission) && !secondPermissions.includes(normalizePermission(permission))) {
              const result = pipe.transform(permission);
              expect(result).toBe(false);
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 16 (Extended): Pipe Reactive Updates - Rapid Permission Changes
   * When permissions change rapidly, the pipe should correctly reflect the latest state.
   * 
   * Validates: Requirements 3.3
   * 
   * Feature: permission-based-ui-control, Property 16: Pipe Reactive Updates
   */
  it('Property 16 (Extended): Pipe Reactive Updates - should handle rapid permission changes', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        const normalizedPermission = normalizePermission(permission);

        // Rapidly change permissions multiple times
        for (let i = 0; i < 10; i++) {
          if (i % 2 === 0) {
            // Add permission
            permissionsSubject.next(new Set([normalizedPermission]));
            expect(pipe.transform(permission)).toBe(true);
          } else {
            // Remove permission
            permissionsSubject.next(new Set());
            expect(pipe.transform(permission)).toBe(false);
          }
        }

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
