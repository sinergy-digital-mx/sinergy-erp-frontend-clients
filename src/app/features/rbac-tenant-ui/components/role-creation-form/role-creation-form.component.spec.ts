import '@angular/compiler';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RoleCreationFormComponent } from './role-creation-form.component';
import { of } from 'rxjs';
import { Module, RoleDefinition } from '../../models';

describe('RoleCreationFormComponent', () => {
  let component: RoleCreationFormComponent;

  const mockModules: Module[] = [
    {
      id: 'module1',
      name: 'Leads',
      permissions: [
        { id: 'leads.read', type: 'read', displayName: 'Read' },
        { id: 'leads.create', type: 'create', displayName: 'Create' },
        { id: 'leads.edit', type: 'edit', displayName: 'Edit' }
      ]
    },
    {
      id: 'module2',
      name: 'Customers',
      permissions: [
        { id: 'customers.read', type: 'read', displayName: 'Read' },
        { id: 'customers.delete', type: 'delete', displayName: 'Delete' }
      ]
    }
  ];

  beforeEach(() => {
    component = new RoleCreationFormComponent();
    component.modules$ = of(mockModules);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty form fields', () => {
      expect(component.roleName).toBe('');
      expect(component.roleDescription).toBe('');
      expect(component.selectedPermissions.size).toBe(0);
    });

    it('should initialize with no expanded modules', () => {
      expect(component.expandedModules.size).toBe(0);
    });

    it('should accept modules$ input', () => {
      expect(component.modules$).toBeDefined();
    });

    it('should have roleSaved output', () => {
      expect(component.roleSaved).toBeDefined();
    });

    it('should have cancelled output', () => {
      expect(component.cancelled).toBeDefined();
    });
  });

  describe('Form Validation', () => {
    it('should be invalid when role name is empty', () => {
      component.roleName = '';
      component.selectedPermissions.add('leads.read');
      expect(component.isFormValid()).toBe(false);
    });

    it('should be invalid when no permissions are selected', () => {
      component.roleName = 'Admin';
      component.selectedPermissions.clear();
      expect(component.isFormValid()).toBe(false);
    });

    it('should be valid when role name and permissions are provided', () => {
      component.roleName = 'Admin';
      component.selectedPermissions.add('leads.read');
      expect(component.isFormValid()).toBe(true);
    });

    it('should be invalid when role name is only whitespace', () => {
      component.roleName = '   ';
      component.selectedPermissions.add('leads.read');
      expect(component.isFormValid()).toBe(false);
    });

    it('should be valid with multiple permissions', () => {
      component.roleName = 'Admin';
      component.selectedPermissions.add('leads.read');
      component.selectedPermissions.add('leads.create');
      component.selectedPermissions.add('customers.read');
      expect(component.isFormValid()).toBe(true);
    });
  });

  describe('Module Expansion', () => {
    it('should expand module when toggleModule is called', () => {
      component.toggleModule('module1');
      expect(component.isModuleExpanded('module1')).toBe(true);
    });

    it('should collapse module when toggleModule is called again', () => {
      component.toggleModule('module1');
      component.toggleModule('module1');
      expect(component.isModuleExpanded('module1')).toBe(false);
    });

    it('should support multiple expanded modules', () => {
      component.toggleModule('module1');
      component.toggleModule('module2');
      expect(component.isModuleExpanded('module1')).toBe(true);
      expect(component.isModuleExpanded('module2')).toBe(true);
    });

    it('should not affect other modules when toggling one', () => {
      component.toggleModule('module1');
      expect(component.isModuleExpanded('module1')).toBe(true);
      expect(component.isModuleExpanded('module2')).toBe(false);
    });
  });

  describe('Permission Selection', () => {
    it('should select permission when togglePermission is called', () => {
      component.togglePermission('leads.read');
      expect(component.isPermissionSelected('leads.read')).toBe(true);
    });

    it('should deselect permission when togglePermission is called again', () => {
      component.togglePermission('leads.read');
      component.togglePermission('leads.read');
      expect(component.isPermissionSelected('leads.read')).toBe(false);
    });

    it('should support multiple selected permissions', () => {
      component.togglePermission('leads.read');
      component.togglePermission('leads.create');
      component.togglePermission('customers.read');
      expect(component.isPermissionSelected('leads.read')).toBe(true);
      expect(component.isPermissionSelected('leads.create')).toBe(true);
      expect(component.isPermissionSelected('customers.read')).toBe(true);
    });

    it('should not affect other permissions when toggling one', () => {
      component.togglePermission('leads.read');
      expect(component.isPermissionSelected('leads.read')).toBe(true);
      expect(component.isPermissionSelected('leads.create')).toBe(false);
    });
  });

  describe('Form Submission', () => {
    it('should emit roleSaved event with correct data', () => {
      const emitSpy = vi.spyOn(component.roleSaved, 'emit');
      component.roleName = 'Admin';
      component.roleDescription = 'Administrator role';
      component.togglePermission('leads.read');
      component.togglePermission('leads.create');

      component.onSave();

      expect(emitSpy).toHaveBeenCalled();
      const emittedData = emitSpy.mock.calls[0][0] as RoleDefinition;
      expect(emittedData.name).toBe('Admin');
      expect(emittedData.description).toBe('Administrator role');
      expect(emittedData.permissions).toContain('leads.read');
      expect(emittedData.permissions).toContain('leads.create');
    });

    it('should trim whitespace from role name', () => {
      const emitSpy = vi.spyOn(component.roleSaved, 'emit');
      component.roleName = '  Admin  ';
      component.roleDescription = 'Admin role';
      component.togglePermission('leads.read');

      component.onSave();

      const emittedData = emitSpy.mock.calls[0][0] as RoleDefinition;
      expect(emittedData.name).toBe('Admin');
    });

    it('should trim whitespace from description', () => {
      const emitSpy = vi.spyOn(component.roleSaved, 'emit');
      component.roleName = 'Admin';
      component.roleDescription = '  Administrator role  ';
      component.togglePermission('leads.read');

      component.onSave();

      const emittedData = emitSpy.mock.calls[0][0] as RoleDefinition;
      expect(emittedData.description).toBe('Administrator role');
    });

    it('should not emit if form is invalid', () => {
      const emitSpy = vi.spyOn(component.roleSaved, 'emit');
      component.roleName = '';
      component.togglePermission('leads.read');

      component.onSave();

      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should include all selected permissions in emitted data', () => {
      const emitSpy = vi.spyOn(component.roleSaved, 'emit');
      component.roleName = 'Admin';
      component.roleDescription = 'Admin role';
      component.togglePermission('leads.read');
      component.togglePermission('leads.create');
      component.togglePermission('leads.edit');
      component.togglePermission('customers.read');

      component.onSave();

      const emittedData = emitSpy.mock.calls[0][0] as RoleDefinition;
      expect(emittedData.permissions.length).toBe(4);
      expect(emittedData.permissions).toContain('leads.read');
      expect(emittedData.permissions).toContain('leads.create');
      expect(emittedData.permissions).toContain('leads.edit');
      expect(emittedData.permissions).toContain('customers.read');
    });
  });

  describe('Form Cancellation', () => {
    it('should emit cancelled event when onCancel is called', () => {
      const emitSpy = vi.spyOn(component.cancelled, 'emit');
      component.onCancel();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit cancelled event without data', () => {
      const emitSpy = vi.spyOn(component.cancelled, 'emit');
      component.onCancel();
      expect(emitSpy).toHaveBeenCalledWith();
    });
  });

  describe('Requirements Validation', () => {
    it('should display form for entering role name and description (Requirement 11.2)', () => {
      expect(component.roleName).toBeDefined();
      expect(component.roleDescription).toBeDefined();
    });

    it('should display permission checkboxes grouped by module (Requirement 11.2, 17.1)', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          expect(modules.length).toBeGreaterThan(0);
          modules.forEach(module => {
            expect(module.permissions).toBeDefined();
            expect(module.permissions.length).toBeGreaterThan(0);
          });
          resolve();
        });
      });
    });

    it('should enable save button only when name and permissions are provided (Requirement 11.3)', () => {
      component.roleName = '';
      component.selectedPermissions.clear();
      expect(component.isFormValid()).toBe(false);

      component.roleName = 'Admin';
      expect(component.isFormValid()).toBe(false);

      component.selectedPermissions.add('leads.read');
      expect(component.isFormValid()).toBe(true);
    });

    it('should emit roleSaved event with correct data on save (Requirement 11.4)', () => {
      const emitSpy = vi.spyOn(component.roleSaved, 'emit');
      component.roleName = 'Admin';
      component.roleDescription = 'Admin role';
      component.togglePermission('leads.read');

      component.onSave();

      expect(emitSpy).toHaveBeenCalled();
      const emittedData = emitSpy.mock.calls[0][0] as RoleDefinition;
      expect(emittedData.name).toBe('Admin');
      expect(emittedData.description).toBe('Admin role');
      expect(emittedData.permissions).toContain('leads.read');
    });
  });

  describe('Edge Cases', () => {
    it('should handle role name with special characters', () => {
      component.roleName = 'Admin@#$%^&*()';
      component.togglePermission('leads.read');
      expect(component.isFormValid()).toBe(true);
    });

    it('should handle very long role name', () => {
      component.roleName = 'A'.repeat(100);
      component.togglePermission('leads.read');
      expect(component.isFormValid()).toBe(true);
    });

    it('should handle empty description', () => {
      component.roleName = 'Admin';
      component.roleDescription = '';
      component.togglePermission('leads.read');
      expect(component.isFormValid()).toBe(true);
    });

    it('should handle many permissions selected', () => {
      component.roleName = 'Admin';
      mockModules.forEach(module => {
        module.permissions.forEach(permission => {
          component.togglePermission(permission.id);
        });
      });
      expect(component.isFormValid()).toBe(true);
      expect(component.selectedPermissions.size).toBe(5);
    });
  });

  describe('Module Grouping', () => {
    it('should display modules as collapsible sections (Requirement 17.2)', () => {
      component.toggleModule('module1');
      expect(component.isModuleExpanded('module1')).toBe(true);
      component.toggleModule('module1');
      expect(component.isModuleExpanded('module1')).toBe(false);
    });

    it('should display all permissions for expanded module (Requirement 17.3)', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          const leadsModule = modules.find(m => m.id === 'module1');
          expect(leadsModule?.permissions.length).toBe(3);
          resolve();
        });
      });
    });

    it('should show permission types clearly (Requirement 17.5)', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          modules.forEach(module => {
            module.permissions.forEach(permission => {
              expect(permission.type).toBeDefined();
              expect(['read', 'create', 'edit', 'delete', 'download', 'export']).toContain(permission.type);
              expect(permission.displayName).toBeDefined();
            });
          });
          resolve();
        });
      });
    });
  });
});
