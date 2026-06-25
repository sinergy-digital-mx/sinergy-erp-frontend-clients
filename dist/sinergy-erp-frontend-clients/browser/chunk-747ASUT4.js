import {
  PaymentDialogComponent
} from "./chunk-SK5Z6XFN.js";
import {
  PurchaseOrderService
} from "./chunk-DP66VQS4.js";
import {
  ORDER_DETAIL_DIALOG_OPTIONS,
  RemoveTrailingZerosPipe
} from "./chunk-SJQGKJ7C.js";
import {
  TaxCalculatorService
} from "./chunk-ZYCDY34Q.js";
import {
  VendorDetailModalComponent,
  VendorService
} from "./chunk-ABR2A6QW.js";
import {
  FiscalConfigurationModalComponent,
  ProductDetailModalComponent,
  WarehouseDetailModalComponent
} from "./chunk-AHSBPELP.js";
import {
  BranchService
} from "./chunk-4IJ6H554.js";
import {
  FiscalConfigurationService
} from "./chunk-JBTWC3N5.js";
import {
  PERMISSIONS
} from "./chunk-XYSQWTGQ.js";
import {
  WarehouseService
} from "./chunk-UWLWJ5OR.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-X4R6VVPV.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-5M3EQ6HX.js";
import {
  CustomSnackbarComponent,
  MatSnackBar,
  ToastService
} from "./chunk-YTYO4VTK.js";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  Calendar,
  FileText,
  ImageUp,
  LucideAngularComponent,
  LucideAngularModule,
  MapPin,
  Package,
  ShoppingCart,
  SquarePen,
  X
} from "./chunk-SNZEVNJV.js";
import {
  AuthService
} from "./chunk-QU2SCCOO.js";
import {
  Router
} from "./chunk-YUPXBHST.js";
import {
  CommonModule,
  DatePipe,
  HttpClient,
  HttpParams,
  NgClass,
  environment
} from "./chunk-FGZNYMY3.js";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  Inject,
  Injectable,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  setClassMetadata,
  signal,
  throwError,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XEFUC5ED.js";

