import {
  BranchService
} from "./chunk-CQ4BUXG7.js";
import {
  FiscalConfigurationService
} from "./chunk-CEL5SWQJ.js";
import {
  DatatableWrapperComponent
} from "./chunk-DLRREEDR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-EF42XV6X.js";
import "./chunk-M5WQFRJQ.js";
import {
  CommonModule,
  HttpClient,
  HttpParams,
  environment
} from "./chunk-MNFUR22A.js";
import {
  Component,
  Injectable,
  ViewChild,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-CJAGDKD4.js";

// src/app/features/zona-norte-reports/services/sales-report.service.ts
var SalesReportService = class _SalesReportService {
  http;
  api = `${environment.api}/tenant/sales-reports`;
  constructor(http) {
    this.http = http;
  }
  getBySeller(params) {
    let httpParams = new HttpParams().set("period", params.period);
    if (params.commission_rate != null) {
      httpParams = httpParams.set("commission_rate", String(params.commission_rate));
    }
    if (params.fiscal_configuration_id) {
      httpParams = httpParams.set("fiscal_configuration_id", params.fiscal_configuration_id);
    }
    if (params.billing_branch_id) {
      httpParams = httpParams.set("billing_branch_id", params.billing_branch_id);
    }
    if (params.period === "range") {
      if (params.date_from)
        httpParams = httpParams.set("date_from", params.date_from);
      if (params.date_to)
        httpParams = httpParams.set("date_to", params.date_to);
    }
    return this.http.get(`${this.api}/by-seller`, { params: httpParams });
  }
  static \u0275fac = function SalesReportService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesReportService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SalesReportService, factory: _SalesReportService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SalesReportService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/zona-norte-reports/pages/sales-report/sales-report.component.ts
var _c0 = ["tableTemplate"];
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function SalesReportComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function SalesReportComponent_For_13_Template_button_click_0_listener() {
      const opt_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.selectPeriod(opt_r3.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("zn-period-toggle__btn--active", ctx_r3.datePreset === opt_r3.value);
    \u0275\u0275attribute("aria-pressed", ctx_r3.datePreset === opt_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r3.label, " ");
  }
}
function SalesReportComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 36)(2, "label", 37);
    \u0275\u0275text(3, "Inicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 38)(5, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function SalesReportComponent_Conditional_20_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.customDateFrom, $event) || (ctx_r3.customDateFrom = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function SalesReportComponent_Conditional_20_Template_input_change_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onCustomRangeChange());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "span", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 41);
    \u0275\u0275element(8, "path", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 36)(10, "label", 43);
    \u0275\u0275text(11, "Fin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 38)(13, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function SalesReportComponent_Conditional_20_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.customDateTo, $event) || (ctx_r3.customDateTo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function SalesReportComponent_Conditional_20_Template_input_change_13_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onCustomRangeChange());
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.customDateFrom);
    \u0275\u0275property("max", ctx_r3.customDateTo || void 0);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.customDateTo);
    \u0275\u0275property("min", ctx_r3.customDateFrom || void 0);
  }
}
function SalesReportComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const fc_r6 = ctx.$implicit;
    \u0275\u0275property("value", fc_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(fc_r6.razon_social);
  }
}
function SalesReportComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("value", b_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.branchLabel(b_r7));
  }
}
function SalesReportComponent_ng_template_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 45)(1, "span", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 45)(4, "p", 47);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 45)(7, "span", 48);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 45)(10, "div", 49)(11, "span", 50);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 51);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "td", 45)(16, "p", 52);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r8.branchCode, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r8.sellerName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r8.salesCount, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", item_r8.commissionRatePct, "% del monto");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency(item_r8.commissionAmount));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency(item_r8.totalSold));
  }
}
var COMMISSION_RATE = 4.5;
var SalesReportComponent = class _SalesReportComponent {
  salesReportService;
  fiscalConfigService;
  branchService;
  tableTemplate;
  datePreset = "month";
  customDateFrom = "";
  customDateTo = "";
  fiscalConfigurationId = "";
  billingBranchId = "";
  fiscalConfigurations = [];
  branches = [];
  summary = signal(null, ...ngDevMode ? [{ debugName: "summary" }] : []);
  periodOptions = [
    { label: "Hoy", value: "today" },
    { label: "Semana", value: "week" },
    { label: "Mes", value: "month" },
    { label: "A\xF1o", value: "year" }
  ];
  table_config = signal({
    rows: [],
    columns: [
      { name: "Sucursal", prop: "branch", sortable: true, canAutoResize: false, width: 180 },
      { name: "Vendedor", prop: "seller", sortable: true, canAutoResize: false, width: 200 },
      { name: "Total ventas", prop: "salesCount", sortable: true, canAutoResize: false, width: 120 },
      { name: "Comisi\xF3n", prop: "commission", sortable: false, canAutoResize: false, width: 140 },
      { name: "Monto vendido", prop: "totalSold", sortable: true, canAutoResize: false, width: 140 }
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin datos", subtitle: "No hay ventas para el periodo seleccionado" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  constructor(salesReportService, fiscalConfigService, branchService) {
    this.salesReportService = salesReportService;
    this.fiscalConfigService = fiscalConfigService;
    this.branchService = branchService;
  }
  ngOnInit() {
    this.loadFiscalConfigurations();
    this.loadBranches();
    this.selectPeriod("month");
  }
  selectPeriod(preset) {
    this.datePreset = preset;
    if (preset === "range") {
      if (!this.customDateFrom || !this.customDateTo) {
        const to = this.startOfDay(/* @__PURE__ */ new Date());
        const from = new Date(to);
        from.setDate(from.getDate() - 30);
        this.customDateFrom = this.toInputDate(from);
        this.customDateTo = this.toInputDate(to);
      }
      this.loadReport();
      return;
    }
    this.loadReport();
  }
  onCustomRangeChange() {
    if (this.datePreset !== "range" || !this.customDateFrom || !this.customDateTo) {
      return;
    }
    const from = this.parseInputDate(this.customDateFrom);
    const to = this.parseInputDate(this.customDateTo);
    if (!from || !to) {
      return;
    }
    if (from > to) {
      const tmp = this.customDateFrom;
      this.customDateFrom = this.customDateTo;
      this.customDateTo = tmp;
    }
    this.loadReport();
  }
  onFiscalConfigChange() {
    this.billingBranchId = "";
    this.loadBranches(this.fiscalConfigurationId || void 0);
    this.loadReport();
  }
  loadReport() {
    if (this.datePreset === "range" && (!this.customDateFrom || !this.customDateTo)) {
      return;
    }
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    this.salesReportService.getBySeller({
      period: this.datePreset,
      commission_rate: COMMISSION_RATE,
      fiscal_configuration_id: this.fiscalConfigurationId || void 0,
      billing_branch_id: this.billingBranchId || void 0,
      date_from: this.datePreset === "range" ? this.customDateFrom : void 0,
      date_to: this.datePreset === "range" ? this.customDateTo : void 0
    }).subscribe({
      next: (res) => {
        this.summary.set(res.summary);
        const rows = res.rows.map((r) => this.mapRow(r));
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows,
          totalResults: res.summary.total_sellers,
          loading: false
        }));
      },
      error: () => {
        this.summary.set(null);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: [],
          totalResults: 0,
          loading: false
        }));
      }
    });
  }
  customRangeAriaLabel() {
    if (this.datePreset === "range" && this.customDateFrom && this.customDateTo) {
      return `Rango personalizado: ${this.customDateFrom} a ${this.customDateTo}`;
    }
    return "Seleccionar rango de fechas personalizado";
  }
  branchLabel(b) {
    return b.display_name?.trim() || `${b.city} (${b.code})`;
  }
  formatCurrency(value) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  loadFiscalConfigurations() {
    this.fiscalConfigService.listFiscalConfigurations({ status: "active", limit: 100 }).subscribe({
      next: (res) => {
        this.fiscalConfigurations = res.data ?? [];
      },
      error: () => {
        this.fiscalConfigurations = [];
      }
    });
  }
  loadBranches(fiscalConfigId) {
    const request$ = fiscalConfigId ? this.branchService.getBranches(fiscalConfigId) : this.branchService.getAllBranches();
    request$.subscribe({
      next: (branches) => {
        this.branches = branches ?? [];
      },
      error: () => {
        this.branches = [];
      }
    });
  }
  mapRow(r) {
    return {
      billingBranchId: r.billing_branch_id,
      branchCode: r.branch_code,
      branchName: r.branch_name,
      sellerId: r.seller_id,
      sellerName: r.seller_name,
      salesCount: r.total_sales_count,
      commissionRatePct: r.commission_percentage,
      commissionAmount: r.commission_amount,
      totalSold: r.amount_sold
    };
  }
  startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  toInputDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  parseInputDate(value) {
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) {
      return null;
    }
    const date = new Date(y, m - 1, d);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  static \u0275fac = function SalesReportComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesReportComponent)(\u0275\u0275directiveInject(SalesReportService), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(BranchService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SalesReportComponent, selectors: [["app-sales-report"]], viewQuery: function SalesReportComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 59, vars: 14, consts: [["tableTemplate", ""], [1, "purchase-order-list-container"], [1, "purchase-content"], [1, "px-4", "pb-8"], [1, "zn-report-header", "mb-5"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], ["role", "search", "aria-label", "Periodo del reporte", 1, "zn-period-bar"], [1, "zn-period-panel"], ["role", "group", 1, "zn-period-toggle"], ["type", "button", 1, "zn-period-toggle__btn", 3, "zn-period-toggle__btn--active"], ["type", "button", 1, "zn-period-toggle__btn", "zn-period-toggle__btn--range", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 1, "zn-period-toggle__icon"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["d", "M16 2v4M8 2v4M3 10h18"], ["aria-label", "Rango de fechas personalizado", 1, "zn-date-range"], [1, "zn-filters", "mb-5"], [1, "zn-filters__panel"], [1, "zn-filters__field"], ["for", "zn-fiscal-config", 1, "zn-filters__label"], ["id", "zn-fiscal-config", "aria-label", "Filtrar por raz\xF3n social", 1, "zn-filters__select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], ["for", "zn-branch", 1, "zn-filters__label"], ["id", "zn-branch", "aria-label", "Filtrar por sucursal", 1, "zn-filters__select", 3, "ngModelChange", "change", "ngModel"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-4", "mb-6"], [1, "rounded-xl", "border", "border-violet-100", "bg-gradient-to-br", "from-violet-50", "to-white", "p-4", "shadow-sm"], [1, "text-xs", "font-medium", "uppercase", "tracking-wide", "text-violet-600"], [1, "text-2xl", "font-bold", "text-gray-900", "mt-1"], [1, "rounded-xl", "border", "border-emerald-100", "bg-gradient-to-br", "from-emerald-50", "to-white", "p-4", "shadow-sm"], [1, "text-xs", "font-medium", "uppercase", "tracking-wide", "text-emerald-600"], [1, "rounded-xl", "border", "border-amber-100", "bg-gradient-to-br", "from-amber-50", "to-white", "p-4", "shadow-sm"], [1, "text-xs", "font-medium", "uppercase", "tracking-wide", "text-amber-700"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "shadow-sm", "overflow-hidden"], [3, "config", "rowTemplate"], ["type", "button", 1, "zn-period-toggle__btn", 3, "click"], [1, "zn-date-range__field"], ["for", "zn-date-from", 1, "zn-date-range__label"], [1, "zn-date-range__control"], ["id", "zn-date-from", "type", "date", "aria-label", "Fecha de inicio", 1, "zn-date-range__input", 3, "ngModelChange", "change", "ngModel", "max"], ["aria-hidden", "true", 1, "zn-date-range__sep"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["d", "M5 12h14M13 6l6 6-6 6"], ["for", "zn-date-to", 1, "zn-date-range__label"], ["id", "zn-date-to", "type", "date", "aria-label", "Fecha de fin", 1, "zn-date-range__input", 3, "ngModelChange", "change", "ngModel", "min"], [1, "px-2", "py-2"], [1, "inline-flex", "items-center", "w-fit", "px-2.5", "py-1", "rounded-md", "text-xs", "font-semibold", "bg-indigo-100", "text-indigo-800"], [1, "text-sm", "font-medium", "text-gray-900", "m-0"], [1, "inline-flex", "items-center", "justify-center", "min-w-[2.5rem]", "px-2", "py-0.5", "rounded-full", "text-sm", "font-semibold", "bg-slate-100", "text-slate-800"], [1, "flex", "flex-col"], [1, "text-xs", "text-gray-500"], [1, "text-sm", "font-semibold", "text-emerald-700"], [1, "text-sm", "font-semibold", "text-gray-900", "m-0"]], template: function SalesReportComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div")(5, "h2", 5);
      \u0275\u0275text(6, "Reporte de Ventas - Zona Norte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 6);
      \u0275\u0275text(8, "Desempe\xF1o por vendedor y sucursal");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 7)(10, "div", 8)(11, "div", 9);
      \u0275\u0275repeaterCreate(12, SalesReportComponent_For_13_Template, 2, 4, "button", 10, _forTrack0);
      \u0275\u0275elementStart(14, "button", 11);
      \u0275\u0275listener("click", function SalesReportComponent_Template_button_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.selectPeriod("range"));
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(15, "svg", 12);
      \u0275\u0275element(16, "rect", 13)(17, "path", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(18, "span");
      \u0275\u0275text(19, "Rango");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(20, SalesReportComponent_Conditional_20_Template, 14, 4, "div", 15);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 16)(22, "div", 17)(23, "div", 18)(24, "label", 19);
      \u0275\u0275text(25, "Raz\xF3n social");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "select", 20);
      \u0275\u0275twoWayListener("ngModelChange", function SalesReportComponent_Template_select_ngModelChange_26_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.fiscalConfigurationId, $event) || (ctx.fiscalConfigurationId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function SalesReportComponent_Template_select_change_26_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFiscalConfigChange());
      });
      \u0275\u0275elementStart(27, "option", 21);
      \u0275\u0275text(28, "Todas las razones sociales");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(29, SalesReportComponent_For_30_Template, 2, 2, "option", 22, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 18)(32, "label", 23);
      \u0275\u0275text(33, "Sucursal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "select", 24);
      \u0275\u0275twoWayListener("ngModelChange", function SalesReportComponent_Template_select_ngModelChange_34_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.billingBranchId, $event) || (ctx.billingBranchId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function SalesReportComponent_Template_select_change_34_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadReport());
      });
      \u0275\u0275elementStart(35, "option", 21);
      \u0275\u0275text(36, "Todas las sucursales");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(37, SalesReportComponent_For_38_Template, 2, 2, "option", 22, _forTrack1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(39, "div", 25)(40, "div", 26)(41, "p", 27);
      \u0275\u0275text(42, "Vendedores");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "p", 28);
      \u0275\u0275text(44);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 29)(46, "p", 30);
      \u0275\u0275text(47, "Ventas acumuladas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p", 28);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 31)(51, "p", 32);
      \u0275\u0275text(52, "Monto total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "p", 28);
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "div", 33);
      \u0275\u0275element(56, "app-datatable-wrapper", 34);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(57, SalesReportComponent_ng_template_57_Template, 18, 6, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_11_0;
      let tmp_12_0;
      let tmp_13_0;
      const tableTemplate_r9 = \u0275\u0275reference(58);
      \u0275\u0275advance(10);
      \u0275\u0275classProp("zn-period-panel--range", ctx.datePreset === "range");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.periodOptions);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("zn-period-toggle__btn--active", ctx.datePreset === "range");
      \u0275\u0275attribute("aria-pressed", ctx.datePreset === "range")("aria-label", ctx.customRangeAriaLabel());
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.datePreset === "range" ? 20 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.fiscalConfigurationId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.fiscalConfigurations);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.billingBranchId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.branches);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(((tmp_11_0 = ctx.summary()) == null ? null : tmp_11_0.total_sellers) ?? 0);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_12_0 = ctx.summary()) == null ? null : tmp_12_0.total_sales_count) ?? 0);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.formatCurrency(((tmp_13_0 = ctx.summary()) == null ? null : tmp_13_0.total_amount) ?? 0), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r9);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatatableWrapperComponent], styles: [`

[_nghost-%COMP%] {
  display: block;
  height: 100%;
}
.zn-report-header[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem 1.5rem;
}
.zn-period-bar[_ngcontent-%COMP%] {
  flex-shrink: 0;
}
.zn-period-panel[_ngcontent-%COMP%] {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  width: fit-content;
  max-width: 100%;
  background: #fff;
  border-radius: 16px;
  padding: 0.25rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 1px #e2e8f0;
  transition: padding 0.2s ease, min-width 0.2s ease;
}
.zn-period-panel--range[_ngcontent-%COMP%] {
  padding: 0.25rem 0.35rem 0.65rem;
  min-width: min(100%, 22rem);
}
.zn-period-toggle[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.125rem;
  padding: 0.15rem;
  width: 100%;
  flex-shrink: 0;
}
.zn-period-toggle__btn[_ngcontent-%COMP%] {
  border: none;
  background: transparent;
  color: #475569;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
  white-space: nowrap;
  line-height: 1.25;
  flex-shrink: 0;
}
.zn-period-toggle__btn[_ngcontent-%COMP%]:hover:not(.zn-period-toggle__btn--active) {
  background: #f8fafc;
  color: #334155;
}
.zn-period-toggle__btn--active[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #6366f1 0%,
      #4f46e5 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
}
.zn-period-toggle__btn--range[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.zn-period-toggle__icon[_ngcontent-%COMP%] {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
.zn-date-range[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 0.5rem 0.4rem;
  width: 100%;
  padding: 0.6rem 0.35rem 0.15rem;
  margin-top: 0.15rem;
  border-top: 1px solid #f1f5f9;
}
.zn-date-range__field[_ngcontent-%COMP%] {
  min-width: 0;
}
.zn-date-range__label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #64748b;
  margin-bottom: 0.35rem;
}
.zn-date-range__control[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0 0.65rem;
  background:
    linear-gradient(
      180deg,
      #fafafa 0%,
      #f4f4f5 100%);
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}
.zn-date-range__control[_ngcontent-%COMP%]:focus-within {
  border-color: #a5b4fc;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
.zn-date-range__input[_ngcontent-%COMP%] {
  width: 100%;
  min-width: 0;
  padding: 0.45rem 0;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
  font-family: Inter, sans-serif !important;
}
.zn-date-range__input[_ngcontent-%COMP%]:focus {
  outline: none;
}
.zn-date-range__input[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.55;
  margin-left: 0.25rem;
}
.zn-date-range__sep[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.65rem;
  color: #cbd5e1;
  flex-shrink: 0;
}
.zn-date-range__sep[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 1.125rem;
  height: 1.125rem;
}
.zn-filters__panel[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 1rem;
  max-width: 42rem;
}
.zn-filters__field[_ngcontent-%COMP%] {
  min-width: 0;
}
.zn-filters__label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #64748b;
  margin-bottom: 0.35rem;
}
.zn-filters__select[_ngcontent-%COMP%] {
  width: 100%;
  min-height: 2.5rem;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #334155;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.65rem center;
  background-size: 16px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.zn-filters__select[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e1;
}
.zn-filters__select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #a5b4fc;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
@media (max-width: 640px) {
  .zn-period-toggle__btn[_ngcontent-%COMP%] {
    padding: 0.35rem 0.55rem;
    font-size: 0.75rem;
  }
  .zn-period-bar[_ngcontent-%COMP%], 
   .zn-period-panel[_ngcontent-%COMP%], 
   .zn-period-panel--range[_ngcontent-%COMP%] {
    width: 100%;
    min-width: 0;
  }
  .zn-date-range[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .zn-date-range__sep[_ngcontent-%COMP%] {
    display: none;
  }
  .zn-filters__panel[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
}
/*# sourceMappingURL=sales-report.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SalesReportComponent, [{
    type: Component,
    args: [{ selector: "app-sales-report", standalone: true, imports: [CommonModule, FormsModule, DatatableWrapperComponent], template: `
    <div class="purchase-order-list-container">
      <div class="purchase-content">
        <div class="px-4 pb-8">
          <div class="zn-report-header mb-5">
            <div>
              <h2 class="text-2xl font-semibold text-gray-800">Reporte de Ventas - Zona Norte</h2>
              <p class="text-sm text-gray-600 mt-1">Desempe\xF1o por vendedor y sucursal</p>
            </div>

            <div class="zn-period-bar" role="search" aria-label="Periodo del reporte">
              <div
                class="zn-period-panel"
                [class.zn-period-panel--range]="datePreset === 'range'">
                <div class="zn-period-toggle" role="group">
                  @for (opt of periodOptions; track opt.value) {
                    <button
                      type="button"
                      class="zn-period-toggle__btn"
                      [class.zn-period-toggle__btn--active]="datePreset === opt.value"
                      [attr.aria-pressed]="datePreset === opt.value"
                      (click)="selectPeriod(opt.value)">
                      {{ opt.label }}
                    </button>
                  }
                  <button
                    type="button"
                    class="zn-period-toggle__btn zn-period-toggle__btn--range"
                    [class.zn-period-toggle__btn--active]="datePreset === 'range'"
                    [attr.aria-pressed]="datePreset === 'range'"
                    [attr.aria-label]="customRangeAriaLabel()"
                    (click)="selectPeriod('range')">
                    <svg
                      class="zn-period-toggle__icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <span>Rango</span>
                  </button>
                </div>

                @if (datePreset === 'range') {
                  <div class="zn-date-range" aria-label="Rango de fechas personalizado">
                    <div class="zn-date-range__field">
                      <label class="zn-date-range__label" for="zn-date-from">Inicio</label>
                      <div class="zn-date-range__control">
                        <input
                          id="zn-date-from"
                          type="date"
                          class="zn-date-range__input"
                          [(ngModel)]="customDateFrom"
                          (change)="onCustomRangeChange()"
                          [max]="customDateTo || undefined"
                          aria-label="Fecha de inicio" />
                      </div>
                    </div>
                    <span class="zn-date-range__sep" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <div class="zn-date-range__field">
                      <label class="zn-date-range__label" for="zn-date-to">Fin</label>
                      <div class="zn-date-range__control">
                        <input
                          id="zn-date-to"
                          type="date"
                          class="zn-date-range__input"
                          [(ngModel)]="customDateTo"
                          (change)="onCustomRangeChange()"
                          [min]="customDateFrom || undefined"
                          aria-label="Fecha de fin" />
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <div class="zn-filters mb-5">
            <div class="zn-filters__panel">
              <div class="zn-filters__field">
                <label class="zn-filters__label" for="zn-fiscal-config">Raz\xF3n social</label>
                <select
                  id="zn-fiscal-config"
                  class="zn-filters__select"
                  [(ngModel)]="fiscalConfigurationId"
                  (change)="onFiscalConfigChange()"
                  aria-label="Filtrar por raz\xF3n social">
                  <option value="">Todas las razones sociales</option>
                  @for (fc of fiscalConfigurations; track fc.id) {
                    <option [value]="fc.id">{{ fc.razon_social }}</option>
                  }
                </select>
              </div>
              <div class="zn-filters__field">
                <label class="zn-filters__label" for="zn-branch">Sucursal</label>
                <select
                  id="zn-branch"
                  class="zn-filters__select"
                  [(ngModel)]="billingBranchId"
                  (change)="loadReport()"
                  aria-label="Filtrar por sucursal">
                  <option value="">Todas las sucursales</option>
                  @for (b of branches; track b.id) {
                    <option [value]="b.id">{{ branchLabel(b) }}</option>
                  }
                </select>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-violet-600">Vendedores</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ summary()?.total_sellers ?? 0 }}</p>
            </div>
            <div class="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-emerald-600">Ventas acumuladas</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ summary()?.total_sales_count ?? 0 }}</p>
            </div>
            <div class="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-amber-700">Monto total</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ formatCurrency(summary()?.total_amount ?? 0) }}
              </p>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <app-datatable-wrapper
              [config]="table_config()"
              [rowTemplate]="tableTemplate">
            </app-datatable-wrapper>
          </div>
        </div>
      </div>
    </div>

    <ng-template #tableTemplate let-item="$implicit">
      <td class="px-2 py-2">
        <span class="inline-flex items-center w-fit px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-800">
          {{ item.branchCode }}
        </span>
      </td>
      <td class="px-2 py-2">
        <p class="text-sm font-medium text-gray-900 m-0">{{ item.sellerName }}</p>
      </td>
      <td class="px-2 py-2">
        <span class="inline-flex items-center justify-center min-w-[2.5rem] px-2 py-0.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-800">
          {{ item.salesCount }}
        </span>
      </td>
      <td class="px-2 py-2">
        <div class="flex flex-col">
          <span class="text-xs text-gray-500">{{ item.commissionRatePct }}% del monto</span>
          <span class="text-sm font-semibold text-emerald-700">{{ formatCurrency(item.commissionAmount) }}</span>
        </div>
      </td>
      <td class="px-2 py-2">
        <p class="text-sm font-semibold text-gray-900 m-0">{{ formatCurrency(item.totalSold) }}</p>
      </td>
    </ng-template>
  `, styles: [`/* angular:styles/component:scss;ecc115dfee5d4f1b9235a3625b11045086b78b5f629e23fe34786b0269e6bc8f;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/zona-norte-reports/pages/sales-report/sales-report.component.ts */
