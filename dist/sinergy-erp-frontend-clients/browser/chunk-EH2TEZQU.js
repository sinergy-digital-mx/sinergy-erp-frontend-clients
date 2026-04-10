import {
  OrderDetailDialogComponent
} from "./chunk-DVAIDVYL.js";
import {
  PurchaseOrderService
} from "./chunk-SFPCIKZR.js";
import {
  TaxCalculatorService
} from "./chunk-BUMMMPXI.js";
import {
  FiscalConfigurationService,
  VendorService
} from "./chunk-VD2IQ53P.js";
import "./chunk-E2W2JU4V.js";
import "./chunk-FIZPSH25.js";
import {
  WarehouseService
} from "./chunk-E7QIYR5Q.js";
import {
  DatatableWrapperComponent
} from "./chunk-QW7YUBWU.js";
import "./chunk-JWKB62XF.js";
import "./chunk-Y4MZBWJH.js";
import "./chunk-CL7CZJUC.js";
import "./chunk-OC6N764R.js";
import "./chunk-XYBC4MWB.js";
import {
  MatSnackBar
} from "./chunk-KNFYVOET.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
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
} from "./chunk-TXPVZZCM.js";
import {
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  ChangeDetectorRef,
  Component,
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
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
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
} from "./chunk-7ZU2RCPO.js";

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
var FilterBarComponent = class _FilterBarComponent {
  warehouses = [];
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FilterBarComponent, selectors: [["app-filter-bar"]], inputs: { warehouses: "warehouses" }, outputs: { filtersChange: "filtersChange" }, decls: 23, vars: 7, consts: [["role", "search", "aria-label", "Filtros de \xF3rdenes de compra", 1, "filter-bar"], [1, "filter-bar__container"], [1, "filter-bar__field"], ["type", "text", "id", "search", "placeholder", "Buscar...", "aria-label", "Buscar \xF3rdenes por folio, proveedor o prop\xF3sito", 1, "filter-bar__input", 3, "formControl"], ["id", "dateRange", "aria-label", "Filtrar por rango de fecha", 1, "filter-bar__select", 3, "formControl"], ["value", ""], [3, "value"], ["id", "status", "aria-label", "Filtrar por estado de orden", 1, "filter-bar__select", 3, "formControl"], ["id", "warehouse", "aria-label", "Filtrar por almac\xE9n", 1, "filter-bar__select", 3, "formControl"], ["type", "date", "id", "dateFrom", "aria-label", "Filtrar desde fecha", 1, "filter-bar__input", 3, "formControl"], ["type", "date", "id", "dateTo", "aria-label", "Filtrar hasta fecha", 1, "filter-bar__input", 3, "formControl"]], template: function FilterBarComponent_Template(rf, ctx) {
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
      \u0275\u0275elementEnd()()()();
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
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    FormControlDirective
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
  border-radius: 6px;
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
      ReactiveFormsModule
    ], template: '<div class="filter-bar" role="search" aria-label="Filtros de \xF3rdenes de compra">\r\n  <div class="filter-bar__container">\r\n    <!-- Search Input -->\r\n    <div class="filter-bar__field">\r\n      <input\r\n        type="text"\r\n        id="search"\r\n        [formControl]="searchControl"\r\n        placeholder="Buscar..."\r\n        class="filter-bar__input"\r\n        aria-label="Buscar \xF3rdenes por folio, proveedor o prop\xF3sito"\r\n      />\r\n    </div>\r\n\r\n    <!-- Date Range Dropdown -->\r\n    <div class="filter-bar__field">\r\n      <select\r\n        id="dateRange"\r\n        [formControl]="dateRangeControl"\r\n        class="filter-bar__select"\r\n        aria-label="Filtrar por rango de fecha"\r\n      >\r\n        <option value="">Fecha</option>\r\n        @for (option of dateRangeOptions; track option.value) {\r\n          <option [value]="option.value">{{ option.label }}</option>\r\n        }\r\n      </select>\r\n    </div>\r\n\r\n    <!-- Custom Date Range (shown when "Rango" is selected) -->\r\n    @if (showCustomDateRange) {\r\n      <div class="filter-bar__field">\r\n        <input\r\n          type="date"\r\n          id="dateFrom"\r\n          [formControl]="dateFromControl"\r\n          class="filter-bar__input"\r\n          aria-label="Filtrar desde fecha"\r\n        />\r\n      </div>\r\n\r\n      <div class="filter-bar__field">\r\n        <input\r\n          type="date"\r\n          id="dateTo"\r\n          [formControl]="dateToControl"\r\n          class="filter-bar__input"\r\n          aria-label="Filtrar hasta fecha"\r\n        />\r\n      </div>\r\n    }\r\n\r\n    <!-- Status Dropdown -->\r\n    <div class="filter-bar__field">\r\n      <select\r\n        id="status"\r\n        [formControl]="statusControl"\r\n        class="filter-bar__select"\r\n        aria-label="Filtrar por estado de orden"\r\n      >\r\n        <option [value]="null">Todos los estados</option>\r\n        @for (option of statusOptions; track option.value) {\r\n          <option [value]="option.value">{{ option.label }}</option>\r\n        }\r\n      </select>\r\n    </div>\r\n\r\n    <!-- Warehouse Dropdown -->\r\n    <div class="filter-bar__field">\r\n      <select\r\n        id="warehouse"\r\n        [formControl]="warehouseControl"\r\n        class="filter-bar__select"\r\n        aria-label="Filtrar por almac\xE9n"\r\n      >\r\n        <option [value]="null">Todos los almacenes</option>\r\n        @for (warehouse of warehouses; track warehouse.id) {\r\n          <option [value]="warehouse.id">{{ warehouse.name }}</option>\r\n        }\r\n      </select>\r\n    </div>\r\n  </div>\r\n</div>\r\n', styles: [`/* src/app/features/purchase-orders/components/filter-bar/filter-bar.component.scss */
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
  border-radius: 6px;
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
  }], filtersChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FilterBarComponent, { className: "FilterBarComponent", filePath: "src/app/features/purchase-orders/components/filter-bar/filter-bar.component.ts", lineNumber: 19 });
})();

// src/app/features/purchase-orders/components/create-purchase-order-modal/create-purchase-order-modal.component.ts
var _c0 = () => ({ standalone: true });
function CreatePurchaseOrderModalComponent_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const config_r1 = ctx.$implicit;
    \u0275\u0275property("value", config_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", config_r1.razon_social || config_r1.rfc || config_r1.id, " ");
  }
}
function CreatePurchaseOrderModalComponent_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r2 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", warehouse_r2.name, " ");
  }
}
function CreatePurchaseOrderModalComponent_option_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r3 = ctx.$implicit;
    \u0275\u0275property("value", vendor_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vendor_r3.name, " ");
  }
}
function CreatePurchaseOrderModalComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "p");
    \u0275\u0275text(2, "No hay productos agregados. Selecciona un proveedor y agrega productos.");
    \u0275\u0275elementEnd()();
  }
}
function CreatePurchaseOrderModalComponent_div_46_tr_19_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r8 = ctx.$implicit;
    \u0275\u0275property("value", product_r8.product_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", product_r8.product_name, " ");
  }
}
function CreatePurchaseOrderModalComponent_div_46_tr_19_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r9 = ctx.$implicit;
    \u0275\u0275property("value", uom_r9.uom_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", uom_r9.uom_name, " ");
  }
}
function CreatePurchaseOrderModalComponent_div_46_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "select", 31);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_select_ngModelChange_2_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(item_r5.product_id, $event) || (item_r5.product_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_select_change_2_listener() {
      const i_r6 = \u0275\u0275restoreView(_r4).index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r6.onProductChange(i_r6));
    });
    \u0275\u0275elementStart(3, "option", 11);
    \u0275\u0275text(4, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, CreatePurchaseOrderModalComponent_div_46_tr_19_option_5_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "select", 31);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_select_ngModelChange_7_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(item_r5.uom_id, $event) || (item_r5.uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_select_change_7_listener() {
      const i_r6 = \u0275\u0275restoreView(_r4).index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r6.onUomChange(i_r6));
    });
    \u0275\u0275elementStart(8, "option", 11);
    \u0275\u0275text(9, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, CreatePurchaseOrderModalComponent_div_46_tr_19_option_10_Template, 2, 2, "option", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td")(12, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_input_ngModelChange_12_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(item_r5.quantity, $event) || (item_r5.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "input", 33);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_input_ngModelChange_14_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(item_r5.unit_total, $event) || (item_r5.unit_total = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_input_change_14_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r6 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r6.calculateTotals(item_r5));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_input_ngModelChange_16_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(item_r5.iva_percentage, $event) || (item_r5.iva_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_input_change_16_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r6 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r6.calculateTotals(item_r5));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "input", 34);
    \u0275\u0275twoWayListener("ngModelChange", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_input_ngModelChange_18_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      \u0275\u0275twoWayBindingSet(item_r5.ieps_percentage, $event) || (item_r5.ieps_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_input_change_18_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r6 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r6.calculateTotals(item_r5));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td")(20, "button", 35);
    \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_div_46_tr_19_Template_button_click_20_listener() {
      const i_r6 = \u0275\u0275restoreView(_r4).index;
      const ctx_r6 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r6.removeLineItem(i_r6));
    });
    \u0275\u0275element(21, "i", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const i_r6 = ctx.index;
    const ctx_r6 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r5.product_id);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(14, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r6.vendorProducts);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r5.uom_id);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(15, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r6.getProductUoms(i_r6));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r5.quantity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(16, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r5.unit_total);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r5.iva_percentage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(18, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r5.ieps_percentage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c0));
  }
}
function CreatePurchaseOrderModalComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "table")(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Precio Unitario");
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
    \u0275\u0275template(19, CreatePurchaseOrderModalComponent_div_46_tr_19_Template, 22, 20, "tr", 30);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", ctx_r6.lineItems);
  }
}
function CreatePurchaseOrderModalComponent_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Crear Orden");
    \u0275\u0275elementEnd();
  }
}
function CreatePurchaseOrderModalComponent_span_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Creando...");
    \u0275\u0275elementEnd();
  }
}
var CreatePurchaseOrderModalComponent = class _CreatePurchaseOrderModalComponent {
  fb;
  purchaseOrderService;
  fiscalConfigService;
  warehouseService;
  vendorService;
  snackBar;
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
  vendors = [];
  constructor(fb, purchaseOrderService, fiscalConfigService, warehouseService, vendorService, snackBar, cdr, dialogRef, data) {
    this.fb = fb;
    this.purchaseOrderService = purchaseOrderService;
    this.fiscalConfigService = fiscalConfigService;
    this.warehouseService = warehouseService;
    this.vendorService = vendorService;
    this.snackBar = snackBar;
    this.cdr = cdr;
    this.dialogRef = dialogRef;
    this.data = data;
    this.form = this.fb.group({
      fiscal_configuration_id: ["", Validators.required],
      warehouse_id: ["", Validators.required],
      vendor_id: ["", Validators.required],
      expected_delivery_date: ["", Validators.required],
      payment_status: ["Pendiente", Validators.required],
      notes: [""]
    });
  }
  ngOnInit() {
    this.loadDropdownData();
  }
  loadDropdownData() {
    this.loading = true;
    Promise.all([
      this.fiscalConfigService.listFiscalConfigurations().toPromise(),
      this.warehouseService.getWarehouses().toPromise(),
      this.vendorService.getVendors().toPromise()
    ]).then(([fiscalConfigs, warehouses, vendors]) => {
      this.fiscalConfigurations = fiscalConfigs?.data || [];
      this.warehouses = warehouses?.data || [];
      this.vendors = vendors?.data || [];
      this.loading = false;
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error("Error loading dropdown data:", error);
      this.snackBar.open("Error al cargar datos", "Cerrar", { duration: 3e3 });
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
  onVendorChange() {
    const vendorId = this.form.get("vendor_id")?.value;
    if (!vendorId) {
      this.vendorProducts = [];
      return;
    }
    this.loadingProducts = true;
    this.purchaseOrderService.getVendorProducts(vendorId).subscribe({
      next: (products) => {
        this.vendorProducts = products;
        this.loadingProducts = false;
      },
      error: (error) => {
        console.error("Error loading vendor products:", error);
        this.snackBar.open("Error al cargar productos del proveedor", "Cerrar", { duration: 3e3 });
        this.loadingProducts = false;
      }
    });
  }
  addLineItem() {
    const newItem = {
      product_id: "",
      uom_id: "",
      quantity: 1,
      unit_total: 0,
      iva_percentage: 16,
      iva_unit: 0,
      ieps_percentage: 0,
      ieps_unit: 0
    };
    this.lineItems.push(newItem);
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
      this.snackBar.open("Por favor completa todos los campos y agrega al menos un producto", "Cerrar", { duration: 3e3 });
      return;
    }
    this.saving = true;
    const formData = __spreadProps(__spreadValues({}, this.form.value), {
      line_items: this.lineItems
    });
    this.purchaseOrderService.createOrder(formData).subscribe({
      next: (order) => {
        this.saving = false;
        this.cdr.detectChanges();
        this.snackBar.open("Orden de compra creada exitosamente", "Cerrar", { duration: 3e3 });
        this.dialogRef.close(order);
      },
      error: (error) => {
        this.saving = false;
        this.cdr.detectChanges();
        console.error("Error creating order:", error);
        const errorMessage = error.error?.message || "Error al crear la orden de compra";
        this.snackBar.open(errorMessage, "Cerrar", { duration: 5e3 });
      }
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function CreatePurchaseOrderModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreatePurchaseOrderModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(VendorService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreatePurchaseOrderModalComponent, selectors: [["app-create-purchase-order-modal"]], decls: 53, vars: 10, consts: [[1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "currentColor"], ["d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"], [1, "modal-content"], [3, "formGroup"], [1, "form-grid"], [1, "form-field", "form-field--full"], [1, "form-label"], ["formControlName", "fiscal_configuration_id", 1, "form-select"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-field"], ["formControlName", "warehouse_id", 1, "form-select"], ["formControlName", "vendor_id", 1, "form-select", 3, "change"], ["type", "date", "formControlName", "expected_delivery_date", 1, "form-input"], ["formControlName", "notes", "placeholder", "Notas opcionales", "rows", "3", 1, "form-textarea"], [1, "line-items-section"], [1, "section-header"], ["type", "button", 1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], ["class", "empty-state", 4, "ngIf"], ["class", "line-items-table", 4, "ngIf"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [4, "ngIf"], [3, "value"], [1, "empty-state"], [1, "line-items-table"], [4, "ngFor", "ngForOf"], [1, "form-select", "form-select--inline", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "number", "min", "0.01", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "max", "100", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "button", "title", "Eliminar", 1, "btn-icon", "btn-icon--danger", 3, "click"], [1, "fi", "fi-rr-trash"]], template: function CreatePurchaseOrderModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Crear Orden de Compra");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Template_button_click_4_listener() {
        return ctx.cancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 3);
      \u0275\u0275element(6, "path", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 5)(8, "form", 6)(9, "div", 7)(10, "div", 8)(11, "label", 9);
      \u0275\u0275text(12, "CONFIGURACI\xD3N FISCAL *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "select", 10)(14, "option", 11);
      \u0275\u0275text(15, "Selecciona una configuraci\xF3n fiscal");
      \u0275\u0275elementEnd();
      \u0275\u0275template(16, CreatePurchaseOrderModalComponent_option_16_Template, 2, 2, "option", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 13)(18, "label", 9);
      \u0275\u0275text(19, "ALMAC\xC9N *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "select", 14)(21, "option", 11);
      \u0275\u0275text(22, "Selecciona un almac\xE9n");
      \u0275\u0275elementEnd();
      \u0275\u0275template(23, CreatePurchaseOrderModalComponent_option_23_Template, 2, 2, "option", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 13)(25, "label", 9);
      \u0275\u0275text(26, "PROVEEDOR *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "select", 15);
      \u0275\u0275listener("change", function CreatePurchaseOrderModalComponent_Template_select_change_27_listener() {
        return ctx.onVendorChange();
      });
      \u0275\u0275elementStart(28, "option", 11);
      \u0275\u0275text(29, "Selecciona un proveedor");
      \u0275\u0275elementEnd();
      \u0275\u0275template(30, CreatePurchaseOrderModalComponent_option_30_Template, 2, 2, "option", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 13)(32, "label", 9);
      \u0275\u0275text(33, "FECHA ESPERADA DE ENTREGA *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 8)(36, "label", 9);
      \u0275\u0275text(37, "NOTAS");
      \u0275\u0275elementEnd();
      \u0275\u0275element(38, "textarea", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div", 18)(40, "div", 19)(41, "h3");
      \u0275\u0275text(42, "Productos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "button", 20);
      \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Template_button_click_43_listener() {
        return ctx.addLineItem();
      });
      \u0275\u0275text(44, " + Agregar Producto ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(45, CreatePurchaseOrderModalComponent_div_45_Template, 3, 0, "div", 21)(46, CreatePurchaseOrderModalComponent_div_46_Template, 20, 1, "div", 22);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "div", 23)(48, "button", 24);
      \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Template_button_click_48_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(49, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "button", 25);
      \u0275\u0275listener("click", function CreatePurchaseOrderModalComponent_Template_button_click_50_listener() {
        return ctx.save();
      });
      \u0275\u0275template(51, CreatePurchaseOrderModalComponent_span_51_Template, 2, 0, "span", 26)(52, CreatePurchaseOrderModalComponent_span_52_Template, 2, 0, "span", 26);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_4_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngForOf", ctx.fiscalConfigurations);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.warehouses);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.vendors);
      \u0275\u0275advance(13);
      \u0275\u0275property("disabled", !((tmp_4_0 = ctx.form.get("vendor_id")) == null ? null : tmp_4_0.value));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.lineItems.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.lineItems.length > 0);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.saving);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.saving);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.saving);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: [`

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
    args: [{ selector: "app-create-purchase-order-modal", standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule], template: `<div class="modal-container">\r
  <!-- Header -->\r
  <div class="modal-header">\r
    <h2>Crear Orden de Compra</h2>\r
    <button class="close-btn" (click)="cancel()" type="button">\r
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\r
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <!-- Content -->\r
  <div class="modal-content">\r
    <form [formGroup]="form">\r
      <!-- Form Grid -->\r
      <div class="form-grid">\r
        <!-- Fiscal Configuration -->\r
        <div class="form-field form-field--full">\r
          <label class="form-label">CONFIGURACI\xD3N FISCAL *</label>\r
          <select class="form-select" formControlName="fiscal_configuration_id">\r
            <option value="">Selecciona una configuraci\xF3n fiscal</option>\r
            <option *ngFor="let config of fiscalConfigurations" [value]="config.id">\r
              {{ config.razon_social || config.rfc || config.id }}\r
            </option>\r
          </select>\r
        </div>\r
\r
        <!-- Warehouse -->\r
        <div class="form-field">\r
          <label class="form-label">ALMAC\xC9N *</label>\r
          <select class="form-select" formControlName="warehouse_id">\r
            <option value="">Selecciona un almac\xE9n</option>\r
            <option *ngFor="let warehouse of warehouses" [value]="warehouse.id">\r
              {{ warehouse.name }}\r
            </option>\r
          </select>\r
        </div>\r
\r
        <!-- Vendor -->\r
        <div class="form-field">\r
          <label class="form-label">PROVEEDOR *</label>\r
          <select class="form-select" formControlName="vendor_id" (change)="onVendorChange()">\r
            <option value="">Selecciona un proveedor</option>\r
            <option *ngFor="let vendor of vendors" [value]="vendor.id">\r
              {{ vendor.name }}\r
            </option>\r
          </select>\r
        </div>\r
\r
        <!-- Expected Delivery Date -->\r
        <div class="form-field">\r
          <label class="form-label">FECHA ESPERADA DE ENTREGA *</label>\r
          <input type="date" class="form-input" formControlName="expected_delivery_date">\r
        </div>\r
\r
        <!-- Notes -->\r
        <div class="form-field form-field--full">\r
          <label class="form-label">NOTAS</label>\r
          <textarea class="form-textarea" formControlName="notes" placeholder="Notas opcionales" rows="3"></textarea>\r
        </div>\r
      </div>\r
\r
      <!-- Line Items Section -->\r
      <div class="line-items-section">\r
        <div class="section-header">\r
          <h3>Productos</h3>\r
          <button type="button" class="btn btn--sm btn--primary" (click)="addLineItem()" [disabled]="!form.get('vendor_id')?.value">\r
            + Agregar Producto\r
          </button>\r
        </div>\r
\r
        <div *ngIf="lineItems.length === 0" class="empty-state">\r
          <p>No hay productos agregados. Selecciona un proveedor y agrega productos.</p>\r
        </div>\r
\r
        <div *ngIf="lineItems.length > 0" class="line-items-table">\r
          <table>\r
            <thead>\r
              <tr>\r
                <th>Producto</th>\r
                <th>UOM</th>\r
                <th>Cantidad</th>\r
                <th>Precio Unitario</th>\r
                <th>IVA %</th>\r
                <th>IEPS %</th>\r
                <th>Acciones</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              <tr *ngFor="let item of lineItems; let i = index">\r
                <td>\r
                  <select class="form-select form-select--inline" [(ngModel)]="item.product_id" [ngModelOptions]="{standalone: true}" (change)="onProductChange(i)">\r
                    <option value="">Seleccionar...</option>\r
                    <option *ngFor="let product of vendorProducts" [value]="product.product_id">\r
                      {{ product.product_name }}\r
                    </option>\r
                  </select>\r
                </td>\r
                <td>\r
                  <select class="form-select form-select--inline" [(ngModel)]="item.uom_id" [ngModelOptions]="{standalone: true}" (change)="onUomChange(i)">\r
                    <option value="">Seleccionar...</option>\r
                    <option *ngFor="let uom of getProductUoms(i)" [value]="uom.uom_id">\r
                      {{ uom.uom_name }}\r
                    </option>\r
                  </select>\r
                </td>\r
                <td>\r
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="item.quantity" [ngModelOptions]="{standalone: true}" min="0.01" step="0.01">\r
                </td>\r
                <td>\r
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="item.unit_total" [ngModelOptions]="{standalone: true}" (change)="calculateTotals(item)" min="0" step="0.01">\r
                </td>\r
                <td>\r
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="item.iva_percentage" [ngModelOptions]="{standalone: true}" min="0" max="100" step="0.01" (change)="calculateTotals(item)">\r
                </td>\r
                <td>\r
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="item.ieps_percentage" [ngModelOptions]="{standalone: true}" min="0" max="100" step="0.01" (change)="calculateTotals(item)">\r
                </td>\r
                <td>\r
                  <button type="button" class="btn-icon btn-icon--danger" (click)="removeLineItem(i)" title="Eliminar">\r
                    <i class="fi fi-rr-trash"></i>\r
                  </button>\r
                </td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <!-- Footer -->\r
  <div class="modal-footer">\r
    <button class="btn btn--secondary" (click)="cancel()" type="button">Cancelar</button>\r
    <button class="btn btn--primary" (click)="save()" [disabled]="saving" type="button">\r
      <span *ngIf="!saving">Crear Orden</span>\r
      <span *ngIf="saving">Creando...</span>\r
    </button>\r
  </div>\r
</div>\r
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
  }], () => [{ type: FormBuilder }, { type: PurchaseOrderService }, { type: FiscalConfigurationService }, { type: WarehouseService }, { type: VendorService }, { type: MatSnackBar }, { type: ChangeDetectorRef }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreatePurchaseOrderModalComponent, { className: "CreatePurchaseOrderModalComponent", filePath: "src/app/features/purchase-orders/components/create-purchase-order-modal/create-purchase-order-modal.component.ts", lineNumber: 29 });
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
    \u0275\u0275elementStart(4, "span", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33)(7, "div", 13)(8, "div")(9, "strong");
    \u0275\u0275text(10, "Proveedor:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "strong");
    \u0275\u0275text(14, "Cedis:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 34)(17, "strong");
    \u0275\u0275text(18, "Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div")(21, "strong");
    \u0275\u0275text(22, "Pago:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 32);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 35);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const order_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", order_r3.folio, " ");
    \u0275\u0275advance();
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
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 36)(2, "button", 37);
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
    \u0275\u0275elementStart(6, "button", 37);
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
    \u0275\u0275elementStart(0, "td", 38)(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 39)(4, "p", 40);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 39)(7, "p", 40);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 38)(10, "span", 32);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 38)(13, "p", 41);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 38)(16, "span", 32);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 42)(19, "p", 43);
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
  router;
  dialog;
  taxCalculator;
  tableTemplate;
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
  pagadasCount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pagada").length, ...ngDevMode ? [{ debugName: "pagadasCount" }] : []);
  parcialesCount = computed(() => this.ordersData().filter((o) => o.payment_status === "Parcial").length, ...ngDevMode ? [{ debugName: "parcialesCount" }] : []);
  pendientesCount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pendiente").length, ...ngDevMode ? [{ debugName: "pendientesCount" }] : []);
  pagadasAmount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pagada").reduce((sum, order) => sum + this.getOrderTotal(order), 0), ...ngDevMode ? [{ debugName: "pagadasAmount" }] : []);
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
  constructor(purchaseOrderService, warehouseService, router, dialog, taxCalculator) {
    this.purchaseOrderService = purchaseOrderService;
    this.warehouseService = warehouseService;
    this.router = router;
    this.dialog = dialog;
    this.taxCalculator = taxCalculator;
  }
  ngOnInit() {
    this.loadOrders();
    this.loadWarehouses();
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
    switch (paymentStatus) {
      case "Pagada":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700";
      case "Parcial":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700";
      case "Pendiente":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700";
      default:
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700";
    }
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
    this.dialog.open(OrderDetailDialogComponent, {
      data: { orderId: order.id },
      width: "1400px",
      maxWidth: "95vw",
      height: "90vh",
      maxHeight: "90vh",
      panelClass: "order-detail-dialog-container"
    });
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
    return new (__ngFactoryType__ || _PurchaseOrderListComponent)(\u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PurchaseOrderListComponent, selectors: [["app-purchase-order-list"]], viewQuery: function PurchaseOrderListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 76, vars: 24, consts: [["tableTemplate", ""], [1, "purchase-order-list-container"], [1, "purchase-content"], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "px-4", "py-2", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", "font-medium", "text-sm", 3, "click"], [1, "mb-4"], [3, "filtersChange", "warehouses"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6", "mb-6"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-6", "shadow-sm"], [1, "flex", "justify-between", "items-center", "mb-3"], [1, "text-sm", "font-semibold", "text-gray-700"], [1, "text-sm", "text-gray-600"], [1, "border-b", "border-gray-200", "mb-4"], [1, "space-y-4"], [1, "flex", "justify-between", "items-center", "mb-2"], [1, "text-sm", "font-semibold", "text-gray-900"], [1, "w-full", "bg-gray-200", "rounded-full", "h-2", "mb-1"], [1, "bg-blue-500", "h-2", "rounded-full", "transition-all"], [1, "text-xs", "text-gray-500"], [1, "bg-green-500", "h-2", "rounded-full", "transition-all"], [1, "bg-red-500", "h-2", "rounded-full", "transition-all"], [1, "hidden", "md:block"], [3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "block", "md:hidden"], [1, "space-y-3"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm"], [1, "mt-4", "flex", "justify-center"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", 3, "click"], [1, "flex", "justify-between", "items-start", "mb-2"], [1, "inline-flex", "items-center", "px-3", "py-1", "rounded", "text-xs", "font-semibold", "bg-blue-100", "text-blue-700"], [3, "ngClass"], [1, "space-y-2"], [1, "mt-2"], [1, "text-xs", "text-gray-500", "mt-1"], [1, "flex", "items-center", "gap-2"], [1, "px-3", "py-1", "text-sm", "border", "rounded", "disabled:opacity-50", 3, "click", "disabled"], [1, "px-2", "py-2", "w-[120px]"], [1, "px-2", "py-2", "w-[150px]"], [1, "truncate", "text-sm", "m-0"], [1, "text-sm", "font-medium", "m-0"], [1, "px-2", "py-2", "w-[160px]"], [1, "text-xs", "m-0"]], template: function PurchaseOrderListComponent_Template(rf, ctx) {
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
      \u0275\u0275repeaterCreate(71, PurchaseOrderListComponent_For_72_Template, 27, 9, "div", 27, _forTrack02);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(73, PurchaseOrderListComponent_Conditional_73_Template, 8, 4, "div", 28);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(74, PurchaseOrderListComponent_ng_template_74_Template, 21, 9, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r7 = \u0275\u0275reference(75);
      \u0275\u0275advance(9);
      \u0275\u0275property("warehouses", ctx.warehouses());
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
    args: [{ selector: "app-purchase-order-list", standalone: true, imports: [CommonModule, FilterBarComponent, DatatableWrapperComponent], template: `<div class="purchase-order-list-container">\r
  <div class="purchase-content">\r
    <div class="px-4">\r
      <!-- Header -->\r
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
        <h2 class="text-2xl font-semibold text-gray-800">\xD3rdenes de Compra</h2>\r
        <button \r
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"\r
          (click)="navigateToCreate()">\r
          Crear\r
        </button>\r
      </div>\r
\r
      <!-- Filter Bar -->\r
      <div class="mb-4">\r
        <app-filter-bar \r
          [warehouses]="warehouses()"\r
          (filtersChange)="applyFilters($event)">\r
        </app-filter-bar>\r
      </div>\r
\r
      <!-- Stats Dashboard -->\r
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">\r
        <!-- Por Estado Card -->\r
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">\r
          <div class="flex justify-between items-center mb-3">\r
            <h3 class="text-sm font-semibold text-gray-700">Por Estado</h3>\r
            <span class="text-sm text-gray-600">Total: {{ totalOrders() }} ({{ formatCurrency(totalAmount()) }})</span>\r
          </div>\r
          <div class="border-b border-gray-200 mb-4"></div>\r
          <div class="space-y-4">\r
            <!-- Creadas -->\r
            <div>\r
              <div class="flex justify-between items-center mb-2">\r
                <span class="text-sm text-gray-600">Creadas</span>\r
                <span class="text-sm font-semibold text-gray-900">{{ creadasCount() }}</span>\r
              </div>\r
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">\r
                <div class="bg-blue-500 h-2 rounded-full transition-all" [style.width.%]="creadasPercent()"></div>\r
              </div>\r
              <p class="text-xs text-gray-500">{{ formatCurrency(creadasAmount()) }}</p>\r
            </div>\r
            \r
            <!-- Recibidas -->\r
            <div>\r
              <div class="flex justify-between items-center mb-2">\r
                <span class="text-sm text-gray-600">Recibidas</span>\r
                <span class="text-sm font-semibold text-gray-900">{{ recibidasCount() }}</span>\r
              </div>\r
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">\r
                <div class="bg-green-500 h-2 rounded-full transition-all" [style.width.%]="recibidasPercent()"></div>\r
              </div>\r
              <p class="text-xs text-gray-500">{{ formatCurrency(recibidasAmount()) }}</p>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Estado de Pago Card -->\r
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">\r
          <div class="flex justify-between items-center mb-3">\r
            <h3 class="text-sm font-semibold text-gray-700">Estado de Pago</h3>\r
            <span class="text-sm text-gray-600">Total: {{ totalOrders() }} ({{ formatCurrency(totalAmount()) }})</span>\r
          </div>\r
          <div class="border-b border-gray-200 mb-4"></div>\r
          <div class="space-y-4">\r
            <!-- Pagadas -->\r
            <div>\r
              <div class="flex justify-between items-center mb-2">\r
                <span class="text-sm text-gray-600">Pagadas</span>\r
                <span class="text-sm font-semibold text-gray-900">{{ pagadasCount() }}</span>\r
              </div>\r
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">\r
                <div class="bg-green-500 h-2 rounded-full transition-all" [style.width.%]="pagadasPercent()"></div>\r
              </div>\r
              <p class="text-xs text-gray-500">{{ formatCurrency(pagadasAmount()) }}</p>\r
            </div>\r
            \r
            <!-- Pendientes -->\r
            <div>\r
              <div class="flex justify-between items-center mb-2">\r
                <span class="text-sm text-gray-600">Pendientes</span>\r
                <span class="text-sm font-semibold text-gray-900">{{ pendientesCount() }}</span>\r
              </div>\r
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">\r
                <div class="bg-red-500 h-2 rounded-full transition-all" [style.width.%]="pendientesPercent()"></div>\r
              </div>\r
              <p class="text-xs text-gray-500">{{ formatCurrency(pendientesAmount()) }}</p>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Desktop Table -->\r
      <div class="hidden md:block">\r
        <app-datatable-wrapper\r
          [config]="table_config()"\r
          [rowTemplate]="tableTemplate"\r
          (pageChange)="onPageChange($event)"\r
          (sortChange)="onSortChange($event)"\r
          (rowClick)="navigateToDetail($event.data)">\r
        </app-datatable-wrapper>\r
      </div>\r
\r
      <!-- Mobile Cards -->\r
      <div class="block md:hidden">\r
        <div class="space-y-3">\r
          @for (order of table_config().rows; track order.id) {\r
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" (click)="navigateToDetail(order)">\r
              <div class="flex justify-between items-start mb-2">\r
                <span class="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">\r
                  {{ order.folio }}\r
                </span>\r
                <span [ngClass]="getStatusClass(order.general_status || order.status)">\r
                  {{ order.general_status || order.status }}\r
                </span>\r
              </div>\r
              \r
              <div class="space-y-2">\r
                <div class="text-sm text-gray-600">\r
                  <div><strong>Proveedor:</strong> {{ order.vendor?.name || 'N/A' }}</div>\r
                  <div><strong>Cedis:</strong> {{ order.warehouse?.name || 'N/A' }}</div>\r
                  <div class="mt-2"><strong>Total:</strong> {{ formatCurrency(getOrderTotal(order)) }}</div>\r
                  <div><strong>Pago:</strong> \r
                    <span [ngClass]="getPaymentStatusClass(order.payment_status)">\r
                      {{ order.payment_status }}\r
                    </span>\r
                  </div>\r
                  <div class="text-xs text-gray-500 mt-1">{{ formatDateHuman(order.created_at) }}</div>\r
                </div>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
\r
        <!-- Mobile Pagination -->\r
        @if (table_config().totalResults > table_config().limit) {\r
          <div class="mt-4 flex justify-center">\r
            <div class="flex items-center gap-2">\r
              <button \r
                [disabled]="table_config().page === 1"\r
                (click)="onPageChange({page: table_config().page - 1, limit: table_config().limit})"\r
                class="px-3 py-1 text-sm border rounded disabled:opacity-50">\r
                Anterior\r
              </button>\r
              <span class="text-sm text-gray-600">\r
                P\xE1gina {{ table_config().page }} de {{ Math.ceil(table_config().totalResults / table_config().limit) }}\r
              </span>\r
              <button \r
                [disabled]="!table_config().hasNext"\r
                (click)="onPageChange({page: table_config().page + 1, limit: table_config().limit})"\r
                class="px-3 py-1 text-sm border rounded disabled:opacity-50">\r
                Siguiente\r
              </button>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit" let-rowIndex="rowIndex">\r
  <td class="px-2 py-2 w-[120px]">\r
    <span class="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">\r
      {{ item.folio }}\r
    </span>\r
  </td>\r
  <td class="px-2 py-2 w-[150px]">\r
    <p class="truncate text-sm m-0">{{ item.vendor?.name || 'N/A' }}</p>\r
  </td>\r
  <td class="px-2 py-2 w-[150px]">\r
    <p class="truncate text-sm m-0">{{ item.warehouse?.name || 'N/A' }}</p>\r
  </td>\r
  <td class="px-2 py-2 w-[120px]">\r
    <span [ngClass]="getStatusClass(item.general_status || item.status)">\r
      {{ item.general_status || item.status }}\r
    </span>\r
  </td>\r
  <td class="px-2 py-2 w-[120px]">\r
    <p class="text-sm font-medium m-0">{{ formatCurrency(getOrderTotal(item)) }}</p>\r
  </td>\r
  <td class="px-2 py-2 w-[120px]">\r
    <span [ngClass]="getPaymentStatusClass(item.payment_status)">\r
      {{ item.payment_status }}\r
    </span>\r
  </td>\r
  <td class="px-2 py-2 w-[160px]">\r
    <p class="text-xs m-0">{{ formatDateHuman(item.created_at) }}</p>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/purchase-orders/pages/purchase-order-list/purchase-order-list.component.scss */\n.purchase-order-list {\n  padding: 2rem;\n}\n.purchase-order-list .header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.purchase-order-list .header h1 {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n  color: #212529;\n}\n.purchase-order-list .header .btn-create {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 0.95rem;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n  transition: all 0.3s ease;\n}\n.purchase-order-list .header .btn-create:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n}\n.purchase-order-list .header .btn-create:active {\n  transform: translateY(0);\n}\n.purchase-order-list .dashboard {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-list .filter-bar {\n  margin-bottom: 1.5rem;\n}\n.purchase-order-list .filter-bar input {\n  width: 100%;\n  padding: 0.5rem 1rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n}\n.purchase-order-list .filter-bar input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.purchase-order-list .loading {\n  text-align: center;\n  padding: 3rem;\n  color: #718096;\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n}\n.purchase-order-list .orders-table {\n  background: white;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.purchase-order-list .orders-table table {\n  width: 100%;\n  border-collapse: collapse;\n}\n.purchase-order-list .orders-table table thead {\n  background-color: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-list .orders-table table thead th {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.purchase-order-list .orders-table table tbody .order-row {\n  border-bottom: 1px solid #e5e7eb;\n  cursor: pointer;\n  transition: background-color 0.15s;\n}\n.purchase-order-list .orders-table table tbody .order-row:hover {\n  background-color: #f9fafb;\n}\n.purchase-order-list .orders-table table tbody .order-row td {\n  padding: 1rem;\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-list .orders-table .badge {\n  display: inline-block;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-list .orders-table .badge.badge-En\\ Proceso {\n  background-color: #fef3c7;\n  color: #92400e;\n}\n.purchase-order-list .orders-table .badge.badge-Recibida {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-list .orders-table .badge.badge-Cancelada {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.purchase-order-list .orders-table .badge.badge-payment-Pagada {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-list .orders-table .badge.badge-payment-Parcial {\n  background-color: #fed7aa;\n  color: #92400e;\n}\n.purchase-order-list .orders-table .badge.badge-payment-No\\ pagado {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-list .orders-table .empty-state {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n}\n@media (max-width: 768px) {\n  .purchase-order-list {\n    padding: 1rem;\n  }\n  .purchase-order-list .header {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n  }\n  .purchase-order-list .header h1 {\n    font-size: 1.5rem;\n    text-align: center;\n  }\n  .purchase-order-list .header .btn-create {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=purchase-order-list.component.css.map */\n"] }]
  }], () => [{ type: PurchaseOrderService }, { type: WarehouseService }, { type: Router }, { type: MatDialog }, { type: TaxCalculatorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PurchaseOrderListComponent, { className: "PurchaseOrderListComponent", filePath: "src/app/features/purchase-orders/pages/purchase-order-list/purchase-order-list.component.ts", lineNumber: 24 });
})();
export {
  PurchaseOrderListComponent
};
//# sourceMappingURL=chunk-EH2TEZQU.js.map
