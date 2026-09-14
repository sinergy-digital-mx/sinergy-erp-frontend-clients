import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  CrmActivityAuthorsResponse,
  CrmActivityListResponse,
  CrmActivityStatsResponse,
  CrmInboxQuery,
} from '../models/crm-inbox.model';

@Injectable({
  providedIn: 'root',
})
export class CrmInboxService {
  private readonly api = environment.api;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  getActivities(query: CrmInboxQuery): Observable<CrmActivityListResponse> {
    return this.http
      .get<CrmActivityListResponse>(`${this.api}/tenant/crm/activities`, {
        params: this.toParams(query),
      })
      .pipe(map((res) => this.unwrap(res)));
  }

  getStats(query: CrmInboxQuery): Observable<CrmActivityStatsResponse> {
    return this.http
      .get<CrmActivityStatsResponse>(`${this.api}/tenant/crm/activities/stats`, {
        params: this.toParams(query, true),
      })
      .pipe(map((res) => this.unwrap(res)));
  }

  getAuthors(): Observable<CrmActivityAuthorsResponse> {
    return this.http
      .get<CrmActivityAuthorsResponse>(`${this.api}/tenant/crm/activities/authors`)
      .pipe(map((res) => this.unwrapAuthors(res)));
  }

  downloadExcel(query: CrmInboxQuery): Observable<{ blob: Blob; filename: string }> {
    return this.http
      .get(`${this.api}/tenant/crm/activities/export/excel`, {
        params: this.toParams(query, true),
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const disposition = response.headers.get('content-disposition') ?? undefined;
          const filename =
            this.parseFilenameFromDisposition(disposition) ??
            `crm-actividades-${new Date().toISOString().slice(0, 10)}.xlsx`;
          return { blob: response.body as Blob, filename };
        }),
        catchError((error) => this.handleExportError(error)),
      );
  }

  private toParams(query: CrmInboxQuery, skipPaging = false): HttpParams {
    let params = new HttpParams();
    const entries: Array<[string, string | number | undefined]> = [
      ['search', query.search],
      ['type', query.type],
      ['status', query.status],
      ['user_id', query.user_id],
      ['period', query.period],
      ['date_from', query.date_from],
      ['date_to', query.date_to],
      ['attention', query.attention],
    ];

    if (!skipPaging) {
      entries.push(['page', query.page], ['limit', query.limit]);
    }

    for (const [key, value] of entries) {
      if (value != null && value !== '') {
        params = params.set(key, String(value));
      }
    }

    return params;
  }

  private unwrap<T>(response: T | { data: T }): T {
    if (response && typeof response === 'object' && 'data' in response) {
      return (response as { data: T }).data ?? (response as T);
    }
    return response as T;
  }

  private unwrapAuthors(response: unknown): CrmActivityAuthorsResponse {
    const body = this.unwrap(response) as CrmActivityAuthorsResponse | CrmActivityAuthorsResponse['authors'];
    if (Array.isArray(body)) {
      return { is_crm_admin: false, authors: body };
    }
    if (body && typeof body === 'object') {
      return {
        is_crm_admin: Boolean(body.is_crm_admin),
        authors: Array.isArray(body.authors) ? body.authors : [],
      };
    }
    return { is_crm_admin: false, authors: [] };
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
    if (error.error instanceof Blob) {
      return from(error.error.text()).pipe(
        switchMap((text) => throwError(() => new Error(this.messageFromExportBody(text, error.status)))),
      );
    }
    if (error.status === 401) {
      this.router.navigate(['/auth/login']);
      return throwError(() => new Error('Sesión expirada. Por favor, inicia sesión nuevamente.'));
    }
    return throwError(() => new Error(this.fallbackExportMessage(error.status)));
  }

  private messageFromExportBody(text: string, status: number): string {
    try {
      const json = JSON.parse(text) as { message?: string | string[] };
      if (Array.isArray(json.message)) {
        return json.message.join(', ');
      }
      if (typeof json.message === 'string' && json.message.trim()) {
        return json.message;
      }
    } catch {
      // not JSON
    }
    return this.fallbackExportMessage(status);
  }

  private fallbackExportMessage(status: number): string {
    if (status === 403) {
      return 'No tienes permiso para exportar';
    }
    if (status === 401) {
      return 'Sesión expirada. Por favor, inicia sesión nuevamente.';
    }
    return 'No se pudo descargar el Excel';
  }
}
