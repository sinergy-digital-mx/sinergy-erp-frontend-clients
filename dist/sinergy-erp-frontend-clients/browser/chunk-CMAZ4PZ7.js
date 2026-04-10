import {
  CustomerEditModalComponent,
  CustomerGroupDropdownComponent
} from "./chunk-XGVGRBFF.js";
import {
  CustomerService
} from "./chunk-EFTXQRRM.js";
import {
  SearchComponent
} from "./chunk-B3LR2PTH.js";
import {
  DatatableWrapperComponent
} from "./chunk-QW7YUBWU.js";
import {
  PhoneComponent,
  TagModule
} from "./chunk-RBESK2KT.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-LYQXEO3O.js";
import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import "./chunk-X6ESXIRL.js";
import "./chunk-K22JBEUE.js";
import "./chunk-Y4MZBWJH.js";
import "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import "./chunk-OC6N764R.js";
import {
  ArrowRight
} from "./chunk-XYBC4MWB.js";
import "./chunk-KNFYVOET.js";
import {
  MatDialog
} from "./chunk-OO2OLRGJ.js";
import {
  FormsModule
} from "./chunk-TXPVZZCM.js";
import "./chunk-2BSLK6RD.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  BehaviorSubject,
  Component,
  EventEmitter,
  Injectable,
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
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

