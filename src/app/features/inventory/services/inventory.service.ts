import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { 
  InventoryItem, 
  InventoryFilters, 
  InventoryBatchExportFilters,
  InventoryExportType,
  InventorySummaryExportFilters,
  InventorySummaryFilters,
  PaginationParams, 
  PaginatedResponse 
} from '../models/inventory-item.model';
import {
  InventoryLocationFilters,
  InventoryLocationFiscal,
} from '../models/inventory-location.model';
import { InventoryStats } from '../models/inventory-stats.model';
import { InventoryMovement } from '../models/inventory-movement.model';
import { StockReservation } from '../models/stock-reservation.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly baseUrl = `${environment.api}/tenant/inventory`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Get paginated list of inventory items with filters
   */
  getItems(
    filters: InventoryFilters,
    pagination: PaginationParams
  ): Observable<PaginatedResponse<InventoryItem>> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.warehouse_id) {
      params = params.set('warehouse_id', filters.warehouse_id);
    }
    if (filters.low_stock !== undefined) {
      params = params.set('low_stock', filters.low_stock.toString());
    }
    if (filters.product_id) {
      params = params.set('product_id', filters.product_id);
    }

    return this.http.get<PaginatedResponse<InventoryItem>>(`${this.baseUrl}/items`, { params })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Get single inventory item by ID
   */
  getItemById(id: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.baseUrl}/items/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Get inventory movements
   */
  getMovements(
    filters: { product_id?: string; warehouse_id?: string },
    pagination: PaginationParams
  ): Observable<PaginatedResponse<InventoryMovement>> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.product_id) {
      params = params.set('product_id', filters.product_id);
    }
    if (filters.warehouse_id) {
      params = params.set('warehouse_id', filters.warehouse_id);
    }

    return this.http.get<PaginatedResponse<InventoryMovement>>(`${this.baseUrl}/movements`, { params })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Create inventory adjustment
   */
  createAdjustment(data: {
    product_id: string;
    warehouse_id: string;
    uom_id: string;
    quantity: number;
    unit_cost: number;
    notes?: string;
  }): Observable<InventoryMovement> {
    return this.http.post<InventoryMovement>(`${this.baseUrl}/adjustments`, data)
      .pipe(
        tap(movement => {
          console.log('[Inventory] Adjustment created successfully', { id: movement.id });
        }),
        catchError(error => {
          console.error('[Inventory] Failed to create adjustment', error);
          return this.handleError(error);
        })
      );
  }

  /**
   * Get stock reservations
   */
  getReservations(
    filters: { product_id?: string; warehouse_id?: string; status?: string },
    pagination: PaginationParams
  ): Observable<PaginatedResponse<StockReservation>> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.product_id) {
      params = params.set('product_id', filters.product_id);
    }
    if (filters.warehouse_id) {
      params = params.set('warehouse_id', filters.warehouse_id);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }

    return this.http.get<PaginatedResponse<StockReservation>>(`${this.baseUrl}/reservations`, { params })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Get inventory reports
   */
  getStockReport(warehouse_id?: string): Observable<any> {
    let params = new HttpParams();
    if (warehouse_id) {
      params = params.set('warehouse_id', warehouse_id);
    }

    return this.http.get(`${this.baseUrl}/reports/stock`, { params })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Catálogo jerárquico razón social → sucursal → almacén.
   * Un request al entrar a Inventario. Permiso: inventory:Read.
   */
  getLocations(): Observable<InventoryLocationFiscal[]> {
    return this.http
      .get<{ data?: InventoryLocationFiscal[] } | InventoryLocationFiscal[]>(`${this.baseUrl}/locations`)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response;
          }
          return response.data ?? [];
        }),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * KPIs de inventario. Mismos filtros de ubicación que el listado.
   * Permiso: inventory:Read. Search y paginación no aplican.
   */
  getStats(filters: InventoryLocationFilters = {}): Observable<InventoryStats> {
    let params = new HttpParams();
    params = this.applyLocationFilters(params, filters);

    return this.http
      .get<InventoryStats | { data?: InventoryStats }>(`${this.baseUrl}/stats`, { params })
      .pipe(
        map((response) => this.unwrapStats(response)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Get inventory summary (totalized by product and warehouse)
   */
  getSummary(
    filters: InventorySummaryFilters,
    pagination: PaginationParams
  ): Observable<PaginatedResponse<any>> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    params = this.applyLocationFilters(params, filters);
    if (filters.product_id) {
      params = params.set('product_id', filters.product_id);
    }
    if (filters.only_available !== undefined) {
      params = params.set('only_available', filters.only_available.toString());
    }
    if (filters.sort_by) {
      params = params.set('sort_by', filters.sort_by);
    }
    if (filters.sort_order) {
      params = params.set('sort_order', filters.sort_order);
    }

    const url = `${this.baseUrl}/summary`;
    console.log('[InventoryService] Calling getSummary:', { url, params: params.toString() });

    return this.http.get<PaginatedResponse<any>>(url, { params })
      .pipe(
        tap(response => console.log('[InventoryService] getSummary response:', response)),
        catchError(error => {
          console.error('[InventoryService] getSummary error:', error);
          return this.handleError(error);
        })
      );
  }

  /**
   * Export inventory to Excel (batches or summary).
   */
  exportInventoryExcel(
    type: InventoryExportType,
    filters: InventoryBatchExportFilters | InventorySummaryExportFilters
  ): Observable<{ blob: Blob; filename: string }> {
    let params = new HttpParams();

    if (type === 'batches') {
      const batchFilters = filters as InventoryBatchExportFilters;
      const entries: [keyof InventoryBatchExportFilters, string | undefined][] = [
        ['search', batchFilters.search],
        ['batch_number', batchFilters.batch_number],
        ['product_id', batchFilters.product_id],
        ['fiscal_configuration_id', batchFilters.fiscal_configuration_id],
        ['billing_branch_id', batchFilters.billing_branch_id],
        ['warehouse_id', batchFilters.warehouse_id],
        ['purchase_order_batch_id', batchFilters.purchase_order_batch_id],
        ['purchase_order_id', batchFilters.purchase_order_id],
        ['created_from', batchFilters.created_from],
        ['created_to', batchFilters.created_to],
      ];
      for (const [key, value] of entries) {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, String(value));
        }
      }
    } else {
      const summaryFilters = filters as InventorySummaryExportFilters;
      const entries: [keyof InventorySummaryExportFilters, string | boolean | undefined][] = [
        ['search', summaryFilters.search],
        ['fiscal_configuration_id', summaryFilters.fiscal_configuration_id],
        ['billing_branch_id', summaryFilters.billing_branch_id],
        ['warehouse_id', summaryFilters.warehouse_id],
        ['product_id', summaryFilters.product_id],
        ['only_available', summaryFilters.only_available],
      ];
      for (const [key, value] of entries) {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, String(value));
        }
      }
    }

    const path =
      type === 'batches'
        ? `${this.baseUrl}/export/excel/batches`
        : `${this.baseUrl}/export/excel/summary`;

    return this.http
      .get(path, {
        params,
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const disposition = response.headers.get('content-disposition') ?? undefined;
          const filename =
            this.parseFilenameFromDisposition(disposition) ??
            (type === 'batches'
              ? `inventario-lotes-${new Date().toISOString().slice(0, 10)}.xlsx`
              : `inventario-totalizado-${new Date().toISOString().slice(0, 10)}.xlsx`);

          return { blob: response.body as Blob, filename };
        }),
        catchError((error) => this.handleBlobError(error))
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

  private handleBlobError(error: HttpErrorResponse): Observable<never> {
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

    return this.handleError(error);
  }

  /**
   * Handle HTTP errors
   */
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

      case 400:
      case 422:
        errorMessage = this.extractErrorMessage(error);
        break;

      case 404:
        errorMessage = 'Artículo de inventario no encontrado';
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

  /**
   * Acepta el objeto plano o envuelto en `{ data }`.
   */
  private unwrapStats(response: InventoryStats | { data?: InventoryStats }): InventoryStats {
    if (response && typeof response === 'object' && 'total_batches' in response) {
      return response as InventoryStats;
    }
    const wrapped = response as { data?: InventoryStats };
    if (wrapped.data) {
      return wrapped.data;
    }
    throw new Error('No se pudieron cargar las estadísticas de inventario');
  }

  /**
   * Aplica filtros de ubicación. "Todas" = no enviar el param.
   */
  private applyLocationFilters(params: HttpParams, filters: InventoryLocationFilters): HttpParams {
    if (filters.fiscal_configuration_id) {
      params = params.set('fiscal_configuration_id', filters.fiscal_configuration_id);
    }
    if (filters.billing_branch_id) {
      params = params.set('billing_branch_id', filters.billing_branch_id);
    }
    if (filters.warehouse_id) {
      params = params.set('warehouse_id', filters.warehouse_id);
    }
    return params;
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
    return 'Error de validación. Por favor, verifica los datos ingresados.';
  }
}
