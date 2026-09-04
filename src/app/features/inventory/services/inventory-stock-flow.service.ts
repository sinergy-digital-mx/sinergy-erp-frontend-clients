import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  StockFlowQueryParams,
  StockFlowResponse,
} from '../models/inventory-stock-flow.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryStockFlowService {
  private readonly api = `${environment.api}/tenant/inventory/stock-flow`;
  private readonly http = inject(HttpClient);

  getReport(params: StockFlowQueryParams): Observable<StockFlowResponse> {
    return this.http.get<StockFlowResponse>(this.api, {
      params: this.buildParams(params),
    });
  }

  exportExcel(
    params: StockFlowQueryParams,
  ): Observable<{ blob: Blob; filename: string }> {
    const day = new Date().toISOString().slice(0, 10);
    const fallback =
      params.view === 'ledger'
        ? `existencia-inventarios-flujo-${day}.xlsx`
        : `existencia-inventarios-resumen-${day}.xlsx`;

    return this.http
      .get(`${this.api}/export/excel`, {
        params: this.buildParams(params),
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
        catchError((error: HttpErrorResponse) => this.handleExportError(error)),
      );
  }

  private buildParams(params: StockFlowQueryParams): HttpParams {
    let httpParams = new HttpParams()
      .set('period', params.period)
      .set('view', params.view)
      .set('fiscal_configuration_id', params.fiscal_configuration_id);

    if (params.period === 'range') {
      if (params.date_from) {
        httpParams = httpParams.set('date_from', `${params.date_from}T00:00:00`);
      }
      if (params.date_to) {
        httpParams = httpParams.set('date_to', `${params.date_to}T23:59:59`);
      }
    }

    if (params.billing_branch_id) {
      httpParams = httpParams.set('billing_branch_id', params.billing_branch_id);
    }
    if (params.product_id) {
      httpParams = httpParams.set('product_id', params.product_id);
    }
    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return httpParams;
  }

  private parseFilenameFromDisposition(disposition?: string): string | null {
    if (!disposition) return null;
    const utf8 = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
    if (utf8?.[1]) {
      try {
        return decodeURIComponent(utf8[1]);
      } catch {
        return utf8[1];
      }
    }
    const plain = /filename="?([^";]+)"?/i.exec(disposition);
    return plain?.[1] ?? null;
  }

  private handleExportError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof Blob) {
      return from(error.error.text()).pipe(
        switchMap((text) => {
          let message = 'No se pudo descargar el Excel';
          try {
            const parsed = JSON.parse(text) as { message?: string };
            if (parsed?.message) message = parsed.message;
          } catch {
            /* keep default */
          }
          return throwError(() => new Error(message));
        }),
      );
    }
    return throwError(
      () => new Error(error.error?.message || 'No se pudo descargar el Excel'),
    );
  }
}
