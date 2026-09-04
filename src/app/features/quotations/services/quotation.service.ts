import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
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

    return this.http.get<PaginatedResponse<Quotation>>(this.baseUrl, { params });
  }

  getDetail(id: string): Observable<QuotationDetailPayload> {
    return this.http
      .get<{ data: QuotationDetailPayload } | QuotationDetailPayload>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => ('data' in res && res.data ? res.data : (res as QuotationDetailPayload))));
  }

  create(payload: QuotationFormData): Observable<Quotation> {
    return this.http.post<Quotation>(this.baseUrl, payload);
  }

  convert(id: string, body: { customer_id?: number; notes?: string } = {}): Observable<ConvertQuotationResponse> {
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
      .pipe(map((res) => ('data' in res && res.data ? res.data : (res as QuotationDetailPayload))));
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
}
