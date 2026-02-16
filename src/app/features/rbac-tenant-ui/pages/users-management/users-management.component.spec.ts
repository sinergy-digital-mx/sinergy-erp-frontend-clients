import '@angular/compiler';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UsersManagementComponent } from './users-management.component';
import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { User, Role } from '../../models';

describe('UsersManagementComponent - Layout and Panel Switching', () => {
  let component: UsersManagementComponent;
  let stateService: any;
  let userService: any;
  let roleService: any;
  let snackBar: any;

  const mockUsers: User[] = [
    {
      id: '1',
      email: 'user1@example.com',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      email: 'user2@example.com',
      status: 'inactive',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Admin',
      description: 'Administrator role',
      permissions: ['read', 'write', 'delete'],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ];

  beforeEach(() => {
    const stateServiceMock = {
      selectUser: vi.fn(),
      setUserSearchFilter: vi.fn(),
      setUserStatusFilter: vi.fn(),
      updateUsers: vi.fn(),
      updateRoles: vi.fn(),
      users$: of(mockUsers),
      filteredUsers$: of(mockUsers),
      selectedUserId$: of(null),
      userSearchFilter$: of(''),
      userStatusFilter$: of('all'),
      roles$: of(mockRoles)
    };

    const userServiceMock = {
      getUsers: vi.fn().mockReturnValue(of(mockUsers)),
      getUserRoles: vi.fn().mockReturnValue(of([])),
      assignRoleToUser: vi.fn().mockReturnValue(of(void 0)),
      replaceUserRole: vi.fn().mockReturnValue(of(void 0))
    };

    const roleServiceMock = {
      getRoles: vi.fn().mockReturnValue(of(mockRoles))
    };

    const snackBarMock = {
      openFromComponent: vi.fn()
    };

    stateService = stateServiceMock;
    userService = userServiceMock;
    roleService = roleServiceMock;
    snackBar = snackBarMock;

    component = new UsersManagementComponent(stateService, userService, roleService, snackBar);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('Left Panel Rendering - User List', () => {
    it('should expose filteredUsers$ observable for left panel rendering', () => {
      return new Promise<void>((resolve) => {
        component.filteredUsers$.subscribe(users => {
          expect(users).toEqual(mockUsers);
          expect(users.length).toBe(2);
          resolve();
        });
      });
    });

    it('should expose selectedUserId$ observable for highlighting selected user', () => {
      return new Promise<void>((resolve) => {
        component.selectedUserId$.subscribe(userId => {
          expect(userId).toBeNull();
          resolve();
        });
      });
    });

    it('should expose userSearchFilter$ observable for search input', () => {
      return new Promise<void>((resolve) => {
        component.userSearchFilter$.subscribe(filter => {
          expect(filter).toBe('');
          resolve();
        });
      });
    });

    it('should expose userStatusFilter$ observable for status filter dropdown', () => {
      return new Promise<void>((resolve) => {
        component.userStatusFilter$.subscribe(filter => {
          expect(filter).toBe('all');
          resolve();
        });
      });
    });
  });

  describe('Right Panel Rendering - User Details', () => {
    it('should expose selectedUser$ observable for right panel details', () => {
      return new Promise<void>((resolve) => {
        component.selectedUser$.subscribe(user => {
          expect(user).toBeNull();
          resolve();
        });
      });
    });

    it('should expose users$ observable for finding selected user details', () => {
      return new Promise<void>((resolve) => {
        component.users$.subscribe(users => {
          expect(users).toEqual(mockUsers);
          resolve();
        });
      });
    });
  });

  describe('Panel Switching - User Selection', () => {
    it('should call selectUser when user is selected from list', () => {
      const userId = '1';
      component.onUserSelected(userId);
      expect(stateService.selectUser).toHaveBeenCalledWith(userId);
    });

    it('should call selectUser with correct user ID for first user', () => {
      component.onUserSelected(mockUsers[0].id);
      expect(stateService.selectUser).toHaveBeenCalledWith('1');
    });

    it('should call selectUser with correct user ID for second user', () => {
      component.onUserSelected(mockUsers[1].id);
      expect(stateService.selectUser).toHaveBeenCalledWith('2');
    });

    it('should update state when different user is selected', () => {
      component.onUserSelected('1');
      expect(stateService.selectUser).toHaveBeenCalledWith('1');
      
      component.onUserSelected('2');
      expect(stateService.selectUser).toHaveBeenCalledWith('2');
      expect(stateService.selectUser).toHaveBeenCalledTimes(2);
    });
  });

  describe('Component Initialization', () => {
    it('should fetch users on component initialization', () => {
      component.ngOnInit();
      expect(userService.getUsers).toHaveBeenCalled();
    });

    it('should update state with fetched users', () => {
      component.ngOnInit();
      expect(stateService.updateUsers).toHaveBeenCalledWith(mockUsers);
    });

    it('should fetch roles on component initialization', () => {
      component.ngOnInit();
      expect(roleService.getRoles).toHaveBeenCalled();
    });

    it('should update state with fetched roles', () => {
      component.ngOnInit();
      expect(stateService.updateRoles).toHaveBeenCalledWith(mockRoles);
    });

    it('should initialize all observables from state service', () => {
      expect(component.users$).toBeDefined();
      expect(component.filteredUsers$).toBeDefined();
      expect(component.selectedUserId$).toBeDefined();
      expect(component.selectedUser$).toBeDefined();
      expect(component.userSearchFilter$).toBeDefined();
      expect(component.userStatusFilter$).toBeDefined();
    });
  });

  describe('Layout Structure', () => {
    it('should have left panel for user list', () => {
      expect(component.filteredUsers$).toBeDefined();
      expect(component.selectedUserId$).toBeDefined();
    });

    it('should have right panel for user details', () => {
      expect(component.selectedUser$).toBeDefined();
      expect(component.users$).toBeDefined();
    });

    it('should support switching between users in panels', () => {
      component.onUserSelected('1');
      expect(stateService.selectUser).toHaveBeenCalledWith('1');
      
      component.onUserSelected('2');
      expect(stateService.selectUser).toHaveBeenCalledWith('2');
    });
  });

  describe('Role Assignment', () => {
    it('should handle role assignment', () => {
      const event = { userId: '1', roleId: 'role1' };
      component.onRoleAssigned(event);
      expect(userService.assignRoleToUser).toHaveBeenCalledWith('1', 'role1');
    });

    it('should display success message on role assignment', () => {
      const event = { userId: '1', roleId: 'role1' };
      component.onRoleAssigned(event);
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    });
  });

  describe('Role Replacement', () => {
    it('should handle role replacement', () => {
      const event = { userId: '1', oldRoleId: 'role1', newRoleId: 'role2' };
      component.onRoleReplaced(event);
      expect(userService.replaceUserRole).toHaveBeenCalledWith('1', 'role1', 'role2');
    });

    it('should display success message on role replacement', () => {
      const event = { userId: '1', oldRoleId: 'role1', newRoleId: 'role2' };
      component.onRoleReplaced(event);
      expect(snackBar.openFromComponent).toHaveBeenCalled();
    });
  });

  describe('Requirements Validation', () => {
    it('should display users in left panel (Requirement 2.1)', () => {
      return new Promise<void>((resolve) => {
        component.filteredUsers$.subscribe(users => {
          expect(users.length).toBeGreaterThan(0);
          expect(users[0].email).toBeDefined();
          expect(users[0].status).toBeDefined();
          resolve();
        });
      });
    });

    it('should display user details in right panel when selected (Requirement 5.1)', () => {
      component.onUserSelected('1');
      expect(stateService.selectUser).toHaveBeenCalledWith('1');
    });

    it('should support panel switching on user selection (Requirement 5.1)', () => {
      const userId = '1';
      component.onUserSelected(userId);
      expect(stateService.selectUser).toHaveBeenCalledWith(userId);
    });
  });
});
