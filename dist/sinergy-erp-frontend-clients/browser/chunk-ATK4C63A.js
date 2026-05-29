import {
  CustomerService
} from "./chunk-RJ5DYVAD.js";
import {
  TabComponent
} from "./chunk-76WJTPQU.js";
import {
  WarehouseService
} from "./chunk-I62MUB3O.js";
import {
  PhoneCodeSelectComponent,
  PhoneCountrySelectComponent,
  PhoneDigitsDirective
} from "./chunk-RWWGQKW7.js";
import {
  SelectComponent
} from "./chunk-HCYLGR2Q.js";
import {
  InterceptorService
} from "./chunk-6WX4EKZ5.js";
import {
  InputComponent
} from "./chunk-H5L6TOJV.js";
import {
  ButtonComponent
} from "./chunk-U6P37MEJ.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-YLZRJESW.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GRWRLGZU.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-Z3FOIOXA.js";
import {
  CommonModule,
  HttpClient,
  HttpErrorResponse,
  NgClass,
  NgIf,
  environment
} from "./chunk-RBFB2ZTY.js";
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
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-GBHDNI6X.js";

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
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.code;
function CustomerEditModalComponent_Conditional_9_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.controlErrorMessage("phone"));
  }
}
function CustomerEditModalComponent_Conditional_9_ng_container_27_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.controlErrorMessage("additional_phone"));
  }
}
function CustomerEditModalComponent_Conditional_9_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div");
    \u0275\u0275element(2, "app-input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275element(4, "app-input", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 5);
    \u0275\u0275element(6, "app-input", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "label", 13);
    \u0275\u0275text(9, "Tel\xE9fono adicional");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 27);
    \u0275\u0275conditionalCreate(11, CustomerEditModalComponent_Conditional_9_ng_container_27_Conditional_11_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div");
    \u0275\u0275element(13, "app-phone-code-select", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 5);
    \u0275\u0275element(15, "app-phone-country-select", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["additional_name"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["additional_lastname"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["additional_email"]);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.controlShowError("additional_phone") ? "border-red-400 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.controlShowError("additional_phone") && ctx_r1.controlErrorMessage("additional_phone") ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("control", ctx_r1.getAdditionalPhoneCodeControl());
    \u0275\u0275advance(2);
    \u0275\u0275property("control", ctx_r1.getAdditionalPhoneCountryControl());
  }
}
function CustomerEditModalComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "app-input", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275element(3, "app-input", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275element(5, "app-input", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "label", 13);
    \u0275\u0275text(8, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 14);
    \u0275\u0275conditionalCreate(10, CustomerEditModalComponent_Conditional_9_Conditional_10_Template, 2, 1, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div");
    \u0275\u0275element(12, "app-phone-code-select", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div");
    \u0275\u0275element(14, "app-phone-country-select", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 5);
    \u0275\u0275element(16, "app-input", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 5)(18, "label", 13);
    \u0275\u0275text(19, "Grupo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "app-customer-group-dropdown", 18);
    \u0275\u0275listener("groupSelect", function CustomerEditModalComponent_Conditional_9_Template_app_customer_group_dropdown_groupSelect_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onGroupSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 19)(22, "button", 20);
    \u0275\u0275listener("click", function CustomerEditModalComponent_Conditional_9_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleAdditionalPerson());
    });
    \u0275\u0275elementStart(23, "span", 21);
    \u0275\u0275text(24, "Persona adicional (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 22);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(27, CustomerEditModalComponent_Conditional_9_ng_container_27_Template, 16, 7, "ng-container", 23);
  }
  if (rf & 2) {
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["name"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["lastname"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["email"]);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.controlShowError("phone") ? "border-red-400 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.controlShowError("phone") && ctx_r1.controlErrorMessage("phone") ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("control", ctx_r1.getPhoneCodeControl());
    \u0275\u0275advance(2);
    \u0275\u0275property("control", ctx_r1.getPhoneCountryControl());
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["company_name"]);
    \u0275\u0275advance(4);
    \u0275\u0275property("selectedGroupId", ((tmp_9_0 = ctx_r1.selectedGroup()) == null ? null : tmp_9_0.id) || null)("disabled", ctx_r1.loading());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.additionalPersonExpanded() ? "Ocultar" : "Agregar", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.additionalPersonExpanded());
  }
}
function CustomerEditModalComponent_Conditional_10_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r3 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", warehouse_r3.name, " (", warehouse_r3.code, ") ");
  }
}
function CustomerEditModalComponent_Conditional_10_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, "Cargando almacenes...");
    \u0275\u0275elementEnd();
  }
}
function CustomerEditModalComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "label", 13);
    \u0275\u0275text(2, "Almac\xE9n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 28)(4, "option", 29);
    \u0275\u0275text(5, "Sin almac\xE9n");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, CustomerEditModalComponent_Conditional_10_For_7_Template, 2, 3, "option", 30, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, CustomerEditModalComponent_Conditional_10_Conditional_8_Template, 2, 0, "p", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div");
    \u0275\u0275element(10, "app-input", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div");
    \u0275\u0275element(12, "app-input", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.warehouses());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.warehousesLoading() ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["credit_days"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["credit_amount"]);
  }
}
function CustomerEditModalComponent_Conditional_11_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const regimen_r4 = ctx.$implicit;
    \u0275\u0275property("value", regimen_r4.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(regimen_r4.label);
  }
}
function CustomerEditModalComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "app-input", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div")(3, "label", 13);
    \u0275\u0275text(4, "R\xE9gimen fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 35)(6, "option", 29);
    \u0275\u0275text(7, "Selecciona un r\xE9gimen fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, CustomerEditModalComponent_Conditional_11_For_9_Template, 2, 2, "option", 30, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 5);
    \u0275\u0275element(11, "app-input", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 5);
    \u0275\u0275element(13, "app-input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div");
    \u0275\u0275element(15, "app-input", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div");
    \u0275\u0275element(17, "app-input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 5);
    \u0275\u0275element(19, "app-input", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["fiscal_rfc"]);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.fiscalRegimenOptions);
    \u0275\u0275advance(3);
    \u0275\u0275property("form_control", ctx_r1.form.controls["fiscal_razon_social"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["fiscal_address"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["fiscal_city"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["fiscal_state"]);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["fiscal_postal_code"]);
  }
}
var CustomerEditModalComponent = class _CustomerEditModalComponent {
  fb;
  dialog;
  dialog_ref;
  data;
  customerService;
  interceptor_service;
  warehouseService;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  update = signal(false, ...ngDevMode ? [{ debugName: "update" }] : []);
  selectedGroup = signal(null, ...ngDevMode ? [{ debugName: "selectedGroup" }] : []);
  isCreateMode = signal(false, ...ngDevMode ? [{ debugName: "isCreateMode" }] : []);
  activeTab = signal("customer", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  tabs = [
    { id: "customer", title: "Informaci\xF3n del Cliente" },
    { id: "credit", title: "Credito" },
    { id: "fiscal", title: "Informaci\xF3n Fiscal" }
  ];
  fiscalRegimenOptions = [
    { code: "601", label: "601 - REGIMEN GENERAL DE LEY PERSONAS MORALES" },
    { code: "602", label: "602 - REGIMEN SIMPLIFICADO DE LEY PERSONAS MORALES" },
    { code: "603", label: "603 - PERSONAS MORALES CON FINES NO LUCRATIVOS" },
    { code: "604", label: "604 - REGIMEN DE PEQUENOS CONTRIBUYENTES" },
    { code: "605", label: "605 - REGIMEN DE SUELDOS Y SALARIOS E INGRESOS ASIMILADOS A SALARIOS" },
    { code: "606", label: "606 - REGIMEN DE ARRENDAMIENTO" },
    { code: "607", label: "607 - REGIMEN DE ENAJENACION O ADQUISICION DE BIENES" },
    { code: "608", label: "608 - REGIMEN DE LOS DEMAS INGRESOS" },
    { code: "609", label: "609 - REGIMEN DE CONSOLIDACION" },
    { code: "610", label: "610 - REGIMEN RESIDENTES EN EL EXTRANJERO SIN ESTABLECIMIENTO PERMANENTE EN MEXICO" },
    { code: "611", label: "611 - REGIMEN DE INGRESOS POR DIVIDENDOS (SOCIOS Y ACCIONISTAS)" },
    { code: "612", label: "612 - REGIMEN DE LAS PERSONAS FISICAS CON ACTIVIDADES EMPRESARIALES Y PROFESIONALES" },
    { code: "613", label: "613 - REGIMEN INTERMEDIO DE LAS PERSONAS FISICAS CON ACTIVIDADES EMPRESARIALES" },
    { code: "614", label: "614 - REGIMEN DE LOS INGRESOS POR INTERESES" },
    { code: "615", label: "615 - REGIMEN DE LOS INGRESOS POR OBTENCION DE PREMIOS" },
    { code: "616", label: "616 - SIN OBLIGACIONES FISCALES" },
    { code: "617", label: "617 - PEMEX" },
    { code: "618", label: "618 - REGIMEN SIMPLIFICADO DE LEY PERSONAS FISICAS" },
    { code: "619", label: "619 - INGRESOS POR LA OBTENCION DE PRESTAMOS" },
    { code: "620", label: "620 - SOCIEDADES COOPERATIVAS DE PRODUCCION QUE OPTAN POR DIFERIR SUS INGRESOS" },
    { code: "621", label: "621 - REGIMEN DE INCORPORACION FISCAL" },
    { code: "622", label: "622 - REGIMEN DE ACTIVIDADES AGRICOLAS, GANADERAS, SILVICOLAS Y PESQUERAS PM" },
    { code: "623", label: "623 - REGIMEN DE OPCIONAL PARA GRUPOS DE SOCIEDADES" },
    { code: "624", label: "624 - REGIMEN DE LOS COORDINADOS" },
    { code: "625", label: "625 - REGIMEN DE LAS ACTIVIDADES EMPRESARIALES CON INGRESOS A TRAVES DE PLATAFORMAS TECNOLOGICAS" },
    { code: "626", label: "626 - REGIMEN SIMPLIFICADO DE CONFIANZA" }
  ];
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  warehousesLoading = signal(false, ...ngDevMode ? [{ debugName: "warehousesLoading" }] : []);
  /** Sección persona adicional: colapsada por defecto en crear; abierta si ya hay datos al editar. */
  additionalPersonExpanded = signal(false, ...ngDevMode ? [{ debugName: "additionalPersonExpanded" }] : []);
  X = X;
  form;
  constructor(fb, dialog, dialog_ref, data, customerService, interceptor_service, warehouseService) {
    this.fb = fb;
    this.dialog = dialog;
    this.dialog_ref = dialog_ref;
    this.data = data;
    this.customerService = customerService;
    this.interceptor_service = interceptor_service;
    this.warehouseService = warehouseService;
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      lastname: [""],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.pattern(/^$|^\d{1,10}$/)]],
      phone_code: ["+52", [Validators.required]],
      phone_country: ["MX", [Validators.required]],
      company_name: [""],
      warehouse_id: [""],
      credit_days: ["", [Validators.min(0), Validators.pattern(/^$|^\d+$/)]],
      credit_amount: ["", [Validators.min(0), Validators.pattern(/^$|^\d+(\.\d{1,2})?$/)]],
      fiscal_rfc: [""],
      fiscal_razon_social: [""],
      fiscal_person_type: [""],
      fiscal_address: [""],
      fiscal_city: [""],
      fiscal_state: [""],
      fiscal_postal_code: [""],
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
        warehouse_id: this.data.customer.warehouse_id || "",
        credit_days: this.data.customer.credit_days ?? "",
        credit_amount: this.data.customer.credit_amount ?? "",
        fiscal_rfc: this.data.customer.fiscal_rfc || "",
        fiscal_razon_social: this.data.customer.fiscal_razon_social || "",
        fiscal_person_type: this.data.customer.fiscal_person_type || "",
        fiscal_address: this.data.customer.fiscal_address || "",
        fiscal_city: this.data.customer.fiscal_city || "",
        fiscal_state: this.data.customer.fiscal_state || "",
        fiscal_postal_code: this.data.customer.fiscal_postal_code || "",
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
    this.loadWarehouses();
  }
  setActiveTab(tab) {
    if (tab === "customer" || tab === "credit" || tab === "fiscal") {
      this.activeTab.set(tab);
    }
  }
  parseNullableInteger(value) {
    if (value === null || value === void 0 || value === "")
      return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed))
      return null;
    return Math.max(0, Math.trunc(parsed));
  }
  parseNullableDecimal(value) {
    if (value === null || value === void 0 || value === "")
      return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed))
      return null;
    return Math.max(0, Number(parsed.toFixed(2)));
  }
  loadWarehouses() {
    this.warehousesLoading.set(true);
    this.warehouseService.getWarehouses({ page: 1, limit: 200 }).subscribe({
      next: (response) => {
        const warehouses = this.extractWarehousesFromResponse(response);
        if (warehouses.length > 0) {
          this.warehouses.set(warehouses);
          this.warehousesLoading.set(false);
          return;
        }
        this.warehouseService.getWarehouses().subscribe({
          next: (fallbackResponse) => {
            this.warehouses.set(this.extractWarehousesFromResponse(fallbackResponse));
            this.warehousesLoading.set(false);
          },
          error: () => {
            this.warehousesLoading.set(false);
          }
        });
      },
      error: () => {
        this.warehouseService.getWarehouses().subscribe({
          next: (fallbackResponse) => {
            this.warehouses.set(this.extractWarehousesFromResponse(fallbackResponse));
            this.warehousesLoading.set(false);
          },
          error: () => {
            this.warehousesLoading.set(false);
          }
        });
      }
    });
  }
  extractWarehousesFromResponse(response) {
    const payload = response;
    if (Array.isArray(payload))
      return payload;
    if (Array.isArray(payload?.data))
      return payload.data;
    if (Array.isArray(payload?.items))
      return payload.items;
    if (Array.isArray(payload?.results))
      return payload.results;
    if (Array.isArray(payload?.data?.data))
      return payload.data.data;
    if (Array.isArray(payload?.data?.items))
      return payload.data.items;
    return [];
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
      warehouse_id: v.warehouse_id || null,
      credit_days: this.parseNullableInteger(v.credit_days),
      credit_amount: this.parseNullableDecimal(v.credit_amount),
      fiscal_rfc: trim(v.fiscal_rfc) || void 0,
      fiscal_razon_social: trim(v.fiscal_razon_social) || void 0,
      fiscal_person_type: v.fiscal_person_type || void 0,
      fiscal_address: trim(v.fiscal_address) || void 0,
      fiscal_city: trim(v.fiscal_city) || void 0,
      fiscal_state: trim(v.fiscal_state) || void 0,
      fiscal_postal_code: trim(v.fiscal_postal_code) || void 0,
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
      warehouse_id: v.warehouse_id || null,
      credit_days: this.parseNullableInteger(v.credit_days),
      credit_amount: this.parseNullableDecimal(v.credit_amount),
      fiscal_rfc: trim(v.fiscal_rfc) || void 0,
      fiscal_razon_social: trim(v.fiscal_razon_social) || void 0,
      fiscal_person_type: v.fiscal_person_type || void 0,
      fiscal_address: trim(v.fiscal_address) || void 0,
      fiscal_city: trim(v.fiscal_city) || void 0,
      fiscal_state: trim(v.fiscal_state) || void 0,
      fiscal_postal_code: trim(v.fiscal_postal_code) || void 0,
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
    return new (__ngFactoryType__ || _CustomerEditModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(WarehouseService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerEditModalComponent, selectors: [["app-customer-edit-modal"]], decls: 15, vars: 10, consts: [[1, "customer-modal"], [1, "customer-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "customer-modal__body"], [3, "formGroup"], [1, "col-span-2"], [3, "tabChange", "tabs", "activeTabId"], [1, "customer-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading"], ["label", "Nombre", "placeholder", "Nombre", 3, "form_control"], ["label", "Apellido", "placeholder", "Apellido", 3, "form_control"], ["label", "Email", "placeholder", "Email", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "phone", "appPhoneDigits", "", "placeholder", "Tel\xE9fono", 1, "w-full", "px-3", "py-2", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "border", 3, "ngClass"], ["role", "alert", 1, "mt-1", "text-sm", "text-red-600"], [3, "control"], ["label", "Empresa", "placeholder", "Empresa", 3, "form_control"], [3, "groupSelect", "selectedGroupId", "disabled"], [1, "col-span-2", "pt-2", "border-t", "border-gray-200"], ["type", "button", 1, "customer-modal__expand-additional", 3, "click"], [1, "customer-modal__expand-additional-label"], [1, "customer-modal__expand-additional-action"], [4, "ngIf"], ["label", "Nombre adicional", "placeholder", "Nombre", 3, "form_control"], ["label", "Apellido adicional", "placeholder", "Apellido", 3, "form_control"], ["label", "Email adicional", "placeholder", "Email", 3, "form_control"], ["type", "text", "formControlName", "additional_phone", "appPhoneDigits", "", "placeholder", "Tel\xE9fono", 1, "w-full", "px-3", "py-2", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "border", 3, "ngClass"], ["formControlName", "warehouse_id", 1, "w-full", "px-3", "py-2", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "border", "border-gray-300", "focus:ring-blue-500", "focus:border-blue-500"], ["value", ""], [3, "value"], [1, "mt-1", "text-xs", "text-gray-500"], ["label", "D\xEDas de cr\xE9dito", "placeholder", "0", "type", "number", 3, "form_control"], ["label", "Monto de cr\xE9dito", "placeholder", "0.00", "type", "number", 3, "form_control"], ["label", "RFC", "placeholder", "RFC", 3, "form_control"], ["formControlName", "fiscal_person_type", 1, "w-full", "px-3", "py-2", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "border", "border-gray-300", "focus:ring-blue-500", "focus:border-blue-500"], ["label", "Raz\xF3n social", "placeholder", "Raz\xF3n social", 3, "form_control"], ["label", "Direcci\xF3n fiscal", "placeholder", "Direcci\xF3n fiscal", 3, "form_control"], ["label", "Ciudad", "placeholder", "Ciudad", 3, "form_control"], ["label", "Estado", "placeholder", "Estado", 3, "form_control"], ["label", "C\xF3digo postal", "placeholder", "C\xF3digo postal", 3, "form_control"]], template: function CustomerEditModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function CustomerEditModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div", 5)(8, "app-tab", 6);
      \u0275\u0275listener("tabChange", function CustomerEditModalComponent_Template_app_tab_tabChange_8_listener($event) {
        return ctx.setActiveTab($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, CustomerEditModalComponent_Conditional_9_Template, 28, 12);
      \u0275\u0275conditionalCreate(10, CustomerEditModalComponent_Conditional_10_Template, 13, 3);
      \u0275\u0275conditionalCreate(11, CustomerEditModalComponent_Conditional_11_Template, 20, 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 7)(13, "app-button", 8);
      \u0275\u0275listener("clicked", function CustomerEditModalComponent_Template_app_button_clicked_13_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "app-button", 9);
      \u0275\u0275listener("clicked", function CustomerEditModalComponent_Template_app_button_clicked_14_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isCreateMode() ? "Crear Cliente" : "Editar Cliente");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("tabs", ctx.tabs)("activeTabId", ctx.activeTab());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "customer" ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "credit" ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "fiscal" ? 11 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isCreateMode() ? "Crear" : "Actualizar")("loading", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
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
    PhoneDigitsDirective,
    TabComponent
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
      PhoneDigitsDirective,
      TabComponent
    ], encapsulation: ViewEncapsulation.None, template: `<div class="customer-modal">
  <div class="customer-modal__header">
    <h2>{{ isCreateMode() ? 'Crear Cliente' : 'Editar Cliente' }}</h2>
    <lucide-icon
      [img]="X"
      class="close cursor-pointer"
      (click)="closeDialog()">
    </lucide-icon>
  </div>

  <div class="customer-modal__body">
    <form [formGroup]="form">
      <div class="col-span-2">
        <app-tab
          [tabs]="tabs"
          [activeTabId]="activeTab()"
          (tabChange)="setActiveTab($event)">
        </app-tab>
      </div>

      @if (activeTab() === 'customer') {
      <!-- Nombre -->
      <div>
        <app-input
          label="Nombre"
          placeholder="Nombre"
          [form_control]="form.controls['name']">
        </app-input>
      </div>

      <!-- Apellido -->
      <div>
        <app-input
          label="Apellido"
          placeholder="Apellido"
          [form_control]="form.controls['lastname']">
        </app-input>
      </div>

      <!-- Email -->
      <div>
        <app-input
          label="Email"
          placeholder="Email"
          [form_control]="form.controls['email']">
        </app-input>
      </div>

      <!-- Tel\xE9fono -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tel\xE9fono</label>
        <input
          type="text"
          formControlName="phone"
          appPhoneDigits
          class="w-full px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border"
          [ngClass]="controlShowError('phone')
            ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
          placeholder="Tel\xE9fono">
        @if (controlShowError('phone') && controlErrorMessage('phone')) {
          <p class="mt-1 text-sm text-red-600" role="alert">{{ controlErrorMessage('phone') }}</p>
        }
      </div>

      <!-- C\xF3digo Tel\xE9fono -->
      <div>
        <app-phone-code-select
          [control]="getPhoneCodeControl()">
        </app-phone-code-select>
      </div>

      <!-- Pa\xEDs -->
      <div>
        <app-phone-country-select
          [control]="getPhoneCountryControl()">
        </app-phone-country-select>
      </div>

      <!-- Empresa (full width) -->
      <div class="col-span-2">
        <app-input
          label="Empresa"
          placeholder="Empresa"
          [form_control]="form.controls['company_name']">
        </app-input>
      </div>

      <!-- Grupo (full width) -->
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Grupo</label>
        <app-customer-group-dropdown
          [selectedGroupId]="selectedGroup()?.id || null"
          [disabled]="loading()"
          (groupSelect)="onGroupSelected($event)">
        </app-customer-group-dropdown>
      </div>

      <!-- Persona adicional (opcional): colapsable -->
      <div class="col-span-2 pt-2 border-t border-gray-200">
        <button
          type="button"
          class="customer-modal__expand-additional"
          (click)="toggleAdditionalPerson()">
          <span class="customer-modal__expand-additional-label">Persona adicional (opcional)</span>
          <span class="customer-modal__expand-additional-action">
            {{ additionalPersonExpanded() ? 'Ocultar' : 'Agregar' }}
          </span>
        </button>
      </div>

      <ng-container *ngIf="additionalPersonExpanded()">
        <div>
          <app-input
            label="Nombre adicional"
            placeholder="Nombre"
            [form_control]="form.controls['additional_name']">
          </app-input>
        </div>

        <div>
          <app-input
            label="Apellido adicional"
            placeholder="Apellido"
            [form_control]="form.controls['additional_lastname']">
          </app-input>
        </div>

        <div class="col-span-2">
          <app-input
            label="Email adicional"
            placeholder="Email"
            [form_control]="form.controls['additional_email']">
          </app-input>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tel\xE9fono adicional</label>
          <input
            type="text"
            formControlName="additional_phone"
            appPhoneDigits
            class="w-full px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border"
            [ngClass]="controlShowError('additional_phone')
              ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
            placeholder="Tel\xE9fono">
          @if (controlShowError('additional_phone') && controlErrorMessage('additional_phone')) {
            <p class="mt-1 text-sm text-red-600" role="alert">{{ controlErrorMessage('additional_phone') }}</p>
          }
        </div>

        <div>
          <app-phone-code-select
            [control]="getAdditionalPhoneCodeControl()">
          </app-phone-code-select>
        </div>

        <div class="col-span-2">
          <app-phone-country-select
            [control]="getAdditionalPhoneCountryControl()">
          </app-phone-country-select>
        </div>
      </ng-container>
      }

      @if (activeTab() === 'credit') {
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Almac\xE9n</label>
          <select
            formControlName="warehouse_id"
            class="w-full px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Sin almac\xE9n</option>
            @for (warehouse of warehouses(); track warehouse.id) {
              <option [value]="warehouse.id">
                {{ warehouse.name }} ({{ warehouse.code }})
              </option>
            }
          </select>
          @if (warehousesLoading()) {
            <p class="mt-1 text-xs text-gray-500">Cargando almacenes...</p>
          }
        </div>

        <div>
          <app-input
            label="D\xEDas de cr\xE9dito"
            placeholder="0"
            type="number"
            [form_control]="form.controls['credit_days']">
          </app-input>
        </div>

        <div>
          <app-input
            label="Monto de cr\xE9dito"
            placeholder="0.00"
            type="number"
            [form_control]="form.controls['credit_amount']">
          </app-input>
        </div>
      }

      @if (activeTab() === 'fiscal') {
        <div>
          <app-input
            label="RFC"
            placeholder="RFC"
            [form_control]="form.controls['fiscal_rfc']">
          </app-input>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">R\xE9gimen fiscal</label>
          <select
            formControlName="fiscal_person_type"
            class="w-full px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Selecciona un r\xE9gimen fiscal</option>
            @for (regimen of fiscalRegimenOptions; track regimen.code) {
              <option [value]="regimen.code">{{ regimen.label }}</option>
            }
          </select>
        </div>

        <div class="col-span-2">
          <app-input
            label="Raz\xF3n social"
            placeholder="Raz\xF3n social"
            [form_control]="form.controls['fiscal_razon_social']">
          </app-input>
        </div>

        <div class="col-span-2">
          <app-input
            label="Direcci\xF3n fiscal"
            placeholder="Direcci\xF3n fiscal"
            [form_control]="form.controls['fiscal_address']">
          </app-input>
        </div>

        <div>
          <app-input
            label="Ciudad"
            placeholder="Ciudad"
            [form_control]="form.controls['fiscal_city']">
          </app-input>
        </div>

        <div>
          <app-input
            label="Estado"
            placeholder="Estado"
            [form_control]="form.controls['fiscal_state']">
          </app-input>
        </div>

        <div class="col-span-2">
          <app-input
            label="C\xF3digo postal"
            placeholder="C\xF3digo postal"
            [form_control]="form.controls['fiscal_postal_code']">
          </app-input>
        </div>
      }
    </form>
  </div>

  <div class="customer-modal__footer">
    <app-button
      text="Cancelar"
      custom_class="btn_secondary"
      (clicked)="closeDialog()">
    </app-button>
    <app-button
      [text]="isCreateMode() ? 'Crear' : 'Actualizar'"
      custom_class="btn_primary"
      [loading]="loading()"
      (clicked)="submit()">
    </app-button>
  </div>
</div>
`, styles: ["/* src/app/features/customers/components/customer-edit-modal/customer-edit-modal.scss */\n.cdk-overlay-pane.customer-edit-dialog {\n  max-height: 90vh !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-container {\n  max-height: 90vh !important;\n  display: flex !important;\n  flex-direction: column !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-inner-container {\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  display: flex !important;\n  flex-direction: column !important;\n  max-height: 100% !important;\n}\n.cdk-overlay-pane.customer-edit-dialog .mat-mdc-dialog-surface {\n  display: flex !important;\n  flex-direction: column !important;\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  max-height: 100% !important;\n  overflow: hidden !important;\n  padding: 0 !important;\n}\n.cdk-overlay-pane.customer-edit-dialog app-customer-edit-modal {\n  display: flex !important;\n  flex-direction: column !important;\n  flex: 1 1 auto !important;\n  min-height: 0 !important;\n  max-height: 100% !important;\n  overflow: hidden !important;\n}\n.customer-modal {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  min-height: 0;\n  max-height: 100%;\n  background: #fff;\n}\n.customer-modal__header {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.customer-modal__header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.customer-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.customer-modal__header .close:hover {\n  color: #1f2937;\n}\n.customer-modal__body {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 1.5rem;\n}\n.customer-modal__body form {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.customer-modal__body form .col-span-2 {\n  grid-column: 1/-1;\n}\n.customer-modal__footer {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n}\n.customer-modal__expand-additional {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  gap: 0.75rem;\n  padding: 0.375rem 0;\n  margin: 0;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  text-align: left;\n  border-radius: 0.375rem;\n}\n.customer-modal__expand-additional:hover .customer-modal__expand-additional-action {\n  text-decoration: underline;\n}\n.customer-modal__expand-additional:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.customer-modal__expand-additional-label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.customer-modal__expand-additional-action {\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #4f46e5;\n}\n@media (max-width: 640px) {\n  .customer-modal__body form {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=customer-edit-modal.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialog }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: CustomerService }, { type: InterceptorService }, { type: WarehouseService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerEditModalComponent, { className: "CustomerEditModalComponent", filePath: "src/app/features/customers/components/customer-edit-modal/customer-edit-modal.component.ts", lineNumber: 39 });
})();

export {
  CustomerGroupDropdownComponent,
  CustomerEditModalComponent
};
//# sourceMappingURL=chunk-ATK4C63A.js.map