// src/app/features/inventory/services/inventory-transfer.service.ts
var InventoryTransferService = class _InventoryTransferService {
  http;
  router;
  baseUrl = `${environment.api}/tenant/inventory/transfers`;
  constructor(http, router) {
    this.http = http;
    this.router = router;
  }
  getContext(productId, warehouseId) {
    const params = new HttpParams().set("product_id", productId).set("warehouse_id", warehouseId);
    return this.http.get(`${this.baseUrl}/context`, { params }).pipe(catchError((error) => this.handleError(error)));
  }
  createTransfer(data) {
    return this.http.post(this.baseUrl, data).pipe(catchError((error) => this.handleError(error)));
  }
  getTransfers(filters, pagination) {
    let params = new HttpParams().set("page", pagination.page.toString()).set("limit", pagination.limit.toString());
    if (filters.search)
      params = params.set("search", filters.search);
    if (filters.product_id)
      params = params.set("product_id", filters.product_id);
    if (filters.source_warehouse_id)
      params = params.set("source_warehouse_id", filters.source_warehouse_id);
    if (filters.destination_warehouse_id)
      params = params.set("destination_warehouse_id", filters.destination_warehouse_id);
    if (filters.source_billing_branch_id)
      params = params.set("source_billing_branch_id", filters.source_billing_branch_id);
    if (filters.destination_billing_branch_id)
      params = params.set("destination_billing_branch_id", filters.destination_billing_branch_id);
    if (filters.created_from)
      params = params.set("created_from", filters.created_from);
    if (filters.created_to)
      params = params.set("created_to", filters.created_to);
    return this.http.get(this.baseUrl, { params }).pipe(catchError((error) => this.handleError(error)));
  }
  getTransferById(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(catchError((error) => this.handleError(error)));
  }
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
        errorMessage = "Transferencia no encontrada";
        break;
      case 400:
      case 422:
        errorMessage = this.extractErrorMessage(error);
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
  extractErrorMessage(error) {
    if (typeof error.error?.message === "string") {
      return error.error.message;
    }
    if (error.error?.errors) {
      const errors = Object.values(error.error.errors).flat();
      return errors.join(", ");
    }
    return "Error de validaci\xF3n. Por favor, verifica los datos ingresados.";
  }
  static \u0275fac = function InventoryTransferService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryTransferService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventoryTransferService, factory: _InventoryTransferService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryTransferService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();

// src/app/features/inventory/components/create-transfer-dialog/create-transfer-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.batch.batch_id;
var _forTrack1 = ($index, $item) => $item.id;
function CreateTransferDialogComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p");
    \u0275\u0275text(2, "Cargando contexto...");
    \u0275\u0275elementEnd()();
  }
}
function CreateTransferDialogComponent_Conditional_9_For_55_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function CreateTransferDialogComponent_Conditional_9_For_55_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 48);
    \u0275\u0275listener("ngModelChange", function CreateTransferDialogComponent_Conditional_9_For_55_Conditional_12_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const \u0275$index_113_r4 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_113_r4, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(1, CreateTransferDialogComponent_Conditional_9_For_55_Conditional_12_Conditional_1_Template, 2, 1, "span", 49);
  }
  if (rf & 2) {
    let tmp_16_0;
    const line_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngModel", line_r6.quantity)("max", ctx_r1.toNum(line_r6.batch.available_quantity));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = ctx_r1.getLineError(line_r6)) ? 1 : -1, tmp_16_0);
  }
}
function CreateTransferDialogComponent_Conditional_9_For_55_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function CreateTransferDialogComponent_Conditional_9_For_55_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function CreateTransferDialogComponent_Conditional_9_For_55_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const \u0275$index_113_r4 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.fillBatchAvailable(\u0275$index_113_r4));
    });
    \u0275\u0275text(1, " Max ");
    \u0275\u0275elementEnd();
  }
}
function CreateTransferDialogComponent_Conditional_9_For_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "input", 43);
    \u0275\u0275listener("change", function CreateTransferDialogComponent_Conditional_9_For_55_Template_input_change_2_listener($event) {
      const \u0275$index_113_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleBatch(\u0275$index_113_r4, $event.target.checked));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 44);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 22);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 22);
    \u0275\u0275conditionalCreate(12, CreateTransferDialogComponent_Conditional_9_For_55_Conditional_12_Template, 2, 3)(13, CreateTransferDialogComponent_Conditional_9_For_55_Conditional_13_Template, 2, 0, "span", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275conditionalCreate(15, CreateTransferDialogComponent_Conditional_9_For_55_Conditional_15_Template, 2, 0, "button", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("batch-table__row--selected", line_r6.selected);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", line_r6.selected)("disabled", ctx_r1.toNum(line_r6.batch.available_quantity) <= 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r6.batch.batch_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r6.batch.purchase_order_folio || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(line_r6.batch.source_tag_identifier || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatQty(line_r6.batch.available_quantity));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(line_r6.selected ? 12 : 13);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.toNum(line_r6.batch.available_quantity) > 0 ? 15 : -1);
  }
}
function CreateTransferDialogComponent_Conditional_9_For_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", branch_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.branchLabel(branch_r8));
  }
}
function CreateTransferDialogComponent_Conditional_9_For_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const wh_r9 = ctx.$implicit;
    \u0275\u0275property("value", wh_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(wh_r9.name);
  }
}
function CreateTransferDialogComponent_Conditional_9_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "No hay almacenes activos en esta sucursal");
    \u0275\u0275elementEnd();
  }
}
function CreateTransferDialogComponent_Conditional_9_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span");
    \u0275\u0275text(2, "Destino:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.destinationWarehouseName, " (", ctx_r1.destinationBranchLabel.split(" \u2014 ")[0], ")");
  }
}
function CreateTransferDialogComponent_Conditional_9_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Confirmando... ");
  }
}
function CreateTransferDialogComponent_Conditional_9_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Confirmar transferencia ");
  }
}
function CreateTransferDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "section", 9)(2, "h3", 10);
    \u0275\u0275text(3, "Origen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 11)(5, "div", 12)(6, "div")(7, "span", 13);
    \u0275\u0275text(8, "Producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 14);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "span", 13);
    \u0275\u0275text(13, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 14);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div")(17, "span", 13);
    \u0275\u0275text(18, "Almac\xE9n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 14);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div")(22, "span", 13);
    \u0275\u0275text(23, "Sucursal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 14);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 15)(27, "span", 13);
    \u0275\u0275text(28, "Disponible total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 16);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(31, "section", 9)(32, "div", 17)(33, "h3", 10);
    \u0275\u0275text(34, "Lotes origen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 18);
    \u0275\u0275listener("click", function CreateTransferDialogComponent_Conditional_9_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.transferAll());
    });
    \u0275\u0275text(36, "Transferir todo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 19)(38, "table", 20)(39, "thead")(40, "tr");
    \u0275\u0275element(41, "th", 21);
    \u0275\u0275elementStart(42, "th");
    \u0275\u0275text(43, "Lote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "th");
    \u0275\u0275text(45, "OC origen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "th");
    \u0275\u0275text(47, "Etiqueta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "th", 22);
    \u0275\u0275text(49, "Disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "th", 23);
    \u0275\u0275text(51, "A transferir");
    \u0275\u0275elementEnd();
    \u0275\u0275element(52, "th", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "tbody");
    \u0275\u0275repeaterCreate(54, CreateTransferDialogComponent_Conditional_9_For_55_Template, 16, 10, "tr", 24, _forTrack0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "section", 9)(57, "h3", 10);
    \u0275\u0275text(58, "Destino");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 25)(60, "div", 26)(61, "label", 27);
    \u0275\u0275text(62, "Sucursal destino");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "select", 28);
    \u0275\u0275listener("ngModelChange", function CreateTransferDialogComponent_Conditional_9_Template_select_ngModelChange_63_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBranchChange($event));
    });
    \u0275\u0275elementStart(64, "option", 29);
    \u0275\u0275text(65, "Seleccionar sucursal...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(66, CreateTransferDialogComponent_Conditional_9_For_67_Template, 2, 2, "option", 30, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 26)(69, "label", 31);
    \u0275\u0275text(70, "Almac\xE9n destino");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "select", 32);
    \u0275\u0275listener("ngModelChange", function CreateTransferDialogComponent_Conditional_9_Template_select_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onWarehouseChange($event));
    });
    \u0275\u0275elementStart(72, "option", 29);
    \u0275\u0275text(73, "Seleccionar almac\xE9n...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(74, CreateTransferDialogComponent_Conditional_9_For_75_Template, 2, 2, "option", 30, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(76, CreateTransferDialogComponent_Conditional_9_Conditional_76_Template, 2, 0, "span", 33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "section", 9)(78, "div", 26)(79, "label", 34);
    \u0275\u0275text(80, "Notas (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "textarea", 35);
    \u0275\u0275listener("ngModelChange", function CreateTransferDialogComponent_Conditional_9_Template_textarea_ngModelChange_81_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.notes.set($event));
    });
    \u0275\u0275text(82, "          ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(83, "section", 36)(84, "div", 37)(85, "span");
    \u0275\u0275text(86, "Total a transferir:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "strong");
    \u0275\u0275text(88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "span", 38);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 39)(92, "span");
    \u0275\u0275text(93, "Origen:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "span");
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(96, CreateTransferDialogComponent_Conditional_9_Conditional_96_Template, 5, 2, "div", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(97, "div", 40)(98, "button", 41);
    \u0275\u0275listener("click", function CreateTransferDialogComponent_Conditional_9_Template_button_click_98_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(99, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(100, "button", 42);
    \u0275\u0275listener("click", function CreateTransferDialogComponent_Conditional_9_Template_button_click_100_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirm());
    });
    \u0275\u0275conditionalCreate(101, CreateTransferDialogComponent_Conditional_9_Conditional_101_Template, 1, 0)(102, CreateTransferDialogComponent_Conditional_9_Conditional_102_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_ir10 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate2("", ctx_ir10.product_name, " (", ctx_ir10.product_sku, ")");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_ir10.uom_name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_ir10.source_warehouse.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.sourceBranchLabel);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate4(" ", ctx_r1.formatQty(ctx_ir10.total_available_quantity), " ", ctx_ir10.uom_name, " (", ctx_ir10.total_batches, " ", ctx_ir10.total_batches === 1 ? "lote" : "lotes", ") ");
    \u0275\u0275advance(24);
    \u0275\u0275repeater(ctx_r1.batchLines());
    \u0275\u0275advance(9);
    \u0275\u0275property("ngModel", ctx_r1.selectedBranchId());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.branches());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.selectedWarehouseId())("disabled", !ctx_r1.selectedBranchId());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.destinationWarehouses());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.selectedBranchId() && ctx_r1.destinationWarehouses().length === 0 ? 76 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.notes());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", ctx_r1.formatQty(ctx_r1.totalToTransfer()), " ", ctx_ir10.uom_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("desde ", ctx_r1.selectedLinesCount(), " ", ctx_r1.selectedLinesCount() === 1 ? "lote" : "lotes");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_ir10.source_warehouse.name, " (", ctx_ir10.source_warehouse.billing_branch.code, ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.selectedWarehouseId() ? 96 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.canSubmit());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.submitting() ? 101 : 102);
  }
}
var CreateTransferDialogComponent = class _CreateTransferDialogComponent {
  data;
  dialogRef;
  transferService;
  warehouseService;
  branchService;
  toast;
  X = X;
  ArrowRightLeft = ArrowRightLeft;
  context = signal(null, ...ngDevMode ? [{ debugName: "context" }] : []);
  batchLines = signal([], ...ngDevMode ? [{ debugName: "batchLines" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  submitting = signal(false, ...ngDevMode ? [{ debugName: "submitting" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  selectedBranchId = signal("", ...ngDevMode ? [{ debugName: "selectedBranchId" }] : []);
  selectedWarehouseId = signal("", ...ngDevMode ? [{ debugName: "selectedWarehouseId" }] : []);
  notes = signal("", ...ngDevMode ? [{ debugName: "notes" }] : []);
  destinationWarehouses = computed(() => {
    const branchId = this.selectedBranchId();
    const sourceId = this.context()?.source_warehouse.id;
    if (!branchId)
      return [];
    return this.warehouses().filter((w) => w.billing_branch_id === branchId && w.status === "active" && w.id !== sourceId);
  }, ...ngDevMode ? [{ debugName: "destinationWarehouses" }] : []);
  totalToTransfer = computed(() => this.batchLines().filter((l) => l.selected).reduce((sum, l) => sum + (l.quantity || 0), 0), ...ngDevMode ? [{ debugName: "totalToTransfer" }] : []);
  selectedLinesCount = computed(() => this.batchLines().filter((l) => l.selected && l.quantity > 0).length, ...ngDevMode ? [{ debugName: "selectedLinesCount" }] : []);
  canSubmit = computed(() => {
    if (this.submitting() || this.loading())
      return false;
    if (!this.selectedWarehouseId())
      return false;
    if (this.totalToTransfer() <= 0)
      return false;
    if (this.selectedLinesCount() === 0)
      return false;
    if (this.destinationWarehouses().length === 0 && this.selectedBranchId())
      return false;
    return this.batchLines().filter((l) => l.selected).every((l) => l.quantity > 0 && l.quantity <= this.toNum(l.batch.available_quantity));
  }, ...ngDevMode ? [{ debugName: "canSubmit" }] : []);
  constructor(data, dialogRef, transferService, warehouseService, branchService, toast) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.transferService = transferService;
    this.warehouseService = warehouseService;
    this.branchService = branchService;
    this.toast = toast;
  }
  ngOnInit() {
    this.loadContext();
    this.loadBranchesAndWarehouses();
  }
  loadContext() {
    this.loading.set(true);
    this.transferService.getContext(this.data.product_id, this.data.warehouse_id).subscribe({
      next: (ctx) => {
        this.context.set(ctx);
        this.initBatchLines(ctx);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(err.message || "No se pudo cargar el contexto de transferencia");
        this.dialogRef.close(false);
      }
    });
  }
  initBatchLines(ctx) {
    const preselectedId = this.data.preselected_batch_id;
    const preselectedQty = this.data.preselected_quantity;
    const lines = ctx.batches.map((batch) => {
      const isPreselected = preselectedId === batch.batch_id;
      const available = this.toNum(batch.available_quantity);
      return {
        batch,
        selected: isPreselected,
        quantity: isPreselected ? preselectedQty ?? available : 0
      };
    });
    this.batchLines.set(lines);
  }
  loadBranchesAndWarehouses() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => this.branches.set(branches),
      error: () => this.toast.error("No se pudieron cargar las sucursales")
    });
    this.warehouseService.getWarehouses({ limit: 500, status: "active" }).subscribe({
      next: (response) => this.warehouses.set(response.data || []),
      error: () => this.toast.error("No se pudieron cargar los almacenes")
    });
  }
  toNum(val) {
    if (val === void 0 || val === null)
      return 0;
    const n = typeof val === "string" ? parseFloat(val) : val;
    return isNaN(n) ? 0 : n;
  }
  formatQty(val) {
    return new Intl.NumberFormat("es-MX", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3
    }).format(this.toNum(val));
  }
  branchLabel(branch) {
    return `${branch.code} \u2014 ${branch.city}, ${branch.state}`;
  }
  toggleBatch(index, selected) {
    this.batchLines.update((lines) => {
      const updated = [...lines];
      const line = __spreadValues({}, updated[index]);
      line.selected = selected;
      if (selected && line.quantity <= 0) {
        line.quantity = this.toNum(line.batch.available_quantity);
      }
      if (!selected) {
        line.quantity = 0;
      }
      updated[index] = line;
      return updated;
    });
  }
  updateQuantity(index, value) {
    this.batchLines.update((lines) => {
      const updated = [...lines];
      updated[index] = __spreadProps(__spreadValues({}, updated[index]), { quantity: value });
      return updated;
    });
  }
  fillBatchAvailable(index) {
    const available = this.toNum(this.batchLines()[index].batch.available_quantity);
    this.batchLines.update((lines) => {
      const updated = [...lines];
      updated[index] = __spreadProps(__spreadValues({}, updated[index]), { selected: true, quantity: available });
      return updated;
    });
  }
  transferAll() {
    this.batchLines.update((lines) => lines.map((line) => __spreadProps(__spreadValues({}, line), {
      selected: this.toNum(line.batch.available_quantity) > 0,
      quantity: this.toNum(line.batch.available_quantity)
    })));
  }
  onBranchChange(branchId) {
    this.selectedBranchId.set(branchId);
    this.selectedWarehouseId.set("");
  }
  onWarehouseChange(warehouseId) {
    this.selectedWarehouseId.set(warehouseId);
  }
  getLineError(line) {
    if (!line.selected)
      return null;
    const available = this.toNum(line.batch.available_quantity);
    if (line.quantity <= 0)
      return "Cantidad debe ser mayor a 0";
    if (line.quantity > available)
      return `M\xE1ximo ${this.formatQty(available)}`;
    return null;
  }
  close() {
    this.dialogRef.close(false);
  }
  confirm() {
    if (!this.canSubmit())
      return;
    const ctx = this.context();
    if (!ctx)
      return;
    const destId = this.selectedWarehouseId();
    if (destId === ctx.source_warehouse.id) {
      this.toast.error("El almac\xE9n de origen y destino deben ser diferentes");
      return;
    }
    this.submitting.set(true);
    this.transferService.getContext(this.data.product_id, this.data.warehouse_id).subscribe({
      next: (freshCtx) => {
        this.context.set(freshCtx);
        this.submitTransfer(freshCtx);
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.message || "No se pudo refrescar el stock disponible");
      }
    });
  }
  submitTransfer(ctx) {
    const lines = this.batchLines().filter((l) => l.selected && l.quantity > 0).map((l) => ({
      inventory_batch_id: l.batch.batch_id,
      quantity: l.quantity
    }));
    const payload = {
      product_id: ctx.product_id,
      uom_id: ctx.uom_id,
      source_warehouse_id: ctx.source_warehouse.id,
      destination_warehouse_id: this.selectedWarehouseId(),
      notes: this.notes().trim() || void 0,
      lines
    };
    this.transferService.createTransfer(payload).subscribe({
      next: (result) => {
        this.submitting.set(false);
        this.toast.success(`Transferencia ${result.folio} creada correctamente`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.submitting.set(false);
        this.toast.error(err.message || "No se pudo crear la transferencia");
      }
    });
  }
  get destinationBranchLabel() {
    const branch = this.branches().find((b) => b.id === this.selectedBranchId());
    return branch ? this.branchLabel(branch) : "";
  }
  get destinationWarehouseName() {
    const wh = this.warehouses().find((w) => w.id === this.selectedWarehouseId());
    return wh?.name ?? "";
  }
  get sourceBranchLabel() {
    const wh = this.context()?.source_warehouse;
    if (!wh?.billing_branch)
      return "";
    const bb = wh.billing_branch;
    return `${bb.code} \u2014 ${bb.city}, ${bb.state}`;
  }
  static \u0275fac = function CreateTransferDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateTransferDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(InventoryTransferService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(ToastService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateTransferDialogComponent, selectors: [["app-create-transfer-dialog"]], decls: 10, vars: 3, consts: [[1, "transfer-dialog"], [1, "transfer-dialog__header"], [1, "transfer-dialog__title-row"], [1, "transfer-dialog__icon", 3, "img"], [1, "transfer-dialog__title"], ["type", "button", "aria-label", "Cerrar", 1, "transfer-dialog__close", 3, "click"], [1, "w-5", "h-5", 3, "img"], [1, "transfer-dialog__loading"], [1, "transfer-dialog__body"], [1, "transfer-section"], [1, "transfer-section__title"], [1, "origin-card"], [1, "origin-card__grid"], [1, "origin-card__label"], [1, "origin-card__value"], [1, "origin-card__full"], [1, "origin-card__value", "origin-card__value--highlight"], [1, "transfer-section__header"], ["type", "button", 1, "btn-link", 3, "click"], [1, "batch-table-wrap"], [1, "batch-table"], [1, "w-10"], [1, "text-right"], [1, "text-right", "w-36"], [3, "batch-table__row--selected"], [1, "dest-grid"], [1, "form-field"], ["for", "destBranch"], ["id", "destBranch", 1, "form-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["for", "destWarehouse"], ["id", "destWarehouse", 1, "form-select", 3, "ngModelChange", "ngModel", "disabled"], [1, "field-hint", "field-hint--error"], ["for", "transferNotes"], ["id", "transferNotes", "rows", "2", "placeholder", "Motivo o referencia del traslado...", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "summary-box"], [1, "summary-box__row"], [1, "text-gray-500"], [1, "summary-box__row", "summary-box__row--muted"], [1, "transfer-dialog__footer"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "button", 1, "btn-confirm", 3, "click", "disabled"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "font-medium"], [1, "text-blue-600"], [1, "text-gray-400"], ["type", "button", "title", "Usar todo el disponible", 1, "btn-icon"], ["type", "number", "min", "0", "step", "0.001", 1, "qty-input", 3, "ngModelChange", "ngModel", "max"], [1, "qty-error"], ["type", "button", "title", "Usar todo el disponible", 1, "btn-icon", 3, "click"]], template: function CreateTransferDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "lucide-icon", 3);
      \u0275\u0275elementStart(4, "h2", 4);
      \u0275\u0275text(5, "Transferir inventario");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "button", 5);
      \u0275\u0275listener("click", function CreateTransferDialogComponent_Template_button_click_6_listener() {
        return ctx.close();
      });
      \u0275\u0275element(7, "lucide-icon", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(8, CreateTransferDialogComponent_Conditional_8_Template, 3, 0, "div", 7)(9, CreateTransferDialogComponent_Conditional_9_Template, 103, 24);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275advance(3);
      \u0275\u0275property("img", ctx.ArrowRightLeft);
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 8 : (tmp_2_0 = ctx.context()) ? 9 : -1, tmp_2_0);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.transfer-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100%;\n}\n.transfer-dialog__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.transfer-dialog__title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.transfer-dialog__icon[_ngcontent-%COMP%] {\n  width: 1.25rem;\n  height: 1.25rem;\n  color: #2563eb;\n}\n.transfer-dialog__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n}\n.transfer-dialog__close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.25rem;\n  border-radius: 0.375rem;\n}\n.transfer-dialog__close[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.transfer-dialog__loading[_ngcontent-%COMP%] {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n}\n.transfer-dialog__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.transfer-dialog__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 0.875rem 1.25rem;\n  border-top: 1px solid #e5e7eb;\n  background: #f9fafb;\n  flex-shrink: 0;\n}\n.transfer-section__title[_ngcontent-%COMP%] {\n  margin: 0 0 0.625rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #6b7280;\n}\n.transfer-section__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.625rem;\n}\n.transfer-section__header[_ngcontent-%COMP%]   .transfer-section__title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.origin-card[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  padding: 0.875rem 1rem;\n}\n.origin-card__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.625rem 1rem;\n}\n.origin-card__full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.origin-card__label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #94a3b8;\n  margin-bottom: 0.125rem;\n}\n.origin-card__value[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #1e293b;\n  font-weight: 500;\n}\n.origin-card__value--highlight[_ngcontent-%COMP%] {\n  color: #059669;\n  font-weight: 600;\n}\n.batch-table-wrap[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  overflow: hidden;\n}\n.batch-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.8125rem;\n}\n.batch-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  padding: 0.5rem 0.625rem;\n  text-align: left;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: #6b7280;\n  border-bottom: 1px solid #e5e7eb;\n}\n.batch-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.625rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #374151;\n  vertical-align: middle;\n}\n.batch-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.batch-table__row--selected[_ngcontent-%COMP%] {\n  background: #eff6ff;\n}\n.qty-input[_ngcontent-%COMP%] {\n  width: 5.5rem;\n  padding: 0.25rem 0.375rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.25rem;\n  font-size: 0.8125rem;\n  text-align: right;\n}\n.qty-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2563eb;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);\n}\n.qty-error[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.6875rem;\n  color: #dc2626;\n  margin-top: 0.125rem;\n}\n.dest-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n@media (max-width: 640px) {\n  .dest-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: #374151;\n}\n.form-select[_ngcontent-%COMP%], \n.form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 0.625rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  color: #111827;\n  background: white;\n}\n.form-select[_ngcontent-%COMP%]:focus, \n.form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #2563eb;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);\n}\n.form-select[_ngcontent-%COMP%]:disabled, \n.form-textarea[_ngcontent-%COMP%]:disabled {\n  background: #f3f4f6;\n  cursor: not-allowed;\n}\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 3rem;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.field-hint--error[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.summary-box[_ngcontent-%COMP%] {\n  background: #f0f9ff;\n  border: 1px solid #bae6fd;\n  border-radius: 0.5rem;\n  padding: 0.875rem 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.summary-box__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #0c4a6e;\n}\n.summary-box__row--muted[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.btn-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #2563eb;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n  padding: 0;\n}\n.btn-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 600;\n  color: #6b7280;\n  padding: 0.125rem 0.375rem;\n  cursor: pointer;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: #e5e7eb;\n  color: #374151;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  background: white;\n  color: #374151;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.btn-cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  background: #2563eb;\n  color: white;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.font-medium[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.text-blue-600[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.text-gray-400[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\n.text-gray-500[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n.w-10[_ngcontent-%COMP%] {\n  width: 2.5rem;\n}\n.w-36[_ngcontent-%COMP%] {\n  width: 9rem;\n}\n/*# sourceMappingURL=create-transfer-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateTransferDialogComponent, [{
    type: Component,
    args: [{ selector: "app-create-transfer-dialog", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], template: `<div class="transfer-dialog">\r
  <div class="transfer-dialog__header">\r
    <div class="transfer-dialog__title-row">\r
      <lucide-icon [img]="ArrowRightLeft" class="transfer-dialog__icon"></lucide-icon>\r
      <h2 class="transfer-dialog__title">Transferir inventario</h2>\r
    </div>\r
    <button type="button" class="transfer-dialog__close" (click)="close()" aria-label="Cerrar">\r
      <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="transfer-dialog__loading">\r
      <p>Cargando contexto...</p>\r
    </div>\r
  } @else if (context(); as ctx) {\r
    <div class="transfer-dialog__body">\r
      <!-- Origen -->\r
      <section class="transfer-section">\r
        <h3 class="transfer-section__title">Origen</h3>\r
        <div class="origin-card">\r
          <div class="origin-card__grid">\r
            <div>\r
              <span class="origin-card__label">Producto</span>\r
              <span class="origin-card__value">{{ ctx.product_name }} ({{ ctx.product_sku }})</span>\r
            </div>\r
            <div>\r
              <span class="origin-card__label">UOM</span>\r
              <span class="origin-card__value">{{ ctx.uom_name }}</span>\r
            </div>\r
            <div>\r
              <span class="origin-card__label">Almac\xE9n</span>\r
              <span class="origin-card__value">{{ ctx.source_warehouse.name }}</span>\r
            </div>\r
            <div>\r
              <span class="origin-card__label">Sucursal</span>\r
              <span class="origin-card__value">{{ sourceBranchLabel }}</span>\r
            </div>\r
            <div class="origin-card__full">\r
              <span class="origin-card__label">Disponible total</span>\r
              <span class="origin-card__value origin-card__value--highlight">\r
                {{ formatQty(ctx.total_available_quantity) }} {{ ctx.uom_name }}\r
                ({{ ctx.total_batches }} {{ ctx.total_batches === 1 ? 'lote' : 'lotes' }})\r
              </span>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <!-- Lotes origen -->\r
      <section class="transfer-section">\r
        <div class="transfer-section__header">\r
          <h3 class="transfer-section__title">Lotes origen</h3>\r
          <button type="button" class="btn-link" (click)="transferAll()">Transferir todo</button>\r
        </div>\r
\r
        <div class="batch-table-wrap">\r
          <table class="batch-table">\r
            <thead>\r
              <tr>\r
                <th class="w-10"></th>\r
                <th>Lote</th>\r
                <th>OC origen</th>\r
                <th>Etiqueta</th>\r
                <th class="text-right">Disponible</th>\r
                <th class="text-right w-36">A transferir</th>\r
                <th class="w-10"></th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (line of batchLines(); track line.batch.batch_id; let i = $index) {\r
                <tr [class.batch-table__row--selected]="line.selected">\r
                  <td>\r
                    <input\r
                      type="checkbox"\r
                      [checked]="line.selected"\r
                      [disabled]="toNum(line.batch.available_quantity) <= 0"\r
                      (change)="toggleBatch(i, $any($event.target).checked)"\r
                    />\r
                  </td>\r
                  <td class="font-medium">{{ line.batch.batch_number }}</td>\r
                  <td class="text-blue-600">{{ line.batch.purchase_order_folio || '\u2014' }}</td>\r
                  <td>{{ line.batch.source_tag_identifier || '\u2014' }}</td>\r
                  <td class="text-right">{{ formatQty(line.batch.available_quantity) }}</td>\r
                  <td class="text-right">\r
                    @if (line.selected) {\r
                      <input\r
                        type="number"\r
                        class="qty-input"\r
                        [ngModel]="line.quantity"\r
                        (ngModelChange)="updateQuantity(i, $event)"\r
                        min="0"\r
                        [max]="toNum(line.batch.available_quantity)"\r
                        step="0.001"\r
                      />\r
                      @if (getLineError(line); as err) {\r
                        <span class="qty-error">{{ err }}</span>\r
                      }\r
                    } @else {\r
                      <span class="text-gray-400">\u2014</span>\r
                    }\r
                  </td>\r
                  <td>\r
                    @if (toNum(line.batch.available_quantity) > 0) {\r
                      <button\r
                        type="button"\r
                        class="btn-icon"\r
                        title="Usar todo el disponible"\r
                        (click)="fillBatchAvailable(i)">\r
                        Max\r
                      </button>\r
                    }\r
                  </td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
      </section>\r
\r
      <!-- Destino -->\r
      <section class="transfer-section">\r
        <h3 class="transfer-section__title">Destino</h3>\r
        <div class="dest-grid">\r
          <div class="form-field">\r
            <label for="destBranch">Sucursal destino</label>\r
            <select\r
              id="destBranch"\r
              class="form-select"\r
              [ngModel]="selectedBranchId()"\r
              (ngModelChange)="onBranchChange($event)">\r
              <option value="">Seleccionar sucursal...</option>\r
              @for (branch of branches(); track branch.id) {\r
                <option [value]="branch.id">{{ branchLabel(branch) }}</option>\r
              }\r
            </select>\r
          </div>\r
          <div class="form-field">\r
            <label for="destWarehouse">Almac\xE9n destino</label>\r
            <select\r
              id="destWarehouse"\r
              class="form-select"\r
              [ngModel]="selectedWarehouseId()"\r
              (ngModelChange)="onWarehouseChange($event)"\r
              [disabled]="!selectedBranchId()">\r
              <option value="">Seleccionar almac\xE9n...</option>\r
              @for (wh of destinationWarehouses(); track wh.id) {\r
                <option [value]="wh.id">{{ wh.name }}</option>\r
              }\r
            </select>\r
            @if (selectedBranchId() && destinationWarehouses().length === 0) {\r
              <span class="field-hint field-hint--error">No hay almacenes activos en esta sucursal</span>\r
            }\r
          </div>\r
        </div>\r
      </section>\r
\r
      <!-- Notas -->\r
      <section class="transfer-section">\r
        <div class="form-field">\r
          <label for="transferNotes">Notas (opcional)</label>\r
          <textarea\r
            id="transferNotes"\r
            class="form-textarea"\r
            rows="2"\r
            placeholder="Motivo o referencia del traslado..."\r
            [ngModel]="notes()"\r
            (ngModelChange)="notes.set($event)">\r
          </textarea>\r
        </div>\r
      </section>\r
\r
      <!-- Resumen -->\r
      <section class="summary-box">\r
        <div class="summary-box__row">\r
          <span>Total a transferir:</span>\r
          <strong>{{ formatQty(totalToTransfer()) }} {{ ctx.uom_name }}</strong>\r
          <span class="text-gray-500">desde {{ selectedLinesCount() }} {{ selectedLinesCount() === 1 ? 'lote' : 'lotes' }}</span>\r
        </div>\r
        <div class="summary-box__row summary-box__row--muted">\r
          <span>Origen:</span>\r
          <span>{{ ctx.source_warehouse.name }} ({{ ctx.source_warehouse.billing_branch.code }})</span>\r
        </div>\r
        @if (selectedWarehouseId()) {\r
          <div class="summary-box__row summary-box__row--muted">\r
            <span>Destino:</span>\r
            <span>{{ destinationWarehouseName }} ({{ destinationBranchLabel.split(' \u2014 ')[0] }})</span>\r
          </div>\r
        }\r
      </section>\r
    </div>\r
\r
    <div class="transfer-dialog__footer">\r
      <button type="button" class="btn-cancel" (click)="close()" [disabled]="submitting()">Cancelar</button>\r
      <button\r
        type="button"\r
        class="btn-confirm"\r
        (click)="confirm()"\r
        [disabled]="!canSubmit()">\r
        @if (submitting()) {\r
          Confirmando...\r
        } @else {\r
          Confirmar transferencia\r
        }\r
      </button>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/features/inventory/components/create-transfer-dialog/create-transfer-dialog.component.scss */\n.transfer-dialog {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100%;\n}\n.transfer-dialog__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.transfer-dialog__title-row {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.transfer-dialog__icon {\n  width: 1.25rem;\n  height: 1.25rem;\n  color: #2563eb;\n}\n.transfer-dialog__title {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n}\n.transfer-dialog__close {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.25rem;\n  border-radius: 0.375rem;\n}\n.transfer-dialog__close:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.transfer-dialog__loading {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n}\n.transfer-dialog__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.transfer-dialog__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 0.875rem 1.25rem;\n  border-top: 1px solid #e5e7eb;\n  background: #f9fafb;\n  flex-shrink: 0;\n}\n.transfer-section__title {\n  margin: 0 0 0.625rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #6b7280;\n}\n.transfer-section__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.625rem;\n}\n.transfer-section__header .transfer-section__title {\n  margin: 0;\n}\n.origin-card {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  padding: 0.875rem 1rem;\n}\n.origin-card__grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.625rem 1rem;\n}\n.origin-card__full {\n  grid-column: 1/-1;\n}\n.origin-card__label {\n  display: block;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #94a3b8;\n  margin-bottom: 0.125rem;\n}\n.origin-card__value {\n  font-size: 0.875rem;\n  color: #1e293b;\n  font-weight: 500;\n}\n.origin-card__value--highlight {\n  color: #059669;\n  font-weight: 600;\n}\n.batch-table-wrap {\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  overflow: hidden;\n}\n.batch-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.8125rem;\n}\n.batch-table th {\n  background: #f9fafb;\n  padding: 0.5rem 0.625rem;\n  text-align: left;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: #6b7280;\n  border-bottom: 1px solid #e5e7eb;\n}\n.batch-table td {\n  padding: 0.5rem 0.625rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #374151;\n  vertical-align: middle;\n}\n.batch-table tbody tr:last-child td {\n  border-bottom: none;\n}\n.batch-table__row--selected {\n  background: #eff6ff;\n}\n.qty-input {\n  width: 5.5rem;\n  padding: 0.25rem 0.375rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.25rem;\n  font-size: 0.8125rem;\n  text-align: right;\n}\n.qty-input:focus {\n  outline: none;\n  border-color: #2563eb;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);\n}\n.qty-error {\n  display: block;\n  font-size: 0.6875rem;\n  color: #dc2626;\n  margin-top: 0.125rem;\n}\n.dest-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n@media (max-width: 640px) {\n  .dest-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.form-field label {\n  font-size: 0.8125rem;\n  font-weight: 500;\n  color: #374151;\n}\n.form-select,\n.form-textarea {\n  width: 100%;\n  padding: 0.5rem 0.625rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  color: #111827;\n  background: white;\n}\n.form-select:focus,\n.form-textarea:focus {\n  outline: none;\n  border-color: #2563eb;\n  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);\n}\n.form-select:disabled,\n.form-textarea:disabled {\n  background: #f3f4f6;\n  cursor: not-allowed;\n}\n.form-textarea {\n  resize: vertical;\n  min-height: 3rem;\n}\n.field-hint {\n  font-size: 0.75rem;\n}\n.field-hint--error {\n  color: #dc2626;\n}\n.summary-box {\n  background: #f0f9ff;\n  border: 1px solid #bae6fd;\n  border-radius: 0.5rem;\n  padding: 0.875rem 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.summary-box__row {\n  display: flex;\n  align-items: baseline;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #0c4a6e;\n}\n.summary-box__row--muted {\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.btn-link {\n  background: none;\n  border: none;\n  color: #2563eb;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n  padding: 0;\n}\n.btn-link:hover {\n  text-decoration: underline;\n}\n.btn-icon {\n  background: #f3f4f6;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 600;\n  color: #6b7280;\n  padding: 0.125rem 0.375rem;\n  cursor: pointer;\n}\n.btn-icon:hover {\n  background: #e5e7eb;\n  color: #374151;\n}\n.btn-cancel {\n  padding: 0.5rem 1rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  background: white;\n  color: #374151;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n}\n.btn-cancel:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.btn-cancel:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-confirm {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  background: #2563eb;\n  color: white;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-confirm:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n.btn-confirm:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.text-right {\n  text-align: right;\n}\n.font-medium {\n  font-weight: 500;\n}\n.text-blue-600 {\n  color: #2563eb;\n}\n.text-gray-400 {\n  color: #9ca3af;\n}\n.text-gray-500 {\n  color: #6b7280;\n}\n.w-10 {\n  width: 2.5rem;\n}\n.w-36 {\n  width: 9rem;\n}\n/*# sourceMappingURL=create-transfer-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: InventoryTransferService }, { type: WarehouseService }, { type: BranchService }, { type: ToastService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateTransferDialogComponent, { className: "CreateTransferDialogComponent", filePath: "src/app/features/inventory/components/create-transfer-dialog/create-transfer-dialog.component.ts", lineNumber: 31 });
})();

// src/app/features/purchase-orders/services/receipt.service.ts
var ReceiptService = class _ReceiptService {
  http;
  apiUrl = `${environment.api}/tenant/purchase-orders`;
  constructor(http) {
    this.http = http;
  }
  /**
   * Recibir items de una orden de compra
   */
  receiveItems(purchaseOrderId, request) {
    return this.http.post(`${this.apiUrl}/${purchaseOrderId}/receipt`, request);
  }
  static \u0275fac = function ReceiptService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReceiptService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReceiptService, factory: _ReceiptService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReceiptService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/purchase-orders/components/receipt-modal/receipt-modal.component.ts
var _c0 = () => ({ standalone: true });
var _forTrack02 = ($index, $item) => $item.id;
function ReceiptModalComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.purchaseOrder.folio);
  }
}
function ReceiptModalComponent_Conditional_9_For_5_Conditional_22_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function ReceiptModalComponent_Conditional_9_For_5_Conditional_22_For_19_Template_input_ngModelChange_1_listener($event) {
      const \u0275$index_99_r7 = \u0275\u0275restoreView(_r6).$index;
      const lineItem_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].tag_identifier, $event) || (ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].tag_identifier = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function ReceiptModalComponent_Conditional_9_For_5_Conditional_22_For_19_Template_input_ngModelChange_2_listener($event) {
      const \u0275$index_99_r7 = \u0275\u0275restoreView(_r6).$index;
      const lineItem_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].quantity, $event) || (ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function ReceiptModalComponent_Conditional_9_For_5_Conditional_22_For_19_Template_select_ngModelChange_3_listener($event) {
      const \u0275$index_99_r7 = \u0275\u0275restoreView(_r6).$index;
      const lineItem_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].product_uom_id, $event) || (ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].product_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "option", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 34);
    \u0275\u0275listener("click", function ReceiptModalComponent_Conditional_9_For_5_Conditional_22_For_19_Template_button_click_6_listener() {
      const \u0275$index_99_r7 = \u0275\u0275restoreView(_r6).$index;
      const lineItem_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.removeLot(lineItem_r4.id, \u0275$index_99_r7));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 4);
    \u0275\u0275element(8, "path", 35);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const \u0275$index_99_r7 = ctx.$index;
    const lineItem_r4 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].tag_identifier);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c0));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].quantity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(10, _c0));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.multipleLotsByLine[lineItem_r4.id][\u0275$index_99_r7].product_uom_id);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(11, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("value", (lineItem_r4.product_uom == null ? null : lineItem_r4.product_uom.id) || lineItem_r4.product_uom_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (lineItem_r4.product_uom == null ? null : lineItem_r4.product_uom.uom == null ? null : lineItem_r4.product_uom.uom.name) || (lineItem_r4.uom == null ? null : lineItem_r4.uom.name) || "Unidad", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.getLots(lineItem_r4.id).length <= 1);
  }
}
function ReceiptModalComponent_Conditional_9_For_5_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24)(2, "h5");
    \u0275\u0275text(3, "Lotes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 25);
    \u0275\u0275listener("click", function ReceiptModalComponent_Conditional_9_For_5_Conditional_22_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const lineItem_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.addLot(lineItem_r4.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 4);
    \u0275\u0275element(6, "path", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "Agregar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 27)(10, "span");
    \u0275\u0275text(11, "Tag / Identificador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 28);
    \u0275\u0275repeaterCreate(18, ReceiptModalComponent_Conditional_9_For_5_Conditional_22_For_19_Template, 9, 12, "div", 29, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 30);
    \u0275\u0275text(21, " Total lotes: ");
    \u0275\u0275elementStart(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const lineItem_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r0.getLots(lineItem_r4.id));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.getLotsTotal(lineItem_r4.id));
  }
}
function ReceiptModalComponent_Conditional_9_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 13)(2, "div", 14)(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 15);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 17)(10, "div", 18)(11, "label");
    \u0275\u0275text(12, "Modo de lotes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function ReceiptModalComponent_Conditional_9_For_5_Template_select_ngModelChange_13_listener($event) {
      const lineItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.lotModes[lineItem_r4.id], $event) || (ctx_r0.lotModes[lineItem_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ReceiptModalComponent_Conditional_9_For_5_Template_select_ngModelChange_13_listener($event) {
      const lineItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onLotModeChange(lineItem_r4.id, $event));
    });
    \u0275\u0275elementStart(14, "option", 20);
    \u0275\u0275text(15, "Un solo lote");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 21);
    \u0275\u0275text(17, "M\xFAltiples lotes");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 18)(19, "label");
    \u0275\u0275text(20, "Cantidad Recibida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function ReceiptModalComponent_Conditional_9_For_5_Template_input_ngModelChange_21_listener($event) {
      const lineItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.receivedQuantities[lineItem_r4.id], $event) || (ctx_r0.receivedQuantities[lineItem_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(22, ReceiptModalComponent_Conditional_9_For_5_Conditional_22_Template, 24, 1, "div", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lineItem_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.getProductName(lineItem_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("SKU: ", ctx_r0.getProductSku(lineItem_r4));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Ordenado: ", ctx_r0.getOrderedQuantity(lineItem_r4));
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.lotModes[lineItem_r4.id]);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c0));
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.receivedQuantities[lineItem_r4.id]);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(10, _c0))("disabled", ctx_r0.getLotMode(lineItem_r4.id) === "multiple");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.getLotMode(lineItem_r4.id) === "multiple" ? 22 : -1);
  }
}
function ReceiptModalComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 7);
    \u0275\u0275listener("ngSubmit", function ReceiptModalComponent_Conditional_9_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 6)(2, "div", 8)(3, "div", 9);
    \u0275\u0275repeaterCreate(4, ReceiptModalComponent_Conditional_9_For_5_Template, 23, 11, "div", 10, _forTrack02);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 11)(7, "button", 12);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.purchaseOrder.line_items);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isLoading ? "Procesando..." : "Confirmar Recibo", " ");
  }
}
function ReceiptModalComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "p", 36);
    \u0275\u0275text(2, "Error: No se pudo cargar la orden de compra");
    \u0275\u0275elementEnd()();
  }
}
var ReceiptModalComponent = class _ReceiptModalComponent {
  receiptService;
  snackBar;
  cdr;
  dialogRef;
  data;
  isLoading = false;
  purchaseOrder;
  receivedQuantities = {};
  lotModes = {};
  multipleLotsByLine = {};
  constructor(receiptService, snackBar, cdr, dialogRef, data) {
    this.receiptService = receiptService;
    this.snackBar = snackBar;
    this.cdr = cdr;
    this.dialogRef = dialogRef;
    this.data = data;
    this.purchaseOrder = data?.purchaseOrder;
  }
  ngOnInit() {
    if (this.purchaseOrder?.line_items) {
      this.purchaseOrder.line_items.forEach((item) => {
        this.receivedQuantities[item.id] = 0;
        this.lotModes[item.id] = "single";
        this.multipleLotsByLine[item.id] = [];
      });
    }
  }
  /**
   * Obtener nome do produto
   */
  getProductName(lineItem) {
    return lineItem.product?.name || "Produto desconhecido";
  }
  /**
   * Obtener SKU del producto
   */
  getProductSku(lineItem) {
    return lineItem.product?.sku || "-";
  }
  /**
   * Obtener cantidad ordenada
   */
  getOrderedQuantity(lineItem) {
    return `${lineItem.quantity} ${lineItem.product_uom?.uom?.name || "Unidad"}`;
  }
  getLotMode(lineItemId) {
    return this.lotModes[lineItemId] || "single";
  }
  onLotModeChange(lineItemId, mode) {
    this.lotModes[lineItemId] = mode;
    if (mode === "single") {
      this.multipleLotsByLine[lineItemId] = [];
    } else if (!this.multipleLotsByLine[lineItemId] || this.multipleLotsByLine[lineItemId].length === 0) {
      this.addLot(lineItemId);
    }
  }
  addLot(lineItemId) {
    const lineItem = this.getLineItemById(lineItemId);
    if (!lineItem) {
      return;
    }
    const productUomId = lineItem.product_uom?.id || lineItem.product_uom_id || "";
    this.multipleLotsByLine[lineItemId] = [
      ...this.multipleLotsByLine[lineItemId] || [],
      { tag_identifier: "", quantity: 0, product_uom_id: productUomId }
    ];
  }
  removeLot(lineItemId, lotIndex) {
    const current = [...this.multipleLotsByLine[lineItemId] || []];
    current.splice(lotIndex, 1);
    this.multipleLotsByLine[lineItemId] = current;
  }
  getLots(lineItemId) {
    return this.multipleLotsByLine[lineItemId] || [];
  }
  getLotsTotal(lineItemId) {
    return this.getLots(lineItemId).reduce((sum, lot) => sum + (Number(lot.quantity) || 0), 0);
  }
  getLineItemById(lineItemId) {
    return this.purchaseOrder?.line_items?.find((item) => item.id === lineItemId);
  }
  getLineUomId(lineItem) {
    return lineItem.product_uom?.id || lineItem.product_uom_id || "";
  }
  validateMultipleLots(lineItem, lots) {
    if (lots.length === 0) {
      return `Debes agregar al menos un lote para ${this.getProductName(lineItem)}`;
    }
    const lineUomId = this.getLineUomId(lineItem);
    for (let index = 0; index < lots.length; index++) {
      const lot = lots[index];
      const lotNumber = index + 1;
      const tag = (lot.tag_identifier || "").trim();
      if (!tag) {
        return `El lote ${lotNumber} en ${this.getProductName(lineItem)} requiere identificador`;
      }
      const quantity = Number(lot.quantity || 0);
      if (quantity <= 0) {
        return `El lote ${lotNumber} en ${this.getProductName(lineItem)} requiere cantidad mayor a 0`;
      }
      if (lineUomId && lot.product_uom_id !== lineUomId) {
        return `El UOM del lote ${lotNumber} en ${this.getProductName(lineItem)} debe coincidir con la l\xEDnea`;
      }
    }
    return null;
  }
  /**
   * Enviar recibo
   */
  onSubmit() {
    console.log("onSubmit called");
    console.log("receivedQuantities:", this.receivedQuantities);
    if (!this.purchaseOrder?.line_items || this.purchaseOrder.line_items.length === 0) {
      console.log("No items");
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: "No hay items para recibir", type: "error" },
        duration: 3e3
      });
      return;
    }
    let hasValidItems = false;
    const receivedItems = [];
    for (const lineItem of this.purchaseOrder.line_items) {
      const quantity = Number(this.receivedQuantities[lineItem.id] || 0);
      console.log(`Item ${lineItem.id}: quantity=${quantity}`);
      const lotMode = this.getLotMode(lineItem.id);
      const lineUomId = this.getLineUomId(lineItem);
      if (lotMode === "single" && quantity > 0) {
        hasValidItems = true;
        receivedItems.push({
          line_item_id: lineItem.id,
          product_id: lineItem.product_id,
          product_uom_id: lineUomId,
          quantity,
          unit_total: lineItem.unit_total || 0,
          iva_percentage: lineItem.iva_percentage || 0,
          iva_unit: lineItem.iva_unit || 0,
          ieps_percentage: lineItem.ieps_percentage || 0,
          ieps_unit: lineItem.ieps_unit || 0,
          expiration_date: null,
          lot_mode: "single"
        });
      } else if (lotMode === "multiple") {
        const lots = this.getLots(lineItem.id).map((lot) => ({
          tag_identifier: (lot.tag_identifier || "").trim(),
          quantity: Number(lot.quantity || 0),
          product_uom_id: lot.product_uom_id || lineUomId
        })).filter((lot) => lot.tag_identifier || lot.quantity > 0);
        if (lots.length === 0) {
          continue;
        }
        const validationError = this.validateMultipleLots(lineItem, lots);
        if (validationError) {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: validationError, type: "error" },
            duration: 4e3
          });
          return;
        }
        hasValidItems = true;
        receivedItems.push({
          line_item_id: lineItem.id,
          product_id: lineItem.product_id,
          product_uom_id: lineUomId,
          quantity: lots.reduce((sum, lot) => sum + lot.quantity, 0),
          unit_total: lineItem.unit_total || 0,
          iva_percentage: lineItem.iva_percentage || 0,
          iva_unit: lineItem.iva_unit || 0,
          ieps_percentage: lineItem.ieps_percentage || 0,
          ieps_unit: lineItem.ieps_unit || 0,
          expiration_date: null,
          lot_mode: "multiple",
          lots
        });
      }
    }
    console.log("hasValidItems:", hasValidItems);
    console.log("receivedItems:", receivedItems);
    if (!hasValidItems) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: "Debes recibir al menos un item", type: "error" },
        duration: 3e3
      });
      return;
    }
    this.isLoading = true;
    const request = { received_items: receivedItems };
    console.log("Sending request:", request);
    this.receiptService.receiveItems(this.purchaseOrder.id, request).subscribe({
      next: (response) => {
        console.log("Success response:", response);
        this.isLoading = false;
        this.cdr.detectChanges();
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Recibo registrado exitosamente", type: "success" },
          duration: 3e3
        });
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error("Error response:", error);
        this.isLoading = false;
        this.cdr.detectChanges();
        const errorMessage = error.error?.message || (Array.isArray(error.error?.message) ? error.error.message.join(", ") : "Error al registrar recibo");
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: errorMessage,
            type: "error"
          },
          duration: 5e3
        });
      }
    });
  }
  /**
   * Cancelar
   */
  onCancel() {
    this.dialogRef.close();
  }
  /**
   * Formatear moneda
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  }
  static \u0275fac = function ReceiptModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReceiptModalComponent)(\u0275\u0275directiveInject(ReceiptService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReceiptModalComponent, selectors: [["app-receipt-modal"]], decls: 11, vars: 2, consts: [[1, "receipt-modal"], [1, "modal-header"], [1, "folio"], ["type", "button", "aria-label", "Cerrar modal", 1, "btn-close-modal", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "aria-hidden", "true"], ["d", "M6 6L18 18M18 6L6 18", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], [1, "modal-content"], [3, "ngSubmit"], [1, "section"], [1, "items-list"], [1, "item-row"], [1, "modal-actions"], ["type", "submit", 1, "btn-confirm", 3, "disabled"], [1, "item-info"], [1, "product-details"], [1, "sku"], [1, "ordered"], [1, "item-inputs-row"], [1, "input-group"], [1, "field-input", "select-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["value", "single"], ["value", "multiple"], ["type", "number", "placeholder", "0", "min", "0", "step", "0.001", 1, "field-input", "quantity-input", 3, "ngModelChange", "ngModel", "ngModelOptions", "disabled"], [1, "lots-section"], [1, "lots-header"], ["type", "button", "aria-label", "Agregar lote", "title", "Agregar lote", 1, "btn-add-lot", "btn-icon-text", 3, "click"], ["d", "M12 5V19M5 12H19", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], [1, "lots-grid-header"], [1, "lots-grid-body"], [1, "lots-grid-row"], [1, "lots-total"], ["type", "text", "placeholder", "Ej: 12404277658", 1, "field-input", "text-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.001", 1, "field-input", "quantity-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "value"], ["type", "button", "aria-label", "Eliminar lote", "title", "Eliminar lote", 1, "btn-remove-lot", "btn-icon-only", 3, "click", "disabled"], ["d", "M6 7H18M10 11V16M14 11V16M9 7L10 5H14L15 7M8 7V18C8 18.5 8.4 19 9 19H15C15.6 19 16 18.5 16 18V7", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "error-message"]], template: function ReceiptModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2");
      \u0275\u0275text(4, "Recibo de Orden de Compra");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, ReceiptModalComponent_Conditional_5_Template, 2, 1, "p", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 3);
      \u0275\u0275listener("click", function ReceiptModalComponent_Template_button_click_6_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(7, "svg", 4);
      \u0275\u0275element(8, "path", 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(9, ReceiptModalComponent_Conditional_9_Template, 9, 2, "form")(10, ReceiptModalComponent_Conditional_10_Template, 3, 0, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275conditional((ctx.purchaseOrder == null ? null : ctx.purchaseOrder.folio) ? 5 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.purchaseOrder ? 9 : 10);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormsModule, NgModel, NgForm], styles: [`

.receipt-modal[_ngcontent-%COMP%] {
  width: 100%;
  max-width: 1100px;
}
.modal-header[_ngcontent-%COMP%] {
  padding: 0.9rem 1.1rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.2rem 0;
}
.modal-header[_ngcontent-%COMP%]   .folio[_ngcontent-%COMP%] {
  font-size: 0.82rem;
  color: #6b7280;
  margin: 0;
  font-weight: 600;
}
.btn-close-modal[_ngcontent-%COMP%] {
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4b5563;
}
.btn-close-modal[_ngcontent-%COMP%]:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}
.btn-close-modal[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 1rem;
  height: 1rem;
}
.modal-content[_ngcontent-%COMP%] {
  padding: 1rem 1.1rem;
  max-height: 62vh;
  overflow-y: auto;
}
.modal-content[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {
  color: #f44336;
  text-align: center;
  padding: 2rem;
  font-weight: 600;
}
.section[_ngcontent-%COMP%] {
  padding-top: 0.1rem;
}
.items-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.item-row[_ngcontent-%COMP%] {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.item-row[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%] {
  order: -1;
}
.item-row[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.3rem 0;
}
.item-row[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .sku[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0 0 0.2rem 0;
}
.item-row[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .ordered[_ngcontent-%COMP%] {
  font-size: 0.8rem;
  color: #667eea;
  margin: 0;
  font-weight: 600;
}
.item-row[_ngcontent-%COMP%]   .item-inputs-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.input-group[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
}
.input-group[_ngcontent-%COMP%]   .quantity-input[_ngcontent-%COMP%] {
  font-weight: 600;
}
.input-group[_ngcontent-%COMP%]   .date-input[_ngcontent-%COMP%] {
  font-size: 0.85rem;
}
.field-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.58rem 0.75rem;
  border: 1.5px solid #d7dce5;
  border-radius: 10px;
  font-size: 0.92rem;
  background: #ffffff;
  color: #1f2937;
  box-shadow: 0 1px 1px rgba(15, 23, 42, 0.04);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;
}
.field-input[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}
.field-input[_ngcontent-%COMP%]:disabled {
  background: #f3f4f6;
  color: #94a3b8;
  cursor: not-allowed;
}
.select-input[_ngcontent-%COMP%] {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: 18px;
  padding-right: 34px;
}
.lots-section[_ngcontent-%COMP%] {
  margin-top: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.65rem;
}
.lots-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.lots-header[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1f2937;
}
.btn-add-lot[_ngcontent-%COMP%], 
.btn-remove-lot[_ngcontent-%COMP%] {
  border: 1px solid #d1d5db;
  background: #fff;
  color: #374151;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.38rem 0.58rem;
  cursor: pointer;
}
.btn-add-lot[_ngcontent-%COMP%]:hover:not(:disabled), 
.btn-remove-lot[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #f9fafb;
}
.btn-add-lot[_ngcontent-%COMP%]:disabled, 
.btn-remove-lot[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-icon-text[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.38rem 0.6rem;
}
.btn-icon-text[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 0.9rem;
  height: 0.9rem;
  flex-shrink: 0;
}
.lots-grid-header[_ngcontent-%COMP%], 
.lots-grid-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: minmax(180px, 1.6fr) minmax(90px, 0.8fr) minmax(100px, 0.7fr) 36px;
  gap: 0.5rem;
  align-items: center;
}
.lots-grid-header[_ngcontent-%COMP%] {
  padding: 0 0.2rem 0.35rem;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 0.4rem;
  color: #6b7280;
  font-size: 0.72rem;
  font-weight: 700;
}
.lots-grid-body[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
}
.lots-grid-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], 
.lots-grid-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {
  width: 100%;
  min-width: 0;
}
.btn-icon-only[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-color: #f1c6c6;
  color: #b42318;
  background: #fff5f5;
}
.btn-icon-only[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 1rem;
  height: 1rem;
}
.btn-icon-only[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #991b1b;
}
.lots-total[_ngcontent-%COMP%] {
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  color: #4b5563;
}
.modal-actions[_ngcontent-%COMP%] {
  padding: 0.8rem 1.1rem 1rem;
  border-top: 1px solid #e5e7eb;
  background: white;
  display: flex;
  justify-content: flex-end;
}
.modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
  padding: 0.62rem 1.05rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.modal-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      135deg,
      #4caf50 0%,
      #45a049 100%);
  border: none;
  color: white;
  min-width: 180px;
}
.modal-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(76, 175, 80, 0.25);
}
@media (max-width: 900px) {
  .lots-grid-header[_ngcontent-%COMP%], 
   .lots-grid-row[_ngcontent-%COMP%] {
    grid-template-columns: 1.3fr 0.9fr 0.8fr 36px;
  }
}
@media (max-width: 680px) {
  .item-row[_ngcontent-%COMP%]   .item-inputs-row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lots-grid-header[_ngcontent-%COMP%] {
    display: none;
  }
  .lots-grid-row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    border: 1px solid #f1f5f9;
    border-radius: 8px;
    padding: 0.5rem;
  }
  .btn-icon-only[_ngcontent-%COMP%] {
    justify-self: end;
  }
}
/*# sourceMappingURL=receipt-modal.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReceiptModalComponent, [{
    type: Component,
    args: [{ selector: "app-receipt-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule], template: `<div class="receipt-modal">
  <div class="modal-header">
    <div>
      <h2>Recibo de Orden de Compra</h2>
      @if (purchaseOrder?.folio) {
        <p class="folio">{{ purchaseOrder.folio }}</p>
      }
    </div>
    <button type="button" class="btn-close-modal" (click)="onCancel()" aria-label="Cerrar modal">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  @if (purchaseOrder) {
    <form (ngSubmit)="onSubmit()">
      <div class="modal-content">
        <div class="section">
          <div class="items-list">
            @for (lineItem of purchaseOrder.line_items; track lineItem.id; let i = $index) {
              <div class="item-row">
                <div class="item-info">
                  <div class="product-details">
                    <h4>{{ getProductName(lineItem) }}</h4>
                    <p class="sku">SKU: {{ getProductSku(lineItem) }}</p>
                    <p class="ordered">Ordenado: {{ getOrderedQuantity(lineItem) }}</p>
                  </div>
                </div>

                <div class="item-inputs-row">
                  <div class="input-group">
                    <label>Modo de lotes</label>
                    <select
                      [(ngModel)]="lotModes[lineItem.id]"
                      [ngModelOptions]="{standalone: true}"
                      (ngModelChange)="onLotModeChange(lineItem.id, $event)"
                      class="field-input select-input"
                    >
                      <option value="single">Un solo lote</option>
                      <option value="multiple">M\xFAltiples lotes</option>
                    </select>
                  </div>

                  <div class="input-group">
                    <label>Cantidad Recibida</label>
                    <input 
                      type="number" 
                      [(ngModel)]="receivedQuantities[lineItem.id]"
                      [ngModelOptions]="{standalone: true}"
                      placeholder="0"
                      min="0"
                      step="0.001"
                      class="field-input quantity-input"
                      [disabled]="getLotMode(lineItem.id) === 'multiple'"
                    />
                  </div>

                </div>

                @if (getLotMode(lineItem.id) === 'multiple') {
                  <div class="lots-section">
                    <div class="lots-header">
                      <h5>Lotes</h5>
                      <button
                        type="button"
                        class="btn-add-lot btn-icon-text"
                        (click)="addLot(lineItem.id)"
                        aria-label="Agregar lote"
                        title="Agregar lote"
                      >
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <span>Agregar</span>
                      </button>
                    </div>

                    <div class="lots-grid-header">
                      <span>Tag / Identificador</span>
                      <span>Cantidad</span>
                      <span>UOM</span>
                      <span></span>
                    </div>
                    <div class="lots-grid-body">
                      @for (lot of getLots(lineItem.id); track $index; let lotIndex = $index) {
                        <div class="lots-grid-row">
                          <input
                            type="text"
                            [(ngModel)]="multipleLotsByLine[lineItem.id][lotIndex].tag_identifier"
                            [ngModelOptions]="{standalone: true}"
                            placeholder="Ej: 12404277658"
                            class="field-input text-input"
                          />
                          <input
                            type="number"
                            [(ngModel)]="multipleLotsByLine[lineItem.id][lotIndex].quantity"
                            [ngModelOptions]="{standalone: true}"
                            min="0"
                            step="0.001"
                            class="field-input quantity-input"
                          />
                          <select
                            [(ngModel)]="multipleLotsByLine[lineItem.id][lotIndex].product_uom_id"
                            [ngModelOptions]="{standalone: true}"
                            class="field-input select-input"
                          >
                            <option [value]="lineItem.product_uom?.id || lineItem.product_uom_id">
                              {{ lineItem.product_uom?.uom?.name || lineItem.uom?.name || 'Unidad' }}
                            </option>
                          </select>
                          <button
                            type="button"
                            class="btn-remove-lot btn-icon-only"
                            (click)="removeLot(lineItem.id, lotIndex)"
                            [disabled]="getLots(lineItem.id).length <= 1"
                            aria-label="Eliminar lote"
                            title="Eliminar lote"
                          >
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M6 7H18M10 11V16M14 11V16M9 7L10 5H14L15 7M8 7V18C8 18.5 8.4 19 9 19H15C15.6 19 16 18.5 16 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      }
                    </div>

                    <p class="lots-total">
                      Total lotes: <strong>{{ getLotsTotal(lineItem.id) }}</strong>
                    </p>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button 
          type="submit"
          class="btn-confirm"
          [disabled]="isLoading"
        >
          {{ isLoading ? 'Procesando...' : 'Confirmar Recibo' }}
        </button>
      </div>
    </form>
  } @else {
    <div class="modal-content">
      <p class="error-message">Error: No se pudo cargar la orden de compra</p>
    </div>
  }
</div>
`, styles: [`/* src/app/features/purchase-orders/components/receipt-modal/receipt-modal.component.scss */
.receipt-modal {
  width: 100%;
  max-width: 1100px;
}
.modal-header {
  padding: 0.9rem 1.1rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.modal-header h2 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.2rem 0;
}
.modal-header .folio {
  font-size: 0.82rem;
  color: #6b7280;
  margin: 0;
  font-weight: 600;
}
.btn-close-modal {
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4b5563;
}
.btn-close-modal:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}
.btn-close-modal svg {
  width: 1rem;
  height: 1rem;
}
.modal-content {
  padding: 1rem 1.1rem;
  max-height: 62vh;
  overflow-y: auto;
}
.modal-content .error-message {
  color: #f44336;
  text-align: center;
  padding: 2rem;
  font-weight: 600;
}
.section {
  padding-top: 0.1rem;
}
.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.item-row {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.item-row .item-info {
  order: -1;
}
.item-row .item-info .product-details h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.3rem 0;
}
.item-row .item-info .product-details .sku {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0 0 0.2rem 0;
}
.item-row .item-info .product-details .ordered {
  font-size: 0.8rem;
  color: #667eea;
  margin: 0;
  font-weight: 600;
}
.item-row .item-inputs-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.input-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
}
.input-group .quantity-input {
  font-weight: 600;
}
.input-group .date-input {
  font-size: 0.85rem;
}
.field-input {
  width: 100%;
  padding: 0.58rem 0.75rem;
  border: 1.5px solid #d7dce5;
  border-radius: 10px;
  font-size: 0.92rem;
  background: #ffffff;
  color: #1f2937;
  box-shadow: 0 1px 1px rgba(15, 23, 42, 0.04);
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;
}
.field-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}
.field-input:disabled {
  background: #f3f4f6;
  color: #94a3b8;
  cursor: not-allowed;
}
.select-input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: 18px;
  padding-right: 34px;
}
.lots-section {
  margin-top: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.65rem;
}
.lots-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.lots-header h5 {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1f2937;
}
.btn-add-lot,
.btn-remove-lot {
  border: 1px solid #d1d5db;
  background: #fff;
  color: #374151;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.38rem 0.58rem;
  cursor: pointer;
}
.btn-add-lot:hover:not(:disabled),
.btn-remove-lot:hover:not(:disabled) {
  background: #f9fafb;
}
.btn-add-lot:disabled,
.btn-remove-lot:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-icon-text {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.38rem 0.6rem;
}
.btn-icon-text svg {
  width: 0.9rem;
  height: 0.9rem;
  flex-shrink: 0;
}
.lots-grid-header,
.lots-grid-row {
  display: grid;
  grid-template-columns: minmax(180px, 1.6fr) minmax(90px, 0.8fr) minmax(100px, 0.7fr) 36px;
  gap: 0.5rem;
  align-items: center;
}
.lots-grid-header {
  padding: 0 0.2rem 0.35rem;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 0.4rem;
  color: #6b7280;
  font-size: 0.72rem;
  font-weight: 700;
}
.lots-grid-body {
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
}
.lots-grid-row input,
.lots-grid-row select {
  width: 100%;
  min-width: 0;
}
.btn-icon-only {
  width: 36px;
  height: 36px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-color: #f1c6c6;
  color: #b42318;
  background: #fff5f5;
}
.btn-icon-only svg {
  width: 1rem;
  height: 1rem;
}
.btn-icon-only:hover:not(:disabled) {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #991b1b;
}
.lots-total {
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  color: #4b5563;
}
.modal-actions {
  padding: 0.8rem 1.1rem 1rem;
  border-top: 1px solid #e5e7eb;
  background: white;
  display: flex;
  justify-content: flex-end;
}
.modal-actions button {
  padding: 0.62rem 1.05rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.modal-actions .btn-confirm {
  background:
    linear-gradient(
      135deg,
      #4caf50 0%,
      #45a049 100%);
  border: none;
  color: white;
  min-width: 180px;
}
.modal-actions .btn-confirm:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(76, 175, 80, 0.25);
}
@media (max-width: 900px) {
  .lots-grid-header,
  .lots-grid-row {
    grid-template-columns: 1.3fr 0.9fr 0.8fr 36px;
  }
}
@media (max-width: 680px) {
  .item-row .item-inputs-row {
    grid-template-columns: 1fr;
  }
  .lots-grid-header {
    display: none;
  }
  .lots-grid-row {
    grid-template-columns: 1fr;
    border: 1px solid #f1f5f9;
    border-radius: 8px;
    padding: 0.5rem;
  }
  .btn-icon-only {
    justify-self: end;
  }
}
/*# sourceMappingURL=receipt-modal.component.css.map */
`] }]
  }], () => [{ type: ReceiptService }, { type: MatSnackBar }, { type: ChangeDetectorRef }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReceiptModalComponent, { className: "ReceiptModalComponent", filePath: "src/app/features/purchase-orders/components/receipt-modal/receipt-modal.component.ts", lineNumber: 18 });
})();

// src/app/features/purchase-orders/components/order-detail-dialog/order-detail-dialog.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function OrderDetailDialogComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "p", 4);
    \u0275\u0275text(2, "Cargando orden...");
    \u0275\u0275elementEnd()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 63);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToEditForm());
    });
    \u0275\u0275element(1, "i", 51);
    \u0275\u0275text(2, " Editar encabezado ");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 25);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 25);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 25);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_103_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.initiateReceipt());
    });
    \u0275\u0275element(1, "i", 65);
    \u0275\u0275text(2, " Iniciar Recibo ");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_104_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelOrder());
    });
    \u0275\u0275element(1, "i", 67);
    \u0275\u0275text(2, " Cancelar requisici\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_125_Conditional_15_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 69)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "small");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "removeTrailingZeros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((item_r6.product == null ? null : item_r6.product.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r6.product == null ? null : item_r6.product.sku) || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.parseNumber(item_r6.unit_total ?? item_r6.unit_price ?? 0)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.parseNumber(item_r6.unit_total ?? item_r6.unit_price ?? 0) * ctx_r2.parseNumber(item_r6.quantity)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(13, 8, item_r6.quantity), " ", (item_r6.uom == null ? null : item_r6.uom.name) || (item_r6.product_uom == null ? null : item_r6.product_uom.uom == null ? null : item_r6.product_uom.uom.name) || "Unidad");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(16, 10, item_r6.received_original_quantity), " ", (item_r6.received_uom == null ? null : item_r6.received_uom.name) || "-");
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_125_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OrderDetailDialogComponent_Conditional_2_Conditional_125_Conditional_15_For_1_Template, 17, 12, "tr", null, _forTrack03);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r2.order().line_items);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_125_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 70)(2, "div", 71);
    \u0275\u0275element(3, "i", 27);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No hay productos");
    \u0275\u0275elementEnd()()()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_125_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "table", 68)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "COSTO UNIT.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "IMPORTE L\xCDNEA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "SOLICITADAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "RECIBIDAS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275conditionalCreate(15, OrderDetailDialogComponent_Conditional_2_Conditional_125_Conditional_15_Template, 2, 0)(16, OrderDetailDialogComponent_Conditional_2_Conditional_125_Conditional_16_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275conditional(ctx_r2.order().line_items && ctx_r2.order().line_items.length > 0 ? 15 : 16);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 74);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 75);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 74);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 75);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 73);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.regenerateReceivingPDF());
    });
    \u0275\u0275conditionalCreate(1, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_6_Conditional_1_Template, 1, 0, "i", 74)(2, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_6_Conditional_2_Template, 1, 0, "i", 75);
    \u0275\u0275text(3, " Regenerar PDF Recibo ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r2.regeneratingReceipt());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.regeneratingReceipt() ? 1 : 2);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_For_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_For_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 83);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 80)(3, "span", 81);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275conditionalCreate(6, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_For_15_Conditional_6_Template, 2, 1, "span", 82)(7, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_For_15_Conditional_7_Template, 2, 0, "span", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 84);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td")(12, "span", 85);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "div", 86)(16, "button", 87);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_For_15_Template_button_click_16_listener() {
      const doc_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.downloadDocument(doc_r10));
    });
    \u0275\u0275element(17, "i", 88);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 89);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_For_15_Template_button_click_18_listener() {
      const doc_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.deleteDocument(doc_r10));
    });
    \u0275\u0275element(19, "i", 90);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const doc_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r2.getDocumentBadgeClass(doc_r10.document_type_name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r10.document_type_name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_15_0 = ctx_r2.getDocumentLanguageLabel(doc_r10.document_language)) ? 6 : 7, tmp_15_0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(doc_r10.document_name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatDocumentDate(doc_r10.uploaded_at));
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 79)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "TIPO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "IDIOMA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "NOMBRE DE ARCHIVO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "FECHA DE CARGA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_For_15_Template, 20, 5, "tr", null, _forTrack03);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.order().documents);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay documentos adjuntos");
    \u0275\u0275elementEnd()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_126_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 72)(2, "button", 73);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_126_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.regeneratePDF());
    });
    \u0275\u0275conditionalCreate(3, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_3_Template, 1, 0, "i", 74)(4, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_4_Template, 1, 0, "i", 75);
    \u0275\u0275text(5, " Regenerar PDF Original ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_6_Template, 4, 2, "button", 76);
    \u0275\u0275elementStart(7, "button", 77);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_126_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openUploadDocumentModal());
    });
    \u0275\u0275element(8, "i", 78);
    \u0275\u0275text(9, " Subir Documento ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_10_Template, 16, 0, "table", 79)(11, OrderDetailDialogComponent_Conditional_2_Conditional_126_Conditional_11_Template, 4, 0, "div", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.regeneratingPDF());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.regeneratingPDF() ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.order().general_status === "Recibida" ? 6 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.hasDocuments() ? 10 : 11);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_127_Conditional_1_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 91);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_127_Conditional_1_For_11_Template_span_click_2_listener() {
      const batch_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.openBatchDetail(batch_r12));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div", 69)(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "small");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const batch_r12 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", batch_r12.batch_number, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((batch_r12.product == null ? null : batch_r12.product.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((batch_r12.product == null ? null : batch_r12.product.sku) || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(12, 5, batch_r12.initial_quantity), " ", (batch_r12.uom == null ? null : batch_r12.uom.name) || "Unidad");
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_127_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 68)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "LOTE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "CANTIDAD");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, OrderDetailDialogComponent_Conditional_2_Conditional_127_Conditional_1_For_11_Template, 13, 7, "tr", null, _forTrack03);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r2.order().batches);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_127_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275element(1, "i", 92);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay lotes registrados");
    \u0275\u0275elementEnd()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275conditionalCreate(1, OrderDetailDialogComponent_Conditional_2_Conditional_127_Conditional_1_Template, 12, 0, "table", 68)(2, OrderDetailDialogComponent_Conditional_2_Conditional_127_Conditional_2_Template, 4, 0, "div", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r2.order()) == null ? null : tmp_2_0.batches) && ctx_r2.order().batches.length > 0 ? 1 : 2);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 77);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.registerPayment());
    });
    \u0275\u0275element(1, "i", 104);
    \u0275\u0275text(2, " Registrar Pago ");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_27_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 105);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const payment_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatPaymentCurrency(payment_r14.amount));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 5, payment_r14.payment_date, "dd/MM/yyyy"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(payment_r14.payment_method || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r14.reference_number || payment_r14.reference || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r14.notes || "-");
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 103)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "MONTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "FECHA DE PAGO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "M\xC9TODO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "REFERENCIA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "NOTAS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_27_For_15_Template, 12, 8, "tr", null, _forTrack03);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.order().payments);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275element(1, "i", 104);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay pagos registrados");
    \u0275\u0275elementEnd()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_128_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 72);
    \u0275\u0275conditionalCreate(2, OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_2_Template, 3, 0, "button", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 94)(4, "div", 95)(5, "div", 96)(6, "span");
    \u0275\u0275text(7, "Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "strong", 97);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 96)(11, "span");
    \u0275\u0275text(12, "Pagado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "strong", 98);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 96)(16, "span");
    \u0275\u0275text(17, "Pendiente:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "strong", 99);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 96)(21, "span");
    \u0275\u0275text(22, "Estatus:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 100);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 101);
    \u0275\u0275element(26, "div", 102);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(27, OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_27_Template, 16, 0, "table", 103)(28, OrderDetailDialogComponent_Conditional_2_Conditional_128_Conditional_28_Template, 4, 0, "div", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.canAddPayment() ? 2 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.formatPaymentCurrency(ctx_r2.getOrderTotalForPayments()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatPaymentCurrency(ctx_r2.getPaidAmount()));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatPaymentCurrency(ctx_r2.getRemainingAmount()));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r2.getPaymentStatusClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getPaymentStatus());
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r2.getPaidPercent(), "%");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.order().payments && ctx_r2.order().payments.length > 0 ? 27 : 28);
  }
}
function OrderDetailDialogComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "span", 7);
    \u0275\u0275text(3, "COMPRA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, OrderDetailDialogComponent_Conditional_2_Conditional_6_Template, 3, 0, "button", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 10)(8, "span", 11);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 12);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.close());
    });
    \u0275\u0275element(11, "i", 13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 14)(13, "div", 15)(14, "div", 16)(15, "div", 17)(16, "div", 18);
    \u0275\u0275element(17, "i", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 20)(19, "span", 21);
    \u0275\u0275text(20, "CREADO POR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 22);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 23);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_div_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenVendor() && ctx_r2.openVendorDialog());
    })("keydown.enter", function OrderDetailDialogComponent_Conditional_2_Template_div_keydown_enter_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenVendor() && ctx_r2.openVendorDialog());
    })("keydown.space", function OrderDetailDialogComponent_Conditional_2_Template_div_keydown_space_23_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenVendor() && ctx_r2.openVendorDialog());
    });
    \u0275\u0275elementStart(24, "div", 18);
    \u0275\u0275element(25, "i", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 20)(27, "span", 21);
    \u0275\u0275text(28, "PROVEEDOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 22);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(31, OrderDetailDialogComponent_Conditional_2_Conditional_31_Template, 1, 0, "i", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 26);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_div_click_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenWarehouse() && ctx_r2.openWarehouseDialog());
    })("keydown.enter", function OrderDetailDialogComponent_Conditional_2_Template_div_keydown_enter_32_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenWarehouse() && ctx_r2.openWarehouseDialog());
    })("keydown.space", function OrderDetailDialogComponent_Conditional_2_Template_div_keydown_space_32_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenWarehouse() && ctx_r2.openWarehouseDialog());
    });
    \u0275\u0275elementStart(33, "div", 18);
    \u0275\u0275element(34, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 20)(36, "span", 21);
    \u0275\u0275text(37, "PARA ALMAC\xC9N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 22);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(40, OrderDetailDialogComponent_Conditional_2_Conditional_40_Template, 1, 0, "i", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 28);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_div_click_41_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenFiscal() && ctx_r2.openFiscalDialog());
    })("keydown.enter", function OrderDetailDialogComponent_Conditional_2_Template_div_keydown_enter_41_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenFiscal() && ctx_r2.openFiscalDialog());
    })("keydown.space", function OrderDetailDialogComponent_Conditional_2_Template_div_keydown_space_41_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenFiscal() && ctx_r2.openFiscalDialog());
    });
    \u0275\u0275elementStart(42, "div", 18);
    \u0275\u0275element(43, "i", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 20)(45, "span", 21);
    \u0275\u0275text(46, "RAZ\xD3N SOCIAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span", 22);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(49, OrderDetailDialogComponent_Conditional_2_Conditional_49_Template, 1, 0, "i", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 30)(51, "h3", 31);
    \u0275\u0275text(52, "FECHAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 32)(54, "span", 33);
    \u0275\u0275text(55, "Fecha esperada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "span", 34);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 32)(59, "span", 33);
    \u0275\u0275text(60, "Estado de pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span", 35);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "div", 36)(64, "div", 37)(65, "h3", 31);
    \u0275\u0275text(66, "TOTALES");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "div", 38)(68, "button", 39);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_68_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTotals(false));
    });
    \u0275\u0275text(69, " Solicitados ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "button", 39);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_70_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTotals(true));
    });
    \u0275\u0275text(71, " Recibidos ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(72, "div", 40)(73, "div", 41)(74, "span", 42);
    \u0275\u0275text(75, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "span", 43);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 41)(79, "span", 42);
    \u0275\u0275text(80, "IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "span", 43);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 41)(84, "span", 42);
    \u0275\u0275text(85, "IEPS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "span", 43);
    \u0275\u0275text(87);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(88, "div", 44);
    \u0275\u0275elementStart(89, "div", 45)(90, "span", 46);
    \u0275\u0275text(91, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "span", 47);
    \u0275\u0275text(93);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(94, "div", 48)(95, "div", 49)(96, "h3", 31);
    \u0275\u0275text(97, "NOTAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "button", 50);
    \u0275\u0275element(99, "i", 51);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(100, "p", 52);
    \u0275\u0275text(101);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(102, "div", 53);
    \u0275\u0275conditionalCreate(103, OrderDetailDialogComponent_Conditional_2_Conditional_103_Template, 3, 0, "button", 54);
    \u0275\u0275conditionalCreate(104, OrderDetailDialogComponent_Conditional_2_Conditional_104_Template, 3, 0, "button", 55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(105, "div", 56)(106, "div", 57)(107, "nav", 58)(108, "button", 59);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_108_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(0));
    });
    \u0275\u0275text(109, " Productos ");
    \u0275\u0275elementStart(110, "span", 60);
    \u0275\u0275text(111);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(112, "button", 59);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_112_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(1));
    });
    \u0275\u0275text(113, " Documentos ");
    \u0275\u0275elementStart(114, "span", 60);
    \u0275\u0275text(115);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(116, "button", 59);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_116_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(2));
    });
    \u0275\u0275text(117, " Lotes ");
    \u0275\u0275elementStart(118, "span", 60);
    \u0275\u0275text(119);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(120, "button", 59);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_120_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(3));
    });
    \u0275\u0275text(121, " Pagos ");
    \u0275\u0275elementStart(122, "span", 60);
    \u0275\u0275text(123);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(124, "div", 61);
    \u0275\u0275conditionalCreate(125, OrderDetailDialogComponent_Conditional_2_Conditional_125_Template, 17, 1, "div", 62);
    \u0275\u0275conditionalCreate(126, OrderDetailDialogComponent_Conditional_2_Conditional_126_Template, 12, 4, "div", 62);
    \u0275\u0275conditionalCreate(127, OrderDetailDialogComponent_Conditional_2_Conditional_127_Template, 3, 1, "div", 62);
    \u0275\u0275conditionalCreate(128, OrderDetailDialogComponent_Conditional_2_Conditional_128_Template, 29, 9, "div", 62);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_8_0;
    let tmp_12_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("#", ctx_r2.order().folio || ctx_r2.order().id.substring(0, 6));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canEditOrder() ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getStatusBadgeClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.order().general_status || ctx_r2.order().status, " ");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate2("", (tmp_5_0 = ctx_r2.order().creator) == null ? null : tmp_5_0.first_name, " ", ((tmp_5_0 = ctx_r2.order().creator) == null ? null : tmp_5_0.last_name) || "N/A");
    \u0275\u0275advance();
    \u0275\u0275classProp("info-card--clickable", ctx_r2.canOpenVendor());
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenVendor() ? 0 : null);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(((tmp_8_0 = ctx_r2.order().vendor) == null ? null : tmp_8_0.name) || "N/A");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canOpenVendor() ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("info-card--clickable", ctx_r2.canOpenWarehouse());
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenWarehouse() ? 0 : null);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(((tmp_12_0 = ctx_r2.order().warehouse) == null ? null : tmp_12_0.name) || "N/A");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canOpenWarehouse() ? 40 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("info-card--clickable", ctx_r2.canOpenFiscal());
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenFiscal() ? 0 : null);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getFiscalDisplayName());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canOpenFiscal() ? 49 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.formatShortDate(ctx_r2.order().expected_delivery_date || ctx_r2.order().tentative_receipt_date));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("payment-pill--paid", ctx_r2.order().payment_status !== "Pendiente");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.order().payment_status, " ");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", !ctx_r2.showReceivedTotals());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.showReceivedTotals());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getSubtotal());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.getIVA());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.getIEPS());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r2.getTotalColor());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getTotal());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.order().notes || "Sin notas");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.canReceive() ? 103 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canCancel() ? 104 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getLineItemsCount());
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getDocumentsCount());
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getBatchesCount());
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getPaymentsCount());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 0 ? 125 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 1 ? 126 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 2 ? 127 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 3 ? 128 : -1);
  }
}
function OrderDetailDialogComponent_Conditional_3_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 74);
    \u0275\u0275text(1, " Regenerando... ");
  }
}
function OrderDetailDialogComponent_Conditional_3_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 75);
    \u0275\u0275text(1, " Regenerar ");
  }
}
function OrderDetailDialogComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 106);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_3_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275elementStart(1, "div", 107);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_3_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 108)(3, "h3");
    \u0275\u0275text(4, "Regenerar documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 109);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275element(6, "i", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 110)(8, "p", 111);
    \u0275\u0275text(9, "\xBFEn qu\xE9 idioma desea generar el documento?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 112)(11, "label", 113)(12, "input", 114);
    \u0275\u0275listener("change", function OrderDetailDialogComponent_Conditional_3_Template_input_change_12_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedRegenerateLanguage.set("es"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "Espa\xF1ol (es)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label", 113)(16, "input", 115);
    \u0275\u0275listener("change", function OrderDetailDialogComponent_Conditional_3_Template_input_change_16_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedRegenerateLanguage.set("en"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "English (en)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "label", 116)(20, "input", 117);
    \u0275\u0275listener("change", function OrderDetailDialogComponent_Conditional_3_Template_input_change_20_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.keepPreviousDocument.set($event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Mantener documento anterior");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 118)(24, "button", 119);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_3_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275text(25, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 120);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_3_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmRegenerateDocument());
    });
    \u0275\u0275conditionalCreate(27, OrderDetailDialogComponent_Conditional_3_Conditional_27_Template, 2, 0)(28, OrderDetailDialogComponent_Conditional_3_Conditional_28_Template, 2, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.isRegeneratingDocument());
    \u0275\u0275advance(6);
    \u0275\u0275classProp("selected", ctx_r2.selectedRegenerateLanguage() === "es");
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.selectedRegenerateLanguage() === "es")("disabled", ctx_r2.isRegeneratingDocument());
    \u0275\u0275advance(3);
    \u0275\u0275classProp("selected", ctx_r2.selectedRegenerateLanguage() === "en");
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.selectedRegenerateLanguage() === "en")("disabled", ctx_r2.isRegeneratingDocument());
    \u0275\u0275advance(4);
    \u0275\u0275property("checked", ctx_r2.keepPreviousDocument())("disabled", ctx_r2.isRegeneratingDocument());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.isRegeneratingDocument());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-loading", ctx_r2.isRegeneratingDocument());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isRegeneratingDocument() ? 27 : 28);
  }
}
function OrderDetailDialogComponent_Conditional_4_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 127);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r17 = ctx.$implicit;
    \u0275\u0275property("ngValue", type_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r17.name);
  }
}
function OrderDetailDialogComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 106);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_4_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeUploadDocumentModal());
    });
    \u0275\u0275elementStart(1, "div", 121);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_4_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r16);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 122)(3, "h3");
    \u0275\u0275text(4, "Subir Documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 123);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeUploadDocumentModal());
    });
    \u0275\u0275element(6, "i", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 124)(8, "div", 125)(9, "label");
    \u0275\u0275text(10, "Tipo de Documento ");
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "select", 126);
    \u0275\u0275listener("ngModelChange", function OrderDetailDialogComponent_Conditional_4_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedDocumentTypeId.set($event ? +$event : null));
    });
    \u0275\u0275elementStart(14, "option", 127);
    \u0275\u0275text(15, "Seleccionar tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(16, OrderDetailDialogComponent_Conditional_4_For_17_Template, 2, 2, "option", 127, _forTrack03);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 125)(19, "label");
    \u0275\u0275text(20, "Archivo ");
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "input", 128, 0);
    \u0275\u0275listener("change", function OrderDetailDialogComponent_Conditional_4_Template_input_change_23_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDocumentFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 129);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_4_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r16);
      const uploadDocumentFileInput_r18 = \u0275\u0275reference(24);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openDocumentPicker(uploadDocumentFileInput_r18));
    });
    \u0275\u0275element(26, "i", 130);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "small");
    \u0275\u0275text(29, "Formatos permitidos: PDF, XML, JPEG, JPG, PNG");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 125)(31, "label");
    \u0275\u0275text(32, "Notas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "textarea", 131);
    \u0275\u0275listener("ngModelChange", function OrderDetailDialogComponent_Conditional_4_Template_textarea_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.uploadDocumentNotes = $event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 132)(35, "button", 133);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_4_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeUploadDocumentModal());
    });
    \u0275\u0275text(36, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 134);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_4_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitUploadDocument());
    });
    \u0275\u0275element(38, "i", 78);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("ngModel", ctx_r2.selectedDocumentTypeId());
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.documentTypes());
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedUploadFileName || "Seleccionar Archivo", " ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r2.uploadDocumentNotes);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.uploadingDocument() || !ctx_r2.selectedDocumentTypeId() || !ctx_r2.selectedUploadFile);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.uploadingDocument() ? "Subiendo..." : "Subir Documento", " ");
  }
}
var OrderDetailDialogComponent = class _OrderDetailDialogComponent {
  data;
  dialogRef;
  router;
  purchaseOrderService;
  taxCalculator;
  toast;
  cdr;
  dialog;
  fiscalConfigService;
  vendorService;
  warehouseService;
  order = signal(null, ...ngDevMode ? [{ debugName: "order" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  activeTabIndex = signal(0, ...ngDevMode ? [{ debugName: "activeTabIndex" }] : []);
  showReceivedTotals = signal(false, ...ngDevMode ? [{ debugName: "showReceivedTotals" }] : []);
  regeneratingPDF = signal(false, ...ngDevMode ? [{ debugName: "regeneratingPDF" }] : []);
  regeneratingReceipt = signal(false, ...ngDevMode ? [{ debugName: "regeneratingReceipt" }] : []);
  uploadingDocument = signal(false, ...ngDevMode ? [{ debugName: "uploadingDocument" }] : []);
  documentTypes = signal([], ...ngDevMode ? [{ debugName: "documentTypes" }] : []);
  selectedDocumentTypeId = signal(null, ...ngDevMode ? [{ debugName: "selectedDocumentTypeId" }] : []);
  showUploadDocumentModal = signal(false, ...ngDevMode ? [{ debugName: "showUploadDocumentModal" }] : []);
  showRegenerateLanguageModal = signal(false, ...ngDevMode ? [{ debugName: "showRegenerateLanguageModal" }] : []);
  regenerateTarget = signal(null, ...ngDevMode ? [{ debugName: "regenerateTarget" }] : []);
  selectedRegenerateLanguage = signal("es", ...ngDevMode ? [{ debugName: "selectedRegenerateLanguage" }] : []);
  keepPreviousDocument = signal(false, ...ngDevMode ? [{ debugName: "keepPreviousDocument" }] : []);
  selectedUploadFile = null;
  selectedUploadFileName = "";
  uploadDocumentNotes = "";
  canReceive = computed(() => {
    const order = this.order();
    return order && order.general_status !== "Recibida";
  }, ...ngDevMode ? [{ debugName: "canReceive" }] : []);
  canCancel = computed(() => {
    const order = this.order();
    return order && order.general_status !== "Recibida";
  }, ...ngDevMode ? [{ debugName: "canCancel" }] : []);
  canAddPayment = computed(() => {
    const order = this.order();
    if (!order)
      return false;
    const status = order.general_status ?? order.status;
    if (status === "Cancelada")
      return false;
    return this.getRemainingAmount() >= 0.01;
  }, ...ngDevMode ? [{ debugName: "canAddPayment" }] : []);
  /** Abrir formulario de edición (cantidades, líneas, etc.). */
  canEditOrder = computed(() => {
    const o = this.order();
    if (!o)
      return false;
    const st = o.general_status ?? o.status;
    return st === "Creada" || st === "En Proceso";
  }, ...ngDevMode ? [{ debugName: "canEditOrder" }] : []);
  constructor(data, dialogRef, router, purchaseOrderService, taxCalculator, toast, cdr, dialog, fiscalConfigService, vendorService, warehouseService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.router = router;
    this.purchaseOrderService = purchaseOrderService;
    this.taxCalculator = taxCalculator;
    this.toast = toast;
    this.cdr = cdr;
    this.dialog = dialog;
    this.fiscalConfigService = fiscalConfigService;
    this.vendorService = vendorService;
    this.warehouseService = warehouseService;
    this.loadDocumentTypes();
    this.loadOrder();
  }
  loadOrder() {
    this.loading.set(true);
    this.purchaseOrderService.getOrderById(this.data.orderId).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loadDocuments(order.id);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Error loading order:", error);
        this.loading.set(false);
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  goToEditForm() {
    const id = this.order()?.id;
    if (!id)
      return;
    this.dialogRef.close();
    void this.router.navigate(["/purchase-orders", id, "edit"]);
  }
  toggleTotals(showReceived) {
    this.showReceivedTotals.set(showReceived);
  }
  getSubtotal() {
    const order = this.order();
    if (!order)
      return "$0.00";
    const value = this.showReceivedTotals() ? order.received_subtotal : order.requested_subtotal;
    return this.formatCurrency(value);
  }
  getIVA() {
    const order = this.order();
    if (!order)
      return "$0.00";
    const value = this.showReceivedTotals() ? order.received_iva_total : order.requested_iva_total;
    return this.formatCurrency(value);
  }
  getIEPS() {
    const order = this.order();
    if (!order)
      return "$0.00";
    const value = this.showReceivedTotals() ? order.received_ieps_total : order.requested_ieps_total;
    return this.formatCurrency(value);
  }
  getTotal() {
    const order = this.order();
    if (!order)
      return "$0.00";
    const value = this.showReceivedTotals() ? order.received_total : order.requested_total;
    return this.formatCurrency(value);
  }
  getTotalColor() {
    return this.showReceivedTotals() ? "text-green-600" : "text-blue-600";
  }
  formatCurrency(value) {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(numValue) ? "$0.00" : this.taxCalculator.formatCurrency(numValue);
  }
  formatLongDate(value) {
    if (!value)
      return "\u2014";
    const d = new Date(value);
    if (Number.isNaN(d.getTime()))
      return value;
    return d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  }
  formatShortDate(value) {
    if (!value)
      return "\u2014";
    const d = new Date(value);
    if (Number.isNaN(d.getTime()))
      return value;
    return d.toLocaleDateString("es-MX", { day: "numeric", month: "long" });
  }
  getOrderTotalForPayments() {
    const order = this.order();
    if (!order)
      return 0;
    const summary = order.payments_summary;
    if (summary) {
      const paid = this.parseNumber(summary.amount_paid);
      const pending = this.parseNumber(summary.amount_pending);
      return Math.max(paid + pending, 0);
    }
    return this.parseNumber(order.requested_total ?? order.grand_total ?? order.total_subtotal ?? 0);
  }
  getPaidAmount() {
    const order = this.order();
    if (order?.payments_summary) {
      return this.parseNumber(order.payments_summary.amount_paid);
    }
    if (!order?.payments?.length)
      return 0;
    return order.payments.reduce((sum, p) => sum + this.parseNumber(p.amount), 0);
  }
  getRemainingAmount() {
    const order = this.order();
    if (!order)
      return 0;
    if (order.payments_summary) {
      return Math.max(this.parseNumber(order.payments_summary.amount_pending), 0);
    }
    const backendRemaining = this.parseNumber(order.remaining_amount ?? 0);
    if (backendRemaining > 0) {
      return backendRemaining;
    }
    return Math.max(this.getOrderTotalForPayments() - this.getPaidAmount(), 0);
  }
  getPaidPercent() {
    const total = this.getOrderTotalForPayments();
    if (total <= 0)
      return 0;
    return Math.min(this.getPaidAmount() / total * 100, 100);
  }
  parseNumber(value) {
    if (value === null || value === void 0)
      return 0;
    const parsed = typeof value === "string" ? parseFloat(value) : value;
    return Number.isFinite(parsed) ? Math.round(parsed * 100) / 100 : 0;
  }
  getPaymentCurrency() {
    const order = this.order();
    return order?.payments_summary?.currency ?? order?.payment_currency ?? "MXN";
  }
  getPaymentStatus() {
    const order = this.order();
    return order?.payments_summary?.payment_status ?? order?.payment_status ?? "Pendiente";
  }
  getPaymentStatusClass() {
    const status = this.getPaymentStatus().trim().toLowerCase();
    if (status === "pagado" || status === "pagada") {
      return "status-paid";
    }
    if (status === "parcial") {
      return "status-partial";
    }
    return "status-pending";
  }
  formatPaymentCurrency(value) {
    const amount = this.parseNumber(value);
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: this.getPaymentCurrency(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number.isFinite(amount) ? amount : 0);
  }
  initiateReceipt() {
    const order = this.order();
    if (!order)
      return;
    const dialogRef = this.dialog.open(ReceiptModalComponent, {
      data: { purchaseOrder: order },
      width: "1120px",
      maxWidth: "98vw",
      maxHeight: "90vh",
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadOrder();
      }
    });
  }
  cancelOrder() {
    console.log("Cancelar orden");
  }
  registerPayment() {
    const order = this.order();
    if (!order)
      return;
    const remainingAmount = this.getRemainingAmount();
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: "660px",
      maxWidth: "95vw",
      panelClass: "payment-dialog-panel",
      data: {
        remainingAmount,
        totalAmount: this.getOrderTotalForPayments(),
        currency: this.getPaymentCurrency()
      },
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((paymentData) => {
      if (!paymentData)
        return;
      this.purchaseOrderService.registerPayment(order.id, paymentData).subscribe({
        next: () => {
          this.toast.success("Pago registrado exitosamente");
          this.loadOrder();
        },
        error: (error) => {
          this.toast.error(error?.message || "Error al registrar pago");
        }
      });
    });
  }
  regeneratePDF() {
    this.openRegenerateLanguageModal("original");
  }
  regenerateReceivingPDF() {
    this.openRegenerateLanguageModal("recepcion");
  }
  openRegenerateLanguageModal(target) {
    if (this.regeneratingPDF() || this.regeneratingReceipt())
      return;
    this.regenerateTarget.set(target);
    this.selectedRegenerateLanguage.set(this.getDefaultDocumentLanguage(target));
    this.keepPreviousDocument.set(false);
    this.showRegenerateLanguageModal.set(true);
  }
  closeRegenerateLanguageModal() {
    if (this.regeneratingPDF() || this.regeneratingReceipt())
      return;
    this.showRegenerateLanguageModal.set(false);
    this.regenerateTarget.set(null);
  }
  confirmRegenerateDocument() {
    const orderId = this.order()?.id;
    const target = this.regenerateTarget();
    const language = this.selectedRegenerateLanguage();
    const keepPrevious = this.keepPreviousDocument();
    if (!orderId || !target || this.isRegeneratingDocument())
      return;
    const isOriginal = target === "original";
    if (isOriginal) {
      this.regeneratingPDF.set(true);
    } else {
      this.regeneratingReceipt.set(true);
    }
    const request$ = isOriginal ? this.purchaseOrderService.regenerateOriginalPDF(orderId, language, keepPrevious) : this.purchaseOrderService.regenerateReceiptPDF(orderId, language, keepPrevious);
    request$.subscribe({
      next: (response) => {
        if (isOriginal) {
          this.regeneratingPDF.set(false);
        } else {
          this.regeneratingReceipt.set(false);
        }
        this.showRegenerateLanguageModal.set(false);
        this.regenerateTarget.set(null);
        this.cdr.detectChanges();
        this.toast.success(response?.message || (isOriginal ? "PDF original regenerado exitosamente" : "PDF de recepci\xF3n regenerado exitosamente"));
        this.loadOrder();
      },
      error: (error) => {
        if (isOriginal) {
          this.regeneratingPDF.set(false);
        } else {
          this.regeneratingReceipt.set(false);
        }
        this.cdr.detectChanges();
        this.toast.error(error?.message || (isOriginal ? "Error al regenerar PDF original" : "Error al regenerar PDF de recepci\xF3n"));
        console.error("Error regenerating document:", error);
      }
    });
  }
  getDefaultDocumentLanguage(target) {
    const docs = this.order()?.documents ?? [];
    const typeNames = target === "original" ? ["DOCUMENTO_ORIGINAL"] : ["DOCUMENTO_RECIBO", "DOCUMENTO_RECEPCION"];
    const doc = docs.find((d) => typeNames.includes(d.document_type_name));
    return doc?.document_language === "en" ? "en" : "es";
  }
  getDocumentLanguageLabel(language) {
    if (language === "es")
      return "ES";
    if (language === "en")
      return "EN";
    return null;
  }
  isRegeneratingDocument() {
    return this.regeneratingPDF() || this.regeneratingReceipt();
  }
  openUploadDocumentModal() {
    this.selectedUploadFile = null;
    this.selectedUploadFileName = "";
    this.uploadDocumentNotes = "";
    this.showUploadDocumentModal.set(true);
  }
  closeUploadDocumentModal() {
    if (this.uploadingDocument())
      return;
    this.showUploadDocumentModal.set(false);
  }
  openDocumentPicker(input) {
    if (this.uploadingDocument())
      return;
    input.click();
  }
  onDocumentFileSelected(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.selectedUploadFile = file;
    this.selectedUploadFileName = file.name;
    input.value = "";
  }
  submitUploadDocument() {
    const order = this.order();
    const documentTypeId = this.selectedDocumentTypeId();
    const file = this.selectedUploadFile;
    if (!order || !file)
      return;
    if (!documentTypeId) {
      this.toast.warning("Selecciona un tipo de documento");
      return;
    }
    this.uploadingDocument.set(true);
    this.purchaseOrderService.uploadOrderDocument(order.id, file, Number(documentTypeId)).subscribe({
      next: () => {
        this.uploadingDocument.set(false);
        this.showUploadDocumentModal.set(false);
        this.selectedUploadFile = null;
        this.selectedUploadFileName = "";
        this.uploadDocumentNotes = "";
        this.toast.success("Documento subido correctamente");
        this.loadDocuments(order.id);
      },
      error: (error) => {
        this.uploadingDocument.set(false);
        this.toast.error(error?.message || "Error al subir documento");
      }
    });
  }
  getDocumentBadgeClass(documentType) {
    const typeMap = {
      "DOCUMENTO_ORIGINAL": "badge-blue",
      "DOCUMENTO_RECIBO": "badge-green",
      "DOCUMENTO_RECEPCION": "badge-green"
    };
    return typeMap[documentType] || "badge-gray";
  }
  formatDocumentDate(dateString) {
    if (!dateString)
      return "-";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("es-ES", { month: "long" });
    return `${day} de ${month}`;
  }
  downloadDocument(doc) {
    if (doc.path) {
      window.open(doc.path, "_blank");
    }
  }
  deleteDocument(doc) {
    const order = this.order();
    if (!order)
      return;
    this.purchaseOrderService.deleteOrderDocument(doc.id).subscribe({
      next: () => {
        this.toast.success("Documento eliminado");
        this.loadDocuments(order.id);
      },
      error: (error) => {
        this.toast.error(error?.message || "No se pudo eliminar el documento");
      }
    });
  }
  hasDocuments() {
    const order = this.order();
    return order && order.documents && order.documents.length > 0;
  }
  loadDocuments(orderId) {
    this.purchaseOrderService.getOrderDocuments(orderId).subscribe({
      next: (resp) => {
        const current = this.order();
        if (!current)
          return;
        this.order.set(__spreadProps(__spreadValues({}, current), {
          documents: Array.isArray(resp?.data) ? resp.data : []
        }));
      },
      error: (error) => {
        console.error("Error loading documents:", error);
      }
    });
  }
  loadDocumentTypes() {
    this.purchaseOrderService.getOrderDocumentTypes().subscribe({
      next: (resp) => {
        const types = Array.isArray(resp?.data) ? resp.data : [];
        this.documentTypes.set(types);
        if (!this.selectedDocumentTypeId() && types.length > 0) {
          this.selectedDocumentTypeId.set(types[0].id);
        }
      },
      error: (error) => {
        console.error("Error loading document types:", error);
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
  getLineItemsCount() {
    return this.order()?.line_items?.length ?? 0;
  }
  getDocumentsCount() {
    return this.order()?.documents?.length ?? 0;
  }
  getBatchesCount() {
    return this.order()?.batches?.length ?? 0;
  }
  getPaymentsCount() {
    return this.order()?.payments?.length ?? 0;
  }
  getStatusBadgeClass() {
    const status = (this.order()?.general_status ?? this.order()?.status ?? "").toString();
    if (status === "Recibida")
      return "status-badge--success";
    if (status === "En Proceso")
      return "status-badge--warning";
    if (status === "Creada")
      return "status-badge--info";
    if (status === "Cancelada")
      return "status-badge--danger";
    return "status-badge--neutral";
  }
  getFiscalDisplayName() {
    const fiscal = this.order()?.fiscal_configuration;
    return fiscal?.razon_social || fiscal?.business_name || "N/A";
  }
  canOpenVendor() {
    return !!(this.order()?.vendor_id || this.order()?.vendor?.id);
  }
  canOpenWarehouse() {
    return !!(this.order()?.warehouse_id || this.order()?.warehouse?.id);
  }
  canOpenFiscal() {
    return !!(this.order()?.fiscal_configuration_id || this.order()?.fiscal_configuration?.id);
  }
  openVendorDialog() {
    const vendorId = this.order()?.vendor?.id ?? this.order()?.vendor_id;
    if (!vendorId)
      return;
    const openModal = (vendor) => {
      this.dialog.open(VendorDetailModalComponent, {
        data: { vendor },
        width: "80vw",
        maxWidth: "1000px"
      });
    };
    const embedded = this.order()?.vendor;
    this.vendorService.getVendor(String(vendorId)).subscribe({
      next: (vendor) => openModal(vendor),
      error: () => {
        if (embedded) {
          openModal(__spreadProps(__spreadValues({}, embedded), { id: String(vendorId) }));
        }
      }
    });
  }
  openWarehouseDialog() {
    const warehouseId = this.order()?.warehouse?.id ?? this.order()?.warehouse_id;
    if (!warehouseId)
      return;
    const openModal = (warehouse) => {
      this.dialog.open(WarehouseDetailModalComponent, {
        data: { warehouse },
        width: "80vw",
        maxWidth: "1000px"
      });
    };
    const embedded = this.order()?.warehouse;
    this.warehouseService.getWarehouse(warehouseId).subscribe({
      next: (warehouse) => openModal(warehouse),
      error: () => {
        if (embedded) {
          openModal({ id: warehouseId, name: embedded.name });
        }
      }
    });
  }
  openFiscalDialog() {
    const fiscalId = this.order()?.fiscal_configuration?.id ?? this.order()?.fiscal_configuration_id;
    if (!fiscalId)
      return;
    const openModal = (fiscalConfig) => {
      this.dialog.open(FiscalConfigurationModalComponent, {
        data: { fiscalConfig },
        width: "80vw",
        maxWidth: "1000px"
      });
    };
    const embedded = this.order()?.fiscal_configuration;
    if (embedded?.rfc && embedded?.razon_social) {
      openModal(embedded);
      return;
    }
    this.fiscalConfigService.getFiscalConfiguration(fiscalId).subscribe({
      next: (fiscalConfig) => openModal(fiscalConfig),
      error: () => {
        if (embedded) {
          openModal(__spreadProps(__spreadValues({}, embedded), { id: fiscalId }));
        }
      }
    });
  }
  static \u0275fac = function OrderDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(TaxCalculatorService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(VendorService), \u0275\u0275directiveInject(WarehouseService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderDetailDialogComponent, selectors: [["app-order-detail-dialog"]], hostAttrs: [1, "order-detail-dialog-container"], decls: 5, vars: 4, consts: [["uploadDocumentFileInput", ""], [1, "order-detail-dialog"], [1, "loading-container"], [1, "upload-modal-overlay"], [1, "text-gray-500"], [1, "dialog-header"], [1, "dialog-header-main"], [1, "order-type-badge"], [1, "dialog-header__folio"], ["type", "button", 1, "edit-header-btn"], [1, "dialog-header-actions"], [1, "status-badge", 3, "ngClass"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], [1, "fi", "fi-rr-cross-small"], [1, "dialog-content"], [1, "sidebar"], [1, "info-cards-group"], [1, "info-card", "info-card--blue"], [1, "info-card__icon"], [1, "fi", "fi-rr-user"], [1, "info-card__content"], [1, "info-card__label"], [1, "info-card__value"], ["role", "button", 1, "info-card", "info-card--green", 3, "click", "keydown.enter", "keydown.space"], [1, "fi", "fi-rr-truck-side"], [1, "fi", "fi-rr-angle-right", "info-card__chevron"], ["role", "button", 1, "info-card", "info-card--yellow", 3, "click", "keydown.enter", "keydown.space"], [1, "fi", "fi-rr-box"], ["role", "button", 1, "info-card", "info-card--purple", 3, "click", "keydown.enter", "keydown.space"], [1, "fi", "fi-rr-document"], [1, "section-card"], [1, "section-title"], [1, "section-item"], [1, "section-label"], [1, "section-value"], [1, "payment-pill"], [1, "section-card", "section-card--totals"], [1, "section-header"], [1, "toggle-container"], ["type", "button", 1, "toggle-btn", 3, "click"], [1, "totals-card"], [1, "totals-row"], [1, "totals-label"], [1, "totals-value"], [1, "totals-divider"], [1, "totals-row", "totals-row-total"], [1, "totals-label-total"], [1, "totals-value-total", 3, "ngClass"], [1, "section-card", "section-card--notes"], [1, "section-card__head"], ["type", "button", "title", "Editar notas", 1, "notes-edit-btn"], [1, "fi", "fi-rr-pencil"], [1, "notes-text"], [1, "action-buttons"], [1, "btn-receive"], [1, "btn-cancel"], [1, "main-content"], [1, "main-content__chrome"], ["aria-label", "Secciones de la orden", 1, "tabs-header"], ["type", "button", 1, "tab-button", 3, "click"], [1, "tab-count"], [1, "tabs-content"], [1, "tab-content-wrapper"], ["type", "button", 1, "edit-header-btn", 3, "click"], [1, "btn-receive", 3, "click"], [1, "fi", "fi-rr-gift"], [1, "btn-cancel", 3, "click"], [1, "fi", "fi-rr-cross-circle"], [1, "products-table"], [1, "product-info"], ["colspan", "5", 1, "text-center"], [1, "empty-state"], [1, "tab-header"], [1, "btn-secondary", 3, "click", "disabled"], [1, "fi", "fi-rr-spinner", "animate-spin"], [1, "fi", "fi-rr-refresh"], [1, "btn-secondary", 3, "disabled"], [1, "btn-primary", 3, "click"], [1, "fi", "fi-rr-upload"], [1, "documents-table"], [1, "document-type-cell"], [1, "document-badge", 3, "ngClass"], [1, "document-language-badge"], [1, "document-language-empty"], [1, "document-name"], [1, "document-date"], [1, "document-actions"], ["title", "Descargar", 1, "action-btn", "download-btn", 3, "click"], [1, "fi", "fi-rr-download"], ["title", "Eliminar", 1, "action-btn", "delete-btn", 3, "click"], [1, "fi", "fi-rr-trash"], [1, "inline-flex", "items-center", "px-3", "py-1", "rounded", "text-xs", "font-semibold", "bg-blue-100", "text-blue-700", "cursor-pointer", "hover:bg-blue-200", "transition-colors", 3, "click"], [1, "fi", "fi-rr-layers"], [1, "btn-primary"], [1, "payments-summary-card"], [1, "payments-summary-grid"], [1, "payments-summary-row"], [1, "payments-summary-value"], [1, "payments-summary-value", "text-green-600"], [1, "payments-summary-value", "text-amber-600"], [1, "payments-status-badge", 3, "ngClass"], [1, "payments-progress-track"], [1, "payments-progress-fill"], [1, "payments-table"], [1, "fi", "fi-rr-credit-card"], [1, "font-semibold"], [1, "upload-modal-overlay", 3, "click"], [1, "regenerate-modal", 3, "click"], [1, "regenerate-modal__header"], ["type", "button", 1, "regenerate-modal__close", 3, "click", "disabled"], [1, "regenerate-modal__body"], [1, "regenerate-language-prompt"], [1, "language-options"], [1, "language-option"], ["type", "radio", "name", "regenerateLanguage", "value", "es", 3, "change", "checked", "disabled"], ["type", "radio", "name", "regenerateLanguage", "value", "en", 3, "change", "checked", "disabled"], [1, "regenerate-keep-previous"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "regenerate-modal__footer"], ["type", "button", 1, "regenerate-modal__btn", "regenerate-modal__btn--cancel", 3, "click", "disabled"], ["type", "button", 1, "regenerate-modal__btn", "regenerate-modal__btn--confirm", 3, "click"], [1, "upload-modal", 3, "click"], [1, "upload-modal__header"], ["type", "button", 1, "upload-modal__close", 3, "click"], [1, "upload-modal__body"], [1, "upload-field"], [1, "upload-input", 3, "ngModelChange", "ngModel"], [3, "ngValue"], ["type", "file", "accept", ".pdf,.xml,.jpeg,.jpg,.png", 1, "hidden-file-input", 3, "change"], ["type", "button", 1, "upload-file-button", 3, "click"], [1, "fi", "fi-rr-folder"], ["rows", "3", "placeholder", "Notas adicionales (opcional)", 1, "upload-textarea", 3, "ngModelChange", "ngModel"], [1, "upload-modal__footer"], ["type", "button", 1, "upload-cancel-btn", 3, "click"], ["type", "button", 1, "upload-submit-btn", 3, "click", "disabled"]], template: function OrderDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, OrderDetailDialogComponent_Conditional_1_Template, 3, 0, "div", 2);
      \u0275\u0275conditionalCreate(2, OrderDetailDialogComponent_Conditional_2_Template, 129, 61);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, OrderDetailDialogComponent_Conditional_3_Template, 29, 15, "div", 3);
      \u0275\u0275conditionalCreate(4, OrderDetailDialogComponent_Conditional_4_Template, 40, 6, "div", 3);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.order() && !ctx.loading() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showRegenerateLanguageModal() ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showUploadDocumentModal() ? 4 : -1);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, MatDialogModule, DatePipe, RemoveTrailingZerosPipe], styles: ["\n\n.sidebar[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  padding: 0.75rem;\n  overflow-y: auto;\n  border-right: 1px solid #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.info-cards-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  padding: 0.625rem 0.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid transparent;\n}\n.info-card--blue[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  border-color: #dbeafe;\n}\n.info-card--blue[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--green[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  border-color: #bbf7d0;\n}\n.info-card--green[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #bbf7d0;\n  color: #16a34a;\n}\n.info-card--yellow[_ngcontent-%COMP%] {\n  background: #fefce8;\n  border-color: #fef08a;\n}\n.info-card--yellow[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #fde68a;\n  color: #d97706;\n}\n.info-card--purple[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  border-color: #e9d5ff;\n}\n.info-card--purple[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: box-shadow 0.15s, transform 0.15s;\n}\n.info-card--clickable[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);\n}\n.info-card__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #94a3b8;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n}\n.info-card__icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n}\n.info-card__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n  flex: 1;\n}\n.info-card__label[_ngcontent-%COMP%] {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #94a3b8;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.info-card__value[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.25;\n  word-break: break-word;\n}\n.section-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.75rem;\n}\n.section-card--notes[_ngcontent-%COMP%]   .section-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.25rem;\n}\n.section-card[_ngcontent-%COMP%]   .notes-edit-btn[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 0.25rem;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.section-card[_ngcontent-%COMP%]   .notes-edit-btn[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n  color: #334155;\n}\n.section-card--totals[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.section-card--notes[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin-bottom: 0.375rem;\n}\n.section-card[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #64748b;\n  letter-spacing: 0.08em;\n  margin: 0 0 0.375rem;\n  text-transform: uppercase;\n}\n.section-card--totals[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.section-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.75rem;\n  padding: 0.3rem 0;\n  border-bottom: 1px solid #f1f5f9;\n}\n.section-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.section-label[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 0.75rem;\n}\n.section-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n  text-align: right;\n  font-size: 0.75rem;\n}\n.payment-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.15rem 0.45rem;\n  border-radius: 9999px;\n  font-size: 0.625rem;\n  font-weight: 700;\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.payment-pill--paid[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.375rem;\n}\n.notes-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  color: #475569;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.toggle-container[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.125rem;\n  background: #f1f5f9;\n  padding: 0.125rem;\n  border-radius: 0.375rem;\n  border: 1px solid #e2e8f0;\n  flex-shrink: 0;\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%] {\n  padding: 0.2rem 0.45rem;\n  border: 1px solid transparent;\n  background: transparent;\n  color: #64748b;\n  font-size: 0.5625rem;\n  font-weight: 700;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn.active[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #2563eb;\n  border-color: #bfdbfe;\n}\n.totals-card[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.625rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.75rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-label[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #e2e8f0;\n  margin: 0.1rem 0;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%]   .totals-label-total[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%]   .totals-value-total[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 800;\n}\n.order-detail-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  max-height: 96dvh;\n  margin: 0 auto;\n  background: #f8fafc;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%], \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%], \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(15, 23, 42, 0.22) transparent;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-track, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(15, 23, 42, 0.2);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(15, 23, 42, 0.32);\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-corner, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-corner, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.875rem;\n  min-height: 2.75rem;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  flex-shrink: 0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  flex-shrink: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header__folio[_ngcontent-%COMP%], \n.dialog-header[_ngcontent-%COMP%]   h2.dialog-header__folio[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.0625rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: #0f172a;\n  line-height: 1.25;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 0.375rem;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n  flex-shrink: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #0f172a;\n}\n.order-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n  background: #dbeafe;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.edit-header-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.edit-header-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n}\n.edit-header-btn[_ngcontent-%COMP%]:hover {\n  background: #dbeafe;\n  border-color: #93c5fd;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  line-height: 1.2;\n  white-space: nowrap;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n@media (max-width: 991px) {\n  .dialog-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n}\n.dialog-content[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  width: min(24rem, 32vw);\n  min-width: 20rem;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .dialog-content[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 0;\n    max-height: none;\n    border-right: none !important;\n    border-bottom: 1px solid #e5e7eb;\n  }\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.tabs-header[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .tabs-header[_ngcontent-%COMP%] {\n    padding: 0 0.75rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-button[_ngcontent-%COMP%] {\n    padding: 0.625rem 0.875rem;\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-content-wrapper[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .products-table[_ngcontent-%COMP%] {\n    display: block;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background: #f8fafc;\n  color: #64748b;\n}\n.status-badge--success[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n  border: 1px solid #bbf7d0;\n}\n.status-badge--warning[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #b45309;\n  border: 1px solid #fde68a;\n}\n.status-badge--info[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.status-badge--danger[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.status-badge--neutral[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: auto;\n  padding-top: 0.75rem;\n  border-top: 1px solid #e2e8f0;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.6rem 1rem;\n  border: none;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-receive[_ngcontent-%COMP%] {\n  background: #10b981;\n  color: white;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-receive[_ngcontent-%COMP%]:hover {\n  background: #059669;\n  transform: translateY(-1px);\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: #fecaca;\n  color: #dc2626;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #fca5a5;\n  transform: translateY(-1px);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #f8fafc;\n  min-width: 0;\n}\n.main-content__chrome[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.tabs-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.125rem;\n  padding: 0 1.25rem;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(15, 23, 42, 0.22) transparent;\n}\n.tabs-header[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.tabs-header[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.tabs-header[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(15, 23, 42, 0.2);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n.tabs-header[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(15, 23, 42, 0.32);\n}\n.tabs-header[_ngcontent-%COMP%]::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.tabs-header[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 4px;\n}\n.tab-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.875rem 1rem;\n  border: none;\n  background: transparent;\n  color: #64748b;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  border-bottom: 3px solid transparent;\n  transition:\n    color 0.2s,\n    border-color 0.2s,\n    background-color 0.2s;\n  white-space: nowrap;\n  border-radius: 0.375rem 0.375rem 0 0;\n}\n.tab-button[_ngcontent-%COMP%]:hover {\n  color: #334155;\n  background: #f8fafc;\n}\n.tab-button.active[_ngcontent-%COMP%] {\n  color: #2563eb;\n  border-bottom-color: #2563eb;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(37, 99, 235, 0.05) 0%,\n      transparent 100%);\n}\n.tab-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 1.25rem;\n  height: 1.25rem;\n  padding: 0 0.35rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  background: #e2e8f0;\n  color: #64748b;\n}\n.tab-count.active[_ngcontent-%COMP%] {\n  background: #7c3aed;\n  color: #fff;\n}\n.tabs-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  background: #f8fafc;\n}\n.detail-tabs[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-nav {\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1.5rem;\n  margin: 0;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-nav-link {\n  padding: 1rem 1.5rem;\n  font-weight: 500;\n  color: #6b7280;\n  border: none;\n  background: transparent;\n  border-bottom: 2px solid transparent;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-nav-link:hover {\n  color: #1f2937;\n  background: transparent;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-nav-link:focus {\n  box-shadow: none;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-highlight .p-tabview-nav-link {\n  color: #3b82f6;\n  border-bottom: 2px solid #3b82f6;\n  background: transparent;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-panels {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n  padding: 0;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-panel {\n  height: 100%;\n}\n.tab-content-wrapper[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem 1.5rem;\n  height: 100%;\n  overflow-y: auto;\n}\n.tab-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  border: none;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: #fff;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1d4ed8;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);\n}\n.hidden-file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.upload-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(17, 24, 39, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  padding: 1rem;\n}\n.upload-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 660px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n}\n.upload-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.upload-modal__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.upload-modal__close[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n}\n.upload-modal__close[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #111827;\n}\n.upload-modal__body[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem 0.5rem;\n}\n.upload-field[_ngcontent-%COMP%] {\n  margin-bottom: 0.9rem;\n}\n.upload-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #4b5563;\n  margin-bottom: 0.35rem;\n}\n.upload-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.upload-field[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.3rem;\n  color: #6b7280;\n  font-size: 0.72rem;\n}\n.upload-input[_ngcontent-%COMP%], \n.upload-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  padding: 0.62rem 0.72rem;\n  font-size: 0.86rem;\n  color: #1f2937;\n  background: #fff;\n}\n.upload-input[_ngcontent-%COMP%]:focus, \n.upload-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.upload-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.upload-file-button[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #3b82f6;\n  border-radius: 8px;\n  background: #fff;\n  color: #2563eb;\n  font-weight: 700;\n  font-size: 0.9rem;\n  padding: 0.62rem 0.75rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  cursor: pointer;\n}\n.upload-file-button[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n}\n.upload-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.8rem;\n  padding: 0.9rem 1.25rem 1.2rem;\n}\n.upload-cancel-btn[_ngcontent-%COMP%], \n.upload-submit-btn[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 700;\n  padding: 0.65rem 1.15rem;\n  cursor: pointer;\n}\n.upload-cancel-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #2563eb;\n}\n.upload-submit-btn[_ngcontent-%COMP%] {\n  background: #6fd9a0;\n  color: #fff;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.upload-submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 3rem;\n  color: #9ca3af;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 3rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.products-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  color: #64748b;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  text-align: left;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f1f5f9;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.875rem 1rem;\n  color: #0f172a;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1f2937;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.documents-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.documents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.documents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #1f2937;\n}\n.payments-summary-card[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  background: #fff;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.payments-summary-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  margin-bottom: 0.75rem;\n}\n.payments-summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: #374151;\n}\n.payments-summary-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  line-height: 1.2;\n  color: #111827;\n  font-weight: 700;\n}\n.payments-summary-row[_ngcontent-%COMP%]   .payments-summary-value[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n}\n.payments-summary-row[_ngcontent-%COMP%]   .payments-status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  background: #f3f4f6;\n  color: #374151;\n}\n.payments-summary-row[_ngcontent-%COMP%]   .payments-status-badge.status-paid[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.payments-summary-row[_ngcontent-%COMP%]   .payments-status-badge.status-partial[_ngcontent-%COMP%] {\n  background: #fef3c7;\n  color: #92400e;\n}\n.payments-summary-row[_ngcontent-%COMP%]   .payments-status-badge.status-pending[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n.payments-progress-track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 14px;\n  border-radius: 9999px;\n  background: #e5e7eb;\n  overflow: hidden;\n}\n.payments-progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6 0%,\n      #2563eb 100%);\n  transition: width 0.25s ease;\n}\n.payments-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.payments-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.payments-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #1f2937;\n}\n.document-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.document-badge.badge-blue[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-badge.badge-green[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.document-badge.badge-gray[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.document-type-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.document-language-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-width: 2rem;\n  padding: 0.2rem 0.45rem;\n  border-radius: 4px;\n  background: #f3f4f6;\n  color: #374151;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-align: center;\n}\n.document-language-empty[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.85rem;\n}\n.regenerate-language-prompt[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.regenerate-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n}\n.regenerate-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.regenerate-modal__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.regenerate-modal__close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n}\n.regenerate-modal__close[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #111827;\n}\n.regenerate-modal__close[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__body[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem 0.25rem;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: border-color 0.2s, background 0.2s;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin: 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #1f2937;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]:hover:not(:has(input:disabled)) {\n  border-color: #93c5fd;\n  background: #f8fafc;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: #eff6ff;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n  cursor: pointer;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #374151;\n  line-height: 1.4;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]:has(input:disabled) {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.regenerate-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem 1rem;\n}\n.regenerate-modal__btn[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45rem 0.85rem;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  line-height: 1.2;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #2563eb;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: #fff;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%]:hover:not(.is-loading) {\n  background: #16a34a;\n}\n.regenerate-modal__btn--confirm.is-loading[_ngcontent-%COMP%] {\n  cursor: wait;\n  pointer-events: none;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.document-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #1f2937;\n  word-break: break-word;\n}\n.document-date[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.document-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 0.9rem;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.download-btn[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.download-btn[_ngcontent-%COMP%]:hover {\n  background: #bfdbfe;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.delete-btn[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.delete-btn[_ngcontent-%COMP%]:hover {\n  background: #fecaca;\n}\n/*# sourceMappingURL=order-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-order-detail-dialog", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      RemoveTrailingZerosPipe
    ], schemas: [CUSTOM_ELEMENTS_SCHEMA], host: {
      "class": "order-detail-dialog-container"
    }, template: `<div class="order-detail-dialog">
  @if (loading()) {
    <div class="loading-container">
      <p class="text-gray-500">Cargando orden...</p>
    </div>
  }

  @if (order() && !loading()) {
    <div class="dialog-header">
      <div class="dialog-header-main">
        <span class="order-type-badge">COMPRA</span>
        <h2 class="dialog-header__folio">#{{ order()!.folio || order()!.id.substring(0, 6) }}</h2>
        @if (canEditOrder()) {
          <button type="button" class="edit-header-btn" (click)="goToEditForm()">
            <i class="fi fi-rr-pencil"></i>
            Editar encabezado
          </button>
        }
      </div>
      <div class="dialog-header-actions">
        <span class="status-badge" [ngClass]="getStatusBadgeClass()">
          {{ order()!.general_status || order()!.status }}
        </span>
        <button type="button" class="close-btn" (click)="close()" aria-label="Cerrar">
          <i class="fi fi-rr-cross-small"></i>
        </button>
      </div>
    </div>

    <!-- Sidebar and Content Layout -->
    <div class="dialog-content">
      <!-- Left Sidebar -->
      <div class="sidebar">
        <!-- Info Cards -->
        <!-- Info Cards Container -->
        <div class="info-cards-group">
          <div class="info-card info-card--blue">
            <div class="info-card__icon">
              <i class="fi fi-rr-user"></i>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">CREADO POR</span>
              <span class="info-card__value">{{ order()!.creator?.first_name }} {{ order()!.creator?.last_name || 'N/A' }}</span>
            </div>
          </div>

          <div
            class="info-card info-card--green"
            [class.info-card--clickable]="canOpenVendor()"
            role="button"
            [attr.tabindex]="canOpenVendor() ? 0 : null"
            (click)="canOpenVendor() && openVendorDialog()"
            (keydown.enter)="canOpenVendor() && openVendorDialog()"
            (keydown.space)="$event.preventDefault(); canOpenVendor() && openVendorDialog()">
            <div class="info-card__icon">
              <i class="fi fi-rr-truck-side"></i>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">PROVEEDOR</span>
              <span class="info-card__value">{{ order()!.vendor?.name || 'N/A' }}</span>
            </div>
            @if (canOpenVendor()) {
              <i class="fi fi-rr-angle-right info-card__chevron"></i>
            }
          </div>

          <div
            class="info-card info-card--yellow"
            [class.info-card--clickable]="canOpenWarehouse()"
            role="button"
            [attr.tabindex]="canOpenWarehouse() ? 0 : null"
            (click)="canOpenWarehouse() && openWarehouseDialog()"
            (keydown.enter)="canOpenWarehouse() && openWarehouseDialog()"
            (keydown.space)="$event.preventDefault(); canOpenWarehouse() && openWarehouseDialog()">
            <div class="info-card__icon">
              <i class="fi fi-rr-box"></i>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">PARA ALMAC\xC9N</span>
              <span class="info-card__value">{{ order()!.warehouse?.name || 'N/A' }}</span>
            </div>
            @if (canOpenWarehouse()) {
              <i class="fi fi-rr-angle-right info-card__chevron"></i>
            }
          </div>

          <div
            class="info-card info-card--purple"
            [class.info-card--clickable]="canOpenFiscal()"
            role="button"
            [attr.tabindex]="canOpenFiscal() ? 0 : null"
            (click)="canOpenFiscal() && openFiscalDialog()"
            (keydown.enter)="canOpenFiscal() && openFiscalDialog()"
            (keydown.space)="$event.preventDefault(); canOpenFiscal() && openFiscalDialog()">
            <div class="info-card__icon">
              <i class="fi fi-rr-document"></i>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">RAZ\xD3N SOCIAL</span>
              <span class="info-card__value">{{ getFiscalDisplayName() }}</span>
            </div>
            @if (canOpenFiscal()) {
              <i class="fi fi-rr-angle-right info-card__chevron"></i>
            }
          </div>
        </div>

        <div class="section-card">
          <h3 class="section-title">FECHAS</h3>
          <div class="section-item">
            <span class="section-label">Fecha esperada</span>
            <span class="section-value">{{ formatShortDate(order()!.expected_delivery_date || order()!.tentative_receipt_date) }}</span>
          </div>
          <div class="section-item">
            <span class="section-label">Estado de pago</span>
            <span class="payment-pill" [class.payment-pill--paid]="order()!.payment_status !== 'Pendiente'">
              {{ order()!.payment_status }}
            </span>
          </div>
        </div>

        <div class="section-card section-card--totals">
          <div class="section-header">
            <h3 class="section-title">TOTALES</h3>
            <div class="toggle-container">
              <button
                type="button"
                class="toggle-btn"
                [class.active]="!showReceivedTotals()"
                (click)="toggleTotals(false)">
                Solicitados
              </button>
              <button
                type="button"
                class="toggle-btn"
                [class.active]="showReceivedTotals()"
                (click)="toggleTotals(true)">
                Recibidos
              </button>
            </div>
          </div>

          <div class="totals-card">
            <div class="totals-row">
              <span class="totals-label">Subtotal</span>
              <span class="totals-value">{{ getSubtotal() }}</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">IVA</span>
              <span class="totals-value">{{ getIVA() }}</span>
            </div>
            <div class="totals-row">
              <span class="totals-label">IEPS</span>
              <span class="totals-value">{{ getIEPS() }}</span>
            </div>
            <div class="totals-divider"></div>
            <div class="totals-row totals-row-total">
              <span class="totals-label-total">Total</span>
              <span class="totals-value-total" [ngClass]="getTotalColor()">{{ getTotal() }}</span>
            </div>
          </div>
        </div>

        <div class="section-card section-card--notes">
          <div class="section-card__head">
            <h3 class="section-title">NOTAS</h3>
            <button type="button" class="notes-edit-btn" title="Editar notas">
              <i class="fi fi-rr-pencil"></i>
            </button>
          </div>
          <p class="notes-text">{{ order()!.notes || 'Sin notas' }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          @if (canReceive()) {
            <button class="btn-receive" (click)="initiateReceipt()">
              <i class="fi fi-rr-gift"></i>
              Iniciar Recibo
            </button>
          }
          @if (canCancel()) {
            <button class="btn-cancel" (click)="cancelOrder()">
              <i class="fi fi-rr-cross-circle"></i>
              Cancelar requisici\xF3n
            </button>
          }
        </div>
      </div>

      <div class="main-content">
        <div class="main-content__chrome">
          <nav class="tabs-header" aria-label="Secciones de la orden">
            <button
              type="button"
              class="tab-button"
              [class.active]="activeTabIndex() === 0"
              (click)="activeTabIndex.set(0)">
              Productos
              <span class="tab-count" [class.active]="activeTabIndex() === 0">{{ getLineItemsCount() }}</span>
            </button>
            <button
              type="button"
              class="tab-button"
              [class.active]="activeTabIndex() === 1"
              (click)="activeTabIndex.set(1)">
              Documentos
              <span class="tab-count" [class.active]="activeTabIndex() === 1">{{ getDocumentsCount() }}</span>
            </button>
            <button
              type="button"
              class="tab-button"
              [class.active]="activeTabIndex() === 2"
              (click)="activeTabIndex.set(2)">
              Lotes
              <span class="tab-count" [class.active]="activeTabIndex() === 2">{{ getBatchesCount() }}</span>
            </button>
            <button
              type="button"
              class="tab-button"
              [class.active]="activeTabIndex() === 3"
              (click)="activeTabIndex.set(3)">
              Pagos
              <span class="tab-count" [class.active]="activeTabIndex() === 3">{{ getPaymentsCount() }}</span>
            </button>
          </nav>
        </div>

        <div class="tabs-content">
          <!-- Productos Tab -->
          @if (activeTabIndex() === 0) {
            <div class="tab-content-wrapper">
              <table class="products-table">
                <thead>
                  <tr>
                    <th>PRODUCTO</th>
                    <th>COSTO UNIT.</th>
                    <th>IMPORTE L\xCDNEA</th>
                    <th>SOLICITADAS</th>
                    <th>RECIBIDAS</th>
                  </tr>
                </thead>
                <tbody>
                  @if (order()!.line_items && order()!.line_items.length > 0) {
                    @for (item of order()!.line_items; track item.id) {
                      <tr>
                        <td>
                          <div class="product-info">
                            <strong>{{ item.product?.name || 'N/A' }}</strong>
                            <small>{{ item.product?.sku || '' }}</small>
                          </div>
                        </td>
                        <td>{{ formatCurrency(parseNumber(item.unit_total ?? item.unit_price ?? 0)) }}</td>
                        <td>{{ formatCurrency(parseNumber(item.unit_total ?? item.unit_price ?? 0) * parseNumber(item.quantity)) }}</td>
                        <td>{{ item.quantity | removeTrailingZeros }} {{ item.uom?.name || item.product_uom?.uom?.name || 'Unidad' }}</td>
                        <td>{{ item.received_original_quantity | removeTrailingZeros }} {{ item.received_uom?.name || '-' }}</td>
                      </tr>
                    }
                  } @else {
                    <tr>
                      <td colspan="5" class="text-center">
                        <div class="empty-state">
                          <i class="fi fi-rr-box"></i>
                          <p>No hay productos</p>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }

          <!-- Documentos Tab -->
          @if (activeTabIndex() === 1) {
            <div class="tab-content-wrapper">
              <div class="tab-header">
                <button class="btn-secondary" (click)="regeneratePDF()" [disabled]="regeneratingPDF()">
                  @if (regeneratingPDF()) {
                    <i class="fi fi-rr-spinner animate-spin"></i>
                  } @else {
                    <i class="fi fi-rr-refresh"></i>
                  }
                  Regenerar PDF Original
                </button>
                @if (order()!.general_status === 'Recibida') {
                  <button class="btn-secondary" (click)="regenerateReceivingPDF()" [disabled]="regeneratingReceipt()">
                    @if (regeneratingReceipt()) {
                      <i class="fi fi-rr-spinner animate-spin"></i>
                    } @else {
                      <i class="fi fi-rr-refresh"></i>
                    }
                    Regenerar PDF Recibo
                  </button>
                }
                <button
                  class="btn-primary"
                  (click)="openUploadDocumentModal()"
                >
                  <i class="fi fi-rr-upload"></i>
                  Subir Documento
                </button>
              </div>

              @if (hasDocuments()) {
                <table class="documents-table">
                  <thead>
                    <tr>
                      <th>TIPO</th>
                      <th>IDIOMA</th>
                      <th>NOMBRE DE ARCHIVO</th>
                      <th>FECHA DE CARGA</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (doc of order()!.documents; track doc.id) {
                      <tr>
                        <td>
                          <div class="document-type-cell">
                            <span class="document-badge" [ngClass]="getDocumentBadgeClass(doc.document_type_name)">
                              {{ doc.document_type_name }}
                            </span>
                          </div>
                        </td>
                        <td>
                          @if (getDocumentLanguageLabel(doc.document_language); as langLabel) {
                            <span class="document-language-badge">{{ langLabel }}</span>
                          } @else {
                            <span class="document-language-empty">\u2014</span>
                          }
                        </td>
                        <td>
                          <span class="document-name">{{ doc.document_name }}</span>
                        </td>
                        <td>
                          <span class="document-date">{{ formatDocumentDate(doc.uploaded_at) }}</span>
                        </td>
                        <td>
                          <div class="document-actions">
                            <button class="action-btn download-btn" (click)="downloadDocument(doc)" title="Descargar">
                              <i class="fi fi-rr-download"></i>
                            </button>
                            <button class="action-btn delete-btn" (click)="deleteDocument(doc)" title="Eliminar">
                              <i class="fi fi-rr-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              } @else {
                <div class="empty-state">
                  <i class="fi fi-rr-document"></i>
                  <p>No hay documentos adjuntos</p>
                </div>
              }
            </div>
          }

          <!-- Lotes Tab -->
          @if (activeTabIndex() === 2) {
            <div class="tab-content-wrapper">
              @if (order()?.batches && order()!.batches.length > 0) {
                <table class="products-table">
                  <thead>
                    <tr>
                      <th>LOTE</th>
                      <th>PRODUCTO</th>
                      <th>CANTIDAD</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (batch of order()!.batches; track batch.id) {
                      <tr>
                        <td>
                          <span 
                            class="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition-colors"
                            (click)="openBatchDetail(batch)">
                            {{ batch.batch_number }}
                          </span>
                        </td>
                        <td>
                          <div class="product-info">
                            <strong>{{ batch.product?.name || 'N/A' }}</strong>
                            <small>{{ batch.product?.sku || '' }}</small>
                          </div>
                        </td>
                        <td>{{ batch.initial_quantity | removeTrailingZeros }} {{ batch.uom?.name || 'Unidad' }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              } @else {
                <div class="empty-state">
                  <i class="fi fi-rr-layers"></i>
                  <p>No hay lotes registrados</p>
                </div>
              }
            </div>
          }

          <!-- Pagos Tab -->
          @if (activeTabIndex() === 3) {
            <div class="tab-content-wrapper">
              <div class="tab-header">
                @if (canAddPayment()) {
                  <button class="btn-primary" (click)="registerPayment()">
                    <i class="fi fi-rr-credit-card"></i>
                    Registrar Pago
                  </button>
                }
              </div>

              <div class="payments-summary-card">
                <div class="payments-summary-grid">
                  <div class="payments-summary-row">
                    <span>Total:</span>
                    <strong class="payments-summary-value">{{ formatPaymentCurrency(getOrderTotalForPayments()) }}</strong>
                  </div>
                  <div class="payments-summary-row">
                    <span>Pagado:</span>
                    <strong class="payments-summary-value text-green-600">{{ formatPaymentCurrency(getPaidAmount()) }}</strong>
                  </div>
                  <div class="payments-summary-row">
                    <span>Pendiente:</span>
                    <strong class="payments-summary-value text-amber-600">{{ formatPaymentCurrency(getRemainingAmount()) }}</strong>
                  </div>
                  <div class="payments-summary-row">
                    <span>Estatus:</span>
                    <span class="payments-status-badge" [ngClass]="getPaymentStatusClass()">{{ getPaymentStatus() }}</span>
                  </div>
                </div>
                <div class="payments-progress-track">
                  <div class="payments-progress-fill" [style.width.%]="getPaidPercent()"></div>
                </div>
              </div>

              @if (order()!.payments && order()!.payments.length > 0) {
                <table class="payments-table">
                  <thead>
                    <tr>
                      <th>MONTO</th>
                      <th>FECHA DE PAGO</th>
                      <th>M\xC9TODO</th>
                      <th>REFERENCIA</th>
                      <th>NOTAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (payment of order()!.payments; track payment.id) {
                      <tr>
                        <td class="font-semibold">{{ formatPaymentCurrency(payment.amount) }}</td>
                        <td>{{ payment.payment_date | date:'dd/MM/yyyy' }}</td>
                        <td>{{ payment.payment_method || '-' }}</td>
                        <td>{{ payment.reference_number || payment.reference || '-' }}</td>
                        <td>{{ payment.notes || '-' }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              } @else {
                <div class="empty-state">
                  <i class="fi fi-rr-credit-card"></i>
                  <p>No hay pagos registrados</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  }
</div>

@if (showRegenerateLanguageModal()) {
  <div class="upload-modal-overlay" (click)="closeRegenerateLanguageModal()">
    <div class="regenerate-modal" (click)="$event.stopPropagation()">
      <div class="regenerate-modal__header">
        <h3>Regenerar documento</h3>
        <button
          type="button"
          class="regenerate-modal__close"
          (click)="closeRegenerateLanguageModal()"
          [disabled]="isRegeneratingDocument()"
        >
          <i class="fi fi-rr-cross-small"></i>
        </button>
      </div>

      <div class="regenerate-modal__body">
        <p class="regenerate-language-prompt">\xBFEn qu\xE9 idioma desea generar el documento?</p>
        <div class="language-options">
          <label class="language-option" [class.selected]="selectedRegenerateLanguage() === 'es'">
            <input
              type="radio"
              name="regenerateLanguage"
              value="es"
              [checked]="selectedRegenerateLanguage() === 'es'"
              (change)="selectedRegenerateLanguage.set('es')"
              [disabled]="isRegeneratingDocument()"
            />
            <span>Espa\xF1ol (es)</span>
          </label>
          <label class="language-option" [class.selected]="selectedRegenerateLanguage() === 'en'">
            <input
              type="radio"
              name="regenerateLanguage"
              value="en"
              [checked]="selectedRegenerateLanguage() === 'en'"
              (change)="selectedRegenerateLanguage.set('en')"
              [disabled]="isRegeneratingDocument()"
            />
            <span>English (en)</span>
          </label>
        </div>
        <label class="regenerate-keep-previous">
          <input
            type="checkbox"
            [checked]="keepPreviousDocument()"
            (change)="keepPreviousDocument.set($any($event.target).checked)"
            [disabled]="isRegeneratingDocument()"
          />
          <span>Mantener documento anterior</span>
        </label>
      </div>

      <div class="regenerate-modal__footer">
        <button
          type="button"
          class="regenerate-modal__btn regenerate-modal__btn--cancel"
          (click)="closeRegenerateLanguageModal()"
          [disabled]="isRegeneratingDocument()"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="regenerate-modal__btn regenerate-modal__btn--confirm"
          [class.is-loading]="isRegeneratingDocument()"
          (click)="confirmRegenerateDocument()"
        >
          @if (isRegeneratingDocument()) {
            <i class="fi fi-rr-spinner animate-spin"></i>
            Regenerando...
          } @else {
            <i class="fi fi-rr-refresh"></i>
            Regenerar
          }
        </button>
      </div>
    </div>
  </div>
}

@if (showUploadDocumentModal()) {
  <div class="upload-modal-overlay" (click)="closeUploadDocumentModal()">
    <div class="upload-modal" (click)="$event.stopPropagation()">
      <div class="upload-modal__header">
        <h3>Subir Documento</h3>
        <button type="button" class="upload-modal__close" (click)="closeUploadDocumentModal()">
          <i class="fi fi-rr-cross-small"></i>
        </button>
      </div>

      <div class="upload-modal__body">
        <div class="upload-field">
          <label>Tipo de Documento <span>*</span></label>
          <select
            class="upload-input"
            [ngModel]="selectedDocumentTypeId()"
            (ngModelChange)="selectedDocumentTypeId.set($event ? +$event : null)"
          >
            <option [ngValue]="null">Seleccionar tipo</option>
            @for (type of documentTypes(); track type.id) {
              <option [ngValue]="type.id">{{ type.name }}</option>
            }
          </select>
        </div>

        <div class="upload-field">
          <label>Archivo <span>*</span></label>
          <input
            #uploadDocumentFileInput
            type="file"
            class="hidden-file-input"
            accept=".pdf,.xml,.jpeg,.jpg,.png"
            (change)="onDocumentFileSelected($event)"
          />
          <button
            type="button"
            class="upload-file-button"
            (click)="openDocumentPicker(uploadDocumentFileInput)"
          >
            <i class="fi fi-rr-folder"></i>
            {{ selectedUploadFileName || 'Seleccionar Archivo' }}
          </button>
          <small>Formatos permitidos: PDF, XML, JPEG, JPG, PNG</small>
        </div>

        <div class="upload-field">
          <label>Notas</label>
          <textarea
            rows="3"
            class="upload-textarea"
            [ngModel]="uploadDocumentNotes"
            (ngModelChange)="uploadDocumentNotes = $event"
            placeholder="Notas adicionales (opcional)"
          ></textarea>
        </div>
      </div>

      <div class="upload-modal__footer">
        <button type="button" class="upload-cancel-btn" (click)="closeUploadDocumentModal()">
          Cancelar
        </button>
        <button
          type="button"
          class="upload-submit-btn"
          (click)="submitUploadDocument()"
          [disabled]="uploadingDocument() || !selectedDocumentTypeId() || !selectedUploadFile"
        >
          <i class="fi fi-rr-upload"></i>
          {{ uploadingDocument() ? 'Subiendo...' : 'Subir Documento' }}
        </button>
      </div>
    </div>
  </div>
}
`, styles: ["/* src/app/features/purchase-orders/components/order-detail-dialog/order-detail-dialog.component.scss */\n.sidebar {\n  background: #f1f5f9;\n  padding: 0.75rem;\n  overflow-y: auto;\n  border-right: 1px solid #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.info-cards-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.info-card {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  padding: 0.625rem 0.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid transparent;\n}\n.info-card--blue {\n  background: #eff6ff;\n  border-color: #dbeafe;\n}\n.info-card--blue .info-card__icon {\n  background: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--green {\n  background: #f0fdf4;\n  border-color: #bbf7d0;\n}\n.info-card--green .info-card__icon {\n  background: #bbf7d0;\n  color: #16a34a;\n}\n.info-card--yellow {\n  background: #fefce8;\n  border-color: #fef08a;\n}\n.info-card--yellow .info-card__icon {\n  background: #fde68a;\n  color: #d97706;\n}\n.info-card--purple {\n  background: #f5f3ff;\n  border-color: #e9d5ff;\n}\n.info-card--purple .info-card__icon {\n  background: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--clickable {\n  cursor: pointer;\n  transition: box-shadow 0.15s, transform 0.15s;\n}\n.info-card--clickable:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);\n}\n.info-card__chevron {\n  margin-left: auto;\n  color: #94a3b8;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n}\n.info-card__icon {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n}\n.info-card__content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n  flex: 1;\n}\n.info-card__label {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #94a3b8;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.info-card__value {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.25;\n  word-break: break-word;\n}\n.section-card {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.75rem;\n}\n.section-card--notes .section-card__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.25rem;\n}\n.section-card .notes-edit-btn {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 0.25rem;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.section-card .notes-edit-btn:hover {\n  background: #e2e8f0;\n  color: #334155;\n}\n.section-card--totals {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.section-card--notes .section-title {\n  margin-bottom: 0.375rem;\n}\n.section-card .section-title {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #64748b;\n  letter-spacing: 0.08em;\n  margin: 0 0 0.375rem;\n  text-transform: uppercase;\n}\n.section-card--totals .section-title {\n  margin: 0;\n}\n.section-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.75rem;\n  padding: 0.3rem 0;\n  border-bottom: 1px solid #f1f5f9;\n}\n.section-item:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.section-label {\n  color: #94a3b8;\n  font-size: 0.75rem;\n}\n.section-value {\n  font-weight: 600;\n  color: #0f172a;\n  text-align: right;\n  font-size: 0.75rem;\n}\n.payment-pill {\n  display: inline-flex;\n  padding: 0.15rem 0.45rem;\n  border-radius: 9999px;\n  font-size: 0.625rem;\n  font-weight: 700;\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.payment-pill--paid {\n  background: #dcfce7;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.375rem;\n}\n.notes-text {\n  margin: 0;\n  font-size: 0.75rem;\n  color: #475569;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.toggle-container {\n  display: inline-flex;\n  gap: 0.125rem;\n  background: #f1f5f9;\n  padding: 0.125rem;\n  border-radius: 0.375rem;\n  border: 1px solid #e2e8f0;\n  flex-shrink: 0;\n}\n.toggle-container .toggle-btn {\n  padding: 0.2rem 0.45rem;\n  border: 1px solid transparent;\n  background: transparent;\n  color: #64748b;\n  font-size: 0.5625rem;\n  font-weight: 700;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.toggle-container .toggle-btn.active {\n  background: #fff;\n  color: #2563eb;\n  border-color: #bfdbfe;\n}\n.totals-card {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.625rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.totals-card .totals-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.75rem;\n}\n.totals-card .totals-label {\n  color: #94a3b8;\n}\n.totals-card .totals-value {\n  font-weight: 600;\n  color: #0f172a;\n}\n.totals-card .totals-divider {\n  height: 1px;\n  background: #e2e8f0;\n  margin: 0.1rem 0;\n}\n.totals-card .totals-row-total .totals-label-total {\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.totals-card .totals-row-total .totals-value-total {\n  font-size: 1rem;\n  font-weight: 800;\n}\n.order-detail-dialog {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  max-height: 96dvh;\n  margin: 0 auto;\n  background: #f8fafc;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.order-detail-dialog .sidebar,\n.order-detail-dialog .tab-content-wrapper,\n.order-detail-dialog .tabs-content {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(15, 23, 42, 0.22) transparent;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar,\n.order-detail-dialog .tabs-content::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-track,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-track,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-thumb,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-thumb,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-thumb {\n  background-color: rgba(15, 23, 42, 0.2);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-thumb:hover,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-thumb:hover,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(15, 23, 42, 0.32);\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-corner,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-corner,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.875rem;\n  min-height: 2.75rem;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  flex-shrink: 0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.dialog-header .dialog-header-main {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.dialog-header .dialog-header-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  flex-shrink: 0;\n}\n.dialog-header .dialog-header__folio,\n.dialog-header h2.dialog-header__folio {\n  margin: 0;\n  font-size: 1.0625rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: #0f172a;\n  line-height: 1.25;\n}\n.dialog-header .close-btn {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 0.375rem;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n  flex-shrink: 0;\n}\n.dialog-header .close-btn:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #0f172a;\n}\n.order-type-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n  background: #dbeafe;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.edit-header-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.edit-header-btn i {\n  font-size: 0.65rem;\n}\n.edit-header-btn:hover {\n  background: #dbeafe;\n  border-color: #93c5fd;\n}\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  line-height: 1.2;\n  white-space: nowrap;\n}\n.dialog-content {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n@media (max-width: 991px) {\n  .dialog-content {\n    flex-direction: column;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n}\n.dialog-content .sidebar {\n  width: min(24rem, 32vw);\n  min-width: 20rem;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .dialog-content .sidebar {\n    width: 100%;\n    min-width: 0;\n    max-height: none;\n    border-right: none !important;\n    border-bottom: 1px solid #e5e7eb;\n  }\n}\n.main-content {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.tabs-header {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .tabs-header {\n    padding: 0 0.75rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-button {\n    padding: 0.625rem 0.875rem;\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-content-wrapper {\n    padding: 0.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .products-table {\n    display: block;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n.loading-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background: #f8fafc;\n  color: #64748b;\n}\n.status-badge--success {\n  background: #dcfce7;\n  color: #15803d;\n  border: 1px solid #bbf7d0;\n}\n.status-badge--warning {\n  background: #fef3c7;\n  color: #b45309;\n  border: 1px solid #fde68a;\n}\n.status-badge--info {\n  background: #dbeafe;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.status-badge--danger {\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.status-badge--neutral {\n  background: #f1f5f9;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.action-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-top: auto;\n  padding-top: 0.75rem;\n  border-top: 1px solid #e2e8f0;\n}\n.action-buttons button {\n  width: 100%;\n  padding: 0.6rem 1rem;\n  border: none;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n}\n.action-buttons button i {\n  font-size: 1rem;\n}\n.action-buttons .btn-receive {\n  background: #10b981;\n  color: white;\n}\n.action-buttons .btn-receive:hover {\n  background: #059669;\n  transform: translateY(-1px);\n}\n.action-buttons .btn-cancel {\n  background: #fecaca;\n  color: #dc2626;\n}\n.action-buttons .btn-cancel:hover {\n  background: #fca5a5;\n  transform: translateY(-1px);\n}\n.main-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #f8fafc;\n  min-width: 0;\n}\n.main-content__chrome {\n  flex-shrink: 0;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.tabs-header {\n  display: flex;\n  gap: 0.125rem;\n  padding: 0 1.25rem;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(15, 23, 42, 0.22) transparent;\n}\n.tabs-header::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.tabs-header::-webkit-scrollbar-track {\n  background: transparent;\n}\n.tabs-header::-webkit-scrollbar-thumb {\n  background-color: rgba(15, 23, 42, 0.2);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n.tabs-header::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(15, 23, 42, 0.32);\n}\n.tabs-header::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.tabs-header::-webkit-scrollbar {\n  height: 4px;\n}\n.tab-button {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.875rem 1rem;\n  border: none;\n  background: transparent;\n  color: #64748b;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  border-bottom: 3px solid transparent;\n  transition:\n    color 0.2s,\n    border-color 0.2s,\n    background-color 0.2s;\n  white-space: nowrap;\n  border-radius: 0.375rem 0.375rem 0 0;\n}\n.tab-button:hover {\n  color: #334155;\n  background: #f8fafc;\n}\n.tab-button.active {\n  color: #2563eb;\n  border-bottom-color: #2563eb;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(37, 99, 235, 0.05) 0%,\n      transparent 100%);\n}\n.tab-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 1.25rem;\n  height: 1.25rem;\n  padding: 0 0.35rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  background: #e2e8f0;\n  color: #64748b;\n}\n.tab-count.active {\n  background: #7c3aed;\n  color: #fff;\n}\n.tabs-content {\n  flex: 1;\n  overflow: hidden;\n  background: #f8fafc;\n}\n.detail-tabs {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.detail-tabs ::ng-deep .p-tabview {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.detail-tabs ::ng-deep .p-tabview-nav {\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1.5rem;\n  margin: 0;\n}\n.detail-tabs ::ng-deep .p-tabview-nav-link {\n  padding: 1rem 1.5rem;\n  font-weight: 500;\n  color: #6b7280;\n  border: none;\n  background: transparent;\n  border-bottom: 2px solid transparent;\n}\n.detail-tabs ::ng-deep .p-tabview-nav-link:hover {\n  color: #1f2937;\n  background: transparent;\n}\n.detail-tabs ::ng-deep .p-tabview-nav-link:focus {\n  box-shadow: none;\n}\n.detail-tabs ::ng-deep .p-highlight .p-tabview-nav-link {\n  color: #3b82f6;\n  border-bottom: 2px solid #3b82f6;\n  background: transparent;\n}\n.detail-tabs ::ng-deep .p-tabview-panels {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n  padding: 0;\n}\n.detail-tabs ::ng-deep .p-tabview-panel {\n  height: 100%;\n}\n.tab-content-wrapper {\n  padding: 1.25rem 1.5rem 1.5rem;\n  height: 100%;\n  overflow-y: auto;\n}\n.tab-header {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.tab-header button {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  border: none;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n.tab-header button i {\n  font-size: 0.8rem;\n}\n.tab-header button:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.tab-header .btn-secondary {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.tab-header .btn-secondary:hover:not(:disabled) {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n.tab-header .btn-primary {\n  background: #2563eb;\n  color: #fff;\n}\n.tab-header .btn-primary:hover:not(:disabled) {\n  background: #1d4ed8;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);\n}\n.hidden-file-input {\n  display: none;\n}\n.upload-modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(17, 24, 39, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  padding: 1rem;\n}\n.upload-modal {\n  width: 100%;\n  max-width: 660px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n}\n.upload-modal__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.upload-modal__header h3 {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.upload-modal__close {\n  width: 30px;\n  height: 30px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n}\n.upload-modal__close:hover {\n  background: #f3f4f6;\n  color: #111827;\n}\n.upload-modal__body {\n  padding: 1rem 1.25rem 0.5rem;\n}\n.upload-field {\n  margin-bottom: 0.9rem;\n}\n.upload-field label {\n  display: block;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #4b5563;\n  margin-bottom: 0.35rem;\n}\n.upload-field label span {\n  color: #ef4444;\n}\n.upload-field small {\n  display: block;\n  margin-top: 0.3rem;\n  color: #6b7280;\n  font-size: 0.72rem;\n}\n.upload-input,\n.upload-textarea {\n  width: 100%;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  padding: 0.62rem 0.72rem;\n  font-size: 0.86rem;\n  color: #1f2937;\n  background: #fff;\n}\n.upload-input:focus,\n.upload-textarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.upload-textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.upload-file-button {\n  width: 100%;\n  border: 1px solid #3b82f6;\n  border-radius: 8px;\n  background: #fff;\n  color: #2563eb;\n  font-weight: 700;\n  font-size: 0.9rem;\n  padding: 0.62rem 0.75rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  cursor: pointer;\n}\n.upload-file-button:hover {\n  background: #eff6ff;\n}\n.upload-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.8rem;\n  padding: 0.9rem 1.25rem 1.2rem;\n}\n.upload-cancel-btn,\n.upload-submit-btn {\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 700;\n  padding: 0.65rem 1.15rem;\n  cursor: pointer;\n}\n.upload-cancel-btn {\n  background: transparent;\n  color: #2563eb;\n}\n.upload-submit-btn {\n  background: #6fd9a0;\n  color: #fff;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.upload-submit-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin {\n  animation: spin 1s linear infinite;\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 3rem;\n  color: #9ca3af;\n}\n.empty-state i {\n  font-size: 3rem;\n}\n.empty-state p {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.products-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.products-table thead {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.products-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  color: #64748b;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  text-align: left;\n}\n.products-table tbody tr {\n  border-bottom: 1px solid #f1f5f9;\n}\n.products-table tbody tr:last-child {\n  border-bottom: none;\n}\n.products-table tbody tr:hover {\n  background: #f8fafc;\n}\n.products-table tbody tr td {\n  padding: 0.875rem 1rem;\n  color: #0f172a;\n}\n.products-table .product-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.products-table .product-info strong {\n  font-weight: 500;\n  color: #1f2937;\n}\n.products-table .product-info small {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.documents-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.documents-table thead {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.documents-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.documents-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.documents-table tbody tr:hover {\n  background: #f9fafb;\n}\n.documents-table tbody tr td {\n  padding: 1rem;\n  color: #1f2937;\n}\n.payments-summary-card {\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  background: #fff;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.payments-summary-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  margin-bottom: 0.75rem;\n}\n.payments-summary-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: #374151;\n}\n.payments-summary-row strong {\n  font-size: 0.95rem;\n  line-height: 1.2;\n  color: #111827;\n  font-weight: 700;\n}\n.payments-summary-row .payments-summary-value {\n  font-variant-numeric: tabular-nums;\n}\n.payments-summary-row .payments-status-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  background: #f3f4f6;\n  color: #374151;\n}\n.payments-summary-row .payments-status-badge.status-paid {\n  background: #dcfce7;\n  color: #166534;\n}\n.payments-summary-row .payments-status-badge.status-partial {\n  background: #fef3c7;\n  color: #92400e;\n}\n.payments-summary-row .payments-status-badge.status-pending {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n.payments-progress-track {\n  width: 100%;\n  height: 14px;\n  border-radius: 9999px;\n  background: #e5e7eb;\n  overflow: hidden;\n}\n.payments-progress-fill {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6 0%,\n      #2563eb 100%);\n  transition: width 0.25s ease;\n}\n.payments-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.payments-table thead {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.payments-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.payments-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.payments-table tbody tr:hover {\n  background: #f9fafb;\n}\n.payments-table tbody tr td {\n  padding: 1rem;\n  color: #1f2937;\n}\n.document-badge {\n  display: inline-block;\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.document-badge.badge-blue {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-badge.badge-green {\n  background: #dcfce7;\n  color: #166534;\n}\n.document-badge.badge-gray {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.document-type-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.document-language-badge {\n  display: inline-block;\n  min-width: 2rem;\n  padding: 0.2rem 0.45rem;\n  border-radius: 4px;\n  background: #f3f4f6;\n  color: #374151;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-align: center;\n}\n.document-language-empty {\n  color: #9ca3af;\n  font-size: 0.85rem;\n}\n.regenerate-language-prompt {\n  margin: 0 0 0.75rem;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.regenerate-modal {\n  width: 100%;\n  max-width: 400px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n}\n.regenerate-modal__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.regenerate-modal__header h3 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.regenerate-modal__close {\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n}\n.regenerate-modal__close:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #111827;\n}\n.regenerate-modal__close:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__body {\n  padding: 0.85rem 1rem 0.25rem;\n}\n.regenerate-modal__body .language-options {\n  display: flex;\n  gap: 0.5rem;\n}\n.regenerate-modal__body .language-option {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: border-color 0.2s, background 0.2s;\n}\n.regenerate-modal__body .language-option input {\n  margin: 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n}\n.regenerate-modal__body .language-option span {\n  font-size: 0.8rem;\n  color: #1f2937;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.regenerate-modal__body .language-option:hover:not(:has(input:disabled)) {\n  border-color: #93c5fd;\n  background: #f8fafc;\n}\n.regenerate-modal__body .language-option.selected {\n  border-color: #3b82f6;\n  background: #eff6ff;\n}\n.regenerate-modal__body .regenerate-keep-previous {\n  margin-top: 0.85rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.regenerate-modal__body .regenerate-keep-previous input {\n  margin: 0.1rem 0 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n  cursor: pointer;\n}\n.regenerate-modal__body .regenerate-keep-previous span {\n  font-size: 0.8rem;\n  color: #374151;\n  line-height: 1.4;\n}\n.regenerate-modal__body .regenerate-keep-previous:has(input:disabled) {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.regenerate-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem 1rem;\n}\n.regenerate-modal__btn {\n  border: none;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45rem 0.85rem;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  line-height: 1.2;\n}\n.regenerate-modal__btn--cancel {\n  background: transparent;\n  color: #2563eb;\n}\n.regenerate-modal__btn--cancel:hover:not(:disabled) {\n  background: #f3f4f6;\n}\n.regenerate-modal__btn--cancel:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__btn--confirm {\n  background: #22c55e;\n  color: #fff;\n}\n.regenerate-modal__btn--confirm:hover:not(.is-loading) {\n  background: #16a34a;\n}\n.regenerate-modal__btn--confirm.is-loading {\n  cursor: wait;\n  pointer-events: none;\n}\n.regenerate-modal__btn--confirm i {\n  font-size: 0.75rem;\n}\n.document-name {\n  font-size: 0.85rem;\n  color: #1f2937;\n  word-break: break-word;\n}\n.document-date {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.document-actions {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.document-actions .action-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 0.9rem;\n}\n.document-actions .action-btn.download-btn {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-actions .action-btn.download-btn:hover {\n  background: #bfdbfe;\n}\n.document-actions .action-btn.delete-btn {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.document-actions .action-btn.delete-btn:hover {\n  background: #fecaca;\n}\n/*# sourceMappingURL=order-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: Router }, { type: PurchaseOrderService }, { type: TaxCalculatorService }, { type: ToastService }, { type: ChangeDetectorRef }, { type: MatDialog }, { type: FiscalConfigurationService }, { type: VendorService }, { type: WarehouseService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderDetailDialogComponent, { className: "OrderDetailDialogComponent", filePath: "src/app/features/purchase-orders/components/order-detail-dialog/order-detail-dialog.component.ts", lineNumber: 40 });
})();

// src/app/features/inventory/services/inventory-batch.service.ts
var InventoryBatchService = class _InventoryBatchService {
  http;
  apiUrl = `${environment.api}/tenant/inventory/batches`;
  constructor(http) {
    this.http = http;
  }
  getBatches(filters = {}) {
    let params = new HttpParams();
    if (filters.page)
      params = params.set("page", filters.page.toString());
    if (filters.limit)
      params = params.set("limit", filters.limit.toString());
    if (filters.search)
      params = params.set("search", filters.search);
    if (filters.batch_number)
      params = params.set("batch_number", filters.batch_number);
    if (filters.product_id)
      params = params.set("product_id", filters.product_id);
    if (filters.warehouse_id)
      params = params.set("warehouse_id", filters.warehouse_id);
    if (filters.purchase_order_batch_id)
      params = params.set("purchase_order_batch_id", filters.purchase_order_batch_id);
    if (filters.purchase_order_id)
      params = params.set("purchase_order_id", filters.purchase_order_id);
    if (filters.created_from)
      params = params.set("created_from", filters.created_from);
    if (filters.created_to)
      params = params.set("created_to", filters.created_to);
    if (filters.sort_by)
      params = params.set("sort_by", filters.sort_by);
    if (filters.sort_order)
      params = params.set("sort_order", filters.sort_order);
    return this.http.get(this.apiUrl, { params });
  }
  getBatchesByPurchaseOrder(poId, filters = {}) {
    let params = new HttpParams();
    if (filters.page)
      params = params.set("page", filters.page.toString());
    if (filters.limit)
      params = params.set("limit", filters.limit.toString());
    if (filters.search)
      params = params.set("search", filters.search);
    if (filters.batch_number)
      params = params.set("batch_number", filters.batch_number);
    if (filters.product_id)
      params = params.set("product_id", filters.product_id);
    if (filters.warehouse_id)
      params = params.set("warehouse_id", filters.warehouse_id);
    if (filters.created_from)
      params = params.set("created_from", filters.created_from);
    if (filters.created_to)
      params = params.set("created_to", filters.created_to);
    if (filters.sort_by)
      params = params.set("sort_by", filters.sort_by);
    if (filters.sort_order)
      params = params.set("sort_order", filters.sort_order);
    return this.http.get(`${this.apiUrl}/purchase-order/${poId}`, { params });
  }
  getBatchById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  uploadBatchPhoto(batchId, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${environment.api}/tenant/inventory-batches/${batchId}/photo`, formData);
  }
  static \u0275fac = function InventoryBatchService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InventoryBatchService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InventoryBatchService, factory: _InventoryBatchService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InventoryBatchService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/inventory/components/batch-detail-dialog/batch-detail-dialog.component.ts
var _forTrack04 = ($index, $item) => $item.id;
var _forTrack12 = ($index, $item) => $item.transfer_folio + $item.direction + $item.quantity;
function BatchDetailDialogComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_For_9_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTab = tab_r2.id);
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeTab === tab_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.label, " ");
  }
}
function BatchDetailDialogComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p");
    \u0275\u0275text(2, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, " Este lote proviene de la transferencia del lote ");
    \u0275\u0275elementStart(2, "button", 14);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_0_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openOriginBatch());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ". ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx_r2.batch()) == null ? null : tmp_2_0.transferred_from_batch_number, " ");
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 22);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("img", ctx_r2.ArrowRight);
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_1_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "button", 52);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_1_Conditional_77_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openTransfer());
    });
    \u0275\u0275element(2, "lucide-icon", 29);
    \u0275\u0275text(3, " Transferir este lote ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.canTransfer)("title", ctx_r2.canTransfer ? "Transferir este lote" : "Sin stock disponible");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r2.ArrowRightLeft);
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 15)(2, "div", 16);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_1_Template_div_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openProductDetail());
    });
    \u0275\u0275elementStart(3, "div", 17);
    \u0275\u0275element(4, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 18)(6, "span", 19);
    \u0275\u0275text(7, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 21);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(12, "lucide-icon", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 23);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_1_Template_div_click_13_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openWarehouseDetail());
    });
    \u0275\u0275elementStart(14, "div", 17);
    \u0275\u0275element(15, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 18)(17, "span", 19);
    \u0275\u0275text(18, "ALMAC\xC9N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 20);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(21, "lucide-icon", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 24);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_1_Template_div_click_22_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openPurchaseOrder());
    });
    \u0275\u0275elementStart(23, "div", 17);
    \u0275\u0275element(24, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 18)(26, "span", 19);
    \u0275\u0275text(27, "REQUISICI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 20);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, BatchDetailDialogComponent_Conditional_11_Conditional_1_Conditional_30_Template, 1, 1, "lucide-icon", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 25)(32, "div", 26)(33, "div", 17);
    \u0275\u0275element(34, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 18)(36, "span", 19);
    \u0275\u0275text(37, "FECHA DE ENTRADA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span", 20);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 27)(41, "div", 17);
    \u0275\u0275element(42, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 18)(44, "span", 19);
    \u0275\u0275text(45, "TAG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "span", 20);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "button", 28);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_1_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openTagModal());
    });
    \u0275\u0275element(49, "lucide-icon", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "div", 30)(51, "div", 31)(52, "span", 32);
    \u0275\u0275text(53, "Inventario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span", 33);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 34);
    \u0275\u0275element(57, "div", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 36)(59, "div", 37)(60, "span", 38);
    \u0275\u0275text(61, "Cantidad Inicial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "span", 39);
    \u0275\u0275text(63);
    \u0275\u0275pipe(64, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 37)(66, "span", 38);
    \u0275\u0275text(67, "Disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "span", 40);
    \u0275\u0275text(69);
    \u0275\u0275pipe(70, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 37)(72, "span", 38);
    \u0275\u0275text(73, "Consumido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "span", 39);
    \u0275\u0275text(75);
    \u0275\u0275pipe(76, "removeTrailingZeros");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(77, BatchDetailDialogComponent_Conditional_11_Conditional_1_Conditional_77_Template, 4, 3, "div", 41);
    \u0275\u0275elementStart(78, "div", 42)(79, "h3", 43);
    \u0275\u0275text(80, "Resumen de Movimientos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div", 44)(82, "div", 45)(83, "div", 46);
    \u0275\u0275element(84, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "span", 47);
    \u0275\u0275text(86, "Total Movimientos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "span", 48);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 49)(90, "div", 46);
    \u0275\u0275element(91, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "span", 47);
    \u0275\u0275text(93, "\xD3rdenes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "span", 48);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "div", 50)(97, "div", 46);
    \u0275\u0275element(98, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "span", 47);
    \u0275\u0275text(100, "Transferencias");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "span", 48);
    \u0275\u0275text(102);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(103, "div", 51)(104, "div", 46);
    \u0275\u0275element(105, "lucide-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "span", 47);
    \u0275\u0275text(107, "Ajustes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "span", 48);
    \u0275\u0275text(109);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_7_0;
    let tmp_9_0;
    let tmp_11_0;
    let tmp_12_0;
    let tmp_14_0;
    let tmp_26_0;
    let tmp_27_0;
    let tmp_28_0;
    let tmp_31_0;
    let tmp_33_0;
    let tmp_35_0;
    let tmp_37_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("img", ctx_r2.Package);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx_r2.batch()) == null ? null : tmp_3_0.product_name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("SKU: ", ((tmp_4_0 = ctx_r2.batch()) == null ? null : tmp_4_0.product_sku) || "-");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r2.ArrowRight);
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.MapPin);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((tmp_7_0 = ctx_r2.batch()) == null ? null : tmp_7_0.warehouse_name) || "N/A");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r2.ArrowRight);
    \u0275\u0275advance();
    \u0275\u0275classProp("clickable", (tmp_9_0 = ctx_r2.batch()) == null ? null : tmp_9_0.purchase_order_id);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r2.FileText);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((tmp_11_0 = ctx_r2.batch()) == null ? null : tmp_11_0.purchase_order_folio) || "-");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_12_0 = ctx_r2.batch()) == null ? null : tmp_12_0.purchase_order_id) ? 30 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("img", ctx_r2.Calendar);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(((tmp_14_0 = ctx_r2.batch()) == null ? null : tmp_14_0.created_at) || ""));
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.FileText);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.sourceTag || "-");
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r2.Edit);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("green", ctx_r2.availablePercent > 50)("orange", ctx_r2.availablePercent <= 50 && ctx_r2.availablePercent > 20)("red", ctx_r2.availablePercent <= 20);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.availablePercent, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r2.availablePercent, "%");
    \u0275\u0275classProp("green", ctx_r2.availablePercent > 50)("orange", ctx_r2.availablePercent <= 50 && ctx_r2.availablePercent > 20)("red", ctx_r2.availablePercent <= 20);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(64, 47, (tmp_26_0 = ctx_r2.batch()) == null ? null : tmp_26_0.initial_quantity), " ", (tmp_26_0 = ctx_r2.batch()) == null ? null : tmp_26_0.uom_name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(70, 49, (tmp_27_0 = ctx_r2.batch()) == null ? null : tmp_27_0.available_quantity), " ", (tmp_27_0 = ctx_r2.batch()) == null ? null : tmp_27_0.uom_name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(76, 51, (tmp_28_0 = ctx_r2.batch()) == null ? null : tmp_28_0.quantity_consumed), " ", (tmp_28_0 = ctx_r2.batch()) == null ? null : tmp_28_0.uom_name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.canCreateTransfer ? 77 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("img", ctx_r2.FileText);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_31_0 = ctx_r2.batch()) == null ? null : tmp_31_0.movement_summary == null ? null : tmp_31_0.movement_summary.total_movements) ?? 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.ShoppingCart);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_33_0 = ctx_r2.batch()) == null ? null : tmp_33_0.movement_summary == null ? null : tmp_33_0.movement_summary.by_type == null ? null : tmp_33_0.movement_summary.by_type.orders) ?? 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.ArrowRight);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((((tmp_35_0 = ctx_r2.batch()) == null ? null : tmp_35_0.movement_summary == null ? null : tmp_35_0.movement_summary.by_type == null ? null : tmp_35_0.movement_summary.by_type.transfers_out) ?? 0) + (((tmp_35_0 = ctx_r2.batch()) == null ? null : tmp_35_0.movement_summary == null ? null : tmp_35_0.movement_summary.by_type == null ? null : tmp_35_0.movement_summary.by_type.transfers_in) ?? 0));
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.Edit);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_37_0 = ctx_r2.batch()) == null ? null : tmp_37_0.movement_summary == null ? null : tmp_37_0.movement_summary.by_type == null ? null : tmp_37_0.movement_summary.by_type.adjustments) ?? 0);
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "p");
    \u0275\u0275text(2, "Sin movimientos registrados");
    \u0275\u0275elementEnd()();
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const entry_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.openTransferDetail(entry_r8.transfer_id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", entry_r8.transfer_folio, " ");
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const entry_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", entry_r8.transfer_folio, " ");
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 58);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275property("img", ctx_r2.ArrowUpRight);
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 58);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275property("img", ctx_r2.ArrowDownLeft);
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const entry_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.openRelatedBatch(entry_r8.related_batch_id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", entry_r8.related_batch_number, " ");
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const entry_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", entry_r8.related_batch_number, " ");
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275conditionalCreate(2, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_2_Template, 2, 1, "button", 56)(3, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td")(5, "span", 57);
    \u0275\u0275conditionalCreate(6, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_6_Template, 1, 1, "lucide-icon", 58)(7, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_7_Template, 1, 1, "lucide-icon", 58);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 55);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "removeTrailingZeros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275conditionalCreate(13, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_13_Template, 2, 1, "button", 56)(14, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Conditional_14_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(entry_r8.transfer_id ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("direction-badge--out", entry_r8.direction === "out")("direction-badge--in", entry_r8.direction === "in");
    \u0275\u0275advance();
    \u0275\u0275conditional(entry_r8.direction === "out" ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.directionLabel(entry_r8.direction), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 11, entry_r8.quantity));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(entry_r8.related_batch_id ? 13 : 14);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r8.warehouse_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r8.created_at ? ctx_r2.formatDate(entry_r8.created_at) : "\u2014");
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 54)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Folio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 55);
    \u0275\u0275text(8, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Lote relacionado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Almac\xE9n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Fecha");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_For_17_Template, 19, 13, "tr", null, _forTrack12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r2.transferHistory);
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275conditionalCreate(1, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_1_Template, 3, 0, "div", 53)(2, BatchDetailDialogComponent_Conditional_11_Conditional_2_Conditional_2_Template, 18, 0, "table", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.transferHistory.length === 0 ? 1 : 2);
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 53)(2, "p");
    \u0275\u0275text(3, "Sin auditor\xEDas registradas");
    \u0275\u0275elementEnd()()();
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 62);
    \u0275\u0275element(1, "img", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_7_0;
    const photoUrl_r11 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", photoUrl_r11, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("src", photoUrl_r11, \u0275\u0275sanitizeUrl)("alt", "Foto del lote " + (((tmp_7_0 = ctx_r2.batch()) == null ? null : tmp_7_0.batch_number) || ""));
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "p");
    \u0275\u0275text(2, "Este lote no tiene foto a\xFAn.");
    \u0275\u0275elementEnd()();
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Subiendo...");
    \u0275\u0275elementEnd();
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_4_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 29);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("img", ctx_r2.ImageUp);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.batchPhotoUrl ? "Reemplazar foto" : "Subir foto");
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 60)(2, "div", 61);
    \u0275\u0275conditionalCreate(3, BatchDetailDialogComponent_Conditional_11_Conditional_4_Conditional_3_Template, 2, 3, "a", 62)(4, BatchDetailDialogComponent_Conditional_11_Conditional_4_Conditional_4_Template, 3, 0, "div", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 64, 0);
    \u0275\u0275listener("change", function BatchDetailDialogComponent_Conditional_11_Conditional_4_Template_input_change_5_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onPhotoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 65);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_11_Conditional_4_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r10);
      const batchPhotoInput_r12 = \u0275\u0275reference(6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openPhotoPicker(batchPhotoInput_r12));
    });
    \u0275\u0275conditionalCreate(8, BatchDetailDialogComponent_Conditional_11_Conditional_4_Conditional_8_Template, 2, 0, "span")(9, BatchDetailDialogComponent_Conditional_11_Conditional_4_Conditional_9_Template, 3, 2);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.batchPhotoUrl) ? 3 : 4, tmp_3_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.uploadingPhoto());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.uploadingPhoto() ? 8 : 9);
  }
}
function BatchDetailDialogComponent_Conditional_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 53)(2, "p");
    \u0275\u0275text(3, "Sin etiqueta configurada");
    \u0275\u0275elementEnd()()();
  }
}
function BatchDetailDialogComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BatchDetailDialogComponent_Conditional_11_Conditional_0_Template, 5, 1, "div", 12);
    \u0275\u0275conditionalCreate(1, BatchDetailDialogComponent_Conditional_11_Conditional_1_Template, 110, 53, "div", 13);
    \u0275\u0275conditionalCreate(2, BatchDetailDialogComponent_Conditional_11_Conditional_2_Template, 3, 1, "div", 13);
    \u0275\u0275conditionalCreate(3, BatchDetailDialogComponent_Conditional_11_Conditional_3_Template, 4, 0, "div", 13);
    \u0275\u0275conditionalCreate(4, BatchDetailDialogComponent_Conditional_11_Conditional_4_Template, 10, 3, "div", 13);
    \u0275\u0275conditionalCreate(5, BatchDetailDialogComponent_Conditional_11_Conditional_5_Template, 4, 0, "div", 13);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r2.batch()) == null ? null : tmp_1_0.transferred_from_batch_number) ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "general" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "movimientos" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "auditorias" ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "foto" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "etiqueta" ? 5 : -1);
  }
}
function BatchDetailDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_12_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeTagModal());
    });
    \u0275\u0275elementStart(1, "div", 68);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_12_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 69)(3, "h3");
    \u0275\u0275text(4, "Editar TAG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 70);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeTagModal());
    });
    \u0275\u0275element(6, "lucide-icon", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 71)(8, "label", 72);
    \u0275\u0275text(9, "TAG");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 73);
    \u0275\u0275listener("ngModelChange", function BatchDetailDialogComponent_Conditional_12_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateTagDraft($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "small");
    \u0275\u0275text(12, "Guardado local temporal hasta que exista endpoint.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 74)(14, "button", 75);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_12_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeTagModal());
    });
    \u0275\u0275text(15, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 76);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_12_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveTagLocally());
    });
    \u0275\u0275text(17, "Guardar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("img", ctx_r2.X);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.tagDraft());
  }
}
var BatchDetailDialogComponent = class _BatchDetailDialogComponent {
  data;
  dialogRef;
  batchService;
  dialog;
  toast;
  authService;
  X = X;
  Package = Package;
  MapPin = MapPin;
  FileText = FileText;
  Calendar = Calendar;
  ShoppingCart = ShoppingCart;
  ArrowRight = ArrowRight;
  Edit = SquarePen;
  ImageUp = ImageUp;
  ArrowRightLeft = ArrowRightLeft;
  ArrowUpRight = ArrowUpRight;
  ArrowDownLeft = ArrowDownLeft;
  batch = signal(null, ...ngDevMode ? [{ debugName: "batch" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  uploadingPhoto = signal(false, ...ngDevMode ? [{ debugName: "uploadingPhoto" }] : []);
  showTagModal = signal(false, ...ngDevMode ? [{ debugName: "showTagModal" }] : []);
  tagDraft = signal("", ...ngDevMode ? [{ debugName: "tagDraft" }] : []);
  activeTab = "general";
  tabs = [
    { id: "general", label: "General" },
    { id: "movimientos", label: "Movimientos" },
    { id: "auditorias", label: "Auditor\xEDas" },
    { id: "foto", label: "Foto" },
    { id: "etiqueta", label: "Etiqueta" }
  ];
  constructor(data, dialogRef, batchService, dialog, toast, authService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.batchService = batchService;
    this.dialog = dialog;
    this.toast = toast;
    this.authService = authService;
  }
  get canCreateTransfer() {
    return this.authService.hasPermission(PERMISSIONS.inventory.write) || this.authService.hasPermission(PERMISSIONS.inventory.transfer) || this.authService.hasPermission(PERMISSIONS.inventory.create);
  }
  ngOnInit() {
    this.batchService.getBatchById(this.data.batchId).subscribe({
      next: (batch) => {
        this.batch.set(batch);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  get availablePercent() {
    const b = this.batch();
    if (!b)
      return 0;
    return b.availability_percentage ?? 0;
  }
  get canTransfer() {
    const b = this.batch();
    if (!b)
      return false;
    return this.toNum(b.available_quantity) > 0;
  }
  get transferHistory() {
    return this.batch()?.transfer_history ?? [];
  }
  toNum(val) {
    return typeof val === "string" ? parseFloat(val) || 0 : val || 0;
  }
  openPurchaseOrder() {
    const b = this.batch();
    if (!b?.purchase_order_id)
      return;
    this.dialog.open(OrderDetailDialogComponent, __spreadProps(__spreadValues({}, ORDER_DETAIL_DIALOG_OPTIONS), {
      data: { orderId: b.purchase_order_id }
    }));
  }
  openProductDetail() {
    const b = this.batch();
    if (!b?.product_id)
      return;
    this.dialog.open(ProductDetailModalComponent, {
      data: { product: { id: b.product_id }, isNew: false },
      width: "850px",
      maxHeight: "90vh"
    });
  }
  openWarehouseDetail() {
    const b = this.batch();
    if (!b?.warehouse_id)
      return;
    this.dialog.open(WarehouseDetailModalComponent, {
      data: { warehouse: { id: b.warehouse_id, name: b.warehouse_name } },
      width: "80vw",
      maxWidth: "1000px"
    });
  }
  close() {
    this.dialogRef.close();
  }
  openTransfer() {
    const b = this.batch();
    if (!b || !this.canTransfer)
      return;
    this.dialog.open(CreateTransferDialogComponent, {
      data: {
        product_id: b.product_id,
        warehouse_id: b.warehouse_id,
        preselected_batch_id: b.id,
        preselected_quantity: this.toNum(b.available_quantity)
      },
      width: "900px",
      maxWidth: "95vw",
      maxHeight: "90vh"
    }).afterClosed().subscribe((success) => {
      if (success) {
        this.reloadBatch();
      }
    });
  }
  openTransferDetail(transferId) {
    if (!transferId)
      return;
    this.dialog.open(TransferDetailDialogComponent, {
      data: { transferId },
      width: "800px",
      maxWidth: "95vw",
      maxHeight: "90vh"
    });
  }
  openRelatedBatch(batchId) {
    if (!batchId)
      return;
    this.dialog.open(_BatchDetailDialogComponent, {
      data: { batchId },
      width: "920px",
      maxWidth: "95vw",
      maxHeight: "90vh"
    });
  }
  openOriginBatch() {
    const b = this.batch();
    if (b?.transferred_from_batch_id) {
      this.openRelatedBatch(b.transferred_from_batch_id);
    }
  }
  reloadBatch() {
    this.loading.set(true);
    this.batchService.getBatchById(this.data.batchId).subscribe({
      next: (batch) => {
        this.batch.set(batch);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  directionLabel(direction) {
    return direction === "out" ? "Salida" : "Entrada";
  }
  get sourceTag() {
    return this.batch()?.source_tag_identifier ?? null;
  }
  openTagModal() {
    this.tagDraft.set(this.sourceTag ?? "");
    this.showTagModal.set(true);
  }
  closeTagModal() {
    this.showTagModal.set(false);
  }
  updateTagDraft(value) {
    this.tagDraft.set(value);
  }
  saveTagLocally() {
    const current = this.batch();
    if (!current)
      return;
    const normalized = this.tagDraft().trim();
    this.batch.set(__spreadProps(__spreadValues({}, current), {
      source_tag_identifier: normalized.length ? normalized : null
    }));
    this.showTagModal.set(false);
    this.toast.info("TAG actualizado localmente (pendiente endpoint)");
  }
  get batchPhotoUrl() {
    const batch = this.batch();
    if (!batch)
      return null;
    return batch.photo_signed_url ?? batch.photo_url ?? batch.photo ?? null;
  }
  openPhotoPicker(input) {
    if (this.uploadingPhoto())
      return;
    input.click();
  }
  onPhotoSelected(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file)
      return;
    const currentBatch = this.batch();
    if (!currentBatch?.id)
      return;
    this.uploadingPhoto.set(true);
    this.batchService.uploadBatchPhoto(currentBatch.id, file).subscribe({
      next: (resp) => {
        const payload = resp?.data ?? {};
        const photoUrl = typeof payload["photo_url"] === "string" ? payload["photo_url"] : typeof payload["photo_signed_url"] === "string" ? payload["photo_signed_url"] : null;
        const photo = typeof payload["photo"] === "string" ? payload["photo"] : null;
        this.batch.set(__spreadProps(__spreadValues({}, currentBatch), {
          photo,
          photo_url: photoUrl,
          photo_signed_url: photoUrl
        }));
        this.uploadingPhoto.set(false);
        this.toast.success("Foto del lote actualizada");
      },
      error: (error) => {
        this.uploadingPhoto.set(false);
        this.toast.error(error?.message || "No se pudo subir la foto del lote");
      }
    });
    input.value = "";
  }
  formatDate(dateString) {
    if (!dateString)
      return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
  }
  static \u0275fac = function BatchDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BatchDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(InventoryBatchService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BatchDetailDialogComponent, selectors: [["app-batch-detail-dialog"]], decls: 13, vars: 5, consts: [["batchPhotoInput", ""], [1, "batch-detail"], [1, "batch-detail__chrome"], [1, "batch-detail__header"], [1, "batch-detail__title"], ["type", "button", "aria-label", "Cerrar", 1, "batch-detail__close", 3, "click"], [1, "w-5", "h-5", 3, "img"], ["aria-label", "Secciones del lote", 1, "batch-detail__tabs"], ["type", "button", 1, "batch-detail__tab", 3, "active"], [1, "batch-detail__loading"], [1, "tag-modal-overlay"], ["type", "button", 1, "batch-detail__tab", 3, "click"], [1, "transfer-origin-banner"], [1, "batch-detail__body"], ["type", "button", 1, "transfer-origin-banner__link", 3, "click"], [1, "info-cards"], [1, "info-card", "info-card--blue", "clickable", 3, "click"], [1, "info-card__icon"], [1, "info-card__content"], [1, "info-card__label"], [1, "info-card__value"], [1, "info-card__sub"], [1, "info-card__arrow", "w-4", "h-4", 3, "img"], [1, "info-card", "info-card--yellow", "clickable", 3, "click"], [1, "info-card", "info-card--purple", 3, "click"], [1, "meta-cards"], [1, "info-card", "info-card--mint"], [1, "info-card", "info-card--gray"], ["type", "button", "title", "Editar TAG", 1, "tag-edit-btn", 3, "click"], [1, "w-4", "h-4", 3, "img"], [1, "inventory-section"], [1, "inventory-section__header"], [1, "inventory-section__title"], [1, "inventory-section__percent"], [1, "progress-bar"], [1, "progress-bar__fill"], [1, "quantities"], [1, "quantity-item"], [1, "quantity-item__label"], [1, "quantity-item__value"], [1, "quantity-item__value", "green"], [1, "transfer-action-bar"], [1, "movements-summary"], [1, "movements-summary__title"], [1, "movements-cards"], [1, "movement-card", "movement-card--blue"], [1, "movement-card__icon-wrap"], [1, "movement-card__label"], [1, "movement-card__value"], [1, "movement-card", "movement-card--green"], [1, "movement-card", "movement-card--orange"], [1, "movement-card", "movement-card--purple"], ["type", "button", 1, "transfer-action-btn", 3, "click", "disabled", "title"], [1, "empty-tab"], [1, "transfer-history-table"], [1, "text-right"], ["type", "button", 1, "folio-link"], [1, "direction-badge"], [1, "w-3", "h-3", 3, "img"], ["type", "button", 1, "folio-link", 3, "click"], [1, "photo-tab"], [1, "photo-tab__preview"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [1, "photo-tab__empty"], ["type", "file", "accept", "image/*", 1, "hidden-file-input", 3, "change"], ["type", "button", 1, "photo-tab__upload-btn", 3, "click", "disabled"], [3, "src", "alt"], [1, "tag-modal-overlay", 3, "click"], [1, "tag-modal", 3, "click"], [1, "tag-modal__header"], ["type", "button", 1, "tag-modal__close", 3, "click"], [1, "tag-modal__body"], ["for", "sourceTagInput"], ["id", "sourceTagInput", "type", "text", "placeholder", "Ej. 12312313123", 1, "tag-modal__input", 3, "ngModelChange", "ngModel"], [1, "tag-modal__footer"], ["type", "button", 1, "btn-cancel", 3, "click"], ["type", "button", 1, "btn-save", 3, "click"]], template: function BatchDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h2", 4);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 5);
      \u0275\u0275listener("click", function BatchDetailDialogComponent_Template_button_click_5_listener() {
        return ctx.close();
      });
      \u0275\u0275element(6, "lucide-icon", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "nav", 7);
      \u0275\u0275repeaterCreate(8, BatchDetailDialogComponent_For_9_Template, 2, 3, "button", 8, _forTrack04);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, BatchDetailDialogComponent_Conditional_10_Template, 3, 0, "div", 9);
      \u0275\u0275conditionalCreate(11, BatchDetailDialogComponent_Conditional_11_Template, 6, 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(12, BatchDetailDialogComponent_Conditional_12_Template, 18, 2, "div", 10);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.batch()) == null ? null : tmp_0_0.batch_number) || "...");
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.batch() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showTagModal() ? 12 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent, RemoveTrailingZerosPipe], styles: ["\n\n.batch-detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 920px;\n  max-height: 85vh;\n  overflow: hidden;\n  background: #f8fafc;\n  border-radius: 0.75rem;\n}\n.batch-detail__chrome[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.batch-detail__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1.125rem 1.5rem 0.875rem;\n  border-bottom: 1px solid #f1f5f9;\n}\n.batch-detail__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.375rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  line-height: 1.2;\n  color: #0f172a;\n}\n.batch-detail__close[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 2.25rem;\n  height: 2.25rem;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  cursor: pointer;\n  color: #64748b;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.5rem;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n}\n.batch-detail__close[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n.batch-detail__tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.125rem;\n  padding: 0 1.25rem;\n  flex-shrink: 0;\n  overflow-x: auto;\n  scrollbar-width: none;\n}\n.batch-detail__tabs[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.batch-detail__tab[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  border-bottom: 3px solid transparent;\n  padding: 0.875rem 1.125rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition:\n    color 0.2s,\n    border-color 0.2s,\n    background-color 0.2s;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border-radius: 0.375rem 0.375rem 0 0;\n}\n.batch-detail__tab[_ngcontent-%COMP%]:hover {\n  color: #334155;\n  background: #f8fafc;\n}\n.batch-detail__tab.active[_ngcontent-%COMP%] {\n  color: #2563eb;\n  border-bottom-color: #2563eb;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(37, 99, 235, 0.04) 0%,\n      transparent 100%);\n}\n.batch-detail__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.25rem 1.5rem 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background: #f8fafc;\n}\n.batch-detail__loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #64748b;\n  background: #f8fafc;\n  flex: 1;\n}\n.info-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 0.875rem 1rem;\n  border-radius: 0.75rem;\n  position: relative;\n  border: 1px solid transparent;\n}\n.info-card--blue[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  border-color: #dbeafe;\n}\n.info-card--blue[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--yellow[_ngcontent-%COMP%] {\n  background-color: #fefce8;\n  border-color: #fef08a;\n}\n.info-card--yellow[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #fde68a;\n  color: #d97706;\n}\n.info-card--purple[_ngcontent-%COMP%] {\n  background-color: #f5f3ff;\n  border-color: #e9d5ff;\n}\n.info-card--purple[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--red[_ngcontent-%COMP%] {\n  background-color: #fff1f2;\n}\n.info-card--red[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #fecdd3;\n  color: #e11d48;\n}\n.info-card--mint[_ngcontent-%COMP%] {\n  background-color: #ecfeff;\n  border-color: #a5f3fc;\n}\n.info-card--mint[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #cffafe;\n  color: #0891b2;\n}\n.info-card--gray[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-color: #e2e8f0;\n}\n.info-card--gray[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #e2e8f0;\n  color: #475569;\n}\n.info-card--full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.info-card.clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition:\n    box-shadow 0.2s,\n    transform 0.2s,\n    border-color 0.2s;\n}\n.info-card.clickable[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);\n}\n.info-card__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.info-card__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n  flex: 1;\n  min-width: 0;\n}\n.info-card__label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 600;\n  color: #9ca3af;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.info-card__value[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1f2937;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info-card__sub[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.info-card__arrow[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  flex-shrink: 0;\n  align-self: center;\n}\n.inventory-section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  padding: 1.125rem 1.25rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.inventory-section__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.inventory-section__title[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  letter-spacing: -0.01em;\n}\n.inventory-section__percent[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n}\n.inventory-section__percent.green[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.inventory-section__percent.orange[_ngcontent-%COMP%] {\n  color: #ea580c;\n}\n.inventory-section__percent.red[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.meta-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.75rem;\n}\n.tag-edit-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: #e2e8f0;\n  color: #334155;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.tag-edit-btn[_ngcontent-%COMP%]:hover {\n  background: #cbd5e1;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 0.625rem;\n  background: #e2e8f0;\n  border-radius: 9999px;\n  overflow: hidden;\n  margin-bottom: 1rem;\n}\n.progress-bar__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 9999px;\n  transition: width 0.4s ease;\n}\n.progress-bar__fill.green[_ngcontent-%COMP%] {\n  background: #16a34a;\n}\n.progress-bar__fill.orange[_ngcontent-%COMP%] {\n  background: #ea580c;\n}\n.progress-bar__fill.red[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n.quantities[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.5rem;\n}\n.quantity-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.quantity-item__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.quantity-item__value[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.quantity-item__value.green[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.movements-summary__title[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0 0 0.75rem;\n  letter-spacing: -0.01em;\n}\n.movements-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n}\n.movement-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n  padding: 0.875rem;\n  border-radius: 0.75rem;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.movement-card--blue[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.movement-card--blue[_ngcontent-%COMP%]   .movement-card__icon-wrap[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n}\n.movement-card--green[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.movement-card--green[_ngcontent-%COMP%]   .movement-card__icon-wrap[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n}\n.movement-card--orange[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  color: #ea580c;\n}\n.movement-card--orange[_ngcontent-%COMP%]   .movement-card__icon-wrap[_ngcontent-%COMP%] {\n  background-color: #fff7ed;\n}\n.movement-card--purple[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  color: #7c3aed;\n}\n.movement-card--purple[_ngcontent-%COMP%]   .movement-card__icon-wrap[_ngcontent-%COMP%] {\n  background-color: #f5f3ff;\n}\n.movement-card__icon-wrap[_ngcontent-%COMP%] {\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.movement-card__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.movement-card__value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.empty-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #9ca3af;\n  font-size: 0.875rem;\n}\n.hidden-file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.photo-tab[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 360px;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  background: #f9fafb;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  align-items: center;\n  justify-content: center;\n}\n.photo-tab__preview[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 520px;\n  min-height: 260px;\n  background: #fff;\n  border: 1px dashed #d1d5db;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.photo-tab__preview[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.photo-tab__preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 420px;\n  object-fit: contain;\n  display: block;\n  background: #fff;\n}\n.photo-tab__empty[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.9rem;\n  text-align: center;\n}\n.photo-tab__upload-btn[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 8px;\n  background: #2563eb;\n  color: #fff;\n  font-size: 0.82rem;\n  font-weight: 600;\n  padding: 0.55rem 0.9rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  cursor: pointer;\n}\n.photo-tab__upload-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n.photo-tab__upload-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.tag-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  z-index: 1200;\n}\n.tag-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: #fff;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n}\n.tag-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.95rem 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.tag-modal__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  color: #0f172a;\n}\n.tag-modal__close[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #64748b;\n  width: 30px;\n  height: 30px;\n  border-radius: 6px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.tag-modal__close[_ngcontent-%COMP%]:hover {\n  background: #f1f5f9;\n  color: #0f172a;\n}\n.tag-modal__body[_ngcontent-%COMP%] {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.tag-modal__body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #475569;\n}\n.tag-modal__body[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.72rem;\n}\n.tag-modal__input[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  padding: 0.62rem 0.7rem;\n  font-size: 0.86rem;\n  color: #1e293b;\n}\n.tag-modal__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.tag-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  padding: 0.9rem 1rem 1rem;\n}\n.btn-cancel[_ngcontent-%COMP%], \n.btn-save[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 8px;\n  padding: 0.55rem 0.95rem;\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #334155;\n}\n.btn-save[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: #fff;\n}\n.transfer-origin-banner[_ngcontent-%COMP%] {\n  margin: 0 1rem;\n  padding: 0.625rem 0.875rem;\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  color: #1e40af;\n}\n.transfer-origin-banner__link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  color: #2563eb;\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: underline;\n}\n.transfer-action-bar[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  display: flex;\n  justify-content: flex-end;\n}\n.transfer-action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.5rem 0.875rem;\n  background: #eef2ff;\n  border: 1px solid #c7d2fe;\n  border-radius: 0.5rem;\n  color: #4338ca;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.transfer-action-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e0e7ff;\n}\n.transfer-action-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.transfer-history-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.8125rem;\n}\n.transfer-history-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  padding: 0.5rem 0.75rem;\n  text-align: left;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #6b7280;\n  border-bottom: 1px solid #e5e7eb;\n}\n.transfer-history-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #374151;\n}\n.folio-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  color: #2563eb;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n}\n.folio-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.direction-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.125rem 0.5rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 600;\n}\n.direction-badge--out[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  color: #c2410c;\n}\n.direction-badge--in[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #047857;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n/*# sourceMappingURL=batch-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BatchDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-batch-detail-dialog", standalone: true, imports: [CommonModule, FormsModule, RemoveTrailingZerosPipe, LucideAngularModule], template: `<div class="batch-detail">
  <div class="batch-detail__chrome">
    <div class="batch-detail__header">
      <h2 class="batch-detail__title">{{ batch()?.batch_number || '...' }}</h2>
      <button type="button" class="batch-detail__close" (click)="close()" aria-label="Cerrar">
        <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>
      </button>
    </div>

    <nav class="batch-detail__tabs" aria-label="Secciones del lote">
      @for (tab of tabs; track tab.id) {
        <button
          type="button"
          class="batch-detail__tab"
          [class.active]="activeTab === tab.id"
          (click)="activeTab = tab.id">
          {{ tab.label }}
        </button>
      }
    </nav>
  </div>

  <!-- Loading -->
  @if (loading()) {
    <div class="batch-detail__loading">
      <p>Cargando...</p>
    </div>
  }

  @if (!loading() && batch()) {
    @if (batch()?.transferred_from_batch_number) {
      <div class="transfer-origin-banner">
        Este lote proviene de la transferencia del lote
        <button type="button" class="transfer-origin-banner__link" (click)="openOriginBatch()">
          {{ batch()?.transferred_from_batch_number }}
        </button>.
      </div>
    }

    <!-- Tab: General -->
    @if (activeTab === 'general') {
      <div class="batch-detail__body">

        <!-- Info Cards Row -->
        <div class="info-cards">
          <!-- Producto -->
          <div class="info-card info-card--blue clickable" (click)="openProductDetail()">
            <div class="info-card__icon">
              <lucide-icon [img]="Package" class="w-5 h-5"></lucide-icon>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">PRODUCTO</span>
              <span class="info-card__value">{{ batch()?.product_name || 'N/A' }}</span>
              <span class="info-card__sub">SKU: {{ batch()?.product_sku || '-' }}</span>
            </div>
            <lucide-icon [img]="ArrowRight" class="info-card__arrow w-4 h-4"></lucide-icon>
          </div>

          <!-- ALMAC\xC9N -->
          <div class="info-card info-card--yellow clickable" (click)="openWarehouseDetail()">
            <div class="info-card__icon">
              <lucide-icon [img]="MapPin" class="w-5 h-5"></lucide-icon>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">ALMAC\xC9N</span>
              <span class="info-card__value">{{ batch()?.warehouse_name || 'N/A' }}</span>
            </div>
            <lucide-icon [img]="ArrowRight" class="info-card__arrow w-4 h-4"></lucide-icon>
          </div>

          <!-- Requisici\xF3n -->
          <div class="info-card info-card--purple" [class.clickable]="batch()?.purchase_order_id" (click)="openPurchaseOrder()">
            <div class="info-card__icon">
              <lucide-icon [img]="FileText" class="w-5 h-5"></lucide-icon>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">REQUISICI\xD3N</span>
              <span class="info-card__value">{{ batch()?.purchase_order_folio || '-' }}</span>
            </div>
            @if (batch()?.purchase_order_id) {
              <lucide-icon [img]="ArrowRight" class="info-card__arrow w-4 h-4"></lucide-icon>
            }
          </div>
        </div>

        <div class="meta-cards">
          <!-- Fecha -->
          <div class="info-card info-card--mint">
            <div class="info-card__icon">
              <lucide-icon [img]="Calendar" class="w-5 h-5"></lucide-icon>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">FECHA DE ENTRADA</span>
              <span class="info-card__value">{{ formatDate(batch()?.created_at || '') }}</span>
            </div>
          </div>

          <!-- TAG -->
          <div class="info-card info-card--gray">
            <div class="info-card__icon">
              <lucide-icon [img]="FileText" class="w-5 h-5"></lucide-icon>
            </div>
            <div class="info-card__content">
              <span class="info-card__label">TAG</span>
              <span class="info-card__value">{{ sourceTag || '-' }}</span>
            </div>
            <button type="button" class="tag-edit-btn" (click)="openTagModal()" title="Editar TAG">
              <lucide-icon [img]="Edit" class="w-4 h-4"></lucide-icon>
            </button>
          </div>
        </div>

        <!-- Inventario -->
        <div class="inventory-section">
          <div class="inventory-section__header">
            <span class="inventory-section__title">Inventario</span>
            <span class="inventory-section__percent" [class.green]="availablePercent > 50" [class.orange]="availablePercent <= 50 && availablePercent > 20" [class.red]="availablePercent <= 20">
              {{ availablePercent }}%
            </span>
          </div>

          <!-- Progress bar -->
          <div class="progress-bar">
            <div class="progress-bar__fill"
              [class.green]="availablePercent > 50"
              [class.orange]="availablePercent <= 50 && availablePercent > 20"
              [class.red]="availablePercent <= 20"
              [style.width.%]="availablePercent">
            </div>
          </div>

          <!-- Quantities -->
          <div class="quantities">
            <div class="quantity-item">
              <span class="quantity-item__label">Cantidad Inicial</span>
              <span class="quantity-item__value">{{ batch()?.initial_quantity | removeTrailingZeros }} {{ batch()?.uom_name }}</span>
            </div>
            <div class="quantity-item">
              <span class="quantity-item__label">Disponible</span>
              <span class="quantity-item__value green">{{ batch()?.available_quantity | removeTrailingZeros }} {{ batch()?.uom_name }}</span>
            </div>
            <div class="quantity-item">
              <span class="quantity-item__label">Consumido</span>
              <span class="quantity-item__value">{{ batch()?.quantity_consumed | removeTrailingZeros }} {{ batch()?.uom_name }}</span>
            </div>
          </div>
        </div>

        @if (canCreateTransfer) {
          <div class="transfer-action-bar">
            <button
              type="button"
              class="transfer-action-btn"
              [disabled]="!canTransfer"
              (click)="openTransfer()"
              [title]="canTransfer ? 'Transferir este lote' : 'Sin stock disponible'">
              <lucide-icon [img]="ArrowRightLeft" class="w-4 h-4"></lucide-icon>
              Transferir este lote
            </button>
          </div>
        }

        <!-- Resumen de Movimientos -->
        <div class="movements-summary">
          <h3 class="movements-summary__title">Resumen de Movimientos</h3>
          <div class="movements-cards">
            <div class="movement-card movement-card--blue">
              <div class="movement-card__icon-wrap">
                <lucide-icon [img]="FileText" class="w-5 h-5"></lucide-icon>
              </div>
              <span class="movement-card__label">Total Movimientos</span>
              <span class="movement-card__value">{{ batch()?.movement_summary?.total_movements ?? 0 }}</span>
            </div>
            <div class="movement-card movement-card--green">
              <div class="movement-card__icon-wrap">
                <lucide-icon [img]="ShoppingCart" class="w-5 h-5"></lucide-icon>
              </div>
              <span class="movement-card__label">\xD3rdenes</span>
              <span class="movement-card__value">{{ batch()?.movement_summary?.by_type?.orders ?? 0 }}</span>
            </div>
            <div class="movement-card movement-card--orange">
              <div class="movement-card__icon-wrap">
                <lucide-icon [img]="ArrowRight" class="w-5 h-5"></lucide-icon>
              </div>
              <span class="movement-card__label">Transferencias</span>
              <span class="movement-card__value">{{ (batch()?.movement_summary?.by_type?.transfers_out ?? 0) + (batch()?.movement_summary?.by_type?.transfers_in ?? 0) }}</span>
            </div>
            <div class="movement-card movement-card--purple">
              <div class="movement-card__icon-wrap">
                <lucide-icon [img]="Edit" class="w-5 h-5"></lucide-icon>
              </div>
              <span class="movement-card__label">Ajustes</span>
              <span class="movement-card__value">{{ batch()?.movement_summary?.by_type?.adjustments ?? 0 }}</span>
            </div>
          </div>
        </div>

      </div>
    }

    <!-- Tab: Movimientos -->
    @if (activeTab === 'movimientos') {
      <div class="batch-detail__body">
        @if (transferHistory.length === 0) {
          <div class="empty-tab">
            <p>Sin movimientos registrados</p>
          </div>
        } @else {
          <table class="transfer-history-table">
            <thead>
              <tr>
                <th>Folio</th>
                <th>Direcci\xF3n</th>
                <th class="text-right">Cantidad</th>
                <th>Lote relacionado</th>
                <th>Almac\xE9n</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              @for (entry of transferHistory; track entry.transfer_folio + entry.direction + entry.quantity) {
                <tr>
                  <td>
                    @if (entry.transfer_id) {
                      <button type="button" class="folio-link" (click)="openTransferDetail(entry.transfer_id)">
                        {{ entry.transfer_folio }}
                      </button>
                    } @else {
                      {{ entry.transfer_folio }}
                    }
                  </td>
                  <td>
                    <span class="direction-badge" [class.direction-badge--out]="entry.direction === 'out'" [class.direction-badge--in]="entry.direction === 'in'">
                      @if (entry.direction === 'out') {
                        <lucide-icon [img]="ArrowUpRight" class="w-3 h-3"></lucide-icon>
                      } @else {
                        <lucide-icon [img]="ArrowDownLeft" class="w-3 h-3"></lucide-icon>
                      }
                      {{ directionLabel(entry.direction) }}
                    </span>
                  </td>
                  <td class="text-right">{{ entry.quantity | removeTrailingZeros }}</td>
                  <td>
                    @if (entry.related_batch_id) {
                      <button type="button" class="folio-link" (click)="openRelatedBatch(entry.related_batch_id)">
                        {{ entry.related_batch_number }}
                      </button>
                    } @else {
                      {{ entry.related_batch_number }}
                    }
                  </td>
                  <td>{{ entry.warehouse_name }}</td>
                  <td>{{ entry.created_at ? formatDate(entry.created_at) : '\u2014' }}</td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    }

    <!-- Tab: Auditor\xEDas -->
    @if (activeTab === 'auditorias') {
      <div class="batch-detail__body">
        <div class="empty-tab">
          <p>Sin auditor\xEDas registradas</p>
        </div>
      </div>
    }

    <!-- Tab: Foto -->
    @if (activeTab === 'foto') {
      <div class="batch-detail__body">
        <div class="photo-tab">
          <div class="photo-tab__preview">
            @if (batchPhotoUrl; as photoUrl) {
              <a [href]="photoUrl" target="_blank" rel="noopener noreferrer">
                <img [src]="photoUrl" [alt]="'Foto del lote ' + (batch()?.batch_number || '')" />
              </a>
            } @else {
              <div class="photo-tab__empty">
                <p>Este lote no tiene foto a\xFAn.</p>
              </div>
            }
          </div>

          <input
            #batchPhotoInput
            type="file"
            class="hidden-file-input"
            accept="image/*"
            (change)="onPhotoSelected($event)"
          />

          <button
            type="button"
            class="photo-tab__upload-btn"
            (click)="openPhotoPicker(batchPhotoInput)"
            [disabled]="uploadingPhoto()"
          >
            @if (uploadingPhoto()) {
              <span>Subiendo...</span>
            } @else {
              <lucide-icon [img]="ImageUp" class="w-4 h-4"></lucide-icon>
              <span>{{ batchPhotoUrl ? 'Reemplazar foto' : 'Subir foto' }}</span>
            }
          </button>
        </div>
      </div>
    }

    <!-- Tab: Etiqueta -->
    @if (activeTab === 'etiqueta') {
      <div class="batch-detail__body">
        <div class="empty-tab">
          <p>Sin etiqueta configurada</p>
        </div>
      </div>
    }
  }
</div>

@if (showTagModal()) {
  <div class="tag-modal-overlay" (click)="closeTagModal()">
    <div class="tag-modal" (click)="$event.stopPropagation()">
      <div class="tag-modal__header">
        <h3>Editar TAG</h3>
        <button type="button" class="tag-modal__close" (click)="closeTagModal()">
          <lucide-icon [img]="X" class="w-4 h-4"></lucide-icon>
        </button>
      </div>
      <div class="tag-modal__body">
        <label for="sourceTagInput">TAG</label>
        <input
          id="sourceTagInput"
          type="text"
          class="tag-modal__input"
          [ngModel]="tagDraft()"
          (ngModelChange)="updateTagDraft($event)"
          placeholder="Ej. 12312313123"
        />
        <small>Guardado local temporal hasta que exista endpoint.</small>
      </div>
      <div class="tag-modal__footer">
        <button type="button" class="btn-cancel" (click)="closeTagModal()">Cancelar</button>
        <button type="button" class="btn-save" (click)="saveTagLocally()">Guardar</button>
      </div>
    </div>
  </div>
}
`, styles: ["/* src/app/features/inventory/components/batch-detail-dialog/batch-detail-dialog.component.scss */\n.batch-detail {\n  display: flex;\n  flex-direction: column;\n  width: 920px;\n  max-height: 85vh;\n  overflow: hidden;\n  background: #f8fafc;\n  border-radius: 0.75rem;\n}\n.batch-detail__chrome {\n  flex-shrink: 0;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.batch-detail__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1.125rem 1.5rem 0.875rem;\n  border-bottom: 1px solid #f1f5f9;\n}\n.batch-detail__title {\n  margin: 0;\n  font-size: 1.375rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  line-height: 1.2;\n  color: #0f172a;\n}\n.batch-detail__close {\n  flex-shrink: 0;\n  width: 2.25rem;\n  height: 2.25rem;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  cursor: pointer;\n  color: #64748b;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.5rem;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n}\n.batch-detail__close:hover {\n  color: #0f172a;\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n.batch-detail__tabs {\n  display: flex;\n  gap: 0.125rem;\n  padding: 0 1.25rem;\n  flex-shrink: 0;\n  overflow-x: auto;\n  scrollbar-width: none;\n}\n.batch-detail__tabs::-webkit-scrollbar {\n  display: none;\n}\n.batch-detail__tab {\n  background: none;\n  border: none;\n  border-bottom: 3px solid transparent;\n  padding: 0.875rem 1.125rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition:\n    color 0.2s,\n    border-color 0.2s,\n    background-color 0.2s;\n  margin-bottom: 0;\n  white-space: nowrap;\n  border-radius: 0.375rem 0.375rem 0 0;\n}\n.batch-detail__tab:hover {\n  color: #334155;\n  background: #f8fafc;\n}\n.batch-detail__tab.active {\n  color: #2563eb;\n  border-bottom-color: #2563eb;\n  background:\n    linear-gradient(\n      180deg,\n      rgba(37, 99, 235, 0.04) 0%,\n      transparent 100%);\n}\n.batch-detail__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.25rem 1.5rem 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  background: #f8fafc;\n}\n.batch-detail__loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #64748b;\n  background: #f8fafc;\n  flex: 1;\n}\n.info-cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n}\n.info-card {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 0.875rem 1rem;\n  border-radius: 0.75rem;\n  position: relative;\n  border: 1px solid transparent;\n}\n.info-card--blue {\n  background-color: #eff6ff;\n  border-color: #dbeafe;\n}\n.info-card--blue .info-card__icon {\n  background-color: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--yellow {\n  background-color: #fefce8;\n  border-color: #fef08a;\n}\n.info-card--yellow .info-card__icon {\n  background-color: #fde68a;\n  color: #d97706;\n}\n.info-card--purple {\n  background-color: #f5f3ff;\n  border-color: #e9d5ff;\n}\n.info-card--purple .info-card__icon {\n  background-color: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--red {\n  background-color: #fff1f2;\n}\n.info-card--red .info-card__icon {\n  background-color: #fecdd3;\n  color: #e11d48;\n}\n.info-card--mint {\n  background-color: #ecfeff;\n  border-color: #a5f3fc;\n}\n.info-card--mint .info-card__icon {\n  background-color: #cffafe;\n  color: #0891b2;\n}\n.info-card--gray {\n  background-color: #fff;\n  border-color: #e2e8f0;\n}\n.info-card--gray .info-card__icon {\n  background-color: #e2e8f0;\n  color: #475569;\n}\n.info-card--full {\n  grid-column: 1/-1;\n}\n.info-card.clickable {\n  cursor: pointer;\n  transition:\n    box-shadow 0.2s,\n    transform 0.2s,\n    border-color 0.2s;\n}\n.info-card.clickable:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);\n}\n.info-card__icon {\n  flex-shrink: 0;\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.info-card__content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n  flex: 1;\n  min-width: 0;\n}\n.info-card__label {\n  font-size: 0.65rem;\n  font-weight: 600;\n  color: #9ca3af;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.info-card__value {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1f2937;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info-card__sub {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.info-card__arrow {\n  color: #9ca3af;\n  flex-shrink: 0;\n  align-self: center;\n}\n.inventory-section {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  padding: 1.125rem 1.25rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.inventory-section__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.inventory-section__title {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  letter-spacing: -0.01em;\n}\n.inventory-section__percent {\n  font-size: 0.9375rem;\n  font-weight: 700;\n}\n.inventory-section__percent.green {\n  color: #16a34a;\n}\n.inventory-section__percent.orange {\n  color: #ea580c;\n}\n.inventory-section__percent.red {\n  color: #dc2626;\n}\n.meta-cards {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0.75rem;\n}\n.tag-edit-btn {\n  border: none;\n  background: #e2e8f0;\n  color: #334155;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.tag-edit-btn:hover {\n  background: #cbd5e1;\n}\n.progress-bar {\n  width: 100%;\n  height: 0.625rem;\n  background: #e2e8f0;\n  border-radius: 9999px;\n  overflow: hidden;\n  margin-bottom: 1rem;\n}\n.progress-bar__fill {\n  height: 100%;\n  border-radius: 9999px;\n  transition: width 0.4s ease;\n}\n.progress-bar__fill.green {\n  background: #16a34a;\n}\n.progress-bar__fill.orange {\n  background: #ea580c;\n}\n.progress-bar__fill.red {\n  background: #dc2626;\n}\n.quantities {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.5rem;\n}\n.quantity-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.quantity-item__label {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.quantity-item__value {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.quantity-item__value.green {\n  color: #16a34a;\n}\n.movements-summary__title {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0 0 0.75rem;\n  letter-spacing: -0.01em;\n}\n.movements-cards {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n}\n.movement-card {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n  padding: 0.875rem;\n  border-radius: 0.75rem;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.movement-card--blue lucide-icon {\n  color: #2563eb;\n}\n.movement-card--blue .movement-card__icon-wrap {\n  background-color: #eff6ff;\n}\n.movement-card--green lucide-icon {\n  color: #16a34a;\n}\n.movement-card--green .movement-card__icon-wrap {\n  background-color: #dcfce7;\n}\n.movement-card--orange lucide-icon {\n  color: #ea580c;\n}\n.movement-card--orange .movement-card__icon-wrap {\n  background-color: #fff7ed;\n}\n.movement-card--purple lucide-icon {\n  color: #7c3aed;\n}\n.movement-card--purple .movement-card__icon-wrap {\n  background-color: #f5f3ff;\n}\n.movement-card__icon-wrap {\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.movement-card__label {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.movement-card__value {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.empty-tab {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #9ca3af;\n  font-size: 0.875rem;\n}\n.hidden-file-input {\n  display: none;\n}\n.photo-tab {\n  width: 100%;\n  min-height: 360px;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  background: #f9fafb;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  align-items: center;\n  justify-content: center;\n}\n.photo-tab__preview {\n  width: 100%;\n  max-width: 520px;\n  min-height: 260px;\n  background: #fff;\n  border: 1px dashed #d1d5db;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.photo-tab__preview a {\n  width: 100%;\n}\n.photo-tab__preview img {\n  width: 100%;\n  max-height: 420px;\n  object-fit: contain;\n  display: block;\n  background: #fff;\n}\n.photo-tab__empty {\n  color: #9ca3af;\n  font-size: 0.9rem;\n  text-align: center;\n}\n.photo-tab__upload-btn {\n  border: none;\n  border-radius: 8px;\n  background: #2563eb;\n  color: #fff;\n  font-size: 0.82rem;\n  font-weight: 600;\n  padding: 0.55rem 0.9rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  cursor: pointer;\n}\n.photo-tab__upload-btn:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n.photo-tab__upload-btn:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.tag-modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  z-index: 1200;\n}\n.tag-modal {\n  width: 100%;\n  max-width: 420px;\n  background: #fff;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n}\n.tag-modal__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.95rem 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.tag-modal__header h3 {\n  margin: 0;\n  font-size: 1rem;\n  color: #0f172a;\n}\n.tag-modal__close {\n  border: none;\n  background: transparent;\n  color: #64748b;\n  width: 30px;\n  height: 30px;\n  border-radius: 6px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.tag-modal__close:hover {\n  background: #f1f5f9;\n  color: #0f172a;\n}\n.tag-modal__body {\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.tag-modal__body label {\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #475569;\n}\n.tag-modal__body small {\n  color: #64748b;\n  font-size: 0.72rem;\n}\n.tag-modal__input {\n  width: 100%;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  padding: 0.62rem 0.7rem;\n  font-size: 0.86rem;\n  color: #1e293b;\n}\n.tag-modal__input:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.tag-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n  padding: 0.9rem 1rem 1rem;\n}\n.btn-cancel,\n.btn-save {\n  border: none;\n  border-radius: 8px;\n  padding: 0.55rem 0.95rem;\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n}\n.btn-cancel {\n  background: #f1f5f9;\n  color: #334155;\n}\n.btn-save {\n  background: #2563eb;\n  color: #fff;\n}\n.transfer-origin-banner {\n  margin: 0 1rem;\n  padding: 0.625rem 0.875rem;\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  color: #1e40af;\n}\n.transfer-origin-banner__link {\n  background: none;\n  border: none;\n  padding: 0;\n  color: #2563eb;\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: underline;\n}\n.transfer-action-bar {\n  margin-top: 1rem;\n  display: flex;\n  justify-content: flex-end;\n}\n.transfer-action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.5rem 0.875rem;\n  background: #eef2ff;\n  border: 1px solid #c7d2fe;\n  border-radius: 0.5rem;\n  color: #4338ca;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.transfer-action-btn:hover:not(:disabled) {\n  background: #e0e7ff;\n}\n.transfer-action-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.transfer-history-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.8125rem;\n}\n.transfer-history-table th {\n  background: #f9fafb;\n  padding: 0.5rem 0.75rem;\n  text-align: left;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #6b7280;\n  border-bottom: 1px solid #e5e7eb;\n}\n.transfer-history-table td {\n  padding: 0.5rem 0.75rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #374151;\n}\n.folio-link {\n  background: none;\n  border: none;\n  padding: 0;\n  color: #2563eb;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n}\n.folio-link:hover {\n  text-decoration: underline;\n}\n.direction-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.125rem 0.5rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 600;\n}\n.direction-badge--out {\n  background: #fff7ed;\n  color: #c2410c;\n}\n.direction-badge--in {\n  background: #ecfdf5;\n  color: #047857;\n}\n.text-right {\n  text-align: right;\n}\n/*# sourceMappingURL=batch-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: InventoryBatchService }, { type: MatDialog }, { type: ToastService }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BatchDetailDialogComponent, { className: "BatchDetailDialogComponent", filePath: "src/app/features/inventory/components/batch-detail-dialog/batch-detail-dialog.component.ts", lineNumber: 28 });
})();

// src/app/features/inventory/components/transfer-detail-dialog/transfer-detail-dialog.component.ts
var _forTrack05 = ($index, $item) => $item.source_batch_number + $item.destination_batch_number;
function TransferDetailDialogComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1, "Cargando...");
    \u0275\u0275elementEnd();
  }
}
function TransferDetailDialogComponent_Conditional_7_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 9);
    \u0275\u0275text(2, "Notas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 10);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(t_r1.notes);
  }
}
function TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_2_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const line_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.openBatchDetail(line_r3.source_batch_id, $event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r3.source_batch_number, " ");
  }
}
function TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const line_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", line_r3.source_batch_number, " ");
  }
}
function TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_8_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const line_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.openBatchDetail(line_r3.destination_batch_id, $event));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r3.destination_batch_number, " ");
  }
}
function TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const line_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", line_r3.destination_batch_number, " ");
  }
}
function TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275conditionalCreate(2, TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_2_Template, 2, 1, "button", 17)(3, TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 16);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "removeTrailingZeros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275conditionalCreate(8, TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_8_Template, 2, 1, "button", 17)(9, TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Conditional_9_Template, 1, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(line_r3.source_batch_id ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 3, line_r3.quantity));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(line_r3.destination_batch_id ? 8 : 9);
  }
}
function TransferDetailDialogComponent_Conditional_7_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 13)(1, "h3", 14);
    \u0275\u0275text(2, "L\xEDneas de transferencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "table", 15)(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "Lote origen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 16);
    \u0275\u0275text(9, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Lote destino creado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, TransferDetailDialogComponent_Conditional_7_Conditional_34_For_14_Template, 10, 5, "tr", null, _forTrack05);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const t_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275repeater(t_r1.lines);
  }
}
function TransferDetailDialogComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div", 8)(3, "span", 9);
    \u0275\u0275text(4, "Producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 8)(8, "span", 9);
    \u0275\u0275text(9, "Cantidad total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 11);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 8)(14, "span", 9);
    \u0275\u0275text(15, "Origen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 10);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 8)(19, "span", 9);
    \u0275\u0275text(20, "Destino");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 10);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 8)(24, "span", 9);
    \u0275\u0275text(25, "Creado por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 10);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 8)(29, "span", 9);
    \u0275\u0275text(30, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 10);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(33, TransferDetailDialogComponent_Conditional_7_Conditional_33_Template, 5, 1, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(34, TransferDetailDialogComponent_Conditional_7_Conditional_34_Template, 15, 0, "section", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", t_r1.product_name, " (", t_r1.product_sku, ")");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(12, 12, t_r1.total_quantity), " ", t_r1.uom_name, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" ", t_r1.source_warehouse.billing_branch_code, " / ", t_r1.source_warehouse.name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", t_r1.destination_warehouse.billing_branch_code, " / ", t_r1.destination_warehouse.name, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((t_r1.created_by_user == null ? null : t_r1.created_by_user.name) || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.formatDate(t_r1.created_at));
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.notes ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(t_r1.lines && t_r1.lines.length > 0 ? 34 : -1);
  }
}
var TransferDetailDialogComponent = class _TransferDetailDialogComponent {
  data;
  dialogRef;
  transferService;
  dialog;
  X = X;
  ArrowUpRight = ArrowUpRight;
  ArrowDownLeft = ArrowDownLeft;
  transfer = signal(null, ...ngDevMode ? [{ debugName: "transfer" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  constructor(data, dialogRef, transferService, dialog) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.transferService = transferService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.transferService.getTransferById(this.data.transferId).subscribe({
      next: (transfer) => {
        this.transfer.set(transfer);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
  close() {
    this.dialogRef.close();
  }
  formatDate(dateString) {
    if (!dateString)
      return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  openBatchDetail(batchId, event) {
    event.stopPropagation();
    if (!batchId)
      return;
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId },
      width: "920px",
      maxWidth: "95vw",
      maxHeight: "90vh"
    });
  }
  static \u0275fac = function TransferDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TransferDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(InventoryTransferService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TransferDetailDialogComponent, selectors: [["app-transfer-detail-dialog"]], decls: 8, vars: 3, consts: [[1, "transfer-detail"], [1, "transfer-detail__header"], [1, "transfer-detail__title"], ["type", "button", "aria-label", "Cerrar", 1, "transfer-detail__close", 3, "click"], [1, "w-5", "h-5", 3, "img"], [1, "transfer-detail__loading"], [1, "transfer-detail__body"], [1, "info-grid"], [1, "info-item"], [1, "info-item__label"], [1, "info-item__value"], [1, "info-item__value", "info-item__value--highlight"], [1, "info-item", "info-item--full"], [1, "lines-section"], [1, "lines-section__title"], [1, "lines-table"], [1, "text-right"], ["type", "button", 1, "batch-link"], ["type", "button", 1, "batch-link", 3, "click"]], template: function TransferDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function TransferDetailDialogComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, TransferDetailDialogComponent_Conditional_6_Template, 2, 0, "div", 5)(7, TransferDetailDialogComponent_Conditional_7_Template, 35, 14, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_2_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.transfer()) == null ? null : tmp_0_0.folio) || "Transferencia");
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 6 : (tmp_2_0 = ctx.transfer()) ? 7 : -1, tmp_2_0);
    }
  }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent, RemoveTrailingZerosPipe], styles: ["\n\n.transfer-detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.transfer-detail__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.transfer-detail__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n}\n.transfer-detail__close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.25rem;\n  border-radius: 0.375rem;\n}\n.transfer-detail__close[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n}\n.transfer-detail__loading[_ngcontent-%COMP%] {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n}\n.transfer-detail__body[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem 1.25rem;\n  overflow-y: auto;\n}\n.info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem 1rem;\n  margin-bottom: 1.25rem;\n}\n.info-item--full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.info-item__label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #94a3b8;\n  margin-bottom: 0.125rem;\n}\n.info-item__value[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #1e293b;\n  font-weight: 500;\n}\n.info-item__value--highlight[_ngcontent-%COMP%] {\n  color: #059669;\n  font-weight: 600;\n}\n.lines-section__title[_ngcontent-%COMP%] {\n  margin: 0 0 0.625rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #6b7280;\n}\n.lines-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.8125rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  overflow: hidden;\n}\n.lines-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  padding: 0.5rem 0.75rem;\n  text-align: left;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #6b7280;\n  border-bottom: 1px solid #e5e7eb;\n}\n.lines-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #374151;\n}\n.lines-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.batch-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  color: #2563eb;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n}\n.batch-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n/*# sourceMappingURL=transfer-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransferDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-transfer-detail-dialog", standalone: true, imports: [CommonModule, RemoveTrailingZerosPipe, LucideAngularModule], template: `<div class="transfer-detail">\r
  <div class="transfer-detail__header">\r
    <h2 class="transfer-detail__title">{{ transfer()?.folio || 'Transferencia' }}</h2>\r
    <button type="button" class="transfer-detail__close" (click)="close()" aria-label="Cerrar">\r
      <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  @if (loading()) {\r
    <div class="transfer-detail__loading">Cargando...</div>\r
  } @else if (transfer(); as t) {\r
    <div class="transfer-detail__body">\r
      <div class="info-grid">\r
        <div class="info-item">\r
          <span class="info-item__label">Producto</span>\r
          <span class="info-item__value">{{ t.product_name }} ({{ t.product_sku }})</span>\r
        </div>\r
        <div class="info-item">\r
          <span class="info-item__label">Cantidad total</span>\r
          <span class="info-item__value info-item__value--highlight">\r
            {{ t.total_quantity | removeTrailingZeros }} {{ t.uom_name }}\r
          </span>\r
        </div>\r
        <div class="info-item">\r
          <span class="info-item__label">Origen</span>\r
          <span class="info-item__value">\r
            {{ t.source_warehouse.billing_branch_code }} / {{ t.source_warehouse.name }}\r
          </span>\r
        </div>\r
        <div class="info-item">\r
          <span class="info-item__label">Destino</span>\r
          <span class="info-item__value">\r
            {{ t.destination_warehouse.billing_branch_code }} / {{ t.destination_warehouse.name }}\r
          </span>\r
        </div>\r
        <div class="info-item">\r
          <span class="info-item__label">Creado por</span>\r
          <span class="info-item__value">{{ t.created_by_user?.name || '\u2014' }}</span>\r
        </div>\r
        <div class="info-item">\r
          <span class="info-item__label">Fecha</span>\r
          <span class="info-item__value">{{ formatDate(t.created_at) }}</span>\r
        </div>\r
        @if (t.notes) {\r
          <div class="info-item info-item--full">\r
            <span class="info-item__label">Notas</span>\r
            <span class="info-item__value">{{ t.notes }}</span>\r
          </div>\r
        }\r
      </div>\r
\r
      @if (t.lines && t.lines.length > 0) {\r
        <section class="lines-section">\r
          <h3 class="lines-section__title">L\xEDneas de transferencia</h3>\r
          <table class="lines-table">\r
            <thead>\r
              <tr>\r
                <th>Lote origen</th>\r
                <th class="text-right">Cantidad</th>\r
                <th>Lote destino creado</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (line of t.lines; track line.source_batch_number + line.destination_batch_number) {\r
                <tr>\r
                  <td>\r
                    @if (line.source_batch_id) {\r
                      <button\r
                        type="button"\r
                        class="batch-link"\r
                        (click)="openBatchDetail(line.source_batch_id, $event)">\r
                        {{ line.source_batch_number }}\r
                      </button>\r
                    } @else {\r
                      {{ line.source_batch_number }}\r
                    }\r
                  </td>\r
                  <td class="text-right">{{ line.quantity | removeTrailingZeros }}</td>\r
                  <td>\r
                    @if (line.destination_batch_id) {\r
                      <button\r
                        type="button"\r
                        class="batch-link"\r
                        (click)="openBatchDetail(line.destination_batch_id, $event)">\r
                        {{ line.destination_batch_number }}\r
                      </button>\r
                    } @else {\r
                      {{ line.destination_batch_number }}\r
                    }\r
                  </td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </section>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/features/inventory/components/transfer-detail-dialog/transfer-detail-dialog.component.scss */\n.transfer-detail {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.transfer-detail__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.transfer-detail__title {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n}\n.transfer-detail__close {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.25rem;\n  border-radius: 0.375rem;\n}\n.transfer-detail__close:hover {\n  background: #f3f4f6;\n}\n.transfer-detail__loading {\n  padding: 3rem;\n  text-align: center;\n  color: #6b7280;\n}\n.transfer-detail__body {\n  padding: 1rem 1.25rem 1.25rem;\n  overflow-y: auto;\n}\n.info-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem 1rem;\n  margin-bottom: 1.25rem;\n}\n.info-item--full {\n  grid-column: 1/-1;\n}\n.info-item__label {\n  display: block;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #94a3b8;\n  margin-bottom: 0.125rem;\n}\n.info-item__value {\n  font-size: 0.875rem;\n  color: #1e293b;\n  font-weight: 500;\n}\n.info-item__value--highlight {\n  color: #059669;\n  font-weight: 600;\n}\n.lines-section__title {\n  margin: 0 0 0.625rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #6b7280;\n}\n.lines-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.8125rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  overflow: hidden;\n}\n.lines-table th {\n  background: #f9fafb;\n  padding: 0.5rem 0.75rem;\n  text-align: left;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #6b7280;\n  border-bottom: 1px solid #e5e7eb;\n}\n.lines-table td {\n  padding: 0.5rem 0.75rem;\n  border-bottom: 1px solid #f3f4f6;\n  color: #374151;\n}\n.lines-table tbody tr:last-child td {\n  border-bottom: none;\n}\n.batch-link {\n  background: none;\n  border: none;\n  padding: 0;\n  color: #2563eb;\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n}\n.batch-link:hover {\n  text-decoration: underline;\n}\n.text-right {\n  text-align: right;\n}\n/*# sourceMappingURL=transfer-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: InventoryTransferService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TransferDetailDialogComponent, { className: "TransferDetailDialogComponent", filePath: "src/app/features/inventory/components/transfer-detail-dialog/transfer-detail-dialog.component.ts", lineNumber: 18 });
})();

export {
  InventoryTransferService,
  CreateTransferDialogComponent,
  TransferDetailDialogComponent,
  InventoryBatchService,
  BatchDetailDialogComponent,
  OrderDetailDialogComponent
};
//# sourceMappingURL=chunk-747ASUT4.js.map
