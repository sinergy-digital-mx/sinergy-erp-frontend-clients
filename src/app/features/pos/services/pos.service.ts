import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { POSCart, POSCartItem } from '../models/pos.model';
import { previewLineDiscount } from '../utils/pos-discount.util';
import {
  PosDailyShiftDetail,
  OpenDailyShiftResponse,
  PosDailyShiftListItem,
  PosDailyShiftListResponse,
  ValidateSellerCodeResponse,
  normalizeDailyShiftDetail,
} from '../models/pos-daily-shift.model';
import { SalesOrder, SalesOrderFormData } from '../../sales-orders/models/sales-order.model';
import { environment } from '../../../../environments/environment';
import { CollectSalePayload } from '../utils/pos-collect.util';
import {
  CollectedSalesResponse,
  normalizeCollectedSalesResponse,
} from '../models/pos-collected-sales.model';
import {
  PosInventorySummaryResponse,
  normalizePosInventorySummary,
} from '../models/pos-inventory-summary.model';
import {
  CollectSaleResponse,
  PosSaleReceipt,
  normalizeCollectSaleResponse,
  normalizePosSaleReceipt,
} from '../models/pos-receipt.model';

export interface PosSessionInventoryParams {
  search?: string;
  warehouse_id?: string;
  only_available?: boolean;
  page?: number;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class POSService {
  private readonly API_URL = `${environment.api}/tenant/pos`;
  private readonly POS_SESSIONS_URL = `${environment.api}/tenant/pos-sessions`;
  private readonly INVENTORY_URL = `${environment.api}/tenant/inventory`;
  private readonly SALES_ORDERS_URL = `${environment.api}/tenant/sales-orders`;
  
  private cartState = signal<POSCart>({
    items: [],
    total_gross_subtotal: 0,
    total_discount: 0,
    total_subtotal: 0,
    total_iva: 0,
    total_ieps: 0,
    grand_total: 0
  });

  cart = this.cartState.asReadonly();

  constructor(private http: HttpClient) {}

  /**
   * Add item to cart
   */
  addItem(item: POSCartItem): void {
    const currentCart = this.cartState();
    const existingItemIndex = currentCart.items.findIndex(
      (i) =>
        i.product_id === item.product_id &&
        i.product_uom_id === item.product_uom_id &&
        (i.product_discount_id ?? null) === (item.product_discount_id ?? null)
    );

    let updatedItems: POSCartItem[];
    
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      updatedItems = currentCart.items.map((i, index) => {
        if (index === existingItemIndex) {
          const newQuantity = i.quantity + item.quantity;
          return this.recalculateItem({ ...i, quantity: newQuantity });
        }
        return i;
      });
    } else {
      // Add new item
      updatedItems = [...currentCart.items, item];
    }

    this.updateCart(updatedItems);
  }

  /**
   * Update item quantity
   */
  updateItemQuantity(index: number, quantity: number): void {
    const currentCart = this.cartState();
    const updatedItems = currentCart.items.map((item, i) => {
      if (i === index) {
        return this.recalculateItem({ ...item, quantity });
      }
      return item;
    });

    this.updateCart(updatedItems);
  }

  /**
   * Update item price/taxes (pricing option override)
   */
  updateItemPricing(
    index: number,
    pricing: { unit_price: number; iva_percentage: number; ieps_percentage: number; selected_price_list_id?: string }
  ): void {
    const currentCart = this.cartState();
    const updatedItems = currentCart.items.map((item, i) => {
      if (i === index) {
        return this.recalculateItem({
          ...item,
          unit_price: pricing.unit_price,
          iva_percentage: pricing.iva_percentage,
          ieps_percentage: pricing.ieps_percentage,
          selected_price_list_id: pricing.selected_price_list_id ?? item.selected_price_list_id,
        });
      }
      return item;
    });
    this.updateCart(updatedItems);
  }

  /**
   * Remove item from cart
   */
  removeItem(index: number): void {
    const currentCart = this.cartState();
    const updatedItems = currentCart.items.filter((_, i) => i !== index);
    this.updateCart(updatedItems);
  }

