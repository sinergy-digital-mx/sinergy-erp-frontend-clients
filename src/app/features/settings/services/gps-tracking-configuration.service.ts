import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  CreateGpsTrackingConfigurationDto,
  GpsTrackingConfiguration,
  GpsTrackingTestResult,
  UpdateGpsTrackingConfigurationDto,
} from '../models/gps-tracking-configuration.model';

@Injectable({ providedIn: 'root' })
export class GpsTrackingConfigurationService {
  private readonly api = `${environment.api}/tenant/gps-tracking/configurations`;

  constructor(private http: HttpClient) {}

  list(): Observable<GpsTrackingConfiguration[]> {
    return this.http.get<GpsTrackingConfiguration[] | { data: GpsTrackingConfiguration[] }>(this.api).pipe(
      map((response) => (Array.isArray(response) ? response : response?.data ?? []))
    );
  }

  create(data: CreateGpsTrackingConfigurationDto): Observable<GpsTrackingConfiguration> {
    return this.http.post<GpsTrackingConfiguration>(this.api, data);
  }

  update(id: string, data: UpdateGpsTrackingConfigurationDto): Observable<GpsTrackingConfiguration> {
    return this.http.patch<GpsTrackingConfiguration>(`${this.api}/${id}`, data);
  }

  activate(id: string): Observable<GpsTrackingConfiguration> {
    return this.http.post<GpsTrackingConfiguration>(`${this.api}/${id}/activate`, {});
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  test(payload: {
    configuration_id?: string;
    username?: string;
    password?: string;
  }): Observable<GpsTrackingTestResult> {
    return this.http.post<GpsTrackingTestResult>(`${this.api}/test`, payload);
  }
}
