import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface CatalogItem {
  id: string;
  code: string;
  name: string;
  type: string;
  value?: string;
  catalog_type?: string;
  description?: string | null;
  metadata?: Record<string, any>;
  is_active?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = `${environment.api}/tenant/catalogs`;

  constructor(private http: HttpClient) {}

  /**
   * Get all catalogs
   */
  getAllCatalogs(): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(this.apiUrl).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Get catalogs by type
   */
  getCatalogsByType(type: string): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(`${this.apiUrl}?type=${type}`).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Get catalog by specific type
   */
  getCatalogByType(type: string): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(`${this.apiUrl}/by-type?type=${type}`).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Search catalogs
   */
  searchCatalogs(type: string, query: string): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(`${this.apiUrl}/search?type=${type}&q=${query}`).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Get phone countries
   */
  getPhoneCountries(): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(`${this.apiUrl}/phone-countries`).pipe(
      catchError(() => of([]))
    );
  }

  /**
   * Get phone codes
   */
  getPhoneCodes(): Observable<CatalogItem[]> {
    return this.getCatalogByType('phone_code');
  }
}
