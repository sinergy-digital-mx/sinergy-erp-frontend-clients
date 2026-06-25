import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-MNFUR22A.js";
import {
  Injectable,
  map,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-CJAGDKD4.js";

// src/app/core/services/exchange-rate.service.ts
var ExchangeRateService = class _ExchangeRateService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  upsertDailyExchangeRate(payload) {
    return this.http.put(`${this.api}/tenant/exchange-rates/daily`, payload).pipe(map((response) => this.normalizeDailyRate(response)));
  }
  getDailyExchangeRate(date) {
    let params = new HttpParams();
    if (date) {
      params = params.set("date", date);
    }
    return this.http.get(`${this.api}/tenant/exchange-rates/daily`, { params }).pipe(map((response) => this.normalizeDailyRate(response)));
  }
  getExchangeRateHistory(query) {
    return this.http.get(`${this.api}/tenant/exchange-rates`, { params: query }).pipe(map((response) => {
      const data = Array.isArray(response?.data) ? response.data : Array.isArray(response) ? response : [];
      return {
        data: data.map((item) => this.normalizeDailyRate(item)),
        total: response?.total ?? data.length,
        page: response?.page ?? 1,
        limit: response?.limit ?? query?.limit ?? data.length,
        totalPages: response?.totalPages ?? 1
      };
    }));
  }
  normalizeDailyRate(response) {
    const item = response?.data ?? response ?? {};
    return {
      rate_date: item.rate_date,
      exchange_rate: Number(item.exchange_rate),
      notes: item.notes ?? null,
      created_at: item.created_at,
      updated_at: item.updated_at
    };
  }
  static \u0275fac = function ExchangeRateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExchangeRateService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ExchangeRateService, factory: _ExchangeRateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExchangeRateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  ExchangeRateService
};
//# sourceMappingURL=chunk-FH2NSOSF.js.map
