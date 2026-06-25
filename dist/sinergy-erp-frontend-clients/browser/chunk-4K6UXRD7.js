import {
  OrderDetailDialogComponent
} from "./chunk-VWV7BZEX.js";
import "./chunk-MQ5Y3HZD.js";
import {
  PurchaseOrderService
} from "./chunk-YKFNHCNP.js";
import {
  ORDER_DETAIL_DIALOG_OPTIONS
} from "./chunk-ZHDS4KUW.js";
import {
  TaxCalculatorService
} from "./chunk-Q6XV4LBU.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-USX6PO66.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "./chunk-453EK7KR.js";
import "./chunk-5WWJICGM.js";
import {
  VendorService
} from "./chunk-EHKCKUPD.js";
import "./chunk-WDAA42IK.js";
import "./chunk-CQ4BUXG7.js";
import {
  FiscalConfigurationService
} from "./chunk-CEL5SWQJ.js";
import {
  takeUntilDestroyed
} from "./chunk-QDDAYZVY.js";
import "./chunk-KTMOHJXS.js";
import "./chunk-F65OR5PH.js";
import "./chunk-VC2XUF46.js";
import "./chunk-KYMIAXQ3.js";
import "./chunk-3YDE66GB.js";
import "./chunk-O7LFISSX.js";
import "./chunk-XPSKNRZU.js";
import "./chunk-4VG5IEU6.js";
import "./chunk-3BJZNAHA.js";
import "./chunk-EUPOEI4B.js";
import "./chunk-K6DFM2KE.js";
import "./chunk-EQHNMCLE.js";
import {
  TabComponent
} from "./chunk-M65YKY4W.js";
import {
  WarehouseService
} from "./chunk-MBXKGEVM.js";
import {
  DatatableWrapperComponent
} from "./chunk-DLRREEDR.js";
import "./chunk-DFLPJ3H7.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-C44BBKV6.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-EF42XV6X.js";
import "./chunk-ZZJV4WZP.js";
import "./chunk-M5WQFRJQ.js";
import {
  ToastService
} from "./chunk-OP2NIPTP.js";
import "./chunk-S7ZTNTNE.js";
import "./chunk-EBDBUXLH.js";
import "./chunk-7QZ6JYNG.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-524KR27D.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-MNFUR22A.js";
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  Subject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  computed,
  debounceTime,
  distinctUntilChanged,
  inject,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-CJAGDKD4.js";