:host {
  display: block;
  height: 100%;
}
.zn-report-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem 1.5rem;
}
.zn-period-bar {
  flex-shrink: 0;
}
.zn-period-panel {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  width: fit-content;
  max-width: 100%;
  background: #fff;
  border-radius: 16px;
  padding: 0.25rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 1px #e2e8f0;
  transition: padding 0.2s ease, min-width 0.2s ease;
}
.zn-period-panel--range {
  padding: 0.25rem 0.35rem 0.65rem;
  min-width: min(100%, 22rem);
}
.zn-period-toggle {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.125rem;
  padding: 0.15rem;
  width: 100%;
  flex-shrink: 0;
}
.zn-period-toggle__btn {
  border: none;
  background: transparent;
  color: #475569;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
  white-space: nowrap;
  line-height: 1.25;
  flex-shrink: 0;
}
.zn-period-toggle__btn:hover:not(.zn-period-toggle__btn--active) {
  background: #f8fafc;
  color: #334155;
}
.zn-period-toggle__btn--active {
  background:
    linear-gradient(
      135deg,
      #6366f1 0%,
      #4f46e5 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
}
.zn-period-toggle__btn--range {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.zn-period-toggle__icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
.zn-date-range {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 0.5rem 0.4rem;
  width: 100%;
  padding: 0.6rem 0.35rem 0.15rem;
  margin-top: 0.15rem;
  border-top: 1px solid #f1f5f9;
}
.zn-date-range__field {
  min-width: 0;
}
.zn-date-range__label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #64748b;
  margin-bottom: 0.35rem;
}
.zn-date-range__control {
  display: flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0 0.65rem;
  background:
    linear-gradient(
      180deg,
      #fafafa 0%,
      #f4f4f5 100%);
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}
.zn-date-range__control:focus-within {
  border-color: #a5b4fc;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
.zn-date-range__input {
  width: 100%;
  min-width: 0;
  padding: 0.45rem 0;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
  font-family: Inter, sans-serif !important;
}
.zn-date-range__input:focus {
  outline: none;
}
.zn-date-range__input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.55;
  margin-left: 0.25rem;
}
.zn-date-range__sep {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.65rem;
  color: #cbd5e1;
  flex-shrink: 0;
}
.zn-date-range__sep svg {
  width: 1.125rem;
  height: 1.125rem;
}
.zn-filters__panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 1rem;
  max-width: 42rem;
}
.zn-filters__field {
  min-width: 0;
}
.zn-filters__label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #64748b;
  margin-bottom: 0.35rem;
}
.zn-filters__select {
  width: 100%;
  min-height: 2.5rem;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #334155;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.65rem center;
  background-size: 16px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.zn-filters__select:hover {
  border-color: #cbd5e1;
}
.zn-filters__select:focus {
  outline: none;
  border-color: #a5b4fc;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
@media (max-width: 640px) {
  .zn-period-toggle__btn {
    padding: 0.35rem 0.55rem;
    font-size: 0.75rem;
  }
  .zn-period-bar,
  .zn-period-panel,
  .zn-period-panel--range {
    width: 100%;
    min-width: 0;
  }
  .zn-date-range {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .zn-date-range__sep {
    display: none;
  }
  .zn-filters__panel {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
}
/*# sourceMappingURL=sales-report.component.css.map */
`] }]
  }], () => [{ type: SalesReportService }, { type: FiscalConfigurationService }, { type: BranchService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SalesReportComponent, { className: "SalesReportComponent", filePath: "src/app/features/zona-norte-reports/pages/sales-report/sales-report.component.ts", lineNumber: 406 });
})();

// src/app/features/zona-norte-reports/zona-norte-reports.routes.ts
var ZONA_NORTE_REPORTS_ROUTES = [
  {
    path: "",
    component: SalesReportComponent
  }
];
export {
  ZONA_NORTE_REPORTS_ROUTES
};
//# sourceMappingURL=chunk-WGISFKED.js.map
