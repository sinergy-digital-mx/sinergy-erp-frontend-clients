import {
  InputComponent
} from "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import "./chunk-OC6N764R.js";
import {
  Eye,
  EyeOff,
  LucideAngularComponent,
  LucideAngularModule
} from "./chunk-XYBC4MWB.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControl,
  FormControlDirective,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators
} from "./chunk-TXPVZZCM.js";
import {
  AuthService
} from "./chunk-2BSLK6RD.js";
import {
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  NgClass,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  Input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-7ZU2RCPO.js";

// src/app/core/components/password/password.component.ts
function PasswordComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function PasswordComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 1);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, PasswordComponent_Conditional_1_Conditional_2_Template, 2, 0, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showError ? 2 : -1);
  }
}
function PasswordComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Revisa este campo.");
    \u0275\u0275elementEnd();
  }
}
var PasswordComponent = class _PasswordComponent {
  form_control;
  label;
  has_error = false;
  // opcional
  placeholder = "***********";
  eye = false;
  EyeIcon = Eye;
  EyeOffIcon = EyeOff;
  input = new FormControl("");
  subscription;
  get showError() {
    return this.has_error || !!this.form_control && this.form_control.invalid && this.form_control.touched;
  }
  ngOnInit() {
    if (this.form_control) {
      this.input.setValue(this.form_control.value ?? "", { emitEvent: false });
      this.subscription = this.input.valueChanges.subscribe((value) => {
        this.form_control.setValue(value);
      });
    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  static \u0275fac = function PasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PasswordComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PasswordComponent, selectors: [["app-password"]], inputs: { form_control: "form_control", label: "label", has_error: "has_error", placeholder: "placeholder" }, decls: 7, vars: 8, consts: [[1, "w-full"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "relative"], [1, "w-full", "rounded-lg", "border", "px-3", "py-2", "pr-10", "text-sm", "focus:outline-none", "focus:ring-2", 3, "type", "formControl", "placeholder", "ngClass"], ["type", "button", 1, "absolute", "inset-y-0", "right-0", "flex", "items-center", "px-3", "text-gray-500", "hover:text-gray-700", 3, "click"], [1, "h-5", "w-5", 3, "img"], [1, "mt-1", "text-xs", "text-red-600"], [1, "text-red-500"]], template: function PasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, PasswordComponent_Conditional_1_Template, 3, 2, "label", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275element(3, "input", 3);
      \u0275\u0275elementStart(4, "button", 4);
      \u0275\u0275listener("click", function PasswordComponent_Template_button_click_4_listener() {
        return ctx.eye = !ctx.eye;
      });
      \u0275\u0275element(5, "lucide-icon", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(6, PasswordComponent_Conditional_6_Template, 2, 0, "p", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.label ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("type", ctx.eye ? "text" : "password")("formControl", ctx.input)("placeholder", ctx.placeholder)("ngClass", ctx.showError ? "border-red-400 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.eye ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.eye ? ctx.EyeIcon : ctx.EyeOffIcon);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showError ? 6 : -1);
    }
  }, dependencies: [
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    FormControlDirective,
    NgClass,
    LucideAngularModule,
    LucideAngularComponent
  ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.input[_ngcontent-%COMP%] {\n  width: 100%;\n  position: relative;\n}\n.input[_ngcontent-%COMP%]   .ti[_ngcontent-%COMP%] {\n  position: absolute;\n  color: #222;\n  font-size: 28px;\n  right: 10px;\n  cursor: pointer;\n  top: 50%;\n  transform: translateY(-50%);\n}\n.input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 16px;\n  padding-right: 46px;\n}\n/*# sourceMappingURL=password.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PasswordComponent, [{
    type: Component,
    args: [{ selector: "app-password", standalone: true, imports: [
      ReactiveFormsModule,
      NgClass,
      LucideAngularModule
    ], template: `<div class="w-full">\r
  @if (label) {\r
    <label class="block text-sm font-medium text-gray-700 mb-1">\r
      {{ label }}\r
      @if (showError) {\r
        <span class="text-red-500">*</span>\r
      }\r
    </label>\r
  }\r
\r
  <div class="relative">\r
    <input\r
      [type]="eye ? 'text' : 'password'"\r
      [formControl]="input"\r
      [placeholder]="placeholder"\r
      class="w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2"\r
      [ngClass]="showError\r
        ? 'border-red-400 focus:ring-red-500 focus:border-red-500'\r
        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'"\r
    />\r
\r
    <button\r
    type="button"\r
    class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"\r
    (click)="eye = !eye"\r
    [attr.aria-label]="eye ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'"\r
  >\r
    <lucide-icon\r
      [img]="eye ? EyeIcon : EyeOffIcon"\r
      class="h-5 w-5"\r
    ></lucide-icon>\r
  </button>\r
  </div>\r
\r
  @if (showError) {\r
    <p class="mt-1 text-xs text-red-600">Revisa este campo.</p>\r
  }\r
</div>\r
`, styles: ["/* src/app/core/components/password/password.component.scss */\n.container {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.container label {\n  font-size: 14px;\n}\n.input {\n  width: 100%;\n  position: relative;\n}\n.input .ti {\n  position: absolute;\n  color: #222;\n  font-size: 28px;\n  right: 10px;\n  cursor: pointer;\n  top: 50%;\n  transform: translateY(-50%);\n}\n.input input {\n  width: 100%;\n  padding: 8px 16px;\n  padding-right: 46px;\n}\n/*# sourceMappingURL=password.component.css.map */\n"] }]
  }], null, { form_control: [{
    type: Input
  }], label: [{
    type: Input
  }], has_error: [{
    type: Input
  }], placeholder: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PasswordComponent, { className: "PasswordComponent", filePath: "src/app/core/components/password/password.component.ts", lineNumber: 20 });
})();

// src/app/features/auth/pages/login/login.ts
function Login_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, " Sinergy ERP ");
    \u0275\u0275elementEnd();
  }
}
function Login_p_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
var Login = class _Login {
  fb;
  router;
  authService;
  form;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  constructor(fb, router, authService) {
    this.fb = fb;
    this.router = router;
    this.authService = authService;
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        console.log("=== LOGIN RESPONSE ===");
        console.log("Full response:", res);
        console.log("Token:", res.access_token);
        localStorage.setItem(this.authService.name_token, res.access_token);
        this.authService.BuildTokensToInit();
        console.log("=== PERMISOS DEL USUARIO ===");
        console.log("Permisos extra\xEDdos:", Array.from(this.authService.permissions$.getValue()));
        console.log("Total de permisos:", this.authService.permissions$.getValue().size);
        this.router.navigate(["/"]);
      },
      error: () => {
        this.loading.set(false);
        this.error.set("Usuario o contrase\xF1a incorrectos");
      }
    });
  }
  static \u0275fac = function Login_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Login)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Login, selectors: [["app-login"]], decls: 20, vars: 5, consts: [["noLogo", ""], [1, "min-h-screen", "flex", "items-center", "justify-center", "bg-gray-100", "px-4"], [1, "w-full", "max-w-md"], [1, "bg-white", "rounded-xl", "shadow-lg", "p-8"], [1, "flex", "justify-center", "mb-6"], [1, "text-2xl", "font-semibold", "text-center", "text-gray-800"], [1, "text-sm", "text-center", "text-gray-500", "mt-1", "mb-6"], [3, "formGroup"], [1, "flex", "flex-col", "gap-4"], ["label", "Correo", 3, "form_control"], ["label", "Contrase\xF1a", 3, "form_control"], ["class", "mt-3 text-sm text-red-600", 4, "ngIf"], [3, "click", "loading"], [1, "mt-6", "text-center"], ["href", "#", 1, "text-sm", "text-indigo-600", "hover:underline"], [1, "h-12", "flex", "items-center", "text-xl", "font-semibold", "text-gray-700"], [1, "mt-3", "text-sm", "text-red-600"]], template: function Login_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4);
      \u0275\u0275template(4, Login_ng_template_4_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "h1", 5);
      \u0275\u0275text(7, " Bienvenido ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, " Ingresa a tu cuenta ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7)(11, "div", 8);
      \u0275\u0275element(12, "app-input", 9)(13, "app-password", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, Login_p_14_Template, 2, 1, "p", 11);
      \u0275\u0275elementStart(15, "app-button", 12);
      \u0275\u0275listener("click", function Login_Template_app_button_click_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submit());
      });
      \u0275\u0275text(16, "Iniciar sesi\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 13)(18, "a", 14);
      \u0275\u0275text(19, " \xBFOlvidaste tu contrase\xF1a? ");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["email"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["password"]);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance();
      \u0275\u0275property("loading", ctx.loading());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, NgControlStatusGroup, FormGroupDirective, InputComponent, PasswordComponent, ButtonComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Login, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, ReactiveFormsModule, InputComponent, PasswordComponent, ButtonComponent, ButtonComponent], template: `<div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">\r
    <div class="w-full max-w-md">\r
  \r
      <!-- Card -->\r
      <div class="bg-white rounded-xl shadow-lg p-8">\r
  \r
        <!-- Logo -->\r
        <div class="flex justify-center mb-6">\r
          <!-- Logo din\xE1mico -->\r
          <!-- <img\r
            *ngIf="logoUrl; else noLogo"\r
            [src]="logoUrl"\r
            alt="Logo"\r
            class="h-12 object-contain"\r
          /> -->\r
  \r
          <!-- Placeholder si no hay logo -->\r
          <ng-template #noLogo>\r
            <div class="h-12 flex items-center text-xl font-semibold text-gray-700">\r
              Sinergy ERP\r
            </div>\r
          </ng-template>\r
        </div>\r
  \r
        <!-- T\xEDtulo -->\r
        <h1 class="text-2xl font-semibold text-center text-gray-800">\r
          Bienvenido\r
        </h1>\r
        <p class="text-sm text-center text-gray-500 mt-1 mb-6">\r
          Ingresa a tu cuenta\r
        </p>\r
  \r
        <!-- Form -->\r
        <div [formGroup]="form">\r
\r
          <div class="flex flex-col gap-4">\r
            <app-input\r
              [form_control]="form.controls['email']"\r
              label="Correo"\r
            ></app-input>\r
          \r
            <app-password\r
              [form_control]="form.controls['password']"\r
              label="Contrase\xF1a"\r
            ></app-password>\r
          </div>\r
          <!-- Error -->\r
          <p *ngIf="error" class="mt-3 text-sm text-red-600">\r
            {{ error() }}\r
          </p>\r
        \r
          <!-- Button -->\r
          <app-button (click)="submit()" [loading]="loading()">Iniciar sesi\xF3n</app-button>\r
        \r
        </div>\r
        \r
  \r
        <!-- Footer -->\r
        <div class="mt-6 text-center">\r
          <a\r
            href="#"\r
            class="text-sm text-indigo-600 hover:underline"\r
          >\r
            \xBFOlvidaste tu contrase\xF1a?\r
          </a>\r
        </div>\r
  \r
      </div>\r
  \r
    </div>\r
  </div>` }]
  }], () => [{ type: FormBuilder }, { type: Router }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Login, { className: "Login", filePath: "src/app/features/auth/pages/login/login.ts", lineNumber: 19 });
})();
export {
  Login
};
//# sourceMappingURL=chunk-FTSPKVJ7.js.map
