import {
  SalesOrderService
} from "./chunk-W2GGHGOU.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "./chunk-453EK7KR.js";
import {
  FiscalConfigurationService
} from "./chunk-CEL5SWQJ.js";
import {
  CustomerEditModalComponent
} from "./chunk-3TE3DYGY.js";
import {
  CustomerService
} from "./chunk-RUHF6AC7.js";
import {
  TabComponent
} from "./chunk-M65YKY4W.js";
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
} from "./chunk-EF42XV6X.js";
import {
  ToastService
} from "./chunk-OP2NIPTP.js";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-MNFUR22A.js";
import {
  ChangeDetectorRef,
  Component,
  Inject,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
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
} from "./chunk-CJAGDKD4.js";

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
  CreateSalesOrderModalComponent
};
//# sourceMappingURL=chunk-GNYI4VIS.js.map
