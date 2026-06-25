import {
  PosPrinterSettingsDialogComponent,
  PosReceiptPreviewDialogComponent,
  PosReceiptPrintService
} from "./chunk-K7D45P4W.js";
import {
  SalesOrderService
} from "./chunk-W2GGHGOU.js";
import {
  RemoveTrailingZerosPipe
} from "./chunk-ZHDS4KUW.js";
import {
  TaxCalculatorService
} from "./chunk-Q6XV4LBU.js";
import {
  FiscalConfigurationModalComponent,
  ProductDetailModalComponent,
  WarehouseDetailModalComponent
} from "./chunk-WDAA42IK.js";
import {
  FiscalConfigurationService
} from "./chunk-CEL5SWQJ.js";
import {
  normalizePosSaleReceipt,
  posCollectionMethodLabel,
  posCollectionMoneyLabel,
  posCollectionUsdLabel
} from "./chunk-MHDUPFR7.js";
import {
  WarehouseService
} from "./chunk-MBXKGEVM.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-C44BBKV6.js";
import {
  ToastService
} from "./chunk-OP2NIPTP.js";
import {
  Router
} from "./chunk-524KR27D.js";
import {
  CommonModule,
  DatePipe,
  NgClass
} from "./chunk-MNFUR22A.js";
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-CJAGDKD4.js";

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

// src/app/features/sales-orders/utils/pos-user-display.util.ts
function formatPosUser(user) {
  if (!user) {
    return "\u2014";
  }
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  if (name && user.pos_user_code) {
    return `${name} (${user.pos_user_code})`;
  }
  return name || (user.pos_user_code ? String(user.pos_user_code) : "\u2014");
}

