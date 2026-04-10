import {
  PurchaseOrderService
} from "./chunk-SFPCIKZR.js";
import {
  TaxCalculatorService
} from "./chunk-BUMMMPXI.js";
import {
  ProductDetailModalComponent,
  WarehouseDetailModalComponent
} from "./chunk-E2W2JU4V.js";
import {
  CustomSnackbarComponent
} from "./chunk-Y4MZBWJH.js";
import {
  ArrowRight,
  Calendar,
  FileText,
  LucideAngularComponent,
  LucideAngularModule,
  MapPin,
  Package,
  ShoppingCart,
  SquarePen,
  X
} from "./chunk-XYBC4MWB.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-KNFYVOET.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NumberValueAccessor,
  ReactiveFormsModule,
  ɵNgNoValidate
} from "./chunk-TXPVZZCM.js";
import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  NgClass
} from "./chunk-GZH4LDOW.js";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  Inject,
  Injectable,
  Pipe,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7ZU2RCPO.js";

// src/app/core/pipes/remove-trailing-zeros.pipe.ts
var RemoveTrailingZerosPipe = class _RemoveTrailingZerosPipe {
  transform(value) {
    if (value === null || value === void 0)
      return "";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num))
      return "";
    const str = num.toString();
    if (!str.includes(".")) {
      return str;
    }
    return str.replace(/\.?0+$/, "");
  }
  static \u0275fac = function RemoveTrailingZerosPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RemoveTrailingZerosPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "removeTrailingZeros", type: _RemoveTrailingZerosPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RemoveTrailingZerosPipe, [{
    type: Pipe,
    args: [{
      name: "removeTrailingZeros",
      standalone: true
    }]
  }], null, null);
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
var _forTrack0 = ($index, $item) => $item.id;
function ReceiptModalComponent_Conditional_4_Template(rf, ctx) {
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
function ReceiptModalComponent_Conditional_5_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 11)(2, "div", 12)(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 13);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 15)(10, "div", 16)(11, "label");
    \u0275\u0275text(12, "Cantidad Recibida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function ReceiptModalComponent_Conditional_5_For_7_Template_input_ngModelChange_13_listener($event) {
      const lineItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.receivedQuantities[lineItem_r4.id], $event) || (ctx_r0.receivedQuantities[lineItem_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 16)(15, "label");
    \u0275\u0275text(16, "Fecha Vencimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function ReceiptModalComponent_Conditional_5_For_7_Template_input_ngModelChange_17_listener($event) {
      const lineItem_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.receivedDates[lineItem_r4.id], $event) || (ctx_r0.receivedDates[lineItem_r4.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 16)(19, "label");
    \u0275\u0275text(20, "Pedimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 16)(23, "label");
    \u0275\u0275text(24, "Fecha de Pedimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 16)(27, "label");
    \u0275\u0275text(28, "Aduana");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 21);
    \u0275\u0275elementEnd()()();
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
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.receivedQuantities[lineItem_r4.id]);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(7, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.receivedDates[lineItem_r4.id]);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0));
  }
}
function ReceiptModalComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 4);
    \u0275\u0275listener("ngSubmit", function ReceiptModalComponent_Conditional_5_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 3)(2, "div", 5)(3, "h3");
    \u0275\u0275text(4, "Productos Ordenados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 6);
    \u0275\u0275repeaterCreate(6, ReceiptModalComponent_Conditional_5_For_7_Template, 30, 9, "div", 7, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 8)(9, "button", 9);
    \u0275\u0275listener("click", function ReceiptModalComponent_Conditional_5_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    });
    \u0275\u0275text(10, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 10);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r0.purchaseOrder.line_items);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.isLoading);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isLoading ? "Procesando..." : "Confirmar Recibo", " ");
  }
}
function ReceiptModalComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "p", 22);
    \u0275\u0275text(2, "Error: No se pudo cargar la orden de compra");
    \u0275\u0275elementEnd()();
  }
}
var ReceiptModalComponent = class _ReceiptModalComponent {
  fb;
  receiptService;
  snackBar;
  cdr;
  dialogRef;
  data;
  isLoading = false;
  purchaseOrder;
  receivedQuantities = {};
  receivedDates = {};
  constructor(fb, receiptService, snackBar, cdr, dialogRef, data) {
    this.fb = fb;
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
        this.receivedDates[item.id] = "";
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
      if (quantity > 0) {
        hasValidItems = true;
        receivedItems.push({
          line_item_id: lineItem.id,
          product_id: lineItem.product_id,
          product_uom_id: lineItem.product_uom?.id || lineItem.product_uom_id,
          quantity,
          unit_total: lineItem.unit_total || 0,
          iva_percentage: lineItem.iva_percentage || 0,
          iva_unit: lineItem.iva_unit || 0,
          ieps_percentage: lineItem.ieps_percentage || 0,
          ieps_unit: lineItem.ieps_unit || 0,
          expiration_date: this.receivedDates[lineItem.id] || ""
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
    return new (__ngFactoryType__ || _ReceiptModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ReceiptService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReceiptModalComponent, selectors: [["app-receipt-modal"]], decls: 7, vars: 2, consts: [[1, "receipt-modal"], [1, "modal-header"], [1, "folio"], [1, "modal-content"], [3, "ngSubmit"], [1, "section"], [1, "items-list"], [1, "item-row"], [1, "modal-actions"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "submit", 1, "btn-confirm", 3, "disabled"], [1, "item-info"], [1, "product-details"], [1, "sku"], [1, "ordered"], [1, "item-inputs-row"], [1, "input-group"], ["type", "number", "placeholder", "0", "min", "0", "step", "0.001", 1, "quantity-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "date", 1, "date-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "text", "placeholder", "N\xFAmero de pedimiento", 1, "text-input"], ["type", "date", 1, "date-input"], ["type", "text", "placeholder", "Aduana", 1, "text-input"], [1, "error-message"]], template: function ReceiptModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Recibo de Orden de Compra");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, ReceiptModalComponent_Conditional_4_Template, 2, 1, "p", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, ReceiptModalComponent_Conditional_5_Template, 13, 3, "form")(6, ReceiptModalComponent_Conditional_6_Template, 3, 0, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional((ctx.purchaseOrder == null ? null : ctx.purchaseOrder.folio) ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.purchaseOrder ? 5 : 6);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormsModule, NgModel, NgForm], styles: ["\n\n.receipt-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 600px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n  background: white;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n}\n.modal-header[_ngcontent-%COMP%]   .folio[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #6b7280;\n  margin: 0;\n  font-weight: 600;\n}\n.modal-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.modal-content[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  color: #f44336;\n  text-align: center;\n  padding: 2rem;\n  font-weight: 600;\n}\n.section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 1rem 0;\n}\n.items-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.item-row[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.item-row[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%] {\n  order: -1;\n}\n.item-row[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 0.3rem 0;\n}\n.item-row[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .sku[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #6b7280;\n  margin: 0 0 0.2rem 0;\n}\n.item-row[_ngcontent-%COMP%]   .item-info[_ngcontent-%COMP%]   .product-details[_ngcontent-%COMP%]   .ordered[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #667eea;\n  margin: 0;\n  font-weight: 600;\n}\n.item-row[_ngcontent-%COMP%]   .item-inputs-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n}\n.input-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n}\n.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 0.6rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  background: white;\n}\n.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.input-group[_ngcontent-%COMP%]   .quantity-input[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.input-group[_ngcontent-%COMP%]   .date-input[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.modal-actions[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background: white;\n  display: flex;\n  gap: 1rem;\n}\n.modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.modal-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e5e7eb;\n  color: #6b7280;\n}\n.modal-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.modal-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50 0%,\n      #45a049 100%);\n  border: none;\n  color: white;\n}\n.modal-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);\n}\n/*# sourceMappingURL=receipt-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReceiptModalComponent, [{
    type: Component,
    args: [{ selector: "app-receipt-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule], template: `<div class="receipt-modal">\r
  <div class="modal-header">\r
    <h2>Recibo de Orden de Compra</h2>\r
    @if (purchaseOrder?.folio) {\r
      <p class="folio">{{ purchaseOrder.folio }}</p>\r
    }\r
  </div>\r
\r
  @if (purchaseOrder) {\r
    <form (ngSubmit)="onSubmit()">\r
      <div class="modal-content">\r
        <div class="section">\r
          <h3>Productos Ordenados</h3>\r
          \r
          <div class="items-list">\r
            @for (lineItem of purchaseOrder.line_items; track lineItem.id; let i = $index) {\r
              <div class="item-row">\r
                <div class="item-info">\r
                  <div class="product-details">\r
                    <h4>{{ getProductName(lineItem) }}</h4>\r
                    <p class="sku">SKU: {{ getProductSku(lineItem) }}</p>\r
                    <p class="ordered">Ordenado: {{ getOrderedQuantity(lineItem) }}</p>\r
                  </div>\r
                </div>\r
\r
                <div class="item-inputs-row">\r
                  <div class="input-group">\r
                    <label>Cantidad Recibida</label>\r
                    <input \r
                      type="number" \r
                      [(ngModel)]="receivedQuantities[lineItem.id]"\r
                      [ngModelOptions]="{standalone: true}"\r
                      placeholder="0"\r
                      min="0"\r
                      step="0.001"\r
                      class="quantity-input"\r
                    />\r
                  </div>\r
\r
                  <div class="input-group">\r
                    <label>Fecha Vencimiento</label>\r
                    <input \r
                      type="date" \r
                      [(ngModel)]="receivedDates[lineItem.id]"\r
                      [ngModelOptions]="{standalone: true}"\r
                      class="date-input"\r
                    />\r
                  </div>\r
\r
                  <div class="input-group">\r
                    <label>Pedimiento</label>\r
                    <input \r
                      type="text" \r
                      placeholder="N\xFAmero de pedimiento"\r
                      class="text-input"\r
                    />\r
                  </div>\r
\r
                  <div class="input-group">\r
                    <label>Fecha de Pedimiento</label>\r
                    <input \r
                      type="date" \r
                      class="date-input"\r
                    />\r
                  </div>\r
\r
                  <div class="input-group">\r
                    <label>Aduana</label>\r
                    <input \r
                      type="text" \r
                      placeholder="Aduana"\r
                      class="text-input"\r
                    />\r
                  </div>\r
                </div>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="modal-actions">\r
        <button \r
          type="button"\r
          class="btn-cancel"\r
          (click)="onCancel()"\r
          [disabled]="isLoading"\r
        >\r
          Cancelar\r
        </button>\r
        <button \r
          type="submit"\r
          class="btn-confirm"\r
          [disabled]="isLoading"\r
        >\r
          {{ isLoading ? 'Procesando...' : 'Confirmar Recibo' }}\r
        </button>\r
      </div>\r
    </form>\r
  } @else {\r
    <div class="modal-content">\r
      <p class="error-message">Error: No se pudo cargar la orden de compra</p>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/features/purchase-orders/components/receipt-modal/receipt-modal.component.scss */\n.receipt-modal {\n  width: 100%;\n  max-width: 600px;\n}\n.modal-header {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n  background: white;\n}\n.modal-header h2 {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 0.5rem 0;\n}\n.modal-header .folio {\n  font-size: 0.9rem;\n  color: #6b7280;\n  margin: 0;\n  font-weight: 600;\n}\n.modal-content {\n  padding: 1.5rem;\n  max-height: 400px;\n  overflow-y: auto;\n}\n.modal-content .error-message {\n  color: #f44336;\n  text-align: center;\n  padding: 2rem;\n  font-weight: 600;\n}\n.section h3 {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 1rem 0;\n}\n.items-list {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.item-row {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.item-row .item-info {\n  order: -1;\n}\n.item-row .item-info .product-details h4 {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin: 0 0 0.3rem 0;\n}\n.item-row .item-info .product-details .sku {\n  font-size: 0.8rem;\n  color: #6b7280;\n  margin: 0 0 0.2rem 0;\n}\n.item-row .item-info .product-details .ordered {\n  font-size: 0.8rem;\n  color: #667eea;\n  margin: 0;\n  font-weight: 600;\n}\n.item-row .item-inputs-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n}\n.input-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.input-group label {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n}\n.input-group input {\n  padding: 0.6rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  background: white;\n}\n.input-group input:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.input-group .quantity-input {\n  font-weight: 600;\n}\n.input-group .date-input {\n  font-size: 0.85rem;\n}\n.modal-actions {\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background: white;\n  display: flex;\n  gap: 1rem;\n}\n.modal-actions button {\n  flex: 1;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.modal-actions button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-actions .btn-cancel {\n  background: white;\n  border: 1px solid #e5e7eb;\n  color: #6b7280;\n}\n.modal-actions .btn-cancel:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.modal-actions .btn-confirm {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50 0%,\n      #45a049 100%);\n  border: none;\n  color: white;\n}\n.modal-actions .btn-confirm:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);\n}\n/*# sourceMappingURL=receipt-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ReceiptService }, { type: MatSnackBar }, { type: ChangeDetectorRef }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReceiptModalComponent, { className: "ReceiptModalComponent", filePath: "src/app/features/purchase-orders/components/receipt-modal/receipt-modal.component.ts", lineNumber: 31 });
})();

// src/app/features/purchase-orders/components/order-detail-dialog/order-detail-dialog.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function OrderDetailDialogComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "p", 2);
    \u0275\u0275text(2, "Cargando orden...");
    \u0275\u0275elementEnd()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_96_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.initiateReceipt());
    });
    \u0275\u0275element(1, "i", 54);
    \u0275\u0275text(2, " Iniciar Recibo ");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_97_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_97_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelOrder());
    });
    \u0275\u0275element(1, "i", 56);
    \u0275\u0275text(2, " Cancelar requisici\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_109_Conditional_13_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 58)(3, "strong");
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
    \u0275\u0275pipe(11, "removeTrailingZeros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((item_r5.product == null ? null : item_r5.product.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r5.product == null ? null : item_r5.product.sku) || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency((item_r5.unit_total || 0) * ctx_r1.parseNumber(item_r5.quantity)));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(11, 7, item_r5.quantity), " ", (item_r5.product_uom == null ? null : item_r5.product_uom.uom == null ? null : item_r5.product_uom.uom.name) || "Unidad");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(14, 9, item_r5.received_original_quantity), " ", (item_r5.received_uom == null ? null : item_r5.received_uom.name) || "-");
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_109_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OrderDetailDialogComponent_Conditional_2_Conditional_109_Conditional_13_For_1_Template, 15, 11, "tr", null, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r1.order().line_items);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_109_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 59)(2, "div", 60);
    \u0275\u0275element(3, "i", 21);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No hay productos");
    \u0275\u0275elementEnd()()()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_109_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "table", 57)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "SOLICITADAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "RECIBIDAS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275conditionalCreate(13, OrderDetailDialogComponent_Conditional_2_Conditional_109_Conditional_13_Template, 2, 0)(14, OrderDetailDialogComponent_Conditional_2_Conditional_109_Conditional_14_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(ctx_r1.order().line_items && ctx_r1.order().line_items.length > 0 ? 13 : 14);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 63);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 64);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 63);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 64);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.regenerateReceivingPDF());
    });
    \u0275\u0275conditionalCreate(1, OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_6_Conditional_1_Template, 1, 0, "i", 63)(2, OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_6_Conditional_2_Template, 1, 0, "i", 64);
    \u0275\u0275text(3, " Regenerar PDF Recibo ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.regeneratingReceipt());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.regeneratingReceipt() ? 1 : 2);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_10_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 69);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "span", 70);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "span", 71);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "div", 72)(12, "button", 73);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_10_For_13_Template_button_click_12_listener() {
      const doc_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.downloadDocument(doc_r9));
    });
    \u0275\u0275element(13, "i", 74);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 75);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_10_For_13_Template_button_click_14_listener() {
      const doc_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deleteDocument(doc_r9));
    });
    \u0275\u0275element(15, "i", 76);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const doc_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r1.getDocumentBadgeClass(doc_r9.document_type_name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r9.document_type_name, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(doc_r9.document_name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDocumentDate(doc_r9.uploaded_at));
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 68)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "TIPO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "NOMBRE DE ARCHIVO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "FECHA DE CARGA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_10_For_13_Template, 16, 4, "tr", null, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r1.order().documents);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275element(1, "i", 23);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay documentos adjuntos");
    \u0275\u0275elementEnd()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_110_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 61)(2, "button", 62);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_110_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.regeneratePDF());
    });
    \u0275\u0275conditionalCreate(3, OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_3_Template, 1, 0, "i", 63)(4, OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_4_Template, 1, 0, "i", 64);
    \u0275\u0275text(5, " Regenerar PDF Original ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_6_Template, 4, 2, "button", 65);
    \u0275\u0275elementStart(7, "button", 66);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_110_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.uploadDocument());
    });
    \u0275\u0275element(8, "i", 67);
    \u0275\u0275text(9, " Subir Documento ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_10_Template, 14, 0, "table", 68)(11, OrderDetailDialogComponent_Conditional_2_Conditional_110_Conditional_11_Template, 4, 0, "div", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.regeneratingPDF());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.regeneratingPDF() ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.order().general_status === "Recibida" ? 6 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.hasDocuments() ? 10 : 11);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_111_Conditional_1_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 77);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Conditional_111_Conditional_1_For_11_Template_span_click_2_listener() {
      const batch_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openBatchDetail(batch_r11));
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div", 58)(6, "strong");
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
    const batch_r11 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", batch_r11.batch_number, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((batch_r11.product == null ? null : batch_r11.product.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((batch_r11.product == null ? null : batch_r11.product.sku) || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(12, 5, batch_r11.initial_quantity), " ", (batch_r11.uom == null ? null : batch_r11.uom.name) || "Unidad");
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_111_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 57)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "LOTE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "CANTIDAD");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275repeaterCreate(10, OrderDetailDialogComponent_Conditional_2_Conditional_111_Conditional_1_For_11_Template, 13, 7, "tr", null, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r1.order().batches);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_111_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275element(1, "i", 78);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay lotes registrados");
    \u0275\u0275elementEnd()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_111_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275conditionalCreate(1, OrderDetailDialogComponent_Conditional_2_Conditional_111_Conditional_1_Template, 12, 0, "table", 57)(2, OrderDetailDialogComponent_Conditional_2_Conditional_111_Conditional_2_Template, 4, 0, "div", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.order()) == null ? null : tmp_2_0.batches) && ctx_r1.order().batches.length > 0 ? 1 : 2);
  }
}
function OrderDetailDialogComponent_Conditional_2_Conditional_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 60);
    \u0275\u0275element(2, "i", 79);
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay pagos registrados");
    \u0275\u0275elementEnd()()();
  }
}
function OrderDetailDialogComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "h2", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 7);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275element(7, "i", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 9)(9, "div", 10)(10, "div", 11)(11, "div", 12)(12, "div", 13);
    \u0275\u0275element(13, "i", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 15)(15, "span", 16);
    \u0275\u0275text(16, "CREADO POR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 17);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 12)(20, "div", 18);
    \u0275\u0275element(21, "i", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 15)(23, "span", 16);
    \u0275\u0275text(24, "PROVEEDOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 17);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 12)(28, "div", 20);
    \u0275\u0275element(29, "i", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 15)(31, "span", 16);
    \u0275\u0275text(32, "PARA ALMAC\xC9N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 17);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(35, "div", 12)(36, "div", 22);
    \u0275\u0275element(37, "i", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 15)(39, "span", 16);
    \u0275\u0275text(40, "FOLIO FISCAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 17);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "div", 24)(44, "h3", 25);
    \u0275\u0275text(45, "FECHAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 26)(47, "span", 27);
    \u0275\u0275text(48, "Fecha recepci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "span", 28);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 26)(52, "span", 27);
    \u0275\u0275text(53, "Estado de pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span", 29);
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(56, "div", 24)(57, "div", 30)(58, "h3", 25);
    \u0275\u0275text(59, "TOTALES");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "div", 31)(61, "button", 32);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleTotals(false));
    });
    \u0275\u0275text(62, " Solicitados ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "button", 32);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_63_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleTotals(true));
    });
    \u0275\u0275text(64, " Recibidos ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(65, "div", 33)(66, "div", 34)(67, "span", 35);
    \u0275\u0275text(68, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "span", 36);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 34)(72, "span", 35);
    \u0275\u0275text(73, "IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "span", 36);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 34)(77, "span", 35);
    \u0275\u0275text(78, "IEPS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "span", 36);
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(81, "div", 37);
    \u0275\u0275elementStart(82, "div", 38)(83, "span", 39);
    \u0275\u0275text(84, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "span", 40);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(87, "div", 24)(88, "div", 41)(89, "h3", 25);
    \u0275\u0275text(90, "NOTAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "button", 42);
    \u0275\u0275element(92, "i", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "p", 44);
    \u0275\u0275text(94);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 45);
    \u0275\u0275conditionalCreate(96, OrderDetailDialogComponent_Conditional_2_Conditional_96_Template, 3, 0, "button", 46);
    \u0275\u0275conditionalCreate(97, OrderDetailDialogComponent_Conditional_2_Conditional_97_Template, 3, 0, "button", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "div", 48)(99, "div", 49)(100, "button", 50);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_100_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTabIndex.set(0));
    });
    \u0275\u0275text(101, " Productos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "button", 50);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_102_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTabIndex.set(1));
    });
    \u0275\u0275text(103, " Documentos ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "button", 50);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_104_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTabIndex.set(2));
    });
    \u0275\u0275text(105, " Lotes ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "button", 50);
    \u0275\u0275listener("click", function OrderDetailDialogComponent_Conditional_2_Template_button_click_106_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTabIndex.set(3));
    });
    \u0275\u0275text(107, " Pagos ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(108, "div", 51);
    \u0275\u0275conditionalCreate(109, OrderDetailDialogComponent_Conditional_2_Conditional_109_Template, 15, 1, "div", 52);
    \u0275\u0275conditionalCreate(110, OrderDetailDialogComponent_Conditional_2_Conditional_110_Template, 12, 4, "div", 52);
    \u0275\u0275conditionalCreate(111, OrderDetailDialogComponent_Conditional_2_Conditional_111_Template, 3, 1, "div", 52);
    \u0275\u0275conditionalCreate(112, OrderDetailDialogComponent_Conditional_2_Conditional_112_Template, 5, 0, "div", 52);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", ctx_r1.order().folio || ctx_r1.order().id.substring(0, 6));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.order().general_status === "Creada" ? "bg-yellow-100 text-yellow-700" : ctx_r1.order().general_status === "Recibida" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.order().general_status || ctx_r1.order().status, " ");
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate2("", (tmp_4_0 = ctx_r1.order().creator) == null ? null : tmp_4_0.first_name, " ", ((tmp_4_0 = ctx_r1.order().creator) == null ? null : tmp_4_0.last_name) || "N/A");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(((tmp_5_0 = ctx_r1.order().vendor) == null ? null : tmp_5_0.name) || "N/A");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r1.order().warehouse) == null ? null : tmp_6_0.name) || "N/A");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(((tmp_7_0 = ctx_r1.order().fiscal_configuration) == null ? null : tmp_7_0.razon_social) || "N/A");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.order().expected_delivery_date || "-");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.order().payment_status === "Pendiente" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.order().payment_status, " ");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", !ctx_r1.showReceivedTotals());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.showReceivedTotals());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.getSubtotal());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getIVA());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getIEPS());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r1.getTotalColor());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getTotal());
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.order().notes || "Sin notas");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.canReceive() ? 96 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canCancel() ? 97 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.activeTabIndex() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTabIndex() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTabIndex() === 2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTabIndex() === 3);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.activeTabIndex() === 0 ? 109 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTabIndex() === 1 ? 110 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTabIndex() === 2 ? 111 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTabIndex() === 3 ? 112 : -1);
  }
}
var OrderDetailDialogComponent = class _OrderDetailDialogComponent {
  data;
  dialogRef;
  purchaseOrderService;
  taxCalculator;
  snackBar;
  cdr;
  dialog;
  order = signal(null, ...ngDevMode ? [{ debugName: "order" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  activeTabIndex = signal(0, ...ngDevMode ? [{ debugName: "activeTabIndex" }] : []);
  showReceivedTotals = signal(false, ...ngDevMode ? [{ debugName: "showReceivedTotals" }] : []);
  regeneratingPDF = signal(false, ...ngDevMode ? [{ debugName: "regeneratingPDF" }] : []);
  regeneratingReceipt = signal(false, ...ngDevMode ? [{ debugName: "regeneratingReceipt" }] : []);
  canReceive = computed(() => {
    const order = this.order();
    return order && order.general_status !== "Recibida";
  }, ...ngDevMode ? [{ debugName: "canReceive" }] : []);
  canCancel = computed(() => {
    const order = this.order();
    return order && order.general_status !== "Recibida";
  }, ...ngDevMode ? [{ debugName: "canCancel" }] : []);
  constructor(data, dialogRef, purchaseOrderService, taxCalculator, snackBar, cdr, dialog) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.purchaseOrderService = purchaseOrderService;
    this.taxCalculator = taxCalculator;
    this.snackBar = snackBar;
    this.cdr = cdr;
    this.dialog = dialog;
    this.loadOrder();
  }
  loadOrder() {
    this.loading.set(true);
    this.purchaseOrderService.getOrderById(this.data.orderId).subscribe({
      next: (response) => {
        if (response.data?.header) {
          const orderData = response.data.header;
          if (response.data.documents) {
            orderData.documents = response.data.documents;
          }
          if (response.data.batches && response.data.batches.length > 0) {
            orderData.batches = response.data.batches;
          }
          if (response.data.payments) {
            orderData.payments = response.data.payments;
          }
          this.order.set(orderData);
        } else {
          this.order.set(response);
        }
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
  parseNumber(value) {
    return typeof value === "string" ? parseFloat(value) : value;
  }
  initiateReceipt() {
    const order = this.order();
    if (!order)
      return;
    const dialogRef = this.dialog.open(ReceiptModalComponent, {
      data: { purchaseOrder: order },
      width: "600px",
      maxWidth: "95vw",
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
  regeneratePDF() {
    const orderId = this.order()?.id;
    if (!orderId)
      return;
    this.regeneratingPDF.set(true);
    this.purchaseOrderService.regenerateOriginalPDF(orderId).subscribe({
      next: () => {
        this.regeneratingPDF.set(false);
        this.cdr.detectChanges();
        this.snackBar.open("PDF original regenerado exitosamente", "Cerrar", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.loadOrder();
      },
      error: (error) => {
        this.regeneratingPDF.set(false);
        this.cdr.detectChanges();
        this.snackBar.open("Error al regenerar PDF original", "Cerrar", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["error-snackbar"]
        });
        console.error("Error regenerating original PDF:", error);
      }
    });
  }
  regenerateReceivingPDF() {
    const orderId = this.order()?.id;
    if (!orderId)
      return;
    this.regeneratingReceipt.set(true);
    this.purchaseOrderService.regenerateReceiptPDF(orderId).subscribe({
      next: () => {
        this.regeneratingReceipt.set(false);
        this.cdr.detectChanges();
        this.snackBar.open("PDF de recepci\xF3n regenerado exitosamente", "Cerrar", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.loadOrder();
      },
      error: (error) => {
        this.regeneratingReceipt.set(false);
        this.cdr.detectChanges();
        this.snackBar.open("Error al regenerar PDF de recepci\xF3n", "Cerrar", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["error-snackbar"]
        });
        console.error("Error regenerating receipt PDF:", error);
      }
    });
  }
  uploadDocument() {
    console.log("Subir documento");
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
    console.log("Eliminar documento:", doc.id);
  }
  hasDocuments() {
    const order = this.order();
    return order && order.documents && order.documents.length > 0;
  }
  openBatchDetail(batch) {
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId: batch.id },
      width: "920px",
      maxWidth: "95vw",
      maxHeight: "90vh"
    });
  }
  static \u0275fac = function OrderDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(TaxCalculatorService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderDetailDialogComponent, selectors: [["app-order-detail-dialog"]], hostAttrs: [1, "order-detail-dialog-container"], decls: 3, vars: 2, consts: [[1, "order-detail-dialog"], [1, "loading-container"], [1, "text-gray-500"], [1, "dialog-header"], [1, "flex", "items-center", "gap-3"], [1, "text-xl", "font-bold", "text-gray-900"], [1, "px-3", "py-1", "rounded", "text-xs", "font-semibold", 3, "ngClass"], [1, "close-btn", 3, "click"], [1, "fi", "fi-rr-cross-small"], [1, "dialog-content"], [1, "sidebar"], [1, "info-cards-group"], [1, "info-card"], [1, "card-icon", "bg-blue-100", "text-blue-600"], [1, "fi", "fi-rr-user"], [1, "card-text"], [1, "card-label"], [1, "card-value"], [1, "card-icon", "bg-green-100", "text-green-600"], [1, "fi", "fi-rr-truck-side"], [1, "card-icon", "bg-orange-100", "text-orange-600"], [1, "fi", "fi-rr-box"], [1, "card-icon", "bg-purple-100", "text-purple-600"], [1, "fi", "fi-rr-document"], [1, "section"], [1, "section-title"], [1, "section-item"], [1, "section-label"], [1, "section-value"], [1, "px-2", "py-1", "rounded", "text-xs", "font-semibold", 3, "ngClass"], [1, "section-header"], [1, "toggle-container"], [1, "toggle-btn", 3, "click"], [1, "totals-card"], [1, "totals-row"], [1, "totals-label"], [1, "totals-value"], [1, "totals-divider"], [1, "totals-row", "totals-row-total"], [1, "totals-label-total"], [1, "totals-value-total", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-gray-400", "hover:text-gray-600"], [1, "fi", "fi-rr-pencil", "text-sm"], [1, "text-sm", "text-gray-600"], [1, "action-buttons"], [1, "btn-receive"], [1, "btn-cancel"], [1, "main-content"], [1, "tabs-header"], [1, "tab-button", 3, "click"], [1, "tabs-content"], [1, "tab-content-wrapper"], [1, "btn-receive", 3, "click"], [1, "fi", "fi-rr-gift"], [1, "btn-cancel", 3, "click"], [1, "fi", "fi-rr-cross-circle"], [1, "products-table"], [1, "product-info"], ["colspan", "4", 1, "text-center"], [1, "empty-state"], [1, "tab-header"], [1, "btn-secondary", 3, "click", "disabled"], [1, "fi", "fi-rr-spinner", "animate-spin"], [1, "fi", "fi-rr-refresh"], [1, "btn-secondary", 3, "disabled"], [1, "btn-primary", 3, "click"], [1, "fi", "fi-rr-upload"], [1, "documents-table"], [1, "document-badge", 3, "ngClass"], [1, "document-name"], [1, "document-date"], [1, "document-actions"], ["title", "Descargar", 1, "action-btn", "download-btn", 3, "click"], [1, "fi", "fi-rr-download"], ["title", "Eliminar", 1, "action-btn", "delete-btn", 3, "click"], [1, "fi", "fi-rr-trash"], [1, "inline-flex", "items-center", "px-3", "py-1", "rounded", "text-xs", "font-semibold", "bg-blue-100", "text-blue-700", "cursor-pointer", "hover:bg-blue-200", "transition-colors", 3, "click"], [1, "fi", "fi-rr-layers"], [1, "fi", "fi-rr-credit-card"]], template: function OrderDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, OrderDetailDialogComponent_Conditional_1_Template, 3, 0, "div", 1);
      \u0275\u0275conditionalCreate(2, OrderDetailDialogComponent_Conditional_2_Template, 113, 35);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.order() && !ctx.loading() ? 2 : -1);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    MatDialogModule,
    MatSnackBarModule,
    RemoveTrailingZerosPipe
  ], styles: ["\n\n.order-detail-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n  background: #f9fafb;\n  width: 1600px;\n  max-width: 95vw;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background: #f9fafb;\n  color: #9ca3af;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #1f2937;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 380px;\n  background: #f8f9fc;\n  padding: 1.3rem;\n  overflow-y: auto;\n  border-right: 1px solid #e5e7eb;\n  display: flex;\n  flex-direction: column;\n  gap: 1.3rem;\n}\n.info-cards-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.info-card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n  font-size: 1.2rem;\n  flex-shrink: 0;\n}\n.info-card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.info-card[_ngcontent-%COMP%]   .card-label[_ngcontent-%COMP%] {\n  font-size: 0.55rem;\n  font-weight: 700;\n  color: #9ca3af;\n  letter-spacing: 0.08em;\n}\n.info-card[_ngcontent-%COMP%]   .card-value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 700;\n  color: #6b7280;\n  letter-spacing: 0.08em;\n  margin: 0;\n  text-transform: uppercase;\n}\n.section[_ngcontent-%COMP%]   .section-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.8rem;\n  padding: 0.4rem 0;\n  border-bottom: 1px solid #f3f4f6;\n}\n.section[_ngcontent-%COMP%]   .section-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.section[_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.8rem;\n}\n.section[_ngcontent-%COMP%]   .section-value[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1f2937;\n}\n.section[_ngcontent-%COMP%]:first-of-type {\n  background: white;\n  padding: 0.75rem;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.section-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.toggle-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.25rem;\n  background: #f3f4f6;\n  padding: 0.2rem;\n  border-radius: 6px;\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 0.2rem 0.5rem;\n  border: none;\n  background: transparent;\n  color: #9ca3af;\n  font-size: 0.65rem;\n  font-weight: 600;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn.active[_ngcontent-%COMP%] {\n  background: white;\n  color: #3b82f6;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%]:hover:not(.active) {\n  color: #6b7280;\n}\n.totals-card[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  padding: 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.8rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-label[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-weight: 500;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1f2937;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #e5e7eb;\n  margin: 0.2rem 0;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%] {\n  padding-top: 0.2rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%]   .totals-label-total[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%]   .totals-value-total[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  margin-top: auto;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.6rem 1rem;\n  border: none;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n}\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-receive[_ngcontent-%COMP%] {\n  background: #10b981;\n  color: white;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-receive[_ngcontent-%COMP%]:hover {\n  background: #059669;\n  transform: translateY(-1px);\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: #fecaca;\n  color: #dc2626;\n}\n.action-buttons[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover {\n  background: #fca5a5;\n  transform: translateY(-1px);\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: white;\n}\n.tabs-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1.5rem;\n}\n.tab-button[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.tab-button[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.tab-button.active[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.tabs-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n}\n.detail-tabs[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-nav {\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1.5rem;\n  margin: 0;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-nav-link {\n  padding: 1rem 1.5rem;\n  font-weight: 500;\n  color: #6b7280;\n  border: none;\n  background: transparent;\n  border-bottom: 2px solid transparent;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-nav-link:hover {\n  color: #1f2937;\n  background: transparent;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-nav-link:focus {\n  box-shadow: none;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-highlight .p-tabview-nav-link {\n  color: #3b82f6;\n  border-bottom: 2px solid #3b82f6;\n  background: transparent;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-panels {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n  padding: 0;\n}\n.detail-tabs[_ngcontent-%COMP%]     .p-tabview-panel {\n  height: 100%;\n}\n.tab-content-wrapper[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  height: 100%;\n  overflow-y: auto;\n}\n.tab-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n  align-items: center;\n  justify-content: flex-end;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.65rem;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: #4b5563;\n  color: white;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #3a4452;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #2563eb;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 3rem;\n  color: #9ca3af;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 3rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.products-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #1f2937;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1f2937;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.documents-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.documents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.documents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #1f2937;\n}\n.document-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.document-badge.badge-blue[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-badge.badge-green[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.document-badge.badge-gray[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.document-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #1f2937;\n  word-break: break-word;\n}\n.document-date[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.document-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 0.9rem;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.download-btn[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.download-btn[_ngcontent-%COMP%]:hover {\n  background: #bfdbfe;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.delete-btn[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.delete-btn[_ngcontent-%COMP%]:hover {\n  background: #fecaca;\n}\n/*# sourceMappingURL=order-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-order-detail-dialog", standalone: true, imports: [
      CommonModule,
      MatDialogModule,
      MatSnackBarModule,
      RemoveTrailingZerosPipe
    ], schemas: [CUSTOM_ELEMENTS_SCHEMA], host: {
      "class": "order-detail-dialog-container"
    }, template: `<div class="order-detail-dialog">\r
  @if (loading()) {\r
    <div class="loading-container">\r
      <p class="text-gray-500">Cargando orden...</p>\r
    </div>\r
  }\r
\r
  @if (order() && !loading()) {\r
    <!-- Header -->\r
    <div class="dialog-header">\r
      <div class="flex items-center gap-3">\r
        <h2 class="text-xl font-bold text-gray-900">#{{ order()!.folio || order()!.id.substring(0, 6) }}</h2>\r
        <span class="px-3 py-1 rounded text-xs font-semibold" \r
              [ngClass]="order()!.general_status === 'Creada' ? 'bg-yellow-100 text-yellow-700' : \r
                         order()!.general_status === 'Recibida' ? 'bg-green-100 text-green-700' : \r
                         'bg-gray-100 text-gray-700'">\r
          {{ order()!.general_status || order()!.status }}\r
        </span>\r
      </div>\r
      <button (click)="close()" class="close-btn">\r
        <i class="fi fi-rr-cross-small"></i>\r
      </button>\r
    </div>\r
\r
    <!-- Sidebar and Content Layout -->\r
    <div class="dialog-content">\r
      <!-- Left Sidebar -->\r
      <div class="sidebar">\r
        <!-- Info Cards -->\r
        <!-- Info Cards Container -->\r
        <div class="info-cards-group">\r
          <div class="info-card">\r
            <div class="card-icon bg-blue-100 text-blue-600">\r
              <i class="fi fi-rr-user"></i>\r
            </div>\r
            <div class="card-text">\r
              <span class="card-label">CREADO POR</span>\r
              <span class="card-value">{{ order()!.creator?.first_name }} {{ order()!.creator?.last_name || 'N/A' }}</span>\r
            </div>\r
          </div>\r
\r
          <div class="info-card">\r
            <div class="card-icon bg-green-100 text-green-600">\r
              <i class="fi fi-rr-truck-side"></i>\r
            </div>\r
            <div class="card-text">\r
              <span class="card-label">PROVEEDOR</span>\r
              <span class="card-value">{{ order()!.vendor?.name || 'N/A' }}</span>\r
            </div>\r
          </div>\r
\r
          <div class="info-card">\r
            <div class="card-icon bg-orange-100 text-orange-600">\r
              <i class="fi fi-rr-box"></i>\r
            </div>\r
            <div class="card-text">\r
              <span class="card-label">PARA ALMAC\xC9N</span>\r
              <span class="card-value">{{ order()!.warehouse?.name || 'N/A' }}</span>\r
            </div>\r
          </div>\r
\r
          <div class="info-card">\r
            <div class="card-icon bg-purple-100 text-purple-600">\r
              <i class="fi fi-rr-document"></i>\r
            </div>\r
            <div class="card-text">\r
              <span class="card-label">FOLIO FISCAL</span>\r
              <span class="card-value">{{ order()!.fiscal_configuration?.razon_social || 'N/A' }}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Fechas -->\r
        <div class="section">\r
          <h3 class="section-title">FECHAS</h3>\r
          <div class="section-item">\r
            <span class="section-label">Fecha recepci\xF3n</span>\r
            <span class="section-value">{{ order()!.expected_delivery_date || '-' }}</span>\r
          </div>\r
          <div class="section-item">\r
            <span class="section-label">Estado de pago</span>\r
            <span class="px-2 py-1 rounded text-xs font-semibold" \r
                  [ngClass]="order()!.payment_status === 'Pendiente' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'">\r
              {{ order()!.payment_status }}\r
            </span>\r
          </div>\r
        </div>\r
\r
        <!-- Totales with Toggle -->\r
        <div class="section">\r
          <div class="section-header">\r
            <h3 class="section-title">TOTALES</h3>\r
            <!-- Toggle -->\r
            <div class="toggle-container">\r
              <button \r
                class="toggle-btn"\r
                [class.active]="!showReceivedTotals()"\r
                (click)="toggleTotals(false)">\r
                Solicitados\r
              </button>\r
              <button \r
                class="toggle-btn"\r
                [class.active]="showReceivedTotals()"\r
                (click)="toggleTotals(true)">\r
                Recibidos\r
              </button>\r
            </div>\r
          </div>\r
\r
          <!-- Totals Card -->\r
          <div class="totals-card">\r
            <div class="totals-row">\r
              <span class="totals-label">Subtotal</span>\r
              <span class="totals-value">{{ getSubtotal() }}</span>\r
            </div>\r
            <div class="totals-row">\r
              <span class="totals-label">IVA</span>\r
              <span class="totals-value">{{ getIVA() }}</span>\r
            </div>\r
            <div class="totals-row">\r
              <span class="totals-label">IEPS</span>\r
              <span class="totals-value">{{ getIEPS() }}</span>\r
            </div>\r
            <div class="totals-divider"></div>\r
            <div class="totals-row totals-row-total">\r
              <span class="totals-label-total">Total</span>\r
              <span class="totals-value-total" [ngClass]="getTotalColor()">{{ getTotal() }}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Notes -->\r
        <div class="section">\r
          <div class="flex items-center justify-between mb-2">\r
            <h3 class="section-title">NOTAS</h3>\r
            <button class="text-gray-400 hover:text-gray-600">\r
              <i class="fi fi-rr-pencil text-sm"></i>\r
            </button>\r
          </div>\r
          <p class="text-sm text-gray-600">{{ order()!.notes || 'Sin notas' }}</p>\r
        </div>\r
\r
        <!-- Action Buttons -->\r
        <div class="action-buttons">\r
          @if (canReceive()) {\r
            <button class="btn-receive" (click)="initiateReceipt()">\r
              <i class="fi fi-rr-gift"></i>\r
              Iniciar Recibo\r
            </button>\r
          }\r
          @if (canCancel()) {\r
            <button class="btn-cancel" (click)="cancelOrder()">\r
              <i class="fi fi-rr-cross-circle"></i>\r
              Cancelar requisici\xF3n\r
            </button>\r
          }\r
        </div>\r
      </div>\r
\r
      <!-- Main Content Area with Tabs -->\r
      <div class="main-content">\r
        <!-- Tab Navigation -->\r
        <div class="tabs-header">\r
          <button \r
            class="tab-button"\r
            [class.active]="activeTabIndex() === 0"\r
            (click)="activeTabIndex.set(0)">\r
            Productos\r
          </button>\r
          <button \r
            class="tab-button"\r
            [class.active]="activeTabIndex() === 1"\r
            (click)="activeTabIndex.set(1)">\r
            Documentos\r
          </button>\r
          <button \r
            class="tab-button"\r
            [class.active]="activeTabIndex() === 2"\r
            (click)="activeTabIndex.set(2)">\r
            Lotes\r
          </button>\r
          <button \r
            class="tab-button"\r
            [class.active]="activeTabIndex() === 3"\r
            (click)="activeTabIndex.set(3)">\r
            Pagos\r
          </button>\r
        </div>\r
\r
        <!-- Tab Content -->\r
        <div class="tabs-content">\r
          <!-- Productos Tab -->\r
          @if (activeTabIndex() === 0) {\r
            <div class="tab-content-wrapper">\r
              <table class="products-table">\r
                <thead>\r
                  <tr>\r
                    <th>PRODUCTO</th>\r
                    <th>TOTAL</th>\r
                    <th>SOLICITADAS</th>\r
                    <th>RECIBIDAS</th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @if (order()!.line_items && order()!.line_items.length > 0) {\r
                    @for (item of order()!.line_items; track item.id) {\r
                      <tr>\r
                        <td>\r
                          <div class="product-info">\r
                            <strong>{{ item.product?.name || 'N/A' }}</strong>\r
                            <small>{{ item.product?.sku || '' }}</small>\r
                          </div>\r
                        </td>\r
                        <td>{{ formatCurrency((item.unit_total || 0) * parseNumber(item.quantity)) }}</td>\r
                        <td>{{ item.quantity | removeTrailingZeros }} {{ item.product_uom?.uom?.name || 'Unidad' }}</td>\r
                        <td>{{ item.received_original_quantity | removeTrailingZeros }} {{ item.received_uom?.name || '-' }}</td>\r
                      </tr>\r
                    }\r
                  } @else {\r
                    <tr>\r
                      <td colspan="4" class="text-center">\r
                        <div class="empty-state">\r
                          <i class="fi fi-rr-box"></i>\r
                          <p>No hay productos</p>\r
                        </div>\r
                      </td>\r
                    </tr>\r
                  }\r
                </tbody>\r
              </table>\r
            </div>\r
          }\r
\r
          <!-- Documentos Tab -->\r
          @if (activeTabIndex() === 1) {\r
            <div class="tab-content-wrapper">\r
              <div class="tab-header">\r
                <button class="btn-secondary" (click)="regeneratePDF()" [disabled]="regeneratingPDF()">\r
                  @if (regeneratingPDF()) {\r
                    <i class="fi fi-rr-spinner animate-spin"></i>\r
                  } @else {\r
                    <i class="fi fi-rr-refresh"></i>\r
                  }\r
                  Regenerar PDF Original\r
                </button>\r
                @if (order()!.general_status === 'Recibida') {\r
                  <button class="btn-secondary" (click)="regenerateReceivingPDF()" [disabled]="regeneratingReceipt()">\r
                    @if (regeneratingReceipt()) {\r
                      <i class="fi fi-rr-spinner animate-spin"></i>\r
                    } @else {\r
                      <i class="fi fi-rr-refresh"></i>\r
                    }\r
                    Regenerar PDF Recibo\r
                  </button>\r
                }\r
                <button class="btn-primary" (click)="uploadDocument()">\r
                  <i class="fi fi-rr-upload"></i>\r
                  Subir Documento\r
                </button>\r
              </div>\r
\r
              @if (hasDocuments()) {\r
                <table class="documents-table">\r
                  <thead>\r
                    <tr>\r
                      <th>TIPO</th>\r
                      <th>NOMBRE DE ARCHIVO</th>\r
                      <th>FECHA DE CARGA</th>\r
                      <th>ACCIONES</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (doc of order()!.documents; track doc.id) {\r
                      <tr>\r
                        <td>\r
                          <span class="document-badge" [ngClass]="getDocumentBadgeClass(doc.document_type_name)">\r
                            {{ doc.document_type_name }}\r
                          </span>\r
                        </td>\r
                        <td>\r
                          <span class="document-name">{{ doc.document_name }}</span>\r
                        </td>\r
                        <td>\r
                          <span class="document-date">{{ formatDocumentDate(doc.uploaded_at) }}</span>\r
                        </td>\r
                        <td>\r
                          <div class="document-actions">\r
                            <button class="action-btn download-btn" (click)="downloadDocument(doc)" title="Descargar">\r
                              <i class="fi fi-rr-download"></i>\r
                            </button>\r
                            <button class="action-btn delete-btn" (click)="deleteDocument(doc)" title="Eliminar">\r
                              <i class="fi fi-rr-trash"></i>\r
                            </button>\r
                          </div>\r
                        </td>\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              } @else {\r
                <div class="empty-state">\r
                  <i class="fi fi-rr-document"></i>\r
                  <p>No hay documentos adjuntos</p>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <!-- Lotes Tab -->\r
          @if (activeTabIndex() === 2) {\r
            <div class="tab-content-wrapper">\r
              @if (order()?.batches && order()!.batches.length > 0) {\r
                <table class="products-table">\r
                  <thead>\r
                    <tr>\r
                      <th>LOTE</th>\r
                      <th>PRODUCTO</th>\r
                      <th>CANTIDAD</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (batch of order()!.batches; track batch.id) {\r
                      <tr>\r
                        <td>\r
                          <span \r
                            class="inline-flex items-center px-3 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition-colors"\r
                            (click)="openBatchDetail(batch)">\r
                            {{ batch.batch_number }}\r
                          </span>\r
                        </td>\r
                        <td>\r
                          <div class="product-info">\r
                            <strong>{{ batch.product?.name || 'N/A' }}</strong>\r
                            <small>{{ batch.product?.sku || '' }}</small>\r
                          </div>\r
                        </td>\r
                        <td>{{ batch.initial_quantity | removeTrailingZeros }} {{ batch.uom?.name || 'Unidad' }}</td>\r
                      </tr>\r
                    }\r
                  </tbody>\r
                </table>\r
              } @else {\r
                <div class="empty-state">\r
                  <i class="fi fi-rr-layers"></i>\r
                  <p>No hay lotes registrados</p>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <!-- Pagos Tab -->\r
          @if (activeTabIndex() === 3) {\r
            <div class="tab-content-wrapper">\r
              <div class="empty-state">\r
                <i class="fi fi-rr-credit-card"></i>\r
                <p>No hay pagos registrados</p>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
`, styles: ["/* src/app/features/purchase-orders/components/order-detail-dialog/order-detail-dialog.component.scss */\n.order-detail-dialog {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n  background: #f9fafb;\n  width: 1600px;\n  max-width: 95vw;\n}\n.loading-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background: #f9fafb;\n  color: #9ca3af;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n}\n.dialog-header .close-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  border-radius: 4px;\n  transition: all 0.2s;\n}\n.dialog-header .close-btn:hover {\n  background: #f3f4f6;\n  color: #1f2937;\n}\n.dialog-content {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n}\n.sidebar {\n  width: 380px;\n  background: #f8f9fc;\n  padding: 1.3rem;\n  overflow-y: auto;\n  border-right: 1px solid #e5e7eb;\n  display: flex;\n  flex-direction: column;\n  gap: 1.3rem;\n}\n.info-cards-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.info-card {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.info-card .card-icon {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n  font-size: 1.2rem;\n  flex-shrink: 0;\n}\n.info-card .card-text {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.info-card .card-label {\n  font-size: 0.55rem;\n  font-weight: 700;\n  color: #9ca3af;\n  letter-spacing: 0.08em;\n}\n.info-card .card-value {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.section {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.section .section-title {\n  font-size: 0.65rem;\n  font-weight: 700;\n  color: #6b7280;\n  letter-spacing: 0.08em;\n  margin: 0;\n  text-transform: uppercase;\n}\n.section .section-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.8rem;\n  padding: 0.4rem 0;\n  border-bottom: 1px solid #f3f4f6;\n}\n.section .section-item:last-child {\n  border-bottom: none;\n}\n.section .section-label {\n  color: #9ca3af;\n  font-size: 0.8rem;\n}\n.section .section-value {\n  font-weight: 500;\n  color: #1f2937;\n}\n.section:first-of-type {\n  background: white;\n  padding: 0.75rem;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.section-header .section-title {\n  margin: 0;\n}\n.toggle-container {\n  display: flex;\n  gap: 0.25rem;\n  background: #f3f4f6;\n  padding: 0.2rem;\n  border-radius: 6px;\n}\n.toggle-container .toggle-btn {\n  flex: 1;\n  padding: 0.2rem 0.5rem;\n  border: none;\n  background: transparent;\n  color: #9ca3af;\n  font-size: 0.65rem;\n  font-weight: 600;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.toggle-container .toggle-btn.active {\n  background: white;\n  color: #3b82f6;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.toggle-container .toggle-btn:hover:not(.active) {\n  color: #6b7280;\n}\n.totals-card {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  padding: 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.totals-card .totals-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.8rem;\n}\n.totals-card .totals-label {\n  color: #9ca3af;\n  font-weight: 500;\n}\n.totals-card .totals-value {\n  font-weight: 600;\n  color: #1f2937;\n}\n.totals-card .totals-divider {\n  height: 1px;\n  background: #e5e7eb;\n  margin: 0.2rem 0;\n}\n.totals-card .totals-row-total {\n  padding-top: 0.2rem;\n}\n.totals-card .totals-row-total .totals-label-total {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.totals-card .totals-row-total .totals-value-total {\n  font-size: 1.1rem;\n  font-weight: 700;\n}\n.action-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  margin-top: auto;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n.action-buttons button {\n  width: 100%;\n  padding: 0.6rem 1rem;\n  border: none;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.6rem;\n}\n.action-buttons button i {\n  font-size: 1rem;\n}\n.action-buttons .btn-receive {\n  background: #10b981;\n  color: white;\n}\n.action-buttons .btn-receive:hover {\n  background: #059669;\n  transform: translateY(-1px);\n}\n.action-buttons .btn-cancel {\n  background: #fecaca;\n  color: #dc2626;\n}\n.action-buttons .btn-cancel:hover {\n  background: #fca5a5;\n  transform: translateY(-1px);\n}\n.main-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: white;\n}\n.tabs-header {\n  display: flex;\n  gap: 0;\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1.5rem;\n}\n.tab-button {\n  padding: 1rem 1.5rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.tab-button:hover {\n  color: #1f2937;\n}\n.tab-button.active {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.tabs-content {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n}\n.detail-tabs {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.detail-tabs ::ng-deep .p-tabview {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.detail-tabs ::ng-deep .p-tabview-nav {\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1.5rem;\n  margin: 0;\n}\n.detail-tabs ::ng-deep .p-tabview-nav-link {\n  padding: 1rem 1.5rem;\n  font-weight: 500;\n  color: #6b7280;\n  border: none;\n  background: transparent;\n  border-bottom: 2px solid transparent;\n}\n.detail-tabs ::ng-deep .p-tabview-nav-link:hover {\n  color: #1f2937;\n  background: transparent;\n}\n.detail-tabs ::ng-deep .p-tabview-nav-link:focus {\n  box-shadow: none;\n}\n.detail-tabs ::ng-deep .p-highlight .p-tabview-nav-link {\n  color: #3b82f6;\n  border-bottom: 2px solid #3b82f6;\n  background: transparent;\n}\n.detail-tabs ::ng-deep .p-tabview-panels {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n  padding: 0;\n}\n.detail-tabs ::ng-deep .p-tabview-panel {\n  height: 100%;\n}\n.tab-content-wrapper {\n  padding: 1.5rem;\n  height: 100%;\n  overflow-y: auto;\n}\n.tab-header {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n  align-items: center;\n  justify-content: flex-end;\n}\n.tab-header button {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.65rem;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.tab-header button i {\n  font-size: 0.8rem;\n}\n.tab-header button:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.tab-header .btn-secondary {\n  background: #4b5563;\n  color: white;\n}\n.tab-header .btn-secondary:hover:not(:disabled) {\n  background: #3a4452;\n}\n.tab-header .btn-primary {\n  background: #3b82f6;\n  color: white;\n}\n.tab-header .btn-primary:hover:not(:disabled) {\n  background: #2563eb;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin {\n  animation: spin 1s linear infinite;\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 3rem;\n  color: #9ca3af;\n}\n.empty-state i {\n  font-size: 3rem;\n}\n.empty-state p {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.products-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.products-table thead {\n  background: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.products-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.products-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.products-table tbody tr:hover {\n  background: #f9fafb;\n}\n.products-table tbody tr td {\n  padding: 1rem;\n  color: #1f2937;\n}\n.products-table .product-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.products-table .product-info strong {\n  font-weight: 500;\n  color: #1f2937;\n}\n.products-table .product-info small {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.documents-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.documents-table thead {\n  background: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.documents-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.documents-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.documents-table tbody tr:hover {\n  background: #f9fafb;\n}\n.documents-table tbody tr td {\n  padding: 1rem;\n  color: #1f2937;\n}\n.document-badge {\n  display: inline-block;\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.document-badge.badge-blue {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-badge.badge-green {\n  background: #dcfce7;\n  color: #166534;\n}\n.document-badge.badge-gray {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.document-name {\n  font-size: 0.85rem;\n  color: #1f2937;\n  word-break: break-word;\n}\n.document-date {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.document-actions {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.document-actions .action-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 0.9rem;\n}\n.document-actions .action-btn.download-btn {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-actions .action-btn.download-btn:hover {\n  background: #bfdbfe;\n}\n.document-actions .action-btn.delete-btn {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.document-actions .action-btn.delete-btn:hover {\n  background: #fecaca;\n}\n/*# sourceMappingURL=order-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: PurchaseOrderService }, { type: TaxCalculatorService }, { type: MatSnackBar }, { type: ChangeDetectorRef }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderDetailDialogComponent, { className: "OrderDetailDialogComponent", filePath: "src/app/features/purchase-orders/components/order-detail-dialog/order-detail-dialog.component.ts", lineNumber: 28 });
})();

// src/app/features/inventory/components/batch-detail-dialog/batch-detail-dialog.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function BatchDetailDialogComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_For_8_Template_button_click_0_listener() {
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
function BatchDetailDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p");
    \u0275\u0275text(2, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function BatchDetailDialogComponent_Conditional_10_Conditional_0_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 17);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("img", ctx_r2.ArrowRight);
  }
}
function BatchDetailDialogComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "div", 11);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_10_Conditional_0_Template_div_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openProductDetail());
    });
    \u0275\u0275elementStart(3, "div", 12);
    \u0275\u0275element(4, "lucide-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 13)(6, "span", 14);
    \u0275\u0275text(7, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 15);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 16);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(12, "lucide-icon", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 18);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_10_Conditional_0_Template_div_click_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openWarehouseDetail());
    });
    \u0275\u0275elementStart(14, "div", 12);
    \u0275\u0275element(15, "lucide-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 13)(17, "span", 14);
    \u0275\u0275text(18, "ALMAC\xC9N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 15);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(21, "lucide-icon", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 19);
    \u0275\u0275listener("click", function BatchDetailDialogComponent_Conditional_10_Conditional_0_Template_div_click_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openPurchaseOrder());
    });
    \u0275\u0275elementStart(23, "div", 12);
    \u0275\u0275element(24, "lucide-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 13)(26, "span", 14);
    \u0275\u0275text(27, "REQUISICI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 15);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, BatchDetailDialogComponent_Conditional_10_Conditional_0_Conditional_30_Template, 1, 1, "lucide-icon", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 20)(32, "div", 12);
    \u0275\u0275element(33, "lucide-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 13)(35, "span", 14);
    \u0275\u0275text(36, "FECHA DE ENTRADA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span", 15);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 21)(40, "div", 22)(41, "span", 23);
    \u0275\u0275text(42, "Inventario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span", 24);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 25);
    \u0275\u0275element(46, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 27)(48, "div", 28)(49, "span", 29);
    \u0275\u0275text(50, "Cantidad Inicial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "span", 30);
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 28)(55, "span", 29);
    \u0275\u0275text(56, "Disponible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "span", 31);
    \u0275\u0275text(58);
    \u0275\u0275pipe(59, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 28)(61, "span", 29);
    \u0275\u0275text(62, "Consumido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "span", 30);
    \u0275\u0275text(64);
    \u0275\u0275pipe(65, "removeTrailingZeros");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(66, "div", 32)(67, "h3", 33);
    \u0275\u0275text(68, "Resumen de Movimientos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "div", 34)(70, "div", 35)(71, "div", 36);
    \u0275\u0275element(72, "lucide-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "span", 37);
    \u0275\u0275text(74, "Total Movimientos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "span", 38);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(77, "div", 39)(78, "div", 36);
    \u0275\u0275element(79, "lucide-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "span", 37);
    \u0275\u0275text(81, "\xD3rdenes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "span", 38);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(84, "div", 40)(85, "div", 36);
    \u0275\u0275element(86, "lucide-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "span", 37);
    \u0275\u0275text(88, "Transferencias");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "span", 38);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 41)(92, "div", 36);
    \u0275\u0275element(93, "lucide-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "span", 37);
    \u0275\u0275text(95, "Ajustes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "span", 38);
    \u0275\u0275text(97);
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
    let tmp_23_0;
    let tmp_24_0;
    let tmp_25_0;
    let tmp_27_0;
    let tmp_29_0;
    let tmp_31_0;
    let tmp_33_0;
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
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.Calendar);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(((tmp_14_0 = ctx_r2.batch()) == null ? null : tmp_14_0.created_at) || ""));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("green", ctx_r2.availablePercent > 50)("orange", ctx_r2.availablePercent <= 50 && ctx_r2.availablePercent > 20)("red", ctx_r2.availablePercent <= 20);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.availablePercent, "% ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r2.availablePercent, "%");
    \u0275\u0275classProp("green", ctx_r2.availablePercent > 50)("orange", ctx_r2.availablePercent <= 50 && ctx_r2.availablePercent > 20)("red", ctx_r2.availablePercent <= 20);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(53, 43, (tmp_23_0 = ctx_r2.batch()) == null ? null : tmp_23_0.initial_quantity), " ", (tmp_23_0 = ctx_r2.batch()) == null ? null : tmp_23_0.uom_name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(59, 45, (tmp_24_0 = ctx_r2.batch()) == null ? null : tmp_24_0.available_quantity), " ", (tmp_24_0 = ctx_r2.batch()) == null ? null : tmp_24_0.uom_name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(65, 47, (tmp_25_0 = ctx_r2.batch()) == null ? null : tmp_25_0.quantity_consumed), " ", (tmp_25_0 = ctx_r2.batch()) == null ? null : tmp_25_0.uom_name);
    \u0275\u0275advance(8);
    \u0275\u0275property("img", ctx_r2.FileText);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_27_0 = ctx_r2.batch()) == null ? null : tmp_27_0.movement_summary == null ? null : tmp_27_0.movement_summary.total_movements) ?? 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.ShoppingCart);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_29_0 = ctx_r2.batch()) == null ? null : tmp_29_0.movement_summary == null ? null : tmp_29_0.movement_summary.by_type == null ? null : tmp_29_0.movement_summary.by_type.orders) ?? 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.ArrowRight);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((((tmp_31_0 = ctx_r2.batch()) == null ? null : tmp_31_0.movement_summary == null ? null : tmp_31_0.movement_summary.by_type == null ? null : tmp_31_0.movement_summary.by_type.transfers_out) ?? 0) + (((tmp_31_0 = ctx_r2.batch()) == null ? null : tmp_31_0.movement_summary == null ? null : tmp_31_0.movement_summary.by_type == null ? null : tmp_31_0.movement_summary.by_type.transfers_in) ?? 0));
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r2.Edit);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_33_0 = ctx_r2.batch()) == null ? null : tmp_33_0.movement_summary == null ? null : tmp_33_0.movement_summary.by_type == null ? null : tmp_33_0.movement_summary.by_type.adjustments) ?? 0);
  }
}
function BatchDetailDialogComponent_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 42)(2, "p");
    \u0275\u0275text(3, "Sin movimientos registrados");
    \u0275\u0275elementEnd()()();
  }
}
function BatchDetailDialogComponent_Conditional_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 42)(2, "p");
    \u0275\u0275text(3, "Sin auditor\xEDas registradas");
    \u0275\u0275elementEnd()()();
  }
}
function BatchDetailDialogComponent_Conditional_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 42)(2, "p");
    \u0275\u0275text(3, "Sin etiqueta configurada");
    \u0275\u0275elementEnd()()();
  }
}
function BatchDetailDialogComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, BatchDetailDialogComponent_Conditional_10_Conditional_0_Template, 98, 49, "div", 9);
    \u0275\u0275conditionalCreate(1, BatchDetailDialogComponent_Conditional_10_Conditional_1_Template, 4, 0, "div", 9);
    \u0275\u0275conditionalCreate(2, BatchDetailDialogComponent_Conditional_10_Conditional_2_Template, 4, 0, "div", 9);
    \u0275\u0275conditionalCreate(3, BatchDetailDialogComponent_Conditional_10_Conditional_3_Template, 4, 0, "div", 9);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.activeTab === "general" ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "movimientos" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "auditorias" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTab === "etiqueta" ? 3 : -1);
  }
}
var BatchDetailDialogComponent = class _BatchDetailDialogComponent {
  data;
  dialogRef;
  batchService;
  dialog;
  X = X;
  Package = Package;
  MapPin = MapPin;
  FileText = FileText;
  Calendar = Calendar;
  ShoppingCart = ShoppingCart;
  ArrowRight = ArrowRight;
  Edit = SquarePen;
  batch = signal(null, ...ngDevMode ? [{ debugName: "batch" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  activeTab = "general";
  tabs = [
    { id: "general", label: "General" },
    { id: "movimientos", label: "Movimientos" },
    { id: "auditorias", label: "Auditor\xEDas" },
    { id: "etiqueta", label: "Etiqueta" }
  ];
  constructor(data, dialogRef, batchService, dialog) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.batchService = batchService;
    this.dialog = dialog;
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
  toNum(val) {
    return typeof val === "string" ? parseFloat(val) || 0 : val || 0;
  }
  openPurchaseOrder() {
    const b = this.batch();
    if (!b?.purchase_order_id)
      return;
    this.dialog.open(OrderDetailDialogComponent, {
      data: { orderId: b.purchase_order_id },
      width: "1400px",
      maxWidth: "95vw",
      height: "90vh",
      maxHeight: "90vh",
      panelClass: "order-detail-dialog-container"
    });
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
  formatDate(dateString) {
    if (!dateString)
      return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
  }
  static \u0275fac = function BatchDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BatchDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(InventoryBatchService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BatchDetailDialogComponent, selectors: [["app-batch-detail-dialog"]], decls: 11, vars: 4, consts: [[1, "batch-detail"], [1, "batch-detail__header"], [1, "batch-detail__title"], [1, "batch-detail__close", 3, "click"], [1, "w-5", "h-5", 3, "img"], [1, "batch-detail__tabs"], [1, "batch-detail__tab", 3, "active"], [1, "batch-detail__loading"], [1, "batch-detail__tab", 3, "click"], [1, "batch-detail__body"], [1, "info-cards"], [1, "info-card", "info-card--blue", "clickable", 3, "click"], [1, "info-card__icon"], [1, "info-card__content"], [1, "info-card__label"], [1, "info-card__value"], [1, "info-card__sub"], [1, "info-card__arrow", "w-4", "h-4", 3, "img"], [1, "info-card", "info-card--yellow", "clickable", 3, "click"], [1, "info-card", "info-card--purple", 3, "click"], [1, "info-card", "info-card--red", "info-card--full"], [1, "inventory-section"], [1, "inventory-section__header"], [1, "inventory-section__title"], [1, "inventory-section__percent"], [1, "progress-bar"], [1, "progress-bar__fill"], [1, "quantities"], [1, "quantity-item"], [1, "quantity-item__label"], [1, "quantity-item__value"], [1, "quantity-item__value", "green"], [1, "movements-summary"], [1, "movements-summary__title"], [1, "movements-cards"], [1, "movement-card", "movement-card--blue"], [1, "movement-card__icon-wrap"], [1, "movement-card__label"], [1, "movement-card__value"], [1, "movement-card", "movement-card--green"], [1, "movement-card", "movement-card--orange"], [1, "movement-card", "movement-card--purple"], [1, "empty-tab"]], template: function BatchDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function BatchDetailDialogComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275repeaterCreate(7, BatchDetailDialogComponent_For_8_Template, 2, 3, "button", 6, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, BatchDetailDialogComponent_Conditional_9_Template, 3, 0, "div", 7);
      \u0275\u0275conditionalCreate(10, BatchDetailDialogComponent_Conditional_10_Template, 4, 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.batch()) == null ? null : tmp_0_0.batch_number) || "...");
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.loading() && ctx.batch() ? 10 : -1);
    }
  }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent, RemoveTrailingZerosPipe], styles: ["\n\n.batch-detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 920px;\n  max-height: 85vh;\n  overflow: hidden;\n}\n.batch-detail__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem 0;\n  flex-shrink: 0;\n}\n.batch-detail__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n.batch-detail__close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  transition: color 0.2s;\n}\n.batch-detail__close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.batch-detail__tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  padding: 0 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n  margin-top: 0.75rem;\n  flex-shrink: 0;\n}\n.batch-detail__tab[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  padding: 0.75rem 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-bottom: -1px;\n}\n.batch-detail__tab[_ngcontent-%COMP%]:hover {\n  color: #374151;\n}\n.batch-detail__tab.active[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.batch-detail__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.25rem 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.batch-detail__loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #6b7280;\n}\n.info-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 0.875rem 1rem;\n  border-radius: 0.75rem;\n  position: relative;\n}\n.info-card--blue[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n}\n.info-card--blue[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--yellow[_ngcontent-%COMP%] {\n  background-color: #fefce8;\n}\n.info-card--yellow[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #fde68a;\n  color: #d97706;\n}\n.info-card--purple[_ngcontent-%COMP%] {\n  background-color: #f5f3ff;\n}\n.info-card--purple[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--red[_ngcontent-%COMP%] {\n  background-color: #fff1f2;\n}\n.info-card--red[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background-color: #fecdd3;\n  color: #e11d48;\n}\n.info-card--full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.info-card.clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.info-card.clickable[_ngcontent-%COMP%]:hover {\n  opacity: 0.8;\n}\n.info-card__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.info-card__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n  flex: 1;\n  min-width: 0;\n}\n.info-card__label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 600;\n  color: #9ca3af;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.info-card__value[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1f2937;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info-card__sub[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.info-card__arrow[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  flex-shrink: 0;\n  align-self: center;\n}\n.inventory-section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.75rem;\n  padding: 1rem 1.25rem;\n}\n.inventory-section__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.inventory-section__title[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.inventory-section__percent[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n}\n.inventory-section__percent.green[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.inventory-section__percent.orange[_ngcontent-%COMP%] {\n  color: #ea580c;\n}\n.inventory-section__percent.red[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 0.5rem;\n  background: #e5e7eb;\n  border-radius: 9999px;\n  overflow: hidden;\n  margin-bottom: 1rem;\n}\n.progress-bar__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 9999px;\n  transition: width 0.4s ease;\n}\n.progress-bar__fill.green[_ngcontent-%COMP%] {\n  background: #16a34a;\n}\n.progress-bar__fill.orange[_ngcontent-%COMP%] {\n  background: #ea580c;\n}\n.progress-bar__fill.red[_ngcontent-%COMP%] {\n  background: #dc2626;\n}\n.quantities[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.5rem;\n}\n.quantity-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.quantity-item__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.quantity-item__value[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.quantity-item__value.green[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.movements-summary__title[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 0.75rem;\n}\n.movements-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n}\n.movement-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n  padding: 0.875rem;\n  border-radius: 0.75rem;\n  border: 1px solid #e5e7eb;\n  background: #fff;\n}\n.movement-card--blue[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.movement-card--blue[_ngcontent-%COMP%]   .movement-card__icon-wrap[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n}\n.movement-card--green[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.movement-card--green[_ngcontent-%COMP%]   .movement-card__icon-wrap[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n}\n.movement-card--orange[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  color: #ea580c;\n}\n.movement-card--orange[_ngcontent-%COMP%]   .movement-card__icon-wrap[_ngcontent-%COMP%] {\n  background-color: #fff7ed;\n}\n.movement-card--purple[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  color: #7c3aed;\n}\n.movement-card--purple[_ngcontent-%COMP%]   .movement-card__icon-wrap[_ngcontent-%COMP%] {\n  background-color: #f5f3ff;\n}\n.movement-card__icon-wrap[_ngcontent-%COMP%] {\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.movement-card__label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.movement-card__value[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.empty-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #9ca3af;\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=batch-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BatchDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-batch-detail-dialog", standalone: true, imports: [CommonModule, RemoveTrailingZerosPipe, LucideAngularModule], template: `<div class="batch-detail">\r
  <!-- Header -->\r
  <div class="batch-detail__header">\r
    <h2 class="batch-detail__title">{{ batch()?.batch_number || '...' }}</h2>\r
    <button class="batch-detail__close" (click)="close()">\r
      <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <!-- Tabs -->\r
  <div class="batch-detail__tabs">\r
    @for (tab of tabs; track tab.id) {\r
      <button\r
        class="batch-detail__tab"\r
        [class.active]="activeTab === tab.id"\r
        (click)="activeTab = tab.id">\r
        {{ tab.label }}\r
      </button>\r
    }\r
  </div>\r
\r
  <!-- Loading -->\r
  @if (loading()) {\r
    <div class="batch-detail__loading">\r
      <p>Cargando...</p>\r
    </div>\r
  }\r
\r
  @if (!loading() && batch()) {\r
    <!-- Tab: General -->\r
    @if (activeTab === 'general') {\r
      <div class="batch-detail__body">\r
\r
        <!-- Info Cards Row -->\r
        <div class="info-cards">\r
          <!-- Producto -->\r
          <div class="info-card info-card--blue clickable" (click)="openProductDetail()">\r
            <div class="info-card__icon">\r
              <lucide-icon [img]="Package" class="w-5 h-5"></lucide-icon>\r
            </div>\r
            <div class="info-card__content">\r
              <span class="info-card__label">PRODUCTO</span>\r
              <span class="info-card__value">{{ batch()?.product_name || 'N/A' }}</span>\r
              <span class="info-card__sub">SKU: {{ batch()?.product_sku || '-' }}</span>\r
            </div>\r
            <lucide-icon [img]="ArrowRight" class="info-card__arrow w-4 h-4"></lucide-icon>\r
          </div>\r
\r
          <!-- ALMAC\xC9N -->\r
          <div class="info-card info-card--yellow clickable" (click)="openWarehouseDetail()">\r
            <div class="info-card__icon">\r
              <lucide-icon [img]="MapPin" class="w-5 h-5"></lucide-icon>\r
            </div>\r
            <div class="info-card__content">\r
              <span class="info-card__label">ALMAC\xC9N</span>\r
              <span class="info-card__value">{{ batch()?.warehouse_name || 'N/A' }}</span>\r
            </div>\r
            <lucide-icon [img]="ArrowRight" class="info-card__arrow w-4 h-4"></lucide-icon>\r
          </div>\r
\r
          <!-- Requisici\xF3n -->\r
          <div class="info-card info-card--purple" [class.clickable]="batch()?.purchase_order_id" (click)="openPurchaseOrder()">\r
            <div class="info-card__icon">\r
              <lucide-icon [img]="FileText" class="w-5 h-5"></lucide-icon>\r
            </div>\r
            <div class="info-card__content">\r
              <span class="info-card__label">REQUISICI\xD3N</span>\r
              <span class="info-card__value">{{ batch()?.purchase_order_folio || '-' }}</span>\r
            </div>\r
            @if (batch()?.purchase_order_id) {\r
              <lucide-icon [img]="ArrowRight" class="info-card__arrow w-4 h-4"></lucide-icon>\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- Fecha -->\r
        <div class="info-card info-card--red info-card--full">\r
          <div class="info-card__icon">\r
            <lucide-icon [img]="Calendar" class="w-5 h-5"></lucide-icon>\r
          </div>\r
          <div class="info-card__content">\r
            <span class="info-card__label">FECHA DE ENTRADA</span>\r
            <span class="info-card__value">{{ formatDate(batch()?.created_at || '') }}</span>\r
          </div>\r
        </div>\r
\r
        <!-- Inventario -->\r
        <div class="inventory-section">\r
          <div class="inventory-section__header">\r
            <span class="inventory-section__title">Inventario</span>\r
            <span class="inventory-section__percent" [class.green]="availablePercent > 50" [class.orange]="availablePercent <= 50 && availablePercent > 20" [class.red]="availablePercent <= 20">\r
              {{ availablePercent }}%\r
            </span>\r
          </div>\r
\r
          <!-- Progress bar -->\r
          <div class="progress-bar">\r
            <div class="progress-bar__fill"\r
              [class.green]="availablePercent > 50"\r
              [class.orange]="availablePercent <= 50 && availablePercent > 20"\r
              [class.red]="availablePercent <= 20"\r
              [style.width.%]="availablePercent">\r
            </div>\r
          </div>\r
\r
          <!-- Quantities -->\r
          <div class="quantities">\r
            <div class="quantity-item">\r
              <span class="quantity-item__label">Cantidad Inicial</span>\r
              <span class="quantity-item__value">{{ batch()?.initial_quantity | removeTrailingZeros }} {{ batch()?.uom_name }}</span>\r
            </div>\r
            <div class="quantity-item">\r
              <span class="quantity-item__label">Disponible</span>\r
              <span class="quantity-item__value green">{{ batch()?.available_quantity | removeTrailingZeros }} {{ batch()?.uom_name }}</span>\r
            </div>\r
            <div class="quantity-item">\r
              <span class="quantity-item__label">Consumido</span>\r
              <span class="quantity-item__value">{{ batch()?.quantity_consumed | removeTrailingZeros }} {{ batch()?.uom_name }}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Resumen de Movimientos -->\r
        <div class="movements-summary">\r
          <h3 class="movements-summary__title">Resumen de Movimientos</h3>\r
          <div class="movements-cards">\r
            <div class="movement-card movement-card--blue">\r
              <div class="movement-card__icon-wrap">\r
                <lucide-icon [img]="FileText" class="w-5 h-5"></lucide-icon>\r
              </div>\r
              <span class="movement-card__label">Total Movimientos</span>\r
              <span class="movement-card__value">{{ batch()?.movement_summary?.total_movements ?? 0 }}</span>\r
            </div>\r
            <div class="movement-card movement-card--green">\r
              <div class="movement-card__icon-wrap">\r
                <lucide-icon [img]="ShoppingCart" class="w-5 h-5"></lucide-icon>\r
              </div>\r
              <span class="movement-card__label">\xD3rdenes</span>\r
              <span class="movement-card__value">{{ batch()?.movement_summary?.by_type?.orders ?? 0 }}</span>\r
            </div>\r
            <div class="movement-card movement-card--orange">\r
              <div class="movement-card__icon-wrap">\r
                <lucide-icon [img]="ArrowRight" class="w-5 h-5"></lucide-icon>\r
              </div>\r
              <span class="movement-card__label">Transferencias</span>\r
              <span class="movement-card__value">{{ (batch()?.movement_summary?.by_type?.transfers_out ?? 0) + (batch()?.movement_summary?.by_type?.transfers_in ?? 0) }}</span>\r
            </div>\r
            <div class="movement-card movement-card--purple">\r
              <div class="movement-card__icon-wrap">\r
                <lucide-icon [img]="Edit" class="w-5 h-5"></lucide-icon>\r
              </div>\r
              <span class="movement-card__label">Ajustes</span>\r
              <span class="movement-card__value">{{ batch()?.movement_summary?.by_type?.adjustments ?? 0 }}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
      </div>\r
    }\r
\r
    <!-- Tab: Movimientos -->\r
    @if (activeTab === 'movimientos') {\r
      <div class="batch-detail__body">\r
        <div class="empty-tab">\r
          <p>Sin movimientos registrados</p>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Tab: Auditor\xEDas -->\r
    @if (activeTab === 'auditorias') {\r
      <div class="batch-detail__body">\r
        <div class="empty-tab">\r
          <p>Sin auditor\xEDas registradas</p>\r
        </div>\r
      </div>\r
    }\r
\r
    <!-- Tab: Etiqueta -->\r
    @if (activeTab === 'etiqueta') {\r
      <div class="batch-detail__body">\r
        <div class="empty-tab">\r
          <p>Sin etiqueta configurada</p>\r
        </div>\r
      </div>\r
    }\r
  }\r
</div>\r
`, styles: ["/* src/app/features/inventory/components/batch-detail-dialog/batch-detail-dialog.component.scss */\n.batch-detail {\n  display: flex;\n  flex-direction: column;\n  width: 920px;\n  max-height: 85vh;\n  overflow: hidden;\n}\n.batch-detail__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem 0;\n  flex-shrink: 0;\n}\n.batch-detail__header h2 {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n.batch-detail__close {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  transition: color 0.2s;\n}\n.batch-detail__close:hover {\n  color: #1f2937;\n}\n.batch-detail__tabs {\n  display: flex;\n  gap: 0;\n  padding: 0 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n  margin-top: 0.75rem;\n  flex-shrink: 0;\n}\n.batch-detail__tab {\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  padding: 0.75rem 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #6b7280;\n  cursor: pointer;\n  transition: all 0.2s;\n  margin-bottom: -1px;\n}\n.batch-detail__tab:hover {\n  color: #374151;\n}\n.batch-detail__tab.active {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.batch-detail__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.25rem 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.batch-detail__loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #6b7280;\n}\n.info-cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.75rem;\n}\n.info-card {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 0.875rem 1rem;\n  border-radius: 0.75rem;\n  position: relative;\n}\n.info-card--blue {\n  background-color: #eff6ff;\n}\n.info-card--blue .info-card__icon {\n  background-color: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--yellow {\n  background-color: #fefce8;\n}\n.info-card--yellow .info-card__icon {\n  background-color: #fde68a;\n  color: #d97706;\n}\n.info-card--purple {\n  background-color: #f5f3ff;\n}\n.info-card--purple .info-card__icon {\n  background-color: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--red {\n  background-color: #fff1f2;\n}\n.info-card--red .info-card__icon {\n  background-color: #fecdd3;\n  color: #e11d48;\n}\n.info-card--full {\n  grid-column: 1/-1;\n}\n.info-card.clickable {\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.info-card.clickable:hover {\n  opacity: 0.8;\n}\n.info-card__icon {\n  flex-shrink: 0;\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.info-card__content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n  flex: 1;\n  min-width: 0;\n}\n.info-card__label {\n  font-size: 0.65rem;\n  font-weight: 600;\n  color: #9ca3af;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.info-card__value {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1f2937;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info-card__sub {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.info-card__arrow {\n  color: #9ca3af;\n  flex-shrink: 0;\n  align-self: center;\n}\n.inventory-section {\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.75rem;\n  padding: 1rem 1.25rem;\n}\n.inventory-section__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.inventory-section__title {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.inventory-section__percent {\n  font-size: 0.9375rem;\n  font-weight: 700;\n}\n.inventory-section__percent.green {\n  color: #16a34a;\n}\n.inventory-section__percent.orange {\n  color: #ea580c;\n}\n.inventory-section__percent.red {\n  color: #dc2626;\n}\n.progress-bar {\n  width: 100%;\n  height: 0.5rem;\n  background: #e5e7eb;\n  border-radius: 9999px;\n  overflow: hidden;\n  margin-bottom: 1rem;\n}\n.progress-bar__fill {\n  height: 100%;\n  border-radius: 9999px;\n  transition: width 0.4s ease;\n}\n.progress-bar__fill.green {\n  background: #16a34a;\n}\n.progress-bar__fill.orange {\n  background: #ea580c;\n}\n.progress-bar__fill.red {\n  background: #dc2626;\n}\n.quantities {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.5rem;\n}\n.quantity-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.quantity-item__label {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.quantity-item__value {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.quantity-item__value.green {\n  color: #16a34a;\n}\n.movements-summary__title {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #1f2937;\n  margin-bottom: 0.75rem;\n}\n.movements-cards {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n}\n.movement-card {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n  padding: 0.875rem;\n  border-radius: 0.75rem;\n  border: 1px solid #e5e7eb;\n  background: #fff;\n}\n.movement-card--blue lucide-icon {\n  color: #2563eb;\n}\n.movement-card--blue .movement-card__icon-wrap {\n  background-color: #eff6ff;\n}\n.movement-card--green lucide-icon {\n  color: #16a34a;\n}\n.movement-card--green .movement-card__icon-wrap {\n  background-color: #dcfce7;\n}\n.movement-card--orange lucide-icon {\n  color: #ea580c;\n}\n.movement-card--orange .movement-card__icon-wrap {\n  background-color: #fff7ed;\n}\n.movement-card--purple lucide-icon {\n  color: #7c3aed;\n}\n.movement-card--purple .movement-card__icon-wrap {\n  background-color: #f5f3ff;\n}\n.movement-card__icon-wrap {\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.movement-card__label {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.movement-card__value {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.empty-tab {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #9ca3af;\n  font-size: 0.875rem;\n}\n/*# sourceMappingURL=batch-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: InventoryBatchService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BatchDetailDialogComponent, { className: "BatchDetailDialogComponent", filePath: "src/app/features/inventory/components/batch-detail-dialog/batch-detail-dialog.component.ts", lineNumber: 20 });
})();

export {
  RemoveTrailingZerosPipe,
  InventoryBatchService,
  BatchDetailDialogComponent,
  OrderDetailDialogComponent
};
//# sourceMappingURL=chunk-DVAIDVYL.js.map
