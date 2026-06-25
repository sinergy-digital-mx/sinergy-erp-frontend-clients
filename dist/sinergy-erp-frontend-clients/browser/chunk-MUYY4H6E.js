import {
  CreateSalesOrderModalComponent,
  SalesOrderDetailDialogComponent,
  getCustomerDisplayName
} from "./chunk-3OE3M6VE.js";
import {
  SalesOrderService
} from "./chunk-L362XIH3.js";
import {
  ORDER_DETAIL_DIALOG_OPTIONS
} from "./chunk-DJEHDYUN.js";
import {
  TaxCalculatorService
} from "./chunk-QOH5WOHA.js";
import "./chunk-VHDD6BSX.js";
import "./chunk-I7WEELU2.js";
import "./chunk-BXITMCQU.js";
import "./chunk-UZFR75UC.js";
import "./chunk-K6DFM2KE.js";
import "./chunk-HSRMLKO4.js";
import "./chunk-7NOV6VIM.js";
import "./chunk-QRPNSPBU.js";
import "./chunk-RGTVHKC4.js";
import {
  WarehouseService
} from "./chunk-DJ4GYXTA.js";
import {
  DatatableWrapperComponent
} from "./chunk-L47FLSDR.js";
import "./chunk-X6OR7TZF.js";
import "./chunk-L4EQ5WDD.js";
import "./chunk-YFLVEXO5.js";
import {
  MatDialog
} from "./chunk-AL73GUEM.js";
import "./chunk-GQ2LOQST.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  NgControlStatus,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-HNVE2F7I.js";
import "./chunk-B4R54IPF.js";
import "./chunk-CYJDZ4ZT.js";
import {
  MatSnackBar
} from "./chunk-IP3VK3BQ.js";
import "./chunk-BMQ5UVGT.js";
import "./chunk-34Z4N5YB.js";
import "./chunk-B7UOHVOJ.js";
import "./chunk-55FJTJJ6.js";
import {
  CommonModule,
  NgClass
} from "./chunk-BMMLV6YT.js";
import {
  Component,
  EventEmitter,
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
  ɵɵnextContext,
  ɵɵproperty,
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
  ɵɵviewQuery
} from "./chunk-57S27ROJ.js";

