import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Property, CreatePropertyDto, UpdatePropertyDto, MeasurementUnit } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getProperties(params?: any): Observable<any> {
    return this.http.get(`${this.api}/tenant/properties`, { params });
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
}
