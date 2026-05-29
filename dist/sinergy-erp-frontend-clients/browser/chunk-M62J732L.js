import {
  ContractDocumentsComponent,
  ContractDownpaymentPaymentsComponent,
  ContractHoaPaymentsComponent,
  ContractPaymentsComponent,
  LocalDatePipe,
  PaymentService
} from "./chunk-VI3JR6RD.js";
import "./chunk-J4G2GLBR.js";
import {
  ContractService
} from "./chunk-IPGADDFD.js";
import {
  UserService
} from "./chunk-XP42YGIN.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-AOUAINU6.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger
} from "./chunk-EHG5HTHS.js";
import {
  PropertyEditModalComponent,
  PropertyService
} from "./chunk-4QLZRF2D.js";
import {
  MatOption
} from "./chunk-TRKRWHC4.js";
import {
  SelectComponent
} from "./chunk-HCYLGR2Q.js";
import {
  InterceptorService
} from "./chunk-6WX4EKZ5.js";
import {
  InputComponent
} from "./chunk-H5L6TOJV.js";
import {
  ButtonComponent
} from "./chunk-U6P37MEJ.js";
import "./chunk-MIKKZHKU.js";
import "./chunk-FZGRRB5W.js";
import {
  MatDialog
} from "./chunk-YLZRJESW.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators
} from "./chunk-GRWRLGZU.js";
import {
  ArrowLeft,
  Info,
  LucideAngularComponent,
  LucideAngularModule
} from "./chunk-Z3FOIOXA.js";
import "./chunk-W5SEVSEZ.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-FDRLY3M3.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  Location,
  NgClass,
  NgForOf,
  NgIf,
  TitleCasePipe
} from "./chunk-RBFB2ZTY.js";
import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  __spreadProps,
  __spreadValues,
  debounceTime,
  distinctUntilChanged,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction4,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-GBHDNI6X.js";

