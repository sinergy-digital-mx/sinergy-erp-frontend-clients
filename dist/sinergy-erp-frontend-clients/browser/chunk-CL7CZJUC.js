import {
  SpinnerComponent
} from "./chunk-OC6N764R.js";
import {
  LucideAngularComponent,
  LucideAngularModule
} from "./chunk-XYBC4MWB.js";
import {
  CommonModule,
  NgClass
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction4,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/button/button.component.ts
var _c0 = ["*"];
var _c1 = (a0, a1, a2, a3) => ["flex items-center justify-center gap-2 rounded-lg transition font-semibold", a0, a1, a2, "disabled:opacity-50 disabled:cursor-not-allowed", a3];
function ButtonComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-spinner", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("width", 16)("height", 16)("border_width", 3);
  }
}
function ButtonComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.text);
  }
}
function ButtonComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function ButtonComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "lucide-icon", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("img", ctx_r0.icon);
  }
}
var ButtonComponent = class _ButtonComponent {
  text;
  icon;
  loading = false;
  disabled = false;
  type = "button";
  customClass = "";
  variant = "primary";
  size = "md";
  fullWidth = true;
  title;
  clicked = new EventEmitter();
  get isDisabled() {
    return this.disabled || this.loading;
  }
  onClick() {
    if (!this.isDisabled) {
      this.clicked.emit();
    }
  }
  static \u0275fac = function ButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ButtonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ButtonComponent, selectors: [["app-button"]], inputs: { text: "text", icon: "icon", loading: "loading", disabled: "disabled", type: "type", customClass: "customClass", variant: "variant", size: "size", fullWidth: "fullWidth", title: "title" }, outputs: { clicked: "clicked" }, ngContentSelectors: _c0, decls: 5, vars: 12, consts: [[3, "click", "type", "disabled", "title", "ngClass"], [3, "width", "height", "border_width"], [1, "w-4", "h-4", 3, "img"]], template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "button", 0);
      \u0275\u0275listener("click", function ButtonComponent_Template_button_click_0_listener() {
        return ctx.onClick();
      });
      \u0275\u0275conditionalCreate(1, ButtonComponent_Conditional_1_Template, 1, 3, "app-spinner", 1);
      \u0275\u0275conditionalCreate(2, ButtonComponent_Conditional_2_Template, 2, 1, "span")(3, ButtonComponent_Conditional_3_Template, 1, 0);
      \u0275\u0275conditionalCreate(4, ButtonComponent_Conditional_4_Template, 1, 1, "lucide-icon", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("type", ctx.type)("disabled", ctx.isDisabled)("title", ctx.title)("ngClass", \u0275\u0275pureFunction4(7, _c1, ctx.fullWidth ? "w-full" : "w-auto", ctx.size === "sm" ? "px-3 py-1.5 text-xs" : ctx.size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm", ctx.variant === "primary" ? "bg-indigo-600 text-white hover:bg-indigo-700" : ctx.variant === "secondary" ? "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300" : ctx.variant === "danger" ? "bg-red-600 text-white hover:bg-red-700" : ctx.variant === "success" ? "bg-green-600 text-white hover:bg-green-700" : "", ctx.customClass));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.text ? 2 : 3);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.loading && ctx.icon ? 4 : -1);
    }
  }, dependencies: [CommonModule, NgClass, LucideAngularModule, LucideAngularComponent, SpinnerComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{ selector: "app-button", standalone: true, imports: [CommonModule, LucideAngularModule, SpinnerComponent], template: `<button\r
  [type]="type"\r
  [disabled]="isDisabled"\r
  [title]="title"\r
  (click)="onClick()"\r
  [ngClass]="[\r
    'flex items-center justify-center gap-2 rounded-lg transition font-semibold',\r
    fullWidth ? 'w-full' : 'w-auto',\r
    size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm',\r
    variant === 'primary' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : \r
    variant === 'secondary' ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300' :\r
    variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' :\r
    variant === 'success' ? 'bg-green-600 text-white hover:bg-green-700' : '',\r
    'disabled:opacity-50 disabled:cursor-not-allowed',\r
    customClass\r
  ]"\r
>\r
  @if (loading) {\r
    <app-spinner [width]="16" [height]="16" [border_width]="3"></app-spinner>\r
  }\r
\r
  @if (text) {\r
    <span>{{ text }}</span>\r
  } @else {\r
    <ng-content></ng-content>\r
  }\r
  \r
  @if (!loading && icon) {\r
    <lucide-icon [img]="icon" class="w-4 h-4"></lucide-icon>\r
  }\r
</button>\r
` }]
  }], null, { text: [{
    type: Input
  }], icon: [{
    type: Input
  }], loading: [{
    type: Input
  }], disabled: [{
    type: Input
  }], type: [{
    type: Input
  }], customClass: [{
    type: Input
  }], variant: [{
    type: Input
  }], size: [{
    type: Input
  }], fullWidth: [{
    type: Input
  }], title: [{
    type: Input
  }], clicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ButtonComponent, { className: "ButtonComponent", filePath: "src/app/core/components/button/button.component.ts", lineNumber: 12 });
})();

export {
  ButtonComponent
};
//# sourceMappingURL=chunk-CL7CZJUC.js.map