// src/app/features/purchase-orders/components/filter-bar/filter-bar.component.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function FilterBarComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    \u0275\u0275property("value", option_r1.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r1.label);
  }
}
function FilterBarComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "input", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 2);
    \u0275\u0275element(3, "input", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formControl", ctx_r1.dateFromControl);
    \u0275\u0275advance(2);
    \u0275\u0275property("formControl", ctx_r1.dateToControl);
  }
}
function FilterBarComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    \u0275\u0275property("value", option_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r3.label);
  }
}
function FilterBarComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r4 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(warehouse_r4.name);
  }
}
function FilterBarComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "button", 11);
    \u0275\u0275listener("click", function FilterBarComponent_Conditional_23_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 12);
    \u0275\u0275element(3, "path", 13)(4, "path", 14);
    \u0275\u0275elementEnd()()();
  }
}
var FilterBarComponent = class _FilterBarComponent {
  warehouses = [];
  /** Sincroniza el campo búsqueda con la URL o el listado (p. ej. ?search=uuid tras editar). */
  initialSearch = null;
  filtersChange = new EventEmitter();
  // Form controls
  searchControl = new FormControl("", { nonNullable: true });
  dateRangeControl = new FormControl("", { nonNullable: true });
  dateFromControl = new FormControl("", { nonNullable: true });
  dateToControl = new FormControl("", { nonNullable: true });
  statusControl = new FormControl(null);
  warehouseControl = new FormControl(null);
  // Date range options
  dateRangeOptions = [
    { label: "Hoy", value: "today" },
    { label: "Semana", value: "week" },
    { label: "Mes", value: "month" },
    { label: "Rango", value: "range" }
  ];
  showCustomDateRange = false;
  // Status options
  statusOptions = [
    { label: "En Proceso", value: "En Proceso" },
    { label: "Recibida", value: "Recibida" },
    { label: "Cancelada", value: "Cancelada" }
  ];
  destroy$ = new Subject();
  get hasActiveFilters() {
    return Boolean(this.searchControl.value.trim() || this.dateRangeControl.value || this.dateFromControl.value || this.dateToControl.value || this.statusControl.value || this.warehouseControl.value);
  }
  ngOnChanges(changes) {
    if (!changes["initialSearch"]) {
      return;
    }
    const v = (this.initialSearch ?? "").trim();
    if (this.searchControl.value !== v) {
      this.searchControl.setValue(v, { emitEvent: false });
    }
  }
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.dateRangeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => this.onDateRangeChange(value));
    this.dateFromControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.dateToControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.statusControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.warehouseControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
  }
  onDateRangeChange(value) {
    const today = /* @__PURE__ */ new Date();
    let dateFrom = null;
    let dateTo = null;
    switch (value) {
      case "today":
        dateFrom = new Date(today.setHours(0, 0, 0, 0));
        dateTo = new Date(today.setHours(23, 59, 59, 999));
        this.showCustomDateRange = false;
        break;
      case "week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        dateFrom = weekStart;
        dateTo = /* @__PURE__ */ new Date();
        this.showCustomDateRange = false;
        break;
      case "month":
        dateFrom = new Date(today.getFullYear(), today.getMonth(), 1);
        dateTo = /* @__PURE__ */ new Date();
        this.showCustomDateRange = false;
        break;
      case "range":
        this.showCustomDateRange = true;
        return;
      default:
        this.showCustomDateRange = false;
        break;
    }
    if (dateFrom && dateTo && !this.showCustomDateRange) {
      this.dateFromControl.setValue(this.formatDateForInput(dateFrom), { emitEvent: false });
      this.dateToControl.setValue(this.formatDateForInput(dateTo), { emitEvent: false });
      this.emitFilters();
    }
  }
  formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  clearFilters() {
    this.searchControl.setValue("", { emitEvent: false });
    this.dateRangeControl.setValue("", { emitEvent: false });
    this.dateFromControl.setValue("", { emitEvent: false });
    this.dateToControl.setValue("", { emitEvent: false });
    this.statusControl.setValue(null, { emitEvent: false });
    this.warehouseControl.setValue(null, { emitEvent: false });
    this.showCustomDateRange = false;
    this.emitFilters();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  emitFilters() {
    const filters = {};
    const search = this.searchControl.value.trim();
    if (search) {
      filters.search = search;
    }
    const dateFrom = this.dateFromControl.value;
    if (dateFrom) {
      filters.dateFrom = new Date(dateFrom).toISOString();
    }
    const dateTo = this.dateToControl.value;
    if (dateTo) {
      filters.dateTo = new Date(dateTo).toISOString();
    }
    const status = this.statusControl.value;
    if (status) {
      filters.status = status;
    }
    const warehouseId = this.warehouseControl.value;
    if (warehouseId) {
      filters.warehouseId = warehouseId;
    }
    this.filtersChange.emit(filters);
  }
  static \u0275fac = function FilterBarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FilterBarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FilterBarComponent, selectors: [["app-filter-bar"]], inputs: { warehouses: "warehouses", initialSearch: "initialSearch" }, outputs: { filtersChange: "filtersChange" }, features: [\u0275\u0275NgOnChangesFeature], decls: 24, vars: 8, consts: [["role", "search", "aria-label", "Filtros de \xF3rdenes de compra", 1, "filter-bar"], [1, "filter-bar__container"], [1, "filter-bar__field"], ["type", "text", "id", "search", "placeholder", "Buscar...", "aria-label", "Buscar \xF3rdenes por folio, proveedor o prop\xF3sito", 1, "filter-bar__input", 3, "formControl"], ["id", "dateRange", "aria-label", "Filtrar por rango de fecha", 1, "filter-bar__select", 3, "formControl"], ["value", ""], [3, "value"], ["id", "status", "aria-label", "Filtrar por estado de orden", 1, "filter-bar__select", 3, "formControl"], ["id", "warehouse", "aria-label", "Filtrar por almac\xE9n", 1, "filter-bar__select", 3, "formControl"], ["type", "date", "id", "dateFrom", "aria-label", "Filtrar desde fecha", 1, "filter-bar__input", 3, "formControl"], ["type", "date", "id", "dateTo", "aria-label", "Filtrar hasta fecha", 1, "filter-bar__input", 3, "formControl"], ["type", "button", "matTooltip", "Limpiar filtros", "aria-label", "Limpiar filtros", 1, "filter-bar__clear-button", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", "aria-hidden", "true", 1, "filter-bar__clear-icon"], ["d", "M4 6H20L14 13V18L10 20V13L4 6Z", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linejoin", "round"], ["d", "M5 19L19 5", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linecap", "round"]], template: function FilterBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "input", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "select", 4)(6, "option", 5);
      \u0275\u0275text(7, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(8, FilterBarComponent_For_9_Template, 2, 2, "option", 6, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, FilterBarComponent_Conditional_10_Template, 4, 2);
      \u0275\u0275elementStart(11, "div", 2)(12, "select", 7)(13, "option", 6);
      \u0275\u0275text(14, "Todos los estados");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(15, FilterBarComponent_For_16_Template, 2, 2, "option", 6, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 2)(18, "select", 8)(19, "option", 6);
      \u0275\u0275text(20, "Todos los almacenes");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(21, FilterBarComponent_For_22_Template, 2, 2, "option", 6, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(23, FilterBarComponent_Conditional_23_Template, 5, 0, "div", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("formControl", ctx.searchControl);
      \u0275\u0275advance(2);
      \u0275\u0275property("formControl", ctx.dateRangeControl);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.dateRangeOptions);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showCustomDateRange ? 10 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("formControl", ctx.statusControl);
      \u0275\u0275advance();
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.statusOptions);
      \u0275\u0275advance(3);
      \u0275\u0275property("formControl", ctx.warehouseControl);
      \u0275\u0275advance();
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.warehouses);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hasActiveFilters ? 23 : -1);
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    FormControlDirective,
    MatTooltipModule,
    MatTooltip
  ], styles: [`

.filter-bar[_ngcontent-%COMP%] {
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin-bottom: 1rem;
  box-shadow: none;
  border: none;
  transition: none;
}
.filter-bar[_ngcontent-%COMP%]:hover {
  box-shadow: none;
}
.filter-bar__container[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  align-items: center;
}
.filter-bar__field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.filter-bar__label[_ngcontent-%COMP%] {
  display: none;
}
.filter-bar__input[_ngcontent-%COMP%], 
.filter-bar__select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  font-size: 0.8rem;
  color: #2d3748;
  background: #ffffff;
  transition: all 0.2s ease;
}
.filter-bar__input[_ngcontent-%COMP%]:focus, 
.filter-bar__select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #667eea;
  background: #ffffff;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  transform: none;
}
.filter-bar__input[_ngcontent-%COMP%]:hover, 
.filter-bar__select[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e0;
}
.filter-bar__input[_ngcontent-%COMP%]::placeholder, 
.filter-bar__select[_ngcontent-%COMP%]::placeholder {
  color: #a0aec0;
}
.filter-bar__select[_ngcontent-%COMP%] {
  cursor: pointer;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px !important;
  padding-right: 2.5rem !important;
}
.filter-bar__select[_ngcontent-%COMP%]:focus {
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
}
.filter-bar__select[_ngcontent-%COMP%]:active {
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
}
.filter-bar__select[_ngcontent-%COMP%]::-ms-expand {
  display: none;
}
.filter-bar__select[_ngcontent-%COMP%]:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #2d3748;
}
.filter-bar__clear-button[_ngcontent-%COMP%] {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 0;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: #1f2937;
  background: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
}
.filter-bar__clear-button[_ngcontent-%COMP%]:hover {
  border-color: #94a3b8;
  background: #f8fafc;
}
.filter-bar__clear-button[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}
.filter-bar__clear-icon[_ngcontent-%COMP%] {
  width: 1.1rem;
  height: 1.1rem;
  display: block;
}
@media (max-width: 1024px) {
  .filter-bar__container[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .filter-bar[_ngcontent-%COMP%] {
    padding: 0;
    border-radius: 0;
  }
  .filter-bar__container[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .filter-bar__field[_ngcontent-%COMP%] {
    width: 100%;
  }
}
/*# sourceMappingURL=filter-bar.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterBarComponent, [{
    type: Component,
    args: [{ selector: "app-filter-bar", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatTooltipModule
    ], template: '<div class="filter-bar" role="search" aria-label="Filtros de \xF3rdenes de compra">\n  <div class="filter-bar__container">\n    <!-- Search Input -->\n    <div class="filter-bar__field">\n      <input\n        type="text"\n        id="search"\n        [formControl]="searchControl"\n        placeholder="Buscar..."\n        class="filter-bar__input"\n        aria-label="Buscar \xF3rdenes por folio, proveedor o prop\xF3sito"\n      />\n    </div>\n\n    <!-- Date Range Dropdown -->\n    <div class="filter-bar__field">\n      <select\n        id="dateRange"\n        [formControl]="dateRangeControl"\n        class="filter-bar__select"\n        aria-label="Filtrar por rango de fecha"\n      >\n        <option value="">Fecha</option>\n        @for (option of dateRangeOptions; track option.value) {\n          <option [value]="option.value">{{ option.label }}</option>\n        }\n      </select>\n    </div>\n\n    <!-- Custom Date Range (shown when "Rango" is selected) -->\n    @if (showCustomDateRange) {\n      <div class="filter-bar__field">\n        <input\n          type="date"\n          id="dateFrom"\n          [formControl]="dateFromControl"\n          class="filter-bar__input"\n          aria-label="Filtrar desde fecha"\n        />\n      </div>\n\n      <div class="filter-bar__field">\n        <input\n          type="date"\n          id="dateTo"\n          [formControl]="dateToControl"\n          class="filter-bar__input"\n          aria-label="Filtrar hasta fecha"\n        />\n      </div>\n    }\n\n    <!-- Status Dropdown -->\n    <div class="filter-bar__field">\n      <select\n        id="status"\n        [formControl]="statusControl"\n        class="filter-bar__select"\n        aria-label="Filtrar por estado de orden"\n      >\n        <option [value]="null">Todos los estados</option>\n        @for (option of statusOptions; track option.value) {\n          <option [value]="option.value">{{ option.label }}</option>\n        }\n      </select>\n    </div>\n\n    <!-- Warehouse Dropdown -->\n    <div class="filter-bar__field">\n      <select\n        id="warehouse"\n        [formControl]="warehouseControl"\n        class="filter-bar__select"\n        aria-label="Filtrar por almac\xE9n"\n      >\n        <option [value]="null">Todos los almacenes</option>\n        @for (warehouse of warehouses; track warehouse.id) {\n          <option [value]="warehouse.id">{{ warehouse.name }}</option>\n        }\n      </select>\n    </div>\n\n    @if (hasActiveFilters) {\n      <div class="filter-bar__field">\n        <button\n          type="button"\n          class="filter-bar__clear-button"\n          (click)="clearFilters()"\n          matTooltip="Limpiar filtros"\n          aria-label="Limpiar filtros"\n        >\n          <svg\n            class="filter-bar__clear-icon"\n            viewBox="0 0 24 24"\n            fill="none"\n            xmlns="http://www.w3.org/2000/svg"\n            aria-hidden="true"\n          >\n            <path d="M4 6H20L14 13V18L10 20V13L4 6Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>\n            <path d="M5 19L19 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>\n          </svg>\n        </button>\n      </div>\n    }\n  </div>\n</div>\n', styles: [`/* src/app/features/purchase-orders/components/filter-bar/filter-bar.component.scss */
.filter-bar {
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin-bottom: 1rem;
  box-shadow: none;
  border: none;
  transition: none;
}
.filter-bar:hover {
  box-shadow: none;
}
.filter-bar__container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
  align-items: center;
}
.filter-bar__field {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.filter-bar__label {
  display: none;
}
.filter-bar__input,
.filter-bar__select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  font-size: 0.8rem;
  color: #2d3748;
  background: #ffffff;
  transition: all 0.2s ease;
}
.filter-bar__input:focus,
.filter-bar__select:focus {
  outline: none;
  border-color: #667eea;
  background: #ffffff;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  transform: none;
}
.filter-bar__input:hover,
.filter-bar__select:hover {
  border-color: #cbd5e0;
}
.filter-bar__input::placeholder,
.filter-bar__select::placeholder {
  color: #a0aec0;
}
.filter-bar__select {
  cursor: pointer;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px !important;
  padding-right: 2.5rem !important;
}
.filter-bar__select:focus {
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
}
.filter-bar__select:active {
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
}
.filter-bar__select::-ms-expand {
  display: none;
}
.filter-bar__select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #2d3748;
}
.filter-bar__clear-button {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 0;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: #1f2937;
  background: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
}
.filter-bar__clear-button:hover {
  border-color: #94a3b8;
  background: #f8fafc;
}
.filter-bar__clear-button:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}
.filter-bar__clear-icon {
  width: 1.1rem;
  height: 1.1rem;
  display: block;
}
@media (max-width: 1024px) {
  .filter-bar__container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .filter-bar {
    padding: 0;
    border-radius: 0;
  }
  .filter-bar__container {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .filter-bar__field {
    width: 100%;
  }
}
/*# sourceMappingURL=filter-bar.component.css.map */
`] }]
  }], null, { warehouses: [{
    type: Input
  }], initialSearch: [{
    type: Input
  }], filtersChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FilterBarComponent, { className: "FilterBarComponent", filePath: "src/app/features/purchase-orders/components/filter-bar/filter-bar.component.ts", lineNumber: 21 });
})();

// src/app/features/purchase-orders/components/create-purchase-order-modal/create-purchase-order-modal.component.ts
var _c0 = () => ({ standalone: true });
function CreatePurchaseOrderModalComponent_Conditional_11_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const config_r2 = ctx.$implicit;
    \u0275\u0275property("value", config_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", config_r2.razon_social || config_r2.rfc || config_r2.id, " ");
  }
}
function CreatePurchaseOrderModalComponent_Conditional_11_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r3 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", warehouse_r3.name, " ");
  }
}
function CreatePurchaseOrderModalComponent_Conditional_11_mat_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r5 = ctx.$implicit;
    \u0275\u0275property("value", vendor_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vendor_r5.display_name, " ");
  }
}
function CreatePurchaseOrderModalComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 18)(2, "label", 19);
    \u0275\u0275text(3, "CONFIGURACI\xD3N FISCAL *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 20)(5, "option", 21);
    \u0275\u0275text(6, "Selecciona una configuraci\xF3n fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, CreatePurchaseOrderModalComponent_Conditional_11_option_7_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 23)(9, "label", 19);
    \u0275\u0275text(10, "ALMAC\xC9N *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "select", 24)(12, "option", 21);
    \u0275\u0275text(13, "Selecciona un almac\xE9n");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, CreatePurchaseOrderModalComponent_Conditional_11_option_14_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 23)(16, "label", 19);
    \u0275\u0275text(17, "PROVEEDOR *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 25);
    \u0275\u0275elementStart(19, "mat-autocomplete", 26, 0);
    \u0275\u0275listener("optionSelected", function CreatePurchaseOrderModalComponent_Conditional_11_Template_mat_autocomplete_optionSelected_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onVendorSelected($event.option.value));
    });
    \u0275\u0275template(21, CreatePurchaseOrderModalComponent_Conditional_11_mat_option_21_Template, 2, 2, "mat-option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 23)(23, "label", 19);
    \u0275\u0275text(24, "FECHA ESPERADA DE ENTREGA *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 18)(27, "label", 19);
    \u0275\u0275text(28, "NOTAS");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "textarea", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const autoVendor_r6 = \u0275\u0275reference(20);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r3.fiscalConfigurations);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r3.warehouses);
    \u0275\u0275advance(4);
    \u0275\u0275property("matAutocomplete", autoVendor_r6);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r3.displayVendor.bind(ctx_r3));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.filteredVendors);
  }
}
function CreatePurchaseOrderModalComponent_Conditional_12_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "p");
    \u0275\u0275text(2, "No hay productos agregados. Selecciona un proveedor y agrega productos.");
    \u0275\u0275elementEnd()();
  }
}
function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r11 = ctx.$implicit;
    \u0275\u0275property("value", uom_r11.uom_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", uom_r11.uom_name, " ");
  }
}
function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 37)(3, "div", 38);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 39)(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(8, "td")(9, "select", 40);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_select_ngModelChange_9_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r9.uom_id, $event) || (item_r9.uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_select_change_9_listener() {
      const i_r10 = \u0275\u0275restoreView(_r8).index;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.onUomChange(i_r10));
    });
    \u0275\u0275elementStart(10, "option", 21);
    \u0275\u0275text(11, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_option_12_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_input_ngModelChange_14_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r9.quantity, $event) || (item_r9.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_input_ngModelChange_16_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r9.unit_total, $event) || (item_r9.unit_total = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_input_change_16_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.calculateTotals(item_r9));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_input_ngModelChange_18_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r9.iva_percentage, $event) || (item_r9.iva_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_input_change_18_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.calculateTotals(item_r9));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td")(20, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_input_ngModelChange_20_listener($event) {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r9.ieps_percentage, $event) || (item_r9.ieps_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_input_change_20_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.calculateTotals(item_r9));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td")(22, "button", 44);
    \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template_button_click_22_listener() {
      const i_r10 = \u0275\u0275restoreView(_r8).index;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.removeLineItem(i_r10));
    });
    \u0275\u0275element(23, "i", 45);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r9.product_name || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("SKU: ", item_r9.product_sku || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r9.uom_id);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(13, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r3.getProductUoms(i_r10));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r9.quantity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(14, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r9.unit_total);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(15, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r9.iva_percentage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(16, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r9.ieps_percentage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c0));
  }
}
function CreatePurchaseOrderModalComponent_Conditional_12_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "table")(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Costo unitario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275template(19, CreatePurchaseOrderModalComponent_Conditional_12_div_7_tr_19_Template, 24, 18, "tr", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r3.lineItems);
  }
}
function CreatePurchaseOrderModalComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 30)(2, "h3");
    \u0275\u0275text(3, "Productos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 31);
    \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Conditional_12_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openAddProductModal());
    });
    \u0275\u0275text(5, " + Agregar Producto ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, CreatePurchaseOrderModalComponent_Conditional_12_div_6_Template, 3, 0, "div", 32)(7, CreatePurchaseOrderModalComponent_Conditional_12_div_7_Template, 20, 1, "div", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !((tmp_1_0 = ctx_r3.form.get("vendor_id")) == null ? null : tmp_1_0.value));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.lineItems.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.lineItems.length > 0);
  }
}
function CreatePurchaseOrderModalComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Crear Orden");
    \u0275\u0275elementEnd();
  }
}
function CreatePurchaseOrderModalComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Creando...");
    \u0275\u0275elementEnd();
  }
}
function CreatePurchaseOrderModalComponent_Conditional_19_mat_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r13 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", product_r13);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getProductOptionLabel(product_r13), " ");
  }
}
function CreatePurchaseOrderModalComponent_Conditional_19_option_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r14 = ctx.$implicit;
    \u0275\u0275property("value", uom_r14.uom_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", uom_r14.uom_name, " ");
  }
}
function CreatePurchaseOrderModalComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Conditional_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeAddProductModal());
    });
    \u0275\u0275elementStart(1, "div", 47);
    \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Conditional_19_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 48)(3, "h3");
    \u0275\u0275text(4, "Agregar producto");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 49)(6, "div", 18)(7, "label", 19);
    \u0275\u0275text(8, "PRODUCTO *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_19_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.productSearchTerm, $event) || (ctx_r3.productSearchTerm = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-autocomplete", 26, 1);
    \u0275\u0275listener("optionSelected", function CreatePurchaseOrderModalComponent_Conditional_19_Template_mat_autocomplete_optionSelected_10_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onProductSelectedForModal($event.option.value));
    });
    \u0275\u0275template(12, CreatePurchaseOrderModalComponent_Conditional_19_mat_option_12_Template, 2, 2, "mat-option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 11)(14, "div", 23)(15, "label", 19);
    \u0275\u0275text(16, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 51);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_19_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.selectedUomId, $event) || (ctx_r3.selectedUomId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_Conditional_19_Template_select_change_17_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onSelectedUomChange());
    });
    \u0275\u0275elementStart(18, "option", 21);
    \u0275\u0275text(19, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, CreatePurchaseOrderModalComponent_Conditional_19_option_20_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 23)(22, "label", 19);
    \u0275\u0275text(23, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 23)(26, "label", 19);
    \u0275\u0275text(27, "CANTIDAD *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_19_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.selectedQuantity, $event) || (ctx_r3.selectedQuantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 23)(30, "label", 19);
    \u0275\u0275text(31, "COSTO UNITARIO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_19_Template_input_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.selectedUnitTotal, $event) || (ctx_r3.selectedUnitTotal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 23)(34, "label", 19);
    \u0275\u0275text(35, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_19_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.selectedIva, $event) || (ctx_r3.selectedIva = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 23)(38, "label", 19);
    \u0275\u0275text(39, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "input", 55);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_Conditional_19_Template_input_ngModelChange_40_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.selectedIeps, $event) || (ctx_r3.selectedIeps = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(41, "div", 56)(42, "button", 14);
    \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Conditional_19_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeAddProductModal());
    });
    \u0275\u0275text(43, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "button", 57);
    \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Conditional_19_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.confirmAddProduct());
    });
    \u0275\u0275text(45, "Agregar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const autoProductPicker_r15 = \u0275\u0275reference(11);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.productSearchTerm);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c0))("matAutocomplete", autoProductPicker_r15);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r3.displayProduct.bind(ctx_r3));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.filteredProductsForModal);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.selectedUomId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(18, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r3.selectedProductUoms);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", (ctx_r3.selectedProduct == null ? null : ctx_r3.selectedProduct.product_sku) || (ctx_r3.selectedProduct == null ? null : ctx_r3.selectedProduct.sku) || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.selectedQuantity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.selectedUnitTotal);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(20, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.selectedIva);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(21, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.selectedIeps);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(22, _c0));
  }
}
var VENDOR_SEARCH_LIMIT = 100;
var CreatePurchaseOrderModalComponent = class _CreatePurchaseOrderModalComponent {
  fb;
  purchaseOrderService;
  fiscalConfigService;
  warehouseService;
  vendorService;
  toast;
  cdr;
  dialogRef;
  data;
  form;
  loading = false;
  saving = false;
  lineItems = [];
  vendorProducts = [];
  loadingProducts = false;
  // Dropdowns data
  fiscalConfigurations = [];
  warehouses = [];
  filteredVendors = [];
  loadingVendors = false;
  tabs = [
    { id: "info", title: "Informaci\xF3n" },
    { id: "products", title: "Productos" }
  ];
  activeTab = "info";
  addProductModalOpen = false;
  productSearchTerm = "";
  selectedProduct = null;
  selectedUomId = "";
  selectedQuantity = 1;
  selectedUnitTotal = 0;
  selectedIva = 16;
  selectedIeps = 0;
  constructor(fb, purchaseOrderService, fiscalConfigService, warehouseService, vendorService, toast, cdr, dialogRef, data) {
    this.fb = fb;
    this.purchaseOrderService = purchaseOrderService;
    this.fiscalConfigService = fiscalConfigService;
    this.warehouseService = warehouseService;
    this.vendorService = vendorService;
    this.toast = toast;
    this.cdr = cdr;
    this.dialogRef = dialogRef;
    this.data = data;
    this.form = this.fb.group({
      fiscal_configuration_id: ["", Validators.required],
      warehouse_id: ["", Validators.required],
      vendor_search: [""],
      vendor_id: ["", Validators.required],
      expected_delivery_date: ["", Validators.required],
      payment_status: ["Pendiente", Validators.required],
      notes: [""]
    });
  }
  ngOnInit() {
    this.loadDropdownData();
    this.form.get("vendor_search")?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((value) => {
      if (typeof value === "string") {
        this.form.patchValue({ vendor_id: "" }, { emitEvent: false });
      } else if (value && typeof value !== "string") {
        return;
      }
      this.searchVendors(typeof value === "string" ? value : "");
    });
  }
  onTabChange(tabId) {
    this.activeTab = tabId;
  }
  loadDropdownData() {
    this.loading = true;
    Promise.all([
      this.fiscalConfigService.listFiscalConfigurations().toPromise(),
      this.warehouseService.getWarehouses().toPromise()
    ]).then(([fiscalConfigs, warehouses]) => {
      this.fiscalConfigurations = fiscalConfigs?.data || [];
      this.warehouses = warehouses?.data || [];
      this.loading = false;
      this.searchVendors("");
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error("Error loading dropdown data:", error);
      this.toast.error("Error al cargar datos");
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
  onVendorChange() {
    const vendorId = this.form.get("vendor_id")?.value;
    if (!vendorId) {
      this.vendorProducts = [];
      this.lineItems = [];
      this.resetAddProductForm();
      return;
    }
    this.loadingProducts = true;
    this.purchaseOrderService.getVendorProducts(vendorId).subscribe({
      next: (products) => {
        this.vendorProducts = products;
        this.lineItems = this.lineItems.map((item) => __spreadProps(__spreadValues({}, item), {
          product_id: "",
          product_name: "",
          product_sku: "",
          uom_id: ""
        }));
        this.resetAddProductForm();
        this.loadingProducts = false;
      },
      error: (error) => {
        console.error("Error loading vendor products:", error);
        this.toast.error("Error al cargar productos del proveedor");
        this.loadingProducts = false;
      }
    });
  }
  onVendorSelected(vendor) {
    if (!vendor)
      return;
    this.form.patchValue({
      vendor_id: vendor.id,
      vendor_search: vendor.display_name
    }, { emitEvent: false });
    this.onVendorChange();
  }
  displayVendor(vendor) {
    if (!vendor)
      return "";
    if (typeof vendor === "string")
      return vendor;
    return vendor?.display_name || this.formatVendorLabel(vendor) || "";
  }
  searchVendors(searchTerm) {
    const term = String(searchTerm || "").trim();
    const params = {
      limit: VENDOR_SEARCH_LIMIT,
      status: "active"
    };
    if (term) {
      params.search = term;
    }
    this.loadingVendors = true;
    this.vendorService.getVendors(params).subscribe({
      next: (response) => {
        this.filteredVendors = (response?.data || []).map((vendor) => __spreadProps(__spreadValues({}, vendor), {
          display_name: this.formatVendorLabel(vendor)
        }));
        this.loadingVendors = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error searching vendors:", error);
        this.filteredVendors = [];
        this.loadingVendors = false;
        this.cdr.detectChanges();
      }
    });
  }
  get filteredProductsForModal() {
    const raw = typeof this.productSearchTerm === "string" ? this.productSearchTerm : this.getProductOptionLabel(this.productSearchTerm);
    const term = String(raw || "").toLowerCase().trim();
    if (!term)
      return this.vendorProducts;
    return this.vendorProducts.filter((product) => {
      const haystack = `${product.product_name || ""} ${product.product_sku || product.sku || ""}`.toLowerCase();
      return haystack.includes(term);
    });
  }
  get selectedProductUoms() {
    if (!this.selectedProduct)
      return [];
    return this.selectedProduct?.uoms || [];
  }
  formatVendorLabel(vendor) {
    if (!vendor)
      return "";
    const name = (vendor.name || "").trim();
    const rfc = (vendor.rfc || "").trim();
    return rfc ? `${name} (${rfc})` : name;
  }
  openAddProductModal() {
    if (!this.form.get("vendor_id")?.value) {
      this.toast.warning("Selecciona un proveedor antes de agregar productos");
      return;
    }
    this.addProductModalOpen = true;
    this.resetAddProductForm();
  }
  closeAddProductModal() {
    this.addProductModalOpen = false;
  }
  onProductSelectedForModal(product) {
    this.selectedProduct = product;
    this.productSearchTerm = product;
    const firstUom = (product?.uoms || [])[0];
    this.selectedUomId = firstUom?.uom_id || "";
    this.selectedUnitTotal = Number(firstUom?.cost || 0);
    this.selectedIva = Number(firstUom?.iva_percentage || 0);
    this.selectedIeps = Number(firstUom?.ieps_percentage || 0);
  }
  onSelectedUomChange() {
    const uom = this.selectedProductUoms.find((row) => row.uom_id === this.selectedUomId);
    if (!uom)
      return;
    this.selectedUnitTotal = Number(uom.cost || 0);
    this.selectedIva = Number(uom.iva_percentage || 0);
    this.selectedIeps = Number(uom.ieps_percentage || 0);
  }
  confirmAddProduct() {
    if (!this.selectedProduct || !this.selectedUomId) {
      this.toast.warning("Selecciona producto y UOM");
      return;
    }
    const quantity = Number(this.selectedQuantity || 0);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      this.toast.warning("Cantidad inv\xE1lida");
      return;
    }
    const newItem = {
      product_id: this.selectedProduct.product_id,
      product_name: this.selectedProduct.product_name,
      product_sku: this.selectedProduct.product_sku || this.selectedProduct.sku || "",
      uom_id: this.selectedUomId,
      quantity,
      unit_total: Number(this.selectedUnitTotal || 0),
      iva_percentage: Number(this.selectedIva || 0),
      iva_unit: 0,
      ieps_percentage: Number(this.selectedIeps || 0),
      ieps_unit: 0
    };
    this.calculateTotals(newItem);
    this.lineItems.push(newItem);
    this.closeAddProductModal();
  }
  resetAddProductForm() {
    this.productSearchTerm = "";
    this.selectedProduct = null;
    this.selectedUomId = "";
    this.selectedQuantity = 1;
    this.selectedUnitTotal = 0;
    this.selectedIva = 16;
    this.selectedIeps = 0;
  }
  getAvailableQty(product) {
    const raw = product?.available_quantity ?? product?.available_qty ?? product?.stock ?? product?.on_hand ?? product?.inventory_qty ?? 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  getProductOptionLabel(product) {
    const name = product?.product_name || "Producto";
    const productSku = product?.product_sku || product?.sku || "";
    const sku = productSku ? ` | SKU: ${productSku}` : "";
    return `${name}${sku}`;
  }
  displayProductSearch() {
    return this.selectedProduct ? this.getProductOptionLabel(this.selectedProduct) : "";
  }
  displayProduct(value) {
    if (!value)
      return "";
    if (typeof value === "string")
      return value;
    return this.getProductOptionLabel(value);
  }
  removeLineItem(index) {
    this.lineItems.splice(index, 1);
  }
  calculateTotals(item) {
    item.iva_unit = item.unit_total * item.iva_percentage / 100;
    item.ieps_unit = item.unit_total * item.ieps_percentage / 100;
  }
  getProductUoms(lineItemIndex) {
    const item = this.lineItems[lineItemIndex];
    if (!item.product_id)
      return [];
    const product = this.vendorProducts.find((p) => p.product_id === item.product_id);
    return product?.uoms || [];
  }
  onProductChange(lineItemIndex) {
    const item = this.lineItems[lineItemIndex];
    const product = this.vendorProducts.find((p) => p.product_id === item.product_id);
    if (product && product.uoms && product.uoms.length > 0) {
      const defaultUom = product.uoms[0];
      item.uom_id = defaultUom.uom_id;
      item.unit_total = defaultUom.cost || 0;
      item.iva_percentage = defaultUom.iva_percentage || 0;
      item.ieps_percentage = defaultUom.ieps_percentage || 0;
      this.calculateTotals(item);
    }
  }
  onUomChange(lineItemIndex) {
    const item = this.lineItems[lineItemIndex];
    const product = this.vendorProducts.find((p) => p.product_id === item.product_id);
    if (product && product.uoms) {
      const selectedUom = product.uoms.find((u) => u.uom_id === item.uom_id);
      if (selectedUom) {
        item.unit_total = selectedUom.cost || 0;
        item.iva_percentage = selectedUom.iva_percentage || 0;
        item.ieps_percentage = selectedUom.ieps_percentage || 0;
        this.calculateTotals(item);
      }
    }
  }
  save() {
    if (!this.form.valid || this.lineItems.length === 0) {
      this.toast.warning("Por favor completa todos los campos y agrega al menos un producto");
      return;
    }
    this.saving = true;
    const fv = this.form.value;
    const line_items = this.lineItems.map((li) => ({
      product_id: li.product_id,
      uom_id: li.uom_id,
      quantity: Number(li.quantity),
      unit_total: Number(li.unit_total),
      iva_percentage: Number(li.iva_percentage),
      ieps_percentage: Number(li.ieps_percentage)
    }));
    const payload = {
      fiscal_configuration_id: fv.fiscal_configuration_id,
      warehouse_id: fv.warehouse_id,
      vendor_id: fv.vendor_id,
      expected_delivery_date: fv.expected_delivery_date,
      line_items
    };
    const ps = (fv.payment_status || "").trim();
    if (ps) {
      payload.payment_status = ps === "Pagada" ? "Pagado" : ps;
    }
    const notes = (fv.notes || "").trim();
    if (notes) {
      payload.notes = notes;
    }
    this.purchaseOrderService.createOrder(payload).subscribe({
      next: (order) => {
        this.saving = false;
        this.cdr.detectChanges();
        this.toast.success("Orden de compra creada exitosamente");
        this.dialogRef.close(order);
      },
      error: (error) => {
        this.saving = false;
        this.cdr.detectChanges();
        console.error("Error creating order:", error);
        const errorMessage = error.error?.message || "Error al crear la orden de compra";
        this.toast.error(errorMessage);
      }
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function CreatePurchaseOrderModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreatePurchaseOrderModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(VendorService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreatePurchaseOrderModalComponent, selectors: [["app-create-purchase-order-modal"]], decls: 20, vars: 9, consts: [["autoVendor", "matAutocomplete"], ["autoProductPicker", "matAutocomplete"], [1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "currentColor"], ["d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"], [1, "modal-content"], [3, "formGroup"], [1, "mb-4"], [3, "tabChange", "tabs", "activeTabId"], [1, "form-grid"], [1, "line-items-section"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [4, "ngIf"], [1, "add-product-overlay"], [1, "form-field", "form-field--full"], [1, "form-label"], ["formControlName", "fiscal_configuration_id", 1, "form-select"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-field"], ["formControlName", "warehouse_id", 1, "form-select"], ["type", "text", "formControlName", "vendor_search", "placeholder", "Buscar proveedor...", 1, "form-input", 3, "matAutocomplete"], [3, "optionSelected", "displayWith"], ["type", "date", "formControlName", "expected_delivery_date", 1, "form-input"], ["formControlName", "notes", "placeholder", "Notas opcionales", "rows", "3", 1, "form-textarea"], [3, "value"], [1, "section-header"], ["type", "button", 1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], ["class", "empty-state", 4, "ngIf"], ["class", "line-items-table", 4, "ngIf"], [1, "empty-state"], [1, "line-items-table"], [4, "ngFor", "ngForOf"], [1, "product-cell"], [1, "product-cell__name"], [1, "product-cell__meta"], [1, "form-select", "form-select--inline", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "number", "min", "0.01", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "max", "100", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "button", "title", "Eliminar", 1, "btn-icon", "btn-icon--danger", 3, "click"], [1, "fi", "fi-rr-trash"], [1, "add-product-overlay", 3, "click"], [1, "add-product-modal", 3, "click"], [1, "add-product-modal__header"], [1, "add-product-modal__body"], ["type", "text", "placeholder", "Buscar por nombre o SKU...", 1, "form-input", 3, "ngModelChange", "ngModel", "ngModelOptions", "matAutocomplete"], [1, "form-select", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "text", "readonly", "", 1, "form-input", 3, "value"], ["type", "number", "min", "0.01", "step", "0.01", 1, "form-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", 1, "form-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "max", "100", "step", "0.01", 1, "form-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "add-product-modal__footer"], ["type", "button", 1, "btn", "btn--primary", 3, "click"]], template: function CreatePurchaseOrderModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2");
      \u0275\u0275text(3, "Crear Orden de Compra");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Template_button_click_4_listener() {
        return ctx.cancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 5);
      \u0275\u0275element(6, "path", 6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 7)(8, "form", 8)(9, "div", 9)(10, "app-tab", 10);
      \u0275\u0275listener("tabChange", function CreatePurchaseOrderModalComponent_Template_app_tab_tabChange_10_listener($event) {
        return ctx.onTabChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(11, CreatePurchaseOrderModalComponent_Conditional_11_Template, 30, 5, "div", 11);
      \u0275\u0275conditionalCreate(12, CreatePurchaseOrderModalComponent_Conditional_12_Template, 8, 3, "div", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 13)(14, "button", 14);
      \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Template_button_click_14_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(15, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 15);
      \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Template_button_click_16_listener() {
        return ctx.save();
      });
      \u0275\u0275template(17, CreatePurchaseOrderModalComponent_span_17_Template, 2, 0, "span", 16)(18, CreatePurchaseOrderModalComponent_span_18_Template, 2, 0, "span", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(19, CreatePurchaseOrderModalComponent_Conditional_19_Template, 46, 23, "div", 17);
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("tabs", ctx.tabs)("activeTabId", ctx.activeTab);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === "info" ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === "products" ? 12 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.saving);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.saving);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.addProductModalOpen ? 19 : -1);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName, MatAutocompleteModule, MatAutocomplete, MatOption, MatAutocompleteTrigger, TabComponent], styles: [`

.modal-container[_ngcontent-%COMP%] {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.modal-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.close-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}
.close-btn[_ngcontent-%COMP%]:hover {
  background: #f3f4f6;
  color: #374151;
}
.modal-content[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  position: relative;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}
.form-field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-field--full[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.form-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.form-input[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%], 
.form-textarea[_ngcontent-%COMP%] {
  width: 100%;
  padding: 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;
}
.form-input[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus, 
.form-textarea[_ngcontent-%COMP%]:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-input[_ngcontent-%COMP%]:disabled, 
.form-select[_ngcontent-%COMP%]:disabled, 
.form-textarea[_ngcontent-%COMP%]:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}
.form-input--inline[_ngcontent-%COMP%], 
.form-select--inline[_ngcontent-%COMP%], 
.form-textarea--inline[_ngcontent-%COMP%] {
  padding: 6px 8px;
  font-size: 12px;
}
.form-select[_ngcontent-%COMP%] {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-right: 36px;
  appearance: none;
}
.form-textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 80px;
}
.line-items-section[_ngcontent-%COMP%] {
  margin-bottom: 24px;
}
.section-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #9ca3af;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  margin: 0;
}
.line-items-table[_ngcontent-%COMP%] {
  overflow-x: auto;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {
  background: #f9fafb;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f3f4f6;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background: #f9fafb;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 8px 12px;
  color: #374151;
  vertical-align: middle;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(1), 
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(1) {
  min-width: 280px;
  width: 36%;
}
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2), 
.line-items-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2) {
  min-width: 120px;
}
.product-cell[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.product-cell__name[_ngcontent-%COMP%] {
  font-weight: 600;
}
.product-cell__meta[_ngcontent-%COMP%] {
  display: flex;
  gap: 0.75rem;
  font-size: 12px;
  color: #6b7280;
}
[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option {
  min-height: 40px;
}
[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  line-height: 1.25;
}
.add-product-overlay[_ngcontent-%COMP%] {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
}
.add-product-modal[_ngcontent-%COMP%] {
  width: min(760px, 100vw - 32px);
  max-height: calc(100vh - 48px);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}
.add-product-modal__header[_ngcontent-%COMP%] {
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.add-product-modal__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}
.add-product-modal__body[_ngcontent-%COMP%] {
  padding: 16px;
  overflow-y: auto;
}
.add-product-modal__body[_ngcontent-%COMP%]    > .form-field--full[_ngcontent-%COMP%] {
  margin-bottom: 12px;
}
.add-product-modal__body[_ngcontent-%COMP%]    > .form-grid[_ngcontent-%COMP%] {
  margin-bottom: 0;
}
.add-product-modal__footer[_ngcontent-%COMP%] {
  border-top: 1px solid #e5e7eb;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  background: #f9fafb;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--primary[_ngcontent-%COMP%] {
  background: #3b82f6;
  color: white;
}
.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #2563eb;
}
.btn--secondary[_ngcontent-%COMP%] {
  background: #f3f4f6;
  color: #374151;
}
.btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #e5e7eb;
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 6px 12px;
  font-size: 12px;
}
.btn-icon[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  color: #6b7280;
  transition: all 0.15s;
}
.btn-icon[_ngcontent-%COMP%]:hover {
  background: #f3f4f6;
  color: #374151;
}
.btn-icon--danger[_ngcontent-%COMP%]:hover {
  background: #fee2e2;
  color: #dc2626;
}
.modal-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}
@media (max-width: 768px) {
  .modal-container[_ngcontent-%COMP%] {
    max-width: 95vw;
  }
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
/*# sourceMappingURL=create-purchase-order-modal.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreatePurchaseOrderModalComponent, [{
    type: Component,
    args: [{ selector: "app-create-purchase-order-modal", standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, TabComponent], template: `<div class="modal-container">
  <!-- Header -->
  <div class="modal-header">
    <h2>Crear Orden de Compra</h2>
    <button class="close-btn" (click)="cancel()" type="button">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
      </svg>
    </button>
  </div>

  <!-- Content -->
  <div class="modal-content">
    <form [formGroup]="form">
      <div class="mb-4">
        <app-tab [tabs]="tabs" [activeTabId]="activeTab" (tabChange)="onTabChange($event)"></app-tab>
      </div>

      @if (activeTab === 'info') {
      <!-- Form Grid -->
      <div class="form-grid">
        <!-- Fiscal Configuration -->
        <div class="form-field form-field--full">
          <label class="form-label">CONFIGURACI\xD3N FISCAL *</label>
          <select class="form-select" formControlName="fiscal_configuration_id">
            <option value="">Selecciona una configuraci\xF3n fiscal</option>
            <option *ngFor="let config of fiscalConfigurations" [value]="config.id">
              {{ config.razon_social || config.rfc || config.id }}
            </option>
          </select>
        </div>

        <!-- Warehouse -->
        <div class="form-field">
          <label class="form-label">ALMAC\xC9N *</label>
          <select class="form-select" formControlName="warehouse_id">
            <option value="">Selecciona un almac\xE9n</option>
            <option *ngFor="let warehouse of warehouses" [value]="warehouse.id">
              {{ warehouse.name }}
            </option>
          </select>
        </div>

        <!-- Vendor -->
        <div class="form-field">
          <label class="form-label">PROVEEDOR *</label>
          <input
            type="text"
            class="form-input"
            formControlName="vendor_search"
            placeholder="Buscar proveedor..."
            [matAutocomplete]="autoVendor">
          <mat-autocomplete
            #autoVendor="matAutocomplete"
            [displayWith]="displayVendor.bind(this)"
            (optionSelected)="onVendorSelected($event.option.value)">
            <mat-option *ngFor="let vendor of filteredVendors" [value]="vendor">
              {{ vendor.display_name }}
            </mat-option>
          </mat-autocomplete>
        </div>

        <!-- Expected Delivery Date -->
        <div class="form-field">
          <label class="form-label">FECHA ESPERADA DE ENTREGA *</label>
          <input type="date" class="form-input" formControlName="expected_delivery_date">
        </div>

        <!-- Notes -->
        <div class="form-field form-field--full">
          <label class="form-label">NOTAS</label>
          <textarea class="form-textarea" formControlName="notes" placeholder="Notas opcionales" rows="3"></textarea>
        </div>
      </div>
      }

      @if (activeTab === 'products') {
      <!-- Line Items Section -->
      <div class="line-items-section">
        <div class="section-header">
          <h3>Productos</h3>
          <button type="button" class="btn btn--sm btn--primary" (click)="openAddProductModal()" [disabled]="!form.get('vendor_id')?.value">
            + Agregar Producto
          </button>
        </div>

        <div *ngIf="lineItems.length === 0" class="empty-state">
          <p>No hay productos agregados. Selecciona un proveedor y agrega productos.</p>
        </div>

        <div *ngIf="lineItems.length > 0" class="line-items-table">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>UOM</th>
                <th>Cantidad</th>
                <th>Costo unitario</th>
                <th>IVA %</th>
                <th>IEPS %</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of lineItems; let i = index">
                <td>
                  <div class="product-cell">
                    <div class="product-cell__name">{{ item.product_name || '\u2014' }}</div>
                    <div class="product-cell__meta">
                      <span>SKU: {{ item.product_sku || 'N/A' }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <select class="form-select form-select--inline" [(ngModel)]="item.uom_id" [ngModelOptions]="{standalone: true}" (change)="onUomChange(i)">
                    <option value="">Seleccionar...</option>
                    <option *ngFor="let uom of getProductUoms(i)" [value]="uom.uom_id">
                      {{ uom.uom_name }}
                    </option>
                  </select>
                </td>
                <td>
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="item.quantity" [ngModelOptions]="{standalone: true}" min="0.01" step="0.01">
                </td>
                <td>
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="item.unit_total" [ngModelOptions]="{standalone: true}" (change)="calculateTotals(item)" min="0" step="0.01">
                </td>
                <td>
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="item.iva_percentage" [ngModelOptions]="{standalone: true}" min="0" max="100" step="0.01" (change)="calculateTotals(item)">
                </td>
                <td>
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="item.ieps_percentage" [ngModelOptions]="{standalone: true}" min="0" max="100" step="0.01" (change)="calculateTotals(item)">
                </td>
                <td>
                  <button type="button" class="btn-icon btn-icon--danger" (click)="removeLineItem(i)" title="Eliminar">
                    <i class="fi fi-rr-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      }
    </form>
  </div>

  <!-- Footer -->
  <div class="modal-footer">
    <button class="btn btn--secondary" (click)="cancel()" type="button">Cancelar</button>
    <button class="btn btn--primary" (click)="save()" [disabled]="saving" type="button">
      <span *ngIf="!saving">Crear Orden</span>
      <span *ngIf="saving">Creando...</span>
    </button>
  </div>
</div>

@if (addProductModalOpen) {
  <div class="add-product-overlay" (click)="closeAddProductModal()">
    <div class="add-product-modal" (click)="$event.stopPropagation()">
      <div class="add-product-modal__header">
        <h3>Agregar producto</h3>
      </div>
      <div class="add-product-modal__body">
        <div class="form-field form-field--full">
          <label class="form-label">PRODUCTO *</label>
          <input
            type="text"
            class="form-input"
            [(ngModel)]="productSearchTerm"
            [ngModelOptions]="{ standalone: true }"
            placeholder="Buscar por nombre o SKU..."
            [matAutocomplete]="autoProductPicker">
          <mat-autocomplete
            #autoProductPicker="matAutocomplete"
            [displayWith]="displayProduct.bind(this)"
            (optionSelected)="onProductSelectedForModal($event.option.value)">
            <mat-option *ngFor="let product of filteredProductsForModal" [value]="product">
              {{ getProductOptionLabel(product) }}
            </mat-option>
          </mat-autocomplete>
        </div>

        <div class="form-grid">
          <div class="form-field">
            <label class="form-label">UOM *</label>
            <select class="form-select" [(ngModel)]="selectedUomId" [ngModelOptions]="{ standalone: true }" (change)="onSelectedUomChange()">
              <option value="">Seleccionar...</option>
              <option *ngFor="let uom of selectedProductUoms" [value]="uom.uom_id">
                {{ uom.uom_name }}
              </option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">SKU</label>
            <input type="text" class="form-input" [value]="selectedProduct?.product_sku || selectedProduct?.sku || 'N/A'" readonly>
          </div>
          <div class="form-field">
            <label class="form-label">CANTIDAD *</label>
            <input type="number" class="form-input" [(ngModel)]="selectedQuantity" [ngModelOptions]="{ standalone: true }" min="0.01" step="0.01">
          </div>
          <div class="form-field">
            <label class="form-label">COSTO UNITARIO</label>
            <input type="number" class="form-input" [(ngModel)]="selectedUnitTotal" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
          </div>
          <div class="form-field">
            <label class="form-label">IVA %</label>
            <input type="number" class="form-input" [(ngModel)]="selectedIva" [ngModelOptions]="{ standalone: true }" min="0" max="100" step="0.01">
          </div>
          <div class="form-field">
            <label class="form-label">IEPS %</label>
            <input type="number" class="form-input" [(ngModel)]="selectedIeps" [ngModelOptions]="{ standalone: true }" min="0" max="100" step="0.01">
          </div>
        </div>
      </div>
      <div class="add-product-modal__footer">
        <button type="button" class="btn btn--secondary" (click)="closeAddProductModal()">Cancelar</button>
        <button type="button" class="btn btn--primary" (click)="confirmAddProduct()">Agregar</button>
      </div>
    </div>
  </div>
}
`, styles: [`/* src/app/features/purchase-orders/components/create-purchase-order-modal/create-purchase-order-modal.component.scss */
.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}
.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}
.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  position: relative;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-field--full {
  grid-column: 1/-1;
}
.form-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;
}
.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-input:disabled,
.form-select:disabled,
.form-textarea:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}
.form-input--inline,
.form-select--inline,
.form-textarea--inline {
  padding: 6px 8px;
  font-size: 12px;
}
.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-right: 36px;
  appearance: none;
}
.form-textarea {
  resize: vertical;
  min-height: 80px;
}
.line-items-section {
  margin-bottom: 24px;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.section-header h3 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #9ca3af;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
.empty-state p {
  font-size: 14px;
  margin: 0;
}
.line-items-table {
  overflow-x: auto;
}
.line-items-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.line-items-table table thead {
  background: #f9fafb;
}
.line-items-table table thead th {
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}
.line-items-table table tbody tr {
  border-bottom: 1px solid #f3f4f6;
}
.line-items-table table tbody tr:last-child {
  border-bottom: none;
}
.line-items-table table tbody tr:hover {
  background: #f9fafb;
}
.line-items-table table tbody td {
  padding: 8px 12px;
  color: #374151;
  vertical-align: middle;
}
.line-items-table table th:nth-child(1),
.line-items-table table td:nth-child(1) {
  min-width: 280px;
  width: 36%;
}
.line-items-table table th:nth-child(2),
.line-items-table table td:nth-child(2) {
  min-width: 120px;
}
.product-cell {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.product-cell__name {
  font-weight: 600;
}
.product-cell__meta {
  display: flex;
  gap: 0.75rem;
  font-size: 12px;
  color: #6b7280;
}
:host ::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option {
  min-height: 40px;
}
:host ::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  line-height: 1.25;
}
.add-product-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
}
.add-product-modal {
  width: min(760px, 100vw - 32px);
  max-height: calc(100vh - 48px);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}