// src/app/features/contracts/pages/contract-detail-page/contract-detail-page.component.ts
var _c0 = ["vendorAutocompleteTrigger"];
var _c1 = (a0, a1, a2, a3) => ({ "bg-green-100 text-green-800": a0, "bg-blue-100 text-blue-800": a1, "bg-red-100 text-red-800": a2, "bg-yellow-100 text-yellow-800": a3 });
function ContractDetailPageComponent_div_0_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 63);
    \u0275\u0275text(1, "\u2022");
    \u0275\u0275elementEnd();
  }
}
function ContractDetailPageComponent_div_0_span_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_span_12_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.navigateToCustomer());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getCustomerName(), " ");
  }
}
function ContractDetailPageComponent_div_0_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1, " Enganche financiado activo ");
    \u0275\u0275elementEnd();
  }
}
function ContractDetailPageComponent_div_0_span_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275element(1, "lucide-icon", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("matTooltip", ctx_r1.getPendingBreakdown());
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.InfoIcon)("size", 14);
  }
}
function ContractDetailPageComponent_div_0_div_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "div", 69)(2, "div")(3, "span", 70);
    \u0275\u0275text(4, "Estado enganche");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 71);
    \u0275\u0275text(6, "Activo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "span", 70);
    \u0275\u0275text(9, "Meses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 71);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "span", 70);
    \u0275\u0275text(14, "Pago mensual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 71);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "span", 70);
    \u0275\u0275text(20, "Primer pago / d\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 71);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "localDate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const current_r4 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(current_r4.down_payment_months || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 4, current_r4.down_payment_monthly_amount, current_r4.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(23, 7, current_r4.down_payment_first_payment_date, "mediumDate"), " / ", current_r4.down_payment_payment_day || "\u2014");
  }
}
function ContractDetailPageComponent_div_0_span_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_span_94_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPropertyModal());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const current_r4 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", current_r4.property.code, " ");
  }
}
function ContractDetailPageComponent_div_0_span_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractDetailPageComponent_div_0_button_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 74);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_button_102_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearSeller());
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275elementEnd();
  }
}
function ContractDetailPageComponent_div_0_mat_option_105_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 75);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_mat_option_105_Template_mat_option_click_0_listener() {
      const seller_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onSellerSelected(seller_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const seller_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", seller_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.displaySeller(seller_r8), " ");
  }
}
function ContractDetailPageComponent_div_0_mat_option_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 76)(1, "span", 77);
    \u0275\u0275text(2, "No se encontraron vendedores");
    \u0275\u0275elementEnd()();
  }
}
function ContractDetailPageComponent_div_0_app_button_136_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 78);
    \u0275\u0275listener("clicked", function ContractDetailPageComponent_div_0_app_button_136_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveContract());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("customClass", "btn_primary")("fullWidth", false)("loading", ctx_r1.saving());
  }
}
function ContractDetailPageComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "div", 8)(5, "app-button", 9);
    \u0275\u0275listener("clicked", function ContractDetailPageComponent_div_0_Template_app_button_clicked_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateBack());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h2");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 10);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, ContractDetailPageComponent_div_0_span_11_Template, 2, 0, "span", 11)(12, ContractDetailPageComponent_div_0_span_12_Template, 2, 1, "span", 12)(13, ContractDetailPageComponent_div_0_span_13_Template, 2, 0, "span", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 14)(15, "span", 15)(16, "span", 16);
    \u0275\u0275text(17, "Creado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 15)(21, "span", 16);
    \u0275\u0275text(22, "Actualizado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 17)(26, "div")(27, "span", 18);
    \u0275\u0275text(28, "Fecha Contrato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 19);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "localDate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div")(33, "span", 18);
    \u0275\u0275text(34, "Precio Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 19);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div")(39, "span", 18);
    \u0275\u0275text(40, "Enganche");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 19);
    \u0275\u0275text(42);
    \u0275\u0275pipe(43, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div")(45, "span", 18);
    \u0275\u0275text(46, "Total Pagado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span", 20);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div")(51, "span", 21);
    \u0275\u0275text(52, " Saldo Pendiente ");
    \u0275\u0275template(53, ContractDetailPageComponent_div_0_span_53_Template, 2, 3, "span", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span", 23);
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div")(58, "span", 18);
    \u0275\u0275text(59, "Meses de Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "span", 19);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(62, "div")(63, "span", 18);
    \u0275\u0275text(64, "Pago Mensual");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "span", 19);
    \u0275\u0275text(66);
    \u0275\u0275pipe(67, "currency");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(68, "div", 24)(69, "button", 25);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_Template_button_click_69_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setActiveTab("edit"));
    });
    \u0275\u0275text(70, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "button", 25);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_Template_button_click_71_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setActiveTab("payments"));
    });
    \u0275\u0275text(72, "Pagos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "button", 25);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_Template_button_click_73_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setActiveTab("down_payments"));
    });
    \u0275\u0275text(74, "Enganche en Pagos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "button", 25);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_Template_button_click_75_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setActiveTab("hoa"));
    });
    \u0275\u0275text(76, "HOA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "button", 25);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_Template_button_click_77_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setActiveTab("documents"));
    });
    \u0275\u0275text(78, "Documentos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "button", 25);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_Template_button_click_79_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setActiveTab("statement"));
    });
    \u0275\u0275text(80, "Estado de Cuenta");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(81, "div", 26)(82, "div", 27);
    \u0275\u0275template(83, ContractDetailPageComponent_div_0_div_83_Template, 24, 10, "div", 28);
    \u0275\u0275elementStart(84, "div", 29)(85, "div", 30)(86, "div")(87, "span", 31);
    \u0275\u0275text(88, "N\xFAmero de Contrato");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "span", 32);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div")(92, "span", 31);
    \u0275\u0275text(93, "Lote");
    \u0275\u0275elementEnd();
    \u0275\u0275template(94, ContractDetailPageComponent_div_0_span_94_Template, 2, 1, "span", 33)(95, ContractDetailPageComponent_div_0_span_95_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "div")(97, "label", 35);
    \u0275\u0275text(98, "Vendido Por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "div", 36)(100, "input", 37, 0);
    \u0275\u0275listener("focus", function ContractDetailPageComponent_div_0_Template_input_focus_100_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSellerSearchFocus());
    })("blur", function ContractDetailPageComponent_div_0_Template_input_blur_100_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSellerSearchBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(102, ContractDetailPageComponent_div_0_button_102_Template, 2, 0, "button", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(103, "mat-autocomplete", null, 1);
    \u0275\u0275template(105, ContractDetailPageComponent_div_0_mat_option_105_Template, 2, 2, "mat-option", 39)(106, ContractDetailPageComponent_div_0_mat_option_106_Template, 3, 0, "mat-option", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(107, "div", 30);
    \u0275\u0275element(108, "app-input", 41)(109, "app-select", 42)(110, "app-input", 43)(111, "app-input", 44)(112, "app-input", 45)(113, "app-input", 46)(114, "app-input", 47)(115, "app-input", 48);
    \u0275\u0275elementEnd();
    \u0275\u0275element(116, "app-input", 49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(117, "div", 27)(118, "app-contract-payments", 50);
    \u0275\u0275listener("dataChanged", function ContractDetailPageComponent_div_0_Template_app_contract_payments_dataChanged_118_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshContractData());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(119, "div", 27)(120, "app-contract-downpayment-payments", 51);
    \u0275\u0275listener("dataChanged", function ContractDetailPageComponent_div_0_Template_app_contract_downpayment_payments_dataChanged_120_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshContractData());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(121, "div", 27)(122, "app-contract-hoa-payments", 52);
    \u0275\u0275listener("dataChanged", function ContractDetailPageComponent_div_0_Template_app_contract_hoa_payments_dataChanged_122_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refreshContractData());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(123, "div", 27);
    \u0275\u0275element(124, "app-contract-documents", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(125, "div", 27)(126, "div", 54)(127, "div", 55)(128, "p", 56);
    \u0275\u0275text(129, "Descarga el estado de cuenta en formato PDF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(130, "button", 57);
    \u0275\u0275listener("click", function ContractDetailPageComponent_div_0_Template_button_click_130_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadStatement());
    });
    \u0275\u0275text(131, " \u{1F4E5} Descargar Estado de Cuenta ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(132, "div", 58)(133, "div", 59)(134, "app-button", 60);
    \u0275\u0275listener("clicked", function ContractDetailPageComponent_div_0_Template_app_button_clicked_134_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteContract());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(135, "div", 61);
    \u0275\u0275template(136, ContractDetailPageComponent_div_0_app_button_136_Template, 1, 3, "app-button", 62);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_38_0;
    const current_r4 = ctx.ngIf;
    const autoSeller_r10 = \u0275\u0275reference(104);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("page-shell--wide", ctx_r1.activeTab() === "payments");
    \u0275\u0275advance(4);
    \u0275\u0275property("icon", ctx_r1.ArrowLeft)("fullWidth", false)("customClass", "btn-outline-back");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Contrato ", current_r4.contract_number);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(106, _c1, ctx_r1.badgeStatus === "activo", ctx_r1.badgeStatus === "completado", ctx_r1.badgeStatus === "cancelado", ctx_r1.badgeStatus === "suspendido"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 80, ctx_r1.badgeStatus), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", current_r4.customer);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", current_r4.customer);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", current_r4.down_payment_financed);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(19, 82, current_r4.created_at, "medium"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(24, 85, current_r4.updated_at, "medium"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(31, 88, current_r4.contract_date, "mediumDate"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(37, 91, current_r4.total_price, current_r4.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(43, 94, current_r4.down_payment, current_r4.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(49, 97, current_r4.total_price - current_r4.remaining_balance, current_r4.currency));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.paymentStats());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(56, 100, current_r4.remaining_balance, current_r4.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", current_r4.payment_months, " meses");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(67, 103, current_r4.monthly_payment, current_r4.currency));
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "edit");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "payments");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "down_payments");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "hoa");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "documents");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "statement");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "edit");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", current_r4.down_payment_financed);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", current_r4.contract_number, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", current_r4.property);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !current_r4.property);
    \u0275\u0275advance(5);
    \u0275\u0275property("placeholder", current_r4.seller ? "Buscar nuevo vendedor..." : "Buscar por nombre o email")("matAutocomplete", autoSeller_r10);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", current_r4.seller && ((tmp_38_0 = ctx_r1.form.get("seller_search")) == null ? null : tmp_38_0.value));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.filteredVendors());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.filteredVendors().length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("form_control", ctx_r1.form.controls["contract_date"]);
    \u0275\u0275advance();
    \u0275\u0275property("label", "Estado *")("config", ctx_r1.statusSelectConfig);
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["total_price"]);
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["down_payment"]);
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["remaining_balance"]);
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["payment_months"]);
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["monthly_payment"]);
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["first_payment_date"]);
    \u0275\u0275advance();
    \u0275\u0275property("form_control", ctx_r1.form.controls["notes"]);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "payments");
    \u0275\u0275advance();
    \u0275\u0275property("contractId", current_r4.id)("currency", current_r4.currency)("contractStatus", current_r4.status);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "down_payments");
    \u0275\u0275advance();
    \u0275\u0275property("contractId", current_r4.id)("currency", current_r4.currency)("contract", current_r4);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "hoa");
    \u0275\u0275advance();
    \u0275\u0275property("contractId", current_r4.id)("currency", current_r4.currency)("contractStatus", current_r4.status)("contract", current_r4);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "documents");
    \u0275\u0275advance();
    \u0275\u0275property("contractId", current_r4.id);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "statement");
    \u0275\u0275advance(9);
    \u0275\u0275property("customClass", "btn-outline-danger")("fullWidth", false)("loading", ctx_r1.deleting());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.activeTab() === "edit");
  }
}
function ContractDetailPageComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275text(1, "Cargando contrato...");
    \u0275\u0275elementEnd();
  }
}
var ContractDetailPageComponent = class _ContractDetailPageComponent {
  route;
  router;
  location;
  dialog;
  propertyService;
  contractService;
  paymentService;
  userService;
  interceptorService;
  fb;
  cdr;
  ArrowLeft = ArrowLeft;
  InfoIcon = Info;
  vendorAutocompleteTrigger;
  contract = signal(null, ...ngDevMode ? [{ debugName: "contract" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  deleting = signal(false, ...ngDevMode ? [{ debugName: "deleting" }] : []);
  activeTab = signal("edit", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  paymentStats = signal(null, ...ngDevMode ? [{ debugName: "paymentStats" }] : []);
  vendors = signal([], ...ngDevMode ? [{ debugName: "vendors" }] : []);
  filteredVendors = signal([], ...ngDevMode ? [{ debugName: "filteredVendors" }] : []);
  statusSelectConfig = {
    placeholder: "Selecciona un estado",
    data: [
      { value: "activo", label: "Activo" },
      { value: "completado", label: "Completado" },
      { value: "cancelado", label: "Cancelado" },
      { value: "suspendido", label: "Suspendido" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(route, router, location, dialog, propertyService, contractService, paymentService, userService, interceptorService, fb, cdr) {
    this.route = route;
    this.router = router;
    this.location = location;
    this.dialog = dialog;
    this.propertyService = propertyService;
    this.contractService = contractService;
    this.paymentService = paymentService;
    this.userService = userService;
    this.interceptorService = interceptorService;
    this.fb = fb;
    this.cdr = cdr;
    this.form = this.fb.group({
      contract_date: ["", Validators.required],
      total_price: [0, [Validators.required, Validators.min(0)]],
      down_payment: [0, [Validators.required, Validators.min(0)]],
      remaining_balance: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      payment_months: [0, [Validators.required, Validators.min(0)]],
      monthly_payment: [{ value: 0, disabled: true }, [Validators.required, Validators.min(0)]],
      first_payment_date: ["", Validators.required],
      currency: ["USD", Validators.required],
      status: ["activo", Validators.required],
      notes: [""],
      seller_search: [""],
      seller_id: [null]
    });
    this.statusSelectConfig.form_control = this.form.get("status");
  }
  ngOnInit() {
    this.loadSellers();
    this.initializeSellerSearch();
    this.route.paramMap.subscribe((params) => {
      const contractId = params.get("id");
      if (!contractId) {
        this.navigateBackToList();
        return;
      }
      this.loadContract(contractId);
    });
  }
  loadContract(contractId) {
    this.loading.set(true);
    this.contractService.getContract(contractId).subscribe({
      next: (contract) => {
        const normalizedStatus = this.normalizeStatus(contract.status);
        const normalizedContract = __spreadProps(__spreadValues({}, contract), { status: normalizedStatus });
        this.contract.set(normalizedContract);
        this.patchFormFromContract(normalizedContract);
        this.loadPaymentStats();
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los detalles del contrato"
        });
        this.navigateBackToList();
      }
    });
  }
  patchFormFromContract(contract) {
    if (contract.seller) {
      const sellerExists = this.vendors().some((v) => v.id === contract.seller.id);
      if (!sellerExists) {
        this.vendors.set([contract.seller, ...this.vendors()]);
        this.filteredVendors.set([contract.seller, ...this.filteredVendors()]);
      }
    }
    this.form.patchValue({
      contract_date: contract.contract_date,
      total_price: contract.total_price,
      down_payment: contract.down_payment,
      remaining_balance: contract.remaining_balance,
      payment_months: contract.payment_months,
      monthly_payment: contract.monthly_payment,
      first_payment_date: contract.first_payment_date,
      currency: contract.currency || "USD",
      status: this.normalizeStatus(contract.status),
      notes: contract.notes || "",
      seller_id: contract.seller_id || null,
      seller_search: contract.seller ? this.displaySeller(contract.seller) : ""
    });
  }
  loadPaymentStats() {
    const current = this.contract();
    if (!current)
      return;
    this.paymentService.getPaymentStats(current.id).subscribe({
      next: (stats) => this.paymentStats.set(stats),
      error: () => {
      }
    });
  }
  refreshContractData() {
    const current = this.contract();
    if (!current)
      return;
    this.loadContract(current.id);
  }
  loadSellers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        const userData = Array.isArray(response) ? response : [];
        this.vendors.set(userData);
        this.filteredVendors.set(userData);
      },
      error: () => {
      }
    });
  }
  initializeSellerSearch() {
    this.form.get("seller_search").valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => this.filterSellers(searchTerm || ""));
  }
  filterSellers(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.filteredVendors.set(this.vendors());
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = this.vendors().filter((user) => user.first_name?.toLowerCase().includes(term) || "" || (user.last_name?.toLowerCase().includes(term) || "") || (user.email?.toLowerCase().includes(term) || ""));
    this.filteredVendors.set(filtered);
  }
  onSellerSelected(seller) {
    this.form.patchValue({
      seller_id: seller.id,
      seller_search: this.displaySeller(seller)
    }, { emitEvent: false });
    this.vendorAutocompleteTrigger?.closePanel();
    this.cdr.markForCheck();
  }
  clearSeller() {
    this.form.patchValue({ seller_id: null, seller_search: "" });
  }
  onSellerSearchFocus() {
    this.form.patchValue({ seller_search: "" }, { emitEvent: true });
    setTimeout(() => this.vendorAutocompleteTrigger?.openPanel(), 100);
  }
  onSellerSearchBlur() {
    const searchValue = this.form.get("seller_search")?.value;
    const sellerId = this.form.get("seller_id")?.value;
    if (!searchValue && sellerId) {
      const selectedSeller = this.vendors().find((v) => v.id === sellerId);
      if (selectedSeller) {
        this.form.patchValue({ seller_search: this.displaySeller(selectedSeller) }, { emitEvent: false });
      }
    }
  }
  displaySeller(seller) {
    if (!seller)
      return "";
    if (typeof seller === "string")
      return seller;
    return `${seller.first_name} ${seller.last_name} (${seller.email})`;
  }
  getPendingBreakdown() {
    const stats = this.paymentStats();
    const current = this.contract();
    if (!stats || !current)
      return "";
    const currency = current.currency || "USD";
    const monthlyPayment = this.formatCurrency(current.monthly_payment, currency);
    const partialAmount = stats.partial_payment ? this.formatCurrency(stats.partial_payment.remaining_amount, currency) : "";
    const total = this.formatCurrency(stats.total_pending_amount, currency);
    let breakdown = `${stats.pending_full_payments} pagos \xD7 ${monthlyPayment}`;
    if (stats.partial_payment) {
      breakdown += ` + ${partialAmount} (pago parcial #${stats.partial_payment.installment_number})`;
    }
    breakdown += ` = ${total}`;
    return breakdown;
  }
  formatCurrency(amount, currency) {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency }).format(amount);
  }
  setActiveTab(tab) {
    this.activeTab.set(tab);
  }
  get badgeStatus() {
    const current = this.contract();
    return this.normalizeStatus(current?.status);
  }
  normalizeStatus(raw) {
    if (raw == null || raw === "")
      return "activo";
    const key = String(typeof raw === "object" && raw !== null && "code" in raw ? raw.code : raw).trim().toLowerCase();
    const direct = ["activo", "completado", "cancelado", "suspendido"];
    if (direct.includes(key))
      return key;
    const map = {
      active: "activo",
      completed: "completado",
      cancelled: "cancelado",
      canceled: "cancelado",
      suspended: "suspendido"
    };
    return map[key] ?? "activo";
  }
  downloadStatement() {
    const current = this.contract();
    if (!current)
      return;
    this.contractService.getContractStatement(current.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `estado-cuenta-${current.id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudo descargar el estado de cuenta"
        });
      }
    });
  }
  saveContract() {
    const current = this.contract();
    if (!current)
      return;
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Por favor completa todos los campos requeridos"
      });
      return;
    }
    this.saving.set(true);
    const payload = {
      contract_date: this.form.get("contract_date")?.value,
      total_price: this.form.get("total_price")?.value,
      down_payment: this.form.get("down_payment")?.value,
      payment_months: this.form.get("payment_months")?.value,
      first_payment_date: this.form.get("first_payment_date")?.value,
      currency: this.form.get("currency")?.value,
      status: this.normalizeStatus(this.form.get("status")?.value),
      notes: this.form.get("notes")?.value,
      seller_id: this.form.get("seller_id")?.value || null
    };
    this.contractService.updateContract(current.id, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Contrato actualizado correctamente"
        });
        this.loadContract(current.id);
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: error.error?.message || "Error al actualizar el contrato"
        });
      }
    });
  }
  navigateBack() {
    this.location.back();
  }
  navigateBackToList() {
    this.router.navigate(["/contracts"]);
  }
  navigateToCustomer() {
    const current = this.contract();
    if (current?.customer) {
      this.router.navigate(["/customers/detail", current.customer.id]);
    }
  }
  openPropertyModal() {
    const current = this.contract();
    if (!current?.property)
      return;
    this.propertyService.getProperty(current.property.id).subscribe({
      next: (property) => {
        this.dialog.open(PropertyEditModalComponent, { data: { property } });
      }
    });
  }
  getCustomerName() {
    const current = this.contract();
    if (!current?.customer)
      return "\u2014";
    return `${current.customer.name} ${current.customer.lastname}`;
  }
  deleteContract() {
    const current = this.contract();
    if (!current)
      return;
    const customerName = this.getCustomerName();
    const confirmMessage = `\xBFEst\xE1s seguro de que deseas eliminar el contrato ${current.contract_number}${customerName !== "\u2014" ? ` de ${customerName}` : ""}?

Esta acci\xF3n no se puede deshacer y eliminar\xE1:
\u2022 El contrato y todos sus datos
\u2022 Todos los pagos asociados
\u2022 Todos los documentos asociados`;
    if (!confirm(confirmMessage))
      return;
    this.deleting.set(true);
    this.contractService.deleteContract(current.id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Contrato eliminado correctamente"
        });
        this.navigateBackToList();
      },
      error: (error) => {
        this.deleting.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: error.error?.message || "Error al eliminar el contrato"
        });
      }
    });
  }
  static \u0275fac = function ContractDetailPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDetailPageComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(Location), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(ContractService), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractDetailPageComponent, selectors: [["app-contract-detail-page"]], viewQuery: function ContractDetailPageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5, MatAutocompleteTrigger);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.vendorAutocompleteTrigger = _t.first);
    }
  }, features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 2, vars: 2, consts: [["sellerAutocompleteTrigger", "matAutocompleteTrigger"], ["autoSeller", "matAutocomplete"], ["class", "contract-detail-page", 4, "ngIf"], ["class", "contract-detail-page py-10 text-center text-gray-500", 4, "ngIf"], [1, "contract-detail-page"], [1, "page-shell"], [1, "page-header"], [1, "flex-1"], [1, "page-header-top", "flex", "items-center", "gap-2", "mb-2"], ["size", "sm", 3, "clicked", "icon", "fullWidth", "customClass"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", 3, "ngClass"], ["class", "text-gray-400", 4, "ngIf"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors", 3, "click", 4, "ngIf"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800", 4, "ngIf"], [1, "flex", "items-center", "gap-2", "mb-3", "text-xs", "contract-meta-badges"], [1, "inline-flex", "items-center", "px-2.5", "py-1.5", "rounded", "bg-gray-100", "text-gray-700"], [1, "font-semibold", "text-gray-900", "mr-1"], [1, "page-header-stats", "grid", "grid-cols-7", "gap-3", "text-xs", "pb-1"], [1, "block", "text-gray-500", "font-medium"], [1, "text-gray-900", "font-semibold"], [1, "text-green-600", "font-semibold"], [1, "flex", "items-center", "gap-1", "text-gray-500", "font-medium"], ["class", "cursor-help text-gray-400 hover:text-gray-600", "matTooltipPosition", "above", "matTooltipShowDelay", "100", 3, "matTooltip", 4, "ngIf"], [1, "text-red-600", "font-semibold"], [1, "tabs", "px-6", "pt-2"], [1, "tab", 3, "click"], [1, "page-body"], [1, "tab-content"], ["class", "mb-2 p-2 bg-amber-50 rounded-lg border border-amber-200", 4, "ngIf"], [1, "space-y-2.5", 3, "formGroup"], [1, "grid", "grid-cols-2", "gap-2.5"], [1, "block", "text-xs", "font-semibold", "text-gray-500", "mb-1"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-purple-100", "text-purple-800"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 transition-colors", 3, "click", 4, "ngIf"], ["class", "text-gray-900", 4, "ngIf"], ["for", "seller-search", 1, "block", "text-xs", "font-semibold", "text-gray-500", "mb-1"], [1, "relative"], ["id", "seller-search", "type", "text", "formControlName", "seller_search", "aria-label", "Buscar vendedor", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none", 3, "focus", "blur", "placeholder", "matAutocomplete"], ["type", "button", "class", "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600", 3, "click", 4, "ngIf"], [3, "value", "click", 4, "ngFor", "ngForOf"], ["disabled", "", 4, "ngIf"], ["label", "Fecha del Contrato", "type", "date", 3, "form_control"], [3, "label", "config"], ["label", "Precio Total", "type", "number", "disabled", "true", 3, "form_control"], ["label", "Enganche", "type", "number", "disabled", "true", 3, "form_control"], ["label", "Saldo Pendiente", "type", "number", 3, "form_control"], ["label", "Meses de Pago", "type", "number", 3, "form_control"], ["label", "Pago Mensual", "type", "number", 3, "form_control"], ["label", "Fecha Primer Pago", "type", "date", 3, "form_control"], ["label", "Notas", "type", "textarea", 3, "form_control"], [3, "dataChanged", "contractId", "currency", "contractStatus"], [3, "dataChanged", "contractId", "currency", "contract"], [3, "dataChanged", "contractId", "currency", "contractStatus", "contract"], [3, "contractId"], [1, "p-6", "text-center"], [1, "mb-4"], [1, "text-gray-600", "mb-4"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", "transition-colors", "font-medium", 3, "click"], [1, "page-footer"], [1, "flex", "justify-between", "w-full"], ["text", "Eliminar Contrato", "variant", "danger", "size", "sm", 3, "clicked", "customClass", "fullWidth", "loading"], [1, "flex", "gap-2"], ["text", "Guardar Cambios", "size", "sm", 3, "customClass", "fullWidth", "loading", "clicked", 4, "ngIf"], [1, "text-gray-400"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "cursor-pointer", "hover:bg-blue-200", "transition-colors", 3, "click"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-amber-100", "text-amber-800"], ["matTooltipPosition", "above", "matTooltipShowDelay", "100", 1, "cursor-help", "text-gray-400", "hover:text-gray-600", 3, "matTooltip"], [3, "img", "size"], [1, "mb-2", "p-2", "bg-amber-50", "rounded-lg", "border", "border-amber-200"], [1, "grid", "grid-cols-4", "gap-2", "text-xs"], [1, "block", "font-semibold", "text-amber-700", "mb-0.5"], [1, "text-amber-900", "font-semibold"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "cursor-pointer", "hover:bg-green-200", "transition-colors", 3, "click"], [1, "text-gray-900"], ["type", "button", 1, "absolute", "right-2", "top-1/2", "transform", "-translate-y-1/2", "text-gray-400", "hover:text-red-600", 3, "click"], [3, "click", "value"], ["disabled", ""], [1, "text-sm", "text-gray-500"], ["text", "Guardar Cambios", "size", "sm", 3, "clicked", "customClass", "fullWidth", "loading"], [1, "contract-detail-page", "py-10", "text-center", "text-gray-500"]], template: function ContractDetailPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ContractDetailPageComponent_div_0_Template, 137, 111, "div", 2)(1, ContractDetailPageComponent_div_1_Template, 2, 0, "div", 3);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.contract());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    MatTooltipModule,
    MatTooltip,
    MatAutocompleteModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ContractDocumentsComponent,
    ContractPaymentsComponent,
    ContractHoaPaymentsComponent,
    ContractDownpaymentPaymentsComponent,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    LocalDatePipe
  ], styles: ["\n\n.contract-detail-page[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: calc(100vh - 96px);\n  margin: 0;\n  padding: 0;\n  background: #fff;\n}\n.page-shell[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: none;\n  min-height: calc(100vh - 96px);\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  border-radius: 0;\n  border: none;\n  box-shadow: none;\n}\n.page-shell.page-shell--wide[_ngcontent-%COMP%] {\n  max-width: none;\n}\n.page-header[_ngcontent-%COMP%] {\n  padding: 1.2rem 1.5rem 1.25rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.page-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n}\n.page-header-top[_ngcontent-%COMP%] {\n  margin-bottom: 0.9rem;\n}\n.contract-meta-badges[_ngcontent-%COMP%] {\n  margin-bottom: 0.9rem;\n}\n.page-header-stats[_ngcontent-%COMP%] {\n  gap: 0.85rem;\n}\n.page-header-stats[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.65rem;\n  padding: 0.72rem 0.8rem;\n}\n.page-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0.85rem 1.5rem;\n  min-height: 0;\n}\n.page-footer[_ngcontent-%COMP%] {\n  padding: 0.8rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.625rem;\n  flex-shrink: 0;\n}\n.page-footer[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:global(.btn-outline-danger) {\n  background: transparent !important;\n  color: #dc2626 !important;\n  border: 2px solid #dc2626 !important;\n}\n.page-footer[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:global(.btn-outline-danger):hover {\n  background: #fef2f2 !important;\n  border-color: #b91c1c !important;\n  color: #b91c1c !important;\n}\n.page-footer[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:global(.btn-outline-danger):disabled {\n  background: transparent !important;\n  color: #fca5a5 !important;\n  border-color: #fca5a5 !important;\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  margin-bottom: 0.45rem;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n  gap: 0.25rem;\n  flex-shrink: 0;\n}\n.tab[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #6b7280;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.tab.active[_ngcontent-%COMP%] {\n  color: #6366f1;\n  border-bottom-color: #6366f1;\n}\n.tab-content[_ngcontent-%COMP%] {\n  display: none;\n}\n.tab-content.active[_ngcontent-%COMP%] {\n  display: block;\n}\n/*# sourceMappingURL=contract-detail-page.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDetailPageComponent, [{
    type: Component,
    args: [{ selector: "app-contract-detail-page", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule,
      MatTooltipModule,
      MatAutocompleteModule,
      ContractDocumentsComponent,
      ContractPaymentsComponent,
      ContractHoaPaymentsComponent,
      ContractDownpaymentPaymentsComponent,
      LocalDatePipe
    ], providers: [DatePipe], template: `<div class="contract-detail-page" *ngIf="contract() as current">\r
  <div class="page-shell" [class.page-shell--wide]="activeTab() === 'payments'">\r
    <div class="page-header">\r
      <div class="flex-1">\r
        <div class="page-header-top flex items-center gap-2 mb-2">\r
          <app-button\r
            [icon]="ArrowLeft"\r
            [fullWidth]="false"\r
            size="sm"\r
            [customClass]="'btn-outline-back'"\r
            (clicked)="navigateBack()">\r
          </app-button>\r
          <h2>Contrato {{ current.contract_number }}</h2>\r
          <span\r
            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"\r
            [ngClass]="{\r
              'bg-green-100 text-green-800': badgeStatus === 'activo',\r
              'bg-blue-100 text-blue-800': badgeStatus === 'completado',\r
              'bg-red-100 text-red-800': badgeStatus === 'cancelado',\r
              'bg-yellow-100 text-yellow-800': badgeStatus === 'suspendido'\r
            }">\r
            {{ badgeStatus | titlecase }}\r
          </span>\r
          <span *ngIf="current.customer" class="text-gray-400">\u2022</span>\r
          <span\r
            *ngIf="current.customer"\r
            (click)="navigateToCustomer()"\r
            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors">\r
            {{ getCustomerName() }}\r
          </span>\r
          <span\r
            *ngIf="current.down_payment_financed"\r
            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">\r
            Enganche financiado activo\r
          </span>\r
        </div>\r
        <div class="flex items-center gap-2 mb-3 text-xs contract-meta-badges">\r
          <span class="inline-flex items-center px-2.5 py-1.5 rounded bg-gray-100 text-gray-700">\r
            <span class="font-semibold text-gray-900 mr-1">Creado:</span>\r
            {{ current.created_at | date:'medium' }}\r
          </span>\r
          <span class="inline-flex items-center px-2.5 py-1.5 rounded bg-gray-100 text-gray-700">\r
            <span class="font-semibold text-gray-900 mr-1">Actualizado:</span>\r
            {{ current.updated_at | date:'medium' }}\r
          </span>\r
        </div>\r
\r
        <div class="page-header-stats grid grid-cols-7 gap-3 text-xs pb-1">\r
          <div>\r
            <span class="block text-gray-500 font-medium">Fecha Contrato</span>\r
            <span class="text-gray-900 font-semibold">{{ current.contract_date | localDate:'mediumDate' }}</span>\r
          </div>\r
          <div>\r
            <span class="block text-gray-500 font-medium">Precio Total</span>\r
            <span class="text-gray-900 font-semibold">{{ current.total_price | currency:current.currency }}</span>\r
          </div>\r
          <div>\r
            <span class="block text-gray-500 font-medium">Enganche</span>\r
            <span class="text-gray-900 font-semibold">{{ current.down_payment | currency:current.currency }}</span>\r
          </div>\r
          <div>\r
            <span class="block text-gray-500 font-medium">Total Pagado</span>\r
            <span class="text-green-600 font-semibold">{{ (current.total_price - current.remaining_balance) | currency:current.currency }}</span>\r
          </div>\r
          <div>\r
            <span class="flex items-center gap-1 text-gray-500 font-medium">\r
              Saldo Pendiente\r
              <span\r
                *ngIf="paymentStats()"\r
                class="cursor-help text-gray-400 hover:text-gray-600"\r
                [matTooltip]="getPendingBreakdown()"\r
                matTooltipPosition="above"\r
                matTooltipShowDelay="100">\r
                <lucide-icon [img]="InfoIcon" [size]="14"></lucide-icon>\r
              </span>\r
            </span>\r
            <span class="text-red-600 font-semibold">{{ current.remaining_balance | currency:current.currency }}</span>\r
          </div>\r
          <div>\r
            <span class="block text-gray-500 font-medium">Meses de Pago</span>\r
            <span class="text-gray-900 font-semibold">{{ current.payment_months }} meses</span>\r
          </div>\r
          <div>\r
            <span class="block text-gray-500 font-medium">Pago Mensual</span>\r
            <span class="text-gray-900 font-semibold">{{ current.monthly_payment | currency:current.currency }}</span>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="tabs px-6 pt-2">\r
      <button class="tab" [class.active]="activeTab() === 'edit'" (click)="setActiveTab('edit')">Editar</button>\r
      <button class="tab" [class.active]="activeTab() === 'payments'" (click)="setActiveTab('payments')">Pagos</button>\r
      <button class="tab" [class.active]="activeTab() === 'down_payments'" (click)="setActiveTab('down_payments')">Enganche en Pagos</button>\r
      <button class="tab" [class.active]="activeTab() === 'hoa'" (click)="setActiveTab('hoa')">HOA</button>\r
      <button class="tab" [class.active]="activeTab() === 'documents'" (click)="setActiveTab('documents')">Documentos</button>\r
      <button class="tab" [class.active]="activeTab() === 'statement'" (click)="setActiveTab('statement')">Estado de Cuenta</button>\r
    </div>\r
\r
    <div class="page-body">\r
      <div class="tab-content" [class.active]="activeTab() === 'edit'">\r
        <div *ngIf="current.down_payment_financed" class="mb-2 p-2 bg-amber-50 rounded-lg border border-amber-200">\r
          <div class="grid grid-cols-4 gap-2 text-xs">\r
            <div>\r
              <span class="block font-semibold text-amber-700 mb-0.5">Estado enganche</span>\r
              <span class="text-amber-900 font-semibold">Activo</span>\r
            </div>\r
            <div>\r
              <span class="block font-semibold text-amber-700 mb-0.5">Meses</span>\r
              <span class="text-amber-900 font-semibold">{{ current.down_payment_months || '\u2014' }}</span>\r
            </div>\r
            <div>\r
              <span class="block font-semibold text-amber-700 mb-0.5">Pago mensual</span>\r
              <span class="text-amber-900 font-semibold">{{ current.down_payment_monthly_amount | currency:current.currency }}</span>\r
            </div>\r
            <div>\r
              <span class="block font-semibold text-amber-700 mb-0.5">Primer pago / d\xEDa</span>\r
              <span class="text-amber-900 font-semibold">{{ current.down_payment_first_payment_date | localDate:'mediumDate' }} / {{ current.down_payment_payment_day || '\u2014' }}</span>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="space-y-2.5" [formGroup]="form">\r
          <div class="grid grid-cols-2 gap-2.5">\r
            <div>\r
              <span class="block text-xs font-semibold text-gray-500 mb-1">N\xFAmero de Contrato</span>\r
              <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">\r
                {{ current.contract_number }}\r
              </span>\r
            </div>\r
\r
            <div>\r
              <span class="block text-xs font-semibold text-gray-500 mb-1">Lote</span>\r
              <span\r
                *ngIf="current.property"\r
                (click)="openPropertyModal()"\r
                class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 transition-colors">\r
                {{ current.property.code }}\r
              </span>\r
              <span *ngIf="!current.property" class="text-gray-900">\u2014</span>\r
            </div>\r
          </div>\r
\r
          <div>\r
            <label for="seller-search" class="block text-xs font-semibold text-gray-500 mb-1">Vendido Por</label>\r
            <div class="relative">\r
              <input\r
                #sellerAutocompleteTrigger="matAutocompleteTrigger"\r
                id="seller-search"\r
                type="text"\r
                formControlName="seller_search"\r
                [placeholder]="current.seller ? 'Buscar nuevo vendedor...' : 'Buscar por nombre o email'"\r
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"\r
                (focus)="onSellerSearchFocus()"\r
                (blur)="onSellerSearchBlur()"\r
                [matAutocomplete]="autoSeller"\r
                aria-label="Buscar vendedor">\r
              <button\r
                type="button"\r
                *ngIf="current.seller && form.get('seller_search')?.value"\r
                (click)="clearSeller()"\r
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600">\r
                \u2715\r
              </button>\r
            </div>\r
            <mat-autocomplete #autoSeller="matAutocomplete">\r
              <mat-option *ngFor="let seller of filteredVendors()" [value]="seller" (click)="onSellerSelected(seller)">\r
                {{ displaySeller(seller) }}\r
              </mat-option>\r
              <mat-option *ngIf="filteredVendors().length === 0" disabled>\r
                <span class="text-sm text-gray-500">No se encontraron vendedores</span>\r
              </mat-option>\r
            </mat-autocomplete>\r
          </div>\r
\r
          <div class="grid grid-cols-2 gap-2.5">\r
            <app-input label="Fecha del Contrato" type="date" [form_control]="form.controls['contract_date']"></app-input>\r
            <app-select [label]="'Estado *'" [config]="statusSelectConfig"></app-select>\r
            <app-input label="Precio Total" type="number" disabled="true" [form_control]="form.controls['total_price']"></app-input>\r
            <app-input label="Enganche" type="number" disabled="true" [form_control]="form.controls['down_payment']"></app-input>\r
            <app-input label="Saldo Pendiente" type="number" [form_control]="form.controls['remaining_balance']"></app-input>\r
            <app-input label="Meses de Pago" type="number" [form_control]="form.controls['payment_months']"></app-input>\r
            <app-input label="Pago Mensual" type="number" [form_control]="form.controls['monthly_payment']"></app-input>\r
            <app-input label="Fecha Primer Pago" type="date" [form_control]="form.controls['first_payment_date']"></app-input>\r
          </div>\r
\r
          <app-input label="Notas" type="textarea" [form_control]="form.controls['notes']"></app-input>\r
        </div>\r
      </div>\r
\r
      <div class="tab-content" [class.active]="activeTab() === 'payments'">\r
        <app-contract-payments\r
          [contractId]="current.id"\r
          [currency]="current.currency"\r
          [contractStatus]="current.status"\r
          (dataChanged)="refreshContractData()">\r
        </app-contract-payments>\r
      </div>\r
\r
      <div class="tab-content" [class.active]="activeTab() === 'down_payments'">\r
        <app-contract-downpayment-payments\r
          [contractId]="current.id"\r
          [currency]="current.currency"\r
          [contract]="current"\r
          (dataChanged)="refreshContractData()">\r
        </app-contract-downpayment-payments>\r
      </div>\r
\r
      <div class="tab-content" [class.active]="activeTab() === 'hoa'">\r
        <app-contract-hoa-payments\r
          [contractId]="current.id"\r
          [currency]="current.currency"\r
          [contractStatus]="current.status"\r
          [contract]="current"\r
          (dataChanged)="refreshContractData()">\r
        </app-contract-hoa-payments>\r
      </div>\r
\r
      <div class="tab-content" [class.active]="activeTab() === 'documents'">\r
        <app-contract-documents [contractId]="current.id"></app-contract-documents>\r
      </div>\r
\r
      <div class="tab-content" [class.active]="activeTab() === 'statement'">\r
        <div class="p-6 text-center">\r
          <div class="mb-4">\r
            <p class="text-gray-600 mb-4">Descarga el estado de cuenta en formato PDF</p>\r
            <button\r
              (click)="downloadStatement()"\r
              class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">\r
              \u{1F4E5} Descargar Estado de Cuenta\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="page-footer">\r
      <div class="flex justify-between w-full">\r
        <app-button\r
          text="Eliminar Contrato"\r
          variant="danger"\r
          [customClass]="'btn-outline-danger'"\r
          [fullWidth]="false"\r
          size="sm"\r
          [loading]="deleting()"\r
          (clicked)="deleteContract()">\r
        </app-button>\r
\r
        <div class="flex gap-2">\r
          <app-button\r
            *ngIf="activeTab() === 'edit'"\r
            text="Guardar Cambios"\r
            [customClass]="'btn_primary'"\r
            [fullWidth]="false"\r
            size="sm"\r
            [loading]="saving()"\r
            (clicked)="saveContract()">\r
          </app-button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div *ngIf="loading()" class="contract-detail-page py-10 text-center text-gray-500">Cargando contrato...</div>\r
`, styles: ["/* src/app/features/contracts/pages/contract-detail-page/contract-detail-page.component.scss */\n.contract-detail-page {\n  width: 100%;\n  min-height: calc(100vh - 96px);\n  margin: 0;\n  padding: 0;\n  background: #fff;\n}\n.page-shell {\n  width: 100%;\n  max-width: none;\n  min-height: calc(100vh - 96px);\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n  border-radius: 0;\n  border: none;\n  box-shadow: none;\n}\n.page-shell.page-shell--wide {\n  max-width: none;\n}\n.page-header {\n  padding: 1.2rem 1.5rem 1.25rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.page-header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n}\n.page-header-top {\n  margin-bottom: 0.9rem;\n}\n.contract-meta-badges {\n  margin-bottom: 0.9rem;\n}\n.page-header-stats {\n  gap: 0.85rem;\n}\n.page-header-stats > div {\n  background: #f8fafc;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.65rem;\n  padding: 0.72rem 0.8rem;\n}\n.page-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0.85rem 1.5rem;\n  min-height: 0;\n}\n.page-footer {\n  padding: 0.8rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.625rem;\n  flex-shrink: 0;\n}\n.page-footer :global(.btn-outline-danger) {\n  background: transparent !important;\n  color: #dc2626 !important;\n  border: 2px solid #dc2626 !important;\n}\n.page-footer :global(.btn-outline-danger):hover {\n  background: #fef2f2 !important;\n  border-color: #b91c1c !important;\n  color: #b91c1c !important;\n}\n.page-footer :global(.btn-outline-danger):disabled {\n  background: transparent !important;\n  color: #fca5a5 !important;\n  border-color: #fca5a5 !important;\n}\n.tabs {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  margin-bottom: 0.45rem;\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n  gap: 0.25rem;\n  flex-shrink: 0;\n}\n.tab {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #6b7280;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab:hover {\n  color: #111827;\n}\n.tab.active {\n  color: #6366f1;\n  border-bottom-color: #6366f1;\n}\n.tab-content {\n  display: none;\n}\n.tab-content.active {\n  display: block;\n}\n/*# sourceMappingURL=contract-detail-page.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: Location }, { type: MatDialog }, { type: PropertyService }, { type: ContractService }, { type: PaymentService }, { type: UserService }, { type: InterceptorService }, { type: FormBuilder }, { type: ChangeDetectorRef }], { vendorAutocompleteTrigger: [{
    type: ViewChild,
    args: ["vendorAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractDetailPageComponent, { className: "ContractDetailPageComponent", filePath: "src/app/features/contracts/pages/contract-detail-page/contract-detail-page.component.ts", lineNumber: 49 });
})();
export {
  ContractDetailPageComponent
};
//# sourceMappingURL=chunk-M62J732L.js.map
