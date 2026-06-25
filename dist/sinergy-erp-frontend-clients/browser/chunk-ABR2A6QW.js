import {
  TabComponent
} from "./chunk-N7SBDJ32.js";
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "./chunk-X4R6VVPV.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MaxLengthValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-5M3EQ6HX.js";
import {
  ButtonComponent
} from "./chunk-QII3XD7X.js";
import {
  ToastService
} from "./chunk-YTYO4VTK.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-SNZEVNJV.js";
import {
  CommonModule,
  HttpClient,
  NgForOf,
  NgIf,
  environment
} from "./chunk-FGZNYMY3.js";
import {
  Component,
  Inject,
  Injectable,
  Subject,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-XEFUC5ED.js";

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

// src/app/features/settings/components/vendor-detail-modal/vendor-detail-modal.component.ts
function VendorDetailModalComponent_ng_container_9_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r1 = ctx.$implicit;
    \u0275\u0275property("value", opt_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r1.name);
  }
}
function VendorDetailModalComponent_ng_container_9_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("name"));
  }
}
function VendorDetailModalComponent_ng_container_9_ng_container_15_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("rfc"));
  }
}
function VendorDetailModalComponent_ng_container_9_ng_container_15_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r3 = ctx.$implicit;
    \u0275\u0275property("value", opt_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r3.name);
  }
}
function VendorDetailModalComponent_ng_container_9_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div")(2, "label", 11);
    \u0275\u0275text(3, "RFC (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 22);
    \u0275\u0275template(5, VendorDetailModalComponent_ng_container_9_ng_container_15_p_5_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "label", 11);
    \u0275\u0275text(8, "Raz\xF3n Social");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div")(11, "label", 11);
    \u0275\u0275text(12, "Tipo de Persona *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 24);
    \u0275\u0275template(14, VendorDetailModalComponent_ng_container_9_ng_container_15_option_14_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.showError("rfc"));
    \u0275\u0275advance(9);
    \u0275\u0275property("ngForOf", ctx_r1.personaTypeOptions);
  }
}
function VendorDetailModalComponent_ng_container_9_ng_container_16_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("tax_id"));
  }
}
function VendorDetailModalComponent_ng_container_9_ng_container_16_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("legal_name"));
  }
}
function VendorDetailModalComponent_ng_container_9_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div")(2, "label", 11);
    \u0275\u0275text(3, "ID fiscal / Tax ID *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 25);
    \u0275\u0275template(5, VendorDetailModalComponent_ng_container_9_ng_container_16_p_5_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "label", 11);
    \u0275\u0275text(8, "Nombre legal *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 26);
    \u0275\u0275template(10, VendorDetailModalComponent_ng_container_9_ng_container_16_p_10_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.showError("tax_id"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.showError("legal_name"));
  }
}
function VendorDetailModalComponent_ng_container_9_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    \u0275\u0275property("value", opt_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r4.name);
  }
}
function VendorDetailModalComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "label", 11);
    \u0275\u0275text(3, "Tipo de proveedor *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 12);
    \u0275\u0275template(5, VendorDetailModalComponent_ng_container_9_option_5_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div")(7, "label", 11);
    \u0275\u0275text(8, "Nombre *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 14);
    \u0275\u0275template(10, VendorDetailModalComponent_ng_container_9_p_10_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "label", 11);
    \u0275\u0275text(13, "Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, VendorDetailModalComponent_ng_container_9_ng_container_15_Template, 15, 2, "ng-container", 7)(16, VendorDetailModalComponent_ng_container_9_ng_container_16_Template, 11, 2, "ng-container", 7);
    \u0275\u0275elementStart(17, "div")(18, "label", 11);
    \u0275\u0275text(19, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 17);
    \u0275\u0275template(21, VendorDetailModalComponent_ng_container_9_option_21_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div")(23, "label", 11);
    \u0275\u0275text(24, "D\xEDas de Cr\xE9dito");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div")(27, "label", 11);
    \u0275\u0275text(28, "L\xEDmite de Cr\xE9dito");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.vendorTypeOptions);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.showError("name"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.isNational);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isNational);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.statusOptions);
  }
}
function VendorDetailModalComponent_ng_container_10_select_16_option_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    \u0275\u0275property("value", opt_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r5.name);
  }
}
function VendorDetailModalComponent_ng_container_10_select_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 33)(1, "option", 34);
    \u0275\u0275text(2, "Selecciona un pa\xEDs");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, VendorDetailModalComponent_ng_container_10_select_16_option_3_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.countryOptions);
  }
}
function VendorDetailModalComponent_ng_container_10_input_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 35);
  }
}
function VendorDetailModalComponent_ng_container_10_p_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("country"));
  }
}
function VendorDetailModalComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 5)(2, "label", 11);
    \u0275\u0275text(3, "Calle");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "label", 11);
    \u0275\u0275text(7, "Ciudad");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "label", 11);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "label", 11);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, VendorDetailModalComponent_ng_container_10_select_16_Template, 4, 1, "select", 30)(17, VendorDetailModalComponent_ng_container_10_input_17_Template, 1, 0, "input", 31)(18, VendorDetailModalComponent_ng_container_10_p_18_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div")(20, "label", 11);
    \u0275\u0275text(21, "CP / C\xF3digo postal");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r1.isNational ? "Estado" : "Estado / Provincia");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Pa\xEDs ", ctx_r1.isNational ? "" : "*");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isNational);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isNational);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showError("country"));
  }
}
function VendorDetailModalComponent_ng_container_11_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r6 = ctx.$implicit;
    \u0275\u0275property("value", opt_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r6.name);
  }
}
function VendorDetailModalComponent_ng_container_11_div_18_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getError("bank_clabe"));
  }
}
function VendorDetailModalComponent_ng_container_11_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 11);
    \u0275\u0275text(2, "CLABE (18 d\xEDgitos)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 40);
    \u0275\u0275template(4, VendorDetailModalComponent_ng_container_11_div_18_p_4_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.showError("bank_clabe"));
  }
}
function VendorDetailModalComponent_ng_container_11_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div")(2, "label", 11);
    \u0275\u0275text(3, "SWIFT / BIC");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "label", 11);
    \u0275\u0275text(7, "IBAN");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
}
function VendorDetailModalComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div")(2, "label", 11);
    \u0275\u0275text(3, "Banco");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "label", 11);
    \u0275\u0275text(7, "Titular de la cuenta");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "label", 11);
    \u0275\u0275text(11, "N\xFAmero de cuenta");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "label", 11);
    \u0275\u0275text(15, "Moneda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 39);
    \u0275\u0275template(17, VendorDetailModalComponent_ng_container_11_option_17_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, VendorDetailModalComponent_ng_container_11_div_18_Template, 5, 1, "div", 7)(19, VendorDetailModalComponent_ng_container_11_ng_container_19_Template, 9, 0, "ng-container", 7);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r1.currencyOptions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isNational);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isNational);
  }
}
var MEXICAN_RFC_PATTERN = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i;
var VendorDetailModalComponent = class _VendorDetailModalComponent {
  fb;
  vendorService;
  toast;
  dialogRef;
  data;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  activeTab = signal("general", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  isNew = true;
  tabs = [
    { id: "general", title: "General" },
    { id: "direccion", title: "Direcci\xF3n" },
    { id: "bancaria", title: "Informaci\xF3n bancaria" }
  ];
  vendorTypeOptions = [
    { id: "NATIONAL", name: "Nacional (M\xE9xico)" },
    { id: "INTERNATIONAL", name: "Internacional" }
  ];
  personaTypeOptions = [
    { id: "Persona F\xEDsica", name: "Persona F\xEDsica" },
    { id: "Persona Moral", name: "Persona Moral" }
  ];
  statusOptions = [
    { id: "active", name: "Activo" },
    { id: "inactive", name: "Inactivo" }
  ];
  countryOptions = [
    { id: "M\xE9xico", name: "M\xE9xico" },
    { id: "Estados Unidos", name: "Estados Unidos" },
    { id: "Canad\xE1", name: "Canad\xE1" },
    { id: "Espa\xF1a", name: "Espa\xF1a" },
    { id: "Argentina", name: "Argentina" },
    { id: "Brasil", name: "Brasil" },
    { id: "Chile", name: "Chile" },
    { id: "Colombia", name: "Colombia" },
    { id: "Per\xFA", name: "Per\xFA" },
    { id: "China", name: "China" },
    { id: "Alemania", name: "Alemania" },
    { id: "Reino Unido", name: "Reino Unido" }
  ];
  currencyOptions = [
    { id: "MXN", name: "MXN" },
    { id: "USD", name: "USD" },
    { id: "EUR", name: "EUR" },
    { id: "CAD", name: "CAD" }
  ];
  destroy$ = new Subject();
  constructor(fb, vendorService, toast, dialogRef, data) {
    this.fb = fb;
    this.vendorService = vendorService;
    this.toast = toast;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isNew = !data.vendor;
    this.form = this.createForm();
    if (data.vendor) {
      this.form.patchValue(__spreadProps(__spreadValues({}, data.vendor), {
        vendor_type: data.vendor.vendor_type ?? "NATIONAL",
        credit_limit: data.vendor.credit_limit ?? 0,
        credit_days: data.vendor.credit_days ?? 0
      }));
    }
    this.applyVendorTypeValidators(this.form.get("vendor_type").value);
    this.form.get("vendor_type").valueChanges.pipe(takeUntil(this.destroy$)).subscribe((type) => this.applyVendorTypeValidators(type));
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  get isNational() {
    return this.form.get("vendor_type")?.value === "NATIONAL";
  }
  setActiveTab(tabId) {
    if (tabId === "general" || tabId === "direccion" || tabId === "bancaria") {
      this.activeTab.set(tabId);
    }
  }
  createForm() {
    return this.fb.group({
      vendor_type: ["NATIONAL", Validators.required],
      name: ["", [Validators.required, Validators.minLength(2)]],
      company_name: [""],
      street: [""],
      city: [""],
      state: [""],
      zip_code: [""],
      country: ["M\xE9xico"],
      razon_social: [""],
      rfc: [""],
      persona_type: ["Persona Moral"],
      tax_id: [""],
      legal_name: [""],
      bank_name: [""],
      bank_account_holder: [""],
      bank_account_number: [""],
      bank_clabe: [""],
      bank_swift_bic: [""],
      bank_iban: [""],
      bank_currency: ["MXN"],
      status: ["active"],
      credit_days: [0, [Validators.min(0)]],
      credit_limit: [0, [Validators.min(0)]]
    });
  }
  applyVendorTypeValidators(type) {
    const national = type === "NATIONAL";
    if (national) {
      this.setControlValidators("rfc", true, [Validators.pattern(MEXICAN_RFC_PATTERN)]);
    } else {
      this.clearControlValidators("rfc");
    }
    this.setControlValidators("persona_type", national, [Validators.required]);
    this.setControlValidators("tax_id", !national, [Validators.required]);
    this.setControlValidators("legal_name", !national, [Validators.required]);
    this.setControlValidators("country", !national, [Validators.required]);
    if (national) {
      this.form.patchValue({
        country: this.form.get("country")?.value || "M\xE9xico",
        bank_currency: "MXN"
      }, { emitEvent: false });
      this.clearControlValidators("bank_swift_bic");
      this.clearControlValidators("bank_iban");
      this.setControlValidators("bank_clabe", false, [
        Validators.pattern(/^\d{18}$/)
      ]);
    } else {
      this.form.patchValue({ bank_currency: this.form.get("bank_currency")?.value || "USD" }, { emitEvent: false });
      this.clearControlValidators("bank_clabe");
      this.clearControlValidators("persona_type");
    }
  }
  setControlValidators(name, enabled, validators) {
    const control = this.form.get(name);
    if (!control)
      return;
    control.setValidators(enabled ? validators : []);
    control.updateValueAndValidity({ emitEvent: false });
  }
  clearControlValidators(name) {
    const control = this.form.get(name);
    if (!control)
      return;
    control.clearValidators();
    control.updateValueAndValidity({ emitEvent: false });
  }
  save() {
    if (this.form.invalid || this.saving()) {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        this.focusTabWithErrors();
      }
      return;
    }
    this.saving.set(true);
    const payload = this.buildPayload();
    const request$ = this.isNew ? this.vendorService.createVendor(payload) : this.vendorService.updateVendor(this.data.vendor.id, payload);
    request$.subscribe({
      next: (vendor) => {
        this.toast.success(this.isNew ? "Proveedor creado correctamente" : "Proveedor actualizado correctamente");
        this.saving.set(false);
        this.dialogRef.close(vendor);
      },
      error: (error) => {
        const msg = Array.isArray(error.error?.message) ? error.error.message.join(", ") : error.error?.message || "Error al guardar proveedor";
        this.toast.error(msg);
        this.saving.set(false);
      }
    });
  }
  buildPayload() {
    const v = this.form.getRawValue();
    const trim = (s) => s?.trim() || void 0;
    const type = v.vendor_type;
    const base = {
      vendor_type: type,
      name: trim(v.name),
      company_name: trim(v.company_name),
      street: trim(v.street),
      city: trim(v.city),
      state: trim(v.state),
      zip_code: trim(v.zip_code),
      country: trim(v.country),
      status: v.status,
      credit_days: v.credit_days ?? 0,
      credit_limit: v.credit_limit ?? 0,
      bank_name: trim(v.bank_name),
      bank_account_holder: trim(v.bank_account_holder),
      bank_account_number: trim(v.bank_account_number),
      bank_currency: trim(v.bank_currency)
    };
    if (type === "NATIONAL") {
      return __spreadProps(__spreadValues({}, base), {
        rfc: trim(v.rfc)?.toUpperCase(),
        razon_social: trim(v.razon_social),
        persona_type: v.persona_type,
        bank_clabe: trim(v.bank_clabe)
      });
    }
    return __spreadProps(__spreadValues({}, base), {
      tax_id: trim(v.tax_id),
      legal_name: trim(v.legal_name),
      bank_swift_bic: trim(v.bank_swift_bic)?.toUpperCase(),
      bank_iban: trim(v.bank_iban)?.toUpperCase()
    });
  }
  close() {
    this.dialogRef.close();
  }
  focusTabWithErrors() {
    const tabFields = {
      general: [
        "vendor_type",
        "name",
        "company_name",
        "rfc",
        "razon_social",
        "persona_type",
        "tax_id",
        "legal_name",
        "status",
        "credit_days",
        "credit_limit"
      ],
      direccion: ["street", "city", "state", "country", "zip_code"],
      bancaria: [
        "bank_name",
        "bank_account_holder",
        "bank_account_number",
        "bank_currency",
        "bank_clabe",
        "bank_swift_bic",
        "bank_iban"
      ]
    };
    for (const tab of ["general", "direccion", "bancaria"]) {
      const hasError = tabFields[tab].some((name) => this.form.get(name)?.invalid);
      if (hasError) {
        this.activeTab.set(tab);
        return;
      }
    }
  }
  showError(controlName) {
    const c = this.form.get(controlName);
    return !!(c && c.invalid && c.touched);
  }
  getError(controlName) {
    const c = this.form.get(controlName);
    if (!c?.errors)
      return "";
    if (c.errors["required"])
      return "Campo requerido";
    if (c.errors["pattern"]) {
      return controlName === "rfc" ? "RFC inv\xE1lido (formato: 3-4 letras + 6 d\xEDgitos + 3 alfanum\xE9ricos)" : "Formato inv\xE1lido";
    }
    if (c.errors["minlength"])
      return "Muy corto";
    return "Valor inv\xE1lido";
  }
  static \u0275fac = function VendorDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorDetailModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(VendorService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VendorDetailModalComponent, selectors: [["app-vendor-detail-modal"]], decls: 15, vars: 11, consts: [[1, "vendor-modal"], [1, "vendor-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "vendor-modal__body"], [3, "formGroup"], [1, "col-span-2"], [3, "tabChange", "tabs", "activeTabId"], [4, "ngIf"], [1, "vendor-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading", "disabled"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["formControlName", "vendor_type", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "bg-white"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "formControlName", "name", "placeholder", "Nombre del proveedor", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "company_name", "placeholder", "Nombre de la empresa", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "status", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "bg-white"], ["type", "number", "formControlName", "credit_days", "min", "0", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "number", "formControlName", "credit_limit", "min", "0", "step", "0.01", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [3, "value"], [1, "text-xs", "text-red-600", "mt-1"], ["type", "text", "formControlName", "rfc", "placeholder", "Ej: ACM123456ABC", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "uppercase"], ["type", "text", "formControlName", "razon_social", "placeholder", "Raz\xF3n social", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "persona_type", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "bg-white"], ["type", "text", "formControlName", "tax_id", "placeholder", "VAT, EIN, etc.", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "legal_name", "placeholder", "Legal name", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "street", "placeholder", "Calle y n\xFAmero", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "city", "placeholder", "Ciudad", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "state", "placeholder", "Estado", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "country", "class", "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white", 4, "ngIf"], ["type", "text", "formControlName", "country", "readonly", "", "class", "w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700", 4, "ngIf"], ["type", "text", "formControlName", "zip_code", "placeholder", "C\xF3digo postal", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "country", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "bg-white"], ["value", ""], ["type", "text", "formControlName", "country", "readonly", "", 1, "w-full", "px-3", "py-2", "border", "border-gray-200", "rounded-md", "bg-gray-50", "text-gray-700"], ["type", "text", "formControlName", "bank_name", "placeholder", "Nombre del banco", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "bank_account_holder", "placeholder", "Titular", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "bank_account_number", "placeholder", "N\xFAmero de cuenta", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "bank_currency", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "bg-white"], ["type", "text", "formControlName", "bank_clabe", "maxlength", "18", "placeholder", "000000000000000000", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "bank_swift_bic", "placeholder", "SWIFT", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "uppercase"], ["type", "text", "formControlName", "bank_iban", "placeholder", "IBAN", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "uppercase"]], template: function VendorDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function VendorDetailModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div", 5)(8, "app-tab", 6);
      \u0275\u0275listener("tabChange", function VendorDetailModalComponent_Template_app_tab_tabChange_8_listener($event) {
        return ctx.setActiveTab($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, VendorDetailModalComponent_ng_container_9_Template, 30, 5, "ng-container", 7)(10, VendorDetailModalComponent_ng_container_10_Template, 23, 5, "ng-container", 7)(11, VendorDetailModalComponent_ng_container_11_Template, 20, 3, "ng-container", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 8)(13, "app-button", 9);
      \u0275\u0275listener("clicked", function VendorDetailModalComponent_Template_app_button_clicked_13_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "app-button", 10);
      \u0275\u0275listener("clicked", function VendorDetailModalComponent_Template_app_button_clicked_14_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Nuevo Proveedor" : "Editar Proveedor");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("tabs", ctx.tabs)("activeTabId", ctx.activeTab());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab() === "general");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab() === "direccion");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab() === "bancaria");
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isNew ? "Crear Proveedor" : "Guardar Cambios")("loading", ctx.saving())("disabled", ctx.form.invalid || ctx.saving());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, MinValidator, FormGroupDirective, FormControlName, ButtonComponent, LucideAngularModule, LucideAngularComponent, TabComponent], styles: ["\n\n[_nghost-%COMP%]     .mat-mdc-dialog-container {\n  max-width: 800px !important;\n}\n.vendor-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n  background: #fff;\n}\n.vendor-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.vendor-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.vendor-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.vendor-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.vendor-modal__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.vendor-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.vendor-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .col-span-2[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.vendor-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n@media (max-width: 640px) {\n  .vendor-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=vendor-detail-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-vendor-detail-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LucideAngularModule, TabComponent], template: `<div class="vendor-modal">\r
  <div class="vendor-modal__header">\r
    <h2>{{ isNew ? 'Nuevo Proveedor' : 'Editar Proveedor' }}</h2>\r
    <lucide-icon [img]="X" class="close cursor-pointer" (click)="close()"></lucide-icon>\r
  </div>\r
\r
  <div class="vendor-modal__body">\r
    <form [formGroup]="form">\r
      <div class="col-span-2">\r
        <app-tab\r
          [tabs]="tabs"\r
          [activeTabId]="activeTab()"\r
          (tabChange)="setActiveTab($event)">\r
        </app-tab>\r
      </div>\r
\r
      <ng-container *ngIf="activeTab() === 'general'">\r
        <!-- Tipo de proveedor -->\r
        <div class="col-span-2">\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de proveedor *</label>\r
          <select\r
            formControlName="vendor_type"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">\r
            <option *ngFor="let opt of vendorTypeOptions" [value]="opt.id">{{ opt.name }}</option>\r
          </select>\r
        </div>\r
\r
        <!-- Datos generales -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>\r
          <input type="text" formControlName="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Nombre del proveedor">\r
          <p *ngIf="showError('name')" class="text-xs text-red-600 mt-1">{{ getError('name') }}</p>\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Empresa</label>\r
          <input type="text" formControlName="company_name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Nombre de la empresa">\r
        </div>\r
\r
        <!-- Fiscal Nacional -->\r
        <ng-container *ngIf="isNational">\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">RFC (opcional)</label>\r
            <input type="text" formControlName="rfc" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 uppercase" placeholder="Ej: ACM123456ABC">\r
            <p *ngIf="showError('rfc')" class="text-xs text-red-600 mt-1">{{ getError('rfc') }}</p>\r
          </div>\r
\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Raz\xF3n Social</label>\r
            <input type="text" formControlName="razon_social" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Raz\xF3n social">\r
          </div>\r
\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Persona *</label>\r
            <select formControlName="persona_type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">\r
              <option *ngFor="let opt of personaTypeOptions" [value]="opt.id">{{ opt.name }}</option>\r
            </select>\r
          </div>\r
        </ng-container>\r
\r
        <!-- Fiscal Internacional -->\r
        <ng-container *ngIf="!isNational">\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">ID fiscal / Tax ID *</label>\r
            <input type="text" formControlName="tax_id" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="VAT, EIN, etc.">\r
            <p *ngIf="showError('tax_id')" class="text-xs text-red-600 mt-1">{{ getError('tax_id') }}</p>\r
          </div>\r
\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre legal *</label>\r
            <input type="text" formControlName="legal_name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Legal name">\r
            <p *ngIf="showError('legal_name')" class="text-xs text-red-600 mt-1">{{ getError('legal_name') }}</p>\r
          </div>\r
        </ng-container>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>\r
          <select formControlName="status" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">\r
            <option *ngFor="let opt of statusOptions" [value]="opt.id">{{ opt.name }}</option>\r
          </select>\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">D\xEDas de Cr\xE9dito</label>\r
          <input type="number" formControlName="credit_days" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">L\xEDmite de Cr\xE9dito</label>\r
          <input type="number" formControlName="credit_limit" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">\r
        </div>\r
      </ng-container>\r
\r
      <ng-container *ngIf="activeTab() === 'direccion'">\r
        <div class="col-span-2">\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Calle</label>\r
          <input type="text" formControlName="street" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Calle y n\xFAmero">\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>\r
          <input type="text" formControlName="city" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Ciudad">\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ isNational ? 'Estado' : 'Estado / Provincia' }}</label>\r
          <input type="text" formControlName="state" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Estado">\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Pa\xEDs {{ isNational ? '' : '*' }}</label>\r
          <select *ngIf="!isNational" formControlName="country" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">\r
            <option value="">Selecciona un pa\xEDs</option>\r
            <option *ngFor="let opt of countryOptions" [value]="opt.id">{{ opt.name }}</option>\r
          </select>\r
          <input *ngIf="isNational" type="text" formControlName="country" readonly class="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700">\r
          <p *ngIf="showError('country')" class="text-xs text-red-600 mt-1">{{ getError('country') }}</p>\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">CP / C\xF3digo postal</label>\r
          <input type="text" formControlName="zip_code" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="C\xF3digo postal">\r
        </div>\r
      </ng-container>\r
\r
      <ng-container *ngIf="activeTab() === 'bancaria'">\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Banco</label>\r
          <input type="text" formControlName="bank_name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Nombre del banco">\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Titular de la cuenta</label>\r
          <input type="text" formControlName="bank_account_holder" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Titular">\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">N\xFAmero de cuenta</label>\r
          <input type="text" formControlName="bank_account_number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="N\xFAmero de cuenta">\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Moneda</label>\r
          <select formControlName="bank_currency" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">\r
            <option *ngFor="let opt of currencyOptions" [value]="opt.id">{{ opt.name }}</option>\r
          </select>\r
        </div>\r
\r
        <div *ngIf="isNational">\r
          <label class="block text-sm font-medium text-gray-700 mb-1">CLABE (18 d\xEDgitos)</label>\r
          <input type="text" formControlName="bank_clabe" maxlength="18" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="000000000000000000">\r
          <p *ngIf="showError('bank_clabe')" class="text-xs text-red-600 mt-1">{{ getError('bank_clabe') }}</p>\r
        </div>\r
\r
        <ng-container *ngIf="!isNational">\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">SWIFT / BIC</label>\r
            <input type="text" formControlName="bank_swift_bic" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 uppercase" placeholder="SWIFT">\r
          </div>\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">IBAN</label>\r
            <input type="text" formControlName="bank_iban" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 uppercase" placeholder="IBAN">\r
          </div>\r
        </ng-container>\r
      </ng-container>\r
    </form>\r
  </div>\r
\r
  <div class="vendor-modal__footer">\r
    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="close()"></app-button>\r
    <app-button\r
      [text]="isNew ? 'Crear Proveedor' : 'Guardar Cambios'"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      [disabled]="form.invalid || saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/vendor-detail-modal/vendor-detail-modal.component.scss */\n:host ::ng-deep .mat-mdc-dialog-container {\n  max-width: 800px !important;\n}\n.vendor-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n  background: #fff;\n}\n.vendor-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.vendor-modal__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.vendor-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.vendor-modal__header .close:hover {\n  color: #1f2937;\n}\n.vendor-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.vendor-modal__body form {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.vendor-modal__body form .col-span-2 {\n  grid-column: 1/-1;\n}\n.vendor-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n@media (max-width: 640px) {\n  .vendor-modal__body form {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=vendor-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: VendorService }, { type: ToastService }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VendorDetailModalComponent, { className: "VendorDetailModalComponent", filePath: "src/app/features/settings/components/vendor-detail-modal/vendor-detail-modal.component.ts", lineNumber: 33 });
})();

export {
  VendorService,
  VendorDetailModalComponent
};
//# sourceMappingURL=chunk-ABR2A6QW.js.map