  /**
   * Clear cart
   */
  clearCart(): void {
    this.cartState.set({
      items: [],
      total_gross_subtotal: 0,
      total_discount: 0,
      total_subtotal: 0,
      total_iva: 0,
      total_ieps: 0,
      grand_total: 0
    });
  }

  /**
   * Recalculate item totals (discount before tax).
   */
  recalculateItem(item: POSCartItem): POSCartItem {
    const preview = previewLineDiscount(
      item.unit_price,
      item.quantity,
      item.selected_discount
    );
    const iva_amount = preview.lineNetSubtotal * (item.iva_percentage / 100);
    const ieps_amount = preview.lineNetSubtotal * (item.ieps_percentage / 100);
    const line_total = preview.lineNetSubtotal + iva_amount + ieps_amount;

    return {
      ...item,
      product_uom_id: item.product_uom_id || item.uom_id,
      line_gross_subtotal: preview.lineGrossSubtotal,
      line_discount_amount: preview.lineDiscount,
      subtotal: preview.lineNetSubtotal,
      iva_amount,
      ieps_amount,
      line_total,
    };
  }

  /**
   * Update cart with new items and recalculate totals
   */
  private updateCart(items: POSCartItem[]): void {
    const recalculated = items.map((item) => this.recalculateItem(item));
    const total_gross_subtotal = recalculated.reduce((sum, item) => sum + item.line_gross_subtotal, 0);
    const total_discount = recalculated.reduce((sum, item) => sum + item.line_discount_amount, 0);
    const total_subtotal = recalculated.reduce((sum, item) => sum + item.subtotal, 0);
    const total_iva = recalculated.reduce((sum, item) => sum + item.iva_amount, 0);
    const total_ieps = recalculated.reduce((sum, item) => sum + item.ieps_amount, 0);
    const grand_total = total_subtotal + total_iva + total_ieps;

    this.cartState.set({
      items: recalculated,
      total_gross_subtotal,
      total_discount,
      total_subtotal,
      total_iva,
      total_ieps,
      grand_total
    });
  }

  /**
   * Crear orden de venta POS (POST /tenant/sales-orders, tipo POS → surtida automática).
   */
  createPosSalesOrder(orderData: SalesOrderFormData): Observable<SalesOrder> {
    return this.http.post<SalesOrder | { data: SalesOrder }>(this.SALES_ORDERS_URL, orderData).pipe(
      map((res) => this.extractPayload(res) as SalesOrder)
    );
  }

  /** @deprecated Usar createPosSalesOrder */
  createOrder(orderData: SalesOrderFormData): Observable<SalesOrder> {
    return this.createPosSalesOrder(orderData);
  }
  
  /**
   * Get all POS orders with optional filters
   */
  getOrders(params?: { page?: number; limit?: number; status?: string }): Observable<any> {
    let httpParams = new HttpParams();
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params?.status) httpParams = httpParams.set('status', params.status);
    
