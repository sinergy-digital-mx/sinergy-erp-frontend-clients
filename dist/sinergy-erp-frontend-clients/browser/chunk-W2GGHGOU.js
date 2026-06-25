import {
  normalizePosSaleReceipt
} from "./chunk-MHDUPFR7.js";
import {
  Router
} from "./chunk-524KR27D.js";
import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-MNFUR22A.js";
import {
  Injectable,
  catchError,
  map,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-CJAGDKD4.js";

// src/app/features/sales-orders/models/sales-order.model.ts
function normalizeTicketReciboResponse(raw, defaultRegenerated = false) {
  if (!raw || typeof raw !== "object") {
    return { success: false, message: "", regenerated: defaultRegenerated };
  }
  let source = raw;
  if (source["data"] && typeof source["data"] === "object" && !Array.isArray(source["data"])) {
    source = source["data"];
  }
  const receiptRaw = source["receipt"];
  const documentsRaw = source["documents"];
  return {
    success: source["success"] === true,
    message: source["message"] != null ? String(source["message"]) : "",
    regenerated: source["regenerated"] === true || source["regenerated"] !== false && defaultRegenerated,
    receipt: normalizePosSaleReceipt(receiptRaw),
    documents: Array.isArray(documentsRaw) ? documentsRaw : void 0
  };
}

// src/app/features/sales-orders/services/sales-order.service.ts
var SalesOrderService = class _SalesOrderService {
  http;
  router;
  baseUrl = `${environment.api}/tenant/sales-orders`;
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
  /**
   * Get paginated list of sales orders with filters
   */
  getOrders(filters, pagination) {
    let params = new HttpParams().set("page", pagination.page.toString()).set("limit", pagination.limit.toString());
    if (filters.search) {
      params = params.set("search", filters.search);
    }
    if (filters.status || filters.general_status) {
      params = params.set("general_status", filters.general_status || filters.status);
    }
    if (filters.payment_status) {
      params = params.set("payment_status", filters.payment_status);
    }
    if (filters.sales_order_type) {
      params = params.set("sales_order_type", filters.sales_order_type);
    }
    if (filters.customer_id) {
      params = params.set("customer_id", filters.customer_id.toString());
    }
    if (filters.warehouse_id) {
      params = params.set("warehouse_id", filters.warehouse_id);
    }
    if (filters.dateFrom) {
      params = params.set("created_from", filters.dateFrom);
    }
    if (filters.dateTo) {
      params = params.set("created_to", filters.dateTo);
    }
    return this.http.get(this.baseUrl, { params }).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Get single sales order by ID
   */
  getOrderById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(catchError((error) => this.handleError(error)));
  }
  getOrderDetailById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((response) => response.data), catchError((error) => this.handleError(error)));
  }
  /**
   * Create new sales order
   */
  createOrder(data) {
    console.log("[SalesOrder] Creating order", { warehouse_id: data.warehouse_id, line_items: data.line_items.length });
    return this.http.post(this.baseUrl, data).pipe(tap((order) => {
      console.log("[SalesOrder] Order created successfully", { id: order.id });
    }), catchError((error) => {
      console.error("[SalesOrder] Failed to create order", error);
      return this.handleError(error);
    }));
  }
  /**
   * Get products summary by warehouse for sales order creation
   */
  getWarehouseProductsSummary(warehouseId) {
    return this.http.get(`${this.baseUrl}/warehouse/${warehouseId}/products-summary`).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Update existing sales order
   */
  updateOrder(id, data) {
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Fulfill (surtir) sales order - triggers FIFO allocation
   */
  fulfillOrder(id) {
    return this.http.post(`${this.baseUrl}/${id}/fulfill`, {}).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Delete order (cancels and releases inventory)
   */
  deleteOrder(id) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(catchError((error) => this.handleError(error)));
  }
  regenerateOriginalPDF(orderId, language, keepPrevious = false) {
    return this.http.post(`${this.baseUrl}/${orderId}/regenerate-documento-original`, { language, keep_previous: keepPrevious }).pipe(tap(() => {
      console.log("[SalesOrder] Original PDF regenerated successfully", { id: orderId, language });
    }), catchError((error) => {
      console.error("[SalesOrder] Failed to regenerate original PDF", error);
      return this.handleError(error);
    }));
  }
  /** Lee el TICKET / RECIBO guardado (no regenera). */
  getTicketRecibo(orderId) {
    return this.http.get(`${this.baseUrl}/${orderId}/ticket-recibo`).pipe(map((response) => normalizeTicketReciboResponse(response, false)), catchError((error) => {
      console.error("[SalesOrder] Failed to load ticket/recibo", error);
      return this.handleError(error);
    }));
  }
  /** Reimprime el ticket existente en S3 (no borra ni regenera documentos). */
  reprintTicketRecibo(orderId) {
    return this.http.post(`${this.baseUrl}/${orderId}/reprint-ticket-recibo`, {}).pipe(map((response) => normalizeTicketReciboResponse(response, false)), catchError((error) => {
      console.error("[SalesOrder] Failed to reprint ticket/recibo", error);
      return this.handleError(error);
    }));
  }
  /** [TEMP/admin] Borra el ticket anterior y genera uno nuevo en S3. */
  regenerateTicketRecibo(orderId) {
    return this.http.post(`${this.baseUrl}/${orderId}/regenerate-ticket-recibo`, {}).pipe(map((response) => normalizeTicketReciboResponse(response, true)), catchError((error) => {
      console.error("[SalesOrder] Failed to regenerate ticket/recibo", error);
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
        errorMessage = typeof error.error?.message === "string" && error.error.message.trim() || "Orden de venta no encontrada";
        break;
      case 409:
        errorMessage = "Stock insuficiente para confirmar la orden";
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
  static \u0275fac = function SalesOrderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesOrderService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SalesOrderService, factory: _SalesOrderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SalesOrderService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  SalesOrderService
};
//# sourceMappingURL=chunk-W2GGHGOU.js.map
