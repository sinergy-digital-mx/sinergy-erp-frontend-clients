import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  DashboardLeadOriginsResponse,
  DashboardQueryParams,
  DashboardRevenueSeriesResponse,
  DashboardSellersResponse,
  DashboardSummaryResponse,
} from '../models/divino-dashboard.model';

@Injectable({ providedIn: 'root' })
export class DivinoDashboardService {
  private readonly api = `${environment.api}/tenant/divino-dashboard`;

  constructor(private http: HttpClient) {}

  getSummary(params: DashboardQueryParams): Observable<DashboardSummaryResponse> {
    return this.http.get<DashboardSummaryResponse>(`${this.api}/summary`, {
      params: this.buildParams(params),
    });
  }

  getSellers(params: DashboardQueryParams): Observable<DashboardSellersResponse> {
    return this.http.get<DashboardSellersResponse>(`${this.api}/sellers`, {
      params: this.buildParams(params),
    });
  }

  getLeadOrigins(params: DashboardQueryParams): Observable<DashboardLeadOriginsResponse> {
    return this.http.get<DashboardLeadOriginsResponse>(`${this.api}/lead-origins`, {
      params: this.buildParams(params),
    });
  }

  getRevenueSeries(params: DashboardQueryParams): Observable<DashboardRevenueSeriesResponse> {
    return this.http.get<DashboardRevenueSeriesResponse>(`${this.api}/revenue-series`, {
      params: this.buildParams(params),
    });
  }

  private buildParams(params: DashboardQueryParams): HttpParams {
    let httpParams = new HttpParams().set('scope', params.scope);

    if (params.scope === 'period') {
      if (params.year != null) {
        httpParams = httpParams.set('year', String(params.year));
      }
      if (params.month != null) {
        httpParams = httpParams.set('month', String(params.month));
      }
    }

    if (params.scope === 'period' && params.period) {
      httpParams = httpParams.set('period', params.period);
    }

    return httpParams;
  }
}
