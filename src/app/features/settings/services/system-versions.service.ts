import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SystemVersion, SystemVersionListResponse } from '../models/system-version.model';

@Injectable({
  providedIn: 'root',
})
export class SystemVersionsService {
  private readonly api = `${environment.api}/tenant/system-versions`;

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 20, search = ''): Observable<SystemVersionListResponse> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));
    const term = search.trim();
    if (term) {
      params = params.set('search', term);
    }
    return this.http.get<SystemVersionListResponse>(this.api, { params });
  }

  latest(): Observable<SystemVersion | null> {
    return this.http.get<SystemVersion | null>(`${this.api}/latest`);
  }
}
