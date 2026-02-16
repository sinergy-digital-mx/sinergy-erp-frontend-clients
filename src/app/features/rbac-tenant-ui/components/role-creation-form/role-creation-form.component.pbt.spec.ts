import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { RoleCreationFormComponent } from './role-creation-form.component';
import { of } from 'rxjs';
import { Module, RoleDefinition } from '../../models';
import { vi } from 'vitest';

describe('RoleCreationFormComponent - Property-Based Tests', () => {
  let component: RoleCreationFormComponent;

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
    component = new RoleCreationFormComponent();
    component.modules$ = of(mockModules);
  });

  /**
   * Property 20: Role Creation API Call
   * For any role name, description, and permission set, creating a role should emit the correct data.
   * Validates: Requirements 11.4
   */
  it('Property 20: Role Creation API Call - should emit role definition with correct data', () => {
    const roleNameArbitrary = fc.string({ minLength: 1, maxLength: 50 });
    const descriptionArbitrary = fc.string({ maxLength: 100 });

    fc.assert(
      fc.property(roleNameArbitrary, descriptionArbitrary, (name: string, description: string) => {
        const localComponent = new RoleCreationFormComponent();
        localComponent.modules$ = of(mockModules);
        
        localComponent.roleName = name;
        localComponent.roleDescription = description;
        localComponent.togglePermission('leads.read');

        const emitSpy = vi.spyOn(localComponent.roleSaved, 'emit');
        localComponent.onSave();

        expect(emitSpy).toHaveBeenCalled();
        const emittedData = emitSpy.mock.calls[0][0] as RoleDefinition;
        expect(emittedData.name).toBe(name.trim());
        expect(emittedData.description).toBe(description.trim());
        expect(emittedData.permissions).toContain('leads.read');

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 21: Role Creation UI Update
   * For any successfully created role, the new role should be emitted.
   * Validates: Requirements 11.5
   */
  it('Property 21: Role Creation UI Update - should emit role definition on save', () => {
    const roleNameArbitrary = fc.string({ minLength: 1, maxLength: 50 });

    fc.assert(
      fc.property(roleNameArbitrary, (name: string) => {
        const localComponent = new RoleCreationFormComponent();
        localComponent.modules$ = of(mockModules);
        
        localComponent.roleName = name;
        localComponent.togglePermission('leads.read');

        const emitSpy = vi.spyOn(localComponent.roleSaved, 'emit');
        localComponent.onSave();

        expect(emitSpy).toHaveBeenCalled();

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Form Validation Consistency
   * For any role name and permission set, form validity should be consistent.
   * Validates: Requirements 11.3
   */
  it('Property: Form Validation Consistency - should validate form consistently', () => {
    const roleNameArbitrary = fc.string({ maxLength: 50 });

    fc.assert(
      fc.property(roleNameArbitrary, (name: string) => {
        const localComponent = new RoleCreationFormComponent();
        localComponent.modules$ = of(mockModules);
        
        localComponent.roleName = name;
        const hasName = name.trim().length > 0;
        const hasPermissions = localComponent.selectedPermissions.size > 0;

        expect(localComponent.isFormValid()).toBe(hasName && hasPermissions);

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
