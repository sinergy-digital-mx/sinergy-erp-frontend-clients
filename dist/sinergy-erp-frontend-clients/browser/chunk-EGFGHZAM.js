import {
  getErrorMessage,
  validatePrice,
  validateQuantity,
  validateTaxPercentage
} from "./chunk-CPMPSCUM.js";
import {
  ProductService,
  WarehouseService
} from "./chunk-C5Q32U4C.js";
import {
  SalesOrderService
} from "./chunk-TXHM6FEM.js";
import {
  TaxCalculatorService
} from "./chunk-BUMMMPXI.js";
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7ZU2RCPO.js";

// src/app/features/sales-orders/pages/sales-order-form/sales-order-form.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SalesOrderFormComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const customer_r1 = ctx.$implicit;
    \u0275\u0275property("value", customer_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", customer_r1.name, " ");
  }
}
function SalesOrderFormComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r2 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", warehouse_r2.name, " ");
  }
}
function SalesOrderFormComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getFieldError("warehouse_id"), " ");
  }
}
function SalesOrderFormComponent_For_38_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r6 = ctx.$implicit;
    \u0275\u0275property("value", product_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", product_r6.name, " (", product_r6.sku, ") ");
  }
}
function SalesOrderFormComponent_For_38_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_68_r5 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "product_id"), " ");
  }
}
function SalesOrderFormComponent_For_38_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r7 = ctx.$implicit;
    \u0275\u0275property("value", uom_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", uom_r7.name, " (", uom_r7.abbreviation, ") ");
  }
}
function SalesOrderFormComponent_For_38_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_68_r5 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "uom_id"), " ");
  }
}
function SalesOrderFormComponent_For_38_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_68_r5 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "quantity"), " ");
  }
}
function SalesOrderFormComponent_For_38_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_68_r5 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "unit_price"), " ");
  }
}
function SalesOrderFormComponent_For_38_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_68_r5 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "iva_percentage"), " ");
  }
}
function SalesOrderFormComponent_For_38_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_68_r5 = \u0275\u0275nextContext().$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "ieps_percentage"), " ");
  }
}
function SalesOrderFormComponent_For_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 27)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 28);
    \u0275\u0275listener("click", function SalesOrderFormComponent_For_38_Template_button_click_4_listener() {
      const \u0275$index_68_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeLineItem(\u0275$index_68_r5));
    });
    \u0275\u0275text(5, " Eliminar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 29)(7, "div", 5)(8, "label");
    \u0275\u0275text(9, "Producto *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 30);
    \u0275\u0275listener("change", function SalesOrderFormComponent_For_38_Template_select_change_10_listener($event) {
      const \u0275$index_68_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onProductSelect(\u0275$index_68_r5, $event.target.value));
    });
    \u0275\u0275elementStart(11, "option", 11);
    \u0275\u0275text(12, "Selecciona un producto");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(13, SalesOrderFormComponent_For_38_For_14_Template, 2, 3, "option", 8, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, SalesOrderFormComponent_For_38_Conditional_15_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 5)(17, "label");
    \u0275\u0275text(18, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 31)(20, "option", 11);
    \u0275\u0275text(21, "Selecciona UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, SalesOrderFormComponent_For_38_For_23_Template, 2, 3, "option", 8, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, SalesOrderFormComponent_For_38_Conditional_24_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 5)(26, "label");
    \u0275\u0275text(27, "Cantidad *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "input", 32);
    \u0275\u0275conditionalCreate(29, SalesOrderFormComponent_For_38_Conditional_29_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 5)(31, "label");
    \u0275\u0275text(32, "Precio Unitario *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(33, "input", 33);
    \u0275\u0275conditionalCreate(34, SalesOrderFormComponent_For_38_Conditional_34_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 5)(36, "label");
    \u0275\u0275text(37, "IVA % *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 34);
    \u0275\u0275conditionalCreate(39, SalesOrderFormComponent_For_38_Conditional_39_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 5)(41, "label");
    \u0275\u0275text(42, "IEPS % *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(43, "input", 35);
    \u0275\u0275conditionalCreate(44, SalesOrderFormComponent_For_38_Conditional_44_Template, 2, 1, "span", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 36)(46, "div", 37)(47, "span");
    \u0275\u0275text(48, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "strong");
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 37)(52, "span");
    \u0275\u0275text(53, "IVA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "strong");
    \u0275\u0275text(55);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 37)(57, "span");
    \u0275\u0275text(58, "IEPS:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "strong");
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 38)(62, "span");
    \u0275\u0275text(63, "Total L\xEDnea:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "strong");
    \u0275\u0275text(65);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const item_r8 = ctx.$implicit;
    const \u0275$index_68_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroupName", \u0275$index_68_r5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Producto ", \u0275$index_68_r5 + 1);
    \u0275\u0275advance(10);
    \u0275\u0275repeater(ctx_r2.products());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "product_id") ? 15 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275repeater((tmp_15_0 = ctx_r2.getProduct(item_r8.value.product_id)) == null ? null : tmp_15_0.uoms);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "uom_id") ? 24 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "quantity") ? 29 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "unit_price") ? 34 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "iva_percentage") ? 39 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.getLineItemFieldError(\u0275$index_68_r5, "ieps_percentage") ? 44 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.getLineCalculations(\u0275$index_68_r5).subtotal));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.getLineCalculations(\u0275$index_68_r5).iva_amount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.getLineCalculations(\u0275$index_68_r5).ieps_amount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(ctx_r2.getLineCalculations(\u0275$index_68_r5).line_total));
  }
}
function SalesOrderFormComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "p");
    \u0275\u0275text(2, 'No hay productos agregados. Haz clic en "Agregar Producto" para comenzar.');
    \u0275\u0275elementEnd()();
  }
}
var SalesOrderFormComponent = class _SalesOrderFormComponent {
  fb;
  route;
  router;
  salesOrderService;
  taxCalculator;
  productService;
  warehouseService;
  orderForm;
  isEditMode = signal(false, ...ngDevMode ? [{ debugName: "isEditMode" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  // Data for dropdowns
  customers = signal([], ...ngDevMode ? [{ debugName: "customers" }] : []);
  products = signal([], ...ngDevMode ? [{ debugName: "products" }] : []);
  warehouses = signal([], ...ngDevMode ? [{ debugName: "warehouses" }] : []);
  // Signal for totals (updated on form changes)
  totalCalculations = signal({
    total_subtotal: 0,
    total_iva: 0,
    total_ieps: 0,
    grand_total: 0
  }, ...ngDevMode ? [{ debugName: "totalCalculations" }] : []);
  get lineItems() {
    return this.orderForm.get("line_items");
  }
  constructor(fb, route, router, salesOrderService, taxCalculator, productService, warehouseService) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.salesOrderService = salesOrderService;
    this.taxCalculator = taxCalculator;
    this.productService = productService;
    this.warehouseService = warehouseService;
  }
  ngOnInit() {
    this.initForm();
    this.loadDropdownData();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode.set(true);
      this.loadOrder(id);
    }
  }
  /**
   * Initialize form
   */
  initForm(order) {
    this.orderForm = this.fb.group({
      customer_id: [order?.customer_id || null],
      warehouse_id: [order?.warehouse_id || "", Validators.required],
      delivery_date: [order?.delivery_date || ""],
      line_items: this.fb.array([], Validators.minLength(1))
    });
    if (order?.line_items) {
      order.line_items.forEach((item) => {
        this.addLineItem(item);
      });
    }
    this.orderForm.get("line_items")?.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }
  /**
   * Calculate totals from line items
   */
  calculateTotals() {
    const lineItems = this.lineItems.value;
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
  /**
   * Load dropdown data
   */
  loadDropdownData() {
    this.customers.set([]);
    this.productService.getProducts().subscribe({
      next: (products) => {
        const productArray = Array.isArray(products) ? products : products.data || [];
        this.products.set(productArray);
      },
      error: (error) => console.error("Error loading products:", error)
    });
    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        const warehouseArray = Array.isArray(warehouses) ? warehouses : warehouses.data || [];
        this.warehouses.set(warehouseArray);
      },
      error: (error) => console.error("Error loading warehouses:", error)
    });
  }
  /**
   * Load order for editing
   */
  loadOrder(id) {
    this.loading.set(true);
    this.salesOrderService.getOrderById(id).subscribe({
      next: (order) => {
        this.initForm(order);
        this.loading.set(false);
      },
      error: (error) => {
        alert(`Error: ${error.message}`);
        this.loading.set(false);
      }
    });
  }
  /**
   * Create line item form group
   */
  createLineItemFormGroup(item) {
    return this.fb.group({
      product_id: [item?.product_id || "", Validators.required],
      uom_id: [item?.uom_id || "", Validators.required],
      quantity: [item?.quantity || 1, [Validators.required, validateQuantity()]],
      unit_price: [item?.unit_price || 0, [Validators.required, validatePrice()]],
      iva_percentage: [item?.iva_percentage || 16, [Validators.required, validateTaxPercentage()]],
      ieps_percentage: [item?.ieps_percentage || 0, [Validators.required, validateTaxPercentage()]]
    });
  }
  /**
   * Add line item
   */
  addLineItem(item) {
    this.lineItems.push(this.createLineItemFormGroup(item));
  }
  /**
   * Remove line item
   */
  removeLineItem(index) {
    this.lineItems.removeAt(index);
  }
  /**
   * Get product by ID
   */
  getProduct(productId) {
    const products = this.products();
    return products ? products.find((p) => p.id === productId) : void 0;
  }
  /**
   * On product selection, update UOM
   */
  onProductSelect(index, productId) {
    const product = this.getProduct(productId);
    if (product && product.uoms && product.uoms.length > 0) {
      this.lineItems.at(index).patchValue({
        uom_id: product.base_uom_id,
        unit_price: product.cost
      });
    }
  }
  /**
   * Get line item calculations
   */
  getLineCalculations(index) {
    const item = this.lineItems.at(index).value;
    return this.taxCalculator.calculateLineItem(item.quantity || 0, item.unit_price || 0, item.iva_percentage || 0, item.ieps_percentage || 0);
  }
  /**
   * Get error message for field
   */
  getFieldError(fieldName) {
    return getErrorMessage(this.orderForm.get(fieldName), fieldName);
  }
  /**
   * Get error message for line item field
   */
  getLineItemFieldError(index, fieldName) {
    return getErrorMessage(this.lineItems.at(index).get(fieldName), fieldName);
  }
  /**
   * Save order
   */
  save() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      alert("Por favor, completa todos los campos requeridos");
      return;
    }
    this.saving.set(true);
    const formData = this.orderForm.value;
    console.log("Form data being sent:", formData);
    console.log("Line items:", formData.line_items);
    if (this.isEditMode()) {
      const id = this.route.snapshot.paramMap.get("id");
      this.salesOrderService.updateOrder(id, formData).subscribe({
        next: (order) => {
          alert("Orden actualizada exitosamente");
          this.router.navigate(["/sales-orders"]);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
          this.saving.set(false);
        }
      });
    } else {
      this.salesOrderService.createOrder(formData).subscribe({
        next: (order) => {
          alert("Orden creada exitosamente");
          this.router.navigate(["/sales-orders"]);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
          this.saving.set(false);
        }
      });
    }
  }
  /**
   * Cancel and go back
   */
  cancel() {
    if (confirm("\xBFDescartar cambios?")) {
      this.router.navigate(["/sales-orders"]);
    }
  }
  /**
   * Format currency
   */
  formatCurrency(amount) {
    return this.taxCalculator.formatCurrency(amount);
  }
  static \u0275fac = function SalesOrderFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SalesOrderFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(SalesOrderService), \u0275\u0275directiveInject(TaxCalculatorService), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(WarehouseService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SalesOrderFormComponent, selectors: [["app-sales-order-form"]], decls: 69, vars: 12, consts: [[1, "sales-order-form"], [1, "header"], [3, "ngSubmit", "formGroup"], [1, "section"], [1, "form-grid"], [1, "form-field"], ["for", "customer"], ["id", "customer", "formControlName", "customer_id"], [3, "value"], ["for", "warehouse"], ["id", "warehouse", "formControlName", "warehouse_id"], ["value", ""], [1, "error"], ["for", "delivery_date"], ["type", "date", "id", "delivery_date", "formControlName", "delivery_date"], [1, "section-header"], ["type", "button", 1, "btn-add", 3, "click"], ["formArrayName", "line_items", 1, "line-items"], [1, "line-item", 3, "formGroupName"], [1, "empty-line-items"], [1, "section", "totals-section"], [1, "totals-grid"], [1, "total-item"], [1, "total-item", "grand-total"], [1, "form-actions"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "submit", 1, "btn-save", 3, "disabled"], [1, "line-item-header"], ["type", "button", 1, "btn-remove", 3, "click"], [1, "line-item-grid"], ["formControlName", "product_id", 3, "change"], ["formControlName", "uom_id"], ["type", "number", "formControlName", "quantity", "min", "0.01", "step", "0.01"], ["type", "number", "formControlName", "unit_price", "min", "0", "step", "0.01"], ["type", "number", "formControlName", "iva_percentage", "min", "0", "max", "100"], ["type", "number", "formControlName", "ieps_percentage", "min", "0", "max", "100"], [1, "line-calculations"], [1, "calc-item"], [1, "calc-item", "total"]], template: function SalesOrderFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "form", 2);
      \u0275\u0275listener("ngSubmit", function SalesOrderFormComponent_Template_form_ngSubmit_4_listener() {
        return ctx.save();
      });
      \u0275\u0275elementStart(5, "div", 3)(6, "h2");
      \u0275\u0275text(7, "Informaci\xF3n General");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 4)(9, "div", 5)(10, "label", 6);
      \u0275\u0275text(11, "Cliente (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "select", 7)(13, "option", 8);
      \u0275\u0275text(14, "Sin cliente");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(15, SalesOrderFormComponent_For_16_Template, 2, 2, "option", 8, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 5)(18, "label", 9);
      \u0275\u0275text(19, "Almac\xE9n *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "select", 10)(21, "option", 11);
      \u0275\u0275text(22, "Selecciona un almac\xE9n");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(23, SalesOrderFormComponent_For_24_Template, 2, 2, "option", 8, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(25, SalesOrderFormComponent_Conditional_25_Template, 2, 1, "span", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 5)(27, "label", 13);
      \u0275\u0275text(28, "Fecha de Entrega (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "input", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 3)(31, "div", 15)(32, "h2");
      \u0275\u0275text(33, "L\xEDneas de Productos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "button", 16);
      \u0275\u0275listener("click", function SalesOrderFormComponent_Template_button_click_34_listener() {
        return ctx.addLineItem();
      });
      \u0275\u0275text(35, " + Agregar Producto ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div", 17);
      \u0275\u0275repeaterCreate(37, SalesOrderFormComponent_For_38_Template, 66, 12, "div", 18, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(39, SalesOrderFormComponent_Conditional_39_Template, 3, 0, "div", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 20)(41, "h2");
      \u0275\u0275text(42, "Totales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 21)(44, "div", 22)(45, "span");
      \u0275\u0275text(46, "Subtotal:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "strong");
      \u0275\u0275text(48);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 22)(50, "span");
      \u0275\u0275text(51, "Total IVA:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "strong");
      \u0275\u0275text(53);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "div", 22)(55, "span");
      \u0275\u0275text(56, "Total IEPS:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "strong");
      \u0275\u0275text(58);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(59, "div", 23)(60, "span");
      \u0275\u0275text(61, "Gran Total:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "strong");
      \u0275\u0275text(63);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(64, "div", 24)(65, "button", 25);
      \u0275\u0275listener("click", function SalesOrderFormComponent_Template_button_click_65_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(66, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "button", 26);
      \u0275\u0275text(68);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.isEditMode() ? "Editar" : "Crear", " Orden de Venta");
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.orderForm);
      \u0275\u0275advance(9);
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.customers());
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.warehouses());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.getFieldError("warehouse_id") ? 25 : -1);
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.lineItems.controls);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.lineItems.length === 0 ? 39 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.totalCalculations().total_subtotal));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.totalCalculations().total_iva));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.totalCalculations().total_ieps));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.totalCalculations().grand_total));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.orderForm.invalid || ctx.saving());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Guardando..." : ctx.isEditMode() ? "Actualizar" : "Crear", " Orden ");
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, FormGroupName, FormArrayName], styles: ["\n\n.sales-order-form[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n.sales-order-form[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.sales-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #374151;\n  margin: 0 0 1.5rem 0;\n}\n.sales-order-form[_ngcontent-%COMP%]   .section.totals-section[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.sales-order-form[_ngcontent-%COMP%]   .section.totals-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: white;\n}\n.sales-order-form[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-field.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #374151;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  transition: border-color 0.2s;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 80px;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #ef4444;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%] {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 1.5rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #374151;\n  margin: 0;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 2rem;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  text-align: right;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #1f2937;\n}\n.sales-order-form[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item.total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #667eea;\n}\n.sales-order-form[_ngcontent-%COMP%]   .empty-line-items[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #6b7280;\n  background: #f9fafb;\n  border: 2px dashed #d1d5db;\n  border-radius: 8px;\n}\n.sales-order-form[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1.5rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  opacity: 0.9;\n}\n.sales-order-form[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item.grand-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1rem;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 2rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #d1d5db;\n  color: #374151;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  color: white;\n}\n.sales-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.sales-order-form[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.sales-order-form[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.sales-order-form[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background: transparent;\n  border: 1px solid #fee2e2;\n  border-radius: 8px;\n  color: #991b1b;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.sales-order-form[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n}\n/*# sourceMappingURL=sales-order-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SalesOrderFormComponent, [{
    type: Component,
    args: [{ selector: "app-sales-order-form", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="sales-order-form">\r
  <div class="header">\r
    <h1>{{ isEditMode() ? 'Editar' : 'Crear' }} Orden de Venta</h1>\r
  </div>\r
\r
  <form [formGroup]="orderForm" (ngSubmit)="save()">\r
    <!-- General Information Section -->\r
    <div class="section">\r
      <h2>Informaci\xF3n General</h2>\r
      <div class="form-grid">\r
        <div class="form-field">\r
          <label for="customer">Cliente (Opcional)</label>\r
          <select id="customer" formControlName="customer_id">\r
            <option [value]="null">Sin cliente</option>\r
            @for (customer of customers(); track customer.id) {\r
              <option [value]="customer.id">\r
                {{ customer.name }}\r
              </option>\r
            }\r
          </select>\r
        </div>\r
\r
        <div class="form-field">\r
          <label for="warehouse">Almac\xE9n *</label>\r
          <select id="warehouse" formControlName="warehouse_id">\r
            <option value="">Selecciona un almac\xE9n</option>\r
            @for (warehouse of warehouses(); track warehouse.id) {\r
              <option [value]="warehouse.id">\r
                {{ warehouse.name }}\r
              </option>\r
            }\r
          </select>\r
          @if (getFieldError('warehouse_id')) {\r
            <span class="error">\r
              {{ getFieldError('warehouse_id') }}\r
            </span>\r
          }\r
        </div>\r
\r
        <div class="form-field">\r
          <label for="delivery_date">Fecha de Entrega (Opcional)</label>\r
          <input \r
            type="date" \r
            id="delivery_date" \r
            formControlName="delivery_date"\r
          />\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Line Items Section -->\r
    <div class="section">\r
      <div class="section-header">\r
        <h2>L\xEDneas de Productos</h2>\r
        <button \r
          type="button" \r
          class="btn-add" \r
          (click)="addLineItem()"\r
        >\r
          + Agregar Producto\r
        </button>\r
      </div>\r
\r
      <div class="line-items" formArrayName="line_items">\r
        @for (item of lineItems.controls; track $index; let i = $index) {\r
          <div \r
            [formGroupName]="i"\r
            class="line-item"\r
          >\r
            <div class="line-item-header">\r
              <h3>Producto {{ i + 1 }}</h3>\r
              <button \r
                type="button" \r
                class="btn-remove" \r
                (click)="removeLineItem(i)"\r
              >\r
                Eliminar\r
              </button>\r
            </div>\r
\r
            <div class="line-item-grid">\r
              <div class="form-field">\r
                <label>Producto *</label>\r
                <select \r
                  formControlName="product_id"\r
                  (change)="onProductSelect(i, $any($event.target).value)"\r
                >\r
                  <option value="">Selecciona un producto</option>\r
                  @for (product of products(); track product.id) {\r
                    <option [value]="product.id">\r
                      {{ product.name }} ({{ product.sku }})\r
                    </option>\r
                  }\r
                </select>\r
                @if (getLineItemFieldError(i, 'product_id')) {\r
                  <span class="error">\r
                    {{ getLineItemFieldError(i, 'product_id') }}\r
                  </span>\r
                }\r
              </div>\r
\r
              <div class="form-field">\r
                <label>UOM *</label>\r
                <select formControlName="uom_id">\r
                  <option value="">Selecciona UOM</option>\r
                  @for (uom of getProduct(item.value.product_id)?.uoms; track uom.id) {\r
                    <option [value]="uom.id">\r
                      {{ uom.name }} ({{ uom.abbreviation }})\r
                    </option>\r
                  }\r
                </select>\r
                @if (getLineItemFieldError(i, 'uom_id')) {\r
                  <span class="error">\r
                    {{ getLineItemFieldError(i, 'uom_id') }}\r
                  </span>\r
                }\r
              </div>\r
\r
              <div class="form-field">\r
                <label>Cantidad *</label>\r
                <input \r
                  type="number" \r
                  formControlName="quantity" \r
                  min="0.01" \r
                  step="0.01"\r
                />\r
                @if (getLineItemFieldError(i, 'quantity')) {\r
                  <span class="error">\r
                    {{ getLineItemFieldError(i, 'quantity') }}\r
                  </span>\r
                }\r
              </div>\r
\r
              <div class="form-field">\r
                <label>Precio Unitario *</label>\r
                <input \r
                  type="number" \r
                  formControlName="unit_price" \r
                  min="0" \r
                  step="0.01"\r
                />\r
                @if (getLineItemFieldError(i, 'unit_price')) {\r
                  <span class="error">\r
                    {{ getLineItemFieldError(i, 'unit_price') }}\r
                  </span>\r
                }\r
              </div>\r
\r
              <div class="form-field">\r
                <label>IVA % *</label>\r
                <input \r
                  type="number" \r
                  formControlName="iva_percentage" \r
                  min="0" \r
                  max="100"\r
                />\r
                @if (getLineItemFieldError(i, 'iva_percentage')) {\r
                  <span class="error">\r
                    {{ getLineItemFieldError(i, 'iva_percentage') }}\r
                  </span>\r
                }\r
              </div>\r
\r
              <div class="form-field">\r
                <label>IEPS % *</label>\r
                <input \r
                  type="number" \r
                  formControlName="ieps_percentage" \r
                  min="0" \r
                  max="100"\r
                />\r
                @if (getLineItemFieldError(i, 'ieps_percentage')) {\r
                  <span class="error">\r
                    {{ getLineItemFieldError(i, 'ieps_percentage') }}\r
                  </span>\r
                }\r
              </div>\r
            </div>\r
\r
            <!-- Line calculations -->\r
            <div class="line-calculations">\r
              <div class="calc-item">\r
                <span>Subtotal:</span>\r
                <strong>{{ formatCurrency(getLineCalculations(i).subtotal) }}</strong>\r
              </div>\r
              <div class="calc-item">\r
                <span>IVA:</span>\r
                <strong>{{ formatCurrency(getLineCalculations(i).iva_amount) }}</strong>\r
              </div>\r
              <div class="calc-item">\r
                <span>IEPS:</span>\r
                <strong>{{ formatCurrency(getLineCalculations(i).ieps_amount) }}</strong>\r
              </div>\r
              <div class="calc-item total">\r
                <span>Total L\xEDnea:</span>\r
                <strong>{{ formatCurrency(getLineCalculations(i).line_total) }}</strong>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
\r
        @if (lineItems.length === 0) {\r
          <div class="empty-line-items">\r
            <p>No hay productos agregados. Haz clic en "Agregar Producto" para comenzar.</p>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
\r
    <!-- Totals Section -->\r
    <div class="section totals-section">\r
      <h2>Totales</h2>\r
      <div class="totals-grid">\r
        <div class="total-item">\r
          <span>Subtotal:</span>\r
          <strong>{{ formatCurrency(totalCalculations().total_subtotal) }}</strong>\r
        </div>\r
        <div class="total-item">\r
          <span>Total IVA:</span>\r
          <strong>{{ formatCurrency(totalCalculations().total_iva) }}</strong>\r
        </div>\r
        <div class="total-item">\r
          <span>Total IEPS:</span>\r
          <strong>{{ formatCurrency(totalCalculations().total_ieps) }}</strong>\r
        </div>\r
        <div class="total-item grand-total">\r
          <span>Gran Total:</span>\r
          <strong>{{ formatCurrency(totalCalculations().grand_total) }}</strong>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Form Actions -->\r
    <div class="form-actions">\r
      <button \r
        type="button" \r
        class="btn-cancel" \r
        (click)="cancel()"\r
        [disabled]="saving()"\r
      >\r
        Cancelar\r
      </button>\r
      <button \r
        type="submit" \r
        class="btn-save" \r
        [disabled]="orderForm.invalid || saving()"\r
      >\r
        {{ saving() ? 'Guardando...' : (isEditMode() ? 'Actualizar' : 'Crear') }} Orden\r
      </button>\r
    </div>\r
  </form>\r
</div>\r
`, styles: ["/* src/app/features/sales-orders/pages/sales-order-form/sales-order-form.component.scss */\n.sales-order-form {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.sales-order-form .header {\n  margin-bottom: 2rem;\n}\n.sales-order-form .header h1 {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1f2937;\n  margin: 0;\n}\n.sales-order-form form {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.sales-order-form .section {\n  background: white;\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.sales-order-form .section h2 {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #374151;\n  margin: 0 0 1.5rem 0;\n}\n.sales-order-form .section.totals-section {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.sales-order-form .section.totals-section h2 {\n  color: white;\n}\n.sales-order-form .section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.sales-order-form .section-header h2 {\n  margin: 0;\n}\n.sales-order-form .form-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.sales-order-form .form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.sales-order-form .form-field.full-width {\n  grid-column: 1/-1;\n}\n.sales-order-form .form-field label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #374151;\n}\n.sales-order-form .form-field input,\n.sales-order-form .form-field select,\n.sales-order-form .form-field textarea {\n  padding: 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  transition: border-color 0.2s;\n}\n.sales-order-form .form-field input:focus,\n.sales-order-form .form-field select:focus,\n.sales-order-form .form-field textarea:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.sales-order-form .form-field input:disabled,\n.sales-order-form .form-field select:disabled,\n.sales-order-form .form-field textarea:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.sales-order-form .form-field textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.sales-order-form .form-field .error {\n  font-size: 0.75rem;\n  color: #ef4444;\n}\n.sales-order-form .line-items {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.sales-order-form .line-item {\n  background: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 1.5rem;\n}\n.sales-order-form .line-item .line-item-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.sales-order-form .line-item .line-item-header h3 {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #374151;\n  margin: 0;\n}\n.sales-order-form .line-item .line-item-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.sales-order-form .line-item .line-calculations {\n  display: flex;\n  justify-content: flex-end;\n  gap: 2rem;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.sales-order-form .line-item .line-calculations .calc-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  text-align: right;\n}\n.sales-order-form .line-item .line-calculations .calc-item span {\n  font-size: 0.75rem;\n  color: #6b7280;\n}\n.sales-order-form .line-item .line-calculations .calc-item strong {\n  font-size: 0.875rem;\n  color: #1f2937;\n}\n.sales-order-form .line-item .line-calculations .calc-item.total strong {\n  font-size: 1rem;\n  color: #667eea;\n}\n.sales-order-form .empty-line-items {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #6b7280;\n  background: #f9fafb;\n  border: 2px dashed #d1d5db;\n  border-radius: 8px;\n}\n.sales-order-form .totals-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1.5rem;\n}\n.sales-order-form .totals-grid .total-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.sales-order-form .totals-grid .total-item span {\n  font-size: 0.875rem;\n  opacity: 0.9;\n}\n.sales-order-form .totals-grid .total-item strong {\n  font-size: 1.25rem;\n}\n.sales-order-form .totals-grid .total-item.grand-total strong {\n  font-size: 1.75rem;\n}\n.sales-order-form .form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1rem;\n}\n.sales-order-form .form-actions button {\n  padding: 0.75rem 2rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.sales-order-form .form-actions button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.sales-order-form .form-actions .btn-cancel {\n  background: white;\n  border: 1px solid #d1d5db;\n  color: #374151;\n}\n.sales-order-form .form-actions .btn-cancel:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.sales-order-form .form-actions .btn-save {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  color: white;\n}\n.sales-order-form .form-actions .btn-save:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.sales-order-form .btn-add {\n  padding: 0.5rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border: none;\n  border-radius: 8px;\n  color: white;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.sales-order-form .btn-add:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n}\n.sales-order-form .btn-remove {\n  padding: 0.5rem 1rem;\n  background: transparent;\n  border: 1px solid #fee2e2;\n  border-radius: 8px;\n  color: #991b1b;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.sales-order-form .btn-remove:hover {\n  background: #fee2e2;\n}\n/*# sourceMappingURL=sales-order-form.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ActivatedRoute }, { type: Router }, { type: SalesOrderService }, { type: TaxCalculatorService }, { type: ProductService }, { type: WarehouseService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SalesOrderFormComponent, { className: "SalesOrderFormComponent", filePath: "src/app/features/sales-orders/pages/sales-order-form/sales-order-form.component.ts", lineNumber: 21 });
})();
export {
  SalesOrderFormComponent
};
//# sourceMappingURL=chunk-EGFGHZAM.js.map