// src/app/features/customers/components/filter-indicator/filter-indicator.component.ts
function FilterIndicatorComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 8);
    \u0275\u0275listener("click", function FilterIndicatorComponent_div_0_div_5_Template_button_click_4_listener() {
      const filter_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.clearFilter(filter_r3.type));
    });
    \u0275\u0275element(5, "i", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const filter_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("pi " + ctx_r3.getFilterIcon(filter_r3.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(filter_r3.label);
  }
}
function FilterIndicatorComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "span", 3);
    \u0275\u0275text(3, "Filtros activos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275template(5, FilterIndicatorComponent_div_0_div_5_Template, 6, 3, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function FilterIndicatorComponent_div_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearAllFilters());
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r3.activeFilters);
  }
}
var FilterIndicatorComponent = class _FilterIndicatorComponent {
  activeStatusFilter = null;
  activeGroupId = null;
  activeGroupName = null;
  activeSearchTerm = null;
  filterClear = new EventEmitter();
  activeFilters = [];
  ngOnChanges() {
    this.updateActiveFilters();
  }
  /**
   * Update the list of active filters
   */
  updateActiveFilters() {
    this.activeFilters = [];
    if (this.activeStatusFilter) {
      this.activeFilters.push({
        type: "status",
        value: this.activeStatusFilter,
        label: `Estado: ${this.activeStatusFilter}`
      });
    }
    if (this.activeGroupId && this.activeGroupName) {
      this.activeFilters.push({
        type: "group",
        value: this.activeGroupId,
        label: `Grupo: ${this.activeGroupName}`
      });
    }
    if (this.activeSearchTerm) {
      this.activeFilters.push({
        type: "search",
        value: this.activeSearchTerm,
        label: `B\xFAsqueda: ${this.activeSearchTerm}`
      });
    }
  }
  /**
   * Check if there are any active filters
   */
  hasActiveFilters() {
    return this.activeFilters.length > 0;
  }
  /**
   * Clear a specific filter
   */
  clearFilter(filterType) {
    this.filterClear.emit(filterType);
  }
  /**
   * Clear all filters
   */
  clearAllFilters() {
    this.filterClear.emit("all");
  }
  /**
   * Get the icon for a filter type
   */
  getFilterIcon(filterType) {
    switch (filterType) {
      case "status":
        return "pi-filter";
      case "group":
        return "pi-tag";
      case "search":
        return "pi-search";
      default:
        return "pi-filter";
    }
  }
  static \u0275fac = function FilterIndicatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FilterIndicatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FilterIndicatorComponent, selectors: [["app-customer-filter-indicator"]], inputs: { activeStatusFilter: "activeStatusFilter", activeGroupId: "activeGroupId", activeGroupName: "activeGroupName", activeSearchTerm: "activeSearchTerm" }, outputs: { filterClear: "filterClear" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "filter-indicator", 4, "ngIf"], [1, "filter-indicator"], [1, "filters-container"], [1, "filters-label"], [1, "filter-chips"], ["class", "filter-chip", 4, "ngFor", "ngForOf"], ["type", "button", "pButton", "", "label", "Limpiar todos", 1, "p-button-sm", "p-button-text", 3, "click"], [1, "filter-chip"], ["type", "button", "title", "Limpiar filtro", 1, "remove-btn", 3, "click"], [1, "pi", "pi-times"]], template: function FilterIndicatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, FilterIndicatorComponent_div_0_Template, 7, 1, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.hasActiveFilters());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ButtonModule, ButtonDirective], styles: ["\n\n.filter-indicator[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filters-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1e40af;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  border: 1px solid #3b82f6;\n  border-radius: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  color: #1e40af;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #1e40af;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  transition: color 0.2s ease;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .clear-all-btn[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n@media (max-width: 767px) {\n  .filter-indicator[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filters-label[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=filter-indicator.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterIndicatorComponent, [{
    type: Component,
    args: [{ selector: "app-customer-filter-indicator", standalone: true, imports: [CommonModule, ButtonModule], template: `<div *ngIf="hasActiveFilters()" class="filter-indicator">
  <div class="filters-container">
    <span class="filters-label">Filtros activos:</span>
    <div class="filter-chips">
      <div *ngFor="let filter of activeFilters" class="filter-chip">
        <i [class]="'pi ' + getFilterIcon(filter.type)"></i>
        <span>{{ filter.label }}</span>
        <button 
          type="button"
          class="remove-btn"
          (click)="clearFilter(filter.type)"
          title="Limpiar filtro">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
    <button 
      type="button"
      class="clear-all-btn"
      (click)="clearAllFilters()"
      pButton
      label="Limpiar todos"
      class="p-button-sm p-button-text">
    </button>
  </div>
</div>`, styles: ["/* angular:styles/component:scss;5eafe1f49632f40ef030e9f3893b4585823f916072e39b713d6bd8d40ec593aa;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/customers/components/filter-indicator/filter-indicator.component.ts */\n.filter-indicator {\n  background-color: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.filter-indicator .filters-container {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.filter-indicator .filters-container .filters-label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1e40af;\n}\n.filter-indicator .filters-container .filter-chips {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  border: 1px solid #3b82f6;\n  border-radius: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  color: #1e40af;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip i {\n  font-size: 0.75rem;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn {\n  background: none;\n  border: none;\n  color: #1e40af;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  transition: color 0.2s ease;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn:hover {\n  color: #dc2626;\n}\n.filter-indicator .filters-container .clear-all-btn {\n  margin-left: auto;\n}\n@media (max-width: 767px) {\n  .filter-indicator {\n    padding: 0.75rem;\n  }\n  .filter-indicator .filters-container {\n    gap: 0.5rem;\n  }\n  .filter-indicator .filters-container .filters-label {\n    font-size: 0.8125rem;\n  }\n  .filter-indicator .filters-container .filter-chips .filter-chip {\n    font-size: 0.8125rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=filter-indicator.component.css.map */\n"] }]
  }], null, { activeStatusFilter: [{
    type: Input
  }], activeGroupId: [{
    type: Input
  }], activeGroupName: [{
    type: Input
  }], activeSearchTerm: [{
    type: Input
  }], filterClear: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FilterIndicatorComponent, { className: "FilterIndicatorComponent", filePath: "src/app/features/customers/components/filter-indicator/filter-indicator.component.ts", lineNumber: 126 });
})();

