import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  CorroboratePayload,
  WarehouseControlFilters,
  WarehouseControlListResponse,
  WarehouseControlOrder,
  WarehouseControlPagination,
} from '../models/warehouse-control.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseControlService {
  private readonly baseUrl = `${environment.api}/tenant/warehouse-control`;

  constructor(private http: HttpClient) {}

  list(
    filters: WarehouseControlFilters,
    pagination: WarehouseControlPagination
  ): Observable<WarehouseControlListResponse> {
    let params = new HttpParams()
      .set('page', String(pagination.page))
      .set('limit', String(pagination.limit));

    if (filters.search?.trim()) {
      params = params.set('search', filters.search.trim());
    }
    if (filters.billing_branch_id) {
      params = params.set('billing_branch_id', filters.billing_branch_id);
    }
    if (filters.warehouse_id) {
      params = params.set('warehouse_id', filters.warehouse_id);
    }

    return this.http.get<WarehouseControlListResponse>(this.baseUrl, { params }).pipe(
      map((res) => ({
        ...res,
        data: Array.isArray(res?.data) ? res.data : [],
        page: res?.page ?? pagination.page,
        limit: res?.limit ?? pagination.limit,
        total: res?.total ?? 0,
        totalPages: res?.totalPages ?? 1,
      }))
    );
  }

  getById(id: string): Observable<WarehouseControlOrder> {
    return this.http.get<unknown>(`${this.baseUrl}/${id}`).pipe(
      map((raw) => this.normalizeDetail(raw))
    );
  }

  corroborate(id: string, payload?: CorroboratePayload): Observable<WarehouseControlOrder> {
    return this.http
      .post<unknown>(`${this.baseUrl}/${id}/corroborate`, payload ?? {})
      .pipe(map((raw) => this.normalizeDetail(raw)));
  }

  private normalizeDetail(raw: unknown): WarehouseControlOrder {
    if (!raw || typeof raw !== 'object') {
      return { id: '' };
    }

    const source = raw as Record<string, unknown>;
    const data =
      source['data'] && typeof source['data'] === 'object' && !Array.isArray(source['data'])
        ? (source['data'] as Record<string, unknown>)
        : source;

    const header =
      data['header'] && typeof data['header'] === 'object'
        ? (data['header'] as Record<string, unknown>)
        : data;

    const lineItems =
      (data['line_items'] as WarehouseControlOrder['line_items']) ||
      (data['lines'] as WarehouseControlOrder['line_items']) ||
      (header['line_items'] as WarehouseControlOrder['line_items']) ||
      (header['lines'] as WarehouseControlOrder['line_items']) ||
      [];

    return {
      ...(header as unknown as WarehouseControlOrder),
      id: String(header['id'] ?? ''),
      line_items: Array.isArray(lineItems) ? lineItems : [],
    };
  }
}
