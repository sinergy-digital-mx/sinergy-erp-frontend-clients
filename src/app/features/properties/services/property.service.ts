import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Property,
  CreatePropertyDto,
  UpdatePropertyDto,
  MeasurementUnit,
  PropertyListFilters,
  PropertyStats,
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

  private setIfPresent(params: HttpParams, key: string, value: unknown): HttpParams {
    if (value === undefined || value === null || value === '') {
      return params;
    }
    return params.set(key, String(value));
  }
}
