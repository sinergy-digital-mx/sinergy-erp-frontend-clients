import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SalesOrder } from '../../sales-orders/models/sales-order.model';
import {
  CreateShippingDto,
  ResolveOrdersDto,
  Shipping,
  ShippingListResponse,
  ShippingPreviewDto,
  ShippingPreviewResult,
  ShippingQueryParams,
  ShippingStatus,
  normalizeShipping,
} from '../models/shipping.model';

@Injectable({ providedIn: 'root' })
export class ShippingService {
  private readonly baseUrl = `${environment.api}/tenant/shippings`;

  constructor(private http: HttpClient) {}

  preview(body: ShippingPreviewDto): Observable<{ data: ShippingPreviewResult; message?: string }> {
    return this.http.post<any>(`${this.baseUrl}/preview`, body).pipe(
      map((response) => ({
        data: (response?.data ?? response) as ShippingPreviewResult,
        message: response?.message,
      }))
    );
  }

  /**
   * Órdenes elegibles: Surtida o Lista para entrega de cualquier almacén de la sucursal,
   * sin envío activo.
   */
  getAvailableOrders(params: {
    billing_branch_id: string;
    fiscal_configuration_id?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Observable<{
    data: SalesOrder[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }> {
    const httpParams: Record<string, string | number> = {
      billing_branch_id: params.billing_branch_id,
    };
    if (params.fiscal_configuration_id) {
      httpParams['fiscal_configuration_id'] = params.fiscal_configuration_id;
    }
    if (params.search?.trim()) httpParams['search'] = params.search.trim();
    if (params.page != null) httpParams['page'] = params.page;
    if (params.limit != null) httpParams['limit'] = params.limit;

    return this.http.get<any>(`${this.baseUrl}/available-orders`, { params: httpParams }).pipe(
      map((response) => {
        const data = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];
        const page = Number(response?.page) || params.page || 1;
        const limit = Number(response?.limit) || params.limit || data.length || 20;
        const total = Number(response?.total) || data.length;
        const totalPages =
          Number(response?.totalPages) || (total > 0 ? Math.ceil(total / limit) : 1);
        return { data, page, limit, total, totalPages };
      })
    );
  }

  resolveOrders(body: ResolveOrdersDto): Observable<{ data: ShippingPreviewResult; message?: string }> {
    return this.http.post<any>(`${this.baseUrl}/resolve-orders`, body).pipe(
      map((response) => ({
        data: (response?.data ?? response) as ShippingPreviewResult,
        message: response?.message,
      }))
    );
  }

  createShipping(body: CreateShippingDto): Observable<{ shipping: Shipping; message?: string }> {
    return this.http.post<any>(this.baseUrl, body).pipe(
      map((response) => ({
        shipping: normalizeShipping(response?.data ?? response),
        message: response?.message,
      }))
    );
  }

  getShippings(params?: ShippingQueryParams): Observable<ShippingListResponse> {
    const httpParams: Record<string, string | number> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== '') {
          httpParams[key] = value as string | number;
        }
      }
    }

    return this.http.get<any>(this.baseUrl, { params: httpParams }).pipe(
      map((response) => this.normalizeList(response, params))
    );
  }

  getShipping(id: string): Observable<Shipping> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map((response) => normalizeShipping(response?.data ?? response))
    );
  }

  addStops(
    id: string,
    orders: { sales_order_id: string; stop_sequence?: number; customer_address_id?: number | string }[]
  ): Observable<{ shipping: Shipping; message?: string }> {
    return this.http.post<any>(`${this.baseUrl}/${id}/stops`, { orders }).pipe(
      map((response) => ({
        shipping: normalizeShipping(response?.data ?? response),
        message: response?.message,
      }))
    );
  }

  recalculateDistance(id: string): Observable<{ shipping: Shipping; message?: string }> {
    return this.http.post<any>(`${this.baseUrl}/${id}/recalculate-distance`, {}).pipe(
      map((response) => ({
        shipping: normalizeShipping(response?.data ?? response),
        message: response?.message,
      }))
    );
  }

  updateStatus(id: string, status: ShippingStatus | string): Observable<{ shipping: Shipping; message?: string }> {
    return this.http.patch<any>(`${this.baseUrl}/${id}/status`, { status }).pipe(
      map((response) => ({
        shipping: normalizeShipping(response?.data ?? response),
        message: response?.message,
      }))
    );
  }

  private normalizeList(response: any, params?: ShippingQueryParams): ShippingListResponse {
    const defaultLimit = params?.limit ?? 100;

    if (Array.isArray(response)) {
      return {
        data: response.map((item) => normalizeShipping(item)),
        total: response.length,
        page: 1,
        limit: defaultLimit,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      };
    }

    const data = (response?.data ?? []).map((item: unknown) => normalizeShipping(item));
    const page = Number(response?.page) || params?.page || 1;
    const limit = Number(response?.limit) || params?.limit || defaultLimit;
    const total = Number(response?.total) || data.length;
    const totalPages =
      Number(response?.totalPages) || (total > 0 ? Math.ceil(total / limit) : 1);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: response?.hasNext ?? page < totalPages,
      hasPrev: response?.hasPrev ?? page > 1,
    };
  }
}
