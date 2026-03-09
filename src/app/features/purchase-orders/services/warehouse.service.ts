import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Warehouse } from '../models/warehouse.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private readonly baseUrl = `${environment.api}/tenant/warehouses`;
  private warehousesCache$ = new BehaviorSubject<Warehouse[] | null>(null);
  private cacheTimestamp = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) {}

  /**
   * Get all warehouses
   */
  getWarehouses(): Observable<Warehouse[]> {
    const now = Date.now();
    const cached = this.warehousesCache$.value;

    if (cached && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
      return of(cached);
    }

    return this.http.get<Warehouse[]>(this.baseUrl).pipe(
      tap(warehouses => {
        this.warehousesCache$.next(warehouses);
        this.cacheTimestamp = now;
      })
    );
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.warehousesCache$.next(null);
    this.cacheTimestamp = 0;
  }
}
