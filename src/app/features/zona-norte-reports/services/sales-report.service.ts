import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SalesReportQueryParams, SalesReportResponse } from '../models/sales-report.model';

@Injectable({
  providedIn: 'root',
})
export class SalesReportService {
  private readonly api = `${environment.api}/tenant/sales-reports`;

  constructor(private http: HttpClient) {}

  getBySeller(params: SalesReportQueryParams): Observable<SalesReportResponse> {
    let httpParams = new HttpParams().set('period', params.period);

    if (params.commission_rate != null) {
      httpParams = httpParams.set('commission_rate', String(params.commission_rate));
    }
    if (params.fiscal_configuration_id) {
      httpParams = httpParams.set('fiscal_configuration_id', params.fiscal_configuration_id);
    }
    if (params.billing_branch_id) {
      httpParams = httpParams.set('billing_branch_id', params.billing_branch_id);
    }
    if (params.period === 'range') {
      if (params.date_from) httpParams = httpParams.set('date_from', params.date_from);
      if (params.date_to) httpParams = httpParams.set('date_to', params.date_to);
    }

    return this.http.get<SalesReportResponse>(`${this.api}/by-seller`, { params: httpParams });
  }
}
