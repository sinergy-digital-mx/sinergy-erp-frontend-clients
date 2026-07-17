import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  CreateLeaveRequestDto,
  Employee,
  EmployeeFilters,
  LeaveRequest,
  LeaveRequestFilters,
  PaginatedResponse,
  PaginationParams,
  ReviewLeaveRequestDto,
} from '../models/employee.model';

/**
 * EmployeeService
 * Handles all `/tenant/employees` API calls for the RH module.
 */
@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly baseUrl = `${environment.api}/tenant/employees`;

  constructor(private http: HttpClient) {}

  /**
   * Paginated employee list with the vacation summary and request counts.
   */
  getEmployees(
    filters: EmployeeFilters,
    pagination: PaginationParams
  ): Observable<PaginatedResponse<Employee>> {
    let params = new HttpParams()
      .set('page', String(pagination.page))
      .set('limit', String(pagination.limit));

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    if (filters.department) {
      params = params.set('department', filters.department);
    }

    return this.http
      .get<PaginatedResponse<Employee>>(this.baseUrl, { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Full employee detail, including `leave_requests` history.
   */
  getEmployeeById(id: string): Observable<Employee> {
    return this.http
      .get<Employee | { data: Employee }>(`${this.baseUrl}/${id}`)
      .pipe(
        map((raw) => this.unwrap<Employee>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Optional direct creation of an employee profile from a user_id.
   * (The primary path is the "Empleado" tab of the user modal.)
   */
  createEmployee(payload: Record<string, unknown>): Observable<Employee> {
    return this.http
      .post<Employee | { data: Employee }>(this.baseUrl, payload)
      .pipe(
        map((raw) => this.unwrap<Employee>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Uploads / replaces the employee photo. Returns the fresh signed URL.
   */
  uploadPhoto(id: string, file: File): Observable<{ photo_url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<{ photo_url: string } | { data: { photo_url: string } }>(
        `${this.baseUrl}/${id}/photo`,
        formData
      )
      .pipe(
        map((raw) => this.unwrap<{ photo_url: string }>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  // ── Leave requests (vacaciones / faltas) ──────────────────────────────────

  /**
   * RH view: every leave request across all employees.
   */
  getAllLeaveRequests(
    filters: LeaveRequestFilters,
    pagination: PaginationParams
  ): Observable<PaginatedResponse<LeaveRequest>> {
    let params = new HttpParams()
      .set('page', String(pagination.page))
      .set('limit', String(pagination.limit));

    if (filters.status) {
      params = params.set('status', filters.status);
    }
    if (filters.type) {
      params = params.set('type', filters.type);
    }

    return this.http
      .get<PaginatedResponse<LeaveRequest>>(
        `${this.baseUrl}/leave-requests/all`,
        { params }
      )
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Leave requests for a single employee.
   */
  getEmployeeLeaveRequests(id: string): Observable<LeaveRequest[]> {
    return this.http
      .get<LeaveRequest[] | { data: LeaveRequest[] }>(
        `${this.baseUrl}/${id}/leave-requests`
      )
      .pipe(
        map((raw) => this.unwrapArray<LeaveRequest>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Registers a leave request on behalf of an employee (RH).
   */
  createLeaveRequest(
    id: string,
    payload: CreateLeaveRequestDto
  ): Observable<LeaveRequest> {
    return this.http
      .post<LeaveRequest | { data: LeaveRequest }>(
        `${this.baseUrl}/${id}/leave-requests`,
        payload
      )
      .pipe(
        map((raw) => this.unwrap<LeaveRequest>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Approve / reject a leave request.
   */
  reviewLeaveRequest(
    requestId: string,
    payload: ReviewLeaveRequestDto
  ): Observable<LeaveRequest> {
    return this.http
      .put<LeaveRequest | { data: LeaveRequest }>(
        `${this.baseUrl}/leave-requests/${requestId}/review`,
        payload
      )
      .pipe(
        map((raw) => this.unwrap<LeaveRequest>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Cancel a pending leave request.
   */
  cancelLeaveRequest(requestId: string): Observable<LeaveRequest> {
    return this.http
      .put<LeaveRequest | { data: LeaveRequest }>(
        `${this.baseUrl}/leave-requests/${requestId}/cancel`,
        {}
      )
      .pipe(
        map((raw) => this.unwrap<LeaveRequest>(raw)),
        catchError((error) => this.handleError(error))
      );
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

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
        message = 'No tienes permisos para realizar esta acción';
        break;
      case 404:
        message = 'Empleado no encontrado';
        break;
      case 409:
        message = error.error?.message || 'El registro ya existe o hay un conflicto';
        break;
      case 422:
        message = this.extractValidationErrors(error);
        break;
      case 400:
        message = error.error?.message || 'Datos inválidos. Verifica la información.';
        break;
      case 500:
        message = 'Error del servidor. Por favor, intenta más tarde';
        break;
      case 0:
        message = 'Error de conexión. Verifica tu conexión a internet';
        break;
      default:
        message = error.error?.message || 'Ha ocurrido un error inesperado';
    }
    return throwError(() => new Error(message));
  }

  private extractValidationErrors(error: HttpErrorResponse): string {
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat();
      return errors.join(', ');
    }
    return error.error?.message || 'Error de validación. Verifica los datos ingresados.';
  }
}
