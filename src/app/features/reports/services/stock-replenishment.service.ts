import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  StockReplenishmentQuery,
  StockReplenishmentReport,
  StockReplenishmentVendorsResponse,
} from '../models/stock-replenishment.model';

@Injectable({
  providedIn: 'root',
})
export class StockReplenishmentService {
  private readonly api = `${environment.api}/tenant/reports/stock-replenishment`;
  private readonly http = inject(HttpClient);

  listVendors(): Observable<StockReplenishmentVendorsResponse> {
    return this.http.get<StockReplenishmentVendorsResponse>(`${this.api}/vendors`);
  }

  getReport(query: StockReplenishmentQuery): Observable<StockReplenishmentReport> {
    const params = new HttpParams()
      .set('vendor_id', query.vendor_id)
      .set('period_days', String(query.period_days))
      .set('cover_days', String(query.cover_days));
    return this.http.get<StockReplenishmentReport>(this.api, { params });
  }
}
