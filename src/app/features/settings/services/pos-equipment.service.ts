import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PosEquipment, CreatePosEquipmentDto, UpdatePosEquipmentDto, PosEquipmentListResponse, PosEquipmentQueryParams } from '../models/pos-equipment.model';

@Injectable({
  providedIn: 'root'
})
export class PosEquipmentService {

  private api = environment.api;

  constructor(private http: HttpClient) {}

  getPosEquipments(params?: PosEquipmentQueryParams): Observable<PosEquipmentListResponse> {
    return this.http.get<PosEquipmentListResponse>(`${this.api}/tenant/pos-equipments`, { params: params as any });
  }

  getPosEquipment(id: string): Observable<PosEquipment> {
    return this.http.get<PosEquipment>(`${this.api}/tenant/pos-equipments/${id}`);
  }

  createPosEquipment(data: CreatePosEquipmentDto): Observable<PosEquipment> {
    return this.http.post<PosEquipment>(`${this.api}/tenant/pos-equipments`, data);
  }

  updatePosEquipment(id: string, data: UpdatePosEquipmentDto): Observable<PosEquipment> {
    return this.http.put<PosEquipment>(`${this.api}/tenant/pos-equipments/${id}`, data);
  }

  deletePosEquipment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/pos-equipments/${id}`);
  }
}
