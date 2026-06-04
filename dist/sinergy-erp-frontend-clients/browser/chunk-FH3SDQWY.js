import {
  EmailTemplateService
} from "./chunk-CMZCHHG7.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-JBTCIKEZ.js";
import {
  SelectComponent
} from "./chunk-KW3QIBBO.js";
import {
  InterceptorService
} from "./chunk-AU5FE5QM.js";
import {
  InputComponent
} from "./chunk-K3AQGIHQ.js";
import {
  ButtonComponent
} from "./chunk-WDQLA25Z.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-I5IOP5OM.js";
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
} from "./chunk-BOPJE7PX.js";
import {
  Check,
  DollarSign,
  Download,
  FileCheck,
  FileText,
  FileX,
  Image,
  LucideAngularComponent,
  LucideAngularModule,
  Mail,
  Plus,
  RotateCcw,
  SquarePen,
  Trash2,
  Upload,
  X
} from "./chunk-4Y3D6DZ3.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  HttpClient,
  NgForOf,
  NgIf,
  environment
} from "./chunk-6DLZ3MOQ.js";
import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  Output,
  Pipe,
  __spreadValues,
  finalize,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-JD27NKNP.js";

// src/app/features/contracts/services/contract-document.service.ts
var ContractDocumentService = class _ContractDocumentService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  getContractDocuments(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/documents`);
  }
  uploadDocument(contractId, formData) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/documents`, formData);
  }
  updateDocumentStatus(contractId, documentId, data) {
    return this.http.patch(`${this.api}/tenant/contracts/${contractId}/documents/${documentId}/status`, data);
  }
  deleteDocument(contractId, documentId) {
    return this.http.delete(`${this.api}/tenant/contracts/${contractId}/documents/${documentId}`);
  }
  static \u0275fac = function ContractDocumentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDocumentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ContractDocumentService, factory: _ContractDocumentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDocumentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/contracts/components/contract-document-upload-modal/contract-document-upload-modal.component.ts
function ContractDocumentUploadModalComponent_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u2713 ", ctx_r0.selectedFile.name, " (", ctx_r0.formatFileSize(ctx_r0.selectedFile.size), ") ");
  }
}
var ContractDocumentUploadModalComponent = class _ContractDocumentUploadModalComponent {
  data;
  dialogRef;
  documentService;
  interceptorService;
  uploading = signal(false, ...ngDevMode ? [{ debugName: "uploading" }] : []);
  selectedFile = null;
  notes = "";
  Upload = Upload;
  X = X;
  constructor(data, dialogRef, documentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.documentService = documentService;
    this.interceptorService = interceptorService;
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "El archivo es muy grande (m\xE1ximo 10MB)"
        });
        return;
      }
      this.selectedFile = file;
    }
  }
  uploadDocument() {
    if (!this.selectedFile) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Selecciona un archivo"
      });
      return;
    }
    this.uploading.set(true);
    const formData = new FormData();
    formData.append("file", this.selectedFile);
    if (this.notes) {
      formData.append("notes", this.notes);
    }
    this.documentService.uploadDocument(this.data.contractId, formData).subscribe({
      next: () => {
        this.uploading.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Documento subido correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.uploading.set(false);
        let message = "Error al subir documento";
        if (err.status === 413) {
          message = "Archivo muy grande (m\xE1ximo 10MB)";
        } else if (err.status === 415) {
          message = "Tipo de archivo no permitido";
        }
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  static \u0275fac = function ContractDocumentUploadModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDocumentUploadModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(ContractDocumentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractDocumentUploadModalComponent, selectors: [["app-contract-document-upload-modal"]], decls: 24, vars: 7, consts: [[1, "dialog-container"], [1, "dialog-header"], [1, "dialog-title"], [1, "close-button", 3, "click"], [3, "img", "size"], [1, "dialog-content"], [1, "form-grid"], [1, "form-field", "full-width"], [1, "field-label"], [1, "file-input-wrapper"], ["type", "file", "accept", ".jpg,.jpeg,.png,.pdf,.doc,.docx", "id", "fileInput", 1, "field-input", "file-input", 3, "change"], ["class", "file-info", 4, "ngIf"], ["placeholder", "Notas adicionales...", "rows", "3", 1, "field-input", 3, "ngModelChange", "ngModel"], [1, "help-text"], [1, "dialog-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Subir Documento", "custom_class", "btn_primary", 3, "clicked", "loading", "disabled", "icon"], [1, "file-info"]], template: function ContractDocumentUploadModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Subir Documento del Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function ContractDocumentUploadModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "label", 8);
      \u0275\u0275text(10, "Archivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 9)(12, "input", 10);
      \u0275\u0275listener("change", function ContractDocumentUploadModalComponent_Template_input_change_12_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(13, ContractDocumentUploadModalComponent_p_13_Template, 2, 2, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 7)(15, "label", 8);
      \u0275\u0275text(16, "Notas (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "textarea", 12);
      \u0275\u0275twoWayListener("ngModelChange", function ContractDocumentUploadModalComponent_Template_textarea_ngModelChange_17_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.notes, $event) || (ctx.notes = $event);
        return $event;
      });
      \u0275\u0275text(18, "        ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "p", 13);
      \u0275\u0275text(20, " Formatos permitidos: JPG, PNG, PDF, DOC, DOCX (m\xE1x. 10MB) ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 14)(22, "app-button", 15);
      \u0275\u0275listener("clicked", function ContractDocumentUploadModalComponent_Template_app_button_clicked_22_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "app-button", 16);
      \u0275\u0275listener("clicked", function ContractDocumentUploadModalComponent_Template_app_button_clicked_23_listener() {
        return ctx.uploadDocument();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.selectedFile);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.notes);
      \u0275\u0275advance(6);
      \u0275\u0275property("loading", ctx.uploading())("disabled", !ctx.selectedFile)("icon", ctx.Upload);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatDialogModule,
    ButtonComponent,
    LucideAngularModule,
    LucideAngularComponent
  ], styles: ["\n\n.dialog[_ngcontent-%COMP%] {\n  width: 100dvw;\n  max-width: 600px;\n}\n.dialog-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.field-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.field-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.625rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n  background-color: #ffffff;\n  cursor: pointer;\n}\n.field-input[_ngcontent-%COMP%]:hover {\n  border-color: #9ca3af;\n  background-color: #f9fafb;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  background-color: #ffffff;\n}\n.field-input[_ngcontent-%COMP%]:disabled {\n  background-color: #f9fafb;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\ninput[type=file].field-input[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  cursor: pointer;\n}\ninput[type=file].field-input[_ngcontent-%COMP%]::file-selector-button {\n  padding: 0.375rem 0.75rem;\n  margin-right: 0.75rem;\n  background-color: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\ninput[type=file].field-input[_ngcontent-%COMP%]::file-selector-button:hover {\n  background-color: #4f46e5;\n}\ntextarea.field-input[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.file-info[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #059669;\n  margin-top: 0.5rem;\n  font-weight: 500;\n}\n.file-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n}\n.help-text[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=contract-document-upload-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDocumentUploadModalComponent, [{
    type: Component,
    args: [{ selector: "app-contract-document-upload-modal", standalone: true, imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      ButtonComponent,
      LucideAngularModule
    ], template: '<div class="dialog-container">\r\n  <div class="dialog-header">\r\n    <h2 class="dialog-title">Subir Documento del Contrato</h2>\r\n    <button (click)="close()" class="close-button">\r\n      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r\n    </button>\r\n  </div>\r\n\r\n  <div class="dialog-content">\r\n    <div class="form-grid">\r\n      <div class="form-field full-width">\r\n        <label class="field-label">Archivo</label>\r\n        <div class="file-input-wrapper">\r\n          <input \r\n            type="file"\r\n            (change)="onFileSelected($event)"\r\n            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"\r\n            class="field-input file-input"\r\n            id="fileInput">\r\n        </div>\r\n        <p *ngIf="selectedFile" class="file-info">\r\n          \u2713 {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})\r\n        </p>\r\n      </div>\r\n\r\n      <div class="form-field full-width">\r\n        <label class="field-label">Notas (Opcional)</label>\r\n        <textarea \r\n          [(ngModel)]="notes"\r\n          placeholder="Notas adicionales..."\r\n          rows="3"\r\n          class="field-input">\r\n        </textarea>\r\n      </div>\r\n    </div>\r\n\r\n    <p class="help-text">\r\n      Formatos permitidos: JPG, PNG, PDF, DOC, DOCX (m\xE1x. 10MB)\r\n    </p>\r\n  </div>\r\n\r\n  <div class="dialog-footer">\r\n    <app-button\r\n      text="Cancelar"\r\n      custom_class="btn_secondary"\r\n      (clicked)="close()">\r\n    </app-button>\r\n    <app-button\r\n      text="Subir Documento"\r\n      custom_class="btn_primary"\r\n      [loading]="uploading()"\r\n      [disabled]="!selectedFile"\r\n      [icon]="Upload"\r\n      (clicked)="uploadDocument()">\r\n    </app-button>\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/contracts/components/contract-document-upload-modal/contract-document-upload-modal.component.scss */\n.dialog {\n  width: 100dvw;\n  max-width: 600px;\n}\n.dialog-container {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.form-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 1rem;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-field.full-width {\n  grid-column: 1/-1;\n}\n.field-label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.field-input {\n  width: 100%;\n  padding: 0.625rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.875rem;\n  transition: all 0.2s;\n  background-color: #ffffff;\n  cursor: pointer;\n}\n.field-input:hover {\n  border-color: #9ca3af;\n  background-color: #f9fafb;\n}\n.field-input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  background-color: #ffffff;\n}\n.field-input:disabled {\n  background-color: #f9fafb;\n  cursor: not-allowed;\n  opacity: 0.6;\n}\ninput[type=file].field-input {\n  padding: 0.5rem 0.75rem;\n  cursor: pointer;\n}\ninput[type=file].field-input::file-selector-button {\n  padding: 0.375rem 0.75rem;\n  margin-right: 0.75rem;\n  background-color: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s;\n}\ninput[type=file].field-input::file-selector-button:hover {\n  background-color: #4f46e5;\n}\ntextarea.field-input {\n  resize: vertical;\n  font-family: inherit;\n}\n.file-info {\n  font-size: 0.75rem;\n  color: #059669;\n  margin-top: 0.5rem;\n  font-weight: 500;\n}\n.file-input-wrapper {\n  position: relative;\n}\n.help-text {\n  font-size: 0.75rem;\n  color: #6b7280;\n  margin-top: 1rem;\n  margin-bottom: 0;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=contract-document-upload-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: ContractDocumentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractDocumentUploadModalComponent, { className: "ContractDocumentUploadModalComponent", filePath: "src/app/features/contracts/components/contract-document-upload-modal/contract-document-upload-modal.component.ts", lineNumber: 23 });
})();

// src/app/features/contracts/components/contract-documents/contract-documents.component.ts
function ContractDocumentsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "p", 8);
    \u0275\u0275text(2, "Cargando documentos...");
    \u0275\u0275elementEnd()();
  }
}
function ContractDocumentsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 10);
    \u0275\u0275text(2, "No hay documentos subidos");
    \u0275\u0275elementEnd()();
  }
}
function ContractDocumentsComponent_div_7_div_1_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(doc_r2.notes);
  }
}
function ContractDocumentsComponent_div_7_div_1_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "button", 28);
    \u0275\u0275listener("click", function ContractDocumentsComponent_div_7_div_1_div_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateStatus(doc_r2, "approved"));
    });
    \u0275\u0275element(2, "lucide-icon", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 29);
    \u0275\u0275listener("click", function ContractDocumentsComponent_div_7_div_1_div_19_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const doc_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateStatus(doc_r2, "rejected"));
    });
    \u0275\u0275element(4, "lucide-icon", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.FileCheck)("size", 16);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.FileX)("size", 16);
  }
}
function ContractDocumentsComponent_div_7_div_1_a_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 30);
    \u0275\u0275element(1, "lucide-icon", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", doc_r2.download_url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r3.Download)("size", 16);
  }
}
function ContractDocumentsComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275element(2, "lucide-icon", 15);
    \u0275\u0275elementStart(3, "div", 16)(4, "div", 17)(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 19)(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span");
    \u0275\u0275text(13, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, ContractDocumentsComponent_div_7_div_1_p_17_Template, 2, 1, "p", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 21);
    \u0275\u0275template(19, ContractDocumentsComponent_div_7_div_1_div_19_Template, 5, 4, "div", 22)(20, ContractDocumentsComponent_div_7_div_1_a_20_Template, 2, 3, "a", 23);
    \u0275\u0275elementStart(21, "button", 24);
    \u0275\u0275listener("click", function ContractDocumentsComponent_div_7_div_1_Template_button_click_21_listener() {
      const doc_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteDocument(doc_r2));
    });
    \u0275\u0275element(22, "lucide-icon", 25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const doc_r2 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.getFileIcon(doc_r2.mime_type))("size", 20);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(doc_r2.file_name);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r3.getStatusClass(doc_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getStatusLabel(doc_r2.status), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.formatFileSize(doc_r2.file_size));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 13, doc_r2.created_at, "mediumDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", doc_r2.notes);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", doc_r2.status === "pending");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", doc_r2.download_url);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.Trash2)("size", 16);
  }
}
function ContractDocumentsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, ContractDocumentsComponent_div_7_div_1_Template, 23, 16, "div", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.documents());
  }
}
var ContractDocumentsComponent = class _ContractDocumentsComponent {
  documentService;
  interceptorService;
  dialog;
  contractId;
  documents = signal([], ...ngDevMode ? [{ debugName: "documents" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  Plus = Plus;
  Download = Download;
  Trash2 = Trash2;
  FileText = FileText;
  Image = Image;
  FileCheck = FileCheck;
  FileX = FileX;
  constructor(documentService, interceptorService, dialog) {
    this.documentService = documentService;
    this.interceptorService = interceptorService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadDocuments();
  }
  loadDocuments() {
    this.loading.set(true);
    this.documentService.getContractDocuments(this.contractId).subscribe({
      next: (docs) => {
        this.documents.set(docs);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los documentos"
        });
      }
    });
  }
  openUploadModal() {
    const dialogRef = this.dialog.open(ContractDocumentUploadModalComponent, {
      data: { contractId: this.contractId }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDocuments();
      }
    });
  }
  deleteDocument(doc) {
    if (!confirm(`\xBFEliminar documento "${doc.file_name}"?`))
      return;
    this.documentService.deleteDocument(this.contractId, doc.id).subscribe({
      next: () => {
        this.loadDocuments();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Documento eliminado"
        });
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudo eliminar el documento"
        });
      }
    });
  }
  updateStatus(doc, status) {
    this.documentService.updateDocumentStatus(this.contractId, doc.id, { status }).subscribe({
      next: () => {
        this.loadDocuments();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Estado actualizado"
        });
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudo actualizar el estado"
        });
      }
    });
  }
  getStatusClass(status) {
    const statusMap = {
      "pending": "bg-yellow-100 text-yellow-800",
      "approved": "bg-green-100 text-green-800",
      "rejected": "bg-red-100 text-red-800"
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status]}`;
  }
  getStatusLabel(status) {
    const labels = {
      "pending": "Pendiente",
      "approved": "Aprobado",
      "rejected": "Rechazado"
    };
    return labels[status];
  }
  getFileIcon(mimeType) {
    if (mimeType.startsWith("image/"))
      return this.Image;
    if (mimeType.includes("pdf"))
      return this.FileText;
    return this.FileText;
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  static \u0275fac = function ContractDocumentsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDocumentsComponent)(\u0275\u0275directiveInject(ContractDocumentService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractDocumentsComponent, selectors: [["app-contract-documents"]], inputs: { contractId: "contractId" }, decls: 8, vars: 4, consts: [[1, "documents-section"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-base", "font-semibold", "text-gray-800"], ["text", "Subir Documento", "custom_class", "btn_primary", "size", "sm", 3, "clicked", "icon"], ["class", "text-center py-6", 4, "ngIf"], ["class", "text-center py-6 text-gray-500", 4, "ngIf"], ["class", "space-y-2", 4, "ngIf"], [1, "text-center", "py-6"], [1, "text-sm", "text-gray-500"], [1, "text-center", "py-6", "text-gray-500"], [1, "text-sm"], [1, "space-y-2"], ["class", "flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "justify-between", "p-3", "border", "border-gray-200", "rounded-lg", "hover:bg-gray-50", "transition-colors"], [1, "flex", "items-center", "gap-3", "flex-1", "min-w-0"], [1, "text-gray-400", "flex-shrink-0", 3, "img", "size"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "text-sm", "font-medium", "text-gray-900", "truncate"], [1, "flex", "items-center", "gap-2", "text-xs", "text-gray-500"], ["class", "text-xs text-gray-600 mt-1 truncate", 4, "ngIf"], [1, "flex", "items-center", "gap-1", "flex-shrink-0"], ["class", "flex gap-1", 4, "ngIf"], ["target", "_blank", "class", "p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors", "title", "Descargar", 3, "href", 4, "ngIf"], ["title", "Eliminar", 1, "p-1.5", "text-red-600", "hover:bg-red-50", "rounded", "transition-colors", 3, "click"], [3, "img", "size"], [1, "text-xs", "text-gray-600", "mt-1", "truncate"], [1, "flex", "gap-1"], ["title", "Aprobar", 1, "p-1.5", "text-green-600", "hover:bg-green-50", "rounded", "transition-colors", 3, "click"], ["title", "Rechazar", 1, "p-1.5", "text-red-600", "hover:bg-red-50", "rounded", "transition-colors", 3, "click"], ["target", "_blank", "title", "Descargar", 1, "p-1.5", "text-indigo-600", "hover:bg-indigo-50", "rounded", "transition-colors", 3, "href"]], template: function ContractDocumentsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h4", 2);
      \u0275\u0275text(3, "Documentos del Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "app-button", 3);
      \u0275\u0275listener("clicked", function ContractDocumentsComponent_Template_app_button_clicked_4_listener() {
        return ctx.openUploadModal();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(5, ContractDocumentsComponent_div_5_Template, 3, 0, "div", 4)(6, ContractDocumentsComponent_div_6_Template, 3, 0, "div", 5)(7, ContractDocumentsComponent_div_7_Template, 2, 1, "div", 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("icon", ctx.Plus);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.documents().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.documents().length > 0);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    ButtonComponent,
    LucideAngularModule,
    LucideAngularComponent,
    DatePipe
  ], styles: ["\n\n.documents-section[_ngcontent-%COMP%] {\n  margin-top: 0;\n  padding-top: 0;\n  border-top: none;\n}\n/*# sourceMappingURL=contract-documents.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDocumentsComponent, [{
    type: Component,
    args: [{ selector: "app-contract-documents", standalone: true, imports: [
      CommonModule,
      ButtonComponent,
      LucideAngularModule
    ], template: `<div class="documents-section">\r
  <div class="flex items-center justify-between mb-4">\r
    <h4 class="text-base font-semibold text-gray-800">Documentos del Contrato</h4>\r
    <app-button\r
      text="Subir Documento"\r
      custom_class="btn_primary"\r
      size="sm"\r
      [icon]="Plus"\r
      (clicked)="openUploadModal()">\r
    </app-button>\r
  </div>\r
\r
  <!-- Loading State -->\r
  <div *ngIf="loading()" class="text-center py-6">\r
    <p class="text-sm text-gray-500">Cargando documentos...</p>\r
  </div>\r
\r
  <!-- Empty State -->\r
  <div *ngIf="!loading() && documents().length === 0" class="text-center py-6 text-gray-500">\r
    <p class="text-sm">No hay documentos subidos</p>\r
  </div>\r
\r
  <!-- Documents List -->\r
  <div *ngIf="!loading() && documents().length > 0" class="space-y-2">\r
    <div *ngFor="let doc of documents()" \r
         class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">\r
      \r
      <div class="flex items-center gap-3 flex-1 min-w-0">\r
        <lucide-icon \r
          [img]="getFileIcon(doc.mime_type)"\r
          class="text-gray-400 flex-shrink-0"\r
          [size]="20">\r
        </lucide-icon>\r
\r
        <div class="flex-1 min-w-0">\r
          <div class="flex items-center gap-2 mb-1">\r
            <span class="text-sm font-medium text-gray-900 truncate">{{ doc.file_name }}</span>\r
            <span [class]="getStatusClass(doc.status)">\r
              {{ getStatusLabel(doc.status) }}\r
            </span>\r
          </div>\r
          \r
          <div class="flex items-center gap-2 text-xs text-gray-500">\r
            <span>{{ formatFileSize(doc.file_size) }}</span>\r
            <span>\u2022</span>\r
            <span>{{ doc.created_at | date:'mediumDate' }}</span>\r
          </div>\r
\r
          <p *ngIf="doc.notes" class="text-xs text-gray-600 mt-1 truncate">{{ doc.notes }}</p>\r
        </div>\r
      </div>\r
\r
      <div class="flex items-center gap-1 flex-shrink-0">\r
        <!-- Status Actions -->\r
        <div *ngIf="doc.status === 'pending'" class="flex gap-1">\r
          <button\r
            (click)="updateStatus(doc, 'approved')"\r
            class="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"\r
            title="Aprobar">\r
            <lucide-icon [img]="FileCheck" [size]="16"></lucide-icon>\r
          </button>\r
          <button\r
            (click)="updateStatus(doc, 'rejected')"\r
            class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"\r
            title="Rechazar">\r
            <lucide-icon [img]="FileX" [size]="16"></lucide-icon>\r
          </button>\r
        </div>\r
\r
        <!-- Download -->\r
        <a \r
          *ngIf="doc.download_url"\r
          [href]="doc.download_url"\r
          target="_blank"\r
          class="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"\r
          title="Descargar">\r
          <lucide-icon [img]="Download" [size]="16"></lucide-icon>\r
        </a>\r
\r
        <!-- Delete -->\r
        <button\r
          (click)="deleteDocument(doc)"\r
          class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"\r
          title="Eliminar">\r
          <lucide-icon [img]="Trash2" [size]="16"></lucide-icon>\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/contract-documents/contract-documents.component.scss */\n.documents-section {\n  margin-top: 0;\n  padding-top: 0;\n  border-top: none;\n}\n/*# sourceMappingURL=contract-documents.component.css.map */\n"] }]
  }], () => [{ type: ContractDocumentService }, { type: InterceptorService }, { type: MatDialog }], { contractId: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractDocumentsComponent, { className: "ContractDocumentsComponent", filePath: "src/app/features/contracts/components/contract-documents/contract-documents.component.ts", lineNumber: 22 });
})();

