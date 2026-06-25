import {
  normalizeCollectedSalesResponse,
  normalizeDailyShiftDetail,
  normalizePosSaleCollection
} from "./chunk-HSRMLKO4.js";
import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-BMMLV6YT.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  map,
  of,
  setClassMetadata,
  signal,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-57S27ROJ.js";

// src/app/features/pos/models/pos-inventory-summary.model.ts
function normalizeWarehouse(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const row = raw;
  const id = String(row["id"] ?? row["warehouse_id"] ?? "").trim();
  if (!id) {
    return null;
  }
  return {
    id,
    name: String(row["name"] ?? row["warehouse_name"] ?? "Almac\xE9n"),
    status: row["status"] != null ? String(row["status"]) : void 0
  };
}
function normalizeRows(raw) {
  if (Array.isArray(raw)) {
    return raw;
  }
  if (!raw || typeof raw !== "object") {
    return [];
  }
  const obj = raw;
  const candidates = [obj["data"], obj["items"], obj["products"], obj["results"]];
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }
  return [];
}
function normalizePosInventorySummary(raw) {
  if (Array.isArray(raw)) {
    return {
      billing_branch_id: null,
      warehouses: [],
      applied_warehouse_id: null,
      data: raw
    };
  }
  if (!raw || typeof raw !== "object") {
    return {
      billing_branch_id: null,
      warehouses: [],
      applied_warehouse_id: null,
      data: []
    };
  }
  const obj = raw;
  const nested = obj["data"] && typeof obj["data"] === "object" && !Array.isArray(obj["data"]) ? obj["data"] : null;
  const source = nested ?? obj;
  const warehousesRaw = source["warehouses"] ?? obj["warehouses"];
  const warehouses = Array.isArray(warehousesRaw) ? warehousesRaw.map(normalizeWarehouse).filter((w) => w != null) : [];
  const billingBranchId = source["billing_branch_id"] ?? obj["billing_branch_id"];
  const appliedWarehouseId = source["applied_warehouse_id"] ?? obj["applied_warehouse_id"];
  return {
    billing_branch_id: billingBranchId != null && String(billingBranchId).trim() ? String(billingBranchId).trim() : null,
    warehouses,
    applied_warehouse_id: appliedWarehouseId != null && String(appliedWarehouseId).trim() ? String(appliedWarehouseId).trim() : null,
    data: normalizeRows(source)
  };
}
function extractWarehouseIdFromRow(row) {
  if (!row || typeof row !== "object") {
    return null;
  }
  const record = row;
  const direct = record["warehouse_id"] ?? record["warehouseId"];
  if (direct != null && String(direct).trim()) {
    return String(direct).trim();
  }
  const warehouse = record["warehouse"];
  if (warehouse && typeof warehouse === "object") {
    const id = warehouse["id"];
    if (id != null && String(id).trim()) {
      return String(id).trim();
    }
  }
  return null;
}
function extractWarehouseNameFromRow(row) {
  if (!row || typeof row !== "object") {
    return null;
  }
  const record = row;
  const direct = record["warehouse_name"] ?? record["warehouseName"];
  if (direct != null && String(direct).trim()) {
    return String(direct).trim();
  }
  const warehouse = record["warehouse"];
  if (warehouse && typeof warehouse === "object") {
    const name = warehouse["name"];
    if (name != null && String(name).trim()) {
      return String(name).trim();
    }
  }
  return null;
}
function collectWarehousesFromRows(rows) {
  const map2 = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const id = extractWarehouseIdFromRow(row);
    if (!id) {
      continue;
    }
    map2.set(id, {
      id,
      name: extractWarehouseNameFromRow(row) ?? "Almac\xE9n"
    });
  }
  return [...map2.values()];
}
function enrichPosInventorySummary(summary) {
  if (summary.warehouses.length > 0) {
    return summary;
  }
  const fromRows = collectWarehousesFromRows(summary.data);
  if (fromRows.length === 0) {
    return summary;
  }
  return __spreadProps(__spreadValues({}, summary), {
    warehouses: fromRows
  });
}
function resolvePosWarehouseId(summary) {
  const enriched = enrichPosInventorySummary(summary);
  const warehouses = enriched.warehouses ?? [];
  const validIds = new Set(warehouses.map((w) => w.id));
  const applied = enriched.applied_warehouse_id?.trim();
  if (applied && (validIds.size === 0 || validIds.has(applied))) {
    return applied;
  }
  for (const row of enriched.data) {
    const rowWarehouseId = extractWarehouseIdFromRow(row);
    if (rowWarehouseId && (validIds.size === 0 || validIds.has(rowWarehouseId))) {
      return rowWarehouseId;
    }
  }
  const stored = localStorage.getItem("pos_warehouse_id")?.trim();
  if (stored && (validIds.size === 0 || validIds.has(stored))) {
    return stored;
  }
  return warehouses[0]?.id ?? applied ?? "";
}
function persistPosWarehouseId(warehouseId) {
  const id = warehouseId?.trim();
  if (id) {
    localStorage.setItem("pos_warehouse_id", id);
  } else {
    localStorage.removeItem("pos_warehouse_id");
  }
}

