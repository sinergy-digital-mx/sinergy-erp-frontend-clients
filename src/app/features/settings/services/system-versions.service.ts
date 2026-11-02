import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay, timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SystemVersion, SystemVersionListResponse } from '../models/system-version.model';

const CACHE_KEY = 'pollux.systemVersions.v1';
const REQUEST_TIMEOUT_MS = 12000;

interface StoredVersionList {
  tenantId: string;
  items: SystemVersion[];
}

@Injectable({
  providedIn: 'root',
})
export class SystemVersionsService {
  private readonly api = `${environment.api}/tenant/system-versions`;
  private list$?: Observable<SystemVersionListResponse>;

  constructor(private http: HttpClient) {}

  /**
   * Una sola lectura del historial ya filtrado para esta organización.
   * La búsqueda y las páginas siguientes no vuelven a pedir el API.
   */
  loadAll(): Observable<SystemVersionListResponse> {
    if (!this.list$) {
      const params = new HttpParams().set('page', '1').set('limit', '50');
      this.list$ = this.http.get<SystemVersionListResponse>(this.api, { params }).pipe(
        timeout(REQUEST_TIMEOUT_MS),
        catchError((error) => {
          this.list$ = undefined;
          return throwError(() => error);
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }
    return this.list$;
  }

  latest(): Observable<SystemVersion | null> {
    return this.http.get<SystemVersion | null>(`${this.api}/latest`);
  }

  readCachedList(tenantId: string): SystemVersion[] | null {
    if (!tenantId) {
      return null;
    }
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) {
        return null;
      }
      const stored = JSON.parse(raw) as StoredVersionList;
      if (stored?.tenantId !== tenantId || !Array.isArray(stored.items)) {
        return null;
      }
      return stored.items;
    } catch {
      return null;
    }
  }

  rememberList(tenantId: string, items: SystemVersion[]): void {
    if (!tenantId) {
      return;
    }
    try {
      const stored: StoredVersionList = { tenantId, items };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(stored));
    } catch {
      // Sesión privada o cuota llena: la próxima visita vuelve a consultar.
    }
  }
}
