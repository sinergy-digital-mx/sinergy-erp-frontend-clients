import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import {
  InterceptorService
} from "./chunk-K22JBEUE.js";
import {
  InputComponent
} from "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-XYBC4MWB.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
import {
  FormBuilder,
  FormGroupDirective,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators
} from "./chunk-TXPVZZCM.js";
import {
  HttpClient,
  Router,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  Inject,
  Injectable,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7ZU2RCPO.js";

// src/app/features/properties/services/property.service.ts
var PropertyService = class _PropertyService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getProperties(params) {
    return this.http.get(`${this.api}/tenant/properties`, { params });
  }
  getProperty(id) {
    return this.http.get(`${this.api}/tenant/properties/${id}`);
  }
  getPropertyByCode(code) {
    return this.http.get(`${this.api}/tenant/properties/by-code/${code}`);
  }
  createProperty(data) {
    return this.http.post(`${this.api}/tenant/properties`, data);
  }
  updateProperty(id, data) {
    return this.http.put(`${this.api}/tenant/properties/${id}`, data);
  }
  deleteProperty(id) {
    return this.http.delete(`${this.api}/tenant/properties/${id}`);
  }
  getMeasurementUnits() {
    return this.http.get(`${this.api}/tenant/properties/measurement-units/all`);
  }
  static \u0275fac = function PropertyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertyService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PropertyService, factory: _PropertyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertyService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/properties/components/property-edit-modal/property-edit-modal.component.ts
function PropertyEditModalComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "label", 12);
    \u0275\u0275text(2, "Propietario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19)(4, "span", 20);
    \u0275\u0275listener("click", function PropertyEditModalComponent_div_35_Template_span_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToCustomer());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 21);
    \u0275\u0275text(7, "(Contrato activo)");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.getOwnerName(), " ");
  }
}
var PropertyEditModalComponent = class _PropertyEditModalComponent {
  fb;
  dialog;
  dialog_ref;
  data;
  propertyService;
  interceptor_service;
  router;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  update = signal(false, ...ngDevMode ? [{ debugName: "update" }] : []);
  measurementUnits = signal([], ...ngDevMode ? [{ debugName: "measurementUnits" }] : []);
  loadingUnits = signal(false, ...ngDevMode ? [{ debugName: "loadingUnits" }] : []);
  propertyGroups = signal([], ...ngDevMode ? [{ debugName: "propertyGroups" }] : []);
  loadingGroups = signal(false, ...ngDevMode ? [{ debugName: "loadingGroups" }] : []);
  X = X;
  form;
  statusSelectConfig = {
    placeholder: "Selecciona un estado",
    data: [
      { value: "disponible", label: "Disponible" },
      { value: "vendido", label: "Vendido" },
      { value: "reservado", label: "Reservado" },
      { value: "cancelado", label: "Cancelado" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  measurementUnitSelectConfig = {
    placeholder: "Selecciona una unidad",
    data: [],
    value: "id",
    option: "displayName",
    form_control: null,
    loading: true
  };
  currencySelectConfig = {
    placeholder: "Selecciona una moneda",
    data: [
      { value: "MXN", label: "MXN - Peso Mexicano" },
      { value: "USD", label: "USD - D\xF3lar" },
      { value: "EUR", label: "EUR - Euro" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  groupSelectConfig = {
    placeholder: "Selecciona un proyecto",
    data: [],
    value: "id",
    option: "name",
    form_control: null,
    loading: true
  };
  constructor(fb, dialog, dialog_ref, data, propertyService, interceptor_service, router) {
    this.fb = fb;
    this.dialog = dialog;
    this.dialog_ref = dialog_ref;
    this.data = data;
    this.propertyService = propertyService;
    this.interceptor_service = interceptor_service;
    this.router = router;
    this.form = this.fb.group({
      code: [{ value: "", disabled: true }],
      // Auto-generado, solo lectura
      block: ["", [Validators.required]],
      lot_number: ["", [Validators.required]],
      name: ["", [Validators.required]],
      description: [""],
      location: [""],
      group_id: ["", [Validators.required]],
      total_area: ["", [Validators.required, Validators.min(0)]],
      measurement_unit_id: ["", [Validators.required]],
      total_price: ["", [Validators.required, Validators.min(0)]],
      currency: ["MXN"],
      status: ["disponible"]
    });
    this.statusSelectConfig.form_control = this.form.get("status");
    this.measurementUnitSelectConfig.form_control = this.form.get("measurement_unit_id");
    this.currencySelectConfig.form_control = this.form.get("currency");
    this.groupSelectConfig.form_control = this.form.get("group_id");
    this.form.get("block")?.valueChanges.subscribe(() => {
      this.generateCode();
    });
    this.form.get("lot_number")?.valueChanges.subscribe(() => {
      this.generateCode();
    });
  }
  ngOnInit() {
    this.loadMeasurementUnits();
    this.loadPropertyGroups();
    this.populateFormData();
  }
  populateFormData() {
    if (this.data?.property) {
      this.form.patchValue({
        code: this.data.property.code,
        block: this.data.property.block || "",
        lot_number: this.data.property.lot_number || "",
        name: this.data.property.name,
        description: this.data.property.description || "",
        location: this.data.property.location || "",
        group_id: this.data.property.group_id,
        total_area: this.data.property.total_area,
        measurement_unit_id: this.data.property.measurement_unit_id,
        total_price: this.data.property.total_price,
        currency: this.data.property.currency,
        status: this.data.property.status
      });
    }
  }
  generateCode() {
    const block = this.form.get("block")?.value;
    const lotNumber = this.form.get("lot_number")?.value;
    if (block && lotNumber) {
      const code = `LOT-${block}-${lotNumber.toString().padStart(2, "0")}`;
      this.form.get("code")?.setValue(code);
    } else {
      this.form.get("code")?.setValue("");
    }
  }
  loadPropertyGroups() {
    this.loadingGroups.set(true);
    const groups = [
      {
        id: "550e8400-e29b-41d4-a716-446655440100",
        name: "Campestre Divino"
      }
    ];
    this.propertyGroups.set(groups);
    this.groupSelectConfig = __spreadProps(__spreadValues({}, this.groupSelectConfig), {
      data: groups,
      loading: false
    });
    this.loadingGroups.set(false);
  }
  loadMeasurementUnits() {
    this.loadingUnits.set(true);
    this.propertyService.getMeasurementUnits().subscribe({
      next: (units) => {
        this.measurementUnits.set(units);
        const mappedUnits = units.map((unit) => ({
          id: unit.id,
          name: unit.name,
          symbol: unit.symbol,
          displayName: `${unit.name} (${unit.symbol})`
        }));
        this.measurementUnitSelectConfig = __spreadProps(__spreadValues({}, this.measurementUnitSelectConfig), {
          data: mappedUnits,
          loading: false
        });
        this.loadingUnits.set(false);
      },
      error: () => {
        this.measurementUnitSelectConfig = __spreadProps(__spreadValues({}, this.measurementUnitSelectConfig), {
          loading: false
        });
        this.loadingUnits.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: "No pudimos cargar las unidades de medida."
        });
      }
    });
  }
  closeDialog() {
    if (!this.loading()) {
      this.dialog_ref.close(this.update());
    }
  }
  getOwnerName() {
    const owner = this.data?.property?.contracts?.[0]?.customer;
    if (!owner)
      return null;
    return `${owner.name} ${owner.lastname}`;
  }
  navigateToCustomer() {
    const customerId = this.data?.property?.contracts?.[0]?.customer?.id;
    if (customerId) {
      this.dialog_ref.close();
      this.router.navigate(["/customers/detail", customerId]);
    }
  }
  submit() {
    if (this.data?.property?.id) {
      this.updateProperty();
    } else {
      this.createProperty();
    }
  }
  createProperty() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.form.get("code")?.enable();
    const payload = __spreadValues({}, this.form.value);
    this.form.get("code")?.disable();
    this.propertyService.createProperty(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Lote creado correctamente."
        });
        this.closeDialog();
      },
      error: () => {
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: "No pudimos crear el lote. Por favor intenta de nuevo."
        });
      }
    });
  }
  updateProperty() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.form.get("code")?.enable();
    const payload = __spreadValues({}, this.form.value);
    this.form.get("code")?.disable();
    this.propertyService.updateProperty(this.data.property.id, payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Lote actualizado correctamente."
        });
        this.closeDialog();
      },
      error: () => {
        this.loading.set(false);
        this.interceptor_service.openSnackbar({
          type: "error",
          title: "Error",
          message: "No pudimos actualizar el lote. Por favor intenta de nuevo."
        });
      }
    });
  }
  static \u0275fac = function PropertyEditModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertyEditModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PropertyEditModalComponent, selectors: [["app-property-edit-modal"]], decls: 38, vars: 19, consts: [[1, "dialog"], [1, "dialog__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "dialog__body"], [1, "container", "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", 3, "formGroup"], ["label", "Manzana", 3, "form_control"], ["label", "N\xFAmero de Lote", 3, "form_control"], [1, "md:col-span-2"], ["label", "C\xF3digo del Lote (Auto-generado)", 3, "form_control", "readonly"], ["label", "Nombre del Lote", 3, "form_control"], ["label", "Descripci\xF3n", "type", "textarea", 3, "form_control"], ["label", "Ubicaci\xF3n", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [3, "config"], ["label", "\xC1rea Total", "type", "number", 3, "form_control"], ["label", "Precio Total", "type", "number", 3, "form_control"], [4, "ngIf"], [1, "dialog__footer"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading"], [1, "flex", "items-center", "gap-2", "px-3", "py-2", "bg-gray-50", "border", "border-gray-200", "rounded-lg"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "cursor-pointer", "hover:bg-blue-200", "transition-colors", 3, "click"], [1, "text-xs", "text-gray-500"]], template: function PropertyEditModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function PropertyEditModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "div", 4);
      \u0275\u0275element(7, "app-input", 5)(8, "app-input", 6);
      \u0275\u0275elementStart(9, "div", 7);
      \u0275\u0275element(10, "app-input", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 7);
      \u0275\u0275element(12, "app-input", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 7);
      \u0275\u0275element(14, "app-input", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 7);
      \u0275\u0275element(16, "app-input", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 7)(18, "label", 12);
      \u0275\u0275text(19, "Proyecto");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "app-select", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275element(21, "app-input", 14);
      \u0275\u0275elementStart(22, "div")(23, "label", 12);
      \u0275\u0275text(24, "Unidad de Medida");
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "app-select", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275element(26, "app-input", 15);
      \u0275\u0275elementStart(27, "div")(28, "label", 12);
      \u0275\u0275text(29, "Moneda");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "app-select", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "label", 12);
      \u0275\u0275text(33, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "app-select", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275template(35, PropertyEditModalComponent_div_35_Template, 8, 1, "div", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div", 17)(37, "app-button", 18);
      \u0275\u0275listener("clicked", function PropertyEditModalComponent_Template_app_button_clicked_37_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate((ctx.data == null ? null : ctx.data.property == null ? null : ctx.data.property.id) ? "Actualizar Lote" : "Crear Lote");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["block"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["lot_number"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["code"])("readonly", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["name"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["description"]);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.controls["location"]);
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.groupSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["total_area"]);
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.measurementUnitSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["total_price"]);
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.currencySelectConfig);
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (ctx.data == null ? null : ctx.data.property == null ? null : ctx.data.property.id) && ctx.getOwnerName());
      \u0275\u0275advance(2);
      \u0275\u0275property("text", (ctx.data == null ? null : ctx.data.property == null ? null : ctx.data.property.id) ? "Actualizar" : "Crear")("loading", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    NgControlStatusGroup,
    FormGroupDirective,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent
  ], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 100dvw;\n  max-width: 700px;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n}\n.dialog__header[_ngcontent-%COMP%] {\n  padding: 24px 24px 0 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #e5e7eb;\n  padding-bottom: 16px;\n  margin-bottom: 0;\n}\n.dialog__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  color: #6b7280;\n  transition: color 0.2s ease;\n}\n.dialog__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #374151;\n}\n.dialog__body[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-height: 70vh;\n  overflow-y: auto;\n}\n.dialog__body[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n  max-width: none;\n}\n.dialog__footer[_ngcontent-%COMP%] {\n  padding: 16px 24px 24px 24px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  background: #f9fafb;\n}\n/*# sourceMappingURL=property-edit-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertyEditModalComponent, [{
    type: Component,
    args: [{ selector: "app-property-edit-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      InputComponent,
      ButtonComponent,
      SelectComponent,
      LucideAngularModule
    ], template: `<div class="dialog">\r
  <div class="dialog__header">\r
    <h2>{{ data?.property?.id ? 'Actualizar Lote' : 'Crear Lote' }}</h2>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="closeDialog()">\r
    </lucide-icon>\r
  </div>\r
\r
  <div class="dialog__body">\r
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-4" [formGroup]="form">\r
      <!-- Manzana -->\r
      <app-input\r
        label="Manzana"\r
        [form_control]="form.controls['block']">\r
      </app-input>\r
\r
      <!-- N\xFAmero de Lote -->\r
      <app-input\r
        label="N\xFAmero de Lote"\r
        [form_control]="form.controls['lot_number']">\r
      </app-input>\r
\r
      <!-- C\xF3digo del Lote (Auto-generado) -->\r
      <div class="md:col-span-2">\r
        <app-input\r
          label="C\xF3digo del Lote (Auto-generado)"\r
          [form_control]="form.controls['code']"\r
          [readonly]="true">\r
        </app-input>\r
      </div>\r
\r
      <!-- Nombre -->\r
      <div class="md:col-span-2">\r
        <app-input\r
          label="Nombre del Lote"\r
          [form_control]="form.controls['name']">\r
        </app-input>\r
      </div>\r
\r
      <!-- Descripci\xF3n -->\r
      <div class="md:col-span-2">\r
        <app-input\r
          label="Descripci\xF3n"\r
          type="textarea"\r
          [form_control]="form.controls['description']">\r
        </app-input>\r
      </div>\r
\r
      <!-- Ubicaci\xF3n -->\r
      <div class="md:col-span-2">\r
        <app-input\r
          label="Ubicaci\xF3n"\r
          [form_control]="form.controls['location']">\r
        </app-input>\r
      </div>\r
\r
      <!-- Proyecto/Grupo -->\r
      <div class="md:col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>\r
        <app-select\r
          [config]="groupSelectConfig">\r
        </app-select>\r
      </div>\r
\r
      <!-- \xC1rea Total -->\r
      <app-input\r
        label="\xC1rea Total"\r
        type="number"\r
        [form_control]="form.controls['total_area']">\r
      </app-input>\r
\r
      <!-- Unidad de Medida -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Unidad de Medida</label>\r
        <app-select\r
          [config]="measurementUnitSelectConfig">\r
        </app-select>\r
      </div>\r
\r
      <!-- Precio Total -->\r
      <app-input\r
        label="Precio Total"\r
        type="number"\r
        [form_control]="form.controls['total_price']">\r
      </app-input>\r
\r
      <!-- Moneda -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Moneda</label>\r
        <app-select\r
          [config]="currencySelectConfig">\r
        </app-select>\r
      </div>\r
\r
      <!-- Estado -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>\r
        <app-select\r
          [config]="statusSelectConfig">\r
        </app-select>\r
      </div>\r
\r
      <!-- Propietario (solo lectura) -->\r
      <div *ngIf="data?.property?.id && getOwnerName()">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Propietario</label>\r
        <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">\r
          <span \r
            (click)="navigateToCustomer()"\r
            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors">\r
            {{ getOwnerName() }}\r
          </span>\r
          <span class="text-xs text-gray-500">(Contrato activo)</span>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="dialog__footer">\r
    <app-button\r
      [text]="data?.property?.id ? 'Actualizar' : 'Crear'"\r
      custom_class="btn_primary"\r
      [loading]="loading()"\r
      (clicked)="submit()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/properties/components/property-edit-modal/property-edit-modal.component.scss */\n.dialog {\n  width: 100dvw;\n  max-width: 700px;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n}\n.dialog__header {\n  padding: 24px 24px 0 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #e5e7eb;\n  padding-bottom: 16px;\n  margin-bottom: 0;\n}\n.dialog__header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.dialog__header .close {\n  color: #6b7280;\n  transition: color 0.2s ease;\n}\n.dialog__header .close:hover {\n  color: #374151;\n}\n.dialog__body {\n  padding: 24px;\n  max-height: 70vh;\n  overflow-y: auto;\n}\n.dialog__body .container {\n  max-width: none;\n}\n.dialog__footer {\n  padding: 16px 24px 24px 24px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  background: #f9fafb;\n}\n/*# sourceMappingURL=property-edit-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialog }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: PropertyService }, { type: InterceptorService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PropertyEditModalComponent, { className: "PropertyEditModalComponent", filePath: "src/app/features/properties/components/property-edit-modal/property-edit-modal.component.ts", lineNumber: 28 });
})();

export {
  PropertyService,
  PropertyEditModalComponent
};
//# sourceMappingURL=chunk-ADUVL4TN.js.map
