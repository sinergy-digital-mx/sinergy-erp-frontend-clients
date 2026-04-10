import {
  NgStyle
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/spinner/spinner.component.ts
var SpinnerComponent = class _SpinnerComponent {
  width;
  height;
  color;
  border_width;
  constructor() {
  }
  ngOnInit() {
  }
  setSpinnerStyles() {
    const styles = {
      "width.px": this.width ? this.width : "",
      "height.px": this.height ? this.height : "",
      "border-left-color": this.color ? this.color : "",
      "border-width.px": this.border_width ? this.border_width : ""
    };
    return styles;
  }
  static \u0275fac = function SpinnerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpinnerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpinnerComponent, selectors: [["app-spinner"]], inputs: { width: "width", height: "height", color: "color", border_width: "border_width" }, decls: 2, vars: 1, consts: [[1, "spinner-container"], [1, "spinner", 3, "ngStyle"]], template: function SpinnerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngStyle", ctx.setSpinnerStyles());
    }
  }, dependencies: [NgStyle], styles: ["\n\n.spinner-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.spinner[_ngcontent-%COMP%] {\n  border: 5px solid rgba(0, 0, 0, 0.1);\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border-left-color: #fff;\n  animation: _ngcontent-%COMP%_spin 1s ease infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=spinner.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpinnerComponent, [{
    type: Component,
    args: [{ selector: "app-spinner", standalone: true, imports: [NgStyle], template: '<div class="spinner-container">\r\n  <div [ngStyle]="setSpinnerStyles()" class="spinner"></div>\r\n</div>\r\n', styles: ["/* src/app/core/components/spinner/spinner.component.scss */\n.spinner-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.spinner {\n  border: 5px solid rgba(0, 0, 0, 0.1);\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  border-left-color: #fff;\n  animation: spin 1s ease infinite;\n}\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=spinner.component.css.map */\n"] }]
  }], () => [], { width: [{
    type: Input
  }], height: [{
    type: Input
  }], color: [{
    type: Input
  }], border_width: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpinnerComponent, { className: "SpinnerComponent", filePath: "src/app/core/components/spinner/spinner.component.ts", lineNumber: 11 });
})();

export {
  SpinnerComponent
};
//# sourceMappingURL=chunk-OC6N764R.js.map
