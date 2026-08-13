import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomerGroupFetchService } from '../../customers/services/customer-group-fetch.service';
import {
  CreateCustomerGroupDto,
  CustomerGroupAdmin,
  UpdateCustomerGroupDto,
} from '../models/customer-group-admin.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerGroupAdminService {
  private readonly apiUrl = `${environment.api}/tenant/customer-groups`;

  constructor(
    private http: HttpClient,
    private customerGroupFetchService: CustomerGroupFetchService
  ) {}

  getCustomerGroups(): Observable<CustomerGroupAdmin[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      map((response) => this.normalizeList(response))
    );
  }

  getCustomerGroup(id: string): Observable<CustomerGroupAdmin> {
    return this.http.get<CustomerGroupAdmin>(`${this.apiUrl}/${id}`);
  }

  createCustomerGroup(payload: CreateCustomerGroupDto): Observable<CustomerGroupAdmin> {
    return this.http.post<CustomerGroupAdmin>(this.apiUrl, payload).pipe(
      tap(() => this.customerGroupFetchService.invalidateCache())
    );
  }

  updateCustomerGroup(id: string, payload: UpdateCustomerGroupDto): Observable<CustomerGroupAdmin> {
    return this.http.put<CustomerGroupAdmin>(`${this.apiUrl}/${id}`, payload).pipe(
      tap(() => this.customerGroupFetchService.invalidateCache())
    );
  }

  deleteCustomerGroup(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.customerGroupFetchService.invalidateCache())
    );
  }

  private normalizeList(response: unknown): CustomerGroupAdmin[] {
    let rows: CustomerGroupAdmin[] = [];
    if (Array.isArray(response)) {
      rows = response as CustomerGroupAdmin[];
    } else if (response && typeof response === 'object') {
      const obj = response as Record<string, unknown>;
      const candidates = [obj['data'], obj['groups'], obj['items']];
      for (const candidate of candidates) {
        if (Array.isArray(candidate)) {
          rows = candidate as CustomerGroupAdmin[];
          break;
        }
      }
    }
    return rows.map((group) => ({
      ...group,
      is_system: !!group.is_system,
      customer_count: group.customer_count ?? 0,
    }));
  }
}
