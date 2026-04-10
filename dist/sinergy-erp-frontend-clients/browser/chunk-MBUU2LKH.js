import {
  CloseShiftDialogComponent,
  OpenShiftDialogComponent
} from "./chunk-TTBBWZH7.js";
import "./chunk-SWPKLNPW.js";
import "./chunk-E7QIYR5Q.js";
import {
  POSService
} from "./chunk-MGEJLMJK.js";
import {
  MatSnackBar
} from "./chunk-KNFYVOET.js";
import {
  MatDialog
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-TXPVZZCM.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7ZU2RCPO.js";

// src/app/features/pos/pages/payment/payment.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
function PaymentComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("click", function PaymentComponent_For_8_Template_div_click_0_listener() {
      const order_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectOrder(order_r2));
    });
    \u0275\u0275elementStart(1, "div", 11)(2, "span", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 14)(7, "p", 15);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 16);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 17);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_10_0;
    const order_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ((tmp_10_0 = ctx_r2.selectedOrder()) == null ? null : tmp_10_0.id) === order_r2.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r2.order_number || order_r2.id.substring(0, 8));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(order_r2.total));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((order_r2.customer == null ? null : order_r2.customer.name) || "Sin cliente");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r2.warehouse == null ? null : order_r2.warehouse.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", order_r2.items_count || 0, " productos");
  }
}
function PaymentComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 18);
    \u0275\u0275element(2, "path", 19)(3, "circle", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No hay \xF3rdenes pendientes");
    \u0275\u0275elementEnd()();
  }
}
function PaymentComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "div", 21);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando \xF3rdenes...");
    \u0275\u0275elementEnd()();
  }
}
function PaymentComponent_Conditional_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 49);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 50);
    \u0275\u0275element(3, "path", 19)(4, "circle", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Turno Activo ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 51);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_12_Conditional_4_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.closeCashShift());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 50);
    \u0275\u0275element(8, "rect", 52)(9, "line", 53)(10, "line", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " Cerrar Turno ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r2.checkingShift());
  }
}
function PaymentComponent_Conditional_12_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_12_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openCashShift());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 50);
    \u0275\u0275element(2, "rect", 56)(3, "path", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.checkingShift());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.checkingShift() ? "Verificando..." : "Abrir Turno", " ");
  }
}
function PaymentComponent_Conditional_12_Conditional_36_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "div", 59)(2, "span", 60);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 61);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 62);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const line_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((line_r7.product == null ? null : line_r7.product.name) || "Producto");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("x", line_r7.quantity, " ", (line_r7.uom == null ? null : line_r7.uom.abbreviation) || (line_r7.uom == null ? null : line_r7.uom.name) || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(line_r7.line_total || line_r7.subtotal || 0));
  }
}
function PaymentComponent_Conditional_12_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "h4");
    \u0275\u0275text(2, "Productos");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, PaymentComponent_Conditional_12_Conditional_36_For_4_Template, 8, 4, "div", 58, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.selectedOrder().lines);
  }
}
function PaymentComponent_Conditional_12_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span");
    \u0275\u0275text(2, "Propina:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.selectedOrder().tip));
  }
}
function PaymentComponent_Conditional_12_For_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_12_For_64_Template_div_click_0_listener() {
      const method_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.paymentMethod.set(method_r9.value));
    });
    \u0275\u0275elementStart(1, "span", 64);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 65);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const method_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.paymentMethod() === method_r9.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(method_r9.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(method_r9.label);
  }
}
function PaymentComponent_Conditional_12_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "label");
    \u0275\u0275text(2, "Referencia / Autorizaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function PaymentComponent_Conditional_12_Conditional_72_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.paymentReference, $event) || (ctx_r2.paymentReference = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.paymentReference);
  }
}
function PaymentComponent_Conditional_12_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "span");
    \u0275\u0275text(2, "Cambio:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.calculateChange()));
  }
}
function PaymentComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h2");
    \u0275\u0275text(2, "Procesar Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 22);
    \u0275\u0275conditionalCreate(4, PaymentComponent_Conditional_12_Conditional_4_Template, 12, 1, "div", 23)(5, PaymentComponent_Conditional_12_Conditional_5_Template, 5, 2, "button", 24);
    \u0275\u0275elementStart(6, "button", 25);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_12_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancel());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 26);
    \u0275\u0275element(8, "line", 27)(9, "polyline", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Volver ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "div", 29)(12, "div", 30)(13, "h3");
    \u0275\u0275text(14, "Resumen de Orden");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 31)(16, "div", 32)(17, "span");
    \u0275\u0275text(18, "Orden:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 32)(22, "span");
    \u0275\u0275text(23, "Cliente:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 32)(27, "span");
    \u0275\u0275text(28, "Almac\xE9n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 32)(32, "span");
    \u0275\u0275text(33, "Productos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "strong");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(36, PaymentComponent_Conditional_12_Conditional_36_Template, 5, 0, "div", 33);
    \u0275\u0275elementStart(37, "div", 34)(38, "div", 35)(39, "span");
    \u0275\u0275text(40, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "strong");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 35)(44, "span");
    \u0275\u0275text(45, "Impuestos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "strong");
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 35)(49, "span");
    \u0275\u0275text(50, "Descuento:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "strong");
    \u0275\u0275text(52);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(53, PaymentComponent_Conditional_12_Conditional_53_Template, 5, 1, "div", 35);
    \u0275\u0275elementStart(54, "div", 36)(55, "span");
    \u0275\u0275text(56, "Total a Pagar:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "strong");
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(59, "div", 37)(60, "h3");
    \u0275\u0275text(61, "M\xE9todo de Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 38);
    \u0275\u0275repeaterCreate(63, PaymentComponent_Conditional_12_For_64_Template, 5, 4, "div", 39, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 40)(66, "h3");
    \u0275\u0275text(67, "Monto Recibido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 41)(69, "span", 42);
    \u0275\u0275text(70, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function PaymentComponent_Conditional_12_Template_input_ngModelChange_71_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.paymentAmount, $event) || (ctx_r2.paymentAmount = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(72, PaymentComponent_Conditional_12_Conditional_72_Template, 4, 1, "div", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(73, PaymentComponent_Conditional_12_Conditional_73_Template, 5, 1, "div", 45);
    \u0275\u0275elementStart(74, "div", 46)(75, "button", 47);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_12_Template_button_click_75_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancel());
    });
    \u0275\u0275text(76, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "button", 48);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_12_Template_button_click_77_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.processPayment());
    });
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.activeCashShift() ? 4 : 5);
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate(ctx_r2.selectedOrder().order_number || ctx_r2.selectedOrder().id.substring(0, 8));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx_r2.selectedOrder().customer) == null ? null : tmp_3_0.name) || "Sin cliente");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_4_0 = ctx_r2.selectedOrder().warehouse) == null ? null : tmp_4_0.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.selectedOrder().items_count || ((tmp_5_0 = ctx_r2.selectedOrder().lines) == null ? null : tmp_5_0.length) || 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedOrder().lines && ctx_r2.selectedOrder().lines.length > 0 ? 36 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.selectedOrder().subtotal || 0));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.selectedOrder().tax || 0));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.selectedOrder().discount || 0));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedOrder().tip && ctx_r2.selectedOrder().tip > 0 ? 53 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.selectedOrder().total));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.paymentMethods);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.paymentAmount);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.paymentMethod() !== "cash" ? 72 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.paymentMethod() === "cash" && ctx_r2.calculateChange() > 0 ? 73 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.processing());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.processing() || ctx_r2.paymentAmount() <= 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.processing() ? "Procesando..." : "Procesar Pago", " ");
  }
}
function PaymentComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 67);
    \u0275\u0275element(2, "rect", 68)(3, "line", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "Selecciona una orden");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Elige una orden de la lista para procesar el pago");
    \u0275\u0275elementEnd()();
  }
}
var PaymentComponent = class _PaymentComponent {
  posService;
  router;
  route;
  snackBar;
  dialog;
  orders = signal([], ...ngDevMode ? [{ debugName: "orders" }] : []);
  filteredOrders = signal([], ...ngDevMode ? [{ debugName: "filteredOrders" }] : []);
  selectedOrder = signal(null, ...ngDevMode ? [{ debugName: "selectedOrder" }] : []);
  activeCashShift = signal(null, ...ngDevMode ? [{ debugName: "activeCashShift" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  processing = signal(false, ...ngDevMode ? [{ debugName: "processing" }] : []);
  checkingShift = signal(false, ...ngDevMode ? [{ debugName: "checkingShift" }] : []);
  // Payment
  paymentMethod = signal("cash", ...ngDevMode ? [{ debugName: "paymentMethod" }] : []);
  paymentAmount = signal(0, ...ngDevMode ? [{ debugName: "paymentAmount" }] : []);
  paymentReference = signal("", ...ngDevMode ? [{ debugName: "paymentReference" }] : []);
  paymentMethods = [
    { value: "cash", label: "Efectivo", icon: "\u{1F4B5}" },
    { value: "card", label: "Tarjeta", icon: "\u{1F4B3}" },
    { value: "transfer", label: "Transferencia", icon: "\u{1F3E6}" }
  ];
  constructor(posService, router, route, snackBar, dialog) {
    this.posService = posService;
    this.router = router;
    this.route = route;
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const orderId = params["orderId"];
      if (orderId) {
        this.loadOrderById(orderId);
      } else {
        this.loadOrders();
      }
    });
    this.checkActiveCashShift();
  }
  checkActiveCashShift() {
    const warehouseId = this.selectedOrder()?.warehouse_id || this.orders()[0]?.warehouse_id;
    if (!warehouseId) {
      return;
    }
    this.checkingShift.set(true);
    this.posService.getActiveCashShift(warehouseId).subscribe({
      next: (shift) => {
        this.activeCashShift.set(shift);
        this.checkingShift.set(false);
      },
      error: (error) => {
        console.log("No active cash shift found");
        this.activeCashShift.set(null);
        this.checkingShift.set(false);
      }
    });
  }
  openCashShift() {
    const dialogRef = this.dialog.open(OpenShiftDialogComponent, {
      width: "600px",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const { warehouse_id, opening_balance, notes } = result;
      this.checkingShift.set(true);
      this.posService.openCashShift({
        warehouse_id,
        cashier_id: "",
        opening_balance
      }).subscribe({
        next: (shift) => {
          this.activeCashShift.set(shift);
          this.checkingShift.set(false);
          this.snackBar.open("Turno de caja abierto exitosamente", "Cerrar", { duration: 3e3 });
        },
        error: (error) => {
          this.checkingShift.set(false);
          this.snackBar.open(error.error?.message || "Error al abrir turno de caja", "Cerrar", { duration: 5e3 });
        }
      });
    });
  }
  closeCashShift() {
    const shift = this.activeCashShift();
    if (!shift) {
      this.snackBar.open("No hay turno activo para cerrar", "Cerrar", { duration: 3e3 });
      return;
    }
    const dialogRef = this.dialog.open(CloseShiftDialogComponent, {
      width: "650px",
      disableClose: true,
      data: { shift }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const { closing_balance, notes } = result;
      this.checkingShift.set(true);
      this.posService.closeCashShift(shift.id, {
        closing_balance,
        notes
      }).subscribe({
        next: (closedShift) => {
          this.activeCashShift.set(null);
          this.checkingShift.set(false);
          const difference = closedShift.difference || 0;
          const diffText = difference === 0 ? "Sin diferencia" : difference > 0 ? `Sobrante: ${this.formatCurrency(difference)}` : `Faltante: ${this.formatCurrency(Math.abs(difference))}`;
          this.snackBar.open(`Turno cerrado. ${diffText}`, "Cerrar", { duration: 5e3 });
        },
        error: (error) => {
          this.checkingShift.set(false);
          this.snackBar.open(error.error?.message || "Error al cerrar turno de caja", "Cerrar", { duration: 5e3 });
        }
      });
    });
  }
  loadOrders() {
    this.loading.set(true);
    this.posService.getOrders({ status: "pending" }).subscribe({
      next: (response) => {
        const orders = Array.isArray(response) ? response : response.data || [];
        this.orders.set(orders);
        this.filteredOrders.set(orders);
        this.loading.set(false);
        if (orders.length > 0 && !this.activeCashShift()) {
          this.checkActiveCashShift();
        }
      },
      error: (error) => {
        console.error("Error loading orders:", error);
        this.snackBar.open("Error al cargar \xF3rdenes", "Cerrar", { duration: 3e3 });
        this.loading.set(false);
      }
    });
  }
  loadOrderById(orderId) {
    this.loading.set(true);
    this.posService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.selectedOrder.set(order);
        this.paymentAmount.set(order.total || 0);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Error loading order:", error);
        this.snackBar.open("Error al cargar la orden", "Cerrar", { duration: 3e3 });
        this.loading.set(false);
        this.loadOrders();
      }
    });
  }
  onSearchChange() {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      this.filteredOrders.set(this.orders());
      return;
    }
    const filtered = this.orders().filter((o) => o.id.toLowerCase().includes(term) || o.customer?.name?.toLowerCase().includes(term));
    this.filteredOrders.set(filtered);
  }
  selectOrder(order) {
    this.loadOrderById(order.id);
  }
  processPayment() {
    const order = this.selectedOrder();
    if (!order) {
      this.snackBar.open("Selecciona una orden", "Cerrar", { duration: 3e3 });
      return;
    }
    if (this.paymentAmount() <= 0) {
      this.snackBar.open("Ingresa un monto v\xE1lido", "Cerrar", { duration: 3e3 });
      return;
    }
    if (!this.activeCashShift()) {
      const snackBarRef = this.snackBar.open("Debes abrir un turno de caja primero", "Abrir Turno", {
        duration: 5e3
      });
      snackBarRef.onAction().subscribe(() => {
        this.openCashShift();
      });
      return;
    }
    this.processing.set(true);
    const paymentData = {
      payment_method: this.paymentMethod(),
      amount_paid: this.paymentAmount(),
      tip: 0
    };
    this.posService.processPayment(order.id, paymentData).subscribe({
      next: () => {
        this.snackBar.open("Pago procesado exitosamente", "Cerrar", { duration: 3e3 });
        this.selectedOrder.set(null);
        this.paymentAmount.set(0);
        this.paymentReference.set("");
        this.loadOrders();
        this.processing.set(false);
      },
      error: (error) => {
        const errorMsg = error.error?.message || error.message || "Error al procesar pago";
        if (errorMsg.includes("cash shift") || errorMsg.includes("turno")) {
          this.activeCashShift.set(null);
          const snackBarRef = this.snackBar.open("No hay turno de caja activo. Abre un turno primero.", "Abrir Turno", {
            duration: 5e3
          });
          snackBarRef.onAction().subscribe(() => {
            this.openCashShift();
          });
        } else {
          this.snackBar.open(errorMsg, "Cerrar", { duration: 5e3 });
        }
        this.processing.set(false);
      }
    });
  }
  calculateChange() {
    const order = this.selectedOrder();
    if (!order)
      return 0;
    const total = order.total || 0;
    return Math.max(0, this.paymentAmount() - total);
  }
  cancel() {
    if (this.selectedOrder()) {
      this.selectedOrder.set(null);
      this.paymentAmount.set(0);
      this.paymentReference.set("");
    } else {
      this.router.navigate(["/pos"]);
    }
  }
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  }
  static \u0275fac = function PaymentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentComponent)(\u0275\u0275directiveInject(POSService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentComponent, selectors: [["app-payment"]], decls: 14, vars: 4, consts: [[1, "payment-container"], [1, "orders-panel"], [1, "panel-header"], ["type", "text", "placeholder", "Buscar orden...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "orders-list"], [1, "order-card", 3, "selected"], [1, "empty-orders"], [1, "loading"], [1, "payment-panel"], [1, "no-selection"], [1, "order-card", 3, "click"], [1, "order-header"], [1, "order-id"], [1, "order-total"], [1, "order-details"], [1, "order-customer"], [1, "order-warehouse"], [1, "order-items"], ["xmlns", "http://www.w3.org/2000/svg", "width", "64", "height", "64", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"], ["cx", "12", "cy", "7", "r", "4"], [1, "spinner"], [1, "header-actions"], [1, "shift-status-group"], [1, "btn-open-shift", 3, "disabled"], [1, "btn-back", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "payment-content"], [1, "order-summary"], [1, "summary-details"], [1, "detail-row"], [1, "order-lines"], [1, "summary-totals"], [1, "total-row"], [1, "total-row", "grand"], [1, "payment-method"], [1, "method-options"], [1, "method-option", 3, "selected"], [1, "payment-amount"], [1, "amount-input-wrapper"], [1, "currency-symbol"], ["type", "number", "min", "0", "step", "0.01", 1, "amount-input", 3, "ngModelChange", "ngModel"], [1, "reference-input"], [1, "change-display"], [1, "payment-actions"], [1, "btn-cancel", 3, "click", "disabled"], [1, "btn-process", 3, "click", "disabled"], [1, "shift-status", "active"], ["xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], [1, "btn-close-shift", 3, "click", "disabled"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2", "ry", "2"], ["x1", "9", "y1", "9", "x2", "15", "y2", "15"], ["x1", "15", "y1", "9", "x2", "9", "y2", "15"], [1, "btn-open-shift", 3, "click", "disabled"], ["x", "2", "y", "7", "width", "20", "height", "14", "rx", "2", "ry", "2"], ["d", "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"], [1, "line-item"], [1, "line-info"], [1, "line-product"], [1, "line-quantity"], [1, "line-total"], [1, "method-option", 3, "click"], [1, "method-icon"], [1, "method-label"], ["type", "text", "placeholder", "N\xFAmero de referencia", 3, "ngModelChange", "ngModel"], ["xmlns", "http://www.w3.org/2000/svg", "width", "80", "height", "80", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "1", "y", "4", "width", "22", "height", "16", "rx", "2", "ry", "2"], ["x1", "1", "y1", "10", "x2", "23", "y2", "10"]], template: function PaymentComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2");
      \u0275\u0275text(4, "\xD3rdenes Pendientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "input", 3);
      \u0275\u0275twoWayListener("ngModelChange", function PaymentComponent_Template_input_ngModelChange_5_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function PaymentComponent_Template_input_ngModelChange_5_listener() {
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275repeaterCreate(7, PaymentComponent_For_8_Template, 13, 7, "div", 5, _forTrack0);
      \u0275\u0275conditionalCreate(9, PaymentComponent_Conditional_9_Template, 6, 0, "div", 6);
      \u0275\u0275conditionalCreate(10, PaymentComponent_Conditional_10_Template, 4, 0, "div", 7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 8);
      \u0275\u0275conditionalCreate(12, PaymentComponent_Conditional_12_Template, 79, 17)(13, PaymentComponent_Conditional_13_Template, 8, 0, "div", 9);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredOrders());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.filteredOrders().length === 0 && !ctx.loading() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 10 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.selectedOrder() ? 12 : 13);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel], styles: ["\n\n.payment-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  height: 100vh;\n  overflow: hidden;\n  background: #f5f5f5;\n  z-index: 1000;\n}\n.orders-panel[_ngcontent-%COMP%], \n.payment-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n}\n.orders-panel[_ngcontent-%COMP%] {\n  background: white;\n  border-right: 1px solid #e5e7eb;\n}\n.payment-panel[_ngcontent-%COMP%] {\n  background: #fafafa;\n}\n.panel-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n  background: white;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.panel-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n.panel-header[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  background: white;\n  color: #6b7280;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 600;\n  transition: all 0.2s;\n}\n.panel-header[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  border-color: #667eea;\n  color: #667eea;\n}\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  font-size: 1rem;\n  margin-top: 1rem;\n  transition: border-color 0.2s;\n}\n.search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.orders-list[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n}\n.order-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.order-card[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n  transform: translateX(4px);\n}\n.order-card.selected[_ngcontent-%COMP%] {\n  border-color: #667eea;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(102, 126, 234, 0.05) 0%,\n      rgba(118, 75, 162, 0.05) 100%);\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   .order-id[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.order-card[_ngcontent-%COMP%]   .order-header[_ngcontent-%COMP%]   .order-total[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #667eea;\n}\n.order-card[_ngcontent-%COMP%]   .order-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0;\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.order-card[_ngcontent-%COMP%]   .order-details[_ngcontent-%COMP%]   .order-customer[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1f2937;\n}\n.payment-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 2rem;\n}\n.order-summary[_ngcontent-%COMP%], \n.payment-method[_ngcontent-%COMP%], \n.payment-amount[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.order-summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.payment-method[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.payment-amount[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 1rem 0;\n}\n.summary-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.summary-details[_ngcontent-%COMP%]   .detail-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1f2937;\n}\n.summary-totals[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding-top: 1.5rem;\n  border-top: 2px solid #e5e7eb;\n}\n.summary-totals[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-size: 1rem;\n  color: #6b7280;\n}\n.summary-totals[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1f2937;\n}\n.summary-totals[_ngcontent-%COMP%]   .total-row.grand[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  padding-top: 0.75rem;\n  border-top: 2px solid #e5e7eb;\n  margin-top: 0.75rem;\n}\n.summary-totals[_ngcontent-%COMP%]   .total-row.grand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #667eea;\n}\n.method-options[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n.method-option[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1.5rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.method-option[_ngcontent-%COMP%]:hover {\n  border-color: #667eea;\n}\n.method-option.selected[_ngcontent-%COMP%] {\n  border-color: #667eea;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n}\n.method-option[_ngcontent-%COMP%]   .method-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.method-option[_ngcontent-%COMP%]   .method-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.amount-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.amount-input-wrapper[_ngcontent-%COMP%]   .currency-symbol[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 1.5rem;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #667eea;\n}\n.amount-input-wrapper[_ngcontent-%COMP%]   .amount-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1f2937;\n  transition: border-color 0.2s;\n}\n.amount-input-wrapper[_ngcontent-%COMP%]   .amount-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.reference-input[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.reference-input[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #6b7280;\n  margin-bottom: 0.5rem;\n}\n.reference-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  font-size: 1rem;\n}\n.reference-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.change-display[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981 0%,\n      #059669 100%);\n  color: white;\n  padding: 1.5rem;\n  border-radius: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);\n}\n.payment-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1.5rem;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.payment-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 1.25rem;\n  border-radius: 12px;\n  font-size: 1.125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.payment-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.payment-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: white;\n  border: 2px solid #e5e7eb;\n  color: #6b7280;\n}\n.payment-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.payment-actions[_ngcontent-%COMP%]   .btn-process[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  color: white;\n}\n.payment-actions[_ngcontent-%COMP%]   .btn-process[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.no-selection[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #9ca3af;\n  text-align: center;\n  padding: 2rem;\n}\n.no-selection[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  opacity: 0.5;\n}\n.no-selection[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0 0 0.5rem 0;\n}\n.no-selection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin: 0;\n}\n.empty-orders[_ngcontent-%COMP%], \n.loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #9ca3af;\n  text-align: center;\n}\n.empty-orders[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.loading[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.empty-orders[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 1024px) {\n  .payment-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: auto 1fr;\n  }\n  .orders-panel[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid #e5e7eb;\n    max-height: 40vh;\n  }\n  .method-options[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.order-lines[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n  padding: 1rem;\n  background: #f9fafb;\n  border-radius: 8px;\n}\n.order-lines[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  margin: 0 0 1rem 0;\n  letter-spacing: 0.05em;\n}\n.order-lines[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.order-lines[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.order-lines[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.order-lines[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-info[_ngcontent-%COMP%]   .line-product[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #1f2937;\n}\n.order-lines[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-info[_ngcontent-%COMP%]   .line-quantity[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.order-lines[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-total[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #667eea;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.shift-status-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.shift-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.shift-status.active[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #065f46;\n}\n.shift-status[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.btn-close-shift[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-close-shift[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #dc2626;\n  transform: translateY(-1px);\n}\n.btn-close-shift[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-close-shift[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.btn-open-shift[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background: #667eea;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-open-shift[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #5568d3;\n  transform: translateY(-1px);\n}\n.btn-open-shift[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-open-shift[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=payment.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentComponent, [{
    type: Component,
    args: [{ selector: "app-payment", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="payment-container">\r
  <!-- Left Panel: Orders List -->\r
  <div class="orders-panel">\r
    <div class="panel-header">\r
      <h2>\xD3rdenes Pendientes</h2>\r
      <input \r
        type="text" \r
        class="search-input"\r
        placeholder="Buscar orden..."\r
        [(ngModel)]="searchTerm"\r
        (ngModelChange)="onSearchChange()"\r
      />\r
    </div>\r
\r
    <div class="orders-list">\r
      @for (order of filteredOrders(); track order.id) {\r
        <div \r
          class="order-card"\r
          [class.selected]="selectedOrder()?.id === order.id"\r
          (click)="selectOrder(order)"\r
        >\r
          <div class="order-header">\r
            <span class="order-id">{{ order.order_number || order.id.substring(0, 8) }}</span>\r
            <span class="order-total">{{ formatCurrency(order.total) }}</span>\r
          </div>\r
          <div class="order-details">\r
            <p class="order-customer">{{ order.customer?.name || 'Sin cliente' }}</p>\r
            <p class="order-warehouse">{{ order.warehouse?.name }}</p>\r
            <p class="order-items">{{ order.items_count || 0 }} productos</p>\r
          </div>\r
        </div>\r
      }\r
\r
      @if (filteredOrders().length === 0 && !loading()) {\r
        <div class="empty-orders">\r
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>\r
            <circle cx="12" cy="7" r="4"></circle>\r
          </svg>\r
          <p>No hay \xF3rdenes pendientes</p>\r
        </div>\r
      }\r
\r
      @if (loading()) {\r
        <div class="loading">\r
          <div class="spinner"></div>\r
          <p>Cargando \xF3rdenes...</p>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
\r
  <!-- Right Panel: Payment -->\r
  <div class="payment-panel">\r
    @if (selectedOrder()) {\r
      <div class="panel-header">\r
        <h2>Procesar Pago</h2>\r
        <div class="header-actions">\r
          <!-- Cash Shift Status -->\r
          @if (activeCashShift()) {\r
            <div class="shift-status-group">\r
              <div class="shift-status active">\r
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>\r
                  <circle cx="12" cy="7" r="4"></circle>\r
                </svg>\r
                Turno Activo\r
              </div>\r
              <button class="btn-close-shift" (click)="closeCashShift()" [disabled]="checkingShift()">\r
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>\r
                  <line x1="9" y1="9" x2="15" y2="15"></line>\r
                  <line x1="15" y1="9" x2="9" y2="15"></line>\r
                </svg>\r
                Cerrar Turno\r
              </button>\r
            </div>\r
          } @else {\r
            <button class="btn-open-shift" (click)="openCashShift()" [disabled]="checkingShift()">\r
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>\r
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>\r
              </svg>\r
              {{ checkingShift() ? 'Verificando...' : 'Abrir Turno' }}\r
            </button>\r
          }\r
          \r
          <button class="btn-back" (click)="cancel()">\r
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
              <line x1="19" y1="12" x2="5" y2="12"></line>\r
              <polyline points="12 19 5 12 12 5"></polyline>\r
            </svg>\r
            Volver\r
          </button>\r
        </div>\r
      </div>\r
\r
      <div class="payment-content">\r
        <!-- Order Summary -->\r
        <div class="order-summary">\r
          <h3>Resumen de Orden</h3>\r
          <div class="summary-details">\r
            <div class="detail-row">\r
              <span>Orden:</span>\r
              <strong>{{ selectedOrder()!.order_number || selectedOrder()!.id.substring(0, 8) }}</strong>\r
            </div>\r
            <div class="detail-row">\r
              <span>Cliente:</span>\r
              <strong>{{ selectedOrder()!.customer?.name || 'Sin cliente' }}</strong>\r
            </div>\r
            <div class="detail-row">\r
              <span>Almac\xE9n:</span>\r
              <strong>{{ selectedOrder()!.warehouse?.name }}</strong>\r
            </div>\r
            <div class="detail-row">\r
              <span>Productos:</span>\r
              <strong>{{ selectedOrder()!.items_count || selectedOrder()!.lines?.length || 0 }}</strong>\r
            </div>\r
          </div>\r
\r
          <!-- Product Lines -->\r
          @if (selectedOrder()!.lines && selectedOrder()!.lines.length > 0) {\r
            <div class="order-lines">\r
              <h4>Productos</h4>\r
              @for (line of selectedOrder()!.lines; track line.id) {\r
                <div class="line-item">\r
                  <div class="line-info">\r
                    <span class="line-product">{{ line.product?.name || 'Producto' }}</span>\r
                    <span class="line-quantity">x{{ line.quantity }} {{ line.uom?.abbreviation || line.uom?.name || '' }}</span>\r
                  </div>\r
                  <span class="line-total">{{ formatCurrency(line.line_total || line.subtotal || 0) }}</span>\r
                </div>\r
              }\r
            </div>\r
          }\r
\r
          <div class="summary-totals">\r
            <div class="total-row">\r
              <span>Subtotal:</span>\r
              <strong>{{ formatCurrency(selectedOrder()!.subtotal || 0) }}</strong>\r
            </div>\r
            <div class="total-row">\r
              <span>Impuestos:</span>\r
              <strong>{{ formatCurrency(selectedOrder()!.tax || 0) }}</strong>\r
            </div>\r
            <div class="total-row">\r
              <span>Descuento:</span>\r
              <strong>{{ formatCurrency(selectedOrder()!.discount || 0) }}</strong>\r
            </div>\r
            @if (selectedOrder()!.tip && selectedOrder()!.tip > 0) {\r
              <div class="total-row">\r
                <span>Propina:</span>\r
                <strong>{{ formatCurrency(selectedOrder()!.tip) }}</strong>\r
              </div>\r
            }\r
            <div class="total-row grand">\r
              <span>Total a Pagar:</span>\r
              <strong>{{ formatCurrency(selectedOrder()!.total) }}</strong>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Payment Method -->\r
        <div class="payment-method">\r
          <h3>M\xE9todo de Pago</h3>\r
          <div class="method-options">\r
            @for (method of paymentMethods; track method.value) {\r
              <div \r
                class="method-option"\r
                [class.selected]="paymentMethod() === method.value"\r
                (click)="paymentMethod.set(method.value)"\r
              >\r
                <span class="method-icon">{{ method.icon }}</span>\r
                <span class="method-label">{{ method.label }}</span>\r
              </div>\r
            }\r
          </div>\r
        </div>\r
\r
        <!-- Payment Amount -->\r
        <div class="payment-amount">\r
          <h3>Monto Recibido</h3>\r
          <div class="amount-input-wrapper">\r
            <span class="currency-symbol">$</span>\r
            <input \r
              type="number" \r
              class="amount-input"\r
              [(ngModel)]="paymentAmount"\r
              min="0"\r
              step="0.01"\r
            />\r
          </div>\r
\r
          @if (paymentMethod() !== 'cash') {\r
            <div class="reference-input">\r
              <label>Referencia / Autorizaci\xF3n</label>\r
              <input \r
                type="text" \r
                [(ngModel)]="paymentReference"\r
                placeholder="N\xFAmero de referencia"\r
              />\r
            </div>\r
          }\r
        </div>\r
\r
        <!-- Change -->\r
        @if (paymentMethod() === 'cash' && calculateChange() > 0) {\r
          <div class="change-display">\r
            <span>Cambio:</span>\r
            <strong>{{ formatCurrency(calculateChange()) }}</strong>\r
          </div>\r
        }\r
\r
        <!-- Actions -->\r
        <div class="payment-actions">\r
          <button \r
            class="btn-cancel" \r
            (click)="cancel()"\r
            [disabled]="processing()"\r
          >\r
            Cancelar\r
          </button>\r
          <button \r
            class="btn-process" \r
            (click)="processPayment()"\r
            [disabled]="processing() || paymentAmount() <= 0"\r
          >\r
            {{ processing() ? 'Procesando...' : 'Procesar Pago' }}\r
          </button>\r
        </div>\r
      </div>\r
    } @else {\r
      <div class="no-selection">\r
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>\r
          <line x1="1" y1="10" x2="23" y2="10"></line>\r
        </svg>\r
        <h3>Selecciona una orden</h3>\r
        <p>Elige una orden de la lista para procesar el pago</p>\r
      </div>\r
    }\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/pos/pages/payment/payment.component.scss */\n.payment-container {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n  height: 100vh;\n  overflow: hidden;\n  background: #f5f5f5;\n  z-index: 1000;\n}\n.orders-panel,\n.payment-panel {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  overflow: hidden;\n}\n.orders-panel {\n  background: white;\n  border-right: 1px solid #e5e7eb;\n}\n.payment-panel {\n  background: #fafafa;\n}\n.panel-header {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n  background: white;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.panel-header h2 {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n.panel-header .btn-back {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 8px;\n  background: white;\n  color: #6b7280;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 600;\n  transition: all 0.2s;\n}\n.panel-header .btn-back:hover {\n  background: #f9fafb;\n  border-color: #667eea;\n  color: #667eea;\n}\n.search-input {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  font-size: 1rem;\n  margin-top: 1rem;\n  transition: border-color 0.2s;\n}\n.search-input:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.orders-list {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n}\n.order-card {\n  background: white;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.order-card:hover {\n  border-color: #667eea;\n  transform: translateX(4px);\n}\n.order-card.selected {\n  border-color: #667eea;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(102, 126, 234, 0.05) 0%,\n      rgba(118, 75, 162, 0.05) 100%);\n}\n.order-card .order-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.order-card .order-header .order-id {\n  font-family: monospace;\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.order-card .order-header .order-total {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #667eea;\n}\n.order-card .order-details p {\n  margin: 0.25rem 0;\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.order-card .order-details .order-customer {\n  font-weight: 600;\n  color: #1f2937;\n}\n.payment-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 2rem;\n}\n.order-summary,\n.payment-method,\n.payment-amount {\n  background: white;\n  border-radius: 16px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.order-summary h3,\n.payment-method h3,\n.payment-amount h3 {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0 0 1rem 0;\n}\n.summary-details .detail-row {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-size: 0.875rem;\n  color: #6b7280;\n}\n.summary-details .detail-row strong {\n  color: #1f2937;\n}\n.summary-totals {\n  margin-top: 1.5rem;\n  padding-top: 1.5rem;\n  border-top: 2px solid #e5e7eb;\n}\n.summary-totals .total-row {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-size: 1rem;\n  color: #6b7280;\n}\n.summary-totals .total-row strong {\n  color: #1f2937;\n}\n.summary-totals .total-row.grand {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1f2937;\n  padding-top: 0.75rem;\n  border-top: 2px solid #e5e7eb;\n  margin-top: 0.75rem;\n}\n.summary-totals .total-row.grand strong {\n  color: #667eea;\n}\n.method-options {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n.method-option {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1.5rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.method-option:hover {\n  border-color: #667eea;\n}\n.method-option.selected {\n  border-color: #667eea;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(102, 126, 234, 0.1) 0%,\n      rgba(118, 75, 162, 0.1) 100%);\n}\n.method-option .method-icon {\n  font-size: 2rem;\n}\n.method-option .method-label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.amount-input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.amount-input-wrapper .currency-symbol {\n  position: absolute;\n  left: 1.5rem;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #667eea;\n}\n.amount-input-wrapper .amount-input {\n  width: 100%;\n  padding: 1.5rem 1.5rem 1.5rem 4rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1f2937;\n  transition: border-color 0.2s;\n}\n.amount-input-wrapper .amount-input:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.reference-input {\n  margin-top: 1rem;\n}\n.reference-input label {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #6b7280;\n  margin-bottom: 0.5rem;\n}\n.reference-input input {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e5e7eb;\n  border-radius: 12px;\n  font-size: 1rem;\n}\n.reference-input input:focus {\n  outline: none;\n  border-color: #667eea;\n}\n.change-display {\n  background:\n    linear-gradient(\n      135deg,\n      #10b981 0%,\n      #059669 100%);\n  color: white;\n  padding: 1.5rem;\n  border-radius: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);\n}\n.payment-actions {\n  display: flex;\n  gap: 1rem;\n  padding: 1.5rem;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.payment-actions button {\n  flex: 1;\n  padding: 1.25rem;\n  border-radius: 12px;\n  font-size: 1.125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.payment-actions button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.payment-actions .btn-cancel {\n  background: white;\n  border: 2px solid #e5e7eb;\n  color: #6b7280;\n}\n.payment-actions .btn-cancel:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.payment-actions .btn-process {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  color: white;\n}\n.payment-actions .btn-process:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.no-selection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #9ca3af;\n  text-align: center;\n  padding: 2rem;\n}\n.no-selection svg {\n  margin-bottom: 1.5rem;\n  opacity: 0.5;\n}\n.no-selection h3 {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0 0 0.5rem 0;\n}\n.no-selection p {\n  font-size: 1rem;\n  margin: 0;\n}\n.empty-orders,\n.loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem;\n  color: #9ca3af;\n  text-align: center;\n}\n.empty-orders svg,\n.loading svg {\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.empty-orders p,\n.loading p {\n  margin: 0;\n}\n.spinner {\n  width: 48px;\n  height: 48px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #667eea;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin-bottom: 1rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (max-width: 1024px) {\n  .payment-container {\n    grid-template-columns: 1fr;\n    grid-template-rows: auto 1fr;\n  }\n  .orders-panel {\n    border-right: none;\n    border-bottom: 1px solid #e5e7eb;\n    max-height: 40vh;\n  }\n  .method-options {\n    grid-template-columns: 1fr;\n  }\n}\n.order-lines {\n  margin: 1.5rem 0;\n  padding: 1rem;\n  background: #f9fafb;\n  border-radius: 8px;\n}\n.order-lines h4 {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  margin: 0 0 1rem 0;\n  letter-spacing: 0.05em;\n}\n.order-lines .line-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.order-lines .line-item:last-child {\n  border-bottom: none;\n}\n.order-lines .line-item .line-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.order-lines .line-item .line-info .line-product {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #1f2937;\n}\n.order-lines .line-item .line-info .line-quantity {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.order-lines .line-item .line-total {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #667eea;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.shift-status-group {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.shift-status {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.shift-status.active {\n  background: #d1fae5;\n  color: #065f46;\n}\n.shift-status svg {\n  flex-shrink: 0;\n}\n.btn-close-shift {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-close-shift:hover:not(:disabled) {\n  background: #dc2626;\n  transform: translateY(-1px);\n}\n.btn-close-shift:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-close-shift svg {\n  flex-shrink: 0;\n}\n.btn-open-shift {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background: #667eea;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.btn-open-shift:hover:not(:disabled) {\n  background: #5568d3;\n  transform: translateY(-1px);\n}\n.btn-open-shift:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-open-shift svg {\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=payment.component.css.map */\n"] }]
  }], () => [{ type: POSService }, { type: Router }, { type: ActivatedRoute }, { type: MatSnackBar }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentComponent, { className: "PaymentComponent", filePath: "src/app/features/pos/pages/payment/payment.component.ts", lineNumber: 19 });
})();
export {
  PaymentComponent
};
//# sourceMappingURL=chunk-MBUU2LKH.js.map
