import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-6DLZ3MOQ.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-JD27NKNP.js";

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
  uploadFiscalLogo(id, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.api}/tenant/fiscal-configurations/${id}/logo`, formData);
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
  FiscalConfigurationService
};
//# sourceMappingURL=chunk-ZJ75H3I6.js.map
