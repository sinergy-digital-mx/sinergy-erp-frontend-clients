import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommunicationStatus } from '../models/lead-group.model';

/**
 * Filter State Service
 * Manages the state of filters for the leads table
 */
export interface FilterState {
  statusFilter: CommunicationStatus | null;
  groupFilter: string | null;
  groupName: string | null;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class FilterStateService {
  private readonly DEFAULT_STATE: FilterState = {
    statusFilter: null,
    groupFilter: null,
    groupName: null,
    page: 1,
    limit: 15,
  };

  private filterStateSubject = new BehaviorSubject<FilterState>(this.DEFAULT_STATE);
  public filterState$ = this.filterStateSubject.asObservable();

  constructor() {}

  /**
   * Get current filter state
   */
  getFilterState(): FilterState {
    return this.filterStateSubject.value;
  }

  /**
   * Set status filter
   */
  setStatusFilter(status: CommunicationStatus | null) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      statusFilter: status,
      page: 1, // Reset to first page when filter changes
    });
  }

  /**
   * Set group filter
   */
  setGroupFilter(groupId: string | null, groupName: string | null = null) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      groupFilter: groupId,
      groupName: groupName,
      page: 1, // Reset to first page when filter changes
    });
  }

  /**
   * Set pagination
   */
  setPagination(page: number, limit: number) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      page,
      limit,
    });
  }

  /**
   * Clear status filter
   */
  clearStatusFilter() {
    this.setStatusFilter(null);
  }

  /**
   * Clear group filter
   */
  clearGroupFilter() {
    this.setGroupFilter(null, null);
  }

  /**
   * Clear all filters
   */
  clearAllFilters() {
    this.filterStateSubject.next(this.DEFAULT_STATE);
  }

  /**
   * Check if any filter is active
   */
  hasActiveFilters(): boolean {
    const state = this.filterStateSubject.value;
    return state.statusFilter !== null || state.groupFilter !== null;
  }

  /**
   * Get filter query parameters for API
   */
  getFilterParams(): any {
    const state = this.filterStateSubject.value;
    const params: any = {
      page: state.page,
      limit: state.limit,
    };

    if (state.statusFilter === CommunicationStatus.CONTACTED) {
      params.email_contacted = true;
    } else if (state.statusFilter === CommunicationStatus.RESPONDED) {
      params.customer_answered = true;
    }

    if (state.groupFilter) {
      params.group_id = state.groupFilter;
    }

    return params;
  }

  /**
   * Reset to default state
   */
  reset() {
    this.filterStateSubject.next(this.DEFAULT_STATE);
  }
}
