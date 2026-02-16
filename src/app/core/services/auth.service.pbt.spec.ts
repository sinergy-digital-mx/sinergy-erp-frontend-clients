import '@angular/compiler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

declare global {
  var localStorage: Storage;
}

describe('AuthService - Property-Based Tests', () => {
  let mockRouter: Router;
  let mockHttpClient: HttpClient;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn()
    };
    globalThis.localStorage = localStorageMock as any;

    // Create mock objects
    mockRouter = {
      navigate: vi.fn()
    } as any;

    mockHttpClient = {} as any;

    mockActivatedRoute = {} as any;
  });

  /**
   * Property 1: Permission Set Emission
   * For any array of permission strings, calling setPermissions() should emit the new Set through
   * the permissions$ observable, and subsequent subscriptions should receive the current state.
   * 
   * Validates: Requirements 1.2, 1.8
   * 
   * Feature: permission-based-ui-control, Property 1: Permission Set Emission
   */
  it('Property 1: Permission Set Emission - should emit correct Set for any permission array', () => {
    // Generate arbitrary arrays of permission strings
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }),
        fc.string({ minLength: 1, maxLength: 20 })
      ).map(([entity, action]) => `${entity}:${action}`)
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        // Create a fresh service instance
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Call setPermissions with the generated array
        freshService.setPermissions(permissions);

        // Verify that permissions$ emits the correct Set
        let emittedSet: Set<string> | undefined;
        freshService.permissions$.subscribe(perms => {
          emittedSet = perms;
        });

        expect(emittedSet).toBeDefined();
        expect(emittedSet instanceof Set).toBe(true);

        // Verify all permissions are in the emitted Set (normalized)
        permissions.forEach(permission => {
          const normalized = normalizePermission(permission);
          expect(emittedSet!.has(normalized)).toBe(true);
        });

        // Verify the size matches
        expect(emittedSet!.size).toBe(permissions.length);

        // Verify that subsequent subscriptions receive the current state
        let secondSubscriptionSet: Set<string> | undefined;
        freshService.permissions$.subscribe(perms => {
          secondSubscriptionSet = perms;
        });

        expect(secondSubscriptionSet).toBeDefined();
        expect(secondSubscriptionSet).toEqual(emittedSet);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1 (Extended): Permission Set Emission - Empty Array
   * For an empty array of permissions, calling setPermissions() should emit an empty Set.
   * 
   * Validates: Requirements 1.2, 1.8
   * 
   * Feature: permission-based-ui-control, Property 1: Permission Set Emission
   */
  it('Property 1 (Extended): Permission Set Emission - should emit empty Set for empty array', () => {
    const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

    freshService.setPermissions([]);

    let emittedSet: Set<string> | undefined;
    freshService.permissions$.subscribe(perms => {
      emittedSet = perms;
    });

    expect(emittedSet).toBeDefined();
    expect(emittedSet instanceof Set).toBe(true);
    expect(emittedSet!.size).toBe(0);
  });

  /**
   * Property 1 (Extended): Permission Set Emission - Multiple Emissions
   * For multiple calls to setPermissions(), each call should emit a new Set through the observable.
   * 
   * Validates: Requirements 1.2, 1.8
   * 
   * Feature: permission-based-ui-control, Property 1: Permission Set Emission
   */
  it('Property 1 (Extended): Permission Set Emission - should emit new Set on each call', () => {
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }),
        fc.string({ minLength: 1, maxLength: 20 })
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 5 }
    );

    fc.assert(
      fc.property(
        permissionArrayArbitrary,
        permissionArrayArbitrary,
        (firstPermissions: string[], secondPermissions: string[]) => {
          const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

          const emissions: Set<string>[] = [];
          freshService.permissions$.subscribe(perms => {
            emissions.push(new Set(perms));
          });

          // First call to setPermissions
          freshService.setPermissions(firstPermissions);

          // Second call to setPermissions
          freshService.setPermissions(secondPermissions);

          // Should have at least 2 emissions (initial + 2 calls)
          expect(emissions.length).toBeGreaterThanOrEqual(2);

          // Verify the last emission matches the second call
          const lastEmission = emissions[emissions.length - 1];
          secondPermissions.forEach(permission => {
            const normalized = normalizePermission(permission);
            expect(lastEmission.has(normalized)).toBe(true);
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1 (Extended): Permission Set Emission - Normalization
   * For any permission array with various case combinations, setPermissions() should normalize
   * them to lowercase entity:PascalCase action format before emitting.
   * 
   * Validates: Requirements 1.2, 1.8, 5.5
   * 
   * Feature: permission-based-ui-control, Property 1: Permission Set Emission
   */
  it('Property 1 (Extended): Permission Set Emission - should normalize permissions before emitting', () => {
    // Generate permission strings with proper format: entity:action
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 5 }
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        freshService.setPermissions(permissions);

        let emittedSet: Set<string> | undefined;
        freshService.permissions$.subscribe(perms => {
          emittedSet = perms;
        });

        // Verify all permissions are normalized (entity lowercase)
        emittedSet!.forEach(permission => {
          const colonIndex = permission.indexOf(':');
          if (colonIndex > 0) {
            const entity = permission.substring(0, colonIndex);
            // The entity part should be lowercase
            expect(entity).toBe(entity.toLowerCase());
          }
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Permission Existence Check
   * For any permission string that has been set, hasPermission() should return true.
   * For any permission string that has not been set, hasPermission() should return false.
   * 
   * Validates: Requirements 1.3
   * 
   * Feature: permission-based-ui-control, Property 2: Permission Existence Check
   */
  it('Property 2: Permission Existence Check - should return true for set permissions', () => {
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
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set the permissions
        freshService.setPermissions(permissions);

        // For each permission that was set, hasPermission should return true
        permissions.forEach(permission => {
          expect(freshService.hasPermission(permission)).toBe(true);
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2 (Extended): Permission Existence Check - Non-existent Permissions
   * For any permission string that has not been set, hasPermission() should return false.
   * 
   * Validates: Requirements 1.3
   * 
   * Feature: permission-based-ui-control, Property 2: Permission Existence Check
   */
  it('Property 2 (Extended): Permission Existence Check - should return false for non-existent permissions', () => {
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
          const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

          // Set the first set of permissions
          freshService.setPermissions(setPermissions);

          // For each permission that was NOT set, hasPermission should return false
          checkPermissions.forEach(permission => {
            // Only check if this permission is not in the set
            if (!setPermissions.includes(permission) && !setPermissions.includes(normalizePermission(permission))) {
              expect(freshService.hasPermission(permission)).toBe(false);
            }
          });

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2 (Extended): Permission Existence Check - Empty Permissions
   * When no permissions are set, hasPermission() should return false for any permission.
   * 
   * Validates: Requirements 1.3
   * 
   * Feature: permission-based-ui-control, Property 2: Permission Existence Check
   */
  it('Property 2 (Extended): Permission Existence Check - should return false when no permissions are set', () => {
    const permissionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    ).map(([entity, action]) => `${entity}:${action}`);

    fc.assert(
      fc.property(permissionArbitrary, (permission: string) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Don't set any permissions (empty set)
        freshService.setPermissions([]);

        // hasPermission should return false for any permission
        expect(freshService.hasPermission(permission)).toBe(false);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Case-Insensitive Entity Matching
   * For any permission "entity:Action" that has been set, hasPermission() should return true
   * when called with "Entity:Action", "ENTITY:Action", or any other case variation of the entity name.
   * The action part should remain case-sensitive (PascalCase).
   * 
   * Validates: Requirements 1.4, 5.2, 5.4
   * 
   * Feature: permission-based-ui-control, Property 3: Case-Insensitive Entity Matching
   */
  it('Property 3: Case-Insensitive Entity Matching - should match with different entity case variations', () => {
    // Generate arbitrary entity and action strings
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set permission with original entity case
        const originalPermission = `${entity}:${action}`;
        freshService.setPermissions([originalPermission]);

        // Test various case combinations of the entity
        const caseVariations = [
          `${entity.toLowerCase()}:${action}`,
          `${entity.toUpperCase()}:${action}`,
          `${entity.charAt(0).toUpperCase()}${entity.slice(1).toLowerCase()}:${action}`,
          `${entity}:${action}` // original
        ];

        caseVariations.forEach(variation => {
          expect(freshService.hasPermission(variation)).toBe(true);
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3 (Extended): Case-Insensitive Entity Matching - Action Case Sensitivity
   * The action part should remain case-sensitive. Different action cases should not match.
   * 
   * Validates: Requirements 1.4, 5.2, 5.4
   * 
   * Feature: permission-based-ui-control, Property 3: Case-Insensitive Entity Matching
   */
  it('Property 3 (Extended): Case-Insensitive Entity Matching - action should be case-sensitive', () => {
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set permission with specific action case
        const originalPermission = `${entity}:${action}`;
        freshService.setPermissions([originalPermission]);

        // Test with different action cases (should not match if action is different)
        const differentActionCases = [
          `${entity}:${action.toLowerCase()}`,
          `${entity}:${action.toUpperCase()}`
        ];

        differentActionCases.forEach(variation => {
          // These should only match if the action case happens to be the same
          const shouldMatch = variation === originalPermission;
          expect(freshService.hasPermission(variation)).toBe(shouldMatch);
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3 (Extended): Case-Insensitive Entity Matching - Multiple Permissions
   * When multiple permissions are set with different entity cases, hasPermission() should
   * correctly match all case variations.
   * 
   * Validates: Requirements 1.4, 5.2, 5.4
   * 
   * Feature: permission-based-ui-control, Property 3: Case-Insensitive Entity Matching
   */
  it('Property 3 (Extended): Case-Insensitive Entity Matching - should handle multiple permissions with case variations', () => {
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 5 }
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set the permissions
        freshService.setPermissions(permissions);

        // For each permission, test various case combinations
        permissions.forEach(permission => {
          const [entity, action] = permission.split(':');

          // Test lowercase entity
          expect(freshService.hasPermission(`${entity.toLowerCase()}:${action}`)).toBe(true);

          // Test uppercase entity
          expect(freshService.hasPermission(`${entity.toUpperCase()}:${action}`)).toBe(true);

          // Test mixed case entity
          if (entity.length > 1) {
            const mixedCase = entity.charAt(0).toUpperCase() + entity.slice(1).toLowerCase();
            expect(freshService.hasPermission(`${mixedCase}:${action}`)).toBe(true);
          }
        });

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


  /**
   * Property 4: Action/Entity Delegation
   * For any action and entity pair, calling can(action, entity) should return the same result
   * as hasPermission("entity:Action") after normalizing the entity to lowercase.
   * 
   * Validates: Requirements 1.5
   * 
   * Feature: permission-based-ui-control, Property 4: Action/Entity Delegation
   */
  it('Property 4: Action/Entity Delegation - can() should delegate to hasPermission() correctly', () => {
    // Generate arbitrary entity and action strings
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set a permission with the entity and action
        const permission = `${entity}:${action}`;
        freshService.setPermissions([permission]);

        // can(action, entity) should return the same result as hasPermission("entity:Action")
        const canResult = freshService.can(action, entity);
        const hasPermissionResult = freshService.hasPermission(`${entity}:${action}`);

        expect(canResult).toBe(hasPermissionResult);
        expect(canResult).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4 (Extended): Action/Entity Delegation - Non-existent Permissions
   * For any action and entity pair that has not been set, can(action, entity) should return false,
   * matching hasPermission() behavior.
   * 
   * Validates: Requirements 1.5
   * 
   * Feature: permission-based-ui-control, Property 4: Action/Entity Delegation
   */
  it('Property 4 (Extended): Action/Entity Delegation - can() should return false for non-existent permissions', () => {
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Don't set any permissions
        freshService.setPermissions([]);

        // can(action, entity) should return false
        const canResult = freshService.can(action, entity);
        const hasPermissionResult = freshService.hasPermission(`${entity}:${action}`);

        expect(canResult).toBe(false);
        expect(canResult).toBe(hasPermissionResult);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4 (Extended): Action/Entity Delegation - Case-Insensitive Entity
   * For any action and entity pair with different case variations, can(action, entity) should
   * return the same result as hasPermission() with normalized entity.
   * 
   * Validates: Requirements 1.5, 5.2, 5.4
   * 
   * Feature: permission-based-ui-control, Property 4: Action/Entity Delegation
   */
  it('Property 4 (Extended): Action/Entity Delegation - can() should handle case-insensitive entity matching', () => {
    const entityActionArbitrary = fc.tuple(
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
      fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
    );

    fc.assert(
      fc.property(entityActionArbitrary, ([entity, action]: [string, string]) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set permission with lowercase entity
        const permission = `${entity.toLowerCase()}:${action}`;
        freshService.setPermissions([permission]);

        // can() with different entity cases should all return true
        const canLowercase = freshService.can(action, entity.toLowerCase());
        const canUppercase = freshService.can(action, entity.toUpperCase());
        const canOriginal = freshService.can(action, entity);

        expect(canLowercase).toBe(true);
        expect(canUppercase).toBe(true);
        expect(canOriginal).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4 (Extended): Action/Entity Delegation - Multiple Permissions
   * For multiple action/entity pairs, can() should correctly delegate to hasPermission()
   * for each pair independently.
   * 
   * Validates: Requirements 1.5
   * 
   * Feature: permission-based-ui-control, Property 4: Action/Entity Delegation
   */
  it('Property 4 (Extended): Action/Entity Delegation - can() should work correctly with multiple permissions', () => {
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':')),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'))
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 5 }
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set the permissions
        freshService.setPermissions(permissions);

        // For each permission, verify can() returns the same result as hasPermission()
        permissions.forEach(permission => {
          const [entity, action] = permission.split(':');
          const canResult = freshService.can(action, entity);
          const hasPermissionResult = freshService.hasPermission(permission);

          expect(canResult).toBe(hasPermissionResult);
          expect(canResult).toBe(true);
        });

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: Convenience Method Delegation
   * For any entity, calling canRead(entity), canCreate(entity), canUpdate(entity), or canDelete(entity)
   * should return the same result as calling can() with the corresponding action.
   * 
   * Validates: Requirements 1.6
   * 
   * Feature: permission-based-ui-control, Property 5: Convenience Method Delegation
   */
  it('Property 5: Convenience Method Delegation - canRead() should delegate to can("Read", entity)', () => {
    const entityArbitrary = fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'));

    fc.assert(
      fc.property(entityArbitrary, (entity: string) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set the Read permission
        freshService.setPermissions([`${entity}:Read`]);

        // canRead(entity) should return the same result as can("Read", entity)
        const canReadResult = freshService.canRead(entity);
        const canResult = freshService.can("Read", entity);

        expect(canReadResult).toBe(canResult);
        expect(canReadResult).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5 (Extended): Convenience Method Delegation - canCreate()
   * For any entity, calling canCreate(entity) should return the same result as calling can("Create", entity).
   * 
   * Validates: Requirements 1.6
   * 
   * Feature: permission-based-ui-control, Property 5: Convenience Method Delegation
   */
  it('Property 5 (Extended): Convenience Method Delegation - canCreate() should delegate to can("Create", entity)', () => {
    const entityArbitrary = fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'));

    fc.assert(
      fc.property(entityArbitrary, (entity: string) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set the Create permission
        freshService.setPermissions([`${entity}:Create`]);

        // canCreate(entity) should return the same result as can("Create", entity)
        const canCreateResult = freshService.canCreate(entity);
        const canResult = freshService.can("Create", entity);

        expect(canCreateResult).toBe(canResult);
        expect(canCreateResult).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5 (Extended): Convenience Method Delegation - canUpdate()
   * For any entity, calling canUpdate(entity) should return the same result as calling can("Update", entity).
   * 
   * Validates: Requirements 1.6
   * 
   * Feature: permission-based-ui-control, Property 5: Convenience Method Delegation
   */
  it('Property 5 (Extended): Convenience Method Delegation - canUpdate() should delegate to can("Update", entity)', () => {
    const entityArbitrary = fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'));

    fc.assert(
      fc.property(entityArbitrary, (entity: string) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set the Update permission
        freshService.setPermissions([`${entity}:Update`]);

        // canUpdate(entity) should return the same result as can("Update", entity)
        const canUpdateResult = freshService.canUpdate(entity);
        const canResult = freshService.can("Update", entity);

        expect(canUpdateResult).toBe(canResult);
        expect(canUpdateResult).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5 (Extended): Convenience Method Delegation - canDelete()
   * For any entity, calling canDelete(entity) should return the same result as calling can("Delete", entity).
   * 
   * Validates: Requirements 1.6
   * 
   * Feature: permission-based-ui-control, Property 5: Convenience Method Delegation
   */
  it('Property 5 (Extended): Convenience Method Delegation - canDelete() should delegate to can("Delete", entity)', () => {
    const entityArbitrary = fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'));

    fc.assert(
      fc.property(entityArbitrary, (entity: string) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set the Delete permission
        freshService.setPermissions([`${entity}:Delete`]);

        // canDelete(entity) should return the same result as can("Delete", entity)
        const canDeleteResult = freshService.canDelete(entity);
        const canResult = freshService.can("Delete", entity);

        expect(canDeleteResult).toBe(canResult);
        expect(canDeleteResult).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5 (Extended): Convenience Method Delegation - All Methods with Same Entity
   * For any entity, all convenience methods should correctly delegate to can() with their respective actions.
   * 
   * Validates: Requirements 1.6
   * 
   * Feature: permission-based-ui-control, Property 5: Convenience Method Delegation
   */
  it('Property 5 (Extended): Convenience Method Delegation - all convenience methods should delegate correctly', () => {
    const entityArbitrary = fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'));

    fc.assert(
      fc.property(entityArbitrary, (entity: string) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set all permissions for the entity
        freshService.setPermissions([
          `${entity}:Read`,
          `${entity}:Create`,
          `${entity}:Update`,
          `${entity}:Delete`
        ]);

        // All convenience methods should return true
        expect(freshService.canRead(entity)).toBe(true);
        expect(freshService.canCreate(entity)).toBe(true);
        expect(freshService.canUpdate(entity)).toBe(true);
        expect(freshService.canDelete(entity)).toBe(true);

        // All should match their corresponding can() calls
        expect(freshService.canRead(entity)).toBe(freshService.can("Read", entity));
        expect(freshService.canCreate(entity)).toBe(freshService.can("Create", entity));
        expect(freshService.canUpdate(entity)).toBe(freshService.can("Update", entity));
        expect(freshService.canDelete(entity)).toBe(freshService.can("Delete", entity));

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5 (Extended): Convenience Method Delegation - Non-existent Permissions
   * For any entity without permissions, all convenience methods should return false,
   * matching can() behavior.
   * 
   * Validates: Requirements 1.6
   * 
   * Feature: permission-based-ui-control, Property 5: Convenience Method Delegation
   */
  it('Property 5 (Extended): Convenience Method Delegation - convenience methods should return false for non-existent permissions', () => {
    const entityArbitrary = fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'));

    fc.assert(
      fc.property(entityArbitrary, (entity: string) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Don't set any permissions
        freshService.setPermissions([]);

        // All convenience methods should return false
        expect(freshService.canRead(entity)).toBe(false);
        expect(freshService.canCreate(entity)).toBe(false);
        expect(freshService.canUpdate(entity)).toBe(false);
        expect(freshService.canDelete(entity)).toBe(false);

        // All should match their corresponding can() calls
        expect(freshService.canRead(entity)).toBe(freshService.can("Read", entity));
        expect(freshService.canCreate(entity)).toBe(freshService.can("Create", entity));
        expect(freshService.canUpdate(entity)).toBe(freshService.can("Update", entity));
        expect(freshService.canDelete(entity)).toBe(freshService.can("Delete", entity));

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5 (Extended): Convenience Method Delegation - Case-Insensitive Entity
   * For any entity with different case variations, convenience methods should correctly
   * delegate to can() with case-insensitive entity matching.
   * 
   * Validates: Requirements 1.6, 5.2, 5.4
   * 
   * Feature: permission-based-ui-control, Property 5: Convenience Method Delegation
   */
  it('Property 5 (Extended): Convenience Method Delegation - convenience methods should handle case-insensitive entity matching', () => {
    const entityArbitrary = fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes(':'));

    fc.assert(
      fc.property(entityArbitrary, (entity: string) => {
        const freshService = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Set permissions with lowercase entity
        freshService.setPermissions([
          `${entity.toLowerCase()}:Read`,
          `${entity.toLowerCase()}:Create`,
          `${entity.toLowerCase()}:Update`,
          `${entity.toLowerCase()}:Delete`
        ]);

        // Convenience methods with different entity cases should all return true
        expect(freshService.canRead(entity.toUpperCase())).toBe(true);
        expect(freshService.canCreate(entity.toUpperCase())).toBe(true);
        expect(freshService.canUpdate(entity.toUpperCase())).toBe(true);
        expect(freshService.canDelete(entity.toUpperCase())).toBe(true);

        // Should also work with original case
        expect(freshService.canRead(entity)).toBe(true);
        expect(freshService.canCreate(entity)).toBe(true);
        expect(freshService.canUpdate(entity)).toBe(true);
        expect(freshService.canDelete(entity)).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: JWT Decoding and Permission Extraction
   * For any valid JWT token containing a "permissions" claim with an array of permission strings,
   * decoding the token should extract the permissions and call setPermissions() with the exact array.
   * 
   * Validates: Requirements 1.7, 4.1, 4.2, 4.3
   * 
   * Feature: permission-based-ui-control, Property 6: JWT Decoding and Permission Extraction
   */
  it('Property 6: JWT Decoding and Permission Extraction - should extract permissions from JWT token and call setPermissions()', () => {
    // Generate arbitrary arrays of permission strings with valid format
    const permissionArrayArbitrary = fc.array(
      fc.tuple(
        fc.string({ minLength: 1, maxLength: 10 }).filter(s => !s.includes(':') && s.trim().length > 0),
        fc.string({ minLength: 1, maxLength: 10 }).filter(s => !s.includes(':') && s.trim().length > 0)
      ).map(([entity, action]) => `${entity}:${action}`),
      { minLength: 1, maxLength: 5 }
    );

    fc.assert(
      fc.property(permissionArrayArbitrary, (permissions: string[]) => {
        // Create a valid JWT token with the permissions claim
        const token = createJWTToken({ permissions });

        // Create a mock HTTP response with the token
        const mockHttpClientForTest = {
          post: vi.fn().mockReturnValue({
            subscribe: (next: any, error: any) => {
              next({ token });
            }
          })
        } as any;

        const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClientForTest, mockActivatedRoute);

        // Spy on setPermissions to verify it's called
        let setPermissionsCalledWithValue: string[] | undefined;
        const originalSetPermissionsMethod = serviceWithMockHttp.setPermissions.bind(serviceWithMockHttp);
        serviceWithMockHttp.setPermissions = (perms: string[]) => {
          setPermissionsCalledWithValue = perms;
          originalSetPermissionsMethod(perms);
        };

        // Call login which should trigger JWT decoding
        let testCompleted = false;
        serviceWithMockHttp.login({}).subscribe(() => {
          // After login, verify setPermissions was called with the extracted permissions
          expect(setPermissionsCalledWithValue).toBeDefined();
          expect(Array.isArray(setPermissionsCalledWithValue)).toBe(true);
          expect(setPermissionsCalledWithValue).toEqual(permissions);

          // Verify the permissions are now in the permissions$ observable
          let emittedPermissions: Set<string> | undefined;
          serviceWithMockHttp.permissions$.subscribe(perms => {
            emittedPermissions = perms;
          });

          expect(emittedPermissions).toBeDefined();
          expect(emittedPermissions instanceof Set).toBe(true);

          // Verify all permissions are in the emitted Set (normalized)
          permissions.forEach(permission => {
            const normalized = normalizePermission(permission);
            expect(emittedPermissions!.has(normalized)).toBe(true);
          });

          testCompleted = true;
        });

        // Ensure the test completed
        expect(testCompleted).toBe(true);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6 (Extended): JWT Decoding and Permission Extraction - Empty Permissions Array
   * For a JWT token with an empty permissions array, decoding should extract the empty array
   * and call setPermissions() with an empty array.
   * 
   * Validates: Requirements 1.7, 4.1, 4.2, 4.3
   * 
   * Feature: permission-based-ui-control, Property 6: JWT Decoding and Permission Extraction
   */
  it('Property 6 (Extended): JWT Decoding and Permission Extraction - should handle empty permissions array', () => {
    // Create a JWT token with empty permissions array
    const token = createJWTToken({ permissions: [] });

    // Create a mock HTTP client
    const mockHttpClientForTest = {
      post: vi.fn().mockReturnValue({
        subscribe: (next: any, error: any) => {
          next({ token });
        }
      })
    } as any;

    const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClientForTest, mockActivatedRoute);

    // Spy on setPermissions
    let setPermissionsCalledWithValue: string[] | undefined;
    const originalSetPermissionsMethod = serviceWithMockHttp.setPermissions.bind(serviceWithMockHttp);
    serviceWithMockHttp.setPermissions = (perms: string[]) => {
      setPermissionsCalledWithValue = perms;
      originalSetPermissionsMethod(perms);
    };

    // Call login
    let testCompleted = false;
    serviceWithMockHttp.login({}).subscribe(() => {
      // Verify setPermissions was called with empty array
      expect(setPermissionsCalledWithValue).toBeDefined();
      expect(Array.isArray(setPermissionsCalledWithValue)).toBe(true);
      expect(setPermissionsCalledWithValue!.length).toBe(0);

      // Verify permissions$ emits empty Set
      let emittedPermissions: Set<string> | undefined;
      serviceWithMockHttp.permissions$.subscribe(perms => {
        emittedPermissions = perms;
      });

      expect(emittedPermissions).toBeDefined();
      expect(emittedPermissions!.size).toBe(0);

      testCompleted = true;
    });

    expect(testCompleted).toBe(true);
  });

  /**
   * Property 6 (Extended): JWT Decoding and Permission Extraction - Invalid Token Handling
   * For an invalid JWT token or token missing the permissions claim, the AuthService should
   * handle the error gracefully and maintain an empty permission Set.
   * 
   * Validates: Requirements 1.7, 4.1, 4.2, 4.3, 4.4
   * 
   * Feature: permission-based-ui-control, Property 6: JWT Decoding and Permission Extraction
   */
  it('Property 6 (Extended): JWT Decoding and Permission Extraction - should handle invalid tokens gracefully', () => {
    // Test with invalid token format
    const invalidToken = 'invalid.token.format';

    const mockHttpClient = {
      post: vi.fn().mockReturnValue({
        subscribe: (next: any, error: any) => {
          next({ token: invalidToken });
        }
      })
    } as any;

    const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

    // Spy on setPermissions
    let setPermissionsCalledWithValue: string[] | undefined;
    const originalSetPermissionsMethod = serviceWithMockHttp.setPermissions.bind(serviceWithMockHttp);
    serviceWithMockHttp.setPermissions = (perms: string[]) => {
      setPermissionsCalledWithValue = perms;
      originalSetPermissionsMethod(perms);
    };

    // Call login - should not throw
    serviceWithMockHttp.login({}).subscribe(() => {
      // Verify setPermissions was called with empty array (graceful handling)
      expect(setPermissionsCalledWithValue).toBeDefined();
      expect(Array.isArray(setPermissionsCalledWithValue)).toBe(true);
      expect(setPermissionsCalledWithValue!.length).toBe(0);

      // Verify permissions$ emits empty Set
      let emittedPermissions: Set<string> | undefined;
      serviceWithMockHttp.permissions$.subscribe(perms => {
        emittedPermissions = perms;
      });

      expect(emittedPermissions).toBeDefined();
      expect(emittedPermissions!.size).toBe(0);
    });
  });

  /**
   * Property 6 (Extended): JWT Decoding and Permission Extraction - Token Without Permissions Claim
   * For a JWT token missing the "permissions" claim, the AuthService should handle it gracefully
   * and maintain an empty permission Set.
   * 
   * Validates: Requirements 1.7, 4.1, 4.2, 4.3, 4.4
   * 
   * Feature: permission-based-ui-control, Property 6: JWT Decoding and Permission Extraction
   */
  it('Property 6 (Extended): JWT Decoding and Permission Extraction - should handle token without permissions claim', () => {
    // Create a JWT token without permissions claim
    const token = createJWTToken({ sub: 'user123', email: 'test@example.com' });

    const mockHttpClient = {
      post: vi.fn().mockReturnValue({
        subscribe: (next: any, error: any) => {
          next({ token });
        }
      })
    } as any;

    const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

    // Spy on setPermissions
    let setPermissionsCalledWithValue: string[] | undefined;
    const originalSetPermissionsMethod = serviceWithMockHttp.setPermissions.bind(serviceWithMockHttp);
    serviceWithMockHttp.setPermissions = (perms: string[]) => {
      setPermissionsCalledWithValue = perms;
      originalSetPermissionsMethod(perms);
    };

    // Call login
    serviceWithMockHttp.login({}).subscribe(() => {
      // Verify setPermissions was called with empty array
      expect(setPermissionsCalledWithValue).toBeDefined();
      expect(Array.isArray(setPermissionsCalledWithValue)).toBe(true);
      expect(setPermissionsCalledWithValue!.length).toBe(0);

      // Verify permissions$ emits empty Set
      let emittedPermissions: Set<string> | undefined;
      serviceWithMockHttp.permissions$.subscribe(perms => {
        emittedPermissions = perms;
      });

      expect(emittedPermissions).toBeDefined();
      expect(emittedPermissions!.size).toBe(0);
    });
  });

  /**
   * Unit Test: Invalid Token Handling - Malformed JWT Token
   * Test with malformed JWT tokens to verify graceful error handling.
   * 
   * Validates: Requirements 4.4
   * 
   * Feature: permission-based-ui-control, Property 18: Invalid Token Handling
   */
  describe('Unit Tests: Invalid Token Handling', () => {
    it('should handle malformed JWT tokens gracefully without throwing exceptions', () => {
      const malformedTokens = [
        'invalid',
        'invalid.token',
        'invalid.token.format.extra',
        'not-a-jwt-at-all',
        '!!!invalid!!!',
        '',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.invalid'
      ];

      malformedTokens.forEach(malformedToken => {
        const mockHttpClient = {
          post: vi.fn().mockReturnValue({
            subscribe: (next: any, error: any) => {
              next({ token: malformedToken });
            }
          })
        } as any;

        const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Should not throw an exception
        expect(() => {
          serviceWithMockHttp.login({}).subscribe();
        }).not.toThrow();

        // Verify permissions$ emits empty Set
        let emittedPermissions: Set<string> | undefined;
        serviceWithMockHttp.permissions$.subscribe(perms => {
          emittedPermissions = perms;
        });

        expect(emittedPermissions).toBeDefined();
        expect(emittedPermissions instanceof Set).toBe(true);
        expect(emittedPermissions!.size).toBe(0);
      });
    });

    it('should call setPermissions with empty array when token is malformed', () => {
      const malformedToken = 'invalid.token.format';

      const mockHttpClient = {
        post: vi.fn().mockReturnValue({
          subscribe: (next: any, error: any) => {
            next({ token: malformedToken });
          }
        })
      } as any;

      const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

      // Spy on setPermissions
      let setPermissionsCalledWithValue: string[] | undefined;
      const originalSetPermissionsMethod = serviceWithMockHttp.setPermissions.bind(serviceWithMockHttp);
      serviceWithMockHttp.setPermissions = (perms: string[]) => {
        setPermissionsCalledWithValue = perms;
        originalSetPermissionsMethod(perms);
      };

      // Call login
      serviceWithMockHttp.login({}).subscribe(() => {
        // Verify setPermissions was called with empty array
        expect(setPermissionsCalledWithValue).toBeDefined();
        expect(Array.isArray(setPermissionsCalledWithValue)).toBe(true);
        expect(setPermissionsCalledWithValue!.length).toBe(0);
      });
    });

    it('should handle missing permissions claim gracefully', () => {
      // Create a JWT token without permissions claim
      const token = createJWTToken({ sub: 'user123', email: 'test@example.com', roles: ['admin'] });

      const mockHttpClient = {
        post: vi.fn().mockReturnValue({
          subscribe: (next: any, error: any) => {
            next({ token });
          }
        })
      } as any;

      const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

      // Should not throw an exception
      expect(() => {
        serviceWithMockHttp.login({}).subscribe();
      }).not.toThrow();

      // Verify permissions$ emits empty Set
      let emittedPermissions: Set<string> | undefined;
      serviceWithMockHttp.permissions$.subscribe(perms => {
        emittedPermissions = perms;
      });

      expect(emittedPermissions).toBeDefined();
      expect(emittedPermissions instanceof Set).toBe(true);
      expect(emittedPermissions!.size).toBe(0);
    });

    it('should call setPermissions with empty array when permissions claim is missing', () => {
      // Create a JWT token without permissions claim
      const token = createJWTToken({ sub: 'user123', email: 'test@example.com' });

      const mockHttpClient = {
        post: vi.fn().mockReturnValue({
          subscribe: (next: any, error: any) => {
            next({ token });
          }
        })
      } as any;

      const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

      // Spy on setPermissions
      let setPermissionsCalledWithValue: string[] | undefined;
      const originalSetPermissionsMethod = serviceWithMockHttp.setPermissions.bind(serviceWithMockHttp);
      serviceWithMockHttp.setPermissions = (perms: string[]) => {
        setPermissionsCalledWithValue = perms;
        originalSetPermissionsMethod(perms);
      };

      // Call login
      serviceWithMockHttp.login({}).subscribe(() => {
        // Verify setPermissions was called with empty array
        expect(setPermissionsCalledWithValue).toBeDefined();
        expect(Array.isArray(setPermissionsCalledWithValue)).toBe(true);
        expect(setPermissionsCalledWithValue!.length).toBe(0);
      });
    });

    it('should handle permissions claim that is not an array gracefully', () => {
      // Create a JWT token with permissions claim that is not an array
      const token = createJWTToken({ 
        sub: 'user123', 
        permissions: 'not-an-array' // Invalid: should be an array
      });

      const mockHttpClient = {
        post: vi.fn().mockReturnValue({
          subscribe: (next: any, error: any) => {
            next({ token });
          }
        })
      } as any;

      const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

      // Should not throw an exception
      expect(() => {
        serviceWithMockHttp.login({}).subscribe();
      }).not.toThrow();

      // Verify permissions$ emits empty Set
      let emittedPermissions: Set<string> | undefined;
      serviceWithMockHttp.permissions$.subscribe(perms => {
        emittedPermissions = perms;
      });

      expect(emittedPermissions).toBeDefined();
      expect(emittedPermissions instanceof Set).toBe(true);
      expect(emittedPermissions!.size).toBe(0);
    });

    it('should call setPermissions with empty array when permissions claim is not an array', () => {
      // Create a JWT token with permissions claim that is not an array
      const token = createJWTToken({ 
        sub: 'user123', 
        permissions: { admin: true } // Invalid: should be an array
      });

      const mockHttpClient = {
        post: vi.fn().mockReturnValue({
          subscribe: (next: any, error: any) => {
            next({ token });
          }
        })
      } as any;

      const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

      // Spy on setPermissions
      let setPermissionsCalledWithValue: string[] | undefined;
      const originalSetPermissionsMethod = serviceWithMockHttp.setPermissions.bind(serviceWithMockHttp);
      serviceWithMockHttp.setPermissions = (perms: string[]) => {
        setPermissionsCalledWithValue = perms;
        originalSetPermissionsMethod(perms);
      };

      // Call login
      serviceWithMockHttp.login({}).subscribe(() => {
        // Verify setPermissions was called with empty array
        expect(setPermissionsCalledWithValue).toBeDefined();
        expect(Array.isArray(setPermissionsCalledWithValue)).toBe(true);
        expect(setPermissionsCalledWithValue!.length).toBe(0);
      });
    });

    it('should emit empty Set on error without throwing exceptions', () => {
      const invalidTokens = [
        null,
        undefined,
        '',
        'invalid.token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.invalid'
      ];

      invalidTokens.forEach(invalidToken => {
        const mockHttpClient = {
          post: vi.fn().mockReturnValue({
            subscribe: (next: any, error: any) => {
              next({ token: invalidToken });
            }
          })
        } as any;

        const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

        // Should not throw
        expect(() => {
          serviceWithMockHttp.login({}).subscribe();
        }).not.toThrow();

        // Verify permissions$ emits empty Set
        let emittedPermissions: Set<string> | undefined;
        serviceWithMockHttp.permissions$.subscribe(perms => {
          emittedPermissions = perms;
        });

        expect(emittedPermissions).toBeDefined();
        expect(emittedPermissions instanceof Set).toBe(true);
        expect(emittedPermissions!.size).toBe(0);
      });
    });

    it('should maintain empty permission Set after invalid token handling', () => {
      const malformedToken = 'invalid.token.format';

      const mockHttpClient = {
        post: vi.fn().mockReturnValue({
          subscribe: (next: any, error: any) => {
            next({ token: malformedToken });
          }
        })
      } as any;

      const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

      // Call login with invalid token
      serviceWithMockHttp.login({}).subscribe(() => {
        // Verify permissions$ emits empty Set
        let emittedPermissions: Set<string> | undefined;
        serviceWithMockHttp.permissions$.subscribe(perms => {
          emittedPermissions = perms;
        });

        expect(emittedPermissions).toBeDefined();
        expect(emittedPermissions!.size).toBe(0);

        // Verify hasPermission returns false for any permission
        expect(serviceWithMockHttp.hasPermission('customers:Create')).toBe(false);
        expect(serviceWithMockHttp.hasPermission('leads:Read')).toBe(false);
        expect(serviceWithMockHttp.hasPermission('users:Delete')).toBe(false);

        // Verify can() returns false for any action/entity
        expect(serviceWithMockHttp.can('Create', 'customers')).toBe(false);
        expect(serviceWithMockHttp.can('Read', 'leads')).toBe(false);
        expect(serviceWithMockHttp.can('Delete', 'users')).toBe(false);

        // Verify convenience methods return false
        expect(serviceWithMockHttp.canCreate('customers')).toBe(false);
        expect(serviceWithMockHttp.canRead('leads')).toBe(false);
        expect(serviceWithMockHttp.canDelete('users')).toBe(false);
      });
    });

    it('should handle null token gracefully', () => {
      const mockHttpClient = {
        post: vi.fn().mockReturnValue({
          subscribe: (next: any, error: any) => {
            next({ token: null });
          }
        })
      } as any;

      const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

      // Should not throw
      expect(() => {
        serviceWithMockHttp.login({}).subscribe();
      }).not.toThrow();

      // Verify permissions$ emits empty Set
      let emittedPermissions: Set<string> | undefined;
      serviceWithMockHttp.permissions$.subscribe(perms => {
        emittedPermissions = perms;
      });

      expect(emittedPermissions).toBeDefined();
      expect(emittedPermissions!.size).toBe(0);
    });

    it('should handle undefined token gracefully', () => {
      const mockHttpClient = {
        post: vi.fn().mockReturnValue({
          subscribe: (next: any, error: any) => {
            next({ token: undefined });
          }
        })
      } as any;

      const serviceWithMockHttp = new AuthService(mockRouter, mockHttpClient, mockActivatedRoute);

      // Should not throw
      expect(() => {
        serviceWithMockHttp.login({}).subscribe();
      }).not.toThrow();

      // Verify permissions$ emits empty Set
      let emittedPermissions: Set<string> | undefined;
      serviceWithMockHttp.permissions$.subscribe(perms => {
        emittedPermissions = perms;
      });

      expect(emittedPermissions).toBeDefined();
      expect(emittedPermissions!.size).toBe(0);
    });
  });

  /**
   * Helper function to create a valid JWT token with the given payload.
   * This creates a properly formatted JWT token that can be decoded by jwtDecode.
   * 
   * @param payload - The payload object to encode in the JWT
   * @returns A valid JWT token string
   */
  function createJWTToken(payload: any): string {
    // Create a simple JWT token with proper structure
    // JWT format: header.payload.signature
    // For testing purposes, we don't need a valid signature since jwtDecode doesn't verify it
    
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const tokenPayload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      ...payload
    };

    // Base64 encode the header and payload
    const headerEncoded = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const payloadEncoded = btoa(JSON.stringify(tokenPayload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    // Create a dummy signature (not validated by jwtDecode in UI context)
    const signature = 'dummy_signature_not_validated';

    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  }
});
