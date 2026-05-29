import {
  SpinnerComponent
} from "./chunk-MIKKZHKU.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-RBFB2ZTY.js";
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-GBHDNI6X.js";

// src/app/core/components/empty-stage/empty-stage.component.ts
function EmptyStageComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.icon ? ctx_r0.icon : "fi-rr-search");
  }
}
function EmptyStageComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.image, \u0275\u0275sanitizeUrl);
  }
}
var EmptyStageComponent = class _EmptyStageComponent {
  image = "";
  icon = "";
  message = "Results not found";
  sub_message = "";
  background = "transparent";
  params = {
    icon_size: void 0,
    row_gap: void 0,
    wrapper_icon_circle: false,
    width: void 0,
    height: void 0
  };
  constructor() {
  }
  ngOnInit() {
    if (this.params.icon_size === void 0) {
      this.params.icon_size = 22;
      this.setIconPropertySize(this.params.icon_size);
    } else {
      this.setIconPropertySize(this.params.icon_size);
    }
    if (this.params.row_gap === void 0) {
      this.params.row_gap = 8;
      this.setGapProperty(this.params.row_gap);
    } else {
      this.setGapProperty(this.params.row_gap);
    }
    if (this.params.width === void 0) {
      this.params.width = 46;
      this.setWidthProperty(this.params.width);
    } else {
      this.setWidthProperty(this.params.width);
    }
    if (this.params.height === void 0) {
      this.params.height = 46;
      this.setHeightProperty(this.params.height);
    } else {
      this.setHeightProperty(this.params.height);
    }
  }
  setWidthProperty(width) {
    document.documentElement.style.setProperty("--width", `${width}px`);
  }
  setHeightProperty(height) {
    document.documentElement.style.setProperty("--height", `${height}px`);
  }
  setGapProperty(gap) {
    document.documentElement.style.setProperty("--row_gap", `${gap}px`);
  }
  setIconPropertySize(size) {
    document.documentElement.style.setProperty("--icon_size", `${size}px`);
  }
  setStyles() {
    const styles = {
      background: this.background
    };
    return styles;
  }
  static \u0275fac = function EmptyStageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmptyStageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmptyStageComponent, selectors: [["app-empty-stage"]], inputs: { image: "image", icon: "icon", message: "message", sub_message: "sub_message", background: "background", params: "params" }, decls: 10, vars: 7, consts: [[1, "empty_stage", 3, "ngStyle"], [3, "class"], ["alt", "", 3, "src"]], template: function EmptyStageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementContainerStart(0);
      \u0275\u0275elementStart(1, "div", 0)(2, "div")(3, "div");
      \u0275\u0275conditionalCreate(4, EmptyStageComponent_Conditional_4_Template, 1, 2, "i", 1);
      \u0275\u0275conditionalCreate(5, EmptyStageComponent_Conditional_5_Template, 1, 1, "img", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7);
      \u0275\u0275elementStart(8, "span");
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementContainerEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngStyle", ctx.setStyles());
      \u0275\u0275advance(2);
      \u0275\u0275classProp("circle_icon", ctx.params.wrapper_icon_circle);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.image ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.image ? 5 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.message, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.sub_message ? ctx.sub_message : "");
    }
  }, dependencies: [NgStyle], styles: ["\n\n.empty_stage[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #ffffff;\n  height: 100%;\n}\n.empty_stage[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  row-gap: var(--row_gap);\n  padding: 0.667rem;\n}\n.empty_stage[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: var(--height);\n  width: var(--width);\n  border-radius: 50%;\n}\n.empty_stage[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child    > img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.empty_stage[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child    > i[_ngcontent-%COMP%] {\n  color: #666677;\n  font-size: var(--icon_size);\n}\n.empty_stage[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-weight: 700;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 1em;\n  line-height: 18px;\n  color: #666677;\n}\n.empty_stage[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 400;\n}\n.circle_icon[_ngcontent-%COMP%] {\n  background: #eeeeee;\n}\n/*# sourceMappingURL=empty-stage.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmptyStageComponent, [{
    type: Component,
    args: [{ selector: "app-empty-stage", standalone: true, imports: [NgStyle], template: `<ng-container>\r
  <div class="empty_stage" [ngStyle]="setStyles()">\r
    <div>\r
      <div [class.circle_icon]="params.wrapper_icon_circle">\r
        @if (!image) {\r
          <i [class]="icon ? icon : 'fi-rr-search'"></i>\r
        }\r
        @if (image) {\r
          <img [src]="image" alt="" />\r
        }\r
      </div>\r
      <p>\r
        {{ message }} <span>{{ sub_message ? sub_message : '' }}</span>\r
      </p>\r
    </div>\r
  </div>\r
</ng-container>\r
`, styles: ["/* src/app/core/components/empty-stage/empty-stage.component.scss */\n.empty_stage {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #ffffff;\n  height: 100%;\n}\n.empty_stage > div {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  row-gap: var(--row_gap);\n  padding: 0.667rem;\n}\n.empty_stage > div > div:first-child {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: var(--height);\n  width: var(--width);\n  border-radius: 50%;\n}\n.empty_stage > div > div:first-child > img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.empty_stage > div > div:first-child > i {\n  color: #666677;\n  font-size: var(--icon_size);\n}\n.empty_stage > div > p {\n  font-weight: 700;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: 1em;\n  line-height: 18px;\n  color: #666677;\n}\n.empty_stage > div > p span {\n  font-weight: 400;\n}\n.circle_icon {\n  background: #eeeeee;\n}\n/*# sourceMappingURL=empty-stage.component.css.map */\n"] }]
  }], () => [], { image: [{
    type: Input
  }], icon: [{
    type: Input
  }], message: [{
    type: Input
  }], sub_message: [{
    type: Input
  }], background: [{
    type: Input
  }], params: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmptyStageComponent, { className: "EmptyStageComponent", filePath: "src/app/core/components/empty-stage/empty-stage.component.ts", lineNumber: 12 });
})();

