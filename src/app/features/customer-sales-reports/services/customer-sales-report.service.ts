import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  CustomerSalesReportQueryParams,
  CustomerSalesReportResponse,
} from '../models/customer-sales-report.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerSalesReportService {
  private readonly api = `${environment.api}/tenant/customer-sales-reports`;
  private readonly http = inject(HttpClient);

  getTopCustomers(params: CustomerSalesReportQueryParams): Observable<CustomerSalesReportResponse> {
    return this.http.get<CustomerSalesReportResponse>(this.api, {
      params: this.buildReportParams(params),
    });
  }

  exportExcel(params: CustomerSalesReportQueryParams): Observable<{ blob: Blob; filename: string }> {
    const day = new Date().toISOString().slice(0, 10);
    const fallback = `reporte-ventas-clientes-${day}.xlsx`;

    return this.http
      .get(`${this.api}/export/excel`, {
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

  private buildReportParams(params: CustomerSalesReportQueryParams): HttpParams {
    let httpParams = new HttpParams().set('period', params.period);

    if (params.fiscal_configuration_id) {
      httpParams = httpParams.set('fiscal_configuration_id', params.fiscal_configuration_id);
    }
    if (params.billing_branch_id) {
      httpParams = httpParams.set('billing_branch_id', params.billing_branch_id);
    }
    if (params.limit) {
      httpParams = httpParams.set('limit', String(params.limit));
    }
    if (params.period === 'range') {
      if (params.date_from) {
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

function toApiDateStart(dateStr: string): string {
  const day = dateStr.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? `${day}T00:00:00` : dateStr;
}

function toApiDateEnd(dateStr: string): string {
  const day = dateStr.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? `${day}T23:59:59` : dateStr;
}
