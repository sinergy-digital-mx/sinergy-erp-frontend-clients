import {
  HttpClient,
  environment
} from "./chunk-6DLZ3MOQ.js";
import {
  BehaviorSubject,
  Injectable,
  of,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-JD27NKNP.js";

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
  WarehouseService
};
//# sourceMappingURL=chunk-K4SDPUH7.js.map
