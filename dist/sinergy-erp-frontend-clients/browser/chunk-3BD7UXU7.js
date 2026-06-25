import {
  PosStateService
} from "./chunk-6GAVLWZN.js";
import {
  PosPrinterSettingsDialogComponent,
  PosReceiptPreviewDialogComponent,
  PosReceiptPrintService
} from "./chunk-K7D45P4W.js";
import "./chunk-W2GGHGOU.js";
import {
  ExchangeRateService
} from "./chunk-FH2NSOSF.js";
import {
  mapPosApiErrorMessage
} from "./chunk-B2KGUYHG.js";
import {
  POSService
} from "./chunk-MK3LIK2T.js";
import {
  collectedByLabel,
  collectedSaleCustomerLabel,
  collectedSaleFolio,
  collectedSaleSellerLabel,
  collectedSaleTotal,
  dailyShiftPartialCount,
  dailyShiftSalesTotal,
  formatPosMoney,
  paymentMethodLabel
} from "./chunk-MHDUPFR7.js";
import {
  CustomerService
} from "./chunk-RUHF6AC7.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-C44BBKV6.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-EF42XV6X.js";
import {
  ButtonComponent
} from "./chunk-ZZJV4WZP.js";
import "./chunk-M5WQFRJQ.js";
import {
  ToastService
} from "./chunk-OP2NIPTP.js";
import "./chunk-S7ZTNTNE.js";
import {
  ArrowRightLeft,
  Banknote,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  Layers,
  LucideAngularComponent,
  LucideAngularModule,
  Maximize2,
  Minimize2,
  Monitor,
  Package,
  Printer,
  Receipt,
  RefreshCw,
  Search,
  Store,
  User,
  Wallet
} from "./chunk-EBDBUXLH.js";
import {
  AuthService
} from "./chunk-7QZ6JYNG.js";
import {
  ActivatedRoute
} from "./chunk-524KR27D.js";
import {
  CommonModule,
  DecimalPipe
} from "./chunk-MNFUR22A.js";
import {
  Component,
  Inject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵariaProperty,
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
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-CJAGDKD4.js";

// src/app/features/pos/components/open-daily-shift-dialog/open-daily-shift-dialog.component.ts
var OpenDailyShiftDialogComponent = class _OpenDailyShiftDialogComponent {
  dialogRef;
  openingCashMxn = signal(1500, ...ngDevMode ? [{ debugName: "openingCashMxn" }] : []);
  openingCashUsd = signal(0, ...ngDevMode ? [{ debugName: "openingCashUsd" }] : []);
  notes = signal("", ...ngDevMode ? [{ debugName: "notes" }] : []);
  constructor(dialogRef) {
    this.dialogRef = dialogRef;
  }
  cancel() {
    this.dialogRef.close();
  }
  confirm() {
    const mxn = Number(this.openingCashMxn());
    const usd = Number(this.openingCashUsd());
    if (!Number.isFinite(mxn) || mxn < 0 || !Number.isFinite(usd) || usd < 0) {
      return;
    }
    this.dialogRef.close({
      opening_cash_mxn: mxn,
      opening_cash_usd: usd,
      notes: this.notes().trim() || void 0
    });
  }
  static \u0275fac = function OpenDailyShiftDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OpenDailyShiftDialogComponent)(\u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OpenDailyShiftDialogComponent, selectors: [["app-open-daily-shift-dialog"]], decls: 21, vars: 3, consts: [[1, "pos-dialog"], [1, "pos-dialog__title"], [1, "pos-dialog__subtitle"], [1, "pos-dialog__fields"], [1, "pos-dialog__field"], ["type", "number", "min", "0", "step", "0.01", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Apertura turno matutino", 3, "ngModelChange", "ngModel"], [1, "pos-dialog__actions"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Abrir corte", "custom_class", "btn_primary", 3, "clicked"]], template: function OpenDailyShiftDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Abrir corte del d\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Registra el efectivo inicial en caja (MXN y USD).");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "label", 4)(7, "span");
      \u0275\u0275text(8, "Efectivo inicial MXN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "input", 5);
      \u0275\u0275listener("ngModelChange", function OpenDailyShiftDialogComponent_Template_input_ngModelChange_9_listener($event) {
        return ctx.openingCashMxn.set(+$event || 0);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "label", 4)(11, "span");
      \u0275\u0275text(12, "Efectivo inicial USD");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 5);
      \u0275\u0275listener("ngModelChange", function OpenDailyShiftDialogComponent_Template_input_ngModelChange_13_listener($event) {
        return ctx.openingCashUsd.set(+$event || 0);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "label", 4)(15, "span");
      \u0275\u0275text(16, "Notas (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "input", 6);
      \u0275\u0275listener("ngModelChange", function OpenDailyShiftDialogComponent_Template_input_ngModelChange_17_listener($event) {
        return ctx.notes.set($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "div", 7)(19, "app-button", 8);
      \u0275\u0275listener("clicked", function OpenDailyShiftDialogComponent_Template_app_button_clicked_19_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "app-button", 9);
      \u0275\u0275listener("clicked", function OpenDailyShiftDialogComponent_Template_app_button_clicked_20_listener() {
        return ctx.confirm();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("ngModel", ctx.openingCashMxn());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.openingCashUsd());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.notes());
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, ButtonComponent], styles: ["\n\n.pos-dialog[_ngcontent-%COMP%] {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=open-daily-shift-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OpenDailyShiftDialogComponent, [{
    type: Component,
    args: [{ selector: "app-open-daily-shift-dialog", standalone: true, imports: [CommonModule, FormsModule, ButtonComponent], template: '<div class="pos-dialog">\r\n  <h2 class="pos-dialog__title">Abrir corte del d\xEDa</h2>\r\n  <p class="pos-dialog__subtitle">Registra el efectivo inicial en caja (MXN y USD).</p>\r\n\r\n  <div class="pos-dialog__fields">\r\n    <label class="pos-dialog__field">\r\n      <span>Efectivo inicial MXN</span>\r\n      <input type="number" min="0" step="0.01" [ngModel]="openingCashMxn()" (ngModelChange)="openingCashMxn.set(+$event || 0)" />\r\n    </label>\r\n    <label class="pos-dialog__field">\r\n      <span>Efectivo inicial USD</span>\r\n      <input type="number" min="0" step="0.01" [ngModel]="openingCashUsd()" (ngModelChange)="openingCashUsd.set(+$event || 0)" />\r\n    </label>\r\n    <label class="pos-dialog__field">\r\n      <span>Notas (opcional)</span>\r\n      <input type="text" [ngModel]="notes()" (ngModelChange)="notes.set($event)" placeholder="Apertura turno matutino" />\r\n    </label>\r\n  </div>\r\n\r\n  <div class="pos-dialog__actions">\r\n    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="cancel()"></app-button>\r\n    <app-button text="Abrir corte" custom_class="btn_primary" (clicked)="confirm()"></app-button>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/pos/components/open-daily-shift-dialog/open-daily-shift-dialog.component.scss */\n.pos-dialog {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field input {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=open-daily-shift-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OpenDailyShiftDialogComponent, { className: "OpenDailyShiftDialogComponent", filePath: "src/app/features/pos/components/open-daily-shift-dialog/open-daily-shift-dialog.component.ts", lineNumber: 20 });
})();

// src/app/features/pos/components/partial-shift-dialog/partial-shift-dialog.component.ts
function PartialShiftDialogComponent_Conditional_24_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 15);
    \u0275\u0275listener("keydown", function PartialShiftDialogComponent_Conditional_24_For_2_Template_div_keydown_3_listener($event) {
      const d_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDenomKeydown($event, "MXN", d_r2));
    });
    \u0275\u0275elementStart(4, "button", 16);
    \u0275\u0275listener("click", function PartialShiftDialogComponent_Conditional_24_For_2_Template_button_click_4_listener() {
      const d_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.adjustCount("MXN", d_r2, -1));
    });
    \u0275\u0275text(5, " \u2212 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 17);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 18);
    \u0275\u0275listener("click", function PartialShiftDialogComponent_Conditional_24_For_2_Template_button_click_8_listener() {
      const d_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.adjustCount("MXN", d_r2, 1));
    });
    \u0275\u0275text(9, " + ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("$", d_r2);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Billetes de " + d_r2 + " pesos")("aria-valuenow", ctx_r2.getCount("MXN", d_r2));
    \u0275\u0275advance();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("Quitar billete de ", d_r2, " pesos"));
    \u0275\u0275property("disabled", ctx_r2.getCount("MXN", d_r2) <= 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getCount("MXN", d_r2));
    \u0275\u0275advance();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("Agregar billete de ", d_r2, " pesos"));
  }
}
function PartialShiftDialogComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, PartialShiftDialogComponent_Conditional_24_For_2_Template, 10, 9, "div", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, "Total MXN: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.mxnDenoms);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatMxn(ctx_r2.totalMxn()));
  }
}
function PartialShiftDialogComponent_Conditional_25_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 15);
    \u0275\u0275listener("keydown", function PartialShiftDialogComponent_Conditional_25_For_2_Template_div_keydown_3_listener($event) {
      const d_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDenomKeydown($event, "USD", d_r5));
    });
    \u0275\u0275elementStart(4, "button", 16);
    \u0275\u0275listener("click", function PartialShiftDialogComponent_Conditional_25_For_2_Template_button_click_4_listener() {
      const d_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.adjustCount("USD", d_r5, -1));
    });
    \u0275\u0275text(5, " \u2212 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 17);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 18);
    \u0275\u0275listener("click", function PartialShiftDialogComponent_Conditional_25_For_2_Template_button_click_8_listener() {
      const d_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.adjustCount("USD", d_r5, 1));
    });
    \u0275\u0275text(9, " + ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const d_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("USD ", d_r5);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Billetes de " + d_r5 + " d\xF3lares")("aria-valuenow", ctx_r2.getCount("USD", d_r5));
    \u0275\u0275advance();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("Quitar billete de ", d_r5, " d\xF3lares"));
    \u0275\u0275property("disabled", ctx_r2.getCount("USD", d_r5) <= 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getCount("USD", d_r5));
    \u0275\u0275advance();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("Agregar billete de ", d_r5, " d\xF3lares"));
  }
}
function PartialShiftDialogComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275repeaterCreate(1, PartialShiftDialogComponent_Conditional_25_For_2_Template, 10, 9, "div", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, "Total USD: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.usdDenoms);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 1, ctx_r2.totalUsd(), "1.2-2"));
  }
}
var MXN_DENOMS = [1e3, 500, 200, 100, 50, 20];
var USD_DENOMS = [100, 50, 20, 10, 5, 1];
var PartialShiftDialogComponent = class _PartialShiftDialogComponent {
  data;
  dialogRef;
  activeTab = signal("MXN", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  notes = signal("", ...ngDevMode ? [{ debugName: "notes" }] : []);
  counts = signal({}, ...ngDevMode ? [{ debugName: "counts" }] : []);
  mxnDenoms = MXN_DENOMS;
  usdDenoms = USD_DENOMS;
  totalMxn = computed(() => this.sumCurrency("MXN", MXN_DENOMS), ...ngDevMode ? [{ debugName: "totalMxn" }] : []);
  totalUsd = computed(() => this.sumCurrency("USD", USD_DENOMS), ...ngDevMode ? [{ debugName: "totalUsd" }] : []);
  constructor(data, dialogRef) {
    this.data = data;
    this.dialogRef = dialogRef;
  }
  key(currency, denomination) {
    return `${currency}-${denomination}`;
  }
  getCount(currency, denomination) {
    return this.counts()[this.key(currency, denomination)] ?? 0;
  }
  setCount(currency, denomination, value) {
    const k = this.key(currency, denomination);
    this.counts.update((map) => __spreadProps(__spreadValues({}, map), { [k]: Math.max(0, Math.floor(value || 0)) }));
  }
  adjustCount(currency, denomination, delta) {
    this.setCount(currency, denomination, this.getCount(currency, denomination) + delta);
  }
  onDenomKeydown(event, currency, denomination) {
    if (event.key === "ArrowUp" || event.key === "ArrowRight" || event.key === "+" || event.key === "=") {
      event.preventDefault();
      this.adjustCount(currency, denomination, 1);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "-" || event.key === "_") {
      event.preventDefault();
      this.adjustCount(currency, denomination, -1);
    }
  }
  sumCurrency(currency, denoms) {
    return denoms.reduce((sum, d) => sum + d * this.getCount(currency, d), 0);
  }
  formatMxn(value) {
    return formatPosMoney(value);
  }
  cancel() {
    this.dialogRef.close();
  }
  confirm() {
    const denominations = [];
    for (const d of MXN_DENOMS) {
      const count = this.getCount("MXN", d);
      if (count > 0) {
        denominations.push({ currency: "MXN", denomination: d, bill_count: count });
      }
    }
    for (const d of USD_DENOMS) {
      const count = this.getCount("USD", d);
      if (count > 0) {
        denominations.push({ currency: "USD", denomination: d, bill_count: count });
      }
    }
    if (denominations.length === 0) {
      return;
    }
    this.dialogRef.close({
      denominations,
      notes: this.notes().trim() || void 0
    });
  }
  static \u0275fac = function PartialShiftDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartialShiftDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartialShiftDialogComponent, selectors: [["app-partial-shift-dialog"]], decls: 33, vars: 6, consts: [[1, "pos-dialog", "pos-dialog--wide"], [1, "pos-dialog__title"], [1, "pos-dialog__subtitle"], [1, "partial-tabs"], ["type", "button", 3, "click"], [1, "partial-hint"], [1, "pos-dialog__field"], ["type", "text", "placeholder", "Retiro mediod\xEDa", 3, "ngModelChange", "ngModel"], [1, "pos-dialog__actions"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Registrar parcial", "custom_class", "btn_primary", 3, "clicked"], [1, "denom-grid"], [1, "denom-row"], [1, "partial-total"], [1, "denom-row__label"], ["tabindex", "0", "role", "spinbutton", "aria-valuemin", "0", 1, "denom-stepper", 3, "keydown"], ["type", "button", "tabindex", "-1", 1, "denom-stepper__btn", 3, "click", "aria-label", "disabled"], ["aria-hidden", "true", 1, "denom-stepper__value"], ["type", "button", "tabindex", "-1", 1, "denom-stepper__btn", 3, "click", "aria-label"]], template: function PartialShiftDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Corte parcial");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Indica el desglose de billetes que retiras de caja.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "button", 4);
      \u0275\u0275listener("click", function PartialShiftDialogComponent_Template_button_click_6_listener() {
        return ctx.activeTab.set("MXN");
      });
      \u0275\u0275text(7, "Pesos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 4);
      \u0275\u0275listener("click", function PartialShiftDialogComponent_Template_button_click_8_listener() {
        return ctx.activeTab.set("USD");
      });
      \u0275\u0275text(9, "D\xF3lares");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "p", 5);
      \u0275\u0275text(11, "Toca ");
      \u0275\u0275elementStart(12, "strong");
      \u0275\u0275text(13, "+");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " / ");
      \u0275\u0275elementStart(15, "strong");
      \u0275\u0275text(16, "\u2212");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " o usa ");
      \u0275\u0275elementStart(18, "strong");
      \u0275\u0275text(19, "Tab");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20, " y flechas ");
      \u0275\u0275elementStart(21, "strong");
      \u0275\u0275text(22, "\u2191\u2193");
      \u0275\u0275elementEnd();
      \u0275\u0275text(23, " en cada billete.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, PartialShiftDialogComponent_Conditional_24_Template, 7, 1)(25, PartialShiftDialogComponent_Conditional_25_Template, 8, 4);
      \u0275\u0275elementStart(26, "label", 6)(27, "span");
      \u0275\u0275text(28, "Notas (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "input", 7);
      \u0275\u0275listener("ngModelChange", function PartialShiftDialogComponent_Template_input_ngModelChange_29_listener($event) {
        return ctx.notes.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 8)(31, "app-button", 9);
      \u0275\u0275listener("clicked", function PartialShiftDialogComponent_Template_app_button_clicked_31_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "app-button", 10);
      \u0275\u0275listener("clicked", function PartialShiftDialogComponent_Template_app_button_clicked_32_listener() {
        return ctx.confirm();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275classProp("partial-tabs__btn--active", ctx.activeTab() === "MXN");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("partial-tabs__btn--active", ctx.activeTab() === "USD");
      \u0275\u0275advance(16);
      \u0275\u0275conditional(ctx.activeTab() === "MXN" ? 24 : 25);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngModel", ctx.notes());
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ButtonComponent, DecimalPipe], styles: ["\n\n.pos-dialog[_ngcontent-%COMP%] {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n.pos-dialog--wide[_ngcontent-%COMP%] {\n  min-width: 380px;\n}\n.partial-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.partial-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 8px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.partial-tabs[_ngcontent-%COMP%]   button.partial-tabs__btn--active[_ngcontent-%COMP%] {\n  border-color: #6366f1;\n  background: #eef2ff;\n  color: #4338ca;\n}\n.partial-hint[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  padding: 0.45rem 0.6rem;\n  border-radius: 7px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  font-size: 0.72rem;\n  line-height: 1.4;\n  color: #64748b;\n}\n.partial-hint[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #334155;\n}\n.denom-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.denom-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 6px 8px;\n  border: 1px solid #f1f5f9;\n  border-radius: 8px;\n  background: #fff;\n}\n.denom-row__label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #334155;\n  white-space: nowrap;\n}\n.denom-stepper[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  overflow: hidden;\n  background: #fff;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.denom-stepper[_ngcontent-%COMP%]:focus-visible {\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.denom-stepper__btn[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  background: #f8fafc;\n  color: #475569;\n  font-size: 1.05rem;\n  font-weight: 700;\n  line-height: 1;\n  cursor: pointer;\n  transition: background 0.12s, color 0.12s;\n  flex-shrink: 0;\n}\n.denom-stepper__btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #eef2ff;\n  color: #4338ca;\n}\n.denom-stepper__btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.96);\n}\n.denom-stepper__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n.denom-stepper__value[_ngcontent-%COMP%] {\n  min-width: 2rem;\n  padding: 0 0.35rem;\n  text-align: center;\n  font-size: 0.9rem;\n  font-weight: 800;\n  color: #0f172a;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.partial-total[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 13px;\n  color: #374151;\n}\n.partial-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #111827;\n}\n@media (max-width: 480px) {\n  .denom-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=partial-shift-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PartialShiftDialogComponent, [{
    type: Component,
    args: [{ selector: "app-partial-shift-dialog", standalone: true, imports: [CommonModule, FormsModule, ButtonComponent], template: `<div class="pos-dialog pos-dialog--wide">\r
  <h2 class="pos-dialog__title">Corte parcial</h2>\r
  <p class="pos-dialog__subtitle">Indica el desglose de billetes que retiras de caja.</p>\r
\r
  <div class="partial-tabs">\r
    <button type="button" [class.partial-tabs__btn--active]="activeTab() === 'MXN'" (click)="activeTab.set('MXN')">Pesos</button>\r
    <button type="button" [class.partial-tabs__btn--active]="activeTab() === 'USD'" (click)="activeTab.set('USD')">D\xF3lares</button>\r
  </div>\r
\r
  <p class="partial-hint">Toca <strong>+</strong> / <strong>\u2212</strong> o usa <strong>Tab</strong> y flechas <strong>\u2191\u2193</strong> en cada billete.</p>\r
\r
  @if (activeTab() === 'MXN') {\r
    <div class="denom-grid">\r
      @for (d of mxnDenoms; track d) {\r
        <div class="denom-row">\r
          <span class="denom-row__label">\${{ d }}</span>\r
          <div\r
            class="denom-stepper"\r
            tabindex="0"\r
            role="spinbutton"\r
            [attr.aria-label]="'Billetes de ' + d + ' pesos'"\r
            [attr.aria-valuenow]="getCount('MXN', d)"\r
            aria-valuemin="0"\r
            (keydown)="onDenomKeydown($event, 'MXN', d)">\r
            <button\r
              type="button"\r
              class="denom-stepper__btn"\r
              tabindex="-1"\r
              aria-label="Quitar billete de {{ d }} pesos"\r
              [disabled]="getCount('MXN', d) <= 0"\r
              (click)="adjustCount('MXN', d, -1)">\r
              \u2212\r
            </button>\r
            <span class="denom-stepper__value" aria-hidden="true">{{ getCount('MXN', d) }}</span>\r
            <button\r
              type="button"\r
              class="denom-stepper__btn"\r
              tabindex="-1"\r
              aria-label="Agregar billete de {{ d }} pesos"\r
              (click)="adjustCount('MXN', d, 1)">\r
              +\r
            </button>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
    <p class="partial-total">Total MXN: <strong>{{ formatMxn(totalMxn()) }}</strong></p>\r
  } @else {\r
    <div class="denom-grid">\r
      @for (d of usdDenoms; track d) {\r
        <div class="denom-row">\r
          <span class="denom-row__label">USD {{ d }}</span>\r
          <div\r
            class="denom-stepper"\r
            tabindex="0"\r
            role="spinbutton"\r
            [attr.aria-label]="'Billetes de ' + d + ' d\xF3lares'"\r
            [attr.aria-valuenow]="getCount('USD', d)"\r
            aria-valuemin="0"\r
            (keydown)="onDenomKeydown($event, 'USD', d)">\r
            <button\r
              type="button"\r
              class="denom-stepper__btn"\r
              tabindex="-1"\r
              aria-label="Quitar billete de {{ d }} d\xF3lares"\r
              [disabled]="getCount('USD', d) <= 0"\r
              (click)="adjustCount('USD', d, -1)">\r
              \u2212\r
            </button>\r
            <span class="denom-stepper__value" aria-hidden="true">{{ getCount('USD', d) }}</span>\r
            <button\r
              type="button"\r
              class="denom-stepper__btn"\r
              tabindex="-1"\r
              aria-label="Agregar billete de {{ d }} d\xF3lares"\r
              (click)="adjustCount('USD', d, 1)">\r
              +\r
            </button>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
    <p class="partial-total">Total USD: <strong>{{ totalUsd() | number:'1.2-2' }}</strong></p>\r
  }\r
\r
  <label class="pos-dialog__field">\r
    <span>Notas (opcional)</span>\r
    <input type="text" [ngModel]="notes()" (ngModelChange)="notes.set($event)" placeholder="Retiro mediod\xEDa" />\r
  </label>\r
\r
  <div class="pos-dialog__actions">\r
    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="cancel()"></app-button>\r
    <app-button text="Registrar parcial" custom_class="btn_primary" (clicked)="confirm()"></app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/pos/components/partial-shift-dialog/partial-shift-dialog.component.scss */\n.pos-dialog {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field input {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n.pos-dialog--wide {\n  min-width: 380px;\n}\n.partial-tabs {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.partial-tabs button {\n  flex: 1;\n  padding: 8px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n  font-weight: 600;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.partial-tabs button.partial-tabs__btn--active {\n  border-color: #6366f1;\n  background: #eef2ff;\n  color: #4338ca;\n}\n.partial-hint {\n  margin: 0 0 10px;\n  padding: 0.45rem 0.6rem;\n  border-radius: 7px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  font-size: 0.72rem;\n  line-height: 1.4;\n  color: #64748b;\n}\n.partial-hint strong {\n  color: #334155;\n}\n.denom-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.denom-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 6px 8px;\n  border: 1px solid #f1f5f9;\n  border-radius: 8px;\n  background: #fff;\n}\n.denom-row__label {\n  font-size: 13px;\n  font-weight: 700;\n  color: #334155;\n  white-space: nowrap;\n}\n.denom-stepper {\n  display: inline-flex;\n  align-items: center;\n  gap: 0;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  overflow: hidden;\n  background: #fff;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.denom-stepper:focus-visible {\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.denom-stepper__btn {\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  background: #f8fafc;\n  color: #475569;\n  font-size: 1.05rem;\n  font-weight: 700;\n  line-height: 1;\n  cursor: pointer;\n  transition: background 0.12s, color 0.12s;\n  flex-shrink: 0;\n}\n.denom-stepper__btn:hover:not(:disabled) {\n  background: #eef2ff;\n  color: #4338ca;\n}\n.denom-stepper__btn:active:not(:disabled) {\n  transform: scale(0.96);\n}\n.denom-stepper__btn:disabled {\n  opacity: 0.35;\n  cursor: not-allowed;\n}\n.denom-stepper__value {\n  min-width: 2rem;\n  padding: 0 0.35rem;\n  text-align: center;\n  font-size: 0.9rem;\n  font-weight: 800;\n  color: #0f172a;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.partial-total {\n  margin: 0 0 12px;\n  font-size: 13px;\n  color: #374151;\n}\n.partial-total strong {\n  color: #111827;\n}\n@media (max-width: 480px) {\n  .denom-grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=partial-shift-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartialShiftDialogComponent, { className: "PartialShiftDialogComponent", filePath: "src/app/features/pos/components/partial-shift-dialog/partial-shift-dialog.component.ts", lineNumber: 27 });
})();

// src/app/features/pos/components/close-daily-shift-dialog/close-daily-shift-dialog.component.ts
var CloseDailyShiftDialogComponent = class _CloseDailyShiftDialogComponent {
  dialogRef;
  notes = signal("", ...ngDevMode ? [{ debugName: "notes" }] : []);
  constructor(dialogRef) {
    this.dialogRef = dialogRef;
  }
  cancel() {
    this.dialogRef.close();
  }
  confirm() {
    this.dialogRef.close({ notes: this.notes().trim() || void 0 });
  }
  static \u0275fac = function CloseDailyShiftDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CloseDailyShiftDialogComponent)(\u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CloseDailyShiftDialogComponent, selectors: [["app-close-daily-shift-dialog"]], decls: 12, vars: 1, consts: [[1, "pos-dialog"], [1, "pos-dialog__title"], [1, "pos-dialog__subtitle"], [1, "pos-dialog__field"], ["type", "text", "placeholder", "Cierre turno", 3, "ngModelChange", "ngModel"], [1, "pos-dialog__actions"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Cerrar corte", "custom_class", "btn_primary", 3, "clicked"]], template: function CloseDailyShiftDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "Cerrar corte del d\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Confirma el cierre del corte global. Despu\xE9s podr\xE1s editar tipo y sucursal del usuario cobranza.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "label", 3)(6, "span");
      \u0275\u0275text(7, "Notas (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275listener("ngModelChange", function CloseDailyShiftDialogComponent_Template_input_ngModelChange_8_listener($event) {
        return ctx.notes.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 5)(10, "app-button", 6);
      \u0275\u0275listener("clicked", function CloseDailyShiftDialogComponent_Template_app_button_clicked_10_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "app-button", 7);
      \u0275\u0275listener("clicked", function CloseDailyShiftDialogComponent_Template_app_button_clicked_11_listener() {
        return ctx.confirm();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("ngModel", ctx.notes());
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, ButtonComponent], styles: ["\n\n.pos-dialog[_ngcontent-%COMP%] {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=close-daily-shift-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CloseDailyShiftDialogComponent, [{
    type: Component,
    args: [{ selector: "app-close-daily-shift-dialog", standalone: true, imports: [CommonModule, FormsModule, ButtonComponent], template: '<div class="pos-dialog">\r\n  <h2 class="pos-dialog__title">Cerrar corte del d\xEDa</h2>\r\n  <p class="pos-dialog__subtitle">Confirma el cierre del corte global. Despu\xE9s podr\xE1s editar tipo y sucursal del usuario cobranza.</p>\r\n\r\n  <label class="pos-dialog__field">\r\n    <span>Notas (opcional)</span>\r\n    <input type="text" [ngModel]="notes()" (ngModelChange)="notes.set($event)" placeholder="Cierre turno" />\r\n  </label>\r\n\r\n  <div class="pos-dialog__actions">\r\n    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="cancel()"></app-button>\r\n    <app-button text="Cerrar corte" custom_class="btn_primary" (clicked)="confirm()"></app-button>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/pos/components/close-daily-shift-dialog/close-daily-shift-dialog.component.scss */\n.pos-dialog {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field input {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=close-daily-shift-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CloseDailyShiftDialogComponent, { className: "CloseDailyShiftDialogComponent", filePath: "src/app/features/pos/components/close-daily-shift-dialog/close-daily-shift-dialog.component.ts", lineNumber: 14 });
})();

// src/app/features/pos/components/pos-customer-picker-dialog/pos-customer-picker-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PosCustomerPickerDialogComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275element(1, "lucide-icon", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r0.Check);
  }
}
function PosCustomerPickerDialogComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "Cargando clientes\u2026");
    \u0275\u0275elementEnd();
  }
}
function PosCustomerPickerDialogComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, "No hay clientes que coincidan con la b\xFAsqueda");
    \u0275\u0275elementEnd();
  }
}
function PosCustomerPickerDialogComponent_Conditional_27_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const customer_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(customer_r3.email);
  }
}
function PosCustomerPickerDialogComponent_Conditional_27_For_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 27);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("img", ctx_r0.Check);
  }
}
function PosCustomerPickerDialogComponent_Conditional_27_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function PosCustomerPickerDialogComponent_Conditional_27_For_1_Template_button_click_0_listener() {
      const customer_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectCustomer(ctx_r0.String(customer_r3.id)));
    });
    \u0275\u0275elementStart(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24)(4, "span", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, PosCustomerPickerDialogComponent_Conditional_27_For_1_Conditional_6_Template, 2, 1, "span", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, PosCustomerPickerDialogComponent_Conditional_27_For_1_Conditional_7_Template, 1, 1, "lucide-icon", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const customer_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("customer-row--selected", ctx_r0.selectedCustomerId() === ctx_r0.String(customer_r3.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.customerInitials(customer_r3));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.customerDisplayName(customer_r3));
    \u0275\u0275advance();
    \u0275\u0275conditional(customer_r3.email ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.selectedCustomerId() === ctx_r0.String(customer_r3.id) ? 7 : -1);
  }
}
function PosCustomerPickerDialogComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PosCustomerPickerDialogComponent_Conditional_27_For_1_Template, 8, 6, "button", 21, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.filteredCustomers());
  }
}
var PosCustomerPickerDialogComponent = class _PosCustomerPickerDialogComponent {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  customerService = inject(CustomerService);
  Search = Search;
  Store = Store;
  Check = Check;
  String = String;
  customers = signal([], ...ngDevMode ? [{ debugName: "customers" }] : []);
  customerSearch = signal("", ...ngDevMode ? [{ debugName: "customerSearch" }] : []);
  loadingCustomers = signal(false, ...ngDevMode ? [{ debugName: "loadingCustomers" }] : []);
  selectedCustomerId = signal("", ...ngDevMode ? [{ debugName: "selectedCustomerId" }] : []);
  filteredCustomers = computed(() => {
    const term = this.customerSearch().trim().toLowerCase();
    const list = this.customers();
    if (!term) {
      return list;
    }
    return list.filter((c) => this.customerDisplayName(c).toLowerCase().includes(term));
  }, ...ngDevMode ? [{ debugName: "filteredCustomers" }] : []);
  ngOnInit() {
    this.selectedCustomerId.set(this.data.selectedCustomerId ?? "");
    this.loadCustomers();
  }
  loadCustomers(search = "") {
    this.loadingCustomers.set(true);
    const params = { limit: 100 };
    if (search.trim()) {
      params["search"] = search.trim();
    }
    this.customerService.getCustomers(params).subscribe({
      next: (customers) => {
        const list = Array.isArray(customers) ? customers : customers?.data || [];
        this.customers.set(list);
        this.loadingCustomers.set(false);
      },
      error: () => {
        this.customers.set([]);
        this.loadingCustomers.set(false);
      }
    });
  }
  onSearchChange(term) {
    this.customerSearch.set(term);
    if (term.trim().length >= 2) {
      this.loadCustomers(term);
    } else if (!term.trim()) {
      this.loadCustomers();
    }
  }
  selectCustomer(customerId) {
    const customer = this.customers().find((c) => String(c.id) === String(customerId));
    this.dialogRef.close({ customerId, customer });
  }
  clearCustomer() {
    this.dialogRef.close({ customerId: "" });
  }
  cancel() {
    this.dialogRef.close();
  }
  customerDisplayName(customer) {
    if (!customer) {
      return "";
    }
    const parts = [customer.name, customer.lastname].filter(Boolean).join(" ").trim();
    if (customer.company_name) {
      return parts ? `${parts} \xB7 ${customer.company_name}` : customer.company_name;
    }
    return parts || customer.email || "Cliente";
  }
  customerInitials(customer) {
    const name = this.customerDisplayName(customer);
    const words = name.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  static \u0275fac = function PosCustomerPickerDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosCustomerPickerDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosCustomerPickerDialogComponent, selectors: [["app-pos-customer-picker-dialog"]], decls: 28, vars: 7, consts: [[1, "modal-container"], [1, "modal-header"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "currentColor", "aria-hidden", "true"], ["d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"], [1, "modal-content"], ["for", "pos-customer-search", 1, "search-label"], [1, "search-field"], [1, "search-field__icon", 3, "img"], ["id", "pos-customer-search", "type", "search", "placeholder", "Nombre, empresa o correo\u2026", "autocomplete", "off", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "counter-sale", 3, "click"], [1, "counter-sale__icon-wrap"], [1, "counter-sale__icon", 3, "img"], [1, "counter-sale__text"], [1, "counter-sale__title"], [1, "counter-sale__subtitle"], ["aria-hidden", "true", 1, "counter-sale__check"], [1, "list-label"], [1, "customer-list"], [1, "customer-list__empty"], [1, "counter-sale__check-icon", 3, "img"], ["type", "button", 1, "customer-row", 3, "customer-row--selected"], ["type", "button", 1, "customer-row", 3, "click"], [1, "customer-row__avatar"], [1, "customer-row__info"], [1, "customer-row__name"], [1, "customer-row__email"], [1, "customer-row__check", 3, "img"]], template: function PosCustomerPickerDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Elegir cliente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function PosCustomerPickerDialogComponent_Template_button_click_4_listener() {
        return ctx.cancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 3);
      \u0275\u0275element(6, "path", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 5)(8, "label", 6);
      \u0275\u0275text(9, "Buscar cliente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275element(11, "lucide-icon", 8);
      \u0275\u0275elementStart(12, "input", 9);
      \u0275\u0275listener("ngModelChange", function PosCustomerPickerDialogComponent_Template_input_ngModelChange_12_listener($event) {
        return ctx.onSearchChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "button", 10);
      \u0275\u0275listener("click", function PosCustomerPickerDialogComponent_Template_button_click_13_listener() {
        return ctx.clearCustomer();
      });
      \u0275\u0275elementStart(14, "span", 11);
      \u0275\u0275element(15, "lucide-icon", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 13)(17, "span", 14);
      \u0275\u0275text(18, "Venta mostrador");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "span", 15);
      \u0275\u0275text(20, "Sin asignar cliente");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(21, PosCustomerPickerDialogComponent_Conditional_21_Template, 2, 1, "span", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p", 17);
      \u0275\u0275text(23, "Clientes registrados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 18);
      \u0275\u0275conditionalCreate(25, PosCustomerPickerDialogComponent_Conditional_25_Template, 2, 0, "p", 19)(26, PosCustomerPickerDialogComponent_Conditional_26_Template, 2, 0, "p", 19)(27, PosCustomerPickerDialogComponent_Conditional_27_Template, 2, 0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("img", ctx.Search);
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.customerSearch());
      \u0275\u0275advance();
      \u0275\u0275classProp("counter-sale--selected", !ctx.selectedCustomerId());
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.Store);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(!ctx.selectedCustomerId() ? 21 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loadingCustomers() ? 25 : ctx.filteredCustomers().length === 0 ? 26 : 27);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 520px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 20px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n  letter-spacing: -0.01em;\n}\n.close-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: background 0.15s, color 0.15s;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.modal-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  padding: 18px 20px 20px;\n}\n.search-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #9ca3af;\n  margin: 0 0 6px;\n}\n.search-field[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0 12px;\n  height: 42px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #fff;\n  margin-bottom: 16px;\n  flex-shrink: 0;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.search-field[_ngcontent-%COMP%]:focus-within {\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);\n}\n.search-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  font-size: 14px;\n  color: #111827;\n}\n.search-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.search-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.search-field__icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  color: #9ca3af;\n  display: inline-flex !important;\n  flex-shrink: 0;\n}\n.counter-sale[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  margin-bottom: 18px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #fafafa;\n  cursor: pointer;\n  text-align: left;\n  flex-shrink: 0;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    box-shadow 0.15s;\n}\n.counter-sale[_ngcontent-%COMP%]:hover {\n  border-color: #d1d5db;\n  background: #f3f4f6;\n}\n.counter-sale--selected[_ngcontent-%COMP%] {\n  border-color: #c7d2fe;\n  background: #fff;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.counter-sale__icon-wrap[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: #e5e7eb;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.counter-sale--selected[_ngcontent-%COMP%]   .counter-sale__icon-wrap[_ngcontent-%COMP%] {\n  background: #eef2ff;\n  color: #4f46e5;\n}\n.counter-sale__icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  color: #6b7280;\n  display: inline-flex !important;\n}\n.counter-sale--selected[_ngcontent-%COMP%]   .counter-sale__icon[_ngcontent-%COMP%] {\n  color: #4f46e5;\n}\n.counter-sale__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n  flex: 1;\n}\n.counter-sale__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n}\n.counter-sale__subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n}\n.counter-sale__check[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #4f46e5;\n  display: inline-flex;\n}\n.counter-sale__check-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  display: inline-flex !important;\n}\n.list-label[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #9ca3af;\n  flex-shrink: 0;\n}\n.customer-list[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 200px;\n  max-height: min(48vh, 380px);\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 0 -4px;\n  padding: 0 4px 2px;\n}\n.customer-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.customer-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 999px;\n}\n.customer-row[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  border: none;\n  border-radius: 8px;\n  background: transparent;\n  cursor: pointer;\n  text-align: left;\n  transition: background 0.12s;\n}\n.customer-row[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.customer-row--selected[_ngcontent-%COMP%] {\n  background: #f5f3ff;\n}\n.customer-row__avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.customer-row__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n  flex: 1;\n}\n.customer-row__name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.customer-row__email[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.customer-row__check[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  color: #4f46e5;\n  flex-shrink: 0;\n  display: inline-flex !important;\n}\n.customer-list__empty[_ngcontent-%COMP%] {\n  margin: 2rem 0;\n  font-size: 14px;\n  color: #9ca3af;\n  text-align: center;\n  line-height: 1.5;\n}\n/*# sourceMappingURL=pos-customer-picker-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosCustomerPickerDialogComponent, [{
    type: Component,
    args: [{ selector: "app-pos-customer-picker-dialog", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], template: '<div class="modal-container">\r\n  <div class="modal-header">\r\n    <h2>Elegir cliente</h2>\r\n    <button class="close-btn" type="button" (click)="cancel()" aria-label="Cerrar">\r\n      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">\r\n        <path\r\n          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />\r\n      </svg>\r\n    </button>\r\n  </div>\r\n\r\n  <div class="modal-content">\r\n    <label class="search-label" for="pos-customer-search">Buscar cliente</label>\r\n    <div class="search-field">\r\n      <lucide-icon [img]="Search" class="search-field__icon" />\r\n      <input\r\n        id="pos-customer-search"\r\n        type="search"\r\n        placeholder="Nombre, empresa o correo\u2026"\r\n        [ngModel]="customerSearch()"\r\n        (ngModelChange)="onSearchChange($event)"\r\n        autocomplete="off" />\r\n    </div>\r\n\r\n    <button\r\n      type="button"\r\n      class="counter-sale"\r\n      [class.counter-sale--selected]="!selectedCustomerId()"\r\n      (click)="clearCustomer()">\r\n      <span class="counter-sale__icon-wrap">\r\n        <lucide-icon [img]="Store" class="counter-sale__icon" />\r\n      </span>\r\n      <span class="counter-sale__text">\r\n        <span class="counter-sale__title">Venta mostrador</span>\r\n        <span class="counter-sale__subtitle">Sin asignar cliente</span>\r\n      </span>\r\n      @if (!selectedCustomerId()) {\r\n        <span class="counter-sale__check" aria-hidden="true">\r\n          <lucide-icon [img]="Check" class="counter-sale__check-icon" />\r\n        </span>\r\n      }\r\n    </button>\r\n\r\n    <p class="list-label">Clientes registrados</p>\r\n\r\n    <div class="customer-list">\r\n      @if (loadingCustomers()) {\r\n        <p class="customer-list__empty">Cargando clientes\u2026</p>\r\n      } @else if (filteredCustomers().length === 0) {\r\n        <p class="customer-list__empty">No hay clientes que coincidan con la b\xFAsqueda</p>\r\n      } @else {\r\n        @for (customer of filteredCustomers(); track customer.id) {\r\n          <button\r\n            type="button"\r\n            class="customer-row"\r\n            [class.customer-row--selected]="selectedCustomerId() === String(customer.id)"\r\n            (click)="selectCustomer(String(customer.id))">\r\n            <span class="customer-row__avatar">{{ customerInitials(customer) }}</span>\r\n            <span class="customer-row__info">\r\n              <span class="customer-row__name">{{ customerDisplayName(customer) }}</span>\r\n              @if (customer.email) {\r\n                <span class="customer-row__email">{{ customer.email }}</span>\r\n              }\r\n            </span>\r\n            @if (selectedCustomerId() === String(customer.id)) {\r\n              <lucide-icon [img]="Check" class="customer-row__check" />\r\n            }\r\n          </button>\r\n        }\r\n      }\r\n    </div>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/pos/components/pos-customer-picker-dialog/pos-customer-picker-dialog.component.scss */\n:host {\n  display: block;\n  width: 100%;\n}\n.modal-container {\n  background: #fff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 520px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 20px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header h2 {\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n  letter-spacing: -0.01em;\n}\n.close-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: background 0.15s, color 0.15s;\n}\n.close-btn:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.modal-content {\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  padding: 18px 20px 20px;\n}\n.search-label {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #9ca3af;\n  margin: 0 0 6px;\n}\n.search-field {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0 12px;\n  height: 42px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #fff;\n  margin-bottom: 16px;\n  flex-shrink: 0;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.search-field:focus-within {\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);\n}\n.search-field input {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  font-size: 14px;\n  color: #111827;\n}\n.search-field input::placeholder {\n  color: #9ca3af;\n}\n.search-field input:focus {\n  outline: none;\n}\n.search-field__icon {\n  width: 18px;\n  height: 18px;\n  color: #9ca3af;\n  display: inline-flex !important;\n  flex-shrink: 0;\n}\n.counter-sale {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  margin-bottom: 18px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #fafafa;\n  cursor: pointer;\n  text-align: left;\n  flex-shrink: 0;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    box-shadow 0.15s;\n}\n.counter-sale:hover {\n  border-color: #d1d5db;\n  background: #f3f4f6;\n}\n.counter-sale--selected {\n  border-color: #c7d2fe;\n  background: #fff;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.counter-sale__icon-wrap {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: #e5e7eb;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.counter-sale--selected .counter-sale__icon-wrap {\n  background: #eef2ff;\n  color: #4f46e5;\n}\n.counter-sale__icon {\n  width: 20px;\n  height: 20px;\n  color: #6b7280;\n  display: inline-flex !important;\n}\n.counter-sale--selected .counter-sale__icon {\n  color: #4f46e5;\n}\n.counter-sale__text {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n  flex: 1;\n}\n.counter-sale__title {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n}\n.counter-sale__subtitle {\n  font-size: 12px;\n  color: #6b7280;\n}\n.counter-sale__check {\n  flex-shrink: 0;\n  color: #4f46e5;\n  display: inline-flex;\n}\n.counter-sale__check-icon {\n  width: 18px;\n  height: 18px;\n  display: inline-flex !important;\n}\n.list-label {\n  margin: 0 0 8px;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #9ca3af;\n  flex-shrink: 0;\n}\n.customer-list {\n  flex: 1;\n  min-height: 200px;\n  max-height: min(48vh, 380px);\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 0 -4px;\n  padding: 0 4px 2px;\n}\n.customer-list::-webkit-scrollbar {\n  width: 6px;\n}\n.customer-list::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 999px;\n}\n.customer-row {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  border: none;\n  border-radius: 8px;\n  background: transparent;\n  cursor: pointer;\n  text-align: left;\n  transition: background 0.12s;\n}\n.customer-row:hover {\n  background: #f9fafb;\n}\n.customer-row--selected {\n  background: #f5f3ff;\n}\n.customer-row__avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.customer-row__info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n  flex: 1;\n}\n.customer-row__name {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.customer-row__email {\n  font-size: 12px;\n  color: #6b7280;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.customer-row__check {\n  width: 18px;\n  height: 18px;\n  color: #4f46e5;\n  flex-shrink: 0;\n  display: inline-flex !important;\n}\n.customer-list__empty {\n  margin: 2rem 0;\n  font-size: 14px;\n  color: #9ca3af;\n  text-align: center;\n  line-height: 1.5;\n}\n/*# sourceMappingURL=pos-customer-picker-dialog.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosCustomerPickerDialogComponent, { className: "PosCustomerPickerDialogComponent", filePath: "src/app/features/pos/components/pos-customer-picker-dialog/pos-customer-picker-dialog.component.ts", lineNumber: 24 });
})();

// src/app/features/pos/utils/pos-collect.util.ts
var CASH_MXN_DENOMINATIONS = [1e3, 500, 200, 100, 50, 20];
var CASH_USD_DENOMINATIONS = [100, 50, 20, 10, 5, 1];
function parseOrderTotal(total) {
  const n = Number(total);
  return Number.isFinite(n) ? n : 0;
}
function amountsMatch(orderTotal, paidTotal) {
  return Math.abs(paidTotal - orderTotal) <= 0.01;
}
function defaultCollectForm(orderTotal, usdExchangeRate) {
  return {
    paymentMethod: "cash",
    amountCashMxn: orderTotal,
    amountCashUsd: 0,
    usdExchangeRate: usdExchangeRate ?? 0,
    receivedCashMxn: 0,
    receivedCashUsd: 0,
    amountTransferMxn: orderTotal,
    transferReference: "",
    amountCardMxn: orderTotal,
    cardReference: "",
    mixedCashMxn: 0,
    mixedReceivedMxn: 0,
    mixedTransferMxn: orderTotal,
    mixedTransferRef: ""
  };
}
function cashDenomKey(currency, denomination) {
  return `${currency}-${denomination}`;
}
function sumCashDenominations(counts, currency, denominations) {
  return denominations.reduce((sum, denomination) => sum + denomination * Math.max(0, counts[cashDenomKey(currency, denomination)] ?? 0), 0);
}
function collectReceivedTotalMxn(form) {
  const usdMxn = form.receivedCashUsd > 0 ? form.receivedCashUsd * form.usdExchangeRate : 0;
  return roundMoney(form.receivedCashMxn + usdMxn);
}
function deriveCashPaymentSplit(orderTotal, receivedMxn, receivedUsd, rate) {
  const amountCashMxn = roundMoney(Math.min(receivedMxn, orderTotal));
  const remainderMxn = roundMoney(orderTotal - amountCashMxn);
  const amountCashUsd = remainderMxn > 0 && rate > 0 ? roundMoney(Math.min(receivedUsd, remainderMxn / rate)) : 0;
  return { amountCashMxn, amountCashUsd };
}
function syncCashFormFromReceived(form, orderTotal) {
  const split = deriveCashPaymentSplit(orderTotal, form.receivedCashMxn, form.receivedCashUsd, form.usdExchangeRate);
  return {
    receivedCashMxn: roundMoney(form.receivedCashMxn),
    receivedCashUsd: roundMoney(form.receivedCashUsd),
    amountCashMxn: split.amountCashMxn,
    amountCashUsd: split.amountCashUsd
  };
}
function validateCollectForm(form, orderTotal) {
  if (orderTotal <= 0) {
    return "El total de la orden no es v\xE1lido";
  }
  if (form.paymentMethod === "cash") {
    if (form.receivedCashMxn <= 0 && form.receivedCashUsd <= 0) {
      return "Indica cu\xE1ntos billetes entreg\xF3 el cliente";
    }
    if (form.receivedCashUsd > 0 && form.usdExchangeRate <= 0) {
      return "Ingresa tipo de cambio";
    }
    if (collectReceivedTotalMxn(form) + 0.01 < orderTotal) {
      return `El efectivo recibido no cubre ${formatMoney(orderTotal)}`;
    }
    return null;
  }
  if (form.paymentMethod === "transfer") {
    if (!amountsMatch(orderTotal, form.amountTransferMxn)) {
      return `Los montos deben cubrir exactamente ${formatMoney(orderTotal)}`;
    }
    if (!form.transferReference.trim()) {
      return "Ingresa referencia de transferencia";
    }
    return null;
  }
  if (form.paymentMethod === "card") {
    if (!amountsMatch(orderTotal, form.amountCardMxn)) {
      return `Los montos deben cubrir exactamente ${formatMoney(orderTotal)}`;
    }
    return null;
  }
  const paid = form.mixedCashMxn + form.mixedTransferMxn;
  if (!amountsMatch(orderTotal, paid)) {
    return `Los montos deben cubrir exactamente ${formatMoney(orderTotal)}`;
  }
  const methods = [form.mixedCashMxn > 0, form.mixedTransferMxn > 0].filter(Boolean).length;
  if (methods < 2) {
    return "En pago mixto usa al menos dos formas de pago con monto mayor a cero";
  }
  if (form.mixedTransferMxn > 0 && !form.mixedTransferRef.trim()) {
    return "Ingresa referencia de transferencia";
  }
  if (form.mixedCashMxn > 0 && form.mixedReceivedMxn < form.mixedCashMxn) {
    return "El efectivo recibido debe cubrir el monto en efectivo";
  }
  return null;
}
function buildCashBreakdownPayload(counts, manualMxn, manualUsd) {
  const denominations = [];
  for (const denomination of CASH_MXN_DENOMINATIONS) {
    const bill_count = Math.max(0, counts[cashDenomKey("MXN", denomination)] ?? 0);
    if (bill_count > 0) {
      denominations.push({ currency: "MXN", denomination, bill_count });
    }
  }
  for (const denomination of CASH_USD_DENOMINATIONS) {
    const bill_count = Math.max(0, counts[cashDenomKey("USD", denomination)] ?? 0);
    if (bill_count > 0) {
      denominations.push({ currency: "USD", denomination, bill_count });
    }
  }
  const cash_manual_mxn = roundMoney(manualMxn);
  const cash_manual_usd = roundMoney(manualUsd);
  return __spreadValues(__spreadValues(__spreadValues({}, denominations.length > 0 ? { cash_denominations: denominations } : {}), cash_manual_mxn > 0 ? { cash_manual_mxn } : {}), cash_manual_usd > 0 ? { cash_manual_usd } : {});
}
function buildCollectPayload(form, orderTotal, customerId) {
  const base = { payment_method: form.paymentMethod };
  if (customerId != null && Number.isFinite(customerId) && customerId > 0) {
    base.customer_id = Math.floor(customerId);
  }
  if (form.paymentMethod === "cash") {
    const synced = syncCashFormFromReceived(form, orderTotal);
    return __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, base), {
      amount_cash_mxn: roundMoney(synced.amountCashMxn)
    }), synced.amountCashUsd > 0 ? {
      amount_cash_usd: roundMoney(synced.amountCashUsd),
      usd_exchange_rate: form.usdExchangeRate,
      received_cash_usd: roundMoney(synced.receivedCashUsd)
    } : {}), {
      received_cash_mxn: roundMoney(synced.receivedCashMxn)
    });
  }
  if (form.paymentMethod === "transfer") {
    return __spreadProps(__spreadValues({}, base), {
      amount_transfer_mxn: roundMoney(form.amountTransferMxn),
      transfer_reference: form.transferReference.trim()
    });
  }
  if (form.paymentMethod === "card") {
    return __spreadValues(__spreadProps(__spreadValues({}, base), {
      amount_card_mxn: roundMoney(form.amountCardMxn)
    }), form.cardReference.trim() ? { card_reference: form.cardReference.trim() } : {});
  }
  return __spreadValues(__spreadValues(__spreadProps(__spreadValues({}, base), {
    payment_method: "mixed"
  }), form.mixedCashMxn > 0 ? {
    amount_cash_mxn: roundMoney(form.mixedCashMxn),
    received_cash_mxn: roundMoney(form.mixedReceivedMxn)
  } : {}), form.mixedTransferMxn > 0 ? {
    amount_transfer_mxn: roundMoney(form.mixedTransferMxn),
    transfer_reference: form.mixedTransferRef.trim()
  } : {});
}
function collectAppliedTotal(form) {
  if (form.paymentMethod === "cash") {
    return collectReceivedTotalMxn(form);
  }
  if (form.paymentMethod === "transfer") {
    return form.amountTransferMxn;
  }
  if (form.paymentMethod === "card") {
    return form.amountCardMxn;
  }
  return form.mixedCashMxn + form.mixedTransferMxn;
}
function collectChangeMxn(form, orderTotal = 0) {
  if (form.paymentMethod === "cash") {
    const split = deriveCashPaymentSplit(orderTotal, form.receivedCashMxn, form.receivedCashUsd, form.usdExchangeRate);
    return Math.max(0, roundMoney(form.receivedCashMxn - split.amountCashMxn));
  }
  if (form.paymentMethod === "mixed" && form.mixedCashMxn > 0) {
    return Math.max(0, roundMoney(form.mixedReceivedMxn - form.mixedCashMxn));
  }
  return 0;
}
function collectChangeUsd(form, orderTotal = 0) {
  if (form.paymentMethod === "cash") {
    const split = deriveCashPaymentSplit(orderTotal, form.receivedCashMxn, form.receivedCashUsd, form.usdExchangeRate);
    return Math.max(0, roundMoney(form.receivedCashUsd - split.amountCashUsd));
  }
  return 0;
}
function collectCashShortfallMxn(form, orderTotal = 0) {
  if (form.paymentMethod === "cash") {
    return Math.max(0, roundMoney(orderTotal - collectReceivedTotalMxn(form)));
  }
  if (form.paymentMethod === "mixed" && form.mixedCashMxn > 0) {
    return Math.max(0, roundMoney(form.mixedCashMxn - form.mixedReceivedMxn));
  }
  return 0;
}
function collectCashShortfallUsd(form) {
  return 0;
}
function collectAppliedDelta(form, orderTotal) {
  return roundMoney(collectAppliedTotal(form) - orderTotal);
}
function splitMixedPaymentDefault(orderTotal) {
  const cash = roundMoney(orderTotal / 2);
  const transfer = roundMoney(orderTotal - cash);
  return {
    mixedCashMxn: cash,
    mixedTransferMxn: transfer,
    mixedReceivedMxn: cash
  };
}
function roundMoney(value) {
  return Math.round(value * 100) / 100;
}
function formatMoney(amount) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);
}

// src/app/features/pos/pages/payment/payment.component.ts
var _c0 = ["posRoot"];
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.collection_id || ($item.sales_order == null ? null : $item.sales_order.id);
function PaymentComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "Verificando corte\u2026");
    \u0275\u0275elementEnd();
  }
}
function PaymentComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "lucide-icon", 15);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Corte abierto");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Package);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.branchLabel(), " \xB7 Ventas ", ctx_r1.shiftSalesTotal(ctx));
  }
}
function PaymentComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span");
    \u0275\u0275text(2, "Sin corte abierto");
    \u0275\u0275elementEnd()();
  }
}
function PaymentComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 17)(1, "div", 20);
    \u0275\u0275element(2, "lucide-icon", 21);
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Abrir corte del d\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Registra el efectivo inicial para comenzar a cobrar ventas pendientes de la sucursal.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 22);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_22_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openDailyShift());
    });
    \u0275\u0275text(8, " Abrir corte ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Wallet);
  }
}
function PaymentComponent_Conditional_23_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.pendingSales().length);
  }
}
function PaymentComponent_Conditional_23_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ((tmp_4_0 = ctx_r1.collectedSummary()) == null ? null : tmp_4_0.count) ?? ctx_r1.collectedSales().length, " ");
  }
}
function PaymentComponent_Conditional_23_Conditional_30_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.pendingSales().length);
  }
}
function PaymentComponent_Conditional_23_Conditional_30_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, "Cargando ventas\u2026");
    \u0275\u0275elementEnd();
  }
}
function PaymentComponent_Conditional_23_Conditional_30_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, "No hay ventas pendientes de cobro.");
    \u0275\u0275elementEnd();
  }
}
function PaymentComponent_Conditional_23_Conditional_30_Conditional_14_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1, "Mostrador");
    \u0275\u0275elementEnd();
  }
}
function PaymentComponent_Conditional_23_Conditional_30_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 47);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_30_Conditional_14_For_2_Template_button_click_1_listener() {
      const sale_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectSale(sale_r7));
    });
    \u0275\u0275elementStart(2, "div", 48)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 50)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 51)(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, PaymentComponent_Conditional_23_Conditional_30_Conditional_14_For_2_Conditional_15_Template, 2, 0, "span", 52);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const sale_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classProp("cobranza-sale--selected", ((tmp_15_0 = ctx_r1.selectedSale()) == null ? null : tmp_15_0.id) === sale_r7.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sale_r7.folio || sale_r7.id.substring(0, 8));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.saleTotal(sale_r7));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(sale_r7.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.sellerLabel(sale_r7));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.customerLabel(sale_r7));
    \u0275\u0275advance();
    \u0275\u0275conditional((sale_r7.customer == null ? null : sale_r7.customer.is_walk_in) ? 15 : -1);
  }
}
function PaymentComponent_Conditional_23_Conditional_30_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 46);
    \u0275\u0275repeaterCreate(1, PaymentComponent_Conditional_23_Conditional_30_Conditional_14_For_2_Template, 16, 8, "li", null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredPendingSales());
  }
}
function PaymentComponent_Conditional_23_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "h2");
    \u0275\u0275text(3, "Ventas por cobrar");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, PaymentComponent_Conditional_23_Conditional_30_Conditional_4_Template, 2, 1, "span", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 38);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_30_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.refreshListPanel());
    });
    \u0275\u0275element(6, "lucide-icon", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 40)(8, "div", 41);
    \u0275\u0275element(9, "lucide-icon", 42);
    \u0275\u0275elementStart(10, "input", 43);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_30_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.searchFolio.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 44);
    \u0275\u0275conditionalCreate(12, PaymentComponent_Conditional_23_Conditional_30_Conditional_12_Template, 2, 0, "p", 45)(13, PaymentComponent_Conditional_23_Conditional_30_Conditional_13_Template, 2, 0, "p", 45)(14, PaymentComponent_Conditional_23_Conditional_30_Conditional_14_Template, 3, 0, "ul", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.pendingSales().length > 0 ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.RefreshCw);
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r1.Search);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.searchFolio());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.loading() ? 12 : ctx_r1.filteredPendingSales().length === 0 ? 13 : 14);
  }
}
function PaymentComponent_Conditional_23_Conditional_31_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, "Cargando cobros\u2026");
    \u0275\u0275elementEnd();
  }
}
function PaymentComponent_Conditional_23_Conditional_31_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, "No hay ventas cobradas en este corte.");
    \u0275\u0275elementEnd();
  }
}
function PaymentComponent_Conditional_23_Conditional_31_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 59);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_31_Conditional_21_For_2_Template_button_click_1_listener() {
      const item_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.selectCollectedSale(item_r10));
    });
    \u0275\u0275elementStart(2, "div", 48)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 49);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 50)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 60);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 51)(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "lucide-icon", 61);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const item_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275classProp("cobranza-sale--selected", ((tmp_15_0 = ctx_r1.selectedCollectedSale()) == null ? null : tmp_15_0.collection_id) === item_r10.collection_id || ((tmp_15_0 = ctx_r1.selectedCollectedSale()) == null ? null : tmp_15_0.sales_order == null ? null : tmp_15_0.sales_order.id) === (item_r10.sales_order == null ? null : item_r10.sales_order.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.collectedSaleFolio(item_r10));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.collectedSaleTotal(item_r10));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(item_r10.collected_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.paymentMethodLabel(item_r10.payment == null ? null : item_r10.payment.payment_method));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.collectedSaleCustomerLabel(item_r10));
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.ChevronRight);
  }
}
function PaymentComponent_Conditional_23_Conditional_31_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 46);
    \u0275\u0275repeaterCreate(1, PaymentComponent_Conditional_23_Conditional_31_Conditional_21_For_2_Template, 16, 8, "li", null, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredCollectedSales());
  }
}
function PaymentComponent_Conditional_23_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "h2");
    \u0275\u0275text(3, "\xD3rdenes cobradas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 38);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_31_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.refreshListPanel());
    });
    \u0275\u0275element(5, "lucide-icon", 39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 40)(7, "div", 53)(8, "span", 54);
    \u0275\u0275element(9, "lucide-icon", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 56)(11, "span", 57);
    \u0275\u0275text(12, "Resumen del corte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 41);
    \u0275\u0275element(16, "lucide-icon", 42);
    \u0275\u0275elementStart(17, "input", 58);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_31_Template_input_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.searchCollectedFolio.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 44);
    \u0275\u0275conditionalCreate(19, PaymentComponent_Conditional_23_Conditional_31_Conditional_19_Template, 2, 0, "p", 45)(20, PaymentComponent_Conditional_23_Conditional_31_Conditional_20_Template, 2, 0, "p", 45)(21, PaymentComponent_Conditional_23_Conditional_31_Conditional_21_Template, 3, 0, "ul", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("img", ctx_r1.RefreshCw);
    \u0275\u0275advance(4);
    \u0275\u0275property("img", ctx_r1.Receipt);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.collectedSummaryLabel());
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Search);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.searchCollectedFolio());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.loadingCollected() ? 19 : ctx_r1.filteredCollectedSales().length === 0 ? 20 : 21);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 90);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_49_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openCustomerPicker());
    });
    \u0275\u0275elementStart(1, "span", 91);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 92)(4, "span", 93);
    \u0275\u0275text(5, "Cliente seleccionado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 94);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "lucide-icon", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedCustomerName().slice(0, 2).toUpperCase(), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedCustomerName());
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.ChevronRight);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const denom_r15 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xD7", ctx_r1.getBillCount("MXN", denom_r15));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 114);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_8_Template_button_click_0_listener() {
      const denom_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.tapBill("MXN", denom_r15));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_8_Conditional_2_Template, 2, 1, "span", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const denom_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("cobranza-bill-btn--on", ctx_r1.getBillCount("MXN", denom_r15) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" $", denom_r15, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getBillCount("MXN", denom_r15) > 0 ? 2 : -1);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 106);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.exchangeRateBadgeLabel());
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 107);
    \u0275\u0275text(1, " TC $ ");
    \u0275\u0275elementStart(2, "input", 116);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_22_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.onUsdExchangeRateChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().usdExchangeRate);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const denom_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xD7", ctx_r1.getBillCount("USD", denom_r18));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 117);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_25_Template_button_click_0_listener() {
      const denom_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.tapBill("USD", denom_r18));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_25_Conditional_2_Template, 2, 1, "span", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const denom_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("cobranza-bill-btn--on", ctx_r1.getBillCount("USD", denom_r18) > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" USD ", denom_r18, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getBillCount("USD", denom_r18) > 0 ? 2 : -1);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 110)(1, "span");
    \u0275\u0275text(2, "Falta por recibir");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.cashShortfallMxn()));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong", 113);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.changeMxn()));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong", 113);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatCurrencyUsd(ctx_r1.changeUsd()));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong", 113);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(0));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 95);
    \u0275\u0275text(1, " Toca los billetes que entreg\xF3 el cliente o escribe el monto manual abajo. Puedes combinar pesos y d\xF3lares. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 96)(3, "section", 97)(4, "h4", 98);
    \u0275\u0275text(5, "Pesos (MXN)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 99);
    \u0275\u0275repeaterCreate(7, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_8_Template, 3, 4, "button", 100, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "label", 101)(10, "span");
    \u0275\u0275text(11, "Monto manual recibido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 102);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setManualCashReceived("MXN", ctx_r1.parseMoneyInput($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "p", 103);
    \u0275\u0275text(14, "Total recibido: ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "section", 104)(18, "div", 105)(19, "h4", 98);
    \u0275\u0275text(20, "D\xF3lares (USD)");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_21_Template, 2, 1, "span", 106)(22, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_22_Template, 3, 1, "label", 107);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 99);
    \u0275\u0275repeaterCreate(24, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_For_25_Template, 3, 4, "button", 108, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "label", 101)(27, "span");
    \u0275\u0275text(28, "Monto manual recibido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 102);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setManualCashReceived("USD", ctx_r1.parseMoneyInput($event)));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "p", 103);
    \u0275\u0275text(31, "Total recibido: ");
    \u0275\u0275elementStart(32, "strong");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "div", 109);
    \u0275\u0275conditionalCreate(35, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_35_Template, 5, 1, "div", 110);
    \u0275\u0275elementStart(36, "div", 111)(37, "span");
    \u0275\u0275text(38, "Cambio a entregar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 112);
    \u0275\u0275conditionalCreate(40, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_40_Template, 2, 1, "strong", 113);
    \u0275\u0275conditionalCreate(41, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_41_Template, 2, 1, "strong", 113);
    \u0275\u0275conditionalCreate(42, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Conditional_42_Template, 2, 1, "strong", 113);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r1.cashMxnDenominations);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.cashManualMxn());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.cashReceivedMxnLabel());
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.exchangeRateFromConfig() ? 21 : 22);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.cashUsdDenominations);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.cashManualUsd());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.cashReceivedUsdLabel());
    \u0275\u0275advance();
    \u0275\u0275classProp("cobranza-cash-result--change", ctx_r1.changeMxn() > 0 || ctx_r1.changeUsd() > 0)("cobranza-cash-result--short", ctx_r1.cashShortfallMxn() > 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.cashShortfallMxn() > 0 ? 35 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.changeMxn() > 0 ? 40 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.changeUsd() > 0 ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.changeMxn() <= 0 && ctx_r1.changeUsd() <= 0 ? 42 : -1);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 118)(1, "span");
    \u0275\u0275text(2, "Monto MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 119);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_64_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.patchCollectForm({ amountTransferMxn: +$event }));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "label", 118)(5, "span");
    \u0275\u0275text(6, "Referencia SPEI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 120);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_64_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.patchCollectForm({ transferReference: $event }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().amountTransferMxn);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().transferReference);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 118)(1, "span");
    \u0275\u0275text(2, "Monto MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 119);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_65_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.patchCollectForm({ amountCardMxn: +$event }));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "label", 118)(5, "span");
    \u0275\u0275text(6, "Referencia (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 121);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_65_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.patchCollectForm({ cardReference: $event }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().amountCardMxn);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().cardReference);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 118)(1, "span");
    \u0275\u0275text(2, "Referencia SPEI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 120);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Conditional_34_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.patchCollectForm({ mixedTransferRef: $event }));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().mixedTransferRef);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Conditional_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 110)(1, "span");
    \u0275\u0275text(2, "Falta por recibir");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.cashShortfallMxn()));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 109);
    \u0275\u0275conditionalCreate(1, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Conditional_35_Conditional_1_Template, 5, 1, "div", 110);
    \u0275\u0275elementStart(2, "div", 111)(3, "span");
    \u0275\u0275text(4, "Cambio a entregar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "strong", 113);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275classProp("cobranza-cash-result--change", ctx_r1.changeMxn() > 0)("cobranza-cash-result--short", ctx_r1.cashShortfallMxn() > 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.cashShortfallMxn() > 0 ? 1 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.changeMxn()));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 122)(1, "div", 123);
    \u0275\u0275element(2, "div", 124);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 125)(4, "span");
    \u0275\u0275text(5, "Suma aplicada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementStart(8, "em");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 126)(11, "label", 118)(12, "span");
    \u0275\u0275text(13, "Efectivo MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 119);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.patchCollectForm({ mixedCashMxn: ctx_r1.parseMoneyInput($event) }));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "label", 118)(16, "span");
    \u0275\u0275text(17, "Recibi\xF3 MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "input", 127);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.patchCollectForm({ mixedReceivedMxn: ctx_r1.parseMoneyInput($event) }));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 128)(20, "button", 129);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.setExactCashReceived());
    });
    \u0275\u0275text(21, "Exacto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 129);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.addReceivedCash(50));
    });
    \u0275\u0275text(23, "+$50");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 129);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.addReceivedCash(100));
    });
    \u0275\u0275text(25, "+$100");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 129);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.addReceivedCash(200));
    });
    \u0275\u0275text(27, "+$200");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 129);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.addReceivedCash(500));
    });
    \u0275\u0275text(29, "+$500");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "label", 118)(31, "span");
    \u0275\u0275text(32, "Transferencia MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 119);
    \u0275\u0275listener("ngModelChange", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.patchCollectForm({ mixedTransferMxn: ctx_r1.parseMoneyInput($event) }));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(34, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Conditional_34_Template, 4, 1, "label", 118);
    \u0275\u0275conditionalCreate(35, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Conditional_35_Template, 7, 6, "div", 130);
  }
  if (rf & 2) {
    const sale_r23 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r1.appliedProgress(), "%");
    \u0275\u0275classProp("cobranza-pay-progress__fill--ok", ctx_r1.amountsOk());
    \u0275\u0275advance(4);
    \u0275\u0275classProp("cobranza-pay-progress__ok", ctx_r1.amountsOk());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatCurrency(ctx_r1.appliedTotal()), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("de ", ctx_r1.saleTotal(sale_r23));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().mixedCashMxn);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().mixedReceivedMxn);
    \u0275\u0275advance(15);
    \u0275\u0275property("ngModel", ctx_r1.collectForm().mixedTransferMxn);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectForm().mixedTransferMxn > 0 ? 34 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectForm().mixedCashMxn > 0 ? 35 : -1);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 85);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.collectError());
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 64)(2, "div")(3, "h2");
    \u0275\u0275text(4, "Cobrar venta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 65);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 66);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearSelectedSale());
    });
    \u0275\u0275text(8, "Cancelar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 67)(10, "section", 68)(11, "div", 69)(12, "span", 70);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "time", 71);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 72)(17, "span");
    \u0275\u0275text(18, "Total a cobrar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 73)(22, "div")(23, "span");
    \u0275\u0275text(24, "Vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "strong");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(27, "section", 74)(28, "h3", 75);
    \u0275\u0275text(29, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 76)(31, "label", 77)(32, "input", 78);
    \u0275\u0275listener("change", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_input_change_32_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setCustomerMode("walk_in"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span", 79);
    \u0275\u0275element(34, "lucide-icon", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 80)(36, "strong");
    \u0275\u0275text(37, "P\xFAblico en General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "span");
    \u0275\u0275text(39, "Venta mostrador");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "label", 77)(41, "input", 78);
    \u0275\u0275listener("change", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_input_change_41_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setCustomerMode("registered"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 79);
    \u0275\u0275element(43, "lucide-icon", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "span", 80)(45, "strong");
    \u0275\u0275text(46, "Cliente registrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span");
    \u0275\u0275text(48, "Buscar en cat\xE1logo");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(49, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_49_Template, 9, 3, "button", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "section", 74)(51, "h3", 75);
    \u0275\u0275text(52, "M\xE9todo de pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "div", 82)(54, "button", 83);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setPaymentMethod("cash"));
    });
    \u0275\u0275text(55, " Efectivo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 83);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setPaymentMethod("transfer"));
    });
    \u0275\u0275text(57, " Transferencia ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 83);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setPaymentMethod("card"));
    });
    \u0275\u0275text(59, " Tarjeta ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "button", 83);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_button_click_60_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.setPaymentMethod("mixed"));
    });
    \u0275\u0275text(61, " Mixto ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 84);
    \u0275\u0275conditionalCreate(63, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_63_Template, 43, 13);
    \u0275\u0275conditionalCreate(64, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_64_Template, 8, 2);
    \u0275\u0275conditionalCreate(65, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_65_Template, 8, 2);
    \u0275\u0275conditionalCreate(66, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_66_Template, 36, 13);
    \u0275\u0275conditionalCreate(67, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Conditional_67_Template, 2, 1, "p", 85);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(68, "div", 86)(69, "button", 87);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearSelectedSale());
    });
    \u0275\u0275text(70, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "button", 88);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template_button_click_71_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.collectSelected());
    });
    \u0275\u0275text(72);
    \u0275\u0275elementStart(73, "span", 89);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const sale_r23 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(sale_r23.folio || sale_r23.id);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(sale_r23.folio || sale_r23.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(sale_r23.created_at));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.saleTotal(sale_r23));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.sellerLabel(sale_r23));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("cobranza-radio--on", ctx_r1.customerMode() === "walk_in");
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.customerMode() === "walk_in");
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Store);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("cobranza-radio--on", ctx_r1.customerMode() === "registered");
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.customerMode() === "registered");
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.User);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.customerMode() === "registered" ? 49 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("cobranza-pay-tab--active", ctx_r1.collectForm().paymentMethod === "cash");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("cobranza-pay-tab--active", ctx_r1.collectForm().paymentMethod === "transfer");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("cobranza-pay-tab--active", ctx_r1.collectForm().paymentMethod === "card");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("cobranza-pay-tab--active", ctx_r1.collectForm().paymentMethod === "mixed");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.collectForm().paymentMethod === "cash" ? 63 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectForm().paymentMethod === "transfer" ? 64 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectForm().paymentMethod === "card" ? 65 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectForm().paymentMethod === "mixed" ? 66 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectError() ? 67 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.collecting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.collecting() || ctx_r1.printingReceipt() || !ctx_r1.amountsOk());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.collecting() || ctx_r1.printingReceipt() ? "Cobrando\u2026" : "Confirmar cobro", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.saleTotal(sale_r23));
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275element(1, "lucide-icon", 131);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Selecciona una venta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Elige una orden de la lista para asignar cliente y m\xE9todo de pago.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Wallet);
  }
}
function PaymentComponent_Conditional_23_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "main", 34);
    \u0275\u0275conditionalCreate(1, PaymentComponent_Conditional_23_Conditional_32_Conditional_1_Template, 75, 31, "div", 62)(2, PaymentComponent_Conditional_23_Conditional_32_Conditional_2_Template, 6, 1, "div", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.selectedSale()) ? 1 : 2, tmp_4_0);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r25 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.collectedSaleSellerLabel(item_r25));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 134);
    \u0275\u0275text(1, "Cargando detalle\u2026");
    \u0275\u0275elementEnd();
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Efectivo MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.moneyLabel(pay_r26["amount_cash_mxn"]));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Efectivo USD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrencyUsd(+pay_r26["amount_cash_usd"]));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Tipo de cambio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(pay_r26["usd_exchange_rate"]);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Transferencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.moneyLabel(pay_r26["amount_transfer_mxn"]));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Ref. SPEI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(pay_r26["transfer_reference"]);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Tarjeta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.moneyLabel(pay_r26["amount_card_mxn"]));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Ref. tarjeta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(pay_r26["card_reference"]);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Recibi\xF3 MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.moneyLabel(pay_r26["received_cash_mxn"]));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 136)(1, "dt");
    \u0275\u0275text(2, "Cambio MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.moneyLabel(pay_r26["change_cash_mxn"]));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 136)(1, "dt");
    \u0275\u0275text(2, "Cambio USD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const pay_r26 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrencyUsd(+pay_r26["change_cash_usd"]));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 135);
    \u0275\u0275conditionalCreate(1, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_1_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(2, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_2_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(3, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_3_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(4, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_4_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(5, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_5_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(6, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_6_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(7, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_7_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(8, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_8_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(9, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_9_Template, 5, 1, "div", 136);
    \u0275\u0275conditionalCreate(10, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Conditional_10_Template, 5, 1, "div", 136);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pay_r26 = ctx;
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["amount_cash_mxn"] != null && +pay_r26["amount_cash_mxn"] > 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["amount_cash_usd"] != null && +pay_r26["amount_cash_usd"] > 0 ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["usd_exchange_rate"] != null && +pay_r26["usd_exchange_rate"] > 0 ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["amount_transfer_mxn"] != null && +pay_r26["amount_transfer_mxn"] > 0 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["transfer_reference"] ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["amount_card_mxn"] != null && +pay_r26["amount_card_mxn"] > 0 ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["card_reference"] ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["received_cash_mxn"] != null && +pay_r26["received_cash_mxn"] > 0 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["change_cash_mxn"] != null && +pay_r26["change_cash_mxn"] > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(pay_r26["change_cash_usd"] != null && +pay_r26["change_cash_usd"] > 0 ? 10 : -1);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "dt");
    \u0275\u0275text(2, "Efectivo MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r25 = \u0275\u0275nextContext(3);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.moneyLabel(item_r25.payment.amount_cash_mxn));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 136)(1, "dt");
    \u0275\u0275text(2, "Cambio MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r25 = \u0275\u0275nextContext(3);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.moneyLabel(item_r25.payment.change_cash_mxn));
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "dl", 135);
    \u0275\u0275conditionalCreate(1, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_1_Conditional_1_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(2, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_1_Conditional_2_Template, 5, 1, "div", 136);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r25 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r25.payment.amount_cash_mxn != null && +item_r25.payment.amount_cash_mxn > 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r25.payment.change_cash_mxn != null && +item_r25.payment.change_cash_mxn > 0 ? 2 : -1);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_0_Template, 11, 10, "dl", 135)(1, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Conditional_1_Template, 3, 2, "dl", 135);
  }
  if (rf & 2) {
    let tmp_7_0;
    const item_r25 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional((tmp_7_0 = ctx_r1.collectionDetailPayment()) ? 0 : item_r25.payment ? 1 : -1, tmp_7_0);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "div", 64)(2, "div")(3, "h2");
    \u0275\u0275text(4, "Detalle del cobro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 65);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 132)(8, "button", 66);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Template_button_click_8_listener() {
      const item_r25 = \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.previewTicket(item_r25));
    });
    \u0275\u0275element(9, "lucide-icon", 15);
    \u0275\u0275text(10, " Ver ticket ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 133);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Template_button_click_11_listener() {
      const item_r25 = \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.reprintTicket(item_r25));
    });
    \u0275\u0275element(12, "lucide-icon", 15);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 66);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearSelectedCollected());
    });
    \u0275\u0275element(15, "lucide-icon", 15);
    \u0275\u0275text(16, " Volver ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 67)(18, "section", 68)(19, "div", 69)(20, "span", 70);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "time", 71);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 72)(25, "span");
    \u0275\u0275text(26, "Total cobrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 73)(30, "div")(31, "span");
    \u0275\u0275text(32, "M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "strong");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div")(36, "span");
    \u0275\u0275text(37, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "strong");
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div")(41, "span");
    \u0275\u0275text(42, "Cobr\xF3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "strong");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(45, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_45_Template, 5, 1, "div");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "section", 74)(47, "h3", 75);
    \u0275\u0275text(48, "Desglose de pago");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(49, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_49_Template, 2, 0, "p", 134)(50, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Conditional_50_Template, 2, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r25 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.collectedSaleFolio(item_r25));
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r1.Eye);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.printingReceipt());
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Printer);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.printingReceipt() ? "Imprimiendo\u2026" : "Reimprimir ticket", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.ChevronLeft);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.collectedSaleFolio(item_r25));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(item_r25.collected_at));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.collectedSaleTotal(item_r25));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.paymentMethodLabel(item_r25.payment == null ? null : item_r25.payment.payment_method));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.collectedSaleCustomerLabel(item_r25));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.collectedByLabel(item_r25));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.collectedSaleSellerLabel(item_r25) !== "\u2014" ? 45 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.loadingCollectionDetail() ? 49 : 50);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275element(1, "lucide-icon", 131);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Historial del corte");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Selecciona una orden cobrada para ver el desglose completo del pago.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Receipt);
  }
}
function PaymentComponent_Conditional_23_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "main", 34);
    \u0275\u0275conditionalCreate(1, PaymentComponent_Conditional_23_Conditional_33_Conditional_1_Template, 51, 14, "div", 62)(2, PaymentComponent_Conditional_23_Conditional_33_Conditional_2_Template, 6, 1, "div", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.selectedCollectedSale()) ? 1 : 2, tmp_4_0);
  }
}
function PaymentComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 23)(1, "div", 24)(2, "span");
    \u0275\u0275text(3, "Efectivo inicial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 24)(7, "span");
    \u0275\u0275text(8, "Ventas del d\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 24)(12, "span");
    \u0275\u0275text(13, "Cortes parciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 25)(17, "button", 26);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPartialShift());
    });
    \u0275\u0275text(18, "Corte parcial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 27);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDailyShift());
    });
    \u0275\u0275text(20, "Cerrar corte");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "nav", 28)(22, "button", 29);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setDashboardTab("pending"));
    });
    \u0275\u0275text(23, " Por cobrar ");
    \u0275\u0275conditionalCreate(24, PaymentComponent_Conditional_23_Conditional_24_Template, 2, 1, "span", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 29);
    \u0275\u0275listener("click", function PaymentComponent_Conditional_23_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setDashboardTab("collected"));
    });
    \u0275\u0275text(26, " \xD3rdenes cobradas ");
    \u0275\u0275conditionalCreate(27, PaymentComponent_Conditional_23_Conditional_27_Template, 2, 1, "span", 31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 32)(29, "aside", 33);
    \u0275\u0275conditionalCreate(30, PaymentComponent_Conditional_23_Conditional_30_Template, 15, 5)(31, PaymentComponent_Conditional_23_Conditional_31_Template, 22, 6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(32, PaymentComponent_Conditional_23_Conditional_32_Template, 3, 1, "main", 34)(33, PaymentComponent_Conditional_23_Conditional_33_Template, 3, 1, "main", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const currentShift_r27 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.shiftOpeningMxn(currentShift_r27));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.shiftSalesTotal(currentShift_r27));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.shiftPartialCount(currentShift_r27));
    \u0275\u0275advance(7);
    \u0275\u0275classProp("cobranza-dashboard-tab--active", ctx_r1.dashboardTab() === "pending");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.pendingSales().length > 0 ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("cobranza-dashboard-tab--active", ctx_r1.dashboardTab() === "collected");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((((tmp_9_0 = ctx_r1.collectedSummary()) == null ? null : tmp_9_0.count) ?? ctx_r1.collectedSales().length) > 0 ? 27 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.dashboardTab() === "pending" ? 30 : 31);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.dashboardTab() === "pending" ? 32 : 33);
  }
}
var PaymentComponent = class _PaymentComponent {
  posService;
  posState;
  authService;
  route;
  toast;
  dialog;
  exchangeRateService;
  receiptPrintService;
  posRootRef;
  Monitor = Monitor;
  Wallet = Wallet;
  Maximize2 = Maximize2;
  Minimize2 = Minimize2;
  Package = Package;
  Search = Search;
  User = User;
  Store = Store;
  ChevronRight = ChevronRight;
  Banknote = Banknote;
  CreditCard = CreditCard;
  ArrowRightLeft = ArrowRightLeft;
  Layers = Layers;
  RefreshCw = RefreshCw;
  Receipt = Receipt;
  ChevronLeft = ChevronLeft;
  Printer = Printer;
  Eye = Eye;
  pendingSales = signal([], ...ngDevMode ? [{ debugName: "pendingSales" }] : []);
  collectedSales = signal([], ...ngDevMode ? [{ debugName: "collectedSales" }] : []);
  collectedSummary = signal(null, ...ngDevMode ? [{ debugName: "collectedSummary" }] : []);
  selectedSale = signal(null, ...ngDevMode ? [{ debugName: "selectedSale" }] : []);
  selectedCollectedSale = signal(null, ...ngDevMode ? [{ debugName: "selectedCollectedSale" }] : []);
  collectionDetail = signal(null, ...ngDevMode ? [{ debugName: "collectionDetail" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  loadingCollected = signal(false, ...ngDevMode ? [{ debugName: "loadingCollected" }] : []);
  loadingCollectionDetail = signal(false, ...ngDevMode ? [{ debugName: "loadingCollectionDetail" }] : []);
  collecting = signal(false, ...ngDevMode ? [{ debugName: "collecting" }] : []);
  printingReceipt = signal(false, ...ngDevMode ? [{ debugName: "printingReceipt" }] : []);
  isFullscreen = signal(false, ...ngDevMode ? [{ debugName: "isFullscreen" }] : []);
  dashboardTab = signal("pending", ...ngDevMode ? [{ debugName: "dashboardTab" }] : []);
  searchFolio = signal("", ...ngDevMode ? [{ debugName: "searchFolio" }] : []);
  searchCollectedFolio = signal("", ...ngDevMode ? [{ debugName: "searchCollectedFolio" }] : []);
  collectForm = signal(defaultCollectForm(0), ...ngDevMode ? [{ debugName: "collectForm" }] : []);
  customerMode = signal("walk_in", ...ngDevMode ? [{ debugName: "customerMode" }] : []);
  selectedCustomerId = signal("", ...ngDevMode ? [{ debugName: "selectedCustomerId" }] : []);
  selectedCustomerName = signal("P\xFAblico en General", ...ngDevMode ? [{ debugName: "selectedCustomerName" }] : []);
  collectError = signal(null, ...ngDevMode ? [{ debugName: "collectError" }] : []);
  dailyUsdMxnRate = signal(null, ...ngDevMode ? [{ debugName: "dailyUsdMxnRate" }] : []);
  cashBillCounts = signal({}, ...ngDevMode ? [{ debugName: "cashBillCounts" }] : []);
  cashManualMxn = signal(0, ...ngDevMode ? [{ debugName: "cashManualMxn" }] : []);
  cashManualUsd = signal(0, ...ngDevMode ? [{ debugName: "cashManualUsd" }] : []);
  cashMxnDenominations = CASH_MXN_DENOMINATIONS;
  cashUsdDenominations = CASH_USD_DENOMINATIONS;
  shift = computed(() => this.posState.dailyShift(), ...ngDevMode ? [{ debugName: "shift" }] : []);
  shiftOpen = computed(() => this.posState.shiftOpen(), ...ngDevMode ? [{ debugName: "shiftOpen" }] : []);
  filteredPendingSales = computed(() => {
    const term = this.searchFolio().trim().toLowerCase();
    const list = this.pendingSales();
    if (!term) {
      return list;
    }
    return list.filter((sale) => {
      const folio = (sale.folio || "").toLowerCase();
      const seller = this.sellerLabel(sale).toLowerCase();
      return folio.includes(term) || seller.includes(term) || sale.id.toLowerCase().includes(term);
    });
  }, ...ngDevMode ? [{ debugName: "filteredPendingSales" }] : []);
  filteredCollectedSales = computed(() => {
    const term = this.searchCollectedFolio().trim().toLowerCase();
    const list = this.collectedSales();
    if (!term) {
      return list;
    }
    return list.filter((item) => {
      const folio = collectedSaleFolio(item).toLowerCase();
      const customer = collectedSaleCustomerLabel(item).toLowerCase();
      const method = paymentMethodLabel(item.payment?.payment_method).toLowerCase();
      return folio.includes(term) || customer.includes(term) || method.includes(term);
    });
  }, ...ngDevMode ? [{ debugName: "filteredCollectedSales" }] : []);
  collectedSummaryLabel = computed(() => {
    const summary = this.collectedSummary();
    const count = summary?.count ?? this.collectedSales().length;
    const total = formatPosMoney(summary?.total_mxn ?? 0);
    return `${count} cobrada${count === 1 ? "" : "s"} \xB7 ${total}`;
  }, ...ngDevMode ? [{ debugName: "collectedSummaryLabel" }] : []);
  orderTotal = computed(() => parseOrderTotal(this.selectedSale()?.total), ...ngDevMode ? [{ debugName: "orderTotal" }] : []);
  appliedTotal = computed(() => collectAppliedTotal(this.collectForm()), ...ngDevMode ? [{ debugName: "appliedTotal" }] : []);
  changeMxn = computed(() => collectChangeMxn(this.collectForm(), this.orderTotal()), ...ngDevMode ? [{ debugName: "changeMxn" }] : []);
  changeUsd = computed(() => collectChangeUsd(this.collectForm(), this.orderTotal()), ...ngDevMode ? [{ debugName: "changeUsd" }] : []);
  cashShortfallMxn = computed(() => collectCashShortfallMxn(this.collectForm(), this.orderTotal()), ...ngDevMode ? [{ debugName: "cashShortfallMxn" }] : []);
  cashShortfallUsd = computed(() => collectCashShortfallUsd(this.collectForm()), ...ngDevMode ? [{ debugName: "cashShortfallUsd" }] : []);
  appliedDelta = computed(() => collectAppliedDelta(this.collectForm(), this.orderTotal()), ...ngDevMode ? [{ debugName: "appliedDelta" }] : []);
  appliedProgress = computed(() => {
    const total = this.orderTotal();
    if (total <= 0) {
      return 0;
    }
    return Math.min(100, Math.round(this.appliedTotal() / total * 100));
  }, ...ngDevMode ? [{ debugName: "appliedProgress" }] : []);
  amountsOk = computed(() => {
    const form = this.collectForm();
    const total = this.orderTotal();
    return validateCollectForm(form, total) === null;
  }, ...ngDevMode ? [{ debugName: "amountsOk" }] : []);
  constructor(posService, posState, authService, route, toast, dialog, exchangeRateService, receiptPrintService) {
    this.posService = posService;
    this.posState = posState;
    this.authService = authService;
    this.route = route;
    this.toast = toast;
    this.dialog = dialog;
    this.exchangeRateService = exchangeRateService;
    this.receiptPrintService = receiptPrintService;
  }
  preselectOrderId = signal(null, ...ngDevMode ? [{ debugName: "preselectOrderId" }] : []);
  ngOnInit() {
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
    this.loadDailyExchangeRate();
    this.refreshDailyShift();
    const orderId = this.route.snapshot.queryParamMap.get("orderId");
    if (orderId) {
      this.preselectOrderId.set(orderId);
    }
  }
  ngOnDestroy() {
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
  }
  terminalLabel() {
    const email = this.authService.user_info?.email ?? "";
    return email.split("@")[0] || "Cobranza";
  }
  branchLabel() {
    const branch = this.shift()?.billing_branch;
    return branch?.display_name || branch?.code || "Sucursal";
  }
  refreshDailyShift() {
    this.posState.checkingShift.set(true);
    this.posService.getCurrentDailyShift().subscribe({
      next: ({ daily_shift }) => {
        if (daily_shift) {
          this.posState.setDailyShift(daily_shift);
        }
        this.posState.checkingShift.set(false);
        if (this.posState.shiftOpen()) {
          this.loadPendingSales();
          this.loadCollectedSales();
        } else {
          this.pendingSales.set([]);
          this.collectedSales.set([]);
          this.collectedSummary.set(null);
        }
      },
      error: (error) => {
        this.posState.checkingShift.set(false);
        if (!this.posState.shiftOpen()) {
          this.posState.setDailyShift(null);
        }
        if (error?.status !== 404) {
          this.toast.error(mapPosApiErrorMessage(error.error?.message));
        }
      }
    });
  }
  async openDailyShift() {
    const wasFullscreen = await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(OpenDailyShiftDialogComponent, {
      width: "420px",
      maxWidth: "95vw",
      disableClose: true,
      panelClass: "pos-dialog-panel"
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.restoreFullscreenAfterDialog(wasFullscreen);
      if (!result) {
        return;
      }
      this.posService.openDailyShift(result).subscribe({
        next: (response) => {
          this.posState.setDailyShift(response.daily_shift);
          const assigned = response.queued_sales_assigned ?? 0;
          if (assigned > 0) {
            this.toast.success(`Corte abierto. Se asignaron ${assigned} \xF3rdenes de cola.`, {
              duration: 5e3
            });
            this.toast.info(`Tienes ${assigned} \xF3rdenes por cobrar`, { duration: 5e3 });
          } else {
            this.toast.success(response.message || "Corte del d\xEDa abierto");
          }
          this.loadPendingSales();
          this.loadCollectedSales();
        },
        error: (error) => this.toast.error(mapPosApiErrorMessage(error.error?.message))
      });
    });
  }
  setDashboardTab(tab) {
    this.dashboardTab.set(tab);
    if (tab === "pending") {
      this.selectedCollectedSale.set(null);
      this.collectionDetail.set(null);
      return;
    }
    this.selectedSale.set(null);
    this.collectError.set(null);
    this.loadCollectedSales();
  }
  loadCollectedSales() {
    if (!this.posState.shiftOpen()) {
      this.collectedSales.set([]);
      this.collectedSummary.set(null);
      return;
    }
    this.loadingCollected.set(true);
    const shiftId = this.shift()?.id;
    this.posService.getCollectedSales(shiftId ? { daily_shift_id: shiftId } : void 0).subscribe({
      next: (response) => {
        this.collectedSales.set(response.collected_sales ?? []);
        this.collectedSummary.set(response.summary);
        this.loadingCollected.set(false);
      },
      error: (error) => {
        this.loadingCollected.set(false);
        this.toast.error(mapPosApiErrorMessage(error.error?.message));
      }
    });
  }
  selectCollectedSale(item) {
    this.selectedCollectedSale.set(item);
    this.collectionDetail.set(null);
    const orderId = item.sales_order?.id;
    if (!orderId) {
      return;
    }
    this.loadingCollectionDetail.set(true);
    this.posService.getSaleCollection(orderId).subscribe({
      next: (detail) => {
        this.collectionDetail.set(detail ?? {});
        this.loadingCollectionDetail.set(false);
      },
      error: (error) => {
        this.loadingCollectionDetail.set(false);
        this.toast.error(mapPosApiErrorMessage(error.error?.message));
      }
    });
  }
  clearSelectedCollected() {
    this.selectedCollectedSale.set(null);
    this.collectionDetail.set(null);
  }
  refreshListPanel() {
    if (this.dashboardTab() === "collected") {
      this.loadCollectedSales();
      return;
    }
    this.loadPendingSales();
  }
  async openPartialShift() {
    const shift = this.shift();
    if (!shift?.id) {
      return;
    }
    const wasFullscreen = await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(PartialShiftDialogComponent, {
      width: "440px",
      maxWidth: "95vw",
      disableClose: true,
      panelClass: "pos-dialog-panel",
      data: { dailyShiftId: shift.id }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.restoreFullscreenAfterDialog(wasFullscreen);
      if (!result) {
        return;
      }
      this.posService.createPartialShift(shift.id, result).subscribe({
        next: () => {
          this.toast.success("Corte parcial registrado");
          this.refreshDailyShift();
        },
        error: (error) => this.toast.error(mapPosApiErrorMessage(error.error?.message))
      });
    });
  }
  async closeDailyShift() {
    const shift = this.shift();
    if (!shift?.id) {
      return;
    }
    const wasFullscreen = await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(CloseDailyShiftDialogComponent, {
      width: "420px",
      maxWidth: "95vw",
      disableClose: true,
      panelClass: "pos-dialog-panel"
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.restoreFullscreenAfterDialog(wasFullscreen);
      if (!result) {
        return;
      }
      this.posService.closeDailyShift(shift.id, result).subscribe({
        next: () => {
          this.posState.clearAll();
          this.pendingSales.set([]);
          this.selectedSale.set(null);
          this.toast.success("Corte cerrado correctamente");
        },
        error: (error) => this.toast.error(mapPosApiErrorMessage(error.error?.message))
      });
    });
  }
  loadPendingSales() {
    this.loading.set(true);
    this.posService.getPendingSales().subscribe({
      next: ({ pending_sales }) => {
        const list = pending_sales ?? [];
        this.pendingSales.set(list);
        const preselect = this.preselectOrderId();
        if (preselect) {
          const match = list.find((s) => s.id === preselect);
          if (match) {
            this.selectSale(match);
          }
          this.preselectOrderId.set(null);
        }
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(mapPosApiErrorMessage(error.error?.message));
      }
    });
  }
  selectSale(sale) {
    this.dashboardTab.set("pending");
    this.selectedCollectedSale.set(null);
    this.collectionDetail.set(null);
    this.selectedSale.set(sale);
    this.collectError.set(null);
    const total = parseOrderTotal(sale.total);
    this.cashBillCounts.set({});
    this.cashManualMxn.set(0);
    this.cashManualUsd.set(0);
    this.collectForm.set(this.buildCollectFormForTotal(total));
    this.initCustomerFromSale(sale);
  }
  clearSelectedSale() {
    this.selectedSale.set(null);
    this.collectError.set(null);
  }
  setPaymentMethod(method) {
    const total = this.orderTotal();
    this.collectForm.update((form) => {
      const next = __spreadProps(__spreadValues({}, form), { paymentMethod: method });
      if (method === "cash") {
        this.cashBillCounts.set({});
        this.cashManualMxn.set(0);
        this.cashManualUsd.set(0);
        next.amountCashMxn = total;
        next.amountCashUsd = 0;
        next.receivedCashMxn = 0;
        next.receivedCashUsd = 0;
      }
      if (method === "transfer") {
        next.amountTransferMxn = total;
      }
      if (method === "card") {
        next.amountCardMxn = total;
      }
      if (method === "mixed") {
        const split = splitMixedPaymentDefault(total);
        next.mixedCashMxn = split.mixedCashMxn;
        next.mixedTransferMxn = split.mixedTransferMxn;
        next.mixedReceivedMxn = split.mixedReceivedMxn;
      }
      return next;
    });
    this.collectError.set(null);
  }
  patchCollectForm(patch) {
    this.collectForm.update((form) => {
      const next = __spreadValues(__spreadValues({}, form), patch);
      if (patch.mixedCashMxn != null && next.mixedReceivedMxn < next.mixedCashMxn) {
        next.mixedReceivedMxn = next.mixedCashMxn;
      }
      return next;
    });
    this.collectError.set(null);
  }
  onUsdExchangeRateChange(value) {
    this.patchCollectForm({ usdExchangeRate: this.parseMoneyInput(value) });
    this.syncCashFromBillCounts();
  }
  tapBill(currency, denomination) {
    this.setBillCount(currency, denomination, this.getBillCount(currency, denomination) + 1);
  }
  setManualCashReceived(currency, value) {
    const amount = roundMoney2(Math.max(0, value));
    if (currency === "MXN") {
      this.cashManualMxn.set(amount);
    } else {
      this.cashManualUsd.set(amount);
    }
    this.syncCashFromBillCounts();
  }
  exchangeRateBadgeLabel() {
    const rate = this.collectForm().usdExchangeRate;
    if (!rate || rate <= 0) {
      return "Sin TC";
    }
    return `TC $${rate}`;
  }
  getBillCount(currency, denomination) {
    return this.cashBillCounts()[cashDenomKey(currency, denomination)] ?? 0;
  }
  setBillCount(currency, denomination, value) {
    const key = cashDenomKey(currency, denomination);
    this.cashBillCounts.update((counts) => __spreadProps(__spreadValues({}, counts), {
      [key]: Math.max(0, Math.floor(Number(value) || 0))
    }));
    this.syncCashFromBillCounts();
  }
  cashReceivedMxnLabel() {
    return this.formatCurrency(this.collectForm().receivedCashMxn);
  }
  cashReceivedUsdLabel() {
    return this.formatCurrencyUsd(this.collectForm().receivedCashUsd);
  }
  setExactCashReceived(currency = "MXN") {
    const form = this.collectForm();
    if (form.paymentMethod === "mixed") {
      this.patchCollectForm({ mixedReceivedMxn: form.mixedCashMxn });
    }
  }
  addReceivedCash(delta, currency = "MXN") {
    const form = this.collectForm();
    if (form.paymentMethod === "mixed") {
      this.patchCollectForm({ mixedReceivedMxn: roundMoney2(form.mixedReceivedMxn + delta) });
    }
  }
  parseMoneyInput(value) {
    const n = Number(String(value).replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  }
  setCustomerMode(mode) {
    this.customerMode.set(mode);
    if (mode === "walk_in") {
      const sale = this.selectedSale();
      const walkInName = sale?.customer?.is_walk_in ? sale.customer.name || "P\xFAblico en General" : "P\xFAblico en General";
      this.selectedCustomerName.set(walkInName);
      this.selectedCustomerId.set("");
      return;
    }
    if (!this.selectedCustomerId()) {
      void this.openCustomerPicker();
    }
  }
  async openCustomerPicker() {
    const wasFullscreen = await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(PosCustomerPickerDialogComponent, {
      width: "520px",
      maxWidth: "95vw",
      panelClass: "pos-dialog-panel",
      data: { selectedCustomerId: this.selectedCustomerId() }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.restoreFullscreenAfterDialog(wasFullscreen);
      if (!result) {
        return;
      }
      if (!result.customerId) {
        this.setCustomerMode("walk_in");
        return;
      }
      this.customerMode.set("registered");
      this.selectedCustomerId.set(result.customerId);
      const customer = result.customer;
      const name = customer ? [customer.name, customer.lastname].filter(Boolean).join(" ").trim() || customer.company_name || customer.email || "Cliente" : "Cliente";
      this.selectedCustomerName.set(name);
    });
  }
  collectSelected() {
    const sale = this.selectedSale();
    if (!sale?.id) {
      return;
    }
    const form = this.collectForm();
    const total = this.orderTotal();
    const validationError = validateCollectForm(form, total);
    if (validationError) {
      this.collectError.set(validationError);
      return;
    }
    if (this.customerMode() === "registered" && !this.selectedCustomerId()) {
      this.collectError.set("Selecciona un cliente registrado");
      return;
    }
    const customerId = this.resolveCollectCustomerId();
    const payload = __spreadValues(__spreadValues({}, buildCollectPayload(form, total, customerId)), form.paymentMethod === "cash" ? buildCashBreakdownPayload(this.cashBillCounts(), this.cashManualMxn(), this.cashManualUsd()) : {});
    this.collecting.set(true);
    this.collectError.set(null);
    this.posService.collectSale(sale.id, payload).subscribe({
      next: (response) => {
        this.collecting.set(false);
        const collection = response.collection;
        const change = collection?.change_cash_mxn;
        const folio = sale.folio || response.sales_order?.folio || sale.id;
        const customerName = collection?.customer?.display_name || collection?.customer?.name || response.sales_order?.customer?.display_name || response.sales_order?.customer?.name;
        if (change != null && Number(change) > 0) {
          this.toast.success(`Venta ${folio} cobrada. Cambio: ${formatPosMoney(change)}`, { duration: 5e3 });
        } else if (customerName) {
          this.toast.success(`Venta ${folio} cobrada \u2014 ${customerName}`);
        } else {
          this.toast.success(`Venta ${folio} cobrada`);
        }
        void this.handleReceiptAfterCollect(sale.id, folio, response.receipt);
        this.selectedSale.set(null);
        this.loadPendingSales();
        this.loadCollectedSales();
        this.refreshDailyShift();
      },
      error: (error) => {
        this.collecting.set(false);
        const msg = mapPosApiErrorMessage(error.error?.message);
        this.collectError.set(msg);
        this.toast.error(msg);
      }
    });
  }
  async openPrinterSettings() {
    const wasFullscreen = await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(PosPrinterSettingsDialogComponent, {
      width: "440px",
      maxWidth: "95vw",
      panelClass: "pos-dialog-panel",
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(async () => {
      await this.restoreFullscreenAfterDialog(wasFullscreen);
    });
  }
  reprintTicket(item) {
    const saleId = item.sales_order?.id;
    if (!saleId || this.printingReceipt()) {
      return;
    }
    this.printingReceipt.set(true);
    this.posService.getSaleReceipt(saleId).subscribe({
      next: (receipt) => {
        void this.printReceiptOrPrompt(receipt, collectedSaleFolio(item)).finally(() => {
          this.printingReceipt.set(false);
        });
      },
      error: () => {
        this.printingReceipt.set(false);
        this.toast.error("No se pudo obtener el ticket para reimpresi\xF3n");
      }
    });
  }
  async previewTicket(item) {
    const saleId = item.sales_order?.id;
    if (!saleId) {
      return;
    }
    const wasFullscreen = await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(PosReceiptPreviewDialogComponent, {
      width: "480px",
      maxWidth: "95vw",
      panelClass: "pos-dialog-panel",
      autoFocus: false,
      data: {
        salesOrderId: saleId,
        title: `Ticket ${collectedSaleFolio(item)}`
      }
    });
    dialogRef.afterClosed().subscribe(async () => {
      await this.restoreFullscreenAfterDialog(wasFullscreen);
    });
  }
  async handleReceiptAfterCollect(salesOrderId, folio, receipt) {
    if (!this.receiptPrintService.isAutoPrintEnabled()) {
      return;
    }
    if (!this.receiptPrintService.hasPrintableReceipt(receipt)) {
      this.toast.info(`Venta ${folio} cobrada. No se gener\xF3 ticket; puedes reimprimir despu\xE9s.`, {
        duration: 5e3
      });
      return;
    }
    await this.printReceiptOrPrompt(receipt, folio, salesOrderId);
  }
  async printReceiptOrPrompt(receipt, folio, salesOrderId) {
    if (!this.receiptPrintService.hasPrintableReceipt(receipt)) {
      this.toast.warning("No hay ticket ESC/POS disponible para esta venta");
      return;
    }
    if (!this.receiptPrintService.getPrinterName()) {
      this.toast.warning("Configura la impresora t\xE9rmica antes de imprimir", { duration: 5e3 });
      this.openPrinterSettings();
      return;
    }
    this.printingReceipt.set(true);
    try {
      await this.receiptPrintService.printReceipt(receipt);
      this.toast.success(`Ticket de ${folio} enviado a la impresora`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo imprimir el ticket";
      this.toast.error(`Cobro registrado. ${message}`, { duration: 6e3 });
      if (salesOrderId) {
        this.toast.info('Usa "Reimprimir ticket" en \xD3rdenes cobradas', { duration: 5e3 });
      }
    } finally {
      this.printingReceipt.set(false);
    }
  }
  async toggleFullscreen() {
    const root = this.posRootRef?.nativeElement;
    if (!root) {
      return;
    }
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await root.requestFullscreen();
      }
    } catch {
      this.toast.error("No se pudo cambiar a pantalla completa");
    }
  }
  onFullscreenChange = () => {
    this.isFullscreen.set(!!document.fullscreenElement);
  };
  /** Sale de pantalla completa para que los modales Material queden encima y sean clicables. */
  async exitFullscreenForDialog() {
    const wasFullscreen = !!document.fullscreenElement;
    if (!wasFullscreen) {
      return false;
    }
    try {
      await document.exitFullscreen();
      this.isFullscreen.set(false);
    } catch {
    }
    return wasFullscreen;
  }
  async restoreFullscreenAfterDialog(wasFullscreen) {
    if (!wasFullscreen || document.fullscreenElement) {
      return;
    }
    const root = this.posRootRef?.nativeElement;
    if (!root) {
      return;
    }
    try {
      await root.requestFullscreen();
      this.isFullscreen.set(true);
    } catch {
      this.isFullscreen.set(false);
    }
  }
  initCustomerFromSale(sale) {
    const customer = sale.customer;
    if (customer?.is_walk_in || !customer?.id) {
      this.customerMode.set("walk_in");
      this.selectedCustomerId.set("");
      this.selectedCustomerName.set(customer?.name || "P\xFAblico en General");
      return;
    }
    this.customerMode.set("registered");
    this.selectedCustomerId.set(String(customer.id));
    this.selectedCustomerName.set(customer.name || "Cliente");
  }
  shiftSalesTotal(shift) {
    return formatPosMoney(dailyShiftSalesTotal(shift));
  }
  shiftOpeningMxn(shift) {
    return formatPosMoney(shift.opening_cash_mxn);
  }
  shiftPartialCount(shift) {
    return dailyShiftPartialCount(shift);
  }
  saleTotal(sale) {
    return formatPosMoney(sale.total);
  }
  sellerLabel(sale) {
    const s = sale.seller_user;
    if (!s) {
      return "\u2014";
    }
    const name = `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim();
    if (name && s.pos_user_code) {
      return `${name} (${s.pos_user_code})`;
    }
    if (name) {
      return name;
    }
    return s.pos_user_code ? `C\xF3digo ${s.pos_user_code}` : "\u2014";
  }
  customerLabel(sale) {
    const c = sale.customer;
    if (!c?.name) {
      return "Mostrador";
    }
    return c.is_walk_in ? `${c.name} (mostrador)` : c.name;
  }
  formatDate(value) {
    if (!value) {
      return "\u2014";
    }
    return new Date(value).toLocaleString("es-MX", { dateStyle: "short", timeStyle: "short" });
  }
  formatCurrency(amount) {
    return formatPosMoney(amount);
  }
  formatCurrencyUsd(amount) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  }
  paymentMethodLabel = paymentMethodLabel;
  collectedSaleFolio = collectedSaleFolio;
  collectedSaleTotal = collectedSaleTotal;
  collectedSaleCustomerLabel = collectedSaleCustomerLabel;
  collectedSaleSellerLabel = collectedSaleSellerLabel;
  collectedByLabel = collectedByLabel;
  collectionDetailPayment() {
    const detail = this.collectionDetail();
    if (!detail) {
      return null;
    }
    const collection = detail["collection"] ?? detail;
    return collection && typeof collection === "object" ? collection : null;
  }
  moneyLabel(value) {
    return formatPosMoney(value);
  }
  exchangeRateFromConfig() {
    return this.dailyUsdMxnRate() != null;
  }
  loadDailyExchangeRate() {
    this.exchangeRateService.getDailyExchangeRate().subscribe({
      next: (rate) => {
        const value = rate?.exchange_rate;
        if (value != null && Number.isFinite(value) && value > 0) {
          this.dailyUsdMxnRate.set(value);
          this.applyDailyExchangeRateToForm();
        }
      },
      error: () => this.dailyUsdMxnRate.set(null)
    });
  }
  applyDailyExchangeRateToForm() {
    const rate = this.dailyUsdMxnRate();
    if (rate == null) {
      return;
    }
    this.collectForm.update((form) => __spreadProps(__spreadValues({}, form), { usdExchangeRate: rate }));
  }
  buildCollectFormForTotal(total) {
    return defaultCollectForm(total, this.dailyUsdMxnRate() ?? void 0);
  }
  resolveCollectCustomerId() {
    if (this.customerMode() !== "registered" || !this.selectedCustomerId()) {
      return void 0;
    }
    const customerId = Number(this.selectedCustomerId());
    if (!Number.isFinite(customerId) || customerId <= 0) {
      return void 0;
    }
    return Math.floor(customerId);
  }
  syncCashFromBillCounts() {
    const counts = this.cashBillCounts();
    const receivedCashMxn = roundMoney2(sumCashDenominations(counts, "MXN", CASH_MXN_DENOMINATIONS) + this.cashManualMxn());
    const receivedCashUsd = roundMoney2(sumCashDenominations(counts, "USD", CASH_USD_DENOMINATIONS) + this.cashManualUsd());
    this.collectForm.update((form) => __spreadValues(__spreadValues({}, form), syncCashFormFromReceived(__spreadProps(__spreadValues({}, form), { receivedCashMxn, receivedCashUsd }), this.orderTotal())));
    this.collectError.set(null);
  }
  static \u0275fac = function PaymentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentComponent)(\u0275\u0275directiveInject(POSService), \u0275\u0275directiveInject(PosStateService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(ExchangeRateService), \u0275\u0275directiveInject(PosReceiptPrintService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentComponent, selectors: [["app-payment"]], viewQuery: function PaymentComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.posRootRef = _t.first);
    }
  }, decls: 24, vars: 10, consts: [["posRoot", ""], [1, "pos-take-root", "cobranza-root"], [1, "pos-session-bar"], [1, "pos-session-bar__content"], [1, "pos-session-bar__left"], [1, "pos-session-bar__title"], [1, "pos-session-bar__title-icon", 3, "img"], [1, "pos-session-bar__center"], [1, "pos-session-bar__checking"], [1, "pos-pill", "pos-pill--warn"], [1, "pos-session-bar__right"], ["type", "button", "title", "Impresora t\xE9rmica", 1, "pos-btn", "pos-btn--ghost", "pos-btn--icon", 3, "click"], [1, "pos-ic", "pos-ic--btn", 3, "img"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", "pos-btn--icon", 3, "click"], [1, "pos-terminal-chip"], [1, "pos-ic", "pos-ic--sm", 3, "img"], [1, "pos-terminal-chip__label"], [1, "cobranza-open-shift"], [1, "pos-pill", "pos-pill--ok"], [1, "pos-session-meta"], [1, "cobranza-open-shift__card"], [1, "cobranza-open-shift__icon", 3, "img"], ["type", "button", 1, "pos-btn", "pos-btn--primary", "pos-btn--lg", 3, "click"], [1, "cobranza-toolbar"], [1, "cobranza-stat-chip"], [1, "cobranza-toolbar__actions"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", 3, "click"], ["type", "button", 1, "pos-btn", "pos-btn--muted", 3, "click"], ["aria-label", "Secciones de cobranza", 1, "cobranza-dashboard-tabs"], ["type", "button", 1, "cobranza-dashboard-tab", 3, "click"], [1, "cobranza-dashboard-tab__badge"], [1, "cobranza-dashboard-tab__badge", "cobranza-dashboard-tab__badge--muted"], [1, "cobranza-body"], [1, "cobranza-panel", "cobranza-panel--list"], [1, "cobranza-panel", "cobranza-panel--collect"], [1, "cobranza-panel__head"], [1, "cobranza-panel__title"], [1, "cobranza-count"], ["type", "button", "title", "Actualizar", 1, "cobranza-refresh-btn", 3, "click"], [3, "img"], [1, "cobranza-panel__content"], [1, "cobranza-search"], [1, "cobranza-search__icon", 3, "img"], ["type", "search", "placeholder", "Buscar folio o vendedor\u2026", "autocomplete", "off", 3, "ngModelChange", "ngModel"], [1, "cobranza-sales-scroll"], [1, "cobranza-empty"], [1, "cobranza-sales"], ["type", "button", 1, "cobranza-sale", 3, "click"], [1, "cobranza-sale__row"], [1, "cobranza-sale__total"], [1, "cobranza-sale__row", "cobranza-sale__row--meta"], [1, "cobranza-sale__row", "cobranza-sale__row--customer"], [1, "cobranza-chip"], [1, "cobranza-collected-summary"], ["aria-hidden", "true", 1, "cobranza-collected-summary__icon-wrap"], [1, "cobranza-collected-summary__icon", 3, "img"], [1, "cobranza-collected-summary__text"], [1, "cobranza-collected-summary__label"], ["type", "search", "placeholder", "Buscar folio, cliente o pago\u2026", "autocomplete", "off", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "cobranza-sale", "cobranza-sale--collected", 3, "click"], [1, "cobranza-pay-chip"], [1, "pos-ic", "pos-ic--xs", 3, "img"], [1, "cobranza-collect-scroll"], [1, "cobranza-empty-state"], [1, "cobranza-panel__head", "cobranza-panel__head--collect"], [1, "cobranza-panel__sub"], ["type", "button", 1, "cobranza-head-btn", 3, "click"], [1, "cobranza-collect-body"], [1, "cobranza-total-card"], [1, "cobranza-total-card__top"], [1, "cobranza-total-card__folio"], [1, "cobranza-total-card__date"], [1, "cobranza-total-card__amount"], [1, "cobranza-total-card__meta"], [1, "cobranza-block"], [1, "cobranza-block__title"], [1, "cobranza-customer-options"], [1, "cobranza-radio"], ["type", "radio", "name", "customerMode", 3, "change", "checked"], [1, "cobranza-radio__icon"], [1, "cobranza-radio__text"], ["type", "button", 1, "cobranza-customer-pick"], ["role", "tablist", 1, "cobranza-pay-tabs"], ["type", "button", 1, "cobranza-pay-tab", 3, "click"], [1, "cobranza-pay-form"], [1, "cobranza-form-error"], [1, "cobranza-collect-actions"], ["type", "button", 1, "cobranza-action", "cobranza-action--ghost", 3, "click", "disabled"], ["type", "button", 1, "cobranza-action", "cobranza-action--primary", 3, "click", "disabled"], [1, "cobranza-action__amount"], ["type", "button", 1, "cobranza-customer-pick", 3, "click"], [1, "cobranza-customer-pick__avatar"], [1, "cobranza-customer-pick__body"], [1, "cobranza-customer-pick__label"], [1, "cobranza-customer-pick__name"], [1, "cobranza-cash-hint"], [1, "cobranza-cash-currencies"], [1, "cobranza-cash-currency", "cobranza-cash-currency--mxn"], [1, "cobranza-cash-currency__title"], [1, "cobranza-bill-btns"], ["type", "button", 1, "cobranza-bill-btn", 3, "cobranza-bill-btn--on"], [1, "cobranza-manual-received"], ["type", "number", "min", "0", "step", "0.01", "placeholder", "0.00", 1, "cobranza-field__input", "cobranza-field__input--highlight", 3, "ngModelChange", "ngModel"], [1, "cobranza-cash-total"], [1, "cobranza-cash-currency", "cobranza-cash-currency--usd"], [1, "cobranza-cash-currency__head"], [1, "cobranza-tc-badge"], [1, "cobranza-tc-badge", "cobranza-tc-badge--edit"], ["type", "button", 1, "cobranza-bill-btn", "cobranza-bill-btn--usd", 3, "cobranza-bill-btn--on"], [1, "cobranza-cash-result"], [1, "cobranza-cash-result__item", "cobranza-cash-result__item--warn"], [1, "cobranza-cash-result__item"], [1, "cobranza-cash-result__values"], [1, "cobranza-cash-result__change"], ["type", "button", 1, "cobranza-bill-btn", 3, "click"], [1, "cobranza-bill-btn__count"], ["type", "number", "min", "0", "step", "0.0001", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "cobranza-bill-btn", "cobranza-bill-btn--usd", 3, "click"], [1, "cobranza-field"], ["type", "number", "min", "0", "step", "0.01", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "SPEI-123456", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "\xDAltimos 4 d\xEDgitos", 3, "ngModelChange", "ngModel"], [1, "cobranza-pay-progress"], [1, "cobranza-pay-progress__track"], [1, "cobranza-pay-progress__fill"], [1, "cobranza-pay-progress__labels"], [1, "cobranza-field-grid", "cobranza-field-grid--2"], ["type", "number", "min", "0", "step", "0.01", 1, "cobranza-field__input--highlight", 3, "ngModelChange", "ngModel"], [1, "cobranza-quick-btns", "cobranza-quick-btns--inline"], ["type", "button", 1, "cobranza-quick-btn", 3, "click"], [1, "cobranza-cash-result", 3, "cobranza-cash-result--change", "cobranza-cash-result--short"], [1, "cobranza-empty-state__icon", 3, "img"], [1, "cobranza-panel__head-actions"], ["type", "button", 1, "cobranza-head-btn", "cobranza-head-btn--print", 3, "click", "disabled"], [1, "cobranza-empty", "cobranza-empty--inline"], [1, "cobranza-detail-list"], [1, "cobranza-detail-list__highlight"]], template: function PaymentComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1, 0)(2, "header", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "lucide-icon", 6);
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8, "Cobranza POS");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275conditionalCreate(10, PaymentComponent_Conditional_10_Template, 2, 0, "span", 8)(11, PaymentComponent_Conditional_11_Template, 6, 3)(12, PaymentComponent_Conditional_12_Template, 3, 0, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 10)(14, "button", 11);
      \u0275\u0275listener("click", function PaymentComponent_Template_button_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openPrinterSettings());
      });
      \u0275\u0275element(15, "lucide-icon", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 13);
      \u0275\u0275listener("click", function PaymentComponent_Template_button_click_16_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleFullscreen());
      });
      \u0275\u0275element(17, "lucide-icon", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 14);
      \u0275\u0275element(19, "lucide-icon", 15);
      \u0275\u0275elementStart(20, "span", 16);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275conditionalCreate(22, PaymentComponent_Conditional_22_Template, 9, 1, "section", 17);
      \u0275\u0275conditionalCreate(23, PaymentComponent_Conditional_23_Template, 34, 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_9_0;
      \u0275\u0275classProp("pos-take-root--fullscreen", ctx.isFullscreen());
      \u0275\u0275advance(6);
      \u0275\u0275property("img", ctx.Wallet);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.posState.checkingShift() ? 10 : (tmp_3_0 = ctx.shiftOpen() && ctx.shift()) ? 11 : 12, tmp_3_0);
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.Printer);
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.isFullscreen() ? ctx.Minimize2 : ctx.Maximize2);
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.Monitor);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.terminalLabel());
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.shiftOpen() && !ctx.posState.checkingShift() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_9_0 = ctx.shiftOpen() && ctx.shift()) ? 23 : -1, tmp_9_0);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, LucideAngularModule, LucideAngularComponent], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  --pos-bg: #0f172a;\n  --pos-surface: #ffffff;\n  --pos-muted: #64748b;\n  --pos-border: #e5e7eb;\n  --pos-accent: #6366f1;\n  --pos-accent2: #8b5cf6;\n  --pos-success: #10b981;\n  --pos-warn: #f59e0b;\n  --pos-radius: 12px;\n  --pos-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.12);\n  --pos-panel-x: 1.25rem;\n  --pos-panel-y: 1rem;\n  --pos-panel-head-h: 52px;\n  display: block;\n  min-height: 100%;\n}\n.pos-take-root[_ngcontent-%COMP%] {\n  height: calc(100vh - 0px);\n  display: flex;\n  flex-direction: column;\n  background: #f1f5f9;\n  padding: 0.65rem 0.75rem 0;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.pos-take-root--fullscreen[_ngcontent-%COMP%] {\n  width: 100vw;\n  height: 100vh;\n  padding: 0.55rem 0.65rem 0;\n}\n.pos-session-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      105deg,\n      #0f172a 0%,\n      #1e1b4b 45%,\n      #312e81 100%);\n  color: #f8fafc;\n  padding: 0.4rem clamp(0.75rem, 2vw, 1.25rem);\n  box-shadow: 0 2px 16px rgba(15, 23, 42, 0.28);\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n.pos-shift-banner[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0.75rem;\n  padding: 0.55rem 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.pos-shift-banner--queue[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  border: 1px solid #fed7aa;\n  color: #9a3412;\n}\n.pos-shift-banner--open[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #065f46;\n}\n.pos-session-bar__content[_ngcontent-%COMP%] {\n  max-width: 1680px;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.45rem 0.85rem;\n  justify-content: space-between;\n  min-height: 40px;\n}\n.pos-session-bar__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem 1.35rem;\n  padding-left: 0.15rem;\n}\n.pos-session-bar__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  letter-spacing: -0.02em;\n}\n.pos-session-bar__title-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 18px;\n  height: 18px;\n  opacity: 0.95;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-session-bar__center[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem 0.75rem;\n  min-width: 200px;\n}\n.pos-session-bar__checking[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.85;\n}\n.pos-session-meta[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.75;\n}\n.pos-session-bar__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.pos-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  line-height: 1.2;\n  max-width: 100%;\n}\n.pos-pill--ok[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.2);\n  color: #a7f3d0;\n  border: 1px solid rgba(16, 185, 129, 0.35);\n}\n.pos-pill--warn[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fde68a;\n  border: 1px solid rgba(245, 158, 11, 0.35);\n}\n.pos-terminal-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: rgba(99, 102, 241, 0.35);\n  padding: 0.28rem 0.65rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  border: 1px solid rgba(165, 180, 252, 0.35);\n  line-height: 1.2;\n}\n.pos-session-bar[_ngcontent-%COMP%]   .pos-btn[_ngcontent-%COMP%] {\n  padding: 0.32rem 0.65rem;\n  font-size: 0.72rem;\n  border-radius: 8px;\n  gap: 0.35rem;\n}\n.pos-session-bar[_ngcontent-%COMP%]   .pos-btn--icon[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n}\n.pos-terminal-chip__label[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.pos-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  border: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s;\n  line-height: 1.2;\n}\n.pos-btn--primary[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #312e81;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);\n  padding: 0.38rem 0.75rem;\n  font-size: 0.78rem;\n}\n.pos-btn--primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);\n}\n.pos-btn--ghost[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fecaca;\n  border: 1px solid rgba(248, 113, 113, 0.35);\n}\n.pos-btn--ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(248, 113, 113, 0.2);\n}\n.pos-btn--icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n}\n.pos-btn--muted[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #64748b;\n  border: 1px solid var(--pos-border);\n}\n.pos-btn--accent[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--pos-accent),\n      var(--pos-accent2));\n  color: #fff;\n  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);\n}\n.pos-btn--accent[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.pos-btn--lg[_ngcontent-%COMP%] {\n  padding: 0.65rem 1.25rem;\n  font-size: 0.9rem;\n}\n.pos-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.pos-ic[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-ic--sm[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.pos-ic--xs[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.pos-ic--btn[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.pos-session-bar[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-pill[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-terminal-chip[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n  flex-shrink: 0;\n}\n@media (max-width: 1024px) {\n  .pos-session-bar__content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .pos-session-bar__center[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .pos-session-bar__right[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-height: 0;\n}\n.cobranza-root.pos-take-root[_ngcontent-%COMP%] {\n  height: 100%;\n  min-height: 0;\n  max-height: 100%;\n}\n.cobranza-root[_ngcontent-%COMP%] {\n  min-height: 0;\n}\n.cobranza-open-shift[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n}\n.cobranza-open-shift__card[_ngcontent-%COMP%] {\n  max-width: 420px;\n  width: 100%;\n  text-align: center;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  padding: 2rem 1.5rem;\n  box-shadow: var(--pos-shadow);\n}\n.cobranza-open-shift__card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 0.5rem;\n  font-size: 1.25rem;\n  color: #0f172a;\n}\n.cobranza-open-shift__card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 1.25rem;\n  color: var(--pos-muted);\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n.cobranza-open-shift__icon[_ngcontent-%COMP%] {\n  width: 2.5rem;\n  height: 2.5rem;\n  color: #6366f1;\n  margin: 0 auto;\n  display: block;\n}\n.cobranza-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.65rem;\n  margin: 0.65rem 0 0.75rem;\n  padding: 0.75rem 1rem;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n}\n.cobranza-stat-chip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  padding-right: 1rem;\n  border-right: 1px solid var(--pos-border);\n}\n.cobranza-stat-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--pos-muted);\n}\n.cobranza-stat-chip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #0f172a;\n}\n.cobranza-stat-chip[_ngcontent-%COMP%]:last-of-type {\n  border-right: none;\n}\n.cobranza-toolbar__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: auto;\n  flex-wrap: wrap;\n}\n.cobranza-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: grid;\n  grid-template-columns: minmax(300px, 1.1fr) minmax(340px, 1fr);\n  gap: 0.75rem;\n  overflow: hidden;\n}\n.cobranza-dashboard-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin: 0.65rem 0 0.75rem;\n  padding: 0.25rem;\n  background: #fff;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  box-shadow: var(--pos-shadow);\n}\n.cobranza-dashboard-tab[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  padding: 0.55rem 0.75rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #64748b;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  transition: background 0.15s, color 0.15s;\n}\n.cobranza-dashboard-tab[_ngcontent-%COMP%]:hover {\n  color: #334155;\n  background: #f8fafc;\n}\n.cobranza-dashboard-tab--active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #eef2ff 0%,\n      #e0e7ff 100%);\n  color: #4338ca;\n  box-shadow: inset 0 0 0 1px #c7d2fe;\n}\n.cobranza-dashboard-tab__badge[_ngcontent-%COMP%] {\n  min-width: 1.25rem;\n  height: 1.25rem;\n  padding: 0 0.35rem;\n  border-radius: 999px;\n  background: #4f46e5;\n  color: #fff;\n  font-size: 0.68rem;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.cobranza-dashboard-tab__badge--muted[_ngcontent-%COMP%] {\n  background: #e2e8f0;\n  color: #475569;\n}\n.cobranza-collected-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  flex-shrink: 0;\n  padding: 0.75rem 1rem;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #ecfdf5 0%,\n      #d1fae5 100%);\n  border: 1px solid #a7f3d0;\n  box-shadow: 0 1px 3px rgba(16, 185, 129, 0.08);\n}\n.cobranza-collected-summary__icon-wrap[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid #a7f3d0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  color: #059669;\n}\n.cobranza-collected-summary__icon[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.cobranza-collected-summary__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.cobranza-collected-summary__label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #047857;\n}\n.cobranza-collected-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 800;\n  color: #065f46;\n  letter-spacing: -0.02em;\n  line-height: 1.2;\n}\n.cobranza-collected-summary__icon[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.cobranza-collected-summary__icon-wrap[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  display: block;\n}\n.cobranza-pay-chip[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  padding: 0.12rem 0.45rem;\n  border-radius: 999px;\n  background: #e0e7ff;\n  color: #4338ca;\n}\n.cobranza-sale--collected[_ngcontent-%COMP%] {\n  background: #fff;\n}\n.cobranza-detail-list[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.cobranza-detail-list[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 0.85rem;\n}\n.cobranza-detail-list[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: var(--pos-muted);\n  font-weight: 500;\n}\n.cobranza-detail-list[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  font-weight: 600;\n  color: #111827;\n  text-align: right;\n}\n.cobranza-detail-list__highlight[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  margin: 0 -0.5rem;\n  padding: 0.5rem !important;\n  border-radius: 8px;\n  border-bottom: none !important;\n}\n.cobranza-detail-list__highlight[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  color: #059669;\n  font-size: 1rem;\n}\n.cobranza-empty--inline[_ngcontent-%COMP%] {\n  padding: 1rem 0;\n  margin: 0;\n  text-align: left;\n}\n.cobranza-panel__head-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n.cobranza-head-btn--print[_ngcontent-%COMP%] {\n  color: #4338ca;\n  border-color: #c7d2fe;\n  background: #eef2ff;\n}\n.cobranza-head-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.cobranza-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.cobranza-panel__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid var(--pos-border);\n  flex-shrink: 0;\n}\n.cobranza-panel__head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.cobranza-panel__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.cobranza-panel__title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n}\n.cobranza-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 1.4rem;\n  height: 1.4rem;\n  padding: 0 0.35rem;\n  border-radius: 999px;\n  background: #4f46e5;\n  color: #fff;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n.cobranza-refresh-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  border-radius: 9px;\n  border: 1px solid #fca5a5;\n  background: #fff;\n  color: #dc2626;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.cobranza-refresh-btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.cobranza-refresh-btn[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n  border-color: #f87171;\n  color: #b91c1c;\n}\n.cobranza-search[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-height: 38px;\n  padding: 0 0.75rem;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  background: #f8fafc;\n  flex-shrink: 0;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background 0.15s;\n}\n.cobranza-search[_ngcontent-%COMP%]:focus-within {\n  border-color: #6366f1;\n  background: #fff;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n.cobranza-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  width: 100%;\n  box-sizing: border-box;\n  border: none;\n  background: transparent;\n  padding: 0.55rem 0;\n  font-size: 0.875rem;\n  color: #0f172a;\n}\n.cobranza-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.cobranza-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #94a3b8;\n}\n.cobranza-search__icon[_ngcontent-%COMP%] {\n  position: static;\n  transform: none;\n  width: 1rem;\n  height: 1rem;\n  color: #94a3b8;\n  pointer-events: none;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.cobranza-search[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.cobranza-refresh-btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.cobranza-panel__content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  flex: 1;\n  padding: 1rem 1.15rem;\n  gap: 0.75rem;\n  overflow: hidden;\n}\n.cobranza-panel__content[_ngcontent-%COMP%]   .cobranza-search[_ngcontent-%COMP%] {\n  padding: 0 0.75rem;\n}\n.cobranza-panel__content[_ngcontent-%COMP%]   .cobranza-sales-scroll[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: 0;\n}\n.cobranza-sales-scroll[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.cobranza-sales[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.cobranza-sale[_ngcontent-%COMP%] {\n  width: 100%;\n  text-align: left;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.75rem 0.85rem;\n  background: #f8fafc;\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    box-shadow 0.15s;\n}\n.cobranza-sale[_ngcontent-%COMP%]:hover {\n  border-color: #a5b4fc;\n  background: #fff;\n}\n.cobranza-sale--selected[_ngcontent-%COMP%] {\n  border-color: #4f46e5;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #eef2ff 100%);\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.12);\n}\n.cobranza-sale__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n}\n.cobranza-sale__row--meta[_ngcontent-%COMP%] {\n  margin-top: 0.3rem;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n}\n.cobranza-sale__row--customer[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  font-size: 0.78rem;\n  color: #374151;\n}\n.cobranza-sale__total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #4f46e5;\n}\n.cobranza-chip[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  padding: 0.15rem 0.45rem;\n  border-radius: 999px;\n  background: #fef3c7;\n  color: #92400e;\n}\n.cobranza-detail[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 0;\n}\n.cobranza-detail[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.45rem 0;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 0.85rem;\n}\n.cobranza-detail[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: var(--pos-muted);\n  font-weight: 500;\n}\n.cobranza-detail[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  font-weight: 600;\n  color: #111827;\n}\n.cobranza-panel--collect[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  min-height: 0;\n}\n.cobranza-panel__head--collect[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 1rem 1.15rem;\n  flex-shrink: 0;\n}\n.cobranza-panel__head--collect[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.cobranza-panel__sub[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n}\n.cobranza-head-btn[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  background: #fff;\n  color: #64748b;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.4rem 0.85rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    color 0.15s,\n    border-color 0.15s;\n}\n.cobranza-head-btn[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n  color: #334155;\n  border-color: #cbd5e1;\n}\n.cobranza-collect-scroll[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.cobranza-collect-body[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n  flex: 1 0 auto;\n}\n.cobranza-total-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);\n}\n.cobranza-total-card__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.65rem 1rem;\n  background: #f8fafc;\n  border-bottom: 1px solid #f1f5f9;\n}\n.cobranza-total-card__folio[_ngcontent-%COMP%] {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 0.8rem;\n  font-weight: 700;\n  color: #334155;\n  letter-spacing: 0.02em;\n}\n.cobranza-total-card__date[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  white-space: nowrap;\n}\n.cobranza-total-card__amount[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1rem 0.85rem;\n  border-bottom: 1px solid #f1f5f9;\n}\n.cobranza-total-card__amount[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--pos-muted);\n}\n.cobranza-total-card__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 800;\n  color: #0f172a;\n  letter-spacing: -0.03em;\n  line-height: 1;\n}\n.cobranza-total-card__meta[_ngcontent-%COMP%] {\n  padding: 0.65rem 1rem 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.cobranza-total-card__meta[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.cobranza-total-card__meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--pos-muted);\n}\n.cobranza-total-card__meta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #374151;\n  font-weight: 600;\n  text-align: right;\n}\n.cobranza-block[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  padding: 0.85rem 1rem 1rem;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);\n}\n.cobranza-block__title[_ngcontent-%COMP%] {\n  margin: 0 0 0.65rem;\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: var(--pos-muted);\n}\n.cobranza-customer-pick[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-top: 0.5rem;\n  padding: 0.7rem 0.8rem;\n  border: 1px solid #e0e7ff;\n  border-radius: 10px;\n  background: #fafbff;\n  cursor: pointer;\n  text-align: left;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.cobranza-customer-pick[_ngcontent-%COMP%]:hover {\n  border-color: #a5b4fc;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);\n}\n.cobranza-customer-pick__avatar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 2.1rem;\n  height: 2.1rem;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  color: #fff;\n  font-size: 0.72rem;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.cobranza-customer-pick__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n}\n.cobranza-customer-pick__label[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #9ca3af;\n}\n.cobranza-customer-pick__name[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.cobranza-pay-tabs[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.35rem;\n  margin-bottom: 0.75rem;\n  padding: 0.25rem;\n  background: #f1f5f9;\n  border-radius: 10px;\n}\n.cobranza-pay-tab[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  padding: 0.5rem 0.35rem;\n  border-radius: 8px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    color 0.15s,\n    box-shadow 0.15s;\n}\n.cobranza-pay-tab[_ngcontent-%COMP%]:hover {\n  color: #334155;\n}\n.cobranza-pay-tab--active[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #4f46e5;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);\n}\n.cobranza-pay-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n}\n.cobranza-field-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n}\n.cobranza-field-grid--2[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr 1fr;\n}\n.cobranza-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.cobranza-field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.cobranza-field__hint[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-weight: 500;\n  color: #94a3b8;\n  margin-left: 0.35rem;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.cobranza-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  height: 40px;\n  border: 1px solid #e2e8f0;\n  border-radius: 9px;\n  padding: 0 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #0f172a;\n  background: #fff;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.cobranza-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);\n}\n.cobranza-field[_ngcontent-%COMP%]   input[readonly][_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #475569;\n  cursor: default;\n}\n.cobranza-field--tc[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  max-width: 160px;\n}\n.cobranza-change[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.65rem 0.85rem;\n  border-radius: 9px;\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n}\n.cobranza-change[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #047857;\n}\n.cobranza-change[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 800;\n  color: #059669;\n  letter-spacing: -0.02em;\n}\n.cobranza-change--warn[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border-color: #fecaca;\n}\n.cobranza-change--warn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n.cobranza-change--warn[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.cobranza-cash-hint[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  padding: 0.55rem 0.7rem;\n  border-radius: 8px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  font-size: 0.74rem;\n  line-height: 1.45;\n  color: #64748b;\n}\n.cobranza-cash-hint[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #334155;\n  font-weight: 700;\n}\n.cobranza-cash-currencies[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.cobranza-cash-currency__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.cobranza-tc-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.65rem;\n  font-weight: 800;\n  padding: 0.22rem 0.55rem;\n  border-radius: 999px;\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #047857;\n  white-space: nowrap;\n  letter-spacing: 0.02em;\n}\n.cobranza-tc-badge--edit[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.2rem;\n}\n.cobranza-tc-badge--edit[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 52px;\n  border: none;\n  background: transparent;\n  padding: 0;\n  font-size: 0.65rem;\n  font-weight: 800;\n  color: #047857;\n  text-align: right;\n}\n.cobranza-tc-badge--edit[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.cobranza-bill-btns[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n.cobranza-bill-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.2rem;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #475569;\n  font-size: 0.72rem;\n  font-weight: 700;\n  padding: 0.32rem 0.62rem;\n  border-radius: 999px;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    border-color 0.12s,\n    color 0.12s,\n    transform 0.08s;\n}\n.cobranza-bill-btn[_ngcontent-%COMP%]:hover {\n  border-color: #a5b4fc;\n  color: #4338ca;\n  background: #eef2ff;\n}\n.cobranza-bill-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.cobranza-bill-btn--on[_ngcontent-%COMP%] {\n  border-color: #6366f1;\n  background: #eef2ff;\n  color: #4338ca;\n  box-shadow: inset 0 0 0 1px #c7d2fe;\n}\n.cobranza-bill-btn--usd.cobranza-bill-btn--on[_ngcontent-%COMP%] {\n  border-color: #34d399;\n  background: #ecfdf5;\n  color: #047857;\n  box-shadow: inset 0 0 0 1px #a7f3d0;\n}\n.cobranza-bill-btn__count[_ngcontent-%COMP%] {\n  font-size: 0.62rem;\n  font-weight: 800;\n  opacity: 0.9;\n}\n.cobranza-manual-received[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.cobranza-manual-received[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.cobranza-manual-received[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n}\n.cobranza-cash-total[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.78rem;\n  color: #64748b;\n}\n.cobranza-cash-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-size: 0.9rem;\n}\n.cobranza-cash-mode[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.45rem;\n  margin-bottom: 0.75rem;\n}\n.cobranza-cash-mode__btn[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #64748b;\n  font-size: 0.76rem;\n  font-weight: 700;\n  padding: 0.45rem 0.65rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    border-color 0.12s,\n    color 0.12s;\n}\n.cobranza-cash-mode__btn--active[_ngcontent-%COMP%] {\n  background: #eef2ff;\n  border-color: #a5b4fc;\n  color: #4338ca;\n}\n.cobranza-cash-currency[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n  padding: 0.75rem;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n}\n.cobranza-cash-currency--mxn[_ngcontent-%COMP%] {\n  border-color: #bfdbfe;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fbff 0%,\n      #fff 100%);\n}\n.cobranza-cash-currency--usd[_ngcontent-%COMP%] {\n  border-color: #bbf7d0;\n  background:\n    linear-gradient(\n      180deg,\n      #f7fef9 0%,\n      #fff 100%);\n}\n.cobranza-cash-currency__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.78rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #334155;\n}\n.cobranza-cash-currency__due[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  padding: 0.55rem 0.65rem;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid #e2e8f0;\n}\n.cobranza-cash-currency__due[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.cobranza-cash-currency__due[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 800;\n  color: #0f172a;\n  letter-spacing: -0.02em;\n}\n.cobranza-cash-currency__due[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 120px;\n  box-sizing: border-box;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 0.35rem 0.5rem;\n  font-size: 0.95rem;\n  font-weight: 800;\n  color: #0f172a;\n  text-align: right;\n  background: #fff;\n}\n.cobranza-cash-currency__due[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n.cobranza-cash-currency__received[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  padding: 0.65rem;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px dashed #cbd5e1;\n}\n.cobranza-cash-currency__received-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #475569;\n}\n.cobranza-cash-currency[_ngcontent-%COMP%]   .cobranza-field__input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid var(--pos-border);\n  border-radius: 8px;\n  padding: 0.5rem 0.65rem;\n  font-size: 0.875rem;\n  background: #fff;\n}\n.cobranza-cash-currency[_ngcontent-%COMP%]   .cobranza-field__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n@media (max-width: 720px) {\n  .cobranza-cash-currencies[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.cobranza-received-block[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border-radius: 10px;\n  background: #f8fafc;\n  border: 1px dashed #cbd5e1;\n}\n.cobranza-received-block__head[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-bottom: 0.65rem;\n}\n.cobranza-received-block__head[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #334155;\n}\n.cobranza-quick-btns[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n.cobranza-quick-btns--inline[_ngcontent-%COMP%] {\n  margin-top: -0.25rem;\n}\n.cobranza-quick-btn[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #475569;\n  font-size: 0.68rem;\n  font-weight: 700;\n  padding: 0.28rem 0.55rem;\n  border-radius: 999px;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    border-color 0.12s,\n    color 0.12s;\n}\n.cobranza-quick-btn[_ngcontent-%COMP%]:hover {\n  border-color: #a5b4fc;\n  color: #4f46e5;\n  background: #eef2ff;\n}\n.cobranza-quick-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  transform: none;\n}\n.cobranza-field__input--highlight[_ngcontent-%COMP%] {\n  border-color: #c7d2fe !important;\n  background: #fff !important;\n  font-size: 1.05rem !important;\n}\n.cobranza-cash-result[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  padding: 0.75rem 0.85rem;\n  border-radius: 10px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n}\n.cobranza-cash-result--change[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ecfdf5 0%,\n      #d1fae5 100%);\n  border-color: #6ee7b7;\n  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);\n}\n.cobranza-cash-result--short[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #fffbeb 0%,\n      #fef3c7 100%);\n  border-color: #fcd34d;\n}\n.cobranza-cash-result__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.cobranza-cash-result__item[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.cobranza-cash-result__item--warn[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #b45309;\n}\n.cobranza-cash-result__values[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.15rem;\n}\n.cobranza-cash-result__change[_ngcontent-%COMP%] {\n  font-size: 1.35rem !important;\n  font-weight: 800 !important;\n  color: #047857 !important;\n  letter-spacing: -0.03em;\n  line-height: 1.1;\n}\n.cobranza-cash-result--change[_ngcontent-%COMP%]   .cobranza-cash-result__item[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: #065f46;\n  font-weight: 700;\n}\n.cobranza-pay-progress[_ngcontent-%COMP%] {\n  padding: 0.65rem 0.75rem;\n  border-radius: 10px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n}\n.cobranza-pay-progress__track[_ngcontent-%COMP%] {\n  height: 6px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  overflow: hidden;\n  margin-bottom: 0.5rem;\n}\n.cobranza-pay-progress__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      90deg,\n      #818cf8,\n      #6366f1);\n  transition: width 0.2s ease;\n}\n.cobranza-pay-progress__fill--ok[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #34d399,\n      #10b981);\n}\n.cobranza-pay-progress__labels[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.cobranza-pay-progress__labels[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.cobranza-pay-progress__labels[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 800;\n  color: #334155;\n}\n.cobranza-pay-progress__labels[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #94a3b8;\n  margin-left: 0.25rem;\n}\n.cobranza-pay-progress__ok[_ngcontent-%COMP%] {\n  color: #059669 !important;\n}\n.cobranza-form-error[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.55rem 0.75rem;\n  border-radius: 8px;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #b91c1c;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.cobranza-collect-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n  padding: 0.85rem 1rem 1rem;\n  background: #fff;\n  border-top: 1px solid var(--pos-border);\n  flex-shrink: 0;\n  margin-top: auto;\n}\n.cobranza-action[_ngcontent-%COMP%] {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  min-height: 46px;\n  border-radius: 10px;\n  font-size: 0.88rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    opacity 0.15s;\n}\n.cobranza-action[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.cobranza-action--ghost[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #475569;\n}\n.cobranza-action--ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f8fafc;\n}\n.cobranza-action--primary[_ngcontent-%COMP%] {\n  flex: 1.4;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #4f46e5 0%,\n      #6366f1 100%);\n  color: #fff;\n  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);\n}\n.cobranza-action--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(1.05);\n}\n.cobranza-action__amount[_ngcontent-%COMP%] {\n  padding: 0.15rem 0.5rem;\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.82rem;\n  font-weight: 800;\n}\n.cobranza-customer-options[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.5rem;\n  margin-bottom: 0;\n}\n.cobranza-radio[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  padding: 0.65rem 0.7rem;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  background: #fafafa;\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    box-shadow 0.15s;\n}\n.cobranza-radio[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n.cobranza-radio--on[_ngcontent-%COMP%] {\n  border-color: #818cf8;\n  background: #fff;\n  box-shadow: 0 0 0 1px #c7d2fe;\n}\n.cobranza-radio__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 1.75rem;\n  height: 1.75rem;\n  border-radius: 8px;\n  background: #f1f5f9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #6366f1;\n}\n.cobranza-radio__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.cobranza-radio__text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #111827;\n}\n.cobranza-radio__text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  color: var(--pos-muted);\n}\n.cobranza-empty[_ngcontent-%COMP%], \n.cobranza-empty-state[_ngcontent-%COMP%] {\n  color: var(--pos-muted);\n  text-align: center;\n}\n.cobranza-empty[_ngcontent-%COMP%] {\n  padding: 2rem 1rem;\n  margin: 0;\n  font-size: 0.9rem;\n}\n.cobranza-empty-state[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1.5rem;\n}\n.cobranza-empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 0.35rem;\n  color: #0f172a;\n}\n.cobranza-empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  max-width: 280px;\n  line-height: 1.5;\n}\n.cobranza-empty-state__icon[_ngcontent-%COMP%] {\n  width: 2.25rem;\n  height: 2.25rem;\n  color: #c7d2fe;\n}\n@media (max-width: 1024px) {\n  .cobranza-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(240px, 35vh) minmax(0, 1fr);\n  }\n  .cobranza-stat-chip[_ngcontent-%COMP%] {\n    border-right: none;\n    padding-right: 0;\n  }\n  .cobranza-toolbar__actions[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-left: 0;\n  }\n  .cobranza-customer-options[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .cobranza-pay-tabs[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .cobranza-field-grid--2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .cobranza-total-card__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=payment.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentComponent, [{
    type: Component,
    args: [{ selector: "app-payment", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], template: `<div #posRoot class="pos-take-root cobranza-root" [class.pos-take-root--fullscreen]="isFullscreen()">\r
  <header class="pos-session-bar">\r
    <div class="pos-session-bar__content">\r
      <div class="pos-session-bar__left">\r
        <div class="pos-session-bar__title">\r
          <lucide-icon [img]="Wallet" class="pos-session-bar__title-icon" />\r
          <span>Cobranza POS</span>\r
        </div>\r
      </div>\r
\r
      <div class="pos-session-bar__center">\r
        @if (posState.checkingShift()) {\r
          <span class="pos-session-bar__checking">Verificando corte\u2026</span>\r
        } @else if (shiftOpen() && shift(); as currentShift) {\r
          <div class="pos-pill pos-pill--ok">\r
            <lucide-icon [img]="Package" class="pos-ic pos-ic--sm" />\r
            <span>Corte abierto</span>\r
          </div>\r
          <span class="pos-session-meta">{{ branchLabel() }} \xB7 Ventas {{ shiftSalesTotal(currentShift) }}</span>\r
        } @else {\r
          <div class="pos-pill pos-pill--warn">\r
            <span>Sin corte abierto</span>\r
          </div>\r
        }\r
      </div>\r
\r
      <div class="pos-session-bar__right">\r
        <button type="button" class="pos-btn pos-btn--ghost pos-btn--icon" (click)="openPrinterSettings()" title="Impresora t\xE9rmica">\r
          <lucide-icon [img]="Printer" class="pos-ic pos-ic--btn" />\r
        </button>\r
        <button type="button" class="pos-btn pos-btn--ghost pos-btn--icon" (click)="toggleFullscreen()">\r
          <lucide-icon [img]="isFullscreen() ? Minimize2 : Maximize2" class="pos-ic pos-ic--btn" />\r
        </button>\r
        <div class="pos-terminal-chip">\r
          <lucide-icon [img]="Monitor" class="pos-ic pos-ic--sm" />\r
          <span class="pos-terminal-chip__label">{{ terminalLabel() }}</span>\r
        </div>\r
      </div>\r
    </div>\r
  </header>\r
\r
  @if (!shiftOpen() && !posState.checkingShift()) {\r
    <section class="cobranza-open-shift">\r
      <div class="cobranza-open-shift__card">\r
        <lucide-icon [img]="Wallet" class="cobranza-open-shift__icon" />\r
        <h2>Abrir corte del d\xEDa</h2>\r
        <p>Registra el efectivo inicial para comenzar a cobrar ventas pendientes de la sucursal.</p>\r
        <button type="button" class="pos-btn pos-btn--primary pos-btn--lg" (click)="openDailyShift()">\r
          Abrir corte\r
        </button>\r
      </div>\r
    </section>\r
  }\r
\r
  @if (shiftOpen() && shift(); as currentShift) {\r
    <section class="cobranza-toolbar">\r
      <div class="cobranza-stat-chip">\r
        <span>Efectivo inicial</span>\r
        <strong>{{ shiftOpeningMxn(currentShift) }}</strong>\r
      </div>\r
      <div class="cobranza-stat-chip">\r
        <span>Ventas del d\xEDa</span>\r
        <strong>{{ shiftSalesTotal(currentShift) }}</strong>\r
      </div>\r
      <div class="cobranza-stat-chip">\r
        <span>Cortes parciales</span>\r
        <strong>{{ shiftPartialCount(currentShift) }}</strong>\r
      </div>\r
      <div class="cobranza-toolbar__actions">\r
        <button type="button" class="pos-btn pos-btn--ghost" (click)="openPartialShift()">Corte parcial</button>\r
        <button type="button" class="pos-btn pos-btn--muted" (click)="closeDailyShift()">Cerrar corte</button>\r
      </div>\r
    </section>\r
\r
    <nav class="cobranza-dashboard-tabs" aria-label="Secciones de cobranza">\r
      <button\r
        type="button"\r
        class="cobranza-dashboard-tab"\r
        [class.cobranza-dashboard-tab--active]="dashboardTab() === 'pending'"\r
        (click)="setDashboardTab('pending')">\r
        Por cobrar\r
        @if (pendingSales().length > 0) {\r
          <span class="cobranza-dashboard-tab__badge">{{ pendingSales().length }}</span>\r
        }\r
      </button>\r
      <button\r
        type="button"\r
        class="cobranza-dashboard-tab"\r
        [class.cobranza-dashboard-tab--active]="dashboardTab() === 'collected'"\r
        (click)="setDashboardTab('collected')">\r
        \xD3rdenes cobradas\r
        @if ((collectedSummary()?.count ?? collectedSales().length) > 0) {\r
          <span class="cobranza-dashboard-tab__badge cobranza-dashboard-tab__badge--muted">\r
            {{ collectedSummary()?.count ?? collectedSales().length }}\r
          </span>\r
        }\r
      </button>\r
    </nav>\r
\r
    <div class="cobranza-body">\r
      <aside class="cobranza-panel cobranza-panel--list">\r
        @if (dashboardTab() === 'pending') {\r
          <div class="cobranza-panel__head">\r
            <div class="cobranza-panel__title">\r
              <h2>Ventas por cobrar</h2>\r
              @if (pendingSales().length > 0) {\r
                <span class="cobranza-count">{{ pendingSales().length }}</span>\r
              }\r
            </div>\r
            <button type="button" class="cobranza-refresh-btn" (click)="refreshListPanel()" title="Actualizar">\r
              <lucide-icon [img]="RefreshCw" />\r
            </button>\r
          </div>\r
\r
          <div class="cobranza-panel__content">\r
          <div class="cobranza-search">\r
            <lucide-icon [img]="Search" class="cobranza-search__icon" />\r
            <input\r
              type="search"\r
              placeholder="Buscar folio o vendedor\u2026"\r
              [ngModel]="searchFolio()"\r
              (ngModelChange)="searchFolio.set($event)"\r
              autocomplete="off" />\r
          </div>\r
\r
          <div class="cobranza-sales-scroll">\r
            @if (loading()) {\r
              <p class="cobranza-empty">Cargando ventas\u2026</p>\r
            } @else if (filteredPendingSales().length === 0) {\r
              <p class="cobranza-empty">No hay ventas pendientes de cobro.</p>\r
            } @else {\r
              <ul class="cobranza-sales">\r
                @for (sale of filteredPendingSales(); track sale.id) {\r
                  <li>\r
                    <button\r
                      type="button"\r
                      class="cobranza-sale"\r
                      [class.cobranza-sale--selected]="selectedSale()?.id === sale.id"\r
                      (click)="selectSale(sale)">\r
                      <div class="cobranza-sale__row">\r
                        <strong>{{ sale.folio || sale.id.substring(0, 8) }}</strong>\r
                        <span class="cobranza-sale__total">{{ saleTotal(sale) }}</span>\r
                      </div>\r
                      <div class="cobranza-sale__row cobranza-sale__row--meta">\r
                        <span>{{ formatDate(sale.created_at) }}</span>\r
                        <span>{{ sellerLabel(sale) }}</span>\r
                      </div>\r
                      <div class="cobranza-sale__row cobranza-sale__row--customer">\r
                        <span>{{ customerLabel(sale) }}</span>\r
                        @if (sale.customer?.is_walk_in) {\r
                          <span class="cobranza-chip">Mostrador</span>\r
                        }\r
                      </div>\r
                    </button>\r
                  </li>\r
                }\r
              </ul>\r
            }\r
          </div>\r
          </div>\r
        } @else {\r
          <div class="cobranza-panel__head">\r
            <div class="cobranza-panel__title">\r
              <h2>\xD3rdenes cobradas</h2>\r
            </div>\r
            <button type="button" class="cobranza-refresh-btn" (click)="refreshListPanel()" title="Actualizar">\r
              <lucide-icon [img]="RefreshCw" />\r
            </button>\r
          </div>\r
\r
          <div class="cobranza-panel__content">\r
          <div class="cobranza-collected-summary">\r
            <span class="cobranza-collected-summary__icon-wrap" aria-hidden="true">\r
              <lucide-icon [img]="Receipt" class="cobranza-collected-summary__icon" />\r
            </span>\r
            <div class="cobranza-collected-summary__text">\r
              <span class="cobranza-collected-summary__label">Resumen del corte</span>\r
              <strong>{{ collectedSummaryLabel() }}</strong>\r
            </div>\r
          </div>\r
\r
          <div class="cobranza-search">\r
            <lucide-icon [img]="Search" class="cobranza-search__icon" />\r
            <input\r
              type="search"\r
              placeholder="Buscar folio, cliente o pago\u2026"\r
              [ngModel]="searchCollectedFolio()"\r
              (ngModelChange)="searchCollectedFolio.set($event)"\r
              autocomplete="off" />\r
          </div>\r
\r
          <div class="cobranza-sales-scroll">\r
            @if (loadingCollected()) {\r
              <p class="cobranza-empty">Cargando cobros\u2026</p>\r
            } @else if (filteredCollectedSales().length === 0) {\r
              <p class="cobranza-empty">No hay ventas cobradas en este corte.</p>\r
            } @else {\r
              <ul class="cobranza-sales">\r
                @for (item of filteredCollectedSales(); track item.collection_id || item.sales_order?.id) {\r
                  <li>\r
                    <button\r
                      type="button"\r
                      class="cobranza-sale cobranza-sale--collected"\r
                      [class.cobranza-sale--selected]="selectedCollectedSale()?.collection_id === item.collection_id || selectedCollectedSale()?.sales_order?.id === item.sales_order?.id"\r
                      (click)="selectCollectedSale(item)">\r
                      <div class="cobranza-sale__row">\r
                        <strong>{{ collectedSaleFolio(item) }}</strong>\r
                        <span class="cobranza-sale__total">{{ collectedSaleTotal(item) }}</span>\r
                      </div>\r
                      <div class="cobranza-sale__row cobranza-sale__row--meta">\r
                        <span>{{ formatDate(item.collected_at) }}</span>\r
                        <span class="cobranza-pay-chip">{{ paymentMethodLabel(item.payment?.payment_method) }}</span>\r
                      </div>\r
                      <div class="cobranza-sale__row cobranza-sale__row--customer">\r
                        <span>{{ collectedSaleCustomerLabel(item) }}</span>\r
                        <lucide-icon [img]="ChevronRight" class="pos-ic pos-ic--xs" />\r
                      </div>\r
                    </button>\r
                  </li>\r
                }\r
              </ul>\r
            }\r
          </div>\r
          </div>\r
        }\r
      </aside>\r
\r
      @if (dashboardTab() === 'pending') {\r
      <main class="cobranza-panel cobranza-panel--collect">\r
        @if (selectedSale(); as sale) {\r
          <div class="cobranza-collect-scroll">\r
            <div class="cobranza-panel__head cobranza-panel__head--collect">\r
              <div>\r
                <h2>Cobrar venta</h2>\r
                <p class="cobranza-panel__sub">{{ sale.folio || sale.id }}</p>\r
              </div>\r
              <button type="button" class="cobranza-head-btn" (click)="clearSelectedSale()">Cancelar</button>\r
            </div>\r
\r
            <div class="cobranza-collect-body">\r
            <section class="cobranza-total-card">\r
              <div class="cobranza-total-card__top">\r
                <span class="cobranza-total-card__folio">{{ sale.folio || sale.id }}</span>\r
                <time class="cobranza-total-card__date">{{ formatDate(sale.created_at) }}</time>\r
              </div>\r
              <div class="cobranza-total-card__amount">\r
                <span>Total a cobrar</span>\r
                <strong>{{ saleTotal(sale) }}</strong>\r
              </div>\r
              <div class="cobranza-total-card__meta">\r
                <div>\r
                  <span>Vendedor</span>\r
                  <strong>{{ sellerLabel(sale) }}</strong>\r
                </div>\r
              </div>\r
            </section>\r
\r
            <section class="cobranza-block">\r
              <h3 class="cobranza-block__title">Cliente</h3>\r
              <div class="cobranza-customer-options">\r
                <label class="cobranza-radio" [class.cobranza-radio--on]="customerMode() === 'walk_in'">\r
                  <input\r
                    type="radio"\r
                    name="customerMode"\r
                    [checked]="customerMode() === 'walk_in'"\r
                    (change)="setCustomerMode('walk_in')" />\r
                  <span class="cobranza-radio__icon">\r
                    <lucide-icon [img]="Store" class="pos-ic pos-ic--sm" />\r
                  </span>\r
                  <span class="cobranza-radio__text">\r
                    <strong>P\xFAblico en General</strong>\r
                    <span>Venta mostrador</span>\r
                  </span>\r
                </label>\r
\r
                <label class="cobranza-radio" [class.cobranza-radio--on]="customerMode() === 'registered'">\r
                  <input\r
                    type="radio"\r
                    name="customerMode"\r
                    [checked]="customerMode() === 'registered'"\r
                    (change)="setCustomerMode('registered')" />\r
                  <span class="cobranza-radio__icon">\r
                    <lucide-icon [img]="User" class="pos-ic pos-ic--sm" />\r
                  </span>\r
                  <span class="cobranza-radio__text">\r
                    <strong>Cliente registrado</strong>\r
                    <span>Buscar en cat\xE1logo</span>\r
                  </span>\r
                </label>\r
              </div>\r
\r
              @if (customerMode() === 'registered') {\r
                <button type="button" class="cobranza-customer-pick" (click)="openCustomerPicker()">\r
                  <span class="cobranza-customer-pick__avatar">\r
                    {{ selectedCustomerName().slice(0, 2).toUpperCase() }}\r
                  </span>\r
                  <span class="cobranza-customer-pick__body">\r
                    <span class="cobranza-customer-pick__label">Cliente seleccionado</span>\r
                    <span class="cobranza-customer-pick__name">{{ selectedCustomerName() }}</span>\r
                  </span>\r
                  <lucide-icon [img]="ChevronRight" class="pos-ic pos-ic--sm" />\r
                </button>\r
              }\r
            </section>\r
\r
            <section class="cobranza-block">\r
              <h3 class="cobranza-block__title">M\xE9todo de pago</h3>\r
\r
              <div class="cobranza-pay-tabs" role="tablist">\r
                <button\r
                  type="button"\r
                  class="cobranza-pay-tab"\r
                  [class.cobranza-pay-tab--active]="collectForm().paymentMethod === 'cash'"\r
                  (click)="setPaymentMethod('cash')">\r
                  Efectivo\r
                </button>\r
                <button\r
                  type="button"\r
                  class="cobranza-pay-tab"\r
                  [class.cobranza-pay-tab--active]="collectForm().paymentMethod === 'transfer'"\r
                  (click)="setPaymentMethod('transfer')">\r
                  Transferencia\r
                </button>\r
                <button\r
                  type="button"\r
                  class="cobranza-pay-tab"\r
                  [class.cobranza-pay-tab--active]="collectForm().paymentMethod === 'card'"\r
                  (click)="setPaymentMethod('card')">\r
                  Tarjeta\r
                </button>\r
                <button\r
                  type="button"\r
                  class="cobranza-pay-tab"\r
                  [class.cobranza-pay-tab--active]="collectForm().paymentMethod === 'mixed'"\r
                  (click)="setPaymentMethod('mixed')">\r
                  Mixto\r
                </button>\r
              </div>\r
\r
              <div class="cobranza-pay-form">\r
                @if (collectForm().paymentMethod === 'cash') {\r
                  <p class="cobranza-cash-hint">\r
                    Toca los billetes que entreg\xF3 el cliente o escribe el monto manual abajo. Puedes combinar pesos y d\xF3lares.\r
                  </p>\r
\r
                  <div class="cobranza-cash-currencies">\r
                    <section class="cobranza-cash-currency cobranza-cash-currency--mxn">\r
                      <h4 class="cobranza-cash-currency__title">Pesos (MXN)</h4>\r
\r
                      <div class="cobranza-bill-btns">\r
                        @for (denom of cashMxnDenominations; track denom) {\r
                          <button\r
                            type="button"\r
                            class="cobranza-bill-btn"\r
                            [class.cobranza-bill-btn--on]="getBillCount('MXN', denom) > 0"\r
                            (click)="tapBill('MXN', denom)">\r
                            \${{ denom }}\r
                            @if (getBillCount('MXN', denom) > 0) {\r
                              <span class="cobranza-bill-btn__count">\xD7{{ getBillCount('MXN', denom) }}</span>\r
                            }\r
                          </button>\r
                        }\r
                      </div>\r
\r
                      <label class="cobranza-manual-received">\r
                        <span>Monto manual recibido</span>\r
                        <input\r
                          type="number"\r
                          min="0"\r
                          step="0.01"\r
                          class="cobranza-field__input cobranza-field__input--highlight"\r
                          placeholder="0.00"\r
                          [ngModel]="cashManualMxn()"\r
                          (ngModelChange)="setManualCashReceived('MXN', parseMoneyInput($event))" />\r
                      </label>\r
                      <p class="cobranza-cash-total">Total recibido: <strong>{{ cashReceivedMxnLabel() }}</strong></p>\r
                    </section>\r
\r
                    <section class="cobranza-cash-currency cobranza-cash-currency--usd">\r
                      <div class="cobranza-cash-currency__head">\r
                        <h4 class="cobranza-cash-currency__title">D\xF3lares (USD)</h4>\r
                        @if (exchangeRateFromConfig()) {\r
                          <span class="cobranza-tc-badge">{{ exchangeRateBadgeLabel() }}</span>\r
                        } @else {\r
                          <label class="cobranza-tc-badge cobranza-tc-badge--edit">\r
                            TC $\r
                            <input\r
                              type="number"\r
                              min="0"\r
                              step="0.0001"\r
                              [ngModel]="collectForm().usdExchangeRate"\r
                              (ngModelChange)="onUsdExchangeRateChange($event)" />\r
                          </label>\r
                        }\r
                      </div>\r
\r
                      <div class="cobranza-bill-btns">\r
                        @for (denom of cashUsdDenominations; track denom) {\r
                          <button\r
                            type="button"\r
                            class="cobranza-bill-btn cobranza-bill-btn--usd"\r
                            [class.cobranza-bill-btn--on]="getBillCount('USD', denom) > 0"\r
                            (click)="tapBill('USD', denom)">\r
                            USD {{ denom }}\r
                            @if (getBillCount('USD', denom) > 0) {\r
                              <span class="cobranza-bill-btn__count">\xD7{{ getBillCount('USD', denom) }}</span>\r
                            }\r
                          </button>\r
                        }\r
                      </div>\r
\r
                      <label class="cobranza-manual-received">\r
                        <span>Monto manual recibido</span>\r
                        <input\r
                          type="number"\r
                          min="0"\r
                          step="0.01"\r
                          class="cobranza-field__input cobranza-field__input--highlight"\r
                          placeholder="0.00"\r
                          [ngModel]="cashManualUsd()"\r
                          (ngModelChange)="setManualCashReceived('USD', parseMoneyInput($event))" />\r
                      </label>\r
                      <p class="cobranza-cash-total">Total recibido: <strong>{{ cashReceivedUsdLabel() }}</strong></p>\r
                    </section>\r
                  </div>\r
\r
                  <div\r
                    class="cobranza-cash-result"\r
                    [class.cobranza-cash-result--change]="changeMxn() > 0 || changeUsd() > 0"\r
                    [class.cobranza-cash-result--short]="cashShortfallMxn() > 0">\r
                    @if (cashShortfallMxn() > 0) {\r
                      <div class="cobranza-cash-result__item cobranza-cash-result__item--warn">\r
                        <span>Falta por recibir</span>\r
                        <strong>{{ formatCurrency(cashShortfallMxn()) }}</strong>\r
                      </div>\r
                    }\r
                    <div class="cobranza-cash-result__item">\r
                      <span>Cambio a entregar</span>\r
                      <div class="cobranza-cash-result__values">\r
                        @if (changeMxn() > 0) {\r
                          <strong class="cobranza-cash-result__change">{{ formatCurrency(changeMxn()) }}</strong>\r
                        }\r
                        @if (changeUsd() > 0) {\r
                          <strong class="cobranza-cash-result__change">{{ formatCurrencyUsd(changeUsd()) }}</strong>\r
                        }\r
                        @if (changeMxn() <= 0 && changeUsd() <= 0) {\r
                          <strong class="cobranza-cash-result__change">{{ formatCurrency(0) }}</strong>\r
                        }\r
                      </div>\r
                    </div>\r
                  </div>\r
                }\r
\r
                @if (collectForm().paymentMethod === 'transfer') {\r
                  <label class="cobranza-field">\r
                    <span>Monto MXN</span>\r
                    <input\r
                      type="number"\r
                      min="0"\r
                      step="0.01"\r
                      [ngModel]="collectForm().amountTransferMxn"\r
                      (ngModelChange)="patchCollectForm({ amountTransferMxn: +$event })" />\r
                  </label>\r
                  <label class="cobranza-field">\r
                    <span>Referencia SPEI</span>\r
                    <input\r
                      type="text"\r
                      placeholder="SPEI-123456"\r
                      [ngModel]="collectForm().transferReference"\r
                      (ngModelChange)="patchCollectForm({ transferReference: $event })" />\r
                  </label>\r
                }\r
\r
                @if (collectForm().paymentMethod === 'card') {\r
                  <label class="cobranza-field">\r
                    <span>Monto MXN</span>\r
                    <input\r
                      type="number"\r
                      min="0"\r
                      step="0.01"\r
                      [ngModel]="collectForm().amountCardMxn"\r
                      (ngModelChange)="patchCollectForm({ amountCardMxn: +$event })" />\r
                  </label>\r
                  <label class="cobranza-field">\r
                    <span>Referencia (opcional)</span>\r
                    <input\r
                      type="text"\r
                      placeholder="\xDAltimos 4 d\xEDgitos"\r
                      [ngModel]="collectForm().cardReference"\r
                      (ngModelChange)="patchCollectForm({ cardReference: $event })" />\r
                  </label>\r
                }\r
\r
                @if (collectForm().paymentMethod === 'mixed') {\r
                  <div class="cobranza-pay-progress">\r
                    <div class="cobranza-pay-progress__track">\r
                      <div\r
                        class="cobranza-pay-progress__fill"\r
                        [class.cobranza-pay-progress__fill--ok]="amountsOk()"\r
                        [style.width.%]="appliedProgress()"></div>\r
                    </div>\r
                    <div class="cobranza-pay-progress__labels">\r
                      <span>Suma aplicada</span>\r
                      <strong [class.cobranza-pay-progress__ok]="amountsOk()">\r
                        {{ formatCurrency(appliedTotal()) }}\r
                        <em>de {{ saleTotal(sale) }}</em>\r
                      </strong>\r
                    </div>\r
                  </div>\r
\r
                  <div class="cobranza-field-grid cobranza-field-grid--2">\r
                    <label class="cobranza-field">\r
                      <span>Efectivo MXN</span>\r
                      <input\r
                        type="number"\r
                        min="0"\r
                        step="0.01"\r
                        [ngModel]="collectForm().mixedCashMxn"\r
                        (ngModelChange)="patchCollectForm({ mixedCashMxn: parseMoneyInput($event) })" />\r
                    </label>\r
                    <label class="cobranza-field">\r
                      <span>Recibi\xF3 MXN</span>\r
                      <input\r
                        type="number"\r
                        min="0"\r
                        step="0.01"\r
                        class="cobranza-field__input--highlight"\r
                        [ngModel]="collectForm().mixedReceivedMxn"\r
                        (ngModelChange)="patchCollectForm({ mixedReceivedMxn: parseMoneyInput($event) })" />\r
                    </label>\r
                  </div>\r
\r
                  <div class="cobranza-quick-btns cobranza-quick-btns--inline">\r
                    <button type="button" class="cobranza-quick-btn" (click)="setExactCashReceived()">Exacto</button>\r
                    <button type="button" class="cobranza-quick-btn" (click)="addReceivedCash(50)">+$50</button>\r
                    <button type="button" class="cobranza-quick-btn" (click)="addReceivedCash(100)">+$100</button>\r
                    <button type="button" class="cobranza-quick-btn" (click)="addReceivedCash(200)">+$200</button>\r
                    <button type="button" class="cobranza-quick-btn" (click)="addReceivedCash(500)">+$500</button>\r
                  </div>\r
\r
                  <label class="cobranza-field">\r
                    <span>Transferencia MXN</span>\r
                    <input\r
                      type="number"\r
                      min="0"\r
                      step="0.01"\r
                      [ngModel]="collectForm().mixedTransferMxn"\r
                      (ngModelChange)="patchCollectForm({ mixedTransferMxn: parseMoneyInput($event) })" />\r
                  </label>\r
                  @if (collectForm().mixedTransferMxn > 0) {\r
                    <label class="cobranza-field">\r
                      <span>Referencia SPEI</span>\r
                      <input\r
                        type="text"\r
                        placeholder="SPEI-123456"\r
                        [ngModel]="collectForm().mixedTransferRef"\r
                        (ngModelChange)="patchCollectForm({ mixedTransferRef: $event })" />\r
                    </label>\r
                  }\r
\r
                  @if (collectForm().mixedCashMxn > 0) {\r
                    <div\r
                      class="cobranza-cash-result"\r
                      [class.cobranza-cash-result--change]="changeMxn() > 0"\r
                      [class.cobranza-cash-result--short]="cashShortfallMxn() > 0">\r
                      @if (cashShortfallMxn() > 0) {\r
                        <div class="cobranza-cash-result__item cobranza-cash-result__item--warn">\r
                          <span>Falta por recibir</span>\r
                          <strong>{{ formatCurrency(cashShortfallMxn()) }}</strong>\r
                        </div>\r
                      }\r
                      <div class="cobranza-cash-result__item">\r
                        <span>Cambio a entregar</span>\r
                        <strong class="cobranza-cash-result__change">{{ formatCurrency(changeMxn()) }}</strong>\r
                      </div>\r
                    </div>\r
                  }\r
                }\r
\r
                @if (collectError()) {\r
                  <p class="cobranza-form-error">{{ collectError() }}</p>\r
                }\r
              </div>\r
            </section>\r
            </div>\r
\r
            <div class="cobranza-collect-actions">\r
              <button type="button" class="cobranza-action cobranza-action--ghost" (click)="clearSelectedSale()" [disabled]="collecting()">\r
                Cancelar\r
              </button>\r
              <button\r
                type="button"\r
                class="cobranza-action cobranza-action--primary"\r
                (click)="collectSelected()"\r
                [disabled]="collecting() || printingReceipt() || !amountsOk()">\r
                {{ collecting() || printingReceipt() ? 'Cobrando\u2026' : 'Confirmar cobro' }}\r
                <span class="cobranza-action__amount">{{ saleTotal(sale) }}</span>\r
              </button>\r
            </div>\r
          </div>\r
        } @else {\r
          <div class="cobranza-empty-state">\r
            <lucide-icon [img]="Wallet" class="cobranza-empty-state__icon" />\r
            <h3>Selecciona una venta</h3>\r
            <p>Elige una orden de la lista para asignar cliente y m\xE9todo de pago.</p>\r
          </div>\r
        }\r
      </main>\r
      } @else {\r
      <main class="cobranza-panel cobranza-panel--collect">\r
        @if (selectedCollectedSale(); as item) {\r
          <div class="cobranza-collect-scroll">\r
            <div class="cobranza-panel__head cobranza-panel__head--collect">\r
              <div>\r
                <h2>Detalle del cobro</h2>\r
                <p class="cobranza-panel__sub">{{ collectedSaleFolio(item) }}</p>\r
              </div>\r
              <div class="cobranza-panel__head-actions">\r
                <button\r
                  type="button"\r
                  class="cobranza-head-btn"\r
                  (click)="previewTicket(item)">\r
                  <lucide-icon [img]="Eye" class="pos-ic pos-ic--sm" />\r
                  Ver ticket\r
                </button>\r
                <button\r
                  type="button"\r
                  class="cobranza-head-btn cobranza-head-btn--print"\r
                  (click)="reprintTicket(item)"\r
                  [disabled]="printingReceipt()">\r
                  <lucide-icon [img]="Printer" class="pos-ic pos-ic--sm" />\r
                  {{ printingReceipt() ? 'Imprimiendo\u2026' : 'Reimprimir ticket' }}\r
                </button>\r
                <button type="button" class="cobranza-head-btn" (click)="clearSelectedCollected()">\r
                  <lucide-icon [img]="ChevronLeft" class="pos-ic pos-ic--sm" />\r
                  Volver\r
                </button>\r
              </div>\r
            </div>\r
\r
            <div class="cobranza-collect-body">\r
            <section class="cobranza-total-card">\r
              <div class="cobranza-total-card__top">\r
                <span class="cobranza-total-card__folio">{{ collectedSaleFolio(item) }}</span>\r
                <time class="cobranza-total-card__date">{{ formatDate(item.collected_at) }}</time>\r
              </div>\r
              <div class="cobranza-total-card__amount">\r
                <span>Total cobrado</span>\r
                <strong>{{ collectedSaleTotal(item) }}</strong>\r
              </div>\r
              <div class="cobranza-total-card__meta">\r
                <div>\r
                  <span>M\xE9todo</span>\r
                  <strong>{{ paymentMethodLabel(item.payment?.payment_method) }}</strong>\r
                </div>\r
                <div>\r
                  <span>Cliente</span>\r
                  <strong>{{ collectedSaleCustomerLabel(item) }}</strong>\r
                </div>\r
                <div>\r
                  <span>Cobr\xF3</span>\r
                  <strong>{{ collectedByLabel(item) }}</strong>\r
                </div>\r
                @if (collectedSaleSellerLabel(item) !== '\u2014') {\r
                  <div>\r
                    <span>Vendedor</span>\r
                    <strong>{{ collectedSaleSellerLabel(item) }}</strong>\r
                  </div>\r
                }\r
              </div>\r
            </section>\r
\r
            <section class="cobranza-block">\r
              <h3 class="cobranza-block__title">Desglose de pago</h3>\r
              @if (loadingCollectionDetail()) {\r
                <p class="cobranza-empty cobranza-empty--inline">Cargando detalle\u2026</p>\r
              } @else {\r
                @if (collectionDetailPayment(); as pay) {\r
                  <dl class="cobranza-detail-list">\r
                    @if (pay['amount_cash_mxn'] != null && +pay['amount_cash_mxn'] > 0) {\r
                      <div><dt>Efectivo MXN</dt><dd>{{ moneyLabel(pay['amount_cash_mxn']) }}</dd></div>\r
                    }\r
                    @if (pay['amount_cash_usd'] != null && +pay['amount_cash_usd'] > 0) {\r
                      <div><dt>Efectivo USD</dt><dd>{{ formatCurrencyUsd(+pay['amount_cash_usd']) }}</dd></div>\r
                    }\r
                    @if (pay['usd_exchange_rate'] != null && +pay['usd_exchange_rate'] > 0) {\r
                      <div><dt>Tipo de cambio</dt><dd>{{ pay['usd_exchange_rate'] }}</dd></div>\r
                    }\r
                    @if (pay['amount_transfer_mxn'] != null && +pay['amount_transfer_mxn'] > 0) {\r
                      <div><dt>Transferencia</dt><dd>{{ moneyLabel(pay['amount_transfer_mxn']) }}</dd></div>\r
                    }\r
                    @if (pay['transfer_reference']) {\r
                      <div><dt>Ref. SPEI</dt><dd>{{ pay['transfer_reference'] }}</dd></div>\r
                    }\r
                    @if (pay['amount_card_mxn'] != null && +pay['amount_card_mxn'] > 0) {\r
                      <div><dt>Tarjeta</dt><dd>{{ moneyLabel(pay['amount_card_mxn']) }}</dd></div>\r
                    }\r
                    @if (pay['card_reference']) {\r
                      <div><dt>Ref. tarjeta</dt><dd>{{ pay['card_reference'] }}</dd></div>\r
                    }\r
                    @if (pay['received_cash_mxn'] != null && +pay['received_cash_mxn'] > 0) {\r
                      <div><dt>Recibi\xF3 MXN</dt><dd>{{ moneyLabel(pay['received_cash_mxn']) }}</dd></div>\r
                    }\r
                    @if (pay['change_cash_mxn'] != null && +pay['change_cash_mxn'] > 0) {\r
                      <div class="cobranza-detail-list__highlight">\r
                        <dt>Cambio MXN</dt><dd>{{ moneyLabel(pay['change_cash_mxn']) }}</dd>\r
                      </div>\r
                    }\r
                    @if (pay['change_cash_usd'] != null && +pay['change_cash_usd'] > 0) {\r
                      <div class="cobranza-detail-list__highlight">\r
                        <dt>Cambio USD</dt><dd>{{ formatCurrencyUsd(+pay['change_cash_usd']) }}</dd>\r
                      </div>\r
                    }\r
                  </dl>\r
                } @else if (item.payment) {\r
                  <dl class="cobranza-detail-list">\r
                    @if (item.payment.amount_cash_mxn != null && +item.payment.amount_cash_mxn > 0) {\r
                      <div><dt>Efectivo MXN</dt><dd>{{ moneyLabel(item.payment.amount_cash_mxn) }}</dd></div>\r
                    }\r
                    @if (item.payment.change_cash_mxn != null && +item.payment.change_cash_mxn > 0) {\r
                      <div class="cobranza-detail-list__highlight">\r
                        <dt>Cambio MXN</dt><dd>{{ moneyLabel(item.payment.change_cash_mxn) }}</dd>\r
                      </div>\r
                    }\r
                  </dl>\r
                }\r
              }\r
            </section>\r
            </div>\r
          </div>\r
        } @else {\r
          <div class="cobranza-empty-state">\r
            <lucide-icon [img]="Receipt" class="cobranza-empty-state__icon" />\r
            <h3>Historial del corte</h3>\r
            <p>Selecciona una orden cobrada para ver el desglose completo del pago.</p>\r
          </div>\r
        }\r
      </main>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/features/pos/pages/payment/payment.component.scss */\n:host {\n  --pos-bg: #0f172a;\n  --pos-surface: #ffffff;\n  --pos-muted: #64748b;\n  --pos-border: #e5e7eb;\n  --pos-accent: #6366f1;\n  --pos-accent2: #8b5cf6;\n  --pos-success: #10b981;\n  --pos-warn: #f59e0b;\n  --pos-radius: 12px;\n  --pos-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.12);\n  --pos-panel-x: 1.25rem;\n  --pos-panel-y: 1rem;\n  --pos-panel-head-h: 52px;\n  display: block;\n  min-height: 100%;\n}\n.pos-take-root {\n  height: calc(100vh - 0px);\n  display: flex;\n  flex-direction: column;\n  background: #f1f5f9;\n  padding: 0.65rem 0.75rem 0;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.pos-take-root--fullscreen {\n  width: 100vw;\n  height: 100vh;\n  padding: 0.55rem 0.65rem 0;\n}\n.pos-session-bar {\n  width: 100%;\n  background:\n    linear-gradient(\n      105deg,\n      #0f172a 0%,\n      #1e1b4b 45%,\n      #312e81 100%);\n  color: #f8fafc;\n  padding: 0.4rem clamp(0.75rem, 2vw, 1.25rem);\n  box-shadow: 0 2px 16px rgba(15, 23, 42, 0.28);\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n.pos-shift-banner {\n  margin: 0.5rem 0 0.75rem;\n  padding: 0.55rem 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.pos-shift-banner--queue {\n  background: #fff7ed;\n  border: 1px solid #fed7aa;\n  color: #9a3412;\n}\n.pos-shift-banner--open {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #065f46;\n}\n.pos-session-bar__content {\n  max-width: 1680px;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.45rem 0.85rem;\n  justify-content: space-between;\n  min-height: 40px;\n}\n.pos-session-bar__left {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem 1.35rem;\n  padding-left: 0.15rem;\n}\n.pos-session-bar__title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  letter-spacing: -0.02em;\n}\n.pos-session-bar__title-icon {\n  flex-shrink: 0;\n  width: 18px;\n  height: 18px;\n  opacity: 0.95;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-session-bar__center {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem 0.75rem;\n  min-width: 200px;\n}\n.pos-session-bar__checking {\n  font-size: 0.85rem;\n  opacity: 0.85;\n}\n.pos-session-meta {\n  font-size: 0.75rem;\n  opacity: 0.75;\n}\n.pos-session-bar__right {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.pos-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  line-height: 1.2;\n  max-width: 100%;\n}\n.pos-pill--ok {\n  background: rgba(16, 185, 129, 0.2);\n  color: #a7f3d0;\n  border: 1px solid rgba(16, 185, 129, 0.35);\n}\n.pos-pill--warn {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fde68a;\n  border: 1px solid rgba(245, 158, 11, 0.35);\n}\n.pos-terminal-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: rgba(99, 102, 241, 0.35);\n  padding: 0.28rem 0.65rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  border: 1px solid rgba(165, 180, 252, 0.35);\n  line-height: 1.2;\n}\n.pos-session-bar .pos-btn {\n  padding: 0.32rem 0.65rem;\n  font-size: 0.72rem;\n  border-radius: 8px;\n  gap: 0.35rem;\n}\n.pos-session-bar .pos-btn--icon {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n}\n.pos-terminal-chip__label {\n  white-space: nowrap;\n}\n.pos-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  border: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s;\n  line-height: 1.2;\n}\n.pos-btn--primary {\n  background: #fff;\n  color: #312e81;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);\n  padding: 0.38rem 0.75rem;\n  font-size: 0.78rem;\n}\n.pos-btn--primary:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);\n}\n.pos-btn--ghost {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fecaca;\n  border: 1px solid rgba(248, 113, 113, 0.35);\n}\n.pos-btn--ghost:hover {\n  background: rgba(248, 113, 113, 0.2);\n}\n.pos-btn--icon {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n}\n.pos-btn--muted {\n  background: #fff;\n  color: #64748b;\n  border: 1px solid var(--pos-border);\n}\n.pos-btn--accent {\n  background:\n    linear-gradient(\n      135deg,\n      var(--pos-accent),\n      var(--pos-accent2));\n  color: #fff;\n  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);\n}\n.pos-btn--accent:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.pos-btn--lg {\n  padding: 0.65rem 1.25rem;\n  font-size: 0.9rem;\n}\n.pos-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.pos-ic {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-ic--sm {\n  width: 17px;\n  height: 17px;\n}\n.pos-ic--xs {\n  width: 14px;\n  height: 14px;\n}\n.pos-ic--btn {\n  width: 17px;\n  height: 17px;\n}\n.pos-session-bar lucide-icon svg,\n.pos-pill lucide-icon svg,\n.pos-terminal-chip lucide-icon svg,\n.pos-btn lucide-icon svg {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n  flex-shrink: 0;\n}\n@media (max-width: 1024px) {\n  .pos-session-bar__content {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .pos-session-bar__center {\n    justify-content: flex-start;\n  }\n  .pos-session-bar__right {\n    justify-content: flex-start;\n  }\n}\n:host {\n  display: block;\n  height: 100%;\n  min-height: 0;\n}\n.cobranza-root.pos-take-root {\n  height: 100%;\n  min-height: 0;\n  max-height: 100%;\n}\n.cobranza-root {\n  min-height: 0;\n}\n.cobranza-open-shift {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n}\n.cobranza-open-shift__card {\n  max-width: 420px;\n  width: 100%;\n  text-align: center;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  padding: 2rem 1.5rem;\n  box-shadow: var(--pos-shadow);\n}\n.cobranza-open-shift__card h2 {\n  margin: 0.75rem 0 0.5rem;\n  font-size: 1.25rem;\n  color: #0f172a;\n}\n.cobranza-open-shift__card p {\n  margin: 0 0 1.25rem;\n  color: var(--pos-muted);\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n.cobranza-open-shift__icon {\n  width: 2.5rem;\n  height: 2.5rem;\n  color: #6366f1;\n  margin: 0 auto;\n  display: block;\n}\n.cobranza-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.65rem;\n  margin: 0.65rem 0 0.75rem;\n  padding: 0.75rem 1rem;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n}\n.cobranza-stat-chip {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n  padding-right: 1rem;\n  border-right: 1px solid var(--pos-border);\n}\n.cobranza-stat-chip span {\n  font-size: 0.68rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--pos-muted);\n}\n.cobranza-stat-chip strong {\n  font-size: 1rem;\n  color: #0f172a;\n}\n.cobranza-stat-chip:last-of-type {\n  border-right: none;\n}\n.cobranza-toolbar__actions {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: auto;\n  flex-wrap: wrap;\n}\n.cobranza-body {\n  flex: 1;\n  min-height: 0;\n  display: grid;\n  grid-template-columns: minmax(300px, 1.1fr) minmax(340px, 1fr);\n  gap: 0.75rem;\n  overflow: hidden;\n}\n.cobranza-dashboard-tabs {\n  display: flex;\n  gap: 0.5rem;\n  margin: 0.65rem 0 0.75rem;\n  padding: 0.25rem;\n  background: #fff;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  box-shadow: var(--pos-shadow);\n}\n.cobranza-dashboard-tab {\n  flex: 1;\n  border: none;\n  background: transparent;\n  padding: 0.55rem 0.75rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #64748b;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  transition: background 0.15s, color 0.15s;\n}\n.cobranza-dashboard-tab:hover {\n  color: #334155;\n  background: #f8fafc;\n}\n.cobranza-dashboard-tab--active {\n  background:\n    linear-gradient(\n      135deg,\n      #eef2ff 0%,\n      #e0e7ff 100%);\n  color: #4338ca;\n  box-shadow: inset 0 0 0 1px #c7d2fe;\n}\n.cobranza-dashboard-tab__badge {\n  min-width: 1.25rem;\n  height: 1.25rem;\n  padding: 0 0.35rem;\n  border-radius: 999px;\n  background: #4f46e5;\n  color: #fff;\n  font-size: 0.68rem;\n  font-weight: 800;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.cobranza-dashboard-tab__badge--muted {\n  background: #e2e8f0;\n  color: #475569;\n}\n.cobranza-collected-summary {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  flex-shrink: 0;\n  padding: 0.75rem 1rem;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #ecfdf5 0%,\n      #d1fae5 100%);\n  border: 1px solid #a7f3d0;\n  box-shadow: 0 1px 3px rgba(16, 185, 129, 0.08);\n}\n.cobranza-collected-summary__icon-wrap {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid #a7f3d0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  color: #059669;\n}\n.cobranza-collected-summary__icon {\n  width: 1rem;\n  height: 1rem;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.cobranza-collected-summary__text {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.cobranza-collected-summary__label {\n  font-size: 0.65rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #047857;\n}\n.cobranza-collected-summary strong {\n  font-size: 0.9rem;\n  font-weight: 800;\n  color: #065f46;\n  letter-spacing: -0.02em;\n  line-height: 1.2;\n}\n.cobranza-collected-summary__icon lucide-icon svg,\n.cobranza-collected-summary__icon-wrap lucide-icon svg {\n  width: 1rem;\n  height: 1rem;\n  display: block;\n}\n.cobranza-pay-chip {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  padding: 0.12rem 0.45rem;\n  border-radius: 999px;\n  background: #e0e7ff;\n  color: #4338ca;\n}\n.cobranza-sale--collected {\n  background: #fff;\n}\n.cobranza-detail-list {\n  margin: 0;\n}\n.cobranza-detail-list div {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 0.85rem;\n}\n.cobranza-detail-list dt {\n  color: var(--pos-muted);\n  font-weight: 500;\n}\n.cobranza-detail-list dd {\n  margin: 0;\n  font-weight: 600;\n  color: #111827;\n  text-align: right;\n}\n.cobranza-detail-list__highlight {\n  background: #ecfdf5;\n  margin: 0 -0.5rem;\n  padding: 0.5rem !important;\n  border-radius: 8px;\n  border-bottom: none !important;\n}\n.cobranza-detail-list__highlight dd {\n  color: #059669;\n  font-size: 1rem;\n}\n.cobranza-empty--inline {\n  padding: 1rem 0;\n  margin: 0;\n  text-align: left;\n}\n.cobranza-panel__head-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n.cobranza-head-btn--print {\n  color: #4338ca;\n  border-color: #c7d2fe;\n  background: #eef2ff;\n}\n.cobranza-head-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.cobranza-panel {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.cobranza-panel__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid var(--pos-border);\n  flex-shrink: 0;\n}\n.cobranza-panel__head h2 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.cobranza-panel__title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.cobranza-panel__title h2 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n}\n.cobranza-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 1.4rem;\n  height: 1.4rem;\n  padding: 0 0.35rem;\n  border-radius: 999px;\n  background: #4f46e5;\n  color: #fff;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n.cobranza-refresh-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  border-radius: 9px;\n  border: 1px solid #fca5a5;\n  background: #fff;\n  color: #dc2626;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s;\n}\n.cobranza-refresh-btn lucide-icon {\n  width: 17px;\n  height: 17px;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.cobranza-refresh-btn:hover {\n  background: #fef2f2;\n  border-color: #f87171;\n  color: #b91c1c;\n}\n.cobranza-search {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-height: 38px;\n  padding: 0 0.75rem;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  background: #f8fafc;\n  flex-shrink: 0;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background 0.15s;\n}\n.cobranza-search:focus-within {\n  border-color: #6366f1;\n  background: #fff;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n.cobranza-search input {\n  flex: 1;\n  min-width: 0;\n  width: 100%;\n  box-sizing: border-box;\n  border: none;\n  background: transparent;\n  padding: 0.55rem 0;\n  font-size: 0.875rem;\n  color: #0f172a;\n}\n.cobranza-search input:focus {\n  outline: none;\n}\n.cobranza-search input::placeholder {\n  color: #94a3b8;\n}\n.cobranza-search__icon {\n  position: static;\n  transform: none;\n  width: 1rem;\n  height: 1rem;\n  color: #94a3b8;\n  pointer-events: none;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.cobranza-search lucide-icon svg,\n.cobranza-refresh-btn lucide-icon svg {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.cobranza-panel__content {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  flex: 1;\n  padding: 1rem 1.15rem;\n  gap: 0.75rem;\n  overflow: hidden;\n}\n.cobranza-panel__content .cobranza-search {\n  padding: 0 0.75rem;\n}\n.cobranza-panel__content .cobranza-sales-scroll {\n  padding: 0;\n  margin: 0;\n}\n.cobranza-sales-scroll {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n}\n.cobranza-sales {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.cobranza-sale {\n  width: 100%;\n  text-align: left;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.75rem 0.85rem;\n  background: #f8fafc;\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    box-shadow 0.15s;\n}\n.cobranza-sale:hover {\n  border-color: #a5b4fc;\n  background: #fff;\n}\n.cobranza-sale--selected {\n  border-color: #4f46e5;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #eef2ff 100%);\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.12);\n}\n.cobranza-sale__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n}\n.cobranza-sale__row--meta {\n  margin-top: 0.3rem;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n}\n.cobranza-sale__row--customer {\n  margin-top: 0.35rem;\n  font-size: 0.78rem;\n  color: #374151;\n}\n.cobranza-sale__total {\n  font-weight: 700;\n  color: #4f46e5;\n}\n.cobranza-chip {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  padding: 0.15rem 0.45rem;\n  border-radius: 999px;\n  background: #fef3c7;\n  color: #92400e;\n}\n.cobranza-detail {\n  margin: 0.75rem 0 0;\n}\n.cobranza-detail div {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.45rem 0;\n  border-bottom: 1px solid #f1f5f9;\n  font-size: 0.85rem;\n}\n.cobranza-detail dt {\n  color: var(--pos-muted);\n  font-weight: 500;\n}\n.cobranza-detail dd {\n  margin: 0;\n  font-weight: 600;\n  color: #111827;\n}\n.cobranza-panel--collect {\n  background: #f8fafc;\n  min-height: 0;\n}\n.cobranza-panel__head--collect {\n  background: #fff;\n  padding: 1rem 1.15rem;\n  flex-shrink: 0;\n}\n.cobranza-panel__head--collect h2 {\n  font-size: 1rem;\n}\n.cobranza-panel__sub {\n  margin: 0.15rem 0 0;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n}\n.cobranza-head-btn {\n  border: 1px solid #e5e7eb;\n  background: #fff;\n  color: #64748b;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.4rem 0.85rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    color 0.15s,\n    border-color 0.15s;\n}\n.cobranza-head-btn:hover {\n  background: #f8fafc;\n  color: #334155;\n  border-color: #cbd5e1;\n}\n.cobranza-collect-scroll {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.cobranza-collect-body {\n  padding: 0.85rem 1rem 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n  flex: 1 0 auto;\n}\n.cobranza-total-card {\n  background: #fff;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);\n}\n.cobranza-total-card__top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.65rem 1rem;\n  background: #f8fafc;\n  border-bottom: 1px solid #f1f5f9;\n}\n.cobranza-total-card__folio {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 0.8rem;\n  font-weight: 700;\n  color: #334155;\n  letter-spacing: 0.02em;\n}\n.cobranza-total-card__date {\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  white-space: nowrap;\n}\n.cobranza-total-card__amount {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1rem 0.85rem;\n  border-bottom: 1px solid #f1f5f9;\n}\n.cobranza-total-card__amount span {\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--pos-muted);\n}\n.cobranza-total-card__amount strong {\n  font-size: 1.75rem;\n  font-weight: 800;\n  color: #0f172a;\n  letter-spacing: -0.03em;\n  line-height: 1;\n}\n.cobranza-total-card__meta {\n  padding: 0.65rem 1rem 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.cobranza-total-card__meta div {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.cobranza-total-card__meta span {\n  font-size: 0.78rem;\n  color: var(--pos-muted);\n}\n.cobranza-total-card__meta strong {\n  font-size: 0.82rem;\n  color: #374151;\n  font-weight: 600;\n  text-align: right;\n}\n.cobranza-block {\n  background: #fff;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  padding: 0.85rem 1rem 1rem;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);\n}\n.cobranza-block__title {\n  margin: 0 0 0.65rem;\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: var(--pos-muted);\n}\n.cobranza-customer-pick {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-top: 0.5rem;\n  padding: 0.7rem 0.8rem;\n  border: 1px solid #e0e7ff;\n  border-radius: 10px;\n  background: #fafbff;\n  cursor: pointer;\n  text-align: left;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.cobranza-customer-pick:hover {\n  border-color: #a5b4fc;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);\n}\n.cobranza-customer-pick__avatar {\n  flex-shrink: 0;\n  width: 2.1rem;\n  height: 2.1rem;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  color: #fff;\n  font-size: 0.72rem;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.cobranza-customer-pick__body {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n}\n.cobranza-customer-pick__label {\n  font-size: 0.65rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #9ca3af;\n}\n.cobranza-customer-pick__name {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.cobranza-pay-tabs {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.35rem;\n  margin-bottom: 0.75rem;\n  padding: 0.25rem;\n  background: #f1f5f9;\n  border-radius: 10px;\n}\n.cobranza-pay-tab {\n  border: none;\n  background: transparent;\n  padding: 0.5rem 0.35rem;\n  border-radius: 8px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    color 0.15s,\n    box-shadow 0.15s;\n}\n.cobranza-pay-tab:hover {\n  color: #334155;\n}\n.cobranza-pay-tab--active {\n  background: #fff;\n  color: #4f46e5;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);\n}\n.cobranza-pay-form {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n}\n.cobranza-field-grid {\n  display: grid;\n  gap: 0.65rem;\n}\n.cobranza-field-grid--2 {\n  grid-template-columns: 1fr 1fr;\n}\n.cobranza-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.cobranza-field span {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.cobranza-field__hint {\n  font-style: normal;\n  font-weight: 500;\n  color: #94a3b8;\n  margin-left: 0.35rem;\n  text-transform: none;\n  letter-spacing: 0;\n}\n.cobranza-field input {\n  width: 100%;\n  box-sizing: border-box;\n  height: 40px;\n  border: 1px solid #e2e8f0;\n  border-radius: 9px;\n  padding: 0 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #0f172a;\n  background: #fff;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.cobranza-field input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);\n}\n.cobranza-field input[readonly] {\n  background: #f8fafc;\n  color: #475569;\n  cursor: default;\n}\n.cobranza-field--tc input {\n  max-width: 160px;\n}\n.cobranza-change {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.65rem 0.85rem;\n  border-radius: 9px;\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n}\n.cobranza-change span {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #047857;\n}\n.cobranza-change strong {\n  font-size: 1.05rem;\n  font-weight: 800;\n  color: #059669;\n  letter-spacing: -0.02em;\n}\n.cobranza-change--warn {\n  background: #fef2f2;\n  border-color: #fecaca;\n}\n.cobranza-change--warn span {\n  color: #b91c1c;\n}\n.cobranza-change--warn strong {\n  color: #dc2626;\n}\n.cobranza-cash-hint {\n  margin: 0 0 0.75rem;\n  padding: 0.55rem 0.7rem;\n  border-radius: 8px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  font-size: 0.74rem;\n  line-height: 1.45;\n  color: #64748b;\n}\n.cobranza-cash-hint strong {\n  color: #334155;\n  font-weight: 700;\n}\n.cobranza-cash-currencies {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.cobranza-cash-currency__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.cobranza-tc-badge {\n  flex-shrink: 0;\n  font-size: 0.65rem;\n  font-weight: 800;\n  padding: 0.22rem 0.55rem;\n  border-radius: 999px;\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #047857;\n  white-space: nowrap;\n  letter-spacing: 0.02em;\n}\n.cobranza-tc-badge--edit {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.2rem;\n}\n.cobranza-tc-badge--edit input {\n  width: 52px;\n  border: none;\n  background: transparent;\n  padding: 0;\n  font-size: 0.65rem;\n  font-weight: 800;\n  color: #047857;\n  text-align: right;\n}\n.cobranza-tc-badge--edit input:focus {\n  outline: none;\n}\n.cobranza-bill-btns {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n.cobranza-bill-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.2rem;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #475569;\n  font-size: 0.72rem;\n  font-weight: 700;\n  padding: 0.32rem 0.62rem;\n  border-radius: 999px;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    border-color 0.12s,\n    color 0.12s,\n    transform 0.08s;\n}\n.cobranza-bill-btn:hover {\n  border-color: #a5b4fc;\n  color: #4338ca;\n  background: #eef2ff;\n}\n.cobranza-bill-btn:active {\n  transform: scale(0.97);\n}\n.cobranza-bill-btn--on {\n  border-color: #6366f1;\n  background: #eef2ff;\n  color: #4338ca;\n  box-shadow: inset 0 0 0 1px #c7d2fe;\n}\n.cobranza-bill-btn--usd.cobranza-bill-btn--on {\n  border-color: #34d399;\n  background: #ecfdf5;\n  color: #047857;\n  box-shadow: inset 0 0 0 1px #a7f3d0;\n}\n.cobranza-bill-btn__count {\n  font-size: 0.62rem;\n  font-weight: 800;\n  opacity: 0.9;\n}\n.cobranza-manual-received {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.cobranza-manual-received span {\n  font-size: 0.68rem;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.cobranza-manual-received input {\n  width: 100%;\n  box-sizing: border-box;\n}\n.cobranza-cash-total {\n  margin: 0;\n  font-size: 0.78rem;\n  color: #64748b;\n}\n.cobranza-cash-total strong {\n  color: #0f172a;\n  font-size: 0.9rem;\n}\n.cobranza-cash-mode {\n  display: flex;\n  gap: 0.45rem;\n  margin-bottom: 0.75rem;\n}\n.cobranza-cash-mode__btn {\n  flex: 1;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #64748b;\n  font-size: 0.76rem;\n  font-weight: 700;\n  padding: 0.45rem 0.65rem;\n  border-radius: 8px;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    border-color 0.12s,\n    color 0.12s;\n}\n.cobranza-cash-mode__btn--active {\n  background: #eef2ff;\n  border-color: #a5b4fc;\n  color: #4338ca;\n}\n.cobranza-cash-currency {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n  padding: 0.75rem;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  background: #fff;\n}\n.cobranza-cash-currency--mxn {\n  border-color: #bfdbfe;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fbff 0%,\n      #fff 100%);\n}\n.cobranza-cash-currency--usd {\n  border-color: #bbf7d0;\n  background:\n    linear-gradient(\n      180deg,\n      #f7fef9 0%,\n      #fff 100%);\n}\n.cobranza-cash-currency__title {\n  margin: 0;\n  font-size: 0.78rem;\n  font-weight: 800;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #334155;\n}\n.cobranza-cash-currency__due {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  padding: 0.55rem 0.65rem;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid #e2e8f0;\n}\n.cobranza-cash-currency__due span {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.cobranza-cash-currency__due strong {\n  font-size: 1rem;\n  font-weight: 800;\n  color: #0f172a;\n  letter-spacing: -0.02em;\n}\n.cobranza-cash-currency__due input {\n  width: 100%;\n  max-width: 120px;\n  box-sizing: border-box;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 0.35rem 0.5rem;\n  font-size: 0.95rem;\n  font-weight: 800;\n  color: #0f172a;\n  text-align: right;\n  background: #fff;\n}\n.cobranza-cash-currency__due input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n.cobranza-cash-currency__received {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  padding: 0.65rem;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px dashed #cbd5e1;\n}\n.cobranza-cash-currency__received-label {\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #475569;\n}\n.cobranza-cash-currency .cobranza-field__input {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid var(--pos-border);\n  border-radius: 8px;\n  padding: 0.5rem 0.65rem;\n  font-size: 0.875rem;\n  background: #fff;\n}\n.cobranza-cash-currency .cobranza-field__input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n@media (max-width: 720px) {\n  .cobranza-cash-currencies {\n    grid-template-columns: 1fr;\n  }\n}\n.cobranza-received-block {\n  padding: 0.75rem;\n  border-radius: 10px;\n  background: #f8fafc;\n  border: 1px dashed #cbd5e1;\n}\n.cobranza-received-block__head {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-bottom: 0.65rem;\n}\n.cobranza-received-block__head > span {\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #334155;\n}\n.cobranza-quick-btns {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n.cobranza-quick-btns--inline {\n  margin-top: -0.25rem;\n}\n.cobranza-quick-btn {\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #475569;\n  font-size: 0.68rem;\n  font-weight: 700;\n  padding: 0.28rem 0.55rem;\n  border-radius: 999px;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    border-color 0.12s,\n    color 0.12s;\n}\n.cobranza-quick-btn:hover {\n  border-color: #a5b4fc;\n  color: #4f46e5;\n  background: #eef2ff;\n}\n.cobranza-quick-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n  transform: none;\n}\n.cobranza-field__input--highlight {\n  border-color: #c7d2fe !important;\n  background: #fff !important;\n  font-size: 1.05rem !important;\n}\n.cobranza-cash-result {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  padding: 0.75rem 0.85rem;\n  border-radius: 10px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n}\n.cobranza-cash-result--change {\n  background:\n    linear-gradient(\n      135deg,\n      #ecfdf5 0%,\n      #d1fae5 100%);\n  border-color: #6ee7b7;\n  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);\n}\n.cobranza-cash-result--short {\n  background:\n    linear-gradient(\n      135deg,\n      #fffbeb 0%,\n      #fef3c7 100%);\n  border-color: #fcd34d;\n}\n.cobranza-cash-result__item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.cobranza-cash-result__item > span {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.cobranza-cash-result__item--warn strong {\n  color: #b45309;\n}\n.cobranza-cash-result__values {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.15rem;\n}\n.cobranza-cash-result__change {\n  font-size: 1.35rem !important;\n  font-weight: 800 !important;\n  color: #047857 !important;\n  letter-spacing: -0.03em;\n  line-height: 1.1;\n}\n.cobranza-cash-result--change .cobranza-cash-result__item > span {\n  color: #065f46;\n  font-weight: 700;\n}\n.cobranza-pay-progress {\n  padding: 0.65rem 0.75rem;\n  border-radius: 10px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n}\n.cobranza-pay-progress__track {\n  height: 6px;\n  border-radius: 999px;\n  background: #e2e8f0;\n  overflow: hidden;\n  margin-bottom: 0.5rem;\n}\n.cobranza-pay-progress__fill {\n  height: 100%;\n  border-radius: 999px;\n  background:\n    linear-gradient(\n      90deg,\n      #818cf8,\n      #6366f1);\n  transition: width 0.2s ease;\n}\n.cobranza-pay-progress__fill--ok {\n  background:\n    linear-gradient(\n      90deg,\n      #34d399,\n      #10b981);\n}\n.cobranza-pay-progress__labels {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.cobranza-pay-progress__labels span {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.cobranza-pay-progress__labels strong {\n  font-size: 0.95rem;\n  font-weight: 800;\n  color: #334155;\n}\n.cobranza-pay-progress__labels strong em {\n  font-style: normal;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #94a3b8;\n  margin-left: 0.25rem;\n}\n.cobranza-pay-progress__ok {\n  color: #059669 !important;\n}\n.cobranza-form-error {\n  margin: 0;\n  padding: 0.55rem 0.75rem;\n  border-radius: 8px;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #b91c1c;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.cobranza-collect-actions {\n  display: flex;\n  gap: 0.65rem;\n  padding: 0.85rem 1rem 1rem;\n  background: #fff;\n  border-top: 1px solid var(--pos-border);\n  flex-shrink: 0;\n  margin-top: auto;\n}\n.cobranza-action {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  min-height: 46px;\n  border-radius: 10px;\n  font-size: 0.88rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    opacity 0.15s;\n}\n.cobranza-action:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n.cobranza-action--ghost {\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #475569;\n}\n.cobranza-action--ghost:hover:not(:disabled) {\n  background: #f8fafc;\n}\n.cobranza-action--primary {\n  flex: 1.4;\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #4f46e5 0%,\n      #6366f1 100%);\n  color: #fff;\n  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);\n}\n.cobranza-action--primary:hover:not(:disabled) {\n  filter: brightness(1.05);\n}\n.cobranza-action__amount {\n  padding: 0.15rem 0.5rem;\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.18);\n  font-size: 0.82rem;\n  font-weight: 800;\n}\n.cobranza-customer-options {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.5rem;\n  margin-bottom: 0;\n}\n.cobranza-radio {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  padding: 0.65rem 0.7rem;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  background: #fafafa;\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    background 0.15s,\n    box-shadow 0.15s;\n}\n.cobranza-radio input {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n.cobranza-radio--on {\n  border-color: #818cf8;\n  background: #fff;\n  box-shadow: 0 0 0 1px #c7d2fe;\n}\n.cobranza-radio__icon {\n  flex-shrink: 0;\n  width: 1.75rem;\n  height: 1.75rem;\n  border-radius: 8px;\n  background: #f1f5f9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #6366f1;\n}\n.cobranza-radio__text {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.cobranza-radio__text strong {\n  font-size: 0.78rem;\n  color: #111827;\n}\n.cobranza-radio__text span {\n  font-size: 0.68rem;\n  color: var(--pos-muted);\n}\n.cobranza-empty,\n.cobranza-empty-state {\n  color: var(--pos-muted);\n  text-align: center;\n}\n.cobranza-empty {\n  padding: 2rem 1rem;\n  margin: 0;\n  font-size: 0.9rem;\n}\n.cobranza-empty-state {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1.5rem;\n}\n.cobranza-empty-state h3 {\n  margin: 0.75rem 0 0.35rem;\n  color: #0f172a;\n}\n.cobranza-empty-state p {\n  margin: 0;\n  font-size: 0.875rem;\n  max-width: 280px;\n  line-height: 1.5;\n}\n.cobranza-empty-state__icon {\n  width: 2.25rem;\n  height: 2.25rem;\n  color: #c7d2fe;\n}\n@media (max-width: 1024px) {\n  .cobranza-body {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(240px, 35vh) minmax(0, 1fr);\n  }\n  .cobranza-stat-chip {\n    border-right: none;\n    padding-right: 0;\n  }\n  .cobranza-toolbar__actions {\n    width: 100%;\n    margin-left: 0;\n  }\n  .cobranza-customer-options {\n    grid-template-columns: 1fr;\n  }\n  .cobranza-pay-tabs {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .cobranza-field-grid--2 {\n    grid-template-columns: 1fr;\n  }\n  .cobranza-total-card__amount strong {\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=payment.component.css.map */\n'] }]
  }], () => [{ type: POSService }, { type: PosStateService }, { type: AuthService }, { type: ActivatedRoute }, { type: ToastService }, { type: MatDialog }, { type: ExchangeRateService }, { type: PosReceiptPrintService }], { posRootRef: [{
    type: ViewChild,
    args: ["posRoot"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentComponent, { className: "PaymentComponent", filePath: "src/app/features/pos/pages/payment/payment.component.ts", lineNumber: 123 });
})();
function roundMoney2(value) {
  return Math.round(value * 100) / 100;
}
export {
  PaymentComponent
};
//# sourceMappingURL=chunk-3BD7UXU7.js.map
