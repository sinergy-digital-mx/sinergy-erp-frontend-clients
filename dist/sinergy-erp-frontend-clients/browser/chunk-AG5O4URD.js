import {
  PropertyEditModalComponent,
  PropertyService
} from "./chunk-A7EHO6MT.js";
import {
  PROPERTY_FORM_DIALOG_CONFIG
} from "./chunk-OF4HYHND.js";
import {
  SearchComponent
} from "./chunk-7XQ3OKZP.js";
import {
  DatatableWrapperComponent
} from "./chunk-E6XUO6IC.js";
import {
  SelectComponent
} from "./chunk-FJKKJVBI.js";
import "./chunk-6CHEJEJW.js";
import {
  MatDialog
} from "./chunk-X4R6VVPV.js";
import "./chunk-ESTBWOCJ.js";
import "./chunk-5M3EQ6HX.js";
import {
  ButtonComponent
} from "./chunk-QII3XD7X.js";
import "./chunk-CDP25QD6.js";
import "./chunk-YTYO4VTK.js";
import "./chunk-4K6KH37Z.js";
import {
  ArrowRight
} from "./chunk-SNZEVNJV.js";
import "./chunk-QU2SCCOO.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-YUPXBHST.js";
import {
  CommonModule,
  CurrencyPipe,
  HttpClient,
  NgIf,
  environment
} from "./chunk-FGZNYMY3.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Subject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-XEFUC5ED.js";