// src/app/core/components/datatable-wrapper/datatable-wrapper.component.ts
var _c0 = (a0) => ({ $implicit: a0 });
function DatatableWrapperComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "app-spinner");
    \u0275\u0275elementEnd();
  }
}
function DatatableWrapperComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "app-empty-stage", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("message", (ctx_r0.config == null ? null : ctx_r0.config.emptyState == null ? null : ctx_r0.config.emptyState.title) || "No result found")("sub_message", (ctx_r0.config == null ? null : ctx_r0.config.emptyState == null ? null : ctx_r0.config.emptyState.subtitle) || "")("params", ctx_r0.emptyStateParams);
  }
}
function DatatableWrapperComponent_div_3_th_4_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getSortIndicator(column_r3), " ");
  }
}
function DatatableWrapperComponent_div_3_th_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 12);
    \u0275\u0275listener("click", function DatatableWrapperComponent_div_3_th_4_Template_th_click_0_listener() {
      const column_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(column_r3.sortable && ctx_r0.onSortChange({ column: column_r3 }));
    });
    \u0275\u0275elementStart(1, "span", 13);
    \u0275\u0275text(2);
    \u0275\u0275template(3, DatatableWrapperComponent_div_3_th_4_span_3_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("width", column_r3.width ? column_r3.width + "px" : "auto")("cursor", column_r3.sortable ? "pointer" : "default");
    \u0275\u0275property("ngClass", ctx_r0.getSortIndicatorClass(column_r3));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", column_r3.name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.isColumnSorted(column_r3));
  }
}
function DatatableWrapperComponent_div_3_tr_6_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DatatableWrapperComponent_div_3_tr_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, DatatableWrapperComponent_div_3_tr_6_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 18);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const row_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.rowTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c0, row_r5));
  }
}
function DatatableWrapperComponent_div_3_tr_6_ng_container_2_td_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r6 = ctx.$implicit;
    const row_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r5[column_r6.prop], " ");
  }
}
function DatatableWrapperComponent_div_3_tr_6_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, DatatableWrapperComponent_div_3_tr_6_ng_container_2_td_1_Template, 2, 1, "td", 19);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.config == null ? null : ctx_r0.config.columns)("ngForTrackBy", ctx_r0.trackByIndex);
  }
}
function DatatableWrapperComponent_div_3_tr_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 16);
    \u0275\u0275listener("click", function DatatableWrapperComponent_div_3_tr_6_Template_tr_click_0_listener() {
      const row_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onRowClick({ data: row_r5 }));
    });
    \u0275\u0275template(1, DatatableWrapperComponent_div_3_tr_6_ng_container_1_Template, 2, 4, "ng-container", 17)(2, DatatableWrapperComponent_div_3_tr_6_ng_container_2_Template, 2, 2, "ng-container", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.rowTemplate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r0.rowTemplate);
  }
}
function DatatableWrapperComponent_div_3_div_7_option_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const size_r8 = ctx.$implicit;
    \u0275\u0275property("value", size_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(size_r8);
  }
}
function DatatableWrapperComponent_div_3_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "span", 21);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 22)(4, "label", 23)(5, "span", 24);
    \u0275\u0275text(6, "Por p\xE1gina");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "select", 25);
    \u0275\u0275listener("change", function DatatableWrapperComponent_div_3_div_7_Template_select_change_7_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onLimitChange($event));
    });
    \u0275\u0275template(8, DatatableWrapperComponent_div_3_div_7_option_8_Template, 2, 2, "option", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 27)(10, "button", 28);
    \u0275\u0275listener("click", function DatatableWrapperComponent_div_3_div_7_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPrevPage());
    });
    \u0275\u0275text(11, " \u2039 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 29);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 30);
    \u0275\u0275listener("click", function DatatableWrapperComponent_div_3_div_7_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onNextPage());
    });
    \u0275\u0275text(15, " \u203A ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r0.rangeStart, "-", ctx_r0.rangeEnd, " de ", ctx_r0.config == null ? null : ctx_r0.config.totalResults, " resultados ");
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r0.config == null ? null : ctx_r0.config.limit);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.pageSizeOptions);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ((ctx_r0.config == null ? null : ctx_r0.config.page) ?? 1) <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r0.config == null ? null : ctx_r0.config.page, " / ", ctx_r0.totalPages);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !(ctx_r0.config == null ? null : ctx_r0.config.hasNext));
  }
}
function DatatableWrapperComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "table", 8)(2, "thead")(3, "tr");
    \u0275\u0275template(4, DatatableWrapperComponent_div_3_th_4_Template, 4, 7, "th", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "tbody");
    \u0275\u0275template(6, DatatableWrapperComponent_div_3_tr_6_Template, 3, 2, "tr", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, DatatableWrapperComponent_div_3_div_7_Template, 16, 9, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.config == null ? null : ctx_r0.config.columns)("ngForTrackBy", ctx_r0.trackByIndex);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.config == null ? null : ctx_r0.config.rows)("ngForTrackBy", ctx_r0.trackByIndex);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (ctx_r0.config == null ? null : ctx_r0.config.externalPaging) && ((ctx_r0.config == null ? null : ctx_r0.config.totalResults) ?? 0) > 0);
  }
}
var DatatableWrapperComponent = class _DatatableWrapperComponent {
  config;
  rowTemplate;
  /** Tema visual: `settings` alinea con listados tipo órdenes de venta */
  variant = "default";
  pageChange = new EventEmitter();
  sortChange = new EventEmitter();
  rowClick = new EventEmitter();
  // Internal state
  isMobile = false;
  currentSortColumn = null;
  currentSortDirection = "";
  sortCycleState = /* @__PURE__ */ new Map();
  // Track sort cycle state per column
  lastEmittedPage = 0;
  lastEmittedLimit = 0;
  defaultPageSizeOptions = [10, 20, 50, 100];
  // Default configuration
  defaultConfig = {
    externalPaging: true,
    externalSorting: true,
    columnMode: "force",
    reorderable: false,
    loading: false,
    emptyState: {
      title: "No result found",
      subtitle: ""
    }
  };
  // Empty state parameters for the empty-stage component
  emptyStateParams = {
    icon_size: 28,
    row_gap: 12,
    width: 52,
    height: 52,
    wrapper_icon_circle: true
  };
  constructor() {
    this.checkMobileView();
  }
  ngOnInit() {
    this.mergeConfig();
    this.checkMobileView();
  }
  ngOnChanges(changes) {
    if (changes["config"]) {
      this.mergeConfig();
    }
  }
  /**
   * Merge provided config with default config
   */
  mergeConfig() {
    if (!this.config) {
      this.config = this.defaultConfig;
    } else {
      this.config = __spreadValues(__spreadValues({}, this.defaultConfig), this.config);
    }
  }
  /**
   * Check if the current viewport is mobile
   */
  onResize() {
    this.checkMobileView();
  }
  checkMobileView() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.emptyStateParams = __spreadProps(__spreadValues({}, this.emptyStateParams), {
        width: 40,
        height: 40,
        icon_size: 20
      });
    } else {
      this.emptyStateParams = __spreadProps(__spreadValues({}, this.emptyStateParams), {
        width: 52,
        height: 52,
        icon_size: 28
      });
    }
  }
  /**
   * Handle pagination change event from ngx-datatable
   */
  onPageChange(event) {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    if (page === this.lastEmittedPage && limit === this.lastEmittedLimit) {
      return;
    }
    this.lastEmittedPage = page;
    this.lastEmittedLimit = limit;
    const paginationEvent = {
      page,
      limit
    };
    this.pageChange.emit(paginationEvent);
  }
  /**
   * Handle sort change event from ngx-datatable
   */
  onSortChange(event) {
    if (!event.column) {
      return;
    }
    const column = event.column;
    const columnProp = column.prop;
    const currentState = this.sortCycleState.get(columnProp) || 0;
    const nextState = (currentState + 1) % 3;
    this.sortCycleState.set(columnProp, nextState);
    this.sortCycleState.forEach((_, key) => {
      if (key !== columnProp) {
        this.sortCycleState.set(key, 0);
      }
    });
    let direction = "";
    if (nextState === 1) {
      direction = "asc";
    } else if (nextState === 2) {
      direction = "desc";
    }
    this.currentSortColumn = column;
    this.currentSortDirection = direction;
    const sortEvent = {
      column: {
        name: column.name,
        prop: column.prop,
        width: column.width,
        sortable: column.sortable,
        canAutoResize: column.canAutoResize
      },
      direction
    };
    this.sortChange.emit(sortEvent);
  }
  /**
   * Handle row click event
   */
  onRowClick(event) {
    if (event.target && this.isInteractiveElement(event.target)) {
      return;
    }
    console.log("Row clicked:", event);
    this.rowClick.emit(event);
  }
  /**
   * Check if the clicked element is interactive (button, link, etc.)
   */
  isInteractiveElement(element) {
    const interactiveSelectors = ["button", "a", "input", "select", "textarea"];
    if (interactiveSelectors.includes(element.tagName.toLowerCase())) {
      return true;
    }
    if (element.closest('button, a, [role="button"]')) {
      return true;
    }
    return false;
  }
  /**
   * Get the sort direction indicator for a column
   */
  getSortIndicator(column) {
    if (this.currentSortColumn?.prop !== column.prop) {
      return "";
    }
    if (this.currentSortDirection === "asc") {
      return "\u2191";
    } else if (this.currentSortDirection === "desc") {
      return "\u2193";
    }
    return "";
  }
  /**
   * Check if a column is currently sorted
   */
  isColumnSorted(column) {
    return this.currentSortColumn?.prop === column.prop && this.currentSortDirection !== "";
  }
  /**
   * Get the CSS class for the sort indicator
   */
  getSortIndicatorClass(column) {
    if (!this.isColumnSorted(column)) {
      return "";
    }
    if (this.currentSortDirection === "asc") {
      return this.config?.cssClasses?.sortAscending || "sort-asc";
    } else {
      return this.config?.cssClasses?.sortDescending || "sort-desc";
    }
  }
  /**
   * Track by function for ngFor optimization
   */
  trackByIndex(index) {
    return index;
  }
  get pageSizeOptions() {
    const options = this.config?.pageSizeOptions;
    return options?.length ? options : this.defaultPageSizeOptions;
  }
  get totalPages() {
    const limit = this.config?.limit || 20;
    const total = this.config?.totalResults ?? 0;
    if (total <= 0)
      return 1;
    return Math.ceil(total / limit);
  }
  get rangeStart() {
    const total = this.config?.totalResults ?? 0;
    if (total <= 0)
      return 0;
    const page = this.config?.page || 1;
    const limit = this.config?.limit || 20;
    return (page - 1) * limit + 1;
  }
  get rangeEnd() {
    const total = this.config?.totalResults ?? 0;
    if (total <= 0)
      return 0;
    const page = this.config?.page || 1;
    const limit = this.config?.limit || 20;
    return Math.min(page * limit, total);
  }
  onLimitChange(event) {
    const limit = Number(event.target.value);
    if (!limit || limit === this.config?.limit) {
      return;
    }
    this.pageChange.emit({ page: 1, limit });
  }
  /**
   * Handle next page
   */
  onNextPage() {
    if (this.config?.hasNext) {
      const nextPage = (this.config.page || 1) + 1;
      const paginationEvent = {
        page: nextPage,
        limit: this.config.limit
      };
      this.pageChange.emit(paginationEvent);
    }
  }
  /**
   * Handle previous page
   */
  onPrevPage() {
    if ((this.config?.page || 1) > 1) {
      const prevPage = (this.config.page || 1) - 1;
      const paginationEvent = {
        page: prevPage,
        limit: this.config.limit
      };
      this.pageChange.emit(paginationEvent);
    }
  }
  static \u0275fac = function DatatableWrapperComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DatatableWrapperComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DatatableWrapperComponent, selectors: [["app-datatable-wrapper"]], hostBindings: function DatatableWrapperComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function DatatableWrapperComponent_resize_HostBindingHandler() {
        return ctx.onResize();
      }, \u0275\u0275resolveWindow);
    }
  }, inputs: { config: "config", rowTemplate: "rowTemplate", variant: "variant" }, outputs: { pageChange: "pageChange", sortChange: "sortChange", rowClick: "rowClick" }, features: [\u0275\u0275NgOnChangesFeature], decls: 4, vars: 5, consts: [[1, "datatable-wrapper"], ["class", "loading-overlay", 4, "ngIf"], ["class", "empty-state-container", 4, "ngIf"], ["class", "datatable-container", 4, "ngIf"], [1, "loading-overlay"], [1, "empty-state-container"], [3, "message", "sub_message", "params"], [1, "datatable-container"], [1, "datatable-table"], [3, "width", "ngClass", "cursor", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "datatable-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "pagination-controls", 4, "ngIf"], [3, "click", "ngClass"], [1, "column-header"], ["class", "sort-indicator", 4, "ngIf"], [1, "sort-indicator"], [1, "datatable-row", 3, "click"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "pagination-controls"], [1, "pagination-summary"], [1, "pagination-actions"], ["for", "datatable-page-size", 1, "pagination-per-page"], [1, "pagination-per-page__label"], ["id", "datatable-page-size", 1, "pagination-per-page__select", 3, "change", "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "pagination-nav"], ["type", "button", "aria-label", "P\xE1gina anterior", 1, "pagination-nav__btn", 3, "click", "disabled"], [1, "pagination-nav__indicator"], ["type", "button", "aria-label", "P\xE1gina siguiente", 1, "pagination-nav__btn", 3, "click", "disabled"], [3, "value"]], template: function DatatableWrapperComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, DatatableWrapperComponent_div_1_Template, 2, 0, "div", 1)(2, DatatableWrapperComponent_div_2_Template, 2, 3, "div", 2)(3, DatatableWrapperComponent_div_3_Template, 8, 5, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("datatable-wrapper--settings", ctx.variant === "settings");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.config == null ? null : ctx.config.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !(ctx.config == null ? null : ctx.config.loading) && (!(ctx.config == null ? null : ctx.config.rows) || (ctx.config == null ? null : ctx.config.rows.length) === 0));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !(ctx.config == null ? null : ctx.config.loading) && (ctx.config == null ? null : ctx.config.rows) && (ctx.config == null ? null : ctx.config.rows.length) > 0);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, SpinnerComponent, EmptyStageComponent], styles: [`@charset "UTF-8";



.datatable-wrapper[_ngcontent-%COMP%] {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}
.datatable-wrapper[_ngcontent-%COMP%]   .loading-overlay[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 10;
  border-radius: 4px;
}
.datatable-wrapper[_ngcontent-%COMP%]   .empty-state-container[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%] {
  flex: 1;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {
  background-color: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  padding: 10px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
  -webkit-user-select: none;
  user-select: none;
  background-color: #f9fafb;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header[_ngcontent-%COMP%]:hover {
  color: #1f2937;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header[_ngcontent-%COMP%]   .sort-indicator[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: bold;
  color: #6366f1;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header.sort-asc[_ngcontent-%COMP%], 
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header.sort-desc[_ngcontent-%COMP%] {
  color: #6366f1;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.15s ease;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background-color: #f9fafb;
  cursor: pointer;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 10px !important;
  color: #4b5563;
  vertical-align: middle;
  background-color: #ffffff;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {
  text-align: center;
}
.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px 16px;
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 8px 8px;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-summary[_ngcontent-%COMP%] {
  font-size: 12px;
  line-height: 1.4;
  color: #9ca3af;
  white-space: nowrap;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-actions[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-per-page[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  cursor: pointer;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-per-page__label[_ngcontent-%COMP%] {
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-per-page__select[_ngcontent-%COMP%] {
  width: 56px;
  height: 32px;
  padding: 0 24px 0 10px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  line-height: 32px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  transition: border-color 0.15s ease;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-per-page__select[_ngcontent-%COMP%]:hover {
  border-color: #d1d5db;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-per-page__select[_ngcontent-%COMP%]:focus {
  outline: none;
  border-color: #d1d5db;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-nav[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-nav__indicator[_ngcontent-%COMP%] {
  min-width: 44px;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-nav__btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 18px;
  line-height: 1;
  font-weight: 400;
  color: #6b7280;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background-color 0.15s ease;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-nav__btn[_ngcontent-%COMP%]:hover:not(:disabled) {
  border-color: #d1d5db;
  color: #374151;
  background-color: #f9fafb;
}
.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-nav__btn[_ngcontent-%COMP%]:disabled {
  color: #d1d5db;
  border-color: #f3f4f6;
  background-color: #fafafa;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%] {
    border-radius: 6px;
  }
  .datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%] {
    font-size: 13px;
  }
  .datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
    padding: 10px;
    font-size: 12px;
  }
  .datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
    padding: 10px !important;
    font-size: 12px;
  }
  .datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%] {
    padding: 10px 12px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-summary[_ngcontent-%COMP%] {
    width: 100%;
  }
  .datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-actions[_ngcontent-%COMP%] {
    width: 100%;
    justify-content: space-between;
    gap: 12px;
  }
}
  .datatable-row td {
  padding: 10px !important;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%] {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%] {
  font-size: 0.875rem;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0;
  text-transform: none;
  background-color: #f9fafb;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header[_ngcontent-%COMP%]:hover {
  color: #374151;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .sort-indicator[_ngcontent-%COMP%] {
  color: #6b7280;
  font-weight: 600;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f3f4f6;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background-color: #f9fafb;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 0.625rem 1rem !important;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: left;
  vertical-align: middle;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%] {
  border-top: 1px solid #f3f4f6;
}
.datatable-wrapper--settings[_ngcontent-%COMP%]     .datatable-row td {
  padding: 0.625rem 1rem !important;
}
/*# sourceMappingURL=datatable-wrapper.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableWrapperComponent, [{
    type: Component,
    args: [{ selector: "app-datatable-wrapper", standalone: true, imports: [CommonModule, SpinnerComponent, EmptyStageComponent], template: `<div class="datatable-wrapper" [class.datatable-wrapper--settings]="variant === 'settings'">\r
  <!-- Loading Indicator -->\r
  <div *ngIf="config?.loading" class="loading-overlay">\r
    <app-spinner></app-spinner>\r
  </div>\r
\r
  <!-- Empty State -->\r
  <div *ngIf="!config?.loading && (!config?.rows || config?.rows.length === 0)" class="empty-state-container">\r
    <app-empty-stage\r
      [message]="config?.emptyState?.title || 'No result found'"\r
      [sub_message]="config?.emptyState?.subtitle || ''"\r
      [params]="emptyStateParams"\r
    ></app-empty-stage>\r
  </div>\r
\r
  <!-- Data Table -->\r
  <div *ngIf="!config?.loading && config?.rows && config?.rows.length > 0" class="datatable-container">\r
    <table class="datatable-table">\r
      <thead>\r
        <tr>\r
          <th *ngFor="let column of config?.columns; trackBy: trackByIndex" \r
              [style.width]="column.width ? column.width + 'px' : 'auto'"\r
              [ngClass]="getSortIndicatorClass(column)"\r
              [style.cursor]="column.sortable ? 'pointer' : 'default'"\r
              (click)="column.sortable && onSortChange({ column: column })">\r
            <span class="column-header">\r
              {{ column.name }}\r
              <span class="sort-indicator" *ngIf="isColumnSorted(column)">\r
                {{ getSortIndicator(column) }}\r
              </span>\r
            </span>\r
          </th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        <tr *ngFor="let row of config?.rows; trackBy: trackByIndex" \r
            (click)="onRowClick({ data: row })"\r
            class="datatable-row">\r
          <ng-container *ngIf="rowTemplate">\r
            <ng-container *ngTemplateOutlet="rowTemplate; context: { $implicit: row }"></ng-container>\r
          </ng-container>\r
          <ng-container *ngIf="!rowTemplate">\r
            <td *ngFor="let column of config?.columns; trackBy: trackByIndex">\r
              {{ row[column.prop] }}\r
            </td>\r
          </ng-container>\r
        </tr>\r
      </tbody>\r
    </table>\r
\r
    <div\r
      class="pagination-controls"\r
      *ngIf="config?.externalPaging && (config?.totalResults ?? 0) > 0">\r
      <span class="pagination-summary">\r
        {{ rangeStart }}-{{ rangeEnd }} de {{ config?.totalResults }} resultados\r
      </span>\r
\r
      <div class="pagination-actions">\r
        <label class="pagination-per-page" for="datatable-page-size">\r
          <span class="pagination-per-page__label">Por p\xE1gina</span>\r
          <select\r
            id="datatable-page-size"\r
            class="pagination-per-page__select"\r
            [value]="config?.limit"\r
            (change)="onLimitChange($event)">\r
            <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>\r
          </select>\r
        </label>\r
\r
        <div class="pagination-nav">\r
          <button\r
            type="button"\r
            class="pagination-nav__btn"\r
            aria-label="P\xE1gina anterior"\r
            [disabled]="(config?.page ?? 1) <= 1"\r
            (click)="onPrevPage()">\r
            \u2039\r
          </button>\r
          <span class="pagination-nav__indicator">{{ config?.page }} / {{ totalPages }}</span>\r
          <button\r
            type="button"\r
            class="pagination-nav__btn"\r
            aria-label="P\xE1gina siguiente"\r
            [disabled]="!config?.hasNext"\r
            (click)="onNextPage()">\r
            \u203A\r
          </button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: [`@charset "UTF-8";

/* src/app/core/components/datatable-wrapper/datatable-wrapper.component.scss */
.datatable-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}
.datatable-wrapper .loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 10;
  border-radius: 4px;
}
.datatable-wrapper .empty-state-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
}
.datatable-wrapper .datatable-container {
  flex: 1;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
}
.datatable-wrapper .datatable-container .datatable-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.datatable-wrapper .datatable-container .datatable-table thead {
  background-color: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}
.datatable-wrapper .datatable-container .datatable-table thead th {
  padding: 10px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
  -webkit-user-select: none;
  user-select: none;
  background-color: #f9fafb;
}
.datatable-wrapper .datatable-container .datatable-table thead th .column-header {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.datatable-wrapper .datatable-container .datatable-table thead th .column-header:hover {
  color: #1f2937;
}
.datatable-wrapper .datatable-container .datatable-table thead th .column-header .sort-indicator {
  font-size: 12px;
  font-weight: bold;
  color: #6366f1;
}
.datatable-wrapper .datatable-container .datatable-table thead th .column-header.sort-asc,
.datatable-wrapper .datatable-container .datatable-table thead th .column-header.sort-desc {
  color: #6366f1;
}
.datatable-wrapper .datatable-container .datatable-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.15s ease;
}
.datatable-wrapper .datatable-container .datatable-table tbody tr:hover {
  background-color: #f9fafb;
  cursor: pointer;
}
.datatable-wrapper .datatable-container .datatable-table tbody tr:last-child {
  border-bottom: none;
}
.datatable-wrapper .datatable-container .datatable-table tbody tr td {
  padding: 10px !important;
  color: #4b5563;
  vertical-align: middle;
  background-color: #ffffff;
}
.datatable-wrapper .datatable-container .datatable-table tbody tr td:last-child {
  text-align: center;
}
.datatable-wrapper .datatable-container .datatable-table tbody tr td p {
  margin: 0;
}
.datatable-wrapper .pagination-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 14px 16px;
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 8px 8px;
}
.datatable-wrapper .pagination-controls .pagination-summary {
  font-size: 12px;
  line-height: 1.4;
  color: #9ca3af;
  white-space: nowrap;
}
.datatable-wrapper .pagination-controls .pagination-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}
.datatable-wrapper .pagination-controls .pagination-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  cursor: pointer;
}
.datatable-wrapper .pagination-controls .pagination-per-page__label {
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
}
.datatable-wrapper .pagination-controls .pagination-per-page__select {
  width: 56px;
  height: 32px;
  padding: 0 24px 0 10px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  line-height: 32px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  transition: border-color 0.15s ease;
}
.datatable-wrapper .pagination-controls .pagination-per-page__select:hover {
  border-color: #d1d5db;
}
.datatable-wrapper .pagination-controls .pagination-per-page__select:focus {
  outline: none;
  border-color: #d1d5db;
}
.datatable-wrapper .pagination-controls .pagination-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}
.datatable-wrapper .pagination-controls .pagination-nav__indicator {
  min-width: 44px;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
}
.datatable-wrapper .pagination-controls .pagination-nav__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 18px;
  line-height: 1;
  font-weight: 400;
  color: #6b7280;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background-color 0.15s ease;
}
.datatable-wrapper .pagination-controls .pagination-nav__btn:hover:not(:disabled) {
  border-color: #d1d5db;
  color: #374151;
  background-color: #f9fafb;
}
.datatable-wrapper .pagination-controls .pagination-nav__btn:disabled {
  color: #d1d5db;
  border-color: #f3f4f6;
  background-color: #fafafa;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .datatable-wrapper .datatable-container {
    border-radius: 6px;
  }
  .datatable-wrapper .datatable-container .datatable-table {
    font-size: 13px;
  }
  .datatable-wrapper .datatable-container .datatable-table thead th {
    padding: 10px;
    font-size: 12px;
  }
  .datatable-wrapper .datatable-container .datatable-table tbody tr td {
    padding: 10px !important;
    font-size: 12px;
  }
  .datatable-wrapper .pagination-controls {
    padding: 10px 12px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .datatable-wrapper .pagination-controls .pagination-summary {
    width: 100%;
  }
  .datatable-wrapper .pagination-controls .pagination-actions {
    width: 100%;
    justify-content: space-between;
    gap: 12px;
  }
}
::ng-deep .datatable-row td {
  padding: 10px !important;
}
.datatable-wrapper--settings .datatable-container {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
}
.datatable-wrapper--settings .datatable-table {
  font-size: 0.875rem;
}
.datatable-wrapper--settings .datatable-table thead {
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}
.datatable-wrapper--settings .datatable-table thead th {
  padding: 0.75rem 1rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 0;
  text-transform: none;
  background-color: #f9fafb;
}
.datatable-wrapper--settings .datatable-table thead th .column-header:hover {
  color: #374151;
}
.datatable-wrapper--settings .datatable-table thead th .sort-indicator {
  color: #6b7280;
  font-weight: 600;
}
.datatable-wrapper--settings .datatable-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
}
.datatable-wrapper--settings .datatable-table tbody tr:hover {
  background-color: #f9fafb;
}
.datatable-wrapper--settings .datatable-table tbody tr:last-child {
  border-bottom: none;
}
.datatable-wrapper--settings .datatable-table tbody tr td {
  padding: 0.625rem 1rem !important;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: left;
  vertical-align: middle;
}
.datatable-wrapper--settings .pagination-controls {
  border-top: 1px solid #f3f4f6;
}
.datatable-wrapper--settings ::ng-deep .datatable-row td {
  padding: 0.625rem 1rem !important;
}
/*# sourceMappingURL=datatable-wrapper.component.css.map */
`] }]
  }], () => [], { config: [{
    type: Input
  }], rowTemplate: [{
    type: Input
  }], variant: [{
    type: Input
  }], pageChange: [{
    type: Output
  }], sortChange: [{
    type: Output
  }], rowClick: [{
    type: Output
  }], onResize: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DatatableWrapperComponent, { className: "DatatableWrapperComponent", filePath: "src/app/core/components/datatable-wrapper/datatable-wrapper.component.ts", lineNumber: 30 });
})();

export {
  DatatableWrapperComponent
};
//# sourceMappingURL=chunk-QC5NG4X3.js.map
