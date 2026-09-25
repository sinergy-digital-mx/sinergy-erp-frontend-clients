import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { resolveHttpErrorMessage } from '../../../core/utils/http-error-message.util';
import {
  ConvertQuotationResponse,
  Quotation,
  QuotationDetailPayload,
  QuotationEmail,
  QuotationFilters,
  QuotationFormData,
  SendQuotationEmailPayload,
} from '../models/quotation.model';

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  can_view_all?: boolean;
  can_view_all_branches?: boolean;
}

export interface QuotationSellerOption {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  pos_user_code?: number | string | null;
}

@Injectable({ providedIn: 'root' })
export class QuotationService {
  private readonly baseUrl = `${environment.api}/tenant/quotations`;

  constructor(private http: HttpClient) {}

  getQuotations(
    filters: QuotationFilters,
    pagination: { page: number; limit: number },
  ): Observable<PaginatedResponse<Quotation>> {
    let params = new HttpParams()
      .set('page', String(pagination.page))
      .set('limit', String(pagination.limit));

    if (filters.search) params = params.set('search', filters.search);
    if (filters.quotation_type) params = params.set('quotation_type', filters.quotation_type);
    if (filters.fiscal_configuration_id) {
      params = params.set('fiscal_configuration_id', filters.fiscal_configuration_id);
    }
    if (filters.billing_branch_id) {
      params = params.set('billing_branch_id', filters.billing_branch_id);
    }
    if (filters.general_status) {
      const statuses = Array.isArray(filters.general_status)
        ? filters.general_status
        : [filters.general_status];
      for (const status of statuses) {
        if (status) params = params.append('general_status', status);
      }
    }
    if (filters.created_from) params = params.set('created_from', filters.created_from);
    if (filters.created_to) params = params.set('created_to', filters.created_to);
    if (filters.assigned_seller_user_id) {
      params = params.set('assigned_seller_user_id', filters.assigned_seller_user_id);
    }

    return this.http.get<PaginatedResponse<Quotation>>(this.baseUrl, { params });
  }

  getSellers(): Observable<{ can_view_all: boolean; sellers: QuotationSellerOption[] }> {
    return this.http.get<{ can_view_all: boolean; sellers: QuotationSellerOption[] }>(
      `${this.baseUrl}/sellers`,
    );
  }

  getDetail(id: string): Observable<QuotationDetailPayload> {
    return this.http
      .get<{ data: QuotationDetailPayload } | QuotationDetailPayload>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => this.unwrapDetail(res)));
  }

  create(payload: QuotationFormData): Observable<Quotation> {
    return this.http.post<Quotation>(this.baseUrl, payload);
  }

  update(id: string, payload: QuotationFormData): Observable<Quotation> {
    return this.http.put<Quotation>(`${this.baseUrl}/${id}`, payload);
  }

  createLineItem(
    quotationId: string,
    body: QuotationFormData['line_items'][number],
  ): Observable<QuotationDetailPayload> {
    return this.http
      .post<{ data: QuotationDetailPayload } | QuotationDetailPayload>(
        `${this.baseUrl}/${quotationId}/line-items`,
        body,
      )
      .pipe(
        map((res) => this.unwrapDetail(res)),
        catchError((error) =>
          throwError(() => new Error(resolveHttpErrorMessage(error, 'No se pudo agregar el producto'))),
        ),
      );
  }

  patchLineItem(
    quotationId: string,
    lineItemId: string,
    body: Partial<QuotationFormData['line_items'][number]>,
  ): Observable<QuotationDetailPayload> {
    return this.http
      .patch<{ data: QuotationDetailPayload } | QuotationDetailPayload>(
        `${this.baseUrl}/${quotationId}/line-items/${lineItemId}`,
        body,
      )
      .pipe(
        map((res) => this.unwrapDetail(res)),
        catchError((error) =>
          throwError(() => new Error(resolveHttpErrorMessage(error, 'No se pudo actualizar la línea'))),
        ),
      );
  }

  deleteLineItem(quotationId: string, lineItemId: string): Observable<QuotationDetailPayload> {
    return this.http
      .delete<{ data: QuotationDetailPayload } | QuotationDetailPayload>(
        `${this.baseUrl}/${quotationId}/line-items/${lineItemId}`,
      )
      .pipe(
        map((res) => this.unwrapDetail(res)),
        catchError((error) =>
          throwError(() => new Error(resolveHttpErrorMessage(error, 'No se pudo eliminar la línea'))),
        ),
      );
  }

  convert(
    id: string,
    body: { customer_id?: number; notes?: string; send_to_pos_caja?: boolean } = {},
  ): Observable<ConvertQuotationResponse> {
    return this.http.post<ConvertQuotationResponse>(`${this.baseUrl}/${id}/convert`, body);
  }

  cancel(id: string): Observable<Quotation> {
    return this.http.post<Quotation>(`${this.baseUrl}/${id}/cancel`, {});
  }

  updateNotes(id: string, notes: string | null): Observable<QuotationDetailPayload> {
    return this.http
      .patch<{ data: QuotationDetailPayload } | QuotationDetailPayload>(`${this.baseUrl}/${id}/notes`, {
        notes,
      })
      .pipe(map((res) => this.unwrapDetail(res)));
  }

  regenerateDocumentoOriginal(id: string, language: 'es' | 'en' = 'es'): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/${id}/regenerate-documento-original`, { language });
  }

  sendEmail(id: string, payload: SendQuotationEmailPayload): Observable<QuotationEmail> {
    return this.http.post<QuotationEmail>(`${this.baseUrl}/${id}/send-email`, payload);
  }

  getProductsSummary(params: {
    fiscal_configuration_id: string;
    billing_branch_id: string;
    search?: string;
    page?: number;
    limit?: number;
    sale_scope?: 'inventory' | 'services' | 'combined';
  }): Observable<any> {
    let httpParams = new HttpParams()
      .set('fiscal_configuration_id', params.fiscal_configuration_id)
      .set('billing_branch_id', params.billing_branch_id)
      .set('page', String(params.page ?? 1))
      .set('limit', String(params.limit ?? 40));
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.sale_scope) httpParams = httpParams.set('sale_scope', params.sale_scope);
    return this.http.get(`${this.baseUrl}/products-summary`, { params: httpParams });
  }

  private unwrapDetail(
    res: { data: QuotationDetailPayload } | QuotationDetailPayload,
  ): QuotationDetailPayload {
    return 'data' in res && res.data ? res.data : (res as QuotationDetailPayload);
  }
}
