import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Contract,
  ContractListFilters,
  CreateContractDto,
  UpdateContractDto,
  ContractStats,
} from '../models/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getContracts(params?: ContractListFilters): Observable<any> {
    return this.http.get<any>(`${this.api}/tenant/contracts`, {
      params: this.buildParams(params, true),
    });
  }

  getContract(id: string): Observable<Contract> {
    return this.http.get<Contract>(`${this.api}/tenant/contracts/${id}`);
  }

  getContractByNumber(contractNumber: string): Observable<Contract> {
    return this.http.get<Contract>(`${this.api}/tenant/contracts/by-number/${contractNumber}`);
  }

  /** KPIs del mismo alcance que la tabla (sin page/limit). */
  getContractStats(filters?: ContractListFilters): Observable<ContractStats> {
    return this.http.get<ContractStats>(`${this.api}/tenant/contracts/stats`, {
      params: this.buildParams(filters, false),
    });
  }

  createContract(data: CreateContractDto): Observable<Contract> {
    return this.http.post<Contract>(`${this.api}/tenant/contracts`, data);
  }

  updateContract(id: string, data: UpdateContractDto): Observable<Contract> {
    return this.http.put<Contract>(`${this.api}/tenant/contracts/${id}`, data);
  }

  deleteContract(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/contracts/${id}`);
  }

  exportToExcel(filters?: ContractListFilters): Observable<Blob> {
    return this.http.get(`${this.api}/tenant/contracts/export/excel`, {
      params: this.buildParams(filters, false),
      responseType: 'blob',
    });
  }

  getContractStatement(id: string): Observable<Blob> {
    return this.http.get(`${this.api}/tenant/contracts/${id}/pdf`, {
      responseType: 'blob',
    });
  }

  private buildParams(filters?: ContractListFilters, includePagination = false): HttpParams {
    let params = new HttpParams();
    if (!filters) {
      return params;
    }

    params = this.setIfPresent(params, 'group_id', filters.group_id);
    params = this.setIfPresent(params, 'search', filters.search);
    params = this.setIfPresent(params, 'status', filters.status);
    if (filters.hasOverdue === true || filters.hasOverdue === 'true') {
      params = params.set('hasOverdue', 'true');
    }
    params = this.setIfPresent(params, 'customerId', filters.customerId);
    params = this.setIfPresent(params, 'propertyId', filters.propertyId);

    if (includePagination) {
      params = this.setIfPresent(params, 'page', filters.page);
      params = this.setIfPresent(params, 'limit', filters.limit);
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
