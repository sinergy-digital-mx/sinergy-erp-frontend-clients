import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  ApiEnvelope,
  CreateTruckDto,
  Truck,
  TruckListResponse,
  TruckQueryParams,
  UpdateTruckDto,
} from '../models/truck.model';

@Injectable({ providedIn: 'root' })
export class TruckService {
  private readonly baseUrl = `${environment.api}/tenant/trucks`;

  constructor(private http: HttpClient) {}

  getTrucks(params?: TruckQueryParams): Observable<TruckListResponse> {
    const httpParams: Record<string, string | number> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== '') {
          httpParams[key] = value as string | number;
        }
      }
    }

    return this.http.get<any>(this.baseUrl, { params: httpParams }).pipe(
      map((response) => this.normalizeList(response, params))
    );
  }

  getTruck(id: string): Observable<Truck> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map((response) => this.unwrapTruck(response))
    );
  }

  createTruck(data: CreateTruckDto): Observable<{ truck: Truck; message?: string }> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      map((response) => ({
        truck: this.unwrapTruck(response),
        message: response?.message,
      }))
    );
  }

  updateTruck(id: string, data: UpdateTruckDto): Observable<{ truck: Truck; message?: string }> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => ({
        truck: this.unwrapTruck(response),
        message: response?.message,
      }))
    );
  }

  deleteTruck(id: string): Observable<{ message?: string }> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map((response) => ({ message: response?.message }))
    );
  }

  /** Sube o reemplaza foto. FormData campo `file`. Requiere Truck + Update. */
  uploadTruckPhoto(id: string, file: File): Observable<Truck> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.baseUrl}/${id}/photo`, formData).pipe(
      map((response) => this.unwrapTruck(response))
    );
  }

  /** Envelope `{ data: truck }` o el camión plano. No recorta keys. */
  private unwrapTruck(response: ApiEnvelope<Truck> | Truck | unknown): Truck {
    const raw = response as Record<string, unknown> | null;
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return raw as unknown as Truck;
    }

    const inner = raw['data'];
    const looksLikeTruck =
      inner &&
      typeof inner === 'object' &&
      !Array.isArray(inner) &&
      ('id' in inner || 'placa' in inner || 'name' in inner || 'serial_number' in inner);
    const entity = looksLikeTruck
      ? (inner as Record<string, unknown>)
      : raw;

    return this.normalizeTruck(entity, raw);
  }

  private normalizeTruck(
    entity: Record<string, unknown>,
    envelope?: Record<string, unknown>
  ): Truck {
    const source = Object.prototype.hasOwnProperty.call(entity, 'serial_number')
      ? entity
      : envelope && Object.prototype.hasOwnProperty.call(envelope, 'serial_number')
        ? envelope
        : null;
    const serial = source?.['serial_number'];
    return {
      ...entity,
      ...(source
        ? {
            serial_number:
              serial == null || String(serial).trim() === '' ? null : String(serial),
          }
        : {}),
    } as Truck;
  }

  private normalizeList(response: any, params?: TruckQueryParams): TruckListResponse {
    const defaultLimit = params?.limit ?? 20;

    if (Array.isArray(response)) {
      return {
        data: response.map((row) => this.normalizeTruck(row)),
        total: response.length,
        page: 1,
        limit: defaultLimit,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      };
    }

    const rows = Array.isArray(response?.data) ? response.data : [];
    const data = rows.map((row: Record<string, unknown>) => this.normalizeTruck(row));
    const page = Number(response?.page) || params?.page || 1;
    const limit = Number(response?.limit) || params?.limit || defaultLimit;
    const total = Number(response?.total) || data.length;
    const totalPages =
      Number(response?.totalPages) || (total > 0 ? Math.ceil(total / limit) : 1);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNext: response?.hasNext ?? page < totalPages,
      hasPrev: response?.hasPrev ?? page > 1,
    };
  }
}
