import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  FiscalConfiguration,
  CreateFiscalConfigurationDto,
  UpdateFiscalConfigurationDto,
  FiscalConfigurationListResponse,
  FiscalConfigurationQueryParams
} from '../models/fiscal-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class FiscalConfigurationService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  createFiscalConfiguration(dto: CreateFiscalConfigurationDto): Observable<FiscalConfiguration> {
    return this.http.post<FiscalConfiguration>(`${this.api}/tenant/fiscal-configurations`, dto);
  }

  getFiscalConfiguration(id: string): Observable<FiscalConfiguration> {
    return this.http.get<FiscalConfiguration>(`${this.api}/tenant/fiscal-configurations/${id}`);
  }

  getFiscalConfigurationByWarehouse(warehouseId: string): Observable<FiscalConfiguration> {
    return this.http.get<FiscalConfiguration>(`${this.api}/tenant/fiscal-configurations/warehouse/${warehouseId}`);
  }

  listFiscalConfigurations(params?: FiscalConfigurationQueryParams): Observable<FiscalConfigurationListResponse> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
      if (params.warehouse_id) httpParams = httpParams.set('warehouse_id', params.warehouse_id);
      if (params.status) httpParams = httpParams.set('status', params.status);
    }

    return this.http.get<FiscalConfigurationListResponse>(`${this.api}/tenant/fiscal-configurations`, { params: httpParams });
  }

  updateFiscalConfiguration(id: string, dto: UpdateFiscalConfigurationDto): Observable<FiscalConfiguration> {
    return this.http.put<FiscalConfiguration>(`${this.api}/tenant/fiscal-configurations/${id}`, dto);
  }

  deleteFiscalConfiguration(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/fiscal-configurations/${id}`);
  }
}