// src/app/features/contracts/services/payment.service.ts
var PaymentService = class _PaymentService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  generatePayments(contractId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/generate`, {});
  }
  getPayments(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments`);
  }
  getPaymentStats(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments/stats`);
  }
  getPayment(contractId, paymentId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`);
  }
  updatePayment(contractId, paymentId, data) {
    return this.http.put(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`, data);
  }
  markAsPaid(contractId, paymentId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/pay`, data);
  }
  cancelPayment(contractId, paymentId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/cancel`, {});
  }
  deletePayment(contractId, paymentId) {
    return this.http.delete(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}`);
  }
  registerPartialPayment(contractId, paymentId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/pay`, data);
  }
  resetPayment(contractId, paymentId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/reset`, {});
  }
  uploadDocument(contractId, paymentId, file, document_type, notes) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", document_type);
    if (notes) {
      formData.append("notes", notes);
    }
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents`, formData);
  }
  getDocuments(contractId, paymentId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents`);
  }
  getDocumentUrl(contractId, paymentId, documentId, expiresIn = 3600) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents/${documentId}/url?expiresIn=${expiresIn}`);
  }
  deleteDocument(contractId, paymentId, documentId) {
    return this.http.delete(`${this.api}/tenant/contracts/${contractId}/payments/${paymentId}/documents/${documentId}`);
  }
  static \u0275fac = function PaymentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaymentService, factory: _PaymentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/core/pipes/local-date.pipe.ts
var LocalDatePipe = class _LocalDatePipe {
  datePipe;
  constructor(datePipe) {
    this.datePipe = datePipe;
  }
  transform(value, format = "mediumDate") {
    if (!value)
      return null;
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-").map(Number);
      const localDate = new Date(year, month - 1, day);
      return this.datePipe.transform(localDate, format);
    }
    return this.datePipe.transform(value, format);
  }
  static \u0275fac = function LocalDatePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LocalDatePipe)(\u0275\u0275directiveInject(DatePipe, 16));
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "localDate", type: _LocalDatePipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocalDatePipe, [{
    type: Pipe,
    args: [{
      name: "localDate",
      standalone: true
    }]
  }], () => [{ type: DatePipe }], null);
})();

// src/app/features/contracts/components/partial-payment-modal/partial-payment-modal.component.ts
function PartialPaymentModalComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" El monto no puede exceder ", \u0275\u0275pipeBind2(2, 1, ctx_r0.amountPending, ctx_r0.data.currency), " ");
  }
}
function PartialPaymentModalComponent_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-green-600", ctx_r0.isFullPayment)("text-blue-600", !ctx_r0.isFullPayment);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.paymentTypeMessage, " ");
  }
}
var PartialPaymentModalComponent = class _PartialPaymentModalComponent {
  data;
  dialogRef;
  fb;
  paymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(data, dialogRef, fb, paymentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.paymentService = paymentService;
    this.interceptorService = interceptorService;
    const today = this.getLocalDateString(/* @__PURE__ */ new Date());
    this.form = this.fb.group({
      amount: ["", [Validators.required, Validators.min(0.01), this.maxAmountValidator.bind(this)]],
      payment_date: [today, Validators.required],
      payment_method: ["", Validators.required],
      reference_number: [""],
      notes: [""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
    this.form.get("amount")?.setValue(this.data.payment.amount_pending);
  }
  getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  maxAmountValidator(control) {
    if (!control.value)
      return null;
    const amount = parseFloat(control.value);
    if (amount > this.data.payment.amount_pending) {
      return { maxAmount: { max: this.data.payment.amount_pending, actual: amount } };
    }
    return null;
  }
  get amountPending() {
    return this.data.payment.amount_pending;
  }
  get isFullPayment() {
    const amount = parseFloat(this.form.get("amount")?.value || 0);
    const pending = this.amountPending;
    return Math.abs(amount - pending) < 0.01;
  }
  get paymentTypeMessage() {
    if (this.isFullPayment) {
      return "Se marcar\xE1 como pagado completo";
    }
    return "Se registrar\xE1 como pago parcial";
  }
  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos requeridos correctamente"
      });
      return;
    }
    this.saving.set(true);
    this.paymentService.registerPartialPayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago registrado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al registrar el pago"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function PartialPaymentModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartialPaymentModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartialPaymentModalComponent, selectors: [["app-partial-payment-modal"]], features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 35, vars: 15, consts: [[1, "modal-container"], [1, "modal-header"], [1, "text-xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "font-semibold", "text-orange-600"], ["type", "button", 1, "close-button", 3, "click"], [3, "img", "size"], [1, "modal-body"], [1, "space-y-4", 3, "formGroup"], ["label", "Monto a Pagar", "type", "number", "placeholder", "Ingresa el monto", 3, "form_control"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["class", "text-xs mt-1", 3, "text-green-600", "text-blue-600", 4, "ngIf"], ["label", "Fecha de Pago", "type", "date", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "text-red-500"], [3, "config"], ["label", "N\xFAmero de Referencia", "type", "text", "placeholder", "Ej: REF123456", 3, "form_control"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas adicionales sobre el pago...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "modal-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Registrar Pago", "custom_class", "btn_primary", 3, "clicked", "loading"], [1, "text-xs", "text-red-600", "mt-1"], [1, "text-xs", "mt-1"]], template: function PartialPaymentModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, "Registrar Pago");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementStart(7, "span", 4);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "currency");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function PartialPaymentModalComponent_Template_button_click_10_listener() {
        return ctx.close();
      });
      \u0275\u0275element(11, "lucide-icon", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 7)(13, "form", 8)(14, "div");
      \u0275\u0275element(15, "app-input", 9);
      \u0275\u0275template(16, PartialPaymentModalComponent_p_16_Template, 3, 4, "p", 10)(17, PartialPaymentModalComponent_p_17_Template, 2, 5, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div");
      \u0275\u0275element(19, "app-input", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div")(21, "label", 13);
      \u0275\u0275text(22, " M\xE9todo de Pago ");
      \u0275\u0275elementStart(23, "span", 14);
      \u0275\u0275text(24, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(25, "app-select", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div");
      \u0275\u0275element(27, "app-input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div")(29, "label", 13);
      \u0275\u0275text(30, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "textarea", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 18)(33, "app-button", 19);
      \u0275\u0275listener("clicked", function PartialPaymentModalComponent_Template_app_button_clicked_33_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "app-button", 20);
      \u0275\u0275listener("clicked", function PartialPaymentModalComponent_Template_app_button_clicked_34_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" Pago #", ctx.data.payment.payment_number, " - Monto pendiente: ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 12, ctx.amountPending, ctx.data.currency));
      \u0275\u0275advance(3);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.get("amount"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.form.get("amount")) == null ? null : tmp_6_0.hasError("maxAmount"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.hasError("maxAmount")) && ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.value));
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.get("payment_date"));
      \u0275\u0275advance(6);
      \u0275\u0275property("config", ctx.paymentMethodSelectConfig);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.get("reference_number"));
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    CurrencyPipe
  ], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 8px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.close-button[_ngcontent-%COMP%] {\n  padding: 4px;\n  color: #6b7280;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=partial-payment-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PartialPaymentModalComponent, [{
    type: Component,
    args: [{ selector: "app-partial-payment-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule
    ], providers: [DatePipe], template: `<div class="modal-container">\r
  <!-- Header -->\r
  <div class="modal-header">\r
    <div>\r
      <h2 class="text-xl font-semibold text-gray-800">Registrar Pago</h2>\r
      <p class="text-sm text-gray-600 mt-1">\r
        Pago #{{ data.payment.payment_number }} - Monto pendiente: \r
        <span class="font-semibold text-orange-600">{{ amountPending | currency:data.currency }}</span>\r
      </p>\r
    </div>\r
    <button (click)="close()" class="close-button" type="button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <!-- Body -->\r
  <div class="modal-body">\r
    <form [formGroup]="form" class="space-y-4">\r
      <!-- Amount -->\r
      <div>\r
        <app-input\r
          label="Monto a Pagar"\r
          type="number"\r
          placeholder="Ingresa el monto"\r
          [form_control]="form.get('amount')">\r
        </app-input>\r
        <p *ngIf="form.get('amount')?.hasError('maxAmount')" class="text-xs text-red-600 mt-1">\r
          El monto no puede exceder {{ amountPending | currency:data.currency }}\r
        </p>\r
        <p *ngIf="!form.get('amount')?.hasError('maxAmount') && form.get('amount')?.value" class="text-xs mt-1" [class.text-green-600]="isFullPayment" [class.text-blue-600]="!isFullPayment">\r
          {{ paymentTypeMessage }}\r
        </p>\r
      </div>\r
\r
      <!-- Payment Date -->\r
      <div>\r
        <app-input\r
          label="Fecha de Pago"\r
          type="date"\r
          [form_control]="form.get('payment_date')">\r
        </app-input>\r
      </div>\r
\r
      <!-- Payment Method -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">\r
          M\xE9todo de Pago <span class="text-red-500">*</span>\r
        </label>\r
        <app-select [config]="paymentMethodSelectConfig"></app-select>\r
      </div>\r
\r
      <!-- Reference Number -->\r
      <div>\r
        <app-input\r
          label="N\xFAmero de Referencia"\r
          type="text"\r
          placeholder="Ej: REF123456"\r
          [form_control]="form.get('reference_number')">\r
        </app-input>\r
      </div>\r
\r
      <!-- Notes -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas adicionales sobre el pago..."></textarea>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <!-- Footer -->\r
  <div class="modal-footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      text="Registrar Pago"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/partial-payment-modal/partial-payment-modal.component.scss */\n.modal-container {\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 8px;\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.close-button {\n  padding: 4px;\n  color: #6b7280;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=partial-payment-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: PaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartialPaymentModalComponent, { className: "PartialPaymentModalComponent", filePath: "src/app/features/contracts/components/partial-payment-modal/partial-payment-modal.component.ts", lineNumber: 29 });
})();

