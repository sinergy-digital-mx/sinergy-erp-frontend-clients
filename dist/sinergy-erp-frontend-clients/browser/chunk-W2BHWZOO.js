import {
  GroupSelectComponent,
  LeadService
} from "./chunk-WNEQDQZI.js";
import {
  ButtonModule,
  TagModule
} from "./chunk-5U4UG5WF.js";
import {
  PhoneCodeSelectComponent,
  PhoneCountrySelectComponent,
  PhoneDigitsDirective
} from "./chunk-X6OR7TZF.js";
import {
  InterceptorService
} from "./chunk-YFLVEXO5.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-AL73GUEM.js";
import {
  InputComponent
} from "./chunk-GQ2LOQST.js";
import {
  FormBuilder,
  FormGroupDirective,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators
} from "./chunk-HNVE2F7I.js";
import {
  ButtonComponent
} from "./chunk-B4R54IPF.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-34Z4N5YB.js";
import {
  AuthService
} from "./chunk-B7UOHVOJ.js";
import {
  CommonModule
} from "./chunk-BMMLV6YT.js";
import {
  Component,
  Inject,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-57S27ROJ.js";

// src/app/features/leads/components/lead-edit-dialog/lead-edit-dialog.ts
var LeadEditDialog = class _LeadEditDialog {
  fb;
  dialog;
  dialog_ref;
  data;
  lead_service;
  interceptor_service;
  auth_service;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  update = signal(false, ...ngDevMode ? [{ debugName: "update" }] : []);
  selectedGroupId = signal(null, ...ngDevMode ? [{ debugName: "selectedGroupId" }] : []);
  X = X;
  form;
  constructor(fb, dialog, dialog_ref, data, lead_service, interceptor_service, auth_service) {
    this.fb = fb;
    this.dialog = dialog;
    this.dialog_ref = dialog_ref;
    this.data = data;
    this.lead_service = lead_service;
    this.interceptor_service = interceptor_service;
    this.auth_service = auth_service;
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: [""],
      phone: ["", [Validators.required]],
      phone_code: ["+1", [Validators.required]],
      phone_country: ["US", [Validators.required]],
      source: [""],
      status_id: [""],
      company_name: [""],
      website: [""],
      group_id: [""]
    });
    if (this.data?.id) {
      this.form.patchValue({
        name: this.data.name,
        lastname: this.data.lastname,
        email: this.data.email,
        phone: this.data.phone,
        phone_code: this.data.phone_code,
        phone_country: this.data.phone_country,
        source: this.data.source,
        status_id: this.data?.status?.id,
        company_name: this.data.company_name,
        website: this.data.website,
        group_id: this.data.group_id || ""
      });
      this.selectedGroupId.set(this.data.group_id || null);
    }
  }
  ngOnInit() {
  }
  onGroupSelected(groupId) {
    this.selectedGroupId.set(groupId);
    this.form.patchValue({ group_id: groupId });
  }
  get phoneCodeControl() {
    return this.form.get("phone_code");
  }
  get phoneCountryControl() {
    return this.form.get("phone_country");
  }
  get groupControl() {
    return this.form.get("group_id");
  }
  getPhoneCodeControl() {
    return this.form.get("phone_code");
  }
  getPhoneCountryControl() {
    return this.form.get("phone_country");
  }
  getGroupControl() {
    return this.form.get("group_id");
  }
  closeDialog() {
    if (!this.loading()) {
      this.dialog_ref.close(this.update());
    }
  }
  submit() {
    if (this.data?.id) {
      this.updateLead();
    } else {
      this.createLead();
    }
  }
  updateLead() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const payload = __spreadProps(__spreadValues({
      id: this.data.id
    }, this.form.value), {
      group_id: this.selectedGroupId()
    });
    this.lead_service.updateLead(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Lead actualizado exitosamente."
        });
      },
      error: () => {
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: "No pudimos actualizar el lead. Por favor intenta de nuevo."
        });
      }
    });
  }
  createLead() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const payload = __spreadProps(__spreadValues({
      tenant_id: this.auth_service.user_info.tenant_id,
      status_id: 1
    }, this.form.value), {
      group_id: this.selectedGroupId()
    });
    this.lead_service.createLead(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Lead creado exitosamente."
        });
        this.closeDialog();
      },
      error: () => {
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: "No pudimos crear el lead. Por favor intenta de nuevo."
        });
      }
    });
  }
  static \u0275fac = function LeadEditDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeadEditDialog)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(LeadService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeadEditDialog, selectors: [["app-lead-edit-dialog"]], decls: 18, vars: 15, consts: [[1, "dialog"], [1, "dialog__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "dialog__body"], [1, "container", "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", 3, "formGroup"], ["label", "Nombre", 3, "form_control"], ["label", "Apellido", 3, "form_control"], ["label", "Email", 3, "form_control"], ["label", "Tel\xE9fono", "appPhoneDigits", "", 3, "form_control"], [3, "control"], ["label", "Nombre de la empresa", 3, "form_control"], ["label", "Sitio web", 3, "form_control"], ["groupType", "lead", 3, "control", "label"], [1, "dialog__footer"], ["custom_class", "btn_primary", 3, "click", "text", "loading"]], template: function LeadEditDialog_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function LeadEditDialog_Template_lucide_icon_click_4_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "div", 4);
      \u0275\u0275element(7, "app-input", 5)(8, "app-input", 6)(9, "app-input", 7)(10, "app-input", 8)(11, "app-phone-code-select", 9)(12, "app-phone-country-select", 9)(13, "app-input", 10)(14, "app-input", 11)(15, "app-group-select", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 13)(17, "app-button", 14);
      \u0275\u0275listener("click", function LeadEditDialog_Template_app_button_click_17_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.id ? "Actualizar lead" : "Crear lead");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["name"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["lastname"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["email"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["phone"]);
      \u0275\u0275advance();
      \u0275\u0275property("control", ctx.getPhoneCodeControl());
      \u0275\u0275advance();
      \u0275\u0275property("control", ctx.getPhoneCountryControl());
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["company_name"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["website"]);
      \u0275\u0275advance();
      \u0275\u0275property("control", ctx.getGroupControl())("label", "Grupo");
      \u0275\u0275advance(2);
      \u0275\u0275property("text", ctx.data.id ? "Actualizar" : "Crear")("loading", ctx.loading());
    }
  }, dependencies: [CommonModule, TagModule, ButtonModule, ButtonComponent, LucideAngularModule, LucideAngularComponent, InputComponent, ReactiveFormsModule, NgControlStatusGroup, FormGroupDirective, GroupSelectComponent, PhoneCountrySelectComponent, PhoneCodeSelectComponent, PhoneDigitsDirective], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 100dvw;\n  max-width: 700px;\n}\n/*# sourceMappingURL=lead-edit-dialog.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeadEditDialog, [{
    type: Component,
    args: [{ selector: "app-lead-edit-dialog", standalone: true, imports: [CommonModule, TagModule, ButtonModule, ButtonComponent, LucideAngularModule, InputComponent, ReactiveFormsModule, GroupSelectComponent, PhoneCountrySelectComponent, PhoneCodeSelectComponent, PhoneDigitsDirective], template: `<div class="dialog">\r
    <div class="dialog__header">\r
      <h2>{{data.id ? 'Actualizar lead':'Crear lead'}}</h2>\r
  \r
      <lucide-icon\r
        [img]="X"\r
        class="close cursor-pointer"\r
        (click)="closeDialog()">\r
      </lucide-icon>\r
  \r
    </div>\r
  \r
    <div class="dialog__body">\r
        <div class="container grid grid-cols-1 md:grid-cols-2 gap-4" [formGroup]="form">\r
\r
            <app-input\r
                label="Nombre"\r
                [form_control]="form.controls['name']">\r
            </app-input>\r
\r
            <!-- Apellido -->\r
            <app-input\r
                label="Apellido"\r
                [form_control]="form.controls['lastname']">\r
            </app-input>\r
\r
            <!-- Correo -->\r
            <app-input\r
                label="Email"\r
                [form_control]="form.controls['email']">\r
            </app-input>\r
\r
            <!-- Tel\xE9fono -->\r
            <app-input\r
                label="Tel\xE9fono"\r
                appPhoneDigits\r
                [form_control]="form.controls['phone']">\r
            </app-input>\r
\r
            <!-- C\xF3digo pa\xEDs -->\r
            <app-phone-code-select\r
                [control]="getPhoneCodeControl()">\r
            </app-phone-code-select>\r
\r
            <!-- Pa\xEDs -->\r
            <app-phone-country-select\r
                [control]="getPhoneCountryControl()">\r
            </app-phone-country-select>\r
\r
            <app-input\r
            label="Nombre de la empresa"\r
            [form_control]="form.controls['company_name']">\r
            </app-input>\r
\r
            <app-input\r
            label="Sitio web"\r
            [form_control]="form.controls['website']">\r
            </app-input>\r
\r
            <!-- Group Select -->\r
            <app-group-select\r
              [control]="getGroupControl()"\r
              [label]="'Grupo'"\r
              groupType="lead">\r
            </app-group-select>\r
\r
        </div>\r
    </div>\r
  \r
    <div class="dialog__footer">\r
      <app-button\r
        [text]="data.id ? 'Actualizar':'Crear'"\r
        custom_class="btn_primary"\r
        [loading]="loading()"\r
        (click)="submit()">\r
      </app-button>\r
    </div>\r
  </div>\r
  `, styles: ["/* src/app/features/leads/components/lead-edit-dialog/lead-edit-dialog.scss */\n.dialog {\n  width: 100dvw;\n  max-width: 700px;\n}\n/*# sourceMappingURL=lead-edit-dialog.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialog }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: LeadService }, { type: InterceptorService }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeadEditDialog, { className: "LeadEditDialog", filePath: "src/app/features/leads/components/lead-edit-dialog/lead-edit-dialog.ts", lineNumber: 25 });
})();

export {
  LeadEditDialog
};
//# sourceMappingURL=chunk-W2BHWZOO.js.map