// src/app/features/customers/services/filter-state.service.ts
var FilterStateService = class _FilterStateService {
  initialState = {
    groupId: null,
    groupName: null,
    searchTerm: null,
    statusId: null,
    page: 1,
    limit: 20
  };
  filterStateSubject = new BehaviorSubject(this.initialState);
  filterState$ = this.filterStateSubject.asObservable();
  constructor() {
  }
  /**
   * Get current filter state
   */
  getFilterState() {
    return this.filterStateSubject.value;
  }
  /**
   * Set group filter
   */
  setGroupFilter(groupId, groupName) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next(__spreadProps(__spreadValues({}, currentState), {
      groupId,
      groupName,
      page: 1
      // Reset to page 1 when filter changes
    }));
  }
  /**
   * Set search filter
   */
  setSearchFilter(searchTerm) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next(__spreadProps(__spreadValues({}, currentState), {
      searchTerm,
      page: 1
      // Reset to page 1 when filter changes
    }));
  }
  /**
   * Set status filter
   */
  setStatusFilter(statusId) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next(__spreadProps(__spreadValues({}, currentState), {
      statusId,
      page: 1
      // Reset to page 1 when filter changes
    }));
  }
  /**
   * Set pagination
   */
  setPagination(page, limit) {
    const currentState = this.filterStateSubject.value;
    this.filterStateSubject.next(__spreadProps(__spreadValues({}, currentState), {
      page,
      limit
    }));
  }
  /**
   * Clear specific filter
   */
  clearFilter(filterType) {
    const currentState = this.filterStateSubject.value;
    const newState = __spreadProps(__spreadValues({}, currentState), { page: 1 });
    switch (filterType) {
      case "group":
        newState.groupId = null;
        newState.groupName = null;
        break;
      case "search":
        newState.searchTerm = null;
        break;
      case "status":
        newState.statusId = null;
        break;
    }
    this.filterStateSubject.next(newState);
  }
  /**
   * Clear all filters
   */
  clearAllFilters() {
    this.filterStateSubject.next(this.initialState);
  }
  /**
   * Reset to initial state
   */
  reset() {
    this.filterStateSubject.next(this.initialState);
  }
  static \u0275fac = function FilterStateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FilterStateService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FilterStateService, factory: _FilterStateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterStateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/features/customers/pages/customers-list/customers-list.ts
