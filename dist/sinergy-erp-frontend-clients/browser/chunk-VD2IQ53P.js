import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7ZU2RCPO.js";

// src/app/features/settings/services/vendor.service.ts
var VendorService = class _VendorService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getVendors(params) {
    return this.http.get(`${this.api}/tenant/vendors`, { params });
  }
  getVendor(id) {
    return this.http.get(`${this.api}/tenant/vendors/${id}`);
  }
  createVendor(data) {
    return this.http.post(`${this.api}/tenant/vendors`, data);
  }
  updateVendor(id, data) {
    return this.http.put(`${this.api}/tenant/vendors/${id}`, data);
  }
  deleteVendor(id) {
    return this.http.delete(`${this.api}/tenant/vendors/${id}`);
  }
  static \u0275fac = function VendorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VendorService, factory: _VendorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/settings/services/fiscal-configuration.service.ts
var FiscalConfigurationService = class _FiscalConfigurationService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  createFiscalConfiguration(dto) {
    return this.http.post(`${this.api}/tenant/fiscal-configurations`, dto);
  }
  getFiscalConfiguration(id) {
    return this.http.get(`${this.api}/tenant/fiscal-configurations/${id}`);
  }
  getFiscalConfigurationByWarehouse(warehouseId) {
    return this.http.get(`${this.api}/tenant/fiscal-configurations/warehouse/${warehouseId}`);
  }
  listFiscalConfigurations(params) {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page)
        httpParams = httpParams.set("page", params.page.toString());
      if (params.limit)
        httpParams = httpParams.set("limit", params.limit.toString());
      if (params.warehouse_id)
        httpParams = httpParams.set("warehouse_id", params.warehouse_id);
      if (params.status)
        httpParams = httpParams.set("status", params.status);
    }
    return this.http.get(`${this.api}/tenant/fiscal-configurations`, { params: httpParams });
  }
  updateFiscalConfiguration(id, dto) {
    return this.http.put(`${this.api}/tenant/fiscal-configurations/${id}`, dto);
  }
  deleteFiscalConfiguration(id) {
    return this.http.delete(`${this.api}/tenant/fiscal-configurations/${id}`);
  }
  static \u0275fac = function FiscalConfigurationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FiscalConfigurationService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FiscalConfigurationService, factory: _FiscalConfigurationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FiscalConfigurationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  VendorService,
  FiscalConfigurationService
};
//# sourceMappingURL=chunk-VD2IQ53P.js.map
