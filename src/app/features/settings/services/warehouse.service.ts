import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Warehouse, CreateWarehouseDto, UpdateWarehouseDto, WarehouseListResponse, WarehouseQueryParams } from '../models/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getWarehouses(params?: WarehouseQueryParams): Observable<WarehouseListResponse> {
    return this.http.get<WarehouseListResponse>(`${this.api}/tenant/warehouses`, { params: params as any });
  }

  getWarehouse(id: string): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.api}/tenant/warehouses/${id}`);
  }

  createWarehouse(data: CreateWarehouseDto): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.api}/tenant/warehouses`, data);
  }

  updateWarehouse(id: string, data: UpdateWarehouseDto): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.api}/tenant/warehouses/${id}`, data);
  }

  deleteWarehouse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/warehouses/${id}`);
  }
}
