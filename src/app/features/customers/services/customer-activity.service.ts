import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CustomerActivity, ActivitySummary, CreateActivityRequest, UpdateActivityRequest } from '../models/customer-group.model';

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
  getActivities(customerId: number, page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(
      `${this.api}/tenant/customers/${customerId}/activities`,
      {
        params: { page, limit }
      }
    ).pipe(
      retry(2),
      catchError(error => this.handleError(error))
    );
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
