import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7ZU2RCPO.js";

// src/app/features/pos/services/pos.service.ts
var POSService = class _POSService {
  http;
  API_URL = `${environment.api}/tenant/pos`;
  cartState = signal({
    items: [],
    total_subtotal: 0,
    total_iva: 0,
    total_ieps: 0,
    grand_total: 0
  }, ...ngDevMode ? [{ debugName: "cartState" }] : []);
  cart = this.cartState.asReadonly();
  constructor(http) {
    this.http = http;
  }
  /**
   * Add item to cart
   */
  addItem(item) {
    const currentCart = this.cartState();
    const existingItemIndex = currentCart.items.findIndex((i) => i.product_id === item.product_id && i.uom_id === item.uom_id);
    let updatedItems;
    if (existingItemIndex >= 0) {
      updatedItems = currentCart.items.map((i, index) => {
        if (index === existingItemIndex) {
          const newQuantity = i.quantity + item.quantity;
          return this.recalculateItem(__spreadProps(__spreadValues({}, i), { quantity: newQuantity }));
        }
        return i;
      });
    } else {
      updatedItems = [...currentCart.items, item];
    }
    this.updateCart(updatedItems);
  }
  /**
   * Update item quantity
   */
  updateItemQuantity(index, quantity) {
    const currentCart = this.cartState();
    const updatedItems = currentCart.items.map((item, i) => {
      if (i === index) {
        return this.recalculateItem(__spreadProps(__spreadValues({}, item), { quantity }));
      }
      return item;
    });
    this.updateCart(updatedItems);
  }
  /**
   * Remove item from cart
   */
  removeItem(index) {
    const currentCart = this.cartState();
    const updatedItems = currentCart.items.filter((_, i) => i !== index);
    this.updateCart(updatedItems);
  }
  /**
   * Clear cart
   */
  clearCart() {
    this.cartState.set({
      items: [],
      total_subtotal: 0,
      total_iva: 0,
      total_ieps: 0,
      grand_total: 0
    });
  }
  /**
   * Recalculate item totals
   */
  recalculateItem(item) {
    const subtotal = item.quantity * item.unit_price;
    const iva_amount = subtotal * (item.iva_percentage / 100);
    const ieps_amount = subtotal * (item.ieps_percentage / 100);
    const line_total = subtotal + iva_amount + ieps_amount;
    return __spreadProps(__spreadValues({}, item), {
      subtotal,
      iva_amount,
      ieps_amount,
      line_total
    });
  }
  /**
   * Update cart with new items and recalculate totals
   */
  updateCart(items) {
    const total_subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const total_iva = items.reduce((sum, item) => sum + item.iva_amount, 0);
    const total_ieps = items.reduce((sum, item) => sum + item.ieps_amount, 0);
    const grand_total = total_subtotal + total_iva + total_ieps;
    this.cartState.set({
      items,
      total_subtotal,
      total_iva,
      total_ieps,
      grand_total
    });
  }
  /**
   * Get cart for order creation
   */
  getCartForOrder(warehouse_id, customer_id) {
    const cart = this.cartState();
    return {
      warehouse_id,
      customer_id,
      line_items: cart.items.map((item) => ({
        product_id: item.product_id,
        uom_id: item.uom_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        iva_percentage: item.iva_percentage,
        ieps_percentage: item.ieps_percentage
      }))
    };
  }
  /**
   * Create POS order
   */
  createOrder(orderData) {
    return this.http.post(`${this.API_URL}/orders`, orderData);
  }
  /**
   * Get all POS orders with optional filters
   */
  getOrders(params) {
    let httpParams = new HttpParams();
    if (params?.page)
      httpParams = httpParams.set("page", params.page.toString());
    if (params?.limit)
      httpParams = httpParams.set("limit", params.limit.toString());
    if (params?.status)
      httpParams = httpParams.set("status", params.status);
    return this.http.get(`${this.API_URL}/orders`, { params: httpParams });
  }
  /**
   * Get POS order by ID
   */
  getOrderById(orderId) {
    return this.http.get(`${this.API_URL}/orders/${orderId}`);
  }
  /**
   * Get active orders
   */
  getActiveOrders() {
    return this.http.get(`${this.API_URL}/orders/active`);
  }
  /**
   * Cancel order
   */
  cancelOrder(orderId) {
    return this.http.post(`${this.API_URL}/orders/${orderId}/cancel`, {});
  }
  // ========== LINE ITEMS ==========
  /**
   * Add line to order
   */
  addLineToOrder(orderId, lineData) {
    return this.http.post(`${this.API_URL}/orders/${orderId}/lines`, lineData);
  }
  /**
   * Update line in order
   */
  updateLine(orderId, lineId, lineData) {
    return this.http.patch(`${this.API_URL}/orders/${orderId}/lines/${lineId}`, lineData);
  }
  /**
   * Delete line from order
   */
  deleteLine(orderId, lineId) {
    return this.http.delete(`${this.API_URL}/orders/${orderId}/lines/${lineId}`);
  }
  /**
   * Change line status
   */
  changeLineStatus(orderId, lineId, status) {
    return this.http.patch(`${this.API_URL}/orders/${orderId}/lines/${lineId}/status`, { status });
  }
  // ========== PAYMENTS ==========
  /**
   * Process simple payment
   */
  processPayment(orderId, paymentData) {
    return this.http.post(`${this.API_URL}/orders/${orderId}/payment`, paymentData);
  }
  /**
   * Process split payment
   */
  processSplitPayment(orderId, paymentData) {
    return this.http.post(`${this.API_URL}/orders/${orderId}/split-payment`, paymentData);
  }
  // ========== CASH SHIFTS / SESIÓN POS ==========
  // La UI usa el término "sesión POS"; el API actual es `cash-shifts`.
  /**
   * Sesión POS activa (mismo recurso que turno de caja).
   */
  getActivePosSession(warehouseId) {
    return this.getActiveCashShift(warehouseId);
  }
  /**
   * Abrir sesión POS (abre turno de caja).
   */
  openPosSession(shiftData) {
    return this.openCashShift(shiftData);
  }
  /**
   * Cerrar sesión POS.
   */
  closePosSession(shiftId, data) {
    return this.closeCashShift(shiftId, data);
  }
  /**
   * Open cash shift
   */
  openCashShift(shiftData) {
    return this.http.post(`${this.API_URL}/cash-shifts/open`, shiftData);
  }
  /**
   * Get active cash shift
   */
  getActiveCashShift(warehouseId) {
    const params = new HttpParams().set("warehouse_id", warehouseId);
    return this.http.get(`${this.API_URL}/cash-shifts/current`, { params });
  }
  /**
   * Get cash shift report (detailed)
   */
  getCashShiftReport(shiftId) {
    return this.http.get(`${this.API_URL}/cash-shifts/${shiftId}/report`);
  }
  /**
   * Close cash shift
   */
  closeCashShift(shiftId, closeData) {
    return this.http.post(`${this.API_URL}/cash-shifts/${shiftId}/close`, closeData);
  }
  /**
   * List cash shifts (sesiones / turnos de caja)
   */
  getCashShifts(params) {
    let httpParams = new HttpParams();
    if (params?.page != null) {
      httpParams = httpParams.set("page", String(params.page));
    }
    if (params?.limit != null) {
      httpParams = httpParams.set("limit", String(params.limit));
    }
    if (params?.search?.trim()) {
      httpParams = httpParams.set("search", params.search.trim());
    }
    if (params?.sucursal?.trim()) {
      httpParams = httpParams.set("sucursal", params.sucursal.trim());
    }
    return this.http.get(`${this.API_URL}/cash-shifts`, { params: httpParams });
  }
  // ========== TABLES ==========
  /**
   * List tables
   */
  getTables(params) {
    let httpParams = new HttpParams();
    if (params?.warehouse_id)
      httpParams = httpParams.set("warehouse_id", params.warehouse_id);
    if (params?.status)
      httpParams = httpParams.set("status", params.status);
    return this.http.get(`${this.API_URL}/tables`, { params: httpParams });
  }
  /**
   * Create table
   */
  createTable(tableData) {
    return this.http.post(`${this.API_URL}/tables`, tableData);
  }
  /**
   * Update table
   */
  updateTable(tableId, tableData) {
    return this.http.patch(`${this.API_URL}/tables/${tableId}`, tableData);
  }
  /**
   * Release table
   */
  releaseTable(tableId) {
    return this.http.post(`${this.API_URL}/tables/${tableId}/release`, {});
  }
  // ========== REPORTS ==========
  /**
   * Get daily sales report
   */
  getDailySales(params) {
    let httpParams = new HttpParams().set("date", params.date);
    if (params.warehouse_id)
      httpParams = httpParams.set("warehouse_id", params.warehouse_id);
    return this.http.get(`${this.API_URL}/reports/daily-sales`, { params: httpParams });
  }
  /**
   * Get waiter performance report
   */
  getWaiterPerformance(params) {
    const httpParams = new HttpParams().set("start_date", params.start_date).set("end_date", params.end_date);
    return this.http.get(`${this.API_URL}/reports/waiter-performance`, { params: httpParams });
  }
  /**
   * Get top products report
   */
  getTopProducts(params) {
    let httpParams = new HttpParams().set("start_date", params.start_date).set("end_date", params.end_date);
    if (params.limit)
      httpParams = httpParams.set("limit", params.limit.toString());
    return this.http.get(`${this.API_URL}/reports/top-products`, { params: httpParams });
  }
  /**
   * Get shift summary report
   */
  getShiftSummary(shiftId) {
    return this.http.get(`${this.API_URL}/reports/shift-summary/${shiftId}`);
  }
  static \u0275fac = function POSService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _POSService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _POSService, factory: _POSService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(POSService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  POSService
};
//# sourceMappingURL=chunk-MGEJLMJK.js.map
