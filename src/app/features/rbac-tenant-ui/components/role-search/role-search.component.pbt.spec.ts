import '@angular/compiler';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { RoleSearchComponent } from './role-search.component';
import { StateService } from '../../services/state.service';
import { vi } from 'vitest';

describe('RoleSearchComponent - Property-Based Tests', () => {
  let component: RoleSearchComponent;
  let stateService: any;

  beforeEach(() => {
    const stateServiceMock = {
      setRoleSearchFilter: vi.fn(),
      roleSearchFilter$: { subscribe: vi.fn() }
    };

    stateService = stateServiceMock;
    component = new RoleSearchComponent(stateService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Property 16: Role Name Search Filtering
   * For any search query, the component should pass it to the state service.
   * Validates: Requirements 9.2, 9.3
   */
  it('Property 16: Role Name Search Filtering - should pass any search query to state service', () => {
    const searchQueryArbitrary = fc.string({ maxLength: 100 });

    fc.assert(
      fc.property(searchQueryArbitrary, (query: string) => {
        const localStateService = {
          setRoleSearchFilter: vi.fn()
        } as any;
        const localComponent = new RoleSearchComponent(localStateService);
        
        localComponent.onSearchChange(query);
        expect(localStateService.setRoleSearchFilter).toHaveBeenCalledWith(query);
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Search Query Passthrough
   * For any search query, the component should pass it exactly to the state service without modification.
   * Validates: Requirements 9.2
   */
  it('Property: Search Query Passthrough - should pass search query exactly without modification', () => {
    const searchQueryArbitrary = fc.string({ maxLength: 100 });

    fc.assert(
      fc.property(searchQueryArbitrary, (query: string) => {
        const localStateService = {
          setRoleSearchFilter: vi.fn()
        } as any;
        const localComponent = new RoleSearchComponent(localStateService);
        
        localComponent.onSearchChange(query);
        const calls = localStateService.setRoleSearchFilter.mock.calls;
        expect(calls[calls.length - 1][0]).toBe(query);
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Empty Search Handling
   * For any empty search query, the component should pass it to the state service.
   * Validates: Requirements 9.3
   */
  it('Property: Empty Search Handling - should handle empty search queries', () => {
    const emptySearchArbitrary = fc.constant('');

    fc.assert(
      fc.property(emptySearchArbitrary, (query: string) => {
        const localStateService = {
          setRoleSearchFilter: vi.fn()
        } as any;
        const localComponent = new RoleSearchComponent(localStateService);
        
        localComponent.onSearchChange(query);
        expect(localStateService.setRoleSearchFilter).toHaveBeenCalledWith('');
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Multiple Search Changes
   * For any sequence of search queries, each should be passed to the state service in order.
   * Validates: Requirements 9.2
   */
  it('Property: Multiple Search Changes - should handle multiple search changes in sequence', () => {
    const searchQueriesArbitrary = fc.array(fc.string({ maxLength: 50 }), { minLength: 1, maxLength: 10 });

    fc.assert(
      fc.property(searchQueriesArbitrary, (queries: string[]) => {
        const localStateService = {
          setRoleSearchFilter: vi.fn()
        } as any;
        const localComponent = new RoleSearchComponent(localStateService);
        
        queries.forEach(query => {
          localComponent.onSearchChange(query);
        });
        
        expect(localStateService.setRoleSearchFilter).toHaveBeenCalledTimes(queries.length);
        
        queries.forEach((query, index) => {
          expect(localStateService.setRoleSearchFilter).toHaveBeenNthCalledWith(index + 1, query);
        });
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Special Characters in Search
   * For any search query with special characters, the component should pass it unchanged.
   * Validates: Requirements 9.2
   */
  it('Property: Special Characters in Search - should handle special characters in search queries', () => {
    const specialCharArbitrary = fc.string({ maxLength: 50 });

    fc.assert(
      fc.property(specialCharArbitrary, (query: string) => {
        const localStateService = {
          setRoleSearchFilter: vi.fn()
        } as any;
        const localComponent = new RoleSearchComponent(localStateService);
        
        localComponent.onSearchChange(query);
        const calls = localStateService.setRoleSearchFilter.mock.calls;
        expect(calls[calls.length - 1][0]).toBe(query);
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Search Query Consistency
   * For any search query, calling onSearchChange multiple times with the same query should result in multiple calls.
   * Validates: Requirements 9.2
   */
  it('Property: Search Query Consistency - should call state service for each search change', () => {
    const searchQueryArbitrary = fc.string({ maxLength: 50 });
    const repetitionsArbitrary = fc.integer({ min: 1, max: 10 });

    fc.assert(
      fc.property(searchQueryArbitrary, repetitionsArbitrary, (query: string, repetitions: number) => {
        const localStateService = {
          setRoleSearchFilter: vi.fn()
        } as any;
        const localComponent = new RoleSearchComponent(localStateService);
        
        for (let i = 0; i < repetitions; i++) {
          localComponent.onSearchChange(query);
        }
        
        expect(localStateService.setRoleSearchFilter).toHaveBeenCalledTimes(repetitions);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Case Preservation
   * For any search query, the component should preserve the case exactly.
   * Validates: Requirements 9.2
   */
  it('Property: Case Preservation - should preserve case in search queries', () => {
    const searchQueryArbitrary = fc.string({ maxLength: 50 });

    fc.assert(
      fc.property(searchQueryArbitrary, (query: string) => {
        const localStateService = {
          setRoleSearchFilter: vi.fn()
        } as any;
        const localComponent = new RoleSearchComponent(localStateService);
        
        localComponent.onSearchChange(query);
        const calls = localStateService.setRoleSearchFilter.mock.calls;
        expect(calls[calls.length - 1][0]).toBe(query);
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
