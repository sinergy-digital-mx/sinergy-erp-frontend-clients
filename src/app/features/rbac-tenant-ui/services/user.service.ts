import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import {
  User,
  Role,
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  ManagerReport,
  ManagerReportsResponse,
  AddManagerReportResponse,
  CatalogStatus,
  UserListQuery,
} from '../models';
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
  private statusesCache: CatalogStatus[] | null = null;
  private api = environment.api;

  constructor(private http: HttpClient, private dataMapper: DataMapperService) {}

  /**
   * Catálogo de estatus (active / inactive / deleted). Se carga una vez.
   */
  getUserStatuses(): Observable<CatalogStatus[]> {
    if (this.statusesCache) {
      return of(this.statusesCache);
    }

    return this.http.get<any>(`${this.api}/tenant/users/statuses`).pipe(
      map((res) => {
        const list = Array.isArray(res) ? res : res?.data ?? res?.statuses ?? [];
        return (Array.isArray(list) ? list : []) as CatalogStatus[];
      }),
      tap((statuses) => {
        this.statusesCache = statuses;
      })
    );
  }

  /**
   * Lista usuarios. Sin status_id no incluye eliminados.
   */
  listUsers(query?: UserListQuery): Observable<User[]> {
    const params = this.buildUserListParams(query);
    const unfiltered = this.isUnfilteredQuery(query);

    return this.http.get<any>(`${this.api}/tenant/users`, { params }).pipe(
      map((backendUsers) => this.dataMapper.mapUsers(backendUsers)),
      tap((users) => {
        if (unfiltered) {
          this.usersCache$.next(users);
        }
      })
    );
  }

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

    return this.listUsers();
  }

  /**
   * Fetches users bypassing cache (always hits API).
   */
  refreshUsers(query?: UserListQuery): Observable<User[]> {
    this.clearCache();
    return this.listUsers(query);
  }

  /**
   * Cambia Activo / Inactivo. No usar para deleted (eso es DELETE).
   */
  updateUserStatus(
    userId: string,
    statusId: number
  ): Observable<{ message: string; user: User }> {
    return this.http
      .put<any>(`${this.api}/tenant/users/${userId}/status`, { status_id: statusId })
      .pipe(
        map((res) => {
          const data = res?.data ?? res;
          const rawUser = data?.user ?? data;
          return {
            message: data?.message || 'Estatus actualizado',
            user: this.dataMapper.mapUser(rawUser),
          };
        }),
        tap(() => this.clearCache())
      );
  }

  /**
   * Soft delete: pasa el usuario a deleted.
   */
  deleteUser(userId: string): Observable<{ message: string; user: User }> {
    return this.http.delete<any>(`${this.api}/tenant/users/${userId}`).pipe(
      map((res) => {
        const data = res?.data ?? res;
        const rawUser = data?.user ?? data;
        return {
          message: data?.message || 'Usuario eliminado',
          user: rawUser?.id ? this.dataMapper.mapUser(rawUser) : (rawUser as User),
        };
      }),
      tap(() => this.clearCache())
    );
  }

  private buildUserListParams(query?: UserListQuery): HttpParams {
    let params = new HttpParams();
    const search = query?.search?.trim();
    if (search) {
      params = params.set('search', search);
    }
    if (query?.status_id != null) {
      params = params.set('status_id', String(query.status_id));
    }
    if (query?.role_id) {
      params = params.set('role_id', query.role_id);
    }
    return params;
  }

  private isUnfilteredQuery(query?: UserListQuery): boolean {
    if (!query) {
      return true;
    }
    return !query.search?.trim() && query.status_id == null && !query.role_id;
  }

  /**
   * Fetches all roles assigned to a specific user
   * @param userId - The ID of the user
   * @returns Observable<Role[]> - Array of roles assigned to the user
   */
  getUserRoles(userId: string): Observable<Role[]> {
    return this.http.get<any>(`${this.api}/tenant/users/${userId}/roles`).pipe(
      map(backendRoles => this.dataMapper.mapRoles(backendRoles))
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
  createUser(userData: CreateUserDto): Observable<User | null> {
    return this.http.post<any>(`${this.api}/tenant/users`, userData).pipe(
      map((backendUser) => {
        const raw = backendUser?.data ?? backendUser;
        if (!raw?.id) {
          return null;
        }
        return this.dataMapper.mapUser(raw);
      }),
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
  updateUser(userId: string, userData: UpdateUserDto): Observable<User> {
    return this.http.put<any>(`${this.api}/tenant/users/${userId}`, userData).pipe(
      map(backendUser => this.dataMapper.mapUser(backendUser)),
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Fetches a single user by ID (includes is_employee, is_manager, manager y reports).
   */
  getUserById(userId: string): Observable<User> {
    return this.http.get<any>(`${this.api}/tenant/users/${userId}`).pipe(
      map(backendUser => this.dataMapper.mapUser(backendUser?.data ?? backendUser))
    );
  }

  /**
   * Lista de usuarios a cargo de un gerente.
   * GET /tenant/users/:userId/reports
   */
  getManagerReports(userId: string): Observable<ManagerReportsResponse> {
    return this.http.get<any>(`${this.api}/tenant/users/${userId}/reports`).pipe(
      map((res) => {
        const data = res?.data ?? res;
        const reports: ManagerReport[] = Array.isArray(data?.reports) ? data.reports : [];
        return {
          is_manager: !!(data?.is_manager),
          reports,
        };
      })
    );
  }

  /**
   * Asigna un usuario a cargo del gerente.
   * POST /tenant/users/:userId/reports { user_id }
   */
  addManagerReport(userId: string, reportUserId: string): Observable<AddManagerReportResponse> {
    return this.http
      .post<any>(`${this.api}/tenant/users/${userId}/reports`, { user_id: reportUserId })
      .pipe(
        map((res) => {
          const data = res?.data ?? res;
          return {
            message: data?.message || 'Usuario asignado al gerente',
            report: (data?.report ?? data) as ManagerReport,
          };
        }),
        tap(() => this.clearCache())
      );
  }

  /**
   * Quita un usuario a cargo del gerente.
   * DELETE /tenant/users/:userId/reports/:reportUserId
   */
  removeManagerReport(userId: string, reportUserId: string): Observable<{ message: string }> {
    return this.http
      .delete<any>(`${this.api}/tenant/users/${userId}/reports/${reportUserId}`)
      .pipe(
        map((res) => {
          const data = res?.data ?? res;
          return { message: data?.message || 'Usuario desasignado del gerente' };
        }),
        tap(() => this.clearCache())
      );
  }

  getUserBranch(userId: string): Observable<string | null> {
    return this.http.get<{ billing_branch_id?: string | null }>(`${this.api}/tenant/users/${userId}/branch`).pipe(
      map((response) => response?.billing_branch_id ?? null)
    );
  }

  updateUserBranch(userId: string, billingBranchId: string | null): Observable<void> {
    return this.http.put<void>(`${this.api}/tenant/users/${userId}/branch`, {
      billing_branch_id: billingBranchId
    }).pipe(
      tap(() => this.clearCache()),
      shareReplay(1)
    );
  }

  /**
   * Reemplaza almacenes de Mesa de Control.
   * PUT /tenant/users/:userId/warehouses { warehouse_ids }
   */
  updateUserWarehouses(userId: string, warehouseIds: string[]): Observable<User> {
    return this.http
      .put<any>(`${this.api}/tenant/users/${userId}/warehouses`, {
        warehouse_ids: warehouseIds,
      })
      .pipe(
        map((res) => this.dataMapper.mapUser(res?.data ?? res?.user ?? res)),
        tap(() => this.clearCache())
      );
  }

  /**
   * Cambia la contraseña propia, o la de cualquier usuario si hay User:Reset_Password.
   * No enviar password en updateUser.
   */
  changePassword(userId: string, payload: ChangePasswordDto): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.api}/tenant/users/${userId}/password`,
      payload
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
