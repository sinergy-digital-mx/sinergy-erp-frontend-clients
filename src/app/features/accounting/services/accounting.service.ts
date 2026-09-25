import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  AccountingPaginatedResponse,
  AccountingPeriodQuery,
  AccountsPayableListSummary,
  AccountsPayableOrderRow,
  AccountsPayableVendorDetail,
  AccountsPayableVendorRow,
  AccountsReceivableDetail,
  AccountsReceivableListSummary,
  AccountsReceivableOrderRow,
  AccountsReceivableRow,
  AccountingDailyShiftRow,
  CollectionCustomerType,
  CollectionTerminalSummary,
  PosCollectionRow,
  PosOpenDailyShiftSummary,
  PosSummaryResponse,
  PosTerminalSaleRow,
  PosTerminalType,
  SalesTerminalSummary,
} from '../models/accounting.model';
import { PosDailyShiftDetail, normalizeDailyShiftDetail } from '../../pos/models/pos-daily-shift.model';

@Injectable({ providedIn: 'root' })
export class AccountingService {
  private readonly api = `${environment.api}/tenant/accounting`;

  constructor(private http: HttpClient) {}

  getPosSummary(query: AccountingPeriodQuery): Observable<PosSummaryResponse> {
    return this.http
      .get<unknown>(`${this.api}/pos-summary`, { params: this.buildPeriodParams(query) })
      .pipe(map((raw) => this.parsePosSummary(raw)));
  }

  getPosTerminalSales(
    terminalUserId: string,
    query: AccountingPeriodQuery,
    page = 1,
    limit = 20
  ): Observable<AccountingPaginatedResponse<PosTerminalSaleRow>> {
    const params = this.buildPeriodParams(query)
      .set('page', String(page))
      .set('limit', String(limit));

    return this.http
      .get<unknown>(`${this.api}/pos-terminals/${terminalUserId}/sales`, { params })
      .pipe(map((raw) => this.parsePaginated<PosTerminalSaleRow>(raw)));
  }

  getPosCollections(
    query: AccountingPeriodQuery,
    customerType: CollectionCustomerType = 'all',
    page = 1,
    limit = 20,
    search?: string
  ): Observable<AccountingPaginatedResponse<PosCollectionRow>> {
    let params = this.buildPeriodParams(query)
      .set('customer_type', customerType)
      .set('page', String(page))
      .set('limit', String(limit));
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http
      .get<unknown>(`${this.api}/pos-collections`, { params })
      .pipe(map((raw) => this.parsePaginated<PosCollectionRow>(raw)));
  }

  exportPosCollectionsExcel(
    query: AccountingPeriodQuery,
    customerType: CollectionCustomerType = 'all',
    search?: string
  ): Observable<{ blob: Blob; filename: string }> {
    let params = this.buildPeriodParams(query).set('customer_type', customerType);
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http
      .get(`${this.api}/pos-collections/export/excel`, {
        params,
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const disposition = response.headers.get('content-disposition') ?? undefined;
          return {
            blob: response.body as Blob,
            filename:
              this.parseFilenameFromDisposition(disposition) ??
              `cobranza-pos-${new Date().toISOString().slice(0, 10)}.xlsx`,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          const fallback = 'No se pudo descargar el Excel';
          if (error.error instanceof Blob) {
            return throwError(() => new Error(fallback));
          }
          return throwError(() => new Error(fallback));
        })
      );
  }

  getPosDailyShifts(query: AccountingPeriodQuery): Observable<AccountingDailyShiftRow[]> {
    return this.http
      .get<unknown>(`${this.api}/pos-daily-shifts`, { params: this.buildPeriodParams(query) })
      .pipe(map((raw) => this.asArray<AccountingDailyShiftRow>(this.asRecord(raw)['data'])));
  }

  getPosDailyShift(id: string): Observable<PosDailyShiftDetail> {
    return this.http.get<unknown>(`${this.api}/pos-daily-shifts/${id}`).pipe(
      map((raw) => {
        const body = this.asRecord(raw);
        const shift = normalizeDailyShiftDetail(body['daily_shift'] ?? body['data'] ?? body);
        if (!shift) {
          throw new Error('No se pudo cargar el corte');
        }
        return shift;
      })
    );
  }

