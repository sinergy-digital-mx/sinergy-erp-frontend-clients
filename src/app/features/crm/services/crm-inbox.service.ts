import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  constructor(private readonly http: HttpClient) {}

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
}