// src/app/features/properties/components/property-group-dropdown/property-group-dropdown.component.ts
var PropertyGroupDropdownComponent = class _PropertyGroupDropdownComponent {
  http;
  selectedGroupId = null;
  groupSelect = new EventEmitter();
  groups = signal([], ...ngDevMode ? [{ debugName: "groups" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  ngOnInit() {
    this.loadGroups();
  }
  selectConfig() {
    return {
      placeholder: "Filtrar por proyecto",
      data: this.groups(),
      value: "id",
      option: "name",
      form_control: null,
      loading: this.loading(),
      all: true,
      all_message: "Todos los proyectos",
      value_default: this.selectedGroupId
    };
  }
  loadGroups() {
    this.loading.set(true);
    this.http.get(`${this.api}/tenant/property-groups`).subscribe({
      next: (response) => {
        const groupsData = Array.isArray(response) ? response : [];
        this.groups.set(groupsData);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.groups.set([]);
      }
    });
  }
  onGroupChange(event) {
    const groupId = event?.value || null;
    const groupName = groupId ? this.groups().find((g) => g.id === groupId)?.name || null : null;
    this.groupSelect.emit({ groupId, groupName });
  }
  static \u0275fac = function PropertyGroupDropdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertyGroupDropdownComponent)(\u0275\u0275directiveInject(HttpClient));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PropertyGroupDropdownComponent, selectors: [["app-property-group-dropdown"]], inputs: { selectedGroupId: "selectedGroupId" }, outputs: { groupSelect: "groupSelect" }, decls: 1, vars: 1, consts: [[3, "changeOption", "config"]], template: function PropertyGroupDropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-select", 0);
      \u0275\u0275listener("changeOption", function PropertyGroupDropdownComponent_Template_app_select_changeOption_0_listener($event) {
        return ctx.onGroupChange($event);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("config", ctx.selectConfig());
    }
  }, dependencies: [CommonModule, SelectComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertyGroupDropdownComponent, [{
    type: Component,
    args: [{ selector: "app-property-group-dropdown", standalone: true, imports: [CommonModule, SelectComponent], template: `
    <app-select
      [config]="selectConfig()"
      (changeOption)="onGroupChange($event)">
    </app-select>
  ` }]
  }], () => [{ type: HttpClient }], { selectedGroupId: [{
    type: Input
  }], groupSelect: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PropertyGroupDropdownComponent, { className: "PropertyGroupDropdownComponent", filePath: "src/app/features/properties/components/property-group-dropdown/property-group-dropdown.component.ts", lineNumber: 26 });
})();

// src/app/features/properties/components/property-status-dropdown/property-status-dropdown.component.ts
var PropertyStatusDropdownComponent = class _PropertyStatusDropdownComponent {
  selectedStatus = null;
  statusSelect = new EventEmitter();
  statusOptions = [
    { value: "disponible", label: "Disponible" },
    { value: "vendido", label: "Vendido" },
    { value: "reservado", label: "Reservado" },
    { value: "cancelado", label: "Cancelado" }
  ];
  selectConfig() {
    return {
      placeholder: "Filtrar por estado",
      data: this.statusOptions,
      value: "value",
      option: "label",
      form_control: null,
      loading: false,
      all: true,
      all_message: "Todos los estados",
      value_default: this.selectedStatus
    };
  }
  onStatusChange(event) {
    const status = event?.value || null;
    this.statusSelect.emit({ status });
  }
  static \u0275fac = function PropertyStatusDropdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertyStatusDropdownComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PropertyStatusDropdownComponent, selectors: [["app-property-status-dropdown"]], inputs: { selectedStatus: "selectedStatus" }, outputs: { statusSelect: "statusSelect" }, decls: 1, vars: 1, consts: [[3, "changeOption", "config"]], template: function PropertyStatusDropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-select", 0);
      \u0275\u0275listener("changeOption", function PropertyStatusDropdownComponent_Template_app_select_changeOption_0_listener($event) {
        return ctx.onStatusChange($event);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("config", ctx.selectConfig());
    }
  }, dependencies: [CommonModule, SelectComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertyStatusDropdownComponent, [{
    type: Component,
    args: [{ selector: "app-property-status-dropdown", standalone: true, imports: [CommonModule, SelectComponent], template: `
    <app-select
      [config]="selectConfig()"
      (changeOption)="onStatusChange($event)">
    </app-select>
  ` }]
  }], null, { selectedStatus: [{
    type: Input
  }], statusSelect: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PropertyStatusDropdownComponent, { className: "PropertyStatusDropdownComponent", filePath: "src/app/features/properties/components/property-status-dropdown/property-status-dropdown.component.ts", lineNumber: 23 });
})();

// src/app/features/properties/pages/properties-list/properties-list.component.ts
var _c0 = ["tableTemplate"];
var _forTrack0 = ($index, $item) => $item.id;
function PropertiesListComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, "Cargando lotes...");
    \u0275\u0275elementEnd();
  }
}
function PropertiesListComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, "No se encontraron lotes");
    \u0275\u0275elementEnd();
  }
}
function PropertiesListComponent_Conditional_15_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Manzana ", item_r3.block);
  }
}
function PropertiesListComponent_Conditional_15_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275listener("click", function PropertiesListComponent_Conditional_15_For_2_Conditional_19_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.navigateToCustomer(item_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getOwnerName(item_r3), " ");
  }
}
function PropertiesListComponent_Conditional_15_For_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PropertiesListComponent_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275listener("click", function PropertiesListComponent_Conditional_15_For_2_Template_div_click_0_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.editProperty(item_r3));
    });
    \u0275\u0275elementStart(1, "div", 19)(2, "div", 20)(3, "span", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h3", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, PropertiesListComponent_Conditional_15_For_2_Conditional_7_Template, 2, 1, "p", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 24)(11, "div")(12, "span", 25);
    \u0275\u0275text(13, "Proyecto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 26);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "span", 25);
    \u0275\u0275text(18, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, PropertiesListComponent_Conditional_15_For_2_Conditional_19_Template, 2, 1, "span", 27)(20, PropertiesListComponent_Conditional_15_For_2_Conditional_20_Template, 2, 0, "span", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div")(22, "span", 25);
    \u0275\u0275text(23, "\xC1rea");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 26);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "span", 25);
    \u0275\u0275text(28, "Precio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 29);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 30);
    \u0275\u0275listener("click", function PropertiesListComponent_Conditional_15_For_2_Template_div_click_32_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(33, "app-button", 31);
    \u0275\u0275listener("clicked", function PropertiesListComponent_Conditional_15_For_2_Template_app_button_clicked_33_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.editProperty(item_r3));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", item_r3.code, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.block ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.getStatusClass(item_r3.status) + " shrink-0");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(item_r3.status), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((item_r3.group == null ? null : item_r3.group.name) || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r3.hasOwner(item_r3) ? 19 : 20);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", item_r3.total_area, " ", (item_r3.measurement_unit == null ? null : item_r3.measurement_unit.symbol) || "m\xB2");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(31, 13, item_r3.total_price, item_r3.currency));
    \u0275\u0275advance(3);
    \u0275\u0275property("fullWidth", true)("icon", ctx_r3.ArrowRight);
  }
}
function PropertiesListComponent_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 33)(2, "button", 34);
    \u0275\u0275listener("click", function PropertiesListComponent_Conditional_15_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onPageChange({ page: (ctx_r3.table_config().page ?? 1) - 1, limit: ctx_r3.table_config().limit ?? 20 }));
    });
    \u0275\u0275text(3, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 34);
    \u0275\u0275listener("click", function PropertiesListComponent_Conditional_15_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onPageChange({ page: (ctx_r3.table_config().page ?? 1) + 1, limit: ctx_r3.table_config().limit ?? 20 }));
    });
    \u0275\u0275text(7, " Siguiente ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.table_config().page === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r3.table_config().page, " / ", ctx_r3.Math.ceil((ctx_r3.table_config().totalResults ?? 0) / (ctx_r3.table_config().limit ?? 20)), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.table_config().hasNext);
  }
}
function PropertiesListComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, PropertiesListComponent_Conditional_15_For_2_Template, 34, 16, "div", 16, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, PropertiesListComponent_Conditional_15_Conditional_3_Template, 8, 4, "div", 17);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.table_config().rows);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((ctx_r3.table_config().totalResults ?? 0) > (ctx_r3.table_config().limit ?? 20) ? 3 : -1);
  }
}
function PropertiesListComponent_ng_template_16_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "span", 40);
    \u0275\u0275listener("click", function PropertiesListComponent_ng_template_16_div_10_Template_span_click_1_listener() {
      \u0275\u0275restoreView(_r8);
      const item_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.navigateToCustomer(item_r9));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.getOwnerName(item_r9), " ");
  }
}
function PropertiesListComponent_ng_template_16_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PropertiesListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "span", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 37);
    \u0275\u0275listener("click", function PropertiesListComponent_ng_template_16_Template_td_click_9_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(10, PropertiesListComponent_ng_template_16_div_10_Template, 3, 1, "div", 38)(11, PropertiesListComponent_ng_template_16_ng_template_11_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td")(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 37);
    \u0275\u0275listener("click", function PropertiesListComponent_ng_template_16_Template_td_click_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(22, "app-button", 39);
    \u0275\u0275listener("clicked", function PropertiesListComponent_ng_template_16_Template_app_button_clicked_22_listener() {
      const item_r9 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.editProperty(item_r9));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const noOwner_r10 = \u0275\u0275reference(12);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r9.code, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.block || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r9.group == null ? null : item_r9.group.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.hasOwner(item_r9))("ngIfElse", noOwner_r10);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", item_r9.total_area, " ", (item_r9.measurement_unit == null ? null : item_r9.measurement_unit.symbol) || "m\xB2");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 14, item_r9.total_price, item_r9.currency));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r3.getStatusClass(item_r9.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(item_r9.status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("fullWidth", false)("icon", ctx_r3.ArrowRight);
  }
}
var PropertiesListComponent = class _PropertiesListComponent {
  router;
  route;
  propertyService;
  dialog;
  tableTemplate;
  table_config = signal({
    rows: [],
    columns: [
      { name: "C\xF3digo", prop: "code", sortable: true, canAutoResize: true },
      { name: "Manzana", prop: "block", sortable: true, canAutoResize: true },
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true },
      { name: "Proyecto", prop: "group", sortable: false, canAutoResize: true },
      { name: "Cliente", prop: "contracts", sortable: false, canAutoResize: true },
      { name: "\xC1rea", prop: "total_area", sortable: true, canAutoResize: true },
      { name: "Precio", prop: "total_price", sortable: true, canAutoResize: true },
      { name: "Estado", prop: "status", sortable: true, canAutoResize: true },
      { name: "Acciones", prop: "actions", sortable: false, canAutoResize: true }
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron lotes" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  ArrowRight = ArrowRight;
  Math = Math;
  search = "";
  selectedGroupId = null;
  selectedGroupName = null;
  selectedStatus = null;
  currentSort = null;
  destroy$ = new Subject();
  lastQueryParams = "";
  constructor(router, route, propertyService, dialog) {
    this.router = router;
    this.route = route;
    this.propertyService = propertyService;
    this.dialog = dialog;
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;
      this.search = query?.search ?? "";
      this.selectedGroupId = query?.groupId ?? null;
      this.selectedStatus = query?.status ?? null;
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit
      }));
      this.getProperties();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getProperties() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const config = this.table_config();
    let data = __spreadValues(__spreadValues(__spreadValues(__spreadValues({
      page: config.page,
      limit: config.limit
    }, this.search && { search: this.search }), this.selectedGroupId && { groupId: this.selectedGroupId }), this.selectedStatus && { status: this.selectedStatus }), this.currentSort && this.currentSort.direction && {
      sort: this.currentSort.column.prop,
      order: this.currentSort.direction
    });
    this.propertyService.getProperties(data).subscribe((res) => {
      const properties = Array.isArray(res) ? res : res?.data ?? [];
      const total = Array.isArray(res) ? res.length : res?.total ?? 0;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        rows: properties,
        totalResults: total,
        hasNext: res?.hasNext ?? false,
        loading: false
      }));
    });
  }
  onPageChange(event) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page,
        limit: event.limit,
        search: this.search || void 0,
        groupId: this.selectedGroupId || void 0,
        status: this.selectedStatus || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onSortChange(event) {
    this.currentSort = event;
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: this.search || void 0,
        groupId: this.selectedGroupId || void 0,
        status: this.selectedStatus || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onRowClick(event) {
    const row = event?.data || event;
    this.editProperty(row);
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || void 0,
        groupId: this.selectedGroupId || void 0,
        status: this.selectedStatus || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onGroupSelect(event) {
    this.selectedGroupId = event.groupId;
    this.selectedGroupName = event.groupName;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        groupId: event.groupId || void 0,
        search: this.search || void 0,
        status: this.selectedStatus || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onStatusSelect(event) {
    this.selectedStatus = event.status;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        status: event.status || void 0,
        search: this.search || void 0,
        groupId: this.selectedGroupId || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  createProperty() {
    this.dialog.open(PropertyEditModalComponent, __spreadProps(__spreadValues({}, PROPERTY_FORM_DIALOG_CONFIG), {
      data: { property: null }
    })).afterClosed().subscribe((result) => {
      if (result) {
        this.getProperties();
      }
    });
  }
  editProperty(property) {
    console.log("Opening edit modal for property:", property);
    this.dialog.open(PropertyEditModalComponent, __spreadProps(__spreadValues({}, PROPERTY_FORM_DIALOG_CONFIG), {
      data: { property }
    })).afterClosed().subscribe((result) => {
      if (result) {
        this.getProperties();
      }
    });
  }
  viewDetail(row) {
    this.router.navigate(["/properties/detail", row.id]);
  }
  getStatusClass(status) {
    const statusMap = {
      "disponible": "bg-green-100 text-green-800",
      "vendido": "bg-blue-100 text-blue-800",
      "reservado": "bg-orange-100 text-orange-800",
      "cancelado": "bg-red-100 text-red-800"
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status] || "bg-gray-100 text-gray-800"}`;
  }
  getStatusLabel(status) {
    const labels = {
      "disponible": "Disponible",
      "vendido": "Vendido",
      "reservado": "Reservado",
      "cancelado": "Cancelado"
    };
    return labels[status] || status;
  }
  getOwnerName(property) {
    const owner = property.contracts?.[0]?.customer;
    if (!owner)
      return "\u2014";
    const firstLastname = owner.lastname?.split(" ")[0] || "";
    return `${owner.name} ${firstLastname}`.trim();
  }
  hasOwner(property) {
    return !!(property.contracts && property.contracts.length > 0 && property.contracts[0].customer);
  }
  navigateToCustomer(property) {
    const customerId = property.contracts?.[0]?.customer?.id;
    if (customerId) {
      this.router.navigate(["/customers/detail", customerId]);
    }
  }
  static \u0275fac = function PropertiesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertiesListComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PropertiesListComponent, selectors: [["app-properties-list"]], viewQuery: function PropertiesListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 18, vars: 6, consts: [["tableTemplate", ""], ["noOwner", ""], [1, "px-0", "sm:px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-xl", "sm:text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-col", "gap-3", "w-full", "md:w-auto"], [1, "flex", "flex-col", "sm:flex-row", "gap-3", "sm:items-center"], [1, "w-full", "sm:w-auto", 3, "groupSelect", "selectedGroupId"], [1, "w-full", "sm:w-auto", 3, "statusSelect", "selectedStatus"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "gap-3"], ["param_name", "search", 1, "w-full", "sm:w-64", 3, "searchChange", "param_activate"], ["text", "Crear Lote", "custom_class", "btn_primary w-full sm:w-auto", 3, "clicked"], [1, "hidden", "md:block", 3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "block", "md:hidden"], [1, "py-10", "text-center", "text-gray-500", "text-sm"], [1, "space-y-3"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", "active:bg-gray-50"], [1, "mt-4", "flex", "justify-center"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", "active:bg-gray-50", 3, "click"], [1, "flex", "justify-between", "items-start", "gap-2", "mb-3"], [1, "min-w-0", "flex-1"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800"], [1, "font-semibold", "text-gray-900", "truncate", "mt-1.5"], [1, "text-xs", "text-gray-500", "mt-0.5"], [1, "grid", "grid-cols-2", "gap-x-4", "gap-y-2", "text-sm"], [1, "text-xs", "text-gray-500", "block"], [1, "text-gray-900"], [1, "text-blue-700", "font-medium"], [1, "text-gray-400"], [1, "text-gray-900", "font-medium"], [1, "mt-3", "pt-3", "border-t", "border-gray-100", 3, "click"], ["text", "Ver Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "text-blue-700", "font-medium", 3, "click"], [1, "flex", "items-center", "gap-2"], ["type", "button", 1, "px-3", "py-1.5", "text-sm", "border", "rounded-lg", "disabled:opacity-50", "bg-white", 3, "click", "disabled"], [1, "text-sm", "text-gray-600"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "whitespace-nowrap"], [3, "click"], [4, "ngIf", "ngIfElse"], ["text", "Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "whitespace-nowrap", "cursor-pointer", "hover:bg-blue-200", "transition-colors", 3, "click"], [1, "text-sm", "text-gray-400"]], template: function PropertiesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2", 4);
      \u0275\u0275text(3, "Lotes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "app-property-group-dropdown", 7);
      \u0275\u0275listener("groupSelect", function PropertiesListComponent_Template_app_property_group_dropdown_groupSelect_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onGroupSelect($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "app-property-status-dropdown", 8);
      \u0275\u0275listener("statusSelect", function PropertiesListComponent_Template_app_property_status_dropdown_statusSelect_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onStatusSelect($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 9)(9, "app-search", 10);
      \u0275\u0275listener("searchChange", function PropertiesListComponent_Template_app_search_searchChange_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "app-button", 11);
      \u0275\u0275listener("clicked", function PropertiesListComponent_Template_app_button_clicked_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createProperty());
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(11, "app-datatable-wrapper", 12);
      \u0275\u0275listener("pageChange", function PropertiesListComponent_Template_app_datatable_wrapper_pageChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function PropertiesListComponent_Template_app_datatable_wrapper_sortChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function PropertiesListComponent_Template_app_datatable_wrapper_rowClick_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onRowClick($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 13);
      \u0275\u0275conditionalCreate(13, PropertiesListComponent_Conditional_13_Template, 2, 0, "div", 14)(14, PropertiesListComponent_Conditional_14_Template, 2, 0, "div", 14)(15, PropertiesListComponent_Conditional_15_Template, 4, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(16, PropertiesListComponent_ng_template_16_Template, 23, 17, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_6_0;
      const tableTemplate_r11 = \u0275\u0275reference(17);
      \u0275\u0275advance(6);
      \u0275\u0275property("selectedGroupId", ctx.selectedGroupId);
      \u0275\u0275advance();
      \u0275\u0275property("selectedStatus", ctx.selectedStatus);
      \u0275\u0275advance(2);
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r11);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.table_config().loading ? 13 : !((tmp_6_0 = ctx.table_config().rows) == null ? null : tmp_6_0.length) ? 14 : 15);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    PropertyGroupDropdownComponent,
    PropertyStatusDropdownComponent,
    CurrencyPipe
  ], styles: ["\n\n/*# sourceMappingURL=properties-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertiesListComponent, [{
    type: Component,
    args: [{ selector: "app-properties-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent,
      PropertyGroupDropdownComponent,
      PropertyStatusDropdownComponent
    ], template: `<div class="px-0 sm:px-4">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Lotes</h2>\r
\r
    <div class="flex flex-col gap-3 w-full md:w-auto">\r
      <div class="flex flex-col sm:flex-row gap-3 sm:items-center">\r
        <app-property-group-dropdown\r
          class="w-full sm:w-auto"\r
          [selectedGroupId]="selectedGroupId"\r
          (groupSelect)="onGroupSelect($event)">\r
        </app-property-group-dropdown>\r
\r
        <app-property-status-dropdown\r
          class="w-full sm:w-auto"\r
          [selectedStatus]="selectedStatus"\r
          (statusSelect)="onStatusSelect($event)">\r
        </app-property-status-dropdown>\r
      </div>\r
\r
      <div class="flex flex-col sm:flex-row sm:items-center gap-3">\r
        <app-search\r
          class="w-full sm:w-64"\r
          [param_activate]="true"\r
          param_name="search"\r
          (searchChange)="onSearchChange($event)">\r
        </app-search>\r
\r
        <app-button\r
          text="Crear Lote"\r
          custom_class="btn_primary w-full sm:w-auto"\r
          (clicked)="createProperty()">\r
        </app-button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    class="hidden md:block"\r
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate"\r
    (pageChange)="onPageChange($event)"\r
    (sortChange)="onSortChange($event)"\r
    (rowClick)="onRowClick($event)">\r
  </app-datatable-wrapper>\r
\r
  <!-- Mobile Cards -->\r
  <div class="block md:hidden">\r
    @if (table_config().loading) {\r
      <div class="py-10 text-center text-gray-500 text-sm">Cargando lotes...</div>\r
    } @else if (!table_config().rows?.length) {\r
      <div class="py-10 text-center text-gray-500 text-sm">No se encontraron lotes</div>\r
    } @else {\r
      <div class="space-y-3">\r
        @for (item of table_config().rows; track item.id) {\r
          <div\r
            class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm active:bg-gray-50"\r
            (click)="editProperty(item)">\r
            <div class="flex justify-between items-start gap-2 mb-3">\r
              <div class="min-w-0 flex-1">\r
                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">\r
                  {{ item.code }}\r
                </span>\r
                <h3 class="font-semibold text-gray-900 truncate mt-1.5">{{ item.name }}</h3>\r
                @if (item.block) {\r
                  <p class="text-xs text-gray-500 mt-0.5">Manzana {{ item.block }}</p>\r
                }\r
              </div>\r
              <span [class]="getStatusClass(item.status) + ' shrink-0'">\r
                {{ getStatusLabel(item.status) }}\r
              </span>\r
            </div>\r
\r
            <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">\r
              <div>\r
                <span class="text-xs text-gray-500 block">Proyecto</span>\r
                <span class="text-gray-900">{{ item.group?.name || '\u2014' }}</span>\r
              </div>\r
              <div>\r
                <span class="text-xs text-gray-500 block">Cliente</span>\r
                @if (hasOwner(item)) {\r
                  <span\r
                    class="text-blue-700 font-medium"\r
                    (click)="navigateToCustomer(item); $event.stopPropagation()">\r
                    {{ getOwnerName(item) }}\r
                  </span>\r
                } @else {\r
                  <span class="text-gray-400">\u2014</span>\r
                }\r
              </div>\r
              <div>\r
                <span class="text-xs text-gray-500 block">\xC1rea</span>\r
                <span class="text-gray-900">{{ item.total_area }} {{ item.measurement_unit?.symbol || 'm\xB2' }}</span>\r
              </div>\r
              <div>\r
                <span class="text-xs text-gray-500 block">Precio</span>\r
                <span class="text-gray-900 font-medium">{{ item.total_price | currency:item.currency }}</span>\r
              </div>\r
            </div>\r
\r
            <div class="mt-3 pt-3 border-t border-gray-100" (click)="$event.stopPropagation()">\r
              <app-button\r
                text="Ver Detalle"\r
                size="sm"\r
                [fullWidth]="true"\r
                custom_class="btn_primary"\r
                (clicked)="editProperty(item)"\r
                [icon]="ArrowRight">\r
              </app-button>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      @if ((table_config().totalResults ?? 0) > (table_config().limit ?? 20)) {\r
        <div class="mt-4 flex justify-center">\r
          <div class="flex items-center gap-2">\r
            <button\r
              type="button"\r
              [disabled]="table_config().page === 1"\r
              (click)="onPageChange({page: (table_config().page ?? 1) - 1, limit: table_config().limit ?? 20})"\r
              class="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 bg-white">\r
              Anterior\r
            </button>\r
            <span class="text-sm text-gray-600">\r
              {{ table_config().page }} / {{ Math.ceil((table_config().totalResults ?? 0) / (table_config().limit ?? 20)) }}\r
            </span>\r
            <button\r
              type="button"\r
              [disabled]="!table_config().hasNext"\r
              (click)="onPageChange({page: (table_config().page ?? 1) + 1, limit: table_config().limit ?? 20})"\r
              class="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 bg-white">\r
              Siguiente\r
            </button>\r
          </div>\r
        </div>\r
      }\r
    }\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">\r
      {{ item.code }}\r
    </span>\r
  </td>\r
  <td>{{ item.block || '\u2014' }}</td>\r
  <td>{{ item.name }}</td>\r
  <td>{{ item.group?.name || '\u2014' }}</td>\r
  <td (click)="$event.stopPropagation()">\r
    <div *ngIf="hasOwner(item); else noOwner">\r
      <span \r
        (click)="navigateToCustomer(item)"\r
        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap cursor-pointer hover:bg-blue-200 transition-colors">\r
        {{ getOwnerName(item) }}\r
      </span>\r
    </div>\r
    <ng-template #noOwner>\r
      <span class="text-sm text-gray-400">\u2014</span>\r
    </ng-template>\r
  </td>\r
  <td>{{ item.total_area }} {{ item.measurement_unit?.symbol || 'm\xB2' }}</td>\r
  <td>{{ item.total_price | currency:item.currency }}</td>\r
  <td>\r
    <span [class]="getStatusClass(item.status)">\r
      {{ getStatusLabel(item.status) }}\r
    </span>\r
  </td>\r
  <td (click)="$event.stopPropagation()">\r
    <app-button\r
      text="Detalle"\r
      size="sm"\r
      [fullWidth]="false"\r
      custom_class="btn_primary"\r
      (clicked)="editProperty(item)"\r
      [icon]="ArrowRight">\r
    </app-button>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/properties/pages/properties-list/properties-list.component.scss */\n/*# sourceMappingURL=properties-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: PropertyService }, { type: MatDialog }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PropertiesListComponent, { className: "PropertiesListComponent", filePath: "src/app/features/properties/pages/properties-list/properties-list.component.ts", lineNumber: 32 });
})();
export {
  PropertiesListComponent
};
//# sourceMappingURL=chunk-AG5O4URD.js.map
