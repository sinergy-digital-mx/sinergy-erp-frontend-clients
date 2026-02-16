import { TestBed } from '@angular/core/testing';
import { FilterStateService } from './filter-state.service';
import { CommunicationStatus } from '../models/lead-group.model';

describe('FilterStateService', () => {
  let service: FilterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterStateService);
  });

  describe('Initial State', () => {
    it('should have default state on initialization', () => {
      const state = service.getFilterState();

      expect(state.statusFilter).toBeNull();
      expect(state.groupFilter).toBeNull();
      expect(state.page).toBe(1);
      expect(state.limit).toBe(15);
    });

    it('should not have active filters initially', () => {
      expect(service.hasActiveFilters()).toBe(false);
    });
  });

  describe('Status Filter Management', () => {
    it('should set status filter', () => {
      service.setStatusFilter(CommunicationStatus.CONTACTED);

      const state = service.getFilterState();
      expect(state.statusFilter).toBe(CommunicationStatus.CONTACTED);
    });

    it('should clear status filter', () => {
      service.setStatusFilter(CommunicationStatus.RESPONDED);
      service.clearStatusFilter();

      const state = service.getFilterState();
      expect(state.statusFilter).toBeNull();
    });

    it('should reset page to 1 when status filter changes', () => {
      service.setPagination(5, 15);
      service.setStatusFilter(CommunicationStatus.CONTACTED);

      const state = service.getFilterState();
      expect(state.page).toBe(1);
    });
  });

  describe('Group Filter Management', () => {
    it('should set group filter with ID and name', () => {
      service.setGroupFilter('group-1', 'Enterprise Clients');

      const state = service.getFilterState();
      expect(state.groupFilter).toBe('group-1');
      expect(state.groupName).toBe('Enterprise Clients');
    });

    it('should clear group filter', () => {
      service.setGroupFilter('group-1', 'Enterprise Clients');
      service.clearGroupFilter();

      const state = service.getFilterState();
      expect(state.groupFilter).toBeNull();
      expect(state.groupName).toBeNull();
    });

    it('should reset page to 1 when group filter changes', () => {
      service.setPagination(5, 15);
      service.setGroupFilter('group-1', 'Enterprise Clients');

      const state = service.getFilterState();
      expect(state.page).toBe(1);
    });
  });

  describe('Pagination Management', () => {
    it('should set pagination', () => {
      service.setPagination(3, 20);

      const state = service.getFilterState();
      expect(state.page).toBe(3);
      expect(state.limit).toBe(20);
    });

    it('should not reset page when setting pagination', () => {
      service.setPagination(5, 15);

      const state = service.getFilterState();
      expect(state.page).toBe(5);
    });
  });

  describe('Filter State Queries', () => {
    it('should detect active status filter', () => {
      service.setStatusFilter(CommunicationStatus.CONTACTED);

      expect(service.hasActiveFilters()).toBe(true);
    });

    it('should detect active group filter', () => {
      service.setGroupFilter('group-1', 'Enterprise Clients');

      expect(service.hasActiveFilters()).toBe(true);
    });

    it('should detect multiple active filters', () => {
      service.setStatusFilter(CommunicationStatus.RESPONDED);
      service.setGroupFilter('group-1', 'Enterprise Clients');

      expect(service.hasActiveFilters()).toBe(true);
    });

    it('should not detect active filters when none are set', () => {
      expect(service.hasActiveFilters()).toBe(false);
    });
  });

  describe('Filter Parameters for API', () => {
    it('should generate params for CONTACTED status filter', () => {
      service.setStatusFilter(CommunicationStatus.CONTACTED);

      const params = service.getFilterParams();
      expect(params.email_contacted).toBe(true);
      expect(params.customer_answered).toBeUndefined();
    });

    it('should generate params for RESPONDED status filter', () => {
      service.setStatusFilter(CommunicationStatus.RESPONDED);

      const params = service.getFilterParams();
      expect(params.customer_answered).toBe(true);
      expect(params.email_contacted).toBeUndefined();
    });

    it('should generate params for group filter', () => {
      service.setGroupFilter('group-1', 'Enterprise Clients');

      const params = service.getFilterParams();
      expect(params.group_id).toBe('group-1');
    });

    it('should generate params for combined filters', () => {
      service.setStatusFilter(CommunicationStatus.CONTACTED);
      service.setGroupFilter('group-1', 'Enterprise Clients');

      const params = service.getFilterParams();
      expect(params.email_contacted).toBe(true);
      expect(params.group_id).toBe('group-1');
    });

    it('should include pagination in params', () => {
      service.setPagination(2, 20);

      const params = service.getFilterParams();
      expect(params.page).toBe(2);
      expect(params.limit).toBe(20);
    });
  });

  describe('Clear All Filters', () => {
    it('should clear all filters and reset to default state', () => {
      service.setStatusFilter(CommunicationStatus.RESPONDED);
      service.setGroupFilter('group-1', 'Enterprise Clients');
      service.setPagination(5, 20);

      service.clearAllFilters();

      const state = service.getFilterState();
      expect(state.statusFilter).toBeNull();
      expect(state.groupFilter).toBeNull();
      expect(state.groupName).toBeNull();
      expect(state.page).toBe(1);
      expect(state.limit).toBe(15);
    });
  });

  describe('Reset', () => {
    it('should reset to default state', () => {
      service.setStatusFilter(CommunicationStatus.CONTACTED);
      service.setGroupFilter('group-1', 'Enterprise Clients');
      service.setPagination(3, 20);

      service.reset();

      const state = service.getFilterState();
      expect(state.statusFilter).toBeNull();
      expect(state.groupFilter).toBeNull();
      expect(state.page).toBe(1);
      expect(state.limit).toBe(15);
    });
  });

  describe('Observable Stream', () => {
    it('should emit state changes through observable', () => {
      return new Promise<void>((resolve) => {
        let emissionCount = 0;

        service.filterState$.subscribe((state) => {
          emissionCount++;
          if (emissionCount === 2) {
            expect(state.statusFilter).toBe(CommunicationStatus.CONTACTED);
            resolve();
          }
        });

        service.setStatusFilter(CommunicationStatus.CONTACTED);
      });
    });
  });
});
