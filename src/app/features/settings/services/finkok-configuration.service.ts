import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  FinkokConfigurationsResponse,
  FinkokEnvironment,
  FinkokEnvironmentConfig,
  FinkokTestConnectionResult,
  SaveFinkokConfigurationDto,
} from '../models/finkok-configuration.model';

@Injectable({ providedIn: 'root' })
export class FinkokConfigurationService {
  private readonly baseUrl = `${environment.api}/tenant/billing/finkok-configuration`;

  constructor(private http: HttpClient) {}

  getConfiguration(): Observable<FinkokConfigurationsResponse | null> {
    return this.http.get<unknown>(this.baseUrl).pipe(
      map((response) => this.normalizeConfigurations(response))
    );
  }

  saveConfiguration(payload: SaveFinkokConfigurationDto): Observable<FinkokConfigurationsResponse> {
    return this.http.put<unknown>(this.baseUrl, payload).pipe(
      map((response) => this.normalizeConfigurations(response) ?? this.emptyResponse())
    );
  }

  setStampingEnvironment(environmentName: FinkokEnvironment): Observable<FinkokConfigurationsResponse> {
    return this.http.patch<unknown>(`${this.baseUrl}/stamping-environment`, {
      environment: environmentName,
    }).pipe(
      map((response) => this.normalizeConfigurations(response) ?? this.emptyResponse())
    );
  }

  testConnection(environmentName: FinkokEnvironment): Observable<FinkokTestConnectionResult> {
    const params = new HttpParams().set('environment', environmentName);
    return this.http.post<unknown>(`${this.baseUrl}/test-connection`, {}, { params }).pipe(
      map((response) => this.normalizeTestResult(response, environmentName))
    );
  }

  private normalizeConfigurations(response: unknown): FinkokConfigurationsResponse | null {
    const body = this.unwrap(response);
    if (!body || Object.keys(body).length === 0) {
      return null;
    }

    if (body['environments'] && typeof body['environments'] === 'object') {
      const environments = body['environments'] as Record<string, unknown>;
      return {
        stamping_environment: (body['stamping_environment'] as FinkokEnvironment) || 'demo',
        environments: {
          demo: (environments['demo'] as FinkokEnvironmentConfig | null) ?? null,
          production: (environments['production'] as FinkokEnvironmentConfig | null) ?? null,
        },
      };
    }

    // Legacy single-record fallback
    const legacyConfig = body as unknown as FinkokEnvironmentConfig;
    return {
      stamping_environment: (body['environment'] as FinkokEnvironment) || 'demo',
      environments: {
        demo: body['environment'] === 'production' ? null : legacyConfig,
        production: body['environment'] === 'production' ? legacyConfig : null,
      },
    };
  }

  private normalizeTestResult(
    response: unknown,
    environmentName: FinkokEnvironment
  ): FinkokTestConnectionResult {
    const body = this.unwrap(response);
    return {
      environment: (body['environment'] as FinkokEnvironment) || environmentName,
      last_connection_test_status: body['last_connection_test_status'] as FinkokTestConnectionResult['last_connection_test_status'],
      message: typeof body['message'] === 'string' ? body['message'] : undefined,
    };
  }

  private emptyResponse(): FinkokConfigurationsResponse {
    return {
      stamping_environment: 'demo',
      environments: { demo: null, production: null },
    };
  }

  private unwrap(response: unknown): Record<string, unknown> {
    if (!response || typeof response !== 'object') {
      return {};
    }

    const body = response as Record<string, unknown>;
    if (body['data'] && typeof body['data'] === 'object' && !Array.isArray(body['data'])) {
      return body['data'] as Record<string, unknown>;
    }

    return body;
  }
}
