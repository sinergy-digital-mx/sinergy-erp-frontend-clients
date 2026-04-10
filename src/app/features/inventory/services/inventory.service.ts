import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { 
  InventoryItem, 
  InventoryFilters, 
  PaginationParams, 
  PaginatedResponse 
} from '../models/inventory-item.model';
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
   * Get inventory summary (totalized by product and warehouse)
   */
  getSummary(
    filters: any,
    pagination: PaginationParams
  ): Observable<PaginatedResponse<any>> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.warehouse_id) {
      params = params.set('warehouse_id', filters.warehouse_id);
    }
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

      case 404:
        errorMessage = 'Artículo de inventario no encontrado';
        break;

      case 422:
        errorMessage = this.extractValidationErrors(error);
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
   * Extract validation errors from response
   */
  private extractValidationErrors(error: HttpErrorResponse): string {
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat();
      return errors.join(', ');
    }
    return 'Error de validación. Por favor, verifica los datos ingresados.';
  }
}
