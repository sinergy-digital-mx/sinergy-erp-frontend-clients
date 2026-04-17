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

// src/app/features/settings/services/pos-equipment.service.ts
var PosEquipmentService = class _PosEquipmentService {
  http;
  baseUrl = `${environment.api}/tenant/pos-configurations`;
  constructor(http) {
    this.http = http;
  }
  getPosConfigurations(params) {
    return this.http.get(this.baseUrl, {
      params
    });
  }
  getPosConfiguration(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createPosConfiguration(data) {
    return this.http.post(this.baseUrl, data);
  }
  updatePosConfiguration(id, data) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deletePosConfiguration(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  /** @deprecated use getPosConfigurations */
  getPosEquipments(params) {
    return this.getPosConfigurations(params);
  }
  /** @deprecated use getPosConfiguration */
  getPosEquipment(id) {
    return this.getPosConfiguration(id);
  }
  /** @deprecated use createPosConfiguration */
  createPosEquipment(data) {
    return this.createPosConfiguration(data);
  }
  /** @deprecated use updatePosConfiguration */
  updatePosEquipment(id, data) {
    return this.updatePosConfiguration(id, data);
  }
  /** @deprecated use deletePosConfiguration */
  deletePosEquipment(id) {
    return this.deletePosConfiguration(id);
  }
  static \u0275fac = function PosEquipmentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosEquipmentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PosEquipmentService, factory: _PosEquipmentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosEquipmentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  PosEquipmentService
};
//# sourceMappingURL=chunk-OBQOIJFD.js.map
