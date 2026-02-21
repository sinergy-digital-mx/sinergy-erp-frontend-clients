import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { User, Role, Module, UserStatus } from '../models';

/**
 * StateService
 * Centralized RxJS-based state management for the RBAC Tenant UI
 * Manages users, roles, modules, and filter states
 */
@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Core data subjects
  private usersSubject = new BehaviorSubject<User[]>([]);
  private rolesSubject = new BehaviorSubject<Role[]>([]);
  private modulesSubject = new BehaviorSubject<Module[]>([]);

  // Selection subjects
  private selectedUserIdSubject = new BehaviorSubject<string | null>(null);
  private selectedRoleIdSubject = new BehaviorSubject<string | null>(null);

  // Filter subjects
  private userSearchFilterSubject = new BehaviorSubject<string>('');
  private userStatusFilterSubject = new BehaviorSubject<UserStatus | 'all'>('all');
  private roleSearchFilterSubject = new BehaviorSubject<string>('');

  // Custom comparator for arrays - compares id and permission_count to detect updates
  private arrayComparator = (prev: any[], curr: any[]): boolean => {
    if (prev.length !== curr.length) return false;
    return prev.every((item, index) => 
      item.id === curr[index].id && 
      item.permission_count === curr[index].permission_count
    );
  };

  // Public observables for core data
  public users$ = this.usersSubject.asObservable().pipe(
    distinctUntilChanged(this.arrayComparator)
  );
  public roles$ = this.rolesSubject.asObservable().pipe(
    distinctUntilChanged(this.arrayComparator)
  );
  public modules$ = this.modulesSubject.asObservable().pipe(
    distinctUntilChanged(this.arrayComparator)
  );

  // Public observables for selections
  public selectedUserId$ = this.selectedUserIdSubject.asObservable().pipe(distinctUntilChanged());
  public selectedRoleId$ = this.selectedRoleIdSubject.asObservable().pipe(distinctUntilChanged());

  // Public observables for filters
  public userSearchFilter$ = this.userSearchFilterSubject.asObservable().pipe(distinctUntilChanged());
  public userStatusFilter$ = this.userStatusFilterSubject.asObservable().pipe(distinctUntilChanged());
  public roleSearchFilter$ = this.roleSearchFilterSubject.asObservable().pipe(distinctUntilChanged());

  // Filtered users observable - combines users with search and status filters
  public filteredUsers$: Observable<User[]> = combineLatest([
    this.users$,
    this.userSearchFilter$,
    this.userStatusFilter$
  ]).pipe(
    map(([users, searchFilter, statusFilter]) => {
      return users.filter(user => {
        const matchesSearch = searchFilter === '' || 
          user.email.toLowerCase().includes(searchFilter.toLowerCase());
        
        // Normalize status for comparison
        const userStatus = typeof user.status === 'string' ? user.status : 
                          (user.status && typeof user.status === 'object' && user.status.code) ? user.status.code : 'active';
        
        const matchesStatus = statusFilter === 'all' || userStatus === statusFilter;
        return matchesSearch && matchesStatus;
      });
    }),
    distinctUntilChanged((prev, curr) => {
      if (prev.length !== curr.length) return false;
      return prev.every((item, index) => item.id === curr[index].id);
    })
  );

  // Filtered roles observable - combines roles with search filter
  public filteredRoles$: Observable<Role[]> = combineLatest([
    this.roles$,
    this.roleSearchFilter$
  ]).pipe(
    map(([roles, searchFilter]) => {
      return roles.filter(role => {
        return searchFilter === '' || 
          role.name.toLowerCase().includes(searchFilter.toLowerCase());
      });
    }),
    distinctUntilChanged((prev, curr) => {
      if (prev.length !== curr.length) return false;
      return prev.every((item, index) => 
        item.id === curr[index].id && 
        item.permission_count === curr[index].permission_count
      );
    })
  );

  constructor() {}

  // User management methods
  selectUser(userId: string): void {
    this.selectedUserIdSubject.next(userId);
  }

  clearUserSelection(): void {
    this.selectedUserIdSubject.next(null);
  }

  setUserSearchFilter(filter: string): void {
    this.userSearchFilterSubject.next(filter);
  }

  setUserStatusFilter(status: UserStatus | 'all'): void {
    this.userStatusFilterSubject.next(status);
  }

  updateUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  // Role management methods
  selectRole(roleId: string): void {
    this.selectedRoleIdSubject.next(roleId);
  }

  clearRoleSelection(): void {
    this.selectedRoleIdSubject.next(null);
  }

  setRoleSearchFilter(filter: string): void {
    this.roleSearchFilterSubject.next(filter);
  }

  updateRoles(roles: Role[]): void {
    this.rolesSubject.next(roles);
  }

  // Module management methods
  updateModules(modules: Module[]): void {
    this.modulesSubject.next(modules);
  }

  // Utility methods
  resetFilters(): void {
    this.userSearchFilterSubject.next('');
    this.userStatusFilterSubject.next('all');
    this.roleSearchFilterSubject.next('');
  }

  resetSelections(): void {
    this.selectedUserIdSubject.next(null);
    this.selectedRoleIdSubject.next(null);
  }
}
