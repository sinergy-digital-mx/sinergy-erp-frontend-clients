import {
  CustomerService
} from "./chunk-EFTXQRRM.js";
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
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-XYBC4MWB.js";
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
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule
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
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
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
      phone: [""],
      phone_code: ["+52", [Validators.required]],
      phone_country: ["MX", [Validators.required]],
      company_name: [""]
    });
    if (this.data?.customer) {
      this.isCreateMode.set(false);
      const cleanPhone = this.data.customer.phone?.replace(/\D/g, "").slice(-10) || "";
      this.form.patchValue({
        name: this.data.customer.name,
        lastname: this.data.customer.lastname || "",
        email: this.data.customer.email,
        phone: cleanPhone,
        phone_code: this.data.customer.phone_code || "+52",
        phone_country: this.data.customer.phone_country || "MX",
        company_name: this.data.customer.company_name || ""
      });
      this.selectedGroup.set(this.data.customer.group || null);
    } else {
      this.isCreateMode.set(true);
    }
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
  closeDialog() {
    if (!this.loading()) {
      this.dialog_ref.close(this.update());
    }
  }
  submit() {
    if (this.isCreateMode()) {
      this.createCustomer();
    } else {
      this.updateCustomer();
    }
  }
  createCustomer() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const payload = __spreadProps(__spreadValues({}, this.form.value), {
      group_id: this.selectedGroup()?.id || null
    });
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
      error: () => {
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: "No pudimos crear el cliente. Por favor intenta de nuevo."
        });
      }
    });
  }
  updateCustomer() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const payload = __spreadProps(__spreadValues(__spreadValues({}, this.data.customer), this.form.value), {
      group_id: this.selectedGroup()?.id || null
    });
    this.customerService.updateCustomer(payload.id, payload).subscribe({
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
      error: () => {
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: "No pudimos actualizar el cliente. Por favor intenta de nuevo."
        });
      }
    });
  }
  static \u0275fac = function CustomerEditModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerEditModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerEditModalComponent, selectors: [["app-customer-edit-modal"]], decls: 38, vars: 9, consts: [[1, "customer-modal"], [1, "customer-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "customer-modal__body"], [3, "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Nombre", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "lastname", "placeholder", "Apellido", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "email", "formControlName", "email", "placeholder", "Email", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "phone", "appPhoneDigits", "", "placeholder", "Tel\xE9fono", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [3, "control"], [1, "col-span-2"], ["type", "text", "formControlName", "company_name", "placeholder", "Empresa", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [3, "groupSelect", "selectedGroupId", "disabled"], [1, "customer-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading"]], template: function CustomerEditModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function CustomerEditModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div")(8, "label", 5);
      \u0275\u0275text(9, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "input", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div")(12, "label", 5);
      \u0275\u0275text(13, "Apellido");
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "input", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div")(16, "label", 5);
      \u0275\u0275text(17, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "input", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div")(20, "label", 5);
      \u0275\u0275text(21, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div");
      \u0275\u0275element(24, "app-phone-code-select", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div");
      \u0275\u0275element(26, "app-phone-country-select", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 11)(28, "label", 5);
      \u0275\u0275text(29, "Empresa");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "input", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 11)(32, "label", 5);
      \u0275\u0275text(33, "Grupo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "app-customer-group-dropdown", 13);
      \u0275\u0275listener("groupSelect", function CustomerEditModalComponent_Template_app_customer_group_dropdown_groupSelect_34_listener($event) {
        return ctx.onGroupSelected($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(35, "div", 14)(36, "app-button", 15);
      \u0275\u0275listener("clicked", function CustomerEditModalComponent_Template_app_button_clicked_36_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "app-button", 16);
      \u0275\u0275listener("clicked", function CustomerEditModalComponent_Template_app_button_clicked_37_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isCreateMode() ? "Crear Cliente" : "Editar Cliente");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(18);
      \u0275\u0275property("control", ctx.getPhoneCodeControl());
      \u0275\u0275advance(2);
      \u0275\u0275property("control", ctx.getPhoneCountryControl());
      \u0275\u0275advance(8);
      \u0275\u0275property("selectedGroupId", ((tmp_5_0 = ctx.selectedGroup()) == null ? null : tmp_5_0.id) || null)("disabled", ctx.loading());
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isCreateMode() ? "Crear" : "Actualizar")("loading", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    ButtonComponent,
    LucideAngularModule,
    LucideAngularComponent,
    CustomerGroupDropdownComponent,
    PhoneCountrySelectComponent,
    PhoneCodeSelectComponent,
    PhoneDigitsDirective
  ], styles: ["/* src/app/features/customers/components/customer-edit-modal/customer-edit-modal.scss */\n:host ::ng-deep .mat-mdc-dialog-container {\n  max-width: 700px !important;\n}\n.customer-modal {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: #fff;\n}\n.customer-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.customer-modal__header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.customer-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.customer-modal__header .close:hover {\n  color: #1f2937;\n}\n.customer-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.customer-modal__body form {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.customer-modal__body form .col-span-2 {\n  grid-column: 1/-1;\n}\n.customer-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n}\n@media (max-width: 640px) {\n  .customer-modal__body form {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=customer-edit-modal.css.map */\n"], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerEditModalComponent, [{
    type: Component,
    args: [{ selector: "app-customer-edit-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      ButtonComponent,
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
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>\r
        <input\r
          type="text"\r
          formControlName="name"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Nombre">\r
      </div>\r
\r
      <!-- Apellido -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>\r
        <input\r
          type="text"\r
          formControlName="lastname"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Apellido">\r
      </div>\r
\r
      <!-- Email -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>\r
        <input\r
          type="email"\r
          formControlName="email"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Email">\r
      </div>\r
\r
      <!-- Tel\xE9fono -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Tel\xE9fono</label>\r
        <input\r
          type="text"\r
          formControlName="phone"\r
          appPhoneDigits\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Tel\xE9fono">\r
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
        <label class="block text-sm font-medium text-gray-700 mb-1">Empresa</label>\r
        <input\r
          type="text"\r
          formControlName="company_name"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Empresa">\r
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
`, styles: ["/* src/app/features/customers/components/customer-edit-modal/customer-edit-modal.scss */\n:host ::ng-deep .mat-mdc-dialog-container {\n  max-width: 700px !important;\n}\n.customer-modal {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: #fff;\n}\n.customer-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.customer-modal__header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.customer-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.customer-modal__header .close:hover {\n  color: #1f2937;\n}\n.customer-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.customer-modal__body form {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.customer-modal__body form .col-span-2 {\n  grid-column: 1/-1;\n}\n.customer-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n}\n@media (max-width: 640px) {\n  .customer-modal__body form {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=customer-edit-modal.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialog }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: CustomerService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerEditModalComponent, { className: "CustomerEditModalComponent", filePath: "src/app/features/customers/components/customer-edit-modal/customer-edit-modal.component.ts", lineNumber: 32 });
})();

export {
  CustomerGroupDropdownComponent,
  CustomerEditModalComponent
};
//# sourceMappingURL=chunk-XGVGRBFF.js.map
