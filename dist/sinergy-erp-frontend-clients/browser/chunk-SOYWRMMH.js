import {
  LeadEditDialog,
  LeadService
} from "./chunk-6NZ5SRD5.js";
import {
  PhoneComponent,
  Tag,
  TagModule
} from "./chunk-RBESK2KT.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-LYQXEO3O.js";
import "./chunk-JWKB62XF.js";
import {
  PrimeTemplate
} from "./chunk-X6ESXIRL.js";
import {
  InterceptorService
} from "./chunk-K22JBEUE.js";
import "./chunk-Y4MZBWJH.js";
import {
  InputComponent
} from "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import "./chunk-OC6N764R.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-XYBC4MWB.js";
import "./chunk-KNFYVOET.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵInternalFormsSharedModule,
  ɵNgSelectMultipleOption
} from "./chunk-TXPVZZCM.js";
import "./chunk-2BSLK6RD.js";
import {
  ActivatedRoute,
  HttpClient,
  HttpClientModule,
  HttpErrorResponse
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  NO_ERRORS_SCHEMA,
  Observable,
  Output,
  __spreadProps,
  __spreadValues,
  catchError,
  mergeMap,
  retryWhen,
  setClassMetadata,
  signal,
  throwError,
  timer,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7ZU2RCPO.js";

// src/app/features/leads/components/lead-activity-dialog/lead-activity-dialog.ts
var LeadActivityDialog = class _LeadActivityDialog {
  fb;
  dialogRef;
  data;
  route;
  leads_service;
  interceptor_service;
  X = X;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  form;
  update = signal(false, ...ngDevMode ? [{ debugName: "update" }] : []);
  // Opciones de tipo de actividad
  activityTypes = [
    { label: "Call", value: "call" },
    { label: "Email", value: "email" },
    { label: "Meeting", value: "meeting" },
    { label: "Note", value: "note" },
    { label: "Task", value: "task" },
    { label: "Follow up", value: "follow_up" }
  ];
  lead_id = signal(null, ...ngDevMode ? [{ debugName: "lead_id" }] : []);
  constructor(fb, dialogRef, data, route, leads_service, interceptor_service) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.route = route;
    this.leads_service = leads_service;
    this.interceptor_service = interceptor_service;
    this.lead_id.set(data.lead_id);
    this.form = this.fb.group({
      type: [null, Validators.required],
      title: ["", Validators.required],
      description: [""],
      notes: [""],
      duration_minutes: [""]
    });
  }
  closeDialog() {
    console.log(this.loading());
    if (!this.loading()) {
      this.dialogRef.close(this.update());
    }
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const payload = __spreadValues({
      lead_id: this.lead_id()
    }, this.form.value);
    this.leads_service.createActivity(payload).subscribe((res) => {
      this.update.set(true);
      this.loading.set(false);
      this.interceptor_service.openSnackbar({
        type: "success",
        title: "Success",
        message: "Activity created successfully."
      });
      this.closeDialog();
    }, (error) => {
      this.interceptor_service.openSnackbar({
        type: "error",
        title: "Error",
        message: "We couldn\u2019t create the activity. Please try again."
      });
      this.loading.set(false);
    });
  }
  static \u0275fac = function LeadActivityDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeadActivityDialog)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(LeadService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeadActivityDialog, selectors: [["app-lead-activity-dialog"]], decls: 32, vars: 8, consts: [[1, "dialog"], [1, "dialog__header"], ["name", "x", 1, "close", "cursor-pointer", 3, "click", "img"], [1, "dialog__body"], [1, "container", "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", 3, "formGroup"], [1, "flex", "flex-col", "gap-1"], [1, "text-sm", "font-medium", "text-gray-700"], ["formControlName", "type", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500", "focus:border-indigo-500"], ["value", "", "disabled", ""], ["value", "call"], ["value", "email"], ["value", "meeting"], ["value", "note"], ["value", "task"], ["value", "follow_up"], ["label", "Title", "placeholder", "e.g. Follow-up call", 3, "form_control"], ["label", "Description", "placeholder", "e.g. Follow-up call", 3, "form_control"], ["label", "Duration", "placeholder", "e.g. Follow-up call", "type", "number", 3, "form_control"], [1, "md:col-span-2"], ["label", "Notes", "placeholder", "e.g. Follow-up call", 3, "type", "form_control"], [1, "dialog__footer"], ["text", "Create activity", "custom_class", "btn_primary", 3, "click", "loading"]], template: function LeadActivityDialog_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Create Activity");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function LeadActivityDialog_Template_lucide_icon_click_4_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "div", 4)(7, "div", 5)(8, "label", 6);
      \u0275\u0275text(9, " Activity type ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "select", 7)(11, "option", 8);
      \u0275\u0275text(12, "Select type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "option", 9);
      \u0275\u0275text(14, "Call");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "option", 10);
      \u0275\u0275text(16, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "option", 11);
      \u0275\u0275text(18, "Meeting");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "option", 12);
      \u0275\u0275text(20, "Note");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "option", 13);
      \u0275\u0275text(22, "Task");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "option", 14);
      \u0275\u0275text(24, "Follow up");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(25, "app-input", 15)(26, "app-input", 16)(27, "app-input", 17);
      \u0275\u0275elementStart(28, "div", 18);
      \u0275\u0275element(29, "app-input", 19);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 20)(31, "app-button", 21);
      \u0275\u0275listener("click", function LeadActivityDialog_Template_app_button_click_31_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(19);
      \u0275\u0275property("form_control", ctx.form.controls["title"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["description"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["duration_minutes"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("type", "textarea")("form_control", ctx.form.controls["notes"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("loading", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    LucideAngularModule,
    LucideAngularComponent,
    InputComponent,
    ButtonComponent,
    \u0275InternalFormsSharedModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    SelectControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName
  ], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 100dvw;\n  max-width: 700px;\n}\n/*# sourceMappingURL=lead-activity-dialog.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeadActivityDialog, [{
    type: Component,
    args: [{ selector: "app-lead-activity-dialog", standalone: true, imports: [
      CommonModule,
      LucideAngularModule,
      InputComponent,
      ButtonComponent,
      \u0275InternalFormsSharedModule,
      ReactiveFormsModule
    ], template: `<div class="dialog">\r
\r
  <!-- HEADER -->\r
  <div class="dialog__header">\r
    <h2>Create Activity</h2>\r
\r
    <lucide-icon\r
      name="x"\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="closeDialog()">\r
    </lucide-icon>\r
  </div>\r
\r
  <!-- BODY -->\r
  <div class="dialog__body">\r
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-4" [formGroup]="form">\r
\r
      <!-- Activity type -->\r
      <div class="flex flex-col gap-1">\r
        <label class="text-sm font-medium text-gray-700">\r
          Activity type\r
        </label>\r
\r
        <select\r
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm\r
                 focus:outline-none focus:ring-2 focus:ring-indigo-500\r
                 focus:border-indigo-500"\r
          formControlName="type">\r
\r
          <option value="" disabled>Select type</option>\r
          <option value="call">Call</option>\r
          <option value="email">Email</option>\r
          <option value="meeting">Meeting</option>\r
          <option value="note">Note</option>\r
          <option value="task">Task</option>\r
          <option value="follow_up">Follow up</option>\r
\r
        </select>\r
      </div>\r
\r
      <!-- Title -->\r
      <app-input\r
        label="Title"\r
        placeholder="e.g. Follow-up call"\r
        [form_control]="form.controls['title']">\r
      </app-input>\r
\r
      <app-input\r
      label="Description"\r
      placeholder="e.g. Follow-up call"\r
      [form_control]="form.controls['description']">\r
      </app-input>\r
\r
      <app-input\r
      label="Duration"\r
      placeholder="e.g. Follow-up call"\r
      [form_control]="form.controls['duration_minutes']"\r
      type="number"\r
      >\r
      </app-input>\r
\r
      <div class="md:col-span-2">\r
        <app-input\r
          label="Notes"\r
          [type]="'textarea'"\r
          placeholder="e.g. Follow-up call"\r
          [form_control]="form.controls['notes']">\r
        </app-input>\r
      </div>\r
\r
    </div>\r
  </div>\r
\r
  <!-- FOOTER -->\r
  <div class="dialog__footer">\r
    <app-button\r
      text="Create activity"\r
      custom_class="btn_primary"\r
      [loading]="loading()"\r
      (click)="submit()">\r
    </app-button>\r
  </div>\r
\r
</div>\r
`, styles: ["/* src/app/features/leads/components/lead-activity-dialog/lead-activity-dialog.scss */\n.dialog {\n  width: 100dvw;\n  max-width: 700px;\n}\n/*# sourceMappingURL=lead-activity-dialog.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: ActivatedRoute }, { type: LeadService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeadActivityDialog, { className: "LeadActivityDialog", filePath: "src/app/features/leads/components/lead-activity-dialog/lead-activity-dialog.ts", lineNumber: 27 });
})();

// src/app/features/leads/components/lead-address-dialog/lead-address-dialog.ts
var LeadAddressDialog = class _LeadAddressDialog {
  fb;
  dialogRef;
  data;
  route;
  leads_service;
  interceptor_service;
  X = X;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  form;
  update = signal(false, ...ngDevMode ? [{ debugName: "update" }] : []);
  lead_id = signal(null, ...ngDevMode ? [{ debugName: "lead_id" }] : []);
  constructor(fb, dialogRef, data, route, leads_service, interceptor_service) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.route = route;
    this.leads_service = leads_service;
    this.interceptor_service = interceptor_service;
    this.lead_id.set(data.lead_id);
    this.form = this.fb.group({
      street_address: [null],
      city: [""],
      state: [""],
      notes: [""],
      postal_code: [""],
      country: [""]
    });
  }
  closeDialog() {
    console.log(this.loading());
    if (!this.loading()) {
      this.dialogRef.close(this.update());
    }
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const payload = __spreadValues({
      lead_id: this.lead_id()
    }, this.form.value);
    this.leads_service.createActivity(payload).subscribe((res) => {
      this.update.set(true);
      this.loading.set(false);
      this.interceptor_service.openSnackbar({
        type: "success",
        title: "Success",
        message: "Activity created successfully."
      });
      this.closeDialog();
    }, (error) => {
      this.interceptor_service.openSnackbar({
        type: "error",
        title: "Error",
        message: "We couldn\u2019t create the activity. Please try again."
      });
      this.loading.set(false);
    });
  }
  static \u0275fac = function LeadAddressDialog_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeadAddressDialog)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(LeadService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeadAddressDialog, selectors: [["app-lead-activity-dialog"]], decls: 16, vars: 10, consts: [[1, "dialog"], [1, "dialog__header"], ["name", "x", 1, "close", "cursor-pointer", 3, "click", "img"], [1, "dialog__body"], [1, "container", "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", 3, "formGroup"], ["label", "Street address", "placeholder", "e.g. 123 Main St, Apt 4B", 3, "form_control"], ["label", "City", "placeholder", "e.g. Tijuana", 3, "form_control"], ["label", "State", "placeholder", "e.g. Baja California", 3, "form_control"], ["label", "Postal code", "placeholder", "e.g. 22000", 3, "form_control"], ["label", "Country", "placeholder", "e.g. Mexico", 3, "form_control"], [1, "md:col-span-2"], ["label", "Notes", "placeholder", "e.g. Gate code, delivery instructions...", 3, "type", "form_control"], [1, "dialog__footer"], ["text", "Create address", "custom_class", "btn_primary", 3, "click", "loading"]], template: function LeadAddressDialog_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Create address");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function LeadAddressDialog_Template_lucide_icon_click_4_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "div", 4);
      \u0275\u0275element(7, "app-input", 5)(8, "app-input", 6)(9, "app-input", 7)(10, "app-input", 8)(11, "app-input", 9);
      \u0275\u0275elementStart(12, "div", 10);
      \u0275\u0275element(13, "app-input", 11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 12)(15, "app-button", 13);
      \u0275\u0275listener("click", function LeadAddressDialog_Template_app_button_click_15_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["street_address"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["city"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["state"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["postal_code"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["country"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("type", "textarea")("form_control", ctx.form.controls["notes"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("loading", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    LucideAngularModule,
    LucideAngularComponent,
    InputComponent,
    ButtonComponent,
    \u0275InternalFormsSharedModule,
    NgControlStatusGroup,
    ReactiveFormsModule,
    FormGroupDirective
  ], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 100dvw;\n  max-width: 700px;\n}\n/*# sourceMappingURL=lead-address-dialog.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeadAddressDialog, [{
    type: Component,
    args: [{ selector: "app-lead-activity-dialog", standalone: true, imports: [
      CommonModule,
      LucideAngularModule,
      InputComponent,
      ButtonComponent,
      \u0275InternalFormsSharedModule,
      ReactiveFormsModule
    ], template: `<div class="dialog">\r
\r
  <!-- HEADER -->\r
  <div class="dialog__header">\r
    <h2>Create address</h2>\r
\r
    <lucide-icon\r
      name="x"\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="closeDialog()">\r
    </lucide-icon>\r
  </div>\r
\r
  <!-- BODY -->\r
  <div class="dialog__body">\r
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-4" [formGroup]="form">\r
\r
      <app-input\r
        label="Street address"\r
        placeholder="e.g. 123 Main St, Apt 4B"\r
        [form_control]="form.controls['street_address']">\r
      </app-input>\r
\r
      <app-input\r
        label="City"\r
        placeholder="e.g. Tijuana"\r
        [form_control]="form.controls['city']">\r
      </app-input>\r
\r
      <app-input\r
        label="State"\r
        placeholder="e.g. Baja California"\r
        [form_control]="form.controls['state']">\r
      </app-input>\r
\r
      <app-input\r
        label="Postal code"\r
        placeholder="e.g. 22000"\r
        [form_control]="form.controls['postal_code']">\r
      </app-input>\r
\r
      <app-input\r
        label="Country"\r
        placeholder="e.g. Mexico"\r
        [form_control]="form.controls['country']">\r
      </app-input>\r
\r
      <div class="md:col-span-2">\r
        <app-input\r
          label="Notes"\r
          [type]="'textarea'"\r
          placeholder="e.g. Gate code, delivery instructions..."\r
          [form_control]="form.controls['notes']">\r
        </app-input>\r
      </div>\r
\r
    </div>\r
  </div>\r
\r
  <!-- FOOTER -->\r
  <div class="dialog__footer">\r
    <app-button\r
      text="Create address"\r
      custom_class="btn_primary"\r
      [loading]="loading()"\r
      (click)="submit()">\r
    </app-button>\r
  </div>\r
\r
</div>\r
`, styles: ["/* src/app/features/leads/components/lead-address-dialog/lead-address-dialog.scss */\n.dialog {\n  width: 100dvw;\n  max-width: 700px;\n}\n/*# sourceMappingURL=lead-address-dialog.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: ActivatedRoute }, { type: LeadService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeadAddressDialog, { className: "LeadAddressDialog", filePath: "src/app/features/leads/components/lead-address-dialog/lead-address-dialog.ts", lineNumber: 27 });
})();

// src/app/features/leads/components/email-threads/components/thread-list-view/thread-list-view.component.ts
function ThreadListViewComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "div", 5);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading email threads...");
    \u0275\u0275elementEnd()();
  }
}
function ThreadListViewComponent_div_1_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function ThreadListViewComponent_div_1_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.retry());
    });
    \u0275\u0275element(1, "i", 12);
    \u0275\u0275text(2, " Retry ");
    \u0275\u0275elementEnd();
  }
}
function ThreadListViewComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7);
    \u0275\u0275element(2, "i", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 9);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ThreadListViewComponent_div_1_button_5_Template, 3, 0, "button", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error.retryable);
  }
}
function ThreadListViewComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275element(2, "i", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No email threads yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 16);
    \u0275\u0275text(6, "Start a conversation by sending an email");
    \u0275\u0275elementEnd()();
  }
}
function ThreadListViewComponent_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275listener("click", function ThreadListViewComponent_div_3_div_1_Template_div_click_0_listener() {
      const thread_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectThread(thread_r4.id));
    })("keydown.enter", function ThreadListViewComponent_div_3_div_1_Template_div_keydown_enter_0_listener() {
      const thread_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectThread(thread_r4.id));
    })("keydown.space", function ThreadListViewComponent_div_3_div_1_Template_div_keydown_space_0_listener() {
      const thread_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectThread(thread_r4.id));
    });
    \u0275\u0275elementStart(1, "div", 20)(2, "div", 21)(3, "div", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 23)(6, "div", 24);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 25);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 26);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 27)(13, "div", 28);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 29);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 30)(18, "span", 31);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const thread_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", thread_r4.sender.charAt(0).toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(thread_r4.sender);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(thread_r4.senderEmail);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(thread_r4.lastMessageDate));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(thread_r4.subject);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.truncatePreview(thread_r4.messagePreview));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", thread_r4.messageCount, " messages");
  }
}
function ThreadListViewComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275template(1, ThreadListViewComponent_div_3_div_1_Template, 20, 7, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.threads);
  }
}
var ThreadListViewComponent = class _ThreadListViewComponent {
  threads = [];
  isLoading = false;
  error = null;
  threadSelected = new EventEmitter();
  retryClicked = new EventEmitter();
  /**
   * Format date for display
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMs / 36e5);
    const diffDays = Math.floor(diffMs / 864e5);
    if (diffMins < 1) {
      return "Just now";
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : void 0
      });
    }
  }
  /**
   * Truncate message preview to 100 characters
   */
  truncatePreview(text, maxLength = 100) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  /**
   * Select a thread
   */
  selectThread(threadId) {
    this.threadSelected.emit(threadId);
  }
  /**
   * Retry loading threads
   */
  retry() {
    this.retryClicked.emit();
  }
  static \u0275fac = function ThreadListViewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThreadListViewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ThreadListViewComponent, selectors: [["app-thread-list-view"]], inputs: { threads: "threads", isLoading: "isLoading", error: "error" }, outputs: { threadSelected: "threadSelected", retryClicked: "retryClicked" }, decls: 4, vars: 4, consts: [["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "thread-list", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "pi", "pi-exclamation-circle"], [1, "error-message"], ["class", "retry-btn", 3, "click", 4, "ngIf"], [1, "retry-btn", 3, "click"], [1, "pi", "pi-refresh"], [1, "empty-state"], [1, "empty-icon"], [1, "pi", "pi-inbox"], [1, "empty-subtitle"], [1, "thread-list"], ["class", "thread-item", "role", "button", "tabindex", "0", 3, "click", "keydown.enter", "keydown.space", 4, "ngFor", "ngForOf"], ["role", "button", "tabindex", "0", 1, "thread-item", 3, "click", "keydown.enter", "keydown.space"], [1, "thread-item-header"], [1, "thread-sender"], [1, "sender-avatar"], [1, "sender-info"], [1, "sender-name"], [1, "sender-email"], [1, "thread-date"], [1, "thread-item-body"], [1, "thread-subject"], [1, "thread-preview"], [1, "thread-item-footer"], [1, "message-count"]], template: function ThreadListViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ThreadListViewComponent_div_0_Template, 4, 0, "div", 0)(1, ThreadListViewComponent_div_1_Template, 6, 2, "div", 1)(2, ThreadListViewComponent_div_2_Template, 7, 0, "div", 2)(3, ThreadListViewComponent_div_3_Template, 2, 1, "div", 3);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error && !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.error && ctx.threads.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.error && ctx.threads.length > 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ["\n\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n  min-height: 300px;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin-bottom: 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  color: #374151;\n  font-size: 0.875rem;\n  margin-bottom: 1rem;\n  max-width: 400px;\n}\n.error-state[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: background-color 0.2s;\n}\n.error-state[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%]:hover {\n  background-color: #2563eb;\n}\n.error-state[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  color: #d1d5db;\n  margin-bottom: 1rem;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #374151;\n  font-size: 0.875rem;\n  margin: 0.5rem 0;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:first-of-type {\n  font-weight: 500;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-subtitle[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.75rem;\n}\n.thread-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.thread-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  padding: 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  transition: all 0.2s;\n  background-color: #ffffff;\n}\n.thread-item[_ngcontent-%COMP%]:hover {\n  background-color: #f9fafb;\n  border-color: #d1d5db;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n}\n.thread-item[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-header[_ngcontent-%COMP%]   .thread-sender[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  flex: 1;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-header[_ngcontent-%COMP%]   .thread-sender[_ngcontent-%COMP%]   .sender-avatar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  background-color: #dbeafe;\n  color: #1e40af;\n  border-radius: 50%;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-header[_ngcontent-%COMP%]   .thread-sender[_ngcontent-%COMP%]   .sender-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-header[_ngcontent-%COMP%]   .thread-sender[_ngcontent-%COMP%]   .sender-info[_ngcontent-%COMP%]   .sender-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #111827;\n  font-size: 0.875rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-header[_ngcontent-%COMP%]   .thread-sender[_ngcontent-%COMP%]   .sender-info[_ngcontent-%COMP%]   .sender-email[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.75rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-header[_ngcontent-%COMP%]   .thread-date[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.75rem;\n  white-space: nowrap;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-body[_ngcontent-%COMP%]   .thread-subject[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #111827;\n  font-size: 0.875rem;\n  line-height: 1.25;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-body[_ngcontent-%COMP%]   .thread-preview[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.75rem;\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  word-break: break-word;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.thread-item[_ngcontent-%COMP%]   .thread-item-footer[_ngcontent-%COMP%]   .message-count[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.75rem;\n}\n@media (max-width: 767px) {\n  .thread-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .thread-item[_ngcontent-%COMP%]   .thread-item-header[_ngcontent-%COMP%]   .thread-sender[_ngcontent-%COMP%]   .sender-avatar[_ngcontent-%COMP%] {\n    width: 32px;\n    height: 32px;\n    min-width: 32px;\n    font-size: 0.75rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .thread-list[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n@media (min-width: 1024px) {\n  .thread-list[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    gap: 1rem;\n  }\n}\n/*# sourceMappingURL=thread-list-view.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThreadListViewComponent, [{
    type: Component,
    args: [{ selector: "app-thread-list-view", standalone: true, imports: [CommonModule], template: '<!-- Loading State -->\r\n<div *ngIf="isLoading" class="loading-state">\r\n  <div class="spinner"></div>\r\n  <p>Loading email threads...</p>\r\n</div>\r\n\r\n<!-- Error State -->\r\n<div *ngIf="error && !isLoading" class="error-state">\r\n  <div class="error-icon">\r\n    <i class="pi pi-exclamation-circle"></i>\r\n  </div>\r\n  <p class="error-message">{{ error.message }}</p>\r\n  <button *ngIf="error.retryable" (click)="retry()" class="retry-btn">\r\n    <i class="pi pi-refresh"></i>\r\n    Retry\r\n  </button>\r\n</div>\r\n\r\n<!-- Empty State -->\r\n<div *ngIf="!isLoading && !error && threads.length === 0" class="empty-state">\r\n  <div class="empty-icon">\r\n    <i class="pi pi-inbox"></i>\r\n  </div>\r\n  <p>No email threads yet</p>\r\n  <p class="empty-subtitle">Start a conversation by sending an email</p>\r\n</div>\r\n\r\n<!-- Thread List -->\r\n<div *ngIf="!isLoading && !error && threads.length > 0" class="thread-list">\r\n  <div\r\n    *ngFor="let thread of threads"\r\n    class="thread-item"\r\n    (click)="selectThread(thread.id)"\r\n    role="button"\r\n    tabindex="0"\r\n    (keydown.enter)="selectThread(thread.id)"\r\n    (keydown.space)="selectThread(thread.id)"\r\n  >\r\n    <div class="thread-item-header">\r\n      <div class="thread-sender">\r\n        <div class="sender-avatar">\r\n          {{ thread.sender.charAt(0).toUpperCase() }}\r\n        </div>\r\n        <div class="sender-info">\r\n          <div class="sender-name">{{ thread.sender }}</div>\r\n          <div class="sender-email">{{ thread.senderEmail }}</div>\r\n        </div>\r\n      </div>\r\n      <div class="thread-date">{{ formatDate(thread.lastMessageDate) }}</div>\r\n    </div>\r\n\r\n    <div class="thread-item-body">\r\n      <div class="thread-subject">{{ thread.subject }}</div>\r\n      <div class="thread-preview">{{ truncatePreview(thread.messagePreview) }}</div>\r\n    </div>\r\n\r\n    <div class="thread-item-footer">\r\n      <span class="message-count">{{ thread.messageCount }} messages</span>\r\n    </div>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/leads/components/email-threads/components/thread-list-view/thread-list-view.component.scss */\n.loading-state,\n.error-state,\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n  min-height: 300px;\n}\n.loading-state .spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin-bottom: 1rem;\n}\n.loading-state p {\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-state .error-icon {\n  font-size: 2.5rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n.error-state .error-message {\n  color: #374151;\n  font-size: 0.875rem;\n  margin-bottom: 1rem;\n  max-width: 400px;\n}\n.error-state .retry-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: background-color 0.2s;\n}\n.error-state .retry-btn:hover {\n  background-color: #2563eb;\n}\n.error-state .retry-btn i {\n  font-size: 0.875rem;\n}\n.empty-state .empty-icon {\n  font-size: 3rem;\n  color: #d1d5db;\n  margin-bottom: 1rem;\n}\n.empty-state p {\n  color: #374151;\n  font-size: 0.875rem;\n  margin: 0.5rem 0;\n}\n.empty-state p:first-of-type {\n  font-weight: 500;\n}\n.empty-state .empty-subtitle {\n  color: #9ca3af;\n  font-size: 0.75rem;\n}\n.thread-list {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.thread-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  padding: 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  transition: all 0.2s;\n  background-color: #ffffff;\n}\n.thread-item:hover {\n  background-color: #f9fafb;\n  border-color: #d1d5db;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n}\n.thread-item:focus {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}\n.thread-item .thread-item-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.thread-item .thread-item-header .thread-sender {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  flex: 1;\n}\n.thread-item .thread-item-header .thread-sender .sender-avatar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  min-width: 40px;\n  background-color: #dbeafe;\n  color: #1e40af;\n  border-radius: 50%;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.thread-item .thread-item-header .thread-sender .sender-info {\n  flex: 1;\n  min-width: 0;\n}\n.thread-item .thread-item-header .thread-sender .sender-info .sender-name {\n  font-weight: 600;\n  color: #111827;\n  font-size: 0.875rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.thread-item .thread-item-header .thread-sender .sender-info .sender-email {\n  color: #6b7280;\n  font-size: 0.75rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.thread-item .thread-item-header .thread-date {\n  color: #9ca3af;\n  font-size: 0.75rem;\n  white-space: nowrap;\n}\n.thread-item .thread-item-body {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.thread-item .thread-item-body .thread-subject {\n  font-weight: 600;\n  color: #111827;\n  font-size: 0.875rem;\n  line-height: 1.25;\n}\n.thread-item .thread-item-body .thread-preview {\n  color: #6b7280;\n  font-size: 0.75rem;\n  line-height: 1.5;\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  word-break: break-word;\n}\n.thread-item .thread-item-footer {\n  display: flex;\n  justify-content: flex-end;\n}\n.thread-item .thread-item-footer .message-count {\n  color: #9ca3af;\n  font-size: 0.75rem;\n}\n@media (max-width: 767px) {\n  .thread-item {\n    padding: 0.75rem;\n  }\n  .thread-item .thread-item-header .thread-sender .sender-avatar {\n    width: 32px;\n    height: 32px;\n    min-width: 32px;\n    font-size: 0.75rem;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .thread-list {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n}\n@media (min-width: 1024px) {\n  .thread-list {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n    gap: 1rem;\n  }\n}\n/*# sourceMappingURL=thread-list-view.component.css.map */\n"] }]
  }], null, { threads: [{
    type: Input
  }], isLoading: [{
    type: Input
  }], error: [{
    type: Input
  }], threadSelected: [{
    type: Output
  }], retryClicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ThreadListViewComponent, { className: "ThreadListViewComponent", filePath: "src/app/features/leads/components/email-threads/components/thread-list-view/thread-list-view.component.ts", lineNumber: 12 });
})();

// src/app/features/leads/components/email-threads/components/reply-compose/reply-compose.component.ts
function ReplyComposeComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "i", 10);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.error.message);
  }
}
function ReplyComposeComponent_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.validationError(), " ");
  }
}
function ReplyComposeComponent_span_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 12);
    \u0275\u0275text(2, " Send Reply ");
    \u0275\u0275elementEnd();
  }
}
function ReplyComposeComponent_span_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 13);
    \u0275\u0275text(2, " Sending... ");
    \u0275\u0275elementEnd();
  }
}
var ReplyComposeComponent = class _ReplyComposeComponent {
  isSending = false;
  error = null;
  replySent = new EventEmitter();
  replyCancelled = new EventEmitter();
  // Form state
  messageBody = signal("", ...ngDevMode ? [{ debugName: "messageBody" }] : []);
  validationError = signal("", ...ngDevMode ? [{ debugName: "validationError" }] : []);
  /**
   * Validate reply
   */
  validateReply() {
    const body = this.messageBody().trim();
    if (!body) {
      this.validationError.set("Message body is required");
      return false;
    }
    this.validationError.set("");
    return true;
  }
  /**
   * Submit reply
   */
  submit() {
    if (!this.validateReply()) {
      return;
    }
    const request = {
      body: this.messageBody()
    };
    this.replySent.emit(request);
  }
  /**
   * Cancel reply
   */
  cancel() {
    this.messageBody.set("");
    this.validationError.set("");
    this.replyCancelled.emit();
  }
  static \u0275fac = function ReplyComposeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReplyComposeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReplyComposeComponent, selectors: [["app-reply-compose"]], inputs: { isSending: "isSending", error: "error" }, outputs: { replySent: "replySent", replyCancelled: "replyCancelled" }, decls: 11, vars: 10, consts: [[1, "reply-compose"], ["class", "error-message", 4, "ngIf"], [1, "form-group"], ["placeholder", "Write your reply here...", "rows", "4", 1, "form-textarea", 3, "ngModelChange", "ngModel", "disabled"], ["class", "error-text", 4, "ngIf"], [1, "action-buttons"], [1, "cancel-btn", 3, "click", "disabled"], [1, "send-btn", 3, "click", "disabled"], [4, "ngIf"], [1, "error-message"], [1, "pi", "pi-exclamation-circle"], [1, "error-text"], [1, "pi", "pi-send"], [1, "pi", "pi-spin", "pi-spinner"]], template: function ReplyComposeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, ReplyComposeComponent_div_1_Template, 4, 1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "textarea", 3);
      \u0275\u0275twoWayListener("ngModelChange", function ReplyComposeComponent_Template_textarea_ngModelChange_3_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.messageBody, $event) || (ctx.messageBody = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, ReplyComposeComponent_span_4_Template, 2, 1, "span", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5)(6, "button", 6);
      \u0275\u0275listener("click", function ReplyComposeComponent_Template_button_click_6_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(7, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 7);
      \u0275\u0275listener("click", function ReplyComposeComponent_Template_button_click_8_listener() {
        return ctx.submit();
      });
      \u0275\u0275template(9, ReplyComposeComponent_span_9_Template, 3, 0, "span", 8)(10, ReplyComposeComponent_span_10_Template, 3, 0, "span", 8);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("error", ctx.validationError());
      \u0275\u0275twoWayProperty("ngModel", ctx.messageBody);
      \u0275\u0275property("disabled", ctx.isSending);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.validationError());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSending);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSending);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSending);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSending);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.reply-compose[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  background-color: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n}\n.reply-compose[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n  border-radius: 0.375rem;\n  color: #991b1b;\n  font-size: 0.875rem;\n}\n.reply-compose[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.reply-compose[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.reply-compose[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-family: inherit;\n  resize: vertical;\n  transition: all 0.2s;\n}\n.reply-compose[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.reply-compose[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.reply-compose[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea.error[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n}\n.reply-compose[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea.error[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.reply-compose[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .error-text[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 0.75rem;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  background-color: white;\n  color: #374151;\n  border: 1px solid #d1d5db;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f3f4f6;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%] {\n  background-color: #3b82f6;\n  color: white;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@media (max-width: 767px) {\n  .reply-compose[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n   .reply-compose[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%] {\n    flex: 1;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=reply-compose.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReplyComposeComponent, [{
    type: Component,
    args: [{ selector: "app-reply-compose", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="reply-compose">\r\n  <!-- Error Message -->\r\n  <div *ngIf="error" class="error-message">\r\n    <i class="pi pi-exclamation-circle"></i>\r\n    <span>{{ error.message }}</span>\r\n  </div>\r\n\r\n  <!-- Message Body Field -->\r\n  <div class="form-group">\r\n    <textarea\r\n      [(ngModel)]="messageBody"\r\n      placeholder="Write your reply here..."\r\n      [disabled]="isSending"\r\n      class="form-textarea"\r\n      [class.error]="validationError()"\r\n      rows="4"\r\n    ></textarea>\r\n    <span *ngIf="validationError()" class="error-text">\r\n      {{ validationError() }}\r\n    </span>\r\n  </div>\r\n\r\n  <!-- Action Buttons -->\r\n  <div class="action-buttons">\r\n    <button (click)="cancel()" class="cancel-btn" [disabled]="isSending">\r\n      Cancel\r\n    </button>\r\n    <button (click)="submit()" class="send-btn" [disabled]="isSending">\r\n      <span *ngIf="!isSending">\r\n        <i class="pi pi-send"></i>\r\n        Send Reply\r\n      </span>\r\n      <span *ngIf="isSending">\r\n        <i class="pi pi-spin pi-spinner"></i>\r\n        Sending...\r\n      </span>\r\n    </button>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/leads/components/email-threads/components/reply-compose/reply-compose.component.scss */\n.reply-compose {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  background-color: #f9fafb;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n}\n.reply-compose .error-message {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n  border-radius: 0.375rem;\n  color: #991b1b;\n  font-size: 0.875rem;\n}\n.reply-compose .error-message i {\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.reply-compose .form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.reply-compose .form-group .form-textarea {\n  padding: 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-family: inherit;\n  resize: vertical;\n  transition: all 0.2s;\n}\n.reply-compose .form-group .form-textarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.reply-compose .form-group .form-textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.reply-compose .form-group .form-textarea.error {\n  border-color: #ef4444;\n}\n.reply-compose .form-group .form-textarea.error:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.reply-compose .form-group .error-text {\n  color: #ef4444;\n  font-size: 0.75rem;\n}\n.reply-compose .action-buttons {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n.reply-compose .action-buttons .cancel-btn,\n.reply-compose .action-buttons .send-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.reply-compose .action-buttons .cancel-btn i,\n.reply-compose .action-buttons .send-btn i {\n  font-size: 0.875rem;\n}\n.reply-compose .action-buttons .cancel-btn {\n  background-color: white;\n  color: #374151;\n  border: 1px solid #d1d5db;\n}\n.reply-compose .action-buttons .cancel-btn:hover:not(:disabled) {\n  background-color: #f3f4f6;\n}\n.reply-compose .action-buttons .cancel-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.reply-compose .action-buttons .send-btn {\n  background-color: #3b82f6;\n  color: white;\n}\n.reply-compose .action-buttons .send-btn:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.reply-compose .action-buttons .send-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@media (max-width: 767px) {\n  .reply-compose {\n    padding: 0.75rem;\n  }\n  .reply-compose .action-buttons {\n    gap: 0.5rem;\n  }\n  .reply-compose .action-buttons .cancel-btn,\n  .reply-compose .action-buttons .send-btn {\n    flex: 1;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=reply-compose.component.css.map */\n"] }]
  }], null, { isSending: [{
    type: Input
  }], error: [{
    type: Input
  }], replySent: [{
    type: Output
  }], replyCancelled: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReplyComposeComponent, { className: "ReplyComposeComponent", filePath: "src/app/features/leads/components/email-threads/components/reply-compose/reply-compose.component.ts", lineNumber: 13 });
})();

