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
      map((response) => this.unwrap(response))
    );
  }

  createTruck(data: CreateTruckDto): Observable<{ truck: Truck; message?: string }> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      map((response) => ({
        truck: this.unwrap(response),
        message: response?.message,
      }))
    );
  }

  updateTruck(id: string, data: UpdateTruckDto): Observable<{ truck: Truck; message?: string }> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => ({
        truck: this.unwrap(response),
        message: response?.message,
      }))
    );
  }

  deleteTruck(id: string): Observable<{ message?: string }> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map((response) => ({ message: response?.message }))
    );
  }

  private unwrap(response: ApiEnvelope<Truck> | Truck): Truck {
    if (response && typeof response === 'object' && 'data' in response && response.data) {
      return response.data;
    }
    return response as Truck;
  }

  private normalizeList(response: any, params?: TruckQueryParams): TruckListResponse {
    const defaultLimit = params?.limit ?? 20;

    if (Array.isArray(response)) {
      return {
        data: response,
        total: response.length,
        page: 1,
        limit: defaultLimit,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      };
    }

    const data = response?.data ?? [];
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
