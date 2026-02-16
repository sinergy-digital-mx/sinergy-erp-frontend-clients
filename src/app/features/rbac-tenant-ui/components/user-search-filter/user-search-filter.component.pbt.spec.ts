import '@angular/compiler';
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { StateService } from '../../services/state.service';
import { User, UserStatus } from '../../models';

/**
 * Property-Based Tests for User Search and Filter
 * Tests universal properties that should hold across all valid inputs
 */
describe('User Search and Filter - Property-Based Tests', () => {
  let stateService: StateService;

  beforeEach(() => {
    stateService = new StateService();
  });

  // Arbitraries for generating test data
  const userStatusArbitrary = fc.constantFrom<UserStatus>('active', 'inactive', 'pending');

  const userArbitrary = fc.record({
    id: fc.uuid(),
    email: fc.emailAddress(),
    status: userStatusArbitrary,
    createdAt: fc.date(),
    updatedAt: fc.date(),
  });

  const userListArbitrary = fc.array(userArbitrary, { minLength: 1, maxLength: 100 });

  /**
   * Property 4: User Email Search Filtering
   * For any user list and search query, the filtered results should only contain
   * users whose email contains the search text (case-insensitive).
   * **Validates: Requirements 3.2, 3.3**
   */
  it('Property 4: User Email Search Filtering - filtered results contain only matching emails', () => {
    fc.assert(
      fc.property(userListArbitrary, fc.string({ minLength: 1, maxLength: 50 }), (users, searchQuery) => {
        stateService.updateUsers(users);
        stateService.setUserStatusFilter('all');
        stateService.setUserSearchFilter(searchQuery);

        // Get filtered users synchronously for property test
        let filteredUsers: User[] = [];
        stateService.filteredUsers$.subscribe(result => {
          filteredUsers = result;
        }).unsubscribe();

        // All filtered users should contain the search query in their email (case-insensitive)
        const searchLower = searchQuery.toLowerCase();
        return filteredUsers.every(user => user.email.toLowerCase().includes(searchLower));
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: User Email Search Filtering - filtered results are subset of original
   * For any user list and search query, the filtered results should be a subset
   * of the original user list (no new users introduced).
   * **Validates: Requirements 3.2, 3.3**
   */
  it('Property 4: User Email Search Filtering - filtered results are subset of original list', () => {
    fc.assert(
      fc.property(userListArbitrary, fc.string({ minLength: 0, maxLength: 50 }), (users, searchQuery) => {
        stateService.updateUsers(users);
        stateService.setUserStatusFilter('all');
        stateService.setUserSearchFilter(searchQuery);

        let filteredUsers: User[] = [];
        stateService.filteredUsers$.subscribe(result => {
          filteredUsers = result;
        }).unsubscribe();

        // All filtered users should exist in the original list
        return filteredUsers.every(filteredUser =>
          users.some(originalUser => originalUser.id === filteredUser.id)
        );
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: User Status Filtering
   * For any user list and status filter, the filtered results should only contain
   * users matching the selected status, or all users if "All" is selected.
   * **Validates: Requirements 4.2, 4.3**
   */
  it('Property 5: User Status Filtering - filtered results match selected status', () => {
    fc.assert(
      fc.property(userListArbitrary, userStatusArbitrary, (users, statusFilter) => {
        stateService.updateUsers(users);
        stateService.setUserSearchFilter('');
        stateService.setUserStatusFilter(statusFilter);

        let filteredUsers: User[] = [];
        stateService.filteredUsers$.subscribe(result => {
          filteredUsers = result;
        }).unsubscribe();

        // All filtered users should have the selected status
        return filteredUsers.every(user => user.status === statusFilter);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 5: User Status Filtering - "all" filter returns all users
   * For any user list, when "all" status filter is selected, all users should be returned.
   * **Validates: Requirements 4.2, 4.3**
   */
  it('Property 5: User Status Filtering - "all" filter returns all users', () => {
    fc.assert(
      fc.property(userListArbitrary, (users) => {
        stateService.updateUsers(users);
        stateService.setUserSearchFilter('');
        stateService.setUserStatusFilter('all');

        let filteredUsers: User[] = [];
        stateService.filteredUsers$.subscribe(result => {
          filteredUsers = result;
        }).unsubscribe();

        // All users should be returned when filter is "all"
        return filteredUsers.length === users.length;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Combined User Filters
   * For any user list, search query, and status filter, applying both filters
   * should produce the intersection of results that match both criteria.
   * **Validates: Requirements 4.4**
   */
  it('Property 6: Combined User Filters - both search and status filters applied correctly', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        fc.string({ minLength: 1, maxLength: 50 }),
        userStatusArbitrary,
        (users, searchQuery, statusFilter) => {
          stateService.updateUsers(users);
          stateService.setUserSearchFilter(searchQuery);
          stateService.setUserStatusFilter(statusFilter);

          let filteredUsers: User[] = [];
          stateService.filteredUsers$.subscribe(result => {
            filteredUsers = result;
          }).unsubscribe();

          // All filtered users should match both criteria
          const searchLower = searchQuery.toLowerCase();
          return filteredUsers.every(user =>
            user.email.toLowerCase().includes(searchLower) && user.status === statusFilter
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Combined User Filters - result is subset of original
   * For any user list with combined filters, the result should be a subset
   * of the original list.
   * **Validates: Requirements 4.4**
   */
  it('Property 6: Combined User Filters - result is subset of original list', () => {
    fc.assert(
      fc.property(
        userListArbitrary,
        fc.string({ minLength: 0, maxLength: 50 }),
        userStatusArbitrary,
        (users, searchQuery, statusFilter) => {
          stateService.updateUsers(users);
          stateService.setUserSearchFilter(searchQuery);
          stateService.setUserStatusFilter(statusFilter);

          let filteredUsers: User[] = [];
          stateService.filteredUsers$.subscribe(result => {
            filteredUsers = result;
          }).unsubscribe();

          // All filtered users should exist in the original list
          return filteredUsers.every(filteredUser =>
            users.some(originalUser => originalUser.id === filteredUser.id)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Combined User Filters - empty search with status filter
   * For any user list and status filter with empty search, should return
   * all users matching the status.
   * **Validates: Requirements 4.4**
   */
  it('Property 6: Combined User Filters - empty search returns all matching status', () => {
    fc.assert(
      fc.property(userListArbitrary, userStatusArbitrary, (users, statusFilter) => {
        stateService.updateUsers(users);
        stateService.setUserSearchFilter('');
        stateService.setUserStatusFilter(statusFilter);

        let filteredUsers: User[] = [];
        stateService.filteredUsers$.subscribe(result => {
          filteredUsers = result;
        }).unsubscribe();

          // Should return all users with matching status
        const expectedCount = users.filter(u => u.status === statusFilter).length;
        return filteredUsers.length === expectedCount;
      }),
      { numRuns: 100 }
    );
  });
});
