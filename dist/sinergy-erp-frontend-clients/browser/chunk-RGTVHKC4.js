import {
  CommonModule,
  NgForOf
} from "./chunk-BMMLV6YT.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-57S27ROJ.js";

// src/app/core/components/tab/tab.component.ts
function TabComponent_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function TabComponent_button_2_Template_button_click_0_listener() {
      const tab_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectTab(tab_r2.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", tab_r2.id === ctx_r2.activeTabId);
    \u0275\u0275attribute("aria-selected", tab_r2.id === ctx_r2.activeTabId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r2.title, " ");
  }
}
var TabComponent = class _TabComponent {
  tabs = [];
  activeTabId = "";
  tabChange = new EventEmitter();
  ngOnInit() {
    if (!this.activeTabId && this.tabs.length > 0) {
      this.activeTabId = this.tabs[0].id;
    }
  }
  selectTab(tabId) {
    this.activeTabId = tabId;
    this.tabChange.emit(tabId);
  }
  static \u0275fac = function TabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TabComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TabComponent, selectors: [["app-tab"]], inputs: { tabs: "tabs", activeTabId: "activeTabId" }, outputs: { tabChange: "tabChange" }, decls: 3, vars: 1, consts: [[1, "tab-container"], ["role", "tablist", 1, "tab-list"], ["class", "tab-button", "role", "tab", "type", "button", 3, "active", "click", 4, "ngFor", "ngForOf"], ["role", "tab", "type", "button", 1, "tab-button", 3, "click"]], template: function TabComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275template(2, TabComponent_button_2_Template, 2, 4, "button", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.tabs);
    }
  }, dependencies: [CommonModule, NgForOf], styles: ['\n\n.tab-container[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.tab-list[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  gap: 4px;\n}\n.tab-button[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 10px 20px;\n  border: none;\n  background: transparent;\n  font-size: 14px;\n  font-weight: 500;\n  color: #6b7280;\n  cursor: pointer;\n  transition: color 0.2s ease, background-color 0.2s ease;\n  white-space: nowrap;\n}\n.tab-button[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 100%;\n  height: 3px;\n  background-color: transparent;\n  transition: background-color 0.2s ease;\n  border-radius: 3px 3px 0 0;\n}\n.tab-button[_ngcontent-%COMP%]:hover {\n  color: #374151;\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.tab-button.active[_ngcontent-%COMP%] {\n  color: #3b82f6;\n  font-weight: 600;\n}\n.tab-button.active[_ngcontent-%COMP%]::after {\n  background-color: #3b82f6;\n}\n/*# sourceMappingURL=tab.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabComponent, [{
    type: Component,
    args: [{ selector: "app-tab", standalone: true, imports: [CommonModule], template: '<div class="tab-container">\r\n  <div class="tab-list" role="tablist">\r\n    <button\r\n      *ngFor="let tab of tabs"\r\n      class="tab-button"\r\n      [class.active]="tab.id === activeTabId"\r\n      role="tab"\r\n      [attr.aria-selected]="tab.id === activeTabId"\r\n      (click)="selectTab(tab.id)"\r\n      type="button">\r\n      {{ tab.title }}\r\n    </button>\r\n  </div>\r\n</div>\r\n', styles: ['/* src/app/core/components/tab/tab.component.scss */\n.tab-container {\n  width: 100%;\n}\n.tab-list {\n  display: flex;\n  border-bottom: 2px solid #e5e7eb;\n  gap: 4px;\n}\n.tab-button {\n  position: relative;\n  padding: 10px 20px;\n  border: none;\n  background: transparent;\n  font-size: 14px;\n  font-weight: 500;\n  color: #6b7280;\n  cursor: pointer;\n  transition: color 0.2s ease, background-color 0.2s ease;\n  white-space: nowrap;\n}\n.tab-button::after {\n  content: "";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 100%;\n  height: 3px;\n  background-color: transparent;\n  transition: background-color 0.2s ease;\n  border-radius: 3px 3px 0 0;\n}\n.tab-button:hover {\n  color: #374151;\n  background-color: rgba(0, 0, 0, 0.04);\n}\n.tab-button.active {\n  color: #3b82f6;\n  font-weight: 600;\n}\n.tab-button.active::after {\n  background-color: #3b82f6;\n}\n/*# sourceMappingURL=tab.component.css.map */\n'] }]
  }], null, { tabs: [{
    type: Input
  }], activeTabId: [{
    type: Input
  }], tabChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TabComponent, { className: "TabComponent", filePath: "src/app/core/components/tab/tab.component.ts", lineNumber: 16 });
})();

export {
  TabComponent
};
//# sourceMappingURL=chunk-RGTVHKC4.js.map
