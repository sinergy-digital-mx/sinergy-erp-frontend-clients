import {
  WarehouseService
} from "./chunk-K4SDPUH7.js";
import {
  CustomerService
} from "./chunk-7H2QQSLD.js";
import {
  CloseShiftDialogComponent,
  OpenShiftDialogComponent,
  applyOpenShiftDialogResult,
  isPosSessionNotFoundError
} from "./chunk-HFSGRXKS.js";
import "./chunk-T54TKC3O.js";
import "./chunk-RYWE5TDX.js";
import "./chunk-UAER4BUV.js";
import "./chunk-33HF2DBU.js";
import {
  POSService
} from "./chunk-FIVGSAPL.js";
import {
  ToastService
} from "./chunk-QTSLBIKC.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-I5IOP5OM.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-BOPJE7PX.js";
import {
  Banknote,
  Check,
  ChevronRight,
  CircleAlert,
  CreditCard,
  FileText,
  LogIn,
  LogOut,
  LucideAngularComponent,
  LucideAngularModule,
  Maximize2,
  Minimize2,
  Minus,
  Monitor,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Store,
  Trash2,
  User,
  X
} from "./chunk-4Y3D6DZ3.js";
import {
  Router
} from "./chunk-SH63266R.js";
import {
  CommonModule
} from "./chunk-6DLZ3MOQ.js";
import {
  Component,
  ViewChild,
  __spreadProps,
  __spreadValues,
  computed,
  inject,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
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
} from "./chunk-JD27NKNP.js";

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

