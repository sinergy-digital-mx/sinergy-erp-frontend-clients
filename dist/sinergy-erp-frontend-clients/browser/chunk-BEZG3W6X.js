import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "./chunk-YLZRJESW.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-GRWRLGZU.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-Z3FOIOXA.js";
import {
  CommonModule,
  NgIf
} from "./chunk-RBFB2ZTY.js";
import {
  Component,
  Inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GBHDNI6X.js";

// src/app/features/purchase-orders/components/payment-dialog/payment-dialog.component.ts
function PaymentDialogComponent_span_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getAmountError(), " ");
  }
}
function PaymentDialogComponent_span_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, " La fecha de pago es requerida ");
    \u0275\u0275elementEnd();
  }
}
function PaymentDialogComponent_span_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, " El m\xE9todo de pago es requerido ");
    \u0275\u0275elementEnd();
  }
}
function PaymentDialogComponent_span_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 36);
    \u0275\u0275text(1, " La moneda es requerida ");
    \u0275\u0275elementEnd();
  }
}
var PaymentDialogComponent = class _PaymentDialogComponent {
  fb;
  dialogRef;
  data;
  X = X;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  form;
  remainingAmount;
  totalAmount;
  selectedCurrency;
  constructor(fb, dialogRef, data) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.remainingAmount = this.roundMoney(Number(data.remainingAmount) || 0);
    this.totalAmount = this.roundMoney(Number(data.totalAmount ?? data.remainingAmount) || 0);
    this.selectedCurrency = data.currency ?? "MXN";
    const defaultAmount = this.remainingAmount > 0 ? this.remainingAmount.toFixed(2) : "";
    this.form = this.fb.group({
      amount: [
        defaultAmount,
        [
          Validators.required,
          this.amountFormatValidator(),
          this.amountRangeValidator(0.01, this.remainingAmount)
        ]
      ],
      payment_date: [
        (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        [Validators.required]
      ],
      payment_method: [
        "Transferencia",
        [Validators.required]
      ],
      currency: [this.selectedCurrency, [Validators.required]],
      reference_number: [""],
      notes: [""]
    });
  }
  /**
   * Close dialog without saving
   */
  closeDialog() {
    if (!this.loading()) {
      this.dialogRef.close(null);
    }
  }
  /** Habilita el botón solo cuando los campos requeridos son válidos (evita falsos negativos por redondeo). */
  canSubmit() {
    if (this.loading())
      return false;
    const amountControl = this.form.get("amount");
    const raw = String(amountControl?.value ?? "").trim();
    if (!raw)
      return false;
    if (!/^\d+([.,]\d{1,2})?$/.test(raw))
      return false;
    const amount = this.parseLocalizedAmount(raw);
    if (!Number.isFinite(amount) || amount < 0.01)
      return false;
    if (this.toCents(amount) > this.toCents(this.remainingAmount))
      return false;
    return !this.form.get("payment_date")?.invalid && !this.form.get("payment_method")?.invalid && !this.form.get("currency")?.invalid;
  }
  /**
   * Submit payment form
   */
  submit() {
    if (!this.canSubmit()) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value;
    const paymentData = {
      amount: this.roundMoney(this.parseLocalizedAmount(formValue.amount)),
      payment_date: formValue.payment_date,
      payment_method: formValue.payment_method,
      currency: formValue.currency,
      reference_number: formValue.reference_number || void 0,
      notes: formValue.notes || void 0
    };
    this.dialogRef.close(paymentData);
  }
  /**
   * Get validation error message for amount field
   */
  getAmountError() {
    const control = this.form.get("amount");
    if (!control || !control.errors || !control.touched) {
      return null;
    }
    if (control.errors["required"]) {
      return "El monto es requerido";
    }
    if (control.errors["invalidAmount"]) {
      return "Ingresa un monto valido (ej: 1250.50 o 1250,50)";
    }
    if (control.errors["amountMin"]) {
      return "El monto debe ser mayor a cero";
    }
    if (control.errors["amountMax"]) {
      return `El monto no puede exceder el saldo pendiente (${this.formatCurrency(this.remainingAmount)})`;
    }
    return "Monto inv\xE1lido";
  }
  /**
   * Format currency for display
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: this.form.get("currency")?.value || this.selectedCurrency
    }).format(amount);
  }
  parseLocalizedAmount(value) {
    if (value === null || value === void 0)
      return NaN;
    const normalized = String(value).trim().replace(/\s+/g, "").replace(",", ".");
    const amount = parseFloat(normalized);
    return Number.isFinite(amount) ? amount : NaN;
  }
  roundMoney(value) {
    if (!Number.isFinite(value))
      return 0;
    return Math.round(value * 100) / 100;
  }
  toCents(value) {
    return Math.round(this.roundMoney(value) * 100);
  }
  amountFormatValidator() {
    return (control) => {
      const raw = control.value;
      if (raw === null || raw === void 0 || raw === "")
        return null;
      const normalized = String(raw).trim();
      const validPattern = /^\d+([.,]\d{1,2})?$/;
      return validPattern.test(normalized) ? null : { invalidAmount: true };
    };
  }
  amountRangeValidator(min, max) {
    return (control) => {
      const raw = control.value;
      if (raw === null || raw === void 0 || raw === "")
        return null;
      const amount = this.parseLocalizedAmount(raw);
      if (!Number.isFinite(amount)) {
        return { invalidAmount: true };
      }
      if (this.toCents(amount) < this.toCents(min)) {
        return { amountMin: true };
      }
      if (this.toCents(amount) > this.toCents(max)) {
        return { amountMax: true };
      }
      return null;
    };
  }
  static \u0275fac = function PaymentDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentDialogComponent, selectors: [["app-payment-dialog"]], decls: 73, vars: 21, consts: [[1, "dialog-overlay", 3, "click"], ["role", "dialog", "aria-labelledby", "dialog-title", "aria-modal", "true", 1, "dialog-container", 3, "click"], [1, "dialog-header"], ["id", "dialog-title"], ["type", "button", "aria-label", "Cerrar di\xE1logo", 1, "close-button", 3, "click", "disabled"], [3, "img", "size"], [1, "dialog-body"], ["role", "status", "aria-live", "polite", 1, "summary-card"], [1, "summary-row"], [1, "pending"], [3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "amount"], ["id", "amount", "type", "text", "formControlName", "amount", "placeholder", "0.00", "inputmode", "decimal", 1, "form-input"], ["id", "amount-error", "class", "error-message", "role", "alert", 4, "ngIf"], ["for", "payment_date"], ["id", "payment_date", "type", "date", "formControlName", "payment_date", 1, "form-input"], ["class", "error-message", "role", "alert", 4, "ngIf"], ["for", "payment_method"], ["id", "payment_method", "formControlName", "payment_method", 1, "form-select"], ["value", "Transferencia"], ["value", "Efectivo"], ["value", "Cheque"], ["value", "Tarjeta"], ["for", "currency"], ["id", "currency", "formControlName", "currency", 1, "form-select"], ["value", "MXN"], ["value", "USD"], ["for", "reference_number"], ["id", "reference_number", "type", "text", "formControlName", "reference_number", "placeholder", "Numero de referencia (opcional)", 1, "form-input"], ["for", "notes"], ["id", "notes", "formControlName", "notes", "placeholder", "Notas adicionales (opcional)", "rows", "3", 1, "form-textarea"], [1, "dialog-footer"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "button", 1, "btn-submit", 3, "click", "disabled"], ["id", "amount-error", "role", "alert", 1, "error-message"], ["role", "alert", 1, "error-message"]], template: function PaymentDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_div_click_0_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_div_click_1_listener($event) {
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Registrar Pago");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 4);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_button_click_5_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275element(6, "lucide-icon", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "div", 8)(10, "span");
      \u0275\u0275text(11, "Total de la Requisicion:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "strong");
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 8)(15, "span");
      \u0275\u0275text(16, "Saldo Pendiente:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "strong", 9);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "form", 10);
      \u0275\u0275listener("ngSubmit", function PaymentDialogComponent_Template_form_ngSubmit_19_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(20, "div", 11)(21, "label", 12);
      \u0275\u0275text(22, "Monto del Pago ");
      \u0275\u0275elementStart(23, "span");
      \u0275\u0275text(24, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(25, "input", 13);
      \u0275\u0275template(26, PaymentDialogComponent_span_26_Template, 2, 1, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 11)(28, "label", 15);
      \u0275\u0275text(29, "Fecha de Pago ");
      \u0275\u0275elementStart(30, "span");
      \u0275\u0275text(31, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(32, "input", 16);
      \u0275\u0275template(33, PaymentDialogComponent_span_33_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 11)(35, "label", 18);
      \u0275\u0275text(36, "Metodo de Pago ");
      \u0275\u0275elementStart(37, "span");
      \u0275\u0275text(38, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "select", 19)(40, "option", 20);
      \u0275\u0275text(41, "Transferencia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "option", 21);
      \u0275\u0275text(43, "Efectivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "option", 22);
      \u0275\u0275text(45, "Cheque");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "option", 23);
      \u0275\u0275text(47, "Tarjeta");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(48, PaymentDialogComponent_span_48_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div", 11)(50, "label", 24);
      \u0275\u0275text(51, "Moneda ");
      \u0275\u0275elementStart(52, "span");
      \u0275\u0275text(53, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "select", 25)(55, "option", 26);
      \u0275\u0275text(56, "MXN");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "option", 27);
      \u0275\u0275text(58, "USD");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(59, PaymentDialogComponent_span_59_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 11)(61, "label", 28);
      \u0275\u0275text(62, "Numero de Referencia");
      \u0275\u0275elementEnd();
      \u0275\u0275element(63, "input", 29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 11)(65, "label", 30);
      \u0275\u0275text(66, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(67, "textarea", 31);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(68, "div", 32)(69, "button", 33);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_button_click_69_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(70, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "button", 34);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_button_click_71_listener() {
        return ctx.submit();
      });
      \u0275\u0275text(72, " Registrar Pago ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      let tmp_11_0;
      let tmp_12_0;
      let tmp_14_0;
      let tmp_15_0;
      let tmp_17_0;
      let tmp_18_0;
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.totalAmount));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.remainingAmount));
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275attribute("aria-required", true)("aria-invalid", ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.touched))("aria-describedby", ((tmp_8_0 = ctx.form.get("amount")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("amount")) == null ? null : tmp_8_0.touched) ? "amount-error" : null);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_9_0 = ctx.form.get("amount")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.form.get("amount")) == null ? null : tmp_9_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275attribute("aria-required", true)("aria-invalid", ((tmp_11_0 = ctx.form.get("payment_date")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx.form.get("payment_date")) == null ? null : tmp_11_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_12_0 = ctx.form.get("payment_date")) == null ? null : tmp_12_0.invalid) && ((tmp_12_0 = ctx.form.get("payment_date")) == null ? null : tmp_12_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275attribute("aria-required", true)("aria-invalid", ((tmp_14_0 = ctx.form.get("payment_method")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx.form.get("payment_method")) == null ? null : tmp_14_0.touched));
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ((tmp_15_0 = ctx.form.get("payment_method")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx.form.get("payment_method")) == null ? null : tmp_15_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275attribute("aria-required", true)("aria-invalid", ((tmp_17_0 = ctx.form.get("currency")) == null ? null : tmp_17_0.invalid) && ((tmp_17_0 = ctx.form.get("currency")) == null ? null : tmp_17_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_18_0 = ctx.form.get("currency")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx.form.get("currency")) == null ? null : tmp_18_0.touched));
      \u0275\u0275advance(10);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !ctx.canSubmit());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  max-width: 660px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n  color: #757575;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f5f5f5;\n  color: #212121;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #1976d2;\n  outline-offset: 2px;\n}\n.dialog-body[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem 0.5rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.dialog-body[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  background: #f9fafb;\n  padding: 0.75rem;\n  margin-bottom: 0.95rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 0.9rem;\n  color: #6b7280;\n  margin-bottom: 0.35rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.dialog-body[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #374151;\n  font-size: 0.95rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-row[_ngcontent-%COMP%]   .pending[_ngcontent-%COMP%] {\n  color: #2584e7;\n  font-size: 1.1rem;\n  line-height: 1;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  margin-bottom: 0.9rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.35rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #4b5563;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%], \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%], \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  padding: 0.62rem 0.72rem;\n  font-size: 0.86rem;\n  color: #1f2937;\n  background: #fff;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus, \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]:focus, \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-input[aria-invalid=true][_ngcontent-%COMP%], \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-select[aria-invalid=true][_ngcontent-%COMP%], \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[aria-invalid=true][_ngcontent-%COMP%] {\n  border-color: #ef4444;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n  font-family: inherit;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.25rem;\n  font-size: 0.72rem;\n  color: #d32f2f;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.8rem;\n  padding: 0.9rem 1.25rem 1.2rem;\n  border-top: 1px solid #e5e7eb;\n}\n.dialog-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], \n.dialog-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 700;\n  padding: 0.65rem 1.15rem;\n  cursor: pointer;\n}\n.dialog-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:disabled, \n.dialog-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.dialog-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #2563eb;\n}\n.dialog-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%] {\n  background: #16a34a;\n  color: #fff;\n  box-shadow: 0 1px 2px rgba(22, 163, 74, 0.35);\n}\n.dialog-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #15803d;\n}\n.dialog-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #16a34a;\n  outline-offset: 2px;\n}\n@media (max-width: 768px) {\n  .dialog-overlay[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .dialog-container[_ngcontent-%COMP%] {\n    max-width: 100%;\n    max-height: 100vh;\n    border-radius: 0;\n  }\n  .dialog-footer[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .dialog-footer[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%], \n   .dialog-footer[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.dialog-container[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n/*# sourceMappingURL=payment-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentDialogComponent, [{
    type: Component,
    args: [{ selector: "app-payment-dialog", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      LucideAngularModule
    ], template: `<div class="dialog-overlay" (click)="closeDialog()">
  <div class="dialog-container" (click)="$event.stopPropagation()" role="dialog" aria-labelledby="dialog-title" aria-modal="true">
    <!-- Header -->
    <div class="dialog-header">
      <h2 id="dialog-title">Registrar Pago</h2>
      <button 
        type="button" 
        class="close-button" 
        (click)="closeDialog()"
        [disabled]="loading()"
        aria-label="Cerrar di\xE1logo"
      >
        <lucide-icon [img]="X" [size]="20"></lucide-icon>
      </button>
    </div>

    <div class="dialog-body">
      <div class="summary-card" role="status" aria-live="polite">
        <div class="summary-row">
          <span>Total de la Requisicion:</span>
          <strong>{{ formatCurrency(totalAmount) }}</strong>
        </div>
        <div class="summary-row">
          <span>Saldo Pendiente:</span>
          <strong class="pending">{{ formatCurrency(remainingAmount) }}</strong>
        </div>
      </div>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="form-field">
          <label for="amount">Monto del Pago <span>*</span></label>
          <input
            id="amount"
            class="form-input"
            type="text"
            formControlName="amount"
            placeholder="0.00"
            inputmode="decimal"
            [attr.aria-required]="true"
            [attr.aria-invalid]="form.get('amount')?.invalid && form.get('amount')?.touched"
            [attr.aria-describedby]="form.get('amount')?.invalid && form.get('amount')?.touched ? 'amount-error' : null"
          />
          <span
            id="amount-error"
            class="error-message"
            role="alert"
            *ngIf="form.get('amount')?.invalid && form.get('amount')?.touched"
          >
            {{ getAmountError() }}
          </span>
        </div>

        <div class="form-field">
          <label for="payment_date">Fecha de Pago <span>*</span></label>
          <input
            id="payment_date"
            class="form-input"
            type="date"
            formControlName="payment_date"
            [attr.aria-required]="true"
            [attr.aria-invalid]="form.get('payment_date')?.invalid && form.get('payment_date')?.touched"
          />
          <span
            class="error-message"
            role="alert"
            *ngIf="form.get('payment_date')?.invalid && form.get('payment_date')?.touched"
          >
            La fecha de pago es requerida
          </span>
        </div>

        <div class="form-field">
          <label for="payment_method">Metodo de Pago <span>*</span></label>
          <select
            id="payment_method"
            class="form-select"
            formControlName="payment_method"
            [attr.aria-required]="true"
            [attr.aria-invalid]="form.get('payment_method')?.invalid && form.get('payment_method')?.touched"
          >
            <option value="Transferencia">Transferencia</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Cheque">Cheque</option>
            <option value="Tarjeta">Tarjeta</option>
          </select>
          <span
            class="error-message"
            role="alert"
            *ngIf="form.get('payment_method')?.invalid && form.get('payment_method')?.touched"
          >
            El m\xE9todo de pago es requerido
          </span>
        </div>

        <div class="form-field">
          <label for="currency">Moneda <span>*</span></label>
          <select
            id="currency"
            class="form-select"
            formControlName="currency"
            [attr.aria-required]="true"
            [attr.aria-invalid]="form.get('currency')?.invalid && form.get('currency')?.touched"
          >
            <option value="MXN">MXN</option>
            <option value="USD">USD</option>
          </select>
          <span
            class="error-message"
            role="alert"
            *ngIf="form.get('currency')?.invalid && form.get('currency')?.touched"
          >
            La moneda es requerida
          </span>
        </div>

        <div class="form-field">
          <label for="reference_number">Numero de Referencia</label>
          <input
            id="reference_number"
            class="form-input"
            type="text"
            formControlName="reference_number"
            placeholder="Numero de referencia (opcional)"
          />
        </div>

        <div class="form-field">
          <label for="notes">Notas</label>
          <textarea
            id="notes"
            class="form-textarea"
            formControlName="notes"
            placeholder="Notas adicionales (opcional)"
            rows="3"
          ></textarea>
        </div>
      </form>
    </div>

    <div class="dialog-footer">
      <button type="button" class="btn-cancel" (click)="closeDialog()" [disabled]="loading()">
        Cancelar
      </button>
      <button type="button" class="btn-submit" (click)="submit()" [disabled]="!canSubmit()">
        Registrar Pago
      </button>
    </div>
  </div>
</div>
`, styles: ["/* src/app/features/purchase-orders/components/payment-dialog/payment-dialog.component.scss */\n.dialog-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.dialog-container {\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2);\n  max-width: 660px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-header h2 {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n.dialog-header .close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n  color: #757575;\n}\n.dialog-header .close-button:hover:not(:disabled) {\n  background-color: #f5f5f5;\n  color: #212121;\n}\n.dialog-header .close-button:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.dialog-header .close-button:focus-visible {\n  outline: 2px solid #1976d2;\n  outline-offset: 2px;\n}\n.dialog-body {\n  padding: 1rem 1.25rem 0.5rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.dialog-body .summary-card {\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  background: #f9fafb;\n  padding: 0.75rem;\n  margin-bottom: 0.95rem;\n}\n.dialog-body .summary-card .summary-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 0.9rem;\n  color: #6b7280;\n  margin-bottom: 0.35rem;\n}\n.dialog-body .summary-card .summary-row:last-child {\n  margin-bottom: 0;\n}\n.dialog-body .summary-card .summary-row strong {\n  font-weight: 700;\n  color: #374151;\n  font-size: 0.95rem;\n}\n.dialog-body .summary-card .summary-row .pending {\n  color: #2584e7;\n  font-size: 1.1rem;\n  line-height: 1;\n}\n.dialog-body .form-field {\n  margin-bottom: 0.9rem;\n}\n.dialog-body .form-field label {\n  display: block;\n  margin-bottom: 0.35rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  color: #4b5563;\n}\n.dialog-body .form-field label span {\n  color: #ef4444;\n}\n.dialog-body .form-field .form-input,\n.dialog-body .form-field .form-select,\n.dialog-body .form-field .form-textarea {\n  width: 100%;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  padding: 0.62rem 0.72rem;\n  font-size: 0.86rem;\n  color: #1f2937;\n  background: #fff;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.dialog-body .form-field .form-input:focus,\n.dialog-body .form-field .form-select:focus,\n.dialog-body .form-field .form-textarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n.dialog-body .form-field .form-input[aria-invalid=true],\n.dialog-body .form-field .form-select[aria-invalid=true],\n.dialog-body .form-field .form-textarea[aria-invalid=true] {\n  border-color: #ef4444;\n}\n.dialog-body .form-field .form-textarea {\n  resize: vertical;\n  min-height: 80px;\n  font-family: inherit;\n}\n.dialog-body .form-field .error-message {\n  display: block;\n  margin-top: 0.25rem;\n  font-size: 0.72rem;\n  color: #d32f2f;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.8rem;\n  padding: 0.9rem 1.25rem 1.2rem;\n  border-top: 1px solid #e5e7eb;\n}\n.dialog-footer .btn-cancel,\n.dialog-footer .btn-submit {\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 700;\n  padding: 0.65rem 1.15rem;\n  cursor: pointer;\n}\n.dialog-footer .btn-cancel:disabled,\n.dialog-footer .btn-submit:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.dialog-footer .btn-cancel {\n  background: transparent;\n  color: #2563eb;\n}\n.dialog-footer .btn-submit {\n  background: #16a34a;\n  color: #fff;\n  box-shadow: 0 1px 2px rgba(22, 163, 74, 0.35);\n}\n.dialog-footer .btn-submit:hover:not(:disabled) {\n  background: #15803d;\n}\n.dialog-footer .btn-submit:focus-visible {\n  outline: 2px solid #16a34a;\n  outline-offset: 2px;\n}\n@media (max-width: 768px) {\n  .dialog-overlay {\n    padding: 0;\n  }\n  .dialog-container {\n    max-width: 100%;\n    max-height: 100vh;\n    border-radius: 0;\n  }\n  .dialog-footer {\n    flex-direction: column-reverse;\n  }\n  .dialog-footer .btn-cancel,\n  .dialog-footer .btn-submit {\n    width: 100%;\n  }\n}\n.dialog-container:focus {\n  outline: none;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n/*# sourceMappingURL=payment-dialog.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentDialogComponent, { className: "PaymentDialogComponent", filePath: "src/app/features/purchase-orders/components/payment-dialog/payment-dialog.component.ts", lineNumber: 33 });
})();

export {
  PaymentDialogComponent
};
//# sourceMappingURL=chunk-BEZG3W6X.js.map
