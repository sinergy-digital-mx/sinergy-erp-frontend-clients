import {
  InventoryTransferService,
  TransferDetailDialogComponent
} from "./chunk-TMSHYAU7.js";
import "./chunk-HFX4HJCD.js";
import "./chunk-LGI3IR5X.js";
import {
  RemoveTrailingZerosPipe
} from "./chunk-DJEHDYUN.js";
import "./chunk-QOH5WOHA.js";
import "./chunk-BXIHUGCW.js";
import "./chunk-I7WEELU2.js";
import {
  BranchService
} from "./chunk-BXITMCQU.js";
import "./chunk-UZFR75UC.js";
import "./chunk-XYSQWTGQ.js";
import "./chunk-VC2XUF46.js";
import "./chunk-F65OR5PH.js";
import "./chunk-3YDE66GB.js";
import "./chunk-O7LFISSX.js";
import "./chunk-XPSKNRZU.js";
import "./chunk-4VG5IEU6.js";
import "./chunk-3BJZNAHA.js";
import "./chunk-EUPOEI4B.js";
import "./chunk-K6DFM2KE.js";
import "./chunk-EQHNMCLE.js";
import "./chunk-RGTVHKC4.js";
import {
  WarehouseService
} from "./chunk-DJ4GYXTA.js";
import {
  DatatableWrapperComponent
} from "./chunk-L47FLSDR.js";
import "./chunk-L4EQ5WDD.js";
import {
  MatDialog
} from "./chunk-AL73GUEM.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-HNVE2F7I.js";
import "./chunk-B4R54IPF.js";
import "./chunk-CYJDZ4ZT.js";
import "./chunk-IP3VK3BQ.js";
import "./chunk-BMQ5UVGT.js";
import {
  ArrowLeft,
  LucideAngularComponent,
  LucideAngularModule
} from "./chunk-34Z4N5YB.js";
import "./chunk-B7UOHVOJ.js";
import {
  RouterLink
} from "./chunk-55FJTJJ6.js";
import {
  CommonModule
} from "./chunk-BMMLV6YT.js";
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
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-57S27ROJ.js";

