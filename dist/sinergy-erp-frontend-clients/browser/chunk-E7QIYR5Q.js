import {
  HttpClient,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7ZU2RCPO.js";

// src/app/features/settings/services/warehouse.service.ts
var WarehouseService = class _WarehouseService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getWarehouses(params) {
    return this.http.get(`${this.api}/tenant/warehouses`, { params });
  }
  getWarehouse(id) {
    return this.http.get(`${this.api}/tenant/warehouses/${id}`);
  }
  createWarehouse(data) {
    return this.http.post(`${this.api}/tenant/warehouses`, data);
  }
  updateWarehouse(id, data) {
    return this.http.put(`${this.api}/tenant/warehouses/${id}`, data);
  }
  deleteWarehouse(id) {
    return this.http.delete(`${this.api}/tenant/warehouses/${id}`);
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
//# sourceMappingURL=chunk-E7QIYR5Q.js.map
