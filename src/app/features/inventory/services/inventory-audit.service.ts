/**
 * Auditorías de inventario: snapshot, conteo, autorización y corrección de existencias por lote.
 * Base: /inventory/audits
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {
  AddAuditLineDto,
  CreateInventoryAuditDto,
  InventoryAudit,
  InventoryAuditContext,
  InventoryAuditFilters,
  InventoryAuditListResponse,
  PaginationParams,
  PatchAuditLineDto,
} from '../models/inventory-audit.model';

function unwrapData<T>(response: unknown): T {
  if (response == null) return response as T;
  if (Array.isArray(response)) return response as T;
  if (typeof response === 'object' && response !== null && 'data' in response) {
    const envelope = response as { data?: unknown; total?: unknown; page?: unknown; totalPages?: unknown };
    if (
      Array.isArray(envelope.data) &&
      ('total' in envelope || 'page' in envelope || 'totalPages' in envelope)
    ) {
      return response as T;
    }
    return envelope.data as T;
  }
  return response as T;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryAuditService {
  private readonly baseUrl = `${environment.api}/tenant/inventory/audits`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getContext(
    warehouseId: string,
    options: { product_id?: string; include_empty_lots?: boolean } = {}
  ): Observable<InventoryAuditContext> {
    let params = new HttpParams().set('warehouse_id', warehouseId);
    if (options.product_id) params = params.set('product_id', options.product_id);
    if (options.include_empty_lots) params = params.set('include_empty_lots', 'true');

    return this.http.get<unknown>(`${this.baseUrl}/context`, { params }).pipe(
      map((res) => unwrapData<InventoryAuditContext>(res)),
      catchError((error) => this.handleError(error, 'No se pudo cargar el preview de lotes'))
    );
  }

  createAudit(payload: CreateInventoryAuditDto): Observable<InventoryAudit> {
    return this.http.post<unknown>(this.baseUrl, payload).pipe(
      map((res) => unwrapData<InventoryAudit>(res)),
      catchError((error) => this.handleError(error, 'No se pudo crear la auditoría'))
    );
  }

  getAudits(
    filters: InventoryAuditFilters,
    pagination: PaginationParams
  ): Observable<InventoryAuditListResponse> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.search) params = params.set('search', filters.search);
    if (filters.status) params = params.set('status', filters.status);
    if (filters.fiscal_configuration_id) {
      params = params.set('fiscal_configuration_id', filters.fiscal_configuration_id);
    }
    if (filters.billing_branch_id) params = params.set('billing_branch_id', filters.billing_branch_id);
    if (filters.warehouse_id) params = params.set('warehouse_id', filters.warehouse_id);
    if (filters.product_id) params = params.set('product_id', filters.product_id);
    if (filters.created_from) params = params.set('created_from', filters.created_from);
    if (filters.created_to) params = params.set('created_to', filters.created_to);

    return this.http.get<unknown>(this.baseUrl, { params }).pipe(
      map((res) => {
        const envelope = unwrapData<any>(res);
        if (Array.isArray(envelope)) {
          return {
            data: envelope,
            total: envelope.length,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: 1,
          } as InventoryAuditListResponse;
        }
        return {
          data: envelope?.data ?? [],
          total: Number(envelope?.total ?? envelope?.data?.length ?? 0),
          page: Number(envelope?.page ?? pagination.page),
          limit: Number(envelope?.limit ?? pagination.limit),
          totalPages: Number(envelope?.totalPages ?? 1),
        } as InventoryAuditListResponse;
      }),
      catchError((error) => this.handleError(error, 'No se pudo cargar el historial de auditorías'))
    );
  }

  getAuditById(id: string): Observable<InventoryAudit> {
    return this.http.get<unknown>(`${this.baseUrl}/${id}`).pipe(
      map((res) => unwrapData<InventoryAudit>(res)),
      catchError((error) => this.handleError(error, 'No se pudo cargar la auditoría'))
    );
  }

  saveLines(id: string, lines: PatchAuditLineDto[]): Observable<InventoryAudit> {
    return this.http.patch<unknown>(`${this.baseUrl}/${id}/lines`, { lines }).pipe(
      map((res) => unwrapData<InventoryAudit>(res)),
      catchError((error) => this.handleError(error, 'No se pudieron guardar las líneas'))
    );
  }

  addLine(id: string, payload: AddAuditLineDto): Observable<InventoryAudit> {
    return this.http.post<unknown>(`${this.baseUrl}/${id}/lines`, payload).pipe(
      map((res) => unwrapData<InventoryAudit>(res)),
      catchError((error) => this.handleError(error, 'No se pudo agregar el lote'))
    );
  }

  submit(id: string): Observable<InventoryAudit> {
    return this.http.post<unknown>(`${this.baseUrl}/${id}/submit`, {}).pipe(
      map((res) => unwrapData<InventoryAudit>(res)),
      catchError((error) => this.handleError(error, 'No se pudo enviar a autorización'))
    );
  }

  authorize(id: string, notes?: string): Observable<InventoryAudit> {
    const body = notes?.trim() ? { notes: notes.trim() } : {};
    return this.http.post<unknown>(`${this.baseUrl}/${id}/authorize`, body).pipe(
      map((res) => unwrapData<InventoryAudit>(res)),
      catchError((error) => this.handleError(error, 'No se pudo autorizar la auditoría'))
    );
  }

  reject(id: string, reason: string): Observable<InventoryAudit> {
    return this.http.post<unknown>(`${this.baseUrl}/${id}/reject`, { reason }).pipe(
      map((res) => unwrapData<InventoryAudit>(res)),
      catchError((error) => this.handleError(error, 'No se pudo rechazar la auditoría'))
    );
  }

  cancel(id: string, reason?: string): Observable<InventoryAudit> {
    const body = reason?.trim() ? { reason: reason.trim() } : {};
    return this.http.post<unknown>(`${this.baseUrl}/${id}/cancel`, body).pipe(
      map((res) => unwrapData<InventoryAudit>(res)),
      catchError((error) => this.handleError(error, 'No se pudo cancelar la auditoría'))
    );
  }

  private handleError(error: HttpErrorResponse, fallback: string): Observable<never> {
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
        errorMessage = 'Auditoría no encontrada';
        break;
      case 400:
      case 422:
        errorMessage = this.extractErrorMessage(error) || fallback;
        break;
      case 500:
        errorMessage = 'Error del servidor. Por favor, intenta más tarde';
        break;
      case 0:
        errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet';
        break;
      default:
        errorMessage = this.extractErrorMessage(error) || fallback;
    }

    return throwError(() => new Error(errorMessage));
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error?.message === 'string' && error.error.message.trim()) {
      return error.error.message;
    }
    if (Array.isArray(error.error?.message)) {
      return error.error.message.filter((item: unknown) => typeof item === 'string').join(', ');
    }
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat();
      return (errors as string[]).join(', ');
    }
    return '';
  }
}
