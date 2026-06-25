import {
  SalesOrderService
} from "./chunk-AVYJO47D.js";
import {
  RemoveTrailingZerosPipe
} from "./chunk-SJQGKJ7C.js";
import {
  TaxCalculatorService
} from "./chunk-ZYCDY34Q.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "./chunk-7BUZEU6Z.js";
import {
  FiscalConfigurationModalComponent,
  ProductDetailModalComponent,
  WarehouseDetailModalComponent
} from "./chunk-AHSBPELP.js";
import {
  FiscalConfigurationService
} from "./chunk-JBTWC3N5.js";
import {
  posCollectionMethodLabel,
  posCollectionMoneyLabel,
  posCollectionUsdLabel
} from "./chunk-MYIXEAY7.js";
import {
  CustomerEditModalComponent
} from "./chunk-ICUJPGZG.js";
import {
  CustomerService
} from "./chunk-MQPBVVXA.js";
import {
  TabComponent
} from "./chunk-N7SBDJ32.js";
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
  FormBuilder,
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
} from "./chunk-5M3EQ6HX.js";
import {
  ToastService
} from "./chunk-YTYO4VTK.js";
import {
  Router
} from "./chunk-YUPXBHST.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-FGZNYMY3.js";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  __spreadProps,
  __spreadValues,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XEFUC5ED.js";

// src/app/features/sales-orders/utils/customer-display.util.ts
function getCustomerDisplayName(customer, fallback = "N/A") {
  if (!customer)
    return fallback;
  const fullName = `${customer.name || ""} ${customer.lastname || ""}`.trim();
  return fullName || customer.company_name || fallback;
}
function getCustomerSummaryDisplayName(summary, fallback = "N/A") {
  if (!summary?.display_name?.trim()) {
    return fallback;
  }
  const name = summary.display_name.trim();
  return summary.is_walk_in ? `${name} (mostrador)` : name;
}
function resolveSalesOrderCustomerName(order, fallback = "N/A") {
  if (!order) {
    return fallback;
  }
  if (order.customer_display_name?.trim()) {
    const name = order.customer_display_name.trim();
    if (order.customer_summary?.is_walk_in) {
      return `${name} (mostrador)`;
    }
    return name;
  }
  const summaryName = getCustomerSummaryDisplayName(order.customer_summary, "");
  if (summaryName) {
    return summaryName;
  }
  return getCustomerDisplayName(order.customer, fallback);
}
function resolveSalesOrderCustomerId(order) {
  if (!order) {
    return null;
  }
  if (order.customer_summary?.id != null) {
    return order.customer_summary.id;
  }
  if (order.customer_id != null && order.customer_id !== "") {
    return order.customer_id;
  }
  if (order.customer?.id != null) {
    return order.customer.id;
  }
  return null;
}