// src/app/features/pos/models/pos-receipt.model.ts
function normalizePosSaleReceipt(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const obj = raw;
  const nested = obj["receipt"] && typeof obj["receipt"] === "object" ? obj["receipt"] : obj;
  const base64 = nested["escpos_base64"];
  if (base64 == null || String(base64).trim() === "") {
    if (!nested["plain_text"] && !nested["download_url"]) {
      return null;
    }
  }
  return {
    document_id: nested["document_id"] != null ? String(nested["document_id"]) : void 0,
    file_name: nested["file_name"] != null ? String(nested["file_name"]) : void 0,
    mime_type: nested["mime_type"] != null ? String(nested["mime_type"]) : void 0,
    download_url: nested["download_url"] != null ? String(nested["download_url"]) : null,
    escpos_base64: base64 != null ? String(base64) : void 0,
    plain_text: nested["plain_text"] != null ? String(nested["plain_text"]) : void 0,
    printer_profile: nested["printer_profile"] != null ? String(nested["printer_profile"]) : void 0
  };
}
function normalizeCollectSaleResponse(raw) {
  if (!raw || typeof raw !== "object") {
    return {};
  }
  const root = raw;
  const source = root["data"] && typeof root["data"] === "object" && !Array.isArray(root["data"]) ? root["data"] : root;
  return {
    message: source["message"] != null ? String(source["message"]) : void 0,
    collection: normalizePosSaleCollection(source["collection"]),
    receipt: normalizePosSaleReceipt(source["receipt"]),
    sales_order: source["sales_order"] && typeof source["sales_order"] === "object" ? source["sales_order"] : null
  };
}

