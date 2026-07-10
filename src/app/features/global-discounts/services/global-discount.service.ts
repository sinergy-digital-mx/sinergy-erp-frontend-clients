import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreateGlobalDiscountDto,
  GlobalDiscount,
  UpdateGlobalDiscountDto,
} from '../models/global-discount.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalDiscountService {
  private readonly apiUrl = `${environment.api}/tenant/global-discounts`;

  constructor(private http: HttpClient) {}

  getGlobalDiscounts(): Observable<GlobalDiscount[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map((response) => this.normalizeGlobalDiscountList(response))
    );
  }

  getApplicableGlobalDiscounts(): Observable<GlobalDiscount[]> {
    return this.http.get<unknown>(`${this.apiUrl}/applicable`).pipe(
      map((response) => this.normalizeGlobalDiscountList(response))
    );
  }

  private normalizeGlobalDiscountList(response: unknown): GlobalDiscount[] {
    if (Array.isArray(response)) {
      return response as GlobalDiscount[];
    }
    if (!response || typeof response !== 'object') {
      return [];
    }
    const obj = response as Record<string, unknown>;
    const candidates = [obj['data'], obj['global_discounts'], obj['discounts'], obj['items']];
    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate as GlobalDiscount[];
      }
      if (candidate && typeof candidate === 'object') {
        const nested = (candidate as Record<string, unknown>)['data'];
        if (Array.isArray(nested)) {
          return nested as GlobalDiscount[];
        }
      }
    }
    return [];
  }

  getGlobalDiscount(id: string): Observable<GlobalDiscount> {
    return this.http.get<GlobalDiscount>(`${this.apiUrl}/${id}`);
  }

  createGlobalDiscount(payload: CreateGlobalDiscountDto): Observable<GlobalDiscount> {
    return this.http.post<GlobalDiscount>(this.apiUrl, payload);
  }

  updateGlobalDiscount(id: string, payload: UpdateGlobalDiscountDto): Observable<GlobalDiscount> {
    return this.http.patch<GlobalDiscount>(`${this.apiUrl}/${id}`, payload);
  }

  deleteGlobalDiscount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
