import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  PosConfiguration,
  CreatePosConfigurationDto,
  UpdatePosConfigurationDto,
  PosConfigurationListResponse,
  PosConfigurationQueryParams,
} from '../models/pos-equipment.model';

@Injectable({
  providedIn: 'root',
})
export class PosEquipmentService {
  private readonly baseUrl = `${environment.api}/tenant/pos-configurations`;

  constructor(private http: HttpClient) {}

  getPosConfigurations(
    params?: PosConfigurationQueryParams
  ): Observable<PosConfigurationListResponse> {
    return this.http.get<PosConfigurationListResponse>(this.baseUrl, {
      params: params as any,
    });
  }

  getPosConfiguration(id: string): Observable<PosConfiguration> {
    return this.http.get<PosConfiguration>(`${this.baseUrl}/${id}`);
  }

  createPosConfiguration(
    data: CreatePosConfigurationDto
  ): Observable<PosConfiguration> {
    return this.http.post<PosConfiguration>(this.baseUrl, data);
  }

  updatePosConfiguration(
    id: string,
    data: UpdatePosConfigurationDto
  ): Observable<PosConfiguration> {
    return this.http.put<PosConfiguration>(`${this.baseUrl}/${id}`, data);
  }

  deletePosConfiguration(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /** @deprecated use getPosConfigurations */
  getPosEquipments(params?: PosConfigurationQueryParams) {
    return this.getPosConfigurations(params);
  }

  /** @deprecated use getPosConfiguration */
  getPosEquipment(id: string) {
    return this.getPosConfiguration(id);
  }

  /** @deprecated use createPosConfiguration */
  createPosEquipment(data: CreatePosConfigurationDto) {
    return this.createPosConfiguration(data);
  }

  /** @deprecated use updatePosConfiguration */
  updatePosEquipment(id: string, data: UpdatePosConfigurationDto) {
    return this.updatePosConfiguration(id, data);
  }

  /** @deprecated use deletePosConfiguration */
  deletePosEquipment(id: string) {
    return this.deletePosConfiguration(id);
  }
}
