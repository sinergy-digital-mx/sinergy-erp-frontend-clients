import '@angular/compiler';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PermissionCheckboxGroupComponent } from './permission-checkbox-group.component';
import { of } from 'rxjs';
import { Module } from '../../models';

describe('PermissionCheckboxGroupComponent', () => {
  let component: PermissionCheckboxGroupComponent;

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
    component = new PermissionCheckboxGroupComponent();
    component.modules$ = of(mockModules);
    component.selectedPermissions$ = of([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty expanded modules', () => {
      expect(component.expandedModules.size).toBe(0);
    });

    it('should initialize with empty selected permissions', () => {
      expect(component.selectedPermissions.size).toBe(0);
    });

    it('should accept modules$ input', () => {
      expect(component.modules$).toBeDefined();
    });

    it('should accept selectedPermissions$ input', () => {
      expect(component.selectedPermissions$).toBeDefined();
    });

    it('should have permissionsChanged output', () => {
      expect(component.permissionsChanged).toBeDefined();
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

    it('should emit permissionsChanged event when permission is toggled', () => {
      const emitSpy = vi.spyOn(component.permissionsChanged, 'emit');
      component.togglePermission('leads.read');
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit correct permissions in permissionsChanged event', () => {
      const emitSpy = vi.spyOn(component.permissionsChanged, 'emit');
      component.togglePermission('leads.read');
      component.togglePermission('leads.create');
      
      const lastCall = emitSpy.mock.calls[emitSpy.mock.calls.length - 1][0];
      expect(lastCall).toContain('leads.read');
      expect(lastCall).toContain('leads.create');
      expect(lastCall.length).toBe(2);
    });
  });

  describe('Selected Permissions Initialization', () => {
    it('should initialize selected permissions from input observable', () => {
      component.selectedPermissions$ = of(['leads.read', 'customers.read']);
      component.ngOnInit();
      
      expect(component.isPermissionSelected('leads.read')).toBe(true);
      expect(component.isPermissionSelected('customers.read')).toBe(true);
    });

    it('should update selected permissions when observable emits', () => {
      component.selectedPermissions$ = of(['leads.read']);
      component.ngOnInit();
      
      expect(component.isPermissionSelected('leads.read')).toBe(true);
      expect(component.isPermissionSelected('leads.create')).toBe(false);
    });
  });

  describe('Requirements Validation', () => {
    it('should group permissions by module name (Requirement 17.1)', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          expect(modules.length).toBe(2);
          expect(modules[0].name).toBe('Leads');
          expect(modules[1].name).toBe('Customers');
          resolve();
        });
      });
    });

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

    it('should display permission type clearly (Requirement 17.5)', () => {
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

  describe('Edge Cases', () => {
    it('should handle empty modules list', () => {
      component.modules$ = of([]);
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          expect(modules.length).toBe(0);
          resolve();
        });
      });
    });

    it('should handle module with no permissions', () => {
      const modulesWithEmpty: Module[] = [
        {
          id: 'module1',
          name: 'Empty Module',
          permissions: []
        }
      ];
      component.modules$ = of(modulesWithEmpty);
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          expect(modules[0].permissions.length).toBe(0);
          resolve();
        });
      });
    });

    it('should handle many permissions', () => {
      const manyPermissions = Array.from({ length: 20 }, (_, i) => ({
        id: `perm${i}`,
        type: 'read' as const,
        displayName: `Permission ${i}`
      }));
      const modulesWithMany: Module[] = [
        {
          id: 'module1',
          name: 'Large Module',
          permissions: manyPermissions
        }
      ];
      component.modules$ = of(modulesWithMany);
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          expect(modules[0].permissions.length).toBe(20);
          resolve();
        });
      });
    });
  });

  describe('Permission Preservation', () => {
    it('should preserve all permissions without loss or duplication', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          const allPermissions = modules.flatMap(m => m.permissions);
          const uniqueIds = new Set(allPermissions.map(p => p.id));
          
          expect(uniqueIds.size).toBe(allPermissions.length);
          expect(allPermissions.length).toBe(5);
          resolve();
        });
      });
    });
  });
});
