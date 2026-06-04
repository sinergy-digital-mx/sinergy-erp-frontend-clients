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

// src/app/features/settings/services/email-template.service.ts
var EmailTemplateService = class _EmailTemplateService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getEmailTemplates(params) {
    return this.http.get(`${this.api}/tenant/email-templates`, { params });
  }
  getAvailableVariables() {
    return this.http.get(`${this.api}/tenant/email-templates/variables`);
  }
  getEmailTemplate(id) {
    return this.http.get(`${this.api}/tenant/email-templates/${id}`);
  }
  createEmailTemplate(data) {
    return this.http.post(`${this.api}/tenant/email-templates`, data);
  }
  updateEmailTemplate(id, data) {
    return this.http.patch(`${this.api}/tenant/email-templates/${id}`, data);
  }
  deleteEmailTemplate(id) {
    return this.http.delete(`${this.api}/tenant/email-templates/${id}`);
  }
  previewEmailTemplate(data) {
    return this.http.post(`${this.api}/tenant/email-templates/preview`, data);
  }
  renderEmailTemplate(id, data) {
    return this.http.post(`${this.api}/tenant/email-templates/${id}/render`, data);
  }
  sendEmailTemplate(id, data) {
    return this.http.post(`${this.api}/tenant/email-templates/${id}/send`, data);
  }
  static \u0275fac = function EmailTemplateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailTemplateService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmailTemplateService, factory: _EmailTemplateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailTemplateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  EmailTemplateService
};
//# sourceMappingURL=chunk-CMZCHHG7.js.map
