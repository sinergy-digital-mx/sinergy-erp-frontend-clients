import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from, of, tap, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  getRegistrationUserStatusCode,
  isActiveRegistrationUser,
} from '../../features/customers/utils/customer-registration.util';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  CheckCustomerDuplicatesDto,
  CustomerCreditsUpdateItem,
  CustomerDuplicatesResponse,
  CustomerFiscalCredit,
  CustomerRegistrationFiscalOption,
  CustomerRegistrationOptions,
  CustomerRegistrationSellerOption,
  CustomerRegistrationUserOption,
  CustomerStatus,
  UpdateCustomerDto,
} from '../../features/customers/models/customer-group.model';

export interface CustomersExportFilters {
  search?: string;
  status_id?: number | string;
  group_id?: string;
}


type UserStatusCatalogItem = { id: number; code: string };

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  api = environment.api;
  private statusesCache: CustomerStatus[] | null = null;
  private userStatusCatalogCache: UserStatusCatalogItem[] | null = null;


  constructor(private router: Router, public http: HttpClient, public activated_route: ActivatedRoute) {
    
  }

  getCustomerStatuses(force = false): Observable<CustomerStatus[]> {
    if (this.statusesCache && !force) {
      return of(this.statusesCache);
    }
    return this.http
      .get<CustomerStatus[]>(`${this.api}/tenant/customers/statuses`)
      .pipe(tap((list) => {
        this.statusesCache = Array.isArray(list) ? list : [];
      }));
  }


  getCustomers(params: any): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers`, {
      params
    });
  }

  getCustomer(id: string, options?: { fiscal_configuration_id?: string }): Observable<any> {
    let params = new HttpParams();
    if (options?.fiscal_configuration_id) {
      params = params.set('fiscal_configuration_id', options.fiscal_configuration_id);
    }
    return this.http.get(`${this.api}/tenant/customers/${id}`, { params });
  }

  getCustomerCredits(id: string): Observable<CustomerFiscalCredit[]> {
    return this.http.get<unknown>(`${this.api}/tenant/customers/${id}/credits`).pipe(
      map((raw) => this.unwrapCredits(raw))
    );
  }

  updateCustomerCredits(id: string, credits: CustomerCreditsUpdateItem[]): Observable<CustomerFiscalCredit[]> {
    return this.http
      .put<unknown>(`${this.api}/tenant/customers/${id}/credits`, { credits })
      .pipe(map((raw) => this.unwrapCredits(raw)));
  }

  private unwrapCredits(raw: unknown): CustomerFiscalCredit[] {
    if (Array.isArray(raw)) {
      return raw as CustomerFiscalCredit[];
    }
    if (raw && typeof raw === 'object') {
      const root = raw as Record<string, unknown>;
      const nested = root['credits'] ?? root['data'];
      if (Array.isArray(nested)) {
        return nested as CustomerFiscalCredit[];
      }
      if (nested && typeof nested === 'object') {
        const inner = (nested as Record<string, unknown>)['credits'];
        if (Array.isArray(inner)) {
          return inner as CustomerFiscalCredit[];
        }
      }
    }
    return [];
  }

  getCustomerAddresses(id: string): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers/${id}/addresses`);
  }

  createCustomerAddress(customerId: string, data: Partial<any>): Observable<any> {
    return this.http.post(`${this.api}/tenant/customers/${customerId}/addresses`, data);
  }

  updateCustomerAddress(customerId: string, addressId: string | number, data: Partial<any>): Observable<any> {
    return this.http.put(`${this.api}/tenant/customers/${customerId}/addresses/${addressId}`, data);
  }

  getCustomerActivities(id: string, page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers/${id}/activities`, {
      params: { page, limit }
    });
  }

  updateCustomer(id: string, data: UpdateCustomerDto): Observable<any> {
    return this.http.put(`${this.api}/tenant/customers/${id}`, data);
  }

  createCustomer(data: any): Observable<any> {
    return this.http.post(`${this.api}/tenant/customers`, data);
  }

  getRegistrationOptions(): Observable<CustomerRegistrationOptions> {
    return this.getAssignableUserStatuses().pipe(
      switchMap((statuses) =>
        this.http.get<unknown>(`${this.api}/tenant/customers/registration-options`).pipe(
          switchMap((response) => {
            const options = this.normalizeRegistrationOptions(response, statuses);
            if (!this.registrationOptionsNeedActiveIntersect(response, statuses)) {
              return of(options);
            }
            const activeId = statuses.find((item) => item.code === 'active')?.id;
            return this.getActiveUserIdSet(activeId).pipe(
              map((activeIds) => {
                if (!activeIds) {
                  return options;
                }
                return {
                  ...options,
                  users: options.users.filter((user) => activeIds.has(user.id)),
                  sellers: options.sellers.filter((seller) => activeIds.has(seller.id)),
                };
              })
            );
          })
        )
      )
    );
  }

  checkCustomerDuplicates(
    payload: CheckCustomerDuplicatesDto
  ): Observable<CustomerDuplicatesResponse> {
    return this.http
      .post<unknown>(`${this.api}/tenant/customers/duplicates`, payload)
      .pipe(map((response) => this.normalizeDuplicatesResponse(response)));
  }

  exportCustomersExcel(
    filters: CustomersExportFilters
  ): Observable<{ blob: Blob; filename: string }> {
    let params = new HttpParams();
    const entries: [keyof CustomersExportFilters, string | number | undefined][] = [
      ['search', filters.search],
      ['status_id', filters.status_id],
      ['group_id', filters.group_id],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    }

    return this.http
      .get(`${this.api}/tenant/customers/export/excel`, {
        params,
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const disposition = response.headers.get('content-disposition') ?? undefined;
          const filename =
            this.parseFilenameFromDisposition(disposition) ??
            `clientes-${new Date().toISOString().slice(0, 10)}.xlsx`;

          return { blob: response.body as Blob, filename };
        }),
        catchError((error) => this.handleExportError(error))
      );
  }

  private parseFilenameFromDisposition(header?: string): string | null {
    if (!header) {
      return null;
    }
    const utfMatch = /filename\*=UTF-8''([^;]+)/i.exec(header);
    if (utfMatch?.[1]) {
      try {
        return decodeURIComponent(utfMatch[1].trim());
      } catch {
        return utfMatch[1].trim();
      }
    }
    const match = /filename="([^"]+)"/i.exec(header) ?? /filename=([^;]+)/i.exec(header);
    return match?.[1]?.trim().replace(/^["']|["']$/g, '') ?? null;
  }

  private handleExportError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof Blob) {
      return from(error.error.text()).pipe(
        switchMap((text) => {
          let message = '';
          try {
            const json = JSON.parse(text) as { message?: string | string[] };
            if (Array.isArray(json.message)) {
              message = json.message.join(', ');
            } else if (typeof json.message === 'string') {
              message = json.message;
            }
          } catch {
            // not JSON
          }

          if (error.status === 403) {
            return throwError(() => new Error(message || 'No tienes permiso para exportar'));
          }
          if (error.status === 401) {
            this.router.navigate(['/auth/login']);
            return throwError(() => new Error('Sesión expirada. Por favor, inicia sesión nuevamente.'));
          }

          return throwError(() => new Error(message || 'No se pudo generar el reporte'));
        })
      );
    }

    if (error.status === 403) {
      return throwError(() => new Error('No tienes permiso para exportar'));
    }

    return throwError(() => new Error('No se pudo generar el reporte'));
  }

  private getAssignableUserStatuses(): Observable<UserStatusCatalogItem[]> {
    if (this.userStatusCatalogCache) {
      return of(this.userStatusCatalogCache);
    }
    return this.http.get<unknown>(`${this.api}/tenant/users/statuses`).pipe(
      map((res) => {
        const root = res && typeof res === 'object' ? (res as Record<string, unknown>) : {};
        const list = Array.isArray(res) ? res : root['data'] ?? root['statuses'] ?? [];
        const statuses = (Array.isArray(list) ? list : [])
          .map((item) => {
            const row = (item ?? {}) as Record<string, unknown>;
            return {
              id: Number(row['id']),
              code: String(row['code'] ?? '').trim().toLowerCase(),
            };
          })
          .filter((item) => Number.isFinite(item.id) && !!item.code);
        this.userStatusCatalogCache = statuses;
        return statuses;
      }),
      catchError(() => of([] as UserStatusCatalogItem[]))
    );
  }

  private getActiveUserIdSet(activeStatusId?: number): Observable<Set<string> | null> {
    let params = new HttpParams();
    if (activeStatusId != null) {
      params = params.set('status_id', String(activeStatusId));
    }
    return this.http.get<unknown>(`${this.api}/tenant/users`, { params }).pipe(
      map((res) => {
        const ids = new Set<string>();
        for (const user of this.extractArrayPayload(res)) {
          const id = String((user as Record<string, unknown>)['id'] ?? '').trim();
          if (!id) {
            continue;
          }
          if (activeStatusId == null && isActiveRegistrationUser(user) === false) {
            continue;
          }
          ids.add(id);
        }
        return ids;
      }),
      catchError(() => of(null))
    );
  }

  private extractArrayPayload(payload: unknown): unknown[] {
    if (Array.isArray(payload)) {
      return payload;
    }
    if (!payload || typeof payload !== 'object') {
      return [];
    }
    const row = payload as Record<string, unknown>;
    const nested = row['users'] ?? row['data'] ?? row['items'];
    if (Array.isArray(nested)) {
      return nested;
    }
    if (nested && typeof nested === 'object') {
      const inner = (nested as Record<string, unknown>)['users']
        ?? (nested as Record<string, unknown>)['items']
        ?? (nested as Record<string, unknown>)['data'];
      return Array.isArray(inner) ? inner : [];
    }
    return [];
  }

  private registrationOptionsNeedActiveIntersect(
    response: unknown,
    statuses: UserStatusCatalogItem[]
  ): boolean {
    const { rawUsers, rawSellers } = this.extractRegistrationPeople(response);
    const activeIds = this.activeStatusIds(statuses);
    return [...rawUsers, ...rawSellers].some(
      (item) => isActiveRegistrationUser(item, activeIds) === null
    );
  }

  private extractRegistrationPeople(response: unknown): {
    rawFiscals: unknown[];
    rawUsers: unknown[];
    rawSellers: unknown[];
  } {
    const root =
      response && typeof response === 'object' ? (response as Record<string, unknown>) : {};
    const nested =
      root['data'] && typeof root['data'] === 'object' && !Array.isArray(root['data'])
        ? (root['data'] as Record<string, unknown>)
        : root;
    return {
      rawFiscals: Array.isArray(nested['fiscal_configurations'])
        ? nested['fiscal_configurations']
        : [],
      rawUsers: Array.isArray(nested['users']) ? nested['users'] : [],
      rawSellers: Array.isArray(nested['sellers']) ? nested['sellers'] : [],
    };
  }

  private activeStatusIds(statuses: UserStatusCatalogItem[]): number[] {
    return statuses.filter((item) => item.code === 'active').map((item) => item.id);
  }

  private normalizeRegistrationOptions(
    response: unknown,
    statuses: UserStatusCatalogItem[] = []
  ): CustomerRegistrationOptions {
    const { rawFiscals, rawUsers, rawSellers } = this.extractRegistrationPeople(response);
    const activeIds = this.activeStatusIds(statuses);

    return {
      fiscal_configurations: rawFiscals
        .map((item) => this.normalizeRegistrationFiscal(item))
        .filter((fiscal): fiscal is CustomerRegistrationFiscalOption => !!fiscal),
      users: rawUsers
        .filter((item) => isActiveRegistrationUser(item, activeIds) !== false)
        .map((item) => this.normalizeRegistrationPerson(item))
        .filter((user): user is CustomerRegistrationUserOption => !!user),
      sellers: rawSellers
        .filter((item) => isActiveRegistrationUser(item, activeIds) !== false)
        .map((item) => this.normalizeRegistrationSeller(item))
        .filter((seller): seller is CustomerRegistrationSellerOption => !!seller),
    };
  }

  private normalizeRegistrationFiscal(item: unknown): CustomerRegistrationFiscalOption | null {
    const row = (item ?? {}) as Record<string, unknown>;
    const id = String(row['id'] ?? '').trim();
    if (!id) return null;
    const rawBranches = Array.isArray(row['branches']) ? row['branches'] : [];
    return {
      id,
      razon_social: row['razon_social'] != null ? String(row['razon_social']) : null,
      rfc: row['rfc'] != null ? String(row['rfc']) : null,
      status: row['status'] != null ? String(row['status']) : null,
      branches: rawBranches
        .map((branch) => {
          const b = (branch ?? {}) as Record<string, unknown>;
          const branchId = String(b['id'] ?? '').trim();
          const name = String(b['name'] ?? b['code'] ?? b['display_name'] ?? '').trim();
          return { id: branchId, name: name || branchId };
        })
        .filter((branch) => !!branch.id),
    };
  }

  private normalizeRegistrationPerson(item: unknown): CustomerRegistrationUserOption | null {
    const row = (item ?? {}) as Record<string, unknown>;
    const id = String(row['id'] ?? '').trim();
    if (!id) return null;
    return {
      id,
      first_name: row['first_name'] != null ? String(row['first_name']) : null,
      last_name: row['last_name'] != null ? String(row['last_name']) : null,
      email: row['email'] != null ? String(row['email']) : null,
      status: getRegistrationUserStatusCode(item),
    };
  }

  private normalizeRegistrationSeller(item: unknown): CustomerRegistrationSellerOption | null {
    const person = this.normalizeRegistrationPerson(item);
    if (!person) return null;
    const row = (item ?? {}) as Record<string, unknown>;
    const code = row['pos_user_code'];
    return {
      ...person,
      pos_user_code: code != null && String(code).trim() !== '' ? (code as number | string) : null,
    };
  }

  private normalizeDuplicatesResponse(response: unknown): CustomerDuplicatesResponse {
    const root =
      response && typeof response === 'object' ? (response as Record<string, unknown>) : {};
    const nested =
      root['data'] && typeof root['data'] === 'object' && !Array.isArray(root['data'])
        ? (root['data'] as Record<string, unknown>)
        : root;
    const matches = Array.isArray(nested['matches'])
      ? (nested['matches'] as CustomerDuplicatesResponse['matches'])
      : [];
    return {
      found: nested['found'] === true || matches.length > 0,
      matches,
    };
  }

  // getDetail(id: any): Observable<any> {
  //   return this.http.get(`${this.api}/leads/${id}`);
  // }

  // createLead(params: any): Observable<any> {
  //   return this.http.post(`${this.api}/leads`,params);
  // }

  // updateLead(params: any): Observable<any> {
  //   return this.http.put(`${this.api}/leads/${params.id}`,params);
  // }

  // createActivity(data): Observable<any> {
  //   console.log(data)
  //   return this.http.post(`${this.api}/leads/${data.lead_id}/activities`,data);
  // }

}