// src/app/features/sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id || $index;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.id || $item.uuid || $index;
var _forTrack3 = ($index, $item) => ($item.allocation == null ? null : $item.allocation.id) || $index;
function SalesOrderDetailDialogComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "p", 3);
    \u0275\u0275text(2, "Cargando orden...");
    \u0275\u0275elementEnd()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 54);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToEditForm());
    });
    \u0275\u0275element(1, "i", 55);
    \u0275\u0275text(2, " Editar orden ");
    \u0275\u0275elementEnd();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 22);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 22);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 22);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2, "Cobrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.formatPosCollectedAt(pay_r4.collected_at));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2, "Efectivo recibido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.posCollectionMoney(pay_r4.received_cash_mxn));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2, "USD recibido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.posCollectionUsd(pay_r4.received_cash_usd));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2, "Transferencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.posCollectionMoney(pay_r4.amount_transfer_mxn));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2, "Tarjeta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.posCollectionMoney(pay_r4.amount_card_mxn));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "span", 30);
    \u0275\u0275text(2, "Cambio MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 57);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.posCollectionMoney(pay_r4.change_cash_mxn));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "span", 30);
    \u0275\u0275text(2, "Cambio USD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 57);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r4 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.posCollectionUsd(pay_r4.change_cash_usd));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "h3", 28);
    \u0275\u0275text(2, "COBRO POS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 29)(4, "span", 30);
    \u0275\u0275text(5, "M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_8_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(9, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_9_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(10, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_10_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(11, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_11_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(12, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_12_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(13, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_13_Template, 5, 1, "div", 56);
    \u0275\u0275conditionalCreate(14, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_14_Template, 5, 1, "div", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pay_r4 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.posPaymentMethodLabel());
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r4.collected_at ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r4.received_cash_mxn != null && +pay_r4.received_cash_mxn > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r4.received_cash_usd != null && +pay_r4.received_cash_usd > 0 ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r4.amount_transfer_mxn != null && +pay_r4.amount_transfer_mxn > 0 ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r4.amount_card_mxn != null && +pay_r4.amount_card_mxn > 0 ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r4.change_cash_mxn != null && +pay_r4.change_cash_mxn > 0 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r4.change_cash_usd != null && +pay_r4.change_cash_usd > 0 ? 14 : -1);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 40);
    \u0275\u0275text(2, "Descuento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.getDisplayedDiscount());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "span", 40);
    \u0275\u0275text(2, "Impuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.getDisplayedTaxes());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 60);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_For_16_Template_div_click_2_listener() {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(item_r6) && ctx_r2.openProductDetail(item_r6));
    })("keydown.enter", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_For_16_Template_div_keydown_enter_2_listener() {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(item_r6) && ctx_r2.openProductDetail(item_r6));
    })("keydown.space", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_For_16_Template_div_keydown_space_2_listener($event) {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(item_r6) && ctx_r2.openProductDetail(item_r6));
    });
    \u0275\u0275elementStart(3, "strong");
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
    \u0275\u0275elementStart(11, "td")(12, "span", 61);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "span", 61);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "removeTrailingZeros");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("row-clickable", ctx_r2.canOpenProduct(item_r6));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("product-info--clickable", ctx_r2.canOpenProduct(item_r6));
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenProduct(item_r6) ? 0 : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r6.product == null ? null : item_r6.product.name) || item_r6.product_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r6.product == null ? null : item_r6.product.sku) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(item_r6.unit_price));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.getLineTotal(item_r6)));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(14, 15, ctx_r2.getRequestedQuantity(item_r6)), " ", ctx_r2.getLineUom(item_r6));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("qty-pill--muted", ctx_r2.getDeliveredQuantity(item_r6) === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(18, 17, ctx_r2.getDeliveredQuantity(item_r6)), " ", ctx_r2.getLineUom(item_r6), " ");
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 62)(2, "div", 63);
    \u0275\u0275element(3, "i", 24);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No hay l\xEDneas");
    \u0275\u0275elementEnd()()()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "table", 58)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "PRECIO UNIT.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "TOTAL L\xCDNEA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "SOLICITADAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "ENTREGADAS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_For_16_Template, 19, 19, "tr", 59, _forTrack0, false, SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_ForEmpty_17_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.lineItems());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 66);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 67);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_For_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_For_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 69)(3, "span", 70);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275conditionalCreate(6, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_For_15_Conditional_6_Template, 2, 1, "span", 71)(7, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_For_15_Conditional_7_Template, 2, 0, "span", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 73);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td")(12, "span", 74);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "div", 75)(16, "button", 76);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_For_15_Template_button_click_16_listener() {
      const doc_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.downloadDocument(doc_r9));
    });
    \u0275\u0275element(17, "i", 77);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const doc_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r2.getDocumentBadgeClass(doc_r9.document_type_name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r9.document_type_name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_15_0 = ctx_r2.getDocumentLanguageLabel(doc_r9.document_language)) ? 6 : 7, tmp_15_0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(doc_r9.document_name || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatDocumentDate(doc_r9.uploaded_at));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 68)(1, "thead")(2, "tr")(3, "th");
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
    \u0275\u0275repeaterCreate(14, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_For_15_Template, 18, 5, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.documents());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275element(1, "i", 26);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay documentos adjuntos");
    \u0275\u0275elementEnd()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 64)(2, "button", 65);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.regeneratePDF());
    });
    \u0275\u0275conditionalCreate(3, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_3_Template, 1, 0, "i", 66)(4, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_4_Template, 1, 0, "i", 67);
    \u0275\u0275text(5, " Regenerar PDF Original ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_6_Template, 16, 0, "table", 68)(7, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Conditional_7_Template, 4, 0, "div", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.regeneratingPDF());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.regeneratingPDF() ? 3 : 4);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.hasDocuments() ? 6 : 7);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_28_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const invoice_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r10.folio || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r10.uuid || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r10.issued_at ? \u0275\u0275pipeBind2(7, 5, invoice_r10.issued_at, "short") : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(invoice_r10.total));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r10.status || "\u2014");
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 58)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "FOLIO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "UUID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "FECHA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "MONTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "ESTADO");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_28_For_15_Template, 12, 8, "tr", null, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.getInvoices());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275element(1, "i", 86);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Sin facturas emitidas para esta orden");
    \u0275\u0275elementEnd()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 78)(2, "h3", 79);
    \u0275\u0275text(3, "Datos fiscales de la orden");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 80)(5, "div", 81)(6, "span", 82);
    \u0275\u0275text(7, "Raz\xF3n social");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 83);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 81)(11, "span", 82);
    \u0275\u0275text(12, "RFC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 83);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 81)(16, "span", 82);
    \u0275\u0275text(17, "Tipo de persona");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 83);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 81)(21, "span", 82);
    \u0275\u0275text(22, "R\xE9gimen fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 83);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 84)(26, "h3", 79);
    \u0275\u0275text(27, "CFDI / Facturas");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_28_Template, 16, 0, "table", 58)(29, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_29_Template, 4, 0, "div", 63);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.getFiscalDisplayName());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx_r2.order().fiscal_configuration) == null ? null : tmp_3_0.rfc) || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r2.order().fiscal_configuration) == null ? null : tmp_4_0.persona_type) || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(((tmp_5_0 = ctx_r2.order().fiscal_configuration) == null ? null : tmp_5_0.fiscal_regime) || "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.getInvoices().length > 0 ? 28 : 29);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 87);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_For_14_Template_div_click_2_listener() {
      const row_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(row_r12.item) && ctx_r2.openProductDetail(row_r12.item));
    })("keydown.enter", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_For_14_Template_div_keydown_enter_2_listener() {
      const row_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(row_r12.item) && ctx_r2.openProductDetail(row_r12.item));
    })("keydown.space", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_For_14_Template_div_keydown_space_2_listener($event) {
      const row_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(row_r12.item) && ctx_r2.openProductDetail(row_r12.item));
    });
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "removeTrailingZeros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("row-clickable", ctx_r2.canOpenProduct(row_r12.item));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("product-info--clickable", ctx_r2.canOpenProduct(row_r12.item));
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenProduct(row_r12.item) ? 0 : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((row_r12.item.product == null ? null : row_r12.item.product.name) || row_r12.item.product_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((row_r12.allocation == null ? null : row_r12.allocation.inventory_batch == null ? null : row_r12.allocation.inventory_batch.batch_number) || (row_r12.allocation == null ? null : row_r12.allocation.inventory_batch_id) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, row_r12.allocation == null ? null : row_r12.allocation.quantity_allocated));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 11, row_r12.allocation == null ? null : row_r12.allocation.created_at, "short"));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_ForEmpty_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 88)(2, "div", 63);
    \u0275\u0275element(3, "i", 89);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Sin asignaciones de lotes");
    \u0275\u0275elementEnd()()()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "table", 58)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "LOTE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "CANTIDAD ASIGNADA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "CREADO");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275repeaterCreate(13, SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_For_14_Template, 13, 14, "tr", 59, _forTrack3, false, SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_ForEmpty_15_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r2.getBatchAllocationsRows());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "span", 6);
    \u0275\u0275text(3, "VENTA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 7);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, SalesOrderDetailDialogComponent_Conditional_2_Conditional_6_Template, 3, 0, "button", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 9)(8, "span", 10);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 11);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.close());
    });
    \u0275\u0275element(11, "i", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 13)(13, "div", 14)(14, "div", 15)(15, "div", 16);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_click_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenCustomer() && ctx_r2.openCustomerInNewTab());
    })("keydown.enter", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_keydown_enter_15_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenCustomer() && ctx_r2.openCustomerInNewTab());
    })("keydown.space", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_keydown_space_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenCustomer() && ctx_r2.openCustomerInNewTab());
    });
    \u0275\u0275elementStart(16, "div", 17);
    \u0275\u0275element(17, "i", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 19)(19, "span", 20);
    \u0275\u0275text(20, "CLIENTE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 21);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, SalesOrderDetailDialogComponent_Conditional_2_Conditional_23_Template, 1, 0, "i", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 23);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_click_24_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenWarehouse() && ctx_r2.openWarehouseDialog());
    })("keydown.enter", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_keydown_enter_24_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenWarehouse() && ctx_r2.openWarehouseDialog());
    })("keydown.space", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_keydown_space_24_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenWarehouse() && ctx_r2.openWarehouseDialog());
    });
    \u0275\u0275elementStart(25, "div", 17);
    \u0275\u0275element(26, "i", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 19)(28, "span", 20);
    \u0275\u0275text(29, "ALMAC\xC9N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span", 21);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(32, SalesOrderDetailDialogComponent_Conditional_2_Conditional_32_Template, 1, 0, "i", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 25);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenFiscal() && ctx_r2.openFiscalDialog());
    })("keydown.enter", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_keydown_enter_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.canOpenFiscal() && ctx_r2.openFiscalDialog());
    })("keydown.space", function SalesOrderDetailDialogComponent_Conditional_2_Template_div_keydown_space_33_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenFiscal() && ctx_r2.openFiscalDialog());
    });
    \u0275\u0275elementStart(34, "div", 17);
    \u0275\u0275element(35, "i", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 19)(37, "span", 20);
    \u0275\u0275text(38, "FISCAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "span", 21);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(41, SalesOrderDetailDialogComponent_Conditional_2_Conditional_41_Template, 1, 0, "i", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 27)(43, "h3", 28);
    \u0275\u0275text(44, "FECHAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 29)(46, "span", 30);
    \u0275\u0275text(47, "Fecha orden");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "span", 31);
    \u0275\u0275text(49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 29)(51, "span", 30);
    \u0275\u0275text(52, "Entrega estimada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "span", 31);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 29)(56, "span", 30);
    \u0275\u0275text(57, "Estado de pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span", 32);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(60, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Template, 15, 8, "div", 33);
    \u0275\u0275elementStart(61, "div", 34)(62, "div", 35)(63, "h3", 28);
    \u0275\u0275text(64, "TOTALES");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 36)(66, "button", 37);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_66_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTotals(false));
    });
    \u0275\u0275text(67, " Solicitados ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "button", 37);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_68_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTotals(true));
    });
    \u0275\u0275text(69, " Entregados ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(70, "div", 38)(71, "div", 39)(72, "span", 40);
    \u0275\u0275text(73, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "span", 41);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(76, SalesOrderDetailDialogComponent_Conditional_2_Conditional_76_Template, 5, 1, "div", 39);
    \u0275\u0275conditionalCreate(77, SalesOrderDetailDialogComponent_Conditional_2_Conditional_77_Template, 5, 1, "div", 39);
    \u0275\u0275element(78, "div", 42);
    \u0275\u0275elementStart(79, "div", 43)(80, "span", 44);
    \u0275\u0275text(81, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "span", 45);
    \u0275\u0275text(83);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(84, "div", 46)(85, "h3", 28);
    \u0275\u0275text(86, "NOTAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "p", 47);
    \u0275\u0275text(88);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(89, "div", 48)(90, "div", 49)(91, "button", 50);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_91_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(0));
    });
    \u0275\u0275text(92, "Productos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "button", 50);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_93_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(1));
    });
    \u0275\u0275text(94, "Documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "button", 50);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_95_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(2));
    });
    \u0275\u0275text(96, "Lotes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "button", 50);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_97_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(3));
    });
    \u0275\u0275text(98, "Facturaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "div", 51);
    \u0275\u0275conditionalCreate(100, SalesOrderDetailDialogComponent_Conditional_2_Conditional_100_Template, 18, 1, "div", 52);
    \u0275\u0275conditionalCreate(101, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Template, 8, 3, "div", 52);
    \u0275\u0275conditionalCreate(102, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Template, 30, 5, "div", 53);
    \u0275\u0275conditionalCreate(103, SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Template, 16, 1, "div", 52);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_21_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("#", ctx_r2.order().folio || ctx_r2.order().id.substring(0, 8));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canEditOrder() ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(ctx_r2.order().general_status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.order().general_status || "-", " ");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("info-card--clickable", ctx_r2.canOpenCustomer());
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenCustomer() ? 0 : null);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getCustomerDisplayName());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canOpenCustomer() ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("info-card--clickable", ctx_r2.canOpenWarehouse());
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenWarehouse() ? 0 : null);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(((tmp_11_0 = ctx_r2.order().warehouse) == null ? null : tmp_11_0.name) || "N/A");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canOpenWarehouse() ? 32 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("info-card--clickable", ctx_r2.canOpenFiscal());
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenFiscal() ? 0 : null);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getFiscalDisplayName());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.canOpenFiscal() ? 41 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.formatShortDate(ctx_r2.order().created_at));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatShortDate(ctx_r2.order().expected_delivery_date || ctx_r2.order().delivery_date));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("payment-pill--paid", ctx_r2.order().payment_status === "Pagado");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.order().payment_status || "\u2014", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_21_0 = ctx_r2.posCollection()) ? 60 : -1, tmp_21_0);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", !ctx_r2.showDeliveredTotals());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.showDeliveredTotals());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getDisplayedSubtotal());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.hasVisibleDiscount() ? 76 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.hasVisibleTaxes() ? 77 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", ctx_r2.getTotalColor());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.getDisplayedTotal());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.order().notes || "Sin notas");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.activeTabIndex() === 3);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 0 ? 100 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 1 ? 101 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 3 ? 102 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 2 ? 103 : -1);
  }
}
function SalesOrderDetailDialogComponent_Conditional_3_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 66);
    \u0275\u0275text(1, " Regenerando... ");
  }
}
function SalesOrderDetailDialogComponent_Conditional_3_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 67);
    \u0275\u0275text(1, " Regenerar ");
  }
}
function SalesOrderDetailDialogComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275elementStart(1, "div", 91);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 92)(3, "h3");
    \u0275\u0275text(4, "Regenerar documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 93);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275element(6, "i", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 94)(8, "p", 95);
    \u0275\u0275text(9, "\xBFEn qu\xE9 idioma desea generar el documento?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 96)(11, "label", 97)(12, "input", 98);
    \u0275\u0275listener("change", function SalesOrderDetailDialogComponent_Conditional_3_Template_input_change_12_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedRegenerateLanguage.set("es"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "Espa\xF1ol (es)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label", 97)(16, "input", 99);
    \u0275\u0275listener("change", function SalesOrderDetailDialogComponent_Conditional_3_Template_input_change_16_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedRegenerateLanguage.set("en"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "English (en)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "label", 100)(20, "input", 101);
    \u0275\u0275listener("change", function SalesOrderDetailDialogComponent_Conditional_3_Template_input_change_20_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.keepPreviousDocument.set($event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Mantener documento anterior");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 102)(24, "button", 103);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275text(25, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 104);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmRegenerateDocument());
    });
    \u0275\u0275conditionalCreate(27, SalesOrderDetailDialogComponent_Conditional_3_Conditional_27_Template, 2, 0)(28, SalesOrderDetailDialogComponent_Conditional_3_Conditional_28_Template, 2, 0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.regeneratingPDF());
    \u0275\u0275advance(6);
    \u0275\u0275classProp("selected", ctx_r2.selectedRegenerateLanguage() === "es");
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.selectedRegenerateLanguage() === "es")("disabled", ctx_r2.regeneratingPDF());
    \u0275\u0275advance(3);
    \u0275\u0275classProp("selected", ctx_r2.selectedRegenerateLanguage() === "en");
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.selectedRegenerateLanguage() === "en")("disabled", ctx_r2.regeneratingPDF());
    \u0275\u0275advance(4);
    \u0275\u0275property("checked", ctx_r2.keepPreviousDocument())("disabled", ctx_r2.regeneratingPDF());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.regeneratingPDF());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-loading", ctx_r2.regeneratingPDF());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.regeneratingPDF() ? 27 : 28);
  }
}
var SalesOrderDetailDialogComponent = class _SalesOrderDetailDialogComponent {
  data;
  dialogRef;
  dialog;
  salesOrderService;
  warehouseService;
  fiscalConfigService;
  router;
  taxCalculator;
  toast;
  cdr;
  order = signal(null, ...ngDevMode ? [{ debugName: "order" }] : []);
  lineItems = signal([], ...ngDevMode ? [{ debugName: "lineItems" }] : []);
  documents = signal([], ...ngDevMode ? [{ debugName: "documents" }] : []);
  posCollection = signal(null, ...ngDevMode ? [{ debugName: "posCollection" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  activeTabIndex = signal(0, ...ngDevMode ? [{ debugName: "activeTabIndex" }] : []);
  showDeliveredTotals = signal(false, ...ngDevMode ? [{ debugName: "showDeliveredTotals" }] : []);
  regeneratingPDF = signal(false, ...ngDevMode ? [{ debugName: "regeneratingPDF" }] : []);
  showRegenerateLanguageModal = signal(false, ...ngDevMode ? [{ debugName: "showRegenerateLanguageModal" }] : []);
  selectedRegenerateLanguage = signal("es", ...ngDevMode ? [{ debugName: "selectedRegenerateLanguage" }] : []);
  keepPreviousDocument = signal(false, ...ngDevMode ? [{ debugName: "keepPreviousDocument" }] : []);
  canEditOrder = computed(() => this.order()?.general_status === "Creada", ...ngDevMode ? [{ debugName: "canEditOrder" }] : []);
  constructor(data, dialogRef, dialog, salesOrderService, warehouseService, fiscalConfigService, router, taxCalculator, toast, cdr) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.dialog = dialog;
    this.salesOrderService = salesOrderService;
    this.warehouseService = warehouseService;
    this.fiscalConfigService = fiscalConfigService;
    this.router = router;
    this.taxCalculator = taxCalculator;
    this.toast = toast;
    this.cdr = cdr;
    this.loadOrder();
  }
  loadOrder() {
    this.loading.set(true);
    this.salesOrderService.getOrderDetailById(this.data.orderId).subscribe({
      next: (payload) => {
        this.order.set(payload?.header || null);
        this.lineItems.set(payload?.line_items || payload?.header?.line_items || []);
        this.documents.set(payload?.documents || payload?.header?.documents || []);
        this.posCollection.set(payload?.pos_collection ?? payload?.header?.pos_collection ?? null);
        this.loading.set(false);
      },
      error: () => {
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
    void this.router.navigate(["/sales-orders", id, "edit"]);
  }
  parseNumber(value) {
    if (value === null || value === void 0)
      return 0;
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  formatCurrency(value) {
    return this.taxCalculator.formatCurrency(this.parseNumber(value));
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
  hasVisibleDiscount() {
    return this.getTotalsSnapshot().discount > 9e-3;
  }
  hasVisibleTaxes() {
    const { iva, ieps } = this.getTotalsSnapshot();
    return iva + ieps > 9e-3;
  }
  getDisplayedTaxes() {
    const { iva, ieps } = this.getTotalsSnapshot();
    return this.formatCurrency(iva + ieps);
  }
  toggleTotals(showDelivered) {
    this.showDeliveredTotals.set(showDelivered);
  }
  getTotalColor() {
    return this.showDeliveredTotals() ? "text-green-600" : "text-blue-600";
  }
  getDisplayedSubtotal() {
    return this.formatCurrency(this.getTotalsSnapshot().subtotal);
  }
  getDisplayedDiscount() {
    return this.formatCurrency(this.getTotalsSnapshot().discount);
  }
  getDisplayedIva() {
    return this.formatCurrency(this.getTotalsSnapshot().iva);
  }
  getDisplayedIeps() {
    return this.formatCurrency(this.getTotalsSnapshot().ieps);
  }
  getDisplayedTotal() {
    return this.formatCurrency(this.getTotalsSnapshot().total);
  }
  getRequestedQuantity(item) {
    return this.parseNumber(item.quantity);
  }
  getDeliveredQuantity(item) {
    const allocations = Array.isArray(item.batch_allocations) ? item.batch_allocations : [];
    if (allocations.length > 0) {
      return allocations.reduce((sum, allocation) => sum + this.parseNumber(allocation?.quantity_allocated), 0);
    }
    if (this.order()?.general_status === "Surtida") {
      return this.getRequestedQuantity(item);
    }
    return 0;
  }
  getTotalsSnapshot() {
    const order = this.order();
    if (!order) {
      return { subtotal: 0, discount: 0, iva: 0, ieps: 0, total: 0 };
    }
    if (!this.showDeliveredTotals()) {
      return {
        subtotal: this.parseNumber(order.requested_subtotal ?? order.subtotal),
        discount: this.parseNumber(order.requested_discount_total ?? order.discount_total),
        iva: this.parseNumber(order.requested_iva_total ?? order.iva_total),
        ieps: this.parseNumber(order.requested_ieps_total ?? order.ieps_total),
        total: this.parseNumber(order.requested_total ?? order.total ?? order.grand_total)
      };
    }
    const hasDeliveredHeader = order.delivered_subtotal != null || order.delivered_total != null || order.delivered_iva_total != null;
    if (hasDeliveredHeader) {
      return {
        subtotal: this.parseNumber(order.delivered_subtotal ?? order.subtotal),
        discount: this.parseNumber(order.delivered_discount_total ?? order.discount_total),
        iva: this.parseNumber(order.delivered_iva_total ?? order.iva_total),
        ieps: this.parseNumber(order.delivered_ieps_total ?? order.ieps_total),
        total: this.parseNumber(order.delivered_total ?? order.total ?? order.grand_total)
      };
    }
    return this.computeDeliveredTotalsFromLines();
  }
  computeDeliveredTotalsFromLines() {
    let subtotal = 0;
    let discount = 0;
    let iva = 0;
    let ieps = 0;
    for (const item of this.lineItems()) {
      const ratio = this.getLineDeliveryRatio(item);
      if (ratio <= 0)
        continue;
      const qty = this.getRequestedQuantity(item);
      const unit = this.parseNumber(item.unit_price);
      const gross = unit * qty * ratio;
      const discountPct = this.parseNumber(item.discount_percentage);
      const lineDiscount = gross * (discountPct / 100);
      const discounted = Math.max(gross - lineDiscount, 0);
      const lineIva = discounted * (this.parseNumber(item.iva_percentage) / 100);
      const lineIeps = discounted * (this.parseNumber(item.ieps_percentage) / 100);
      subtotal += discounted;
      discount += lineDiscount;
      iva += lineIva;
      ieps += lineIeps;
    }
    return {
      subtotal,
      discount,
      iva,
      ieps,
      total: subtotal + iva + ieps
    };
  }
  getLineDeliveryRatio(item) {
    const requested = this.getRequestedQuantity(item);
    if (requested <= 0)
      return 0;
    return Math.min(this.getDeliveredQuantity(item) / requested, 1);
  }
  getStatusClass(status) {
    if (status === "Creada")
      return "bg-blue-100 text-blue-700";
    if (status === "Surtida")
      return "bg-green-100 text-green-700";
    if (status === "Cancelada")
      return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  }
  getPaymentStatusClass(status) {
    if (status === "Pendiente")
      return "bg-red-50 text-red-600";
    if (status === "Pagado")
      return "bg-green-50 text-green-600";
    return "bg-gray-100 text-gray-600";
  }
  getCustomerDisplayName() {
    return resolveSalesOrderCustomerName(this.order());
  }
  posPaymentMethodLabel() {
    return posCollectionMethodLabel(this.posCollection()?.payment_method);
  }
  posCollectionMoney(value) {
    return posCollectionMoneyLabel(value);
  }
  posCollectionUsd(value) {
    return posCollectionUsdLabel(value);
  }
  formatPosCollectedAt(value) {
    if (!value) {
      return "\u2014";
    }
    return new Date(value).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" });
  }
  getFiscalDisplayName() {
    const fiscal = this.order()?.fiscal_configuration;
    return fiscal?.business_name || fiscal?.razon_social || this.order()?.fiscal_razon_social || "N/A";
  }
  getLineUom(item) {
    return item.uom_name || item.product_uom?.uom?.name || item.base_uom_name || item.base_uom?.name || "Unidad";
  }
  getLineTotal(item) {
    const qty = this.parseNumber(item.quantity);
    const unit = this.parseNumber(item.unit_price);
    const discountPct = this.parseNumber(item.discount_percentage);
    const taxable = unit * qty;
    const discount = taxable * (discountPct / 100);
    const discountedSubtotal = Math.max(taxable - discount, 0);
    const iva = discountedSubtotal * (this.parseNumber(item.iva_percentage) / 100);
    const ieps = discountedSubtotal * (this.parseNumber(item.ieps_percentage) / 100);
    return discountedSubtotal + iva + ieps;
  }
  getBatchAllocationsRows() {
    const rows = [];
    for (const item of this.lineItems()) {
      const allocations = Array.isArray(item.batch_allocations) ? item.batch_allocations : [];
      for (const allocation of allocations) {
        rows.push({ item, allocation });
      }
    }
    return rows;
  }
  getInvoices() {
    const invoices = this.order()?.invoices;
    return Array.isArray(invoices) ? invoices : [];
  }
  canOpenCustomer() {
    return resolveSalesOrderCustomerId(this.order()) != null;
  }
  canOpenWarehouse() {
    return !!(this.order()?.warehouse_id || this.order()?.warehouse?.id);
  }
  canOpenFiscal() {
    return !!(this.order()?.fiscal_configuration_id || this.order()?.fiscal_configuration?.id);
  }
  openCustomerInNewTab() {
    const customerId = resolveSalesOrderCustomerId(this.order());
    if (customerId == null)
      return;
    const url = this.router.serializeUrl(this.router.createUrlTree(["/customers/detail", customerId]));
    window.open(url, "_blank");
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
    if (embedded && "code" in embedded) {
      openModal(embedded);
      return;
    }
    this.warehouseService.getWarehouse(warehouseId).subscribe({
      next: (warehouse) => openModal(warehouse),
      error: () => {
        openModal({ id: warehouseId, name: embedded?.name || "" });
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
  openProductDetail(item) {
    const productId = item.product?.id ?? item.product_id;
    if (!productId)
      return;
    this.dialog.open(ProductDetailModalComponent, {
      data: {
        product: {
          id: productId,
          name: item.product?.name,
          sku: item.product?.sku
        },
        isNew: false
      },
      width: "850px",
      maxHeight: "90vh"
    });
  }
  canOpenProduct(item) {
    return !!(item.product?.id || item.product_id);
  }
  hasDocuments() {
    return this.documents().length > 0;
  }
  regeneratePDF() {
    this.openRegenerateLanguageModal();
  }
  openRegenerateLanguageModal() {
    if (this.regeneratingPDF())
      return;
    this.selectedRegenerateLanguage.set(this.getDefaultDocumentLanguage());
    this.keepPreviousDocument.set(false);
    this.showRegenerateLanguageModal.set(true);
  }
  closeRegenerateLanguageModal() {
    if (this.regeneratingPDF())
      return;
    this.showRegenerateLanguageModal.set(false);
  }
  confirmRegenerateDocument() {
    const orderId = this.order()?.id;
    const language = this.selectedRegenerateLanguage();
    const keepPrevious = this.keepPreviousDocument();
    if (!orderId || this.regeneratingPDF())
      return;
    this.regeneratingPDF.set(true);
    this.salesOrderService.regenerateOriginalPDF(orderId, language, keepPrevious).subscribe({
      next: (response) => {
        this.regeneratingPDF.set(false);
        this.showRegenerateLanguageModal.set(false);
        this.cdr.detectChanges();
        this.toast.success(response?.message || "PDF original regenerado exitosamente");
        this.loadOrder();
      },
      error: (error) => {
        this.regeneratingPDF.set(false);
        this.cdr.detectChanges();
        this.toast.error(error?.message || "Error al regenerar PDF original");
        console.error("Error regenerating original PDF:", error);
      }
    });
  }
  getDefaultDocumentLanguage() {
    const doc = this.documents().find((d) => d.document_type_name === "DOCUMENTO_ORIGINAL");
    return doc?.document_language === "en" ? "en" : "es";
  }
  getDocumentLanguageLabel(language) {
    if (language === "es")
      return "ES";
    if (language === "en")
      return "EN";
    return null;
  }
  getDocumentBadgeClass(documentType) {
    const typeMap = {
      DOCUMENTO_ORIGINAL: "badge-blue",
      DOCUMENTO_RECIBO: "badge-green",
      DOCUMENTO_RECEPCION: "badge-green"
    };
    return typeMap[documentType] || "badge-gray";
  }
  formatDocumentDate(dateString) {
    if (!dateString)
      return "\u2014";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime()))
      return dateString;
    const day = date.getDate();
    const month = date.toLocaleString("es-ES", { month: "long" });
    return `${day} de ${month}`;
  }
  downloadDocument(doc) {
    if (doc.path) {
      window.open(doc.path, "_blank");
    }
  }
  static \u0275fac = function SalesOrderDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesOrderDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(SalesOrderService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(TaxCalculatorService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SalesOrderDetailDialogComponent, selectors: [["app-sales-order-detail-dialog"]], hostAttrs: [1, "order-detail-dialog-container"], decls: 4, vars: 3, consts: [[1, "order-detail-dialog"], [1, "loading-container"], [1, "upload-modal-overlay"], [1, "text-gray-500"], [1, "dialog-header"], [1, "dialog-header-main"], [1, "order-type-badge", "order-type-badge--sale"], [1, "dialog-header__folio"], ["type", "button", 1, "edit-header-btn"], [1, "dialog-header-actions"], [1, "status-badge", 3, "ngClass"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], [1, "fi", "fi-rr-cross-small"], [1, "dialog-content"], [1, "sidebar"], [1, "info-cards-group"], ["role", "button", 1, "info-card", "info-card--blue", 3, "click", "keydown.enter", "keydown.space"], [1, "info-card__icon"], [1, "fi", "fi-rr-user"], [1, "info-card__content"], [1, "info-card__label"], [1, "info-card__value"], [1, "fi", "fi-rr-angle-right", "info-card__chevron"], ["role", "button", 1, "info-card", "info-card--yellow", 3, "click", "keydown.enter", "keydown.space"], [1, "fi", "fi-rr-box"], ["role", "button", 1, "info-card", "info-card--purple", 3, "click", "keydown.enter", "keydown.space"], [1, "fi", "fi-rr-document"], [1, "section-card"], [1, "section-title"], [1, "section-item"], [1, "section-label"], [1, "section-value"], [1, "payment-pill"], [1, "section-card", "section-card--pos-pay"], [1, "section-card", "section-card--totals"], [1, "section-header"], [1, "toggle-container"], ["type", "button", 1, "toggle-btn", 3, "click"], [1, "totals-card"], [1, "totals-row"], [1, "totals-label"], [1, "totals-value"], [1, "totals-divider"], [1, "totals-row", "totals-row-total"], [1, "totals-label-total"], [1, "totals-value-total", 3, "ngClass"], [1, "section-card", "section-card--notes"], [1, "notes-text"], [1, "main-content"], [1, "tabs-header"], [1, "tab-button", 3, "click"], [1, "tabs-content"], [1, "tab-content-wrapper"], [1, "tab-content-wrapper", "billing-tab"], ["type", "button", 1, "edit-header-btn", 3, "click"], [1, "fi", "fi-rr-pencil"], [1, "section-item", "section-item--highlight"], [1, "section-value", "section-value--change"], [1, "products-table"], [3, "row-clickable"], ["role", "button", 1, "product-info", 3, "click", "keydown.enter", "keydown.space"], [1, "qty-pill"], ["colspan", "5", 1, "text-center"], [1, "empty-state"], [1, "tab-header"], [1, "btn-secondary", 3, "click", "disabled"], [1, "fi", "fi-rr-spinner", "animate-spin"], [1, "fi", "fi-rr-refresh"], [1, "documents-table"], [1, "document-type-cell"], [1, "document-badge", 3, "ngClass"], [1, "document-language-badge"], [1, "document-language-empty"], [1, "document-name"], [1, "document-date"], [1, "document-actions"], ["title", "Descargar", 1, "action-btn", "download-btn", 3, "click"], [1, "fi", "fi-rr-download"], [1, "billing-summary"], [1, "billing-section-title"], [1, "billing-grid"], [1, "billing-field"], [1, "billing-label"], [1, "billing-value"], [1, "billing-invoices"], [1, "uuid-cell"], [1, "fi", "fi-rr-receipt"], ["role", "button", 1, "product-info", "product-info--inline", 3, "click", "keydown.enter", "keydown.space"], ["colspan", "4", 1, "text-center"], [1, "fi", "fi-rr-layers"], [1, "upload-modal-overlay", 3, "click"], [1, "regenerate-modal", 3, "click"], [1, "regenerate-modal__header"], ["type", "button", 1, "regenerate-modal__close", 3, "click", "disabled"], [1, "regenerate-modal__body"], [1, "regenerate-language-prompt"], [1, "language-options"], [1, "language-option"], ["type", "radio", "name", "regenerateLanguage", "value", "es", 3, "change", "checked", "disabled"], ["type", "radio", "name", "regenerateLanguage", "value", "en", 3, "change", "checked", "disabled"], [1, "regenerate-keep-previous"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "regenerate-modal__footer"], ["type", "button", 1, "regenerate-modal__btn", "regenerate-modal__btn--cancel", 3, "click", "disabled"], ["type", "button", 1, "regenerate-modal__btn", "regenerate-modal__btn--confirm", 3, "click"]], template: function SalesOrderDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, SalesOrderDetailDialogComponent_Conditional_1_Template, 3, 0, "div", 1);
      \u0275\u0275conditionalCreate(2, SalesOrderDetailDialogComponent_Conditional_2_Template, 104, 47);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, SalesOrderDetailDialogComponent_Conditional_3_Template, 29, 15, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.order() && !ctx.loading() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showRegenerateLanguageModal() ? 3 : -1);
    }
  }, dependencies: [CommonModule, NgClass, MatDialogModule, DatePipe, RemoveTrailingZerosPipe], styles: ["\n\n.sidebar[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  padding: 0.75rem;\n  overflow-y: auto;\n  border-right: 1px solid #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.info-cards-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  padding: 0.625rem 0.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid transparent;\n}\n.info-card--blue[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  border-color: #dbeafe;\n}\n.info-card--blue[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--green[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  border-color: #bbf7d0;\n}\n.info-card--green[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #bbf7d0;\n  color: #16a34a;\n}\n.info-card--yellow[_ngcontent-%COMP%] {\n  background: #fefce8;\n  border-color: #fef08a;\n}\n.info-card--yellow[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #fde68a;\n  color: #d97706;\n}\n.info-card--purple[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  border-color: #e9d5ff;\n}\n.info-card--purple[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: box-shadow 0.15s, transform 0.15s;\n}\n.info-card--clickable[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);\n}\n.info-card__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #94a3b8;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n}\n.info-card__icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n}\n.info-card__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n  flex: 1;\n}\n.info-card__label[_ngcontent-%COMP%] {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #94a3b8;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.info-card__value[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.25;\n  word-break: break-word;\n}\n.section-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.75rem;\n}\n.section-card--notes[_ngcontent-%COMP%]   .section-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.25rem;\n}\n.section-card[_ngcontent-%COMP%]   .notes-edit-btn[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 0.25rem;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.section-card[_ngcontent-%COMP%]   .notes-edit-btn[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n  color: #334155;\n}\n.section-card--totals[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.section-card--notes[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin-bottom: 0.375rem;\n}\n.section-card[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #64748b;\n  letter-spacing: 0.08em;\n  margin: 0 0 0.375rem;\n  text-transform: uppercase;\n}\n.section-card--totals[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.section-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.75rem;\n  padding: 0.3rem 0;\n  border-bottom: 1px solid #f1f5f9;\n}\n.section-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.section-label[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 0.75rem;\n}\n.section-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n  text-align: right;\n  font-size: 0.75rem;\n}\n.payment-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.15rem 0.45rem;\n  border-radius: 9999px;\n  font-size: 0.625rem;\n  font-weight: 700;\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.payment-pill--paid[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.375rem;\n}\n.notes-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  color: #475569;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.toggle-container[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.125rem;\n  background: #f1f5f9;\n  padding: 0.125rem;\n  border-radius: 0.375rem;\n  border: 1px solid #e2e8f0;\n  flex-shrink: 0;\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%] {\n  padding: 0.2rem 0.45rem;\n  border: 1px solid transparent;\n  background: transparent;\n  color: #64748b;\n  font-size: 0.5625rem;\n  font-weight: 700;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn.active[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #2563eb;\n  border-color: #bfdbfe;\n}\n.totals-card[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.625rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.75rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-label[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #e2e8f0;\n  margin: 0.1rem 0;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%]   .totals-label-total[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%]   .totals-value-total[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 800;\n}\n.order-detail-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  max-height: 96dvh;\n  margin: 0 auto;\n  background: #f9fafb;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%], \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%], \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(15, 23, 42, 0.22) transparent;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-track, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(15, 23, 42, 0.2);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(15, 23, 42, 0.32);\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-corner, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-corner, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.875rem;\n  min-height: 2.75rem;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  flex-shrink: 0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  flex-shrink: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header__folio[_ngcontent-%COMP%], \n.dialog-header[_ngcontent-%COMP%]   h2.dialog-header__folio[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.0625rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: #0f172a;\n  line-height: 1.25;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 0.375rem;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n  flex-shrink: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #0f172a;\n}\n.order-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n  background: #dbeafe;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.edit-header-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.edit-header-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n}\n.edit-header-btn[_ngcontent-%COMP%]:hover {\n  background: #dbeafe;\n  border-color: #93c5fd;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  line-height: 1.2;\n  white-space: nowrap;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n@media (max-width: 991px) {\n  .dialog-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n}\n.dialog-content[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  width: min(24rem, 32vw);\n  min-width: 20rem;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .dialog-content[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 0;\n    max-height: none;\n    border-right: none !important;\n    border-bottom: 1px solid #e5e7eb;\n  }\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.tabs-header[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .tabs-header[_ngcontent-%COMP%] {\n    padding: 0 0.75rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-button[_ngcontent-%COMP%] {\n    padding: 0.625rem 0.875rem;\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-content-wrapper[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .products-table[_ngcontent-%COMP%] {\n    display: block;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background: #f9fafb;\n  color: #9ca3af;\n}\n.qty-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 0.375rem;\n  background: #dbeafe;\n  color: #1d4ed8;\n  font-size: 0.75rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.qty-pill--muted[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.tabs-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1rem;\n}\n.tab-button[_ngcontent-%COMP%] {\n  padding: 0.625rem 1rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.tab-button[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.tab-button.active[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.tabs-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n}\n.tab-content-wrapper[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  height: 100%;\n  overflow-y: auto;\n}\n.products-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #1f2937;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--inline[_ngcontent-%COMP%] {\n  display: inline-flex;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1f2937;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border-radius: 6px;\n  padding: 0.25rem 0.35rem;\n  margin: -0.25rem -0.35rem;\n  transition: background-color 0.2s ease;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--clickable[_ngcontent-%COMP%]:hover   strong[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--clickable[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--clickable[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.row-clickable[_ngcontent-%COMP%]:hover   .product-info--clickable[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.billing-tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.billing-section-title[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #6b7280;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  margin: 0 0 0.75rem;\n}\n.billing-summary[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  padding: 1rem;\n}\n.billing-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem 1.25rem;\n}\n.billing-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.billing-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #9ca3af;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.billing-value[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #1f2937;\n}\n.billing-invoices[_ngcontent-%COMP%]   .uuid-cell[_ngcontent-%COMP%] {\n  font-family: ui-monospace, monospace;\n  font-size: 0.75rem;\n  color: #6b7280;\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 2.5rem;\n  color: #9ca3af;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.tab-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  border: none;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n.documents-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.documents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.documents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #1f2937;\n}\n.document-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.document-badge.badge-blue[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-badge.badge-green[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.document-badge.badge-gray[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.document-type-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.document-language-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-width: 2rem;\n  padding: 0.2rem 0.45rem;\n  border-radius: 4px;\n  background: #f3f4f6;\n  color: #374151;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-align: center;\n}\n.document-language-empty[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.85rem;\n}\n.document-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #1f2937;\n  word-break: break-word;\n}\n.document-date[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.document-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 0.9rem;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.download-btn[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.download-btn[_ngcontent-%COMP%]:hover {\n  background: #bfdbfe;\n}\n.upload-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(17, 24, 39, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  padding: 1rem;\n}\n.regenerate-language-prompt[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.regenerate-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n}\n.regenerate-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.regenerate-modal__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.regenerate-modal__close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n}\n.regenerate-modal__close[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #111827;\n}\n.regenerate-modal__close[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__body[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem 0.25rem;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: border-color 0.2s, background 0.2s;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin: 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #1f2937;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]:hover:not(:has(input:disabled)) {\n  border-color: #93c5fd;\n  background: #f8fafc;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: #eff6ff;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n  cursor: pointer;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #374151;\n  line-height: 1.4;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]:has(input:disabled) {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.regenerate-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem 1rem;\n}\n.regenerate-modal__btn[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45rem 0.85rem;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  line-height: 1.2;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #2563eb;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: #fff;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%]:hover:not(.is-loading) {\n  background: #16a34a;\n}\n.regenerate-modal__btn--confirm.is-loading[_ngcontent-%COMP%] {\n  cursor: wait;\n  pointer-events: none;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n[_nghost-%COMP%]     .section-card--pos-pay {\n  border-color: #c7d2fe;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #fff 100%);\n}\n[_nghost-%COMP%]     .section-item--highlight .section-value--change {\n  color: #059669;\n  font-weight: 800;\n}\n/*# sourceMappingURL=sales-order-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SalesOrderDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-sales-order-detail-dialog", standalone: true, imports: [CommonModule, MatDialogModule, RemoveTrailingZerosPipe], host: {
      "class": "order-detail-dialog-container"
    }, template: `<div class="order-detail-dialog">\r
  @if (loading()) {\r
    <div class="loading-container">\r
      <p class="text-gray-500">Cargando orden...</p>\r
    </div>\r
  }\r
\r
  @if (order() && !loading()) {\r
    <div class="dialog-header">\r
      <div class="dialog-header-main">\r
        <span class="order-type-badge order-type-badge--sale">VENTA</span>\r
        <h2 class="dialog-header__folio">#{{ order()!.folio || order()!.id.substring(0, 8) }}</h2>\r
        @if (canEditOrder()) {\r
          <button type="button" class="edit-header-btn" (click)="goToEditForm()">\r
            <i class="fi fi-rr-pencil"></i>\r
            Editar orden\r
          </button>\r
        }\r
      </div>\r
      <div class="dialog-header-actions">\r
        <span class="status-badge" [ngClass]="getStatusClass(order()!.general_status)">\r
          {{ order()!.general_status || '-' }}\r
        </span>\r
        <button type="button" class="close-btn" (click)="close()" aria-label="Cerrar">\r
          <i class="fi fi-rr-cross-small"></i>\r
        </button>\r
      </div>\r
    </div>\r
\r
    <div class="dialog-content">\r
      <div class="sidebar">\r
        <div class="info-cards-group">\r
          <div\r
            class="info-card info-card--blue"\r
            [class.info-card--clickable]="canOpenCustomer()"\r
            role="button"\r
            [attr.tabindex]="canOpenCustomer() ? 0 : null"\r
            (click)="canOpenCustomer() && openCustomerInNewTab()"\r
            (keydown.enter)="canOpenCustomer() && openCustomerInNewTab()"\r
            (keydown.space)="$event.preventDefault(); canOpenCustomer() && openCustomerInNewTab()">\r
            <div class="info-card__icon">\r
              <i class="fi fi-rr-user"></i>\r
            </div>\r
            <div class="info-card__content">\r
              <span class="info-card__label">CLIENTE</span>\r
              <span class="info-card__value">{{ getCustomerDisplayName() }}</span>\r
            </div>\r
            @if (canOpenCustomer()) {\r
              <i class="fi fi-rr-angle-right info-card__chevron"></i>\r
            }\r
          </div>\r
\r
          <div\r
            class="info-card info-card--yellow"\r
            [class.info-card--clickable]="canOpenWarehouse()"\r
            role="button"\r
            [attr.tabindex]="canOpenWarehouse() ? 0 : null"\r
            (click)="canOpenWarehouse() && openWarehouseDialog()"\r
            (keydown.enter)="canOpenWarehouse() && openWarehouseDialog()"\r
            (keydown.space)="$event.preventDefault(); canOpenWarehouse() && openWarehouseDialog()">\r
            <div class="info-card__icon">\r
              <i class="fi fi-rr-box"></i>\r
            </div>\r
            <div class="info-card__content">\r
              <span class="info-card__label">ALMAC\xC9N</span>\r
              <span class="info-card__value">{{ order()!.warehouse?.name || 'N/A' }}</span>\r
            </div>\r
            @if (canOpenWarehouse()) {\r
              <i class="fi fi-rr-angle-right info-card__chevron"></i>\r
            }\r
          </div>\r
\r
          <div\r
            class="info-card info-card--purple"\r
            [class.info-card--clickable]="canOpenFiscal()"\r
            role="button"\r
            [attr.tabindex]="canOpenFiscal() ? 0 : null"\r
            (click)="canOpenFiscal() && openFiscalDialog()"\r
            (keydown.enter)="canOpenFiscal() && openFiscalDialog()"\r
            (keydown.space)="$event.preventDefault(); canOpenFiscal() && openFiscalDialog()">\r
            <div class="info-card__icon">\r
              <i class="fi fi-rr-document"></i>\r
            </div>\r
            <div class="info-card__content">\r
              <span class="info-card__label">FISCAL</span>\r
              <span class="info-card__value">{{ getFiscalDisplayName() }}</span>\r
            </div>\r
            @if (canOpenFiscal()) {\r
              <i class="fi fi-rr-angle-right info-card__chevron"></i>\r
            }\r
          </div>\r
        </div>\r
\r
        <div class="section-card">\r
          <h3 class="section-title">FECHAS</h3>\r
          <div class="section-item">\r
            <span class="section-label">Fecha orden</span>\r
            <span class="section-value">{{ formatShortDate(order()!.created_at) }}</span>\r
          </div>\r
          <div class="section-item">\r
            <span class="section-label">Entrega estimada</span>\r
            <span class="section-value">{{ formatShortDate(order()!.expected_delivery_date || order()!.delivery_date) }}</span>\r
          </div>\r
          <div class="section-item">\r
            <span class="section-label">Estado de pago</span>\r
            <span class="payment-pill" [class.payment-pill--paid]="order()!.payment_status === 'Pagado'">\r
              {{ order()!.payment_status || '\u2014' }}\r
            </span>\r
          </div>\r
        </div>\r
\r
        @if (posCollection(); as pay) {\r
          <div class="section-card section-card--pos-pay">\r
              <h3 class="section-title">COBRO POS</h3>\r
              <div class="section-item">\r
                <span class="section-label">M\xE9todo</span>\r
                <span class="section-value">{{ posPaymentMethodLabel() }}</span>\r
              </div>\r
              @if (pay.collected_at) {\r
                <div class="section-item">\r
                  <span class="section-label">Cobrado</span>\r
                  <span class="section-value">{{ formatPosCollectedAt(pay.collected_at) }}</span>\r
                </div>\r
              }\r
              @if (pay.received_cash_mxn != null && +pay.received_cash_mxn > 0) {\r
                <div class="section-item">\r
                  <span class="section-label">Efectivo recibido</span>\r
                  <span class="section-value">{{ posCollectionMoney(pay.received_cash_mxn) }}</span>\r
                </div>\r
              }\r
              @if (pay.received_cash_usd != null && +pay.received_cash_usd > 0) {\r
                <div class="section-item">\r
                  <span class="section-label">USD recibido</span>\r
                  <span class="section-value">{{ posCollectionUsd(pay.received_cash_usd) }}</span>\r
                </div>\r
              }\r
              @if (pay.amount_transfer_mxn != null && +pay.amount_transfer_mxn > 0) {\r
                <div class="section-item">\r
                  <span class="section-label">Transferencia</span>\r
                  <span class="section-value">{{ posCollectionMoney(pay.amount_transfer_mxn) }}</span>\r
                </div>\r
              }\r
              @if (pay.amount_card_mxn != null && +pay.amount_card_mxn > 0) {\r
                <div class="section-item">\r
                  <span class="section-label">Tarjeta</span>\r
                  <span class="section-value">{{ posCollectionMoney(pay.amount_card_mxn) }}</span>\r
                </div>\r
              }\r
              @if (pay.change_cash_mxn != null && +pay.change_cash_mxn > 0) {\r
                <div class="section-item section-item--highlight">\r
                  <span class="section-label">Cambio MXN</span>\r
                  <span class="section-value section-value--change">{{ posCollectionMoney(pay.change_cash_mxn) }}</span>\r
                </div>\r
              }\r
              @if (pay.change_cash_usd != null && +pay.change_cash_usd > 0) {\r
                <div class="section-item section-item--highlight">\r
                  <span class="section-label">Cambio USD</span>\r
                  <span class="section-value section-value--change">{{ posCollectionUsd(pay.change_cash_usd) }}</span>\r
                </div>\r
              }\r
            </div>\r
        }\r
\r
        <div class="section-card section-card--totals">\r
          <div class="section-header">\r
            <h3 class="section-title">TOTALES</h3>\r
            <div class="toggle-container">\r
              <button\r
                type="button"\r
                class="toggle-btn"\r
                [class.active]="!showDeliveredTotals()"\r
                (click)="toggleTotals(false)">\r
                Solicitados\r
              </button>\r
              <button\r
                type="button"\r
                class="toggle-btn"\r
                [class.active]="showDeliveredTotals()"\r
                (click)="toggleTotals(true)">\r
                Entregados\r
              </button>\r
            </div>\r
          </div>\r
\r
          <div class="totals-card">\r
            <div class="totals-row">\r
              <span class="totals-label">Subtotal</span>\r
              <span class="totals-value">{{ getDisplayedSubtotal() }}</span>\r
            </div>\r
            @if (hasVisibleDiscount()) {\r
              <div class="totals-row">\r
                <span class="totals-label">Descuento</span>\r
                <span class="totals-value">{{ getDisplayedDiscount() }}</span>\r
              </div>\r
            }\r
            @if (hasVisibleTaxes()) {\r
              <div class="totals-row">\r
                <span class="totals-label">Impuestos</span>\r
                <span class="totals-value">{{ getDisplayedTaxes() }}</span>\r
              </div>\r
            }\r
            <div class="totals-divider"></div>\r
            <div class="totals-row totals-row-total">\r
              <span class="totals-label-total">Total</span>\r
              <span class="totals-value-total" [ngClass]="getTotalColor()">{{ getDisplayedTotal() }}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="section-card section-card--notes">\r
          <h3 class="section-title">NOTAS</h3>\r
          <p class="notes-text">{{ order()!.notes || 'Sin notas' }}</p>\r
        </div>\r
      </div>\r
\r
      <div class="main-content">\r
        <div class="tabs-header">\r
          <button class="tab-button" [class.active]="activeTabIndex() === 0" (click)="activeTabIndex.set(0)">Productos</button>\r
          <button class="tab-button" [class.active]="activeTabIndex() === 1" (click)="activeTabIndex.set(1)">Documentos</button>\r
          <button class="tab-button" [class.active]="activeTabIndex() === 2" (click)="activeTabIndex.set(2)">Lotes</button>\r
          <button class="tab-button" [class.active]="activeTabIndex() === 3" (click)="activeTabIndex.set(3)">Facturaci\xF3n</button>\r
        </div>\r
\r
        <div class="tabs-content">\r
          @if (activeTabIndex() === 0) {\r
            <div class="tab-content-wrapper">\r
              <table class="products-table">\r
                <thead>\r
                  <tr>\r
                    <th>PRODUCTO</th>\r
                    <th>PRECIO UNIT.</th>\r
                    <th>TOTAL L\xCDNEA</th>\r
                    <th>SOLICITADAS</th>\r
                    <th>ENTREGADAS</th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @for (item of lineItems(); track item.id || $index) {\r
                    <tr [class.row-clickable]="canOpenProduct(item)">\r
                      <td>\r
                        <div\r
                          class="product-info"\r
                          [class.product-info--clickable]="canOpenProduct(item)"\r
                          role="button"\r
                          [attr.tabindex]="canOpenProduct(item) ? 0 : null"\r
                          (click)="canOpenProduct(item) && openProductDetail(item)"\r
                          (keydown.enter)="canOpenProduct(item) && openProductDetail(item)"\r
                          (keydown.space)="$event.preventDefault(); canOpenProduct(item) && openProductDetail(item)">\r
                          <strong>{{ item.product?.name || item.product_id }}</strong>\r
                          <small>{{ item.product?.sku || '-' }}</small>\r
                        </div>\r
                      </td>\r
                      <td>{{ formatCurrency(item.unit_price) }}</td>\r
                      <td>{{ formatCurrency(getLineTotal(item)) }}</td>\r
                      <td>\r
                        <span class="qty-pill">{{ getRequestedQuantity(item) | removeTrailingZeros }} {{ getLineUom(item) }}</span>\r
                      </td>\r
                      <td>\r
                        <span class="qty-pill" [class.qty-pill--muted]="getDeliveredQuantity(item) === 0">\r
                          {{ getDeliveredQuantity(item) | removeTrailingZeros }} {{ getLineUom(item) }}\r
                        </span>\r
                      </td>\r
                    </tr>\r
                  } @empty {\r
                    <tr>\r
                      <td colspan="5" class="text-center">\r
                        <div class="empty-state">\r
                          <i class="fi fi-rr-box"></i>\r
                          <p>No hay l\xEDneas</p>\r
                        </div>\r
                      </td>\r
                    </tr>\r
                  }\r
                </tbody>\r
              </table>\r
            </div>\r
          }\r
\r
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
              </div>\r
\r
              @if (hasDocuments()) {\r
                <table class="documents-table">\r
                  <thead>\r
                    <tr>\r
                      <th>TIPO</th>\r
                      <th>IDIOMA</th>\r
                      <th>NOMBRE DE ARCHIVO</th>\r
                      <th>FECHA DE CARGA</th>\r
                      <th>ACCIONES</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody>\r
                    @for (doc of documents(); track doc.id) {\r
                      <tr>\r
                        <td>\r
                          <div class="document-type-cell">\r
                            <span class="document-badge" [ngClass]="getDocumentBadgeClass(doc.document_type_name)">\r
                              {{ doc.document_type_name }}\r
                            </span>\r
                          </div>\r
                        </td>\r
                        <td>\r
                          @if (getDocumentLanguageLabel(doc.document_language); as langLabel) {\r
                            <span class="document-language-badge">{{ langLabel }}</span>\r
                          } @else {\r
                            <span class="document-language-empty">\u2014</span>\r
                          }\r
                        </td>\r
                        <td>\r
                          <span class="document-name">{{ doc.document_name || '\u2014' }}</span>\r
                        </td>\r
                        <td>\r
                          <span class="document-date">{{ formatDocumentDate(doc.uploaded_at) }}</span>\r
                        </td>\r
                        <td>\r
                          <div class="document-actions">\r
                            <button class="action-btn download-btn" (click)="downloadDocument(doc)" title="Descargar">\r
                              <i class="fi fi-rr-download"></i>\r
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
          @if (activeTabIndex() === 3) {\r
            <div class="tab-content-wrapper billing-tab">\r
              <div class="billing-summary">\r
                <h3 class="billing-section-title">Datos fiscales de la orden</h3>\r
                <div class="billing-grid">\r
                  <div class="billing-field">\r
                    <span class="billing-label">Raz\xF3n social</span>\r
                    <span class="billing-value">{{ getFiscalDisplayName() }}</span>\r
                  </div>\r
                  <div class="billing-field">\r
                    <span class="billing-label">RFC</span>\r
                    <span class="billing-value">{{ order()!.fiscal_configuration?.rfc || '\u2014' }}</span>\r
                  </div>\r
                  <div class="billing-field">\r
                    <span class="billing-label">Tipo de persona</span>\r
                    <span class="billing-value">{{ order()!.fiscal_configuration?.persona_type || '\u2014' }}</span>\r
                  </div>\r
                  <div class="billing-field">\r
                    <span class="billing-label">R\xE9gimen fiscal</span>\r
                    <span class="billing-value">{{ order()!.fiscal_configuration?.fiscal_regime || '\u2014' }}</span>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div class="billing-invoices">\r
                <h3 class="billing-section-title">CFDI / Facturas</h3>\r
                @if (getInvoices().length > 0) {\r
                  <table class="products-table">\r
                    <thead>\r
                      <tr>\r
                        <th>FOLIO</th>\r
                        <th>UUID</th>\r
                        <th>FECHA</th>\r
                        <th>MONTO</th>\r
                        <th>ESTADO</th>\r
                      </tr>\r
                    </thead>\r
                    <tbody>\r
                      @for (invoice of getInvoices(); track invoice.id || invoice.uuid || $index) {\r
                        <tr>\r
                          <td>{{ invoice.folio || '\u2014' }}</td>\r
                          <td class="uuid-cell">{{ invoice.uuid || '\u2014' }}</td>\r
                          <td>{{ invoice.issued_at ? (invoice.issued_at | date:'short') : '\u2014' }}</td>\r
                          <td>{{ formatCurrency(invoice.total) }}</td>\r
                          <td>{{ invoice.status || '\u2014' }}</td>\r
                        </tr>\r
                      }\r
                    </tbody>\r
                  </table>\r
                } @else {\r
                  <div class="empty-state">\r
                    <i class="fi fi-rr-receipt"></i>\r
                    <p>Sin facturas emitidas para esta orden</p>\r
                  </div>\r
                }\r
              </div>\r
            </div>\r
          }\r
\r
          @if (activeTabIndex() === 2) {\r
            <div class="tab-content-wrapper">\r
              <table class="products-table">\r
                <thead>\r
                  <tr>\r
                    <th>PRODUCTO</th>\r
                    <th>LOTE</th>\r
                    <th>CANTIDAD ASIGNADA</th>\r
                    <th>CREADO</th>\r
                  </tr>\r
                </thead>\r
                <tbody>\r
                  @for (row of getBatchAllocationsRows(); track row.allocation?.id || $index) {\r
                    <tr [class.row-clickable]="canOpenProduct(row.item)">\r
                      <td>\r
                        <div\r
                          class="product-info product-info--inline"\r
                          [class.product-info--clickable]="canOpenProduct(row.item)"\r
                          role="button"\r
                          [attr.tabindex]="canOpenProduct(row.item) ? 0 : null"\r
                          (click)="canOpenProduct(row.item) && openProductDetail(row.item)"\r
                          (keydown.enter)="canOpenProduct(row.item) && openProductDetail(row.item)"\r
                          (keydown.space)="$event.preventDefault(); canOpenProduct(row.item) && openProductDetail(row.item)">\r
                          <strong>{{ row.item.product?.name || row.item.product_id }}</strong>\r
                        </div>\r
                      </td>\r
                      <td>{{ row.allocation?.inventory_batch?.batch_number || row.allocation?.inventory_batch_id || '-' }}</td>\r
                      <td>{{ row.allocation?.quantity_allocated | removeTrailingZeros }}</td>\r
                      <td>{{ row.allocation?.created_at | date:'short' }}</td>\r
                    </tr>\r
                  } @empty {\r
                    <tr>\r
                      <td colspan="4" class="text-center">\r
                        <div class="empty-state">\r
                          <i class="fi fi-rr-layers"></i>\r
                          <p>Sin asignaciones de lotes</p>\r
                        </div>\r
                      </td>\r
                    </tr>\r
                  }\r
                </tbody>\r
              </table>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  }\r
</div>\r
\r
@if (showRegenerateLanguageModal()) {\r
  <div class="upload-modal-overlay" (click)="closeRegenerateLanguageModal()">\r
    <div class="regenerate-modal" (click)="$event.stopPropagation()">\r
      <div class="regenerate-modal__header">\r
        <h3>Regenerar documento</h3>\r
        <button\r
          type="button"\r
          class="regenerate-modal__close"\r
          (click)="closeRegenerateLanguageModal()"\r
          [disabled]="regeneratingPDF()"\r
        >\r
          <i class="fi fi-rr-cross-small"></i>\r
        </button>\r
      </div>\r
\r
      <div class="regenerate-modal__body">\r
        <p class="regenerate-language-prompt">\xBFEn qu\xE9 idioma desea generar el documento?</p>\r
        <div class="language-options">\r
          <label class="language-option" [class.selected]="selectedRegenerateLanguage() === 'es'">\r
            <input\r
              type="radio"\r
              name="regenerateLanguage"\r
              value="es"\r
              [checked]="selectedRegenerateLanguage() === 'es'"\r
              (change)="selectedRegenerateLanguage.set('es')"\r
              [disabled]="regeneratingPDF()"\r
            />\r
            <span>Espa\xF1ol (es)</span>\r
          </label>\r
          <label class="language-option" [class.selected]="selectedRegenerateLanguage() === 'en'">\r
            <input\r
              type="radio"\r
              name="regenerateLanguage"\r
              value="en"\r
              [checked]="selectedRegenerateLanguage() === 'en'"\r
              (change)="selectedRegenerateLanguage.set('en')"\r
              [disabled]="regeneratingPDF()"\r
            />\r
            <span>English (en)</span>\r
          </label>\r
        </div>\r
        <label class="regenerate-keep-previous">\r
          <input\r
            type="checkbox"\r
            [checked]="keepPreviousDocument()"\r
            (change)="keepPreviousDocument.set($any($event.target).checked)"\r
            [disabled]="regeneratingPDF()"\r
          />\r
          <span>Mantener documento anterior</span>\r
        </label>\r
      </div>\r
\r
      <div class="regenerate-modal__footer">\r
        <button\r
          type="button"\r
          class="regenerate-modal__btn regenerate-modal__btn--cancel"\r
          (click)="closeRegenerateLanguageModal()"\r
          [disabled]="regeneratingPDF()"\r
        >\r
          Cancelar\r
        </button>\r
        <button\r
          type="button"\r
          class="regenerate-modal__btn regenerate-modal__btn--confirm"\r
          [class.is-loading]="regeneratingPDF()"\r
          (click)="confirmRegenerateDocument()"\r
        >\r
          @if (regeneratingPDF()) {\r
            <i class="fi fi-rr-spinner animate-spin"></i>\r
            Regenerando...\r
          } @else {\r
            <i class="fi fi-rr-refresh"></i>\r
            Regenerar\r
          }\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r
`, styles: ["/* src/app/features/sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component.scss */\n.sidebar {\n  background: #f1f5f9;\n  padding: 0.75rem;\n  overflow-y: auto;\n  border-right: 1px solid #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.info-cards-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.info-card {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  padding: 0.625rem 0.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid transparent;\n}\n.info-card--blue {\n  background: #eff6ff;\n  border-color: #dbeafe;\n}\n.info-card--blue .info-card__icon {\n  background: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--green {\n  background: #f0fdf4;\n  border-color: #bbf7d0;\n}\n.info-card--green .info-card__icon {\n  background: #bbf7d0;\n  color: #16a34a;\n}\n.info-card--yellow {\n  background: #fefce8;\n  border-color: #fef08a;\n}\n.info-card--yellow .info-card__icon {\n  background: #fde68a;\n  color: #d97706;\n}\n.info-card--purple {\n  background: #f5f3ff;\n  border-color: #e9d5ff;\n}\n.info-card--purple .info-card__icon {\n  background: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--clickable {\n  cursor: pointer;\n  transition: box-shadow 0.15s, transform 0.15s;\n}\n.info-card--clickable:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);\n}\n.info-card__chevron {\n  margin-left: auto;\n  color: #94a3b8;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n}\n.info-card__icon {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n}\n.info-card__content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n  flex: 1;\n}\n.info-card__label {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #94a3b8;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.info-card__value {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.25;\n  word-break: break-word;\n}\n.section-card {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.75rem;\n}\n.section-card--notes .section-card__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.25rem;\n}\n.section-card .notes-edit-btn {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 0.25rem;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.section-card .notes-edit-btn:hover {\n  background: #e2e8f0;\n  color: #334155;\n}\n.section-card--totals {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.section-card--notes .section-title {\n  margin-bottom: 0.375rem;\n}\n.section-card .section-title {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #64748b;\n  letter-spacing: 0.08em;\n  margin: 0 0 0.375rem;\n  text-transform: uppercase;\n}\n.section-card--totals .section-title {\n  margin: 0;\n}\n.section-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.75rem;\n  padding: 0.3rem 0;\n  border-bottom: 1px solid #f1f5f9;\n}\n.section-item:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.section-label {\n  color: #94a3b8;\n  font-size: 0.75rem;\n}\n.section-value {\n  font-weight: 600;\n  color: #0f172a;\n  text-align: right;\n  font-size: 0.75rem;\n}\n.payment-pill {\n  display: inline-flex;\n  padding: 0.15rem 0.45rem;\n  border-radius: 9999px;\n  font-size: 0.625rem;\n  font-weight: 700;\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.payment-pill--paid {\n  background: #dcfce7;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.375rem;\n}\n.notes-text {\n  margin: 0;\n  font-size: 0.75rem;\n  color: #475569;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.toggle-container {\n  display: inline-flex;\n  gap: 0.125rem;\n  background: #f1f5f9;\n  padding: 0.125rem;\n  border-radius: 0.375rem;\n  border: 1px solid #e2e8f0;\n  flex-shrink: 0;\n}\n.toggle-container .toggle-btn {\n  padding: 0.2rem 0.45rem;\n  border: 1px solid transparent;\n  background: transparent;\n  color: #64748b;\n  font-size: 0.5625rem;\n  font-weight: 700;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.toggle-container .toggle-btn.active {\n  background: #fff;\n  color: #2563eb;\n  border-color: #bfdbfe;\n}\n.totals-card {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.625rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.totals-card .totals-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.75rem;\n}\n.totals-card .totals-label {\n  color: #94a3b8;\n}\n.totals-card .totals-value {\n  font-weight: 600;\n  color: #0f172a;\n}\n.totals-card .totals-divider {\n  height: 1px;\n  background: #e2e8f0;\n  margin: 0.1rem 0;\n}\n.totals-card .totals-row-total .totals-label-total {\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.totals-card .totals-row-total .totals-value-total {\n  font-size: 1rem;\n  font-weight: 800;\n}\n.order-detail-dialog {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  max-height: 96dvh;\n  margin: 0 auto;\n  background: #f9fafb;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.order-detail-dialog .sidebar,\n.order-detail-dialog .tab-content-wrapper,\n.order-detail-dialog .tabs-content {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(15, 23, 42, 0.22) transparent;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar,\n.order-detail-dialog .tabs-content::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-track,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-track,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-thumb,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-thumb,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-thumb {\n  background-color: rgba(15, 23, 42, 0.2);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-thumb:hover,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-thumb:hover,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(15, 23, 42, 0.32);\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-corner,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-corner,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.875rem;\n  min-height: 2.75rem;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  flex-shrink: 0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.dialog-header .dialog-header-main {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.dialog-header .dialog-header-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  flex-shrink: 0;\n}\n.dialog-header .dialog-header__folio,\n.dialog-header h2.dialog-header__folio {\n  margin: 0;\n  font-size: 1.0625rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: #0f172a;\n  line-height: 1.25;\n}\n.dialog-header .close-btn {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 0.375rem;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n  flex-shrink: 0;\n}\n.dialog-header .close-btn:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #0f172a;\n}\n.order-type-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n  background: #dbeafe;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.edit-header-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.edit-header-btn i {\n  font-size: 0.65rem;\n}\n.edit-header-btn:hover {\n  background: #dbeafe;\n  border-color: #93c5fd;\n}\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  line-height: 1.2;\n  white-space: nowrap;\n}\n.dialog-content {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n@media (max-width: 991px) {\n  .dialog-content {\n    flex-direction: column;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n}\n.dialog-content .sidebar {\n  width: min(24rem, 32vw);\n  min-width: 20rem;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .dialog-content .sidebar {\n    width: 100%;\n    min-width: 0;\n    max-height: none;\n    border-right: none !important;\n    border-bottom: 1px solid #e5e7eb;\n  }\n}\n.main-content {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.tabs-header {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .tabs-header {\n    padding: 0 0.75rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-button {\n    padding: 0.625rem 0.875rem;\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-content-wrapper {\n    padding: 0.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .products-table {\n    display: block;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n.loading-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background: #f9fafb;\n  color: #9ca3af;\n}\n.qty-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 0.375rem;\n  background: #dbeafe;\n  color: #1d4ed8;\n  font-size: 0.75rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.qty-pill--muted {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.tabs-header {\n  display: flex;\n  gap: 0;\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1rem;\n}\n.tab-button {\n  padding: 0.625rem 1rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.tab-button:hover {\n  color: #1f2937;\n}\n.tab-button.active {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.tabs-content {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n}\n.tab-content-wrapper {\n  padding: 1.5rem;\n  height: 100%;\n  overflow-y: auto;\n}\n.products-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.products-table thead {\n  background: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.products-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.products-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.products-table tbody tr:hover {\n  background: #f9fafb;\n}\n.products-table tbody tr td {\n  padding: 1rem;\n  color: #1f2937;\n}\n.products-table .product-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.products-table .product-info--inline {\n  display: inline-flex;\n}\n.products-table .product-info strong {\n  font-weight: 500;\n  color: #1f2937;\n}\n.products-table .product-info small {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.products-table .product-info--clickable {\n  cursor: pointer;\n  border-radius: 6px;\n  padding: 0.25rem 0.35rem;\n  margin: -0.25rem -0.35rem;\n  transition: background-color 0.2s ease;\n}\n.products-table .product-info--clickable:hover strong {\n  color: #2563eb;\n}\n.products-table .product-info--clickable:hover {\n  background: #eff6ff;\n}\n.products-table .product-info--clickable:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.products-table tbody tr.row-clickable:hover .product-info--clickable strong {\n  color: #2563eb;\n}\n.billing-tab {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.billing-section-title {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #6b7280;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  margin: 0 0 0.75rem;\n}\n.billing-summary {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  padding: 1rem;\n}\n.billing-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem 1.25rem;\n}\n.billing-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.billing-label {\n  font-size: 0.7rem;\n  color: #9ca3af;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.billing-value {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #1f2937;\n}\n.billing-invoices .uuid-cell {\n  font-family: ui-monospace, monospace;\n  font-size: 0.75rem;\n  color: #6b7280;\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 2.5rem;\n  color: #9ca3af;\n}\n.empty-state i {\n  font-size: 2rem;\n}\n.empty-state p {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.tab-header {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.tab-header button {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  border: none;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n.tab-header button i {\n  font-size: 0.8rem;\n}\n.tab-header button:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.tab-header .btn-secondary {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.tab-header .btn-secondary:hover:not(:disabled) {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n.documents-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.documents-table thead {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.documents-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.documents-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.documents-table tbody tr:hover {\n  background: #f9fafb;\n}\n.documents-table tbody tr td {\n  padding: 1rem;\n  color: #1f2937;\n}\n.document-badge {\n  display: inline-block;\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.document-badge.badge-blue {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-badge.badge-green {\n  background: #dcfce7;\n  color: #166534;\n}\n.document-badge.badge-gray {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.document-type-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.document-language-badge {\n  display: inline-block;\n  min-width: 2rem;\n  padding: 0.2rem 0.45rem;\n  border-radius: 4px;\n  background: #f3f4f6;\n  color: #374151;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-align: center;\n}\n.document-language-empty {\n  color: #9ca3af;\n  font-size: 0.85rem;\n}\n.document-name {\n  font-size: 0.85rem;\n  color: #1f2937;\n  word-break: break-word;\n}\n.document-date {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.document-actions {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.document-actions .action-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 0.9rem;\n}\n.document-actions .action-btn.download-btn {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-actions .action-btn.download-btn:hover {\n  background: #bfdbfe;\n}\n.upload-modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(17, 24, 39, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  padding: 1rem;\n}\n.regenerate-language-prompt {\n  margin: 0 0 0.75rem;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.regenerate-modal {\n  width: 100%;\n  max-width: 400px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n}\n.regenerate-modal__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.regenerate-modal__header h3 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.regenerate-modal__close {\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n}\n.regenerate-modal__close:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #111827;\n}\n.regenerate-modal__close:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__body {\n  padding: 0.85rem 1rem 0.25rem;\n}\n.regenerate-modal__body .language-options {\n  display: flex;\n  gap: 0.5rem;\n}\n.regenerate-modal__body .language-option {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: border-color 0.2s, background 0.2s;\n}\n.regenerate-modal__body .language-option input {\n  margin: 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n}\n.regenerate-modal__body .language-option span {\n  font-size: 0.8rem;\n  color: #1f2937;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.regenerate-modal__body .language-option:hover:not(:has(input:disabled)) {\n  border-color: #93c5fd;\n  background: #f8fafc;\n}\n.regenerate-modal__body .language-option.selected {\n  border-color: #3b82f6;\n  background: #eff6ff;\n}\n.regenerate-modal__body .regenerate-keep-previous {\n  margin-top: 0.85rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.regenerate-modal__body .regenerate-keep-previous input {\n  margin: 0.1rem 0 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n  cursor: pointer;\n}\n.regenerate-modal__body .regenerate-keep-previous span {\n  font-size: 0.8rem;\n  color: #374151;\n  line-height: 1.4;\n}\n.regenerate-modal__body .regenerate-keep-previous:has(input:disabled) {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.regenerate-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem 1rem;\n}\n.regenerate-modal__btn {\n  border: none;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45rem 0.85rem;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  line-height: 1.2;\n}\n.regenerate-modal__btn--cancel {\n  background: transparent;\n  color: #2563eb;\n}\n.regenerate-modal__btn--cancel:hover:not(:disabled) {\n  background: #f3f4f6;\n}\n.regenerate-modal__btn--cancel:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__btn--confirm {\n  background: #22c55e;\n  color: #fff;\n}\n.regenerate-modal__btn--confirm:hover:not(.is-loading) {\n  background: #16a34a;\n}\n.regenerate-modal__btn--confirm.is-loading {\n  cursor: wait;\n  pointer-events: none;\n}\n.regenerate-modal__btn--confirm i {\n  font-size: 0.75rem;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin {\n  animation: spin 1s linear infinite;\n}\n:host ::ng-deep .section-card--pos-pay {\n  border-color: #c7d2fe;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #fff 100%);\n}\n:host ::ng-deep .section-item--highlight .section-value--change {\n  color: #059669;\n  font-weight: 800;\n}\n/*# sourceMappingURL=sales-order-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: MatDialog }, { type: SalesOrderService }, { type: WarehouseService }, { type: FiscalConfigurationService }, { type: Router }, { type: TaxCalculatorService }, { type: ToastService }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SalesOrderDetailDialogComponent, { className: "SalesOrderDetailDialogComponent", filePath: "src/app/features/sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component.ts", lineNumber: 35 });
})();

// src/app/features/sales-orders/components/create-sales-order-modal/create-sales-order-modal.component.ts
var _c0 = () => ({ standalone: true });
var _c1 = () => [];
function CreateSalesOrderModalComponent_Conditional_11_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
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
function CreateSalesOrderModalComponent_Conditional_11_option_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r4 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", warehouse_r4.name, " ");
  }
}
function CreateSalesOrderModalComponent_Conditional_11_mat_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const customer_r5 = ctx.$implicit;
    \u0275\u0275property("value", customer_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", customer_r5.display_name, " ");
  }
}
function CreateSalesOrderModalComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 18)(2, "label", 19);
    \u0275\u0275text(3, "CONFIGURACI\xD3N FISCAL *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 20)(5, "option", 21);
    \u0275\u0275text(6, "Selecciona una configuraci\xF3n fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, CreateSalesOrderModalComponent_Conditional_11_option_7_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 23)(9, "label", 19);
    \u0275\u0275text(10, "ALMAC\xC9N *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "select", 24);
    \u0275\u0275listener("change", function CreateSalesOrderModalComponent_Conditional_11_Template_select_change_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onWarehouseChange());
    });
    \u0275\u0275elementStart(12, "option", 21);
    \u0275\u0275text(13, "Selecciona un almac\xE9n");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, CreateSalesOrderModalComponent_Conditional_11_option_14_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 23)(16, "div", 25)(17, "label", 19);
    \u0275\u0275text(18, "CLIENTE *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 26);
    \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Conditional_11_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openCreateCustomerModal());
    });
    \u0275\u0275element(20, "i", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(21, "input", 28);
    \u0275\u0275elementStart(22, "mat-autocomplete", 29, 0);
    \u0275\u0275listener("optionSelected", function CreateSalesOrderModalComponent_Conditional_11_Template_mat_autocomplete_optionSelected_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCustomerSelected($event.option.value));
    });
    \u0275\u0275template(24, CreateSalesOrderModalComponent_Conditional_11_mat_option_24_Template, 2, 2, "mat-option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 23)(26, "label", 19);
    \u0275\u0275text(27, "FECHA DE ENTREGA");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "input", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 18)(30, "label", 19);
    \u0275\u0275text(31, "NOTAS");
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "textarea", 31);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const autoCustomer_r6 = \u0275\u0275reference(23);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r2.fiscalConfigurations);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r2.warehouses);
    \u0275\u0275advance(7);
    \u0275\u0275property("matAutocomplete", autoCustomer_r6);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r2.displayCustomer.bind(ctx_r2));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.filteredCustomers);
  }
}
function CreateSalesOrderModalComponent_Conditional_12_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "p");
    \u0275\u0275text(2, "Selecciona un almac\xE9n y agrega productos.");
    \u0275\u0275elementEnd()();
  }
}
function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_option_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r11 = ctx.$implicit;
    \u0275\u0275property("value", uom_r11.id || uom_r11.product_uom_id || uom_r11.uom_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", uom_r11.name || uom_r11.uom_name, " ");
  }
}
function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_option_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r12 = ctx.$implicit;
    \u0275\u0275property("value", option_r12.price_list_id || option_r12.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", option_r12.price_list_name || "Lista", " (", option_r12.price, ") ");
  }
}
function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "div", 42)(3, "div", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 44)(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "button", 45);
    \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_button_click_10_listener() {
      const i_r9 = \u0275\u0275restoreView(_r8).index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removeLineItem(i_r9));
    });
    \u0275\u0275element(11, "i", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 47)(13, "div", 23)(14, "label", 19);
    \u0275\u0275text(15, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 48);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_select_ngModelChange_16_listener($event) {
      const item_r10 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r10.product_uom_id, $event) || (item_r10.product_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_select_change_16_listener() {
      const i_r9 = \u0275\u0275restoreView(_r8).index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onLineUomChange(i_r9));
    });
    \u0275\u0275elementStart(17, "option", 21);
    \u0275\u0275text(18, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_option_19_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 23)(21, "label", 19);
    \u0275\u0275text(22, "Lista precio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 48);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_select_ngModelChange_23_listener($event) {
      const item_r10 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r10.selected_pricing_option_id, $event) || (item_r10.selected_pricing_option_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_select_change_23_listener() {
      const i_r9 = \u0275\u0275restoreView(_r8).index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onLinePricingOptionChange(i_r9));
    });
    \u0275\u0275elementStart(24, "option", 21);
    \u0275\u0275text(25, "Sugerido");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_option_26_Template, 2, 3, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 23)(28, "label", 19);
    \u0275\u0275text(29, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 49);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_input_ngModelChange_30_listener($event) {
      const item_r10 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r10.quantity, $event) || (item_r10.quantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 23)(32, "label", 19);
    \u0275\u0275text(33, "Precio unit.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_input_ngModelChange_34_listener($event) {
      const item_r10 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r10.unit_price, $event) || (item_r10.unit_price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 23)(36, "label", 19);
    \u0275\u0275text(37, "Desc. %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_input_ngModelChange_38_listener($event) {
      const item_r10 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r10.discount_percentage, $event) || (item_r10.discount_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 23)(40, "label", 19);
    \u0275\u0275text(41, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_input_ngModelChange_42_listener($event) {
      const item_r10 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r10.iva_percentage, $event) || (item_r10.iva_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 23)(44, "label", 19);
    \u0275\u0275text(45, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 52);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template_input_ngModelChange_46_listener($event) {
      const item_r10 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r10.ieps_percentage, $event) || (item_r10.ieps_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const i_r9 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r10.product_name || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("SKU: ", item_r10.product_sku || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Disp: ", item_r10.available_quantity ?? 0);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", item_r10.product_uom_id);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.getProductUoms(i_r9));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r10.selected_pricing_option_id);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(20, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", item_r10.pricing_options || \u0275\u0275pureFunction0(21, _c1));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r10.quantity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(22, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r10.unit_price);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(23, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r10.discount_percentage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(24, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r10.iva_percentage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(25, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r10.ieps_percentage);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(26, _c0));
  }
}
function CreateSalesOrderModalComponent_Conditional_12_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275template(1, CreateSalesOrderModalComponent_Conditional_12_div_7_div_1_Template, 47, 27, "div", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.lineItems);
  }
}
function CreateSalesOrderModalComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 33)(2, "h3");
    \u0275\u0275text(3, "Productos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 34);
    \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Conditional_12_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openAddProductModal());
    });
    \u0275\u0275text(5, " + Agregar Producto ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, CreateSalesOrderModalComponent_Conditional_12_div_6_Template, 3, 0, "div", 35)(7, CreateSalesOrderModalComponent_Conditional_12_div_7_Template, 2, 1, "div", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !((tmp_1_0 = ctx_r2.form.get("warehouse_id")) == null ? null : tmp_1_0.value));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r2.lineItems.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.lineItems.length > 0);
  }
}
function CreateSalesOrderModalComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Crear Orden");
    \u0275\u0275elementEnd();
  }
}
function CreateSalesOrderModalComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Creando...");
    \u0275\u0275elementEnd();
  }
}
function CreateSalesOrderModalComponent_Conditional_19_mat_option_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", product_r14);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getProductOptionLabel(product_r14), " ");
  }
}
function CreateSalesOrderModalComponent_Conditional_19_option_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r15 = ctx.$implicit;
    \u0275\u0275property("value", uom_r15.id || uom_r15.product_uom_id || uom_r15.uom_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", uom_r15.name || uom_r15.uom_name, " ");
  }
}
function CreateSalesOrderModalComponent_Conditional_19_option_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r16 = ctx.$implicit;
    \u0275\u0275property("value", option_r16.price_list_id || option_r16.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", option_r16.price_list_name || "Lista", " (", option_r16.price, ") ");
  }
}
function CreateSalesOrderModalComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Conditional_19_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeAddProductModal());
    });
    \u0275\u0275elementStart(1, "div", 54);
    \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Conditional_19_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 55)(3, "h3");
    \u0275\u0275text(4, "Agregar producto");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 56)(6, "div", 18)(7, "label", 19);
    \u0275\u0275text(8, "PRODUCTO *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 57);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_19_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.productSearchTerm, $event) || (ctx_r2.productSearchTerm = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-autocomplete", 29, 1);
    \u0275\u0275listener("optionSelected", function CreateSalesOrderModalComponent_Conditional_19_Template_mat_autocomplete_optionSelected_10_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onProductSelectedForModal($event.option.value));
    });
    \u0275\u0275template(12, CreateSalesOrderModalComponent_Conditional_19_mat_option_12_Template, 2, 2, "mat-option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 11)(14, "div", 23)(15, "label", 19);
    \u0275\u0275text(16, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 58);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_19_Template_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedUomId, $event) || (ctx_r2.selectedUomId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreateSalesOrderModalComponent_Conditional_19_Template_select_change_17_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSelectedUomChange());
    });
    \u0275\u0275elementStart(18, "option", 21);
    \u0275\u0275text(19, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, CreateSalesOrderModalComponent_Conditional_19_option_20_Template, 2, 2, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 23)(22, "label", 19);
    \u0275\u0275text(23, "LISTA DE PRECIO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 58);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_19_Template_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedPricingOptionId, $event) || (ctx_r2.selectedPricingOptionId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function CreateSalesOrderModalComponent_Conditional_19_Template_select_change_24_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSelectedPricingOptionChange());
    });
    \u0275\u0275elementStart(25, "option", 21);
    \u0275\u0275text(26, "Sugerido");
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, CreateSalesOrderModalComponent_Conditional_19_option_27_Template, 2, 3, "option", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 23)(29, "label", 19);
    \u0275\u0275text(30, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 23)(33, "label", 19);
    \u0275\u0275text(34, "DISPONIBLE");
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "input", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "div", 23)(37, "label", 19);
    \u0275\u0275text(38, "CANTIDAD *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_19_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedQuantity, $event) || (ctx_r2.selectedQuantity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 23)(41, "label", 19);
    \u0275\u0275text(42, "PRECIO UNITARIO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_19_Template_input_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedUnitPrice, $event) || (ctx_r2.selectedUnitPrice = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 23)(45, "label", 19);
    \u0275\u0275text(46, "DESCUENTO %");
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "input", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 23)(49, "label", 19);
    \u0275\u0275text(50, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_19_Template_input_ngModelChange_51_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedIva, $event) || (ctx_r2.selectedIva = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 23)(53, "label", 19);
    \u0275\u0275text(54, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function CreateSalesOrderModalComponent_Conditional_19_Template_input_ngModelChange_55_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedIeps, $event) || (ctx_r2.selectedIeps = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "div", 64)(57, "button", 14);
    \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Conditional_19_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeAddProductModal());
    });
    \u0275\u0275text(58, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "button", 65);
    \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Conditional_19_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmAddProduct());
    });
    \u0275\u0275text(60, "Agregar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const autoProductPicker_r17 = \u0275\u0275reference(11);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.productSearchTerm);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(22, _c0))("matAutocomplete", autoProductPicker_r17);
    \u0275\u0275advance();
    \u0275\u0275property("displayWith", ctx_r2.displayProduct.bind(ctx_r2));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.filteredProductsForModal);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedUomId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(23, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.selectedProductUoms);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedPricingOptionId);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(24, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.selectedModalPricingOptions);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", (ctx_r2.selectedProduct == null ? null : ctx_r2.selectedProduct.product_sku) || (ctx_r2.selectedProduct == null ? null : ctx_r2.selectedProduct.sku) || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.getAvailableQty(ctx_r2.selectedProduct));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedQuantity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(25, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedUnitPrice);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(26, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275property("value", 0);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedIva);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(27, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedIeps);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(28, _c0));
  }
}
var CreateSalesOrderModalComponent = class _CreateSalesOrderModalComponent {
  fb;
  salesOrderService;
  fiscalConfigService;
  warehouseService;
  customerService;
  dialog;
  toast;
  cdr;
  dialogRef;
  data;
  form;
  loading = false;
  saving = false;
  lineItems = [];
  products = [];
  loadingProducts = false;
  customers = [];
  filteredCustomers = [];
  fiscalConfigurations = [];
  warehouses = [];
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
  selectedUnitPrice = 0;
  selectedIva = 16;
  selectedIeps = 0;
  selectedPricingOptionId = "";
  constructor(fb, salesOrderService, fiscalConfigService, warehouseService, customerService, dialog, toast, cdr, dialogRef, data) {
    this.fb = fb;
    this.salesOrderService = salesOrderService;
    this.fiscalConfigService = fiscalConfigService;
    this.warehouseService = warehouseService;
    this.customerService = customerService;
    this.dialog = dialog;
    this.toast = toast;
    this.cdr = cdr;
    this.dialogRef = dialogRef;
    this.data = data;
    this.form = this.fb.group({
      fiscal_configuration_id: ["", Validators.required],
      customer_search: [""],
      customer_id: ["", Validators.required],
      warehouse_id: ["", Validators.required],
      expected_delivery_date: [""],
      sales_order_type: ["MANUAL"],
      payment_status: ["Pendiente"],
      notes: [""]
    });
  }
  ngOnInit() {
    this.loadDropdownData();
    this.form.get("customer_search")?.valueChanges.subscribe((value) => {
      if (typeof value === "string") {
        this.form.patchValue({ customer_id: "" }, { emitEvent: false });
      }
      this.filterCustomers(value ?? "");
    });
  }
  onTabChange(tabId) {
    this.activeTab = tabId;
  }
  loadDropdownData() {
    this.loading = true;
    Promise.all([
      this.fiscalConfigService.listFiscalConfigurations().toPromise(),
      this.customerService.getCustomers({ limit: 100 }).toPromise(),
      this.warehouseService.getWarehouses().toPromise()
    ]).then(([fiscalConfigs, customers, warehouses]) => {
      this.fiscalConfigurations = fiscalConfigs?.data || [];
      const customerRows = customers?.data || [];
      this.customers = customerRows.map((customer) => __spreadProps(__spreadValues({}, customer), {
        display_name: this.formatCustomerLabel(customer)
      }));
      this.filteredCustomers = [...this.customers];
      this.warehouses = warehouses?.data || [];
      this.prefillCustomerIfProvided();
      this.loading = false;
      this.cdr.detectChanges();
    }).catch((error) => {
      console.error("Error loading dropdown data:", error);
      this.toast.error("Error al cargar datos");
      this.loading = false;
      this.cdr.detectChanges();
    });
  }
  onWarehouseChange() {
    const warehouseId = this.form.get("warehouse_id")?.value;
    if (!warehouseId) {
      this.products = [];
      this.lineItems = [];
      this.resetAddProductForm();
      return;
    }
    this.loadProducts();
  }
  onCustomerSelected(customer) {
    if (!customer)
      return;
    this.form.patchValue({
      customer_id: customer.id,
      customer_search: customer.display_name
    }, { emitEvent: false });
  }
  openCreateCustomerModal() {
    const dialogRef = this.dialog.open(CustomerEditModalComponent, {
      width: "700px",
      maxWidth: "95vw",
      maxHeight: "90vh",
      panelClass: "customer-edit-dialog",
      autoFocus: "first-tabbable",
      data: { customer: null }
    });
    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.reloadCustomers();
      }
    });
  }
  reloadCustomers() {
    this.customerService.getCustomers({ limit: 100 }).subscribe({
      next: (customers) => {
        const customerRows = customers?.data || [];
        this.customers = customerRows.map((customer) => __spreadProps(__spreadValues({}, customer), {
          display_name: this.formatCustomerLabel(customer)
        }));
        const search = this.form.get("customer_search")?.value ?? "";
        this.filterCustomers(search);
        this.cdr.detectChanges();
      },
      error: () => {
        this.toast.error("No se pudieron actualizar los clientes");
      }
    });
  }
  displayCustomer(customer) {
    if (!customer)
      return "";
    if (typeof customer === "string")
      return customer;
    return customer?.display_name || this.formatCustomerLabel(customer) || "";
  }
  filterCustomers(search) {
    const raw = typeof search === "string" ? search : search?.display_name || this.formatCustomerLabel(search);
    const term = String(raw || "").toLowerCase().trim();
    if (!term) {
      this.filteredCustomers = [...this.customers];
      return;
    }
    this.filteredCustomers = this.customers.filter((customer) => String(customer.display_name || "").toLowerCase().includes(term));
  }
  prefillCustomerIfProvided() {
    const customerId = this.data?.customerId;
    if (customerId == null || customerId === "")
      return;
    const customer = this.customers.find((c) => String(c.id) === String(customerId));
    if (customer) {
      this.onCustomerSelected(customer);
    }
  }
  formatCustomerLabel(customer) {
    if (!customer)
      return "";
    const fullName = `${customer.name || ""} ${customer.lastname || ""}`.trim();
    const company = (customer.company_name || "").trim();
    if (fullName && company)
      return `${fullName} - ${company}`;
    if (fullName)
      return fullName;
    if (company)
      return company;
    return customer.email || `Cliente ${customer.id}`;
  }
  loadProducts() {
    const warehouseId = this.form.get("warehouse_id")?.value;
    if (!warehouseId) {
      this.products = [];
      return;
    }
    this.loadingProducts = true;
    this.salesOrderService.getWarehouseProductsSummary(warehouseId).subscribe({
      next: (res) => {
        this.products = this.normalizeWarehouseProducts(res);
        this.loadingProducts = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingProducts = false;
      }
    });
  }
  normalizeWarehouseProducts(res) {
    const rows = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : Array.isArray(res?.items) ? res.items : [];
    return rows.map((row) => {
      const productId = row.product_id || row.id;
      const name = row.product_name || row.name || "Producto";
      const sku = row.product_sku || row.sku || "";
      const available = this.getAvailableQty(row);
      const uoms = this.normalizeUoms(row);
      return __spreadProps(__spreadValues({}, row), {
        product_id: productId,
        id: productId,
        product_name: name,
        name,
        product_sku: sku,
        sku,
        available_quantity: available,
        uoms
      });
    });
  }
  normalizeUoms(product) {
    const rows = Array.isArray(product?.uoms) ? product.uoms : [];
    if (rows.length > 0) {
      return rows.map((u) => __spreadProps(__spreadValues({}, u), {
        id: u.id || u.product_uom_id || u.uom_id,
        product_uom_id: u.product_uom_id || u.id || u.uom_id,
        uom_id: u.uom_id || u.id,
        name: u.name || u.uom_name || "UOM",
        uom_name: u.uom_name || u.name || "UOM",
        cost: Number(u.suggested_unit_price ?? u.cost ?? u.unit_price ?? 0),
        iva_percentage: Number(u.suggested_iva_percentage ?? u.iva_percentage ?? 16),
        ieps_percentage: Number(u.suggested_ieps_percentage ?? u.ieps_percentage ?? 0),
        pricing_options: Array.isArray(u.pricing_options) ? u.pricing_options : []
      }));
    }
    const fallbackId = product.product_uom_id || product.uom_id || "";
    if (!fallbackId)
      return [];
    return [{
      id: fallbackId,
      product_uom_id: fallbackId,
      uom_id: product.uom_id || fallbackId,
      name: product.uom_name || "UOM",
      uom_name: product.uom_name || "UOM",
      cost: Number(product.suggested_unit_price ?? product.cost ?? product.unit_price ?? 0),
      iva_percentage: Number(product.suggested_iva_percentage ?? product.iva_percentage ?? 16),
      ieps_percentage: Number(product.suggested_ieps_percentage ?? product.ieps_percentage ?? 0),
      pricing_options: Array.isArray(product.pricing_options) ? product.pricing_options : []
    }];
  }
  openAddProductModal() {
    if (!this.form.get("warehouse_id")?.value) {
      this.toast.warning("Selecciona un almac\xE9n antes de agregar productos");
      return;
    }
    this.addProductModalOpen = true;
    this.resetAddProductForm();
  }
  closeAddProductModal() {
    this.addProductModalOpen = false;
  }
  get filteredProductsForModal() {
    const raw = typeof this.productSearchTerm === "string" ? this.productSearchTerm : this.getProductOptionLabel(this.productSearchTerm);
    const term = String(raw || "").toLowerCase().trim();
    if (!term)
      return this.products;
    return this.products.filter((product) => {
      const haystack = `${product.product_name || product.name || ""} ${product.product_sku || product.sku || ""}`.toLowerCase();
      return haystack.includes(term);
    });
  }
  get selectedProductUoms() {
    if (!this.selectedProduct)
      return [];
    return this.selectedProduct?.uoms || [];
  }
  onProductSelectedForModal(product) {
    this.selectedProduct = product;
    this.productSearchTerm = product;
    const firstUom = (product?.uoms || [])[0];
    this.selectedUomId = firstUom?.id || firstUom?.product_uom_id || firstUom?.uom_id || "";
    this.selectedUnitPrice = Number(firstUom?.cost || 0);
    this.selectedIva = Number(firstUom?.iva_percentage || 0);
    this.selectedIeps = Number(firstUom?.ieps_percentage || 0);
    this.selectedPricingOptionId = "";
  }
  onSelectedUomChange() {
    const uom = this.selectedProductUoms.find((row) => (row.id || row.product_uom_id || row.uom_id) === this.selectedUomId);
    if (!uom)
      return;
    this.selectedUnitPrice = Number(uom.cost || 0);
    this.selectedIva = Number(uom.iva_percentage || 0);
    this.selectedIeps = Number(uom.ieps_percentage || 0);
    this.selectedPricingOptionId = "";
  }
  get selectedModalPricingOptions() {
    const uom = this.selectedProductUoms.find((row) => (row.id || row.product_uom_id || row.uom_id) === this.selectedUomId);
    return Array.isArray(uom?.pricing_options) ? uom.pricing_options : [];
  }
  onSelectedPricingOptionChange() {
    const option = this.selectedModalPricingOptions.find((row) => (row.price_list_id || row.id) === this.selectedPricingOptionId);
    if (!option)
      return;
    this.selectedUnitPrice = Number(option.price ?? 0);
    this.selectedIva = Number(option.iva_percentage ?? 0);
    this.selectedIeps = Number(option.ieps_percentage ?? 0);
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
    const selectedUom = this.selectedProductUoms.find((row) => (row.id || row.product_uom_id || row.uom_id) === this.selectedUomId);
    const newItem = {
      product_id: this.selectedProduct.product_id,
      product_uom_id: this.selectedUomId,
      product_name: this.selectedProduct.product_name,
      product_sku: this.selectedProduct.product_sku || this.selectedProduct.sku || "",
      available_quantity: this.getAvailableQty(this.selectedProduct),
      uom_name: selectedUom?.uom_name || selectedUom?.name || "",
      pricing_options: Array.isArray(selectedUom?.pricing_options) ? selectedUom.pricing_options : [],
      selected_pricing_option_id: this.selectedPricingOptionId || void 0,
      quantity,
      unit_price: Number(this.selectedUnitPrice || 0),
      discount_percentage: 0,
      iva_percentage: Number(this.selectedIva || 0),
      ieps_percentage: Number(this.selectedIeps || 0)
    };
    this.lineItems.push(newItem);
    this.closeAddProductModal();
  }
  resetAddProductForm() {
    this.productSearchTerm = "";
    this.selectedProduct = null;
    this.selectedUomId = "";
    this.selectedQuantity = 1;
    this.selectedUnitPrice = 0;
    this.selectedIva = 16;
    this.selectedIeps = 0;
    this.selectedPricingOptionId = "";
  }
  getProductOptionLabel(product) {
    const name = product?.product_name || product?.name || "Producto";
    const sku = product?.product_sku || product?.sku ? ` | SKU: ${product?.product_sku || product?.sku}` : "";
    const available = this.getAvailableQty(product);
    return `${name}${sku} | Disp: ${available}`;
  }
  displayProduct(value) {
    if (!value)
      return "";
    if (typeof value === "string")
      return value;
    return this.getProductOptionLabel(value);
  }
  getAvailableQty(product) {
    const raw = product?.total_available_quantity ?? product?.available_quantity ?? product?.available_qty ?? product?.stock ?? product?.on_hand ?? product?.inventory_qty ?? 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  removeLineItem(index) {
    this.lineItems.splice(index, 1);
  }
  getProductUoms(index) {
    const item = this.lineItems[index];
    if (!item.product_id)
      return [];
    const product = this.products.find((p) => p.product_id === item.product_id || p.id === item.product_id);
    return product?.uoms || [];
  }
  onProductChange(index) {
    const item = this.lineItems[index];
    const product = this.products.find((p) => p.product_id === item.product_id || p.id === item.product_id);
    if (product?.uoms?.length > 0) {
      const uom = product.uoms[0];
      item.product_uom_id = uom.id || uom.product_uom_id || uom.uom_id;
      item.product_name = product.product_name || product.name || "";
      item.product_sku = product.product_sku || product.sku || "";
      item.available_quantity = this.getAvailableQty(product);
      item.uom_name = uom.uom_name || uom.name || "";
      item.unit_price = Number(uom.cost || item.unit_price || 0);
      item.discount_percentage = Number(item.discount_percentage || 0);
      item.iva_percentage = Number(uom.iva_percentage || item.iva_percentage || 0);
      item.ieps_percentage = Number(uom.ieps_percentage || item.ieps_percentage || 0);
      item.pricing_options = Array.isArray(uom.pricing_options) ? uom.pricing_options : [];
      item.selected_pricing_option_id = void 0;
    }
  }
  onLineUomChange(index) {
    const item = this.lineItems[index];
    const uom = this.getProductUoms(index).find((row) => (row.id || row.product_uom_id || row.uom_id) === item.product_uom_id);
    if (!uom)
      return;
    item.uom_name = uom.uom_name || uom.name || "";
    item.unit_price = Number(uom.cost || item.unit_price || 0);
    item.discount_percentage = Number(item.discount_percentage || 0);
    item.iva_percentage = Number(uom.iva_percentage || item.iva_percentage || 0);
    item.ieps_percentage = Number(uom.ieps_percentage || item.ieps_percentage || 0);
    item.pricing_options = Array.isArray(uom.pricing_options) ? uom.pricing_options : [];
    item.selected_pricing_option_id = void 0;
  }
  onLinePricingOptionChange(index) {
    const item = this.lineItems[index];
    const option = (item.pricing_options || []).find((row) => (row.price_list_id || row.id) === item.selected_pricing_option_id);
    if (!option)
      return;
    item.unit_price = Number(option.price ?? item.unit_price ?? 0);
    item.iva_percentage = Number(option.iva_percentage ?? item.iva_percentage ?? 0);
    item.ieps_percentage = Number(option.ieps_percentage ?? item.ieps_percentage ?? 0);
  }
  save() {
    if (!this.form.valid || this.lineItems.length === 0) {
      this.toast.warning("Por favor completa todos los campos y agrega al menos un producto");
      return;
    }
    this.saving = true;
    const fv = this.form.value;
    const payload = {
      fiscal_configuration_id: fv.fiscal_configuration_id,
      warehouse_id: fv.warehouse_id,
      customer_id: fv.customer_id,
      expected_delivery_date: fv.expected_delivery_date || void 0,
      sales_order_type: fv.sales_order_type || "MANUAL",
      payment_status: fv.payment_status || "Pendiente",
      notes: (fv.notes || "").trim() || void 0,
      line_items: this.lineItems.map((li) => ({
        product_id: li.product_id,
        product_uom_id: li.product_uom_id,
        quantity: Number(li.quantity),
        unit_price: Number(li.unit_price),
        discount_percentage: Number(li.discount_percentage || 0),
        iva_percentage: Number(li.iva_percentage),
        ieps_percentage: Number(li.ieps_percentage)
      }))
    };
    this.salesOrderService.createOrder(payload).subscribe({
      next: (order) => {
        this.saving = false;
        this.toast.success("Orden de venta creada exitosamente");
        this.dialogRef.close(order);
      },
      error: (error) => {
        this.saving = false;
        this.cdr.detectChanges();
        const msg = error.error?.message || error.message || "Error al crear la orden de venta";
        this.toast.error(msg);
      }
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function CreateSalesOrderModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CreateSalesOrderModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(SalesOrderService), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateSalesOrderModalComponent, selectors: [["app-create-sales-order-modal"]], decls: 20, vars: 9, consts: [["autoCustomer", "matAutocomplete"], ["autoProductPicker", "matAutocomplete"], [1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "currentColor"], ["d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"], [1, "modal-content"], [3, "formGroup"], [1, "mb-4"], [3, "tabChange", "tabs", "activeTabId"], [1, "form-grid"], [1, "line-items-section"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [4, "ngIf"], [1, "add-product-overlay"], [1, "form-field", "form-field--full"], [1, "form-label"], ["formControlName", "fiscal_configuration_id", 1, "form-select"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "form-field"], ["formControlName", "warehouse_id", 1, "form-select", 3, "change"], [1, "form-label-row"], ["type", "button", "title", "Crear cliente", "aria-label", "Crear cliente", 1, "btn-label-add", 3, "click"], [1, "fi", "fi-rr-plus"], ["type", "text", "formControlName", "customer_search", "placeholder", "Buscar cliente...", 1, "form-input", 3, "matAutocomplete"], [3, "optionSelected", "displayWith"], ["type", "date", "formControlName", "expected_delivery_date", 1, "form-input"], ["formControlName", "notes", "placeholder", "Notas opcionales", "rows", "2", 1, "form-textarea"], [3, "value"], [1, "section-header"], ["type", "button", 1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], ["class", "empty-state", 4, "ngIf"], ["class", "line-items-cards", 4, "ngIf"], [1, "empty-state"], [1, "line-items-cards"], ["class", "line-item-card", 4, "ngFor", "ngForOf"], [1, "line-item-card"], [1, "line-item-card__header"], [1, "product-cell"], [1, "product-cell__name"], [1, "product-cell__meta"], ["type", "button", "title", "Eliminar", 1, "btn-icon", "btn-icon--danger", 3, "click"], [1, "fi", "fi-rr-trash"], [1, "line-item-card__grid"], [1, "form-select", "form-select--inline", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "number", "min", "0.01", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "max", "100", "step", "0.01", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "max", "100", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "add-product-overlay", 3, "click"], [1, "add-product-modal", 3, "click"], [1, "add-product-modal__header"], [1, "add-product-modal__body"], ["type", "text", "placeholder", "Buscar por nombre o SKU...", 1, "form-input", 3, "ngModelChange", "ngModel", "ngModelOptions", "matAutocomplete"], [1, "form-select", 3, "ngModelChange", "change", "ngModel", "ngModelOptions"], ["type", "text", "readonly", "", 1, "form-input", 3, "value"], ["type", "number", "readonly", "", 1, "form-input", 3, "value"], ["type", "number", "min", "0.01", "step", "0.01", 1, "form-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "step", "0.01", 1, "form-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "max", "100", "step", "0.01", 1, "form-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "add-product-modal__footer"], ["type", "button", 1, "btn", "btn--primary", 3, "click"]], template: function CreateSalesOrderModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2");
      \u0275\u0275text(3, "Crear Orden de Venta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Template_button_click_4_listener() {
        return ctx.cancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 5);
      \u0275\u0275element(6, "path", 6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 7)(8, "form", 8)(9, "div", 9)(10, "app-tab", 10);
      \u0275\u0275listener("tabChange", function CreateSalesOrderModalComponent_Template_app_tab_tabChange_10_listener($event) {
        return ctx.onTabChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(11, CreateSalesOrderModalComponent_Conditional_11_Template, 33, 5, "div", 11);
      \u0275\u0275conditionalCreate(12, CreateSalesOrderModalComponent_Conditional_12_Template, 8, 3, "div", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 13)(14, "button", 14);
      \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Template_button_click_14_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(15, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 15);
      \u0275\u0275listener("click", function CreateSalesOrderModalComponent_Template_button_click_16_listener() {
        return ctx.save();
      });
      \u0275\u0275template(17, CreateSalesOrderModalComponent_span_17_Template, 2, 0, "span", 16)(18, CreateSalesOrderModalComponent_span_18_Template, 2, 0, "span", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(19, CreateSalesOrderModalComponent_Conditional_19_Template, 61, 29, "div", 17);
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
.form-label-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.btn-label-add[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  background: #eff6ff;
  color: #2563eb;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s,
    box-shadow 0.15s;
  flex-shrink: 0;
}
.btn-label-add[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {
  font-size: 11px;
  line-height: 1;
}
.btn-label-add[_ngcontent-%COMP%]:hover {
  background: #dbeafe;
  border-color: #93c5fd;
  color: #1d4ed8;
  box-shadow: 0 1px 2px rgba(37, 99, 235, 0.15);
}
.btn-label-add[_ngcontent-%COMP%]:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
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
  width: 34%;
}
.line-items-cards[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.line-item-card[_ngcontent-%COMP%] {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  background: #fff;
}
.line-item-card__header[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}
.line-item-card__grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
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
:[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option {
  min-height: 40px;
}
:[_nghost-%COMP%]     .mat-mdc-autocomplete-panel .mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  line-height: 1.25;
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
@media (max-width: 768px) {
  .modal-container[_ngcontent-%COMP%] {
    max-width: 95vw;
  }
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .line-item-card__grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
  }
}
/*# sourceMappingURL=create-sales-order-modal.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateSalesOrderModalComponent, [{
    type: Component,
    args: [{ selector: "app-create-sales-order-modal", standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, TabComponent], template: `<div class="modal-container">
  <!-- Header -->
  <div class="modal-header">
    <h2>Crear Orden de Venta</h2>
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
      <div class="form-grid">
        <div class="form-field form-field--full">
          <label class="form-label">CONFIGURACI\xD3N FISCAL *</label>
          <select class="form-select" formControlName="fiscal_configuration_id">
            <option value="">Selecciona una configuraci\xF3n fiscal</option>
            <option *ngFor="let config of fiscalConfigurations" [value]="config.id">
              {{ config.razon_social || config.rfc || config.id }}
            </option>
          </select>
        </div>

        <div class="form-field">
          <label class="form-label">ALMAC\xC9N *</label>
          <select class="form-select" formControlName="warehouse_id" (change)="onWarehouseChange()">
            <option value="">Selecciona un almac\xE9n</option>
            <option *ngFor="let warehouse of warehouses" [value]="warehouse.id">
              {{ warehouse.name }}
            </option>
          </select>
        </div>

        <div class="form-field">
          <div class="form-label-row">
            <label class="form-label">CLIENTE *</label>
            <button
              type="button"
              class="btn-label-add"
              (click)="openCreateCustomerModal()"
              title="Crear cliente"
              aria-label="Crear cliente">
              <i class="fi fi-rr-plus"></i>
            </button>
          </div>
          <input
            type="text"
            class="form-input"
            formControlName="customer_search"
            placeholder="Buscar cliente..."
            [matAutocomplete]="autoCustomer">
          <mat-autocomplete
            #autoCustomer="matAutocomplete"
            [displayWith]="displayCustomer.bind(this)"
            (optionSelected)="onCustomerSelected($event.option.value)">
            <mat-option *ngFor="let customer of filteredCustomers" [value]="customer">
              {{ customer.display_name }}
            </mat-option>
          </mat-autocomplete>
        </div>

        <div class="form-field">
          <label class="form-label">FECHA DE ENTREGA</label>
          <input type="date" class="form-input" formControlName="expected_delivery_date">
        </div>

        <div class="form-field form-field--full">
          <label class="form-label">NOTAS</label>
          <textarea class="form-textarea" formControlName="notes" placeholder="Notas opcionales" rows="2"></textarea>
        </div>
      </div>
      }

      @if (activeTab === 'products') {
      <div class="line-items-section">
        <div class="section-header">
          <h3>Productos</h3>
          <button type="button" class="btn btn--sm btn--primary" (click)="openAddProductModal()" [disabled]="!form.get('warehouse_id')?.value">
            + Agregar Producto
          </button>
        </div>

        <div *ngIf="lineItems.length === 0" class="empty-state">
          <p>Selecciona un almac\xE9n y agrega productos.</p>
        </div>

        <div *ngIf="lineItems.length > 0" class="line-items-cards">
          <div class="line-item-card" *ngFor="let item of lineItems; let i = index">
            <div class="line-item-card__header">
              <div class="product-cell">
                <div class="product-cell__name">{{ item.product_name || '\u2014' }}</div>
                <div class="product-cell__meta">
                  <span>SKU: {{ item.product_sku || 'N/A' }}</span>
                  <span>Disp: {{ item.available_quantity ?? 0 }}</span>
                </div>
              </div>
              <button type="button" class="btn-icon btn-icon--danger" (click)="removeLineItem(i)" title="Eliminar">
                <i class="fi fi-rr-trash"></i>
              </button>
            </div>

            <div class="line-item-card__grid">
              <div class="form-field">
                <label class="form-label">UOM</label>
                <select
                  class="form-select form-select--inline"
                  [(ngModel)]="item.product_uom_id"
                  [ngModelOptions]="{standalone: true}"
                  (change)="onLineUomChange(i)">
                  <option value="">Seleccionar...</option>
                  <option *ngFor="let uom of getProductUoms(i)" [value]="uom.id || uom.product_uom_id || uom.uom_id">
                    {{ uom.name || uom.uom_name }}
                  </option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">Lista precio</label>
                <select
                  class="form-select form-select--inline"
                  [(ngModel)]="item.selected_pricing_option_id"
                  [ngModelOptions]="{standalone: true}"
                  (change)="onLinePricingOptionChange(i)">
                  <option value="">Sugerido</option>
                  <option *ngFor="let option of item.pricing_options || []" [value]="option.price_list_id || option.id">
                    {{ option.price_list_name || 'Lista' }} ({{ option.price }})
                  </option>
                </select>
              </div>

              <div class="form-field">
                <label class="form-label">Cantidad</label>
                <input type="number" class="form-input form-input--inline" [(ngModel)]="item.quantity" [ngModelOptions]="{standalone: true}" min="0.01" step="0.01">
              </div>

              <div class="form-field">
                <label class="form-label">Precio unit.</label>
                <input type="number" class="form-input form-input--inline" [(ngModel)]="item.unit_price" [ngModelOptions]="{standalone: true}" min="0" step="0.01">
              </div>

              <div class="form-field">
                <label class="form-label">Desc. %</label>
                <input type="number" class="form-input form-input--inline" [(ngModel)]="item.discount_percentage" [ngModelOptions]="{standalone: true}" min="0" max="100" step="0.01">
              </div>

              <div class="form-field">
                <label class="form-label">IVA %</label>
                <input type="number" class="form-input form-input--inline" [(ngModel)]="item.iva_percentage" [ngModelOptions]="{standalone: true}" min="0" max="100">
              </div>

              <div class="form-field">
                <label class="form-label">IEPS %</label>
                <input type="number" class="form-input form-input--inline" [(ngModel)]="item.ieps_percentage" [ngModelOptions]="{standalone: true}" min="0" max="100">
              </div>
            </div>
          </div>
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
              <option *ngFor="let uom of selectedProductUoms" [value]="uom.id || uom.product_uom_id || uom.uom_id">
                {{ uom.name || uom.uom_name }}
              </option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">LISTA DE PRECIO</label>
            <select class="form-select" [(ngModel)]="selectedPricingOptionId" [ngModelOptions]="{ standalone: true }" (change)="onSelectedPricingOptionChange()">
              <option value="">Sugerido</option>
              <option *ngFor="let option of selectedModalPricingOptions" [value]="option.price_list_id || option.id">
                {{ option.price_list_name || 'Lista' }} ({{ option.price }})
              </option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">SKU</label>
            <input type="text" class="form-input" [value]="selectedProduct?.product_sku || selectedProduct?.sku || 'N/A'" readonly>
          </div>
          <div class="form-field">
            <label class="form-label">DISPONIBLE</label>
            <input type="number" class="form-input" [value]="getAvailableQty(selectedProduct)" readonly>
          </div>
          <div class="form-field">
            <label class="form-label">CANTIDAD *</label>
            <input type="number" class="form-input" [(ngModel)]="selectedQuantity" [ngModelOptions]="{ standalone: true }" min="0.01" step="0.01">
          </div>
          <div class="form-field">
            <label class="form-label">PRECIO UNITARIO</label>
            <input type="number" class="form-input" [(ngModel)]="selectedUnitPrice" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
          </div>
          <div class="form-field">
            <label class="form-label">DESCUENTO %</label>
            <input type="number" class="form-input" [value]="0" readonly>
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
`, styles: [`/* src/app/features/sales-orders/components/create-sales-order-modal/create-sales-order-modal.component.scss */
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
.form-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.btn-label-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  background: #eff6ff;
  color: #2563eb;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s,
    box-shadow 0.15s;
  flex-shrink: 0;
}
.btn-label-add i {
  font-size: 11px;
  line-height: 1;
}
.btn-label-add:hover {
  background: #dbeafe;
  border-color: #93c5fd;
  color: #1d4ed8;
  box-shadow: 0 1px 2px rgba(37, 99, 235, 0.15);
}
.btn-label-add:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
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
  width: 34%;
}
.line-items-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.line-item-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  background: #fff;
}
.line-item-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}
.line-item-card__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
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
::host ::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option {
  min-height: 40px;
}
::host ::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  line-height: 1.25;
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
@media (max-width: 768px) {
  .modal-container {
    max-width: 95vw;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .line-item-card__grid {
    grid-template-columns: 1fr 1fr;
  }
}
/*# sourceMappingURL=create-sales-order-modal.component.css.map */
`] }]
  }], () => [{ type: FormBuilder }, { type: SalesOrderService }, { type: FiscalConfigurationService }, { type: WarehouseService }, { type: CustomerService }, { type: MatDialog }, { type: ToastService }, { type: ChangeDetectorRef }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateSalesOrderModalComponent, { className: "CreateSalesOrderModalComponent", filePath: "src/app/features/sales-orders/components/create-sales-order-modal/create-sales-order-modal.component.ts", lineNumber: 37 });
})();

export {
  getCustomerDisplayName,
  SalesOrderDetailDialogComponent,
  CreateSalesOrderModalComponent
};
//# sourceMappingURL=chunk-HAFOKGZP.js.map
