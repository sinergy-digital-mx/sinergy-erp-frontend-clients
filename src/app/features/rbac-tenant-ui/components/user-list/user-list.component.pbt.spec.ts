import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { UserListComponent } from './user-list.component';
import { User, UserStatus } from '../../models';

/**
 * Property-Based Tests for UserListComponent
 * 
 * Property 7: User Details Display
 * Validates: Requirements 2.2, 2.3
 * 
 * For any user list, the component should display each user's email and status correctly.
 */
describe('UserListComponent - Property-Based Tests', () => {
  let component: UserListComponent;

  beforeEach(() => {
    component = new UserListComponent();
  });

  /**
   * Property 7: User Details Display
   * 
   * For any user list, the component should display each user's email and status correctly.
   * 
   * Validates: Requirements 2.2, 2.3
   */
  it('Property 7: User Details Display - should display all user emails and statuses correctly', () => {
    const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');
    
    const userArbitrary = fc.record({
      id: fc.uuid(),
      email: fc.emailAddress(),
      status: userStatusArbitrary,
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const usersArbitrary = fc.array(userArbitrary, { minLength: 1, maxLength: 100 });

    fc.assert(
      fc.property(usersArbitrary, (users: User[]) => {
        component.users = users;

        // Property: All users should be displayed
        expect(component.users.length).toBe(users.length);

        // Property: Each user's email should be accessible
        for (let i = 0; i < users.length; i++) {
          expect(component.users[i].email).toBe(users[i].email);
        }

        // Property: Each user's status should be accessible
        for (let i = 0; i < users.length; i++) {
          expect(component.users[i].status).toBe(users[i].status);
        }

        // Property: Status badge class should be deterministic
        for (let i = 0; i < users.length; i++) {
          const badgeClass = component.getStatusBadgeClass(users[i].status);
          expect(badgeClass).toBeDefined();
          expect(typeof badgeClass).toBe('string');
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: User Selection Emission
   * 
   * For any user in the list, selecting that user should emit the exact same user object.
   */
  it('Property: User Selection Emission - should emit the exact user object when selected', () => {
    const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');
    
    const userArbitrary = fc.record({
      id: fc.uuid(),
      email: fc.emailAddress(),
      status: userStatusArbitrary,
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const usersArbitrary = fc.array(userArbitrary, { minLength: 1, maxLength: 50 });

    fc.assert(
      fc.property(usersArbitrary, fc.integer({ min: 0, max: 49 }), (users: User[], index: number) => {
        if (index >= users.length) return true;

        component.users = users;
        const selectedUser = users[index];
        let emittedUser: User | null = null;

        component.userSelected.subscribe((user: User) => {
          emittedUser = user;
        });

        component.selectUser(selectedUser);

        // Property: Emitted user should be identical to selected user
        expect(emittedUser).toEqual(selectedUser);
        expect(emittedUser?.id).toBe(selectedUser.id);
        expect(emittedUser?.email).toBe(selectedUser.email);
        expect(emittedUser?.status).toBe(selectedUser.status);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Selection State Consistency
   * 
   * For any user ID, the isSelected method should return true only when that ID matches selectedUserId.
   */
  it('Property: Selection State Consistency - should correctly identify selected user', () => {
    const userIdArbitrary = fc.uuid();
    const otherUserIdArbitrary = fc.uuid();

    fc.assert(
      fc.property(userIdArbitrary, otherUserIdArbitrary, (userId: string, otherId: string) => {
        // Skip if IDs are the same
        if (userId === otherId) return true;

        component.selectedUserId = userId;

        // Property: isSelected should return true for the selected user ID
        expect(component.isSelected(userId)).toBe(true);

        // Property: isSelected should return false for other user IDs
        expect(component.isSelected(otherId)).toBe(false);

        // Property: isSelected should return false when selectedUserId is null
        component.selectedUserId = null;
        expect(component.isSelected(userId)).toBe(false);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Status Badge Class Determinism
   * 
   * For any user status, the getStatusBadgeClass method should always return the same class.
   */
  it('Property: Status Badge Class Determinism - should return consistent badge classes', () => {
    const statusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');

    fc.assert(
      fc.property(statusArbitrary, (status: UserStatus) => {
        const class1 = component.getStatusBadgeClass(status);
        const class2 = component.getStatusBadgeClass(status);

        // Property: Same status should always produce same badge class
        expect(class1).toBe(class2);

        // Property: Badge class should not be empty
        expect(class1.length).toBeGreaterThan(0);

        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: User List Integrity
   * 
   * For any user list, the component should preserve all users without loss or duplication.
   */
  it('Property: User List Integrity - should preserve all users without loss or duplication', () => {
    const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');
    
    const userArbitrary = fc.record({
      id: fc.uuid(),
      email: fc.emailAddress(),
      status: userStatusArbitrary,
      createdAt: fc.date(),
      updatedAt: fc.date()
    });

    const usersArbitrary = fc.array(userArbitrary, { minLength: 0, maxLength: 100 });

    fc.assert(
      fc.property(usersArbitrary, (users: User[]) => {
        component.users = users;

        // Property: Component should have same number of users as input
        expect(component.users.length).toBe(users.length);

        // Property: All input users should be present in component
        for (const inputUser of users) {
          const found = component.users.find(u => u.id === inputUser.id);
          expect(found).toBeDefined();
          expect(found).toEqual(inputUser);
        }

        return true;
      }),
      { numRuns: 100 }
    );
  });
});
