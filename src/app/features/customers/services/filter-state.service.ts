import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FilterState {
  groupId: string | null;
  groupName: string | null;
  searchTerm: string | null;
  statusId: string | null;
  page: number;
  limit: number;
}

/**
 * FilterStateService
 * Manages the state of filters for the customers table
 */
@Injectable({
  providedIn: 'root',
})
export class FilterStateService {
  private initialState: FilterState = {
    groupId: null,
    groupName: null,
    searchTerm: null,
    statusId: null,
    page: 1,
    limit: 20,
  };

  private filterStateSubject = new BehaviorSubject<FilterState>(this.initialState);
  public filterState$ = this.filterStateSubject.asObservable();

  constructor() {}

  /**
   * Get current filter state
   */
  getFilterState(): FilterState {
    return this.filterStateSubject.value;
  }

  /**
   * Set group filter
   */
  setGroupFilter(groupId: string | null, groupName: string | null) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      groupId,
      groupName,
      page: 1, // Reset to page 1 when filter changes
    });
  }

  /**
   * Set search filter
   */
  setSearchFilter(searchTerm: string | null) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      searchTerm,
      page: 1, // Reset to page 1 when filter changes
    });
  }

  /**
   * Set status filter
   */
  setStatusFilter(statusId: string | null) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentState,
      statusId,
      page: 1, // Reset to page 1 when filter changes
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
   * Clear specific filter
   */
  clearFilter(filterType: 'group' | 'search' | 'status') {
    const currentState = this.filterStateSubject.value;
    const newState = { ...currentState, page: 1 };

    switch (filterType) {
      case 'group':
        newState.groupId = null;
        newState.groupName = null;
        break;
      case 'search':
        newState.searchTerm = null;
        break;
      case 'status':
        newState.statusId = null;
        break;
    }

    this.filterStateSubject.next(newState);
  }

  /**
   * Clear all filters
   */
  clearAllFilters() {
    this.filterStateSubject.next(this.initialState);
  }

  /**
   * Reset to initial state
   */
  reset() {
    this.filterStateSubject.next(this.initialState);
  }
}
