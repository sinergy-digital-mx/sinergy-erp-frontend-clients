import {
  ProductService,
  WarehouseService
} from "./chunk-C5Q32U4C.js";
import {
  CloseShiftDialogComponent,
  OpenShiftDialogComponent
} from "./chunk-TTBBWZH7.js";
import "./chunk-SWPKLNPW.js";
import "./chunk-E7QIYR5Q.js";
import {
  POSService
} from "./chunk-MGEJLMJK.js";
import {
  Banknote,
  CircleAlert,
  CreditCard,
  FileText,
  LogIn,
  LogOut,
  LucideAngularComponent,
  LucideAngularModule,
  Minus,
  Monitor,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Store,
  Trash2
} from "./chunk-XYBC4MWB.js";
import {
  MatSnackBar
} from "./chunk-KNFYVOET.js";
import {
  MatDialog
} from "./chunk-OO2OLRGJ.js";
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
} from "./chunk-TXPVZZCM.js";
import {
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule
} from "./chunk-GZH4LDOW.js";
import {
  Component,
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
  ɵɵproperty,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7ZU2RCPO.js";

// src/app/features/pos/pages/take-order/take-order.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function TakeOrderComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r1 = ctx.$implicit;
    \u0275\u0275property("value", w_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r1.name);
  }
}
function TakeOrderComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "Comprobando sesi\xF3n\u2026");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 ", ctx_r1.sessionOpenedLabel());
  }
}
function TakeOrderComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275element(1, "lucide-icon", 15);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Sesi\xF3n activa");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 48);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, TakeOrderComponent_Conditional_15_Conditional_6_Template, 2, 1, "span", 48);
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
function TakeOrderComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "lucide-icon", 15);
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
function TakeOrderComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePosSession());
    });
    \u0275\u0275element(1, "lucide-icon", 50);
    \u0275\u0275text(2, " Cerrar sesi\xF3n ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.LogOut);
  }
}
function TakeOrderComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPosSession());
    });
    \u0275\u0275element(1, "lucide-icon", 50);
    \u0275\u0275text(2, " Iniciar sesi\xF3n ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.LogIn);
  }
}
function TakeOrderComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 52);
    \u0275\u0275element(2, "lucide-icon", 53);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Sesi\xF3n POS requerida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Inicia sesi\xF3n en la barra superior para cargar el carrito y registrar ventas.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 54);
    \u0275\u0275listener("click", function TakeOrderComponent_Conditional_24_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPosSession());
    });
    \u0275\u0275text(8, " Iniciar sesi\xF3n ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.LogIn);
  }
}
function TakeOrderComponent_For_34_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 58);
  }
}
function TakeOrderComponent_For_34_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
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
function TakeOrderComponent_For_34_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275text(1, "Sin precio");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 55);
    \u0275\u0275listener("click", function TakeOrderComponent_For_34_Template_article_click_0_listener() {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.canAddToCart(product_r7) && ctx_r1.addProductToCart(product_r7));
    });
    \u0275\u0275elementStart(1, "div", 56)(2, "img", 57);
    \u0275\u0275listener("error", function TakeOrderComponent_For_34_Template_img_error_2_listener() {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPhotoError(product_r7.id));
    })("load", function TakeOrderComponent_For_34_Template_img_load_2_listener() {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPhotoLoad(product_r7.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, TakeOrderComponent_For_34_Conditional_3_Template, 1, 0, "div", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 59)(5, "h3", 60);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 61);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 62);
    \u0275\u0275conditionalCreate(10, TakeOrderComponent_For_34_Conditional_10_Template, 2, 1, "span", 63)(11, TakeOrderComponent_For_34_Conditional_11_Template, 2, 0, "span", 64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 65);
    \u0275\u0275listener("click", function TakeOrderComponent_For_34_Template_button_click_12_listener($event) {
      const product_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.addProductToCart(product_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(13, "lucide-icon", 7);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Agregar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("pos-card--disabled", !ctx_r1.canAddToCart(product_r7));
    \u0275\u0275attribute("title", ctx_r1.getDisabledTooltip(product_r7));
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx_r1.getProductPhotoUrl(product_r7), \u0275\u0275sanitizeUrl)("alt", product_r7.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isPhotoLoading(product_r7.id) ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r7.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r7.sku);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(product_r7.has_price ? 10 : 11);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.canAddToCart(product_r7));
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Plus);
  }
}
function TakeOrderComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275element(1, "lucide-icon", 66);
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
function TakeOrderComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "div", 67);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando cat\xE1logo\u2026");
    \u0275\u0275elementEnd()();
  }
}
function TakeOrderComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 68)(2, "div", 69)(3, "h4");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 70);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 71);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 72);
    \u0275\u0275listener("click", function TakeOrderComponent_For_45_Template_button_click_9_listener() {
      const \u0275$index_171_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeItem(\u0275$index_171_r9));
    });
    \u0275\u0275element(10, "lucide-icon", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 73)(12, "div", 74)(13, "button", 75);
    \u0275\u0275listener("click", function TakeOrderComponent_For_45_Template_button_click_13_listener() {
      const ctx_r9 = \u0275\u0275restoreView(_r8);
      const item_r11 = ctx_r9.$implicit;
      const \u0275$index_171_r9 = ctx_r9.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_171_r9, item_r11.quantity - 1));
    });
    \u0275\u0275element(14, "lucide-icon", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 77);
    \u0275\u0275listener("change", function TakeOrderComponent_For_45_Template_input_change_15_listener($event) {
      const \u0275$index_171_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_171_r9, +$event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 75);
    \u0275\u0275listener("click", function TakeOrderComponent_For_45_Template_button_click_16_listener() {
      const ctx_r11 = \u0275\u0275restoreView(_r8);
      const item_r11 = ctx_r11.$implicit;
      const \u0275$index_171_r9 = ctx_r11.$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.updateQuantity(\u0275$index_171_r9, item_r11.quantity + 1));
    });
    \u0275\u0275element(17, "lucide-icon", 76);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "span", 78);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 79)(21, "label");
    \u0275\u0275text(22, "Peso (kg)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 80);
    \u0275\u0275twoWayListener("ngModelChange", function TakeOrderComponent_For_45_Template_input_ngModelChange_23_listener($event) {
      const item_r11 = \u0275\u0275restoreView(_r8).$implicit;
      \u0275\u0275twoWayBindingSet(item_r11.weight, $event) || (item_r11.weight = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r11.product_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r11.product_sku);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.formatCurrency(item_r11.unit_price), " \xB7 ", item_r11.uom_name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Trash2);
    \u0275\u0275advance(4);
    \u0275\u0275property("img", ctx_r1.Minus);
    \u0275\u0275advance();
    \u0275\u0275property("value", item_r11.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Plus);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r11.line_total));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r11.weight);
  }
}
function TakeOrderComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "lucide-icon", 81);
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
function TakeOrderComponent_Conditional_81_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 85);
    \u0275\u0275text(1, "Monto insuficiente para el total");
    \u0275\u0275elementEnd();
  }
}
function TakeOrderComponent_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43)(1, "label", 82)(2, "span");
    \u0275\u0275text(3, "Cantidad recibida");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 83);
    \u0275\u0275listener("ngModelChange", function TakeOrderComponent_Conditional_81_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAmountPaidChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 84)(6, "span");
    \u0275\u0275text(7, "Cambio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "output");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(10, TakeOrderComponent_Conditional_81_Conditional_10_Template, 2, 0, "p", 85);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.amountPaid);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.calculateChange()));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isPaymentValid() && ctx_r1.posService.cart().grand_total > 0 ? 10 : -1);
  }
}
var TakeOrderComponent = class _TakeOrderComponent {
  posService;
  productService;
  warehouseService;
  router;
  snackBar;
  dialog;
  Search = Search;
  Plus = Plus;
  ShoppingCart = ShoppingCart;
  Trash2 = Trash2;
  Minus = Minus;
  Store = Store;
  CreditCard = CreditCard;
  Banknote = Banknote;
  FileText = FileText;
  LogIn = LogIn;
  LogOut = LogOut;
  Monitor = Monitor;
  Package = Package;
  AlertCircle = CircleAlert;
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
  photoLoadingStates = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "photoLoadingStates" }] : []);
  photoErrorStates = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "photoErrorStates" }] : []);
  paymentMethod = signal("cash", ...ngDevMode ? [{ debugName: "paymentMethod" }] : []);
  /** Usa propiedad para ngModel (evita conflicto con signal). */
  amountPaid = 0;
  terminalId = signal("Terminal-001", ...ngDevMode ? [{ debugName: "terminalId" }] : []);
  /** Turno de caja = sesión POS en API actual */
  activePosSession = signal(null, ...ngDevMode ? [{ debugName: "activePosSession" }] : []);
  checkingSession = signal(false, ...ngDevMode ? [{ debugName: "checkingSession" }] : []);
  constructor(posService, productService, warehouseService, router, snackBar, dialog) {
    this.posService = posService;
    this.productService = productService;
    this.warehouseService = warehouseService;
    this.router = router;
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  sessionOk = computed(() => !!this.activePosSession(), ...ngDevMode ? [{ debugName: "sessionOk" }] : []);
  ngOnInit() {
    this.loadData();
  }
  selectedWarehouseName() {
    const id = this.selectedWarehouse();
    const w = this.warehouses().find((x) => x.id === id);
    return w?.name ?? "Almac\xE9n";
  }
  loadData() {
    this.loading.set(true);
    this.priceListError.set(false);
    this.productService.getProducts().subscribe({
      next: (products) => {
        const productArray = Array.isArray(products) ? products : products.data || [];
        const productsWithPrices = productArray.map((p) => __spreadProps(__spreadValues({}, p), {
          cost: Math.round((Math.random() * (41.6 - 33.5) + 33.5) * 100) / 100,
          has_price: true
        }));
        this.products.set(productsWithPrices);
        this.filteredProducts.set(productsWithPrices);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open("Error al cargar productos", "Cerrar", { duration: 5e3 });
      }
    });
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
      },
      error: () => {
        this.snackBar.open("Error al cargar almacenes", "Cerrar", { duration: 5e3 });
      }
    });
  }
  onWarehouseSelect(warehouseId) {
    this.selectedWarehouse.set(warehouseId);
    if (warehouseId) {
      localStorage.setItem("pos_warehouse_id", warehouseId);
    }
    this.refreshPosSession();
  }
  refreshPosSession() {
    const wid = this.selectedWarehouse();
    if (!wid) {
      this.activePosSession.set(null);
      this.checkingSession.set(false);
      return;
    }
    this.checkingSession.set(true);
    this.posService.getActivePosSession(wid).subscribe({
      next: (session) => {
        this.activePosSession.set(session && session.id ? session : null);
        this.checkingSession.set(false);
      },
      error: () => {
        this.activePosSession.set(null);
        this.checkingSession.set(false);
      }
    });
  }
  openPosSession() {
    const dialogRef = this.dialog.open(OpenShiftDialogComponent, {
      width: "520px",
      maxWidth: "95vw",
      disableClose: true,
      panelClass: "pos-dialog-panel"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const { warehouse_id, opening_balance } = result;
      this.selectedWarehouse.set(warehouse_id);
      localStorage.setItem("pos_warehouse_id", warehouse_id);
      this.checkingSession.set(true);
      this.posService.openPosSession({
        warehouse_id,
        cashier_id: "",
        opening_balance
      }).subscribe({
        next: (session) => {
          this.activePosSession.set(session);
          this.checkingSession.set(false);
          this.snackBar.open("Sesi\xF3n POS iniciada", "Cerrar", { duration: 3e3 });
        },
        error: (error) => {
          this.checkingSession.set(false);
          this.snackBar.open(error.error?.message || "No se pudo iniciar la sesi\xF3n", "Cerrar", { duration: 5e3 });
        }
      });
    });
  }
  closePosSession() {
    const session = this.activePosSession();
    if (!session?.id) {
      return;
    }
    const dialogRef = this.dialog.open(CloseShiftDialogComponent, {
      width: "640px",
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
          this.checkingSession.set(false);
          this.snackBar.open("Sesi\xF3n cerrada", "Cerrar", { duration: 4e3 });
        },
        error: (error) => {
          this.checkingSession.set(false);
          this.snackBar.open(error.error?.message || "Error al cerrar la sesi\xF3n", "Cerrar", { duration: 5e3 });
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
      this.snackBar.open("Inicia sesi\xF3n POS para agregar productos", "Cerrar", {
        duration: 4e3
      });
      return;
    }
    if (!product.has_price) {
      this.snackBar.open("Este producto no tiene precio configurado", "Cerrar", {
        duration: 3e3
      });
      return;
    }
    let baseUom = { id: "default-uom", name: "Pieza" };
    if (product.uoms && product.uoms.length > 0) {
      baseUom = product.uoms.find((u) => u.id === product.base_uom_id) || product.uoms[0];
    }
    const cartItem = {
      product_id: product.id,
      product_name: product.name,
      product_sku: product.sku,
      uom_id: baseUom.id,
      uom_name: baseUom.name || "Pieza",
      quantity: 1,
      unit_price: product.cost || 0,
      iva_percentage: 16,
      ieps_percentage: 0,
      subtotal: 0,
      iva_amount: 0,
      ieps_amount: 0,
      line_total: 0
    };
    const subtotal = cartItem.quantity * cartItem.unit_price;
    const iva_amount = subtotal * (cartItem.iva_percentage / 100);
    const ieps_amount = subtotal * (cartItem.ieps_percentage / 100);
    cartItem.subtotal = subtotal;
    cartItem.iva_amount = iva_amount;
    cartItem.ieps_amount = ieps_amount;
    cartItem.line_total = subtotal + iva_amount + ieps_amount;
    this.posService.addItem(cartItem);
    this.snackBar.open(`${product.name} agregado`, "Cerrar", { duration: 2e3 });
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
  saveOrder() {
    if (!this.sessionOk()) {
      this.snackBar.open("Debes tener una sesi\xF3n POS activa", "Cerrar", {
        duration: 4e3
      });
      return;
    }
    if (!this.selectedWarehouse()) {
      this.snackBar.open("Selecciona un almac\xE9n", "Cerrar", { duration: 3e3 });
      return;
    }
    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.snackBar.open("Agrega productos a la orden", "Cerrar", { duration: 3e3 });
      return;
    }
    this.saving.set(true);
    const orderData = {
      warehouse_id: this.selectedWarehouse(),
      line_items: cart.items.map((item) => ({
        product_id: item.product_id,
        uom_id: item.uom_id,
        quantity: item.quantity,
        discount_percentage: 0
      }))
    };
    this.posService.createOrder(orderData).subscribe({
      next: () => {
        this.snackBar.open("Orden creada exitosamente", "Cerrar", { duration: 3e3 });
        this.posService.clearCart();
        this.amountPaid = 0;
        this.router.navigate(["/pos"]);
      },
      error: (error) => {
        this.snackBar.open(error.message || "Error al crear orden", "Cerrar", {
          duration: 5e3
        });
        this.saving.set(false);
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
    return "/images/product-placeholder.svg";
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
    return product.has_price === true;
  }
  getDisabledTooltip(product) {
    if (!this.sessionOk()) {
      return "Inicia sesi\xF3n POS para vender";
    }
    if (!product.has_price) {
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
  static \u0275fac = function TakeOrderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TakeOrderComponent)(\u0275\u0275directiveInject(POSService), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TakeOrderComponent, selectors: [["app-take-order"]], decls: 87, vars: 36, consts: [[1, "pos-take-root"], [1, "pos-session-bar"], [1, "pos-session-bar__content"], [1, "pos-session-bar__left"], [1, "pos-session-bar__title"], [1, "pos-session-bar__title-icon", 3, "img"], [1, "pos-session-bar__warehouse"], [1, "pos-ic", 3, "img"], [1, "pos-session-bar__select", 3, "ngModelChange", "ngModel", "disabled"], [3, "value"], [1, "pos-session-bar__center"], [1, "pos-session-bar__checking"], [1, "pos-pill", "pos-pill--warn"], [1, "pos-session-bar__right"], [1, "pos-terminal-chip"], [1, "pos-ic", "pos-ic--sm", 3, "img"], ["type", "button", 1, "pos-btn", "pos-btn--ghost"], ["type", "button", 1, "pos-btn", "pos-btn--primary"], [1, "pos-take-body"], ["aria-hidden", "true", 1, "pos-lock-overlay"], [1, "pos-catalog"], [1, "pos-catalog__toolbar"], [1, "pos-search"], [1, "pos-search__icon", 3, "img"], ["type", "search", "placeholder", "Buscar por nombre o SKU\u2026", "autocomplete", "off", 1, "pos-search__input", 3, "ngModelChange", "ngModel"], [1, "pos-catalog__hint"], [1, "pos-product-grid"], [1, "pos-card", 3, "pos-card--disabled"], [1, "pos-empty-grid"], [1, "pos-loading-grid"], [1, "pos-cart"], [1, "pos-cart__head"], [1, "pos-cart__head-title"], [1, "pos-cart__lines"], [1, "pos-line"], [1, "pos-cart-empty"], [1, "pos-cart__summary"], [1, "pos-sum-row"], [1, "pos-sum-row", "pos-sum-row--total"], [1, "pos-pay"], [1, "pos-pay__title"], [1, "pos-pay__methods"], ["type", "button", 1, "pos-pay__method", 3, "click"], [1, "pos-cash"], [1, "pos-cart__actions"], ["type", "button", 1, "pos-btn", "pos-btn--muted", 3, "click", "disabled"], ["type", "button", 1, "pos-btn", "pos-btn--accent", 3, "click", "disabled"], [1, "pos-pill", "pos-pill--ok"], [1, "pos-session-meta"], ["type", "button", 1, "pos-btn", "pos-btn--ghost", 3, "click"], [1, "pos-ic", "pos-ic--btn", 3, "img"], ["type", "button", 1, "pos-btn", "pos-btn--primary", 3, "click"], [1, "pos-lock-card"], [1, "pos-lock-card__icon", 3, "img"], ["type", "button", 1, "pos-btn", "pos-btn--primary", "pos-btn--lg", 3, "click"], [1, "pos-card", 3, "click"], [1, "pos-card__media"], ["loading", "lazy", 3, "error", "load", "src", "alt"], [1, "pos-card__media-loading"], [1, "pos-card__body"], [1, "pos-card__name"], [1, "pos-card__sku"], [1, "pos-card__price-row"], [1, "pos-card__price"], [1, "pos-card__no-price"], ["type", "button", 1, "pos-card__add", 3, "click", "disabled"], [1, "pos-empty-grid__icon", 3, "img"], [1, "pos-spinner"], [1, "pos-line__main"], [1, "pos-line__info"], [1, "pos-line__sku"], [1, "pos-line__unit"], ["type", "button", "title", "Quitar", 1, "pos-line__remove", 3, "click"], [1, "pos-line__controls"], [1, "pos-qty"], ["type", "button", 3, "click"], [1, "pos-ic", "pos-ic--xs", 3, "img"], ["type", "number", "min", "1", 3, "change", "value"], [1, "pos-line__total"], [1, "pos-line__weight"], ["type", "number", "placeholder", "\u2014", "min", "0", "step", "0.1", 3, "ngModelChange", "ngModel"], [1, "pos-cart-empty__icon", 3, "img"], [1, "pos-cash__field"], ["type", "number", "min", "0", "step", "0.01", 3, "ngModelChange", "ngModel"], [1, "pos-cash__change"], [1, "pos-cash__warn"]], template: function TakeOrderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "lucide-icon", 5);
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7, "Punto de Venta");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 6);
      \u0275\u0275element(9, "lucide-icon", 7);
      \u0275\u0275elementStart(10, "select", 8);
      \u0275\u0275listener("ngModelChange", function TakeOrderComponent_Template_select_ngModelChange_10_listener($event) {
        return ctx.onWarehouseSelect($event);
      });
      \u0275\u0275repeaterCreate(11, TakeOrderComponent_For_12_Template, 2, 2, "option", 9, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 10);
      \u0275\u0275conditionalCreate(14, TakeOrderComponent_Conditional_14_Template, 2, 0, "span", 11)(15, TakeOrderComponent_Conditional_15_Template, 7, 3)(16, TakeOrderComponent_Conditional_16_Template, 4, 1, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 13)(18, "div", 14);
      \u0275\u0275element(19, "lucide-icon", 15);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, TakeOrderComponent_Conditional_21_Template, 3, 1, "button", 16);
      \u0275\u0275conditionalCreate(22, TakeOrderComponent_Conditional_22_Template, 3, 1, "button", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 18);
      \u0275\u0275conditionalCreate(24, TakeOrderComponent_Conditional_24_Template, 9, 1, "div", 19);
      \u0275\u0275elementStart(25, "section", 20)(26, "div", 21)(27, "div", 22);
      \u0275\u0275element(28, "lucide-icon", 23);
      \u0275\u0275elementStart(29, "input", 24);
      \u0275\u0275listener("ngModelChange", function TakeOrderComponent_Template_input_ngModelChange_29_listener($event) {
        ctx.searchTerm.set($event);
        return ctx.onSearchChange();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "p", 25);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 26);
      \u0275\u0275repeaterCreate(33, TakeOrderComponent_For_34_Template, 16, 11, "article", 27, _forTrack0);
      \u0275\u0275conditionalCreate(35, TakeOrderComponent_Conditional_35_Template, 4, 1, "div", 28);
      \u0275\u0275conditionalCreate(36, TakeOrderComponent_Conditional_36_Template, 4, 0, "div", 29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "aside", 30)(38, "div", 31)(39, "div", 32);
      \u0275\u0275element(40, "lucide-icon", 7);
      \u0275\u0275elementStart(41, "h2");
      \u0275\u0275text(42, "Orden actual");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 33);
      \u0275\u0275repeaterCreate(44, TakeOrderComponent_For_45_Template, 24, 10, "div", 34, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(46, TakeOrderComponent_Conditional_46_Template, 6, 1, "div", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 36)(48, "div", 37)(49, "span");
      \u0275\u0275text(50, "Subtotal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "strong");
      \u0275\u0275text(52);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 37)(54, "span");
      \u0275\u0275text(55, "IVA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "strong");
      \u0275\u0275text(57);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 37)(59, "span");
      \u0275\u0275text(60, "IEPS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "strong");
      \u0275\u0275text(62);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(63, "div", 38)(64, "span");
      \u0275\u0275text(65, "Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "strong");
      \u0275\u0275text(67);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(68, "div", 39)(69, "h3", 40);
      \u0275\u0275text(70, "M\xE9todo de pago");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "div", 41)(72, "button", 42);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_72_listener() {
        return ctx.paymentMethod.set("cash");
      });
      \u0275\u0275element(73, "lucide-icon", 7);
      \u0275\u0275text(74, " Efectivo ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "button", 42);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_75_listener() {
        return ctx.paymentMethod.set("card");
      });
      \u0275\u0275element(76, "lucide-icon", 7);
      \u0275\u0275text(77, " Tarjeta ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "button", 42);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_78_listener() {
        return ctx.paymentMethod.set("credit");
      });
      \u0275\u0275element(79, "lucide-icon", 7);
      \u0275\u0275text(80, " Cr\xE9dito ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(81, TakeOrderComponent_Conditional_81_Template, 11, 3, "div", 43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "div", 44)(83, "button", 45);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_83_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(84, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "button", 46);
      \u0275\u0275listener("click", function TakeOrderComponent_Template_button_click_85_listener() {
        return ctx.saveOrder();
      });
      \u0275\u0275text(86);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.Monitor);
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.Store);
      \u0275\u0275advance();
      \u0275\u0275property("ngModel", ctx.selectedWarehouse())("disabled", ctx.checkingSession());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.warehouses());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.checkingSession() ? 14 : ctx.activePosSession() ? 15 : 16);
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.Monitor);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.terminalId(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.checkingSession() && ctx.activePosSession() ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.checkingSession() && !ctx.activePosSession() ? 22 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("pos-take-body--locked", !ctx.sessionOk());
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.sessionOk() ? 24 : -1);
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
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.posService.cart().items);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.posService.cart().items.length === 0 ? 46 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.posService.cart().total_subtotal));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.posService.cart().total_iva));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.posService.cart().total_ieps));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.posService.cart().grand_total));
      \u0275\u0275advance(5);
      \u0275\u0275classProp("pos-pay__method--on", ctx.paymentMethod() === "cash");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.Banknote);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("pos-pay__method--on", ctx.paymentMethod() === "card");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.CreditCard);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("pos-pay__method--on", ctx.paymentMethod() === "credit");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.FileText);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.paymentMethod() === "cash" ? 81 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.saving() || !ctx.sessionOk() || ctx.posService.cart().items.length === 0 || !ctx.isPaymentValid());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.saving() ? "Guardando\u2026" : "Guardar orden", " ");
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, NgModel, LucideAngularModule, LucideAngularComponent], styles: ['@charset "UTF-8";\n\n\n\n[_nghost-%COMP%] {\n  --pos-bg: #0f172a;\n  --pos-surface: #ffffff;\n  --pos-muted: #64748b;\n  --pos-border: #e2e8f0;\n  --pos-accent: #6366f1;\n  --pos-accent2: #8b5cf6;\n  --pos-success: #10b981;\n  --pos-warn: #f59e0b;\n  --pos-radius: 14px;\n  --pos-shadow: 0 10px 40px -12px rgba(15, 23, 42, 0.18);\n  display: block;\n  min-height: 100%;\n}\n.pos-take-root[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 0px);\n  display: flex;\n  flex-direction: column;\n  background: #f1f5f9;\n}\n.pos-session-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  background:\n    linear-gradient(\n      105deg,\n      #0f172a 0%,\n      #1e1b4b 45%,\n      #312e81 100%);\n  color: #f8fafc;\n  padding: 0.65rem 1.25rem;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.35);\n  position: relative;\n  z-index: 20;\n}\n.pos-session-bar__content[_ngcontent-%COMP%] {\n  max-width: 1680px;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.75rem 1.25rem;\n  justify-content: space-between;\n}\n.pos-session-bar__left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem;\n}\n.pos-session-bar__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 700;\n  font-size: 1rem;\n  letter-spacing: -0.02em;\n}\n.pos-session-bar__title-icon[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  opacity: 0.95;\n}\n.pos-session-bar__warehouse[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 10px;\n  padding: 0.25rem 0.6rem 0.25rem 0.45rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n}\n.pos-session-bar__select[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #f8fafc;\n  font-size: 0.875rem;\n  font-weight: 500;\n  max-width: 200px;\n  cursor: pointer;\n  padding: 0.35rem 0.25rem;\n}\n.pos-session-bar__select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  color: #0f172a;\n}\n.pos-session-bar__select[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.pos-session-bar__center[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem 0.75rem;\n  min-width: 200px;\n}\n.pos-session-bar__checking[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  opacity: 0.85;\n}\n.pos-session-meta[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  opacity: 0.75;\n}\n.pos-session-bar__right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.pos-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.pos-pill--ok[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.2);\n  color: #a7f3d0;\n  border: 1px solid rgba(16, 185, 129, 0.35);\n}\n.pos-pill--warn[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fde68a;\n  border: 1px solid rgba(245, 158, 11, 0.35);\n}\n.pos-terminal-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: rgba(99, 102, 241, 0.35);\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  border: 1px solid rgba(165, 180, 252, 0.35);\n}\n.pos-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45rem 0.9rem;\n  cursor: pointer;\n  border: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s;\n}\n.pos-btn--primary[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #312e81;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);\n}\n.pos-btn--primary[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);\n}\n.pos-btn--ghost[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fecaca;\n  border: 1px solid rgba(248, 113, 113, 0.35);\n}\n.pos-btn--ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(248, 113, 113, 0.2);\n}\n.pos-btn--muted[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #64748b;\n  border: 1px solid var(--pos-border);\n}\n.pos-btn--accent[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      var(--pos-accent),\n      var(--pos-accent2));\n  color: #fff;\n  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);\n}\n.pos-btn--accent[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.pos-btn--lg[_ngcontent-%COMP%] {\n  padding: 0.65rem 1.25rem;\n  font-size: 0.9rem;\n}\n.pos-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.pos-ic[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n}\n.pos-ic--sm[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.pos-ic--xs[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n.pos-ic--btn[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n.pos-take-body[_ngcontent-%COMP%] {\n  flex: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1.65fr) minmax(320px, 420px);\n  gap: 0;\n  min-height: 0;\n  position: relative;\n}\n.pos-take-body--locked[_ngcontent-%COMP%]   .pos-catalog[_ngcontent-%COMP%], \n.pos-take-body--locked[_ngcontent-%COMP%]   .pos-cart[_ngcontent-%COMP%] {\n  filter: saturate(0.65);\n  opacity: 0.55;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.pos-lock-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  z-index: 15;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: auto;\n  padding: 2rem;\n  background: rgba(248, 250, 252, 0.35);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.pos-lock-card[_ngcontent-%COMP%] {\n  pointer-events: auto;\n  background: var(--pos-surface);\n  border-radius: var(--pos-radius);\n  padding: 2rem 2.25rem;\n  text-align: center;\n  max-width: 380px;\n  box-shadow: var(--pos-shadow);\n  border: 1px solid var(--pos-border);\n}\n.pos-lock-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 0.5rem;\n  font-size: 1.2rem;\n  color: #0f172a;\n}\n.pos-lock-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 1.25rem;\n  font-size: 0.9rem;\n  color: var(--pos-muted);\n  line-height: 1.45;\n}\n.pos-lock-card__icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  color: var(--pos-accent);\n}\n.pos-catalog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: #f8fafc;\n  border-right: 1px solid var(--pos-border);\n}\n.pos-catalog__toolbar[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  background: var(--pos-surface);\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-search[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n  max-width: 480px;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  background: #f1f5f9;\n  border-radius: 12px;\n  padding: 0.5rem 1rem;\n  border: 1px solid transparent;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.pos-search[_ngcontent-%COMP%]:focus-within {\n  border-color: #c7d2fe;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n  background: #fff;\n}\n.pos-search__icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  color: var(--pos-muted);\n}\n.pos-search__input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-size: 0.95rem;\n  color: #0f172a;\n}\n.pos-search__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.pos-search__input[_ngcontent-%COMP%]::placeholder {\n  color: #94a3b8;\n}\n.pos-catalog__hint[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--pos-muted);\n  font-weight: 500;\n}\n.pos-product-grid[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.1rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));\n  gap: 1rem;\n  align-content: start;\n}\n.pos-card[_ngcontent-%COMP%] {\n  background: var(--pos-surface);\n  border-radius: var(--pos-radius);\n  border: 1px solid var(--pos-border);\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    border-color 0.18s;\n}\n.pos-card[_ngcontent-%COMP%]:hover:not(.pos-card--disabled) {\n  transform: translateY(-3px);\n  box-shadow: var(--pos-shadow);\n  border-color: #c7d2fe;\n}\n.pos-card--disabled[_ngcontent-%COMP%] {\n  opacity: 0.48;\n  cursor: not-allowed;\n  filter: grayscale(0.2);\n}\n.pos-card__media[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 4/3;\n  background:\n    linear-gradient(\n      145deg,\n      #e0e7ff 0%,\n      #f1f5f9 100%);\n}\n.pos-card__media[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.pos-card__media-loading[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.65);\n  animation: _ngcontent-%COMP%_pos-pulse 1.2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pos-pulse {\n  50% {\n    opacity: 0.5;\n  }\n}\n.pos-card__body[_ngcontent-%COMP%] {\n  padding: 0.75rem 0.85rem 0.5rem;\n  flex: 1;\n}\n.pos-card__name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #0f172a;\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-card__sku[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  font-size: 0.72rem;\n  color: var(--pos-muted);\n  font-family: ui-monospace, monospace;\n}\n.pos-card__price-row[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n}\n.pos-card__price[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--pos-accent);\n  letter-spacing: -0.02em;\n}\n.pos-card__no-price[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #ef4444;\n  font-weight: 600;\n}\n.pos-card__add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  width: 100%;\n  border: none;\n  padding: 0.65rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  background:\n    linear-gradient(\n      180deg,\n      #ecfdf5 0%,\n      #d1fae5 100%);\n  color: #047857;\n  border-top: 1px solid #a7f3d0;\n  transition: background 0.15s;\n}\n.pos-card__add[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      180deg,\n      #d1fae5 0%,\n      #a7f3d0 100%);\n}\n.pos-card__add[_ngcontent-%COMP%]:disabled {\n  background: #f1f5f9;\n  color: #94a3b8;\n  cursor: not-allowed;\n  border-top-color: var(--pos-border);\n}\n.pos-empty-grid[_ngcontent-%COMP%], \n.pos-loading-grid[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 3rem 1rem;\n  color: var(--pos-muted);\n}\n.pos-empty-grid__icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.75rem;\n  opacity: 0.45;\n}\n.pos-spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--pos-accent);\n  border-radius: 50%;\n  margin: 0 auto 1rem;\n  animation: _ngcontent-%COMP%_pos-spin 0.75s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_pos-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pos-cart[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n}\n.pos-cart__head[_ngcontent-%COMP%] {\n  padding: 1rem 1.15rem;\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-cart__head-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.pos-cart__head-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.pos-cart__lines[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0.85rem;\n  min-height: 120px;\n}\n.pos-line[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  padding: 0.75rem;\n  margin-bottom: 0.65rem;\n}\n.pos-line__main[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n.pos-line__info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #0f172a;\n}\n.pos-line__sku[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0;\n  font-size: 0.7rem;\n  color: var(--pos-muted);\n}\n.pos-line__unit[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  font-size: 0.75rem;\n  color: var(--pos-accent);\n  font-weight: 500;\n}\n.pos-line__remove[_ngcontent-%COMP%] {\n  border: none;\n  background: #fef2f2;\n  color: #b91c1c;\n  width: 34px;\n  height: 34px;\n  border-radius: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.pos-line__remove[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n}\n.pos-line__controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 0.65rem;\n  gap: 0.5rem;\n}\n.pos-qty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  background: #fff;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.15rem;\n}\n.pos-qty[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: #f1f5f9;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #475569;\n}\n.pos-qty[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background: #e2e8f0;\n  color: var(--pos-accent);\n}\n.pos-qty[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 44px;\n  text-align: center;\n  border: none;\n  font-weight: 600;\n  font-size: 0.85rem;\n  background: transparent;\n}\n.pos-qty[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.pos-line__total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.95rem;\n  color: #0f172a;\n}\n.pos-line__weight[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n  padding-top: 0.55rem;\n  border-top: 1px dashed var(--pos-border);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.pos-line__weight[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n  white-space: nowrap;\n}\n.pos-line__weight[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid var(--pos-border);\n  border-radius: 8px;\n  padding: 0.35rem 0.5rem;\n  font-size: 0.8rem;\n}\n.pos-cart-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2.5rem 1rem;\n  color: var(--pos-muted);\n}\n.pos-cart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0.15rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.pos-cart-empty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n.pos-cart-empty__icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  opacity: 0.35;\n}\n.pos-cart__summary[_ngcontent-%COMP%] {\n  padding: 1rem 1.15rem;\n  border-top: 1px solid var(--pos-border);\n  background: #fafafa;\n}\n.pos-sum-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: var(--pos-muted);\n  margin-bottom: 0.35rem;\n}\n.pos-sum-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #334155;\n  font-weight: 600;\n}\n.pos-sum-row--total[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  padding-top: 0.65rem;\n  border-top: 1px solid var(--pos-border);\n  font-size: 1rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.pos-sum-row--total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  color: var(--pos-accent);\n}\n.pos-pay[_ngcontent-%COMP%] {\n  padding: 1rem 1.15rem;\n  border-top: 1px solid var(--pos-border);\n}\n.pos-pay__title[_ngcontent-%COMP%] {\n  margin: 0 0 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--pos-muted);\n}\n.pos-pay__methods[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.45rem;\n}\n.pos-pay__method[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.55rem 0.35rem;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n  background: #fff;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.pos-pay__method--on[_ngcontent-%COMP%] {\n  border-color: var(--pos-accent);\n  background:\n    linear-gradient(\n      180deg,\n      #eef2ff 0%,\n      #e0e7ff 100%);\n  color: #4338ca;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);\n}\n.pos-pay__method[_ngcontent-%COMP%]:hover {\n  border-color: #c7d2fe;\n}\n.pos-cash[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-cash__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  margin-bottom: 0.65rem;\n}\n.pos-cash__field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.pos-cash__change[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__change[_ngcontent-%COMP%]   output[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--pos-success);\n  font-weight: 700;\n}\n.pos-cash__warn[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  font-size: 0.75rem;\n  color: #b45309;\n  font-weight: 600;\n}\n.pos-cart__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  padding: 0.85rem 1.15rem 1.15rem;\n}\n.pos-cart__actions[_ngcontent-%COMP%]   .pos-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  justify-content: center;\n  padding: 0.75rem;\n  font-size: 0.88rem;\n}\n@media (max-width: 1024px) {\n  .pos-take-body[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(280px, 55vh) auto;\n  }\n  .pos-catalog[_ngcontent-%COMP%] {\n    border-right: none;\n    border-bottom: 1px solid var(--pos-border);\n  }\n  .pos-session-bar__content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .pos-session-bar__center[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .pos-session-bar__right[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n/*# sourceMappingURL=take-order.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TakeOrderComponent, [{
    type: Component,
    args: [{ selector: "app-take-order", standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], template: `<div class="pos-take-root">\r
  <!-- Barra sesi\xF3n POS full width -->\r
  <header class="pos-session-bar">\r
    <div class="pos-session-bar__content">\r
      <div class="pos-session-bar__left">\r
        <div class="pos-session-bar__title">\r
          <lucide-icon [img]="Monitor" class="pos-session-bar__title-icon" />\r
          <span>Punto de Venta</span>\r
        </div>\r
        <div class="pos-session-bar__warehouse">\r
          <lucide-icon [img]="Store" class="pos-ic" />\r
          <select\r
            class="pos-session-bar__select"\r
            [ngModel]="selectedWarehouse()"\r
            (ngModelChange)="onWarehouseSelect($event)"\r
            [disabled]="checkingSession()">\r
            @for (w of warehouses(); track w.id) {\r
              <option [value]="w.id">{{ w.name }}</option>\r
            }\r
          </select>\r
        </div>\r
      </div>\r
\r
      <div class="pos-session-bar__center">\r
        @if (checkingSession()) {\r
          <span class="pos-session-bar__checking">Comprobando sesi\xF3n\u2026</span>\r
        } @else if (activePosSession()) {\r
          <div class="pos-pill pos-pill--ok">\r
            <lucide-icon [img]="Package" class="pos-ic pos-ic--sm" />\r
            <span>Sesi\xF3n activa</span>\r
          </div>\r
          <span class="pos-session-meta">{{ selectedWarehouseName() }}</span>\r
          @if (sessionOpenedLabel()) {\r
            <span class="pos-session-meta">\xB7 {{ sessionOpenedLabel() }}</span>\r
          }\r
        } @else {\r
          <div class="pos-pill pos-pill--warn">\r
            <lucide-icon [img]="AlertCircle" class="pos-ic pos-ic--sm" />\r
            <span>Sin sesi\xF3n POS \u2014 inicia sesi\xF3n para cobrar</span>\r
          </div>\r
        }\r
      </div>\r
\r
      <div class="pos-session-bar__right">\r
        <div class="pos-terminal-chip">\r
          <lucide-icon [img]="Monitor" class="pos-ic pos-ic--sm" />\r
          {{ terminalId() }}\r
        </div>\r
        @if (!checkingSession() && activePosSession()) {\r
          <button type="button" class="pos-btn pos-btn--ghost" (click)="closePosSession()">\r
            <lucide-icon [img]="LogOut" class="pos-ic pos-ic--btn" />\r
            Cerrar sesi\xF3n\r
          </button>\r
        }\r
        @if (!checkingSession() && !activePosSession()) {\r
          <button type="button" class="pos-btn pos-btn--primary" (click)="openPosSession()">\r
            <lucide-icon [img]="LogIn" class="pos-ic pos-ic--btn" />\r
            Iniciar sesi\xF3n\r
          </button>\r
        }\r
      </div>\r
    </div>\r
  </header>\r
\r
  <div class="pos-take-body" [class.pos-take-body--locked]="!sessionOk()">\r
    @if (!sessionOk()) {\r
      <div class="pos-lock-overlay" aria-hidden="true">\r
        <div class="pos-lock-card">\r
          <lucide-icon [img]="LogIn" class="pos-lock-card__icon" />\r
          <h3>Sesi\xF3n POS requerida</h3>\r
          <p>Inicia sesi\xF3n en la barra superior para cargar el carrito y registrar ventas.</p>\r
          <button type="button" class="pos-btn pos-btn--primary pos-btn--lg" (click)="openPosSession()">\r
            Iniciar sesi\xF3n\r
          </button>\r
        </div>\r
      </div>\r
    }\r
\r
    <section class="pos-catalog">\r
      <div class="pos-catalog__toolbar">\r
        <div class="pos-search">\r
          <lucide-icon [img]="Search" class="pos-search__icon" />\r
          <input\r
            type="search"\r
            class="pos-search__input"\r
            placeholder="Buscar por nombre o SKU\u2026"\r
            [ngModel]="searchTerm()"\r
            (ngModelChange)="searchTerm.set($event); onSearchChange()"\r
            autocomplete="off"\r
          />\r
        </div>\r
        <p class="pos-catalog__hint">{{ filteredProducts().length }} productos</p>\r
      </div>\r
\r
      <div class="pos-product-grid">\r
        @for (product of filteredProducts(); track product.id) {\r
          <article\r
            class="pos-card"\r
            [class.pos-card--disabled]="!canAddToCart(product)"\r
            [attr.title]="getDisabledTooltip(product)"\r
            (click)="canAddToCart(product) && addProductToCart(product)">\r
            <div class="pos-card__media">\r
              <img\r
                [src]="getProductPhotoUrl(product)"\r
                [alt]="product.name"\r
                (error)="onPhotoError(product.id)"\r
                (load)="onPhotoLoad(product.id)"\r
                loading="lazy"\r
              />\r
              @if (isPhotoLoading(product.id)) {\r
                <div class="pos-card__media-loading"></div>\r
              }\r
            </div>\r
            <div class="pos-card__body">\r
              <h3 class="pos-card__name">{{ product.name }}</h3>\r
              <p class="pos-card__sku">{{ product.sku }}</p>\r
              <div class="pos-card__price-row">\r
                @if (product.has_price) {\r
                  <span class="pos-card__price">{{ formatCurrency(product.cost || 0) }}</span>\r
                } @else {\r
                  <span class="pos-card__no-price">Sin precio</span>\r
                }\r
              </div>\r
            </div>\r
            <button\r
              type="button"\r
              class="pos-card__add"\r
              (click)="addProductToCart(product); $event.stopPropagation()"\r
              [disabled]="!canAddToCart(product)">\r
              <lucide-icon [img]="Plus" class="pos-ic" />\r
              <span>Agregar</span>\r
            </button>\r
          </article>\r
        }\r
\r
        @if (filteredProducts().length === 0 && !loading()) {\r
          <div class="pos-empty-grid">\r
            <lucide-icon [img]="Package" class="pos-empty-grid__icon" />\r
            <p>No hay productos que coincidan</p>\r
          </div>\r
        }\r
\r
        @if (loading()) {\r
          <div class="pos-loading-grid">\r
            <div class="pos-spinner"></div>\r
            <p>Cargando cat\xE1logo\u2026</p>\r
          </div>\r
        }\r
      </div>\r
    </section>\r
\r
    <aside class="pos-cart">\r
      <div class="pos-cart__head">\r
        <div class="pos-cart__head-title">\r
          <lucide-icon [img]="ShoppingCart" class="pos-ic" />\r
          <h2>Orden actual</h2>\r
        </div>\r
      </div>\r
\r
      <div class="pos-cart__lines">\r
        @for (item of posService.cart().items; track $index; let i = $index) {\r
          <div class="pos-line">\r
            <div class="pos-line__main">\r
              <div class="pos-line__info">\r
                <h4>{{ item.product_name }}</h4>\r
                <p class="pos-line__sku">{{ item.product_sku }}</p>\r
                <p class="pos-line__unit">\r
                  {{ formatCurrency(item.unit_price) }} \xB7 {{ item.uom_name }}\r
                </p>\r
              </div>\r
              <button type="button" class="pos-line__remove" (click)="removeItem(i)" title="Quitar">\r
                <lucide-icon [img]="Trash2" class="pos-ic pos-ic--sm" />\r
              </button>\r
            </div>\r
            <div class="pos-line__controls">\r
              <div class="pos-qty">\r
                <button type="button" (click)="updateQuantity(i, item.quantity - 1)">\r
                  <lucide-icon [img]="Minus" class="pos-ic pos-ic--xs" />\r
                </button>\r
                <input\r
                  type="number"\r
                  [value]="item.quantity"\r
                  (change)="updateQuantity(i, +$any($event.target).value)"\r
                  min="1"\r
                />\r
                <button type="button" (click)="updateQuantity(i, item.quantity + 1)">\r
                  <lucide-icon [img]="Plus" class="pos-ic pos-ic--xs" />\r
                </button>\r
              </div>\r
              <span class="pos-line__total">{{ formatCurrency(item.line_total) }}</span>\r
            </div>\r
            <div class="pos-line__weight">\r
              <label>Peso (kg)</label>\r
              <input\r
                type="number"\r
                [(ngModel)]="item.weight"\r
                placeholder="\u2014"\r
                min="0"\r
                step="0.1"\r
              />\r
            </div>\r
          </div>\r
        }\r
\r
        @if (posService.cart().items.length === 0) {\r
          <div class="pos-cart-empty">\r
            <lucide-icon [img]="ShoppingCart" class="pos-cart-empty__icon" />\r
            <p>Carrito vac\xEDo</p>\r
            <span>Elige productos del cat\xE1logo</span>\r
          </div>\r
        }\r
      </div>\r
\r
      <div class="pos-cart__summary">\r
        <div class="pos-sum-row">\r
          <span>Subtotal</span>\r
          <strong>{{ formatCurrency(posService.cart().total_subtotal) }}</strong>\r
        </div>\r
        <div class="pos-sum-row">\r
          <span>IVA</span>\r
          <strong>{{ formatCurrency(posService.cart().total_iva) }}</strong>\r
        </div>\r
        <div class="pos-sum-row">\r
          <span>IEPS</span>\r
          <strong>{{ formatCurrency(posService.cart().total_ieps) }}</strong>\r
        </div>\r
        <div class="pos-sum-row pos-sum-row--total">\r
          <span>Total</span>\r
          <strong>{{ formatCurrency(posService.cart().grand_total) }}</strong>\r
        </div>\r
      </div>\r
\r
      <div class="pos-pay">\r
        <h3 class="pos-pay__title">M\xE9todo de pago</h3>\r
        <div class="pos-pay__methods">\r
          <button\r
            type="button"\r
            class="pos-pay__method"\r
            [class.pos-pay__method--on]="paymentMethod() === 'cash'"\r
            (click)="paymentMethod.set('cash')">\r
            <lucide-icon [img]="Banknote" class="pos-ic" />\r
            Efectivo\r
          </button>\r
          <button\r
            type="button"\r
            class="pos-pay__method"\r
            [class.pos-pay__method--on]="paymentMethod() === 'card'"\r
            (click)="paymentMethod.set('card')">\r
            <lucide-icon [img]="CreditCard" class="pos-ic" />\r
            Tarjeta\r
          </button>\r
          <button\r
            type="button"\r
            class="pos-pay__method"\r
            [class.pos-pay__method--on]="paymentMethod() === 'credit'"\r
            (click)="paymentMethod.set('credit')">\r
            <lucide-icon [img]="FileText" class="pos-ic" />\r
            Cr\xE9dito\r
          </button>\r
        </div>\r
\r
        @if (paymentMethod() === 'cash') {\r
          <div class="pos-cash">\r
            <label class="pos-cash__field">\r
              <span>Cantidad recibida</span>\r
              <input\r
                type="number"\r
                [ngModel]="amountPaid"\r
                (ngModelChange)="onAmountPaidChange($event)"\r
                min="0"\r
                step="0.01"\r
              />\r
            </label>\r
            <div class="pos-cash__change">\r
              <span>Cambio</span>\r
              <output>{{ formatCurrency(calculateChange()) }}</output>\r
            </div>\r
            @if (!isPaymentValid() && posService.cart().grand_total > 0) {\r
              <p class="pos-cash__warn">Monto insuficiente para el total</p>\r
            }\r
          </div>\r
        }\r
      </div>\r
\r
      <div class="pos-cart__actions">\r
        <button type="button" class="pos-btn pos-btn--muted" (click)="cancel()" [disabled]="saving()">\r
          Cancelar\r
        </button>\r
        <button\r
          type="button"\r
          class="pos-btn pos-btn--accent"\r
          (click)="saveOrder()"\r
          [disabled]="\r
            saving() ||\r
            !sessionOk() ||\r
            posService.cart().items.length === 0 ||\r
            !isPaymentValid()\r
          ">\r
          {{ saving() ? 'Guardando\u2026' : 'Guardar orden' }}\r
        </button>\r
      </div>\r
    </aside>\r
  </div>\r
</div>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/features/pos/pages/take-order/take-order.component.scss */\n:host {\n  --pos-bg: #0f172a;\n  --pos-surface: #ffffff;\n  --pos-muted: #64748b;\n  --pos-border: #e2e8f0;\n  --pos-accent: #6366f1;\n  --pos-accent2: #8b5cf6;\n  --pos-success: #10b981;\n  --pos-warn: #f59e0b;\n  --pos-radius: 14px;\n  --pos-shadow: 0 10px 40px -12px rgba(15, 23, 42, 0.18);\n  display: block;\n  min-height: 100%;\n}\n.pos-take-root {\n  min-height: calc(100vh - 0px);\n  display: flex;\n  flex-direction: column;\n  background: #f1f5f9;\n}\n.pos-session-bar {\n  width: 100%;\n  background:\n    linear-gradient(\n      105deg,\n      #0f172a 0%,\n      #1e1b4b 45%,\n      #312e81 100%);\n  color: #f8fafc;\n  padding: 0.65rem 1.25rem;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.35);\n  position: relative;\n  z-index: 20;\n}\n.pos-session-bar__content {\n  max-width: 1680px;\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.75rem 1.25rem;\n  justify-content: space-between;\n}\n.pos-session-bar__left {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem;\n}\n.pos-session-bar__title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 700;\n  font-size: 1rem;\n  letter-spacing: -0.02em;\n}\n.pos-session-bar__title-icon {\n  width: 22px;\n  height: 22px;\n  opacity: 0.95;\n}\n.pos-session-bar__warehouse {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 10px;\n  padding: 0.25rem 0.6rem 0.25rem 0.45rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n}\n.pos-session-bar__select {\n  background: transparent;\n  border: none;\n  color: #f8fafc;\n  font-size: 0.875rem;\n  font-weight: 500;\n  max-width: 200px;\n  cursor: pointer;\n  padding: 0.35rem 0.25rem;\n}\n.pos-session-bar__select option {\n  color: #0f172a;\n}\n.pos-session-bar__select:focus {\n  outline: none;\n}\n.pos-session-bar__center {\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem 0.75rem;\n  min-width: 200px;\n}\n.pos-session-bar__checking {\n  font-size: 0.85rem;\n  opacity: 0.85;\n}\n.pos-session-meta {\n  font-size: 0.8rem;\n  opacity: 0.75;\n}\n.pos-session-bar__right {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.pos-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.pos-pill--ok {\n  background: rgba(16, 185, 129, 0.2);\n  color: #a7f3d0;\n  border: 1px solid rgba(16, 185, 129, 0.35);\n}\n.pos-pill--warn {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fde68a;\n  border: 1px solid rgba(245, 158, 11, 0.35);\n}\n.pos-terminal-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: rgba(99, 102, 241, 0.35);\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  border: 1px solid rgba(165, 180, 252, 0.35);\n}\n.pos-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border-radius: 10px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.45rem 0.9rem;\n  cursor: pointer;\n  border: none;\n  transition:\n    transform 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s;\n}\n.pos-btn--primary {\n  background: #fff;\n  color: #312e81;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);\n}\n.pos-btn--primary:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);\n}\n.pos-btn--ghost {\n  background: rgba(255, 255, 255, 0.1);\n  color: #fecaca;\n  border: 1px solid rgba(248, 113, 113, 0.35);\n}\n.pos-btn--ghost:hover {\n  background: rgba(248, 113, 113, 0.2);\n}\n.pos-btn--muted {\n  background: #fff;\n  color: #64748b;\n  border: 1px solid var(--pos-border);\n}\n.pos-btn--accent {\n  background:\n    linear-gradient(\n      135deg,\n      var(--pos-accent),\n      var(--pos-accent2));\n  color: #fff;\n  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);\n}\n.pos-btn--accent:hover:not(:disabled) {\n  transform: translateY(-1px);\n}\n.pos-btn--lg {\n  padding: 0.65rem 1.25rem;\n  font-size: 0.9rem;\n}\n.pos-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  transform: none;\n}\n.pos-ic {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n}\n.pos-ic--sm {\n  width: 16px;\n  height: 16px;\n}\n.pos-ic--xs {\n  width: 14px;\n  height: 14px;\n}\n.pos-ic--btn {\n  width: 16px;\n  height: 16px;\n}\n.pos-take-body {\n  flex: 1;\n  display: grid;\n  grid-template-columns: minmax(0, 1.65fr) minmax(320px, 420px);\n  gap: 0;\n  min-height: 0;\n  position: relative;\n}\n.pos-take-body--locked .pos-catalog,\n.pos-take-body--locked .pos-cart {\n  filter: saturate(0.65);\n  opacity: 0.55;\n  pointer-events: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.pos-lock-overlay {\n  position: absolute;\n  inset: 0;\n  z-index: 15;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: auto;\n  padding: 2rem;\n  background: rgba(248, 250, 252, 0.35);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.pos-lock-card {\n  pointer-events: auto;\n  background: var(--pos-surface);\n  border-radius: var(--pos-radius);\n  padding: 2rem 2.25rem;\n  text-align: center;\n  max-width: 380px;\n  box-shadow: var(--pos-shadow);\n  border: 1px solid var(--pos-border);\n}\n.pos-lock-card h3 {\n  margin: 0.75rem 0 0.5rem;\n  font-size: 1.2rem;\n  color: #0f172a;\n}\n.pos-lock-card p {\n  margin: 0 0 1.25rem;\n  font-size: 0.9rem;\n  color: var(--pos-muted);\n  line-height: 1.45;\n}\n.pos-lock-card__icon {\n  width: 40px;\n  height: 40px;\n  color: var(--pos-accent);\n}\n.pos-catalog {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: #f8fafc;\n  border-right: 1px solid var(--pos-border);\n}\n.pos-catalog__toolbar {\n  padding: 1rem 1.25rem;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  background: var(--pos-surface);\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-search {\n  flex: 1;\n  min-width: 200px;\n  max-width: 480px;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  background: #f1f5f9;\n  border-radius: 12px;\n  padding: 0.5rem 1rem;\n  border: 1px solid transparent;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.pos-search:focus-within {\n  border-color: #c7d2fe;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n  background: #fff;\n}\n.pos-search__icon {\n  width: 18px;\n  height: 18px;\n  color: var(--pos-muted);\n}\n.pos-search__input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-size: 0.95rem;\n  color: #0f172a;\n}\n.pos-search__input:focus {\n  outline: none;\n}\n.pos-search__input::placeholder {\n  color: #94a3b8;\n}\n.pos-catalog__hint {\n  margin: 0;\n  font-size: 0.8rem;\n  color: var(--pos-muted);\n  font-weight: 500;\n}\n.pos-product-grid {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.1rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));\n  gap: 1rem;\n  align-content: start;\n}\n.pos-card {\n  background: var(--pos-surface);\n  border-radius: var(--pos-radius);\n  border: 1px solid var(--pos-border);\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n  transition:\n    transform 0.18s ease,\n    box-shadow 0.18s ease,\n    border-color 0.18s;\n}\n.pos-card:hover:not(.pos-card--disabled) {\n  transform: translateY(-3px);\n  box-shadow: var(--pos-shadow);\n  border-color: #c7d2fe;\n}\n.pos-card--disabled {\n  opacity: 0.48;\n  cursor: not-allowed;\n  filter: grayscale(0.2);\n}\n.pos-card__media {\n  position: relative;\n  aspect-ratio: 4/3;\n  background:\n    linear-gradient(\n      145deg,\n      #e0e7ff 0%,\n      #f1f5f9 100%);\n}\n.pos-card__media img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.pos-card__media-loading {\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.65);\n  animation: pos-pulse 1.2s ease-in-out infinite;\n}\n@keyframes pos-pulse {\n  50% {\n    opacity: 0.5;\n  }\n}\n.pos-card__body {\n  padding: 0.75rem 0.85rem 0.5rem;\n  flex: 1;\n}\n.pos-card__name {\n  margin: 0;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #0f172a;\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.pos-card__sku {\n  margin: 0.25rem 0 0;\n  font-size: 0.72rem;\n  color: var(--pos-muted);\n  font-family: ui-monospace, monospace;\n}\n.pos-card__price-row {\n  margin-top: 0.5rem;\n}\n.pos-card__price {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--pos-accent);\n  letter-spacing: -0.02em;\n}\n.pos-card__no-price {\n  font-size: 0.78rem;\n  color: #ef4444;\n  font-weight: 600;\n}\n.pos-card__add {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.35rem;\n  width: 100%;\n  border: none;\n  padding: 0.65rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  background:\n    linear-gradient(\n      180deg,\n      #ecfdf5 0%,\n      #d1fae5 100%);\n  color: #047857;\n  border-top: 1px solid #a7f3d0;\n  transition: background 0.15s;\n}\n.pos-card__add:hover:not(:disabled) {\n  background:\n    linear-gradient(\n      180deg,\n      #d1fae5 0%,\n      #a7f3d0 100%);\n}\n.pos-card__add:disabled {\n  background: #f1f5f9;\n  color: #94a3b8;\n  cursor: not-allowed;\n  border-top-color: var(--pos-border);\n}\n.pos-empty-grid,\n.pos-loading-grid {\n  grid-column: 1/-1;\n  text-align: center;\n  padding: 3rem 1rem;\n  color: var(--pos-muted);\n}\n.pos-empty-grid__icon {\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.75rem;\n  opacity: 0.45;\n}\n.pos-spinner {\n  width: 40px;\n  height: 40px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--pos-accent);\n  border-radius: 50%;\n  margin: 0 auto 1rem;\n  animation: pos-spin 0.75s linear infinite;\n}\n@keyframes pos-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pos-cart {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n  background: var(--pos-surface);\n}\n.pos-cart__head {\n  padding: 1rem 1.15rem;\n  border-bottom: 1px solid var(--pos-border);\n}\n.pos-cart__head-title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.pos-cart__head-title h2 {\n  margin: 0;\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.pos-cart__lines {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0.85rem;\n  min-height: 120px;\n}\n.pos-line {\n  background: #f8fafc;\n  border: 1px solid var(--pos-border);\n  border-radius: 12px;\n  padding: 0.75rem;\n  margin-bottom: 0.65rem;\n}\n.pos-line__main {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n.pos-line__info h4 {\n  margin: 0;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #0f172a;\n}\n.pos-line__sku {\n  margin: 0.15rem 0 0;\n  font-size: 0.7rem;\n  color: var(--pos-muted);\n}\n.pos-line__unit {\n  margin: 0.2rem 0 0;\n  font-size: 0.75rem;\n  color: var(--pos-accent);\n  font-weight: 500;\n}\n.pos-line__remove {\n  border: none;\n  background: #fef2f2;\n  color: #b91c1c;\n  width: 34px;\n  height: 34px;\n  border-radius: 10px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.pos-line__remove:hover {\n  background: #fee2e2;\n}\n.pos-line__controls {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 0.65rem;\n  gap: 0.5rem;\n}\n.pos-qty {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  background: #fff;\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.15rem;\n}\n.pos-qty button {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: #f1f5f9;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #475569;\n}\n.pos-qty button:hover {\n  background: #e2e8f0;\n  color: var(--pos-accent);\n}\n.pos-qty input {\n  width: 44px;\n  text-align: center;\n  border: none;\n  font-weight: 600;\n  font-size: 0.85rem;\n  background: transparent;\n}\n.pos-qty input:focus {\n  outline: none;\n}\n.pos-line__total {\n  font-weight: 700;\n  font-size: 0.95rem;\n  color: #0f172a;\n}\n.pos-line__weight {\n  margin-top: 0.55rem;\n  padding-top: 0.55rem;\n  border-top: 1px dashed var(--pos-border);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.pos-line__weight label {\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n  white-space: nowrap;\n}\n.pos-line__weight input {\n  flex: 1;\n  border: 1px solid var(--pos-border);\n  border-radius: 8px;\n  padding: 0.35rem 0.5rem;\n  font-size: 0.8rem;\n}\n.pos-cart-empty {\n  text-align: center;\n  padding: 2.5rem 1rem;\n  color: var(--pos-muted);\n}\n.pos-cart-empty p {\n  margin: 0.5rem 0 0.15rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.pos-cart-empty span {\n  font-size: 0.8rem;\n}\n.pos-cart-empty__icon {\n  width: 56px;\n  height: 56px;\n  opacity: 0.35;\n}\n.pos-cart__summary {\n  padding: 1rem 1.15rem;\n  border-top: 1px solid var(--pos-border);\n  background: #fafafa;\n}\n.pos-sum-row {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.82rem;\n  color: var(--pos-muted);\n  margin-bottom: 0.35rem;\n}\n.pos-sum-row strong {\n  color: #334155;\n  font-weight: 600;\n}\n.pos-sum-row--total {\n  margin-top: 0.5rem;\n  padding-top: 0.65rem;\n  border-top: 1px solid var(--pos-border);\n  font-size: 1rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.pos-sum-row--total strong {\n  font-size: 1.15rem;\n  color: var(--pos-accent);\n}\n.pos-pay {\n  padding: 1rem 1.15rem;\n  border-top: 1px solid var(--pos-border);\n}\n.pos-pay__title {\n  margin: 0 0 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--pos-muted);\n}\n.pos-pay__methods {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0.45rem;\n}\n.pos-pay__method {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.55rem 0.35rem;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n  background: #fff;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.pos-pay__method--on {\n  border-color: var(--pos-accent);\n  background:\n    linear-gradient(\n      180deg,\n      #eef2ff 0%,\n      #e0e7ff 100%);\n  color: #4338ca;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);\n}\n.pos-pay__method:hover {\n  border-color: #c7d2fe;\n}\n.pos-cash {\n  margin-top: 0.85rem;\n  padding: 0.85rem;\n  background: #f8fafc;\n  border-radius: 12px;\n  border: 1px solid var(--pos-border);\n}\n.pos-cash__field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  margin-bottom: 0.65rem;\n}\n.pos-cash__field span {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__field input {\n  border: 1px solid var(--pos-border);\n  border-radius: 10px;\n  padding: 0.55rem 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n}\n.pos-cash__change {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--pos-muted);\n}\n.pos-cash__change output {\n  font-size: 1rem;\n  color: var(--pos-success);\n  font-weight: 700;\n}\n.pos-cash__warn {\n  margin: 0.5rem 0 0;\n  font-size: 0.75rem;\n  color: #b45309;\n  font-weight: 600;\n}\n.pos-cart__actions {\n  display: flex;\n  gap: 0.6rem;\n  padding: 0.85rem 1.15rem 1.15rem;\n}\n.pos-cart__actions .pos-btn {\n  flex: 1;\n  justify-content: center;\n  padding: 0.75rem;\n  font-size: 0.88rem;\n}\n@media (max-width: 1024px) {\n  .pos-take-body {\n    grid-template-columns: 1fr;\n    grid-template-rows: minmax(280px, 55vh) auto;\n  }\n  .pos-catalog {\n    border-right: none;\n    border-bottom: 1px solid var(--pos-border);\n  }\n  .pos-session-bar__content {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .pos-session-bar__center {\n    justify-content: flex-start;\n  }\n  .pos-session-bar__right {\n    justify-content: flex-start;\n  }\n}\n/*# sourceMappingURL=take-order.component.css.map */\n'] }]
  }], () => [{ type: POSService }, { type: ProductService }, { type: WarehouseService }, { type: Router }, { type: MatSnackBar }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TakeOrderComponent, { className: "TakeOrderComponent", filePath: "src/app/features/pos/pages/take-order/take-order.component.ts", lineNumber: 40 });
})();
export {
  TakeOrderComponent
};
//# sourceMappingURL=chunk-NVG4OZS3.js.map
