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

  setStampingEnvironment(environmentName: FinkokEnvironment): Observable<FinkokEnvironment> {
    return this.http.patch<unknown>(`${this.baseUrl}/stamping-environment`, {
      environment: environmentName,
    }).pipe(
      map((response) => {
        const body = this.unwrap(response);
        return this.readEnvironment(body['stamping_environment'] ?? body['environment']) || environmentName;
      })
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
        stamping_environment: this.readEnvironment(body['stamping_environment']) || 'demo',
        environments: {
          demo: this.asEnvironmentConfig(environments['demo'], 'demo'),
          production: this.asEnvironmentConfig(environments['production'], 'production'),
        },
      };
    }

    // PATCH u otra respuesta sin filas de credenciales: no inventar un form único.
    if (!this.hasCredentialFields(body)) {
      return {
        stamping_environment: this.readEnvironment(body['stamping_environment'] ?? body['environment']) || 'demo',
        environments: { demo: null, production: null },
      };
    }

    const env = this.readEnvironment(body['environment']) || 'demo';
    const legacyConfig = body as unknown as FinkokEnvironmentConfig;
    return {
      stamping_environment: this.readEnvironment(body['stamping_environment']) || env,
      environments: {
        demo: env === 'demo' ? legacyConfig : null,
        production: env === 'production' ? legacyConfig : null,
      },
    };
  }

  private asEnvironmentConfig(value: unknown, environment: FinkokEnvironment): FinkokEnvironmentConfig | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return null;
    }
    return { ...(value as FinkokEnvironmentConfig), environment };
  }

  private hasCredentialFields(body: Record<string, unknown>): boolean {
    return (
      body['finkok_username'] != null ||
      body['has_password'] != null ||
      body['is_active'] != null
    );
  }

  private readEnvironment(value: unknown): FinkokEnvironment | null {
    return value === 'demo' || value === 'production' ? value : null;
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
