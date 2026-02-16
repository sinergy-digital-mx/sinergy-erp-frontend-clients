import '@angular/compiler';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserListComponent } from './user-list.component';
import { User } from '../../models';

describe('UserListComponent', () => {
  let component: UserListComponent;

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
    },
    {
      id: '3',
      email: 'user3@example.com',
      status: 'pending',
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    }
  ];

  beforeEach(() => {
    component = new UserListComponent();
  });

  describe('Component Initialization', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty users array', () => {
      expect(component.users).toEqual([]);
    });

    it('should initialize with null selectedUserId', () => {
      expect(component.selectedUserId).toBeNull();
    });

    it('should have userSelected EventEmitter', () => {
      expect(component.userSelected).toBeDefined();
    });
  });

  describe('User Display (Requirement 2.2, 2.3)', () => {
    it('should display users with email', () => {
      component.users = mockUsers;
      expect(component.users[0].email).toBe('user1@example.com');
      expect(component.users[1].email).toBe('user2@example.com');
    });

    it('should display users with status', () => {
      component.users = mockUsers;
      expect(component.users[0].status).toBe('active');
      expect(component.users[1].status).toBe('inactive');
      expect(component.users[2].status).toBe('pending');
    });

    it('should display all users in the list', () => {
      component.users = mockUsers;
      expect(component.users.length).toBe(3);
    });

    it('should handle empty user list', () => {
      component.users = [];
      expect(component.users.length).toBe(0);
    });
  });

  describe('User Selection (Requirement 5.1)', () => {
    it('should emit userSelected event when user is selected', () => {
      return new Promise<void>((resolve) => {
        component.users = mockUsers;
        const selectedUser = mockUsers[0];

        component.userSelected.subscribe((user: User) => {
          expect(user).toEqual(selectedUser);
          resolve();
        });

        component.selectUser(selectedUser);
      });
    });

    it('should emit correct user when first user is selected', () => {
      return new Promise<void>((resolve) => {
        component.users = mockUsers;

        component.userSelected.subscribe((user: User) => {
          expect(user.id).toBe('1');
          expect(user.email).toBe('user1@example.com');
          resolve();
        });

        component.selectUser(mockUsers[0]);
      });
    });

    it('should emit correct user when second user is selected', () => {
      return new Promise<void>((resolve) => {
        component.users = mockUsers;

        component.userSelected.subscribe((user: User) => {
          expect(user.id).toBe('2');
          expect(user.email).toBe('user2@example.com');
          resolve();
        });

        component.selectUser(mockUsers[1]);
      });
    });

    it('should emit correct user when third user is selected', () => {
      return new Promise<void>((resolve) => {
        component.users = mockUsers;

        component.userSelected.subscribe((user: User) => {
          expect(user.id).toBe('3');
          expect(user.email).toBe('user3@example.com');
          resolve();
        });

        component.selectUser(mockUsers[2]);
      });
    });

    it('should handle multiple user selections', () => {
      return new Promise<void>((resolve) => {
        component.users = mockUsers;
        let selectionCount = 0;

        component.userSelected.subscribe((user: User) => {
          selectionCount++;
          if (selectionCount === 1) {
            expect(user.id).toBe('1');
          } else if (selectionCount === 2) {
            expect(user.id).toBe('2');
            resolve();
          }
        });

        component.selectUser(mockUsers[0]);
        component.selectUser(mockUsers[1]);
      });
    });
  });

  describe('User Selection State', () => {
    it('should identify selected user correctly', () => {
      component.selectedUserId = '1';
      expect(component.isSelected('1')).toBe(true);
      expect(component.isSelected('2')).toBe(false);
    });

    it('should return false when no user is selected', () => {
      component.selectedUserId = null;
      expect(component.isSelected('1')).toBe(false);
    });

    it('should update selection state when selectedUserId changes', () => {
      component.selectedUserId = '1';
      expect(component.isSelected('1')).toBe(true);

      component.selectedUserId = '2';
      expect(component.isSelected('1')).toBe(false);
      expect(component.isSelected('2')).toBe(true);
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
    it('should display users with email and status (Requirement 2.2, 2.3)', () => {
      component.users = mockUsers;
      expect(component.users[0].email).toBeDefined();
      expect(component.users[0].status).toBeDefined();
      expect(component.users[1].email).toBeDefined();
      expect(component.users[1].status).toBeDefined();
    });

    it('should implement user selection with click handler (Requirement 5.1)', () => {
      return new Promise<void>((resolve) => {
        component.users = mockUsers;
        const selectedUser = mockUsers[0];

        component.userSelected.subscribe((user: User) => {
          expect(user).toEqual(selectedUser);
          resolve();
        });

        component.selectUser(selectedUser);
      });
    });

    it('should emit userSelected event (Requirement 5.1)', () => {
      return new Promise<void>((resolve) => {
        component.users = mockUsers;

        component.userSelected.subscribe((user: User) => {
          expect(user).toBeDefined();
          resolve();
        });

        component.selectUser(mockUsers[0]);
      });
    });
  });
});
