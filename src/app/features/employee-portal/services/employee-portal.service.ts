import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  CreateLeaveRequestDto,
  Employee,
  LeaveRequest,
} from '../../employees/models/employee.model';

/**
 * Payload for the employee self-service profile update (name / password).
 */
export interface UpdateOwnProfileDto {
  first_name?: string;
  last_name?: string;
  current_password?: string;
  new_password?: string;
}

/**
 * EmployeePortalService
 *
 * Self-service endpoints for the logged-in employee. These live under the
 * `/tenant/employees/me` namespace (the authenticated employee resolves their
 * own profile server-side), plus `/tenant/users/me` for name/password changes.
 */
@Injectable({ providedIn: 'root' })
export class EmployeePortalService {
  private readonly employeesBase = `${environment.api}/tenant/employees`;
  private readonly usersBase = `${environment.api}/tenant/users`;

  constructor(private http: HttpClient) {}

  /** The logged-in employee's own profile (vacation + payroll + photo). */
  getMyProfile(): Observable<Employee> {
    return this.http
      .get<Employee | { data: Employee }>(`${this.employeesBase}/me`)
      .pipe(
        map((raw) => this.unwrap<Employee>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  /** The logged-in employee's leave requests. */
  getMyLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http
      .get<LeaveRequest[] | { data: LeaveRequest[] }>(
        `${this.employeesBase}/me/leave-requests`
      )
      .pipe(
        map((raw) => this.unwrapArray<LeaveRequest>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  /** Submit a new leave request for the logged-in employee. */
  createMyLeaveRequest(payload: CreateLeaveRequestDto): Observable<LeaveRequest> {
    return this.http
      .post<LeaveRequest | { data: LeaveRequest }>(
        `${this.employeesBase}/me/leave-requests`,
        payload
      )
      .pipe(
        map((raw) => this.unwrap<LeaveRequest>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  /** Cancel one of the logged-in employee's pending requests. */
  cancelMyLeaveRequest(requestId: string): Observable<LeaveRequest> {
    return this.http
      .put<LeaveRequest | { data: LeaveRequest }>(
        `${this.employeesBase}/me/leave-requests/${requestId}/cancel`,
        {}
      )
      .pipe(
        map((raw) => this.unwrap<LeaveRequest>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  /** Update own name and/or password. */
  updateMyProfile(payload: UpdateOwnProfileDto): Observable<void> {
    return this.http
      .put<void>(`${this.usersBase}/me`, payload)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private unwrap<T>(raw: T | { data: T }): T {
    if (raw && typeof raw === 'object' && 'data' in (raw as object)) {
      return (raw as { data: T }).data;
    }
    return raw as T;
  }

  private unwrapArray<T>(raw: T[] | { data: T[] }): T[] {
    if (Array.isArray(raw)) {
      return raw;
    }
    if (raw && typeof raw === 'object' && Array.isArray((raw as { data?: T[] }).data)) {
      return (raw as { data: T[] }).data;
    }
    return [];
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message: string;
    switch (error.status) {
      case 401:
        message = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
        break;
      case 403:
        message = 'No tienes acceso al portal de empleado';
        break;
      case 404:
        message = 'No encontramos tu perfil de empleado';
        break;
      case 400:
      case 422:
        message = error.error?.message || 'Datos inválidos. Verifica la información.';
        break;
      case 0:
        message = 'Error de conexión. Verifica tu conexión a internet';
        break;
      default:
        message = error.error?.message || 'Ha ocurrido un error inesperado';
    }
    return throwError(() => new Error(message));
  }
}
