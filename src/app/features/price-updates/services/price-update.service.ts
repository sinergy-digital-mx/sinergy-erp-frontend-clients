import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PriceListColumn, PriceUpdateApiRow } from '../utils/price-update-calc';

export interface PriceUpdateSheet {
  price_lists: PriceListColumn[];
  data: PriceUpdateApiRow[];
  meta: { page: number; limit: number; total: number };
}

@Injectable({ providedIn: 'root' })
export class PriceUpdateService {
  private readonly api = `${environment.api}/tenant/price-updates`;

  constructor(private readonly http: HttpClient) {}

  getSheet(page: number, limit: number, search: string): Observable<PriceUpdateSheet> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search.trim()) params = params.set('search', search.trim());
    return this.http.get<PriceUpdateSheet>(this.api, { params });
  }

  saveAverage(productId: string, averageCost: number): Observable<PriceUpdateApiRow> {
    return this.http.patch<PriceUpdateApiRow>(`${this.api}/products/${productId}`, {
      average_cost: averageCost,
    });
  }

  savePrice(
    productId: string,
    price: { price_list_id: string; product_uom_id: string; price: number },
  ): Observable<PriceUpdateApiRow> {
    return this.http.patch<PriceUpdateApiRow>(`${this.api}/products/${productId}`, {
      prices: [price],
    });
  }
}
