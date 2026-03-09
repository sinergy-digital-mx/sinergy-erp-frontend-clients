import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Vendor } from '../models/vendor.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private readonly baseUrl = `${environment.api}/tenant/vendors`;
  private vendorsCache$ = new BehaviorSubject<Vendor[] | null>(null);
  private cacheTimestamp = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) {}

  /**
   * Get all active vendors
   */
  getVendors(): Observable<Vendor[]> {
    const now = Date.now();
    const cached = this.vendorsCache$.value;

    if (cached && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
      return of(cached);
    }

    return this.http.get<Vendor[]>(this.baseUrl).pipe(
      tap(vendors => {
        this.vendorsCache$.next(vendors);
        this.cacheTimestamp = now;
      })
    );
  }

  /**
   * Search vendors by name or code
   */
  searchVendors(query: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.baseUrl, {
      params: { search: query }
    });
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.vendorsCache$.next(null);
    this.cacheTimestamp = 0;
  }
}