var _c0 = ["tableTemplate"];
function CustomersList_ng_template_13_div_10_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", item_r3.contracts.length - 1, " ");
  }
}
function CustomersList_ng_template_13_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CustomersList_ng_template_13_div_10_span_3_Template, 2, 1, "span", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r3.contracts[0].property.code, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r3.contracts.length > 1);
  }
}
function CustomersList_ng_template_13_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function CustomersList_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275element(6, "app-phone", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275template(10, CustomersList_ng_template_13_div_10_Template, 4, 2, "div", 15)(11, CustomersList_ng_template_13_ng_template_11_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 16);
    \u0275\u0275listener("click", function CustomersList_ng_template_13_Template_td_click_18_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(19, "div", 17)(20, "app-button", 18);
    \u0275\u0275listener("clicked", function CustomersList_ng_template_13_Template_app_button_clicked_20_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.viewDetail(item_r3));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const noLots_r5 = \u0275\u0275reference(12);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r3.name, " ", item_r3.lastname);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("phone", item_r3.phone)("countryCode", item_r3.phone_country)("countryPhoneCode", item_r3.phone_code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r3.group == null ? null : item_r3.group.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r3.contracts && item_r3.contracts.length > 0)("ngIfElse", noLots_r5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((item_r3.status == null ? null : item_r3.status.name) || item_r3.status_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 13, item_r3.created_at, "mediumDate"));
    \u0275\u0275advance(4);
    \u0275\u0275property("fullWidth", false)("icon", ctx_r3.ArrowRight);
  }
}
var CustomersList = class _CustomersList {
  router;
  customer_service;
  route;
  dialog;
  filterStateService;
  tableTemplate;
  table_config = signal({
    rows: [],
    columns: [
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true },
      { name: "Email", prop: "email", sortable: true, canAutoResize: true },
      { name: "Tel\xE9fono", prop: "phone", sortable: true, canAutoResize: true },
      { name: "Grupo", prop: "group_id", sortable: true, canAutoResize: true },
      { name: "Lotes", prop: "contracts", sortable: false, canAutoResize: true },
      { name: "Estado", prop: "status", sortable: true, canAutoResize: true },
      { name: "Creado", prop: "created_at", sortable: true, canAutoResize: true },
      { name: "Acciones", prop: "actions", sortable: false, canAutoResize: true }
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron clientes" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  ArrowRight = ArrowRight;
  search = "";
  selectedGroupId = null;
  selectedGroupName = null;
  selectedStatusId = null;
  currentSort = null;
  destroy$ = new Subject();
  lastQueryParams = "";
  statusSelectConfig = {
    placeholder: "Filtrar por estado",
    data: [
      { id: "active", name: "Activo" },
      { id: "inactive", name: "Inactivo" }
    ],
    value: null,
    option: "name",
    all: true,
    all_message: "Ver Todos"
  };
  constructor(router, customer_service, route, dialog, filterStateService) {
    this.router = router;
    this.customer_service = customer_service;
    this.route = route;
    this.dialog = dialog;
    this.filterStateService = filterStateService;
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;
      this.search = query?.search ?? "";
      this.selectedGroupId = query?.group_id ?? null;
      this.selectedStatusId = query?.status_id ?? null;
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit
      }));
      this.getCustomers();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getCustomers() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const config = this.table_config();
    const page = isNaN(config.page) ? 1 : config.page;
    const limit = isNaN(config.limit) ? 20 : config.limit;
    let data = __spreadValues(__spreadValues(__spreadValues(__spreadValues({
      page,
      limit
    }, this.search && { search: this.search }), this.selectedGroupId && { group_id: this.selectedGroupId }), this.selectedStatusId && { status_id: this.selectedStatusId }), this.currentSort && this.currentSort.direction && { sort: this.currentSort.column.prop, order: this.currentSort.direction });
    this.customer_service.getCustomers(data).subscribe((res) => {
      console.log("Customers with contracts:", res?.data?.map((c) => ({
        name: c.name,
        contractsCount: c.contracts?.length || 0,
        contracts: c.contracts
      })));
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        rows: res?.data ?? [],
        totalResults: res?.total ?? 0,
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
        group_id: this.selectedGroupId || void 0,
        status_id: this.selectedStatusId || void 0
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
        group_id: this.selectedGroupId || void 0,
        status_id: this.selectedStatusId || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onRowClick(event) {
    this.viewDetail(event.data);
  }
  onGroupSelect(event) {
    this.selectedGroupId = event.groupId;
    this.selectedGroupName = event.groupName;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        group_id: event.groupId || void 0,
        search: this.search || void 0,
        status_id: this.selectedStatusId || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onStatusSelect(event) {
    const statusId = event?.value || null;
    this.selectedStatusId = statusId;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        status_id: statusId || void 0,
        search: this.search || void 0,
        group_id: this.selectedGroupId || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onFilterClear(filterType) {
    if (filterType === "all") {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
      this.selectedStatusId = null;
      this.search = "";
    } else if (filterType === "group") {
      this.selectedGroupId = null;
      this.selectedGroupName = null;
    } else if (filterType === "status") {
      this.selectedStatusId = null;
    } else if (filterType === "search") {
      this.search = "";
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: this.search || void 0,
        group_id: this.selectedGroupId || void 0,
        status_id: this.selectedStatusId || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || void 0,
        group_id: this.selectedGroupId || void 0,
        status_id: this.selectedStatusId || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  editCustomer(customer) {
  }
  createCustomer() {
    this.dialog.open(CustomerEditModalComponent, {
      data: { customer: null },
      width: "500px"
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getCustomers();
      }
    });
  }
  getSeverity(status) {
    switch (status) {
      case "Al corriente":
        return "success";
      case "Atrasado":
        return "danger";
      case "Sin iniciar":
        return "info";
      default:
        return "warn";
    }
  }
  viewDetail(row) {
    this.router.navigate(["/customers/detail", row.id]);
  }
  getFirstLotCode(customer) {
    if (!customer.contracts || customer.contracts.length === 0) {
      return "\u2014";
    }
    return customer.contracts[0].property.code;
  }
  getAdditionalLotsCount(customer) {
    if (!customer.contracts || customer.contracts.length <= 1) {
      return 0;
    }
    return customer.contracts.length - 1;
  }
  hasMultipleLots(customer) {
    return (customer.contracts?.length || 0) > 1;
  }
  static \u0275fac = function CustomersList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomersList)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(FilterStateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomersList, selectors: [["app-customers-list"]], viewQuery: function CustomersList_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 15, vars: 9, consts: [["tableTemplate", ""], ["noLots", ""], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-end"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center"], [3, "groupSelect", "selectedGroupId"], [3, "changeOption", "config"], [1, "flex", "items-center", "gap-3"], ["param_name", "search", 1, "w-64", 3, "searchChange", "param_activate"], ["text", "Crear Cliente", "custom_class", "btn_primary", 3, "click"], [3, "filterClear", "activeGroupId", "activeGroupName", "activeStatusFilter", "activeSearchTerm"], [3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [3, "phone", "countryCode", "countryPhoneCode"], ["class", "flex items-center gap-1.5", 4, "ngIf", "ngIfElse"], [3, "click"], [1, "flex", "gap-2"], ["text", "Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "flex", "items-center", "gap-1.5"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "whitespace-nowrap"], ["class", "inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800", 4, "ngIf"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded-full", "text-xs", "font-medium", "bg-indigo-100", "text-indigo-800"], [1, "text-sm", "text-gray-400"]], template: function CustomersList_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2", 4);
      \u0275\u0275text(3, "Clientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "app-customer-group-dropdown", 7);
      \u0275\u0275listener("groupSelect", function CustomersList_Template_app_customer_group_dropdown_groupSelect_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onGroupSelect($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "app-select", 8);
      \u0275\u0275listener("changeOption", function CustomersList_Template_app_select_changeOption_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onStatusSelect($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 9)(9, "app-search", 10);
      \u0275\u0275listener("searchChange", function CustomersList_Template_app_search_searchChange_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "app-button", 11);
      \u0275\u0275listener("click", function CustomersList_Template_app_button_click_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createCustomer());
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(11, "app-customer-filter-indicator", 12);
      \u0275\u0275listener("filterClear", function CustomersList_Template_app_customer_filter_indicator_filterClear_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterClear($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "app-datatable-wrapper", 13);
      \u0275\u0275listener("pageChange", function CustomersList_Template_app_datatable_wrapper_pageChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function CustomersList_Template_app_datatable_wrapper_sortChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function CustomersList_Template_app_datatable_wrapper_rowClick_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onRowClick($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(13, CustomersList_ng_template_13_Template, 21, 16, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r6 = \u0275\u0275reference(14);
      \u0275\u0275advance(6);
      \u0275\u0275property("selectedGroupId", ctx.selectedGroupId);
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance(2);
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("activeGroupId", ctx.selectedGroupId)("activeGroupName", ctx.selectedGroupName)("activeStatusFilter", ctx.selectedStatusId)("activeSearchTerm", ctx.search);
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r6);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    FormsModule,
    TagModule,
    ButtonModule,
    SearchComponent,
    ButtonComponent,
    SelectComponent,
    DatatableWrapperComponent,
    CustomerGroupDropdownComponent,
    FilterIndicatorComponent,
    PhoneComponent,
    DatePipe
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background-color: transparent;\n}\n.px-4[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n.status-select[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  background-color: white;\n  cursor: pointer;\n  transition: border-color 0.2s ease;\n  min-width: 200px;\n}\n.status-select[_ngcontent-%COMP%]:hover {\n  border-color: #9ca3af;\n}\n.status-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.status-select[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n@media (max-width: 767px) {\n  .status-select[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: auto;\n  }\n}\n/*# sourceMappingURL=customers-list.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomersList, [{
    type: Component,
    args: [{ selector: "app-customers-list", imports: [
      CommonModule,
      FormsModule,
      TagModule,
      ButtonModule,
      SearchComponent,
      ButtonComponent,
      SelectComponent,
      DatatableWrapperComponent,
      CustomerGroupDropdownComponent,
      FilterIndicatorComponent,
      PhoneComponent
    ], template: `<div class="px-4">\r
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
      <h2 class="text-2xl font-semibold text-gray-800">Clientes</h2>\r
  \r
      <!-- Right side: Filters + Search + Button -->\r
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">\r
        <!-- Filters -->\r
        <div class="flex flex-col gap-3 md:flex-row md:items-center">\r
          <app-customer-group-dropdown\r
            [selectedGroupId]="selectedGroupId"\r
            (groupSelect)="onGroupSelect($event)">\r
          </app-customer-group-dropdown>\r
\r
          <app-select\r
            [config]="statusSelectConfig"\r
            (changeOption)="onStatusSelect($event)">\r
          </app-select>\r
        </div>\r
\r
        <!-- Search + Button -->\r
        <div class="flex items-center gap-3">\r
          <app-search\r
            class="w-64"\r
            [param_activate]="true"\r
            param_name="search"\r
            (searchChange)="onSearchChange($event)">\r
          </app-search>\r
    \r
          <app-button\r
            text="Crear Cliente"\r
            custom_class="btn_primary"\r
            (click)="createCustomer()">\r
          </app-button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Filter Indicator -->\r
    <app-customer-filter-indicator\r
      [activeGroupId]="selectedGroupId"\r
      [activeGroupName]="selectedGroupName"\r
      [activeStatusFilter]="selectedStatusId"\r
      [activeSearchTerm]="search"\r
      (filterClear)="onFilterClear($event)">\r
    </app-customer-filter-indicator>\r
  \r
    <app-datatable-wrapper\r
      [config]="table_config()"\r
      [rowTemplate]="tableTemplate"\r
      (pageChange)="onPageChange($event)"\r
      (sortChange)="onSortChange($event)"\r
      (rowClick)="onRowClick($event)">\r
    </app-datatable-wrapper>\r
  </div>\r
  \r
  <ng-template #tableTemplate let-item="$implicit" let-rowIndex="rowIndex">\r
    <td><p>{{ item.name }} {{ item.lastname }}</p></td>\r
    <td>{{ item.email }}</td>\r
    <td>\r
      <app-phone \r
        [phone]="item.phone"\r
        [countryCode]="item.phone_country"\r
        [countryPhoneCode]="item.phone_code">\r
      </app-phone>\r
    </td>\r
    <td>{{ item.group?.name || '\u2014' }}</td>\r
    <td>\r
      <div *ngIf="item.contracts && item.contracts.length > 0; else noLots" class="flex items-center gap-1.5">\r
        <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">\r
          {{ item.contracts[0].property.code }}\r
        </span>\r
        <span *ngIf="item.contracts.length > 1" class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">\r
          +{{ item.contracts.length - 1 }}\r
        </span>\r
      </div>\r
      <ng-template #noLots>\r
        <span class="text-sm text-gray-400">\u2014</span>\r
      </ng-template>\r
    </td>\r
    <td>{{ item.status?.name || item.status_id }}</td>\r
    <td>{{ item.created_at | date:'mediumDate' }}</td>\r
    <td (click)="$event.stopPropagation()">\r
      <div class="flex gap-2">\r
        <app-button\r
          text="Detalle"\r
          size="sm"\r
          [fullWidth]="false"\r
          custom_class="btn_primary"\r
          (clicked)="viewDetail(item)"\r
          [icon]="ArrowRight">\r
        </app-button>\r
      </div>\r
    </td>\r
  </ng-template>`, styles: ["/* src/app/features/customers/pages/customers-list/customers-list.scss */\n:host {\n  display: block;\n  background-color: transparent;\n}\n.px-4 {\n  background-color: transparent;\n}\n.status-select {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  background-color: white;\n  cursor: pointer;\n  transition: border-color 0.2s ease;\n  min-width: 200px;\n}\n.status-select:hover {\n  border-color: #9ca3af;\n}\n.status-select:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.status-select:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n@media (max-width: 767px) {\n  .status-select {\n    width: 100%;\n    min-width: auto;\n  }\n}\n/*# sourceMappingURL=customers-list.css.map */\n"] }]
  }], () => [{ type: Router }, { type: CustomerService }, { type: ActivatedRoute }, { type: MatDialog }, { type: FilterStateService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomersList, { className: "CustomersList", filePath: "src/app/features/customers/pages/customers-list/customers-list.ts", lineNumber: 42 });
})();
export {
  CustomersList
};
//# sourceMappingURL=chunk-CMAZ4PZ7.js.map
