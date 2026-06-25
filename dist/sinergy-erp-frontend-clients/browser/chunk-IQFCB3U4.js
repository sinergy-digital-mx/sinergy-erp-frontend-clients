import {
  PosStateService
} from "./chunk-6GAVLWZN.js";
import {
  mapPosApiErrorMessage
} from "./chunk-B2KGUYHG.js";
import {
  POSService,
  enrichPosInventorySummary,
  formatApplicableDiscountLabel,
  isDiscountApiError,
  normalizePosInventorySummary,
  persistPosWarehouseId,
  previewLineDiscount,
  resolvePosWarehouseId
} from "./chunk-MK3LIK2T.js";
import {
  dailyShiftIsOpen
} from "./chunk-MHDUPFR7.js";
import {
  WarehouseService
} from "./chunk-MBXKGEVM.js";
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
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
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
  CircleAlert,
  LucideAngularComponent,
  LucideAngularModule,
  Maximize2,
  Minimize2,
  Minus,
  Monitor,
  Package,
  Percent,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  User
} from "./chunk-EBDBUXLH.js";
import {
  AuthService
} from "./chunk-7QZ6JYNG.js";
import {
  Router
} from "./chunk-524KR27D.js";
import {
  CommonModule
} from "./chunk-MNFUR22A.js";
import {
  Component,
  Inject,
  ViewChild,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-CJAGDKD4.js";

// src/app/features/pos/components/seller-code-dialog/seller-code-dialog.component.ts
function SellerCodeDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var SellerCodeDialogComponent = class _SellerCodeDialogComponent {
  dialogRef;
  code = signal(null, ...ngDevMode ? [{ debugName: "code" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  constructor(dialogRef) {
    this.dialogRef = dialogRef;
  }
  cancel() {
    this.dialogRef.close();
  }
  confirm() {
    const value = this.code();
    if (value == null || !Number.isInteger(value) || value < 1) {
      this.error.set("Ingresa un c\xF3digo num\xE9rico v\xE1lido");
      return;
    }
    this.dialogRef.close(value);
  }
  static \u0275fac = function SellerCodeDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SellerCodeDialogComponent)(\u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SellerCodeDialogComponent, selectors: [["app-seller-code-dialog"]], decls: 13, vars: 2, consts: [[1, "pos-dialog"], [1, "pos-dialog__title"], [1, "pos-dialog__subtitle"], [1, "pos-dialog__field"], ["type", "number", "min", "1", "step", "1", "autofocus", "", "placeholder", "Ej. 33456", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "pos-dialog__error"], [1, "pos-dialog__actions"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Continuar", "custom_class", "btn_primary", 3, "clicked"]], template: function SellerCodeDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "C\xF3digo de vendedor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4, "Ingresa tu c\xF3digo para registrar ventas en esta terminal.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "label", 3)(6, "span");
      \u0275\u0275text(7, "C\xF3digo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 4);
      \u0275\u0275listener("ngModelChange", function SellerCodeDialogComponent_Template_input_ngModelChange_8_listener($event) {
        return ctx.code.set($event === "" || $event == null ? null : +$event);
      })("keyup.enter", function SellerCodeDialogComponent_Template_input_keyup_enter_8_listener() {
        return ctx.confirm();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, SellerCodeDialogComponent_Conditional_9_Template, 2, 1, "p", 5);
      \u0275\u0275elementStart(10, "div", 6)(11, "app-button", 7);
      \u0275\u0275listener("clicked", function SellerCodeDialogComponent_Template_app_button_clicked_11_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "app-button", 8);
      \u0275\u0275listener("clicked", function SellerCodeDialogComponent_Template_app_button_clicked_12_listener() {
        return ctx.confirm();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("ngModel", ctx.code());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 9 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, NgModel, ButtonComponent], styles: ["\n\n.pos-dialog[_ngcontent-%COMP%] {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n.pos-dialog__error[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  font-size: 12px;\n  color: #dc2626;\n}\n/*# sourceMappingURL=seller-code-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SellerCodeDialogComponent, [{
    type: Component,
    args: [{ selector: "app-seller-code-dialog", standalone: true, imports: [CommonModule, FormsModule, ButtonComponent], template: `<div class="pos-dialog">\r
  <h2 class="pos-dialog__title">C\xF3digo de vendedor</h2>\r
  <p class="pos-dialog__subtitle">Ingresa tu c\xF3digo para registrar ventas en esta terminal.</p>\r
\r
  <label class="pos-dialog__field">\r
    <span>C\xF3digo</span>\r
    <input\r
      type="number"\r
      min="1"\r
      step="1"\r
      [ngModel]="code()"\r
      (ngModelChange)="code.set($event === '' || $event == null ? null : +$event)"\r
      (keyup.enter)="confirm()"\r
      autofocus\r
      placeholder="Ej. 33456" />\r
  </label>\r
  @if (error()) {\r
    <p class="pos-dialog__error">{{ error() }}</p>\r
  }\r
\r
  <div class="pos-dialog__actions">\r
    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="cancel()"></app-button>\r
    <app-button text="Continuar" custom_class="btn_primary" (clicked)="confirm()"></app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/pos/components/seller-code-dialog/seller-code-dialog.component.scss */\n.pos-dialog {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field input {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n.pos-dialog__error {\n  margin: 8px 0 0;\n  font-size: 12px;\n  color: #dc2626;\n}\n/*# sourceMappingURL=seller-code-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SellerCodeDialogComponent, { className: "SellerCodeDialogComponent", filePath: "src/app/features/pos/components/seller-code-dialog/seller-code-dialog.component.ts", lineNumber: 14 });
})();

// src/app/features/pos/components/pos-add-product-dialog/pos-add-product-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PosAddProductDialogComponent_Conditional_9_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 16)(1, "input", 18);
    \u0275\u0275listener("ngModelChange", function PosAddProductDialogComponent_Conditional_9_For_8_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectedDiscountId.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const discount_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("value", discount_r4.id)("ngModel", ctx_r1.selectedDiscountId());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.discountLabel(discount_r4));
  }
}
function PosAddProductDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 15);
    \u0275\u0275text(2, "Descuento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "label", 16)(4, "input", 17);
    \u0275\u0275listener("ngModelChange", function PosAddProductDialogComponent_Conditional_9_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectedDiscountId.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Sin descuento");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(7, PosAddProductDialogComponent_Conditional_9_For_8_Template, 4, 3, "label", 16, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.selectedDiscountId());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.data.applicable_discounts);
  }
}
function PosAddProductDialogComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span");
    \u0275\u0275text(2, "Descuento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("-", ctx_r1.formatCurrency(ctx_r1.preview().lineDiscount));
  }
}
var PosAddProductDialogComponent = class _PosAddProductDialogComponent {
  dialogRef;
  data;
  quantity = signal(1, ...ngDevMode ? [{ debugName: "quantity" }] : []);
  selectedDiscountId = signal("", ...ngDevMode ? [{ debugName: "selectedDiscountId" }] : []);
  preview = computed(() => {
    const qty = Math.max(1, Number(this.quantity()) || 1);
    const discount = this.resolveSelectedDiscount();
    const line = previewLineDiscount(this.data.unit_price, qty, discount);
    const iva = line.lineNetSubtotal * (this.data.iva_percentage / 100);
    const ieps = line.lineNetSubtotal * (this.data.ieps_percentage / 100);
    return __spreadProps(__spreadValues({}, line), {
      lineTotal: line.lineNetSubtotal + iva + ieps
    });
  }, ...ngDevMode ? [{ debugName: "preview" }] : []);
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  }
  discountLabel(discount) {
    return formatApplicableDiscountLabel(discount);
  }
  cancel() {
    this.dialogRef.close(void 0);
  }
  confirm() {
    const qty = Math.max(1, Math.floor(Number(this.quantity()) || 1));
    const discount = this.resolveSelectedDiscount();
    this.dialogRef.close({
      quantity: qty,
      product_discount_id: discount?.id ?? null,
      selected_discount: discount
    });
  }
  resolveSelectedDiscount() {
    const id = this.selectedDiscountId()?.trim();
    if (!id) {
      return null;
    }
    return this.data.applicable_discounts.find((d) => d.id === id) ?? null;
  }
  static \u0275fac = function PosAddProductDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosAddProductDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosAddProductDialogComponent, selectors: [["app-pos-add-product-dialog"]], decls: 27, vars: 8, consts: [[1, "pos-dialog", "pos-add-product-dialog"], [1, "pos-dialog__title"], [1, "pos-dialog__subtitle"], [1, "pos-dialog__fields"], [1, "pos-dialog__field"], ["type", "number", "min", "1", "step", "1", 3, "ngModelChange", "ngModel"], [1, "pos-add-product-dialog__discounts"], [1, "pos-add-product-dialog__preview"], [1, "pos-add-product-dialog__preview-title"], [1, "pos-add-product-dialog__preview-row"], [1, "pos-add-product-dialog__preview-row", "pos-add-product-dialog__preview-row--discount"], [1, "pos-add-product-dialog__preview-row", "pos-add-product-dialog__preview-row--total"], [1, "pos-dialog__actions"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Agregar", "custom_class", "btn_primary", 3, "clicked"], [1, "pos-add-product-dialog__label"], [1, "pos-add-product-dialog__radio"], ["type", "radio", "name", "pos_discount", "value", "", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "pos_discount", 3, "ngModelChange", "value", "ngModel"]], template: function PosAddProductDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "label", 4);
      \u0275\u0275text(7, " Cantidad ");
      \u0275\u0275elementStart(8, "input", 5);
      \u0275\u0275listener("ngModelChange", function PosAddProductDialogComponent_Template_input_ngModelChange_8_listener($event) {
        return ctx.quantity.set(+$event || 1);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(9, PosAddProductDialogComponent_Conditional_9_Template, 9, 1, "div", 6);
      \u0275\u0275elementStart(10, "div", 7)(11, "p", 8);
      \u0275\u0275text(12, "Vista previa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 9)(14, "span");
      \u0275\u0275text(15, "Subtotal l\xEDnea");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "strong");
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(18, PosAddProductDialogComponent_Conditional_18_Template, 5, 1, "div", 10);
      \u0275\u0275elementStart(19, "div", 11)(20, "span");
      \u0275\u0275text(21, "Total l\xEDnea");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "strong");
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(24, "div", 12)(25, "app-button", 13);
      \u0275\u0275listener("clicked", function PosAddProductDialogComponent_Template_app_button_clicked_25_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "app-button", 14);
      \u0275\u0275listener("clicked", function PosAddProductDialogComponent_Template_app_button_clicked_26_listener() {
        return ctx.confirm();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.data.product_name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", ctx.formatCurrency(ctx.data.unit_price), " \xB7 ", ctx.data.uom_name, " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.quantity());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.applicable_discounts.length > 0 ? 9 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.preview().lineGrossSubtotal));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.preview().lineDiscount > 0 ? 18 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.preview().lineTotal));
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, RadioControlValueAccessor, NgControlStatus, MinValidator, NgModel, ButtonComponent], styles: ["\n\n.pos-dialog[_ngcontent-%COMP%] {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n.pos-add-product-dialog__label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n  margin-bottom: 8px;\n}\n.pos-add-product-dialog__discounts[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n}\n.pos-add-product-dialog__radio[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: #374151;\n  cursor: pointer;\n}\n.pos-add-product-dialog__radio[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.pos-add-product-dialog__preview[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  padding: 12px;\n  border-radius: 8px;\n  background: #eff6ff;\n  border: 1px solid #dbeafe;\n}\n.pos-add-product-dialog__preview-title[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #1d4ed8;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n}\n.pos-add-product-dialog__preview-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13px;\n  color: #475569;\n  margin-bottom: 4px;\n}\n.pos-add-product-dialog__preview-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f172a;\n  font-weight: 600;\n}\n.pos-add-product-dialog__preview-row--discount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #b45309;\n}\n.pos-add-product-dialog__preview-row--total[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  padding-top: 6px;\n  border-top: 1px solid #bfdbfe;\n  font-size: 14px;\n}\n.pos-add-product-dialog__preview-row--total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n/*# sourceMappingURL=pos-add-product-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosAddProductDialogComponent, [{
    type: Component,
    args: [{ selector: "app-pos-add-product-dialog", standalone: true, imports: [CommonModule, FormsModule, ButtonComponent], template: '<div class="pos-dialog pos-add-product-dialog">\r\n  <h2 class="pos-dialog__title">{{ data.product_name }}</h2>\r\n  <p class="pos-dialog__subtitle">\r\n    {{ formatCurrency(data.unit_price) }} \xB7 {{ data.uom_name }}\r\n  </p>\r\n\r\n  <div class="pos-dialog__fields">\r\n    <label class="pos-dialog__field">\r\n      Cantidad\r\n      <input\r\n        type="number"\r\n        min="1"\r\n        step="1"\r\n        [ngModel]="quantity()"\r\n        (ngModelChange)="quantity.set(+$event || 1)"\r\n      />\r\n    </label>\r\n\r\n    @if (data.applicable_discounts.length > 0) {\r\n      <div class="pos-add-product-dialog__discounts">\r\n        <span class="pos-add-product-dialog__label">Descuento</span>\r\n        <label class="pos-add-product-dialog__radio">\r\n          <input\r\n            type="radio"\r\n            name="pos_discount"\r\n            value=""\r\n            [ngModel]="selectedDiscountId()"\r\n            (ngModelChange)="selectedDiscountId.set($event)"\r\n          />\r\n          <span>Sin descuento</span>\r\n        </label>\r\n        @for (discount of data.applicable_discounts; track discount.id) {\r\n          <label class="pos-add-product-dialog__radio">\r\n            <input\r\n              type="radio"\r\n              name="pos_discount"\r\n              [value]="discount.id"\r\n              [ngModel]="selectedDiscountId()"\r\n              (ngModelChange)="selectedDiscountId.set($event)"\r\n            />\r\n            <span>{{ discountLabel(discount) }}</span>\r\n          </label>\r\n        }\r\n      </div>\r\n    }\r\n\r\n    <div class="pos-add-product-dialog__preview">\r\n      <p class="pos-add-product-dialog__preview-title">Vista previa</p>\r\n      <div class="pos-add-product-dialog__preview-row">\r\n        <span>Subtotal l\xEDnea</span>\r\n        <strong>{{ formatCurrency(preview().lineGrossSubtotal) }}</strong>\r\n      </div>\r\n      @if (preview().lineDiscount > 0) {\r\n        <div class="pos-add-product-dialog__preview-row pos-add-product-dialog__preview-row--discount">\r\n          <span>Descuento</span>\r\n          <strong>-{{ formatCurrency(preview().lineDiscount) }}</strong>\r\n        </div>\r\n      }\r\n      <div class="pos-add-product-dialog__preview-row pos-add-product-dialog__preview-row--total">\r\n        <span>Total l\xEDnea</span>\r\n        <strong>{{ formatCurrency(preview().lineTotal) }}</strong>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class="pos-dialog__actions">\r\n    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="cancel()"></app-button>\r\n    <app-button text="Agregar" custom_class="btn_primary" (clicked)="confirm()"></app-button>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/pos/components/pos-add-product-dialog/pos-add-product-dialog.component.scss */\n.pos-dialog {\n  padding: 20px;\n  min-width: 320px;\n}\n.pos-dialog__title {\n  margin: 0 0 4px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.pos-dialog__subtitle {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #6b7280;\n}\n.pos-dialog__fields {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.pos-dialog__field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n}\n.pos-dialog__field input {\n  padding: 8px 10px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.pos-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n}\n.pos-add-product-dialog__label {\n  display: block;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n  margin-bottom: 8px;\n}\n.pos-add-product-dialog__discounts {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n}\n.pos-add-product-dialog__radio {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: #374151;\n  cursor: pointer;\n}\n.pos-add-product-dialog__radio input {\n  margin: 0;\n}\n.pos-add-product-dialog__preview {\n  margin-top: 4px;\n  padding: 12px;\n  border-radius: 8px;\n  background: #eff6ff;\n  border: 1px solid #dbeafe;\n}\n.pos-add-product-dialog__preview-title {\n  margin: 0 0 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #1d4ed8;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n}\n.pos-add-product-dialog__preview-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13px;\n  color: #475569;\n  margin-bottom: 4px;\n}\n.pos-add-product-dialog__preview-row strong {\n  color: #0f172a;\n  font-weight: 600;\n}\n.pos-add-product-dialog__preview-row--discount strong {\n  color: #b45309;\n}\n.pos-add-product-dialog__preview-row--total {\n  margin-top: 6px;\n  padding-top: 6px;\n  border-top: 1px solid #bfdbfe;\n  font-size: 14px;\n}\n.pos-add-product-dialog__preview-row--total strong {\n  color: #1d4ed8;\n}\n/*# sourceMappingURL=pos-add-product-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosAddProductDialogComponent, { className: "PosAddProductDialogComponent", filePath: "src/app/features/pos/components/pos-add-product-dialog/pos-add-product-dialog.component.ts", lineNumber: 35 });
})();

// src/app/features/pos/utils/pos-order.util.ts
function todayIsoDate() {
  const d = /* @__PURE__ */ new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function mapCartLineToOrderLine(item) {
  const line = {
    product_id: item.product_id,
    product_uom_id: item.product_uom_id || item.uom_id,
    quantity: item.quantity,
    unit_price: Number(item.unit_price),
    iva_percentage: Number(item.iva_percentage ?? 0),
    ieps_percentage: Number(item.ieps_percentage ?? 0)
  };
  if (item.product_discount_id) {
    line.product_discount_id = item.product_discount_id;
  }
  return line;
}
function buildVentasPosOrderPayload(cartItems, ctx) {
  const terminal = ctx.terminalLabel?.trim() || "POS Ventas";
  return __spreadProps(__spreadValues({
    fiscal_configuration_id: ctx.fiscalConfigurationId,
    warehouse_id: ctx.warehouseId
  }, ctx.customerId != null && ctx.customerId !== "" ? { customer_id: ctx.customerId } : {}), {
    expected_delivery_date: todayIsoDate(),
    sales_order_type: "POS",
    seller_user_id: ctx.sellerUserId,
    notes: `POS Ventas - ${terminal}`,
    line_items: cartItems.map(mapCartLineToOrderLine)
  });
}
function isPosOrderQueued(order) {
  const status = String(order?.general_status ?? order?.status ?? "").toLowerCase();
  return status === "en cola";
}
function resolveFiscalConfigurationIdFromBranch(branch) {
  if (!branch || typeof branch !== "object") {
    return null;
  }
  const b = branch;
  return b.fiscal_configuration_id ?? b.fiscalConfigurationId ?? b.fiscal_configuration?.id ?? null;
}

// src/app/features/pos/pages/take-order/take-order.component.ts
var _c0 = ["posRoot"];
var _c1 = () => [];
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.price_list_id;
function TakeOrderComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "Verificando corte\u2026");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 Vendedor: ", ctx_r1.posState.sellerDisplayName());
  }
}
function TakeOrderComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "lucide-icon", 13);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Corte abierto");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 49);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, TakeOrderComponent_Conditional_11_Conditional_6_Template, 2, 1, "span", 49);
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Package);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.branchLabel(), " \xB7 ", ctx_r1.selectedWarehouseName());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.posState.seller()) ? 6 : -1, tmp_4_0);
  }
}
function TakeOrderComponent_Conditional_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Vendedor: ", ctx_r1.posState.sellerDisplayName());
  }
}
function TakeOrderComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "lucide-icon", 13);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Sin corte \u2014 ventas en cola");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(4, TakeOrderComponent_Conditional_12_Conditional_4_Template, 2, 1, "span", 49);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.AlertCircle);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.posState.seller() ? 4 : -1);
  }
}
function TakeOrderComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeSeller());
    });
    \u0275\u0275element(1, "lucide-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cambiar vendedor");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.User);
  }
}
function TakeOrderComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSellerCodeDialog());
    });
    \u0275\u0275element(1, "lucide-icon", 11);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "C\xF3digo vendedor");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.User);
  }
}
function TakeOrderComponent_Conditional_22_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Corte activo \u2014 las ventas van directo a cobranza.");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sin corte abierto \u2014 las ventas quedan en cola hasta que cobranza abra el d\xEDa.");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275conditionalCreate(1, TakeOrderComponent_Conditional_22_Conditional_1_Template, 2, 0, "span")(2, TakeOrderComponent_Conditional_22_Conditional_2_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("pos-shift-banner--open", ctx_r1.posState.shiftOpen())("pos-shift-banner--queue", ctx_r1.posState.salesQueueMode());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.posState.shiftOpen() ? 1 : 2);
  }
}
function TakeOrderComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 54);
    \u0275\u0275element(2, "lucide-icon", 55);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Identifica al vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Ingresa el c\xF3digo del vendedor POS para cargar el cat\xE1logo y registrar ventas.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 56);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_24_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSellerCodeDialog());
    });
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Ingresar c\xF3digo");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.User);
  }
}
function TakeOrderComponent_For_34_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 71);
    \u0275\u0275listener("error", function TakeOrderComponent_For_34_Conditional_2_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r8);
      const product_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPhotoError(product_r7.id));
    })("load", function TakeOrderComponent_For_34_Conditional_2_Template_img_load_0_listener() {
      \u0275\u0275restoreView(_r8);
      const product_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPhotoLoad(product_r7.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r1.getProductPhotoUrl(product_r7), \u0275\u0275sanitizeUrl)("alt", product_r7.name);
  }
}
function TakeOrderComponent_For_34_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275element(1, "lucide-icon", 72);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Sin foto");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Package);
  }
}
function TakeOrderComponent_For_34_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 61);
  }
}
function TakeOrderComponent_For_34_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(product_r7.cost || 0));
  }
}
function TakeOrderComponent_For_34_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1, "Sin precio");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_For_34_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275element(1, "lucide-icon", 73);
    \u0275\u0275text(2, " Descuentos ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Percent);
  }
}
function TakeOrderComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 57);
    \u0275\u0275listener("click", function TakeOrderComponent_For_34_Template_article_click_0_listener() {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.canAddToCart(product_r7) && ctx_r1.addProductToCart(product_r7));
    });
    \u0275\u0275elementStart(1, "div", 58);
    \u0275\u0275conditionalCreate(2, TakeOrderComponent_For_34_Conditional_2_Template, 1, 2, "img", 59)(3, TakeOrderComponent_For_34_Conditional_3_Template, 4, 1, "div", 60);
    \u0275\u0275conditionalCreate(4, TakeOrderComponent_For_34_Conditional_4_Template, 1, 0, "div", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 62)(6, "div", 63)(7, "h3", 64);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, TakeOrderComponent_For_34_Conditional_9_Template, 2, 1, "span", 65)(10, TakeOrderComponent_For_34_Conditional_10_Template, 2, 0, "span", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 67)(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 68);
    \u0275\u0275text(15, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(18, TakeOrderComponent_For_34_Conditional_18_Template, 3, 1, "span", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 70);
    \u0275\u0275listener("click", function TakeOrderComponent_For_34_Template_button_click_19_listener($event) {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.addProductToCart(product_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(20, "lucide-icon", 13);
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Agregar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("pos-card--disabled", !ctx_r1.canAddToCart(product_r7));
    \u0275\u0275attribute("title", ctx_r1.getDisabledTooltip(product_r7));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.hasProductPhoto(product_r7) ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isPhotoLoading(product_r7.id) ? 4 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(product_r7.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(product_r7.has_price ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(product_r7.sku);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Stock ", product_r7.total_available_quantity || 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasApplicableDiscounts(product_r7) ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.canAddToCart(product_r7));
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Plus);
  }
}
function TakeOrderComponent_Conditional_35_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 76);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_35_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.retryCatalogLoad());
    });
    \u0275\u0275text(1, " Reintentar ");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "lucide-icon", 74);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, TakeOrderComponent_Conditional_35_Conditional_4_Template, 2, 0, "button", 75);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Package);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.catalogEmptyMessage());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.priceListError() ? 4 : -1);
  }
}
function TakeOrderComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "div", 77);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando cat\xE1logo\u2026");
    \u0275\u0275elementEnd()();
  }
}
function TakeOrderComponent_For_47_Conditional_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 96);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r13 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", opt_r13.price_list_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", opt_r13.price_list_name, " \xB7 ", ctx_r1.formatCurrency(+opt_r13.price || 0), " ");
  }
}
function TakeOrderComponent_For_47_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 94);
    \u0275\u0275listener("ngModelChange", function TakeOrderComponent_For_47_Conditional_12_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const \u0275$index_219_r12 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPricingOptionChange(\u0275$index_219_r12, $event));
    });
    \u0275\u0275elementStart(1, "option", 95);
    \u0275\u0275text(2, "Lista: precio sugerido");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, TakeOrderComponent_For_47_Conditional_12_For_4_Template, 2, 3, "option", 96, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const item_r15 = ctx_r13.$implicit;
    const \u0275$index_219_r12 = ctx_r13.$index;
    \u0275\u0275property("id", "pos-price-list-" + \u0275$index_219_r12)("ngModel", item_r15.selected_price_list_id || "");
    \u0275\u0275attribute("aria-label", "Lista de precio para " + item_r15.product_name);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(item_r15.pricing_options || \u0275\u0275pureFunction0(3, _c1));
  }
}
function TakeOrderComponent_For_47_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r15 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r15.selected_discount.name, " \xB7 -", ctx_r1.formatCurrency(item_r15.line_discount_amount), " ");
  }
}
function TakeOrderComponent_For_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 37)(1, "div", 78)(2, "div", 79)(3, "h4", 80);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 81)(6, "span", 82);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 83);
    \u0275\u0275text(9, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 84);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, TakeOrderComponent_For_47_Conditional_12_Template, 5, 4, "select", 85);
    \u0275\u0275conditionalCreate(13, TakeOrderComponent_For_47_Conditional_13_Template, 2, 2, "p", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 87);
    \u0275\u0275listener("click", function TakeOrderComponent_For_47_Template_button_click_14_listener() {
      const \u0275$index_219_r12 = \u0275\u0275restoreView(_r10).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeItem(\u0275$index_219_r12));
    });
    \u0275\u0275element(15, "lucide-icon", 73);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 88)(17, "div", 89)(18, "button", 90);
    \u0275\u0275listener("click", function TakeOrderComponent_For_47_Template_button_click_18_listener() {
      const ctx_r15 = \u0275\u0275restoreView(_r10);
      const item_r15 = ctx_r15.$implicit;
      const \u0275$index_219_r12 = ctx_r15.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_219_r12, item_r15.quantity - 1));
    });
    \u0275\u0275element(19, "lucide-icon", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 91);
    \u0275\u0275listener("change", function TakeOrderComponent_For_47_Template_input_change_20_listener($event) {
      const \u0275$index_219_r12 = \u0275\u0275restoreView(_r10).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_219_r12, +$event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 92);
    \u0275\u0275listener("click", function TakeOrderComponent_For_47_Template_button_click_21_listener() {
      const ctx_r16 = \u0275\u0275restoreView(_r10);
      const item_r15 = ctx_r16.$implicit;
      const \u0275$index_219_r12 = ctx_r16.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_219_r12, item_r15.quantity + 1));
    });
    \u0275\u0275element(22, "lucide-icon", 73);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "span", 93);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r15.product_name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r15.product_sku);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.formatCurrency(item_r15.unit_price), " \xB7 ", item_r15.uom_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(((item_r15.pricing_options == null ? null : item_r15.pricing_options.length) || 0) > 0 ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r15.selected_discount ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Trash2);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", "Cantidad de " + item_r15.product_name);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Minus);
    \u0275\u0275advance();
    \u0275\u0275property("value", item_r15.quantity);
    \u0275\u0275attribute("aria-label", "Cantidad");
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Plus);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r15.line_total));
  }
}
function TakeOrderComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275element(1, "lucide-icon", 97);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Carrito vac\xEDo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Elige productos del cat\xE1logo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.ShoppingCart);
  }
}
function TakeOrderComponent_Conditional_50_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const discount_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("\u2022 ", discount_r18.discountName, " \xB7 ", discount_r18.productName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-", ctx_r1.formatCurrency(discount_r18.amount));
  }
}
function TakeOrderComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "h3", 98);
    \u0275\u0275text(2, "Descuentos aplicados");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, TakeOrderComponent_Conditional_50_For_4_Template, 5, 3, "div", 99, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.cartAppliedDiscounts());
  }
}
function TakeOrderComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "span");
    \u0275\u0275text(2, "Descuentos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("-", ctx_r1.formatCurrency(ctx_r1.posService.cart().total_discount));
  }
}
var TakeOrderComponent = class _TakeOrderComponent {
  posService;
  posState;
  warehouseService;
  authService;
  router;
  toast;
  dialog;
  posRootRef;
  Search = Search;
  Plus = Plus;
  ShoppingCart = ShoppingCart;
  Trash2 = Trash2;
  Minus = Minus;
  Maximize2 = Maximize2;
  Minimize2 = Minimize2;
  Monitor = Monitor;
  Package = Package;
  AlertCircle = CircleAlert;
  User = User;
  Percent = Percent;
  products = signal([], ...ngDevMode ? [{ debugName: "products" }] : []);
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  filteredProducts = signal([], ...ngDevMode ? [{ debugName: "filteredProducts" }] : []);
  selectedWarehouse = signal("", ...ngDevMode ? [{ debugName: "selectedWarehouse" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  priceListError = signal(false, ...ngDevMode ? [{ debugName: "priceListError" }] : []);
  isFullscreen = signal(false, ...ngDevMode ? [{ debugName: "isFullscreen" }] : []);
  cartAppliedDiscounts = computed(() => this.posService.cart().items.filter((item) => item.line_discount_amount > 0 && item.selected_discount).map((item) => ({
    productName: item.product_name,
    discountName: item.selected_discount.name,
    amount: item.line_discount_amount
  })), ...ngDevMode ? [{ debugName: "cartAppliedDiscounts" }] : []);
  cartHasDiscounts = computed(() => this.posService.cart().total_discount > 0, ...ngDevMode ? [{ debugName: "cartHasDiscounts" }] : []);
  lastInventorySummary = signal(null, ...ngDevMode ? [{ debugName: "lastInventorySummary" }] : []);
  photoLoadingStates = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "photoLoadingStates" }] : []);
  photoErrorStates = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "photoErrorStates" }] : []);
  sellerDialogOpen = false;
  constructor(posService, posState, warehouseService, authService, router, toast, dialog) {
    this.posService = posService;
    this.posState = posState;
    this.warehouseService = warehouseService;
    this.authService = authService;
    this.router = router;
    this.toast = toast;
    this.dialog = dialog;
  }
  canSell = computed(() => this.posState.canCaptureSales(), ...ngDevMode ? [{ debugName: "canSell" }] : []);
  cartProductsTabLabel = computed(() => {
    const count = this.posService.cart().items.length;
    return count > 0 ? `Carrito (${count})` : "Carrito";
  }, ...ngDevMode ? [{ debugName: "cartProductsTabLabel" }] : []);
  notifyError(message, duration = 4500) {
    this.toast.error(message, { duration });
  }
  notifySuccess(message, duration = 3e3) {
    this.toast.success(message, { duration });
  }
  notifyInfo(message, duration = 3500) {
    this.toast.info(message, { duration });
  }
  ngOnInit() {
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
    if (this.authService.isPosCobranzaTerminal()) {
      void this.router.navigate(["/pos/cobranza"], { replaceUrl: true });
      return;
    }
    this.loadData();
  }
  isCobranzaTerminal() {
    return this.authService.isPosCobranzaTerminal();
  }
  ngOnDestroy() {
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
  }
  terminalLabel() {
    const email = this.authService.user_info?.email ?? "";
    return email.split("@")[0] || "Ventas";
  }
  branchLabel() {
    const branch = this.posState.dailyShift()?.billing_branch;
    return branch?.display_name || branch?.code || "Sucursal";
  }
  selectedWarehouseName() {
    const id = this.selectedWarehouse();
    const w = this.warehouses().find((x) => x.id === id);
    return w?.name ?? "Almac\xE9n";
  }
  loadData() {
    this.refreshDailyShift();
  }
  applyInventorySummaryMeta(summary) {
    const enriched = enrichPosInventorySummary(summary);
    this.lastInventorySummary.set(enriched);
    if (enriched.warehouses.length > 0) {
      this.warehouses.set(enriched.warehouses);
    }
    const warehouseId = resolvePosWarehouseId(enriched);
    if (warehouseId) {
      this.selectedWarehouse.set(warehouseId);
      persistPosWarehouseId(warehouseId);
    }
  }
  resolveBillingBranchId() {
    return this.lastInventorySummary()?.billing_branch_id?.trim() || this.authService.getBillingBranchId() || this.posState.dailyShift()?.billing_branch?.id?.trim() || null;
  }
  resolveWarehouseForSaleSync() {
    const current = this.selectedWarehouse()?.trim();
    if (current) {
      return current;
    }
    const summary = this.lastInventorySummary();
    if (summary) {
      const fromSummary = resolvePosWarehouseId(summary);
      if (fromSummary) {
        this.selectedWarehouse.set(fromSummary);
        persistPosWarehouseId(fromSummary);
        return fromSummary;
      }
    }
    return "";
  }
  ensureWarehouseForSale(onReady) {
    const resolved = this.resolveWarehouseForSaleSync();
    if (resolved) {
      onReady(resolved);
      return;
    }
    const branchId = this.resolveBillingBranchId();
    if (!branchId) {
      this.notifyError("Tu usuario POS no tiene sucursal asignada. Pide al administrador que la configure.", 6e3);
      return;
    }
    this.warehouseService.getWarehouses({ limit: 100, status: "active" }).subscribe({
      next: (response) => {
        const branchWarehouses = (response.data ?? []).filter((warehouse) => (warehouse.billing_branch_id || "").trim() === branchId);
        const pick = branchWarehouses[0];
        if (!pick?.id) {
          this.notifyError("No hay almac\xE9n activo para tu sucursal POS. Revisa la configuraci\xF3n en Ajustes.", 6e3);
          return;
        }
        const mapped = branchWarehouses.map((warehouse) => ({
          id: warehouse.id,
          name: warehouse.name,
          status: warehouse.status
        }));
        this.warehouses.set(mapped);
        this.selectedWarehouse.set(pick.id);
        persistPosWarehouseId(pick.id);
        onReady(pick.id);
      },
      error: () => {
        this.notifyError("No se pudo resolver el almac\xE9n de tu sucursal POS. Intenta de nuevo.", 5e3);
      }
    });
  }
  refreshDailyShift() {
    this.posState.checkingShift.set(true);
    this.posService.getCurrentDailyShift().subscribe({
      next: ({ daily_shift }) => {
        if (daily_shift) {
          this.posState.setDailyShift(daily_shift);
        }
        this.posState.checkingShift.set(false);
        const shift = this.posState.dailyShift();
        if (dailyShiftIsOpen(shift)) {
          this.ensureFiscalFromShift(shift);
        }
        if (this.posState.seller()) {
          this.loadProducts();
        }
        this.maybePromptSellerCode();
      },
      error: (error) => {
        this.posState.checkingShift.set(false);
        if (!dailyShiftIsOpen(this.posState.dailyShift())) {
          this.posState.setDailyShift(null);
        }
        if (this.posState.seller()) {
          this.loadProducts();
        }
        this.maybePromptSellerCode();
        if (error?.status !== 404) {
          this.notifyError(mapPosApiErrorMessage(error.error?.message), 5e3);
        }
      }
    });
  }
  ensureFiscalFromShift(shift) {
    if (this.posState.fiscalConfigurationId()) {
      return;
    }
    const fiscalId = resolveFiscalConfigurationIdFromBranch(shift.billing_branch);
    if (fiscalId) {
      this.posState.fiscalConfigurationId.set(String(fiscalId));
    }
  }
  maybePromptSellerCode() {
    if (this.authService.isPosCobranzaTerminal()) {
      return;
    }
    if (!this.posState.needsSellerCode() || this.sellerDialogOpen) {
      return;
    }
    void this.openSellerCodeDialog();
  }
  async openSellerCodeDialog() {
    if (this.sellerDialogOpen) {
      return;
    }
    this.sellerDialogOpen = true;
    await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(SellerCodeDialogComponent, {
      width: "400px",
      maxWidth: "95vw",
      disableClose: true,
      panelClass: "pos-dialog-panel"
    });
    dialogRef.afterClosed().subscribe((code) => {
      this.sellerDialogOpen = false;
      if (code == null) {
        return;
      }
      this.posService.validateSellerCode(code).subscribe({
        next: (response) => {
          if (response.daily_shift) {
            this.posState.setDailyShift(response.daily_shift);
          }
          const branch = response.terminal_user?.billing_branch;
          const fiscalId = resolveFiscalConfigurationIdFromBranch(branch);
          if (fiscalId) {
            this.posState.fiscalConfigurationId.set(String(fiscalId));
          }
          this.posState.setSeller(response.seller);
          this.notifySuccess(`Vendedor: ${this.posState.sellerDisplayName()}`, 3e3);
          this.loadProducts();
        },
        error: (error) => {
          this.notifyError(mapPosApiErrorMessage(error.error?.message), 5e3);
          void this.openSellerCodeDialog();
        }
      });
    });
  }
  changeSeller() {
    this.posState.clearSeller();
    void this.openSellerCodeDialog();
  }
  onSearchChange() {
    if (this.canSell()) {
      this.loadProducts(this.searchTerm());
      return;
    }
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      this.filteredProducts.set(this.products());
      return;
    }
    const filtered = this.products().filter((p) => p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term));
    this.filteredProducts.set(filtered);
  }
  addProductToCart(product) {
    if (!this.canSell()) {
      this.notifyInfo("Ingresa el c\xF3digo del vendedor para agregar productos", 4e3);
      return;
    }
    if (!product.has_price) {
      this.notifyError("Este producto no tiene precio configurado", 3e3);
      return;
    }
    if (this.hasApplicableDiscounts(product)) {
      void this.openAddProductDialog(product);
      return;
    }
    this.commitProductToCart(product, {
      quantity: 1,
      product_discount_id: null,
      selected_discount: null
    });
  }
  hasApplicableDiscounts(product) {
    return Boolean(product.has_applicable_discounts) || Array.isArray(product.applicable_discounts) && product.applicable_discounts.length > 0;
  }
  async openAddProductDialog(product) {
    await this.exitFullscreenForDialog();
    const discounts = product.applicable_discounts ?? [];
    const dialogRef = this.dialog.open(PosAddProductDialogComponent, {
      width: "440px",
      maxWidth: "95vw",
      panelClass: "pos-dialog-panel",
      data: {
        product_id: product.product_id || product.id,
        product_name: product.product_name || product.name,
        product_sku: product.product_sku || product.sku || "",
        product_uom_id: product.product_uom_id || product.uom_id || "",
        uom_id: product.uom_id || "",
        uom_name: product.uom_name || "Pieza",
        unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
        iva_percentage: Number(product.suggested_iva_percentage ?? 16),
        ieps_percentage: Number(product.suggested_ieps_percentage ?? 0),
        applicable_discounts: discounts
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.commitProductToCart(product, result);
    });
  }
  commitProductToCart(product, selection) {
    const cartItem = this.buildCartItem(product, selection);
    this.posService.addItem(cartItem);
    this.notifySuccess(`${cartItem.product_name} agregado`, 2e3);
  }
  buildCartItem(product, selection) {
    const productUomId = String(product.product_uom_id || product.uom_id || "").trim();
    const base = {
      product_id: product.product_id || product.id,
      product_name: product.product_name || product.name,
      product_sku: product.product_sku || product.sku || "",
      product_uom_id: productUomId,
      uom_id: product.uom_id || productUomId,
      uom_name: product.uom_name || "Pieza",
      quantity: Math.max(1, selection.quantity),
      unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      iva_percentage: Number(product.suggested_iva_percentage ?? 16),
      ieps_percentage: Number(product.suggested_ieps_percentage ?? 0),
      subtotal: 0,
      line_gross_subtotal: 0,
      line_discount_amount: 0,
      iva_amount: 0,
      ieps_amount: 0,
      line_total: 0,
      product_discount_id: selection.product_discount_id,
      selected_discount: selection.selected_discount,
      pricing_options: Array.isArray(product.pricing_options) ? product.pricing_options : [],
      selected_price_list_id: "",
      suggested_unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      suggested_iva_percentage: Number(product.suggested_iva_percentage ?? 16),
      suggested_ieps_percentage: Number(product.suggested_ieps_percentage ?? 0)
    };
    return this.posService.recalculateItem(base);
  }
  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.posService.removeItem(index);
    } else {
      this.posService.updateItemQuantity(index, quantity);
    }
  }
  removeItem(index) {
    this.posService.removeItem(index);
  }
  onPricingOptionChange(index, optionId) {
    const item = this.posService.cart().items[index];
    if (!item)
      return;
    if (!optionId) {
      this.posService.updateItemPricing(index, {
        unit_price: Number(item.suggested_unit_price ?? item.unit_price ?? 0),
        iva_percentage: Number(item.suggested_iva_percentage ?? item.iva_percentage ?? 0),
        ieps_percentage: Number(item.suggested_ieps_percentage ?? item.ieps_percentage ?? 0),
        selected_price_list_id: ""
      });
      return;
    }
    const options = Array.isArray(item.pricing_options) ? item.pricing_options : [];
    const selected = options.find((opt) => String(opt.price_list_id) === String(optionId));
    if (!selected)
      return;
    this.posService.updateItemPricing(index, {
      unit_price: Number(selected.price ?? item.unit_price ?? 0),
      iva_percentage: Number(selected.iva_percentage ?? item.iva_percentage ?? 0),
      ieps_percentage: Number(selected.ieps_percentage ?? item.ieps_percentage ?? 0),
      selected_price_list_id: optionId
    });
  }
  saveOrder() {
    if (!this.canSell()) {
      this.notifyError("Identifica al vendedor con su c\xF3digo para registrar la venta", 4e3);
      void this.openSellerCodeDialog();
      return;
    }
    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.notifyInfo("Agrega productos a la orden", 3e3);
      return;
    }
    const seller = this.posState.seller();
    if (!seller?.id) {
      void this.openSellerCodeDialog();
      return;
    }
    this.ensureWarehouseForSale((warehouseId) => {
      const fiscalConfigurationId = this.posState.fiscalConfigurationId();
      if (!fiscalConfigurationId) {
        this.notifyError("No hay configuraci\xF3n fiscal en la sucursal del POS. Revisa la sucursal en Ajustes.", 6e3);
        return;
      }
      const payload = buildVentasPosOrderPayload(cart.items, {
        warehouseId,
        fiscalConfigurationId,
        sellerUserId: seller.id,
        terminalLabel: this.terminalLabel()
      });
      this.saving.set(true);
      this.posService.createPosSalesOrder(payload).subscribe({
        next: (order) => {
          this.saving.set(false);
          const folioLabel = order.folio ? order.folio : "sin folio";
          const queued = isPosOrderQueued(order) || this.posState.salesQueueMode();
          const message = queued ? `Venta en cola (${folioLabel}). El cliente debe pasar a cobranza cuando abran el corte del d\xEDa.` : `Venta registrada (${folioLabel}). El cliente debe pasar a cobranza para pagar.`;
          this.notifySuccess(message, 6e3);
          this.posService.clearCart();
          this.loadProducts(this.searchTerm());
        },
        error: (error) => {
          this.saving.set(false);
          const backendMessage = error?.error?.message;
          const msg = mapPosApiErrorMessage(backendMessage) || "Error al crear la orden de venta";
          this.notifyError(msg, 6e3);
          if (error?.status === 400 && isDiscountApiError(backendMessage)) {
            this.loadProducts(this.searchTerm());
          }
        }
      });
    });
  }
  cancel() {
    if (confirm("\xBFDescartar orden actual?")) {
      this.posService.clearCart();
      this.router.navigate(["/pos/ventas"]);
    }
  }
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  }
  getProductPhotoUrl(product) {
    if (product.primary_photo_url) {
      return product.primary_photo_url;
    }
    return "";
  }
  hasProductPhoto(product) {
    return !!product.primary_photo_url && !this.hasPhotoError(product.id);
  }
  isPhotoLoading(productId) {
    return this.photoLoadingStates().get(productId) || false;
  }
  hasPhotoError(productId) {
    return this.photoErrorStates().get(productId) || false;
  }
  onPhotoError(productId) {
    const errorStates = new Map(this.photoErrorStates());
    errorStates.set(productId, true);
    this.photoErrorStates.set(errorStates);
  }
  onPhotoLoad(productId) {
    const loadingStates = new Map(this.photoLoadingStates());
    loadingStates.set(productId, false);
    this.photoLoadingStates.set(loadingStates);
  }
  canAddToCart(product) {
    if (!this.canSell()) {
      return false;
    }
    if (this.priceListError()) {
      return false;
    }
    const stock = Number(product.total_available_quantity ?? 0);
    const hasPrice = product.suggested_unit_price != null || product.cost != null;
    return stock > 0 && hasPrice;
  }
  getDisabledTooltip(product) {
    if (!this.posState.seller()) {
      return "Identifica al vendedor con su c\xF3digo";
    }
    if (Number(product.total_available_quantity ?? 0) <= 0) {
      return "Sin stock disponible";
    }
    if (product.suggested_unit_price == null && product.cost == null) {
      return "Producto sin precio configurado";
    }
    return "";
  }
  async toggleFullscreen() {
    const root = this.posRootRef?.nativeElement;
    if (!root)
      return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await root.requestFullscreen();
      }
    } catch {
      this.notifyError("No se pudo cambiar a pantalla completa", 2500);
    }
  }
  onFullscreenChange = () => {
    this.isFullscreen.set(!!document.fullscreenElement);
  };
  async exitFullscreenForDialog() {
    if (!document.fullscreenElement)
      return;
    try {
      await document.exitFullscreen();
      this.isFullscreen.set(false);
    } catch {
    }
  }
  cartQueueHint() {
    if (this.posState.shiftOpen()) {
      return "Corte activo \u2014 la venta ir\xE1 directo a cobranza pendiente de pago.";
    }
    return "Sin corte abierto \u2014 la venta quedar\xE1 en cola hasta que cobranza abra el d\xEDa.";
  }
  catalogEmptyMessage() {
    if (this.priceListError()) {
      return "No se pudo cargar el cat\xE1logo. Revisa la sucursal y el almac\xE9n.";
    }
    if (this.searchTerm().trim()) {
      return "No hay productos que coincidan con tu b\xFAsqueda.";
    }
    return "No hay productos disponibles en este almac\xE9n.";
  }
  retryCatalogLoad() {
    this.loadProducts(this.searchTerm());
  }
  loadProducts(search = "") {
    if (!this.posState.seller()) {
      return;
    }
    this.loading.set(true);
    this.posService.getPosInventorySummary({
      search: search.trim() || void 0,
      limit: 200
    }).subscribe({
      next: (summary) => {
        this.applyInventorySummaryMeta(summary);
        const rows = summary.data ?? [];
        const normalized = (rows || []).map((row) => __spreadProps(__spreadValues({}, row), {
          id: row.product_id || row.id,
          name: row.product_name || row.name || "Producto",
          sku: row.product_sku || row.sku || "",
          primary_photo_url: row.product_photo || row.primary_photo_url || null,
          cost: Number(row.suggested_unit_price ?? row.cost ?? 0),
          has_price: row.suggested_unit_price != null || row.cost != null,
          total_available_quantity: Number(row.total_available_quantity ?? row.available_quantity ?? 0),
          pricing_options: Array.isArray(row.pricing_options) ? row.pricing_options : [],
          product_uom_id: row.product_uom_id || row.uom_id || "",
          applicable_discounts: Array.isArray(row.applicable_discounts) ? row.applicable_discounts : [],
          has_applicable_discounts: Boolean(row.has_applicable_discounts) || Array.isArray(row.applicable_discounts) && row.applicable_discounts.length > 0
        }));
        this.products.set(normalized);
        this.filteredProducts.set(normalized);
        if (!this.selectedWarehouse() && this.lastInventorySummary()) {
          const warehouseId = resolvePosWarehouseId(this.lastInventorySummary());
          if (warehouseId) {
            this.selectedWarehouse.set(warehouseId);
            persistPosWarehouseId(warehouseId);
          }
        }
        this.priceListError.set(false);
        this.loading.set(false);
      },
      error: (error) => {
        const recovery = normalizePosInventorySummary(error?.error);
        if (error?.status === 400 && recovery.warehouses.length > 0) {
          persistPosWarehouseId("");
          this.applyInventorySummaryMeta(recovery);
          this.loadProducts(search);
          return;
        }
        this.products.set([]);
        this.filteredProducts.set([]);
        this.priceListError.set(true);
        this.loading.set(false);
        this.notifyError("No se pudo cargar inventario POS", 4e3);
      }
    });
  }
  static \u0275fac = function TakeOrderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TakeOrderComponent)(\u0275\u0275directiveInject(POSService), \u0275\u0275directiveInject(PosStateService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TakeOrderComponent, selectors: [["app-take-order"]], viewQuery: function TakeOrderComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.posRootRef = _t.first);
    }
  }, decls: 79, vars: 34, consts: [["posRoot", ""], [1, "pos-take-root"], [1, "pos-session-bar"], [1, "pos-session-bar__content"], [1, "pos-session-bar__left"], [1, "pos-session-bar__title"], [1, "pos-session-bar__title-icon", 3, "img"], [1, "pos-session-bar__center"], [1, "pos-session-bar__checking"], [1, "pos-session-bar__right"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", "pos-btn--icon", 3, "click"], [1, "pos-ic", "pos-ic--btn", 3, "img"], [1, "pos-terminal-chip"], [1, "pos-ic", "pos-ic--sm", 3, "img"], [1, "pos-terminal-chip__label"], ["type", "button", 1, "pos-btn", "pos-btn--ghost"], ["type", "button", 1, "pos-btn", "pos-btn--primary"], [1, "pos-shift-banner", 3, "pos-shift-banner--open", "pos-shift-banner--queue"], [1, "pos-take-body"], ["aria-hidden", "true", 1, "pos-lock-overlay"], [1, "pos-catalog"], [1, "pos-catalog__toolbar"], [1, "pos-search"], [1, "pos-search__icon", 3, "img"], ["type", "search", "placeholder", "Buscar por nombre o SKU\u2026", "autocomplete", "off", 1, "pos-search__input", 3, "ngModelChange", "ngModel"], [1, "pos-catalog__hint"], [1, "pos-product-grid"], [1, "pos-card", 3, "pos-card--disabled"], [1, "pos-empty-grid"], [1, "pos-loading-grid"], [1, "pos-cart"], [1, "pos-cart__head"], [1, "pos-cart__head-title"], [1, "pos-ic", 3, "img"], [1, "pos-cart__body"], [1, "pos-cart__panel", "pos-cart__panel--products"], [1, "pos-cart__lines"], [1, "pos-line"], [1, "pos-cart-empty"], [1, "pos-cart__summary"], [1, "pos-cart__discounts"], [1, "pos-sum-row"], [1, "pos-sum-row", "pos-sum-row--discount"], [1, "pos-sum-row", "pos-sum-row--total"], [1, "pos-cart__hint"], [1, "pos-cart__actions"], ["type", "button", 1, "pos-btn", "pos-btn--muted", 3, "click", "disabled"], ["type", "button", 1, "pos-btn", "pos-btn--accent", 3, "click", "disabled"], [1, "pos-pill", "pos-pill--ok"], [1, "pos-session-meta"], [1, "pos-pill", "pos-pill--warn"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", 3, "click"], ["type", "button", 1, "pos-btn", "pos-btn--primary", 3, "click"], [1, "pos-shift-banner"], [1, "pos-lock-card"], [1, "pos-lock-card__icon", 3, "img"], ["type", "button", 1, "pos-btn", "pos-btn--primary", "pos-btn--lg", 3, "click"], [1, "pos-card", 3, "click"], [1, "pos-card__media"], ["loading", "lazy", 3, "src", "alt"], [1, "pos-card__media-placeholder"], [1, "pos-card__media-loading"], [1, "pos-card__body"], [1, "pos-card__head"], [1, "pos-card__name"], [1, "pos-card__price"], [1, "pos-card__no-price"], [1, "pos-card__meta"], ["aria-hidden", "true", 1, "pos-card__meta-dot"], [1, "pos-card__discount-badge"], ["type", "button", 1, "pos-card__add", 3, "click", "disabled"], ["loading", "lazy", 3, "error", "load", "src", "alt"], [1, "pos-card__media-placeholder-icon", 3, "img"], [1, "pos-ic", "pos-ic--xs", 3, "img"], [1, "pos-empty-grid__icon", 3, "img"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", "pos-empty-grid__retry"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", "pos-empty-grid__retry", 3, "click"], [1, "pos-spinner"], [1, "pos-line__top"], [1, "pos-line__info"], [1, "pos-line__name"], [1, "pos-line__meta"], [1, "pos-line__sku"], ["aria-hidden", "true", 1, "pos-line__meta-sep"], [1, "pos-line__unit"], [1, "pos-line__pricing-select", 3, "id", "ngModel"], [1, "pos-line__discount"], ["type", "button", "title", "Quitar del carrito", "aria-label", "Quitar del carrito", 1, "pos-line__remove", 3, "click"], [1, "pos-line__bottom"], ["role", "group", 1, "pos-qty"], ["type", "button", "aria-label", "Disminuir cantidad", 1, "pos-qty__btn", 3, "click"], ["type", "number", "min", "1", 1, "pos-qty__input", 3, "change", "value"], ["type", "button", "aria-label", "Aumentar cantidad", 1, "pos-qty__btn", 3, "click"], [1, "pos-line__total"], [1, "pos-line__pricing-select", 3, "ngModelChange", "id", "ngModel"], ["value", ""], [3, "value"], [1, "pos-cart-empty__icon", 3, "img"], [1, "pos-cart__discounts-title"], [1, "pos-cart__discount-row"]], template: function TakeOrderComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1, 0)(2, "header", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "lucide-icon", 6);
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8, "Punto de Venta");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275conditionalCreate(10, TakeOrderComponent_Conditional_10_Template, 2, 0, "span", 8)(11, TakeOrderComponent_Conditional_11_Template, 7, 4)(12, TakeOrderComponent_Conditional_12_Template, 5, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 9)(14, "button", 10);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleFullscreen());
      });
      \u0275\u0275element(15, "lucide-icon", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 12);
      \u0275\u0275element(17, "lucide-icon", 13);
      \u0275\u0275elementStart(18, "span", 14);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(20, TakeOrderComponent_Conditional_20_Template, 4, 1, "button", 15);
      \u0275\u0275conditionalCreate(21, TakeOrderComponent_Conditional_21_Template, 4, 1, "button", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(22, TakeOrderComponent_Conditional_22_Template, 3, 5, "div", 17);
      \u0275\u0275elementStart(23, "div", 18);
      \u0275\u0275conditionalCreate(24, TakeOrderComponent_Conditional_24_Template, 10, 1, "div", 19);
      \u0275\u0275elementStart(25, "section", 20)(26, "div", 21)(27, "div", 22);
      \u0275\u0275element(28, "lucide-icon", 23);
      \u0275\u0275elementStart(29, "input", 24);
      \u0275\u0275listener("ngModelChange", function TakeOrderComponent_Template_input_ngModelChange_29_listener($event) {
        \u0275\u0275restoreView(_r1);
        ctx.searchTerm.set($event);
        return \u0275\u0275resetView(ctx.onSearchChange());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "p", 25);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 26);
      \u0275\u0275repeaterCreate(33, TakeOrderComponent_For_34_Template, 23, 12, "article", 27, _forTrack02);
      \u0275\u0275conditionalCreate(35, TakeOrderComponent_Conditional_35_Template, 5, 3, "div", 28);
      \u0275\u0275conditionalCreate(36, TakeOrderComponent_Conditional_36_Template, 4, 0, "div", 29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "aside", 30)(38, "div", 31)(39, "div", 32);
      \u0275\u0275element(40, "lucide-icon", 33);
      \u0275\u0275elementStart(41, "h2");
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 34)(44, "div", 35)(45, "div", 36);
      \u0275\u0275repeaterCreate(46, TakeOrderComponent_For_47_Template, 25, 13, "article", 37, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(48, TakeOrderComponent_Conditional_48_Template, 6, 1, "div", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div", 39);
      \u0275\u0275conditionalCreate(50, TakeOrderComponent_Conditional_50_Template, 5, 0, "div", 40);
      \u0275\u0275elementStart(51, "div", 41)(52, "span");
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "strong");
      \u0275\u0275text(55);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(56, TakeOrderComponent_Conditional_56_Template, 5, 1, "div", 42);
      \u0275\u0275elementStart(57, "div", 41)(58, "span");
      \u0275\u0275text(59, "IVA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "strong");
      \u0275\u0275text(61);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "div", 41)(63, "span");
      \u0275\u0275text(64, "IEPS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "strong");
      \u0275\u0275text(66);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(67, "div", 43)(68, "span");
      \u0275\u0275text(69, "Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "strong");
      \u0275\u0275text(71);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(72, "p", 44);
      \u0275\u0275text(73);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(74, "div", 45)(75, "button", 46);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_75_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.cancel());
      });
      \u0275\u0275text(76, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "button", 47);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_77_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.saveOrder());
      });
      \u0275\u0275text(78);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("pos-take-root--fullscreen", ctx.isFullscreen());
      \u0275\u0275advance(6);
      \u0275\u0275property("img", ctx.Monitor);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.posState.checkingShift() ? 10 : ctx.posState.shiftOpen() ? 11 : 12);
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.isFullscreen() ? ctx.Minimize2 : ctx.Maximize2);
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.Monitor);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.terminalLabel());
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isCobranzaTerminal() && ctx.posState.seller() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isCobranzaTerminal() && ctx.posState.needsSellerCode() ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.posState.checkingShift() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("pos-take-body--locked", !ctx.isCobranzaTerminal() && !ctx.canSell());
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isCobranzaTerminal() && !ctx.canSell() ? 24 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.Search);
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.searchTerm());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.filteredProducts().length, " productos");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredProducts());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.filteredProducts().length === 0 && !ctx.loading() ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 36 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.ShoppingCart);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.cartProductsTabLabel());
      \u0275\u0275advance(3);
      \u0275\u0275classProp("pos-cart__lines--empty", ctx.posService.cart().items.length === 0);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.posService.cart().items);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.posService.cart().items.length === 0 ? 48 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.cartAppliedDiscounts().length > 0 ? 50 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.cartHasDiscounts() ? "Subtotal" : "Subtotal");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.cartHasDiscounts() ? ctx.posService.cart().total_gross_subtotal : ctx.posService.cart().total_subtotal));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.cartHasDiscounts() ? 56 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.posService.cart().total_iva));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.posService.cart().total_ieps));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.posService.cart().grand_total));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.cartQueueHint());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving() || !ctx.canSell() || ctx.posService.cart().items.length === 0);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Guardando\u2026" : "Registrar venta", " ");
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, LucideAngularModule, LucideAngularComponent], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  --pos-bg: #0f172a;\n  --pos-surface: #ffffff;\n  --pos-muted: #64748b;\n  --pos-border: #e5e7eb;\n  --pos-accent: #6366f1;\n  --pos-accent2: #8b5cf6;\n  --pos-success: #10b981;\n  --pos-warn: #f59e0b;\n  --pos-radius: 12px;\n  --pos-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.12);\n  --pos-panel-x: 1.25rem;\n  --pos-panel-y: 1rem;\n  --pos-panel-head-h: 52px;\n  display: block;\n  min-height: 100%;\n}\n.pos-take-root[_ngcontent-%COMP%] {\n  height: calc(100vh - 0px);\n  display: flex;\n  flex-direction: column;\n  background: #f1f5f9;\n  padding: 0.65rem 0.75rem 0;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.pos-take-root--fullscreen[_ngcontent-%COMP%] {\n  width: 100vw;\n  height: 100vh;\n  padding: 0.55rem 0.65rem 0;\n}\n.pos-session-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      105deg,\n      #0f172a 0%,\n      #1e1b4b 45%,\n      #312e81 100%);\n  color: #f8fafc;\n  padding: 0.4rem clamp(0.75rem, 2vw, 1.25rem);\n  box-shadow: 0 2px 16px rgba(15, 23, 42, 0.28);\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n.pos-shift-banner[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0.75rem;\n  padding: 0.55rem 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.pos-shift-banner--queue[_ngcontent-%COMP%] {\n  background: #fff7ed;\n  border: 1px solid #fed7aa;\n  color: #9a3412;\n}\n.pos-shift-banner--open[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #065f46;\n}\n.pos-session-bar__content[_ngcontent-%COMP%] {\n  max-width: 1680px;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.45rem 0.85rem;\n  justify-content: space-between;\n  min-height: 40px;\n}\n.pos-session-bar__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem 1.35rem;\n  padding-left: 0.15rem;\n}\n.pos-session-bar__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  letter-spacing: -0.02em;\n}\n.pos-session-bar__title-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 18px;\n  height: 18px;\n  opacity: 0.95;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-session-bar__center[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem 0.75rem;\n  min-width: 200px;\n}\n.pos-session-bar__checking[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.85;\n}\n.pos-session-meta[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.75;\n}\n.pos-session-bar__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.pos-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  line-height: 1.2;\n  max-width: 100%;\n}\n.pos-pill--ok[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.2);\n  color: #a7f3d0;\n  border: 1px solid rgba(16, 185, 129, 0.35);\n}\n.pos-pill--warn[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fde68a;\n  border: 1px solid rgba(245, 158, 11, 0.35);\n}\n.pos-terminal-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: rgba(99, 102, 241, 0.35);\n  padding: 0.28rem 0.65rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  border: 1px solid rgba(165, 180, 252, 0.35);\n  line-height: 1.2;\n}\n.pos-session-bar[_ngcontent-%COMP%]   .pos-btn[_ngcontent-%COMP%] {\n  padding: 0.32rem 0.65rem;\n  font-size: 0.72rem;\n  border-radius: 8px;\n  gap: 0.35rem;\n}\n.pos-session-bar[_ngcontent-%COMP%]   .pos-btn--icon[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n}\n.pos-terminal-chip__label[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.pos-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  border: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s;\n  line-height: 1.2;\n}\n.pos-btn--primary[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #312e81;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);\n  padding: 0.38rem 0.75rem;\n  font-size: 0.78rem;\n}\n.pos-btn--primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);\n}\n.pos-btn--ghost[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fecaca;\n  border: 1px solid rgba(248, 113, 113, 0.35);\n}\n.pos-btn--ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(248, 113, 113, 0.2);\n}\n.pos-btn--icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n}\n.pos-btn--muted[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #64748b;\n  border: 1px solid var(--pos-border);\n}\n.pos-btn--accent[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--pos-accent),\n      var(--pos-accent2));\n  color: #fff;\n  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);\n}\n.pos-btn--accent[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.pos-btn--lg[_ngcontent-%COMP%] {\n  padding: 0.65rem 1.25rem;\n  font-size: 0.9rem;\n}\n.pos-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.pos-ic[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-ic--sm[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.pos-ic--xs[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.pos-ic--btn[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.pos-session-bar[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-pill[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-terminal-chip[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n  flex-shrink: 0;\n}\n@media (max-width: 1024px) {\n  .pos-session-bar__content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .pos-session-bar__center[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .pos-session-bar__right[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n.pos-take-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(400px, 460px);\n  gap: 0.75rem;\n  min-height: 0;\n  position: relative;\n  margin-top: 0.65rem;\n  padding-bottom: 0.65rem;\n  overflow: hidden;\n}\n.pos-take-body--locked[_ngcontent-%COMP%]   .pos-catalog[_ngcontent-%COMP%], \n.pos-take-body--locked[_ngcontent-%COMP%]   .pos-cart[_ngcontent-%COMP%] {\n  filter: saturate(0.65);\n  opacity: 0.55;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.pos-lock-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 15;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: auto;\n  padding: 2rem;\n  background: rgba(248, 250, 252, 0.35);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.pos-lock-card[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  background: var(--pos-surface);\n  border-radius: var(--pos-radius);\n  padding: 2rem 2rem 2.25rem;\n  max-width: 400px;\n  width: 100%;\n  box-shadow: var(--pos-shadow);\n  border: 1px solid var(--pos-border);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.pos-lock-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.2rem;\n  color: #0f172a;\n  width: 100%;\n}\n.pos-lock-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 1.35rem;\n  font-size: 0.9rem;\n  color: var(--pos-muted);\n  line-height: 1.45;\n  max-width: 28ch;\n}\n.pos-lock-card[_ngcontent-%COMP%]   .pos-btn[_ngcontent-%COMP%] {\n  min-width: 11rem;\n}\n.pos-lock-card__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  width: 52px !important;\n  height: 52px !important;\n  margin: 0 0 1.1rem;\n  color: var(--pos-accent);\n  line-height: 0;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      145deg,\n      #eef2ff,\n      #e0e7ff);\n  padding: 10px;\n  box-sizing: border-box;\n}\n.pos-catalog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.pos-catalog__toolbar[_ngcontent-%COMP%] {\n  height: var(--pos-panel-head-h);\n  min-height: var(--pos-panel-head-h);\n  max-height: var(--pos-panel-head-h);\n  padding: 0 var(--pos-panel-x);\n  box-sizing: border-box;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  background: var(--pos-surface);\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-search[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  max-width: 520px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: #f1f5f9;\n  border-radius: 8px;\n  padding: 0 0.75rem;\n  border: 1px solid transparent;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.pos-search[_ngcontent-%COMP%]:focus-within {\n  border-color: #c7d2fe;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n  background: #fff;\n}\n.pos-search__icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  color: var(--pos-muted);\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-search__input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-search__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.pos-search__input[_ngcontent-%COMP%]::placeholder {\n  color: #94a3b8;\n}\n.pos-catalog__hint[_ngcontent-%COMP%] {\n  margin: 0;\n  flex-shrink: 0;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  font-weight: 500;\n  white-space: nowrap;\n}\n.pos-product-grid[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--pos-panel-x);\n  background: #f8fafc;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));\n  gap: 0.85rem;\n  align-content: start;\n}\n.pos-card[_ngcontent-%COMP%] {\n  background: var(--pos-surface);\n  border-radius: 10px;\n  border: 1px solid var(--pos-border);\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  transition:\n    box-shadow 0.18s ease,\n    border-color 0.18s,\n    transform 0.18s ease;\n}\n.pos-card[_ngcontent-%COMP%]:hover:not(.pos-card--disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px -6px rgba(79, 70, 229, 0.18);\n  border-color: #c7d2fe;\n}\n.pos-card--disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n  filter: grayscale(0.15);\n}\n.pos-card__media[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 4/3;\n  background: #f1f5f9;\n}\n.pos-card__media[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.pos-card__media-loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.65);\n  animation: _ngcontent-%COMP%_pos-pulse 1.2s ease-in-out infinite;\n}\n.pos-card__media-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  color: #94a3b8;\n  font-size: 0.72rem;\n  font-weight: 600;\n}\n.pos-card__media-placeholder-icon[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  opacity: 0.7;\n}\n@keyframes _ngcontent-%COMP%_pos-pulse {\n  50% {\n    opacity: 0.5;\n  }\n}\n.pos-card__body[_ngcontent-%COMP%] {\n  padding: 0.75rem 0.85rem 0.5rem;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.pos-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.pos-card__name[_ngcontent-%COMP%] {\n  margin: 0;\n  flex: 1;\n  min-width: 0;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.35;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-card__meta[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.6875rem;\n  color: #6b7280;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.25rem;\n}\n.pos-card__meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 0.65rem;\n  color: #9ca3af;\n}\n.pos-card__meta-dot[_ngcontent-%COMP%] {\n  color: #d1d5db;\n}\n.pos-card__price[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #4f46e5;\n  letter-spacing: -0.02em;\n  line-height: 1.2;\n}\n.pos-card__no-price[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.6875rem;\n  color: #dc2626;\n  font-weight: 600;\n}\n.pos-card__add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  margin: 0 0.65rem 0.65rem;\n  width: calc(100% - 1.3rem);\n  border: none;\n  padding: 0.5rem 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  border-radius: 8px;\n  cursor: pointer;\n  background: #4f46e5;\n  color: #fff;\n  transition:\n    background 0.15s,\n    box-shadow 0.15s,\n    transform 0.12s;\n}\n.pos-card__add[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);\n}\n.pos-card__add[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.pos-card__add[_ngcontent-%COMP%]:disabled {\n  background: #e5e7eb;\n  color: #9ca3af;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.pos-empty-grid[_ngcontent-%COMP%], \n.pos-loading-grid[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  min-height: 240px;\n  padding: 3rem 1rem;\n  color: var(--pos-muted);\n}\n.pos-empty-grid__icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  margin: 0 0 0.75rem;\n  opacity: 0.45;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pos-empty-grid__retry[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n}\n.pos-spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--pos-accent);\n  border-radius: 50%;\n  margin: 0 auto 1rem;\n  animation: _ngcontent-%COMP%_pos-spin 0.75s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_pos-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pos-cart[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.pos-cart__head[_ngcontent-%COMP%] {\n  height: var(--pos-panel-head-h);\n  min-height: var(--pos-panel-head-h);\n  max-height: var(--pos-panel-head-h);\n  padding: 0 var(--pos-panel-x);\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-cart__head-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.pos-cart__head-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-cart__tabs[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0;\n  flex-shrink: 0;\n  padding: 0 var(--pos-panel-x);\n  border-bottom: 1px solid var(--pos-border);\n  background: var(--pos-surface);\n}\n.pos-cart__tab[_ngcontent-%COMP%] {\n  position: relative;\n  border: none;\n  background: transparent;\n  padding: 0.55rem 0.35rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  cursor: pointer;\n  transition: color 0.15s, background 0.15s;\n  text-align: center;\n}\n.pos-cart__tab[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -1px;\n  height: 2px;\n  background: transparent;\n  transition: background 0.15s;\n}\n.pos-cart__tab[_ngcontent-%COMP%]:hover {\n  color: #374151;\n  background: #f9fafb;\n}\n.pos-cart__tab--active[_ngcontent-%COMP%] {\n  color: #4f46e5;\n}\n.pos-cart__tab--active[_ngcontent-%COMP%]::after {\n  background: #4f46e5;\n}\n.pos-cart__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.pos-cart__panel[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.pos-cart__panel--products[_ngcontent-%COMP%] {\n  background: #f8fafc;\n}\n.pos-cart__panel--payment[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  background: var(--pos-surface);\n  padding-bottom: 0.25rem;\n}\n.pos-cart__lines[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--pos-panel-x);\n  min-height: 0;\n  background: #f8fafc;\n}\n.pos-cart__lines--empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pos-line[_ngcontent-%COMP%] {\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: 8px;\n  padding: 0.6rem 0.7rem;\n  margin-bottom: 0.5rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-line[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.pos-line__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n}\n.pos-line__info[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.pos-line__name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-line__meta[_ngcontent-%COMP%] {\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.2rem 0.3rem;\n  font-size: 0.6875rem;\n  line-height: 1.3;\n}\n.pos-line__sku[_ngcontent-%COMP%] {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  color: #9ca3af;\n}\n.pos-line__meta-sep[_ngcontent-%COMP%] {\n  color: #d1d5db;\n}\n.pos-line__unit[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-weight: 500;\n}\n.pos-line__pricing-select[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  height: 28px;\n  border: 1px solid var(--pos-border);\n  border-radius: 6px;\n  padding: 0 0.45rem;\n  font-size: 0.6875rem;\n  color: #374151;\n  background: #f9fafb;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.pos-line__pricing-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  background: #fff;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n.pos-line__discount[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #b45309;\n}\n.pos-line__remove[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #9ca3af;\n  width: 26px;\n  height: 26px;\n  margin-top: -0.1rem;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.pos-line__remove[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.pos-line__bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.pos-qty[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: stretch;\n  height: 30px;\n  border: 1px solid var(--pos-border);\n  border-radius: 6px;\n  overflow: hidden;\n  background: #fff;\n  flex-shrink: 0;\n}\n.pos-qty__btn[_ngcontent-%COMP%] {\n  width: 30px;\n  border: none;\n  background: #fff;\n  color: #374151;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.12s, color 0.12s;\n}\n.pos-qty__btn[_ngcontent-%COMP%]:first-child {\n  border-right: 1px solid var(--pos-border);\n}\n.pos-qty__btn[_ngcontent-%COMP%]:last-child {\n  border-left: 1px solid var(--pos-border);\n}\n.pos-qty__btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  color: #4f46e5;\n}\n.pos-qty__btn[_ngcontent-%COMP%]:active {\n  background: #f3f4f6;\n}\n.pos-qty__input[_ngcontent-%COMP%] {\n  width: 36px;\n  text-align: center;\n  border: none;\n  font-weight: 600;\n  font-size: 0.8125rem;\n  color: #111827;\n  background: #fff;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.pos-qty__input[_ngcontent-%COMP%]::-webkit-outer-spin-button, \n.pos-qty__input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.pos-qty__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background: #fafafa;\n}\n.pos-line__total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.9375rem;\n  color: #111827;\n  letter-spacing: -0.02em;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.pos-cart-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1.2rem 1rem;\n  color: var(--pos-muted);\n  width: 100%;\n}\n.pos-cart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0.15rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.pos-cart-empty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.pos-cart-empty__icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  opacity: 0.35;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto;\n}\n.pos-cart__summary[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: var(--pos-panel-y) var(--pos-panel-x);\n  border-top: 1px solid var(--pos-border);\n  background: #fff;\n}\n.pos-cart__discounts[_ngcontent-%COMP%] {\n  margin-bottom: 0.75rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px dashed var(--pos-border);\n}\n.pos-cart__discounts-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #92400e;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.pos-cart__discount-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.75rem;\n  font-size: 0.78rem;\n  color: #78350f;\n  margin-bottom: 0.25rem;\n}\n.pos-cart__discount-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #b45309;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.pos-card__discount-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin-top: 0.45rem;\n  padding: 0.15rem 0.45rem;\n  border-radius: 999px;\n  background: #fef3c7;\n  color: #92400e;\n  font-size: 0.68rem;\n  font-weight: 700;\n}\n.pos-cart__hint[_ngcontent-%COMP%] {\n  margin: 0.65rem 0 0;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  line-height: 1.35;\n}\n.pos-sum-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: var(--pos-muted);\n  margin-bottom: 0.35rem;\n}\n.pos-sum-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #334155;\n  font-weight: 600;\n}\n.pos-sum-row--discount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #b45309;\n}\n.pos-sum-row--total[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  padding-top: 0.65rem;\n  border-top: 1px solid var(--pos-border);\n  font-size: 1rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.pos-sum-row--total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  color: var(--pos-accent);\n}\n.pos-customer[_ngcontent-%COMP%] {\n  padding: var(--pos-panel-y) var(--pos-panel-x) 0.65rem;\n  flex-shrink: 0;\n  background: var(--pos-surface);\n}\n.pos-customer__toggle[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.65rem;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  background: #fff;\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background 0.15s;\n  text-align: left;\n}\n.pos-customer__toggle[_ngcontent-%COMP%]:hover {\n  border-color: #c7d2fe;\n  background: #fafbff;\n}\n.pos-customer__toggle--selected[_ngcontent-%COMP%] {\n  border-color: #818cf8;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #eef2ff 100%);\n}\n.pos-customer__toggle-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 0;\n  flex: 1;\n}\n.pos-customer__toggle-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  flex-shrink: 0;\n}\n.pos-customer__toggle-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.pos-customer__avatar[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.72rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.pos-customer__avatar--filled[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  color: #fff;\n}\n.pos-customer__label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--pos-muted);\n}\n.pos-customer__name[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #1e293b;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.pos-customer__hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #94a3b8;\n}\n.pos-customer__chevron[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.pos-customer__clear[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.06);\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.pos-customer__clear[_ngcontent-%COMP%]:hover {\n  background: rgba(220, 38, 38, 0.1);\n  color: #dc2626;\n}\n.pos-pay__banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin: var(--pos-panel-y) var(--pos-panel-x) 0;\n  padding: 0.65rem 0.85rem;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #eef2ff 0%,\n      #f5f3ff 100%);\n  border: 1px solid #e0e7ff;\n}\n.pos-pay__banner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #6b7280;\n}\n.pos-pay__banner[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #4f46e5;\n  letter-spacing: -0.02em;\n}\n.pos-pay[_ngcontent-%COMP%] {\n  padding: 0 var(--pos-panel-x) 1rem;\n  background: var(--pos-surface);\n}\n.pos-pay__title[_ngcontent-%COMP%] {\n  margin: 0 0 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--pos-muted);\n}\n.pos-pay__methods[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.45rem;\n}\n.pos-pay__method[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.55rem 0.35rem;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n  background: #fff;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.pos-pay__method--on[_ngcontent-%COMP%] {\n  border-color: var(--pos-accent);\n  background:\n    linear-gradient(\n      180deg,\n      #eef2ff 0%,\n      #e0e7ff 100%);\n  color: #4338ca;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);\n}\n.pos-pay__method[_ngcontent-%COMP%]:hover {\n  border-color: #c7d2fe;\n}\n.pos-cash[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-credit[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-credit[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.9rem;\n  color: #334155;\n  background: #fff;\n}\n.pos-cash__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  margin-bottom: 0.65rem;\n}\n.pos-cash__field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.pos-cash__change[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__change[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--pos-success);\n  font-weight: 700;\n}\n.pos-cash__warn[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  font-size: 0.75rem;\n  color: #b45309;\n  font-weight: 600;\n}\n.pos-cart__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  flex-shrink: 0;\n  padding: 0.85rem var(--pos-panel-x) var(--pos-panel-x);\n  border-top: 1px solid var(--pos-border);\n  background: var(--pos-surface);\n}\n.pos-cart__actions[_ngcontent-%COMP%]   .pos-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  justify-content: center;\n  padding: 0.75rem;\n  font-size: 0.88rem;\n}\n.pos-lock-card__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-search[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-card__add[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-cart-empty__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n  flex-shrink: 0;\n}\n@media (max-width: 1024px) {\n  .pos-take-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(280px, 55vh) auto;\n  }\n  .pos-catalog[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid var(--pos-border);\n  }\n}\n/*# sourceMappingURL=take-order.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TakeOrderComponent, [{
    type: Component,
    args: [{ selector: "app-take-order", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], template: `<div #posRoot class="pos-take-root" [class.pos-take-root--fullscreen]="isFullscreen()">
  <!-- Barra corte global POS -->
  <header class="pos-session-bar">
    <div class="pos-session-bar__content">
      <div class="pos-session-bar__left">
        <div class="pos-session-bar__title">
          <lucide-icon [img]="Monitor" class="pos-session-bar__title-icon" />
          <span>Punto de Venta</span>
        </div>
      </div>

      <div class="pos-session-bar__center">
        @if (posState.checkingShift()) {
          <span class="pos-session-bar__checking">Verificando corte\u2026</span>
        } @else if (posState.shiftOpen()) {
          <div class="pos-pill pos-pill--ok">
            <lucide-icon [img]="Package" class="pos-ic pos-ic--sm" />
            <span>Corte abierto</span>
          </div>
          <span class="pos-session-meta">{{ branchLabel() }} \xB7 {{ selectedWarehouseName() }}</span>
          @if (posState.seller(); as seller) {
            <span class="pos-session-meta">\xB7 Vendedor: {{ posState.sellerDisplayName() }}</span>
          }
        } @else {
          <div class="pos-pill pos-pill--warn">
            <lucide-icon [img]="AlertCircle" class="pos-ic pos-ic--sm" />
            <span>Sin corte \u2014 ventas en cola</span>
          </div>
          @if (posState.seller()) {
            <span class="pos-session-meta">Vendedor: {{ posState.sellerDisplayName() }}</span>
          }
        }
      </div>

      <div class="pos-session-bar__right">
        <button type="button" class="pos-btn pos-btn--ghost pos-btn--icon" (click)="toggleFullscreen()">
          <lucide-icon [img]="isFullscreen() ? Minimize2 : Maximize2" class="pos-ic pos-ic--btn" />
        </button>
        <div class="pos-terminal-chip">
          <lucide-icon [img]="Monitor" class="pos-ic pos-ic--sm" />
          <span class="pos-terminal-chip__label">{{ terminalLabel() }}</span>
        </div>
        @if (!isCobranzaTerminal() && posState.seller()) {
          <button type="button" class="pos-btn pos-btn--ghost" (click)="changeSeller()">
            <lucide-icon [img]="User" class="pos-ic pos-ic--btn" />
            <span>Cambiar vendedor</span>
          </button>
        }
        @if (!isCobranzaTerminal() && posState.needsSellerCode()) {
          <button type="button" class="pos-btn pos-btn--primary" (click)="openSellerCodeDialog()">
            <lucide-icon [img]="User" class="pos-ic pos-ic--btn" />
            <span>C\xF3digo vendedor</span>
          </button>
        }
      </div>
    </div>
  </header>

  @if (!posState.checkingShift()) {
    <div
      class="pos-shift-banner"
      [class.pos-shift-banner--open]="posState.shiftOpen()"
      [class.pos-shift-banner--queue]="posState.salesQueueMode()">
      @if (posState.shiftOpen()) {
        <span>Corte activo \u2014 las ventas van directo a cobranza.</span>
      } @else {
        <span>Sin corte abierto \u2014 las ventas quedan en cola hasta que cobranza abra el d\xEDa.</span>
      }
    </div>
  }

  <div class="pos-take-body" [class.pos-take-body--locked]="!isCobranzaTerminal() && !canSell()">
    @if (!isCobranzaTerminal() && !canSell()) {
      <div class="pos-lock-overlay" aria-hidden="true">
        <div class="pos-lock-card">
          <lucide-icon [img]="User" class="pos-lock-card__icon" />
          <h3>Identifica al vendedor</h3>
          <p>Ingresa el c\xF3digo del vendedor POS para cargar el cat\xE1logo y registrar ventas.</p>
          <button type="button" class="pos-btn pos-btn--primary pos-btn--lg" (click)="openSellerCodeDialog()">
            <span>Ingresar c\xF3digo</span>
          </button>
        </div>
      </div>
    }

    <section class="pos-catalog">
      <div class="pos-catalog__toolbar">
        <div class="pos-search">
          <lucide-icon [img]="Search" class="pos-search__icon" />
          <input
            type="search"
            class="pos-search__input"
            placeholder="Buscar por nombre o SKU\u2026"
            [ngModel]="searchTerm()"
            (ngModelChange)="searchTerm.set($event); onSearchChange()"
            autocomplete="off"
          />
        </div>
        <p class="pos-catalog__hint">{{ filteredProducts().length }} productos</p>
      </div>

      <div class="pos-product-grid">
        @for (product of filteredProducts(); track product.id) {
          <article
            class="pos-card"
            [class.pos-card--disabled]="!canAddToCart(product)"
            [attr.title]="getDisabledTooltip(product)"
            (click)="canAddToCart(product) && addProductToCart(product)">
            <div class="pos-card__media">
              @if (hasProductPhoto(product)) {
                <img
                  [src]="getProductPhotoUrl(product)"
                  [alt]="product.name"
                  (error)="onPhotoError(product.id)"
                  (load)="onPhotoLoad(product.id)"
                  loading="lazy"
                />
              } @else {
                <div class="pos-card__media-placeholder">
                  <lucide-icon [img]="Package" class="pos-card__media-placeholder-icon" />
                  <span>Sin foto</span>
                </div>
              }
              @if (isPhotoLoading(product.id)) {
                <div class="pos-card__media-loading"></div>
              }
            </div>
            <div class="pos-card__body">
              <div class="pos-card__head">
                <h3 class="pos-card__name">{{ product.name }}</h3>
                @if (product.has_price) {
                  <span class="pos-card__price">{{ formatCurrency(product.cost || 0) }}</span>
                } @else {
                  <span class="pos-card__no-price">Sin precio</span>
                }
              </div>
              <p class="pos-card__meta">
                <span>{{ product.sku }}</span>
                <span class="pos-card__meta-dot" aria-hidden="true">\xB7</span>
                <span>Stock {{ product.total_available_quantity || 0 }}</span>
              </p>
              @if (hasApplicableDiscounts(product)) {
                <span class="pos-card__discount-badge">
                  <lucide-icon [img]="Percent" class="pos-ic pos-ic--xs" />
                  Descuentos
                </span>
              }
            </div>
            <button
              type="button"
              class="pos-card__add"
              (click)="addProductToCart(product); $event.stopPropagation()"
              [disabled]="!canAddToCart(product)">
              <lucide-icon [img]="Plus" class="pos-ic pos-ic--sm" />
              <span>Agregar</span>
            </button>
          </article>
        }

        @if (filteredProducts().length === 0 && !loading()) {
          <div class="pos-empty-grid">
            <lucide-icon [img]="Package" class="pos-empty-grid__icon" />
            <p>{{ catalogEmptyMessage() }}</p>
            @if (priceListError()) {
              <button type="button" class="pos-btn pos-btn--ghost pos-empty-grid__retry" (click)="retryCatalogLoad()">
                Reintentar
              </button>
            }
          </div>
        }

        @if (loading()) {
          <div class="pos-loading-grid">
            <div class="pos-spinner"></div>
            <p>Cargando cat\xE1logo\u2026</p>
          </div>
        }
      </div>
    </section>

    <aside class="pos-cart">
      <div class="pos-cart__head">
        <div class="pos-cart__head-title">
          <lucide-icon [img]="ShoppingCart" class="pos-ic" />
          <h2>{{ cartProductsTabLabel() }}</h2>
        </div>
      </div>

      <div class="pos-cart__body">
        <div class="pos-cart__panel pos-cart__panel--products">
      <div class="pos-cart__lines" [class.pos-cart__lines--empty]="posService.cart().items.length === 0">
        @for (item of posService.cart().items; track $index; let i = $index) {
          <article class="pos-line">
            <div class="pos-line__top">
              <div class="pos-line__info">
                <h4 class="pos-line__name">{{ item.product_name }}</h4>
                <p class="pos-line__meta">
                  <span class="pos-line__sku">{{ item.product_sku }}</span>
                  <span class="pos-line__meta-sep" aria-hidden="true">\xB7</span>
                  <span class="pos-line__unit">{{ formatCurrency(item.unit_price) }} \xB7 {{ item.uom_name }}</span>
                </p>
                @if ((item.pricing_options?.length || 0) > 0) {
                  <select
                    [id]="'pos-price-list-' + i"
                    class="pos-line__pricing-select"
                    [attr.aria-label]="'Lista de precio para ' + item.product_name"
                    [ngModel]="item.selected_price_list_id || ''"
                    (ngModelChange)="onPricingOptionChange(i, $event)">
                    <option value="">Lista: precio sugerido</option>
                    @for (opt of item.pricing_options || []; track opt.price_list_id) {
                      <option [value]="opt.price_list_id">
                        {{ opt.price_list_name }} \xB7 {{ formatCurrency(+opt.price || 0) }}
                      </option>
                    }
                  </select>
                }
                @if (item.selected_discount) {
                  <p class="pos-line__discount">
                    {{ item.selected_discount.name }} \xB7 -{{ formatCurrency(item.line_discount_amount) }}
                  </p>
                }
              </div>
              <button
                type="button"
                class="pos-line__remove"
                (click)="removeItem(i)"
                title="Quitar del carrito"
                aria-label="Quitar del carrito">
                <lucide-icon [img]="Trash2" class="pos-ic pos-ic--xs" />
              </button>
            </div>

            <div class="pos-line__bottom">
              <div class="pos-qty" role="group" [attr.aria-label]="'Cantidad de ' + item.product_name">
                <button
                  type="button"
                  class="pos-qty__btn"
                  (click)="updateQuantity(i, item.quantity - 1)"
                  aria-label="Disminuir cantidad">
                  <lucide-icon [img]="Minus" class="pos-ic pos-ic--xs" />
                </button>
                <input
                  class="pos-qty__input"
                  type="number"
                  [value]="item.quantity"
                  (change)="updateQuantity(i, +$any($event.target).value)"
                  min="1"
                  [attr.aria-label]="'Cantidad'"
                />
                <button
                  type="button"
                  class="pos-qty__btn"
                  (click)="updateQuantity(i, item.quantity + 1)"
                  aria-label="Aumentar cantidad">
                  <lucide-icon [img]="Plus" class="pos-ic pos-ic--xs" />
                </button>
              </div>
              <span class="pos-line__total">{{ formatCurrency(item.line_total) }}</span>
            </div>
          </article>
        }

        @if (posService.cart().items.length === 0) {
          <div class="pos-cart-empty">
            <lucide-icon [img]="ShoppingCart" class="pos-cart-empty__icon" />
            <p>Carrito vac\xEDo</p>
            <span>Elige productos del cat\xE1logo</span>
          </div>
        }
      </div>

      <div class="pos-cart__summary">
        @if (cartAppliedDiscounts().length > 0) {
          <div class="pos-cart__discounts">
            <h3 class="pos-cart__discounts-title">Descuentos aplicados</h3>
            @for (discount of cartAppliedDiscounts(); track $index) {
              <div class="pos-cart__discount-row">
                <span>\u2022 {{ discount.discountName }} \xB7 {{ discount.productName }}</span>
                <strong>-{{ formatCurrency(discount.amount) }}</strong>
              </div>
            }
          </div>
        }
        <div class="pos-sum-row">
          <span>{{ cartHasDiscounts() ? 'Subtotal' : 'Subtotal' }}</span>
          <strong>{{ formatCurrency(cartHasDiscounts() ? posService.cart().total_gross_subtotal : posService.cart().total_subtotal) }}</strong>
        </div>
        @if (cartHasDiscounts()) {
          <div class="pos-sum-row pos-sum-row--discount">
            <span>Descuentos</span>
            <strong>-{{ formatCurrency(posService.cart().total_discount) }}</strong>
          </div>
        }
        <div class="pos-sum-row">
          <span>IVA</span>
          <strong>{{ formatCurrency(posService.cart().total_iva) }}</strong>
        </div>
        <div class="pos-sum-row">
          <span>IEPS</span>
          <strong>{{ formatCurrency(posService.cart().total_ieps) }}</strong>
        </div>
        <div class="pos-sum-row pos-sum-row--total">
          <span>Total</span>
          <strong>{{ formatCurrency(posService.cart().grand_total) }}</strong>
        </div>
        <p class="pos-cart__hint">{{ cartQueueHint() }}</p>
      </div>
          </div>
      </div>

      <div class="pos-cart__actions">
        <button type="button" class="pos-btn pos-btn--muted" (click)="cancel()" [disabled]="saving()">
          Cancelar
        </button>
        <button
          type="button"
          class="pos-btn pos-btn--accent"
          (click)="saveOrder()"
          [disabled]="
            saving() ||
            !canSell() ||
            posService.cart().items.length === 0
          ">
          {{ saving() ? 'Guardando\u2026' : 'Registrar venta' }}
        </button>
      </div>
    </aside>
  </div>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/features/pos/pages/take-order/take-order.component.scss */\n:host {\n  --pos-bg: #0f172a;\n  --pos-surface: #ffffff;\n  --pos-muted: #64748b;\n  --pos-border: #e5e7eb;\n  --pos-accent: #6366f1;\n  --pos-accent2: #8b5cf6;\n  --pos-success: #10b981;\n  --pos-warn: #f59e0b;\n  --pos-radius: 12px;\n  --pos-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.12);\n  --pos-panel-x: 1.25rem;\n  --pos-panel-y: 1rem;\n  --pos-panel-head-h: 52px;\n  display: block;\n  min-height: 100%;\n}\n.pos-take-root {\n  height: calc(100vh - 0px);\n  display: flex;\n  flex-direction: column;\n  background: #f1f5f9;\n  padding: 0.65rem 0.75rem 0;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.pos-take-root--fullscreen {\n  width: 100vw;\n  height: 100vh;\n  padding: 0.55rem 0.65rem 0;\n}\n.pos-session-bar {\n  width: 100%;\n  background:\n    linear-gradient(\n      105deg,\n      #0f172a 0%,\n      #1e1b4b 45%,\n      #312e81 100%);\n  color: #f8fafc;\n  padding: 0.4rem clamp(0.75rem, 2vw, 1.25rem);\n  box-shadow: 0 2px 16px rgba(15, 23, 42, 0.28);\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n.pos-shift-banner {\n  margin: 0.5rem 0 0.75rem;\n  padding: 0.55rem 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 500;\n  line-height: 1.4;\n}\n.pos-shift-banner--queue {\n  background: #fff7ed;\n  border: 1px solid #fed7aa;\n  color: #9a3412;\n}\n.pos-shift-banner--open {\n  background: #ecfdf5;\n  border: 1px solid #a7f3d0;\n  color: #065f46;\n}\n.pos-session-bar__content {\n  max-width: 1680px;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.45rem 0.85rem;\n  justify-content: space-between;\n  min-height: 40px;\n}\n.pos-session-bar__left {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem 1.35rem;\n  padding-left: 0.15rem;\n}\n.pos-session-bar__title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  letter-spacing: -0.02em;\n}\n.pos-session-bar__title-icon {\n  flex-shrink: 0;\n  width: 18px;\n  height: 18px;\n  opacity: 0.95;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-session-bar__center {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem 0.75rem;\n  min-width: 200px;\n}\n.pos-session-bar__checking {\n  font-size: 0.85rem;\n  opacity: 0.85;\n}\n.pos-session-meta {\n  font-size: 0.75rem;\n  opacity: 0.75;\n}\n.pos-session-bar__right {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.pos-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  line-height: 1.2;\n  max-width: 100%;\n}\n.pos-pill--ok {\n  background: rgba(16, 185, 129, 0.2);\n  color: #a7f3d0;\n  border: 1px solid rgba(16, 185, 129, 0.35);\n}\n.pos-pill--warn {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fde68a;\n  border: 1px solid rgba(245, 158, 11, 0.35);\n}\n.pos-terminal-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: rgba(99, 102, 241, 0.35);\n  padding: 0.28rem 0.65rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  border: 1px solid rgba(165, 180, 252, 0.35);\n  line-height: 1.2;\n}\n.pos-session-bar .pos-btn {\n  padding: 0.32rem 0.65rem;\n  font-size: 0.72rem;\n  border-radius: 8px;\n  gap: 0.35rem;\n}\n.pos-session-bar .pos-btn--icon {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n}\n.pos-terminal-chip__label {\n  white-space: nowrap;\n}\n.pos-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  border: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s;\n  line-height: 1.2;\n}\n.pos-btn--primary {\n  background: #fff;\n  color: #312e81;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);\n  padding: 0.38rem 0.75rem;\n  font-size: 0.78rem;\n}\n.pos-btn--primary:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);\n}\n.pos-btn--ghost {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fecaca;\n  border: 1px solid rgba(248, 113, 113, 0.35);\n}\n.pos-btn--ghost:hover {\n  background: rgba(248, 113, 113, 0.2);\n}\n.pos-btn--icon {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n}\n.pos-btn--muted {\n  background: #fff;\n  color: #64748b;\n  border: 1px solid var(--pos-border);\n}\n.pos-btn--accent {\n  background:\n    linear-gradient(\n      135deg,\n      var(--pos-accent),\n      var(--pos-accent2));\n  color: #fff;\n  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);\n}\n.pos-btn--accent:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.pos-btn--lg {\n  padding: 0.65rem 1.25rem;\n  font-size: 0.9rem;\n}\n.pos-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.pos-ic {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-ic--sm {\n  width: 17px;\n  height: 17px;\n}\n.pos-ic--xs {\n  width: 14px;\n  height: 14px;\n}\n.pos-ic--btn {\n  width: 17px;\n  height: 17px;\n}\n.pos-session-bar lucide-icon svg,\n.pos-pill lucide-icon svg,\n.pos-terminal-chip lucide-icon svg,\n.pos-btn lucide-icon svg {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n  flex-shrink: 0;\n}\n@media (max-width: 1024px) {\n  .pos-session-bar__content {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .pos-session-bar__center {\n    justify-content: flex-start;\n  }\n  .pos-session-bar__right {\n    justify-content: flex-start;\n  }\n}\n.pos-take-body {\n  flex: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(400px, 460px);\n  gap: 0.75rem;\n  min-height: 0;\n  position: relative;\n  margin-top: 0.65rem;\n  padding-bottom: 0.65rem;\n  overflow: hidden;\n}\n.pos-take-body--locked .pos-catalog,\n.pos-take-body--locked .pos-cart {\n  filter: saturate(0.65);\n  opacity: 0.55;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.pos-lock-overlay {\n  position: absolute;\n  inset: 0;\n  z-index: 15;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: auto;\n  padding: 2rem;\n  background: rgba(248, 250, 252, 0.35);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.pos-lock-card {\n  pointer-events: auto;\n  background: var(--pos-surface);\n  border-radius: var(--pos-radius);\n  padding: 2rem 2rem 2.25rem;\n  max-width: 400px;\n  width: 100%;\n  box-shadow: var(--pos-shadow);\n  border: 1px solid var(--pos-border);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.pos-lock-card h3 {\n  margin: 0 0 0.5rem;\n  font-size: 1.2rem;\n  color: #0f172a;\n  width: 100%;\n}\n.pos-lock-card p {\n  margin: 0 0 1.35rem;\n  font-size: 0.9rem;\n  color: var(--pos-muted);\n  line-height: 1.45;\n  max-width: 28ch;\n}\n.pos-lock-card .pos-btn {\n  min-width: 11rem;\n}\n.pos-lock-card__icon {\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  width: 52px !important;\n  height: 52px !important;\n  margin: 0 0 1.1rem;\n  color: var(--pos-accent);\n  line-height: 0;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      145deg,\n      #eef2ff,\n      #e0e7ff);\n  padding: 10px;\n  box-sizing: border-box;\n}\n.pos-catalog {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.pos-catalog__toolbar {\n  height: var(--pos-panel-head-h);\n  min-height: var(--pos-panel-head-h);\n  max-height: var(--pos-panel-head-h);\n  padding: 0 var(--pos-panel-x);\n  box-sizing: border-box;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  background: var(--pos-surface);\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-search {\n  flex: 1;\n  min-width: 0;\n  max-width: 520px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: #f1f5f9;\n  border-radius: 8px;\n  padding: 0 0.75rem;\n  border: 1px solid transparent;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.pos-search:focus-within {\n  border-color: #c7d2fe;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n  background: #fff;\n}\n.pos-search__icon {\n  width: 16px;\n  height: 16px;\n  color: var(--pos-muted);\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-search__input {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-search__input:focus {\n  outline: none;\n}\n.pos-search__input::placeholder {\n  color: #94a3b8;\n}\n.pos-catalog__hint {\n  margin: 0;\n  flex-shrink: 0;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  font-weight: 500;\n  white-space: nowrap;\n}\n.pos-product-grid {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--pos-panel-x);\n  background: #f8fafc;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));\n  gap: 0.85rem;\n  align-content: start;\n}\n.pos-card {\n  background: var(--pos-surface);\n  border-radius: 10px;\n  border: 1px solid var(--pos-border);\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  transition:\n    box-shadow 0.18s ease,\n    border-color 0.18s,\n    transform 0.18s ease;\n}\n.pos-card:hover:not(.pos-card--disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px -6px rgba(79, 70, 229, 0.18);\n  border-color: #c7d2fe;\n}\n.pos-card--disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  filter: grayscale(0.15);\n}\n.pos-card__media {\n  position: relative;\n  aspect-ratio: 4/3;\n  background: #f1f5f9;\n}\n.pos-card__media img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.pos-card__media-loading {\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.65);\n  animation: pos-pulse 1.2s ease-in-out infinite;\n}\n.pos-card__media-placeholder {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  color: #94a3b8;\n  font-size: 0.72rem;\n  font-weight: 600;\n}\n.pos-card__media-placeholder-icon {\n  width: 26px;\n  height: 26px;\n  opacity: 0.7;\n}\n@keyframes pos-pulse {\n  50% {\n    opacity: 0.5;\n  }\n}\n.pos-card__body {\n  padding: 0.75rem 0.85rem 0.5rem;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.pos-card__head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.pos-card__name {\n  margin: 0;\n  flex: 1;\n  min-width: 0;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.35;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-card__meta {\n  margin: 0;\n  font-size: 0.6875rem;\n  color: #6b7280;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.25rem;\n}\n.pos-card__meta span:first-child {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 0.65rem;\n  color: #9ca3af;\n}\n.pos-card__meta-dot {\n  color: #d1d5db;\n}\n.pos-card__price {\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #4f46e5;\n  letter-spacing: -0.02em;\n  line-height: 1.2;\n}\n.pos-card__no-price {\n  flex-shrink: 0;\n  font-size: 0.6875rem;\n  color: #dc2626;\n  font-weight: 600;\n}\n.pos-card__add {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  margin: 0 0.65rem 0.65rem;\n  width: calc(100% - 1.3rem);\n  border: none;\n  padding: 0.5rem 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  border-radius: 8px;\n  cursor: pointer;\n  background: #4f46e5;\n  color: #fff;\n  transition:\n    background 0.15s,\n    box-shadow 0.15s,\n    transform 0.12s;\n}\n.pos-card__add:hover:not(:disabled) {\n  background: #4338ca;\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);\n}\n.pos-card__add:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.pos-card__add:disabled {\n  background: #e5e7eb;\n  color: #9ca3af;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.pos-empty-grid,\n.pos-loading-grid {\n  grid-column: 1/-1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  min-height: 240px;\n  padding: 3rem 1rem;\n  color: var(--pos-muted);\n}\n.pos-empty-grid__icon {\n  width: 48px;\n  height: 48px;\n  margin: 0 0 0.75rem;\n  opacity: 0.45;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pos-empty-grid__retry {\n  margin-top: 0.75rem;\n}\n.pos-spinner {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--pos-accent);\n  border-radius: 50%;\n  margin: 0 auto 1rem;\n  animation: pos-spin 0.75s linear infinite;\n}\n@keyframes pos-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pos-cart {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.pos-cart__head {\n  height: var(--pos-panel-head-h);\n  min-height: var(--pos-panel-head-h);\n  max-height: var(--pos-panel-head-h);\n  padding: 0 var(--pos-panel-x);\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-cart__head-title {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.pos-cart__head-title h2 {\n  margin: 0;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-cart__tabs {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0;\n  flex-shrink: 0;\n  padding: 0 var(--pos-panel-x);\n  border-bottom: 1px solid var(--pos-border);\n  background: var(--pos-surface);\n}\n.pos-cart__tab {\n  position: relative;\n  border: none;\n  background: transparent;\n  padding: 0.55rem 0.35rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  cursor: pointer;\n  transition: color 0.15s, background 0.15s;\n  text-align: center;\n}\n.pos-cart__tab::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -1px;\n  height: 2px;\n  background: transparent;\n  transition: background 0.15s;\n}\n.pos-cart__tab:hover {\n  color: #374151;\n  background: #f9fafb;\n}\n.pos-cart__tab--active {\n  color: #4f46e5;\n}\n.pos-cart__tab--active::after {\n  background: #4f46e5;\n}\n.pos-cart__body {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.pos-cart__panel {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.pos-cart__panel--products {\n  background: #f8fafc;\n}\n.pos-cart__panel--payment {\n  overflow-y: auto;\n  background: var(--pos-surface);\n  padding-bottom: 0.25rem;\n}\n.pos-cart__lines {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--pos-panel-x);\n  min-height: 0;\n  background: #f8fafc;\n}\n.pos-cart__lines--empty {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pos-line {\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: 8px;\n  padding: 0.6rem 0.7rem;\n  margin-bottom: 0.5rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-line:last-child {\n  margin-bottom: 0;\n}\n.pos-line__top {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n}\n.pos-line__info {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.pos-line__name {\n  margin: 0;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-line__meta {\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.2rem 0.3rem;\n  font-size: 0.6875rem;\n  line-height: 1.3;\n}\n.pos-line__sku {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  color: #9ca3af;\n}\n.pos-line__meta-sep {\n  color: #d1d5db;\n}\n.pos-line__unit {\n  color: #4f46e5;\n  font-weight: 500;\n}\n.pos-line__pricing-select {\n  width: 100%;\n  box-sizing: border-box;\n  height: 28px;\n  border: 1px solid var(--pos-border);\n  border-radius: 6px;\n  padding: 0 0.45rem;\n  font-size: 0.6875rem;\n  color: #374151;\n  background: #f9fafb;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.pos-line__pricing-select:focus {\n  outline: none;\n  border-color: #6366f1;\n  background: #fff;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n.pos-line__discount {\n  margin: 0.35rem 0 0;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #b45309;\n}\n.pos-line__remove {\n  border: none;\n  background: transparent;\n  color: #9ca3af;\n  width: 26px;\n  height: 26px;\n  margin-top: -0.1rem;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.pos-line__remove:hover {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.pos-line__bottom {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.pos-qty {\n  display: inline-flex;\n  align-items: stretch;\n  height: 30px;\n  border: 1px solid var(--pos-border);\n  border-radius: 6px;\n  overflow: hidden;\n  background: #fff;\n  flex-shrink: 0;\n}\n.pos-qty__btn {\n  width: 30px;\n  border: none;\n  background: #fff;\n  color: #374151;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.12s, color 0.12s;\n}\n.pos-qty__btn:first-child {\n  border-right: 1px solid var(--pos-border);\n}\n.pos-qty__btn:last-child {\n  border-left: 1px solid var(--pos-border);\n}\n.pos-qty__btn:hover {\n  background: #f9fafb;\n  color: #4f46e5;\n}\n.pos-qty__btn:active {\n  background: #f3f4f6;\n}\n.pos-qty__input {\n  width: 36px;\n  text-align: center;\n  border: none;\n  font-weight: 600;\n  font-size: 0.8125rem;\n  color: #111827;\n  background: #fff;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.pos-qty__input::-webkit-outer-spin-button,\n.pos-qty__input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.pos-qty__input:focus {\n  outline: none;\n  background: #fafafa;\n}\n.pos-line__total {\n  font-weight: 700;\n  font-size: 0.9375rem;\n  color: #111827;\n  letter-spacing: -0.02em;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.pos-cart-empty {\n  text-align: center;\n  padding: 1.2rem 1rem;\n  color: var(--pos-muted);\n  width: 100%;\n}\n.pos-cart-empty p {\n  margin: 0.5rem 0 0.15rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.pos-cart-empty span {\n  font-size: 0.8rem;\n}\n.pos-cart-empty__icon {\n  width: 56px;\n  height: 56px;\n  opacity: 0.35;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto;\n}\n.pos-cart__summary {\n  flex-shrink: 0;\n  padding: var(--pos-panel-y) var(--pos-panel-x);\n  border-top: 1px solid var(--pos-border);\n  background: #fff;\n}\n.pos-cart__discounts {\n  margin-bottom: 0.75rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px dashed var(--pos-border);\n}\n.pos-cart__discounts-title {\n  margin: 0 0 0.5rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #92400e;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.pos-cart__discount-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.75rem;\n  font-size: 0.78rem;\n  color: #78350f;\n  margin-bottom: 0.25rem;\n}\n.pos-cart__discount-row strong {\n  color: #b45309;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.pos-card__discount-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  margin-top: 0.45rem;\n  padding: 0.15rem 0.45rem;\n  border-radius: 999px;\n  background: #fef3c7;\n  color: #92400e;\n  font-size: 0.68rem;\n  font-weight: 700;\n}\n.pos-cart__hint {\n  margin: 0.65rem 0 0;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  line-height: 1.35;\n}\n.pos-sum-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: var(--pos-muted);\n  margin-bottom: 0.35rem;\n}\n.pos-sum-row strong {\n  color: #334155;\n  font-weight: 600;\n}\n.pos-sum-row--discount strong {\n  color: #b45309;\n}\n.pos-sum-row--total {\n  margin-top: 0.5rem;\n  padding-top: 0.65rem;\n  border-top: 1px solid var(--pos-border);\n  font-size: 1rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.pos-sum-row--total strong {\n  font-size: 1.15rem;\n  color: var(--pos-accent);\n}\n.pos-customer {\n  padding: var(--pos-panel-y) var(--pos-panel-x) 0.65rem;\n  flex-shrink: 0;\n  background: var(--pos-surface);\n}\n.pos-customer__toggle {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.65rem;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  background: #fff;\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background 0.15s;\n  text-align: left;\n}\n.pos-customer__toggle:hover {\n  border-color: #c7d2fe;\n  background: #fafbff;\n}\n.pos-customer__toggle--selected {\n  border-color: #818cf8;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #eef2ff 100%);\n}\n.pos-customer__toggle-left {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 0;\n  flex: 1;\n}\n.pos-customer__toggle-right {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  flex-shrink: 0;\n}\n.pos-customer__toggle-text {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.pos-customer__avatar {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.72rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.pos-customer__avatar--filled {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  color: #fff;\n}\n.pos-customer__label {\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--pos-muted);\n}\n.pos-customer__name {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #1e293b;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.pos-customer__hint {\n  font-size: 0.75rem;\n  color: #94a3b8;\n}\n.pos-customer__chevron {\n  color: #94a3b8;\n}\n.pos-customer__clear {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.06);\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.pos-customer__clear:hover {\n  background: rgba(220, 38, 38, 0.1);\n  color: #dc2626;\n}\n.pos-pay__banner {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin: var(--pos-panel-y) var(--pos-panel-x) 0;\n  padding: 0.65rem 0.85rem;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #eef2ff 0%,\n      #f5f3ff 100%);\n  border: 1px solid #e0e7ff;\n}\n.pos-pay__banner span {\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #6b7280;\n}\n.pos-pay__banner strong {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #4f46e5;\n  letter-spacing: -0.02em;\n}\n.pos-pay {\n  padding: 0 var(--pos-panel-x) 1rem;\n  background: var(--pos-surface);\n}\n.pos-pay__title {\n  margin: 0 0 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--pos-muted);\n}\n.pos-pay__methods {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.45rem;\n}\n.pos-pay__method {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.55rem 0.35rem;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n  background: #fff;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.pos-pay__method--on {\n  border-color: var(--pos-accent);\n  background:\n    linear-gradient(\n      180deg,\n      #eef2ff 0%,\n      #e0e7ff 100%);\n  color: #4338ca;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);\n}\n.pos-pay__method:hover {\n  border-color: #c7d2fe;\n}\n.pos-cash {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-credit {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-credit select {\n  width: 100%;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.9rem;\n  color: #334155;\n  background: #fff;\n}\n.pos-cash__field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  margin-bottom: 0.65rem;\n}\n.pos-cash__field span {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__field input {\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.pos-cash__change {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__change output {\n  font-size: 1rem;\n  color: var(--pos-success);\n  font-weight: 700;\n}\n.pos-cash__warn {\n  margin: 0.5rem 0 0;\n  font-size: 0.75rem;\n  color: #b45309;\n  font-weight: 600;\n}\n.pos-cart__actions {\n  display: flex;\n  gap: 0.6rem;\n  flex-shrink: 0;\n  padding: 0.85rem var(--pos-panel-x) var(--pos-panel-x);\n  border-top: 1px solid var(--pos-border);\n  background: var(--pos-surface);\n}\n.pos-cart__actions .pos-btn {\n  flex: 1;\n  justify-content: center;\n  padding: 0.75rem;\n  font-size: 0.88rem;\n}\n.pos-lock-card__icon svg,\n.pos-search lucide-icon svg,\n.pos-card__add lucide-icon svg,\n.pos-cart-empty__icon svg {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n  flex-shrink: 0;\n}\n@media (max-width: 1024px) {\n  .pos-take-body {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(280px, 55vh) auto;\n  }\n  .pos-catalog {\n    border-right: none;\n    border-bottom: 1px solid var(--pos-border);\n  }\n}\n/*# sourceMappingURL=take-order.component.css.map */\n'] }]
  }], () => [{ type: POSService }, { type: PosStateService }, { type: WarehouseService }, { type: AuthService }, { type: Router }, { type: ToastService }, { type: MatDialog }], { posRootRef: [{
    type: ViewChild,
    args: ["posRoot"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TakeOrderComponent, { className: "TakeOrderComponent", filePath: "src/app/features/pos/pages/take-order/take-order.component.ts", lineNumber: 57 });
})();
export {
  TakeOrderComponent
};
//# sourceMappingURL=chunk-IQFCB3U4.js.map
