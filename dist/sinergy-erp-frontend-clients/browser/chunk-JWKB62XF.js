import {
  FormControl,
  FormControlDirective,
  NgControlStatus,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-TXPVZZCM.js";
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
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/select/select.component.ts
function SelectComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function SelectComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 1);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, SelectComponent_Conditional_1_Conditional_2_Template, 2, 0, "span", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("for", ctx_r0.selectId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.label ?? ctx_r0.config.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showError ? 2 : -1);
  }
}
function SelectComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 4);
    \u0275\u0275text(1, "Cargando...");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("ngValue", null);
  }
}
function SelectComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.config.all_message ? ctx_r0.config.all_message : "All");
  }
}
function SelectComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.config.placeholder, " ");
  }
}
function SelectComponent_Conditional_7_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngValue", item_r2[ctx_r0.config.value])("disabled", item_r2[ctx_r0.config.disabled_option]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2[ctx_r0.config.option], " ");
  }
}
function SelectComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, SelectComponent_Conditional_7_For_1_Template, 2, 3, "option", 10, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.config.data);
  }
}
function SelectComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "i", 11);
    \u0275\u0275listener("click", function SelectComponent_Conditional_8_Template_i_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.getRefresh());
    });
    \u0275\u0275elementEnd();
  }
}
function SelectComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("id", ctx_r0.errorId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMessage, " ");
  }
}
var SelectComponent = class _SelectComponent {
  config = {
    placeholder: "Select an option",
    value_default: null,
    all: true
  };
  set disable(value) {
    if (value) {
      this.select.disable({ emitEvent: false });
    } else {
      this.select.enable({ emitEvent: false });
    }
    this.disabled = value;
  }
  changeOption = new EventEmitter();
  refresh = new EventEmitter();
  has_error = false;
  label;
  select = new FormControl(null);
  disabled = false;
  subscription;
  // Generate unique ID for aria-describedby
  static idCounter = 0;
  selectId;
  errorId;
  constructor() {
  }
  ngOnInit() {
    _SelectComponent.idCounter++;
    this.selectId = `select-${_SelectComponent.idCounter}`;
    this.errorId = `error-${_SelectComponent.idCounter}`;
    if (this.config.form_control) {
      this.subscription = this.config.form_control.valueChanges.subscribe((value) => {
        const data = this.config.data.find((option) => option[this.config.value] === value);
        this.changeOption.emit({ value, name: this.config.name_select, data });
      });
    } else {
      this.subscription = this.select.valueChanges.subscribe((value) => {
        const data = this.config.data.find((option) => option[this.config.value] === value);
        this.changeOption.emit({ value, name: this.config.name_select, data });
      });
    }
  }
  ngOnChanges(changes) {
    if (this.config.form_control) {
      this.select.setValue(this.config.form_control.value, { onlySelf: true, emitEvent: false });
    } else {
      this.select.setValue(this.config.value_default, { onlySelf: true, emitEvent: false });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getRefresh() {
    this.config.error = false;
    this.refresh.emit();
  }
  get showError() {
    return this.has_error || this.config?.form_control?.invalid && this.config?.form_control?.touched;
  }
  get errorMessage() {
    if (!this.showError || !this.config?.form_control?.errors) {
      return "";
    }
    const errors = this.config.form_control.errors;
    if (errors["required"]) {
      return "Este campo es obligatorio";
    }
    return "Este campo tiene un error";
  }
  static \u0275fac = function SelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelectComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SelectComponent, selectors: [["app-select"]], inputs: { config: "config", disable: "disable", has_error: "has_error", label: "label" }, outputs: { changeOption: "changeOption", refresh: "refresh" }, features: [\u0275\u0275NgOnChangesFeature], decls: 10, vars: 18, consts: [[1, "container"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "select_container"], [1, "filter__control", 3, "id", "formControl", "disabled"], ["disabled", "", "selected", "", 3, "ngValue"], [3, "ngValue"], ["disabled", "", "selected", "", "hidden", "", 3, "ngValue"], [1, "ti", "ti-refresh"], ["role", "alert", 1, "mt-1", "text-sm", "text-red-600", 3, "id"], [1, "text-red-500"], [3, "ngValue", "disabled"], [1, "ti", "ti-refresh", 3, "click"]], template: function SelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, SelectComponent_Conditional_1_Template, 3, 3, "label", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "select", 3);
      \u0275\u0275conditionalCreate(4, SelectComponent_Conditional_4_Template, 2, 1, "option", 4);
      \u0275\u0275conditionalCreate(5, SelectComponent_Conditional_5_Template, 2, 2, "option", 5);
      \u0275\u0275conditionalCreate(6, SelectComponent_Conditional_6_Template, 2, 2, "option", 6);
      \u0275\u0275conditionalCreate(7, SelectComponent_Conditional_7_Template, 2, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, SelectComponent_Conditional_8_Template, 1, 0, "i", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, SelectComponent_Conditional_9_Template, 2, 2, "p", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("error", ctx.showError);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.config.label || ctx.label ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("min-height", ctx.config.height ? ctx.config.height + "px" : "100%");
      \u0275\u0275classProp("loading", ctx.config.loading);
      \u0275\u0275property("id", ctx.selectId)("formControl", ctx.config.form_control ? ctx.config.form_control : ctx.select)("disabled", ctx.config.loading);
      \u0275\u0275attribute("aria-describedby", ctx.showError ? ctx.errorId : null)("aria-invalid", ctx.showError);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.config.loading ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.config.loading && ctx.config.all ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.config.loading && !ctx.config.all ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.config.loading ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.config.error ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showError && ctx.errorMessage ? 9 : -1);
    }
  }, dependencies: [ReactiveFormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, FormControlDirective, CommonModule], styles: ["\n\n.btn[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  column-gap: 10px;\n  align-items: center;\n  justify-content: center;\n  padding: 0px 24px;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  border: none;\n  font-size: 14px;\n  height: 37px;\n}\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.container[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.select_container[_ngcontent-%COMP%] {\n  flex: 1;\n  border-radius: 3px;\n  position: relative;\n  display: flex;\n  column-gap: 8px;\n  align-items: center;\n}\n.select_container[_ngcontent-%COMP%]   .fi-rr-refresh[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.select_container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 37px;\n  padding: 8px;\n  border: none;\n  background-color: #fff;\n  color: #131523;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-weight: 400;\n  font-size: 14px;\n  transition: 0.2s ease all;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n  outline: none;\n  cursor: pointer;\n  padding-right: 25px;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWNoZXZyb24tZG93biIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+);\n  background-repeat: no-repeat;\n  background-position: right 0.7em top 50%, 0 0;\n  background-size: 20px auto, 100%;\n  flex: 1;\n}\n.select_container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover {\n  border-color: #9ca3af;\n}\n.select_container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.select_container[_ngcontent-%COMP%]   select.loading[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  cursor: wait;\n}\n.select_container[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled {\n  background-color: #f9fafb;\n  cursor: wait;\n}\n.select_container[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%] {\n  border-color: #d2d4de;\n  background-color: #e6e9f4;\n  color: #7e84a3;\n  cursor: not-allowed;\n}\n.error[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: red;\n}\n.error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.error[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.error[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid red;\n}\n/*# sourceMappingURL=select.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectComponent, [{
    type: Component,
    args: [{ selector: "app-select", standalone: true, imports: [ReactiveFormsModule, CommonModule], template: `<div class="container" [class.error]="showError">\r
  @if (config.label || label) {\r
    <label [attr.for]="selectId" class="block text-sm font-medium text-gray-700 mb-1">\r
      {{label ?? config.label}}@if (showError) {\r
      <span class="text-red-500">*</span>\r
    }\r
  </label>\r
}\r
<div class="select_container">\r
  <select\r
    [id]="selectId"\r
    class="filter__control"\r
    [class.loading]="config.loading"\r
    [formControl]="config.form_control ? config.form_control : select"\r
    [style.min-height]="config.height ? config.height + 'px' : '100%'"\r
    [disabled]="config.loading"\r
    [attr.aria-describedby]="showError ? errorId : null"\r
    [attr.aria-invalid]="showError"\r
    >\r
    @if (config.loading) {\r
      <option [ngValue]="null" disabled selected>Cargando...</option>\r
    }\r
    @if (!config.loading && config.all) {\r
      <option [ngValue]="null">{{ config.all_message ? config.all_message : 'All' }}</option>\r
    }\r
    @if (!config.loading && !config.all) {\r
      <option [ngValue]="null" disabled selected hidden>\r
        {{ config.placeholder }}\r
      </option>\r
    }\r
    @if (!config.loading) {\r
      @for (item of config.data; track item) {\r
        <option [ngValue]="item[config.value]" [disabled]="item[config.disabled_option]">\r
          {{ item[config.option] }}\r
        </option>\r
      }\r
    }\r
  </select>\r
  @if (config.error) {\r
    <i class="ti ti-refresh" (click)="getRefresh()"></i>\r
  }\r
</div>\r
@if (showError && errorMessage) {\r
  <p [id]="errorId" class="mt-1 text-sm text-red-600" role="alert">\r
    {{ errorMessage }}\r
  </p>\r
}\r
</div>\r
`, styles: ["/* src/app/core/components/select/select.component.scss */\n.btn {\n  display: flex;\n  width: 100%;\n  column-gap: 10px;\n  align-items: center;\n  justify-content: center;\n  padding: 0px 24px;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  border: none;\n  font-size: 14px;\n  height: 37px;\n}\n.container {\n  display: flex;\n  flex-direction: column;\n}\n.container > label {\n  font-size: 14px;\n}\n.select_container {\n  flex: 1;\n  border-radius: 3px;\n  position: relative;\n  display: flex;\n  column-gap: 8px;\n  align-items: center;\n}\n.select_container .fi-rr-refresh {\n  cursor: pointer;\n}\n.select_container select {\n  width: 100%;\n  height: 37px;\n  padding: 8px;\n  border: none;\n  background-color: #fff;\n  color: #131523;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-weight: 400;\n  font-size: 14px;\n  transition: 0.2s ease all;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n  outline: none;\n  cursor: pointer;\n  padding-right: 25px;\n  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWNoZXZyb24tZG93biIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+);\n  background-repeat: no-repeat;\n  background-position: right 0.7em top 50%, 0 0;\n  background-size: 20px auto, 100%;\n  flex: 1;\n}\n.select_container select:hover {\n  border-color: #9ca3af;\n}\n.select_container select:focus {\n  outline: none;\n  border-color: #4f46e5;\n  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);\n}\n.select_container select.loading {\n  color: #9ca3af;\n  cursor: wait;\n}\n.select_container select:disabled {\n  background-color: #f9fafb;\n  cursor: wait;\n}\n.select_container .disabled {\n  border-color: #d2d4de;\n  background-color: #e6e9f4;\n  color: #7e84a3;\n  cursor: not-allowed;\n}\n.error label {\n  color: red;\n}\n.error input,\n.error select,\n.error textarea {\n  border: 1px solid red;\n}\n/*# sourceMappingURL=select.component.css.map */\n"] }]
  }], () => [], { config: [{
    type: Input
  }], disable: [{
    type: Input
  }], changeOption: [{
    type: Output
  }], refresh: [{
    type: Output
  }], has_error: [{
    type: Input
  }], label: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SelectComponent, { className: "SelectComponent", filePath: "src/app/core/components/select/select.component.ts", lineNumber: 13 });
})();

export {
  SelectComponent
};
//# sourceMappingURL=chunk-JWKB62XF.js.map
