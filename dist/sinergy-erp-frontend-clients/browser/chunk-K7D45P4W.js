import {
  SalesOrderService
} from "./chunk-W2GGHGOU.js";
import {
  POSService
} from "./chunk-MK3LIK2T.js";
import {
  normalizePosSaleReceipt
} from "./chunk-MHDUPFR7.js";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from "./chunk-C44BBKV6.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-EF42XV6X.js";
import {
  Check,
  Eye,
  LucideAngularComponent,
  LucideAngularModule,
  Printer,
  RefreshCw,
  X
} from "./chunk-EBDBUXLH.js";
import {
  CommonModule,
  HttpClient,
  HttpParams,
  environment
} from "./chunk-MNFUR22A.js";
import {
  Component,
  Injectable,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-CJAGDKD4.js";

// src/app/features/pos/services/pos-receipt-print.service.ts
var LS_PRINTER = "pos_printer_name";
var LS_AUTO_PRINT = "pos_auto_print_on_collect";
var QZ_SCRIPT = "https://cdn.jsdelivr.net/npm/qz-tray@2.2.4/qz-tray.js";
var PosReceiptPrintService = class _PosReceiptPrintService {
  http;
  qzLoadPromise = null;
  qzSecurityConfigured = false;
  constructor(http) {
    this.http = http;
  }
  getPrinterName() {
    return localStorage.getItem(LS_PRINTER)?.trim() ?? "";
  }
  setPrinterName(name) {
    const value = name.trim();
    if (value) {
      localStorage.setItem(LS_PRINTER, value);
    } else {
      localStorage.removeItem(LS_PRINTER);
    }
  }
  isAutoPrintEnabled() {
    return localStorage.getItem(LS_AUTO_PRINT) !== "false";
  }
  setAutoPrintEnabled(enabled) {
    localStorage.setItem(LS_AUTO_PRINT, enabled ? "true" : "false");
  }
  isQzSigningEnabled() {
    const cfg = environment.qzTray;
    return !!(cfg?.signingEnabled && cfg.certificateUrl?.trim() && cfg.signUrl?.trim());
  }
  hasPrintableReceipt(receipt) {
    return !!receipt?.escpos_base64?.trim();
  }
  async listPrinters() {
    const qz = await this.ensureQz();
    await this.connectQz(qz);
    return qz.printers.find();
  }
  async printReceipt(receipt) {
    const base64 = receipt?.escpos_base64?.trim();
    if (!base64) {
      throw new Error("El ticket no incluye datos ESC/POS para imprimir");
    }
    const printerName = this.getPrinterName();
    if (!printerName) {
      throw new Error("Configura el nombre de la impresora t\xE9rmica en Cobranza POS");
    }
    const qz = await this.ensureQz();
    await this.connectQz(qz);
    const config = qz.configs.create(printerName);
    await qz.print(config, [
      {
        type: "raw",
        format: "command",
        flavor: "base64",
        data: base64
      }
    ]);
  }
  setupQzSecurity(qz) {
    if (this.qzSecurityConfigured || !this.isQzSigningEnabled() || !qz.security) {
      return;
    }
    const { certificateUrl, signUrl } = environment.qzTray;
    qz.security.setSignatureAlgorithm("SHA512");
    qz.security.setCertificatePromise((resolve, reject) => {
      void this.fetchQzCertificate(certificateUrl).then(resolve).catch(reject);
    });
    qz.security.setSignaturePromise((toSign) => {
      return (resolve, reject) => {
        void this.signQzRequest(signUrl, toSign).then(resolve).catch(reject);
      };
    });
    this.qzSecurityConfigured = true;
  }
  async fetchQzCertificate(certificateUrl) {
    if (certificateUrl.startsWith("/assets/")) {
      const res = await fetch(certificateUrl, {
        cache: "no-store",
        headers: { Accept: "text/plain" }
      });
      if (!res.ok) {
        throw new Error("No se pudo cargar el certificado QZ Tray");
      }
      return res.text();
    }
    return firstValueFrom(this.http.get(certificateUrl, {
      responseType: "text",
      headers: { Accept: "text/plain" }
    }));
  }
  async signQzRequest(signUrl, toSign) {
    const params = new HttpParams().set("request", toSign);
    return firstValueFrom(this.http.get(signUrl, {
      params,
      responseType: "text",
      headers: { Accept: "text/plain" }
    }));
  }
  async connectQz(qz) {
    this.setupQzSecurity(qz);
    if (!qz.websocket.isActive()) {
      await qz.websocket.connect();
    }
  }
  async ensureQz() {
    if (!this.qzLoadPromise) {
      this.qzLoadPromise = this.loadQz();
    }
    return this.qzLoadPromise;
  }
  loadQz() {
    const win = window;
    if (win.qz) {
      return Promise.resolve(win.qz);
    }
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-qz-tray="true"]`);
      if (existing) {
        existing.addEventListener("load", () => {
          if (win.qz) {
            resolve(win.qz);
          } else {
            reject(new Error("QZ Tray no est\xE1 disponible"));
          }
        });
        existing.addEventListener("error", () => reject(new Error("No se pudo cargar QZ Tray. Inst\xE1lalo en la PC del POS.")));
        return;
      }
      const script = document.createElement("script");
      script.src = QZ_SCRIPT;
      script.async = true;
      script.dataset["qzTray"] = "true";
      script.onload = () => {
        if (win.qz) {
          resolve(win.qz);
        } else {
          reject(new Error("QZ Tray no est\xE1 disponible"));
        }
      };
      script.onerror = () => reject(new Error("No se pudo cargar QZ Tray. Inst\xE1lalo en la PC del POS."));
      document.head.appendChild(script);
    });
  }
  static \u0275fac = function PosReceiptPrintService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosReceiptPrintService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PosReceiptPrintService, factory: _PosReceiptPrintService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosReceiptPrintService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/pos/components/pos-printer-settings-dialog/pos-printer-settings-dialog.component.ts
function PosPrinterSettingsDialogComponent_Conditional_22_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 23);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("img", ctx_r2.Check);
  }
}
function PosPrinterSettingsDialogComponent_Conditional_22_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function PosPrinterSettingsDialogComponent_Conditional_22_For_5_Template_button_click_0_listener() {
      const name_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectPrinter(name_r2));
    });
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, PosPrinterSettingsDialogComponent_Conditional_22_For_5_Conditional_2_Template, 1, 1, "lucide-icon", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const name_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("printer-chip--selected", ctx_r2.printerName === name_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", name_r2, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.printerName === name_r2 ? 2 : -1);
  }
}
function PosPrinterSettingsDialogComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 19);
    \u0275\u0275text(2, "Selecciona una impresora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 20);
    \u0275\u0275repeaterCreate(4, PosPrinterSettingsDialogComponent_Conditional_22_For_5_Template, 3, 4, "button", 21, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.printers());
  }
}
function PosPrinterSettingsDialogComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.error());
  }
}
var PosPrinterSettingsDialogComponent = class _PosPrinterSettingsDialogComponent {
  dialogRef = inject(MatDialogRef);
  printService = inject(PosReceiptPrintService);
  Printer = Printer;
  RefreshCw = RefreshCw;
  Check = Check;
  X = X;
  printerName = this.printService.getPrinterName();
  autoPrint = this.printService.isAutoPrintEnabled();
  printers = signal([], ...ngDevMode ? [{ debugName: "printers" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  cancel() {
    this.dialogRef.close(false);
  }
  selectPrinter(name) {
    this.printerName = name;
    this.error.set(null);
  }
  async detectPrinters() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const list = await this.printService.listPrinters();
      this.printers.set(list);
      if (list.length === 0) {
        this.error.set("No se encontraron impresoras. Verifica que QZ Tray est\xE9 abierto.");
        return;
      }
      if (!this.printerName && list.length === 1) {
        this.printerName = list[0];
      }
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : "No se pudo conectar con QZ Tray");
      this.printers.set([]);
    } finally {
      this.loading.set(false);
    }
  }
  save() {
    this.printService.setPrinterName(this.printerName.trim());
    this.printService.setAutoPrintEnabled(this.autoPrint);
    this.dialogRef.close(true);
  }
  static \u0275fac = function PosPrinterSettingsDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosPrinterSettingsDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosPrinterSettingsDialogComponent, selectors: [["app-pos-printer-settings-dialog"]], decls: 33, vars: 11, consts: [[1, "modal-container"], [1, "modal-header"], [1, "modal-header__title"], ["aria-hidden", "true", 1, "modal-header__icon"], [3, "img"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], [1, "modal-body"], [1, "hint"], [1, "field"], [1, "field__label"], ["type", "text", "placeholder", "BIXOLON SRP-330III", "autocomplete", "off", 1, "field__input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "detect-btn", 3, "click", "disabled"], [1, "printer-list"], [1, "error-msg"], [1, "auto-print"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], [1, "printer-list__label"], [1, "printer-list__items"], ["type", "button", 1, "printer-chip", 3, "printer-chip--selected"], ["type", "button", 1, "printer-chip", 3, "click"], [1, "printer-chip__check", 3, "img"]], template: function PosPrinterSettingsDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275element(4, "lucide-icon", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "Impresora t\xE9rmica");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 5);
      \u0275\u0275listener("click", function PosPrinterSettingsDialogComponent_Template_button_click_7_listener() {
        return ctx.cancel();
      });
      \u0275\u0275element(8, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 6)(10, "p", 7);
      \u0275\u0275text(11, " Requiere ");
      \u0275\u0275elementStart(12, "strong");
      \u0275\u0275text(13, "QZ Tray");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, " en esta PC. El nombre debe coincidir con el de Windows. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "label", 8)(16, "span", 9);
      \u0275\u0275text(17, "Nombre de impresora");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function PosPrinterSettingsDialogComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.printerName, $event) || (ctx.printerName = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "button", 11);
      \u0275\u0275listener("click", function PosPrinterSettingsDialogComponent_Template_button_click_19_listener() {
        return ctx.detectPrinters();
      });
      \u0275\u0275element(20, "lucide-icon", 4);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(22, PosPrinterSettingsDialogComponent_Conditional_22_Template, 6, 0, "div", 12);
      \u0275\u0275conditionalCreate(23, PosPrinterSettingsDialogComponent_Conditional_23_Template, 2, 1, "p", 13);
      \u0275\u0275elementStart(24, "label", 14)(25, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function PosPrinterSettingsDialogComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.autoPrint, $event) || (ctx.autoPrint = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27, "Imprimir ticket al confirmar cobro");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 16)(29, "button", 17);
      \u0275\u0275listener("click", function PosPrinterSettingsDialogComponent_Template_button_click_29_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(30, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 18);
      \u0275\u0275listener("click", function PosPrinterSettingsDialogComponent_Template_button_click_31_listener() {
        return ctx.save();
      });
      \u0275\u0275text(32, "Guardar");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.Printer);
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.printerName);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275classProp("detect-btn__spin", ctx.loading());
      \u0275\u0275property("img", ctx.RefreshCw);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading() ? "Buscando impresoras\u2026" : "Buscar impresoras", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.printers().length > 0 ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 23 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.autoPrint);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgModel, MatDialogModule, LucideAngularModule, LucideAngularComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 440px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 1rem 1.15rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n}\n.modal-header__icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 8px;\n  background: #eef2ff;\n  color: #4f46e5;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.modal-header__icon[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #111827;\n  letter-spacing: -0.01em;\n}\n.close-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  border-radius: 8px;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.close-btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  width: 1.1rem;\n  height: 1.1rem;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1rem 1.15rem 0.85rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n}\n.hint[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.55rem 0.7rem;\n  border-radius: 8px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  font-size: 0.78rem;\n  line-height: 1.45;\n  color: #64748b;\n}\n.hint[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #334155;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.field__label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.field__input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  height: 42px;\n  padding: 0 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 9px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #0f172a;\n  background: #fff;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.field__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);\n}\n.field__input[_ngcontent-%COMP%]::placeholder {\n  color: #94a3b8;\n  font-weight: 500;\n}\n.detect-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  width: 100%;\n  min-height: 40px;\n  border: 1px solid #c7d2fe;\n  border-radius: 9px;\n  background: #eef2ff;\n  color: #4338ca;\n  font-size: 0.82rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    opacity 0.15s;\n}\n.detect-btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  width: 0.95rem;\n  height: 0.95rem;\n}\n.detect-btn__spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.detect-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e0e7ff;\n  border-color: #a5b4fc;\n}\n.detect-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.printer-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.printer-list__label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.printer-list__items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  max-height: 120px;\n  overflow-y: auto;\n  padding: 0.35rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 9px;\n  background: #f8fafc;\n}\n.printer-chip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  width: 100%;\n  text-align: left;\n  border: 1px solid transparent;\n  border-radius: 7px;\n  background: #fff;\n  padding: 0.45rem 0.6rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #334155;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    border-color 0.12s,\n    color 0.12s;\n}\n.printer-chip[_ngcontent-%COMP%]:hover {\n  border-color: #c7d2fe;\n  background: #fafbff;\n}\n.printer-chip--selected[_ngcontent-%COMP%] {\n  border-color: #818cf8;\n  background: #eef2ff;\n  color: #4338ca;\n}\n.printer-chip__check[_ngcontent-%COMP%] {\n  width: 0.9rem;\n  height: 0.9rem;\n  flex-shrink: 0;\n  color: #4f46e5;\n}\n.error-msg[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.5rem 0.65rem;\n  border-radius: 8px;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #b91c1c;\n  font-size: 0.78rem;\n  font-weight: 600;\n  line-height: 1.4;\n}\n.auto-print[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.55rem;\n  padding: 0.65rem 0.7rem;\n  border-radius: 9px;\n  border: 1px solid #e2e8f0;\n  background: #fafafa;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.auto-print[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  margin-top: 0.15rem;\n  width: 1rem;\n  height: 1rem;\n  accent-color: #4f46e5;\n  flex-shrink: 0;\n}\n.auto-print[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: #334155;\n  line-height: 1.35;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.85rem 1.15rem 1rem;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.btn[_ngcontent-%COMP%] {\n  min-height: 38px;\n  padding: 0 1rem;\n  border-radius: 9px;\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    opacity 0.15s;\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #475569;\n}\n.btn--ghost[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #4f46e5 0%,\n      #6366f1 100%);\n  color: #fff;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.28);\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.04);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=pos-printer-settings-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosPrinterSettingsDialogComponent, [{
    type: Component,
    args: [{ selector: "app-pos-printer-settings-dialog", standalone: true, imports: [CommonModule, FormsModule, MatDialogModule, LucideAngularModule], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <div class="modal-header__title">\r
      <span class="modal-header__icon" aria-hidden="true">\r
        <lucide-icon [img]="Printer" />\r
      </span>\r
      <h2>Impresora t\xE9rmica</h2>\r
    </div>\r
    <button type="button" class="close-btn" (click)="cancel()" aria-label="Cerrar">\r
      <lucide-icon [img]="X" />\r
    </button>\r
  </div>\r
\r
  <div class="modal-body">\r
    <p class="hint">\r
      Requiere <strong>QZ Tray</strong> en esta PC. El nombre debe coincidir con el de Windows.\r
    </p>\r
\r
    <label class="field">\r
      <span class="field__label">Nombre de impresora</span>\r
      <input\r
        type="text"\r
        class="field__input"\r
        [(ngModel)]="printerName"\r
        placeholder="BIXOLON SRP-330III"\r
        autocomplete="off" />\r
    </label>\r
\r
    <button\r
      type="button"\r
      class="detect-btn"\r
      (click)="detectPrinters()"\r
      [disabled]="loading()">\r
      <lucide-icon [img]="RefreshCw" [class.detect-btn__spin]="loading()" />\r
      {{ loading() ? 'Buscando impresoras\u2026' : 'Buscar impresoras' }}\r
    </button>\r
\r
    @if (printers().length > 0) {\r
      <div class="printer-list">\r
        <span class="printer-list__label">Selecciona una impresora</span>\r
        <div class="printer-list__items">\r
          @for (name of printers(); track name) {\r
            <button\r
              type="button"\r
              class="printer-chip"\r
              [class.printer-chip--selected]="printerName === name"\r
              (click)="selectPrinter(name)">\r
              {{ name }}\r
              @if (printerName === name) {\r
                <lucide-icon [img]="Check" class="printer-chip__check" />\r
              }\r
            </button>\r
          }\r
        </div>\r
      </div>\r
    }\r
\r
    @if (error()) {\r
      <p class="error-msg">{{ error() }}</p>\r
    }\r
\r
    <label class="auto-print">\r
      <input type="checkbox" [(ngModel)]="autoPrint" />\r
      <span>Imprimir ticket al confirmar cobro</span>\r
    </label>\r
  </div>\r
\r
  <div class="modal-footer">\r
    <button type="button" class="btn btn--ghost" (click)="cancel()">Cancelar</button>\r
    <button type="button" class="btn btn--primary" (click)="save()">Guardar</button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/pos/components/pos-printer-settings-dialog/pos-printer-settings-dialog.component.scss */\n:host {\n  display: block;\n  width: 100%;\n}\n.modal-container {\n  background: #fff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 440px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 1rem 1.15rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header__title {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n}\n.modal-header__icon {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 8px;\n  background: #eef2ff;\n  color: #4f46e5;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.modal-header__icon lucide-icon {\n  width: 1rem;\n  height: 1rem;\n}\n.modal-header h2 {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #111827;\n  letter-spacing: -0.01em;\n}\n.close-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  border-radius: 8px;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.close-btn lucide-icon {\n  width: 1.1rem;\n  height: 1.1rem;\n}\n.close-btn:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.modal-body {\n  padding: 1rem 1.15rem 0.85rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n}\n.hint {\n  margin: 0;\n  padding: 0.55rem 0.7rem;\n  border-radius: 8px;\n  background: #f8fafc;\n  border: 1px solid #e2e8f0;\n  font-size: 0.78rem;\n  line-height: 1.45;\n  color: #64748b;\n}\n.hint strong {\n  color: #334155;\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.field__label {\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.field__input {\n  width: 100%;\n  box-sizing: border-box;\n  height: 42px;\n  padding: 0 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 9px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #0f172a;\n  background: #fff;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.field__input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);\n}\n.field__input::placeholder {\n  color: #94a3b8;\n  font-weight: 500;\n}\n.detect-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  width: 100%;\n  min-height: 40px;\n  border: 1px solid #c7d2fe;\n  border-radius: 9px;\n  background: #eef2ff;\n  color: #4338ca;\n  font-size: 0.82rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    opacity 0.15s;\n}\n.detect-btn lucide-icon {\n  width: 0.95rem;\n  height: 0.95rem;\n}\n.detect-btn__spin {\n  animation: spin 0.8s linear infinite;\n}\n.detect-btn:hover:not(:disabled) {\n  background: #e0e7ff;\n  border-color: #a5b4fc;\n}\n.detect-btn:disabled {\n  opacity: 0.65;\n  cursor: not-allowed;\n}\n.printer-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.printer-list__label {\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.printer-list__items {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  max-height: 120px;\n  overflow-y: auto;\n  padding: 0.35rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 9px;\n  background: #f8fafc;\n}\n.printer-chip {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  width: 100%;\n  text-align: left;\n  border: 1px solid transparent;\n  border-radius: 7px;\n  background: #fff;\n  padding: 0.45rem 0.6rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: #334155;\n  cursor: pointer;\n  transition:\n    background 0.12s,\n    border-color 0.12s,\n    color 0.12s;\n}\n.printer-chip:hover {\n  border-color: #c7d2fe;\n  background: #fafbff;\n}\n.printer-chip--selected {\n  border-color: #818cf8;\n  background: #eef2ff;\n  color: #4338ca;\n}\n.printer-chip__check {\n  width: 0.9rem;\n  height: 0.9rem;\n  flex-shrink: 0;\n  color: #4f46e5;\n}\n.error-msg {\n  margin: 0;\n  padding: 0.5rem 0.65rem;\n  border-radius: 8px;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #b91c1c;\n  font-size: 0.78rem;\n  font-weight: 600;\n  line-height: 1.4;\n}\n.auto-print {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.55rem;\n  padding: 0.65rem 0.7rem;\n  border-radius: 9px;\n  border: 1px solid #e2e8f0;\n  background: #fafafa;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.auto-print input {\n  margin-top: 0.15rem;\n  width: 1rem;\n  height: 1rem;\n  accent-color: #4f46e5;\n  flex-shrink: 0;\n}\n.auto-print span {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: #334155;\n  line-height: 1.35;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.85rem 1.15rem 1rem;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.btn {\n  min-height: 38px;\n  padding: 0 1rem;\n  border-radius: 9px;\n  font-size: 0.84rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    opacity 0.15s;\n}\n.btn--ghost {\n  border: 1px solid #e2e8f0;\n  background: #fff;\n  color: #475569;\n}\n.btn--ghost:hover {\n  background: #f8fafc;\n}\n.btn--primary {\n  border: none;\n  background:\n    linear-gradient(\n      135deg,\n      #4f46e5 0%,\n      #6366f1 100%);\n  color: #fff;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.28);\n}\n.btn--primary:hover {\n  filter: brightness(1.04);\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=pos-printer-settings-dialog.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosPrinterSettingsDialogComponent, { className: "PosPrinterSettingsDialogComponent", filePath: "src/app/features/pos/components/pos-printer-settings-dialog/pos-printer-settings-dialog.component.ts", lineNumber: 15 });
})();

// src/app/features/pos/utils/escpos-preview.util.ts
function hasReceiptPreview(receipt) {
  return !!(receipt?.plain_text?.trim() || receipt?.escpos_base64?.trim());
}
function buildEscPosPreview(receipt) {
  if (!receipt) {
    return [];
  }
  const base64 = receipt.escpos_base64?.trim();
  if (base64) {
    try {
      const fromEscpos = parseEscPosBytesToLines(decodeEscPosBase64(base64));
      if (fromEscpos.length > 0) {
        return fromEscpos;
      }
    } catch {
    }
  }
  if (receipt.plain_text?.trim()) {
    return receipt.plain_text.split(/\r?\n/).map((text) => ({
      text,
      align: "left",
      bold: false
    }));
  }
  return [{ text: "No se pudo decodificar el ticket ESC/POS.", align: "left", bold: false }];
}
function decodeEscPosBase64(base64) {
  const binary = atob(base64.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
function parseEscPosBytesToLines(bytes) {
  const lines = [];
  let align = "left";
  let bold = false;
  let buffer = "";
  let i = 0;
  const flushLine = () => {
    lines.push({ text: buffer, align, bold });
    buffer = "";
  };
  while (i < bytes.length) {
    const byte = bytes[i];
    if (byte === 10) {
      flushLine();
      i++;
      continue;
    }
    if (byte === 13) {
      i++;
      continue;
    }
    if (byte === 27) {
      if (buffer) {
        flushLine();
      }
      i = parseEscSequence(bytes, i, {
        setAlign: (value) => {
          align = value;
        },
        setBold: (value) => {
          bold = value;
        }
      });
      continue;
    }
    if (byte === 29) {
      if (buffer) {
        flushLine();
      }
      i = parseGsSequence(bytes, i);
      continue;
    }
    if (byte === 9) {
      buffer += "        ";
      i++;
      continue;
    }
    if (byte < 32) {
      i++;
      continue;
    }
    const textChunk = readTextChunk(bytes, i);
    buffer += textChunk.text;
    i = textChunk.nextIndex;
  }
  if (buffer || lines.length === 0) {
    flushLine();
  }
  return trimPreviewLines(lines);
}
function trimPreviewLines(lines) {
  let start = 0;
  let end = lines.length;
  while (start < end && !lines[start].text.trim()) {
    start++;
  }
  while (end > start && !lines[end - 1].text.trim()) {
    end--;
  }
  return lines.slice(start, end);
}
function readTextChunk(bytes, start) {
  let i = start;
  while (i < bytes.length) {
    const byte = bytes[i];
    if (byte === 10 || byte === 13 || byte === 27 || byte === 29) {
      break;
    }
    if (byte < 32 && byte !== 9) {
      break;
    }
    i++;
  }
  const slice = bytes.subarray(start, i);
  const text = new TextDecoder("utf-8", { fatal: false }).decode(slice);
  return { text, nextIndex: i };
}
function parseEscSequence(bytes, start, handlers) {
  let i = start + 1;
  if (i >= bytes.length) {
    return bytes.length;
  }
  const cmd = bytes[i];
  i++;
  switch (cmd) {
    case 64:
      handlers.setAlign("left");
      handlers.setBold(false);
      return i;
    case 97:
      if (i < bytes.length) {
        const mode = bytes[i];
        handlers.setAlign(mode === 1 ? "center" : mode === 2 ? "right" : "left");
        i++;
      }
      return i;
    case 69:
      if (i < bytes.length) {
        handlers.setBold(bytes[i] === 1);
        i++;
      }
      return i;
    case 33:
      if (i < bytes.length) {
        handlers.setBold((bytes[i] & 8) !== 0);
        i++;
      }
      return i;
    case 45:
    case 77:
    case 51:
    case 100:
      if (i < bytes.length) {
        i++;
      }
      return i;
    case 116:
      if (i < bytes.length) {
        i++;
      }
      return i;
    default:
      return i;
  }
}
function parseGsSequence(bytes, start) {
  let i = start + 1;
  if (i >= bytes.length) {
    return bytes.length;
  }
  const cmd = bytes[i];
  i++;
  switch (cmd) {
    case 33:
    case 66:
    case 72:
    case 104:
    case 119:
      if (i < bytes.length) {
        i++;
      }
      return i;
    case 86:
      if (i < bytes.length) {
        const mode = bytes[i];
        i++;
        if (mode === 66 && i < bytes.length) {
          i++;
        }
      }
      return i;
    case 107:
      if (i >= bytes.length) {
        return i;
      }
      {
        const variant = bytes[i];
        i++;
        if (variant >= 65 && variant <= 71) {
          while (i < bytes.length && bytes[i] !== 0) {
            i++;
          }
          if (i < bytes.length) {
            i++;
          }
          return i;
        }
        if (i < bytes.length) {
          const len = bytes[i];
          i += len + 1;
        }
      }
      return i;
    default:
      return i;
  }
}

// src/app/features/pos/components/pos-receipt-preview-dialog/pos-receipt-preview-dialog.component.ts
function PosReceiptPreviewDialogComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Cargando ticket\u2026");
    \u0275\u0275elementEnd();
  }
}
function PosReceiptPreviewDialogComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function PosReceiptPreviewDialogComponent_Conditional_12_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r2 = ctx.$implicit;
    \u0275\u0275classProp("thermal-receipt__line--center", line_r2.align === "center")("thermal-receipt__line--right", line_r2.align === "right")("thermal-receipt__line--bold", line_r2.bold);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r2.text || " ", " ");
  }
}
function PosReceiptPreviewDialogComponent_Conditional_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Perfil: ", ctx_r0.receipt().printer_profile);
  }
}
function PosReceiptPreviewDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, " Vista seg\xFAn el contenido ESC/POS que se env\xEDa a la impresora (puede diferir del texto plano del API). ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 14)(3, "article", 15);
    \u0275\u0275repeaterCreate(4, PosReceiptPreviewDialogComponent_Conditional_12_For_5_Template, 2, 7, "p", 16, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, PosReceiptPreviewDialogComponent_Conditional_12_Conditional_6_Template, 2, 1, "p", 17);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r0.previewLines());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_2_0 = ctx_r0.receipt()) == null ? null : tmp_2_0.printer_profile) ? 6 : -1);
  }
}
function PosReceiptPreviewDialogComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function PosReceiptPreviewDialogComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function PosReceiptPreviewDialogComponent_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.printTicket());
    });
    \u0275\u0275element(1, "lucide-icon", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r0.printing());
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r0.Printer);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.printing() ? "Imprimiendo\u2026" : "Imprimir", " ");
  }
}
var PosReceiptPreviewDialogComponent = class _PosReceiptPreviewDialogComponent {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  posService = inject(POSService);
  salesOrderService = inject(SalesOrderService);
  printService = inject(PosReceiptPrintService);
  Eye = Eye;
  Printer = Printer;
  X = X;
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  receipt = signal(null, ...ngDevMode ? [{ debugName: "receipt" }] : []);
  previewLines = signal([], ...ngDevMode ? [{ debugName: "previewLines" }] : []);
  printing = signal(false, ...ngDevMode ? [{ debugName: "printing" }] : []);
  ngOnInit() {
    const initial = normalizePosSaleReceipt(this.data.receipt);
    if (initial && hasReceiptPreview(initial)) {
      this.applyReceipt(initial);
      return;
    }
    const orderId = this.data.salesOrderId?.trim();
    if (!orderId) {
      this.loading.set(false);
      this.error.set("No hay ticket disponible para previsualizar.");
      return;
    }
    if (this.data.useSalesOrderTicketApi) {
      this.salesOrderService.getTicketRecibo(orderId).subscribe({
        next: (payload) => this.applyLoadedReceipt(payload.receipt ?? null),
        error: () => {
          this.loading.set(false);
          this.error.set("No hay ticket guardado para esta venta.");
        }
      });
      return;
    }
    this.posService.getSaleReceipt(orderId).subscribe({
      next: (receipt) => this.applyLoadedReceipt(receipt),
      error: () => {
        this.loading.set(false);
        this.error.set("No se pudo cargar el ticket.");
      }
    });
  }
  applyLoadedReceipt(receipt) {
    if (!receipt || !hasReceiptPreview(receipt)) {
      this.loading.set(false);
      this.error.set("Esta venta no tiene ticket ESC/POS guardado.");
      return;
    }
    this.applyReceipt(receipt);
  }
  title() {
    return this.data.title?.trim() || "Vista previa del ticket";
  }
  canPrint() {
    return this.printService.hasPrintableReceipt(this.receipt());
  }
  close() {
    this.dialogRef.close();
  }
  async printTicket() {
    const receipt = this.receipt();
    if (!this.canPrint() || this.printing()) {
      return;
    }
    if (!this.printService.getPrinterName()) {
      this.error.set("Configura la impresora t\xE9rmica en Cobranza POS antes de imprimir.");
      return;
    }
    this.printing.set(true);
    this.error.set(null);
    try {
      await this.printService.printReceipt(receipt);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo imprimir el ticket";
      this.error.set(message);
    } finally {
      this.printing.set(false);
    }
  }
  applyReceipt(receipt) {
    this.receipt.set(receipt);
    this.previewLines.set(buildEscPosPreview(receipt));
    this.loading.set(false);
    this.error.set(null);
  }
  static \u0275fac = function PosReceiptPreviewDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosReceiptPreviewDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosReceiptPreviewDialogComponent, selectors: [["app-pos-receipt-preview-dialog"]], decls: 18, vars: 6, consts: [[1, "modal-container"], [1, "modal-header"], [1, "modal-header__title"], ["aria-hidden", "true", 1, "modal-header__icon"], [3, "img"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], [1, "modal-body"], [1, "status-msg"], [1, "status-msg", "status-msg--error"], [1, "inline-error"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], [1, "hint"], [1, "preview-wrap"], ["aria-label", "Vista previa ticket t\xE9rmico", 1, "thermal-receipt"], [1, "thermal-receipt__line", 3, "thermal-receipt__line--center", "thermal-receipt__line--right", "thermal-receipt__line--bold"], [1, "meta"], [1, "thermal-receipt__line"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function PosReceiptPreviewDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "span", 3);
      \u0275\u0275element(4, "lucide-icon", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 5);
      \u0275\u0275listener("click", function PosReceiptPreviewDialogComponent_Template_button_click_7_listener() {
        return ctx.close();
      });
      \u0275\u0275element(8, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 6);
      \u0275\u0275conditionalCreate(10, PosReceiptPreviewDialogComponent_Conditional_10_Template, 2, 0, "p", 7)(11, PosReceiptPreviewDialogComponent_Conditional_11_Template, 2, 1, "p", 8)(12, PosReceiptPreviewDialogComponent_Conditional_12_Template, 7, 1);
      \u0275\u0275conditionalCreate(13, PosReceiptPreviewDialogComponent_Conditional_13_Template, 2, 1, "p", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 10)(15, "button", 11);
      \u0275\u0275listener("click", function PosReceiptPreviewDialogComponent_Template_button_click_15_listener() {
        return ctx.close();
      });
      \u0275\u0275text(16, "Cerrar");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(17, PosReceiptPreviewDialogComponent_Conditional_17_Template, 3, 3, "button", 12);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.Eye);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title());
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 10 : ctx.error() && ctx.previewLines().length === 0 ? 11 : 12);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.error() && ctx.previewLines().length > 0 ? 13 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.canPrint() ? 17 : -1);
    }
  }, dependencies: [CommonModule, LucideAngularModule, LucideAngularComponent], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.modal-container[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 480px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 1rem 1.15rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-header__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n}\n.modal-header__icon[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 8px;\n  background: #ecfdf5;\n  color: #059669;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.modal-header__icon[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #111827;\n}\n.close-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.close-btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  width: 1.1rem;\n  height: 1.1rem;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1rem 1.15rem 1.1rem;\n  background: #f3f4f6;\n  max-height: min(72vh, 640px);\n  overflow: auto;\n}\n.hint[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  font-size: 0.75rem;\n  color: #64748b;\n  line-height: 1.4;\n  text-align: center;\n}\n.preview-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 0.5rem 0 0.75rem;\n}\n.thermal-receipt[_ngcontent-%COMP%] {\n  width: min(100%, 320px);\n  background: #fff;\n  color: #111827;\n  font-family:\n    "Consolas",\n    "Courier New",\n    Courier,\n    monospace;\n  font-size: 0.72rem;\n  line-height: 1.35;\n  padding: 1rem 0.85rem 1.25rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08), 0 8px 24px rgba(15, 23, 42, 0.12);\n  border: 1px solid #e5e7eb;\n  border-radius: 2px;\n  position: relative;\n}\n.thermal-receipt[_ngcontent-%COMP%]::before, \n.thermal-receipt[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 6px;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      #fff 0,\n      #fff 4px,\n      #e5e7eb 4px,\n      #e5e7eb 8px);\n}\n.thermal-receipt[_ngcontent-%COMP%]::before {\n  top: -1px;\n}\n.thermal-receipt[_ngcontent-%COMP%]::after {\n  bottom: -1px;\n}\n.thermal-receipt__line[_ngcontent-%COMP%] {\n  margin: 0;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.thermal-receipt__line--center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.thermal-receipt__line--right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.thermal-receipt__line--bold[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.status-msg[_ngcontent-%COMP%] {\n  margin: 0;\n  text-align: center;\n  color: #64748b;\n  font-size: 0.875rem;\n  padding: 2rem 0.5rem;\n}\n.status-msg--error[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n.meta[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  text-align: center;\n  font-size: 0.72rem;\n  color: #94a3b8;\n}\n.inline-error[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 0;\n  font-size: 0.78rem;\n  color: #b91c1c;\n  text-align: center;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.85rem 1.15rem 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border-radius: 8px;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  padding: 0.5rem 0.9rem;\n  cursor: pointer;\n  border: none;\n}\n.btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  width: 0.95rem;\n  height: 0.95rem;\n}\n.btn--ghost[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: #fff;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=pos-receipt-preview-dialog.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosReceiptPreviewDialogComponent, [{
    type: Component,
    args: [{ selector: "app-pos-receipt-preview-dialog", standalone: true, imports: [CommonModule, LucideAngularModule], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <div class="modal-header__title">\r
      <span class="modal-header__icon" aria-hidden="true">\r
        <lucide-icon [img]="Eye" />\r
      </span>\r
      <h2>{{ title() }}</h2>\r
    </div>\r
    <button type="button" class="close-btn" (click)="close()" aria-label="Cerrar">\r
      <lucide-icon [img]="X" />\r
    </button>\r
  </div>\r
\r
  <div class="modal-body">\r
    @if (loading()) {\r
      <p class="status-msg">Cargando ticket\u2026</p>\r
    } @else if (error() && previewLines().length === 0) {\r
      <p class="status-msg status-msg--error">{{ error() }}</p>\r
    } @else {\r
      <p class="hint">\r
        Vista seg\xFAn el contenido ESC/POS que se env\xEDa a la impresora (puede diferir del texto plano del API).\r
      </p>\r
\r
      <div class="preview-wrap">\r
        <article class="thermal-receipt" aria-label="Vista previa ticket t\xE9rmico">\r
          @for (line of previewLines(); track $index) {\r
            <p\r
              class="thermal-receipt__line"\r
              [class.thermal-receipt__line--center]="line.align === 'center'"\r
              [class.thermal-receipt__line--right]="line.align === 'right'"\r
              [class.thermal-receipt__line--bold]="line.bold">\r
              {{ line.text || ' ' }}\r
            </p>\r
          }\r
        </article>\r
      </div>\r
      @if (receipt()?.printer_profile) {\r
        <p class="meta">Perfil: {{ receipt()!.printer_profile }}</p>\r
      }\r
    }\r
\r
    @if (error() && previewLines().length > 0) {\r
      <p class="inline-error">{{ error() }}</p>\r
    }\r
  </div>\r
\r
  <div class="modal-footer">\r
    <button type="button" class="btn btn--ghost" (click)="close()">Cerrar</button>\r
    @if (canPrint()) {\r
      <button type="button" class="btn btn--primary" (click)="printTicket()" [disabled]="printing()">\r
        <lucide-icon [img]="Printer" />\r
        {{ printing() ? 'Imprimiendo\u2026' : 'Imprimir' }}\r
      </button>\r
    }\r
  </div>\r
</div>\r
`, styles: ['/* src/app/features/pos/components/pos-receipt-preview-dialog/pos-receipt-preview-dialog.component.scss */\n:host {\n  display: block;\n  width: 100%;\n}\n.modal-container {\n  background: #fff;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 480px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 1rem 1.15rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-header__title {\n  display: flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n}\n.modal-header__icon {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 8px;\n  background: #ecfdf5;\n  color: #059669;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.modal-header__icon lucide-icon {\n  width: 1rem;\n  height: 1rem;\n}\n.modal-header h2 {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #111827;\n}\n.close-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.close-btn lucide-icon {\n  width: 1.1rem;\n  height: 1.1rem;\n}\n.close-btn:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.modal-body {\n  padding: 1rem 1.15rem 1.1rem;\n  background: #f3f4f6;\n  max-height: min(72vh, 640px);\n  overflow: auto;\n}\n.hint {\n  margin: 0 0 0.75rem;\n  font-size: 0.75rem;\n  color: #64748b;\n  line-height: 1.4;\n  text-align: center;\n}\n.preview-wrap {\n  display: flex;\n  justify-content: center;\n  padding: 0.5rem 0 0.75rem;\n}\n.thermal-receipt {\n  width: min(100%, 320px);\n  background: #fff;\n  color: #111827;\n  font-family:\n    "Consolas",\n    "Courier New",\n    Courier,\n    monospace;\n  font-size: 0.72rem;\n  line-height: 1.35;\n  padding: 1rem 0.85rem 1.25rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08), 0 8px 24px rgba(15, 23, 42, 0.12);\n  border: 1px solid #e5e7eb;\n  border-radius: 2px;\n  position: relative;\n}\n.thermal-receipt::before,\n.thermal-receipt::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 6px;\n  background:\n    repeating-linear-gradient(\n      90deg,\n      #fff 0,\n      #fff 4px,\n      #e5e7eb 4px,\n      #e5e7eb 8px);\n}\n.thermal-receipt::before {\n  top: -1px;\n}\n.thermal-receipt::after {\n  bottom: -1px;\n}\n.thermal-receipt__line {\n  margin: 0;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.thermal-receipt__line--center {\n  text-align: center;\n}\n.thermal-receipt__line--right {\n  text-align: right;\n}\n.thermal-receipt__line--bold {\n  font-weight: 700;\n}\n.status-msg {\n  margin: 0;\n  text-align: center;\n  color: #64748b;\n  font-size: 0.875rem;\n  padding: 2rem 0.5rem;\n}\n.status-msg--error {\n  color: #b91c1c;\n}\n.meta {\n  margin: 0.35rem 0 0;\n  text-align: center;\n  font-size: 0.72rem;\n  color: #94a3b8;\n}\n.inline-error {\n  margin: 0.75rem 0 0;\n  font-size: 0.78rem;\n  color: #b91c1c;\n  text-align: center;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding: 0.85rem 1.15rem 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border-radius: 8px;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  padding: 0.5rem 0.9rem;\n  cursor: pointer;\n  border: none;\n}\n.btn lucide-icon {\n  width: 0.95rem;\n  height: 0.95rem;\n}\n.btn--ghost {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.btn--primary {\n  background: #4f46e5;\n  color: #fff;\n}\n.btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=pos-receipt-preview-dialog.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosReceiptPreviewDialogComponent, { className: "PosReceiptPreviewDialogComponent", filePath: "src/app/features/pos/components/pos-receipt-preview-dialog/pos-receipt-preview-dialog.component.ts", lineNumber: 30 });
})();

export {
  PosReceiptPrintService,
  PosPrinterSettingsDialogComponent,
  PosReceiptPreviewDialogComponent
};
//# sourceMappingURL=chunk-K7D45P4W.js.map