// src/app/features/sales-orders/components/sales-filter-bar/sales-filter-bar.component.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function SalesFilterBarComponent_For_9_Template(rf, ctx) {
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
function SalesFilterBarComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "input", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 2);
    \u0275\u0275element(3, "input", 7);
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
function SalesFilterBarComponent_For_16_Template(rf, ctx) {
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
function SalesFilterBarComponent_For_22_Template(rf, ctx) {
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
var SalesFilterBarComponent = class _SalesFilterBarComponent {
  warehouses = [];
  filtersChange = new EventEmitter();
  searchControl = new FormControl("", { nonNullable: true });
  dateRangeControl = new FormControl("", { nonNullable: true });
  dateFromControl = new FormControl("", { nonNullable: true });
  dateToControl = new FormControl("", { nonNullable: true });
  statusControl = new FormControl(null);
  warehouseControl = new FormControl(null);
  dateRangeOptions = [
    { label: "Hoy", value: "today" },
    { label: "Semana", value: "week" },
    { label: "Mes", value: "month" },
    { label: "Rango", value: "range" }
  ];
  showCustomDateRange = false;
  statusOptions = [
    { label: "Creada", value: "Creada" },
    { label: "Surtida", value: "Surtida" },
    { label: "Cancelada", value: "Cancelada" }
  ];
  destroy$ = new Subject();
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.emitFilters());
    this.dateRangeControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => this.onDateRangeChange(v));
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
    if (dateFrom && dateTo) {
      this.dateFromControl.setValue(this.fmt(dateFrom), { emitEvent: false });
      this.dateToControl.setValue(this.fmt(dateTo), { emitEvent: false });
      this.emitFilters();
    }
  }
  fmt(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  emitFilters() {
    const filters = {};
    const search = this.searchControl.value.trim();
    if (search)
      filters.search = search;
    const dateFrom = this.dateFromControl.value;
    if (dateFrom)
      filters.dateFrom = new Date(dateFrom).toISOString();
    const dateTo = this.dateToControl.value;
    if (dateTo)
      filters.dateTo = new Date(dateTo).toISOString();
    const status = this.statusControl.value;
    if (status)
      filters.status = status;
    const warehouseId = this.warehouseControl.value;
    if (warehouseId)
      filters.warehouse_id = warehouseId;
    this.filtersChange.emit(filters);
  }
  static \u0275fac = function SalesFilterBarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesFilterBarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SalesFilterBarComponent, selectors: [["app-sales-filter-bar"]], inputs: { warehouses: "warehouses" }, outputs: { filtersChange: "filtersChange" }, decls: 23, vars: 7, consts: [["role", "search", "aria-label", "Filtros de \xF3rdenes de venta", 1, "filter-bar"], [1, "filter-bar__container"], [1, "filter-bar__field"], ["type", "text", "placeholder", "Buscar...", 1, "filter-bar__input", 3, "formControl"], [1, "filter-bar__select", 3, "formControl"], ["value", ""], [3, "value"], ["type", "date", 1, "filter-bar__input", 3, "formControl"]], template: function SalesFilterBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "input", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 2)(5, "select", 4)(6, "option", 5);
      \u0275\u0275text(7, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(8, SalesFilterBarComponent_For_9_Template, 2, 2, "option", 6, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, SalesFilterBarComponent_Conditional_10_Template, 4, 2);
      \u0275\u0275elementStart(11, "div", 2)(12, "select", 4)(13, "option", 6);
      \u0275\u0275text(14, "Todos los estados");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(15, SalesFilterBarComponent_For_16_Template, 2, 2, "option", 6, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 2)(18, "select", 4)(19, "option", 6);
      \u0275\u0275text(20, "Todos los almacenes");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(21, SalesFilterBarComponent_For_22_Template, 2, 2, "option", 6, _forTrack1);
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
  }, dependencies: [CommonModule, ReactiveFormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, FormControlDirective], styles: [`

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
/*# sourceMappingURL=sales-filter-bar.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SalesFilterBarComponent, [{
    type: Component,
    args: [{ selector: "app-sales-filter-bar", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: '<div class="filter-bar" role="search" aria-label="Filtros de \xF3rdenes de venta">\r\n  <div class="filter-bar__container">\r\n    <div class="filter-bar__field">\r\n      <input type="text" [formControl]="searchControl" placeholder="Buscar..." class="filter-bar__input" />\r\n    </div>\r\n\r\n    <div class="filter-bar__field">\r\n      <select [formControl]="dateRangeControl" class="filter-bar__select">\r\n        <option value="">Fecha</option>\r\n        @for (option of dateRangeOptions; track option.value) {\r\n          <option [value]="option.value">{{ option.label }}</option>\r\n        }\r\n      </select>\r\n    </div>\r\n\r\n    @if (showCustomDateRange) {\r\n      <div class="filter-bar__field">\r\n        <input type="date" [formControl]="dateFromControl" class="filter-bar__input" />\r\n      </div>\r\n      <div class="filter-bar__field">\r\n        <input type="date" [formControl]="dateToControl" class="filter-bar__input" />\r\n      </div>\r\n    }\r\n\r\n    <div class="filter-bar__field">\r\n      <select [formControl]="statusControl" class="filter-bar__select">\r\n        <option [value]="null">Todos los estados</option>\r\n        @for (option of statusOptions; track option.value) {\r\n          <option [value]="option.value">{{ option.label }}</option>\r\n        }\r\n      </select>\r\n    </div>\r\n\r\n    <div class="filter-bar__field">\r\n      <select [formControl]="warehouseControl" class="filter-bar__select">\r\n        <option [value]="null">Todos los almacenes</option>\r\n        @for (warehouse of warehouses; track warehouse.id) {\r\n          <option [value]="warehouse.id">{{ warehouse.name }}</option>\r\n        }\r\n      </select>\r\n    </div>\r\n  </div>\r\n</div>\r\n', styles: [`/* src/app/features/sales-orders/components/sales-filter-bar/sales-filter-bar.component.scss */
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
/*# sourceMappingURL=sales-filter-bar.component.css.map */
`] }]
  }], null, { warehouses: [{
    type: Input
  }], filtersChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SalesFilterBarComponent, { className: "SalesFilterBarComponent", filePath: "src/app/features/sales-orders/components/sales-filter-bar/sales-filter-bar.component.ts", lineNumber: 15 });
})();

// src/app/features/sales-orders/pages/sales-order-list/sales-order-list.component.ts
var _c0 = ["tableTemplate"];
var _forTrack02 = ($index, $item) => $item.id;
function SalesOrderListComponent_For_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275listener("click", function SalesOrderListComponent_For_72_Template_div_click_0_listener() {
      const order_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.navigateToDetail(order_r3));
    });
    \u0275\u0275elementStart(1, "div", 29)(2, "span", 30);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 32)(7, "div")(8, "strong");
    \u0275\u0275text(9, "Cliente:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "strong");
    \u0275\u0275text(13, "Almac\xE9n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div")(16, "strong");
    \u0275\u0275text(17, "Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 20);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", order_r3.folio || order_r3.id.substring(0, 8), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(order_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(order_r3.status);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r3.getCustomerDisplayName(order_r3.customer));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (order_r3.warehouse == null ? null : order_r3.warehouse.name) || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r3.formatCurrency(ctx_r3.getOrderTotal(order_r3)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatDateHuman(order_r3.created_at));
  }
}
function SalesOrderListComponent_ng_template_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33)(1, "span", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 34)(4, "p", 35);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 34)(7, "p", 35);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 33)(10, "span", 31);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 33)(13, "p", 36);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 33)(16, "span", 31);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td", 37)(19, "p", 38);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r5.folio || item_r5.id.substring(0, 8), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.getCustomerDisplayName(item_r5.customer));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((item_r5.warehouse == null ? null : item_r5.warehouse.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(item_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.status);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency(ctx_r3.getOrderTotal(item_r5)));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getPaymentStatusClass(item_r5.payment_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.payment_status);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.formatDateHuman(item_r5.created_at));
  }
}
var SalesOrderListComponent = class _SalesOrderListComponent {
  salesOrderService;
  warehouseService;
  dialog;
  snackBar;
  taxCalculator;
  tableTemplate;
  Math = Math;
  ordersData = signal([], ...ngDevMode ? [{ debugName: "ordersData" }] : []);
  filtersState = signal({}, ...ngDevMode ? [{ debugName: "filtersState" }] : []);
  paginationState = signal({ page: 1, limit: 15 }, ...ngDevMode ? [{ debugName: "paginationState" }] : []);
  loadingState = signal(false, ...ngDevMode ? [{ debugName: "loadingState" }] : []);
  totalResultsState = signal(0, ...ngDevMode ? [{ debugName: "totalResultsState" }] : []);
  hasMoreState = signal(true, ...ngDevMode ? [{ debugName: "hasMoreState" }] : []);
  table_config = signal({
    rows: [],
    columns: [
      { name: "Folio", prop: "folio", sortable: true, canAutoResize: false, width: 120 },
      { name: "Cliente", prop: "customer", sortable: true, canAutoResize: false, width: 150 },
      { name: "Almac\xE9n", prop: "warehouse", sortable: false, canAutoResize: false, width: 150 },
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
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron \xF3rdenes de venta" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  orders = this.ordersData.asReadonly();
  loading = this.loadingState.asReadonly();
  hasMore = this.hasMoreState.asReadonly();
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  // Stats
  totalOrders = computed(() => this.totalResultsState(), ...ngDevMode ? [{ debugName: "totalOrders" }] : []);
  totalAmount = computed(() => this.ordersData().reduce((sum, o) => sum + this.getOrderTotal(o), 0), ...ngDevMode ? [{ debugName: "totalAmount" }] : []);
  creadasCount = computed(() => this.ordersData().filter((o) => o.status === "Creada").length, ...ngDevMode ? [{ debugName: "creadasCount" }] : []);
  surtidasCount = computed(() => this.ordersData().filter((o) => o.status === "Surtida").length, ...ngDevMode ? [{ debugName: "surtidasCount" }] : []);
  canceladasCount = computed(() => this.ordersData().filter((o) => o.status === "Cancelada").length, ...ngDevMode ? [{ debugName: "canceladasCount" }] : []);
  creadasAmount = computed(() => this.ordersData().filter((o) => o.status === "Creada").reduce((s, o) => s + this.getOrderTotal(o), 0), ...ngDevMode ? [{ debugName: "creadasAmount" }] : []);
  surtidasAmount = computed(() => this.ordersData().filter((o) => o.status === "Surtida").reduce((s, o) => s + this.getOrderTotal(o), 0), ...ngDevMode ? [{ debugName: "surtidasAmount" }] : []);
  pagadasCount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pagado").length, ...ngDevMode ? [{ debugName: "pagadasCount" }] : []);
  pendientesCount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pendiente").length, ...ngDevMode ? [{ debugName: "pendientesCount" }] : []);
  pagadasAmount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pagado").reduce((s, o) => s + this.getOrderTotal(o), 0), ...ngDevMode ? [{ debugName: "pagadasAmount" }] : []);
  pendientesAmount = computed(() => this.ordersData().filter((o) => o.payment_status === "Pendiente").reduce((s, o) => s + this.getOrderTotal(o), 0), ...ngDevMode ? [{ debugName: "pendientesAmount" }] : []);
  creadasPercent = computed(() => this.totalOrders() > 0 ? this.creadasCount() / this.totalOrders() * 100 : 0, ...ngDevMode ? [{ debugName: "creadasPercent" }] : []);
  surtidasPercent = computed(() => this.totalOrders() > 0 ? this.surtidasCount() / this.totalOrders() * 100 : 0, ...ngDevMode ? [{ debugName: "surtidasPercent" }] : []);
  pagadasPercent = computed(() => this.totalOrders() > 0 ? this.pagadasCount() / this.totalOrders() * 100 : 0, ...ngDevMode ? [{ debugName: "pagadasPercent" }] : []);
  pendientesPercent = computed(() => this.totalOrders() > 0 ? this.pendientesCount() / this.totalOrders() * 100 : 0, ...ngDevMode ? [{ debugName: "pendientesPercent" }] : []);
  constructor(salesOrderService, warehouseService, dialog, snackBar, taxCalculator) {
    this.salesOrderService = salesOrderService;
    this.warehouseService = warehouseService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.taxCalculator = taxCalculator;
  }
  ngOnInit() {
    this.loadOrders();
    this.loadWarehouses();
  }
  loadOrders() {
    this.loadingState.set(true);
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    this.salesOrderService.getOrders(this.filtersState(), this.paginationState()).subscribe({
      next: (response) => {
        const orders = response.data || [];
        const total = response.total || 0;
        const hasNext = response.page < response.totalPages;
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
        console.error("Error loading sales orders:", error);
        this.loadingState.set(false);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
      }
    });
  }
  loadWarehouses() {
    this.warehouseService.getWarehouses().subscribe({
      next: (res) => this.warehouses.set(Array.isArray(res) ? res : res.data || []),
      error: (err) => console.error("Error loading warehouses:", err)
    });
  }
  applyFilters(filters) {
    this.filtersState.set(filters);
    this.paginationState.set({ page: 1, limit: 15 });
    this.loadOrders();
  }
  onPageChange(event) {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadOrders();
  }
  onSortChange(event) {
    console.log("Sort changed:", event);
  }
  navigateToCreate() {
    this.dialog.open(CreateSalesOrderModalComponent, {
      width: "900px",
      maxWidth: "95vw",
      maxHeight: "90vh",
      panelClass: "create-purchase-order-modal"
    }).afterClosed().subscribe((result) => {
      if (result)
        this.loadOrders();
    });
  }
  navigateToDetail(order) {
    this.dialog.open(SalesOrderDetailDialogComponent, __spreadProps(__spreadValues({}, ORDER_DETAIL_DIALOG_OPTIONS), {
      data: { orderId: order.id }
    })).afterClosed().subscribe((updated) => {
      if (updated)
        this.loadOrders();
    });
  }
  getStatusClass(status) {
    switch (status) {
      case "Creada":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700";
      case "Surtida":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700";
      case "Cancelada":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700";
      default:
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700";
    }
  }
  getPaymentStatusClass(status) {
    switch (status) {
      case "Pagado":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-700";
      case "Parcial":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700";
      case "Pendiente":
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-700";
      default:
        return "inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700";
    }
  }
  formatCurrency(amount) {
    return this.taxCalculator.formatCurrency(amount);
  }
  formatDateHuman(date) {
    if (!date)
      return "";
    const d = new Date(date);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const hours = d.getHours() % 12 || 12;
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = d.getHours() >= 12 ? "PM" : "AM";
    return `${months[d.getMonth()]} ${d.getDate()} ${hours}:${minutes} ${ampm}`;
  }
  getOrderTotal(order) {
    return Number(order.requested_total ?? 0) || order.grand_total || 0;
  }
  getCustomerDisplayName(customer) {
    return getCustomerDisplayName(customer);
  }
  static \u0275fac = function SalesOrderListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesOrderListComponent)(\u0275\u0275directiveInject(SalesOrderService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SalesOrderListComponent, selectors: [["app-sales-order-list"]], viewQuery: function SalesOrderListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 75, vars: 23, consts: [["tableTemplate", ""], [1, "purchase-order-list-container"], [1, "purchase-content"], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "px-4", "py-2", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", "font-medium", "text-sm", 3, "click"], [1, "mb-4"], [3, "filtersChange", "warehouses"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6", "mb-6"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-6", "shadow-sm"], [1, "flex", "justify-between", "items-center", "mb-3"], [1, "text-sm", "font-semibold", "text-gray-700"], [1, "text-sm", "text-gray-600"], [1, "border-b", "border-gray-200", "mb-4"], [1, "space-y-4"], [1, "flex", "justify-between", "items-center", "mb-2"], [1, "text-sm", "font-semibold", "text-gray-900"], [1, "w-full", "bg-gray-200", "rounded-full", "h-2", "mb-1"], [1, "bg-blue-500", "h-2", "rounded-full", "transition-all"], [1, "text-xs", "text-gray-500"], [1, "bg-green-500", "h-2", "rounded-full", "transition-all"], [1, "bg-red-500", "h-2", "rounded-full", "transition-all"], [1, "hidden", "md:block"], [3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "block", "md:hidden"], [1, "space-y-3"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", 3, "click"], [1, "flex", "justify-between", "items-start", "mb-2"], [1, "inline-flex", "items-center", "px-3", "py-1", "rounded", "text-xs", "font-semibold", "bg-blue-100", "text-blue-700"], [3, "ngClass"], [1, "text-sm", "text-gray-600", "space-y-1"], [1, "px-2", "py-2", "w-[120px]"], [1, "px-2", "py-2", "w-[150px]"], [1, "truncate", "text-sm", "m-0"], [1, "text-sm", "font-medium", "m-0"], [1, "px-2", "py-2", "w-[160px]"], [1, "text-xs", "m-0"]], template: function SalesOrderListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h2", 5);
      \u0275\u0275text(5, "\xD3rdenes de Venta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 6);
      \u0275\u0275listener("click", function SalesOrderListComponent_Template_button_click_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.navigateToCreate());
      });
      \u0275\u0275text(7, " Crear ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 7)(9, "app-sales-filter-bar", 8);
      \u0275\u0275listener("filtersChange", function SalesOrderListComponent_Template_app_sales_filter_bar_filtersChange_9_listener($event) {
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
      \u0275\u0275text(32, "Surtidas");
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
      \u0275\u0275listener("pageChange", function SalesOrderListComponent_Template_app_datatable_wrapper_pageChange_68_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function SalesOrderListComponent_Template_app_datatable_wrapper_sortChange_68_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function SalesOrderListComponent_Template_app_datatable_wrapper_rowClick_68_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.navigateToDetail($event.data));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "div", 25)(70, "div", 26);
      \u0275\u0275repeaterCreate(71, SalesOrderListComponent_For_72_Template, 21, 7, "div", 27, _forTrack02);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275template(73, SalesOrderListComponent_ng_template_73_Template, 21, 9, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r6 = \u0275\u0275reference(74);
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
      \u0275\u0275textInterpolate(ctx.surtidasCount());
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.surtidasPercent(), "%");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.surtidasAmount()));
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
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r6);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.table_config().rows);
    }
  }, dependencies: [CommonModule, NgClass, SalesFilterBarComponent, DatatableWrapperComponent], styles: ["\n\n.sales-order-list[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #2d3748;\n  margin: 0;\n}\n.header[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n}\n.header[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n  transform: translateY(-2px);\n}\n.header[_ngcontent-%COMP%]   .btn-create[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n@media (max-width: 768px) {\n  .sales-order-list[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=sales-order-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SalesOrderListComponent, [{
    type: Component,
    args: [{ selector: "app-sales-order-list", standalone: true, imports: [CommonModule, SalesFilterBarComponent, DatatableWrapperComponent], template: `<div class="purchase-order-list-container">\r
  <div class="purchase-content">\r
    <div class="px-4">\r
      <!-- Header -->\r
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
        <h2 class="text-2xl font-semibold text-gray-800">\xD3rdenes de Venta</h2>\r
        <button\r
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"\r
          (click)="navigateToCreate()">\r
          Crear\r
        </button>\r
      </div>\r
\r
      <!-- Filter Bar -->\r
      <div class="mb-4">\r
        <app-sales-filter-bar\r
          [warehouses]="warehouses()"\r
          (filtersChange)="applyFilters($event)">\r
        </app-sales-filter-bar>\r
      </div>\r
\r
      <!-- Stats Dashboard -->\r
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">\r
        <!-- Por Estado -->\r
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">\r
          <div class="flex justify-between items-center mb-3">\r
            <h3 class="text-sm font-semibold text-gray-700">Por Estado</h3>\r
            <span class="text-sm text-gray-600">Total: {{ totalOrders() }} ({{ formatCurrency(totalAmount()) }})</span>\r
          </div>\r
          <div class="border-b border-gray-200 mb-4"></div>\r
          <div class="space-y-4">\r
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
            <div>\r
              <div class="flex justify-between items-center mb-2">\r
                <span class="text-sm text-gray-600">Surtidas</span>\r
                <span class="text-sm font-semibold text-gray-900">{{ surtidasCount() }}</span>\r
              </div>\r
              <div class="w-full bg-gray-200 rounded-full h-2 mb-1">\r
                <div class="bg-green-500 h-2 rounded-full transition-all" [style.width.%]="surtidasPercent()"></div>\r
              </div>\r
              <p class="text-xs text-gray-500">{{ formatCurrency(surtidasAmount()) }}</p>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Estado de Pago -->\r
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">\r
          <div class="flex justify-between items-center mb-3">\r
            <h3 class="text-sm font-semibold text-gray-700">Estado de Pago</h3>\r
            <span class="text-sm text-gray-600">Total: {{ totalOrders() }} ({{ formatCurrency(totalAmount()) }})</span>\r
          </div>\r
          <div class="border-b border-gray-200 mb-4"></div>\r
          <div class="space-y-4">\r
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
      <!-- Table -->\r
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
                  {{ order.folio || order.id.substring(0, 8) }}\r
                </span>\r
                <span [ngClass]="getStatusClass(order.status)">{{ order.status }}</span>\r
              </div>\r
              <div class="text-sm text-gray-600 space-y-1">\r
                <div><strong>Cliente:</strong> {{ getCustomerDisplayName(order.customer) }}</div>\r
                <div><strong>Almac\xE9n:</strong> {{ order.warehouse?.name || 'N/A' }}</div>\r
                <div><strong>Total:</strong> {{ formatCurrency(getOrderTotal(order)) }}</div>\r
                <div class="text-xs text-gray-500">{{ formatDateHuman(order.created_at) }}</div>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td class="px-2 py-2 w-[120px]">\r
    <span class="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">\r
      {{ item.folio || item.id.substring(0, 8) }}\r
    </span>\r
  </td>\r
  <td class="px-2 py-2 w-[150px]">\r
    <p class="truncate text-sm m-0">{{ getCustomerDisplayName(item.customer) }}</p>\r
  </td>\r
  <td class="px-2 py-2 w-[150px]">\r
    <p class="truncate text-sm m-0">{{ item.warehouse?.name || 'N/A' }}</p>\r
  </td>\r
  <td class="px-2 py-2 w-[120px]">\r
    <span [ngClass]="getStatusClass(item.status)">{{ item.status }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[120px]">\r
    <p class="text-sm font-medium m-0">{{ formatCurrency(getOrderTotal(item)) }}</p>\r
  </td>\r
  <td class="px-2 py-2 w-[120px]">\r
    <span [ngClass]="getPaymentStatusClass(item.payment_status)">{{ item.payment_status }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[160px]">\r
    <p class="text-xs m-0">{{ formatDateHuman(item.created_at) }}</p>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/sales-orders/pages/sales-order-list/sales-order-list.component.scss */\n.sales-order-list {\n  padding: 1.5rem;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n.header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.header h1 {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #2d3748;\n  margin: 0;\n}\n.header .btn-create {\n  padding: 0.75rem 1.5rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);\n}\n.header .btn-create:hover {\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);\n  transform: translateY(-2px);\n}\n.header .btn-create:active {\n  transform: translateY(0);\n}\n@media (max-width: 768px) {\n  .sales-order-list {\n    padding: 1rem;\n  }\n  .header h1 {\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=sales-order-list.component.css.map */\n"] }]
  }], () => [{ type: SalesOrderService }, { type: WarehouseService }, { type: MatDialog }, { type: MatSnackBar }, { type: TaxCalculatorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SalesOrderListComponent, { className: "SalesOrderListComponent", filePath: "src/app/features/sales-orders/pages/sales-order-list/sales-order-list.component.ts", lineNumber: 25 });
})();
export {
  SalesOrderListComponent
};
//# sourceMappingURL=chunk-MUYY4H6E.js.map
