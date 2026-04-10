import {
  PurchaseOrderService
} from "./chunk-SFPCIKZR.js";
import {
  TaxCalculatorService
} from "./chunk-BUMMMPXI.js";
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
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  ScrollingModule
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-TXPVZZCM.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
  computed,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

// src/app/features/purchase-orders/components/order-header/order-header.component.ts
function OrderHeaderComponent_div_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 7)(2, "span", 4);
    \u0275\u0275text(3, "RAZ\xD3N DE CANCELACI\xD3N:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.order.cancellation_reason);
  }
}
function OrderHeaderComponent_button_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 15);
    \u0275\u0275listener("click", function OrderHeaderComponent_button_45_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEdit());
    });
    \u0275\u0275text(1, " Editar ");
    \u0275\u0275elementEnd();
  }
}
function OrderHeaderComponent_button_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function OrderHeaderComponent_button_46_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onChangeStatus());
    });
    \u0275\u0275text(1, " Cambiar Estado ");
    \u0275\u0275elementEnd();
  }
}
function OrderHeaderComponent_button_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function OrderHeaderComponent_button_47_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCancel());
    });
    \u0275\u0275text(1, " Cancelar ");
    \u0275\u0275elementEnd();
  }
}
function OrderHeaderComponent_button_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function OrderHeaderComponent_button_48_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDelete());
    });
    \u0275\u0275text(1, " Eliminar ");
    \u0275\u0275elementEnd();
  }
}
var OrderHeaderComponent = class _OrderHeaderComponent {
  order;
  canEdit = false;
  canDelete = false;
  canChangeStatus = false;
  edit = new EventEmitter();
  changeStatus = new EventEmitter();
  cancel = new EventEmitter();
  delete = new EventEmitter();
  /**
   * Get status badge class
   */
  getStatusClass(status) {
    switch (status) {
      case "En Proceso":
        return "status-badge status-badge--en-proceso";
      case "Recibida":
        return "status-badge status-badge--recibida";
      case "Cancelada":
        return "status-badge status-badge--cancelada";
      default:
        return "status-badge";
    }
  }
  /**
   * Check if edit button should be shown
   */
  shouldShowEditButton() {
    return this.canEdit;
  }
  /**
   * Check if change status button should be shown
   */
  shouldShowChangeStatusButton() {
    return this.canChangeStatus && this.order.status === "En Proceso";
  }
  /**
   * Check if cancel button should be shown
   */
  shouldShowCancelButton() {
    return this.order.status === "En Proceso";
  }
  /**
   * Check if delete button should be shown
   */
  shouldShowDeleteButton() {
    return this.canDelete;
  }
  /**
   * Handle edit button click
   */
  onEdit() {
    this.edit.emit();
  }
  /**
   * Handle change status button click
   */
  onChangeStatus() {
    this.changeStatus.emit();
  }
  /**
   * Handle cancel button click
   */
  onCancel() {
    this.cancel.emit();
  }
  /**
   * Handle delete button click
   */
  onDelete() {
    this.delete.emit();
  }
  static \u0275fac = function OrderHeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderHeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderHeaderComponent, selectors: [["app-order-header"]], inputs: { order: "order", canEdit: "canEdit", canDelete: "canDelete", canChangeStatus: "canChangeStatus" }, outputs: { edit: "edit", changeStatus: "changeStatus", cancel: "cancel", delete: "delete" }, decls: 49, vars: 19, consts: [["role", "region", "aria-label", "Encabezado de orden de compra", 1, "order-header"], [1, "order-header__info"], [1, "order-header__row"], [1, "order-header__field"], [1, "label"], [1, "value"], ["role", "status", 3, "ngClass"], [1, "order-header__field", "order-header__field--full"], ["class", "order-header__row", 4, "ngIf"], ["role", "group", "aria-label", "Acciones de orden", 1, "order-header__actions"], ["type", "button", "class", "btn btn--primary", "aria-label", "Editar orden de compra", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn--success", "aria-label", "Cambiar estado de orden", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn--warning", "aria-label", "Cancelar orden de compra", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn--danger", "aria-label", "Eliminar orden de compra", 3, "click", 4, "ngIf"], [1, "value", "value--warning"], ["type", "button", "aria-label", "Editar orden de compra", 1, "btn", "btn--primary", 3, "click"], ["type", "button", "aria-label", "Cambiar estado de orden", 1, "btn", "btn--success", 3, "click"], ["type", "button", "aria-label", "Cancelar orden de compra", 1, "btn", "btn--warning", 3, "click"], ["type", "button", "aria-label", "Eliminar orden de compra", 1, "btn", "btn--danger", 3, "click"]], template: function OrderHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "FOLIO:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 3)(9, "span", 4);
      \u0275\u0275text(10, "ESTADO:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span", 6);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 2)(14, "div", 3)(15, "span", 4);
      \u0275\u0275text(16, "PROVEEDOR:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "span", 5);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 3)(20, "span", 4);
      \u0275\u0275text(21, "ALMAC\xC9N:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "span", 5);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 2)(25, "div", 3)(26, "span", 4);
      \u0275\u0275text(27, "FECHA TENTATIVA DE RECEPCI\xD3N:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span", 5);
      \u0275\u0275text(29);
      \u0275\u0275pipe(30, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 3)(32, "span", 4);
      \u0275\u0275text(33, "FECHA DE CREACI\xD3N:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "span", 5);
      \u0275\u0275text(35);
      \u0275\u0275pipe(36, "date");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 2)(38, "div", 7)(39, "span", 4);
      \u0275\u0275text(40, "PROP\xD3SITO:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "span", 5);
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(43, OrderHeaderComponent_div_43_Template, 6, 1, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 9);
      \u0275\u0275template(45, OrderHeaderComponent_button_45_Template, 2, 0, "button", 10)(46, OrderHeaderComponent_button_46_Template, 2, 0, "button", 11)(47, OrderHeaderComponent_button_47_Template, 2, 0, "button", 12)(48, OrderHeaderComponent_button_48_Template, 2, 0, "button", 13);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.order.id);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", ctx.getStatusClass(ctx.order.status));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.order.status, " ");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate((ctx.order.vendor == null ? null : ctx.order.vendor.name) || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((ctx.order.warehouse == null ? null : ctx.order.warehouse.name) || "N/A");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(30, 13, ctx.order.tentative_receipt_date, "dd/MM/yyyy"));
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(36, 16, ctx.order.created_at, "dd/MM/yyyy HH:mm"));
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.order.purpose);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.order.cancellation_reason);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.shouldShowEditButton());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.shouldShowChangeStatusButton());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.shouldShowCancelButton());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.shouldShowDeleteButton());
    }
  }, dependencies: [CommonModule, NgClass, NgIf, DatePipe], styles: ["\n\n.order-header[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.order-header__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.order-header__row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n@media (max-width: 767px) {\n  .order-header__row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n}\n.order-header__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.order-header__field--full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.order-header__field[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.order-header__field[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #212529;\n  font-weight: 500;\n}\n.order-header__field[_ngcontent-%COMP%]   .value--warning[_ngcontent-%COMP%] {\n  color: #e65100;\n  font-style: italic;\n}\n.order-header__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding-top: 24px;\n  border-top: 1px solid #e9ecef;\n}\n@media (max-width: 767px) {\n  .order-header__actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: center;\n  white-space: nowrap;\n}\n.status-badge--en-proceso[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.status-badge--recibida[_ngcontent-%COMP%] {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.status-badge--cancelada[_ngcontent-%COMP%] {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-height: 44px;\n  min-width: 100px;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.btn[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #007bff;\n  outline-offset: 2px;\n}\n.btn[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.btn--primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  color: white;\n}\n.btn--primary[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n}\n.btn--primary[_ngcontent-%COMP%]:focus {\n  outline-color: #007bff;\n}\n.btn--success[_ngcontent-%COMP%] {\n  background-color: #28a745;\n  color: white;\n}\n.btn--success[_ngcontent-%COMP%]:hover {\n  background-color: #218838;\n}\n.btn--success[_ngcontent-%COMP%]:focus {\n  outline-color: #28a745;\n}\n.btn--warning[_ngcontent-%COMP%] {\n  background-color: #ffc107;\n  color: #212529;\n}\n.btn--warning[_ngcontent-%COMP%]:hover {\n  background-color: #e0a800;\n}\n.btn--warning[_ngcontent-%COMP%]:focus {\n  outline-color: #ffc107;\n}\n.btn--danger[_ngcontent-%COMP%] {\n  background-color: #dc3545;\n  color: white;\n}\n.btn--danger[_ngcontent-%COMP%]:hover {\n  background-color: #c82333;\n}\n.btn--danger[_ngcontent-%COMP%]:focus {\n  outline-color: #dc3545;\n}\n@media (max-width: 767px) {\n  .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n*[_ngcontent-%COMP%]:focus {\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=order-header.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderHeaderComponent, [{
    type: Component,
    args: [{ selector: "app-order-header", standalone: true, imports: [CommonModule], template: `<div class="order-header" role="region" aria-label="Encabezado de orden de compra">\r
  <!-- Order Information Section -->\r
  <div class="order-header__info">\r
    <div class="order-header__row">\r
      <div class="order-header__field">\r
        <span class="label">FOLIO:</span>\r
        <span class="value">{{ order.id }}</span>\r
      </div>\r
      <div class="order-header__field">\r
        <span class="label">ESTADO:</span>\r
        <span [ngClass]="getStatusClass(order.status)" role="status">\r
          {{ order.status }}\r
        </span>\r
      </div>\r
    </div>\r
\r
    <div class="order-header__row">\r
      <div class="order-header__field">\r
        <span class="label">PROVEEDOR:</span>\r
        <span class="value">{{ order.vendor?.name || 'N/A' }}</span>\r
      </div>\r
      <div class="order-header__field">\r
        <span class="label">ALMAC\xC9N:</span>\r
        <span class="value">{{ order.warehouse?.name || 'N/A' }}</span>\r
      </div>\r
    </div>\r
\r
    <div class="order-header__row">\r
      <div class="order-header__field">\r
        <span class="label">FECHA TENTATIVA DE RECEPCI\xD3N:</span>\r
        <span class="value">{{ order.tentative_receipt_date | date: 'dd/MM/yyyy' }}</span>\r
      </div>\r
      <div class="order-header__field">\r
        <span class="label">FECHA DE CREACI\xD3N:</span>\r
        <span class="value">{{ order.created_at | date: 'dd/MM/yyyy HH:mm' }}</span>\r
      </div>\r
    </div>\r
\r
    <div class="order-header__row">\r
      <div class="order-header__field order-header__field--full">\r
        <span class="label">PROP\xD3SITO:</span>\r
        <span class="value">{{ order.purpose }}</span>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="order.cancellation_reason" class="order-header__row">\r
      <div class="order-header__field order-header__field--full">\r
        <span class="label">RAZ\xD3N DE CANCELACI\xD3N:</span>\r
        <span class="value value--warning">{{ order.cancellation_reason }}</span>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Action Buttons Section -->\r
  <div class="order-header__actions" role="group" aria-label="Acciones de orden">\r
    <button\r
      *ngIf="shouldShowEditButton()"\r
      type="button"\r
      class="btn btn--primary"\r
      (click)="onEdit()"\r
      aria-label="Editar orden de compra"\r
    >\r
      Editar\r
    </button>\r
\r
    <button\r
      *ngIf="shouldShowChangeStatusButton()"\r
      type="button"\r
      class="btn btn--success"\r
      (click)="onChangeStatus()"\r
      aria-label="Cambiar estado de orden"\r
    >\r
      Cambiar Estado\r
    </button>\r
\r
    <button\r
      *ngIf="shouldShowCancelButton()"\r
      type="button"\r
      class="btn btn--warning"\r
      (click)="onCancel()"\r
      aria-label="Cancelar orden de compra"\r
    >\r
      Cancelar\r
    </button>\r
\r
    <button\r
      *ngIf="shouldShowDeleteButton()"\r
      type="button"\r
      class="btn btn--danger"\r
      (click)="onDelete()"\r
      aria-label="Eliminar orden de compra"\r
    >\r
      Eliminar\r
    </button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/purchase-orders/components/order-header/order-header.component.scss */\n.order-header {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.order-header__info {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.order-header__row {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n@media (max-width: 767px) {\n  .order-header__row {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n}\n.order-header__field {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.order-header__field--full {\n  grid-column: 1/-1;\n}\n.order-header__field .label {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.order-header__field .value {\n  font-size: 14px;\n  color: #212529;\n  font-weight: 500;\n}\n.order-header__field .value--warning {\n  color: #e65100;\n  font-style: italic;\n}\n.order-header__actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding-top: 24px;\n  border-top: 1px solid #e9ecef;\n}\n@media (max-width: 767px) {\n  .order-header__actions {\n    flex-direction: column;\n  }\n}\n.status-badge {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: center;\n  white-space: nowrap;\n}\n.status-badge--en-proceso {\n  background-color: #fff3e0;\n  color: #e65100;\n}\n.status-badge--recibida {\n  background-color: #e8f5e9;\n  color: #2e7d32;\n}\n.status-badge--cancelada {\n  background-color: #ffebee;\n  color: #c62828;\n}\n.btn {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-height: 44px;\n  min-width: 100px;\n}\n.btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.btn:focus {\n  outline: 2px solid #007bff;\n  outline-offset: 2px;\n}\n.btn:active {\n  transform: translateY(0);\n}\n.btn--primary {\n  background-color: #007bff;\n  color: white;\n}\n.btn--primary:hover {\n  background-color: #0056b3;\n}\n.btn--primary:focus {\n  outline-color: #007bff;\n}\n.btn--success {\n  background-color: #28a745;\n  color: white;\n}\n.btn--success:hover {\n  background-color: #218838;\n}\n.btn--success:focus {\n  outline-color: #28a745;\n}\n.btn--warning {\n  background-color: #ffc107;\n  color: #212529;\n}\n.btn--warning:hover {\n  background-color: #e0a800;\n}\n.btn--warning:focus {\n  outline-color: #ffc107;\n}\n.btn--danger {\n  background-color: #dc3545;\n  color: white;\n}\n.btn--danger:hover {\n  background-color: #c82333;\n}\n.btn--danger:focus {\n  outline-color: #dc3545;\n}\n@media (max-width: 767px) {\n  .btn {\n    width: 100%;\n  }\n}\n*:focus {\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=order-header.component.css.map */\n"] }]
  }], null, { order: [{
    type: Input
  }], canEdit: [{
    type: Input
  }], canDelete: [{
    type: Input
  }], canChangeStatus: [{
    type: Input
  }], edit: [{
    type: Output
  }], changeStatus: [{
    type: Output
  }], cancel: [{
    type: Output
  }], delete: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderHeaderComponent, { className: "OrderHeaderComponent", filePath: "src/app/features/purchase-orders/components/order-header/order-header.component.ts", lineNumber: 16 });
})();

// src/app/features/purchase-orders/components/line-items-table/line-items-table.component.ts
function LineItemsTableComponent_div_2_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 16)(1, "td", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 20);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 21);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 22);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 23);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 24);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r1.product == null ? null : item_r1.product.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r1.uom == null ? null : item_r1.uom.code) || (item_r1.uom == null ? null : item_r1.uom.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r1.unit_price));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r1.subtotal));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r1.iva_amount));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r1.ieps_amount));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r1.line_total));
  }
}
function LineItemsTableComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "cdk-virtual-scroll-viewport", 10)(2, "table", 11)(3, "thead")(4, "tr", 12)(5, "th", 13);
    \u0275\u0275text(6, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 13);
    \u0275\u0275text(8, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 14);
    \u0275\u0275text(10, "CANTIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 14);
    \u0275\u0275text(12, "PRECIO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 14);
    \u0275\u0275text(14, "SUBTOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 14);
    \u0275\u0275text(16, "IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 14);
    \u0275\u0275text(18, "IEPS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 14);
    \u0275\u0275text(20, "TOTAL");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "tbody");
    \u0275\u0275template(22, LineItemsTableComponent_div_2_tr_22_Template, 17, 8, "tr", 15);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(22);
    \u0275\u0275property("cdkVirtualForOf", ctx_r1.lineItems)("cdkVirtualForTrackBy", ctx_r1.trackByLineItem);
  }
}
function LineItemsTableComponent_table_3_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 16)(1, "td", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 20);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 21);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 22);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 23);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 24);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r3.product == null ? null : item_r3.product.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r3.uom == null ? null : item_r3.uom.code) || (item_r3.uom == null ? null : item_r3.uom.name) || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r3.unit_price));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r3.subtotal));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r3.iva_amount));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r3.ieps_amount));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r3.line_total));
  }
}
function LineItemsTableComponent_table_3_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 12)(1, "td", 28)(2, "div", 29)(3, "p");
    \u0275\u0275text(4, "No hay l\xEDneas de productos");
    \u0275\u0275elementEnd()()()();
  }
}
function LineItemsTableComponent_table_3_tfoot_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tfoot")(1, "tr", 30)(2, "td", 31);
    \u0275\u0275text(3, "TOTALES:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 32);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 33);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_subtotal));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_iva));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_ieps));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.grand_total));
  }
}
function LineItemsTableComponent_table_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 11)(1, "thead")(2, "tr", 12)(3, "th", 13);
    \u0275\u0275text(4, "PRODUCTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 13);
    \u0275\u0275text(6, "UOM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 14);
    \u0275\u0275text(8, "CANTIDAD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 14);
    \u0275\u0275text(10, "PRECIO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 14);
    \u0275\u0275text(12, "SUBTOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 14);
    \u0275\u0275text(14, "IVA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 14);
    \u0275\u0275text(16, "IEPS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 14);
    \u0275\u0275text(18, "TOTAL");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275template(20, LineItemsTableComponent_table_3_tr_20_Template, 17, 8, "tr", 25)(21, LineItemsTableComponent_table_3_tr_21_Template, 5, 0, "tr", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, LineItemsTableComponent_table_3_tfoot_22_Template, 12, 4, "tfoot", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275property("ngForOf", ctx_r1.lineItems)("ngForTrackBy", ctx_r1.trackByLineItem);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.lineItems.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.lineItems.length > 0);
  }
}
function LineItemsTableComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35)(2, "div", 36)(3, "span", 37);
    \u0275\u0275text(4, "SUBTOTAL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 38);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 36)(8, "span", 37);
    \u0275\u0275text(9, "IVA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 38);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 36)(13, "span", 37);
    \u0275\u0275text(14, "IEPS:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 38);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 39)(18, "span", 37);
    \u0275\u0275text(19, "TOTAL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 38);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_subtotal));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_iva));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_ieps));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.grand_total));
  }
}
function LineItemsTableComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 41)(2, "div", 42)(3, "span", 43);
    \u0275\u0275text(4, "PRODUCTO:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 44);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "div", 45)(8, "div", 46)(9, "span", 43);
    \u0275\u0275text(10, "UOM:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 44);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 46)(14, "span", 43);
    \u0275\u0275text(15, "CANTIDAD:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 44);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 46)(19, "span", 43);
    \u0275\u0275text(20, "PRECIO:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 44);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 46)(24, "span", 43);
    \u0275\u0275text(25, "SUBTOTAL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 44);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 46)(29, "span", 43);
    \u0275\u0275text(30, "IVA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 44);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 46)(34, "span", 43);
    \u0275\u0275text(35, "IEPS:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span", 44);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 47)(39, "span", 43);
    \u0275\u0275text(40, "TOTAL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span", 44);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((item_r4.product == null ? null : item_r4.product.name) || "N/A");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((item_r4.uom == null ? null : item_r4.uom.code) || (item_r4.uom == null ? null : item_r4.uom.name) || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r4.quantity);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r4.unit_price));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r4.subtotal));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r4.iva_amount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r4.ieps_amount));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r4.line_total));
  }
}
function LineItemsTableComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "p");
    \u0275\u0275text(2, "No hay l\xEDneas de productos");
    \u0275\u0275elementEnd()();
  }
}
function LineItemsTableComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50)(2, "span", 43);
    \u0275\u0275text(3, "SUBTOTAL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 44);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 50)(7, "span", 43);
    \u0275\u0275text(8, "IVA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 44);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 50)(12, "span", 43);
    \u0275\u0275text(13, "IEPS:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 44);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 51)(17, "span", 43);
    \u0275\u0275text(18, "TOTAL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 44);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_subtotal));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_iva));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.total_ieps));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.totals.grand_total));
  }
}
var LineItemsTableComponent = class _LineItemsTableComponent {
  taxCalculator;
  lineItems = [];
  editable = false;
  lineItemChange = new EventEmitter();
  lineItemRemove = new EventEmitter();
  constructor(taxCalculator) {
    this.taxCalculator = taxCalculator;
  }
  /**
   * Check if virtual scrolling should be enabled
   */
  get useVirtualScroll() {
    return this.lineItems.length > 50;
  }
  /**
   * Calculate totals for all line items
   */
  get totals() {
    return this.taxCalculator.calculateOrderTotals(this.lineItems);
  }
  /**
   * Format currency amount
   */
  formatCurrency(amount) {
    return this.taxCalculator.formatCurrency(amount);
  }
  /**
   * Handle line item change
   */
  onLineItemChange(item) {
    if (this.editable) {
      this.lineItemChange.emit(item);
    }
  }
  /**
   * Handle line item removal
   */
  onLineItemRemove(index) {
    if (this.editable) {
      this.lineItemRemove.emit(index);
    }
  }
  /**
   * Track by function for ngFor optimization
   */
  trackByLineItem(index, item) {
    return item.id;
  }
  static \u0275fac = function LineItemsTableComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LineItemsTableComponent)(\u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LineItemsTableComponent, selectors: [["app-line-items-table"]], inputs: { lineItems: "lineItems", editable: "editable" }, outputs: { lineItemChange: "lineItemChange", lineItemRemove: "lineItemRemove" }, decls: 9, vars: 7, consts: [[1, "line-items-table-container"], ["role", "region", "aria-label", "Tabla de l\xEDneas de productos", 1, "table-view"], ["class", "virtual-scroll-wrapper", 4, "ngIf"], ["class", "line-items-table", "role", "table", 4, "ngIf"], ["class", "totals-summary", 4, "ngIf"], ["role", "list", "aria-label", "Lista de l\xEDneas de productos", 1, "card-view"], ["class", "line-item-card", "role", "listitem", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "empty-state", "role", "status", 4, "ngIf"], ["class", "mobile-totals-summary", 4, "ngIf"], [1, "virtual-scroll-wrapper"], ["itemSize", "50", 1, "line-items-viewport"], ["role", "table", 1, "line-items-table"], ["role", "row"], ["role", "columnheader", "scope", "col"], ["role", "columnheader", "scope", "col", 1, "text-right"], ["role", "row", "class", "line-item-row", 4, "cdkVirtualFor", "cdkVirtualForOf", "cdkVirtualForTrackBy"], ["role", "row", 1, "line-item-row"], ["role", "cell", "data-label", "PRODUCTO"], ["role", "cell", "data-label", "UOM"], ["role", "cell", "data-label", "CANTIDAD", 1, "text-right"], ["role", "cell", "data-label", "PRECIO", 1, "text-right"], ["role", "cell", "data-label", "SUBTOTAL", 1, "text-right"], ["role", "cell", "data-label", "IVA", 1, "text-right"], ["role", "cell", "data-label", "IEPS", 1, "text-right"], ["role", "cell", "data-label", "TOTAL", 1, "text-right", "font-weight-bold"], ["role", "row", "class", "line-item-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["role", "row", 4, "ngIf"], [4, "ngIf"], ["colspan", "8", "role", "cell", 1, "empty-state"], [1, "empty-message"], ["role", "row", 1, "totals-row"], ["colspan", "4", 1, "text-right", "font-weight-bold"], [1, "text-right", "font-weight-bold"], [1, "text-right", "font-weight-bold", "total-grand"], [1, "totals-summary"], [1, "totals-grid"], [1, "totals-item"], [1, "totals-label"], [1, "totals-value"], [1, "totals-item", "totals-item--grand"], ["role", "listitem", 1, "line-item-card"], [1, "line-item-card__header"], [1, "line-item-card__product"], [1, "label"], [1, "value"], [1, "line-item-card__body"], [1, "line-item-card__row"], [1, "line-item-card__row", "line-item-card__row--total"], ["role", "status", 1, "empty-state"], [1, "mobile-totals-summary"], [1, "mobile-totals-row"], [1, "mobile-totals-row", "mobile-totals-row--grand"]], template: function LineItemsTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275template(2, LineItemsTableComponent_div_2_Template, 23, 2, "div", 2)(3, LineItemsTableComponent_table_3_Template, 23, 4, "table", 3)(4, LineItemsTableComponent_div_4_Template, 22, 4, "div", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 5);
      \u0275\u0275template(6, LineItemsTableComponent_div_6_Template, 43, 8, "div", 6)(7, LineItemsTableComponent_div_7_Template, 3, 0, "div", 7)(8, LineItemsTableComponent_div_8_Template, 21, 4, "div", 8);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.useVirtualScroll);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.useVirtualScroll);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.useVirtualScroll && ctx.lineItems.length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.lineItems)("ngForTrackBy", ctx.trackByLineItem);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.lineItems.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.lineItems.length > 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ScrollingModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport], styles: ["\n\n.line-items-table-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\n.table-view[_ngcontent-%COMP%] {\n  display: block;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n@media (max-width: 767px) {\n  .table-view[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.virtual-scroll-wrapper[_ngcontent-%COMP%] {\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.line-items-viewport[_ngcontent-%COMP%] {\n  height: 400px;\n  width: 100%;\n}\n.line-items-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.line-items-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.line-items-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  font-weight: 600;\n  font-size: 12px;\n  color: #495057;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.line-items-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.line-items-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e9ecef;\n}\n.line-items-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.line-items-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #212529;\n  white-space: nowrap;\n}\n.line-items-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.line-items-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td.font-weight-bold[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.line-items-table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-top: 2px solid #dee2e6;\n}\n.line-items-table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   .totals-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 16px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #212529;\n}\n.line-items-table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   .totals-row[_ngcontent-%COMP%]   td.total-grand[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #007bff;\n}\n.totals-summary[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border: 1px solid #dee2e6;\n  border-top: 2px solid #007bff;\n  border-radius: 0 0 8px 8px;\n  padding: 16px;\n  margin-top: -1px;\n}\n.totals-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n}\n@media (max-width: 1024px) {\n  .totals-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.totals-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.totals-item[_ngcontent-%COMP%]   .totals-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.totals-item[_ngcontent-%COMP%]   .totals-value[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #212529;\n}\n.totals-item--grand[_ngcontent-%COMP%]   .totals-label[_ngcontent-%COMP%] {\n  color: #007bff;\n}\n.totals-item--grand[_ngcontent-%COMP%]   .totals-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #007bff;\n}\n.card-view[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 767px) {\n  .card-view[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.line-item-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 16px;\n  padding: 16px;\n}\n.line-item-card__header[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #e9ecef;\n}\n.line-item-card__product[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.line-item-card__product[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.line-item-card__product[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #212529;\n}\n.line-item-card__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.line-item-card__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 14px;\n}\n.line-item-card__row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 12px;\n}\n.line-item-card__row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #212529;\n  text-align: right;\n}\n.line-item-card__row--total[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding-top: 8px;\n  border-top: 1px solid #e9ecef;\n}\n.line-item-card__row--total[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #007bff;\n}\n.line-item-card__row--total[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #007bff;\n}\n.mobile-totals-summary[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 16px;\n  margin-top: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.mobile-totals-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n  font-size: 14px;\n}\n.mobile-totals-row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6c757d;\n}\n.mobile-totals-row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #212529;\n}\n.mobile-totals-row--grand[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding-top: 12px;\n  border-top: 2px solid #dee2e6;\n}\n.mobile-totals-row--grand[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #007bff;\n}\n.mobile-totals-row--grand[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #007bff;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 24px;\n  color: #6c757d;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.font-weight-bold[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n*[_ngcontent-%COMP%]:focus {\n  outline-offset: 2px;\n}\n@media (max-width: 1024px) {\n  .line-items-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .line-items-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    font-size: 13px;\n  }\n}\n@media print {\n  .line-items-table-container[_ngcontent-%COMP%]   .card-view[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .line-items-table-container[_ngcontent-%COMP%]   .table-view[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .line-items-table-container[_ngcontent-%COMP%]   .line-items-table[_ngcontent-%COMP%] {\n    box-shadow: none;\n    border: 1px solid #dee2e6;\n  }\n}\n/*# sourceMappingURL=line-items-table.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LineItemsTableComponent, [{
    type: Component,
    args: [{ selector: "app-line-items-table", standalone: true, imports: [CommonModule, ScrollingModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="line-items-table-container">\r
  <!-- Desktop/Tablet Table View -->\r
  <div class="table-view" role="region" aria-label="Tabla de l\xEDneas de productos">\r
    <!-- Virtual Scrolling for > 50 items -->\r
    <div *ngIf="useVirtualScroll" class="virtual-scroll-wrapper">\r
      <cdk-virtual-scroll-viewport itemSize="50" class="line-items-viewport">\r
        <table class="line-items-table" role="table">\r
          <thead>\r
            <tr role="row">\r
              <th role="columnheader" scope="col">PRODUCTO</th>\r
              <th role="columnheader" scope="col">UOM</th>\r
              <th role="columnheader" scope="col" class="text-right">CANTIDAD</th>\r
              <th role="columnheader" scope="col" class="text-right">PRECIO</th>\r
              <th role="columnheader" scope="col" class="text-right">SUBTOTAL</th>\r
              <th role="columnheader" scope="col" class="text-right">IVA</th>\r
              <th role="columnheader" scope="col" class="text-right">IEPS</th>\r
              <th role="columnheader" scope="col" class="text-right">TOTAL</th>\r
            </tr>\r
          </thead>\r
          <tbody>\r
            <tr\r
              *cdkVirtualFor="let item of lineItems; trackBy: trackByLineItem"\r
              role="row"\r
              class="line-item-row"\r
            >\r
              <td role="cell" data-label="PRODUCTO">{{ item.product?.name || 'N/A' }}</td>\r
              <td role="cell" data-label="UOM">{{ item.uom?.code || item.uom?.name || 'N/A' }}</td>\r
              <td role="cell" data-label="CANTIDAD" class="text-right">{{ item.quantity }}</td>\r
              <td role="cell" data-label="PRECIO" class="text-right">{{ formatCurrency(item.unit_price) }}</td>\r
              <td role="cell" data-label="SUBTOTAL" class="text-right">{{ formatCurrency(item.subtotal) }}</td>\r
              <td role="cell" data-label="IVA" class="text-right">{{ formatCurrency(item.iva_amount) }}</td>\r
              <td role="cell" data-label="IEPS" class="text-right">{{ formatCurrency(item.ieps_amount) }}</td>\r
              <td role="cell" data-label="TOTAL" class="text-right font-weight-bold">{{ formatCurrency(item.line_total) }}</td>\r
            </tr>\r
          </tbody>\r
        </table>\r
      </cdk-virtual-scroll-viewport>\r
    </div>\r
\r
    <!-- Regular Table for <= 50 items -->\r
    <table *ngIf="!useVirtualScroll" class="line-items-table" role="table">\r
      <thead>\r
        <tr role="row">\r
          <th role="columnheader" scope="col">PRODUCTO</th>\r
          <th role="columnheader" scope="col">UOM</th>\r
          <th role="columnheader" scope="col" class="text-right">CANTIDAD</th>\r
          <th role="columnheader" scope="col" class="text-right">PRECIO</th>\r
          <th role="columnheader" scope="col" class="text-right">SUBTOTAL</th>\r
          <th role="columnheader" scope="col" class="text-right">IVA</th>\r
          <th role="columnheader" scope="col" class="text-right">IEPS</th>\r
          <th role="columnheader" scope="col" class="text-right">TOTAL</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        <tr\r
          *ngFor="let item of lineItems; trackBy: trackByLineItem"\r
          role="row"\r
          class="line-item-row"\r
        >\r
          <td role="cell" data-label="PRODUCTO">{{ item.product?.name || 'N/A' }}</td>\r
          <td role="cell" data-label="UOM">{{ item.uom?.code || item.uom?.name || 'N/A' }}</td>\r
          <td role="cell" data-label="CANTIDAD" class="text-right">{{ item.quantity }}</td>\r
          <td role="cell" data-label="PRECIO" class="text-right">{{ formatCurrency(item.unit_price) }}</td>\r
          <td role="cell" data-label="SUBTOTAL" class="text-right">{{ formatCurrency(item.subtotal) }}</td>\r
          <td role="cell" data-label="IVA" class="text-right">{{ formatCurrency(item.iva_amount) }}</td>\r
          <td role="cell" data-label="IEPS" class="text-right">{{ formatCurrency(item.ieps_amount) }}</td>\r
          <td role="cell" data-label="TOTAL" class="text-right font-weight-bold">{{ formatCurrency(item.line_total) }}</td>\r
        </tr>\r
        <tr *ngIf="lineItems.length === 0" role="row">\r
          <td colspan="8" class="empty-state" role="cell">\r
            <div class="empty-message">\r
              <p>No hay l\xEDneas de productos</p>\r
            </div>\r
          </td>\r
        </tr>\r
      </tbody>\r
      <!-- Totals Row -->\r
      <tfoot *ngIf="lineItems.length > 0">\r
        <tr role="row" class="totals-row">\r
          <td colspan="4" class="text-right font-weight-bold">TOTALES:</td>\r
          <td class="text-right font-weight-bold">{{ formatCurrency(totals.total_subtotal) }}</td>\r
          <td class="text-right font-weight-bold">{{ formatCurrency(totals.total_iva) }}</td>\r
          <td class="text-right font-weight-bold">{{ formatCurrency(totals.total_ieps) }}</td>\r
          <td class="text-right font-weight-bold total-grand">{{ formatCurrency(totals.grand_total) }}</td>\r
        </tr>\r
      </tfoot>\r
    </table>\r
\r
    <!-- Totals Row for Virtual Scroll (outside viewport) -->\r
    <div *ngIf="useVirtualScroll && lineItems.length > 0" class="totals-summary">\r
      <div class="totals-grid">\r
        <div class="totals-item">\r
          <span class="totals-label">SUBTOTAL:</span>\r
          <span class="totals-value">{{ formatCurrency(totals.total_subtotal) }}</span>\r
        </div>\r
        <div class="totals-item">\r
          <span class="totals-label">IVA:</span>\r
          <span class="totals-value">{{ formatCurrency(totals.total_iva) }}</span>\r
        </div>\r
        <div class="totals-item">\r
          <span class="totals-label">IEPS:</span>\r
          <span class="totals-value">{{ formatCurrency(totals.total_ieps) }}</span>\r
        </div>\r
        <div class="totals-item totals-item--grand">\r
          <span class="totals-label">TOTAL:</span>\r
          <span class="totals-value">{{ formatCurrency(totals.grand_total) }}</span>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Mobile Card View -->\r
  <div class="card-view" role="list" aria-label="Lista de l\xEDneas de productos">\r
    <div\r
      *ngFor="let item of lineItems; trackBy: trackByLineItem"\r
      class="line-item-card"\r
      role="listitem"\r
    >\r
      <div class="line-item-card__header">\r
        <div class="line-item-card__product">\r
          <span class="label">PRODUCTO:</span>\r
          <span class="value">{{ item.product?.name || 'N/A' }}</span>\r
        </div>\r
      </div>\r
      \r
      <div class="line-item-card__body">\r
        <div class="line-item-card__row">\r
          <span class="label">UOM:</span>\r
          <span class="value">{{ item.uom?.code || item.uom?.name || 'N/A' }}</span>\r
        </div>\r
        <div class="line-item-card__row">\r
          <span class="label">CANTIDAD:</span>\r
          <span class="value">{{ item.quantity }}</span>\r
        </div>\r
        <div class="line-item-card__row">\r
          <span class="label">PRECIO:</span>\r
          <span class="value">{{ formatCurrency(item.unit_price) }}</span>\r
        </div>\r
        <div class="line-item-card__row">\r
          <span class="label">SUBTOTAL:</span>\r
          <span class="value">{{ formatCurrency(item.subtotal) }}</span>\r
        </div>\r
        <div class="line-item-card__row">\r
          <span class="label">IVA:</span>\r
          <span class="value">{{ formatCurrency(item.iva_amount) }}</span>\r
        </div>\r
        <div class="line-item-card__row">\r
          <span class="label">IEPS:</span>\r
          <span class="value">{{ formatCurrency(item.ieps_amount) }}</span>\r
        </div>\r
        <div class="line-item-card__row line-item-card__row--total">\r
          <span class="label">TOTAL:</span>\r
          <span class="value">{{ formatCurrency(item.line_total) }}</span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div *ngIf="lineItems.length === 0" class="empty-state" role="status">\r
      <p>No hay l\xEDneas de productos</p>\r
    </div>\r
\r
    <!-- Mobile Totals Summary -->\r
    <div *ngIf="lineItems.length > 0" class="mobile-totals-summary">\r
      <div class="mobile-totals-row">\r
        <span class="label">SUBTOTAL:</span>\r
        <span class="value">{{ formatCurrency(totals.total_subtotal) }}</span>\r
      </div>\r
      <div class="mobile-totals-row">\r
        <span class="label">IVA:</span>\r
        <span class="value">{{ formatCurrency(totals.total_iva) }}</span>\r
      </div>\r
      <div class="mobile-totals-row">\r
        <span class="label">IEPS:</span>\r
        <span class="value">{{ formatCurrency(totals.total_ieps) }}</span>\r
      </div>\r
      <div class="mobile-totals-row mobile-totals-row--grand">\r
        <span class="label">TOTAL:</span>\r
        <span class="value">{{ formatCurrency(totals.grand_total) }}</span>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/purchase-orders/components/line-items-table/line-items-table.component.scss */\n.line-items-table-container {\n  position: relative;\n  width: 100%;\n}\n.table-view {\n  display: block;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n@media (max-width: 767px) {\n  .table-view {\n    display: none;\n  }\n}\n.virtual-scroll-wrapper {\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.line-items-viewport {\n  height: 400px;\n  width: 100%;\n}\n.line-items-table {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.line-items-table thead {\n  background: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.line-items-table thead th {\n  padding: 12px 16px;\n  text-align: left;\n  font-weight: 600;\n  font-size: 12px;\n  color: #495057;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.line-items-table thead th.text-right {\n  text-align: right;\n}\n.line-items-table tbody tr {\n  border-bottom: 1px solid #e9ecef;\n}\n.line-items-table tbody tr:hover {\n  background-color: #f8f9fa;\n}\n.line-items-table tbody td {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #212529;\n  white-space: nowrap;\n}\n.line-items-table tbody td.text-right {\n  text-align: right;\n}\n.line-items-table tbody td.font-weight-bold {\n  font-weight: 600;\n}\n.line-items-table tfoot {\n  background: #f8f9fa;\n  border-top: 2px solid #dee2e6;\n}\n.line-items-table tfoot .totals-row td {\n  padding: 16px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #212529;\n}\n.line-items-table tfoot .totals-row td.total-grand {\n  font-size: 16px;\n  color: #007bff;\n}\n.totals-summary {\n  background: #f8f9fa;\n  border: 1px solid #dee2e6;\n  border-top: 2px solid #007bff;\n  border-radius: 0 0 8px 8px;\n  padding: 16px;\n  margin-top: -1px;\n}\n.totals-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n}\n@media (max-width: 1024px) {\n  .totals-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n.totals-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.totals-item .totals-label {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.totals-item .totals-value {\n  font-size: 16px;\n  font-weight: 600;\n  color: #212529;\n}\n.totals-item--grand .totals-label {\n  color: #007bff;\n}\n.totals-item--grand .totals-value {\n  font-size: 18px;\n  color: #007bff;\n}\n.card-view {\n  display: none;\n}\n@media (max-width: 767px) {\n  .card-view {\n    display: block;\n  }\n}\n.line-item-card {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 16px;\n  padding: 16px;\n}\n.line-item-card__header {\n  margin-bottom: 12px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #e9ecef;\n}\n.line-item-card__product {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.line-item-card__product .label {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.line-item-card__product .value {\n  font-size: 14px;\n  font-weight: 600;\n  color: #212529;\n}\n.line-item-card__body {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.line-item-card__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 14px;\n}\n.line-item-card__row .label {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 12px;\n}\n.line-item-card__row .value {\n  color: #212529;\n  text-align: right;\n}\n.line-item-card__row--total {\n  margin-top: 8px;\n  padding-top: 8px;\n  border-top: 1px solid #e9ecef;\n}\n.line-item-card__row--total .label {\n  font-size: 14px;\n  color: #007bff;\n}\n.line-item-card__row--total .value {\n  font-size: 16px;\n  font-weight: 600;\n  color: #007bff;\n}\n.mobile-totals-summary {\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 16px;\n  margin-top: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.mobile-totals-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n  font-size: 14px;\n}\n.mobile-totals-row .label {\n  font-weight: 600;\n  color: #6c757d;\n}\n.mobile-totals-row .value {\n  font-weight: 600;\n  color: #212529;\n}\n.mobile-totals-row--grand {\n  margin-top: 8px;\n  padding-top: 12px;\n  border-top: 2px solid #dee2e6;\n}\n.mobile-totals-row--grand .label {\n  font-size: 16px;\n  color: #007bff;\n}\n.mobile-totals-row--grand .value {\n  font-size: 18px;\n  color: #007bff;\n}\n.empty-state {\n  text-align: center;\n  padding: 48px 24px;\n  color: #6c757d;\n}\n.empty-state .empty-message p {\n  margin: 0;\n  font-size: 16px;\n}\n.text-right {\n  text-align: right;\n}\n.font-weight-bold {\n  font-weight: 600;\n}\n*:focus {\n  outline-offset: 2px;\n}\n@media (max-width: 1024px) {\n  .line-items-table thead th,\n  .line-items-table tbody td {\n    padding: 10px 12px;\n    font-size: 13px;\n  }\n}\n@media print {\n  .line-items-table-container .card-view {\n    display: none;\n  }\n  .line-items-table-container .table-view {\n    display: block;\n  }\n  .line-items-table-container .line-items-table {\n    box-shadow: none;\n    border: 1px solid #dee2e6;\n  }\n}\n/*# sourceMappingURL=line-items-table.component.css.map */\n"] }]
  }], () => [{ type: TaxCalculatorService }], { lineItems: [{
    type: Input
  }], editable: [{
    type: Input
  }], lineItemChange: [{
    type: Output
  }], lineItemRemove: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LineItemsTableComponent, { className: "LineItemsTableComponent", filePath: "src/app/features/purchase-orders/components/line-items-table/line-items-table.component.ts", lineNumber: 21 });
})();

// src/app/features/purchase-orders/components/payments-list/payments-list.component.ts
function PaymentsListComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function PaymentsListComponent_button_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAddPayment());
    });
    \u0275\u0275elementStart(1, "span", 10);
    \u0275\u0275text(2, "+");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 11);
    \u0275\u0275text(4, "Registrar Pago");
    \u0275\u0275elementEnd()();
  }
}
function PaymentsListComponent_table_6_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 17)(1, "td", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 22);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const payment_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(payment_r3.payment_date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(payment_r3.amount));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r3.payment_method);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r3.reference || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(payment_r3.notes || "-");
  }
}
function PaymentsListComponent_table_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 12)(1, "thead")(2, "tr", 13)(3, "th", 14);
    \u0275\u0275text(4, "FECHA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 15);
    \u0275\u0275text(6, "MONTO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 14);
    \u0275\u0275text(8, "M\xC9TODO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 14);
    \u0275\u0275text(10, "REFERENCIA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 14);
    \u0275\u0275text(12, "NOTAS");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275template(14, PaymentsListComponent_table_6_tr_14_Template, 11, 5, "tr", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r1.payments)("ngForTrackBy", ctx_r1.trackByPayment);
  }
}
function PaymentsListComponent_div_7_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, 'Haz clic en "Registrar Pago" para agregar el primer pago');
    \u0275\u0275elementEnd();
  }
}
function PaymentsListComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24);
    \u0275\u0275text(2, "\u{1F4B3}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 25);
    \u0275\u0275text(4, "No hay pagos registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, PaymentsListComponent_div_7_p_5_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.canAddPayment);
  }
}
function PaymentsListComponent_div_9_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "span", 31);
    \u0275\u0275text(2, "NOTAS:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const payment_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(payment_r4.notes);
  }
}
function PaymentsListComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "div", 30)(3, "span", 31);
    \u0275\u0275text(4, "FECHA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 34)(10, "div", 35)(11, "span", 31);
    \u0275\u0275text(12, "M\xC9TODO:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 32);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 35)(16, "span", 31);
    \u0275\u0275text(17, "REFERENCIA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 32);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, PaymentsListComponent_div_9_div_20_Template, 5, 1, "div", 36);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const payment_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(payment_r4.payment_date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatCurrency(payment_r4.amount), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(payment_r4.payment_method);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(payment_r4.reference || "N/A");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", payment_r4.notes);
  }
}
function PaymentsListComponent_div_10_p_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 27);
    \u0275\u0275text(1, 'Haz clic en "Registrar Pago" para agregar el primer pago');
    \u0275\u0275elementEnd();
  }
}
function PaymentsListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 24);
    \u0275\u0275text(2, "\u{1F4B3}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 25);
    \u0275\u0275text(4, "No hay pagos registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, PaymentsListComponent_div_10_p_5_Template, 2, 0, "p", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.canAddPayment);
  }
}
var PaymentsListComponent = class _PaymentsListComponent {
  taxCalculator;
  payments = [];
  canAddPayment = false;
  addPayment = new EventEmitter();
  constructor(taxCalculator) {
    this.taxCalculator = taxCalculator;
  }
  /**
   * Format currency amount
   */
  formatCurrency(amount) {
    return this.taxCalculator.formatCurrency(amount);
  }
  /**
   * Format date to Spanish locale
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  /**
   * Handle add payment button click
   */
  onAddPayment() {
    this.addPayment.emit();
  }
  /**
   * Track by function for ngFor optimization
   */
  trackByPayment(index, payment) {
    return payment.id;
  }
  static \u0275fac = function PaymentsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentsListComponent)(\u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentsListComponent, selectors: [["app-payments-list"]], inputs: { payments: "payments", canAddPayment: "canAddPayment" }, outputs: { addPayment: "addPayment" }, decls: 11, vars: 6, consts: [[1, "payments-list-container"], [1, "payments-list-header"], [1, "payments-list-title"], ["type", "button", "class", "btn-add-payment", "aria-label", "Registrar nuevo pago", 3, "click", 4, "ngIf"], ["role", "region", "aria-label", "Tabla de pagos", 1, "table-view"], ["class", "payments-table", "role", "table", 4, "ngIf"], ["class", "empty-state", "role", "status", 4, "ngIf"], ["role", "list", "aria-label", "Lista de pagos", 1, "card-view"], ["class", "payment-card", "role", "listitem", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", "aria-label", "Registrar nuevo pago", 1, "btn-add-payment", 3, "click"], [1, "btn-icon"], [1, "btn-text"], ["role", "table", 1, "payments-table"], ["role", "row"], ["role", "columnheader", "scope", "col"], ["role", "columnheader", "scope", "col", 1, "text-right"], ["role", "row", "class", "payment-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["role", "row", 1, "payment-row"], ["role", "cell", "data-label", "FECHA"], ["role", "cell", "data-label", "MONTO", 1, "text-right", "font-weight-bold"], ["role", "cell", "data-label", "M\xC9TODO"], ["role", "cell", "data-label", "REFERENCIA"], ["role", "cell", "data-label", "NOTAS"], ["role", "status", 1, "empty-state"], [1, "empty-icon"], [1, "empty-message"], ["class", "empty-hint", 4, "ngIf"], [1, "empty-hint"], ["role", "listitem", 1, "payment-card"], [1, "payment-card__header"], [1, "payment-card__date"], [1, "label"], [1, "value"], [1, "payment-card__amount"], [1, "payment-card__body"], [1, "payment-card__row"], ["class", "payment-card__row", 4, "ngIf"]], template: function PaymentsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
      \u0275\u0275text(3, "Pagos Registrados");
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, PaymentsListComponent_button_4_Template, 5, 0, "button", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4);
      \u0275\u0275template(6, PaymentsListComponent_table_6_Template, 15, 2, "table", 5)(7, PaymentsListComponent_div_7_Template, 6, 1, "div", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 7);
      \u0275\u0275template(9, PaymentsListComponent_div_9_Template, 21, 5, "div", 8)(10, PaymentsListComponent_div_10_Template, 6, 1, "div", 6);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.canAddPayment);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.payments.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.payments.length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.payments)("ngForTrackBy", ctx.trackByPayment);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.payments.length === 0);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf], styles: ["\n\n.payments-list-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\n.payments-list-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  gap: 16px;\n}\n@media (max-width: 767px) {\n  .payments-list-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.payments-list-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #212529;\n}\n@media (max-width: 767px) {\n  .payments-list-title[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n.btn-add-payment[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n}\n.btn-add-payment[_ngcontent-%COMP%]:hover {\n  background: #0056b3;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);\n}\n.btn-add-payment[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.btn-add-payment[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #007bff;\n  outline-offset: 2px;\n}\n.btn-add-payment[_ngcontent-%COMP%]   .btn-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  line-height: 1;\n}\n@media (max-width: 767px) {\n  .btn-add-payment[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n    padding: 12px 20px;\n  }\n}\n.table-view[_ngcontent-%COMP%] {\n  display: block;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n@media (max-width: 767px) {\n  .table-view[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.payments-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.payments-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n}\n.payments-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  font-weight: 600;\n  font-size: 12px;\n  color: #495057;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.payments-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e9ecef;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #212529;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td.font-weight-bold[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #007bff;\n}\n.card-view[_ngcontent-%COMP%] {\n  display: none;\n}\n@media (max-width: 767px) {\n  .card-view[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n.payment-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 16px;\n  padding: 16px;\n}\n.payment-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 12px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #e9ecef;\n  gap: 12px;\n}\n.payment-card__date[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.payment-card__date[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.payment-card__date[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: #212529;\n}\n.payment-card__amount[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #007bff;\n  white-space: nowrap;\n}\n.payment-card__body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.payment-card__row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  font-size: 14px;\n  gap: 12px;\n}\n.payment-card__row[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 12px;\n  white-space: nowrap;\n}\n.payment-card__row[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #212529;\n  text-align: right;\n  word-break: break-word;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 24px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.empty-state[_ngcontent-%COMP%]   .empty-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-message[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #6c757d;\n}\n.empty-state[_ngcontent-%COMP%]   .empty-hint[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #adb5bd;\n}\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.font-weight-bold[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n*[_ngcontent-%COMP%]:focus {\n  outline-offset: 2px;\n}\n@media (max-width: 1024px) {\n  .payments-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n   .payments-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    font-size: 13px;\n  }\n}\n@media print {\n  .payments-list-container[_ngcontent-%COMP%]   .card-view[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .payments-list-container[_ngcontent-%COMP%]   .table-view[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .payments-list-container[_ngcontent-%COMP%]   .payments-table[_ngcontent-%COMP%] {\n    box-shadow: none;\n    border: 1px solid #dee2e6;\n  }\n  .payments-list-container[_ngcontent-%COMP%]   .btn-add-payment[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=payments-list.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentsListComponent, [{
    type: Component,
    args: [{ selector: "app-payments-list", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="payments-list-container">\r
  <!-- Header with Add Payment Button -->\r
  <div class="payments-list-header">\r
    <h3 class="payments-list-title">Pagos Registrados</h3>\r
    <button\r
      *ngIf="canAddPayment"\r
      type="button"\r
      class="btn-add-payment"\r
      (click)="onAddPayment()"\r
      aria-label="Registrar nuevo pago"\r
    >\r
      <span class="btn-icon">+</span>\r
      <span class="btn-text">Registrar Pago</span>\r
    </button>\r
  </div>\r
\r
  <!-- Desktop/Tablet Table View -->\r
  <div class="table-view" role="region" aria-label="Tabla de pagos">\r
    <table *ngIf="payments.length > 0" class="payments-table" role="table">\r
      <thead>\r
        <tr role="row">\r
          <th role="columnheader" scope="col">FECHA</th>\r
          <th role="columnheader" scope="col" class="text-right">MONTO</th>\r
          <th role="columnheader" scope="col">M\xC9TODO</th>\r
          <th role="columnheader" scope="col">REFERENCIA</th>\r
          <th role="columnheader" scope="col">NOTAS</th>\r
        </tr>\r
      </thead>\r
      <tbody>\r
        <tr\r
          *ngFor="let payment of payments; trackBy: trackByPayment"\r
          role="row"\r
          class="payment-row"\r
        >\r
          <td role="cell" data-label="FECHA">{{ formatDate(payment.payment_date) }}</td>\r
          <td role="cell" data-label="MONTO" class="text-right font-weight-bold">{{ formatCurrency(payment.amount) }}</td>\r
          <td role="cell" data-label="M\xC9TODO">{{ payment.payment_method }}</td>\r
          <td role="cell" data-label="REFERENCIA">{{ payment.reference || 'N/A' }}</td>\r
          <td role="cell" data-label="NOTAS">{{ payment.notes || '-' }}</td>\r
        </tr>\r
      </tbody>\r
    </table>\r
\r
    <!-- Empty State -->\r
    <div *ngIf="payments.length === 0" class="empty-state" role="status">\r
      <div class="empty-icon">\u{1F4B3}</div>\r
      <p class="empty-message">No hay pagos registrados</p>\r
      <p class="empty-hint" *ngIf="canAddPayment">Haz clic en "Registrar Pago" para agregar el primer pago</p>\r
    </div>\r
  </div>\r
\r
  <!-- Mobile Card View -->\r
  <div class="card-view" role="list" aria-label="Lista de pagos">\r
    <div\r
      *ngFor="let payment of payments; trackBy: trackByPayment"\r
      class="payment-card"\r
      role="listitem"\r
    >\r
      <div class="payment-card__header">\r
        <div class="payment-card__date">\r
          <span class="label">FECHA:</span>\r
          <span class="value">{{ formatDate(payment.payment_date) }}</span>\r
        </div>\r
        <div class="payment-card__amount">\r
          {{ formatCurrency(payment.amount) }}\r
        </div>\r
      </div>\r
      \r
      <div class="payment-card__body">\r
        <div class="payment-card__row">\r
          <span class="label">M\xC9TODO:</span>\r
          <span class="value">{{ payment.payment_method }}</span>\r
        </div>\r
        <div class="payment-card__row">\r
          <span class="label">REFERENCIA:</span>\r
          <span class="value">{{ payment.reference || 'N/A' }}</span>\r
        </div>\r
        <div class="payment-card__row" *ngIf="payment.notes">\r
          <span class="label">NOTAS:</span>\r
          <span class="value">{{ payment.notes }}</span>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- Mobile Empty State -->\r
    <div *ngIf="payments.length === 0" class="empty-state" role="status">\r
      <div class="empty-icon">\u{1F4B3}</div>\r
      <p class="empty-message">No hay pagos registrados</p>\r
      <p class="empty-hint" *ngIf="canAddPayment">Haz clic en "Registrar Pago" para agregar el primer pago</p>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/purchase-orders/components/payments-list/payments-list.component.scss */\n.payments-list-container {\n  position: relative;\n  width: 100%;\n}\n.payments-list-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  gap: 16px;\n}\n@media (max-width: 767px) {\n  .payments-list-header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n.payments-list-title {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 600;\n  color: #212529;\n}\n@media (max-width: 767px) {\n  .payments-list-title {\n    font-size: 16px;\n  }\n}\n.btn-add-payment {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n}\n.btn-add-payment:hover {\n  background: #0056b3;\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);\n}\n.btn-add-payment:active {\n  transform: translateY(0);\n}\n.btn-add-payment:focus {\n  outline: 2px solid #007bff;\n  outline-offset: 2px;\n}\n.btn-add-payment .btn-icon {\n  font-size: 18px;\n  line-height: 1;\n}\n@media (max-width: 767px) {\n  .btn-add-payment {\n    width: 100%;\n    justify-content: center;\n    padding: 12px 20px;\n  }\n}\n.table-view {\n  display: block;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n@media (max-width: 767px) {\n  .table-view {\n    display: none;\n  }\n}\n.payments-table {\n  width: 100%;\n  border-collapse: collapse;\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.payments-table thead {\n  background: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n}\n.payments-table thead th {\n  padding: 12px 16px;\n  text-align: left;\n  font-weight: 600;\n  font-size: 12px;\n  color: #495057;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n.payments-table thead th.text-right {\n  text-align: right;\n}\n.payments-table tbody tr {\n  border-bottom: 1px solid #e9ecef;\n}\n.payments-table tbody tr:last-child {\n  border-bottom: none;\n}\n.payments-table tbody tr:hover {\n  background-color: #f8f9fa;\n}\n.payments-table tbody td {\n  padding: 12px 16px;\n  font-size: 14px;\n  color: #212529;\n}\n.payments-table tbody td.text-right {\n  text-align: right;\n}\n.payments-table tbody td.font-weight-bold {\n  font-weight: 600;\n  color: #007bff;\n}\n.card-view {\n  display: none;\n}\n@media (max-width: 767px) {\n  .card-view {\n    display: block;\n  }\n}\n.payment-card {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  margin-bottom: 16px;\n  padding: 16px;\n}\n.payment-card__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 12px;\n  padding-bottom: 12px;\n  border-bottom: 1px solid #e9ecef;\n  gap: 12px;\n}\n.payment-card__date {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  flex: 1;\n}\n.payment-card__date .label {\n  font-size: 11px;\n  font-weight: 600;\n  color: #6c757d;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.payment-card__date .value {\n  font-size: 14px;\n  font-weight: 600;\n  color: #212529;\n}\n.payment-card__amount {\n  font-size: 18px;\n  font-weight: 600;\n  color: #007bff;\n  white-space: nowrap;\n}\n.payment-card__body {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.payment-card__row {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  font-size: 14px;\n  gap: 12px;\n}\n.payment-card__row .label {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 12px;\n  white-space: nowrap;\n}\n.payment-card__row .value {\n  color: #212529;\n  text-align: right;\n  word-break: break-word;\n}\n.empty-state {\n  text-align: center;\n  padding: 48px 24px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.empty-state .empty-icon {\n  font-size: 48px;\n  margin-bottom: 16px;\n  opacity: 0.5;\n}\n.empty-state .empty-message {\n  margin: 0 0 8px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: #6c757d;\n}\n.empty-state .empty-hint {\n  margin: 0;\n  font-size: 14px;\n  color: #adb5bd;\n}\n.text-right {\n  text-align: right;\n}\n.font-weight-bold {\n  font-weight: 600;\n}\n*:focus {\n  outline-offset: 2px;\n}\n@media (max-width: 1024px) {\n  .payments-table thead th,\n  .payments-table tbody td {\n    padding: 10px 12px;\n    font-size: 13px;\n  }\n}\n@media print {\n  .payments-list-container .card-view {\n    display: none;\n  }\n  .payments-list-container .table-view {\n    display: block;\n  }\n  .payments-list-container .payments-table {\n    box-shadow: none;\n    border: 1px solid #dee2e6;\n  }\n  .payments-list-container .btn-add-payment {\n    display: none;\n  }\n}\n/*# sourceMappingURL=payments-list.component.css.map */\n"] }]
  }], () => [{ type: TaxCalculatorService }], { payments: [{
    type: Input
  }], canAddPayment: [{
    type: Input
  }], addPayment: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentsListComponent, { className: "PaymentsListComponent", filePath: "src/app/features/purchase-orders/components/payments-list/payments-list.component.ts", lineNumber: 20 });
})();

// src/app/features/purchase-orders/components/payment-dialog/payment-dialog.component.ts
function PaymentDialogComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getAmountError(), " ");
  }
}
function PaymentDialogComponent_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, " La fecha de pago es requerida ");
    \u0275\u0275elementEnd();
  }
}
function PaymentDialogComponent_span_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1, " El m\xE9todo de pago es requerido ");
    \u0275\u0275elementEnd();
  }
}
var PaymentDialogComponent = class _PaymentDialogComponent {
  fb;
  dialogRef;
  data;
  X = X;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  form;
  remainingAmount;
  constructor(fb, dialogRef, data) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.data = data;
    this.remainingAmount = data.remainingAmount;
    this.form = this.fb.group({
      amount: [
        "",
        [
          Validators.required,
          Validators.min(0.01),
          Validators.max(this.remainingAmount)
        ]
      ],
      payment_date: [
        (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        [Validators.required]
      ],
      payment_method: [
        "Transferencia",
        [Validators.required]
      ],
      reference: [""],
      notes: [""]
    });
  }
  /**
   * Close dialog without saving
   */
  closeDialog() {
    if (!this.loading()) {
      this.dialogRef.close(null);
    }
  }
  /**
   * Submit payment form
   */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value;
    const paymentData = {
      amount: parseFloat(formValue.amount),
      payment_date: formValue.payment_date,
      payment_method: formValue.payment_method,
      reference: formValue.reference || void 0,
      notes: formValue.notes || void 0
    };
    this.dialogRef.close(paymentData);
  }
  /**
   * Get validation error message for amount field
   */
  getAmountError() {
    const control = this.form.get("amount");
    if (!control || !control.errors || !control.touched) {
      return null;
    }
    if (control.errors["required"]) {
      return "El monto es requerido";
    }
    if (control.errors["min"]) {
      return "El monto debe ser mayor a cero";
    }
    if (control.errors["max"]) {
      return `El monto no puede exceder el saldo pendiente (${this.formatCurrency(this.remainingAmount)})`;
    }
    return "Monto inv\xE1lido";
  }
  /**
   * Format currency for display
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(amount);
  }
  static \u0275fac = function PaymentDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaymentDialogComponent, selectors: [["app-payment-dialog"]], decls: 50, vars: 18, consts: [[1, "dialog-overlay", 3, "click"], ["role", "dialog", "aria-labelledby", "dialog-title", "aria-modal", "true", 1, "dialog-container", 3, "click"], [1, "dialog-header"], ["id", "dialog-title"], ["type", "button", "aria-label", "Cerrar di\xE1logo", 1, "close-button", 3, "click", "disabled"], [3, "img", "size"], [1, "dialog-body"], ["role", "status", "aria-live", "polite", 1, "remaining-amount-info"], [1, "label"], [1, "amount"], [3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "amount"], ["id", "amount", "type", "number", "formControlName", "amount", "placeholder", "0.00"], ["id", "amount-error", "class", "error-message", "role", "alert", 4, "ngIf"], ["for", "payment_date"], ["id", "payment_date", "type", "date", "formControlName", "payment_date"], ["class", "error-message", "role", "alert", 4, "ngIf"], ["for", "payment_method"], ["id", "payment_method", "formControlName", "payment_method", 1, "form-select"], ["value", "Transferencia"], ["value", "Efectivo"], ["value", "Cheque"], ["value", "Tarjeta"], ["for", "reference"], ["id", "reference", "type", "text", "formControlName", "reference", "placeholder", "N\xFAmero de referencia o folio"], ["for", "notes"], ["id", "notes", "formControlName", "notes", "placeholder", "Notas adicionales sobre el pago", "rows", "3", 1, "form-textarea"], [1, "dialog-footer"], ["type", "button", "variant", "secondary", 3, "click", "disabled"], ["type", "button", "variant", "primary", 3, "click", "disabled", "loading"], ["id", "amount-error", "role", "alert", 1, "error-message"], ["role", "alert", 1, "error-message"]], template: function PaymentDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_div_click_0_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementStart(1, "div", 1);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_div_click_1_listener($event) {
        return $event.stopPropagation();
      });
      \u0275\u0275elementStart(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Registrar Pago");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 4);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_button_click_5_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275element(6, "lucide-icon", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "span", 8);
      \u0275\u0275text(10, "Saldo pendiente:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "span", 9);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "form", 10);
      \u0275\u0275listener("ngSubmit", function PaymentDialogComponent_Template_form_ngSubmit_13_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(14, "div", 11)(15, "label", 12);
      \u0275\u0275text(16, "Monto *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "app-input", 13);
      \u0275\u0275template(18, PaymentDialogComponent_span_18_Template, 2, 1, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 11)(20, "label", 15);
      \u0275\u0275text(21, "Fecha de Pago *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(22, "app-input", 16);
      \u0275\u0275template(23, PaymentDialogComponent_span_23_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 11)(25, "label", 18);
      \u0275\u0275text(26, "M\xE9todo de Pago *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "select", 19)(28, "option", 20);
      \u0275\u0275text(29, "Transferencia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "option", 21);
      \u0275\u0275text(31, "Efectivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "option", 22);
      \u0275\u0275text(33, "Cheque");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "option", 23);
      \u0275\u0275text(35, "Tarjeta");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(36, PaymentDialogComponent_span_36_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 11)(38, "label", 24);
      \u0275\u0275text(39, "Referencia");
      \u0275\u0275elementEnd();
      \u0275\u0275element(40, "app-input", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 11)(42, "label", 26);
      \u0275\u0275text(43, "Notas");
      \u0275\u0275elementEnd();
      \u0275\u0275element(44, "textarea", 27);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(45, "div", 28)(46, "app-button", 29);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_app_button_click_46_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275text(47, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "app-button", 30);
      \u0275\u0275listener("click", function PaymentDialogComponent_Template_app_button_click_48_listener() {
        return ctx.submit();
      });
      \u0275\u0275text(49, " Registrar Pago ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_10_0;
      let tmp_11_0;
      let tmp_13_0;
      let tmp_14_0;
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.remainingAmount));
      \u0275\u0275advance();
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-required", true)("aria-invalid", ((tmp_6_0 = ctx.form.get("amount")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.form.get("amount")) == null ? null : tmp_6_0.touched))("aria-describedby", ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("amount")) == null ? null : tmp_7_0.touched) ? "amount-error" : null);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("amount")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("amount")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-required", true)("aria-invalid", ((tmp_10_0 = ctx.form.get("payment_date")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx.form.get("payment_date")) == null ? null : tmp_10_0.touched));
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ((tmp_11_0 = ctx.form.get("payment_date")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx.form.get("payment_date")) == null ? null : tmp_11_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-required", true)("aria-invalid", ((tmp_13_0 = ctx.form.get("payment_method")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx.form.get("payment_method")) == null ? null : tmp_13_0.touched));
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ((tmp_14_0 = ctx.form.get("payment_method")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx.form.get("payment_method")) == null ? null : tmp_14_0.touched));
      \u0275\u0275advance(10);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.loading())("loading", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    LucideAngularModule,
    LucideAngularComponent,
    InputComponent,
    ButtonComponent
  ], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  max-width: 500px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #212121;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n  color: #757575;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f5f5f5;\n  color: #212121;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #1976d2;\n  outline-offset: 2px;\n}\n.dialog-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.dialog-body[_ngcontent-%COMP%]   .remaining-amount-info[_ngcontent-%COMP%] {\n  background-color: #e3f2fd;\n  border: 1px solid #90caf9;\n  border-radius: 4px;\n  padding: 1rem;\n  margin-bottom: 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.dialog-body[_ngcontent-%COMP%]   .remaining-amount-info[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #1976d2;\n}\n.dialog-body[_ngcontent-%COMP%]   .remaining-amount-info[_ngcontent-%COMP%]   .amount[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1565c0;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  color: #424242;\n  font-size: 0.875rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%], \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.625rem;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  transition: border-color 0.2s;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]:focus, \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-select[aria-invalid=true][_ngcontent-%COMP%], \n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[aria-invalid=true][_ngcontent-%COMP%] {\n  border-color: #d32f2f;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  font-family: inherit;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #d32f2f;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e0e0e0;\n}\n@media (max-width: 768px) {\n  .dialog-overlay[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .dialog-container[_ngcontent-%COMP%] {\n    max-width: 100%;\n    max-height: 100vh;\n    border-radius: 0;\n  }\n  .dialog-footer[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .dialog-footer[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.dialog-container[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n/*# sourceMappingURL=payment-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentDialogComponent, [{
    type: Component,
    args: [{ selector: "app-payment-dialog", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      LucideAngularModule,
      InputComponent,
      ButtonComponent
    ], template: `<div class="dialog-overlay" (click)="closeDialog()">\r
  <div class="dialog-container" (click)="$event.stopPropagation()" role="dialog" aria-labelledby="dialog-title" aria-modal="true">\r
    <!-- Header -->\r
    <div class="dialog-header">\r
      <h2 id="dialog-title">Registrar Pago</h2>\r
      <button \r
        type="button" \r
        class="close-button" \r
        (click)="closeDialog()"\r
        [disabled]="loading()"\r
        aria-label="Cerrar di\xE1logo"\r
      >\r
        <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
      </button>\r
    </div>\r
\r
    <!-- Body -->\r
    <div class="dialog-body">\r
      <!-- Remaining Amount Display -->\r
      <div class="remaining-amount-info" role="status" aria-live="polite">\r
        <span class="label">Saldo pendiente:</span>\r
        <span class="amount">{{ formatCurrency(remainingAmount) }}</span>\r
      </div>\r
\r
      <!-- Payment Form -->\r
      <form [formGroup]="form" (ngSubmit)="submit()">\r
        <!-- Amount -->\r
        <div class="form-field">\r
          <label for="amount">Monto *</label>\r
          <app-input\r
            id="amount"\r
            type="number"\r
            formControlName="amount"\r
            placeholder="0.00"\r
            [attr.aria-required]="true"\r
            [attr.aria-invalid]="form.get('amount')?.invalid && form.get('amount')?.touched"\r
            [attr.aria-describedby]="form.get('amount')?.invalid && form.get('amount')?.touched ? 'amount-error' : null"\r
          ></app-input>\r
          <span \r
            id="amount-error"\r
            class="error-message" \r
            role="alert"\r
            *ngIf="form.get('amount')?.invalid && form.get('amount')?.touched"\r
          >\r
            {{ getAmountError() }}\r
          </span>\r
        </div>\r
\r
        <!-- Payment Date -->\r
        <div class="form-field">\r
          <label for="payment_date">Fecha de Pago *</label>\r
          <app-input\r
            id="payment_date"\r
            type="date"\r
            formControlName="payment_date"\r
            [attr.aria-required]="true"\r
            [attr.aria-invalid]="form.get('payment_date')?.invalid && form.get('payment_date')?.touched"\r
          ></app-input>\r
          <span \r
            class="error-message" \r
            role="alert"\r
            *ngIf="form.get('payment_date')?.invalid && form.get('payment_date')?.touched"\r
          >\r
            La fecha de pago es requerida\r
          </span>\r
        </div>\r
\r
        <!-- Payment Method -->\r
        <div class="form-field">\r
          <label for="payment_method">M\xE9todo de Pago *</label>\r
          <select \r
            id="payment_method"\r
            class="form-select"\r
            formControlName="payment_method"\r
            [attr.aria-required]="true"\r
            [attr.aria-invalid]="form.get('payment_method')?.invalid && form.get('payment_method')?.touched"\r
          >\r
            <option value="Transferencia">Transferencia</option>\r
            <option value="Efectivo">Efectivo</option>\r
            <option value="Cheque">Cheque</option>\r
            <option value="Tarjeta">Tarjeta</option>\r
          </select>\r
          <span \r
            class="error-message" \r
            role="alert"\r
            *ngIf="form.get('payment_method')?.invalid && form.get('payment_method')?.touched"\r
          >\r
            El m\xE9todo de pago es requerido\r
          </span>\r
        </div>\r
\r
        <!-- Reference -->\r
        <div class="form-field">\r
          <label for="reference">Referencia</label>\r
          <app-input\r
            id="reference"\r
            type="text"\r
            formControlName="reference"\r
            placeholder="N\xFAmero de referencia o folio"\r
          ></app-input>\r
        </div>\r
\r
        <!-- Notes -->\r
        <div class="form-field">\r
          <label for="notes">Notas</label>\r
          <textarea\r
            id="notes"\r
            class="form-textarea"\r
            formControlName="notes"\r
            placeholder="Notas adicionales sobre el pago"\r
            rows="3"\r
          ></textarea>\r
        </div>\r
      </form>\r
    </div>\r
\r
    <!-- Footer -->\r
    <div class="dialog-footer">\r
      <app-button\r
        type="button"\r
        variant="secondary"\r
        (click)="closeDialog()"\r
        [disabled]="loading()"\r
      >\r
        Cancelar\r
      </app-button>\r
      <app-button\r
        type="button"\r
        variant="primary"\r
        (click)="submit()"\r
        [disabled]="form.invalid || loading()"\r
        [loading]="loading()"\r
      >\r
        Registrar Pago\r
      </app-button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/purchase-orders/components/payment-dialog/payment-dialog.component.scss */\n.dialog-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.dialog-container {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  max-width: 500px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.dialog-header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #212121;\n}\n.dialog-header .close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n  color: #757575;\n}\n.dialog-header .close-button:hover:not(:disabled) {\n  background-color: #f5f5f5;\n  color: #212121;\n}\n.dialog-header .close-button:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.dialog-header .close-button:focus-visible {\n  outline: 2px solid #1976d2;\n  outline-offset: 2px;\n}\n.dialog-body {\n  padding: 1.5rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.dialog-body .remaining-amount-info {\n  background-color: #e3f2fd;\n  border: 1px solid #90caf9;\n  border-radius: 4px;\n  padding: 1rem;\n  margin-bottom: 1.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.dialog-body .remaining-amount-info .label {\n  font-weight: 500;\n  color: #1976d2;\n}\n.dialog-body .remaining-amount-info .amount {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1565c0;\n}\n.dialog-body .form-field {\n  margin-bottom: 1.25rem;\n}\n.dialog-body .form-field label {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  color: #424242;\n  font-size: 0.875rem;\n}\n.dialog-body .form-field .form-select,\n.dialog-body .form-field .form-textarea {\n  width: 100%;\n  padding: 0.625rem;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  transition: border-color 0.2s;\n}\n.dialog-body .form-field .form-select:focus,\n.dialog-body .form-field .form-textarea:focus {\n  outline: none;\n  border-color: #1976d2;\n  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);\n}\n.dialog-body .form-field .form-select[aria-invalid=true],\n.dialog-body .form-field .form-textarea[aria-invalid=true] {\n  border-color: #d32f2f;\n}\n.dialog-body .form-field .form-textarea {\n  resize: vertical;\n  font-family: inherit;\n}\n.dialog-body .form-field .error-message {\n  display: block;\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #d32f2f;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e0e0e0;\n}\n@media (max-width: 768px) {\n  .dialog-overlay {\n    padding: 0;\n  }\n  .dialog-container {\n    max-width: 100%;\n    max-height: 100vh;\n    border-radius: 0;\n  }\n  .dialog-footer {\n    flex-direction: column-reverse;\n  }\n  .dialog-footer app-button {\n    width: 100%;\n  }\n}\n.dialog-container:focus {\n  outline: none;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n/*# sourceMappingURL=payment-dialog.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialogRef }, { type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaymentDialogComponent, { className: "PaymentDialogComponent", filePath: "src/app/features/purchase-orders/components/payment-dialog/payment-dialog.component.ts", lineNumber: 34 });
})();

// src/app/features/purchase-orders/components/cancel-dialog/cancel-dialog.component.ts
var _c0 = ["reasonTextarea"];
function CancelDialogComponent_span_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getReasonError(), " ");
  }
}
var CancelDialogComponent = class _CancelDialogComponent {
  fb;
  dialogRef;
  X = X;
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  reasonTextarea;
  form;
  constructor(fb, dialogRef) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.form = this.fb.group({
      cancellation_reason: [
        "",
        [Validators.required]
      ]
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.reasonTextarea?.nativeElement.focus();
    }, 100);
  }
  /**
   * Close dialog without saving
   */
  closeDialog() {
    if (!this.loading()) {
      this.dialogRef.close(null);
    }
  }
  /**
   * Submit cancellation form
   */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const cancellationReason = this.form.value.cancellation_reason.trim();
    this.dialogRef.close(cancellationReason);
  }
  /**
   * Get validation error message for cancellation_reason field
   */
  getReasonError() {
    const control = this.form.get("cancellation_reason");
    if (!control || !control.errors || !control.touched) {
      return null;
    }
    if (control.errors["required"]) {
      return "La raz\xF3n de cancelaci\xF3n es requerida";
    }
    return "Raz\xF3n inv\xE1lida";
  }
  static \u0275fac = function CancelDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CancelDialogComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CancelDialogComponent, selectors: [["app-cancel-dialog"]], viewQuery: function CancelDialogComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.reasonTextarea = _t.first);
    }
  }, decls: 23, vars: 11, consts: [["reasonTextarea", ""], [1, "dialog-overlay", 3, "click"], ["role", "dialog", "aria-labelledby", "dialog-title", "aria-modal", "true", 1, "dialog-container", 3, "click"], [1, "dialog-header"], ["id", "dialog-title"], ["type", "button", "aria-label", "Cerrar di\xE1logo", 1, "close-button", 3, "click", "disabled"], [3, "img", "size"], [1, "dialog-body"], ["role", "status", "aria-live", "polite", 1, "warning-info"], [3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "cancellation_reason"], ["id", "cancellation_reason", "formControlName", "cancellation_reason", "placeholder", "Describe la raz\xF3n por la cual se cancela esta orden", "rows", "4", 1, "form-textarea"], ["id", "reason-error", "class", "error-message", "role", "alert", 4, "ngIf"], [1, "dialog-footer"], ["type", "button", "variant", "secondary", 3, "click", "disabled"], ["type", "button", "variant", "danger", 3, "click", "disabled", "loading"], ["id", "reason-error", "role", "alert", 1, "error-message"]], template: function CancelDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275listener("click", function CancelDialogComponent_Template_div_click_0_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeDialog());
      });
      \u0275\u0275elementStart(1, "div", 2);
      \u0275\u0275listener("click", function CancelDialogComponent_Template_div_click_1_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(2, "div", 3)(3, "h2", 4);
      \u0275\u0275text(4, "Cancelar Orden de Compra");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 5);
      \u0275\u0275listener("click", function CancelDialogComponent_Template_button_click_5_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeDialog());
      });
      \u0275\u0275element(6, "lucide-icon", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 7)(8, "div", 8)(9, "p");
      \u0275\u0275text(10, "Esta acci\xF3n no se puede deshacer. Por favor, proporciona una raz\xF3n para la cancelaci\xF3n.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "form", 9);
      \u0275\u0275listener("ngSubmit", function CancelDialogComponent_Template_form_ngSubmit_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submit());
      });
      \u0275\u0275elementStart(12, "div", 10)(13, "label", 11);
      \u0275\u0275text(14, "Raz\xF3n de Cancelaci\xF3n *");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "textarea", 12, 0);
      \u0275\u0275template(17, CancelDialogComponent_span_17_Template, 2, 1, "span", 13);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "div", 14)(19, "app-button", 15);
      \u0275\u0275listener("click", function CancelDialogComponent_Template_app_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.closeDialog());
      });
      \u0275\u0275text(20, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "app-button", 16);
      \u0275\u0275listener("click", function CancelDialogComponent_Template_app_button_click_21_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submit());
      });
      \u0275\u0275text(22, " Confirmar Cancelaci\xF3n ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(5);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(4);
      \u0275\u0275attribute("aria-required", true)("aria-invalid", ((tmp_6_0 = ctx.form.get("cancellation_reason")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.form.get("cancellation_reason")) == null ? null : tmp_6_0.touched))("aria-describedby", ((tmp_7_0 = ctx.form.get("cancellation_reason")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("cancellation_reason")) == null ? null : tmp_7_0.touched) ? "reason-error" : null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ((tmp_8_0 = ctx.form.get("cancellation_reason")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx.form.get("cancellation_reason")) == null ? null : tmp_8_0.touched));
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.form.invalid || ctx.loading())("loading", ctx.loading());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, LucideAngularModule, LucideAngularComponent, ButtonComponent], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  max-width: 500px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.dialog-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #212121;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n  color: #757575;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f5f5f5;\n  color: #212121;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #1976d2;\n  outline-offset: 2px;\n}\n.dialog-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.dialog-body[_ngcontent-%COMP%]   .warning-info[_ngcontent-%COMP%] {\n  background-color: #fff3e0;\n  border: 1px solid #ffb74d;\n  border-radius: 4px;\n  padding: 1rem;\n  margin-bottom: 1.5rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .warning-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #e65100;\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  color: #424242;\n  font-size: 0.875rem;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.625rem;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  transition: border-color 0.2s;\n  resize: vertical;\n  font-family: inherit;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1976d2;\n  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[aria-invalid=true][_ngcontent-%COMP%] {\n  border-color: #d32f2f;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .form-textarea[_ngcontent-%COMP%]::placeholder {\n  color: #9e9e9e;\n}\n.dialog-body[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #d32f2f;\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e0e0e0;\n}\n@media (max-width: 768px) {\n  .dialog-overlay[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .dialog-container[_ngcontent-%COMP%] {\n    max-width: 100%;\n    max-height: 100vh;\n    border-radius: 0;\n  }\n  .dialog-footer[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .dialog-footer[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.dialog-container[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n/*# sourceMappingURL=cancel-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CancelDialogComponent, [{
    type: Component,
    args: [{ selector: "app-cancel-dialog", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      LucideAngularModule,
      ButtonComponent
    ], template: `<div class="dialog-overlay" (click)="closeDialog()">\r
  <div class="dialog-container" (click)="$event.stopPropagation()" role="dialog" aria-labelledby="dialog-title" aria-modal="true">\r
    <!-- Header -->\r
    <div class="dialog-header">\r
      <h2 id="dialog-title">Cancelar Orden de Compra</h2>\r
      <button \r
        type="button" \r
        class="close-button" \r
        (click)="closeDialog()"\r
        [disabled]="loading()"\r
        aria-label="Cerrar di\xE1logo"\r
      >\r
        <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
      </button>\r
    </div>\r
\r
    <!-- Body -->\r
    <div class="dialog-body">\r
      <!-- Warning Message -->\r
      <div class="warning-info" role="status" aria-live="polite">\r
        <p>Esta acci\xF3n no se puede deshacer. Por favor, proporciona una raz\xF3n para la cancelaci\xF3n.</p>\r
      </div>\r
\r
      <!-- Cancellation Form -->\r
      <form [formGroup]="form" (ngSubmit)="submit()">\r
        <!-- Cancellation Reason -->\r
        <div class="form-field">\r
          <label for="cancellation_reason">Raz\xF3n de Cancelaci\xF3n *</label>\r
          <textarea\r
            #reasonTextarea\r
            id="cancellation_reason"\r
            class="form-textarea"\r
            formControlName="cancellation_reason"\r
            placeholder="Describe la raz\xF3n por la cual se cancela esta orden"\r
            rows="4"\r
            [attr.aria-required]="true"\r
            [attr.aria-invalid]="form.get('cancellation_reason')?.invalid && form.get('cancellation_reason')?.touched"\r
            [attr.aria-describedby]="form.get('cancellation_reason')?.invalid && form.get('cancellation_reason')?.touched ? 'reason-error' : null"\r
          ></textarea>\r
          <span \r
            id="reason-error"\r
            class="error-message" \r
            role="alert"\r
            *ngIf="form.get('cancellation_reason')?.invalid && form.get('cancellation_reason')?.touched"\r
          >\r
            {{ getReasonError() }}\r
          </span>\r
        </div>\r
      </form>\r
    </div>\r
\r
    <!-- Footer -->\r
    <div class="dialog-footer">\r
      <app-button\r
        type="button"\r
        variant="secondary"\r
        (click)="closeDialog()"\r
        [disabled]="loading()"\r
      >\r
        Cancelar\r
      </app-button>\r
      <app-button\r
        type="button"\r
        variant="danger"\r
        (click)="submit()"\r
        [disabled]="form.invalid || loading()"\r
        [loading]="loading()"\r
      >\r
        Confirmar Cancelaci\xF3n\r
      </app-button>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/purchase-orders/components/cancel-dialog/cancel-dialog.component.scss */\n.dialog-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  padding: 1rem;\n}\n.dialog-container {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  max-width: 500px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.dialog-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.dialog-header h2 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #212121;\n}\n.dialog-header .close-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: background-color 0.2s;\n  color: #757575;\n}\n.dialog-header .close-button:hover:not(:disabled) {\n  background-color: #f5f5f5;\n  color: #212121;\n}\n.dialog-header .close-button:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.dialog-header .close-button:focus-visible {\n  outline: 2px solid #1976d2;\n  outline-offset: 2px;\n}\n.dialog-body {\n  padding: 1.5rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.dialog-body .warning-info {\n  background-color: #fff3e0;\n  border: 1px solid #ffb74d;\n  border-radius: 4px;\n  padding: 1rem;\n  margin-bottom: 1.5rem;\n}\n.dialog-body .warning-info p {\n  margin: 0;\n  color: #e65100;\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.dialog-body .form-field {\n  margin-bottom: 1.25rem;\n}\n.dialog-body .form-field label {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  color: #424242;\n  font-size: 0.875rem;\n}\n.dialog-body .form-field .form-textarea {\n  width: 100%;\n  padding: 0.625rem;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  transition: border-color 0.2s;\n  resize: vertical;\n  font-family: inherit;\n}\n.dialog-body .form-field .form-textarea:focus {\n  outline: none;\n  border-color: #1976d2;\n  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);\n}\n.dialog-body .form-field .form-textarea[aria-invalid=true] {\n  border-color: #d32f2f;\n}\n.dialog-body .form-field .form-textarea::placeholder {\n  color: #9e9e9e;\n}\n.dialog-body .form-field .error-message {\n  display: block;\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #d32f2f;\n}\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e0e0e0;\n}\n@media (max-width: 768px) {\n  .dialog-overlay {\n    padding: 0;\n  }\n  .dialog-container {\n    max-width: 100%;\n    max-height: 100vh;\n    border-radius: 0;\n  }\n  .dialog-footer {\n    flex-direction: column-reverse;\n  }\n  .dialog-footer app-button {\n    width: 100%;\n  }\n}\n.dialog-container:focus {\n  outline: none;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n/*# sourceMappingURL=cancel-dialog.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialogRef }], { reasonTextarea: [{
    type: ViewChild,
    args: ["reasonTextarea"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CancelDialogComponent, { className: "CancelDialogComponent", filePath: "src/app/features/purchase-orders/components/cancel-dialog/cancel-dialog.component.ts", lineNumber: 20 });
})();

// src/app/features/purchase-orders/pages/purchase-order-detail/purchase-order-detail.component.ts
var _c02 = () => [];
function PurchaseOrderDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "p");
    \u0275\u0275text(2, "Cargando orden...");
    \u0275\u0275elementEnd()();
  }
}
function PurchaseOrderDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 4);
    \u0275\u0275listener("click", function PurchaseOrderDetailComponent_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(4, "Volver");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function PurchaseOrderDetailComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 5)(2, "button", 6);
    \u0275\u0275listener("click", function PurchaseOrderDetailComponent_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(3, "\u2190 Volver");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h1");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "app-order-header", 7);
    \u0275\u0275listener("edit", function PurchaseOrderDetailComponent_Conditional_3_Template_app_order_header_edit_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editOrder());
    })("changeStatus", function PurchaseOrderDetailComponent_Conditional_3_Template_app_order_header_changeStatus_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changeStatus());
    })("cancel", function PurchaseOrderDetailComponent_Conditional_3_Template_app_order_header_cancel_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelOrder());
    })("delete", function PurchaseOrderDetailComponent_Conditional_3_Template_app_order_header_delete_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteOrder());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 8)(8, "h2");
    \u0275\u0275text(9, "L\xEDneas de Productos");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "app-line-items-table", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 8)(12, "app-payments-list", 10);
    \u0275\u0275listener("addPayment", function PurchaseOrderDetailComponent_Conditional_3_Template_app_payments_list_addPayment_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.registerPayment());
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Orden de Compra #", ctx_r1.order().id);
    \u0275\u0275advance();
    \u0275\u0275property("order", ctx_r1.order())("canEdit", ctx_r1.canEdit())("canDelete", ctx_r1.canDelete())("canChangeStatus", ctx_r1.canChangeStatus());
    \u0275\u0275advance(4);
    \u0275\u0275property("lineItems", ctx_r1.order().line_items)("editable", false);
    \u0275\u0275advance(2);
    \u0275\u0275property("payments", ctx_r1.order().payments || \u0275\u0275pureFunction0(9, _c02))("canAddPayment", ctx_r1.canAddPayment());
  }
}
var PurchaseOrderDetailComponent = class _PurchaseOrderDetailComponent {
  route;
  router;
  purchaseOrderService;
  taxCalculator;
  dialog;
  // State signals
  orderData = signal(null, ...ngDevMode ? [{ debugName: "orderData" }] : []);
  loadingState = signal(false, ...ngDevMode ? [{ debugName: "loadingState" }] : []);
  errorState = signal(null, ...ngDevMode ? [{ debugName: "errorState" }] : []);
  // Public readonly signals
  order = this.orderData.asReadonly();
  loading = this.loadingState.asReadonly();
  error = this.errorState.asReadonly();
  // Computed: permission flags (simplified - would check actual permissions)
  canEdit = computed(() => {
    const order = this.orderData();
    return order?.status === "En Proceso";
  }, ...ngDevMode ? [{ debugName: "canEdit" }] : []);
  canDelete = computed(() => {
    const order = this.orderData();
    if (!order)
      return false;
    const hasNoPayments = !order.payments || order.payments.length === 0;
    const isNotReceived = order.status !== "Recibida";
    return hasNoPayments && isNotReceived;
  }, ...ngDevMode ? [{ debugName: "canDelete" }] : []);
  canChangeStatus = computed(() => {
    const order = this.orderData();
    return order?.status === "En Proceso";
  }, ...ngDevMode ? [{ debugName: "canChangeStatus" }] : []);
  canAddPayment = computed(() => {
    const order = this.orderData();
    return order && order.remaining_amount > 0 && order.status !== "Cancelada";
  }, ...ngDevMode ? [{ debugName: "canAddPayment" }] : []);
  canCancel = computed(() => {
    const order = this.orderData();
    return order?.status === "En Proceso";
  }, ...ngDevMode ? [{ debugName: "canCancel" }] : []);
  constructor(route, router, purchaseOrderService, taxCalculator, dialog) {
    this.route = route;
    this.router = router;
    this.purchaseOrderService = purchaseOrderService;
    this.taxCalculator = taxCalculator;
    this.dialog = dialog;
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.loadOrder(id);
    }
  }
  /**
   * Load order from API
   */
  loadOrder(id) {
    this.loadingState.set(true);
    this.errorState.set(null);
    this.purchaseOrderService.getOrderById(id).subscribe({
      next: (order) => {
        this.orderData.set(order);
        this.loadingState.set(false);
      },
      error: (error) => {
        this.errorState.set(error.message);
        this.loadingState.set(false);
      }
    });
  }
  /**
   * Navigate to edit page
   */
  editOrder() {
    const order = this.orderData();
    if (order) {
      this.router.navigate(["/purchase-orders", order.id, "edit"]);
    }
  }
  /**
   * Change order status with validation and confirmation
   */
  changeStatus() {
    const order = this.orderData();
    if (!order)
      return;
    if (order.status !== "En Proceso") {
      alert("Solo se puede cambiar el estado de \xF3rdenes en proceso");
      return;
    }
    if (confirm('\xBFCambiar estado a "Recibida"? Esta acci\xF3n no se puede deshacer.')) {
      this.purchaseOrderService.changeStatus(order.id, "Recibida").subscribe({
        next: (updatedOrder) => {
          this.orderData.set(updatedOrder);
          alert("Estado actualizado exitosamente");
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
        }
      });
    }
  }
  /**
   * Cancel order using dialog with validation
   */
  cancelOrder() {
    const order = this.orderData();
    if (!order)
      return;
    if (order.status !== "En Proceso") {
      alert("Solo se pueden cancelar \xF3rdenes en proceso");
      return;
    }
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: "500px",
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((cancellationReason) => {
      if (cancellationReason && order) {
        this.purchaseOrderService.cancelOrder(order.id, { reason: cancellationReason }).subscribe({
          next: (updatedOrder) => {
            this.orderData.set(updatedOrder);
            alert("Orden cancelada exitosamente");
          },
          error: (error) => {
            alert(`Error: ${error.message}`);
          }
        });
      }
    });
  }
  /**
   * Delete order with validation
   */
  deleteOrder() {
    const order = this.orderData();
    if (!order)
      return;
    if (order.payments && order.payments.length > 0) {
      alert("No se puede eliminar una orden con pagos registrados");
      return;
    }
    if (order.status === "Recibida") {
      alert("No se puede eliminar una orden recibida");
      return;
    }
    if (confirm("\xBFEst\xE1s seguro de que deseas eliminar esta orden? Esta acci\xF3n no se puede deshacer.")) {
      this.purchaseOrderService.deleteOrder(order.id).subscribe({
        next: () => {
          alert("Orden eliminada exitosamente");
          this.router.navigate(["/purchase-orders"]);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
        }
      });
    }
  }
  /**
   * Register payment using dialog
   */
  registerPayment() {
    const order = this.orderData();
    if (!order)
      return;
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: "500px",
      data: {
        remainingAmount: order.remaining_amount
      },
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((paymentData) => {
      if (paymentData && order) {
        this.purchaseOrderService.registerPayment(order.id, paymentData).subscribe({
          next: () => {
            alert("Pago registrado exitosamente");
            this.loadOrder(order.id);
          },
          error: (error) => {
            alert(`Error: ${error.message}`);
          }
        });
      }
    });
  }
  /**
   * Go back to list
   */
  goBack() {
    this.router.navigate(["/purchase-orders"]);
  }
  /**
   * Format currency
   */
  formatCurrency(amount) {
    return this.taxCalculator.formatCurrency(amount);
  }
  static \u0275fac = function PurchaseOrderDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PurchaseOrderDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(PurchaseOrderService), \u0275\u0275directiveInject(TaxCalculatorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PurchaseOrderDetailComponent, selectors: [["app-purchase-order-detail"]], decls: 4, vars: 3, consts: [[1, "purchase-order-detail"], [1, "loading"], [1, "error"], [1, "order-content"], [3, "click"], [1, "header"], [1, "btn-back", 3, "click"], [3, "edit", "changeStatus", "cancel", "delete", "order", "canEdit", "canDelete", "canChangeStatus"], [1, "section"], [3, "lineItems", "editable"], [3, "addPayment", "payments", "canAddPayment"]], template: function PurchaseOrderDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, PurchaseOrderDetailComponent_Conditional_1_Template, 3, 0, "div", 1);
      \u0275\u0275conditionalCreate(2, PurchaseOrderDetailComponent_Conditional_2_Template, 5, 1, "div", 2);
      \u0275\u0275conditionalCreate(3, PurchaseOrderDetailComponent_Conditional_3_Template, 13, 10, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.order() && !ctx.loading() ? 3 : -1);
    }
  }, dependencies: [CommonModule, OrderHeaderComponent, LineItemsTableComponent, PaymentsListComponent], styles: ["\n\n.purchase-order-detail[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .loading[_ngcontent-%COMP%], \n.purchase-order-detail[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem;\n  color: #6b7280;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 0.5rem 1rem;\n  background-color: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #4f46e5;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #6366f1;\n  cursor: pointer;\n  font-size: 1rem;\n  padding: 0.5rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   .btn-back[_ngcontent-%COMP%]:hover {\n  color: #4f46e5;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-left[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button.btn-edit[_ngcontent-%COMP%] {\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button.btn-edit[_ngcontent-%COMP%]:hover {\n  background-color: #4f46e5;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button.btn-status[_ngcontent-%COMP%] {\n  background-color: #10b981;\n  color: white;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button.btn-status[_ngcontent-%COMP%]:hover {\n  background-color: #059669;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button.btn-cancel[_ngcontent-%COMP%] {\n  background-color: #f59e0b;\n  color: white;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button.btn-cancel[_ngcontent-%COMP%]:hover {\n  background-color: #d97706;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button.btn-delete[_ngcontent-%COMP%] {\n  background-color: #ef4444;\n  color: white;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%]   button.btn-delete[_ngcontent-%COMP%]:hover {\n  background-color: #dc2626;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .status-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .badge.badge-En\\ Proceso[_ngcontent-%COMP%] {\n  background-color: #fef3c7;\n  color: #92400e;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .badge.badge-Recibida[_ngcontent-%COMP%] {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .badge.badge-Cancelada[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .badge.badge-payment-Pagada[_ngcontent-%COMP%] {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .badge.badge-payment-Parcial[_ngcontent-%COMP%] {\n  background-color: #fed7aa;\n  color: #92400e;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .badge.badge-payment-No\\ pagado[_ngcontent-%COMP%] {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n  color: #111827;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 0.25rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .info-grid[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 1rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  text-align: left;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   .totals-row[_ngcontent-%COMP%] {\n  background-color: #f9fafb;\n  font-weight: 600;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   .totals-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 1rem 0.75rem;\n  border-top: 2px solid #e5e7eb;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .payment-summary[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .payment-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .btn-payment[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  background-color: #10b981;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n}\n.purchase-order-detail[_ngcontent-%COMP%]   .order-content[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   .btn-payment[_ngcontent-%COMP%]:hover {\n  background-color: #059669;\n}\n/*# sourceMappingURL=purchase-order-detail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PurchaseOrderDetailComponent, [{
    type: Component,
    args: [{ selector: "app-purchase-order-detail", standalone: true, imports: [CommonModule, OrderHeaderComponent, LineItemsTableComponent, PaymentsListComponent], template: '<div class="purchase-order-detail">\r\n  <!-- Loading state -->\r\n  @if (loading()) {\r\n    <div class="loading">\r\n      <p>Cargando orden...</p>\r\n    </div>\r\n  }\r\n\r\n  <!-- Error state -->\r\n  @if (error()) {\r\n    <div class="error">\r\n      <p>{{ error() }}</p>\r\n      <button (click)="goBack()">Volver</button>\r\n    </div>\r\n  }\r\n\r\n  <!-- Order detail -->\r\n  @if (order() && !loading()) {\r\n    <div class="order-content">\r\n      <!-- Back button -->\r\n      <div class="header">\r\n        <button class="btn-back" (click)="goBack()">\u2190 Volver</button>\r\n        <h1>Orden de Compra #{{ order()!.id }}</h1>\r\n      </div>\r\n\r\n      <!-- Order Header Component -->\r\n      <app-order-header\r\n        [order]="order()!"\r\n        [canEdit]="canEdit()"\r\n        [canDelete]="canDelete()"\r\n        [canChangeStatus]="canChangeStatus()"\r\n        (edit)="editOrder()"\r\n        (changeStatus)="changeStatus()"\r\n        (cancel)="cancelOrder()"\r\n        (delete)="deleteOrder()"\r\n      ></app-order-header>\r\n\r\n      <!-- Line items -->\r\n      <div class="section">\r\n        <h2>L\xEDneas de Productos</h2>\r\n        <app-line-items-table\r\n          [lineItems]="order()!.line_items"\r\n          [editable]="false"\r\n        ></app-line-items-table>\r\n      </div>\r\n\r\n      <!-- Payments -->\r\n      <div class="section">\r\n        <app-payments-list\r\n          [payments]="order()!.payments || []"\r\n          [canAddPayment]="canAddPayment()"\r\n          (addPayment)="registerPayment()"\r\n        ></app-payments-list>\r\n      </div>\r\n    </div>\r\n  }\r\n</div>\r\n', styles: ["/* src/app/features/purchase-orders/pages/purchase-order-detail/purchase-order-detail.component.scss */\n.purchase-order-detail {\n  padding: 1.5rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.purchase-order-detail .loading,\n.purchase-order-detail .error {\n  text-align: center;\n  padding: 3rem;\n  color: #6b7280;\n}\n.purchase-order-detail .error {\n  color: #dc2626;\n}\n.purchase-order-detail .error button {\n  margin-top: 1rem;\n  padding: 0.5rem 1rem;\n  background-color: #6366f1;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n}\n.purchase-order-detail .error button:hover {\n  background-color: #4f46e5;\n}\n.purchase-order-detail .order-content .header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n}\n.purchase-order-detail .order-content .header .header-left {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.purchase-order-detail .order-content .header .header-left .btn-back {\n  background: none;\n  border: none;\n  color: #6366f1;\n  cursor: pointer;\n  font-size: 1rem;\n  padding: 0.5rem;\n}\n.purchase-order-detail .order-content .header .header-left .btn-back:hover {\n  color: #4f46e5;\n}\n.purchase-order-detail .order-content .header .header-left h1 {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.purchase-order-detail .order-content .header .header-right {\n  display: flex;\n  gap: 0.5rem;\n}\n.purchase-order-detail .order-content .header .header-right button {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 0.875rem;\n}\n.purchase-order-detail .order-content .header .header-right button.btn-edit {\n  background-color: #6366f1;\n  color: white;\n}\n.purchase-order-detail .order-content .header .header-right button.btn-edit:hover {\n  background-color: #4f46e5;\n}\n.purchase-order-detail .order-content .header .header-right button.btn-status {\n  background-color: #10b981;\n  color: white;\n}\n.purchase-order-detail .order-content .header .header-right button.btn-status:hover {\n  background-color: #059669;\n}\n.purchase-order-detail .order-content .header .header-right button.btn-cancel {\n  background-color: #f59e0b;\n  color: white;\n}\n.purchase-order-detail .order-content .header .header-right button.btn-cancel:hover {\n  background-color: #d97706;\n}\n.purchase-order-detail .order-content .header .header-right button.btn-delete {\n  background-color: #ef4444;\n  color: white;\n}\n.purchase-order-detail .order-content .header .header-right button.btn-delete:hover {\n  background-color: #dc2626;\n}\n.purchase-order-detail .order-content .status-section {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.5rem;\n}\n.purchase-order-detail .order-content .badge {\n  display: inline-block;\n  padding: 0.25rem 0.75rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.purchase-order-detail .order-content .badge.badge-En\\ Proceso {\n  background-color: #fef3c7;\n  color: #92400e;\n}\n.purchase-order-detail .order-content .badge.badge-Recibida {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-detail .order-content .badge.badge-Cancelada {\n  background-color: #fee2e2;\n  color: #991b1b;\n}\n.purchase-order-detail .order-content .badge.badge-payment-Pagada {\n  background-color: #d1fae5;\n  color: #065f46;\n}\n.purchase-order-detail .order-content .badge.badge-payment-Parcial {\n  background-color: #fed7aa;\n  color: #92400e;\n}\n.purchase-order-detail .order-content .badge.badge-payment-No\\ pagado {\n  background-color: #e5e7eb;\n  color: #374151;\n}\n.purchase-order-detail .order-content .section {\n  background: white;\n  border-radius: 0.5rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.purchase-order-detail .order-content .section h2 {\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n  color: #111827;\n}\n.purchase-order-detail .order-content .section .info-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n.purchase-order-detail .order-content .section .info-grid .info-item label {\n  display: block;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin-bottom: 0.25rem;\n}\n.purchase-order-detail .order-content .section .info-grid .info-item span {\n  display: block;\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-detail .order-content .section table {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 1rem;\n}\n.purchase-order-detail .order-content .section table thead {\n  background-color: #f9fafb;\n  border-bottom: 2px solid #e5e7eb;\n}\n.purchase-order-detail .order-content .section table thead th {\n  padding: 0.75rem;\n  text-align: left;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.purchase-order-detail .order-content .section table tbody tr {\n  border-bottom: 1px solid #e5e7eb;\n}\n.purchase-order-detail .order-content .section table tbody tr td {\n  padding: 0.75rem;\n  font-size: 0.875rem;\n  color: #111827;\n}\n.purchase-order-detail .order-content .section table tfoot .totals-row {\n  background-color: #f9fafb;\n  font-weight: 600;\n}\n.purchase-order-detail .order-content .section table tfoot .totals-row td {\n  padding: 1rem 0.75rem;\n  border-top: 2px solid #e5e7eb;\n}\n.purchase-order-detail .order-content .section .payment-summary {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.purchase-order-detail .order-content .section .payment-summary p {\n  margin: 0;\n  font-size: 1rem;\n}\n.purchase-order-detail .order-content .section .btn-payment {\n  padding: 0.5rem 1rem;\n  background-color: #10b981;\n  color: white;\n  border: none;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  font-weight: 500;\n}\n.purchase-order-detail .order-content .section .btn-payment:hover {\n  background-color: #059669;\n}\n/*# sourceMappingURL=purchase-order-detail.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: PurchaseOrderService }, { type: TaxCalculatorService }, { type: MatDialog }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PurchaseOrderDetailComponent, { className: "PurchaseOrderDetailComponent", filePath: "src/app/features/purchase-orders/pages/purchase-order-detail/purchase-order-detail.component.ts", lineNumber: 21 });
})();
export {
  PurchaseOrderDetailComponent
};
//# sourceMappingURL=chunk-DZ3DABIK.js.map