  getAccountsPayable(
    search: string | undefined,
    page = 1,
    limit = 20
  ): Observable<AccountingPaginatedResponse<AccountsPayableVendorRow, AccountsPayableListSummary>> {
    let params = new HttpParams().set('page', String(page)).set('limit', String(limit));
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http
      .get<unknown>(`${this.api}/accounts-payable`, { params })
      .pipe(map((raw) => this.parsePaginated<AccountsPayableVendorRow, AccountsPayableListSummary>(raw)));
  }

  getAccountsPayableVendorDetail(vendorId: string): Observable<AccountsPayableVendorDetail> {
    return this.http
      .get<unknown>(`${this.api}/accounts-payable/vendors/${vendorId}`)
      .pipe(map((raw) => this.parsePayableVendorDetail(raw, vendorId)));
  }

  getAccountsReceivable(
    billingBranchId: string | undefined,
    search: string | undefined,
    page = 1,
    limit = 20
  ): Observable<AccountingPaginatedResponse<AccountsReceivableRow, AccountsReceivableListSummary>> {
    let params = new HttpParams().set('page', String(page)).set('limit', String(limit));
    if (billingBranchId) {
      params = params.set('billing_branch_id', billingBranchId);
    }
    if (search?.trim()) {
      params = params.set('search', search.trim());
    }

    return this.http
      .get<unknown>(`${this.api}/accounts-receivable`, { params })
      .pipe(map((raw) => this.parsePaginated<AccountsReceivableRow, AccountsReceivableListSummary>(raw)));
  }

  getAccountsReceivableOrders(
    razonSocial: string,
    billingBranchId?: string
  ): Observable<AccountsReceivableDetail> {
    let params = new HttpParams();
    if (billingBranchId) {
      params = params.set('billing_branch_id', billingBranchId);
    }

    const encoded = encodeURIComponent(razonSocial);
    return this.http
      .get<unknown>(`${this.api}/accounts-receivable/by-razon-social/${encoded}/orders`, { params })
      .pipe(map((raw) => this.parseReceivableDetail(raw)));
  }

  private buildPeriodParams(query: AccountingPeriodQuery): HttpParams {
    let params = new HttpParams().set('period', query.period);

    if (query.billing_branch_id) {
      params = params.set('billing_branch_id', query.billing_branch_id);
    }
    if (query.period === 'range') {
      if (query.date_from) params = params.set('date_from', query.date_from);
      if (query.date_to) params = params.set('date_to', query.date_to);
    }

    return params;
  }

  /** pos-summary: sales_terminals y collection_terminal en la raíz (no dentro de data). */
  private parsePosSummary(raw: unknown): PosSummaryResponse {
    const body = this.asRecord(raw);
    const source = this.hasPosSummaryShape(body) ? body : this.asRecord(body['data']);

    return {
      filters_applied: (source['filters_applied'] ?? {}) as PosSummaryResponse['filters_applied'],
      sales_terminals: this.asArray<unknown>(source['sales_terminals']).map((row) =>
        this.parseSalesTerminal(row)
      ),
      collection_terminal: this.parseCollectionTerminal(source['collection_terminal']),
    };
  }

  private parseSalesTerminal(raw: unknown): SalesTerminalSummary {
    const row = this.asRecord(raw);
    const terminalType = this.parseTerminalType(row['terminal_type']);

    return {
      terminal_user_id: String(row['terminal_user_id'] ?? ''),
      terminal_name: String(row['terminal_name'] ?? ''),
      terminal_type: terminalType,
      sales_count: Number(row['sales_count'] ?? 0),
      amount_sold: Number(row['amount_sold'] ?? 0),
      orders_collected:
        row['orders_collected'] != null ? Number(row['orders_collected']) : undefined,
      amount_collected:
        row['amount_collected'] != null ? Number(row['amount_collected']) : undefined,
      daily_shifts_count: Number(row['daily_shifts_count'] ?? 0),
      partial_shifts_count: Number(row['partial_shifts_count'] ?? 0),
      open_daily_shift: this.parseOpenDailyShift(row['open_daily_shift']),
    };
  }

