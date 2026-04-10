import {
  ActivatedRoute,
  HttpClient,
  Router,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7ZU2RCPO.js";

// src/app/core/services/customer.service.ts
var CustomerService = class _CustomerService {
  router;
  http;
  activated_route;
  api = environment.api;
  constructor(router, http, activated_route) {
    this.router = router;
    this.http = http;
    this.activated_route = activated_route;
  }
  getCustomers(params) {
    return this.http.get(`${this.api}/tenant/customers`, {
      params
    });
  }
  getCustomer(id) {
    return this.http.get(`${this.api}/tenant/customers/${id}`);
  }
  getCustomerAddresses(id) {
    return this.http.get(`${this.api}/tenant/customers/${id}/addresses`);
  }
  getCustomerActivities(id, page = 1, limit = 10) {
    return this.http.get(`${this.api}/tenant/customers/${id}/activities`, {
      params: { page, limit }
    });
  }
  updateCustomer(id, data) {
    return this.http.put(`${this.api}/tenant/customers/${id}`, data);
  }
  createCustomer(data) {
    return this.http.post(`${this.api}/tenant/customers`, data);
  }
  static \u0275fac = function CustomerService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerService)(\u0275\u0275inject(Router), \u0275\u0275inject(HttpClient), \u0275\u0275inject(ActivatedRoute));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CustomerService, factory: _CustomerService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Router }, { type: HttpClient }, { type: ActivatedRoute }], null);
})();

export {
  CustomerService
};
//# sourceMappingURL=chunk-EFTXQRRM.js.map
