import {
  CustomerEditModalComponent,
  CustomerGroupDropdownComponent
} from "./chunk-7NOV6VIM.js";
import {
  CustomerService
} from "./chunk-QRPNSPBU.js";
import {
  CUSTOMER_FORM_DIALOG_CONFIG
} from "./chunk-3AVDE4DA.js";
import "./chunk-RGTVHKC4.js";
import "./chunk-DJ4GYXTA.js";
import {
  SearchComponent
} from "./chunk-WBX2SF33.js";
import {
  DatatableWrapperComponent
} from "./chunk-L47FLSDR.js";
import {
  ButtonDirective,
  ButtonModule,
  PhoneComponent,
  TagModule
} from "./chunk-5U4UG5WF.js";
import "./chunk-QQ3ZUMFL.js";
import "./chunk-X6OR7TZF.js";
import {
  SelectComponent
} from "./chunk-L4EQ5WDD.js";
import "./chunk-AE2IM47J.js";
import "./chunk-YFLVEXO5.js";
import {
  MatDialog
} from "./chunk-AL73GUEM.js";
import "./chunk-GQ2LOQST.js";
import {
  FormsModule
} from "./chunk-HNVE2F7I.js";
import {
  ButtonComponent
} from "./chunk-B4R54IPF.js";
import "./chunk-CYJDZ4ZT.js";
import "./chunk-IP3VK3BQ.js";
import "./chunk-BMQ5UVGT.js";
import {
  ArrowRight
} from "./chunk-34Z4N5YB.js";
import "./chunk-B7UOHVOJ.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-55FJTJJ6.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-BMMLV6YT.js";
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
  ɵɵconditional,
  ɵɵconditionalCreate,
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
} from "./chunk-57S27ROJ.js";

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
var _forTrack0 = ($index, $item) => $item.id;
function CustomersList_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "Cargando clientes...");
    \u0275\u0275elementEnd();
  }
}
function CustomersList_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, "No se encontraron clientes");
    \u0275\u0275elementEnd();
  }
}
function CustomersList_Conditional_16_For_2_Conditional_22_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", item_r3.contracts.length - 1, " ");
  }
}
function CustomersList_Conditional_16_For_2_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, CustomersList_Conditional_16_For_2_Conditional_22_Conditional_3_Template, 2, 1, "span", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r3.contracts[0].property.code, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.contracts.length > 1 ? 3 : -1);
  }
}
function CustomersList_Conditional_16_For_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function CustomersList_Conditional_16_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275listener("click", function CustomersList_Conditional_16_For_2_Template_div_click_0_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.viewDetail(item_r3));
    });
    \u0275\u0275elementStart(1, "div", 20)(2, "div", 21)(3, "h3", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 25)(10, "div", 26)(11, "span", 27);
    \u0275\u0275text(12, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "app-phone", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "span", 27);
    \u0275\u0275text(16, "Grupo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 29);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "span", 27);
    \u0275\u0275text(21, "Lotes");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(22, CustomersList_Conditional_16_For_2_Conditional_22_Template, 4, 2, "div", 30)(23, CustomersList_Conditional_16_For_2_Conditional_23_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 26)(25, "span", 27);
    \u0275\u0275text(26, "Creado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 29);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 32);
    \u0275\u0275listener("click", function CustomersList_Conditional_16_For_2_Template_div_click_30_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(31, "app-button", 33);
    \u0275\u0275listener("clicked", function CustomersList_Conditional_16_For_2_Template_app_button_clicked_31_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.viewDetail(item_r3));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", item_r3.name, " ", item_r3.lastname);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (item_r3.status == null ? null : item_r3.status.name) || item_r3.status_id, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("phone", item_r3.phone)("countryCode", item_r3.phone_country)("countryPhoneCode", item_r3.phone_code);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((item_r3.group == null ? null : item_r3.group.name) || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(item_r3.contracts && item_r3.contracts.length > 0 ? 22 : 23);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(29, 12, item_r3.created_at, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275property("fullWidth", true)("icon", ctx_r3.ArrowRight);
  }
}
function CustomersList_Conditional_16_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 36)(2, "button", 37);
    \u0275\u0275listener("click", function CustomersList_Conditional_16_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onPageChange({ page: (ctx_r3.table_config().page ?? 1) - 1, limit: ctx_r3.table_config().limit ?? 20 }));
    });
    \u0275\u0275text(3, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 37);
    \u0275\u0275listener("click", function CustomersList_Conditional_16_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
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
function CustomersList_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, CustomersList_Conditional_16_For_2_Template, 32, 15, "div", 17, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, CustomersList_Conditional_16_Conditional_3_Template, 8, 4, "div", 18);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.table_config().rows);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((ctx_r3.table_config().totalResults ?? 0) > (ctx_r3.table_config().limit ?? 20) ? 3 : -1);
  }
}
function CustomersList_ng_template_17_div_10_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" +", item_r7.contracts.length - 1, " ");
  }
}
function CustomersList_ng_template_17_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "span", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CustomersList_ng_template_17_div_10_span_3_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r7.contracts[0].property.code, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r7.contracts.length > 1);
  }
}
function CustomersList_ng_template_17_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function CustomersList_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275element(6, "app-phone", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275template(10, CustomersList_ng_template_17_div_10_Template, 4, 2, "div", 39)(11, CustomersList_ng_template_17_ng_template_11_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 40);
    \u0275\u0275listener("click", function CustomersList_ng_template_17_Template_td_click_18_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(19, "div", 41)(20, "app-button", 42);
    \u0275\u0275listener("clicked", function CustomersList_ng_template_17_Template_app_button_clicked_20_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.viewDetail(item_r7));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const noLots_r8 = \u0275\u0275reference(12);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r7.name, " ", item_r7.lastname);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("phone", item_r7.phone)("countryCode", item_r7.phone_country)("countryPhoneCode", item_r7.phone_code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r7.group == null ? null : item_r7.group.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r7.contracts && item_r7.contracts.length > 0)("ngIfElse", noLots_r8);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((item_r7.status == null ? null : item_r7.status.name) || item_r7.status_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 13, item_r7.created_at, "mediumDate"));
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
  Math = Math;
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
    this.dialog.open(CustomerEditModalComponent, __spreadProps(__spreadValues({}, CUSTOMER_FORM_DIALOG_CONFIG), {
      data: { customer: null }
    })).afterClosed().subscribe((result) => {
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
  }, decls: 19, vars: 10, consts: [["tableTemplate", ""], ["noLots", ""], [1, "px-0", "sm:px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-xl", "sm:text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-col", "gap-3", "w-full", "md:w-auto"], [1, "flex", "flex-col", "sm:flex-row", "gap-3", "sm:items-center"], [1, "w-full", "sm:w-auto", 3, "groupSelect", "selectedGroupId"], [1, "w-full", "sm:w-auto", 3, "changeOption", "config"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "gap-3"], ["param_name", "search", 1, "w-full", "sm:w-64", 3, "searchChange", "param_activate"], ["text", "Crear Cliente", "custom_class", "btn_primary w-full sm:w-auto", 3, "click"], [3, "filterClear", "activeGroupId", "activeGroupName", "activeStatusFilter", "activeSearchTerm"], [1, "hidden", "md:block", 3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "block", "md:hidden"], [1, "py-10", "text-center", "text-gray-500", "text-sm"], [1, "space-y-3"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", "active:bg-gray-50"], [1, "mt-4", "flex", "justify-center"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", "active:bg-gray-50", 3, "click"], [1, "flex", "justify-between", "items-start", "gap-2", "mb-3"], [1, "min-w-0", "flex-1"], [1, "font-semibold", "text-gray-900", "truncate"], [1, "text-sm", "text-gray-500", "truncate", "mt-0.5"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-gray-100", "text-gray-700", "shrink-0"], [1, "grid", "grid-cols-2", "gap-x-4", "gap-y-2", "text-sm"], [1, "col-span-2"], [1, "text-xs", "text-gray-500", "block"], [3, "phone", "countryCode", "countryPhoneCode"], [1, "text-gray-900"], [1, "flex", "items-center", "gap-1.5", "flex-wrap"], [1, "text-gray-400"], [1, "mt-3", "pt-3", "border-t", "border-gray-100", 3, "click"], ["text", "Ver Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "inline-flex", "items-center", "px-2", "py-0.5", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded-full", "text-xs", "font-medium", "bg-indigo-100", "text-indigo-800"], [1, "flex", "items-center", "gap-2"], ["type", "button", 1, "px-3", "py-1.5", "text-sm", "border", "rounded-lg", "disabled:opacity-50", "bg-white", 3, "click", "disabled"], [1, "text-sm", "text-gray-600"], ["class", "flex items-center gap-1.5", 4, "ngIf", "ngIfElse"], [3, "click"], [1, "flex", "gap-2"], ["text", "Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "flex", "items-center", "gap-1.5"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "whitespace-nowrap"], ["class", "inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800", 4, "ngIf"], [1, "text-sm", "text-gray-400"]], template: function CustomersList_Template(rf, ctx) {
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
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 14);
      \u0275\u0275conditionalCreate(14, CustomersList_Conditional_14_Template, 2, 0, "div", 15)(15, CustomersList_Conditional_15_Template, 2, 0, "div", 15)(16, CustomersList_Conditional_16_Template, 4, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(17, CustomersList_ng_template_17_Template, 21, 16, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_10_0;
      const tableTemplate_r9 = \u0275\u0275reference(18);
      \u0275\u0275advance(6);
      \u0275\u0275property("selectedGroupId", ctx.selectedGroupId);
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance(2);
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("activeGroupId", ctx.selectedGroupId)("activeGroupName", ctx.selectedGroupName)("activeStatusFilter", ctx.selectedStatusId)("activeSearchTerm", ctx.search);
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r9);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.table_config().loading ? 14 : !((tmp_10_0 = ctx.table_config().rows) == null ? null : tmp_10_0.length) ? 15 : 16);
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
    args: [{ selector: "app-customers-list", standalone: true, imports: [
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
    ], template: `<div class="px-0 sm:px-4 pb-6">\r
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Clientes</h2>\r
  \r
      <div class="flex flex-col gap-3 w-full md:w-auto">\r
        <div class="flex flex-col sm:flex-row gap-3 sm:items-center">\r
          <app-customer-group-dropdown\r
            class="w-full sm:w-auto"\r
            [selectedGroupId]="selectedGroupId"\r
            (groupSelect)="onGroupSelect($event)">\r
          </app-customer-group-dropdown>\r
\r
          <app-select\r
            class="w-full sm:w-auto"\r
            [config]="statusSelectConfig"\r
            (changeOption)="onStatusSelect($event)">\r
          </app-select>\r
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
            text="Crear Cliente"\r
            custom_class="btn_primary w-full sm:w-auto"\r
            (click)="createCustomer()">\r
          </app-button>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <app-customer-filter-indicator\r
      [activeGroupId]="selectedGroupId"\r
      [activeGroupName]="selectedGroupName"\r
      [activeStatusFilter]="selectedStatusId"\r
      [activeSearchTerm]="search"\r
      (filterClear)="onFilterClear($event)">\r
    </app-customer-filter-indicator>\r
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
        <div class="py-10 text-center text-gray-500 text-sm">Cargando clientes...</div>\r
      } @else if (!table_config().rows?.length) {\r
        <div class="py-10 text-center text-gray-500 text-sm">No se encontraron clientes</div>\r
      } @else {\r
        <div class="space-y-3">\r
          @for (item of table_config().rows; track item.id) {\r
            <div\r
              class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm active:bg-gray-50"\r
              (click)="viewDetail(item)">\r
              <div class="flex justify-between items-start gap-2 mb-3">\r
                <div class="min-w-0 flex-1">\r
                  <h3 class="font-semibold text-gray-900 truncate">{{ item.name }} {{ item.lastname }}</h3>\r
                  <p class="text-sm text-gray-500 truncate mt-0.5">{{ item.email }}</p>\r
                </div>\r
                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 shrink-0">\r
                  {{ item.status?.name || item.status_id }}\r
                </span>\r
              </div>\r
\r
              <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">\r
                <div class="col-span-2">\r
                  <span class="text-xs text-gray-500 block">Tel\xE9fono</span>\r
                  <app-phone\r
                    [phone]="item.phone"\r
                    [countryCode]="item.phone_country"\r
                    [countryPhoneCode]="item.phone_code">\r
                  </app-phone>\r
                </div>\r
                <div>\r
                  <span class="text-xs text-gray-500 block">Grupo</span>\r
                  <span class="text-gray-900">{{ item.group?.name || '\u2014' }}</span>\r
                </div>\r
                <div>\r
                  <span class="text-xs text-gray-500 block">Lotes</span>\r
                  @if (item.contracts && item.contracts.length > 0) {\r
                    <div class="flex items-center gap-1.5 flex-wrap">\r
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">\r
                        {{ item.contracts[0].property.code }}\r
                      </span>\r
                      @if (item.contracts.length > 1) {\r
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">\r
                          +{{ item.contracts.length - 1 }}\r
                        </span>\r
                      }\r
                    </div>\r
                  } @else {\r
                    <span class="text-gray-400">\u2014</span>\r
                  }\r
                </div>\r
                <div class="col-span-2">\r
                  <span class="text-xs text-gray-500 block">Creado</span>\r
                  <span class="text-gray-900">{{ item.created_at | date:'mediumDate' }}</span>\r
                </div>\r
              </div>\r
\r
              <div class="mt-3 pt-3 border-t border-gray-100" (click)="$event.stopPropagation()">\r
                <app-button\r
                  text="Ver Detalle"\r
                  size="sm"\r
                  [fullWidth]="true"\r
                  custom_class="btn_primary"\r
                  (clicked)="viewDetail(item)"\r
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
  </ng-template>\r
`, styles: ["/* src/app/features/customers/pages/customers-list/customers-list.scss */\n:host {\n  display: block;\n  background-color: transparent;\n}\n.px-4 {\n  background-color: transparent;\n}\n.status-select {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  background-color: white;\n  cursor: pointer;\n  transition: border-color 0.2s ease;\n  min-width: 200px;\n}\n.status-select:hover {\n  border-color: #9ca3af;\n}\n.status-select:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.status-select:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n@media (max-width: 767px) {\n  .status-select {\n    width: 100%;\n    min-width: auto;\n  }\n}\n/*# sourceMappingURL=customers-list.css.map */\n"] }]
  }], () => [{ type: Router }, { type: CustomerService }, { type: ActivatedRoute }, { type: MatDialog }, { type: FilterStateService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomersList, { className: "CustomersList", filePath: "src/app/features/customers/pages/customers-list/customers-list.ts", lineNumber: 44 });
})();
export {
  CustomersList
};
//# sourceMappingURL=chunk-BUOY6QGV.js.map
