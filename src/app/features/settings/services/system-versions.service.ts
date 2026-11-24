import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SystemVersion, SystemVersionListResponse } from '../models/system-version.model';

const REQUEST_TIMEOUT_MS = 8000;
const LEGACY_CACHE_KEY = 'pollux.systemVersions.v1';

@Injectable({
  providedIn: 'root',
})
export class SystemVersionsService {
  private readonly api = `${environment.api}/tenant/system-versions`;

  constructor(private http: HttpClient) {
    try {
      sessionStorage.removeItem(LEGACY_CACHE_KEY);
    } catch {
      // Sesión privada: no hay lista vieja que borrar.
    }
  }

  page(page: number, limit: number, search = ''): Observable<SystemVersionListResponse> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));
    const term = search.trim();
    if (term) {
      params = params.set('search', term);
    }
    return this.http.get<SystemVersionListResponse>(this.api, { params }).pipe(
      timeout(REQUEST_TIMEOUT_MS),
    );
  }

  latest(): Observable<SystemVersion | null> {
    return this.http.get<SystemVersion | null>(`${this.api}/latest`).pipe(
      timeout(REQUEST_TIMEOUT_MS),
    );
  }
}
