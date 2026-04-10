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
  PurchaseOrderService
} from "./chunk-SFPCIKZR.js";
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
  HttpClient,
  Router,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  BehaviorSubject,
  Component,
  Injectable,
  of,
  setClassMetadata,
  signal,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
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
} from "./chunk-7ZU2RCPO.js";

// src/app/features/purchase-orders/services/vendor.service.ts
var VendorService = class _VendorService {
  http;
  baseUrl = `${environment.api}/tenant/vendors`;
  vendorsCache$ = new BehaviorSubject(null);
  cacheTimestamp = 0;
  CACHE_DURATION = 5 * 60 * 1e3;
  // 5 minutes
  constructor(http) {
    this.http = http;
  }
  /**
   * Get all active vendors
   */
  getVendors() {
    const now = Date.now();
    const cached = this.vendorsCache$.value;
    if (cached && now - this.cacheTimestamp < this.CACHE_DURATION) {
      return of(cached);
    }
    return this.http.get(this.baseUrl).pipe(tap((vendors) => {
      this.vendorsCache$.next(vendors);
      this.cacheTimestamp = now;
    }));
  }
  /**
   * Search vendors by name or code
   */
  searchVendors(query) {
    return this.http.get(this.baseUrl, {
      params: { search: query }
    });
  }
  /**
   * Clear cache
   */
  clearCache() {
    this.vendorsCache$.next(null);
    this.cacheTimestamp = 0;
  }
  static \u0275fac = function VendorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VendorService, factory: _VendorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/purchase-orders/pages/purchase-order-form/purchase-order-form.component.ts
function PurchaseOrderFormComponent_option_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r1 = ctx.$implicit;
    \u0275\u0275property("value", vendor_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", vendor_r1.name, " ");
  }
}
function PurchaseOrderFormComponent_span_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("vendor_id"), " ");
  }
}
function PurchaseOrderFormComponent_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const warehouse_r3 = ctx.$implicit;
    \u0275\u0275property("value", warehouse_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", warehouse_r3.name, " ");
  }
}
function PurchaseOrderFormComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("warehouse_id"), " ");
  }
}
function PurchaseOrderFormComponent_span_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("purpose"), " ");
  }
}
function PurchaseOrderFormComponent_span_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getFieldError("tentative_receipt_date"), " ");
  }
}
function PurchaseOrderFormComponent_div_42_option_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
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
function PurchaseOrderFormComponent_div_42_span_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r5, "product_id"), " ");
  }
}
function PurchaseOrderFormComponent_div_42_option_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 30);
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
function PurchaseOrderFormComponent_div_42_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r5, "uom_id"), " ");
  }
}
function PurchaseOrderFormComponent_div_42_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r5, "quantity"), " ");
  }
}
function PurchaseOrderFormComponent_div_42_span_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r5, "unit_price"), " ");
  }
}
function PurchaseOrderFormComponent_div_42_span_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r5, "iva_percentage"), " ");
  }
}
function PurchaseOrderFormComponent_div_42_span_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r5 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getLineItemFieldError(i_r5, "ieps_percentage"), " ");
  }
}
function PurchaseOrderFormComponent_div_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 34);
    \u0275\u0275listener("click", function PurchaseOrderFormComponent_div_42_Template_button_click_4_listener() {
      const i_r5 = \u0275\u0275restoreView(_r4).index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeLineItem(i_r5));
    });
    \u0275\u0275text(5, " Eliminar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "div", 5)(8, "label");
    \u0275\u0275text(9, "Producto *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "select", 36);
    \u0275\u0275listener("change", function PurchaseOrderFormComponent_div_42_Template_select_change_10_listener($event) {
      const i_r5 = \u0275\u0275restoreView(_r4).index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onProductSelect(i_r5, $event.target.value));
    });
    \u0275\u0275elementStart(11, "option", 8);
    \u0275\u0275text(12, "Selecciona un producto");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, PurchaseOrderFormComponent_div_42_option_13_Template, 2, 3, "option", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, PurchaseOrderFormComponent_div_42_span_14_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 5)(16, "label");
    \u0275\u0275text(17, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "select", 37)(19, "option", 8);
    \u0275\u0275text(20, "Selecciona UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, PurchaseOrderFormComponent_div_42_option_21_Template, 2, 3, "option", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, PurchaseOrderFormComponent_div_42_span_22_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 5)(24, "label");
    \u0275\u0275text(25, "Cantidad *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 38);
    \u0275\u0275template(27, PurchaseOrderFormComponent_div_42_span_27_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 5)(29, "label");
    \u0275\u0275text(30, "Precio Unitario *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 39);
    \u0275\u0275template(32, PurchaseOrderFormComponent_div_42_span_32_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 5)(34, "label");
    \u0275\u0275text(35, "IVA % *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 40);
    \u0275\u0275template(37, PurchaseOrderFormComponent_div_42_span_37_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 5)(39, "label");
    \u0275\u0275text(40, "IEPS % *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(41, "input", 41);
    \u0275\u0275template(42, PurchaseOrderFormComponent_div_42_span_42_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 42)(44, "div", 43)(45, "span");
    \u0275\u0275text(46, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "strong");
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 43)(50, "span");
    \u0275\u0275text(51, "IVA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "strong");
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 43)(55, "span");
    \u0275\u0275text(56, "IEPS:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "strong");
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 44)(60, "span");
    \u0275\u0275text(61, "Total L\xEDnea:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "strong");
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    const item_r8 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroupName", i_r5);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Producto ", i_r5 + 1);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r1.products());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r5, "product_id"));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", (tmp_7_0 = ctx_r1.getProduct(item_r8.value.product_id)) == null ? null : tmp_7_0.uoms);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r5, "uom_id"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r5, "quantity"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r5, "unit_price"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r5, "iva_percentage"));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.getLineItemFieldError(i_r5, "ieps_percentage"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.getLineCalculations(i_r5).subtotal));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.getLineCalculations(i_r5).iva_amount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.getLineCalculations(i_r5).ieps_amount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.getLineCalculations(i_r5).line_total));
  }
}
function PurchaseOrderFormComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "p");
    \u0275\u0275text(2, 'No hay productos agregados. Haz clic en "Agregar Producto" para comenzar.');
    \u0275\u0275elementEnd()();
  }
}
var PurchaseOrderFormComponent = class _PurchaseOrderFormComponent {
  fb;
  route;
  router;
  purchaseOrderService;
  taxCalculator;
  vendorService;
  productService;
  warehouseService;
  orderForm;
  isEditMode = signal(false, ...ngDevMode ? [{ debugName: "isEditMode" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  // Data for dropdowns
  vendors = signal([], ...ngDevMode ? [{ debugName: "vendors" }] : []);
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
  constructor(fb, route, router, purchaseOrderService, taxCalculator, vendorService, productService, warehouseService) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.purchaseOrderService = purchaseOrderService;
    this.taxCalculator = taxCalculator;
    this.vendorService = vendorService;
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
      vendor_id: [order?.vendor_id || "", Validators.required],
      purpose: [order?.purpose || "", Validators.required],
      warehouse_id: [order?.warehouse_id || "", Validators.required],
      tentative_receipt_date: [order?.tentative_receipt_date || "", Validators.required],
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
    this.vendorService.getVendors().subscribe({
      next: (vendors) => {
        console.log("Vendors response:", vendors);
        const vendorArray = Array.isArray(vendors) ? vendors : vendors.data || [];
        this.vendors.set(vendorArray);
      },
      error: (error) => console.error("Error loading vendors:", error)
    });
    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log("Products response:", products);
        const productArray = Array.isArray(products) ? products : products.data || [];
        this.products.set(productArray);
      },
      error: (error) => console.error("Error loading products:", error)
    });
    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        console.log("Warehouses response:", warehouses);
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
    this.purchaseOrderService.getOrderById(id).subscribe({
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
      this.purchaseOrderService.updateOrder(id, formData).subscribe({
        next: (order) => {
          alert("Orden actualizada exitosamente");
          this.router.navigate(["/purchase-orders", order.id]);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
          this.saving.set(false);
        }
      });
    } else {
      this.purchaseOrderService.createOrder(formData).subscribe({
        next: (order) => {
          alert("Orden creada exitosamente");
          this.router.navigate(["/purchase-orders", order.id]);
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
      this.router.navigate(["/purchase-orders"]);
    }
  }
  /**
   * Format currency
   */
  formatCurrency(amount) {
    return this.taxCalculator.formatCurrency(amount);
  }
  static \u0275fac = function PurchaseOrderFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PurchaseOrderFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(TaxCalculatorService), \u0275\u0275directiveInject(VendorService), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(WarehouseService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PurchaseOrderFormComponent, selectors: [["app-purchase-order-form"]], decls: 73, vars: 17, consts: [[1, "purchase-order-form"], [1, "header"], [3, "ngSubmit", "formGroup"], [1, "section"], [1, "form-grid"], [1, "form-field"], ["for", "vendor"], ["id", "vendor", "formControlName", "vendor_id"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "error", 4, "ngIf"], ["for", "warehouse"], ["id", "warehouse", "formControlName", "warehouse_id"], [1, "form-field", "full-width"], ["for", "purpose"], ["id", "purpose", "formControlName", "purpose", "rows", "3", "placeholder", "Describe el prop\xF3sito de esta orden de compra"], ["for", "date"], ["type", "date", "id", "date", "formControlName", "tentative_receipt_date"], [1, "section-header"], ["type", "button", 1, "btn-add", 3, "click"], ["formArrayName", "line_items", 1, "line-items"], ["class", "line-item", 3, "formGroupName", 4, "ngFor", "ngForOf"], ["class", "empty-line-items", 4, "ngIf"], [1, "section", "totals-section"], [1, "totals-grid"], [1, "total-item"], [1, "total-item", "grand-total"], [1, "form-actions"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "submit", 1, "btn-save", 3, "disabled"], [3, "value"], [1, "error"], [1, "line-item", 3, "formGroupName"], [1, "line-item-header"], ["type", "button", 1, "btn-remove", 3, "click"], [1, "line-item-grid"], ["formControlName", "product_id", 3, "change"], ["formControlName", "uom_id"], ["type", "number", "formControlName", "quantity", "min", "0.01", "step", "0.01"], ["type", "number", "formControlName", "unit_price", "min", "0", "step", "0.01"], ["type", "number", "formControlName", "iva_percentage", "min", "0", "max", "100"], ["type", "number", "formControlName", "ieps_percentage", "min", "0", "max", "100"], [1, "line-calculations"], [1, "calc-item"], [1, "calc-item", "total"], [1, "empty-line-items"]], template: function PurchaseOrderFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "form", 2);
      \u0275\u0275listener("ngSubmit", function PurchaseOrderFormComponent_Template_form_ngSubmit_4_listener() {
        return ctx.save();
      });
      \u0275\u0275elementStart(5, "div", 3)(6, "h2");
      \u0275\u0275text(7, "Informaci\xF3n General");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 4)(9, "div", 5)(10, "label", 6);
      \u0275\u0275text(11, "Proveedor *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "select", 7)(13, "option", 8);
      \u0275\u0275text(14, "Selecciona un proveedor");
      \u0275\u0275elementEnd();
      \u0275\u0275template(15, PurchaseOrderFormComponent_option_15_Template, 2, 2, "option", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275template(16, PurchaseOrderFormComponent_span_16_Template, 2, 1, "span", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 5)(18, "label", 11);
      \u0275\u0275text(19, "Almac\xE9n *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "select", 12)(21, "option", 8);
      \u0275\u0275text(22, "Selecciona un almac\xE9n");
      \u0275\u0275elementEnd();
      \u0275\u0275template(23, PurchaseOrderFormComponent_option_23_Template, 2, 2, "option", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275template(24, PurchaseOrderFormComponent_span_24_Template, 2, 1, "span", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 13)(26, "label", 14);
      \u0275\u0275text(27, "Prop\xF3sito *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "textarea", 15);
      \u0275\u0275template(29, PurchaseOrderFormComponent_span_29_Template, 2, 1, "span", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 5)(31, "label", 16);
      \u0275\u0275text(32, "Fecha Estimada de Recepci\xF3n *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(33, "input", 17);
      \u0275\u0275template(34, PurchaseOrderFormComponent_span_34_Template, 2, 1, "span", 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 3)(36, "div", 18)(37, "h2");
      \u0275\u0275text(38, "L\xEDneas de Productos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "button", 19);
      \u0275\u0275listener("click", function PurchaseOrderFormComponent_Template_button_click_39_listener() {
        return ctx.addLineItem();
      });
      \u0275\u0275text(40, " + Agregar Producto ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 20);
      \u0275\u0275template(42, PurchaseOrderFormComponent_div_42_Template, 64, 14, "div", 21)(43, PurchaseOrderFormComponent_div_43_Template, 3, 0, "div", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div", 23)(45, "h2");
      \u0275\u0275text(46, "Totales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 24)(48, "div", 25)(49, "span");
      \u0275\u0275text(50, "Subtotal:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "strong");
      \u0275\u0275text(52);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 25)(54, "span");
      \u0275\u0275text(55, "Total IVA:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "strong");
      \u0275\u0275text(57);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 25)(59, "span");
      \u0275\u0275text(60, "Total IEPS:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "strong");
      \u0275\u0275text(62);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 26)(64, "span");
      \u0275\u0275text(65, "Gran Total:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "strong");
      \u0275\u0275text(67);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(68, "div", 27)(69, "button", 28);
      \u0275\u0275listener("click", function PurchaseOrderFormComponent_Template_button_click_69_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(70, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "button", 29);
      \u0275\u0275text(72);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.isEditMode() ? "Editar" : "Crear", " Orden de Compra");
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.orderForm);
      \u0275\u0275advance(11);
      \u0275\u0275property("ngForOf", ctx.vendors());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.getFieldError("vendor_id"));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.warehouses());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.getFieldError("warehouse_id"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.getFieldError("purpose"));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.getFieldError("tentative_receipt_date"));
      \u0275\u0275advance(8);
      \u0275\u0275property("ngForOf", ctx.lineItems.controls);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.lineItems.length === 0);
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
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, FormGroupName, FormArrayName], styles: ["\n\n.purchase-order-form[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n  color: #111827;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background-color: #10b981;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .btn-add[_ngcontent-%COMP%]:hover {\n  background-color: #059669;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 0.25rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0;\n  color: #111827;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  background-color: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-header[_ngcontent-%COMP%]   .btn-remove[_ngcontent-%COMP%]:hover {\n  background-color: #dc2626;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-item-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1rem;\n  padding: 1rem;\n  background-color: #f9fafb;\n  border-radius: 0.375rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .line-item[_ngcontent-%COMP%]   .line-calculations[_ngcontent-%COMP%]   .calc-item.total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #6366f1;\n  font-size: 1rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .line-items[_ngcontent-%COMP%]   .empty-line-items[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  color: #6b7280;\n  background-color: #f9fafb;\n  border-radius: 0.5rem;\n  border: 2px dashed #d1d5db;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n  border: 2px solid #e5e7eb;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background-color: white;\n  border-radius: 0.375rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #111827;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item.grand-total[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item.grand-total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.purchase-order-form[_ngcontent-%COMP%]   .totals-section[_ngcontent-%COMP%]   .totals-grid[_ngcontent-%COMP%]   .total-item.grand-total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 1.125rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1.5rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button.btn-cancel[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button.btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #d1d5db;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button.btn-save[_ngcontent-%COMP%] {\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   button.btn-save[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #4f46e5;\n}\n/*# sourceMappingURL=purchase-order-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PurchaseOrderFormComponent, [{
    type: Component,
    args: [{ selector: "app-purchase-order-form", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="purchase-order-form">\r
  <div class="header">\r
    <h1>{{ isEditMode() ? 'Editar' : 'Crear' }} Orden de Compra</h1>\r
  </div>\r
\r
  <form [formGroup]="orderForm" (ngSubmit)="save()">\r
    <!-- General Information Section -->\r
    <div class="section">\r
      <h2>Informaci\xF3n General</h2>\r
      <div class="form-grid">\r
        <div class="form-field">\r
          <label for="vendor">Proveedor *</label>\r
          <select id="vendor" formControlName="vendor_id">\r
            <option value="">Selecciona un proveedor</option>\r
            <option *ngFor="let vendor of vendors()" [value]="vendor.id">\r
              {{ vendor.name }}\r
            </option>\r
          </select>\r
          <span class="error" *ngIf="getFieldError('vendor_id')">\r
            {{ getFieldError('vendor_id') }}\r
          </span>\r
        </div>\r
\r
        <div class="form-field">\r
          <label for="warehouse">Almac\xE9n *</label>\r
          <select id="warehouse" formControlName="warehouse_id">\r
            <option value="">Selecciona un almac\xE9n</option>\r
            <option *ngFor="let warehouse of warehouses()" [value]="warehouse.id">\r
              {{ warehouse.name }}\r
            </option>\r
          </select>\r
          <span class="error" *ngIf="getFieldError('warehouse_id')">\r
            {{ getFieldError('warehouse_id') }}\r
          </span>\r
        </div>\r
\r
        <div class="form-field full-width">\r
          <label for="purpose">Prop\xF3sito *</label>\r
          <textarea \r
            id="purpose" \r
            formControlName="purpose" \r
            rows="3"\r
            placeholder="Describe el prop\xF3sito de esta orden de compra"\r
          ></textarea>\r
          <span class="error" *ngIf="getFieldError('purpose')">\r
            {{ getFieldError('purpose') }}\r
          </span>\r
        </div>\r
\r
        <div class="form-field">\r
          <label for="date">Fecha Estimada de Recepci\xF3n *</label>\r
          <input \r
            type="date" \r
            id="date" \r
            formControlName="tentative_receipt_date"\r
          />\r
          <span class="error" *ngIf="getFieldError('tentative_receipt_date')">\r
            {{ getFieldError('tentative_receipt_date') }}\r
          </span>\r
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
        <div \r
          *ngFor="let item of lineItems.controls; let i = index" \r
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
                <option *ngFor="let product of products()" [value]="product.id">\r
                  {{ product.name }} ({{ product.sku }})\r
                </option>\r
              </select>\r
              <span class="error" *ngIf="getLineItemFieldError(i, 'product_id')">\r
                {{ getLineItemFieldError(i, 'product_id') }}\r
              </span>\r
            </div>\r
\r
            <div class="form-field">\r
              <label>UOM *</label>\r
              <select formControlName="uom_id">\r
                <option value="">Selecciona UOM</option>\r
                <option \r
                  *ngFor="let uom of getProduct(item.value.product_id)?.uoms" \r
                  [value]="uom.id"\r
                >\r
                  {{ uom.name }} ({{ uom.abbreviation }})\r
                </option>\r
              </select>\r
              <span class="error" *ngIf="getLineItemFieldError(i, 'uom_id')">\r
                {{ getLineItemFieldError(i, 'uom_id') }}\r
              </span>\r
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
              <span class="error" *ngIf="getLineItemFieldError(i, 'quantity')">\r
                {{ getLineItemFieldError(i, 'quantity') }}\r
              </span>\r
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
              <span class="error" *ngIf="getLineItemFieldError(i, 'unit_price')">\r
                {{ getLineItemFieldError(i, 'unit_price') }}\r
              </span>\r
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
              <span class="error" *ngIf="getLineItemFieldError(i, 'iva_percentage')">\r
                {{ getLineItemFieldError(i, 'iva_percentage') }}\r
              </span>\r
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
              <span class="error" *ngIf="getLineItemFieldError(i, 'ieps_percentage')">\r
                {{ getLineItemFieldError(i, 'ieps_percentage') }}\r
              </span>\r
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
\r
        <div *ngIf="lineItems.length === 0" class="empty-line-items">\r
          <p>No hay productos agregados. Haz clic en "Agregar Producto" para comenzar.</p>\r
        </div>\r
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
`, styles: ["/* src/app/features/purchase-orders/pages/purchase-order-form/purchase-order-form.component.scss */\n.purchase-order-form {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.purchase-order-form .header {\n  margin-bottom: 1.5rem;\n}\n.purchase-order-form .header h1 {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.purchase-order-form .section {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-form .section h2 {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n  color: #111827;\n}\n.purchase-order-form .section .section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.purchase-order-form .section .section-header h2 {\n  margin: 0;\n}\n.purchase-order-form .section .section-header .btn-add {\n  padding: 0.5rem 1rem;\n  background-color: #10b981;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-form .section .section-header .btn-add:hover {\n  background-color: #059669;\n}\n.purchase-order-form .section .form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form .section .form-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form .section .form-field {\n  display: flex;\n  flex-direction: column;\n}\n.purchase-order-form .section .form-field.full-width {\n  grid-column: 1/-1;\n}\n.purchase-order-form .section .form-field label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n  margin-bottom: 0.25rem;\n}\n.purchase-order-form .section .form-field input,\n.purchase-order-form .section .form-field select,\n.purchase-order-form .section .form-field textarea {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n}\n.purchase-order-form .section .form-field input:focus,\n.purchase-order-form .section .form-field select:focus,\n.purchase-order-form .section .form-field textarea:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.purchase-order-form .section .form-field input:disabled,\n.purchase-order-form .section .form-field select:disabled,\n.purchase-order-form .section .form-field textarea:disabled {\n  background-color: #f3f4f6;\n  cursor: not-allowed;\n}\n.purchase-order-form .section .form-field textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.purchase-order-form .section .form-field .error {\n  color: #dc2626;\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.purchase-order-form .line-items .line-item {\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.purchase-order-form .line-items .line-item .line-item-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-form .line-items .line-item .line-item-header h3 {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0;\n  color: #111827;\n}\n.purchase-order-form .line-items .line-item .line-item-header .btn-remove {\n  padding: 0.25rem 0.75rem;\n  background-color: #ef4444;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-form .line-items .line-item .line-item-header .btn-remove:hover {\n  background-color: #dc2626;\n}\n.purchase-order-form .line-items .line-item .line-item-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form .line-items .line-item .line-item-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form .line-items .line-item .line-calculations {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1rem;\n  padding: 1rem;\n  background-color: #f9fafb;\n  border-radius: 0.375rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form .line-items .line-item .line-calculations {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.purchase-order-form .line-items .line-item .line-calculations .calc-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.purchase-order-form .line-items .line-item .line-calculations .calc-item span {\n  font-size: 0.75rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n.purchase-order-form .line-items .line-item .line-calculations .calc-item strong {\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-form .line-items .line-item .line-calculations .calc-item.total strong {\n  color: #6366f1;\n  font-size: 1rem;\n}\n.purchase-order-form .line-items .empty-line-items {\n  text-align: center;\n  padding: 2rem;\n  color: #6b7280;\n  background-color: #f9fafb;\n  border-radius: 0.5rem;\n  border: 2px dashed #d1d5db;\n}\n.purchase-order-form .totals-section {\n  background-color: #f9fafb;\n  border: 2px solid #e5e7eb;\n}\n.purchase-order-form .totals-section .totals-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .purchase-order-form .totals-section .totals-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.purchase-order-form .totals-section .totals-grid .total-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem;\n  background-color: white;\n  border-radius: 0.375rem;\n}\n.purchase-order-form .totals-section .totals-grid .total-item span {\n  font-size: 0.875rem;\n  color: #6b7280;\n  font-weight: 500;\n}\n.purchase-order-form .totals-section .totals-grid .total-item strong {\n  font-size: 1rem;\n  color: #111827;\n}\n.purchase-order-form .totals-section .totals-grid .total-item.grand-total {\n  grid-column: 1/-1;\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-form .totals-section .totals-grid .total-item.grand-total span,\n.purchase-order-form .totals-section .totals-grid .total-item.grand-total strong {\n  color: white;\n  font-size: 1.125rem;\n}\n.purchase-order-form .form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1.5rem;\n}\n.purchase-order-form .form-actions button {\n  padding: 0.75rem 1.5rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-form .form-actions button:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.purchase-order-form .form-actions button.btn-cancel {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-form .form-actions button.btn-cancel:hover:not(:disabled) {\n  background-color: #d1d5db;\n}\n.purchase-order-form .form-actions button.btn-save {\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-form .form-actions button.btn-save:hover:not(:disabled) {\n  background-color: #4f46e5;\n}\n/*# sourceMappingURL=purchase-order-form.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ActivatedRoute }, { type: Router }, { type: PurchaseOrderService }, { type: TaxCalculatorService }, { type: VendorService }, { type: ProductService }, { type: WarehouseService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PurchaseOrderFormComponent, { className: "PurchaseOrderFormComponent", filePath: "src/app/features/purchase-orders/pages/purchase-order-form/purchase-order-form.component.ts", lineNumber: 23 });
})();
export {
  PurchaseOrderFormComponent
};
//# sourceMappingURL=chunk-WTTEPC3R.js.map
