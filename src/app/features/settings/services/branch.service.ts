import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Branch, CreateBranchDto, UpdateBranchDto } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = `${environment.api}/tenant`;

  constructor(private http: HttpClient) {}

  // Trae todas las sucursales del tenant (para selects/dropdowns)
  getAllBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}/billing/branches`);
  }

  // CRUD por fiscal config
  getBranches(fiscalConfigId: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches`);
  }

  getBranch(fiscalConfigId: string, branchId: string): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`);
  }

  createBranch(fiscalConfigId: string, data: CreateBranchDto): Observable<Branch> {
    return this.http.post<Branch>(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches`, data);
  }

  updateBranch(fiscalConfigId: string, branchId: string, data: UpdateBranchDto): Observable<Branch> {
    return this.http.put<Branch>(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`, data);
  }

  deleteBranch(fiscalConfigId: string, branchId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`);
  }
}
