import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { DebtFlowQueryParams, DebtFlowResponse } from '../models/customer-debt-flow.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerDebtFlowService {
  private readonly api = `${environment.api}/tenant/accounting/debt-flow`;
  private readonly http = inject(HttpClient);

  getReport(params: DebtFlowQueryParams): Observable<DebtFlowResponse> {
    return this.http.get<DebtFlowResponse>(this.api, {
      params: this.buildParams(params),
    });
  }

  exportExcel(params: DebtFlowQueryParams): Observable<{ blob: Blob; filename: string }> {
    const day = new Date().toISOString().slice(0, 10);
    const fallback =
      params.view === 'ledger' ? `flujo-deuda-${day}.xlsx` : `antiguedad-saldos-${day}.xlsx`;

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
            filename: this.parseFilename(disposition) ?? fallback,
          };
        }),
        catchError((error: HttpErrorResponse) => this.handleExportError(error)),
      );
  }

  private buildParams(params: DebtFlowQueryParams): HttpParams {
    let httpParams = new HttpParams()
      .set('period', params.period)
      .set('view', params.view)
      .set('fiscal_configuration_id', params.fiscal_configuration_id);

    if (params.period === 'range') {
      if (params.date_from) httpParams = httpParams.set('date_from', params.date_from);
      if (params.date_to) httpParams = httpParams.set('date_to', params.date_to);
    }
    if (params.billing_branch_id) {
      httpParams = httpParams.set('billing_branch_id', params.billing_branch_id);
    }
    if (params.customer_id) {
      httpParams = httpParams.set('customer_id', String(params.customer_id));
    }
    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }
    if (params.page != null) httpParams = httpParams.set('page', String(params.page));
    if (params.limit != null) httpParams = httpParams.set('limit', String(params.limit));
    return httpParams;
  }

  private parseFilename(disposition?: string): string | null {
    if (!disposition) return null;
    const match = /filename="?([^"]+)"?/i.exec(disposition);
    return match?.[1] ?? null;
  }

  private handleExportError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof Blob) {
      return from(error.error.text()).pipe(
        switchMap((text) => {
          let message = 'No se pudo descargar el Excel';
          try {
            const body = JSON.parse(text) as { message?: string | string[] };
            if (Array.isArray(body.message)) message = body.message.join(', ');
            else if (body.message) message = body.message;
          } catch {
            if (text.trim()) message = text.trim();
          }
          return throwError(() => new Error(message));
        }),
      );
    }
    return throwError(() => error);
  }
}
