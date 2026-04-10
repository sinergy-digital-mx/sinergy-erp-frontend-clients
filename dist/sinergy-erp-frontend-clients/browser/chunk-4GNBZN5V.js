import {
  BackButtonComponent
} from "./chunk-3HXEZZJ2.js";
import {
  MARKETING_PERMISSIONS
} from "./chunk-3YDE66GB.js";
import {
  permissionGuard
} from "./chunk-YKJA6TLY.js";
import "./chunk-2BSLK6RD.js";
import {
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  NgForOf
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7ZU2RCPO.js";

// src/app/features/marketing/marketing.component.ts
function MarketingComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275listener("click", function MarketingComponent_div_7_Template_div_click_0_listener() {
      const section_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigateTo(section_r2.route));
    });
    \u0275\u0275element(1, "div", 7);
    \u0275\u0275elementStart(2, "div", 8)(3, "div", 9)(4, "div", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 11);
    \u0275\u0275element(7, "path", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "h2", 13);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 14);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 15);
    \u0275\u0275text(13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 16);
    \u0275\u0275element(15, "path", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(16, "div", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r2 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(section_r2.icon);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(section_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Ir a ", section_r2.title, " ");
  }
}
var MarketingComponent = class _MarketingComponent {
  router;
  sections = [
    {
      id: "bulk-emails",
      title: "Correos Masivos",
      description: "Crea y gestiona campa\xF1as de correos masivos, monitorea entregas y resultados",
      icon: "\u{1F4E7}",
      route: "bulk-emails"
    }
  ];
  constructor(router) {
    this.router = router;
  }
  navigateTo(route) {
    this.router.navigate(["/marketing", route]);
  }
  static \u0275fac = function MarketingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MarketingComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MarketingComponent, selectors: [["app-marketing"]], decls: 8, vars: 1, consts: [[1, "p-6", "bg-white", "rounded-xl", "shadow-sm", "border", "border-gray-100"], [1, "mb-8"], [1, "text-3xl", "font-bold", "text-gray-900", "mb-2"], [1, "text-gray-600"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "max-w-2xl"], ["class", "group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden", 3, "click", 4, "ngFor", "ngForOf"], [1, "group", "relative", "bg-white", "rounded-xl", "border", "border-gray-200", "p-6", "hover:shadow-lg", "transition-all", "duration-300", "cursor-pointer", "overflow-hidden", 3, "click"], [1, "absolute", "inset-0", "bg-linear-to-br", "from-indigo-50", "to-transparent", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300"], [1, "relative", "z-10"], [1, "flex", "items-start", "justify-between", "mb-3"], [1, "text-4xl"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-indigo-600", "opacity-0", "group-hover:opacity-100", "transform", "group-hover:translate-x-1", "transition-all", "duration-300"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], [1, "text-xl", "font-bold", "text-gray-900", "mb-2"], [1, "text-gray-600", "text-sm", "leading-relaxed", "mb-4"], [1, "inline-flex", "items-center", "text-indigo-600", "font-semibold", "text-sm", "group-hover:text-indigo-700", "transition-colors"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "ml-2", "w-4", "h-4", "transform", "group-hover:translate-x-1", "transition-transform"], [1, "absolute", "inset-0", "rounded-xl", "border", "border-indigo-200", "opacity-0", "group-hover:opacity-100", "transition-opacity", "duration-300", "pointer-events-none"]], template: function MarketingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Marketing");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "Gestiona correos masivos y campa\xF1as de email");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275template(7, MarketingComponent_div_7_Template, 17, 4, "div", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.sections);
    }
  }, dependencies: [CommonModule, NgForOf], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n/*# sourceMappingURL=marketing.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MarketingComponent, [{
    type: Component,
    args: [{ selector: "app-marketing", standalone: true, imports: [CommonModule], template: `
    <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Marketing</h1>
        <p class="text-gray-600">Gestiona correos masivos y campa\xF1as de email</p>
      </div>

      <!-- Marketing Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <div *ngFor="let section of sections" 
             (click)="navigateTo(section.route)"
             class="group relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
          
          <!-- Background gradient on hover -->
          <div class="absolute inset-0 bg-linear-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Content -->
          <div class="relative z-10">
            <div class="flex items-start justify-between mb-3">
              <div class="text-4xl">{{ section.icon }}</div>
              <svg class="w-5 h-5 text-indigo-600 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
            
            <h2 class="text-xl font-bold text-gray-900 mb-2">{{ section.title }}</h2>
            <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ section.description }}</p>
            
            <div class="inline-flex items-center text-indigo-600 font-semibold text-sm group-hover:text-indigo-700 transition-colors">
              Ir a {{ section.title }}
              <svg class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          
          <!-- Border gradient on hover -->
          <div class="absolute inset-0 rounded-xl border border-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;c63aac4e1d1ce1074d0fb61b93c3d082a38ddfc40b5cc09fdd9a596f2e08e21b;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/marketing/marketing.component.ts */\n:host {\n  display: block;\n  height: 100%;\n}\n/*# sourceMappingURL=marketing.component.css.map */\n"] }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MarketingComponent, { className: "MarketingComponent", filePath: "src/app/features/marketing/marketing.component.ts", lineNumber: 63 });
})();

