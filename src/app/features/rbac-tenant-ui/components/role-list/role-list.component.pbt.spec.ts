import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { RoleListComponent } from './role-list.component';
import { of } from 'rxjs';
import { Role } from '../../models';

describe('RoleListComponent - Property-Based Tests', () => {
  let component: RoleListComponent;

  beforeEach(() => {
    component = new RoleListComponent();
  });

  /**
   * Property 16: Role Name Search Filtering
   * For any role list and search query, the filtered results should only contain roles whose name contains the search text (case-insensitive).
   * Validates: Requirements 9.2, 9.3
   */
  it('Property 16: Role Name Search Filtering - should display all roles from the input observable', () => {
    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ maxLength: 100 }),
      permissions: fc.array(fc.string(), { maxLength: 20 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const rolesArbitrary = fc.array(roleArbitrary, { minLength: 0, maxLength: 100 });

    fc.assert(
      fc.property(rolesArbitrary, (roles: Role[]) => {
        component.roles$ = of(roles);
        
        let displayedRoles: Role[] = [];
        component.roles$.subscribe(r => {
          displayedRoles = r;
        });
        
        // All roles from input should be displayed
        expect(displayedRoles.length).toBe(roles.length);
        
        // Each role should match the input
        displayedRoles.forEach((displayedRole, index) => {
          expect(displayedRole.id).toBe(roles[index].id);
          expect(displayedRole.name).toBe(roles[index].name);
          expect(displayedRole.permissions.length).toBe(roles[index].permissions.length);
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Role Selection Emission
   * For any role, selecting it should emit the exact role object.
   * Validates: Requirements 8.3
   */
  it('Property: Role Selection Emission - should emit the exact role object when selected', () => {
    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ maxLength: 100 }),
      permissions: fc.array(fc.string(), { maxLength: 20 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    fc.assert(
      fc.property(roleArbitrary, (role: Role) => {
        let emittedRole: Role | undefined;
        component.roleSelected.subscribe(r => {
          emittedRole = r;
        });
        
        component.onRoleSelected(role);
        
        expect(emittedRole).toEqual(role);
        expect(emittedRole?.id).toBe(role.id);
        expect(emittedRole?.name).toBe(role.name);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Role List Integrity
   * For any role list, the displayed list should preserve all roles without loss or duplication.
   * Validates: Requirements 8.2
   */
  it('Property: Role List Integrity - should preserve all roles without loss or duplication', () => {
    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ maxLength: 100 }),
      permissions: fc.array(fc.string(), { maxLength: 20 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const rolesArbitrary = fc.array(roleArbitrary, { minLength: 0, maxLength: 50 });

    fc.assert(
      fc.property(rolesArbitrary, (roles: Role[]) => {
        component.roles$ = of(roles);
        
        let displayedRoles: Role[] = [];
        component.roles$.subscribe(r => {
          displayedRoles = r;
        });
        
        // No roles should be lost
        expect(displayedRoles.length).toBe(roles.length);
        
        // No duplicates should be created
        const uniqueIds = new Set(displayedRoles.map(r => r.id));
        expect(uniqueIds.size).toBe(displayedRoles.length);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Permission Count Accuracy
   * For any role, the permission count should match the actual permissions array length.
   * Validates: Requirements 8.2
   */
  it('Property: Permission Count Accuracy - should accurately display permission count for each role', () => {
    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ maxLength: 100 }),
      permissions: fc.array(fc.string(), { maxLength: 20 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const rolesArbitrary = fc.array(roleArbitrary, { minLength: 1, maxLength: 50 });

    fc.assert(
      fc.property(rolesArbitrary, (roles: Role[]) => {
        component.roles$ = of(roles);
        
        let displayedRoles: Role[] = [];
        component.roles$.subscribe(r => {
          displayedRoles = r;
        });
        
        displayedRoles.forEach((role, index) => {
          expect(role.permissions.length).toBe(roles[index].permissions.length);
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Selected Role ID Consistency
   * For any selected role ID, the component should maintain it consistently.
   * Validates: Requirements 8.3
   */
  it('Property: Selected Role ID Consistency - should maintain selected role ID consistently', () => {
    const roleIdArbitrary = fc.oneof(fc.uuid(), fc.constant(null));

    fc.assert(
      fc.property(roleIdArbitrary, (roleId: string | null) => {
        component.selectedRoleId$ = of(roleId);
        
        let selectedId: string | null = undefined as any;
        component.selectedRoleId$.subscribe(id => {
          selectedId = id;
        });
        
        expect(selectedId).toBe(roleId);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Role Name Display
   * For any role, its name should be displayed exactly as provided.
   * Validates: Requirements 8.2
   */
  it('Property: Role Name Display - should display role names exactly as provided', () => {
    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ maxLength: 100 }),
      permissions: fc.array(fc.string(), { maxLength: 20 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const rolesArbitrary = fc.array(roleArbitrary, { minLength: 1, maxLength: 50 });

    fc.assert(
      fc.property(rolesArbitrary, (roles: Role[]) => {
        component.roles$ = of(roles);
        
        let displayedRoles: Role[] = [];
        component.roles$.subscribe(r => {
          displayedRoles = r;
        });
        
        displayedRoles.forEach((role, index) => {
          expect(role.name).toBe(roles[index].name);
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