// src/app/features/contracts/components/edit-payment-modal/edit-payment-modal.component.ts
var EditPaymentModalComponent = class _EditPaymentModalComponent {
  data;
  dialogRef;
  fb;
  paymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(data, dialogRef, fb, paymentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.paymentService = paymentService;
    this.interceptorService = interceptorService;
    const isPaid = this.data.payment.status === "pagado";
    this.form = this.fb.group({
      amount_paid: [this.data.payment.amount_paid || this.data.payment.amount, [Validators.required, Validators.min(0.01)]],
      due_date: [this.data.payment.due_date, Validators.required],
      paid_date: [this.data.payment.paid_date || "", isPaid ? Validators.required : []],
      payment_method: [this.data.payment.payment_method || "", isPaid ? Validators.required : []],
      reference_number: [this.data.payment.reference_number || ""],
      notes: [this.data.payment.notes || ""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
  }
  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos requeridos"
      });
      return;
    }
    this.saving.set(true);
    this.paymentService.updatePayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago actualizado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al actualizar el pago"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function EditPaymentModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EditPaymentModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditPaymentModalComponent, selectors: [["app-edit-payment-modal"]], features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 33, vars: 17, consts: [[1, "dialog-container"], [1, "dialog-header"], [1, "dialog-title"], [1, "close-button", 3, "click"], [3, "img", "size"], [1, "dialog-content", 3, "formGroup"], [1, "mb-3", "p-2", "bg-blue-50", "rounded-lg", "border", "border-blue-200"], [1, "text-sm", "text-blue-900"], [1, "font-semibold"], [1, "space-y-4"], ["label", "Monto Pagado", "type", "number", 3, "form_control"], ["label", "Fecha de Vencimiento", "type", "date", 3, "form_control"], ["type", "date", 3, "label", "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [3, "config"], ["label", "N\xFAmero de Referencia", "type", "text", "placeholder", "Ej: REF123456", 3, "form_control"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas adicionales sobre el pago...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "dialog-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Guardar Cambios", "custom_class", "btn_primary", 3, "clicked", "loading"]], template: function EditPaymentModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function EditPaymentModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "p", 7)(9, "span", 8);
      \u0275\u0275text(10, "Estado:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 7)(13, "span", 8);
      \u0275\u0275text(14, "Vencimiento Original:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15);
      \u0275\u0275pipe(16, "localDate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9);
      \u0275\u0275element(18, "app-input", 10)(19, "app-input", 11)(20, "app-input", 12);
      \u0275\u0275elementStart(21, "div")(22, "label", 13);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "app-select", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "app-input", 15);
      \u0275\u0275elementStart(26, "div")(27, "label", 13);
      \u0275\u0275text(28, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "textarea", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 17)(31, "app-button", 18);
      \u0275\u0275listener("clicked", function EditPaymentModalComponent_Template_app_button_clicked_31_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "app-button", 19);
      \u0275\u0275listener("clicked", function EditPaymentModalComponent_Template_app_button_clicked_32_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Editar Pago #", ctx.data.payment.payment_number);
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.data.payment.status, " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(16, 14, ctx.data.payment.due_date, "mediumDate"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275property("form_control", ctx.form.controls["amount_paid"]);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["due_date"]);
      \u0275\u0275advance();
      \u0275\u0275property("label", "Fecha de Pago" + (ctx.data.payment.status === "pagado" ? " *" : ""))("form_control", ctx.form.controls["paid_date"]);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" M\xE9todo de Pago ", ctx.data.payment.status === "pagado" ? "*" : "", " ");
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.paymentMethodSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.controls["reference_number"]);
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    LocalDatePipe
  ], styles: ["\n\n.dialog-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 500px;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=edit-payment-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditPaymentModalComponent, [{
    type: Component,
    args: [{ selector: "app-edit-payment-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule,
      LocalDatePipe
    ], providers: [DatePipe], template: `<div class="dialog-container">\r
  <div class="dialog-header">\r
    <h2 class="dialog-title">Editar Pago #{{ data.payment.payment_number }}</h2>\r
    <button (click)="close()" class="close-button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <div class="dialog-content" [formGroup]="form">\r
    <div class="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">\r
      <p class="text-sm text-blue-900">\r
        <span class="font-semibold">Estado:</span> {{ data.payment.status }}\r
      </p>\r
      <p class="text-sm text-blue-900">\r
        <span class="font-semibold">Vencimiento Original:</span> {{ data.payment.due_date | localDate:'mediumDate' }}\r
      </p>\r
    </div>\r
\r
    <div class="space-y-4">\r
      <app-input\r
        label="Monto Pagado"\r
        type="number"\r
        [form_control]="form.controls['amount_paid']">\r
      </app-input>\r
\r
      <app-input\r
        label="Fecha de Vencimiento"\r
        type="date"\r
        [form_control]="form.controls['due_date']">\r
      </app-input>\r
\r
      <!-- Payment Date -->\r
      <app-input\r
        [label]="'Fecha de Pago' + (data.payment.status === 'pagado' ? ' *' : '')"\r
        type="date"\r
        [form_control]="form.controls['paid_date']">\r
      </app-input>\r
\r
      <!-- Payment Method -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">\r
          M\xE9todo de Pago {{ data.payment.status === 'pagado' ? '*' : '' }}\r
        </label>\r
        <app-select [config]="paymentMethodSelectConfig"></app-select>\r
      </div>\r
\r
      <!-- Reference Number -->\r
      <app-input\r
        label="N\xFAmero de Referencia"\r
        type="text"\r
        placeholder="Ej: REF123456"\r
        [form_control]="form.controls['reference_number']">\r
      </app-input>\r
\r
      <!-- Notes -->\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas adicionales sobre el pago..."></textarea>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="dialog-footer">\r
    <app-button\r
      text="Cancelar"\r
      custom_class="btn_secondary"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      text="Guardar Cambios"\r
      custom_class="btn_primary"\r
      [loading]="saving()"\r
      (clicked)="save()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/edit-payment-modal/edit-payment-modal.component.scss */\n.dialog-container {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 500px;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=edit-payment-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: PaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditPaymentModalComponent, { className: "EditPaymentModalComponent", filePath: "src/app/features/contracts/components/edit-payment-modal/edit-payment-modal.component.ts", lineNumber: 31 });
})();

// src/app/features/contracts/components/send-payment-email-modal/send-payment-email-modal.component.ts
function SendPaymentEmailModalComponent_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const template_r1 = ctx.$implicit;
    \u0275\u0275property("value", template_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", template_r1.name, " ");
  }
}
function SendPaymentEmailModalComponent_p_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " No hay templates activos disponibles. ");
    \u0275\u0275elementEnd();
  }
}
function SendPaymentEmailModalComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "p", 24);
    \u0275\u0275text(2, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedTemplate.subject);
  }
}
var SendPaymentEmailModalComponent = class _SendPaymentEmailModalComponent {
  fb;
  emailTemplateService;
  interceptorService;
  dialogRef;
  data;
  form;
  templates = [];
  loadingTemplates = false;
  sending = false;
  constructor(fb, emailTemplateService, interceptorService, dialogRef, data) {
    this.fb = fb;
    this.emailTemplateService = emailTemplateService;
    this.interceptorService = interceptorService;
    this.dialogRef = dialogRef;
    this.data = data;
    this.form = this.fb.group({
      templateId: ["", Validators.required],
      toEmail: ["", Validators.email],
      cc: [""],
      bcc: [""]
    });
  }
  ngOnInit() {
    this.loadTemplates();
  }
  loadTemplates() {
    this.loadingTemplates = true;
    this.emailTemplateService.getEmailTemplates({ isActive: true }).subscribe({
      next: (res) => {
        this.templates = res?.data ?? [];
        this.loadingTemplates = false;
      },
      error: (err) => {
        this.loadingTemplates = false;
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudieron cargar los templates activos"
        });
      }
    });
  }
  send() {
    if (this.sending) {
      return;
    }
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "error",
        title: "Error",
        message: "Selecciona un template v\xE1lido"
      });
      return;
    }
    const formValue = this.form.value;
    this.sending = true;
    this.emailTemplateService.sendEmailTemplate(formValue.templateId, __spreadValues(__spreadValues(__spreadValues({
      context: {
        entity: "payment",
        id: this.data.payment.id
      }
    }, formValue.toEmail?.trim() && { toEmail: formValue.toEmail.trim() }), this.buildEmailArrayPayload("cc", formValue.cc)), this.buildEmailArrayPayload("bcc", formValue.bcc))).pipe(finalize(() => {
      this.sending = false;
    })).subscribe({
      next: (response) => {
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: `Correo enviado a ${response.toEmail}`
        });
        this.dialogRef.close(response);
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo enviar el correo"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  get selectedTemplate() {
    const templateId = this.form.get("templateId")?.value;
    return this.templates.find((template) => template.id === templateId);
  }
  buildEmailArrayPayload(key, rawValue) {
    const emails = this.parseEmailList(rawValue);
    return emails.length ? { [key]: emails } : {};
  }
  parseEmailList(rawValue) {
    return (rawValue || "").split(",").map((email) => email.trim()).filter(Boolean);
  }
  static \u0275fac = function SendPaymentEmailModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SendPaymentEmailModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(EmailTemplateService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SendPaymentEmailModalComponent, selectors: [["app-send-payment-email-modal"]], decls: 40, vars: 12, consts: [[1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-button", 3, "click"], [1, "text-2xl"], [1, "modal-body"], [1, "space-y-4", 3, "formGroup"], [1, "bg-blue-50", "p-3", "rounded", "border", "border-blue-200"], [1, "text-xs", "text-blue-700"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["formControlName", "templateId", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "text-xs text-red-500 mt-1", 4, "ngIf"], ["class", "bg-gray-50 p-3 rounded border border-gray-200", 4, "ngIf"], ["type", "email", "formControlName", "toEmail", "placeholder", "cliente@email.com", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], [1, "text-xs", "text-gray-500", "mt-1"], ["type", "text", "formControlName", "cc", "placeholder", "admin@empresa.com, gerente@empresa.com", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], ["type", "text", "formControlName", "bcc", "placeholder", "auditoria@empresa.com", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-indigo-500"], [1, "modal-footer"], ["type", "button", 1, "px-4", "py-2", "text-gray-700", "bg-gray-100", "hover:bg-gray-200", "rounded-md", "transition-colors", 3, "click"], ["type", "button", 1, "px-4", "py-2", "bg-indigo-600", "text-white", "hover:bg-indigo-700", "rounded-md", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], [3, "value"], [1, "text-xs", "text-red-500", "mt-1"], [1, "bg-gray-50", "p-3", "rounded", "border", "border-gray-200"], [1, "text-xs", "font-medium", "text-gray-600", "mb-1"], [1, "text-sm", "text-gray-900"]], template: function SendPaymentEmailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
      \u0275\u0275text(3, "Enviar Recordatorio de Pago");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 2);
      \u0275\u0275listener("click", function SendPaymentEmailModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6, "\xD7");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 4)(8, "form", 5)(9, "div", 6)(10, "p", 7);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div")(13, "label", 8);
      \u0275\u0275text(14, "Template");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "select", 9)(16, "option", 10);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275template(18, SendPaymentEmailModalComponent_option_18_Template, 2, 2, "option", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275template(19, SendPaymentEmailModalComponent_p_19_Template, 2, 0, "p", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275template(20, SendPaymentEmailModalComponent_div_20_Template, 5, 1, "div", 13);
      \u0275\u0275elementStart(21, "div")(22, "label", 8);
      \u0275\u0275text(23, "Enviar A (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "input", 14);
      \u0275\u0275elementStart(25, "p", 15);
      \u0275\u0275text(26, "D\xE9jalo vac\xEDo para enviar al email del cliente del contrato.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div")(28, "label", 8);
      \u0275\u0275text(29, "CC (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "label", 8);
      \u0275\u0275text(33, "BCC (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "input", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 18)(36, "button", 19);
      \u0275\u0275listener("click", function SendPaymentEmailModalComponent_Template_button_click_36_listener() {
        return ctx.close();
      });
      \u0275\u0275text(37, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "button", 20);
      \u0275\u0275listener("click", function SendPaymentEmailModalComponent_Template_button_click_38_listener() {
        return ctx.send();
      });
      \u0275\u0275text(39);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_7_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" El correo se enviar\xE1 usando los datos reales del pago #", ctx.data.payment.payment_number, ". Si no capturas destinatario, se usar\xE1 el email del cliente. ");
      \u0275\u0275advance(4);
      \u0275\u0275classProp("border-red-500", ((tmp_2_0 = ctx.form.get("templateId")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("templateId")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.loadingTemplates ? "Cargando templates..." : "Selecciona un template activo");
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.templates);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loadingTemplates && ctx.templates.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedTemplate);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("border-red-500", ((tmp_7_0 = ctx.form.get("toEmail")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("toEmail")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(14);
      \u0275\u0275property("disabled", ctx.sending || ctx.loadingTemplates || ctx.form.invalid || ctx.templates.length === 0);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.sending ? "Enviando..." : "Enviar", " ");
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {\n  color: #111827;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=send-payment-email-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SendPaymentEmailModalComponent, [{
    type: Component,
    args: [{ selector: "app-send-payment-email-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <h2>Enviar Recordatorio de Pago</h2>\r
    <button (click)="close()" class="close-button" type="button">\r
      <span class="text-2xl">&times;</span>\r
    </button>\r
  </div>\r
\r
  <div class="modal-body">\r
    <form [formGroup]="form" class="space-y-4">\r
      <div class="bg-blue-50 p-3 rounded border border-blue-200">\r
        <p class="text-xs text-blue-700">\r
          El correo se enviar\xE1 usando los datos reales del pago #{{ data.payment.payment_number }}. Si no capturas destinatario, se usar\xE1 el email del cliente.\r
        </p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Template</label>\r
        <select\r
          formControlName="templateId"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"\r
          [class.border-red-500]="form.get('templateId')?.invalid && form.get('templateId')?.touched">\r
          <option value="">{{ loadingTemplates ? 'Cargando templates...' : 'Selecciona un template activo' }}</option>\r
          <option *ngFor="let template of templates" [value]="template.id">\r
            {{ template.name }}\r
          </option>\r
        </select>\r
        <p *ngIf="!loadingTemplates && templates.length === 0" class="text-xs text-red-500 mt-1">\r
          No hay templates activos disponibles.\r
        </p>\r
      </div>\r
\r
      <div *ngIf="selectedTemplate" class="bg-gray-50 p-3 rounded border border-gray-200">\r
        <p class="text-xs font-medium text-gray-600 mb-1">Asunto</p>\r
        <p class="text-sm text-gray-900">{{ selectedTemplate.subject }}</p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Enviar A (Opcional)</label>\r
        <input\r
          type="email"\r
          formControlName="toEmail"\r
          placeholder="cliente@email.com"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"\r
          [class.border-red-500]="form.get('toEmail')?.invalid && form.get('toEmail')?.touched">\r
        <p class="text-xs text-gray-500 mt-1">D\xE9jalo vac\xEDo para enviar al email del cliente del contrato.</p>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">CC (Opcional)</label>\r
        <input\r
          type="text"\r
          formControlName="cc"\r
          placeholder="admin@empresa.com, gerente@empresa.com"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">BCC (Opcional)</label>\r
        <input\r
          type="text"\r
          formControlName="bcc"\r
          placeholder="auditoria@empresa.com"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="modal-footer">\r
    <button\r
      (click)="close()"\r
      type="button"\r
      class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">\r
      Cancelar\r
    </button>\r
    <button\r
      (click)="send()"\r
      [disabled]="sending || loadingTemplates || form.invalid || templates.length === 0"\r
      type="button"\r
      class="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">\r
      {{ sending ? 'Enviando...' : 'Enviar' }}\r
    </button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/send-payment-email-modal/send-payment-email-modal.component.scss */\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n}\n.modal-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n  flex-shrink: 0;\n}\n.modal-header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #111827;\n}\n.modal-header .close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.2s;\n}\n.modal-header .close-button:hover {\n  color: #111827;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n  flex-shrink: 0;\n  background-color: #f9fafb;\n}\n/*# sourceMappingURL=send-payment-email-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: EmailTemplateService }, { type: InterceptorService }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SendPaymentEmailModalComponent, { className: "SendPaymentEmailModalComponent", filePath: "src/app/features/contracts/components/send-payment-email-modal/send-payment-email-modal.component.ts", lineNumber: 18 });
})();

// src/app/features/contracts/services/downpayment-payment.service.ts
var DownpaymentPaymentService = class _DownpaymentPaymentService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  createManualPayment(contractId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/downpayment-payments`, data);
  }
  generate(contractId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/generate`, data);
  }
  getPayments(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/downpayment-payments`);
  }
  getStats(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/stats`);
  }
  registerPayment(contractId, paymentId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}/pay`, data);
  }
  updatePayment(contractId, paymentId, data) {
    return this.http.put(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}`, data);
  }
  cancelPayment(contractId, paymentId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}/cancel`, {});
  }
  resetPayment(contractId, paymentId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}/reset`, {});
  }
  deletePayment(contractId, paymentId) {
    return this.http.delete(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/${paymentId}`);
  }
  markOverdue(contractId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/downpayment-payments/mark-overdue`, {});
  }
  static \u0275fac = function DownpaymentPaymentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DownpaymentPaymentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DownpaymentPaymentService, factory: _DownpaymentPaymentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DownpaymentPaymentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/contracts/components/contract-payments/contract-payments.component.ts
function ContractPaymentsComponent_app_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 9);
    \u0275\u0275listener("clicked", function ContractPaymentsComponent_app_button_3_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generatePayments());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", ctx_r1.Plus)("loading", ctx_r1.generating());
  }
}
function ContractPaymentsComponent_div_4_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "p", 51);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 52);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("+ Parcial: ", \u0275\u0275pipeBind2(3, 2, ctx_r1.stats().paid_amount_partial, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Total: ", \u0275\u0275pipeBind2(6, 5, ctx_r1.stats().total_paid_from_payments || 0, ctx_r1.currency));
  }
}
function ContractPaymentsComponent_div_4_div_43_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1, "!");
    \u0275\u0275elementEnd();
  }
}
function ContractPaymentsComponent_div_4_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 53)(2, "p", 54);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ContractPaymentsComponent_div_4_div_43_span_4_Template, 2, 0, "span", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 51);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 56);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Pago #", ctx_r1.stats().partial_payment.installment_number);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_payment.is_overdue);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Abonado: ", \u0275\u0275pipeBind2(7, 4, ctx_r1.stats().partial_payment.amount_paid || 0, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Faltante: ", \u0275\u0275pipeBind2(10, 7, ctx_r1.stats().partial_payment.remaining_amount, ctx_r1.currency));
  }
}
function ContractPaymentsComponent_div_4_div_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.stats().partial_overdue_count, " vencidos");
  }
}
function ContractPaymentsComponent_div_4_p_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 60);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" + 1 pago con saldo de ", \u0275\u0275pipeBind2(2, 1, ctx_r1.stats().partial_payment.remaining_amount, ctx_r1.currency), " ");
  }
}
function ContractPaymentsComponent_div_4_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.stats().pending_overdue_count, " vencidos");
  }
}
function ContractPaymentsComponent_div_4_div_77_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.stats().pending_overdue_count, " pendientes");
  }
}
function ContractPaymentsComponent_div_4_div_77_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.stats().partial_overdue_count, " parciales");
  }
}
function ContractPaymentsComponent_div_4_div_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275template(1, ContractPaymentsComponent_div_4_div_77_p_1_Template, 2, 1, "p", 62)(2, ContractPaymentsComponent_div_4_div_77_p_2_Template, 2, 1, "p", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().pending_overdue_count > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_overdue_count > 0);
  }
}
function ContractPaymentsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11)(2, "div", 12)(3, "p", 13);
    \u0275\u0275text(4, "Total Pagos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 14)(6, "span", 15);
    \u0275\u0275text(7, "#");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "p", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 17);
    \u0275\u0275text(11, "meses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 18);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 19)(16, "div", 12)(17, "p", 20);
    \u0275\u0275text(18, "Pagados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 21)(20, "span", 22);
    \u0275\u0275text(21, "\u2713");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "p", 23);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 24);
    \u0275\u0275text(25, "completos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 25)(27, "p", 26);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 20);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, ContractPaymentsComponent_div_4_div_33_Template, 7, 8, "div", 27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 28)(35, "div", 12)(36, "p", 29);
    \u0275\u0275text(37, "Parciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 30)(39, "span", 31);
    \u0275\u0275text(40, "\u25D0");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(41, "p", 32);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275template(43, ContractPaymentsComponent_div_4_div_43_Template, 11, 10, "div", 33)(44, ContractPaymentsComponent_div_4_div_44_Template, 3, 1, "div", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 35)(46, "div", 12)(47, "p", 36);
    \u0275\u0275text(48, "Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 37)(50, "span", 38);
    \u0275\u0275text(51, "\u23F3");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "p", 39);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "p", 40);
    \u0275\u0275text(55, "meses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "div", 41);
    \u0275\u0275template(57, ContractPaymentsComponent_div_4_p_57_Template, 3, 4, "p", 42);
    \u0275\u0275elementStart(58, "p", 36);
    \u0275\u0275text(59);
    \u0275\u0275pipe(60, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(61, ContractPaymentsComponent_div_4_div_61_Template, 3, 1, "div", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "div", 43)(63, "div", 12)(64, "p", 44);
    \u0275\u0275text(65, "Vencidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 45)(67, "span", 46);
    \u0275\u0275text(68, "!");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(69, "p", 47);
    \u0275\u0275text(70);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "p", 48);
    \u0275\u0275text(72, "meses");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 41)(74, "p", 44);
    \u0275\u0275text(75);
    \u0275\u0275pipe(76, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(77, ContractPaymentsComponent_div_4_div_77_Template, 3, 2, "div", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.stats().total_payments);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 17, ctx_r1.stats().financed_amount || 0, ctx_r1.currency));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.stats().paid_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", ctx_r1.stats().paid_count, " \xD7 ", \u0275\u0275pipeBind2(29, 20, ctx_r1.stats().paid_amount_complete / ctx_r1.stats().paid_count, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(32, 23, ctx_r1.stats().paid_amount_complete || 0, ctx_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.stats().paid_amount_partial > 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate((ctx_r1.stats().partial_count || 0) + (ctx_r1.stats().partial_overdue_count || 0));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_payment);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_overdue_count > 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate((ctx_r1.stats().pending_count || 0) + (ctx_r1.stats().pending_overdue_count || 0));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_payment);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(60, 26, ctx_r1.stats().total_pending || 0, ctx_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.stats().pending_overdue_count > 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.stats().overdue_count || 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(76, 29, ctx_r1.overdueAmount, ctx_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", (ctx_r1.stats().partial_overdue_count || 0) > 0 || (ctx_r1.stats().pending_overdue_count || 0) > 0);
  }
}
function ContractPaymentsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "p", 65);
    \u0275\u0275text(2, "Cargando pagos...");
    \u0275\u0275elementEnd()();
  }
}
function ContractPaymentsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66)(1, "div", 67);
    \u0275\u0275element(2, "lucide-icon", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 69);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 70);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r1.Check)("size", 28);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isContractCompleted ? "Contrato pagado" : ctx_r1.isDownpaymentFinancingBlocking ? "Enganche pendiente" : "Sin pagos generados", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isContractCompleted ? "Este contrato ya esta completado y no requiere generar pagos." : ctx_r1.isDownpaymentFinancingBlocking ? ctx_r1.downpaymentBlockingMessage : "Genera los pagos para empezar a registrar cobros del contrato.", " ");
  }
}
function ContractPaymentsComponent_div_7_tr_25_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "localDate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, payment_r4.paid_date, "mediumDate"));
  }
}
function ContractPaymentsComponent_div_7_tr_25_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "localDate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Primer pago: ", \u0275\u0275pipeBind2(2, 1, payment_r4.first_partial_payment_date, "mediumDate"), " ");
  }
}
function ContractPaymentsComponent_div_7_tr_25_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractPaymentsComponent_div_7_tr_25_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1, "\u26A0\uFE0F");
    \u0275\u0275elementEnd();
  }
}
function ContractPaymentsComponent_div_7_tr_25_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 93);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_7_tr_25_button_30_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const payment_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.registerPayment(payment_r4));
    });
    \u0275\u0275element(1, "lucide-icon", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Registrar Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.DollarSign)("size", 16);
  }
}
function ContractPaymentsComponent_div_7_tr_25_button_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 94);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_7_tr_25_button_31_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const payment_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editPayment(payment_r4));
    });
    \u0275\u0275element(1, "lucide-icon", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Editar Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Edit)("size", 16);
  }
}
function ContractPaymentsComponent_div_7_tr_25_button_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 95);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_7_tr_25_button_32_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const payment_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resetPayment(payment_r4));
    });
    \u0275\u0275element(1, "lucide-icon", 68);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Resetear Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.RotateCcw)("size", 16);
  }
}
function ContractPaymentsComponent_div_7_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 77)(1, "td", 78);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 79);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 80);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 80);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 81);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "localDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 81);
    \u0275\u0275template(16, ContractPaymentsComponent_div_7_tr_25_div_16_Template, 3, 4, "div", 82)(17, ContractPaymentsComponent_div_7_tr_25_div_17_Template, 3, 4, "div", 83)(18, ContractPaymentsComponent_div_7_tr_25_div_18_Template, 2, 0, "div", 82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 84)(20, "div", 85)(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, ContractPaymentsComponent_div_7_tr_25_span_23_Template, 2, 0, "span", 86);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td", 81);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "td", 81);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "td", 84)(29, "div", 87);
    \u0275\u0275template(30, ContractPaymentsComponent_div_7_tr_25_button_30_Template, 2, 3, "button", 88)(31, ContractPaymentsComponent_div_7_tr_25_button_31_Template, 2, 3, "button", 89)(32, ContractPaymentsComponent_div_7_tr_25_button_32_Template, 2, 3, "button", 90);
    \u0275\u0275elementStart(33, "button", 91);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_7_tr_25_Template_button_click_33_listener() {
      const payment_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sendPaymentEmail(payment_r4));
    });
    \u0275\u0275element(34, "lucide-icon", 68);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const payment_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r4.payment_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 28, payment_r4.amount, ctx_r1.currency));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-blue-600", payment_r4.status === "parcial")("font-medium", payment_r4.status === "parcial");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(8, 31, payment_r4.amount_paid, ctx_r1.currency), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-orange-600", payment_r4.status === "parcial")("font-medium", payment_r4.status === "parcial");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 34, payment_r4.amount_pending, ctx_r1.currency), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 37, payment_r4.due_date, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", payment_r4.paid_date);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !payment_r4.paid_date && payment_r4.first_partial_payment_date);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !payment_r4.paid_date && !payment_r4.first_partial_payment_date);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getStatusClass(payment_r4.status, payment_r4.is_overdue));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(payment_r4.status, payment_r4.is_overdue), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", payment_r4.is_overdue);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r4.payment_method || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r4.reference_number || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.canRegisterPayment(payment_r4));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit(payment_r4));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canResetPayment(payment_r4));
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", "Enviar por Correo");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Mail)("size", 16);
  }
}
function ContractPaymentsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "table", 72)(2, "thead", 73)(3, "tr")(4, "th", 74);
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 74);
    \u0275\u0275text(7, "Monto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 74);
    \u0275\u0275text(9, "Pagado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 74);
    \u0275\u0275text(11, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 74);
    \u0275\u0275text(13, "Vencimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 74);
    \u0275\u0275text(15, "Fecha Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 74);
    \u0275\u0275text(17, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 74);
    \u0275\u0275text(19, "M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 74);
    \u0275\u0275text(21, "Referencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 74);
    \u0275\u0275text(23, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "tbody", 75);
    \u0275\u0275template(25, ContractPaymentsComponent_div_7_tr_25_Template, 35, 40, "tr", 76);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(25);
    \u0275\u0275property("ngForOf", ctx_r1.paginatedPayments);
  }
}
function ContractPaymentsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 96)(1, "div", 97);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 53)(4, "button", 98);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPage(ctx_r1.currentPage() - 1));
    });
    \u0275\u0275text(5, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 99);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 98);
    \u0275\u0275listener("click", function ContractPaymentsComponent_div_8_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPage(ctx_r1.currentPage() + 1));
    });
    \u0275\u0275text(9, " Siguiente ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando ", (ctx_r1.currentPage() - 1) * ctx_r1.pageSize + 1, " - ", ctx_r1.Math.min(ctx_r1.currentPage() * ctx_r1.pageSize, ctx_r1.payments().length), " de ", ctx_r1.payments().length, " pagos ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.currentPage() === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" P\xE1gina ", ctx_r1.currentPage(), " / ", ctx_r1.totalPages, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() === ctx_r1.totalPages);
  }
}
var ContractPaymentsComponent = class _ContractPaymentsComponent {
  paymentService;
  downpaymentService;
  interceptorService;
  dialog;
  contractId;
  currency = "USD";
  contractStatus = null;
  contract = null;
  dataChanged = new EventEmitter();
  payments = signal([], ...ngDevMode ? [{ debugName: "payments" }] : []);
  stats = signal(null, ...ngDevMode ? [{ debugName: "stats" }] : []);
  downpaymentStats = signal(null, ...ngDevMode ? [{ debugName: "downpaymentStats" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  generating = signal(false, ...ngDevMode ? [{ debugName: "generating" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = 20;
  Plus = Plus;
  Edit = SquarePen;
  Trash2 = Trash2;
  X = X;
  DollarSign = DollarSign;
  RotateCcw = RotateCcw;
  Mail = Mail;
  Math = Math;
  Check = Check;
  constructor(paymentService, downpaymentService, interceptorService, dialog) {
    this.paymentService = paymentService;
    this.downpaymentService = downpaymentService;
    this.interceptorService = interceptorService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadPayments();
    this.loadStats();
    this.refreshDownpaymentStats();
  }
  ngOnChanges(changes) {
    if (changes["contract"] && !changes["contract"].firstChange) {
      this.refreshDownpaymentStats();
    }
  }
  refreshDownpaymentStats() {
    if (this.contract?.down_payment_financed) {
      this.loadDownpaymentStats();
    } else {
      this.downpaymentStats.set(null);
    }
  }
  loadPayments() {
    this.loading.set(true);
    this.paymentService.getPayments(this.contractId).subscribe({
      next: (payments) => {
        this.payments.set(payments);
        this.autoSelectProgressPage(payments);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los pagos"
        });
      }
    });
  }
  loadStats() {
    this.paymentService.getPaymentStats(this.contractId).subscribe({
      next: (stats) => {
        this.stats.set(stats);
      },
      error: () => {
      }
    });
  }
  loadDownpaymentStats() {
    this.downpaymentService.getStats(this.contractId).subscribe({
      next: (stats) => this.downpaymentStats.set(stats),
      error: () => {
      }
    });
  }
  generatePayments() {
    if (!confirm("\xBFGenerar todos los pagos del contrato? Esta acci\xF3n solo se puede realizar una vez."))
      return;
    this.generating.set(true);
    this.paymentService.generatePayments(this.contractId).subscribe({
      next: () => {
        this.generating.set(false);
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pagos generados correctamente"
        });
      },
      error: (err) => {
        this.generating.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al generar pagos"
        });
      }
    });
  }
  editPayment(payment) {
    const dialogRef = this.dialog.open(EditPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("\u270F\uFE0F Payment edited, emitting dataChanged event");
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
  cancelPayment(payment) {
    if (!confirm(`\xBFCancelar el pago #${payment.payment_number}?`))
      return;
    this.paymentService.cancelPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago cancelado"
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo cancelar el pago"
        });
      }
    });
  }
  deletePayment(payment) {
    if (!confirm(`\xBFEliminar permanentemente el pago #${payment.payment_number}? Esta acci\xF3n no se puede deshacer.`))
      return;
    this.paymentService.deletePayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago eliminado"
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo eliminar el pago"
        });
      }
    });
  }
  getStatusClass(status, isOverdue = false) {
    let baseClass = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ";
    if (isOverdue && (status === "pendiente" || status === "parcial")) {
      return baseClass + "bg-red-500 text-white shadow-sm";
    }
    const statusMap = {
      "pendiente": "bg-amber-500 text-white shadow-sm",
      "pagado": "bg-emerald-500 text-white shadow-sm",
      "parcial": "bg-blue-500 text-white shadow-sm",
      "cancelado": "bg-gray-500 text-white shadow-sm"
    };
    return baseClass + (statusMap[status] || "bg-gray-500 text-white shadow-sm");
  }
  getStatusLabel(status, isOverdue = false) {
    if (status === "parcial" && isOverdue) {
      return "Parcial Vencido";
    } else if (status === "pendiente" && isOverdue) {
      return "Pendiente Vencido";
    } else if (status === "parcial") {
      return "Parcial";
    } else if (status === "pendiente") {
      return "Pendiente";
    } else if (status === "pagado") {
      return "Pagado";
    } else if (status === "cancelado") {
      return "Cancelado";
    } else {
      return status;
    }
  }
  canEdit(payment) {
    return payment.status === "pendiente" || payment.status === "pagado" || payment.status === "parcial";
  }
  canDelete(payment) {
    return payment.status !== "pagado";
  }
  canCancel(payment) {
    return payment.status === "pendiente";
  }
  canRegisterPayment(payment) {
    return payment.status === "pendiente" || payment.status === "parcial";
  }
  canResetPayment(payment) {
    return payment.status === "pagado" || payment.status === "parcial";
  }
  resetPayment(payment) {
    if (!confirm(`\xBFResetear el pago #${payment.payment_number}? Esto volver\xE1 el pago a estado pendiente y eliminar\xE1 toda la informaci\xF3n de pago.`))
      return;
    this.paymentService.resetPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago reseteado correctamente"
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo resetear el pago"
        });
      }
    });
  }
  sendPaymentEmail(payment) {
    const dialogRef = this.dialog.open(SendPaymentEmailModalComponent, {
      width: "640px",
      disableClose: false,
      data: { payment }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Payment email sent:", result);
      }
    });
  }
  get isContractCompleted() {
    const status = (this.contractStatus || "").toLowerCase().trim();
    return status === "completado" || status === "completed";
  }
  get isDownpaymentFinancingBlocking() {
    if (!this.contract?.down_payment_financed)
      return false;
    const stats = this.downpaymentStats();
    if (!stats)
      return true;
    return !stats.downpayment_financing_complete;
  }
  get downpaymentBlockingMessage() {
    const stats = this.downpaymentStats();
    if (!stats?.down_payment_target_defined) {
      return "Define y liquida el enganche financiado antes de generar los pagos del contrato.";
    }
    return "Completa todos los pagos de enganche antes de generar los pagos del contrato.";
  }
  /** Monto pendiente solo de pagos vencidos (no todo total_pending). */
  get overdueAmount() {
    const stats = this.stats();
    if (!stats)
      return 0;
    if (stats.overdue_amount != null && stats.overdue_amount >= 0) {
      return stats.overdue_amount;
    }
    return this.payments().filter((p) => p.is_overdue && (p.status === "pendiente" || p.status === "parcial")).reduce((sum, p) => sum + (p.amount_pending || 0), 0);
  }
  get showGeneratePaymentsButton() {
    return this.payments().length === 0 && !this.isContractCompleted && !this.isDownpaymentFinancingBlocking;
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.payments().length / this.pageSize));
  }
  get paginatedPayments() {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.payments().slice(start, start + this.pageSize);
  }
  setPage(page) {
    if (page < 1 || page > this.totalPages)
      return;
    this.currentPage.set(page);
  }
  autoSelectProgressPage(payments) {
    if (!payments.length) {
      this.currentPage.set(1);
      return;
    }
    let lastPaidIndex = -1;
    for (let i = payments.length - 1; i >= 0; i--) {
      const payment = payments[i];
      const hasAnyPayment = (payment.amount_paid || 0) > 0 || payment.status === "pagado" || payment.status === "parcial";
      if (hasAnyPayment) {
        lastPaidIndex = i;
        break;
      }
    }
    const targetIndex = lastPaidIndex >= 0 ? lastPaidIndex : 0;
    const targetPage = Math.floor(targetIndex / this.pageSize) + 1;
    this.currentPage.set(targetPage);
  }
  registerPayment(payment) {
    const dialogRef = this.dialog.open(PartialPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("\u{1F4B0} Payment registered, emitting dataChanged event");
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
  static \u0275fac = function ContractPaymentsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractPaymentsComponent)(\u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(DownpaymentPaymentService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractPaymentsComponent, selectors: [["app-contract-payments"]], inputs: { contractId: "contractId", currency: "currency", contractStatus: "contractStatus", contract: "contract" }, outputs: { dataChanged: "dataChanged" }, features: [\u0275\u0275ProvidersFeature([DatePipe]), \u0275\u0275NgOnChangesFeature], decls: 9, vars: 6, consts: [[1, "payments-container"], [1, "flex", "items-center", "justify-end", "mb-1"], [1, "flex", "gap-2"], ["text", "Generar Pagos", "custom_class", "btn_primary", "size", "sm", 3, "icon", "loading", "clicked", 4, "ngIf"], ["class", "grid grid-cols-5 gap-4 mb-6 w-full", 4, "ngIf"], ["class", "text-center py-8", 4, "ngIf"], ["class", "payments-empty-state", 4, "ngIf"], ["class", "overflow-x-auto", 4, "ngIf"], ["class", "payments-pagination", 4, "ngIf"], ["text", "Generar Pagos", "custom_class", "btn_primary", "size", "sm", 3, "clicked", "icon", "loading"], [1, "grid", "grid-cols-5", "gap-4", "mb-6", "w-full"], [1, "bg-gray-50", "p-4", "rounded-lg", "border", "border-gray-200"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-sm", "font-medium", "text-gray-600"], [1, "w-6", "h-6", "bg-gray-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-gray-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-gray-900", "mb-1"], [1, "text-xs", "text-gray-500", "mb-2"], [1, "text-sm", "font-medium", "text-gray-700"], [1, "bg-green-50", "p-4", "rounded-lg", "border", "border-green-200"], [1, "text-sm", "font-medium", "text-green-700"], [1, "w-6", "h-6", "bg-green-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-green-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-green-800", "mb-1"], [1, "text-xs", "text-green-600", "mb-2"], [1, "mt-3", "space-y-1"], [1, "text-xs", "text-green-600"], ["class", "pt-1 border-t border-green-200", 4, "ngIf"], [1, "bg-blue-50", "p-4", "rounded-lg", "border", "border-blue-200"], [1, "text-sm", "font-medium", "text-blue-700"], [1, "w-6", "h-6", "bg-blue-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-blue-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-blue-800", "mb-1"], ["class", "mt-3 space-y-1", 4, "ngIf"], ["class", "mt-2", 4, "ngIf"], [1, "bg-yellow-50", "p-4", "rounded-lg", "border", "border-yellow-200"], [1, "text-sm", "font-medium", "text-yellow-700"], [1, "w-6", "h-6", "bg-yellow-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-yellow-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-yellow-800", "mb-1"], [1, "text-xs", "text-yellow-600", "mb-2"], [1, "space-y-1"], ["class", "text-xs text-orange-600", 4, "ngIf"], [1, "bg-red-50", "p-4", "rounded-lg", "border", "border-red-200"], [1, "text-sm", "font-medium", "text-red-700"], [1, "w-6", "h-6", "bg-red-100", "rounded", "flex", "items-center", "justify-center"], [1, "text-red-600", "text-xs", "font-bold"], [1, "text-2xl", "font-bold", "text-red-800", "mb-1"], [1, "text-xs", "text-red-600", "mb-2"], ["class", "pt-1 border-t border-red-200 space-y-1", 4, "ngIf"], [1, "pt-1", "border-t", "border-green-200"], [1, "text-xs", "text-blue-600"], [1, "text-sm", "font-bold", "text-green-800", "mt-1"], [1, "flex", "items-center", "gap-1"], [1, "text-xs", "font-medium", "text-blue-700"], ["class", "text-red-500 text-xs", 4, "ngIf"], [1, "text-xs", "font-medium", "text-orange-600"], [1, "text-red-500", "text-xs"], [1, "mt-2"], [1, "inline-block", "px-2", "py-1", "bg-red-100", "rounded", "text-xs", "font-medium", "text-red-600"], [1, "text-xs", "text-orange-600"], [1, "pt-1", "border-t", "border-red-200", "space-y-1"], ["class", "text-xs text-red-600", 4, "ngIf"], [1, "text-xs", "text-red-600"], [1, "text-center", "py-8"], [1, "text-sm", "text-gray-500"], [1, "payments-empty-state"], [1, "payments-empty-state__icon"], [3, "img", "size"], [1, "payments-empty-state__title"], [1, "payments-empty-state__subtitle"], [1, "overflow-x-auto"], [1, "min-w-full", "divide-y", "divide-gray-200"], [1, "bg-gray-50"], [1, "px-3", "py-2", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase"], [1, "bg-white", "divide-y", "divide-gray-200"], ["class", "hover:bg-gray-50", 4, "ngFor", "ngForOf"], [1, "hover:bg-gray-50"], [1, "px-3", "py-2", "text-sm", "font-medium", "text-gray-900"], [1, "px-3", "py-2", "text-sm", "text-gray-900"], [1, "px-3", "py-2", "text-sm"], [1, "px-3", "py-2", "text-sm", "text-gray-600"], [4, "ngIf"], ["class", "text-xs text-blue-600", 4, "ngIf"], [1, "px-3", "py-2"], [1, "flex", "items-center", "gap-2"], ["class", "text-red-500 text-xs", "title", "Vencido", 4, "ngIf"], [1, "flex", "gap-1.5"], ["class", "p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md", "matTooltipPosition", "above", 3, "matTooltip", "click", 4, "ngIf"], ["class", "p-1.5 text-gray-600 hover:text-white hover:bg-gray-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md", "matTooltipPosition", "above", 3, "matTooltip", "click", 4, "ngIf"], ["class", "p-1.5 text-purple-600 hover:text-white hover:bg-purple-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md", "matTooltipPosition", "above", 3, "matTooltip", "click", 4, "ngIf"], ["matTooltipPosition", "above", 1, "p-1.5", "text-indigo-600", "hover:text-white", "hover:bg-indigo-600", "rounded-md", "transition-all", "duration-200", "shadow-sm", "hover:shadow-md", 3, "click", "matTooltip"], ["title", "Vencido", 1, "text-red-500", "text-xs"], ["matTooltipPosition", "above", 1, "p-1.5", "text-blue-600", "hover:text-white", "hover:bg-blue-600", "rounded-md", "transition-all", "duration-200", "shadow-sm", "hover:shadow-md", 3, "click", "matTooltip"], ["matTooltipPosition", "above", 1, "p-1.5", "text-gray-600", "hover:text-white", "hover:bg-gray-600", "rounded-md", "transition-all", "duration-200", "shadow-sm", "hover:shadow-md", 3, "click", "matTooltip"], ["matTooltipPosition", "above", 1, "p-1.5", "text-purple-600", "hover:text-white", "hover:bg-purple-600", "rounded-md", "transition-all", "duration-200", "shadow-sm", "hover:shadow-md", 3, "click", "matTooltip"], [1, "payments-pagination"], [1, "text-xs", "text-gray-500"], ["type", "button", 1, "pagination-btn", 3, "click", "disabled"], [1, "pagination-page"]], template: function ContractPaymentsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275template(3, ContractPaymentsComponent_app_button_3_Template, 1, 2, "app-button", 3);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(4, ContractPaymentsComponent_div_4_Template, 78, 32, "div", 4)(5, ContractPaymentsComponent_div_5_Template, 3, 0, "div", 5)(6, ContractPaymentsComponent_div_6_Template, 7, 4, "div", 6)(7, ContractPaymentsComponent_div_7_Template, 26, 1, "div", 7)(8, ContractPaymentsComponent_div_8_Template, 10, 7, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.showGeneratePaymentsButton);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.stats() && ctx.payments().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length > ctx.pageSize);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    ButtonComponent,
    LucideAngularModule,
    LucideAngularComponent,
    MatTooltipModule,
    MatTooltip,
    CurrencyPipe,
    LocalDatePipe
  ], styles: ["\n\ntable[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.payments-empty-state[_ngcontent-%COMP%] {\n  padding: 2rem 1rem;\n  text-align: center;\n  border: 1px dashed #86efac;\n  border-radius: 0.75rem;\n  background: #f0fdf4;\n  color: #166534;\n}\n.payments-empty-state__icon[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  margin: 0 auto 0.75rem;\n  border-radius: 9999px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #dcfce7;\n  color: #15803d;\n}\n.payments-empty-state__title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n}\n.payments-empty-state__subtitle[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  font-size: 0.85rem;\n  color: #166534;\n}\n.payments-pagination[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.pagination-btn[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.7rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #374151;\n  background: #fff;\n  transition: all 0.2s ease;\n}\n.pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #6366f1;\n  color: #4f46e5;\n}\n.pagination-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.pagination-page[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.65rem;\n  border-radius: 0.5rem;\n  background: #eef2ff;\n  color: #4338ca;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=contract-payments.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractPaymentsComponent, [{
    type: Component,
    args: [{ selector: "app-contract-payments", standalone: true, imports: [
      CommonModule,
      ButtonComponent,
      LucideAngularModule,
      LocalDatePipe,
      MatTooltipModule
    ], providers: [DatePipe], template: `<div class="payments-container">\r
  <!-- Header -->\r
  <div class="flex items-center justify-end mb-1">\r
    <div class="flex gap-2">\r
      <app-button\r
        *ngIf="showGeneratePaymentsButton"\r
        text="Generar Pagos"\r
        custom_class="btn_primary"\r
        size="sm"\r
        [icon]="Plus"\r
        [loading]="generating()"\r
        (clicked)="generatePayments()">\r
      </app-button>\r
    </div>\r
  </div>\r
\r
  <!-- Stats Cards -->\r
  <div *ngIf="stats() && payments().length > 0" class="grid grid-cols-5 gap-4 mb-6 w-full">\r
    <!-- Total Pagos -->\r
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-gray-600">Total Pagos</p>\r
        <div class="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">\r
          <span class="text-gray-600 text-xs font-bold">#</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-gray-900 mb-1">{{ stats()!.total_payments }}</p>\r
      <p class="text-xs text-gray-500 mb-2">meses</p>\r
      <p class="text-sm font-medium text-gray-700">{{ (stats()!.financed_amount || 0) | currency:currency }}</p>\r
    </div>\r
\r
    <!-- Pagados -->\r
    <div class="bg-green-50 p-4 rounded-lg border border-green-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-green-700">Pagados</p>\r
        <div class="w-6 h-6 bg-green-100 rounded flex items-center justify-center">\r
          <span class="text-green-600 text-xs font-bold">\u2713</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-green-800 mb-1">{{ stats()!.paid_count }}</p>\r
      <p class="text-xs text-green-600 mb-2">completos</p>\r
      \r
      <div class="mt-3 space-y-1">\r
        <p class="text-xs text-green-600">{{ stats()!.paid_count }} \xD7 {{ (stats()!.paid_amount_complete / stats()!.paid_count) | currency:currency }}</p>\r
        <p class="text-sm font-medium text-green-700">{{ (stats()!.paid_amount_complete || 0) | currency:currency }}</p>\r
        \r
        <div *ngIf="stats()!.paid_amount_partial > 0" class="pt-1 border-t border-green-200">\r
          <p class="text-xs text-blue-600">+ Parcial: {{ stats()!.paid_amount_partial | currency:currency }}</p>\r
          <p class="text-sm font-bold text-green-800 mt-1">Total: {{ (stats()!.total_paid_from_payments || 0) | currency:currency }}</p>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Parciales -->\r
    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-blue-700">Parciales</p>\r
        <div class="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">\r
          <span class="text-blue-600 text-xs font-bold">\u25D0</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-blue-800 mb-1">{{ (stats()!.partial_count || 0) + (stats()!.partial_overdue_count || 0) }}</p>\r
      \r
      <div *ngIf="stats()!.partial_payment" class="mt-3 space-y-1">\r
        <div class="flex items-center gap-1">\r
          <p class="text-xs font-medium text-blue-700">Pago #{{ stats()!.partial_payment!.installment_number }}</p>\r
          <span *ngIf="stats()!.partial_payment!.is_overdue" class="text-red-500 text-xs">!</span>\r
        </div>\r
        <p class="text-xs text-blue-600">Abonado: {{ (stats()!.partial_payment!.amount_paid || 0) | currency:currency }}</p>\r
        <p class="text-xs font-medium text-orange-600">Faltante: {{ stats()!.partial_payment!.remaining_amount | currency:currency }}</p>\r
      </div>\r
      \r
      <div *ngIf="stats()!.partial_overdue_count > 0" class="mt-2">\r
        <span class="inline-block px-2 py-1 bg-red-100 rounded text-xs font-medium text-red-600">{{ stats()!.partial_overdue_count }} vencidos</span>\r
      </div>\r
    </div>\r
\r
    <!-- Pendientes -->\r
    <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-yellow-700">Pendientes</p>\r
        <div class="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">\r
          <span class="text-yellow-600 text-xs font-bold">\u23F3</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-yellow-800 mb-1">{{ (stats()!.pending_count || 0) + (stats()!.pending_overdue_count || 0) }}</p>\r
      <p class="text-xs text-yellow-600 mb-2">meses</p>\r
      \r
      <div class="space-y-1">\r
        <p *ngIf="stats()!.partial_payment" class="text-xs text-orange-600">\r
          + 1 pago con saldo de {{ stats()!.partial_payment!.remaining_amount | currency:currency }}\r
        </p>\r
        <p class="text-sm font-medium text-yellow-700">{{ (stats()!.total_pending || 0) | currency:currency }}</p>\r
      </div>\r
      \r
      <div *ngIf="stats()!.pending_overdue_count > 0" class="mt-2">\r
        <span class="inline-block px-2 py-1 bg-red-100 rounded text-xs font-medium text-red-600">{{ stats()!.pending_overdue_count }} vencidos</span>\r
      </div>\r
    </div>\r
\r
    <!-- Vencidos -->\r
    <div class="bg-red-50 p-4 rounded-lg border border-red-200">\r
      <div class="flex items-center justify-between mb-3">\r
        <p class="text-sm font-medium text-red-700">Vencidos</p>\r
        <div class="w-6 h-6 bg-red-100 rounded flex items-center justify-center">\r
          <span class="text-red-600 text-xs font-bold">!</span>\r
        </div>\r
      </div>\r
      <p class="text-2xl font-bold text-red-800 mb-1">{{ stats()!.overdue_count || 0 }}</p>\r
      <p class="text-xs text-red-600 mb-2">meses</p>\r
      \r
      <div class="space-y-1">\r
        <p class="text-sm font-medium text-red-700">{{ overdueAmount | currency:currency }}</p>\r
        \r
        <div *ngIf="(stats()!.partial_overdue_count || 0) > 0 || (stats()!.pending_overdue_count || 0) > 0" class="pt-1 border-t border-red-200 space-y-1">\r
          <p *ngIf="stats()!.pending_overdue_count > 0" class="text-xs text-red-600">{{ stats()!.pending_overdue_count }} pendientes</p>\r
          <p *ngIf="stats()!.partial_overdue_count > 0" class="text-xs text-red-600">{{ stats()!.partial_overdue_count }} parciales</p>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Loading -->\r
  <div *ngIf="loading()" class="text-center py-8">\r
    <p class="text-sm text-gray-500">Cargando pagos...</p>\r
  </div>\r
\r
  <!-- Empty State -->\r
  <div *ngIf="!loading() && payments().length === 0" class="payments-empty-state">\r
    <div class="payments-empty-state__icon">\r
      <lucide-icon [img]="Check" [size]="28"></lucide-icon>\r
    </div>\r
    <p class="payments-empty-state__title">\r
      {{ isContractCompleted ? 'Contrato pagado' : (isDownpaymentFinancingBlocking ? 'Enganche pendiente' : 'Sin pagos generados') }}\r
    </p>\r
    <p class="payments-empty-state__subtitle">\r
      {{\r
        isContractCompleted\r
          ? 'Este contrato ya esta completado y no requiere generar pagos.'\r
          : (isDownpaymentFinancingBlocking\r
              ? downpaymentBlockingMessage\r
              : 'Genera los pagos para empezar a registrar cobros del contrato.')\r
      }}\r
    </p>\r
  </div>\r
\r
  <!-- Payments Table -->\r
  <div *ngIf="!loading() && payments().length > 0" class="overflow-x-auto">\r
    <table class="min-w-full divide-y divide-gray-200">\r
      <thead class="bg-gray-50">\r
        <tr>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pagado</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pendiente</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha Pago</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">M\xE9todo</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Referencia</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>\r
        </tr>\r
      </thead>\r
      <tbody class="bg-white divide-y divide-gray-200">\r
        <tr *ngFor="let payment of paginatedPayments" class="hover:bg-gray-50">\r
          <td class="px-3 py-2 text-sm font-medium text-gray-900">{{ payment.payment_number }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-900">{{ payment.amount | currency:currency }}</td>\r
          <td class="px-3 py-2 text-sm" [class.text-blue-600]="payment.status === 'parcial'" [class.font-medium]="payment.status === 'parcial'">\r
            {{ payment.amount_paid | currency:currency }}\r
          </td>\r
          <td class="px-3 py-2 text-sm" [class.text-orange-600]="payment.status === 'parcial'" [class.font-medium]="payment.status === 'parcial'">\r
            {{ payment.amount_pending | currency:currency }}\r
          </td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.due_date | localDate:'mediumDate' }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-600">\r
            <div *ngIf="payment.paid_date">{{ payment.paid_date | localDate:'mediumDate' }}</div>\r
            <div *ngIf="!payment.paid_date && payment.first_partial_payment_date" class="text-xs text-blue-600">\r
              Primer pago: {{ payment.first_partial_payment_date | localDate:'mediumDate' }}\r
            </div>\r
            <div *ngIf="!payment.paid_date && !payment.first_partial_payment_date">\u2014</div>\r
          </td>\r
          <td class="px-3 py-2">\r
            <div class="flex items-center gap-2">\r
              <span [class]="getStatusClass(payment.status, payment.is_overdue)">\r
                {{ getStatusLabel(payment.status, payment.is_overdue) }}\r
              </span>\r
              <span *ngIf="payment.is_overdue" class="text-red-500 text-xs" title="Vencido">\u26A0\uFE0F</span>\r
            </div>\r
          </td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.payment_method || '\u2014' }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.reference_number || '\u2014' }}</td>\r
          <td class="px-3 py-2">\r
            <div class="flex gap-1.5">\r
              <button\r
                *ngIf="canRegisterPayment(payment)"\r
                (click)="registerPayment(payment)"\r
                class="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"\r
                [matTooltip]="'Registrar Pago'"\r
                matTooltipPosition="above">\r
                <lucide-icon [img]="DollarSign" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                *ngIf="canEdit(payment)"\r
                (click)="editPayment(payment)"\r
                class="p-1.5 text-gray-600 hover:text-white hover:bg-gray-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"\r
                [matTooltip]="'Editar Pago'"\r
                matTooltipPosition="above">\r
                <lucide-icon [img]="Edit" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                *ngIf="canResetPayment(payment)"\r
                (click)="resetPayment(payment)"\r
                class="p-1.5 text-purple-600 hover:text-white hover:bg-purple-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"\r
                [matTooltip]="'Resetear Pago'"\r
                matTooltipPosition="above">\r
                <lucide-icon [img]="RotateCcw" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                (click)="sendPaymentEmail(payment)"\r
                class="p-1.5 text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"\r
                [matTooltip]="'Enviar por Correo'"\r
                matTooltipPosition="above">\r
                <lucide-icon [img]="Mail" [size]="16"></lucide-icon>\r
              </button>\r
            </div>\r
          </td>\r
        </tr>\r
      </tbody>\r
    </table>\r
  </div>\r
\r
  <div *ngIf="!loading() && payments().length > pageSize" class="payments-pagination">\r
    <div class="text-xs text-gray-500">\r
      Mostrando {{ (currentPage() - 1) * pageSize + 1 }} -\r
      {{ Math.min(currentPage() * pageSize, payments().length) }}\r
      de {{ payments().length }} pagos\r
    </div>\r
\r
    <div class="flex items-center gap-1">\r
      <button\r
        type="button"\r
        class="pagination-btn"\r
        [disabled]="currentPage() === 1"\r
        (click)="setPage(currentPage() - 1)">\r
        Anterior\r
      </button>\r
\r
      <span class="pagination-page">\r
        P\xE1gina {{ currentPage() }} / {{ totalPages }}\r
      </span>\r
\r
      <button\r
        type="button"\r
        class="pagination-btn"\r
        [disabled]="currentPage() === totalPages"\r
        (click)="setPage(currentPage() + 1)">\r
        Siguiente\r
      </button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/contract-payments/contract-payments.component.scss */\ntable {\n  font-size: 0.875rem;\n}\n.payments-empty-state {\n  padding: 2rem 1rem;\n  text-align: center;\n  border: 1px dashed #86efac;\n  border-radius: 0.75rem;\n  background: #f0fdf4;\n  color: #166534;\n}\n.payments-empty-state__icon {\n  width: 3rem;\n  height: 3rem;\n  margin: 0 auto 0.75rem;\n  border-radius: 9999px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #dcfce7;\n  color: #15803d;\n}\n.payments-empty-state__title {\n  font-size: 1rem;\n  font-weight: 700;\n}\n.payments-empty-state__subtitle {\n  margin-top: 0.35rem;\n  font-size: 0.85rem;\n  color: #166534;\n}\n.payments-pagination {\n  margin-top: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.pagination-btn {\n  padding: 0.35rem 0.7rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #374151;\n  background: #fff;\n  transition: all 0.2s ease;\n}\n.pagination-btn:hover:not(:disabled) {\n  border-color: #6366f1;\n  color: #4f46e5;\n}\n.pagination-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.pagination-page {\n  padding: 0.35rem 0.65rem;\n  border-radius: 0.5rem;\n  background: #eef2ff;\n  color: #4338ca;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=contract-payments.component.css.map */\n"] }]
  }], () => [{ type: PaymentService }, { type: DownpaymentPaymentService }, { type: InterceptorService }, { type: MatDialog }], { contractId: [{
    type: Input
  }], currency: [{
    type: Input
  }], contractStatus: [{
    type: Input
  }], contract: [{
    type: Input
  }], dataChanged: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractPaymentsComponent, { className: "ContractPaymentsComponent", filePath: "src/app/features/contracts/components/contract-payments/contract-payments.component.ts", lineNumber: 32 });
})();

// src/app/features/contracts/components/generate-hoa-dialog/generate-hoa-dialog.component.ts
function GenerateHoaDialogComponent_p_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, " La fecha inicial es requerida ");
    \u0275\u0275elementEnd();
  }
}
function GenerateHoaDialogComponent_p_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, " La cantidad debe ser mayor a 0 ");
    \u0275\u0275elementEnd();
  }
}
function GenerateHoaDialogComponent_p_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, " El d\xEDa debe estar entre 1 y 31 ");
    \u0275\u0275elementEnd();
  }
}
function GenerateHoaDialogComponent_p_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, " El monto es requerido y debe ser mayor a 0 ");
    \u0275\u0275elementEnd();
  }
}
var GenerateHoaDialogComponent = class _GenerateHoaDialogComponent {
  dialogRef;
  data;
  fb;
  form;
  generating = signal(false, ...ngDevMode ? [{ debugName: "generating" }] : []);
  constructor(dialogRef, data, fb) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.fb = fb;
    this.form = this.fb.group({
      first_payment_date: [this.data.contract.first_payment_date || this.data.contract.contract_date, Validators.required],
      payments_count: [12, [Validators.required, Validators.min(1)]],
      payment_day: [5, [Validators.required, Validators.min(1), Validators.max(31)]],
      monthly_amount: ["", [Validators.required, Validators.min(0.01)]]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  static \u0275fac = function GenerateHoaDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GenerateHoaDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GenerateHoaDialogComponent, selectors: [["app-generate-hoa-dialog"]], decls: 42, vars: 16, consts: [[1, "dialog-overlay"], [1, "dialog-container"], [1, "dialog-header"], [1, "text-xl", "font-semibold", "text-gray-900"], ["type", "button", 1, "text-gray-400", "hover:text-gray-600", "transition-colors", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "dialog-body"], [1, "text-sm", "text-gray-600", "mb-4"], [1, "space-y-4"], ["for", "first_payment_date", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "first_payment_date", "type", "date", "formControlName", "first_payment_date", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], ["class", "mt-1 text-xs text-red-600", 4, "ngIf"], ["for", "payments_count", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "payments_count", "type", "number", "min", "1", "step", "1", "formControlName", "payments_count", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], ["for", "payment_day", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "payment_day", "type", "number", "min", "1", "max", "31", "step", "1", "formControlName", "payment_day", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], ["for", "monthly_amount", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "relative"], [1, "absolute", "left-3", "top-1/2", "transform", "-translate-y-1/2", "text-gray-500", "text-sm"], ["id", "monthly_amount", "type", "number", "step", "0.01", "min", "0.01", "formControlName", "monthly_amount", "placeholder", "Ej. 1500.00", 1, "w-full", "rounded-lg", "border", "border-gray-300", "pl-7", "pr-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], [1, "dialog-footer"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "hover:bg-gray-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-green-600", "rounded-lg", "hover:bg-green-700", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled"], [1, "mt-1", "text-xs", "text-red-600"]], template: function GenerateHoaDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Generar Pagos de HOA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 4);
      \u0275\u0275listener("click", function GenerateHoaDialogComponent_Template_button_click_5_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(6, " \u2715 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 5);
      \u0275\u0275listener("ngSubmit", function GenerateHoaDialogComponent_Template_form_ngSubmit_7_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(8, "div", 6)(9, "p", 7);
      \u0275\u0275text(10, " Genera pagos mensuales de HOA para el contrato ");
      \u0275\u0275elementStart(11, "strong");
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 8)(14, "div")(15, "label", 9);
      \u0275\u0275text(16, " Fecha inicial ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 10);
      \u0275\u0275template(18, GenerateHoaDialogComponent_p_18_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div")(20, "label", 12);
      \u0275\u0275text(21, " Cantidad de pagos ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "input", 13);
      \u0275\u0275template(23, GenerateHoaDialogComponent_p_23_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div")(25, "label", 14);
      \u0275\u0275text(26, " D\xEDa de pago mensual ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "input", 15);
      \u0275\u0275template(28, GenerateHoaDialogComponent_p_28_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div")(30, "label", 16);
      \u0275\u0275text(31, " Monto Mensual ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 17)(33, "span", 18);
      \u0275\u0275text(34, "$");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275template(36, GenerateHoaDialogComponent_p_36_Template, 2, 0, "p", 11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 20)(38, "button", 21);
      \u0275\u0275listener("click", function GenerateHoaDialogComponent_Template_button_click_38_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(39, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "button", 22);
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.data.contract.contract_number);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("border-red-500", ((tmp_2_0 = ctx.form.get("first_payment_date")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("first_payment_date")) == null ? null : tmp_2_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_3_0 = ctx.form.get("first_payment_date")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("first_payment_date")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275classProp("border-red-500", ((tmp_4_0 = ctx.form.get("payments_count")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx.form.get("payments_count")) == null ? null : tmp_4_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_5_0 = ctx.form.get("payments_count")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("payments_count")) == null ? null : tmp_5_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275classProp("border-red-500", ((tmp_6_0 = ctx.form.get("payment_day")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.form.get("payment_day")) == null ? null : tmp_6_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_7_0 = ctx.form.get("payment_day")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("payment_day")) == null ? null : tmp_7_0.touched));
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-red-500", ((tmp_8_0 = ctx.form.get("monthly_amount")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("monthly_amount")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_9_0 = ctx.form.get("monthly_amount")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.form.get("monthly_amount")) == null ? null : tmp_9_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.generating());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.generating() ? "Generando..." : "Generar Pagos", " ");
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 500px;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=generate-hoa-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GenerateHoaDialogComponent, [{
    type: Component,
    args: [{ selector: "app-generate-hoa-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `
    <div class="dialog-overlay">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2 class="text-xl font-semibold text-gray-900">Generar Pagos de HOA</h2>
          <button
            type="button"
            (click)="closeDialog()"
            class="text-gray-400 hover:text-gray-600 transition-colors">
            \u2715
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="dialog-body">
            <p class="text-sm text-gray-600 mb-4">
              Genera pagos mensuales de HOA para el contrato <strong>{{ data.contract.contract_number }}</strong>
            </p>

            <div class="space-y-4">
              <!-- Fecha inicial -->
              <div>
                <label for="first_payment_date" class="block text-sm font-medium text-gray-700 mb-1">
                  Fecha inicial
                </label>
                <input
                  id="first_payment_date"
                  type="date"
                  formControlName="first_payment_date"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  [class.border-red-500]="form.get('first_payment_date')?.invalid && form.get('first_payment_date')?.touched">
                <p *ngIf="form.get('first_payment_date')?.invalid && form.get('first_payment_date')?.touched"
                   class="mt-1 text-xs text-red-600">
                  La fecha inicial es requerida
                </p>
              </div>

              <!-- Cantidad de pagos -->
              <div>
                <label for="payments_count" class="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad de pagos
                </label>
                <input
                  id="payments_count"
                  type="number"
                  min="1"
                  step="1"
                  formControlName="payments_count"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  [class.border-red-500]="form.get('payments_count')?.invalid && form.get('payments_count')?.touched">
                <p *ngIf="form.get('payments_count')?.invalid && form.get('payments_count')?.touched"
                   class="mt-1 text-xs text-red-600">
                  La cantidad debe ser mayor a 0
                </p>
              </div>

              <!-- D\xEDa de pago mensual -->
              <div>
                <label for="payment_day" class="block text-sm font-medium text-gray-700 mb-1">
                  D\xEDa de pago mensual
                </label>
                <input
                  id="payment_day"
                  type="number"
                  min="1"
                  max="31"
                  step="1"
                  formControlName="payment_day"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  [class.border-red-500]="form.get('payment_day')?.invalid && form.get('payment_day')?.touched">
                <p *ngIf="form.get('payment_day')?.invalid && form.get('payment_day')?.touched"
                   class="mt-1 text-xs text-red-600">
                  El d\xEDa debe estar entre 1 y 31
                </p>
              </div>

              <!-- Monto mensual -->
              <div>
                <label for="monthly_amount" class="block text-sm font-medium text-gray-700 mb-1">
                  Monto Mensual
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    id="monthly_amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  formControlName="monthly_amount"
                  placeholder="Ej. 1500.00"
                    class="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="form.get('monthly_amount')?.invalid && form.get('monthly_amount')?.touched">
                </div>
                <p *ngIf="form.get('monthly_amount')?.invalid && form.get('monthly_amount')?.touched"
                   class="mt-1 text-xs text-red-600">
                  El monto es requerido y debe ser mayor a 0
                </p>
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button
              type="button"
              (click)="closeDialog()"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || generating()"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ generating() ? 'Generando...' : 'Generar Pagos' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;eb90fb5abb6ba153121faac447b382d310ceb899275f5776a468564ea02eb351;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/contracts/components/generate-hoa-dialog/generate-hoa-dialog.component.ts */\n.dialog-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-container {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 500px;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-body {\n  padding: 1.5rem;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=generate-hoa-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GenerateHoaDialogComponent, { className: "GenerateHoaDialogComponent", filePath: "src/app/features/contracts/components/generate-hoa-dialog/generate-hoa-dialog.component.ts", lineNumber: 173 });
})();

// src/app/features/contracts/services/hoa-payment.service.ts
var HoaPaymentService = class _HoaPaymentService {
  http;
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  generatePayments(contractId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/hoa-payments/generate`, data);
  }
  getPayments(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/hoa-payments`);
  }
  getStats(contractId) {
    return this.http.get(`${this.api}/tenant/contracts/${contractId}/hoa-payments/stats`);
  }
  updatePayment(contractId, paymentId, data) {
    return this.http.put(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}`, data);
  }
  registerPayment(contractId, paymentId, data) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}/pay`, data);
  }
  cancelPayment(contractId, paymentId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}/cancel`, {});
  }
  resetPayment(contractId, paymentId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}/reset`, {});
  }
  deletePayment(contractId, paymentId) {
    return this.http.delete(`${this.api}/tenant/contracts/${contractId}/hoa-payments/${paymentId}`);
  }
  markOverdue(contractId) {
    return this.http.post(`${this.api}/tenant/contracts/${contractId}/hoa-payments/mark-overdue`, {});
  }
  static \u0275fac = function HoaPaymentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HoaPaymentService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HoaPaymentService, factory: _HoaPaymentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HoaPaymentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/contracts/components/edit-hoa-payment-modal/edit-hoa-payment-modal.component.ts