// src/app/features/pos/utils/pos-order.util.ts
function resolvePosFiscalConfigurationId(session) {
  const branch = session?.posConfiguration?.branch;
  const fromBranch = branch?.fiscal_configuration_id ?? branch?.fiscalConfigurationId;
  if (fromBranch) {
    return String(fromBranch);
  }
  const cfg = session?.posConfiguration;
  if (cfg?.fiscal_configuration_id) {
    return String(cfg.fiscal_configuration_id);
  }
  return null;
}
function todayIsoDate() {
  const d = /* @__PURE__ */ new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function mapPosPaymentToApi(method) {
  switch (method) {
    case "cash":
      return { payment_status: "Pagado", paymentNote: "Pago: Efectivo" };
    case "card":
      return { payment_status: "Pagado", paymentNote: "Pago: Tarjeta" };
    case "credit":
      return { payment_status: "Pendiente", paymentNote: "Pago: Cr\xE9dito" };
    default:
      return { payment_status: "Pendiente", paymentNote: "Pago: Pendiente" };
  }
}
function buildPosSalesOrderPayload(cartItems, ctx) {
  const { payment_status, paymentNote } = mapPosPaymentToApi(ctx.paymentMethod);
  const terminal = ctx.terminalLabel?.trim() || "POS";
  const notes = `POS - ${terminal} - ${paymentNote}`;
  return __spreadProps(__spreadValues({
    fiscal_configuration_id: ctx.fiscalConfigurationId,
    warehouse_id: ctx.warehouseId,
    customer_id: ctx.customerId,
    expected_delivery_date: todayIsoDate(),
    sales_order_type: "POS",
    payment_status
  }, ctx.fiscalRazonSocial?.trim() ? { fiscal_razon_social: ctx.fiscalRazonSocial.trim() } : {}), {
    notes,
    line_items: cartItems.map((item) => ({
      product_id: item.product_id,
      product_uom_id: item.uom_id,
      quantity: item.quantity,
      unit_price: Number(item.unit_price),
      discount_percentage: 0,
      iva_percentage: Number(item.iva_percentage ?? 0),
      ieps_percentage: Number(item.ieps_percentage ?? 0)
    }))
  });
}
function isPosOrderFulfilled(order) {
  const status = String(order?.general_status ?? order?.status ?? "");
  return status === "Surtida";
}

// src/app/features/pos/pages/take-order/take-order.component.ts
var _c0 = ["posRoot"];
var _c1 = () => [];
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.price_list_id;
function TakeOrderComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "Comprobando sesi\xF3n\u2026");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 ", ctx_r1.sessionOpenedLabel());
  }
}
function TakeOrderComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275element(1, "lucide-icon", 14);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Sesi\xF3n activa");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, TakeOrderComponent_Conditional_11_Conditional_6_Template, 2, 1, "span", 43);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Package);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedWarehouseName());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.sessionOpenedLabel() ? 6 : -1);
  }
}
function TakeOrderComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "lucide-icon", 14);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Sin sesi\xF3n POS \u2014 inicia sesi\xF3n para cobrar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.AlertCircle);
  }
}
function TakeOrderComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePosSession());
    });
    \u0275\u0275element(1, "lucide-icon", 12);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cerrar sesi\xF3n");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.LogOut);
  }
}
function TakeOrderComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPosSession());
    });
    \u0275\u0275element(1, "lucide-icon", 12);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Iniciar sesi\xF3n");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.LogIn);
  }
}
function TakeOrderComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 46);
    \u0275\u0275element(2, "lucide-icon", 47);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Sesi\xF3n POS requerida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Inicia sesi\xF3n en la barra superior para cargar el carrito y registrar ventas.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 48);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_23_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPosSession());
    });
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Iniciar sesi\xF3n");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.LogIn);
  }
}
function TakeOrderComponent_For_33_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 62);
    \u0275\u0275listener("error", function TakeOrderComponent_For_33_Conditional_2_Template_img_error_0_listener() {
      \u0275\u0275restoreView(_r8);
      const product_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPhotoError(product_r7.id));
    })("load", function TakeOrderComponent_For_33_Conditional_2_Template_img_load_0_listener() {
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
function TakeOrderComponent_For_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275element(1, "lucide-icon", 63);
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
function TakeOrderComponent_For_33_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 53);
  }
}
function TakeOrderComponent_For_33_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
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
function TakeOrderComponent_For_33_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1, "Sin precio");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 49);
    \u0275\u0275listener("click", function TakeOrderComponent_For_33_Template_article_click_0_listener() {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.canAddToCart(product_r7) && ctx_r1.addProductToCart(product_r7));
    });
    \u0275\u0275elementStart(1, "div", 50);
    \u0275\u0275conditionalCreate(2, TakeOrderComponent_For_33_Conditional_2_Template, 1, 2, "img", 51)(3, TakeOrderComponent_For_33_Conditional_3_Template, 4, 1, "div", 52);
    \u0275\u0275conditionalCreate(4, TakeOrderComponent_For_33_Conditional_4_Template, 1, 0, "div", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 54)(6, "div", 55)(7, "h3", 56);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, TakeOrderComponent_For_33_Conditional_9_Template, 2, 1, "span", 57)(10, TakeOrderComponent_For_33_Conditional_10_Template, 2, 0, "span", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 59)(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 60);
    \u0275\u0275text(15, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "button", 61);
    \u0275\u0275listener("click", function TakeOrderComponent_For_33_Template_button_click_18_listener($event) {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.addProductToCart(product_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(19, "lucide-icon", 14);
    \u0275\u0275elementStart(20, "span");
    \u0275\u0275text(21, "Agregar");
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
    \u0275\u0275property("disabled", !ctx_r1.canAddToCart(product_r7));
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Plus);
  }
}
function TakeOrderComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "lucide-icon", 64);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No hay productos que coincidan");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Package);
  }
}
function TakeOrderComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "div", 65);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando cat\xE1logo\u2026");
    \u0275\u0275elementEnd()();
  }
}
function TakeOrderComponent_Conditional_48_For_3_Conditional_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 90);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("value", opt_r12.price_list_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", opt_r12.price_list_name, " \xB7 ", ctx_r1.formatCurrency(+opt_r12.price || 0), " ");
  }
}
function TakeOrderComponent_Conditional_48_For_3_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 88);
    \u0275\u0275listener("ngModelChange", function TakeOrderComponent_Conditional_48_For_3_Conditional_12_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const \u0275$index_203_r11 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPricingOptionChange(\u0275$index_203_r11, $event));
    });
    \u0275\u0275elementStart(1, "option", 89);
    \u0275\u0275text(2, "Lista: precio sugerido");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, TakeOrderComponent_Conditional_48_For_3_Conditional_12_For_4_Template, 2, 3, "option", 90, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r12 = \u0275\u0275nextContext();
    const item_r14 = ctx_r12.$implicit;
    const \u0275$index_203_r11 = ctx_r12.$index;
    \u0275\u0275property("id", "pos-price-list-" + \u0275$index_203_r11)("ngModel", item_r14.selected_price_list_id || "");
    \u0275\u0275attribute("aria-label", "Lista de precio para " + item_r14.product_name);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(item_r14.pricing_options || \u0275\u0275pureFunction0(3, _c1));
  }
}
function TakeOrderComponent_Conditional_48_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 67)(1, "div", 72)(2, "div", 73)(3, "h4", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 75)(6, "span", 76);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 77);
    \u0275\u0275text(9, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 78);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, TakeOrderComponent_Conditional_48_For_3_Conditional_12_Template, 5, 4, "select", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 80);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_48_For_3_Template_button_click_13_listener() {
      const \u0275$index_203_r11 = \u0275\u0275restoreView(_r9).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeItem(\u0275$index_203_r11));
    });
    \u0275\u0275element(14, "lucide-icon", 81);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 82)(16, "div", 83)(17, "button", 84);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_48_For_3_Template_button_click_17_listener() {
      const ctx_r14 = \u0275\u0275restoreView(_r9);
      const item_r14 = ctx_r14.$implicit;
      const \u0275$index_203_r11 = ctx_r14.$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_203_r11, item_r14.quantity - 1));
    });
    \u0275\u0275element(18, "lucide-icon", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "input", 85);
    \u0275\u0275listener("change", function TakeOrderComponent_Conditional_48_For_3_Template_input_change_19_listener($event) {
      const \u0275$index_203_r11 = \u0275\u0275restoreView(_r9).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_203_r11, +$event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 86);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_48_For_3_Template_button_click_20_listener() {
      const ctx_r15 = \u0275\u0275restoreView(_r9);
      const item_r14 = ctx_r15.$implicit;
      const \u0275$index_203_r11 = ctx_r15.$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_203_r11, item_r14.quantity + 1));
    });
    \u0275\u0275element(21, "lucide-icon", 81);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "span", 87);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r14.product_name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r14.product_sku);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r1.formatCurrency(item_r14.unit_price), " \xB7 ", item_r14.uom_name);
    \u0275\u0275advance();
    \u0275\u0275conditional(((item_r14.pricing_options == null ? null : item_r14.pricing_options.length) || 0) > 0 ? 12 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Trash2);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", "Cantidad de " + item_r14.product_name);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Minus);
    \u0275\u0275advance();
    \u0275\u0275property("value", item_r14.quantity);
    \u0275\u0275attribute("aria-label", "Cantidad");
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Plus);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r14.line_total));
  }
}
function TakeOrderComponent_Conditional_48_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275element(1, "lucide-icon", 91);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Carrito vac\xEDo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Elige productos del cat\xE1logo");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.ShoppingCart);
  }
}
function TakeOrderComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 66);
    \u0275\u0275repeaterCreate(2, TakeOrderComponent_Conditional_48_For_3_Template, 24, 12, "article", 67, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275conditionalCreate(4, TakeOrderComponent_Conditional_48_Conditional_4_Template, 6, 1, "div", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 69)(6, "div", 70)(7, "span");
    \u0275\u0275text(8, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 70)(12, "span");
    \u0275\u0275text(13, "IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 70)(17, "span");
    \u0275\u0275text(18, "IEPS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "strong");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 71)(22, "span");
    \u0275\u0275text(23, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("pos-cart__lines--empty", ctx_r1.posService.cart().items.length === 0);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.posService.cart().items);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.posService.cart().items.length === 0 ? 4 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.posService.cart().total_subtotal));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.posService.cart().total_iva));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.posService.cart().total_ieps));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.posService.cart().grand_total));
  }
}
function TakeOrderComponent_Conditional_49_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92)(1, "span");
    \u0275\u0275text(2, "Total a cobrar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.posService.cart().grand_total));
  }
}
function TakeOrderComponent_Conditional_49_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.customerInitials(ctx), " ");
  }
}
function TakeOrderComponent_Conditional_49_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 14);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("img", ctx_r1.User);
  }
}
function TakeOrderComponent_Conditional_49_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.customerDisplayName(ctx));
  }
}
function TakeOrderComponent_Conditional_49_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 100);
    \u0275\u0275text(1, "Mostrador \xB7 toca para elegir cliente");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_49_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 110);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_49_Conditional_14_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.clearCustomer();
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(1, "lucide-icon", 81);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.X);
  }
}
function TakeOrderComponent_Conditional_49_Conditional_29_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 109);
    \u0275\u0275text(1, "Monto insuficiente para el total");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_49_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 108)(1, "label", 111)(2, "span");
    \u0275\u0275text(3, "Cantidad recibida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 112);
    \u0275\u0275listener("ngModelChange", function TakeOrderComponent_Conditional_49_Conditional_29_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onAmountPaidChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 113)(6, "span");
    \u0275\u0275text(7, "Cambio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "output");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, TakeOrderComponent_Conditional_49_Conditional_29_Conditional_10_Template, 2, 0, "p", 109);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.amountPaid);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.calculateChange()));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isPaymentValid() && ctx_r1.posService.cart().grand_total > 0 ? 10 : -1);
  }
}
function TakeOrderComponent_Conditional_49_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 109);
    \u0275\u0275text(1, "Selecciona un cliente existente para venta a cr\xE9dito");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275conditionalCreate(1, TakeOrderComponent_Conditional_49_Conditional_1_Template, 5, 1, "div", 92);
    \u0275\u0275elementStart(2, "div", 93)(3, "button", 94);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_49_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openCustomerPicker());
    });
    \u0275\u0275elementStart(4, "div", 95)(5, "span", 96);
    \u0275\u0275conditionalCreate(6, TakeOrderComponent_Conditional_49_Conditional_6_Template, 1, 1)(7, TakeOrderComponent_Conditional_49_Conditional_7_Template, 1, 1, "lucide-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 97)(9, "span", 98);
    \u0275\u0275text(10, "Cliente existente");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, TakeOrderComponent_Conditional_49_Conditional_11_Template, 2, 1, "span", 99)(12, TakeOrderComponent_Conditional_49_Conditional_12_Template, 2, 0, "span", 100);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 101);
    \u0275\u0275conditionalCreate(14, TakeOrderComponent_Conditional_49_Conditional_14_Template, 2, 1, "button", 102);
    \u0275\u0275element(15, "lucide-icon", 103);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div", 104)(17, "h3", 105);
    \u0275\u0275text(18, "M\xE9todo de pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 106)(20, "button", 107);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_49_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPaymentMethod("cash"));
    });
    \u0275\u0275element(21, "lucide-icon", 33);
    \u0275\u0275text(22, " Efectivo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 107);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_49_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPaymentMethod("card"));
    });
    \u0275\u0275element(24, "lucide-icon", 33);
    \u0275\u0275text(25, " Tarjeta ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 107);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_49_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPaymentMethod("credit"));
    });
    \u0275\u0275element(27, "lucide-icon", 33);
    \u0275\u0275text(28, " Cr\xE9dito ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(29, TakeOrderComponent_Conditional_49_Conditional_29_Template, 11, 3, "div", 108);
    \u0275\u0275conditionalCreate(30, TakeOrderComponent_Conditional_49_Conditional_30_Template, 2, 0, "p", 109);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.posService.cart().grand_total > 0 ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("pos-customer__toggle--selected", !!ctx_r1.selectedCustomer());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("pos-customer__avatar--filled", !!ctx_r1.selectedCustomer());
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.selectedCustomer()) ? 6 : 7, tmp_5_0);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_6_0 = ctx_r1.selectedCustomer()) ? 11 : 12, tmp_6_0);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.selectedCustomer() ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.ChevronRight);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("pos-pay__method--on", ctx_r1.paymentMethod() === "cash");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Banknote);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("pos-pay__method--on", ctx_r1.paymentMethod() === "card");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.CreditCard);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("pos-pay__method--on", ctx_r1.paymentMethod() === "credit");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.FileText);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.paymentMethod() === "cash" ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.paymentMethod() === "credit" && !ctx_r1.selectedCustomerId() ? 30 : -1);
  }
}
var TakeOrderComponent = class _TakeOrderComponent {
  posService;
  warehouseService;
  customerService;
  router;
  toast;
  dialog;
  posRootRef;
  Search = Search;
  Plus = Plus;
  ShoppingCart = ShoppingCart;
  Trash2 = Trash2;
  Minus = Minus;
  CreditCard = CreditCard;
  Banknote = Banknote;
  FileText = FileText;
  Maximize2 = Maximize2;
  Minimize2 = Minimize2;
  LogIn = LogIn;
  LogOut = LogOut;
  Monitor = Monitor;
  Package = Package;
  AlertCircle = CircleAlert;
  User = User;
  ChevronRight = ChevronRight;
  X = X;
  products = signal([], ...ngDevMode ? [{ debugName: "products" }] : []);
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  filteredProducts = signal([], ...ngDevMode ? [{ debugName: "filteredProducts" }] : []);
  selectedWarehouse = signal("", ...ngDevMode ? [{ debugName: "selectedWarehouse" }] : []);
  searchTerm = signal("", ...ngDevMode ? [{ debugName: "searchTerm" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  loadingPhotos = signal(false, ...ngDevMode ? [{ debugName: "loadingPhotos" }] : []);
  loadingPrices = signal(false, ...ngDevMode ? [{ debugName: "loadingPrices" }] : []);
  priceListError = signal(false, ...ngDevMode ? [{ debugName: "priceListError" }] : []);
  isFullscreen = signal(false, ...ngDevMode ? [{ debugName: "isFullscreen" }] : []);
  photoLoadingStates = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "photoLoadingStates" }] : []);
  photoErrorStates = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "photoErrorStates" }] : []);
  cartActiveTab = signal("products", ...ngDevMode ? [{ debugName: "cartActiveTab" }] : []);
  paymentMethod = signal("cash", ...ngDevMode ? [{ debugName: "paymentMethod" }] : []);
  customers = signal([], ...ngDevMode ? [{ debugName: "customers" }] : []);
  selectedCustomerId = signal("", ...ngDevMode ? [{ debugName: "selectedCustomerId" }] : []);
  /** Usa propiedad para ngModel (evita conflicto con signal). */
  amountPaid = 0;
  String = String;
  /** Código del equipo POS (configuración); se guarda al abrir sesión. */
  terminalId = signal("", ...ngDevMode ? [{ debugName: "terminalId" }] : []);
  /** Turno de caja = sesión POS en API actual */
  activePosSession = signal(null, ...ngDevMode ? [{ debugName: "activePosSession" }] : []);
  checkingSession = signal(false, ...ngDevMode ? [{ debugName: "checkingSession" }] : []);
  constructor(posService, warehouseService, customerService, router, toast, dialog) {
    this.posService = posService;
    this.warehouseService = warehouseService;
    this.customerService = customerService;
    this.router = router;
    this.toast = toast;
    this.dialog = dialog;
  }
  sessionOk = computed(() => !!this.activePosSession(), ...ngDevMode ? [{ debugName: "sessionOk" }] : []);
  cartProductsTabLabel = computed(() => {
    const count = this.posService.cart().items.length;
    return count > 0 ? `Productos (${count})` : "Productos";
  }, ...ngDevMode ? [{ debugName: "cartProductsTabLabel" }] : []);
  cartPaymentTabLabel = computed(() => {
    const total = this.posService.cart().grand_total;
    if (total <= 0) {
      return "Pago";
    }
    return `Pago \xB7 ${this.formatCurrency(total)}`;
  }, ...ngDevMode ? [{ debugName: "cartPaymentTabLabel" }] : []);
  selectedCustomer = computed(() => {
    const id = this.selectedCustomerId();
    if (!id) {
      return null;
    }
    return this.customers().find((c) => String(c.id) === String(id)) ?? null;
  }, ...ngDevMode ? [{ debugName: "selectedCustomer" }] : []);
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
    this.loadData();
    document.addEventListener("fullscreenchange", this.onFullscreenChange);
  }
  ngOnDestroy() {
    document.removeEventListener("fullscreenchange", this.onFullscreenChange);
  }
  selectedWarehouseName() {
    const id = this.selectedWarehouse();
    const w = this.warehouses().find((x) => x.id === id);
    return w?.name ?? "Almac\xE9n";
  }
  loadData() {
    this.loading.set(true);
    this.priceListError.set(false);
    this.products.set([]);
    this.filteredProducts.set([]);
    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        const warehouseArray = Array.isArray(warehouses) ? warehouses : warehouses.data || [];
        this.warehouses.set(warehouseArray);
        const stored = localStorage.getItem("pos_warehouse_id");
        const pick = stored && warehouseArray.some((w) => w.id === stored) ? stored : warehouseArray[0]?.id ?? "";
        this.selectedWarehouse.set(pick);
        if (pick) {
          localStorage.setItem("pos_warehouse_id", pick);
          this.refreshPosSession();
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notifyError("Error al cargar almacenes", 5e3);
      }
    });
    this.loadCustomers();
  }
  loadCustomers(search = "") {
    const params = { limit: 100 };
    if (search.trim()) {
      params["search"] = search.trim();
    }
    this.customerService.getCustomers(params).subscribe({
      next: (customers) => {
        const list = Array.isArray(customers) ? customers : customers?.data || [];
        this.customers.set(list);
      },
      error: () => {
        this.customers.set([]);
      }
    });
  }
  async openCustomerPicker() {
    await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(PosCustomerPickerDialogComponent, {
      width: "520px",
      maxWidth: "95vw",
      maxHeight: "90vh",
      panelClass: "pos-dialog-panel",
      data: { selectedCustomerId: this.selectedCustomerId() }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === void 0) {
        return;
      }
      this.selectedCustomerId.set(result.customerId);
      if (result.customer) {
        const id = String(result.customer.id);
        const exists = this.customers().some((c) => String(c.id) === id);
        if (!exists) {
          this.customers.update((list) => [...list, result.customer]);
        }
      }
    });
  }
  clearCustomer() {
    this.selectedCustomerId.set("");
  }
  setCartTab(tab) {
    this.cartActiveTab.set(tab);
  }
  setPaymentMethod(method) {
    this.paymentMethod.set(method);
    this.cartActiveTab.set("payment");
    if (method === "credit" && !this.selectedCustomerId()) {
      void this.openCustomerPicker();
    }
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
  /** Etiqueta del chip de terminal según sesión activa y valores guardados al abrir sesión. */
  syncTerminalLabelFromSession(hasActiveSession) {
    if (!hasActiveSession) {
      localStorage.removeItem("pos_configuration_id");
      localStorage.removeItem("pos_configuration_code");
      this.terminalId.set("");
      return;
    }
    const code = localStorage.getItem("pos_configuration_code");
    this.terminalId.set(code ?? "");
  }
  refreshPosSession() {
    const posConfigId = localStorage.getItem("pos_configuration_id");
    if (!posConfigId) {
      this.activePosSession.set(null);
      this.syncTerminalLabelFromSession(false);
      this.checkingSession.set(false);
      return;
    }
    this.checkingSession.set(true);
    this.posService.getActivePosSession(posConfigId).subscribe({
      next: (session) => {
        const active = session && session.id ? session : null;
        this.activePosSession.set(active);
        this.syncTerminalLabelFromSession(!!active);
        this.loadProductsForActiveSession();
        this.checkingSession.set(false);
      },
      error: (error) => {
        this.activePosSession.set(null);
        this.syncTerminalLabelFromSession(false);
        this.products.set([]);
        this.filteredProducts.set([]);
        this.checkingSession.set(false);
        if (!isPosSessionNotFoundError(error)) {
          this.notifyError("No se pudo verificar la sesi\xF3n POS", 4e3);
        }
      }
    });
  }
  async openPosSession() {
    await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(OpenShiftDialogComponent, {
      width: "420px",
      maxWidth: "95vw",
      disableClose: true,
      panelClass: "pos-dialog-panel"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.selectedWarehouse.set(result.warehouse_id);
      this.checkingSession.set(true);
      applyOpenShiftDialogResult(result, this.posService).subscribe({
        next: (session) => {
          this.activePosSession.set(session);
          if (result.pos_configuration_code) {
            this.terminalId.set(result.pos_configuration_code);
          } else {
            this.terminalId.set("");
          }
          this.checkingSession.set(false);
          this.loadProductsForActiveSession();
          this.notifySuccess(result.action === "resume" ? "Sesi\xF3n POS reanudada" : "Sesi\xF3n POS iniciada", 3e3);
        },
        error: (error) => {
          this.checkingSession.set(false);
          this.notifyError(error.error?.message || "No se pudo iniciar la sesi\xF3n", 5e3);
        }
      });
    });
  }
  async closePosSession() {
    await this.exitFullscreenForDialog();
    const session = this.activePosSession();
    if (!session?.id) {
      return;
    }
    const dialogRef = this.dialog.open(CloseShiftDialogComponent, {
      width: "520px",
      maxWidth: "95vw",
      disableClose: true,
      data: { shift: session }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const { closing_balance, notes } = result;
      this.checkingSession.set(true);
      this.posService.closePosSession(session.id, { closing_balance, notes }).subscribe({
        next: () => {
          this.activePosSession.set(null);
          localStorage.removeItem("pos_configuration_id");
          localStorage.removeItem("pos_configuration_code");
          this.terminalId.set("");
          this.products.set([]);
          this.filteredProducts.set([]);
          this.checkingSession.set(false);
          this.notifySuccess("Sesi\xF3n cerrada", 4e3);
        },
        error: (error) => {
          this.checkingSession.set(false);
          this.notifyError(error.error?.message || "Error al cerrar la sesi\xF3n", 5e3);
        }
      });
    });
  }
  sessionOpenedLabel() {
    const s = this.activePosSession();
    if (!s?.opened_at) {
      return "";
    }
    try {
      return new Date(s.opened_at).toLocaleString("es-MX", {
        dateStyle: "short",
        timeStyle: "short"
      });
    } catch {
      return "";
    }
  }
  onSearchChange() {
    if (this.sessionOk()) {
      this.loadProductsForActiveSession(this.searchTerm());
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
    if (!this.sessionOk()) {
      this.notifyInfo("Inicia sesi\xF3n POS para agregar productos", 4e3);
      return;
    }
    if (!product.has_price) {
      this.notifyError("Este producto no tiene precio configurado", 3e3);
      return;
    }
    const cartItem = {
      product_id: product.product_id || product.id,
      product_name: product.product_name || product.name,
      product_sku: product.product_sku || product.sku || "",
      uom_id: product.uom_id || "default-uom",
      uom_name: product.uom_name || "Pieza",
      quantity: 1,
      unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      iva_percentage: Number(product.suggested_iva_percentage ?? 16),
      ieps_percentage: Number(product.suggested_ieps_percentage ?? 0),
      subtotal: 0,
      iva_amount: 0,
      ieps_amount: 0,
      line_total: 0,
      pricing_options: Array.isArray(product.pricing_options) ? product.pricing_options : [],
      selected_price_list_id: "",
      suggested_unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      suggested_iva_percentage: Number(product.suggested_iva_percentage ?? 16),
      suggested_ieps_percentage: Number(product.suggested_ieps_percentage ?? 0)
    };
    const subtotal = cartItem.quantity * cartItem.unit_price;
    const iva_amount = subtotal * (cartItem.iva_percentage / 100);
    const ieps_amount = subtotal * (cartItem.ieps_percentage / 100);
    cartItem.subtotal = subtotal;
    cartItem.iva_amount = iva_amount;
    cartItem.ieps_amount = ieps_amount;
    cartItem.line_total = subtotal + iva_amount + ieps_amount;
    this.posService.addItem(cartItem);
    this.notifySuccess(`${product.product_name || product.name} agregado`, 2e3);
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
    if (!this.sessionOk()) {
      this.notifyError("Debes tener una sesi\xF3n POS activa", 4e3);
      return;
    }
    const session = this.activePosSession();
    const warehouseId = this.selectedWarehouse();
    if (!warehouseId) {
      this.notifyInfo("Selecciona un almac\xE9n de la sucursal", 3e3);
      return;
    }
    const fiscalConfigurationId = resolvePosFiscalConfigurationId(session);
    if (!fiscalConfigurationId) {
      this.setCartTab("payment");
      this.notifyError("No hay configuraci\xF3n fiscal en la sucursal del POS. Revisa la sucursal en Ajustes.", 6e3);
      return;
    }
    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.notifyInfo("Agrega productos a la orden", 3e3);
      return;
    }
    const customerId = this.selectedCustomerId();
    if (!customerId) {
      this.setCartTab("payment");
      this.notifyInfo("Selecciona un cliente para registrar la venta", 3500);
      return;
    }
    if (this.paymentMethod() === "credit" && !customerId) {
      this.setCartTab("payment");
      this.notifyInfo("Selecciona un cliente para venta a cr\xE9dito", 3500);
      return;
    }
    if (this.paymentMethod() === "cash" && !this.isPaymentValid()) {
      this.setCartTab("payment");
      this.notifyInfo("Cantidad recibida insuficiente para el total", 3500);
      return;
    }
    const customer = this.selectedCustomer();
    const payload = buildPosSalesOrderPayload(cart.items, {
      session,
      warehouseId,
      fiscalConfigurationId,
      customerId: Number(customerId) || customerId,
      fiscalRazonSocial: customer ? this.customerDisplayName(customer) : void 0,
      terminalLabel: this.terminalId() || void 0,
      paymentMethod: this.paymentMethod()
    });
    this.saving.set(true);
    this.posService.createPosSalesOrder(payload).subscribe({
      next: (order) => {
        this.saving.set(false);
        if (!isPosOrderFulfilled(order)) {
          this.notifyError(`Orden ${order.folio || order.id} creada con estado ${order.general_status || order.status || "desconocido"}`, 6e3);
          return;
        }
        const folio = order.folio ? ` (${order.folio})` : "";
        this.notifySuccess(`Venta registrada${folio} \u2014 inventario surtido`, 4e3);
        this.posService.clearCart();
        this.amountPaid = 0;
        this.selectedCustomerId.set("");
        this.cartActiveTab.set("products");
        this.refreshPosSession();
      },
      error: (error) => {
        this.saving.set(false);
        this.setCartTab("payment");
        const msg = error?.error?.message || error?.message || "Error al crear la orden de venta";
        this.notifyError(msg, 6e3);
      }
    });
  }
  cancel() {
    if (confirm("\xBFDescartar orden actual?")) {
      this.posService.clearCart();
      this.amountPaid = 0;
      this.router.navigate(["/pos"]);
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
    if (!this.sessionOk()) {
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
    if (!this.sessionOk()) {
      return "Inicia sesi\xF3n POS para vender";
    }
    if (Number(product.total_available_quantity ?? 0) <= 0) {
      return "Sin stock disponible";
    }
    if (product.suggested_unit_price == null && product.cost == null) {
      return "Producto sin precio configurado";
    }
    return "";
  }
  calculateChange() {
    const total = this.posService.cart().grand_total;
    const paid = this.amountPaid;
    return paid > total ? paid - total : 0;
  }
  isPaymentValid() {
    if (this.paymentMethod() === "cash") {
      return this.amountPaid >= this.posService.cart().grand_total;
    }
    return true;
  }
  onAmountPaidChange(value) {
    const n = typeof value === "string" ? parseFloat(value) : value;
    this.amountPaid = Number.isFinite(n) ? n : 0;
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
  loadProductsForActiveSession(search = "") {
    const sessionId = this.activePosSession()?.id;
    if (!sessionId) {
      this.products.set([]);
      this.filteredProducts.set([]);
      return;
    }
    this.loading.set(true);
    this.posService.getPosSessionInventorySummary(sessionId, {
      search: search.trim() || void 0,
      warehouse_id: this.selectedWarehouse() || void 0,
      only_available: true,
      limit: 200
    }).subscribe({
      next: (rows) => {
        const normalized = (rows || []).map((row) => __spreadProps(__spreadValues({}, row), {
          id: row.product_id || row.id,
          name: row.product_name || row.name || "Producto",
          sku: row.product_sku || row.sku || "",
          primary_photo_url: row.product_photo || row.primary_photo_url || null,
          cost: Number(row.suggested_unit_price ?? row.cost ?? 0),
          has_price: row.suggested_unit_price != null || row.cost != null,
          total_available_quantity: Number(row.total_available_quantity ?? 0),
          pricing_options: Array.isArray(row.pricing_options) ? row.pricing_options : []
        }));
        this.products.set(normalized);
        this.filteredProducts.set(normalized);
        this.priceListError.set(false);
        this.loading.set(false);
      },
      error: () => {
        this.products.set([]);
        this.filteredProducts.set([]);
        this.priceListError.set(true);
        this.loading.set(false);
        this.notifyError("No se pudo cargar inventario POS de la sesi\xF3n", 4e3);
      }
    });
  }
  static \u0275fac = function TakeOrderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TakeOrderComponent)(\u0275\u0275directiveInject(POSService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TakeOrderComponent, selectors: [["app-take-order"]], viewQuery: function TakeOrderComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.posRootRef = _t.first);
    }
  }, decls: 55, vars: 30, consts: [["posRoot", ""], [1, "pos-take-root"], [1, "pos-session-bar"], [1, "pos-session-bar__content"], [1, "pos-session-bar__left"], [1, "pos-session-bar__title"], [1, "pos-session-bar__title-icon", 3, "img"], [1, "pos-session-bar__center"], [1, "pos-session-bar__checking"], [1, "pos-pill", "pos-pill--warn"], [1, "pos-session-bar__right"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", "pos-btn--icon", 3, "click"], [1, "pos-ic", "pos-ic--btn", 3, "img"], [1, "pos-terminal-chip"], [1, "pos-ic", "pos-ic--sm", 3, "img"], [1, "pos-terminal-chip__label"], ["type", "button", 1, "pos-btn", "pos-btn--ghost"], ["type", "button", 1, "pos-btn", "pos-btn--primary"], [1, "pos-take-body"], ["aria-hidden", "true", 1, "pos-lock-overlay"], [1, "pos-catalog"], [1, "pos-catalog__toolbar"], [1, "pos-search"], [1, "pos-search__icon", 3, "img"], ["type", "search", "placeholder", "Buscar por nombre o SKU\u2026", "autocomplete", "off", 1, "pos-search__input", 3, "ngModelChange", "ngModel"], [1, "pos-catalog__hint"], [1, "pos-product-grid"], [1, "pos-card", 3, "pos-card--disabled"], [1, "pos-empty-grid"], [1, "pos-loading-grid"], [1, "pos-cart"], [1, "pos-cart__head"], [1, "pos-cart__head-title"], [1, "pos-ic", 3, "img"], ["role", "tablist", "aria-label", "Secciones de la orden", 1, "pos-cart__tabs"], ["type", "button", "role", "tab", 1, "pos-cart__tab", 3, "click"], [1, "pos-cart__body"], [1, "pos-cart__panel", "pos-cart__panel--products"], [1, "pos-cart__panel", "pos-cart__panel--payment"], [1, "pos-cart__actions"], ["type", "button", 1, "pos-btn", "pos-btn--muted", 3, "click", "disabled"], ["type", "button", 1, "pos-btn", "pos-btn--accent", 3, "click", "disabled"], [1, "pos-pill", "pos-pill--ok"], [1, "pos-session-meta"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", 3, "click"], ["type", "button", 1, "pos-btn", "pos-btn--primary", 3, "click"], [1, "pos-lock-card"], [1, "pos-lock-card__icon", 3, "img"], ["type", "button", 1, "pos-btn", "pos-btn--primary", "pos-btn--lg", 3, "click"], [1, "pos-card", 3, "click"], [1, "pos-card__media"], ["loading", "lazy", 3, "src", "alt"], [1, "pos-card__media-placeholder"], [1, "pos-card__media-loading"], [1, "pos-card__body"], [1, "pos-card__head"], [1, "pos-card__name"], [1, "pos-card__price"], [1, "pos-card__no-price"], [1, "pos-card__meta"], ["aria-hidden", "true", 1, "pos-card__meta-dot"], ["type", "button", 1, "pos-card__add", 3, "click", "disabled"], ["loading", "lazy", 3, "error", "load", "src", "alt"], [1, "pos-card__media-placeholder-icon", 3, "img"], [1, "pos-empty-grid__icon", 3, "img"], [1, "pos-spinner"], [1, "pos-cart__lines"], [1, "pos-line"], [1, "pos-cart-empty"], [1, "pos-cart__summary"], [1, "pos-sum-row"], [1, "pos-sum-row", "pos-sum-row--total"], [1, "pos-line__top"], [1, "pos-line__info"], [1, "pos-line__name"], [1, "pos-line__meta"], [1, "pos-line__sku"], ["aria-hidden", "true", 1, "pos-line__meta-sep"], [1, "pos-line__unit"], [1, "pos-line__pricing-select", 3, "id", "ngModel"], ["type", "button", "title", "Quitar del carrito", "aria-label", "Quitar del carrito", 1, "pos-line__remove", 3, "click"], [1, "pos-ic", "pos-ic--xs", 3, "img"], [1, "pos-line__bottom"], ["role", "group", 1, "pos-qty"], ["type", "button", "aria-label", "Disminuir cantidad", 1, "pos-qty__btn", 3, "click"], ["type", "number", "min", "1", 1, "pos-qty__input", 3, "change", "value"], ["type", "button", "aria-label", "Aumentar cantidad", 1, "pos-qty__btn", 3, "click"], [1, "pos-line__total"], [1, "pos-line__pricing-select", 3, "ngModelChange", "id", "ngModel"], ["value", ""], [3, "value"], [1, "pos-cart-empty__icon", 3, "img"], [1, "pos-pay__banner"], [1, "pos-customer"], ["type", "button", 1, "pos-customer__toggle", 3, "click"], [1, "pos-customer__toggle-left"], [1, "pos-customer__avatar"], [1, "pos-customer__toggle-text"], [1, "pos-customer__label"], [1, "pos-customer__name"], [1, "pos-customer__hint"], [1, "pos-customer__toggle-right"], ["type", "button", "title", "Quitar cliente", 1, "pos-customer__clear"], [1, "pos-ic", "pos-ic--sm", "pos-customer__chevron", 3, "img"], [1, "pos-pay"], [1, "pos-pay__title"], [1, "pos-pay__methods"], ["type", "button", 1, "pos-pay__method", 3, "click"], [1, "pos-cash"], [1, "pos-cash__warn"], ["type", "button", "title", "Quitar cliente", 1, "pos-customer__clear", 3, "click"], [1, "pos-cash__field"], ["type", "number", "min", "0", "step", "0.01", 3, "ngModelChange", "ngModel"], [1, "pos-cash__change"]], template: function TakeOrderComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1, 0)(2, "header", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
      \u0275\u0275element(6, "lucide-icon", 6);
      \u0275\u0275elementStart(7, "span");
      \u0275\u0275text(8, "Punto de Venta");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275conditionalCreate(10, TakeOrderComponent_Conditional_10_Template, 2, 0, "span", 8)(11, TakeOrderComponent_Conditional_11_Template, 7, 3)(12, TakeOrderComponent_Conditional_12_Template, 4, 1, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 10)(14, "button", 11);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleFullscreen());
      });
      \u0275\u0275element(15, "lucide-icon", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 13);
      \u0275\u0275element(17, "lucide-icon", 14);
      \u0275\u0275elementStart(18, "span", 15);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(20, TakeOrderComponent_Conditional_20_Template, 4, 1, "button", 16);
      \u0275\u0275conditionalCreate(21, TakeOrderComponent_Conditional_21_Template, 4, 1, "button", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 18);
      \u0275\u0275conditionalCreate(23, TakeOrderComponent_Conditional_23_Template, 10, 1, "div", 19);
      \u0275\u0275elementStart(24, "section", 20)(25, "div", 21)(26, "div", 22);
      \u0275\u0275element(27, "lucide-icon", 23);
      \u0275\u0275elementStart(28, "input", 24);
      \u0275\u0275listener("ngModelChange", function TakeOrderComponent_Template_input_ngModelChange_28_listener($event) {
        \u0275\u0275restoreView(_r1);
        ctx.searchTerm.set($event);
        return \u0275\u0275resetView(ctx.onSearchChange());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "p", 25);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 26);
      \u0275\u0275repeaterCreate(32, TakeOrderComponent_For_33_Template, 22, 11, "article", 27, _forTrack02);
      \u0275\u0275conditionalCreate(34, TakeOrderComponent_Conditional_34_Template, 4, 1, "div", 28);
      \u0275\u0275conditionalCreate(35, TakeOrderComponent_Conditional_35_Template, 4, 0, "div", 29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "aside", 30)(37, "div", 31)(38, "div", 32);
      \u0275\u0275element(39, "lucide-icon", 33);
      \u0275\u0275elementStart(40, "h2");
      \u0275\u0275text(41, "Orden actual");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "div", 34)(43, "button", 35);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_43_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setCartTab("products"));
      });
      \u0275\u0275text(44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 35);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_45_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setCartTab("payment"));
      });
      \u0275\u0275text(46);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "div", 36);
      \u0275\u0275conditionalCreate(48, TakeOrderComponent_Conditional_48_Template, 26, 7, "div", 37)(49, TakeOrderComponent_Conditional_49_Template, 31, 20, "div", 38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 39)(51, "button", 40);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_51_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.cancel());
      });
      \u0275\u0275text(52, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "button", 41);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.saveOrder());
      });
      \u0275\u0275text(54);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("pos-take-root--fullscreen", ctx.isFullscreen());
      \u0275\u0275advance(6);
      \u0275\u0275property("img", ctx.Monitor);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.checkingSession() ? 10 : ctx.activePosSession() ? 11 : 12);
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.isFullscreen() ? ctx.Minimize2 : ctx.Maximize2);
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.Monitor);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.terminalId() || "\u2014");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.checkingSession() && ctx.activePosSession() ? 20 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.checkingSession() && !ctx.activePosSession() ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("pos-take-body--locked", !ctx.sessionOk());
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.sessionOk() ? 23 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.Search);
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.searchTerm());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.filteredProducts().length, " productos");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filteredProducts());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.filteredProducts().length === 0 && !ctx.loading() ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 35 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.ShoppingCart);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("pos-cart__tab--active", ctx.cartActiveTab() === "products");
      \u0275\u0275attribute("aria-selected", ctx.cartActiveTab() === "products");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.cartProductsTabLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275classProp("pos-cart__tab--active", ctx.cartActiveTab() === "payment");
      \u0275\u0275attribute("aria-selected", ctx.cartActiveTab() === "payment");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.cartPaymentTabLabel(), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.cartActiveTab() === "products" ? 48 : 49);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.saving());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving() || !ctx.sessionOk() || ctx.posService.cart().items.length === 0 || !ctx.isPaymentValid() || ctx.paymentMethod() === "credit" && !ctx.selectedCustomerId());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Guardando\u2026" : "Guardar orden", " ");
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, LucideAngularModule, LucideAngularComponent], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  --pos-bg: #0f172a;\n  --pos-surface: #ffffff;\n  --pos-muted: #64748b;\n  --pos-border: #e5e7eb;\n  --pos-accent: #6366f1;\n  --pos-accent2: #8b5cf6;\n  --pos-success: #10b981;\n  --pos-warn: #f59e0b;\n  --pos-radius: 12px;\n  --pos-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.12);\n  --pos-panel-x: 1.25rem;\n  --pos-panel-y: 1rem;\n  --pos-panel-head-h: 52px;\n  display: block;\n  min-height: 100%;\n}\n.pos-take-root[_ngcontent-%COMP%] {\n  height: calc(100vh - 0px);\n  display: flex;\n  flex-direction: column;\n  background: #f1f5f9;\n  padding: 0.65rem 0.75rem 0;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.pos-take-root--fullscreen[_ngcontent-%COMP%] {\n  width: 100vw;\n  height: 100vh;\n  padding: 0.55rem 0.65rem 0;\n}\n.pos-session-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      105deg,\n      #0f172a 0%,\n      #1e1b4b 45%,\n      #312e81 100%);\n  color: #f8fafc;\n  padding: 0.4rem clamp(0.75rem, 2vw, 1.25rem);\n  box-shadow: 0 2px 16px rgba(15, 23, 42, 0.28);\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n.pos-session-bar__content[_ngcontent-%COMP%] {\n  max-width: 1680px;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.45rem 0.85rem;\n  justify-content: space-between;\n  min-height: 40px;\n}\n.pos-session-bar__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem 1.35rem;\n  padding-left: 0.15rem;\n}\n.pos-session-bar__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  letter-spacing: -0.02em;\n}\n.pos-session-bar__title-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 18px;\n  height: 18px;\n  opacity: 0.95;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-session-bar__center[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem 0.75rem;\n  min-width: 200px;\n}\n.pos-session-bar__checking[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.85;\n}\n.pos-session-meta[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  opacity: 0.75;\n}\n.pos-session-bar__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.pos-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  line-height: 1.2;\n  max-width: 100%;\n}\n.pos-pill--ok[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.2);\n  color: #a7f3d0;\n  border: 1px solid rgba(16, 185, 129, 0.35);\n}\n.pos-pill--warn[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fde68a;\n  border: 1px solid rgba(245, 158, 11, 0.35);\n}\n.pos-terminal-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: rgba(99, 102, 241, 0.35);\n  padding: 0.28rem 0.65rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  border: 1px solid rgba(165, 180, 252, 0.35);\n  line-height: 1.2;\n}\n.pos-session-bar[_ngcontent-%COMP%]   .pos-btn[_ngcontent-%COMP%] {\n  padding: 0.32rem 0.65rem;\n  font-size: 0.72rem;\n  border-radius: 8px;\n  gap: 0.35rem;\n}\n.pos-session-bar[_ngcontent-%COMP%]   .pos-btn--icon[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n}\n.pos-terminal-chip__label[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.pos-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  border: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s;\n  line-height: 1.2;\n}\n.pos-btn--primary[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #312e81;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);\n  padding: 0.38rem 0.75rem;\n  font-size: 0.78rem;\n}\n.pos-btn--primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);\n}\n.pos-btn--ghost[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fecaca;\n  border: 1px solid rgba(248, 113, 113, 0.35);\n}\n.pos-btn--ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(248, 113, 113, 0.2);\n}\n.pos-btn--icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n}\n.pos-btn--muted[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #64748b;\n  border: 1px solid var(--pos-border);\n}\n.pos-btn--accent[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--pos-accent),\n      var(--pos-accent2));\n  color: #fff;\n  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);\n}\n.pos-btn--accent[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.pos-btn--lg[_ngcontent-%COMP%] {\n  padding: 0.65rem 1.25rem;\n  font-size: 0.9rem;\n}\n.pos-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.pos-ic[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-ic--sm[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.pos-ic--xs[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.pos-ic--btn[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n.pos-take-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(400px, 460px);\n  gap: 0.75rem;\n  min-height: 0;\n  position: relative;\n  margin-top: 0.65rem;\n  padding-bottom: 0.65rem;\n  overflow: hidden;\n}\n.pos-take-body--locked[_ngcontent-%COMP%]   .pos-catalog[_ngcontent-%COMP%], \n.pos-take-body--locked[_ngcontent-%COMP%]   .pos-cart[_ngcontent-%COMP%] {\n  filter: saturate(0.65);\n  opacity: 0.55;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.pos-lock-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 15;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: auto;\n  padding: 2rem;\n  background: rgba(248, 250, 252, 0.35);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.pos-lock-card[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  background: var(--pos-surface);\n  border-radius: var(--pos-radius);\n  padding: 2rem 2rem 2.25rem;\n  max-width: 400px;\n  width: 100%;\n  box-shadow: var(--pos-shadow);\n  border: 1px solid var(--pos-border);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.pos-lock-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 1.2rem;\n  color: #0f172a;\n  width: 100%;\n}\n.pos-lock-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 1.35rem;\n  font-size: 0.9rem;\n  color: var(--pos-muted);\n  line-height: 1.45;\n  max-width: 28ch;\n}\n.pos-lock-card[_ngcontent-%COMP%]   .pos-btn[_ngcontent-%COMP%] {\n  min-width: 11rem;\n}\n.pos-lock-card__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  width: 52px !important;\n  height: 52px !important;\n  margin: 0 0 1.1rem;\n  color: var(--pos-accent);\n  line-height: 0;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      145deg,\n      #eef2ff,\n      #e0e7ff);\n  padding: 10px;\n  box-sizing: border-box;\n}\n.pos-catalog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.pos-catalog__toolbar[_ngcontent-%COMP%] {\n  height: var(--pos-panel-head-h);\n  min-height: var(--pos-panel-head-h);\n  max-height: var(--pos-panel-head-h);\n  padding: 0 var(--pos-panel-x);\n  box-sizing: border-box;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  background: var(--pos-surface);\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-search[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  max-width: 520px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: #f1f5f9;\n  border-radius: 8px;\n  padding: 0 0.75rem;\n  border: 1px solid transparent;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.pos-search[_ngcontent-%COMP%]:focus-within {\n  border-color: #c7d2fe;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n  background: #fff;\n}\n.pos-search__icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  color: var(--pos-muted);\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-search__input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-search__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.pos-search__input[_ngcontent-%COMP%]::placeholder {\n  color: #94a3b8;\n}\n.pos-catalog__hint[_ngcontent-%COMP%] {\n  margin: 0;\n  flex-shrink: 0;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  font-weight: 500;\n  white-space: nowrap;\n}\n.pos-product-grid[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--pos-panel-x);\n  background: #f8fafc;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));\n  gap: 0.85rem;\n  align-content: start;\n}\n.pos-card[_ngcontent-%COMP%] {\n  background: var(--pos-surface);\n  border-radius: 10px;\n  border: 1px solid var(--pos-border);\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  transition:\n    box-shadow 0.18s ease,\n    border-color 0.18s,\n    transform 0.18s ease;\n}\n.pos-card[_ngcontent-%COMP%]:hover:not(.pos-card--disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px -6px rgba(79, 70, 229, 0.18);\n  border-color: #c7d2fe;\n}\n.pos-card--disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n  filter: grayscale(0.15);\n}\n.pos-card__media[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 4/3;\n  background: #f1f5f9;\n}\n.pos-card__media[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.pos-card__media-loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.65);\n  animation: _ngcontent-%COMP%_pos-pulse 1.2s ease-in-out infinite;\n}\n.pos-card__media-placeholder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  color: #94a3b8;\n  font-size: 0.72rem;\n  font-weight: 600;\n}\n.pos-card__media-placeholder-icon[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  opacity: 0.7;\n}\n@keyframes _ngcontent-%COMP%_pos-pulse {\n  50% {\n    opacity: 0.5;\n  }\n}\n.pos-card__body[_ngcontent-%COMP%] {\n  padding: 0.75rem 0.85rem 0.5rem;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.pos-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.pos-card__name[_ngcontent-%COMP%] {\n  margin: 0;\n  flex: 1;\n  min-width: 0;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.35;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-card__meta[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.6875rem;\n  color: #6b7280;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.25rem;\n}\n.pos-card__meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 0.65rem;\n  color: #9ca3af;\n}\n.pos-card__meta-dot[_ngcontent-%COMP%] {\n  color: #d1d5db;\n}\n.pos-card__price[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #4f46e5;\n  letter-spacing: -0.02em;\n  line-height: 1.2;\n}\n.pos-card__no-price[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.6875rem;\n  color: #dc2626;\n  font-weight: 600;\n}\n.pos-card__add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  margin: 0 0.65rem 0.65rem;\n  width: calc(100% - 1.3rem);\n  border: none;\n  padding: 0.5rem 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  border-radius: 8px;\n  cursor: pointer;\n  background: #4f46e5;\n  color: #fff;\n  transition:\n    background 0.15s,\n    box-shadow 0.15s,\n    transform 0.12s;\n}\n.pos-card__add[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);\n}\n.pos-card__add[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.pos-card__add[_ngcontent-%COMP%]:disabled {\n  background: #e5e7eb;\n  color: #9ca3af;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.pos-empty-grid[_ngcontent-%COMP%], \n.pos-loading-grid[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 3rem 1rem;\n  color: var(--pos-muted);\n}\n.pos-empty-grid__icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.75rem;\n  opacity: 0.45;\n}\n.pos-spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--pos-accent);\n  border-radius: 50%;\n  margin: 0 auto 1rem;\n  animation: _ngcontent-%COMP%_pos-spin 0.75s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_pos-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pos-cart[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.pos-cart__head[_ngcontent-%COMP%] {\n  height: var(--pos-panel-head-h);\n  min-height: var(--pos-panel-head-h);\n  max-height: var(--pos-panel-head-h);\n  padding: 0 var(--pos-panel-x);\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-cart__head-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.pos-cart__head-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-cart__tabs[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0;\n  flex-shrink: 0;\n  padding: 0 var(--pos-panel-x);\n  border-bottom: 1px solid var(--pos-border);\n  background: var(--pos-surface);\n}\n.pos-cart__tab[_ngcontent-%COMP%] {\n  position: relative;\n  border: none;\n  background: transparent;\n  padding: 0.55rem 0.35rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  cursor: pointer;\n  transition: color 0.15s, background 0.15s;\n  text-align: center;\n}\n.pos-cart__tab[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -1px;\n  height: 2px;\n  background: transparent;\n  transition: background 0.15s;\n}\n.pos-cart__tab[_ngcontent-%COMP%]:hover {\n  color: #374151;\n  background: #f9fafb;\n}\n.pos-cart__tab--active[_ngcontent-%COMP%] {\n  color: #4f46e5;\n}\n.pos-cart__tab--active[_ngcontent-%COMP%]::after {\n  background: #4f46e5;\n}\n.pos-cart__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.pos-cart__panel[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.pos-cart__panel--products[_ngcontent-%COMP%] {\n  background: #f8fafc;\n}\n.pos-cart__panel--payment[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  background: var(--pos-surface);\n  padding-bottom: 0.25rem;\n}\n.pos-cart__lines[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--pos-panel-x);\n  min-height: 0;\n  background: #f8fafc;\n}\n.pos-cart__lines--empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pos-line[_ngcontent-%COMP%] {\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: 8px;\n  padding: 0.6rem 0.7rem;\n  margin-bottom: 0.5rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-line[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.pos-line__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n}\n.pos-line__info[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.pos-line__name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-line__meta[_ngcontent-%COMP%] {\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.2rem 0.3rem;\n  font-size: 0.6875rem;\n  line-height: 1.3;\n}\n.pos-line__sku[_ngcontent-%COMP%] {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  color: #9ca3af;\n}\n.pos-line__meta-sep[_ngcontent-%COMP%] {\n  color: #d1d5db;\n}\n.pos-line__unit[_ngcontent-%COMP%] {\n  color: #4f46e5;\n  font-weight: 500;\n}\n.pos-line__pricing-select[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  height: 28px;\n  border: 1px solid var(--pos-border);\n  border-radius: 6px;\n  padding: 0 0.45rem;\n  font-size: 0.6875rem;\n  color: #374151;\n  background: #f9fafb;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.pos-line__pricing-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  background: #fff;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n.pos-line__remove[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #9ca3af;\n  width: 26px;\n  height: 26px;\n  margin-top: -0.1rem;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.pos-line__remove[_ngcontent-%COMP%]:hover {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.pos-line__bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.pos-qty[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: stretch;\n  height: 30px;\n  border: 1px solid var(--pos-border);\n  border-radius: 6px;\n  overflow: hidden;\n  background: #fff;\n  flex-shrink: 0;\n}\n.pos-qty__btn[_ngcontent-%COMP%] {\n  width: 30px;\n  border: none;\n  background: #fff;\n  color: #374151;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.12s, color 0.12s;\n}\n.pos-qty__btn[_ngcontent-%COMP%]:first-child {\n  border-right: 1px solid var(--pos-border);\n}\n.pos-qty__btn[_ngcontent-%COMP%]:last-child {\n  border-left: 1px solid var(--pos-border);\n}\n.pos-qty__btn[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n  color: #4f46e5;\n}\n.pos-qty__btn[_ngcontent-%COMP%]:active {\n  background: #f3f4f6;\n}\n.pos-qty__input[_ngcontent-%COMP%] {\n  width: 36px;\n  text-align: center;\n  border: none;\n  font-weight: 600;\n  font-size: 0.8125rem;\n  color: #111827;\n  background: #fff;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.pos-qty__input[_ngcontent-%COMP%]::-webkit-outer-spin-button, \n.pos-qty__input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.pos-qty__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background: #fafafa;\n}\n.pos-line__total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.9375rem;\n  color: #111827;\n  letter-spacing: -0.02em;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.pos-cart-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1.2rem 1rem;\n  color: var(--pos-muted);\n  width: 100%;\n}\n.pos-cart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0.15rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.pos-cart-empty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.pos-cart-empty__icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  opacity: 0.35;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto;\n}\n.pos-cart__summary[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: var(--pos-panel-y) var(--pos-panel-x);\n  border-top: 1px solid var(--pos-border);\n  background: #fff;\n}\n.pos-sum-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: var(--pos-muted);\n  margin-bottom: 0.35rem;\n}\n.pos-sum-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #334155;\n  font-weight: 600;\n}\n.pos-sum-row--total[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  padding-top: 0.65rem;\n  border-top: 1px solid var(--pos-border);\n  font-size: 1rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.pos-sum-row--total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  color: var(--pos-accent);\n}\n.pos-customer[_ngcontent-%COMP%] {\n  padding: var(--pos-panel-y) var(--pos-panel-x) 0.65rem;\n  flex-shrink: 0;\n  background: var(--pos-surface);\n}\n.pos-customer__toggle[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.65rem;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  background: #fff;\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background 0.15s;\n  text-align: left;\n}\n.pos-customer__toggle[_ngcontent-%COMP%]:hover {\n  border-color: #c7d2fe;\n  background: #fafbff;\n}\n.pos-customer__toggle--selected[_ngcontent-%COMP%] {\n  border-color: #818cf8;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #eef2ff 100%);\n}\n.pos-customer__toggle-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 0;\n  flex: 1;\n}\n.pos-customer__toggle-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  flex-shrink: 0;\n}\n.pos-customer__toggle-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.pos-customer__avatar[_ngcontent-%COMP%] {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.72rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.pos-customer__avatar--filled[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  color: #fff;\n}\n.pos-customer__label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--pos-muted);\n}\n.pos-customer__name[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #1e293b;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.pos-customer__hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #94a3b8;\n}\n.pos-customer__chevron[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n.pos-customer__clear[_ngcontent-%COMP%] {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.06);\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.pos-customer__clear[_ngcontent-%COMP%]:hover {\n  background: rgba(220, 38, 38, 0.1);\n  color: #dc2626;\n}\n.pos-pay__banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin: var(--pos-panel-y) var(--pos-panel-x) 0;\n  padding: 0.65rem 0.85rem;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #eef2ff 0%,\n      #f5f3ff 100%);\n  border: 1px solid #e0e7ff;\n}\n.pos-pay__banner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #6b7280;\n}\n.pos-pay__banner[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #4f46e5;\n  letter-spacing: -0.02em;\n}\n.pos-pay[_ngcontent-%COMP%] {\n  padding: 0 var(--pos-panel-x) 1rem;\n  background: var(--pos-surface);\n}\n.pos-pay__title[_ngcontent-%COMP%] {\n  margin: 0 0 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--pos-muted);\n}\n.pos-pay__methods[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.45rem;\n}\n.pos-pay__method[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.55rem 0.35rem;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n  background: #fff;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.pos-pay__method--on[_ngcontent-%COMP%] {\n  border-color: var(--pos-accent);\n  background:\n    linear-gradient(\n      180deg,\n      #eef2ff 0%,\n      #e0e7ff 100%);\n  color: #4338ca;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);\n}\n.pos-pay__method[_ngcontent-%COMP%]:hover {\n  border-color: #c7d2fe;\n}\n.pos-cash[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-credit[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-credit[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.9rem;\n  color: #334155;\n  background: #fff;\n}\n.pos-cash__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  margin-bottom: 0.65rem;\n}\n.pos-cash__field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.pos-cash__change[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__change[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--pos-success);\n  font-weight: 700;\n}\n.pos-cash__warn[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  font-size: 0.75rem;\n  color: #b45309;\n  font-weight: 600;\n}\n.pos-cart__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  flex-shrink: 0;\n  padding: 0.85rem var(--pos-panel-x) var(--pos-panel-x);\n  border-top: 1px solid var(--pos-border);\n  background: var(--pos-surface);\n}\n.pos-cart__actions[_ngcontent-%COMP%]   .pos-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  justify-content: center;\n  padding: 0.75rem;\n  font-size: 0.88rem;\n}\n.pos-session-bar[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-pill[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-terminal-chip[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-btn[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-lock-card__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-search[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-card__add[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.pos-cart-empty__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n  flex-shrink: 0;\n}\n@media (max-width: 1024px) {\n  .pos-take-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(280px, 55vh) auto;\n  }\n  .pos-catalog[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid var(--pos-border);\n  }\n  .pos-session-bar__content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .pos-session-bar__center[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .pos-session-bar__right[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n/*# sourceMappingURL=take-order.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TakeOrderComponent, [{
    type: Component,
    args: [{ selector: "app-take-order", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], template: `<div #posRoot class="pos-take-root" [class.pos-take-root--fullscreen]="isFullscreen()">
  <!-- Barra sesi\xF3n POS full width -->
  <header class="pos-session-bar">
    <div class="pos-session-bar__content">
      <div class="pos-session-bar__left">
        <div class="pos-session-bar__title">
          <lucide-icon [img]="Monitor" class="pos-session-bar__title-icon" />
          <span>Punto de Venta</span>
        </div>
      </div>

      <div class="pos-session-bar__center">
        @if (checkingSession()) {
          <span class="pos-session-bar__checking">Comprobando sesi\xF3n\u2026</span>
        } @else if (activePosSession()) {
          <div class="pos-pill pos-pill--ok">
            <lucide-icon [img]="Package" class="pos-ic pos-ic--sm" />
            <span>Sesi\xF3n activa</span>
          </div>
          <span class="pos-session-meta">{{ selectedWarehouseName() }}</span>
          @if (sessionOpenedLabel()) {
            <span class="pos-session-meta">\xB7 {{ sessionOpenedLabel() }}</span>
          }
        } @else {
          <div class="pos-pill pos-pill--warn">
            <lucide-icon [img]="AlertCircle" class="pos-ic pos-ic--sm" />
            <span>Sin sesi\xF3n POS \u2014 inicia sesi\xF3n para cobrar</span>
          </div>
        }
      </div>

      <div class="pos-session-bar__right">
        <button type="button" class="pos-btn pos-btn--ghost pos-btn--icon" (click)="toggleFullscreen()">
          <lucide-icon [img]="isFullscreen() ? Minimize2 : Maximize2" class="pos-ic pos-ic--btn" />
        </button>
        <div class="pos-terminal-chip">
          <lucide-icon [img]="Monitor" class="pos-ic pos-ic--sm" />
          <span class="pos-terminal-chip__label">{{ terminalId() || '\u2014' }}</span>
        </div>
        @if (!checkingSession() && activePosSession()) {
          <button type="button" class="pos-btn pos-btn--ghost" (click)="closePosSession()">
            <lucide-icon [img]="LogOut" class="pos-ic pos-ic--btn" />
            <span>Cerrar sesi\xF3n</span>
          </button>
        }
        @if (!checkingSession() && !activePosSession()) {
          <button type="button" class="pos-btn pos-btn--primary" (click)="openPosSession()">
            <lucide-icon [img]="LogIn" class="pos-ic pos-ic--btn" />
            <span>Iniciar sesi\xF3n</span>
          </button>
        }
      </div>
    </div>
  </header>

  <div class="pos-take-body" [class.pos-take-body--locked]="!sessionOk()">
    @if (!sessionOk()) {
      <div class="pos-lock-overlay" aria-hidden="true">
        <div class="pos-lock-card">
          <lucide-icon [img]="LogIn" class="pos-lock-card__icon" />
          <h3>Sesi\xF3n POS requerida</h3>
          <p>Inicia sesi\xF3n en la barra superior para cargar el carrito y registrar ventas.</p>
          <button type="button" class="pos-btn pos-btn--primary pos-btn--lg" (click)="openPosSession()">
            <span>Iniciar sesi\xF3n</span>
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
            <p>No hay productos que coincidan</p>
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
          <h2>Orden actual</h2>
        </div>
      </div>

      <div class="pos-cart__tabs" role="tablist" aria-label="Secciones de la orden">
        <button
          type="button"
          class="pos-cart__tab"
          role="tab"
          [attr.aria-selected]="cartActiveTab() === 'products'"
          [class.pos-cart__tab--active]="cartActiveTab() === 'products'"
          (click)="setCartTab('products')">
          {{ cartProductsTabLabel() }}
        </button>
        <button
          type="button"
          class="pos-cart__tab"
          role="tab"
          [attr.aria-selected]="cartActiveTab() === 'payment'"
          [class.pos-cart__tab--active]="cartActiveTab() === 'payment'"
          (click)="setCartTab('payment')">
          {{ cartPaymentTabLabel() }}
        </button>
      </div>

      <div class="pos-cart__body">
        @if (cartActiveTab() === 'products') {
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
        <div class="pos-sum-row">
          <span>Subtotal</span>
          <strong>{{ formatCurrency(posService.cart().total_subtotal) }}</strong>
        </div>
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
      </div>
          </div>
        } @else {
          <div class="pos-cart__panel pos-cart__panel--payment">
            @if (posService.cart().grand_total > 0) {
              <div class="pos-pay__banner">
                <span>Total a cobrar</span>
                <strong>{{ formatCurrency(posService.cart().grand_total) }}</strong>
              </div>
            }
      <div class="pos-customer">
        <button
          type="button"
          class="pos-customer__toggle"
          [class.pos-customer__toggle--selected]="!!selectedCustomer()"
          (click)="openCustomerPicker()">
          <div class="pos-customer__toggle-left">
            <span class="pos-customer__avatar" [class.pos-customer__avatar--filled]="!!selectedCustomer()">
              @if (selectedCustomer(); as customer) {
                {{ customerInitials(customer) }}
              } @else {
                <lucide-icon [img]="User" class="pos-ic pos-ic--sm" />
              }
            </span>
            <div class="pos-customer__toggle-text">
              <span class="pos-customer__label">Cliente existente</span>
              @if (selectedCustomer(); as customer) {
                <span class="pos-customer__name">{{ customerDisplayName(customer) }}</span>
              } @else {
                <span class="pos-customer__hint">Mostrador \xB7 toca para elegir cliente</span>
              }
            </div>
          </div>
          <div class="pos-customer__toggle-right">
            @if (selectedCustomer()) {
              <button
                type="button"
                class="pos-customer__clear"
                (click)="clearCustomer(); $event.stopPropagation()"
                title="Quitar cliente">
                <lucide-icon [img]="X" class="pos-ic pos-ic--xs" />
              </button>
            }
            <lucide-icon [img]="ChevronRight" class="pos-ic pos-ic--sm pos-customer__chevron" />
          </div>
        </button>
      </div>

      <div class="pos-pay">
        <h3 class="pos-pay__title">M\xE9todo de pago</h3>
        <div class="pos-pay__methods">
          <button
            type="button"
            class="pos-pay__method"
            [class.pos-pay__method--on]="paymentMethod() === 'cash'"
            (click)="setPaymentMethod('cash')">
            <lucide-icon [img]="Banknote" class="pos-ic" />
            Efectivo
          </button>
          <button
            type="button"
            class="pos-pay__method"
            [class.pos-pay__method--on]="paymentMethod() === 'card'"
            (click)="setPaymentMethod('card')">
            <lucide-icon [img]="CreditCard" class="pos-ic" />
            Tarjeta
          </button>
          <button
            type="button"
            class="pos-pay__method"
            [class.pos-pay__method--on]="paymentMethod() === 'credit'"
            (click)="setPaymentMethod('credit')">
            <lucide-icon [img]="FileText" class="pos-ic" />
            Cr\xE9dito
          </button>
        </div>

        @if (paymentMethod() === 'cash') {
          <div class="pos-cash">
            <label class="pos-cash__field">
              <span>Cantidad recibida</span>
              <input
                type="number"
                [ngModel]="amountPaid"
                (ngModelChange)="onAmountPaidChange($event)"
                min="0"
                step="0.01"
              />
            </label>
            <div class="pos-cash__change">
              <span>Cambio</span>
              <output>{{ formatCurrency(calculateChange()) }}</output>
            </div>
            @if (!isPaymentValid() && posService.cart().grand_total > 0) {
              <p class="pos-cash__warn">Monto insuficiente para el total</p>
            }
          </div>
        }
        @if (paymentMethod() === 'credit' && !selectedCustomerId()) {
          <p class="pos-cash__warn">Selecciona un cliente existente para venta a cr\xE9dito</p>
        }
      </div>
          </div>
        }
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
            !sessionOk() ||
            posService.cart().items.length === 0 ||
            !isPaymentValid() ||
            (paymentMethod() === 'credit' && !selectedCustomerId())
          ">
          {{ saving() ? 'Guardando\u2026' : 'Guardar orden' }}
        </button>
      </div>
    </aside>
  </div>
</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/features/pos/pages/take-order/take-order.component.scss */\n:host {\n  --pos-bg: #0f172a;\n  --pos-surface: #ffffff;\n  --pos-muted: #64748b;\n  --pos-border: #e5e7eb;\n  --pos-accent: #6366f1;\n  --pos-accent2: #8b5cf6;\n  --pos-success: #10b981;\n  --pos-warn: #f59e0b;\n  --pos-radius: 12px;\n  --pos-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.12);\n  --pos-panel-x: 1.25rem;\n  --pos-panel-y: 1rem;\n  --pos-panel-head-h: 52px;\n  display: block;\n  min-height: 100%;\n}\n.pos-take-root {\n  height: calc(100vh - 0px);\n  display: flex;\n  flex-direction: column;\n  background: #f1f5f9;\n  padding: 0.65rem 0.75rem 0;\n  box-sizing: border-box;\n  overflow: hidden;\n}\n.pos-take-root--fullscreen {\n  width: 100vw;\n  height: 100vh;\n  padding: 0.55rem 0.65rem 0;\n}\n.pos-session-bar {\n  width: 100%;\n  background:\n    linear-gradient(\n      105deg,\n      #0f172a 0%,\n      #1e1b4b 45%,\n      #312e81 100%);\n  color: #f8fafc;\n  padding: 0.4rem clamp(0.75rem, 2vw, 1.25rem);\n  box-shadow: 0 2px 16px rgba(15, 23, 42, 0.28);\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  border-radius: 10px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n}\n.pos-session-bar__content {\n  max-width: 1680px;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.45rem 0.85rem;\n  justify-content: space-between;\n  min-height: 40px;\n}\n.pos-session-bar__left {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem 1.35rem;\n  padding-left: 0.15rem;\n}\n.pos-session-bar__title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  letter-spacing: -0.02em;\n}\n.pos-session-bar__title-icon {\n  flex-shrink: 0;\n  width: 18px;\n  height: 18px;\n  opacity: 0.95;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-session-bar__center {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem 0.75rem;\n  min-width: 200px;\n}\n.pos-session-bar__checking {\n  font-size: 0.85rem;\n  opacity: 0.85;\n}\n.pos-session-meta {\n  font-size: 0.75rem;\n  opacity: 0.75;\n}\n.pos-session-bar__right {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.pos-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.28rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  line-height: 1.2;\n  max-width: 100%;\n}\n.pos-pill--ok {\n  background: rgba(16, 185, 129, 0.2);\n  color: #a7f3d0;\n  border: 1px solid rgba(16, 185, 129, 0.35);\n}\n.pos-pill--warn {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fde68a;\n  border: 1px solid rgba(245, 158, 11, 0.35);\n}\n.pos-terminal-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: rgba(99, 102, 241, 0.35);\n  padding: 0.28rem 0.65rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  border: 1px solid rgba(165, 180, 252, 0.35);\n  line-height: 1.2;\n}\n.pos-session-bar .pos-btn {\n  padding: 0.32rem 0.65rem;\n  font-size: 0.72rem;\n  border-radius: 8px;\n  gap: 0.35rem;\n}\n.pos-session-bar .pos-btn--icon {\n  width: 30px;\n  height: 30px;\n  padding: 0;\n}\n.pos-terminal-chip__label {\n  white-space: nowrap;\n}\n.pos-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  border: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s;\n  line-height: 1.2;\n}\n.pos-btn--primary {\n  background: #fff;\n  color: #312e81;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);\n  padding: 0.38rem 0.75rem;\n  font-size: 0.78rem;\n}\n.pos-btn--primary:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);\n}\n.pos-btn--ghost {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fecaca;\n  border: 1px solid rgba(248, 113, 113, 0.35);\n}\n.pos-btn--ghost:hover {\n  background: rgba(248, 113, 113, 0.2);\n}\n.pos-btn--icon {\n  width: 36px;\n  height: 36px;\n  padding: 0;\n}\n.pos-btn--muted {\n  background: #fff;\n  color: #64748b;\n  border: 1px solid var(--pos-border);\n}\n.pos-btn--accent {\n  background:\n    linear-gradient(\n      135deg,\n      var(--pos-accent),\n      var(--pos-accent2));\n  color: #fff;\n  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);\n}\n.pos-btn--accent:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.pos-btn--lg {\n  padding: 0.65rem 1.25rem;\n  font-size: 0.9rem;\n}\n.pos-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.pos-ic {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-ic--sm {\n  width: 17px;\n  height: 17px;\n}\n.pos-ic--xs {\n  width: 14px;\n  height: 14px;\n}\n.pos-ic--btn {\n  width: 17px;\n  height: 17px;\n}\n.pos-take-body {\n  flex: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(400px, 460px);\n  gap: 0.75rem;\n  min-height: 0;\n  position: relative;\n  margin-top: 0.65rem;\n  padding-bottom: 0.65rem;\n  overflow: hidden;\n}\n.pos-take-body--locked .pos-catalog,\n.pos-take-body--locked .pos-cart {\n  filter: saturate(0.65);\n  opacity: 0.55;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.pos-lock-overlay {\n  position: absolute;\n  inset: 0;\n  z-index: 15;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: auto;\n  padding: 2rem;\n  background: rgba(248, 250, 252, 0.35);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.pos-lock-card {\n  pointer-events: auto;\n  background: var(--pos-surface);\n  border-radius: var(--pos-radius);\n  padding: 2rem 2rem 2.25rem;\n  max-width: 400px;\n  width: 100%;\n  box-shadow: var(--pos-shadow);\n  border: 1px solid var(--pos-border);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.pos-lock-card h3 {\n  margin: 0 0 0.5rem;\n  font-size: 1.2rem;\n  color: #0f172a;\n  width: 100%;\n}\n.pos-lock-card p {\n  margin: 0 0 1.35rem;\n  font-size: 0.9rem;\n  color: var(--pos-muted);\n  line-height: 1.45;\n  max-width: 28ch;\n}\n.pos-lock-card .pos-btn {\n  min-width: 11rem;\n}\n.pos-lock-card__icon {\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  width: 52px !important;\n  height: 52px !important;\n  margin: 0 0 1.1rem;\n  color: var(--pos-accent);\n  line-height: 0;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      145deg,\n      #eef2ff,\n      #e0e7ff);\n  padding: 10px;\n  box-sizing: border-box;\n}\n.pos-catalog {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.pos-catalog__toolbar {\n  height: var(--pos-panel-head-h);\n  min-height: var(--pos-panel-head-h);\n  max-height: var(--pos-panel-head-h);\n  padding: 0 var(--pos-panel-x);\n  box-sizing: border-box;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  background: var(--pos-surface);\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-search {\n  flex: 1;\n  min-width: 0;\n  max-width: 520px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: #f1f5f9;\n  border-radius: 8px;\n  padding: 0 0.75rem;\n  border: 1px solid transparent;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.pos-search:focus-within {\n  border-color: #c7d2fe;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n  background: #fff;\n}\n.pos-search__icon {\n  width: 16px;\n  height: 16px;\n  color: var(--pos-muted);\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  line-height: 0;\n}\n.pos-search__input {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-search__input:focus {\n  outline: none;\n}\n.pos-search__input::placeholder {\n  color: #94a3b8;\n}\n.pos-catalog__hint {\n  margin: 0;\n  flex-shrink: 0;\n  font-size: 0.75rem;\n  color: var(--pos-muted);\n  font-weight: 500;\n  white-space: nowrap;\n}\n.pos-product-grid {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--pos-panel-x);\n  background: #f8fafc;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));\n  gap: 0.85rem;\n  align-content: start;\n}\n.pos-card {\n  background: var(--pos-surface);\n  border-radius: 10px;\n  border: 1px solid var(--pos-border);\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  transition:\n    box-shadow 0.18s ease,\n    border-color 0.18s,\n    transform 0.18s ease;\n}\n.pos-card:hover:not(.pos-card--disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px -6px rgba(79, 70, 229, 0.18);\n  border-color: #c7d2fe;\n}\n.pos-card--disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  filter: grayscale(0.15);\n}\n.pos-card__media {\n  position: relative;\n  aspect-ratio: 4/3;\n  background: #f1f5f9;\n}\n.pos-card__media img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.pos-card__media-loading {\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.65);\n  animation: pos-pulse 1.2s ease-in-out infinite;\n}\n.pos-card__media-placeholder {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  color: #94a3b8;\n  font-size: 0.72rem;\n  font-weight: 600;\n}\n.pos-card__media-placeholder-icon {\n  width: 26px;\n  height: 26px;\n  opacity: 0.7;\n}\n@keyframes pos-pulse {\n  50% {\n    opacity: 0.5;\n  }\n}\n.pos-card__body {\n  padding: 0.75rem 0.85rem 0.5rem;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.pos-card__head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.pos-card__name {\n  margin: 0;\n  flex: 1;\n  min-width: 0;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.35;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-card__meta {\n  margin: 0;\n  font-size: 0.6875rem;\n  color: #6b7280;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.25rem;\n}\n.pos-card__meta span:first-child {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  font-size: 0.65rem;\n  color: #9ca3af;\n}\n.pos-card__meta-dot {\n  color: #d1d5db;\n}\n.pos-card__price {\n  flex-shrink: 0;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #4f46e5;\n  letter-spacing: -0.02em;\n  line-height: 1.2;\n}\n.pos-card__no-price {\n  flex-shrink: 0;\n  font-size: 0.6875rem;\n  color: #dc2626;\n  font-weight: 600;\n}\n.pos-card__add {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  margin: 0 0.65rem 0.65rem;\n  width: calc(100% - 1.3rem);\n  border: none;\n  padding: 0.5rem 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  border-radius: 8px;\n  cursor: pointer;\n  background: #4f46e5;\n  color: #fff;\n  transition:\n    background 0.15s,\n    box-shadow 0.15s,\n    transform 0.12s;\n}\n.pos-card__add:hover:not(:disabled) {\n  background: #4338ca;\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);\n}\n.pos-card__add:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.pos-card__add:disabled {\n  background: #e5e7eb;\n  color: #9ca3af;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.pos-empty-grid,\n.pos-loading-grid {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 3rem 1rem;\n  color: var(--pos-muted);\n}\n.pos-empty-grid__icon {\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.75rem;\n  opacity: 0.45;\n}\n.pos-spinner {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--pos-accent);\n  border-radius: 50%;\n  margin: 0 auto 1rem;\n  animation: pos-spin 0.75s linear infinite;\n}\n@keyframes pos-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pos-cart {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: var(--pos-radius);\n  box-shadow: var(--pos-shadow);\n  overflow: hidden;\n}\n.pos-cart__head {\n  height: var(--pos-panel-head-h);\n  min-height: var(--pos-panel-head-h);\n  max-height: var(--pos-panel-head-h);\n  padding: 0 var(--pos-panel-x);\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-cart__head-title {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n}\n.pos-cart__head-title h2 {\n  margin: 0;\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-cart__tabs {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0;\n  flex-shrink: 0;\n  padding: 0 var(--pos-panel-x);\n  border-bottom: 1px solid var(--pos-border);\n  background: var(--pos-surface);\n}\n.pos-cart__tab {\n  position: relative;\n  border: none;\n  background: transparent;\n  padding: 0.55rem 0.35rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  cursor: pointer;\n  transition: color 0.15s, background 0.15s;\n  text-align: center;\n}\n.pos-cart__tab::after {\n  content: "";\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -1px;\n  height: 2px;\n  background: transparent;\n  transition: background 0.15s;\n}\n.pos-cart__tab:hover {\n  color: #374151;\n  background: #f9fafb;\n}\n.pos-cart__tab--active {\n  color: #4f46e5;\n}\n.pos-cart__tab--active::after {\n  background: #4f46e5;\n}\n.pos-cart__body {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.pos-cart__panel {\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.pos-cart__panel--products {\n  background: #f8fafc;\n}\n.pos-cart__panel--payment {\n  overflow-y: auto;\n  background: var(--pos-surface);\n  padding-bottom: 0.25rem;\n}\n.pos-cart__lines {\n  flex: 1;\n  overflow-y: auto;\n  padding: var(--pos-panel-x);\n  min-height: 0;\n  background: #f8fafc;\n}\n.pos-cart__lines--empty {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.pos-line {\n  background: var(--pos-surface);\n  border: 1px solid var(--pos-border);\n  border-radius: 8px;\n  padding: 0.6rem 0.7rem;\n  margin-bottom: 0.5rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-line:last-child {\n  margin-bottom: 0;\n}\n.pos-line__top {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4rem;\n}\n.pos-line__info {\n  min-width: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.pos-line__name {\n  margin: 0;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-line__meta {\n  margin: 0;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.2rem 0.3rem;\n  font-size: 0.6875rem;\n  line-height: 1.3;\n}\n.pos-line__sku {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    monospace;\n  color: #9ca3af;\n}\n.pos-line__meta-sep {\n  color: #d1d5db;\n}\n.pos-line__unit {\n  color: #4f46e5;\n  font-weight: 500;\n}\n.pos-line__pricing-select {\n  width: 100%;\n  box-sizing: border-box;\n  height: 28px;\n  border: 1px solid var(--pos-border);\n  border-radius: 6px;\n  padding: 0 0.45rem;\n  font-size: 0.6875rem;\n  color: #374151;\n  background: #f9fafb;\n  cursor: pointer;\n  transition: border-color 0.15s, background 0.15s;\n}\n.pos-line__pricing-select:focus {\n  outline: none;\n  border-color: #6366f1;\n  background: #fff;\n  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.12);\n}\n.pos-line__remove {\n  border: none;\n  background: transparent;\n  color: #9ca3af;\n  width: 26px;\n  height: 26px;\n  margin-top: -0.1rem;\n  border-radius: 6px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: background 0.15s, color 0.15s;\n}\n.pos-line__remove:hover {\n  background: #fef2f2;\n  color: #dc2626;\n}\n.pos-line__bottom {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.pos-qty {\n  display: inline-flex;\n  align-items: stretch;\n  height: 30px;\n  border: 1px solid var(--pos-border);\n  border-radius: 6px;\n  overflow: hidden;\n  background: #fff;\n  flex-shrink: 0;\n}\n.pos-qty__btn {\n  width: 30px;\n  border: none;\n  background: #fff;\n  color: #374151;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.12s, color 0.12s;\n}\n.pos-qty__btn:first-child {\n  border-right: 1px solid var(--pos-border);\n}\n.pos-qty__btn:last-child {\n  border-left: 1px solid var(--pos-border);\n}\n.pos-qty__btn:hover {\n  background: #f9fafb;\n  color: #4f46e5;\n}\n.pos-qty__btn:active {\n  background: #f3f4f6;\n}\n.pos-qty__input {\n  width: 36px;\n  text-align: center;\n  border: none;\n  font-weight: 600;\n  font-size: 0.8125rem;\n  color: #111827;\n  background: #fff;\n  -moz-appearance: textfield;\n  appearance: textfield;\n}\n.pos-qty__input::-webkit-outer-spin-button,\n.pos-qty__input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.pos-qty__input:focus {\n  outline: none;\n  background: #fafafa;\n}\n.pos-line__total {\n  font-weight: 700;\n  font-size: 0.9375rem;\n  color: #111827;\n  letter-spacing: -0.02em;\n  line-height: 1;\n  flex-shrink: 0;\n}\n.pos-cart-empty {\n  text-align: center;\n  padding: 1.2rem 1rem;\n  color: var(--pos-muted);\n  width: 100%;\n}\n.pos-cart-empty p {\n  margin: 0.5rem 0 0.15rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.pos-cart-empty span {\n  font-size: 0.8rem;\n}\n.pos-cart-empty__icon {\n  width: 56px;\n  height: 56px;\n  opacity: 0.35;\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto;\n}\n.pos-cart__summary {\n  flex-shrink: 0;\n  padding: var(--pos-panel-y) var(--pos-panel-x);\n  border-top: 1px solid var(--pos-border);\n  background: #fff;\n}\n.pos-sum-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: var(--pos-muted);\n  margin-bottom: 0.35rem;\n}\n.pos-sum-row strong {\n  color: #334155;\n  font-weight: 600;\n}\n.pos-sum-row--total {\n  margin-top: 0.5rem;\n  padding-top: 0.65rem;\n  border-top: 1px solid var(--pos-border);\n  font-size: 1rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.pos-sum-row--total strong {\n  font-size: 1.15rem;\n  color: var(--pos-accent);\n}\n.pos-customer {\n  padding: var(--pos-panel-y) var(--pos-panel-x) 0.65rem;\n  flex-shrink: 0;\n  background: var(--pos-surface);\n}\n.pos-customer__toggle {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.65rem;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  background: #fff;\n  cursor: pointer;\n  transition:\n    border-color 0.15s,\n    box-shadow 0.15s,\n    background 0.15s;\n  text-align: left;\n}\n.pos-customer__toggle:hover {\n  border-color: #c7d2fe;\n  background: #fafbff;\n}\n.pos-customer__toggle--selected {\n  border-color: #818cf8;\n  background:\n    linear-gradient(\n      180deg,\n      #faf5ff 0%,\n      #eef2ff 100%);\n}\n.pos-customer__toggle-left {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  min-width: 0;\n  flex: 1;\n}\n.pos-customer__toggle-right {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  flex-shrink: 0;\n}\n.pos-customer__toggle-text {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n.pos-customer__avatar {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 999px;\n  background: #f1f5f9;\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.72rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.pos-customer__avatar--filled {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  color: #fff;\n}\n.pos-customer__label {\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--pos-muted);\n}\n.pos-customer__name {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #1e293b;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.pos-customer__hint {\n  font-size: 0.75rem;\n  color: #94a3b8;\n}\n.pos-customer__chevron {\n  color: #94a3b8;\n}\n.pos-customer__clear {\n  width: 1.5rem;\n  height: 1.5rem;\n  border: none;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.06);\n  color: #64748b;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n}\n.pos-customer__clear:hover {\n  background: rgba(220, 38, 38, 0.1);\n  color: #dc2626;\n}\n.pos-pay__banner {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin: var(--pos-panel-y) var(--pos-panel-x) 0;\n  padding: 0.65rem 0.85rem;\n  border-radius: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      #eef2ff 0%,\n      #f5f3ff 100%);\n  border: 1px solid #e0e7ff;\n}\n.pos-pay__banner span {\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #6b7280;\n}\n.pos-pay__banner strong {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #4f46e5;\n  letter-spacing: -0.02em;\n}\n.pos-pay {\n  padding: 0 var(--pos-panel-x) 1rem;\n  background: var(--pos-surface);\n}\n.pos-pay__title {\n  margin: 0 0 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--pos-muted);\n}\n.pos-pay__methods {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.45rem;\n}\n.pos-pay__method {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.55rem 0.35rem;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n  background: #fff;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.pos-pay__method--on {\n  border-color: var(--pos-accent);\n  background:\n    linear-gradient(\n      180deg,\n      #eef2ff 0%,\n      #e0e7ff 100%);\n  color: #4338ca;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);\n}\n.pos-pay__method:hover {\n  border-color: #c7d2fe;\n}\n.pos-cash {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-credit {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-credit select {\n  width: 100%;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.9rem;\n  color: #334155;\n  background: #fff;\n}\n.pos-cash__field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  margin-bottom: 0.65rem;\n}\n.pos-cash__field span {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__field input {\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.pos-cash__change {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__change output {\n  font-size: 1rem;\n  color: var(--pos-success);\n  font-weight: 700;\n}\n.pos-cash__warn {\n  margin: 0.5rem 0 0;\n  font-size: 0.75rem;\n  color: #b45309;\n  font-weight: 600;\n}\n.pos-cart__actions {\n  display: flex;\n  gap: 0.6rem;\n  flex-shrink: 0;\n  padding: 0.85rem var(--pos-panel-x) var(--pos-panel-x);\n  border-top: 1px solid var(--pos-border);\n  background: var(--pos-surface);\n}\n.pos-cart__actions .pos-btn {\n  flex: 1;\n  justify-content: center;\n  padding: 0.75rem;\n  font-size: 0.88rem;\n}\n.pos-session-bar lucide-icon svg,\n.pos-pill lucide-icon svg,\n.pos-terminal-chip lucide-icon svg,\n.pos-btn lucide-icon svg,\n.pos-lock-card__icon svg,\n.pos-search lucide-icon svg,\n.pos-card__add lucide-icon svg,\n.pos-cart-empty__icon svg {\n  width: 100%;\n  height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n  display: block;\n  flex-shrink: 0;\n}\n@media (max-width: 1024px) {\n  .pos-take-body {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(280px, 55vh) auto;\n  }\n  .pos-catalog {\n    border-right: none;\n    border-bottom: 1px solid var(--pos-border);\n  }\n  .pos-session-bar__content {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .pos-session-bar__center {\n    justify-content: flex-start;\n  }\n  .pos-session-bar__right {\n    justify-content: flex-start;\n  }\n}\n/*# sourceMappingURL=take-order.component.css.map */\n'] }]
  }], () => [{ type: POSService }, { type: WarehouseService }, { type: CustomerService }, { type: Router }, { type: ToastService }, { type: MatDialog }], { posRootRef: [{
    type: ViewChild,
    args: ["posRoot"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TakeOrderComponent, { className: "TakeOrderComponent", filePath: "src/app/features/pos/pages/take-order/take-order.component.ts", lineNumber: 54 });
})();
export {
  TakeOrderComponent
};
//# sourceMappingURL=chunk-Q4YA75U3.js.map
