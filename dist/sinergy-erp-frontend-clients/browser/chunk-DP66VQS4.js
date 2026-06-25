import {
  TaxCalculatorService
} from "./chunk-ZYCDY34Q.js";
import {
  Router
} from "./chunk-YUPXBHST.js";
import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-FGZNYMY3.js";
import {
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  map,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-XEFUC5ED.js";

// src/app/features/purchase-orders/services/purchase-order.service.ts
var PurchaseOrderService = class _PurchaseOrderService {
  http;
  router;
  taxCalculator;
  baseUrl = `${environment.api}/tenant/purchase-orders`;
  constructor(http, router, taxCalculator) {
    this.http = http;
    this.router = router;
    this.taxCalculator = taxCalculator;
  }
  /**
   * Get paginated list of purchase orders with filters
   */
  getOrders(filters, pagination) {
    let params = new HttpParams().set("page", pagination.page.toString()).set("limit", pagination.limit.toString());
    if (filters.search) {
      params = params.set("search", filters.search);
    }
    if (filters.dateFrom) {
      params = params.set("start_date", filters.dateFrom);
    }
    if (filters.dateTo) {
      params = params.set("end_date", filters.dateTo);
    }
    if (filters.status) {
      params = params.set("status", filters.status);
    }
    if (filters.warehouseId) {
      params = params.set("warehouse_id", filters.warehouseId);
    }
    return this.http.get(this.baseUrl, { params }).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Get single purchase order by ID
   */
  getOrderById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((raw) => this.normalizePurchaseOrderResponse(raw)), catchError((error) => this.handleError(error)));
  }
  /**
   * Unwraps `{ data: { header, documents, ... } }` and maps API line fields
   * (`unit_total`, nested `product_uom.uom`) into what the UI expects (`unit_price`, `uom`, row totals).
   */
  normalizePurchaseOrderResponse(raw) {
    const body = raw;
    let order;
    if (body?.data && typeof body.data === "object" && body.data.header) {
      const data = body.data;
      order = __spreadValues({}, data.header);
      if (Array.isArray(data.documents)) {
        order.documents = data.documents;
      }
      if (Array.isArray(data.batches) && data.batches.length > 0) {
        order.batches = data.batches;
      }
      if (Array.isArray(data.payments)) {
        order.payments = data.payments;
      }
      if (data.payments_summary && typeof data.payments_summary === "object") {
        order.payments_summary = data.payments_summary;
      }
    } else {
      order = __spreadValues({}, body);
    }
    if (Array.isArray(order.line_items)) {
      order.line_items = order.line_items.map((li) => this.normalizeLineItemFromApi(li));
    }
    return order;
  }
  parseAmount(value) {
    if (value === null || value === void 0 || value === "") {
      return 0;
    }
    const n = typeof value === "number" ? value : parseFloat(String(value));
    return Number.isFinite(n) ? n : 0;
  }
  normalizeLineItemFromApi(item) {
    const qty = this.parseAmount(item.quantity);
    const unitCost = this.parseAmount(item.unit_price ?? item.unit_total);
    const ivaPct = this.parseAmount(item.iva_percentage);
    const iepsPct = this.parseAmount(item.ieps_percentage);
    const hasRowTotals = item.subtotal != null && item.iva_amount != null && item.ieps_amount != null && item.line_total != null;
    let subtotal;
    let iva_amount;
    let ieps_amount;
    let line_total;
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
    const productUom = item.product_uom;
    const nestedUom = productUom?.uom;
    const uom = item.uom ?? nestedUom;
    const uomId = item.uom_id ?? nestedUom?.id ?? item.product_uom_id ?? "";
    return __spreadProps(__spreadValues({}, item), {
      quantity: qty,
      unit_price: unitCost,
      unit_total: unitCost,
      uom,
      uom_id: uomId,
      subtotal,
      iva_amount,
      ieps_amount,
      line_total
    });
  }
  /**
   * Create new purchase order
   */
  createOrder(data) {
    console.log("[PurchaseOrder] Creating order", {
      vendor: data.vendor_id,
      warehouse: data.warehouse_id,
      lineItems: data.line_items.length
    });
    return this.http.post(this.baseUrl, data).pipe(tap((order) => {
      console.log("[PurchaseOrder] Order created successfully", { id: order.id });
    }), catchError((error) => {
      console.error("[PurchaseOrder] Failed to create order", error);
      return this.handleError(error);
    }));
  }
  /**
   * Get vendor products
   */
  getVendorProducts(vendorId) {
    return this.http.get(`${environment.api}/tenant/vendors/${vendorId}/products`).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Receive purchase order
   */
  receiveOrder(id, data) {
    return this.http.post(`${this.baseUrl}/${id}/receive`, data).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Update existing purchase order
   */
  updateOrder(id, data) {
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Update a single line item (OC en Creada; totales del encabezado se recalculan en backend).
   */
  patchLineItem(orderId, lineItemId, body) {
    return this.http.patch(`${this.baseUrl}/${orderId}/line-items/${lineItemId}`, body).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Delete a line item and recalculate header totals (OC en Creada).
   */
  deleteLineItem(orderId, lineItemId) {
    return this.http.delete(`${this.baseUrl}/${orderId}/line-items/${lineItemId}`).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Agrega una línea a una OC (p. ej. en estado Creada). Si el backend usa otra ruta, ajustar aquí.
   */
  createLineItem(orderId, body) {
    return this.http.post(`${this.baseUrl}/${orderId}/line-items`, body).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Change order status
   */
  changeStatus(id, status) {
    return this.http.put(`${this.baseUrl}/${id}/status`, { status }).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Cancel order with reason
   */
  cancelOrder(id, data) {
    return this.http.post(`${this.baseUrl}/${id}/cancel`, data).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Delete order
   */
  deleteOrder(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Register payment
   */
  registerPayment(orderId, payment) {
    const payload = {
      amount: payment.amount,
      payment_date: payment.payment_date,
      payment_method: payment.payment_method,
      currency: payment.currency,
      reference_number: payment.reference_number,
      notes: payment.notes
    };
    return this.http.post(`${this.baseUrl}/${orderId}/payments`, payload).pipe(catchError((error) => this.handleError(error)));
  }
  getOrderDocuments(orderId) {
    return this.http.get(`${this.baseUrl}/${orderId}/documents`).pipe(catchError((error) => this.handleError(error)));
  }
  uploadOrderDocument(orderId, file, documentTypeId) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type_id", String(documentTypeId));
    return this.http.post(`${this.baseUrl}/${orderId}/documents`, formData).pipe(catchError((error) => this.handleError(error)));
  }
  deleteOrderDocument(documentId) {
    return this.http.delete(`${this.baseUrl}/documents/${documentId}`).pipe(catchError((error) => this.handleError(error)));
  }
  getOrderDocumentTypes() {
    return this.http.get(`${this.baseUrl}/document-types/list`).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Regenerate original purchase order PDF
   */
  regenerateOriginalPDF(orderId, language, keepPrevious = false) {
    return this.http.post(`${this.baseUrl}/${orderId}/regenerate-documento-original`, { language, keep_previous: keepPrevious }).pipe(tap(() => {
      console.log("[PurchaseOrder] Original PDF regenerated successfully", { id: orderId });
    }), catchError((error) => {
      console.error("[PurchaseOrder] Failed to regenerate original PDF", error);
      return this.handleError(error);
    }));
  }
  /**
   * Regenerate purchase order receipt PDF (only if status is "Recibida")
   */
  regenerateReceiptPDF(orderId, language, keepPrevious = false) {
    return this.http.post(`${this.baseUrl}/${orderId}/regenerate-recepcion`, { language, keep_previous: keepPrevious }).pipe(tap(() => {
      console.log("[PurchaseOrder] Receipt PDF regenerated successfully", { id: orderId });
    }), catchError((error) => {
      console.error("[PurchaseOrder] Failed to regenerate receipt PDF", error);
      return this.handleError(error);
    }));
  }
  /**
   * Handle HTTP errors
   */
  handleError(error) {
    let errorMessage;
    switch (error.status) {
      case 401:
        this.router.navigate(["/auth/login"]);
        errorMessage = "Sesi\xF3n expirada. Por favor, inicia sesi\xF3n nuevamente.";
        break;
      case 403:
        errorMessage = "No tienes permisos para realizar esta acci\xF3n";
        break;
      case 404:
        errorMessage = "Orden de compra no encontrada";
        break;
      case 422:
        errorMessage = this.extractValidationErrors(error);
        break;
      case 500:
        errorMessage = "Error del servidor. Por favor, intenta m\xE1s tarde";
        break;
      case 0:
        errorMessage = "Error de conexi\xF3n. Por favor, verifica tu conexi\xF3n a internet";
        break;
      default:
        errorMessage = "Ha ocurrido un error inesperado";
    }
    return throwError(() => new Error(errorMessage));
  }
  /**
   * Extract validation errors from response
   */
  extractValidationErrors(error) {
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat();
      return errors.join(", ");
    }
    return "Error de validaci\xF3n. Por favor, verifica los datos ingresados.";
  }
  static \u0275fac = function PurchaseOrderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PurchaseOrderService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router), \u0275\u0275inject(TaxCalculatorService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PurchaseOrderService, factory: _PurchaseOrderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PurchaseOrderService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }, { type: TaxCalculatorService }], null);
})();

export {
  PurchaseOrderService
};
//# sourceMappingURL=chunk-DP66VQS4.js.map