// src/app/features/inventory/components/transfer-list/transfer-list.component.ts
var _c0 = ["tableTemplate"];
var _forTrack0 = ($index, $item) => $item.id;
function TransferListComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r2 = ctx.$implicit;
    \u0275\u0275property("value", branch_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", branch_r2.code, " \u2014 ", branch_r2.city);
  }
}
function TransferListComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r3 = ctx.$implicit;
    \u0275\u0275property("value", wh_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(wh_r3.name);
  }
}
function TransferListComponent_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r4 = ctx.$implicit;
    \u0275\u0275property("value", branch_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", branch_r4.code, " \u2014 ", branch_r4.city);
  }
}
function TransferListComponent_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r5 = ctx.$implicit;
    \u0275\u0275property("value", wh_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(wh_r5.name);
  }
}
function TransferListComponent_ng_template_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 20)(1, "span", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 22)(4, "div", 23)(5, "span", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "td", 26)(10, "span", 27);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 28)(14, "span", 27);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 28)(17, "span", 27);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 29)(20, "span", 27);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td", 29)(23, "span", 25);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r6 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r6.folio, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r6.product_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.product_sku);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(12, 9, item_r6.total_quantity), " ", item_r6.uom_name);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r6.warehouseLabel(item_r6.source_warehouse));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r6.warehouseLabel(item_r6.destination_warehouse));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((item_r6.created_by_user == null ? null : item_r6.created_by_user.name) || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r6.formatDate(item_r6.created_at));
  }
}
var TransferListComponent = class _TransferListComponent {
  transferService;
  warehouseService;
  branchService;
  dialog;
  tableTemplate;
  ArrowLeft = ArrowLeft;
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  sourceWarehouseId = signal("", ...ngDevMode ? [{ debugName: "sourceWarehouseId" }] : []);
  destinationWarehouseId = signal("", ...ngDevMode ? [{ debugName: "destinationWarehouseId" }] : []);
  sourceBranchId = signal("", ...ngDevMode ? [{ debugName: "sourceBranchId" }] : []);
  destinationBranchId = signal("", ...ngDevMode ? [{ debugName: "destinationBranchId" }] : []);
  createdFrom = signal("", ...ngDevMode ? [{ debugName: "createdFrom" }] : []);
  createdTo = signal("", ...ngDevMode ? [{ debugName: "createdTo" }] : []);
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  transfersData = signal([], ...ngDevMode ? [{ debugName: "transfersData" }] : []);
  paginationState = signal({ page: 1, limit: 20 }, ...ngDevMode ? [{ debugName: "paginationState" }] : []);
  totalResultsState = signal(0, ...ngDevMode ? [{ debugName: "totalResultsState" }] : []);
  table_config = signal({
    rows: [],
    columns: [
      { name: "Folio", prop: "folio", sortable: false, canAutoResize: false, width: 120 },
      { name: "Producto", prop: "product_name", sortable: false, canAutoResize: false, width: 180 },
      { name: "Cantidad", prop: "total_quantity", sortable: false, canAutoResize: false, width: 110 },
      { name: "Origen", prop: "source_warehouse", sortable: false, canAutoResize: false, width: 160 },
      { name: "Destino", prop: "destination_warehouse", sortable: false, canAutoResize: false, width: 160 },
      { name: "Usuario", prop: "created_by_user", sortable: false, canAutoResize: false, width: 140 },
      { name: "Fecha", prop: "created_at", sortable: false, canAutoResize: false, width: 140 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin transferencias", subtitle: "No se encontraron transferencias de inventario" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  constructor(transferService, warehouseService, branchService, dialog) {
    this.transferService = transferService;
    this.warehouseService = warehouseService;
    this.branchService = branchService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadWarehouses();
    this.loadBranches();
    this.loadTransfers();
  }
  loadWarehouses() {
    this.warehouseService.getWarehouses({ limit: 500 }).subscribe({
      next: (response) => this.warehouses.set(response.data || [])
    });
  }
  loadBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => this.branches.set(branches)
    });
  }
  loadTransfers() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const { page, limit } = this.paginationState();
    const filters = {
      search: this.searchTerm() || void 0,
      source_warehouse_id: this.sourceWarehouseId() || void 0,
      destination_warehouse_id: this.destinationWarehouseId() || void 0,
      source_billing_branch_id: this.sourceBranchId() || void 0,
      destination_billing_branch_id: this.destinationBranchId() || void 0,
      created_from: this.createdFrom() || void 0,
      created_to: this.createdTo() || void 0
    };
    this.transferService.getTransfers(filters, { page, limit }).subscribe({
      next: (response) => {
        const transfers = response.data || [];
        this.transfersData.set(transfers);
        this.totalResultsState.set(response.total || 0);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: transfers,
          totalResults: response.total || 0,
          page,
          hasNext: page < (response.totalPages || 1),
          loading: false
        }));
      },
      error: () => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
      }
    });
  }
  onSearch() {
    this.paginationState.update((p) => __spreadProps(__spreadValues({}, p), { page: 1 }));
    this.loadTransfers();
  }
  onFilterChange() {
    this.paginationState.update((p) => __spreadProps(__spreadValues({}, p), { page: 1 }));
    this.loadTransfers();
  }
  onPageChange(event) {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadTransfers();
  }
  openTransferDetail(transfer) {
    this.dialog.open(TransferDetailDialogComponent, {
      data: { transferId: transfer.id },
      width: "800px",
      maxWidth: "95vw",
      maxHeight: "90vh"
    });
  }
  formatDate(dateString) {
    if (!dateString)
      return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  warehouseLabel(wh) {
    return `${wh.billing_branch_code} / ${wh.name}`;
  }
  static \u0275fac = function TransferListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TransferListComponent)(\u0275\u0275directiveInject(InventoryTransferService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TransferListComponent, selectors: [["app-transfer-list"]], viewQuery: function TransferListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 45, vars: 11, consts: [["tableTemplate", ""], [1, "purchase-order-list-container"], [1, "purchase-content"], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "flex", "items-center", "gap-3"], ["routerLink", "/inventory", "title", "Volver a inventario", 1, "back-link"], [3, "img", "size"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "mb-4"], ["role", "search", "aria-label", "Filtros de transferencias", 1, "filter-bar"], [1, "filter-bar__container", "filter-bar__container--wrap"], [1, "filter-bar__field"], ["type", "text", "placeholder", "Buscar folio, producto o SKU...", 1, "filter-bar__input", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], ["type", "date", "aria-label", "Desde", 1, "filter-bar__input", 3, "ngModelChange", "change", "ngModel"], ["type", "date", "aria-label", "Hasta", 1, "filter-bar__input", 3, "ngModelChange", "change", "ngModel"], [3, "pageChange", "rowClick", "config", "rowTemplate"], [1, "px-2", "py-2", "w-[120px]"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-semibold", "bg-indigo-100", "text-indigo-700"], [1, "px-2", "py-2", "w-[180px]"], [1, "flex", "flex-col"], [1, "text-sm", "font-medium", "text-gray-900", "truncate"], [1, "text-xs", "text-gray-500"], [1, "px-2", "py-2", "w-[110px]"], [1, "text-sm", "text-gray-700"], [1, "px-2", "py-2", "w-[160px]"], [1, "px-2", "py-2", "w-[140px]"]], template: function TransferListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "a", 6);
      \u0275\u0275element(6, "lucide-icon", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h2", 8);
      \u0275\u0275text(8, "Transferencias de inventario");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 9)(10, "div", 10)(11, "div", 11)(12, "div", 12)(13, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function TransferListComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("keyup.enter", function TransferListComponent_Template_input_keyup_enter_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearch());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 12)(15, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function TransferListComponent_Template_select_ngModelChange_15_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.sourceBranchId, $event) || (ctx.sourceBranchId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function TransferListComponent_Template_select_change_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterChange());
      });
      \u0275\u0275elementStart(16, "option", 15);
      \u0275\u0275text(17, "Sucursal origen");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(18, TransferListComponent_For_19_Template, 2, 3, "option", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 12)(21, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function TransferListComponent_Template_select_ngModelChange_21_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.sourceWarehouseId, $event) || (ctx.sourceWarehouseId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function TransferListComponent_Template_select_change_21_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterChange());
      });
      \u0275\u0275elementStart(22, "option", 15);
      \u0275\u0275text(23, "Almac\xE9n origen");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(24, TransferListComponent_For_25_Template, 2, 2, "option", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 12)(27, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function TransferListComponent_Template_select_ngModelChange_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.destinationBranchId, $event) || (ctx.destinationBranchId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function TransferListComponent_Template_select_change_27_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterChange());
      });
      \u0275\u0275elementStart(28, "option", 15);
      \u0275\u0275text(29, "Sucursal destino");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(30, TransferListComponent_For_31_Template, 2, 3, "option", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 12)(33, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function TransferListComponent_Template_select_ngModelChange_33_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.destinationWarehouseId, $event) || (ctx.destinationWarehouseId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function TransferListComponent_Template_select_change_33_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterChange());
      });
      \u0275\u0275elementStart(34, "option", 15);
      \u0275\u0275text(35, "Almac\xE9n destino");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(36, TransferListComponent_For_37_Template, 2, 2, "option", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "div", 12)(39, "input", 17);
      \u0275\u0275twoWayListener("ngModelChange", function TransferListComponent_Template_input_ngModelChange_39_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.createdFrom, $event) || (ctx.createdFrom = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function TransferListComponent_Template_input_change_39_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterChange());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 12)(41, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function TransferListComponent_Template_input_ngModelChange_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.createdTo, $event) || (ctx.createdTo = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function TransferListComponent_Template_input_change_41_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterChange());
      });
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(42, "app-datatable-wrapper", 19);
      \u0275\u0275listener("pageChange", function TransferListComponent_Template_app_datatable_wrapper_pageChange_42_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("rowClick", function TransferListComponent_Template_app_datatable_wrapper_rowClick_42_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openTransferDetail($event.data));
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(43, TransferListComponent_ng_template_43_Template, 25, 11, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r8 = \u0275\u0275reference(44);
      \u0275\u0275advance(6);
      \u0275\u0275property("img", ctx.ArrowLeft)("size", 18);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.sourceBranchId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.branches());
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.sourceWarehouseId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.warehouses());
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.destinationBranchId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.branches());
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.destinationWarehouseId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.warehouses());
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.createdFrom);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.createdTo);
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r8);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    RouterLink,
    DatatableWrapperComponent,
    LucideAngularModule,
    LucideAngularComponent,
    RemoveTrailingZerosPipe
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
.back-link[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  color: #6b7280;
  transition: all 0.15s;
}
.back-link[_ngcontent-%COMP%]:hover {
  background: #f3f4f6;
  color: #374151;
}
.filter-bar__container--wrap[_ngcontent-%COMP%] {
  flex-wrap: wrap;
}
/*# sourceMappingURL=transfer-list.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransferListComponent, [{
    type: Component,
    args: [{ selector: "app-transfer-list", standalone: true, imports: [
      CommonModule,
      FormsModule,
      RouterLink,
      DatatableWrapperComponent,
      RemoveTrailingZerosPipe,
      LucideAngularModule
    ], template: `<div class="purchase-order-list-container">\r
  <div class="purchase-content">\r
    <div class="px-4">\r
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
        <div class="flex items-center gap-3">\r
          <a routerLink="/inventory" class="back-link" title="Volver a inventario">\r
            <lucide-icon [img]="ArrowLeft" [size]="18"></lucide-icon>\r
          </a>\r
          <h2 class="text-2xl font-semibold text-gray-800">Transferencias de inventario</h2>\r
        </div>\r
      </div>\r
\r
      <div class="mb-4">\r
        <div class="filter-bar" role="search" aria-label="Filtros de transferencias">\r
          <div class="filter-bar__container filter-bar__container--wrap">\r
            <div class="filter-bar__field">\r
              <input\r
                type="text"\r
                [(ngModel)]="searchTerm"\r
                (keyup.enter)="onSearch()"\r
                placeholder="Buscar folio, producto o SKU..."\r
                class="filter-bar__input"\r
              />\r
            </div>\r
            <div class="filter-bar__field">\r
              <select\r
                [(ngModel)]="sourceBranchId"\r
                (change)="onFilterChange()"\r
                class="filter-bar__select"\r
              >\r
                <option value="">Sucursal origen</option>\r
                @for (branch of branches(); track branch.id) {\r
                  <option [value]="branch.id">{{ branch.code }} \u2014 {{ branch.city }}</option>\r
                }\r
              </select>\r
            </div>\r
            <div class="filter-bar__field">\r
              <select\r
                [(ngModel)]="sourceWarehouseId"\r
                (change)="onFilterChange()"\r
                class="filter-bar__select"\r
              >\r
                <option value="">Almac\xE9n origen</option>\r
                @for (wh of warehouses(); track wh.id) {\r
                  <option [value]="wh.id">{{ wh.name }}</option>\r
                }\r
              </select>\r
            </div>\r
            <div class="filter-bar__field">\r
              <select\r
                [(ngModel)]="destinationBranchId"\r
                (change)="onFilterChange()"\r
                class="filter-bar__select"\r
              >\r
                <option value="">Sucursal destino</option>\r
                @for (branch of branches(); track branch.id) {\r
                  <option [value]="branch.id">{{ branch.code }} \u2014 {{ branch.city }}</option>\r
                }\r
              </select>\r
            </div>\r
            <div class="filter-bar__field">\r
              <select\r
                [(ngModel)]="destinationWarehouseId"\r
                (change)="onFilterChange()"\r
                class="filter-bar__select"\r
              >\r
                <option value="">Almac\xE9n destino</option>\r
                @for (wh of warehouses(); track wh.id) {\r
                  <option [value]="wh.id">{{ wh.name }}</option>\r
                }\r
              </select>\r
            </div>\r
            <div class="filter-bar__field">\r
              <input\r
                type="date"\r
                [(ngModel)]="createdFrom"\r
                (change)="onFilterChange()"\r
                class="filter-bar__input"\r
                aria-label="Desde"\r
              />\r
            </div>\r
            <div class="filter-bar__field">\r
              <input\r
                type="date"\r
                [(ngModel)]="createdTo"\r
                (change)="onFilterChange()"\r
                class="filter-bar__input"\r
                aria-label="Hasta"\r
              />\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <app-datatable-wrapper\r
        [config]="table_config()"\r
        [rowTemplate]="tableTemplate"\r
        (pageChange)="onPageChange($event)"\r
        (rowClick)="openTransferDetail($event.data)">\r
      </app-datatable-wrapper>\r
    </div>\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td class="px-2 py-2 w-[120px]">\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-indigo-100 text-indigo-700">\r
      {{ item.folio }}\r
    </span>\r
  </td>\r
  <td class="px-2 py-2 w-[180px]">\r
    <div class="flex flex-col">\r
      <span class="text-sm font-medium text-gray-900 truncate">{{ item.product_name }}</span>\r
      <span class="text-xs text-gray-500">{{ item.product_sku }}</span>\r
    </div>\r
  </td>\r
  <td class="px-2 py-2 w-[110px]">\r
    <span class="text-sm text-gray-700">{{ item.total_quantity | removeTrailingZeros }} {{ item.uom_name }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[160px]">\r
    <span class="text-sm text-gray-700">{{ warehouseLabel(item.source_warehouse) }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[160px]">\r
    <span class="text-sm text-gray-700">{{ warehouseLabel(item.destination_warehouse) }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[140px]">\r
    <span class="text-sm text-gray-700">{{ item.created_by_user?.name || '\u2014' }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[140px]">\r
    <span class="text-xs text-gray-500">{{ formatDate(item.created_at) }}</span>\r
  </td>\r
</ng-template>\r
`, styles: [`/* src/app/features/inventory/components/transfer-list/transfer-list.component.scss */
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
.back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  color: #6b7280;
  transition: all 0.15s;
}
.back-link:hover {
  background: #f3f4f6;
  color: #374151;
}
.filter-bar__container--wrap {
  flex-wrap: wrap;
}
/*# sourceMappingURL=transfer-list.component.css.map */
`] }]
  }], () => [{ type: InventoryTransferService }, { type: WarehouseService }, { type: BranchService }, { type: MatDialog }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TransferListComponent, { className: "TransferListComponent", filePath: "src/app/features/inventory/components/transfer-list/transfer-list.component.ts", lineNumber: 33 });
})();
export {
  TransferListComponent
};
//# sourceMappingURL=chunk-W3JWTA6C.js.map
