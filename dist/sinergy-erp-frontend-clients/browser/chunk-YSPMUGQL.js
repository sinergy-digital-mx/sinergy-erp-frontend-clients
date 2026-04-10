import {
  BackButtonComponent
} from "./chunk-3HXEZZJ2.js";
import {
  FiscalConfigurationService,
  VendorService
} from "./chunk-VD2IQ53P.js";
import {
  BranchService,
  ProductDetailModalComponent,
  TabComponent,
  WarehouseDetailModalComponent
} from "./chunk-E2W2JU4V.js";
import {
  ProductService
} from "./chunk-FIZPSH25.js";
import {
  DataMapperService,
  UserService
} from "./chunk-NHTCDOXE.js";
import {
  WarehouseService
} from "./chunk-E7QIYR5Q.js";
import {
  POSService
} from "./chunk-MGEJLMJK.js";
import {
  SearchComponent
} from "./chunk-B3LR2PTH.js";
import {
  DatatableWrapperComponent
} from "./chunk-QW7YUBWU.js";
import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import {
  AlertDialogComponent,
  InterceptorService
} from "./chunk-K22JBEUE.js";
import {
  CustomSnackbarComponent
} from "./chunk-Y4MZBWJH.js";
import {
  InputComponent
} from "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import "./chunk-OC6N764R.js";
import {
  ArrowRight,
  LucideAngularComponent,
  LucideAngularModule,
  Pen,
  Trash2,
  X
} from "./chunk-XYBC4MWB.js";
import {
  MatButtonModule,
  MatSnackBar
} from "./chunk-KNFYVOET.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxLengthValidator,
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
} from "./chunk-TXPVZZCM.js";
import {
  AuthService
} from "./chunk-2BSLK6RD.js";
import {
  ActivatedRoute,
  DomSanitizer,
  HttpClient,
  Router,
  RouterOutlet,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf,
  TitleCasePipe
} from "./chunk-GZH4LDOW.js";
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
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  setClassMetadata,
  shareReplay,
  signal,
  startWith,
  switchMap,
  takeUntil,
  tap,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
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
  ɵɵtextInterpolate6,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

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
    }
  ];
  communicationSections = [
    {
      id: "email-templates",
      title: "Plantillas de Correo",
      description: "Crea y gestiona plantillas de correo personalizadas para notificaciones y comunicaciones",
      icon: "\u{1F4E7}",
      route: "email-templates",
      permissions: ["emailtemplates:ViewMenu"]
    }
  ];
  sections = [];
  constructor(router, activatedRoute, authService) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.authService = authService;
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
    return new (__ngFactoryType__ || _SettingsComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(AuthService));
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
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/features/rbac-tenant-ui/pages/settings/settings.component.ts", lineNumber: 117 });
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
  constructor(stateService, userService, roleService, snackBar, router, activatedRoute, dialog) {
    this.stateService = stateService;
    this.userService = userService;
    this.roleService = roleService;
    this.snackBar = snackBar;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.dialog = dialog;
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
    return new (__ngFactoryType__ || _UsersManagementComponent)(\u0275\u0275directiveInject(StateService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatDialog));
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
  }], () => [{ type: StateService }, { type: UserService }, { type: RoleService }, { type: MatSnackBar }, { type: Router }, { type: ActivatedRoute }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersManagementComponent, { className: "UsersManagementComponent", filePath: "src/app/features/rbac-tenant-ui/pages/users-management/users-management.component.ts", lineNumber: 32 });
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
  role = null;
  permissionsUpdated = new EventEmitter();
  modulePermissions = [];
  loading = false;
  saving = false;
  hasChanges = false;
  originalPermissions = /* @__PURE__ */ new Set();
  constructor(roleService, snackBar, cdr) {
    this.roleService = roleService;
    this.snackBar = snackBar;
    this.cdr = cdr;
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
    return new (__ngFactoryType__ || _RolePermissionsManagerComponent)(\u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(ChangeDetectorRef));
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
  }], () => [{ type: RoleService }, { type: MatSnackBar }, { type: ChangeDetectorRef }], { role: [{
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

// src/app/features/settings/components/vendor-detail-modal/vendor-detail-modal.component.ts
function VendorDetailModalComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, " Nombre requerido (m\xEDn. 2 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function VendorDetailModalComponent_p_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, " RFC inv\xE1lido (formato: 3-4 letras + 6 d\xEDgitos + 3 alfanum\xE9ricos) ");
    \u0275\u0275elementEnd();
  }
}
function VendorDetailModalComponent_option_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r1 = ctx.$implicit;
    \u0275\u0275property("value", opt_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r1.name);
  }
}
function VendorDetailModalComponent_option_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r2 = ctx.$implicit;
    \u0275\u0275property("value", opt_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r2.name);
  }
}
function VendorDetailModalComponent_p_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, " Debe ser un n\xFAmero mayor o igual a 0 ");
    \u0275\u0275elementEnd();
  }
}
function VendorDetailModalComponent_p_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1, " Debe ser un n\xFAmero mayor o igual a 0 ");
    \u0275\u0275elementEnd();
  }
}
function VendorDetailModalComponent_option_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r3 = ctx.$implicit;
    \u0275\u0275property("value", opt_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r3.name);
  }
}
var VendorDetailModalComponent = class _VendorDetailModalComponent {
  fb;
  vendorService;
  snackBar;
  dialogRef;
  data;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  isNew = true;
  personaTypeOptions = [
    { id: "Persona F\xEDsica", name: "Persona F\xEDsica" },
    { id: "Persona Moral", name: "Persona Moral" }
  ];
  statusOptions = [
    { id: "active", name: "Activo" },
    { id: "inactive", name: "Inactivo" }
  ];
  countryOptions = [
    { id: "M\xE9xico", name: "M\xE9xico" },
    { id: "Estados Unidos", name: "Estados Unidos" },
    { id: "Canad\xE1", name: "Canad\xE1" },
    { id: "Espa\xF1a", name: "Espa\xF1a" },
    { id: "Argentina", name: "Argentina" },
    { id: "Brasil", name: "Brasil" },
    { id: "Chile", name: "Chile" },
    { id: "Colombia", name: "Colombia" },
    { id: "Per\xFA", name: "Per\xFA" },
    { id: "Venezuela", name: "Venezuela" },
    { id: "Guatemala", name: "Guatemala" },
    { id: "Honduras", name: "Honduras" },
    { id: "El Salvador", name: "El Salvador" },
    { id: "Nicaragua", name: "Nicaragua" },
    { id: "Costa Rica", name: "Costa Rica" },
    { id: "Panam\xE1", name: "Panam\xE1" },
    { id: "Cuba", name: "Cuba" },
    { id: "Rep\xFAblica Dominicana", name: "Rep\xFAblica Dominicana" },
    { id: "Puerto Rico", name: "Puerto Rico" }
  ];
  constructor(fb, vendorService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.vendorService = vendorService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isNew = !data.vendor;
    this.form = this.createForm();
    if (data.vendor) {
      this.form.patchValue(data.vendor);
    }
  }
  createForm() {
    return this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      company_name: [""],
      street: [""],
      city: [""],
      state: [""],
      zip_code: [""],
      country: [""],
      razon_social: [""],
      rfc: ["", [Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/)]],
      persona_type: ["Persona Moral"],
      status: ["active"],
      credit_days: [0, [Validators.min(0)]],
      credit_limit: [0, [Validators.min(0)]]
    });
  }
  save() {
    if (this.form.invalid || this.saving())
      return;
    this.saving.set(true);
    const formValue = this.form.value;
    if (this.isNew) {
      this.vendorService.createVendor(formValue).subscribe({
        next: (vendor) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Proveedor creado correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(vendor);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al crear proveedor", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    } else {
      this.vendorService.updateVendor(this.data.vendor.id, formValue).subscribe({
        next: (vendor) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Proveedor actualizado correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(vendor);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al actualizar proveedor", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function VendorDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorDetailModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(VendorService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VendorDetailModalComponent, selectors: [["app-vendor-detail-modal"]], decls: 71, vars: 13, consts: [[1, "vendor-modal"], [1, "vendor-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "vendor-modal__body"], [3, "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Nombre del proveedor", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "company_name", "placeholder", "Nombre de la empresa", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "rfc", "placeholder", "Ej: ACM123456ABC", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "uppercase"], ["type", "text", "formControlName", "razon_social", "placeholder", "Raz\xF3n social", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "persona_type", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "bg-white"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "status", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "bg-white"], ["type", "number", "formControlName", "credit_days", "min", "0", "placeholder", "0", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "number", "formControlName", "credit_limit", "min", "0", "step", "0.01", "placeholder", "0.00", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [1, "col-span-2"], ["type", "text", "formControlName", "street", "placeholder", "Calle y n\xFAmero", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "city", "placeholder", "Ciudad", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "state", "placeholder", "Estado", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "country", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "bg-white"], ["value", ""], ["type", "text", "formControlName", "zip_code", "placeholder", "C\xF3digo postal", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [1, "vendor-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading", "disabled"], [1, "text-xs", "text-red-600", "mt-1"], [3, "value"]], template: function VendorDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function VendorDetailModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div")(8, "label", 5);
      \u0275\u0275text(9, "Nombre *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "input", 6);
      \u0275\u0275template(11, VendorDetailModalComponent_p_11_Template, 2, 0, "p", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div")(13, "label", 5);
      \u0275\u0275text(14, "Empresa");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "input", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div")(17, "label", 5);
      \u0275\u0275text(18, "RFC");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "input", 9);
      \u0275\u0275template(20, VendorDetailModalComponent_p_20_Template, 2, 0, "p", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div")(22, "label", 5);
      \u0275\u0275text(23, "Raz\xF3n Social");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "input", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div")(26, "label", 5);
      \u0275\u0275text(27, "Tipo de Persona");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "select", 11);
      \u0275\u0275template(29, VendorDetailModalComponent_option_29_Template, 2, 2, "option", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div")(31, "label", 5);
      \u0275\u0275text(32, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "select", 13);
      \u0275\u0275template(34, VendorDetailModalComponent_option_34_Template, 2, 2, "option", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div")(36, "label", 5);
      \u0275\u0275text(37, "D\xEDas de Cr\xE9dito");
      \u0275\u0275elementEnd();
      \u0275\u0275element(38, "input", 14);
      \u0275\u0275template(39, VendorDetailModalComponent_p_39_Template, 2, 0, "p", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div")(41, "label", 5);
      \u0275\u0275text(42, "L\xEDmite de Cr\xE9dito");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "input", 15);
      \u0275\u0275template(44, VendorDetailModalComponent_p_44_Template, 2, 0, "p", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 16)(46, "label", 5);
      \u0275\u0275text(47, "Calle");
      \u0275\u0275elementEnd();
      \u0275\u0275element(48, "input", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div")(50, "label", 5);
      \u0275\u0275text(51, "Ciudad");
      \u0275\u0275elementEnd();
      \u0275\u0275element(52, "input", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div")(54, "label", 5);
      \u0275\u0275text(55, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275element(56, "input", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div")(58, "label", 5);
      \u0275\u0275text(59, "Pa\xEDs");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "select", 20)(61, "option", 21);
      \u0275\u0275text(62, "Selecciona un pa\xEDs");
      \u0275\u0275elementEnd();
      \u0275\u0275template(63, VendorDetailModalComponent_option_63_Template, 2, 2, "option", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div")(65, "label", 5);
      \u0275\u0275text(66, "CP");
      \u0275\u0275elementEnd();
      \u0275\u0275element(67, "input", 22);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(68, "div", 23)(69, "app-button", 24);
      \u0275\u0275listener("clicked", function VendorDetailModalComponent_Template_app_button_clicked_69_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "app-button", 25);
      \u0275\u0275listener("clicked", function VendorDetailModalComponent_Template_app_button_clicked_70_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_7_0;
      let tmp_8_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Nuevo Proveedor" : "Editar Proveedor");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("name")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.form.get("rfc")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("rfc")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(9);
      \u0275\u0275property("ngForOf", ctx.personaTypeOptions);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngForOf", ctx.statusOptions);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.form.get("credit_days")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("credit_days")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("credit_limit")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("credit_limit")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(19);
      \u0275\u0275property("ngForOf", ctx.countryOptions);
      \u0275\u0275advance(7);
      \u0275\u0275property("text", ctx.isNew ? "Crear Proveedor" : "Guardar Cambios")("loading", ctx.saving())("disabled", ctx.form.invalid || ctx.saving());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, ButtonComponent, LucideAngularModule, LucideAngularComponent], styles: ["\n\n[_nghost-%COMP%]     .mat-mdc-dialog-container {\n  max-width: 800px !important;\n}\n.vendor-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n  background: #fff;\n}\n.vendor-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.vendor-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.vendor-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.vendor-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.vendor-modal__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.vendor-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.vendor-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .col-span-2[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.vendor-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n@media (max-width: 640px) {\n  .vendor-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=vendor-detail-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-vendor-detail-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LucideAngularModule], template: `<div class="vendor-modal">\r
  <div class="vendor-modal__header">\r
    <h2>{{ isNew ? 'Nuevo Proveedor' : 'Editar Proveedor' }}</h2>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="close()">\r
    </lucide-icon>\r
  </div>\r
\r
  <div class="vendor-modal__body">\r
    <form [formGroup]="form">\r
      <!-- Nombre y Empresa -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>\r
        <input\r
          type="text"\r
          formControlName="name"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Nombre del proveedor">\r
        <p *ngIf="form.get('name')?.invalid && form.get('name')?.touched" class="text-xs text-red-600 mt-1">\r
          Nombre requerido (m\xEDn. 2 caracteres)\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Empresa</label>\r
        <input\r
          type="text"\r
          formControlName="company_name"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Nombre de la empresa">\r
      </div>\r
\r
      <!-- RFC y Raz\xF3n Social -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">RFC</label>\r
        <input\r
          type="text"\r
          formControlName="rfc"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 uppercase"\r
          placeholder="Ej: ACM123456ABC">\r
        <p *ngIf="form.get('rfc')?.invalid && form.get('rfc')?.touched" class="text-xs text-red-600 mt-1">\r
          RFC inv\xE1lido (formato: 3-4 letras + 6 d\xEDgitos + 3 alfanum\xE9ricos)\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Raz\xF3n Social</label>\r
        <input\r
          type="text"\r
          formControlName="razon_social"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Raz\xF3n social">\r
      </div>\r
\r
      <!-- Tipo de Persona y Status -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Persona</label>\r
        <select\r
          formControlName="persona_type"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">\r
          <option *ngFor="let opt of personaTypeOptions" [value]="opt.id">{{ opt.name }}</option>\r
        </select>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>\r
        <select\r
          formControlName="status"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">\r
          <option *ngFor="let opt of statusOptions" [value]="opt.id">{{ opt.name }}</option>\r
        </select>\r
      </div>\r
\r
      <!-- D\xEDas de Cr\xE9dito y L\xEDmite de Cr\xE9dito -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">D\xEDas de Cr\xE9dito</label>\r
        <input\r
          type="number"\r
          formControlName="credit_days"\r
          min="0"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="0">\r
        <p *ngIf="form.get('credit_days')?.invalid && form.get('credit_days')?.touched" class="text-xs text-red-600 mt-1">\r
          Debe ser un n\xFAmero mayor o igual a 0\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">L\xEDmite de Cr\xE9dito</label>\r
        <input\r
          type="number"\r
          formControlName="credit_limit"\r
          min="0"\r
          step="0.01"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="0.00">\r
        <p *ngIf="form.get('credit_limit')?.invalid && form.get('credit_limit')?.touched" class="text-xs text-red-600 mt-1">\r
          Debe ser un n\xFAmero mayor o igual a 0\r
        </p>\r
      </div>\r
\r
      <!-- Direcci\xF3n -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Calle</label>\r
        <input\r
          type="text"\r
          formControlName="street"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Calle y n\xFAmero">\r
      </div>\r
\r
      <!-- Ciudad y Estado -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>\r
        <input\r
          type="text"\r
          formControlName="city"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ciudad">\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>\r
        <input\r
          type="text"\r
          formControlName="state"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Estado">\r
      </div>\r
\r
      <!-- Pa\xEDs y CP -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Pa\xEDs</label>\r
        <select\r
          formControlName="country"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">\r
          <option value="">Selecciona un pa\xEDs</option>\r
          <option *ngFor="let opt of countryOptions" [value]="opt.id">{{ opt.name }}</option>\r
        </select>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">CP</label>\r
        <input\r
          type="text"\r
          formControlName="zip_code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="C\xF3digo postal">\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="vendor-modal__footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      [text]="isNew ? 'Crear Proveedor' : 'Guardar Cambios'"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      [disabled]="form.invalid || saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/vendor-detail-modal/vendor-detail-modal.component.scss */\n:host ::ng-deep .mat-mdc-dialog-container {\n  max-width: 800px !important;\n}\n.vendor-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n  background: #fff;\n}\n.vendor-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.vendor-modal__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.vendor-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.vendor-modal__header .close:hover {\n  color: #1f2937;\n}\n.vendor-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.vendor-modal__body form {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n.vendor-modal__body form .col-span-2 {\n  grid-column: 1/-1;\n}\n.vendor-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n@media (max-width: 640px) {\n  .vendor-modal__body form {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=vendor-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: VendorService }, { type: MatSnackBar }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VendorDetailModalComponent, { className: "VendorDetailModalComponent", filePath: "src/app/features/settings/components/vendor-detail-modal/vendor-detail-modal.component.ts", lineNumber: 20 });
})();

// src/app/features/settings/components/vendor-list/vendor-list.component.ts
var _c0 = ["tableTemplate"];
function VendorListComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "span", 9);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td")(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r2.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.company_name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.rfc);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.city);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.state);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.country);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.persona_type);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium " + ctx_r2.getStatusClass(item_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r2.status), " ");
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
      { name: "RFC", prop: "rfc", sortable: false, canAutoResize: true, width: 120 },
      { name: "Ciudad", prop: "city", sortable: true, canAutoResize: true, width: 120 },
      { name: "Estado", prop: "state", sortable: true, canAutoResize: true, width: 100 },
      { name: "Pa\xEDs", prop: "country", sortable: true, canAutoResize: true, width: 100 },
      { name: "Tipo", prop: "persona_type", sortable: true, canAutoResize: true, width: 120 },
      { name: "Status", prop: "status", sortable: true, canAutoResize: true, width: 100 }
    ],
    externalPaging: false,
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
  destroy$ = new Subject();
  constructor(router, route, vendorService, dialog, snackBar) {
    this.router = router;
    this.route = route;
    this.vendorService = vendorService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.loadVendors();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadVendors() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const params = {};
    if (this.search && this.search.trim()) {
      params.search = this.search;
    }
    this.vendorService.getVendors(params).subscribe({
      next: (res) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: res.data,
          totalResults: res.total,
          loading: false
        }));
      },
      error: (error) => {
        console.error("Error loading vendors:", error);
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: false }));
      }
    });
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.loadVendors();
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
  viewDetail(vendor) {
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
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  }
  getStatusLabel(status) {
    return status === "active" ? "Activo" : "Inactivo";
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
  }, decls: 10, vars: 3, consts: [["tableTemplate", ""], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "items-center", "gap-3"], [1, "w-64", 3, "searchChange", "param_activate"], ["text", "Nuevo Proveedor", "custom_class", "btn_primary", 3, "clicked"], [3, "rowClick", "config", "rowTemplate"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "whitespace-nowrap"], [1, "text-xs", "text-gray-600"]], template: function VendorListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
      \u0275\u0275text(3, "Proveedores");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "app-search", 5);
      \u0275\u0275listener("searchChange", function VendorListComponent_Template_app_search_searchChange_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "app-button", 6);
      \u0275\u0275listener("clicked", function VendorListComponent_Template_app_button_clicked_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateVendorModal());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "app-datatable-wrapper", 7);
      \u0275\u0275listener("rowClick", function VendorListComponent_Template_app_datatable_wrapper_rowClick_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.viewDetail($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(8, VendorListComponent_ng_template_8_Template, 19, 10, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
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
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
  ], styles: ["\n\n/*# sourceMappingURL=vendor-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorListComponent, [{
    type: Component,
    args: [{ selector: "app-vendor-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent
    ], template: `<div class="px-4">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <h2 class="text-2xl font-semibold text-gray-800">Proveedores</h2>\r
\r
    <div class="flex items-center gap-3">\r
      <app-search\r
        class="w-64"\r
        [param_activate]="false"\r
        (searchChange)="onSearchChange($event)">\r
      </app-search>\r
\r
      <app-button\r
        text="Nuevo Proveedor"\r
        custom_class="btn_primary"\r
        (clicked)="openCreateVendorModal()">\r
      </app-button>\r
    </div>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate"\r
    (rowClick)="viewDetail($event)">\r
  </app-datatable-wrapper>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">\r
      {{ item.name }}\r
    </span>\r
  </td>\r
  <td>{{ item.company_name }}</td>\r
  <td>{{ item.rfc }}</td>\r
  <td>{{ item.city }}</td>\r
  <td>{{ item.state }}</td>\r
  <td>{{ item.country }}</td>\r
  <td>\r
    <span class="text-xs text-gray-600">{{ item.persona_type }}</span>\r
  </td>\r
  <td>\r
    <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + getStatusClass(item.status)">\r
      {{ getStatusLabel(item.status) }}\r
    </span>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/settings/components/vendor-list/vendor-list.component.scss */\n/*# sourceMappingURL=vendor-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: VendorService }, { type: MatDialog }, { type: MatSnackBar }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VendorListComponent, { className: "VendorListComponent", filePath: "src/app/features/settings/components/vendor-list/vendor-list.component.ts", lineNumber: 30 });
})();

// src/app/features/settings/components/warehouse-list/warehouse-list.component.ts
var _c02 = ["tableTemplate"];
function WarehouseListComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td")(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r2.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.country);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.state);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium " + ctx_r2.getStatusClass(item_r2.status));
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
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
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
  }, decls: 10, vars: 3, consts: [["tableTemplate", ""], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "items-center", "gap-3"], [1, "w-64", 3, "searchChange", "param_activate"], ["text", "Nuevo Almac\xE9n", "custom_class", "btn_primary", 3, "clicked"], [3, "rowClick", "config", "rowTemplate"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "whitespace-nowrap"]], template: function WarehouseListComponent_Template(rf, ctx) {
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
      \u0275\u0275template(8, WarehouseListComponent_ng_template_8_Template, 12, 7, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
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
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent
  ], styles: ["\n\n/*# sourceMappingURL=warehouse-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarehouseListComponent, [{
    type: Component,
    args: [{ selector: "app-warehouse-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent
    ], template: `<div class="px-4">\r
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
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate"\r
    (rowClick)="viewDetail($event.data)">\r
  </app-datatable-wrapper>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">\r
      {{ item.name }}\r
    </span>\r
  </td>\r
  <td>{{ item.code }}</td>\r
  <td>{{ item.country }}</td>\r
  <td>{{ item.state }}</td>\r
  <td>\r
    <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + getStatusClass(item.status)">\r
      {{ getStatusLabel(item.status) }}\r
    </span>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/settings/components/warehouse-list/warehouse-list.component.scss */\n/*# sourceMappingURL=warehouse-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: WarehouseService }, { type: MatDialog }, { type: MatSnackBar }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WarehouseListComponent, { className: "WarehouseListComponent", filePath: "src/app/features/settings/components/warehouse-list/warehouse-list.component.ts", lineNumber: 28 });
})();

// src/app/features/settings/models/fiscal-configuration.model.ts
var FISCAL_REGIMES = [
  { id: "601", name: "601 - R\xE9gimen General de Ley Personas Morales" },
  { id: "603", name: "603 - Personas Morales con R\xE9gimen de Intereses" },
  { id: "605", name: "605 - Personas Morales con R\xE9gimen de Actividades Agr\xEDcolas" },
  { id: "606", name: "606 - Personas Morales con R\xE9gimen de Actividades Ganaderas" },
  { id: "607", name: "607 - Personas Morales con R\xE9gimen de Actividades Pesqueras" },
  { id: "608", name: "608 - Personas Morales con R\xE9gimen de Actividades Silv\xEDcolas" },
  { id: "609", name: "609 - Personas Morales con R\xE9gimen de Actividades Forestales" },
  { id: "610", name: "610 - Personas Morales con R\xE9gimen de Actividades Mineras" },
  { id: "611", name: "611 - Personas Morales con R\xE9gimen de Actividades Petroleras" },
  { id: "614", name: "614 - Personas Morales con R\xE9gimen de Actividades de Transporte" },
  { id: "616", name: "616 - Personas Morales con R\xE9gimen de Actividades de Telecomunicaciones" },
  { id: "620", name: "620 - Personas Morales con R\xE9gimen de Actividades de Servicios Financieros" },
  { id: "621", name: "621 - Personas Morales con R\xE9gimen de Actividades de Seguros" },
  { id: "622", name: "622 - Personas Morales con R\xE9gimen de Actividades de Fianzas" },
  { id: "623", name: "623 - Personas Morales con R\xE9gimen de Actividades de Fondos de Pensiones" },
  { id: "624", name: "624 - Personas Morales con R\xE9gimen de Actividades de Administraci\xF3n de Fondos" },
  { id: "625", name: "625 - Personas Morales con R\xE9gimen de Actividades de Sociedades de Inversi\xF3n" },
  { id: "626", name: "626 - Personas Morales con R\xE9gimen de Actividades de Sociedades de Cr\xE9dito" },
  { id: "627", name: "627 - Personas Morales con R\xE9gimen de Actividades de Uniones de Cr\xE9dito" },
  { id: "628", name: "628 - Personas Morales con R\xE9gimen de Actividades de Instituciones de Cr\xE9dito" },
  { id: "629", name: "629 - Personas Morales con R\xE9gimen de Actividades de Casas de Bolsa" },
  { id: "630", name: "630 - Personas Morales con R\xE9gimen de Actividades de Mercados de Futuros" }
];

// src/app/features/settings/components/branch-modal/branch-modal.component.ts
function BranchModalComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " C\xF3digo requerido (m\xEDn. 2 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Direcci\xF3n requerida (m\xEDn. 5 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Ciudad requerida ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Estado requerido ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " Pa\xEDs requerido ");
    \u0275\u0275elementEnd();
  }
}
function BranchModalComponent_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, " C\xF3digo postal inv\xE1lido (5 d\xEDgitos) ");
    \u0275\u0275elementEnd();
  }
}
var BranchModalComponent = class _BranchModalComponent {
  fb;
  branchService;
  snackBar;
  dialogRef;
  data;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  isNew = true;
  statusOptions = [
    { id: 1, name: "Activo" },
    { id: 0, name: "Inactivo" }
  ];
  statusSelectConfig;
  constructor(fb, branchService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.branchService = branchService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isNew = !data.branch;
    this.form = this.createForm();
  }
  ngOnInit() {
    this.initializeSelectConfigs();
    if (this.data.branch) {
      this.form.patchValue(this.data.branch);
    }
  }
  initializeSelectConfigs() {
    this.statusSelectConfig = {
      placeholder: "Selecciona status",
      data: this.statusOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("status"),
      name_select: "status"
    };
  }
  createForm() {
    return this.fb.group({
      code: ["", [Validators.required, Validators.minLength(2)]],
      address: ["", [Validators.required, Validators.minLength(5)]],
      city: ["", [Validators.required, Validators.minLength(2)]],
      state: ["", [Validators.required, Validators.minLength(2)]],
      country: ["M\xE9xico", [Validators.required, Validators.minLength(2)]],
      postal_code: ["", [Validators.required, Validators.pattern(/^\d{5}$/)]],
      status: [1]
    });
  }
  save() {
    if (this.form.invalid || this.saving())
      return;
    this.saving.set(true);
    const formValue = this.form.value;
    if (this.isNew) {
      this.branchService.createBranch(this.data.fiscalConfigId, formValue).subscribe({
        next: (branch) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Sucursal creada correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(branch);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al crear sucursal", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    } else {
      this.branchService.updateBranch(this.data.fiscalConfigId, this.data.branch.id, formValue).subscribe({
        next: (branch) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Sucursal actualizada correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(branch);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al actualizar sucursal", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
  onStatusChange(event) {
    this.form.get("status")?.setValue(event.value, { emitEvent: false });
  }
  static \u0275fac = function BranchModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BranchModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BranchModalComponent, selectors: [["app-branch-modal"]], decls: 44, vars: 13, consts: [[1, "branch-modal"], [1, "branch-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "branch-modal__body"], [3, "formGroup"], [1, "col-span-2"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "code", "placeholder", "Ej: BRANCH-001", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "address", "placeholder", "Ej: Av. Principal 123", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "city", "placeholder", "Ej: Monterrey", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "state", "placeholder", "Ej: Nuevo Le\xF3n", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "country", "placeholder", "M\xE9xico", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "postal_code", "placeholder", "64000", "maxlength", "5", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [3, "changeOption", "config"], [1, "branch-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading", "disabled"], [1, "text-xs", "text-red-600", "mt-1"]], template: function BranchModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function BranchModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div", 5)(8, "label", 6);
      \u0275\u0275text(9, "C\xF3digo *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "input", 7);
      \u0275\u0275template(11, BranchModalComponent_p_11_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 5)(13, "label", 6);
      \u0275\u0275text(14, "Direcci\xF3n *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "input", 9);
      \u0275\u0275template(16, BranchModalComponent_p_16_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div")(18, "label", 6);
      \u0275\u0275text(19, "Ciudad *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 10);
      \u0275\u0275template(21, BranchModalComponent_p_21_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div")(23, "label", 6);
      \u0275\u0275text(24, "Estado *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "input", 11);
      \u0275\u0275template(26, BranchModalComponent_p_26_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "label", 6);
      \u0275\u0275text(29, "Pa\xEDs *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "input", 12);
      \u0275\u0275template(31, BranchModalComponent_p_31_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div")(33, "label", 6);
      \u0275\u0275text(34, "C\xF3digo Postal *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 13);
      \u0275\u0275template(36, BranchModalComponent_p_36_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 5)(38, "label", 6);
      \u0275\u0275text(39, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "app-select", 14);
      \u0275\u0275listener("changeOption", function BranchModalComponent_Template_app_select_changeOption_40_listener($event) {
        return ctx.onStatusChange($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(41, "div", 15)(42, "app-button", 16);
      \u0275\u0275listener("clicked", function BranchModalComponent_Template_app_button_clicked_42_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "app-button", 17);
      \u0275\u0275listener("clicked", function BranchModalComponent_Template_app_button_clicked_43_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Nueva Sucursal" : "Editar Sucursal");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("code")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("code")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_4_0 = ctx.form.get("address")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("address")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.form.get("city")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("city")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_6_0 = ctx.form.get("state")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.form.get("state")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.form.get("country")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("country")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("postal_code")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("postal_code")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isNew ? "Crear Sucursal" : "Guardar Cambios")("loading", ctx.saving())("disabled", ctx.form.invalid || ctx.saving());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, FormGroupDirective, FormControlName, ButtonComponent, SelectComponent, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.branch-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n  width: 600px;\n}\n.branch-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.branch-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.branch-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.branch-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.branch-modal__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div.col-span-2[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.branch-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.branch-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=branch-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchModalComponent, [{
    type: Component,
    args: [{ selector: "app-branch-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, LucideAngularModule], template: `<div class="branch-modal">\r
  <div class="branch-modal__header">\r
    <h2>{{ isNew ? 'Nueva Sucursal' : 'Editar Sucursal' }}</h2>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="close()">\r
    </lucide-icon>\r
  </div>\r
\r
  <div class="branch-modal__body">\r
    <form [formGroup]="form">\r
      <!-- C\xF3digo -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">C\xF3digo *</label>\r
        <input\r
          type="text"\r
          formControlName="code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ej: BRANCH-001">\r
        <p *ngIf="form.get('code')?.invalid && form.get('code')?.touched" class="text-xs text-red-600 mt-1">\r
          C\xF3digo requerido (m\xEDn. 2 caracteres)\r
        </p>\r
      </div>\r
\r
      <!-- Direcci\xF3n -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Direcci\xF3n *</label>\r
        <input\r
          type="text"\r
          formControlName="address"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ej: Av. Principal 123">\r
        <p *ngIf="form.get('address')?.invalid && form.get('address')?.touched" class="text-xs text-red-600 mt-1">\r
          Direcci\xF3n requerida (m\xEDn. 5 caracteres)\r
        </p>\r
      </div>\r
\r
      <!-- Ciudad -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad *</label>\r
        <input\r
          type="text"\r
          formControlName="city"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ej: Monterrey">\r
        <p *ngIf="form.get('city')?.invalid && form.get('city')?.touched" class="text-xs text-red-600 mt-1">\r
          Ciudad requerida\r
        </p>\r
      </div>\r
\r
      <!-- Estado -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado *</label>\r
        <input\r
          type="text"\r
          formControlName="state"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ej: Nuevo Le\xF3n">\r
        <p *ngIf="form.get('state')?.invalid && form.get('state')?.touched" class="text-xs text-red-600 mt-1">\r
          Estado requerido\r
        </p>\r
      </div>\r
\r
      <!-- Pa\xEDs -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Pa\xEDs *</label>\r
        <input\r
          type="text"\r
          formControlName="country"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="M\xE9xico">\r
        <p *ngIf="form.get('country')?.invalid && form.get('country')?.touched" class="text-xs text-red-600 mt-1">\r
          Pa\xEDs requerido\r
        </p>\r
      </div>\r
\r
      <!-- C\xF3digo Postal -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">C\xF3digo Postal *</label>\r
        <input\r
          type="text"\r
          formControlName="postal_code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="64000"\r
          maxlength="5">\r
        <p *ngIf="form.get('postal_code')?.invalid && form.get('postal_code')?.touched" class="text-xs text-red-600 mt-1">\r
          C\xF3digo postal inv\xE1lido (5 d\xEDgitos)\r
        </p>\r
      </div>\r
\r
      <!-- Status -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>\r
        <app-select\r
          [config]="statusSelectConfig"\r
          (changeOption)="onStatusChange($event)">\r
        </app-select>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="branch-modal__footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      [text]="isNew ? 'Crear Sucursal' : 'Guardar Cambios'"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      [disabled]="form.invalid || saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/branch-modal/branch-modal.component.scss */\n.branch-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n  width: 600px;\n}\n.branch-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.branch-modal__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.branch-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.branch-modal__header .close:hover {\n  color: #1f2937;\n}\n.branch-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.branch-modal__body form {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.branch-modal__body form > div {\n  display: flex;\n  flex-direction: column;\n}\n.branch-modal__body form > div.col-span-2 {\n  grid-column: 1/-1;\n}\n.branch-modal__body form label {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.branch-modal__body form input,\n.branch-modal__body form select,\n.branch-modal__body form textarea {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.branch-modal__body form input:focus,\n.branch-modal__body form select:focus,\n.branch-modal__body form textarea:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.branch-modal__body form input:disabled,\n.branch-modal__body form select:disabled,\n.branch-modal__body form textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.branch-modal__body form textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.branch-modal__body form p {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.branch-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=branch-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: BranchService }, { type: MatSnackBar }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BranchModalComponent, { className: "BranchModalComponent", filePath: "src/app/features/settings/components/branch-modal/branch-modal.component.ts", lineNumber: 21 });
})();

// src/app/features/settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component.ts
function FiscalConfigurationModalComponent_div_8_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, " Raz\xF3n social requerida (m\xEDn. 2 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function FiscalConfigurationModalComponent_div_8_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, " RFC inv\xE1lido (formato: 3-4 letras + 6 d\xEDgitos + 3 alfanum\xE9ricos) ");
    \u0275\u0275elementEnd();
  }
}
function FiscalConfigurationModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "form", 11)(2, "div", 12)(3, "label", 13);
    \u0275\u0275text(4, "Raz\xF3n Social *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 14);
    \u0275\u0275template(6, FiscalConfigurationModalComponent_div_8_p_6_Template, 2, 0, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "label", 13);
    \u0275\u0275text(9, "RFC *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 16);
    \u0275\u0275template(11, FiscalConfigurationModalComponent_div_8_p_11_Template, 2, 0, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "label", 13);
    \u0275\u0275text(14, "Tipo de Persona *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "app-select", 17);
    \u0275\u0275listener("changeOption", function FiscalConfigurationModalComponent_div_8_Template_app_select_changeOption_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPersonaTypeChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 12)(17, "label", 13);
    \u0275\u0275text(18, "R\xE9gimen Fiscal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "app-select", 17);
    \u0275\u0275listener("changeOption", function FiscalConfigurationModalComponent_div_8_Template_app_select_changeOption_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFiscalRegimeChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 12)(21, "label", 13);
    \u0275\u0275text(22, "Sello Digital");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "textarea", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 12)(25, "label", 13);
    \u0275\u0275text(26, "Contrase\xF1a del Sello Digital");
    \u0275\u0275elementEnd();
    \u0275\u0275element(27, "input", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 12)(29, "label", 13);
    \u0275\u0275text(30, "Llave Privada");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "textarea", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 12)(33, "label", 13);
    \u0275\u0275text(34, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "app-select", 17);
    \u0275\u0275listener("changeOption", function FiscalConfigurationModalComponent_div_8_Template_app_select_changeOption_35_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onStatusChange($event));
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_2_0 = ctx_r1.form.get("razon_social")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.form.get("razon_social")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r1.form.get("rfc")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.form.get("rfc")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(4);
    \u0275\u0275property("config", ctx_r1.personaTypeSelectConfig);
    \u0275\u0275advance(4);
    \u0275\u0275property("config", ctx_r1.fiscalRegimeSelectConfig);
    \u0275\u0275advance(16);
    \u0275\u0275property("config", ctx_r1.statusSelectConfig);
  }
}
function FiscalConfigurationModalComponent_div_9_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "p");
    \u0275\u0275text(2, "Cargando sucursales...");
    \u0275\u0275elementEnd()();
  }
}
function FiscalConfigurationModalComponent_div_9_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "p");
    \u0275\u0275text(2, "No hay sucursales configuradas");
    \u0275\u0275elementEnd()();
  }
}
function FiscalConfigurationModalComponent_div_9_table_6_tr_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 31);
    \u0275\u0275listener("click", function FiscalConfigurationModalComponent_div_9_table_6_tr_16_Template_tr_click_0_listener() {
      const branch_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openBranchModal(branch_r5));
    });
    \u0275\u0275elementStart(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const branch_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.address);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.city);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.state);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(branch_r5.postal_code);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("status-badge " + ctx_r1.getStatusClass(branch_r5.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(branch_r5.status), " ");
  }
}
function FiscalConfigurationModalComponent_div_9_table_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 29)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "C\xD3DIGO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "DIRECCI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "CIUDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "ESTADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "C.P.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "STATUS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275template(16, FiscalConfigurationModalComponent_div_9_table_6_tr_16_Template, 14, 8, "tr", 30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r1.branches);
  }
}
function FiscalConfigurationModalComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 22)(2, "button", 23);
    \u0275\u0275listener("click", function FiscalConfigurationModalComponent_div_9_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openBranchModal());
    });
    \u0275\u0275text(3, " + Agregar Sucursal ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, FiscalConfigurationModalComponent_div_9_div_4_Template, 3, 0, "div", 24)(5, FiscalConfigurationModalComponent_div_9_div_5_Template, 3, 0, "div", 25)(6, FiscalConfigurationModalComponent_div_9_table_6_Template, 17, 1, "table", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.loadingBranches);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loadingBranches && ctx_r1.branches.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.loadingBranches && ctx_r1.branches.length > 0);
  }
}
function FiscalConfigurationModalComponent_app_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 32);
    \u0275\u0275listener("clicked", function FiscalConfigurationModalComponent_app_button_12_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("text", ctx_r1.isNew ? "Crear Configuraci\xF3n" : "Guardar Cambios")("loading", ctx_r1.saving())("disabled", ctx_r1.form.invalid || ctx_r1.saving());
  }
}
var FiscalConfigurationModalComponent = class _FiscalConfigurationModalComponent {
  fb;
  fiscalConfigService;
  branchService;
  snackBar;
  dialog;
  cdr;
  dialogRef;
  data;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  isNew = true;
  // Tabs
  tabs = [
    { id: "configuracion", title: "Configuraci\xF3n" },
    { id: "sucursales", title: "Sucursales" }
  ];
  activeTab = "configuracion";
  // Branches
  branches = [];
  loadingBranches = false;
  personaTypeOptions = [
    { id: "Persona F\xEDsica", name: "Persona F\xEDsica" },
    { id: "Persona Moral", name: "Persona Moral" }
  ];
  statusOptions = [
    { id: "active", name: "Activo" },
    { id: "inactive", name: "Inactivo" }
  ];
  fiscalRegimes = FISCAL_REGIMES;
  // Select configurations
  personaTypeSelectConfig;
  fiscalRegimeSelectConfig;
  statusSelectConfig;
  constructor(fb, fiscalConfigService, branchService, snackBar, dialog, cdr, dialogRef, data) {
    this.fb = fb;
    this.fiscalConfigService = fiscalConfigService;
    this.branchService = branchService;
    this.snackBar = snackBar;
    this.dialog = dialog;
    this.cdr = cdr;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isNew = !data.fiscalConfig;
    this.form = this.createForm();
  }
  ngOnInit() {
    this.initializeSelectConfigs();
    if (this.data.fiscalConfig) {
      this.form.patchValue(this.data.fiscalConfig);
      this.loadBranches();
    }
  }
  loadBranches() {
    if (!this.data.fiscalConfig)
      return;
    this.loadingBranches = true;
    this.branchService.getBranches(this.data.fiscalConfig.id).subscribe({
      next: (branches) => {
        this.branches = branches;
        this.loadingBranches = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading branches:", error);
        this.loadingBranches = false;
        this.cdr.detectChanges();
      }
    });
  }
  openBranchModal(branch) {
    if (!this.data.fiscalConfig) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: "Debes guardar la configuraci\xF3n fiscal antes de agregar sucursales", type: "error" },
        duration: 3e3
      });
      return;
    }
    const dialogRef = this.dialog.open(BranchModalComponent, {
      width: "600px",
      data: {
        fiscalConfigId: this.data.fiscalConfig.id,
        branch: branch || null
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBranches();
      }
    });
  }
  getStatusLabel(status) {
    return status === 1 ? "Activo" : "Inactivo";
  }
  getStatusClass(status) {
    return status === 1 ? "status-active" : "status-inactive";
  }
  initializeSelectConfigs() {
    this.personaTypeSelectConfig = {
      placeholder: "Selecciona tipo de persona",
      data: this.personaTypeOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("persona_type"),
      name_select: "persona_type"
    };
    this.fiscalRegimeSelectConfig = {
      placeholder: "Selecciona un r\xE9gimen fiscal",
      data: this.fiscalRegimes,
      value: "id",
      option: "name",
      form_control: this.form.get("fiscal_regime"),
      name_select: "fiscal_regime"
    };
    this.statusSelectConfig = {
      placeholder: "Selecciona status",
      data: this.statusOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("status"),
      name_select: "status"
    };
  }
  createForm() {
    return this.fb.group({
      razon_social: ["", [Validators.required, Validators.minLength(2)]],
      rfc: ["", [Validators.required, Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/)]],
      persona_type: ["Persona Moral", [Validators.required]],
      fiscal_regime: [""],
      digital_seal: [""],
      digital_seal_password: [""],
      private_key: [""],
      status: ["active"]
    });
  }
  save() {
    if (this.form.invalid || this.saving())
      return;
    this.saving.set(true);
    const formValue = this.form.value;
    if (this.isNew) {
      this.fiscalConfigService.createFiscalConfiguration(formValue).subscribe({
        next: (config) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Configuraci\xF3n fiscal creada correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(config);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al crear configuraci\xF3n fiscal", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    } else {
      this.fiscalConfigService.updateFiscalConfiguration(this.data.fiscalConfig.id, formValue).subscribe({
        next: (config) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Configuraci\xF3n fiscal actualizada correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(config);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al actualizar configuraci\xF3n fiscal", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
  onPersonaTypeChange(event) {
    this.form.get("persona_type")?.setValue(event.value, { emitEvent: false });
  }
  onFiscalRegimeChange(event) {
    this.form.get("fiscal_regime")?.setValue(event.value, { emitEvent: false });
  }
  onStatusChange(event) {
    this.form.get("status")?.setValue(event.value, { emitEvent: false });
  }
  static \u0275fac = function FiscalConfigurationModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FiscalConfigurationModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(FiscalConfigurationService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FiscalConfigurationModalComponent, selectors: [["app-fiscal-configuration-modal"]], decls: 13, vars: 7, consts: [[1, "fiscal-modal"], [1, "fiscal-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "fiscal-modal__body"], [3, "tabChange", "tabs", "activeTabId"], [1, "tab-content"], ["class", "tab-pane", 4, "ngIf"], [1, "fiscal-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "text", "loading", "disabled", "clicked", 4, "ngIf"], [1, "tab-pane"], [3, "formGroup"], [1, "col-span-2"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "razon_social", "placeholder", "Raz\xF3n social de la empresa", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "rfc", "placeholder", "Ej: GMM140115PIA", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "uppercase"], [3, "changeOption", "config"], ["formControlName", "digital_seal", "placeholder", "Certificado digital (PEM format)", "rows", "3", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "font-mono", "text-xs"], ["type", "password", "formControlName", "digital_seal_password", "placeholder", "Contrase\xF1a del certificado", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["formControlName", "private_key", "placeholder", "Llave privada (PEM format)", "rows", "3", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "font-mono", "text-xs"], [1, "text-xs", "text-red-600", "mt-1"], [1, "tab-header"], ["type", "button", 1, "btn", "btn--sm", "btn--primary", 3, "click"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "data-table", 4, "ngIf"], [1, "loading-state"], [1, "empty-state"], [1, "data-table"], ["class", "clickable-row", 3, "click", 4, "ngFor", "ngForOf"], [1, "clickable-row", 3, "click"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading", "disabled"]], template: function FiscalConfigurationModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function FiscalConfigurationModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "app-tab", 4);
      \u0275\u0275listener("tabChange", function FiscalConfigurationModalComponent_Template_app_tab_tabChange_6_listener($event) {
        return ctx.activeTab = $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275template(8, FiscalConfigurationModalComponent_div_8_Template, 36, 6, "div", 6)(9, FiscalConfigurationModalComponent_div_9_Template, 7, 3, "div", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 7)(11, "app-button", 8);
      \u0275\u0275listener("clicked", function FiscalConfigurationModalComponent_Template_app_button_clicked_11_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, FiscalConfigurationModalComponent_app_button_12_Template, 1, 3, "app-button", 9);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Nueva Configuraci\xF3n Fiscal" : "Editar Configuraci\xF3n Fiscal");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("tabs", ctx.tabs)("activeTabId", ctx.activeTab);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.activeTab === "configuracion");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.activeTab === "sucursales");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.activeTab === "configuracion");
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ButtonComponent, SelectComponent, TabComponent, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.fiscal-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n}\n.fiscal-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.fiscal-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.fiscal-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.fiscal-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.fiscal-modal__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-content[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-pane[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-in;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 1rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: none;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%]   .btn--primary[_ngcontent-%COMP%] {\n  background-color: #3b82f6;\n  color: white;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%]   .btn--primary[_ngcontent-%COMP%]:hover {\n  background-color: #2563eb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .tab-header[_ngcontent-%COMP%]   .btn--sm[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.8125rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n  text-align: center;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n  transition: background-color 0.15s;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.clickable-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.clickable-row[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  color: #1f2937;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .status-badge.status-active[_ngcontent-%COMP%] {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%]   .status-badge.status-inactive[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div.col-span-2[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.fiscal-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.fiscal-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=fiscal-configuration-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FiscalConfigurationModalComponent, [{
    type: Component,
    args: [{ selector: "app-fiscal-configuration-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, TabComponent, LucideAngularModule], template: `<div class="fiscal-modal">\r
  <div class="fiscal-modal__header">\r
    <h2>{{ isNew ? 'Nueva Configuraci\xF3n Fiscal' : 'Editar Configuraci\xF3n Fiscal' }}</h2>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="close()">\r
    </lucide-icon>\r
  </div>\r
\r
  <div class="fiscal-modal__body">\r
    <!-- Tabs -->\r
    <app-tab [tabs]="tabs" [activeTabId]="activeTab" (tabChange)="activeTab = $event"></app-tab>\r
\r
    <!-- Tab Content -->\r
    <div class="tab-content">\r
      <!-- Tab: Configuraci\xF3n -->\r
      <div *ngIf="activeTab === 'configuracion'" class="tab-pane">\r
        <form [formGroup]="form">\r
          <!-- Raz\xF3n Social -->\r
          <div class="col-span-2">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Raz\xF3n Social *</label>\r
            <input\r
              type="text"\r
              formControlName="razon_social"\r
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
              placeholder="Raz\xF3n social de la empresa">\r
            <p *ngIf="form.get('razon_social')?.invalid && form.get('razon_social')?.touched" class="text-xs text-red-600 mt-1">\r
              Raz\xF3n social requerida (m\xEDn. 2 caracteres)\r
            </p>\r
          </div>\r
\r
          <!-- RFC -->\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">RFC *</label>\r
            <input\r
              type="text"\r
              formControlName="rfc"\r
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 uppercase"\r
              placeholder="Ej: GMM140115PIA">\r
            <p *ngIf="form.get('rfc')?.invalid && form.get('rfc')?.touched" class="text-xs text-red-600 mt-1">\r
              RFC inv\xE1lido (formato: 3-4 letras + 6 d\xEDgitos + 3 alfanum\xE9ricos)\r
            </p>\r
          </div>\r
\r
          <!-- Tipo de Persona -->\r
          <div>\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Persona *</label>\r
            <app-select\r
              [config]="personaTypeSelectConfig"\r
              (changeOption)="onPersonaTypeChange($event)">\r
            </app-select>\r
          </div>\r
\r
          <!-- R\xE9gimen Fiscal -->\r
          <div class="col-span-2">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">R\xE9gimen Fiscal</label>\r
            <app-select\r
              [config]="fiscalRegimeSelectConfig"\r
              (changeOption)="onFiscalRegimeChange($event)">\r
            </app-select>\r
          </div>\r
\r
          <!-- Sello Digital -->\r
          <div class="col-span-2">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Sello Digital</label>\r
            <textarea\r
              formControlName="digital_seal"\r
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-xs"\r
              placeholder="Certificado digital (PEM format)"\r
              rows="3"></textarea>\r
          </div>\r
\r
          <!-- Contrase\xF1a del Sello -->\r
          <div class="col-span-2">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Contrase\xF1a del Sello Digital</label>\r
            <input\r
              type="password"\r
              formControlName="digital_seal_password"\r
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
              placeholder="Contrase\xF1a del certificado">\r
          </div>\r
\r
          <!-- Llave Privada -->\r
          <div class="col-span-2">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Llave Privada</label>\r
            <textarea\r
              formControlName="private_key"\r
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono text-xs"\r
              placeholder="Llave privada (PEM format)"\r
              rows="3"></textarea>\r
          </div>\r
\r
          <!-- Status -->\r
          <div class="col-span-2">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>\r
            <app-select\r
              [config]="statusSelectConfig"\r
              (changeOption)="onStatusChange($event)">\r
            </app-select>\r
          </div>\r
        </form>\r
      </div>\r
\r
      <!-- Tab: Sucursales -->\r
      <div *ngIf="activeTab === 'sucursales'" class="tab-pane">\r
        <div class="tab-header">\r
          <button class="btn btn--sm btn--primary" (click)="openBranchModal()" type="button">\r
            + Agregar Sucursal\r
          </button>\r
        </div>\r
\r
        <div *ngIf="loadingBranches" class="loading-state">\r
          <p>Cargando sucursales...</p>\r
        </div>\r
\r
        <div *ngIf="!loadingBranches && branches.length === 0" class="empty-state">\r
          <p>No hay sucursales configuradas</p>\r
        </div>\r
\r
        <table *ngIf="!loadingBranches && branches.length > 0" class="data-table">\r
          <thead>\r
            <tr>\r
              <th>C\xD3DIGO</th>\r
              <th>DIRECCI\xD3N</th>\r
              <th>CIUDAD</th>\r
              <th>ESTADO</th>\r
              <th>C.P.</th>\r
              <th>STATUS</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr *ngFor="let branch of branches" (click)="openBranchModal(branch)" class="clickable-row">\r
              <td>{{ branch.code }}</td>\r
              <td>{{ branch.address }}</td>\r
              <td>{{ branch.city }}</td>\r
              <td>{{ branch.state }}</td>\r
              <td>{{ branch.postal_code }}</td>\r
              <td>\r
                <span [class]="'status-badge ' + getStatusClass(branch.status)">\r
                  {{ getStatusLabel(branch.status) }}\r
                </span>\r
              </td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="fiscal-modal__footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      *ngIf="activeTab === 'configuracion'"\r
      [text]="isNew ? 'Crear Configuraci\xF3n' : 'Guardar Cambios'"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      [disabled]="form.invalid || saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component.scss */\n.fiscal-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n}\n.fiscal-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.fiscal-modal__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.fiscal-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.fiscal-modal__header .close:hover {\n  color: #1f2937;\n}\n.fiscal-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.fiscal-modal__body .tab-content {\n  margin-top: 1rem;\n}\n.fiscal-modal__body .tab-pane {\n  animation: fadeIn 0.2s ease-in;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.fiscal-modal__body .tab-header {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 1rem;\n}\n.fiscal-modal__body .tab-header .btn {\n  padding: 0.5rem 1rem;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n  border: none;\n}\n.fiscal-modal__body .tab-header .btn--primary {\n  background-color: #3b82f6;\n  color: white;\n}\n.fiscal-modal__body .tab-header .btn--primary:hover {\n  background-color: #2563eb;\n}\n.fiscal-modal__body .tab-header .btn--sm {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.8125rem;\n}\n.fiscal-modal__body .empty-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body .loading-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem 1rem;\n  text-align: center;\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body .data-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.fiscal-modal__body .data-table thead {\n  background-color: #f9fafb;\n  border-bottom: 1px solid #e5e7eb;\n}\n.fiscal-modal__body .data-table thead th {\n  padding: 0.75rem 1rem;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.fiscal-modal__body .data-table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n  transition: background-color 0.15s;\n}\n.fiscal-modal__body .data-table tbody tr.clickable-row {\n  cursor: pointer;\n}\n.fiscal-modal__body .data-table tbody tr.clickable-row:hover {\n  background-color: #f3f4f6;\n}\n.fiscal-modal__body .data-table tbody tr:hover {\n  background-color: #f9fafb;\n}\n.fiscal-modal__body .data-table tbody tr td {\n  padding: 0.75rem 1rem;\n  color: #1f2937;\n}\n.fiscal-modal__body .data-table .status-badge {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.fiscal-modal__body .data-table .status-badge.status-active {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.fiscal-modal__body .data-table .status-badge.status-inactive {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.fiscal-modal__body .form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 1.5rem;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n}\n.fiscal-modal__body form {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.fiscal-modal__body form > div {\n  display: flex;\n  flex-direction: column;\n}\n.fiscal-modal__body form > div.col-span-2 {\n  grid-column: 1/-1;\n}\n.fiscal-modal__body form label {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.fiscal-modal__body form input,\n.fiscal-modal__body form select,\n.fiscal-modal__body form textarea {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.fiscal-modal__body form input:focus,\n.fiscal-modal__body form select:focus,\n.fiscal-modal__body form textarea:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.fiscal-modal__body form input:disabled,\n.fiscal-modal__body form select:disabled,\n.fiscal-modal__body form textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.fiscal-modal__body form textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.fiscal-modal__body form p {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.fiscal-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=fiscal-configuration-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: FiscalConfigurationService }, { type: BranchService }, { type: MatSnackBar }, { type: MatDialog }, { type: ChangeDetectorRef }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FiscalConfigurationModalComponent, { className: "FiscalConfigurationModalComponent", filePath: "src/app/features/settings/components/fiscal-configuration-modal/fiscal-configuration-modal.component.ts", lineNumber: 25 });
})();

// src/app/features/settings/components/fiscal-configuration-list/fiscal-configuration-list.component.ts
var _c03 = ["tableTemplate"];
function FiscalConfigurationListComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "td", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.razon_social);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.rfc);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.persona_type);
    \u0275\u0275advance(2);
    \u0275\u0275classMap("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium " + ctx_r2.getStatusClass(item_r2.status));
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
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
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
  }, decls: 11, vars: 2, consts: [["tableTemplate", ""], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "text-gray-600", "text-sm", "mt-1"], ["text", "Nueva Configuraci\xF3n", "custom_class", "btn_primary", 3, "clicked"], [3, "pageChange", "rowClick", "config", "rowTemplate"], [1, "font-mono"]], template: function FiscalConfigurationListComponent_Template(rf, ctx) {
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
      \u0275\u0275template(9, FiscalConfigurationListComponent_ng_template_9_Template, 9, 6, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r4 = \u0275\u0275reference(10);
      \u0275\u0275advance(8);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r4);
    }
  }, dependencies: [CommonModule, ButtonComponent, LucideAngularModule, DatatableWrapperComponent], styles: ["\n\n.fiscal-list-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  padding: 1.5rem;\n  background-color: #f9fafb;\n  min-height: 100vh;\n}\n.fiscal-list-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.fiscal-list-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.fiscal-list-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.fiscal-list-table[_ngcontent-%COMP%] {\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  border-collapse: collapse;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: #f3f4f6;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  font-size: 0.75rem;\n  color: #374151;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background-color 0.2s;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n}\n.fiscal-list-table[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.fiscal-list-pagination[_ngcontent-%COMP%] {\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n  padding: 1rem 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n/*# sourceMappingURL=fiscal-configuration-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FiscalConfigurationListComponent, [{
    type: Component,
    args: [{ selector: "app-fiscal-configuration-list", standalone: true, imports: [CommonModule, ButtonComponent, LucideAngularModule, DatatableWrapperComponent], template: `<div class="px-4">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <div>\r
      <h2 class="text-2xl font-semibold text-gray-800">Configuraciones Fiscales</h2>\r
      <p class="text-gray-600 text-sm mt-1">Gestiona la informaci\xF3n fiscal de tus almacenes</p>\r
    </div>\r
\r
    <app-button\r
      text="Nueva Configuraci\xF3n"\r
      custom_class="btn_primary"\r
      (clicked)="openCreateDialog()">\r
    </app-button>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate"\r
    (pageChange)="onPageChange($event)"\r
    (rowClick)="openEditDialog($event.data)">\r
  </app-datatable-wrapper>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>{{ item.razon_social }}</td>\r
  <td class="font-mono">{{ item.rfc }}</td>\r
  <td>{{ item.persona_type }}</td>\r
  <td>\r
    <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + getStatusClass(item.status)">\r
      {{ getStatusLabel(item.status) }}\r
    </span>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/settings/components/fiscal-configuration-list/fiscal-configuration-list.component.scss */\n.fiscal-list-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  padding: 1.5rem;\n  background-color: #f9fafb;\n  min-height: 100vh;\n}\n.fiscal-list-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.fiscal-list-header h1 {\n  margin: 0;\n}\n.fiscal-list-header p {\n  margin: 0;\n}\n.fiscal-list-table {\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n  overflow: hidden;\n}\n.fiscal-list-table table {\n  border-collapse: collapse;\n}\n.fiscal-list-table table thead {\n  background-color: #f3f4f6;\n}\n.fiscal-list-table table th {\n  text-align: left;\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  font-size: 0.75rem;\n  color: #374151;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.fiscal-list-table table td {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.fiscal-list-table table tbody tr {\n  transition: background-color 0.2s;\n}\n.fiscal-list-table table tbody tr:hover {\n  background-color: #f9fafb;\n}\n.fiscal-list-table table tbody tr:last-child td {\n  border-bottom: none;\n}\n.fiscal-list-pagination {\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n  padding: 1rem 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n/*# sourceMappingURL=fiscal-configuration-list.component.css.map */\n"] }]
  }], () => [{ type: FiscalConfigurationService }, { type: MatDialog }, { type: MatSnackBar }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FiscalConfigurationListComponent, { className: "FiscalConfigurationListComponent", filePath: "src/app/features/settings/components/fiscal-configuration-list/fiscal-configuration-list.component.ts", lineNumber: 21 });
})();

// src/app/features/settings/components/categories-dialog/categories-dialog.component.ts
function CategoriesDialogComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "button", 16);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_14_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startCreating());
    });
    \u0275\u0275text(2, " + Crear Nueva ");
    \u0275\u0275elementEnd()();
  }
}
function CategoriesDialogComponent_form_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 17)(1, "div")(2, "label", 18);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "label", 18);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "textarea", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 21)(10, "button", 22);
    \u0275\u0275listener("click", function CategoriesDialogComponent_form_15_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelCreating());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 23);
    \u0275\u0275listener("click", function CategoriesDialogComponent_form_15_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCategory());
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
function CategoriesDialogComponent_div_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "p");
    \u0275\u0275text(2, "No hay categor\xEDas");
    \u0275\u0275elementEnd()();
  }
}
function CategoriesDialogComponent_div_16_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_1_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectCategory(cat_r5.id));
    });
    \u0275\u0275elementStart(2, "p", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "button", 36);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startEditingCategory(cat_r5));
    });
    \u0275\u0275element(8, "i", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 38);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteCategory(cat_r5));
    });
    \u0275\u0275element(10, "i", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(cat_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(cat_r5.description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function CategoriesDialogComponent_div_16_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div")(2, "label", 18);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesDialogComponent_div_16_div_2_div_2_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingCategoryForm[cat_r5.id].name, $event) || (ctx_r1.editingCategoryForm[cat_r5.id].name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "label", 18);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 42);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesDialogComponent_div_16_div_2_div_2_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingCategoryForm[cat_r5.id].description, $event) || (ctx_r1.editingCategoryForm[cat_r5.id].description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 21)(10, "button", 43);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEditingCategory());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 44);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_16_div_2_div_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const cat_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveEditCategory(cat_r5));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const cat_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingCategoryForm[cat_r5.id].name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingCategoryForm[cat_r5.id].description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : "Guardar", " ");
  }
}
function CategoriesDialogComponent_div_16_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, CategoriesDialogComponent_div_16_div_2_div_1_Template, 11, 3, "div", 29)(2, CategoriesDialogComponent_div_16_div_2_div_2_Template, 14, 4, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingCategoryId() !== cat_r5.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingCategoryId() === cat_r5.id);
  }
}
function CategoriesDialogComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, CategoriesDialogComponent_div_16_div_1_Template, 3, 0, "div", 25)(2, CategoriesDialogComponent_div_16_div_2_Template, 3, 2, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.categories().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.categories());
  }
}
function CategoriesDialogComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "button", 16);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_18_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.startCreatingSubcategory());
    });
    \u0275\u0275text(2, " + Crear Nueva ");
    \u0275\u0275elementEnd()();
  }
}
function CategoriesDialogComponent_form_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 17)(1, "div")(2, "label", 18);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "label", 18);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "textarea", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 21)(10, "button", 22);
    \u0275\u0275listener("click", function CategoriesDialogComponent_form_19_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelCreatingSubcategory());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 23);
    \u0275\u0275listener("click", function CategoriesDialogComponent_form_19_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveSubcategory());
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
function CategoriesDialogComponent_div_20_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27)(1, "p");
    \u0275\u0275text(2, "No hay subcategor\xEDas");
    \u0275\u0275elementEnd()();
  }
}
function CategoriesDialogComponent_div_20_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 46)(2, "p", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 35)(7, "button", 36);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_20_div_2_div_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.startEditingSubcategory(subcat_r10));
    });
    \u0275\u0275element(8, "i", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 38);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_20_div_2_div_1_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r9);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteSubcategory(subcat_r10));
    });
    \u0275\u0275element(10, "i", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const subcat_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(subcat_r10.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(subcat_r10.description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
  }
}
function CategoriesDialogComponent_div_20_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div")(2, "label", 18);
    \u0275\u0275text(3, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesDialogComponent_div_20_div_2_div_2_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r11);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingSubcategoryForm[subcat_r10.id].name, $event) || (ctx_r1.editingSubcategoryForm[subcat_r10.id].name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "label", 18);
    \u0275\u0275text(7, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 42);
    \u0275\u0275twoWayListener("ngModelChange", function CategoriesDialogComponent_div_20_div_2_div_2_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r11);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.editingSubcategoryForm[subcat_r10.id].description, $event) || (ctx_r1.editingSubcategoryForm[subcat_r10.id].description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 21)(10, "button", 43);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_20_div_2_div_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEditingSubcategory());
    });
    \u0275\u0275text(11, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 44);
    \u0275\u0275listener("click", function CategoriesDialogComponent_div_20_div_2_div_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r11);
      const subcat_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveEditSubcategory(subcat_r10));
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const subcat_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingSubcategoryForm[subcat_r10.id].name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.editingSubcategoryForm[subcat_r10.id].description);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving() ? "Guardando..." : "Guardar", " ");
  }
}
function CategoriesDialogComponent_div_20_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, CategoriesDialogComponent_div_20_div_2_div_1_Template, 11, 3, "div", 29)(2, CategoriesDialogComponent_div_20_div_2_div_2_Template, 14, 4, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const subcat_r10 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingSubcategoryId() !== subcat_r10.id);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.editingSubcategoryId() === subcat_r10.id);
  }
}
function CategoriesDialogComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, CategoriesDialogComponent_div_20_div_1_Template, 3, 0, "div", 25)(2, CategoriesDialogComponent_div_20_div_2_Template, 3, 2, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.subcategories().length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.subcategories());
  }
}
var CategoriesDialogComponent = class _CategoriesDialogComponent {
  fb;
  productService;
  snackBar;
  dialogRef;
  form;
  categories = signal([], ...ngDevMode ? [{ debugName: "categories" }] : []);
  subcategories = signal([], ...ngDevMode ? [{ debugName: "subcategories" }] : []);
  selectedCategoryId = signal(null, ...ngDevMode ? [{ debugName: "selectedCategoryId" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  activeTab = signal("categories", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  isCreating = signal(false, ...ngDevMode ? [{ debugName: "isCreating" }] : []);
  isCreatingSubcategory = signal(false, ...ngDevMode ? [{ debugName: "isCreatingSubcategory" }] : []);
  editingCategoryId = signal(null, ...ngDevMode ? [{ debugName: "editingCategoryId" }] : []);
  editingSubcategoryId = signal(null, ...ngDevMode ? [{ debugName: "editingSubcategoryId" }] : []);
  editingCategoryForm = {};
  editingSubcategoryForm = {};
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
    this.loadCategories();
  }
  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar categor\xEDas", type: "error" },
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
  saveCategory() {
    if (!this.form.valid)
      return;
    this.saving.set(true);
    const categoryData = {
      name: this.form.get("name")?.value,
      description: this.form.get("description")?.value || ""
    };
    this.productService.createCategory(categoryData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Categor\xEDa creada exitosamente", type: "success" },
          duration: 3e3
        });
        this.isCreating.set(false);
        this.form.reset();
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al crear categor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  startEditingCategory(category) {
    this.editingCategoryId.set(category.id);
    this.editingCategoryForm[category.id] = { name: category.name, description: category.description };
  }
  cancelEditingCategory() {
    this.editingCategoryId.set(null);
    this.editingCategoryForm = {};
  }
  saveEditCategory(category) {
    if (!this.editingCategoryForm[category.id]?.name)
      return;
    this.saving.set(true);
    const updateData = {
      name: this.editingCategoryForm[category.id].name,
      description: this.editingCategoryForm[category.id].description || ""
    };
    this.productService.updateCategory(category.id, updateData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Categor\xEDa actualizada exitosamente", type: "success" },
          duration: 3e3
        });
        this.editingCategoryId.set(null);
        this.editingCategoryForm = {};
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al actualizar categor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  deleteCategory(category) {
    if (!confirm("\xBFEst\xE1s seguro de que deseas eliminar esta categor\xEDa?"))
      return;
    this.saving.set(true);
    this.productService.deleteCategory(category.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Categor\xEDa eliminada exitosamente", type: "success" },
          duration: 3e3
        });
        this.loadCategories();
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al eliminar categor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  startCreatingSubcategory() {
    this.isCreatingSubcategory.set(true);
    this.form.reset();
  }
  cancelCreatingSubcategory() {
    this.isCreatingSubcategory.set(false);
    this.form.reset();
  }
  saveSubcategory() {
    if (!this.form.valid || !this.selectedCategoryId())
      return;
    this.saving.set(true);
    const subcategoryData = {
      category_id: this.selectedCategoryId(),
      name: this.form.get("name")?.value,
      description: this.form.get("description")?.value || ""
    };
    this.productService.createSubCategory(subcategoryData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Subcategor\xEDa creada exitosamente", type: "success" },
          duration: 3e3
        });
        this.isCreatingSubcategory.set(false);
        this.form.reset();
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId());
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al crear subcategor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  startEditingSubcategory(subcategory) {
    this.editingSubcategoryId.set(subcategory.id);
    this.editingSubcategoryForm[subcategory.id] = { name: subcategory.name, description: subcategory.description };
  }
  cancelEditingSubcategory() {
    this.editingSubcategoryId.set(null);
    this.editingSubcategoryForm = {};
  }
  saveEditSubcategory(subcategory) {
    if (!this.editingSubcategoryForm[subcategory.id]?.name)
      return;
    this.saving.set(true);
    const updateData = {
      name: this.editingSubcategoryForm[subcategory.id].name,
      description: this.editingSubcategoryForm[subcategory.id].description || ""
    };
    this.productService.updateSubCategory(subcategory.id, updateData).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Subcategor\xEDa actualizada exitosamente", type: "success" },
          duration: 3e3
        });
        this.editingSubcategoryId.set(null);
        this.editingSubcategoryForm = {};
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId());
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al actualizar subcategor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  deleteSubcategory(subcategory) {
    if (!confirm("\xBFEst\xE1s seguro de que deseas eliminar esta subcategor\xEDa?"))
      return;
    this.saving.set(true);
    this.productService.deleteSubCategory(subcategory.id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Subcategor\xEDa eliminada exitosamente", type: "success" },
          duration: 3e3
        });
        if (this.selectedCategoryId()) {
          this.loadSubcategories(this.selectedCategoryId());
        }
        this.saving.set(false);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al eliminar subcategor\xEDa", type: "error" },
          duration: 3e3
        });
        this.saving.set(false);
      }
    });
  }
  selectCategory(categoryId) {
    this.selectedCategoryId.set(categoryId);
    this.activeTab.set("subcategories");
    this.loadSubcategories(categoryId);
  }
  loadSubcategories(categoryId) {
    this.productService.getSubCategories(categoryId).subscribe({
      next: (res) => {
        this.subcategories.set(res.data);
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar subcategor\xEDas", type: "error" },
          duration: 3e3
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function CategoriesDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoriesDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoriesDialogComponent, selectors: [["app-categories-dialog"]], decls: 24, vars: 15, consts: [[1, "dialog"], [1, "dialog__header"], [1, "close", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "tabs"], [1, "tab", 3, "click"], [1, "tab", 3, "click", "disabled"], [1, "dialog__body"], [1, "tab-content"], ["class", "header-actions", 4, "ngIf"], ["class", "create-form", 3, "formGroup", 4, "ngIf"], ["class", "items-list", 4, "ngIf"], [1, "dialog__footer"], [1, "btn", "btn--secondary", 3, "click"], [1, "header-actions"], [1, "create-btn", 3, "click"], [1, "create-form", 3, "formGroup"], [1, "form-label"], ["type", "text", "formControlName", "name", "placeholder", "Nombre de la categor\xEDa", 1, "form-input"], ["formControlName", "description", "rows", "2", "placeholder", "Descripci\xF3n opcional", 1, "form-input"], [1, "form-actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [1, "btn", "btn--primary", 3, "click", "disabled"], [1, "items-list"], ["class", "empty-state", 4, "ngIf"], ["class", "item-card", 4, "ngFor", "ngForOf"], [1, "empty-state"], [1, "item-card"], ["class", "item-view", 4, "ngIf"], ["class", "item-edit", 4, "ngIf"], [1, "item-view"], [1, "item-info", 3, "click"], [1, "item-name"], [1, "item-description"], [1, "item-actions"], ["title", "Editar", 1, "icon-btn", 3, "click"], [1, "fi", "fi-rr-pencil"], ["title", "Eliminar", 1, "icon-btn", "icon-btn--danger", 3, "click", "disabled"], [1, "fi", "fi-rr-trash"], [1, "item-edit"], ["type", "text", 1, "form-input", "form-input--sm", 3, "ngModelChange", "ngModel"], ["rows", "2", 1, "form-input", "form-input--sm", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn--sm", "btn--secondary", 3, "click"], [1, "btn", "btn--sm", "btn--primary", 3, "click", "disabled"], ["type", "text", "formControlName", "name", "placeholder", "Nombre de la subcategor\xEDa", 1, "form-input"], [1, "item-info"]], template: function CategoriesDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Gestionar Categor\xEDas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function CategoriesDialogComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 3);
      \u0275\u0275element(6, "path", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(7, "div", 5)(8, "button", 6);
      \u0275\u0275listener("click", function CategoriesDialogComponent_Template_button_click_8_listener() {
        return ctx.activeTab.set("categories");
      });
      \u0275\u0275text(9, " Categor\xEDas ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 7);
      \u0275\u0275listener("click", function CategoriesDialogComponent_Template_button_click_10_listener() {
        return ctx.activeTab.set("subcategories");
      });
      \u0275\u0275text(11, " Subcategor\xEDas ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 8)(13, "div", 9);
      \u0275\u0275template(14, CategoriesDialogComponent_div_14_Template, 3, 0, "div", 10)(15, CategoriesDialogComponent_form_15_Template, 14, 3, "form", 11)(16, CategoriesDialogComponent_div_16_Template, 3, 2, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 9);
      \u0275\u0275template(18, CategoriesDialogComponent_div_18_Template, 3, 0, "div", 10)(19, CategoriesDialogComponent_form_19_Template, 14, 3, "form", 11)(20, CategoriesDialogComponent_div_20_Template, 3, 2, "div", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 13)(22, "button", 14);
      \u0275\u0275listener("click", function CategoriesDialogComponent_Template_button_click_22_listener() {
        return ctx.close();
      });
      \u0275\u0275text(23, " Cerrar ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275classProp("active", ctx.activeTab() === "categories");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.activeTab() === "subcategories");
      \u0275\u0275property("disabled", !ctx.selectedCategoryId());
      \u0275\u0275advance(3);
      \u0275\u0275classProp("active", ctx.activeTab() === "categories");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreating());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isCreating());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreating());
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.activeTab() === "subcategories");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreatingSubcategory());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isCreatingSubcategory());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isCreatingSubcategory());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormsModule, NgModel], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 600px;\n  height: 600px;\n  display: flex;\n  flex-direction: column;\n}\n.dialog__header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n  background: none;\n  border: none;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.dialog__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px;\n  min-height: 0;\n}\n.dialog__footer[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  padding: 0 20px;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.tab[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #6b7280;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #374151;\n}\n.tab.active[_ngcontent-%COMP%] {\n  color: #7c3aed;\n  border-bottom-color: #7c3aed;\n}\n.tab[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.tab-content[_ngcontent-%COMP%] {\n  display: none;\n}\n.tab-content.active[_ngcontent-%COMP%] {\n  display: block;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 16px;\n}\n.create-btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.create-btn[_ngcontent-%COMP%]:hover {\n  background: #4338ca;\n}\n.create-form[_ngcontent-%COMP%] {\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n  margin-bottom: 16px;\n}\n.create-form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.create-form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 0;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 6px;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  outline: none;\n  transition: border-color 0.2s;\n  font-family: inherit;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-input--sm[_ngcontent-%COMP%] {\n  padding: 6px 10px;\n  font-size: 12px;\n}\ntextarea.form-input[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 60px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-family: inherit;\n  flex: 1;\n}\n.btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  color: white;\n}\n.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #4338ca;\n}\n.btn--secondary[_ngcontent-%COMP%] {\n  background: #f3f4f6;\n  color: #374151;\n}\n.btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5e7eb;\n}\n.btn--sm[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.item-card[_ngcontent-%COMP%] {\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.15s;\n}\n.item-card[_ngcontent-%COMP%]:hover {\n  border-color: #d1d5db;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.item-card[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.item-view[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n.item-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  cursor: pointer;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0 0 4px 0;\n}\n.item-description[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n  margin: 0;\n}\n.item-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.icon-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  background: transparent;\n  color: #6b7280;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.icon-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n.icon-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #374151;\n}\n.icon-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.icon-btn--danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.item-edit[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.item-edit[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 0;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #9ca3af;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin: 0;\n}\n/*# sourceMappingURL=categories-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoriesDialogComponent, [{
    type: Component,
    args: [{ selector: "app-categories-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule], template: `<div class="dialog">\r
  <div class="dialog__header">\r
    <h2>Gestionar Categor\xEDas</h2>\r
    <button (click)="close()" class="close">\r
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <div class="tabs">\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'categories'"\r
      (click)="activeTab.set('categories')">\r
      Categor\xEDas\r
    </button>\r
    <button \r
      class="tab"\r
      [class.active]="activeTab() === 'subcategories'"\r
      (click)="activeTab.set('subcategories')"\r
      [disabled]="!selectedCategoryId()">\r
      Subcategor\xEDas\r
    </button>\r
  </div>\r
\r
  <div class="dialog__body">\r
    <!-- Categories Tab -->\r
    <div class="tab-content" [class.active]="activeTab() === 'categories'">\r
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
          <input type="text" formControlName="name" class="form-input" placeholder="Nombre de la categor\xEDa" />\r
        </div>\r
        <div>\r
          <label class="form-label">Descripci\xF3n</label>\r
          <textarea formControlName="description" class="form-input" rows="2" placeholder="Descripci\xF3n opcional"></textarea>\r
        </div>\r
        <div class="form-actions">\r
          <button (click)="cancelCreating()" type="button" class="btn btn--secondary">\r
            Cancelar\r
          </button>\r
          <button (click)="saveCategory()" [disabled]="form.invalid || saving()" class="btn btn--primary">\r
            {{ saving() ? 'Guardando...' : 'Guardar' }}\r
          </button>\r
        </div>\r
      </form>\r
\r
      <!-- Categories List -->\r
      <div *ngIf="!isCreating()" class="items-list">\r
        <div *ngIf="categories().length === 0" class="empty-state">\r
          <p>No hay categor\xEDas</p>\r
        </div>\r
\r
        <div *ngFor="let cat of categories()" class="item-card">\r
          <div *ngIf="editingCategoryId() !== cat.id" class="item-view">\r
            <div class="item-info" (click)="selectCategory(cat.id)">\r
              <p class="item-name">{{ cat.name }}</p>\r
              <p class="item-description">{{ cat.description }}</p>\r
            </div>\r
            <div class="item-actions">\r
              <button (click)="startEditingCategory(cat)" class="icon-btn" title="Editar">\r
                <i class="fi fi-rr-pencil"></i>\r
              </button>\r
              <button (click)="deleteCategory(cat)" [disabled]="saving()" class="icon-btn icon-btn--danger" title="Eliminar">\r
                <i class="fi fi-rr-trash"></i>\r
              </button>\r
            </div>\r
          </div>\r
\r
          <!-- Edit Mode -->\r
          <div *ngIf="editingCategoryId() === cat.id" class="item-edit">\r
            <div>\r
              <label class="form-label">Nombre</label>\r
              <input type="text" [(ngModel)]="editingCategoryForm[cat.id].name" class="form-input form-input--sm" />\r
            </div>\r
            <div>\r
              <label class="form-label">Descripci\xF3n</label>\r
              <textarea [(ngModel)]="editingCategoryForm[cat.id].description" class="form-input form-input--sm" rows="2"></textarea>\r
            </div>\r
            <div class="form-actions">\r
              <button (click)="cancelEditingCategory()" type="button" class="btn btn--sm btn--secondary">\r
                Cancelar\r
              </button>\r
              <button (click)="saveEditCategory(cat)" [disabled]="saving()" class="btn btn--sm btn--primary">\r
                {{ saving() ? 'Guardando...' : 'Guardar' }}\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Subcategories Tab -->\r
    <div class="tab-content" [class.active]="activeTab() === 'subcategories'">\r
      <!-- Create Button -->\r
      <div *ngIf="!isCreatingSubcategory()" class="header-actions">\r
        <button (click)="startCreatingSubcategory()" class="create-btn">\r
          + Crear Nueva\r
        </button>\r
      </div>\r
\r
      <!-- Create Form -->\r
      <form *ngIf="isCreatingSubcategory()" [formGroup]="form" class="create-form">\r
        <div>\r
          <label class="form-label">Nombre</label>\r
          <input type="text" formControlName="name" class="form-input" placeholder="Nombre de la subcategor\xEDa" />\r
        </div>\r
        <div>\r
          <label class="form-label">Descripci\xF3n</label>\r
          <textarea formControlName="description" class="form-input" rows="2" placeholder="Descripci\xF3n opcional"></textarea>\r
        </div>\r
        <div class="form-actions">\r
          <button (click)="cancelCreatingSubcategory()" type="button" class="btn btn--secondary">\r
            Cancelar\r
          </button>\r
          <button (click)="saveSubcategory()" [disabled]="form.invalid || saving()" class="btn btn--primary">\r
            {{ saving() ? 'Guardando...' : 'Guardar' }}\r
          </button>\r
        </div>\r
      </form>\r
\r
      <!-- Subcategories List -->\r
      <div *ngIf="!isCreatingSubcategory()" class="items-list">\r
        <div *ngIf="subcategories().length === 0" class="empty-state">\r
          <p>No hay subcategor\xEDas</p>\r
        </div>\r
\r
        <div *ngFor="let subcat of subcategories()" class="item-card">\r
          <div *ngIf="editingSubcategoryId() !== subcat.id" class="item-view">\r
            <div class="item-info">\r
              <p class="item-name">{{ subcat.name }}</p>\r
              <p class="item-description">{{ subcat.description }}</p>\r
            </div>\r
            <div class="item-actions">\r
              <button (click)="startEditingSubcategory(subcat)" class="icon-btn" title="Editar">\r
                <i class="fi fi-rr-pencil"></i>\r
              </button>\r
              <button (click)="deleteSubcategory(subcat)" [disabled]="saving()" class="icon-btn icon-btn--danger" title="Eliminar">\r
                <i class="fi fi-rr-trash"></i>\r
              </button>\r
            </div>\r
          </div>\r
\r
          <!-- Edit Mode -->\r
          <div *ngIf="editingSubcategoryId() === subcat.id" class="item-edit">\r
            <div>\r
              <label class="form-label">Nombre</label>\r
              <input type="text" [(ngModel)]="editingSubcategoryForm[subcat.id].name" class="form-input form-input--sm" />\r
            </div>\r
            <div>\r
              <label class="form-label">Descripci\xF3n</label>\r
              <textarea [(ngModel)]="editingSubcategoryForm[subcat.id].description" class="form-input form-input--sm" rows="2"></textarea>\r
            </div>\r
            <div class="form-actions">\r
              <button (click)="cancelEditingSubcategory()" type="button" class="btn btn--sm btn--secondary">\r
                Cancelar\r
              </button>\r
              <button (click)="saveEditSubcategory(subcat)" [disabled]="saving()" class="btn btn--sm btn--primary">\r
                {{ saving() ? 'Guardando...' : 'Guardar' }}\r
              </button>\r
            </div>\r
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
`, styles: ["/* src/app/features/settings/components/categories-dialog/categories-dialog.component.scss */\n.dialog {\n  width: 600px;\n  height: 600px;\n  display: flex;\n  flex-direction: column;\n}\n.dialog__header {\n  padding: 16px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-shrink: 0;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog__header h2 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header .close {\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n  background: none;\n  border: none;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n}\n.dialog__header .close:hover {\n  background: #f3f4f6;\n  color: #374151;\n}\n.dialog__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 16px 20px;\n  min-height: 0;\n}\n.dialog__footer {\n  padding: 12px 20px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.tabs {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  padding: 0 20px;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.tab {\n  padding: 10px 20px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #6b7280;\n  background: none;\n  border: none;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -2px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.tab:hover:not(:disabled) {\n  color: #374151;\n}\n.tab.active {\n  color: #7c3aed;\n  border-bottom-color: #7c3aed;\n}\n.tab:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.tab-content {\n  display: none;\n}\n.tab-content.active {\n  display: block;\n}\n.header-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-bottom: 16px;\n}\n.create-btn {\n  padding: 8px 16px;\n  background: #4f46e5;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.create-btn:hover {\n  background: #4338ca;\n}\n.create-form {\n  padding: 16px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  background: #f9fafb;\n  margin-bottom: 16px;\n}\n.create-form > div {\n  margin-bottom: 12px;\n}\n.create-form > div:last-of-type {\n  margin-bottom: 0;\n}\n.form-label {\n  display: block;\n  font-size: 11px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 6px;\n}\n.form-input {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1.5px solid #e5e7eb;\n  border-radius: 6px;\n  font-size: 13px;\n  outline: none;\n  transition: border-color 0.2s;\n  font-family: inherit;\n}\n.form-input:focus {\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.form-input--sm {\n  padding: 6px 10px;\n  font-size: 12px;\n}\ntextarea.form-input {\n  resize: vertical;\n  min-height: 60px;\n}\n.form-actions {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  font-size: 13px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s;\n  font-family: inherit;\n  flex: 1;\n}\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn--primary {\n  background: #4f46e5;\n  color: white;\n}\n.btn--primary:hover:not(:disabled) {\n  background: #4338ca;\n}\n.btn--secondary {\n  background: #f3f4f6;\n  color: #374151;\n}\n.btn--secondary:hover:not(:disabled) {\n  background: #e5e7eb;\n}\n.btn--sm {\n  padding: 6px 12px;\n  font-size: 12px;\n}\n.item-card {\n  padding: 12px;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  transition: all 0.15s;\n}\n.item-card:hover {\n  border-color: #d1d5db;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n.item-card:last-child {\n  margin-bottom: 0;\n}\n.item-view {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n.item-info {\n  flex: 1;\n  min-width: 0;\n  cursor: pointer;\n}\n.item-name {\n  font-size: 14px;\n  font-weight: 600;\n  color: #111827;\n  margin: 0 0 4px 0;\n}\n.item-description {\n  font-size: 12px;\n  color: #6b7280;\n  margin: 0;\n}\n.item-actions {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.icon-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  background: transparent;\n  color: #6b7280;\n  transition: all 0.15s;\n  font-size: 14px;\n}\n.icon-btn i {\n  line-height: 1;\n}\n.icon-btn:hover:not(:disabled) {\n  background: #f3f4f6;\n  color: #374151;\n}\n.icon-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.icon-btn--danger:hover:not(:disabled) {\n  background: #fee2e2;\n  color: #dc2626;\n}\n.item-edit > div {\n  margin-bottom: 10px;\n}\n.item-edit > div:last-of-type {\n  margin-bottom: 0;\n}\n.empty-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: #9ca3af;\n}\n.empty-state p {\n  font-size: 14px;\n  margin: 0;\n}\n/*# sourceMappingURL=categories-dialog.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: ProductService }, { type: MatSnackBar }, { type: MatDialogRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoriesDialogComponent, { className: "CategoriesDialogComponent", filePath: "src/app/features/settings/components/categories-dialog/categories-dialog.component.ts", lineNumber: 16 });
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
  snackBar;
  cdr;
  priceLists = [];
  loading = false;
  originalData = {};
  constructor(productService, dialogRef, snackBar, cdr) {
    this.productService = productService;
    this.dialogRef = dialogRef;
    this.snackBar = snackBar;
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
    this.snackBar.open(message, "Cerrar", {
      duration: 3e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: [`snackbar-${type}`]
    });
  }
  static \u0275fac = function PriceListsDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PriceListsDialogComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(ChangeDetectorRef));
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
  }], () => [{ type: ProductService }, { type: MatDialogRef }, { type: MatSnackBar }, { type: ChangeDetectorRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PriceListsDialogComponent, { className: "PriceListsDialogComponent", filePath: "src/app/features/settings/components/price-lists-dialog/price-lists-dialog.ts", lineNumber: 16 });
})();

// src/app/features/settings/components/product-list/product-list.component.ts
var _c04 = ["tableTemplate"];
function ProductListComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "span", 13);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r2.sku, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((item_r2.category == null ? null : item_r2.category.name) || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((item_r2.subcategory == null ? null : item_r2.subcategory.name) || "\u2014");
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
      { name: "SKU", prop: "sku", sortable: true, canAutoResize: true, width: 110 },
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true, width: 180 },
      { name: "Categor\xEDa", prop: "category", sortable: false, canAutoResize: true, width: 130 },
      { name: "Subcategor\xEDa", prop: "subcategory", sortable: false, canAutoResize: true, width: 130 }
    ],
    externalPaging: false,
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
  constructor(router, route, productService, dialog, snackBar) {
    this.router = router;
    this.route = route;
    this.productService = productService;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.loadProducts();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadProducts() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const params = {};
    if (this.search && this.search.trim()) {
      params.search = this.search;
    }
    this.productService.getProducts(params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
          rows: res.data,
          totalResults: res.total,
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
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.loadProducts();
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
  }, decls: 14, vars: 3, consts: [["tableTemplate", ""], [1, "px-2", "py-2"], [1, "flex", "items-start", "justify-between", "mb-3"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-col", "items-end", "gap-3"], [1, "w-64", 3, "searchChange", "param_activate"], [1, "flex", "items-center", "gap-3"], ["text", "Categor\xEDas", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Unidades", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Listas de Precios", "size", "sm", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Nuevo Producto", "size", "sm", "custom_class", "btn_primary", 3, "clicked"], [3, "sortChange", "rowClick", "config", "rowTemplate"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "whitespace-nowrap"], [1, "text-gray-700", "text-sm"]], template: function ProductListComponent_Template(rf, ctx) {
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
      \u0275\u0275listener("sortChange", function ProductListComponent_Template_app_datatable_wrapper_sortChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function ProductListComponent_Template_app_datatable_wrapper_rowClick_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.viewDetail($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(12, ProductListComponent_ng_template_12_Template, 11, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
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
  ], styles: ["\n\n/*# sourceMappingURL=product-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductListComponent, [{
    type: Component,
    args: [{ selector: "app-product-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent
    ], template: `<div class="px-2 py-2">\r
  <div class="flex items-start justify-between mb-3">\r
    <h2 class="text-2xl font-semibold text-gray-800">Productos</h2>\r
    \r
    <div class="flex flex-col items-end gap-3">\r
      <app-search\r
        class="w-64"\r
        [param_activate]="false"\r
        (searchChange)="onSearchChange($event)">\r
      </app-search>\r
\r
      <div class="flex items-center gap-3">\r
        <app-button\r
          text="Categor\xEDas"\r
          size="sm"\r
          custom_class="btn_secondary"\r
          (clicked)="openCategoriesDialog()">\r
        </app-button>\r
\r
        <app-button\r
          text="Unidades"\r
          size="sm"\r
          custom_class="btn_secondary"\r
          (clicked)="openUOMsDialog()">\r
        </app-button>\r
\r
        <app-button\r
          text="Listas de Precios"\r
          size="sm"\r
          custom_class="btn_secondary"\r
          (clicked)="openPriceListsDialog()">\r
        </app-button>\r
\r
        <app-button\r
          text="Nuevo Producto"\r
          size="sm"\r
          custom_class="btn_primary"\r
          (clicked)="openCreateProductModal()">\r
        </app-button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate"\r
    (sortChange)="onSortChange($event)"\r
    (rowClick)="viewDetail($event)">\r
  </app-datatable-wrapper>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">\r
      {{ item.sku }}\r
    </span>\r
  </td>\r
  <td>{{ item.name }}</td>\r
  <td>\r
    <span class="text-gray-700 text-sm">{{ item.category?.name || '\u2014' }}</span>\r
  </td>\r
  <td>\r
    <span class="text-gray-700 text-sm">{{ item.subcategory?.name || '\u2014' }}</span>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/settings/components/product-list/product-list.component.scss */\n/*# sourceMappingURL=product-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: ProductService }, { type: MatDialog }, { type: MatSnackBar }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src/app/features/settings/components/product-list/product-list.component.ts", lineNumber: 33 });
})();

// src/app/features/settings/services/pos-equipment.service.ts
var PosEquipmentService = class _PosEquipmentService {
  http;
  baseUrl = `${environment.api}/tenant/pos-configurations`;
  constructor(http) {
    this.http = http;
  }
  getPosConfigurations(params) {
    return this.http.get(this.baseUrl, {
      params
    });
  }
  getPosConfiguration(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createPosConfiguration(data) {
    return this.http.post(this.baseUrl, data);
  }
  updatePosConfiguration(id, data) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deletePosConfiguration(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  /** @deprecated use getPosConfigurations */
  getPosEquipments(params) {
    return this.getPosConfigurations(params);
  }
  /** @deprecated use getPosConfiguration */
  getPosEquipment(id) {
    return this.getPosConfiguration(id);
  }
  /** @deprecated use createPosConfiguration */
  createPosEquipment(data) {
    return this.createPosConfiguration(data);
  }
  /** @deprecated use updatePosConfiguration */
  updatePosEquipment(id, data) {
    return this.updatePosConfiguration(id, data);
  }
  /** @deprecated use deletePosConfiguration */
  deletePosEquipment(id) {
    return this.deletePosConfiguration(id);
  }
  static \u0275fac = function PosEquipmentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosEquipmentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PosEquipmentService, factory: _PosEquipmentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosEquipmentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/settings/components/pos-equipment-detail-modal/pos-equipment-detail-modal.component.ts
function PosEquipmentDetailModalComponent_p_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, " El c\xF3digo es requerido ");
    \u0275\u0275elementEnd();
  }
}
function PosEquipmentDetailModalComponent_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, " El modelo es requerido ");
    \u0275\u0275elementEnd();
  }
}
function PosEquipmentDetailModalComponent_p_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1, " La sucursal es requerida ");
    \u0275\u0275elementEnd();
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
  branchSelectConfig;
  statusSelectConfig;
  constructor(fb, posEquipmentService, branchService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.posEquipmentService = posEquipmentService;
    this.branchService = branchService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.form = this.fb.group({
      code: ["", [Validators.required, Validators.minLength(2)]],
      sucursal: ["", Validators.required],
      modelo: ["", [Validators.required, Validators.minLength(1)]],
      status: [1, Validators.required]
    });
    this.branchSelectConfig = this.buildBranchSelectConfig([]);
    this.statusSelectConfig = this.buildStatusSelectConfig();
  }
  ngOnInit() {
    this.isEditMode = !!this.data.configuration;
    this.loadBranches();
  }
  buildBranchSelectConfig(branches) {
    return {
      placeholder: "Selecciona una sucursal",
      data: branches,
      value: "id",
      option: "display_name",
      form_control: this.form.get("sucursal"),
      name_select: "sucursal"
    };
  }
  buildStatusSelectConfig() {
    return {
      placeholder: "Selecciona un estado",
      data: this.statusOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("status"),
      name_select: "status"
    };
  }
  loadBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        this.branchSelectConfig = this.buildBranchSelectConfig(branches);
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
    this.form.patchValue({
      code: configuration.code,
      sucursal: configuration.sucursal,
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
    this.isLoading = true;
    const v = this.form.value;
    const dto = {
      code: v.code,
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosEquipmentDetailModalComponent, selectors: [["app-pos-equipment-detail-modal"]], decls: 34, vars: 9, consts: [[1, "p-4"], [1, "text-lg", "font-semibold", "text-gray-900", "mb-4"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "text-red-500"], ["type", "text", "formControlName", "code", "placeholder", "Ej: Computadora 1", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", "outline-none", "transition"], ["class", "text-red-500 text-xs mt-1", 4, "ngIf"], ["type", "text", "formControlName", "modelo", "placeholder", "Ej: Dell OptiPlex 7090", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-indigo-500", "focus:border-transparent", "outline-none", "transition"], ["formControlName", "sucursal", 3, "config"], ["formControlName", "status", 3, "config"], [1, "flex", "gap-2", "justify-end", "pt-3", "border-t", "border-gray-200"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "disabled"], [1, "text-red-500", "text-xs", "mt-1"]], template: function PosEquipmentDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 2);
      \u0275\u0275listener("ngSubmit", function PosEquipmentDetailModalComponent_Template_form_ngSubmit_3_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(4, "div")(5, "label", 3);
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
      \u0275\u0275text(20, " Sucursal ");
      \u0275\u0275elementStart(21, "span", 4);
      \u0275\u0275text(22, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(23, "app-select", 8);
      \u0275\u0275template(24, PosEquipmentDetailModalComponent_p_24_Template, 2, 0, "p", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div")(26, "label", 3);
      \u0275\u0275text(27, " Estado ");
      \u0275\u0275elementStart(28, "span", 4);
      \u0275\u0275text(29, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(30, "app-select", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 10)(32, "app-button", 11);
      \u0275\u0275listener("clicked", function PosEquipmentDetailModalComponent_Template_app_button_clicked_32_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "app-button", 12);
      \u0275\u0275listener("clicked", function PosEquipmentDetailModalComponent_Template_app_button_clicked_33_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_5_0;
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Editar Equipo" : "Nuevo Equipo", " ");
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.form.get("code")) == null ? null : tmp_2_0.hasError("required")) && ((tmp_2_0 = ctx.form.get("code")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("modelo")) == null ? null : tmp_3_0.hasError("required")) && ((tmp_3_0 = ctx.form.get("modelo")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275property("config", ctx.branchSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.form.get("sucursal")) == null ? null : tmp_5_0.hasError("required")) && ((tmp_5_0 = ctx.form.get("sucursal")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(6);
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isEditMode ? "Actualizar" : "Crear")("disabled", ctx.form.invalid || ctx.isLoading);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    ButtonComponent,
    SelectComponent,
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
      SelectComponent,
      LucideAngularModule
    ], template: `<div class="p-4">\r
  <h2 class="text-lg font-semibold text-gray-900 mb-4">\r
    {{ isEditMode ? 'Editar Equipo' : 'Nuevo Equipo' }}\r
  </h2>\r
\r
  <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">\r
    <div>\r
      <label class="block text-sm font-medium text-gray-700 mb-1">\r
        Nombre del Equipo (c\xF3digo)\r
        <span class="text-red-500">*</span>\r
      </label>\r
      <input\r
        type="text"\r
        formControlName="code"\r
        placeholder="Ej: Computadora 1"\r
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"\r
      />\r
      <p *ngIf="form.get('code')?.hasError('required') && form.get('code')?.touched" class="text-red-500 text-xs mt-1">\r
        El c\xF3digo es requerido\r
      </p>\r
    </div>\r
\r
    <div>\r
      <label class="block text-sm font-medium text-gray-700 mb-1">\r
        Modelo\r
        <span class="text-red-500">*</span>\r
      </label>\r
      <input\r
        type="text"\r
        formControlName="modelo"\r
        placeholder="Ej: Dell OptiPlex 7090"\r
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"\r
      />\r
      <p *ngIf="form.get('modelo')?.hasError('required') && form.get('modelo')?.touched" class="text-red-500 text-xs mt-1">\r
        El modelo es requerido\r
      </p>\r
    </div>\r
\r
    <div>\r
      <label class="block text-sm font-medium text-gray-700 mb-1">\r
        Sucursal\r
        <span class="text-red-500">*</span>\r
      </label>\r
      <app-select\r
        formControlName="sucursal"\r
        [config]="branchSelectConfig">\r
      </app-select>\r
      <p *ngIf="form.get('sucursal')?.hasError('required') && form.get('sucursal')?.touched" class="text-red-500 text-xs mt-1">\r
        La sucursal es requerida\r
      </p>\r
    </div>\r
\r
    <div>\r
      <label class="block text-sm font-medium text-gray-700 mb-1">\r
        Estado\r
        <span class="text-red-500">*</span>\r
      </label>\r
      <app-select\r
        formControlName="status"\r
        [config]="statusSelectConfig">\r
      </app-select>\r
    </div>\r
\r
    <div class="flex gap-2 justify-end pt-3 border-t border-gray-200">\r
      <app-button\r
        text="Cancelar"\r
        custom_class="btn_secondary"\r
        (clicked)="onCancel()">\r
      </app-button>\r
      <app-button\r
        [text]="isEditMode ? 'Actualizar' : 'Crear'"\r
        custom_class="btn_primary"\r
        [disabled]="form.invalid || isLoading"\r
        (clicked)="onSubmit()">\r
      </app-button>\r
    </div>\r
  </form>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/pos-equipment-detail-modal/pos-equipment-detail-modal.component.scss */\n/*# sourceMappingURL=pos-equipment-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: PosEquipmentService }, { type: BranchService }, { type: MatSnackBar }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosEquipmentDetailModalComponent, { className: "PosEquipmentDetailModalComponent", filePath: "src/app/features/settings/components/pos-equipment-detail-modal/pos-equipment-detail-modal.component.ts", lineNumber: 39 });
})();

// src/app/features/settings/components/pos-equipment-list/pos-equipment-list.component.ts
var _c05 = ["equiposTableTemplate"];
var _c1 = ["sessionsTableTemplate"];
var _forTrack05 = ($index, $item) => $item.id;
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
    \u0275\u0275elementStart(0, "div", 14)(1, "app-button", 21);
    \u0275\u0275listener("clicked", function PosEquipmentListComponent_Conditional_16_Template_app_button_clicked_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openCreateEquipmentModal());
    });
    \u0275\u0275elementEnd()();
  }
}
function PosEquipmentListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-datatable-wrapper", 22);
    \u0275\u0275listener("rowClick", function PosEquipmentListComponent_Conditional_24_Template_app_datatable_wrapper_rowClick_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewDetail($event.data));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    const equiposTableTemplate_r8 = \u0275\u0275reference(27);
    \u0275\u0275property("config", ctx_r2.table_config())("rowTemplate", equiposTableTemplate_r8);
  }
}
function PosEquipmentListComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-datatable-wrapper", 18);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    const sessionsTableTemplate_r9 = \u0275\u0275reference(29);
    \u0275\u0275property("config", ctx_r2.sessions_table_config())("rowTemplate", sessionsTableTemplate_r9);
  }
}
function PosEquipmentListComponent_ng_template_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r10.code, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r10.modelo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.branchLabel(item_r10));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium " + ctx_r2.getStatusClass(item_r10.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r10.status), " ");
  }
}
function PosEquipmentListComponent_ng_template_28_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, item_r11["opened_at"], "short"), " ");
  }
}
function PosEquipmentListComponent_ng_template_28_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function PosEquipmentListComponent_ng_template_28_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, item_r11["closed_at"], "short"), " ");
  }
}
function PosEquipmentListComponent_ng_template_28_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
  }
}
function PosEquipmentListComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td")(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275conditionalCreate(6, PosEquipmentListComponent_ng_template_28_Conditional_6_Template, 2, 4)(7, PosEquipmentListComponent_ng_template_28_Conditional_7_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275conditionalCreate(9, PosEquipmentListComponent_ng_template_28_Conditional_9_Template, 2, 4)(10, PosEquipmentListComponent_ng_template_28_Conditional_10_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "span");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.shiftIdShort(item_r11), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.sessionBranchLabel(item_r11));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r11["opened_at"] ? 6 : 7);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(item_r11["closed_at"] ? 9 : 10);
    \u0275\u0275advance(3);
    \u0275\u0275classMap("inline-flex items-center px-2 py-1 rounded-full text-xs font-medium " + ctx_r2.shiftStatusClass(item_r11));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.shiftStatusLabel(item_r11), " ");
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
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  branchesLoaded = false;
  table_config = signal({
    rows: [],
    columns: [
      { name: "C\xF3digo", prop: "code", sortable: true, canAutoResize: true, width: 160 },
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
      { name: "Turno", prop: "id", sortable: false, canAutoResize: true, width: 120 },
      { name: "Sucursal", prop: "branch", sortable: false, canAutoResize: true, width: 180 },
      { name: "Apertura", prop: "opened_at", sortable: false, canAutoResize: true, width: 150 },
      { name: "Cierre", prop: "closed_at", sortable: false, canAutoResize: true, width: 150 },
      { name: "Estado", prop: "status", sortable: false, canAutoResize: true, width: 100 }
    ],
    externalPaging: false,
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
  /** Recarga la pestaña activa con buscar + sucursal actuales. */
  applyFilters() {
    if (this.activeTabIndex() === 0) {
      this.loadPosConfigurations();
    } else {
      this.loadSessions();
    }
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
    const b = row["branch"] ?? row["sucursal_detail"];
    if (b && typeof b === "object") {
      const o = b;
      const name = o["display_name"] ?? o["name"];
      if (name) {
        return name;
      }
      if (typeof o["code"] === "string") {
        return o["code"];
      }
    }
    if (typeof row["warehouse_name"] === "string") {
      return row["warehouse_name"];
    }
    if (typeof row["sucursal_name"] === "string") {
      return row["sucursal_name"];
    }
    return "\u2014";
  }
  shiftIdShort(row) {
    const id = row["id"];
    if (typeof id === "string" && id.length > 10) {
      return id.slice(0, 8) + "\u2026";
    }
    return typeof id === "string" ? id : "\u2014";
  }
  shiftIsOpen(row) {
    const closed = row["closed_at"];
    return closed == null || closed === "";
  }
  shiftStatusClass(row) {
    return this.shiftIsOpen(row) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700";
  }
  shiftStatusLabel(row) {
    return this.shiftIsOpen(row) ? "Abierta" : "Cerrada";
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
    return status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
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
  }, decls: 30, vars: 25, consts: [["equiposTableTemplate", ""], ["sessionsTableTemplate", ""], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "mb-4"], ["role", "search", "aria-label", "Filtros configuraci\xF3n POS", 1, "filter-bar"], [1, "filter-bar__container"], [1, "filter-bar__field"], ["type", "text", "placeholder", "Buscar...", "aria-label", "Buscar equipos", 1, "filter-bar__input", 3, "ngModel"], ["type", "text", "placeholder", "Buscar...", "aria-label", "Buscar sesiones", 1, "filter-bar__input", 3, "ngModel"], ["aria-label", "Filtrar por sucursal", 1, "filter-bar__select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], [1, "filter-bar__field", "filter-bar__field--action"], [1, "border-b", "border-gray-200"], ["aria-label", "Secciones configuraci\xF3n POS", 1, "-mb-px", "flex", "space-x-8"], ["type", "button", 1, "border-b-2", "py-4", "px-1", "text-sm", "font-medium", "transition-colors", 3, "click"], [3, "config", "rowTemplate"], ["type", "text", "placeholder", "Buscar...", "aria-label", "Buscar equipos", 1, "filter-bar__input", 3, "ngModelChange", "keyup.enter", "ngModel"], ["type", "text", "placeholder", "Buscar...", "aria-label", "Buscar sesiones", 1, "filter-bar__input", 3, "ngModelChange", "keyup.enter", "ngModel"], ["text", "Nuevo Equipo", "custom_class", "btn_primary", 3, "clicked"], [3, "rowClick", "config", "rowTemplate"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "whitespace-nowrap"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-slate-100", "text-slate-800", "whitespace-nowrap", "font-mono"]], template: function PosEquipmentListComponent_Template(rf, ctx) {
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
      \u0275\u0275repeaterCreate(14, PosEquipmentListComponent_For_15_Template, 2, 2, "option", 13, _forTrack05);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(16, PosEquipmentListComponent_Conditional_16_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 5)(18, "div", 15)(19, "nav", 16)(20, "button", 17);
      \u0275\u0275listener("click", function PosEquipmentListComponent_Template_button_click_20_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTabChange(0));
      });
      \u0275\u0275text(21, " Equipos ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 17);
      \u0275\u0275listener("click", function PosEquipmentListComponent_Template_button_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTabChange(1));
      });
      \u0275\u0275text(23, " Sesiones ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(24, PosEquipmentListComponent_Conditional_24_Template, 1, 2, "app-datatable-wrapper", 18);
      \u0275\u0275conditionalCreate(25, PosEquipmentListComponent_Conditional_25_Template, 1, 2, "app-datatable-wrapper", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275template(26, PosEquipmentListComponent_ng_template_26_Template, 10, 6, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(28, PosEquipmentListComponent_ng_template_28_Template, 14, 7, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
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
      \u0275\u0275advance(4);
      \u0275\u0275classProp("border-blue-500", ctx.activeTabIndex() === 0)("text-blue-600", ctx.activeTabIndex() === 0)("border-transparent", ctx.activeTabIndex() !== 0)("text-gray-500", ctx.activeTabIndex() !== 0);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("border-blue-500", ctx.activeTabIndex() === 1)("text-blue-600", ctx.activeTabIndex() === 1)("border-transparent", ctx.activeTabIndex() !== 1)("text-gray-500", ctx.activeTabIndex() !== 1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTabIndex() === 0 ? 24 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTabIndex() === 1 ? 25 : -1);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    DatatableWrapperComponent,
    ButtonComponent,
    DatePipe
  ], styles: [`

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
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
}
.filter-bar__container--sesiones[_ngcontent-%COMP%] {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.filter-bar__field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}
.filter-bar__field--action[_ngcontent-%COMP%] {
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
/*# sourceMappingURL=pos-equipment-list.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosEquipmentListComponent, [{
    type: Component,
    args: [{ selector: "app-pos-equipment-list", standalone: true, imports: [
      CommonModule,
      FormsModule,
      DatatableWrapperComponent,
      ButtonComponent
    ], template: `<div class="px-4">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <h2 class="text-2xl font-semibold text-gray-800">Configuraci\xF3n POS</h2>\r
  </div>\r
\r
  <!-- Filtros compartidos (misma sucursal en Equipos y Sesiones) -->\r
  <div class="mb-4">\r
    <div class="filter-bar" role="search" aria-label="Filtros configuraci\xF3n POS">\r
      <div\r
        class="filter-bar__container"\r
        [class.filter-bar__container--equipos]="activeTabIndex() === 0"\r
        [class.filter-bar__container--sesiones]="activeTabIndex() === 1">\r
        <div class="filter-bar__field">\r
          @if (activeTabIndex() === 0) {\r
            <input\r
              type="text"\r
              [(ngModel)]="search"\r
              (keyup.enter)="applyFilters()"\r
              placeholder="Buscar..."\r
              class="filter-bar__input"\r
              aria-label="Buscar equipos"\r
            />\r
          } @else {\r
            <input\r
              type="text"\r
              [(ngModel)]="sessionsSearch"\r
              (keyup.enter)="applyFilters()"\r
              placeholder="Buscar..."\r
              class="filter-bar__input"\r
              aria-label="Buscar sesiones"\r
            />\r
          }\r
        </div>\r
        <div class="filter-bar__field">\r
          <select\r
            [(ngModel)]="selectedSucursalId"\r
            (change)="applyFilters()"\r
            class="filter-bar__select"\r
            aria-label="Filtrar por sucursal">\r
            <option value="">Todas las sucursales</option>\r
            @for (b of branches(); track b.id) {\r
              <option [value]="b.id">{{ b.display_name }}</option>\r
            }\r
          </select>\r
        </div>\r
        @if (activeTabIndex() === 0) {\r
          <div class="filter-bar__field filter-bar__field--action">\r
            <app-button\r
              text="Nuevo Equipo"\r
              custom_class="btn_primary"\r
              (clicked)="openCreateEquipmentModal()">\r
            </app-button>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Pesta\xF1as (estilo inventario) -->\r
  <div class="mb-4">\r
    <div class="border-b border-gray-200">\r
      <nav class="-mb-px flex space-x-8" aria-label="Secciones configuraci\xF3n POS">\r
        <button\r
          type="button"\r
          class="border-b-2 py-4 px-1 text-sm font-medium transition-colors"\r
          [class.border-blue-500]="activeTabIndex() === 0"\r
          [class.text-blue-600]="activeTabIndex() === 0"\r
          [class.border-transparent]="activeTabIndex() !== 0"\r
          [class.text-gray-500]="activeTabIndex() !== 0"\r
          (click)="onTabChange(0)">\r
          Equipos\r
        </button>\r
        <button\r
          type="button"\r
          class="border-b-2 py-4 px-1 text-sm font-medium transition-colors"\r
          [class.border-blue-500]="activeTabIndex() === 1"\r
          [class.text-blue-600]="activeTabIndex() === 1"\r
          [class.border-transparent]="activeTabIndex() !== 1"\r
          [class.text-gray-500]="activeTabIndex() !== 1"\r
          (click)="onTabChange(1)">\r
          Sesiones\r
        </button>\r
      </nav>\r
    </div>\r
  </div>\r
\r
  @if (activeTabIndex() === 0) {\r
    <app-datatable-wrapper\r
      [config]="table_config()"\r
      [rowTemplate]="equiposTableTemplate"\r
      (rowClick)="viewDetail($event.data)">\r
    </app-datatable-wrapper>\r
  }\r
\r
  @if (activeTabIndex() === 1) {\r
    <app-datatable-wrapper\r
      [config]="sessions_table_config()"\r
      [rowTemplate]="sessionsTableTemplate">\r
    </app-datatable-wrapper>\r
  }\r
</div>\r
\r
<ng-template #equiposTableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap">\r
      {{ item.code }}\r
    </span>\r
  </td>\r
  <td>{{ item.modelo }}</td>\r
  <td>{{ branchLabel(item) }}</td>\r
  <td>\r
    <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + getStatusClass(item.status)">\r
      {{ getStatusLabel(item.status) }}\r
    </span>\r
  </td>\r
</ng-template>\r
\r
<ng-template #sessionsTableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800 whitespace-nowrap font-mono">\r
      {{ shiftIdShort(item) }}\r
    </span>\r
  </td>\r
  <td>{{ sessionBranchLabel(item) }}</td>\r
  <td>\r
    @if (item['opened_at']) {\r
      {{ item['opened_at'] | date: 'short' }}\r
    } @else {\r
      \u2014\r
    }\r
  </td>\r
  <td>\r
    @if (item['closed_at']) {\r
      {{ item['closed_at'] | date: 'short' }}\r
    } @else {\r
      \u2014\r
    }\r
  </td>\r
  <td>\r
    <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + shiftStatusClass(item)">\r
      {{ shiftStatusLabel(item) }}\r
    </span>\r
  </td>\r
</ng-template>\r
`, styles: [`/* src/app/features/settings/components/pos-equipment-list/pos-equipment-list.component.scss */
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
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
}
.filter-bar__container--sesiones {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.filter-bar__field {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}
.filter-bar__field--action {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosEquipmentListComponent, { className: "PosEquipmentListComponent", filePath: "src/app/features/settings/components/pos-equipment-list/pos-equipment-list.component.ts", lineNumber: 32 });
})();

// src/app/features/settings/services/email-template.service.ts
var EmailTemplateService = class _EmailTemplateService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getEmailTemplates(params) {
    return this.http.get(`${this.api}/tenant/email-templates`, { params });
  }
  getEmailTemplate(id) {
    return this.http.get(`${this.api}/tenant/email-templates/${id}`);
  }
  createEmailTemplate(data) {
    return this.http.post(`${this.api}/tenant/email-templates`, data);
  }
  updateEmailTemplate(id, data) {
    return this.http.put(`${this.api}/tenant/email-templates/${id}`, data);
  }
  deleteEmailTemplate(id) {
    return this.http.delete(`${this.api}/tenant/email-templates/${id}`);
  }
  static \u0275fac = function EmailTemplateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailTemplateService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmailTemplateService, factory: _EmailTemplateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailTemplateService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/settings/components/email-template-create-modal/email-template-create-modal.component.ts
function EmailTemplateCreateModalComponent_div_13_p_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, " El nombre es requerido (m\xEDnimo 3 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function EmailTemplateCreateModalComponent_div_13_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, " El asunto es requerido (m\xEDnimo 5 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function EmailTemplateCreateModalComponent_div_13_p_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, " El cuerpo es requerido (m\xEDnimo 10 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
function EmailTemplateCreateModalComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "form", 12)(2, "div")(3, "label", 13);
    \u0275\u0275text(4, "Nombre del Template");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 14);
    \u0275\u0275template(6, EmailTemplateCreateModalComponent_div_13_p_6_Template, 2, 0, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "label", 13);
    \u0275\u0275text(9, "Asunto del Correo");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 16);
    \u0275\u0275template(11, EmailTemplateCreateModalComponent_div_13_p_11_Template, 2, 0, "p", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "label", 13);
    \u0275\u0275text(14, "Descripci\xF3n (Opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div")(17, "label", 13);
    \u0275\u0275text(18, "Cuerpo del Correo (HTML)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "textarea", 18);
    \u0275\u0275template(20, EmailTemplateCreateModalComponent_div_13_p_20_Template, 2, 0, "p", 15);
    \u0275\u0275elementStart(21, "p", 19);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div")(24, "label", 13);
    \u0275\u0275text(25, "Variables Disponibles (Opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 20);
    \u0275\u0275elementStart(27, "p", 21);
    \u0275\u0275text(28, "Separa las variables con comas. Estas son referencias para el usuario.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 22);
    \u0275\u0275element(30, "input", 23);
    \u0275\u0275elementStart(31, "label", 24);
    \u0275\u0275text(32, " Template activo ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_8_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r0.form);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-500", ((tmp_2_0 = ctx_r0.form.get("name")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r0.form.get("name")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_3_0 = ctx_r0.form.get("name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r0.form.get("name")) == null ? null : tmp_3_0.touched));
    \u0275\u0275advance(4);
    \u0275\u0275classProp("border-red-500", ((tmp_4_0 = ctx_r0.form.get("subject")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r0.form.get("subject")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_5_0 = ctx_r0.form.get("subject")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r0.form.get("subject")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(8);
    \u0275\u0275classProp("border-red-500", ((tmp_6_0 = ctx_r0.form.get("body")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r0.form.get("body")) == null ? null : tmp_6_0.touched));
    \u0275\u0275property("placeholder", "<h1>Hola {{{{customer_name}}}}</h1><p>Tu pago de {{{{payment_amount}}}} ha sido confirmado.</p>");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ((tmp_8_0 = ctx_r0.form.get("body")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r0.form.get("body")) == null ? null : tmp_8_0.touched));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate6(" \u{1F4A1} Tip: Escribe HTML v\xE1lido. Usa ", "{{", "variable_name", "}}", " para insertar variables din\xE1micas. Ej: ", "{{", "customer_name", "}}", ", ", "{{", "payment_amount", "}}", " ");
  }
}
function EmailTemplateCreateModalComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 26);
    \u0275\u0275element(2, "div", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 28)(4, "p", 29)(5, "strong");
    \u0275\u0275text(6, "Nota:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("innerHTML", ctx_r0.getPreviewHTML(), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" Las variables como ", "{{", "customer_name", "}}", " se reemplazar\xE1n con datos reales cuando se env\xEDe el correo. ");
  }
}
var EmailTemplateCreateModalComponent = class _EmailTemplateCreateModalComponent {
  fb;
  emailTemplateService;
  interceptorService;
  sanitizer;
  dialogRef;
  data;
  form;
  loading = false;
  isEdit = false;
  activeTab = "editor";
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
      body: ["", [Validators.required, Validators.minLength(10)]],
      description: [""],
      variables: [""],
      is_active: [true]
    });
  }
  ngOnInit() {
    if (this.data?.template) {
      this.isEdit = true;
      this.form.patchValue({
        name: this.data.template.name,
        subject: this.data.template.subject,
        body: this.data.template.body,
        description: this.data.template.description,
        variables: this.data.template.variables?.join(", ") || "",
        is_active: this.data.template.is_active
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
    const formValue = this.form.value;
    const variables = formValue.variables ? formValue.variables.split(",").map((v) => v.trim()).filter((v) => v) : [];
    const payload = {
      name: formValue.name,
      subject: formValue.subject,
      body: formValue.body,
      description: formValue.description,
      variables,
      is_active: formValue.is_active
    };
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
  getPreviewHTML() {
    const bodyValue = this.form.get("body")?.value || "";
    return this.sanitizer.bypassSecurityTrustHtml(bodyValue);
  }
  static \u0275fac = function EmailTemplateCreateModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailTemplateCreateModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(EmailTemplateService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(DomSanitizer), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmailTemplateCreateModalComponent, selectors: [["app-email-template-create-modal"]], decls: 20, vars: 25, consts: [[1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-button", 3, "click"], [1, "text-2xl"], [1, "modal-body"], [1, "flex", "gap-4", "mb-6", "border-b", "border-gray-200"], [1, "px-4", "py-2", "font-medium", "text-sm", "border-b-2", "transition-colors", 3, "click"], ["class", "space-y-4", 4, "ngIf"], [1, "modal-footer"], ["type", "button", 1, "px-4", "py-2", "text-gray-700", "bg-gray-100", "hover:bg-gray-200", "rounded-md", "transition-colors", 3, "click"], ["type", "button", 1, "px-4", "py-2", "bg-indigo-600", "text-white", "hover:bg-indigo-700", "rounded-md", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "space-y-4"], [1, "space-y-4", 3, "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Ej: Confirmaci\xF3n de Pago", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["class", "text-xs text-red-500 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "subject", "placeholder", "Ej: Tu pago ha sido confirmado", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["type", "text", "formControlName", "description", "placeholder", "Descripci\xF3n breve del template", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["formControlName", "body", "rows", "12", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "font-mono", "text-sm", 3, "placeholder"], [1, "text-xs", "text-gray-500", "mt-2"], ["type", "text", "formControlName", "variables", "placeholder", "Ej: customer_name, payment_amount, contract_number (separadas por comas)", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "text-sm"], [1, "text-xs", "text-gray-500", "mt-1"], [1, "flex", "items-center"], ["type", "checkbox", "formControlName", "is_active", "id", "is_active", 1, "h-4", "w-4", "text-indigo-600", "focus:ring-indigo-500", "border-gray-300", "rounded"], ["for", "is_active", 1, "ml-2", "block", "text-sm", "text-gray-700"], [1, "text-xs", "text-red-500", "mt-1"], [1, "bg-white", "p-4", "rounded", "border", "border-gray-200", "min-h-64", "max-h-96", "overflow-y-auto"], [1, "text-sm", "text-gray-700", "prose", "prose-sm", "max-w-none", 3, "innerHTML"], [1, "bg-blue-50", "p-3", "rounded", "border", "border-blue-200"], [1, "text-xs", "text-blue-700"]], template: function EmailTemplateCreateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6, "\xD7");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "button", 6);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_9_listener() {
        return ctx.activeTab = "editor";
      });
      \u0275\u0275text(10, " Editor ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_11_listener() {
        return ctx.activeTab = "preview";
      });
      \u0275\u0275text(12, " Preview ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(13, EmailTemplateCreateModalComponent_div_13_Template, 33, 17, "div", 7)(14, EmailTemplateCreateModalComponent_div_14_Template, 8, 3, "div", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 8)(16, "button", 9);
      \u0275\u0275listener("click", function EmailTemplateCreateModalComponent_Template_button_click_16_listener() {
        return ctx.close();
      });
      \u0275\u0275text(17, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 10);
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
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=email-template-create-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailTemplateCreateModalComponent, [{
    type: Component,
    args: [{ selector: "app-email-template-create-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <h2>{{ isEdit ? 'Editar Template' : 'Crear Template de Correo' }}</h2>\r
    <button (click)="close()" class="close-button" type="button">\r
      <span class="text-2xl">&times;</span>\r
    </button>\r
  </div>\r
\r
  <div class="modal-body">\r
    <!-- Tabs -->\r
    <div class="flex gap-4 mb-6 border-b border-gray-200">\r
      <button\r
        (click)="activeTab = 'editor'"\r
        [class.tab-active]="activeTab === 'editor'"\r
        class="px-4 py-2 font-medium text-sm border-b-2 transition-colors"\r
        [class.border-indigo-600]="activeTab === 'editor'"\r
        [class.border-transparent]="activeTab !== 'editor'"\r
        [class.text-indigo-600]="activeTab === 'editor'"\r
        [class.text-gray-600]="activeTab !== 'editor'">\r
        Editor\r
      </button>\r
      <button\r
        (click)="activeTab = 'preview'"\r
        [class.tab-active]="activeTab === 'preview'"\r
        class="px-4 py-2 font-medium text-sm border-b-2 transition-colors"\r
        [class.border-indigo-600]="activeTab === 'preview'"\r
        [class.border-transparent]="activeTab !== 'preview'"\r
        [class.text-indigo-600]="activeTab === 'preview'"\r
        [class.text-gray-600]="activeTab !== 'preview'">\r
        Preview\r
      </button>\r
    </div>\r
\r
    <!-- Editor Tab -->\r
    <div *ngIf="activeTab === 'editor'" class="space-y-4">\r
      <form [formGroup]="form" class="space-y-4">\r
        <!-- Nombre -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Template</label>\r
          <input\r
            type="text"\r
            formControlName="name"\r
            placeholder="Ej: Confirmaci\xF3n de Pago"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"\r
            [class.border-red-500]="form.get('name')?.invalid && form.get('name')?.touched">\r
          <p *ngIf="form.get('name')?.invalid && form.get('name')?.touched" class="text-xs text-red-500 mt-1">\r
            El nombre es requerido (m\xEDnimo 3 caracteres)\r
          </p>\r
        </div>\r
\r
        <!-- Asunto -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Asunto del Correo</label>\r
          <input\r
            type="text"\r
            formControlName="subject"\r
            placeholder="Ej: Tu pago ha sido confirmado"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"\r
            [class.border-red-500]="form.get('subject')?.invalid && form.get('subject')?.touched">\r
          <p *ngIf="form.get('subject')?.invalid && form.get('subject')?.touched" class="text-xs text-red-500 mt-1">\r
            El asunto es requerido (m\xEDnimo 5 caracteres)\r
          </p>\r
        </div>\r
\r
        <!-- Descripci\xF3n -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripci\xF3n (Opcional)</label>\r
          <input\r
            type="text"\r
            formControlName="description"\r
            placeholder="Descripci\xF3n breve del template"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">\r
        </div>\r
\r
        <!-- Cuerpo del Correo -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Cuerpo del Correo (HTML)</label>\r
          <textarea\r
            formControlName="body"\r
            [placeholder]="'<h1>Hola {{' + '{' + '{customer_name' + '}' + '}' + '}}</h1><p>Tu pago de {{' + '{' + '{payment_amount' + '}' + '}' + '}} ha sido confirmado.</p>'"\r
            rows="12"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"\r
            [class.border-red-500]="form.get('body')?.invalid && form.get('body')?.touched"></textarea>\r
          <p *ngIf="form.get('body')?.invalid && form.get('body')?.touched" class="text-xs text-red-500 mt-1">\r
            El cuerpo es requerido (m\xEDnimo 10 caracteres)\r
          </p>\r
          <p class="text-xs text-gray-500 mt-2">\r
            \u{1F4A1} Tip: Escribe HTML v\xE1lido. Usa {{'{{'}}variable_name{{'}}'}} para insertar variables din\xE1micas. Ej: {{'{{'}}customer_name{{'}}'}}, {{'{{'}}payment_amount{{'}}'}}\r
          </p>\r
        </div>\r
\r
        <!-- Variables -->\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">Variables Disponibles (Opcional)</label>\r
          <input\r
            type="text"\r
            formControlName="variables"\r
            placeholder="Ej: customer_name, payment_amount, contract_number (separadas por comas)"\r
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">\r
          <p class="text-xs text-gray-500 mt-1">Separa las variables con comas. Estas son referencias para el usuario.</p>\r
        </div>\r
\r
        <!-- Activo -->\r
        <div class="flex items-center">\r
          <input\r
            type="checkbox"\r
            formControlName="is_active"\r
            id="is_active"\r
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">\r
          <label for="is_active" class="ml-2 block text-sm text-gray-700">\r
            Template activo\r
          </label>\r
        </div>\r
      </form>\r
    </div>\r
\r
    <!-- Preview Tab -->\r
    <div *ngIf="activeTab === 'preview'" class="space-y-4">\r
      <div class="bg-white p-4 rounded border border-gray-200 min-h-64 max-h-96 overflow-y-auto">\r
        <div [innerHTML]="getPreviewHTML()" class="text-sm text-gray-700 prose prose-sm max-w-none"></div>\r
      </div>\r
\r
      <div class="bg-blue-50 p-3 rounded border border-blue-200">\r
        <p class="text-xs text-blue-700">\r
          <strong>Nota:</strong> Las variables como {{'{{'}}customer_name{{'}}'}} se reemplazar\xE1n con datos reales cuando se env\xEDe el correo.\r
        </p>\r
      </div>\r
    </div>\r
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
`, styles: ["/* src/app/features/settings/components/email-template-create-modal/email-template-create-modal.component.scss */\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header .close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.modal-header .close-button:hover {\n  color: #111827;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=email-template-create-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: EmailTemplateService }, { type: InterceptorService }, { type: DomSanitizer }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmailTemplateCreateModalComponent, { className: "EmailTemplateCreateModalComponent", filePath: "src/app/features/settings/components/email-template-create-modal/email-template-create-modal.component.ts", lineNumber: 17 });
})();

// src/app/features/settings/pages/email-templates-list/email-templates-list.component.ts
var _c06 = ["tableTemplate"];
function EmailTemplatesListComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "span", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 10);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 10);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "div", 11)(15, "button", 12);
    \u0275\u0275listener("click", function EmailTemplatesListComponent_ng_template_8_Template_button_click_15_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.editTemplate(item_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(16, "lucide-icon", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 14);
    \u0275\u0275listener("click", function EmailTemplatesListComponent_ng_template_8_Template_button_click_17_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.deleteTemplate(item_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(18, "lucide-icon", 13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r3.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.subject);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.description || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r3.getStatusClass(item_r3.is_active));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(item_r3.is_active), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 11, item_r3.created_at, "mediumDate"));
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
  destroy$ = new Subject();
  table_config = {
    rows: [],
    columns: [
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true, width: 150 },
      { name: "Asunto", prop: "subject", sortable: true, canAutoResize: true, width: 250 },
      { name: "Descripci\xF3n", prop: "description", sortable: false, canAutoResize: true, width: 200 },
      { name: "Estado", prop: "is_active", sortable: true, canAutoResize: true, width: 100 },
      { name: "Creado", prop: "created_at", sortable: true, canAutoResize: true, width: 150 },
      { name: "Acciones", prop: "actions", sortable: false, canAutoResize: true, width: 120 }
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron templates de correo" },
    columnMode: "force",
    reorderable: false
  };
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
    const params = this.search ? { search: this.search } : {};
    this.emailTemplateService.getEmailTemplates(params).subscribe({
      next: (res) => {
        let templates = [];
        if (Array.isArray(res)) {
          templates = res;
        } else if (res?.data) {
          templates = res.data;
        }
        this.templates = templates;
        this.table_config.rows = templates;
        this.table_config.totalResults = templates.length;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading templates:", err);
        this.loading = false;
      }
    });
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.loadTemplates();
  }
  openCreateModal() {
    const dialogRef = this.dialog.open(EmailTemplateCreateModalComponent, {
      width: "800px",
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
      width: "800px",
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
    return isActive ? "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800" : "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800";
  }
  getStatusLabel(isActive) {
    return isActive ? "Activo" : "Inactivo";
  }
  static \u0275fac = function EmailTemplatesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailTemplatesListComponent)(\u0275\u0275directiveInject(EmailTemplateService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmailTemplatesListComponent, selectors: [["app-email-templates-list"]], viewQuery: function EmailTemplatesListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c06, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 10, vars: 3, consts: [["tableTemplate", ""], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "items-center", "gap-3"], ["param_name", "search", 1, "w-64", 3, "searchChange", "param_activate"], ["text", "Crear Template", "custom_class", "btn_primary", 3, "clicked"], [3, "config", "rowTemplate"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800"], [1, "text-sm", "text-gray-900"], [1, "text-sm", "text-gray-600"], [1, "flex", "gap-2"], ["title", "Editar", 1, "p-1.5", "text-gray-600", "hover:text-white", "hover:bg-gray-600", "rounded-md", "transition-all", "duration-200", 3, "click"], [3, "img", "size"], ["title", "Eliminar", 1, "p-1.5", "text-red-600", "hover:text-white", "hover:bg-red-600", "rounded-md", "transition-all", "duration-200", 3, "click"]], template: function EmailTemplatesListComponent_Template(rf, ctx) {
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
      \u0275\u0275elementStart(6, "app-button", 6);
      \u0275\u0275listener("clicked", function EmailTemplatesListComponent_Template_app_button_clicked_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateModal());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(7, "app-datatable-wrapper", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275template(8, EmailTemplatesListComponent_ng_template_8_Template, 19, 14, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r5 = \u0275\u0275reference(9);
      \u0275\u0275advance(5);
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config)("rowTemplate", tableTemplate_r5);
    }
  }, dependencies: [
    CommonModule,
    SearchComponent,
    ButtonComponent,
    DatatableWrapperComponent,
    LucideAngularModule,
    LucideAngularComponent,
    DatePipe
  ], styles: ["\n\n/*# sourceMappingURL=email-templates-list.component.css.map */"] });
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
    ], template: `<div class="px-4">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <h2 class="text-2xl font-semibold text-gray-800">Templates de Correo</h2>\r
\r
    <div class="flex items-center gap-3">\r
      <app-search\r
        class="w-64"\r
        [param_activate]="true"\r
        param_name="search"\r
        (searchChange)="onSearchChange($event)">\r
      </app-search>\r
\r
      <app-button\r
        text="Crear Template"\r
        custom_class="btn_primary"\r
        (clicked)="openCreateModal()">\r
      </app-button>\r
    </div>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    [config]="table_config"\r
    [rowTemplate]="tableTemplate">\r
  </app-datatable-wrapper>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">\r
      {{ item.name }}\r
    </span>\r
  </td>\r
  <td class="text-sm text-gray-900">{{ item.subject }}</td>\r
  <td class="text-sm text-gray-600">{{ item.description || '\u2014' }}</td>\r
  <td>\r
    <span [class]="getStatusClass(item.is_active)">\r
      {{ getStatusLabel(item.is_active) }}\r
    </span>\r
  </td>\r
  <td class="text-sm text-gray-600">{{ item.created_at | date:'mediumDate' }}</td>\r
  <td>\r
    <div class="flex gap-2">\r
      <button\r
        (click)="editTemplate(item); $event.stopPropagation()"\r
        class="p-1.5 text-gray-600 hover:text-white hover:bg-gray-600 rounded-md transition-all duration-200"\r
        title="Editar">\r
        <lucide-icon [img]="Edit2" [size]="16"></lucide-icon>\r
      </button>\r
      <button\r
        (click)="deleteTemplate(item); $event.stopPropagation()"\r
        class="p-1.5 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-all duration-200"\r
        title="Eliminar">\r
        <lucide-icon [img]="Trash2" [size]="16"></lucide-icon>\r
      </button>\r
    </div>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/settings/pages/email-templates-list/email-templates-list.component.scss */\n/*# sourceMappingURL=email-templates-list.component.css.map */\n"] }]
  }], () => [{ type: EmailTemplateService }, { type: MatDialog }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmailTemplatesListComponent, { className: "EmailTemplatesListComponent", filePath: "src/app/features/settings/pages/email-templates-list/email-templates-list.component.ts", lineNumber: 28 });
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
      }
    ]
  }
];
export {
  RBAC_TENANT_UI_ROUTES
};
//# sourceMappingURL=chunk-YSPMUGQL.js.map
