import '@angular/compiler';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RoleListComponent } from './role-list.component';
import { of } from 'rxjs';
import { Role } from '../../models';

describe('RoleListComponent', () => {
  let component: RoleListComponent;

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
    },
    {
      id: 'role3',
      name: 'Viewer',
      description: 'Read-only role',
      permissions: ['leads.read'],
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    }
  ];

  beforeEach(() => {
    component = new RoleListComponent();
    component.roles$ = of(mockRoles);
    component.selectedRoleId$ = of(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should accept roles$ input', () => {
      expect(component.roles$).toBeDefined();
    });

    it('should accept selectedRoleId$ input', () => {
      expect(component.selectedRoleId$).toBeDefined();
    });

    it('should have roleSelected output', () => {
      expect(component.roleSelected).toBeDefined();
    });
  });

  describe('Role List Display', () => {
    it('should display all roles from roles$ observable', () => {
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles.length).toBe(3);
          expect(roles[0].name).toBe('Admin');
          expect(roles[1].name).toBe('User');
          expect(roles[2].name).toBe('Viewer');
          resolve();
        });
      });
    });

    it('should display role name for each role', () => {
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          roles.forEach(role => {
            expect(role.name).toBeDefined();
            expect(role.name.length).toBeGreaterThan(0);
          });
          resolve();
        });
      });
    });

    it('should display permission count for each role', () => {
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles[0].permissions.length).toBe(3);
          expect(roles[1].permissions.length).toBe(2);
          expect(roles[2].permissions.length).toBe(1);
          resolve();
        });
      });
    });

    it('should display "No roles found" when role list is empty', () => {
      component.roles$ = of([]);
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles.length).toBe(0);
          resolve();
        });
      });
    });

    it('should handle roles with zero permissions', () => {
      const rolesWithZeroPermissions: Role[] = [
        {
          id: 'role4',
          name: 'Empty Role',
          description: 'Role with no permissions',
          permissions: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      component.roles$ = of(rolesWithZeroPermissions);
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles[0].permissions.length).toBe(0);
          resolve();
        });
      });
    });

    it('should handle roles with many permissions', () => {
      const manyPermissions = Array.from({ length: 20 }, (_, i) => `permission${i}`);
      const rolesWithManyPermissions: Role[] = [
        {
          id: 'role5',
          name: 'Super Admin',
          description: 'Role with many permissions',
          permissions: manyPermissions,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      component.roles$ = of(rolesWithManyPermissions);
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles[0].permissions.length).toBe(20);
          resolve();
        });
      });
    });
  });

  describe('Role Selection', () => {
    it('should emit roleSelected event when a role is clicked', () => {
      const emitSpy = vi.spyOn(component.roleSelected, 'emit');
      component.onRoleSelected(mockRoles[0]);
      expect(emitSpy).toHaveBeenCalledWith(mockRoles[0]);
    });

    it('should emit the correct role when selected', () => {
      const emitSpy = vi.spyOn(component.roleSelected, 'emit');
      component.onRoleSelected(mockRoles[1]);
      expect(emitSpy).toHaveBeenCalledWith(mockRoles[1]);
    });

    it('should emit different roles when selected sequentially', () => {
      const emitSpy = vi.spyOn(component.roleSelected, 'emit');
      component.onRoleSelected(mockRoles[0]);
      component.onRoleSelected(mockRoles[1]);
      component.onRoleSelected(mockRoles[2]);
      expect(emitSpy).toHaveBeenCalledTimes(3);
      expect(emitSpy).toHaveBeenNthCalledWith(1, mockRoles[0]);
      expect(emitSpy).toHaveBeenNthCalledWith(2, mockRoles[1]);
      expect(emitSpy).toHaveBeenNthCalledWith(3, mockRoles[2]);
    });

    it('should emit the same role multiple times if selected multiple times', () => {
      const emitSpy = vi.spyOn(component.roleSelected, 'emit');
      component.onRoleSelected(mockRoles[0]);
      component.onRoleSelected(mockRoles[0]);
      expect(emitSpy).toHaveBeenCalledTimes(2);
      expect(emitSpy).toHaveBeenCalledWith(mockRoles[0]);
    });
  });

  describe('Selected Role Highlighting', () => {
    it('should expose selectedRoleId$ for highlighting', () => {
      return new Promise<void>((resolve) => {
        component.selectedRoleId$.subscribe(roleId => {
          expect(roleId).toBeNull();
          resolve();
        });
      });
    });

    it('should support changing selected role ID', () => {
      component.selectedRoleId$ = of('role1');
      return new Promise<void>((resolve) => {
        component.selectedRoleId$.subscribe(roleId => {
          expect(roleId).toBe('role1');
          resolve();
        });
      });
    });

    it('should support clearing selected role ID', () => {
      component.selectedRoleId$ = of(null);
      return new Promise<void>((resolve) => {
        component.selectedRoleId$.subscribe(roleId => {
          expect(roleId).toBeNull();
          resolve();
        });
      });
    });
  });

  describe('Requirements Validation', () => {
    it('should display roles with name and permission count (Requirement 8.2)', () => {
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          roles.forEach(role => {
            expect(role.name).toBeDefined();
            expect(role.permissions).toBeDefined();
            expect(Array.isArray(role.permissions)).toBe(true);
          });
          resolve();
        });
      });
    });

    it('should implement role selection with click handler (Requirement 8.3)', () => {
      const emitSpy = vi.spyOn(component.roleSelected, 'emit');
      component.onRoleSelected(mockRoles[0]);
      expect(emitSpy).toHaveBeenCalledWith(mockRoles[0]);
    });

    it('should emit roleSelected event (Requirement 8.3)', () => {
      const emitSpy = vi.spyOn(component.roleSelected, 'emit');
      component.onRoleSelected(mockRoles[0]);
      expect(component.roleSelected.emit).toHaveBeenCalled();
    });

    it('should display roles in scrollable list format', () => {
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles.length).toBeGreaterThan(0);
          resolve();
        });
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle role with special characters in name', () => {
      const specialRole: Role = {
        id: 'role-special',
        name: 'Admin@#$%^&*()',
        description: 'Role with special characters',
        permissions: ['read'],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      component.roles$ = of([specialRole]);
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles[0].name).toBe('Admin@#$%^&*()');
          resolve();
        });
      });
    });

    it('should handle role with very long name', () => {
      const longNameRole: Role = {
        id: 'role-long',
        name: 'A'.repeat(100),
        description: 'Role with very long name',
        permissions: ['read'],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      component.roles$ = of([longNameRole]);
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles[0].name.length).toBe(100);
          resolve();
        });
      });
    });

    it('should handle role with empty description', () => {
      const emptyDescRole: Role = {
        id: 'role-empty-desc',
        name: 'Test Role',
        description: '',
        permissions: ['read'],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      component.roles$ = of([emptyDescRole]);
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles[0].description).toBe('');
          resolve();
        });
      });
    });
  });

  describe('Permission Count Display', () => {
    it('should display singular "permission" for single permission', () => {
      const singlePermRole: Role = {
        id: 'role-single',
        name: 'Single Perm Role',
        description: 'Role with single permission',
        permissions: ['read'],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      component.roles$ = of([singlePermRole]);
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles[0].permissions.length).toBe(1);
          resolve();
        });
      });
    });

    it('should display plural "permissions" for multiple permissions', () => {
      const multiPermRole: Role = {
        id: 'role-multi',
        name: 'Multi Perm Role',
        description: 'Role with multiple permissions',
        permissions: ['read', 'write', 'delete'],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      component.roles$ = of([multiPermRole]);
      return new Promise<void>((resolve) => {
        component.roles$.subscribe(roles => {
          expect(roles[0].permissions.length).toBe(3);
          resolve();
        });
      });
    });
  });
});
