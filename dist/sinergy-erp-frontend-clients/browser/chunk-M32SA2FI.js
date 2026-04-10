import {
  BatchDetailDialogComponent,
  InventoryBatchService,
  OrderDetailDialogComponent,
  RemoveTrailingZerosPipe
} from "./chunk-DVAIDVYL.js";
import "./chunk-SFPCIKZR.js";
import "./chunk-BUMMMPXI.js";
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
import {
  ChevronDown,
  ChevronRight,
  LucideAngularComponent,
  LucideAngularModule
} from "./chunk-XYBC4MWB.js";
import "./chunk-KNFYVOET.js";
import {
  MatDialog
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-TXPVZZCM.js";
import {
  HttpClient,
  HttpParams,
  Router,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  Injectable,
  ViewChild,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  setClassMetadata,
  signal,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
} from "./chunk-7ZU2RCPO.js";

// src/app/features/inventory/services/inventory.service.ts
var InventoryService = class _InventoryService {
  http;
  router;
  baseUrl = `${environment.api}/tenant/inventory`;
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
  /**
   * Get paginated list of inventory items with filters
   */
  getItems(filters, pagination) {
    let params = new HttpParams().set("page", pagination.page.toString()).set("limit", pagination.limit.toString());
    if (filters.search) {
      params = params.set("search", filters.search);
    }
    if (filters.warehouse_id) {
      params = params.set("warehouse_id", filters.warehouse_id);
    }
    if (filters.low_stock !== void 0) {
      params = params.set("low_stock", filters.low_stock.toString());
    }
    if (filters.product_id) {
      params = params.set("product_id", filters.product_id);
    }
    return this.http.get(`${this.baseUrl}/items`, { params }).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Get single inventory item by ID
   */
  getItemById(id) {
    return this.http.get(`${this.baseUrl}/items/${id}`).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Get inventory movements
   */
  getMovements(filters, pagination) {
    let params = new HttpParams().set("page", pagination.page.toString()).set("limit", pagination.limit.toString());
    if (filters.product_id) {
      params = params.set("product_id", filters.product_id);
    }
    if (filters.warehouse_id) {
      params = params.set("warehouse_id", filters.warehouse_id);
    }
    return this.http.get(`${this.baseUrl}/movements`, { params }).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Create inventory adjustment
   */
  createAdjustment(data) {
    return this.http.post(`${this.baseUrl}/adjustments`, data).pipe(tap((movement) => {
      console.log("[Inventory] Adjustment created successfully", { id: movement.id });
    }), catchError((error) => {
      console.error("[Inventory] Failed to create adjustment", error);
      return this.handleError(error);
    }));
  }
  /**
   * Get stock reservations
   */
  getReservations(filters, pagination) {
    let params = new HttpParams().set("page", pagination.page.toString()).set("limit", pagination.limit.toString());
    if (filters.product_id) {
      params = params.set("product_id", filters.product_id);
    }
    if (filters.warehouse_id) {
      params = params.set("warehouse_id", filters.warehouse_id);
    }
    if (filters.status) {
      params = params.set("status", filters.status);
    }
    return this.http.get(`${this.baseUrl}/reservations`, { params }).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Get inventory reports
   */
  getStockReport(warehouse_id) {
    let params = new HttpParams();
    if (warehouse_id) {
      params = params.set("warehouse_id", warehouse_id);
    }
    return this.http.get(`${this.baseUrl}/reports/stock`, { params }).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Get inventory summary (totalized by product and warehouse)
   */
  getSummary(filters, pagination) {
    let params = new HttpParams().set("page", pagination.page.toString()).set("limit", pagination.limit.toString());
    if (filters.search) {
      params = params.set("search", filters.search);
    }
    if (filters.warehouse_id) {
      params = params.set("warehouse_id", filters.warehouse_id);
    }
    if (filters.product_id) {
      params = params.set("product_id", filters.product_id);
    }
    if (filters.only_available !== void 0) {
      params = params.set("only_available", filters.only_available.toString());
    }
    if (filters.sort_by) {
      params = params.set("sort_by", filters.sort_by);
    }
    if (filters.sort_order) {
      params = params.set("sort_order", filters.sort_order);
    }
    const url = `${this.baseUrl}/summary`;
    console.log("[InventoryService] Calling getSummary:", { url, params: params.toString() });
    return this.http.get(url, { params }).pipe(tap((response) => console.log("[InventoryService] getSummary response:", response)), catchError((error) => {
      console.error("[InventoryService] getSummary error:", error);
      return this.handleError(error);
    }));
  }
  /**
   * Handle HTTP errors
   */
  handleError(error) {
    let errorMessage;
    switch (error.status) {
      case 401:
        this.router.navigate(["/auth/login"]);
        errorMessage = "Sesi\xF3n expirada. Por favor, inicia sesi\xF3n nuevamente.";
        break;
      case 403:
        errorMessage = "No tienes permisos para realizar esta acci\xF3n";
        break;
      case 404:
        errorMessage = "Art\xEDculo de inventario no encontrado";
        break;
      case 422:
        errorMessage = this.extractValidationErrors(error);
        break;
      case 500:
        errorMessage = "Error del servidor. Por favor, intenta m\xE1s tarde";
        break;
      case 0:
        errorMessage = "Error de conexi\xF3n. Por favor, verifica tu conexi\xF3n a internet";
        break;
      default:
        errorMessage = "Ha ocurrido un error inesperado";
    }
    return throwError(() => new Error(errorMessage));
  }
  /**
   * Extract validation errors from response
   */
  extractValidationErrors(error) {
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat();
      return errors.join(", ");
    }
    return "Error de validaci\xF3n. Por favor, verifica los datos ingresados.";
  }
  static \u0275fac = function InventoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventoryService, factory: _InventoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

// src/app/features/inventory/components/inventory-batch-list/inventory-batch-list.component.ts
var _c0 = ["tableTemplate"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.product_id + $item.warehouse_id;
var _forTrack2 = ($index, $item) => $item.batch_id;
function InventoryBatchListComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r2 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(warehouse_r2.name);
  }
}
function InventoryBatchListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-datatable-wrapper", 18);
    \u0275\u0275listener("pageChange", function InventoryBatchListComponent_Conditional_24_Template_app_datatable_wrapper_pageChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPageChange($event));
    })("sortChange", function InventoryBatchListComponent_Conditional_24_Template_app_datatable_wrapper_sortChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onSortChange($event));
    })("rowClick", function InventoryBatchListComponent_Conditional_24_Template_app_datatable_wrapper_rowClick_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openBatchDetail($event.data));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const tableTemplate_r5 = \u0275\u0275reference(27);
    \u0275\u0275property("config", ctx_r3.table_config())("rowTemplate", tableTemplate_r5);
  }
}
function InventoryBatchListComponent_Conditional_25_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "p", 22);
    \u0275\u0275text(2, "Cargando inventario totalizado...");
    \u0275\u0275elementEnd()();
  }
}
function InventoryBatchListComponent_Conditional_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "p", 22);
    \u0275\u0275text(2, "No hay productos en inventario");
    \u0275\u0275elementEnd()();
  }
}
function InventoryBatchListComponent_Conditional_25_Conditional_2_For_21_Conditional_18_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 57);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 58);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 59);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 60);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const batch_r9 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(batch_r9.batch_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(batch_r9.purchase_order_folio);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatNumber(batch_r9.available_quantity));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatNumber(batch_r9.initial_quantity));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatDate(batch_r9.created_at));
  }
}
function InventoryBatchListComponent_Conditional_25_Conditional_2_For_21_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 24)(1, "td", 49)(2, "div", 50)(3, "table", 51)(4, "thead", 52)(5, "tr")(6, "th", 53);
    \u0275\u0275text(7, "Lote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 53);
    \u0275\u0275text(9, "Folio PO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 54);
    \u0275\u0275text(11, "Disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 54);
    \u0275\u0275text(13, "Inicial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 53);
    \u0275\u0275text(15, "Fecha");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody", 55);
    \u0275\u0275repeaterCreate(17, InventoryBatchListComponent_Conditional_25_Conditional_2_For_21_Conditional_18_For_18_Template, 11, 5, "tr", null, _forTrack2);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(17);
    \u0275\u0275repeater(item_r8.batches);
  }
}
function InventoryBatchListComponent_Conditional_25_Conditional_2_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 40)(1, "td", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 42);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 42);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 43);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 44);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 45);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 46)(16, "button", 47);
    \u0275\u0275listener("click", function InventoryBatchListComponent_Conditional_25_Conditional_2_For_21_Template_button_click_16_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.toggleBatches(item_r8));
    });
    \u0275\u0275element(17, "lucide-icon", 48);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(18, InventoryBatchListComponent_Conditional_25_Conditional_2_For_21_Conditional_18_Template, 19, 0, "tr", 24);
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.product_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.product_sku);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.warehouse_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.uom_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatNumber(item_r8.total_available_quantity));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatNumber(item_r8.total_initial_quantity));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.total_batches);
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r3.isExpanded(item_r8) ? ctx_r3.ChevronDown : ctx_r3.ChevronRight)("size", 16);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isExpanded(item_r8) ? 18 : -1);
  }
}
function InventoryBatchListComponent_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "table", 23)(2, "thead", 24)(3, "tr")(4, "th", 25);
    \u0275\u0275text(5, "Producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 25);
    \u0275\u0275text(7, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 25);
    \u0275\u0275text(9, "Almac\xE9n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 25);
    \u0275\u0275text(11, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 26);
    \u0275\u0275text(13, "Disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 26);
    \u0275\u0275text(15, "Inicial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 27);
    \u0275\u0275text(17, "Lotes");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "th", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "tbody", 29);
    \u0275\u0275repeaterCreate(20, InventoryBatchListComponent_Conditional_25_Conditional_2_For_21_Template, 19, 10, null, null, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 30)(23, "div", 31)(24, "button", 32);
    \u0275\u0275listener("click", function InventoryBatchListComponent_Conditional_25_Conditional_2_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onSummaryPageChange(ctx_r3.summaryPage - 1));
    });
    \u0275\u0275text(25, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 33);
    \u0275\u0275listener("click", function InventoryBatchListComponent_Conditional_25_Conditional_2_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onSummaryPageChange(ctx_r3.summaryPage + 1));
    });
    \u0275\u0275text(27, " Siguiente ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 34)(29, "div")(30, "p", 35);
    \u0275\u0275text(31, " P\xE1gina ");
    \u0275\u0275elementStart(32, "span", 36);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(34, " de ");
    \u0275\u0275elementStart(35, "span", 36);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(37, "div")(38, "nav", 37)(39, "button", 38);
    \u0275\u0275listener("click", function InventoryBatchListComponent_Conditional_25_Conditional_2_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onSummaryPageChange(ctx_r3.summaryPage - 1));
    });
    \u0275\u0275text(40, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 39);
    \u0275\u0275listener("click", function InventoryBatchListComponent_Conditional_25_Conditional_2_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onSummaryPageChange(ctx_r3.summaryPage + 1));
    });
    \u0275\u0275text(42, " Siguiente ");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r3.summaryItems);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r3.summaryPage === 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.summaryPage >= ctx_r3.summaryTotalPages);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r3.summaryPage);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.summaryTotalPages);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r3.summaryPage === 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.summaryPage >= ctx_r3.summaryTotalPages);
  }
}
function InventoryBatchListComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, InventoryBatchListComponent_Conditional_25_Conditional_0_Template, 3, 0, "div", 19)(1, InventoryBatchListComponent_Conditional_25_Conditional_1_Template, 3, 0, "div", 20)(2, InventoryBatchListComponent_Conditional_25_Conditional_2_Template, 43, 6, "div", 21);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r3.summaryLoading ? 0 : ctx_r3.summaryItems.length === 0 ? 1 : 2);
  }
}
function InventoryBatchListComponent_ng_template_26_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275listener("click", function InventoryBatchListComponent_ng_template_26_Conditional_17_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openPurchaseOrderDetail(item_r11, $event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r11.purchase_order_folio, " ");
  }
}
function InventoryBatchListComponent_ng_template_26_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function InventoryBatchListComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 61)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 63)(4, "div", 64)(5, "span", 65);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 66);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "td", 61)(10, "span", 35);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 67)(13, "span", 35);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 68);
    \u0275\u0275conditionalCreate(17, InventoryBatchListComponent_ng_template_26_Conditional_17_Template, 2, 1, "span", 69)(18, InventoryBatchListComponent_ng_template_26_Conditional_18_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 71)(20, "span", 66);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r11.batch_number, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r11.product_name || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r11.product_sku || "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r11.warehouse_name || "N/A");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(15, 8, item_r11.quantity), " ", item_r11.uom_name || "Unidad");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(item_r11.purchase_order_folio ? 17 : 18);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.formatDate(item_r11.created_at));
  }
}
var InventoryBatchListComponent = class _InventoryBatchListComponent {
  inventoryBatchService;
  inventoryService;
  warehouseService;
  dialog;
  tableTemplate;
  Math = Math;
  ChevronRight = ChevronRight;
  ChevronDown = ChevronDown;
  activeTabIndex = signal(0, ...ngDevMode ? [{ debugName: "activeTabIndex" }] : []);
  // Filters
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  selectedWarehouse = signal("", ...ngDevMode ? [{ debugName: "selectedWarehouse" }] : []);
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  // State for batches (Por Lotes tab)
  batchesData = signal([], ...ngDevMode ? [{ debugName: "batchesData" }] : []);
  loadingState = signal(false, ...ngDevMode ? [{ debugName: "loadingState" }] : []);
  totalResultsState = signal(0, ...ngDevMode ? [{ debugName: "totalResultsState" }] : []);
  paginationState = signal({ page: 1, limit: 20 }, ...ngDevMode ? [{ debugName: "paginationState" }] : []);
  // State for summary (Totalizado tab)
  summaryData = signal([], ...ngDevMode ? [{ debugName: "summaryData" }] : []);
  summaryLoadingState = signal(false, ...ngDevMode ? [{ debugName: "summaryLoadingState" }] : []);
  summaryTotalResultsState = signal(0, ...ngDevMode ? [{ debugName: "summaryTotalResultsState" }] : []);
  summaryPaginationState = signal({ page: 1, limit: 20 }, ...ngDevMode ? [{ debugName: "summaryPaginationState" }] : []);
  expandedItems = signal(/* @__PURE__ */ new Set(), ...ngDevMode ? [{ debugName: "expandedItems" }] : []);
  table_config = signal({
    rows: [],
    columns: [
      { name: "Lote", prop: "batch_number", sortable: true, canAutoResize: false, width: 130 },
      { name: "Producto", prop: "product_name", sortable: true, canAutoResize: false, width: 180 },
      { name: "Almac\xE9n", prop: "warehouse_name", sortable: false, canAutoResize: false, width: 130 },
      { name: "Cantidad", prop: "quantity", sortable: true, canAutoResize: false, width: 100 },
      { name: "Orden de Compra", prop: "purchase_order_id", sortable: false, canAutoResize: false, width: 140 },
      { name: "Fecha", prop: "created_at", sortable: true, canAutoResize: false, width: 160 }
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron lotes de inventario" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  // Computed totals for "Totalizado" tab
  totalQuantity = computed(() => this.batchesData().reduce((sum, batch) => {
    const qty = typeof batch.quantity === "string" ? parseFloat(batch.quantity) : batch.quantity;
    return sum + (isNaN(qty) ? 0 : qty);
  }, 0), ...ngDevMode ? [{ debugName: "totalQuantity" }] : []);
  warehouseTotals = computed(() => {
    const totals = {};
    this.warehouses().forEach((w) => {
      totals[w.id] = this.getWarehouseTotalQuantity(w.id);
    });
    return totals;
  }, ...ngDevMode ? [{ debugName: "warehouseTotals" }] : []);
  warehousesWithData = computed(() => this.warehouses().filter((w) => this.warehouseTotals()[w.id] > 0), ...ngDevMode ? [{ debugName: "warehousesWithData" }] : []);
  constructor(inventoryBatchService, inventoryService, warehouseService, dialog) {
    this.inventoryBatchService = inventoryBatchService;
    this.inventoryService = inventoryService;
    this.warehouseService = warehouseService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadWarehouses();
    this.loadBatches();
  }
  onTabChange(index) {
    this.activeTabIndex.set(index);
    if (index === 1) {
      this.loadSummary();
    }
  }
  loadSummary() {
    this.summaryLoadingState.set(true);
    const { page, limit } = this.summaryPaginationState();
    const filters = {
      page,
      limit,
      warehouse_id: this.selectedWarehouse() || void 0,
      search: this.searchTerm() || void 0,
      only_available: true
    };
    this.inventoryService.getSummary(filters, { page, limit }).subscribe({
      next: (response) => {
        const items = response.data || [];
        const total = response.total || 0;
        this.summaryData.set(items);
        this.summaryTotalResultsState.set(total);
        this.summaryLoadingState.set(false);
      },
      error: (err) => {
        console.error("Error loading summary:", err);
        this.summaryLoadingState.set(false);
      }
    });
  }
  loadWarehouses() {
    this.warehouseService.getWarehouses().subscribe({
      next: (response) => this.warehouses.set(response.data || []),
      error: (err) => console.error("Error loading warehouses:", err)
    });
  }
  loadBatches() {
    this.loadingState.set(true);
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const { page, limit } = this.paginationState();
    const filters = {
      page,
      limit,
      warehouse_id: this.selectedWarehouse() || void 0,
      search: this.searchTerm() || void 0
    };
    this.inventoryBatchService.getBatches(filters).subscribe({
      next: (response) => {
        const batches = response.data || [];
        const total = response.total || 0;
        const hasNext = response.page < response.totalPages;
        this.batchesData.set(batches);
        this.totalResultsState.set(total);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: batches,
          totalResults: total,
          page,
          hasNext,
          loading: false
        }));
        this.loadingState.set(false);
      },
      error: (err) => {
        console.error("Error loading batches:", err);
        this.loadingState.set(false);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
      }
    });
  }
  openBatchDetail(batch) {
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId: batch.id },
      width: "920px",
      maxWidth: "95vw",
      maxHeight: "90vh"
    });
  }
  openPurchaseOrderDetail(batch, event) {
    event.stopPropagation();
    if (!batch.purchase_order_id)
      return;
    this.dialog.open(OrderDetailDialogComponent, {
      data: { orderId: batch.purchase_order_id },
      width: "1400px",
      maxWidth: "95vw",
      height: "90vh",
      maxHeight: "90vh",
      panelClass: "order-detail-dialog-container"
    });
  }
  onSearch() {
    this.paginationState.set(__spreadProps(__spreadValues({}, this.paginationState()), { page: 1 }));
    this.summaryPaginationState.set(__spreadProps(__spreadValues({}, this.summaryPaginationState()), { page: 1 }));
    if (this.activeTabIndex() === 0) {
      this.loadBatches();
    } else {
      this.loadSummary();
    }
  }
  onWarehouseChange() {
    this.paginationState.set(__spreadProps(__spreadValues({}, this.paginationState()), { page: 1 }));
    this.summaryPaginationState.set(__spreadProps(__spreadValues({}, this.summaryPaginationState()), { page: 1 }));
    if (this.activeTabIndex() === 0) {
      this.loadBatches();
    } else {
      this.loadSummary();
    }
  }
  onPageChange(event) {
    this.paginationState.set({ page: event.page, limit: event.limit });
    this.loadBatches();
  }
  onSortChange(event) {
    console.log("Sort changed:", event);
  }
  formatDate(dateString) {
    if (!dateString)
      return "-";
    const d = new Date(dateString);
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
  getWarehouseTotalQuantity(warehouseId) {
    return this.batchesData().filter((b) => b.warehouse_id === warehouseId).reduce((sum, b) => {
      const qty = typeof b.quantity === "string" ? parseFloat(b.quantity) : b.quantity;
      return sum + (isNaN(qty) ? 0 : qty);
    }, 0);
  }
  // Summary tab methods
  toggleBatches(item) {
    const key = `${item.product_id}_${item.warehouse_id}`;
    const expanded = this.expandedItems();
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
    }
    this.expandedItems.set(new Set(expanded));
  }
  isExpanded(item) {
    const key = `${item.product_id}_${item.warehouse_id}`;
    return this.expandedItems().has(key);
  }
  formatNumber(value) {
    if (value === void 0 || value === null)
      return "0";
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue))
      return "0";
    const hasDecimals = numValue % 1 !== 0;
    if (hasDecimals) {
      return new Intl.NumberFormat("es-MX", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
      }).format(numValue);
    } else {
      return new Intl.NumberFormat("es-MX", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(numValue);
    }
  }
  onSummaryPageChange(page) {
    this.summaryPaginationState.update((p) => __spreadProps(__spreadValues({}, p), { page }));
    this.loadSummary();
  }
  get summaryItems() {
    return this.summaryData();
  }
  get summaryLoading() {
    return this.summaryLoadingState();
  }
  get summaryPage() {
    return this.summaryPaginationState().page;
  }
  get summaryLimit() {
    return this.summaryPaginationState().limit;
  }
  get summaryTotal() {
    return this.summaryTotalResultsState();
  }
  get summaryTotalPages() {
    return Math.ceil(this.summaryTotal / this.summaryLimit);
  }
  static \u0275fac = function InventoryBatchListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryBatchListComponent)(\u0275\u0275directiveInject(InventoryBatchService), \u0275\u0275directiveInject(InventoryService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InventoryBatchListComponent, selectors: [["app-inventory-batch-list"]], viewQuery: function InventoryBatchListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 28, vars: 20, consts: [["tableTemplate", ""], [1, "purchase-order-list-container"], [1, "purchase-content"], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "mb-4"], ["role", "search", "aria-label", "Filtros de inventario", 1, "filter-bar"], [1, "filter-bar__container"], [1, "filter-bar__field"], ["type", "text", "placeholder", "Buscar...", "aria-label", "Buscar por lote o producto", 1, "filter-bar__input", 3, "ngModelChange", "keyup.enter", "ngModel"], ["aria-label", "Filtrar por almac\xE9n", 1, "filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], [1, "border-b", "border-gray-200"], [1, "-mb-px", "flex", "space-x-8"], [1, "border-b-2", "py-4", "px-1", "text-sm", "font-medium", "transition-colors", 3, "click"], [3, "config", "rowTemplate"], [3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "flex", "items-center", "justify-center", "py-12"], [1, "flex", "flex-col", "items-center", "justify-center", "py-12"], [1, "bg-white", "rounded-lg", "shadow-sm", "overflow-hidden"], [1, "text-gray-500"], [1, "min-w-full", "divide-y", "divide-gray-200"], [1, "bg-gray-50"], [1, "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "px-4", "py-3", "text-right", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "px-4", "py-3", "text-center", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "px-4", "py-3"], [1, "bg-white", "divide-y", "divide-gray-200"], [1, "bg-white", "px-4", "py-3", "flex", "items-center", "justify-between", "border-t", "border-gray-200"], [1, "flex-1", "flex", "justify-between", "sm:hidden"], [1, "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "text-sm", "font-medium", "rounded-md", "text-gray-700", "bg-white", "hover:bg-gray-50", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "ml-3", "relative", "inline-flex", "items-center", "px-4", "py-2", "border", "border-gray-300", "text-sm", "font-medium", "rounded-md", "text-gray-700", "bg-white", "hover:bg-gray-50", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "hidden", "sm:flex-1", "sm:flex", "sm:items-center", "sm:justify-between"], [1, "text-sm", "text-gray-700"], [1, "font-medium"], [1, "relative", "z-0", "inline-flex", "rounded-md", "shadow-sm", "-space-x-px"], [1, "relative", "inline-flex", "items-center", "px-2", "py-2", "rounded-l-md", "border", "border-gray-300", "bg-white", "text-sm", "font-medium", "text-gray-500", "hover:bg-gray-50", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "relative", "inline-flex", "items-center", "px-2", "py-2", "rounded-r-md", "border", "border-gray-300", "bg-white", "text-sm", "font-medium", "text-gray-500", "hover:bg-gray-50", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "hover:bg-gray-50", "transition-colors"], [1, "px-4", "py-3", "text-sm", "text-gray-900"], [1, "px-4", "py-3", "text-sm", "text-gray-500"], [1, "px-4", "py-3", "text-sm", "text-gray-900", "text-right"], [1, "px-4", "py-3", "text-sm", "text-gray-500", "text-right"], [1, "px-4", "py-3", "text-sm", "text-gray-500", "text-center"], [1, "px-4", "py-3", "text-right"], [1, "inline-flex", "items-center", "justify-center", "w-6", "h-6", "text-gray-400", "hover:text-blue-600", "hover:bg-blue-50", "rounded", "transition-all", 3, "click"], [3, "img", "size"], ["colspan", "8", 1, "px-4", "py-3"], [1, "ml-8", "border-l-2", "border-blue-500", "pl-4"], [1, "min-w-full"], [1, "bg-gray-100"], [1, "px-3", "py-2", "text-left", "text-xs", "font-medium", "text-gray-600"], [1, "px-3", "py-2", "text-right", "text-xs", "font-medium", "text-gray-600"], [1, "divide-y", "divide-gray-200"], [1, "px-3", "py-2", "text-sm", "text-gray-700"], [1, "px-3", "py-2", "text-sm", "text-blue-600"], [1, "px-3", "py-2", "text-sm", "text-gray-700", "text-right"], [1, "px-3", "py-2", "text-sm", "text-gray-500", "text-right"], [1, "px-3", "py-2", "text-sm", "text-gray-500"], [1, "px-2", "py-2", "w-[130px]"], [1, "inline-flex", "items-center", "px-3", "py-1", "rounded", "text-xs", "font-semibold", "bg-gray-100", "text-gray-700"], [1, "px-2", "py-2", "w-[180px]"], [1, "flex", "flex-col"], [1, "text-sm", "font-medium", "text-gray-900", "truncate"], [1, "text-xs", "text-gray-500"], [1, "px-2", "py-2", "w-[100px]"], [1, "px-2", "py-2", "w-[140px]"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-700", "cursor-pointer", "hover:bg-blue-200", "transition-colors"], [1, "text-sm", "text-gray-400"], [1, "px-2", "py-2", "w-[160px]"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-700", "cursor-pointer", "hover:bg-blue-200", "transition-colors", 3, "click"]], template: function InventoryBatchListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h2", 5);
      \u0275\u0275text(5, "Inventario");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "div", 9)(10, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function InventoryBatchListComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("keyup.enter", function InventoryBatchListComponent_Template_input_keyup_enter_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearch());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9)(12, "select", 11);
      \u0275\u0275twoWayListener("ngModelChange", function InventoryBatchListComponent_Template_select_ngModelChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedWarehouse, $event) || (ctx.selectedWarehouse = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function InventoryBatchListComponent_Template_select_change_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onWarehouseChange());
      });
      \u0275\u0275elementStart(13, "option", 12);
      \u0275\u0275text(14, "Todos los almacenes");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(15, InventoryBatchListComponent_For_16_Template, 2, 2, "option", 13, _forTrack0);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(17, "div", 6)(18, "div", 14)(19, "nav", 15)(20, "button", 16);
      \u0275\u0275listener("click", function InventoryBatchListComponent_Template_button_click_20_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTabChange(0));
      });
      \u0275\u0275text(21, " Por Lotes ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 16);
      \u0275\u0275listener("click", function InventoryBatchListComponent_Template_button_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTabChange(1));
      });
      \u0275\u0275text(23, " Totalizado ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(24, InventoryBatchListComponent_Conditional_24_Template, 1, 2, "app-datatable-wrapper", 17);
      \u0275\u0275conditionalCreate(25, InventoryBatchListComponent_Conditional_25_Template, 3, 1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(26, InventoryBatchListComponent_ng_template_26_Template, 22, 10, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedWarehouse);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.warehouses());
      \u0275\u0275advance(5);
      \u0275\u0275classProp("border-blue-500", ctx.activeTabIndex() === 0)("text-blue-600", ctx.activeTabIndex() === 0)("border-transparent", ctx.activeTabIndex() !== 0)("text-gray-500", ctx.activeTabIndex() !== 0);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("border-blue-500", ctx.activeTabIndex() === 1)("text-blue-600", ctx.activeTabIndex() === 1)("border-transparent", ctx.activeTabIndex() !== 1)("text-gray-500", ctx.activeTabIndex() !== 1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTabIndex() === 0 ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTabIndex() === 1 ? 25 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatatableWrapperComponent, LucideAngularModule, LucideAngularComponent, RemoveTrailingZerosPipe], styles: [`

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
/*# sourceMappingURL=inventory-batch-list.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryBatchListComponent, [{
    type: Component,
    args: [{ selector: "app-inventory-batch-list", standalone: true, imports: [CommonModule, FormsModule, RemoveTrailingZerosPipe, DatatableWrapperComponent, LucideAngularModule], template: `<div class="purchase-order-list-container">\r
  <div class="purchase-content">\r
    <div class="px-4">\r
      <!-- Header -->\r
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
        <h2 class="text-2xl font-semibold text-gray-800">Inventario</h2>\r
      </div>\r
\r
      <!-- Filter Bar -->\r
      <div class="mb-4">\r
        <div class="filter-bar" role="search" aria-label="Filtros de inventario">\r
          <div class="filter-bar__container">\r
            <div class="filter-bar__field">\r
              <input\r
                type="text"\r
                [(ngModel)]="searchTerm"\r
                (keyup.enter)="onSearch()"\r
                placeholder="Buscar..."\r
                class="filter-bar__input"\r
                aria-label="Buscar por lote o producto"\r
              />\r
            </div>\r
            <div class="filter-bar__field">\r
              <select\r
                [(ngModel)]="selectedWarehouse"\r
                (change)="onWarehouseChange()"\r
                class="filter-bar__select"\r
                aria-label="Filtrar por almac\xE9n"\r
              >\r
                <option value="">Todos los almacenes</option>\r
                @for (warehouse of warehouses(); track warehouse.id) {\r
                  <option [value]="warehouse.id">{{ warehouse.name }}</option>\r
                }\r
              </select>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Tabs -->\r
      <div class="mb-4">\r
        <div class="border-b border-gray-200">\r
          <nav class="-mb-px flex space-x-8">\r
            <button\r
              class="border-b-2 py-4 px-1 text-sm font-medium transition-colors"\r
              [class.border-blue-500]="activeTabIndex() === 0"\r
              [class.text-blue-600]="activeTabIndex() === 0"\r
              [class.border-transparent]="activeTabIndex() !== 0"\r
              [class.text-gray-500]="activeTabIndex() !== 0"\r
              (click)="onTabChange(0)">\r
              Por Lotes\r
            </button>\r
            <button\r
              class="border-b-2 py-4 px-1 text-sm font-medium transition-colors"\r
              [class.border-blue-500]="activeTabIndex() === 1"\r
              [class.text-blue-600]="activeTabIndex() === 1"\r
              [class.border-transparent]="activeTabIndex() !== 1"\r
              [class.text-gray-500]="activeTabIndex() !== 1"\r
              (click)="onTabChange(1)">\r
              Totalizado\r
            </button>\r
          </nav>\r
        </div>\r
      </div>\r
\r
      <!-- Por Lotes Tab -->\r
      @if (activeTabIndex() === 0) {\r
        <app-datatable-wrapper\r
          [config]="table_config()"\r
          [rowTemplate]="tableTemplate"\r
          (pageChange)="onPageChange($event)"\r
          (sortChange)="onSortChange($event)"\r
          (rowClick)="openBatchDetail($event.data)">\r
        </app-datatable-wrapper>\r
      }\r
\r
      <!-- Totalizado Tab -->\r
      @if (activeTabIndex() === 1) {\r
        @if (summaryLoading) {\r
          <div class="flex items-center justify-center py-12">\r
            <p class="text-gray-500">Cargando inventario totalizado...</p>\r
          </div>\r
        } @else if (summaryItems.length === 0) {\r
          <div class="flex flex-col items-center justify-center py-12">\r
            <p class="text-gray-500">No hay productos en inventario</p>\r
          </div>\r
        } @else {\r
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">\r
            <table class="min-w-full divide-y divide-gray-200">\r
              <thead class="bg-gray-50">\r
                <tr>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Almac\xE9n</th>\r
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UOM</th>\r
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Disponible</th>\r
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Inicial</th>\r
                  <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lotes</th>\r
                  <th class="px-4 py-3"></th>\r
                </tr>\r
              </thead>\r
              <tbody class="bg-white divide-y divide-gray-200">\r
                @for (item of summaryItems; track item.product_id + item.warehouse_id) {\r
                  <tr class="hover:bg-gray-50 transition-colors">\r
                    <td class="px-4 py-3 text-sm text-gray-900">{{ item.product_name }}</td>\r
                    <td class="px-4 py-3 text-sm text-gray-500">{{ item.product_sku }}</td>\r
                    <td class="px-4 py-3 text-sm text-gray-500">{{ item.warehouse_name }}</td>\r
                    <td class="px-4 py-3 text-sm text-gray-500">{{ item.uom_name }}</td>\r
                    <td class="px-4 py-3 text-sm text-gray-900 text-right">{{ formatNumber(item.total_available_quantity) }}</td>\r
                    <td class="px-4 py-3 text-sm text-gray-500 text-right">{{ formatNumber(item.total_initial_quantity) }}</td>\r
                    <td class="px-4 py-3 text-sm text-gray-500 text-center">{{ item.total_batches }}</td>\r
                    <td class="px-4 py-3 text-right">\r
                      <button\r
                        class="inline-flex items-center justify-center w-6 h-6 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"\r
                        (click)="toggleBatches(item)">\r
                        <lucide-icon \r
                          [img]="isExpanded(item) ? ChevronDown : ChevronRight" \r
                          [size]="16"\r
                        ></lucide-icon>\r
                      </button>\r
                    </td>\r
                  </tr>\r
                  @if (isExpanded(item)) {\r
                    <tr class="bg-gray-50">\r
                      <td colspan="8" class="px-4 py-3">\r
                        <div class="ml-8 border-l-2 border-blue-500 pl-4">\r
                          <table class="min-w-full">\r
                            <thead class="bg-gray-100">\r
                              <tr>\r
                                <th class="px-3 py-2 text-left text-xs font-medium text-gray-600">Lote</th>\r
                                <th class="px-3 py-2 text-left text-xs font-medium text-gray-600">Folio PO</th>\r
                                <th class="px-3 py-2 text-right text-xs font-medium text-gray-600">Disponible</th>\r
                                <th class="px-3 py-2 text-right text-xs font-medium text-gray-600">Inicial</th>\r
                                <th class="px-3 py-2 text-left text-xs font-medium text-gray-600">Fecha</th>\r
                              </tr>\r
                            </thead>\r
                            <tbody class="divide-y divide-gray-200">\r
                              @for (batch of item.batches; track batch.batch_id) {\r
                                <tr>\r
                                  <td class="px-3 py-2 text-sm text-gray-700">{{ batch.batch_number }}</td>\r
                                  <td class="px-3 py-2 text-sm text-blue-600">{{ batch.purchase_order_folio }}</td>\r
                                  <td class="px-3 py-2 text-sm text-gray-700 text-right">{{ formatNumber(batch.available_quantity) }}</td>\r
                                  <td class="px-3 py-2 text-sm text-gray-500 text-right">{{ formatNumber(batch.initial_quantity) }}</td>\r
                                  <td class="px-3 py-2 text-sm text-gray-500">{{ formatDate(batch.created_at) }}</td>\r
                                </tr>\r
                              }\r
                            </tbody>\r
                          </table>\r
                        </div>\r
                      </td>\r
                    </tr>\r
                  }\r
                }\r
              </tbody>\r
            </table>\r
\r
            <!-- Pagination -->\r
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">\r
              <div class="flex-1 flex justify-between sm:hidden">\r
                <button\r
                  [disabled]="summaryPage === 1"\r
                  (click)="onSummaryPageChange(summaryPage - 1)"\r
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">\r
                  Anterior\r
                </button>\r
                <button\r
                  [disabled]="summaryPage >= summaryTotalPages"\r
                  (click)="onSummaryPageChange(summaryPage + 1)"\r
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">\r
                  Siguiente\r
                </button>\r
              </div>\r
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">\r
                <div>\r
                  <p class="text-sm text-gray-700">\r
                    P\xE1gina <span class="font-medium">{{ summaryPage }}</span> de <span class="font-medium">{{ summaryTotalPages }}</span>\r
                  </p>\r
                </div>\r
                <div>\r
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">\r
                    <button\r
                      [disabled]="summaryPage === 1"\r
                      (click)="onSummaryPageChange(summaryPage - 1)"\r
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">\r
                      Anterior\r
                    </button>\r
                    <button\r
                      [disabled]="summaryPage >= summaryTotalPages"\r
                      (click)="onSummaryPageChange(summaryPage + 1)"\r
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">\r
                      Siguiente\r
                    </button>\r
                  </nav>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
      }\r
    </div>\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td class="px-2 py-2 w-[130px]">\r
    <span class="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">\r
      {{ item.batch_number }}\r
    </span>\r
  </td>\r
  <td class="px-2 py-2 w-[180px]">\r
    <div class="flex flex-col">\r
      <span class="text-sm font-medium text-gray-900 truncate">{{ item.product_name || 'N/A' }}</span>\r
      <span class="text-xs text-gray-500">{{ item.product_sku || '' }}</span>\r
    </div>\r
  </td>\r
  <td class="px-2 py-2 w-[130px]">\r
    <span class="text-sm text-gray-700">{{ item.warehouse_name || 'N/A' }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[100px]">\r
    <span class="text-sm text-gray-700">{{ item.quantity | removeTrailingZeros }} {{ item.uom_name || 'Unidad' }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[140px]">\r
    @if (item.purchase_order_folio) {\r
      <span\r
        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition-colors"\r
        (click)="openPurchaseOrderDetail(item, $event)">\r
        {{ item.purchase_order_folio }}\r
      </span>\r
    } @else {\r
      <span class="text-sm text-gray-400">-</span>\r
    }\r
  </td>\r
  <td class="px-2 py-2 w-[160px]">\r
    <span class="text-xs text-gray-500">{{ formatDate(item.created_at) }}</span>\r
  </td>\r
</ng-template>\r
`, styles: [`/* src/app/features/inventory/components/inventory-batch-list/inventory-batch-list.component.scss */
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
/*# sourceMappingURL=inventory-batch-list.component.css.map */
`] }]
  }], () => [{ type: InventoryBatchService }, { type: InventoryService }, { type: WarehouseService }, { type: MatDialog }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InventoryBatchListComponent, { className: "InventoryBatchListComponent", filePath: "src/app/features/inventory/components/inventory-batch-list/inventory-batch-list.component.ts", lineNumber: 25 });
})();
export {
  InventoryBatchListComponent
};
//# sourceMappingURL=chunk-M32SA2FI.js.map
