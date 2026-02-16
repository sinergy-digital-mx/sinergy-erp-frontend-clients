import { TestBed } from '@angular/core/testing';
import { FilterStateService, FilterState } from './filter-state.service';

describe('FilterStateService', () => {
  let service: FilterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterStateService]
    });
    service = TestBed.inject(FilterStateService);
  });

  describe('Initial State', () => {
    it('should create with initial state', () => {
      expect(service).toBeTruthy();
    });

    it('should have default filter state', () => {
      const state = service.getFilterState();
      expect(state.groupId).toBeNull();
      expect(state.groupName).toBeNull();
      expect(state.searchTerm).toBeNull();
      expect(state.statusId).toBeNull();
      expect(state.page).toBe(1);
      expect(state.limit).toBe(20);
    });
  });

  describe('Group Filter', () => {
    it('should set group filter', () => {
      service.setGroupFilter('group-1', 'Enterprise');
      const state = service.getFilterState();
      
      expect(state.groupId).toBe('group-1');
      expect(state.groupName).toBe('Enterprise');
    });

    it('should reset page to 1 when setting group filter', () => {
      service.setPagination(5, 20);
      service.setGroupFilter('group-1', 'Enterprise');
      const state = service.getFilterState();
      
      expect(state.page).toBe(1);
    });

    it('should clear group filter', () => {
      service.setGroupFilter('group-1', 'Enterprise');
      service.clearFilter('group');
      const state = service.getFilterState();
      
      expect(state.groupId).toBeNull();
      expect(state.groupName).toBeNull();
    });
  });

  describe('Search Filter', () => {
    it('should set search filter', () => {
      service.setSearchFilter('test search');
      const state = service.getFilterState();
      
      expect(state.searchTerm).toBe('test search');
    });

    it('should reset page to 1 when setting search filter', () => {
      service.setPagination(5, 20);
      service.setSearchFilter('test');
      const state = service.getFilterState();
      
      expect(state.page).toBe(1);
    });

    it('should clear search filter', () => {
      service.setSearchFilter('test');
      service.clearFilter('search');
      const state = service.getFilterState();
      
      expect(state.searchTerm).toBeNull();
    });
  });

  describe('Status Filter', () => {
    it('should set status filter', () => {
      service.setStatusFilter('active');
      const state = service.getFilterState();
      
      expect(state.statusId).toBe('active');
    });

    it('should reset page to 1 when setting status filter', () => {
      service.setPagination(5, 20);
      service.setStatusFilter('active');
      const state = service.getFilterState();
      
      expect(state.page).toBe(1);
    });

    it('should clear status filter', () => {
      service.setStatusFilter('active');
      service.clearFilter('status');
      const state = service.getFilterState();
      
      expect(state.statusId).toBeNull();
    });
  });

  describe('Pagination', () => {
    it('should set pagination', () => {
      service.setPagination(3, 50);
      const state = service.getFilterState();
      
      expect(state.page).toBe(3);
      expect(state.limit).toBe(50);
    });

    it('should not reset page when setting pagination', () => {
      service.setPagination(5, 20);
      const state = service.getFilterState();
      
      expect(state.page).toBe(5);
    });
  });

  describe('Clear All Filters', () => {
    it('should clear all filters', () => {
      service.setGroupFilter('group-1', 'Enterprise');
      service.setSearchFilter('test');
      service.setStatusFilter('active');
      service.setPagination(5, 20);
      
      service.clearAllFilters();
      const state = service.getFilterState();
      
      expect(state.groupId).toBeNull();
      expect(state.groupName).toBeNull();
      expect(state.searchTerm).toBeNull();
      expect(state.statusId).toBeNull();
      expect(state.page).toBe(1);
      expect(state.limit).toBe(20);
    });
  });

  describe('Reset', () => {
    it('should reset to initial state', () => {
      service.setGroupFilter('group-1', 'Enterprise');
      service.setSearchFilter('test');
      service.setStatusFilter('active');
      service.setPagination(5, 20);
      
      service.reset();
      const state = service.getFilterState();
      
      expect(state.groupId).toBeNull();
      expect(state.groupName).toBeNull();
      expect(state.searchTerm).toBeNull();
      expect(state.statusId).toBeNull();
      expect(state.page).toBe(1);
      expect(state.limit).toBe(20);
    });
  });

  describe('Observable Stream', () => {
    it('should emit state changes', (done) => {
      let emissionCount = 0;
      
      service.filterState$.subscribe(state => {
        emissionCount++;
        if (emissionCount === 2) {
          expect(state.groupId).toBe('group-1');
          done();
        }
      });

      service.setGroupFilter('group-1', 'Enterprise');
    });

    it('should emit multiple state changes', (done) => {
      const states: FilterState[] = [];
      
      service.filterState$.subscribe(state => {
        states.push(state);
        if (states.length === 3) {
          expect(states[1].groupId).toBe('group-1');
          expect(states[2].searchTerm).toBe('test');
          done();
        }
      });

      service.setGroupFilter('group-1', 'Enterprise');
      service.setSearchFilter('test');
    });
  });

  describe('Multiple Filter Combinations', () => {
    it('should handle multiple filters simultaneously', () => {
      service.setGroupFilter('group-1', 'Enterprise');
      service.setSearchFilter('test');
      service.setStatusFilter('active');
      
      const state = service.getFilterState();
      
      expect(state.groupId).toBe('group-1');
      expect(state.searchTerm).toBe('test');
      expect(state.statusId).toBe('active');
    });

    it('should clear individual filter without affecting others', () => {
      service.setGroupFilter('group-1', 'Enterprise');
      service.setSearchFilter('test');
      service.setStatusFilter('active');
      
      service.clearFilter('group');
      const state = service.getFilterState();
      
      expect(state.groupId).toBeNull();
      expect(state.searchTerm).toBe('test');
      expect(state.statusId).toBe('active');
    });
  });
});