.add-product-modal__header {
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.add-product-modal__header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}
.add-product-modal__body {
  padding: 16px;
  overflow-y: auto;
}
.add-product-modal__body > .form-field--full {
  margin-bottom: 12px;
}
.add-product-modal__body > .form-grid {
  margin-bottom: 0;
}
.add-product-modal__footer {
  border-top: 1px solid #e5e7eb;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  background: #f9fafb;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--primary {
  background: #3b82f6;
  color: white;
}
.btn--primary:hover:not(:disabled) {
  background: #2563eb;
}
.btn--secondary {
  background: #f3f4f6;
  color: #374151;
}
.btn--secondary:hover:not(:disabled) {
  background: #e5e7eb;
}
.btn--sm {
  padding: 6px 12px;
  font-size: 12px;
}
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  color: #6b7280;
  transition: all 0.15s;
}
.btn-icon:hover {
  background: #f3f4f6;
  color: #374151;
}
.btn-icon--danger:hover {
  background: #fee2e2;
  color: #dc2626;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}
@media (max-width: 768px) {
  .modal-container {
    max-width: 95vw;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
}
/*# sourceMappingURL=create-purchase-order-modal.component.css.map */
`] }]
  }], () => [{ type: FormBuilder }, { type: PurchaseOrderService }, { type: FiscalConfigurationService }, { type: WarehouseService }, { type: VendorService }, { type: ToastService }, { type: ChangeDetectorRef }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreatePurchaseOrderModalComponent, { className: "CreatePurchaseOrderModalComponent", filePath: "src/app/features/purchase-orders/components/create-purchase-order-modal/create-purchase-order-modal.component.ts", lineNumber: 38 });
})();

// src/app/features/purchase-orders/pages/purchase-order-list/purchase-order-list.component.ts
var _c02 = ["tableTemplate"];
var _forTrack02 = ($index, $item) => $item.id;
function PurchaseOrderListComponent_For_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275listener("click", function PurchaseOrderListComponent_For_72_Template_div_click_0_listener() {
      const order_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.navigateToDetail(order_r3));
    });
    \u0275\u0275elementStart(1, "div", 30)(2, "span", 31);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32)(5, "span", 33);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 34)(8, "div", 13)(9, "div")(10, "strong");
    \u0275\u0275text(11, "Proveedor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "strong");
    \u0275\u0275text(15, "Cedis:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 35)(18, "strong");
    \u0275\u0275text(19, "Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div")(22, "strong");
    \u0275\u0275text(23, "Pago:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 33);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 36);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const order_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", order_r3.folio, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(order_r3.general_status || order_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r3.general_status || order_r3.status, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (order_r3.vendor == null ? null : order_r3.vendor.name) || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (order_r3.warehouse == null ? null : order_r3.warehouse.name) || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r3.formatCurrency(ctx_r3.getOrderTotal(order_r3)));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r3.getPaymentStatusClass(order_r3.payment_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r3.payment_status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatDateHuman(order_r3.created_at));
  }
}
function PurchaseOrderListComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 37)(2, "button", 38);
    \u0275\u0275listener("click", function PurchaseOrderListComponent_Conditional_73_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPageChange({ page: ctx_r3.table_config().page - 1, limit: ctx_r3.table_config().limit }));
    });
    \u0275\u0275text(3, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 38);
    \u0275\u0275listener("click", function PurchaseOrderListComponent_Conditional_73_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPageChange({ page: ctx_r3.table_config().page + 1, limit: ctx_r3.table_config().limit }));
    });
    \u0275\u0275text(7, " Siguiente ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.table_config().page === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" P\xE1gina ", ctx_r3.table_config().page, " de ", ctx_r3.Math.ceil(ctx_r3.table_config().totalResults / ctx_r3.table_config().limit), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.table_config().hasNext);
  }
}
function PurchaseOrderListComponent_ng_template_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 39)(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 40)(4, "p", 41);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 40)(7, "p", 41);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 39)(10, "span", 33);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 39)(13, "p", 42);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 39)(16, "span", 33);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 43)(19, "p", 44);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r6.folio, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((item_r6.vendor == null ? null : item_r6.vendor.name) || "N/A");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((item_r6.warehouse == null ? null : item_r6.warehouse.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(item_r6.general_status || item_r6.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r6.general_status || item_r6.status, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency(ctx_r3.getOrderTotal(item_r6)));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getPaymentStatusClass(item_r6.payment_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r6.payment_status, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.formatDateHuman(item_r6.created_at));
  }
}
var PurchaseOrderListComponent = class _PurchaseOrderListComponent {
  purchaseOrderService;
  warehouseService;
  route;
  router;
  dialog;
  taxCalculator;
  tableTemplate;
  destroyRef = inject(DestroyRef);
  Math = Math;
  // State signals
  ordersData = signal([], ...ngDevMode ? [{ debugName: "ordersData" }] : []);
  filtersState = signal({}, ...ngDevMode ? [{ debugName: "filtersState" }] : []);
  paginationState = signal({ page: 1, limit: 15 }, ...ngDevMode ? [{ debugName: "paginationState" }] : []);
  loadingState = signal(false, ...ngDevMode ? [{ debugName: "loadingState" }] : []);
  totalResultsState = signal(0, ...ngDevMode ? [{ debugName: "totalResultsState" }] : []);
  hasMoreState = signal(true, ...ngDevMode ? [{ debugName: "hasMoreState" }] : []);
  // Table configuration
  table_config = signal({
    rows: [],
    columns: [
      { name: "Folio", prop: "folio", sortable: true, canAutoResize: false, width: 120 },
      { name: "Proveedor", prop: "vendor", sortable: true, canAutoResize: false, width: 150 },
      { name: "Cedis", prop: "warehouse", sortable: false, canAutoResize: false, width: 150 },
      { name: "Estado", prop: "status", sortable: true, canAutoResize: false, width: 120 },
      { name: "Total", prop: "requested_total", sortable: true, canAutoResize: false, width: 120 },
      { name: "Pago", prop: "payment_status", sortable: false, canAutoResize: false, width: 120 },
      { name: "Fecha", prop: "created_at", sortable: true, canAutoResize: false, width: 160 }
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron \xF3rdenes de compra" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  // Public readonly signals
  orders = this.ordersData.asReadonly();
  filters = this.filtersState.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  // Warehouses for filters
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  // Computed: stats
  totalOrders = computed(() => this.totalResultsState(), ...ngDevMode ? [{ debugName: "totalOrders" }] : []);
  totalAmount = computed(() => {
    return this.ordersData().reduce((sum, order) => sum + this.getOrderTotal(order), 0);
  }, ...ngDevMode ? [{ debugName: "totalAmount" }] : []);
  // Status stats
  creadasCount = computed(() => this.ordersData().filter((o) => o.general_status === "Creada").length, ...ngDevMode ? [{ debugName: "creadasCount" }] : []);
  recibidasCount = computed(() => this.ordersData().filter((o) => o.general_status === "Recibida").length, ...ngDevMode ? [{ debugName: "recibidasCount" }] : []);
  canceladasCount = computed(() => this.ordersData().filter((o) => o.general_status === "Cancelada").length, ...ngDevMode ? [{ debugName: "canceladasCount" }] : []);
  creadasAmount = computed(() => this.ordersData().filter((o) => o.general_status === "Creada").reduce((sum, order) => sum + this.getOrderTotal(order), 0), ...ngDevMode ? [{ debugName: "creadasAmount" }] : []);
  recibidasAmount = computed(() => this.ordersData().filter((o) => o.general_status === "Recibida").reduce((sum, order) => sum + this.getOrderTotal(order), 0), ...ngDevMode ? [{ debugName: "recibidasAmount" }] : []);
  canceladasAmount = computed(() => this.ordersData().filter((o) => o.general_status === "Cancelada").reduce((sum, order) => sum + this.getOrderTotal(order), 0), ...ngDevMode ? [{ debugName: "canceladasAmount" }] : []);
  // Payment stats
  pagadasCount = computed(() => this.ordersData().filter((o) => this.isPaymentPaid(o.payment_status)).length, ...ngDevMode ? [{ debugName: "pagadasCount" }] : []);
  parcialesCount = computed(() => this.ordersData().filter((o) => o.payment_status === "Parcial").length, ...ngDevMode ? [{ debugName: "parcialesCount" }] : []);
  pendientesCount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pendiente").length, ...ngDevMode ? [{ debugName: "pendientesCount" }] : []);
  pagadasAmount = computed(() => this.ordersData().filter((o) => this.isPaymentPaid(o.payment_status)).reduce((sum, order) => sum + this.getOrderTotal(order), 0), ...ngDevMode ? [{ debugName: "pagadasAmount" }] : []);
  parcialesAmount = computed(() => this.ordersData().filter((o) => o.payment_status === "Parcial").reduce((sum, order) => sum + this.getOrderTotal(order), 0), ...ngDevMode ? [{ debugName: "parcialesAmount" }] : []);
  pendientesAmount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pendiente").reduce((sum, order) => sum + this.getOrderTotal(order), 0), ...ngDevMode ? [{ debugName: "pendientesAmount" }] : []);
  // Percentages for progress bars
  creadasPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? this.creadasCount() / total * 100 : 0;
  }, ...ngDevMode ? [{ debugName: "creadasPercent" }] : []);
  recibidasPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? this.recibidasCount() / total * 100 : 0;
  }, ...ngDevMode ? [{ debugName: "recibidasPercent" }] : []);
  canceladasPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? this.canceladasCount() / total * 100 : 0;
  }, ...ngDevMode ? [{ debugName: "canceladasPercent" }] : []);
  pagadasPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? this.pagadasCount() / total * 100 : 0;
  }, ...ngDevMode ? [{ debugName: "pagadasPercent" }] : []);
  parcialesPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? this.parcialesCount() / total * 100 : 0;
  }, ...ngDevMode ? [{ debugName: "parcialesPercent" }] : []);
  pendientesPercent = computed(() => {
    const total = this.totalOrders();
    return total > 0 ? this.pendientesCount() / total * 100 : 0;
  }, ...ngDevMode ? [{ debugName: "pendientesPercent" }] : []);
  constructor(purchaseOrderService, warehouseService, route, router, dialog, taxCalculator) {
    this.purchaseOrderService = purchaseOrderService;
    this.warehouseService = warehouseService;
    this.route = route;
    this.router = router;
    this.dialog = dialog;
    this.taxCalculator = taxCalculator;
  }
  ngOnInit() {
    this.loadWarehouses();
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const search = params.get("search")?.trim() || void 0;
      this.filtersState.update((prev) => {
        const next = __spreadValues({}, prev);
        if (search) {
          next.search = search;
        } else {
          delete next.search;
        }
        return next;
      });
      this.paginationState.set({ page: 1, limit: 15 });
      this.loadOrders();
    });
  }
  /**
   * Load orders from API
   */
  loadOrders() {
    this.loadingState.set(true);
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    this.purchaseOrderService.getOrders(this.filtersState(), this.paginationState()).subscribe({
      next: (response) => {
        console.log("Orders response:", response);
        let orders = [];
        let total = 0;
        let hasNext = false;
        if (Array.isArray(response)) {
          orders = response;
          total = orders.length;
          hasNext = false;
        } else if (response.data) {
          orders = response.data;
          total = response.total || response.data.length;
          hasNext = response.page < response.totalPages;
        } else {
          console.error("Unknown response format:", response);
        }
        this.ordersData.set(orders);
        this.totalResultsState.set(total);
        this.hasMoreState.set(hasNext);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: orders,
          totalResults: total,
          hasNext,
          loading: false
        }));
        this.loadingState.set(false);
      },
      error: (error) => {
        console.error("Error loading orders:", error);
        this.loadingState.set(false);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
      }
    });
  }
  /**
   * Load warehouses for filter dropdown
   */
  loadWarehouses() {
    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        console.log("Warehouses response:", warehouses);
        const warehouseArray = Array.isArray(warehouses) ? warehouses : warehouses.data || [];
        this.warehouses.set(warehouseArray);
      },
      error: (error) => {
        console.error("Error loading warehouses:", error);
      }
    });
  }
  /**
   * Apply filters
   */
  applyFilters(filters) {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: 15 });
    const currentSearch = this.route.snapshot.queryParamMap.get("search")?.trim() || void 0;
    const nextSearch = filters.search?.trim() || void 0;
    if (currentSearch !== nextSearch) {
      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { search: nextSearch ?? null },
        queryParamsHandling: "merge",
        replaceUrl: true
      });
      return;
    }
    this.loadOrders();
  }
  /**
   * Handle pagination change
   */
  onPageChange(event) {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadOrders();
  }
  /**
   * Handle sort change
   */
  onSortChange(event) {
    console.log("Sort changed:", event);
  }
  /**
   * Get status badge class
   */
  getStatusClass(status) {
    switch (status) {
      case "Creada":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700";
      case "Recibida":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700";
      case "Cancelada":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700";
      default:
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700";
    }
  }
  /**
   * Get payment status badge class
   */
  getPaymentStatusClass(paymentStatus) {
    if (this.isPaymentPaid(paymentStatus)) {
      return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700";
    }
    switch (paymentStatus) {
      case "Parcial":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700";
      case "Pendiente":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700";
      default:
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700";
    }
  }
  isPaymentPaid(paymentStatus) {
    const normalized = (paymentStatus ?? "").toString().toLowerCase();
    return normalized === "pagada" || normalized === "pagado";
  }
  /**
   * Format currency amount
   */
  formatCurrency(amount) {
    return this.taxCalculator.formatCurrency(amount);
  }
  /**
   * Format date to human readable format (e.g., "Marzo 20 3:33 PM")
   */
  formatDateHuman(date) {
    if (!date)
      return "";
    const d = new Date(date);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const hours = d.getHours() % 12 || 12;
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = d.getHours() >= 12 ? "PM" : "AM";
    return `${month} ${day} ${hours}:${minutes} ${ampm}`;
  }
  /**
   * Get total amount from order
   */
  getOrderTotal(order) {
    return parseFloat(order.requested_total || "0") || 0;
  }
  /**
   * Navigate to order detail
   */
  navigateToDetail(order) {
    this.dialog.open(OrderDetailDialogComponent, __spreadProps(__spreadValues({}, ORDER_DETAIL_DIALOG_OPTIONS), {
      data: { orderId: order.id }
    }));
  }
  /**
   * Navigate to create order
   */
  navigateToCreate() {
    this.dialog.open(CreatePurchaseOrderModalComponent, {
      width: "900px",
      maxWidth: "95vw",
      maxHeight: "90vh",
      panelClass: "create-purchase-order-modal"
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadOrders();
      }
    });
  }
  /**
   * Load more orders (infinite scroll)
   */
  loadMore() {
    if (!this.hasMoreState() || this.loadingState()) {
      return;
    }
    const currentPagination = this.paginationState();
    this.paginationState.set(__spreadProps(__spreadValues({}, currentPagination), {
      page: currentPagination.page + 1
    }));
    this.loadOrders();
  }
  static \u0275fac = function PurchaseOrderListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PurchaseOrderListComponent)(\u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PurchaseOrderListComponent, selectors: [["app-purchase-order-list"]], viewQuery: function PurchaseOrderListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 76, vars: 25, consts: [["tableTemplate", ""], [1, "purchase-order-list-container"], [1, "purchase-content"], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "px-4", "py-2", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", "font-medium", "text-sm", 3, "click"], [1, "mb-4"], [3, "filtersChange", "warehouses", "initialSearch"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6", "mb-6"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-6", "shadow-sm"], [1, "flex", "justify-between", "items-center", "mb-3"], [1, "text-sm", "font-semibold", "text-gray-700"], [1, "text-sm", "text-gray-600"], [1, "border-b", "border-gray-200", "mb-4"], [1, "space-y-4"], [1, "flex", "justify-between", "items-center", "mb-2"], [1, "text-sm", "font-semibold", "text-gray-900"], [1, "w-full", "bg-gray-200", "rounded-full", "h-2", "mb-1"], [1, "bg-blue-500", "h-2", "rounded-full", "transition-all"], [1, "text-xs", "text-gray-500"], [1, "bg-green-500", "h-2", "rounded-full", "transition-all"], [1, "bg-red-500", "h-2", "rounded-full", "transition-all"], [1, "hidden", "md:block"], [3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "block", "md:hidden"], [1, "space-y-3"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm"], [1, "mt-4", "flex", "justify-center"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", 3, "click"], [1, "flex", "justify-between", "items-start", "mb-2", "gap-2"], [1, "inline-flex", "items-center", "px-3", "py-1", "rounded", "text-xs", "font-semibold", "bg-blue-100", "text-blue-700"], [1, "flex", "items-center", "gap-2", "shrink-0"], [3, "ngClass"], [1, "space-y-2"], [1, "mt-2"], [1, "text-xs", "text-gray-500", "mt-1"], [1, "flex", "items-center", "gap-2"], [1, "px-3", "py-1", "text-sm", "border", "rounded", "disabled:opacity-50", 3, "click", "disabled"], [1, "px-2", "py-2", "w-[120px]"], [1, "px-2", "py-2", "w-[150px]"], [1, "truncate", "text-sm", "m-0"], [1, "text-sm", "font-medium", "m-0"], [1, "px-2", "py-2", "w-[160px]"], [1, "text-xs", "m-0"]], template: function PurchaseOrderListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h2", 5);
      \u0275\u0275text(5, "\xD3rdenes de Compra");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 6);
      \u0275\u0275listener("click", function PurchaseOrderListComponent_Template_button_click_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.navigateToCreate());
      });
      \u0275\u0275text(7, " Crear ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 7)(9, "app-filter-bar", 8);
      \u0275\u0275listener("filtersChange", function PurchaseOrderListComponent_Template_app_filter_bar_filtersChange_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 9)(11, "div", 10)(12, "div", 11)(13, "h3", 12);
      \u0275\u0275text(14, "Por Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 13);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(17, "div", 14);
      \u0275\u0275elementStart(18, "div", 15)(19, "div")(20, "div", 16)(21, "span", 13);
      \u0275\u0275text(22, "Creadas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "span", 17);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 18);
      \u0275\u0275element(26, "div", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "p", 20);
      \u0275\u0275text(28);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div")(30, "div", 16)(31, "span", 13);
      \u0275\u0275text(32, "Recibidas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "span", 17);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 18);
      \u0275\u0275element(36, "div", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "p", 20);
      \u0275\u0275text(38);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(39, "div", 10)(40, "div", 11)(41, "h3", 12);
      \u0275\u0275text(42, "Estado de Pago");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "span", 13);
      \u0275\u0275text(44);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(45, "div", 14);
      \u0275\u0275elementStart(46, "div", 15)(47, "div")(48, "div", 16)(49, "span", 13);
      \u0275\u0275text(50, "Pagadas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "span", 17);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 18);
      \u0275\u0275element(54, "div", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "p", 20);
      \u0275\u0275text(56);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "div")(58, "div", 16)(59, "span", 13);
      \u0275\u0275text(60, "Pendientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "span", 17);
      \u0275\u0275text(62);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 18);
      \u0275\u0275element(64, "div", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "p", 20);
      \u0275\u0275text(66);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(67, "div", 23)(68, "app-datatable-wrapper", 24);
      \u0275\u0275listener("pageChange", function PurchaseOrderListComponent_Template_app_datatable_wrapper_pageChange_68_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function PurchaseOrderListComponent_Template_app_datatable_wrapper_sortChange_68_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function PurchaseOrderListComponent_Template_app_datatable_wrapper_rowClick_68_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.navigateToDetail($event.data));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "div", 25)(70, "div", 26);
      \u0275\u0275repeaterCreate(71, PurchaseOrderListComponent_For_72_Template, 28, 9, "div", 27, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(73, PurchaseOrderListComponent_Conditional_73_Template, 8, 4, "div", 28);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(74, PurchaseOrderListComponent_ng_template_74_Template, 21, 9, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r7 = \u0275\u0275reference(75);
      \u0275\u0275advance(9);
      \u0275\u0275property("warehouses", ctx.warehouses())("initialSearch", ctx.filters().search ?? null);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate2("Total: ", ctx.totalOrders(), " (", ctx.formatCurrency(ctx.totalAmount()), ")");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.creadasCount());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.creadasPercent(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.creadasAmount()));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.recibidasCount());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.recibidasPercent(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.recibidasAmount()));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate2("Total: ", ctx.totalOrders(), " (", ctx.formatCurrency(ctx.totalAmount()), ")");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.pagadasCount());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.pagadasPercent(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.pagadasAmount()));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.pendientesCount());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.pendientesPercent(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.pendientesAmount()));
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r7);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.table_config().rows);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.table_config().totalResults > ctx.table_config().limit ? 73 : -1);
    }
  }, dependencies: [CommonModule, NgClass, FilterBarComponent, DatatableWrapperComponent], styles: ["\n\n.purchase-order-list[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n  color: #212529;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 0.95rem;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n  transition: all 0.3s ease;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n.purchase-order-list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.purchase-order-list[_ngcontent-%COMP%]   .dashboard[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-list[_ngcontent-%COMP%]   .filter-bar[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .filter-bar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .filter-bar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.purchase-order-list[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  color: #718096;\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   .order-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n  cursor: pointer;\n  transition: background-color 0.15s;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   .order-row[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   .order-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   .badge.badge-En\\ Proceso[_ngcontent-%COMP%] {\n  background-color: #fef3c7;\n  color: #92400e;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   .badge.badge-Recibida[_ngcontent-%COMP%] {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   .badge.badge-Cancelada[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   .badge.badge-payment-Pagada[_ngcontent-%COMP%] {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   .badge.badge-payment-Parcial[_ngcontent-%COMP%] {\n  background-color: #fed7aa;\n  color: #92400e;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   .badge.badge-payment-No\\ pagado[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-list[_ngcontent-%COMP%]   .orders-table[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%] {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n}\n@media (max-width: 768px) {\n  .purchase-order-list[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .purchase-order-list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n  }\n  .purchase-order-list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    text-align: center;\n  }\n  .purchase-order-list[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=purchase-order-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PurchaseOrderListComponent, [{
    type: Component,
    args: [{ selector: "app-purchase-order-list", standalone: true, imports: [CommonModule, FilterBarComponent, DatatableWrapperComponent], template: `<div class="purchase-order-list-container">
  <div class="purchase-content">
    <div class="px-4">
      <!-- Header -->
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <h2 class="text-2xl font-semibold text-gray-800">\xD3rdenes de Compra</h2>
        <button 
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
          (click)="navigateToCreate()">
          Crear
        </button>
      </div>

      <!-- Filter Bar -->
      <div class="mb-4">
        <app-filter-bar 
          [warehouses]="warehouses()"
          [initialSearch]="filters().search ?? null"
          (filtersChange)="applyFilters($event)">
        </app-filter-bar>
      </div>

      <!-- Stats Dashboard -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Por Estado Card -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-sm font-semibold text-gray-700">Por Estado</h3>
            <span class="text-sm text-gray-600">Total: {{ totalOrders() }} ({{ formatCurrency(totalAmount()) }})</span>
          </div>
          <div class="border-b border-gray-200 mb-4"></div>
          <div class="space-y-4">
            <!-- Creadas -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Creadas</span>
                <span class="text-sm font-semibold text-gray-900">{{ creadasCount() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div class="bg-blue-500 h-2 rounded-full transition-all" [style.width.%]="creadasPercent()"></div>
              </div>
              <p class="text-xs text-gray-500">{{ formatCurrency(creadasAmount()) }}</p>
            </div>
            
            <!-- Recibidas -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Recibidas</span>
                <span class="text-sm font-semibold text-gray-900">{{ recibidasCount() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div class="bg-green-500 h-2 rounded-full transition-all" [style.width.%]="recibidasPercent()"></div>
              </div>
              <p class="text-xs text-gray-500">{{ formatCurrency(recibidasAmount()) }}</p>
            </div>
          </div>
        </div>

        <!-- Estado de Pago Card -->
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-sm font-semibold text-gray-700">Estado de Pago</h3>
            <span class="text-sm text-gray-600">Total: {{ totalOrders() }} ({{ formatCurrency(totalAmount()) }})</span>
          </div>
          <div class="border-b border-gray-200 mb-4"></div>
          <div class="space-y-4">
            <!-- Pagadas -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Pagadas</span>
                <span class="text-sm font-semibold text-gray-900">{{ pagadasCount() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div class="bg-green-500 h-2 rounded-full transition-all" [style.width.%]="pagadasPercent()"></div>
              </div>
              <p class="text-xs text-gray-500">{{ formatCurrency(pagadasAmount()) }}</p>
            </div>
            
            <!-- Pendientes -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">Pendientes</span>
                <span class="text-sm font-semibold text-gray-900">{{ pendientesCount() }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div class="bg-red-500 h-2 rounded-full transition-all" [style.width.%]="pendientesPercent()"></div>
              </div>
              <p class="text-xs text-gray-500">{{ formatCurrency(pendientesAmount()) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Table -->
      <div class="hidden md:block">
        <app-datatable-wrapper
          [config]="table_config()"
          [rowTemplate]="tableTemplate"
          (pageChange)="onPageChange($event)"
          (sortChange)="onSortChange($event)"
          (rowClick)="navigateToDetail($event.data)">
        </app-datatable-wrapper>
      </div>

      <!-- Mobile Cards -->
      <div class="block md:hidden">
        <div class="space-y-3">
          @for (order of table_config().rows; track order.id) {
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" (click)="navigateToDetail(order)">
              <div class="flex justify-between items-start mb-2 gap-2">
                <span class="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                  {{ order.folio }}
                </span>
                <div class="flex items-center gap-2 shrink-0">
                  <span [ngClass]="getStatusClass(order.general_status || order.status)">
                    {{ order.general_status || order.status }}
                  </span>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="text-sm text-gray-600">
                  <div><strong>Proveedor:</strong> {{ order.vendor?.name || 'N/A' }}</div>
                  <div><strong>Cedis:</strong> {{ order.warehouse?.name || 'N/A' }}</div>
                  <div class="mt-2"><strong>Total:</strong> {{ formatCurrency(getOrderTotal(order)) }}</div>
                  <div><strong>Pago:</strong> 
                    <span [ngClass]="getPaymentStatusClass(order.payment_status)">
                      {{ order.payment_status }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ formatDateHuman(order.created_at) }}</div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Mobile Pagination -->
        @if (table_config().totalResults > table_config().limit) {
          <div class="mt-4 flex justify-center">
            <div class="flex items-center gap-2">
              <button 
                [disabled]="table_config().page === 1"
                (click)="onPageChange({page: table_config().page - 1, limit: table_config().limit})"
                class="px-3 py-1 text-sm border rounded disabled:opacity-50">
                Anterior
              </button>
              <span class="text-sm text-gray-600">
                P\xE1gina {{ table_config().page }} de {{ Math.ceil(table_config().totalResults / table_config().limit) }}
              </span>
              <button 
                [disabled]="!table_config().hasNext"
                (click)="onPageChange({page: table_config().page + 1, limit: table_config().limit})"
                class="px-3 py-1 text-sm border rounded disabled:opacity-50">
                Siguiente
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</div>

<ng-template #tableTemplate let-item="$implicit" let-rowIndex="rowIndex">
  <td class="px-2 py-2 w-[120px]">
    <span class="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
      {{ item.folio }}
    </span>
  </td>
  <td class="px-2 py-2 w-[150px]">
    <p class="truncate text-sm m-0">{{ item.vendor?.name || 'N/A' }}</p>
  </td>
  <td class="px-2 py-2 w-[150px]">
    <p class="truncate text-sm m-0">{{ item.warehouse?.name || 'N/A' }}</p>
  </td>
  <td class="px-2 py-2 w-[120px]">
    <span [ngClass]="getStatusClass(item.general_status || item.status)">
      {{ item.general_status || item.status }}
    </span>
  </td>
  <td class="px-2 py-2 w-[120px]">
    <p class="text-sm font-medium m-0">{{ formatCurrency(getOrderTotal(item)) }}</p>
  </td>
  <td class="px-2 py-2 w-[120px]">
    <span [ngClass]="getPaymentStatusClass(item.payment_status)">
      {{ item.payment_status }}
    </span>
  </td>
  <td class="px-2 py-2 w-[160px]">
    <p class="text-xs m-0">{{ formatDateHuman(item.created_at) }}</p>
  </td>
</ng-template>
`, styles: ["/* src/app/features/purchase-orders/pages/purchase-order-list/purchase-order-list.component.scss */\n.purchase-order-list {\n  padding: 2rem;\n}\n.purchase-order-list .header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.purchase-order-list .header h1 {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n  color: #212529;\n}\n.purchase-order-list .header .btn-create {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 0.95rem;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n  transition: all 0.3s ease;\n}\n.purchase-order-list .header .btn-create:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n.purchase-order-list .header .btn-create:active {\n  transform: translateY(0);\n}\n.purchase-order-list .dashboard {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-list .filter-bar {\n  margin-bottom: 1.5rem;\n}\n.purchase-order-list .filter-bar input {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n}\n.purchase-order-list .filter-bar input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.purchase-order-list .loading {\n  text-align: center;\n  padding: 3rem;\n  color: #718096;\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n}\n.purchase-order-list .orders-table {\n  background: white;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.purchase-order-list .orders-table table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.purchase-order-list .orders-table table thead {\n  background-color: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-list .orders-table table thead th {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.purchase-order-list .orders-table table tbody .order-row {\n  border-bottom: 1px solid #e5e7eb;\n  cursor: pointer;\n  transition: background-color 0.15s;\n}\n.purchase-order-list .orders-table table tbody .order-row:hover {\n  background-color: #f9fafb;\n}\n.purchase-order-list .orders-table table tbody .order-row td {\n  padding: 1rem;\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-list .orders-table .badge {\n  display: inline-block;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-list .orders-table .badge.badge-En\\ Proceso {\n  background-color: #fef3c7;\n  color: #92400e;\n}\n.purchase-order-list .orders-table .badge.badge-Recibida {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-list .orders-table .badge.badge-Cancelada {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.purchase-order-list .orders-table .badge.badge-payment-Pagada {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-list .orders-table .badge.badge-payment-Parcial {\n  background-color: #fed7aa;\n  color: #92400e;\n}\n.purchase-order-list .orders-table .badge.badge-payment-No\\ pagado {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-list .orders-table .empty-state {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n}\n@media (max-width: 768px) {\n  .purchase-order-list {\n    padding: 1rem;\n  }\n  .purchase-order-list .header {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n  }\n  .purchase-order-list .header h1 {\n    font-size: 1.5rem;\n    text-align: center;\n  }\n  .purchase-order-list .header .btn-create {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=purchase-order-list.component.css.map */\n"] }]
  }], () => [{ type: PurchaseOrderService }, { type: WarehouseService }, { type: ActivatedRoute }, { type: Router }, { type: MatDialog }, { type: TaxCalculatorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PurchaseOrderListComponent, { className: "PurchaseOrderListComponent", filePath: "src/app/features/purchase-orders/pages/purchase-order-list/purchase-order-list.component.ts", lineNumber: 26 });
})();
export {
  PurchaseOrderListComponent
};
//# sourceMappingURL=chunk-4K6UXRD7.js.map
