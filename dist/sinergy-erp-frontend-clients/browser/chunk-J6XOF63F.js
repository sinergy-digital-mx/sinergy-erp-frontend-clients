import {
  HttpClient,
  environment
} from "./chunk-MNFUR22A.js";
import {
  BehaviorSubject,
  Injectable,
  of,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-CJAGDKD4.js";

// src/app/features/purchase-orders/utils/order-validators.ts
function validateQuantity() {
  return (control) => {
    const value = control.value;
    if (value === null || value === void 0 || value === "") {
      return null;
    }
    if (value <= 0) {
      return { invalidQuantity: { message: "La cantidad debe ser mayor a cero" } };
    }
    return null;
  };
}
function validatePrice() {
  return (control) => {
    const value = control.value;
    if (value === null || value === void 0 || value === "") {
      return null;
    }
    if (value < 0) {
      return { invalidPrice: { message: "El costo debe ser mayor o igual a cero" } };
    }
    return null;
  };
}
function validateTaxPercentage() {
  return (control) => {
    const value = control.value;
    if (value === null || value === void 0 || value === "") {
      return null;
    }
    if (value < 0 || value > 100) {
      return { invalidTaxPercentage: { message: "Los porcentajes deben estar entre 0 y 100" } };
    }
    return null;
  };
}
function getErrorMessage(control, fieldName) {
  if (!control || !control.errors || !control.touched) {
    return null;
  }
  const errors = control.errors;
  if (errors["required"]) {
    return getRequiredErrorMessage(fieldName);
  }
  if (errors["invalidQuantity"]) {
    return errors["invalidQuantity"].message;
  }
  if (errors["invalidPrice"]) {
    return errors["invalidPrice"].message;
  }
  if (errors["invalidTaxPercentage"]) {
    return errors["invalidTaxPercentage"].message;
  }
  if (errors["noLineItems"]) {
    return errors["noLineItems"].message;
  }
  if (errors["invalidPaymentAmount"]) {
    return errors["invalidPaymentAmount"].message;
  }
  if (errors["exceedsRemaining"]) {
    return errors["exceedsRemaining"].message;
  }
  if (errors["min"]) {
    return `El valor m\xEDnimo es ${errors["min"].min}`;
  }
  if (errors["max"]) {
    return `El valor m\xE1ximo es ${errors["max"].max}`;
  }
  return "Campo inv\xE1lido";
}
function getRequiredErrorMessage(fieldName) {
  const messages = {
    "vendor_id": "Proveedor es requerido",
    "fiscal_configuration_id": "Configuraci\xF3n fiscal es requerida",
    "warehouse_id": "Almac\xE9n es requerido",
    "tentative_receipt_date": "Fecha tentativa de recepci\xF3n es requerida",
    "purpose": "Prop\xF3sito es requerido",
    "product_id": "Producto es requerido",
    "uom_id": "Unidad de medida es requerida",
    "quantity": "Cantidad es requerida",
    "unit_price": "Costo unitario es requerido",
    "amount": "Monto es requerido",
    "payment_date": "Fecha de pago es requerida",
    "payment_method": "M\xE9todo de pago es requerido",
    "reason": "Raz\xF3n de cancelaci\xF3n es requerida"
  };
  return messages[fieldName] || "Este campo es requerido";
}

// src/app/features/purchase-orders/services/warehouse.service.ts
var WarehouseService = class _WarehouseService {
  http;
  baseUrl = `${environment.api}/tenant/warehouses`;
  warehousesCache$ = new BehaviorSubject(null);
  cacheTimestamp = 0;
  CACHE_DURATION = 5 * 60 * 1e3;
  // 5 minutes
  constructor(http) {
    this.http = http;
  }
  /**
   * Get all warehouses
   */
  getWarehouses() {
    const now = Date.now();
    const cached = this.warehousesCache$.value;
    if (cached && now - this.cacheTimestamp < this.CACHE_DURATION) {
      return of(cached);
    }
    return this.http.get(this.baseUrl).pipe(tap((warehouses) => {
      this.warehousesCache$.next(warehouses);
      this.cacheTimestamp = now;
    }));
  }
  /**
   * Clear cache
   */
  clearCache() {
    this.warehousesCache$.next(null);
    this.cacheTimestamp = 0;
  }
  static \u0275fac = function WarehouseService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WarehouseService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WarehouseService, factory: _WarehouseService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarehouseService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  validateQuantity,
  validatePrice,
  validateTaxPercentage,
  getErrorMessage,
  WarehouseService
};
//# sourceMappingURL=chunk-J6XOF63F.js.map
