import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import { User, Role } from '../models';
import { environment } from '../../../../environments/environment';
import { DataMapperService } from './data-mapper.service';

/**
 * UserService
 * Handles user-related API calls and caching
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCache$ = new BehaviorSubject<User[] | null>(null);
  private api = environment.api;

  constructor(private http: HttpClient, private dataMapper: DataMapperService) {}

  /**
   * Fetches all users for the current tenant
   * Implements in-memory caching to avoid redundant API calls
   * @returns Observable<User[]> - Array of users
   */
  getUsers(): Observable<User[]> {
    if (this.usersCache$.value) {
      return new Observable(observer => {
        observer.next(this.usersCache$.value!);
        observer.complete();
      });
    }

    return this.http.get<any>(`${this.api}/tenant/users`).pipe(
      map(backendUsers => this.dataMapper.mapUsers(backendUsers)),
      tap(users => this.usersCache$.next(users)),
      shareReplay(1)
    );
  }

  /**
   * Fetches all roles assigned to a specific user
   * @param userId - The ID of the user
   * @returns Observable<Role[]> - Array of roles assigned to the user
   */
  getUserRoles(userId: string): Observable<Role[]> {
    return this.http.get<any>(`${this.api}/tenant/users/${userId}/roles`).pipe(
      map(backendRoles => this.dataMapper.mapRoles(backendRoles)),
      shareReplay(1)
    );
  }

  /**
   * Assigns a role to a user
   * @param userId - The ID of the user
   * @param roleId - The ID of the role to assign
   * @returns Observable<void>
   */
  assignRoleToUser(userId: string, roleId: string): Observable<void> {
    return this.http.post<void>(`${this.api}/tenant/users/${userId}/roles/${roleId}`, {}).pipe(
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Replaces a user's existing role with a new role
   * @param userId - The ID of the user
   * @param oldRoleId - The ID of the role to replace
   * @param newRoleId - The ID of the new role
   * @returns Observable<void>
   */
  replaceUserRole(userId: string, oldRoleId: string, newRoleId: string): Observable<void> {
    return this.http.put<void>(`${this.api}/tenant/users/${userId}/roles/${oldRoleId}`, { new_role_id: newRoleId }).pipe(
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Deletes a role from a user
   * @param userId - The ID of the user
   * @param roleId - The ID of the role to delete
   * @returns Observable<void>
   */
  deleteRoleFromUser(userId: string, roleId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/users/${userId}/roles/${roleId}`).pipe(
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Creates a new user
   * @param userData - The user data to create
   * @returns Observable<void>
   */
  createUser(userData: any): Observable<void> {
    return this.http.post<void>(`${this.api}/tenant/users`, userData).pipe(
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Updates an existing user
   * @param userId - The ID of the user to update
   * @param userData - The user data to update
   * @returns Observable<User>
   */
  updateUser(userId: string, userData: any): Observable<User> {
    return this.http.put<any>(`${this.api}/tenant/users/${userId}`, userData).pipe(
      map(backendUser => this.dataMapper.mapUser(backendUser)),
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Clears the user cache
   * Useful for forcing a refresh of user data
   */
  clearCache(): void {
    this.usersCache$.next(null);
  }
}
