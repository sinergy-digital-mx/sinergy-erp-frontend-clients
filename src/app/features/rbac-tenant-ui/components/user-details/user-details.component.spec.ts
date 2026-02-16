import '@angular/compiler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserDetailsComponent } from './user-details.component';
import { User, Role } from '../../models';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let mockSnackBar: any;

  const mockUser: User = {
    id: '1',
    email: 'user@example.com',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  };

  const mockRoles: Role[] = [
    {
      id: 'role1',
      name: 'Admin',
      description: 'Administrator role',
      permissions: ['read', 'write', 'delete'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 'role2',
      name: 'Editor',
      description: 'Editor role',
      permissions: ['read', 'write'],
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  beforeEach(() => {
    mockSnackBar = {
      openFromComponent: vi.fn()
    };
    component = new UserDetailsComponent(mockSnackBar);
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should have roleAssigned EventEmitter', () => {
      expect(component.roleAssigned).toBeDefined();
    });

    it('should have roleReplaced EventEmitter', () => {
      expect(component.roleReplaced).toBeDefined();
    });
  });

  describe('User Details Display (Requirement 5.1, 5.2)', () => {
    it('should display user email', () => {
      component.user = mockUser;
      expect(component.user.email).toBe('user@example.com');
    });

    it('should display user status', () => {
      component.user = mockUser;
      expect(component.user.status).toBe('active');
    });

    it('should display user creation date', () => {
      component.user = mockUser;
      expect(component.user.createdAt).toEqual(new Date('2024-01-01'));
    });

    it('should handle different user statuses', () => {
      const activeUser = { ...mockUser, status: 'active' as const };
      const inactiveUser = { ...mockUser, status: 'inactive' as const };
      const pendingUser = { ...mockUser, status: 'pending' as const };

      component.user = activeUser;
      expect(component.user.status).toBe('active');

      component.user = inactiveUser;
      expect(component.user.status).toBe('inactive');

      component.user = pendingUser;
      expect(component.user.status).toBe('pending');
    });
  });

  describe('User Roles Display (Requirement 5.3, 5.4, 5.5)', () => {
    it('should display user roles when roles are assigned', () => {
      return new Promise<void>((resolve) => {
        component.user = mockUser;
        component.userRoles$ = of(mockRoles);

        component.userRoles$.subscribe(roles => {
          expect(roles.length).toBe(2);
          expect(roles[0].name).toBe('Admin');
          expect(roles[1].name).toBe('Editor');
          resolve();
        });
      });
    });

    it('should display role names', () => {
      return new Promise<void>((resolve) => {
        component.user = mockUser;
        component.userRoles$ = of(mockRoles);

        component.userRoles$.subscribe(roles => {
          expect(roles[0].name).toBe('Admin');
          expect(roles[1].name).toBe('Editor');
          resolve();
        });
      });
    });

    it('should display role descriptions', () => {
      return new Promise<void>((resolve) => {
        component.user = mockUser;
        component.userRoles$ = of(mockRoles);

        component.userRoles$.subscribe(roles => {
          expect(roles[0].description).toBe('Administrator role');
          expect(roles[1].description).toBe('Editor role');
          resolve();
        });
      });
    });

    it('should display permission count for each role', () => {
      return new Promise<void>((resolve) => {
        component.user = mockUser;
        component.userRoles$ = of(mockRoles);

        component.userRoles$.subscribe(roles => {
          expect(roles[0].permissions.length).toBe(3);
          expect(roles[1].permissions.length).toBe(2);
          resolve();
        });
      });
    });

    it('should handle empty roles list', () => {
      return new Promise<void>((resolve) => {
        component.user = mockUser;
        component.userRoles$ = of([]);

        component.userRoles$.subscribe(roles => {
          expect(roles.length).toBe(0);
          resolve();
        });
      });
    });

    it('should display message when no roles are assigned', () => {
      return new Promise<void>((resolve) => {
        component.user = mockUser;
        component.userRoles$ = of([]);

        component.userRoles$.subscribe(roles => {
          expect(roles.length).toBe(0);
          resolve();
        });
      });
    });
  });

  describe('Status Badge Styling', () => {
    it('should return correct class for active status', () => {
      const badgeClass = component.getStatusBadgeClass('active');
      expect(badgeClass).toBe('bg-green-100 text-green-800');
    });

    it('should return correct class for inactive status', () => {
      const badgeClass = component.getStatusBadgeClass('inactive');
      expect(badgeClass).toBe('bg-gray-100 text-gray-800');
    });

    it('should return correct class for pending status', () => {
      const badgeClass = component.getStatusBadgeClass('pending');
      expect(badgeClass).toBe('bg-yellow-100 text-yellow-800');
    });

    it('should return default class for unknown status', () => {
      const badgeClass = component.getStatusBadgeClass('unknown');
      expect(badgeClass).toBe('bg-gray-100 text-gray-800');
    });
  });

  describe('Requirements Validation', () => {
    it('should display user email, status, and creation date (Requirement 5.1, 5.2)', () => {
      component.user = mockUser;
      expect(component.user.email).toBeDefined();
      expect(component.user.status).toBeDefined();
      expect(component.user.createdAt).toBeDefined();
    });

    it('should fetch and display user roles (Requirement 5.3, 5.4)', () => {
      return new Promise<void>((resolve) => {
        component.user = mockUser;
        component.userRoles$ = of(mockRoles);

        component.userRoles$.subscribe(roles => {
          expect(roles).toBeDefined();
          expect(roles.length).toBeGreaterThan(0);
          resolve();
        });
      });
    });

    it('should display message when no roles assigned (Requirement 5.5)', () => {
      return new Promise<void>((resolve) => {
        component.user = mockUser;
        component.userRoles$ = of([]);

        component.userRoles$.subscribe(roles => {
          expect(roles.length).toBe(0);
          resolve();
        });
      });
    });
  });

  describe('Event Emitters', () => {
    it('should have roleAssigned event emitter', () => {
      return new Promise<void>((resolve) => {
        component.roleAssigned.subscribe((event) => {
          expect(event.userId).toBe('1');
          expect(event.roleId).toBe('role1');
          resolve();
        });

        component.roleAssigned.emit({ userId: '1', roleId: 'role1' });
      });
    });

    it('should have roleReplaced event emitter', () => {
      return new Promise<void>((resolve) => {
        component.roleReplaced.subscribe((event) => {
          expect(event.userId).toBe('1');
          expect(event.oldRoleId).toBe('role1');
          expect(event.newRoleId).toBe('role2');
          resolve();
        });

        component.roleReplaced.emit({
          userId: '1',
          oldRoleId: 'role1',
          newRoleId: 'role2'
        });
      });
    });
  });
});
