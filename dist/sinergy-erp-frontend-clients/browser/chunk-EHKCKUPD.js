import {
  HttpClient,
  environment
} from "./chunk-MNFUR22A.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-CJAGDKD4.js";

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

export {
  VendorService
};
//# sourceMappingURL=chunk-EHKCKUPD.js.map
