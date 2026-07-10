import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from, of, tap, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CustomerStatus, UpdateCustomerDto } from '../../features/customers/models/customer-group.model';

export interface CustomersExportFilters {
  search?: string;
  status_id?: number | string;
  group_id?: string;
}


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  api = environment.api;
  private statusesCache: CustomerStatus[] | null = null;


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

  getCustomer(id: string): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers/${id}`);
  }

  getCustomerAddresses(id: string): Observable<any> {
    return this.http.get(`${this.api}/tenant/customers/${id}/addresses`);
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