// src/app/features/leads/components/email-threads/components/thread-detail-view/thread-detail-view.component.ts
function ThreadDetailViewComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "div", 7);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading thread details...");
    \u0275\u0275elementEnd()();
  }
}
function ThreadDetailViewComponent_div_5_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function ThreadDetailViewComponent_div_5_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.retry());
    });
    \u0275\u0275element(1, "i", 14);
    \u0275\u0275text(2, " Retry ");
    \u0275\u0275elementEnd();
  }
}
function ThreadDetailViewComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9);
    \u0275\u0275element(2, "i", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ThreadDetailViewComponent_div_5_button_5_Template, 3, 0, "button", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.error.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.error.retryable);
  }
}
function ThreadDetailViewComponent_div_6_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23)(2, "div", 24)(3, "div", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 26)(6, "div", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 28);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 29);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 30);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const message_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("outgoing", message_r3.isOutgoing);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", message_r3.sender.charAt(0).toUpperCase(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(message_r3.sender);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(message_r3.senderEmail);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatTimestamp(message_r3.timestamp));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", message_r3.body, " ");
  }
}
function ThreadDetailViewComponent_div_6_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function ThreadDetailViewComponent_div_6_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openReply());
    });
    \u0275\u0275element(1, "i", 32);
    \u0275\u0275text(2, " Reply ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.isSendingReply);
  }
}
function ThreadDetailViewComponent_div_6_app_reply_compose_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-reply-compose", 33);
    \u0275\u0275listener("replySent", function ThreadDetailViewComponent_div_6_app_reply_compose_8_Template_app_reply_compose_replySent_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sendReply($event));
    })("replyCancelled", function ThreadDetailViewComponent_div_6_app_reply_compose_8_Template_app_reply_compose_replyCancelled_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelReply());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("isSending", ctx_r1.isSendingReply)("error", ctx_r1.sendError);
  }
}
function ThreadDetailViewComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 16)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 17);
    \u0275\u0275template(5, ThreadDetailViewComponent_div_6_div_5_Template, 14, 7, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 19);
    \u0275\u0275template(7, ThreadDetailViewComponent_div_6_button_7_Template, 3, 1, "button", 20)(8, ThreadDetailViewComponent_div_6_app_reply_compose_8_Template, 1, 2, "app-reply-compose", 21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.threadDetail.subject);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.threadDetail.messages);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.isReplyComposeOpen);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isReplyComposeOpen);
  }
}
var ThreadDetailViewComponent = class _ThreadDetailViewComponent {
  threadDetail = null;
  isLoading = false;
  error = null;
  isReplyComposeOpen = false;
  isSendingReply = false;
  sendError = null;
  backClicked = new EventEmitter();
  replyClicked = new EventEmitter();
  replyCancelled = new EventEmitter();
  replySent = new EventEmitter();
  retryClicked = new EventEmitter();
  /**
   * Format timestamp for display
   */
  formatTimestamp(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  /**
   * Go back to thread list
   */
  goBack() {
    this.backClicked.emit();
  }
  /**
   * Open reply compose
   */
  openReply() {
    this.replyClicked.emit();
  }
  /**
   * Cancel reply
   */
  cancelReply() {
    this.replyCancelled.emit();
  }
  /**
   * Send reply
   */
  sendReply(request) {
    this.replySent.emit(request);
  }
  /**
   * Retry loading thread detail
   */
  retry() {
    this.retryClicked.emit();
  }
  static \u0275fac = function ThreadDetailViewComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThreadDetailViewComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ThreadDetailViewComponent, selectors: [["app-thread-detail-view"]], inputs: { threadDetail: "threadDetail", isLoading: "isLoading", error: "error", isReplyComposeOpen: "isReplyComposeOpen", isSendingReply: "isSendingReply", sendError: "sendError" }, outputs: { backClicked: "backClicked", replyClicked: "replyClicked", replyCancelled: "replyCancelled", replySent: "replySent", retryClicked: "retryClicked" }, decls: 7, vars: 3, consts: [[1, "thread-detail-header"], [1, "back-btn", 3, "click"], [1, "pi", "pi-arrow-left"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "thread-detail", 4, "ngIf"], [1, "loading-state"], [1, "spinner"], [1, "error-state"], [1, "error-icon"], [1, "pi", "pi-exclamation-circle"], [1, "error-message"], ["class", "retry-btn", 3, "click", 4, "ngIf"], [1, "retry-btn", 3, "click"], [1, "pi", "pi-refresh"], [1, "thread-detail"], [1, "thread-subject"], [1, "messages-list"], ["class", "message-item", 3, "outgoing", 4, "ngFor", "ngForOf"], [1, "reply-section"], ["class", "reply-btn", 3, "disabled", "click", 4, "ngIf"], [3, "isSending", "error", "replySent", "replyCancelled", 4, "ngIf"], [1, "message-item"], [1, "message-header"], [1, "message-sender"], [1, "sender-avatar"], [1, "sender-info"], [1, "sender-name"], [1, "sender-email"], [1, "message-timestamp"], [1, "message-body"], [1, "reply-btn", 3, "click", "disabled"], [1, "pi", "pi-reply"], [3, "replySent", "replyCancelled", "isSending", "error"]], template: function ThreadDetailViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function ThreadDetailViewComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275element(2, "i", 2);
      \u0275\u0275text(3, " Back to threads ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(4, ThreadDetailViewComponent_div_4_Template, 4, 0, "div", 3)(5, ThreadDetailViewComponent_div_5_Template, 6, 2, "div", 4)(6, ThreadDetailViewComponent_div_6_Template, 9, 4, "div", 5);
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error && !ctx.isLoading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.error && ctx.threadDetail);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReplyComposeComponent], styles: ["\n\n.thread-detail-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.thread-detail-header[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: transparent;\n  color: #3b82f6;\n  border: 1px solid #3b82f6;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.thread-detail-header[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%]:hover {\n  background-color: #eff6ff;\n}\n.thread-detail-header[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.loading-state[_ngcontent-%COMP%], \n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n  min-height: 300px;\n}\n.loading-state[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n  margin-bottom: 1rem;\n}\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-state[_ngcontent-%COMP%]   .error-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n.error-state[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  color: #374151;\n  font-size: 0.875rem;\n  margin-bottom: 1rem;\n  max-width: 400px;\n}\n.error-state[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: background-color 0.2s;\n}\n.error-state[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%]:hover {\n  background-color: #2563eb;\n}\n.error-state[_ngcontent-%COMP%]   .retry-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.thread-detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.thread-detail[_ngcontent-%COMP%]   .thread-subject[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #111827;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  max-height: 500px;\n  overflow-y: auto;\n  padding: 1rem;\n  background-color: #f9fafb;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem;\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item.outgoing[_ngcontent-%COMP%] {\n  background-color: #dbeafe;\n  border-color: #93c5fd;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%]   .message-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%]   .message-header[_ngcontent-%COMP%]   .message-sender[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%]   .message-header[_ngcontent-%COMP%]   .message-sender[_ngcontent-%COMP%]   .sender-avatar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  min-width: 32px;\n  background-color: #dbeafe;\n  color: #1e40af;\n  border-radius: 50%;\n  font-weight: 600;\n  font-size: 0.75rem;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%]   .message-header[_ngcontent-%COMP%]   .message-sender[_ngcontent-%COMP%]   .sender-info[_ngcontent-%COMP%]   .sender-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #111827;\n  font-size: 0.875rem;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%]   .message-header[_ngcontent-%COMP%]   .message-sender[_ngcontent-%COMP%]   .sender-info[_ngcontent-%COMP%]   .sender-email[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.75rem;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%]   .message-header[_ngcontent-%COMP%]   .message-timestamp[_ngcontent-%COMP%] {\n  color: #9ca3af;\n  font-size: 0.75rem;\n  white-space: nowrap;\n}\n.thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%]   .message-body[_ngcontent-%COMP%] {\n  color: #374151;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.thread-detail[_ngcontent-%COMP%]   .reply-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.thread-detail[_ngcontent-%COMP%]   .reply-section[_ngcontent-%COMP%]   .reply-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: background-color 0.2s;\n  align-self: flex-start;\n}\n.thread-detail[_ngcontent-%COMP%]   .reply-section[_ngcontent-%COMP%]   .reply-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.thread-detail[_ngcontent-%COMP%]   .reply-section[_ngcontent-%COMP%]   .reply-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.thread-detail[_ngcontent-%COMP%]   .reply-section[_ngcontent-%COMP%]   .reply-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n@media (max-width: 767px) {\n  .thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%] {\n    max-height: 400px;\n    padding: 0.75rem;\n  }\n  .thread-detail[_ngcontent-%COMP%]   .messages-list[_ngcontent-%COMP%]   .message-item[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n}\n/*# sourceMappingURL=thread-detail-view.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThreadDetailViewComponent, [{
    type: Component,
    args: [{ selector: "app-thread-detail-view", standalone: true, imports: [CommonModule, ReplyComposeComponent], template: '<!-- Back Button -->\r\n<div class="thread-detail-header">\r\n  <button (click)="goBack()" class="back-btn">\r\n    <i class="pi pi-arrow-left"></i>\r\n    Back to threads\r\n  </button>\r\n</div>\r\n\r\n<!-- Loading State -->\r\n<div *ngIf="isLoading" class="loading-state">\r\n  <div class="spinner"></div>\r\n  <p>Loading thread details...</p>\r\n</div>\r\n\r\n<!-- Error State -->\r\n<div *ngIf="error && !isLoading" class="error-state">\r\n  <div class="error-icon">\r\n    <i class="pi pi-exclamation-circle"></i>\r\n  </div>\r\n  <p class="error-message">{{ error.message }}</p>\r\n  <button *ngIf="error.retryable" (click)="retry()" class="retry-btn">\r\n    <i class="pi pi-refresh"></i>\r\n    Retry\r\n  </button>\r\n</div>\r\n\r\n<!-- Thread Detail -->\r\n<div *ngIf="!isLoading && !error && threadDetail" class="thread-detail">\r\n  <!-- Thread Subject -->\r\n  <div class="thread-subject">\r\n    <h2>{{ threadDetail.subject }}</h2>\r\n  </div>\r\n\r\n  <!-- Messages List -->\r\n  <div class="messages-list">\r\n    <div\r\n      *ngFor="let message of threadDetail.messages"\r\n      class="message-item"\r\n      [class.outgoing]="message.isOutgoing"\r\n    >\r\n      <div class="message-header">\r\n        <div class="message-sender">\r\n          <div class="sender-avatar">\r\n            {{ message.sender.charAt(0).toUpperCase() }}\r\n          </div>\r\n          <div class="sender-info">\r\n            <div class="sender-name">{{ message.sender }}</div>\r\n            <div class="sender-email">{{ message.senderEmail }}</div>\r\n          </div>\r\n        </div>\r\n        <div class="message-timestamp">{{ formatTimestamp(message.timestamp) }}</div>\r\n      </div>\r\n\r\n      <div class="message-body">\r\n        {{ message.body }}\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Reply Compose -->\r\n  <div class="reply-section">\r\n    <button\r\n      *ngIf="!isReplyComposeOpen"\r\n      (click)="openReply()"\r\n      class="reply-btn"\r\n      [disabled]="isSendingReply"\r\n    >\r\n      <i class="pi pi-reply"></i>\r\n      Reply\r\n    </button>\r\n\r\n    <app-reply-compose\r\n      *ngIf="isReplyComposeOpen"\r\n      [isSending]="isSendingReply"\r\n      [error]="sendError"\r\n      (replySent)="sendReply($event)"\r\n      (replyCancelled)="cancelReply()"\r\n    ></app-reply-compose>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/leads/components/email-threads/components/thread-detail-view/thread-detail-view.component.scss */\n.thread-detail-header {\n  margin-bottom: 1.5rem;\n}\n.thread-detail-header .back-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: transparent;\n  color: #3b82f6;\n  border: 1px solid #3b82f6;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.thread-detail-header .back-btn:hover {\n  background-color: #eff6ff;\n}\n.thread-detail-header .back-btn i {\n  font-size: 0.875rem;\n}\n.loading-state,\n.error-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1rem;\n  text-align: center;\n  min-height: 300px;\n}\n.loading-state .spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #e5e7eb;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  margin-bottom: 1rem;\n}\n.loading-state p {\n  color: #6b7280;\n  font-size: 0.875rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.error-state .error-icon {\n  font-size: 2.5rem;\n  color: #ef4444;\n  margin-bottom: 1rem;\n}\n.error-state .error-message {\n  color: #374151;\n  font-size: 0.875rem;\n  margin-bottom: 1rem;\n  max-width: 400px;\n}\n.error-state .retry-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: background-color 0.2s;\n}\n.error-state .retry-btn:hover {\n  background-color: #2563eb;\n}\n.error-state .retry-btn i {\n  font-size: 0.875rem;\n}\n.thread-detail {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.thread-detail .thread-subject h2 {\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #111827;\n}\n.thread-detail .messages-list {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  max-height: 500px;\n  overflow-y: auto;\n  padding: 1rem;\n  background-color: #f9fafb;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n}\n.thread-detail .messages-list .message-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem;\n  background-color: white;\n  border-radius: 0.5rem;\n  border: 1px solid #e5e7eb;\n}\n.thread-detail .messages-list .message-item.outgoing {\n  background-color: #dbeafe;\n  border-color: #93c5fd;\n}\n.thread-detail .messages-list .message-item .message-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.thread-detail .messages-list .message-item .message-header .message-sender {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n}\n.thread-detail .messages-list .message-item .message-header .message-sender .sender-avatar {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  min-width: 32px;\n  background-color: #dbeafe;\n  color: #1e40af;\n  border-radius: 50%;\n  font-weight: 600;\n  font-size: 0.75rem;\n}\n.thread-detail .messages-list .message-item .message-header .message-sender .sender-info .sender-name {\n  font-weight: 600;\n  color: #111827;\n  font-size: 0.875rem;\n}\n.thread-detail .messages-list .message-item .message-header .message-sender .sender-info .sender-email {\n  color: #6b7280;\n  font-size: 0.75rem;\n}\n.thread-detail .messages-list .message-item .message-header .message-timestamp {\n  color: #9ca3af;\n  font-size: 0.75rem;\n  white-space: nowrap;\n}\n.thread-detail .messages-list .message-item .message-body {\n  color: #374151;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.thread-detail .reply-section {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.thread-detail .reply-section .reply-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: background-color 0.2s;\n  align-self: flex-start;\n}\n.thread-detail .reply-section .reply-btn:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.thread-detail .reply-section .reply-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.thread-detail .reply-section .reply-btn i {\n  font-size: 0.875rem;\n}\n@media (max-width: 767px) {\n  .thread-detail .messages-list {\n    max-height: 400px;\n    padding: 0.75rem;\n  }\n  .thread-detail .messages-list .message-item {\n    padding: 0.75rem;\n  }\n}\n/*# sourceMappingURL=thread-detail-view.component.css.map */\n"] }]
  }], null, { threadDetail: [{
    type: Input
  }], isLoading: [{
    type: Input
  }], error: [{
    type: Input
  }], isReplyComposeOpen: [{
    type: Input
  }], isSendingReply: [{
    type: Input
  }], sendError: [{
    type: Input
  }], backClicked: [{
    type: Output
  }], replyClicked: [{
    type: Output
  }], replyCancelled: [{
    type: Output
  }], replySent: [{
    type: Output
  }], retryClicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ThreadDetailViewComponent, { className: "ThreadDetailViewComponent", filePath: "src/app/features/leads/components/email-threads/components/thread-detail-view/thread-detail-view.component.ts", lineNumber: 13 });
})();

