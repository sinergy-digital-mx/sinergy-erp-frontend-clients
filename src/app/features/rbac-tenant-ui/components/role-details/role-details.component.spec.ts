import '@angular/compiler';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RoleDetailsComponent } from './role-details.component';
import { of } from 'rxjs';
import { Role, Module } from '../../models';

describe('RoleDetailsComponent', () => {
  let component: RoleDetailsComponent;

  const mockRole: Role = {
    id: 'role1',
    name: 'Admin',
    description: 'Administrator role',
    permissions: ['leads.read', 'leads.create', 'customers.read'],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockModules: Module[] = [
    {
      id: 'module1',
      name: 'Leads',
      permissions: [
        { id: 'leads.read', type: 'read', displayName: 'Read' },
        { id: 'leads.create', type: 'create', displayName: 'Create' }
      ]
    },
    {
      id: 'module2',
      name: 'Customers',
      permissions: [
        { id: 'customers.read', type: 'read', displayName: 'Read' }
      ]
    }
  ];

  beforeEach(() => {
    component = new RoleDetailsComponent();
    component.role = mockRole;
    component.modules$ = of(mockModules);
    component.ngOnInit();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize selected permissions from role', () => {
      expect(component.isPermissionSelected('leads.read')).toBe(true);
      expect(component.isPermissionSelected('leads.create')).toBe(true);
      expect(component.isPermissionSelected('customers.read')).toBe(true);
    });

    it('should initialize original permissions from role', () => {
      expect(component.originalPermissions.has('leads.read')).toBe(true);
      expect(component.originalPermissions.has('leads.create')).toBe(true);
      expect(component.originalPermissions.has('customers.read')).toBe(true);
    });
  });

  describe('Role Details Display', () => {
    it('should display role name', () => {
      expect(component.role.name).toBe('Admin');
    });

    it('should display role description', () => {
      expect(component.role.description).toBe('Administrator role');
    });

    it('should display all modules', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          expect(modules.length).toBe(2);
          resolve();
        });
      });
    });
  });

  describe('Permission Display', () => {
    it('should mark assigned permissions as checked', () => {
      expect(component.isPermissionSelected('leads.read')).toBe(true);
      expect(component.isPermissionSelected('leads.create')).toBe(true);
      expect(component.isPermissionSelected('customers.read')).toBe(true);
    });

    it('should mark unassigned permissions as unchecked', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          const allPermissions = modules.flatMap(m => m.permissions);
          const unassignedPermissions = allPermissions.filter(p => !component.role.permissions.includes(p.id));
          
          unassignedPermissions.forEach(permission => {
            expect(component.isPermissionSelected(permission.id)).toBe(false);
          });
          resolve();
        });
      });
    });
  });

  describe('Permission Modification', () => {
    it('should detect when permissions are modified', () => {
      expect(component.isModified()).toBe(false);
      
      component.togglePermission('leads.read');
      expect(component.isModified()).toBe(true);
    });

    it('should detect when permission is added', () => {
      component.togglePermission('customers.delete');
      expect(component.isModified()).toBe(true);
    });

    it('should detect when permission is removed', () => {
      component.togglePermission('leads.read');
      expect(component.isModified()).toBe(true);
    });

    it('should not be modified when toggling back to original state', () => {
      component.togglePermission('leads.read');
      component.togglePermission('leads.read');
      expect(component.isModified()).toBe(false);
    });
  });

  describe('Form Submission', () => {
    it('should emit roleSaved event with modified permissions', () => {
      const emitSpy = vi.spyOn(component.roleSaved, 'emit');
      component.togglePermission('leads.read');
      component.onSave();
      
      expect(emitSpy).toHaveBeenCalled();
      const emittedData = emitSpy.mock.calls[0][0];
      expect(emittedData.name).toBe('Admin');
      expect(emittedData.description).toBe('Administrator role');
    });

    it('should not emit if not modified', () => {
      const emitSpy = vi.spyOn(component.roleSaved, 'emit');
      component.onSave();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });

  describe('Form Cancellation', () => {
    it('should emit cancelled event', () => {
      const emitSpy = vi.spyOn(component.cancelled, 'emit');
      component.onCancel();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should revert permissions to original state', () => {
      component.togglePermission('leads.read');
      expect(component.isModified()).toBe(true);
      
      component.onCancel();
      expect(component.isPermissionSelected('leads.read')).toBe(true);
      expect(component.isModified()).toBe(false);
    });
  });

  describe('Role Deletion', () => {
    it('should emit roleDeleted event with role ID', () => {
      const emitSpy = vi.spyOn(component.roleDeleted, 'emit');
      component.onDelete();
      expect(emitSpy).toHaveBeenCalledWith('role1');
    });
  });

  describe('Requirements Validation', () => {
    it('should display role name and description (Requirement 10.1, 10.2)', () => {
      expect(component.role.name).toBeDefined();
      expect(component.role.description).toBeDefined();
    });

    it('should display all modules with permissions (Requirement 10.3)', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          expect(modules.length).toBeGreaterThan(0);
          modules.forEach(module => {
            expect(module.permissions).toBeDefined();
          });
          resolve();
        });
      });
    });

    it('should mark assigned permissions as checked (Requirement 10.4)', () => {
      component.role.permissions.forEach(permissionId => {
        expect(component.isPermissionSelected(permissionId)).toBe(true);
      });
    });

    it('should mark unassigned permissions as unchecked (Requirement 10.5)', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          const allPermissions = modules.flatMap(m => m.permissions);
          const unassignedPermissions = allPermissions.filter(p => !component.role.permissions.includes(p.id));
          
          unassignedPermissions.forEach(permission => {
            expect(component.isPermissionSelected(permission.id)).toBe(false);
          });
          resolve();
        });
      });
    });
  });
});