var EditHoaPaymentModalComponent = class _EditHoaPaymentModalComponent {
  data;
  dialogRef;
  fb;
  hoaPaymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(data, dialogRef, fb, hoaPaymentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.hoaPaymentService = hoaPaymentService;
    this.interceptorService = interceptorService;
    const isPaid = this.data.payment.status === "pagado";
    this.form = this.fb.group({
      amount_paid: [this.data.payment.amount_paid || this.data.payment.amount, [Validators.required, Validators.min(0.01)]],
      paid_date: [this.data.payment.paid_date || "", isPaid ? Validators.required : []],
      payment_method: [this.data.payment.payment_method || "", isPaid ? Validators.required : []],
      notes: [this.data.payment.notes || ""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
  }
  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos requeridos"
      });
      return;
    }
    this.saving.set(true);
    this.hoaPaymentService.updatePayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago HOA actualizado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al actualizar el pago HOA"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function EditHoaPaymentModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EditHoaPaymentModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HoaPaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditHoaPaymentModalComponent, selectors: [["app-edit-hoa-payment-modal"]], features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 31, vars: 15, consts: [[1, "dialog-container"], [1, "dialog-header"], [1, "dialog-title"], [1, "close-button", 3, "click"], [3, "img", "size"], [1, "dialog-content", 3, "formGroup"], [1, "mb-3", "p-2", "bg-blue-50", "rounded-lg", "border", "border-blue-200"], [1, "text-sm", "text-blue-900"], [1, "font-semibold"], [1, "space-y-4"], ["label", "Monto Pagado", "type", "number", 3, "form_control"], ["type", "date", 3, "label", "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [3, "config"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas adicionales sobre el pago HOA...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "dialog-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Guardar Cambios", "custom_class", "btn_primary", 3, "clicked", "loading"]], template: function EditHoaPaymentModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function EditHoaPaymentModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "p", 7)(9, "span", 8);
      \u0275\u0275text(10, "Estado:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 7)(13, "span", 8);
      \u0275\u0275text(14, "Vencimiento:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15);
      \u0275\u0275pipe(16, "localDate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9);
      \u0275\u0275element(18, "app-input", 10)(19, "app-input", 11);
      \u0275\u0275elementStart(20, "div")(21, "label", 12);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "app-select", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div")(25, "label", 12);
      \u0275\u0275text(26, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "textarea", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 15)(29, "app-button", 16);
      \u0275\u0275listener("clicked", function EditHoaPaymentModalComponent_Template_app_button_clicked_29_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "app-button", 17);
      \u0275\u0275listener("clicked", function EditHoaPaymentModalComponent_Template_app_button_clicked_30_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Editar Pago HOA #", ctx.data.payment.payment_number);
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.data.payment.status);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(16, 12, ctx.data.payment.due_date, "mediumDate"));
      \u0275\u0275advance(3);
      \u0275\u0275property("form_control", ctx.form.controls["amount_paid"]);
      \u0275\u0275advance();
      \u0275\u0275property("label", "Fecha de Pago" + (ctx.data.payment.status === "pagado" ? " *" : ""))("form_control", ctx.form.controls["paid_date"]);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" M\xE9todo de Pago ", ctx.data.payment.status === "pagado" ? "*" : "", " ");
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.paymentMethodSelectConfig);
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    LocalDatePipe
  ], styles: ["\n\n.dialog-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 500px;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=edit-hoa-payment-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditHoaPaymentModalComponent, [{
    type: Component,
    args: [{ selector: "app-edit-hoa-payment-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule,
      LocalDatePipe
    ], providers: [DatePipe], template: `<div class="dialog-container">\r
  <div class="dialog-header">\r
    <h2 class="dialog-title">Editar Pago HOA #{{ data.payment.payment_number }}</h2>\r
    <button (click)="close()" class="close-button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <div class="dialog-content" [formGroup]="form">\r
    <div class="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">\r
      <p class="text-sm text-blue-900"><span class="font-semibold">Estado:</span> {{ data.payment.status }}</p>\r
      <p class="text-sm text-blue-900"><span class="font-semibold">Vencimiento:</span> {{ data.payment.due_date | localDate:'mediumDate' }}</p>\r
    </div>\r
\r
    <div class="space-y-4">\r
      <app-input label="Monto Pagado" type="number" [form_control]="form.controls['amount_paid']"></app-input>\r
\r
      <app-input\r
        [label]="'Fecha de Pago' + (data.payment.status === 'pagado' ? ' *' : '')"\r
        type="date"\r
        [form_control]="form.controls['paid_date']">\r
      </app-input>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">\r
          M\xE9todo de Pago {{ data.payment.status === 'pagado' ? '*' : '' }}\r
        </label>\r
        <app-select [config]="paymentMethodSelectConfig"></app-select>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas adicionales sobre el pago HOA..."></textarea>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="dialog-footer">\r
    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="close()"></app-button>\r
    <app-button text="Guardar Cambios" custom_class="btn_primary" [loading]="saving()" (clicked)="save()"></app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/edit-hoa-payment-modal/edit-hoa-payment-modal.component.scss */\n.dialog-container {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 500px;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=edit-hoa-payment-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: HoaPaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditHoaPaymentModalComponent, { className: "EditHoaPaymentModalComponent", filePath: "src/app/features/contracts/components/edit-hoa-payment-modal/edit-hoa-payment-modal.component.ts", lineNumber: 31 });
})();

// src/app/features/contracts/components/partial-hoa-payment-modal/partial-hoa-payment-modal.component.ts
function PartialHoaPaymentModalComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" El monto no puede exceder ", \u0275\u0275pipeBind2(2, 1, ctx_r0.amountPending, ctx_r0.data.currency), " ");
  }
}
function PartialHoaPaymentModalComponent_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-green-600", ctx_r0.isFullPayment)("text-blue-600", !ctx_r0.isFullPayment);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.paymentTypeMessage, " ");
  }
}
var PartialHoaPaymentModalComponent = class _PartialHoaPaymentModalComponent {
  data;
  dialogRef;
  fb;
  hoaPaymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(data, dialogRef, fb, hoaPaymentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.hoaPaymentService = hoaPaymentService;
    this.interceptorService = interceptorService;
    const today = this.getLocalDateString(/* @__PURE__ */ new Date());
    this.form = this.fb.group({
      amount: ["", [Validators.required, Validators.min(0.01), this.maxAmountValidator.bind(this)]],
      payment_date: [today, Validators.required],
      payment_method: ["", Validators.required],
      reference_number: [""],
      notes: [""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
    this.form.get("amount")?.setValue(this.data.payment.amount_pending);
  }
  getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  maxAmountValidator(control) {
    if (!control.value)
      return null;
    const amount = parseFloat(control.value);
    if (amount > this.data.payment.amount_pending) {
      return { maxAmount: { max: this.data.payment.amount_pending, actual: amount } };
    }
    return null;
  }
  get amountPending() {
    return this.data.payment.amount_pending;
  }
  get isFullPayment() {
    const amount = parseFloat(this.form.get("amount")?.value || 0);
    return Math.abs(amount - this.amountPending) < 0.01;
  }
  get paymentTypeMessage() {
    return this.isFullPayment ? "Se marcar\xE1 como pagado completo" : "Se registrar\xE1 como pago parcial";
  }
  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos requeridos correctamente"
      });
      return;
    }
    this.saving.set(true);
    this.hoaPaymentService.registerPayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago HOA registrado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al registrar el pago HOA"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function PartialHoaPaymentModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartialHoaPaymentModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(HoaPaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartialHoaPaymentModalComponent, selectors: [["app-partial-hoa-payment-modal"]], features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 33, vars: 15, consts: [[1, "modal-container"], [1, "modal-header"], [1, "text-xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "font-semibold", "text-orange-600"], ["type", "button", 1, "close-button", 3, "click"], [3, "img", "size"], [1, "modal-body"], [1, "space-y-4", 3, "formGroup"], ["label", "Monto a Pagar", "type", "number", "placeholder", "Ingresa el monto", 3, "form_control"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["class", "text-xs mt-1", 3, "text-green-600", "text-blue-600", 4, "ngIf"], ["label", "Fecha de Pago", "type", "date", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "text-red-500"], [3, "config"], ["label", "N\xFAmero de Referencia", "type", "text", "placeholder", "Ej: REF123456", 3, "form_control"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas adicionales sobre el pago HOA...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "modal-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Registrar Pago", "custom_class", "btn_primary", 3, "clicked", "loading"], [1, "text-xs", "text-red-600", "mt-1"], [1, "text-xs", "mt-1"]], template: function PartialHoaPaymentModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, "Registrar Pago HOA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementStart(7, "span", 4);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "currency");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function PartialHoaPaymentModalComponent_Template_button_click_10_listener() {
        return ctx.close();
      });
      \u0275\u0275element(11, "lucide-icon", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 7)(13, "form", 8)(14, "div");
      \u0275\u0275element(15, "app-input", 9);
      \u0275\u0275template(16, PartialHoaPaymentModalComponent_p_16_Template, 3, 4, "p", 10)(17, PartialHoaPaymentModalComponent_p_17_Template, 2, 5, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "app-input", 12);
      \u0275\u0275elementStart(19, "div")(20, "label", 13);
      \u0275\u0275text(21, " M\xE9todo de Pago ");
      \u0275\u0275elementStart(22, "span", 14);
      \u0275\u0275text(23, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(24, "app-select", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "app-input", 16);
      \u0275\u0275elementStart(26, "div")(27, "label", 13);
      \u0275\u0275text(28, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "textarea", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 18)(31, "app-button", 19);
      \u0275\u0275listener("clicked", function PartialHoaPaymentModalComponent_Template_app_button_clicked_31_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "app-button", 20);
      \u0275\u0275listener("clicked", function PartialHoaPaymentModalComponent_Template_app_button_clicked_32_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" Pago #", ctx.data.payment.payment_number, " - Monto pendiente: ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 12, ctx.amountPending, ctx.data.currency));
      \u0275\u0275advance(3);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.get("amount"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.form.get("amount")) == null ? null : tmp_6_0.hasError("maxAmount"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.hasError("maxAmount")) && ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.value));
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.get("payment_date"));
      \u0275\u0275advance(6);
      \u0275\u0275property("config", ctx.paymentMethodSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.get("reference_number"));
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    CurrencyPipe
  ], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 8px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.close-button[_ngcontent-%COMP%] {\n  padding: 4px;\n  color: #6b7280;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=partial-hoa-payment-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PartialHoaPaymentModalComponent, [{
    type: Component,
    args: [{ selector: "app-partial-hoa-payment-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule
    ], providers: [DatePipe], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <div>\r
      <h2 class="text-xl font-semibold text-gray-800">Registrar Pago HOA</h2>\r
      <p class="text-sm text-gray-600 mt-1">\r
        Pago #{{ data.payment.payment_number }} - Monto pendiente:\r
        <span class="font-semibold text-orange-600">{{ amountPending | currency:data.currency }}</span>\r
      </p>\r
    </div>\r
    <button (click)="close()" class="close-button" type="button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <div class="modal-body">\r
    <form [formGroup]="form" class="space-y-4">\r
      <div>\r
        <app-input\r
          label="Monto a Pagar"\r
          type="number"\r
          placeholder="Ingresa el monto"\r
          [form_control]="form.get('amount')">\r
        </app-input>\r
        <p *ngIf="form.get('amount')?.hasError('maxAmount')" class="text-xs text-red-600 mt-1">\r
          El monto no puede exceder {{ amountPending | currency:data.currency }}\r
        </p>\r
        <p *ngIf="!form.get('amount')?.hasError('maxAmount') && form.get('amount')?.value" class="text-xs mt-1" [class.text-green-600]="isFullPayment" [class.text-blue-600]="!isFullPayment">\r
          {{ paymentTypeMessage }}\r
        </p>\r
      </div>\r
\r
      <app-input label="Fecha de Pago" type="date" [form_control]="form.get('payment_date')"></app-input>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">\r
          M\xE9todo de Pago <span class="text-red-500">*</span>\r
        </label>\r
        <app-select [config]="paymentMethodSelectConfig"></app-select>\r
      </div>\r
\r
      <app-input label="N\xFAmero de Referencia" type="text" placeholder="Ej: REF123456" [form_control]="form.get('reference_number')"></app-input>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas adicionales sobre el pago HOA..."></textarea>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="modal-footer">\r
    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="close()"></app-button>\r
    <app-button text="Registrar Pago" custom_class="btn_primary" [loading]="saving()" (clicked)="save()"></app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/partial-hoa-payment-modal/partial-hoa-payment-modal.component.scss */\n.modal-container {\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 8px;\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.close-button {\n  padding: 4px;\n  color: #6b7280;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=partial-hoa-payment-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: HoaPaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartialHoaPaymentModalComponent, { className: "PartialHoaPaymentModalComponent", filePath: "src/app/features/contracts/components/partial-hoa-payment-modal/partial-hoa-payment-modal.component.ts", lineNumber: 29 });
})();

// src/app/features/contracts/components/contract-hoa-payments/contract-hoa-payments.component.ts
function ContractHoaPaymentsComponent_app_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 9);
    \u0275\u0275listener("clicked", function ContractHoaPaymentsComponent_app_button_2_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generatePayments());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", ctx_r1.Plus)("loading", ctx_r1.generating());
  }
}
function ContractHoaPaymentsComponent_app_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 10);
    \u0275\u0275listener("clicked", function ContractHoaPaymentsComponent_app_button_3_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.markOverdue());
    });
    \u0275\u0275elementEnd();
  }
}
function ContractHoaPaymentsComponent_div_4_p_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 32);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" #", ctx_r1.stats().partial_payment.payment_number, " pendiente ", \u0275\u0275pipeBind2(2, 2, ctx_r1.stats().partial_payment.amount_pending, ctx_r1.currency), " ");
  }
}
function ContractHoaPaymentsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12)(2, "p", 13);
    \u0275\u0275text(3, "Total HOA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 15);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 16)(10, "p", 17);
    \u0275\u0275text(11, "Pagados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 18);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 19);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 20)(18, "p", 21);
    \u0275\u0275text(19, "Parciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 22);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, ContractHoaPaymentsComponent_div_4_p_22_Template, 3, 5, "p", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 24)(24, "p", 25);
    \u0275\u0275text(25, "Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p", 26);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p", 27);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 28)(32, "p", 29);
    \u0275\u0275text(33, "Vencidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p", 30);
    \u0275\u0275text(35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p", 31);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().total_payments);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 10, ctx_r1.stats().total_expected || 0, ctx_r1.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.stats().paid_count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 13, ctx_r1.stats().total_paid || 0, ctx_r1.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.stats().partial_count || 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.stats().partial_payment);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().pending_count || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(30, 16, ctx_r1.stats().total_pending || 0, ctx_r1.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.stats().overdue_count || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Cancelados: ", ctx_r1.stats().cancelled_count || 0);
  }
}
function ContractHoaPaymentsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "p", 34);
    \u0275\u0275text(2, "Cargando pagos HOA...");
    \u0275\u0275elementEnd()();
  }
}
function ContractHoaPaymentsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36);
    \u0275\u0275text(2, "HOA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 37);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 38);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isContractCancelled ? "Contrato cancelado" : "No hay pagos HOA generados", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isContractCancelled ? "No se pueden generar pagos HOA en un contrato cancelado." : "Genera los pagos HOA para registrar y controlar los cobros mensuales. Disponible en contratos activos y completados.", " ");
  }
}
function ContractHoaPaymentsComponent_div_7_tr_23_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function ContractHoaPaymentsComponent_div_7_tr_23_button_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const payment_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.registerPayment(payment_r6));
    });
    \u0275\u0275element(1, "lucide-icon", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Registrar Pago HOA");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.DollarSign)("size", 16);
  }
}
function ContractHoaPaymentsComponent_div_7_tr_23_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function ContractHoaPaymentsComponent_div_7_tr_23_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const payment_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editPayment(payment_r6));
    });
    \u0275\u0275element(1, "lucide-icon", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Editar Pago HOA");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Edit)("size", 16);
  }
}
function ContractHoaPaymentsComponent_div_7_tr_23_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function ContractHoaPaymentsComponent_div_7_tr_23_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const payment_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resetPayment(payment_r6));
    });
    \u0275\u0275element(1, "lucide-icon", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Resetear Pago HOA");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.RotateCcw)("size", 16);
  }
}
function ContractHoaPaymentsComponent_div_7_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 45)(1, "td", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 47);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 47);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 47);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 48);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "localDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 48);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "localDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 49)(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 48);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 49)(24, "div", 50);
    \u0275\u0275template(25, ContractHoaPaymentsComponent_div_7_tr_23_button_25_Template, 2, 3, "button", 51)(26, ContractHoaPaymentsComponent_div_7_tr_23_button_26_Template, 2, 3, "button", 52)(27, ContractHoaPaymentsComponent_div_7_tr_23_button_27_Template, 2, 3, "button", 53);
    \u0275\u0275elementStart(28, "button", 54);
    \u0275\u0275listener("click", function ContractHoaPaymentsComponent_div_7_tr_23_Template_button_click_28_listener() {
      const payment_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelPayment(payment_r6));
    });
    \u0275\u0275element(29, "lucide-icon", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 56);
    \u0275\u0275listener("click", function ContractHoaPaymentsComponent_div_7_tr_23_Template_button_click_30_listener() {
      const payment_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deletePayment(payment_r6));
    });
    \u0275\u0275element(31, "lucide-icon", 55);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const payment_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r6.payment_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 19, payment_r6.amount, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 22, payment_r6.amount_paid, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 25, payment_r6.amount_pending, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 28, payment_r6.due_date, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(payment_r6.paid_date ? \u0275\u0275pipeBind2(17, 31, payment_r6.paid_date, "mediumDate") : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getStatusClass(payment_r6.status, payment_r6.is_overdue));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(payment_r6.status, payment_r6.is_overdue), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r6.payment_method || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.canRegisterPayment(payment_r6));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit(payment_r6));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canResetPayment(payment_r6));
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", "Cancelar Pago HOA");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.RotateCcw)("size", 16);
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", "Eliminar Pago HOA");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Trash2)("size", 16);
  }
}
function ContractHoaPaymentsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "table", 40)(2, "thead", 41)(3, "tr")(4, "th", 42);
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 42);
    \u0275\u0275text(7, "Monto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 42);
    \u0275\u0275text(9, "Pagado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 42);
    \u0275\u0275text(11, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 42);
    \u0275\u0275text(13, "Vencimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 42);
    \u0275\u0275text(15, "Fecha Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 42);
    \u0275\u0275text(17, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 42);
    \u0275\u0275text(19, "M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 42);
    \u0275\u0275text(21, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody", 43);
    \u0275\u0275template(23, ContractHoaPaymentsComponent_div_7_tr_23_Template, 32, 34, "tr", 44);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx_r1.paginatedPayments);
  }
}
function ContractHoaPaymentsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "div", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 62)(4, "button", 63);
    \u0275\u0275listener("click", function ContractHoaPaymentsComponent_div_8_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPage(ctx_r1.currentPage() - 1));
    });
    \u0275\u0275text(5, "Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 64);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 63);
    \u0275\u0275listener("click", function ContractHoaPaymentsComponent_div_8_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPage(ctx_r1.currentPage() + 1));
    });
    \u0275\u0275text(9, "Siguiente");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando ", (ctx_r1.currentPage() - 1) * ctx_r1.pageSize + 1, " - ", ctx_r1.Math.min(ctx_r1.currentPage() * ctx_r1.pageSize, ctx_r1.payments().length), " de ", ctx_r1.payments().length, " pagos HOA ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.currentPage() === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("P\xE1gina ", ctx_r1.currentPage(), " / ", ctx_r1.totalPages);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() === ctx_r1.totalPages);
  }
}
var ContractHoaPaymentsComponent = class _ContractHoaPaymentsComponent {
  hoaPaymentService;
  interceptorService;
  dialog;
  contractId;
  contract;
  currency = "USD";
  contractStatus = null;
  dataChanged = new EventEmitter();
  payments = signal([], ...ngDevMode ? [{ debugName: "payments" }] : []);
  stats = signal(null, ...ngDevMode ? [{ debugName: "stats" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  generating = signal(false, ...ngDevMode ? [{ debugName: "generating" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = 20;
  Plus = Plus;
  Edit = SquarePen;
  Trash2 = Trash2;
  DollarSign = DollarSign;
  RotateCcw = RotateCcw;
  Math = Math;
  constructor(hoaPaymentService, interceptorService, dialog) {
    this.hoaPaymentService = hoaPaymentService;
    this.interceptorService = interceptorService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadPayments();
    this.loadStats();
  }
  get isContractCancelled() {
    const status = (this.contractStatus || "").toLowerCase().trim();
    return status === "cancelado" || status === "cancelled" || status === "canceled";
  }
  get showGeneratePaymentsButton() {
    return this.payments().length === 0 && !this.isContractCancelled;
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.payments().length / this.pageSize));
  }
  get paginatedPayments() {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.payments().slice(start, start + this.pageSize);
  }
  setPage(page) {
    if (page < 1 || page > this.totalPages)
      return;
    this.currentPage.set(page);
  }
  loadPayments() {
    this.loading.set(true);
    this.hoaPaymentService.getPayments(this.contractId).subscribe({
      next: (payments) => {
        this.payments.set(payments);
        this.autoSelectProgressPage(payments);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los pagos HOA"
        });
      }
    });
  }
  loadStats() {
    this.hoaPaymentService.getStats(this.contractId).subscribe({
      next: (stats) => this.stats.set(stats),
      error: () => {
      }
    });
  }
  generatePayments() {
    if (!this.contract)
      return;
    const dialogRef = this.dialog.open(GenerateHoaDialogComponent, {
      width: "500px",
      data: { contract: this.contract }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result)
        return;
      const monthlyAmount = Number(result.monthly_amount);
      if (!monthlyAmount || monthlyAmount <= 0) {
        this.interceptorService.openSnackbar({
          type: "warning",
          title: "Advertencia",
          message: "El monto mensual debe ser mayor a 0"
        });
        return;
      }
      this.generating.set(true);
      this.hoaPaymentService.generatePayments(this.contractId, {
        first_payment_date: result.first_payment_date,
        payments_count: Number(result.payments_count),
        payment_day: Number(result.payment_day) || 5,
        monthly_amount: monthlyAmount
      }).subscribe({
        next: () => {
          this.generating.set(false);
          this.loadPayments();
          this.loadStats();
          this.dataChanged.emit();
          this.interceptorService.openSnackbar({
            type: "success",
            title: "\xC9xito",
            message: "Pagos HOA generados correctamente"
          });
        },
        error: (err) => {
          this.generating.set(false);
          this.interceptorService.openSnackbar({
            type: "error",
            title: "Error",
            message: err.error?.message || "Error al generar pagos HOA"
          });
        }
      });
    });
  }
  editPayment(payment) {
    const dialogRef = this.dialog.open(EditHoaPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
  registerPayment(payment) {
    const dialogRef = this.dialog.open(PartialHoaPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
  cancelPayment(payment) {
    if (!confirm(`\xBFCancelar el pago HOA #${payment.payment_number}?`))
      return;
    this.hoaPaymentService.cancelPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo cancelar el pago HOA"
        });
      }
    });
  }
  resetPayment(payment) {
    if (!confirm(`\xBFResetear el pago HOA #${payment.payment_number}?`))
      return;
    this.hoaPaymentService.resetPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo resetear el pago HOA"
        });
      }
    });
  }
  deletePayment(payment) {
    if (!confirm(`\xBFEliminar permanentemente el pago HOA #${payment.payment_number}?`))
      return;
    this.hoaPaymentService.deletePayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo eliminar el pago HOA"
        });
      }
    });
  }
  markOverdue() {
    this.hoaPaymentService.markOverdue(this.contractId).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
      },
      error: () => {
      }
    });
  }
  getStatusClass(status, isOverdue = false) {
    const baseClass = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ";
    if (isOverdue && (status === "pendiente" || status === "parcial")) {
      return baseClass + "bg-red-500 text-white shadow-sm";
    }
    const statusMap = {
      pendiente: "bg-amber-500 text-white shadow-sm",
      pagado: "bg-emerald-500 text-white shadow-sm",
      parcial: "bg-blue-500 text-white shadow-sm",
      cancelado: "bg-gray-500 text-white shadow-sm"
    };
    return baseClass + (statusMap[status] || "bg-gray-500 text-white shadow-sm");
  }
  getStatusLabel(status, isOverdue = false) {
    if (status === "parcial" && isOverdue)
      return "Parcial Vencido";
    if (status === "pendiente" && isOverdue)
      return "Pendiente Vencido";
    if (status === "parcial")
      return "Parcial";
    if (status === "pendiente")
      return "Pendiente";
    if (status === "pagado")
      return "Pagado";
    if (status === "cancelado")
      return "Cancelado";
    return status;
  }
  canRegisterPayment(payment) {
    return payment.status === "pendiente" || payment.status === "parcial";
  }
  canEdit(payment) {
    return payment.status !== "cancelado";
  }
  canResetPayment(payment) {
    return payment.status === "pagado" || payment.status === "parcial";
  }
  autoSelectProgressPage(payments) {
    if (!payments.length) {
      this.currentPage.set(1);
      return;
    }
    let lastPaidIndex = -1;
    for (let i = payments.length - 1; i >= 0; i--) {
      const p = payments[i];
      const hasAnyPayment = (p.amount_paid || 0) > 0 || p.status === "pagado" || p.status === "parcial";
      if (hasAnyPayment) {
        lastPaidIndex = i;
        break;
      }
    }
    const targetIndex = lastPaidIndex >= 0 ? lastPaidIndex : 0;
    const targetPage = Math.floor(targetIndex / this.pageSize) + 1;
    this.currentPage.set(targetPage);
  }
  static \u0275fac = function ContractHoaPaymentsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractHoaPaymentsComponent)(\u0275\u0275directiveInject(HoaPaymentService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractHoaPaymentsComponent, selectors: [["app-contract-hoa-payments"]], inputs: { contractId: "contractId", contract: "contract", currency: "currency", contractStatus: "contractStatus" }, outputs: { dataChanged: "dataChanged" }, decls: 9, vars: 7, consts: [[1, "payments-container"], [1, "flex", "items-center", "justify-end", "mb-2", "gap-2"], ["text", "Generar Pagos HOA", "custom_class", "btn_primary", "size", "sm", 3, "icon", "loading", "clicked", 4, "ngIf"], ["text", "Marcar Vencidos", "custom_class", "btn_secondary", "size", "sm", 3, "clicked", 4, "ngIf"], ["class", "grid grid-cols-5 gap-4 mb-6 w-full", 4, "ngIf"], ["class", "text-center py-8", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "overflow-x-auto", 4, "ngIf"], ["class", "payments-pagination", 4, "ngIf"], ["text", "Generar Pagos HOA", "custom_class", "btn_primary", "size", "sm", 3, "clicked", "icon", "loading"], ["text", "Marcar Vencidos", "custom_class", "btn_secondary", "size", "sm", 3, "clicked"], [1, "grid", "grid-cols-5", "gap-4", "mb-6", "w-full"], [1, "bg-gray-50", "p-4", "rounded-lg", "border", "border-gray-200"], [1, "text-sm", "font-medium", "text-gray-600"], [1, "text-2xl", "font-bold", "text-gray-900", "mt-1"], [1, "text-sm", "font-medium", "text-gray-700", "mt-2"], [1, "bg-green-50", "p-4", "rounded-lg", "border", "border-green-200"], [1, "text-sm", "font-medium", "text-green-700"], [1, "text-2xl", "font-bold", "text-green-800", "mt-1"], [1, "text-sm", "font-medium", "text-green-700", "mt-2"], [1, "bg-blue-50", "p-4", "rounded-lg", "border", "border-blue-200"], [1, "text-sm", "font-medium", "text-blue-700"], [1, "text-2xl", "font-bold", "text-blue-800", "mt-1"], ["class", "text-xs text-blue-700 mt-2", 4, "ngIf"], [1, "bg-yellow-50", "p-4", "rounded-lg", "border", "border-yellow-200"], [1, "text-sm", "font-medium", "text-yellow-700"], [1, "text-2xl", "font-bold", "text-yellow-800", "mt-1"], [1, "text-sm", "font-medium", "text-yellow-700", "mt-2"], [1, "bg-red-50", "p-4", "rounded-lg", "border", "border-red-200"], [1, "text-sm", "font-medium", "text-red-700"], [1, "text-2xl", "font-bold", "text-red-800", "mt-1"], [1, "text-xs", "text-red-700", "mt-2"], [1, "text-xs", "text-blue-700", "mt-2"], [1, "text-center", "py-8"], [1, "text-sm", "text-gray-500"], [1, "empty-state"], [1, "empty-state__icon"], [1, "empty-state__title"], [1, "empty-state__subtitle"], [1, "overflow-x-auto"], [1, "min-w-full", "divide-y", "divide-gray-200"], [1, "bg-gray-50"], [1, "px-3", "py-2", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase"], [1, "bg-white", "divide-y", "divide-gray-200"], ["class", "hover:bg-gray-50", 4, "ngFor", "ngForOf"], [1, "hover:bg-gray-50"], [1, "px-3", "py-2", "text-sm", "font-medium", "text-gray-900"], [1, "px-3", "py-2", "text-sm", "text-gray-900"], [1, "px-3", "py-2", "text-sm", "text-gray-600"], [1, "px-3", "py-2"], [1, "flex", "gap-1.5"], ["class", "action-btn action-btn--blue", 3, "matTooltip", "click", 4, "ngIf"], ["class", "action-btn action-btn--gray", 3, "matTooltip", "click", 4, "ngIf"], ["class", "action-btn action-btn--purple", 3, "matTooltip", "click", 4, "ngIf"], [1, "action-btn", "action-btn--amber", 3, "click", "matTooltip"], [3, "img", "size"], [1, "action-btn", "action-btn--red", 3, "click", "matTooltip"], [1, "action-btn", "action-btn--blue", 3, "click", "matTooltip"], [1, "action-btn", "action-btn--gray", 3, "click", "matTooltip"], [1, "action-btn", "action-btn--purple", 3, "click", "matTooltip"], [1, "payments-pagination"], [1, "text-xs", "text-gray-500"], [1, "flex", "items-center", "gap-1"], ["type", "button", 1, "pagination-btn", 3, "click", "disabled"], [1, "pagination-page"]], template: function ContractHoaPaymentsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275template(2, ContractHoaPaymentsComponent_app_button_2_Template, 1, 2, "app-button", 2)(3, ContractHoaPaymentsComponent_app_button_3_Template, 1, 0, "app-button", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, ContractHoaPaymentsComponent_div_4_Template, 38, 19, "div", 4)(5, ContractHoaPaymentsComponent_div_5_Template, 3, 0, "div", 5)(6, ContractHoaPaymentsComponent_div_6_Template, 7, 2, "div", 6)(7, ContractHoaPaymentsComponent_div_7_Template, 24, 1, "div", 7)(8, ContractHoaPaymentsComponent_div_8_Template, 10, 7, "div", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.showGeneratePaymentsButton);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.payments().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.stats() && ctx.payments().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length > ctx.pageSize);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ButtonComponent, LucideAngularModule, LucideAngularComponent, MatTooltipModule, MatTooltip, CurrencyPipe, LocalDatePipe], styles: ["\n\ntable[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.empty-state[_ngcontent-%COMP%] {\n  border: 1px dashed #cbd5e1;\n  border-radius: 0.75rem;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #ffffff 100%);\n  text-align: center;\n  padding: 2rem 1.25rem;\n}\n.empty-state__icon[_ngcontent-%COMP%] {\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 9999px;\n  margin: 0 auto 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #e0e7ff;\n  color: #3730a3;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n.empty-state__title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #111827;\n}\n.empty-state__subtitle[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  font-size: 0.82rem;\n  color: #6b7280;\n}\n.action-btn[_ngcontent-%COMP%] {\n  padding: 0.35rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s ease;\n}\n.action-btn--blue[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.action-btn--blue[_ngcontent-%COMP%]:hover {\n  background: #2563eb;\n  color: #fff;\n}\n.action-btn--gray[_ngcontent-%COMP%] {\n  color: #4b5563;\n}\n.action-btn--gray[_ngcontent-%COMP%]:hover {\n  background: #4b5563;\n  color: #fff;\n}\n.action-btn--purple[_ngcontent-%COMP%] {\n  color: #7c3aed;\n}\n.action-btn--purple[_ngcontent-%COMP%]:hover {\n  background: #7c3aed;\n  color: #fff;\n}\n.action-btn--amber[_ngcontent-%COMP%] {\n  color: #d97706;\n}\n.action-btn--amber[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n  color: #fff;\n}\n.action-btn--red[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.action-btn--red[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n  color: #fff;\n}\n.payments-pagination[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.pagination-btn[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.7rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #374151;\n  background: #fff;\n}\n.pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #6366f1;\n  color: #4f46e5;\n}\n.pagination-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.pagination-page[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.65rem;\n  border-radius: 0.5rem;\n  background: #eef2ff;\n  color: #4338ca;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=contract-hoa-payments.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractHoaPaymentsComponent, [{
    type: Component,
    args: [{ selector: "app-contract-hoa-payments", standalone: true, imports: [CommonModule, ButtonComponent, LucideAngularModule, LocalDatePipe, MatTooltipModule], template: `<div class="payments-container">\r
  <div class="flex items-center justify-end mb-2 gap-2">\r
    <app-button\r
      *ngIf="showGeneratePaymentsButton"\r
      text="Generar Pagos HOA"\r
      custom_class="btn_primary"\r
      size="sm"\r
      [icon]="Plus"\r
      [loading]="generating()"\r
      (clicked)="generatePayments()">\r
    </app-button>\r
\r
    <app-button\r
      *ngIf="payments().length > 0"\r
      text="Marcar Vencidos"\r
      custom_class="btn_secondary"\r
      size="sm"\r
      (clicked)="markOverdue()">\r
    </app-button>\r
  </div>\r
\r
  <div *ngIf="stats() && payments().length > 0" class="grid grid-cols-5 gap-4 mb-6 w-full">\r
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">\r
      <p class="text-sm font-medium text-gray-600">Total HOA</p>\r
      <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats()!.total_payments }}</p>\r
      <p class="text-sm font-medium text-gray-700 mt-2">{{ (stats()!.total_expected || 0) | currency:currency }}</p>\r
    </div>\r
    <div class="bg-green-50 p-4 rounded-lg border border-green-200">\r
      <p class="text-sm font-medium text-green-700">Pagados</p>\r
      <p class="text-2xl font-bold text-green-800 mt-1">{{ stats()!.paid_count }}</p>\r
      <p class="text-sm font-medium text-green-700 mt-2">{{ (stats()!.total_paid || 0) | currency:currency }}</p>\r
    </div>\r
    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">\r
      <p class="text-sm font-medium text-blue-700">Parciales</p>\r
      <p class="text-2xl font-bold text-blue-800 mt-1">{{ stats()!.partial_count || 0 }}</p>\r
      <p *ngIf="stats()!.partial_payment" class="text-xs text-blue-700 mt-2">\r
        #{{ stats()!.partial_payment!.payment_number }} pendiente {{ stats()!.partial_payment!.amount_pending | currency:currency }}\r
      </p>\r
    </div>\r
    <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">\r
      <p class="text-sm font-medium text-yellow-700">Pendientes</p>\r
      <p class="text-2xl font-bold text-yellow-800 mt-1">{{ stats()!.pending_count || 0 }}</p>\r
      <p class="text-sm font-medium text-yellow-700 mt-2">{{ (stats()!.total_pending || 0) | currency:currency }}</p>\r
    </div>\r
    <div class="bg-red-50 p-4 rounded-lg border border-red-200">\r
      <p class="text-sm font-medium text-red-700">Vencidos</p>\r
      <p class="text-2xl font-bold text-red-800 mt-1">{{ stats()!.overdue_count || 0 }}</p>\r
      <p class="text-xs text-red-700 mt-2">Cancelados: {{ stats()!.cancelled_count || 0 }}</p>\r
    </div>\r
  </div>\r
\r
  <div *ngIf="loading()" class="text-center py-8">\r
    <p class="text-sm text-gray-500">Cargando pagos HOA...</p>\r
  </div>\r
\r
  <div *ngIf="!loading() && payments().length === 0" class="empty-state">\r
    <div class="empty-state__icon">HOA</div>\r
    <p class="empty-state__title">\r
      {{ isContractCancelled ? 'Contrato cancelado' : 'No hay pagos HOA generados' }}\r
    </p>\r
    <p class="empty-state__subtitle">\r
      {{\r
        isContractCancelled\r
          ? 'No se pueden generar pagos HOA en un contrato cancelado.'\r
          : 'Genera los pagos HOA para registrar y controlar los cobros mensuales. Disponible en contratos activos y completados.'\r
      }}\r
    </p>\r
  </div>\r
\r
  <div *ngIf="!loading() && payments().length > 0" class="overflow-x-auto">\r
    <table class="min-w-full divide-y divide-gray-200">\r
      <thead class="bg-gray-50">\r
        <tr>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pagado</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pendiente</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha Pago</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">M\xE9todo</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>\r
        </tr>\r
      </thead>\r
      <tbody class="bg-white divide-y divide-gray-200">\r
        <tr *ngFor="let payment of paginatedPayments" class="hover:bg-gray-50">\r
          <td class="px-3 py-2 text-sm font-medium text-gray-900">{{ payment.payment_number }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-900">{{ payment.amount | currency:currency }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-900">{{ payment.amount_paid | currency:currency }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-900">{{ payment.amount_pending | currency:currency }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.due_date | localDate:'mediumDate' }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.paid_date ? (payment.paid_date | localDate:'mediumDate') : '\u2014' }}</td>\r
          <td class="px-3 py-2">\r
            <span [class]="getStatusClass(payment.status, payment.is_overdue)">\r
              {{ getStatusLabel(payment.status, payment.is_overdue) }}\r
            </span>\r
          </td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.payment_method || '\u2014' }}</td>\r
          <td class="px-3 py-2">\r
            <div class="flex gap-1.5">\r
              <button\r
                *ngIf="canRegisterPayment(payment)"\r
                (click)="registerPayment(payment)"\r
                class="action-btn action-btn--blue"\r
                [matTooltip]="'Registrar Pago HOA'">\r
                <lucide-icon [img]="DollarSign" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                *ngIf="canEdit(payment)"\r
                (click)="editPayment(payment)"\r
                class="action-btn action-btn--gray"\r
                [matTooltip]="'Editar Pago HOA'">\r
                <lucide-icon [img]="Edit" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                *ngIf="canResetPayment(payment)"\r
                (click)="resetPayment(payment)"\r
                class="action-btn action-btn--purple"\r
                [matTooltip]="'Resetear Pago HOA'">\r
                <lucide-icon [img]="RotateCcw" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                (click)="cancelPayment(payment)"\r
                class="action-btn action-btn--amber"\r
                [matTooltip]="'Cancelar Pago HOA'">\r
                <lucide-icon [img]="RotateCcw" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                (click)="deletePayment(payment)"\r
                class="action-btn action-btn--red"\r
                [matTooltip]="'Eliminar Pago HOA'">\r
                <lucide-icon [img]="Trash2" [size]="16"></lucide-icon>\r
              </button>\r
            </div>\r
          </td>\r
        </tr>\r
      </tbody>\r
    </table>\r
  </div>\r
\r
  <div *ngIf="!loading() && payments().length > pageSize" class="payments-pagination">\r
    <div class="text-xs text-gray-500">\r
      Mostrando {{ (currentPage() - 1) * pageSize + 1 }} - {{ Math.min(currentPage() * pageSize, payments().length) }} de {{ payments().length }} pagos HOA\r
    </div>\r
    <div class="flex items-center gap-1">\r
      <button type="button" class="pagination-btn" [disabled]="currentPage() === 1" (click)="setPage(currentPage() - 1)">Anterior</button>\r
      <span class="pagination-page">P\xE1gina {{ currentPage() }} / {{ totalPages }}</span>\r
      <button type="button" class="pagination-btn" [disabled]="currentPage() === totalPages" (click)="setPage(currentPage() + 1)">Siguiente</button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/contract-hoa-payments/contract-hoa-payments.component.scss */\ntable {\n  font-size: 0.875rem;\n}\n.empty-state {\n  border: 1px dashed #cbd5e1;\n  border-radius: 0.75rem;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #ffffff 100%);\n  text-align: center;\n  padding: 2rem 1.25rem;\n}\n.empty-state__icon {\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 9999px;\n  margin: 0 auto 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #e0e7ff;\n  color: #3730a3;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n.empty-state__title {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #111827;\n}\n.empty-state__subtitle {\n  margin-top: 0.35rem;\n  font-size: 0.82rem;\n  color: #6b7280;\n}\n.action-btn {\n  padding: 0.35rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s ease;\n}\n.action-btn--blue {\n  color: #2563eb;\n}\n.action-btn--blue:hover {\n  background: #2563eb;\n  color: #fff;\n}\n.action-btn--gray {\n  color: #4b5563;\n}\n.action-btn--gray:hover {\n  background: #4b5563;\n  color: #fff;\n}\n.action-btn--purple {\n  color: #7c3aed;\n}\n.action-btn--purple:hover {\n  background: #7c3aed;\n  color: #fff;\n}\n.action-btn--amber {\n  color: #d97706;\n}\n.action-btn--amber:hover {\n  background: #d97706;\n  color: #fff;\n}\n.action-btn--red {\n  color: #dc2626;\n}\n.action-btn--red:hover {\n  background: #dc2626;\n  color: #fff;\n}\n.payments-pagination {\n  margin-top: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.pagination-btn {\n  padding: 0.35rem 0.7rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #374151;\n  background: #fff;\n}\n.pagination-btn:hover:not(:disabled) {\n  border-color: #6366f1;\n  color: #4f46e5;\n}\n.pagination-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.pagination-page {\n  padding: 0.35rem 0.65rem;\n  border-radius: 0.5rem;\n  background: #eef2ff;\n  color: #4338ca;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=contract-hoa-payments.component.css.map */\n"] }]
  }], () => [{ type: HoaPaymentService }, { type: InterceptorService }, { type: MatDialog }], { contractId: [{
    type: Input
  }], contract: [{
    type: Input
  }], currency: [{
    type: Input
  }], contractStatus: [{
    type: Input
  }], dataChanged: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractHoaPaymentsComponent, { className: "ContractHoaPaymentsComponent", filePath: "src/app/features/contracts/components/contract-hoa-payments/contract-hoa-payments.component.ts", lineNumber: 22 });
})();

// src/app/features/contracts/components/partial-downpayment-modal/partial-downpayment-modal.component.ts
function PartialDownpaymentModalComponent_p_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" El monto no puede exceder ", \u0275\u0275pipeBind2(2, 1, ctx_r0.amountPending, ctx_r0.data.currency), " ");
  }
}
function PartialDownpaymentModalComponent_p_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-green-600", ctx_r0.isFullPayment)("text-blue-600", !ctx_r0.isFullPayment);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.paymentTypeMessage, " ");
  }
}
var PartialDownpaymentModalComponent = class _PartialDownpaymentModalComponent {
  data;
  dialogRef;
  fb;
  downpaymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(data, dialogRef, fb, downpaymentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.downpaymentService = downpaymentService;
    this.interceptorService = interceptorService;
    const today = this.getLocalDateString(/* @__PURE__ */ new Date());
    this.form = this.fb.group({
      amount: ["", [Validators.required, Validators.min(0.01), this.maxAmountValidator.bind(this)]],
      payment_date: [today, Validators.required],
      payment_method: ["", Validators.required],
      reference_number: [""],
      notes: [""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
    this.form.get("amount")?.setValue(this.data.payment.amount_pending);
  }
  getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  maxAmountValidator(control) {
    if (!control.value)
      return null;
    const amount = parseFloat(control.value);
    if (amount > this.data.payment.amount_pending) {
      return { maxAmount: { max: this.data.payment.amount_pending, actual: amount } };
    }
    return null;
  }
  get amountPending() {
    return this.data.payment.amount_pending;
  }
  get isFullPayment() {
    const amount = parseFloat(this.form.get("amount")?.value || 0);
    return Math.abs(amount - this.amountPending) < 0.01;
  }
  get paymentTypeMessage() {
    return this.isFullPayment ? "Se marcar\xE1 como pagado completo" : "Se registrar\xE1 como pago parcial";
  }
  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos requeridos correctamente"
      });
      return;
    }
    this.saving.set(true);
    this.downpaymentService.registerPayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago de enganche registrado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al registrar el pago de enganche"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function PartialDownpaymentModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PartialDownpaymentModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(DownpaymentPaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PartialDownpaymentModalComponent, selectors: [["app-partial-downpayment-modal"]], features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 33, vars: 15, consts: [[1, "modal-container"], [1, "modal-header"], [1, "text-xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "font-semibold", "text-orange-600"], ["type", "button", 1, "close-button", 3, "click"], [3, "img", "size"], [1, "modal-body"], [1, "space-y-4", 3, "formGroup"], ["label", "Monto a Pagar", "type", "number", "placeholder", "Ingresa el monto", 3, "form_control"], ["class", "text-xs text-red-600 mt-1", 4, "ngIf"], ["class", "text-xs mt-1", 3, "text-green-600", "text-blue-600", 4, "ngIf"], ["label", "Fecha de Pago", "type", "date", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "text-red-500"], [3, "config"], ["label", "N\xFAmero de Referencia", "type", "text", "placeholder", "Ej: REF123456", 3, "form_control"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas adicionales sobre el pago de enganche...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "modal-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Registrar Pago", "custom_class", "btn_primary", 3, "clicked", "loading"], [1, "text-xs", "text-red-600", "mt-1"], [1, "text-xs", "mt-1"]], template: function PartialDownpaymentModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, "Registrar Pago de Enganche");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementStart(7, "span", 4);
      \u0275\u0275text(8);
      \u0275\u0275pipe(9, "currency");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "button", 5);
      \u0275\u0275listener("click", function PartialDownpaymentModalComponent_Template_button_click_10_listener() {
        return ctx.close();
      });
      \u0275\u0275element(11, "lucide-icon", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 7)(13, "form", 8)(14, "div");
      \u0275\u0275element(15, "app-input", 9);
      \u0275\u0275template(16, PartialDownpaymentModalComponent_p_16_Template, 3, 4, "p", 10)(17, PartialDownpaymentModalComponent_p_17_Template, 2, 5, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "app-input", 12);
      \u0275\u0275elementStart(19, "div")(20, "label", 13);
      \u0275\u0275text(21, " M\xE9todo de Pago ");
      \u0275\u0275elementStart(22, "span", 14);
      \u0275\u0275text(23, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(24, "app-select", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "app-input", 16);
      \u0275\u0275elementStart(26, "div")(27, "label", 13);
      \u0275\u0275text(28, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "textarea", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 18)(31, "app-button", 19);
      \u0275\u0275listener("clicked", function PartialDownpaymentModalComponent_Template_app_button_clicked_31_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "app-button", 20);
      \u0275\u0275listener("clicked", function PartialDownpaymentModalComponent_Template_app_button_clicked_32_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" Pago #", ctx.data.payment.payment_number, " - Monto pendiente: ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 12, ctx.amountPending, ctx.data.currency));
      \u0275\u0275advance(3);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(2);
      \u0275\u0275property("form_control", ctx.form.get("amount"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", (tmp_6_0 = ctx.form.get("amount")) == null ? null : tmp_6_0.hasError("maxAmount"));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.hasError("maxAmount")) && ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.value));
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.get("payment_date"));
      \u0275\u0275advance(6);
      \u0275\u0275property("config", ctx.paymentMethodSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.get("reference_number"));
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    CurrencyPipe
  ], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 8px;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.close-button[_ngcontent-%COMP%] {\n  padding: 4px;\n  color: #6b7280;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=partial-downpayment-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PartialDownpaymentModalComponent, [{
    type: Component,
    args: [{ selector: "app-partial-downpayment-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule
    ], providers: [DatePipe], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <div>\r
      <h2 class="text-xl font-semibold text-gray-800">Registrar Pago de Enganche</h2>\r
      <p class="text-sm text-gray-600 mt-1">\r
        Pago #{{ data.payment.payment_number }} - Monto pendiente:\r
        <span class="font-semibold text-orange-600">{{ amountPending | currency:data.currency }}</span>\r
      </p>\r
    </div>\r
    <button (click)="close()" class="close-button" type="button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <div class="modal-body">\r
    <form [formGroup]="form" class="space-y-4">\r
      <div>\r
        <app-input\r
          label="Monto a Pagar"\r
          type="number"\r
          placeholder="Ingresa el monto"\r
          [form_control]="form.get('amount')">\r
        </app-input>\r
        <p *ngIf="form.get('amount')?.hasError('maxAmount')" class="text-xs text-red-600 mt-1">\r
          El monto no puede exceder {{ amountPending | currency:data.currency }}\r
        </p>\r
        <p *ngIf="!form.get('amount')?.hasError('maxAmount') && form.get('amount')?.value" class="text-xs mt-1" [class.text-green-600]="isFullPayment" [class.text-blue-600]="!isFullPayment">\r
          {{ paymentTypeMessage }}\r
        </p>\r
      </div>\r
\r
      <app-input label="Fecha de Pago" type="date" [form_control]="form.get('payment_date')"></app-input>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">\r
          M\xE9todo de Pago <span class="text-red-500">*</span>\r
        </label>\r
        <app-select [config]="paymentMethodSelectConfig"></app-select>\r
      </div>\r
\r
      <app-input label="N\xFAmero de Referencia" type="text" placeholder="Ej: REF123456" [form_control]="form.get('reference_number')"></app-input>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas adicionales sobre el pago de enganche..."></textarea>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="modal-footer">\r
    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="close()"></app-button>\r
    <app-button text="Registrar Pago" custom_class="btn_primary" [loading]="saving()" (clicked)="save()"></app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/partial-downpayment-modal/partial-downpayment-modal.component.scss */\n.modal-container {\n  width: 600px;\n  max-width: 90vw;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 8px;\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 24px;\n  border-bottom: 1px solid #e5e7eb;\n}\n.close-button {\n  padding: 4px;\n  color: #6b7280;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 24px;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=partial-downpayment-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: DownpaymentPaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PartialDownpaymentModalComponent, { className: "PartialDownpaymentModalComponent", filePath: "src/app/features/contracts/components/partial-downpayment-modal/partial-downpayment-modal.component.ts", lineNumber: 29 });
})();

// src/app/features/contracts/components/edit-downpayment-payment-modal/edit-downpayment-payment-modal.component.ts
var EditDownpaymentPaymentModalComponent = class _EditDownpaymentPaymentModalComponent {
  data;
  dialogRef;
  fb;
  downpaymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(data, dialogRef, fb, downpaymentService, interceptorService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.fb = fb;
    this.downpaymentService = downpaymentService;
    this.interceptorService = interceptorService;
    const isPaid = this.data.payment.status === "pagado";
    this.form = this.fb.group({
      amount_paid: [this.data.payment.amount_paid || this.data.payment.amount, [Validators.required, Validators.min(0.01)]],
      paid_date: [this.data.payment.paid_date || "", isPaid ? Validators.required : []],
      payment_method: [this.data.payment.payment_method || "", isPaid ? Validators.required : []],
      notes: [this.data.payment.notes || ""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
  }
  save() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos requeridos"
      });
      return;
    }
    this.saving.set(true);
    this.downpaymentService.updatePayment(this.data.contractId, this.data.payment.id, this.form.value).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Pago de enganche actualizado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al actualizar el pago de enganche"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function EditDownpaymentPaymentModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EditDownpaymentPaymentModalComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(DownpaymentPaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditDownpaymentPaymentModalComponent, selectors: [["app-edit-downpayment-payment-modal"]], features: [\u0275\u0275ProvidersFeature([DatePipe])], decls: 31, vars: 15, consts: [[1, "dialog-container"], [1, "dialog-header"], [1, "dialog-title"], [1, "close-button", 3, "click"], [3, "img", "size"], [1, "dialog-content", 3, "formGroup"], [1, "mb-3", "p-2", "bg-blue-50", "rounded-lg", "border", "border-blue-200"], [1, "text-sm", "text-blue-900"], [1, "font-semibold"], [1, "space-y-4"], ["label", "Monto Pagado", "type", "number", 3, "form_control"], ["type", "date", 3, "label", "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [3, "config"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas adicionales sobre el pago de enganche...", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "dialog-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Guardar Cambios", "custom_class", "btn_primary", 3, "clicked", "loading"]], template: function EditDownpaymentPaymentModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function EditDownpaymentPaymentModalComponent_Template_button_click_4_listener() {
        return ctx.close();
      });
      \u0275\u0275element(5, "lucide-icon", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "p", 7)(9, "span", 8);
      \u0275\u0275text(10, "Estado:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 7)(13, "span", 8);
      \u0275\u0275text(14, "Vencimiento:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15);
      \u0275\u0275pipe(16, "localDate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 9);
      \u0275\u0275element(18, "app-input", 10)(19, "app-input", 11);
      \u0275\u0275elementStart(20, "div")(21, "label", 12);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "app-select", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div")(25, "label", 12);
      \u0275\u0275text(26, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(27, "textarea", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 15)(29, "app-button", 16);
      \u0275\u0275listener("clicked", function EditDownpaymentPaymentModalComponent_Template_app_button_clicked_29_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "app-button", 17);
      \u0275\u0275listener("clicked", function EditDownpaymentPaymentModalComponent_Template_app_button_clicked_30_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Editar Pago Enganche #", ctx.data.payment.payment_number);
      \u0275\u0275advance(2);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.data.payment.status);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(16, 12, ctx.data.payment.due_date, "mediumDate"));
      \u0275\u0275advance(3);
      \u0275\u0275property("form_control", ctx.form.controls["amount_paid"]);
      \u0275\u0275advance();
      \u0275\u0275property("label", "Fecha de Pago" + (ctx.data.payment.status === "pagado" ? " *" : ""))("form_control", ctx.form.controls["paid_date"]);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" M\xE9todo de Pago ", ctx.data.payment.status === "pagado" ? "*" : "", " ");
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.paymentMethodSelectConfig);
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent,
    LocalDatePipe
  ], styles: ["\n\n.dialog-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 500px;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=edit-downpayment-payment-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditDownpaymentPaymentModalComponent, [{
    type: Component,
    args: [{ selector: "app-edit-downpayment-payment-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule,
      LocalDatePipe
    ], providers: [DatePipe], template: `<div class="dialog-container">\r
  <div class="dialog-header">\r
    <h2 class="dialog-title">Editar Pago Enganche #{{ data.payment.payment_number }}</h2>\r
    <button (click)="close()" class="close-button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <div class="dialog-content" [formGroup]="form">\r
    <div class="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">\r
      <p class="text-sm text-blue-900"><span class="font-semibold">Estado:</span> {{ data.payment.status }}</p>\r
      <p class="text-sm text-blue-900"><span class="font-semibold">Vencimiento:</span> {{ data.payment.due_date | localDate:'mediumDate' }}</p>\r
    </div>\r
\r
    <div class="space-y-4">\r
      <app-input label="Monto Pagado" type="number" [form_control]="form.controls['amount_paid']"></app-input>\r
\r
      <app-input\r
        [label]="'Fecha de Pago' + (data.payment.status === 'pagado' ? ' *' : '')"\r
        type="date"\r
        [form_control]="form.controls['paid_date']">\r
      </app-input>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">\r
          M\xE9todo de Pago {{ data.payment.status === 'pagado' ? '*' : '' }}\r
        </label>\r
        <app-select [config]="paymentMethodSelectConfig"></app-select>\r
      </div>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas adicionales sobre el pago de enganche..."></textarea>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <div class="dialog-footer">\r
    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="close()"></app-button>\r
    <app-button text="Guardar Cambios" custom_class="btn_primary" [loading]="saving()" (clicked)="save()"></app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/edit-downpayment-payment-modal/edit-downpayment-payment-modal.component.scss */\n.dialog-container {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  width: 100dvw;\n  max-width: 500px;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-title {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #6b7280;\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s;\n}\n.close-button:hover {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.dialog-content {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=edit-downpayment-payment-modal.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: FormBuilder }, { type: DownpaymentPaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditDownpaymentPaymentModalComponent, { className: "EditDownpaymentPaymentModalComponent", filePath: "src/app/features/contracts/components/edit-downpayment-payment-modal/edit-downpayment-payment-modal.component.ts", lineNumber: 31 });
})();

// src/app/features/contracts/components/generate-downpayment-dialog/generate-downpayment-dialog.component.ts
function GenerateDownpaymentDialogComponent_p_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Saldo a cuotizar: ", \u0275\u0275pipeBind2(2, 1, ctx_r0.remainingToSchedule, ctx_r0.data.contract.currency), " ");
  }
}
var GenerateDownpaymentDialogComponent = class _GenerateDownpaymentDialogComponent {
  dialogRef;
  data;
  fb;
  form;
  generating = signal(false, ...ngDevMode ? [{ debugName: "generating" }] : []);
  constructor(dialogRef, data, fb) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.fb = fb;
    const target = data.contract.down_payment_target ?? data.contract.down_payment ?? null;
    this.form = this.fb.group({
      down_payment_target: [target, [Validators.required, Validators.min(0.01)]],
      down_payment_months: [data.contract.down_payment_months || 8, [Validators.required, Validators.min(1)]],
      first_payment_date: [
        data.contract.down_payment_first_payment_date || data.contract.first_payment_date || "",
        Validators.required
      ],
      payment_day: [data.contract.down_payment_payment_day || 5, [Validators.min(1), Validators.max(31)]]
    });
  }
  get appliedAmount() {
    return this.data.appliedAmount ?? this.data.contract.down_payment ?? 0;
  }
  get remainingToSchedule() {
    const target = Number(this.form.get("down_payment_target")?.value) || 0;
    return Math.max(0, target - this.appliedAmount);
  }
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  static \u0275fac = function GenerateDownpaymentDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GenerateDownpaymentDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(FormBuilder));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GenerateDownpaymentDialogComponent, selectors: [["app-generate-downpayment-dialog"]], decls: 44, vars: 11, consts: [[1, "dialog-overlay"], [1, "dialog-container"], [1, "dialog-header"], [1, "text-xl", "font-semibold", "text-gray-900"], ["type", "button", 1, "text-gray-400", "hover:text-gray-600", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "dialog-body"], [1, "text-sm", "text-gray-600", "mb-4"], [1, "space-y-4"], ["for", "down_payment_target", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "relative"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-gray-500", "text-sm"], ["id", "down_payment_target", "type", "number", "step", "0.01", "min", "0.01", "formControlName", "down_payment_target", 1, "w-full", "rounded-lg", "border", "border-gray-300", "pl-7", "pr-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], ["class", "mt-1 text-xs text-blue-700", 4, "ngIf"], ["for", "down_payment_months", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "down_payment_months", "type", "number", "min", "1", "step", "1", "formControlName", "down_payment_months", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], ["for", "first_payment_date", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "first_payment_date", "type", "date", "formControlName", "first_payment_date", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], ["for", "payment_day", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["id", "payment_day", "type", "number", "min", "1", "max", "31", "step", "1", "formControlName", "payment_day", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:border-blue-500", "focus:outline-none"], [1, "dialog-footer"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "hover:bg-gray-50", 3, "click"], ["type", "submit", 1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-green-600", "rounded-lg", "hover:bg-green-700", "disabled:opacity-50", 3, "disabled"], [1, "mt-1", "text-xs", "text-blue-700"]], template: function GenerateDownpaymentDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Generar cuotas del saldo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 4);
      \u0275\u0275listener("click", function GenerateDownpaymentDialogComponent_Template_button_click_5_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(6, "\u2715");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 5);
      \u0275\u0275listener("ngSubmit", function GenerateDownpaymentDialogComponent_Template_form_ngSubmit_7_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(8, "div", 6)(9, "p", 7);
      \u0275\u0275text(10, " Contrato ");
      \u0275\u0275elementStart(11, "strong");
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275text(13, ". Abonado hasta ahora: ");
      \u0275\u0275elementStart(14, "strong");
      \u0275\u0275text(15);
      \u0275\u0275pipe(16, "currency");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, ". ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 8)(19, "div")(20, "label", 9);
      \u0275\u0275text(21, " Meta total de enganche * ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 10)(23, "span", 11);
      \u0275\u0275text(24, "$");
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "input", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275template(26, GenerateDownpaymentDialogComponent_p_26_Template, 3, 4, "p", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "label", 14);
      \u0275\u0275text(29, "Meses *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "label", 16);
      \u0275\u0275text(33, "Fecha primer pago *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "input", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div")(36, "label", 18);
      \u0275\u0275text(37, "D\xEDa de pago mensual");
      \u0275\u0275elementEnd();
      \u0275\u0275element(38, "input", 19);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "div", 20)(40, "button", 21);
      \u0275\u0275listener("click", function GenerateDownpaymentDialogComponent_Template_button_click_40_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(41, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "button", 22);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.data.contract.contract_number);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 8, ctx.appliedAmount, ctx.data.contract.currency));
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-red-500", ((tmp_3_0 = ctx.form.get("down_payment_target")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("down_payment_target")) == null ? null : tmp_3_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.remainingToSchedule > 0);
      \u0275\u0275advance(16);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.generating());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.generating() ? "Generando..." : "Generar cuotas", " ");
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName, CurrencyPipe], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 500px;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=generate-downpayment-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GenerateDownpaymentDialogComponent, [{
    type: Component,
    args: [{ selector: "app-generate-downpayment-dialog", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `
    <div class="dialog-overlay">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2 class="text-xl font-semibold text-gray-900">Generar cuotas del saldo</h2>
          <button type="button" (click)="closeDialog()" class="text-gray-400 hover:text-gray-600">\u2715</button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="dialog-body">
            <p class="text-sm text-gray-600 mb-4">
              Contrato <strong>{{ data.contract.contract_number }}</strong>.
              Abonado hasta ahora:
              <strong>{{ appliedAmount | currency:data.contract.currency }}</strong>.
            </p>

            <div class="space-y-4">
              <div>
                <label for="down_payment_target" class="block text-sm font-medium text-gray-700 mb-1">
                  Meta total de enganche *
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    id="down_payment_target"
                    type="number"
                    step="0.01"
                    min="0.01"
                    formControlName="down_payment_target"
                    class="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    [class.border-red-500]="form.get('down_payment_target')?.invalid && form.get('down_payment_target')?.touched">
                </div>
                <p *ngIf="remainingToSchedule > 0" class="mt-1 text-xs text-blue-700">
                  Saldo a cuotizar: {{ remainingToSchedule | currency:data.contract.currency }}
                </p>
              </div>

              <div>
                <label for="down_payment_months" class="block text-sm font-medium text-gray-700 mb-1">Meses *</label>
                <input
                  id="down_payment_months"
                  type="number"
                  min="1"
                  step="1"
                  formControlName="down_payment_months"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              </div>

              <div>
                <label for="first_payment_date" class="block text-sm font-medium text-gray-700 mb-1">Fecha primer pago *</label>
                <input
                  id="first_payment_date"
                  type="date"
                  formControlName="first_payment_date"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              </div>

              <div>
                <label for="payment_day" class="block text-sm font-medium text-gray-700 mb-1">D\xEDa de pago mensual</label>
                <input
                  id="payment_day"
                  type="number"
                  min="1"
                  max="31"
                  step="1"
                  formControlName="payment_day"
                  class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              </div>
            </div>
          </div>

          <div class="dialog-footer">
            <button type="button" (click)="closeDialog()" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || generating()"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50">
              {{ generating() ? 'Generando...' : 'Generar cuotas' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;428d812e35f2b4caa5d87ddcebc3177b2c117d3517a0391f78f6aabea741ec20;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/contracts/components/generate-downpayment-dialog/generate-downpayment-dialog.component.ts */\n.dialog-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.dialog-container {\n  background: white;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 500px;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.dialog-body {\n  padding: 1.5rem;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n/*# sourceMappingURL=generate-downpayment-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: FormBuilder }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GenerateDownpaymentDialogComponent, { className: "GenerateDownpaymentDialogComponent", filePath: "src/app/features/contracts/components/generate-downpayment-dialog/generate-downpayment-dialog.component.ts", lineNumber: 105 });
})();

// src/app/features/contracts/components/add-manual-downpayment-dialog/add-manual-downpayment-dialog.component.ts
function AddManualDownpaymentDialogComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-input", 18);
    \u0275\u0275elementStart(1, "div")(2, "label", 13);
    \u0275\u0275text(3, " M\xE9todo de pago ");
    \u0275\u0275elementStart(4, "span", 19);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "app-select", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("form_control", ctx_r0.form.get("payment_date"));
    \u0275\u0275advance(6);
    \u0275\u0275property("config", ctx_r0.paymentMethodSelectConfig);
  }
}
var AddManualDownpaymentDialogComponent = class _AddManualDownpaymentDialogComponent {
  dialogRef;
  data;
  fb;
  downpaymentService;
  interceptorService;
  X = X;
  form;
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  paymentMethodSelectConfig = {
    placeholder: "Selecciona un m\xE9todo",
    data: [
      { value: "transferencia", label: "Transferencia" },
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "cheque", label: "Cheque" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(dialogRef, data, fb, downpaymentService, interceptorService) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.fb = fb;
    this.downpaymentService = downpaymentService;
    this.interceptorService = interceptorService;
    const today = this.getLocalDateString(/* @__PURE__ */ new Date());
    this.form = this.fb.group({
      amount: ["", [Validators.required, Validators.min(0.01)]],
      due_date: [today, Validators.required],
      record_as_paid: [true],
      payment_method: ["efectivo"],
      payment_date: [today],
      reference_number: [""],
      notes: [""]
    });
    this.paymentMethodSelectConfig.form_control = this.form.get("payment_method");
    this.applyRecordAsPaidRules(!!this.form.get("record_as_paid").value);
    this.form.get("record_as_paid").valueChanges.subscribe((v) => this.applyRecordAsPaidRules(!!v));
  }
  getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  applyRecordAsPaidRules(recordAsPaid) {
    const method = this.form.get("payment_method");
    const paymentDate = this.form.get("payment_date");
    if (recordAsPaid) {
      method.setValidators([Validators.required]);
      paymentDate.setValidators([Validators.required]);
    } else {
      method.clearValidators();
      paymentDate.clearValidators();
    }
    method.updateValueAndValidity({ emitEvent: false });
    paymentDate.updateValueAndValidity({ emitEvent: false });
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa los campos requeridos"
      });
      return;
    }
    const raw = this.form.value;
    const payload = {
      amount: Number(raw.amount),
      due_date: raw.due_date,
      record_as_paid: !!raw.record_as_paid
    };
    if (raw.record_as_paid) {
      payload["payment_method"] = raw.payment_method;
      payload["payment_date"] = raw.payment_date;
    }
    if (raw.reference_number)
      payload["reference_number"] = raw.reference_number;
    if (raw.notes)
      payload["notes"] = raw.notes;
    this.saving.set(true);
    this.downpaymentService.createManualPayment(this.data.contractId, payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Abono de enganche registrado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo registrar el abono"
        });
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  static \u0275fac = function AddManualDownpaymentDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AddManualDownpaymentDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(DownpaymentPaymentService), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AddManualDownpaymentDialogComponent, selectors: [["app-add-manual-downpayment-dialog"]], decls: 25, vars: 8, consts: [[1, "modal-container"], [1, "modal-header"], [1, "text-xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-600", "mt-1"], ["type", "button", 1, "close-button", 3, "click"], [3, "img", "size"], [1, "modal-body"], [1, "space-y-4", 3, "formGroup"], ["label", "Monto *", "type", "number", "placeholder", "Ej. 200", 3, "form_control"], ["label", "Fecha de vencimiento *", "type", "date", 3, "form_control"], [1, "flex", "items-center", "gap-2", "text-sm", "text-gray-700"], ["type", "checkbox", "formControlName", "record_as_paid", 1, "rounded", "border-gray-300"], ["label", "N\xFAmero de referencia", "type", "text", "placeholder", "Opcional", 3, "form_control"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["formControlName", "notes", "rows", "3", "placeholder", "Notas opcionales", 1, "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent"], [1, "modal-footer"], ["text", "Cancelar", "custom_class", "btn_secondary", 3, "clicked"], ["text", "Registrar abono", "custom_class", "btn_primary", 3, "clicked", "loading"], ["label", "Fecha de pago *", "type", "date", 3, "form_control"], [1, "text-red-500"], [3, "config"]], template: function AddManualDownpaymentDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
      \u0275\u0275text(4, "Agregar abono manual");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Registra un abono de enganche antes de definir cuotas programadas.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function AddManualDownpaymentDialogComponent_Template_button_click_7_listener() {
        return ctx.close();
      });
      \u0275\u0275element(8, "lucide-icon", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 6)(10, "form", 7);
      \u0275\u0275element(11, "app-input", 8)(12, "app-input", 9);
      \u0275\u0275elementStart(13, "label", 10);
      \u0275\u0275element(14, "input", 11);
      \u0275\u0275text(15, " Registrar como pagado ahora ");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, AddManualDownpaymentDialogComponent_Conditional_16_Template, 7, 2);
      \u0275\u0275element(17, "app-input", 12);
      \u0275\u0275elementStart(18, "div")(19, "label", 13);
      \u0275\u0275text(20, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(21, "textarea", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 15)(23, "app-button", 16);
      \u0275\u0275listener("clicked", function AddManualDownpaymentDialogComponent_Template_app_button_clicked_23_listener() {
        return ctx.close();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "app-button", 17);
      \u0275\u0275listener("clicked", function AddManualDownpaymentDialogComponent_Template_app_button_clicked_24_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.get("amount"));
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.get("due_date"));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(((tmp_5_0 = ctx.form.get("record_as_paid")) == null ? null : tmp_5_0.value) ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("form_control", ctx.form.get("reference_number"));
      \u0275\u0275advance(7);
      \u0275\u0275property("loading", ctx.saving());
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    CheckboxControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    LucideAngularModule,
    LucideAngularComponent
  ], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.modal-header[_ngcontent-%COMP%], \n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  border-bottom: 0;\n  border-top: 1px solid #e5e7eb;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  overflow-y: auto;\n}\n.close-button[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n/*# sourceMappingURL=add-manual-downpayment-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AddManualDownpaymentDialogComponent, [{
    type: Component,
    args: [{ selector: "app-add-manual-downpayment-dialog", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      LucideAngularModule
    ], template: `<div class="modal-container">\r
  <div class="modal-header">\r
    <div>\r
      <h2 class="text-xl font-semibold text-gray-800">Agregar abono manual</h2>\r
      <p class="text-sm text-gray-600 mt-1">Registra un abono de enganche antes de definir cuotas programadas.</p>\r
    </div>\r
    <button (click)="close()" class="close-button" type="button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <div class="modal-body">\r
    <form [formGroup]="form" class="space-y-4">\r
      <app-input\r
        label="Monto *"\r
        type="number"\r
        placeholder="Ej. 200"\r
        [form_control]="form.get('amount')">\r
      </app-input>\r
\r
      <app-input\r
        label="Fecha de vencimiento *"\r
        type="date"\r
        [form_control]="form.get('due_date')">\r
      </app-input>\r
\r
      <label class="flex items-center gap-2 text-sm text-gray-700">\r
        <input type="checkbox" formControlName="record_as_paid" class="rounded border-gray-300" />\r
        Registrar como pagado ahora\r
      </label>\r
\r
      @if (form.get('record_as_paid')?.value) {\r
        <app-input\r
          label="Fecha de pago *"\r
          type="date"\r
          [form_control]="form.get('payment_date')">\r
        </app-input>\r
\r
        <div>\r
          <label class="block text-sm font-medium text-gray-700 mb-1">\r
            M\xE9todo de pago <span class="text-red-500">*</span>\r
          </label>\r
          <app-select [config]="paymentMethodSelectConfig"></app-select>\r
        </div>\r
      }\r
\r
      <app-input\r
        label="N\xFAmero de referencia"\r
        type="text"\r
        placeholder="Opcional"\r
        [form_control]="form.get('reference_number')">\r
      </app-input>\r
\r
      <div>\r
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>\r
        <textarea\r
          formControlName="notes"\r
          rows="3"\r
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"\r
          placeholder="Notas opcionales"></textarea>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <div class="modal-footer">\r
    <app-button text="Cancelar" custom_class="btn_secondary" (clicked)="close()"></app-button>\r
    <app-button text="Registrar abono" custom_class="btn_primary" [loading]="saving()" (clicked)="save()"></app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/add-manual-downpayment-dialog/add-manual-downpayment-dialog.component.scss */\n.modal-container {\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n}\n.modal-header,\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-footer {\n  border-bottom: 0;\n  border-top: 1px solid #e5e7eb;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n.modal-body {\n  padding: 1.25rem;\n  overflow-y: auto;\n}\n.close-button {\n  color: #6b7280;\n}\n/*# sourceMappingURL=add-manual-downpayment-dialog.component.css.map */\n"] }]
  }], () => [{ type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: FormBuilder }, { type: DownpaymentPaymentService }, { type: InterceptorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AddManualDownpaymentDialogComponent, { className: "AddManualDownpaymentDialogComponent", filePath: "src/app/features/contracts/components/add-manual-downpayment-dialog/add-manual-downpayment-dialog.component.ts", lineNumber: 27 });
})();

// src/app/features/contracts/components/contract-downpayment-payments/contract-downpayment-payments.component.ts
function ContractDownpaymentPaymentsComponent_app_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 11);
    \u0275\u0275listener("clicked", function ContractDownpaymentPaymentsComponent_app_button_2_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addManualPayment());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", ctx_r1.Plus);
  }
}
function ContractDownpaymentPaymentsComponent_app_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-button", 12);
    \u0275\u0275listener("clicked", function ContractDownpaymentPaymentsComponent_app_button_3_Template_app_button_clicked_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generateInstallments());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("loading", ctx_r1.generating());
  }
}
function ContractDownpaymentPaymentsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14);
    \u0275\u0275text(2, "DP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 15);
    \u0275\u0275text(4, "Enganche no financiado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 16);
    \u0275\u0275text(6, " Activa el financiamiento de enganche al crear el contrato para registrar abonos y cuotas aqu\xED. ");
    \u0275\u0275elementEnd()();
  }
}
function ContractDownpaymentPaymentsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "p", 19);
    \u0275\u0275text(3, "Meta de enganche");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 20);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 21)(8, "p", 22);
    \u0275\u0275text(9, "Abonado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 23);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 24)(14, "p", 25);
    \u0275\u0275text(15, "Pendiente de meta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 26);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 27)(20, "p", 28);
    \u0275\u0275text(21, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 29);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.targetAmount != null ? \u0275\u0275pipeBind2(6, 4, ctx_r1.targetAmount, ctx_r1.currency) : "Sin definir", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 7, ctx_r1.appliedAmount, ctx_r1.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r1.targetAmount != null ? \u0275\u0275pipeBind2(18, 10, ctx_r1.targetAmount - ctx_r1.appliedAmount, ctx_r1.currency) : "\u2014", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ((tmp_4_0 = ctx_r1.stats()) == null ? null : tmp_4_0.downpayment_financing_complete) ? "Enganche liquidado" : "En proceso", " ");
  }
}
function ContractDownpaymentPaymentsComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "p", 32);
    \u0275\u0275text(3, "Total pagos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 34)(7, "p", 35);
    \u0275\u0275text(8, "Pagados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 36);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 37)(12, "p", 38);
    \u0275\u0275text(13, "Parciales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 39);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 40)(17, "p", 41);
    \u0275\u0275text(18, "Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "p", 42);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 43)(22, "p", 44);
    \u0275\u0275text(23, "Vencidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 45);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().total_payments);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().paid_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().partial_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().pending_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.stats().overdue_count);
  }
}
function ContractDownpaymentPaymentsComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46)(1, "p", 47);
    \u0275\u0275text(2, "Cargando pagos de enganche...");
    \u0275\u0275elementEnd()();
  }
}
function ContractDownpaymentPaymentsComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "div", 14);
    \u0275\u0275text(2, "DP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 15);
    \u0275\u0275text(4, "Sin movimientos de enganche");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 16);
    \u0275\u0275text(6, " Registra abonos manuales mientras acuerdan el monto. Cuando tengan la meta total, genera las cuotas del saldo restante. ");
    \u0275\u0275elementEnd()();
  }
}
function ContractDownpaymentPaymentsComponent_div_9_tr_23_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 67);
    \u0275\u0275listener("click", function ContractDownpaymentPaymentsComponent_div_9_tr_23_button_25_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const payment_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.registerPayment(payment_r6));
    });
    \u0275\u0275element(1, "lucide-icon", 65);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Registrar Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.DollarSign)("size", 16);
  }
}
function ContractDownpaymentPaymentsComponent_div_9_tr_23_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 68);
    \u0275\u0275listener("click", function ContractDownpaymentPaymentsComponent_div_9_tr_23_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const payment_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editPayment(payment_r6));
    });
    \u0275\u0275element(1, "lucide-icon", 65);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Editar Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Edit)("size", 16);
  }
}
function ContractDownpaymentPaymentsComponent_div_9_tr_23_button_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 69);
    \u0275\u0275listener("click", function ContractDownpaymentPaymentsComponent_div_9_tr_23_button_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const payment_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.resetPayment(payment_r6));
    });
    \u0275\u0275element(1, "lucide-icon", 65);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("matTooltip", "Resetear Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.RotateCcw)("size", 16);
  }
}
function ContractDownpaymentPaymentsComponent_div_9_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 55)(1, "td", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 57);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 57);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 57);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 58);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "localDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 58);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "localDate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 59)(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 58);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 59)(24, "div", 60);
    \u0275\u0275template(25, ContractDownpaymentPaymentsComponent_div_9_tr_23_button_25_Template, 2, 3, "button", 61)(26, ContractDownpaymentPaymentsComponent_div_9_tr_23_button_26_Template, 2, 3, "button", 62)(27, ContractDownpaymentPaymentsComponent_div_9_tr_23_button_27_Template, 2, 3, "button", 63);
    \u0275\u0275elementStart(28, "button", 64);
    \u0275\u0275listener("click", function ContractDownpaymentPaymentsComponent_div_9_tr_23_Template_button_click_28_listener() {
      const payment_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelPayment(payment_r6));
    });
    \u0275\u0275element(29, "lucide-icon", 65);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 66);
    \u0275\u0275listener("click", function ContractDownpaymentPaymentsComponent_div_9_tr_23_Template_button_click_30_listener() {
      const payment_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deletePayment(payment_r6));
    });
    \u0275\u0275element(31, "lucide-icon", 65);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const payment_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r6.payment_number);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 19, payment_r6.amount, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 22, payment_r6.amount_paid, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 25, payment_r6.amount_pending, ctx_r1.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 28, payment_r6.due_date, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(payment_r6.paid_date ? \u0275\u0275pipeBind2(17, 31, payment_r6.paid_date, "mediumDate") : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getStatusClass(payment_r6.status, payment_r6.is_overdue));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getStatusLabel(payment_r6.status, payment_r6.is_overdue), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r6.payment_method || "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.canRegisterPayment(payment_r6));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canEdit(payment_r6));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.canResetPayment(payment_r6));
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", "Cancelar Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.RotateCcw)("size", 16);
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", "Eliminar Pago");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r1.Trash2)("size", 16);
  }
}
function ContractDownpaymentPaymentsComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "table", 50)(2, "thead", 51)(3, "tr")(4, "th", 52);
    \u0275\u0275text(5, "#");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 52);
    \u0275\u0275text(7, "Monto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 52);
    \u0275\u0275text(9, "Pagado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 52);
    \u0275\u0275text(11, "Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 52);
    \u0275\u0275text(13, "Vencimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 52);
    \u0275\u0275text(15, "Fecha Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 52);
    \u0275\u0275text(17, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 52);
    \u0275\u0275text(19, "M\xE9todo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 52);
    \u0275\u0275text(21, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody", 53);
    \u0275\u0275template(23, ContractDownpaymentPaymentsComponent_div_9_tr_23_Template, 32, 34, "tr", 54);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx_r1.paginatedPayments);
  }
}
function ContractDownpaymentPaymentsComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "div", 71);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 72)(4, "button", 73);
    \u0275\u0275listener("click", function ContractDownpaymentPaymentsComponent_div_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPage(ctx_r1.currentPage() - 1));
    });
    \u0275\u0275text(5, "Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 74);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 73);
    \u0275\u0275listener("click", function ContractDownpaymentPaymentsComponent_div_10_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPage(ctx_r1.currentPage() + 1));
    });
    \u0275\u0275text(9, "Siguiente");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Mostrando ", (ctx_r1.currentPage() - 1) * ctx_r1.pageSize + 1, " - ", ctx_r1.Math.min(ctx_r1.currentPage() * ctx_r1.pageSize, ctx_r1.payments().length), " de ", ctx_r1.payments().length, " pagos ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.currentPage() === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("P\xE1gina ", ctx_r1.currentPage(), " / ", ctx_r1.totalPages);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() === ctx_r1.totalPages);
  }
}
var ContractDownpaymentPaymentsComponent = class _ContractDownpaymentPaymentsComponent {
  downpaymentService;
  interceptorService;
  dialog;
  contractId;
  currency = "USD";
  contract = null;
  dataChanged = new EventEmitter();
  payments = signal([], ...ngDevMode ? [{ debugName: "payments" }] : []);
  stats = signal(null, ...ngDevMode ? [{ debugName: "stats" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  generating = signal(false, ...ngDevMode ? [{ debugName: "generating" }] : []);
  currentPage = signal(1, ...ngDevMode ? [{ debugName: "currentPage" }] : []);
  pageSize = 20;
  Math = Math;
  DollarSign = DollarSign;
  Edit = SquarePen;
  RotateCcw = RotateCcw;
  Trash2 = Trash2;
  Plus = Plus;
  constructor(downpaymentService, interceptorService, dialog) {
    this.downpaymentService = downpaymentService;
    this.interceptorService = interceptorService;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadPayments();
    this.loadStats();
  }
  get isFinanced() {
    return !!this.contract?.down_payment_financed;
  }
  get appliedAmount() {
    return this.stats()?.down_payment_applied ?? this.contract?.down_payment ?? 0;
  }
  get targetAmount() {
    const fromStats = this.stats()?.down_payment_target;
    if (fromStats != null)
      return fromStats;
    return this.contract?.down_payment_target ?? null;
  }
  get showGenerateInstallmentsButton() {
    return this.isFinanced && !this.stats()?.downpayment_financing_complete;
  }
  get totalPages() {
    return Math.max(1, Math.ceil(this.payments().length / this.pageSize));
  }
  get paginatedPayments() {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.payments().slice(start, start + this.pageSize);
  }
  setPage(page) {
    if (page < 1 || page > this.totalPages)
      return;
    this.currentPage.set(page);
  }
  loadPayments() {
    this.loading.set(true);
    this.downpaymentService.getPayments(this.contractId).subscribe({
      next: (payments) => {
        this.payments.set(payments);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los pagos de enganche"
        });
      }
    });
  }
  loadStats() {
    this.downpaymentService.getStats(this.contractId).subscribe({
      next: (stats) => this.stats.set(stats),
      error: () => {
      }
    });
  }
  addManualPayment() {
    const dialogRef = this.dialog.open(AddManualDownpaymentDialogComponent, {
      width: "520px",
      data: { contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result)
        return;
      this.loadPayments();
      this.loadStats();
      this.dataChanged.emit();
    });
  }
  generateInstallments() {
    if (!this.contract)
      return;
    const dialogRef = this.dialog.open(GenerateDownpaymentDialogComponent, {
      width: "520px",
      data: { contract: this.contract, appliedAmount: this.appliedAmount }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result)
        return;
      const target = Number(result.down_payment_target);
      if (!target || target <= 0) {
        this.interceptorService.openSnackbar({
          type: "warning",
          title: "Advertencia",
          message: "La meta de enganche debe ser mayor a 0"
        });
        return;
      }
      if (target <= this.appliedAmount) {
        this.interceptorService.openSnackbar({
          type: "warning",
          title: "Advertencia",
          message: "La meta debe ser mayor al monto ya abonado"
        });
        return;
      }
      this.generating.set(true);
      this.downpaymentService.generate(this.contractId, {
        down_payment_target: target,
        down_payment_months: Number(result.down_payment_months),
        first_payment_date: result.first_payment_date,
        payment_day: Number(result.payment_day) || 5
      }).subscribe({
        next: () => {
          this.generating.set(false);
          this.loadPayments();
          this.loadStats();
          this.dataChanged.emit();
          this.interceptorService.openSnackbar({
            type: "success",
            title: "\xC9xito",
            message: "Cuotas de enganche generadas correctamente"
          });
        },
        error: (err) => {
          this.generating.set(false);
          this.interceptorService.openSnackbar({
            type: "error",
            title: "Error",
            message: err.error?.message || "No se pudieron generar las cuotas de enganche"
          });
        }
      });
    });
  }
  registerPayment(payment) {
    const dialogRef = this.dialog.open(PartialDownpaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
  editPayment(payment) {
    const dialogRef = this.dialog.open(EditDownpaymentPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
  cancelPayment(payment) {
    if (!confirm(`\xBFCancelar el pago de enganche #${payment.payment_number}?`))
      return;
    this.downpaymentService.cancelPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo cancelar el pago de enganche"
        });
      }
    });
  }
  resetPayment(payment) {
    if (!confirm(`\xBFResetear el pago de enganche #${payment.payment_number}?`))
      return;
    this.downpaymentService.resetPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo resetear el pago de enganche"
        });
      }
    });
  }
  deletePayment(payment) {
    if (!confirm(`\xBFEliminar permanentemente el pago de enganche #${payment.payment_number}?`))
      return;
    this.downpaymentService.deletePayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "No se pudo eliminar el pago de enganche"
        });
      }
    });
  }
  canRegisterPayment(payment) {
    return payment.status === "pendiente" || payment.status === "parcial";
  }
  canResetPayment(payment) {
    return payment.status === "pagado" || payment.status === "parcial";
  }
  canEdit(payment) {
    return payment.status !== "cancelado";
  }
  getStatusClass(status, isOverdue = false) {
    const baseClass = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ";
    if (isOverdue && (status === "pendiente" || status === "parcial")) {
      return baseClass + "bg-red-500 text-white shadow-sm";
    }
    const statusMap = {
      pendiente: "bg-amber-500 text-white shadow-sm",
      pagado: "bg-emerald-500 text-white shadow-sm",
      parcial: "bg-blue-500 text-white shadow-sm",
      cancelado: "bg-gray-500 text-white shadow-sm"
    };
    return baseClass + (statusMap[status] || "bg-gray-500 text-white shadow-sm");
  }
  getStatusLabel(status, isOverdue = false) {
    if (status === "parcial" && isOverdue)
      return "Parcial Vencido";
    if (status === "pendiente" && isOverdue)
      return "Pendiente Vencido";
    if (status === "parcial")
      return "Parcial";
    if (status === "pendiente")
      return "Pendiente";
    if (status === "pagado")
      return "Pagado";
    if (status === "cancelado")
      return "Cancelado";
    return status;
  }
  static \u0275fac = function ContractDownpaymentPaymentsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractDownpaymentPaymentsComponent)(\u0275\u0275directiveInject(DownpaymentPaymentService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractDownpaymentPaymentsComponent, selectors: [["app-contract-downpayment-payments"]], inputs: { contractId: "contractId", currency: "currency", contract: "contract" }, outputs: { dataChanged: "dataChanged" }, decls: 11, vars: 9, consts: [[1, "downpayments-container"], [1, "flex", "items-center", "justify-end", "mb-2", "gap-2"], ["text", "Agregar abono manual", "custom_class", "btn_secondary", "size", "sm", 3, "icon", "clicked", 4, "ngIf"], ["text", "Generar cuotas del saldo", "custom_class", "btn_primary", "size", "sm", 3, "loading", "clicked", 4, "ngIf"], ["class", "empty-state empty-state--neutral", 4, "ngIf"], ["class", "mb-4 grid grid-cols-2 md:grid-cols-4 gap-3", 4, "ngIf"], ["class", "grid grid-cols-5 gap-4 mb-6 w-full", 4, "ngIf"], ["class", "text-center py-8", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "overflow-x-auto", 4, "ngIf"], ["class", "payments-pagination", 4, "ngIf"], ["text", "Agregar abono manual", "custom_class", "btn_secondary", "size", "sm", 3, "clicked", "icon"], ["text", "Generar cuotas del saldo", "custom_class", "btn_primary", "size", "sm", 3, "clicked", "loading"], [1, "empty-state", "empty-state--neutral"], [1, "empty-state__icon"], [1, "empty-state__title"], [1, "empty-state__subtitle"], [1, "mb-4", "grid", "grid-cols-2", "md:grid-cols-4", "gap-3"], [1, "bg-amber-50", "p-3", "rounded-lg", "border", "border-amber-200"], [1, "text-xs", "font-medium", "text-amber-700"], [1, "text-lg", "font-bold", "text-amber-900", "mt-1"], [1, "bg-green-50", "p-3", "rounded-lg", "border", "border-green-200"], [1, "text-xs", "font-medium", "text-green-700"], [1, "text-lg", "font-bold", "text-green-800", "mt-1"], [1, "bg-blue-50", "p-3", "rounded-lg", "border", "border-blue-200"], [1, "text-xs", "font-medium", "text-blue-700"], [1, "text-lg", "font-bold", "text-blue-800", "mt-1"], [1, "bg-gray-50", "p-3", "rounded-lg", "border", "border-gray-200"], [1, "text-xs", "font-medium", "text-gray-600"], [1, "text-sm", "font-semibold", "text-gray-900", "mt-1"], [1, "grid", "grid-cols-5", "gap-4", "mb-6", "w-full"], [1, "bg-gray-50", "p-4", "rounded-lg", "border", "border-gray-200"], [1, "text-sm", "font-medium", "text-gray-600"], [1, "text-2xl", "font-bold", "text-gray-900", "mt-1"], [1, "bg-green-50", "p-4", "rounded-lg", "border", "border-green-200"], [1, "text-sm", "font-medium", "text-green-700"], [1, "text-2xl", "font-bold", "text-green-800", "mt-1"], [1, "bg-blue-50", "p-4", "rounded-lg", "border", "border-blue-200"], [1, "text-sm", "font-medium", "text-blue-700"], [1, "text-2xl", "font-bold", "text-blue-800", "mt-1"], [1, "bg-yellow-50", "p-4", "rounded-lg", "border", "border-yellow-200"], [1, "text-sm", "font-medium", "text-yellow-700"], [1, "text-2xl", "font-bold", "text-yellow-800", "mt-1"], [1, "bg-red-50", "p-4", "rounded-lg", "border", "border-red-200"], [1, "text-sm", "font-medium", "text-red-700"], [1, "text-2xl", "font-bold", "text-red-800", "mt-1"], [1, "text-center", "py-8"], [1, "text-sm", "text-gray-500"], [1, "empty-state"], [1, "overflow-x-auto"], [1, "min-w-full", "divide-y", "divide-gray-200"], [1, "bg-gray-50"], [1, "px-3", "py-2", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase"], [1, "bg-white", "divide-y", "divide-gray-200"], ["class", "hover:bg-gray-50", 4, "ngFor", "ngForOf"], [1, "hover:bg-gray-50"], [1, "px-3", "py-2", "text-sm", "font-medium", "text-gray-900"], [1, "px-3", "py-2", "text-sm", "text-gray-900"], [1, "px-3", "py-2", "text-sm", "text-gray-600"], [1, "px-3", "py-2"], [1, "flex", "gap-1.5"], ["class", "action-btn action-btn--blue", 3, "matTooltip", "click", 4, "ngIf"], ["class", "action-btn action-btn--gray", 3, "matTooltip", "click", 4, "ngIf"], ["class", "action-btn action-btn--purple", 3, "matTooltip", "click", 4, "ngIf"], [1, "action-btn", "action-btn--amber", 3, "click", "matTooltip"], [3, "img", "size"], [1, "action-btn", "action-btn--red", 3, "click", "matTooltip"], [1, "action-btn", "action-btn--blue", 3, "click", "matTooltip"], [1, "action-btn", "action-btn--gray", 3, "click", "matTooltip"], [1, "action-btn", "action-btn--purple", 3, "click", "matTooltip"], [1, "payments-pagination"], [1, "text-xs", "text-gray-500"], [1, "flex", "items-center", "gap-1"], ["type", "button", 1, "pagination-btn", 3, "click", "disabled"], [1, "pagination-page"]], template: function ContractDownpaymentPaymentsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275template(2, ContractDownpaymentPaymentsComponent_app_button_2_Template, 1, 1, "app-button", 2)(3, ContractDownpaymentPaymentsComponent_app_button_3_Template, 1, 1, "app-button", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, ContractDownpaymentPaymentsComponent_div_4_Template, 7, 0, "div", 4)(5, ContractDownpaymentPaymentsComponent_div_5_Template, 24, 13, "div", 5)(6, ContractDownpaymentPaymentsComponent_div_6_Template, 26, 5, "div", 6)(7, ContractDownpaymentPaymentsComponent_div_7_Template, 3, 0, "div", 7)(8, ContractDownpaymentPaymentsComponent_div_8_Template, 7, 0, "div", 8)(9, ContractDownpaymentPaymentsComponent_div_9_Template, 24, 1, "div", 9)(10, ContractDownpaymentPaymentsComponent_div_10_Template, 10, 7, "div", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isFinanced);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.showGenerateInstallmentsButton);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isFinanced);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isFinanced);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isFinanced && ctx.stats() && ctx.payments().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isFinanced && !ctx.loading() && ctx.payments().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading() && ctx.payments().length > ctx.pageSize);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ButtonComponent, MatTooltipModule, MatTooltip, LucideAngularModule, LucideAngularComponent, CurrencyPipe, LocalDatePipe], styles: ["\n\ntable[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.action-btn[_ngcontent-%COMP%] {\n  padding: 0.35rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s ease;\n}\n.action-btn--blue[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n.action-btn--blue[_ngcontent-%COMP%]:hover {\n  background: #2563eb;\n  color: #fff;\n}\n.action-btn--gray[_ngcontent-%COMP%] {\n  color: #4b5563;\n}\n.action-btn--gray[_ngcontent-%COMP%]:hover {\n  background: #4b5563;\n  color: #fff;\n}\n.action-btn--purple[_ngcontent-%COMP%] {\n  color: #7c3aed;\n}\n.action-btn--purple[_ngcontent-%COMP%]:hover {\n  background: #7c3aed;\n  color: #fff;\n}\n.action-btn--amber[_ngcontent-%COMP%] {\n  color: #d97706;\n}\n.action-btn--amber[_ngcontent-%COMP%]:hover {\n  background: #d97706;\n  color: #fff;\n}\n.action-btn--red[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.action-btn--red[_ngcontent-%COMP%]:hover {\n  background: #dc2626;\n  color: #fff;\n}\n.empty-state[_ngcontent-%COMP%] {\n  border: 1px dashed #cbd5e1;\n  border-radius: 0.75rem;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #ffffff 100%);\n  text-align: center;\n  padding: 2rem 1.25rem;\n}\n.empty-state--neutral[_ngcontent-%COMP%]   .empty-state__icon[_ngcontent-%COMP%] {\n  background: #e5e7eb;\n  color: #374151;\n}\n.empty-state__icon[_ngcontent-%COMP%] {\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 9999px;\n  margin: 0 auto 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #dbeafe;\n  color: #1e3a8a;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n.empty-state__title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #111827;\n}\n.empty-state__subtitle[_ngcontent-%COMP%] {\n  margin-top: 0.35rem;\n  font-size: 0.82rem;\n  color: #6b7280;\n}\n.payments-pagination[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.pagination-btn[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.7rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #374151;\n  background: #fff;\n}\n.pagination-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: #6366f1;\n  color: #4f46e5;\n}\n.pagination-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.pagination-page[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.65rem;\n  border-radius: 0.5rem;\n  background: #eef2ff;\n  color: #4338ca;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=contract-downpayment-payments.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractDownpaymentPaymentsComponent, [{
    type: Component,
    args: [{ selector: "app-contract-downpayment-payments", standalone: true, imports: [CommonModule, ButtonComponent, LocalDatePipe, MatTooltipModule, LucideAngularModule], template: `<div class="downpayments-container">\r
  <div class="flex items-center justify-end mb-2 gap-2">\r
    <app-button\r
      *ngIf="isFinanced"\r
      text="Agregar abono manual"\r
      custom_class="btn_secondary"\r
      size="sm"\r
      [icon]="Plus"\r
      (clicked)="addManualPayment()">\r
    </app-button>\r
\r
    <app-button\r
      *ngIf="showGenerateInstallmentsButton"\r
      text="Generar cuotas del saldo"\r
      custom_class="btn_primary"\r
      size="sm"\r
      [loading]="generating()"\r
      (clicked)="generateInstallments()">\r
    </app-button>\r
  </div>\r
\r
  <div *ngIf="!isFinanced" class="empty-state empty-state--neutral">\r
    <div class="empty-state__icon">DP</div>\r
    <p class="empty-state__title">Enganche no financiado</p>\r
    <p class="empty-state__subtitle">\r
      Activa el financiamiento de enganche al crear el contrato para registrar abonos y cuotas aqu\xED.\r
    </p>\r
  </div>\r
\r
  <div *ngIf="isFinanced" class="mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">\r
    <div class="bg-amber-50 p-3 rounded-lg border border-amber-200">\r
      <p class="text-xs font-medium text-amber-700">Meta de enganche</p>\r
      <p class="text-lg font-bold text-amber-900 mt-1">\r
        {{ targetAmount != null ? (targetAmount | currency:currency) : 'Sin definir' }}\r
      </p>\r
    </div>\r
    <div class="bg-green-50 p-3 rounded-lg border border-green-200">\r
      <p class="text-xs font-medium text-green-700">Abonado</p>\r
      <p class="text-lg font-bold text-green-800 mt-1">{{ appliedAmount | currency:currency }}</p>\r
    </div>\r
    <div class="bg-blue-50 p-3 rounded-lg border border-blue-200">\r
      <p class="text-xs font-medium text-blue-700">Pendiente de meta</p>\r
      <p class="text-lg font-bold text-blue-800 mt-1">\r
        {{ targetAmount != null ? ((targetAmount - appliedAmount) | currency:currency) : '\u2014' }}\r
      </p>\r
    </div>\r
    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">\r
      <p class="text-xs font-medium text-gray-600">Estado</p>\r
      <p class="text-sm font-semibold text-gray-900 mt-1">\r
        {{ stats()?.downpayment_financing_complete ? 'Enganche liquidado' : 'En proceso' }}\r
      </p>\r
    </div>\r
  </div>\r
\r
  <div *ngIf="isFinanced && stats() && payments().length > 0" class="grid grid-cols-5 gap-4 mb-6 w-full">\r
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">\r
      <p class="text-sm font-medium text-gray-600">Total pagos</p>\r
      <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats()!.total_payments }}</p>\r
    </div>\r
    <div class="bg-green-50 p-4 rounded-lg border border-green-200">\r
      <p class="text-sm font-medium text-green-700">Pagados</p>\r
      <p class="text-2xl font-bold text-green-800 mt-1">{{ stats()!.paid_count }}</p>\r
    </div>\r
    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">\r
      <p class="text-sm font-medium text-blue-700">Parciales</p>\r
      <p class="text-2xl font-bold text-blue-800 mt-1">{{ stats()!.partial_count }}</p>\r
    </div>\r
    <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">\r
      <p class="text-sm font-medium text-yellow-700">Pendientes</p>\r
      <p class="text-2xl font-bold text-yellow-800 mt-1">{{ stats()!.pending_count }}</p>\r
    </div>\r
    <div class="bg-red-50 p-4 rounded-lg border border-red-200">\r
      <p class="text-sm font-medium text-red-700">Vencidos</p>\r
      <p class="text-2xl font-bold text-red-800 mt-1">{{ stats()!.overdue_count }}</p>\r
    </div>\r
  </div>\r
\r
  <div *ngIf="loading()" class="text-center py-8">\r
    <p class="text-sm text-gray-500">Cargando pagos de enganche...</p>\r
  </div>\r
\r
  <div *ngIf="isFinanced && !loading() && payments().length === 0" class="empty-state">\r
    <div class="empty-state__icon">DP</div>\r
    <p class="empty-state__title">Sin movimientos de enganche</p>\r
    <p class="empty-state__subtitle">\r
      Registra abonos manuales mientras acuerdan el monto. Cuando tengan la meta total, genera las cuotas del saldo restante.\r
    </p>\r
  </div>\r
\r
  <div *ngIf="!loading() && payments().length > 0" class="overflow-x-auto">\r
    <table class="min-w-full divide-y divide-gray-200">\r
      <thead class="bg-gray-50">\r
        <tr>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pagado</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pendiente</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha Pago</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">M\xE9todo</th>\r
          <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>\r
        </tr>\r
      </thead>\r
      <tbody class="bg-white divide-y divide-gray-200">\r
        <tr *ngFor="let payment of paginatedPayments" class="hover:bg-gray-50">\r
          <td class="px-3 py-2 text-sm font-medium text-gray-900">{{ payment.payment_number }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-900">{{ payment.amount | currency:currency }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-900">{{ payment.amount_paid | currency:currency }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-900">{{ payment.amount_pending | currency:currency }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.due_date | localDate:'mediumDate' }}</td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.paid_date ? (payment.paid_date | localDate:'mediumDate') : '\u2014' }}</td>\r
          <td class="px-3 py-2">\r
            <span [class]="getStatusClass(payment.status, payment.is_overdue)">\r
              {{ getStatusLabel(payment.status, payment.is_overdue) }}\r
            </span>\r
          </td>\r
          <td class="px-3 py-2 text-sm text-gray-600">{{ payment.payment_method || '\u2014' }}</td>\r
          <td class="px-3 py-2">\r
            <div class="flex gap-1.5">\r
              <button\r
                *ngIf="canRegisterPayment(payment)"\r
                (click)="registerPayment(payment)"\r
                class="action-btn action-btn--blue"\r
                [matTooltip]="'Registrar Pago'">\r
                <lucide-icon [img]="DollarSign" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                *ngIf="canEdit(payment)"\r
                (click)="editPayment(payment)"\r
                class="action-btn action-btn--gray"\r
                [matTooltip]="'Editar Pago'">\r
                <lucide-icon [img]="Edit" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                *ngIf="canResetPayment(payment)"\r
                (click)="resetPayment(payment)"\r
                class="action-btn action-btn--purple"\r
                [matTooltip]="'Resetear Pago'">\r
                <lucide-icon [img]="RotateCcw" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                (click)="cancelPayment(payment)"\r
                class="action-btn action-btn--amber"\r
                [matTooltip]="'Cancelar Pago'">\r
                <lucide-icon [img]="RotateCcw" [size]="16"></lucide-icon>\r
              </button>\r
              <button\r
                (click)="deletePayment(payment)"\r
                class="action-btn action-btn--red"\r
                [matTooltip]="'Eliminar Pago'">\r
                <lucide-icon [img]="Trash2" [size]="16"></lucide-icon>\r
              </button>\r
            </div>\r
          </td>\r
        </tr>\r
      </tbody>\r
    </table>\r
  </div>\r
\r
  <div *ngIf="!loading() && payments().length > pageSize" class="payments-pagination">\r
    <div class="text-xs text-gray-500">\r
      Mostrando {{ (currentPage() - 1) * pageSize + 1 }} - {{ Math.min(currentPage() * pageSize, payments().length) }} de {{ payments().length }} pagos\r
    </div>\r
    <div class="flex items-center gap-1">\r
      <button type="button" class="pagination-btn" [disabled]="currentPage() === 1" (click)="setPage(currentPage() - 1)">Anterior</button>\r
      <span class="pagination-page">P\xE1gina {{ currentPage() }} / {{ totalPages }}</span>\r
      <button type="button" class="pagination-btn" [disabled]="currentPage() === totalPages" (click)="setPage(currentPage() + 1)">Siguiente</button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/contract-downpayment-payments/contract-downpayment-payments.component.scss */\ntable {\n  font-size: 0.875rem;\n}\n.action-btn {\n  padding: 0.35rem;\n  border-radius: 0.375rem;\n  transition: all 0.2s ease;\n}\n.action-btn--blue {\n  color: #2563eb;\n}\n.action-btn--blue:hover {\n  background: #2563eb;\n  color: #fff;\n}\n.action-btn--gray {\n  color: #4b5563;\n}\n.action-btn--gray:hover {\n  background: #4b5563;\n  color: #fff;\n}\n.action-btn--purple {\n  color: #7c3aed;\n}\n.action-btn--purple:hover {\n  background: #7c3aed;\n  color: #fff;\n}\n.action-btn--amber {\n  color: #d97706;\n}\n.action-btn--amber:hover {\n  background: #d97706;\n  color: #fff;\n}\n.action-btn--red {\n  color: #dc2626;\n}\n.action-btn--red:hover {\n  background: #dc2626;\n  color: #fff;\n}\n.empty-state {\n  border: 1px dashed #cbd5e1;\n  border-radius: 0.75rem;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #ffffff 100%);\n  text-align: center;\n  padding: 2rem 1.25rem;\n}\n.empty-state--neutral .empty-state__icon {\n  background: #e5e7eb;\n  color: #374151;\n}\n.empty-state__icon {\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 9999px;\n  margin: 0 auto 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #dbeafe;\n  color: #1e3a8a;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n.empty-state__title {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #111827;\n}\n.empty-state__subtitle {\n  margin-top: 0.35rem;\n  font-size: 0.82rem;\n  color: #6b7280;\n}\n.payments-pagination {\n  margin-top: 0.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.pagination-btn {\n  padding: 0.35rem 0.7rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #374151;\n  background: #fff;\n}\n.pagination-btn:hover:not(:disabled) {\n  border-color: #6366f1;\n  color: #4f46e5;\n}\n.pagination-btn:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.pagination-page {\n  padding: 0.35rem 0.65rem;\n  border-radius: 0.5rem;\n  background: #eef2ff;\n  color: #4338ca;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n/*# sourceMappingURL=contract-downpayment-payments.component.css.map */\n"] }]
  }], () => [{ type: DownpaymentPaymentService }, { type: InterceptorService }, { type: MatDialog }], { contractId: [{
    type: Input
  }], currency: [{
    type: Input
  }], contract: [{
    type: Input
  }], dataChanged: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractDownpaymentPaymentsComponent, { className: "ContractDownpaymentPaymentsComponent", filePath: "src/app/features/contracts/components/contract-downpayment-payments/contract-downpayment-payments.component.ts", lineNumber: 24 });
})();

export {
  ContractDocumentsComponent,
  PaymentService,
  LocalDatePipe,
  ContractPaymentsComponent,
  ContractHoaPaymentsComponent,
  ContractDownpaymentPaymentsComponent
};
//# sourceMappingURL=chunk-FH3SDQWY.js.map
