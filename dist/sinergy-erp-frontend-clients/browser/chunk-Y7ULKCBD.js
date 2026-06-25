import {
  SelectComponent
} from "./chunk-FJKKJVBI.js";
import {
  ReactiveFormsModule
} from "./chunk-5M3EQ6HX.js";
import {
  CommonModule,
  HttpClient,
  environment
} from "./chunk-FGZNYMY3.js";
import {
  Component,
  Directive,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  Output,
  catchError,
  of,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵinject,
  ɵɵlistener,
  ɵɵproperty
} from "./chunk-XEFUC5ED.js";

// src/app/core/services/catalog.service.ts
var CatalogService = class _CatalogService {
  http;
  apiUrl = `${environment.api}/tenant/catalogs`;
  constructor(http) {
    this.http = http;
  }
  /**
   * Get all catalogs
   */
  getAllCatalogs() {
    return this.http.get(this.apiUrl).pipe(catchError(() => of([])));
  }
  /**
   * Get catalogs by type
   */
  getCatalogsByType(type) {
    return this.http.get(`${this.apiUrl}?type=${type}`).pipe(catchError(() => of([])));
  }
  /**
   * Get catalog by specific type
   */
  getCatalogByType(type) {
    return this.http.get(`${this.apiUrl}/by-type?type=${type}`).pipe(catchError(() => of([])));
  }
  /**
   * Search catalogs
   */
  searchCatalogs(type, query) {
    return this.http.get(`${this.apiUrl}/search?type=${type}&q=${query}`).pipe(catchError(() => of([])));
  }
  /**
   * Get phone countries
   */
  getPhoneCountries() {
    return this.http.get(`${this.apiUrl}/phone-countries`).pipe(catchError(() => of([])));
  }
  /**
   * Get phone codes
   */
  getPhoneCodes() {
    return this.getCatalogByType("phone_code");
  }
  static \u0275fac = function CatalogService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CatalogService, factory: _CatalogService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/components/phone-country-select/phone-country-select.component.ts
var PhoneCountrySelectComponent = class _PhoneCountrySelectComponent {
  catalogService;
  control = null;
  countrySelected = new EventEmitter();
  countries = signal([], ...ngDevMode ? [{ debugName: "countries" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  constructor(catalogService) {
    this.catalogService = catalogService;
  }
  ngOnInit() {
    this.loadCountries();
  }
  selectConfig() {
    return {
      placeholder: "Selecciona un pa\xEDs",
      data: this.countries(),
      value: "code",
      option: "displayName",
      form_control: this.control,
      loading: this.loading()
    };
  }
  loadCountries() {
    this.loading.set(true);
    this.catalogService.getPhoneCountries().subscribe({
      next: (data) => {
        this.countries.set(data.map((item) => ({
          code: item.code,
          name: item.name,
          phoneCode: item.value || "",
          displayName: item.name
        })));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.countries.set(this.getDefaultCountries());
      }
    });
  }
  getDefaultCountries() {
    return [
      { code: "US", name: "United States", phoneCode: "+1" },
      { code: "MX", name: "Mexico", phoneCode: "+52" },
      { code: "CA", name: "Canada", phoneCode: "+1" },
      { code: "GB", name: "United Kingdom", phoneCode: "+44" },
      { code: "ES", name: "Spain", phoneCode: "+34" },
      { code: "FR", name: "France", phoneCode: "+33" },
      { code: "DE", name: "Germany", phoneCode: "+49" },
      { code: "IT", name: "Italy", phoneCode: "+39" },
      { code: "BR", name: "Brazil", phoneCode: "+55" },
      { code: "AR", name: "Argentina", phoneCode: "+54" },
      { code: "CO", name: "Colombia", phoneCode: "+57" },
      { code: "CL", name: "Chile", phoneCode: "+56" },
      { code: "PE", name: "Peru", phoneCode: "+51" },
      { code: "JP", name: "Japan", phoneCode: "+81" },
      { code: "CN", name: "China", phoneCode: "+86" },
      { code: "IN", name: "India", phoneCode: "+91" },
      { code: "AU", name: "Australia", phoneCode: "+61" }
    ];
  }
  static \u0275fac = function PhoneCountrySelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhoneCountrySelectComponent)(\u0275\u0275directiveInject(CatalogService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PhoneCountrySelectComponent, selectors: [["app-phone-country-select"]], inputs: { control: "control" }, outputs: { countrySelected: "countrySelected" }, decls: 1, vars: 3, consts: [[3, "config", "label", "has_error"]], template: function PhoneCountrySelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-select", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("config", ctx.selectConfig())("label", "Pa\xEDs")("has_error", (ctx.control == null ? null : ctx.control.invalid) && (ctx.control == null ? null : ctx.control.touched));
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, SelectComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhoneCountrySelectComponent, [{
    type: Component,
    args: [{ selector: "app-phone-country-select", standalone: true, imports: [CommonModule, ReactiveFormsModule, SelectComponent], template: `
    <app-select
      [config]="selectConfig()"
      [label]="'Pa\xEDs'"
      [has_error]="control?.invalid && control?.touched">
    </app-select>
  ` }]
  }], () => [{ type: CatalogService }], { control: [{
    type: Input
  }], countrySelected: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PhoneCountrySelectComponent, { className: "PhoneCountrySelectComponent", filePath: "src/app/core/components/phone-country-select/phone-country-select.component.ts", lineNumber: 26 });
})();

// src/app/core/components/phone-code-select/phone-code-select.component.ts
var PhoneCodeSelectComponent = class _PhoneCodeSelectComponent {
  catalogService;
  control = null;
  codeSelected = new EventEmitter();
  phoneCodes = signal([], ...ngDevMode ? [{ debugName: "phoneCodes" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  constructor(catalogService) {
    this.catalogService = catalogService;
  }
  ngOnInit() {
    this.loadPhoneCodes();
  }
  selectConfig() {
    return {
      placeholder: "Selecciona un c\xF3digo de tel\xE9fono",
      data: this.phoneCodes(),
      value: "code",
      option: "name",
      form_control: this.control,
      loading: this.loading()
    };
  }
  loadPhoneCodes() {
    this.loading.set(true);
    this.catalogService.getPhoneCountries().subscribe({
      next: (data) => {
        this.phoneCodes.set(data.map((item) => ({
          code: item.value || item.code,
          name: `${item.name} (${item.value || item.code})`
        })));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.phoneCodes.set(this.getDefaultPhoneCodes());
      }
    });
  }
  getDefaultPhoneCodes() {
    return [
      { code: "+1", name: "United States (+1)" },
      { code: "+52", name: "Mexico (+52)" },
      { code: "+1", name: "Canada (+1)" },
      { code: "+44", name: "United Kingdom (+44)" },
      { code: "+34", name: "Spain (+34)" },
      { code: "+33", name: "France (+33)" },
      { code: "+49", name: "Germany (+49)" },
      { code: "+39", name: "Italy (+39)" },
      { code: "+55", name: "Brazil (+55)" },
      { code: "+54", name: "Argentina (+54)" },
      { code: "+57", name: "Colombia (+57)" },
      { code: "+56", name: "Chile (+56)" },
      { code: "+51", name: "Peru (+51)" },
      { code: "+81", name: "Japan (+81)" },
      { code: "+86", name: "China (+86)" },
      { code: "+91", name: "India (+91)" },
      { code: "+61", name: "Australia (+61)" }
    ];
  }
  static \u0275fac = function PhoneCodeSelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhoneCodeSelectComponent)(\u0275\u0275directiveInject(CatalogService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PhoneCodeSelectComponent, selectors: [["app-phone-code-select"]], inputs: { control: "control" }, outputs: { codeSelected: "codeSelected" }, decls: 1, vars: 3, consts: [[3, "config", "label", "has_error"]], template: function PhoneCodeSelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-select", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("config", ctx.selectConfig())("label", "C\xF3digo de Tel\xE9fono")("has_error", (ctx.control == null ? null : ctx.control.invalid) && (ctx.control == null ? null : ctx.control.touched));
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, SelectComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhoneCodeSelectComponent, [{
    type: Component,
    args: [{ selector: "app-phone-code-select", standalone: true, imports: [CommonModule, ReactiveFormsModule, SelectComponent], template: `
    <app-select
      [config]="selectConfig()"
      [label]="'C\xF3digo de Tel\xE9fono'"
      [has_error]="control?.invalid && control?.touched">
    </app-select>
  ` }]
  }], () => [{ type: CatalogService }], { control: [{
    type: Input
  }], codeSelected: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PhoneCodeSelectComponent, { className: "PhoneCodeSelectComponent", filePath: "src/app/core/components/phone-code-select/phone-code-select.component.ts", lineNumber: 25 });
})();

// src/app/core/directives/phone-digits.directive.ts
var PhoneDigitsDirective = class _PhoneDigitsDirective {
  onInput(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    input.value = value;
  }
  onKeyPress(event) {
    const char = event.key;
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }
  static \u0275fac = function PhoneDigitsDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PhoneDigitsDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _PhoneDigitsDirective, selectors: [["", "appPhoneDigits", ""]], hostBindings: function PhoneDigitsDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("input", function PhoneDigitsDirective_input_HostBindingHandler($event) {
        return ctx.onInput($event);
      })("keypress", function PhoneDigitsDirective_keypress_HostBindingHandler($event) {
        return ctx.onKeyPress($event);
      });
    }
  } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PhoneDigitsDirective, [{
    type: Directive,
    args: [{
      selector: "[appPhoneDigits]",
      standalone: true
    }]
  }], null, { onInput: [{
    type: HostListener,
    args: ["input", ["$event"]]
  }], onKeyPress: [{
    type: HostListener,
    args: ["keypress", ["$event"]]
  }] });
})();

export {
  PhoneCountrySelectComponent,
  PhoneCodeSelectComponent,
  PhoneDigitsDirective
};
//# sourceMappingURL=chunk-Y7ULKCBD.js.map