// src/app/features/leads/components/email-threads/components/compose-modal/compose-modal.component.ts
function ComposeModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "i", 20);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.error.message);
  }
}
function ComposeModalComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.validationErrors()["subject"], " ");
  }
}
function ComposeModalComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.validationErrors()["body"], " ");
  }
}
function ComposeModalComponent_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 22);
    \u0275\u0275text(2, " Send ");
    \u0275\u0275elementEnd();
  }
}
function ComposeModalComponent_span_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "i", 23);
    \u0275\u0275text(2, " Sending... ");
    \u0275\u0275elementEnd();
  }
}
var ComposeModalComponent = class _ComposeModalComponent {
  recipientEmail = "";
  isSending = false;
  error = null;
  emailSent = new EventEmitter();
  modalClosed = new EventEmitter();
  // Form state
  formData = signal({
    recipientEmail: "",
    subject: "",
    body: ""
  }, ...ngDevMode ? [{ debugName: "formData" }] : []);
  validationErrors = signal({}, ...ngDevMode ? [{ debugName: "validationErrors" }] : []);
  ngOnInit() {
    const current = this.formData();
    this.formData.set(__spreadProps(__spreadValues({}, current), {
      recipientEmail: this.recipientEmail
    }));
  }
  /**
   * Validate form
   */
  validateForm() {
    const errors = {};
    const data = this.formData();
    if (!data.subject || data.subject.trim() === "") {
      errors["subject"] = "Subject is required";
    }
    if (!data.body || data.body.trim() === "") {
      errors["body"] = "Message body is required";
    }
    this.validationErrors.set(errors);
    return Object.keys(errors).length === 0;
  }
  /**
   * Submit form
   */
  submit() {
    if (!this.validateForm()) {
      return;
    }
    const data = this.formData();
    const request = {
      recipientEmail: data.recipientEmail,
      subject: data.subject,
      body: data.body
    };
    this.emailSent.emit(request);
  }
  /**
   * Cancel and close modal
   */
  cancel() {
    this.modalClosed.emit();
  }
  /**
   * Close modal by clicking outside
   */
  closeOnBackdropClick(event) {
    if (event.target === event.currentTarget) {
      this.cancel();
    }
  }
  static \u0275fac = function ComposeModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ComposeModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ComposeModalComponent, selectors: [["app-compose-modal"]], inputs: { recipientEmail: "recipientEmail", isSending: "isSending", error: "error" }, outputs: { emailSent: "emailSent", modalClosed: "modalClosed" }, decls: 29, vars: 17, consts: [[1, "modal-backdrop", 3, "click"], [1, "modal-content"], [1, "modal-header"], [1, "close-btn", 3, "click", "disabled"], [1, "pi", "pi-times"], [1, "modal-body"], ["class", "error-message", 4, "ngIf"], [1, "form-group"], ["for", "recipient"], ["id", "recipient", "type", "email", "placeholder", "Recipient email", "disabled", "", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "subject"], ["id", "subject", "type", "text", "placeholder", "Email subject", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["class", "error-text", 4, "ngIf"], ["for", "body"], ["id", "body", "placeholder", "Write your message here...", "rows", "8", 1, "form-textarea", 3, "ngModelChange", "ngModel", "disabled"], [1, "modal-footer"], [1, "cancel-btn", 3, "click", "disabled"], [1, "send-btn", 3, "click", "disabled"], [4, "ngIf"], [1, "error-message"], [1, "pi", "pi-exclamation-circle"], [1, "error-text"], [1, "pi", "pi-send"], [1, "pi", "pi-spin", "pi-spinner"]], template: function ComposeModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function ComposeModalComponent_Template_div_click_0_listener($event) {
        return ctx.closeOnBackdropClick($event);
      });
      \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "h2");
      \u0275\u0275text(4, "Compose Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 3);
      \u0275\u0275listener("click", function ComposeModalComponent_Template_button_click_5_listener() {
        return ctx.cancel();
      });
      \u0275\u0275element(6, "i", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275template(8, ComposeModalComponent_div_8_Template, 4, 1, "div", 6);
      \u0275\u0275elementStart(9, "div", 7)(10, "label", 8);
      \u0275\u0275text(11, "To:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function ComposeModalComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData().recipientEmail, $event) || (ctx.formData().recipientEmail = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 7)(14, "label", 10);
      \u0275\u0275text(15, "Subject:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "input", 11);
      \u0275\u0275twoWayListener("ngModelChange", function ComposeModalComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData().subject, $event) || (ctx.formData().subject = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(17, ComposeModalComponent_span_17_Template, 2, 1, "span", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 7)(19, "label", 13);
      \u0275\u0275text(20, "Message:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "textarea", 14);
      \u0275\u0275twoWayListener("ngModelChange", function ComposeModalComponent_Template_textarea_ngModelChange_21_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.formData().body, $event) || (ctx.formData().body = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, ComposeModalComponent_span_22_Template, 2, 1, "span", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 15)(24, "button", 16);
      \u0275\u0275listener("click", function ComposeModalComponent_Template_button_click_24_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(25, " Cancel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 17);
      \u0275\u0275listener("click", function ComposeModalComponent_Template_button_click_26_listener() {
        return ctx.submit();
      });
      \u0275\u0275template(27, ComposeModalComponent_span_27_Template, 3, 0, "span", 18)(28, ComposeModalComponent_span_28_Template, 3, 0, "span", 18);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.isSending);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.error);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData().recipientEmail);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("error", ctx.validationErrors()["subject"]);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData().subject);
      \u0275\u0275property("disabled", ctx.isSending);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.validationErrors()["subject"]);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("error", ctx.validationErrors()["body"]);
      \u0275\u0275twoWayProperty("ngModel", ctx.formData().body);
      \u0275\u0275property("disabled", ctx.isSending);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.validationErrors()["body"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSending);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSending);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSending);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSending);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background-color: white;\n  border-radius: 0.75rem;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n  max-width: 600px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background-color: transparent;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  color: #6b7280;\n  transition: all 0.2s;\n}\n.modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n  border-radius: 0.375rem;\n  color: #991b1b;\n  font-size: 0.875rem;\n}\n.modal-body[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%], \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-family: inherit;\n  transition: all 0.2s;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:focus, \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%]:disabled, \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input.error[_ngcontent-%COMP%], \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea.error[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-input.error[_ngcontent-%COMP%]:focus, \n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea.error[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 150px;\n}\n.modal-body[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .error-text[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-size: 0.75rem;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n}\n.modal-footer[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n.modal-footer[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.modal-footer[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.modal-footer[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.modal-footer[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%] {\n  background-color: white;\n  color: #374151;\n  border: 1px solid #d1d5db;\n}\n.modal-footer[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f3f4f6;\n}\n.modal-footer[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-footer[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%] {\n  background-color: #3b82f6;\n  color: white;\n}\n.modal-footer[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.modal-footer[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@media (max-width: 767px) {\n  .modal-backdrop[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .modal-content[_ngcontent-%COMP%] {\n    max-width: 100%;\n    max-height: 100vh;\n    border-radius: 0;\n  }\n  .modal-header[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 1rem;\n    gap: 1rem;\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    padding: 1rem;\n    gap: 0.5rem;\n  }\n  .modal-footer[_ngcontent-%COMP%]   .cancel-btn[_ngcontent-%COMP%], \n   .modal-footer[_ngcontent-%COMP%]   .send-btn[_ngcontent-%COMP%] {\n    flex: 1;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=compose-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComposeModalComponent, [{
    type: Component,
    args: [{ selector: "app-compose-modal", standalone: true, imports: [CommonModule, FormsModule], template: `<div class="modal-backdrop" (click)="closeOnBackdropClick($event)">\r
  <div class="modal-content">\r
    <!-- Modal Header -->\r
    <div class="modal-header">\r
      <h2>Compose Email</h2>\r
      <button (click)="cancel()" class="close-btn" [disabled]="isSending">\r
        <i class="pi pi-times"></i>\r
      </button>\r
    </div>\r
\r
    <!-- Modal Body -->\r
    <div class="modal-body">\r
      <!-- Error Message -->\r
      <div *ngIf="error" class="error-message">\r
        <i class="pi pi-exclamation-circle"></i>\r
        <span>{{ error.message }}</span>\r
      </div>\r
\r
      <!-- Recipient Field -->\r
      <div class="form-group">\r
        <label for="recipient">To:</label>\r
        <input\r
          id="recipient"\r
          type="email"\r
          [(ngModel)]="formData().recipientEmail"\r
          placeholder="Recipient email"\r
          disabled\r
          class="form-input"\r
        />\r
      </div>\r
\r
      <!-- Subject Field -->\r
      <div class="form-group">\r
        <label for="subject">Subject:</label>\r
        <input\r
          id="subject"\r
          type="text"\r
          [(ngModel)]="formData().subject"\r
          placeholder="Email subject"\r
          [disabled]="isSending"\r
          class="form-input"\r
          [class.error]="validationErrors()['subject']"\r
        />\r
        <span *ngIf="validationErrors()['subject']" class="error-text">\r
          {{ validationErrors()['subject'] }}\r
        </span>\r
      </div>\r
\r
      <!-- Message Body Field -->\r
      <div class="form-group">\r
        <label for="body">Message:</label>\r
        <textarea\r
          id="body"\r
          [(ngModel)]="formData().body"\r
          placeholder="Write your message here..."\r
          [disabled]="isSending"\r
          class="form-textarea"\r
          [class.error]="validationErrors()['body']"\r
          rows="8"\r
        ></textarea>\r
        <span *ngIf="validationErrors()['body']" class="error-text">\r
          {{ validationErrors()['body'] }}\r
        </span>\r
      </div>\r
    </div>\r
\r
    <!-- Modal Footer -->\r
    <div class="modal-footer">\r
      <button (click)="cancel()" class="cancel-btn" [disabled]="isSending">\r
        Cancel\r
      </button>\r
      <button (click)="submit()" class="send-btn" [disabled]="isSending">\r
        <span *ngIf="!isSending">\r
          <i class="pi pi-send"></i>\r
          Send\r
        </span>\r
        <span *ngIf="isSending">\r
          <i class="pi pi-spin pi-spinner"></i>\r
          Sending...\r
        </span>\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/leads/components/email-threads/components/compose-modal/compose-modal.component.scss */\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.modal-content {\n  background-color: white;\n  border-radius: 0.75rem;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n  max-width: 600px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #111827;\n}\n.modal-header .close-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  background-color: transparent;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  color: #6b7280;\n  transition: all 0.2s;\n}\n.modal-header .close-btn:hover:not(:disabled) {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-header .close-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-header .close-btn i {\n  font-size: 1.25rem;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.modal-body .error-message {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background-color: #fee2e2;\n  border: 1px solid #fecaca;\n  border-radius: 0.375rem;\n  color: #991b1b;\n  font-size: 0.875rem;\n}\n.modal-body .error-message i {\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.modal-body .form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.modal-body .form-group label {\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.875rem;\n}\n.modal-body .form-group .form-input,\n.modal-body .form-group .form-textarea {\n  padding: 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-family: inherit;\n  transition: all 0.2s;\n}\n.modal-body .form-group .form-input:focus,\n.modal-body .form-group .form-textarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.modal-body .form-group .form-input:disabled,\n.modal-body .form-group .form-textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.modal-body .form-group .form-input.error,\n.modal-body .form-group .form-textarea.error {\n  border-color: #ef4444;\n}\n.modal-body .form-group .form-input.error:focus,\n.modal-body .form-group .form-textarea.error:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.modal-body .form-group .form-textarea {\n  resize: vertical;\n  min-height: 150px;\n}\n.modal-body .form-group .error-text {\n  color: #ef4444;\n  font-size: 0.75rem;\n}\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n}\n.modal-footer .cancel-btn,\n.modal-footer .send-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.modal-footer .cancel-btn i,\n.modal-footer .send-btn i {\n  font-size: 0.875rem;\n}\n.modal-footer .cancel-btn {\n  background-color: white;\n  color: #374151;\n  border: 1px solid #d1d5db;\n}\n.modal-footer .cancel-btn:hover:not(:disabled) {\n  background-color: #f3f4f6;\n}\n.modal-footer .cancel-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.modal-footer .send-btn {\n  background-color: #3b82f6;\n  color: white;\n}\n.modal-footer .send-btn:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.modal-footer .send-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@media (max-width: 767px) {\n  .modal-backdrop {\n    padding: 0;\n  }\n  .modal-content {\n    max-width: 100%;\n    max-height: 100vh;\n    border-radius: 0;\n  }\n  .modal-header {\n    padding: 1rem;\n  }\n  .modal-body {\n    padding: 1rem;\n    gap: 1rem;\n  }\n  .modal-footer {\n    padding: 1rem;\n    gap: 0.5rem;\n  }\n  .modal-footer .cancel-btn,\n  .modal-footer .send-btn {\n    flex: 1;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=compose-modal.component.css.map */\n"] }]
  }], null, { recipientEmail: [{
    type: Input
  }], isSending: [{
    type: Input
  }], error: [{
    type: Input
  }], emailSent: [{
    type: Output
  }], modalClosed: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ComposeModalComponent, { className: "ComposeModalComponent", filePath: "src/app/features/leads/components/email-threads/components/compose-modal/compose-modal.component.ts", lineNumber: 13 });
})();

// src/app/features/leads/components/email-threads/services/email-thread.service.ts
var EmailThreadService = class _EmailThreadService {
  http;
  apiUrl = "/api/tenant/email-threads";
  constructor(http) {
    this.http = http;
  }
  /**
   * Fetch email threads for a specific lead
   * GET /api/tenant/email-threads?entityType=lead&entityId={leadId}
   */
  getThreads(leadId) {
    return this.http.get(`${this.apiUrl}?entityType=lead&entityId=${leadId}`).pipe(
      retryWhen((errors) => errors.pipe(mergeMap((error, index) => {
        if (this.isNetworkError(error) && index < 2) {
          return timer(2e3);
        }
        return throwError(() => error);
      }))),
      catchError((error) => this.handleError(error)),
      // Extract the data array from the response
      mergeMap((response) => {
        if (response.success && Array.isArray(response.data)) {
          return new Observable((observer) => {
            observer.next(response.data);
            observer.complete();
          });
        }
        return throwError(() => ({
          type: "validation",
          message: "Invalid response format",
          retryable: false
        }));
      })
    );
  }
  /**
   * Fetch full thread details + messages
   * GET /api/tenant/email-threads/{threadId}
   */
  getThreadDetail(threadId) {
    return this.http.get(`${this.apiUrl}/${threadId}`).pipe(retryWhen((errors) => errors.pipe(mergeMap((error, index) => {
      if (this.isNetworkError(error) && index < 2) {
        return timer(2e3);
      }
      return throwError(() => error);
    }))), catchError((error) => this.handleError(error)));
  }
  /**
   * Send a new email (create new thread)
   * POST /api/tenant/email-threads
   */
  sendEmail(leadId, request) {
    const payload = {
      entityType: "lead",
      entityId: leadId,
      emailTo: request.recipientEmail,
      subject: request.subject,
      body: request.body
    };
    return this.http.post(this.apiUrl, payload).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Send a reply to an existing thread
   * POST /api/tenant/email-threads/{threadId}/messages
   */
  sendReply(threadId, request) {
    return this.http.post(`${this.apiUrl}/${threadId}/messages`, request).pipe(catchError((error) => this.handleError(error)));
  }
  /**
   * Check if error is a network error
   */
  isNetworkError(error) {
    return error instanceof HttpErrorResponse && (error.status === 0 || error.status >= 500);
  }
  /**
   * Handle HTTP errors and convert to ErrorState
   */
  handleError(error) {
    let errorState;
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorState = {
          type: "network",
          message: "Unable to connect. Please check your internet connection.",
          retryable: true
        };
      } else if (error.status >= 500) {
        errorState = {
          type: "server",
          message: "Server error. Please try again later.",
          retryable: true
        };
      } else if (error.status >= 400) {
        errorState = {
          type: "validation",
          message: error.error?.message || "Invalid request. Please check your input.",
          retryable: false
        };
      } else {
        errorState = {
          type: "server",
          message: "An unexpected error occurred.",
          retryable: true
        };
      }
    } else {
      errorState = {
        type: "server",
        message: "An unexpected error occurred.",
        retryable: true
      };
    }
    return throwError(() => errorState);
  }
  static \u0275fac = function EmailThreadService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailThreadService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmailThreadService, factory: _EmailThreadService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailThreadService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/leads/components/email-threads/email-threads-section.ts
function EmailThreadsSection_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "app-thread-list-view", 9);
    \u0275\u0275listener("threadSelected", function EmailThreadsSection_div_7_Template_app_thread_list_view_threadSelected_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectThread($event));
    })("retryClicked", function EmailThreadsSection_div_7_Template_app_thread_list_view_retryClicked_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retryLastAction());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("threads", ctx_r1.state().threads)("isLoading", ctx_r1.state().isLoadingThreads)("error", ctx_r1.state().threadsError);
  }
}
function EmailThreadsSection_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "app-thread-detail-view", 11);
    \u0275\u0275listener("backClicked", function EmailThreadsSection_div_8_Template_app_thread_detail_view_backClicked_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBackToThreadList());
    })("replyClicked", function EmailThreadsSection_div_8_Template_app_thread_detail_view_replyClicked_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openReplyCompose());
    })("replyCancelled", function EmailThreadsSection_div_8_Template_app_thread_detail_view_replyCancelled_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeReplyCompose());
    })("replySent", function EmailThreadsSection_div_8_Template_app_thread_detail_view_replySent_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendReply($event));
    })("retryClicked", function EmailThreadsSection_div_8_Template_app_thread_detail_view_retryClicked_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retryLastAction());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("threadDetail", ctx_r1.state().selectedThreadDetails)("isLoading", ctx_r1.state().isLoadingThreadDetail)("error", ctx_r1.state().threadDetailError)("isReplyComposeOpen", ctx_r1.state().isReplyComposeOpen)("isSendingReply", ctx_r1.state().isSendingReply)("sendError", ctx_r1.state().sendError);
  }
}
function EmailThreadsSection_app_compose_modal_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-compose-modal", 12);
    \u0275\u0275listener("emailSent", function EmailThreadsSection_app_compose_modal_9_Template_app_compose_modal_emailSent_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.sendEmail($event));
    })("modalClosed", function EmailThreadsSection_app_compose_modal_9_Template_app_compose_modal_modalClosed_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeComposeModal());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("recipientEmail", ctx_r1.leadEmail)("isSending", ctx_r1.state().isSendingEmail)("error", ctx_r1.state().sendError);
  }
}
var EmailThreadsSection = class _EmailThreadsSection {
  emailThreadService;
  leadId;
  leadEmail;
  // State management
  state = signal({
    threads: [],
    isLoadingThreads: false,
    threadsError: null,
    selectedThreadId: null,
    selectedThreadDetails: null,
    isLoadingThreadDetail: false,
    threadDetailError: null,
    isComposeModalOpen: false,
    isReplyComposeOpen: false,
    isSendingEmail: false,
    isSendingReply: false,
    sendError: null,
    lastRefresh: 0
  }, ...ngDevMode ? [{ debugName: "state" }] : []);
  constructor(emailThreadService) {
    this.emailThreadService = emailThreadService;
  }
  ngOnInit() {
    this.loadThreads();
  }
  /**
   * Load threads for the current lead
   */
  loadThreads() {
    const currentState = this.state();
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      isLoadingThreads: true,
      threadsError: null
    }));
    this.emailThreadService.getThreads(this.leadId).subscribe({
      next: (threads) => {
        const newState = this.state();
        this.state.set(__spreadProps(__spreadValues({}, newState), {
          threads,
          isLoadingThreads: false,
          lastRefresh: Date.now()
        }));
      },
      error: (error) => {
        const newState = this.state();
        this.state.set(__spreadProps(__spreadValues({}, newState), {
          isLoadingThreads: false,
          threadsError: error
        }));
      }
    });
  }
  /**
   * Select a thread and load its details
   */
  selectThread(threadId) {
    const currentState = this.state();
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      selectedThreadId: threadId,
      isLoadingThreadDetail: true,
      threadDetailError: null
    }));
    this.emailThreadService.getThreadDetail(threadId).subscribe({
      next: (details) => {
        const newState = this.state();
        this.state.set(__spreadProps(__spreadValues({}, newState), {
          selectedThreadDetails: details,
          isLoadingThreadDetail: false
        }));
      },
      error: (error) => {
        const newState = this.state();
        this.state.set(__spreadProps(__spreadValues({}, newState), {
          isLoadingThreadDetail: false,
          threadDetailError: error
        }));
      }
    });
  }
  /**
   * Go back to thread list
   */
  goBackToThreadList() {
    const currentState = this.state();
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      selectedThreadId: null,
      selectedThreadDetails: null,
      isReplyComposeOpen: false
    }));
  }
  /**
   * Open compose modal
   */
  openComposeModal() {
    const currentState = this.state();
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      isComposeModalOpen: true
    }));
  }
  /**
   * Close compose modal
   */
  closeComposeModal() {
    const currentState = this.state();
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      isComposeModalOpen: false,
      sendError: null
    }));
  }
  /**
   * Send a new email
   */
  sendEmail(request) {
    const currentState = this.state();
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      isSendingEmail: true,
      sendError: null
    }));
    this.emailThreadService.sendEmail(this.leadId, request).subscribe({
      next: () => {
        const newState = this.state();
        this.state.set(__spreadProps(__spreadValues({}, newState), {
          isSendingEmail: false,
          isComposeModalOpen: false
        }));
        this.loadThreads();
      },
      error: (error) => {
        const newState = this.state();
        this.state.set(__spreadProps(__spreadValues({}, newState), {
          isSendingEmail: false,
          sendError: error
        }));
      }
    });
  }
  /**
   * Send a reply to a thread
   */
  sendReply(request) {
    const currentState = this.state();
    const threadId = currentState.selectedThreadId;
    if (!threadId) {
      return;
    }
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      isSendingReply: true,
      sendError: null
    }));
    this.emailThreadService.sendReply(threadId, request).subscribe({
      next: () => {
        const newState = this.state();
        this.state.set(__spreadProps(__spreadValues({}, newState), {
          isSendingReply: false,
          isReplyComposeOpen: false
        }));
        this.selectThread(threadId);
      },
      error: (error) => {
        const newState = this.state();
        this.state.set(__spreadProps(__spreadValues({}, newState), {
          isSendingReply: false,
          sendError: error
        }));
      }
    });
  }
  /**
   * Retry last failed action
   */
  retryLastAction() {
    const currentState = this.state();
    if (currentState.threadsError) {
      this.loadThreads();
    } else if (currentState.threadDetailError && currentState.selectedThreadId) {
      this.selectThread(currentState.selectedThreadId);
    }
  }
  /**
   * Open reply compose
   */
  openReplyCompose() {
    const currentState = this.state();
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      isReplyComposeOpen: true
    }));
  }
  /**
   * Close reply compose
   */
  closeReplyCompose() {
    const currentState = this.state();
    this.state.set(__spreadProps(__spreadValues({}, currentState), {
      isReplyComposeOpen: false,
      sendError: null
    }));
  }
  static \u0275fac = function EmailThreadsSection_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailThreadsSection)(\u0275\u0275directiveInject(EmailThreadService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmailThreadsSection, selectors: [["app-email-threads-section"]], inputs: { leadId: "leadId", leadEmail: "leadEmail" }, decls: 10, vars: 4, consts: [[1, "email-threads-section"], [1, "email-threads-header"], [1, "text-lg", "font-semibold", "text-gray-800"], [1, "send-email-btn", 3, "click", "disabled"], [1, "pi", "pi-envelope"], ["class", "thread-list-container", 4, "ngIf"], ["class", "thread-detail-container", 4, "ngIf"], [3, "recipientEmail", "isSending", "error", "emailSent", "modalClosed", 4, "ngIf"], [1, "thread-list-container"], [3, "threadSelected", "retryClicked", "threads", "isLoading", "error"], [1, "thread-detail-container"], [3, "backClicked", "replyClicked", "replyCancelled", "replySent", "retryClicked", "threadDetail", "isLoading", "error", "isReplyComposeOpen", "isSendingReply", "sendError"], [3, "emailSent", "modalClosed", "recipientEmail", "isSending", "error"]], template: function EmailThreadsSection_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Email Threads");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function EmailThreadsSection_Template_button_click_4_listener() {
        return ctx.openComposeModal();
      });
      \u0275\u0275element(5, "i", 4);
      \u0275\u0275text(6, " Send Email ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, EmailThreadsSection_div_7_Template, 2, 3, "div", 5)(8, EmailThreadsSection_div_8_Template, 2, 6, "div", 6)(9, EmailThreadsSection_app_compose_modal_9_Template, 1, 3, "app-compose-modal", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.state().isSendingEmail);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", !ctx.state().selectedThreadId);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.state().selectedThreadId);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.state().isComposeModalOpen);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    FormsModule,
    HttpClientModule,
    ThreadListViewComponent,
    ThreadDetailViewComponent,
    ComposeModalComponent
  ], styles: ["\n\n.email-threads-section[_ngcontent-%COMP%] {\n  background-color: white;\n  border-radius: 0.75rem;\n  border: 1px solid #f3f4f6;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n  padding: 1.5rem;\n  padding-bottom: 2rem;\n  margin-bottom: 2rem;\n}\n.email-threads-section[_ngcontent-%COMP%]   .email-threads-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n}\n.email-threads-section[_ngcontent-%COMP%]   .email-threads-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.email-threads-section[_ngcontent-%COMP%]   .email-threads-header[_ngcontent-%COMP%]   .send-email-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: background-color 0.2s;\n}\n.email-threads-section[_ngcontent-%COMP%]   .email-threads-header[_ngcontent-%COMP%]   .send-email-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.email-threads-section[_ngcontent-%COMP%]   .email-threads-header[_ngcontent-%COMP%]   .send-email-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.email-threads-section[_ngcontent-%COMP%]   .email-threads-header[_ngcontent-%COMP%]   .send-email-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.email-threads-section[_ngcontent-%COMP%]   .thread-list-container[_ngcontent-%COMP%], \n.email-threads-section[_ngcontent-%COMP%]   .thread-detail-container[_ngcontent-%COMP%] {\n  width: 100%;\n}\n@media (max-width: 767px) {\n  .email-threads-section[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .email-threads-section[_ngcontent-%COMP%]   .email-threads-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n  }\n  .email-threads-section[_ngcontent-%COMP%]   .email-threads-header[_ngcontent-%COMP%]   .send-email-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=email-threads-section.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailThreadsSection, [{
    type: Component,
    args: [{ selector: "app-email-threads-section", standalone: true, imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ThreadListViewComponent,
      ThreadDetailViewComponent,
      ComposeModalComponent
    ], template: '<div class="email-threads-section">\r\n  <!-- Header with Send Email button -->\r\n  <div class="email-threads-header">\r\n    <h3 class="text-lg font-semibold text-gray-800">Email Threads</h3>\r\n    <button\r\n      (click)="openComposeModal()"\r\n      class="send-email-btn"\r\n      [disabled]="state().isSendingEmail"\r\n    >\r\n      <i class="pi pi-envelope"></i>\r\n      Send Email\r\n    </button>\r\n  </div>\r\n\r\n  <!-- Thread List View -->\r\n  <div *ngIf="!state().selectedThreadId" class="thread-list-container">\r\n    <app-thread-list-view\r\n      [threads]="state().threads"\r\n      [isLoading]="state().isLoadingThreads"\r\n      [error]="state().threadsError"\r\n      (threadSelected)="selectThread($event)"\r\n      (retryClicked)="retryLastAction()"\r\n    ></app-thread-list-view>\r\n  </div>\r\n\r\n  <!-- Thread Detail View -->\r\n  <div *ngIf="state().selectedThreadId" class="thread-detail-container">\r\n    <app-thread-detail-view\r\n      [threadDetail]="state().selectedThreadDetails"\r\n      [isLoading]="state().isLoadingThreadDetail"\r\n      [error]="state().threadDetailError"\r\n      [isReplyComposeOpen]="state().isReplyComposeOpen"\r\n      [isSendingReply]="state().isSendingReply"\r\n      [sendError]="state().sendError"\r\n      (backClicked)="goBackToThreadList()"\r\n      (replyClicked)="openReplyCompose()"\r\n      (replyCancelled)="closeReplyCompose()"\r\n      (replySent)="sendReply($event)"\r\n      (retryClicked)="retryLastAction()"\r\n    ></app-thread-detail-view>\r\n  </div>\r\n\r\n  <!-- Compose Modal -->\r\n  <app-compose-modal\r\n    *ngIf="state().isComposeModalOpen"\r\n    [recipientEmail]="leadEmail"\r\n    [isSending]="state().isSendingEmail"\r\n    [error]="state().sendError"\r\n    (emailSent)="sendEmail($event)"\r\n    (modalClosed)="closeComposeModal()"\r\n  ></app-compose-modal>\r\n</div>\r\n', styles: ["/* src/app/features/leads/components/email-threads/email-threads-section.scss */\n.email-threads-section {\n  background-color: white;\n  border-radius: 0.75rem;\n  border: 1px solid #f3f4f6;\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n  padding: 1.5rem;\n  padding-bottom: 2rem;\n  margin-bottom: 2rem;\n}\n.email-threads-section .email-threads-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n}\n.email-threads-section .email-threads-header h3 {\n  margin: 0;\n}\n.email-threads-section .email-threads-header .send-email-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: background-color 0.2s;\n}\n.email-threads-section .email-threads-header .send-email-btn:hover:not(:disabled) {\n  background-color: #2563eb;\n}\n.email-threads-section .email-threads-header .send-email-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.email-threads-section .email-threads-header .send-email-btn i {\n  font-size: 0.875rem;\n}\n.email-threads-section .thread-list-container,\n.email-threads-section .thread-detail-container {\n  width: 100%;\n}\n@media (max-width: 767px) {\n  .email-threads-section {\n    padding: 1rem;\n  }\n  .email-threads-section .email-threads-header {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n  }\n  .email-threads-section .email-threads-header .send-email-btn {\n    width: 100%;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=email-threads-section.css.map */\n"] }]
  }], () => [{ type: EmailThreadService }], { leadId: [{
    type: Input
  }], leadEmail: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmailThreadsSection, { className: "EmailThreadsSection", filePath: "src/app/features/leads/components/email-threads/email-threads-section.ts", lineNumber: 32 });
})();

// src/app/features/leads/pages/lead-detail/lead-detail.ts
function LeadDetail_a_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 26);
    \u0275\u0275text(1);
    \u0275\u0275element(2, "i", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("href", "mailto:" + ((tmp_3_0 = ctx_r1.lead()) == null ? null : tmp_3_0.email), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_4_0 = ctx_r1.lead()) == null ? null : tmp_4_0.email, " ");
  }
}
function LeadDetail_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, "\u2014");
  }
}
function LeadDetail_a_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 28);
    \u0275\u0275text(1);
    \u0275\u0275element(2, "i", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("href", ((tmp_3_0 = ctx_r1.lead()) == null ? null : tmp_3_0.website == null ? null : tmp_3_0.website.startsWith("http")) ? (tmp_3_0 = ctx_r1.lead()) == null ? null : tmp_3_0.website : "https://" + ((tmp_3_0 = ctx_r1.lead()) == null ? null : tmp_3_0.website), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_4_0 = ctx_r1.lead()) == null ? null : tmp_4_0.website, " ");
  }
}
function LeadDetail_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, "\u2014");
  }
}
function LeadDetail_ng_template_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
    \u0275\u0275text(2, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th");
    \u0275\u0275text(4, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Ciudad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "C\xF3digo postal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Pa\xEDs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "Principal");
    \u0275\u0275elementEnd()();
  }
}
function LeadDetail_ng_template_58_p_tag_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "p-tag", 35);
  }
}
function LeadDetail_ng_template_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "a", 31);
    \u0275\u0275text(5);
    \u0275\u0275element(6, "i", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 33);
    \u0275\u0275template(16, LeadDetail_ng_template_58_p_tag_16_Template, 1, 0, "p-tag", 34);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const address_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", address_r3.type, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r1.mapsUrl(address_r3), \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", address_r3.street_address, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", address_r3.city, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", address_r3.state, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", address_r3.postal_code, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", address_r3.country, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", address_r3.is_primary);
  }
}
function LeadDetail_ng_template_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "th");
    \u0275\u0275text(2, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "th");
    \u0275\u0275text(4, "T\xEDtulo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Fecha de actividad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Duraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Resultado");
    \u0275\u0275elementEnd()();
  }
}
function LeadDetail_ng_template_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 30);
    \u0275\u0275element(2, "p-tag", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "div", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 38);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275element(9, "p-tag", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 30);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const activity_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("value", activity_r4.type);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", activity_r4.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", activity_r4.description, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("value", activity_r4.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(12, 7, activity_r4.activity_date, "medium"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", activity_r4.duration_minutes, " min ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", activity_r4.outcome == null ? null : activity_r4.outcome.replace("_", " "), " ");
  }
}
var LeadDetail = class _LeadDetail {
  dialog;
  leads_service;
  route;
  lead_id = signal(null, ...ngDevMode ? [{ debugName: "lead_id" }] : []);
  lead = signal({}, ...ngDevMode ? [{ debugName: "lead" }] : []);
  activities = signal([], ...ngDevMode ? [{ debugName: "activities" }] : []);
  constructor(dialog, leads_service, route) {
    this.dialog = dialog;
    this.leads_service = leads_service;
    this.route = route;
    this.lead_id.set(this.route.snapshot.paramMap.get("id"));
  }
  ngOnInit() {
    this.getDetail();
  }
  openEdit() {
    this.dialog.open(LeadEditDialog, {
      data: this.lead()
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.getDetail();
      }
    });
  }
  getDetail() {
    this.leads_service.getDetail(this.lead_id()).subscribe((res) => {
      this.lead.set(res);
    });
  }
  createActivity() {
    this.dialog.open(LeadActivityDialog, {
      data: {
        lead_id: this.lead_id()
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.getDetail();
      }
    });
  }
  createAddress() {
    this.dialog.open(LeadAddressDialog, {
      data: {
        lead_id: this.lead_id()
      }
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.getDetail();
      }
    });
  }
  mapsUrl(address) {
    const parts = [
      address.street_address,
      address.city,
      address.state,
      address.postal_code,
      address.country
    ].filter(Boolean);
    const query = parts.join(", ");
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }
  static \u0275fac = function LeadDetail_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeadDetail)(\u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(LeadService), \u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeadDetail, selectors: [["app-lead-detail"]], decls: 67, vars: 22, consts: [["noEmail", ""], ["noWebsite", ""], [1, "space-y-10", "min-h-screen"], [1, "flex", "items-center", "justify-between"], [1, "text-3xl", "font-bold", "text-gray-900"], [1, "text-sm", "text-gray-500"], ["pButton", "", "label", "Editar lead", "icon", "pi pi-pencil", "size", "small", 1, "p-button-rounded", "p-button-solid", "text-sm", 3, "click"], [1, "bg-white", "shadow-md", "rounded-xl", "p-6", "border", "border-gray-100"], [1, "text-lg", "font-semibold", "text-gray-800", "mb-4"], [1, "grid", "grid-cols-2", "gap-y-3", "gap-x-10", "text-sm", "text-gray-800"], [1, "font-semibold", "text-gray-500"], ["class", "link-pro link-pro-break", 3, "href", 4, "ngIf", "ngIfElse"], [3, "phone", "countryCode", "countryPhoneCode"], [1, "col-span-2"], ["target", "_blank", "rel", "noopener noreferrer", "class", "link-pro link-pro-break", 3, "href", 4, "ngIf", "ngIfElse"], [1, "flex", "items-center", "gap-2"], ["rounded", "true", 3, "value"], [1, "mt-0.5"], [3, "leadId", "leadEmail"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-lg", "font-semibold", "text-gray-800"], ["pButton", "", "icon", "pi pi-plus", "label", "Agregar direcci\xF3n", 1, "p-button-sm", "p-button-outlined"], ["responsiveLayout", "scroll", "styleClass", "p-datatable-sm w-full", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], ["pButton", "", "icon", "pi pi-plus", "label", "Agregar actividad", 1, "p-button-sm", "p-button-outlined", 3, "click"], [1, "link-pro", "link-pro-break", 3, "href"], [1, "pi", "pi-envelope", "link-pro-icon"], ["target", "_blank", "rel", "noopener noreferrer", 1, "link-pro", "link-pro-break", 3, "href"], [1, "pi", "pi-external-link", "link-pro-icon"], [1, "capitalize"], ["target", "_blank", "rel", "noopener noreferrer", 1, "link-pro", "link-pro-muted", 3, "href"], [1, "pi", "pi-map-marker", "link-pro-icon"], [1, "text-center"], ["value", "Principal", "severity", "success", "rounded", "true", 4, "ngIf"], ["value", "Principal", "severity", "success", "rounded", "true"], ["severity", "info", "rounded", "true", 3, "value"], [1, "font-medium", "text-gray-800"], [1, "text-xs", "text-gray-500"], ["severity", "success", "rounded", "true", 3, "value"]], template: function LeadDetail_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div")(3, "h2", 4);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 5);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 6);
      \u0275\u0275listener("click", function LeadDetail_Template_button_click_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openEdit());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 7)(9, "h3", 8);
      \u0275\u0275text(10, " Informaci\xF3n del Lead ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 9)(12, "div")(13, "span", 10);
      \u0275\u0275text(14, "Nombre:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div")(17, "span", 10);
      \u0275\u0275text(18, "Apellido:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div")(21, "span", 10);
      \u0275\u0275text(22, "Email:");
      \u0275\u0275elementEnd();
      \u0275\u0275template(23, LeadDetail_a_23_Template, 3, 2, "a", 11)(24, LeadDetail_ng_template_24_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div")(27, "span", 10);
      \u0275\u0275text(28, "Tel\xE9fono:");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "app-phone", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div")(31, "span", 10);
      \u0275\u0275text(32, "Fuente:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 13)(35, "span", 10);
      \u0275\u0275text(36, "Sitio web:");
      \u0275\u0275elementEnd();
      \u0275\u0275template(37, LeadDetail_a_37_Template, 3, 2, "a", 14)(38, LeadDetail_ng_template_38_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 15)(41, "span", 10);
      \u0275\u0275text(42, "Estado:");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "p-tag", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 13)(45, "span", 10);
      \u0275\u0275text(46, "Creado el:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "div", 17);
      \u0275\u0275text(48);
      \u0275\u0275pipe(49, "date");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275element(50, "app-email-threads-section", 18);
      \u0275\u0275elementStart(51, "div", 7)(52, "div", 19)(53, "h3", 20);
      \u0275\u0275text(54, " Direcciones ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(55, "button", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p-table", 22);
      \u0275\u0275template(57, LeadDetail_ng_template_57_Template, 15, 0, "ng-template", 23)(58, LeadDetail_ng_template_58_Template, 17, 8, "ng-template", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(59, "div", 7)(60, "div", 19)(61, "h3", 20);
      \u0275\u0275text(62, " Actividades ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "button", 25);
      \u0275\u0275listener("click", function LeadDetail_Template_button_click_63_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createActivity());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "p-table", 22);
      \u0275\u0275template(65, LeadDetail_ng_template_65_Template, 13, 0, "ng-template", 23)(66, LeadDetail_ng_template_66_Template, 17, 10, "ng-template", 24);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_8_0;
      let tmp_9_0;
      let tmp_10_0;
      let tmp_11_0;
      let tmp_12_0;
      let tmp_14_0;
      let tmp_15_0;
      let tmp_17_0;
      let tmp_18_0;
      let tmp_19_0;
      const noEmail_r5 = \u0275\u0275reference(25);
      const noWebsite_r6 = \u0275\u0275reference(39);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate2(" ", (tmp_2_0 = ctx.lead()) == null ? null : tmp_2_0.name, " ", (tmp_2_0 = ctx.lead()) == null ? null : tmp_2_0.lastname, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", (tmp_3_0 = ctx.lead()) == null ? null : tmp_3_0.email, " ");
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" ", (tmp_4_0 = ctx.lead()) == null ? null : tmp_4_0.name, " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", (tmp_5_0 = ctx.lead()) == null ? null : tmp_5_0.lastname, " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.lead()) == null ? null : tmp_6_0.email)("ngIfElse", noEmail_r5);
      \u0275\u0275advance(6);
      \u0275\u0275property("phone", (tmp_8_0 = ctx.lead()) == null ? null : tmp_8_0.phone)("countryCode", (tmp_9_0 = ctx.lead()) == null ? null : tmp_9_0.phone_country)("countryPhoneCode", (tmp_10_0 = ctx.lead()) == null ? null : tmp_10_0.phone_code);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", (tmp_11_0 = ctx.lead()) == null ? null : tmp_11_0.source, " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", (tmp_12_0 = ctx.lead()) == null ? null : tmp_12_0.website)("ngIfElse", noWebsite_r6);
      \u0275\u0275advance(6);
      \u0275\u0275property("value", (tmp_14_0 = ctx.lead()) == null ? null : tmp_14_0.status == null ? null : tmp_14_0.status.name);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(49, 19, (tmp_15_0 = ctx.lead()) == null ? null : tmp_15_0.created_at, "medium"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("leadId", ctx.lead_id())("leadEmail", (tmp_17_0 = ctx.lead()) == null ? null : tmp_17_0.email);
      \u0275\u0275advance(6);
      \u0275\u0275property("value", (tmp_18_0 = ctx.lead()) == null ? null : tmp_18_0.addresses);
      \u0275\u0275advance(8);
      \u0275\u0275property("value", (tmp_19_0 = ctx.lead()) == null ? null : tmp_19_0.activities);
    }
  }, dependencies: [CommonModule, NgIf, TagModule, Tag, PrimeTemplate, ButtonModule, ButtonDirective, EmailThreadsSection, PhoneComponent, DatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeadDetail, [{
    type: Component,
    args: [{ selector: "app-lead-detail", standalone: true, schemas: [NO_ERRORS_SCHEMA], imports: [CommonModule, TagModule, ButtonModule, EmailThreadsSection, PhoneComponent], template: `<div class="space-y-10 min-h-screen">\r
\r
    <!-- HEADER -->\r
    <div class="flex items-center justify-between">\r
      <div>\r
        <h2 class="text-3xl font-bold text-gray-900">\r
          {{ lead()?.name }} {{ lead()?.lastname }}\r
        </h2>\r
        <p class="text-sm text-gray-500">\r
          {{ lead()?.email }}\r
        </p>\r
      </div>\r
  \r
      <button\r
        (click)="openEdit()"\r
        pButton\r
        label="Editar lead"\r
        icon="pi pi-pencil"\r
        class="p-button-rounded p-button-solid text-sm"\r
        size="small">\r
      </button>\r
    </div>\r
  \r
<!-- LEAD INFORMATION -->\r
<div class="bg-white shadow-md rounded-xl p-6 border border-gray-100">\r
  <h3 class="text-lg font-semibold text-gray-800 mb-4">\r
    Informaci\xF3n del Lead\r
  </h3>\r
\r
  <div class="grid grid-cols-2 gap-y-3 gap-x-10 text-sm text-gray-800">\r
\r
    <div>\r
      <span class="font-semibold text-gray-500">Nombre:</span>\r
      {{ lead()?.name }}\r
    </div>\r
\r
    <div>\r
      <span class="font-semibold text-gray-500">Apellido:</span>\r
      {{ lead()?.lastname }}\r
    </div>\r
\r
    <div>\r
      <span class="font-semibold text-gray-500">Email:</span>\r
      <a\r
      *ngIf="lead()?.email; else noEmail"\r
      [href]="'mailto:' + lead()?.email"\r
      class="link-pro link-pro-break"\r
    >\r
      {{ lead()?.email }}\r
      <i class="pi pi-envelope link-pro-icon"></i>\r
    </a>\r
      <ng-template #noEmail>\u2014</ng-template>\r
    </div>\r
\r
    <div>\r
      <span class="font-semibold text-gray-500">Tel\xE9fono:</span>\r
      <app-phone \r
        [phone]="lead()?.phone"\r
        [countryCode]="lead()?.phone_country"\r
        [countryPhoneCode]="lead()?.phone_code">\r
      </app-phone>\r
    </div>\r
\r
    <div>\r
      <span class="font-semibold text-gray-500">Fuente:</span>\r
      {{ lead()?.source }}\r
    </div>\r
\r
    <!-- Website ocupa 2 columnas -->\r
    <div class="col-span-2">\r
      <span class="font-semibold text-gray-500">Sitio web:</span>\r
\r
      <a\r
      *ngIf="lead()?.website; else noWebsite"\r
      [href]="lead()?.website?.startsWith('http') ? lead()?.website : ('https://' + lead()?.website)"\r
      target="_blank"\r
      rel="noopener noreferrer"\r
      class="link-pro link-pro-break"\r
    >\r
      {{ lead()?.website }}\r
      <i class="pi pi-external-link link-pro-icon"></i>\r
    </a>\r
      <ng-template #noWebsite>\u2014</ng-template>\r
    </div>\r
\r
    <div class="flex items-center gap-2">\r
      <span class="font-semibold text-gray-500">Estado:</span>\r
      <p-tag\r
        [value]="lead()?.status?.name"\r
        rounded="true">\r
      </p-tag>\r
    </div>\r
\r
    <div class="col-span-2">\r
      <span class="font-semibold text-gray-500">Creado el:</span>\r
      <div class="mt-0.5">\r
        {{ lead()?.created_at | date:'medium' }}\r
      </div>\r
    </div>\r
\r
  </div>\r
</div>\r
\r
<!-- EMAIL THREADS -->\r
<app-email-threads-section\r
  [leadId]="lead_id()"\r
  [leadEmail]="lead()?.email"\r
></app-email-threads-section>\r
\r
<!-- ADDRESSES -->\r
<div class="bg-white shadow-md rounded-xl p-6 border border-gray-100">\r
\r
    <!-- Header with action -->\r
    <div class="flex items-center justify-between mb-4">\r
      <h3 class="text-lg font-semibold text-gray-800">\r
        Direcciones\r
      </h3>\r
  \r
      <button\r
        pButton\r
        icon="pi pi-plus"\r
        label="Agregar direcci\xF3n"\r
        class="p-button-sm p-button-outlined"\r
    >\r
      </button>\r
    </div>\r
  \r
    <p-table\r
      [value]="lead()?.addresses"\r
      responsiveLayout="scroll"\r
      styleClass="p-datatable-sm w-full">\r
  \r
      <!-- HEADER -->\r
      <ng-template pTemplate="header">\r
        <tr>\r
          <th>Tipo</th>\r
          <th>Direcci\xF3n</th>\r
          <th>Ciudad</th>\r
          <th>Estado</th>\r
          <th>C\xF3digo postal</th>\r
          <th>Pa\xEDs</th>\r
          <th>Principal</th>\r
        </tr>\r
      </ng-template>\r
  \r
      <!-- BODY -->\r
      <ng-template pTemplate="body" let-address>\r
        <tr>\r
          <td class="capitalize">\r
            {{ address.type }}\r
          </td>\r
  \r
          <td>\r
            <a\r
            [href]="mapsUrl(address)"\r
            target="_blank"\r
            rel="noopener noreferrer"\r
            class="link-pro link-pro-muted"\r
          >\r
            {{ address.street_address }}\r
            <i class="pi pi-map-marker link-pro-icon"></i>\r
          </a>\r
          </td>\r
          \r
  \r
          <td>\r
            {{ address.city }}\r
          </td>\r
  \r
          <td>\r
            {{ address.state }}\r
          </td>\r
  \r
          <td>\r
            {{ address.postal_code }}\r
          </td>\r
  \r
          <td>\r
            {{ address.country }}\r
          </td>\r
  \r
          <td class="text-center">\r
            <p-tag\r
              *ngIf="address.is_primary"\r
              value="Principal"\r
              severity="success"\r
              rounded="true">\r
            </p-tag>\r
          </td>\r
        </tr>\r
      </ng-template>\r
  \r
    </p-table>\r
</div>\r
\r
\r
<!-- ACTIVITIES -->\r
<div class="bg-white shadow-md rounded-xl p-6 border border-gray-100">\r
\r
    <!-- Header with action -->\r
    <div class="flex items-center justify-between mb-4">\r
      <h3 class="text-lg font-semibold text-gray-800">\r
        Actividades\r
      </h3>\r
  \r
      <button\r
        pButton\r
        icon="pi pi-plus"\r
        label="Agregar actividad"\r
        class="p-button-sm p-button-outlined"\r
        (click)="createActivity()"\r
        >\r
      </button>\r
    </div>\r
  \r
    <p-table\r
      [value]="lead()?.activities"\r
      responsiveLayout="scroll"\r
      styleClass="p-datatable-sm w-full"\r
      >\r
  \r
      <!-- HEADER -->\r
      <ng-template pTemplate="header">\r
        <tr>\r
          <th>Tipo</th>\r
          <th>T\xEDtulo</th>\r
          <th>Estado</th>\r
          <th>Fecha de actividad</th>\r
          <th>Duraci\xF3n</th>\r
          <th>Resultado</th>\r
        </tr>\r
      </ng-template>\r
  \r
      <!-- BODY -->\r
      <ng-template pTemplate="body" let-activity>\r
        <tr>\r
  \r
          <!-- Type -->\r
          <td class="capitalize">\r
            <p-tag\r
              [value]="activity.type"\r
              severity="info"\r
              rounded="true">\r
            </p-tag>\r
          </td>\r
  \r
          <!-- Title + description -->\r
          <td>\r
            <div class="font-medium text-gray-800">\r
              {{ activity.title }}\r
            </div>\r
            <div class="text-xs text-gray-500">\r
              {{ activity.description }}\r
            </div>\r
          </td>\r
  \r
          <!-- Status -->\r
          <td>\r
            <p-tag\r
              [value]="activity.status"\r
              severity="success"\r
              rounded="true">\r
            </p-tag>\r
          </td>\r
  \r
          <!-- Activity date -->\r
          <td>\r
            {{ activity.activity_date | date:'medium' }}\r
          </td>\r
  \r
          <!-- Duration -->\r
          <td>\r
            {{ activity.duration_minutes }} min\r
          </td>\r
  \r
          <!-- Outcome -->\r
          <td class="capitalize">\r
            {{ activity.outcome?.replace('_', ' ') }}\r
          </td>\r
  \r
        </tr>\r
      </ng-template>\r
  \r
    </p-table>\r
  </div>\r
  \r
  \r
  \r
  </div>\r
  ` }]
  }], () => [{ type: MatDialog }, { type: LeadService }, { type: ActivatedRoute }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeadDetail, { className: "LeadDetail", filePath: "src/app/features/leads/pages/lead-detail/lead-detail.ts", lineNumber: 21 });
})();
export {
  LeadDetail
};
//# sourceMappingURL=chunk-SOYWRMMH.js.map
