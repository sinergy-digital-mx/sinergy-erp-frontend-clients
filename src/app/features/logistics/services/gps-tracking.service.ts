import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { GpsCatalogResponse, GpsPositionsResponse } from '../models/gps-unit.model';

@Injectable({ providedIn: 'root' })
export class GpsTrackingService {
  private readonly baseUrl = `${environment.api}/tenant/gps-tracking`;

  constructor(private http: HttpClient) {}

  getPositions(truckId?: string): Observable<GpsPositionsResponse> {
    const params: Record<string, string> = {};
    if (truckId) params['truck_id'] = truckId;
    return this.http.get<GpsPositionsResponse>(`${this.baseUrl}/positions`, { params }).pipe(
      map((response) => ({
        ok: !!response?.ok,
        configured: response?.configured !== false,
        message: response?.message ?? null,
        units: Array.isArray(response?.units) ? response.units : [],
      }))
    );
  }

  getUnits(): Observable<GpsCatalogResponse> {
    return this.http.get<GpsCatalogResponse>(`${this.baseUrl}/units`).pipe(
      map((response) => ({
        ok: !!response?.ok,
        configured: response?.configured !== false,
        message: response?.message ?? null,
        units: Array.isArray(response?.units) ? response.units : [],
      }))
    );
  }
}
