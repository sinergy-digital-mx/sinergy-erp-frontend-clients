import {
  SpinnerComponent
} from "./chunk-OC6N764R.js";
import {
  CommonModule,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-GZH4LDOW.js";
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
  ɵɵpipe,
  ɵɵpipeBind2,
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
  ɵɵtextInterpolate3
} from "./chunk-7ZU2RCPO.js";

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
function DatatableWrapperComponent_div_3_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 22)(6, "button", 23);
    \u0275\u0275listener("click", function DatatableWrapperComponent_div_3_div_7_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPrevPage());
    });
    \u0275\u0275text(7, " \u2190 Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 23);
    \u0275\u0275listener("click", function DatatableWrapperComponent_div_3_div_7_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onNextPage());
    });
    \u0275\u0275text(9, " Next \u2192 ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" Page ", ctx_r0.config == null ? null : ctx_r0.config.page, " of ", \u0275\u0275pipeBind2(4, 5, (ctx_r0.config == null ? null : ctx_r0.config.totalResults) / (ctx_r0.config == null ? null : ctx_r0.config.limit), "1.0-0"), " (", ctx_r0.config == null ? null : ctx_r0.config.totalResults, " total) ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", (ctx_r0.config == null ? null : ctx_r0.config.page) === 1);
    \u0275\u0275advance(2);
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
    \u0275\u0275template(7, DatatableWrapperComponent_div_3_div_7_Template, 10, 8, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r0.config == null ? null : ctx_r0.config.columns)("ngForTrackBy", ctx_r0.trackByIndex);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r0.config == null ? null : ctx_r0.config.rows)("ngForTrackBy", ctx_r0.trackByIndex);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.config == null ? null : ctx_r0.config.externalPaging);
  }
}
var DatatableWrapperComponent = class _DatatableWrapperComponent {
  config;
  rowTemplate;
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
  }, inputs: { config: "config", rowTemplate: "rowTemplate" }, outputs: { pageChange: "pageChange", sortChange: "sortChange", rowClick: "rowClick" }, features: [\u0275\u0275NgOnChangesFeature], decls: 4, vars: 3, consts: [[1, "datatable-wrapper"], ["class", "loading-overlay", 4, "ngIf"], ["class", "empty-state-container", 4, "ngIf"], ["class", "datatable-container", 4, "ngIf"], [1, "loading-overlay"], [1, "empty-state-container"], [3, "message", "sub_message", "params"], [1, "datatable-container"], [1, "datatable-table"], [3, "width", "ngClass", "cursor", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "datatable-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "pagination-controls", 4, "ngIf"], [3, "click", "ngClass"], [1, "column-header"], ["class", "sort-indicator", 4, "ngIf"], [1, "sort-indicator"], [1, "datatable-row", 3, "click"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "pagination-controls"], [1, "pagination-info"], [1, "pagination-buttons"], [1, "pagination-btn", 3, "click", "disabled"]], template: function DatatableWrapperComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, DatatableWrapperComponent_div_1_Template, 2, 0, "div", 1)(2, DatatableWrapperComponent_div_2_Template, 2, 3, "div", 2)(3, DatatableWrapperComponent_div_3_Template, 8, 5, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.config == null ? null : ctx.config.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !(ctx.config == null ? null : ctx.config.loading) && (!(ctx.config == null ? null : ctx.config.rows) || (ctx.config == null ? null : ctx.config.rows.length) === 0));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !(ctx.config == null ? null : ctx.config.loading) && (ctx.config == null ? null : ctx.config.rows) && (ctx.config == null ? null : ctx.config.rows.length) > 0);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet, SpinnerComponent, EmptyStageComponent, DecimalPipe], styles: ["\n\n.datatable-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .loading-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0.7);\n  z-index: 10;\n  border-radius: 4px;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .empty-state-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 300px;\n  width: 100%;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-x: auto;\n  border-radius: 8px;\n  border: 1px solid #e5e7eb;\n  background-color: #ffffff;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 10px;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  user-select: none;\n  background-color: #f9fafb;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header[_ngcontent-%COMP%]   .sort-indicator[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: bold;\n  color: #6366f1;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header.sort-asc[_ngcontent-%COMP%], \n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   .column-header.sort-desc[_ngcontent-%COMP%] {\n  color: #6366f1;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #f3f4f6;\n  transition: background-color 0.15s ease;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n  cursor: pointer;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px !important;\n  color: #4b5563;\n  vertical-align: middle;\n  background-color: #ffffff;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n  text-align: center;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background-color: #f9fafb;\n  border-top: 1px solid #e5e7eb;\n  border-radius: 0 0 8px 8px;\n  gap: 16px;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-buttons[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 12px;\n  font-weight: 500;\n  color: #fff;\n  background-color: #6366f1;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-buttons[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #4f46e5;\n}\n.datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-buttons[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%]:disabled {\n  background-color: #d1d5db;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n  .datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%] {\n    border-radius: 6px;\n  }\n  .datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 10px;\n    font-size: 12px;\n  }\n  .datatable-wrapper[_ngcontent-%COMP%]   .datatable-container[_ngcontent-%COMP%]   .datatable-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 10px !important;\n    font-size: 12px;\n  }\n  .datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 10px;\n  }\n  .datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-info[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-buttons[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .datatable-wrapper[_ngcontent-%COMP%]   .pagination-controls[_ngcontent-%COMP%]   .pagination-buttons[_ngcontent-%COMP%]   .pagination-btn[_ngcontent-%COMP%] {\n    flex: 1;\n    padding: 8px 10px;\n    font-size: 11px;\n  }\n}\n  .datatable-row td {\n  padding: 10px !important;\n}\n/*# sourceMappingURL=datatable-wrapper.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatatableWrapperComponent, [{
    type: Component,
    args: [{ selector: "app-datatable-wrapper", standalone: true, imports: [CommonModule, SpinnerComponent, EmptyStageComponent], template: `<div class="datatable-wrapper">\r
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
    <!-- Pagination Controls -->\r
    <div class="pagination-controls" *ngIf="config?.externalPaging">\r
      <div class="pagination-info">\r
        <span>\r
          Page {{ config?.page }} of {{ (config?.totalResults / config?.limit) | number: '1.0-0' }}\r
          ({{ config?.totalResults }} total)\r
        </span>\r
      </div>\r
      <div class="pagination-buttons">\r
        <button \r
          class="pagination-btn"\r
          [disabled]="config?.page === 1"\r
          (click)="onPrevPage()">\r
          \u2190 Previous\r
        </button>\r
        <button \r
          class="pagination-btn"\r
          [disabled]="!config?.hasNext"\r
          (click)="onNextPage()">\r
          Next \u2192\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/core/components/datatable-wrapper/datatable-wrapper.component.scss */\n.datatable-wrapper {\n  position: relative;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.datatable-wrapper .loading-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: rgba(255, 255, 255, 0.7);\n  z-index: 10;\n  border-radius: 4px;\n}\n.datatable-wrapper .empty-state-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 300px;\n  width: 100%;\n}\n.datatable-wrapper .datatable-container {\n  flex: 1;\n  overflow-x: auto;\n  border-radius: 8px;\n  border: 1px solid #e5e7eb;\n  background-color: #ffffff;\n}\n.datatable-wrapper .datatable-container .datatable-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n.datatable-wrapper .datatable-container .datatable-table thead {\n  background-color: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.datatable-wrapper .datatable-container .datatable-table thead th {\n  padding: 10px;\n  text-align: left;\n  font-weight: 600;\n  color: #374151;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  user-select: none;\n  background-color: #f9fafb;\n}\n.datatable-wrapper .datatable-container .datatable-table thead th .column-header {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n}\n.datatable-wrapper .datatable-container .datatable-table thead th .column-header:hover {\n  color: #1f2937;\n}\n.datatable-wrapper .datatable-container .datatable-table thead th .column-header .sort-indicator {\n  font-size: 12px;\n  font-weight: bold;\n  color: #6366f1;\n}\n.datatable-wrapper .datatable-container .datatable-table thead th .column-header.sort-asc,\n.datatable-wrapper .datatable-container .datatable-table thead th .column-header.sort-desc {\n  color: #6366f1;\n}\n.datatable-wrapper .datatable-container .datatable-table tbody tr {\n  border-bottom: 1px solid #f3f4f6;\n  transition: background-color 0.15s ease;\n}\n.datatable-wrapper .datatable-container .datatable-table tbody tr:hover {\n  background-color: #f9fafb;\n  cursor: pointer;\n}\n.datatable-wrapper .datatable-container .datatable-table tbody tr:last-child {\n  border-bottom: none;\n}\n.datatable-wrapper .datatable-container .datatable-table tbody tr td {\n  padding: 10px !important;\n  color: #4b5563;\n  vertical-align: middle;\n  background-color: #ffffff;\n}\n.datatable-wrapper .datatable-container .datatable-table tbody tr td:last-child {\n  text-align: center;\n}\n.datatable-wrapper .datatable-container .datatable-table tbody tr td p {\n  margin: 0;\n}\n.datatable-wrapper .pagination-controls {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background-color: #f9fafb;\n  border-top: 1px solid #e5e7eb;\n  border-radius: 0 0 8px 8px;\n  gap: 16px;\n}\n.datatable-wrapper .pagination-controls .pagination-info {\n  font-size: 13px;\n  color: #6b7280;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n}\n.datatable-wrapper .pagination-controls .pagination-buttons {\n  display: flex;\n  gap: 8px;\n}\n.datatable-wrapper .pagination-controls .pagination-buttons .pagination-btn {\n  padding: 6px 12px;\n  font-size: 12px;\n  font-weight: 500;\n  color: #fff;\n  background-color: #6366f1;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n.datatable-wrapper .pagination-controls .pagination-buttons .pagination-btn:hover:not(:disabled) {\n  background-color: #4f46e5;\n}\n.datatable-wrapper .pagination-controls .pagination-buttons .pagination-btn:disabled {\n  background-color: #d1d5db;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n  .datatable-wrapper .datatable-container {\n    border-radius: 6px;\n  }\n  .datatable-wrapper .datatable-container .datatable-table {\n    font-size: 13px;\n  }\n  .datatable-wrapper .datatable-container .datatable-table thead th {\n    padding: 10px;\n    font-size: 12px;\n  }\n  .datatable-wrapper .datatable-container .datatable-table tbody tr td {\n    padding: 10px !important;\n    font-size: 12px;\n  }\n  .datatable-wrapper .pagination-controls {\n    padding: 10px 12px;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 10px;\n  }\n  .datatable-wrapper .pagination-controls .pagination-info {\n    font-size: 12px;\n  }\n  .datatable-wrapper .pagination-controls .pagination-buttons {\n    width: 100%;\n  }\n  .datatable-wrapper .pagination-controls .pagination-buttons .pagination-btn {\n    flex: 1;\n    padding: 8px 10px;\n    font-size: 11px;\n  }\n}\n::ng-deep .datatable-row td {\n  padding: 10px !important;\n}\n/*# sourceMappingURL=datatable-wrapper.component.css.map */\n"] }]
  }], () => [], { config: [{
    type: Input
  }], rowTemplate: [{
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DatatableWrapperComponent, { className: "DatatableWrapperComponent", filePath: "src/app/core/components/datatable-wrapper/datatable-wrapper.component.ts", lineNumber: 29 });
})();

export {
  DatatableWrapperComponent
};
//# sourceMappingURL=chunk-QW7YUBWU.js.map
