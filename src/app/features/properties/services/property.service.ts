import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  Property,
  CreatePropertyDto,
  UpdatePropertyDto,
  MeasurementUnit,
  PropertyListFilters,
  PropertyStats,
  PropertyImportJob,
  PropertyImportJobStatus,
  PropertyImportResult,
} from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getProperties(params?: PropertyListFilters): Observable<any> {
    return this.http.get(`${this.api}/tenant/properties`, {
      params: this.buildParams(params, true),
    });
  }

  /** KPIs del mismo alcance que la tabla (sin page/limit). */
  getPropertyStats(filters?: PropertyListFilters): Observable<PropertyStats> {
    return this.http.get<PropertyStats>(`${this.api}/tenant/properties/stats`, {
      params: this.buildParams(filters, false),
    });
  }

  getProperty(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.api}/tenant/properties/${id}`);
  }

  getPropertyByCode(code: string): Observable<Property> {
    return this.http.get<Property>(`${this.api}/tenant/properties/by-code/${code}`);
  }

  createProperty(data: CreatePropertyDto): Observable<Property> {
    return this.http.post<Property>(`${this.api}/tenant/properties`, data);
  }

  updateProperty(id: string, data: UpdatePropertyDto): Observable<Property> {
    return this.http.put<Property>(`${this.api}/tenant/properties/${id}`, data);
  }

  deleteProperty(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/properties/${id}`);
  }

  downloadImportTemplate(): Observable<{ blob: Blob; filename: string }> {
    return this.http
      .get(`${this.api}/tenant/properties/import/template`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => ({
          blob: response.body as Blob,
          filename: 'plantilla-lotes.xlsx',
        })),
      );
  }

  startImport(file: File, groupId: string): Observable<PropertyImportJob> {
    const body = new FormData();
    body.append('file', file);
    body.append('group_id', groupId);
    return this.http
      .post<unknown>(`${this.api}/tenant/properties/import`, body)
      .pipe(map((response) => this.unwrapImportJob(response)));
  }

  getImportJob(jobId: string): Observable<PropertyImportJob> {
    return this.http
      .get<unknown>(`${this.api}/tenant/properties/import/jobs/${jobId}`)
      .pipe(map((response) => this.unwrapImportJob(response)));
  }

  getMeasurementUnits(): Observable<MeasurementUnit[]> {
    return this.http.get<MeasurementUnit[]>(`${this.api}/tenant/properties/measurement-units/all`);
  }

  private buildParams(filters?: PropertyListFilters, includePagination = false): HttpParams {
    let params = new HttpParams();
    if (!filters) {
      return params;
    }

    params = this.setIfPresent(params, 'group_id', filters.group_id);
    params = this.setIfPresent(params, 'status', filters.status);
    params = this.setIfPresent(params, 'search', filters.search);

    if (includePagination) {
      params = this.setIfPresent(params, 'page', filters.page);
      params = this.setIfPresent(params, 'limit', filters.limit);
      params = this.setIfPresent(params, 'sort', filters.sort);
      params = this.setIfPresent(params, 'order', filters.order);
    }

    return params;
  }

  private unwrapImportJob(response: unknown): PropertyImportJob {
    const raw = this.unwrapData(response);
    const job = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
    const resultRaw = job['result'];
    const result =
      resultRaw && typeof resultRaw === 'object'
        ? { created: Number((resultRaw as { created?: unknown }).created ?? 0) || 0 }
        : null;
    return {
      id: String(job['id'] ?? ''),
      status: this.normalizeJobStatus(job['status']),
      total: Number(job['total'] ?? 0) || 0,
      processed: Number(job['processed'] ?? 0) || 0,
      percent: Number(job['percent'] ?? 0) || 0,
      current_code: job['current_code'] != null ? String(job['current_code']) : null,
      message: job['message'] != null ? String(job['message']) : null,
      result,
      error: job['error'] != null ? String(job['error']) : null,
    };
  }

  private unwrapData(response: unknown): unknown {
    if (response && typeof response === 'object' && 'data' in response) {
      const data = (response as { data: unknown }).data;
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return data;
      }
    }
    return response;
  }

  private normalizeJobStatus(value: unknown): PropertyImportJobStatus {
    const status = String(value ?? '').toLowerCase();
    if (status === 'queued' || status === 'processing' || status === 'completed' || status === 'failed') {
      return status;
    }
    return 'queued';
  }

  private setIfPresent(params: HttpParams, key: string, value: unknown): HttpParams {
    if (value === undefined || value === null || value === '') {
      return params;
    }
    return params.set(key, String(value));
  }
}
