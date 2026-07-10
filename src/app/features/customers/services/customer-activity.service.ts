import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CustomerActivity, ActivitySummary, CreateActivityRequest, UpdateActivityRequest } from '../models/customer-group.model';

export interface ActivitiesListResponse {
  activities: CustomerActivity[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ActivitiesListFilters {
  type?: string;
  status?: string;
  from_date?: string;
  to_date?: string;
  sort_by?: string;
  sort_order?: 'ASC' | 'DESC';
}

/**
 * CustomerActivityService
 * Handles all API calls related to customer activities
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerActivityService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Get activities for a customer
   */
  getActivities(
    customerId: number,
    page: number = 1,
    limit: number = 10,
    filters: ActivitiesListFilters = {}
  ): Observable<ActivitiesListResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (filters.type) params = params.set('type', filters.type);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.from_date) params = params.set('from_date', filters.from_date);
    if (filters.to_date) params = params.set('to_date', filters.to_date);
    if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
    if (filters.sort_order) params = params.set('sort_order', filters.sort_order);

    return this.http.get<any>(
      `${this.api}/tenant/customers/${customerId}/activities`,
      { params }
    ).pipe(
      map((response) => this.normalizeActivitiesResponse(response, page, limit)),
      retry(2),
      catchError((error) => {
        const status = error?.status ?? error?.originalError?.status;
        if (status === 403 && page === 1 && Object.keys(filters).length === 0) {
          return this.getActivitiesSimpleList(customerId).pipe(
            map((activities) => ({
              activities,
              total: activities.length,
              page: 1,
              totalPages: Math.max(1, Math.ceil(activities.length / limit)),
            }))
          );
        }
        return this.handleError(error);
      })
    );
  }

  /**
   * Listado simple (sin paginación) — usa permiso customers:Read.
   */
  getActivitiesSimpleList(customerId: number): Observable<CustomerActivity[]> {
    return this.http
      .get<any>(`${this.api}/tenant/customers/${customerId}/activities`)
      .pipe(
        map((response) => this.extractActivitiesArray(response)),
        catchError((error) => this.handleError(error))
      );
  }

  private extractActivitiesArray(response: unknown): CustomerActivity[] {
    if (Array.isArray(response)) {
      return response as CustomerActivity[];
    }
    if (response && typeof response === 'object') {
      const obj = response as Record<string, unknown>;
      const nested = obj['activities'] ?? obj['data'];
      if (Array.isArray(nested)) {
        return nested as CustomerActivity[];
      }
    }
    return [];
  }

  private normalizeActivitiesResponse(
    response: any,
    page: number,
    limit: number
  ): ActivitiesListResponse {
    if (Array.isArray(response)) {
      return {
        activities: response,
        total: response.length,
        page: 1,
        totalPages: Math.max(1, Math.ceil(response.length / limit)),
      };
    }

    const activities: CustomerActivity[] = this.extractActivitiesArray(response);
    const total = response?.total ?? activities.length;
    const totalPages = response?.totalPages ?? Math.max(1, Math.ceil(total / limit));

    return {
      activities,
      total,
      page: response?.page ?? page,
      totalPages,
    };
  }

  /**
   * Get activity summary for a customer
   */
  getActivitySummary(customerId: number): Observable<ActivitySummary> {
    return this.http.get<ActivitySummary>(
      `${this.api}/tenant/customers/${customerId}/activities/summary`
    ).pipe(
      retry(2),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Get a specific activity
   */
  getActivity(customerId: number, activityId: string): Observable<CustomerActivity> {
    return this.http.get<CustomerActivity>(
      `${this.api}/tenant/customers/${customerId}/activities/${activityId}`
    ).pipe(
      retry(2),
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Create a new activity
   */
  createActivity(customerId: number, request: CreateActivityRequest): Observable<CustomerActivity> {
    return this.http.post<CustomerActivity>(
      `${this.api}/tenant/customers/${customerId}/activities`,
      request
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Update an existing activity
   */
  updateActivity(customerId: number, activityId: string, request: UpdateActivityRequest): Observable<CustomerActivity> {
    return this.http.patch<CustomerActivity>(
      `${this.api}/tenant/customers/${customerId}/activities/${activityId}`,
      request
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Delete an activity
   */
  deleteActivity(customerId: number, activityId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.api}/tenant/customers/${customerId}/activities/${activityId}`
    ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any) {
    console.error('Activity API error:', error);
    
    let errorMessage = 'An error occurred';
    let errorType: 'network' | 'server' | 'validation' = 'network';

    if (error.status >= 500) {
      errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
      errorType = 'server';
    } else if (error.status >= 400) {
      errorMessage = error.error?.message || 'Error de validación. Por favor, verifica los datos.';
      errorType = 'validation';
    } else if (error.status === 0) {
      errorMessage = 'No se puede conectar. Por favor, verifica tu conexión a internet.';
      errorType = 'network';
    }

    return throwError(() => ({
      type: errorType,
      message: errorMessage,
      originalError: error
    }));
  }
}
