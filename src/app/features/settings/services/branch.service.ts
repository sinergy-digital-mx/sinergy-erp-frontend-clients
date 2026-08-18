import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Branch, CreateBranchDto, UpdateBranchDto } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = `${environment.api}/tenant`;

  constructor(private http: HttpClient) {}

  // Trae todas las sucursales de la organización (para selects/dropdowns)
  getAllBranches(): Observable<Branch[]> {
    return this.http.get<any>(`${this.apiUrl}/billing/branches`).pipe(
      map((res) => (Array.isArray(res) ? res : res?.data ?? []) as Branch[])
    );
  }

  // CRUD por fiscal config
  getBranches(fiscalConfigId: string): Observable<Branch[]> {
    return this.http.get<unknown>(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches`).pipe(
      map((res) => this.unwrapBranchList(res))
    );
  }

  getBranch(fiscalConfigId: string, branchId: string): Observable<Branch> {
    return this.http.get<unknown>(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`).pipe(
      map((res) => this.unwrapBranch(res))
    );
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

  private unwrapBranchList(res: unknown): Branch[] {
    if (Array.isArray(res)) return res as Branch[];
    if (res && typeof res === 'object' && Array.isArray((res as { data?: unknown }).data)) {
      return (res as { data: Branch[] }).data;
    }
    return [];
  }

  private unwrapBranch(res: unknown): Branch {
    if (res && typeof res === 'object' && 'data' in res) {
      const inner = (res as { data: unknown }).data;
      if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
        return inner as Branch;
      }
    }
    return res as Branch;
  }
}
