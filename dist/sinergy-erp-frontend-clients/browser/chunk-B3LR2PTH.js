import {
  InputComponent
} from "./chunk-3BQHHGSZ.js";
import {
  FormControl,
  ReactiveFormsModule
} from "./chunk-TXPVZZCM.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  __spreadProps,
  __spreadValues,
  debounceTime,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/search/search.component.ts
function SearchComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "i", 3);
    \u0275\u0275listener("click", function SearchComponent_Conditional_2_Template_i_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clear());
    });
    \u0275\u0275elementEnd();
  }
}
var SearchComponent = class _SearchComponent {
  router;
  route;
  search = new FormControl();
  subscription;
  default_value;
  placeholder = "Search";
  label = null;
  param_activate = false;
  param_name = "search";
  searchChange = new EventEmitter();
  constructor(router, route) {
    this.router = router;
    this.route = route;
  }
  ngOnInit() {
    this.subscription = this.search.valueChanges.pipe(debounceTime(600)).subscribe((value) => {
      if (typeof value != "undefined") {
        this.searchChange.emit(value.trim());
        if (this.param_activate) {
          this.addQueryParam(value);
        }
      }
    });
    if (this.param_activate) {
      this.search.setValue(this.route.snapshot.queryParams[this.param_name]);
    }
  }
  ngOnChanges() {
    this.search.setValue(this.default_value);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addQueryParam(value) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: __spreadProps(__spreadValues({}, this.route.snapshot.queryParams), {
        [this.param_name]: value,
        page: 1
      }),
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
  clear() {
    this.search.setValue("");
  }
  static \u0275fac = function SearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SearchComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchComponent, selectors: [["app-search"]], inputs: { default_value: "default_value", placeholder: "placeholder", label: "label", param_activate: "param_activate", param_name: "param_name" }, outputs: { searchChange: "searchChange" }, features: [\u0275\u0275NgOnChangesFeature], decls: 3, vars: 4, consts: [[1, "search_container"], ["type", "text", 3, "label", "placeholder", "form_control"], [1, "fi", "fi-rr-cross-small", "clear-icon"], [1, "fi", "fi-rr-cross-small", "clear-icon", 3, "click"]], template: function SearchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-input", 1);
      \u0275\u0275conditionalCreate(2, SearchComponent_Conditional_2_Template, 1, 0, "i", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("label", ctx.label)("placeholder", ctx.placeholder)("form_control", ctx.search);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.search.value ? 2 : -1);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, InputComponent], styles: ["\n\n.btn[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  column-gap: 10px;\n  align-items: center;\n  justify-content: center;\n  padding: 0px 24px;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  border: none;\n  font-size: 14px;\n  height: 37px;\n}\n.search_container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\n.search_container[_ngcontent-%COMP%]     .input_container input {\n  padding-left: 12px !important;\n  height: 36px !important;\n  font-size: 14px !important;\n}\n.search_container[_ngcontent-%COMP%]   .clear-icon[_ngcontent-%COMP%] {\n  display: flex;\n  cursor: pointer;\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50px;\n  background-color: #f2f2f2;\n  padding: 4px;\n  top: 50%;\n  right: 12px;\n  height: 18px;\n  width: 18px;\n  transform: translateY(-50%);\n  z-index: 10;\n}\n.search_container[_ngcontent-%COMP%]   .clear-icon[_ngcontent-%COMP%]:hover {\n  background-color: #e5e5e5;\n}\n@media (max-width: 600px) {\n  .search_container[_ngcontent-%COMP%]   .clear-icon[_ngcontent-%COMP%] {\n    font-size: 1.385;\n  }\n}\n@media screen and (max-width: 450px) {\n  .search_container[_ngcontent-%COMP%]   .clear-icon[_ngcontent-%COMP%] {\n    right: 8px;\n    height: 16px;\n    width: 16px;\n  }\n}\n/*# sourceMappingURL=search.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SearchComponent, [{
    type: Component,
    args: [{ selector: "app-search", standalone: true, imports: [CommonModule, ReactiveFormsModule, InputComponent], template: '<div class="search_container">\r\n  <app-input\r\n    [label]="label"\r\n    [placeholder]="placeholder"\r\n    [form_control]="search"\r\n    type="text">\r\n  </app-input>\r\n\r\n  @if (search.value) {\r\n    <i class="fi fi-rr-cross-small clear-icon" (click)="clear()"></i>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/core/components/search/search.component.scss */\n.btn {\n  display: flex;\n  width: 100%;\n  column-gap: 10px;\n  align-items: center;\n  justify-content: center;\n  padding: 0px 24px;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  border: none;\n  font-size: 14px;\n  height: 37px;\n}\n.search_container {\n  position: relative;\n  width: 100%;\n}\n.search_container ::ng-deep .input_container input {\n  padding-left: 12px !important;\n  height: 36px !important;\n  font-size: 14px !important;\n}\n.search_container .clear-icon {\n  display: flex;\n  cursor: pointer;\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50px;\n  background-color: #f2f2f2;\n  padding: 4px;\n  top: 50%;\n  right: 12px;\n  height: 18px;\n  width: 18px;\n  transform: translateY(-50%);\n  z-index: 10;\n}\n.search_container .clear-icon:hover {\n  background-color: #e5e5e5;\n}\n@media (max-width: 600px) {\n  .search_container .clear-icon {\n    font-size: 1.385;\n  }\n}\n@media screen and (max-width: 450px) {\n  .search_container .clear-icon {\n    right: 8px;\n    height: 16px;\n    width: 16px;\n  }\n}\n/*# sourceMappingURL=search.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }], { default_value: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], label: [{
    type: Input
  }], param_activate: [{
    type: Input
  }], param_name: [{
    type: Input
  }], searchChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchComponent, { className: "SearchComponent", filePath: "src/app/core/components/search/search.component.ts", lineNumber: 16 });
})();

export {
  SearchComponent
};
//# sourceMappingURL=chunk-B3LR2PTH.js.map
