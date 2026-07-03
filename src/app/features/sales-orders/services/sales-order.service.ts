import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { 
  SalesOrder, 
  SalesOrderFilters, 
  SalesOrderExportFilters,
  SalesOrderExportType,
  PaginationParams, 
  PaginatedResponse,
  SalesOrderFormData,
  SalesOrderDetailPayload,
  SalesOrderDetailResponse,
  RegenerateSalesDocumentResponse,
  TicketReciboResponse,
  normalizeTicketReciboResponse,
  SalesDocumentLanguage
} from '../models/sales-order.model';
import {
  RegisterSalesOrderPaymentPayload,
  RegisterSalesOrderPaymentResponse,
  SalesOrderPayment,
  SalesOrderPaymentDocument,
  SalesOrderPaymentsListResponse,
  SalesOrderPaymentsSummary,
} from '../models/sales-order-payment.model';
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
    if (filters.sales_order_type) {
      params = params.set('sales_order_type', filters.sales_order_type);
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

  getOrderDetailById(id: string): Observable<SalesOrderDetailPayload> {
    return this.http.get<SalesOrderDetailResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        map((response) => this.normalizeDetailPayload(response.data)),
        catchError(error => this.handleError(error))
      );
  }

  getPayments(orderId: string): Observable<{
    payments: SalesOrderPayment[];
    summary: SalesOrderPaymentsSummary | null;
  }> {
    return this.http
      .get<SalesOrderPaymentsListResponse>(`${this.baseUrl}/${orderId}/payments`)
      .pipe(
        map((response) => {
          const payments = response.payments ?? response.data?.payments ?? [];
          const summary = response.summary ?? response.data?.summary ?? null;
          return { payments, summary };
        }),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Register a payment and optionally upload a receipt document.
   */
  registerPayment(
    orderId: string,
    payload: RegisterSalesOrderPaymentPayload,
    file?: File | null
  ): Observable<RegisterSalesOrderPaymentResponse> {
    return this.http
      .post<unknown>(`${this.baseUrl}/${orderId}/payments`, payload)
      .pipe(
        map((response) => this.normalizeRegisterPaymentResponse(response)),
        switchMap((result) => {
          if (!file || !result.payment?.id) {
            return of(result);
          }
          return this.uploadPaymentDocument(orderId, result.payment.id, file).pipe(
            map((document) => ({
              ...result,
              payment: {
                ...result.payment,
                documents: [...(result.payment.documents ?? []), document],
              },
            }))
          );
        }),
        catchError((error) => this.handleError(error))
      );
  }

  deletePayment(orderId: string, paymentId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${orderId}/payments/${paymentId}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getPaymentDocuments(
    orderId: string,
    paymentId: string
  ): Observable<SalesOrderPaymentDocument[]> {
    return this.http
      .get<unknown>(`${this.baseUrl}/${orderId}/payments/${paymentId}/documents`)
      .pipe(
        map((response) => this.normalizeDocumentsResponse(response)),
        catchError((error) => this.handleError(error))
      );
  }

  uploadPaymentDocument(
    orderId: string,
    paymentId: string,
    file: File,
    notes?: string
  ): Observable<SalesOrderPaymentDocument> {
    const formData = new FormData();
    formData.append('file', file);
    if (notes?.trim()) {
      formData.append('notes', notes.trim());
    }
    return this.http
      .post<unknown>(`${this.baseUrl}/${orderId}/payments/${paymentId}/documents`, formData)
      .pipe(
        map((response) => this.normalizeDocumentResponse(response)),
        catchError((error) => this.handleError(error))
      );
  }

  deletePaymentDocument(
    orderId: string,
    paymentId: string,
    documentId: string
  ): Observable<void> {
    return this.http
      .delete<void>(
        `${this.baseUrl}/${orderId}/payments/${paymentId}/documents/${documentId}`
      )
      .pipe(catchError((error) => this.handleError(error)));
  }

  private normalizeDetailPayload(payload: SalesOrderDetailPayload): SalesOrderDetailPayload {
    if (!payload?.header) {
      return payload;
    }

    const payments = payload.payments ?? payload.header.payments ?? [];
    const payments_summary =
      payload.payments_summary ?? payload.header.payments_summary;

    const header: SalesOrder = {
      ...payload.header,
      payments,
      payments_summary,
      payment_status:
        (payments_summary?.payment_status as SalesOrder['payment_status']) ??
        payload.header.payment_status,
    };

    return {
      ...payload,
      header,
      payments,
      payments_summary,
    };
  }

  private normalizeRegisterPaymentResponse(
    response: unknown
  ): RegisterSalesOrderPaymentResponse {
    const body = this.unwrapData(response);
    const payment = (body['payment'] ?? body) as SalesOrderPayment;
    const summary = (body['summary'] ?? {}) as SalesOrderPaymentsSummary;
    return { payment, summary };
  }

  private normalizeDocumentsResponse(response: unknown): SalesOrderPaymentDocument[] {
    const body = this.unwrapData(response);
    const documents = body['documents'] ?? body['data'];
    return Array.isArray(documents) ? (documents as SalesOrderPaymentDocument[]) : [];
  }

  private normalizeDocumentResponse(response: unknown): SalesOrderPaymentDocument {
    const body = this.unwrapData(response);
    const document = (body['document'] ?? body['data'] ?? body) as SalesOrderPaymentDocument;
    return document;
  }

  private unwrapData(response: unknown): Record<string, unknown> {
    if (!response || typeof response !== 'object') {
      return {};
    }
    const body = response as Record<string, unknown>;
    if (body['data'] && typeof body['data'] === 'object' && !Array.isArray(body['data'])) {
      return body['data'] as Record<string, unknown>;
    }
    return body;
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
   * Get products summary by warehouse for sales order creation
   */
  getWarehouseProductsSummary(warehouseId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/warehouse/${warehouseId}/products-summary`)
      .pipe(
        catchError(error => this.handleError(error))
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
   * Export sales orders to Excel (headers or line details).
   * Details require created_from and created_to.
   */
  exportOrdersExcel(
    type: SalesOrderExportType,
    filters: SalesOrderExportFilters
  ): Observable<{ blob: Blob; filename: string }> {
    if (type === 'details' && (!filters.created_from || !filters.created_to)) {
      return throwError(() => new Error('Selecciona fecha desde y hasta para exportar el detalle.'));
    }

    let params = new HttpParams();
    const entries: [string, string | number | undefined][] = [
      ['search', filters.search],
      ['general_status', filters.general_status],
      ['payment_status', filters.payment_status],
      ['sales_order_type', filters.sales_order_type],
      ['warehouse_id', filters.warehouse_id],
      ['customer_id', filters.customer_id],
      ['created_from', filters.created_from],
      ['created_to', filters.created_to],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    }

    const path = type === 'headers' ? 'export/excel/headers' : 'export/excel/details';

    return this.http
      .get(`${this.baseUrl}/${path}`, {
        params,
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const disposition = response.headers.get('content-disposition') ?? undefined;
          const filename =
            this.parseFilenameFromDisposition(disposition) ??
            (type === 'headers'
              ? `ventas-cabeceras-${new Date().toISOString().slice(0, 10)}.xlsx`
              : `ventas-detalle-${filters.created_from}_${filters.created_to}.xlsx`);

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

          if (error.status === 400) {
            return throwError(
              () =>
                new Error(
                  message || 'Indica fecha desde y hasta'
                )
            );
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

    if (error.status === 400) {
      return throwError(() => new Error(this.extractErrorMessage(error) || 'Indica fecha desde y hasta'));
    }
    if (error.status === 403) {
      return throwError(() => new Error('No tienes permiso para exportar'));
    }

    return this.handleError(error);
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    const body = error.error;
    if (body && typeof body === 'object') {
      const message = (body as { message?: string | string[] }).message;
      if (Array.isArray(message)) {
        return message.join(', ');
      }
      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }
    return '';
  }

  updateOrderNotes(orderId: string, notes: string | null): Observable<{ notes: string | null }> {
    return this.http
      .patch<unknown>(`${this.baseUrl}/${orderId}/notes`, { notes })
      .pipe(
        map((response) => this.parseNotesPatchResponse(response, notes)),
        catchError(error => this.handleError(error))
      );
  }

  updateOrderSeller(
    orderId: string,
    sellerUserId: string
  ): Observable<{ seller_user: SalesOrder['seller_user'] }> {
    return this.http
      .patch<unknown>(`${this.baseUrl}/${orderId}/seller`, {
        seller_user_id: sellerUserId,
      })
      .pipe(
        map((response) => this.parseSellerPatchResponse(response)),
        catchError((error) => this.handleError(error))
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

  regenerateOriginalPDF(
    orderId: string,
    language: SalesDocumentLanguage,
    keepPrevious = false
  ): Observable<RegenerateSalesDocumentResponse> {
    return this.http.post<RegenerateSalesDocumentResponse>(
      `${this.baseUrl}/${orderId}/regenerate-documento-original`,
      { language, keep_previous: keepPrevious }
    ).pipe(
      tap(() => {
        console.log('[SalesOrder] Original PDF regenerated successfully', { id: orderId, language });
      }),
      catchError(error => {
        console.error('[SalesOrder] Failed to regenerate original PDF', error);
        return this.handleError(error);
      })
    );
  }

  /** Lee el TICKET / RECIBO guardado (no regenera). */
  getTicketRecibo(orderId: string): Observable<TicketReciboResponse> {
    return this.http.get<unknown>(`${this.baseUrl}/${orderId}/ticket-recibo`).pipe(
      map((response) => normalizeTicketReciboResponse(response, false)),
      catchError((error) => {
        console.error('[SalesOrder] Failed to load ticket/recibo', error);
        return this.handleError(error);
      })
    );
  }

  /** Reimprime el ticket existente en S3 (no borra ni regenera documentos). */
  reprintTicketRecibo(orderId: string): Observable<TicketReciboResponse> {
    return this.http.post<unknown>(`${this.baseUrl}/${orderId}/reprint-ticket-recibo`, {}).pipe(
      map((response) => normalizeTicketReciboResponse(response, false)),
      catchError((error) => {
        console.error('[SalesOrder] Failed to reprint ticket/recibo', error);
        return this.handleError(error);
      })
    );
  }

  /** [TEMP/admin] Borra el ticket anterior y genera uno nuevo en S3. */
  regenerateTicketRecibo(orderId: string): Observable<TicketReciboResponse> {
    return this.http.post<unknown>(`${this.baseUrl}/${orderId}/regenerate-ticket-recibo`, {}).pipe(
      map((response) => normalizeTicketReciboResponse(response, true)),
      catchError((error) => {
        console.error('[SalesOrder] Failed to regenerate ticket/recibo', error);
        return this.handleError(error);
      })
    );
  }

  /**
   * Handle HTTP errors
   */
  private parseNotesPatchResponse(response: unknown, fallbackNotes: string | null): { notes: string | null } {
    if (!response || typeof response !== 'object') {
      return { notes: fallbackNotes };
    }

    const body = response as Record<string, unknown>;
    const data = body['data'];
    const header =
      data && typeof data === 'object' && !Array.isArray(data)
        ? (data as Record<string, unknown>)['header']
        : undefined;

    const candidates = [
      body['notes'],
      data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>)['notes'] : undefined,
      header && typeof header === 'object' && !Array.isArray(header)
        ? (header as Record<string, unknown>)['notes']
        : undefined,
    ];

    for (const value of candidates) {
      if (value === null) {
        return { notes: null };
      }
      if (typeof value === 'string') {
        const trimmed = value.trim();
        return { notes: trimmed ? trimmed : null };
      }
    }

    return { notes: fallbackNotes };
  }

  private parseSellerPatchResponse(
    response: unknown
  ): { seller_user: SalesOrder['seller_user'] } {
    const body = this.unwrapData(response);
    const header =
      body['header'] && typeof body['header'] === 'object' && !Array.isArray(body['header'])
        ? (body['header'] as Record<string, unknown>)
        : body;

    const sellerUser = (header['seller_user'] ?? body['seller_user'] ?? null) as SalesOrder['seller_user'];
    return { seller_user: sellerUser ?? undefined };
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    const backendMessage = this.extractErrorMessage(error);

    switch (error.status) {
      case 401:
        this.router.navigate(['/auth/login']);
        errorMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
        break;

      case 403:
        errorMessage = 'No tienes permisos para realizar esta acción';
        break;

      case 400:
        errorMessage = this.mapPaymentErrorMessage(backendMessage) || 'Solicitud inválida';
        break;

      case 404:
        errorMessage = backendMessage || 'Orden o pago no encontrado';
        break;

      case 409:
        errorMessage = backendMessage || 'Stock insuficiente para confirmar la orden';
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
        errorMessage = backendMessage || 'Ha ocurrido un error inesperado';
    }

    return throwError(() => new Error(errorMessage));
  }

  private mapPaymentErrorMessage(message: string): string {
    if (!message) {
      return '';
    }
    const lower = message.toLowerCase();
    if (
      lower.includes('excede') ||
      lower.includes('exceed') ||
      lower.includes('saldo pendiente') ||
      lower.includes('amount_pending')
    ) {
      return 'El monto excede el saldo pendiente';
    }
    if (
      lower.includes('referencia') ||
      lower.includes('reference') ||
      (lower.includes('transfer') && (lower.includes('required') || lower.includes('obligator')))
    ) {
      return 'Indica la referencia de transferencia';
    }
    if (
      lower.includes('pos_cobranza') ||
      lower.includes('cobranza pos') ||
      (lower.includes('cobranza') && lower.includes('eliminar'))
    ) {
      return 'No se puede eliminar un pago de cobranza POS';
    }
    return message;
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
