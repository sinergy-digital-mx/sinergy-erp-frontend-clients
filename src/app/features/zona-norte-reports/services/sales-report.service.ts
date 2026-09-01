import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
  private readonly http = inject(HttpClient);

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

  exportBySellerExcel(params: SalesReportQueryParams): Observable<{ blob: Blob; filename: string }> {
    const day = new Date().toISOString().slice(0, 10);
    const fallback =
      (params.view ?? 'sales') === 'commissions'
        ? `reporte-comisiones-${day}.xlsx`
        : `reporte-ventas-${day}.xlsx`;

    return this.http
      .get(`${this.api}/by-seller/export/excel`, {
        params: this.buildReportParams(params),
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const disposition = response.headers.get('content-disposition') ?? undefined;
          return {
            blob: response.body as Blob,
            filename: this.parseFilenameFromDisposition(disposition) ?? fallback,
          };
        }),
        catchError((error: HttpErrorResponse) => this.handleExportError(error))
      );
  }

  private buildReportParams(
    params: Pick<
      SalesReportQueryParams,
      'view' | 'period' | 'fiscal_configuration_id' | 'billing_branch_id' | 'date_from' | 'date_to'
    >
  ): HttpParams {
    let httpParams = new HttpParams()
      .set('view', params.view ?? 'sales')
      .set('period', params.period);

    // commission_rate se configura en Metas; no enviarlo (overridearía la config).
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

  private handleExportError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof Blob && typeof error.error.text === 'function') {
      return from(error.error.text()).pipe(
        switchMap((text) => {
          let message = '';
          try {
            const json = JSON.parse(text) as { message?: string | string[] };
            if (Array.isArray(json.message)) {
              message = json.message.join(', ');
            } else if (typeof json.message === 'string') {
              message = json.message;
            }
          } catch {
            // El cuerpo no es JSON
          }
          return throwError(() => new Error(message || 'No se pudo descargar el Excel'));
        })
      );
    }

    return throwError(() => new Error('No se pudo descargar el Excel'));
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
