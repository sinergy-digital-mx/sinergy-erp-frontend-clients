import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Document, DocumentType, PurchaseOrder } from '../models/purchase-order.model';
import { LineItem } from '../models/line-item.model';
import { TaxCalculatorService } from './tax-calculator.service';
import { 
  OrderFilters, 
  PaginationParams, 
  PaginatedResponse,
  WritePurchaseOrderDto,
  UpdateLineItemDto,
  CreatePurchaseOrderLineItemDto,
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
    private router: Router,
    private taxCalculator: TaxCalculatorService
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
    return this.http.get<PurchaseOrder | { data: Record<string, unknown> }>(`${this.baseUrl}/${id}`)
      .pipe(
        map((raw) => this.normalizePurchaseOrderResponse(raw)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Unwraps `{ data: { header, documents, ... } }` and maps API line fields
   * (`unit_total`, nested `product_uom.uom`) into what the UI expects (`unit_price`, `uom`, row totals).
   */
  private normalizePurchaseOrderResponse(raw: unknown): PurchaseOrder {
    const body = raw as Record<string, unknown>;
    let order: Record<string, unknown>;

    if (body?.data && typeof body.data === 'object' && (body.data as Record<string, unknown>).header) {
      const data = body.data as Record<string, unknown>;
      order = { ...(data.header as Record<string, unknown>) };
      if (Array.isArray(data.documents)) {
        order.documents = data.documents;
      }
      if (Array.isArray(data.batches) && data.batches.length > 0) {
        order.batches = data.batches;
      }
      if (Array.isArray(data.payments)) {
        order.payments = data.payments;
      }
      if (data.payments_summary && typeof data.payments_summary === 'object') {
        order.payments_summary = data.payments_summary;
      }
    } else {
      order = { ...body };
    }

    if (Array.isArray(order.line_items)) {
      order.line_items = (order.line_items as unknown[]).map((li) =>
        this.normalizeLineItemFromApi(li as Record<string, unknown>)
      );
    }

    return order as unknown as PurchaseOrder;
  }

  private parseAmount(value: unknown): number {
    if (value === null || value === undefined || value === '') {
      return 0;
    }
    const n = typeof value === 'number' ? value : parseFloat(String(value));
    return Number.isFinite(n) ? n : 0;
  }

  private normalizeLineItemFromApi(item: Record<string, unknown>): LineItem {
    const qty = this.parseAmount(item.quantity);
    const unitCost = this.parseAmount(item.unit_price ?? item.unit_total);
    const ivaPct = this.parseAmount(item.iva_percentage);
    const iepsPct = this.parseAmount(item.ieps_percentage);

    const hasRowTotals =
      item.subtotal != null &&
      item.iva_amount != null &&
      item.ieps_amount != null &&
      item.line_total != null;

    let subtotal: number;
    let iva_amount: number;
    let ieps_amount: number;
    let line_total: number;

    if (hasRowTotals) {
      subtotal = this.parseAmount(item.subtotal);
      iva_amount = this.parseAmount(item.iva_amount);
      ieps_amount = this.parseAmount(item.ieps_amount);
      line_total = this.parseAmount(item.line_total);
    } else {
      const calc = this.taxCalculator.calculateLineItem(qty, unitCost, ivaPct, iepsPct);
      subtotal = calc.subtotal;
      iva_amount = calc.iva_amount;
      ieps_amount = calc.ieps_amount;
      line_total = calc.line_total;
    }

    const productUom = item.product_uom as Record<string, unknown> | undefined;
    const nestedUom = productUom?.uom as LineItem['uom'] | undefined;
    const uom = (item.uom as LineItem['uom']) ?? nestedUom;

    const uomId =
      (item.uom_id as string | undefined) ??
      (nestedUom?.id as string | undefined) ??
      (item.product_uom_id as string | undefined) ??
      '';

    return {
      ...(item as unknown as LineItem),
      quantity: qty,
      unit_price: unitCost,
      unit_total: unitCost,
      uom,
      uom_id: uomId,
      subtotal,
      iva_amount,
      ieps_amount,
      line_total
    };
  }

  /**
   * Create new purchase order
   */
  createOrder(data: WritePurchaseOrderDto): Observable<PurchaseOrder> {
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
   * Get vendor products
   */
  getVendorProducts(vendorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api}/tenant/vendors/${vendorId}/products`)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Receive purchase order
   */
  receiveOrder(id: string, data: any): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(`${this.baseUrl}/${id}/receive`, data)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Update existing purchase order
   */
  updateOrder(id: string, data: WritePurchaseOrderDto): Observable<PurchaseOrder> {
    return this.http.put<PurchaseOrder>(`${this.baseUrl}/${id}`, data)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Update a single line item (OC en Creada; totales del encabezado se recalculan en backend).
   */
  patchLineItem(orderId: string, lineItemId: string, body: UpdateLineItemDto): Observable<unknown> {
    return this.http
      .patch<unknown>(`${this.baseUrl}/${orderId}/line-items/${lineItemId}`, body)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Delete a line item and recalculate header totals (OC en Creada).
   */
  deleteLineItem(orderId: string, lineItemId: string): Observable<{ success: boolean; id: string }> {
    return this.http
      .delete<{ success: boolean; id: string }>(`${this.baseUrl}/${orderId}/line-items/${lineItemId}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Agrega una línea a una OC (p. ej. en estado Creada). Si el backend usa otra ruta, ajustar aquí.
   */
  createLineItem(orderId: string, body: CreatePurchaseOrderLineItemDto): Observable<unknown> {
    return this.http
      .post<unknown>(`${this.baseUrl}/${orderId}/line-items`, body)
      .pipe(catchError((error) => this.handleError(error)));
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
    const payload = {
      amount: payment.amount,
      payment_date: payment.payment_date,
      payment_method: payment.payment_method,
      currency: payment.currency,
      reference_number: payment.reference_number,
      notes: payment.notes
    };
    return this.http.post<Payment>(`${this.baseUrl}/${orderId}/payments`, payload)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  getOrderDocuments(orderId: string): Observable<{ data: Document[]; total: number }> {
    return this.http.get<{ data: Document[]; total: number }>(`${this.baseUrl}/${orderId}/documents`)
      .pipe(catchError(error => this.handleError(error)));
  }

  uploadOrderDocument(orderId: string, file: File, documentTypeId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type_id', String(documentTypeId));
    return this.http.post<any>(`${this.baseUrl}/${orderId}/documents`, formData)
      .pipe(catchError(error => this.handleError(error)));
  }

  deleteOrderDocument(documentId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/documents/${documentId}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  getOrderDocumentTypes(): Observable<{ data: DocumentType[]; total: number }> {
    return this.http.get<{ data: DocumentType[]; total: number }>(`${this.baseUrl}/document-types/list`)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Regenerate original purchase order PDF
   */
  regenerateOriginalPDF(orderId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${orderId}/regenerate-documento-original`, {})
      .pipe(
        tap(() => {
          console.log('[PurchaseOrder] Original PDF regenerated successfully', { id: orderId });
        }),
        catchError(error => {
          console.error('[PurchaseOrder] Failed to regenerate original PDF', error);
          return this.handleError(error);
        })
      );
  }

  /**
   * Regenerate purchase order receipt PDF (only if status is "Recibida")
   */
  regenerateReceiptPDF(orderId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${orderId}/regenerate-recepcion`, {})
      .pipe(
        tap(() => {
          console.log('[PurchaseOrder] Receipt PDF regenerated successfully', { id: orderId });
        }),
        catchError(error => {
          console.error('[PurchaseOrder] Failed to regenerate receipt PDF', error);
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