// src/app/features/marketing/pages/bulk-emails/bulk-emails.component.ts
var BulkEmailsComponent = class _BulkEmailsComponent {
  router;
  constructor(router) {
    this.router = router;
  }
  goBack() {
    this.router.navigate(["/marketing"]);
  }
  static \u0275fac = function BulkEmailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BulkEmailsComponent)(\u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BulkEmailsComponent, selectors: [["app-bulk-emails"]], decls: 10, vars: 0, consts: [[1, "p-6", "bg-white", "rounded-xl", "shadow-sm", "border", "border-gray-100"], [1, "flex", "items-center", "gap-3", "mb-6"], [3, "clicked"], [1, "text-2xl", "font-semibold", "text-gray-900"], [1, "bg-gray-50", "rounded-lg", "border", "border-gray-200", "p-8", "text-center"], [1, "text-gray-600", "text-lg"], [1, "text-gray-500", "text-sm", "mt-2"]], template: function BulkEmailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "app-back-button", 2);
      \u0275\u0275listener("clicked", function BulkEmailsComponent_Template_app_back_button_clicked_2_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "h1", 3);
      \u0275\u0275text(4, "Correos Masivos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4)(6, "p", 5);
      \u0275\u0275text(7, "Gesti\xF3n de correos masivos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, "Esta secci\xF3n est\xE1 en desarrollo");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [CommonModule, BackButtonComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BulkEmailsComponent, [{
    type: Component,
    args: [{ selector: "app-bulk-emails", standalone: true, imports: [CommonModule, BackButtonComponent], template: `
    <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Header with Back Button -->
      <div class="flex items-center gap-3 mb-6">
        <app-back-button (clicked)="goBack()"></app-back-button>
        <h1 class="text-2xl font-semibold text-gray-900">Correos Masivos</h1>
      </div>

      <!-- Content -->
      <div class="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
        <p class="text-gray-600 text-lg">Gesti\xF3n de correos masivos</p>
        <p class="text-gray-500 text-sm mt-2">Esta secci\xF3n est\xE1 en desarrollo</p>
      </div>
    </div>
  ` }]
  }], () => [{ type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BulkEmailsComponent, { className: "BulkEmailsComponent", filePath: "src/app/features/marketing/pages/bulk-emails/bulk-emails.component.ts", lineNumber: 31 });
})();

// src/app/features/marketing/marketing.routes.ts
var MARKETING_ROUTES = [
  {
    path: "",
    component: MarketingComponent,
    canActivate: [permissionGuard],
    data: {
      permissions: [MARKETING_PERMISSIONS.viewDashboard]
    }
  },
  {
    path: "bulk-emails",
    component: BulkEmailsComponent,
    canActivate: [permissionGuard],
    data: {
      permissions: [MARKETING_PERMISSIONS.sendEmail]
    }
  }
];
export {
  MARKETING_ROUTES
};
//# sourceMappingURL=chunk-4GNBZN5V.js.map
