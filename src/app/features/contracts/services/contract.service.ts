import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Contract, CreateContractDto, UpdateContractDto, ContractStats, ContractStatsResponse } from '../models/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getContracts(params?: any): Observable<any> {
    return this.http.get<any>(`${this.api}/tenant/contracts`, { params });
  }

  getContract(id: string): Observable<Contract> {
    return this.http.get<Contract>(`${this.api}/tenant/contracts/${id}`);
  }

  getContractByNumber(contractNumber: string): Observable<Contract> {
    return this.http.get<Contract>(`${this.api}/tenant/contracts/by-number/${contractNumber}`);
  }

  getContractStats(): Observable<ContractStats> {
    return this.http.get<ContractStats>(`${this.api}/tenant/contracts/stats`);
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
}
