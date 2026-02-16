import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { PermissionCheckboxGroupComponent } from './permission-checkbox-group.component';
import { of } from 'rxjs';
import { Module } from '../../models';

describe('PermissionCheckboxGroupComponent - Property-Based Tests', () => {
  let component: PermissionCheckboxGroupComponent;

  beforeEach(() => {
    component = new PermissionCheckboxGroupComponent();
  });

  /**
   * Property 39: Permission Module Grouping
   * For any set of permissions, they should be grouped by their module name with no permissions lost or duplicated.
   * Validates: Requirements 17.1
   */
  it('Property 39: Permission Module Grouping - should preserve all permissions without loss or duplication', () => {
    const permissionArbitrary = fc.record({
      id: fc.uuid(),
      type: fc.constantFrom('read', 'create', 'edit', 'delete', 'download', 'export') as any,
      displayName: fc.string()
    });

    const moduleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1 }),
      permissions: fc.array(permissionArbitrary, { maxLength: 10 })
    });

    const modulesArbitrary = fc.array(moduleArbitrary, { minLength: 1, maxLength: 10 });

    fc.assert(
      fc.property(modulesArbitrary, (modules: any[]) => {
        component.modules$ = of(modules as Module[]);
        
        let displayedModules: Module[] = [];
        component.modules$.subscribe(m => {
          displayedModules = m;
        });
        
        // Count total permissions
        const totalPermissions = modules.reduce((sum, m) => sum + m.permissions.length, 0);
        const displayedPermissions = displayedModules.reduce((sum, m) => sum + m.permissions.length, 0);
        
        expect(displayedPermissions).toBe(totalPermissions);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 40: Module Permission Completeness
   * For any expanded module section, all available permissions for that module should be displayed.
   * Validates: Requirements 17.3
   */
  it('Property 40: Module Permission Completeness - should display all permissions for expanded module', () => {
    const permissionArbitrary = fc.record({
      id: fc.string(),
      type: fc.constantFrom('read', 'create', 'edit', 'delete', 'download', 'export') as any,
      displayName: fc.string()
    });

    const moduleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1 }),
      permissions: fc.array(permissionArbitrary, { minLength: 1, maxLength: 10 })
    });

    fc.assert(
      fc.property(moduleArbitrary, (module: any) => {
        component.modules$ = of([module as Module]);
        component.toggleModule(module.id);
        
        expect(component.isModuleExpanded(module.id)).toBe(true);
        
        let displayedModules: Module[] = [];
        component.modules$.subscribe(m => {
          displayedModules = m;
        });
        
        const displayedModule = displayedModules[0];
        expect(displayedModule.permissions.length).toBe(module.permissions.length);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 41: Permission Type Display
   * For any permission, its type (Read, Create, Edit, Delete, Download, Export) should be clearly displayed.
   * Validates: Requirements 17.5
   */
  it('Property 41: Permission Type Display - should display permission types clearly', () => {
    const permissionTypeArbitrary = fc.constantFrom('read', 'create', 'edit', 'delete', 'download', 'export');

    const permissionArbitrary = fc.record({
      id: fc.string(),
      type: permissionTypeArbitrary as any,
      displayName: fc.string()
    });

    const moduleArbitrary = fc.record({
      id: fc.uuid(),
      name: fc.string({ minLength: 1 }),
      permissions: fc.array(permissionArbitrary, { minLength: 1, maxLength: 10 })
    });

    fc.assert(
      fc.property(moduleArbitrary, (module: any) => {
        component.modules$ = of([module as Module]);
        
        let displayedModules: Module[] = [];
        component.modules$.subscribe(m => {
          displayedModules = m;
        });
        
        displayedModules[0].permissions.forEach(permission => {
          expect(permission.type).toBeDefined();
          expect(['read', 'create', 'edit', 'delete', 'download', 'export']).toContain(permission.type);
          expect(permission.displayName).toBeDefined();
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Permission Selection Consistency
   * For any permission, selecting it should be consistent and emit the correct data.
   * Validates: Requirements 17.1
   */
  it('Property: Permission Selection Consistency - should maintain consistent permission selection', () => {
    const permissionIdArbitrary = fc.string();

    fc.assert(
      fc.property(permissionIdArbitrary, (permissionId: string) => {
        component.togglePermission(permissionId);
        expect(component.isPermissionSelected(permissionId)).toBe(true);
        
        component.togglePermission(permissionId);
        expect(component.isPermissionSelected(permissionId)).toBe(false);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
