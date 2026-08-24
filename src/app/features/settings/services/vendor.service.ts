import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  Vendor,
  CreateVendorDto,
  UpdateVendorDto,
  VendorListResponse,
  VendorQueryParams,
  VendorsExportFilters,
} from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private api = environment.api;
  private http = inject(HttpClient);
  private router = inject(Router);

  getVendors(params?: VendorQueryParams): Observable<VendorListResponse> {
    return this.http.get<VendorListResponse>(`${this.api}/tenant/vendors`, { params: params as any });
  }

  getVendor(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.api}/tenant/vendors/${id}`);
  }

  createVendor(data: CreateVendorDto): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.api}/tenant/vendors`, data);
  }

  updateVendor(id: string, data: UpdateVendorDto): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.api}/tenant/vendors/${id}`, data);
  }

  deleteVendor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/tenant/vendors/${id}`);
  }

  exportVendorsExcel(
    filters: VendorsExportFilters = {}
  ): Observable<{ blob: Blob; filename: string }> {
    let params = new HttpParams();
    const entries: [keyof VendorsExportFilters, string | undefined][] = [
      ['search', filters.search],
      ['status', filters.status],
      ['vendor_type', filters.vendor_type],
      ['state', filters.state],
      ['country', filters.country],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    }

    return this.http
      .get(`${this.api}/tenant/vendors/export/excel`, {
        params,
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const disposition = response.headers.get('content-disposition') ?? undefined;
          const filename =
            this.parseFilenameFromDisposition(disposition) ??
            `proveedores-${new Date().toISOString().slice(0, 10)}.xlsx`;

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
    if (error.status === 403) {
      return throwError(() => new Error('No tienes permiso para exportar'));
    }
    if (error.status === 401) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('Sesión expirada. Por favor, inicia sesión nuevamente.'));
    }

    if (error.error instanceof Blob && typeof error.error.text === 'function') {
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
            // El cuerpo no es JSON
          }

          return throwError(() => new Error(message || 'No se pudo generar el reporte'));
        })
      );
    }

    return throwError(() => new Error('No se pudo generar el reporte'));
  }
}
