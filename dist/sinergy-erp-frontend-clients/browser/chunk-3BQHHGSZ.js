import {
  DefaultValueAccessor,
  FormControlDirective,
  NgControlStatus,
  ReactiveFormsModule
} from "./chunk-TXPVZZCM.js";
import {
  NgClass
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  debounceTime,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/input/input.component.ts
function InputComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function InputComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 1);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, InputComponent_Conditional_1_Conditional_2_Template, 2, 0, "span", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("for", ctx_r0.inputId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showError ? 2 : -1);
  }
}
function InputComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 6);
    \u0275\u0275listener("input", function InputComponent_Conditional_2_Template_input_input_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r0.form_control && ctx_r0.onInputChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("id", ctx_r0.inputId)("type", ctx_r0.type)("placeholder", ctx_r0.placeholder)("formControl", ctx_r0.form_control)("readonly", ctx_r0.readonly)("ngClass", ctx_r0.showError ? "border-red-400 focus:ring-red-500 focus:border-red-500" : ctx_r0.readonly ? "border-gray-300 bg-gray-50 text-gray-600" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500");
    \u0275\u0275attribute("aria-describedby", ctx_r0.showError ? ctx_r0.errorId : null)("aria-invalid", ctx_r0.showError);
  }
}
function InputComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 7);
    \u0275\u0275listener("input", function InputComponent_Conditional_3_Template_textarea_input_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r0.form_control && ctx_r0.onInputChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("id", ctx_r0.inputId)("placeholder", ctx_r0.placeholder)("formControl", ctx_r0.form_control)("readonly", ctx_r0.readonly)("ngClass", ctx_r0.showError ? "border-red-400 focus:ring-red-500 focus:border-red-500" : ctx_r0.readonly ? "border-gray-300 bg-gray-50 text-gray-600" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500");
    \u0275\u0275attribute("aria-describedby", ctx_r0.showError ? ctx_r0.errorId : null)("aria-invalid", ctx_r0.showError);
  }
}
function InputComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
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
var InputComponent = class _InputComponent {
  label = "";
  placeholder = "";
  disabled = "";
  readonly = false;
  form_control;
  type = "text";
  has_error = false;
  debounce = 0;
  change = new EventEmitter();
  subscription;
  // Generate unique ID for aria-describedby
  static idCounter = 0;
  inputId;
  errorId;
  ngOnChanges(changes) {
    if (changes.disabled) {
      changes.disabled.currentValue ? this.form_control.disable() : this.form_control.enable();
    }
  }
  ngOnInit() {
    _InputComponent.idCounter++;
    this.inputId = `input-${_InputComponent.idCounter}`;
    this.errorId = `error-${_InputComponent.idCounter}`;
    if (this.form_control) {
      this.subscription = this.form_control.valueChanges.pipe(debounceTime(this.debounce)).subscribe((value) => {
        this.change.emit(value);
      });
    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  onInputChange(event) {
    const value = event.target.value;
    this.change.emit(value);
  }
  get showError() {
    return this.has_error || !!this.form_control && this.form_control.invalid && this.form_control.touched;
  }
  get errorMessage() {
    if (!this.showError || !this.form_control?.errors) {
      return "";
    }
    const errors = this.form_control.errors;
    if (errors["required"]) {
      return "Este campo es obligatorio";
    }
    if (errors["min"]) {
      return `El valor m\xEDnimo es ${errors["min"].min}`;
    }
    if (errors["max"]) {
      return `El valor m\xE1ximo es ${errors["max"].max}`;
    }
    if (errors["email"]) {
      return "Ingresa un email v\xE1lido";
    }
    if (errors["pattern"]) {
      return "El formato no es v\xE1lido";
    }
    return "Este campo tiene un error";
  }
  static \u0275fac = function InputComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InputComponent, selectors: [["app-input"]], inputs: { label: "label", placeholder: "placeholder", disabled: "disabled", readonly: "readonly", form_control: "form_control", type: "type", has_error: "has_error", debounce: "debounce" }, outputs: { change: "change" }, features: [\u0275\u0275NgOnChangesFeature], decls: 5, vars: 6, consts: [[1, "w-full", "p-1"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "w-full", "rounded-lg", "border", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", 3, "id", "type", "placeholder", "formControl", "readonly", "ngClass"], ["rows", "4", 1, "w-full", "rounded-lg", "border", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", 3, "id", "placeholder", "formControl", "readonly", "ngClass"], ["role", "alert", 1, "mt-1", "text-sm", "text-red-600", 3, "id"], [1, "text-red-500"], [1, "w-full", "rounded-lg", "border", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", 3, "input", "id", "type", "placeholder", "formControl", "readonly", "ngClass"], ["rows", "4", 1, "w-full", "rounded-lg", "border", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", 3, "input", "id", "placeholder", "formControl", "readonly", "ngClass"]], template: function InputComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, InputComponent_Conditional_1_Template, 3, 3, "label", 1);
      \u0275\u0275conditionalCreate(2, InputComponent_Conditional_2_Template, 1, 8, "input", 2);
      \u0275\u0275conditionalCreate(3, InputComponent_Conditional_3_Template, 1, 7, "textarea", 3);
      \u0275\u0275conditionalCreate(4, InputComponent_Conditional_4_Template, 2, 2, "p", 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.showError ? "text-red-600" : "");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.label ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.type == "text" || ctx.type == "number" || ctx.type == "time" || ctx.type == "date" ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.type == "textarea" ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showError && ctx.errorMessage ? 4 : -1);
    }
  }, dependencies: [ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective, NgClass], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.error[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: red;\n}\n.error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.error[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.error[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  border: 1px solid red;\n}\ninput[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\ninput[type=text][_ngcontent-%COMP%], \ninput[type=number][_ngcontent-%COMP%], \ninput[type=time][_ngcontent-%COMP%], \ninput[type=date][_ngcontent-%COMP%], \ntextarea[_ngcontent-%COMP%] {\n  background-color: white;\n}\n/*# sourceMappingURL=input.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputComponent, [{
    type: Component,
    args: [{ selector: "app-input", standalone: true, imports: [ReactiveFormsModule, NgClass], template: `<div class="w-full p-1" [class]="showError ? 'text-red-600' : ''">\r
  @if (label) {\r
    <label [attr.for]="inputId" class="block text-sm font-medium text-gray-700 mb-1">\r
      {{ label }}\r
      @if (showError) {\r
        <span class="text-red-500">*</span>\r
      }\r
    </label>\r
  }\r
\r
  @if (type == 'text' || type == 'number' || type == 'time' || type == 'date') {\r
    <input\r
      [id]="inputId"\r
      [type]="type"\r
      [placeholder]="placeholder"\r
      [formControl]="form_control"\r
      [readonly]="readonly"\r
      (input)="!form_control && onInputChange($event)"\r
      [attr.aria-describedby]="showError ? errorId : null"\r
      [attr.aria-invalid]="showError"\r
      class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"\r
      [ngClass]="showError\r
        ? 'border-red-400 focus:ring-red-500 focus:border-red-500'\r
        : readonly\r
        ? 'border-gray-300 bg-gray-50 text-gray-600'\r
        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'"\r
    />\r
  }\r
\r
  @if (type == 'textarea') {\r
    <textarea\r
      [id]="inputId"\r
      rows="4"\r
      [placeholder]="placeholder"\r
      [formControl]="form_control"\r
      [readonly]="readonly"\r
      (input)="!form_control && onInputChange($event)"\r
      [attr.aria-describedby]="showError ? errorId : null"\r
      [attr.aria-invalid]="showError"\r
      class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"\r
      [ngClass]="showError\r
        ? 'border-red-400 focus:ring-red-500 focus:border-red-500'\r
        : readonly\r
        ? 'border-gray-300 bg-gray-50 text-gray-600'\r
        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'"\r
    ></textarea>\r
  }\r
  \r
  @if (showError && errorMessage) {\r
    <p [id]="errorId" class="mt-1 text-sm text-red-600" role="alert">\r
      {{ errorMessage }}\r
    </p>\r
  }\r
</div>\r
`, styles: ["/* src/app/core/components/input/input.component.scss */\n.container {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.container label {\n  font-size: 14px;\n}\n.error label {\n  color: red;\n}\n.error input,\n.error select,\n.error textarea {\n  border: 1px solid red;\n}\ninput:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\ninput[type=text],\ninput[type=number],\ninput[type=time],\ninput[type=date],\ntextarea {\n  background-color: white;\n}\n/*# sourceMappingURL=input.component.css.map */\n"] }]
  }], null, { label: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], disabled: [{
    type: Input
  }], readonly: [{
    type: Input
  }], form_control: [{
    type: Input
  }], type: [{
    type: Input
  }], has_error: [{
    type: Input
  }], debounce: [{
    type: Input
  }], change: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InputComponent, { className: "InputComponent", filePath: "src/app/core/components/input/input.component.ts", lineNumber: 13 });
})();

export {
  InputComponent
};
//# sourceMappingURL=chunk-3BQHHGSZ.js.map
