import {
  ProductService
} from "./chunk-FIZPSH25.js";
import {
  WarehouseService
} from "./chunk-E7QIYR5Q.js";
import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import {
  CustomSnackbarComponent
} from "./chunk-Y4MZBWJH.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import {
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-XYBC4MWB.js";
import {
  MatSnackBar
} from "./chunk-KNFYVOET.js";
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-TXPVZZCM.js";
import {
  HttpClient,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  DecimalPipe,
  NgForOf,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  Output,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7ZU2RCPO.js";

// src/app/features/settings/services/branch.service.ts
var BranchService = class _BranchService {
  http;
  apiUrl = `${environment.api}/tenant`;
  constructor(http) {
    this.http = http;
  }
  // Trae todas las sucursales del tenant (para selects/dropdowns)
  getAllBranches() {
    return this.http.get(`${this.apiUrl}/billing/branches`);
  }
  // CRUD por fiscal config
  getBranches(fiscalConfigId) {
    return this.http.get(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches`);
  }
  getBranch(fiscalConfigId, branchId) {
    return this.http.get(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`);
  }
  createBranch(fiscalConfigId, data) {
    return this.http.post(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches`, data);
  }
  updateBranch(fiscalConfigId, branchId, data) {
    return this.http.put(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`, data);
  }
  deleteBranch(fiscalConfigId, branchId) {
    return this.http.delete(`${this.apiUrl}/fiscal-configurations/${fiscalConfigId}/branches/${branchId}`);
  }
  static \u0275fac = function BranchService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BranchService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BranchService, factory: _BranchService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BranchService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/settings/components/warehouse-detail-modal/warehouse-detail-modal.component.ts
function WarehouseDetailModalComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 19);
    \u0275\u0275text(1, " Nombre requerido (m\xEDn. 2 caracteres) ");
    \u0275\u0275elementEnd();
  }
}
var WarehouseDetailModalComponent = class _WarehouseDetailModalComponent {
  fb;
  warehouseService;
  branchService;
  snackBar;
  dialogRef;
  data;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  isNew = true;
  branches = signal([], ...ngDevMode ? [{ debugName: "branches" }] : []);
  loadingBranches = signal(false, ...ngDevMode ? [{ debugName: "loadingBranches" }] : []);
  statusOptions = [
    { id: "active", name: "Activo" },
    { id: "inactive", name: "Inactivo" }
  ];
  countryOptions = [
    { id: "M\xE9xico", name: "M\xE9xico" },
    { id: "Estados Unidos", name: "Estados Unidos" },
    { id: "Canad\xE1", name: "Canad\xE1" },
    { id: "Espa\xF1a", name: "Espa\xF1a" },
    { id: "Argentina", name: "Argentina" },
    { id: "Brasil", name: "Brasil" },
    { id: "Chile", name: "Chile" },
    { id: "Colombia", name: "Colombia" },
    { id: "Per\xFA", name: "Per\xFA" },
    { id: "Venezuela", name: "Venezuela" },
    { id: "Guatemala", name: "Guatemala" },
    { id: "Honduras", name: "Honduras" },
    { id: "El Salvador", name: "El Salvador" },
    { id: "Nicaragua", name: "Nicaragua" },
    { id: "Costa Rica", name: "Costa Rica" },
    { id: "Panam\xE1", name: "Panam\xE1" },
    { id: "Cuba", name: "Cuba" },
    { id: "Rep\xFAblica Dominicana", name: "Rep\xFAblica Dominicana" },
    { id: "Puerto Rico", name: "Puerto Rico" }
  ];
  // Select configurations
  statusSelectConfig;
  countrySelectConfig;
  branchSelectConfig;
  constructor(fb, warehouseService, branchService, snackBar, dialogRef, data) {
    this.fb = fb;
    this.warehouseService = warehouseService;
    this.branchService = branchService;
    this.snackBar = snackBar;
    this.dialogRef = dialogRef;
    this.data = data;
    this.isNew = !data.warehouse;
    this.form = this.createForm();
  }
  ngOnInit() {
    this.initializeSelectConfigs();
    this.loadBranches();
  }
  initializeSelectConfigs() {
    this.statusSelectConfig = {
      placeholder: "Selecciona status",
      data: this.statusOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("status"),
      name_select: "status"
    };
    this.countrySelectConfig = {
      placeholder: "Selecciona un pa\xEDs",
      data: this.countryOptions,
      value: "id",
      option: "name",
      form_control: this.form.get("country"),
      name_select: "country"
    };
    this.branchSelectConfig = {
      placeholder: "Selecciona una sucursal (opcional)",
      data: this.branches(),
      value: "id",
      option: "display_name",
      form_control: this.form.get("billing_branch_id"),
      name_select: "billing_branch_id"
    };
  }
  loadBranches() {
    this.loadingBranches.set(true);
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
        this.loadingBranches.set(false);
        this.branchSelectConfig = __spreadProps(__spreadValues({}, this.branchSelectConfig), {
          data: branches
        });
        if (this.data.warehouse) {
          this.form.patchValue(this.data.warehouse);
        }
      },
      error: () => {
        this.loadingBranches.set(false);
        if (this.data.warehouse) {
          this.form.patchValue(this.data.warehouse);
        }
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: "Error al cargar sucursales", type: "error" },
          duration: 3e3
        });
      }
    });
  }
  getBranchLabel(branch) {
    return `${branch.code} - ${branch.city}, ${branch.state}`;
  }
  createForm() {
    return this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      code: [""],
      description: [""],
      street: [""],
      city: [""],
      state: [""],
      zip_code: [""],
      country: [""],
      billing_branch_id: [""],
      status: ["active"]
    });
  }
  save() {
    if (this.form.invalid || this.saving())
      return;
    this.saving.set(true);
    const formValue = this.form.value;
    if (this.isNew) {
      this.warehouseService.createWarehouse(formValue).subscribe({
        next: (warehouse) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Almac\xE9n creado correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(warehouse);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al crear almac\xE9n", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    } else {
      this.warehouseService.updateWarehouse(this.data.warehouse.id, formValue).subscribe({
        next: (warehouse) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: "Almac\xE9n actualizado correctamente", type: "success" },
            duration: 3e3
          });
          this.saving.set(false);
          this.dialogRef.close(warehouse);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || "Error al actualizar almac\xE9n", type: "error" },
            duration: 5e3
          });
          this.saving.set(false);
        }
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
  onStatusChange(event) {
    this.form.get("status")?.setValue(event.value, { emitEvent: false });
  }
  onCountryChange(event) {
    this.form.get("country")?.setValue(event.value, { emitEvent: false });
  }
  onBranchChange(event) {
    this.form.get("billing_branch_id")?.setValue(event.value, { emitEvent: false });
  }
  static \u0275fac = function WarehouseDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WarehouseDetailModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(WarehouseService), \u0275\u0275directiveInject(BranchService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WarehouseDetailModalComponent, selectors: [["app-warehouse-detail-modal"]], decls: 51, vars: 10, consts: [[1, "warehouse-modal"], [1, "warehouse-modal__header"], [1, "close", "cursor-pointer", 3, "click", "img"], [1, "warehouse-modal__body"], [3, "formGroup"], [1, "col-span-2"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["type", "text", "formControlName", "name", "placeholder", "Nombre del almac\xE9n", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["type", "text", "formControlName", "code", "placeholder", "Ej: ALM-001", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500", "uppercase"], [3, "changeOption", "config"], ["formControlName", "description", "placeholder", "Descripci\xF3n del almac\xE9n", "rows", "2", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "street", "placeholder", "Calle y n\xFAmero", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "city", "placeholder", "Ciudad", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "state", "placeholder", "Estado", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], ["type", "text", "formControlName", "zip_code", "placeholder", "C\xF3digo postal", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:ring-2", "focus:ring-blue-500"], [1, "warehouse-modal__footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["custom_class", "btn_primary", 3, "clicked", "text", "loading", "disabled"], [1, "text-xs", "text-red-600", "mt-1"]], template: function WarehouseDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "lucide-icon", 2);
      \u0275\u0275listener("click", function WarehouseDetailModalComponent_Template_lucide_icon_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3)(6, "form", 4)(7, "div", 5)(8, "label", 6);
      \u0275\u0275text(9, "Nombre *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "input", 7);
      \u0275\u0275template(11, WarehouseDetailModalComponent_p_11_Template, 2, 0, "p", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div")(13, "label", 6);
      \u0275\u0275text(14, "C\xF3digo");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "input", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div")(17, "label", 6);
      \u0275\u0275text(18, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "app-select", 10);
      \u0275\u0275listener("changeOption", function WarehouseDetailModalComponent_Template_app_select_changeOption_19_listener($event) {
        return ctx.onStatusChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 5)(21, "label", 6);
      \u0275\u0275text(22, "Descripci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "textarea", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 5)(25, "label", 6);
      \u0275\u0275text(26, "Calle");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div")(29, "label", 6);
      \u0275\u0275text(30, "Ciudad");
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "input", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div")(33, "label", 6);
      \u0275\u0275text(34, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div")(37, "label", 6);
      \u0275\u0275text(38, "Pa\xEDs");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "app-select", 10);
      \u0275\u0275listener("changeOption", function WarehouseDetailModalComponent_Template_app_select_changeOption_39_listener($event) {
        return ctx.onCountryChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div")(41, "label", 6);
      \u0275\u0275text(42, "CP");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 5)(45, "label", 6);
      \u0275\u0275text(46, "Sucursal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "app-select", 10);
      \u0275\u0275listener("changeOption", function WarehouseDetailModalComponent_Template_app_select_changeOption_47_listener($event) {
        return ctx.onBranchChange($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(48, "div", 16)(49, "app-button", 17);
      \u0275\u0275listener("clicked", function WarehouseDetailModalComponent_Template_app_button_clicked_49_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "app-button", 18);
      \u0275\u0275listener("clicked", function WarehouseDetailModalComponent_Template_app_button_clicked_50_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.isNew ? "Nuevo Almac\xE9n" : "Editar Almac\xE9n");
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("name")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(8);
      \u0275\u0275property("config", ctx.statusSelectConfig);
      \u0275\u0275advance(20);
      \u0275\u0275property("config", ctx.countrySelectConfig);
      \u0275\u0275advance(8);
      \u0275\u0275property("config", ctx.branchSelectConfig);
      \u0275\u0275advance(3);
      \u0275\u0275property("text", ctx.isNew ? "Crear Almac\xE9n" : "Guardar Cambios")("loading", ctx.saving())("disabled", ctx.form.invalid || ctx.saving());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ButtonComponent, SelectComponent, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.warehouse-modal[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n}\n.warehouse-modal__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.warehouse-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.warehouse-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.warehouse-modal__header[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n  color: #1f2937;\n}\n.warehouse-modal__body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > div.col-span-2[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled, \n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.warehouse-modal__body[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.warehouse-modal__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=warehouse-detail-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarehouseDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-warehouse-detail-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, LucideAngularModule], template: `<div class="warehouse-modal">\r
  <div class="warehouse-modal__header">\r
    <h2>{{ isNew ? 'Nuevo Almac\xE9n' : 'Editar Almac\xE9n' }}</h2>\r
    <lucide-icon\r
      [img]="X"\r
      class="close cursor-pointer"\r
      (click)="close()">\r
    </lucide-icon>\r
  </div>\r
\r
  <div class="warehouse-modal__body">\r
    <form [formGroup]="form">\r
      <!-- Nombre -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>\r
        <input\r
          type="text"\r
          formControlName="name"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Nombre del almac\xE9n">\r
        <p *ngIf="form.get('name')?.invalid && form.get('name')?.touched" class="text-xs text-red-600 mt-1">\r
          Nombre requerido (m\xEDn. 2 caracteres)\r
        </p>\r
      </div>\r
\r
      <!-- C\xF3digo -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">C\xF3digo</label>\r
        <input\r
          type="text"\r
          formControlName="code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 uppercase"\r
          placeholder="Ej: ALM-001">\r
      </div>\r
\r
      <!-- Status -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>\r
        <app-select\r
          [config]="statusSelectConfig"\r
          (changeOption)="onStatusChange($event)">\r
        </app-select>\r
      </div>\r
\r
      <!-- Descripci\xF3n -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripci\xF3n</label>\r
        <textarea\r
          formControlName="description"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Descripci\xF3n del almac\xE9n"\r
          rows="2"></textarea>\r
      </div>\r
\r
      <!-- Direcci\xF3n -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Calle</label>\r
        <input\r
          type="text"\r
          formControlName="street"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Calle y n\xFAmero">\r
      </div>\r
\r
      <!-- Ciudad y Estado -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>\r
        <input\r
          type="text"\r
          formControlName="city"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Ciudad">\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>\r
        <input\r
          type="text"\r
          formControlName="state"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="Estado">\r
      </div>\r
\r
      <!-- Pa\xEDs y CP -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Pa\xEDs</label>\r
        <app-select\r
          [config]="countrySelectConfig"\r
          (changeOption)="onCountryChange($event)">\r
        </app-select>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">CP</label>\r
        <input\r
          type="text"\r
          formControlName="zip_code"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"\r
          placeholder="C\xF3digo postal">\r
      </div>\r
\r
      <!-- Sucursal -->\r
      <div class="col-span-2">\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>\r
        <app-select\r
          [config]="branchSelectConfig"\r
          (changeOption)="onBranchChange($event)">\r
        </app-select>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="warehouse-modal__footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      [text]="isNew ? 'Crear Almac\xE9n' : 'Guardar Cambios'"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      [disabled]="form.invalid || saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/settings/components/warehouse-detail-modal/warehouse-detail-modal.component.scss */\n.warehouse-modal {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  height: auto;\n}\n.warehouse-modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.warehouse-modal__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1f2937;\n}\n.warehouse-modal__header .close {\n  width: 24px;\n  height: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  transition: color 0.2s;\n}\n.warehouse-modal__header .close:hover {\n  color: #1f2937;\n}\n.warehouse-modal__body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem;\n  min-height: 0;\n}\n.warehouse-modal__body form {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n.warehouse-modal__body form > div {\n  display: flex;\n  flex-direction: column;\n}\n.warehouse-modal__body form > div.col-span-2 {\n  grid-column: 1/-1;\n}\n.warehouse-modal__body form label {\n  margin-bottom: 0.25rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.warehouse-modal__body form input,\n.warehouse-modal__body form select,\n.warehouse-modal__body form textarea {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n}\n.warehouse-modal__body form input:focus,\n.warehouse-modal__body form select:focus,\n.warehouse-modal__body form textarea:focus {\n  outline: none;\n  ring: 2px;\n  ring-color: #3b82f6;\n  border-color: #3b82f6;\n}\n.warehouse-modal__body form input:disabled,\n.warehouse-modal__body form select:disabled,\n.warehouse-modal__body form textarea:disabled {\n  background-color: #f3f4f6;\n  color: #9ca3af;\n  cursor: not-allowed;\n}\n.warehouse-modal__body form textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.warehouse-modal__body form p {\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n.warehouse-modal__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-top: 1px solid #e5e7eb;\n  background-color: #f9fafb;\n  flex-shrink: 0;\n}\n/*# sourceMappingURL=warehouse-detail-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: WarehouseService }, { type: BranchService }, { type: MatSnackBar }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WarehouseDetailModalComponent, { className: "WarehouseDetailModalComponent", filePath: "src/app/features/settings/components/warehouse-detail-modal/warehouse-detail-modal.component.ts", lineNumber: 23 });
})();

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

// src/app/features/settings/components/product-detail-modal/product-detail-modal.component.ts
function ProductDetailModalComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "div", 9);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando producto...");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_3_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r4 = ctx.$implicit;
    \u0275\u0275property("ngValue", cat_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r4.name);
  }
}
function ProductDetailModalComponent_div_8_div_3_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sub_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", sub_r5.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(sub_r5.name);
  }
}
function ProductDetailModalComponent_div_8_div_3_span_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Guardar cambios");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_3_span_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Guardando...");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "div", 16)(3, "label", 17);
    \u0275\u0275text(4, "NOMBRE *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.name, $event) || (ctx_r1.product.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 19)(7, "label", 17);
    \u0275\u0275text(8, "SKU *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 20);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.sku, $event) || (ctx_r1.product.sku = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 19)(11, "label", 17);
    \u0275\u0275text(12, "C\xD3DIGO SAT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 21);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.sat_code, $event) || (ctx_r1.product.sat_code = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 16)(15, "label", 17);
    \u0275\u0275text(16, "DESCRIPCI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 22);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.description, $event) || (ctx_r1.product.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 19)(19, "label", 17);
    \u0275\u0275text(20, "CATEGOR\xCDA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.category_id, $event) || (ctx_r1.product.category_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onCategoryChange($event));
    });
    \u0275\u0275elementStart(22, "option", 24);
    \u0275\u0275text(23, "Selecciona una categor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, ProductDetailModalComponent_div_8_div_3_option_24_Template, 2, 2, "option", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 19)(26, "label", 17);
    \u0275\u0275text(27, "SUBCATEGOR\xCDA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 26);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_3_Template_select_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.product.subcategory_id, $event) || (ctx_r1.product.subcategory_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(29, "option", 24);
    \u0275\u0275text(30, "Selecciona una subcategor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, ProductDetailModalComponent_div_8_div_3_option_31_Template, 2, 2, "option", 25);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "div", 27)(33, "button", 28);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_3_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275template(34, ProductDetailModalComponent_div_8_div_3_span_34_Template, 2, 0, "span", 29)(35, ProductDetailModalComponent_div_8_div_3_span_35_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.sku);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.sat_code);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.description);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.category_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.categories);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.product.subcategory_id);
    \u0275\u0275property("disabled", !ctx_r1.product.category_id);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.subcategories);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.saving);
  }
}
function ProductDetailModalComponent_div_8_div_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "p");
    \u0275\u0275text(2, "No hay UOMs configuradas");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_option_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const catalog_r9 = ctx.$implicit;
    \u0275\u0275property("value", catalog_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(catalog_r9.name);
  }
}
function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const parentUom_r11 = ctx.$implicit;
    \u0275\u0275property("value", parentUom_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((parentUom_r11.uom == null ? null : parentUom_r11.uom.name) || parentUom_r11.name || "Sin nombre");
  }
}
function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "select", 38);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_select_ngModelChange_2_listener($event) {
      const uom_r8 = \u0275\u0275restoreView(_r7).$implicit;
      \u0275\u0275twoWayBindingSet(uom_r8.uom_catalog_id, $event) || (uom_r8.uom_catalog_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_select_ngModelChange_2_listener($event) {
      const uom_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onUomCatalogChange(uom_r8, $event));
    });
    \u0275\u0275elementStart(3, "option", 39);
    \u0275\u0275text(4, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ProductDetailModalComponent_div_8_div_4_table_5_tr_13_option_5_Template, 2, 2, "option", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td")(7, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_input_ngModelChange_7_listener($event) {
      const uom_r8 = \u0275\u0275restoreView(_r7).$implicit;
      \u0275\u0275twoWayBindingSet(uom_r8.factor, $event) || (uom_r8.factor = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "div", 42)(10, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_input_ngModelChange_10_listener($event) {
      const uom_r8 = \u0275\u0275restoreView(_r7).$implicit;
      \u0275\u0275twoWayBindingSet(uom_r8.is_base, $event) || (uom_r8.is_base = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_input_change_10_listener() {
      const i_r10 = \u0275\u0275restoreView(_r7).index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onBaseChange(i_r10));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label", 44);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "td")(14, "select", 45);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_select_ngModelChange_14_listener($event) {
      const uom_r8 = \u0275\u0275restoreView(_r7).$implicit;
      \u0275\u0275twoWayBindingSet(uom_r8.parent_uom_id, $event) || (uom_r8.parent_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 46);
    \u0275\u0275text(16, "\u2014 Ninguno \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, ProductDetailModalComponent_div_8_div_4_table_5_tr_13_option_17_Template, 2, 2, "option", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td")(19, "button", 47);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template_button_click_19_listener() {
      const i_r10 = \u0275\u0275restoreView(_r7).index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.removeUom(i_r10));
    });
    \u0275\u0275element(20, "i", 48);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const uom_r8 = ctx.$implicit;
    const i_r10 = ctx.index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", uom_r8.uom_catalog_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.uomCatalog);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", uom_r8.factor);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "is-base-" + i_r10);
    \u0275\u0275twoWayProperty("ngModel", uom_r8.is_base);
    \u0275\u0275advance();
    \u0275\u0275property("for", "is-base-" + i_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(uom_r8.is_base ? "S\xED" : "No");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", uom_r8.parent_uom_id);
    \u0275\u0275property("disabled", uom_r8.is_base);
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getAvailableParentUoms(i_r10));
  }
}
function ProductDetailModalComponent_div_8_div_4_table_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 36)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "UNIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "FACTOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "BASE");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "UOM PADRE");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "th");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, ProductDetailModalComponent_div_8_div_4_table_5_tr_13_Template, 21, 11, "tr", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngForOf", ctx_r1.product.uoms);
  }
}
function ProductDetailModalComponent_div_8_div_4_div_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Guardar UOMs");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_4_div_6_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Guardando...");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailModalComponent_div_8_div_4_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "button", 28);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_4_div_6_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.saveUoms());
    });
    \u0275\u0275template(2, ProductDetailModalComponent_div_8_div_4_div_6_span_2_Template, 2, 0, "span", 29)(3, ProductDetailModalComponent_div_8_div_4_div_6_span_3_Template, 2, 0, "span", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.saving);
  }
}
function ProductDetailModalComponent_div_8_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 30)(2, "button", 31);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_4_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addUom());
    });
    \u0275\u0275text(3, "+ Agregar UOM");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, ProductDetailModalComponent_div_8_div_4_div_4_Template, 3, 0, "div", 32)(5, ProductDetailModalComponent_div_8_div_4_table_5_Template, 14, 1, "table", 33)(6, ProductDetailModalComponent_div_8_div_4_div_6_Template, 4, 3, "div", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.product.uoms || ctx_r1.product.uoms.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.uoms && ctx_r1.product.uoms.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.uoms && ctx_r1.product.uoms.length > 0);
  }
}
function ProductDetailModalComponent_div_8_div_5_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "p");
    \u0275\u0275text(2, "No hay precios configurados");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_5_table_5_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 51);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275pipe(14, "number");
    \u0275\u0275pipe(15, "number");
    \u0275\u0275pipe(16, "number");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "div", 52)(21, "button", 53);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_5_table_5_tr_18_Template_button_click_21_listener() {
      const price_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openPriceModal(price_r15));
    });
    \u0275\u0275element(22, "i", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 47);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_5_table_5_tr_18_Template_button_click_23_listener() {
      const price_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deletePrice(price_r15.id));
    });
    \u0275\u0275element(24, "i", 48);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const price_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((price_r15.product_uom == null ? null : price_r15.product_uom.uom == null ? null : price_r15.product_uom.uom.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((price_r15.price_list == null ? null : price_r15.price_list.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind2(7, 7, price_r15.price, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", price_r15.iva_percentage || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", price_r15.ieps_percentage || 0, "%");
    \u0275\u0275advance();
    \u0275\u0275property("title", "Precio: $" + \u0275\u0275pipeBind2(13, 10, price_r15.price, "1.2-2") + "\nIVA: $" + \u0275\u0275pipeBind2(14, 13, price_r15.iva_unit_total || 0, "1.2-2") + "\nIEPS: $" + \u0275\u0275pipeBind2(15, 16, price_r15.ieps_unit_total || 0, "1.2-2") + "\nTotal: $" + \u0275\u0275pipeBind2(16, 19, ctx_r1.Number(price_r15.price) + ctx_r1.Number(price_r15.iva_unit_total || 0) + ctx_r1.Number(price_r15.ieps_unit_total || 0), "1.2-2"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" $", \u0275\u0275pipeBind2(18, 22, ctx_r1.Number(price_r15.price) + ctx_r1.Number(price_r15.iva_unit_total || 0) + ctx_r1.Number(price_r15.ieps_unit_total || 0), "1.2-2"), " ");
  }
}
function ProductDetailModalComponent_div_8_div_5_table_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 50)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "LISTA DE PRECIOS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "PRECIO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ProductDetailModalComponent_div_8_div_5_table_5_tr_18_Template, 25, 25, "tr", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r1.product.prices);
  }
}
function ProductDetailModalComponent_div_8_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 30)(2, "button", 31);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPriceModal());
    });
    \u0275\u0275text(3, "+ Agregar Precio");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, ProductDetailModalComponent_div_8_div_5_div_4_Template, 3, 0, "div", 32)(5, ProductDetailModalComponent_div_8_div_5_table_5_Template, 19, 1, "table", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.product.prices || ctx_r1.product.prices.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.prices && ctx_r1.product.prices.length > 0);
  }
}
function ProductDetailModalComponent_div_8_div_6_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "p");
    \u0275\u0275text(2, "No hay costos de proveedor configurados");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_6_table_5_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 51);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275pipe(14, "number");
    \u0275\u0275pipe(15, "number");
    \u0275\u0275pipe(16, "number");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td")(20, "div", 52)(21, "button", 53);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_6_table_5_tr_18_Template_button_click_21_listener() {
      const cost_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.openCostModal(cost_r18));
    });
    \u0275\u0275element(22, "i", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 47);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_6_table_5_tr_18_Template_button_click_23_listener() {
      const cost_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.deleteCost(cost_r18.id));
    });
    \u0275\u0275element(24, "i", 48);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const cost_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((cost_r18.product_uom == null ? null : cost_r18.product_uom.uom == null ? null : cost_r18.product_uom.uom.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((cost_r18.vendor == null ? null : cost_r18.vendor.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind2(7, 7, cost_r18.cost, "1.2-2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", cost_r18.iva_percentage || 0, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", cost_r18.ieps_percentage || 0, "%");
    \u0275\u0275advance();
    \u0275\u0275property("title", "Costo: $" + \u0275\u0275pipeBind2(13, 10, cost_r18.cost, "1.2-2") + "\nIVA: $" + \u0275\u0275pipeBind2(14, 13, cost_r18.iva_unit_total || 0, "1.2-2") + "\nIEPS: $" + \u0275\u0275pipeBind2(15, 16, cost_r18.ieps_unit_total || 0, "1.2-2") + "\nTotal: $" + \u0275\u0275pipeBind2(16, 19, ctx_r1.Number(cost_r18.cost) + ctx_r1.Number(cost_r18.iva_unit_total || 0) + ctx_r1.Number(cost_r18.ieps_unit_total || 0), "1.2-2"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" $", \u0275\u0275pipeBind2(18, 22, ctx_r1.Number(cost_r18.cost) + ctx_r1.Number(cost_r18.iva_unit_total || 0) + ctx_r1.Number(cost_r18.ieps_unit_total || 0), "1.2-2"), " ");
  }
}
function ProductDetailModalComponent_div_8_div_6_table_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 50)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "PROVEEDOR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "COSTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14, "TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "ACCIONES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ProductDetailModalComponent_div_8_div_6_table_5_tr_18_Template, 25, 25, "tr", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r1.product.vendor_costs);
  }
}
function ProductDetailModalComponent_div_8_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 30)(2, "button", 31);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_8_div_6_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openCostModal());
    });
    \u0275\u0275text(3, "+ Agregar Costo");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, ProductDetailModalComponent_div_8_div_6_div_4_Template, 3, 0, "div", 32)(5, ProductDetailModalComponent_div_8_div_6_table_5_Template, 19, 1, "table", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", !ctx_r1.product.vendor_costs || ctx_r1.product.vendor_costs.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.vendor_costs && ctx_r1.product.vendor_costs.length > 0);
  }
}
function ProductDetailModalComponent_div_8_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "p");
    \u0275\u0275text(2, "Sin im\xE1genes");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailModalComponent_div_8_div_7_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275element(1, "img", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const photo_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", photo_r19.signed_url || photo_r19.s3_key, \u0275\u0275sanitizeUrl)("alt", photo_r19.alt_text || "Foto del producto");
  }
}
function ProductDetailModalComponent_div_8_div_7_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, ProductDetailModalComponent_div_8_div_7_div_2_div_1_Template, 2, 2, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.product.photos);
  }
}
function ProductDetailModalComponent_div_8_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275template(1, ProductDetailModalComponent_div_8_div_7_div_1_Template, 3, 0, "div", 32)(2, ProductDetailModalComponent_div_8_div_7_div_2_Template, 2, 1, "div", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.product.photos || ctx_r1.product.photos.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.product.photos && ctx_r1.product.photos.length > 0);
  }
}
function ProductDetailModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "app-tab", 11);
    \u0275\u0275listener("tabChange", function ProductDetailModalComponent_div_8_Template_app_tab_tabChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab = $event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 12);
    \u0275\u0275template(3, ProductDetailModalComponent_div_8_div_3_Template, 36, 14, "div", 13)(4, ProductDetailModalComponent_div_8_div_4_Template, 7, 3, "div", 13)(5, ProductDetailModalComponent_div_8_div_5_Template, 6, 2, "div", 13)(6, ProductDetailModalComponent_div_8_div_6_Template, 6, 2, "div", 13)(7, ProductDetailModalComponent_div_8_div_7_Template, 3, 2, "div", 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("tabs", ctx_r1.tabs)("activeTabId", ctx_r1.activeTab);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "detalles");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "uoms");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "precios");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "costos");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.activeTab === "fotos");
  }
}
function ProductDetailModalComponent_div_9_option_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const list_r21 = ctx.$implicit;
    \u0275\u0275property("value", list_r21.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(list_r21.name);
  }
}
function ProductDetailModalComponent_div_9_option_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r22 = ctx.$implicit;
    \u0275\u0275property("value", uom_r22.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (uom_r22.uom == null ? null : uom_r22.uom.name) || uom_r22.name || "Sin nombre", " ");
  }
}
function ProductDetailModalComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceModalVisible = false);
    });
    \u0275\u0275elementStart(1, "div", 61);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r20);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 1)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 2);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceModalVisible = false);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 3);
    \u0275\u0275element(7, "path", 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 62)(9, "div", 15)(10, "div", 16)(11, "label", 17);
    \u0275\u0275text(12, "LISTA DE PRECIOS *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 63)(14, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_9_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.price_list_id, $event) || (ctx_r1.priceForm.price_list_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 39);
    \u0275\u0275text(16, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, ProductDetailModalComponent_div_9_option_17_Template, 2, 2, "option", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 64);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openPriceListModal());
    });
    \u0275\u0275element(19, "i", 65);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 16)(21, "label", 17);
    \u0275\u0275text(22, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_9_Template_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.product_uom_id, $event) || (ctx_r1.priceForm.product_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(24, "option", 39);
    \u0275\u0275text(25, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, ProductDetailModalComponent_div_9_option_26_Template, 2, 2, "option", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 19)(28, "label", 17);
    \u0275\u0275text(29, "PRECIO *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_9_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.price, $event) || (ctx_r1.priceForm.price = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 19)(32, "label", 17);
    \u0275\u0275text(33, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 67);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_9_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.iva_percentage, $event) || (ctx_r1.priceForm.iva_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 16)(36, "label", 17);
    \u0275\u0275text(37, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 67);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_9_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceForm.ieps_percentage, $event) || (ctx_r1.priceForm.ieps_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 27)(40, "button", 68);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_button_click_40_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceModalVisible = false);
    });
    \u0275\u0275text(41, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 69);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_9_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.savePrice());
    });
    \u0275\u0275text(43, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.priceForm.id ? "Editar Precio" : "Nuevo Precio");
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.price_list_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.priceLists);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.product_uom_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.product == null ? null : ctx_r1.product.uoms);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.price);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.iva_percentage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceForm.ieps_percentage);
  }
}
function ProductDetailModalComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceListModalVisible = false);
    });
    \u0275\u0275elementStart(1, "div", 70);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r23);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 1)(3, "h2");
    \u0275\u0275text(4, "Nueva Lista de Precios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 2);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceListModalVisible = false);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 3);
    \u0275\u0275element(7, "path", 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 62)(9, "div", 15)(10, "div", 16)(11, "label", 17);
    \u0275\u0275text(12, "NOMBRE *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_10_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceListForm.name, $event) || (ctx_r1.priceListForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 16)(15, "label", 17);
    \u0275\u0275text(16, "DESCRIPCI\xD3N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 72);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_10_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.priceListForm.description, $event) || (ctx_r1.priceListForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 27)(19, "button", 68);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.priceListModalVisible = false);
    });
    \u0275\u0275text(20, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 69);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_10_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.savePriceList());
    });
    \u0275\u0275text(22, "Crear");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceListForm.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.priceListForm.description);
  }
}
function ProductDetailModalComponent_div_11_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const vendor_r25 = ctx.$implicit;
    \u0275\u0275property("value", vendor_r25.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(vendor_r25.name);
  }
}
function ProductDetailModalComponent_div_11_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const uom_r26 = ctx.$implicit;
    \u0275\u0275property("value", uom_r26.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(uom_r26.uom == null ? null : uom_r26.uom.name);
  }
}
function ProductDetailModalComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.costModalVisible = false);
    });
    \u0275\u0275elementStart(1, "div", 61);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r24);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 1)(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 2);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.costModalVisible = false);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 3);
    \u0275\u0275element(7, "path", 4);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 10)(9, "div", 15)(10, "div", 16)(11, "label", 17);
    \u0275\u0275text(12, "PROVEEDOR *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.vendor_id, $event) || (ctx_r1.costForm.vendor_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 39);
    \u0275\u0275text(15, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ProductDetailModalComponent_div_11_option_16_Template, 2, 2, "option", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 16)(18, "label", 17);
    \u0275\u0275text(19, "UOM *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "select", 23);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_select_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.product_uom_id, $event) || (ctx_r1.costForm.product_uom_id = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(21, "option", 39);
    \u0275\u0275text(22, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, ProductDetailModalComponent_div_11_option_23_Template, 2, 2, "option", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 16)(25, "label", 17);
    \u0275\u0275text(26, "COSTO *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 66);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.cost, $event) || (ctx_r1.costForm.cost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 19)(29, "label", 17);
    \u0275\u0275text(30, "IVA %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "input", 73);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.iva_percentage, $event) || (ctx_r1.costForm.iva_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 19)(33, "label", 17);
    \u0275\u0275text(34, "IEPS %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "input", 73);
    \u0275\u0275twoWayListener("ngModelChange", function ProductDetailModalComponent_div_11_Template_input_ngModelChange_35_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.costForm.ieps_percentage, $event) || (ctx_r1.costForm.ieps_percentage = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "div", 27)(37, "button", 68);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.costModalVisible = false);
    });
    \u0275\u0275text(38, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "button", 69);
    \u0275\u0275listener("click", function ProductDetailModalComponent_div_11_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCost());
    });
    \u0275\u0275text(40, "Guardar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.costForm.id ? "Editar Costo" : "Nuevo Costo");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.vendor_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.vendors);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.product_uom_id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.product == null ? null : ctx_r1.product.uoms);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.cost);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.iva_percentage);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.costForm.ieps_percentage);
  }
}
var ProductDetailModalComponent = class _ProductDetailModalComponent {
  productService;
  data;
  dialogRef;
  snackBar;
  cdr;
  productUpdated = new EventEmitter();
  visible = true;
  loading = false;
  saving = false;
  product = null;
  // Exponer Number para el template
  Number = Number;
  tabs = [
    { id: "detalles", title: "Detalles" },
    { id: "uoms", title: "UOMs" },
    { id: "precios", title: "Precios" },
    { id: "costos", title: "Costos de Proveedor" },
    { id: "fotos", title: "Fotos" }
  ];
  activeTab = "detalles";
  // Catálogos
  categories = [];
  subcategories = [];
  uomCatalog = [];
  vendors = [];
  priceLists = [];
  // Modales secundarios
  priceModalVisible = false;
  costModalVisible = false;
  priceListModalVisible = false;
  // Formularios de modales secundarios
  priceForm = this.getEmptyPriceForm();
  costForm = this.getEmptyCostForm();
  priceListForm = { name: "", description: "" };
  constructor(productService, data, dialogRef, snackBar, cdr) {
    this.productService = productService;
    this.data = data;
    this.dialogRef = dialogRef;
    this.snackBar = snackBar;
    this.cdr = cdr;
    console.log("ProductDetailModal constructor - data:", data);
    setTimeout(() => {
      if (this.loading) {
        console.error("Loading timeout - forcing loading to false");
        this.loading = false;
        this.showNotification("Error: El producto tard\xF3 demasiado en cargar. Por favor intenta de nuevo.", "error");
      }
    }, 1e4);
  }
  showNotification(message, type = "success") {
    this.snackBar.open(message, "Cerrar", {
      duration: 3e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: [`snackbar-${type}`]
    });
  }
  ngOnInit() {
    console.log("ProductDetailModal ngOnInit - data:", this.data);
    if (this.data?.product) {
      console.log("Loading full product details for:", this.data.product.id);
      this.loadProduct(this.data.product.id);
    } else {
      console.log("Creating new product");
      this.product = {
        id: "",
        sku: "",
        name: "",
        description: "",
        sat_code: "",
        category_id: "",
        subcategory_id: "",
        base_uom_id: "",
        category: null,
        subcategory: null,
        base_uom: null,
        uoms: [],
        prices: [],
        vendor_prices: [],
        photos: [],
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.loading = false;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.loadCatalogs();
      }, 100);
    }
  }
  loadProduct(productId) {
    this.loading = true;
    this.cdr.detectChanges();
    console.log("Starting to load product:", productId);
    this.productService.getProduct(productId).subscribe({
      next: (product) => {
        console.log("Full product loaded:", product);
        this.product = this.normalizeProductSatFields(product);
        console.log("Product category_id:", this.product.category_id);
        console.log("Product subcategory_id:", this.product.subcategory_id);
        this.loading = false;
        this.cdr.detectChanges();
        console.log("Loading set to false and change detected");
        this.loadCatalogs();
        this.loadProductUoms();
        this.loadProductPrices();
        this.loadVendorCosts();
        if (this.product.category_id) {
          console.log("Loading subcategories for category:", this.product.category_id);
          this.loadSubcategories(this.product.category_id);
        }
      },
      error: (error) => {
        console.error("Error loading product:", error);
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification("Error al cargar el producto", "error");
        this.hide();
      }
    });
  }
  loadProductPrices() {
    if (!this.product)
      return;
    this.productService.getProductPrices(this.product.id).subscribe({
      next: (prices) => {
        console.log("Product prices loaded:", prices);
        this.product.prices = prices;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading product prices:", error);
        if (this.product) {
          this.product.prices = [];
        }
      }
    });
  }
  loadVendorCosts() {
    if (!this.product)
      return;
    this.productService.getVendorCosts(this.product.id).subscribe({
      next: (costs) => {
        console.log("Vendor costs loaded:", costs);
        this.product.vendor_costs = costs;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading vendor costs:", error);
        if (this.product) {
          this.product.vendor_costs = [];
        }
      }
    });
  }
  loadVendors() {
    this.productService.getVendors({ is_active: true }).subscribe({
      next: (vendors) => {
        this.vendors = vendors;
        this.cdr.detectChanges();
        console.log("Vendors loaded:", this.vendors.length);
      },
      error: (error) => {
        console.error("Error loading vendors:", error);
      }
    });
  }
  loadProductUoms() {
    if (!this.product)
      return;
    this.productService.getAssignedUoMs(this.product.id).subscribe({
      next: (uoms) => {
        console.log("Product UOMs loaded:", uoms);
        this.product.uoms = uoms;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error("Error loading product UOMs:", error);
        if (this.product) {
          this.product.uoms = [];
        }
      }
    });
  }
  hide() {
    this.dialogRef.close(true);
  }
  loadCatalogs() {
    this.productService.getCategories({ status: "active" }).subscribe({
      next: (response) => {
        this.categories = response.data || [];
        this.cdr.detectChanges();
        console.log("Categories loaded:", this.categories.length);
      },
      error: (error) => {
        console.error("Error loading categories:", error);
      }
    });
    this.productService.getUOMCatalog().subscribe({
      next: (uoms) => {
        this.uomCatalog = uoms;
        this.cdr.detectChanges();
        console.log("UOM catalog loaded:", this.uomCatalog.length);
      },
      error: (error) => {
        console.error("Error loading UOMs:", error);
      }
    });
  }
  loadSubcategories(categoryId) {
    this.productService.getSubCategories(categoryId, { status: "active" }).subscribe({
      next: (response) => {
        this.subcategories = response.data || [];
        this.cdr.detectChanges();
        console.log("Subcategories loaded:", this.subcategories.length);
      },
      error: (error) => {
        console.error("Error loading subcategories:", error);
      }
    });
  }
  /** Unifica SAT del API (`sat_code` / `codigo_sat`) en `sat_code` para el formulario. */
  normalizeProductSatFields(product) {
    const p = product;
    if ((p.sat_code == null || p.sat_code === "") && p.codigo_sat) {
      p.sat_code = p.codigo_sat;
    }
    return p;
  }
  onCategoryChange(categoryId) {
    if (!this.product)
      return;
    this.product.subcategory_id = null;
    this.product.subcategory = null;
    this.subcategories = [];
    if (categoryId) {
      this.loadSubcategories(categoryId);
    }
  }
  save() {
    if (!this.product)
      return;
    if (!this.product.sku || !this.product.sku.trim()) {
      this.showNotification("El SKU es requerido", "error");
      return;
    }
    if (!this.product.name || !this.product.name.trim()) {
      this.showNotification("El nombre es requerido", "error");
      return;
    }
    console.log("Starting save, setting saving = true");
    this.saving = true;
    this.cdr.detectChanges();
    const body = {
      sku: this.product.sku.trim(),
      name: this.product.name.trim(),
      description: this.product.description?.trim() || "",
      sat_code: this.product.sat_code?.trim() || "",
      category_id: this.product.category_id || void 0,
      subcategory_id: this.product.subcategory_id || void 0,
      base_uom_id: this.product.base_uom_id || void 0
    };
    console.log("Saving product with body:", body);
    const isNew = !this.product.id || this.data?.isNew;
    if (isNew) {
      this.productService.createProduct(body).subscribe({
        next: (newProduct) => {
          console.log("Product created successfully:", newProduct);
          this.saving = false;
          this.cdr.detectChanges();
          this.showNotification("Producto creado correctamente", "success");
          this.dialogRef.close(newProduct);
        },
        error: (error) => {
          console.error("Error creating product:", error);
          this.saving = false;
          this.cdr.detectChanges();
          const errorMessage = error.error?.message || "Error al crear el producto";
          this.showNotification(errorMessage, "error");
        }
      });
    } else {
      this.productService.updateProduct(this.product.id, body).subscribe({
        next: () => {
          console.log("Product saved successfully, setting saving = false");
          this.saving = false;
          this.cdr.detectChanges();
          this.showNotification("Producto actualizado correctamente", "success");
          this.productUpdated.emit();
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error("Error updating product:", error);
          console.log("Error occurred, setting saving = false");
          this.saving = false;
          this.cdr.detectChanges();
          this.showNotification("Error al actualizar el producto", "error");
        }
      });
    }
  }
  reloadCurrentTab() {
    if (!this.product)
      return;
    switch (this.activeTab) {
      case "uoms":
        this.loadProductUoms();
        break;
      case "precios":
        this.loadProductPrices();
        break;
      case "costos":
        this.loadVendorCosts();
        break;
      default:
        break;
    }
  }
  // ─── UOMs ───────────────────────────────────────────────────
  addUom() {
    if (!this.product)
      return;
    if (!this.product.uoms)
      this.product.uoms = [];
    const newUom = {
      id: "",
      // Vacío hasta que se guarde
      product_id: this.product.id,
      uom_catalog_id: "",
      factor: 1,
      is_base: this.product.uoms.length === 0,
      // Primera UOM es base por defecto
      parent_uom_id: null,
      uom_catalog: null,
      parent_uom: null
    };
    this.product.uoms.push(newUom);
  }
  removeUom(index) {
    if (!this.product || !this.product.uoms)
      return;
    const uom = this.product.uoms[index];
    if (uom.id) {
      if (!confirm("\xBFEst\xE1s seguro de eliminar esta UOM?"))
        return;
      this.productService.deleteUOM(this.product.id, uom.id).subscribe({
        next: () => {
          this.product.uoms.splice(index, 1);
          this.showNotification("UOM eliminada correctamente", "success");
        },
        error: (error) => {
          console.error("Error deleting UOM:", error);
          this.showNotification("Error al eliminar la UOM", "error");
        }
      });
    } else {
      this.product.uoms.splice(index, 1);
    }
  }
  onUomCatalogChange(uom, catalogId) {
    const catalog = this.uomCatalog.find((c) => c.id === catalogId);
    if (catalog) {
      uom.uom_catalog = catalog;
    }
  }
  onBaseChange(index) {
    if (!this.product || !this.product.uoms)
      return;
    const uom = this.product.uoms[index];
    if (uom.is_base) {
      this.product.uoms.forEach((u, i) => {
        if (i !== index) {
          u.is_base = false;
        }
      });
      uom.parent_uom_id = null;
      uom.factor = 1;
    }
  }
  getAvailableParentUoms(currentIndex) {
    if (!this.product || !this.product.uoms)
      return [];
    return this.product.uoms.map((uom, index) => __spreadProps(__spreadValues({}, uom), { originalIndex: index })).filter((uom, index) => {
      return index !== currentIndex && uom.uom_catalog_id && (uom.uom_catalog?.name || uom.id);
    });
  }
  saveUoms() {
    if (!this.product || !this.product.uoms)
      return;
    const hasBase = this.product.uoms.some((u) => u.is_base);
    if (!hasBase) {
      alert("Debe haber al menos una UOM marcada como base");
      return;
    }
    const allHaveCatalog = this.product.uoms.every((u) => u.uom_catalog_id);
    if (!allHaveCatalog) {
      alert("Todas las UOMs deben tener una unidad seleccionada");
      return;
    }
    const invalidFactors = this.product.uoms.filter((u) => !u.is_base && (!u.factor || u.factor <= 0));
    if (invalidFactors.length > 0) {
      alert("Las UOMs no base deben tener un factor mayor a 0");
      return;
    }
    this.saving = true;
    const newUoms = this.product.uoms.filter((u) => !u.id);
    const existingUoms = this.product.uoms.filter((u) => u.id);
    let completed = 0;
    const total = newUoms.length + existingUoms.length;
    if (total === 0) {
      this.saving = false;
      alert("No hay cambios para guardar");
      return;
    }
    const checkComplete = () => {
      completed++;
      if (completed === total) {
        this.saving = false;
        this.showNotification("UOMs guardadas correctamente", "success");
        this.loadProductUoms();
      }
    };
    newUoms.forEach((uom) => {
      const data = {
        uom_catalog_id: uom.uom_catalog_id,
        factor: uom.factor || 1,
        is_base: uom.is_base || false,
        parent_uom_id: uom.parent_uom_id || null
      };
      this.productService.createUOM(this.product.id, data).subscribe({
        next: () => checkComplete(),
        error: (error) => {
          console.error("Error creating UOM:", error);
          this.showNotification("Error al crear UOM", "error");
          this.saving = false;
        }
      });
    });
    existingUoms.forEach((uom) => {
      const data = {
        factor: uom.factor || 1,
        is_base: uom.is_base || false,
        parent_uom_id: uom.parent_uom_id || null
      };
      this.productService.updateUOM(this.product.id, uom.id, data).subscribe({
        next: () => checkComplete(),
        error: (error) => {
          console.error("Error updating UOM:", error);
          this.showNotification("Error al actualizar UOM", "error");
          this.saving = false;
        }
      });
    });
  }
  // ─── Precios ────────────────────────────────────────────────
  loadPriceLists() {
    this.productService.getPriceLists().subscribe({
      next: (lists) => {
        this.priceLists = Array.isArray(lists) ? lists : lists.data || [];
        this.cdr.detectChanges();
        console.log("Price lists loaded:", this.priceLists.length);
      },
      error: (error) => {
        console.error("Error loading price lists:", error);
      }
    });
  }
  openPriceListModal() {
    this.priceListForm = { name: "", description: "" };
    this.priceListModalVisible = true;
  }
  savePriceList() {
    if (!this.priceListForm.name || !this.priceListForm.name.trim()) {
      alert("Por favor ingresa un nombre para la lista de precios");
      return;
    }
    const data = {
      name: this.priceListForm.name.trim(),
      description: this.priceListForm.description?.trim() || ""
    };
    console.log("Creating price list:", data);
    this.productService.createPriceList(data).subscribe({
      next: (newList) => {
        console.log("Price list created:", newList);
        this.priceListModalVisible = false;
        this.showNotification("Lista de precios creada correctamente", "success");
        this.priceLists.push(newList);
        this.priceForm.price_list_id = newList.id;
      },
      error: (error) => {
        console.error("Error creating price list:", error);
        this.showNotification("Error al crear la lista de precios: " + (error.error?.message || error.message), "error");
      }
    });
  }
  openPriceModal(price) {
    console.log("Opening price modal - product.uoms:", this.product?.uoms);
    if (this.priceLists.length === 0) {
      this.loadPriceLists();
    }
    if (!this.product?.uoms || this.product.uoms.length === 0) {
      console.log("Loading product UOMs...");
      this.loadProductUoms();
    }
    if (price) {
      this.priceForm = {
        id: price.id,
        price_list_id: price.price_list_id,
        product_id: price.product_id,
        product_uom_id: price.product_uom_id,
        price: price.price,
        iva_percentage: price.iva_percentage || 16,
        ieps_percentage: price.ieps_percentage || 0
      };
    } else {
      this.priceForm = this.getEmptyPriceForm();
      if (this.product) {
        this.priceForm.product_id = this.product.id;
      }
    }
    this.priceModalVisible = true;
    this.cdr.detectChanges();
    console.log("Price form set:", this.priceForm);
  }
  savePrice() {
    if (!this.priceForm.price_list_id) {
      alert("Por favor selecciona una lista de precios");
      return;
    }
    if (!this.priceForm.product_uom_id) {
      alert("Por favor selecciona una UOM");
      return;
    }
    if (!this.priceForm.price || this.priceForm.price <= 0) {
      alert("Por favor ingresa un precio v\xE1lido");
      return;
    }
    const body = {
      price_list_id: this.priceForm.price_list_id,
      product_uom_id: this.priceForm.product_uom_id,
      price: Number(this.priceForm.price),
      iva_percentage: Number(this.priceForm.iva_percentage) || 0,
      ieps_percentage: Number(this.priceForm.ieps_percentage) || 0
    };
    if (this.priceForm.id) {
      const updateData = {
        price: body.price,
        iva_percentage: body.iva_percentage,
        ieps_percentage: body.ieps_percentage
      };
      this.productService.updateProductPrice(this.product.id, this.priceForm.id, updateData).subscribe({
        next: () => {
          this.priceModalVisible = false;
          this.showNotification("Precio actualizado correctamente", "success");
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error("Error updating price:", error);
          this.showNotification("Error al actualizar el precio", "error");
        }
      });
    } else {
      this.productService.createProductPrice(this.product.id, body).subscribe({
        next: () => {
          this.priceModalVisible = false;
          this.showNotification("Precio creado correctamente", "success");
          this.reloadCurrentTab();
        },
        error: (error) => {
          console.error("Error saving price:", error);
          this.showNotification("Error al guardar el precio", "error");
        }
      });
    }
  }
  deletePrice(priceId) {
    if (!confirm("\xBFEst\xE1s seguro de eliminar este precio?"))
      return;
    this.productService.deleteProductPrice(this.product.id, priceId).subscribe({
      next: () => {
        this.showNotification("Precio eliminado correctamente", "success");
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error("Error deleting price:", error);
        this.showNotification("Error al eliminar el precio", "error");
      }
    });
  }
  // ─── Costos ─────────────────────────────────────────────────
  openCostModal(cost) {
    if (this.vendors.length === 0) {
      this.loadVendors();
    }
    if (!this.product?.uoms || this.product.uoms.length === 0) {
      this.loadProductUoms();
    }
    if (cost) {
      this.costForm = {
        id: cost.id,
        vendor_id: cost.vendor_id,
        product_id: cost.product_id,
        product_uom_id: cost.product_uom_id,
        cost: cost.cost,
        iva_percentage: cost.iva_percentage || 16,
        ieps_percentage: cost.ieps_percentage || 0
      };
    } else {
      this.costForm = this.getEmptyCostForm();
      if (this.product) {
        this.costForm.product_id = this.product.id;
      }
    }
    this.costModalVisible = true;
    this.cdr.detectChanges();
  }
  saveCost() {
    if (!this.costForm.vendor_id) {
      this.showNotification("Por favor selecciona un proveedor", "error");
      return;
    }
    if (!this.costForm.product_uom_id) {
      this.showNotification("Por favor selecciona una UOM", "error");
      return;
    }
    if (!this.costForm.cost || this.costForm.cost <= 0) {
      this.showNotification("Por favor ingresa un costo v\xE1lido", "error");
      return;
    }
    const body = {
      vendor_id: this.costForm.vendor_id,
      product_uom_id: this.costForm.product_uom_id,
      cost: Number(this.costForm.cost),
      iva_percentage: Number(this.costForm.iva_percentage) || 0,
      ieps_percentage: Number(this.costForm.ieps_percentage) || 0
    };
    if (this.costForm.id) {
      this.productService.updateVendorCost(this.product.id, this.costForm.id, {
        cost: body.cost,
        iva_percentage: body.iva_percentage,
        ieps_percentage: body.ieps_percentage
      }).subscribe({
        next: () => {
          this.showNotification("Costo actualizado correctamente", "success");
          this.reloadCurrentTab();
          setTimeout(() => {
            this.costModalVisible = false;
            this.cdr.detectChanges();
          }, 100);
        },
        error: (error) => {
          console.error("Error updating cost:", error);
          const errorMessage = error.error?.message || "Error al actualizar el costo";
          this.showNotification(errorMessage, "error");
        }
      });
    } else {
      this.productService.createVendorCost(this.product.id, body).subscribe({
        next: () => {
          this.showNotification("Costo creado correctamente", "success");
          this.reloadCurrentTab();
          setTimeout(() => {
            this.costModalVisible = false;
            this.cdr.detectChanges();
          }, 100);
        },
        error: (error) => {
          console.error("Error saving cost:", error);
          const errorMessage = error.error?.message || "Error al guardar el costo";
          this.showNotification(errorMessage, "error");
        }
      });
    }
  }
  deleteCost(costId) {
    if (!confirm("\xBFEst\xE1s seguro de eliminar este costo?"))
      return;
    this.productService.deleteVendorCost(this.product.id, costId).subscribe({
      next: () => {
        this.showNotification("Costo eliminado correctamente", "success");
        this.reloadCurrentTab();
      },
      error: (error) => {
        console.error("Error deleting cost:", error);
        const errorMessage = error.error?.message || "Error al eliminar el costo";
        this.showNotification(errorMessage, "error");
      }
    });
  }
  // ─── Helpers ────────────────────────────────────────────────
  getEmptyPriceForm() {
    return {
      id: "",
      price_list_id: "",
      product_id: "",
      product_uom_id: "",
      price: 0,
      iva_percentage: 0,
      ieps_percentage: 0
    };
  }
  getEmptyCostForm() {
    return {
      id: "",
      vendor_id: "",
      product_id: "",
      product_uom_id: "",
      cost: 0,
      iva_percentage: 0,
      ieps_percentage: 0
    };
  }
  getUomName(uomId) {
    if (!this.product || !this.product.uoms)
      return "";
    const uom = this.product.uoms.find((u) => u.id === uomId);
    return uom?.name || "";
  }
  getPriceListName(priceListId) {
    const list = this.priceLists.find((l) => l.id === priceListId);
    return list?.name || "";
  }
  static \u0275fac = function ProductDetailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductDetailModalComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailModalComponent, selectors: [["app-product-detail-modal"]], outputs: { productUpdated: "productUpdated" }, decls: 12, vars: 6, consts: [[1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-btn", 3, "click"], ["width", "20", "height", "20", "viewBox", "0 0 20 20", "fill", "currentColor"], ["d", "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"], ["class", "loading-container", 4, "ngIf"], ["class", "modal-content", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "loading-container"], [1, "spinner"], [1, "modal-content"], [3, "tabChange", "tabs", "activeTabId"], [1, "tab-content"], ["class", "tab-pane", 4, "ngIf"], [1, "tab-pane"], [1, "form-grid"], [1, "form-field", "form-field--full"], [1, "form-label"], ["type", "text", "placeholder", "Nombre del producto", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-field"], ["type", "text", "placeholder", "SKU", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "placeholder", "Ej. 01010101", 1, "form-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Descripci\xF3n del producto", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "form-select", 3, "ngModelChange", "ngModel", "disabled"], [1, "form-actions"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [4, "ngIf"], [1, "tab-header"], ["type", "button", 1, "btn", "btn--sm", "btn--primary", 3, "click"], ["class", "empty-state", 4, "ngIf"], ["class", "data-table uom-table", 4, "ngIf"], ["class", "form-actions", 4, "ngIf"], [1, "empty-state"], [1, "data-table", "uom-table"], [4, "ngFor", "ngForOf"], [1, "form-select", "form-select--inline", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", "placeholder", "1", "step", "1", "min", "1", 1, "form-input", "form-input--inline", 3, "ngModelChange", "ngModel"], [1, "checkbox-wrapper"], ["type", "checkbox", 3, "ngModelChange", "change", "id", "ngModel"], [3, "for"], [1, "form-select", "form-select--inline", 3, "ngModelChange", "ngModel", "disabled"], [3, "value"], ["type", "button", "title", "Eliminar", 1, "btn-icon", "btn-icon--danger", 3, "click"], [1, "fi", "fi-rr-trash"], ["class", "data-table", 4, "ngIf"], [1, "data-table"], [2, "cursor", "help", 3, "title"], [1, "row-actions"], ["type", "button", "title", "Editar", 1, "btn-icon", 3, "click"], [1, "fi", "fi-rr-pencil"], ["class", "photos-grid", 4, "ngIf"], [1, "photos-grid"], ["class", "photo-card", 4, "ngFor", "ngForOf"], [1, "photo-card"], ["loading", "lazy", 3, "src", "alt"], [1, "modal-overlay", 3, "click"], [1, "modal-container", "modal-container--sm", 3, "click"], [1, "modal-content", "modal-content--compact"], [1, "input-with-button"], ["type", "button", "title", "Crear lista de precios", 1, "btn-icon-add", 3, "click"], [1, "fi", "fi-rr-plus"], ["type", "number", "placeholder", "0.00", "step", "0.01", "min", "0", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "0", "step", "0.01", "min", "0", "max", "100", 1, "form-input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], [1, "modal-container", "modal-container--xs", 3, "click"], ["type", "text", "placeholder", "Ej: Precio Comercial", 1, "form-input", 3, "ngModelChange", "ngModel"], ["placeholder", "Descripci\xF3n opcional", "rows", "2", 1, "form-textarea", 3, "ngModelChange", "ngModel"], ["type", "number", "placeholder", "0", "step", "0.01", "min", "0", 1, "form-input", 3, "ngModelChange", "ngModel"]], template: function ProductDetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function ProductDetailModalComponent_Template_button_click_4_listener() {
        return ctx.hide();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(5, "svg", 3);
      \u0275\u0275element(6, "path", 4);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(7, ProductDetailModalComponent_div_7_Template, 4, 0, "div", 5)(8, ProductDetailModalComponent_div_8_Template, 8, 7, "div", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, ProductDetailModalComponent_div_9_Template, 44, 8, "div", 7)(10, ProductDetailModalComponent_div_10_Template, 23, 2, "div", 7)(11, ProductDetailModalComponent_div_11_Template, 41, 8, "div", 7);
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate((ctx.data == null ? null : ctx.data.isNew) ? "Crear Producto" : "Editar Producto");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.product);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.priceModalVisible);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.priceListModalVisible);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.costModalVisible);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, TabComponent, DecimalPipe], styles: [`

.modal-container[_ngcontent-%COMP%] {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 850px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.modal-container--sm[_ngcontent-%COMP%] {
  max-width: 480px;
}
.modal-container--xs[_ngcontent-%COMP%] {
  max-width: 400px;
}
.modal-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.close-btn[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}
.close-btn[_ngcontent-%COMP%]:hover {
  background: #f3f4f6;
  color: #374151;
}
.modal-content[_ngcontent-%COMP%] {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  position: relative;
}
.modal-content--compact[_ngcontent-%COMP%] {
  padding: 10px;
}
.loading-container[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6b7280;
}
.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin-top: 12px;
  font-size: 14px;
}
.spinner[_ngcontent-%COMP%] {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;
}
@keyframes _ngcontent-%COMP%_spin {
  to {
    transform: rotate(360deg);
  }
}
.tab-content[_ngcontent-%COMP%] {
  padding: 16px;
  position: relative;
}
.tab-pane[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_fadeIn 0.2s ease;
}
@keyframes _ngcontent-%COMP%_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.tab-header[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.form-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.form-field[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 1;
}
.form-field--full[_ngcontent-%COMP%] {
  grid-column: 1/-1;
}
.form-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.form-input[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%], 
.form-textarea[_ngcontent-%COMP%] {
  width: 100%;
  padding: 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;
}
.form-input[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus, 
.form-textarea[_ngcontent-%COMP%]:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-input[_ngcontent-%COMP%]:disabled, 
.form-select[_ngcontent-%COMP%]:disabled, 
.form-textarea[_ngcontent-%COMP%]:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}
.form-input--inline[_ngcontent-%COMP%], 
.form-select--inline[_ngcontent-%COMP%], 
.form-textarea--inline[_ngcontent-%COMP%] {
  padding: 6px 8px;
  font-size: 12px;
}
.form-select[_ngcontent-%COMP%] {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-right: 36px;
  appearance: none;
  width: 100%;
  box-sizing: border-box;
}
.form-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {
  padding: 8px;
}
.form-textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 80px;
}
.form-actions[_ngcontent-%COMP%] {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}
.input-with-button[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.input-with-button[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.btn-icon-add[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  color: #3b82f6;
  transition: all 0.15s;
  font-size: 16px;
  flex-shrink: 0;
}
.btn-icon-add[_ngcontent-%COMP%]:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}
.btn[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--primary[_ngcontent-%COMP%] {
  background: #3b82f6;
  color: white;
}
.btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #2563eb;
}
.btn--secondary[_ngcontent-%COMP%] {
  background: #f3f4f6;
  color: #374151;
}
.btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {
  background: #e5e7eb;
}
.btn--sm[_ngcontent-%COMP%] {
  padding: 6px 12px;
  font-size: 12px;
}
.btn-icon[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  color: #6b7280;
  transition: all 0.15s;
}
.btn-icon[_ngcontent-%COMP%]:hover {
  background: #f3f4f6;
  color: #374151;
}
.btn-icon--danger[_ngcontent-%COMP%]:hover {
  background: #fee2e2;
  color: #dc2626;
}
.data-table[_ngcontent-%COMP%] {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {
  background: #f9fafb;
}
.data-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  border-bottom: 1px solid #f3f4f6;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {
  border-bottom: none;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  background: #f9fafb;
}
.data-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  padding: 10px 12px;
  color: #374151;
}
.uom-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  vertical-align: middle;
  padding: 8px;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(1), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(1) {
  width: 35%;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2) {
  width: 15%;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(3), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(3) {
  width: 15%;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(4), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(4) {
  width: 30%;
}
.uom-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(5), 
.uom-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(5) {
  width: 5%;
}
.row-actions[_ngcontent-%COMP%] {
  display: flex;
  gap: 4px;
  align-items: center;
}
.checkbox-wrapper[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.checkbox-wrapper[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}
.checkbox-wrapper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.form-input--inline[_ngcontent-%COMP%] {
  padding: 6px 8px;
  font-size: 12px;
  min-width: 60px;
  width: 100%;
}
.form-select--inline[_ngcontent-%COMP%] {
  padding: 6px 8px;
  font-size: 12px;
  width: 100%;
}
.empty-state[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #9ca3af;
}
.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  margin: 0;
}
.photos-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
.photo-card[_ngcontent-%COMP%] {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  aspect-ratio: 1;
}
.photo-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 768px) {
  .modal-container[_ngcontent-%COMP%] {
    max-width: 95vw;
  }
  .form-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .photos-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
  .tab-content[_ngcontent-%COMP%] {
    padding: 16px;
  }
}
.modal-overlay[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}
[_nghost-%COMP%]     .snackbar-success {
  background-color: #10b981 !important;
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-success .mat-mdc-snack-bar-label {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-success .mat-mdc-button {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-error {
  background-color: #ef4444 !important;
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-error .mat-mdc-snack-bar-label {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-error .mat-mdc-button {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-info {
  background-color: #3b82f6 !important;
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-info .mat-mdc-snack-bar-label {
  color: white !important;
}
[_nghost-%COMP%]     .snackbar-info .mat-mdc-button {
  color: white !important;
}
/*# sourceMappingURL=product-detail-modal.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductDetailModalComponent, [{
    type: Component,
    args: [{ selector: "app-product-detail-modal", standalone: true, imports: [CommonModule, FormsModule, TabComponent], template: `<!-- Modal Principal -->\r
<div class="modal-container">\r
  <!-- Header -->\r
  <div class="modal-header">\r
    <h2>{{ data?.isNew ? 'Crear Producto' : 'Editar Producto' }}</h2>\r
    <button class="close-btn" (click)="hide()" type="button">\r
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\r
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>\r
      </svg>\r
    </button>\r
  </div>\r
\r
  <!-- Loading -->\r
  <div *ngIf="loading" class="loading-container">\r
    <div class="spinner"></div>\r
    <p>Cargando producto...</p>\r
  </div>\r
\r
  <!-- Content -->\r
  <div *ngIf="!loading && product" class="modal-content">\r
      <!-- Tabs -->\r
      <app-tab [tabs]="tabs" [activeTabId]="activeTab" (tabChange)="activeTab = $event"></app-tab>\r
\r
      <!-- Tab Content -->\r
      <div class="tab-content">\r
        <!-- Tab: Detalles -->\r
        <div *ngIf="activeTab === 'detalles'" class="tab-pane">\r
          <div class="form-grid">\r
            <div class="form-field form-field--full">\r
              <label class="form-label">NOMBRE *</label>\r
              <input type="text" class="form-input" [(ngModel)]="product.name" placeholder="Nombre del producto">\r
            </div>\r
\r
            <div class="form-field">\r
              <label class="form-label">SKU *</label>\r
              <input type="text" class="form-input" [(ngModel)]="product.sku" placeholder="SKU">\r
            </div>\r
\r
            <div class="form-field">\r
              <label class="form-label">C\xD3DIGO SAT</label>\r
              <input type="text" class="form-input" [(ngModel)]="product.sat_code" placeholder="Ej. 01010101">\r
            </div>\r
\r
            <div class="form-field form-field--full">\r
              <label class="form-label">DESCRIPCI\xD3N</label>\r
              <textarea class="form-textarea" [(ngModel)]="product.description" placeholder="Descripci\xF3n del producto" rows="3"></textarea>\r
            </div>\r
\r
            <div class="form-field">\r
              <label class="form-label">CATEGOR\xCDA</label>\r
              <select class="form-select" [(ngModel)]="product.category_id" (ngModelChange)="onCategoryChange($event)">\r
                <option [ngValue]="null">Selecciona una categor\xEDa</option>\r
                <option *ngFor="let cat of categories" [ngValue]="cat.id">{{ cat.name }}</option>\r
              </select>\r
            </div>\r
\r
            <div class="form-field">\r
              <label class="form-label">SUBCATEGOR\xCDA</label>\r
              <select class="form-select" [(ngModel)]="product.subcategory_id" [disabled]="!product.category_id">\r
                <option [ngValue]="null">Selecciona una subcategor\xEDa</option>\r
                <option *ngFor="let sub of subcategories" [ngValue]="sub.id">{{ sub.name }}</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="form-actions">\r
            <button class="btn btn--primary" (click)="save()" [disabled]="saving" type="button">\r
              <span *ngIf="!saving">Guardar cambios</span>\r
              <span *ngIf="saving">Guardando...</span>\r
            </button>\r
          </div>\r
        </div>\r
\r
        <!-- Tab: UOMs -->\r
        <div *ngIf="activeTab === 'uoms'" class="tab-pane">\r
          <div class="tab-header">\r
            <button class="btn btn--sm btn--primary" (click)="addUom()" type="button">+ Agregar UOM</button>\r
          </div>\r
\r
          <div *ngIf="!product.uoms || product.uoms.length === 0" class="empty-state">\r
            <p>No hay UOMs configuradas</p>\r
          </div>\r
\r
          <table *ngIf="product.uoms && product.uoms.length > 0" class="data-table uom-table">\r
            <thead>\r
              <tr>\r
                <th>UNIDAD</th>\r
                <th>FACTOR</th>\r
                <th>BASE</th>\r
                <th>UOM PADRE</th>\r
                <th></th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              <tr *ngFor="let uom of product.uoms; let i = index">\r
                <td>\r
                  <select class="form-select form-select--inline" [(ngModel)]="uom.uom_catalog_id" (ngModelChange)="onUomCatalogChange(uom, $event)">\r
                    <option value="">Seleccionar...</option>\r
                    <option *ngFor="let catalog of uomCatalog" [value]="catalog.id">{{ catalog.name }}</option>\r
                  </select>\r
                </td>\r
                <td>\r
                  <input type="number" class="form-input form-input--inline" [(ngModel)]="uom.factor" placeholder="1" step="1" min="1">\r
                </td>\r
                <td>\r
                  <div class="checkbox-wrapper">\r
                    <input type="checkbox" [id]="'is-base-' + i" [(ngModel)]="uom.is_base" (change)="onBaseChange(i)">\r
                    <label [for]="'is-base-' + i">{{ uom.is_base ? 'S\xED' : 'No' }}</label>\r
                  </div>\r
                </td>\r
                <td>\r
                  <select class="form-select form-select--inline" [(ngModel)]="uom.parent_uom_id" [disabled]="uom.is_base">\r
                    <option [value]="null">\u2014 Ninguno \u2014</option>\r
                    <option *ngFor="let parentUom of getAvailableParentUoms(i)" [value]="parentUom.id">{{ parentUom.uom?.name || parentUom.name || 'Sin nombre' }}</option>\r
                  </select>\r
                </td>\r
                <td>\r
                  <button class="btn-icon btn-icon--danger" (click)="removeUom(i)" type="button" title="Eliminar">\r
                    <i class="fi fi-rr-trash"></i>\r
                  </button>\r
                </td>\r
              </tr>\r
            </tbody>\r
          </table>\r
\r
          <div class="form-actions" *ngIf="product.uoms && product.uoms.length > 0">\r
            <button class="btn btn--primary" (click)="saveUoms()" [disabled]="saving" type="button">\r
              <span *ngIf="!saving">Guardar UOMs</span>\r
              <span *ngIf="saving">Guardando...</span>\r
            </button>\r
          </div>\r
        </div>\r
\r
        <!-- Tab: Precios -->\r
        <div *ngIf="activeTab === 'precios'" class="tab-pane">\r
          <div class="tab-header">\r
            <button class="btn btn--sm btn--primary" (click)="openPriceModal()" type="button">+ Agregar Precio</button>\r
          </div>\r
\r
          <div *ngIf="!product.prices || product.prices.length === 0" class="empty-state">\r
            <p>No hay precios configurados</p>\r
          </div>\r
\r
          <table *ngIf="product.prices && product.prices.length > 0" class="data-table">\r
            <thead>\r
              <tr>\r
                <th>UOM</th>\r
                <th>LISTA DE PRECIOS</th>\r
                <th>PRECIO</th>\r
                <th>IVA %</th>\r
                <th>IEPS %</th>\r
                <th>TOTAL</th>\r
                <th>ACCIONES</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              <tr *ngFor="let price of product.prices">\r
                <td>{{ price.product_uom?.uom?.name || '\u2014' }}</td>\r
                <td>{{ price.price_list?.name || '\u2014' }}</td>\r
                <td>\${{ price.price | number:'1.2-2' }}</td>\r
                <td>{{ price.iva_percentage || 0 }}%</td>\r
                <td>{{ price.ieps_percentage || 0 }}%</td>\r
                <td [title]="'Precio: $' + (price.price | number:'1.2-2') + '\\nIVA: $' + ((price.iva_unit_total || 0) | number:'1.2-2') + '\\nIEPS: $' + ((price.ieps_unit_total || 0) | number:'1.2-2') + '\\nTotal: $' + ((Number(price.price) + Number(price.iva_unit_total || 0) + Number(price.ieps_unit_total || 0)) | number:'1.2-2')" style="cursor: help;">\r
                  \${{ (Number(price.price) + Number(price.iva_unit_total || 0) + Number(price.ieps_unit_total || 0)) | number:'1.2-2' }}\r
                </td>\r
                <td>\r
                  <div class="row-actions">\r
                    <button class="btn-icon" (click)="openPriceModal(price)" type="button" title="Editar">\r
                      <i class="fi fi-rr-pencil"></i>\r
                    </button>\r
                    <button class="btn-icon btn-icon--danger" (click)="deletePrice(price.id)" type="button" title="Eliminar">\r
                      <i class="fi fi-rr-trash"></i>\r
                    </button>\r
                  </div>\r
                </td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
\r
        <!-- Tab: Costos -->\r
        <div *ngIf="activeTab === 'costos'" class="tab-pane">\r
          <div class="tab-header">\r
            <button class="btn btn--sm btn--primary" (click)="openCostModal()" type="button">+ Agregar Costo</button>\r
          </div>\r
\r
          <div *ngIf="!product.vendor_costs || product.vendor_costs.length === 0" class="empty-state">\r
            <p>No hay costos de proveedor configurados</p>\r
          </div>\r
\r
          <table *ngIf="product.vendor_costs && product.vendor_costs.length > 0" class="data-table">\r
            <thead>\r
              <tr>\r
                <th>UOM</th>\r
                <th>PROVEEDOR</th>\r
                <th>COSTO</th>\r
                <th>IVA %</th>\r
                <th>IEPS %</th>\r
                <th>TOTAL</th>\r
                <th>ACCIONES</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              <tr *ngFor="let cost of product.vendor_costs">\r
                <td>{{ cost.product_uom?.uom?.name || '\u2014' }}</td>\r
                <td>{{ cost.vendor?.name || '\u2014' }}</td>\r
                <td>\${{ cost.cost | number:'1.2-2' }}</td>\r
                <td>{{ cost.iva_percentage || 0 }}%</td>\r
                <td>{{ cost.ieps_percentage || 0 }}%</td>\r
                <td [title]="'Costo: $' + (cost.cost | number:'1.2-2') + '\\nIVA: $' + ((cost.iva_unit_total || 0) | number:'1.2-2') + '\\nIEPS: $' + ((cost.ieps_unit_total || 0) | number:'1.2-2') + '\\nTotal: $' + ((Number(cost.cost) + Number(cost.iva_unit_total || 0) + Number(cost.ieps_unit_total || 0)) | number:'1.2-2')" style="cursor: help;">\r
                  \${{ (Number(cost.cost) + Number(cost.iva_unit_total || 0) + Number(cost.ieps_unit_total || 0)) | number:'1.2-2' }}\r
                </td>\r
                <td>\r
                  <div class="row-actions">\r
                    <button class="btn-icon" (click)="openCostModal(cost)" type="button" title="Editar">\r
                      <i class="fi fi-rr-pencil"></i>\r
                    </button>\r
                    <button class="btn-icon btn-icon--danger" (click)="deleteCost(cost.id)" type="button" title="Eliminar">\r
                      <i class="fi fi-rr-trash"></i>\r
                    </button>\r
                  </div>\r
                </td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
\r
        <!-- Tab: Fotos -->\r
        <div *ngIf="activeTab === 'fotos'" class="tab-pane">\r
          <div *ngIf="!product.photos || product.photos.length === 0" class="empty-state">\r
            <p>Sin im\xE1genes</p>\r
          </div>\r
\r
          <div *ngIf="product.photos && product.photos.length > 0" class="photos-grid">\r
            <div *ngFor="let photo of product.photos" class="photo-card">\r
              <img [src]="photo.signed_url || photo.s3_key" [alt]="photo.alt_text || 'Foto del producto'" loading="lazy">\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
</div>\r
\r
<!-- Modal Secundario: Precio -->\r
<div class="modal-overlay" *ngIf="priceModalVisible" (click)="priceModalVisible = false">\r
  <div class="modal-container modal-container--sm" (click)="$event.stopPropagation()">\r
    <div class="modal-header">\r
      <h2>{{ priceForm.id ? 'Editar Precio' : 'Nuevo Precio' }}</h2>\r
      <button class="close-btn" (click)="priceModalVisible = false" type="button">\r
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\r
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>\r
        </svg>\r
      </button>\r
    </div>\r
\r
    <div class="modal-content modal-content--compact">\r
      <div class="form-grid">\r
        <div class="form-field form-field--full">\r
          <label class="form-label">LISTA DE PRECIOS *</label>\r
          <div class="input-with-button">\r
            <select class="form-select" [(ngModel)]="priceForm.price_list_id">\r
              <option value="">Seleccionar...</option>\r
              <option *ngFor="let list of priceLists" [value]="list.id">{{ list.name }}</option>\r
            </select>\r
            <button class="btn-icon-add" (click)="openPriceListModal()" type="button" title="Crear lista de precios">\r
              <i class="fi fi-rr-plus"></i>\r
            </button>\r
          </div>\r
        </div>\r
\r
        <div class="form-field form-field--full">\r
          <label class="form-label">UOM *</label>\r
          <select class="form-select" [(ngModel)]="priceForm.product_uom_id">\r
            <option value="">Seleccionar...</option>\r
            <option *ngFor="let uom of product?.uoms" [value]="uom.id">\r
              {{ uom.uom?.name || uom.name || 'Sin nombre' }}\r
            </option>\r
          </select>\r
        </div>\r
\r
        <div class="form-field">\r
          <label class="form-label">PRECIO *</label>\r
          <input type="number" class="form-input" [(ngModel)]="priceForm.price" placeholder="0.00" step="0.01" min="0">\r
        </div>\r
\r
        <div class="form-field">\r
          <label class="form-label">IVA %</label>\r
          <input type="number" class="form-input" [(ngModel)]="priceForm.iva_percentage" placeholder="0" step="0.01" min="0" max="100">\r
        </div>\r
\r
        <div class="form-field form-field--full">\r
          <label class="form-label">IEPS %</label>\r
          <input type="number" class="form-input" [(ngModel)]="priceForm.ieps_percentage" placeholder="0" step="0.01" min="0" max="100">\r
        </div>\r
      </div>\r
\r
      <div class="form-actions">\r
        <button class="btn btn--secondary" (click)="priceModalVisible = false" type="button">Cancelar</button>\r
        <button class="btn btn--primary" (click)="savePrice()" type="button">Guardar</button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Modal Terciario: Crear Lista de Precios -->\r
<div class="modal-overlay" *ngIf="priceListModalVisible" (click)="priceListModalVisible = false">\r
  <div class="modal-container modal-container--xs" (click)="$event.stopPropagation()">\r
    <div class="modal-header">\r
      <h2>Nueva Lista de Precios</h2>\r
      <button class="close-btn" (click)="priceListModalVisible = false" type="button">\r
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\r
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>\r
        </svg>\r
      </button>\r
    </div>\r
\r
    <div class="modal-content modal-content--compact">\r
      <div class="form-grid">\r
        <div class="form-field form-field--full">\r
          <label class="form-label">NOMBRE *</label>\r
          <input type="text" class="form-input" [(ngModel)]="priceListForm.name" placeholder="Ej: Precio Comercial">\r
        </div>\r
\r
        <div class="form-field form-field--full">\r
          <label class="form-label">DESCRIPCI\xD3N</label>\r
          <textarea class="form-textarea" [(ngModel)]="priceListForm.description" placeholder="Descripci\xF3n opcional" rows="2"></textarea>\r
        </div>\r
      </div>\r
\r
      <div class="form-actions">\r
        <button class="btn btn--secondary" (click)="priceListModalVisible = false" type="button">Cancelar</button>\r
        <button class="btn btn--primary" (click)="savePriceList()" type="button">Crear</button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<!-- Modal Secundario: Costo -->\r
<div class="modal-overlay" *ngIf="costModalVisible" (click)="costModalVisible = false">\r
  <div class="modal-container modal-container--sm" (click)="$event.stopPropagation()">\r
    <div class="modal-header">\r
      <h2>{{ costForm.id ? 'Editar Costo' : 'Nuevo Costo' }}</h2>\r
      <button class="close-btn" (click)="costModalVisible = false" type="button">\r
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\r
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>\r
        </svg>\r
      </button>\r
    </div>\r
\r
    <div class="modal-content">\r
      <div class="form-grid">\r
        <div class="form-field form-field--full">\r
          <label class="form-label">PROVEEDOR *</label>\r
          <select class="form-select" [(ngModel)]="costForm.vendor_id">\r
            <option value="">Seleccionar...</option>\r
            <option *ngFor="let vendor of vendors" [value]="vendor.id">{{ vendor.name }}</option>\r
          </select>\r
        </div>\r
\r
        <div class="form-field form-field--full">\r
          <label class="form-label">UOM *</label>\r
          <select class="form-select" [(ngModel)]="costForm.product_uom_id">\r
            <option value="">Seleccionar...</option>\r
            <option *ngFor="let uom of product?.uoms" [value]="uom.id">{{ uom.uom?.name }}</option>\r
          </select>\r
        </div>\r
\r
        <div class="form-field form-field--full">\r
          <label class="form-label">COSTO *</label>\r
          <input type="number" class="form-input" [(ngModel)]="costForm.cost" placeholder="0.00" step="0.01" min="0">\r
        </div>\r
\r
        <div class="form-field">\r
          <label class="form-label">IVA %</label>\r
          <input type="number" class="form-input" [(ngModel)]="costForm.iva_percentage" placeholder="0" step="0.01" min="0">\r
        </div>\r
\r
        <div class="form-field">\r
          <label class="form-label">IEPS %</label>\r
          <input type="number" class="form-input" [(ngModel)]="costForm.ieps_percentage" placeholder="0" step="0.01" min="0">\r
        </div>\r
      </div>\r
\r
      <div class="form-actions">\r
        <button class="btn btn--secondary" (click)="costModalVisible = false" type="button">Cancelar</button>\r
        <button class="btn btn--primary" (click)="saveCost()" type="button">Guardar</button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: [`/* src/app/features/settings/components/product-detail-modal/product-detail-modal.component.scss */
.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 850px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.modal-container--sm {
  max-width: 480px;
}
.modal-container--xs {
  max-width: 400px;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}
.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}
.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  position: relative;
}
.modal-content--compact {
  padding: 10px;
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6b7280;
}
.loading-container p {
  margin-top: 12px;
  font-size: 14px;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.tab-content {
  padding: 16px;
  position: relative;
}
.tab-pane {
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.tab-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 1;
}
.form-field--full {
  grid-column: 1/-1;
}
.form-label {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  box-sizing: border-box;
}
.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.form-input:disabled,
.form-select:disabled,
.form-textarea:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}
.form-input--inline,
.form-select--inline,
.form-textarea--inline {
  padding: 6px 8px;
  font-size: 12px;
}
.form-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 20px;
  padding-right: 36px;
  appearance: none;
  width: 100%;
  box-sizing: border-box;
}
.form-select option {
  padding: 8px;
}
.form-textarea {
  resize: vertical;
  min-height: 80px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}
.input-with-button {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.input-with-button .form-select {
  flex: 1;
  min-width: 0;
}
.btn-icon-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  color: #3b82f6;
  transition: all 0.15s;
  font-size: 16px;
  flex-shrink: 0;
}
.btn-icon-add:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn--primary {
  background: #3b82f6;
  color: white;
}
.btn--primary:hover:not(:disabled) {
  background: #2563eb;
}
.btn--secondary {
  background: #f3f4f6;
  color: #374151;
}
.btn--secondary:hover:not(:disabled) {
  background: #e5e7eb;
}
.btn--sm {
  padding: 6px 12px;
  font-size: 12px;
}
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
  color: #6b7280;
  transition: all 0.15s;
}
.btn-icon:hover {
  background: #f3f4f6;
  color: #374151;
}
.btn-icon--danger:hover {
  background: #fee2e2;
  color: #dc2626;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.data-table thead {
  background: #f9fafb;
}
.data-table thead th {
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}
.data-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
}
.data-table tbody tr:last-child {
  border-bottom: none;
}
.data-table tbody tr:hover {
  background: #f9fafb;
}
.data-table tbody td {
  padding: 10px 12px;
  color: #374151;
}
.uom-table td {
  vertical-align: middle;
  padding: 8px;
}
.uom-table thead th:nth-child(1),
.uom-table tbody td:nth-child(1) {
  width: 35%;
}
.uom-table thead th:nth-child(2),
.uom-table tbody td:nth-child(2) {
  width: 15%;
}
.uom-table thead th:nth-child(3),
.uom-table tbody td:nth-child(3) {
  width: 15%;
}
.uom-table thead th:nth-child(4),
.uom-table tbody td:nth-child(4) {
  width: 30%;
}
.uom-table thead th:nth-child(5),
.uom-table tbody td:nth-child(5) {
  width: 5%;
}
.row-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.checkbox-wrapper input[type=checkbox] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}
.checkbox-wrapper label {
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.form-input--inline {
  padding: 6px 8px;
  font-size: 12px;
  min-width: 60px;
  width: 100%;
}
.form-select--inline {
  padding: 6px 8px;
  font-size: 12px;
  width: 100%;
}
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #9ca3af;
}
.empty-state p {
  font-size: 14px;
  margin: 0;
}
.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
.photo-card {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  aspect-ratio: 1;
}
.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (max-width: 768px) {
  .modal-container {
    max-width: 95vw;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .photos-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
  .tab-content {
    padding: 16px;
  }
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}
:host ::ng-deep .snackbar-success {
  background-color: #10b981 !important;
  color: white !important;
}
:host ::ng-deep .snackbar-success .mat-mdc-snack-bar-label {
  color: white !important;
}
:host ::ng-deep .snackbar-success .mat-mdc-button {
  color: white !important;
}
:host ::ng-deep .snackbar-error {
  background-color: #ef4444 !important;
  color: white !important;
}
:host ::ng-deep .snackbar-error .mat-mdc-snack-bar-label {
  color: white !important;
}
:host ::ng-deep .snackbar-error .mat-mdc-button {
  color: white !important;
}
:host ::ng-deep .snackbar-info {
  background-color: #3b82f6 !important;
  color: white !important;
}
:host ::ng-deep .snackbar-info .mat-mdc-snack-bar-label {
  color: white !important;
}
:host ::ng-deep .snackbar-info .mat-mdc-button {
  color: white !important;
}
/*# sourceMappingURL=product-detail-modal.component.css.map */
`] }]
  }], () => [{ type: ProductService }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: MatSnackBar }, { type: ChangeDetectorRef }], { productUpdated: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailModalComponent, { className: "ProductDetailModalComponent", filePath: "src/app/features/settings/components/product-detail-modal/product-detail-modal.component.ts", lineNumber: 17 });
})();

export {
  BranchService,
  WarehouseDetailModalComponent,
  TabComponent,
  ProductDetailModalComponent
};
//# sourceMappingURL=chunk-E2W2JU4V.js.map
