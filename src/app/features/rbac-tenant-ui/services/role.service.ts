import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import { Role, RoleDefinition } from '../models';
import { environment } from '../../../../environments/environment';
import { DataMapperService } from './data-mapper.service';

/**
 * RoleService
 * Handles role-related API calls and caching
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private rolesCache$ = new BehaviorSubject<Role[] | null>(null);
  private api = environment.api;

  constructor(private http: HttpClient, private dataMapper: DataMapperService) {}

  /**
   * Fetches all roles for the current tenant
   * Implements in-memory caching to avoid redundant API calls
   * @returns Observable<Role[]> - Array of roles
   */
  getRoles(): Observable<Role[]> {
    if (this.rolesCache$.value) {
      return new Observable(observer => {
        observer.next(this.rolesCache$.value!);
        observer.complete();
      });
    }

    return this.http.get<any>(`${this.api}/tenant/roles`).pipe(
      map(backendRoles => this.dataMapper.mapRoles(backendRoles)),
      tap(roles => this.rolesCache$.next(roles)),
      shareReplay(1)
    );
  }

  /**
   * Fetches a specific role by ID
   * @param roleId - The ID of the role
   * @returns Observable<Role> - The role details
   */
  getRoleById(roleId: string): Observable<Role> {
    return this.http.get<any>(`${this.api}/tenant/roles/${roleId}`).pipe(
      map(backendRole => this.dataMapper.mapRole(backendRole)),
      shareReplay(1)
    );
  }

  /**
   * Creates a new role with the specified definition
   * @param roleDefinition - The role definition containing name, description, and permissions
   * @returns Observable<Role> - The created role
   */
  createRole(roleDefinition: RoleDefinition): Observable<Role> {
    return this.http.post<any>(`${this.api}/tenant/roles`, roleDefinition).pipe(
      map(backendRole => this.dataMapper.mapRole(backendRole)),
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Updates an existing role with new definition
   * @param roleId - The ID of the role to update
   * @param roleDefinition - The updated role definition
   * @returns Observable<Role> - The updated role
   */
  updateRole(roleId: string, roleDefinition: RoleDefinition): Observable<Role> {
    return this.http.put<any>(`${this.api}/tenant/roles/${roleId}`, roleDefinition).pipe(
      map(backendRole => this.dataMapper.mapRole(backendRole)),
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Updates role permissions specifically
   * @param roleId - The ID of the role to update
   * @param permissionIds - Array of permission IDs to assign to the role
   * @returns Observable<Role> - The updated role
   */
  updateRolePermissions(roleId: string, permissionIds: string[]): Observable<Role> {
    return this.http.put<any>(`${this.api}/tenant/roles/${roleId}`, { 
      permission_ids: permissionIds 
    }).pipe(
      map(backendRole => this.dataMapper.mapRole(backendRole)),
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Deletes a role
   * @param roleId - The ID of the role to delete
   * @returns Observable<void>
   */
  deleteRole(roleId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/roles/${roleId}`).pipe(
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Fetches users assigned to a specific role
   * @param roleId - The ID of the role
   * @returns Observable with users assigned to the role
   */
  getRoleUsers(roleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/tenant/roles/${roleId}/users`).pipe(
      shareReplay(1)
    );
  }

  /**
   * Fetches available permissions for a specific role with assignment status
   * @param roleId - The ID of the role
   * @returns Observable with role and modules with permissions and their assignment status
   */
  getRolePermissionsAvailable(roleId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/tenant/roles/${roleId}/permissions/available`).pipe(
      shareReplay(1)
    );
  }

  /**
   * Fetches available permissions organized by modules for the tenant
   * @returns Observable with modules and their available permissions
   */
  getAvailablePermissions(): Observable<any> {
    return this.http.get<any>(`${this.api}/tenant/roles/permissions/available`).pipe(
      shareReplay(1)
    );
  }

  /**
   * Fetches role summary statistics
   * @returns Observable with role statistics and summary
   */
  getRoleSummary(): Observable<any> {
    return this.http.get<any>(`${this.api}/tenant/roles/summary/counts`).pipe(
      shareReplay(1)
    );
  }

  /**
   * Clears the role cache
   * Useful for forcing a refresh of role data
   */
  clearCache(): void {
    this.rolesCache$.next(null);
  }
}
