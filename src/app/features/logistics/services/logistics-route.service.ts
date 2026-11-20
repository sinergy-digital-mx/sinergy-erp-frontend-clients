import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LogisticsRoute {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  is_active: boolean;
}

@Injectable({ providedIn: 'root' })
export class LogisticsRouteService {
  private readonly baseUrl = `${environment.api}/tenant/logistics-routes`;

  constructor(private http: HttpClient) {}

  list(): Observable<LogisticsRoute[]> {
    return this.http.get<LogisticsRoute[]>(this.baseUrl);
  }

  create(body: { name: string; code: string; description?: string | null }): Observable<LogisticsRoute> {
    return this.http.post<LogisticsRoute>(this.baseUrl, body);
  }

  update(id: string, body: { name: string; code: string; description?: string | null; is_active?: boolean }): Observable<LogisticsRoute> {
    return this.http.put<LogisticsRoute>(`${this.baseUrl}/${id}`, body);
  }

  deactivate(id: string): Observable<LogisticsRoute> {
    return this.http.delete<LogisticsRoute>(`${this.baseUrl}/${id}`);
  }
}
