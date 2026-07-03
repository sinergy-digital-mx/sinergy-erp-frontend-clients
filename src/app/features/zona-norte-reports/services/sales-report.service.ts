import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  SalesReportQueryParams,
  SalesReportResponse,
  SellerOrdersQueryParams,
  SellerOrdersResponse,
} from '../models/sales-report.model';

@Injectable({
  providedIn: 'root',
})
export class SalesReportService {
  private readonly api = `${environment.api}/tenant/sales-reports`;

  constructor(private http: HttpClient) {}

  getBySeller(params: SalesReportQueryParams): Observable<SalesReportResponse> {
    return this.http.get<SalesReportResponse>(`${this.api}/by-seller`, {
      params: this.buildReportParams(params),
    });
  }

  getBySellerOrders(params: SellerOrdersQueryParams): Observable<SellerOrdersResponse> {
    const httpParams = this.buildReportParams(params).set('seller_id', params.seller_id);

    return this.http.get<SellerOrdersResponse>(`${this.api}/by-seller/orders`, {
      params: httpParams,
    });
  }

  private buildReportParams(
    params: Pick<
      SalesReportQueryParams,
      'period' | 'fiscal_configuration_id' | 'billing_branch_id' | 'date_from' | 'date_to'
    >
  ): HttpParams {
    let httpParams = new HttpParams().set('period', params.period);

    // commission_rate se configura en Metas; no enviarlo aquí (overridearía la config).
    if (params.fiscal_configuration_id) {
      httpParams = httpParams.set('fiscal_configuration_id', params.fiscal_configuration_id);
    }
    if (params.billing_branch_id) {
      httpParams = httpParams.set('billing_branch_id', params.billing_branch_id);
    }
    if (params.period === 'range') {
      if (params.date_from) {
        // Evitar date-only UTC (YYYY-MM-DD → día anterior en zonas América).
        httpParams = httpParams.set('date_from', toApiDateStart(params.date_from));
      }
      if (params.date_to) {
        httpParams = httpParams.set('date_to', toApiDateEnd(params.date_to));
      }
    }

    return httpParams;
  }
}

/** YYYY-MM-DD → inicio del día en hora local del servidor (no UTC date-only). */
function toApiDateStart(dateStr: string): string {
  const day = dateStr.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? `${day}T00:00:00` : dateStr;
}

/** YYYY-MM-DD → fin del día en hora local del servidor. */
function toApiDateEnd(dateStr: string): string {
  const day = dateStr.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? `${day}T23:59:59` : dateStr;
}
