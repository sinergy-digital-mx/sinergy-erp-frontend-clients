import {
  BackButtonComponent
} from "./chunk-OHGK6E6K.js";
import {
  VendorDetailModalComponent,
  VendorService
} from "./chunk-BXIHUGCW.js";
import {
  CategoriesDialogComponent,
  FiscalConfigurationModalComponent,
  ProductDetailModalComponent,
  ProductService,
  WarehouseDetailModalComponent
} from "./chunk-I7WEELU2.js";
import {
  BranchService
} from "./chunk-BXITMCQU.js";
import {
  FiscalConfigurationService
} from "./chunk-UZFR75UC.js";
import {
  EmailTemplateService
} from "./chunk-CX3ZXNA5.js";
import {
  DataMapperService,
  UserService
} from "./chunk-YS7HUZUF.js";
import {
  PermissionSyncService
} from "./chunk-FRZCFLMK.js";
import {
  ExchangeRateService
} from "./chunk-7BPCF4E6.js";
import {
  SETTINGS_PERMISSIONS
} from "./chunk-K6DFM2KE.js";
import {
  POSService
} from "./chunk-MN35NIJR.js";
import {
  dailyShiftBranchLabel,
  dailyShiftIsOpen,
  dailyShiftPartialCount,
  dailyShiftSalesTotal,
  dailyShiftStatusLabel,
  dailyShiftTerminalLabel,
  formatPosMoney,
  parsePosMoney
} from "./chunk-HSRMLKO4.js";
import {
  TabComponent
} from "./chunk-RGTVHKC4.js";
import {
  WarehouseService
} from "./chunk-DJ4GYXTA.js";
import {
  SearchComponent
} from "./chunk-WBX2SF33.js";
import {
  DatatableWrapperComponent
} from "./chunk-L47FLSDR.js";
import {
  SelectComponent
} from "./chunk-L4EQ5WDD.js";
import {
  AlertDialogComponent,
  InterceptorService
} from "./chunk-YFLVEXO5.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-AL73GUEM.js";
import "./chunk-GQ2LOQST.js";
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
  RadioControlValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-HNVE2F7I.js";
import {
  ButtonComponent
} from "./chunk-B4R54IPF.js";
import "./chunk-CYJDZ4ZT.js";
import {
  CustomSnackbarComponent,
  MatButtonModule,
  MatSnackBar,
  ToastService
} from "./chunk-IP3VK3BQ.js";
import "./chunk-BMQ5UVGT.js";
import {
  ArrowRight,
  CircleCheck,
  LucideAngularComponent,
  LucideAngularModule,
  Pen,
  Plus,
  Power,
  RefreshCw,
  Shield,
  Trash2,
  X
} from "./chunk-34Z4N5YB.js";
import {
  AuthService
} from "./chunk-B7UOHVOJ.js";
import {
  ActivatedRoute,
  DomSanitizer,
  Router,
  RouterOutlet
} from "./chunk-55FJTJJ6.js";
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
} from "./chunk-BMMLV6YT.js";
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
  filter,
  finalize,
  forkJoin,
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
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinterpolate,
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
} from "./chunk-57S27ROJ.js";

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
      description: "Gestiona usuarios, asigna roles y controla permisos de acceso de forma centralizada",
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
      description: "Configura el proveedor de env\xEDo de correos, incluyendo Resend y la configuraci\xF3n activa",
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

