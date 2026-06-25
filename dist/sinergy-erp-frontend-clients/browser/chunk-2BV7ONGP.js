import {
  Component,
  Input,
  computed,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnamespaceSVG,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-CJAGDKD4.js";

// src/app/core/components/pollux-brand-text/pollux-brand-text.component.ts
function PolluxBrandTextComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "stop", 5)(1, "stop", 6)(2, "stop", 7)(3, "stop", 8)(4, "stop", 9)(5, "stop", 10);
  }
}
function PolluxBrandTextComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElement(0, "stop", 11)(1, "stop", 12)(2, "stop", 13)(3, "stop", 14)(4, "stop", 15)(5, "stop", 16);
  }
}
var gradientIdCounter = 0;
var PolluxBrandTextComponent = class _PolluxBrandTextComponent {
  compact = input(false, ...ngDevMode ? [{ debugName: "compact" }] : []);
  theme = input("dark", ...ngDevMode ? [{ debugName: "theme" }] : []);
  size = input("md", ...ngDevMode ? [{ debugName: "size" }] : []);
  gradientId = `pollux-grad-${++gradientIdCounter}`;
  label = computed(() => this.compact() ? "P" : "Pollux", ...ngDevMode ? [{ debugName: "label" }] : []);
  fontSize = computed(() => this.compact() ? 22 : this.size() === "lg" ? 30 : 26, ...ngDevMode ? [{ debugName: "fontSize" }] : []);
  viewBox = computed(() => this.compact() ? "0 0 28 36" : this.size() === "lg" ? "0 0 108 36" : "0 0 96 36", ...ngDevMode ? [{ debugName: "viewBox" }] : []);
  static \u0275fac = function PolluxBrandTextComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PolluxBrandTextComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PolluxBrandTextComponent, selectors: [["app-pollux-brand-text"]], inputs: { compact: [1, "compact"], theme: [1, "theme"], size: [1, "size"] }, decls: 9, vars: 9, consts: [["xmlns", "http://www.w3.org/2000/svg", "role", "img", 1, "pollux-brand-text"], ["x1", "0%", "y1", "0%", "x2", "100%", "y2", "0%"], ["attributeName", "x1", "values", "0%;100%;0%", "dur", "10s", "repeatCount", "indefinite"], ["attributeName", "x2", "values", "100%;200%;100%", "dur", "10s", "repeatCount", "indefinite"], ["x", "2", "y", "28", "font-family", "Inter, sans-serif", "font-weight", "700", "letter-spacing", "0.06em"], ["offset", "0%", "stop-color", "#a8d4ff"], ["offset", "20%", "stop-color", "#3b7ddd"], ["offset", "45%", "stop-color", "#5eead4"], ["offset", "65%", "stop-color", "#38bdf8"], ["offset", "85%", "stop-color", "#2dd4bf"], ["offset", "100%", "stop-color", "#a8d4ff"], ["offset", "0%", "stop-color", "#0a2540"], ["offset", "20%", "stop-color", "#1e4a8c"], ["offset", "45%", "stop-color", "#3b7ddd"], ["offset", "65%", "stop-color", "#1ec8d4"], ["offset", "85%", "stop-color", "#2b6fd4"], ["offset", "100%", "stop-color", "#0a2540"]], template: function PolluxBrandTextComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0)(1, "defs")(2, "linearGradient", 1);
      \u0275\u0275conditionalCreate(3, PolluxBrandTextComponent_Conditional_3_Template, 6, 0)(4, PolluxBrandTextComponent_Conditional_4_Template, 6, 0);
      \u0275\u0275domElement(5, "animate", 2)(6, "animate", 3);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(7, "text", 4);
      \u0275\u0275text(8);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("pollux-brand-text--lg", ctx.size() === "lg");
      \u0275\u0275attribute("viewBox", ctx.viewBox())("aria-label", ctx.label());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("id", ctx.gradientId);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.theme() === "dark" ? 3 : 4);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("fill", "url(#" + ctx.gradientId + ")")("font-size", ctx.fontSize());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.label(), " ");
    }
  }, styles: ["\n\n[_nghost-%COMP%] {\n  display: inline-block;\n  line-height: 0;\n}\n.pollux-brand-text[_ngcontent-%COMP%] {\n  display: block;\n  height: 2rem;\n  width: auto;\n}\n.pollux-brand-text--lg[_ngcontent-%COMP%] {\n  height: 2.35rem;\n}\n/*# sourceMappingURL=pollux-brand-text.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PolluxBrandTextComponent, [{
    type: Component,
    args: [{ selector: "app-pollux-brand-text", standalone: true, template: `
    <svg
      class="pollux-brand-text"
      [class.pollux-brand-text--lg]="size() === 'lg'"
      [attr.viewBox]="viewBox()"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      [attr.aria-label]="label()">
      <defs>
        <linearGradient [attr.id]="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
          @if (theme() === 'dark') {
            <stop offset="0%" stop-color="#a8d4ff" />
            <stop offset="20%" stop-color="#3b7ddd" />
            <stop offset="45%" stop-color="#5eead4" />
            <stop offset="65%" stop-color="#38bdf8" />
            <stop offset="85%" stop-color="#2dd4bf" />
            <stop offset="100%" stop-color="#a8d4ff" />
          } @else {
            <stop offset="0%" stop-color="#0a2540" />
            <stop offset="20%" stop-color="#1e4a8c" />
            <stop offset="45%" stop-color="#3b7ddd" />
            <stop offset="65%" stop-color="#1ec8d4" />
            <stop offset="85%" stop-color="#2b6fd4" />
            <stop offset="100%" stop-color="#0a2540" />
          }
          <animate attributeName="x1" values="0%;100%;0%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="x2" values="100%;200%;100%" dur="10s" repeatCount="indefinite" />
        </linearGradient>
      </defs>
      <text
        x="2"
        y="28"
        [attr.fill]="'url(#' + gradientId + ')'"
        font-family="Inter, sans-serif"
        [attr.font-size]="fontSize()"
        font-weight="700"
        letter-spacing="0.06em">
        {{ label() }}
      </text>
    </svg>
  `, styles: ["/* angular:styles/component:scss;0f9eec035d2dc69bc031ed38025ab362513355f7ef38a78fffa7756c42d7bc25;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/core/components/pollux-brand-text/pollux-brand-text.component.ts */\n:host {\n  display: inline-block;\n  line-height: 0;\n}\n.pollux-brand-text {\n  display: block;\n  height: 2rem;\n  width: auto;\n}\n.pollux-brand-text--lg {\n  height: 2.35rem;\n}\n/*# sourceMappingURL=pollux-brand-text.component.css.map */\n"] }]
  }], null, { compact: [{ type: Input, args: [{ isSignal: true, alias: "compact", required: false }] }], theme: [{ type: Input, args: [{ isSignal: true, alias: "theme", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PolluxBrandTextComponent, { className: "PolluxBrandTextComponent", filePath: "src/app/core/components/pollux-brand-text/pollux-brand-text.component.ts", lineNumber: 66 });
})();

export {
  PolluxBrandTextComponent
};
//# sourceMappingURL=chunk-2BV7ONGP.js.map
