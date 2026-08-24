import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {
  TransferContext,
  CreateTransferDto,
  InventoryTransfer,
  TransferFilters,
  PaginationParams,
  TransferListResponse,
} from '../models/inventory-transfer.model';

function unwrapData<T>(response: any): T {
  if (response == null) return response as T;
  if (Array.isArray(response)) return response as T;
  if (response.data !== undefined && typeof response === 'object') {
    if (
      Array.isArray(response.data) &&
      ('total' in response || 'page' in response || 'totalPages' in response)
    ) {
      return response as T;
    }
    return response.data as T;
  }
  return response as T;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryTransferService {
  private readonly baseUrl = `${environment.api}/tenant/inventory/transfers`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getContext(
    productId: string,
    warehouseId: string,
    uomId?: string
  ): Observable<TransferContext> {
    let params = new HttpParams()
      .set('product_id', productId)
      .set('warehouse_id', warehouseId);

    if (uomId) {
      params = params.set('uom_id', uomId);
    }

    return this.http.get<any>(`${this.baseUrl}/context`, { params }).pipe(
      map((res) => unwrapData<TransferContext>(res)),
      catchError((error) => this.handleError(error))
    );
  }

  createTransfer(data: CreateTransferDto): Observable<InventoryTransfer> {
    return this.http.post<any>(this.baseUrl, data).pipe(
      map((res) => unwrapData<InventoryTransfer>(res)),
      catchError((error) => this.handleError(error))
    );
  }

  getTransfers(
    filters: TransferFilters,
    pagination: PaginationParams
  ): Observable<TransferListResponse> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.search) params = params.set('search', filters.search);
    if (filters.product_id) params = params.set('product_id', filters.product_id);
    if (filters.source_fiscal_configuration_id) {
      params = params.set('source_fiscal_configuration_id', filters.source_fiscal_configuration_id);
    }
    if (filters.source_billing_branch_id) {
      params = params.set('source_billing_branch_id', filters.source_billing_branch_id);
    }
    if (filters.source_warehouse_id) {
      params = params.set('source_warehouse_id', filters.source_warehouse_id);
    }
    if (filters.destination_fiscal_configuration_id) {
      params = params.set('destination_fiscal_configuration_id', filters.destination_fiscal_configuration_id);
    }
    if (filters.destination_billing_branch_id) {
      params = params.set('destination_billing_branch_id', filters.destination_billing_branch_id);
    }
    if (filters.destination_warehouse_id) {
      params = params.set('destination_warehouse_id', filters.destination_warehouse_id);
    }
    if (filters.created_from) params = params.set('created_from', filters.created_from);
    if (filters.created_to) params = params.set('created_to', filters.created_to);

    return this.http.get<any>(this.baseUrl, { params }).pipe(
      map((res) => {
        const envelope = unwrapData<any>(res);
        if (Array.isArray(envelope)) {
          return {
            data: envelope,
            total: envelope.length,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: 1,
          } as TransferListResponse;
        }
        return {
          data: envelope?.data ?? [],
          total: Number(envelope?.total ?? envelope?.data?.length ?? 0),
          page: Number(envelope?.page ?? pagination.page),
          limit: Number(envelope?.limit ?? pagination.limit),
          totalPages: Number(envelope?.totalPages ?? 1),
        } as TransferListResponse;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  getTransferById(id: string): Observable<InventoryTransfer> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map((res) => unwrapData<InventoryTransfer>(res)),
      catchError((error) => this.handleError(error))
    );
  }

  downloadTransferPdf(id: string, folio?: string): Observable<{ blob: Blob; filename: string }> {
    return this.http
      .get(`${this.baseUrl}/${id}/pdf`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const blob = response.body!;
          const header = response.headers.get('content-disposition') || '';
          const fromHeader = this.extractFilename(header);
          const safeFolio = (folio || id).replace(/[^\w.-]+/g, '_');
          return {
            blob,
            filename: fromHeader || `transferencia-${safeFolio}.pdf`,
          };
        }),
        catchError((error) => this.handleError(error))
      );
  }

  private extractFilename(header: string): string | null {
    if (!header) return null;
    const utfMatch = /filename\*=UTF-8''([^;]+)/i.exec(header);
    if (utfMatch?.[1]) {
      try {
        return decodeURIComponent(utfMatch[1].trim());
      } catch {
        return utfMatch[1].trim();
      }
    }
    const match = /filename="([^"]+)"/i.exec(header) ?? /filename=([^;]+)/i.exec(header);
    return match?.[1]?.trim().replace(/^["']|["']$/g, '') || null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    switch (error.status) {
      case 401:
        this.router.navigate(['/auth/login']);
        errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
        break;
      case 403:
        errorMessage = 'No tienes permisos para realizar esta acción';
        break;
      case 404:
        errorMessage = 'Transferencia no encontrada';
        break;
      case 400:
      case 422:
        errorMessage = this.extractErrorMessage(error);
        break;
      case 500:
        errorMessage = 'Error del servidor. Por favor, intenta más tarde';
        break;
      case 0:
        errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet';
        break;
      default:
        errorMessage = 'Ha ocurrido un error inesperado';
    }

    return throwError(() => new Error(errorMessage));
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error?.message === 'string') {
      return error.error.message;
    }
    if (Array.isArray(error.error?.message)) {
      return error.error.message.join(', ');
    }
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat();
      return (errors as string[]).join(', ');
    }
    return 'Error de validación. Por favor, verifica los datos ingresados.';
  }
}