    return this.http.get(`${this.API_URL}/orders`, { params: httpParams });
  }
  
  /**
   * Get POS order by ID
   */
  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/orders/${orderId}`);
  }
  
  /**
   * Get active orders
   */
  getActiveOrders(): Observable<any> {
    return this.http.get(`${this.API_URL}/orders/active`);
  }
  
  /**
   * Cancel order
   */
  cancelOrder(orderId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/orders/${orderId}/cancel`, {});
  }
  
  // ========== LINE ITEMS ==========
  
  /**
   * Add line to order
   */
  addLineToOrder(orderId: string, lineData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/orders/${orderId}/lines`, lineData);
  }
  
  /**
   * Update line in order
   */
  updateLine(orderId: string, lineId: string, lineData: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/orders/${orderId}/lines/${lineId}`, lineData);
  }
  
  /**
   * Delete line from order
   */
  deleteLine(orderId: string, lineId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/orders/${orderId}/lines/${lineId}`);
  }
  
  /**
   * Change line status
   */
  changeLineStatus(orderId: string, lineId: string, status: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/orders/${orderId}/lines/${lineId}/status`, { status });
  }
  
  // ========== PAYMENTS ==========
  
  /**
   * Process simple payment
   */
  processPayment(orderId: string, paymentData: {
    payment_method: string;
    amount_paid: number;
    tip?: number;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/orders/${orderId}/payment`, paymentData);
  }
  
  /**
   * Process split payment
   */
  processSplitPayment(orderId: string, paymentData: {
    payments: Array<{ payment_method: string; amount: number }>;
    tip?: number;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/orders/${orderId}/split-payment`, paymentData);
  }
  
  // ========== CASH SHIFTS / SESIÓN POS ==========
  // La UI usa el término "sesión POS"; el API actual es `cash-shifts`.

  /**
   * Sesión POS activa (mismo recurso que turno de caja).
   */
  getActivePosSession(posConfigId: string): Observable<any> {
    return this.getCurrentPosSession(posConfigId);
  }

  /**
   * Abrir sesión POS (abre turno de caja).
   */
  openPosSession(shiftData: {
    warehouse_id: string;
    cashier_id: string;
    opening_balance: number;
    notes?: string;
    pos_configuration_id?: string;
  }): Observable<any> {
    return this.openCashShift(shiftData);
  }

  /**
   * Cerrar sesión POS.
   */
  closePosSession(
    shiftId: string,
    data: { closing_balance: number; notes?: string }
  ): Observable<any> {
    return this.closeCashShift(shiftId, data);
  }

  /**
   * Open cash shift
   */
  openCashShift(shiftData: {
    warehouse_id: string;
    cashier_id: string;
    opening_balance: number;
    notes?: string;
    pos_configuration_id?: string;
  }): Observable<any> {
    const payload = {
      pos_configuration_id: shiftData.pos_configuration_id,
      opening_cash: Number(shiftData.opening_balance || 0),
      ...(shiftData.notes?.trim() ? { notes: shiftData.notes.trim() } : {}),
    };
    return this.http.post(`${this.POS_SESSIONS_URL}/open`, payload).pipe(
      map((res: any) => this.extractPayload(res))
    );
  }
  
  /**
   * Get active cash shift
   */
  getActiveCashShift(posConfigId: string): Observable<any> {
    return this.getCurrentPosSession(posConfigId);
  }

  /**
   * Get current session by POS configuration
   */
  getCurrentPosSession(posConfigId: string): Observable<any> {
    return this.http.get(`${this.POS_SESSIONS_URL}/current/${posConfigId}`).pipe(
      map((res: any) => this.extractPayload(res))
    );
  }
  
  /**
   * Get cash shift report (detailed)
   */
  getCashShiftReport(shiftId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/cash-shifts/${shiftId}/report`);
  }
  
  /**
   * Close cash shift
   */
  closeCashShift(shiftId: string, closeData: {
    closing_balance: number;
    notes?: string;
  }): Observable<any> {
    const payload = {
      closing_cash: Number(closeData.closing_balance || 0),
      ...(closeData.notes?.trim() ? { notes: closeData.notes.trim() } : {}),
    };
    return this.http.patch(`${this.POS_SESSIONS_URL}/${shiftId}/close`, payload).pipe(
      map((res: any) => this.extractPayload(res))
    );
  }
  
  /**
   * List cash shifts (sesiones / turnos de caja)
   */
  getCashShifts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    /** UUID sucursal (billing branch), mismo criterio que pos-configurations */
    sucursal?: string;
    status?: 'open' | 'closed';
    opened_from?: string;
    opened_to?: string;
    pos_configuration_id?: string;
  }): Observable<any> {
    let httpParams = new HttpParams();
    if (params?.page != null) {
      httpParams = httpParams.set('page', String(params.page));
    }
    if (params?.limit != null) {
      httpParams = httpParams.set('limit', String(params.limit));
    }
    if (params?.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }
    if (params?.sucursal?.trim()) {
      httpParams = httpParams.set('sucursal', params.sucursal.trim());
    }
    if (params?.status) {
      httpParams = httpParams.set('status', params.status);
    }
    if (params?.opened_from?.trim()) {
      httpParams = httpParams.set('opened_from', params.opened_from.trim());
    }
    if (params?.opened_to?.trim()) {
      httpParams = httpParams.set('opened_to', params.opened_to.trim());
    }
    if (params?.pos_configuration_id?.trim()) {
      httpParams = httpParams.set('pos_configuration_id', params.pos_configuration_id.trim());
    }

    return this.http.get(`${this.POS_SESSIONS_URL}`, { params: httpParams }).pipe(
      map((res: any) => this.extractPayload(res, true))
    );
  }

  /**
   * Inventory summary for POS session (stock + suggested prices)
   */
  getPosSessionInventorySummary(
    sessionId: string,
    params?: PosSessionInventoryParams
  ): Observable<any[]> {
    let httpParams = new HttpParams();
    if (params?.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }
    if (params?.warehouse_id?.trim()) {
      httpParams = httpParams.set('warehouse_id', params.warehouse_id.trim());
    }
    if (params?.only_available === true) {
      httpParams = httpParams.set('only_available', 'true');
    }
    if (params?.page != null) {
      httpParams = httpParams.set('page', String(params.page));
    }
    if (params?.limit != null) {
      httpParams = httpParams.set('limit', String(params.limit));
    }

    return this.http
      .get<any>(`${this.INVENTORY_URL}/pos-sessions/${sessionId}/summary`, { params: httpParams })
      .pipe(
        map((res: any) => {
          const payload = this.extractPayload(res);
          if (Array.isArray(payload)) return payload;
          if (Array.isArray(payload?.data)) return payload.data;
          return [];
        })
      );
  }

  private extractPayload(response: any, keepListEnvelope = false): any {
    if (response && typeof response === 'object' && 'data' in response) {
      return keepListEnvelope ? response : response.data;
    }
    return response;
  }

  private extractCurrentDailyShift(response: unknown): PosDailyShiftDetail | null {
    const payload = this.extractPayload(response);
    if (!payload || typeof payload !== 'object') {
      return null;
    }

    const obj = payload as Record<string, unknown>;
    const candidates = [
      obj['daily_shift'],
      obj['current_daily_shift'],
      obj['current'],
      obj['shift'],
      obj,
    ];

    for (const candidate of candidates) {
      const normalized = normalizeDailyShiftDetail(candidate);
      if (normalized) {
        return normalized;
      }
    }

    return null;
  }

  // ========== DAILY SHIFTS (corte global) ==========

  getDailyShifts(params?: {
    page?: number;
    limit?: number;
    terminal_user_id?: string;
    billing_branch_id?: string;
    shift_date?: string;
    status?: 'open' | 'closed';
  }): Observable<PosDailyShiftListResponse> {
    let httpParams = new HttpParams();
    if (params?.page != null) {
      httpParams = httpParams.set('page', String(params.page));
    }
    if (params?.limit != null) {
      httpParams = httpParams.set('limit', String(params.limit));
    }
    if (params?.terminal_user_id?.trim()) {
      httpParams = httpParams.set('terminal_user_id', params.terminal_user_id.trim());
    }
    if (params?.billing_branch_id?.trim()) {
      httpParams = httpParams.set('billing_branch_id', params.billing_branch_id.trim());
    }
    if (params?.shift_date?.trim()) {
      httpParams = httpParams.set('shift_date', params.shift_date.trim());
    }
    if (params?.status) {
      httpParams = httpParams.set('status', params.status);
    }

    return this.http.get(`${this.API_URL}/daily-shifts`, { params: httpParams }).pipe(
      map((res: any) => this.normalizeDailyShiftList(res))
    );
  }

  getDailyShift(id: string): Observable<PosDailyShiftDetail> {
    return this.http.get(`${this.API_URL}/daily-shift/${id}`).pipe(
      map((res: any) => {
        const payload = this.extractPayload(res);
        return normalizeDailyShiftDetail(payload?.daily_shift ?? payload) as PosDailyShiftDetail;
      })
    );
  }

  getCurrentDailyShift(): Observable<{ daily_shift: PosDailyShiftDetail | null }> {
    return this.http.get(`${this.API_URL}/daily-shift/current`).pipe(
      map((res: any) => ({
        daily_shift: this.extractCurrentDailyShift(res),
      })),
      catchError((error) => {
        if (error?.status === 404) {
          return of({ daily_shift: null });
        }
        return throwError(() => error);
      })
    );
  }

  openDailyShift(data: {
    opening_cash_mxn: number;
    opening_cash_usd?: number;
    notes?: string;
  }): Observable<OpenDailyShiftResponse> {
    return this.http.post(`${this.API_URL}/daily-shift/open`, data).pipe(
      map((res: any) => {
        const payload = this.extractPayload(res);
        const daily_shift = normalizeDailyShiftDetail(payload?.daily_shift ?? payload) as PosDailyShiftDetail;
        return {
          message: payload?.message,
          daily_shift,
          queued_sales_assigned:
            typeof payload?.queued_sales_assigned === 'number'
              ? payload.queued_sales_assigned
              : undefined,
        };
      })
    );
  }

  closeDailyShift(id: string, data?: { notes?: string }): Observable<PosDailyShiftDetail> {
    return this.http.patch(`${this.API_URL}/daily-shift/${id}/close`, data ?? {}).pipe(
      map((res: any) => {
        const payload = this.extractPayload(res);
        return normalizeDailyShiftDetail(payload?.daily_shift ?? payload) as PosDailyShiftDetail;
      })
    );
  }

  createPartialShift(
    dailyShiftId: string,
    data: {
      denominations: Array<{ currency: 'MXN' | 'USD'; denomination: number; bill_count: number }>;
      notes?: string;
      performed_by_user_id?: string;
    }
  ): Observable<unknown> {
    return this.http.post(`${this.API_URL}/daily-shift/${dailyShiftId}/partial-shifts`, data).pipe(
      map((res: any) => this.extractPayload(res))
    );
  }

  validateSellerCode(code: number): Observable<ValidateSellerCodeResponse> {
    return this.http.post(`${this.API_URL}/validate-seller-code`, { code }).pipe(
      map((res: any) => this.extractPayload(res) as ValidateSellerCodeResponse)
    );
  }

  getPendingSales(): Observable<{ pending_sales: unknown[] }> {
    return this.http.get(`${this.API_URL}/pending-sales`).pipe(
      map((res: any) => {
        const payload = this.extractPayload(res);
        const pending =
          payload?.pending_sales ??
          payload?.data ??
          (Array.isArray(payload) ? payload : []);
        return { pending_sales: Array.isArray(pending) ? pending : [] };
      })
    );
  }

  collectSale(salesOrderId: string, data?: CollectSalePayload): Observable<CollectSaleResponse> {
    return this.http.post(`${this.API_URL}/sales/${salesOrderId}/collect`, data ?? {}).pipe(
      map((res: unknown) => {
        const payload = this.extractPayload(res) ?? res;
        return normalizeCollectSaleResponse(payload);
      })
    );
  }

  getSaleReceipt(salesOrderId: string): Observable<PosSaleReceipt | null> {
    return this.http.get(`${this.API_URL}/sales/${salesOrderId}/receipt`).pipe(
      map((res: unknown) => normalizePosSaleReceipt(this.extractPayload(res) ?? res))
    );
  }

  getCollectedSales(params?: { daily_shift_id?: string }): Observable<CollectedSalesResponse> {
    let httpParams = new HttpParams();
    if (params?.daily_shift_id?.trim()) {
      httpParams = httpParams.set('daily_shift_id', params.daily_shift_id.trim());
    }
    return this.http.get(`${this.API_URL}/collected-sales`, { params: httpParams }).pipe(
      map((res: any) => normalizeCollectedSalesResponse(this.extractPayload(res)))
    );
  }

  getSaleCollection(salesOrderId: string): Observable<unknown> {
    return this.http.get(`${this.API_URL}/sales/${salesOrderId}/collection`).pipe(
      map((res: any) => this.extractPayload(res))
    );
  }

  getPosInventorySummary(params?: {
    search?: string;
    product_id?: string;
    page?: number;
    limit?: number;
  }): Observable<PosInventorySummaryResponse> {
    let httpParams = new HttpParams();
    if (params?.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }
    if (params?.product_id?.trim()) {
      httpParams = httpParams.set('product_id', params.product_id.trim());
    }
    if (params?.page != null) {
      httpParams = httpParams.set('page', String(params.page));
    }
    if (params?.limit != null) {
      httpParams = httpParams.set('limit', String(params.limit));
    }

    return this.http.get(`${this.INVENTORY_URL}/pos/summary`, { params: httpParams }).pipe(
      map((res: unknown) => normalizePosInventorySummary(this.unwrapPosSummaryEnvelope(res)))
    );
  }

  private unwrapPosSummaryEnvelope(response: unknown): unknown {
    if (!response || typeof response !== 'object') {
      return response;
    }
    const root = response as Record<string, unknown>;
    const inner = root['data'];
    if (inner && typeof inner === 'object') {
      return inner;
    }
    return response;
  }

  private normalizeDailyShiftList(res: unknown): PosDailyShiftListResponse {
    if (res == null) {
      return { data: [], total: 0 };
    }
    if (Array.isArray(res)) {
      return { data: res as PosDailyShiftListItem[], total: res.length };
    }
    const obj = res as Record<string, unknown>;
    const raw =
      obj['data'] ??
      obj['daily_shifts'] ??
      obj['shifts'] ??
      obj['results'] ??
      obj['items'];
    const data = Array.isArray(raw) ? (raw as PosDailyShiftListItem[]) : [];
    const total =
      (typeof obj['total'] === 'number' ? obj['total'] : null) ??
      (typeof obj['count'] === 'number' ? obj['count'] : null) ??
      data.length;
    return { data, total };
  }
  
  // ========== TABLES ==========
  
  /**
   * List tables
   */
  getTables(params?: { warehouse_id?: string; status?: string }): Observable<any> {
    let httpParams = new HttpParams();
    if (params?.warehouse_id) httpParams = httpParams.set('warehouse_id', params.warehouse_id);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    
    return this.http.get(`${this.API_URL}/tables`, { params: httpParams });
  }
  
  /**
   * Create table
   */
  createTable(tableData: {
    warehouse_id: string;
    table_number: string;
    zone?: string;
    capacity?: number;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/tables`, tableData);
  }
  
  /**
   * Update table
   */
  updateTable(tableId: string, tableData: { status?: string }): Observable<any> {
    return this.http.patch(`${this.API_URL}/tables/${tableId}`, tableData);
  }
  
  /**
   * Release table
   */
  releaseTable(tableId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/tables/${tableId}/release`, {});
  }
  
  // ========== REPORTS ==========
  
  /**
   * Get daily sales report
   */
  getDailySales(params: { date: string; warehouse_id?: string }): Observable<any> {
    let httpParams = new HttpParams().set('date', params.date);
    if (params.warehouse_id) httpParams = httpParams.set('warehouse_id', params.warehouse_id);
    
    return this.http.get(`${this.API_URL}/reports/daily-sales`, { params: httpParams });
  }
  
  /**
   * Get waiter performance report
   */
  getWaiterPerformance(params: { start_date: string; end_date: string }): Observable<any> {
    const httpParams = new HttpParams()
      .set('start_date', params.start_date)
      .set('end_date', params.end_date);
    
    return this.http.get(`${this.API_URL}/reports/waiter-performance`, { params: httpParams });
  }
  
  /**
   * Get top products report
   */
  getTopProducts(params: { start_date: string; end_date: string; limit?: number }): Observable<any> {
    let httpParams = new HttpParams()
      .set('start_date', params.start_date)
      .set('end_date', params.end_date);
    if (params.limit) httpParams = httpParams.set('limit', params.limit.toString());
    
    return this.http.get(`${this.API_URL}/reports/top-products`, { params: httpParams });
  }
  
  /**
   * Get shift summary report
   */
  getShiftSummary(shiftId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/reports/shift-summary/${shiftId}`);
  }
}
