import {
  CustomerService
} from "./chunk-LEG7OOWU.js";
import {
  PhoneCodeSelectComponent,
  PhoneCountrySelectComponent,
  PhoneDigitsDirective
} from "./chunk-LYQXEO3O.js";
import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import {
  InterceptorService
} from "./chunk-K22JBEUE.js";
import {
  InputComponent
} from "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-QN7XSZF7.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-FK5OXRXK.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-TXPVZZCM.js";
import {
  HttpClient,
  HttpErrorResponse,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  NgClass,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  BehaviorSubject,
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  Observable,
  Output,
  Subject,
  ViewEncapsulation,
  __spreadProps,
  __spreadValues,
  catchError,
  map,
  retry,
  setClassMetadata,
  signal,
  takeUntil,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
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
} from "./chunk-7ZU2RCPO.js";

// src/app/features/customers/services/customer-group-fetch.service.ts
var CustomerGroupFetchService = class _CustomerGroupFetchService {
  http;
  api = environment.api;
  groupsCache = null;
  cacheExpiry = 0;
  CACHE_DURATION = 5 * 60 * 1e3;
  // 5 minutes
  groupsSubject = new BehaviorSubject([]);
  groups$ = this.groupsSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  /**
   * Fetches all available customer groups from the API
   * Uses caching to avoid repeated requests
   * @returns Observable<CustomerGroup[]> - Array of available groups
   * @throws Error if the API request fails
   */
  fetchGroups() {
    if (this.groupsCache && Date.now() < this.cacheExpiry) {
      return new Observable((observer) => {
        observer.next(this.groupsCache);
        observer.complete();
      });
    }
    return this.http.get(`${this.api}/tenant/customer-groups`).pipe(
      retry(2),
      // Retry up to 2 times on failure
      tap((response) => {
        const groups = Array.isArray(response) ? response : response.groups || [];
        this.groupsCache = groups;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        this.groupsSubject.next(groups);
      }),
      map((response) => {
        return Array.isArray(response) ? response : response.groups || [];
      }),
      catchError((error) => {
        console.error("Error fetching customer groups:", error);
        let errorMessage = "Failed to fetch groups. Please try again.";
        let errorType = "network";
        if (error.status >= 500) {
          errorMessage = "Error del servidor. Por favor, intenta m\xE1s tarde.";
          errorType = "server";
        } else if (error.status >= 400) {
          errorMessage = "Error de validaci\xF3n. Por favor, verifica los datos.";
          errorType = "validation";
        } else if (error.status === 0) {
          errorMessage = "No se puede conectar. Por favor, verifica tu conexi\xF3n a internet.";
          errorType = "network";
        }
        return throwError(() => ({
          type: errorType,
          message: errorMessage,
          originalError: error
        }));
      })
    );
  }
  /**
   * Invalidate the cache to force a fresh fetch
   */
  invalidateCache() {
    this.groupsCache = null;
    this.cacheExpiry = 0;
  }
  /**
   * Get cached groups synchronously
   */
  getCachedGroups() {
    return this.groupsCache || [];
  }
  static \u0275fac = function CustomerGroupFetchService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerGroupFetchService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CustomerGroupFetchService, factory: _CustomerGroupFetchService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerGroupFetchService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/customers/components/customer-group-dropdown/customer-group-dropdown.component.ts
var CustomerGroupDropdownComponent = class _CustomerGroupDropdownComponent {
  groupFetchService;
  selectedGroupId = null;
  disabled = false;
  groupSelect = new EventEmitter();
  groups = [];
  groupControl = new FormControl(null);
  selectConfig = {
    placeholder: "Filtrar por grupo",
    data: [],
    value: "id",
    option: "name",
    all: true,
    all_message: "Ver Todos",
    form_control: this.groupControl,
    loading: true
  };
  isLoadingGroups = false;
  groupsError = null;
  destroy$ = new Subject();
  constructor(groupFetchService) {
    this.groupFetchService = groupFetchService;
  }
  ngOnInit() {
    this.loadGroups();
  }
  ngOnChanges(changes) {
    if (changes["selectedGroupId"] && this.groupControl) {
      this.groupControl.setValue(this.selectedGroupId, { emitEvent: false });
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /**
   * Load groups from the API
   */
  loadGroups() {
    this.isLoadingGroups = true;
    this.groupsError = null;
    this.groupFetchService.fetchGroups().pipe(takeUntil(this.destroy$)).subscribe({
      next: (groups) => {
        this.groups = groups;
        this.selectConfig = __spreadProps(__spreadValues({}, this.selectConfig), {
          data: groups.map((group) => ({
            id: group.id,
            name: group.name,
            customer_count: group.customer_count || 0
          })),
          loading: false
        });
        if (this.selectedGroupId) {
          this.groupControl.setValue(this.selectedGroupId, { emitEvent: false });
        }
        this.isLoadingGroups = false;
      },
      error: (error) => {
        this.isLoadingGroups = false;
        this.selectConfig = __spreadProps(__spreadValues({}, this.selectConfig), {
          loading: false
        });
        this.groupsError = error;
        console.error("Error loading groups:", error);
      }
    });
  }
  /**
   * Handle group selection change
   */
  onGroupChange(event) {
    const selectedGroupId = event.value;
    const selectedGroup = this.groups.find((g) => g.id === selectedGroupId);
    const groupName = selectedGroup?.name || null;
    this.groupSelect.emit({
      groupId: selectedGroupId,
      groupName
    });
  }
  static \u0275fac = function CustomerGroupDropdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerGroupDropdownComponent)(\u0275\u0275directiveInject(CustomerGroupFetchService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerGroupDropdownComponent, selectors: [["app-customer-group-dropdown"]], inputs: { selectedGroupId: "selectedGroupId", disabled: "disabled" }, outputs: { groupSelect: "groupSelect" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 2, consts: [[3, "changeOption", "config", "disable"]], template: function CustomerGroupDropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-select", 0);
      \u0275\u0275listener("changeOption", function CustomerGroupDropdownComponent_Template_app_select_changeOption_0_listener($event) {
        return ctx.onGroupChange($event);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("config", ctx.selectConfig)("disable", ctx.isLoadingGroups || !!ctx.groupsError || ctx.disabled);
    }
  }, dependencies: [CommonModule, SelectComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerGroupDropdownComponent, [{
    type: Component,
    args: [{ selector: "app-customer-group-dropdown", standalone: true, imports: [CommonModule, SelectComponent], template: `
    <app-select
      [config]="selectConfig"
      [disable]="isLoadingGroups || !!groupsError || disabled"
      (changeOption)="onGroupChange($event)">
    </app-select>
  ` }]
  }], () => [{ type: CustomerGroupFetchService }], { selectedGroupId: [{
    type: Input
  }], disabled: [{
    type: Input
  }], groupSelect: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerGroupDropdownComponent, { className: "CustomerGroupDropdownComponent", filePath: "src/app/features/customers/components/customer-group-dropdown/customer-group-dropdown.component.ts", lineNumber: 23 });
})();

// src/app/features/customers/components/customer-edit-modal/customer-edit-modal.component.ts
function CustomerEditModalComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.controlErrorMessage("phone"));
  }
}
function CustomerEditModalComponent_ng_container_34_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.controlErrorMessage("additional_phone"));
  }
}
function CustomerEditModalComponent_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div");
    \u0275\u0275element(2, "app-input", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275element(4, "app-input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 12);
    \u0275\u0275element(6, "app-input", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "label", 8);
    \u0275\u0275text(9, "Tel\xE9fono adicional");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 26);
    \u0275\u0275conditionalCreate(11, CustomerEditModalComponent_ng_container_34_Conditional_11_Template, 2, 1, "p", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div");
    \u0275\u0275element(13, "app-phone-code-select", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 12);
    \u0275\u0275element(15, "app-phone-country-select", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r0.form.controls["additional_name"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r0.form.controls["additional_lastname"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r0.form.controls["additional_email"]);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r0.controlShowError("additional_phone") ? "border-red-400 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.controlShowError("additional_phone") && ctx_r0.controlErrorMessage("additional_phone") ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("control", ctx_r0.getAdditionalPhoneCodeControl());
    \u0275\u0275advance(2);
    \u0275\u0275property("control", ctx_r0.getAdditionalPhoneCountryControl());
  }
}
var CustomerEditModalComponent = class _CustomerEditModalComponent {
  fb;
  dialog;
  dialog_ref;
  data;
  customerService;
  interceptor_service;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  update = signal(false, ...ngDevMode ? [{ debugName: "update" }] : []);
  selectedGroup = signal(null, ...ngDevMode ? [{ debugName: "selectedGroup" }] : []);
  isCreateMode = signal(false, ...ngDevMode ? [{ debugName: "isCreateMode" }] : []);
  /** Sección persona adicional: colapsada por defecto en crear; abierta si ya hay datos al editar. */
  additionalPersonExpanded = signal(false, ...ngDevMode ? [{ debugName: "additionalPersonExpanded" }] : []);
  X = X;
  form;
  constructor(fb, dialog, dialog_ref, data, customerService, interceptor_service) {
    this.fb = fb;
    this.dialog = dialog;
    this.dialog_ref = dialog_ref;
    this.data = data;
    this.customerService = customerService;
    this.interceptor_service = interceptor_service;
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      lastname: [""],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.pattern(/^$|^\d{1,10}$/)]],
      phone_code: ["+52", [Validators.required]],
      phone_country: ["MX", [Validators.required]],
      company_name: [""],
      additional_name: [""],
      additional_lastname: [""],
      additional_email: ["", [Validators.email]],
      additional_phone: ["", [Validators.pattern(/^$|^\d{1,10}$/)]],
      additional_phone_code: ["+52"],
      additional_phone_country: ["MX"]
    });
    if (this.data?.customer) {
      this.isCreateMode.set(false);
      const cleanPhone = this.data.customer.phone?.replace(/\D/g, "").slice(-10) || "";
      const cleanAdditionalPhone = this.data.customer.additional_phone?.replace(/\D/g, "").slice(-10) || "";
      const titularCountry = this.data.customer.country || this.data.customer.phone_country || "MX";
      this.form.patchValue({
        name: this.data.customer.name,
        lastname: this.data.customer.lastname || "",
        email: this.data.customer.email,
        phone: cleanPhone,
        phone_code: this.data.customer.phone_code || "+52",
        phone_country: titularCountry,
        company_name: this.data.customer.company_name || "",
        additional_name: this.data.customer.additional_name || "",
        additional_lastname: this.data.customer.additional_lastname || "",
        additional_email: this.data.customer.additional_email || "",
        additional_phone: cleanAdditionalPhone,
        additional_phone_code: this.data.customer.additional_phone_code || "+52",
        additional_phone_country: this.data.customer.additional_phone_country || "MX"
      });
      this.selectedGroup.set(this.data.customer.group ?? (this.data.customer.group_id ? { id: this.data.customer.group_id, name: "" } : null));
      if (this.customerHasAdditionalPersonData(this.data.customer)) {
        this.additionalPersonExpanded.set(true);
      }
    } else {
      this.isCreateMode.set(true);
    }
  }
  customerHasAdditionalPersonData(c) {
    const t = (s) => (s ?? "").trim();
    return !!(t(c.additional_name) || t(c.additional_lastname) || t(c.additional_email) || t(c.additional_phone));
  }
  toggleAdditionalPerson() {
    this.additionalPersonExpanded.update((v) => !v);
  }
  /** Borde rojo / mensaje para inputs nativos (teléfono con appPhoneDigits). */
  controlShowError(controlName) {
    const c = this.form.get(controlName);
    return !!(c?.invalid && c.touched);
  }
  controlErrorMessage(controlName) {
    const c = this.form.get(controlName);
    if (!c?.errors || !c.touched)
      return "";
    const e = c.errors;
    if (e["required"])
      return "Este campo es obligatorio";
    if (e["email"])
      return "Ingresa un email v\xE1lido";
    if (e["pattern"])
      return "Solo n\xFAmeros, hasta 10 d\xEDgitos";
    return "Este campo tiene un error";
  }
  validateFormBeforeSubmit() {
    if (this.form.valid)
      return true;
    this.form.markAllAsTouched();
    if (!this.additionalPersonExpanded()) {
      const keys = ["additional_email", "additional_phone", "additional_name", "additional_lastname"];
      if (keys.some((key) => !!this.form.get(key)?.invalid)) {
        this.additionalPersonExpanded.set(true);
      }
    }
    return false;
  }
  onGroupSelected(event) {
    this.selectedGroup.set(event.groupId ? { id: event.groupId, name: event.groupName } : null);
  }
  get phoneCodeControl() {
    return this.form.get("phone_code");
  }
  get phoneCountryControl() {
    return this.form.get("phone_country");
  }
  getPhoneCodeControl() {
    return this.form.get("phone_code");
  }
  getPhoneCountryControl() {
    return this.form.get("phone_country");
  }
  getAdditionalPhoneCodeControl() {
    return this.form.get("additional_phone_code");
  }
  getAdditionalPhoneCountryControl() {
    return this.form.get("additional_phone_country");
  }
  closeDialog() {
    if (!this.loading()) {
      this.dialog_ref.close(this.update());
    }
  }
  resolveApiErrorMessage(error, fallback) {
    if (error instanceof HttpErrorResponse && error.error?.message != null) {
      const msg = error.error.message;
      return Array.isArray(msg) ? msg.join(", ") : String(msg);
    }
    return fallback;
  }
  /**
   * PUT /tenant/customers/:id — solo campos del DTO de update (sin `phone_country` del titular).
   * El país del titular va como `country` (valor del control interno `phone_country`).
   * Opcionales vacíos se omiten (`undefined`) para no pisar datos en el servidor.
   */
  buildUpdatePayload() {
    const v = this.form.getRawValue();
    const trim = (s) => typeof s === "string" ? s.trim() : "";
    const dto = {
      name: v.name,
      lastname: trim(v.lastname) || void 0,
      email: v.email,
      phone: trim(v.phone) || void 0,
      phone_code: v.phone_code,
      country: v.phone_country,
      company_name: trim(v.company_name) || void 0,
      group_id: this.selectedGroup()?.id ?? null
    };
    if (trim(v.additional_name))
      dto.additional_name = trim(v.additional_name);
    if (trim(v.additional_lastname))
      dto.additional_lastname = trim(v.additional_lastname);
    if (trim(v.additional_email))
      dto.additional_email = trim(v.additional_email);
    if (trim(v.additional_phone)) {
      dto.additional_phone = trim(v.additional_phone);
      dto.additional_phone_code = v.additional_phone_code;
      dto.additional_phone_country = v.additional_phone_country;
    }
    const sid = this.data.customer?.status_id;
    if (sid != null && sid !== "") {
      dto.status_id = sid;
    }
    return dto;
  }
  submit() {
    if (this.isCreateMode()) {
      this.createCustomer();
    } else {
      this.updateCustomer();
    }
  }
  createCustomer() {
    if (!this.validateFormBeforeSubmit()) {
      return;
    }
    this.loading.set(true);
    const v = this.form.value;
    const trim = (s) => typeof s === "string" ? s.trim() : "";
    const payload = {
      name: v.name,
      lastname: v.lastname,
      email: v.email,
      phone: v.phone,
      phone_code: v.phone_code,
      phone_country: v.phone_country,
      company_name: v.company_name,
      group_id: this.selectedGroup()?.id || null
    };
    if (trim(v.additional_name))
      payload.additional_name = trim(v.additional_name);
    if (trim(v.additional_lastname))
      payload.additional_lastname = trim(v.additional_lastname);
    if (trim(v.additional_email))
      payload.additional_email = trim(v.additional_email);
    if (trim(v.additional_phone))
      payload.additional_phone = trim(v.additional_phone);
    if (trim(v.additional_phone_code))
      payload.additional_phone_code = trim(v.additional_phone_code);
    if (trim(v.additional_phone_country)) {
      payload.additional_phone_country = trim(v.additional_phone_country);
    }
    this.customerService.createCustomer(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Cliente creado correctamente."
        });
        this.closeDialog();
      },
      error: (err) => {
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: this.resolveApiErrorMessage(err, "No pudimos crear el cliente. Por favor intenta de nuevo.")
        });
      }
    });
  }
  updateCustomer() {
    if (!this.validateFormBeforeSubmit()) {
      return;
    }
    this.loading.set(true);
    const payload = this.buildUpdatePayload();
    this.customerService.updateCustomer(this.data.customer.id, payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Cliente actualizado correctamente."
        });
        this.closeDialog();
      },
      error: (err) => {
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: this.resolveApiErrorMessage(err, "No pudimos actualizar el cliente. Por favor intenta de nuevo.")
        });
      }
    });
  }
  static \u0275fac = function CustomerEditModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerEditModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerEditModalComponent, selectors: [["app-customer-edit-modal"]], decls: 38, vars: 17, consts: [[1, "customer-modal"], [1, "customer-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "customer-modal__body"], [3, "formGroup"], ["label", "Nombre", "placeholder", "Nombre", 3, "form_control"], ["label", "Apellido", "placeholder", "Apellido", 3, "form_control"], ["label", "Email", "placeholder", "Email", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "phone", "appPhoneDigits", "", "placeholder", "Tel\xE9fono", 1, "w-full", "px-3", "py-2", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "border", 3, "ngClass"], ["role", "alert", 1, "mt-1", "text-sm", "text-red-600"], [3, "control"], [1, "col-span-2"], ["label", "Empresa", "placeholder", "Empresa", 3, "form_control"], [3, "groupSelect", "selectedGroupId", "disabled"], [1, "col-span-2", "pt-2", "border-t", "border-gray-200"], ["type", "button", 1, "customer-modal__expand-additional", 3, "click"], [1, "customer-modal__expand-additional-label"], [1, "customer-modal__expand-additional-action"], [4, "ngIf"], [1, "customer-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading"], ["label", "Nombre adicional", "placeholder", "Nombre", 3, "form_control"], ["label", "Apellido adicional", "placeholder", "Apellido", 3, "form_control"], ["label", "Email adicional", "placeholder", "Email", 3, "form_control"], ["type", "text", "formControlName", "additional_phone", "appPhoneDigits", "", "placeholder", "Tel\xE9fono", 1, "w-full", "px-3", "py-2", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "border", 3, "ngClass"]], template: function CustomerEditModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function CustomerEditModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div");
      \u0275\u0275element(8, "app-input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div");
      \u0275\u0275element(10, "app-input", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div");
      \u0275\u0275element(12, "app-input", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div")(14, "label", 8);
      \u0275\u0275text(15, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 9);
      \u0275\u0275conditionalCreate(17, CustomerEditModalComponent_Conditional_17_Template, 2, 1, "p", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div");
      \u0275\u0275element(19, "app-phone-code-select", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div");
      \u0275\u0275element(21, "app-phone-country-select", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 12);
      \u0275\u0275element(23, "app-input", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 12)(25, "label", 8);
      \u0275\u0275text(26, "Grupo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "app-customer-group-dropdown", 14);
      \u0275\u0275listener("groupSelect", function CustomerEditModalComponent_Template_app_customer_group_dropdown_groupSelect_27_listener($event) {
        return ctx.onGroupSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 15)(29, "button", 16);
      \u0275\u0275listener("click", function CustomerEditModalComponent_Template_button_click_29_listener() {
        return ctx.toggleAdditionalPerson();
      });
      \u0275\u0275elementStart(30, "span", 17);
      \u0275\u0275text(31, "Persona adicional (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "span", 18);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(34, CustomerEditModalComponent_ng_container_34_Template, 16, 7, "ng-container", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 20)(36, "app-button", 21);
      \u0275\u0275listener("clicked", function CustomerEditModalComponent_Template_app_button_clicked_36_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "app-button", 22);
      \u0275\u0275listener("clicked", function CustomerEditModalComponent_Template_app_button_clicked_37_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_11_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isCreateMode() ? "Crear Cliente" : "Editar Cliente");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["name"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["lastname"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["email"]);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.controlShowError("phone") ? "border-red-400 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.controlShowError("phone") && ctx.controlErrorMessage("phone") ? 17 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("control", ctx.getPhoneCodeControl());
      \u0275\u0275advance(2);
      \u0275\u0275property("control", ctx.getPhoneCountryControl());
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["company_name"]);
      \u0275\u0275advance(4);
      \u0275\u0275property("selectedGroupId", ((tmp_11_0 = ctx.selectedGroup()) == null ? null : tmp_11_0.id) || null)("disabled", ctx.loading());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.additionalPersonExpanded() ? "Ocultar" : "Agregar", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.additionalPersonExpanded());
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isCreateMode() ? "Crear" : "Actualizar")("loading", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    ButtonComponent,
    InputComponent,
    LucideAngularModule,
    LucideAngularComponent,
    CustomerGroupDropdownComponent,
    PhoneCountrySelectComponent,
    PhoneCodeSelectComponent,
    PhoneDigitsDirective
  ], styles: ["/* src/app/features/customers/components/customer-edit-modal/customer-edit-modal.scss */\n.cdk-overlay-pane.customer-edit-dialog {\n  max-height: 90vh !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-container {\n  max-height: 90vh !important;\n  display: flex !important;\n  flex-direction: column !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-inner-container {\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  display: flex !important;\n  flex-direction: column !important;\n  max-height: 100% !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-surface {\n  display: flex !important;\n  flex-direction: column !important;\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  max-height: 100% !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n}\n.cdk-overlay-pane.customer-edit-dialog app-customer-edit-modal {\n  display: flex !important;\n  flex-direction: column !important;\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  max-height: 100% !important;\n  overflow: hidden !important;\n}\n.customer-modal {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  min-height: 0;\n  max-height: 100%;\n  background: #fff;\n}\n.customer-modal__header {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.customer-modal__header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.customer-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.customer-modal__header .close:hover {\n  color: #1f2937;\n}\n.customer-modal__body {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 1.5rem;\n}\n.customer-modal__body form {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.customer-modal__body form .col-span-2 {\n  grid-column: 1/-1;\n}\n.customer-modal__footer {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n}\n.customer-modal__expand-additional {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 0.75rem;\n  padding: 0.375rem 0;\n  margin: 0;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  text-align: left;\n  border-radius: 0.375rem;\n}\n.customer-modal__expand-additional:hover .customer-modal__expand-additional-action {\n  text-decoration: underline;\n}\n.customer-modal__expand-additional:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.customer-modal__expand-additional-label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.customer-modal__expand-additional-action {\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #4f46e5;\n}\n@media (max-width: 640px) {\n  .customer-modal__body form {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=customer-edit-modal.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerEditModalComponent, [{
    type: Component,
    args: [{ selector: "app-customer-edit-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      ButtonComponent,
      InputComponent,
      LucideAngularModule,
      CustomerGroupDropdownComponent,
      PhoneCountrySelectComponent,
      PhoneCodeSelectComponent,
      PhoneDigitsDirective
    ], encapsulation: ViewEncapsulation.None, template: `<div class="customer-modal">\r
  <div class="customer-modal__header">\r
    <h2>{{ isCreateMode() ? 'Crear Cliente' : 'Editar Cliente' }}</h2>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="closeDialog()">\r
    </lucide-icon>\r
  </div>\r
\r
  <div class="customer-modal__body">\r
    <form [formGroup]="form">\r
      <!-- Nombre -->\r
      <div>\r
        <app-input\r
          label="Nombre"\r
          placeholder="Nombre"\r
          [form_control]="form.controls['name']">\r
        </app-input>\r
      </div>\r
\r
      <!-- Apellido -->\r
      <div>\r
        <app-input\r
          label="Apellido"\r
          placeholder="Apellido"\r
          [form_control]="form.controls['lastname']">\r
        </app-input>\r
      </div>\r
\r
      <!-- Email -->\r
      <div>\r
        <app-input\r
          label="Email"\r
          placeholder="Email"\r
          [form_control]="form.controls['email']">\r
        </app-input>\r
      </div>\r
\r
      <!-- Tel\xE9fono -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Tel\xE9fono</label>\r
        <input\r
          type="text"\r
          formControlName="phone"\r
          appPhoneDigits\r
          class="w-full px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border"\r
          [ngClass]="controlShowError('phone')\r
            ? 'border-red-400 focus:ring-red-500 focus:border-red-500'\r
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"\r
          placeholder="Tel\xE9fono">\r
        @if (controlShowError('phone') && controlErrorMessage('phone')) {\r
          <p class="mt-1 text-sm text-red-600" role="alert">{{ controlErrorMessage('phone') }}</p>\r
        }\r
      </div>\r
\r
      <!-- C\xF3digo Tel\xE9fono -->\r
      <div>\r
        <app-phone-code-select\r
          [control]="getPhoneCodeControl()">\r
        </app-phone-code-select>\r
      </div>\r
\r
      <!-- Pa\xEDs -->\r
      <div>\r
        <app-phone-country-select\r
          [control]="getPhoneCountryControl()">\r
        </app-phone-country-select>\r
      </div>\r
\r
      <!-- Empresa (full width) -->\r
      <div class="col-span-2">\r
        <app-input\r
          label="Empresa"\r
          placeholder="Empresa"\r
          [form_control]="form.controls['company_name']">\r
        </app-input>\r
      </div>\r
\r
      <!-- Grupo (full width) -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Grupo</label>\r
        <app-customer-group-dropdown\r
          [selectedGroupId]="selectedGroup()?.id || null"\r
          [disabled]="loading()"\r
          (groupSelect)="onGroupSelected($event)">\r
        </app-customer-group-dropdown>\r
      </div>\r
\r
      <!-- Persona adicional (opcional): colapsable -->\r
      <div class="col-span-2 pt-2 border-t border-gray-200">\r
        <button\r
          type="button"\r
          class="customer-modal__expand-additional"\r
          (click)="toggleAdditionalPerson()">\r
          <span class="customer-modal__expand-additional-label">Persona adicional (opcional)</span>\r
          <span class="customer-modal__expand-additional-action">\r
            {{ additionalPersonExpanded() ? 'Ocultar' : 'Agregar' }}\r
          </span>\r
        </button>\r
      </div>\r
\r
      <ng-container *ngIf="additionalPersonExpanded()">\r
        <div>\r
          <app-input\r
            label="Nombre adicional"\r
            placeholder="Nombre"\r
            [form_control]="form.controls['additional_name']">\r
          </app-input>\r
        </div>\r
\r
        <div>\r
          <app-input\r
            label="Apellido adicional"\r
            placeholder="Apellido"\r
            [form_control]="form.controls['additional_lastname']">\r
          </app-input>\r
        </div>\r
\r
        <div class="col-span-2">\r
          <app-input\r
            label="Email adicional"\r
            placeholder="Email"\r
            [form_control]="form.controls['additional_email']">\r
          </app-input>\r
        </div>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Tel\xE9fono adicional</label>\r
          <input\r
            type="text"\r
            formControlName="additional_phone"\r
            appPhoneDigits\r
            class="w-full px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border"\r
            [ngClass]="controlShowError('additional_phone')\r
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500'\r
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"\r
            placeholder="Tel\xE9fono">\r
          @if (controlShowError('additional_phone') && controlErrorMessage('additional_phone')) {\r
            <p class="mt-1 text-sm text-red-600" role="alert">{{ controlErrorMessage('additional_phone') }}</p>\r
          }\r
        </div>\r
\r
        <div>\r
          <app-phone-code-select\r
            [control]="getAdditionalPhoneCodeControl()">\r
          </app-phone-code-select>\r
        </div>\r
\r
        <div class="col-span-2">\r
          <app-phone-country-select\r
            [control]="getAdditionalPhoneCountryControl()">\r
          </app-phone-country-select>\r
        </div>\r
      </ng-container>\r
    </form>\r
  </div>\r
\r
  <div class="customer-modal__footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="closeDialog()">\r
    </app-button>\r
    <app-button\r
      [text]="isCreateMode() ? 'Crear' : 'Actualizar'"\r
      custom_class="btn_primary"\r
      [loading]="loading()"\r
      (clicked)="submit()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/customers/components/customer-edit-modal/customer-edit-modal.scss */\n.cdk-overlay-pane.customer-edit-dialog {\n  max-height: 90vh !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-container {\n  max-height: 90vh !important;\n  display: flex !important;\n  flex-direction: column !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-inner-container {\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  display: flex !important;\n  flex-direction: column !important;\n  max-height: 100% !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-surface {\n  display: flex !important;\n  flex-direction: column !important;\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  max-height: 100% !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n}\n.cdk-overlay-pane.customer-edit-dialog app-customer-edit-modal {\n  display: flex !important;\n  flex-direction: column !important;\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  max-height: 100% !important;\n  overflow: hidden !important;\n}\n.customer-modal {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  min-height: 0;\n  max-height: 100%;\n  background: #fff;\n}\n.customer-modal__header {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.customer-modal__header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.customer-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.customer-modal__header .close:hover {\n  color: #1f2937;\n}\n.customer-modal__body {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 1.5rem;\n}\n.customer-modal__body form {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.customer-modal__body form .col-span-2 {\n  grid-column: 1/-1;\n}\n.customer-modal__footer {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n}\n.customer-modal__expand-additional {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 0.75rem;\n  padding: 0.375rem 0;\n  margin: 0;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  text-align: left;\n  border-radius: 0.375rem;\n}\n.customer-modal__expand-additional:hover .customer-modal__expand-additional-action {\n  text-decoration: underline;\n}\n.customer-modal__expand-additional:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.customer-modal__expand-additional-label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.customer-modal__expand-additional-action {\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #4f46e5;\n}\n@media (max-width: 640px) {\n  .customer-modal__body form {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=customer-edit-modal.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialog }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: CustomerService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerEditModalComponent, { className: "CustomerEditModalComponent", filePath: "src/app/features/customers/components/customer-edit-modal/customer-edit-modal.component.ts", lineNumber: 35 });
})();

export {
  CustomerGroupDropdownComponent,
  CustomerEditModalComponent
};
//# sourceMappingURL=chunk-DYFYEZHQ.js.map
