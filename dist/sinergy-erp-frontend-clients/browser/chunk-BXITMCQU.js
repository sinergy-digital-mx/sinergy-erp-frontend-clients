import {
  HttpClient,
  environment
} from "./chunk-BMMLV6YT.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-57S27ROJ.js";

// src/app/features/settings/services/branch.service.ts
var BranchService = class _BranchService {
  http;
  apiUrl = `${environment.api}/tenant`;
  constructor(http) {
    this.http = http;
  }
  // Trae todas las sucursales del tenant (para selects/dropdowns)
  getAllBranches() {
    return this.http.get(`${this.apiUrl}/billing/branches`);
  }
  // CRUD por fiscal config
  getBranches(fiscalConfigId) {
    return this.http.get(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches`);
  }
  getBranch(fiscalConfigId, branchId) {
    return this.http.get(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`);
  }
  createBranch(fiscalConfigId, data) {
    return this.http.post(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches`, data);
  }
  updateBranch(fiscalConfigId, branchId, data) {
    return this.http.put(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`, data);
  }
  deleteBranch(fiscalConfigId, branchId) {
    return this.http.delete(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`);
  }
  static \u0275fac = function BranchService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BranchService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BranchService, factory: _BranchService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  BranchService
};
//# sourceMappingURL=chunk-BXITMCQU.js.map
