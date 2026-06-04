import {
  BackButtonComponent
} from "./chunk-RVKMRBOU.js";
import {
  VendorDetailModalComponent,
  VendorService
} from "./chunk-H66Q2H2J.js";
import {
  CategoriesDialogComponent,
  FiscalConfigurationModalComponent,
  ProductDetailModalComponent,
  ProductService,
  WarehouseDetailModalComponent
} from "./chunk-7SAIXWY7.js";
import {
  FiscalConfigurationService
} from "./chunk-ZJ75H3I6.js";
import {
  EmailTemplateService
} from "./chunk-CMZCHHG7.js";
import "./chunk-GGGBJUPY.js";
import {
  DataMapperService,
  UserService
} from "./chunk-322UVJ4U.js";
import {
  ExchangeRateService,
  PermissionSyncService
} from "./chunk-HRL4ZNVT.js";
import {
  SETTINGS_PERMISSIONS
} from "./chunk-K6DFM2KE.js";
import {
  PosEquipmentService,
  formatPosCurrency,
  formatPosDateTime,
  parsePosMoney,
  posSessionEquipmentLabel,
  posSessionUserLabel,
  resolveSessionBranchLabel,
  sessionExpectedCash,
  sessionIsOpen,
  sessionOpeningCash,
  sessionTotalSales,
  sessionTurnLabel
} from "./chunk-T54TKC3O.js";
import {
  BranchService
} from "./chunk-RYWE5TDX.js";
import {
  WarehouseService
} from "./chunk-UAER4BUV.js";
import {
  POSService
} from "./chunk-FIVGSAPL.js";
import {
  SearchComponent
} from "./chunk-6GVVTZBH.js";
import {
  DatatableWrapperComponent
} from "./chunk-AKCDHR72.js";
import {
  SelectComponent
} from "./chunk-KW3QIBBO.js";
import {
  AlertDialogComponent,
  InterceptorService
} from "./chunk-AU5FE5QM.js";
import {
  InputComponent
} from "./chunk-K3AQGIHQ.js";
import {
  ButtonComponent
} from "./chunk-WDQLA25Z.js";
import "./chunk-ZBOYOAJV.js";
import {
  CustomSnackbarComponent,
  MatButtonModule,
  MatSnackBar,
  ToastService
} from "./chunk-QTSLBIKC.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "./chunk-I5IOP5OM.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BOPJE7PX.js";
import {
  ArrowRight,
  CircleCheck,
  LucideAngularComponent,
  LucideAngularModule,
  Pen,
  Power,
  Trash2,
  X
} from "./chunk-4Y3D6DZ3.js";
import {
  AuthService
} from "./chunk-MDAYJWTZ.js";
import {
  ActivatedRoute,
  DomSanitizer,
  Router,
  RouterOutlet
} from "./chunk-SH63266R.js";
import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  DecimalPipe,
  HttpClient,
  NgClass,
  NgForOf,
  NgIf,
  TitleCasePipe,
  environment
} from "./chunk-6DLZ3MOQ.js";
import {
  BehaviorSubject,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  Observable,
  Output,
  Subject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  catchError,
  combineLatest,
  distinctUntilChanged,
  finalize,
  map,
  of,
  setClassMetadata,
  shareReplay,
  signal,
  startWith,
  switchMap,
  takeUntil,
  tap,
  timeout,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵariaProperty,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-JD27NKNP.js";

// src/app/features/rbac-tenant-ui/rbac-tenant-ui.component.ts
var RbacTenantUIComponent = class _RbacTenantUIComponent {
  static \u0275fac = function RbacTenantUIComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RbacTenantUIComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RbacTenantUIComponent, selectors: [["app-rbac-tenant-ui"]], decls: 2, vars: 0, consts: [[1, "h-screen", "flex", "flex-col"]], template: function RbacTenantUIComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "router-outlet");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [CommonModule, RouterOutlet], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n/*# sourceMappingURL=rbac-tenant-ui.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RbacTenantUIComponent, [{
    type: Component,
    args: [{ selector: "app-rbac-tenant-ui", standalone: true, imports: [CommonModule, RouterOutlet], template: `
    <div class="h-screen flex flex-col">
      <router-outlet></router-outlet>
    </div>
  `, styles: ["/* angular:styles/component:scss;c63aac4e1d1ce1074d0fb61b93c3d082a38ddfc40b5cc09fdd9a596f2e08e21b;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/rbac-tenant-ui/rbac-tenant-ui.component.ts */\n:host {\n  display: block;\n  height: 100%;\n}\n/*# sourceMappingURL=rbac-tenant-ui.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RbacTenantUIComponent, { className: "RbacTenantUIComponent", filePath: "src/app/features/rbac-tenant-ui/rbac-tenant-ui.component.ts", lineNumber: 26 });
})();

// src/app/features/rbac-tenant-ui/pages/settings/settings.component.ts
function SettingsComponent_div_7_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("click", function SettingsComponent_div_7_div_4_Template_div_click_0_listener() {
      const section_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigateTo(section_r2.route));
    });
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 15);
    \u0275\u0275text(9);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 16);
    \u0275\u0275element(11, "path", 17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const section_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(section_r2.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Ir a ", section_r2.title, " ");
  }
}
function SettingsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "h2", 7);
    \u0275\u0275text(2, "Accesos y Permisos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 8);
    \u0275\u0275template(4, SettingsComponent_div_7_div_4_Template, 12, 4, "div", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.visibleAccessSections);
  }
}
function SettingsComponent_div_8_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("click", function SettingsComponent_div_8_div_4_Template_div_click_0_listener() {
      const section_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigateTo(section_r5.route));
    });
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 15);
    \u0275\u0275text(9);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 16);
    \u0275\u0275element(11, "path", 17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const section_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(section_r5.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r5.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Ir a ", section_r5.title, " ");
  }
}
function SettingsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "h2", 7);
    \u0275\u0275text(2, "Empresa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 8);
    \u0275\u0275template(4, SettingsComponent_div_8_div_4_Template, 12, 4, "div", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.visibleCompanySections);
  }
}
function SettingsComponent_div_9_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275listener("click", function SettingsComponent_div_9_div_4_Template_div_click_0_listener() {
      const section_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.navigateTo(section_r7.route));
    });
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 14);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 15);
    \u0275\u0275text(9);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 16);
    \u0275\u0275element(11, "path", 17);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const section_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(section_r7.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r7.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Ir a ", section_r7.title, " ");
  }
}
function SettingsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "h2", 7);
    \u0275\u0275text(2, "Comunicaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 8);
    \u0275\u0275template(4, SettingsComponent_div_9_div_4_Template, 12, 4, "div", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.visibleCommunicationSections);
  }
}
var SettingsComponent = class _SettingsComponent {
  router;
  activatedRoute;
  authService;
  cdr;
  accessSections = [
    {
      id: "users",
      title: "Usuarios",
      description: "Gestiona usuarios del tenant, asigna roles y controla permisos de acceso de forma centralizada",
      icon: "\u{1F465}",
      route: "users",
      permissions: ["user:ViewMenu"]
    },
    {
      id: "roles",
      title: "Roles y Permisos",
      description: "Crea y gestiona roles personalizados, define permisos granulares y organiza el control de acceso",
      icon: "\u{1F510}",
      route: "roles",
      permissions: ["role:ViewMenu"]
    }
  ];
  companySections = [
    {
      id: "warehouses",
      title: "Almacenes",
      description: "Gestiona almacenes, ubicaciones, informaci\xF3n fiscal y datos de contacto de tus almacenes",
      icon: "\u{1F3ED}",
      route: "warehouses",
      permissions: ["warehouses:ViewMenu"]
    },
    {
      id: "fiscal-configurations",
      title: "Configuraci\xF3n Fiscal",
      description: "Gestiona la informaci\xF3n fiscal de tus almacenes, RFC, r\xE9gimen fiscal y certificados digitales",
      icon: "\u{1F4CB}",
      route: "fiscal-configurations",
      permissions: ["billing:ViewMenu"]
    },
    {
      id: "vendors",
      title: "Proveedores",
      description: "Gestiona proveedores, informaci\xF3n de contacto, RFC y datos fiscales de tus proveedores",
      icon: "\u{1F3E2}",
      route: "vendors",
      permissions: ["vendors:ViewMenu"]
    },
    {
      id: "products",
      title: "Productos",
      description: "Gestiona el cat\xE1logo de productos, SKU, nombres y descripciones de tus productos",
      icon: "\u{1F4E6}",
      route: "products",
      permissions: ["products:ViewMenu"]
    },
    {
      id: "pos-configuration",
      title: "Punto de Venta",
      description: "Configura y gestiona tu punto de venta, terminales, cajas y configuraciones de ventas",
      icon: "\u{1F6D2}",
      route: "pos-configuration",
      permissions: ["pos_configuration:ViewMenu"]
    },
    {
      id: "exchange-rates",
      title: "Tipo de Cambio",
      description: "Registra y consulta el tipo de cambio diario USD/MXN para operaciones financieras",
      icon: "\u{1F4B1}",
      route: "exchange-rates",
      permissions: ["exchangerate:ViewMenu", "exchangerate:Read", "exchangerate:Update"]
    }
  ];
  communicationSections = [
    {
      id: "email-templates",
      title: "Plantillas de Correo",
      description: "Crea y gestiona plantillas de correo personalizadas para notificaciones y comunicaciones",
      icon: "\u{1F4E7}",
      route: "email-templates",
      permissions: [
        "email-templates:ViewMenu",
        "email-templates:Read",
        "email-templates:Create",
        "email-templates:Update",
        "email-templates:Delete",
        "emailtemplates:ViewMenu",
        "email_templates:Read",
        "email_templates:Create",
        "email_templates:Update",
        "email_templates:Delete"
      ]
    },
    {
      id: "mailer-configurations",
      title: "Configuraci\xF3n de Correo",
      description: "Configura el proveedor de env\xEDo de correos del tenant, incluyendo Resend y la configuraci\xF3n activa",
      icon: "\u2709\uFE0F",
      route: "mailer-configurations",
      permissions: []
    }
  ];
  sections = [];
  permissionsSubscription;
  constructor(router, activatedRoute, authService, cdr) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.authService = authService;
    this.cdr = cdr;
  }
  ngOnInit() {
    this.permissionsSubscription = this.authService.permissions$.subscribe(() => {
      this.cdr.markForCheck();
    });
  }
  ngOnDestroy() {
    this.permissionsSubscription?.unsubscribe();
  }
  /**
   * Check if user has permission to access a section
   */
  hasAccess(section) {
    if (!section.permissions || section.permissions.length === 0) {
      return true;
    }
    return section.permissions.some((permission) => this.authService.hasPermission(permission));
  }
  /**
   * Get filtered sections based on user permissions
   */
  get visibleAccessSections() {
    return this.accessSections.filter((section) => this.hasAccess(section));
  }
  get visibleCompanySections() {
    return this.companySections.filter((section) => this.hasAccess(section));
  }
  get visibleCommunicationSections() {
    return this.communicationSections.filter((section) => this.hasAccess(section));
  }
  navigateTo(route) {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }
  static \u0275fac = function SettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SettingsComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["app-settings"]], decls: 10, vars: 3, consts: [[1, "min-h-screen"], [1, "px-2", "py-2"], [1, "mb-6"], [1, "text-3xl", "font-bold", "text-gray-900", "mb-2"], [1, "text-gray-600"], ["class", "mb-8", 4, "ngIf"], [1, "mb-8"], [1, "text-lg", "font-semibold", "text-gray-700", "mb-4", "px-1"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-4"], ["class", "bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200", 3, "click", 4, "ngFor", "ngForOf"], [1, "bg-white", "rounded-lg", "p-5", "hover:shadow-md", "transition-shadow", "duration-300", "cursor-pointer", "border", "border-gray-200", 3, "click"], [1, "flex", "flex-col", "h-full"], [1, "text-4xl", "mb-3"], [1, "text-lg", "font-semibold", "text-gray-900", "mb-2"], [1, "text-gray-600", "text-sm", "mb-4", "grow"], [1, "inline-flex", "items-center", "text-indigo-600", "font-medium", "text-sm", "hover:text-indigo-700", "transition-colors"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "ml-2", "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"]], template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, "Configuraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Gestiona usuarios, roles y permisos de tu empresa");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, SettingsComponent_div_7_Template, 5, 1, "div", 5)(8, SettingsComponent_div_8_Template, 5, 1, "div", 5)(9, SettingsComponent_div_9_Template, 5, 1, "div", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.visibleAccessSections.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.visibleCompanySections.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.visibleCommunicationSections.length > 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n/*# sourceMappingURL=settings.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsComponent, [{
    type: Component,
    args: [{ selector: "app-settings", standalone: true, imports: [CommonModule], template: `
    <div class="min-h-screen">
      <div class="px-2 py-2">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Configuraci\xF3n</h1>
          <p class="text-gray-600">Gestiona usuarios, roles y permisos de tu empresa</p>
        </div>

        <!-- Accesos y Permisos -->
        <div class="mb-8" *ngIf="visibleAccessSections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Accesos y Permisos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of visibleAccessSections" 
                 (click)="navigateTo(section.route)"
                 class="bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200">
              
              <div class="flex flex-col h-full">
                <div class="text-4xl mb-3">{{ section.icon }}</div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ section.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 grow">{{ section.description }}</p>
                
                <div class="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                  Ir a {{ section.title }}
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empresa -->
        <div class="mb-8" *ngIf="visibleCompanySections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Empresa</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of visibleCompanySections" 
                 (click)="navigateTo(section.route)"
                 class="bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200">
              
              <div class="flex flex-col h-full">
                <div class="text-4xl mb-3">{{ section.icon }}</div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ section.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 grow">{{ section.description }}</p>
                
                <div class="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                  Ir a {{ section.title }}
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comunicaci\xF3n -->
        <div class="mb-8" *ngIf="visibleCommunicationSections.length > 0">
          <h2 class="text-lg font-semibold text-gray-700 mb-4 px-1">Comunicaci\xF3n</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div *ngFor="let section of visibleCommunicationSections" 
                 (click)="navigateTo(section.route)"
                 class="bg-white rounded-lg p-5 hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-200">
              
              <div class="flex flex-col h-full">
                <div class="text-4xl mb-3">{{ section.icon }}</div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ section.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 grow">{{ section.description }}</p>
                
                <div class="inline-flex items-center text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
                  Ir a {{ section.title }}
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;c63aac4e1d1ce1074d0fb61b93c3d082a38ddfc40b5cc09fdd9a596f2e08e21b;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/rbac-tenant-ui/pages/settings/settings.component.ts */\n:host {\n  display: block;\n  height: 100%;\n}\n/*# sourceMappingURL=settings.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: AuthService }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/features/rbac-tenant-ui/pages/settings/settings.component.ts", lineNumber: 118 });
})();

// src/app/features/rbac-tenant-ui/services/state.service.ts
var StateService = class _StateService {
  // Core data subjects
  usersSubject = new BehaviorSubject([]);
  rolesSubject = new BehaviorSubject([]);
  modulesSubject = new BehaviorSubject([]);
  // Selection subjects
  selectedUserIdSubject = new BehaviorSubject(null);
  selectedRoleIdSubject = new BehaviorSubject(null);
  // Filter subjects
  userSearchFilterSubject = new BehaviorSubject("");
  userStatusFilterSubject = new BehaviorSubject("all");
  roleSearchFilterSubject = new BehaviorSubject("");
  // Custom comparator for arrays - compares id and permission_count to detect updates
  arrayComparator = (prev, curr) => {
    if (prev.length !== curr.length)
      return false;
    return prev.every((item, index) => item.id === curr[index].id && item.permission_count === curr[index].permission_count);
  };
  // Public observables for core data
  users$ = this.usersSubject.asObservable().pipe(distinctUntilChanged(this.arrayComparator));
  roles$ = this.rolesSubject.asObservable().pipe(distinctUntilChanged(this.arrayComparator));
  modules$ = this.modulesSubject.asObservable().pipe(distinctUntilChanged(this.arrayComparator));
  // Public observables for selections
  selectedUserId$ = this.selectedUserIdSubject.asObservable().pipe(distinctUntilChanged());
  selectedRoleId$ = this.selectedRoleIdSubject.asObservable().pipe(distinctUntilChanged());
  // Public observables for filters
  userSearchFilter$ = this.userSearchFilterSubject.asObservable().pipe(distinctUntilChanged());
  userStatusFilter$ = this.userStatusFilterSubject.asObservable().pipe(distinctUntilChanged());
  roleSearchFilter$ = this.roleSearchFilterSubject.asObservable().pipe(distinctUntilChanged());
  // Filtered users observable - combines users with search and status filters
  filteredUsers$ = combineLatest([
    this.users$,
    this.userSearchFilter$,
    this.userStatusFilter$
  ]).pipe(map(([users, searchFilter, statusFilter]) => {
    return users.filter((user) => {
      const matchesSearch = searchFilter === "" || user.email.toLowerCase().includes(searchFilter.toLowerCase());
      const userStatus = typeof user.status === "string" ? user.status : user.status && typeof user.status === "object" && user.status.code ? user.status.code : "active";
      const matchesStatus = statusFilter === "all" || userStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }), distinctUntilChanged((prev, curr) => {
    if (prev.length !== curr.length)
      return false;
    return prev.every((item, index) => item.id === curr[index].id);
  }));
  // Filtered roles observable - combines roles with search filter
  filteredRoles$ = combineLatest([
    this.roles$,
    this.roleSearchFilter$
  ]).pipe(map(([roles, searchFilter]) => {
    return roles.filter((role) => {
      return searchFilter === "" || role.name.toLowerCase().includes(searchFilter.toLowerCase());
    });
  }), distinctUntilChanged((prev, curr) => {
    if (prev.length !== curr.length)
      return false;
    return prev.every((item, index) => item.id === curr[index].id && item.permission_count === curr[index].permission_count);
  }));
  constructor() {
  }
  // User management methods
  selectUser(userId) {
    this.selectedUserIdSubject.next(userId);
  }
  clearUserSelection() {
    this.selectedUserIdSubject.next(null);
  }
  setUserSearchFilter(filter) {
    this.userSearchFilterSubject.next(filter);
  }
  setUserStatusFilter(status) {
    this.userStatusFilterSubject.next(status);
  }
  updateUsers(users) {
    this.usersSubject.next(users);
  }
  // Role management methods
  selectRole(roleId) {
    this.selectedRoleIdSubject.next(roleId);
  }
  clearRoleSelection() {
    this.selectedRoleIdSubject.next(null);
  }
  setRoleSearchFilter(filter) {
    this.roleSearchFilterSubject.next(filter);
  }
  updateRoles(roles) {
    this.rolesSubject.next(roles);
  }
  // Module management methods
  updateModules(modules) {
    this.modulesSubject.next(modules);
  }
  // Utility methods
  resetFilters() {
    this.userSearchFilterSubject.next("");
    this.userStatusFilterSubject.next("all");
    this.roleSearchFilterSubject.next("");
  }
  resetSelections() {
    this.selectedUserIdSubject.next(null);
    this.selectedRoleIdSubject.next(null);
  }
  static \u0275fac = function StateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StateService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StateService, factory: _StateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/features/rbac-tenant-ui/components/user-search-filter/user-search-filter.component.ts
var UserSearchFilterComponent = class _UserSearchFilterComponent {
  stateService;
  statusFilterConfig;
  constructor(stateService) {
    this.stateService = stateService;
    this.statusFilterConfig = {
      placeholder: "Filtrar por estado",
      data: [
        { value: "all", label: "Todos los Estados" },
        { value: "active", label: "Activo" },
        { value: "inactive", label: "Inactivo" },
        { value: "pending", label: "Pendiente" }
      ],
      name_select: "status",
      value: null,
      option: "label",
      value_default: null,
      all: false
    };
  }
  ngOnInit() {
  }
  /**
   * Handles search filter changes from SearchComponent
   * Emits the search filter to the state service
   * @param searchQuery - The search query string
   */
  onSearchChange(searchQuery) {
    this.stateService.setUserSearchFilter(searchQuery);
  }
  /**
   * Handles status filter changes from SelectComponent
   * Emits the status filter to the state service
   * @param event - The change event from SelectComponent
   */
  onStatusFilterChange(event) {
    const statusValue = event.value;
    this.stateService.setUserStatusFilter(statusValue);
  }
  static \u0275fac = function UserSearchFilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserSearchFilterComponent)(\u0275\u0275directiveInject(StateService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserSearchFilterComponent, selectors: [["app-user-search-filter"]], decls: 5, vars: 1, consts: [[1, "space-y-3", "w-full"], [1, "w-full", "overflow-hidden"], ["placeholder", "Buscar por email...", 3, "searchChange"], [1, "w-full"], [3, "changeOption", "config"]], template: function UserSearchFilterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "app-search", 2);
      \u0275\u0275listener("searchChange", function UserSearchFilterComponent_Template_app_search_searchChange_2_listener($event) {
        return ctx.onSearchChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(3, "div", 3)(4, "app-select", 4);
      \u0275\u0275listener("changeOption", function UserSearchFilterComponent_Template_app_select_changeOption_4_listener($event) {
        return ctx.onStatusFilterChange($event);
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.statusFilterConfig);
    }
  }, dependencies: [CommonModule, SearchComponent, SelectComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n  .search_container {\n  width: 100%;\n}\n  .search_container input {\n  width: 100% !important;\n  max-width: 100% !important;\n}\n  .select_container {\n  width: 100%;\n}\n  .filter__control {\n  width: 100%;\n}\n/*# sourceMappingURL=user-search-filter.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserSearchFilterComponent, [{
    type: Component,
    args: [{ selector: "app-user-search-filter", standalone: true, imports: [CommonModule, SearchComponent, SelectComponent], template: `
    <div class="space-y-3 w-full">
      <!-- Email Search Input -->
      <div class="w-full overflow-hidden">
        <app-search
          placeholder="Buscar por email..."
          (searchChange)="onSearchChange($event)"
        ></app-search>
      </div>

      <!-- Status Filter Dropdown -->
      <div class="w-full">
        <app-select
          [config]="statusFilterConfig"
          (changeOption)="onStatusFilterChange($event)"
        ></app-select>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;258e4d44fbe15c027af9ab510b4b4666095aef42b59061e94b98f532af0512fa;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/rbac-tenant-ui/components/user-search-filter/user-search-filter.component.ts */\n:host {\n  display: block;\n  width: 100%;\n}\n::ng-deep .search_container {\n  width: 100%;\n}\n::ng-deep .search_container input {\n  width: 100% !important;\n  max-width: 100% !important;\n}\n::ng-deep .select_container {\n  width: 100%;\n}\n::ng-deep .filter__control {\n  width: 100%;\n}\n/*# sourceMappingURL=user-search-filter.component.css.map */\n"] }]
  }], () => [{ type: StateService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserSearchFilterComponent, { className: "UserSearchFilterComponent", filePath: "src/app/features/rbac-tenant-ui/components/user-search-filter/user-search-filter.component.ts", lineNumber: 62 });
})();

// src/app/features/rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component.ts
var ConfirmDialogComponent = class _ConfirmDialogComponent {
  dialogRef;
  data;
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  static \u0275fac = function ConfirmDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmDialogComponent, selectors: [["app-confirm-dialog"]], decls: 15, vars: 6, consts: [[1, "bg-white", "rounded-lg", "w-full"], [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-b", "border-gray-200"], [1, "text-lg", "font-semibold", "text-gray-900"], [1, "text-gray-400", "hover:text-gray-600", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "px-6", "py-6"], [1, "text-sm", "text-gray-600"], [1, "px-6", "py-4", "bg-gray-50", "border-t", "border-gray-200", "flex", "justify-end", "gap-3", "rounded-b-lg"], [1, "px-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "hover:bg-gray-50", "transition-colors", "font-medium", 3, "click"], [1, "px-4", "py-2", "text-white", "rounded-lg", "disabled:bg-gray-400", "disabled:cursor-not-allowed", "transition-colors", "font-medium", 3, "click"]], template: function ConfirmDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "button", 3);
      \u0275\u0275domListener("click", function ConfirmDialogComponent_Template_button_click_4_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(5, "svg", 4);
      \u0275\u0275domElement(6, "path", 5);
      \u0275\u0275domElementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(7, "div", 6)(8, "p", 7);
      \u0275\u0275text(9);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(10, "div", 8)(11, "button", 9);
      \u0275\u0275domListener("click", function ConfirmDialogComponent_Template_button_click_11_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "button", 10);
      \u0275\u0275domListener("click", function ConfirmDialogComponent_Template_button_click_13_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275text(14);
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.title);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.data.message);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.data.cancelText || "Cancelar", " ");
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.data.isDangerous ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.data.confirmText || "Confirmar", " ");
    }
  }, dependencies: [CommonModule, MatDialogModule, MatButtonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmDialogComponent, [{
    type: Component,
    args: [{ selector: "app-confirm-dialog", standalone: true, imports: [CommonModule, MatDialogModule, MatButtonModule], template: `
    <div class="bg-white rounded-lg w-full">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">{{ data.title }}</h2>
        <button 
          (click)="onCancel()"
          class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-6">
        <p class="text-sm text-gray-600">{{ data.message }}</p>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-lg">
        <button
          (click)="onCancel()"
          class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          {{ data.cancelText || 'Cancelar' }}
        </button>
        <button
          (click)="onConfirm()"
          [class]="data.isDangerous ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'"
          class="px-4 py-2 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium">
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </div>
    </div>
  ` }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmDialogComponent, { className: "ConfirmDialogComponent", filePath: "src/app/features/rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component.ts", lineNumber: 74 });
})();

// src/app/features/rbac-tenant-ui/components/user-edit-dialog/user-edit-dialog.component.ts
var UserEditDialogComponent = class _UserEditDialogComponent {
  data;
  dialogRef;
  fb;
  userService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  constructor(data, dialogRef, fb, userService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.userService = userService;
    this.interceptorService = interceptorService;
    this.form = this.fb.group({
      first_name: [this.data.user.first_name || "", Validators.required],
      last_name: [this.data.user.last_name || "", Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      phone: [this.data.user.phone || ""]
    });
  }
  saveUser() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Por favor completa todos los campos requeridos"
      });
      return;
    }
    this.saving.set(true);
    this.userService.updateUser(this.data.user.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Usuario actualizado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: error.error?.message || "Error al actualizar el usuario"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function UserEditDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserEditDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserEditDialogComponent, selectors: [["app-user-edit-dialog"]], decls: 15, vars: 8, consts: [[1, "dialog-container"], [1, "dialog-header"], [1, "dialog-title"], [1, "close-button", 3, "click"], [3, "img", "size"], [1, "dialog-content", 3, "formGroup"], [1, "grid", "grid-cols-2", "gap-4"], ["label", "Nombre", 3, "form_control"], ["label", "Apellido", 3, "form_control"], ["label", "Email", 3, "form_control"], ["label", "Tel\xE9fono (Opcional)", 3, "form_control"], [1, "dialog-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Guardar Cambios", "custom_class", "btn_primary", 3, "clicked", "loading"]], template: function UserEditDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Editar Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function UserEditDialogComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6);
      \u0275\u0275element(8, "app-input", 7)(9, "app-input", 8)(10, "app-input", 9)(11, "app-input", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 11)(13, "app-button", 12);
      \u0275\u0275listener("clicked", function UserEditDialogComponent_Template_app_button_clicked_13_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "app-button", 13);
      \u0275\u0275listener("clicked", function UserEditDialogComponent_Template_app_button_clicked_14_listener() {
        return ctx.saveUser();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["first_name"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["last_name"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["email"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["phone"]);
      \u0275\u0275advance(3);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    NgControlStatusGroup,
    FormGroupDirective,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    LucideAngularModule,
    LucideAngularComponent
  ], styles: ["\n\n.dialog-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 600px;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=user-edit-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserEditDialogComponent, [{
    type: Component,
    args: [{ selector: "app-user-edit-dialog", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      LucideAngularModule
    ], template: `<div class="dialog-container">\r
  <div class="dialog-header">\r
    <h2 class="dialog-title">Editar Usuario</h2>\r
    <button (click)="close()" class="close-button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <div class="dialog-content" [formGroup]="form">\r
    <div class="grid grid-cols-2 gap-4">\r
      <app-input\r
        label="Nombre"\r
        [form_control]="form.controls['first_name']">\r
      </app-input>\r
\r
      <app-input\r
        label="Apellido"\r
        [form_control]="form.controls['last_name']">\r
      </app-input>\r
\r
      <app-input\r
        label="Email"\r
        [form_control]="form.controls['email']">\r
      </app-input>\r
\r
      <app-input\r
        label="Tel\xE9fono (Opcional)"\r
        [form_control]="form.controls['phone']">\r
      </app-input>\r
    </div>\r
  </div>\r
\r
  <div class="dialog-footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      text="Guardar Cambios"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      (clicked)="saveUser()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/rbac-tenant-ui/components/user-edit-dialog/user-edit-dialog.component.scss */\n.dialog-container {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 600px;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=user-edit-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: UserService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserEditDialogComponent, { className: "UserEditDialogComponent", filePath: "src/app/features/rbac-tenant-ui/components/user-edit-dialog/user-edit-dialog.component.ts", lineNumber: 26 });
})();

// src/app/features/rbac-tenant-ui/components/user-details/user-details.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function UserDetailsComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 21)(2, "app-select", 22);
    \u0275\u0275listener("changeOption", function UserDetailsComponent_Conditional_58_Template_app_select_changeOption_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onRoleAssignmentChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "app-button", 23);
    \u0275\u0275pipe(4, "async");
    \u0275\u0275listener("clicked", function UserDetailsComponent_Conditional_58_Template_app_button_clicked_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmRoleAssignment());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("config", ctx_r1.assignRoleSelectConfig);
    \u0275\u0275attribute("data-testid", "assign-role-select");
    \u0275\u0275advance();
    \u0275\u0275property("fullWidth", false)("disabled", !\u0275\u0275pipeBind1(4, 5, ctx_r1.selectedRoleIdForAssignment$));
    \u0275\u0275attribute("data-testid", "confirm-assign-role-btn");
  }
}
function UserDetailsComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 24);
    \u0275\u0275element(2, "div", 25);
    \u0275\u0275elementStart(3, "p", 26);
    \u0275\u0275text(4, "Cargando roles...");
    \u0275\u0275elementEnd()()();
  }
}
function UserDetailsComponent_Conditional_66_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "p", 26);
    \u0275\u0275text(2, "No hay roles asignados");
    \u0275\u0275elementEnd()();
  }
}
function UserDetailsComponent_Conditional_66_Conditional_0_Conditional_1_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 36);
    \u0275\u0275listener("clicked", function UserDetailsComponent_Conditional_66_Conditional_0_Conditional_1_For_2_Conditional_10_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r4);
      const role_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openRoleReplacementDropdown(role_r5.id));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("fullWidth", false);
    \u0275\u0275attribute("data-testid", "replace-role-btn-" + role_r5.id);
  }
}
function UserDetailsComponent_Conditional_66_Conditional_0_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 29)(2, "div", 3)(3, "p", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 31);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 32);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 33);
    \u0275\u0275conditionalCreate(10, UserDetailsComponent_Conditional_66_Conditional_0_Conditional_1_For_2_Conditional_10_Template, 1, 2, "app-button", 34);
    \u0275\u0275pipe(11, "async");
    \u0275\u0275elementStart(12, "app-button", 35);
    \u0275\u0275listener("clicked", function UserDetailsComponent_Conditional_66_Conditional_0_Conditional_1_For_2_Template_app_button_clicked_12_listener() {
      const role_r5 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deleteRoleFromUser(role_r5.id));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_18_0;
    const role_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275attribute("data-testid", "role-item-" + role_r5.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(role_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", role_r5.permissions.length, " permiso", role_r5.permissions.length !== 1 ? "s" : "", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(role_r5.description);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_18_0 = \u0275\u0275pipeBind1(11, 8, ctx_r1.availableRoles$)) ? 10 : -1, tmp_18_0);
    \u0275\u0275advance(2);
    \u0275\u0275property("fullWidth", false);
    \u0275\u0275attribute("data-testid", "delete-role-btn-" + role_r5.id);
  }
}
function UserDetailsComponent_Conditional_66_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275repeaterCreate(1, UserDetailsComponent_Conditional_66_Conditional_0_Conditional_1_For_2_Template, 13, 10, "div", 27, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const roles_r6 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(roles_r6);
  }
}
function UserDetailsComponent_Conditional_66_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UserDetailsComponent_Conditional_66_Conditional_0_Conditional_0_Template, 3, 0, "div", 27)(1, UserDetailsComponent_Conditional_66_Conditional_0_Conditional_1_Template, 3, 0, "div", 28);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length === 0 ? 0 : 1);
  }
}
function UserDetailsComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UserDetailsComponent_Conditional_66_Conditional_0_Template, 2, 1);
    \u0275\u0275pipe(1, "async");
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(1, 1, ctx_r1.userRoles$)) ? 0 : -1, tmp_1_0);
  }
}
function UserDetailsComponent_Conditional_67_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-select", 22);
    \u0275\u0275listener("changeOption", function UserDetailsComponent_Conditional_67_Conditional_3_Template_app_select_changeOption_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onRoleReplacementChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("config", ctx_r1.replaceRoleSelectConfig);
    \u0275\u0275attribute("data-testid", "replace-role-select");
  }
}
function UserDetailsComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "h4", 17);
    \u0275\u0275text(2, "Selecciona Nuevo Rol");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, UserDetailsComponent_Conditional_67_Conditional_3_Template, 1, 2, "app-select", 37);
    \u0275\u0275pipe(4, "async");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(4, 1, ctx_r1.availableRoles$)) ? 3 : -1, tmp_1_0);
  }
}
var UserDetailsComponent = class _UserDetailsComponent {
  snackBar;
  dialog;
  /**
   * The user to display details for
   */
  user;
  /**
   * Observable stream of roles assigned to the user
   */
  userRoles$;
  /**
   * Observable stream of available roles for assignment
   */
  availableRoles$;
  /**
   * Observable stream indicating if roles are loading
   */
  isLoadingRoles$;
  /**
   * Event emitted when a role is assigned to the user
   */
  roleAssigned = new EventEmitter();
  /**
   * Event emitted when a user's role is replaced
   */
  roleReplaced = new EventEmitter();
  /**
   * Event emitted when a role is deleted from a user
   */
  roleDeleted = new EventEmitter();
  /**
   * Event emitted when a user is updated
   */
  userUpdated = new EventEmitter();
  // Internal state for role replacement dropdown
  showRoleReplacementDropdown$ = new BehaviorSubject(false);
  selectedRoleIdForReplacement = null;
  selectedRoleIdForAssignment$ = new BehaviorSubject(null);
  // Select component configurations
  assignRoleSelectConfig = {
    placeholder: "Select a role to assign",
    data: [],
    value: "id",
    option: "name",
    name_select: "role",
    value_default: null,
    all: false
  };
  replaceRoleSelectConfig = {
    placeholder: "Select a new role",
    data: [],
    value: "id",
    option: "name",
    name_select: "role",
    value_default: null,
    all: false
  };
  constructor(snackBar, dialog) {
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  ngOnInit() {
    if (this.availableRoles$) {
      this.availableRoles$.subscribe((roles) => {
        this.assignRoleSelectConfig.data = roles;
        this.replaceRoleSelectConfig.data = roles;
      });
    }
  }
  /**
   * Opens the role replacement dropdown for a specific role
   * @param roleId - The ID of the role to replace
   */
  openRoleReplacementDropdown(roleId) {
    this.selectedRoleIdForReplacement = roleId;
    this.showRoleReplacementDropdown$.next(true);
  }
  /**
   * Handles role assignment selection
   * @param event - The select change event
   */
  onRoleAssignmentChange(event) {
    if (event.value) {
      this.selectedRoleIdForAssignment$.next(event.value);
    } else {
      this.selectedRoleIdForAssignment$.next(null);
    }
  }
  /**
   * Confirms and submits the role assignment
   */
  confirmRoleAssignment() {
    const selectedRoleId = this.selectedRoleIdForAssignment$.value;
    if (selectedRoleId) {
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: "Asignar Rol",
          message: `\xBFEst\xE1s seguro de que deseas asignar este rol a ${this.user.email}?`,
          confirmText: "Asignar",
          cancelText: "Cancelar"
        }
      }).afterClosed().subscribe((result) => {
        if (result) {
          this.roleAssigned.emit({
            userId: this.user.id,
            roleId: selectedRoleId
          });
          this.selectedRoleIdForAssignment$.next(null);
          this.assignRoleSelectConfig.value_default = null;
        }
      });
    }
  }
  /**
   * Handles role replacement selection
   * @param event - The select change event
   */
  onRoleReplacementChange(event) {
    if (event.value && this.selectedRoleIdForReplacement) {
      this.roleReplaced.emit({
        userId: this.user.id,
        oldRoleId: this.selectedRoleIdForReplacement,
        newRoleId: event.value
      });
      this.showRoleReplacementDropdown$.next(false);
      this.selectedRoleIdForReplacement = null;
      this.replaceRoleSelectConfig.value_default = null;
    }
  }
  /**
   * Deletes a role from the user
   * @param roleId - The ID of the role to delete
   */
  deleteRoleFromUser(roleId) {
    const roles = this.userRoles$;
    let roleName = "this role";
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Eliminar Rol",
        message: `\xBFEst\xE1s seguro de que deseas eliminar este rol de ${this.user.email}? Esta acci\xF3n no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        isDangerous: true
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.roleDeleted.emit({
          userId: this.user.id,
          roleId
        });
      }
    });
  }
  /**
   * Returns the CSS class for the status badge based on user status
   * @param status - The user status
   * @returns CSS class string for the status badge
   */
  getStatusBadgeClass(status) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
  /**
   * Normalizes status from object or string format to string
   * @param status - The status (can be string or object)
   * @returns Normalized status string
   */
  getNormalizedStatus(status) {
    if (typeof status === "string") {
      return status;
    }
    if (status && typeof status === "object" && status.code) {
      return status.code;
    }
    return "active";
  }
  /**
   * Opens the edit user dialog
   */
  openEditDialog() {
    this.dialog.open(UserEditDialogComponent, {
      data: { user: this.user }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.userUpdated.emit();
      }
    });
  }
  static \u0275fac = function UserDetailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserDetailsComponent)(\u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserDetailsComponent, selectors: [["app-user-details"]], inputs: { user: "user", userRoles$: "userRoles$", availableRoles$: "availableRoles$", isLoadingRoles$: "isLoadingRoles$" }, outputs: { roleAssigned: "roleAssigned", roleReplaced: "roleReplaced", roleDeleted: "roleDeleted", userUpdated: "userUpdated" }, decls: 69, vars: 32, consts: [[1, "flex", "flex-col", "h-full"], [1, "p-6", "border-b", "border-gray-200"], [1, "flex", "items-start", "justify-between", "gap-4"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-3"], [1, "text-xl", "font-semibold", "text-gray-900"], [1, "text-sm", "text-gray-600", "mt-1", "truncate", 3, "title"], [1, "inline-flex", "items-center", "px-3", "py-1", "rounded-full", "text-sm", "font-medium", "shrink-0"], ["text", "Editar", "size", "sm", "custom_class", "btn_primary", 3, "clicked"], [1, "flex-1", "overflow-y-auto", "p-6"], [1, "space-y-6"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], [1, "block", "text-sm", "font-medium", "text-gray-700"], [1, "mt-1", "text-sm", "text-gray-900"], [1, "mt-1", "text-sm", "text-gray-900", "truncate", 3, "title"], [1, "mt-1", "text-sm", "text-gray-900", "break-all"], [1, "border-t", "border-gray-200"], [1, "text-sm", "font-medium", "text-gray-900", "mb-4"], [1, "flex", "gap-2"], [1, "flex", "items-center", "justify-center", "p-8"], [1, "mt-4"], [1, "flex-1"], [3, "changeOption", "config"], ["text", "Agregar Rol", "variant", "primary", "size", "md", 3, "clicked", "fullWidth", "disabled"], [1, "flex", "flex-col", "items-center", "gap-3"], [1, "w-8", "h-8", "border-4", "border-gray-200", "border-t-blue-600", "rounded-full", "animate-spin"], [1, "text-sm", "text-gray-600"], [1, "p-4", "bg-gray-50", "rounded-lg", "border", "border-gray-200"], [1, "space-y-3"], [1, "flex", "flex-col", "md:flex-row", "md:items-start", "md:justify-between", "gap-3"], [1, "text-sm", "font-medium", "text-gray-900"], [1, "text-xs", "text-gray-600", "mt-1"], [1, "text-xs", "text-gray-500", "mt-2", "wrap-break-word"], [1, "flex", "gap-2", "shrink-0"], ["text", "Reemplazar", "variant", "secondary", "size", "sm", 3, "fullWidth"], ["text", "Eliminar", "variant", "danger", "size", "sm", 3, "clicked", "fullWidth"], ["text", "Reemplazar", "variant", "secondary", "size", "sm", 3, "clicked", "fullWidth"], [3, "config"]], template: function UserDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 3)(6, "h3", 5);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "span", 7);
      \u0275\u0275text(11);
      \u0275\u0275pipe(12, "titlecase");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "app-button", 8);
      \u0275\u0275listener("clicked", function UserDetailsComponent_Template_app_button_clicked_13_listener() {
        return ctx.openEditDialog();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "div")(18, "label", 12);
      \u0275\u0275text(19, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "p", 13);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div")(23, "label", 12);
      \u0275\u0275text(24, "Apellido");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "p", 13);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div")(28, "label", 12);
      \u0275\u0275text(29, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "p", 14);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div")(33, "label", 12);
      \u0275\u0275text(34, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "p", 13);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div")(38, "label", 12);
      \u0275\u0275text(39, "Creado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p", 13);
      \u0275\u0275text(41);
      \u0275\u0275pipe(42, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div")(44, "label", 12);
      \u0275\u0275text(45, "ID del Tenant");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p", 15);
      \u0275\u0275text(47);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div")(49, "label", 12);
      \u0275\u0275text(50, "\xDAltimo Acceso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "p", 13);
      \u0275\u0275text(52);
      \u0275\u0275pipe(53, "date");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(54, "div", 16);
      \u0275\u0275elementStart(55, "div")(56, "h4", 17);
      \u0275\u0275text(57, "Asignar Nuevo Rol");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(58, UserDetailsComponent_Conditional_58_Template, 5, 7, "div", 18);
      \u0275\u0275pipe(59, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275element(60, "div", 16);
      \u0275\u0275elementStart(61, "div")(62, "h4", 17);
      \u0275\u0275text(63, "Roles Actuales");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(64, UserDetailsComponent_Conditional_64_Template, 5, 0, "div", 19);
      \u0275\u0275pipe(65, "async");
      \u0275\u0275conditionalBranchCreate(66, UserDetailsComponent_Conditional_66_Template, 2, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(67, UserDetailsComponent_Conditional_67_Template, 5, 3, "div", 20);
      \u0275\u0275pipe(68, "async");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_13_0;
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate2(" ", ctx.user.first_name || ctx.user.name || "N/A", " ", ctx.user.last_name || "", " ");
      \u0275\u0275advance();
      \u0275\u0275property("title", ctx.user.email);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.user.email);
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.getStatusBadgeClass(ctx.getNormalizedStatus(ctx.user.status)));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 18, ctx.getNormalizedStatus(ctx.user.status)), " ");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.user.first_name || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.user.last_name || "N/A");
      \u0275\u0275advance(4);
      \u0275\u0275property("title", ctx.user.email);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.user.email);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.user.phone || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(42, 20, ctx.user.createdAt, "MMM d, y"), " ");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.user.tenant_id || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.user.last_login_at ? \u0275\u0275pipeBind2(53, 23, ctx.user.last_login_at, "MMM d, y") : "Nunca", " ");
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_13_0 = \u0275\u0275pipeBind1(59, 26, ctx.availableRoles$)) ? 58 : -1, tmp_13_0);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(65, 28, ctx.isLoadingRoles$) ? 64 : 66);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(68, 30, ctx.showRoleReplacementDropdown$) ? 67 : -1);
    }
  }, dependencies: [CommonModule, SelectComponent, ButtonComponent, AsyncPipe, TitleCasePipe, DatePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n.overflow-y-auto[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\n/*# sourceMappingURL=user-details.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserDetailsComponent, [{
    type: Component,
    args: [{ selector: "app-user-details", standalone: true, imports: [CommonModule, SelectComponent, ButtonComponent], template: `<div class="flex flex-col h-full">\r
  <!-- Header -->\r
  <div class="p-6 border-b border-gray-200">\r
    <div class="flex items-start justify-between gap-4">\r
      <div class="flex-1 min-w-0">\r
        <div class="flex items-center gap-3">\r
          <div class="flex-1 min-w-0">\r
            <h3 class="text-xl font-semibold text-gray-900">\r
              {{ user.first_name || user.name || 'N/A' }} {{ user.last_name || '' }}\r
            </h3>\r
            <p class="text-sm text-gray-600 mt-1 truncate" [title]="user.email">{{ user.email }}</p>\r
          </div>\r
          <span\r
            [class]="getStatusBadgeClass(getNormalizedStatus(user.status))"\r
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shrink-0"\r
          >\r
            {{ getNormalizedStatus(user.status) | titlecase }}\r
          </span>\r
        </div>\r
      </div>\r
      <app-button\r
        text="Editar"\r
        size="sm"\r
        custom_class="btn_primary"\r
        (clicked)="openEditDialog()">\r
      </app-button>\r
    </div>\r
  </div>\r
\r
  <!-- Content -->\r
  <div class="flex-1 overflow-y-auto p-6">\r
    <div class="space-y-6">\r
      <!-- User Info Grid -->\r
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">\r
        <!-- First Name -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700">Nombre</label>\r
          <p class="mt-1 text-sm text-gray-900">{{ user.first_name || 'N/A' }}</p>\r
        </div>\r
\r
        <!-- Last Name -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700">Apellido</label>\r
          <p class="mt-1 text-sm text-gray-900">{{ user.last_name || 'N/A' }}</p>\r
        </div>\r
\r
        <!-- Email -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700">Email</label>\r
          <p class="mt-1 text-sm text-gray-900 truncate" [title]="user.email">{{ user.email }}</p>\r
        </div>\r
\r
        <!-- Phone -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700">Tel\xE9fono</label>\r
          <p class="mt-1 text-sm text-gray-900">{{ user.phone || 'N/A' }}</p>\r
        </div>\r
\r
        <!-- Created At -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700">Creado</label>\r
          <p class="mt-1 text-sm text-gray-900">\r
            {{ user.createdAt | date: 'MMM d, y' }}\r
          </p>\r
        </div>\r
\r
        <!-- Tenant ID -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700">ID del Tenant</label>\r
          <p class="mt-1 text-sm text-gray-900 break-all">{{ user.tenant_id || 'N/A' }}</p>\r
        </div>\r
\r
        <!-- Last Login -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700">\xDAltimo Acceso</label>\r
          <p class="mt-1 text-sm text-gray-900">\r
            {{ user.last_login_at ? (user.last_login_at | date: 'MMM d, y') : 'Nunca' }}\r
          </p>\r
        </div>\r
      </div>\r
\r
      <!-- Divider -->\r
      <div class="border-t border-gray-200"></div>\r
\r
      <!-- Assign New Role Section -->\r
      <div>\r
        <h4 class="text-sm font-medium text-gray-900 mb-4">Asignar Nuevo Rol</h4>\r
        @if (availableRoles$ | async; as availableRoles) {\r
          <div class="flex gap-2">\r
            <div class="flex-1">\r
              <app-select\r
                [config]="assignRoleSelectConfig"\r
                (changeOption)="onRoleAssignmentChange($event)"\r
                [attr.data-testid]="'assign-role-select'"\r
              ></app-select>\r
            </div>\r
            <app-button\r
              text="Agregar Rol"\r
              variant="primary"\r
              size="md"\r
              [fullWidth]="false"\r
              [disabled]="!(selectedRoleIdForAssignment$ | async)"\r
              (clicked)="confirmRoleAssignment()"\r
              [attr.data-testid]="'confirm-assign-role-btn'"\r
            ></app-button>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- Divider -->\r
      <div class="border-t border-gray-200"></div>\r
\r
      <!-- Current Roles Section -->\r
      <div>\r
        <h4 class="text-sm font-medium text-gray-900 mb-4">Roles Actuales</h4>\r
        \r
        <!-- Loading State -->\r
        @if (isLoadingRoles$ | async) {\r
          <div class="flex items-center justify-center p-8">\r
            <div class="flex flex-col items-center gap-3">\r
              <div class="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>\r
              <p class="text-sm text-gray-600">Cargando roles...</p>\r
            </div>\r
          </div>\r
        } @else {\r
          <!-- No Roles Message -->\r
          @if (userRoles$ | async; as roles) {\r
            @if (roles.length === 0) {\r
              <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">\r
                <p class="text-sm text-gray-600">No hay roles asignados</p>\r
              </div>\r
            } @else {\r
              <!-- Roles List -->\r
              <div class="space-y-3">\r
                @for (role of roles; track role.id) {\r
                  <div\r
                    class="p-4 bg-gray-50 rounded-lg border border-gray-200"\r
                    [attr.data-testid]="'role-item-' + role.id"\r
                  >\r
                    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3">\r
                      <div class="flex-1 min-w-0">\r
                        <p class="text-sm font-medium text-gray-900">{{ role.name }}</p>\r
                        <p class="text-xs text-gray-600 mt-1">\r
                          {{ role.permissions.length }} permiso{{ role.permissions.length !== 1 ? 's' : '' }}\r
                        </p>\r
                        <p class="text-xs text-gray-500 mt-2 wrap-break-word">{{ role.description }}</p>\r
                      </div>\r
                      <!-- Action Buttons -->\r
                      <div class="flex gap-2 shrink-0">\r
                        <!-- Replace Role Button -->\r
                        @if (availableRoles$ | async; as availableRoles) {\r
                          <app-button\r
                            text="Reemplazar"\r
                            variant="secondary"\r
                            size="sm"\r
                            [fullWidth]="false"\r
                            (clicked)="openRoleReplacementDropdown(role.id)"\r
                            [attr.data-testid]="'replace-role-btn-' + role.id"\r
                          ></app-button>\r
                        }\r
                        <!-- Delete Role Button -->\r
                        <app-button\r
                          text="Eliminar"\r
                          variant="danger"\r
                          size="sm"\r
                          [fullWidth]="false"\r
                          (clicked)="deleteRoleFromUser(role.id)"\r
                          [attr.data-testid]="'delete-role-btn-' + role.id"\r
                        ></app-button>\r
                      </div>\r
                    </div>\r
                  </div>\r
                }\r
              </div>\r
            }\r
          }\r
        }\r
      </div>\r
\r
      <!-- Role Replacement Dropdown (Hidden) -->\r
      @if (showRoleReplacementDropdown$ | async) {\r
        <div class="mt-4">\r
          <h4 class="text-sm font-medium text-gray-900 mb-4">Selecciona Nuevo Rol</h4>\r
          @if (availableRoles$ | async; as availableRoles) {\r
            <app-select\r
              [config]="replaceRoleSelectConfig"\r
              (changeOption)="onRoleReplacementChange($event)"\r
              [attr.data-testid]="'replace-role-select'"\r
            ></app-select>\r
          }\r
        </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/rbac-tenant-ui/components/user-details/user-details.component.scss */\n:host {\n  display: block;\n  height: 100%;\n}\n.overflow-y-auto {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.overflow-y-auto::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\n/*# sourceMappingURL=user-details.component.css.map */\n"] }]
  }], () => [{ type: MatSnackBar }, { type: MatDialog }], { user: [{
    type: Input
  }], userRoles$: [{
    type: Input
  }], availableRoles$: [{
    type: Input
  }], isLoadingRoles$: [{
    type: Input
  }], roleAssigned: [{
    type: Output
  }], roleReplaced: [{
    type: Output
  }], roleDeleted: [{
    type: Output
  }], userUpdated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserDetailsComponent, { className: "UserDetailsComponent", filePath: "src/app/features/rbac-tenant-ui/components/user-details/user-details.component.ts", lineNumber: 30 });
})();

// src/app/features/rbac-tenant-ui/components/user-creation-dialog/user-creation-dialog.component.ts
function UserCreationDialogComponent_p_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1, "Este campo es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent_p_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1, "Este campo es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent_p_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1, "Este campo es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent__svg_svg_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 25);
    \u0275\u0275element(1, "path", 26)(2, "path", 27);
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent__svg_svg_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 25);
    \u0275\u0275element(1, "path", 28);
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent_p_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1, "Este campo es obligatorio");
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent__svg_svg_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 25);
    \u0275\u0275element(1, "path", 26)(2, "path", 27);
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent__svg_svg_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 25);
    \u0275\u0275element(1, "path", 28);
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent_p_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1, "Las contrase\xF1as no coinciden");
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Crear");
    \u0275\u0275elementEnd();
  }
}
function UserCreationDialogComponent_span_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Creando...");
    \u0275\u0275elementEnd();
  }
}
var UserCreationDialogComponent = class _UserCreationDialogComponent {
  fb;
  dialogRef;
  data;
  userService;
  snackBar;
  authService;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  created = signal(false, ...ngDevMode ? [{ debugName: "created" }] : []);
  showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
  showConfirmPassword = signal(false, ...ngDevMode ? [{ debugName: "showConfirmPassword" }] : []);
  form;
  constructor(fb, dialogRef, data, userService, snackBar, authService) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.userService = userService;
    this.snackBar = snackBar;
    this.authService = authService;
    this.form = this.fb.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      password: ["", [Validators.required]],
      confirm_password: ["", [Validators.required]]
    });
  }
  closeDialog() {
    if (!this.loading()) {
      this.dialogRef.close(this.created());
    }
  }
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const password = this.form.get("password")?.value;
    const confirmPassword = this.form.get("confirm_password")?.value;
    if (password !== confirmPassword) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: "Las contrase\xF1as no coinciden", type: "error" },
        duration: 3e3
      });
      return;
    }
    this.loading.set(true);
    const payload = {
      tenant_id: this.authService.user_info.tenant_id,
      first_name: this.form.get("first_name")?.value,
      last_name: this.form.get("last_name")?.value,
      email: this.form.get("email")?.value,
      phone: this.form.get("phone")?.value,
      password,
      status_id: 1
    };
    this.userService.createUser(payload).subscribe({
      next: () => {
        this.created.set(true);
        this.loading.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Usuario creado exitosamente", type: "success" },
          duration: 3e3
        });
        this.closeDialog();
      },
      error: (error) => {
        this.loading.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || "Error al crear el usuario", type: "error" },
          duration: 5e3
        });
      }
    });
  }
  static \u0275fac = function UserCreationDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserCreationDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserCreationDialogComponent, selectors: [["app-user-creation-dialog"]], decls: 53, vars: 17, consts: [[1, "bg-white", "rounded-lg", "w-full"], [1, "flex", "items-center", "justify-between", "px-6", "py-4", "border-b", "border-gray-200"], [1, "text-lg", "font-semibold", "text-gray-900"], [1, "text-gray-400", "hover:text-gray-600", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "px-6", "py-6"], [1, "space-y-5", 3, "formGroup"], [1, "grid", "grid-cols-2", "gap-4"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-2"], ["type", "text", "formControlName", "first_name", "placeholder", "Juan", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], ["class", "text-red-500 text-xs mt-1", 4, "ngIf"], ["type", "text", "formControlName", "last_name", "placeholder", "P\xE9rez", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], ["type", "email", "formControlName", "email", "placeholder", "juan@example.com", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], ["type", "tel", "formControlName", "phone", "placeholder", "+52 1234567890", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "relative"], ["formControlName", "password", "placeholder", "Ingresa una contrase\xF1a", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "pr-10", 3, "type"], ["type", "button", 1, "absolute", "right-3", "top-1/2", "transform", "-translate-y-1/2", "text-gray-400", "hover:text-gray-600", 3, "click"], ["class", "w-5 h-5", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["formControlName", "confirm_password", "placeholder", "Confirma tu contrase\xF1a", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "pr-10", 3, "type"], [1, "px-6", "py-4", "bg-gray-50", "border-t", "border-gray-200", "flex", "justify-end", "gap-3", "rounded-b-lg"], [1, "px-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "hover:bg-gray-50", "transition-colors", "font-medium", 3, "click"], [1, "px-4", "py-2", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", "disabled:bg-gray-400", "disabled:cursor-not-allowed", "transition-colors", "font-medium", 3, "click", "disabled"], [4, "ngIf"], [1, "text-red-500", "text-xs", "mt-1"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"]], template: function UserCreationDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Crear Usuario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function UserCreationDialogComponent_Template_button_click_4_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 4);
      \u0275\u0275element(6, "path", 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 6)(8, "form", 7)(9, "div", 8)(10, "div")(11, "label", 9);
      \u0275\u0275text(12, "Nombre *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(13, "input", 10);
      \u0275\u0275template(14, UserCreationDialogComponent_p_14_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div")(16, "label", 9);
      \u0275\u0275text(17, "Apellido *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "input", 12);
      \u0275\u0275template(19, UserCreationDialogComponent_p_19_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div")(21, "label", 9);
      \u0275\u0275text(22, "Correo Electr\xF3nico *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "input", 13);
      \u0275\u0275template(24, UserCreationDialogComponent_p_24_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div")(26, "label", 9);
      \u0275\u0275text(27, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "input", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div")(30, "label", 9);
      \u0275\u0275text(31, "Contrase\xF1a *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 15);
      \u0275\u0275element(33, "input", 16);
      \u0275\u0275elementStart(34, "button", 17);
      \u0275\u0275listener("click", function UserCreationDialogComponent_Template_button_click_34_listener() {
        return ctx.togglePasswordVisibility();
      });
      \u0275\u0275template(35, UserCreationDialogComponent__svg_svg_35_Template, 3, 0, "svg", 18)(36, UserCreationDialogComponent__svg_svg_36_Template, 2, 0, "svg", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(37, UserCreationDialogComponent_p_37_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div")(39, "label", 9);
      \u0275\u0275text(40, "Confirmar Contrase\xF1a *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 15);
      \u0275\u0275element(42, "input", 19);
      \u0275\u0275elementStart(43, "button", 17);
      \u0275\u0275listener("click", function UserCreationDialogComponent_Template_button_click_43_listener() {
        return ctx.toggleConfirmPasswordVisibility();
      });
      \u0275\u0275template(44, UserCreationDialogComponent__svg_svg_44_Template, 3, 0, "svg", 18)(45, UserCreationDialogComponent__svg_svg_45_Template, 2, 0, "svg", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(46, UserCreationDialogComponent_p_46_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "div", 20)(48, "button", 21);
      \u0275\u0275listener("click", function UserCreationDialogComponent_Template_button_click_48_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(49, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "button", 22);
      \u0275\u0275listener("click", function UserCreationDialogComponent_Template_button_click_50_listener() {
        return ctx.submit();
      });
      \u0275\u0275template(51, UserCreationDialogComponent_span_51_Template, 2, 0, "span", 23)(52, UserCreationDialogComponent_span_52_Template, 2, 0, "span", 23);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_12_0;
      let tmp_13_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ((tmp_1_0 = ctx.form.get("first_name")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.form.get("first_name")) == null ? null : tmp_1_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.form.get("last_name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("last_name")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(9);
      \u0275\u0275property("type", ctx.showPassword() ? "text" : "password");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.showPassword());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showPassword());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.form.get("password")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("password")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275classProp("border-red-500", ((tmp_8_0 = ctx.form.get("confirm_password")) == null ? null : tmp_8_0.touched) && ((tmp_8_0 = ctx.form.get("confirm_password")) == null ? null : tmp_8_0.value) !== ((tmp_8_0 = ctx.form.get("password")) == null ? null : tmp_8_0.value));
      \u0275\u0275property("type", ctx.showConfirmPassword() ? "text" : "password");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", !ctx.showConfirmPassword());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showConfirmPassword());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_12_0 = ctx.form.get("confirm_password")) == null ? null : tmp_12_0.touched) && ((tmp_12_0 = ctx.form.get("confirm_password")) == null ? null : tmp_12_0.value) !== ((tmp_12_0 = ctx.form.get("password")) == null ? null : tmp_12_0.value));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading() || ctx.form.invalid || ((tmp_13_0 = ctx.form.get("password")) == null ? null : tmp_13_0.value) !== ((tmp_13_0 = ctx.form.get("confirm_password")) == null ? null : tmp_13_0.value));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n[_nghost-%COMP%]     .custom-dialog-container .mat-mdc-dialog-container {\n  padding: 0 !important;\n  overflow: visible !important;\n}\n[_nghost-%COMP%]     .mat-mdc-dialog-container .mdc-dialog__surface {\n  overflow: visible !important;\n}\n/*# sourceMappingURL=user-creation-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserCreationDialogComponent, [{
    type: Component,
    args: [{ selector: "app-user-creation-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="bg-white rounded-lg w-full">\r
  <!-- Header -->\r
  <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">\r
    <h2 class="text-lg font-semibold text-gray-900">Crear Usuario</h2>\r
    <button \r
      (click)="closeDialog()"\r
      class="text-gray-400 hover:text-gray-600 transition-colors">\r
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <!-- Body -->\r
  <div class="px-6 py-6">\r
    <form [formGroup]="form" class="space-y-5">\r
      <!-- First Name and Last Name Row -->\r
      <div class="grid grid-cols-2 gap-4">\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>\r
          <input\r
            type="text"\r
            formControlName="first_name"\r
            placeholder="Juan"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">\r
          <p *ngIf="form.get('first_name')?.invalid && form.get('first_name')?.touched" class="text-red-500 text-xs mt-1">Este campo es obligatorio</p>\r
        </div>\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>\r
          <input\r
            type="text"\r
            formControlName="last_name"\r
            placeholder="P\xE9rez"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">\r
          <p *ngIf="form.get('last_name')?.invalid && form.get('last_name')?.touched" class="text-red-500 text-xs mt-1">Este campo es obligatorio</p>\r
        </div>\r
      </div>\r
\r
      <!-- Email -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-2">Correo Electr\xF3nico *</label>\r
        <input\r
          type="email"\r
          formControlName="email"\r
          placeholder="juan@example.com"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">\r
        <p *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="text-red-500 text-xs mt-1">Este campo es obligatorio</p>\r
      </div>\r
\r
      <!-- Phone -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-2">Tel\xE9fono</label>\r
        <input\r
          type="tel"\r
          formControlName="phone"\r
          placeholder="+52 1234567890"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">\r
      </div>\r
\r
      <!-- Password -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-2">Contrase\xF1a *</label>\r
        <div class="relative">\r
          <input\r
            [type]="showPassword() ? 'text' : 'password'"\r
            formControlName="password"\r
            placeholder="Ingresa una contrase\xF1a"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10">\r
          <button\r
            type="button"\r
            (click)="togglePasswordVisibility()"\r
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">\r
            <svg *ngIf="!showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>\r
            </svg>\r
            <svg *ngIf="showPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>\r
            </svg>\r
          </button>\r
        </div>\r
        <p *ngIf="form.get('password')?.invalid && form.get('password')?.touched" class="text-red-500 text-xs mt-1">Este campo es obligatorio</p>\r
      </div>\r
\r
      <!-- Confirm Password -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-2">Confirmar Contrase\xF1a *</label>\r
        <div class="relative">\r
          <input\r
            [type]="showConfirmPassword() ? 'text' : 'password'"\r
            formControlName="confirm_password"\r
            placeholder="Confirma tu contrase\xF1a"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"\r
            [class.border-red-500]="form.get('confirm_password')?.touched && form.get('confirm_password')?.value !== form.get('password')?.value">\r
          <button\r
            type="button"\r
            (click)="toggleConfirmPasswordVisibility()"\r
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">\r
            <svg *ngIf="!showConfirmPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>\r
            </svg>\r
            <svg *ngIf="showConfirmPassword()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>\r
            </svg>\r
          </button>\r
        </div>\r
        <p *ngIf="form.get('confirm_password')?.touched && form.get('confirm_password')?.value !== form.get('password')?.value" class="text-red-500 text-xs mt-1">Las contrase\xF1as no coinciden</p>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <!-- Footer -->\r
  <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-lg">\r
    <button\r
      (click)="closeDialog()"\r
      class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">\r
      Cancelar\r
    </button>\r
    <button\r
      (click)="submit()"\r
      [disabled]="loading() || form.invalid || (form.get('password')?.value !== form.get('confirm_password')?.value)"\r
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium">\r
      <span *ngIf="!loading()">Crear</span>\r
      <span *ngIf="loading()">Creando...</span>\r
    </button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/rbac-tenant-ui/components/user-creation-dialog/user-creation-dialog.component.scss */\n:host ::ng-deep .custom-dialog-container .mat-mdc-dialog-container {\n  padding: 0 !important;\n  overflow: visible !important;\n}\n:host ::ng-deep .mat-mdc-dialog-container .mdc-dialog__surface {\n  overflow: visible !important;\n}\n/*# sourceMappingURL=user-creation-dialog.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: UserService }, { type: MatSnackBar }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserCreationDialogComponent, { className: "UserCreationDialogComponent", filePath: "src/app/features/rbac-tenant-ui/components/user-creation-dialog/user-creation-dialog.component.ts", lineNumber: 22 });
})();

// src/app/features/rbac-tenant-ui/services/role.service.ts
var RoleService = class _RoleService {
  http;
  dataMapper;
  rolesCache$ = new BehaviorSubject(null);
  api = environment.api;
  constructor(http, dataMapper) {
    this.http = http;
    this.dataMapper = dataMapper;
  }
  /**
   * Fetches all roles for the current tenant
   * Implements in-memory caching to avoid redundant API calls
   * @returns Observable<Role[]> - Array of roles
   */
  getRoles() {
    if (this.rolesCache$.value) {
      return new Observable((observer) => {
        observer.next(this.rolesCache$.value);
        observer.complete();
      });
    }
    return this.http.get(`${this.api}/tenant/roles`).pipe(map((backendRoles) => this.dataMapper.mapRoles(backendRoles)), tap((roles) => this.rolesCache$.next(roles)), shareReplay(1));
  }
  /**
   * Fetches a specific role by ID
   * @param roleId - The ID of the role
   * @returns Observable<Role> - The role details
   */
  getRoleById(roleId) {
    return this.http.get(`${this.api}/tenant/roles/${roleId}`).pipe(map((backendRole) => this.dataMapper.mapRole(backendRole)), shareReplay(1));
  }
  /**
   * Creates a new role with the specified definition
   * @param roleDefinition - The role definition containing name, description, and permissions
   * @returns Observable<Role> - The created role
   */
  createRole(roleDefinition) {
    return this.http.post(`${this.api}/tenant/roles`, roleDefinition).pipe(map((backendRole) => this.dataMapper.mapRole(backendRole)), tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Updates an existing role with new definition
   * @param roleId - The ID of the role to update
   * @param roleDefinition - The updated role definition
   * @returns Observable<Role> - The updated role
   */
  updateRole(roleId, roleDefinition) {
    return this.http.put(`${this.api}/tenant/roles/${roleId}`, roleDefinition).pipe(map((backendRole) => this.dataMapper.mapRole(backendRole)), tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Updates role permissions specifically
   * @param roleId - The ID of the role to update
   * @param permissionIds - Array of permission IDs to assign to the role
   * @returns Observable<Role> - The updated role
   */
  updateRolePermissions(roleId, permissionIds) {
    return this.http.put(`${this.api}/tenant/roles/${roleId}`, {
      permission_ids: permissionIds
    }).pipe(map((backendRole) => this.dataMapper.mapRole(backendRole)), tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Deletes a role
   * @param roleId - The ID of the role to delete
   * @returns Observable<void>
   */
  deleteRole(roleId) {
    return this.http.delete(`${this.api}/tenant/roles/${roleId}`).pipe(tap(() => this.clearCache()), shareReplay(1));
  }
  /**
   * Fetches users assigned to a specific role
   * @param roleId - The ID of the role
   * @returns Observable with users assigned to the role
   */
  getRoleUsers(roleId) {
    return this.http.get(`${this.api}/tenant/roles/${roleId}/users`).pipe(shareReplay(1));
  }
  /**
   * Fetches available permissions for a specific role with assignment status
   * @param roleId - The ID of the role
   * @returns Observable with role and modules with permissions and their assignment status
   */
  getRolePermissionsAvailable(roleId) {
    return this.http.get(`${this.api}/tenant/roles/${roleId}/permissions/available`).pipe(shareReplay(1));
  }
  /**
   * Fetches available permissions organized by modules for the tenant
   * @returns Observable with modules and their available permissions
   */
  getAvailablePermissions() {
    return this.http.get(`${this.api}/tenant/roles/permissions/available`).pipe(shareReplay(1));
  }
  /**
   * Fetches role summary statistics
   * @returns Observable with role statistics and summary
   */
  getRoleSummary() {
    return this.http.get(`${this.api}/tenant/roles/summary/counts`).pipe(shareReplay(1));
  }
  /**
   * Clears the role cache
   * Useful for forcing a refresh of role data
   */
  clearCache() {
    this.rolesCache$.next(null);
  }
  static \u0275fac = function RoleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(DataMapperService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RoleService, factory: _RoleService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: DataMapperService }], null);
})();

// src/app/features/rbac-tenant-ui/pages/users-management/users-management.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function UsersManagementComponent_Conditional_15_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "p");
    \u0275\u0275text(2, "No se encontraron usuarios");
    \u0275\u0275elementEnd()();
  }
}
function UsersManagementComponent_Conditional_15_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "button", 17);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275listener("click", function UsersManagementComponent_Conditional_15_Conditional_1_For_1_Template_button_click_1_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onUserSelected(user_r2.id));
    });
    \u0275\u0275elementStart(3, "div", 18)(4, "div", 19)(5, "p", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 22)(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "titlecase");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-blue-50", \u0275\u0275pipeBind1(2, 8, ctx_r2.selectedUserId$) === user_r2.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" ", user_r2.first_name || "N/A", " ", user_r2.last_name || "N/A", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getStatusClass(user_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 10, ctx_r2.getNormalizedStatus(user_r2.status)), " ");
  }
}
function UsersManagementComponent_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, UsersManagementComponent_Conditional_15_Conditional_1_For_1_Template, 13, 12, "div", 16, _forTrack02);
  }
  if (rf & 2) {
    const users_r4 = \u0275\u0275nextContext();
    \u0275\u0275repeater(users_r4);
  }
}
function UsersManagementComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UsersManagementComponent_Conditional_15_Conditional_0_Template, 3, 0, "div", 15)(1, UsersManagementComponent_Conditional_15_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length === 0 ? 0 : 1);
  }
}
function UsersManagementComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "app-user-details", 23);
    \u0275\u0275listener("roleAssigned", function UsersManagementComponent_Conditional_18_Template_app_user_details_roleAssigned_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleAssigned($event));
    })("roleReplaced", function UsersManagementComponent_Conditional_18_Template_app_user_details_roleReplaced_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleReplaced($event));
    })("roleDeleted", function UsersManagementComponent_Conditional_18_Template_app_user_details_roleDeleted_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleDeleted($event));
    })("userUpdated", function UsersManagementComponent_Conditional_18_Template_app_user_details_userUpdated_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUserUpdated());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("user", ctx)("userRoles$", ctx_r2.selectedUserRoles$)("availableRoles$", ctx_r2.roles$)("isLoadingRoles$", ctx_r2.isLoadingRoles$);
  }
}
function UsersManagementComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 24)(2, "p", 25);
    \u0275\u0275text(3, "Selecciona un usuario para ver los detalles");
    \u0275\u0275elementEnd()()();
  }
}
var UsersManagementComponent = class _UsersManagementComponent {
  stateService;
  userService;
  roleService;
  snackBar;
  router;
  activatedRoute;
  dialog;
  permissionSyncService;
  // Observable streams from state service
  users$;
  filteredUsers$;
  selectedUserId$;
  selectedUser$;
  selectedUserRoles$;
  isLoadingRoles$;
  roles$;
  userSearchFilter$;
  userStatusFilter$;
  // Trigger for refreshing user roles
  refreshUserRoles$ = new BehaviorSubject(0);
  constructor(stateService, userService, roleService, snackBar, router, activatedRoute, dialog, permissionSyncService) {
    this.stateService = stateService;
    this.userService = userService;
    this.roleService = roleService;
    this.snackBar = snackBar;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.dialog = dialog;
    this.permissionSyncService = permissionSyncService;
    this.users$ = this.stateService.users$;
    this.filteredUsers$ = this.stateService.filteredUsers$;
    this.selectedUserId$ = this.stateService.selectedUserId$;
    this.roles$ = this.stateService.roles$;
    this.userSearchFilter$ = this.stateService.userSearchFilter$;
    this.userStatusFilter$ = this.stateService.userStatusFilter$;
    this.selectedUser$ = combineLatest([this.selectedUserId$, this.users$]).pipe(map(([selectedId, users]) => {
      if (!selectedId)
        return null;
      return users.find((u) => u.id === selectedId) || null;
    }));
    this.selectedUserRoles$ = combineLatest([this.selectedUserId$, this.refreshUserRoles$]).pipe(switchMap(([userId]) => {
      if (!userId)
        return of([]);
      return this.userService.getUserRoles(userId);
    }));
    this.isLoadingRoles$ = combineLatest([this.selectedUserId$, this.refreshUserRoles$]).pipe(switchMap(([userId]) => {
      if (!userId)
        return of(false);
      return this.userService.getUserRoles(userId).pipe(map(() => false), startWith(true));
    }));
  }
  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      console.log("Users loaded:", users);
      this.stateService.updateUsers(users);
    });
    this.roleService.getRoles().subscribe((roles) => {
      console.log("Roles loaded:", roles);
      this.stateService.updateRoles(roles);
    });
  }
  /**
   * Handles user selection from the left panel
   * Updates the state service with the selected user ID
   * @param userId - The ID of the selected user
   */
  onUserSelected(userId) {
    this.stateService.selectUser(userId);
  }
  /**
   * Navigates back to Settings
   */
  goBackToSettings() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }
  /**
   * Opens the create user dialog
   */
  openCreateUserDialog() {
    this.dialog.open(UserCreationDialogComponent, {
      width: "466px",
      disableClose: false,
      panelClass: "custom-dialog-container"
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.userService.getUsers().subscribe((users) => {
          this.stateService.updateUsers(users);
        });
      }
    });
  }
  /**
   * Handles role assignment to a user
   * @param event - The role assignment event containing userId and roleId
   */
  onRoleAssigned(event) {
    this.userService.assignRoleToUser(event.userId, event.roleId).subscribe({
      next: () => {
        this.refreshUserRoles$.next(this.refreshUserRoles$.value + 1);
        this.permissionSyncService.syncAfterRbacChange();
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Rol asignado correctamente", type: "success" },
          duration: 3e3
        });
      },
      error: (error) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || "No pudimos asignar el rol", type: "error" },
          duration: 5e3
        });
      }
    });
  }
  /**
   * Handles role replacement for a user
   * @param event - The role replacement event containing userId, oldRoleId, and newRoleId
   */
  onRoleReplaced(event) {
    this.userService.replaceUserRole(event.userId, event.oldRoleId, event.newRoleId).subscribe({
      next: () => {
        this.refreshUserRoles$.next(this.refreshUserRoles$.value + 1);
        this.permissionSyncService.syncAfterRbacChange();
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Rol reemplazado correctamente", type: "success" },
          duration: 3e3
        });
      },
      error: (error) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || "No pudimos reemplazar el rol", type: "error" },
          duration: 5e3
        });
      }
    });
  }
  /**
   * Handles role deletion from a user
   * @param event - The role deletion event containing userId and roleId
   */
  onRoleDeleted(event) {
    this.userService.deleteRoleFromUser(event.userId, event.roleId).subscribe({
      next: () => {
        this.refreshUserRoles$.next(this.refreshUserRoles$.value + 1);
        this.permissionSyncService.syncAfterRbacChange();
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Rol eliminado correctamente", type: "success" },
          duration: 3e3
        });
      },
      error: (error) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || "No pudimos eliminar el rol", type: "error" },
          duration: 5e3
        });
      }
    });
  }
  /**
   * Normalizes status from object or string format to string
   * @param status - The status (can be string or object)
   * @returns Normalized status string
   */
  getNormalizedStatus(status) {
    if (typeof status === "string") {
      return status;
    }
    if (status && typeof status === "object" && status.code) {
      return status.code;
    }
    return "active";
  }
  /**
   * Handles user update event
   * Refreshes the users list and maintains the selected user
   */
  onUserUpdated() {
    this.userService.clearCache();
    let currentSelectedId = null;
    this.selectedUserId$.subscribe((id) => currentSelectedId = id).unsubscribe();
    this.userService.getUsers().subscribe((users) => {
      this.stateService.updateUsers(users);
      if (currentSelectedId) {
        setTimeout(() => {
          this.stateService.selectUser(currentSelectedId);
        }, 50);
      }
    });
  }
  /**
   * Gets the CSS class for status badge
   * @param status - The status
   * @returns CSS class string
   */
  getStatusClass(status) {
    const normalizedStatus = this.getNormalizedStatus(status);
    switch (normalizedStatus) {
      case "active":
        return "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800";
      case "inactive":
        return "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800";
      case "pending":
        return "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800";
      default:
        return "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800";
    }
  }
  static \u0275fac = function UsersManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersManagementComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(PermissionSyncService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersManagementComponent, selectors: [["app-users-management"]], decls: 21, vars: 7, consts: [[1, "h-screen", "flex", "flex-col", "overflow-hidden"], [1, "flex", "items-center", "gap-3", "justify-between", "flex-shrink-0", "px-3", "py-3", "border-b", "border-gray-200"], [1, "flex", "items-center", "gap-3"], [3, "clicked"], [1, "text-2xl", "font-bold", "text-gray-900"], ["text", "+ Crear Usuario", "variant", "primary", "size", "sm", 3, "clicked", "fullWidth"], [1, "flex", "gap-2", "flex-1", "min-h-0", "px-2", "py-2"], [1, "w-1/3", "bg-white", "border", "border-gray-200", "rounded-lg", "flex", "flex-col", "h-full", "shadow-sm"], [1, "px-3", "py-2", "border-b", "border-gray-200", "flex-shrink-0"], [1, "text-base", "font-semibold", "text-gray-900"], [1, "px-3", "py-2", "border-b", "border-gray-200", "space-y-2", "flex-shrink-0"], [1, "flex-1", "overflow-y-auto", "min-h-0"], [1, "flex-1", "bg-gray-50", "border", "border-gray-200", "flex", "flex-col", "h-full"], [1, "flex", "flex-col", "bg-white", "h-full"], [1, "flex", "items-center", "justify-center", "bg-white", "h-full"], [1, "p-3", "text-center", "text-gray-500", "text-sm"], [1, "border-b", "border-gray-100", "last:border-b-0"], [1, "w-full", "text-left", "px-3", "py-2", "hover:bg-gray-50", "transition-colors", "focus:outline-none", "focus:ring-2", "focus:ring-inset", "focus:ring-blue-500", 3, "click"], [1, "flex", "items-center", "justify-between"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", "text-gray-900", "truncate"], [1, "text-xs", "text-gray-600", "mt-1", "truncate"], [1, "text-xs", "text-gray-500", "mt-1"], [3, "roleAssigned", "roleReplaced", "roleDeleted", "userUpdated", "user", "userRoles$", "availableRoles$", "isLoadingRoles$"], [1, "text-center"], [1, "text-gray-500", "text-lg"]], template: function UsersManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "app-back-button", 3);
      \u0275\u0275listener("clicked", function UsersManagementComponent_Template_app_back_button_clicked_3_listener() {
        return ctx.goBackToSettings();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h1", 4);
      \u0275\u0275text(5, "Gesti\xF3n de Usuarios");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "app-button", 5);
      \u0275\u0275listener("clicked", function UsersManagementComponent_Template_app_button_clicked_6_listener() {
        return ctx.openCreateUserDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "div", 8)(10, "h2", 9);
      \u0275\u0275text(11, "Usuarios");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 10);
      \u0275\u0275element(13, "app-user-search-filter");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 11);
      \u0275\u0275conditionalCreate(15, UsersManagementComponent_Conditional_15_Template, 2, 1);
      \u0275\u0275pipe(16, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 12);
      \u0275\u0275conditionalCreate(18, UsersManagementComponent_Conditional_18_Template, 2, 4, "div", 13);
      \u0275\u0275pipe(19, "async");
      \u0275\u0275conditionalBranchCreate(20, UsersManagementComponent_Conditional_20_Template, 4, 0, "div", 14);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      \u0275\u0275advance(6);
      \u0275\u0275property("fullWidth", false);
      \u0275\u0275advance(9);
      \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(16, 3, ctx.filteredUsers$)) ? 15 : -1, tmp_1_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_2_0 = \u0275\u0275pipeBind1(19, 5, ctx.selectedUser$)) ? 18 : 20, tmp_2_0);
    }
  }, dependencies: [CommonModule, UserSearchFilterComponent, UserDetailsComponent, BackButtonComponent, ButtonComponent, AsyncPipe, TitleCasePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  overflow: hidden;\n}\n.w-1-3[_ngcontent-%COMP%] {\n  flex: 0 0 33.333%;\n}\n.w-2-3[_ngcontent-%COMP%] {\n  flex: 0 0 66.667%;\n}\n.overflow-y-auto[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\nbutton[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n/*# sourceMappingURL=users-management.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersManagementComponent, [{
    type: Component,
    args: [{ selector: "app-users-management", standalone: true, imports: [CommonModule, UserSearchFilterComponent, UserDetailsComponent, BackButtonComponent, ButtonComponent], template: `<!-- Users Management Container with Two-Column Layout -->\r
<div class="h-screen flex flex-col overflow-hidden">\r
  <!-- Header with Back Button -->\r
  <div class="flex items-center gap-3 justify-between flex-shrink-0 px-3 py-3 border-b border-gray-200">\r
    <div class="flex items-center gap-3">\r
      <app-back-button (clicked)="goBackToSettings()"></app-back-button>\r
      <h1 class="text-2xl font-bold text-gray-900">Gesti\xF3n de Usuarios</h1>\r
    </div>\r
    <app-button\r
      text="+ Crear Usuario"\r
      variant="primary"\r
      size="sm"\r
      [fullWidth]="false"\r
      (clicked)="openCreateUserDialog()">\r
    </app-button>\r
  </div>\r
\r
  <!-- Main Content -->\r
  <div class="flex gap-2 flex-1 min-h-0 px-2 py-2">\r
    <!-- Left Panel: User List -->\r
    <div class="w-1/3 bg-white border border-gray-200 rounded-lg flex flex-col h-full shadow-sm">\r
      <!-- Header -->\r
      <div class="px-3 py-2 border-b border-gray-200 flex-shrink-0">\r
        <h2 class="text-base font-semibold text-gray-900">Usuarios</h2>\r
      </div>\r
\r
      <!-- Search and Filter Section -->\r
      <div class="px-3 py-2 border-b border-gray-200 space-y-2 flex-shrink-0">\r
        <!-- Search Input and Status Filter -->\r
        <app-user-search-filter></app-user-search-filter>\r
      </div>\r
\r
      <!-- User List -->\r
      <div class="flex-1 overflow-y-auto min-h-0">\r
        @if (filteredUsers$ | async; as users) {\r
          @if (users.length === 0) {\r
            <div class="p-3 text-center text-gray-500 text-sm">\r
              <p>No se encontraron usuarios</p>\r
            </div>\r
          } @else {\r
            @for (user of users; track user.id) {\r
              <div class="border-b border-gray-100 last:border-b-0">\r
                <button\r
                  (click)="onUserSelected(user.id)"\r
                  [class.bg-blue-50]="(selectedUserId$ | async) === user.id"\r
                  class="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"\r
                >\r
                  <div class="flex items-center justify-between">\r
                    <div class="flex-1 min-w-0">\r
                      <p class="text-sm font-medium text-gray-900 truncate">\r
                        {{ user.first_name || 'N/A' }} {{ user.last_name || 'N/A' }}\r
                      </p>\r
                      <p class="text-xs text-gray-600 mt-1 truncate">{{ user.email }}</p>\r
                      <p class="text-xs text-gray-500 mt-1">\r
                        <span [class]="getStatusClass(user.status)">\r
                          {{ getNormalizedStatus(user.status) | titlecase }}\r
                        </span>\r
                      </p>\r
                    </div>\r
                  </div>\r
                </button>\r
              </div>\r
            }\r
          }\r
        }\r
      </div>\r
    </div>\r
\r
    <!-- Right Panel: User Details -->\r
    <div class="flex-1 bg-gray-50 border border-gray-200 flex flex-col h-full">\r
      @if (selectedUser$ | async; as user) {\r
        <div class="flex flex-col bg-white h-full">\r
          <app-user-details\r
            [user]="user"\r
            [userRoles$]="selectedUserRoles$"\r
            [availableRoles$]="roles$"\r
            [isLoadingRoles$]="isLoadingRoles$"\r
            (roleAssigned)="onRoleAssigned($event)"\r
            (roleReplaced)="onRoleReplaced($event)"\r
            (roleDeleted)="onRoleDeleted($event)"\r
            (userUpdated)="onUserUpdated()"\r
          ></app-user-details>\r
        </div>\r
      } @else {\r
        <div class="flex items-center justify-center bg-white h-full">\r
          <div class="text-center">\r
            <p class="text-gray-500 text-lg">Selecciona un usuario para ver los detalles</p>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/rbac-tenant-ui/pages/users-management/users-management.component.scss */\n:host {\n  display: block;\n  height: 100%;\n  overflow: hidden;\n}\n.w-1-3 {\n  flex: 0 0 33.333%;\n}\n.w-2-3 {\n  flex: 0 0 66.667%;\n}\n.overflow-y-auto {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.overflow-y-auto::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\nbutton:hover {\n  background-color: #f9fafb;\n}\nbutton:focus {\n  outline: none;\n}\n/*# sourceMappingURL=users-management.component.css.map */\n"] }]
  }], () => [{ type: StateService }, { type: UserService }, { type: RoleService }, { type: MatSnackBar }, { type: Router }, { type: ActivatedRoute }, { type: MatDialog }, { type: PermissionSyncService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersManagementComponent, { className: "UsersManagementComponent", filePath: "src/app/features/rbac-tenant-ui/pages/users-management/users-management.component.ts", lineNumber: 33 });
})();

// src/app/features/rbac-tenant-ui/components/back-button/back-button.component.ts
var BackButtonComponent2 = class _BackButtonComponent {
  /**
   * Title/tooltip for the button
   */
  title = "Go back";
  /**
   * Event emitted when button is clicked
   */
  clicked = new EventEmitter();
  onClick() {
    this.clicked.emit();
  }
  static \u0275fac = function BackButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BackButtonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BackButtonComponent, selectors: [["app-back-button"]], inputs: { title: "title" }, outputs: { clicked: "clicked" }, decls: 3, vars: 1, consts: [[1, "inline-flex", "items-center", "justify-center", "w-8", "h-8", "rounded-full", "text-gray-600", "hover:text-gray-900", "bg-gray-100", "hover:bg-gray-200", "transition-all", "duration-200", "shadow-sm", 3, "click", "title"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"]], template: function BackButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "button", 0);
      \u0275\u0275domListener("click", function BackButtonComponent_Template_button_click_0_listener() {
        return ctx.onClick();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(1, "svg", 1);
      \u0275\u0275domElement(2, "path", 2);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275domProperty("title", ctx.title);
    }
  }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  display: inline-block;\n}\nbutton[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\nbutton[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n/*# sourceMappingURL=back-button.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BackButtonComponent2, [{
    type: Component,
    args: [{ selector: "app-back-button", standalone: true, imports: [CommonModule], template: `
    <button
      (click)="onClick()"
      [title]="title"
      class="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all duration-200 shadow-sm"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
  `, styles: ["/* angular:styles/component:scss;b1979e9694ff71011f7754c20fa10d4204bcf0a9634a4062066beed7cf769cd7;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/rbac-tenant-ui/components/back-button/back-button.component.ts */\n:host {\n  display: inline-block;\n}\nbutton {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\nbutton:active {\n  transform: scale(0.95);\n}\n/*# sourceMappingURL=back-button.component.css.map */\n"] }]
  }], null, { title: [{
    type: Input
  }], clicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BackButtonComponent2, { className: "BackButtonComponent", filePath: "src/app/features/rbac-tenant-ui/components/back-button/back-button.component.ts", lineNumber: 39 });
})();

// src/app/features/rbac-tenant-ui/components/role-permissions-manager/role-permissions-manager.component.ts
var _forTrack03 = ($index, $item) => $item.module_id;
function RolePermissionsManagerComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 2);
    \u0275\u0275elementStart(2, "span", 3);
    \u0275\u0275text(3, "Cargando permisos...");
    \u0275\u0275elementEnd()();
  }
}
function RolePermissionsManagerComponent_Conditional_2_For_8_Conditional_14_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 23)(1, "input", 24);
    \u0275\u0275listener("change", function RolePermissionsManagerComponent_Conditional_2_For_8_Conditional_14_For_3_Template_input_change_1_listener() {
      const permission_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.togglePermission(permission_r6));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 25)(3, "p", 26);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 27);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const permission_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("checked", permission_r6.isAssigned);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(permission_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(permission_r6.description);
  }
}
function RolePermissionsManagerComponent_Conditional_2_For_8_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 22);
    \u0275\u0275repeaterCreate(2, RolePermissionsManagerComponent_Conditional_2_For_8_Conditional_14_For_3_Template, 7, 3, "label", 23, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const module_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275repeater(module_r4.permissions);
  }
}
function RolePermissionsManagerComponent_Conditional_2_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 11)(2, "div", 12)(3, "button", 13);
    \u0275\u0275listener("click", function RolePermissionsManagerComponent_Conditional_2_For_8_Template_button_click_3_listener() {
      const module_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleModule(module_r4));
    });
    \u0275\u0275elementStart(4, "h3", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 15)(7, "span", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 17);
    \u0275\u0275listener("click", function RolePermissionsManagerComponent_Conditional_2_For_8_Template_button_click_9_listener() {
      const module_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleAllModulePermissions(module_r4));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 18);
    \u0275\u0275listener("click", function RolePermissionsManagerComponent_Conditional_2_For_8_Template_button_click_11_listener() {
      const module_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleModule(module_r4));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 19);
    \u0275\u0275element(13, "path", 20);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275conditionalCreate(14, RolePermissionsManagerComponent_Conditional_2_For_8_Conditional_14_Template, 4, 0, "div", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const module_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(module_r4.module_name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.getModuleAssignedCount(module_r4), "/", module_r4.permissions.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isModuleFullyAssigned(module_r4) ? "Desmarcar" : "Marcar", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-90", module_r4.isExpanded);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(module_r4.isExpanded ? 14 : -1);
  }
}
function RolePermissionsManagerComponent_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "p", 28);
    \u0275\u0275text(2, "No hay m\xF3dulos disponibles para este tenant.");
    \u0275\u0275elementEnd()();
  }
}
function RolePermissionsManagerComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " permisos asignados ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "app-button", 7);
    \u0275\u0275listener("clicked", function RolePermissionsManagerComponent_Conditional_2_Template_app_button_clicked_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.savePermissions());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 8);
    \u0275\u0275repeaterCreate(7, RolePermissionsManagerComponent_Conditional_2_For_8_Template, 15, 7, "div", 9, _forTrack03);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, RolePermissionsManagerComponent_Conditional_2_Conditional_9_Template, 3, 0, "div", 10);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getTotalAssignedPermissions());
    \u0275\u0275advance(2);
    \u0275\u0275property("loading", ctx_r1.saving)("disabled", ctx_r1.saving || !ctx_r1.hasChanges);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.modulePermissions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.modulePermissions.length === 0 ? 9 : -1);
  }
}
var RolePermissionsManagerComponent = class _RolePermissionsManagerComponent {
  roleService;
  snackBar;
  cdr;
  permissionSyncService;
  role = null;
  permissionsUpdated = new EventEmitter();
  modulePermissions = [];
  loading = false;
  saving = false;
  hasChanges = false;
  originalPermissions = /* @__PURE__ */ new Set();
  constructor(roleService, snackBar, cdr, permissionSyncService) {
    this.roleService = roleService;
    this.snackBar = snackBar;
    this.cdr = cdr;
    this.permissionSyncService = permissionSyncService;
  }
  ngOnInit() {
    if (this.role) {
      this.loadPermissions();
    }
  }
  ngOnChanges() {
    if (this.role) {
      this.loadPermissions();
    }
  }
  loadPermissions() {
    if (!this.role)
      return;
    this.loading = true;
    this.hasChanges = false;
    this.cdr.markForCheck();
    this.roleService.getRolePermissionsAvailable(this.role.id).subscribe({
      next: (response) => {
        console.log("Permissions loaded successfully:", response);
        this.processPermissions(response);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error("Error loading permissions:", error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || "Error al cargar permisos",
            type: "error"
          },
          duration: 5e3
        });
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
  processPermissions(response) {
    console.log("Processing permissions response:", response);
    if (!response || !response.modules || !Array.isArray(response.modules)) {
      console.error("Invalid response structure:", response);
      this.modulePermissions = [];
      return;
    }
    const assignedPermissions = response.modules.flatMap((module) => module.permissions || []).filter((permission) => permission.assigned).map((permission) => permission.id);
    this.originalPermissions = new Set(assignedPermissions);
    this.modulePermissions = response.modules.map((module) => ({
      module_id: module.id,
      module_name: module.name,
      permissions: (module.permissions || []).map((permission) => ({
        id: permission.id,
        name: permission.action,
        description: permission.description,
        isAssigned: permission.assigned || false
      })),
      isExpanded: false
      // Start all modules collapsed
    }));
    console.log("Processed modules:", this.modulePermissions);
  }
  toggleModule(module) {
    module.isExpanded = !module.isExpanded;
  }
  togglePermission(permission) {
    permission.isAssigned = !permission.isAssigned;
    this.checkForChanges();
  }
  toggleAllModulePermissions(module) {
    const isFullyAssigned = this.isModuleFullyAssigned(module);
    module.permissions.forEach((permission) => {
      permission.isAssigned = !isFullyAssigned;
    });
    this.checkForChanges();
  }
  isModuleFullyAssigned(module) {
    return module.permissions.every((p) => p.isAssigned);
  }
  getModuleAssignedCount(module) {
    return module.permissions.filter((p) => p.isAssigned).length;
  }
  getTotalAssignedPermissions() {
    return this.modulePermissions.reduce((total, module) => total + this.getModuleAssignedCount(module), 0);
  }
  checkForChanges() {
    const currentPermissions = new Set(this.modulePermissions.flatMap((module) => module.permissions).filter((p) => p.isAssigned).map((p) => p.id));
    this.hasChanges = !this.setsEqual(this.originalPermissions, currentPermissions);
  }
  setsEqual(set1, set2) {
    if (set1.size !== set2.size)
      return false;
    for (const item of set1) {
      if (!set2.has(item))
        return false;
    }
    return true;
  }
  savePermissions() {
    if (!this.role || this.saving || !this.hasChanges)
      return;
    this.saving = true;
    const assignedPermissionIds = this.modulePermissions.flatMap((module) => module.permissions).filter((p) => p.isAssigned).map((p) => p.id);
    this.roleService.updateRolePermissions(this.role.id, assignedPermissionIds).subscribe({
      next: (updatedRole) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: "Permisos actualizados correctamente",
            type: "success"
          },
          duration: 3e3
        });
        this.originalPermissions = new Set(assignedPermissionIds);
        this.hasChanges = false;
        this.saving = false;
        this.permissionSyncService.syncAfterRbacChange();
        this.permissionsUpdated.emit(updatedRole);
      },
      error: (error) => {
        console.error("Error saving permissions:", error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || "Error al guardar permisos",
            type: "error"
          },
          duration: 5e3
        });
        this.saving = false;
      }
    });
  }
  static \u0275fac = function RolePermissionsManagerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RolePermissionsManagerComponent)(\u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(PermissionSyncService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RolePermissionsManagerComponent, selectors: [["app-role-permissions-manager"]], inputs: { role: "role" }, outputs: { permissionsUpdated: "permissionsUpdated" }, features: [\u0275\u0275NgOnChangesFeature], decls: 3, vars: 1, consts: [[1, "role-permissions-manager"], [1, "flex", "items-center", "justify-center", "py-8"], [1, "animate-spin", "rounded-full", "h-8", "w-8", "border-b-2", "border-blue-600"], [1, "ml-3", "text-gray-600"], [1, "mb-6", "flex", "justify-between", "items-center"], [1, "text-sm", "text-gray-600"], [1, "font-medium"], ["text", "Guardar Cambios", "custom_class", "btn_primary", 3, "clicked", "loading", "disabled"], [1, "space-y-3"], [1, "border", "border-gray-200", "rounded-lg", "overflow-hidden", "bg-white", "hover:shadow-sm", "transition-shadow"], [1, "text-center", "py-8"], [1, "bg-white", "px-4", "py-3", "border-b", "border-gray-100"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center", "flex-1", "text-left", "hover:opacity-80", "transition-opacity", 3, "click"], [1, "text-base", "font-semibold", "text-gray-900"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "text-gray-500"], [1, "text-xs", "text-blue-600", "hover:text-blue-800", "font-medium", "px-2", "py-1", "rounded", "hover:bg-blue-50", 3, "click"], [1, "text-gray-400", "hover:text-gray-600", "transition-all", "duration-200", "p-1", 3, "click"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-4", "h-4"], ["fill-rule", "evenodd", "d", "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule", "evenodd"], [1, "p-3", "bg-gray-50"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-2"], [1, "flex", "items-start", "space-x-2", "p-2", "rounded", "border", "border-gray-200", "bg-white", "hover:bg-blue-50", "cursor-pointer", "transition-colors"], ["type", "checkbox", 1, "mt-0.5", "h-4", "w-4", "text-blue-600", "focus:ring-blue-500", "border-gray-300", "rounded", 3, "change", "checked"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-medium", "text-gray-900"], [1, "text-xs", "text-gray-500", "mt-0.5"], [1, "text-gray-500"]], template: function RolePermissionsManagerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, RolePermissionsManagerComponent_Conditional_1_Template, 4, 0, "div", 1)(2, RolePermissionsManagerComponent_Conditional_2_Template, 10, 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 1 : 2);
    }
  }, dependencies: [CommonModule, FormsModule, ButtonComponent], styles: ["\n\n.role-permissions-manager[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow-y: auto;\n  min-height: 0;\n}\n.role-permissions-manager[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.role-permissions-manager[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.role-permissions-manager[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.role-permissions-manager[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\n.rotate-90[_ngcontent-%COMP%] {\n  transform: rotate(90deg);\n}\n/*# sourceMappingURL=role-permissions-manager.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolePermissionsManagerComponent, [{
    type: Component,
    args: [{ selector: "app-role-permissions-manager", standalone: true, imports: [CommonModule, FormsModule, ButtonComponent], template: `
    <div class="role-permissions-manager">
      @if (loading) {
        <div class="flex items-center justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">Cargando permisos...</span>
        </div>
      } @else {
        <!-- Save Button -->
        <div class="mb-6 flex justify-between items-center">
          <div class="text-sm text-gray-600">
            <span class="font-medium">{{ getTotalAssignedPermissions() }}</span> permisos asignados
          </div>
          <app-button
            text="Guardar Cambios"
            custom_class="btn_primary"
            [loading]="saving"
            [disabled]="saving || !hasChanges"
            (clicked)="savePermissions()">
          </app-button>
        </div>

        <!-- Modules and Permissions -->
        <div class="space-y-3">
          @for (module of modulePermissions; track module.module_id) {
            <div class="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-sm transition-shadow">
              <!-- Module Header -->
              <div class="bg-white px-4 py-3 border-b border-gray-100">
                <div class="flex items-center justify-between">
                  <button
                    (click)="toggleModule(module)"
                    class="flex items-center flex-1 text-left hover:opacity-80 transition-opacity">
                    <h3 class="text-base font-semibold text-gray-900">{{ module.module_name }}</h3>
                  </button>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">
                      {{ getModuleAssignedCount(module) }}/{{ module.permissions.length }}
                    </span>
                    <button
                      (click)="toggleAllModulePermissions(module)"
                      class="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50">
                      {{ isModuleFullyAssigned(module) ? 'Desmarcar' : 'Marcar' }}
                    </button>
                    <button
                      (click)="toggleModule(module)"
                      class="text-gray-400 hover:text-gray-600 transition-all duration-200 p-1"
                      [class.rotate-90]="module.isExpanded">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Permissions List (Collapsible) -->
              @if (module.isExpanded) {
                <div class="p-3 bg-gray-50">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    @for (permission of module.permissions; track $index) {
                      <label class="flex items-start space-x-2 p-2 rounded border border-gray-200 bg-white hover:bg-blue-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          [checked]="permission.isAssigned"
                          (change)="togglePermission(permission)"
                          class="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <div class="flex-1 min-w-0">
                          <p class="text-xs font-medium text-gray-900">{{ permission.name }}</p>
                          <p class="text-xs text-gray-500 mt-0.5">{{ permission.description }}</p>
                        </div>
                      </label>
                    }
                  </div>
                </div>
              }
            </div>
          }
        </div>

        @if (modulePermissions.length === 0) {
          <div class="text-center py-8">
            <p class="text-gray-500">No hay m\xF3dulos disponibles para este tenant.</p>
          </div>
        }
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;b55041aed0a95672bec278bce9ccad6206bafddae5162aa58c7730165c8e61ba;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/rbac-tenant-ui/components/role-permissions-manager/role-permissions-manager.component.ts */\n.role-permissions-manager {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow-y: auto;\n  min-height: 0;\n}\n.role-permissions-manager::-webkit-scrollbar {\n  width: 8px;\n}\n.role-permissions-manager::-webkit-scrollbar-track {\n  background: transparent;\n}\n.role-permissions-manager::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.role-permissions-manager::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\n.rotate-90 {\n  transform: rotate(90deg);\n}\n/*# sourceMappingURL=role-permissions-manager.component.css.map */\n"] }]
  }], () => [{ type: RoleService }, { type: MatSnackBar }, { type: ChangeDetectorRef }, { type: PermissionSyncService }], { role: [{
    type: Input
  }], permissionsUpdated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RolePermissionsManagerComponent, { className: "RolePermissionsManagerComponent", filePath: "src/app/features/rbac-tenant-ui/components/role-permissions-manager/role-permissions-manager.component.ts", lineNumber: 147 });
})();

// src/app/features/rbac-tenant-ui/components/role-edit-form/role-edit-form.component.ts
function RoleEditFormComponent_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "El nombre es requerido");
    \u0275\u0275elementEnd();
  }
}
function RoleEditFormComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 4);
    \u0275\u0275listener("ngSubmit", function RoleEditFormComponent_Conditional_1_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveRole());
    });
    \u0275\u0275elementStart(1, "div")(2, "label", 5);
    \u0275\u0275text(3, " Nombre del Rol * ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 6);
    \u0275\u0275conditionalCreate(5, RoleEditFormComponent_Conditional_1_Conditional_5_Template, 2, 0, "p", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "label", 5);
    \u0275\u0275text(8, " Descripci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "textarea", 8);
    \u0275\u0275text(10, "            ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 9)(12, "app-button", 10);
    \u0275\u0275listener("clicked", function RoleEditFormComponent_Conditional_1_Template_app_button_clicked_12_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveRole());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "app-button", 11);
    \u0275\u0275listener("clicked", function RoleEditFormComponent_Conditional_1_Template_app_button_clicked_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelEdit());
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.roleForm);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.roleForm.get("name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.roleForm.get("name")) == null ? null : tmp_2_0.touched) ? 5 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("loading", ctx_r1.saving)("disabled", ctx_r1.roleForm.invalid || ctx_r1.saving);
  }
}
function RoleEditFormComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 12)(2, "h3", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 15)(7, "button", 16);
    \u0275\u0275listener("click", function RoleEditFormComponent_Conditional_2_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startEdit());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 17);
    \u0275\u0275element(9, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "button", 19);
    \u0275\u0275listener("click", function RoleEditFormComponent_Conditional_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 17);
    \u0275\u0275element(12, "path", 20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.role == null ? null : ctx_r1.role.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r1.role == null ? null : ctx_r1.role.description) || "Sin descripci\xF3n");
  }
}
function RoleEditFormComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 21)(2, "div", 22)(3, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 24);
    \u0275\u0275element(5, "path", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 26)(7, "h3", 27);
    \u0275\u0275text(8, "Eliminar Rol");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 28)(10, "p", 29);
    \u0275\u0275text(11, " \xBFEst\xE1s seguro de que deseas eliminar el rol ");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, "? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 30);
    \u0275\u0275text(16, " Esta acci\xF3n no se puede deshacer y todos los usuarios asignados a este rol perder\xE1n sus permisos. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 31)(18, "app-button", 32);
    \u0275\u0275listener("clicked", function RoleEditFormComponent_Conditional_3_Template_app_button_clicked_18_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelDelete());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "app-button", 33);
    \u0275\u0275listener("clicked", function RoleEditFormComponent_Conditional_3_Template_app_button_clicked_19_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteRole());
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1('"', ctx_r1.role == null ? null : ctx_r1.role.name, '"');
    \u0275\u0275advance(6);
    \u0275\u0275property("loading", ctx_r1.deleting)("disabled", ctx_r1.deleting);
  }
}
var RoleEditFormComponent = class _RoleEditFormComponent {
  fb;
  roleService;
  snackBar;
  role = null;
  roleUpdated = new EventEmitter();
  roleDeleted = new EventEmitter();
  roleForm;
  isEditing = false;
  saving = false;
  showDeleteConfirm = false;
  deleting = false;
  constructor(fb, roleService, snackBar) {
    this.fb = fb;
    this.roleService = roleService;
    this.snackBar = snackBar;
    this.roleForm = this.createForm();
  }
  ngOnInit() {
    this.initializeForm();
  }
  ngOnChanges() {
    this.initializeForm();
    this.isEditing = false;
  }
  createForm() {
    return this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ["", [Validators.maxLength(200)]]
    });
  }
  initializeForm() {
    if (this.role) {
      this.roleForm.patchValue({
        name: this.role.name || "",
        description: this.role.description || ""
      });
    }
  }
  startEdit() {
    this.isEditing = true;
    this.initializeForm();
  }
  cancelEdit() {
    this.isEditing = false;
    this.initializeForm();
  }
  saveRole() {
    if (!this.role || this.roleForm.invalid || this.saving)
      return;
    this.saving = true;
    const formValue = this.roleForm.value;
    const roleDefinition = {
      name: formValue.name.trim(),
      description: formValue.description?.trim() || "",
      permission_ids: this.role.permissions || []
    };
    this.roleService.updateRole(this.role.id, roleDefinition).subscribe({
      next: (updatedRole) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: "Rol actualizado correctamente",
            type: "success"
          },
          duration: 3e3
        });
        this.isEditing = false;
        this.saving = false;
        this.roleUpdated.emit(updatedRole);
      },
      error: (error) => {
        console.error("Error updating role:", error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || "Error al actualizar el rol",
            type: "error"
          },
          duration: 5e3
        });
        this.saving = false;
      }
    });
  }
  confirmDelete() {
    this.showDeleteConfirm = true;
  }
  cancelDelete() {
    this.showDeleteConfirm = false;
  }
  deleteRole() {
    if (!this.role || this.deleting)
      return;
    this.deleting = true;
    this.roleService.deleteRole(this.role.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: "Rol eliminado correctamente",
            type: "success"
          },
          duration: 3e3
        });
        this.showDeleteConfirm = false;
        this.deleting = false;
        this.roleDeleted.emit(this.role.id);
      },
      error: (error) => {
        console.error("Error deleting role:", error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || "Error al eliminar el rol",
            type: "error"
          },
          duration: 5e3
        });
        this.deleting = false;
      }
    });
  }
  static \u0275fac = function RoleEditFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleEditFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleEditFormComponent, selectors: [["app-role-edit-form"]], inputs: { role: "role" }, outputs: { roleUpdated: "roleUpdated", roleDeleted: "roleDeleted" }, features: [\u0275\u0275NgOnChangesFeature], decls: 4, vars: 2, consts: [[1, "role-edit-form"], [1, "space-y-4", 3, "formGroup"], [1, "flex", "items-start", "justify-between"], [1, "fixed", "inset-0", "bg-black/30", "flex", "items-center", "justify-center", "z-50"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Gerente de Ventas", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "placeholder-gray-400", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500"], [1, "mt-1", "text-sm", "text-red-600"], ["formControlName", "description", "rows", "3", "placeholder", "Descripci\xF3n del rol (opcional)", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "placeholder-gray-400", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500"], [1, "flex", "gap-3"], ["text", "Guardar", "custom_class", "btn_primary", "type", "submit", 3, "clicked", "loading", "disabled"], ["text", "Cancelar", "custom_class", "btn_secondary", "type", "button", 3, "clicked"], [1, "flex-1"], [1, "text-xl", "font-semibold", "text-gray-900"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "flex", "items-center", "gap-2", "ml-4"], ["title", "Editar rol", 1, "p-2", "text-gray-400", "hover:text-blue-600", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["title", "Eliminar rol", 1, "p-2", "text-gray-400", "hover:text-red-600", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "bg-white", "rounded-lg", "p-6", "max-w-md", "w-full", "mx-4", "shadow-lg"], [1, "flex", "items-center", "mb-4"], [1, "shrink-0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-red-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"], [1, "ml-3"], [1, "text-lg", "font-medium", "text-gray-900"], [1, "mb-4"], [1, "text-sm", "text-gray-600"], [1, "text-sm", "text-gray-600", "mt-2"], [1, "flex", "gap-3", "justify-end"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Eliminar", "custom_class", "btn_danger", 3, "clicked", "loading", "disabled"]], template: function RoleEditFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, RoleEditFormComponent_Conditional_1_Template, 14, 4, "form", 1)(2, RoleEditFormComponent_Conditional_2_Template, 13, 2, "div", 2);
      \u0275\u0275conditionalCreate(3, RoleEditFormComponent_Conditional_3_Template, 20, 3, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isEditing ? 1 : 2);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showDeleteConfirm ? 3 : -1);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ButtonComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleEditFormComponent, [{
    type: Component,
    args: [{ selector: "app-role-edit-form", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent], template: `
    <div class="role-edit-form">
      @if (isEditing) {
        <!-- Edit Mode -->
        <form [formGroup]="roleForm" (ngSubmit)="saveRole()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Rol *
            </label>
            <input
              type="text"
              formControlName="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Gerente de Ventas">
            @if (roleForm.get('name')?.invalid && roleForm.get('name')?.touched) {
              <p class="mt-1 text-sm text-red-600">El nombre es requerido</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descripci\xF3n
            </label>
            <textarea
              formControlName="description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripci\xF3n del rol (opcional)">
            </textarea>
          </div>

          <div class="flex gap-3">
            <app-button
              text="Guardar"
              custom_class="btn_primary"
              type="submit"
              [loading]="saving"
              [disabled]="roleForm.invalid || saving"
              (clicked)="saveRole()">
            </app-button>
            
            <app-button
              text="Cancelar"
              custom_class="btn_secondary"
              type="button"
              (clicked)="cancelEdit()">
            </app-button>
          </div>
        </form>
      } @else {
        <!-- View Mode -->
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900">{{ role?.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ role?.description || 'Sin descripci\xF3n' }}</p>
          </div>
          
          <div class="flex items-center gap-2 ml-4">
            <button
              (click)="startEdit()"
              class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Editar rol">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            
            <button
              (click)="confirmDelete()"
              class="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Eliminar rol">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      @if (showDeleteConfirm) {
        <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <div class="flex items-center mb-4">
              <div class="shrink-0">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-gray-900">Eliminar Rol</h3>
              </div>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-600">
                \xBFEst\xE1s seguro de que deseas eliminar el rol <strong>"{{ role?.name }}"</strong>?
              </p>
              <p class="text-sm text-gray-600 mt-2">
                Esta acci\xF3n no se puede deshacer y todos los usuarios asignados a este rol perder\xE1n sus permisos.
              </p>
            </div>
            
            <div class="flex gap-3 justify-end">
              <app-button
                text="Cancelar"
                custom_class="btn_secondary"
                (clicked)="cancelDelete()">
              </app-button>
              
              <app-button
                text="Eliminar"
                custom_class="btn_danger"
                [loading]="deleting"
                [disabled]="deleting"
                (clicked)="deleteRole()">
              </app-button>
            </div>
          </div>
        </div>
      }
    </div>
  ` }]
  }], () => [{ type: FormBuilder }, { type: RoleService }, { type: MatSnackBar }], { role: [{
    type: Input
  }], roleUpdated: [{
    type: Output
  }], roleDeleted: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleEditFormComponent, { className: "RoleEditFormComponent", filePath: "src/app/features/rbac-tenant-ui/components/role-edit-form/role-edit-form.component.ts", lineNumber: 139 });
})();

// src/app/features/rbac-tenant-ui/components/role-create-dialog/role-create-dialog.component.ts
function RoleCreateDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "El nombre es requerido");
    \u0275\u0275elementEnd();
  }
}
var RoleCreateDialogComponent = class _RoleCreateDialogComponent {
  fb;
  roleService;
  snackBar;
  roleCreated = new EventEmitter();
  cancelled = new EventEmitter();
  roleForm;
  saving = false;
  constructor(fb, roleService, snackBar) {
    this.fb = fb;
    this.roleService = roleService;
    this.snackBar = snackBar;
    this.roleForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ["", [Validators.maxLength(200)]]
    });
  }
  createRole() {
    if (this.roleForm.invalid || this.saving)
      return;
    this.saving = true;
    const formValue = this.roleForm.value;
    const roleDefinition = {
      name: formValue.name.trim(),
      description: formValue.description?.trim() || "",
      permission_ids: []
    };
    this.roleService.createRole(roleDefinition).subscribe({
      next: (newRole) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: "Rol creado correctamente",
            type: "success"
          },
          duration: 3e3
        });
        this.saving = false;
        this.roleCreated.emit(newRole);
      },
      error: (error) => {
        console.error("Error creating role:", error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || "Error al crear el rol",
            type: "error"
          },
          duration: 5e3
        });
        this.saving = false;
      }
    });
  }
  cancel() {
    this.cancelled.emit();
  }
  static \u0275fac = function RoleCreateDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RoleCreateDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleCreateDialogComponent, selectors: [["app-role-create-dialog"]], outputs: { roleCreated: "roleCreated", cancelled: "cancelled" }, decls: 18, vars: 4, consts: [[1, "fixed", "inset-0", "bg-black/30", "flex", "items-center", "justify-center", "z-50"], [1, "bg-white", "rounded-lg", "p-6", "max-w-md", "w-full", "mx-4", "shadow-lg"], [1, "text-xl", "font-semibold", "text-gray-900", "mb-4"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Gerente de Ventas", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "placeholder-gray-400", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500"], [1, "mt-1", "text-sm", "text-red-600"], ["formControlName", "description", "rows", "3", "placeholder", "Descripci\xF3n del rol (opcional)", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "placeholder-gray-400", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500"], [1, "flex", "gap-3", "justify-end", "pt-4"], ["text", "Cancelar", "custom_class", "btn_secondary", "type", "button", 3, "clicked"], ["text", "Crear Rol", "custom_class", "btn_primary", "type", "submit", 3, "clicked", "loading", "disabled"]], template: function RoleCreateDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Crear Nuevo Rol");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "form", 3);
      \u0275\u0275listener("ngSubmit", function RoleCreateDialogComponent_Template_form_ngSubmit_4_listener() {
        return ctx.createRole();
      });
      \u0275\u0275elementStart(5, "div")(6, "label", 4);
      \u0275\u0275text(7, " Nombre del Rol * ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(8, "input", 5);
      \u0275\u0275conditionalCreate(9, RoleCreateDialogComponent_Conditional_9_Template, 2, 0, "p", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div")(11, "label", 4);
      \u0275\u0275text(12, " Descripci\xF3n ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "textarea", 7);
      \u0275\u0275text(14, "            ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 8)(16, "app-button", 9);
      \u0275\u0275listener("clicked", function RoleCreateDialogComponent_Template_app_button_clicked_16_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "app-button", 10);
      \u0275\u0275listener("clicked", function RoleCreateDialogComponent_Template_app_button_clicked_17_listener() {
        return ctx.createRole();
      });
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(4);
      \u0275\u0275property("formGroup", ctx.roleForm);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(((tmp_1_0 = ctx.roleForm.get("name")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.roleForm.get("name")) == null ? null : tmp_1_0.touched) ? 9 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275property("loading", ctx.saving)("disabled", ctx.roleForm.invalid || ctx.saving);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ButtonComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleCreateDialogComponent, [{
    type: Component,
    args: [{
      selector: "app-role-create-dialog",
      standalone: true,
      imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
      template: `
    <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Crear Nuevo Rol</h2>
        
        <form [formGroup]="roleForm" (ngSubmit)="createRole()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Rol *
            </label>
            <input
              type="text"
              formControlName="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Gerente de Ventas">
            @if (roleForm.get('name')?.invalid && roleForm.get('name')?.touched) {
              <p class="mt-1 text-sm text-red-600">El nombre es requerido</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descripci\xF3n
            </label>
            <textarea
              formControlName="description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripci\xF3n del rol (opcional)">
            </textarea>
          </div>

          <div class="flex gap-3 justify-end pt-4">
            <app-button
              text="Cancelar"
              custom_class="btn_secondary"
              type="button"
              (clicked)="cancel()">
            </app-button>
            
            <app-button
              text="Crear Rol"
              custom_class="btn_primary"
              type="submit"
              [loading]="saving"
              [disabled]="roleForm.invalid || saving"
              (clicked)="createRole()">
            </app-button>
          </div>
        </form>
      </div>
    </div>
  `
    }]
  }], () => [{ type: FormBuilder }, { type: RoleService }, { type: MatSnackBar }], { roleCreated: [{
    type: Output
  }], cancelled: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleCreateDialogComponent, { className: "RoleCreateDialogComponent", filePath: "src/app/features/rbac-tenant-ui/components/role-create-dialog/role-create-dialog.component.ts", lineNumber: 68 });
})();

// src/app/features/rbac-tenant-ui/services/module.service.ts
var ModuleService = class _ModuleService {
  http;
  dataMapper;
  modulesCache$ = new BehaviorSubject(null);
  modulePermissionsCache$ = new BehaviorSubject(null);
  api = environment.api;
  constructor(http, dataMapper) {
    this.http = http;
    this.dataMapper = dataMapper;
  }
  /**
   * Fetches all available modules with their permissions
   * Implements in-memory caching to avoid redundant API calls
   * @returns Observable<Module[]> - Array of modules with their permissions
   */
  getModules() {
    if (this.modulesCache$.value) {
      return new Observable((observer) => {
        observer.next(this.modulesCache$.value);
        observer.complete();
      });
    }
    return this.http.get(`${this.api}/tenant/modules`).pipe(map((backendModules) => this.dataMapper.mapModules(backendModules)), tap((modules) => this.modulesCache$.next(modules)), shareReplay(1));
  }
  /**
   * Fetches all module permissions
   * Implements in-memory caching to avoid redundant API calls
   * @returns Observable<ModulePermission[]> - Array of all module permissions
   */
  getModulePermissions() {
    if (this.modulePermissionsCache$.value) {
      return new Observable((observer) => {
        observer.next(this.modulePermissionsCache$.value);
        observer.complete();
      });
    }
    return this.http.get(`${this.api}/tenant/module-permissions`).pipe(tap((permissions) => this.modulePermissionsCache$.next(permissions)), shareReplay(1));
  }
  /**
   * Clears the module cache
   * Useful for forcing a refresh of module data
   */
  clearCache() {
    this.modulesCache$.next(null);
    this.modulePermissionsCache$.next(null);
  }
  static \u0275fac = function ModuleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ModuleService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(DataMapperService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ModuleService, factory: _ModuleService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ModuleService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }, { type: DataMapperService }], null);
})();

// src/app/features/rbac-tenant-ui/pages/roles-management/roles-management.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function RolesManagementComponent_Conditional_15_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "p");
    \u0275\u0275text(2, "No se encontraron roles");
    \u0275\u0275elementEnd()();
  }
}
function RolesManagementComponent_Conditional_15_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "button", 17);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275listener("click", function RolesManagementComponent_Conditional_15_Conditional_1_For_1_Template_button_click_1_listener() {
      const role_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onRoleSelected(role_r2.id));
    });
    \u0275\u0275elementStart(3, "div", 18)(4, "div", 19)(5, "p", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 21)(8, "span", 22);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 23);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-blue-50", \u0275\u0275pipeBind1(2, 8, ctx_r2.selectedRoleId$) === role_r2.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(role_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r2.getPermissionCount(role_r2), " permiso", ctx_r2.getPermissionCount(role_r2) !== 1 ? "s" : "", " ");
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getPermissionBadgeClass(role_r2));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getPermissionStatusText(role_r2), " ");
  }
}
function RolesManagementComponent_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, RolesManagementComponent_Conditional_15_Conditional_1_For_1_Template, 12, 10, "div", 16, _forTrack04);
  }
  if (rf & 2) {
    const roles_r4 = \u0275\u0275nextContext();
    \u0275\u0275repeater(roles_r4);
  }
}
function RolesManagementComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, RolesManagementComponent_Conditional_15_Conditional_0_Template, 3, 0, "div", 15)(1, RolesManagementComponent_Conditional_15_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length === 0 ? 0 : 1);
  }
}
function RolesManagementComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "app-role-edit-form", 24);
    \u0275\u0275listener("roleUpdated", function RolesManagementComponent_Conditional_18_Template_app_role_edit_form_roleUpdated_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleUpdated($event));
    })("roleDeleted", function RolesManagementComponent_Conditional_18_Template_app_role_edit_form_roleDeleted_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleDeleted($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 25)(3, "div", 26)(4, "span", 27);
    \u0275\u0275text(5, "Permisos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 28);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 26)(9, "span", 27);
    \u0275\u0275text(10, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 29);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(13, "div", 30)(14, "app-role-permissions-manager", 31);
    \u0275\u0275listener("permissionsUpdated", function RolesManagementComponent_Conditional_18_Template_app_role_permissions_manager_permissionsUpdated_14_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPermissionsUpdated($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const role_r6 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("role", role_r6);
    \u0275\u0275advance(5);
    \u0275\u0275classMap(ctx_r2.getPermissionBadgeClass(role_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getPermissionCount(role_r6), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r2.getPermissionBadgeClass(role_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getPermissionStatusText(role_r6), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("role", role_r6);
  }
}
function RolesManagementComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 32)(2, "p", 33);
    \u0275\u0275text(3, "Selecciona un rol para ver detalles");
    \u0275\u0275elementEnd()()();
  }
}
function RolesManagementComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-role-create-dialog", 34);
    \u0275\u0275listener("roleCreated", function RolesManagementComponent_Conditional_21_Template_app_role_create_dialog_roleCreated_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleCreated($event));
    })("cancelled", function RolesManagementComponent_Conditional_21_Template_app_role_create_dialog_cancelled_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCreateDialogCancelled());
    });
    \u0275\u0275elementEnd();
  }
}
var RolesManagementComponent = class _RolesManagementComponent {
  stateService;
  roleService;
  moduleService;
  snackBar;
  router;
  activatedRoute;
  // Observable streams from state service
  roles$;
  filteredRoles$;
  selectedRoleId$;
  selectedRole$;
  modules$;
  roleSearchFilter$;
  // Local component state
  showOnlyUnconfigurated = false;
  showCreateDialog = false;
  showOnlyUnconfiguratedSubject = new BehaviorSubject(false);
  constructor(stateService, roleService, moduleService, snackBar, router, activatedRoute) {
    this.stateService = stateService;
    this.roleService = roleService;
    this.moduleService = moduleService;
    this.snackBar = snackBar;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.roles$ = this.stateService.roles$;
    this.filteredRoles$ = this.stateService.filteredRoles$;
    this.selectedRoleId$ = this.stateService.selectedRoleId$;
    this.modules$ = this.stateService.modules$;
    this.roleSearchFilter$ = this.stateService.roleSearchFilter$;
    this.selectedRole$ = combineLatest([this.selectedRoleId$, this.roles$]).pipe(map(([selectedId, roles]) => {
      if (!selectedId)
        return null;
      return roles.find((r) => r.id === selectedId) || null;
    }));
  }
  ngOnInit() {
    this.roleService.getRoles().subscribe((roles) => {
      console.log("Roles loaded:", roles);
      this.stateService.updateRoles(roles);
    }, (error) => {
      console.error("Failed to load roles:", error);
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: error.error?.message || "Failed to load roles", type: "error" },
        duration: 5e3
      });
    });
    this.moduleService.getModules().subscribe((modules) => {
      console.log("Modules loaded:", modules);
      this.stateService.updateModules(modules);
    }, (error) => {
      console.error("Failed to load modules:", error);
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: error.error?.message || "Failed to load modules", type: "error" },
        duration: 5e3
      });
    });
  }
  /**
   * Handles role selection from the left panel
   * Updates the state service with the selected role ID
   * @param roleId - The ID of the selected role
   */
  onRoleSelected(roleId) {
    this.stateService.selectRole(roleId);
  }
  /**
   * Handles role search filter changes
   * Updates the state service with the search filter
   * @param event - The input event from the search field
   */
  onRoleSearchChange(event) {
    const searchText = event.target.value;
    this.stateService.setRoleSearchFilter(searchText);
  }
  /**
   * Handles create new role button click
   * Opens the create role dialog
   */
  onCreateRoleClicked() {
    this.showCreateDialog = true;
  }
  /**
   * Handles role creation from the dialog
   * Refreshes the roles list and selects the new role
   */
  onRoleCreated(newRole) {
    this.showCreateDialog = false;
    this.roleService.getRoles().subscribe((roles) => {
      this.stateService.updateRoles(roles);
      this.stateService.selectRole(newRole.id);
    });
  }
  /**
   * Handles create dialog cancellation
   */
  onCreateDialogCancelled() {
    this.showCreateDialog = false;
  }
  /**
   * Navigates back to Settings
   */
  goBackToSettings() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }
  /**
   * Handles role updates from the edit form
   */
  onRoleUpdated(updatedRole) {
    this.roleService.getRoles().subscribe((roles) => {
      this.stateService.updateRoles(roles);
    });
  }
  /**
   * Handles role deletion from the edit form
   */
  onRoleDeleted(roleId) {
    if (this.stateService.selectedRoleId$ && roleId) {
      this.stateService.clearRoleSelection();
    }
    this.roleService.getRoles().subscribe((roles) => {
      this.stateService.updateRoles(roles);
    });
  }
  /**
   * Handles permission updates from the permissions manager
   */
  onPermissionsUpdated(updatedRole) {
    console.log("Permissions updated, refreshing roles list");
    this.roleService.clearCache();
    this.roleService.getRoles().subscribe((roles) => {
      console.log("Roles refreshed after permission update:", roles);
      console.log("Updated role:", roles.find((r) => r.id === updatedRole.id));
      this.stateService.updateRoles(roles);
    }, (error) => {
      console.error("Error refreshing roles:", error);
    });
  }
  /**
   * Gets the permission count from the role, preferring backend count over array length
   */
  getPermissionCount(role) {
    return role.permission_count ?? role.permissions?.length ?? 0;
  }
  /**
   * Gets the CSS classes for the permission status badge
   */
  getPermissionBadgeClass(role) {
    const count = this.getPermissionCount(role);
    if (count === 0) {
      return "bg-red-100 text-red-800";
    } else if (count <= 5) {
      return "bg-yellow-100 text-yellow-800";
    } else {
      return "bg-green-100 text-green-800";
    }
  }
  /**
   * Gets the status text for the permission badge
   */
  getPermissionStatusText(role) {
    const count = this.getPermissionCount(role);
    if (count === 0) {
      return "Sin configurar";
    } else if (count <= 5) {
      return "B\xE1sico";
    } else {
      return "Completo";
    }
  }
  static \u0275fac = function RolesManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RolesManagementComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(ModuleService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RolesManagementComponent, selectors: [["app-roles-management"]], decls: 22, vars: 7, consts: [[1, "h-screen", "flex", "flex-col", "overflow-hidden"], [1, "flex", "items-center", "gap-3", "px-3", "py-3", "shrink-0", "border-b", "border-gray-200"], [3, "clicked"], [1, "text-2xl", "font-bold", "text-gray-900"], [1, "flex", "gap-2", "flex-1", "min-h-0", "px-2", "py-2"], [1, "w-1/3", "bg-white", "border", "border-gray-200", "rounded-lg", "flex", "flex-col", "h-full", "shadow-sm"], [1, "px-3", "py-2", "border-b", "border-gray-200", "shrink-0"], [1, "text-base", "font-semibold", "text-gray-900"], [1, "px-3", "py-2", "border-b", "border-gray-200", "space-y-2", "shrink-0"], [1, "flex", "gap-2", "flex-wrap"], ["type", "text", "placeholder", "Buscar roles...", 1, "flex-1", "min-w-[150px]", "px-2", "py-1.5", "text-sm", "border", "border-gray-300", "rounded-md", "shadow-sm", "placeholder-gray-400", "focus:outline-none", "focus:ring-blue-500", "focus:border-blue-500", 3, "input"], ["text", "Nuevo Rol", "size", "sm", "custom_class", "btn_primary", 3, "clicked"], [1, "flex-1", "overflow-y-auto", "min-h-0"], [1, "flex-1", "bg-white", "border", "border-gray-200", "rounded-lg", "flex", "flex-col", "h-full", "shadow-sm"], [1, "flex", "items-center", "justify-center", "h-full"], [1, "p-3", "text-center", "text-gray-500", "text-sm"], [1, "border-b", "border-gray-100", "last:border-b-0"], [1, "w-full", "text-left", "px-3", "py-2", "hover:bg-gray-50", "transition-colors", "focus:outline-none", "focus:ring-2", "focus:ring-inset", "focus:ring-blue-500", 3, "click"], [1, "flex", "items-center", "justify-between"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", "text-gray-900", "truncate"], [1, "flex", "items-center", "gap-2", "mt-0.5"], [1, "text-xs", "text-gray-500"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded-full", "text-xs", "font-medium"], [3, "roleUpdated", "roleDeleted", "role"], [1, "flex", "items-center", "gap-3", "mt-2"], [1, "flex", "items-center", "gap-2"], [1, "text-sm", "text-gray-500"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded-full", "text-sm", "font-medium"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded-full", "text-xs", "font-medium"], [1, "flex-1", "overflow-y-auto", "p-3", "min-h-0"], [3, "permissionsUpdated", "role"], [1, "text-center"], [1, "text-gray-500", "text-lg"], [3, "roleCreated", "cancelled"]], template: function RolesManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "app-back-button", 2);
      \u0275\u0275listener("clicked", function RolesManagementComponent_Template_app_back_button_clicked_2_listener() {
        return ctx.goBackToSettings();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h1", 3);
      \u0275\u0275text(4, "Gesti\xF3n de Roles y Permisos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "h2", 7);
      \u0275\u0275text(9, "Roles");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 8)(11, "div", 9)(12, "input", 10);
      \u0275\u0275listener("input", function RolesManagementComponent_Template_input_input_12_listener($event) {
        return ctx.onRoleSearchChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "app-button", 11);
      \u0275\u0275listener("clicked", function RolesManagementComponent_Template_app_button_clicked_13_listener() {
        return ctx.onCreateRoleClicked();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 12);
      \u0275\u0275conditionalCreate(15, RolesManagementComponent_Conditional_15_Template, 2, 1);
      \u0275\u0275pipe(16, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 13);
      \u0275\u0275conditionalCreate(18, RolesManagementComponent_Conditional_18_Template, 15, 8);
      \u0275\u0275pipe(19, "async");
      \u0275\u0275conditionalBranchCreate(20, RolesManagementComponent_Conditional_20_Template, 4, 0, "div", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(21, RolesManagementComponent_Conditional_21_Template, 1, 0, "app-role-create-dialog");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      \u0275\u0275advance(15);
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(16, 3, ctx.filteredRoles$)) ? 15 : -1, tmp_0_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(19, 5, ctx.selectedRole$)) ? 18 : 20, tmp_1_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.showCreateDialog ? 21 : -1);
    }
  }, dependencies: [CommonModule, BackButtonComponent2, RolePermissionsManagerComponent, RoleEditFormComponent, RoleCreateDialogComponent, ButtonComponent, AsyncPipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  overflow: hidden;\n}\n.w-1-3[_ngcontent-%COMP%] {\n  flex: 0 0 33.333%;\n}\n.w-2-3[_ngcontent-%COMP%] {\n  flex: 0 0 66.667%;\n}\n.overflow-y-auto[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\nbutton[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n/*# sourceMappingURL=roles-management.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RolesManagementComponent, [{
    type: Component,
    args: [{ selector: "app-roles-management", standalone: true, imports: [CommonModule, BackButtonComponent2, RolePermissionsManagerComponent, RoleEditFormComponent, RoleCreateDialogComponent, ButtonComponent], template: `
    <!-- Roles Management Container with Two-Column Layout -->
    <div class="h-screen flex flex-col overflow-hidden">
      <!-- Header with Back Button -->
      <div class="flex items-center gap-3 px-3 py-3 shrink-0 border-b border-gray-200">
        <app-back-button (clicked)="goBackToSettings()"></app-back-button>
        <h1 class="text-2xl font-bold text-gray-900">Gesti\xF3n de Roles y Permisos</h1>
      </div>

      <!-- Main Content -->
      <div class="flex gap-2 flex-1 min-h-0 px-2 py-2">
        <!-- Left Panel: Role List -->
        <div class="w-1/3 bg-white border border-gray-200 rounded-lg flex flex-col h-full shadow-sm">
          <!-- Header -->
          <div class="px-3 py-2 border-b border-gray-200 shrink-0">
            <h2 class="text-base font-semibold text-gray-900">Roles</h2>
          </div>

          <!-- Search and Create Button Section -->
          <div class="px-3 py-2 border-b border-gray-200 space-y-2 shrink-0">
            <!-- Search and Create Row -->
            <div class="flex gap-2 flex-wrap">
              <!-- Search Input -->
              <input
                type="text"
                placeholder="Buscar roles..."
                (input)="onRoleSearchChange($event)"
                class="flex-1 min-w-[150px] px-2 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              
              <!-- Create New Role Button -->
              <app-button
                text="Nuevo Rol"
                size="sm"
                custom_class="btn_primary"
                (clicked)="onCreateRoleClicked()">
              </app-button>
            </div>
          </div>

          <!-- Role List -->
          <div class="flex-1 overflow-y-auto min-h-0">
            @if (filteredRoles$ | async; as roles) {
              @if (roles.length === 0) {
                <div class="p-3 text-center text-gray-500 text-sm">
                  <p>No se encontraron roles</p>
                </div>
              } @else {
                @for (role of roles; track role.id) {
                  <div class="border-b border-gray-100 last:border-b-0">
                    <button
                      (click)="onRoleSelected(role.id)"
                      [class.bg-blue-50]="(selectedRoleId$ | async) === role.id"
                      class="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate">{{ role.name }}</p>
                          <div class="flex items-center gap-2 mt-0.5">
                            <span class="text-xs text-gray-500">
                              {{ getPermissionCount(role) }} permiso{{ getPermissionCount(role) !== 1 ? 's' : '' }}
                            </span>
                            <span 
                              [class]="getPermissionBadgeClass(role)"
                              class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium">
                              {{ getPermissionStatusText(role) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                }
              }
            }
          </div>
        </div>

        <!-- Right Panel: Role Details -->
        <div class="flex-1 bg-white border border-gray-200 rounded-lg flex flex-col h-full shadow-sm">
          @if (selectedRole$ | async; as role) {
            <!-- Role Details Header -->
            <div class="px-3 py-2 border-b border-gray-200 shrink-0">
              <app-role-edit-form
                [role]="role"
                (roleUpdated)="onRoleUpdated($event)"
                (roleDeleted)="onRoleDeleted($event)">
              </app-role-edit-form>
              
              <!-- Role Stats -->
              <div class="flex items-center gap-3 mt-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500">Permisos:</span>
                  <span 
                    [class]="getPermissionBadgeClass(role)"
                    class="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium">
                    {{ getPermissionCount(role) }}
                  </span>
                </div>
                
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500">Estado:</span>
                  <span 
                    [class]="getPermissionBadgeClass(role)"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                    {{ getPermissionStatusText(role) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Role Details Content -->
            <div class="flex-1 overflow-y-auto p-3 min-h-0">
              <app-role-permissions-manager
                [role]="role"
                (permissionsUpdated)="onPermissionsUpdated($event)">
              </app-role-permissions-manager>
            </div>
          } @else {
            <div class="flex items-center justify-center h-full">
              <div class="text-center">
                <p class="text-gray-500 text-lg">Selecciona un rol para ver detalles</p>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Create Role Dialog -->
      @if (showCreateDialog) {
        <app-role-create-dialog
          (roleCreated)="onRoleCreated($event)"
          (cancelled)="onCreateDialogCancelled()">
        </app-role-create-dialog>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;edad3763ca789f4b5b3550421b5383484978dfec6aaf8ec817a95d4dddec18bd;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/rbac-tenant-ui/pages/roles-management/roles-management.component.ts */\n:host {\n  display: block;\n  height: 100%;\n  overflow: hidden;\n}\n.w-1-3 {\n  flex: 0 0 33.333%;\n}\n.w-2-3 {\n  flex: 0 0 66.667%;\n}\n.overflow-y-auto {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.overflow-y-auto::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\nbutton:hover {\n  background-color: #f9fafb;\n}\nbutton:focus {\n  outline: none;\n}\n/*# sourceMappingURL=roles-management.component.css.map */\n"] }]
  }], () => [{ type: StateService }, { type: RoleService }, { type: ModuleService }, { type: MatSnackBar }, { type: Router }, { type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RolesManagementComponent, { className: "RolesManagementComponent", filePath: "src/app/features/rbac-tenant-ui/pages/roles-management/roles-management.component.ts", lineNumber: 211 });
})();

// src/app/features/settings/components/vendor-list/vendor-list.component.ts
var _c0 = ["tableTemplate"];
function VendorListComponent_option_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r2 = ctx.$implicit;
    \u0275\u0275property("value", opt_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r2.label);
  }
}
function VendorListComponent_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "p", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span", 12);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td")(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td")(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td")(22, "span", 12);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r3.company_name ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r3.company_name || "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getVendorTypeBadgeClass(item_r3.vendor_type));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getVendorTypeLabel(item_r3.vendor_type), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r3.getFiscalId(item_r3) !== "\u2014" ? "settings-cell-mono" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getFiscalId(item_r3), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r3.city ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.city || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r3.state ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.state || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r3.country ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.country || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(item_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(item_r3.status), " ");
  }
}
var VendorListComponent = class _VendorListComponent {
  router;
  route;
  vendorService;
  dialog;
  snackBar;
  tableTemplate;
  table_config = signal({
    rows: [],
    columns: [
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true, width: 150 },
      { name: "Empresa", prop: "company_name", sortable: true, canAutoResize: true, width: 180 },
      { name: "Tipo", prop: "vendor_type", sortable: true, canAutoResize: true, width: 110 },
      { name: "ID Fiscal", prop: "rfc", sortable: false, canAutoResize: true, width: 130 },
      { name: "Ciudad", prop: "city", sortable: true, canAutoResize: true, width: 120 },
      { name: "Estado", prop: "state", sortable: true, canAutoResize: true, width: 100 },
      { name: "Pa\xEDs", prop: "country", sortable: true, canAutoResize: true, width: 100 },
      { name: "Status", prop: "status", sortable: true, canAutoResize: true, width: 100 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron proveedores" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  ArrowRight = ArrowRight;
  search = "";
  vendorTypeFilter = "";
  vendorTypeFilterOptions = [
    { value: "", label: "Todos los tipos" },
    { value: "NATIONAL", label: "Nacional (M\xE9xico)" },
    { value: "INTERNATIONAL", label: "Internacional" }
  ];
  destroy$ = new Subject();
  lastQueryParams = "";
  constructor(router, route, vendorService, dialog, snackBar) {
    this.router = router;
    this.route = route;
    this.vendorService = vendorService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;
      this.search = query?.["search"] ?? "";
      const type = query?.["vendor_type"];
      this.vendorTypeFilter = type === "NATIONAL" || type === "INTERNATIONAL" ? type : "";
      const page = query?.["page"] ? Number(query["page"]) : 1;
      const limit = query?.["limit"] ? Number(query["limit"]) : 20;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        page: Number.isNaN(page) ? 1 : page,
        limit: Number.isNaN(limit) ? 20 : limit
      }));
      this.loadVendors();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadVendors() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const config = this.table_config();
    const page = Number.isNaN(config.page) ? 1 : config.page;
    const limit = Number.isNaN(config.limit) ? 20 : config.limit;
    const params = { page, limit };
    if (this.search?.trim()) {
      params.search = this.search.trim();
    }
    if (this.vendorTypeFilter) {
      params.vendor_type = this.vendorTypeFilter;
    }
    this.vendorService.getVendors(params).subscribe({
      next: (res) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: res.data,
          totalResults: res.total,
          hasNext: res.hasNext ?? false,
          loading: false
        }));
      },
      error: (error) => {
        console.error("Error loading vendors:", error);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
      }
    });
  }
  onPageChange(event) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page,
        limit: event.limit,
        search: this.search || void 0,
        vendor_type: this.vendorTypeFilter || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || void 0,
        vendor_type: this.vendorTypeFilter || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onVendorTypeFilterChange(value) {
    const vendorType = value === "NATIONAL" || value === "INTERNATIONAL" ? value : "";
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        vendor_type: vendorType || void 0,
        search: this.search || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  getVendorTypeBadgeClass(type) {
    return type === "INTERNATIONAL" ? "settings-badge--type-international" : "settings-badge--type-national";
  }
  openCreateVendorModal() {
    const dialogRef = this.dialog.open(VendorDetailModalComponent, {
      width: "80vw",
      maxWidth: "1000px",
      data: { vendor: null }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadVendors();
      }
    });
  }
  viewDetail(event) {
    const vendor = event.data;
    const dialogRef = this.dialog.open(VendorDetailModalComponent, {
      width: "80vw",
      maxWidth: "1000px",
      data: { vendor }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadVendors();
      }
    });
  }
  getStatusClass(status) {
    return status === "active" ? "settings-badge--status-active" : "settings-badge--status-inactive";
  }
  getStatusLabel(status) {
    return status === "active" ? "Activo" : "Inactivo";
  }
  getVendorTypeLabel(type) {
    return type === "INTERNATIONAL" ? "Internacional" : "Nacional";
  }
  getFiscalId(vendor) {
    if (vendor.vendor_type === "INTERNATIONAL") {
      return vendor.tax_id || "\u2014";
    }
    return vendor.rfc || "\u2014";
  }
  deleteVendor(vendor, event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: "400px",
      data: {
        title: "Eliminar Proveedor",
        message: `\xBFEst\xE1s seguro de que deseas eliminar el proveedor "${vendor.name}"? Esta acci\xF3n no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vendorService.deleteVendor(vendor.id).subscribe({
          next: () => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: "Proveedor eliminado correctamente", type: "success" },
              duration: 3e3
            });
            this.loadVendors();
          },
          error: (error) => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: error.error?.message || "Error al eliminar proveedor", type: "error" },
              duration: 5e3
            });
          }
        });
      }
    });
  }
  static \u0275fac = function VendorListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorListComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(VendorService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VendorListComponent, selectors: [["app-vendor-list"]], viewQuery: function VendorListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 12, vars: 5, consts: [["tableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-wrap", "items-center", "gap-3"], [1, "vendor-type-filter", 3, "change", "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "w-64", 3, "searchChange", "param_activate"], ["text", "Nuevo Proveedor", "custom_class", "btn_primary", 3, "clicked"], ["variant", "settings", 3, "pageChange", "rowClick", "config", "rowTemplate"], [3, "value"], [1, "settings-cell-primary", "truncate"], [1, "settings-badge", 3, "ngClass"]], template: function VendorListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
      \u0275\u0275text(3, "Proveedores");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "select", 5);
      \u0275\u0275listener("change", function VendorListComponent_Template_select_change_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onVendorTypeFilterChange($event.target.value));
      });
      \u0275\u0275template(6, VendorListComponent_option_6_Template, 2, 2, "option", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "app-search", 7);
      \u0275\u0275listener("searchChange", function VendorListComponent_Template_app_search_searchChange_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "app-button", 8);
      \u0275\u0275listener("clicked", function VendorListComponent_Template_app_button_clicked_8_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateVendorModal());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "app-datatable-wrapper", 9);
      \u0275\u0275listener("pageChange", function VendorListComponent_Template_app_datatable_wrapper_pageChange_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("rowClick", function VendorListComponent_Template_app_datatable_wrapper_rowClick_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.viewDetail($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, VendorListComponent_ng_template_10_Template, 24, 20, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r5 = \u0275\u0275reference(11);
      \u0275\u0275advance(5);
      \u0275\u0275property("value", ctx.vendorTypeFilter);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.vendorTypeFilterOptions);
      \u0275\u0275advance();
      \u0275\u0275property("param_activate", false);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r5);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
  ], styles: ["\n\n.settings-cell-primary[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national[_ngcontent-%COMP%] {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international[_ngcontent-%COMP%] {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n.vendor-type-filter[_ngcontent-%COMP%] {\n  min-width: 11rem;\n  padding: 0.45rem 0.65rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  color: #334155;\n  background: #fff;\n}\n.vendor-type-filter[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n/*# sourceMappingURL=vendor-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorListComponent, [{
    type: Component,
    args: [{ selector: "app-vendor-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent
    ], template: `<div class="settings-list-page px-4 pb-6">\r
\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
\r
    <h2 class="text-2xl font-semibold text-gray-800">Proveedores</h2>\r
\r
\r
\r
    <div class="flex flex-wrap items-center gap-3">\r
\r
      <select\r
\r
        class="vendor-type-filter"\r
\r
        [value]="vendorTypeFilter"\r
\r
        (change)="onVendorTypeFilterChange($any($event.target).value)">\r
\r
        <option *ngFor="let opt of vendorTypeFilterOptions" [value]="opt.value">{{ opt.label }}</option>\r
\r
      </select>\r
\r
\r
\r
      <app-search\r
\r
        class="w-64"\r
\r
        [param_activate]="false"\r
\r
        (searchChange)="onSearchChange($event)">\r
\r
      </app-search>\r
\r
\r
\r
      <app-button\r
\r
        text="Nuevo Proveedor"\r
\r
        custom_class="btn_primary"\r
\r
        (clicked)="openCreateVendorModal()">\r
\r
      </app-button>\r
\r
    </div>\r
\r
  </div>\r
\r
\r
\r
  <app-datatable-wrapper\r
\r
    variant="settings"\r
\r
    [config]="table_config()"\r
\r
    [rowTemplate]="tableTemplate"\r
\r
    (pageChange)="onPageChange($event)"\r
\r
    (rowClick)="viewDetail($event)">\r
\r
  </app-datatable-wrapper>\r
\r
</div>\r
\r
\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
\r
  <td>\r
\r
    <p class="settings-cell-primary truncate">{{ item.name }}</p>\r
\r
  </td>\r
\r
  <td>\r
\r
    <span [class]="item.company_name ? 'settings-cell-text' : 'settings-cell-empty'">\r
\r
      {{ item.company_name || '\u2014' }}\r
\r
    </span>\r
\r
  </td>\r
\r
  <td>\r
\r
    <span class="settings-badge" [ngClass]="getVendorTypeBadgeClass(item.vendor_type)">\r
\r
      {{ getVendorTypeLabel(item.vendor_type) }}\r
\r
    </span>\r
\r
  </td>\r
\r
  <td>\r
\r
    <span [class]="getFiscalId(item) !== '\u2014' ? 'settings-cell-mono' : 'settings-cell-empty'">\r
\r
      {{ getFiscalId(item) }}\r
\r
    </span>\r
\r
  </td>\r
\r
  <td>\r
\r
    <span [class]="item.city ? 'settings-cell-text' : 'settings-cell-empty'">{{ item.city || '\u2014' }}</span>\r
\r
  </td>\r
\r
  <td>\r
\r
    <span [class]="item.state ? 'settings-cell-text' : 'settings-cell-empty'">{{ item.state || '\u2014' }}</span>\r
\r
  </td>\r
\r
  <td>\r
\r
    <span [class]="item.country ? 'settings-cell-text' : 'settings-cell-empty'">{{ item.country || '\u2014' }}</span>\r
\r
  </td>\r
\r
  <td>\r
\r
    <span class="settings-badge" [ngClass]="getStatusClass(item.status)">\r
\r
      {{ getStatusLabel(item.status) }}\r
\r
    </span>\r
\r
  </td>\r
\r
</ng-template>\r
\r
`, styles: ["/* src/app/features/settings/components/vendor-list/vendor-list.component.scss */\n.settings-cell-primary {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n.vendor-type-filter {\n  min-width: 11rem;\n  padding: 0.45rem 0.65rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  font-size: 0.8125rem;\n  color: #334155;\n  background: #fff;\n}\n.vendor-type-filter:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);\n}\n/*# sourceMappingURL=vendor-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: VendorService }, { type: MatDialog }, { type: MatSnackBar }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VendorListComponent, { className: "VendorListComponent", filePath: "src/app/features/settings/components/vendor-list/vendor-list.component.ts", lineNumber: 59 });
})();

// src/app/features/settings/components/warehouse-list/warehouse-list.component.ts
var _c02 = ["tableTemplate"];
function WarehouseListComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "p", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "span", 9);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td")(13, "span", 10);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.code);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r2.country ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.country || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r2.state ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.state || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(item_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r2.status), " ");
  }
}
var WarehouseListComponent = class _WarehouseListComponent {
  router;
  route;
  warehouseService;
  dialog;
  snackBar;
  tableTemplate;
  table_config = signal({
    rows: [],
    columns: [
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true, width: 150 },
      { name: "C\xF3digo", prop: "code", sortable: true, canAutoResize: true, width: 120 },
      { name: "Pa\xEDs", prop: "country", sortable: true, canAutoResize: true, width: 100 },
      { name: "Estado", prop: "state", sortable: true, canAutoResize: true, width: 100 },
      { name: "Status", prop: "status", sortable: true, canAutoResize: true, width: 100 }
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron almacenes" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  search = "";
  destroy$ = new Subject();
  constructor(router, route, warehouseService, dialog, snackBar) {
    this.router = router;
    this.route = route;
    this.warehouseService = warehouseService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.loadWarehouses();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadWarehouses() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const params = {};
    if (this.search && this.search.trim()) {
      params.search = this.search;
    }
    this.warehouseService.getWarehouses(params).subscribe({
      next: (res) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: res.data,
          totalResults: res.total,
          loading: false
        }));
      },
      error: (error) => {
        console.error("Error loading warehouses:", error);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
      }
    });
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.loadWarehouses();
  }
  openCreateWarehouseModal() {
    const dialogRef = this.dialog.open(WarehouseDetailModalComponent, {
      width: "80vw",
      maxWidth: "1000px",
      data: { warehouse: null }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadWarehouses();
      }
    });
  }
  viewDetail(warehouse) {
    const dialogRef = this.dialog.open(WarehouseDetailModalComponent, {
      width: "80vw",
      maxWidth: "1000px",
      data: { warehouse }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadWarehouses();
      }
    });
  }
  getStatusClass(status) {
    return status === "active" ? "settings-badge--status-active" : "settings-badge--status-inactive";
  }
  getStatusLabel(status) {
    return status === "active" ? "Activo" : "Inactivo";
  }
  static \u0275fac = function WarehouseListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WarehouseListComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WarehouseListComponent, selectors: [["app-warehouse-list"]], viewQuery: function WarehouseListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 10, vars: 3, consts: [["tableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "items-center", "gap-3"], [1, "w-64", 3, "searchChange", "param_activate"], ["text", "Nuevo Almac\xE9n", "custom_class", "btn_primary", 3, "clicked"], ["variant", "settings", 3, "rowClick", "config", "rowTemplate"], [1, "settings-cell-primary", "truncate"], [1, "settings-badge", "settings-badge--code"], [1, "settings-badge", 3, "ngClass"]], template: function WarehouseListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
      \u0275\u0275text(3, "Almacenes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "app-search", 5);
      \u0275\u0275listener("searchChange", function WarehouseListComponent_Template_app_search_searchChange_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "app-button", 6);
      \u0275\u0275listener("clicked", function WarehouseListComponent_Template_app_button_clicked_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateWarehouseModal());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "app-datatable-wrapper", 7);
      \u0275\u0275listener("rowClick", function WarehouseListComponent_Template_app_datatable_wrapper_rowClick_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.viewDetail($event.data));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, WarehouseListComponent_ng_template_8_Template, 15, 10, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r4 = \u0275\u0275reference(9);
      \u0275\u0275advance(5);
      \u0275\u0275property("param_activate", false);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r4);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
  ], styles: ["\n\n.settings-cell-primary[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national[_ngcontent-%COMP%] {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international[_ngcontent-%COMP%] {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n/*# sourceMappingURL=warehouse-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarehouseListComponent, [{
    type: Component,
    args: [{ selector: "app-warehouse-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent
    ], template: `<div class="settings-list-page px-4 pb-6">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <h2 class="text-2xl font-semibold text-gray-800">Almacenes</h2>\r
\r
    <div class="flex items-center gap-3">\r
      <app-search\r
        class="w-64"\r
        [param_activate]="false"\r
        (searchChange)="onSearchChange($event)">\r
      </app-search>\r
\r
      <app-button\r
        text="Nuevo Almac\xE9n"\r
        custom_class="btn_primary"\r
        (clicked)="openCreateWarehouseModal()">\r
      </app-button>\r
    </div>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    variant="settings"\r
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate"\r
    (rowClick)="viewDetail($event.data)">\r
  </app-datatable-wrapper>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <p class="settings-cell-primary truncate">{{ item.name }}</p>\r
  </td>\r
  <td>\r
    <span class="settings-badge settings-badge--code">{{ item.code }}</span>\r
  </td>\r
  <td>\r
    <span [class]="item.country ? 'settings-cell-text' : 'settings-cell-empty'">{{ item.country || '\u2014' }}</span>\r
  </td>\r
  <td>\r
    <span [class]="item.state ? 'settings-cell-text' : 'settings-cell-empty'">{{ item.state || '\u2014' }}</span>\r
  </td>\r
  <td>\r
    <span class="settings-badge" [ngClass]="getStatusClass(item.status)">\r
      {{ getStatusLabel(item.status) }}\r
    </span>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/settings/components/warehouse-list/warehouse-list.component.scss */\n.settings-cell-primary {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n/*# sourceMappingURL=warehouse-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: WarehouseService }, { type: MatDialog }, { type: MatSnackBar }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WarehouseListComponent, { className: "WarehouseListComponent", filePath: "src/app/features/settings/components/warehouse-list/warehouse-list.component.ts", lineNumber: 28 });
})();

// src/app/features/settings/components/fiscal-configuration-list/fiscal-configuration-list.component.ts
var _c03 = ["tableTemplate"];
function FiscalConfigurationListComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "p", 7);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "span", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span", 9);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span", 10);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.razon_social);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.rfc);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.persona_type);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(item_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r2.status), " ");
  }
}
var FiscalConfigurationListComponent = class _FiscalConfigurationListComponent {
  fiscalConfigService;
  dialog;
  snackBar;
  tableTemplate;
  table_config = signal({
    rows: [],
    columns: [
      { name: "Raz\xF3n Social", prop: "razon_social", sortable: true, canAutoResize: true, width: 200 },
      { name: "RFC", prop: "rfc", sortable: false, canAutoResize: true, width: 120 },
      { name: "Tipo de Persona", prop: "persona_type", sortable: true, canAutoResize: true, width: 150 },
      { name: "Status", prop: "status", sortable: true, canAutoResize: true, width: 100 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron configuraciones fiscales" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  constructor(fiscalConfigService, dialog, snackBar) {
    this.fiscalConfigService = fiscalConfigService;
    this.dialog = dialog;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.loadFiscalConfigurations();
  }
  loadFiscalConfigurations() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    this.fiscalConfigService.listFiscalConfigurations({
      page: this.table_config().page,
      limit: this.table_config().limit
    }).subscribe({
      next: (response) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: response.data,
          totalResults: response.total,
          loading: false,
          hasNext: response.data.length === c.limit
        }));
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar configuraciones fiscales", type: "error" },
          duration: 3e3
        });
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
      }
    });
  }
  onPageChange(event) {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
      page: event.page,
      limit: event.limit
    }));
    this.loadFiscalConfigurations();
  }
  openCreateDialog() {
    const dialogRef = this.dialog.open(FiscalConfigurationModalComponent, {
      width: "800px",
      data: { fiscalConfig: null }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
        this.loadFiscalConfigurations();
      }
    });
  }
  openEditDialog(config) {
    const dialogRef = this.dialog.open(FiscalConfigurationModalComponent, {
      width: "800px",
      data: { fiscalConfig: config }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadFiscalConfigurations();
      }
    });
  }
  getStatusClass(status) {
    return status === "active" ? "settings-badge--status-active" : "settings-badge--status-inactive";
  }
  getStatusLabel(status) {
    return status === "active" ? "Activo" : "Inactivo";
  }
  static \u0275fac = function FiscalConfigurationListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FiscalConfigurationListComponent)(\u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FiscalConfigurationListComponent, selectors: [["app-fiscal-configuration-list"]], viewQuery: function FiscalConfigurationListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 11, vars: 2, consts: [["tableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "text-gray-600", "text-sm", "mt-1"], ["text", "Nueva Configuraci\xF3n", "custom_class", "btn_primary", 3, "clicked"], ["variant", "settings", 3, "pageChange", "rowClick", "config", "rowTemplate"], [1, "settings-cell-primary", "truncate"], [1, "settings-cell-mono"], [1, "settings-cell-text"], [1, "settings-badge", 3, "ngClass"]], template: function FiscalConfigurationListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h2", 3);
      \u0275\u0275text(4, "Configuraciones Fiscales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Gestiona la informaci\xF3n fiscal de tus almacenes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "app-button", 5);
      \u0275\u0275listener("clicked", function FiscalConfigurationListComponent_Template_app_button_clicked_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateDialog());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "app-datatable-wrapper", 6);
      \u0275\u0275listener("pageChange", function FiscalConfigurationListComponent_Template_app_datatable_wrapper_pageChange_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("rowClick", function FiscalConfigurationListComponent_Template_app_datatable_wrapper_rowClick_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openEditDialog($event.data));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, FiscalConfigurationListComponent_ng_template_9_Template, 12, 5, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r4 = \u0275\u0275reference(10);
      \u0275\u0275advance(8);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r4);
    }
  }, dependencies: [CommonModule, NgClass, ButtonComponent, LucideAngularModule, DatatableWrapperComponent], styles: ["\n\n.settings-cell-primary[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national[_ngcontent-%COMP%] {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international[_ngcontent-%COMP%] {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n.fiscal-list-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  padding: 1.5rem;\n  background-color: #f9fafb;\n  min-height: 100vh;\n}\n.fiscal-list-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.fiscal-list-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.fiscal-list-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.fiscal-list-table[_ngcontent-%COMP%] {\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  font-size: 0.75rem;\n  color: #374151;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background-color 0.2s;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.fiscal-list-pagination[_ngcontent-%COMP%] {\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n  padding: 1rem 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n/*# sourceMappingURL=fiscal-configuration-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FiscalConfigurationListComponent, [{
    type: Component,
    args: [{ selector: "app-fiscal-configuration-list", standalone: true, imports: [CommonModule, ButtonComponent, LucideAngularModule, DatatableWrapperComponent], template: '<div class="settings-list-page px-4 pb-6">\r\n  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r\n    <div>\r\n      <h2 class="text-2xl font-semibold text-gray-800">Configuraciones Fiscales</h2>\r\n      <p class="text-gray-600 text-sm mt-1">Gestiona la informaci\xF3n fiscal de tus almacenes</p>\r\n    </div>\r\n\r\n    <app-button\r\n      text="Nueva Configuraci\xF3n"\r\n      custom_class="btn_primary"\r\n      (clicked)="openCreateDialog()">\r\n    </app-button>\r\n  </div>\r\n\r\n  <app-datatable-wrapper\r\n    variant="settings"\r\n    [config]="table_config()"\r\n    [rowTemplate]="tableTemplate"\r\n    (pageChange)="onPageChange($event)"\r\n    (rowClick)="openEditDialog($event.data)">\r\n  </app-datatable-wrapper>\r\n</div>\r\n\r\n<ng-template #tableTemplate let-item="$implicit">\r\n  <td>\r\n    <p class="settings-cell-primary truncate">{{ item.razon_social }}</p>\r\n  </td>\r\n  <td>\r\n    <span class="settings-cell-mono">{{ item.rfc }}</span>\r\n  </td>\r\n  <td>\r\n    <span class="settings-cell-text">{{ item.persona_type }}</span>\r\n  </td>\r\n  <td>\r\n    <span class="settings-badge" [ngClass]="getStatusClass(item.status)">\r\n      {{ getStatusLabel(item.status) }}\r\n    </span>\r\n  </td>\r\n</ng-template>\r\n', styles: ["/* src/app/features/settings/components/fiscal-configuration-list/fiscal-configuration-list.component.scss */\n.settings-cell-primary {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n.fiscal-list-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  padding: 1.5rem;\n  background-color: #f9fafb;\n  min-height: 100vh;\n}\n.fiscal-list-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.fiscal-list-header h1 {\n  margin: 0;\n}\n.fiscal-list-header p {\n  margin: 0;\n}\n.fiscal-list-table {\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n.fiscal-list-table table {\n  border-collapse: collapse;\n}\n.fiscal-list-table table thead {\n  background-color: #f3f4f6;\n}\n.fiscal-list-table table th {\n  text-align: left;\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  font-size: 0.75rem;\n  color: #374151;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.fiscal-list-table table td {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.fiscal-list-table table tbody tr {\n  transition: background-color 0.2s;\n}\n.fiscal-list-table table tbody tr:hover {\n  background-color: #f9fafb;\n}\n.fiscal-list-table table tbody tr:last-child td {\n  border-bottom: none;\n}\n.fiscal-list-pagination {\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n  padding: 1rem 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n/*# sourceMappingURL=fiscal-configuration-list.component.css.map */\n"] }]
  }], () => [{ type: FiscalConfigurationService }, { type: MatDialog }, { type: MatSnackBar }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FiscalConfigurationListComponent, { className: "FiscalConfigurationListComponent", filePath: "src/app/features/settings/components/fiscal-configuration-list/fiscal-configuration-list.component.ts", lineNumber: 21 });
})();

// src/app/features/settings/components/uoms-dialog/uoms-dialog.component.ts
function UomsDialogComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "button", 12);
    \u0275\u0275listener("click", function UomsDialogComponent_div_8_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startCreating());
    });
    \u0275\u0275text(2, " + Crear Nueva ");
    \u0275\u0275elementEnd()();
  }
}
function UomsDialogComponent_form_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 13)(1, "div")(2, "label", 14);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "label", 14);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "textarea", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 17)(10, "button", 18);
    \u0275\u0275listener("click", function UomsDialogComponent_form_9_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelCreating());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 19);
    \u0275\u0275listener("click", function UomsDialogComponent_form_9_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveUOM());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(12);
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : "Guardar", " ");
  }
}
function UomsDialogComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "p");
    \u0275\u0275text(2, "No hay unidades de medida en el cat\xE1logo");
    \u0275\u0275elementEnd()();
  }
}
function UomsDialogComponent_div_10_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "div", 28)(2, "p", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 31);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 32)(10, "button", 33);
    \u0275\u0275listener("click", function UomsDialogComponent_div_10_div_2_div_1_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const uom_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startEditing(uom_r5));
    });
    \u0275\u0275element(11, "i", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 35);
    \u0275\u0275listener("click", function UomsDialogComponent_div_10_div_2_div_1_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r4);
      const uom_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteUOM(uom_r5));
    });
    \u0275\u0275element(13, "i", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const uom_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(uom_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(uom_r5.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 4, uom_r5.created_at, "MMMM d"));
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function UomsDialogComponent_div_10_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div")(2, "label", 14);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 38);
    \u0275\u0275twoWayListener("ngModelChange", function UomsDialogComponent_div_10_div_2_div_2_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const uom_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingUomForm[uom_r5.id].name, $event) || (ctx_r1.editingUomForm[uom_r5.id].name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "label", 14);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 39);
    \u0275\u0275twoWayListener("ngModelChange", function UomsDialogComponent_div_10_div_2_div_2_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const uom_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingUomForm[uom_r5.id].description, $event) || (ctx_r1.editingUomForm[uom_r5.id].description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 17)(10, "button", 40);
    \u0275\u0275listener("click", function UomsDialogComponent_div_10_div_2_div_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEditing());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 41);
    \u0275\u0275listener("click", function UomsDialogComponent_div_10_div_2_div_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const uom_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveEdit(uom_r5));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const uom_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingUomForm[uom_r5.id].name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingUomForm[uom_r5.id].description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : "Guardar", " ");
  }
}
function UomsDialogComponent_div_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, UomsDialogComponent_div_10_div_2_div_1_Template, 14, 7, "div", 25)(2, UomsDialogComponent_div_10_div_2_div_2_Template, 14, 4, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingUomId() !== uom_r5.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingUomId() === uom_r5.id);
  }
}
function UomsDialogComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275template(1, UomsDialogComponent_div_10_div_1_Template, 3, 0, "div", 21)(2, UomsDialogComponent_div_10_div_2_Template, 3, 2, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.uoms().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.uoms());
  }
}
var UomsDialogComponent = class _UomsDialogComponent {
  fb;
  productService;
  snackBar;
  dialogRef;
  form;
  uoms = signal([], ...ngDevMode ? [{ debugName: "uoms" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  isCreating = signal(false, ...ngDevMode ? [{ debugName: "isCreating" }] : []);
  editingUomId = signal(null, ...ngDevMode ? [{ debugName: "editingUomId" }] : []);
  editingUomForm = {};
  constructor(fb, productService, snackBar, dialogRef) {
    this.fb = fb;
    this.productService = productService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.form = this.fb.group({
      name: ["", Validators.required],
      description: [""]
    });
  }
  ngOnInit() {
    this.loadUOMCatalog();
  }
  loadUOMCatalog() {
    this.productService.getUOMCatalog().subscribe({
      next: (data) => {
        this.uoms.set(data);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar cat\xE1logo de UoMs", type: "error" },
          duration: 3e3
        });
      }
    });
  }
  startCreating() {
    this.isCreating.set(true);
    this.form.reset();
  }
  cancelCreating() {
    this.isCreating.set(false);
    this.form.reset();
  }
  saveUOM() {
    if (!this.form.valid)
      return;
    this.saving.set(true);
    const uomData = {
      name: this.form.get("name")?.value,
      description: this.form.get("description")?.value || ""
    };
    this.productService.createUOMCatalogItem(uomData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Unidad de medida creada exitosamente", type: "success" },
          duration: 3e3
        });
        this.isCreating.set(false);
        this.form.reset();
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al crear unidad de medida", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  startEditing(uom) {
    this.editingUomId.set(uom.id);
    this.editingUomForm[uom.id] = { name: uom.name, description: uom.description };
  }
  cancelEditing() {
    this.editingUomId.set(null);
    this.editingUomForm = {};
  }
  saveEdit(uom) {
    if (!this.editingUomForm[uom.id]?.name)
      return;
    this.saving.set(true);
    const updateData = {
      name: this.editingUomForm[uom.id].name,
      description: this.editingUomForm[uom.id].description || ""
    };
    this.productService.updateUOMCatalogItem(uom.id, updateData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Unidad de medida actualizada exitosamente", type: "success" },
          duration: 3e3
        });
        this.editingUomId.set(null);
        this.editingUomForm = {};
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al actualizar unidad de medida", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  deleteUOM(uom) {
    if (!confirm("\xBFEst\xE1s seguro de que deseas eliminar esta unidad de medida?"))
      return;
    this.saving.set(true);
    this.productService.deleteUOMCatalogItem(uom.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Unidad de medida eliminada exitosamente", type: "success" },
          duration: 3e3
        });
        this.loadUOMCatalog();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al eliminar unidad de medida", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function UomsDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UomsDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UomsDialogComponent, selectors: [["app-uoms-dialog"]], decls: 14, vars: 3, consts: [[1, "dialog"], [1, "dialog__header"], [1, "close", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "dialog__body"], ["class", "header-actions", 4, "ngIf"], ["class", "create-form", 3, "formGroup", 4, "ngIf"], ["class", "uoms-list", 4, "ngIf"], [1, "dialog__footer"], [1, "btn", "btn--secondary", 3, "click"], [1, "header-actions"], [1, "create-btn", 3, "click"], [1, "create-form", 3, "formGroup"], [1, "form-label"], ["type", "text", "formControlName", "name", "placeholder", "ej: Pieza, Caja, Pallet", 1, "form-input"], ["formControlName", "description", "rows", "2", "placeholder", "Descripci\xF3n opcional", 1, "form-input"], [1, "form-actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "uoms-list"], ["class", "empty-state", 4, "ngIf"], ["class", "uom-card", 4, "ngFor", "ngForOf"], [1, "empty-state"], [1, "uom-card"], ["class", "uom-view", 4, "ngIf"], ["class", "uom-edit", 4, "ngIf"], [1, "uom-view"], [1, "uom-info"], [1, "uom-name"], [1, "uom-description"], [1, "uom-date"], [1, "uom-actions"], ["title", "Editar", 1, "icon-btn", 3, "click"], [1, "fi", "fi-rr-pencil"], ["title", "Eliminar", 1, "icon-btn", "icon-btn--danger", 3, "click", "disabled"], [1, "fi", "fi-rr-trash"], [1, "uom-edit"], ["type", "text", 1, "form-input", "form-input--sm", 3, "ngModelChange", "ngModel"], ["rows", "2", 1, "form-input", "form-input--sm", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn--sm", "btn--secondary", 3, "click"], [1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"]], template: function UomsDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Gestionar Unidades de Medida");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function UomsDialogComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 3);
      \u0275\u0275element(6, "path", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275template(8, UomsDialogComponent_div_8_Template, 3, 0, "div", 6)(9, UomsDialogComponent_form_9_Template, 14, 3, "form", 7)(10, UomsDialogComponent_div_10_Template, 3, 2, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 9)(12, "button", 10);
      \u0275\u0275listener("click", function UomsDialogComponent_Template_button_click_12_listener() {
        return ctx.close();
      });
      \u0275\u0275text(13, " Cerrar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", !ctx.isCreating());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isCreating());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreating());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormsModule, NgModel, DatePipe], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 600px;\n  height: 600px;\n  display: flex;\n  flex-direction: column;\n}\n.dialog__header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n  background: none;\n  border: none;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.dialog__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px;\n  min-height: 0;\n}\n.dialog__footer[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 16px;\n}\n.create-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.create-btn[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.create-form[_ngcontent-%COMP%] {\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n  margin-bottom: 16px;\n}\n.create-form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.create-form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 0;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 6px;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  outline: none;\n  transition: border-color 0.2s;\n  font-family: inherit;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-input--sm[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  font-size: 12px;\n}\ntextarea.form-input[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 60px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-family: inherit;\n  flex: 1;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n}\n.btn--secondary[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #374151;\n}\n.btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5e7eb;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.uom-card[_ngcontent-%COMP%] {\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.15s;\n}\n.uom-card[_ngcontent-%COMP%]:hover {\n  border-color: #d1d5db;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.uom-card[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.uom-view[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n.uom-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.uom-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0 0 4px 0;\n}\n.uom-description[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin: 0 0 4px 0;\n}\n.uom-date[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n  margin: 0;\n}\n.uom-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  background: transparent;\n  color: #6b7280;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.icon-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n.icon-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #374151;\n}\n.icon-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.icon-btn--danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.uom-edit[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.uom-edit[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #9ca3af;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n/*# sourceMappingURL=uoms-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UomsDialogComponent, [{
    type: Component,
    args: [{ selector: "app-uoms-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule], template: `<div class="dialog">\r
  <div class="dialog__header">\r
    <h2>Gestionar Unidades de Medida</h2>\r
    <button (click)="close()" class="close">\r
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <div class="dialog__body">\r
    <!-- Create Button -->\r
    <div *ngIf="!isCreating()" class="header-actions">\r
      <button (click)="startCreating()" class="create-btn">\r
        + Crear Nueva\r
      </button>\r
    </div>\r
\r
    <!-- Create Form -->\r
    <form *ngIf="isCreating()" [formGroup]="form" class="create-form">\r
      <div>\r
        <label class="form-label">Nombre</label>\r
        <input type="text" formControlName="name" class="form-input" placeholder="ej: Pieza, Caja, Pallet" />\r
      </div>\r
      <div>\r
        <label class="form-label">Descripci\xF3n</label>\r
        <textarea formControlName="description" class="form-input" rows="2" placeholder="Descripci\xF3n opcional"></textarea>\r
      </div>\r
      <div class="form-actions">\r
        <button (click)="cancelCreating()" type="button" class="btn btn--secondary">\r
          Cancelar\r
        </button>\r
        <button (click)="saveUOM()" [disabled]="form.invalid || saving()" class="btn btn--primary">\r
          {{ saving() ? 'Guardando...' : 'Guardar' }}\r
        </button>\r
      </div>\r
    </form>\r
\r
    <!-- UOMs List -->\r
    <div *ngIf="!isCreating()" class="uoms-list">\r
      <div *ngIf="uoms().length === 0" class="empty-state">\r
        <p>No hay unidades de medida en el cat\xE1logo</p>\r
      </div>\r
\r
      <div *ngFor="let uom of uoms()" class="uom-card">\r
        <!-- View Mode -->\r
        <div *ngIf="editingUomId() !== uom.id" class="uom-view">\r
          <div class="uom-info">\r
            <p class="uom-name">{{ uom.name }}</p>\r
            <p class="uom-description">{{ uom.description }}</p>\r
            <p class="uom-date">{{ uom.created_at | date: 'MMMM d' }}</p>\r
          </div>\r
          <div class="uom-actions">\r
            <button (click)="startEditing(uom)" class="icon-btn" title="Editar">\r
              <i class="fi fi-rr-pencil"></i>\r
            </button>\r
            <button (click)="deleteUOM(uom)" [disabled]="saving()" class="icon-btn icon-btn--danger" title="Eliminar">\r
              <i class="fi fi-rr-trash"></i>\r
            </button>\r
          </div>\r
        </div>\r
\r
        <!-- Edit Mode -->\r
        <div *ngIf="editingUomId() === uom.id" class="uom-edit">\r
          <div>\r
            <label class="form-label">Nombre</label>\r
            <input type="text" [(ngModel)]="editingUomForm[uom.id].name" class="form-input form-input--sm" />\r
          </div>\r
          <div>\r
            <label class="form-label">Descripci\xF3n</label>\r
            <textarea [(ngModel)]="editingUomForm[uom.id].description" class="form-input form-input--sm" rows="2"></textarea>\r
          </div>\r
          <div class="form-actions">\r
            <button (click)="cancelEditing()" type="button" class="btn btn--sm btn--secondary">\r
              Cancelar\r
            </button>\r
            <button (click)="saveEdit(uom)" [disabled]="saving()" class="btn btn--sm btn--primary">\r
              {{ saving() ? 'Guardando...' : 'Guardar' }}\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="dialog__footer">\r
    <button (click)="close()" class="btn btn--secondary">\r
      Cerrar\r
    </button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/uoms-dialog/uoms-dialog.component.scss */\n.dialog {\n  width: 600px;\n  height: 600px;\n  display: flex;\n  flex-direction: column;\n}\n.dialog__header {\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog__header h2 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header .close {\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n  background: none;\n  border: none;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n}\n.dialog__header .close:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.dialog__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px;\n  min-height: 0;\n}\n.dialog__footer {\n  padding: 12px 20px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.header-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 16px;\n}\n.create-btn {\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.create-btn:hover {\n  background: #4338ca;\n}\n.create-form {\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n  margin-bottom: 16px;\n}\n.create-form > div {\n  margin-bottom: 12px;\n}\n.create-form > div:last-of-type {\n  margin-bottom: 0;\n}\n.form-label {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 6px;\n}\n.form-input {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  outline: none;\n  transition: border-color 0.2s;\n  font-family: inherit;\n}\n.form-input:focus {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-input--sm {\n  padding: 6px 10px;\n  font-size: 12px;\n}\ntextarea.form-input {\n  resize: vertical;\n  min-height: 60px;\n}\n.form-actions {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-family: inherit;\n  flex: 1;\n}\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--primary {\n  background: #4f46e5;\n  color: white;\n}\n.btn--primary:hover:not(:disabled) {\n  background: #4338ca;\n}\n.btn--secondary {\n  background: #f3f4f6;\n  color: #374151;\n}\n.btn--secondary:hover:not(:disabled) {\n  background: #e5e7eb;\n}\n.btn--sm {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.uom-card {\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.15s;\n}\n.uom-card:hover {\n  border-color: #d1d5db;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.uom-card:last-child {\n  margin-bottom: 0;\n}\n.uom-view {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n.uom-info {\n  flex: 1;\n  min-width: 0;\n}\n.uom-name {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0 0 4px 0;\n}\n.uom-description {\n  font-size: 12px;\n  color: #6b7280;\n  margin: 0 0 4px 0;\n}\n.uom-date {\n  font-size: 11px;\n  color: #9ca3af;\n  margin: 0;\n}\n.uom-actions {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.icon-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  background: transparent;\n  color: #6b7280;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.icon-btn i {\n  line-height: 1;\n}\n.icon-btn:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #374151;\n}\n.icon-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.icon-btn--danger:hover:not(:disabled) {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.uom-edit > div {\n  margin-bottom: 10px;\n}\n.uom-edit > div:last-of-type {\n  margin-bottom: 0;\n}\n.empty-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #9ca3af;\n}\n.empty-state p {\n  font-size: 14px;\n  margin: 0;\n}\n/*# sourceMappingURL=uoms-dialog.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ProductService }, { type: MatSnackBar }, { type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UomsDialogComponent, { className: "UomsDialogComponent", filePath: "src/app/features/settings/components/uoms-dialog/uoms-dialog.component.ts", lineNumber: 16 });
})();

// src/app/features/settings/components/price-lists-dialog/price-lists-dialog.ts
function PriceListsDialogComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "div", 12);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando listas...");
    \u0275\u0275elementEnd()();
  }
}
function PriceListsDialogComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "p");
    \u0275\u0275text(2, "No hay listas de precios");
    \u0275\u0275elementEnd()();
  }
}
function PriceListsDialogComponent_table_13_tr_10_input_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function PriceListsDialogComponent_table_13_tr_10_input_2_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const list_r2 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(list_r2.name, $event) || (list_r2.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const list_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275twoWayProperty("ngModel", list_r2.name);
  }
}
function PriceListsDialogComponent_table_13_tr_10_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const list_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(list_r2.name);
  }
}
function PriceListsDialogComponent_table_13_tr_10_input_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function PriceListsDialogComponent_table_13_tr_10_input_5_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const list_r2 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(list_r2.description, $event) || (list_r2.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const list_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275twoWayProperty("ngModel", list_r2.description);
  }
}
function PriceListsDialogComponent_table_13_tr_10_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const list_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(list_r2.description || "\u2014");
  }
}
function PriceListsDialogComponent_table_13_tr_10_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function PriceListsDialogComponent_table_13_tr_10_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const i_r5 = \u0275\u0275nextContext().index;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.edit(i_r5));
    });
    \u0275\u0275element(1, "i", 27);
    \u0275\u0275elementEnd();
  }
}
function PriceListsDialogComponent_table_13_tr_10_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function PriceListsDialogComponent_table_13_tr_10_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const i_r5 = \u0275\u0275nextContext().index;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.save(i_r5));
    });
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275elementEnd();
  }
}
function PriceListsDialogComponent_table_13_tr_10_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function PriceListsDialogComponent_table_13_tr_10_button_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const i_r5 = \u0275\u0275nextContext().index;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.cancel(i_r5));
    });
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275elementEnd();
  }
}
function PriceListsDialogComponent_table_13_tr_10_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function PriceListsDialogComponent_table_13_tr_10_button_12_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const i_r5 = \u0275\u0275nextContext().index;
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5.delete(i_r5));
    });
    \u0275\u0275element(1, "i", 33);
    \u0275\u0275elementEnd();
  }
}
function PriceListsDialogComponent_table_13_tr_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275template(2, PriceListsDialogComponent_table_13_tr_10_input_2_Template, 1, 1, "input", 16)(3, PriceListsDialogComponent_table_13_tr_10_span_3_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275template(5, PriceListsDialogComponent_table_13_tr_10_input_5_Template, 1, 1, "input", 18)(6, PriceListsDialogComponent_table_13_tr_10_span_6_Template, 2, 1, "span", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "div", 19);
    \u0275\u0275template(9, PriceListsDialogComponent_table_13_tr_10_button_9_Template, 2, 0, "button", 20)(10, PriceListsDialogComponent_table_13_tr_10_button_10_Template, 2, 0, "button", 21)(11, PriceListsDialogComponent_table_13_tr_10_button_11_Template, 2, 0, "button", 22)(12, PriceListsDialogComponent_table_13_tr_10_button_12_Template, 2, 0, "button", 23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const list_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", list_r2.editing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !list_r2.editing);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", list_r2.editing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !list_r2.editing);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !list_r2.editing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", list_r2.editing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", list_r2.editing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !list_r2.editing);
  }
}
function PriceListsDialogComponent_table_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 14)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "NOMBRE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "DESCRIPCI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "tbody");
    \u0275\u0275template(10, PriceListsDialogComponent_table_13_tr_10_Template, 13, 8, "tr", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx_r5.priceLists);
  }
}
var PriceListsDialogComponent = class _PriceListsDialogComponent {
  productService;
  dialogRef;
  toast;
  cdr;
  priceLists = [];
  loading = false;
  originalData = {};
  constructor(productService, dialogRef, toast, cdr) {
    this.productService = productService;
    this.dialogRef = dialogRef;
    this.toast = toast;
    this.cdr = cdr;
  }
  ngOnInit() {
    this.loadPriceLists();
  }
  loadPriceLists() {
    this.loading = true;
    this.cdr.detectChanges();
    this.productService.getPriceLists().subscribe({
      next: (lists) => {
        this.priceLists = lists.map((list) => __spreadProps(__spreadValues({}, list), {
          editing: false
        }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading price lists:", error);
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification("Error al cargar las listas de precios", "error");
      }
    });
  }
  addNew() {
    const newList = {
      id: "",
      name: "",
      description: "",
      editing: true,
      isNew: true
    };
    this.priceLists.unshift(newList);
    this.originalData[0] = __spreadValues({}, newList);
  }
  edit(index) {
    this.originalData[index] = __spreadValues({}, this.priceLists[index]);
    this.priceLists[index].editing = true;
  }
  cancel(index) {
    if (this.priceLists[index].isNew) {
      this.priceLists.splice(index, 1);
    } else {
      this.priceLists[index] = __spreadProps(__spreadValues({}, this.originalData[index]), { editing: false });
    }
    delete this.originalData[index];
  }
  save(index) {
    const list = this.priceLists[index];
    if (!list.name || !list.name.trim()) {
      this.showNotification("El nombre es requerido", "error");
      return;
    }
    const data = {
      name: list.name.trim(),
      description: list.description?.trim() || ""
    };
    if (list.isNew) {
      this.productService.createPriceList(data).subscribe({
        next: (newList) => {
          this.showNotification("Lista creada correctamente", "success");
          this.loadPriceLists();
        },
        error: (error) => {
          console.error("Error creating price list:", error);
          const errorMessage = error.error?.message || "Error al crear la lista";
          this.showNotification(errorMessage, "error");
        }
      });
    } else {
      this.productService.updatePriceList(list.id, data).subscribe({
        next: (updatedList) => {
          this.showNotification("Lista actualizada correctamente", "success");
          this.loadPriceLists();
        },
        error: (error) => {
          console.error("Error updating price list:", error);
          const errorMessage = error.error?.message || "Error al actualizar la lista";
          this.showNotification(errorMessage, "error");
        }
      });
    }
  }
  delete(index) {
    const list = this.priceLists[index];
    if (!confirm(`\xBFEst\xE1s seguro de eliminar la lista "${list.name}"?`)) {
      return;
    }
    this.productService.deletePriceList(list.id).subscribe({
      next: () => {
        this.showNotification("Lista eliminada correctamente", "success");
        this.loadPriceLists();
      },
      error: (error) => {
        console.error("Error deleting price list:", error);
        const errorMessage = error.error?.message || "Error al eliminar la lista";
        this.showNotification(errorMessage, "error");
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  showNotification(message, type = "success") {
    const toastType = type === "info" ? "info" : type;
    this.toast.show(message, toastType);
  }
  static \u0275fac = function PriceListsDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PriceListsDialogComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(ToastService), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PriceListsDialogComponent, selectors: [["app-price-lists-dialog"]], decls: 14, vars: 3, consts: [[1, "dialog-container"], [1, "dialog-header"], ["type", "button", 1, "close-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "currentColor"], ["d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"], [1, "dialog-content"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn--sm", "btn--primary", 3, "click"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "data-table", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "empty-state"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["type", "text", "class", "form-input form-input--inline", "placeholder", "Nombre", 3, "ngModel", "ngModelChange", 4, "ngIf"], [4, "ngIf"], ["type", "text", "class", "form-input form-input--inline", "placeholder", "Descripci\xF3n", 3, "ngModel", "ngModelChange", 4, "ngIf"], [1, "row-actions"], ["class", "btn-icon", "type", "button", "title", "Editar", 3, "click", 4, "ngIf"], ["class", "btn-icon btn-icon--success", "type", "button", "title", "Guardar", 3, "click", 4, "ngIf"], ["class", "btn-icon", "type", "button", "title", "Cancelar", 3, "click", 4, "ngIf"], ["class", "btn-icon btn-icon--danger", "type", "button", "title", "Eliminar", 3, "click", 4, "ngIf"], ["type", "text", "placeholder", "Nombre", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Descripci\xF3n", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel"], ["type", "button", "title", "Editar", 1, "btn-icon", 3, "click"], [1, "fi", "fi-rr-pencil"], ["type", "button", "title", "Guardar", 1, "btn-icon", "btn-icon--success", 3, "click"], [1, "fi", "fi-rr-check"], ["type", "button", "title", "Cancelar", 1, "btn-icon", 3, "click"], [1, "fi", "fi-rr-cross"], ["type", "button", "title", "Eliminar", 1, "btn-icon", "btn-icon--danger", 3, "click"], [1, "fi", "fi-rr-trash"]], template: function PriceListsDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Gestionar Listas de Precios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function PriceListsDialogComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 3);
      \u0275\u0275element(6, "path", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "button", 7);
      \u0275\u0275listener("click", function PriceListsDialogComponent_Template_button_click_9_listener() {
        return ctx.addNew();
      });
      \u0275\u0275text(10, "+ Crear Nueva");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(11, PriceListsDialogComponent_div_11_Template, 4, 0, "div", 8)(12, PriceListsDialogComponent_div_12_Template, 3, 0, "div", 9)(13, PriceListsDialogComponent_table_13_Template, 11, 1, "table", 10);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.priceLists.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.priceLists.length > 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.dialog-container[_ngcontent-%COMP%] {\n  width: 600px;\n  max-height: 600px;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 12px;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: all 0.15s;\n}\n.close-btn[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 10px;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 10px;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 6px 12px;\n  border: none;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-family: inherit;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  background: #2563eb;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f9fafb;\n}\n.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 10px;\n  text-align: left;\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  border-bottom: 1px solid #e5e7eb;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f3f4f6;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: #f9fafb;\n}\n.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  color: #374151;\n}\n.form-input[_ngcontent-%COMP%] {\n  padding: 6px 8px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 12px;\n  outline: none;\n  transition: border-color 0.2s;\n  font-family: inherit;\n  width: 100%;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-input--inline[_ngcontent-%COMP%] {\n  padding: 6px 8px;\n  font-size: 12px;\n}\n.row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  background: transparent;\n  color: #6b7280;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.btn-icon--danger[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.btn-icon--success[_ngcontent-%COMP%]:hover {\n  background: #d1fae5;\n  color: #059669;\n}\n.loading-state[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #9ca3af;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-size: 14px;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=price-lists-dialog.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PriceListsDialogComponent, [{
    type: Component,
    args: [{ selector: "app-price-lists-dialog", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="dialog-container">\r
  <div class="dialog-header">\r
    <h2>Gestionar Listas de Precios</h2>\r
    <button class="close-btn" (click)="close()" type="button">\r
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\r
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <div class="dialog-content">\r
    <div class="dialog-actions">\r
      <button class="btn btn--sm btn--primary" (click)="addNew()" type="button">+ Crear Nueva</button>\r
    </div>\r
\r
    <div *ngIf="loading" class="loading-state">\r
      <div class="spinner"></div>\r
      <p>Cargando listas...</p>\r
    </div>\r
\r
    <div *ngIf="!loading && priceLists.length === 0" class="empty-state">\r
      <p>No hay listas de precios</p>\r
    </div>\r
\r
    <table *ngIf="!loading && priceLists.length > 0" class="data-table">\r
      <thead>\r
        <tr>\r
          <th>NOMBRE</th>\r
          <th>DESCRIPCI\xD3N</th>\r
          <th>ACCIONES</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        <tr *ngFor="let list of priceLists; let i = index">\r
          <td>\r
            <input \r
              *ngIf="list.editing" \r
              type="text" \r
              class="form-input form-input--inline" \r
              [(ngModel)]="list.name"\r
              placeholder="Nombre">\r
            <span *ngIf="!list.editing">{{ list.name }}</span>\r
          </td>\r
          <td>\r
            <input \r
              *ngIf="list.editing" \r
              type="text" \r
              class="form-input form-input--inline" \r
              [(ngModel)]="list.description"\r
              placeholder="Descripci\xF3n">\r
            <span *ngIf="!list.editing">{{ list.description || '\u2014' }}</span>\r
          </td>\r
          <td>\r
            <div class="row-actions">\r
              <button \r
                *ngIf="!list.editing" \r
                class="btn-icon" \r
                (click)="edit(i)" \r
                type="button" \r
                title="Editar">\r
                <i class="fi fi-rr-pencil"></i>\r
              </button>\r
              <button \r
                *ngIf="list.editing" \r
                class="btn-icon btn-icon--success" \r
                (click)="save(i)" \r
                type="button" \r
                title="Guardar">\r
                <i class="fi fi-rr-check"></i>\r
              </button>\r
              <button \r
                *ngIf="list.editing" \r
                class="btn-icon" \r
                (click)="cancel(i)" \r
                type="button" \r
                title="Cancelar">\r
                <i class="fi fi-rr-cross"></i>\r
              </button>\r
              <button \r
                *ngIf="!list.editing" \r
                class="btn-icon btn-icon--danger" \r
                (click)="delete(i)" \r
                type="button" \r
                title="Eliminar">\r
                <i class="fi fi-rr-trash"></i>\r
              </button>\r
            </div>\r
          </td>\r
        </tr>\r
      </tbody>\r
    </table>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/price-lists-dialog/price-lists-dialog.scss */\n.dialog-container {\n  width: 600px;\n  max-height: 600px;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 12px;\n}\n.dialog-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-header h2 {\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  cursor: pointer;\n  border-radius: 6px;\n  transition: all 0.15s;\n}\n.close-btn:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.dialog-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 10px;\n}\n.dialog-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 10px;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 6px 12px;\n  border: none;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-family: inherit;\n}\n.btn--sm {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.btn--primary {\n  background: #3b82f6;\n  color: white;\n}\n.btn--primary:hover {\n  background: #2563eb;\n}\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.data-table thead {\n  background: #f9fafb;\n}\n.data-table thead th {\n  padding: 10px;\n  text-align: left;\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  border-bottom: 1px solid #e5e7eb;\n}\n.data-table tbody tr {\n  border-bottom: 1px solid #f3f4f6;\n}\n.data-table tbody tr:last-child {\n  border-bottom: none;\n}\n.data-table tbody tr:hover {\n  background: #f9fafb;\n}\n.data-table tbody td {\n  padding: 8px 10px;\n  color: #374151;\n}\n.form-input {\n  padding: 6px 8px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 12px;\n  outline: none;\n  transition: border-color 0.2s;\n  font-family: inherit;\n  width: 100%;\n}\n.form-input:focus {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.form-input--inline {\n  padding: 6px 8px;\n  font-size: 12px;\n}\n.row-actions {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n.btn-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  background: transparent;\n  color: #6b7280;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.btn-icon:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.btn-icon--danger:hover {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.btn-icon--success:hover {\n  background: #d1fae5;\n  color: #059669;\n}\n.loading-state,\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #9ca3af;\n}\n.loading-state p,\n.empty-state p {\n  margin-top: 12px;\n  font-size: 14px;\n}\n.spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e5e7eb;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=price-lists-dialog.css.map */\n"] }]
  }], () => [{ type: ProductService }, { type: MatDialogRef }, { type: ToastService }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PriceListsDialogComponent, { className: "PriceListsDialogComponent", filePath: "src/app/features/settings/components/price-lists-dialog/price-lists-dialog.ts", lineNumber: 17 });
})();

// src/app/features/settings/components/product-list/product-list.component.ts
var _c04 = ["tableTemplate"];
function ProductListComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "p", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "span", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.sku);
    \u0275\u0275advance(2);
    \u0275\u0275classMap((item_r2.category == null ? null : item_r2.category.name) ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (item_r2.category == null ? null : item_r2.category.name) || "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap((item_r2.subcategory == null ? null : item_r2.subcategory.name) ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (item_r2.subcategory == null ? null : item_r2.subcategory.name) || "\u2014", " ");
  }
}
var ProductListComponent = class _ProductListComponent {
  router;
  route;
  productService;
  dialog;
  snackBar;
  tableTemplate;
  table_config = signal({
    rows: [],
    columns: [
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true, width: 200 },
      { name: "SKU", prop: "sku", sortable: true, canAutoResize: true, width: 120 },
      { name: "Categor\xEDa", prop: "category", sortable: false, canAutoResize: true, width: 130 },
      { name: "Subcategor\xEDa", prop: "subcategory", sortable: false, canAutoResize: true, width: 130 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron productos" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  products = signal([], ...ngDevMode ? [{ debugName: "products" }] : []);
  ArrowRight = ArrowRight;
  search = "";
  currentSort = null;
  destroy$ = new Subject();
  lastQueryParams = "";
  constructor(router, route, productService, dialog, snackBar) {
    this.router = router;
    this.route = route;
    this.productService = productService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;
      this.search = query?.["search"] ?? "";
      const page = query?.["page"] ? Number(query["page"]) : 1;
      const limit = query?.["limit"] ? Number(query["limit"]) : 20;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        page: Number.isNaN(page) ? 1 : page,
        limit: Number.isNaN(limit) ? 20 : limit
      }));
      this.loadProducts();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadProducts() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const config = this.table_config();
    const page = Number.isNaN(config.page) ? 1 : config.page;
    const limit = Number.isNaN(config.limit) ? 20 : config.limit;
    const params = { page, limit };
    const normalizedSearch = this.search?.trim();
    if (normalizedSearch) {
      if (normalizedSearch.toLowerCase().startsWith("ext:")) {
        const externalSku = normalizedSearch.slice(4).trim();
        if (externalSku) {
          params.external_sku = externalSku;
        }
      } else {
        params.search = normalizedSearch;
      }
    }
    this.productService.getProducts(params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: res.data,
          totalResults: res.total,
          hasNext: res.hasNext ?? false,
          loading: false
        }));
      },
      error: (error) => {
        console.error("Error loading products:", error);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar productos", type: "error" },
          duration: 5e3
        });
      }
    });
  }
  onPageChange(event) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page,
        limit: event.limit,
        search: this.search || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onSortChange(event) {
    this.currentSort = event;
    this.sortProducts();
  }
  sortProducts() {
    if (!this.currentSort || !this.currentSort.direction) {
      this.loadProducts();
      return;
    }
    const sortedRows = [...this.table_config().rows];
    const { prop } = this.currentSort.column;
    const { direction } = this.currentSort;
    sortedRows.sort((a, b) => {
      const aValue = a[prop];
      const bValue = b[prop];
      if (aValue === null || aValue === void 0) {
        return 1;
      }
      if (bValue === null || bValue === void 0) {
        return -1;
      }
      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
      rows: sortedRows
    }));
  }
  openCreateProductModal() {
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: "600px",
      maxHeight: "90vh",
      disableClose: false,
      data: { product: null, isNew: true }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }
  viewDetail(event) {
    const product = event.data || event;
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width: "850px",
      maxHeight: "90vh",
      disableClose: false,
      data: { product }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }
  deleteProduct(product, event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: "400px",
      data: {
        title: "Eliminar Producto",
        message: `\xBFEst\xE1s seguro de que deseas eliminar el producto "${product.name}"? Esta acci\xF3n no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: "Producto eliminado correctamente", type: "success" },
              duration: 3e3
            });
            this.loadProducts();
          },
          error: (error) => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: error.error?.message || "Error al eliminar producto", type: "error" },
              duration: 5e3
            });
          }
        });
      }
    });
  }
  openCategoriesDialog() {
    this.dialog.open(CategoriesDialogComponent, {
      width: "600px",
      height: "600px",
      disableClose: false
    });
  }
  openUOMsDialog() {
    this.dialog.open(UomsDialogComponent, {
      width: "600px",
      height: "600px",
      disableClose: false
    });
  }
  openPriceListsDialog() {
    this.dialog.open(PriceListsDialogComponent, {
      width: "600px",
      height: "600px",
      disableClose: false
    });
  }
  static \u0275fac = function ProductListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductListComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductListComponent, selectors: [["app-product-list"]], viewQuery: function ProductListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c04, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 14, vars: 3, consts: [["tableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-col", "gap-3", "sm:flex-row", "sm:items-center", "sm:flex-wrap", "sm:justify-end"], [1, "w-full", "sm:w-64", 3, "searchChange", "param_activate"], [1, "flex", "flex-wrap", "items-center", "gap-2"], ["text", "Categor\xEDas", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Unidades", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Listas de Precios", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Nuevo Producto", "size", "sm", "custom_class", "btn_primary", 3, "clicked"], ["variant", "settings", 3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "settings-cell-primary", "truncate"], [1, "settings-badge", "settings-badge--code"]], template: function ProductListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
      \u0275\u0275text(3, "Productos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "app-search", 5);
      \u0275\u0275listener("searchChange", function ProductListComponent_Template_app_search_searchChange_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "app-button", 7);
      \u0275\u0275listener("clicked", function ProductListComponent_Template_app_button_clicked_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCategoriesDialog());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "app-button", 8);
      \u0275\u0275listener("clicked", function ProductListComponent_Template_app_button_clicked_8_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openUOMsDialog());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "app-button", 9);
      \u0275\u0275listener("clicked", function ProductListComponent_Template_app_button_clicked_9_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openPriceListsDialog());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "app-button", 10);
      \u0275\u0275listener("clicked", function ProductListComponent_Template_app_button_clicked_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateProductModal());
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(11, "app-datatable-wrapper", 11);
      \u0275\u0275listener("pageChange", function ProductListComponent_Template_app_datatable_wrapper_pageChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function ProductListComponent_Template_app_datatable_wrapper_sortChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function ProductListComponent_Template_app_datatable_wrapper_rowClick_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.viewDetail($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(12, ProductListComponent_ng_template_12_Template, 12, 8, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r3 = \u0275\u0275reference(13);
      \u0275\u0275advance(5);
      \u0275\u0275property("param_activate", false);
      \u0275\u0275advance(6);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r3);
    }
  }, dependencies: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
  ], styles: ["\n\n.settings-cell-primary[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national[_ngcontent-%COMP%] {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international[_ngcontent-%COMP%] {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n/*# sourceMappingURL=product-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductListComponent, [{
    type: Component,
    args: [{ selector: "app-product-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent
    ], template: `<div class="settings-list-page px-4 pb-6">
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
    <h2 class="text-2xl font-semibold text-gray-800">Productos</h2>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:justify-end">
      <app-search
        class="w-full sm:w-64"
        [param_activate]="false"
        (searchChange)="onSearchChange($event)">
      </app-search>

      <div class="flex flex-wrap items-center gap-2">
        <app-button
          text="Categor\xEDas"
          size="sm"
          custom_class="btn_secondary"
          (clicked)="openCategoriesDialog()">
        </app-button>

        <app-button
          text="Unidades"
          size="sm"
          custom_class="btn_secondary"
          (clicked)="openUOMsDialog()">
        </app-button>

        <app-button
          text="Listas de Precios"
          size="sm"
          custom_class="btn_secondary"
          (clicked)="openPriceListsDialog()">
        </app-button>

        <app-button
          text="Nuevo Producto"
          size="sm"
          custom_class="btn_primary"
          (clicked)="openCreateProductModal()">
        </app-button>
      </div>
    </div>
  </div>

  <app-datatable-wrapper
    variant="settings"
    [config]="table_config()"
    [rowTemplate]="tableTemplate"
    (pageChange)="onPageChange($event)"
    (sortChange)="onSortChange($event)"
    (rowClick)="viewDetail($event)">
  </app-datatable-wrapper>
</div>

<ng-template #tableTemplate let-item="$implicit">
  <td>
    <p class="settings-cell-primary truncate">{{ item.name }}</p>
  </td>
  <td>
    <span class="settings-badge settings-badge--code">{{ item.sku }}</span>
  </td>
  <td>
    <span [class]="item.category?.name ? 'settings-cell-text' : 'settings-cell-empty'">
      {{ item.category?.name || '\u2014' }}
    </span>
  </td>
  <td>
    <span [class]="item.subcategory?.name ? 'settings-cell-text' : 'settings-cell-empty'">
      {{ item.subcategory?.name || '\u2014' }}
    </span>
  </td>
</ng-template>
`, styles: ["/* src/app/features/settings/components/product-list/product-list.component.scss */\n.settings-cell-primary {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n/*# sourceMappingURL=product-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: ProductService }, { type: MatDialog }, { type: MatSnackBar }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src/app/features/settings/components/product-list/product-list.component.ts", lineNumber: 33 });
})();

// src/app/features/settings/components/pos-equipment-detail-modal/pos-equipment-detail-modal.component.ts
var _forTrack05 = ($index, $item) => $item.id;
function PosEquipmentDetailModalComponent_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, " El c\xF3digo es requerido ");
    \u0275\u0275elementEnd();
  }
}
function PosEquipmentDetailModalComponent_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, " El modelo es requerido ");
    \u0275\u0275elementEnd();
  }
}
function PosEquipmentDetailModalComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    \u0275\u0275property("ngValue", option_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r1.name);
  }
}
function PosEquipmentDetailModalComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, " El tipo es requerido ");
    \u0275\u0275elementEnd();
  }
}
function PosEquipmentDetailModalComponent_For_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const branch_r2 = ctx.$implicit;
    \u0275\u0275property("ngValue", branch_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", branch_r2.display_name || branch_r2.code, " ");
  }
}
function PosEquipmentDetailModalComponent_p_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, " La sucursal es requerida ");
    \u0275\u0275elementEnd();
  }
}
function PosEquipmentDetailModalComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    \u0275\u0275property("ngValue", option_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r3.name);
  }
}
var PosEquipmentDetailModalComponent = class _PosEquipmentDetailModalComponent {
  fb;
  posEquipmentService;
  branchService;
  snackBar;
  dialogRef;
  data;
  form;
  isLoading = false;
  isEditMode = false;
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  statusOptions = [
    { id: 1, name: "Activo" },
    { id: 0, name: "Inactivo" }
  ];
  typeOptions = [
    { id: "VENTAS", name: "VENTAS" },
    { id: "COBRANZA", name: "COBRANZA" }
  ];
  constructor(fb, posEquipmentService, branchService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.posEquipmentService = posEquipmentService;
    this.branchService = branchService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.form = this.fb.group({
      code: ["", [Validators.required, Validators.minLength(2)]],
      type: ["VENTAS", Validators.required],
      sucursal: ["", Validators.required],
      modelo: ["", [Validators.required, Validators.minLength(1)]],
      status: [1, Validators.required]
    });
  }
  ngOnInit() {
    this.isEditMode = !!this.data.configuration;
    this.loadBranches();
  }
  loadBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        if (this.data.configuration) {
          this.populateForm(this.data.configuration);
        }
      },
      error: () => {
        if (this.data.configuration) {
          this.populateForm(this.data.configuration);
        }
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar sucursales", type: "error" },
          duration: 3e3
        });
      }
    });
  }
  populateForm(configuration) {
    const selectedBranchId = configuration.branch?.id ?? configuration.sucursal;
    this.form.patchValue({
      code: configuration.code,
      type: (configuration.type || "VENTAS").toUpperCase(),
      sucursal: selectedBranchId,
      modelo: configuration.modelo,
      status: configuration.status
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message: "Por favor completa todos los campos requeridos",
          type: "error"
        },
        duration: 3e3
      });
      return;
    }
    queueMicrotask(() => {
      this.isLoading = true;
    });
    const v = this.form.value;
    const dto = {
      code: v.code,
      type: String(v.type || "").toUpperCase(),
      sucursal: v.sucursal,
      modelo: v.modelo,
      status: Number(v.status)
    };
    if (this.isEditMode) {
      this.posEquipmentService.updatePosConfiguration(this.data.configuration.id, dto).subscribe({
        next: (configuration) => {
          this.isLoading = false;
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Equipo actualizado correctamente", type: "success" },
            duration: 3e3
          });
          this.dialogRef.close(configuration);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: error.error?.message || "Error al actualizar equipo",
              type: "error"
            },
            duration: 5e3
          });
        }
      });
    } else {
      this.posEquipmentService.createPosConfiguration(dto).subscribe({
        next: (configuration) => {
          this.isLoading = false;
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Equipo creado correctamente", type: "success" },
            duration: 3e3
          });
          this.dialogRef.close(configuration);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: error.error?.message || "Error al crear equipo",
              type: "error"
            },
            duration: 5e3
          });
        }
      });
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function PosEquipmentDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosEquipmentDetailModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PosEquipmentService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosEquipmentDetailModalComponent, selectors: [["app-pos-equipment-detail-modal"]], decls: 49, vars: 9, consts: [[1, "p-4"], [1, "text-lg", "font-semibold", "text-gray-900", "mb-4"], [1, "space-y-4", 3, "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "text-red-500"], ["type", "text", "formControlName", "code", "placeholder", "Ej: Computadora 1", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", "outline-none", "transition"], ["class", "text-red-500 text-xs mt-1", 4, "ngIf"], ["type", "text", "formControlName", "modelo", "placeholder", "Ej: Dell OptiPlex 7090", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", "outline-none", "transition"], ["formControlName", "type", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", "outline-none", "transition"], [3, "ngValue"], ["formControlName", "sucursal", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", "outline-none", "transition"], ["disabled", "", 3, "ngValue"], ["formControlName", "status", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", "outline-none", "transition"], [1, "flex", "gap-2", "justify-end", "pt-3", "border-t", "border-gray-200"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "disabled"], [1, "text-red-500", "text-xs", "mt-1"]], template: function PosEquipmentDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 2)(4, "div")(5, "label", 3);
      \u0275\u0275text(6, " Nombre del Equipo (c\xF3digo) ");
      \u0275\u0275elementStart(7, "span", 4);
      \u0275\u0275text(8, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(9, "input", 5);
      \u0275\u0275template(10, PosEquipmentDetailModalComponent_p_10_Template, 2, 0, "p", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div")(12, "label", 3);
      \u0275\u0275text(13, " Modelo ");
      \u0275\u0275elementStart(14, "span", 4);
      \u0275\u0275text(15, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(16, "input", 7);
      \u0275\u0275template(17, PosEquipmentDetailModalComponent_p_17_Template, 2, 0, "p", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div")(19, "label", 3);
      \u0275\u0275text(20, " Tipo ");
      \u0275\u0275elementStart(21, "span", 4);
      \u0275\u0275text(22, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "select", 8);
      \u0275\u0275repeaterCreate(24, PosEquipmentDetailModalComponent_For_25_Template, 2, 2, "option", 9, _forTrack05);
      \u0275\u0275elementEnd();
      \u0275\u0275template(26, PosEquipmentDetailModalComponent_p_26_Template, 2, 0, "p", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "label", 3);
      \u0275\u0275text(29, " Sucursal ");
      \u0275\u0275elementStart(30, "span", 4);
      \u0275\u0275text(31, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "select", 10)(33, "option", 11);
      \u0275\u0275text(34, "Selecciona una sucursal");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(35, PosEquipmentDetailModalComponent_For_36_Template, 2, 2, "option", 9, _forTrack05);
      \u0275\u0275elementEnd();
      \u0275\u0275template(37, PosEquipmentDetailModalComponent_p_37_Template, 2, 0, "p", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div")(39, "label", 3);
      \u0275\u0275text(40, " Estado ");
      \u0275\u0275elementStart(41, "span", 4);
      \u0275\u0275text(42, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "select", 12);
      \u0275\u0275repeaterCreate(44, PosEquipmentDetailModalComponent_For_45_Template, 2, 2, "option", 9, _forTrack05);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 13)(47, "app-button", 14);
      \u0275\u0275listener("clicked", function PosEquipmentDetailModalComponent_Template_app_button_clicked_47_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "app-button", 15);
      \u0275\u0275listener("clicked", function PosEquipmentDetailModalComponent_Template_app_button_clicked_48_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_5_0;
      let tmp_8_0;
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Editar Equipo" : "Nuevo Equipo", " ");
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.form.get("code")) == null ? null : tmp_2_0.hasError("required")) && ((tmp_2_0 = ctx.form.get("code")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("modelo")) == null ? null : tmp_3_0.hasError("required")) && ((tmp_3_0 = ctx.form.get("modelo")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.typeOptions);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.form.get("type")) == null ? null : tmp_5_0.hasError("required")) && ((tmp_5_0 = ctx.form.get("type")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.branches());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("sucursal")) == null ? null : tmp_8_0.hasError("required")) && ((tmp_8_0 = ctx.form.get("sucursal")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.statusOptions);
      \u0275\u0275advance(4);
      \u0275\u0275property("text", ctx.isEditMode ? "Actualizar" : "Crear")("disabled", ctx.form.invalid || ctx.isLoading);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    ButtonComponent,
    LucideAngularModule
  ], styles: ["\n\n/*# sourceMappingURL=pos-equipment-detail-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosEquipmentDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-pos-equipment-detail-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      ButtonComponent,
      LucideAngularModule
    ], template: `<div class="p-4">
  <h2 class="text-lg font-semibold text-gray-900 mb-4">
    {{ isEditMode ? 'Editar Equipo' : 'Nuevo Equipo' }}
  </h2>

  <form [formGroup]="form" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Nombre del Equipo (c\xF3digo)
        <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        formControlName="code"
        placeholder="Ej: Computadora 1"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
      />
      <p *ngIf="form.get('code')?.hasError('required') && form.get('code')?.touched" class="text-red-500 text-xs mt-1">
        El c\xF3digo es requerido
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Modelo
        <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        formControlName="modelo"
        placeholder="Ej: Dell OptiPlex 7090"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
      />
      <p *ngIf="form.get('modelo')?.hasError('required') && form.get('modelo')?.touched" class="text-red-500 text-xs mt-1">
        El modelo es requerido
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Tipo
        <span class="text-red-500">*</span>
      </label>
      <select
        formControlName="type"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
      >
        @for (option of typeOptions; track option.id) {
          <option [ngValue]="option.id">{{ option.name }}</option>
        }
      </select>
      <p *ngIf="form.get('type')?.hasError('required') && form.get('type')?.touched" class="text-red-500 text-xs mt-1">
        El tipo es requerido
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Sucursal
        <span class="text-red-500">*</span>
      </label>
      <select
        formControlName="sucursal"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
      >
        <option [ngValue]="null" disabled>Selecciona una sucursal</option>
        @for (branch of branches(); track branch.id) {
          <option [ngValue]="branch.id">
            {{ branch.display_name || branch.code }}
          </option>
        }
      </select>
      <p *ngIf="form.get('sucursal')?.hasError('required') && form.get('sucursal')?.touched" class="text-red-500 text-xs mt-1">
        La sucursal es requerida
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Estado
        <span class="text-red-500">*</span>
      </label>
      <select
        formControlName="status"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
      >
        @for (option of statusOptions; track option.id) {
          <option [ngValue]="option.id">{{ option.name }}</option>
        }
      </select>
    </div>

    <div class="flex gap-2 justify-end pt-3 border-t border-gray-200">
      <app-button
        text="Cancelar"
        custom_class="btn_secondary"
        (clicked)="onCancel()">
      </app-button>
      <app-button
        [text]="isEditMode ? 'Actualizar' : 'Crear'"
        custom_class="btn_primary"
        [disabled]="form.invalid || isLoading"
        (clicked)="onSubmit()">
      </app-button>
    </div>
  </form>
</div>
`, styles: ["/* src/app/features/settings/components/pos-equipment-detail-modal/pos-equipment-detail-modal.component.scss */\n/*# sourceMappingURL=pos-equipment-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: PosEquipmentService }, { type: BranchService }, { type: MatSnackBar }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosEquipmentDetailModalComponent, { className: "PosEquipmentDetailModalComponent", filePath: "src/app/features/settings/components/pos-equipment-detail-modal/pos-equipment-detail-modal.component.ts", lineNumber: 34 });
})();

// src/app/features/settings/components/pos-session-detail-modal/pos-session-detail-modal.component.ts
function PosSessionDetailModalComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "span", 13);
    \u0275\u0275text(2, "Cierre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 14);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 12)(6, "span", 13);
    \u0275\u0275text(7, "Cerrada por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 14);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(ctx_r0.session.closed_at));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.closedByLabel());
  }
}
function PosSessionDetailModalComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span", 19);
    \u0275\u0275text(2, "Contado al cierre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 20);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 18)(6, "span", 19);
    \u0275\u0275text(7, "Diferencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.formatMoney(ctx_r0.closingCash()));
    \u0275\u0275advance();
    \u0275\u0275classProp("pos-session-detail__metric--ok", ctx_r0.cashDifference() === 0)("pos-session-detail__metric--warn", ctx_r0.cashDifference() > 0)("pos-session-detail__metric--err", ctx_r0.cashDifference() < 0);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r0.differenceClass());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatMoney(ctx_r0.cashDifference()), " ");
  }
}
var PosSessionDetailModalComponent = class _PosSessionDetailModalComponent {
  dialogRef;
  data;
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  get session() {
    return this.data.session;
  }
  turnLabel = sessionTurnLabel;
  equipmentLabel = posSessionEquipmentLabel;
  userLabel = posSessionUserLabel;
  formatDate = formatPosDateTime;
  formatMoney = formatPosCurrency;
  isOpen = sessionIsOpen;
  closedByLabel() {
    return posSessionUserLabel({ id: "", user: this.session.closed_by });
  }
  branchLabel() {
    return resolveSessionBranchLabel(this.session, this.data.branches);
  }
  openingCash() {
    return sessionOpeningCash(this.session);
  }
  totalSales() {
    return sessionTotalSales(this.session);
  }
  expectedCash() {
    return sessionExpectedCash(this.session);
  }
  closingCash() {
    return parsePosMoney(this.session.closing_cash);
  }
  cashDifference() {
    const explicit = parsePosMoney(this.session.cash_difference);
    if (explicit !== 0 || this.session.cash_difference != null) {
      return explicit;
    }
    if (!this.session.closed_at) {
      return 0;
    }
    return this.closingCash() - this.expectedCash();
  }
  differenceClass() {
    const diff = this.cashDifference();
    if (diff === 0) {
      return "pos-session-detail__diff--ok";
    }
    return diff > 0 ? "pos-session-detail__diff--surplus" : "pos-session-detail__diff--shortage";
  }
  onClose() {
    this.dialogRef.close();
  }
  static \u0275fac = function PosSessionDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosSessionDetailModalComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosSessionDetailModalComponent, selectors: [["app-pos-session-detail-modal"]], decls: 51, vars: 15, consts: [[1, "pos-session-detail"], [1, "pos-session-detail__header"], [1, "pos-session-detail__header-main"], [1, "pos-session-detail__eyebrow"], [1, "pos-session-detail__title-row"], [1, "pos-session-detail__title"], [1, "pos-session-detail__badge"], [1, "pos-session-detail__subtitle"], ["type", "button", "aria-label", "Cerrar ventana", 1, "pos-session-detail__dismiss", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["stroke-linecap", "round", "d", "M6 6l12 12M18 6L6 18"], [1, "pos-session-detail__cards"], [1, "pos-session-detail__card"], [1, "pos-session-detail__card-label"], [1, "pos-session-detail__card-value"], [1, "pos-session-detail__finance"], [1, "pos-session-detail__finance-title"], [1, "pos-session-detail__metrics"], [1, "pos-session-detail__metric"], [1, "pos-session-detail__metric-label"], [1, "pos-session-detail__metric-value"], [1, "pos-session-detail__metric-value", "pos-session-detail__metric-value--sales"], [1, "pos-session-detail__metric", "pos-session-detail__metric--highlight"], ["type", "button", 1, "pos-session-detail__btn", 3, "click"]], template: function PosSessionDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "p", 3);
      \u0275\u0275text(4, "Sesi\xF3n POS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "h2", 5);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "p", 7);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 8);
      \u0275\u0275listener("click", function PosSessionDetailModalComponent_Template_button_click_12_listener() {
        return ctx.onClose();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(13, "svg", 9);
      \u0275\u0275element(14, "path", 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(15, "mat-dialog-content")(16, "div", 11)(17, "div", 12)(18, "span", 13);
      \u0275\u0275text(19, "Abierta por");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 14);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 12)(23, "span", 13);
      \u0275\u0275text(24, "Apertura");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "span", 14);
      \u0275\u0275text(26);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(27, PosSessionDetailModalComponent_Conditional_27_Template, 10, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "section", 15)(29, "h3", 16);
      \u0275\u0275text(30, "Efectivo y ventas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 17)(32, "div", 18)(33, "span", 19);
      \u0275\u0275text(34, "Apertura");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span", 20);
      \u0275\u0275text(36);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 18)(38, "span", 19);
      \u0275\u0275text(39, "Ventas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span", 21);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "div", 22)(43, "span", 19);
      \u0275\u0275text(44, "Efectivo esperado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "span", 20);
      \u0275\u0275text(46);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(47, PosSessionDetailModalComponent_Conditional_47_Template, 10, 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(48, "mat-dialog-actions")(49, "button", 23);
      \u0275\u0275listener("click", function PosSessionDetailModalComponent_Template_button_click_49_listener() {
        return ctx.onClose();
      });
      \u0275\u0275text(50, "Entendido");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.turnLabel(ctx.session));
      \u0275\u0275advance();
      \u0275\u0275classProp("pos-session-detail__badge--open", ctx.isOpen(ctx.session))("pos-session-detail__badge--closed", !ctx.isOpen(ctx.session));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isOpen(ctx.session) ? "Abierta" : "Cerrada", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", ctx.equipmentLabel(ctx.session), " \xB7 ", ctx.branchLabel(), " ");
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate(ctx.userLabel(ctx.session));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatDate(ctx.session.opened_at));
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isOpen(ctx.session) ? 27 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.formatMoney(ctx.openingCash()));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.formatMoney(ctx.totalSales()), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatMoney(ctx.expectedCash()));
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isOpen(ctx.session) ? 47 : -1);
    }
  }, dependencies: [CommonModule, MatDialogModule, MatDialogActions, MatDialogContent], styles: ["\n\n.pos-session-detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: min(480px, 95vw);\n  max-width: 520px;\n}\n.pos-session-detail__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.35rem 1.1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #eef2ff 0%,\n      #f8fafc 55%,\n      #fff 100%);\n  border-bottom: 1px solid #e2e8f0;\n}\n.pos-session-detail__header-main[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n.pos-session-detail__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 0.25rem;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: #6366f1;\n}\n.pos-session-detail__title-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n.pos-session-detail__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-session-detail__badge[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 700;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n}\n.pos-session-detail__badge--open[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n  box-shadow: inset 0 0 0 1px #bbf7d0;\n}\n.pos-session-detail__badge--closed[_ngcontent-%COMP%] {\n  background: #f1f5f9;\n  color: #475569;\n  box-shadow: inset 0 0 0 1px #e2e8f0;\n}\n.pos-session-detail__subtitle[_ngcontent-%COMP%] {\n  margin: 0.45rem 0 0;\n  font-size: 0.8125rem;\n  color: #64748b;\n  line-height: 1.4;\n}\n.pos-session-detail__dismiss[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.8);\n  color: #64748b;\n  cursor: pointer;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n.pos-session-detail__dismiss[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 1.125rem;\n  height: 1.125rem;\n}\n.pos-session-detail__dismiss[_ngcontent-%COMP%]:hover {\n  background: #fff;\n  color: #334155;\n}\n.pos-session-detail__cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.65rem;\n  margin-bottom: 1.15rem;\n}\n.pos-session-detail__card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  padding: 0.65rem 0.75rem;\n  background: #f8fafc;\n  border: 1px solid #f1f5f9;\n  border-radius: 10px;\n}\n.pos-session-detail__card-label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: #94a3b8;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.pos-session-detail__card-value[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #1e293b;\n  line-height: 1.35;\n}\n.pos-session-detail__finance-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #475569;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.pos-session-detail__metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.65rem;\n}\n.pos-session-detail__metric[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.75rem 0.85rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-session-detail__metric--highlight[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n  background:\n    linear-gradient(\n      135deg,\n      #eff6ff 0%,\n      #f8fafc 100%);\n  border-color: #bfdbfe;\n}\n.pos-session-detail__metric--highlight[_ngcontent-%COMP%]   .pos-session-detail__metric-value[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n  font-size: 1.125rem;\n}\n.pos-session-detail__metric--ok[_ngcontent-%COMP%] {\n  border-color: #bbf7d0;\n  background: #f0fdf4;\n}\n.pos-session-detail__metric--warn[_ngcontent-%COMP%] {\n  border-color: #fde68a;\n  background: #fffbeb;\n}\n.pos-session-detail__metric--err[_ngcontent-%COMP%] {\n  border-color: #fecaca;\n  background: #fef2f2;\n}\n.pos-session-detail__metric-label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.pos-session-detail__metric-value[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  font-variant-numeric: tabular-nums;\n}\n.pos-session-detail__metric-value--sales[_ngcontent-%COMP%] {\n  color: #059669;\n}\n.pos-session-detail__diff--ok[_ngcontent-%COMP%] {\n  color: #059669 !important;\n}\n.pos-session-detail__diff--surplus[_ngcontent-%COMP%] {\n  color: #b45309 !important;\n}\n.pos-session-detail__diff--shortage[_ngcontent-%COMP%] {\n  color: #dc2626 !important;\n}\n.pos-session-detail__btn[_ngcontent-%COMP%] {\n  min-width: 7rem;\n  padding: 0.5rem 1.25rem;\n  border: none;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #4f46e5 0%,\n      #4338ca 100%);\n  color: #fff;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);\n  transition: transform 0.1s ease, box-shadow 0.15s ease;\n}\n.pos-session-detail__btn[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);\n}\n.pos-session-detail__btn[_ngcontent-%COMP%]:active {\n  transform: translateY(1px);\n}\n[_nghost-%COMP%]     mat-dialog-content {\n  padding: 1.15rem 1.35rem 0.5rem !important;\n  margin: 0 !important;\n  max-height: min(70vh, 520px);\n}\n[_nghost-%COMP%]     mat-dialog-actions {\n  padding: 0.85rem 1.35rem 1.15rem !important;\n  margin: 0 !important;\n  border-top: 1px solid #f1f5f9;\n  justify-content: flex-end !important;\n}\n[_nghost-%COMP%]     .mat-mdc-dialog-title {\n  display: none;\n}\n/*# sourceMappingURL=pos-session-detail-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosSessionDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-pos-session-detail-modal", standalone: true, imports: [CommonModule, MatDialogModule], template: `<div class="pos-session-detail">\r
  <header class="pos-session-detail__header">\r
    <div class="pos-session-detail__header-main">\r
      <p class="pos-session-detail__eyebrow">Sesi\xF3n POS</p>\r
      <div class="pos-session-detail__title-row">\r
        <h2 class="pos-session-detail__title">{{ turnLabel(session) }}</h2>\r
        <span\r
          class="pos-session-detail__badge"\r
          [class.pos-session-detail__badge--open]="isOpen(session)"\r
          [class.pos-session-detail__badge--closed]="!isOpen(session)">\r
          {{ isOpen(session) ? 'Abierta' : 'Cerrada' }}\r
        </span>\r
      </div>\r
      <p class="pos-session-detail__subtitle">\r
        {{ equipmentLabel(session) }} \xB7 {{ branchLabel() }}\r
      </p>\r
    </div>\r
    <button\r
      type="button"\r
      class="pos-session-detail__dismiss"\r
      (click)="onClose()"\r
      aria-label="Cerrar ventana">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\r
        <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />\r
      </svg>\r
    </button>\r
  </header>\r
\r
  <mat-dialog-content>\r
    <div class="pos-session-detail__cards">\r
      <div class="pos-session-detail__card">\r
        <span class="pos-session-detail__card-label">Abierta por</span>\r
        <span class="pos-session-detail__card-value">{{ userLabel(session) }}</span>\r
      </div>\r
      <div class="pos-session-detail__card">\r
        <span class="pos-session-detail__card-label">Apertura</span>\r
        <span class="pos-session-detail__card-value">{{ formatDate(session.opened_at) }}</span>\r
      </div>\r
      @if (!isOpen(session)) {\r
        <div class="pos-session-detail__card">\r
          <span class="pos-session-detail__card-label">Cierre</span>\r
          <span class="pos-session-detail__card-value">{{ formatDate(session.closed_at) }}</span>\r
        </div>\r
        <div class="pos-session-detail__card">\r
          <span class="pos-session-detail__card-label">Cerrada por</span>\r
          <span class="pos-session-detail__card-value">{{ closedByLabel() }}</span>\r
        </div>\r
      }\r
    </div>\r
\r
    <section class="pos-session-detail__finance">\r
      <h3 class="pos-session-detail__finance-title">Efectivo y ventas</h3>\r
      <div class="pos-session-detail__metrics">\r
        <div class="pos-session-detail__metric">\r
          <span class="pos-session-detail__metric-label">Apertura</span>\r
          <span class="pos-session-detail__metric-value">{{ formatMoney(openingCash()) }}</span>\r
        </div>\r
        <div class="pos-session-detail__metric">\r
          <span class="pos-session-detail__metric-label">Ventas</span>\r
          <span class="pos-session-detail__metric-value pos-session-detail__metric-value--sales">\r
            {{ formatMoney(totalSales()) }}\r
          </span>\r
        </div>\r
        <div class="pos-session-detail__metric pos-session-detail__metric--highlight">\r
          <span class="pos-session-detail__metric-label">Efectivo esperado</span>\r
          <span class="pos-session-detail__metric-value">{{ formatMoney(expectedCash()) }}</span>\r
        </div>\r
        @if (!isOpen(session)) {\r
          <div class="pos-session-detail__metric">\r
            <span class="pos-session-detail__metric-label">Contado al cierre</span>\r
            <span class="pos-session-detail__metric-value">{{ formatMoney(closingCash()) }}</span>\r
          </div>\r
          <div\r
            class="pos-session-detail__metric"\r
            [class.pos-session-detail__metric--ok]="cashDifference() === 0"\r
            [class.pos-session-detail__metric--warn]="cashDifference() > 0"\r
            [class.pos-session-detail__metric--err]="cashDifference() < 0">\r
            <span class="pos-session-detail__metric-label">Diferencia</span>\r
            <span class="pos-session-detail__metric-value" [class]="differenceClass()">\r
              {{ formatMoney(cashDifference()) }}\r
            </span>\r
          </div>\r
        }\r
      </div>\r
    </section>\r
  </mat-dialog-content>\r
\r
  <mat-dialog-actions>\r
    <button type="button" class="pos-session-detail__btn" (click)="onClose()">Entendido</button>\r
  </mat-dialog-actions>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/pos-session-detail-modal/pos-session-detail-modal.component.scss */\n.pos-session-detail {\n  display: flex;\n  flex-direction: column;\n  min-width: min(480px, 95vw);\n  max-width: 520px;\n}\n.pos-session-detail__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.35rem 1.1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #eef2ff 0%,\n      #f8fafc 55%,\n      #fff 100%);\n  border-bottom: 1px solid #e2e8f0;\n}\n.pos-session-detail__header-main {\n  min-width: 0;\n  flex: 1;\n}\n.pos-session-detail__eyebrow {\n  margin: 0 0 0.25rem;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: #6366f1;\n}\n.pos-session-detail__title-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n.pos-session-detail__title {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.2;\n}\n.pos-session-detail__badge {\n  font-size: 0.6875rem;\n  font-weight: 700;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n}\n.pos-session-detail__badge--open {\n  background: #dcfce7;\n  color: #15803d;\n  box-shadow: inset 0 0 0 1px #bbf7d0;\n}\n.pos-session-detail__badge--closed {\n  background: #f1f5f9;\n  color: #475569;\n  box-shadow: inset 0 0 0 1px #e2e8f0;\n}\n.pos-session-detail__subtitle {\n  margin: 0.45rem 0 0;\n  font-size: 0.8125rem;\n  color: #64748b;\n  line-height: 1.4;\n}\n.pos-session-detail__dismiss {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: none;\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.8);\n  color: #64748b;\n  cursor: pointer;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n.pos-session-detail__dismiss svg {\n  width: 1.125rem;\n  height: 1.125rem;\n}\n.pos-session-detail__dismiss:hover {\n  background: #fff;\n  color: #334155;\n}\n.pos-session-detail__cards {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.65rem;\n  margin-bottom: 1.15rem;\n}\n.pos-session-detail__card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  padding: 0.65rem 0.75rem;\n  background: #f8fafc;\n  border: 1px solid #f1f5f9;\n  border-radius: 10px;\n}\n.pos-session-detail__card-label {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: #94a3b8;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.pos-session-detail__card-value {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #1e293b;\n  line-height: 1.35;\n}\n.pos-session-detail__finance-title {\n  margin: 0 0 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #475569;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.pos-session-detail__metrics {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.65rem;\n}\n.pos-session-detail__metric {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.75rem 0.85rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-session-detail__metric--highlight {\n  grid-column: 1/-1;\n  background:\n    linear-gradient(\n      135deg,\n      #eff6ff 0%,\n      #f8fafc 100%);\n  border-color: #bfdbfe;\n}\n.pos-session-detail__metric--highlight .pos-session-detail__metric-value {\n  color: #1d4ed8;\n  font-size: 1.125rem;\n}\n.pos-session-detail__metric--ok {\n  border-color: #bbf7d0;\n  background: #f0fdf4;\n}\n.pos-session-detail__metric--warn {\n  border-color: #fde68a;\n  background: #fffbeb;\n}\n.pos-session-detail__metric--err {\n  border-color: #fecaca;\n  background: #fef2f2;\n}\n.pos-session-detail__metric-label {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.pos-session-detail__metric-value {\n  font-size: 0.9375rem;\n  font-weight: 700;\n  color: #0f172a;\n  font-variant-numeric: tabular-nums;\n}\n.pos-session-detail__metric-value--sales {\n  color: #059669;\n}\n.pos-session-detail__diff--ok {\n  color: #059669 !important;\n}\n.pos-session-detail__diff--surplus {\n  color: #b45309 !important;\n}\n.pos-session-detail__diff--shortage {\n  color: #dc2626 !important;\n}\n.pos-session-detail__btn {\n  min-width: 7rem;\n  padding: 0.5rem 1.25rem;\n  border: none;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      135deg,\n      #4f46e5 0%,\n      #4338ca 100%);\n  color: #fff;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);\n  transition: transform 0.1s ease, box-shadow 0.15s ease;\n}\n.pos-session-detail__btn:hover {\n  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);\n}\n.pos-session-detail__btn:active {\n  transform: translateY(1px);\n}\n:host ::ng-deep mat-dialog-content {\n  padding: 1.15rem 1.35rem 0.5rem !important;\n  margin: 0 !important;\n  max-height: min(70vh, 520px);\n}\n:host ::ng-deep mat-dialog-actions {\n  padding: 0.85rem 1.35rem 1.15rem !important;\n  margin: 0 !important;\n  border-top: 1px solid #f1f5f9;\n  justify-content: flex-end !important;\n}\n:host ::ng-deep .mat-mdc-dialog-title {\n  display: none;\n}\n/*# sourceMappingURL=pos-session-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosSessionDetailModalComponent, { className: "PosSessionDetailModalComponent", filePath: "src/app/features/settings/components/pos-session-detail-modal/pos-session-detail-modal.component.ts", lineNumber: 32 });
})();

// src/app/features/settings/components/pos-session-close-dialog/pos-session-close-dialog.component.ts
function PosSessionCloseDialogComponent_Conditional_45_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Cuadre exacto ");
  }
}
function PosSessionCloseDialogComponent_Conditional_45_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Sobrante: ", ctx_r0.formatMoney(ctx_r0.difference()), " ");
  }
}
function PosSessionCloseDialogComponent_Conditional_45_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 26);
    \u0275\u0275element(1, "path", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Faltante: ", ctx_r0.formatMoney(ctx_r0.Math.abs(ctx_r0.difference())), " ");
  }
}
function PosSessionCloseDialogComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275conditionalCreate(1, PosSessionCloseDialogComponent_Conditional_45_Conditional_1_Template, 3, 0)(2, PosSessionCloseDialogComponent_Conditional_45_Conditional_2_Template, 3, 1)(3, PosSessionCloseDialogComponent_Conditional_45_Conditional_3_Template, 3, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap("pos-session-close__diff--" + ctx_r0.differenceType());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.differenceType() === "exact" ? 1 : ctx_r0.differenceType() === "surplus" ? 2 : 3);
  }
}
var PosSessionCloseDialogComponent = class _PosSessionCloseDialogComponent {
  dialogRef;
  data;
  closingCash = signal(0, ...ngDevMode ? [{ debugName: "closingCash" }] : []);
  notes = signal("", ...ngDevMode ? [{ debugName: "notes" }] : []);
  Math = Math;
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.closingCash.set(sessionExpectedCash(data.session));
  }
  get session() {
    return this.data.session;
  }
  turnLabel = sessionTurnLabel;
  equipmentLabel = posSessionEquipmentLabel;
  userLabel = posSessionUserLabel;
  formatDate = formatPosDateTime;
  formatMoney = formatPosCurrency;
  branchLabel() {
    return resolveSessionBranchLabel(this.session, this.data.branches);
  }
  openingCash() {
    return sessionOpeningCash(this.session);
  }
  totalSales() {
    return sessionTotalSales(this.session);
  }
  expectedCash() {
    return sessionExpectedCash(this.session);
  }
  difference() {
    return this.closingCash() - this.expectedCash();
  }
  differenceType() {
    const diff = this.difference();
    if (diff > 0) {
      return "surplus";
    }
    if (diff < 0) {
      return "shortage";
    }
    return "exact";
  }
  onConfirm() {
    if (this.closingCash() < 0) {
      return;
    }
    this.dialogRef.close({
      closing_balance: this.closingCash(),
      notes: this.notes()
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
  static \u0275fac = function PosSessionCloseDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosSessionCloseDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosSessionCloseDialogComponent, selectors: [["app-pos-session-close-dialog"]], decls: 59, vars: 12, consts: [[1, "pos-session-close"], [1, "pos-session-close__header"], ["aria-hidden", "true", 1, "pos-session-close__header-icon"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 9v4m0 4h.01M5.07 19h13.86a2 2 0 001.74-3L13.74 5a2 2 0 00-3.48 0L3.33 16a2 2 0 001.74 3z"], [1, "pos-session-close__title"], [1, "pos-session-close__subtitle"], [1, "pos-session-close__context"], [1, "pos-session-close__context-item"], [1, "pos-session-close__context-label"], [1, "pos-session-close__context-value"], [1, "pos-session-close__summary"], [1, "pos-session-close__summary-row"], [1, "pos-session-close__summary-sales"], [1, "pos-session-close__summary-row", "pos-session-close__summary-row--total"], [1, "pos-session-close__field"], ["for", "closing-cash"], [1, "pos-session-close__currency"], ["aria-hidden", "true"], ["id", "closing-cash", "type", "number", "min", "0", "step", "0.01", "required", "", 3, "ngModelChange", "ngModel"], [1, "pos-session-close__diff", 3, "class"], ["for", "close-notes"], [1, "pos-session-close__optional"], ["id", "close-notes", "rows", "2", "placeholder", "Ej. cierre administrativo, observaciones de caja...", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "pos-session-close__btn", "pos-session-close__btn--ghost", 3, "click"], ["type", "button", 1, "pos-session-close__btn", "pos-session-close__btn--confirm", 3, "click", "disabled"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M5 13l4 4L19 7"], [1, "pos-session-close__diff"], ["stroke-linecap", "round", "d", "M12 5v14M5 12h14"], ["stroke-linecap", "round", "d", "M5 12h14"]], template: function PosSessionCloseDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(5, "div")(6, "h2", 5);
      \u0275\u0275text(7, "Cerrar sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "mat-dialog-content")(11, "div", 7)(12, "div", 8)(13, "span", 9);
      \u0275\u0275text(14, "Sucursal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 10);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 8)(18, "span", 9);
      \u0275\u0275text(19, "Abierta por");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span", 10);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 11)(23, "div", 12)(24, "span");
      \u0275\u0275text(25, "Efectivo de apertura");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "strong");
      \u0275\u0275text(27);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 12)(29, "span");
      \u0275\u0275text(30, "Total ventas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "strong", 13);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 14)(34, "span");
      \u0275\u0275text(35, "Efectivo esperado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "strong");
      \u0275\u0275text(37);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "div", 15)(39, "label", 16);
      \u0275\u0275text(40, "Efectivo contado al cierre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 17)(42, "span", 18);
      \u0275\u0275text(43, "$");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "input", 19);
      \u0275\u0275listener("ngModelChange", function PosSessionCloseDialogComponent_Template_input_ngModelChange_44_listener($event) {
        return ctx.closingCash.set($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(45, PosSessionCloseDialogComponent_Conditional_45_Template, 4, 3, "div", 20);
      \u0275\u0275elementStart(46, "div", 15)(47, "label", 21);
      \u0275\u0275text(48, " Notas ");
      \u0275\u0275elementStart(49, "span", 22);
      \u0275\u0275text(50, "opcional");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "textarea", 23);
      \u0275\u0275listener("ngModelChange", function PosSessionCloseDialogComponent_Template_textarea_ngModelChange_51_listener($event) {
        return ctx.notes.set($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "mat-dialog-actions")(53, "button", 24);
      \u0275\u0275listener("click", function PosSessionCloseDialogComponent_Template_button_click_53_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(54, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "button", 25);
      \u0275\u0275listener("click", function PosSessionCloseDialogComponent_Template_button_click_55_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(56, "svg", 26);
      \u0275\u0275element(57, "path", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275text(58, " Confirmar cierre ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate2(" ", ctx.turnLabel(ctx.session), " \xB7 ", ctx.equipmentLabel(ctx.session), " ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.branchLabel());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2(" ", ctx.userLabel(ctx.session), " \xB7 ", ctx.formatDate(ctx.session.opened_at), " ");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.formatMoney(ctx.openingCash()));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatMoney(ctx.totalSales()));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.formatMoney(ctx.expectedCash()));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.closingCash());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.closingCash() >= 0 ? 45 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngModel", ctx.notes());
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.closingCash() < 0);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, RequiredValidator, MinValidator, NgModel, MatDialogModule, MatDialogActions, MatDialogContent], styles: ["\n\n.pos-session-close[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: min(460px, 95vw);\n  max-width: 520px;\n}\n.pos-session-close__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.85rem;\n  padding: 1.2rem 1.35rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #fef2f2 0%,\n      #fff7ed 40%,\n      #fff 100%);\n  border-bottom: 1px solid #fee2e2;\n}\n.pos-session-close__header-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 12px;\n  background: #fff;\n  color: #dc2626;\n  box-shadow: 0 1px 3px rgba(220, 38, 38, 0.15), inset 0 0 0 1px #fecaca;\n}\n.pos-session-close__header-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.pos-session-close__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.25;\n}\n.pos-session-close__subtitle[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.pos-session-close__context[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  padding: 0.75rem 0.85rem;\n  background: #f8fafc;\n  border: 1px solid #f1f5f9;\n  border-radius: 10px;\n}\n.pos-session-close__context-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.pos-session-close__context-label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: #94a3b8;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.pos-session-close__context-value[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #334155;\n}\n.pos-session-close__summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  margin-bottom: 1rem;\n  padding: 0.85rem 1rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-session-close__summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 1rem;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.pos-session-close__summary-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #1e293b;\n  font-variant-numeric: tabular-nums;\n}\n.pos-session-close__summary-row--total[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  padding-top: 0.55rem;\n  border-top: 1px dashed #e2e8f0;\n  font-weight: 600;\n  color: #475569;\n}\n.pos-session-close__summary-row--total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #1d4ed8;\n}\n.pos-session-close__summary-sales[_ngcontent-%COMP%] {\n  color: #059669 !important;\n}\n.pos-session-close__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n  margin-bottom: 0.85rem;\n}\n.pos-session-close__field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #374151;\n}\n.pos-session-close__optional[_ngcontent-%COMP%] {\n  margin-left: 0.35rem;\n  font-weight: 500;\n  color: #9ca3af;\n  text-transform: lowercase;\n}\n.pos-session-close__currency[_ngcontent-%COMP%] {\n  position: relative;\n}\n.pos-session-close__currency[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.85rem;\n  top: 50%;\n  transform: translateY(-50%);\n  font-weight: 700;\n  font-size: 0.9375rem;\n  color: #6366f1;\n}\n.pos-session-close__currency[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0.65rem 0.85rem 0.65rem 2rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #0f172a;\n  background: #f8fafc;\n  transition:\n    border-color 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s ease;\n}\n.pos-session-close__currency[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #818cf8;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.pos-session-close[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  font-family: inherit;\n  color: #1e293b;\n  background: #f8fafc;\n  resize: vertical;\n  min-height: 4rem;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n.pos-session-close[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #818cf8;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);\n}\n.pos-session-close__diff[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin-bottom: 0.85rem;\n  padding: 0.55rem 0.75rem;\n  border-radius: 10px;\n  font-size: 0.8125rem;\n  font-weight: 600;\n}\n.pos-session-close__diff[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  flex-shrink: 0;\n}\n.pos-session-close__diff--exact[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #047857;\n  border: 1px solid #bbf7d0;\n}\n.pos-session-close__diff--surplus[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  color: #b45309;\n  border: 1px solid #fde68a;\n}\n.pos-session-close__diff--shortage[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.pos-session-close__btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.5rem 1rem;\n  border-radius: 10px;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition:\n    background 0.15s ease,\n    box-shadow 0.15s ease,\n    transform 0.1s ease;\n}\n.pos-session-close__btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n}\n.pos-session-close__btn--ghost[_ngcontent-%COMP%] {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.pos-session-close__btn--ghost[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n}\n.pos-session-close__btn--confirm[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #dc2626 0%,\n      #b91c1c 100%);\n  color: #fff;\n  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);\n}\n.pos-session-close__btn--confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);\n}\n.pos-session-close__btn--confirm[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.pos-session-close__btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(1px);\n}\n[_nghost-%COMP%]     mat-dialog-content {\n  padding: 1.1rem 1.35rem 0.35rem !important;\n  margin: 0 !important;\n}\n[_nghost-%COMP%]     mat-dialog-actions {\n  display: flex !important;\n  gap: 0.5rem !important;\n  padding: 0.85rem 1.35rem 1.15rem !important;\n  margin: 0 !important;\n  border-top: 1px solid #f1f5f9;\n  justify-content: flex-end !important;\n}\n[_nghost-%COMP%]     .mat-mdc-dialog-title {\n  display: none;\n}\n/*# sourceMappingURL=pos-session-close-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosSessionCloseDialogComponent, [{
    type: Component,
    args: [{ selector: "app-pos-session-close-dialog", standalone: true, imports: [CommonModule, FormsModule, MatDialogModule], template: `<div class="pos-session-close">\r
  <header class="pos-session-close__header">\r
    <div class="pos-session-close__header-icon" aria-hidden="true">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\r
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M5.07 19h13.86a2 2 0 001.74-3L13.74 5a2 2 0 00-3.48 0L3.33 16a2 2 0 001.74 3z" />\r
      </svg>\r
    </div>\r
    <div>\r
      <h2 class="pos-session-close__title">Cerrar sesi\xF3n</h2>\r
      <p class="pos-session-close__subtitle">\r
        {{ turnLabel(session) }} \xB7 {{ equipmentLabel(session) }}\r
      </p>\r
    </div>\r
  </header>\r
\r
  <mat-dialog-content>\r
    <div class="pos-session-close__context">\r
      <div class="pos-session-close__context-item">\r
        <span class="pos-session-close__context-label">Sucursal</span>\r
        <span class="pos-session-close__context-value">{{ branchLabel() }}</span>\r
      </div>\r
      <div class="pos-session-close__context-item">\r
        <span class="pos-session-close__context-label">Abierta por</span>\r
        <span class="pos-session-close__context-value">\r
          {{ userLabel(session) }} \xB7 {{ formatDate(session.opened_at) }}\r
        </span>\r
      </div>\r
    </div>\r
\r
    <div class="pos-session-close__summary">\r
      <div class="pos-session-close__summary-row">\r
        <span>Efectivo de apertura</span>\r
        <strong>{{ formatMoney(openingCash()) }}</strong>\r
      </div>\r
      <div class="pos-session-close__summary-row">\r
        <span>Total ventas</span>\r
        <strong class="pos-session-close__summary-sales">{{ formatMoney(totalSales()) }}</strong>\r
      </div>\r
      <div class="pos-session-close__summary-row pos-session-close__summary-row--total">\r
        <span>Efectivo esperado</span>\r
        <strong>{{ formatMoney(expectedCash()) }}</strong>\r
      </div>\r
    </div>\r
\r
    <div class="pos-session-close__field">\r
      <label for="closing-cash">Efectivo contado al cierre</label>\r
      <div class="pos-session-close__currency">\r
        <span aria-hidden="true">$</span>\r
        <input\r
          id="closing-cash"\r
          type="number"\r
          min="0"\r
          step="0.01"\r
          [ngModel]="closingCash()"\r
          (ngModelChange)="closingCash.set($event)"\r
          required />\r
      </div>\r
    </div>\r
\r
    @if (closingCash() >= 0) {\r
      <div class="pos-session-close__diff" [class]="'pos-session-close__diff--' + differenceType()">\r
        @if (differenceType() === 'exact') {\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\r
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />\r
          </svg>\r
          Cuadre exacto\r
        } @else if (differenceType() === 'surplus') {\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\r
            <path stroke-linecap="round" d="M12 5v14M5 12h14" />\r
          </svg>\r
          Sobrante: {{ formatMoney(difference()) }}\r
        } @else {\r
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\r
            <path stroke-linecap="round" d="M5 12h14" />\r
          </svg>\r
          Faltante: {{ formatMoney(Math.abs(difference())) }}\r
        }\r
      </div>\r
    }\r
\r
    <div class="pos-session-close__field">\r
      <label for="close-notes">\r
        Notas\r
        <span class="pos-session-close__optional">opcional</span>\r
      </label>\r
      <textarea\r
        id="close-notes"\r
        rows="2"\r
        placeholder="Ej. cierre administrativo, observaciones de caja..."\r
        [ngModel]="notes()"\r
        (ngModelChange)="notes.set($event)"></textarea>\r
    </div>\r
  </mat-dialog-content>\r
\r
  <mat-dialog-actions>\r
    <button type="button" class="pos-session-close__btn pos-session-close__btn--ghost" (click)="onCancel()">\r
      Cancelar\r
    </button>\r
    <button\r
      type="button"\r
      class="pos-session-close__btn pos-session-close__btn--confirm"\r
      [disabled]="closingCash() < 0"\r
      (click)="onConfirm()">\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\r
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />\r
      </svg>\r
      Confirmar cierre\r
    </button>\r
  </mat-dialog-actions>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/pos-session-close-dialog/pos-session-close-dialog.component.scss */\n.pos-session-close {\n  display: flex;\n  flex-direction: column;\n  min-width: min(460px, 95vw);\n  max-width: 520px;\n}\n.pos-session-close__header {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.85rem;\n  padding: 1.2rem 1.35rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #fef2f2 0%,\n      #fff7ed 40%,\n      #fff 100%);\n  border-bottom: 1px solid #fee2e2;\n}\n.pos-session-close__header-icon {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: 12px;\n  background: #fff;\n  color: #dc2626;\n  box-shadow: 0 1px 3px rgba(220, 38, 38, 0.15), inset 0 0 0 1px #fecaca;\n}\n.pos-session-close__header-icon svg {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.pos-session-close__title {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.25;\n}\n.pos-session-close__subtitle {\n  margin: 0.25rem 0 0;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.pos-session-close__context {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n  padding: 0.75rem 0.85rem;\n  background: #f8fafc;\n  border: 1px solid #f1f5f9;\n  border-radius: 10px;\n}\n.pos-session-close__context-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.pos-session-close__context-label {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: #94a3b8;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.pos-session-close__context-value {\n  font-size: 0.8125rem;\n  font-weight: 600;\n  color: #334155;\n}\n.pos-session-close__summary {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n  margin-bottom: 1rem;\n  padding: 0.85rem 1rem;\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-session-close__summary-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 1rem;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.pos-session-close__summary-row strong {\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #1e293b;\n  font-variant-numeric: tabular-nums;\n}\n.pos-session-close__summary-row--total {\n  margin-top: 0.35rem;\n  padding-top: 0.55rem;\n  border-top: 1px dashed #e2e8f0;\n  font-weight: 600;\n  color: #475569;\n}\n.pos-session-close__summary-row--total strong {\n  font-size: 1rem;\n  color: #1d4ed8;\n}\n.pos-session-close__summary-sales {\n  color: #059669 !important;\n}\n.pos-session-close__field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n  margin-bottom: 0.85rem;\n}\n.pos-session-close__field label {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #374151;\n}\n.pos-session-close__optional {\n  margin-left: 0.35rem;\n  font-weight: 500;\n  color: #9ca3af;\n  text-transform: lowercase;\n}\n.pos-session-close__currency {\n  position: relative;\n}\n.pos-session-close__currency span {\n  position: absolute;\n  left: 0.85rem;\n  top: 50%;\n  transform: translateY(-50%);\n  font-weight: 700;\n  font-size: 0.9375rem;\n  color: #6366f1;\n}\n.pos-session-close__currency input {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0.65rem 0.85rem 0.65rem 2rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 1rem;\n  font-weight: 700;\n  color: #0f172a;\n  background: #f8fafc;\n  transition:\n    border-color 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s ease;\n}\n.pos-session-close__currency input:focus {\n  outline: none;\n  border-color: #818cf8;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.pos-session-close textarea {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  font-family: inherit;\n  color: #1e293b;\n  background: #f8fafc;\n  resize: vertical;\n  min-height: 4rem;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n.pos-session-close textarea:focus {\n  outline: none;\n  border-color: #818cf8;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);\n}\n.pos-session-close__diff {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin-bottom: 0.85rem;\n  padding: 0.55rem 0.75rem;\n  border-radius: 10px;\n  font-size: 0.8125rem;\n  font-weight: 600;\n}\n.pos-session-close__diff svg {\n  width: 1rem;\n  height: 1rem;\n  flex-shrink: 0;\n}\n.pos-session-close__diff--exact {\n  background: #ecfdf5;\n  color: #047857;\n  border: 1px solid #bbf7d0;\n}\n.pos-session-close__diff--surplus {\n  background: #fffbeb;\n  color: #b45309;\n  border: 1px solid #fde68a;\n}\n.pos-session-close__diff--shortage {\n  background: #fef2f2;\n  color: #dc2626;\n  border: 1px solid #fecaca;\n}\n.pos-session-close__btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.4rem;\n  padding: 0.5rem 1rem;\n  border-radius: 10px;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  border: none;\n  transition:\n    background 0.15s ease,\n    box-shadow 0.15s ease,\n    transform 0.1s ease;\n}\n.pos-session-close__btn svg {\n  width: 1rem;\n  height: 1rem;\n}\n.pos-session-close__btn--ghost {\n  background: #fff;\n  color: #475569;\n  border: 1px solid #e2e8f0;\n}\n.pos-session-close__btn--ghost:hover {\n  background: #f8fafc;\n}\n.pos-session-close__btn--confirm {\n  background:\n    linear-gradient(\n      135deg,\n      #dc2626 0%,\n      #b91c1c 100%);\n  color: #fff;\n  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);\n}\n.pos-session-close__btn--confirm:hover:not(:disabled) {\n  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);\n}\n.pos-session-close__btn--confirm:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n  box-shadow: none;\n}\n.pos-session-close__btn:active:not(:disabled) {\n  transform: translateY(1px);\n}\n:host ::ng-deep mat-dialog-content {\n  padding: 1.1rem 1.35rem 0.35rem !important;\n  margin: 0 !important;\n}\n:host ::ng-deep mat-dialog-actions {\n  display: flex !important;\n  gap: 0.5rem !important;\n  padding: 0.85rem 1.35rem 1.15rem !important;\n  margin: 0 !important;\n  border-top: 1px solid #f1f5f9;\n  justify-content: flex-end !important;\n}\n:host ::ng-deep .mat-mdc-dialog-title {\n  display: none;\n}\n/*# sourceMappingURL=pos-session-close-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosSessionCloseDialogComponent, { className: "PosSessionCloseDialogComponent", filePath: "src/app/features/settings/components/pos-session-close-dialog/pos-session-close-dialog.component.ts", lineNumber: 31 });
})();

// src/app/features/settings/components/pos-equipment-list/pos-equipment-list.component.ts
var _c05 = ["equiposTableTemplate"];
var _c1 = ["sessionsTableTemplate"];
var _forTrack06 = ($index, $item) => $item.id;
function PosEquipmentListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 19);
    \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Conditional_8_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.search, $event) || (ctx_r2.search = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function PosEquipmentListComponent_Conditional_8_Template_input_keyup_enter_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilters());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.search);
  }
}
function PosEquipmentListComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Conditional_9_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.sessionsSearch, $event) || (ctx_r2.sessionsSearch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function PosEquipmentListComponent_Conditional_9_Template_input_keyup_enter_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilters());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.sessionsSearch);
  }
}
function PosEquipmentListComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r5 = ctx.$implicit;
    \u0275\u0275property("value", b_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r5.display_name);
  }
}
function PosEquipmentListComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Conditional_16_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedType, $event) || (ctx_r2.selectedType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function PosEquipmentListComponent_Conditional_16_Template_select_change_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilters());
    });
    \u0275\u0275elementStart(2, "option", 12);
    \u0275\u0275text(3, "Todos los tipos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "option", 22);
    \u0275\u0275text(5, "VENTAS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 23);
    \u0275\u0275text(7, "COBRANZA");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedType);
  }
}
function PosEquipmentListComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Conditional_17_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.sessionsStatusFilter, $event) || (ctx_r2.sessionsStatusFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function PosEquipmentListComponent_Conditional_17_Template_select_change_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilters());
    });
    \u0275\u0275elementStart(2, "option", 12);
    \u0275\u0275text(3, "Todas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "option", 25);
    \u0275\u0275text(5, "Abierta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "option", 26);
    \u0275\u0275text(7, "Cerrada");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 8)(9, "input", 27);
    \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Conditional_17_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.sessionsDateFrom, $event) || (ctx_r2.sessionsDateFrom = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function PosEquipmentListComponent_Conditional_17_Template_input_change_9_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilters());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 8)(11, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Conditional_17_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.sessionsDateTo, $event) || (ctx_r2.sessionsDateTo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function PosEquipmentListComponent_Conditional_17_Template_input_change_11_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilters());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.sessionsStatusFilter);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.sessionsDateFrom);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.sessionsDateTo);
  }
}
function PosEquipmentListComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "app-button", 29);
    \u0275\u0275listener("clicked", function PosEquipmentListComponent_Conditional_18_Template_app_button_clicked_1_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openCreateEquipmentModal());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("fullWidth", false);
  }
}
function PosEquipmentListComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-datatable-wrapper", 30);
    \u0275\u0275listener("rowClick", function PosEquipmentListComponent_Conditional_26_Template_app_datatable_wrapper_rowClick_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewDetail($event.data));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    const equiposTableTemplate_r10 = \u0275\u0275reference(29);
    \u0275\u0275property("config", ctx_r2.table_config())("rowTemplate", equiposTableTemplate_r10);
  }
}
function PosEquipmentListComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-datatable-wrapper", 31);
    \u0275\u0275listener("rowClick", function PosEquipmentListComponent_Conditional_27_Template_app_datatable_wrapper_rowClick_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewSessionDetail($event.data));
    })("pageChange", function PosEquipmentListComponent_Conditional_27_Template_app_datatable_wrapper_pageChange_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSessionsPageChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    const sessionsTableTemplate_r12 = \u0275\u0275reference(31);
    \u0275\u0275property("config", ctx_r2.sessions_table_config())("rowTemplate", sessionsTableTemplate_r12);
  }
}
function PosEquipmentListComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "span", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span", 33);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td")(13, "span", 34);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.code);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r13.type ? "settings-badge settings-badge--type-international" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r13.type || "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(item_r13.modelo ? "settings-cell-text" : "settings-cell-empty");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r13.modelo || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.branchLabel(item_r13));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(item_r13.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r13.status), " ");
  }
}
function PosEquipmentListComponent_ng_template_30_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r15 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatSessionDate(item_r15.closed_at), " ");
  }
}
function PosEquipmentListComponent_ng_template_30_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function PosEquipmentListComponent_ng_template_30_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function PosEquipmentListComponent_ng_template_30_Conditional_27_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const item_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeSession(item_r15, $event));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 42);
    \u0275\u0275element(2, "path", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Cerrar sesi\xF3n ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r15 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275ariaProperty("aria-label", \u0275\u0275interpolate1("Cerrar sesi\xF3n ", ctx_r2.sessionTurnLabel(item_r15)));
  }
}
function PosEquipmentListComponent_ng_template_30_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 40);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PosEquipmentListComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "p", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "p", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span", 33);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td")(13, "span", 33);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "span", 33);
    \u0275\u0275conditionalCreate(17, PosEquipmentListComponent_ng_template_30_Conditional_17_Template, 1, 1)(18, PosEquipmentListComponent_ng_template_30_Conditional_18_Template, 1, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 37);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 37);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td")(24, "span", 34);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td", 38);
    \u0275\u0275listener("click", function PosEquipmentListComponent_ng_template_30_Template_td_click_26_listener($event) {
      \u0275\u0275restoreView(_r14);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275conditionalCreate(27, PosEquipmentListComponent_ng_template_30_Conditional_27_Template, 4, 2, "button", 39)(28, PosEquipmentListComponent_ng_template_30_Conditional_28_Template, 2, 0, "span", 40);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r15 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.sessionTurnLabel(item_r15));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.sessionEquipmentLabel(item_r15));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.sessionBranchLabel(item_r15));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.sessionUserLabel(item_r15));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatSessionDate(item_r15.opened_at));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(item_r15.closed_at ? 17 : 18);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatSessionMoney(item_r15.opening_cash ?? item_r15.initial_cash));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatSessionMoney(item_r15.total_sales));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.sessionStatusClass(item_r15));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.sessionStatusLabel(item_r15), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.sessionIsOpen(item_r15) ? 27 : 28);
  }
}
var PosEquipmentListComponent = class _PosEquipmentListComponent {
  posEquipmentService;
  posService;
  branchService;
  dialog;
  snackBar;
  equiposTableTemplate;
  sessionsTableTemplate;
  activeTabIndex = signal(0, ...ngDevMode ? [{ debugName: "activeTabIndex" }] : []);
  search = "";
  sessionsSearch = "";
  selectedSucursalId = "";
  selectedType = "";
  sessionsStatusFilter = "";
  sessionsDateFrom = "";
  sessionsDateTo = "";
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  branchesLoaded = false;
  table_config = signal({
    rows: [],
    columns: [
      { name: "C\xF3digo", prop: "code", sortable: true, canAutoResize: true, width: 160 },
      { name: "Tipo", prop: "type", sortable: true, canAutoResize: true, width: 120 },
      { name: "Modelo", prop: "modelo", sortable: true, canAutoResize: true, width: 200 },
      { name: "Sucursal", prop: "sucursal", sortable: true, canAutoResize: true, width: 180 },
      { name: "Estado", prop: "status", sortable: true, canAutoResize: true, width: 100 }
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron equipos" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  sessions_table_config = signal({
    rows: [],
    columns: [
      { name: "Turno", prop: "session_number", sortable: false, canAutoResize: true, width: 72 },
      { name: "Equipo", prop: "equipment", sortable: false, canAutoResize: true, width: 180 },
      { name: "Sucursal", prop: "branch", sortable: false, canAutoResize: true, width: 140 },
      { name: "Abierta por", prop: "user", sortable: false, canAutoResize: true, width: 130 },
      { name: "Apertura", prop: "opened_at", sortable: false, canAutoResize: true, width: 130 },
      { name: "Cierre", prop: "closed_at", sortable: false, canAutoResize: true, width: 130 },
      { name: "Apertura $", prop: "opening_cash", sortable: false, canAutoResize: true, width: 100 },
      { name: "Ventas", prop: "total_sales", sortable: false, canAutoResize: true, width: 100 },
      { name: "Estado", prop: "status", sortable: false, canAutoResize: true, width: 88 },
      { name: "", prop: "actions", sortable: false, canAutoResize: false, width: 128 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No hay sesiones para los filtros seleccionados" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "sessions_table_config" }] : []);
  constructor(posEquipmentService, posService, branchService, dialog, snackBar) {
    this.posEquipmentService = posEquipmentService;
    this.posService = posService;
    this.branchService = branchService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.ensureBranches();
    this.loadPosConfigurations();
  }
  onTabChange(index) {
    this.activeTabIndex.set(index);
    if (index === 1) {
      this.loadSessions();
    } else {
      this.loadPosConfigurations();
    }
  }
  applyFilters() {
    if (this.activeTabIndex() === 0) {
      this.loadPosConfigurations();
    } else {
      this.sessions_table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
      this.loadSessions();
    }
  }
  onSessionsPageChange(event) {
    this.sessions_table_config.update((c) => __spreadProps(__spreadValues({}, c), {
      page: event.page,
      limit: event.limit
    }));
    this.loadSessions();
  }
  ensureBranches() {
    if (this.branchesLoaded) {
      return;
    }
    this.branchesLoaded = true;
    this.branchService.getAllBranches().subscribe({
      next: (list) => this.branches.set(list),
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar sucursales", type: "error" },
          duration: 4e3
        });
      }
    });
  }
  loadPosConfigurations() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const cfg = this.table_config();
    const params = {
      page: cfg.page,
      limit: cfg.limit
    };
    if (this.search?.trim()) {
      params["search"] = this.search.trim();
    }
    if (this.selectedSucursalId?.trim()) {
      params["sucursal"] = this.selectedSucursalId.trim();
    }
    if (this.selectedType?.trim()) {
      params["type"] = this.selectedType.trim();
    }
    this.posEquipmentService.getPosConfigurations(params).subscribe({
      next: (res) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: res.data,
          totalResults: res.total,
          loading: false
        }));
      },
      error: (error) => {
        console.error("Error loading pos configurations:", error);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || "Error al cargar configuraciones POS",
            type: "error"
          },
          duration: 5e3
        });
      }
    });
  }
  loadSessions() {
    this.sessions_table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const cfg = this.sessions_table_config();
    const params = {
      page: cfg.page,
      limit: cfg.limit
    };
    if (this.sessionsSearch?.trim()) {
      params.search = this.sessionsSearch.trim();
    }
    if (this.selectedSucursalId?.trim()) {
      params.sucursal = this.selectedSucursalId.trim();
    }
    if (this.sessionsStatusFilter === "open" || this.sessionsStatusFilter === "closed") {
      params.status = this.sessionsStatusFilter;
    }
    if (this.sessionsDateFrom) {
      params.opened_from = this.sessionsDateFrom;
    }
    if (this.sessionsDateTo) {
      params.opened_to = this.sessionsDateTo;
    }
    this.posService.getCashShifts(params).subscribe({
      next: (res) => {
        const { rows, total } = this.normalizeShiftListResponse(res);
        this.sessions_table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows,
          totalResults: total,
          loading: false
        }));
      },
      error: (error) => {
        console.error("Error loading cash shifts:", error);
        this.sessions_table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || "Error al cargar sesiones",
            type: "error"
          },
          duration: 5e3
        });
      }
    });
  }
  normalizeShiftListResponse(res) {
    if (res == null) {
      return { rows: [], total: 0 };
    }
    if (Array.isArray(res)) {
      return { rows: res, total: res.length };
    }
    const obj = res;
    const raw = obj["data"] ?? obj["shifts"] ?? obj["results"] ?? obj["items"];
    const rows = Array.isArray(raw) ? raw : [];
    const total = (typeof obj["total"] === "number" ? obj["total"] : null) ?? (typeof obj["count"] === "number" ? obj["count"] : null) ?? rows.length;
    return { rows, total };
  }
  branchLabel(item) {
    const b = item.branch;
    if (b && typeof b === "object") {
      const name = b["display_name"] ?? b["name"];
      if (name) {
        return name;
      }
      const code = b["code"];
      if (code) {
        return code;
      }
    }
    return "\u2014";
  }
  sessionBranchLabel(row) {
    return resolveSessionBranchLabel(row, this.branches());
  }
  sessionEquipmentLabel(row) {
    return posSessionEquipmentLabel(row);
  }
  sessionUserLabel(row) {
    return posSessionUserLabel(row);
  }
  sessionTurnLabel(row) {
    return sessionTurnLabel(row);
  }
  sessionIsOpen(row) {
    return sessionIsOpen(row);
  }
  sessionStatusClass(row) {
    return this.sessionIsOpen(row) ? "settings-badge--status-active" : "settings-badge--status-inactive";
  }
  sessionStatusLabel(row) {
    return this.sessionIsOpen(row) ? "Abierta" : "Cerrada";
  }
  formatSessionDate(value) {
    return formatPosDateTime(value);
  }
  formatSessionMoney(value) {
    return formatPosCurrency(parsePosMoney(value));
  }
  viewSessionDetail(session, event) {
    event?.stopPropagation();
    this.dialog.open(PosSessionDetailModalComponent, {
      width: "520px",
      maxWidth: "calc(100vw - 24px)",
      autoFocus: false,
      panelClass: "pos-session-detail-panel",
      data: { session, branches: this.branches() }
    });
  }
  closeSession(session, event) {
    event?.stopPropagation();
    if (!this.sessionIsOpen(session)) {
      return;
    }
    const dialogRef = this.dialog.open(PosSessionCloseDialogComponent, {
      width: "520px",
      maxWidth: "calc(100vw - 24px)",
      disableClose: true,
      autoFocus: false,
      panelClass: "pos-session-close-panel",
      data: { session, branches: this.branches() }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.posService.closePosSession(session.id, {
        closing_balance: result.closing_balance,
        notes: result.notes
      }).subscribe({
        next: (closed) => {
          const counted = parsePosMoney(result.closing_balance);
          const expected = parsePosMoney(closed?.expected_cash) || sessionOpeningCash(session) + sessionTotalSales(session);
          const diff = parsePosMoney(closed?.cash_difference ?? closed?.difference) || counted - expected;
          const diffText = diff === 0 ? "Diferencia: $0.00" : diff > 0 ? `Diferencia: +${formatPosCurrency(diff)}` : `Diferencia: ${formatPosCurrency(diff)}`;
          const diffType = diff === 0 ? "success" : diff > 0 ? "warning" : "error";
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: `Sesi\xF3n cerrada. Contado: ${formatPosCurrency(counted)} \xB7 Esperado: ${formatPosCurrency(expected)} \xB7 ${diffText}`,
              type: diffType
            },
            duration: 6e3
          });
          this.loadSessions();
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: error.error?.message || "Error al cerrar la sesi\xF3n",
              type: "error"
            },
            duration: 5e3
          });
        }
      });
    });
  }
  openCreateEquipmentModal() {
    const dialogRef = this.dialog.open(PosEquipmentDetailModalComponent, {
      width: "440px",
      maxWidth: "calc(100vw - 24px)",
      autoFocus: false,
      data: { configuration: null }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPosConfigurations();
      }
    });
  }
  viewDetail(configuration) {
    const dialogRef = this.dialog.open(PosEquipmentDetailModalComponent, {
      width: "440px",
      maxWidth: "calc(100vw - 24px)",
      autoFocus: false,
      data: { configuration }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPosConfigurations();
      }
    });
  }
  getStatusClass(status) {
    return status === 1 ? "settings-badge--status-active" : "settings-badge--status-inactive";
  }
  getStatusLabel(status) {
    return status === 1 ? "Activo" : "Inactivo";
  }
  static \u0275fac = function PosEquipmentListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosEquipmentListComponent)(\u0275\u0275directiveInject(PosEquipmentService), \u0275\u0275directiveInject(POSService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosEquipmentListComponent, selectors: [["app-pos-equipment-list"]], viewQuery: function PosEquipmentListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c05, 5)(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.equiposTableTemplate = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sessionsTableTemplate = _t.first);
    }
  }, decls: 32, vars: 27, consts: [["equiposTableTemplate", ""], ["sessionsTableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "mb-4"], ["role", "search", "aria-label", "Filtros configuraci\xF3n POS", 1, "filter-bar"], [1, "filter-bar__container"], [1, "filter-bar__field"], ["type", "text", "placeholder", "Buscar...", "aria-label", "Buscar equipos", 1, "filter-bar__input", 3, "ngModel"], ["type", "text", "placeholder", "Buscar equipo o #turno...", "aria-label", "Buscar sesiones", 1, "filter-bar__input", 3, "ngModel"], ["aria-label", "Filtrar por sucursal", 1, "filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], [1, "filter-bar__field", "filter-bar__field--action"], [1, "border-b", "border-gray-200"], ["aria-label", "Secciones configuraci\xF3n POS", 1, "-mb-px", "flex", "space-x-8"], ["type", "button", 1, "border-b-2", "py-4", "px-1", "text-sm", "font-medium", "transition-colors", 3, "click"], ["variant", "settings", 3, "config", "rowTemplate"], ["type", "text", "placeholder", "Buscar...", "aria-label", "Buscar equipos", 1, "filter-bar__input", 3, "ngModelChange", "keyup.enter", "ngModel"], ["type", "text", "placeholder", "Buscar equipo o #turno...", "aria-label", "Buscar sesiones", 1, "filter-bar__input", 3, "ngModelChange", "keyup.enter", "ngModel"], ["aria-label", "Filtrar por tipo", 1, "filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", "VENTAS"], ["value", "COBRANZA"], ["aria-label", "Filtrar por estado de sesi\xF3n", 1, "filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", "open"], ["value", "closed"], ["type", "date", "aria-label", "Fecha desde", 1, "filter-bar__input", 3, "ngModelChange", "change", "ngModel"], ["type", "date", "aria-label", "Fecha hasta", 1, "filter-bar__input", 3, "ngModelChange", "change", "ngModel"], ["text", "Nuevo Equipo", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth"], ["variant", "settings", 3, "rowClick", "config", "rowTemplate"], ["variant", "settings", 3, "rowClick", "pageChange", "config", "rowTemplate"], [1, "settings-badge", "settings-badge--code"], [1, "settings-cell-text"], [1, "settings-badge", 3, "ngClass"], [1, "settings-cell-primary", "session-turn"], [1, "settings-cell-text", "session-equipment", "m-0"], [1, "session-money"], [1, "session-actions-cell", 3, "click"], ["type", "button", 1, "session-close-btn", 3, "aria-label"], [1, "session-actions-empty"], ["type", "button", 1, "session-close-btn", 3, "click", "aria-label"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"]], template: function PosEquipmentListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2", 4);
      \u0275\u0275text(3, "Configuraci\xF3n POS");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "div", 7)(7, "div", 8);
      \u0275\u0275conditionalCreate(8, PosEquipmentListComponent_Conditional_8_Template, 1, 1, "input", 9)(9, PosEquipmentListComponent_Conditional_9_Template, 1, 1, "input", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 8)(11, "select", 11);
      \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Template_select_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedSucursalId, $event) || (ctx.selectedSucursalId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function PosEquipmentListComponent_Template_select_change_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters());
      });
      \u0275\u0275elementStart(12, "option", 12);
      \u0275\u0275text(13, "Todas las sucursales");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(14, PosEquipmentListComponent_For_15_Template, 2, 2, "option", 13, _forTrack06);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, PosEquipmentListComponent_Conditional_16_Template, 8, 1, "div", 8);
      \u0275\u0275conditionalCreate(17, PosEquipmentListComponent_Conditional_17_Template, 12, 3);
      \u0275\u0275conditionalCreate(18, PosEquipmentListComponent_Conditional_18_Template, 2, 1, "div", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 5)(20, "div", 15)(21, "nav", 16)(22, "button", 17);
      \u0275\u0275listener("click", function PosEquipmentListComponent_Template_button_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTabChange(0));
      });
      \u0275\u0275text(23, " Equipos ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 17);
      \u0275\u0275listener("click", function PosEquipmentListComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTabChange(1));
      });
      \u0275\u0275text(25, " Sesiones ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(26, PosEquipmentListComponent_Conditional_26_Template, 1, 2, "app-datatable-wrapper", 18);
      \u0275\u0275conditionalCreate(27, PosEquipmentListComponent_Conditional_27_Template, 1, 2, "app-datatable-wrapper", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275template(28, PosEquipmentListComponent_ng_template_28_Template, 15, 10, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(30, PosEquipmentListComponent_ng_template_30_Template, 29, 11, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275classProp("filter-bar__container--equipos", ctx.activeTabIndex() === 0)("filter-bar__container--sesiones", ctx.activeTabIndex() === 1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTabIndex() === 0 ? 8 : 9);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedSucursalId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.branches());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTabIndex() === 0 ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTabIndex() === 1 ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTabIndex() === 0 ? 18 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("border-blue-500", ctx.activeTabIndex() === 0)("text-blue-600", ctx.activeTabIndex() === 0)("border-transparent", ctx.activeTabIndex() !== 0)("text-gray-500", ctx.activeTabIndex() !== 0);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("border-blue-500", ctx.activeTabIndex() === 1)("text-blue-600", ctx.activeTabIndex() === 1)("border-transparent", ctx.activeTabIndex() !== 1)("text-gray-500", ctx.activeTabIndex() !== 1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTabIndex() === 0 ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTabIndex() === 1 ? 27 : -1);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatatableWrapperComponent, ButtonComponent], styles: [`

.settings-cell-primary[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #111827;
}
.settings-cell-text[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #4b5563;
}
.settings-cell-empty[_ngcontent-%COMP%] {
  font-size: 0.875rem;
  color: #9ca3af;
}
.settings-cell-mono[_ngcontent-%COMP%] {
  margin: 0;
  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    monospace;
  font-size: 0.8125rem;
  color: #374151;
}
.settings-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
  white-space: nowrap;
}
.settings-badge--code[_ngcontent-%COMP%] {
  background-color: #eff6ff;
  color: #1d4ed8;
}
.settings-badge--status-active[_ngcontent-%COMP%] {
  background-color: #dcfce7;
  color: #15803d;
}
.settings-badge--status-inactive[_ngcontent-%COMP%] {
  background-color: #f3f4f6;
  color: #6b7280;
}
.settings-badge--type-national[_ngcontent-%COMP%] {
  background-color: #e0f2fe;
  color: #0369a1;
}
.settings-badge--type-international[_ngcontent-%COMP%] {
  background-color: #ede9fe;
  color: #6d28d9;
}
.filter-bar[_ngcontent-%COMP%] {
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin-bottom: 0;
  box-shadow: none;
  border: none;
}
.filter-bar__container[_ngcontent-%COMP%] {
  display: grid;
  gap: 0.75rem;
  align-items: end;
}
.filter-bar__container--equipos[_ngcontent-%COMP%] {
  grid-template-columns: minmax(0, 1fr) minmax(220px, 1fr) minmax(180px, 220px) auto;
}
.filter-bar__container--sesiones[_ngcontent-%COMP%] {
  grid-template-columns: minmax(0, 1.2fr) minmax(180px, 1fr) minmax(140px, 160px) minmax(130px, 150px) minmax(130px, 150px);
}
.filter-bar__field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}
.filter-bar__field--action[_ngcontent-%COMP%] {
  align-items: flex-end;
  justify-content: end;
}
.filter-bar__input[_ngcontent-%COMP%], 
.filter-bar__select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #2d3748;
  background: #ffffff;
  transition: all 0.2s ease;
}
.filter-bar__input[_ngcontent-%COMP%]:focus, 
.filter-bar__select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}
.filter-bar__input[_ngcontent-%COMP%]:hover, 
.filter-bar__select[_ngcontent-%COMP%]:hover {
  border-color: #cbd5e0;
}
.filter-bar__input[_ngcontent-%COMP%]::placeholder, 
.filter-bar__select[_ngcontent-%COMP%]::placeholder {
  color: #a0aec0;
}
.filter-bar__select[_ngcontent-%COMP%] {
  cursor: pointer;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px !important;
  padding-right: 2.5rem !important;
}
@media (max-width: 768px) {
  .filter-bar__container--equipos[_ngcontent-%COMP%], 
   .filter-bar__container--sesiones[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.session-turn[_ngcontent-%COMP%] {
  font-weight: 700;
  color: #1e40af;
  font-size: 0.8125rem;
}
.session-equipment[_ngcontent-%COMP%] {
  font-size: 0.8125rem;
  color: #334155;
}
.session-money[_ngcontent-%COMP%] {
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.session-actions-cell[_ngcontent-%COMP%] {
  text-align: right;
  vertical-align: middle;
}
.session-actions-empty[_ngcontent-%COMP%] {
  color: #cbd5e1;
  font-size: 0.875rem;
}
.session-close-btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background:
    linear-gradient(
      180deg,
      #fff 0%,
      #fef2f2 100%);
  color: #b91c1c;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.session-close-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}
.session-close-btn[_ngcontent-%COMP%]:hover {
  background: #fef2f2;
  border-color: #f87171;
  box-shadow: 0 1px 3px rgba(220, 38, 38, 0.12);
}
.session-close-btn[_ngcontent-%COMP%]:active {
  transform: translateY(1px);
}
/*# sourceMappingURL=pos-equipment-list.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosEquipmentListComponent, [{
    type: Component,
    args: [{ selector: "app-pos-equipment-list", standalone: true, imports: [CommonModule, FormsModule, DatatableWrapperComponent, ButtonComponent], template: `<div class="settings-list-page px-4 pb-6">
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
    <h2 class="text-2xl font-semibold text-gray-800">Configuraci\xF3n POS</h2>
  </div>

  <div class="mb-4">
    <div class="filter-bar" role="search" aria-label="Filtros configuraci\xF3n POS">
      <div
        class="filter-bar__container"
        [class.filter-bar__container--equipos]="activeTabIndex() === 0"
        [class.filter-bar__container--sesiones]="activeTabIndex() === 1">
        <div class="filter-bar__field">
          @if (activeTabIndex() === 0) {
            <input
              type="text"
              [(ngModel)]="search"
              (keyup.enter)="applyFilters()"
              placeholder="Buscar..."
              class="filter-bar__input"
              aria-label="Buscar equipos"
            />
          } @else {
            <input
              type="text"
              [(ngModel)]="sessionsSearch"
              (keyup.enter)="applyFilters()"
              placeholder="Buscar equipo o #turno..."
              class="filter-bar__input"
              aria-label="Buscar sesiones"
            />
          }
        </div>
        <div class="filter-bar__field">
          <select
            [(ngModel)]="selectedSucursalId"
            (change)="applyFilters()"
            class="filter-bar__select"
            aria-label="Filtrar por sucursal">
            <option value="">Todas las sucursales</option>
            @for (b of branches(); track b.id) {
              <option [value]="b.id">{{ b.display_name }}</option>
            }
          </select>
        </div>
        @if (activeTabIndex() === 0) {
          <div class="filter-bar__field">
            <select
              [(ngModel)]="selectedType"
              (change)="applyFilters()"
              class="filter-bar__select"
              aria-label="Filtrar por tipo">
              <option value="">Todos los tipos</option>
              <option value="VENTAS">VENTAS</option>
              <option value="COBRANZA">COBRANZA</option>
            </select>
          </div>
        }
        @if (activeTabIndex() === 1) {
          <div class="filter-bar__field">
            <select
              [(ngModel)]="sessionsStatusFilter"
              (change)="applyFilters()"
              class="filter-bar__select"
              aria-label="Filtrar por estado de sesi\xF3n">
              <option value="">Todas</option>
              <option value="open">Abierta</option>
              <option value="closed">Cerrada</option>
            </select>
          </div>
          <div class="filter-bar__field">
            <input
              type="date"
              [(ngModel)]="sessionsDateFrom"
              (change)="applyFilters()"
              class="filter-bar__input"
              aria-label="Fecha desde"
            />
          </div>
          <div class="filter-bar__field">
            <input
              type="date"
              [(ngModel)]="sessionsDateTo"
              (change)="applyFilters()"
              class="filter-bar__input"
              aria-label="Fecha hasta"
            />
          </div>
        }
        @if (activeTabIndex() === 0) {
          <div class="filter-bar__field filter-bar__field--action">
            <app-button
              text="Nuevo Equipo"
              size="sm"
              [fullWidth]="false"
              custom_class="btn_primary"
              (clicked)="openCreateEquipmentModal()">
            </app-button>
          </div>
        }
      </div>
    </div>
  </div>

  <div class="mb-4">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Secciones configuraci\xF3n POS">
        <button
          type="button"
          class="border-b-2 py-4 px-1 text-sm font-medium transition-colors"
          [class.border-blue-500]="activeTabIndex() === 0"
          [class.text-blue-600]="activeTabIndex() === 0"
          [class.border-transparent]="activeTabIndex() !== 0"
          [class.text-gray-500]="activeTabIndex() !== 0"
          (click)="onTabChange(0)">
          Equipos
        </button>
        <button
          type="button"
          class="border-b-2 py-4 px-1 text-sm font-medium transition-colors"
          [class.border-blue-500]="activeTabIndex() === 1"
          [class.text-blue-600]="activeTabIndex() === 1"
          [class.border-transparent]="activeTabIndex() !== 1"
          [class.text-gray-500]="activeTabIndex() !== 1"
          (click)="onTabChange(1)">
          Sesiones
        </button>
      </nav>
    </div>
  </div>

  @if (activeTabIndex() === 0) {
    <app-datatable-wrapper
      variant="settings"
      [config]="table_config()"
      [rowTemplate]="equiposTableTemplate"
      (rowClick)="viewDetail($event.data)">
    </app-datatable-wrapper>
  }

  @if (activeTabIndex() === 1) {
    <app-datatable-wrapper
      variant="settings"
      [config]="sessions_table_config()"
      [rowTemplate]="sessionsTableTemplate"
      (rowClick)="viewSessionDetail($event.data)"
      (pageChange)="onSessionsPageChange($event)">
    </app-datatable-wrapper>
  }
</div>

<ng-template #equiposTableTemplate let-item="$implicit">
  <td>
    <span class="settings-badge settings-badge--code">{{ item.code }}</span>
  </td>
  <td>
    <span [class]="item.type ? 'settings-badge settings-badge--type-international' : 'settings-cell-empty'">
      {{ item.type || '\u2014' }}
    </span>
  </td>
  <td>
    <span [class]="item.modelo ? 'settings-cell-text' : 'settings-cell-empty'">{{ item.modelo || '\u2014' }}</span>
  </td>
  <td>
    <span class="settings-cell-text">{{ branchLabel(item) }}</span>
  </td>
  <td>
    <span class="settings-badge" [ngClass]="getStatusClass(item.status)">
      {{ getStatusLabel(item.status) }}
    </span>
  </td>
</ng-template>

<ng-template #sessionsTableTemplate let-item="$implicit">
  <td>
    <p class="settings-cell-primary session-turn">{{ sessionTurnLabel(item) }}</p>
  </td>
  <td>
    <p class="settings-cell-text session-equipment m-0">{{ sessionEquipmentLabel(item) }}</p>
  </td>
  <td><span class="settings-cell-text">{{ sessionBranchLabel(item) }}</span></td>
  <td><span class="settings-cell-text">{{ sessionUserLabel(item) }}</span></td>
  <td><span class="settings-cell-text">{{ formatSessionDate(item.opened_at) }}</span></td>
  <td>
    <span class="settings-cell-text">
      @if (item.closed_at) {
        {{ formatSessionDate(item.closed_at) }}
      } @else {
        \u2014
      }
    </span>
  </td>
  <td class="session-money">{{ formatSessionMoney(item.opening_cash ?? item.initial_cash) }}</td>
  <td class="session-money">{{ formatSessionMoney(item.total_sales) }}</td>
  <td>
    <span class="settings-badge" [ngClass]="sessionStatusClass(item)">
      {{ sessionStatusLabel(item) }}
    </span>
  </td>
  <td class="session-actions-cell" (click)="$event.stopPropagation()">
    @if (sessionIsOpen(item)) {
      <button
        type="button"
        class="session-close-btn"
        (click)="closeSession(item, $event)"
        aria-label="Cerrar sesi\xF3n {{ sessionTurnLabel(item) }}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Cerrar sesi\xF3n
      </button>
    } @else {
      <span class="session-actions-empty">\u2014</span>
    }
  </td>
</ng-template>
`, styles: [`/* src/app/features/settings/components/pos-equipment-list/pos-equipment-list.component.scss */
.settings-cell-primary {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: #111827;
}
.settings-cell-text {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #4b5563;
}
.settings-cell-empty {
  font-size: 0.875rem;
  color: #9ca3af;
}
.settings-cell-mono {
  margin: 0;
  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    monospace;
  font-size: 0.8125rem;
  color: #374151;
}
.settings-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
  white-space: nowrap;
}
.settings-badge--code {
  background-color: #eff6ff;
  color: #1d4ed8;
}
.settings-badge--status-active {
  background-color: #dcfce7;
  color: #15803d;
}
.settings-badge--status-inactive {
  background-color: #f3f4f6;
  color: #6b7280;
}
.settings-badge--type-national {
  background-color: #e0f2fe;
  color: #0369a1;
}
.settings-badge--type-international {
  background-color: #ede9fe;
  color: #6d28d9;
}
.filter-bar {
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin-bottom: 0;
  box-shadow: none;
  border: none;
}
.filter-bar__container {
  display: grid;
  gap: 0.75rem;
  align-items: end;
}
.filter-bar__container--equipos {
  grid-template-columns: minmax(0, 1fr) minmax(220px, 1fr) minmax(180px, 220px) auto;
}
.filter-bar__container--sesiones {
  grid-template-columns: minmax(0, 1.2fr) minmax(180px, 1fr) minmax(140px, 160px) minmax(130px, 150px) minmax(130px, 150px);
}
.filter-bar__field {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}
.filter-bar__field--action {
  align-items: flex-end;
  justify-content: end;
}
.filter-bar__input,
.filter-bar__select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #2d3748;
  background: #ffffff;
  transition: all 0.2s ease;
}
.filter-bar__input:focus,
.filter-bar__select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}
.filter-bar__input:hover,
.filter-bar__select:hover {
  border-color: #cbd5e0;
}
.filter-bar__input::placeholder,
.filter-bar__select::placeholder {
  color: #a0aec0;
}
.filter-bar__select {
  cursor: pointer;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px !important;
  padding-right: 2.5rem !important;
}
@media (max-width: 768px) {
  .filter-bar__container--equipos,
  .filter-bar__container--sesiones {
    grid-template-columns: 1fr;
  }
}
.session-turn {
  font-weight: 700;
  color: #1e40af;
  font-size: 0.8125rem;
}
.session-equipment {
  font-size: 0.8125rem;
  color: #334155;
}
.session-money {
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.session-actions-cell {
  text-align: right;
  vertical-align: middle;
}
.session-actions-empty {
  color: #cbd5e1;
  font-size: 0.875rem;
}
.session-close-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background:
    linear-gradient(
      180deg,
      #fff 0%,
      #fef2f2 100%);
  color: #b91c1c;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.session-close-btn svg {
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}
.session-close-btn:hover {
  background: #fef2f2;
  border-color: #f87171;
  box-shadow: 0 1px 3px rgba(220, 38, 38, 0.12);
}
.session-close-btn:active {
  transform: translateY(1px);
}
/*# sourceMappingURL=pos-equipment-list.component.css.map */
`] }]
  }], () => [{ type: PosEquipmentService }, { type: POSService }, { type: BranchService }, { type: MatDialog }, { type: MatSnackBar }], { equiposTableTemplate: [{
    type: ViewChild,
    args: ["equiposTableTemplate"]
  }], sessionsTableTemplate: [{
    type: ViewChild,
    args: ["sessionsTableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosEquipmentListComponent, { className: "PosEquipmentListComponent", filePath: "src/app/features/settings/components/pos-equipment-list/pos-equipment-list.component.ts", lineNumber: 42 });
})();

// src/app/features/settings/components/email-template-create-modal/email-template-create-modal.component.ts
var _c06 = ["subjectInput"];
var _c12 = ["bodyHtmlTextarea"];
var _c2 = () => ({ standalone: true });
function EmailTemplateCreateModalComponent_div_13_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 36);
    \u0275\u0275text(1, " El nombre es requerido (m\xEDnimo 3 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function EmailTemplateCreateModalComponent_div_13_p_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 36);
    \u0275\u0275text(1, " El asunto es requerido (m\xEDnimo 5 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function EmailTemplateCreateModalComponent_div_13_optgroup_21_option_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const variable_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("value", variable_r3.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", variable_r3.label, " - ", ctx_r1.formatVariableToken(variable_r3.key), " ");
  }
}
function EmailTemplateCreateModalComponent_div_13_optgroup_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "optgroup", 37);
    \u0275\u0275template(1, EmailTemplateCreateModalComponent_div_13_optgroup_21_option_1_Template, 2, 3, "option", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r4 = ctx.$implicit;
    \u0275\u0275property("label", group_r4.label);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", group_r4.variables);
  }
}
function EmailTemplateCreateModalComponent_div_13_div_27_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 44);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const variable_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", variable_r5, " ");
  }
}
function EmailTemplateCreateModalComponent_div_13_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "p", 41);
    \u0275\u0275text(2, "Variables detectadas:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 42);
    \u0275\u0275template(4, EmailTemplateCreateModalComponent_div_13_div_27_span_4_Template, 2, 1, "span", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.getExtractedVariables());
  }
}
function EmailTemplateCreateModalComponent_div_13_p_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 36);
    \u0275\u0275text(1, " El cuerpo es requerido (m\xEDnimo 10 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function EmailTemplateCreateModalComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "form", 14)(2, "div")(3, "label", 15);
    \u0275\u0275text(4, "Nombre del Template");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 16);
    \u0275\u0275template(6, EmailTemplateCreateModalComponent_div_13_p_6_Template, 2, 0, "p", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "label", 15);
    \u0275\u0275text(9, "Asunto del Correo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 18, 0);
    \u0275\u0275listener("focus", function EmailTemplateCreateModalComponent_div_13_Template_input_focus_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.insertionTarget = "subject");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, EmailTemplateCreateModalComponent_div_13_p_12_Template, 2, 0, "p", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 19)(14, "div", 20)(15, "div", 21)(16, "label", 15);
    \u0275\u0275text(17, "Variables Disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "select", 22);
    \u0275\u0275twoWayListener("ngModelChange", function EmailTemplateCreateModalComponent_div_13_Template_select_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedVariableKey, $event) || (ctx_r1.selectedVariableKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(19, "option", 23);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, EmailTemplateCreateModalComponent_div_13_optgroup_21_Template, 2, 2, "optgroup", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 25)(23, "button", 26);
    \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_div_13_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.insertSelectedVariable());
    });
    \u0275\u0275text(24, " Insertar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 27);
    \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_div_13_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.insertionTarget = ctx_r1.insertionTarget === "subject" ? "bodyHtml" : "subject");
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(27, EmailTemplateCreateModalComponent_div_13_div_27_Template, 5, 1, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "label", 15);
    \u0275\u0275text(30, "Cuerpo del Correo (HTML)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "textarea", 29, 1);
    \u0275\u0275listener("focus", function EmailTemplateCreateModalComponent_div_13_Template_textarea_focus_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.insertionTarget = "bodyHtml");
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, EmailTemplateCreateModalComponent_div_13_p_33_Template, 2, 0, "p", 17);
    \u0275\u0275elementStart(34, "p", 30);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div")(37, "label", 15);
    \u0275\u0275text(38, "Variables Personalizadas (JSON opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "textarea", 31);
    \u0275\u0275elementStart(40, "p", 32);
    \u0275\u0275text(41, "\xDAsalas cuando el valor se capture manualmente al enviar el correo.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 33);
    \u0275\u0275element(43, "input", 34);
    \u0275\u0275elementStart(44, "label", 35);
    \u0275\u0275text(45, " Template activo ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_8_0;
    let tmp_16_0;
    let tmp_18_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-500", ((tmp_4_0 = ctx_r1.form.get("name")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.form.get("name")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r1.form.get("name")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.form.get("name")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-500", ((tmp_6_0 = ctx_r1.form.get("subject")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r1.form.get("subject")) == null ? null : tmp_6_0.touched));
    \u0275\u0275property("placeholder", ctx_r1.subjectPlaceholder);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ((tmp_8_0 = ctx_r1.form.get("subject")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r1.form.get("subject")) == null ? null : tmp_8_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedVariableKey);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(23, _c2));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.variablesLoading ? "Cargando variables..." : "Selecciona una variable");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.availableVariableGroups);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.selectedVariableKey);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Destino: ", ctx_r1.insertionTarget === "subject" ? "Asunto" : "Cuerpo", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getExtractedVariables().length > 0);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-500", ((tmp_16_0 = ctx_r1.form.get("bodyHtml")) == null ? null : tmp_16_0.invalid) && ((tmp_16_0 = ctx_r1.form.get("bodyHtml")) == null ? null : tmp_16_0.touched));
    \u0275\u0275property("placeholder", ctx_r1.bodyPlaceholder);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ((tmp_18_0 = ctx_r1.form.get("bodyHtml")) == null ? null : tmp_18_0.invalid) && ((tmp_18_0 = ctx_r1.form.get("bodyHtml")) == null ? null : tmp_18_0.touched));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4(" Tip: Escribe HTML v\xE1lido. Usa variables con punto, por ejemplo ", "{{", "customer.name", "}}", " o ", "{{", "payment.amount_pending", "}}", ". ");
  }
}
function EmailTemplateCreateModalComponent_div_14_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "p", 54)(2, "strong");
    \u0275\u0275text(3, "Variables faltantes:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.missingVariables.join(", "), " ");
  }
}
function EmailTemplateCreateModalComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 45)(2, "div")(3, "p", 46);
    \u0275\u0275text(4, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 47);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 26);
    \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_div_14_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.previewTemplate());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 48);
    \u0275\u0275element(10, "div", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, EmailTemplateCreateModalComponent_div_14_div_11_Template, 5, 1, "div", 50);
    \u0275\u0275elementStart(12, "div", 51)(13, "p", 52)(14, "strong");
    \u0275\u0275text(15, "Nota:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " Este preview usa datos de ejemplo. Al renderizar un template guardado, el backend reemplaza las variables con el contexto real. ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.previewSubject || ((tmp_1_0 = ctx_r1.form.get("subject")) == null ? null : tmp_1_0.value));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.previewLoading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.previewLoading ? "Generando..." : "Actualizar preview", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("innerHTML", ctx_r1.getPreviewHTML(), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.missingVariables.length > 0);
  }
}
var EmailTemplateCreateModalComponent = class _EmailTemplateCreateModalComponent {
  fb;
  emailTemplateService;
  interceptorService;
  sanitizer;
  dialogRef;
  data;
  subjectInput;
  bodyHtmlTextarea;
  form;
  loading = false;
  previewLoading = false;
  variablesLoading = false;
  isEdit = false;
  activeTab = "editor";
  insertionTarget = "bodyHtml";
  selectedVariableKey = "";
  subjectPlaceholder = "Ej: Recordatorio de pago - {{contract.contract_number}}";
  bodyPlaceholder = "<p>Hola {{customer.name}},</p><p>Tu pago pendiente es {{payment.amount_pending}}</p>";
  availableVariableGroups = [];
  previewSubject = "";
  previewBodyHtml = "";
  missingVariables = [];
  constructor(fb, emailTemplateService, interceptorService, sanitizer, dialogRef, data) {
    this.fb = fb;
    this.emailTemplateService = emailTemplateService;
    this.interceptorService = interceptorService;
    this.sanitizer = sanitizer;
    this.dialogRef = dialogRef;
    this.data = data;
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      subject: ["", [Validators.required, Validators.minLength(5)]],
      bodyHtml: ["", [Validators.required, Validators.minLength(10)]],
      customVariablesJson: [""],
      isActive: [true]
    });
  }
  ngOnInit() {
    this.loadAvailableVariables();
    if (this.data?.template) {
      const customVariables = this.data.template.custom_variables ?? this.data.template.customVariables ?? [];
      this.isEdit = true;
      this.form.patchValue({
        name: this.data.template.name,
        subject: this.data.template.subject,
        bodyHtml: this.getTemplateBody(this.data.template),
        customVariablesJson: customVariables.length ? JSON.stringify(customVariables, null, 2) : "",
        isActive: this.data.template.is_active
      });
    }
  }
  submit() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "error",
        title: "Error",
        message: "Por favor completa todos los campos requeridos"
      });
      return;
    }
    this.loading = true;
    const payload = this.buildPayload();
    if (!payload) {
      this.loading = false;
      return;
    }
    if (this.isEdit && this.data?.template) {
      this.emailTemplateService.updateEmailTemplate(this.data.template.id, payload).subscribe({
        next: (result) => {
          this.loading = false;
          this.interceptorService.openSnackbar({
            type: "success",
            title: "\xC9xito",
            message: "Template actualizado correctamente"
          });
          this.dialogRef.close(result);
        },
        error: (err) => {
          this.loading = false;
          this.interceptorService.openSnackbar({
            type: "error",
            title: "Error",
            message: err.error?.message || "Error al actualizar template"
          });
        }
      });
    } else {
      this.emailTemplateService.createEmailTemplate(payload).subscribe({
        next: (result) => {
          this.loading = false;
          this.interceptorService.openSnackbar({
            type: "success",
            title: "\xC9xito",
            message: "Template creado correctamente"
          });
          this.dialogRef.close(result);
        },
        error: (err) => {
          this.loading = false;
          this.interceptorService.openSnackbar({
            type: "error",
            title: "Error",
            message: err.error?.message || "Error al crear template"
          });
        }
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
  setActiveTab(tab) {
    this.activeTab = tab;
    if (tab === "preview") {
      this.previewTemplate();
    }
  }
  loadAvailableVariables() {
    this.variablesLoading = true;
    this.emailTemplateService.getAvailableVariables().subscribe({
      next: (groups) => {
        this.availableVariableGroups = groups ?? [];
        this.variablesLoading = false;
      },
      error: (err) => {
        console.error("Error loading email template variables:", err);
        this.variablesLoading = false;
      }
    });
  }
  insertSelectedVariable() {
    if (!this.selectedVariableKey) {
      return;
    }
    this.insertVariable(this.selectedVariableKey);
  }
  insertVariable(variableKey, target = this.insertionTarget) {
    const token = `{{${variableKey}}}`;
    const element = target === "subject" ? this.subjectInput?.nativeElement : this.bodyHtmlTextarea?.nativeElement;
    const currentValue = this.form.get(target)?.value ?? "";
    const start = element?.selectionStart ?? currentValue.length;
    const end = element?.selectionEnd ?? currentValue.length;
    const nextValue = `${currentValue.slice(0, start)}${token}${currentValue.slice(end)}`;
    this.form.get(target)?.setValue(nextValue);
    this.form.get(target)?.markAsDirty();
    this.form.get(target)?.markAsTouched();
    setTimeout(() => {
      element?.focus();
      element?.setSelectionRange(start + token.length, start + token.length);
    });
  }
  previewTemplate() {
    if (!this.form.get("subject")?.value || !this.form.get("bodyHtml")?.value) {
      return;
    }
    this.previewLoading = true;
    this.emailTemplateService.previewEmailTemplate({
      subject: this.form.get("subject")?.value,
      bodyHtml: this.form.get("bodyHtml")?.value,
      variables: this.buildSampleVariables()
    }).subscribe({
      next: (preview) => {
        this.previewSubject = preview.subject;
        this.previewBodyHtml = preview.bodyHtml;
        this.missingVariables = preview.missingVariables ?? [];
        this.previewLoading = false;
      },
      error: (err) => {
        console.error("Error previewing email template:", err);
        this.previewBodyHtml = this.form.get("bodyHtml")?.value ?? "";
        this.missingVariables = this.extractVariablesFromContent();
        this.previewLoading = false;
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al generar preview"
        });
      }
    });
  }
  getPreviewHTML() {
    const bodyValue = this.previewBodyHtml || this.form.get("bodyHtml")?.value || "";
    return this.sanitizer.bypassSecurityTrustHtml(bodyValue);
  }
  getAllVariables() {
    return this.availableVariableGroups.flatMap((group) => group.variables);
  }
  formatVariableToken(variableKey) {
    return `{{${variableKey}}}`;
  }
  getExtractedVariables() {
    return this.extractVariablesFromContent();
  }
  buildPayload() {
    const formValue = this.form.value;
    const customVariables = this.parseCustomVariables();
    if (customVariables === null) {
      return null;
    }
    return {
      name: formValue.name,
      subject: formValue.subject,
      bodyHtml: formValue.bodyHtml,
      variables: this.extractVariablesFromContent(),
      customVariables,
      isActive: formValue.isActive
    };
  }
  parseCustomVariables() {
    const rawValue = this.form.get("customVariablesJson")?.value?.trim();
    if (!rawValue) {
      return [];
    }
    try {
      const parsed = JSON.parse(rawValue);
      if (!Array.isArray(parsed)) {
        throw new Error("Custom variables must be an array");
      }
      return parsed;
    } catch {
      this.interceptorService.openSnackbar({
        type: "error",
        title: "Error",
        message: "Las variables personalizadas deben ser un arreglo JSON v\xE1lido"
      });
      return null;
    }
  }
  extractVariablesFromContent() {
    const content = `${this.form.get("subject")?.value ?? ""} ${this.form.get("bodyHtml")?.value ?? ""}`;
    const matches = content.match(/\{\{\s*([\w.]+)\s*\}\}/g) ?? [];
    const variables = matches.map((match) => match.replace(/[{}]/g, "").trim());
    return Array.from(new Set(variables));
  }
  buildSampleVariables() {
    const sampleVariables = {};
    const availableVariables = new Map(this.getAllVariables().map((variable) => [variable.key, variable]));
    this.extractVariablesFromContent().forEach((key) => {
      const variable = availableVariables.get(key);
      this.assignNestedValue(sampleVariables, key, this.getSampleValue(variable));
    });
    this.parseCustomVariables()?.forEach((variable) => {
      this.assignNestedValue(sampleVariables, variable.key, variable.defaultValue || this.getSampleValue(variable));
    });
    return sampleVariables;
  }
  assignNestedValue(target, key, value) {
    const parts = key.split(".");
    let current = target;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = value;
        return;
      }
      if (!current[part] || typeof current[part] !== "object") {
        current[part] = {};
      }
      current = current[part];
    });
  }
  getSampleValue(variable) {
    switch (variable?.type) {
      case "currency":
        return "$1,250.00";
      case "number":
        return "123";
      case "date":
        return "2026-05-19";
      case "boolean":
        return "S\xED";
      default:
        return variable?.label ? `Ejemplo ${variable.label}` : "Ejemplo";
    }
  }
  getTemplateBody(template) {
    return template.body_html ?? template.bodyHtml ?? template.body ?? "";
  }
  static \u0275fac = function EmailTemplateCreateModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailTemplateCreateModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(EmailTemplateService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(DomSanitizer), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmailTemplateCreateModalComponent, selectors: [["app-email-template-create-modal"]], viewQuery: function EmailTemplateCreateModalComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c06, 5)(_c12, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.subjectInput = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.bodyHtmlTextarea = _t.first);
    }
  }, decls: 20, vars: 25, consts: [["subjectInput", ""], ["bodyHtmlTextarea", ""], [1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-button", 3, "click"], [1, "text-2xl"], [1, "modal-body"], [1, "flex", "gap-4", "mb-6", "border-b", "border-gray-200"], [1, "px-4", "py-2", "font-medium", "text-sm", "border-b-2", "transition-colors", 3, "click"], ["class", "space-y-4", 4, "ngIf"], [1, "modal-footer"], ["type", "button", 1, "px-4", "py-2", "text-gray-700", "bg-gray-100", "hover:bg-gray-200", "rounded-md", "transition-colors", 3, "click"], ["type", "button", 1, "px-4", "py-2", "bg-indigo-600", "text-white", "hover:bg-indigo-700", "rounded-md", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "space-y-4"], [1, "space-y-4", 3, "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Confirmaci\xF3n de Pago", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["class", "text-xs text-red-500 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "subject", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "focus", "placeholder"], [1, "bg-gray-50", "p-3", "rounded", "border", "border-gray-200"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-end"], [1, "flex-1"], [1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["value", ""], [3, "label", 4, "ngFor", "ngForOf"], [1, "flex", "gap-2"], ["type", "button", 1, "px-3", "py-2", "bg-indigo-600", "text-white", "hover:bg-indigo-700", "rounded-md", "text-sm", "transition-colors", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", 1, "px-3", "py-2", "bg-white", "text-gray-700", "border", "border-gray-300", "hover:bg-gray-100", "rounded-md", "text-sm", "transition-colors", 3, "click"], ["class", "mt-3", 4, "ngIf"], ["formControlName", "bodyHtml", "rows", "12", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "font-mono", "text-sm", 3, "focus", "placeholder"], [1, "text-xs", "text-gray-500", "mt-2"], ["formControlName", "customVariablesJson", "rows", "4", "placeholder", '[{"key":"customMessage","label":"Mensaje personalizado","type":"string","required":false,"defaultValue":"Gracias"}]', 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "font-mono", "text-sm"], [1, "text-xs", "text-gray-500", "mt-1"], [1, "flex", "items-center"], ["type", "checkbox", "formControlName", "isActive", "id", "isActive", 1, "h-4", "w-4", "text-indigo-600", "focus:ring-indigo-500", "border-gray-300", "rounded"], ["for", "isActive", 1, "ml-2", "block", "text-sm", "text-gray-700"], [1, "text-xs", "text-red-500", "mt-1"], [3, "label"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "mt-3"], [1, "text-xs", "font-medium", "text-gray-600", "mb-1"], [1, "flex", "flex-wrap", "gap-2"], ["class", "px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs", 4, "ngFor", "ngForOf"], [1, "px-2", "py-1", "rounded", "bg-indigo-100", "text-indigo-700", "text-xs"], [1, "flex", "justify-between", "items-center"], [1, "text-sm", "font-medium", "text-gray-700"], [1, "text-sm", "text-gray-900"], [1, "bg-white", "p-4", "rounded", "border", "border-gray-200", "min-h-64", "max-h-96", "overflow-y-auto"], [1, "text-sm", "text-gray-700", "prose", "prose-sm", "max-w-none", 3, "innerHTML"], ["class", "bg-yellow-50 p-3 rounded border border-yellow-200", 4, "ngIf"], [1, "bg-blue-50", "p-3", "rounded", "border", "border-blue-200"], [1, "text-xs", "text-blue-700"], [1, "bg-yellow-50", "p-3", "rounded", "border", "border-yellow-200"], [1, "text-xs", "text-yellow-800"]], template: function EmailTemplateCreateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementStart(5, "span", 5);
      \u0275\u0275text(6, "\xD7");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "button", 8);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_9_listener() {
        return ctx.setActiveTab("editor");
      });
      \u0275\u0275text(10, " Editor ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 8);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_11_listener() {
        return ctx.setActiveTab("preview");
      });
      \u0275\u0275text(12, " Preview ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(13, EmailTemplateCreateModalComponent_div_13_Template, 46, 24, "div", 9)(14, EmailTemplateCreateModalComponent_div_14_Template, 17, 5, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 10)(16, "button", 11);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_16_listener() {
        return ctx.close();
      });
      \u0275\u0275text(17, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 12);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_18_listener() {
        return ctx.submit();
      });
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isEdit ? "Editar Template" : "Crear Template de Correo");
      \u0275\u0275advance(6);
      \u0275\u0275classProp("tab-active", ctx.activeTab === "editor")("border-indigo-600", ctx.activeTab === "editor")("border-transparent", ctx.activeTab !== "editor")("text-indigo-600", ctx.activeTab === "editor")("text-gray-600", ctx.activeTab !== "editor");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("tab-active", ctx.activeTab === "preview")("border-indigo-600", ctx.activeTab === "preview")("border-transparent", ctx.activeTab !== "preview")("text-indigo-600", ctx.activeTab === "preview")("text-gray-600", ctx.activeTab !== "preview");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.activeTab === "editor");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab === "preview");
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading || ctx.form.invalid);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Guardando..." : ctx.isEdit ? "Actualizar" : "Crear", " ");
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=email-template-create-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailTemplateCreateModalComponent, [{
    type: Component,
    args: [{ selector: "app-email-template-create-modal", standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule], template: `<div class="modal-container">
  <div class="modal-header">
    <h2>{{ isEdit ? 'Editar Template' : 'Crear Template de Correo' }}</h2>
    <button (click)="close()" class="close-button" type="button">
      <span class="text-2xl">&times;</span>
    </button>
  </div>

  <div class="modal-body">
    <!-- Tabs -->
    <div class="flex gap-4 mb-6 border-b border-gray-200">
      <button
        (click)="setActiveTab('editor')"
        [class.tab-active]="activeTab === 'editor'"
        class="px-4 py-2 font-medium text-sm border-b-2 transition-colors"
        [class.border-indigo-600]="activeTab === 'editor'"
        [class.border-transparent]="activeTab !== 'editor'"
        [class.text-indigo-600]="activeTab === 'editor'"
        [class.text-gray-600]="activeTab !== 'editor'">
        Editor
      </button>
      <button
        (click)="setActiveTab('preview')"
        [class.tab-active]="activeTab === 'preview'"
        class="px-4 py-2 font-medium text-sm border-b-2 transition-colors"
        [class.border-indigo-600]="activeTab === 'preview'"
        [class.border-transparent]="activeTab !== 'preview'"
        [class.text-indigo-600]="activeTab === 'preview'"
        [class.text-gray-600]="activeTab !== 'preview'">
        Preview
      </button>
    </div>

    <!-- Editor Tab -->
    <div *ngIf="activeTab === 'editor'" class="space-y-4">
      <form [formGroup]="form" class="space-y-4">
        <!-- Nombre -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Template</label>
          <input
            type="text"
            formControlName="name"
            placeholder="Ej: Confirmaci\xF3n de Pago"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            [class.border-red-500]="form.get('name')?.invalid && form.get('name')?.touched">
          <p *ngIf="form.get('name')?.invalid && form.get('name')?.touched" class="text-xs text-red-500 mt-1">
            El nombre es requerido (m\xEDnimo 3 caracteres)
          </p>
        </div>

        <!-- Asunto -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Asunto del Correo</label>
          <input
            #subjectInput
            type="text"
            formControlName="subject"
            [placeholder]="subjectPlaceholder"
            (focus)="insertionTarget = 'subject'"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            [class.border-red-500]="form.get('subject')?.invalid && form.get('subject')?.touched">
          <p *ngIf="form.get('subject')?.invalid && form.get('subject')?.touched" class="text-xs text-red-500 mt-1">
            El asunto es requerido (m\xEDnimo 5 caracteres)
          </p>
        </div>

        <!-- Variables disponibles -->
        <div class="bg-gray-50 p-3 rounded border border-gray-200">
          <div class="flex flex-col gap-3 md:flex-row md:items-end">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Variables Disponibles</label>
              <select
                [(ngModel)]="selectedVariableKey"
                [ngModelOptions]="{ standalone: true }"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">{{ variablesLoading ? 'Cargando variables...' : 'Selecciona una variable' }}</option>
                <optgroup *ngFor="let group of availableVariableGroups" [label]="group.label">
                  <option *ngFor="let variable of group.variables" [value]="variable.key">
                    {{ variable.label }} - {{ formatVariableToken(variable.key) }}
                  </option>
                </optgroup>
              </select>
            </div>

            <div class="flex gap-2">
              <button
                type="button"
                (click)="insertSelectedVariable()"
                [disabled]="!selectedVariableKey"
                class="px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md text-sm transition-colors disabled:opacity-50">
                Insertar
              </button>
              <button
                type="button"
                (click)="insertionTarget = insertionTarget === 'subject' ? 'bodyHtml' : 'subject'"
                class="px-3 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-md text-sm transition-colors">
                Destino: {{ insertionTarget === 'subject' ? 'Asunto' : 'Cuerpo' }}
              </button>
            </div>
          </div>

          <div *ngIf="getExtractedVariables().length > 0" class="mt-3">
            <p class="text-xs font-medium text-gray-600 mb-1">Variables detectadas:</p>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let variable of getExtractedVariables()" class="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs">
                {{ variable }}
              </span>
            </div>
          </div>
        </div>

        <!-- Cuerpo del Correo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cuerpo del Correo (HTML)</label>
          <textarea
            #bodyHtmlTextarea
            formControlName="bodyHtml"
            [placeholder]="bodyPlaceholder"
            (focus)="insertionTarget = 'bodyHtml'"
            rows="12"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            [class.border-red-500]="form.get('bodyHtml')?.invalid && form.get('bodyHtml')?.touched"></textarea>
          <p *ngIf="form.get('bodyHtml')?.invalid && form.get('bodyHtml')?.touched" class="text-xs text-red-500 mt-1">
            El cuerpo es requerido (m\xEDnimo 10 caracteres)
          </p>
          <p class="text-xs text-gray-500 mt-2">
            Tip: Escribe HTML v\xE1lido. Usa variables con punto, por ejemplo {{'{{'}}customer.name{{'}}'}} o {{'{{'}}payment.amount_pending{{'}}'}}.
          </p>
        </div>

        <!-- Variables personalizadas -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Variables Personalizadas (JSON opcional)</label>
          <textarea
            formControlName="customVariablesJson"
            rows="4"
            placeholder='[{"key":"customMessage","label":"Mensaje personalizado","type":"string","required":false,"defaultValue":"Gracias"}]'
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"></textarea>
          <p class="text-xs text-gray-500 mt-1">\xDAsalas cuando el valor se capture manualmente al enviar el correo.</p>
        </div>

        <!-- Activo -->
        <div class="flex items-center">
          <input
            type="checkbox"
            formControlName="isActive"
            id="isActive"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="isActive" class="ml-2 block text-sm text-gray-700">
            Template activo
          </label>
        </div>
      </form>
    </div>

    <!-- Preview Tab -->
    <div *ngIf="activeTab === 'preview'" class="space-y-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm font-medium text-gray-700">Asunto</p>
          <p class="text-sm text-gray-900">{{ previewSubject || form.get('subject')?.value }}</p>
        </div>
        <button
          type="button"
          (click)="previewTemplate()"
          [disabled]="previewLoading"
          class="px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md text-sm transition-colors disabled:opacity-50">
          {{ previewLoading ? 'Generando...' : 'Actualizar preview' }}
        </button>
      </div>

      <div class="bg-white p-4 rounded border border-gray-200 min-h-64 max-h-96 overflow-y-auto">
        <div [innerHTML]="getPreviewHTML()" class="text-sm text-gray-700 prose prose-sm max-w-none"></div>
      </div>

      <div *ngIf="missingVariables.length > 0" class="bg-yellow-50 p-3 rounded border border-yellow-200">
        <p class="text-xs text-yellow-800">
          <strong>Variables faltantes:</strong> {{ missingVariables.join(', ') }}
        </p>
      </div>

      <div class="bg-blue-50 p-3 rounded border border-blue-200">
        <p class="text-xs text-blue-700">
          <strong>Nota:</strong> Este preview usa datos de ejemplo. Al renderizar un template guardado, el backend reemplaza las variables con el contexto real.
        </p>
      </div>
    </div>
  </div>

  <div class="modal-footer">
    <button
      (click)="close()"
      type="button"
      class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
      Cancelar
    </button>
    <button
      (click)="submit()"
      [disabled]="loading || form.invalid"
      type="button"
      class="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
      {{ loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear') }}
    </button>
  </div>
</div>
`, styles: ["/* src/app/features/settings/components/email-template-create-modal/email-template-create-modal.component.scss */\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header .close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.modal-header .close-button:hover {\n  color: #111827;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=email-template-create-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: EmailTemplateService }, { type: InterceptorService }, { type: DomSanitizer }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], { subjectInput: [{
    type: ViewChild,
    args: ["subjectInput"]
  }], bodyHtmlTextarea: [{
    type: ViewChild,
    args: ["bodyHtmlTextarea"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmailTemplateCreateModalComponent, { className: "EmailTemplateCreateModalComponent", filePath: "src/app/features/settings/components/email-template-create-modal/email-template-create-modal.component.ts", lineNumber: 23 });
})();

// src/app/features/settings/pages/email-templates-list/email-templates-list.component.ts
var _c07 = ["tableTemplate"];
function EmailTemplatesListComponent_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "p", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "span", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span", 14);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span", 15);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "div", 16)(15, "button", 17);
    \u0275\u0275listener("click", function EmailTemplatesListComponent_ng_template_15_Template_button_click_15_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.editTemplate(item_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(16, "lucide-icon", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 19);
    \u0275\u0275listener("click", function EmailTemplatesListComponent_ng_template_15_Template_button_click_17_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.deleteTemplate(item_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(18, "lucide-icon", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.subject);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.getStatusClass(item_r3.is_active));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(item_r3.is_active), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 9, item_r3.created_at, "mediumDate"));
    \u0275\u0275advance(5);
    \u0275\u0275property("img", ctx_r3.Edit2)("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.Trash2)("size", 16);
  }
}
var EmailTemplatesListComponent = class _EmailTemplatesListComponent {
  emailTemplateService;
  dialog;
  tableTemplate;
  templates = [];
  loading = false;
  search = "";
  isActiveFilter = void 0;
  hasPaginated = false;
  destroy$ = new Subject();
  table_config = signal({
    rows: [],
    columns: [
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true, width: 150 },
      { name: "Asunto", prop: "subject", sortable: true, canAutoResize: true, width: 250 },
      { name: "Estado", prop: "is_active", sortable: true, canAutoResize: true, width: 100 },
      { name: "Creado", prop: "created_at", sortable: true, canAutoResize: true, width: 150 },
      { name: "Acciones", prop: "actions", sortable: false, canAutoResize: true, width: 120 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 10,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron templates de correo" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  Edit2 = Pen;
  Trash2 = Trash2;
  constructor(emailTemplateService, dialog) {
    this.emailTemplateService = emailTemplateService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadTemplates();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadTemplates() {
    this.loading = true;
    this.updateTableConfig({ loading: true });
    const params = this.buildQueryParams();
    this.emailTemplateService.getEmailTemplates(params).subscribe({
      next: (res) => {
        const templates = res?.data ?? [];
        this.templates = templates;
        this.updateTableConfig({
          rows: templates,
          totalResults: res?.total ?? templates.length,
          page: res?.page ?? this.table_config().page,
          limit: res?.limit ?? this.table_config().limit,
          hasNext: (res?.page ?? 1) < (res?.totalPages ?? 1),
          loading: false
        });
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading templates:", err);
        this.loading = false;
        this.updateTableConfig({ loading: false });
      }
    });
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.updateTableConfig({ page: 1 });
    this.hasPaginated = true;
    this.loadTemplates();
  }
  onStatusFilterChange(value) {
    this.isActiveFilter = value === "" ? void 0 : value === "true";
    this.updateTableConfig({ page: 1 });
    this.hasPaginated = true;
    this.loadTemplates();
  }
  onPageChange(event) {
    this.updateTableConfig({
      page: event.page,
      limit: event.limit
    });
    this.hasPaginated = true;
    this.loadTemplates();
  }
  openCreateModal() {
    const dialogRef = this.dialog.open(EmailTemplateCreateModalComponent, {
      width: "900px",
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTemplates();
      }
    });
  }
  editTemplate(template) {
    const dialogRef = this.dialog.open(EmailTemplateCreateModalComponent, {
      width: "900px",
      disableClose: false,
      data: { template }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTemplates();
      }
    });
  }
  deleteTemplate(template) {
    if (!confirm(`\xBFEliminar el template "${template.name}"?`))
      return;
    this.emailTemplateService.deleteEmailTemplate(template.id).subscribe({
      next: () => {
        this.loadTemplates();
      },
      error: (err) => {
        console.error("Error deleting template:", err);
      }
    });
  }
  getStatusClass(isActive) {
    return isActive ? "settings-badge--status-active" : "settings-badge--status-inactive";
  }
  getStatusLabel(isActive) {
    return isActive ? "Activo" : "Inactivo";
  }
  buildQueryParams() {
    const hasSearch = Boolean(this.search?.trim());
    const hasStatusFilter = this.isActiveFilter !== void 0;
    if (!this.hasPaginated && !hasSearch && !hasStatusFilter) {
      return void 0;
    }
    return __spreadValues(__spreadValues({
      page: this.table_config().page,
      limit: this.table_config().limit
    }, hasSearch && { search: this.search.trim() }), hasStatusFilter && { isActive: this.isActiveFilter });
  }
  updateTableConfig(config) {
    this.table_config.update((current) => __spreadValues(__spreadValues({}, current), config));
  }
  static \u0275fac = function EmailTemplatesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailTemplatesListComponent)(\u0275\u0275directiveInject(EmailTemplateService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmailTemplatesListComponent, selectors: [["app-email-templates-list"]], viewQuery: function EmailTemplatesListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c07, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 17, vars: 3, consts: [["tableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-wrap", "items-center", "gap-3"], ["param_name", "search", 1, "w-64", 3, "searchChange", "param_activate"], [1, "px-3", "py-2", "border", "border-gray-300", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "change"], ["value", ""], ["value", "true"], ["value", "false"], ["text", "Crear Template", "custom_class", "btn_primary", 3, "clicked"], ["variant", "settings", 3, "pageChange", "config", "rowTemplate"], [1, "settings-cell-primary", "truncate"], [1, "settings-cell-text", "truncate"], [1, "settings-badge", 3, "ngClass"], [1, "settings-cell-text"], [1, "flex", "gap-2"], ["title", "Editar", 1, "p-1.5", "text-gray-600", "hover:text-white", "hover:bg-gray-600", "rounded-md", "transition-all", "duration-200", 3, "click"], [3, "img", "size"], ["title", "Eliminar", 1, "p-1.5", "text-red-600", "hover:text-white", "hover:bg-red-600", "rounded-md", "transition-all", "duration-200", 3, "click"]], template: function EmailTemplatesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
      \u0275\u0275text(3, "Templates de Correo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "app-search", 5);
      \u0275\u0275listener("searchChange", function EmailTemplatesListComponent_Template_app_search_searchChange_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "select", 6);
      \u0275\u0275listener("change", function EmailTemplatesListComponent_Template_select_change_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onStatusFilterChange($event.target.value));
      });
      \u0275\u0275elementStart(7, "option", 7);
      \u0275\u0275text(8, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "option", 8);
      \u0275\u0275text(10, "Activos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "option", 9);
      \u0275\u0275text(12, "Inactivos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "app-button", 10);
      \u0275\u0275listener("clicked", function EmailTemplatesListComponent_Template_app_button_clicked_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateModal());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "app-datatable-wrapper", 11);
      \u0275\u0275listener("pageChange", function EmailTemplatesListComponent_Template_app_datatable_wrapper_pageChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(15, EmailTemplatesListComponent_ng_template_15_Template, 19, 12, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r5 = \u0275\u0275reference(16);
      \u0275\u0275advance(5);
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(9);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r5);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    SearchComponent,
    ButtonComponent,
    DatatableWrapperComponent,
    LucideAngularModule,
    LucideAngularComponent,
    DatePipe
  ], styles: ["\n\n.settings-cell-primary[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national[_ngcontent-%COMP%] {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international[_ngcontent-%COMP%] {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n/*# sourceMappingURL=email-templates-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailTemplatesListComponent, [{
    type: Component,
    args: [{ selector: "app-email-templates-list", standalone: true, imports: [
      CommonModule,
      SearchComponent,
      ButtonComponent,
      DatatableWrapperComponent,
      LucideAngularModule
    ], template: `<div class="settings-list-page px-4 pb-6">
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
    <h2 class="text-2xl font-semibold text-gray-800">Templates de Correo</h2>

    <div class="flex flex-wrap items-center gap-3">
      <app-search
        class="w-64"
        [param_activate]="true"
        param_name="search"
        (searchChange)="onSearchChange($event)">
      </app-search>

      <select
        class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        (change)="onStatusFilterChange($any($event.target).value)">
        <option value="">Todos</option>
        <option value="true">Activos</option>
        <option value="false">Inactivos</option>
      </select>

      <app-button
        text="Crear Template"
        custom_class="btn_primary"
        (clicked)="openCreateModal()">
      </app-button>
    </div>
  </div>

  <app-datatable-wrapper
    variant="settings"
    [config]="table_config()"
    [rowTemplate]="tableTemplate"
    (pageChange)="onPageChange($event)">
  </app-datatable-wrapper>
</div>

<ng-template #tableTemplate let-item="$implicit">
  <td>
    <p class="settings-cell-primary truncate">{{ item.name }}</p>
  </td>
  <td>
    <span class="settings-cell-text truncate">{{ item.subject }}</span>
  </td>
  <td>
    <span class="settings-badge" [ngClass]="getStatusClass(item.is_active)">
      {{ getStatusLabel(item.is_active) }}
    </span>
  </td>
  <td>
    <span class="settings-cell-text">{{ item.created_at | date:'mediumDate' }}</span>
  </td>
  <td>
    <div class="flex gap-2">
      <button
        (click)="editTemplate(item); $event.stopPropagation()"
        class="p-1.5 text-gray-600 hover:text-white hover:bg-gray-600 rounded-md transition-all duration-200"
        title="Editar">
        <lucide-icon [img]="Edit2" [size]="16"></lucide-icon>
      </button>
      <button
        (click)="deleteTemplate(item); $event.stopPropagation()"
        class="p-1.5 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-all duration-200"
        title="Eliminar">
        <lucide-icon [img]="Trash2" [size]="16"></lucide-icon>
      </button>
    </div>
  </td>
</ng-template>
`, styles: ["/* src/app/features/settings/pages/email-templates-list/email-templates-list.component.scss */\n.settings-cell-primary {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n/*# sourceMappingURL=email-templates-list.component.css.map */\n"] }]
  }], () => [{ type: EmailTemplateService }, { type: MatDialog }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmailTemplatesListComponent, { className: "EmailTemplatesListComponent", filePath: "src/app/features/settings/pages/email-templates-list/email-templates-list.component.ts", lineNumber: 28 });
})();

// src/app/features/settings/services/mailer-configuration.service.ts
var MailerConfigurationService = class _MailerConfigurationService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getMailerConfigurations() {
    return this.http.get(`${this.api}/tenant/mailer-configurations`);
  }
  getActiveMailerConfiguration() {
    return this.http.get(`${this.api}/tenant/mailer-configurations/active`);
  }
  createMailerConfiguration(data) {
    return this.http.post(`${this.api}/tenant/mailer-configurations`, data);
  }
  updateMailerConfiguration(id, data) {
    return this.http.patch(`${this.api}/tenant/mailer-configurations/${id}`, data);
  }
  activateMailerConfiguration(id) {
    return this.http.post(`${this.api}/tenant/mailer-configurations/${id}/activate`, {});
  }
  deleteMailerConfiguration(id) {
    return this.http.delete(`${this.api}/tenant/mailer-configurations/${id}`);
  }
  static \u0275fac = function MailerConfigurationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MailerConfigurationService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MailerConfigurationService, factory: _MailerConfigurationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MailerConfigurationService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/settings/components/mailer-configuration-modal/mailer-configuration-modal.component.ts
function MailerConfigurationModalComponent_p_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " El nombre es requerido (m\xEDnimo 3 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function MailerConfigurationModalComponent_p_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " El API key es requerido ");
    \u0275\u0275elementEnd();
  }
}
function MailerConfigurationModalComponent_p_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " Ingresa un correo remitente v\xE1lido ");
    \u0275\u0275elementEnd();
  }
}
function MailerConfigurationModalComponent_p_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " Ingresa un correo v\xE1lido ");
    \u0275\u0275elementEnd();
  }
}
var MailerConfigurationModalComponent = class _MailerConfigurationModalComponent {
  fb;
  mailerConfigurationService;
  interceptorService;
  dialogRef;
  data;
  form;
  loading = false;
  isEdit = false;
  constructor(fb, mailerConfigurationService, interceptorService, dialogRef, data) {
    this.fb = fb;
    this.mailerConfigurationService = mailerConfigurationService;
    this.interceptorService = interceptorService;
    this.dialogRef = dialogRef;
    this.data = data;
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      apiKey: ["", [Validators.required]],
      fromEmail: ["", [Validators.required, Validators.email]],
      fromName: [""],
      replyTo: ["", [Validators.email]],
      isActive: [true]
    });
  }
  ngOnInit() {
    if (this.data?.configuration) {
      const vendorConfig = this.getVendorConfig(this.data.configuration);
      this.isEdit = true;
      this.form.get("apiKey")?.clearValidators();
      this.form.get("apiKey")?.updateValueAndValidity();
      this.form.patchValue({
        name: this.data.configuration.name,
        apiKey: "",
        fromEmail: vendorConfig.fromEmail ?? "",
        fromName: vendorConfig.fromName ?? "",
        replyTo: vendorConfig.replyTo ?? "",
        isActive: this.isConfigurationActive(this.data.configuration)
      });
    }
  }
  submit() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "error",
        title: "Error",
        message: "Completa los campos requeridos"
      });
      return;
    }
    this.loading = true;
    const formValue = this.form.value;
    const request$ = this.isEdit && this.data?.configuration ? this.mailerConfigurationService.updateMailerConfiguration(this.data.configuration.id, this.buildUpdatePayload()) : this.mailerConfigurationService.createMailerConfiguration(this.buildCreatePayload(formValue));
    request$.subscribe({
      next: (result) => {
        if (formValue.isActive) {
          this.activateAndClose(result);
          return;
        }
        this.finishSuccessfully(result);
      },
      error: (err) => {
        this.loading = false;
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al guardar configuraci\xF3n"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  buildCreatePayload(formValue) {
    return {
      name: formValue.name,
      vendor: "resend",
      vendorConfig: this.buildVendorConfig(formValue, true),
      apiKey: formValue.apiKey,
      isActive: formValue.isActive
    };
  }
  buildUpdatePayload() {
    const formValue = this.form.value;
    const payload = {
      name: formValue.name,
      vendorConfig: this.buildVendorConfig(formValue, Boolean(formValue.apiKey?.trim())),
      isActive: formValue.isActive
    };
    if (formValue.apiKey?.trim()) {
      payload.apiKey = formValue.apiKey.trim();
    }
    return payload;
  }
  buildVendorConfig(formValue, includeApiKey) {
    return __spreadValues(__spreadValues(__spreadProps(__spreadValues({}, includeApiKey && { apiKey: formValue.apiKey.trim() }), {
      fromEmail: formValue.fromEmail.trim()
    }), formValue.fromName?.trim() && { fromName: formValue.fromName.trim() }), formValue.replyTo?.trim() && { replyTo: formValue.replyTo.trim() });
  }
  activateAndClose(configuration) {
    const configurationId = configuration?.id ?? this.data?.configuration?.id;
    if (!configurationId) {
      this.finishSuccessfully(configuration);
      return;
    }
    this.mailerConfigurationService.activateMailerConfiguration(configurationId).subscribe({
      next: (activatedConfiguration) => {
        this.finishSuccessfully(activatedConfiguration);
      },
      error: (err) => {
        this.loading = false;
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "La configuraci\xF3n se guard\xF3, pero no se pudo activar"
        });
      }
    });
  }
  finishSuccessfully(configuration) {
    this.loading = false;
    this.interceptorService.openSnackbar({
      type: "success",
      title: "\xC9xito",
      message: this.isEdit ? "Configuraci\xF3n actualizada correctamente" : "Configuraci\xF3n creada correctamente"
    });
    this.dialogRef.close(configuration);
  }
  isConfigurationActive(configuration) {
    return Boolean(configuration.is_active ?? configuration.isActive);
  }
  getVendorConfig(configuration) {
    return configuration.vendorConfig ?? configuration.vendor_config ?? {};
  }
  static \u0275fac = function MailerConfigurationModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MailerConfigurationModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MailerConfigurationService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MailerConfigurationModalComponent, selectors: [["app-mailer-configuration-modal"]], decls: 52, vars: 18, consts: [[1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-button", 3, "click"], [1, "text-2xl"], [1, "modal-body"], [1, "space-y-4", 3, "formGroup"], [1, "bg-blue-50", "p-3", "rounded", "border", "border-blue-200"], [1, "text-xs", "text-blue-700"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Resend Producci\xF3n", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["class", "text-xs text-red-500 mt-1", 4, "ngIf"], ["type", "text", "value", "resend", "disabled", "", 1, "w-full", "px-3", "py-2", "border", "border-gray-200", "rounded-md", "bg-gray-100", "text-gray-600"], ["type", "password", "formControlName", "apiKey", "autocomplete", "new-password", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", 3, "placeholder"], ["type", "email", "formControlName", "fromEmail", "placeholder", "noreply@tu-dominio.com", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["type", "text", "formControlName", "fromName", "placeholder", "Synergy ERP", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["type", "email", "formControlName", "replyTo", "placeholder", "soporte@tu-dominio.com", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], [1, "flex", "items-center"], ["type", "checkbox", "formControlName", "isActive", "id", "isActive", 1, "h-4", "w-4", "text-indigo-600", "focus:ring-indigo-500", "border-gray-300", "rounded"], ["for", "isActive", 1, "ml-2", "block", "text-sm", "text-gray-700"], [1, "modal-footer"], ["type", "button", 1, "px-4", "py-2", "text-gray-700", "bg-gray-100", "hover:bg-gray-200", "rounded-md", "transition-colors", 3, "click"], ["type", "button", 1, "px-4", "py-2", "bg-indigo-600", "text-white", "hover:bg-indigo-700", "rounded-md", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "text-xs", "text-red-500", "mt-1"]], template: function MailerConfigurationModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function MailerConfigurationModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6, "\xD7");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 4)(8, "form", 5)(9, "div", 6)(10, "p", 7);
      \u0275\u0275text(11, " Por ahora el proveedor soportado es ");
      \u0275\u0275elementStart(12, "strong");
      \u0275\u0275text(13, "Resend");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14, ". El API key se guarda de forma segura. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div")(16, "label", 8);
      \u0275\u0275text(17, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "input", 9);
      \u0275\u0275template(19, MailerConfigurationModalComponent_p_19_Template, 2, 0, "p", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div")(21, "label", 8);
      \u0275\u0275text(22, "Proveedor");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "input", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div")(25, "label", 8);
      \u0275\u0275text(26, "Resend API Key");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 12);
      \u0275\u0275template(28, MailerConfigurationModalComponent_p_28_Template, 2, 0, "p", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div")(30, "label", 8);
      \u0275\u0275text(31, "Correo Remitente");
      \u0275\u0275elementEnd();
      \u0275\u0275element(32, "input", 13);
      \u0275\u0275template(33, MailerConfigurationModalComponent_p_33_Template, 2, 0, "p", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div")(35, "label", 8);
      \u0275\u0275text(36, "Nombre Remitente (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(37, "input", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div")(39, "label", 8);
      \u0275\u0275text(40, "Responder A (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(41, "input", 15);
      \u0275\u0275template(42, MailerConfigurationModalComponent_p_42_Template, 2, 0, "p", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 16);
      \u0275\u0275element(44, "input", 17);
      \u0275\u0275elementStart(45, "label", 18);
      \u0275\u0275text(46, " Mantener activa ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(47, "div", 19)(48, "button", 20);
      \u0275\u0275listener("click", function MailerConfigurationModalComponent_Template_button_click_48_listener() {
        return ctx.close();
      });
      \u0275\u0275text(49, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "button", 21);
      \u0275\u0275listener("click", function MailerConfigurationModalComponent_Template_button_click_50_listener() {
        return ctx.submit();
      });
      \u0275\u0275text(51);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      let tmp_10_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isEdit ? "Editar Configuraci\xF3n de Correo" : "Crear Configuraci\xF3n de Correo");
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-red-500", ((tmp_2_0 = ctx.form.get("name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("name")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("name")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275classProp("border-red-500", ((tmp_4_0 = ctx.form.get("apiKey")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("apiKey")) == null ? null : tmp_4_0.touched));
      \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx.isEdit ? "Dejar vac\xEDo para conservar el token actual" : "re_xxxxxxxxxxxxxxxxx"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.form.get("apiKey")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.form.get("apiKey")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275classProp("border-red-500", ((tmp_7_0 = ctx.form.get("fromEmail")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("fromEmail")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("fromEmail")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("fromEmail")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275classProp("border-red-500", ((tmp_9_0 = ctx.form.get("replyTo")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.form.get("replyTo")) == null ? null : tmp_9_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_10_0 = ctx.form.get("replyTo")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx.form.get("replyTo")) == null ? null : tmp_10_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275property("disabled", ctx.loading || ctx.form.invalid);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Guardando..." : ctx.isEdit ? "Actualizar" : "Crear", " ");
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=mailer-configuration-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MailerConfigurationModalComponent, [{
    type: Component,
    args: [{ selector: "app-mailer-configuration-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <h2>{{ isEdit ? 'Editar Configuraci\xF3n de Correo' : 'Crear Configuraci\xF3n de Correo' }}</h2>\r
    <button (click)="close()" class="close-button" type="button">\r
      <span class="text-2xl">&times;</span>\r
    </button>\r
  </div>\r
\r
  <div class="modal-body">\r
    <form [formGroup]="form" class="space-y-4">\r
      <div class="bg-blue-50 p-3 rounded border border-blue-200">\r
        <p class="text-xs text-blue-700">\r
          Por ahora el proveedor soportado es <strong>Resend</strong>. El API key se guarda de forma segura.\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>\r
        <input\r
          type="text"\r
          formControlName="name"\r
          placeholder="Ej: Resend Producci\xF3n"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"\r
          [class.border-red-500]="form.get('name')?.invalid && form.get('name')?.touched">\r
        <p *ngIf="form.get('name')?.invalid && form.get('name')?.touched" class="text-xs text-red-500 mt-1">\r
          El nombre es requerido (m\xEDnimo 3 caracteres)\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>\r
        <input\r
          type="text"\r
          value="resend"\r
          disabled\r
          class="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600">\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Resend API Key</label>\r
        <input\r
          type="password"\r
          formControlName="apiKey"\r
          placeholder="{{ isEdit ? 'Dejar vac\xEDo para conservar el token actual' : 're_xxxxxxxxxxxxxxxxx' }}"\r
          autocomplete="new-password"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"\r
          [class.border-red-500]="form.get('apiKey')?.invalid && form.get('apiKey')?.touched">\r
        <p *ngIf="form.get('apiKey')?.invalid && form.get('apiKey')?.touched" class="text-xs text-red-500 mt-1">\r
          El API key es requerido\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Correo Remitente</label>\r
        <input\r
          type="email"\r
          formControlName="fromEmail"\r
          placeholder="noreply@tu-dominio.com"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"\r
          [class.border-red-500]="form.get('fromEmail')?.invalid && form.get('fromEmail')?.touched">\r
        <p *ngIf="form.get('fromEmail')?.invalid && form.get('fromEmail')?.touched" class="text-xs text-red-500 mt-1">\r
          Ingresa un correo remitente v\xE1lido\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Remitente (Opcional)</label>\r
        <input\r
          type="text"\r
          formControlName="fromName"\r
          placeholder="Synergy ERP"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Responder A (Opcional)</label>\r
        <input\r
          type="email"\r
          formControlName="replyTo"\r
          placeholder="soporte@tu-dominio.com"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"\r
          [class.border-red-500]="form.get('replyTo')?.invalid && form.get('replyTo')?.touched">\r
        <p *ngIf="form.get('replyTo')?.invalid && form.get('replyTo')?.touched" class="text-xs text-red-500 mt-1">\r
          Ingresa un correo v\xE1lido\r
        </p>\r
      </div>\r
\r
      <div class="flex items-center">\r
        <input\r
          type="checkbox"\r
          formControlName="isActive"\r
          id="isActive"\r
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">\r
        <label for="isActive" class="ml-2 block text-sm text-gray-700">\r
          Mantener activa\r
        </label>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="modal-footer">\r
    <button\r
      (click)="close()"\r
      type="button"\r
      class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">\r
      Cancelar\r
    </button>\r
    <button\r
      (click)="submit()"\r
      [disabled]="loading || form.invalid"\r
      type="button"\r
      class="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">\r
      {{ loading ? 'Guardando...' : (isEdit ? 'Actualizar' : 'Crear') }}\r
    </button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/mailer-configuration-modal/mailer-configuration-modal.component.scss */\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header .close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.modal-header .close-button:hover {\n  color: #111827;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=mailer-configuration-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MailerConfigurationService }, { type: InterceptorService }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MailerConfigurationModalComponent, { className: "MailerConfigurationModalComponent", filePath: "src/app/features/settings/components/mailer-configuration-modal/mailer-configuration-modal.component.ts", lineNumber: 16 });
})();

// src/app/features/settings/pages/mailer-configurations-list/mailer-configurations-list.component.ts
var _c08 = ["tableTemplate"];
function MailerConfigurationsListComponent_ng_template_9_lucide_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 18);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("img", ctx_r2.CheckCircle2)("size", 15);
  }
}
function MailerConfigurationsListComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "div", 7)(2, "p", 8);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, MailerConfigurationsListComponent_ng_template_9_lucide_icon_4_Template, 1, 2, "lucide-icon", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td")(6, "span", 10);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "span", 11);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td")(12, "span", 12);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td")(16, "div", 13)(17, "button", 14);
    \u0275\u0275listener("click", function MailerConfigurationsListComponent_ng_template_9_Template_button_click_17_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.activateConfiguration(item_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(18, "lucide-icon", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 16);
    \u0275\u0275listener("click", function MailerConfigurationsListComponent_ng_template_9_Template_button_click_19_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.editConfiguration(item_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(20, "lucide-icon", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 17);
    \u0275\u0275listener("click", function MailerConfigurationsListComponent_ng_template_9_Template_button_click_21_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.deleteConfiguration(item_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(22, "lucide-icon", 15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isConfigurationActive(item_r4));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.vendor);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getStatusClass(ctx_r2.isConfigurationActive(item_r4)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(ctx_r2.isConfigurationActive(item_r4)), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.created_at ? \u0275\u0275pipeBind2(14, 13, item_r4.created_at, "mediumDate") : "\u2014");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.isConfigurationActive(item_r4));
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r2.Power)("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r2.Edit2)("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r2.Trash2)("size", 16);
  }
}
var MailerConfigurationsListComponent = class _MailerConfigurationsListComponent {
  mailerConfigurationService;
  dialog;
  interceptorService;
  tableTemplate;
  configurations = [];
  destroy$ = new Subject();
  table_config = signal({
    rows: [],
    columns: [
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true, width: 200 },
      { name: "Proveedor", prop: "vendor", sortable: true, canAutoResize: true, width: 120 },
      { name: "Estado", prop: "is_active", sortable: true, canAutoResize: true, width: 100 },
      { name: "Creado", prop: "created_at", sortable: true, canAutoResize: true, width: 150 },
      { name: "Acciones", prop: "actions", sortable: false, canAutoResize: true, width: 160 }
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron configuraciones de correo" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  CheckCircle2 = CircleCheck;
  Edit2 = Pen;
  Power = Power;
  Trash2 = Trash2;
  constructor(mailerConfigurationService, dialog, interceptorService) {
    this.mailerConfigurationService = mailerConfigurationService;
    this.dialog = dialog;
    this.interceptorService = interceptorService;
  }
  ngOnInit() {
    this.loadConfigurations();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadConfigurations() {
    this.updateTableConfig({ loading: true });
    this.mailerConfigurationService.getMailerConfigurations().subscribe({
      next: (res) => {
        const configurations = (Array.isArray(res) ? res : res?.data ?? []).map((configuration) => this.normalizeConfiguration(configuration));
        this.configurations = configurations;
        this.updateTableConfig({
          rows: configurations,
          totalResults: Array.isArray(res) ? configurations.length : res?.total ?? configurations.length,
          loading: false
        });
      },
      error: (err) => {
        console.error("Error loading mailer configurations:", err);
        this.updateTableConfig({ loading: false });
      }
    });
  }
  openCreateModal() {
    const dialogRef = this.dialog.open(MailerConfigurationModalComponent, {
      width: "620px",
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadConfigurations();
      }
    });
  }
  editConfiguration(configuration) {
    const dialogRef = this.dialog.open(MailerConfigurationModalComponent, {
      width: "620px",
      disableClose: false,
      data: { configuration }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadConfigurations();
      }
    });
  }
  activateConfiguration(configuration) {
    if (this.isConfigurationActive(configuration)) {
      return;
    }
    this.updateTableConfig({ loading: true });
    this.mailerConfigurationService.activateMailerConfiguration(configuration.id).subscribe({
      next: () => {
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Configuraci\xF3n activada correctamente"
        });
        this.loadConfigurations();
      },
      error: (err) => {
        this.updateTableConfig({ loading: false });
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al activar configuraci\xF3n"
        });
      }
    });
  }
  deleteConfiguration(configuration) {
    if (!confirm(`\xBFEliminar la configuraci\xF3n "${configuration.name}"?`))
      return;
    this.mailerConfigurationService.deleteMailerConfiguration(configuration.id).subscribe({
      next: () => {
        this.loadConfigurations();
      },
      error: (err) => {
        console.error("Error deleting mailer configuration:", err);
      }
    });
  }
  getStatusClass(isActive) {
    return isActive ? "settings-badge--status-active" : "settings-badge--status-inactive";
  }
  getStatusLabel(isActive) {
    return isActive ? "Activa" : "Inactiva";
  }
  isConfigurationActive(configuration) {
    return Boolean(configuration.is_active ?? configuration.isActive);
  }
  normalizeConfiguration(configuration) {
    return __spreadProps(__spreadValues({}, configuration), {
      is_active: this.isConfigurationActive(configuration)
    });
  }
  updateTableConfig(config) {
    this.table_config.update((current) => __spreadValues(__spreadValues({}, current), config));
  }
  static \u0275fac = function MailerConfigurationsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MailerConfigurationsListComponent)(\u0275\u0275directiveInject(MailerConfigurationService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MailerConfigurationsListComponent, selectors: [["app-mailer-configurations-list"]], viewQuery: function MailerConfigurationsListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c08, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 11, vars: 2, consts: [["tableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-500"], ["text", "Crear Configuraci\xF3n", "custom_class", "btn_primary", 3, "clicked"], ["variant", "settings", 3, "config", "rowTemplate"], [1, "flex", "items-center", "gap-2", "min-w-0"], [1, "settings-cell-primary", "truncate"], ["class", "text-green-600 shrink-0", 3, "img", "size", 4, "ngIf"], [1, "settings-cell-text", "capitalize"], [1, "settings-badge", 3, "ngClass"], [1, "settings-cell-text"], [1, "flex", "gap-2"], ["title", "Activar", 1, "p-1.5", "text-green-600", "hover:text-white", "hover:bg-green-600", "rounded-md", "transition-all", "duration-200", "disabled:opacity-40", "disabled:hover:bg-transparent", "disabled:hover:text-green-600", 3, "click", "disabled"], [3, "img", "size"], ["title", "Editar", 1, "p-1.5", "text-gray-600", "hover:text-white", "hover:bg-gray-600", "rounded-md", "transition-all", "duration-200", 3, "click"], ["title", "Eliminar", 1, "p-1.5", "text-red-600", "hover:text-white", "hover:bg-red-600", "rounded-md", "transition-all", "duration-200", 3, "click"], [1, "text-green-600", "shrink-0", 3, "img", "size"]], template: function MailerConfigurationsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h2", 3);
      \u0275\u0275text(4, "Configuraci\xF3n de Correo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, "Gestiona la configuraci\xF3n activa para env\xEDo de correos.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "app-button", 5);
      \u0275\u0275listener("clicked", function MailerConfigurationsListComponent_Template_app_button_clicked_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateModal());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275element(8, "app-datatable-wrapper", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, MailerConfigurationsListComponent_ng_template_9_Template, 23, 16, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r5 = \u0275\u0275reference(10);
      \u0275\u0275advance(8);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r5);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgIf,
    ButtonComponent,
    DatatableWrapperComponent,
    LucideAngularModule,
    LucideAngularComponent,
    DatePipe
  ], styles: ["\n\n.settings-cell-primary[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national[_ngcontent-%COMP%] {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international[_ngcontent-%COMP%] {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n/*# sourceMappingURL=mailer-configurations-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MailerConfigurationsListComponent, [{
    type: Component,
    args: [{ selector: "app-mailer-configurations-list", standalone: true, imports: [
      CommonModule,
      ButtonComponent,
      DatatableWrapperComponent,
      LucideAngularModule
    ], template: `<div class="settings-list-page px-4 pb-6">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <div>\r
      <h2 class="text-2xl font-semibold text-gray-800">Configuraci\xF3n de Correo</h2>\r
      <p class="text-sm text-gray-500">Gestiona la configuraci\xF3n activa para env\xEDo de correos.</p>\r
    </div>\r
\r
    <app-button\r
      text="Crear Configuraci\xF3n"\r
      custom_class="btn_primary"\r
      (clicked)="openCreateModal()">\r
    </app-button>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    variant="settings"\r
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate">\r
  </app-datatable-wrapper>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <div class="flex items-center gap-2 min-w-0">\r
      <p class="settings-cell-primary truncate">{{ item.name }}</p>\r
      <lucide-icon *ngIf="isConfigurationActive(item)" [img]="CheckCircle2" [size]="15" class="text-green-600 shrink-0"></lucide-icon>\r
    </div>\r
  </td>\r
  <td>\r
    <span class="settings-cell-text capitalize">{{ item.vendor }}</span>\r
  </td>\r
  <td>\r
    <span class="settings-badge" [ngClass]="getStatusClass(isConfigurationActive(item))">\r
      {{ getStatusLabel(isConfigurationActive(item)) }}\r
    </span>\r
  </td>\r
  <td>\r
    <span class="settings-cell-text">{{ item.created_at ? (item.created_at | date:'mediumDate') : '\u2014' }}</span>\r
  </td>\r
  <td>\r
    <div class="flex gap-2">\r
      <button\r
        (click)="activateConfiguration(item); $event.stopPropagation()"\r
        [disabled]="isConfigurationActive(item)"\r
        class="p-1.5 text-green-600 hover:text-white hover:bg-green-600 rounded-md transition-all duration-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-green-600"\r
        title="Activar">\r
        <lucide-icon [img]="Power" [size]="16"></lucide-icon>\r
      </button>\r
      <button\r
        (click)="editConfiguration(item); $event.stopPropagation()"\r
        class="p-1.5 text-gray-600 hover:text-white hover:bg-gray-600 rounded-md transition-all duration-200"\r
        title="Editar">\r
        <lucide-icon [img]="Edit2" [size]="16"></lucide-icon>\r
      </button>\r
      <button\r
        (click)="deleteConfiguration(item); $event.stopPropagation()"\r
        class="p-1.5 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-all duration-200"\r
        title="Eliminar">\r
        <lucide-icon [img]="Trash2" [size]="16"></lucide-icon>\r
      </button>\r
    </div>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/settings/pages/mailer-configurations-list/mailer-configurations-list.component.scss */\n.settings-cell-primary {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.25rem;\n  color: #111827;\n}\n.settings-cell-text {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  color: #4b5563;\n}\n.settings-cell-empty {\n  font-size: 0.875rem;\n  color: #9ca3af;\n}\n.settings-cell-mono {\n  margin: 0;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    monospace;\n  font-size: 0.8125rem;\n  color: #374151;\n}\n.settings-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.625rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n  white-space: nowrap;\n}\n.settings-badge--code {\n  background-color: #eff6ff;\n  color: #1d4ed8;\n}\n.settings-badge--status-active {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.settings-badge--status-inactive {\n  background-color: #f3f4f6;\n  color: #6b7280;\n}\n.settings-badge--type-national {\n  background-color: #e0f2fe;\n  color: #0369a1;\n}\n.settings-badge--type-international {\n  background-color: #ede9fe;\n  color: #6d28d9;\n}\n/*# sourceMappingURL=mailer-configurations-list.component.css.map */\n"] }]
  }], () => [{ type: MailerConfigurationService }, { type: MatDialog }, { type: InterceptorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MailerConfigurationsListComponent, { className: "MailerConfigurationsListComponent", filePath: "src/app/features/settings/pages/mailer-configurations-list/mailer-configurations-list.component.ts", lineNumber: 27 });
})();

// src/app/features/settings/components/exchange-rate-settings/exchange-rate-settings.component.ts
function ExchangeRateSettingsComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1, " No tienes permisos para consultar este modulo. ");
    \u0275\u0275elementEnd();
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.saving || ctx_r1.form.invalid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving ? "Guardando..." : "Guardar tipo de cambio", " ");
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.statusMessage);
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Consultando valor de hoy...");
    \u0275\u0275elementEnd();
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.todayLoadError);
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "p", 26);
    \u0275\u0275text(2, "USD/MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 27);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 28);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 2, ctx_r1.todaysRate.exchange_rate, "1.4-4"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Fecha: ", ctx_r1.todaysRate.rate_date);
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, " Aun no existe un tipo de cambio cargado para hoy. ");
    \u0275\u0275elementEnd();
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Cargando historial...");
    \u0275\u0275elementEnd();
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.historyLoadError);
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "No hay registros de tipo de cambio.");
    \u0275\u0275elementEnd();
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_35_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 32)(1, "td", 33);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 34);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 35);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.rate_date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 3, item_r3.exchange_rate, "1.4-4"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.notes || "-");
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "table", 29)(2, "thead")(3, "tr", 30)(4, "th", 31);
    \u0275\u0275text(5, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 31);
    \u0275\u0275text(7, "Tipo de cambio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 31);
    \u0275\u0275text(9, "Notas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275repeaterCreate(11, ExchangeRateSettingsComponent_Conditional_7_Conditional_35_For_12_Template, 8, 6, "tr", 32, \u0275\u0275componentInstance().trackByRateDate, true);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.history);
  }
}
function ExchangeRateSettingsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "section", 6)(2, "h3", 7);
    \u0275\u0275text(3, "Captura diaria");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 8);
    \u0275\u0275listener("ngSubmit", function ExchangeRateSettingsComponent_Conditional_7_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveDailyRate());
    });
    \u0275\u0275elementStart(5, "div", 9)(6, "div")(7, "label", 10);
    \u0275\u0275text(8, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div")(11, "label", 10);
    \u0275\u0275text(12, "Tipo de cambio (USD -> MXN)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 13)(15, "label", 10);
    \u0275\u0275text(16, "Notas (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "textarea", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 15);
    \u0275\u0275conditionalCreate(19, ExchangeRateSettingsComponent_Conditional_7_Conditional_19_Template, 2, 2, "button", 16);
    \u0275\u0275conditionalCreate(20, ExchangeRateSettingsComponent_Conditional_7_Conditional_20_Template, 2, 1, "span", 17);
    \u0275\u0275conditionalCreate(21, ExchangeRateSettingsComponent_Conditional_7_Conditional_21_Template, 2, 1, "span", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "section", 19)(23, "h3", 7);
    \u0275\u0275text(24, "Hoy");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, ExchangeRateSettingsComponent_Conditional_7_Conditional_25_Template, 2, 0, "p", 20)(26, ExchangeRateSettingsComponent_Conditional_7_Conditional_26_Template, 2, 1, "p", 21)(27, ExchangeRateSettingsComponent_Conditional_7_Conditional_27_Template, 8, 5, "div", 22)(28, ExchangeRateSettingsComponent_Conditional_7_Conditional_28_Template, 2, 0, "p", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "section", 23)(30, "h3", 24);
    \u0275\u0275text(31, "Historial reciente");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(32, ExchangeRateSettingsComponent_Conditional_7_Conditional_32_Template, 2, 0, "p", 20)(33, ExchangeRateSettingsComponent_Conditional_7_Conditional_33_Template, 2, 1, "p", 21)(34, ExchangeRateSettingsComponent_Conditional_7_Conditional_34_Template, 2, 0, "p", 20)(35, ExchangeRateSettingsComponent_Conditional_7_Conditional_35_Template, 13, 0, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", !ctx_r1.canUpdate || ctx_r1.saving);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.canUpdate || ctx_r1.saving);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r1.canUpdate || ctx_r1.saving);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.canUpdate ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.statusMessage ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.errorMessage ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.loadingCurrent ? 25 : ctx_r1.todayLoadError ? 26 : ctx_r1.todaysRate ? 27 : 28);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.loadingHistory ? 32 : ctx_r1.historyLoadError ? 33 : ctx_r1.history.length === 0 ? 34 : 35);
  }
}
var ExchangeRateSettingsComponent = class _ExchangeRateSettingsComponent {
  exchangeRateService;
  authService;
  fb;
  cdr;
  canRead;
  canUpdate;
  loadingCurrent = false;
  loadingHistory = false;
  saving = false;
  form;
  todaysRate = null;
  history = [];
  statusMessage = "";
  errorMessage = "";
  todayLoadError = "";
  historyLoadError = "";
  constructor(exchangeRateService, authService, fb, cdr) {
    this.exchangeRateService = exchangeRateService;
    this.authService = authService;
    this.fb = fb;
    this.cdr = cdr;
    this.form = this.createForm();
    this.canRead = this.authService.hasPermission(SETTINGS_PERMISSIONS.exchangeRate.viewMenu) || this.authService.hasPermission(SETTINGS_PERMISSIONS.exchangeRate.view) || this.authService.hasPermission(SETTINGS_PERMISSIONS.exchangeRate.update);
    this.canUpdate = this.authService.hasPermission(SETTINGS_PERMISSIONS.exchangeRate.update);
  }
  ngOnInit() {
    if (this.canRead) {
      this.loadTodayRate();
      this.loadHistory();
    }
  }
  saveDailyRate() {
    if (!this.canUpdate || this.form.invalid) {
      return;
    }
    this.saving = true;
    this.errorMessage = "";
    this.statusMessage = "";
    const formValue = this.form.getRawValue();
    this.exchangeRateService.upsertDailyExchangeRate({
      rate_date: formValue.rate_date || void 0,
      exchange_rate: Number(formValue.exchange_rate),
      notes: formValue.notes?.trim() || void 0
    }).pipe(finalize(() => {
      this.safeUpdate(() => {
        this.saving = false;
      });
    })).subscribe({
      next: (saved) => {
        this.safeUpdate(() => {
          this.todaysRate = saved;
          this.statusMessage = "Tipo de cambio guardado correctamente.";
          this.applyRateToForm(saved);
          this.loadHistory();
        });
      },
      error: (error) => {
        this.safeUpdate(() => {
          this.errorMessage = error?.error?.message || "No se pudo guardar el tipo de cambio.";
        });
      }
    });
  }
  trackByRateDate(_, item) {
    return item.rate_date;
  }
  loadTodayRate() {
    this.loadingCurrent = true;
    this.todayLoadError = "";
    this.exchangeRateService.getDailyExchangeRate().pipe(timeout(12e3), catchError((error) => {
      this.safeUpdate(() => {
        this.todayLoadError = error?.error?.message || "No se pudo consultar el tipo de cambio de hoy.";
      });
      return of(null);
    })).subscribe((rate) => {
      this.safeUpdate(() => {
        this.loadingCurrent = false;
        if (!rate || !Number.isFinite(rate.exchange_rate)) {
          this.todaysRate = null;
          return;
        }
        this.todaysRate = rate;
        this.applyRateToForm(rate);
      });
    });
  }
  loadHistory() {
    this.loadingHistory = true;
    this.historyLoadError = "";
    this.exchangeRateService.getExchangeRateHistory({ page: 1, limit: 20 }).pipe(timeout(12e3), catchError((error) => {
      this.safeUpdate(() => {
        this.historyLoadError = error?.error?.message || "No se pudo cargar el historial.";
      });
      return of({ data: [] });
    })).subscribe((response) => {
      this.safeUpdate(() => {
        this.loadingHistory = false;
        this.history = Array.isArray(response.data) ? response.data : [];
      });
    });
  }
  getTodayDate() {
    return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  createForm() {
    return this.fb.group({
      rate_date: [this.getTodayDate(), Validators.required],
      exchange_rate: [17, [Validators.required, Validators.min(1e-4)]],
      notes: [""]
    });
  }
  applyRateToForm(rate) {
    this.form.patchValue({
      exchange_rate: rate.exchange_rate,
      rate_date: rate.rate_date || this.form.controls.rate_date.value,
      notes: rate.notes || ""
    });
  }
  safeUpdate(updateFn) {
    setTimeout(() => {
      updateFn();
      this.cdr.detectChanges();
    }, 0);
  }
  static \u0275fac = function ExchangeRateSettingsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ExchangeRateSettingsComponent)(\u0275\u0275directiveInject(ExchangeRateService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ExchangeRateSettingsComponent, selectors: [["app-exchange-rate-settings"]], decls: 8, vars: 1, consts: [[1, "px-4", "exchange-rate-page"], [1, "mb-5"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "rounded-lg", "border", "border-yellow-200", "bg-yellow-50", "px-4", "py-3", "text-yellow-800"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-5"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "p-4", "lg:col-span-2"], [1, "text-lg", "font-semibold", "text-gray-800", "mb-4"], [3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "date", "formControlName", "rate_date", 1, "w-full", "border", "border-gray-300", "rounded-md", "px-3", "py-2", "text-sm", "disabled:bg-gray-100", 3, "disabled"], ["type", "number", "min", "0", "step", "0.0001", "placeholder", "17.0000", "formControlName", "exchange_rate", 1, "w-full", "border", "border-gray-300", "rounded-md", "px-3", "py-2", "text-sm", "disabled:bg-gray-100", 3, "disabled"], [1, "mt-4"], ["rows", "3", "formControlName", "notes", "placeholder", "Fuente o comentario del ajuste", 1, "w-full", "border", "border-gray-300", "rounded-md", "px-3", "py-2", "text-sm", "disabled:bg-gray-100", 3, "disabled"], [1, "mt-4", "flex", "flex-wrap", "items-center", "gap-3"], ["type", "submit", 1, "px-4", "py-2", "rounded-md", "bg-indigo-600", "text-white", "text-sm", "font-medium", "hover:bg-indigo-700", "disabled:opacity-60", 3, "disabled"], [1, "text-sm", "text-green-700"], [1, "text-sm", "text-red-700"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "p-4"], [1, "text-sm", "text-gray-500"], [1, "text-sm", "text-red-600"], [1, "rounded-md", "bg-blue-50", "border", "border-blue-200", "p-3"], [1, "bg-white", "rounded-lg", "border", "border-gray-200", "p-4", "mt-5"], [1, "text-lg", "font-semibold", "text-gray-800", "mb-3"], [1, "overflow-x-auto"], [1, "text-xs", "uppercase", "text-blue-700", "tracking-wide"], [1, "text-2xl", "font-bold", "text-blue-900"], [1, "text-xs", "text-blue-700", "mt-1"], [1, "min-w-full", "text-sm"], [1, "text-left", "text-gray-600", "border-b", "border-gray-200"], [1, "py-2", "pr-4"], [1, "border-b", "border-gray-100"], [1, "py-2", "pr-4", "text-gray-700"], [1, "py-2", "pr-4", "font-medium", "text-gray-900"], [1, "py-2", "pr-4", "text-gray-600"]], template: function ExchangeRateSettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Tipo de cambio");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, " Registra el valor diario del USD para operaciones y auditoria por tenant. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, ExchangeRateSettingsComponent_Conditional_6_Template, 2, 0, "div", 4)(7, ExchangeRateSettingsComponent_Conditional_7_Template, 36, 9);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(!ctx.canRead ? 6 : 7);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, DecimalPipe], styles: ["\n\n.exchange-rate-page[_ngcontent-%COMP%]   :is(input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]) {\n  outline: none;\n}\n.exchange-rate-page[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:is(input, textarea):focus {\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n/*# sourceMappingURL=exchange-rate-settings.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExchangeRateSettingsComponent, [{
    type: Component,
    args: [{ selector: "app-exchange-rate-settings", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="px-4 exchange-rate-page">\r
  <div class="mb-5">\r
    <h2 class="text-2xl font-semibold text-gray-800">Tipo de cambio</h2>\r
    <p class="text-sm text-gray-600 mt-1">\r
      Registra el valor diario del USD para operaciones y auditoria por tenant.\r
    </p>\r
  </div>\r
\r
  @if (!canRead) {\r
    <div class="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-800">\r
      No tienes permisos para consultar este modulo.\r
    </div>\r
  } @else {\r
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">\r
      <section class="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-2">\r
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Captura diaria</h3>\r
\r
        <form [formGroup]="form" (ngSubmit)="saveDailyRate()">\r
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">\r
            <div>\r
              <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>\r
              <input\r
                type="date"\r
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-100"\r
                formControlName="rate_date"\r
                [disabled]="!canUpdate || saving"\r
              />\r
            </div>\r
\r
            <div>\r
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de cambio (USD -> MXN)</label>\r
              <input\r
                type="number"\r
                min="0"\r
                step="0.0001"\r
                placeholder="17.0000"\r
                class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-100"\r
                formControlName="exchange_rate"\r
                [disabled]="!canUpdate || saving"\r
              />\r
            </div>\r
          </div>\r
\r
          <div class="mt-4">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>\r
            <textarea\r
              rows="3"\r
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-100"\r
              formControlName="notes"\r
              [disabled]="!canUpdate || saving"\r
              placeholder="Fuente o comentario del ajuste"\r
            ></textarea>\r
          </div>\r
\r
          <div class="mt-4 flex flex-wrap items-center gap-3">\r
            @if (canUpdate) {\r
              <button\r
                type="submit"\r
                class="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"\r
                [disabled]="saving || form.invalid"\r
              >\r
                {{ saving ? 'Guardando...' : 'Guardar tipo de cambio' }}\r
              </button>\r
            }\r
\r
            @if (statusMessage) {\r
              <span class="text-sm text-green-700">{{ statusMessage }}</span>\r
            }\r
\r
            @if (errorMessage) {\r
              <span class="text-sm text-red-700">{{ errorMessage }}</span>\r
            }\r
          </div>\r
        </form>\r
      </section>\r
\r
      <section class="bg-white rounded-lg border border-gray-200 p-4">\r
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Hoy</h3>\r
\r
        @if (loadingCurrent) {\r
          <p class="text-sm text-gray-500">Consultando valor de hoy...</p>\r
        } @else if (todayLoadError) {\r
          <p class="text-sm text-red-600">{{ todayLoadError }}</p>\r
        } @else if (todaysRate) {\r
          <div class="rounded-md bg-blue-50 border border-blue-200 p-3">\r
            <p class="text-xs uppercase text-blue-700 tracking-wide">USD/MXN</p>\r
            <p class="text-2xl font-bold text-blue-900">{{ todaysRate.exchange_rate | number:'1.4-4' }}</p>\r
            <p class="text-xs text-blue-700 mt-1">Fecha: {{ todaysRate.rate_date }}</p>\r
          </div>\r
        } @else {\r
          <p class="text-sm text-gray-500">\r
            Aun no existe un tipo de cambio cargado para hoy.\r
          </p>\r
        }\r
      </section>\r
    </div>\r
\r
    <section class="bg-white rounded-lg border border-gray-200 p-4 mt-5">\r
      <h3 class="text-lg font-semibold text-gray-800 mb-3">Historial reciente</h3>\r
\r
      @if (loadingHistory) {\r
        <p class="text-sm text-gray-500">Cargando historial...</p>\r
      } @else if (historyLoadError) {\r
        <p class="text-sm text-red-600">{{ historyLoadError }}</p>\r
      } @else if (history.length === 0) {\r
        <p class="text-sm text-gray-500">No hay registros de tipo de cambio.</p>\r
      } @else {\r
        <div class="overflow-x-auto">\r
          <table class="min-w-full text-sm">\r
            <thead>\r
              <tr class="text-left text-gray-600 border-b border-gray-200">\r
                <th class="py-2 pr-4">Fecha</th>\r
                <th class="py-2 pr-4">Tipo de cambio</th>\r
                <th class="py-2 pr-4">Notas</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (item of history; track trackByRateDate($index, item)) {\r
                <tr class="border-b border-gray-100">\r
                  <td class="py-2 pr-4 text-gray-700">{{ item.rate_date }}</td>\r
                  <td class="py-2 pr-4 font-medium text-gray-900">{{ item.exchange_rate | number:'1.4-4' }}</td>\r
                  <td class="py-2 pr-4 text-gray-600">{{ item.notes || '-' }}</td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
      }\r
    </section>\r
  }\r
</div>\r
`, styles: ["/* src/app/features/settings/components/exchange-rate-settings/exchange-rate-settings.component.scss */\n.exchange-rate-page :is(input, textarea) {\n  outline: none;\n}\n.exchange-rate-page :is(input, textarea):focus {\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n/*# sourceMappingURL=exchange-rate-settings.component.css.map */\n"] }]
  }], () => [{ type: ExchangeRateService }, { type: AuthService }, { type: FormBuilder }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ExchangeRateSettingsComponent, { className: "ExchangeRateSettingsComponent", filePath: "src/app/features/settings/components/exchange-rate-settings/exchange-rate-settings.component.ts", lineNumber: 20 });
})();

// src/app/features/rbac-tenant-ui/rbac-tenant-ui.routes.ts
var RBAC_TENANT_UI_ROUTES = [
  {
    path: "",
    component: RbacTenantUIComponent,
    children: [
      {
        path: "",
        component: SettingsComponent,
        pathMatch: "full"
      },
      {
        path: "users",
        component: UsersManagementComponent
      },
      {
        path: "roles",
        component: RolesManagementComponent
      },
      {
        path: "vendors",
        component: VendorListComponent
      },
      {
        path: "warehouses",
        component: WarehouseListComponent
      },
      {
        path: "fiscal-configurations",
        component: FiscalConfigurationListComponent
      },
      {
        path: "products",
        component: ProductListComponent
      },
      {
        path: "point-of-sale",
        redirectTo: "pos-configuration",
        pathMatch: "full"
      },
      {
        path: "pos-configuration",
        component: PosEquipmentListComponent
      },
      {
        path: "email-templates",
        component: EmailTemplatesListComponent
      },
      {
        path: "mailer-configurations",
        component: MailerConfigurationsListComponent
      },
      {
        path: "exchange-rates",
        component: ExchangeRateSettingsComponent
      }
    ]
  }
];
export {
  RBAC_TENANT_UI_ROUTES
};
//# sourceMappingURL=chunk-NDEA37OC.js.map
