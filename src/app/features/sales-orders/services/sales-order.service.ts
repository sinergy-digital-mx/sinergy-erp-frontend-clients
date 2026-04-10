import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { 
  SalesOrder, 
  SalesOrderFilters, 
  PaginationParams, 
  PaginatedResponse,
  SalesOrderFormData
} from '../models/sales-order.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
  private readonly baseUrl = `${environment.api}/tenant/sales-orders`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Get paginated list of sales orders with filters
   */
  getOrders(
    filters: SalesOrderFilters,
    pagination: PaginationParams
  ): Observable<PaginatedResponse<SalesOrder>> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.status || filters.general_status) {
      params = params.set('general_status', (filters.general_status || filters.status)!);
    }
    if (filters.payment_status) {
      params = params.set('payment_status', filters.payment_status);
    }
    if (filters.customer_id) {
      params = params.set('customer_id', filters.customer_id.toString());
    }
    if (filters.warehouse_id) {
      params = params.set('warehouse_id', filters.warehouse_id);
    }
    if (filters.dateFrom) {
      params = params.set('created_from', filters.dateFrom);
    }
    if (filters.dateTo) {
      params = params.set('created_to', filters.dateTo);
    }

    return this.http.get<PaginatedResponse<SalesOrder>>(this.baseUrl, { params })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Get single sales order by ID
   */
  getOrderById(id: string): Observable<SalesOrder> {
    return this.http.get<SalesOrder>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Create new sales order
   */
  createOrder(data: SalesOrderFormData): Observable<SalesOrder> {
    console.log('[SalesOrder] Creating order', { warehouse_id: data.warehouse_id, line_items: data.line_items.length });

    return this.http.post<SalesOrder>(this.baseUrl, data)
      .pipe(
        tap(order => {
          console.log('[SalesOrder] Order created successfully', { id: order.id });
        }),
        catchError(error => {
          console.error('[SalesOrder] Failed to create order', error);
          return this.handleError(error);
        })
      );
  }

  /**
   * Update existing sales order
   */
  updateOrder(id: string, data: Partial<SalesOrderFormData>): Observable<SalesOrder> {
    return this.http.put<SalesOrder>(`${this.baseUrl}/${id}`, data)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Fulfill (surtir) sales order - triggers FIFO allocation
   */
  fulfillOrder(id: string): Observable<SalesOrder> {
    return this.http.post<SalesOrder>(`${this.baseUrl}/${id}/fulfill`, {})
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Delete order (cancels and releases inventory)
   */
  deleteOrder(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
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
        errorMessage = 'Orden de venta no encontrada';
        break;

      case 409:
        errorMessage = 'Stock insuficiente para confirmar la orden';
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
