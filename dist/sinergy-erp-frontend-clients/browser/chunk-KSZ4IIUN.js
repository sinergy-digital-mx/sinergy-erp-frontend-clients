import {
  DatatableWrapperComponent
} from "./chunk-QW7YUBWU.js";
import "./chunk-OC6N764R.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-TXPVZZCM.js";
import {
  CommonModule
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  ViewChild,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
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
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

// src/app/features/zona-norte-reports/pages/sales-report/sales-report.component.ts
var _c0 = ["tableTemplate"];
var _forTrack0 = ($index, $item) => $item.id;
function SalesReportComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r2 = ctx.$implicit;
    \u0275\u0275property("value", b_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r2.name);
  }
}
function SalesReportComponent_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 25)(1, "div", 26)(2, "span", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "td", 25)(7, "p", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 25)(10, "span", 30);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 25)(13, "div", 31)(14, "span", 32);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 33);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "td", 25)(19, "p", 34);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r3.branchShortLabel(item_r3.branchName), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.branchName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.sellerName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r3.salesCount, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", item_r3.commissionRatePct, "% del monto");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency(ctx_r3.commissionAmount(item_r3)));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency(item_r3.totalSold));
  }
}
function buildDemoRows() {
  const branches = [
    { id: "mty-centro", name: "Monterrey Centro" },
    { id: "slt-norte", name: "Saltillo Norte" },
    { id: "trn-plaza", name: "Torre\xF3n Plaza" },
    { id: "chh-juarez", name: "Ciudad Ju\xE1rez" }
  ];
  const sellersByBranch = {
    "mty-centro": [
      "Ana L\xF3pez",
      "Luis Hern\xE1ndez",
      "Mar\xEDa Gonz\xE1lez",
      "Carlos Ruiz",
      "Patricia Vega"
    ],
    "slt-norte": [
      "Jorge Mendoza",
      "Laura Castillo",
      "Miguel Torres",
      "Sof\xEDa Ram\xEDrez",
      "Diego Flores"
    ],
    "trn-plaza": [
      "Fernanda Ortiz",
      "Ricardo Soto",
      "Gabriela N\xFA\xF1ez",
      "Andr\xE9s Campos",
      "Valeria Medina"
    ],
    "chh-juarez": [
      "Daniel Ibarra",
      "Paula Reyes",
      "H\xE9ctor Luna",
      "Natalia Cruz",
      "\xD3scar Delgado"
    ]
  };
  const seeds = [
    { sales: 52, rate: 4.5, base: 184200 },
    { sales: 41, rate: 4, base: 142800 },
    { sales: 63, rate: 5, base: 228450 },
    { sales: 38, rate: 3.5, base: 119600 },
    { sales: 47, rate: 4.25, base: 167320 }
  ];
  const rows = [];
  for (const b of branches) {
    const names = sellersByBranch[b.id] ?? [];
    names.forEach((sellerName, i) => {
      const s = seeds[i % seeds.length];
      const jitter = 1 + b.id.charCodeAt(0) % 5 * 0.02 + i * 0.015;
      const totalSold = Math.round(s.base * jitter);
      rows.push({
        branchId: b.id,
        branchName: b.name,
        sellerName,
        salesCount: s.sales + i * 3,
        commissionRatePct: s.rate,
        totalSold
      });
    });
  }
  return rows;
}
var SalesReportComponent = class _SalesReportComponent {
  tableTemplate;
  branches = [
    { id: "mty-centro", name: "Monterrey Centro" },
    { id: "slt-norte", name: "Saltillo Norte" },
    { id: "trn-plaza", name: "Torre\xF3n Plaza" },
    { id: "chh-juarez", name: "Ciudad Ju\xE1rez" }
  ];
  selectedSucursalId = "";
  allRows = buildDemoRows();
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
    emptyState: { title: "Sin datos", subtitle: "No hay vendedores para esta sucursal" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  ngOnInit() {
    this.applyFilter();
  }
  totalSalesCount() {
    return this.table_config().rows.reduce((a, r) => a + r.salesCount, 0);
  }
  totalSoldSum() {
    return this.table_config().rows.reduce((a, r) => a + r.totalSold, 0);
  }
  applyFilter() {
    const filtered = this.selectedSucursalId ? this.allRows.filter((r) => r.branchId === this.selectedSucursalId) : this.allRows;
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
      rows: filtered,
      totalResults: filtered.length
    }));
  }
  commissionAmount(row) {
    return Math.round(row.totalSold * row.commissionRatePct / 100);
  }
  formatCurrency(value) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  branchShortLabel(name) {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  }
  static \u0275fac = function SalesReportComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesReportComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SalesReportComponent, selectors: [["app-sales-report"]], viewQuery: function SalesReportComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 41, vars: 6, consts: [["tableTemplate", ""], [1, "purchase-order-list-container"], [1, "purchase-content"], [1, "px-4", "pb-8"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "mb-4"], ["role", "search", "aria-label", "Filtros del reporte", 1, "zn-filter-bar"], [1, "zn-filter-bar__inner"], ["for", "zn-sucursal", 1, "zn-filter-bar__label"], ["id", "zn-sucursal", "aria-label", "Filtrar por sucursal", 1, "zn-filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-4", "mb-6"], [1, "rounded-xl", "border", "border-violet-100", "bg-gradient-to-br", "from-violet-50", "to-white", "p-4", "shadow-sm"], [1, "text-xs", "font-medium", "uppercase", "tracking-wide", "text-violet-600"], [1, "text-2xl", "font-bold", "text-gray-900", "mt-1"], [1, "rounded-xl", "border", "border-emerald-100", "bg-gradient-to-br", "from-emerald-50", "to-white", "p-4", "shadow-sm"], [1, "text-xs", "font-medium", "uppercase", "tracking-wide", "text-emerald-600"], [1, "rounded-xl", "border", "border-amber-100", "bg-gradient-to-br", "from-amber-50", "to-white", "p-4", "shadow-sm"], [1, "text-xs", "font-medium", "uppercase", "tracking-wide", "text-amber-700"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "shadow-sm", "overflow-hidden"], [3, "config", "rowTemplate"], [1, "text-xs", "text-gray-400", "mt-4", "text-center"], [1, "px-2", "py-2"], [1, "flex", "flex-col", "gap-0.5"], [1, "inline-flex", "items-center", "w-fit", "px-2.5", "py-1", "rounded-md", "text-xs", "font-semibold", "bg-indigo-100", "text-indigo-800"], [1, "text-xs", "text-gray-600", "truncate", "max-w-[170px]"], [1, "text-sm", "font-medium", "text-gray-900", "m-0"], [1, "inline-flex", "items-center", "justify-center", "min-w-[2.5rem]", "px-2", "py-0.5", "rounded-full", "text-sm", "font-semibold", "bg-slate-100", "text-slate-800"], [1, "flex", "flex-col"], [1, "text-xs", "text-gray-500"], [1, "text-sm", "font-semibold", "text-emerald-700"], [1, "text-sm", "font-semibold", "text-gray-900", "m-0"]], template: function SalesReportComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div")(5, "h2", 5);
      \u0275\u0275text(6, "Reporte de Ventas - Zona Norte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 6);
      \u0275\u0275text(8, "Vista demo: desempe\xF1o por vendedor y sucursal");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 7)(10, "div", 8)(11, "div", 9)(12, "label", 10);
      \u0275\u0275text(13, "Sucursal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "select", 11);
      \u0275\u0275twoWayListener("ngModelChange", function SalesReportComponent_Template_select_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedSucursalId, $event) || (ctx.selectedSucursalId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function SalesReportComponent_Template_select_change_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter());
      });
      \u0275\u0275elementStart(15, "option", 12);
      \u0275\u0275text(16, "Todas las sucursales");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(17, SalesReportComponent_For_18_Template, 2, 2, "option", 13, _forTrack0);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(19, "div", 14)(20, "div", 15)(21, "p", 16);
      \u0275\u0275text(22, "Vendedores (demo)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "p", 17);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 18)(26, "p", 19);
      \u0275\u0275text(27, "Ventas acumuladas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p", 17);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 20)(31, "p", 21);
      \u0275\u0275text(32, "Monto total (demo)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "p", 17);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 22);
      \u0275\u0275element(36, "app-datatable-wrapper", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "p", 24);
      \u0275\u0275text(38, "Datos de demostraci\xF3n \u2014 conecta el API cuando est\xE9 listo.");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(39, SalesReportComponent_ng_template_39_Template, 21, 7, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r5 = \u0275\u0275reference(40);
      \u0275\u0275advance(14);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedSucursalId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.branches);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.table_config().totalResults);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.totalSalesCount(), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.formatCurrency(ctx.totalSoldSum()), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r5);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DatatableWrapperComponent], styles: [`

[_nghost-%COMP%] {
  display: block;
  height: 100%;
}
.zn-filter-bar__inner[_ngcontent-%COMP%] {
  max-width: 320px;
}
.zn-filter-bar__label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.35rem;
}
.zn-filter-bar__select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1f2937;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.25rem;
}
.zn-filter-bar__select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #818cf8;
  box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.2);
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
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 class="text-2xl font-semibold text-gray-800">Reporte de Ventas - Zona Norte</h2>
              <p class="text-sm text-gray-600 mt-1">Vista demo: desempe\xF1o por vendedor y sucursal</p>
            </div>
          </div>

          <div class="mb-4">
            <div class="zn-filter-bar" role="search" aria-label="Filtros del reporte">
              <div class="zn-filter-bar__inner">
                <label class="zn-filter-bar__label" for="zn-sucursal">Sucursal</label>
                <select
                  id="zn-sucursal"
                  class="zn-filter-bar__select"
                  [(ngModel)]="selectedSucursalId"
                  (change)="applyFilter()"
                  aria-label="Filtrar por sucursal">
                  <option value="">Todas las sucursales</option>
                  @for (b of branches; track b.id) {
                    <option [value]="b.id">{{ b.name }}</option>
                  }
                </select>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-violet-600">Vendedores (demo)</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ table_config().totalResults }}</p>
            </div>
            <div class="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-emerald-600">Ventas acumuladas</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ totalSalesCount() }}
              </p>
            </div>
            <div class="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-wide text-amber-700">Monto total (demo)</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">
                {{ formatCurrency(totalSoldSum()) }}
              </p>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <app-datatable-wrapper
              [config]="table_config()"
              [rowTemplate]="tableTemplate">
            </app-datatable-wrapper>
          </div>

          <p class="text-xs text-gray-400 mt-4 text-center">Datos de demostraci\xF3n \u2014 conecta el API cuando est\xE9 listo.</p>
        </div>
      </div>
    </div>

    <ng-template #tableTemplate let-item="$implicit">
      <td class="px-2 py-2">
        <div class="flex flex-col gap-0.5">
          <span class="inline-flex items-center w-fit px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-800">
            {{ branchShortLabel(item.branchName) }}
          </span>
          <span class="text-xs text-gray-600 truncate max-w-[170px]">{{ item.branchName }}</span>
        </div>
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
          <span class="text-sm font-semibold text-emerald-700">{{ formatCurrency(commissionAmount(item)) }}</span>
        </div>
      </td>
      <td class="px-2 py-2">
        <p class="text-sm font-semibold text-gray-900 m-0">{{ formatCurrency(item.totalSold) }}</p>
      </td>
    </ng-template>
  `, styles: [`/* angular:styles/component:scss;2917dbee0bc862f4136a91672997334d44c8d33c7d2fd157fdab5704f306530c;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/zona-norte-reports/pages/sales-report/sales-report.component.ts */
:host {
  display: block;
  height: 100%;
}
.zn-filter-bar__inner {
  max-width: 320px;
}
.zn-filter-bar__label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.35rem;
}
.zn-filter-bar__select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1f2937;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.25rem;
}
.zn-filter-bar__select:focus {
  outline: none;
  border-color: #818cf8;
  box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.2);
}
/*# sourceMappingURL=sales-report.component.css.map */
`] }]
  }], null, { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SalesReportComponent, { className: "SalesReportComponent", filePath: "src/app/features/zona-norte-reports/pages/sales-report/sales-report.component.ts", lineNumber: 220 });
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
//# sourceMappingURL=chunk-KSZ4IIUN.js.map
