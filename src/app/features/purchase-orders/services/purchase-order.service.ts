import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PurchaseOrder } from '../models/purchase-order.model';
import { 
  OrderFilters, 
  PaginationParams, 
  PaginatedResponse,
  PurchaseOrderFormData,
  CancelOrderData,
  PaymentFormData
} from '../models/filters.model';
import { Payment } from '../models/payment.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private readonly baseUrl = `${environment.api}/tenant/purchase-orders`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Get paginated list of purchase orders with filters
   */
  getOrders(
    filters: OrderFilters,
    pagination: PaginationParams
  ): Observable<PaginatedResponse<PurchaseOrder>> {
    let params = new HttpParams()
      .set('page', pagination.page.toString())
      .set('limit', pagination.limit.toString());

    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.dateFrom) {
      params = params.set('start_date', filters.dateFrom);
    }
    if (filters.dateTo) {
      params = params.set('end_date', filters.dateTo);
    }
    if (filters.status) {
      params = params.set('status', filters.status);
    }
    if (filters.warehouseId) {
      params = params.set('warehouse_id', filters.warehouseId);
    }

    return this.http.get<PaginatedResponse<PurchaseOrder>>(this.baseUrl, { params })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Get single purchase order by ID
   */
  getOrderById(id: string): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Create new purchase order
   */
  createOrder(data: PurchaseOrderFormData): Observable<PurchaseOrder> {
    console.log('[PurchaseOrder] Creating order', {
      vendor: data.vendor_id,
      warehouse: data.warehouse_id,
      lineItems: data.line_items.length
    });

    return this.http.post<PurchaseOrder>(this.baseUrl, data)
      .pipe(
        tap(order => {
          console.log('[PurchaseOrder] Order created successfully', { id: order.id });
        }),
        catchError(error => {
          console.error('[PurchaseOrder] Failed to create order', error);
          return this.handleError(error);
        })
      );
  }

  /**
   * Update existing purchase order
   */
  updateOrder(id: string, data: Partial<PurchaseOrderFormData>): Observable<PurchaseOrder> {
    return this.http.put<PurchaseOrder>(`${this.baseUrl}/${id}`, data)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Change order status
   */
  changeStatus(id: string, status: string): Observable<PurchaseOrder> {
    return this.http.put<PurchaseOrder>(`${this.baseUrl}/${id}/status`, { status })
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Cancel order with reason
   */
  cancelOrder(id: string, data: CancelOrderData): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(`${this.baseUrl}/${id}/cancel`, data)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Delete order
   */
  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Register payment
   */
  registerPayment(orderId: string, payment: PaymentFormData): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/${orderId}/payments`, payment)
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
        // Unauthorized - redirect to login
        this.router.navigate(['/auth/login']);
        errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
        break;

      case 403:
        // Forbidden - permission denied
        errorMessage = 'No tienes permisos para realizar esta acción';
        break;

      case 404:
        // Not found
        errorMessage = 'Orden de compra no encontrada';
        break;

      case 422:
        // Validation errors
        errorMessage = this.extractValidationErrors(error);
        break;

      case 500:
        // Server error
        errorMessage = 'Error del servidor. Por favor, intenta más tarde';
        break;

      case 0:
        // Network error
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
