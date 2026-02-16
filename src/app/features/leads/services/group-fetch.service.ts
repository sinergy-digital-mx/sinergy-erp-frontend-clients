import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LeadGroup } from '../models/lead-group.model';

/**
 * GroupFetchService
 * Handles fetching available groups from the API with caching and retry logic
 */
@Injectable({
  providedIn: 'root',
})
export class GroupFetchService {
  private api = environment.api;
  private groupsCache: LeadGroup[] | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private groupsSubject = new BehaviorSubject<LeadGroup[]>([]);
  public groups$ = this.groupsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Fetches all available groups from the API
   * Uses caching to avoid repeated requests
   * @returns Observable<LeadGroup[]> - Array of available groups
   * @throws Error if the API request fails
   */
  fetchGroups(): Observable<LeadGroup[]> {
    // Check if cache is still valid
    if (this.groupsCache && Date.now() < this.cacheExpiry) {
      return new Observable(observer => {
        observer.next(this.groupsCache!);
        observer.complete();
      });
    }

    return this.http.get<{ groups: LeadGroup[] }>(`${this.api}/lead-groups`).pipe(
      retry(2), // Retry up to 2 times on failure
      tap((response) => {
        // Handle both array and object responses
        const groups = Array.isArray(response) ? response : (response.groups || []);
        this.groupsCache = groups;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        this.groupsSubject.next(groups);
      }),
      map((response) => {
        // Extract groups array from response
        return Array.isArray(response) ? response : (response.groups || []);
      }),
      catchError((error) => {
        console.error('Error fetching groups:', error);
        
        // Determine error type
        let errorMessage = 'Failed to fetch groups. Please try again.';
        let errorType: 'network' | 'server' | 'validation' = 'network';

        if (error.status >= 500) {
          errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
          errorType = 'server';
        } else if (error.status >= 400) {
          errorMessage = 'Error de validación. Por favor, verifica los datos.';
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
      })
    );
  }

  /**
   * Invalidate the cache to force a fresh fetch
   */
  invalidateCache(): void {
    this.groupsCache = null;
    this.cacheExpiry = 0;
  }

  /**
   * Get cached groups synchronously
   */
  getCachedGroups(): LeadGroup[] {
    return this.groupsCache || [];
  }
}