  private parseCollectionTerminal(raw: unknown): CollectionTerminalSummary | null {
    if (!raw || typeof raw !== 'object') {
      return null;
    }

    const c = this.asRecord(raw);
    return {
      terminal_user_id: (c['terminal_user_id'] as string | null) ?? null,
      terminal_name: (c['terminal_name'] as string | null) ?? null,
      orders_collected: Number(c['orders_collected'] ?? 0),
      amount_collected: Number(c['amount_collected'] ?? 0),
      walk_in_count: Number(c['walk_in_count'] ?? 0),
      invoiced_count: Number(c['invoiced_count'] ?? 0),
      daily_shifts_count: Number(c['daily_shifts_count'] ?? 0),
      partial_shifts_count: Number(c['partial_shifts_count'] ?? 0),
      open_daily_shift: this.parseOpenDailyShift(c['open_daily_shift']),
    };
  }

  private parseOpenDailyShift(raw: unknown): PosOpenDailyShiftSummary | null {
    if (!raw || typeof raw !== 'object') {
      return null;
    }

    const shift = this.asRecord(raw);
    if (!shift['id']) {
      return null;
    }

    return {
      id: String(shift['id']),
      shift_date: String(shift['shift_date'] ?? ''),
      status: String(shift['status'] ?? ''),
      partial_shifts_count:
        shift['partial_shifts_count'] != null
          ? Number(shift['partial_shifts_count'])
          : undefined,
    };
  }

  private parseTerminalType(raw: unknown): PosTerminalType {
    return raw === 'COBRANZA' ? 'COBRANZA' : 'VENTAS';
  }

  /** Listas paginadas: data[], total, page, summary en la raíz. */
  private parsePaginated<T, S = undefined>(raw: unknown): AccountingPaginatedResponse<T, S> {
    const body = this.asRecord(raw);
    const rows = this.asArray<T>(body['data']);

    return {
      data: rows,
      page: Number(body['page'] ?? 1),
      limit: Number(body['limit'] ?? (rows.length || 20)),
      total: Number(body['total'] ?? rows.length),
      totalPages: body['totalPages'] != null ? Number(body['totalPages']) : undefined,
      summary: (body['summary'] as S) ?? undefined,
    };
  }

  /** CxP detalle: response.vendor + response.orders[] */
  private parsePayableVendorDetail(raw: unknown, vendorId: string): AccountsPayableVendorDetail {
    const body = this.asRecord(raw);
    const vendor = this.asRecord(body['vendor']);
    const orders = this.asArray<AccountsPayableOrderRow>(body['orders']);

    return {
      vendor_id: String(vendor['vendor_id'] ?? vendor['id'] ?? vendorId),
      vendor_name: vendor['vendor_name'] as string | undefined,
      razon_social: vendor['razon_social'] as string | undefined,
      company_name: vendor['company_name'] as string | undefined,
      amount_pending: Number(vendor['amount_pending'] ?? body['amount_pending'] ?? 0),
      pending_order_count: Number(
        vendor['pending_order_count'] ?? body['pending_order_count'] ?? orders.length
      ),
      orders,
    };
  }

  /** CxC detalle: razon_social, fiscal_rfc, amount_pending, orders[] en la raíz. */
  private parseReceivableDetail(raw: unknown): AccountsReceivableDetail {
    const body = this.asRecord(raw);

    return {
      razon_social: String(body['razon_social'] ?? ''),
      fiscal_rfc: body['fiscal_rfc'] as string | undefined,
      amount_pending: Number(body['amount_pending'] ?? 0),
      pending_order_count: Number(body['pending_order_count'] ?? 0),
      orders: this.asArray<AccountsReceivableOrderRow>(body['orders']),
    };
  }

  private hasPosSummaryShape(obj: Record<string, unknown>): boolean {
    return 'sales_terminals' in obj || 'collection_terminal' in obj;
  }

  private asRecord(raw: unknown): Record<string, unknown> {
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      return raw as Record<string, unknown>;
    }
    return {};
  }

  private asArray<T>(raw: unknown): T[] {
    return Array.isArray(raw) ? (raw as T[]) : [];
  }

  private parseFilenameFromDisposition(header?: string): string | null {
    if (!header) {
      return null;
    }
    const utfMatch = /filename\*=UTF-8''([^;]+)/i.exec(header);
    if (utfMatch?.[1]) {
      try {
        return decodeURIComponent(utfMatch[1].trim());
      } catch {
        return utfMatch[1].trim();
      }
    }
    const match = /filename="([^"]+)"/i.exec(header) ?? /filename=([^;]+)/i.exec(header);
    return match?.[1]?.trim().replace(/^["']|["']$/g, '') ?? null;
  }
}