// src/app/features/sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id || $index;
var _forTrack1 = ($index, $item) => $item.id + "|" + ($item.uploaded_at || "") + "|" + ($item.document_name || "");
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
    \u0275\u0275elementStart(0, "button", 55);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToEditForm());
    });
    \u0275\u0275element(1, "i", 56);
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span", 30);
    \u0275\u0275text(2, "Cobr\xF3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.formatPosUserLabel(ctx_r2.order().collected_by_user));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "h3", 28);
    \u0275\u0275text(2, "INFORMACI\xD3N POS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 29)(4, "span", 30);
    \u0275\u0275text(5, "Vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 29)(9, "span", 30);
    \u0275\u0275text(10, "Terminal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 31);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Conditional_13_Template, 5, 1, "div", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.formatPosUserLabel(ctx_r2.order().seller_user));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatPosUserLabel(ctx_r2.order().terminal_user));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.order().payment_status === "Pagado" ? 13 : -1);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_8_Template(rf, ctx) {
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_9_Template(rf, ctx) {
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_10_Template(rf, ctx) {
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_11_Template(rf, ctx) {
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_12_Template(rf, ctx) {
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 30);
    \u0275\u0275text(2, "Cambio MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 58);
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 30);
    \u0275\u0275text(2, "Cambio USD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 58);
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "h3", 28);
    \u0275\u0275text(2, "COBRO POS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 29)(4, "span", 30);
    \u0275\u0275text(5, "M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_8_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(9, SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_9_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(10, SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_10_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(11, SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_11_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(12, SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_12_Template, 5, 1, "div", 29);
    \u0275\u0275conditionalCreate(13, SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_13_Template, 5, 1, "div", 57);
    \u0275\u0275conditionalCreate(14, SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Conditional_14_Template, 5, 1, "div", 57);
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "span", 41);
    \u0275\u0275text(2, "Descuento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.getDisplayedDiscount());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "span", 41);
    \u0275\u0275text(2, "Impuestos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.getDisplayedTaxes());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 61);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_For_16_Template_div_click_2_listener() {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(item_r6) && ctx_r2.openProductDetail(item_r6));
    })("keydown.enter", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_For_16_Template_div_keydown_enter_2_listener() {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(item_r6) && ctx_r2.openProductDetail(item_r6));
    })("keydown.space", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_For_16_Template_div_keydown_space_2_listener($event) {
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
    \u0275\u0275elementStart(11, "td")(12, "span", 62);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "removeTrailingZeros");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "span", 62);
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 63)(2, "div", 64);
    \u0275\u0275element(3, "i", 24);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "No hay l\xEDneas");
    \u0275\u0275elementEnd()()()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "table", 59)(2, "thead")(3, "tr")(4, "th");
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
    \u0275\u0275repeaterCreate(15, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_For_16_Template, 19, 19, "tr", 60, _forTrack0, false, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_ForEmpty_17_Template, 6, 0, "tr");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.lineItems());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 67);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 73);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 67);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 68);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.openTicketPreview());
    });
    \u0275\u0275element(1, "i", 71);
    \u0275\u0275text(2, " Ver ticket ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 72);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.reprintTicketRecibo());
    });
    \u0275\u0275conditionalCreate(4, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Conditional_4_Template, 1, 0, "i", 67)(5, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Conditional_5_Template, 1, 0, "i", 73);
    \u0275\u0275text(6, " Imprimir ticket ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 74);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.regenerateTicketRecibo());
    });
    \u0275\u0275conditionalCreate(8, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Conditional_8_Template, 1, 0, "i", 67)(9, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Conditional_9_Template, 1, 0, "i", 68);
    \u0275\u0275text(10, " Regenerar ticket ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.reprintingTicket() || ctx_r2.printingTicket());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.reprintingTicket() || ctx_r2.printingTicket() ? 4 : 5);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.regeneratingTicket());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.regeneratingTicket() ? 8 : 9);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 67);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 68);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.openTicketPreview());
    });
    \u0275\u0275element(1, "i", 71);
    \u0275\u0275elementEnd();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 75)(3, "span", 76);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275conditionalCreate(6, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Conditional_6_Template, 2, 1, "span", 77)(7, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Conditional_7_Template, 2, 0, "span", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "span", 79);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td")(12, "span", 80);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td")(15, "div", 81);
    \u0275\u0275conditionalCreate(16, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Conditional_16_Template, 2, 0, "button", 82);
    \u0275\u0275elementStart(17, "button", 83);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Template_button_click_17_listener() {
      const doc_r11 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.downloadDocument(doc_r11));
    });
    \u0275\u0275element(18, "i", 84);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const doc_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r2.getDocumentBadgeClass(doc_r11.document_type_name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", doc_r11.document_type_name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_15_0 = ctx_r2.getDocumentLanguageLabel(doc_r11.document_language)) ? 6 : 7, tmp_15_0);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(doc_r11.document_name || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatDocumentDate(doc_r11.uploaded_at));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.isTicketDocument(doc_r11) ? 16 : -1);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 69)(1, "thead")(2, "tr")(3, "th");
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
    \u0275\u0275repeaterCreate(14, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_For_15_Template, 19, 6, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.documents());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "i", 26);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay documentos adjuntos");
    \u0275\u0275elementEnd()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53)(1, "div", 65);
    \u0275\u0275conditionalCreate(2, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_2_Template, 11, 4);
    \u0275\u0275elementStart(3, "button", 66);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.regeneratePDF());
    });
    \u0275\u0275conditionalCreate(4, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_4_Template, 1, 0, "i", 67)(5, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_5_Template, 1, 0, "i", 68);
    \u0275\u0275text(6, " Regenerar PDF Original ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_7_Template, 16, 0, "table", 69)(8, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Conditional_8_Template, 4, 0, "div", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.canTicketReciboActions() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.regeneratingPDF());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.regeneratingPDF() ? 4 : 5);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.hasDocuments() ? 7 : 8);
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Conditional_28_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 93);
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
    const invoice_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r12.folio || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r12.uuid || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r12.issued_at ? \u0275\u0275pipeBind2(7, 5, invoice_r12.issued_at, "short") : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(invoice_r12.total));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(invoice_r12.status || "\u2014");
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 59)(1, "thead")(2, "tr")(3, "th");
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
    \u0275\u0275repeaterCreate(14, SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Conditional_28_For_15_Template, 12, 8, "tr", null, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.getInvoices());
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "i", 94);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Sin facturas emitidas para esta orden");
    \u0275\u0275elementEnd()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 86)(2, "h3", 87);
    \u0275\u0275text(3, "Datos fiscales de la orden");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 88)(5, "div", 89)(6, "span", 90);
    \u0275\u0275text(7, "Raz\xF3n social");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 91);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 89)(11, "span", 90);
    \u0275\u0275text(12, "RFC");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 91);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 89)(16, "span", 90);
    \u0275\u0275text(17, "Tipo de persona");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 91);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 89)(21, "span", 90);
    \u0275\u0275text(22, "R\xE9gimen fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 91);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(25, "div", 92)(26, "h3", 87);
    \u0275\u0275text(27, "CFDI / Facturas");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Conditional_28_Template, 16, 0, "table", 59)(29, SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Conditional_29_Template, 4, 0, "div", 64);
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
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 95);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_For_14_Template_div_click_2_listener() {
      const row_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(row_r14.item) && ctx_r2.openProductDetail(row_r14.item));
    })("keydown.enter", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_For_14_Template_div_keydown_enter_2_listener() {
      const row_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(row_r14.item) && ctx_r2.openProductDetail(row_r14.item));
    })("keydown.space", function SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_For_14_Template_div_keydown_space_2_listener($event) {
      const row_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r2.canOpenProduct(row_r14.item) && ctx_r2.openProductDetail(row_r14.item));
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
    const row_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("row-clickable", ctx_r2.canOpenProduct(row_r14.item));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("product-info--clickable", ctx_r2.canOpenProduct(row_r14.item));
    \u0275\u0275attribute("tabindex", ctx_r2.canOpenProduct(row_r14.item) ? 0 : null);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((row_r14.item.product == null ? null : row_r14.item.product.name) || row_r14.item.product_id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((row_r14.allocation == null ? null : row_r14.allocation.inventory_batch == null ? null : row_r14.allocation.inventory_batch.batch_number) || (row_r14.allocation == null ? null : row_r14.allocation.inventory_batch_id) || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, row_r14.allocation == null ? null : row_r14.allocation.quantity_allocated));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 11, row_r14.allocation == null ? null : row_r14.allocation.created_at, "short"));
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_ForEmpty_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 96)(2, "div", 64);
    \u0275\u0275element(3, "i", 97);
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Sin asignaciones de lotes");
    \u0275\u0275elementEnd()()()();
  }
}
function SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "table", 59)(2, "thead")(3, "tr")(4, "th");
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
    \u0275\u0275repeaterCreate(13, SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_For_14_Template, 13, 14, "tr", 60, _forTrack3, false, SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_ForEmpty_15_Template, 6, 0, "tr");
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
    \u0275\u0275conditionalCreate(60, SalesOrderDetailDialogComponent_Conditional_2_Conditional_60_Template, 14, 3, "div", 33);
    \u0275\u0275conditionalCreate(61, SalesOrderDetailDialogComponent_Conditional_2_Conditional_61_Template, 15, 8, "div", 34);
    \u0275\u0275elementStart(62, "div", 35)(63, "div", 36)(64, "h3", 28);
    \u0275\u0275text(65, "TOTALES");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 37)(67, "button", 38);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_67_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTotals(false));
    });
    \u0275\u0275text(68, " Solicitados ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "button", 38);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleTotals(true));
    });
    \u0275\u0275text(70, " Entregados ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(71, "div", 39)(72, "div", 40)(73, "span", 41);
    \u0275\u0275text(74, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "span", 42);
    \u0275\u0275text(76);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(77, SalesOrderDetailDialogComponent_Conditional_2_Conditional_77_Template, 5, 1, "div", 40);
    \u0275\u0275conditionalCreate(78, SalesOrderDetailDialogComponent_Conditional_2_Conditional_78_Template, 5, 1, "div", 40);
    \u0275\u0275element(79, "div", 43);
    \u0275\u0275elementStart(80, "div", 44)(81, "span", 45);
    \u0275\u0275text(82, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "span", 46);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(85, "div", 47)(86, "h3", 28);
    \u0275\u0275text(87, "NOTAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "p", 48);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(90, "div", 49)(91, "div", 50)(92, "button", 51);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_92_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(0));
    });
    \u0275\u0275text(93, "Productos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "button", 51);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_94_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(1));
    });
    \u0275\u0275text(95, "Documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(96, "button", 51);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_96_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(2));
    });
    \u0275\u0275text(97, "Lotes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "button", 51);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_2_Template_button_click_98_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.activeTabIndex.set(3));
    });
    \u0275\u0275text(99, "Facturaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(100, "div", 52);
    \u0275\u0275conditionalCreate(101, SalesOrderDetailDialogComponent_Conditional_2_Conditional_101_Template, 18, 1, "div", 53);
    \u0275\u0275conditionalCreate(102, SalesOrderDetailDialogComponent_Conditional_2_Conditional_102_Template, 9, 4, "div", 53);
    \u0275\u0275conditionalCreate(103, SalesOrderDetailDialogComponent_Conditional_2_Conditional_103_Template, 30, 5, "div", 54);
    \u0275\u0275conditionalCreate(104, SalesOrderDetailDialogComponent_Conditional_2_Conditional_104_Template, 16, 1, "div", 53);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_22_0;
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
    \u0275\u0275conditional(ctx_r2.isPosOrder() ? 60 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r2.posCollection()) ? 61 : -1, tmp_22_0);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", !ctx_r2.showDeliveredTotals());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.showDeliveredTotals());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.getDisplayedSubtotal());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.hasVisibleDiscount() ? 77 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.hasVisibleTaxes() ? 78 : -1);
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
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 0 ? 101 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 1 ? 102 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 3 ? 103 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.activeTabIndex() === 2 ? 104 : -1);
  }
}
function SalesOrderDetailDialogComponent_Conditional_3_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 67);
    \u0275\u0275text(1, " Regenerando... ");
  }
}
function SalesOrderDetailDialogComponent_Conditional_3_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 68);
    \u0275\u0275text(1, " Regenerar ");
  }
}
function SalesOrderDetailDialogComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 98);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275elementStart(1, "div", 99);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 100)(3, "h3");
    \u0275\u0275text(4, "Regenerar documento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 101);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275element(6, "i", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 102)(8, "p", 103);
    \u0275\u0275text(9, "\xBFEn qu\xE9 idioma desea generar el documento?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 104)(11, "label", 105)(12, "input", 106);
    \u0275\u0275listener("change", function SalesOrderDetailDialogComponent_Conditional_3_Template_input_change_12_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedRegenerateLanguage.set("es"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14, "Espa\xF1ol (es)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label", 105)(16, "input", 107);
    \u0275\u0275listener("change", function SalesOrderDetailDialogComponent_Conditional_3_Template_input_change_16_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectedRegenerateLanguage.set("en"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "English (en)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "label", 108)(20, "input", 109);
    \u0275\u0275listener("change", function SalesOrderDetailDialogComponent_Conditional_3_Template_input_change_20_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.keepPreviousDocument.set($event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Mantener documento anterior");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 110)(24, "button", 111);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeRegenerateLanguageModal());
    });
    \u0275\u0275text(25, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 112);
    \u0275\u0275listener("click", function SalesOrderDetailDialogComponent_Conditional_3_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r15);
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
  receiptPrintService;
  order = signal(null, ...ngDevMode ? [{ debugName: "order" }] : []);
  lineItems = signal([], ...ngDevMode ? [{ debugName: "lineItems" }] : []);
  documents = signal([], ...ngDevMode ? [{ debugName: "documents" }] : []);
  posCollection = signal(null, ...ngDevMode ? [{ debugName: "posCollection" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  activeTabIndex = signal(0, ...ngDevMode ? [{ debugName: "activeTabIndex" }] : []);
  showDeliveredTotals = signal(false, ...ngDevMode ? [{ debugName: "showDeliveredTotals" }] : []);
  regeneratingPDF = signal(false, ...ngDevMode ? [{ debugName: "regeneratingPDF" }] : []);
  reprintingTicket = signal(false, ...ngDevMode ? [{ debugName: "reprintingTicket" }] : []);
  regeneratingTicket = signal(false, ...ngDevMode ? [{ debugName: "regeneratingTicket" }] : []);
  printingTicket = signal(false, ...ngDevMode ? [{ debugName: "printingTicket" }] : []);
  showRegenerateLanguageModal = signal(false, ...ngDevMode ? [{ debugName: "showRegenerateLanguageModal" }] : []);
  selectedRegenerateLanguage = signal("es", ...ngDevMode ? [{ debugName: "selectedRegenerateLanguage" }] : []);
  keepPreviousDocument = signal(false, ...ngDevMode ? [{ debugName: "keepPreviousDocument" }] : []);
  canEditOrder = computed(() => this.order()?.general_status === "Creada", ...ngDevMode ? [{ debugName: "canEditOrder" }] : []);
  canTicketReciboActions = computed(() => !!this.posCollection(), ...ngDevMode ? [{ debugName: "canTicketReciboActions" }] : []);
  constructor(data, dialogRef, dialog, salesOrderService, warehouseService, fiscalConfigService, router, taxCalculator, toast, cdr, receiptPrintService) {
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
    this.receiptPrintService = receiptPrintService;
    this.loadOrder();
  }
  loadOrder(silent = false) {
    if (!silent) {
      this.loading.set(true);
    }
    this.salesOrderService.getOrderDetailById(this.data.orderId).subscribe({
      next: (payload) => {
        this.order.set(payload?.header || null);
        this.lineItems.set(payload?.line_items || payload?.header?.line_items || []);
        this.documents.set(payload?.documents || payload?.header?.documents || []);
        this.posCollection.set(payload?.pos_collection ?? payload?.header?.pos_collection ?? null);
        if (!silent) {
          this.loading.set(false);
        }
      },
      error: () => {
        if (!silent) {
          this.loading.set(false);
        }
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
  isPosOrder() {
    return this.order()?.sales_order_type === "POS";
  }
  formatPosUserLabel(user) {
    return formatPosUser(user);
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
  reprintTicketRecibo() {
    const orderId = this.order()?.id;
    if (!orderId || !this.canTicketReciboActions() || this.reprintingTicket()) {
      return;
    }
    this.reprintingTicket.set(true);
    this.salesOrderService.reprintTicketRecibo(orderId).subscribe({
      next: (response) => {
        this.reprintingTicket.set(false);
        this.cdr.detectChanges();
        this.toast.success(response?.message || "Ticket listo para imprimir");
        const folio = this.order()?.folio || orderId;
        void this.printTicketReceipt(response.receipt, folio);
      },
      error: (error) => {
        this.reprintingTicket.set(false);
        this.cdr.detectChanges();
        this.toast.error(error?.message || "No hay ticket guardado para reimprimir");
        console.error("Error reprinting ticket/recibo:", error);
      }
    });
  }
  regenerateTicketRecibo() {
    const orderId = this.order()?.id;
    if (!orderId || !this.canTicketReciboActions() || this.regeneratingTicket()) {
      return;
    }
    this.regeneratingTicket.set(true);
    this.salesOrderService.regenerateTicketRecibo(orderId).subscribe({
      next: (response) => {
        this.regeneratingTicket.set(false);
        void this.handleTicketReciboRegenerate(response, orderId);
      },
      error: (error) => {
        this.regeneratingTicket.set(false);
        this.cdr.detectChanges();
        this.toast.error(error?.message || "No se pudo regenerar el ticket / recibo");
        console.error("Error regenerating ticket/recibo:", error);
      }
    });
  }
  async handleTicketReciboRegenerate(response, orderId) {
    if (Array.isArray(response.documents)) {
      this.documents.set([...response.documents]);
    }
    this.cdr.detectChanges();
    this.toast.success(response?.message || "TICKET / RECIBO regenerado exitosamente");
    const folio = this.order()?.folio || orderId;
    await this.printTicketReceipt(response.receipt, folio);
    this.loadOrder(true);
  }
  async printTicketReceipt(receiptRaw, folio) {
    const receipt = normalizePosSaleReceipt(receiptRaw);
    if (!this.receiptPrintService.hasPrintableReceipt(receipt)) {
      this.toast.info("El ticket no incluye datos ESC/POS para imprimir.", { duration: 5e3 });
      return;
    }
    if (!this.receiptPrintService.getPrinterName()) {
      this.toast.warning("Configura la impresora t\xE9rmica antes de imprimir", { duration: 5e3 });
      this.dialog.open(PosPrinterSettingsDialogComponent, {
        width: "440px",
        maxWidth: "95vw",
        panelClass: "pos-dialog-panel",
        autoFocus: false
      });
      return;
    }
    this.printingTicket.set(true);
    try {
      await this.receiptPrintService.printReceipt(receipt);
      this.toast.success(`Ticket de ${folio} enviado a la impresora`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo imprimir el ticket";
      this.toast.error(message, { duration: 6e3 });
    } finally {
      this.printingTicket.set(false);
      this.cdr.detectChanges();
    }
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
      "TICKET / RECIBO": "badge-green",
      TICKET_RECIBO: "badge-green",
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
  isTicketDocument(doc) {
    const type = (doc.document_type_name || "").toUpperCase();
    return type.includes("TICKET") || type.includes("RECIBO");
  }
  openTicketPreview() {
    const order = this.order();
    const orderId = order?.id;
    if (!orderId || !this.canTicketReciboActions()) {
      return;
    }
    this.dialog.open(PosReceiptPreviewDialogComponent, {
      width: "480px",
      maxWidth: "95vw",
      panelClass: "pos-dialog-panel",
      autoFocus: false,
      data: {
        salesOrderId: orderId,
        useSalesOrderTicketApi: true,
        title: `Ticket ${order?.folio || orderId}`
      }
    });
  }
  static \u0275fac = function SalesOrderDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesOrderDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(SalesOrderService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(TaxCalculatorService), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(PosReceiptPrintService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SalesOrderDetailDialogComponent, selectors: [["app-sales-order-detail-dialog"]], hostAttrs: [1, "order-detail-dialog-container"], decls: 4, vars: 3, consts: [[1, "order-detail-dialog"], [1, "loading-container"], [1, "upload-modal-overlay"], [1, "text-gray-500"], [1, "dialog-header"], [1, "dialog-header-main"], [1, "order-type-badge", "order-type-badge--sale"], [1, "dialog-header__folio"], ["type", "button", 1, "edit-header-btn"], [1, "dialog-header-actions"], [1, "status-badge", 3, "ngClass"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], [1, "fi", "fi-rr-cross-small"], [1, "dialog-content"], [1, "sidebar"], [1, "info-cards-group"], ["role", "button", 1, "info-card", "info-card--blue", 3, "click", "keydown.enter", "keydown.space"], [1, "info-card__icon"], [1, "fi", "fi-rr-user"], [1, "info-card__content"], [1, "info-card__label"], [1, "info-card__value"], [1, "fi", "fi-rr-angle-right", "info-card__chevron"], ["role", "button", 1, "info-card", "info-card--yellow", 3, "click", "keydown.enter", "keydown.space"], [1, "fi", "fi-rr-box"], ["role", "button", 1, "info-card", "info-card--purple", 3, "click", "keydown.enter", "keydown.space"], [1, "fi", "fi-rr-document"], [1, "section-card"], [1, "section-title"], [1, "section-item"], [1, "section-label"], [1, "section-value"], [1, "payment-pill"], [1, "section-card", "section-card--pos-info"], [1, "section-card", "section-card--pos-pay"], [1, "section-card", "section-card--totals"], [1, "section-header"], [1, "toggle-container"], ["type", "button", 1, "toggle-btn", 3, "click"], [1, "totals-card"], [1, "totals-row"], [1, "totals-label"], [1, "totals-value"], [1, "totals-divider"], [1, "totals-row", "totals-row-total"], [1, "totals-label-total"], [1, "totals-value-total", 3, "ngClass"], [1, "section-card", "section-card--notes"], [1, "notes-text"], [1, "main-content"], [1, "tabs-header"], [1, "tab-button", 3, "click"], [1, "tabs-content"], [1, "tab-content-wrapper"], [1, "tab-content-wrapper", "billing-tab"], ["type", "button", 1, "edit-header-btn", 3, "click"], [1, "fi", "fi-rr-pencil"], [1, "section-item", "section-item--highlight"], [1, "section-value", "section-value--change"], [1, "products-table"], [3, "row-clickable"], ["role", "button", 1, "product-info", 3, "click", "keydown.enter", "keydown.space"], [1, "qty-pill"], ["colspan", "5", 1, "text-center"], [1, "empty-state"], [1, "tab-header"], [1, "btn-secondary", 3, "click", "disabled"], [1, "fi", "fi-rr-spinner", "animate-spin"], [1, "fi", "fi-rr-refresh"], [1, "documents-table"], ["type", "button", "title", "Vista previa del ticket guardado", 1, "btn-secondary", "btn-secondary--ticket", 3, "click"], [1, "fi", "fi-rr-eye"], ["type", "button", "title", "Reimprime el ticket existente en S3 (no regenera)", 1, "btn-secondary", 3, "click", "disabled"], [1, "fi", "fi-rr-print"], ["type", "button", "title", "[Admin] Borra el ticket anterior y genera uno nuevo", 1, "btn-secondary", "btn-secondary--ticket", 3, "click", "disabled"], [1, "document-type-cell"], [1, "document-badge", 3, "ngClass"], [1, "document-language-badge"], [1, "document-language-empty"], [1, "document-name"], [1, "document-date"], [1, "document-actions"], ["type", "button", "title", "Ver ticket", 1, "action-btn", "preview-btn"], ["title", "Descargar", 1, "action-btn", "download-btn", 3, "click"], [1, "fi", "fi-rr-download"], ["type", "button", "title", "Ver ticket", 1, "action-btn", "preview-btn", 3, "click"], [1, "billing-summary"], [1, "billing-section-title"], [1, "billing-grid"], [1, "billing-field"], [1, "billing-label"], [1, "billing-value"], [1, "billing-invoices"], [1, "uuid-cell"], [1, "fi", "fi-rr-receipt"], ["role", "button", 1, "product-info", "product-info--inline", 3, "click", "keydown.enter", "keydown.space"], ["colspan", "4", 1, "text-center"], [1, "fi", "fi-rr-layers"], [1, "upload-modal-overlay", 3, "click"], [1, "regenerate-modal", 3, "click"], [1, "regenerate-modal__header"], ["type", "button", 1, "regenerate-modal__close", 3, "click", "disabled"], [1, "regenerate-modal__body"], [1, "regenerate-language-prompt"], [1, "language-options"], [1, "language-option"], ["type", "radio", "name", "regenerateLanguage", "value", "es", 3, "change", "checked", "disabled"], ["type", "radio", "name", "regenerateLanguage", "value", "en", 3, "change", "checked", "disabled"], [1, "regenerate-keep-previous"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "regenerate-modal__footer"], ["type", "button", 1, "regenerate-modal__btn", "regenerate-modal__btn--cancel", 3, "click", "disabled"], ["type", "button", 1, "regenerate-modal__btn", "regenerate-modal__btn--confirm", 3, "click"]], template: function SalesOrderDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, SalesOrderDetailDialogComponent_Conditional_1_Template, 3, 0, "div", 1);
      \u0275\u0275conditionalCreate(2, SalesOrderDetailDialogComponent_Conditional_2_Template, 105, 48);
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
  }, dependencies: [CommonModule, NgClass, MatDialogModule, DatePipe, RemoveTrailingZerosPipe], styles: ["\n\n.sidebar[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  padding: 0.75rem;\n  overflow-y: auto;\n  border-right: 1px solid #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.info-cards-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  padding: 0.625rem 0.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid transparent;\n}\n.info-card--blue[_ngcontent-%COMP%] {\n  background: #eff6ff;\n  border-color: #dbeafe;\n}\n.info-card--blue[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--green[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  border-color: #bbf7d0;\n}\n.info-card--green[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #bbf7d0;\n  color: #16a34a;\n}\n.info-card--yellow[_ngcontent-%COMP%] {\n  background: #fefce8;\n  border-color: #fef08a;\n}\n.info-card--yellow[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #fde68a;\n  color: #d97706;\n}\n.info-card--purple[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n  border-color: #e9d5ff;\n}\n.info-card--purple[_ngcontent-%COMP%]   .info-card__icon[_ngcontent-%COMP%] {\n  background: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: box-shadow 0.15s, transform 0.15s;\n}\n.info-card--clickable[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);\n}\n.info-card__chevron[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: #94a3b8;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n}\n.info-card__icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n}\n.info-card__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n  flex: 1;\n}\n.info-card__label[_ngcontent-%COMP%] {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #94a3b8;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.info-card__value[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.25;\n  word-break: break-word;\n}\n.section-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.75rem;\n}\n.section-card--notes[_ngcontent-%COMP%]   .section-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.25rem;\n}\n.section-card[_ngcontent-%COMP%]   .notes-edit-btn[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 0.25rem;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.section-card[_ngcontent-%COMP%]   .notes-edit-btn[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n  color: #334155;\n}\n.section-card--totals[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.section-card--notes[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin-bottom: 0.375rem;\n}\n.section-card[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #64748b;\n  letter-spacing: 0.08em;\n  margin: 0 0 0.375rem;\n  text-transform: uppercase;\n}\n.section-card--totals[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.section-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.75rem;\n  padding: 0.3rem 0;\n  border-bottom: 1px solid #f1f5f9;\n}\n.section-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.section-label[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 0.75rem;\n}\n.section-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n  text-align: right;\n  font-size: 0.75rem;\n}\n.payment-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.15rem 0.45rem;\n  border-radius: 9999px;\n  font-size: 0.625rem;\n  font-weight: 700;\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.payment-pill--paid[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.375rem;\n}\n.notes-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  color: #475569;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.toggle-container[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.125rem;\n  background: #f1f5f9;\n  padding: 0.125rem;\n  border-radius: 0.375rem;\n  border: 1px solid #e2e8f0;\n  flex-shrink: 0;\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn[_ngcontent-%COMP%] {\n  padding: 0.2rem 0.45rem;\n  border: 1px solid transparent;\n  background: transparent;\n  color: #64748b;\n  font-size: 0.5625rem;\n  font-weight: 700;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.toggle-container[_ngcontent-%COMP%]   .toggle-btn.active[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #2563eb;\n  border-color: #bfdbfe;\n}\n.totals-card[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.625rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.75rem;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-label[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: #e2e8f0;\n  margin: 0.1rem 0;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%]   .totals-label-total[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.totals-card[_ngcontent-%COMP%]   .totals-row-total[_ngcontent-%COMP%]   .totals-value-total[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 800;\n}\n.order-detail-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  max-height: 96dvh;\n  margin: 0 auto;\n  background: #f9fafb;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%], \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%], \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%] {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(15, 23, 42, 0.22) transparent;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-track, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background-color: rgba(15, 23, 42, 0.2);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(15, 23, 42, 0.32);\n}\n.order-detail-dialog[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%]::-webkit-scrollbar-corner, \n.order-detail-dialog[_ngcontent-%COMP%]   .tab-content-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-corner, \n.order-detail-dialog[_ngcontent-%COMP%]   .tabs-content[_ngcontent-%COMP%]::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.875rem;\n  min-height: 2.75rem;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  flex-shrink: 0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  flex-shrink: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-header__folio[_ngcontent-%COMP%], \n.dialog-header[_ngcontent-%COMP%]   h2.dialog-header__folio[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.0625rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: #0f172a;\n  line-height: 1.25;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 0.375rem;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n  flex-shrink: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #0f172a;\n}\n.order-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n  background: #dbeafe;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.edit-header-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.edit-header-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n}\n.edit-header-btn[_ngcontent-%COMP%]:hover {\n  background: #dbeafe;\n  border-color: #93c5fd;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  line-height: 1.2;\n  white-space: nowrap;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n@media (max-width: 991px) {\n  .dialog-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n}\n.dialog-content[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n  width: min(24rem, 32vw);\n  min-width: 20rem;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .dialog-content[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 0;\n    max-height: none;\n    border-right: none !important;\n    border-bottom: 1px solid #e5e7eb;\n  }\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.tabs-header[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .tabs-header[_ngcontent-%COMP%] {\n    padding: 0 0.75rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-button[_ngcontent-%COMP%] {\n    padding: 0.625rem 0.875rem;\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-content-wrapper[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .products-table[_ngcontent-%COMP%] {\n    display: block;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background: #f9fafb;\n  color: #9ca3af;\n}\n.qty-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 0.375rem;\n  background: #dbeafe;\n  color: #1d4ed8;\n  font-size: 0.75rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.qty-pill--muted[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.tabs-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1rem;\n}\n.tab-button[_ngcontent-%COMP%] {\n  padding: 0.625rem 1rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.tab-button[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.tab-button.active[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.tabs-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n}\n.tab-content-wrapper[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  height: 100%;\n  overflow-y: auto;\n}\n.products-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.products-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #1f2937;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--inline[_ngcontent-%COMP%] {\n  display: inline-flex;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1f2937;\n}\n.products-table[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border-radius: 6px;\n  padding: 0.25rem 0.35rem;\n  margin: -0.25rem -0.35rem;\n  transition: background-color 0.2s ease;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--clickable[_ngcontent-%COMP%]:hover   strong[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--clickable[_ngcontent-%COMP%]:hover {\n  background: #eff6ff;\n}\n.products-table[_ngcontent-%COMP%]   .product-info--clickable[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.products-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.row-clickable[_ngcontent-%COMP%]:hover   .product-info--clickable[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.billing-tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.billing-section-title[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #6b7280;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  margin: 0 0 0.75rem;\n}\n.billing-summary[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  padding: 1rem;\n}\n.billing-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem 1.25rem;\n}\n.billing-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.billing-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #9ca3af;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.billing-value[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #1f2937;\n}\n.billing-invoices[_ngcontent-%COMP%]   .uuid-cell[_ngcontent-%COMP%] {\n  font-family: ui-monospace, monospace;\n  font-size: 0.75rem;\n  color: #6b7280;\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 2.5rem;\n  color: #9ca3af;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.tab-header[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  border: none;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.tab-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary--ticket[_ngcontent-%COMP%] {\n  color: #065f46;\n  border-color: #a7f3d0;\n  background: #ecfdf5;\n}\n.tab-header[_ngcontent-%COMP%]   .btn-secondary--ticket[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #d1fae5;\n  border-color: #6ee7b7;\n}\n.documents-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.documents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.documents-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.documents-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  color: #1f2937;\n}\n.document-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.document-badge.badge-blue[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-badge.badge-green[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #166534;\n}\n.document-badge.badge-gray[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.document-type-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.document-language-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-width: 2rem;\n  padding: 0.2rem 0.45rem;\n  border-radius: 4px;\n  background: #f3f4f6;\n  color: #374151;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-align: center;\n}\n.document-language-empty[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.85rem;\n}\n.document-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #1f2937;\n  word-break: break-word;\n}\n.document-date[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.document-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 0.9rem;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.download-btn[_ngcontent-%COMP%] {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.download-btn[_ngcontent-%COMP%]:hover {\n  background: #bfdbfe;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.preview-btn[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #047857;\n}\n.document-actions[_ngcontent-%COMP%]   .action-btn.preview-btn[_ngcontent-%COMP%]:hover {\n  background: #d1fae5;\n}\n.upload-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(17, 24, 39, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  padding: 1rem;\n}\n.regenerate-language-prompt[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.regenerate-modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n}\n.regenerate-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.regenerate-modal__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.regenerate-modal__close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n}\n.regenerate-modal__close[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #111827;\n}\n.regenerate-modal__close[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__body[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem 0.25rem;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: border-color 0.2s, background 0.2s;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin: 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #1f2937;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option[_ngcontent-%COMP%]:hover:not(:has(input:disabled)) {\n  border-color: #93c5fd;\n  background: #f8fafc;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .language-option.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  background: #eff6ff;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin: 0.1rem 0 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n  cursor: pointer;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #374151;\n  line-height: 1.4;\n}\n.regenerate-modal__body[_ngcontent-%COMP%]   .regenerate-keep-previous[_ngcontent-%COMP%]:has(input:disabled) {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.regenerate-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem 1rem;\n}\n.regenerate-modal__btn[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45rem 0.85rem;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  line-height: 1.2;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #2563eb;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n}\n.regenerate-modal__btn--cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%] {\n  background: #22c55e;\n  color: #fff;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%]:hover:not(.is-loading) {\n  background: #16a34a;\n}\n.regenerate-modal__btn--confirm.is-loading[_ngcontent-%COMP%] {\n  cursor: wait;\n  pointer-events: none;\n}\n.regenerate-modal__btn--confirm[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n[_nghost-%COMP%]     .section-card--pos-pay {\n  border-color: #c7d2fe;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #fff 100%);\n}\n[_nghost-%COMP%]     .section-item--highlight .section-value--change {\n  color: #059669;\n  font-weight: 800;\n}\n/*# sourceMappingURL=sales-order-detail-dialog.component.css.map */"] });
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
        @if (isPosOrder()) {\r
          <div class="section-card section-card--pos-info">\r
            <h3 class="section-title">INFORMACI\xD3N POS</h3>\r
            <div class="section-item">\r
              <span class="section-label">Vendedor</span>\r
              <span class="section-value">{{ formatPosUserLabel(order()!.seller_user) }}</span>\r
            </div>\r
            <div class="section-item">\r
              <span class="section-label">Terminal</span>\r
              <span class="section-value">{{ formatPosUserLabel(order()!.terminal_user) }}</span>\r
            </div>\r
            @if (order()!.payment_status === 'Pagado') {\r
              <div class="section-item">\r
                <span class="section-label">Cobr\xF3</span>\r
                <span class="section-value">{{ formatPosUserLabel(order()!.collected_by_user) }}</span>\r
              </div>\r
            }\r
          </div>\r
        }\r
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
                @if (canTicketReciboActions()) {\r
                  <button\r
                    type="button"\r
                    class="btn-secondary btn-secondary--ticket"\r
                    (click)="openTicketPreview()"\r
                    title="Vista previa del ticket guardado">\r
                    <i class="fi fi-rr-eye"></i>\r
                    Ver ticket\r
                  </button>\r
                  <button\r
                    type="button"\r
                    class="btn-secondary"\r
                    (click)="reprintTicketRecibo()"\r
                    [disabled]="reprintingTicket() || printingTicket()"\r
                    title="Reimprime el ticket existente en S3 (no regenera)">\r
                    @if (reprintingTicket() || printingTicket()) {\r
                      <i class="fi fi-rr-spinner animate-spin"></i>\r
                    } @else {\r
                      <i class="fi fi-rr-print"></i>\r
                    }\r
                    Imprimir ticket\r
                  </button>\r
                  <button\r
                    type="button"\r
                    class="btn-secondary btn-secondary--ticket"\r
                    (click)="regenerateTicketRecibo()"\r
                    [disabled]="regeneratingTicket()"\r
                    title="[Admin] Borra el ticket anterior y genera uno nuevo">\r
                    @if (regeneratingTicket()) {\r
                      <i class="fi fi-rr-spinner animate-spin"></i>\r
                    } @else {\r
                      <i class="fi fi-rr-refresh"></i>\r
                    }\r
                    Regenerar ticket\r
                  </button>\r
                }\r
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
                    @for (doc of documents(); track doc.id + '|' + (doc.uploaded_at || '') + '|' + (doc.document_name || '')) {\r
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
                            @if (isTicketDocument(doc)) {\r
                              <button\r
                                class="action-btn preview-btn"\r
                                type="button"\r
                                (click)="openTicketPreview()"\r
                                title="Ver ticket">\r
                                <i class="fi fi-rr-eye"></i>\r
                              </button>\r
                            }\r
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
`, styles: ["/* src/app/features/sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component.scss */\n.sidebar {\n  background: #f1f5f9;\n  padding: 0.75rem;\n  overflow-y: auto;\n  border-right: 1px solid #e2e8f0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.info-cards-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.375rem;\n}\n.info-card {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  padding: 0.625rem 0.75rem;\n  border-radius: 0.5rem;\n  border: 1px solid transparent;\n}\n.info-card--blue {\n  background: #eff6ff;\n  border-color: #dbeafe;\n}\n.info-card--blue .info-card__icon {\n  background: #bfdbfe;\n  color: #2563eb;\n}\n.info-card--green {\n  background: #f0fdf4;\n  border-color: #bbf7d0;\n}\n.info-card--green .info-card__icon {\n  background: #bbf7d0;\n  color: #16a34a;\n}\n.info-card--yellow {\n  background: #fefce8;\n  border-color: #fef08a;\n}\n.info-card--yellow .info-card__icon {\n  background: #fde68a;\n  color: #d97706;\n}\n.info-card--purple {\n  background: #f5f3ff;\n  border-color: #e9d5ff;\n}\n.info-card--purple .info-card__icon {\n  background: #ddd6fe;\n  color: #7c3aed;\n}\n.info-card--clickable {\n  cursor: pointer;\n  transition: box-shadow 0.15s, transform 0.15s;\n}\n.info-card--clickable:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);\n}\n.info-card__chevron {\n  margin-left: auto;\n  color: #94a3b8;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n}\n.info-card__icon {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n}\n.info-card__content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n  flex: 1;\n}\n.info-card__label {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #94a3b8;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.info-card__value {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.25;\n  word-break: break-word;\n}\n.section-card {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  padding: 0.625rem 0.75rem;\n}\n.section-card--notes .section-card__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.25rem;\n}\n.section-card .notes-edit-btn {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 0.25rem;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.section-card .notes-edit-btn:hover {\n  background: #e2e8f0;\n  color: #334155;\n}\n.section-card--totals {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.section-card--notes .section-title {\n  margin-bottom: 0.375rem;\n}\n.section-card .section-title {\n  font-size: 0.5625rem;\n  font-weight: 700;\n  color: #64748b;\n  letter-spacing: 0.08em;\n  margin: 0 0 0.375rem;\n  text-transform: uppercase;\n}\n.section-card--totals .section-title {\n  margin: 0;\n}\n.section-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.75rem;\n  padding: 0.3rem 0;\n  border-bottom: 1px solid #f1f5f9;\n}\n.section-item:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.section-label {\n  color: #94a3b8;\n  font-size: 0.75rem;\n}\n.section-value {\n  font-weight: 600;\n  color: #0f172a;\n  text-align: right;\n  font-size: 0.75rem;\n}\n.payment-pill {\n  display: inline-flex;\n  padding: 0.15rem 0.45rem;\n  border-radius: 9999px;\n  font-size: 0.625rem;\n  font-weight: 700;\n  background: #fee2e2;\n  color: #b91c1c;\n  border: 1px solid #fecaca;\n}\n.payment-pill--paid {\n  background: #dcfce7;\n  color: #15803d;\n  border-color: #bbf7d0;\n}\n.section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.375rem;\n}\n.notes-text {\n  margin: 0;\n  font-size: 0.75rem;\n  color: #475569;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.toggle-container {\n  display: inline-flex;\n  gap: 0.125rem;\n  background: #f1f5f9;\n  padding: 0.125rem;\n  border-radius: 0.375rem;\n  border: 1px solid #e2e8f0;\n  flex-shrink: 0;\n}\n.toggle-container .toggle-btn {\n  padding: 0.2rem 0.45rem;\n  border: 1px solid transparent;\n  background: transparent;\n  color: #64748b;\n  font-size: 0.5625rem;\n  font-weight: 700;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.toggle-container .toggle-btn.active {\n  background: #fff;\n  color: #2563eb;\n  border-color: #bfdbfe;\n}\n.totals-card {\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.625rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.totals-card .totals-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.75rem;\n}\n.totals-card .totals-label {\n  color: #94a3b8;\n}\n.totals-card .totals-value {\n  font-weight: 600;\n  color: #0f172a;\n}\n.totals-card .totals-divider {\n  height: 1px;\n  background: #e2e8f0;\n  margin: 0.1rem 0;\n}\n.totals-card .totals-row-total .totals-label-total {\n  font-size: 0.8125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.totals-card .totals-row-total .totals-value-total {\n  font-size: 1rem;\n  font-weight: 800;\n}\n.order-detail-dialog {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  max-height: 96dvh;\n  margin: 0 auto;\n  background: #f9fafb;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.order-detail-dialog .sidebar,\n.order-detail-dialog .tab-content-wrapper,\n.order-detail-dialog .tabs-content {\n  scrollbar-width: thin;\n  scrollbar-color: rgba(15, 23, 42, 0.22) transparent;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar,\n.order-detail-dialog .tabs-content::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-track,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-track,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-track {\n  background: transparent;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-thumb,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-thumb,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-thumb {\n  background-color: rgba(15, 23, 42, 0.2);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-thumb:hover,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-thumb:hover,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-thumb:hover {\n  background-color: rgba(15, 23, 42, 0.32);\n}\n.order-detail-dialog .sidebar::-webkit-scrollbar-corner,\n.order-detail-dialog .tab-content-wrapper::-webkit-scrollbar-corner,\n.order-detail-dialog .tabs-content::-webkit-scrollbar-corner {\n  background: transparent;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.875rem;\n  min-height: 2.75rem;\n  background: #fff;\n  border-bottom: 1px solid #e2e8f0;\n  flex-shrink: 0;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.dialog-header .dialog-header-main {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.dialog-header .dialog-header-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.375rem;\n  flex-shrink: 0;\n}\n.dialog-header .dialog-header__folio,\n.dialog-header h2.dialog-header__folio {\n  margin: 0;\n  font-size: 1.0625rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: #0f172a;\n  line-height: 1.25;\n}\n.dialog-header .close-btn {\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #64748b;\n  cursor: pointer;\n  border-radius: 0.375rem;\n  transition:\n    background-color 0.2s,\n    border-color 0.2s,\n    color 0.2s;\n  flex-shrink: 0;\n}\n.dialog-header .close-btn:hover {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n  color: #0f172a;\n}\n.order-type-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  flex-shrink: 0;\n  background: #dbeafe;\n  color: #1d4ed8;\n  border: 1px solid #bfdbfe;\n}\n.edit-header-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.55rem;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  background: #eff6ff;\n  color: #2563eb;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background-color 0.2s, border-color 0.2s;\n}\n.edit-header-btn i {\n  font-size: 0.65rem;\n}\n.edit-header-btn:hover {\n  background: #dbeafe;\n  border-color: #93c5fd;\n}\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  line-height: 1.2;\n  white-space: nowrap;\n}\n.dialog-content {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n@media (max-width: 991px) {\n  .dialog-content {\n    flex-direction: column;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n}\n.dialog-content .sidebar {\n  width: min(24rem, 32vw);\n  min-width: 20rem;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .dialog-content .sidebar {\n    width: 100%;\n    min-width: 0;\n    max-height: none;\n    border-right: none !important;\n    border-bottom: 1px solid #e5e7eb;\n  }\n}\n.main-content {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.tabs-header {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  flex-shrink: 0;\n}\n@media (max-width: 991px) {\n  .tabs-header {\n    padding: 0 0.75rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-button {\n    padding: 0.625rem 0.875rem;\n    font-size: 0.8125rem;\n  }\n}\n@media (max-width: 991px) {\n  .tab-content-wrapper {\n    padding: 0.75rem;\n  }\n}\n@media (max-width: 767px) {\n  .products-table {\n    display: block;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n.loading-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  background: #f9fafb;\n  color: #9ca3af;\n}\n.qty-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 0.375rem;\n  background: #dbeafe;\n  color: #1d4ed8;\n  font-size: 0.75rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.qty-pill--muted {\n  background: #f1f5f9;\n  color: #64748b;\n}\n.tabs-header {\n  display: flex;\n  gap: 0;\n  background: white;\n  border-bottom: 1px solid #e5e7eb;\n  padding: 0 1rem;\n}\n.tab-button {\n  padding: 0.625rem 1rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  border-bottom: 2px solid transparent;\n  transition: all 0.2s;\n  white-space: nowrap;\n}\n.tab-button:hover {\n  color: #1f2937;\n}\n.tab-button.active {\n  color: #3b82f6;\n  border-bottom-color: #3b82f6;\n}\n.tabs-content {\n  flex: 1;\n  overflow: hidden;\n  background: white;\n}\n.tab-content-wrapper {\n  padding: 1.5rem;\n  height: 100%;\n  overflow-y: auto;\n}\n.products-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.products-table thead {\n  background: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.products-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.products-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.products-table tbody tr:hover {\n  background: #f9fafb;\n}\n.products-table tbody tr td {\n  padding: 1rem;\n  color: #1f2937;\n}\n.products-table .product-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.products-table .product-info--inline {\n  display: inline-flex;\n}\n.products-table .product-info strong {\n  font-weight: 500;\n  color: #1f2937;\n}\n.products-table .product-info small {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.products-table .product-info--clickable {\n  cursor: pointer;\n  border-radius: 6px;\n  padding: 0.25rem 0.35rem;\n  margin: -0.25rem -0.35rem;\n  transition: background-color 0.2s ease;\n}\n.products-table .product-info--clickable:hover strong {\n  color: #2563eb;\n}\n.products-table .product-info--clickable:hover {\n  background: #eff6ff;\n}\n.products-table .product-info--clickable:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.products-table tbody tr.row-clickable:hover .product-info--clickable strong {\n  color: #2563eb;\n}\n.billing-tab {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.billing-section-title {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #6b7280;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  margin: 0 0 0.75rem;\n}\n.billing-summary {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  padding: 1rem;\n}\n.billing-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem 1.25rem;\n}\n.billing-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.billing-label {\n  font-size: 0.7rem;\n  color: #9ca3af;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.billing-value {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #1f2937;\n}\n.billing-invoices .uuid-cell {\n  font-family: ui-monospace, monospace;\n  font-size: 0.75rem;\n  color: #6b7280;\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 2.5rem;\n  color: #9ca3af;\n}\n.empty-state i {\n  font-size: 2rem;\n}\n.empty-state p {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.tab-header {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  align-items: center;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.tab-header button {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  border: none;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n  white-space: nowrap;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);\n}\n.tab-header button i {\n  font-size: 0.8rem;\n}\n.tab-header button:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.tab-header .btn-secondary {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.tab-header .btn-secondary:hover:not(:disabled) {\n  background: #f8fafc;\n  border-color: #cbd5e1;\n}\n.tab-header .btn-secondary--ticket {\n  color: #065f46;\n  border-color: #a7f3d0;\n  background: #ecfdf5;\n}\n.tab-header .btn-secondary--ticket:hover:not(:disabled) {\n  background: #d1fae5;\n  border-color: #6ee7b7;\n}\n.documents-table {\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: 0.875rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.documents-table thead {\n  background: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.documents-table thead th {\n  padding: 0.75rem 1rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  letter-spacing: 0.05em;\n  text-align: left;\n}\n.documents-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.documents-table tbody tr:hover {\n  background: #f9fafb;\n}\n.documents-table tbody tr td {\n  padding: 1rem;\n  color: #1f2937;\n}\n.document-badge {\n  display: inline-block;\n  padding: 0.35rem 0.75rem;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.document-badge.badge-blue {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-badge.badge-green {\n  background: #dcfce7;\n  color: #166534;\n}\n.document-badge.badge-gray {\n  background: #f3f4f6;\n  color: #6b7280;\n}\n.document-type-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.document-language-badge {\n  display: inline-block;\n  min-width: 2rem;\n  padding: 0.2rem 0.45rem;\n  border-radius: 4px;\n  background: #f3f4f6;\n  color: #374151;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-align: center;\n}\n.document-language-empty {\n  color: #9ca3af;\n  font-size: 0.85rem;\n}\n.document-name {\n  font-size: 0.85rem;\n  color: #1f2937;\n  word-break: break-word;\n}\n.document-date {\n  font-size: 0.85rem;\n  color: #6b7280;\n}\n.document-actions {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.document-actions .action-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s;\n  font-size: 0.9rem;\n}\n.document-actions .action-btn.download-btn {\n  background: #dbeafe;\n  color: #1e40af;\n}\n.document-actions .action-btn.download-btn:hover {\n  background: #bfdbfe;\n}\n.document-actions .action-btn.preview-btn {\n  background: #ecfdf5;\n  color: #047857;\n}\n.document-actions .action-btn.preview-btn:hover {\n  background: #d1fae5;\n}\n.upload-modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(17, 24, 39, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  padding: 1rem;\n}\n.regenerate-language-prompt {\n  margin: 0 0 0.75rem;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.regenerate-modal {\n  width: 100%;\n  max-width: 400px;\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  overflow: hidden;\n}\n.regenerate-modal__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.regenerate-modal__header h3 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.regenerate-modal__close {\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n}\n.regenerate-modal__close:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #111827;\n}\n.regenerate-modal__close:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__body {\n  padding: 0.85rem 1rem 0.25rem;\n}\n.regenerate-modal__body .language-options {\n  display: flex;\n  gap: 0.5rem;\n}\n.regenerate-modal__body .language-option {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.5rem;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: border-color 0.2s, background 0.2s;\n}\n.regenerate-modal__body .language-option input {\n  margin: 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n}\n.regenerate-modal__body .language-option span {\n  font-size: 0.8rem;\n  color: #1f2937;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.regenerate-modal__body .language-option:hover:not(:has(input:disabled)) {\n  border-color: #93c5fd;\n  background: #f8fafc;\n}\n.regenerate-modal__body .language-option.selected {\n  border-color: #3b82f6;\n  background: #eff6ff;\n}\n.regenerate-modal__body .regenerate-keep-previous {\n  margin-top: 0.85rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.regenerate-modal__body .regenerate-keep-previous input {\n  margin: 0.1rem 0 0;\n  width: 14px;\n  height: 14px;\n  accent-color: #2563eb;\n  flex-shrink: 0;\n  cursor: pointer;\n}\n.regenerate-modal__body .regenerate-keep-previous span {\n  font-size: 0.8rem;\n  color: #374151;\n  line-height: 1.4;\n}\n.regenerate-modal__body .regenerate-keep-previous:has(input:disabled) {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.regenerate-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem 1rem;\n}\n.regenerate-modal__btn {\n  border: none;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45rem 0.85rem;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  line-height: 1.2;\n}\n.regenerate-modal__btn--cancel {\n  background: transparent;\n  color: #2563eb;\n}\n.regenerate-modal__btn--cancel:hover:not(:disabled) {\n  background: #f3f4f6;\n}\n.regenerate-modal__btn--cancel:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.regenerate-modal__btn--confirm {\n  background: #22c55e;\n  color: #fff;\n}\n.regenerate-modal__btn--confirm:hover:not(.is-loading) {\n  background: #16a34a;\n}\n.regenerate-modal__btn--confirm.is-loading {\n  cursor: wait;\n  pointer-events: none;\n}\n.regenerate-modal__btn--confirm i {\n  font-size: 0.75rem;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.animate-spin {\n  animation: spin 1s linear infinite;\n}\n:host ::ng-deep .section-card--pos-pay {\n  border-color: #c7d2fe;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #fff 100%);\n}\n:host ::ng-deep .section-item--highlight .section-value--change {\n  color: #059669;\n  font-weight: 800;\n}\n/*# sourceMappingURL=sales-order-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: MatDialog }, { type: SalesOrderService }, { type: WarehouseService }, { type: FiscalConfigurationService }, { type: Router }, { type: TaxCalculatorService }, { type: ToastService }, { type: ChangeDetectorRef }, { type: PosReceiptPrintService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SalesOrderDetailDialogComponent, { className: "SalesOrderDetailDialogComponent", filePath: "src/app/features/sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component.ts", lineNumber: 40 });
})();

export {
  formatPosUser,
  getCustomerDisplayName,
  SalesOrderDetailDialogComponent
};
//# sourceMappingURL=chunk-OCSBL5FO.js.map
