import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef
} from "./chunk-KNFYVOET.js";
import {
  Component,
  Inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/custom-snackbar/custom-snackbar.component.ts
function CustomSnackbarComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 2);
  }
}
function CustomSnackbarComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 3);
  }
}
function CustomSnackbarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 4);
  }
}
function CustomSnackbarComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 5);
  }
}
function CustomSnackbarComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 6);
  }
}
var CustomSnackbarComponent = class _CustomSnackbarComponent {
  data;
  snackBarRef;
  constructor(data, snackBarRef) {
    this.data = data;
    this.snackBarRef = snackBarRef;
  }
  ngOnInit() {
  }
  static \u0275fac = function CustomSnackbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomSnackbarComponent)(\u0275\u0275directiveInject(MAT_SNACK_BAR_DATA), \u0275\u0275directiveInject(MatSnackBarRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomSnackbarComponent, selectors: [["app-custom-snackbar"]], standalone: false, decls: 14, vars: 15, consts: [[1, "snackbar", "animate__animated", "animate__fadeIn"], [1, "snackbar__icon"], ["src", "/snackbar/highlight.svg"], ["src", "/snackbar/error.svg"], ["src", "/snackbar/success.svg"], ["src", "/snackbar/warning.svg"], ["src", "/snackbar/warning_outline.svg"], [1, "snackbar__wrap_info"], [1, "snackbar__wrap_info__title"], [1, "snackbar__wrap_info__description"]], template: function CustomSnackbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "section", 1);
      \u0275\u0275conditionalCreate(2, CustomSnackbarComponent_Conditional_2_Template, 1, 0, "img", 2);
      \u0275\u0275conditionalCreate(3, CustomSnackbarComponent_Conditional_3_Template, 1, 0, "img", 3);
      \u0275\u0275conditionalCreate(4, CustomSnackbarComponent_Conditional_4_Template, 1, 0, "img", 4);
      \u0275\u0275conditionalCreate(5, CustomSnackbarComponent_Conditional_5_Template, 1, 0, "img", 5);
      \u0275\u0275conditionalCreate(6, CustomSnackbarComponent_Conditional_6_Template, 1, 0, "img", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "section", 7)(8, "div", 8)(9, "p");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9)(12, "p");
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("highlight", ctx.data.type === "highlight")("error", ctx.data.type === "error")("success", ctx.data.type === "success")("warning", ctx.data.type === "warning");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.data.type === "highlight" ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.type === "error" ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.type === "success" ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.type === "warning" ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.data.type === "warning outline" ? 6 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.data.title);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.message);
    }
  }, styles: ["\n\n.snackbar[_ngcontent-%COMP%] {\n  background-color: rgb(201, 137, 137);\n  width: 100%;\n  border-radius: 3px;\n  display: flex;\n  flex-direction: row;\n  padding: 12px;\n  grid-gap: 8px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  z-index: 99;\n}\n.snackbar__icon[_ngcontent-%COMP%] {\n  width: 30px;\n}\n.snackbar__wrap_info[_ngcontent-%COMP%] {\n  grid-gap: 4px;\n  display: flex;\n  flex-direction: column;\n}\n.snackbar__wrap_info__title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: bolder;\n  color: #1A1A34;\n  display: flex;\n  flex-direction: row;\n  grid-gap: 5px;\n  text-align: initial;\n}\n.snackbar__wrap_info__description[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #1A1A34;\n  font-weight: 400;\n}\n.highlight[_ngcontent-%COMP%] {\n  background: #BBDEFB;\n  border: 1px solid #42A5F5;\n}\n.error[_ngcontent-%COMP%] {\n  background: #FFCDD2;\n  border: 1px solid #EF5350;\n}\n.success[_ngcontent-%COMP%] {\n  background: #E8F5E9;\n  border: 1px solid #66BB6A;\n}\n.warning[_ngcontent-%COMP%] {\n  background: #FFF9C4;\n  border: 1px solid #FBC02D;\n}\n.warning_outline[_ngcontent-%COMP%] {\n  background: #F5F5F5;\n  border: 1px solid #BDBDBD;\n}\n/*# sourceMappingURL=custom-snackbar.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomSnackbarComponent, [{
    type: Component,
    args: [{ selector: "app-custom-snackbar", standalone: false, template: `<main class="snackbar animate__animated animate__fadeIn"\r
  [class.highlight]="data.type === 'highlight' "\r
  [class.error]="data.type === 'error' "\r
  [class.success]="data.type === 'success' "\r
  [class.warning]="data.type === 'warning' "\r
  >\r
  <section class="snackbar__icon">\r
    @if (data.type === 'highlight') {\r
      <img src="/snackbar/highlight.svg">\r
    }\r
    @if (data.type === 'error') {\r
      <img src="/snackbar/error.svg"    >\r
    }\r
    @if (data.type === 'success') {\r
      <img src="/snackbar/success.svg"  >\r
    }\r
    @if (data.type === 'warning') {\r
      <img src="/snackbar/warning.svg"  >\r
    }\r
    @if (data.type === 'warning outline') {\r
      <img src="/snackbar/warning_outline.svg">\r
    }\r
  </section>\r
  <section class="snackbar__wrap_info">\r
    <div class="snackbar__wrap_info__title">\r
      <!-- <p *ngIf="this.snackbar_settings.snackbar_type === 'highlight'">Highlight:</p> -->\r
      <!-- <p *ngIf="this.snackbar_settings.snackbar_type === 'error'">Error:</p> -->\r
      <!-- <p *ngIf="this.snackbar_settings.snackbar_type === 'success'">Success:</p> -->\r
      <!-- <p  *ngIf="this.snackbar_settings.snackbar_type === 'warning' || this.snackbar_settings.snackbar_type === 'warning outline'">Warning:</p> -->\r
      <p>{{data.title}}</p>\r
    </div>\r
    <div class="snackbar__wrap_info__description">\r
      <p>{{data.message}}</p>\r
    </div>\r
    <!-- <div class="snackbar__wrap_info__actions">\r
    <p>Actions</p>\r
  </div> -->\r
</section>\r
</main>\r
`, styles: ["/* src/app/core/components/custom-snackbar/custom-snackbar.component.scss */\n.snackbar {\n  background-color: rgb(201, 137, 137);\n  width: 100%;\n  border-radius: 3px;\n  display: flex;\n  flex-direction: row;\n  padding: 12px;\n  grid-gap: 8px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  z-index: 99;\n}\n.snackbar__icon {\n  width: 30px;\n}\n.snackbar__wrap_info {\n  grid-gap: 4px;\n  display: flex;\n  flex-direction: column;\n}\n.snackbar__wrap_info__title {\n  font-size: 16px;\n  font-weight: bolder;\n  color: #1A1A34;\n  display: flex;\n  flex-direction: row;\n  grid-gap: 5px;\n  text-align: initial;\n}\n.snackbar__wrap_info__description {\n  font-size: 16px;\n  color: #1A1A34;\n  font-weight: 400;\n}\n.highlight {\n  background: #BBDEFB;\n  border: 1px solid #42A5F5;\n}\n.error {\n  background: #FFCDD2;\n  border: 1px solid #EF5350;\n}\n.success {\n  background: #E8F5E9;\n  border: 1px solid #66BB6A;\n}\n.warning {\n  background: #FFF9C4;\n  border: 1px solid #FBC02D;\n}\n.warning_outline {\n  background: #F5F5F5;\n  border: 1px solid #BDBDBD;\n}\n/*# sourceMappingURL=custom-snackbar.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_SNACK_BAR_DATA]
  }] }, { type: MatSnackBarRef }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomSnackbarComponent, { className: "CustomSnackbarComponent", filePath: "src/app/core/components/custom-snackbar/custom-snackbar.component.ts", lineNumber: 10 });
})();

export {
  CustomSnackbarComponent
};
//# sourceMappingURL=chunk-Y4MZBWJH.js.map
