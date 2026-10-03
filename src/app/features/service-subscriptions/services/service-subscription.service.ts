import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CreateServiceSubscriptionPayload,
  ServiceSubscriptionDetail,
  ServiceSubscriptionListItem,
} from '../models/service-subscription.model';

export interface ServiceSubscriptionPage {
  data: ServiceSubscriptionListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class ServiceSubscriptionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.api}/tenant/service-subscriptions`;

  list(search = '', page = 1): Observable<ServiceSubscriptionPage> {
    let params = new HttpParams().set('page', String(page)).set('limit', '20');
    if (search.trim()) params = params.set('search', search.trim());
    return this.http.get<ServiceSubscriptionPage>(this.baseUrl, { params });
  }

  get(id: string): Observable<ServiceSubscriptionDetail> {
    return this.http.get<ServiceSubscriptionDetail>(`${this.baseUrl}/${id}`);
  }

  create(payload: CreateServiceSubscriptionPayload): Observable<ServiceSubscriptionDetail> {
    return this.http.post<ServiceSubscriptionDetail>(this.baseUrl, payload);
  }

  renew(id: string): Observable<ServiceSubscriptionDetail> {
    return this.http.post<ServiceSubscriptionDetail>(`${this.baseUrl}/${id}/renew`, {});
  }

  cancel(id: string): Observable<ServiceSubscriptionDetail> {
    return this.http.post<ServiceSubscriptionDetail>(`${this.baseUrl}/${id}/cancel`, {});
  }

  generate(id: string, periodId: string): Observable<ServiceSubscriptionDetail> {
    return this.http.post<ServiceSubscriptionDetail>(
      `${this.baseUrl}/${id}/periods/${periodId}/generate`,
      {},
    );
  }

  invoice(id: string, periodId: string): Observable<ServiceSubscriptionDetail> {
    return this.http.post<ServiceSubscriptionDetail>(
      `${this.baseUrl}/${id}/periods/${periodId}/invoice`,
      {},
    );
  }

  link(id: string, periodId: string, salesOrderId: string): Observable<ServiceSubscriptionDetail> {
    return this.http.post<ServiceSubscriptionDetail>(
      `${this.baseUrl}/${id}/periods/${periodId}/link`,
      { sales_order_id: salesOrderId, align_date: true },
    );
  }

  skip(id: string, periodId: string): Observable<ServiceSubscriptionDetail> {
    return this.http.post<ServiceSubscriptionDetail>(
      `${this.baseUrl}/${id}/periods/${periodId}/skip`,
      {},
    );
  }

  unlink(id: string, periodId: string): Observable<ServiceSubscriptionDetail> {
    return this.http.post<ServiceSubscriptionDetail>(
      `${this.baseUrl}/${id}/periods/${periodId}/unlink`,
      {},
    );
  }
}
