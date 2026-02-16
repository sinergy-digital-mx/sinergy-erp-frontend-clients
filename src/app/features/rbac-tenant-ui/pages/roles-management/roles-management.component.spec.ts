import '@angular/compiler';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RolesManagementComponent } from './roles-management.component';
import { StateService } from '../../services/state.service';
import { RoleService } from '../../services/role.service';
import { ModuleService } from '../../services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Role, Module } from '../../models';

describe('RolesManagementComponent - Layout and Panel Switching', () => {
  let component: RolesManagementComponent;
  let stateService: any;
  let roleService: any;
  let moduleService: any;
  let snackBar: any;

  const mockRoles: Role[] = [
    {
      id: 'role1',
      name: 'Admin',
      description: 'Administrator role',
      permissions: ['leads.read', 'leads.create', 'customers.read'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 'role2',
      name: 'User',
      description: 'Regular user role',
      permissions: ['leads.read', 'customers.read'],
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

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
    const stateServiceMock = {
      selectRole: vi.fn(),
      setRoleSearchFilter: vi.fn(),
      updateRoles: vi.fn(),
      updateModules: vi.fn(),
      roles$: of(mockRoles),
      filteredRoles$: of(mockRoles),
      selectedRoleId$: of(null),
      modules$: of(mockModules),
      roleSearchFilter$: of('')
    };

    const roleServiceMock = {
      getRoles: vi.fn().mockReturnValue(of(mockRoles))
    };

    const moduleServiceMock = {
      getModules: vi.fn().mockReturnValue(of(mockModules))
    };

    const snackBarMock = {
      openFromComponent: vi.fn()
    };

    stateService = stateServiceMock;
    roleService = roleServiceMock;
    moduleService = moduleServiceMock;
    snackBar = snackBarMock;

    component = new RolesManagementComponent(stateService, roleService, moduleService, snackBar);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('Left Panel Rendering - Role List', () => {
    it('should expose filteredRoles$ observable for left panel rendering', () => {
      return new Promise<void>((resolve) => {
        component.filteredRoles$.subscribe(roles => {
          expect(roles).toEqual(mockRoles);
          expect(roles.length).toBe(2);
          resolve();
        });
      });
    });

    it('should expose selectedRoleId$ observable for highlighting selected role', () => {
      return new Promise<void>((resolve) => {
        component.selectedRoleId$.subscribe(roleId => {
          expect(roleId).toBeNull();
          resolve();
        });
      });
    });

    it('should expose roleSearchFilter$ observable for search input', () => {
      return new Promise<void>((resolve) => {
        component.roleSearchFilter$.subscribe(filter => {
          expect(filter).toBe('');
          resolve();
        });
      });
    });
  });

  describe('Right Panel Rendering - Role Details', () => {
    it('should expose selectedRole$ observable for right panel details', () => {
      return new Promise<void>((resolve) => {
        component.selectedRole$.subscribe(role => {
          expect(role).toBeNull();
          resolve();
        });
      });
    });

    it('should expose roles$ observable for finding selected role details', () => {
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles).toEqual(mockRoles);
          resolve();
        });
      });
    });

    it('should expose modules$ observable for permission display', () => {
      return new Promise<void>((resolve) => {
        component.modules$.subscribe(modules => {
          expect(modules).toEqual(mockModules);
          resolve();
        });
      });
    });
  });

  describe('Panel Switching - Role Selection', () => {
    it('should call selectRole when role is selected from list', () => {
      const roleId = 'role1';
      component.onRoleSelected(roleId);
      expect(stateService.selectRole).toHaveBeenCalledWith(roleId);
    });

    it('should call selectRole with correct role ID for first role', () => {
      component.onRoleSelected(mockRoles[0].id);
      expect(stateService.selectRole).toHaveBeenCalledWith('role1');
    });

    it('should call selectRole with correct role ID for second role', () => {
      component.onRoleSelected(mockRoles[1].id);
      expect(stateService.selectRole).toHaveBeenCalledWith('role2');
    });

    it('should update state when different role is selected', () => {
      component.onRoleSelected('role1');
      expect(stateService.selectRole).toHaveBeenCalledWith('role1');
      
      component.onRoleSelected('role2');
      expect(stateService.selectRole).toHaveBeenCalledWith('role2');
      expect(stateService.selectRole).toHaveBeenCalledTimes(2);
    });
  });

  describe('Component Initialization', () => {
    it('should fetch roles on component initialization', () => {
      component.ngOnInit();
      expect(roleService.getRoles).toHaveBeenCalled();
    });

    it('should update state with fetched roles', () => {
      component.ngOnInit();
      expect(stateService.updateRoles).toHaveBeenCalledWith(mockRoles);
    });

    it('should fetch modules on component initialization', () => {
      component.ngOnInit();
      expect(moduleService.getModules).toHaveBeenCalled();
    });

    it('should update state with fetched modules', () => {
      component.ngOnInit();
      expect(stateService.updateModules).toHaveBeenCalledWith(mockModules);
    });

    it('should initialize all observables from state service', () => {
      expect(component.roles$).toBeDefined();
      expect(component.filteredRoles$).toBeDefined();
      expect(component.selectedRoleId$).toBeDefined();
      expect(component.selectedRole$).toBeDefined();
      expect(component.modules$).toBeDefined();
      expect(component.roleSearchFilter$).toBeDefined();
    });

    it('should display error message if role fetch fails', () => {
      roleService.getRoles.mockReturnValue(throwError(() => ({ error: { message: 'Failed to load roles' } })));
      component.ngOnInit();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    });

    it('should display error message if module fetch fails', () => {
      moduleService.getModules.mockReturnValue(throwError(() => ({ error: { message: 'Failed to load modules' } })));
      component.ngOnInit();
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    });
  });

  describe('Search and Filter', () => {
    it('should call setRoleSearchFilter when search input changes', () => {
      const input = document.createElement('input');
      input.value = 'Admin';
      const event = new Event('input');
      Object.defineProperty(event, 'target', { value: input, enumerable: true });
      component.onRoleSearchChange(event);
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Admin');
    });

    it('should clear search filter when input is cleared', () => {
      const input = document.createElement('input');
      input.value = '';
      const event = new Event('input');
      Object.defineProperty(event, 'target', { value: input, enumerable: true });
      component.onRoleSearchChange(event);
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('');
    });

    it('should handle search with special characters', () => {
      const input = document.createElement('input');
      input.value = 'Admin@#$';
      const event = new Event('input');
      Object.defineProperty(event, 'target', { value: input, enumerable: true });
      component.onRoleSearchChange(event);
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Admin@#$');
    });
  });

  describe('Create New Role Button', () => {
    it('should call selectRole with null when create button is clicked', () => {
      component.onCreateRoleClicked();
      expect(stateService.selectRole).toHaveBeenCalledWith(null);
    });

    it('should clear selected role to show creation form', () => {
      component.onCreateRoleClicked();
      expect(stateService.selectRole).toHaveBeenCalledWith(null);
    });
  });

  describe('Layout Structure', () => {
    it('should have left panel for role list', () => {
      expect(component.filteredRoles$).toBeDefined();
      expect(component.selectedRoleId$).toBeDefined();
    });

    it('should have right panel for role details', () => {
      expect(component.selectedRole$).toBeDefined();
      expect(component.roles$).toBeDefined();
    });

    it('should support switching between roles in panels', () => {
      component.onRoleSelected('role1');
      expect(stateService.selectRole).toHaveBeenCalledWith('role1');
      
      component.onRoleSelected('role2');
      expect(stateService.selectRole).toHaveBeenCalledWith('role2');
    });
  });

  describe('Requirements Validation', () => {
    it('should display roles in left panel (Requirement 8.1)', () => {
      return new Promise<void>((resolve) => {
        component.filteredRoles$.subscribe(roles => {
          expect(roles.length).toBeGreaterThan(0);
          expect(roles[0].name).toBeDefined();
          expect(roles[0].permissions).toBeDefined();
          resolve();
        });
      });
    });

    it('should display role details in right panel when selected (Requirement 10.1)', () => {
      component.onRoleSelected('role1');
      expect(stateService.selectRole).toHaveBeenCalledWith('role1');
    });

    it('should support panel switching on role selection (Requirement 10.1)', () => {
      const roleId = 'role1';
      component.onRoleSelected(roleId);
      expect(stateService.selectRole).toHaveBeenCalledWith(roleId);
    });

    it('should provide search functionality (Requirement 9.1)', () => {
      const input = document.createElement('input');
      input.value = 'Admin';
      const event = new Event('input');
      Object.defineProperty(event, 'target', { value: input, enumerable: true });
      component.onRoleSearchChange(event);
      expect(stateService.setRoleSearchFilter).toHaveBeenCalledWith('Admin');
    });

    it('should provide create new role button (Requirement 11.1)', () => {
      component.onCreateRoleClicked();
      expect(stateService.selectRole).toHaveBeenCalledWith(null);
    });
  });
});