// src/app/features/rbac-tenant-ui/models/index.ts
var POS_USER_TYPE_OPTIONS = [
  {
    value: "VENTAS",
    label: "Ventas",
    description: "Arma pedidos; no cobra ni maneja corte"
  },
  {
    value: "COBRANZA",
    label: "Cobranza",
    description: "Abre/cierra corte, cortes parciales y cobra ventas"
  }
];
var POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE = "No se puede cambiar el tipo POS ni la sucursal mientras hay un corte global abierto. Cierra el corte primero.";
function isOpenGlobalCutBlockMessage(message) {
  if (!message) {
    return false;
  }
  return message === POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE || message.toLowerCase().includes("corte global abierto");
}
function userHasOpenGlobalCut(user) {
  if (!user) {
    return false;
  }
  return !!(user.has_open_global_cut ?? user.has_open_global_corte ?? user.hasOpenGlobalCut);
}
function getPosUserTypeLabel(posUserType) {
  const option = POS_USER_TYPE_OPTIONS.find((item) => item.value === posUserType);
  return option?.label ?? null;
}
function getPosUserTypeBadgeLabel(isPosUser, posUserType) {
  if (!isPosUser) {
    return null;
  }
  if (posUserType === "VENTAS") {
    return "POS Ventas";
  }
  if (posUserType === "COBRANZA") {
    return "POS Cobranza";
  }
  return "POS";
}

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
  // Custom comparator for roles — compares id and permission_count to detect updates
  roleArrayComparator = (prev, curr) => {
    if (prev.length !== curr.length)
      return false;
    return prev.every((item, index) => item.id === curr[index].id && item.permission_count === curr[index].permission_count);
  };
  usersAreEqual(a, b) {
    const statusA = typeof a.status === "string" ? a.status : a.status?.code ?? "";
    const statusB = typeof b.status === "string" ? b.status : b.status?.code ?? "";
    return a.id === b.id && a.email === b.email && a.first_name === b.first_name && a.last_name === b.last_name && a.phone === b.phone && statusA === statusB && a.is_pos_user === b.is_pos_user && a.pos_user_type === b.pos_user_type && a.pos_user_code === b.pos_user_code && a.billing_branch_id === b.billing_branch_id && (a.billing_branch?.code ?? "") === (b.billing_branch?.code ?? "") && (a.billing_branch?.display_name ?? "") === (b.billing_branch?.display_name ?? "") && a.has_open_global_cut === b.has_open_global_cut;
  }
  userArrayComparator = (prev, curr) => {
    if (prev.length !== curr.length)
      return false;
    return prev.every((item, index) => this.usersAreEqual(item, curr[index]));
  };
  // Public observables for core data
  users$ = this.usersSubject.asObservable().pipe(distinctUntilChanged(this.userArrayComparator));
  roles$ = this.rolesSubject.asObservable().pipe(distinctUntilChanged(this.roleArrayComparator));
  modules$ = this.modulesSubject.asObservable().pipe(distinctUntilChanged((prev, curr) => {
    if (prev.length !== curr.length)
      return false;
    return prev.every((item, index) => item.id === curr[index].id);
  }));
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
    return prev.every((item, index) => this.usersAreEqual(item, curr[index]));
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
  setUserSearchFilter(filter2) {
    this.userSearchFilterSubject.next(filter2);
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
  setRoleSearchFilter(filter2) {
    this.roleSearchFilterSubject.next(filter2);
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

// src/app/features/rbac-tenant-ui/components/user-detail-modal/user-detail-modal.component.ts
function UserDetailModalComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "div", 9);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()();
  }
}
function UserDetailModalComponent_div_8_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "p", 16);
    \u0275\u0275text(2, "Corte global abierto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 17);
    \u0275\u0275text(4, " No se puede cambiar el tipo POS ni la sucursal mientras hay un corte abierto. Cierra el corte en el POS primero. ");
    \u0275\u0275elementEnd()();
  }
}
function UserDetailModalComponent_div_8_div_4_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " Este campo es obligatorio ");
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_4_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " Este campo es obligatorio ");
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_4_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " Ingresa un correo v\xE1lido ");
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_4_ng_container_21__svg_svg_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 36)(2, "path", 37);
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_4_ng_container_21__svg_svg_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 38);
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_4_ng_container_21__svg_svg_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 36)(2, "path", 37);
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_4_ng_container_21__svg_svg_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 35);
    \u0275\u0275element(1, "path", 38);
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_4_ng_container_21_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " Las contrase\xF1as no coinciden ");
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_4_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 25)(2, "label", 21);
    \u0275\u0275text(3, "Contrase\xF1a *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 30);
    \u0275\u0275element(5, "input", 31);
    \u0275\u0275elementStart(6, "button", 32);
    \u0275\u0275listener("click", function UserDetailModalComponent_div_8_div_4_ng_container_21_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.togglePasswordVisibility());
    });
    \u0275\u0275template(7, UserDetailModalComponent_div_8_div_4_ng_container_21__svg_svg_7_Template, 3, 0, "svg", 33)(8, UserDetailModalComponent_div_8_div_4_ng_container_21__svg_svg_8_Template, 2, 0, "svg", 33);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 25)(10, "label", 21);
    \u0275\u0275text(11, "Confirmar contrase\xF1a *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 30);
    \u0275\u0275element(13, "input", 34);
    \u0275\u0275elementStart(14, "button", 32);
    \u0275\u0275listener("click", function UserDetailModalComponent_div_8_div_4_ng_container_21_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleConfirmPasswordVisibility());
    });
    \u0275\u0275template(15, UserDetailModalComponent_div_8_div_4_ng_container_21__svg_svg_15_Template, 3, 0, "svg", 33)(16, UserDetailModalComponent_div_8_div_4_ng_container_21__svg_svg_16_Template, 2, 0, "svg", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, UserDetailModalComponent_div_8_div_4_ng_container_21_p_17_Template, 2, 0, "p", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275property("type", ctx_r1.showPassword() ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.showPassword());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showPassword());
    \u0275\u0275advance(5);
    \u0275\u0275property("type", ctx_r1.showConfirmPassword() ? "text" : "password");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.showConfirmPassword());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showConfirmPassword());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_9_0 = ctx_r1.form.get("confirm_password")) == null ? null : tmp_9_0.touched) && ((tmp_9_0 = ctx_r1.form.get("confirm_password")) == null ? null : tmp_9_0.value) !== ((tmp_9_0 = ctx_r1.form.get("password")) == null ? null : tmp_9_0.value));
  }
}
function UserDetailModalComponent_div_8_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20)(3, "label", 21);
    \u0275\u0275text(4, "Nombre *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 22);
    \u0275\u0275template(6, UserDetailModalComponent_div_8_div_4_p_6_Template, 2, 0, "p", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 20)(8, "label", 21);
    \u0275\u0275text(9, "Apellido *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 24);
    \u0275\u0275template(11, UserDetailModalComponent_div_8_div_4_p_11_Template, 2, 0, "p", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 25)(13, "label", 21);
    \u0275\u0275text(14, "Correo electr\xF3nico *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 26);
    \u0275\u0275template(16, UserDetailModalComponent_div_8_div_4_p_16_Template, 2, 0, "p", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 25)(18, "label", 21);
    \u0275\u0275text(19, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, UserDetailModalComponent_div_8_div_4_ng_container_21_Template, 18, 7, "ng-container", 28);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.form.get("first_name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.form.get("first_name")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.form.get("last_name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("last_name")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.form.get("email")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.form.get("email")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.isNew);
  }
}
function UserDetailModalComponent_div_8_div_5_div_15_label_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 48);
    \u0275\u0275element(1, "input", 49);
    \u0275\u0275elementStart(2, "span", 50)(3, "span", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 52);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const option_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("pos-type-option--selected", ((tmp_5_0 = ctx_r1.form.get("pos_user_type")) == null ? null : tmp_5_0.value) === option_r4.value)("pos-type-option--disabled", ctx_r1.isPosEditLockedByOpenCut());
    \u0275\u0275advance();
    \u0275\u0275property("value", option_r4.value);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(option_r4.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(option_r4.description);
  }
}
function UserDetailModalComponent_div_8_div_5_div_15_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " Selecciona un tipo de terminal ");
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_5_div_15_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 53);
    \u0275\u0275text(1, " Cambiar el tipo de terminal afecta qu\xE9 pantallas ver\xE1 al iniciar sesi\xF3n en el POS (ventas vs cobranza/corte). ");
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_5_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "span", 21);
    \u0275\u0275text(2, "Tipo de terminal *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 45);
    \u0275\u0275template(4, UserDetailModalComponent_div_8_div_5_div_15_label_4_Template, 7, 7, "label", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, UserDetailModalComponent_div_8_div_5_div_15_p_5_Template, 2, 0, "p", 23)(6, UserDetailModalComponent_div_8_div_5_div_15_p_6_Template, 2, 0, "p", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r1.posUserTypeOptions);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_4_0 = ctx_r1.form.get("pos_user_type")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.form.get("pos_user_type")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showPosTypeChangeWarning());
  }
}
function UserDetailModalComponent_div_8_div_5_div_16_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1, " Ingresa un n\xFAmero entero mayor a 0 ");
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_5_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "label", 21);
    \u0275\u0275text(2, "C\xF3digo");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 54);
    \u0275\u0275template(4, UserDetailModalComponent_div_8_div_5_div_16_p_4_Template, 2, 0, "p", 23);
    \u0275\u0275elementStart(5, "p", 43);
    \u0275\u0275text(6, "Opcional. Debe ser \xFAnico entre usuarios.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.form.get("pos_user_code")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("pos_user_code")) == null ? null : tmp_3_0.touched));
  }
}
function UserDetailModalComponent_div_8_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 39)(2, "div", 25)(3, "label", 40);
    \u0275\u0275element(4, "input", 41);
    \u0275\u0275elementStart(5, "span", 42);
    \u0275\u0275text(6, "Usuario de tipo POS");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 43);
    \u0275\u0275text(8, " Las terminales POS requieren sucursal asignada. ");
    \u0275\u0275elementStart(9, "strong");
    \u0275\u0275text(10, "Ventas");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " solo captura pedidos; ");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13, "Cobranza");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " maneja el corte del d\xEDa y el cobro. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, UserDetailModalComponent_div_8_div_5_div_15_Template, 7, 3, "div", 44)(16, UserDetailModalComponent_div_8_div_5_div_16_Template, 7, 1, "div", 44);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("toggle-row--disabled", ctx_r1.isPosEditLockedByOpenCut());
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-disabled", ctx_r1.isPosEditLockedByOpenCut());
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", (tmp_4_0 = ctx_r1.form.get("is_pos_user")) == null ? null : tmp_4_0.value);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !((tmp_5_0 = ctx_r1.form.get("is_pos_user")) == null ? null : tmp_5_0.value));
  }
}
function UserDetailModalComponent_div_8_div_6_div_3_label_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 62);
    \u0275\u0275element(1, "input", 63);
    \u0275\u0275elementStart(2, "span", 64);
    \u0275\u0275text(3, "Sin restricci\xF3n / Todas las sucursales");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("branch-item--selected", ctx_r1.isAllBranchesSelected())("branch-item--disabled", ctx_r1.isPosEditLockedByOpenCut());
  }
}
function UserDetailModalComponent_div_8_div_6_div_3_label_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 62);
    \u0275\u0275element(1, "input", 65);
    \u0275\u0275elementStart(2, "span", 64);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const branch_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("branch-item--selected", ctx_r1.isBranchOptionSelected(branch_r5.id))("branch-item--disabled", ctx_r1.isPosEditLockedByOpenCut());
    \u0275\u0275advance();
    \u0275\u0275property("value", branch_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.branchLabel(branch_r5));
  }
}
function UserDetailModalComponent_div_8_div_6_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275template(1, UserDetailModalComponent_div_8_div_6_div_3_label_1_Template, 4, 4, "label", 60)(2, UserDetailModalComponent_div_8_div_6_div_3_label_2_Template, 4, 6, "label", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !((tmp_3_0 = ctx_r1.form.get("is_pos_user")) == null ? null : tmp_3_0.value));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.branches());
  }
}
function UserDetailModalComponent_div_8_div_6_p_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 66);
    \u0275\u0275text(1, " Selecciona una sucursal para usuarios POS ");
    \u0275\u0275elementEnd();
  }
}
function UserDetailModalComponent_div_8_div_6_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "p");
    \u0275\u0275text(2, "No hay sucursales configuradas.");
    \u0275\u0275elementEnd()();
  }
}
function UserDetailModalComponent_div_8_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "p", 55);
    \u0275\u0275text(2, " Selecciona una sucursal para restringir el acceso del usuario. Si no seleccionas ninguna, tendr\xE1 acceso a todas. Los usuarios POS deben tener una sucursal asignada. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, UserDetailModalComponent_div_8_div_6_div_3_Template, 3, 2, "div", 56)(4, UserDetailModalComponent_div_8_div_6_p_4_Template, 2, 0, "p", 57)(5, UserDetailModalComponent_div_8_div_6_div_5_Template, 3, 0, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.branches().length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.form.get("is_pos_user")) == null ? null : tmp_3_0.value) && ((tmp_3_0 = ctx_r1.form.get("billing_branch_id")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("billing_branch_id")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.branches().length === 0);
  }
}
function UserDetailModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "app-tab", 11);
    \u0275\u0275listener("tabChange", function UserDetailModalComponent_div_8_Template_app_tab_tabChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTabChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 12);
    \u0275\u0275template(3, UserDetailModalComponent_div_8_div_3_Template, 5, 0, "div", 13)(4, UserDetailModalComponent_div_8_div_4_Template, 22, 4, "div", 14)(5, UserDetailModalComponent_div_8_div_5_Template, 17, 5, "div", 14)(6, UserDetailModalComponent_div_8_div_6_Template, 6, 3, "div", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance();
    \u0275\u0275property("tabs", ctx_r1.tabs)("activeTabId", ctx_r1.activeTab);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isPosEditLockedByOpenCut());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "general");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "pos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "branches");
  }
}
function UserDetailModalComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 68)(1, "app-button", 69);
    \u0275\u0275listener("clicked", function UserDetailModalComponent_div_9_Template_app_button_clicked_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "app-button", 70);
    \u0275\u0275listener("clicked", function UserDetailModalComponent_div_9_Template_app_button_clicked_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275property("text", ctx_r1.isNew ? "Crear" : "Guardar cambios")("loading", ctx_r1.saving());
  }
}
var UserDetailModalComponent = class _UserDetailModalComponent {
  data;
  dialogRef;
  fb;
  userService;
  branchService;
  authService;
  interceptorService;
  posUserTypeOptions = POS_USER_TYPE_OPTIONS;
  tabs = [
    { id: "general", title: "Informaci\xF3n general" },
    { id: "pos", title: "POS" },
    { id: "branches", title: "Sucursales asignadas" }
  ];
  activeTab = "general";
  isNew;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  showPassword = signal(false, ...ngDevMode ? [{ debugName: "showPassword" }] : []);
  showConfirmPassword = signal(false, ...ngDevMode ? [{ debugName: "showConfirmPassword" }] : []);
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  showPosTypeChangeWarning = signal(false, ...ngDevMode ? [{ debugName: "showPosTypeChangeWarning" }] : []);
  hasOpenGlobalCut = signal(false, ...ngDevMode ? [{ debugName: "hasOpenGlobalCut" }] : []);
  originalIsPosUser = false;
  originalBillingBranchId = null;
  originalPosUserType = null;
  form;
  constructor(data, dialogRef, fb, userService, branchService, authService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.userService = userService;
    this.branchService = branchService;
    this.authService = authService;
    this.interceptorService = interceptorService;
    this.isNew = data.isNew ?? !data.user;
    this.form = this.createForm();
  }
  ngOnInit() {
    this.setupPosFieldBehavior();
    this.setupBranchFieldBehavior();
    this.loadData();
  }
  createForm() {
    const user = this.data.user;
    this.originalIsPosUser = user?.is_pos_user ?? false;
    this.originalPosUserType = user?.pos_user_type ?? null;
    this.originalBillingBranchId = user?.billing_branch_id ?? null;
    this.hasOpenGlobalCut.set(!this.isNew && userHasOpenGlobalCut(user));
    return this.fb.group({
      first_name: [user?.first_name || "", Validators.required],
      last_name: [user?.last_name || "", Validators.required],
      email: [user?.email || "", [Validators.required, Validators.email]],
      phone: [user?.phone || ""],
      password: ["", this.isNew ? Validators.required : []],
      confirm_password: ["", this.isNew ? Validators.required : []],
      billing_branch_id: [user?.billing_branch_id ?? ""],
      is_pos_user: [user?.is_pos_user ?? false],
      pos_user_type: [user?.pos_user_type ?? null],
      pos_user_code: [user?.pos_user_code ?? null]
    });
  }
  setupPosFieldBehavior() {
    const applyPosState = (isPosUser) => {
      const codeControl = this.form.get("pos_user_code");
      const typeControl = this.form.get("pos_user_type");
      if (!codeControl || !typeControl) {
        return;
      }
      if (isPosUser) {
        codeControl.clearValidators();
        codeControl.setValue(null, { emitEvent: false });
        codeControl.disable({ emitEvent: false });
        typeControl.enable({ emitEvent: false });
        typeControl.setValidators([Validators.required]);
      } else {
        codeControl.enable({ emitEvent: false });
        codeControl.setValidators([Validators.min(1)]);
        typeControl.clearValidators();
        typeControl.setValue(null, { emitEvent: false });
        typeControl.disable({ emitEvent: false });
        this.showPosTypeChangeWarning.set(false);
      }
      codeControl.updateValueAndValidity({ emitEvent: false });
      typeControl.updateValueAndValidity({ emitEvent: false });
      this.applyBranchValidators(isPosUser);
    };
    this.form.get("is_pos_user")?.valueChanges.subscribe(applyPosState);
    this.form.get("pos_user_type")?.valueChanges.subscribe((value) => {
      this.updatePosTypeChangeWarning(value);
    });
    applyPosState(!!this.form.get("is_pos_user")?.value);
  }
  updatePosTypeChangeWarning(currentType) {
    if (this.isNew || !this.data.user?.is_pos_user) {
      this.showPosTypeChangeWarning.set(false);
      return;
    }
    this.showPosTypeChangeWarning.set(!!this.originalPosUserType && !!currentType && currentType !== this.originalPosUserType);
  }
  setupBranchFieldBehavior() {
    this.form.get("is_pos_user")?.valueChanges.subscribe((isPosUser) => {
      if (isPosUser && !this.form.get("billing_branch_id")?.value) {
        this.form.get("billing_branch_id")?.markAsTouched();
      }
    });
  }
  applyBranchValidators(isPosUser) {
    const branchControl = this.form.get("billing_branch_id");
    if (!branchControl) {
      return;
    }
    if (isPosUser) {
      branchControl.setValidators([Validators.required]);
    } else {
      branchControl.clearValidators();
    }
    branchControl.updateValueAndValidity({ emitEvent: false });
  }
  loadData() {
    const branches$ = this.branchService.getAllBranches();
    const userBranch$ = this.isNew || !this.data.user ? of(this.data.user?.billing_branch_id ?? null) : this.userService.getUserBranch(this.data.user.id);
    forkJoin({ branches: branches$, userBranch: userBranch$ }).subscribe({
      next: ({ branches, userBranch }) => {
        this.branches.set(branches);
        const billingBranchId = userBranch ?? this.data.user?.billing_branch_id ?? null;
        this.form.patchValue({
          billing_branch_id: billingBranchId ?? ""
        });
        this.applyBranchValidators(!!this.form.get("is_pos_user")?.value);
        this.originalBillingBranchId = billingBranchId ?? null;
        this.applyOpenCutEditLock();
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar las sucursales"
        });
      }
    });
  }
  branchLabel(branch) {
    return branch.display_name || branch.code;
  }
  isBranchOptionSelected(branchId) {
    return this.form.get("billing_branch_id")?.value === branchId;
  }
  isAllBranchesSelected() {
    return !this.form.get("billing_branch_id")?.value;
  }
  isPosEditLockedByOpenCut() {
    return this.hasOpenGlobalCut();
  }
  shouldLockPosEditByOpenCut() {
    return !this.isNew && this.hasOpenGlobalCut() && this.data.user?.pos_user_type === "COBRANZA" && !!this.data.user?.is_pos_user;
  }
  applyOpenCutEditLock() {
    if (!this.shouldLockPosEditByOpenCut()) {
      return;
    }
    this.form.get("is_pos_user")?.disable({ emitEvent: false });
    this.form.get("pos_user_type")?.disable({ emitEvent: false });
    this.form.get("billing_branch_id")?.disable({ emitEvent: false });
  }
  restoreLockedPosFields() {
    const user = this.data.user;
    if (!user) {
      return;
    }
    this.form.patchValue({
      is_pos_user: user.is_pos_user ?? false,
      pos_user_type: user.pos_user_type ?? null,
      billing_branch_id: user.billing_branch_id ?? ""
    }, { emitEvent: false });
    this.applyOpenCutEditLock();
  }
  hasBlockedPosFieldChanges(isPosUser, posUserType, billingBranchId) {
    if (!this.shouldLockPosEditByOpenCut()) {
      return false;
    }
    return isPosUser !== this.originalIsPosUser || posUserType !== this.originalPosUserType || billingBranchId !== this.originalBillingBranchId;
  }
  onTabChange(tabId) {
    this.activeTab = tabId;
  }
  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.update((v) => !v);
  }
  close() {
    if (!this.saving()) {
      this.dialogRef.close(false);
    }
  }
  save() {
    const isPosUser = !!this.form.get("is_pos_user")?.value;
    const billingBranchRaw = this.form.get("billing_branch_id")?.value;
    const billingBranchId = billingBranchRaw ? billingBranchRaw : null;
    if (isPosUser && !billingBranchId) {
      this.form.get("billing_branch_id")?.markAsTouched();
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "El usuario POS debe tener una sucursal asignada"
      });
      this.activeTab = "branches";
      return;
    }
    const posUserType = this.form.get("pos_user_type")?.value;
    if (isPosUser && !posUserType) {
      this.form.get("pos_user_type")?.markAsTouched();
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "pos_user_type es requerido cuando is_pos_user es true"
      });
      this.activeTab = "pos";
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa los campos requeridos"
      });
      return;
    }
    if (this.isNew) {
      const password = this.form.get("password")?.value;
      const confirmPassword = this.form.get("confirm_password")?.value;
      if (password !== confirmPassword) {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "Las contrase\xF1as no coinciden"
        });
        this.activeTab = "general";
        return;
      }
    }
    const rawPosCode = this.form.get("pos_user_code")?.value;
    const posCode = rawPosCode === null || rawPosCode === void 0 || rawPosCode === "" ? null : Number(rawPosCode);
    if (!isPosUser && posCode !== null && (!Number.isInteger(posCode) || posCode < 1)) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "El c\xF3digo debe ser un n\xFAmero entero mayor a 0"
      });
      this.activeTab = "pos";
      return;
    }
    if (this.hasBlockedPosFieldChanges(isPosUser, posUserType, billingBranchId)) {
      this.restoreLockedPosFields();
      this.showOpenCutBlockMessage();
      return;
    }
    this.saving.set(true);
    const commonPayload = {
      first_name: this.form.get("first_name")?.value,
      last_name: this.form.get("last_name")?.value,
      email: this.form.get("email")?.value,
      phone: this.form.get("phone")?.value || void 0,
      billing_branch_id: billingBranchId,
      is_pos_user: isPosUser,
      pos_user_type: isPosUser ? posUserType : null
    };
    if (this.shouldLockPosEditByOpenCut()) {
      delete commonPayload["billing_branch_id"];
      delete commonPayload["is_pos_user"];
      delete commonPayload["pos_user_type"];
    }
    if (!isPosUser && posCode !== null) {
      commonPayload["pos_user_code"] = posCode;
    }
    if (this.isNew) {
      const payload = __spreadProps(__spreadValues({}, commonPayload), {
        tenant_id: this.authService.user_info.tenant_id,
        status_id: 1,
        password: this.form.get("password")?.value
      });
      this.userService.createUser(payload).subscribe({
        next: () => this.onSaveSuccess("Usuario creado exitosamente"),
        error: (error) => this.onSaveError(error)
      });
      return;
    }
    this.userService.updateUser(this.data.user.id, commonPayload).subscribe({
      next: () => this.onSaveSuccess("Usuario actualizado correctamente"),
      error: (error) => this.onSaveError(error)
    });
  }
  showOpenCutBlockMessage() {
    this.interceptorService.openSnackbar({
      type: "warning",
      title: "Corte abierto",
      message: POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE
    });
    this.activeTab = "pos";
  }
  onSaveSuccess(message) {
    this.saving.set(false);
    this.interceptorService.openSnackbar({
      type: "success",
      title: "\xC9xito",
      message
    });
    this.dialogRef.close(true);
  }
  onSaveError(error) {
    this.saving.set(false);
    if (error?.status === 409) {
      this.interceptorService.openSnackbar({
        type: "error",
        title: "C\xF3digo duplicado",
        message: "Ese c\xF3digo ya est\xE1 en uso por otro usuario."
      });
      this.activeTab = "pos";
      return;
    }
    const backendMessage = error.error?.message;
    if (error?.status === 400 && isOpenGlobalCutBlockMessage(backendMessage)) {
      this.hasOpenGlobalCut.set(true);
      this.restoreLockedPosFields();
      this.interceptorService.openSnackbar({
        type: "error",
        title: "Corte abierto",
        message: POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE
      });
      this.activeTab = "pos";
      return;
    }
    const knownMessages = {
      "pos_user_type es requerido cuando is_pos_user es true": "Selecciona el tipo de terminal POS (Ventas o Cobranza).",
      "pos_user_type solo aplica cuando el usuario es de tipo POS": "El tipo de terminal solo aplica para usuarios POS.",
      "El usuario POS debe tener una sucursal asignada": "Asigna una sucursal en la pesta\xF1a Sucursales.",
      [POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE]: POS_OPEN_GLOBAL_CUT_BLOCK_MESSAGE
    };
    const message = backendMessage && knownMessages[backendMessage] || backendMessage || "Error al guardar el usuario";
    if (isOpenGlobalCutBlockMessage(backendMessage)) {
      this.activeTab = "pos";
    } else if (backendMessage?.includes("sucursal")) {
      this.activeTab = "branches";
    } else if (backendMessage?.includes("pos_user_type")) {
      this.activeTab = "pos";
    }
    this.interceptorService.openSnackbar({
      type: "error",
      title: "Error",
      message
    });
  }
  static \u0275fac = function UserDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserDetailModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserDetailModalComponent, selectors: [["app-user-detail-modal"]], decls: 10, vars: 4, consts: [[1, "modal-container"], [1, "modal-header"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "currentColor"], ["d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"], ["class", "loading-container", 4, "ngIf"], ["class", "modal-content", 3, "formGroup", 4, "ngIf"], ["class", "modal-footer", 4, "ngIf"], [1, "loading-container"], [1, "spinner"], [1, "modal-content", 3, "formGroup"], [3, "tabChange", "tabs", "activeTabId"], [1, "tab-content"], ["class", "open-cut-banner", "role", "status", 4, "ngIf"], ["class", "tab-pane", 4, "ngIf"], ["role", "status", 1, "open-cut-banner"], [1, "open-cut-banner__title"], [1, "open-cut-banner__text"], [1, "tab-pane"], [1, "form-grid"], [1, "form-field"], [1, "form-label"], ["type", "text", "formControlName", "first_name", "placeholder", "Juan", 1, "form-input"], ["class", "field-error", 4, "ngIf"], ["type", "text", "formControlName", "last_name", "placeholder", "P\xE9rez", 1, "form-input"], [1, "form-field", "form-field--full"], ["type", "email", "formControlName", "email", "placeholder", "juan@example.com", 1, "form-input"], ["type", "tel", "formControlName", "phone", "placeholder", "+52 1234567890", 1, "form-input"], [4, "ngIf"], [1, "field-error"], [1, "input-with-toggle"], ["formControlName", "password", "placeholder", "Ingresa una contrase\xF1a", 1, "form-input", 3, "type"], ["type", "button", "aria-label", "Mostrar contrase\xF1a", 1, "toggle-btn", 3, "click"], ["width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["formControlName", "confirm_password", "placeholder", "Confirma tu contrase\xF1a", 1, "form-input", 3, "type"], ["width", "18", "height", "18", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"], [1, "form-grid", "form-grid--single"], [1, "toggle-row"], ["type", "checkbox", "formControlName", "is_pos_user", 1, "toggle-checkbox"], [1, "toggle-label"], [1, "field-hint"], ["class", "form-field form-field--full", 4, "ngIf"], [1, "pos-type-options"], ["class", "pos-type-option", 3, "pos-type-option--selected", "pos-type-option--disabled", 4, "ngFor", "ngForOf"], ["class", "field-hint field-hint--warning", 4, "ngIf"], [1, "pos-type-option"], ["type", "radio", "formControlName", "pos_user_type", 3, "value"], [1, "pos-type-option__content"], [1, "pos-type-option__label"], [1, "pos-type-option__desc"], [1, "field-hint", "field-hint--warning"], ["type", "number", "formControlName", "pos_user_code", "placeholder", "Ej. 33456", "min", "1", "step", "1", 1, "form-input"], [1, "field-hint", "branches-intro"], ["class", "branch-list", 4, "ngIf"], ["class", "field-error branches-error", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "branch-list"], ["class", "branch-item", 3, "branch-item--selected", "branch-item--disabled", 4, "ngIf"], ["class", "branch-item", 3, "branch-item--selected", "branch-item--disabled", 4, "ngFor", "ngForOf"], [1, "branch-item"], ["type", "radio", "formControlName", "billing_branch_id", "value", ""], [1, "branch-item__name"], ["type", "radio", "formControlName", "billing_branch_id", 3, "value"], [1, "field-error", "branches-error"], [1, "empty-state"], [1, "modal-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked", "disabled"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading"]], template: function UserDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function UserDetailModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 3);
      \u0275\u0275element(6, "path", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(7, UserDetailModalComponent_div_7_Template, 4, 0, "div", 5)(8, UserDetailModalComponent_div_8_Template, 7, 7, "div", 6)(9, UserDetailModalComponent_div_9_Template, 3, 3, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Crear Usuario" : "Editar Usuario");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, TabComponent, ButtonComponent], styles: [`

.modal-container[_ngcontent-%COMP%] {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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
  padding: 0 16px 8px;
}
.modal-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
  background: #fafbfc;
}
.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  color: #6b7280;
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin-top: 12px;
  font-size: 14px;
}
.spinner[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.tab-content[_ngcontent-%COMP%] {
  padding: 16px 0;
}
.tab-pane[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;
}
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.form-grid--single[_ngcontent-%COMP%] {
  grid-template-columns: 1fr;
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
.form-input[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%] {
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
.form-select[_ngcontent-%COMP%]:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
.field-error[_ngcontent-%COMP%] {
  font-size: 11px;
  color: #dc2626;
  margin: 0;
}
.field-hint[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}
.field-hint--warning[_ngcontent-%COMP%] {
  color: #b45309;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 6px;
  padding: 8px 10px;
}
.pos-type-options[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pos-type-option[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.pos-type-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  accent-color: #3b82f6;
  cursor: pointer;
  flex-shrink: 0;
}
.pos-type-option[_ngcontent-%COMP%]:hover {
  border-color: #93c5fd;
  background: #f8fafc;
}
.pos-type-option--selected[_ngcontent-%COMP%] {
  border-color: #3b82f6;
  background: #eff6ff;
}
.pos-type-option--disabled[_ngcontent-%COMP%] {
  cursor: not-allowed;
  opacity: 0.65;
  pointer-events: none;
}
.pos-type-option__content[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pos-type-option__label[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}
.pos-type-option__desc[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}
.input-with-toggle[_ngcontent-%COMP%] {
  position: relative;
}
.input-with-toggle[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {
  padding-right: 40px;
}
.toggle-btn[_ngcontent-%COMP%] {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: flex;
}
.toggle-btn[_ngcontent-%COMP%]:hover {
  color: #6b7280;
}
.toggle-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.toggle-row--disabled[_ngcontent-%COMP%] {
  cursor: not-allowed;
  opacity: 0.65;
}
.open-cut-banner[_ngcontent-%COMP%] {
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #fde68a;
  background: #fffbeb;
}
.open-cut-banner__title[_ngcontent-%COMP%] {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: #92400e;
}
.open-cut-banner__text[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: #b45309;
}
.toggle-checkbox[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
  cursor: pointer;
}
.toggle-label[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}
.empty-state[_ngcontent-%COMP%] {
  padding: 24px 12px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
  border: 1px dashed #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.branches-intro[_ngcontent-%COMP%] {
  margin-bottom: 12px;
}
.branch-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
}
.branch-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.branch-item[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
  cursor: pointer;
  flex-shrink: 0;
}
.branch-item[_ngcontent-%COMP%]:hover {
  border-color: #93c5fd;
  background: #f8fafc;
}
.branch-item--selected[_ngcontent-%COMP%] {
  border-color: #3b82f6;
  background: #eff6ff;
}
.branch-item--disabled[_ngcontent-%COMP%] {
  cursor: not-allowed;
  opacity: 0.65;
  pointer-events: none;
}
.branch-item__name[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #111827;
  line-height: 1.4;
}
.branches-error[_ngcontent-%COMP%] {
  margin-top: 12px;
}
@media (max-width: 640px) {
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .form-field--full[_ngcontent-%COMP%] {
    grid-column: auto;
  }
}
/*# sourceMappingURL=user-detail-modal.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-user-detail-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, TabComponent, ButtonComponent], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <h2>{{ isNew ? 'Crear Usuario' : 'Editar Usuario' }}</h2>\r
    <button class="close-btn" (click)="close()" type="button" aria-label="Cerrar">\r
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\r
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <div *ngIf="loading()" class="loading-container">\r
    <div class="spinner"></div>\r
    <p>Cargando...</p>\r
  </div>\r
\r
  <div *ngIf="!loading()" class="modal-content" [formGroup]="form">\r
    <app-tab [tabs]="tabs" [activeTabId]="activeTab" (tabChange)="onTabChange($event)"></app-tab>\r
\r
    <div class="tab-content">\r
      <div *ngIf="isPosEditLockedByOpenCut()" class="open-cut-banner" role="status">\r
        <p class="open-cut-banner__title">Corte global abierto</p>\r
        <p class="open-cut-banner__text">\r
          No se puede cambiar el tipo POS ni la sucursal mientras hay un corte abierto. Cierra el corte en el POS primero.\r
        </p>\r
      </div>\r
\r
      <!-- Informaci\xF3n general -->\r
      <div *ngIf="activeTab === 'general'" class="tab-pane">\r
        <div class="form-grid">\r
          <div class="form-field">\r
            <label class="form-label">Nombre *</label>\r
            <input type="text" class="form-input" formControlName="first_name" placeholder="Juan">\r
            <p *ngIf="form.get('first_name')?.invalid && form.get('first_name')?.touched" class="field-error">\r
              Este campo es obligatorio\r
            </p>\r
          </div>\r
\r
          <div class="form-field">\r
            <label class="form-label">Apellido *</label>\r
            <input type="text" class="form-input" formControlName="last_name" placeholder="P\xE9rez">\r
            <p *ngIf="form.get('last_name')?.invalid && form.get('last_name')?.touched" class="field-error">\r
              Este campo es obligatorio\r
            </p>\r
          </div>\r
\r
          <div class="form-field form-field--full">\r
            <label class="form-label">Correo electr\xF3nico *</label>\r
            <input type="email" class="form-input" formControlName="email" placeholder="juan@example.com">\r
            <p *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="field-error">\r
              Ingresa un correo v\xE1lido\r
            </p>\r
          </div>\r
\r
          <div class="form-field form-field--full">\r
            <label class="form-label">Tel\xE9fono</label>\r
            <input type="tel" class="form-input" formControlName="phone" placeholder="+52 1234567890">\r
          </div>\r
\r
          <ng-container *ngIf="isNew">\r
            <div class="form-field form-field--full">\r
              <label class="form-label">Contrase\xF1a *</label>\r
              <div class="input-with-toggle">\r
                <input\r
                  [type]="showPassword() ? 'text' : 'password'"\r
                  class="form-input"\r
                  formControlName="password"\r
                  placeholder="Ingresa una contrase\xF1a">\r
                <button type="button" class="toggle-btn" (click)="togglePasswordVisibility()" aria-label="Mostrar contrase\xF1a">\r
                  <svg *ngIf="!showPassword()" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>\r
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>\r
                  </svg>\r
                  <svg *ngIf="showPassword()" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>\r
                  </svg>\r
                </button>\r
              </div>\r
            </div>\r
\r
            <div class="form-field form-field--full">\r
              <label class="form-label">Confirmar contrase\xF1a *</label>\r
              <div class="input-with-toggle">\r
                <input\r
                  [type]="showConfirmPassword() ? 'text' : 'password'"\r
                  class="form-input"\r
                  formControlName="confirm_password"\r
                  placeholder="Confirma tu contrase\xF1a">\r
                <button type="button" class="toggle-btn" (click)="toggleConfirmPasswordVisibility()" aria-label="Mostrar contrase\xF1a">\r
                  <svg *ngIf="!showConfirmPassword()" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>\r
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>\r
                  </svg>\r
                  <svg *ngIf="showConfirmPassword()" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>\r
                  </svg>\r
                </button>\r
              </div>\r
              <p\r
                *ngIf="form.get('confirm_password')?.touched && form.get('confirm_password')?.value !== form.get('password')?.value"\r
                class="field-error">\r
                Las contrase\xF1as no coinciden\r
              </p>\r
            </div>\r
          </ng-container>\r
        </div>\r
      </div>\r
\r
      <!-- POS -->\r
      <div *ngIf="activeTab === 'pos'" class="tab-pane">\r
        <div class="form-grid form-grid--single">\r
          <div class="form-field form-field--full">\r
            <label class="toggle-row" [class.toggle-row--disabled]="isPosEditLockedByOpenCut()">\r
              <input\r
                type="checkbox"\r
                class="toggle-checkbox"\r
                formControlName="is_pos_user"\r
                [attr.aria-disabled]="isPosEditLockedByOpenCut()">\r
              <span class="toggle-label">Usuario de tipo POS</span>\r
            </label>\r
            <p class="field-hint">\r
              Las terminales POS requieren sucursal asignada. <strong>Ventas</strong> solo captura pedidos; <strong>Cobranza</strong> maneja el corte del d\xEDa y el cobro.\r
            </p>\r
          </div>\r
\r
          <div class="form-field form-field--full" *ngIf="form.get('is_pos_user')?.value">\r
            <span class="form-label">Tipo de terminal *</span>\r
            <div class="pos-type-options">\r
              <label\r
                *ngFor="let option of posUserTypeOptions"\r
                class="pos-type-option"\r
                [class.pos-type-option--selected]="form.get('pos_user_type')?.value === option.value"\r
                [class.pos-type-option--disabled]="isPosEditLockedByOpenCut()">\r
                <input\r
                  type="radio"\r
                  formControlName="pos_user_type"\r
                  [value]="option.value">\r
                <span class="pos-type-option__content">\r
                  <span class="pos-type-option__label">{{ option.label }}</span>\r
                  <span class="pos-type-option__desc">{{ option.description }}</span>\r
                </span>\r
              </label>\r
            </div>\r
            <p\r
              *ngIf="form.get('pos_user_type')?.invalid && form.get('pos_user_type')?.touched"\r
              class="field-error">\r
              Selecciona un tipo de terminal\r
            </p>\r
            <p *ngIf="showPosTypeChangeWarning()" class="field-hint field-hint--warning">\r
              Cambiar el tipo de terminal afecta qu\xE9 pantallas ver\xE1 al iniciar sesi\xF3n en el POS (ventas vs cobranza/corte).\r
            </p>\r
          </div>\r
\r
          <div class="form-field form-field--full" *ngIf="!form.get('is_pos_user')?.value">\r
            <label class="form-label">C\xF3digo</label>\r
            <input\r
              type="number"\r
              class="form-input"\r
              formControlName="pos_user_code"\r
              placeholder="Ej. 33456"\r
              min="1"\r
              step="1">\r
            <p *ngIf="form.get('pos_user_code')?.invalid && form.get('pos_user_code')?.touched" class="field-error">\r
              Ingresa un n\xFAmero entero mayor a 0\r
            </p>\r
            <p class="field-hint">Opcional. Debe ser \xFAnico entre usuarios.</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Sucursales asignadas -->\r
      <div *ngIf="activeTab === 'branches'" class="tab-pane">\r
        <p class="field-hint branches-intro">\r
          Selecciona una sucursal para restringir el acceso del usuario. Si no seleccionas ninguna, tendr\xE1 acceso a todas.\r
          Los usuarios POS deben tener una sucursal asignada.\r
        </p>\r
\r
        <div *ngIf="branches().length > 0" class="branch-list">\r
          <label\r
            *ngIf="!form.get('is_pos_user')?.value"\r
            class="branch-item"\r
            [class.branch-item--selected]="isAllBranchesSelected()"\r
            [class.branch-item--disabled]="isPosEditLockedByOpenCut()">\r
            <input\r
              type="radio"\r
              formControlName="billing_branch_id"\r
              value="">\r
            <span class="branch-item__name">Sin restricci\xF3n / Todas las sucursales</span>\r
          </label>\r
\r
          <label\r
            *ngFor="let branch of branches()"\r
            class="branch-item"\r
            [class.branch-item--selected]="isBranchOptionSelected(branch.id)"\r
            [class.branch-item--disabled]="isPosEditLockedByOpenCut()">\r
            <input\r
              type="radio"\r
              formControlName="billing_branch_id"\r
              [value]="branch.id">\r
            <span class="branch-item__name">{{ branchLabel(branch) }}</span>\r
          </label>\r
        </div>\r
\r
        <p\r
          *ngIf="form.get('is_pos_user')?.value && form.get('billing_branch_id')?.invalid && form.get('billing_branch_id')?.touched"\r
          class="field-error branches-error">\r
          Selecciona una sucursal para usuarios POS\r
        </p>\r
\r
        <div *ngIf="branches().length === 0" class="empty-state">\r
          <p>No hay sucursales configuradas.</p>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div *ngIf="!loading()" class="modal-footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      [disabled]="saving()"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      [text]="isNew ? 'Crear' : 'Guardar cambios'"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: [`/* src/app/features/rbac-tenant-ui/components/user-detail-modal/user-detail-modal.component.scss */
.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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
  padding: 0 16px 8px;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
  background: #fafbfc;
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  color: #6b7280;
}
.loading-container p {
  margin-top: 12px;
  font-size: 14px;
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.tab-content {
  padding: 16px 0;
}
.tab-pane {
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.form-grid--single {
  grid-template-columns: 1fr;
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
.form-input,
.form-select {
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
.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
.field-error {
  font-size: 11px;
  color: #dc2626;
  margin: 0;
}
.field-hint {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}
.field-hint--warning {
  color: #b45309;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 6px;
  padding: 8px 10px;
}
.pos-type-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pos-type-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.pos-type-option input {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  accent-color: #3b82f6;
  cursor: pointer;
  flex-shrink: 0;
}
.pos-type-option:hover {
  border-color: #93c5fd;
  background: #f8fafc;
}
.pos-type-option--selected {
  border-color: #3b82f6;
  background: #eff6ff;
}
.pos-type-option--disabled {
  cursor: not-allowed;
  opacity: 0.65;
  pointer-events: none;
}
.pos-type-option__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pos-type-option__label {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}
.pos-type-option__desc {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}
.input-with-toggle {
  position: relative;
}
.input-with-toggle .form-input {
  padding-right: 40px;
}
.toggle-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: flex;
}
.toggle-btn:hover {
  color: #6b7280;
}
.toggle-row {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.toggle-row--disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
.open-cut-banner {
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #fde68a;
  background: #fffbeb;
}
.open-cut-banner__title {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: #92400e;
}
.open-cut-banner__text {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: #b45309;
}
.toggle-checkbox {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
  cursor: pointer;
}
.toggle-label {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}
.empty-state {
  padding: 24px 12px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
  border: 1px dashed #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}
.empty-state p {
  margin: 0;
}
.branches-intro {
  margin-bottom: 12px;
}
.branch-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
}
.branch-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.branch-item input {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
  cursor: pointer;
  flex-shrink: 0;
}
.branch-item:hover {
  border-color: #93c5fd;
  background: #f8fafc;
}
.branch-item--selected {
  border-color: #3b82f6;
  background: #eff6ff;
}
.branch-item--disabled {
  cursor: not-allowed;
  opacity: 0.65;
  pointer-events: none;
}
.branch-item__name {
  font-size: 13px;
  color: #111827;
  line-height: 1.4;
}
.branches-error {
  margin-top: 12px;
}
@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-field--full {
    grid-column: auto;
  }
}
/*# sourceMappingURL=user-detail-modal.component.css.map */
`] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: UserService }, { type: BranchService }, { type: AuthService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserDetailModalComponent, { className: "UserDetailModalComponent", filePath: "src/app/features/rbac-tenant-ui/components/user-detail-modal/user-detail-modal.component.ts", lineNumber: 22 });
})();

// src/app/features/rbac-tenant-ui/components/user-details/user-details.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function UserDetailsComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("info-tag--pos", ctx_r0.user.pos_user_type === "VENTAS")("info-tag--pos-cobranza", ctx_r0.user.pos_user_type === "COBRANZA");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getPosUserTypeLabel(), " ");
  }
}
function UserDetailsComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getPosUserTypeLabel(), " ");
  }
}
function UserDetailsComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "dt");
    \u0275\u0275text(2, "C\xF3digo vendedor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "dd")(4, "span", 30);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx);
  }
}
function UserDetailsComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "p", 31);
    \u0275\u0275text(2, " Corte global abierto: cierra el corte en el POS antes de cambiar tipo o sucursal. ");
    \u0275\u0275elementEnd()();
  }
}
function UserDetailsComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.getBillingBranchCode());
  }
}
function UserDetailsComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getBillingBranchLabel(), " ");
  }
}
function UserDetailsComponent_For_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r2 = ctx.$implicit;
    \u0275\u0275property("value", role_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r2.name);
  }
}
function UserDetailsComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "div", 32);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando roles\u2026");
    \u0275\u0275elementEnd()();
  }
}
function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275element(1, "lucide-icon", 28);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Sin roles asignados");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r0.icons.Shield)("size", 20);
  }
}
function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 46);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(role_r4.description);
  }
}
function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_For_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("value", r_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r6.name);
  }
}
function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_For_5_Conditional_0_Template, 2, 2, "option", 26);
  }
  if (rf & 2) {
    const r_r6 = ctx.$implicit;
    const role_r4 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275conditional(r_r6.id !== role_r4.id ? 0 : -1);
  }
}
function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "select", 47);
    \u0275\u0275listener("change", function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_Template_select_change_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.selectedReplaceRoleId = $event.target.value);
    });
    \u0275\u0275elementStart(2, "option", 48);
    \u0275\u0275text(3, "Selecciona el nuevo rol\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_For_5_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 49)(7, "button", 50);
    \u0275\u0275listener("click", function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.cancelRoleReplacement());
    });
    \u0275\u0275element(8, "lucide-icon", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 51);
    \u0275\u0275listener("click", function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r0.confirmRoleReplacement());
    });
    \u0275\u0275text(10, " Reemplazar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.selectedReplaceRoleId);
    \u0275\u0275attribute("data-testid", "replace-role-select");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.availableRoles);
    \u0275\u0275advance(4);
    \u0275\u0275property("img", ctx_r0.icons.X)("size", 14);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.selectedReplaceRoleId);
  }
}
function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 35)(1, "div", 36)(2, "div", 37);
    \u0275\u0275element(3, "lucide-icon", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 38)(5, "p", 39);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 40);
    \u0275\u0275text(8);
    \u0275\u0275conditionalCreate(9, UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_9_Template, 4, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 41)(11, "button", 42);
    \u0275\u0275listener("click", function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Template_button_click_11_listener() {
      const role_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.openRoleReplacement(role_r4.id));
    });
    \u0275\u0275element(12, "lucide-icon", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 43);
    \u0275\u0275listener("click", function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Template_button_click_13_listener() {
      const role_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.deleteRoleFromUser(role_r4.id));
    });
    \u0275\u0275element(14, "lucide-icon", 28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(15, UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Conditional_15_Template, 11, 5, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275attribute("data-testid", "role-item-" + role_r4.id);
    \u0275\u0275advance(3);
    \u0275\u0275property("img", ctx_r0.icons.Shield)("size", 18);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(role_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", role_r4.permissions.length, " permiso", role_r4.permissions.length !== 1 ? "s" : "", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(role_r4.description ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("data-testid", "replace-role-btn-" + role_r4.id);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r0.icons.RefreshCw)("size", 15);
    \u0275\u0275advance();
    \u0275\u0275attribute("data-testid", "delete-role-btn-" + role_r4.id);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r0.icons.Trash2)("size", 15);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.replacingRoleId === role_r4.id ? 15 : -1);
  }
}
function UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 34);
    \u0275\u0275repeaterCreate(1, UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_For_2_Template, 16, 14, "li", 35, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const roles_r7 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(roles_r7);
  }
}
function UserDetailsComponent_Conditional_92_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UserDetailsComponent_Conditional_92_Conditional_0_Conditional_0_Template, 4, 2, "div", 33)(1, UserDetailsComponent_Conditional_92_Conditional_0_Conditional_1_Template, 3, 0, "ul", 34);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length === 0 ? 0 : 1);
  }
}
function UserDetailsComponent_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UserDetailsComponent_Conditional_92_Conditional_0_Template, 2, 1);
    \u0275\u0275pipe(1, "async");
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(1, 1, ctx_r0.userRoles$)) ? 0 : -1, tmp_1_0);
  }
}
var UserDetailsComponent = class _UserDetailsComponent {
  snackBar;
  dialog;
  icons = { Shield, Plus, RefreshCw, Trash2, X };
  user;
  userRoles$;
  availableRoles$;
  isLoadingRoles$;
  roleAssigned = new EventEmitter();
  roleReplaced = new EventEmitter();
  roleDeleted = new EventEmitter();
  userUpdated = new EventEmitter();
  availableRoles = [];
  selectedAssignRoleId = "";
  replacingRoleId = null;
  selectedReplaceRoleId = "";
  selectedRoleIdForAssignment$ = new BehaviorSubject(null);
  rolesSub;
  constructor(snackBar, dialog) {
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  ngOnInit() {
    if (this.availableRoles$) {
      this.rolesSub = this.availableRoles$.subscribe((roles) => {
        this.availableRoles = roles;
      });
    }
  }
  ngOnDestroy() {
    this.rolesSub?.unsubscribe();
  }
  get userInitials() {
    const first = (this.user.first_name || this.user.name || "?").charAt(0);
    const last = (this.user.last_name || "").charAt(0);
    return (first + last).toUpperCase();
  }
  onAssignRoleChange(event) {
    const value = event.target.value;
    this.selectedAssignRoleId = value;
    this.selectedRoleIdForAssignment$.next(value || null);
  }
  confirmRoleAssignment() {
    const selectedRoleId = this.selectedRoleIdForAssignment$.value;
    if (!selectedRoleId)
      return;
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Asignar rol",
        message: `\xBFAsignar este rol a ${this.user.email}?`,
        confirmText: "Asignar",
        cancelText: "Cancelar"
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.roleAssigned.emit({ userId: this.user.id, roleId: selectedRoleId });
        this.selectedAssignRoleId = "";
        this.selectedRoleIdForAssignment$.next(null);
      }
    });
  }
  openRoleReplacement(roleId) {
    this.replacingRoleId = roleId;
    this.selectedReplaceRoleId = "";
  }
  cancelRoleReplacement() {
    this.replacingRoleId = null;
    this.selectedReplaceRoleId = "";
  }
  confirmRoleReplacement() {
    if (!this.replacingRoleId || !this.selectedReplaceRoleId)
      return;
    this.roleReplaced.emit({
      userId: this.user.id,
      oldRoleId: this.replacingRoleId,
      newRoleId: this.selectedReplaceRoleId
    });
    this.replacingRoleId = null;
    this.selectedReplaceRoleId = "";
  }
  deleteRoleFromUser(roleId) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Eliminar rol",
        message: `\xBFEliminar este rol de ${this.user.email}? Esta acci\xF3n no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        isDangerous: true
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.roleDeleted.emit({ userId: this.user.id, roleId });
      }
    });
  }
  getStatusBadgeClass(status) {
    switch (status) {
      case "active":
        return "user-detail__status--active";
      case "inactive":
        return "user-detail__status--inactive";
      case "pending":
        return "user-detail__status--pending";
      default:
        return "user-detail__status--inactive";
    }
  }
  getNormalizedStatus(status) {
    if (typeof status === "string")
      return status;
    if (status && typeof status === "object" && status.code)
      return status.code;
    return "active";
  }
  getPosUserLabel() {
    return this.user.is_pos_user ? "S\xED" : "No";
  }
  getPosUserTypeLabel() {
    if (!this.user.is_pos_user) {
      return "\u2014";
    }
    return getPosUserTypeLabel(this.user.pos_user_type) ?? "\u2014";
  }
  hasOpenGlobalCut() {
    return userHasOpenGlobalCut(this.user);
  }
  getPosUserCodeLabel() {
    if (this.user.is_pos_user || !this.user.pos_user_code) {
      return null;
    }
    return String(this.user.pos_user_code);
  }
  getBillingBranchCode() {
    const branch = this.user.billing_branch;
    if (!branch) {
      return null;
    }
    return branch.display_name?.trim() || branch.code?.trim() || null;
  }
  getBillingBranchLabel() {
    if (this.getBillingBranchCode()) {
      return this.getBillingBranchCode();
    }
    if (this.user.has_all_branches_access) {
      return "Todas las sucursales";
    }
    return "\u2014";
  }
  openEditDialog() {
    this.dialog.open(UserDetailModalComponent, {
      width: "620px",
      maxHeight: "90vh",
      panelClass: "custom-dialog-container",
      data: { user: this.user, isNew: false }
    }).afterClosed().subscribe((result) => {
      if (result)
        this.userUpdated.emit();
    });
  }
  static \u0275fac = function UserDetailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserDetailsComponent)(\u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserDetailsComponent, selectors: [["app-user-details"]], inputs: { user: "user", userRoles$: "userRoles$", availableRoles$: "availableRoles$", isLoadingRoles$: "isLoadingRoles$" }, outputs: { roleAssigned: "roleAssigned", roleReplaced: "roleReplaced", roleDeleted: "roleDeleted", userUpdated: "userUpdated" }, decls: 93, vars: 40, consts: [[1, "user-detail"], [1, "user-detail__header"], [1, "user-detail__profile"], ["aria-hidden", "true", 1, "user-detail__avatar"], [1, "user-detail__identity"], [1, "user-detail__name-row"], [1, "user-detail__name"], [1, "user-detail__status", 3, "ngClass"], [1, "user-detail__email", 3, "title"], ["text", "Editar", "size", "sm", "custom_class", "btn_primary", 3, "clicked"], [1, "user-detail__body"], [1, "user-detail__section"], [1, "section-title"], [1, "info-list"], [1, "info-list__item"], [1, "info-list__truncate", 3, "title"], [1, "info-tag"], [1, "info-tag", 3, "info-tag--pos", "info-tag--pos-cobranza"], [1, "info-list__item", "info-list__item--full"], [1, "info-tag", "info-tag--branch"], [1, "role-assign"], [1, "role-assign__field"], ["for", "assign-role-select", 1, "role-assign__label"], [1, "role-assign__row"], ["id", "assign-role-select", 1, "role-select", 3, "change", "value"], ["value", "", "disabled", "", "selected", "", "hidden", ""], [3, "value"], ["type", "button", 1, "role-assign__btn", 3, "click", "disabled"], [3, "img", "size"], [1, "role-loading"], [1, "info-tag", "info-tag--code"], [1, "open-cut-note"], [1, "role-loading__spinner"], [1, "role-empty"], [1, "role-list"], [1, "role-item"], [1, "role-item__main"], [1, "role-item__icon"], [1, "role-item__content"], [1, "role-item__name"], [1, "role-item__meta"], [1, "role-item__actions"], ["type", "button", "title", "Reemplazar rol", 1, "role-action", "role-action--ghost", 3, "click"], ["type", "button", "title", "Eliminar rol", 1, "role-action", "role-action--danger", 3, "click"], [1, "role-replace"], [1, "role-item__dot"], [1, "role-item__desc"], [1, "role-select", "role-select--inline", 3, "change", "value"], ["value", "", "disabled", "", "selected", ""], [1, "role-replace__actions"], ["type", "button", 1, "role-replace__cancel", 3, "click"], ["type", "button", 1, "role-replace__confirm", 3, "click", "disabled"]], template: function UserDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "h3", 6);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "span", 7);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "titlecase");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "p", 8);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "app-button", 9);
      \u0275\u0275listener("clicked", function UserDetailsComponent_Template_app_button_clicked_14_listener() {
        return ctx.openEditDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 10)(16, "section", 11)(17, "h4", 12);
      \u0275\u0275text(18, "Informaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "dl", 13)(20, "div", 14)(21, "dt");
      \u0275\u0275text(22, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "dd");
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 14)(26, "dt");
      \u0275\u0275text(27, "Apellido");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "dd");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 14)(31, "dt");
      \u0275\u0275text(32, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "dd", 15);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 14)(36, "dt");
      \u0275\u0275text(37, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "dd");
      \u0275\u0275text(39);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 14)(41, "dt");
      \u0275\u0275text(42, "Creado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "dd");
      \u0275\u0275text(44);
      \u0275\u0275pipe(45, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 14)(47, "dt");
      \u0275\u0275text(48, "\xDAltimo acceso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "dd");
      \u0275\u0275text(50);
      \u0275\u0275pipe(51, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "div", 14)(53, "dt");
      \u0275\u0275text(54, "Usuario POS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "dd")(56, "span", 16);
      \u0275\u0275text(57);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(58, "div", 14)(59, "dt");
      \u0275\u0275text(60, "Tipo terminal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "dd");
      \u0275\u0275conditionalCreate(62, UserDetailsComponent_Conditional_62_Template, 2, 5, "span", 17)(63, UserDetailsComponent_Conditional_63_Template, 1, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(64, UserDetailsComponent_Conditional_64_Template, 6, 1, "div", 14);
      \u0275\u0275conditionalCreate(65, UserDetailsComponent_Conditional_65_Template, 3, 0, "div", 18);
      \u0275\u0275elementStart(66, "div", 14)(67, "dt");
      \u0275\u0275text(68, "Sucursal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "dd");
      \u0275\u0275conditionalCreate(70, UserDetailsComponent_Conditional_70_Template, 2, 1, "span", 19)(71, UserDetailsComponent_Conditional_71_Template, 1, 1);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(72, "section", 11)(73, "h4", 12);
      \u0275\u0275text(74, "Roles y permisos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "div", 20)(76, "div", 21)(77, "label", 22);
      \u0275\u0275text(78, "Asignar rol");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(79, "div", 23)(80, "select", 24);
      \u0275\u0275listener("change", function UserDetailsComponent_Template_select_change_80_listener($event) {
        return ctx.onAssignRoleChange($event);
      });
      \u0275\u0275elementStart(81, "option", 25);
      \u0275\u0275text(82, "Selecciona un rol\u2026");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(83, UserDetailsComponent_For_84_Template, 2, 2, "option", 26, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(85, "button", 27);
      \u0275\u0275pipe(86, "async");
      \u0275\u0275listener("click", function UserDetailsComponent_Template_button_click_85_listener() {
        return ctx.confirmRoleAssignment();
      });
      \u0275\u0275element(87, "lucide-icon", 28);
      \u0275\u0275elementStart(88, "span");
      \u0275\u0275text(89, "Agregar");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275conditionalCreate(90, UserDetailsComponent_Conditional_90_Template, 4, 0, "div", 29);
      \u0275\u0275pipe(91, "async");
      \u0275\u0275conditionalBranchCreate(92, UserDetailsComponent_Conditional_92_Template, 2, 3);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_16_0;
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.userInitials);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2(" ", ctx.user.first_name || ctx.user.name || "N/A", " ", ctx.user.last_name || "", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.getStatusBadgeClass(ctx.getNormalizedStatus(ctx.user.status)));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 28, ctx.getNormalizedStatus(ctx.user.status)), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("title", ctx.user.email);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.user.email);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.user.first_name || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.user.last_name || "N/A");
      \u0275\u0275advance(4);
      \u0275\u0275property("title", ctx.user.email);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.user.email);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.user.phone || "\u2014");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(45, 30, ctx.user.createdAt, "d MMM y"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.user.last_login_at ? \u0275\u0275pipeBind2(51, 33, ctx.user.last_login_at, "d MMM y") : "Nunca");
      \u0275\u0275advance(6);
      \u0275\u0275classProp("info-tag--pos", ctx.user.is_pos_user);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.getPosUserLabel(), " ");
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.user.is_pos_user && ctx.user.pos_user_type ? 62 : 63);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_16_0 = ctx.getPosUserCodeLabel()) ? 64 : -1, tmp_16_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasOpenGlobalCut() ? 65 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.getBillingBranchCode() ? 70 : 71);
      \u0275\u0275advance(10);
      \u0275\u0275property("value", ctx.selectedAssignRoleId);
      \u0275\u0275attribute("data-testid", "assign-role-select");
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.availableRoles);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !\u0275\u0275pipeBind1(86, 36, ctx.selectedRoleIdForAssignment$));
      \u0275\u0275attribute("data-testid", "confirm-assign-role-btn");
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.icons.Plus)("size", 16);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(91, 38, ctx.isLoadingRoles$) ? 90 : 92);
    }
  }, dependencies: [CommonModule, NgClass, ButtonComponent, LucideAngularModule, LucideAngularComponent, AsyncPipe, TitleCasePipe, DatePipe], styles: [`

[_nghost-%COMP%] {
  display: block;
  height: 100%;
}
.user-detail[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}
.user-detail__header[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
}
.user-detail__profile[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
.user-detail__avatar[_ngcontent-%COMP%] {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      #6366f1,
      #8b5cf6);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}
.user-detail__identity[_ngcontent-%COMP%] {
  min-width: 0;
}
.user-detail__name-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.user-detail__name[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
}
.user-detail__email[_ngcontent-%COMP%] {
  margin: 4px 0 0;
  font-size: 0.8125rem;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-detail__status[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.user-detail__status--active[_ngcontent-%COMP%] {
  background: #dcfce7;
  color: #15803d;
}
.user-detail__status--inactive[_ngcontent-%COMP%] {
  background: #f1f5f9;
  color: #64748b;
}
.user-detail__status--pending[_ngcontent-%COMP%] {
  background: #fef9c3;
  color: #a16207;
}
.user-detail__body[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px 28px;
  -webkit-overflow-scrolling: touch;
}
.user-detail__body[_ngcontent-%COMP%]::-webkit-scrollbar {
  width: 6px;
}
.user-detail__body[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 3px;
}
.user-detail__section[_ngcontent-%COMP%]    + .user-detail__section[_ngcontent-%COMP%] {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid #f1f5f9;
}
.section-title[_ngcontent-%COMP%] {
  margin: 0 0 14px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}
.info-list[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}
.info-list__item[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 14px;
  background: #fafbfc;
  border-bottom: 1px solid #f1f5f9;
}
.info-list__item[_ngcontent-%COMP%]:nth-child(odd) {
  border-right: 1px solid #f1f5f9;
}
.info-list__item[_ngcontent-%COMP%]:nth-last-child(-n+2) {
  border-bottom: none;
}
.info-list__item[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
}
.info-list__item[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
}
.info-list__item--full[_ngcontent-%COMP%] {
  grid-column: 1/-1;
  border-right: none !important;
}
.open-cut-note[_ngcontent-%COMP%] {
  margin: 0;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #fde68a;
  background: #fffbeb;
  font-size: 12px;
  line-height: 1.45;
  color: #b45309;
}
.info-list__truncate[_ngcontent-%COMP%] {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-tag[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  color: #64748b;
  background: #f1f5f9;
}
.info-tag--pos[_ngcontent-%COMP%] {
  color: #7c3aed;
  background: #f3e8ff;
}
.info-tag--pos-cobranza[_ngcontent-%COMP%] {
  color: #b45309;
  background: #fef3c7;
}
.info-tag--code[_ngcontent-%COMP%] {
  color: #4b5563;
  background: #f3f4f6;
}
.info-tag--branch[_ngcontent-%COMP%] {
  color: #0369a1;
  background: #e0f2fe;
}
.role-assign[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.role-assign__label[_ngcontent-%COMP%] {
  display: block;
  margin-bottom: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #475569;
}
.role-assign__row[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.role-select[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 36px 0 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 10px center/18px no-repeat;
  font-size: 0.875rem;
  color: #1e293b;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.role-select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}
.role-select--inline[_ngcontent-%COMP%] {
  flex: 1;
  height: 36px;
  font-size: 0.8125rem;
}
.role-assign__btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: #6366f1;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, opacity 0.15s;
}
.role-assign__btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #4f46e5;
}
.role-assign__btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.role-loading[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 32px 16px;
  color: #94a3b8;
  font-size: 0.875rem;
}
.role-loading__spinner[_ngcontent-%COMP%] {
  width: 28px;
  height: 28px;
  border: 3px solid #e2e8f0;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;
}
.role-loading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.role-empty[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 16px;
  color: #94a3b8;
  font-size: 0.875rem;
}
.role-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.role-list[_ngcontent-%COMP%] {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.role-item[_ngcontent-%COMP%] {
  border: 1px solid #e8ecf1;
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.role-item[_ngcontent-%COMP%]:hover {
  border-color: #c7d2fe;
  box-shadow: 0 1px 4px rgba(99, 102, 241, 0.08);
}
.role-item__main[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}
.role-item__icon[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #eef2ff;
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.role-item__content[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.role-item__name[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
}
.role-item__meta[_ngcontent-%COMP%] {
  margin: 2px 0 0;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
}
.role-item__dot[_ngcontent-%COMP%] {
  margin: 0 4px;
  color: #cbd5e1;
}
.role-item__desc[_ngcontent-%COMP%] {
  color: #94a3b8;
}
.role-item__actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
.role-action[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.role-action--ghost[_ngcontent-%COMP%] {
  background: transparent;
  color: #64748b;
}
.role-action--ghost[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
  color: #6366f1;
}
.role-action--danger[_ngcontent-%COMP%] {
  background: transparent;
  color: #94a3b8;
}
.role-action--danger[_ngcontent-%COMP%]:hover {
  background: #fef2f2;
  color: #dc2626;
}
.role-replace[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px 12px;
  background: #f8fafc;
  border-top: 1px solid #e8ecf1;
}
.role-replace__actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.role-replace__cancel[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #fff;
  color: #64748b;
  cursor: pointer;
}
.role-replace__cancel[_ngcontent-%COMP%]:hover {
  background: #f1f5f9;
}
.role-replace__confirm[_ngcontent-%COMP%] {
  height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: 7px;
  background: #6366f1;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.role-replace__confirm[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #4f46e5;
}
.role-replace__confirm[_ngcontent-%COMP%]:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .user-detail__header[_ngcontent-%COMP%] {
    padding: 16px;
    flex-direction: column;
    align-items: stretch;
  }
  .user-detail__body[_ngcontent-%COMP%] {
    padding: 16px;
  }
  .info-list[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .info-list__item[_ngcontent-%COMP%]:nth-child(odd) {
    border-right: none;
  }
  .info-list__item[_ngcontent-%COMP%]:not(:last-child) {
    border-bottom: 1px solid #f1f5f9;
  }
  .role-assign__row[_ngcontent-%COMP%] {
    flex-direction: column;
  }
  .role-assign__btn[_ngcontent-%COMP%] {
    justify-content: center;
    width: 100%;
  }
  .role-replace[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
  }
  .role-replace__actions[_ngcontent-%COMP%] {
    justify-content: flex-end;
  }
}
/*# sourceMappingURL=user-details.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserDetailsComponent, [{
    type: Component,
    args: [{ selector: "app-user-details", standalone: true, imports: [CommonModule, ButtonComponent, LucideAngularModule], template: `<div class="user-detail">\r
  <header class="user-detail__header">\r
    <div class="user-detail__profile">\r
      <div class="user-detail__avatar" aria-hidden="true">{{ userInitials }}</div>\r
      <div class="user-detail__identity">\r
        <div class="user-detail__name-row">\r
          <h3 class="user-detail__name">\r
            {{ user.first_name || user.name || 'N/A' }} {{ user.last_name || '' }}\r
          </h3>\r
          <span\r
            class="user-detail__status"\r
            [ngClass]="getStatusBadgeClass(getNormalizedStatus(user.status))">\r
            {{ getNormalizedStatus(user.status) | titlecase }}\r
          </span>\r
        </div>\r
        <p class="user-detail__email" [title]="user.email">{{ user.email }}</p>\r
      </div>\r
    </div>\r
    <app-button\r
      text="Editar"\r
      size="sm"\r
      custom_class="btn_primary"\r
      (clicked)="openEditDialog()">\r
    </app-button>\r
  </header>\r
\r
  <div class="user-detail__body">\r
    <section class="user-detail__section">\r
      <h4 class="section-title">Informaci\xF3n</h4>\r
      <dl class="info-list">\r
        <div class="info-list__item">\r
          <dt>Nombre</dt>\r
          <dd>{{ user.first_name || 'N/A' }}</dd>\r
        </div>\r
        <div class="info-list__item">\r
          <dt>Apellido</dt>\r
          <dd>{{ user.last_name || 'N/A' }}</dd>\r
        </div>\r
        <div class="info-list__item">\r
          <dt>Email</dt>\r
          <dd class="info-list__truncate" [title]="user.email">{{ user.email }}</dd>\r
        </div>\r
        <div class="info-list__item">\r
          <dt>Tel\xE9fono</dt>\r
          <dd>{{ user.phone || '\u2014' }}</dd>\r
        </div>\r
        <div class="info-list__item">\r
          <dt>Creado</dt>\r
          <dd>{{ user.createdAt | date: 'd MMM y' }}</dd>\r
        </div>\r
        <div class="info-list__item">\r
          <dt>\xDAltimo acceso</dt>\r
          <dd>{{ user.last_login_at ? (user.last_login_at | date: 'd MMM y') : 'Nunca' }}</dd>\r
        </div>\r
        <div class="info-list__item">\r
          <dt>Usuario POS</dt>\r
          <dd>\r
            <span class="info-tag" [class.info-tag--pos]="user.is_pos_user">\r
              {{ getPosUserLabel() }}\r
            </span>\r
          </dd>\r
        </div>\r
        <div class="info-list__item">\r
          <dt>Tipo terminal</dt>\r
          <dd>\r
            @if (user.is_pos_user && user.pos_user_type) {\r
              <span\r
                class="info-tag"\r
                [class.info-tag--pos]="user.pos_user_type === 'VENTAS'"\r
                [class.info-tag--pos-cobranza]="user.pos_user_type === 'COBRANZA'">\r
                {{ getPosUserTypeLabel() }}\r
              </span>\r
            } @else {\r
              {{ getPosUserTypeLabel() }}\r
            }\r
          </dd>\r
        </div>\r
        @if (getPosUserCodeLabel(); as code) {\r
          <div class="info-list__item">\r
            <dt>C\xF3digo vendedor</dt>\r
            <dd>\r
              <span class="info-tag info-tag--code">{{ code }}</span>\r
            </dd>\r
          </div>\r
        }\r
        @if (hasOpenGlobalCut()) {\r
          <div class="info-list__item info-list__item--full">\r
            <p class="open-cut-note">\r
              Corte global abierto: cierra el corte en el POS antes de cambiar tipo o sucursal.\r
            </p>\r
          </div>\r
        }\r
        <div class="info-list__item">\r
          <dt>Sucursal</dt>\r
          <dd>\r
            @if (getBillingBranchCode()) {\r
              <span class="info-tag info-tag--branch">{{ getBillingBranchCode() }}</span>\r
            } @else {\r
              {{ getBillingBranchLabel() }}\r
            }\r
          </dd>\r
        </div>\r
      </dl>\r
    </section>\r
\r
    <section class="user-detail__section">\r
      <h4 class="section-title">Roles y permisos</h4>\r
\r
      <div class="role-assign">\r
        <div class="role-assign__field">\r
          <label class="role-assign__label" for="assign-role-select">Asignar rol</label>\r
          <div class="role-assign__row">\r
            <select\r
              id="assign-role-select"\r
              class="role-select"\r
              [value]="selectedAssignRoleId"\r
              (change)="onAssignRoleChange($event)"\r
              [attr.data-testid]="'assign-role-select'">\r
              <option value="" disabled selected hidden>Selecciona un rol\u2026</option>\r
              @for (role of availableRoles; track role.id) {\r
                <option [value]="role.id">{{ role.name }}</option>\r
              }\r
            </select>\r
            <button\r
              type="button"\r
              class="role-assign__btn"\r
              [disabled]="!(selectedRoleIdForAssignment$ | async)"\r
              (click)="confirmRoleAssignment()"\r
              [attr.data-testid]="'confirm-assign-role-btn'">\r
              <lucide-icon [img]="icons.Plus" [size]="16"></lucide-icon>\r
              <span>Agregar</span>\r
            </button>\r
          </div>\r
        </div>\r
      </div>\r
\r
      @if (isLoadingRoles$ | async) {\r
        <div class="role-loading">\r
          <div class="role-loading__spinner"></div>\r
          <p>Cargando roles\u2026</p>\r
        </div>\r
      } @else {\r
        @if (userRoles$ | async; as roles) {\r
          @if (roles.length === 0) {\r
            <div class="role-empty">\r
              <lucide-icon [img]="icons.Shield" [size]="20"></lucide-icon>\r
              <p>Sin roles asignados</p>\r
            </div>\r
          } @else {\r
            <ul class="role-list">\r
              @for (role of roles; track role.id) {\r
                <li class="role-item" [attr.data-testid]="'role-item-' + role.id">\r
                  <div class="role-item__main">\r
                    <div class="role-item__icon">\r
                      <lucide-icon [img]="icons.Shield" [size]="18"></lucide-icon>\r
                    </div>\r
                    <div class="role-item__content">\r
                      <p class="role-item__name">{{ role.name }}</p>\r
                      <p class="role-item__meta">\r
                        {{ role.permissions.length }} permiso{{ role.permissions.length !== 1 ? 's' : '' }}\r
                        @if (role.description) {\r
                          <span class="role-item__dot">\xB7</span>\r
                          <span class="role-item__desc">{{ role.description }}</span>\r
                        }\r
                      </p>\r
                    </div>\r
                    <div class="role-item__actions">\r
                      <button\r
                        type="button"\r
                        class="role-action role-action--ghost"\r
                        title="Reemplazar rol"\r
                        (click)="openRoleReplacement(role.id)"\r
                        [attr.data-testid]="'replace-role-btn-' + role.id">\r
                        <lucide-icon [img]="icons.RefreshCw" [size]="15"></lucide-icon>\r
                      </button>\r
                      <button\r
                        type="button"\r
                        class="role-action role-action--danger"\r
                        title="Eliminar rol"\r
                        (click)="deleteRoleFromUser(role.id)"\r
                        [attr.data-testid]="'delete-role-btn-' + role.id">\r
                        <lucide-icon [img]="icons.Trash2" [size]="15"></lucide-icon>\r
                      </button>\r
                    </div>\r
                  </div>\r
\r
                  @if (replacingRoleId === role.id) {\r
                    <div class="role-replace">\r
                      <select\r
                        class="role-select role-select--inline"\r
                        [value]="selectedReplaceRoleId"\r
                        (change)="selectedReplaceRoleId = $any($event.target).value"\r
                        [attr.data-testid]="'replace-role-select'">\r
                        <option value="" disabled selected>Selecciona el nuevo rol\u2026</option>\r
                        @for (r of availableRoles; track r.id) {\r
                          @if (r.id !== role.id) {\r
                            <option [value]="r.id">{{ r.name }}</option>\r
                          }\r
                        }\r
                      </select>\r
                      <div class="role-replace__actions">\r
                        <button type="button" class="role-replace__cancel" (click)="cancelRoleReplacement()">\r
                          <lucide-icon [img]="icons.X" [size]="14"></lucide-icon>\r
                        </button>\r
                        <button\r
                          type="button"\r
                          class="role-replace__confirm"\r
                          [disabled]="!selectedReplaceRoleId"\r
                          (click)="confirmRoleReplacement()">\r
                          Reemplazar\r
                        </button>\r
                      </div>\r
                    </div>\r
                  }\r
                </li>\r
              }\r
            </ul>\r
          }\r
        }\r
      }\r
    </section>\r
  </div>\r
</div>\r
`, styles: [`/* src/app/features/rbac-tenant-ui/components/user-details/user-details.component.scss */
:host {
  display: block;
  height: 100%;
}
.user-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}
.user-detail__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
}
.user-detail__profile {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
.user-detail__avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background:
    linear-gradient(
      135deg,
      #6366f1,
      #8b5cf6);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}
.user-detail__identity {
  min-width: 0;
}
.user-detail__name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.user-detail__name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
}
.user-detail__email {
  margin: 4px 0 0;
  font-size: 0.8125rem;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.user-detail__status {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.user-detail__status--active {
  background: #dcfce7;
  color: #15803d;
}
.user-detail__status--inactive {
  background: #f1f5f9;
  color: #64748b;
}
.user-detail__status--pending {
  background: #fef9c3;
  color: #a16207;
}
.user-detail__body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px 28px;
  -webkit-overflow-scrolling: touch;
}
.user-detail__body::-webkit-scrollbar {
  width: 6px;
}
.user-detail__body::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 3px;
}
.user-detail__section + .user-detail__section {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid #f1f5f9;
}
.section-title {
  margin: 0 0 14px;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
}
.info-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}
.info-list__item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 14px;
  background: #fafbfc;
  border-bottom: 1px solid #f1f5f9;
}
.info-list__item:nth-child(odd) {
  border-right: 1px solid #f1f5f9;
}
.info-list__item:nth-last-child(-n+2) {
  border-bottom: none;
}
.info-list__item dt {
  margin: 0;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
}
.info-list__item dd {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
}
.info-list__item--full {
  grid-column: 1/-1;
  border-right: none !important;
}
.open-cut-note {
  margin: 0;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #fde68a;
  background: #fffbeb;
  font-size: 12px;
  line-height: 1.45;
  color: #b45309;
}
.info-list__truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  color: #64748b;
  background: #f1f5f9;
}
.info-tag--pos {
  color: #7c3aed;
  background: #f3e8ff;
}
.info-tag--pos-cobranza {
  color: #b45309;
  background: #fef3c7;
}
.info-tag--code {
  color: #4b5563;
  background: #f3f4f6;
}
.info-tag--branch {
  color: #0369a1;
  background: #e0f2fe;
}
.role-assign {
  margin-bottom: 16px;
}
.role-assign__label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #475569;
}
.role-assign__row {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.role-select {
  flex: 1;
  min-width: 0;
  height: 40px;
  padding: 0 36px 0 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 10px center/18px no-repeat;
  font-size: 0.875rem;
  color: #1e293b;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.role-select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}
.role-select--inline {
  flex: 1;
  height: 36px;
  font-size: 0.8125rem;
}
.role-assign__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: #6366f1;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, opacity 0.15s;
}
.role-assign__btn:hover:not(:disabled) {
  background: #4f46e5;
}
.role-assign__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.role-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 32px 16px;
  color: #94a3b8;
  font-size: 0.875rem;
}
.role-loading__spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e2e8f0;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.role-loading p {
  margin: 0;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.role-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 28px 16px;
  color: #94a3b8;
  font-size: 0.875rem;
}
.role-empty p {
  margin: 0;
}
.role-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.role-item {
  border: 1px solid #e8ecf1;
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.role-item:hover {
  border-color: #c7d2fe;
  box-shadow: 0 1px 4px rgba(99, 102, 241, 0.08);
}
.role-item__main {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}
.role-item__icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #eef2ff;
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.role-item__content {
  flex: 1;
  min-width: 0;
}
.role-item__name {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
}
.role-item__meta {
  margin: 2px 0 0;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
}
.role-item__dot {
  margin: 0 4px;
  color: #cbd5e1;
}
.role-item__desc {
  color: #94a3b8;
}
.role-item__actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
.role-action {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.role-action--ghost {
  background: transparent;
  color: #64748b;
}
.role-action--ghost:hover {
  background: #f1f5f9;
  color: #6366f1;
}
.role-action--danger {
  background: transparent;
  color: #94a3b8;
}
.role-action--danger:hover {
  background: #fef2f2;
  color: #dc2626;
}
.role-replace {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px 12px;
  background: #f8fafc;
  border-top: 1px solid #e8ecf1;
}
.role-replace__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.role-replace__cancel {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  background: #fff;
  color: #64748b;
  cursor: pointer;
}
.role-replace__cancel:hover {
  background: #f1f5f9;
}
.role-replace__confirm {
  height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: 7px;
  background: #6366f1;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}
.role-replace__confirm:hover:not(:disabled) {
  background: #4f46e5;
}
.role-replace__confirm:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .user-detail__header {
    padding: 16px;
    flex-direction: column;
    align-items: stretch;
  }
  .user-detail__body {
    padding: 16px;
  }
  .info-list {
    grid-template-columns: 1fr;
  }
  .info-list__item:nth-child(odd) {
    border-right: none;
  }
  .info-list__item:not(:last-child) {
    border-bottom: 1px solid #f1f5f9;
  }
  .role-assign__row {
    flex-direction: column;
  }
  .role-assign__btn {
    justify-content: center;
    width: 100%;
  }
  .role-replace {
    flex-direction: column;
    align-items: stretch;
  }
  .role-replace__actions {
    justify-content: flex-end;
  }
}
/*# sourceMappingURL=user-details.component.css.map */
`] }]
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserDetailsComponent, { className: "UserDetailsComponent", filePath: "src/app/features/rbac-tenant-ui/components/user-details/user-details.component.ts", lineNumber: 19 });
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
function UsersManagementComponent_Conditional_15_Conditional_1_For_2_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275classProp("user-card__tag--pos-cobranza", user_r2.pos_user_type === "COBRANZA");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx, " ");
  }
}
function UsersManagementComponent_Conditional_15_Conditional_1_For_2_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" C\xF3digo: ", user_r2.pos_user_code, " ");
  }
}
function UsersManagementComponent_Conditional_15_Conditional_1_For_2_Conditional_13_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function UsersManagementComponent_Conditional_15_Conditional_1_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275conditionalCreate(1, UsersManagementComponent_Conditional_15_Conditional_1_For_2_Conditional_13_Conditional_1_Template, 2, 3, "span", 25);
    \u0275\u0275conditionalCreate(2, UsersManagementComponent_Conditional_15_Conditional_1_For_2_Conditional_13_Conditional_2_Template, 2, 1, "span", 26);
    \u0275\u0275conditionalCreate(3, UsersManagementComponent_Conditional_15_Conditional_1_For_2_Conditional_13_Conditional_3_Template, 2, 1, "span", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_14_0;
    let tmp_16_0;
    const user_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_14_0 = ctx_r2.getPosTypeBadge(user_r2)) ? 1 : -1, tmp_14_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(!user_r2.is_pos_user && user_r2.pos_user_code ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = ctx_r2.getBillingBranchLabel(user_r2)) ? 3 : -1, tmp_16_0);
  }
}
function UsersManagementComponent_Conditional_15_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275pipe(1, "async");
    \u0275\u0275listener("click", function UsersManagementComponent_Conditional_15_Conditional_1_For_2_Template_button_click_0_listener() {
      const user_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onUserSelected(user_r2.id));
    });
    \u0275\u0275elementStart(2, "div", 19);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "div", 21)(6, "p", 22);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 23);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, UsersManagementComponent_Conditional_15_Conditional_1_For_2_Conditional_13_Template, 4, 3, "div", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("user-card--selected", \u0275\u0275pipeBind1(1, 9, ctx_r2.selectedUserId$) === user_r2.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getUserInitials(user_r2), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.getUserDisplayName(user_r2));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getStatusClass(user_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 11, ctx_r2.getNormalizedStatus(user_r2.status)), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r2.email);
    \u0275\u0275advance();
    \u0275\u0275conditional(user_r2.is_pos_user || user_r2.pos_user_code || ctx_r2.getBillingBranchLabel(user_r2) ? 13 : -1);
  }
}
function UsersManagementComponent_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, UsersManagementComponent_Conditional_15_Conditional_1_For_2_Template, 14, 13, "button", 17, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const users_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(users_r4);
  }
}
function UsersManagementComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, UsersManagementComponent_Conditional_15_Conditional_0_Template, 3, 0, "div", 15)(1, UsersManagementComponent_Conditional_15_Conditional_1_Template, 3, 0, "div", 16);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length === 0 ? 0 : 1);
  }
}
function UsersManagementComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-user-details", 29);
    \u0275\u0275listener("roleAssigned", function UsersManagementComponent_Conditional_18_Template_app_user_details_roleAssigned_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleAssigned($event));
    })("roleReplaced", function UsersManagementComponent_Conditional_18_Template_app_user_details_roleReplaced_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleReplaced($event));
    })("roleDeleted", function UsersManagementComponent_Conditional_18_Template_app_user_details_roleDeleted_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRoleDeleted($event));
    })("userUpdated", function UsersManagementComponent_Conditional_18_Template_app_user_details_userUpdated_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onUserUpdated());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("user", ctx)("userRoles$", ctx_r2.selectedUserRoles$)("availableRoles$", ctx_r2.roles$)("isLoadingRoles$", ctx_r2.isLoadingRoles$);
  }
}
function UsersManagementComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 30)(2, "p", 31);
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
    this.dialog.open(UserDetailModalComponent, {
      width: "620px",
      maxHeight: "90vh",
      disableClose: false,
      panelClass: "custom-dialog-container",
      data: { user: null, isNew: true }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.refreshUsersList();
      }
    });
  }
  refreshUsersList() {
    this.userService.refreshUsers().subscribe((users) => {
      this.stateService.updateUsers(users);
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
    let currentSelectedId = null;
    this.selectedUserId$.subscribe((id) => currentSelectedId = id).unsubscribe();
    this.userService.refreshUsers().subscribe((users) => {
      this.stateService.updateUsers(users);
      if (currentSelectedId) {
        this.stateService.selectUser(currentSelectedId);
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
        return "user-card__status user-card__status--active";
      case "inactive":
        return "user-card__status user-card__status--inactive";
      case "pending":
        return "user-card__status user-card__status--pending";
      default:
        return "user-card__status user-card__status--inactive";
    }
  }
  getUserDisplayName(user) {
    const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    return fullName || user.email;
  }
  getUserInitials(user) {
    const first = user.first_name?.trim().charAt(0) || "";
    const last = user.last_name?.trim().charAt(0) || "";
    const initials = `${first}${last}`.toUpperCase();
    return initials || user.email?.charAt(0).toUpperCase() || "?";
  }
  getBillingBranchLabel(user) {
    const branch = user.billing_branch;
    if (!branch) {
      return null;
    }
    const label = branch.display_name?.trim() || branch.code?.trim();
    return label || null;
  }
  getPosTypeBadge(user) {
    return getPosUserTypeBadgeLabel(user.is_pos_user, user.pos_user_type);
  }
  static \u0275fac = function UsersManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersManagementComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(PermissionSyncService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersManagementComponent, selectors: [["app-users-management"]], decls: 21, vars: 7, consts: [[1, "h-screen", "flex", "flex-col", "overflow-hidden"], [1, "flex", "items-center", "gap-3", "justify-between", "flex-shrink-0", "px-3", "py-3", "border-b", "border-gray-200"], [1, "flex", "items-center", "gap-3"], [3, "clicked"], [1, "text-2xl", "font-bold", "text-gray-900"], ["text", "+ Crear Usuario", "variant", "primary", "size", "sm", 3, "clicked", "fullWidth"], [1, "flex", "gap-2", "flex-1", "min-h-0", "px-2", "py-2"], [1, "w-1/3", "bg-white", "border", "border-gray-200", "rounded-lg", "flex", "flex-col", "h-full", "shadow-sm"], [1, "px-3", "py-2", "border-b", "border-gray-200", "flex-shrink-0"], [1, "text-base", "font-semibold", "text-gray-900"], [1, "px-3", "py-2", "border-b", "border-gray-200", "space-y-2", "flex-shrink-0"], [1, "flex-1", "overflow-y-auto", "min-h-0", "user-cards-panel"], [1, "flex-1", "min-h-0", "overflow-hidden"], [3, "user", "userRoles$", "availableRoles$", "isLoadingRoles$"], [1, "flex", "items-center", "justify-center", "h-full", "bg-white"], [1, "p-3", "text-center", "text-gray-500", "text-sm"], [1, "user-cards"], ["type", "button", 1, "user-card", 3, "user-card--selected"], ["type", "button", 1, "user-card", 3, "click"], ["aria-hidden", "true", 1, "user-card__avatar"], [1, "user-card__body"], [1, "user-card__top"], [1, "user-card__name"], [1, "user-card__email"], [1, "user-card__meta"], [1, "user-card__tag", "user-card__tag--pos", 3, "user-card__tag--pos-cobranza"], [1, "user-card__tag", "user-card__tag--code"], [1, "user-card__tag", "user-card__tag--branch"], [1, "user-card__tag", "user-card__tag--pos"], [3, "roleAssigned", "roleReplaced", "roleDeleted", "userUpdated", "user", "userRoles$", "availableRoles$", "isLoadingRoles$"], [1, "text-center"], [1, "text-gray-500", "text-lg"]], template: function UsersManagementComponent_Template(rf, ctx) {
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
      \u0275\u0275conditionalCreate(18, UsersManagementComponent_Conditional_18_Template, 1, 4, "app-user-details", 13);
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
  }, dependencies: [CommonModule, UserSearchFilterComponent, UserDetailsComponent, BackButtonComponent, ButtonComponent, AsyncPipe, TitleCasePipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  overflow: hidden;\n}\n.w-1-3[_ngcontent-%COMP%] {\n  flex: 0 0 33.333%;\n}\n.w-2-3[_ngcontent-%COMP%] {\n  flex: 0 0 66.667%;\n}\n.overflow-y-auto[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\n.user-cards-panel[_ngcontent-%COMP%] {\n  padding: 8px;\n}\n.user-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.user-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  background: #fff;\n  text-align: left;\n  cursor: pointer;\n  transition:\n    border-color 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s ease;\n}\n.user-card[_ngcontent-%COMP%]:hover {\n  border-color: #c7d2fe;\n  background: #fafbff;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.08);\n}\n.user-card[_ngcontent-%COMP%]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);\n}\n.user-card--selected[_ngcontent-%COMP%] {\n  border-color: #6366f1;\n  background: #eef2ff;\n  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.12);\n}\n.user-card__avatar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 700;\n  color: #4338ca;\n  background:\n    linear-gradient(\n      135deg,\n      #e0e7ff 0%,\n      #ede9fe 100%);\n}\n.user-card--selected[_ngcontent-%COMP%]   .user-card__avatar[_ngcontent-%COMP%] {\n  color: #fff;\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #4f46e5 100%);\n}\n.user-card__body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.user-card__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n}\n.user-card__name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.user-card__email[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 12px;\n  color: #6b7280;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.user-card__meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 8px;\n}\n.user-card__tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.4;\n}\n.user-card__tag--pos[_ngcontent-%COMP%] {\n  color: #7c3aed;\n  background: #f3e8ff;\n}\n.user-card__tag--pos-cobranza[_ngcontent-%COMP%] {\n  color: #b45309;\n  background: #fef3c7;\n}\n.user-card__tag--code[_ngcontent-%COMP%] {\n  color: #4b5563;\n  background: #f3f4f6;\n}\n.user-card__tag--branch[_ngcontent-%COMP%] {\n  color: #0369a1;\n  background: #e0f2fe;\n}\n.user-card__status[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: inline-flex;\n  align-items: center;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 600;\n  line-height: 1.4;\n  text-transform: capitalize;\n}\n.user-card__status--active[_ngcontent-%COMP%] {\n  color: #166534;\n  background: #dcfce7;\n}\n.user-card__status--inactive[_ngcontent-%COMP%] {\n  color: #4b5563;\n  background: #f3f4f6;\n}\n.user-card__status--pending[_ngcontent-%COMP%] {\n  color: #a16207;\n  background: #fef9c3;\n}\n/*# sourceMappingURL=users-management.component.css.map */"] });
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
      <div class="flex-1 overflow-y-auto min-h-0 user-cards-panel">\r
        @if (filteredUsers$ | async; as users) {\r
          @if (users.length === 0) {\r
            <div class="p-3 text-center text-gray-500 text-sm">\r
              <p>No se encontraron usuarios</p>\r
            </div>\r
          } @else {\r
            <div class="user-cards">\r
              @for (user of users; track user.id) {\r
                <button\r
                  type="button"\r
                  (click)="onUserSelected(user.id)"\r
                  class="user-card"\r
                  [class.user-card--selected]="(selectedUserId$ | async) === user.id">\r
                  <div class="user-card__avatar" aria-hidden="true">\r
                    {{ getUserInitials(user) }}\r
                  </div>\r
                  <div class="user-card__body">\r
                    <div class="user-card__top">\r
                      <p class="user-card__name">{{ getUserDisplayName(user) }}</p>\r
                      <span [class]="getStatusClass(user.status)">\r
                        {{ getNormalizedStatus(user.status) | titlecase }}\r
                      </span>\r
                    </div>\r
                    <p class="user-card__email">{{ user.email }}</p>\r
                    @if (user.is_pos_user || user.pos_user_code || getBillingBranchLabel(user)) {\r
                      <div class="user-card__meta">\r
                        @if (getPosTypeBadge(user); as posBadge) {\r
                          <span\r
                            class="user-card__tag user-card__tag--pos"\r
                            [class.user-card__tag--pos-cobranza]="user.pos_user_type === 'COBRANZA'">\r
                            {{ posBadge }}\r
                          </span>\r
                        }\r
                        @if (!user.is_pos_user && user.pos_user_code) {\r
                          <span class="user-card__tag user-card__tag--code">\r
                            C\xF3digo: {{ user.pos_user_code }}\r
                          </span>\r
                        }\r
                        @if (getBillingBranchLabel(user); as branchLabel) {\r
                          <span class="user-card__tag user-card__tag--branch">{{ branchLabel }}</span>\r
                        }\r
                      </div>\r
                    }\r
                  </div>\r
                </button>\r
              }\r
            </div>\r
          }\r
        }\r
      </div>\r
    </div>\r
\r
    <!-- Right Panel: User Details -->\r
    <div class="flex-1 min-h-0 overflow-hidden">\r
      @if (selectedUser$ | async; as user) {\r
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
      } @else {\r
        <div class="flex items-center justify-center h-full bg-white">\r
          <div class="text-center">\r
            <p class="text-gray-500 text-lg">Selecciona un usuario para ver los detalles</p>\r
          </div>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/rbac-tenant-ui/pages/users-management/users-management.component.scss */\n:host {\n  display: block;\n  height: 100%;\n  overflow: hidden;\n}\n.w-1-3 {\n  flex: 0 0 33.333%;\n}\n.w-2-3 {\n  flex: 0 0 66.667%;\n}\n.overflow-y-auto {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.overflow-y-auto::-webkit-scrollbar {\n  width: 8px;\n}\n.overflow-y-auto::-webkit-scrollbar-track {\n  background: transparent;\n}\n.overflow-y-auto::-webkit-scrollbar-thumb {\n  background: #d1d5db;\n  border-radius: 4px;\n}\n.overflow-y-auto::-webkit-scrollbar-thumb:hover {\n  background: #9ca3af;\n}\n.user-cards-panel {\n  padding: 8px;\n}\n.user-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.user-card {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  background: #fff;\n  text-align: left;\n  cursor: pointer;\n  transition:\n    border-color 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s ease;\n}\n.user-card:hover {\n  border-color: #c7d2fe;\n  background: #fafbff;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.08);\n}\n.user-card:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);\n}\n.user-card--selected {\n  border-color: #6366f1;\n  background: #eef2ff;\n  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.12);\n}\n.user-card__avatar {\n  flex-shrink: 0;\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 13px;\n  font-weight: 700;\n  color: #4338ca;\n  background:\n    linear-gradient(\n      135deg,\n      #e0e7ff 0%,\n      #ede9fe 100%);\n}\n.user-card--selected .user-card__avatar {\n  color: #fff;\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #4f46e5 100%);\n}\n.user-card__body {\n  flex: 1;\n  min-width: 0;\n}\n.user-card__top {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n}\n.user-card__name {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  line-height: 1.3;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.user-card__email {\n  margin: 4px 0 0;\n  font-size: 12px;\n  color: #6b7280;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.user-card__meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 8px;\n}\n.user-card__tag {\n  display: inline-flex;\n  align-items: center;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.4;\n}\n.user-card__tag--pos {\n  color: #7c3aed;\n  background: #f3e8ff;\n}\n.user-card__tag--pos-cobranza {\n  color: #b45309;\n  background: #fef3c7;\n}\n.user-card__tag--code {\n  color: #4b5563;\n  background: #f3f4f6;\n}\n.user-card__tag--branch {\n  color: #0369a1;\n  background: #e0f2fe;\n}\n.user-card__status {\n  flex-shrink: 0;\n  display: inline-flex;\n  align-items: center;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 10px;\n  font-weight: 600;\n  line-height: 1.4;\n  text-transform: capitalize;\n}\n.user-card__status--active {\n  color: #166534;\n  background: #dcfce7;\n}\n.user-card__status--inactive {\n  color: #4b5563;\n  background: #f3f4f6;\n}\n.user-card__status--pending {\n  color: #a16207;\n  background: #fef9c3;\n}\n/*# sourceMappingURL=users-management.component.css.map */\n"] }]
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
    \u0275\u0275text(2, "No hay m\xF3dulos disponibles.");
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
            <p class="text-gray-500">No hay m\xF3dulos disponibles.</p>
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
    this.route.queryParams.pipe(takeUntil(this.destroy$), filter((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return false;
      }
      this.lastQueryParams = queryString;
      return true;
    }), tap((query) => {
      this.search = query?.["search"] ?? "";
      const page = query?.["page"] ? Number(query["page"]) : 1;
      const limit = query?.["limit"] ? Number(query["limit"]) : 20;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        page: Number.isNaN(page) ? 1 : page,
        limit: Number.isNaN(limit) ? 20 : limit
      }));
    }), switchMap(() => {
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
      return this.productService.getProducts(this.buildQueryParams());
    })).subscribe({
      next: (res) => this.applyProductsResponse(res),
      error: (error) => this.handleLoadError(error)
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadProducts() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    this.productService.getProducts(this.buildQueryParams()).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => this.applyProductsResponse(res),
      error: (error) => this.handleLoadError(error)
    });
  }
  buildQueryParams() {
    const config = this.table_config();
    const page = Number.isNaN(config.page) ? 1 : config.page;
    const limit = Number.isNaN(config.limit) ? 20 : config.limit;
    const params = { page, limit };
    const normalizedSearch = this.search?.trim();
    if (normalizedSearch) {
      if (normalizedSearch.toLowerCase().startsWith("ext:")) {
        const externalSku = normalizedSearch.slice(4).trim();
        if (externalSku) {
          params["external_sku"] = externalSku;
        }
      } else {
        params["search"] = normalizedSearch;
      }
    }
    return params;
  }
  applyProductsResponse(res) {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
      rows: res.data ?? [],
      totalResults: res.total ?? 0,
      page: res.page ?? c.page,
      limit: res.limit ?? c.limit,
      hasNext: res.hasNext ?? res.page < res.totalPages,
      loading: false
    }));
  }
  handleLoadError(error) {
    console.error("Error loading products:", error);
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
      rows: [],
      totalResults: 0,
      hasNext: false,
      loading: false
    }));
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: "Error al cargar productos", type: "error" },
      duration: 5e3
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
  }, decls: 14, vars: 4, consts: [["tableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-col", "gap-3", "sm:flex-row", "sm:items-center", "sm:flex-wrap", "sm:justify-end"], [1, "w-full", "sm:w-64", 3, "searchChange", "param_activate", "default_value"], [1, "flex", "flex-wrap", "items-center", "gap-2"], ["text", "Categor\xEDas", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Unidades", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Listas de Precios", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Nuevo Producto", "size", "sm", "custom_class", "btn_primary", 3, "clicked"], ["variant", "settings", 3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "settings-cell-primary", "truncate"], [1, "settings-badge", "settings-badge--code"]], template: function ProductListComponent_Template(rf, ctx) {
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
      \u0275\u0275property("param_activate", false)("default_value", ctx.search);
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
        [default_value]="search"
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

// src/app/features/settings/components/pos-daily-shift-detail-modal/pos-daily-shift-detail-modal.component.ts
var _forTrack05 = ($index, $item) => $item.id;
function PosDailyShiftDetailModalComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, "Cargando...");
    \u0275\u0275elementEnd();
  }
}
function PosDailyShiftDetailModalComponent_Conditional_7_Conditional_43_For_5_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const partial_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(partial_r1.notes);
  }
}
function PosDailyShiftDetailModalComponent_Conditional_7_Conditional_43_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 12);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, PosDailyShiftDetailModalComponent_Conditional_7_Conditional_43_For_5_Conditional_5_Template, 2, 1, "p", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const partial_r1 = ctx.$implicit;
    const \u0275$index_94_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Corte parcial #", partial_r1.sequence ?? \u0275$index_94_r2 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.partialTotal(partial_r1));
    \u0275\u0275advance();
    \u0275\u0275conditional(partial_r1.notes ? 5 : -1);
  }
}
function PosDailyShiftDetailModalComponent_Conditional_7_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 9)(1, "h3");
    \u0275\u0275text(2, "Historial de parciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 10);
    \u0275\u0275repeaterCreate(4, PosDailyShiftDetailModalComponent_Conditional_7_Conditional_43_For_5_Template, 6, 3, "li", null, _forTrack05);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(item_r4.partial_shifts);
  }
}
function PosDailyShiftDetailModalComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "dl", 7)(2, "div")(3, "dt");
    \u0275\u0275text(4, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "dd");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "dt");
    \u0275\u0275text(9, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "dd")(11, "span", 8);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div")(14, "dt");
    \u0275\u0275text(15, "Terminal cobranza");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "dd");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "dt");
    \u0275\u0275text(20, "Sucursal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dd");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div")(24, "dt");
    \u0275\u0275text(25, "Efectivo inicial MXN");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "dd");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div")(29, "dt");
    \u0275\u0275text(30, "Efectivo inicial USD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "dd");
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div")(34, "dt");
    \u0275\u0275text(35, "Ventas totales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "dd");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div")(39, "dt");
    \u0275\u0275text(40, "Cortes parciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "dd");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(43, PosDailyShiftDetailModalComponent_Conditional_7_Conditional_43_Template, 6, 0, "section", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(item_r4.shift_date);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("shift-badge--open", ctx_r2.isOpen(item_r4));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.statusLabel(item_r4));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.terminalLabel(item_r4));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.branchLabel(item_r4));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.openingMxn(item_r4));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.openingUsd(item_r4));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.salesTotal(item_r4));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.partialCount(item_r4));
    \u0275\u0275advance();
    \u0275\u0275conditional((item_r4.partial_shifts == null ? null : item_r4.partial_shifts.length) ? 43 : -1);
  }
}
function PosDailyShiftDetailModalComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275text(1, "No se pudo cargar el corte.");
    \u0275\u0275elementEnd();
  }
}
var PosDailyShiftDetailModalComponent = class _PosDailyShiftDetailModalComponent {
  data;
  dialogRef;
  posService;
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  shift = signal(null, ...ngDevMode ? [{ debugName: "shift" }] : []);
  constructor(data, dialogRef, posService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.posService = posService;
    this.posService.getDailyShift(data.shiftId).subscribe({
      next: (shift) => {
        this.shift.set(shift);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  terminalLabel(shift) {
    return dailyShiftTerminalLabel(shift);
  }
  branchLabel(shift) {
    return dailyShiftBranchLabel(shift);
  }
  statusLabel(shift) {
    return dailyShiftStatusLabel(shift.status);
  }
  isOpen(shift) {
    return dailyShiftIsOpen(shift);
  }
  salesTotal(shift) {
    return formatPosMoney(dailyShiftSalesTotal(shift));
  }
  partialCount(shift) {
    return dailyShiftPartialCount(shift);
  }
  openingMxn(shift) {
    return formatPosMoney(shift.opening_cash_mxn);
  }
  openingUsd(shift) {
    return formatPosMoney(shift.opening_cash_usd);
  }
  partialTotal(partial) {
    const mxn = parsePosMoney(partial.total_mxn);
    const usd = parsePosMoney(partial.total_usd);
    if (usd > 0) {
      return `${formatPosMoney(mxn)} \xB7 USD ${usd.toFixed(2)}`;
    }
    return formatPosMoney(mxn);
  }
  static \u0275fac = function PosDailyShiftDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosDailyShiftDetailModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(POSService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosDailyShiftDetailModalComponent, selectors: [["app-pos-daily-shift-detail-modal"]], decls: 11, vars: 1, consts: [[1, "shift-detail-modal"], [1, "shift-detail-modal__header"], ["type", "button", "aria-label", "Cerrar", 1, "shift-detail-modal__close", 3, "click"], [1, "shift-detail-modal__loading"], [1, "shift-detail-modal__body"], [1, "shift-detail-modal__footer"], ["text", "Cerrar", "custom_class", "btn_secondary", 3, "clicked"], [1, "shift-detail-modal__grid"], [1, "shift-badge"], [1, "shift-detail-modal__section"], [1, "shift-detail-modal__partials"], [1, "shift-detail-modal__partial-title"], [1, "shift-detail-modal__partial-amount"], [1, "shift-detail-modal__partial-notes"]], template: function PosDailyShiftDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Detalle del corte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function PosDailyShiftDetailModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275text(5, "\xD7");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, PosDailyShiftDetailModalComponent_Conditional_6_Template, 2, 0, "div", 3)(7, PosDailyShiftDetailModalComponent_Conditional_7_Template, 44, 11, "div", 4)(8, PosDailyShiftDetailModalComponent_Conditional_8_Template, 2, 0, "div", 3);
      \u0275\u0275elementStart(9, "div", 5)(10, "app-button", 6);
      \u0275\u0275listener("clicked", function PosDailyShiftDetailModalComponent_Template_app_button_clicked_10_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading() ? 6 : (tmp_0_0 = ctx.shift()) ? 7 : 8, tmp_0_0);
    }
  }, dependencies: [CommonModule, ButtonComponent], styles: ["\n\n.shift-detail-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.shift-detail-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.shift-detail-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.shift-detail-modal__close[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  font-size: 24px;\n  line-height: 1;\n  color: #6b7280;\n  cursor: pointer;\n}\n.shift-detail-modal__body[_ngcontent-%COMP%] {\n  padding: 16px;\n  overflow-y: auto;\n}\n.shift-detail-modal__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n  margin: 0;\n}\n.shift-detail-modal__grid[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  margin: 0 0 2px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #94a3b8;\n}\n.shift-detail-modal__grid[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #1e293b;\n}\n.shift-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #4b5563;\n  background: #f3f4f6;\n}\n.shift-badge--open[_ngcontent-%COMP%] {\n  color: #166534;\n  background: #dcfce7;\n}\n.shift-detail-modal__section[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.shift-detail-modal__section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n}\n.shift-detail-modal__partials[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.shift-detail-modal__partials[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #fafbfc;\n}\n.shift-detail-modal__partial-title[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #111827;\n}\n.shift-detail-modal__partial-amount[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 2px;\n  font-size: 13px;\n  color: #0369a1;\n}\n.shift-detail-modal__partial-notes[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 12px;\n  color: #6b7280;\n}\n.shift-detail-modal__loading[_ngcontent-%COMP%] {\n  padding: 32px 16px;\n  text-align: center;\n  color: #6b7280;\n}\n.shift-detail-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding: 12px 16px;\n  border-top: 1px solid #e5e7eb;\n}\n@media (max-width: 640px) {\n  .shift-detail-modal__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=pos-daily-shift-detail-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosDailyShiftDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-pos-daily-shift-detail-modal", standalone: true, imports: [CommonModule, ButtonComponent], template: '<div class="shift-detail-modal">\r\n  <div class="shift-detail-modal__header">\r\n    <h2>Detalle del corte</h2>\r\n    <button type="button" class="shift-detail-modal__close" (click)="close()" aria-label="Cerrar">\xD7</button>\r\n  </div>\r\n\r\n  @if (loading()) {\r\n    <div class="shift-detail-modal__loading">Cargando...</div>\r\n  } @else if (shift(); as item) {\r\n    <div class="shift-detail-modal__body">\r\n      <dl class="shift-detail-modal__grid">\r\n        <div><dt>Fecha</dt><dd>{{ item.shift_date }}</dd></div>\r\n        <div><dt>Estado</dt><dd><span class="shift-badge" [class.shift-badge--open]="isOpen(item)">{{ statusLabel(item) }}</span></dd></div>\r\n        <div><dt>Terminal cobranza</dt><dd>{{ terminalLabel(item) }}</dd></div>\r\n        <div><dt>Sucursal</dt><dd>{{ branchLabel(item) }}</dd></div>\r\n        <div><dt>Efectivo inicial MXN</dt><dd>{{ openingMxn(item) }}</dd></div>\r\n        <div><dt>Efectivo inicial USD</dt><dd>{{ openingUsd(item) }}</dd></div>\r\n        <div><dt>Ventas totales</dt><dd>{{ salesTotal(item) }}</dd></div>\r\n        <div><dt>Cortes parciales</dt><dd>{{ partialCount(item) }}</dd></div>\r\n      </dl>\r\n\r\n      @if (item.partial_shifts?.length) {\r\n        <section class="shift-detail-modal__section">\r\n          <h3>Historial de parciales</h3>\r\n          <ul class="shift-detail-modal__partials">\r\n            @for (partial of item.partial_shifts; track partial.id; let i = $index) {\r\n              <li>\r\n                <span class="shift-detail-modal__partial-title">Corte parcial #{{ partial.sequence ?? (i + 1) }}</span>\r\n                <span class="shift-detail-modal__partial-amount">{{ partialTotal(partial) }}</span>\r\n                @if (partial.notes) {\r\n                  <p class="shift-detail-modal__partial-notes">{{ partial.notes }}</p>\r\n                }\r\n              </li>\r\n            }\r\n          </ul>\r\n        </section>\r\n      }\r\n    </div>\r\n  } @else {\r\n    <div class="shift-detail-modal__loading">No se pudo cargar el corte.</div>\r\n  }\r\n\r\n  <div class="shift-detail-modal__footer">\r\n    <app-button text="Cerrar" custom_class="btn_secondary" (clicked)="close()"></app-button>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/settings/components/pos-daily-shift-detail-modal/pos-daily-shift-detail-modal.component.scss */\n.shift-detail-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.shift-detail-modal__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.shift-detail-modal__header h2 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.shift-detail-modal__close {\n  border: none;\n  background: transparent;\n  font-size: 24px;\n  line-height: 1;\n  color: #6b7280;\n  cursor: pointer;\n}\n.shift-detail-modal__body {\n  padding: 16px;\n  overflow-y: auto;\n}\n.shift-detail-modal__grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n  margin: 0;\n}\n.shift-detail-modal__grid dt {\n  margin: 0 0 2px;\n  font-size: 11px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #94a3b8;\n}\n.shift-detail-modal__grid dd {\n  margin: 0;\n  font-size: 14px;\n  color: #1e293b;\n}\n.shift-badge {\n  display: inline-flex;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #4b5563;\n  background: #f3f4f6;\n}\n.shift-badge--open {\n  color: #166534;\n  background: #dcfce7;\n}\n.shift-detail-modal__section {\n  margin-top: 16px;\n}\n.shift-detail-modal__section h3 {\n  margin: 0 0 8px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n}\n.shift-detail-modal__partials {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.shift-detail-modal__partials li {\n  padding: 10px 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #fafbfc;\n}\n.shift-detail-modal__partial-title {\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #111827;\n}\n.shift-detail-modal__partial-amount {\n  display: block;\n  margin-top: 2px;\n  font-size: 13px;\n  color: #0369a1;\n}\n.shift-detail-modal__partial-notes {\n  margin: 6px 0 0;\n  font-size: 12px;\n  color: #6b7280;\n}\n.shift-detail-modal__loading {\n  padding: 32px 16px;\n  text-align: center;\n  color: #6b7280;\n}\n.shift-detail-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  padding: 12px 16px;\n  border-top: 1px solid #e5e7eb;\n}\n@media (max-width: 640px) {\n  .shift-detail-modal__grid {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=pos-daily-shift-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: POSService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosDailyShiftDetailModalComponent, { className: "PosDailyShiftDetailModalComponent", filePath: "src/app/features/settings/components/pos-daily-shift-detail-modal/pos-daily-shift-detail-modal.component.ts", lineNumber: 25 });
})();

// src/app/features/settings/components/pos-equipment-list/pos-equipment-list.component.ts
var _c05 = ["shiftsTableTemplate"];
var _forTrack06 = ($index, $item) => $item.id;
function PosEquipmentListComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r2 = ctx.$implicit;
    \u0275\u0275property("value", b_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r2.display_name || b_r2.code);
  }
}
function PosEquipmentListComponent_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "span", 20);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "span", 20);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "span", 20);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td")(10, "span", 21);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 22);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 20);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 22);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.shift_date);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.terminalLabel(item_r3));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.branchLabel(item_r3));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r3.isOpen(item_r3) ? "settings-badge--status-active" : "settings-badge--status-inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.statusLabel(item_r3), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.salesTotal(item_r3));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.partialCount(item_r3));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.openingCash(item_r3));
  }
}
var PosEquipmentListComponent = class _PosEquipmentListComponent {
  posService;
  branchService;
  dialog;
  snackBar;
  shiftsTableTemplate;
  selectedBranchId = "";
  shiftDate = "";
  statusFilter = "";
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  table_config = signal({
    rows: [],
    columns: [
      { name: "Fecha", prop: "shift_date", sortable: false, canAutoResize: true, width: 110 },
      { name: "Terminal cobranza", prop: "terminal_user", sortable: false, canAutoResize: true, width: 180 },
      { name: "Sucursal", prop: "billing_branch", sortable: false, canAutoResize: true, width: 140 },
      { name: "Estado", prop: "status", sortable: false, canAutoResize: true, width: 90 },
      { name: "Ventas totales", prop: "sales_total", sortable: false, canAutoResize: true, width: 110 },
      { name: "# parciales", prop: "partial_shifts_count", sortable: false, canAutoResize: true, width: 90 },
      { name: "Efectivo inicial", prop: "opening_cash_mxn", sortable: false, canAutoResize: true, width: 120 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: {
      title: "Sin cortes",
      subtitle: "No hay cortes globales para los filtros seleccionados"
    },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  constructor(posService, branchService, dialog, snackBar) {
    this.posService = posService;
    this.branchService = branchService;
    this.dialog = dialog;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.branchService.getAllBranches().subscribe({
      next: (list) => this.branches.set(list),
      error: () => this.showError("Error al cargar sucursales")
    });
    this.loadDailyShifts();
  }
  applyFilters() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
    this.loadDailyShifts();
  }
  onPageChange(event) {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
      page: event.page,
      limit: event.limit
    }));
    this.loadDailyShifts();
  }
  loadDailyShifts() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const cfg = this.table_config();
    this.posService.getDailyShifts({
      page: cfg.page,
      limit: cfg.limit,
      billing_branch_id: this.selectedBranchId || void 0,
      shift_date: this.shiftDate || void 0,
      status: this.statusFilter === "open" || this.statusFilter === "closed" ? this.statusFilter : void 0
    }).subscribe({
      next: ({ data, total }) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: data,
          totalResults: total,
          loading: false
        }));
      },
      error: (error) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
        this.showError(error.error?.message || "Error al cargar cortes");
      }
    });
  }
  viewDetail(shift) {
    this.dialog.open(PosDailyShiftDetailModalComponent, {
      width: "560px",
      maxWidth: "calc(100vw - 24px)",
      autoFocus: false,
      panelClass: "pos-daily-shift-detail-panel",
      data: { shiftId: shift.id }
    });
  }
  terminalLabel(row) {
    return dailyShiftTerminalLabel(row);
  }
  branchLabel(row) {
    return dailyShiftBranchLabel(row);
  }
  statusLabel(row) {
    return dailyShiftStatusLabel(row.status);
  }
  isOpen(row) {
    return dailyShiftIsOpen(row);
  }
  salesTotal(row) {
    return formatPosMoney(dailyShiftSalesTotal(row));
  }
  partialCount(row) {
    return dailyShiftPartialCount(row);
  }
  openingCash(row) {
    return formatPosMoney(row.opening_cash_mxn);
  }
  showError(message) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type: "error" },
      duration: 5e3
    });
  }
  static \u0275fac = function PosEquipmentListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosEquipmentListComponent)(\u0275\u0275directiveInject(POSService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosEquipmentListComponent, selectors: [["app-pos-equipment-list"]], viewQuery: function PosEquipmentListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c05, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.shiftsTableTemplate = _t.first);
    }
  }, decls: 34, vars: 5, consts: [["shiftsTableTemplate", ""], [1, "settings-list-page", "px-4", "pb-6"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-500", "mt-1"], [1, "mb-4"], ["role", "search", "aria-label", "Filtros de cortes POS", 1, "filter-bar"], [1, "filter-bar__container", "filter-bar__container--cortes"], [1, "filter-bar__field"], ["aria-label", "Filtrar por sucursal", 1, "filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], ["type", "date", "aria-label", "Fecha del corte", 1, "filter-bar__input", 3, "ngModelChange", "change", "ngModel"], ["aria-label", "Filtrar por estado", 1, "filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", "open"], ["value", "closed"], [1, "border-b", "border-gray-200"], ["aria-label", "Secciones configuraci\xF3n POS", 1, "-mb-px", "flex", "space-x-8"], [1, "border-b-2", "border-blue-500", "py-4", "px-1", "text-sm", "font-medium", "text-blue-600"], ["variant", "settings", 3, "rowClick", "pageChange", "config", "rowTemplate"], [1, "settings-cell-text"], [1, "settings-badge", 3, "ngClass"], [1, "session-money"]], template: function PosEquipmentListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h2", 3);
      \u0275\u0275text(4, "Configuraci\xF3n POS");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, " Consulta los cortes globales por sucursal. Las terminales se configuran en Gesti\xF3n de Usuarios. ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "div", 7)(10, "div", 8)(11, "select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Template_select_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedBranchId, $event) || (ctx.selectedBranchId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function PosEquipmentListComponent_Template_select_change_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters());
      });
      \u0275\u0275elementStart(12, "option", 10);
      \u0275\u0275text(13, "Todas las sucursales");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(14, PosEquipmentListComponent_For_15_Template, 2, 2, "option", 11, _forTrack06);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 8)(17, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Template_input_ngModelChange_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.shiftDate, $event) || (ctx.shiftDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function PosEquipmentListComponent_Template_input_change_17_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 8)(19, "select", 13);
      \u0275\u0275twoWayListener("ngModelChange", function PosEquipmentListComponent_Template_select_ngModelChange_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function PosEquipmentListComponent_Template_select_change_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilters());
      });
      \u0275\u0275elementStart(20, "option", 10);
      \u0275\u0275text(21, "Todos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "option", 14);
      \u0275\u0275text(23, "Abierto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "option", 15);
      \u0275\u0275text(25, "Cerrado");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(26, "div", 5)(27, "div", 16)(28, "nav", 17)(29, "span", 18);
      \u0275\u0275text(30, " Cortes ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(31, "app-datatable-wrapper", 19);
      \u0275\u0275listener("rowClick", function PosEquipmentListComponent_Template_app_datatable_wrapper_rowClick_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.viewDetail($event.data));
      })("pageChange", function PosEquipmentListComponent_Template_app_datatable_wrapper_pageChange_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(32, PosEquipmentListComponent_ng_template_32_Template, 19, 8, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const shiftsTableTemplate_r5 = \u0275\u0275reference(33);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedBranchId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.branches());
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.shiftDate);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(12);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", shiftsTableTemplate_r5);
    }
  }, dependencies: [CommonModule, NgClass, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatatableWrapperComponent], styles: [`

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
.filter-bar__container--cortes[_ngcontent-%COMP%] {
  grid-template-columns: minmax(0, 1.4fr) minmax(160px, 200px) minmax(140px, 180px);
  max-width: 42rem;
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
   .filter-bar__container--sesiones[_ngcontent-%COMP%], 
   .filter-bar__container--cortes[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    max-width: 100%;
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
    args: [{ selector: "app-pos-equipment-list", standalone: true, imports: [CommonModule, FormsModule, DatatableWrapperComponent], template: `<div class="settings-list-page px-4 pb-6">
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
    <div>
      <h2 class="text-2xl font-semibold text-gray-800">Configuraci\xF3n POS</h2>
      <p class="text-sm text-gray-500 mt-1">
        Consulta los cortes globales por sucursal. Las terminales se configuran en Gesti\xF3n de Usuarios.
      </p>
    </div>
  </div>

  <div class="mb-4">
    <div class="filter-bar" role="search" aria-label="Filtros de cortes POS">
      <div class="filter-bar__container filter-bar__container--cortes">
        <div class="filter-bar__field">
          <select
            [(ngModel)]="selectedBranchId"
            (change)="applyFilters()"
            class="filter-bar__select"
            aria-label="Filtrar por sucursal">
            <option value="">Todas las sucursales</option>
            @for (b of branches(); track b.id) {
              <option [value]="b.id">{{ b.display_name || b.code }}</option>
            }
          </select>
        </div>
        <div class="filter-bar__field">
          <input
            type="date"
            [(ngModel)]="shiftDate"
            (change)="applyFilters()"
            class="filter-bar__input"
            aria-label="Fecha del corte"
          />
        </div>
        <div class="filter-bar__field">
          <select
            [(ngModel)]="statusFilter"
            (change)="applyFilters()"
            class="filter-bar__select"
            aria-label="Filtrar por estado">
            <option value="">Todos</option>
            <option value="open">Abierto</option>
            <option value="closed">Cerrado</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="mb-4">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Secciones configuraci\xF3n POS">
        <span class="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">
          Cortes
        </span>
      </nav>
    </div>
  </div>

  <app-datatable-wrapper
    variant="settings"
    [config]="table_config()"
    [rowTemplate]="shiftsTableTemplate"
    (rowClick)="viewDetail($event.data)"
    (pageChange)="onPageChange($event)">
  </app-datatable-wrapper>
</div>

<ng-template #shiftsTableTemplate let-item="$implicit">
  <td><span class="settings-cell-text">{{ item.shift_date }}</span></td>
  <td><span class="settings-cell-text">{{ terminalLabel(item) }}</span></td>
  <td><span class="settings-cell-text">{{ branchLabel(item) }}</span></td>
  <td>
    <span class="settings-badge" [ngClass]="isOpen(item) ? 'settings-badge--status-active' : 'settings-badge--status-inactive'">
      {{ statusLabel(item) }}
    </span>
  </td>
  <td class="session-money">{{ salesTotal(item) }}</td>
  <td><span class="settings-cell-text">{{ partialCount(item) }}</span></td>
  <td class="session-money">{{ openingCash(item) }}</td>
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
.filter-bar__container--cortes {
  grid-template-columns: minmax(0, 1.4fr) minmax(160px, 200px) minmax(140px, 180px);
  max-width: 42rem;
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
  .filter-bar__container--sesiones,
  .filter-bar__container--cortes {
    grid-template-columns: 1fr;
    max-width: 100%;
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
  }], () => [{ type: POSService }, { type: BranchService }, { type: MatDialog }, { type: MatSnackBar }], { shiftsTableTemplate: [{
    type: ViewChild,
    args: ["shiftsTableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosEquipmentListComponent, { className: "PosEquipmentListComponent", filePath: "src/app/features/settings/components/pos-equipment-list/pos-equipment-list.component.ts", lineNumber: 34 });
})();

// src/app/features/settings/components/email-template-create-modal/email-template-create-modal.component.ts
var _c06 = ["subjectInput"];
var _c1 = ["bodyHtmlTextarea"];
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
      \u0275\u0275viewQuery(_c06, 5)(_c1, 5);
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
      \u0275\u0275text(5, " Registra el valor diario del USD para operaciones y auditor\xEDa. ");
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
      Registra el valor diario del USD para operaciones y auditor\xEDa.\r
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
//# sourceMappingURL=chunk-CJEMF3BF.js.map
