import {
  WarehouseService,
  getErrorMessage,
  validatePrice,
  validateQuantity,
  validateTaxPercentage
} from "./chunk-J6XOF63F.js";
import {
  PurchaseOrderService
} from "./chunk-YKFNHCNP.js";
import {
  TaxCalculatorService
} from "./chunk-Q6XV4LBU.js";
import {
  VendorService
} from "./chunk-EHKCKUPD.js";
import {
  FiscalConfigurationService
} from "./chunk-CEL5SWQJ.js";
import {
  DefaultValueAccessor,
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-EF42XV6X.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-524KR27D.js";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-MNFUR22A.js";
import {
  Component,
  distinctUntilChanged,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-CJAGDKD4.js";

// src/app/features/purchase-orders/pages/purchase-order-form/purchase-order-form.component.ts
function PurchaseOrderFormComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 5);
    \u0275\u0275listener("click", function PurchaseOrderFormComponent_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPurchaseOrderList());
    });
    \u0275\u0275text(4, " Volver al listado ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.loadError());
  }
}
function PurchaseOrderFormComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "p");
    \u0275\u0275text(2, "Cargando orden\u2026");
    \u0275\u0275elementEnd()();
  }
}
function PurchaseOrderFormComponent_Conditional_6_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const fc_r4 = ctx.$implicit;
    \u0275\u0275property("value", fc_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", fc_r4.razon_social || fc_r4.rfc || fc_r4.id, " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("fiscal_configuration_id"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_option_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r5 = ctx.$implicit;
    \u0275\u0275property("value", vendor_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vendor_r5.name, " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_span_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("vendor_id"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_option_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r6 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", warehouse_r6.name, " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("warehouse_id"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_span_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("purpose"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_span_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("tentative_receipt_date"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_p_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, " Selecciona un ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "proveedor");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " arriba: los productos y UOM de cada l\xEDnea son los del cat\xE1logo de ese proveedor (igual que al crear la OC). ");
    \u0275\u0275elementEnd();
  }
}
function PurchaseOrderFormComponent_Conditional_6_p_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 45);
    \u0275\u0275text(1, " Al guardar se env\xEDa la orden con el mismo esquema que al crear: cabecera + todas las l\xEDneas (reemplazo total). El costo unitario se env\xEDa como unit_total; los totales de cabecera los calcula el servidor. ");
    \u0275\u0275elementEnd();
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_option_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275property("value", p_r9.product_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", p_r9.product_name, "", p_r9.sku ? " (" + p_r9.sku + ")" : "", " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r8 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r8, "product_id"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r10 = ctx.$implicit;
    \u0275\u0275property("value", uom_r10.uom_id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", uom_r10.uom_name, " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r8 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r8, "uom_id"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r8 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r8, "quantity"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_span_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r8 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r8, "unit_price"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_span_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r8 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r8, "iva_percentage"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_span_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r8 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r8, "ieps_percentage"), " ");
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "div", 47)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 48);
    \u0275\u0275listener("click", function PurchaseOrderFormComponent_Conditional_6_div_60_Template_button_click_4_listener() {
      const i_r8 = \u0275\u0275restoreView(_r7).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeLineItem(i_r8));
    });
    \u0275\u0275text(5, "Eliminar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 49)(7, "div", 15)(8, "label");
    \u0275\u0275text(9, "Producto *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 50);
    \u0275\u0275listener("change", function PurchaseOrderFormComponent_Conditional_6_div_60_Template_select_change_10_listener($event) {
      const i_r8 = \u0275\u0275restoreView(_r7).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onProductSelect(i_r8, $event.target.value));
    });
    \u0275\u0275elementStart(11, "option", 12);
    \u0275\u0275text(12, "Selecciona un producto");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, PurchaseOrderFormComponent_Conditional_6_div_60_option_13_Template, 2, 3, "option", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, PurchaseOrderFormComponent_Conditional_6_div_60_span_14_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 15)(16, "label");
    \u0275\u0275text(17, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "select", 51);
    \u0275\u0275listener("change", function PurchaseOrderFormComponent_Conditional_6_div_60_Template_select_change_18_listener($event) {
      const i_r8 = \u0275\u0275restoreView(_r7).index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onVendorUomChange(i_r8, $event.target.value));
    });
    \u0275\u0275elementStart(19, "option", 12);
    \u0275\u0275text(20, "Selecciona UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, PurchaseOrderFormComponent_Conditional_6_div_60_option_21_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, PurchaseOrderFormComponent_Conditional_6_div_60_span_22_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 15)(24, "label");
    \u0275\u0275text(25, "Cantidad *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 52);
    \u0275\u0275template(27, PurchaseOrderFormComponent_Conditional_6_div_60_span_27_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 15)(29, "label");
    \u0275\u0275text(30, "Costo unitario *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 53);
    \u0275\u0275template(32, PurchaseOrderFormComponent_Conditional_6_div_60_span_32_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 15)(34, "label");
    \u0275\u0275text(35, "IVA % *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 54);
    \u0275\u0275template(37, PurchaseOrderFormComponent_Conditional_6_div_60_span_37_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 15)(39, "label");
    \u0275\u0275text(40, "IEPS % *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(41, "input", 55);
    \u0275\u0275template(42, PurchaseOrderFormComponent_Conditional_6_div_60_span_42_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 56)(44, "div", 57)(45, "span");
    \u0275\u0275text(46, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "strong");
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 57)(50, "span");
    \u0275\u0275text(51, "IVA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "strong");
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 57)(55, "span");
    \u0275\u0275text(56, "IEPS:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "strong");
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 58)(60, "span");
    \u0275\u0275text(61, "Total L\xEDnea:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "strong");
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const i_r8 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroupName", i_r8);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Producto ", i_r8 + 1);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.vendorProducts());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r8, "product_id"));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.getVendorLineUoms(i_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r8, "uom_id"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r8, "quantity"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r8, "unit_price"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r8, "iva_percentage"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r8, "ieps_percentage"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.getLineCalculations(i_r8).subtotal));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.getLineCalculations(i_r8).iva_amount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.getLineCalculations(i_r8).ieps_amount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.getLineCalculations(i_r8).line_total));
  }
}
function PurchaseOrderFormComponent_Conditional_6_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "p");
    \u0275\u0275text(2, "No hay productos agregados. Haz clic en \xABAgregar producto\xBB para comenzar.");
    \u0275\u0275elementEnd()();
  }
}
function PurchaseOrderFormComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 6);
    \u0275\u0275listener("ngSubmit", function PurchaseOrderFormComponent_Conditional_6_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(1, "div", 7)(2, "h2");
    \u0275\u0275text(3, "Informaci\xF3n General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "div", 9)(6, "label", 10);
    \u0275\u0275text(7, "Configuraci\xF3n fiscal *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "select", 11)(9, "option", 12);
    \u0275\u0275text(10, "Selecciona una configuraci\xF3n fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, PurchaseOrderFormComponent_Conditional_6_option_11_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, PurchaseOrderFormComponent_Conditional_6_span_12_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 15)(14, "label", 16);
    \u0275\u0275text(15, "Proveedor *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "select", 17)(17, "option", 12);
    \u0275\u0275text(18, "Selecciona un proveedor");
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, PurchaseOrderFormComponent_Conditional_6_option_19_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, PurchaseOrderFormComponent_Conditional_6_span_20_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 15)(22, "label", 18);
    \u0275\u0275text(23, "Almac\xE9n *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "select", 19)(25, "option", 12);
    \u0275\u0275text(26, "Selecciona un almac\xE9n");
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, PurchaseOrderFormComponent_Conditional_6_option_27_Template, 2, 2, "option", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, PurchaseOrderFormComponent_Conditional_6_span_28_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 15)(30, "label", 20);
    \u0275\u0275text(31, "Estado de pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "select", 21)(33, "option", 22);
    \u0275\u0275text(34, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 23);
    \u0275\u0275text(36, "Pagado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 24);
    \u0275\u0275text(38, "Parcial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "option", 25);
    \u0275\u0275text(40, "No pagado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "div", 9)(42, "label", 26);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275element(44, "textarea", 27);
    \u0275\u0275template(45, PurchaseOrderFormComponent_Conditional_6_span_45_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "div", 15)(47, "label", 28);
    \u0275\u0275text(48, "Fecha Estimada de Recepci\xF3n *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(49, "input", 29);
    \u0275\u0275template(50, PurchaseOrderFormComponent_Conditional_6_span_50_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(51, "div", 7)(52, "div", 30)(53, "h2");
    \u0275\u0275text(54, "L\xEDneas de Productos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "button", 31);
    \u0275\u0275listener("click", function PurchaseOrderFormComponent_Conditional_6_Template_button_click_55_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addLineItem());
    });
    \u0275\u0275text(56, " + Agregar producto ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(57, PurchaseOrderFormComponent_Conditional_6_p_57_Template, 5, 0, "p", 32)(58, PurchaseOrderFormComponent_Conditional_6_p_58_Template, 2, 0, "p", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "div", 33);
    \u0275\u0275template(60, PurchaseOrderFormComponent_Conditional_6_div_60_Template, 64, 14, "div", 34)(61, PurchaseOrderFormComponent_Conditional_6_div_61_Template, 3, 0, "div", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div", 36)(63, "h2");
    \u0275\u0275text(64, "Totales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 37)(66, "div", 38)(67, "span");
    \u0275\u0275text(68, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "strong");
    \u0275\u0275text(70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(71, "div", 38)(72, "span");
    \u0275\u0275text(73, "Total IVA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "strong");
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 38)(77, "span");
    \u0275\u0275text(78, "Total IEPS:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "strong");
    \u0275\u0275text(80);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(81, "div", 39)(82, "span");
    \u0275\u0275text(83, "Gran Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "strong");
    \u0275\u0275text(85);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(86, "div", 40)(87, "button", 41);
    \u0275\u0275listener("click", function PurchaseOrderFormComponent_Conditional_6_Template_button_click_87_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancel());
    });
    \u0275\u0275text(88, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "button", 42);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.orderForm);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", ctx_r1.fiscalConfigurations());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getFieldError("fiscal_configuration_id"));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.vendors());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getFieldError("vendor_id"));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.warehouses());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getFieldError("warehouse_id"));
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate1("Notas / prop\xF3sito", ctx_r1.isEditMode() ? "" : " *");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.getFieldError("purpose"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getFieldError("tentative_receipt_date"));
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.hasVendorSelected());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.hasVendorSelected());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.hasVendorSelected());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.lineItems.controls);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.lineItems.length === 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totalCalculations().total_subtotal));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totalCalculations().total_iva));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totalCalculations().total_ieps));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totalCalculations().grand_total));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.orderForm.invalid || ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : ctx_r1.isEditMode() ? "Actualizar" : "Crear", " Orden ");
  }
}
var PurchaseOrderFormComponent = class _PurchaseOrderFormComponent {
  fb;
  route;
  router;
  purchaseOrderService;
  taxCalculator;
  vendorService;
  warehouseService;
  fiscalConfigurationService;
  /** En edición queda null hasta que termina la carga; el template no debe enlazar el formulario antes. */
  orderForm = null;
  isEditMode = signal(false, ...ngDevMode ? [{ debugName: "isEditMode" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  loadError = signal(null, ...ngDevMode ? [{ debugName: "loadError" }] : []);
  /** Folio de la OC cargada: el listado busca por folio, no por UUID. */
  loadedOrderFolio = signal(null, ...ngDevMode ? [{ debugName: "loadedOrderFolio" }] : []);
  vendors = signal([], ...ngDevMode ? [{ debugName: "vendors" }] : []);
  fiscalConfigurations = signal([], ...ngDevMode ? [{ debugName: "fiscalConfigurations" }] : []);
  /** Productos del proveedor seleccionado (misma API que el modal de creación OC). */
  vendorProducts = signal([], ...ngDevMode ? [{ debugName: "vendorProducts" }] : []);
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  totalCalculations = signal({
    total_subtotal: 0,
    total_iva: 0,
    total_ieps: 0,
    grand_total: 0
  }, ...ngDevMode ? [{ debugName: "totalCalculations" }] : []);
  lineItemsValueSub;
  vendorIdSub;
  get lineItems() {
    if (!this.orderForm) {
      return this.fb.array([]);
    }
    return this.orderForm.get("line_items");
  }
  constructor(fb, route, router, purchaseOrderService, taxCalculator, vendorService, warehouseService, fiscalConfigurationService) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.purchaseOrderService = purchaseOrderService;
    this.taxCalculator = taxCalculator;
    this.vendorService = vendorService;
    this.warehouseService = warehouseService;
    this.fiscalConfigurationService = fiscalConfigurationService;
  }
  ngOnInit() {
    this.loadDropdownData();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode.set(true);
      this.loadOrder(id);
    } else {
      this.initForm();
    }
  }
  ngOnDestroy() {
    this.lineItemsValueSub?.unsubscribe();
    this.vendorIdSub?.unsubscribe();
  }
  initForm(order) {
    this.lineItemsValueSub?.unsubscribe();
    const fiscalId = order?.fiscal_configuration_id ?? order?.fiscal_configuration?.id ?? "";
    this.orderForm = this.fb.group({
      fiscal_configuration_id: [fiscalId, Validators.required],
      vendor_id: [order?.vendor_id || "", Validators.required],
      purpose: [order?.notes ?? order?.purpose ?? "", this.isEditMode() ? [] : [Validators.required]],
      warehouse_id: [order?.warehouse_id || "", Validators.required],
      tentative_receipt_date: [
        this.dateOnlyForInput(order?.expected_delivery_date || order?.tentative_receipt_date),
        Validators.required
      ],
      payment_status: [this.paymentStatusToForm(order?.payment_status)],
      line_items: this.fb.array([], Validators.minLength(1))
    });
    if (order?.line_items) {
      order.line_items.forEach((item) => {
        this.addLineItem(item);
      });
    }
    this.lineItemsValueSub = this.orderForm.get("line_items")?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
    this.vendorIdSub?.unsubscribe();
    const vendorCtrl = this.orderForm.get("vendor_id");
    this.vendorIdSub = vendorCtrl?.valueChanges.pipe(distinctUntilChanged()).subscribe((vid) => {
      this.loadVendorProducts(typeof vid === "string" ? vid : "");
    });
    const initialVendor = vendorCtrl?.value;
    if (initialVendor) {
      this.loadVendorProducts(initialVendor);
    } else {
      this.vendorProducts.set([]);
    }
  }
  /**
   * Catálogo del proveedor (productos y UOM por línea de negocio del proveedor).
   */
  loadVendorProducts(vendorId) {
    if (!vendorId) {
      this.vendorProducts.set([]);
      return;
    }
    this.purchaseOrderService.getVendorProducts(vendorId).subscribe({
      next: (res) => {
        let list = [];
        if (Array.isArray(res)) {
          list = res;
        } else if (res && typeof res === "object" && Array.isArray(res.data)) {
          list = res.data;
        }
        this.vendorProducts.set(list);
      },
      error: () => this.vendorProducts.set([])
    });
  }
  calculateTotals() {
    const lineItems = this.lineItems?.value;
    if (!lineItems || lineItems.length === 0) {
      this.totalCalculations.set({
        total_subtotal: 0,
        total_iva: 0,
        total_ieps: 0,
        grand_total: 0
      });
      return;
    }
    let total_subtotal = 0;
    let total_iva = 0;
    let total_ieps = 0;
    let grand_total = 0;
    lineItems.forEach((item) => {
      const calculations = this.taxCalculator.calculateLineItem(item.quantity || 0, item.unit_price || 0, item.iva_percentage || 0, item.ieps_percentage || 0);
      total_subtotal += calculations.subtotal;
      total_iva += calculations.iva_amount;
      total_ieps += calculations.ieps_amount;
      grand_total += calculations.line_total;
    });
    this.totalCalculations.set({
      total_subtotal,
      total_iva,
      total_ieps,
      grand_total
    });
  }
  loadDropdownData() {
    this.vendorService.getVendors({ limit: 200, status: "active" }).subscribe({
      next: (response) => {
        this.vendors.set(response.data || []);
      },
      error: (error) => console.error("Error loading vendors:", error)
    });
    this.fiscalConfigurationService.listFiscalConfigurations({ limit: 200 }).subscribe({
      next: (res) => {
        this.fiscalConfigurations.set(res.data || []);
      },
      error: (e) => console.error("Error loading fiscal configurations:", e)
    });
    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        const warehouseArray = Array.isArray(warehouses) ? warehouses : warehouses.data || [];
        this.warehouses.set(warehouseArray);
      },
      error: (error) => console.error("Error loading warehouses:", error)
    });
  }
  loadOrder(id) {
    this.loading.set(true);
    this.loadError.set(null);
    this.purchaseOrderService.getOrderById(id).subscribe({
      next: (order) => {
        this.loadedOrderFolio.set(order.folio?.trim() || null);
        this.initForm(order);
        if (this.orderForm) {
          this.orderForm.get("vendor_id")?.disable({ emitEvent: false });
        }
        this.calculateTotals();
        this.loading.set(false);
      },
      error: (error) => {
        this.loadError.set(error.message || "No se pudo cargar la orden");
        this.loading.set(false);
      }
    });
  }
  createLineItemFormGroup(item) {
    const unitCost = this.toNum(item?.unit_price ?? item?.unit_total);
    return this.fb.group({
      product_id: [item?.product_id || "", Validators.required],
      uom_id: [item?.uom_id || item?.product_uom_id || "", Validators.required],
      quantity: [item?.quantity ?? 1, [Validators.required, validateQuantity()]],
      unit_price: [unitCost, [Validators.required, validatePrice()]],
      iva_percentage: [item?.iva_percentage ?? 16, [Validators.required, validateTaxPercentage()]],
      ieps_percentage: [item?.ieps_percentage ?? 0, [Validators.required, validateTaxPercentage()]]
    });
  }
  addLineItem(item) {
    this.lineItems.push(this.createLineItemFormGroup(item));
  }
  removeLineItem(index) {
    this.lineItems.removeAt(index);
  }
  getVendorProduct(productId) {
    if (!productId)
      return void 0;
    return this.vendorProducts().find((p) => p.product_id === productId);
  }
  getVendorLineUoms(index) {
    const pid = this.getLineProductId(index);
    return this.getVendorProduct(pid)?.uoms ?? [];
  }
  hasVendorSelected() {
    if (!this.orderForm)
      return false;
    return !!this.orderForm.getRawValue().vendor_id;
  }
  onProductSelect(index, productId) {
    const vp = this.getVendorProduct(productId);
    if (vp?.uoms?.length) {
      const u = vp.uoms[0];
      this.lineItems.at(index).patchValue({
        uom_id: u.uom_id,
        unit_price: u.cost ?? 0,
        iva_percentage: u.iva_percentage ?? 0,
        ieps_percentage: u.ieps_percentage ?? 0
      });
    }
  }
  onVendorUomChange(index, uomId) {
    const pid = this.getLineProductId(index);
    const vp = this.getVendorProduct(pid);
    const u = vp?.uoms?.find((x) => x.uom_id === uomId);
    if (u) {
      this.lineItems.at(index).patchValue({
        unit_price: u.cost ?? 0,
        iva_percentage: u.iva_percentage ?? 0,
        ieps_percentage: u.ieps_percentage ?? 0
      });
    }
  }
  getLineCalculations(index) {
    if (!this.orderForm) {
      return { subtotal: 0, iva_amount: 0, ieps_amount: 0, line_total: 0 };
    }
    const item = this.lineItems.at(index).getRawValue();
    return this.taxCalculator.calculateLineItem(item.quantity || 0, item.unit_price || 0, item.iva_percentage || 0, item.ieps_percentage || 0);
  }
  getFieldError(fieldName) {
    if (!this.orderForm)
      return null;
    return getErrorMessage(this.orderForm.get(fieldName), fieldName);
  }
  getLineItemFieldError(index, fieldName) {
    if (!this.orderForm)
      return null;
    return getErrorMessage(this.lineItems.at(index).get(fieldName), fieldName);
  }
  save() {
    if (!this.orderForm) {
      return;
    }
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      alert("Por favor, completa todos los campos requeridos");
      return;
    }
    this.saving.set(true);
    const dto = this.buildWritePurchaseOrderDto();
    if (this.isEditMode()) {
      const id = this.route.snapshot.paramMap.get("id");
      this.purchaseOrderService.updateOrder(id, dto).subscribe({
        next: (updated) => {
          alert("Orden actualizada exitosamente");
          this.navigateToOrdersListWithSearch(updated);
          this.saving.set(false);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
          this.saving.set(false);
        }
      });
      return;
    }
    this.purchaseOrderService.createOrder(dto).subscribe({
      next: (order) => {
        alert("Orden creada exitosamente");
        this.navigateToOrdersListWithSearch(order);
      },
      error: (error) => {
        alert(`Error: ${error.message}`);
        this.saving.set(false);
      }
    });
  }
  /**
   * Misma forma que CreatePurchaseOrderDto: notes, expected_delivery_date, unit_total en líneas, etc.
   */
  buildWritePurchaseOrderDto() {
    const raw = this.orderForm.getRawValue();
    const line_items = raw.line_items.map((row) => ({
      product_id: row.product_id,
      uom_id: row.uom_id,
      quantity: this.toNum(row.quantity),
      unit_total: this.toNum(row.unit_price),
      iva_percentage: this.toNum(row.iva_percentage),
      ieps_percentage: this.toNum(row.ieps_percentage)
    }));
    const body = {
      fiscal_configuration_id: raw.fiscal_configuration_id,
      warehouse_id: raw.warehouse_id,
      vendor_id: raw.vendor_id,
      expected_delivery_date: this.dateOnlyForInput(raw.tentative_receipt_date),
      line_items
    };
    const ps = (raw.payment_status || "").trim();
    if (ps) {
      body.payment_status = this.mapPaymentStatusForApi(ps);
    }
    const notes = (raw.purpose || "").trim();
    if (notes) {
      body.notes = notes;
    }
    return body;
  }
  /** API de ejemplo usa "Pagado"; el modelo a veces trae "Pagada". */
  mapPaymentStatusForApi(v) {
    if (v === "Pagada")
      return "Pagado";
    return v;
  }
  paymentStatusToForm(ps) {
    if (!ps)
      return "Pendiente";
    if (ps === "Pagada")
      return "Pagado";
    return ps;
  }
  dateOnlyForInput(value) {
    if (!value)
      return "";
    const s = String(value).trim();
    return s.length >= 10 ? s.slice(0, 10) : s;
  }
  toNum(value) {
    if (value === null || value === void 0 || value === "") {
      return 0;
    }
    const n = typeof value === "number" ? value : parseFloat(String(value));
    return Number.isFinite(n) ? n : 0;
  }
  cancel() {
    if (confirm("\xBFDescartar cambios?")) {
      this.goToPurchaseOrderList();
    }
  }
  goToPurchaseOrderList() {
    this.router.navigate(["/purchase-orders"]);
  }
  /**
   * Vuelve al listado filtrando por folio (lo que entiende el backend en `search`), no por id.
   */
  navigateToOrdersListWithSearch(order) {
    const folioFromResponse = order && typeof order === "object" && "folio" in order ? String(order.folio || "").trim() : "";
    const term = folioFromResponse || this.loadedOrderFolio()?.trim() || "";
    void this.router.navigate(["/purchase-orders"], {
      queryParams: term ? { search: term } : {}
    });
  }
  formatCurrency(amount) {
    return this.taxCalculator.formatCurrency(amount);
  }
  getLineProductId(index) {
    if (!this.orderForm) {
      return "";
    }
    const g = this.lineItems.at(index);
    return String(g.getRawValue().product_id || "");
  }
  static \u0275fac = function PurchaseOrderFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PurchaseOrderFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(TaxCalculatorService), \u0275\u0275directiveInject(VendorService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(FiscalConfigurationService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PurchaseOrderFormComponent, selectors: [["app-purchase-order-form"]], decls: 7, vars: 2, consts: [[1, "purchase-order-form"], [1, "header"], [1, "section", "load-error"], [1, "section", "loading-state"], [3, "formGroup"], ["type", "button", 1, "btn-cancel", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "section"], [1, "form-grid"], [1, "form-field", "full-width"], ["for", "fiscal"], ["id", "fiscal", "formControlName", "fiscal_configuration_id"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "error", 4, "ngIf"], [1, "form-field"], ["for", "vendor"], ["id", "vendor", "formControlName", "vendor_id"], ["for", "warehouse"], ["id", "warehouse", "formControlName", "warehouse_id"], ["for", "payment"], ["id", "payment", "formControlName", "payment_status"], ["value", "Pendiente"], ["value", "Pagado"], ["value", "Parcial"], ["value", "No pagado"], ["for", "purpose"], ["id", "purpose", "formControlName", "purpose", "rows", "3", "placeholder", "Se guarda como notas en la orden (campo notes en API)"], ["for", "date"], ["type", "date", "id", "date", "formControlName", "tentative_receipt_date"], [1, "section-header"], ["type", "button", 1, "btn-add", 3, "click", "disabled"], ["class", "hint-patch-lines", 4, "ngIf"], ["formArrayName", "line_items", 1, "line-items"], ["class", "line-item", 3, "formGroupName", 4, "ngFor", "ngForOf"], ["class", "empty-line-items", 4, "ngIf"], [1, "section", "totals-section"], [1, "totals-grid"], [1, "total-item"], [1, "total-item", "grand-total"], [1, "form-actions"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "submit", 1, "btn-save", 3, "disabled"], [3, "value"], [1, "error"], [1, "hint-patch-lines"], [1, "line-item", 3, "formGroupName"], [1, "line-item-header"], ["type", "button", 1, "btn-remove", 3, "click"], [1, "line-item-grid"], ["formControlName", "product_id", 3, "change"], ["formControlName", "uom_id", 3, "change"], ["type", "number", "formControlName", "quantity", "min", "0.001", "step", "0.001"], ["type", "number", "formControlName", "unit_price", "min", "0", "step", "0.01"], ["type", "number", "formControlName", "iva_percentage", "min", "0", "max", "100"], ["type", "number", "formControlName", "ieps_percentage", "min", "0", "max", "100"], [1, "line-calculations"], [1, "calc-item"], [1, "calc-item", "total"], [1, "empty-line-items"]], template: function PurchaseOrderFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, PurchaseOrderFormComponent_Conditional_4_Template, 5, 1, "div", 2)(5, PurchaseOrderFormComponent_Conditional_5_Template, 3, 0, "div", 3)(6, PurchaseOrderFormComponent_Conditional_6_Template, 91, 22, "form", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.isEditMode() ? "Editar" : "Crear", " Orden de Compra");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loadError() ? 4 : ctx.isEditMode() && ctx.loading() ? 5 : ctx.orderForm ? 6 : -1);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, FormGroupName, FormArrayName], styles: ["\n\n.purchase-order-form[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .load-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.purchase-order-form[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 1rem 0;\n  color: #4b5563;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .load-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n  color: #111827;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .hint-patch-lines[_ngcontent-%COMP%] {\n  flex: 1 1 100%;\n  margin: 0;\n  font-size: 0.875rem;\n  color: #4b5563;\n  line-height: 1.45;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background-color: #10b981;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]:hover {\n  background-color: #059669;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 0.25rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0;\n  color: #111827;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  background-color: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%]:hover {\n  background-color: #dc2626;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1rem;\n  padding: 1rem;\n  background-color: #f9fafb;\n  border-radius: 0.375rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item.total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #6366f1;\n  font-size: 1rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .empty-line-items[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: #6b7280;\n  background-color: #f9fafb;\n  border-radius: 0.5rem;\n  border: 2px dashed #d1d5db;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n  border: 2px solid #e5e7eb;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.75rem;\n  max-width: 420px;\n  margin-left: auto;\n}\n@media (max-width: 768px) {\n  .purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    max-width: 100%;\n  }\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background-color: white;\n  border-radius: 0.375rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #111827;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item.grand-total[_ngcontent-%COMP%] {\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item.grand-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item.grand-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 1.125rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1.5rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button.btn-cancel[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button.btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #d1d5db;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button.btn-save[_ngcontent-%COMP%] {\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button.btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #4f46e5;\n}\n/*# sourceMappingURL=purchase-order-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PurchaseOrderFormComponent, [{
    type: Component,
    args: [{ selector: "app-purchase-order-form", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="purchase-order-form">
  <div class="header">
    <h1>{{ isEditMode() ? 'Editar' : 'Crear' }} Orden de Compra</h1>
  </div>

  @if (loadError()) {
    <div class="section load-error">
      <p>{{ loadError() }}</p>
      <button type="button" class="btn-cancel" (click)="goToPurchaseOrderList()">
        Volver al listado
      </button>
    </div>
  } @else if (isEditMode() && loading()) {
    <div class="section loading-state">
      <p>Cargando orden\u2026</p>
    </div>
  } @else if (orderForm) {
    <form [formGroup]="orderForm" (ngSubmit)="save()">
      <!-- General Information Section -->
      <div class="section">
        <h2>Informaci\xF3n General</h2>
        <div class="form-grid">
          <div class="form-field full-width">
            <label for="fiscal">Configuraci\xF3n fiscal *</label>
            <select id="fiscal" formControlName="fiscal_configuration_id">
              <option value="">Selecciona una configuraci\xF3n fiscal</option>
              <option *ngFor="let fc of fiscalConfigurations()" [value]="fc.id">
                {{ fc.razon_social || fc.rfc || fc.id }}
              </option>
            </select>
            <span class="error" *ngIf="getFieldError('fiscal_configuration_id')">
              {{ getFieldError('fiscal_configuration_id') }}
            </span>
          </div>

          <div class="form-field">
            <label for="vendor">Proveedor *</label>
            <select id="vendor" formControlName="vendor_id">
              <option value="">Selecciona un proveedor</option>
              <option *ngFor="let vendor of vendors()" [value]="vendor.id">
                {{ vendor.name }}
              </option>
            </select>
            <span class="error" *ngIf="getFieldError('vendor_id')">
              {{ getFieldError('vendor_id') }}
            </span>
          </div>

          <div class="form-field">
            <label for="warehouse">Almac\xE9n *</label>
            <select id="warehouse" formControlName="warehouse_id">
              <option value="">Selecciona un almac\xE9n</option>
              <option *ngFor="let warehouse of warehouses()" [value]="warehouse.id">
                {{ warehouse.name }}
              </option>
            </select>
            <span class="error" *ngIf="getFieldError('warehouse_id')">
              {{ getFieldError('warehouse_id') }}
            </span>
          </div>

          <div class="form-field">
            <label for="payment">Estado de pago</label>
            <select id="payment" formControlName="payment_status">
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
              <option value="Parcial">Parcial</option>
              <option value="No pagado">No pagado</option>
            </select>
          </div>

          <div class="form-field full-width">
            <label for="purpose">Notas / prop\xF3sito{{ isEditMode() ? '' : ' *' }}</label>
            <textarea
              id="purpose"
              formControlName="purpose"
              rows="3"
              placeholder="Se guarda como notas en la orden (campo notes en API)"
            ></textarea>
            <span class="error" *ngIf="getFieldError('purpose')">
              {{ getFieldError('purpose') }}
            </span>
          </div>

          <div class="form-field">
            <label for="date">Fecha Estimada de Recepci\xF3n *</label>
            <input type="date" id="date" formControlName="tentative_receipt_date" />
            <span class="error" *ngIf="getFieldError('tentative_receipt_date')">
              {{ getFieldError('tentative_receipt_date') }}
            </span>
          </div>
        </div>
      </div>

      <!-- Line Items Section -->
      <div class="section">
        <div class="section-header">
          <h2>L\xEDneas de Productos</h2>
          <button type="button" class="btn-add" [disabled]="!hasVendorSelected()" (click)="addLineItem()">
            + Agregar producto
          </button>
          <p *ngIf="!hasVendorSelected()" class="hint-patch-lines">
            Selecciona un <strong>proveedor</strong> arriba: los productos y UOM de cada l\xEDnea son los del cat\xE1logo de ese proveedor (igual que al crear la OC).
          </p>
          <p *ngIf="hasVendorSelected()" class="hint-patch-lines">
            Al guardar se env\xEDa la orden con el mismo esquema que al crear: cabecera + todas las l\xEDneas (reemplazo total). El costo unitario se env\xEDa como unit_total; los totales de cabecera los calcula el servidor.
          </p>
        </div>

        <div class="line-items" formArrayName="line_items">
          <div
            *ngFor="let item of lineItems.controls; let i = index"
            [formGroupName]="i"
            class="line-item"
          >
            <div class="line-item-header">
              <h3>Producto {{ i + 1 }}</h3>
              <button type="button" class="btn-remove" (click)="removeLineItem(i)">Eliminar</button>
            </div>

            <div class="line-item-grid">
              <div class="form-field">
                <label>Producto *</label>
                <select
                  formControlName="product_id"
                  (change)="onProductSelect(i, $any($event.target).value)"
                >
                  <option value="">Selecciona un producto</option>
                  <option *ngFor="let p of vendorProducts()" [value]="p.product_id">
                    {{ p.product_name }}{{ p.sku ? ' (' + p.sku + ')' : '' }}
                  </option>
                </select>
                <span class="error" *ngIf="getLineItemFieldError(i, 'product_id')">
                  {{ getLineItemFieldError(i, 'product_id') }}
                </span>
              </div>

              <div class="form-field">
                <label>UOM *</label>
                <select
                  formControlName="uom_id"
                  (change)="onVendorUomChange(i, $any($event.target).value)"
                >
                  <option value="">Selecciona UOM</option>
                  <option *ngFor="let uom of getVendorLineUoms(i)" [value]="uom.uom_id">
                    {{ uom.uom_name }}
                  </option>
                </select>
                <span class="error" *ngIf="getLineItemFieldError(i, 'uom_id')">
                  {{ getLineItemFieldError(i, 'uom_id') }}
                </span>
              </div>

              <div class="form-field">
                <label>Cantidad *</label>
                <input type="number" formControlName="quantity" min="0.001" step="0.001" />
                <span class="error" *ngIf="getLineItemFieldError(i, 'quantity')">
                  {{ getLineItemFieldError(i, 'quantity') }}
                </span>
              </div>

              <div class="form-field">
                <label>Costo unitario *</label>
                <input type="number" formControlName="unit_price" min="0" step="0.01" />
                <span class="error" *ngIf="getLineItemFieldError(i, 'unit_price')">
                  {{ getLineItemFieldError(i, 'unit_price') }}
                </span>
              </div>

              <div class="form-field">
                <label>IVA % *</label>
                <input type="number" formControlName="iva_percentage" min="0" max="100" />
                <span class="error" *ngIf="getLineItemFieldError(i, 'iva_percentage')">
                  {{ getLineItemFieldError(i, 'iva_percentage') }}
                </span>
              </div>

              <div class="form-field">
                <label>IEPS % *</label>
                <input type="number" formControlName="ieps_percentage" min="0" max="100" />
                <span class="error" *ngIf="getLineItemFieldError(i, 'ieps_percentage')">
                  {{ getLineItemFieldError(i, 'ieps_percentage') }}
                </span>
              </div>
            </div>

            <div class="line-calculations">
              <div class="calc-item">
                <span>Subtotal:</span>
                <strong>{{ formatCurrency(getLineCalculations(i).subtotal) }}</strong>
              </div>
              <div class="calc-item">
                <span>IVA:</span>
                <strong>{{ formatCurrency(getLineCalculations(i).iva_amount) }}</strong>
              </div>
              <div class="calc-item">
                <span>IEPS:</span>
                <strong>{{ formatCurrency(getLineCalculations(i).ieps_amount) }}</strong>
              </div>
              <div class="calc-item total">
                <span>Total L\xEDnea:</span>
                <strong>{{ formatCurrency(getLineCalculations(i).line_total) }}</strong>
              </div>
            </div>
          </div>

          <div *ngIf="lineItems.length === 0" class="empty-line-items">
            <p>No hay productos agregados. Haz clic en \xABAgregar producto\xBB para comenzar.</p>
          </div>
        </div>
      </div>

      <div class="section totals-section">
        <h2>Totales</h2>
        <div class="totals-grid">
          <div class="total-item">
            <span>Subtotal:</span>
            <strong>{{ formatCurrency(totalCalculations().total_subtotal) }}</strong>
          </div>
          <div class="total-item">
            <span>Total IVA:</span>
            <strong>{{ formatCurrency(totalCalculations().total_iva) }}</strong>
          </div>
          <div class="total-item">
            <span>Total IEPS:</span>
            <strong>{{ formatCurrency(totalCalculations().total_ieps) }}</strong>
          </div>
          <div class="total-item grand-total">
            <span>Gran Total:</span>
            <strong>{{ formatCurrency(totalCalculations().grand_total) }}</strong>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-cancel" (click)="cancel()" [disabled]="saving()">
          Cancelar
        </button>
        <button type="submit" class="btn-save" [disabled]="orderForm.invalid || saving()">
          {{ saving() ? 'Guardando...' : (isEditMode() ? 'Actualizar' : 'Crear') }} Orden
        </button>
      </div>
    </form>
  }
</div>
`, styles: ["/* src/app/features/purchase-orders/pages/purchase-order-form/purchase-order-form.component.scss */\n.purchase-order-form {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.purchase-order-form .load-error p,\n.purchase-order-form .loading-state p {\n  margin: 0 0 1rem 0;\n  color: #4b5563;\n}\n.purchase-order-form .load-error p {\n  color: #b91c1c;\n}\n.purchase-order-form .header {\n  margin-bottom: 1.5rem;\n}\n.purchase-order-form .header h1 {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.purchase-order-form .section {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-form .section h2 {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n  color: #111827;\n}\n.purchase-order-form .section .section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n.purchase-order-form .section .section-header h2 {\n  margin: 0;\n}\n.purchase-order-form .section .section-header .hint-patch-lines {\n  flex: 1 1 100%;\n  margin: 0;\n  font-size: 0.875rem;\n  color: #4b5563;\n  line-height: 1.45;\n}\n.purchase-order-form .section .section-header .btn-add {\n  padding: 0.5rem 1rem;\n  background-color: #10b981;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-form .section .section-header .btn-add:hover {\n  background-color: #059669;\n}\n.purchase-order-form .section .form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form .section .form-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form .section .form-field {\n  display: flex;\n  flex-direction: column;\n}\n.purchase-order-form .section .form-field.full-width {\n  grid-column: 1/-1;\n}\n.purchase-order-form .section .form-field label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 0.25rem;\n}\n.purchase-order-form .section .form-field input,\n.purchase-order-form .section .form-field select,\n.purchase-order-form .section .form-field textarea {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n}\n.purchase-order-form .section .form-field input:focus,\n.purchase-order-form .section .form-field select:focus,\n.purchase-order-form .section .form-field textarea:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.purchase-order-form .section .form-field input:disabled,\n.purchase-order-form .section .form-field select:disabled,\n.purchase-order-form .section .form-field textarea:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.purchase-order-form .section .form-field textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.purchase-order-form .section .form-field .error {\n  color: #dc2626;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.purchase-order-form .line-items .line-item {\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.purchase-order-form .line-items .line-item .line-item-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-form .line-items .line-item .line-item-header h3 {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0;\n  color: #111827;\n}\n.purchase-order-form .line-items .line-item .line-item-header .btn-remove {\n  padding: 0.25rem 0.75rem;\n  background-color: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-form .line-items .line-item .line-item-header .btn-remove:hover {\n  background-color: #dc2626;\n}\n.purchase-order-form .line-items .line-item .line-item-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form .line-items .line-item .line-item-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form .line-items .line-item .line-calculations {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1rem;\n  padding: 1rem;\n  background-color: #f9fafb;\n  border-radius: 0.375rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form .line-items .line-item .line-calculations {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.purchase-order-form .line-items .line-item .line-calculations .calc-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.purchase-order-form .line-items .line-item .line-calculations .calc-item span {\n  font-size: 0.75rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n.purchase-order-form .line-items .line-item .line-calculations .calc-item strong {\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-form .line-items .line-item .line-calculations .calc-item.total strong {\n  color: #6366f1;\n  font-size: 1rem;\n}\n.purchase-order-form .line-items .empty-line-items {\n  text-align: center;\n  padding: 2rem;\n  color: #6b7280;\n  background-color: #f9fafb;\n  border-radius: 0.5rem;\n  border: 2px dashed #d1d5db;\n}\n.purchase-order-form .totals-section {\n  background-color: #f9fafb;\n  border: 2px solid #e5e7eb;\n}\n.purchase-order-form .totals-section .totals-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.75rem;\n  max-width: 420px;\n  margin-left: auto;\n}\n@media (max-width: 768px) {\n  .purchase-order-form .totals-section .totals-grid {\n    grid-template-columns: 1fr;\n    max-width: 100%;\n  }\n}\n.purchase-order-form .totals-section .totals-grid .total-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background-color: white;\n  border-radius: 0.375rem;\n}\n.purchase-order-form .totals-section .totals-grid .total-item span {\n  font-size: 0.875rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n.purchase-order-form .totals-section .totals-grid .total-item strong {\n  font-size: 1rem;\n  color: #111827;\n}\n.purchase-order-form .totals-section .totals-grid .total-item.grand-total {\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-form .totals-section .totals-grid .total-item.grand-total span,\n.purchase-order-form .totals-section .totals-grid .total-item.grand-total strong {\n  color: white;\n  font-size: 1.125rem;\n}\n.purchase-order-form .form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1.5rem;\n}\n.purchase-order-form .form-actions button {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-form .form-actions button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.purchase-order-form .form-actions button.btn-cancel {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-form .form-actions button.btn-cancel:hover:not(:disabled) {\n  background-color: #d1d5db;\n}\n.purchase-order-form .form-actions button.btn-save {\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-form .form-actions button.btn-save:hover:not(:disabled) {\n  background-color: #4f46e5;\n}\n/*# sourceMappingURL=purchase-order-form.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ActivatedRoute }, { type: Router }, { type: PurchaseOrderService }, { type: TaxCalculatorService }, { type: VendorService }, { type: WarehouseService }, { type: FiscalConfigurationService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PurchaseOrderFormComponent, { className: "PurchaseOrderFormComponent", filePath: "src/app/features/purchase-orders/pages/purchase-order-form/purchase-order-form.component.ts", lineNumber: 33 });
})();
export {
  PurchaseOrderFormComponent
};
//# sourceMappingURL=chunk-KA4DDYZG.js.map