// src/app/features/pos/services/pos.service.ts
var POSService = class _POSService {
  http;
  API_URL = `${environment.api}/tenant/pos`;
  POS_SESSIONS_URL = `${environment.api}/tenant/pos-sessions`;
  INVENTORY_URL = `${environment.api}/tenant/inventory`;
  SALES_ORDERS_URL = `${environment.api}/tenant/sales-orders`;
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
   * Update item price/taxes (pricing option override)
   */
  updateItemPricing(index, pricing) {
    const currentCart = this.cartState();
    const updatedItems = currentCart.items.map((item, i) => {
      if (i === index) {
        return this.recalculateItem(__spreadProps(__spreadValues({}, item), {
          unit_price: pricing.unit_price,
          iva_percentage: pricing.iva_percentage,
          ieps_percentage: pricing.ieps_percentage,
          selected_price_list_id: pricing.selected_price_list_id ?? item.selected_price_list_id
        }));
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
   * Crear orden de venta POS (POST /tenant/sales-orders, tipo POS → surtida automática).
   */
  createPosSalesOrder(orderData) {
    return this.http.post(this.SALES_ORDERS_URL, orderData).pipe(map((res) => this.extractPayload(res)));
  }
  /** @deprecated Usar createPosSalesOrder */
  createOrder(orderData) {
    return this.createPosSalesOrder(orderData);
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
  getActivePosSession(posConfigId) {
    return this.getCurrentPosSession(posConfigId);
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
    const payload = __spreadValues({
      pos_configuration_id: shiftData.pos_configuration_id,
      opening_cash: Number(shiftData.opening_balance || 0)
    }, shiftData.notes?.trim() ? { notes: shiftData.notes.trim() } : {});
    return this.http.post(`${this.POS_SESSIONS_URL}/open`, payload).pipe(map((res) => this.extractPayload(res)));
  }
  /**
   * Get active cash shift
   */
  getActiveCashShift(posConfigId) {
    return this.getCurrentPosSession(posConfigId);
  }
  /**
   * Get current session by POS configuration
   */
  getCurrentPosSession(posConfigId) {
    return this.http.get(`${this.POS_SESSIONS_URL}/current/${posConfigId}`).pipe(map((res) => this.extractPayload(res)));
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
    const payload = __spreadValues({
      closing_cash: Number(closeData.closing_balance || 0)
    }, closeData.notes?.trim() ? { notes: closeData.notes.trim() } : {});
    return this.http.patch(`${this.POS_SESSIONS_URL}/${shiftId}/close`, payload).pipe(map((res) => this.extractPayload(res)));
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
    if (params?.status) {
      httpParams = httpParams.set("status", params.status);
    }
    if (params?.opened_from?.trim()) {
      httpParams = httpParams.set("opened_from", params.opened_from.trim());
    }
    if (params?.opened_to?.trim()) {
      httpParams = httpParams.set("opened_to", params.opened_to.trim());
    }
    if (params?.pos_configuration_id?.trim()) {
      httpParams = httpParams.set("pos_configuration_id", params.pos_configuration_id.trim());
    }
    return this.http.get(`${this.POS_SESSIONS_URL}`, { params: httpParams }).pipe(map((res) => this.extractPayload(res, true)));
  }
  /**
   * Inventory summary for POS session (stock + suggested prices)
   */
  getPosSessionInventorySummary(sessionId, params) {
    let httpParams = new HttpParams();
    if (params?.search?.trim()) {
      httpParams = httpParams.set("search", params.search.trim());
    }
    if (params?.warehouse_id?.trim()) {
      httpParams = httpParams.set("warehouse_id", params.warehouse_id.trim());
    }
    if (params?.only_available === true) {
      httpParams = httpParams.set("only_available", "true");
    }
    if (params?.page != null) {
      httpParams = httpParams.set("page", String(params.page));
    }
    if (params?.limit != null) {
      httpParams = httpParams.set("limit", String(params.limit));
    }
    return this.http.get(`${this.INVENTORY_URL}/pos-sessions/${sessionId}/summary`, { params: httpParams }).pipe(map((res) => {
      const payload = this.extractPayload(res);
      if (Array.isArray(payload))
        return payload;
      if (Array.isArray(payload?.data))
        return payload.data;
      return [];
    }));
  }
  extractPayload(response, keepListEnvelope = false) {
    if (response && typeof response === "object" && "data" in response) {
      return keepListEnvelope ? response : response.data;
    }
    return response;
  }
  extractCurrentDailyShift(response) {
    const payload = this.extractPayload(response);
    if (!payload || typeof payload !== "object") {
      return null;
    }
    const obj = payload;
    const candidates = [
      obj["daily_shift"],
      obj["current_daily_shift"],
      obj["current"],
      obj["shift"],
      obj
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
  getDailyShifts(params) {
    let httpParams = new HttpParams();
    if (params?.page != null) {
      httpParams = httpParams.set("page", String(params.page));
    }
    if (params?.limit != null) {
      httpParams = httpParams.set("limit", String(params.limit));
    }
    if (params?.terminal_user_id?.trim()) {
      httpParams = httpParams.set("terminal_user_id", params.terminal_user_id.trim());
    }
    if (params?.billing_branch_id?.trim()) {
      httpParams = httpParams.set("billing_branch_id", params.billing_branch_id.trim());
    }
    if (params?.shift_date?.trim()) {
      httpParams = httpParams.set("shift_date", params.shift_date.trim());
    }
    if (params?.status) {
      httpParams = httpParams.set("status", params.status);
    }
    return this.http.get(`${this.API_URL}/daily-shifts`, { params: httpParams }).pipe(map((res) => this.normalizeDailyShiftList(res)));
  }
  getDailyShift(id) {
    return this.http.get(`${this.API_URL}/daily-shift/${id}`).pipe(map((res) => {
      const payload = this.extractPayload(res);
      return normalizeDailyShiftDetail(payload?.daily_shift ?? payload);
    }));
  }
  getCurrentDailyShift() {
    return this.http.get(`${this.API_URL}/daily-shift/current`).pipe(map((res) => ({
      daily_shift: this.extractCurrentDailyShift(res)
    })), catchError((error) => {
      if (error?.status === 404) {
        return of({ daily_shift: null });
      }
      return throwError(() => error);
    }));
  }
  openDailyShift(data) {
    return this.http.post(`${this.API_URL}/daily-shift/open`, data).pipe(map((res) => {
      const payload = this.extractPayload(res);
      const daily_shift = normalizeDailyShiftDetail(payload?.daily_shift ?? payload);
      return {
        message: payload?.message,
        daily_shift,
        queued_sales_assigned: typeof payload?.queued_sales_assigned === "number" ? payload.queued_sales_assigned : void 0
      };
    }));
  }
  closeDailyShift(id, data) {
    return this.http.patch(`${this.API_URL}/daily-shift/${id}/close`, data ?? {}).pipe(map((res) => {
      const payload = this.extractPayload(res);
      return normalizeDailyShiftDetail(payload?.daily_shift ?? payload);
    }));
  }
  createPartialShift(dailyShiftId, data) {
    return this.http.post(`${this.API_URL}/daily-shift/${dailyShiftId}/partial-shifts`, data).pipe(map((res) => this.extractPayload(res)));
  }
  validateSellerCode(code) {
    return this.http.post(`${this.API_URL}/validate-seller-code`, { code }).pipe(map((res) => this.extractPayload(res)));
  }
  getPendingSales() {
    return this.http.get(`${this.API_URL}/pending-sales`).pipe(map((res) => {
      const payload = this.extractPayload(res);
      const pending = payload?.pending_sales ?? payload?.data ?? (Array.isArray(payload) ? payload : []);
      return { pending_sales: Array.isArray(pending) ? pending : [] };
    }));
  }
  collectSale(salesOrderId, data) {
    return this.http.post(`${this.API_URL}/sales/${salesOrderId}/collect`, data ?? {}).pipe(map((res) => {
      const payload = this.extractPayload(res) ?? res;
      return normalizeCollectSaleResponse(payload);
    }));
  }
  getSaleReceipt(salesOrderId) {
    return this.http.get(`${this.API_URL}/sales/${salesOrderId}/receipt`).pipe(map((res) => normalizePosSaleReceipt(this.extractPayload(res) ?? res)));
  }
  getCollectedSales(params) {
    let httpParams = new HttpParams();
    if (params?.daily_shift_id?.trim()) {
      httpParams = httpParams.set("daily_shift_id", params.daily_shift_id.trim());
    }
    return this.http.get(`${this.API_URL}/collected-sales`, { params: httpParams }).pipe(map((res) => normalizeCollectedSalesResponse(this.extractPayload(res))));
  }
  getSaleCollection(salesOrderId) {
    return this.http.get(`${this.API_URL}/sales/${salesOrderId}/collection`).pipe(map((res) => this.extractPayload(res)));
  }
  getPosInventorySummary(params) {
    let httpParams = new HttpParams();
    if (params?.search?.trim()) {
      httpParams = httpParams.set("search", params.search.trim());
    }
    if (params?.product_id?.trim()) {
      httpParams = httpParams.set("product_id", params.product_id.trim());
    }
    if (params?.page != null) {
      httpParams = httpParams.set("page", String(params.page));
    }
    if (params?.limit != null) {
      httpParams = httpParams.set("limit", String(params.limit));
    }
    return this.http.get(`${this.INVENTORY_URL}/pos/summary`, { params: httpParams }).pipe(map((res) => normalizePosInventorySummary(this.unwrapPosSummaryEnvelope(res))));
  }
  unwrapPosSummaryEnvelope(response) {
    if (!response || typeof response !== "object") {
      return response;
    }
    const root = response;
    const inner = root["data"];
    if (inner && typeof inner === "object") {
      return inner;
    }
    return response;
  }
  normalizeDailyShiftList(res) {
    if (res == null) {
      return { data: [], total: 0 };
    }
    if (Array.isArray(res)) {
      return { data: res, total: res.length };
    }
    const obj = res;
    const raw = obj["data"] ?? obj["daily_shifts"] ?? obj["shifts"] ?? obj["results"] ?? obj["items"];
    const data = Array.isArray(raw) ? raw : [];
    const total = (typeof obj["total"] === "number" ? obj["total"] : null) ?? (typeof obj["count"] === "number" ? obj["count"] : null) ?? data.length;
    return { data, total };
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
  normalizePosInventorySummary,
  enrichPosInventorySummary,
  resolvePosWarehouseId,
  persistPosWarehouseId,
  POSService
};
//# sourceMappingURL=chunk-MN35NIJR.js.map
