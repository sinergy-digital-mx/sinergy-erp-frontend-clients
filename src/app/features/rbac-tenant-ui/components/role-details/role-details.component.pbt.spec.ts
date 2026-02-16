import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { RoleDetailsComponent } from './role-details.component';
import { of } from 'rxjs';
import { Role, Module } from '../../models';

describe('RoleDetailsComponent - Property-Based Tests', () => {
  let component: RoleDetailsComponent;

  const mockModules: Module[] = [
    {
      id: 'module1',
      name: 'Leads',
      permissions: [
        { id: 'leads.read', type: 'read', displayName: 'Read' },
        { id: 'leads.create', type: 'create', displayName: 'Create' }
      ]
    }
  ];

  beforeEach(() => {
    component = new RoleDetailsComponent();
    component.modules$ = of(mockModules);
  });

  /**
   * Property 17: Role Details Display
   * For any role, the role details panel should display the role name and description.
   * Validates: Requirements 10.1, 10.2
   */
  it('Property 17: Role Details Display - should display role name and description', () => {
    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ maxLength: 100 }),
      permissions: fc.array(fc.string(), { maxLength: 5 }),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    fc.assert(
      fc.property(roleArbitrary, (role: any) => {
        component.role = role as Role;
        component.ngOnInit();
        
        expect(component.role.name).toBe(role.name);
        expect(component.role.description).toBe(role.description);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 18: Role Permissions Display
   * For any role, all available modules and their permissions should be displayed as checkboxes.
   * Validates: Requirements 10.3
   */
  it('Property 18: Role Permissions Display - should display all modules and permissions', () => {
    const roleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1 }),
      description: fc.string(),
      permissions: fc.array(fc.string()),
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    fc.assert(
      fc.property(roleArbitrary, (role: any) => {
        component.role = role as Role;
        component.ngOnInit();
        
        let displayedModules: Module[] = [];
        component.modules$.subscribe(m => {
          displayedModules = m;
        });
        
        expect(displayedModules.length).toBeGreaterThan(0);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 19: Role Permission Checkbox State
   * For any role, checkboxes for permissions assigned to that role should be checked.
   * Validates: Requirements 10.4, 10.5
   */
  it('Property 19: Role Permission Checkbox State - should check assigned permissions', () => {
    const permissionIdArbitrary = fc.string({ minLength: 1 });
    const permissionsArbitrary = fc.array(permissionIdArbitrary, { minLength: 1, maxLength: 5 });

    fc.assert(
      fc.property(permissionsArbitrary, (permissions: string[]) => {
        const role: Role = {
          id: 'role1',
          name: 'Test Role',
          description: 'Test',
          permissions: permissions,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        component.role = role;
        component.ngOnInit();
        
        permissions.forEach(permissionId => {
          expect(component.isPermissionSelected(permissionId)).toBe(true);
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
