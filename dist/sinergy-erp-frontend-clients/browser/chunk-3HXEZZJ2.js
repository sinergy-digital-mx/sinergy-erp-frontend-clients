import {
  CommonModule
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵnamespaceSVG
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/back-button/back-button.component.ts
var BackButtonComponent = class _BackButtonComponent {
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BackButtonComponent, selectors: [["app-back-button"]], inputs: { title: "title" }, outputs: { clicked: "clicked" }, decls: 3, vars: 1, consts: [[1, "inline-flex", "items-center", "justify-center", "w-8", "h-8", "rounded-full", "text-gray-600", "hover:text-gray-900", "hover:bg-gray-100", "transition-all", "duration-200", 3, "click", "title"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"]], template: function BackButtonComponent_Template(rf, ctx) {
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BackButtonComponent, [{
    type: Component,
    args: [{ selector: "app-back-button", standalone: true, imports: [CommonModule], template: `
    <button
      (click)="onClick()"
      [title]="title"
      class="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
  `, styles: ["/* angular:styles/component:scss;b1979e9694ff71011f7754c20fa10d4204bcf0a9634a4062066beed7cf769cd7;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/core/components/back-button/back-button.component.ts */\n:host {\n  display: inline-block;\n}\nbutton {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\nbutton:active {\n  transform: scale(0.95);\n}\n/*# sourceMappingURL=back-button.component.css.map */\n"] }]
  }], null, { title: [{
    type: Input
  }], clicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BackButtonComponent, { className: "BackButtonComponent", filePath: "src/app/core/components/back-button/back-button.component.ts", lineNumber: 39 });
})();

export {
  BackButtonComponent
};
//# sourceMappingURL=chunk-3HXEZZJ2.js.map
