import {
  HttpClient,
  environment
} from "./chunk-6DLZ3MOQ.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-JD27NKNP.js";

// src/app/features/contracts/services/contract.service.ts
var ContractService = class _ContractService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getContracts(params) {
    return this.http.get(`${this.api}/tenant/contracts`, { params });
  }
  getContract(id) {
    return this.http.get(`${this.api}/tenant/contracts/${id}`);
  }
  getContractByNumber(contractNumber) {
    return this.http.get(`${this.api}/tenant/contracts/by-number/${contractNumber}`);
  }
  getContractStats() {
    return this.http.get(`${this.api}/tenant/contracts/stats`);
  }
  createContract(data) {
    return this.http.post(`${this.api}/tenant/contracts`, data);
  }
  updateContract(id, data) {
    return this.http.put(`${this.api}/tenant/contracts/${id}`, data);
  }
  deleteContract(id) {
    return this.http.delete(`${this.api}/tenant/contracts/${id}`);
  }
  exportToExcel() {
    return this.http.get(`${this.api}/tenant/contracts/export/excel`, {
      responseType: "blob"
    });
  }
  getContractStatement(id) {
    return this.http.get(`${this.api}/tenant/contracts/${id}/pdf`, {
      responseType: "blob"
    });
  }
  static \u0275fac = function ContractService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ContractService, factory: _ContractService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ContractService
};
//# sourceMappingURL=chunk-QKEIEQ7C.js.map
