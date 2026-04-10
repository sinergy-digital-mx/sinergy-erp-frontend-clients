import {
  HttpClient,
  HttpParams,
  Router,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  Injectable,
  catchError,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7ZU2RCPO.js";

// src/app/features/purchase-orders/services/purchase-order.service.ts
var PurchaseOrderService = class _PurchaseOrderService {
  http;
  router;
  baseUrl = `${environment.api}/tenant/purchase-orders`;
  constructor(http, router) {
    this.http = http;
    this.router = router;
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
    return this.http.get(`${this.baseUrl}/${id}`).pipe(catchError((error) => this.handleError(error)));
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
    return this.http.post(`${this.baseUrl}/${orderId}/payments`, payment).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Regenerate original purchase order PDF
   */
  regenerateOriginalPDF(orderId) {
    return this.http.post(`${this.baseUrl}/${orderId}/regenerate-documento-original`, {}).pipe(tap(() => {
      console.log("[PurchaseOrder] Original PDF regenerated successfully", { id: orderId });
    }), catchError((error) => {
      console.error("[PurchaseOrder] Failed to regenerate original PDF", error);
      return this.handleError(error);
    }));
  }
  /**
   * Regenerate purchase order receipt PDF (only if status is "Recibida")
   */
  regenerateReceiptPDF(orderId) {
    return this.http.post(`${this.baseUrl}/${orderId}/regenerate-recepcion`, {}).pipe(tap(() => {
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
    return new (__ngFactoryType__ || _PurchaseOrderService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PurchaseOrderService, factory: _PurchaseOrderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PurchaseOrderService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

export {
  PurchaseOrderService
};
//# sourceMappingURL=chunk-SFPCIKZR.js.map
