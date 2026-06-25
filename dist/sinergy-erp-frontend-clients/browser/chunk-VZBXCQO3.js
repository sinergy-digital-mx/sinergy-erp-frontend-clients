import {
  SalesOrderDetailDialogComponent,
  formatPosUser
} from "./chunk-OCSBL5FO.js";
import "./chunk-K7D45P4W.js";
import "./chunk-W2GGHGOU.js";
import {
  ORDER_DETAIL_DIALOG_OPTIONS
} from "./chunk-ZHDS4KUW.js";
import {
  TaxCalculatorService
} from "./chunk-Q6XV4LBU.js";
import "./chunk-WDAA42IK.js";
import {
  BranchService
} from "./chunk-CQ4BUXG7.js";
import "./chunk-CEL5SWQJ.js";
import "./chunk-MK3LIK2T.js";
import "./chunk-MHDUPFR7.js";
import "./chunk-M65YKY4W.js";
import "./chunk-MBXKGEVM.js";
import {
  DatatableWrapperComponent
} from "./chunk-DLRREEDR.js";
import "./chunk-DFLPJ3H7.js";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-C44BBKV6.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-EF42XV6X.js";
import "./chunk-ZZJV4WZP.js";
import "./chunk-M5WQFRJQ.js";
import "./chunk-OP2NIPTP.js";
import "./chunk-S7ZTNTNE.js";
import "./chunk-EBDBUXLH.js";
import {
  Router
} from "./chunk-524KR27D.js";
import {
  CommonModule,
  DecimalPipe,
  HttpClient,
  HttpParams,
  environment
} from "./chunk-MNFUR22A.js";
import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  Output,
  Subject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  debounceTime,
  distinctUntilChanged,
  map,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-CJAGDKD4.js";

// src/app/core/components/report-period-selector/report-period-selector.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function ReportPeriodSelectorComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function ReportPeriodSelectorComponent_For_4_Template_button_click_0_listener() {
      const opt_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onSelectPeriod(opt_r2.value));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("zn-period-toggle__btn--active", ctx_r2.period === opt_r2.value);
    \u0275\u0275attribute("aria-pressed", ctx_r2.period === opt_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r2.label, " ");
  }
}
function ReportPeriodSelectorComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 10)(2, "label", 11);
    \u0275\u0275text(3, "Inicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 12)(5, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function ReportPeriodSelectorComponent_Conditional_11_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.dateFrom, $event) || (ctx_r2.dateFrom = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function ReportPeriodSelectorComponent_Conditional_11_Template_input_change_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRangeInputChange());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "span", 14);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 15);
    \u0275\u0275element(8, "path", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(9, "div", 10)(10, "label", 11);
    \u0275\u0275text(11, "Fin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 12)(13, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function ReportPeriodSelectorComponent_Conditional_11_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.dateTo, $event) || (ctx_r2.dateTo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function ReportPeriodSelectorComponent_Conditional_11_Template_input_change_13_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onRangeInputChange());
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("for", ctx_r2.dateFromId);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", ctx_r2.dateFromId);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.dateFrom);
    \u0275\u0275property("max", ctx_r2.dateTo || void 0);
    \u0275\u0275advance(5);
    \u0275\u0275property("for", ctx_r2.dateToId);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", ctx_r2.dateToId);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.dateTo);
    \u0275\u0275property("min", ctx_r2.dateFrom || void 0);
  }
}
var ReportPeriodSelectorComponent = class _ReportPeriodSelectorComponent {
  period = "month";
  dateFrom = "";
  dateTo = "";
  includeYear = false;
  ariaLabel = "Periodo del reporte";
  dateFromId = "report-date-from";
  dateToId = "report-date-to";
  periodChange = new EventEmitter();
  rangeChange = new EventEmitter();
  baseOptions = [
    { label: "Hoy", value: "today" },
    { label: "Semana", value: "week" },
    { label: "Mes", value: "month" }
  ];
  get visibleOptions() {
    if (this.includeYear) {
      return [...this.baseOptions, { label: "A\xF1o", value: "year" }];
    }
    return this.baseOptions;
  }
  onSelectPeriod(preset) {
    if (preset === "range" && (!this.dateFrom || !this.dateTo)) {
      const to = this.startOfDay(/* @__PURE__ */ new Date());
      const from = new Date(to);
      from.setDate(from.getDate() - 30);
      this.dateFrom = this.toInputDate(from);
      this.dateTo = this.toInputDate(to);
    }
    this.periodChange.emit(preset);
    if (preset !== "range" || this.dateFrom && this.dateTo) {
      this.emitRangeIfNeeded();
    }
  }
  onRangeInputChange() {
    if (!this.dateFrom || !this.dateTo) {
      return;
    }
    const from = this.parseInputDate(this.dateFrom);
    const to = this.parseInputDate(this.dateTo);
    if (!from || !to) {
      return;
    }
    if (from > to) {
      const tmp = this.dateFrom;
      this.dateFrom = this.dateTo;
      this.dateTo = tmp;
    }
    this.emitRangeIfNeeded();
  }
  customRangeAriaLabel() {
    if (this.period === "range" && this.dateFrom && this.dateTo) {
      return `Rango personalizado: ${this.dateFrom} a ${this.dateTo}`;
    }
    return "Seleccionar rango de fechas personalizado";
  }
  emitRangeIfNeeded() {
    if (this.period === "range" && this.dateFrom && this.dateTo) {
      this.rangeChange.emit({ dateFrom: this.dateFrom, dateTo: this.dateTo });
    }
  }
  startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  toInputDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  parseInputDate(value) {
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) {
      return null;
    }
    const date = new Date(y, m - 1, d);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  static \u0275fac = function ReportPeriodSelectorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReportPeriodSelectorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportPeriodSelectorComponent, selectors: [["app-report-period-selector"]], inputs: { period: "period", dateFrom: "dateFrom", dateTo: "dateTo", includeYear: "includeYear", ariaLabel: "ariaLabel", dateFromId: "dateFromId", dateToId: "dateToId" }, outputs: { periodChange: "periodChange", rangeChange: "rangeChange" }, decls: 12, vars: 8, consts: [["role", "search", 1, "zn-period-bar"], [1, "zn-period-panel"], ["role", "group", 1, "zn-period-toggle"], ["type", "button", 1, "zn-period-toggle__btn", 3, "zn-period-toggle__btn--active"], ["type", "button", 1, "zn-period-toggle__btn", "zn-period-toggle__btn--range", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 1, "zn-period-toggle__icon"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["d", "M16 2v4M8 2v4M3 10h18"], ["aria-label", "Rango de fechas personalizado", 1, "zn-date-range"], ["type", "button", 1, "zn-period-toggle__btn", 3, "click"], [1, "zn-date-range__field"], [1, "zn-date-range__label", 3, "for"], [1, "zn-date-range__control"], ["type", "date", "aria-label", "Fecha de inicio", 1, "zn-date-range__input", 3, "ngModelChange", "change", "id", "ngModel", "max"], ["aria-hidden", "true", 1, "zn-date-range__sep"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["d", "M5 12h14M13 6l6 6-6 6"], ["type", "date", "aria-label", "Fecha de fin", 1, "zn-date-range__input", 3, "ngModelChange", "change", "id", "ngModel", "min"]], template: function ReportPeriodSelectorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275repeaterCreate(3, ReportPeriodSelectorComponent_For_4_Template, 2, 4, "button", 3, _forTrack0);
      \u0275\u0275elementStart(5, "button", 4);
      \u0275\u0275listener("click", function ReportPeriodSelectorComponent_Template_button_click_5_listener() {
        return ctx.onSelectPeriod("range");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(6, "svg", 5);
      \u0275\u0275element(7, "rect", 6)(8, "path", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(9, "span");
      \u0275\u0275text(10, "Rango");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(11, ReportPeriodSelectorComponent_Conditional_11_Template, 14, 8, "div", 8);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("aria-label", ctx.ariaLabel);
      \u0275\u0275advance();
      \u0275\u0275classProp("zn-period-panel--range", ctx.period === "range");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleOptions);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("zn-period-toggle__btn--active", ctx.period === "range");
      \u0275\u0275attribute("aria-pressed", ctx.period === "range")("aria-label", ctx.customRangeAriaLabel());
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.period === "range" ? 11 : -1);
    }
  }, dependencies: [CommonModule, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.zn-period-bar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.zn-period-panel[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: stretch;\n  width: fit-content;\n  max-width: 100%;\n  background: #fff;\n  border-radius: 16px;\n  padding: 0.25rem;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 1px #e2e8f0;\n  transition: padding 0.2s ease, min-width 0.2s ease;\n}\n.zn-period-panel--range[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.35rem 0.65rem;\n  min-width: min(100%, 22rem);\n}\n.zn-period-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  gap: 0.125rem;\n  padding: 0.15rem;\n  width: 100%;\n  flex-shrink: 0;\n}\n.zn-period-toggle__btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #475569;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  padding: 0.4rem 0.75rem;\n  border-radius: 9999px;\n  cursor: pointer;\n  transition:\n    background 0.15s ease,\n    color 0.15s ease,\n    box-shadow 0.15s ease;\n  white-space: nowrap;\n  line-height: 1.25;\n  flex-shrink: 0;\n}\n.zn-period-toggle__btn[_ngcontent-%COMP%]:hover:not(.zn-period-toggle__btn--active) {\n  background: #f8fafc;\n  color: #334155;\n}\n.zn-period-toggle__btn--active[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #4f46e5 100%);\n  color: #fff;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);\n}\n.zn-period-toggle__btn--range[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.zn-period-toggle__icon[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  flex-shrink: 0;\n}\n.zn-date-range[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: end;\n  gap: 0.5rem 0.4rem;\n  width: 100%;\n  padding: 0.6rem 0.35rem 0.15rem;\n  margin-top: 0.15rem;\n  border-top: 1px solid #f1f5f9;\n}\n.zn-date-range__field[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.zn-date-range__label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  color: #64748b;\n  margin-bottom: 0.35rem;\n}\n.zn-date-range__control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-height: 2.5rem;\n  padding: 0 0.65rem;\n  background:\n    linear-gradient(\n      180deg,\n      #fafafa 0%,\n      #f4f4f5 100%);\n  border: 1px solid #e4e4e7;\n  border-radius: 10px;\n  transition:\n    border-color 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s ease;\n}\n.zn-date-range__control[_ngcontent-%COMP%]:focus-within {\n  border-color: #a5b4fc;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.zn-date-range__input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  padding: 0.45rem 0;\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #1e293b;\n  cursor: pointer;\n  font-family: Inter, sans-serif !important;\n}\n.zn-date-range__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.zn-date-range__input[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator {\n  cursor: pointer;\n  opacity: 0.55;\n  margin-left: 0.25rem;\n}\n.zn-date-range__sep[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-bottom: 0.65rem;\n  color: #cbd5e1;\n  flex-shrink: 0;\n}\n.zn-date-range__sep[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 1.125rem;\n  height: 1.125rem;\n}\n@media (max-width: 640px) {\n  .zn-period-toggle__btn[_ngcontent-%COMP%] {\n    padding: 0.35rem 0.55rem;\n    font-size: 0.75rem;\n  }\n  .zn-period-bar[_ngcontent-%COMP%], \n   .zn-period-panel[_ngcontent-%COMP%], \n   .zn-period-panel--range[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: 0;\n  }\n  .zn-date-range[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.5rem;\n  }\n  .zn-date-range__sep[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=report-period-selector.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReportPeriodSelectorComponent, [{
    type: Component,
    args: [{ selector: "app-report-period-selector", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="zn-period-bar" role="search" [attr.aria-label]="ariaLabel">
      <div
        class="zn-period-panel"
        [class.zn-period-panel--range]="period === 'range'">
        <div class="zn-period-toggle" role="group">
          @for (opt of visibleOptions; track opt.value) {
            <button
              type="button"
              class="zn-period-toggle__btn"
              [class.zn-period-toggle__btn--active]="period === opt.value"
              [attr.aria-pressed]="period === opt.value"
              (click)="onSelectPeriod(opt.value)">
              {{ opt.label }}
            </button>
          }
          <button
            type="button"
            class="zn-period-toggle__btn zn-period-toggle__btn--range"
            [class.zn-period-toggle__btn--active]="period === 'range'"
            [attr.aria-pressed]="period === 'range'"
            [attr.aria-label]="customRangeAriaLabel()"
            (click)="onSelectPeriod('range')">
            <svg
              class="zn-period-toggle__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>Rango</span>
          </button>
        </div>

        @if (period === 'range') {
          <div class="zn-date-range" aria-label="Rango de fechas personalizado">
            <div class="zn-date-range__field">
              <label class="zn-date-range__label" [for]="dateFromId">Inicio</label>
              <div class="zn-date-range__control">
                <input
                  [id]="dateFromId"
                  type="date"
                  class="zn-date-range__input"
                  [(ngModel)]="dateFrom"
                  (change)="onRangeInputChange()"
                  [max]="dateTo || undefined"
                  aria-label="Fecha de inicio" />
              </div>
            </div>
            <span class="zn-date-range__sep" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <div class="zn-date-range__field">
              <label class="zn-date-range__label" [for]="dateToId">Fin</label>
              <div class="zn-date-range__control">
                <input
                  [id]="dateToId"
                  type="date"
                  class="zn-date-range__input"
                  [(ngModel)]="dateTo"
                  (change)="onRangeInputChange()"
                  [min]="dateFrom || undefined"
                  aria-label="Fecha de fin" />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;85670462208796923e2dab10453d7501537bee35c9d4c924faf68b00717056a6;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/core/components/report-period-selector/report-period-selector.component.ts */\n.zn-period-bar {\n  flex-shrink: 0;\n}\n.zn-period-panel {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: stretch;\n  width: fit-content;\n  max-width: 100%;\n  background: #fff;\n  border-radius: 16px;\n  padding: 0.25rem;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 1px #e2e8f0;\n  transition: padding 0.2s ease, min-width 0.2s ease;\n}\n.zn-period-panel--range {\n  padding: 0.25rem 0.35rem 0.65rem;\n  min-width: min(100%, 22rem);\n}\n.zn-period-toggle {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  gap: 0.125rem;\n  padding: 0.15rem;\n  width: 100%;\n  flex-shrink: 0;\n}\n.zn-period-toggle__btn {\n  border: none;\n  background: transparent;\n  color: #475569;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  padding: 0.4rem 0.75rem;\n  border-radius: 9999px;\n  cursor: pointer;\n  transition:\n    background 0.15s ease,\n    color 0.15s ease,\n    box-shadow 0.15s ease;\n  white-space: nowrap;\n  line-height: 1.25;\n  flex-shrink: 0;\n}\n.zn-period-toggle__btn:hover:not(.zn-period-toggle__btn--active) {\n  background: #f8fafc;\n  color: #334155;\n}\n.zn-period-toggle__btn--active {\n  background:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #4f46e5 100%);\n  color: #fff;\n  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);\n}\n.zn-period-toggle__btn--range {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.zn-period-toggle__icon {\n  width: 1rem;\n  height: 1rem;\n  flex-shrink: 0;\n}\n.zn-date-range {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  align-items: end;\n  gap: 0.5rem 0.4rem;\n  width: 100%;\n  padding: 0.6rem 0.35rem 0.15rem;\n  margin-top: 0.15rem;\n  border-top: 1px solid #f1f5f9;\n}\n.zn-date-range__field {\n  min-width: 0;\n}\n.zn-date-range__label {\n  display: block;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  color: #64748b;\n  margin-bottom: 0.35rem;\n}\n.zn-date-range__control {\n  display: flex;\n  align-items: center;\n  min-height: 2.5rem;\n  padding: 0 0.65rem;\n  background:\n    linear-gradient(\n      180deg,\n      #fafafa 0%,\n      #f4f4f5 100%);\n  border: 1px solid #e4e4e7;\n  border-radius: 10px;\n  transition:\n    border-color 0.15s ease,\n    box-shadow 0.15s ease,\n    background 0.15s ease;\n}\n.zn-date-range__control:focus-within {\n  border-color: #a5b4fc;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.zn-date-range__input {\n  width: 100%;\n  min-width: 0;\n  padding: 0.45rem 0;\n  border: none;\n  background: transparent;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #1e293b;\n  cursor: pointer;\n  font-family: Inter, sans-serif !important;\n}\n.zn-date-range__input:focus {\n  outline: none;\n}\n.zn-date-range__input::-webkit-calendar-picker-indicator {\n  cursor: pointer;\n  opacity: 0.55;\n  margin-left: 0.25rem;\n}\n.zn-date-range__sep {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-bottom: 0.65rem;\n  color: #cbd5e1;\n  flex-shrink: 0;\n}\n.zn-date-range__sep svg {\n  width: 1.125rem;\n  height: 1.125rem;\n}\n@media (max-width: 640px) {\n  .zn-period-toggle__btn {\n    padding: 0.35rem 0.55rem;\n    font-size: 0.75rem;\n  }\n  .zn-period-bar,\n  .zn-period-panel,\n  .zn-period-panel--range {\n    width: 100%;\n    min-width: 0;\n  }\n  .zn-date-range {\n    grid-template-columns: 1fr;\n    gap: 0.5rem;\n  }\n  .zn-date-range__sep {\n    display: none;\n  }\n}\n/*# sourceMappingURL=report-period-selector.component.css.map */\n"] }]
  }], null, { period: [{
    type: Input
  }], dateFrom: [{
    type: Input
  }], dateTo: [{
    type: Input
  }], includeYear: [{
    type: Input
  }], ariaLabel: [{
    type: Input
  }], dateFromId: [{
    type: Input
  }], dateToId: [{
    type: Input
  }], periodChange: [{
    type: Output
  }], rangeChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportPeriodSelectorComponent, { className: "ReportPeriodSelectorComponent", filePath: "src/app/core/components/report-period-selector/report-period-selector.component.ts", lineNumber: 241 });
})();

// src/app/features/accounting/services/accounting.service.ts
var AccountingService = class _AccountingService {
  http;
  api = `${environment.api}/tenant/accounting`;
  constructor(http) {
    this.http = http;
  }
  getPosSummary(query) {
    return this.http.get(`${this.api}/pos-summary`, { params: this.buildPeriodParams(query) }).pipe(map((raw) => this.parsePosSummary(raw)));
  }
  getPosTerminalSales(terminalUserId, query, page = 1, limit = 20) {
    const params = this.buildPeriodParams(query).set("page", String(page)).set("limit", String(limit));
    return this.http.get(`${this.api}/pos-terminals/${terminalUserId}/sales`, { params }).pipe(map((raw) => this.parsePaginated(raw)));
  }
  getAccountsPayable(search, page = 1, limit = 20) {
    let params = new HttpParams().set("page", String(page)).set("limit", String(limit));
    if (search?.trim()) {
      params = params.set("search", search.trim());
    }
    return this.http.get(`${this.api}/accounts-payable`, { params }).pipe(map((raw) => this.parsePaginated(raw)));
  }
  getAccountsPayableVendorDetail(vendorId) {
    return this.http.get(`${this.api}/accounts-payable/vendors/${vendorId}`).pipe(map((raw) => this.parsePayableVendorDetail(raw, vendorId)));
  }
  getAccountsReceivable(billingBranchId, search, page = 1, limit = 20) {
    let params = new HttpParams().set("page", String(page)).set("limit", String(limit));
    if (billingBranchId) {
      params = params.set("billing_branch_id", billingBranchId);
    }
    if (search?.trim()) {
      params = params.set("search", search.trim());
    }
    return this.http.get(`${this.api}/accounts-receivable`, { params }).pipe(map((raw) => this.parsePaginated(raw)));
  }
  getAccountsReceivableOrders(razonSocial, billingBranchId) {
    let params = new HttpParams();
    if (billingBranchId) {
      params = params.set("billing_branch_id", billingBranchId);
    }
    const encoded = encodeURIComponent(razonSocial);
    return this.http.get(`${this.api}/accounts-receivable/by-razon-social/${encoded}/orders`, { params }).pipe(map((raw) => this.parseReceivableDetail(raw)));
  }
  buildPeriodParams(query) {
    let params = new HttpParams().set("period", query.period);
    if (query.billing_branch_id) {
      params = params.set("billing_branch_id", query.billing_branch_id);
    }
    if (query.period === "range") {
      if (query.date_from)
        params = params.set("date_from", query.date_from);
      if (query.date_to)
        params = params.set("date_to", query.date_to);
    }
    return params;
  }
  /** pos-summary: sales_terminals y collection_terminal en la raíz (no dentro de data). */
  parsePosSummary(raw) {
    const body = this.asRecord(raw);
    const source = this.hasPosSummaryShape(body) ? body : this.asRecord(body["data"]);
    return {
      filters_applied: source["filters_applied"] ?? {},
      sales_terminals: this.asArray(source["sales_terminals"]),
      collection_terminal: this.parseCollectionTerminal(source["collection_terminal"])
    };
  }
  parseCollectionTerminal(raw) {
    const c = this.asRecord(raw);
    return {
      terminal_user_id: c["terminal_user_id"] ?? null,
      terminal_name: c["terminal_name"] ?? null,
      orders_collected: Number(c["orders_collected"] ?? 0),
      amount_collected: Number(c["amount_collected"] ?? 0),
      walk_in_count: Number(c["walk_in_count"] ?? 0),
      invoiced_count: Number(c["invoiced_count"] ?? 0)
    };
  }
  /** Listas paginadas: data[], total, page, summary en la raíz. */
  parsePaginated(raw) {
    const body = this.asRecord(raw);
    const rows = this.asArray(body["data"]);
    return {
      data: rows,
      page: Number(body["page"] ?? 1),
      limit: Number(body["limit"] ?? (rows.length || 20)),
      total: Number(body["total"] ?? rows.length),
      totalPages: body["totalPages"] != null ? Number(body["totalPages"]) : void 0,
      summary: body["summary"] ?? void 0
    };
  }
  /** CxP detalle: response.vendor + response.orders[] */
  parsePayableVendorDetail(raw, vendorId) {
    const body = this.asRecord(raw);
    const vendor = this.asRecord(body["vendor"]);
    const orders = this.asArray(body["orders"]);
    return {
      vendor_id: String(vendor["vendor_id"] ?? vendor["id"] ?? vendorId),
      vendor_name: vendor["vendor_name"],
      razon_social: vendor["razon_social"],
      company_name: vendor["company_name"],
      amount_pending: Number(vendor["amount_pending"] ?? body["amount_pending"] ?? 0),
      pending_order_count: Number(vendor["pending_order_count"] ?? body["pending_order_count"] ?? orders.length),
      orders
    };
  }
  /** CxC detalle: razon_social, fiscal_rfc, amount_pending, orders[] en la raíz. */
  parseReceivableDetail(raw) {
    const body = this.asRecord(raw);
    return {
      razon_social: String(body["razon_social"] ?? ""),
      fiscal_rfc: body["fiscal_rfc"],
      amount_pending: Number(body["amount_pending"] ?? 0),
      pending_order_count: Number(body["pending_order_count"] ?? 0),
      orders: this.asArray(body["orders"])
    };
  }
  hasPosSummaryShape(obj) {
    return "sales_terminals" in obj || "collection_terminal" in obj;
  }
  asRecord(raw) {
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      return raw;
    }
    return {};
  }
  asArray(raw) {
    return Array.isArray(raw) ? raw : [];
  }
  static \u0275fac = function AccountingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountingService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AccountingService, factory: _AccountingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountingService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/accounting/components/pos-terminal-sales-dialog/pos-terminal-sales-dialog.component.ts
var _c0 = ["tableTemplate"];
function PosTerminalSalesDialogComponent_ng_template_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "Mostrador");
    \u0275\u0275elementEnd();
  }
}
function PosTerminalSalesDialogComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 6)(1, "button", 7);
    \u0275\u0275listener("click", function PosTerminalSalesDialogComponent_ng_template_11_Template_button_click_1_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openSalesOrder(item_r3));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 6)(6, "div", 8)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, PosTerminalSalesDialogComponent_ng_template_11_Conditional_9_Template, 2, 0, "span", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 6);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 6);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 6)(15, "span", 10);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r3.folio || (item_r3.id == null ? null : item_r3.id.substring(0, 8)), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatDate(item_r3.created_at));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r3.customer_display_name || "\u2014");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.is_walk_in ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.sellerLabel(item_r3));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatCurrency(item_r3.total));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("payment-pill--paid", item_r3.payment_status === "Pagado");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r3.payment_status || "\u2014", " ");
  }
}
var PosTerminalSalesDialogComponent = class _PosTerminalSalesDialogComponent {
  data;
  dialogRef;
  dialog;
  accountingService;
  taxCalculator;
  tableTemplate;
  tableConfig = {
    rows: [],
    columns: [
      { name: "Folio", prop: "folio", sortable: false, canAutoResize: false, width: 120 },
      { name: "Fecha", prop: "created_at", sortable: false, canAutoResize: false, width: 140 },
      { name: "Cliente", prop: "customer", sortable: false, canAutoResize: false, width: 180 },
      { name: "Vendedor", prop: "seller", sortable: false, canAutoResize: false, width: 160 },
      { name: "Total", prop: "total", sortable: false, canAutoResize: false, width: 120 },
      { name: "Estatus pago", prop: "payment_status", sortable: false, canAutoResize: false, width: 120 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin ventas", subtitle: "No hay \xF3rdenes para esta terminal en el periodo" },
    columnMode: "force",
    reorderable: false
  };
  constructor(data, dialogRef, dialog, accountingService, taxCalculator) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.dialog = dialog;
    this.accountingService = accountingService;
    this.taxCalculator = taxCalculator;
  }
  ngOnInit() {
    this.loadPage(1);
  }
  close() {
    this.dialogRef.close();
  }
  formatCurrency(value) {
    const n = value == null ? 0 : typeof value === "number" ? value : Number(value);
    return this.taxCalculator.formatCurrency(Number.isFinite(n) ? n : 0);
  }
  formatDate(value) {
    if (!value)
      return "\u2014";
    const d = new Date(value);
    if (Number.isNaN(d.getTime()))
      return value;
    return d.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
  }
  sellerLabel(row) {
    return formatPosUser(row.seller_user);
  }
  onPageChange(event) {
    this.loadPage(event.page);
  }
  openSalesOrder(row) {
    if (!row.id)
      return;
    this.dialog.open(SalesOrderDetailDialogComponent, __spreadProps(__spreadValues({}, ORDER_DETAIL_DIALOG_OPTIONS), {
      data: { orderId: row.id }
    }));
  }
  loadPage(page) {
    this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), { loading: true, page });
    this.accountingService.getPosTerminalSales(this.data.terminal.terminal_user_id, {
      period: this.data.period,
      billing_branch_id: this.data.billingBranchId,
      date_from: this.data.period === "range" ? this.data.dateFrom : void 0,
      date_to: this.data.period === "range" ? this.data.dateTo : void 0
    }, page, this.tableConfig.limit).subscribe({
      next: (res) => {
        this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), {
          rows: res.data,
          page: res.page,
          totalResults: res.total,
          loading: false
        });
      },
      error: () => {
        this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), {
          rows: [],
          totalResults: 0,
          loading: false
        });
      }
    });
  }
  static \u0275fac = function PosTerminalSalesDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosTerminalSalesDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(AccountingService), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosTerminalSalesDialogComponent, selectors: [["app-pos-terminal-sales-dialog"]], viewQuery: function PosTerminalSalesDialogComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 13, vars: 4, consts: [["tableTemplate", ""], [1, "terminal-sales-dialog"], [1, "terminal-sales-dialog__header"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], [1, "terminal-sales-dialog__body"], [3, "pageChange", "config", "rowTemplate"], [1, "px-2", "py-2"], ["type", "button", 1, "folio-link", 3, "click"], [1, "flex", "items-center", "gap-2"], [1, "walk-in-chip"], [1, "payment-pill"]], template: function PosTerminalSalesDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h2");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 3);
      \u0275\u0275listener("click", function PosTerminalSalesDialogComponent_Template_button_click_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.close());
      });
      \u0275\u0275text(8, "\xD7");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 4)(10, "app-datatable-wrapper", 5);
      \u0275\u0275listener("pageChange", function PosTerminalSalesDialogComponent_Template_app_datatable_wrapper_pageChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(11, PosTerminalSalesDialogComponent_ng_template_11_Template, 17, 9, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r5 = \u0275\u0275reference(12);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Ventas \u2014 ", ctx.data.terminal.terminal_name);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.data.terminal.sales_count, " ventas en el periodo seleccionado");
      \u0275\u0275advance(4);
      \u0275\u0275property("config", ctx.tableConfig)("rowTemplate", tableTemplate_r5);
    }
  }, dependencies: [CommonModule, MatDialogModule, DatatableWrapperComponent], styles: ["\n\n.terminal-sales-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n}\n.terminal-sales-dialog__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n.terminal-sales-dialog__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n.terminal-sales-dialog__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.close-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: #f1f5f9;\n  color: #475569;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  font-size: 1.25rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.terminal-sales-dialog__body[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem 1.25rem;\n  overflow: auto;\n}\n.folio-link[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #4f46e5;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n}\n.folio-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.walk-in-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.5rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  background: #fef3c7;\n  color: #92400e;\n}\n.payment-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: #fef2f2;\n  color: #dc2626;\n}\n.payment-pill--paid[_ngcontent-%COMP%] {\n  background: #ecfdf5;\n  color: #059669;\n}\n/*# sourceMappingURL=pos-terminal-sales-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosTerminalSalesDialogComponent, [{
    type: Component,
    args: [{ selector: "app-pos-terminal-sales-dialog", standalone: true, imports: [CommonModule, MatDialogModule, DatatableWrapperComponent], template: `<div class="terminal-sales-dialog">\r
  <div class="terminal-sales-dialog__header">\r
    <div>\r
      <h2>Ventas \u2014 {{ data.terminal.terminal_name }}</h2>\r
      <p>{{ data.terminal.sales_count }} ventas en el periodo seleccionado</p>\r
    </div>\r
    <button type="button" class="close-btn" (click)="close()" aria-label="Cerrar">\xD7</button>\r
  </div>\r
\r
  <div class="terminal-sales-dialog__body">\r
    <app-datatable-wrapper\r
      [config]="tableConfig"\r
      [rowTemplate]="tableTemplate"\r
      (pageChange)="onPageChange($event)">\r
    </app-datatable-wrapper>\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td class="px-2 py-2">\r
    <button type="button" class="folio-link" (click)="openSalesOrder(item)">\r
      {{ item.folio || item.id?.substring(0, 8) }}\r
    </button>\r
  </td>\r
  <td class="px-2 py-2">{{ formatDate(item.created_at) }}</td>\r
  <td class="px-2 py-2">\r
    <div class="flex items-center gap-2">\r
      <span>{{ item.customer_display_name || '\u2014' }}</span>\r
      @if (item.is_walk_in) {\r
        <span class="walk-in-chip">Mostrador</span>\r
      }\r
    </div>\r
  </td>\r
  <td class="px-2 py-2">{{ sellerLabel(item) }}</td>\r
  <td class="px-2 py-2">{{ formatCurrency(item.total) }}</td>\r
  <td class="px-2 py-2">\r
    <span class="payment-pill" [class.payment-pill--paid]="item.payment_status === 'Pagado'">\r
      {{ item.payment_status || '\u2014' }}\r
    </span>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/accounting/components/pos-terminal-sales-dialog/pos-terminal-sales-dialog.component.scss */\n.terminal-sales-dialog {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n}\n.terminal-sales-dialog__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n.terminal-sales-dialog__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n.terminal-sales-dialog__header p {\n  margin: 0.25rem 0 0;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.close-btn {\n  border: none;\n  background: #f1f5f9;\n  color: #475569;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  font-size: 1.25rem;\n  line-height: 1;\n  cursor: pointer;\n}\n.terminal-sales-dialog__body {\n  padding: 1rem 1.25rem 1.25rem;\n  overflow: auto;\n}\n.folio-link {\n  border: none;\n  background: transparent;\n  color: #4f46e5;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n}\n.folio-link:hover {\n  text-decoration: underline;\n}\n.walk-in-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.125rem 0.5rem;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  background: #fef3c7;\n  color: #92400e;\n}\n.payment-pill {\n  display: inline-flex;\n  padding: 0.2rem 0.55rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: #fef2f2;\n  color: #dc2626;\n}\n.payment-pill--paid {\n  background: #ecfdf5;\n  color: #059669;\n}\n/*# sourceMappingURL=pos-terminal-sales-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: MatDialog }, { type: AccountingService }, { type: TaxCalculatorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosTerminalSalesDialogComponent, { className: "PosTerminalSalesDialogComponent", filePath: "src/app/features/accounting/components/pos-terminal-sales-dialog/pos-terminal-sales-dialog.component.ts", lineNumber: 31 });
})();

// src/app/features/accounting/components/pos-summary-tab/pos-summary-tab.component.ts
var _c02 = ["tableTemplate"];
function PosSummaryTabComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "p");
    \u0275\u0275text(2, "Selecciona una sucursal para ver el resumen de puntos de venta.");
    \u0275\u0275elementEnd()();
  }
}
function PosSummaryTabComponent_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.collectionMetrics().terminal_name);
  }
}
function PosSummaryTabComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h3", 4);
    \u0275\u0275text(3, "Terminales de venta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 5);
    \u0275\u0275element(5, "app-datatable-wrapper", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 7)(7, "h3", 4);
    \u0275\u0275text(8, "Terminal de cobranza");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, PosSummaryTabComponent_Conditional_1_Conditional_9_Template, 2, 1, "p", 8);
    \u0275\u0275elementStart(10, "div", 9)(11, "div", 10)(12, "span", 11);
    \u0275\u0275text(13, "\xD3rdenes cobradas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 12);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 10)(17, "span", 11);
    \u0275\u0275text(18, "Total cobrado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 12);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 10)(22, "span", 11);
    \u0275\u0275text(23, "P\xFAblico en General");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 12);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 10)(27, "span", 11);
    \u0275\u0275text(28, "Facturadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 12);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const tableTemplate_r2 = \u0275\u0275reference(3);
    \u0275\u0275advance(5);
    \u0275\u0275property("config", ctx_r0.tableConfig)("rowTemplate", tableTemplate_r2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r0.collectionMetrics().terminal_name ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.collectionMetrics().orders_collected);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(ctx_r0.collectionMetrics().amount_collected));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.collectionMetrics().walk_in_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.collectionMetrics().invoiced_count);
  }
}
function PosSummaryTabComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 13)(1, "p", 14);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 13)(4, "span", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 13)(7, "p", 16);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 13)(10, "button", 17);
    \u0275\u0275listener("click", function PosSummaryTabComponent_ng_template_2_Template_button_click_10_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openTerminalDetail(item_r4));
    });
    \u0275\u0275text(11, " Ver detalle ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.terminal_name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", item_r4.sales_count, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(item_r4.amount_sold));
  }
}
var PosSummaryTabComponent = class _PosSummaryTabComponent {
  accountingService;
  dialog;
  taxCalculator;
  tableTemplate;
  billingBranchId = "";
  period = "month";
  dateFrom = "";
  dateTo = "";
  reloadToken = 0;
  salesTerminals = [];
  collectionTerminal = this.emptyCollectionTerminal();
  loading = false;
  branchMissing = false;
  tableConfig = {
    rows: [],
    columns: [
      { name: "Terminal", prop: "terminal_name", sortable: false, canAutoResize: false, width: 220 },
      { name: "# Ventas", prop: "sales_count", sortable: false, canAutoResize: false, width: 100 },
      { name: "Monto vendido", prop: "amount_sold", sortable: false, canAutoResize: false, width: 140 },
      { name: "Acci\xF3n", prop: "action", sortable: false, canAutoResize: false, width: 120 }
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin terminales", subtitle: "No hay ventas POS en el periodo seleccionado" },
    columnMode: "force",
    reorderable: false
  };
  constructor(accountingService, dialog, taxCalculator) {
    this.accountingService = accountingService;
    this.dialog = dialog;
    this.taxCalculator = taxCalculator;
  }
  ngOnChanges(changes) {
    if (changes["reloadToken"] || changes["billingBranchId"] || changes["period"] || changes["dateFrom"] || changes["dateTo"]) {
      this.loadSummary();
    }
  }
  formatCurrency(value) {
    return this.taxCalculator.formatCurrency(value);
  }
  collectionMetrics() {
    return this.collectionTerminal;
  }
  openTerminalDetail(terminal) {
    this.dialog.open(PosTerminalSalesDialogComponent, {
      width: "92vw",
      maxWidth: "1200px",
      maxHeight: "90vh",
      data: {
        terminal,
        billingBranchId: this.billingBranchId,
        period: this.period,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      }
    });
  }
  loadSummary() {
    if (!this.billingBranchId) {
      this.branchMissing = true;
      this.salesTerminals = [];
      this.collectionTerminal = this.emptyCollectionTerminal();
      this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), { rows: [], loading: false, totalResults: 0 });
      return;
    }
    if (this.period === "range" && (!this.dateFrom || !this.dateTo)) {
      return;
    }
    this.branchMissing = false;
    this.loading = true;
    this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), { loading: true });
    this.accountingService.getPosSummary({
      period: this.period,
      billing_branch_id: this.billingBranchId,
      date_from: this.period === "range" ? this.dateFrom : void 0,
      date_to: this.period === "range" ? this.dateTo : void 0
    }).subscribe({
      next: (res) => {
        this.salesTerminals = res.sales_terminals ?? [];
        this.collectionTerminal = res.collection_terminal ?? this.emptyCollectionTerminal();
        this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), {
          rows: this.salesTerminals,
          totalResults: this.salesTerminals.length,
          loading: false
        });
        this.loading = false;
      },
      error: () => {
        this.salesTerminals = [];
        this.collectionTerminal = this.emptyCollectionTerminal();
        this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), { rows: [], totalResults: 0, loading: false });
        this.loading = false;
      }
    });
  }
  emptyCollectionTerminal() {
    return {
      terminal_user_id: null,
      terminal_name: null,
      orders_collected: 0,
      amount_collected: 0,
      walk_in_count: 0,
      invoiced_count: 0
    };
  }
  static \u0275fac = function PosSummaryTabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosSummaryTabComponent)(\u0275\u0275directiveInject(AccountingService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PosSummaryTabComponent, selectors: [["app-pos-summary-tab"]], viewQuery: function PosSummaryTabComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, inputs: { billingBranchId: "billingBranchId", period: "period", dateFrom: "dateFrom", dateTo: "dateTo", reloadToken: "reloadToken" }, features: [\u0275\u0275NgOnChangesFeature], decls: 4, vars: 1, consts: [["tableTemplate", ""], [1, "accounting-empty"], [1, "pos-summary-layout"], [1, "pos-summary-section"], [1, "pos-summary-section__title"], [1, "pos-summary-table-wrap"], [3, "config", "rowTemplate"], [1, "pos-summary-section", "pos-summary-section--collection"], [1, "pos-summary-section__subtitle"], [1, "collection-metrics"], [1, "collection-metric"], [1, "collection-metric__label"], [1, "collection-metric__value"], [1, "px-2", "py-2"], [1, "text-sm", "font-medium", "text-gray-900", "m-0"], [1, "inline-flex", "items-center", "justify-center", "min-w-[2.5rem]", "px-2", "py-0.5", "rounded-full", "text-sm", "font-semibold", "bg-slate-100", "text-slate-800"], [1, "text-sm", "font-semibold", "text-gray-900", "m-0"], ["type", "button", 1, "detail-link-btn", 3, "click"]], template: function PosSummaryTabComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PosSummaryTabComponent_Conditional_0_Template, 3, 0, "div", 1)(1, PosSummaryTabComponent_Conditional_1_Template, 31, 7, "div", 2);
      \u0275\u0275template(2, PosSummaryTabComponent_ng_template_2_Template, 12, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.branchMissing ? 0 : 1);
    }
  }, dependencies: [CommonModule, DatatableWrapperComponent], styles: ["\n\n.accounting-empty[_ngcontent-%COMP%] {\n  padding: 2rem 1rem;\n  text-align: center;\n  color: #64748b;\n  background: #f8fafc;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n}\n.pos-summary-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr minmax(260px, 320px);\n  gap: 1.25rem;\n  align-items: start;\n}\n.pos-summary-section[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 1rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-summary-section__title[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n.pos-summary-section__subtitle[_ngcontent-%COMP%] {\n  margin: -0.35rem 0 1rem;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.pos-summary-table-wrap[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n.collection-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n}\n.collection-metric[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.75rem;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #fff 100%);\n  border: 1px solid #e2e8f0;\n}\n.collection-metric__label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.collection-metric__value[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.detail-link-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #4f46e5;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.25rem 0;\n}\n.detail-link-btn[_ngcontent-%COMP%]:hover {\n  color: #4338ca;\n  text-decoration: underline;\n}\n@media (max-width: 960px) {\n  .pos-summary-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=pos-summary-tab.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosSummaryTabComponent, [{
    type: Component,
    args: [{ selector: "app-pos-summary-tab", standalone: true, imports: [CommonModule, DatatableWrapperComponent], template: '@if (branchMissing) {\r\n  <div class="accounting-empty">\r\n    <p>Selecciona una sucursal para ver el resumen de puntos de venta.</p>\r\n  </div>\r\n} @else {\r\n  <div class="pos-summary-layout">\r\n    <div class="pos-summary-section">\r\n      <h3 class="pos-summary-section__title">Terminales de venta</h3>\r\n      <div class="pos-summary-table-wrap">\r\n        <app-datatable-wrapper\r\n          [config]="tableConfig"\r\n          [rowTemplate]="tableTemplate">\r\n        </app-datatable-wrapper>\r\n      </div>\r\n    </div>\r\n\r\n    <div class="pos-summary-section pos-summary-section--collection">\r\n      <h3 class="pos-summary-section__title">Terminal de cobranza</h3>\r\n      @if (collectionMetrics().terminal_name) {\r\n        <p class="pos-summary-section__subtitle">{{ collectionMetrics().terminal_name }}</p>\r\n      }\r\n      <div class="collection-metrics">\r\n        <div class="collection-metric">\r\n          <span class="collection-metric__label">\xD3rdenes cobradas</span>\r\n          <span class="collection-metric__value">{{ collectionMetrics().orders_collected }}</span>\r\n        </div>\r\n        <div class="collection-metric">\r\n          <span class="collection-metric__label">Total cobrado</span>\r\n          <span class="collection-metric__value">{{ formatCurrency(collectionMetrics().amount_collected) }}</span>\r\n        </div>\r\n        <div class="collection-metric">\r\n          <span class="collection-metric__label">P\xFAblico en General</span>\r\n          <span class="collection-metric__value">{{ collectionMetrics().walk_in_count }}</span>\r\n        </div>\r\n        <div class="collection-metric">\r\n          <span class="collection-metric__label">Facturadas</span>\r\n          <span class="collection-metric__value">{{ collectionMetrics().invoiced_count }}</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n}\r\n\r\n<ng-template #tableTemplate let-item="$implicit">\r\n  <td class="px-2 py-2">\r\n    <p class="text-sm font-medium text-gray-900 m-0">{{ item.terminal_name }}</p>\r\n  </td>\r\n  <td class="px-2 py-2">\r\n    <span class="inline-flex items-center justify-center min-w-[2.5rem] px-2 py-0.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-800">\r\n      {{ item.sales_count }}\r\n    </span>\r\n  </td>\r\n  <td class="px-2 py-2">\r\n    <p class="text-sm font-semibold text-gray-900 m-0">{{ formatCurrency(item.amount_sold) }}</p>\r\n  </td>\r\n  <td class="px-2 py-2">\r\n    <button type="button" class="detail-link-btn" (click)="openTerminalDetail(item)">\r\n      Ver detalle\r\n    </button>\r\n  </td>\r\n</ng-template>\r\n', styles: ["/* src/app/features/accounting/components/pos-summary-tab/pos-summary-tab.component.scss */\n.accounting-empty {\n  padding: 2rem 1rem;\n  text-align: center;\n  color: #64748b;\n  background: #f8fafc;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n}\n.pos-summary-layout {\n  display: grid;\n  grid-template-columns: 1fr minmax(260px, 320px);\n  gap: 1.25rem;\n  align-items: start;\n}\n.pos-summary-section {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 1rem;\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);\n}\n.pos-summary-section__title {\n  margin: 0 0 0.75rem;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n.pos-summary-section__subtitle {\n  margin: -0.35rem 0 1rem;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.pos-summary-table-wrap {\n  overflow: hidden;\n}\n.collection-metrics {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.75rem;\n}\n.collection-metric {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.75rem;\n  border-radius: 10px;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #fff 100%);\n  border: 1px solid #e2e8f0;\n}\n.collection-metric__label {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.collection-metric__value {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.detail-link-btn {\n  border: none;\n  background: transparent;\n  color: #4f46e5;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.25rem 0;\n}\n.detail-link-btn:hover {\n  color: #4338ca;\n  text-decoration: underline;\n}\n@media (max-width: 960px) {\n  .pos-summary-layout {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=pos-summary-tab.component.css.map */\n"] }]
  }], () => [{ type: AccountingService }, { type: MatDialog }, { type: TaxCalculatorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }], billingBranchId: [{
    type: Input
  }], period: [{
    type: Input
  }], dateFrom: [{
    type: Input
  }], dateTo: [{
    type: Input
  }], reloadToken: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PosSummaryTabComponent, { className: "PosSummaryTabComponent", filePath: "src/app/features/accounting/components/pos-summary-tab/pos-summary-tab.component.ts", lineNumber: 22 });
})();

// src/app/features/accounting/components/vendor-payable-detail-dialog/vendor-payable-detail-dialog.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function VendorPayableDetailDialogComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r0.detail.pending_order_count, " OC pendientes \xB7 ", ctx_r0.formatCurrency(ctx_r0.detail.amount_pending), " adeudado");
  }
}
function VendorPayableDetailDialogComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 4);
    \u0275\u0275text(1, "Cargando \xF3rdenes de compra...");
    \u0275\u0275domElementEnd();
  }
}
function VendorPayableDetailDialogComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 4);
    \u0275\u0275text(1, "No hay \xF3rdenes de compra pendientes.");
    \u0275\u0275domElementEnd();
  }
}
function VendorPayableDetailDialogComponent_Conditional_11_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "tr")(1, "td")(2, "button", 6);
    \u0275\u0275domListener("click", function VendorPayableDetailDialogComponent_Conditional_11_For_17_Template_button_click_2_listener() {
      const row_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openPurchaseOrder(row_r3));
    });
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", row_r3.folio || row_r3.id.substring(0, 8), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(row_r3.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(row_r3.expected_delivery_date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(row_r3.amount_paid));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(row_r3.amount_pending));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.orderStatus(row_r3));
  }
}
function VendorPayableDetailDialogComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "table", 5)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Folio OC");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "th");
    \u0275\u0275text(6, "Fecha");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "th");
    \u0275\u0275text(8, "Entrega esperada");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "th");
    \u0275\u0275text(10, "Pagado");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "th");
    \u0275\u0275text(12, "Pendiente");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "th");
    \u0275\u0275text(14, "Estatus");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, VendorPayableDetailDialogComponent_Conditional_11_For_17_Template, 14, 6, "tr", null, _forTrack02);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r0.detail.orders);
  }
}
var VendorPayableDetailDialogComponent = class _VendorPayableDetailDialogComponent {
  data;
  dialogRef;
  accountingService;
  router;
  taxCalculator;
  detail = null;
  loading = true;
  constructor(data, dialogRef, accountingService, router, taxCalculator) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.accountingService = accountingService;
    this.router = router;
    this.taxCalculator = taxCalculator;
  }
  ngOnInit() {
    this.accountingService.getAccountsPayableVendorDetail(this.data.vendorId).subscribe({
      next: (detail) => {
        this.detail = detail;
        this.loading = false;
      },
      error: () => {
        this.detail = null;
        this.loading = false;
      }
    });
  }
  vendorDisplayName() {
    if (!this.detail) {
      return this.data.vendorLabel;
    }
    return this.detail.razon_social?.trim() || this.detail.company_name?.trim() || this.detail.vendor_name?.trim() || this.data.vendorLabel;
  }
  close() {
    this.dialogRef.close();
  }
  formatCurrency(value) {
    const n = value == null ? 0 : typeof value === "number" ? value : Number(value);
    return this.taxCalculator.formatCurrency(Number.isFinite(n) ? n : 0);
  }
  formatDate(value) {
    if (!value)
      return "\u2014";
    const d = new Date(value);
    if (Number.isNaN(d.getTime()))
      return value;
    return d.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
  }
  orderStatus(row) {
    return row.general_status || row.status || "\u2014";
  }
  openPurchaseOrder(row) {
    if (!row.id)
      return;
    this.dialogRef.close();
    void this.router.navigate(["/purchase-orders", row.id]);
  }
  static \u0275fac = function VendorPayableDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VendorPayableDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(AccountingService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VendorPayableDetailDialogComponent, selectors: [["app-vendor-payable-detail-dialog"]], decls: 12, vars: 3, consts: [[1, "vendor-detail-dialog"], [1, "vendor-detail-dialog__header"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], [1, "vendor-detail-dialog__body"], [1, "loading-text"], [1, "detail-table"], ["type", "button", 1, "folio-link", 3, "click"]], template: function VendorPayableDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2");
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(5, VendorPayableDetailDialogComponent_Conditional_5_Template, 2, 2, "p");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "button", 2);
      \u0275\u0275domListener("click", function VendorPayableDetailDialogComponent_Template_button_click_6_listener() {
        return ctx.close();
      });
      \u0275\u0275text(7, "\xD7");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 3);
      \u0275\u0275conditionalCreate(9, VendorPayableDetailDialogComponent_Conditional_9_Template, 2, 0, "p", 4)(10, VendorPayableDetailDialogComponent_Conditional_10_Template, 2, 0, "p", 4)(11, VendorPayableDetailDialogComponent_Conditional_11_Template, 18, 0, "table", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.vendorDisplayName());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.detail ? 5 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loading ? 9 : !(ctx.detail == null ? null : ctx.detail.orders == null ? null : ctx.detail.orders.length) ? 10 : 11);
    }
  }, dependencies: [CommonModule, MatDialogModule], styles: ["\n\n.vendor-detail-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n}\n.vendor-detail-dialog__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n.vendor-detail-dialog__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.vendor-detail-dialog__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.close-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: #f1f5f9;\n  color: #475569;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  font-size: 1.25rem;\n  cursor: pointer;\n}\n.vendor-detail-dialog__body[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem 1.25rem;\n  overflow: auto;\n}\n.loading-text[_ngcontent-%COMP%] {\n  color: #64748b;\n  text-align: center;\n  padding: 2rem 1rem;\n}\n.detail-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.detail-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 0.65rem 0.75rem;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  color: #64748b;\n  border-bottom: 1px solid #e2e8f0;\n}\n.detail-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border-bottom: 1px solid #f1f5f9;\n  color: #334155;\n}\n.folio-link[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #4f46e5;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n}\n.folio-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=vendor-payable-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VendorPayableDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-vendor-payable-detail-dialog", standalone: true, imports: [CommonModule, MatDialogModule], template: '<div class="vendor-detail-dialog">\r\n  <div class="vendor-detail-dialog__header">\r\n    <div>\r\n      <h2>{{ vendorDisplayName() }}</h2>\r\n      @if (detail) {\r\n        <p>{{ detail.pending_order_count }} OC pendientes \xB7 {{ formatCurrency(detail.amount_pending) }} adeudado</p>\r\n      }\r\n    </div>\r\n    <button type="button" class="close-btn" (click)="close()" aria-label="Cerrar">\xD7</button>\r\n  </div>\r\n\r\n  <div class="vendor-detail-dialog__body">\r\n    @if (loading) {\r\n      <p class="loading-text">Cargando \xF3rdenes de compra...</p>\r\n    } @else if (!detail?.orders?.length) {\r\n      <p class="loading-text">No hay \xF3rdenes de compra pendientes.</p>\r\n    } @else {\r\n      <table class="detail-table">\r\n        <thead>\r\n          <tr>\r\n            <th>Folio OC</th>\r\n            <th>Fecha</th>\r\n            <th>Entrega esperada</th>\r\n            <th>Pagado</th>\r\n            <th>Pendiente</th>\r\n            <th>Estatus</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          @for (row of detail!.orders; track row.id) {\r\n            <tr>\r\n              <td>\r\n                <button type="button" class="folio-link" (click)="openPurchaseOrder(row)">\r\n                  {{ row.folio || row.id.substring(0, 8) }}\r\n                </button>\r\n              </td>\r\n              <td>{{ formatDate(row.created_at) }}</td>\r\n              <td>{{ formatDate(row.expected_delivery_date) }}</td>\r\n              <td>{{ formatCurrency(row.amount_paid) }}</td>\r\n              <td>{{ formatCurrency(row.amount_pending) }}</td>\r\n              <td>{{ orderStatus(row) }}</td>\r\n            </tr>\r\n          }\r\n        </tbody>\r\n      </table>\r\n    }\r\n  </div>\r\n</div>\r\n', styles: ["/* src/app/features/accounting/components/vendor-payable-detail-dialog/vendor-payable-detail-dialog.component.scss */\n.vendor-detail-dialog {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n}\n.vendor-detail-dialog__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n.vendor-detail-dialog__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.vendor-detail-dialog__header p {\n  margin: 0.25rem 0 0;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.close-btn {\n  border: none;\n  background: #f1f5f9;\n  color: #475569;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  font-size: 1.25rem;\n  cursor: pointer;\n}\n.vendor-detail-dialog__body {\n  padding: 1rem 1.25rem 1.25rem;\n  overflow: auto;\n}\n.loading-text {\n  color: #64748b;\n  text-align: center;\n  padding: 2rem 1rem;\n}\n.detail-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.detail-table th {\n  text-align: left;\n  padding: 0.65rem 0.75rem;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  color: #64748b;\n  border-bottom: 1px solid #e2e8f0;\n}\n.detail-table td {\n  padding: 0.75rem;\n  border-bottom: 1px solid #f1f5f9;\n  color: #334155;\n}\n.folio-link {\n  border: none;\n  background: transparent;\n  color: #4f46e5;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n}\n.folio-link:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=vendor-payable-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: AccountingService }, { type: Router }, { type: TaxCalculatorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VendorPayableDetailDialogComponent, { className: "VendorPayableDetailDialogComponent", filePath: "src/app/features/accounting/components/vendor-payable-detail-dialog/vendor-payable-detail-dialog.component.ts", lineNumber: 21 });
})();

// src/app/features/accounting/components/accounts-payable-tab/accounts-payable-tab.component.ts
var _c03 = ["tableTemplate"];
function AccountsPayableTabComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 8)(2, "span", 9);
    \u0275\u0275text(3, "Proveedores con saldo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 8)(7, "span", 9);
    \u0275\u0275text(8, "Total adeudado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 10);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.summary.total_vendors ?? 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.summary.total_amount_pending ?? 0));
  }
}
function AccountsPayableTabComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 11)(1, "button", 12);
    \u0275\u0275listener("click", function AccountsPayableTabComponent_ng_template_7_Template_button_click_1_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openVendorDetail(item_r4));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 11);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 11)(8, "div", 13)(9, "div", 14);
    \u0275\u0275element(10, "div");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 15);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.vendorLabel(item_r4), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.pending_order_count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r4.amount_pending));
    \u0275\u0275advance(4);
    \u0275\u0275classMap(\u0275\u0275interpolate1("progress-bar__fill progress-bar__fill--", ctx_r1.progressColor(item_r4.progress_percentage)));
    \u0275\u0275styleProp("width", ctx_r1.Math.min(item_r4.progress_percentage, 100), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(13, 9, item_r4.progress_percentage, "1.0-0"), "%");
  }
}
var AccountsPayableTabComponent = class _AccountsPayableTabComponent {
  accountingService;
  dialog;
  taxCalculator;
  tableTemplate;
  Math = Math;
  reloadToken = 0;
  searchControl = new FormControl("", { nonNullable: true });
  destroy$ = new Subject();
  summary = null;
  tableConfig = {
    rows: [],
    columns: [
      { name: "Proveedor", prop: "vendor", sortable: false, canAutoResize: false, width: 220 },
      { name: "# OC pendientes", prop: "pending_order_count", sortable: false, canAutoResize: false, width: 130 },
      { name: "Monto adeudado", prop: "amount_pending", sortable: false, canAutoResize: false, width: 140 },
      { name: "Progreso", prop: "progress", sortable: false, canAutoResize: false, width: 180 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin proveedores", subtitle: "No hay cuentas por pagar pendientes" },
    columnMode: "force",
    reorderable: false
  };
  constructor(accountingService, dialog, taxCalculator) {
    this.accountingService = accountingService;
    this.dialog = dialog;
    this.taxCalculator = taxCalculator;
  }
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.loadPage(1));
    this.loadPage(1);
  }
  ngOnChanges(changes) {
    if (changes["reloadToken"] && !changes["reloadToken"].firstChange) {
      this.loadPage(this.tableConfig.page);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  vendorLabel(row) {
    return row.razon_social?.trim() || row.company_name?.trim() || row.vendor_name?.trim() || "\u2014";
  }
  formatCurrency(value) {
    return this.taxCalculator.formatCurrency(value);
  }
  progressColor(pct) {
    if (pct > 80)
      return "danger";
    if (pct >= 50)
      return "warning";
    return "success";
  }
  onPageChange(event) {
    this.loadPage(event.page);
  }
  openVendorDetail(row) {
    this.dialog.open(VendorPayableDetailDialogComponent, {
      width: "92vw",
      maxWidth: "1100px",
      maxHeight: "90vh",
      data: { vendorId: row.vendor_id, vendorLabel: this.vendorLabel(row) }
    });
  }
  loadPage(page) {
    this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), { loading: true, page });
    this.accountingService.getAccountsPayable(this.searchControl.value, page, this.tableConfig.limit).subscribe({
      next: (res) => {
        this.summary = res.summary ?? null;
        this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), {
          rows: res.data,
          page: res.page,
          totalResults: res.total,
          loading: false
        });
      },
      error: () => {
        this.summary = null;
        this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), { rows: [], totalResults: 0, loading: false });
      }
    });
  }
  static \u0275fac = function AccountsPayableTabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountsPayableTabComponent)(\u0275\u0275directiveInject(AccountingService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountsPayableTabComponent, selectors: [["app-accounts-payable-tab"]], viewQuery: function AccountsPayableTabComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, inputs: { reloadToken: "reloadToken" }, features: [\u0275\u0275NgOnChangesFeature], decls: 9, vars: 4, consts: [["tableTemplate", ""], [1, "payable-tab"], [1, "payable-summary"], [1, "payable-search"], ["aria-hidden", "true", 1, "fi", "fi-rr-search", "payable-search__icon"], ["type", "search", "placeholder", "Buscar por nombre o raz\xF3n social", "aria-label", "Buscar proveedor", 1, "payable-search__input", 3, "formControl"], [1, "payable-table-wrap"], [3, "pageChange", "config", "rowTemplate"], [1, "payable-summary__card"], [1, "payable-summary__label"], [1, "payable-summary__value"], [1, "px-2", "py-2"], ["type", "button", 1, "row-link", 3, "click"], [1, "progress-cell"], [1, "progress-bar"], [1, "progress-cell__pct"]], template: function AccountsPayableTabComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, AccountsPayableTabComponent_Conditional_1_Template, 11, 2, "div", 2);
      \u0275\u0275elementStart(2, "div", 3);
      \u0275\u0275element(3, "i", 4)(4, "input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 6)(6, "app-datatable-wrapper", 7);
      \u0275\u0275listener("pageChange", function AccountsPayableTabComponent_Template_app_datatable_wrapper_pageChange_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(7, AccountsPayableTabComponent_ng_template_7_Template, 14, 12, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r5 = \u0275\u0275reference(8);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.summary ? 1 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("formControl", ctx.searchControl);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.tableConfig)("rowTemplate", tableTemplate_r5);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective, DatatableWrapperComponent, DecimalPipe], styles: ["\n\n.payable-tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.payable-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n  max-width: 36rem;\n}\n.payable-summary__card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.85rem 1rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #fff 100%);\n}\n.payable-summary__label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.payable-summary__value[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.payable-search[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 28rem;\n}\n.payable-search__icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.85rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #94a3b8;\n  pointer-events: none;\n}\n.payable-search__input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2.75rem;\n  padding: 0.65rem 0.85rem 0.65rem 2.35rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  color: #334155;\n  background: #fff;\n}\n.payable-search__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #a5b4fc;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.payable-table-wrap[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.row-link[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #1e293b;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  text-align: left;\n}\n.row-link[_ngcontent-%COMP%]:hover {\n  color: #4f46e5;\n}\n.progress-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 0.5rem;\n  background: #e2e8f0;\n  border-radius: 9999px;\n  overflow: hidden;\n}\n.progress-bar__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 9999px;\n  transition: width 0.2s ease;\n}\n.progress-bar__fill--success[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.progress-bar__fill--warning[_ngcontent-%COMP%] {\n  background: #eab308;\n}\n.progress-bar__fill--danger[_ngcontent-%COMP%] {\n  background: #ef4444;\n}\n.progress-cell__pct[_ngcontent-%COMP%] {\n  min-width: 2.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #64748b;\n}\n/*# sourceMappingURL=accounts-payable-tab.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountsPayableTabComponent, [{
    type: Component,
    args: [{ selector: "app-accounts-payable-tab", standalone: true, imports: [CommonModule, ReactiveFormsModule, DatatableWrapperComponent], template: `<div class="payable-tab">\r
  @if (summary) {\r
    <div class="payable-summary">\r
      <div class="payable-summary__card">\r
        <span class="payable-summary__label">Proveedores con saldo</span>\r
        <span class="payable-summary__value">{{ summary.total_vendors ?? 0 }}</span>\r
      </div>\r
      <div class="payable-summary__card">\r
        <span class="payable-summary__label">Total adeudado</span>\r
        <span class="payable-summary__value">{{ formatCurrency(summary.total_amount_pending ?? 0) }}</span>\r
      </div>\r
    </div>\r
  }\r
\r
  <div class="payable-search">\r
    <i class="fi fi-rr-search payable-search__icon" aria-hidden="true"></i>\r
    <input\r
      type="search"\r
      class="payable-search__input"\r
      [formControl]="searchControl"\r
      placeholder="Buscar por nombre o raz\xF3n social"\r
      aria-label="Buscar proveedor" />\r
  </div>\r
\r
  <div class="payable-table-wrap">\r
    <app-datatable-wrapper\r
      [config]="tableConfig"\r
      [rowTemplate]="tableTemplate"\r
      (pageChange)="onPageChange($event)">\r
    </app-datatable-wrapper>\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td class="px-2 py-2">\r
    <button type="button" class="row-link" (click)="openVendorDetail(item)">\r
      {{ vendorLabel(item) }}\r
    </button>\r
  </td>\r
  <td class="px-2 py-2">{{ item.pending_order_count }}</td>\r
  <td class="px-2 py-2">{{ formatCurrency(item.amount_pending) }}</td>\r
  <td class="px-2 py-2">\r
    <div class="progress-cell">\r
      <div class="progress-bar">\r
        <div\r
          class="progress-bar__fill progress-bar__fill--{{ progressColor(item.progress_percentage) }}"\r
          [style.width.%]="Math.min(item.progress_percentage, 100)">\r
        </div>\r
      </div>\r
      <span class="progress-cell__pct">{{ item.progress_percentage | number:'1.0-0' }}%</span>\r
    </div>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/accounting/components/accounts-payable-tab/accounts-payable-tab.component.scss */\n.payable-tab {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.payable-summary {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n  max-width: 36rem;\n}\n.payable-summary__card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.85rem 1rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #fff 100%);\n}\n.payable-summary__label {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.payable-summary__value {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.payable-search {\n  position: relative;\n  max-width: 28rem;\n}\n.payable-search__icon {\n  position: absolute;\n  left: 0.85rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #94a3b8;\n  pointer-events: none;\n}\n.payable-search__input {\n  width: 100%;\n  min-height: 2.75rem;\n  padding: 0.65rem 0.85rem 0.65rem 2.35rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  color: #334155;\n  background: #fff;\n}\n.payable-search__input:focus {\n  outline: none;\n  border-color: #a5b4fc;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.payable-table-wrap {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.row-link {\n  border: none;\n  background: transparent;\n  color: #1e293b;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  text-align: left;\n}\n.row-link:hover {\n  color: #4f46e5;\n}\n.progress-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.progress-bar {\n  flex: 1;\n  height: 0.5rem;\n  background: #e2e8f0;\n  border-radius: 9999px;\n  overflow: hidden;\n}\n.progress-bar__fill {\n  height: 100%;\n  border-radius: 9999px;\n  transition: width 0.2s ease;\n}\n.progress-bar__fill--success {\n  background: #22c55e;\n}\n.progress-bar__fill--warning {\n  background: #eab308;\n}\n.progress-bar__fill--danger {\n  background: #ef4444;\n}\n.progress-cell__pct {\n  min-width: 2.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #64748b;\n}\n/*# sourceMappingURL=accounts-payable-tab.component.css.map */\n"] }]
  }], () => [{ type: AccountingService }, { type: MatDialog }, { type: TaxCalculatorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }], reloadToken: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountsPayableTabComponent, { className: "AccountsPayableTabComponent", filePath: "src/app/features/accounting/components/accounts-payable-tab/accounts-payable-tab.component.ts", lineNumber: 20 });
})();

// src/app/features/accounting/components/receivable-detail-dialog/receivable-detail-dialog.component.ts
var _forTrack03 = ($index, $item) => $item.id;
function ReceivableDetailDialogComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("RFC: ", ctx_r0.data.fiscalRfc);
  }
}
function ReceivableDetailDialogComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r0.detail.pending_order_count, " \xF3rdenes");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.formatCurrency(ctx_r0.detail.amount_pending), " adeudado");
  }
}
function ReceivableDetailDialogComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 5);
    \u0275\u0275text(1, "Cargando \xF3rdenes pendientes...");
    \u0275\u0275domElementEnd();
  }
}
function ReceivableDetailDialogComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 5);
    \u0275\u0275text(1, "No hay \xF3rdenes pendientes para esta raz\xF3n social.");
    \u0275\u0275domElementEnd();
  }
}
function ReceivableDetailDialogComponent_Conditional_13_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "tr")(1, "td")(2, "button", 7);
    \u0275\u0275domListener("click", function ReceivableDetailDialogComponent_Conditional_13_For_17_Template_button_click_2_listener() {
      const row_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.openSalesOrder(row_r3));
    });
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", row_r3.folio || row_r3.id.substring(0, 8), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(row_r3.created_at));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r3.customer_display_name || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.sellerLabel(row_r3));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatCurrency(row_r3.total));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(row_r3.expected_delivery_date || row_r3.delivery_date));
  }
}
function ReceivableDetailDialogComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "table", 6)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Folio");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "th");
    \u0275\u0275text(6, "Fecha");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "th");
    \u0275\u0275text(8, "Cliente");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "th");
    \u0275\u0275text(10, "Vendedor");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "th");
    \u0275\u0275text(12, "Total");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "th");
    \u0275\u0275text(14, "Entrega");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, ReceivableDetailDialogComponent_Conditional_13_For_17_Template, 14, 6, "tr", null, _forTrack03);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r0.detail.orders);
  }
}
var ReceivableDetailDialogComponent = class _ReceivableDetailDialogComponent {
  data;
  dialogRef;
  dialog;
  accountingService;
  taxCalculator;
  detail = null;
  loading = true;
  constructor(data, dialogRef, dialog, accountingService, taxCalculator) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.dialog = dialog;
    this.accountingService = accountingService;
    this.taxCalculator = taxCalculator;
  }
  ngOnInit() {
    this.accountingService.getAccountsReceivableOrders(this.data.razonSocial, this.data.billingBranchId).subscribe({
      next: (detail) => {
        this.detail = detail;
        this.loading = false;
      },
      error: () => {
        this.detail = null;
        this.loading = false;
      }
    });
  }
  close() {
    this.dialogRef.close();
  }
  formatCurrency(value) {
    const n = value == null ? 0 : typeof value === "number" ? value : Number(value);
    return this.taxCalculator.formatCurrency(Number.isFinite(n) ? n : 0);
  }
  formatDate(value) {
    if (!value)
      return "\u2014";
    const d = new Date(value);
    if (Number.isNaN(d.getTime()))
      return value;
    return d.toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" });
  }
  sellerLabel(row) {
    return formatPosUser(row.seller_user);
  }
  openSalesOrder(row) {
    if (!row.id)
      return;
    this.dialog.open(SalesOrderDetailDialogComponent, __spreadProps(__spreadValues({}, ORDER_DETAIL_DIALOG_OPTIONS), {
      data: { orderId: row.id }
    }));
  }
  static \u0275fac = function ReceivableDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReceivableDetailDialogComponent)(\u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(AccountingService), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReceivableDetailDialogComponent, selectors: [["app-receivable-detail-dialog"]], decls: 14, vars: 4, consts: [[1, "receivable-detail-dialog"], [1, "receivable-detail-dialog__header"], [1, "receivable-detail-dialog__meta"], ["type", "button", "aria-label", "Cerrar", 1, "close-btn", 3, "click"], [1, "receivable-detail-dialog__body"], [1, "loading-text"], [1, "detail-table"], ["type", "button", 1, "folio-link", 3, "click"]], template: function ReceivableDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2");
      \u0275\u0275text(4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div", 2);
      \u0275\u0275conditionalCreate(6, ReceivableDetailDialogComponent_Conditional_6_Template, 2, 1, "span");
      \u0275\u0275conditionalCreate(7, ReceivableDetailDialogComponent_Conditional_7_Template, 4, 2);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "button", 3);
      \u0275\u0275domListener("click", function ReceivableDetailDialogComponent_Template_button_click_8_listener() {
        return ctx.close();
      });
      \u0275\u0275text(9, "\xD7");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(10, "div", 4);
      \u0275\u0275conditionalCreate(11, ReceivableDetailDialogComponent_Conditional_11_Template, 2, 0, "p", 5)(12, ReceivableDetailDialogComponent_Conditional_12_Template, 2, 0, "p", 5)(13, ReceivableDetailDialogComponent_Conditional_13_Template, 18, 0, "table", 6);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.data.razonSocial);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.data.fiscalRfc ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.detail ? 7 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.loading ? 11 : !(ctx.detail == null ? null : ctx.detail.orders == null ? null : ctx.detail.orders.length) ? 12 : 13);
    }
  }, dependencies: [CommonModule, MatDialogModule], styles: ["\n\n.receivable-detail-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n}\n.receivable-detail-dialog__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n.receivable-detail-dialog__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.receivable-detail-dialog__meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-top: 0.35rem;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.close-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: #f1f5f9;\n  color: #475569;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  font-size: 1.25rem;\n  cursor: pointer;\n}\n.receivable-detail-dialog__body[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem 1.25rem;\n  overflow: auto;\n}\n.loading-text[_ngcontent-%COMP%] {\n  color: #64748b;\n  text-align: center;\n  padding: 2rem 1rem;\n}\n.detail-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.detail-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 0.65rem 0.75rem;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  color: #64748b;\n  border-bottom: 1px solid #e2e8f0;\n}\n.detail-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border-bottom: 1px solid #f1f5f9;\n  color: #334155;\n}\n.folio-link[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #4f46e5;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n}\n.folio-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=receivable-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReceivableDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-receivable-detail-dialog", standalone: true, imports: [CommonModule, MatDialogModule], template: `<div class="receivable-detail-dialog">\r
  <div class="receivable-detail-dialog__header">\r
    <div>\r
      <h2>{{ data.razonSocial }}</h2>\r
      <div class="receivable-detail-dialog__meta">\r
        @if (data.fiscalRfc) {\r
          <span>RFC: {{ data.fiscalRfc }}</span>\r
        }\r
        @if (detail) {\r
          <span>{{ detail.pending_order_count }} \xF3rdenes</span>\r
          <span>{{ formatCurrency(detail.amount_pending) }} adeudado</span>\r
        }\r
      </div>\r
    </div>\r
    <button type="button" class="close-btn" (click)="close()" aria-label="Cerrar">\xD7</button>\r
  </div>\r
\r
  <div class="receivable-detail-dialog__body">\r
    @if (loading) {\r
      <p class="loading-text">Cargando \xF3rdenes pendientes...</p>\r
    } @else if (!detail?.orders?.length) {\r
      <p class="loading-text">No hay \xF3rdenes pendientes para esta raz\xF3n social.</p>\r
    } @else {\r
      <table class="detail-table">\r
        <thead>\r
          <tr>\r
            <th>Folio</th>\r
            <th>Fecha</th>\r
            <th>Cliente</th>\r
            <th>Vendedor</th>\r
            <th>Total</th>\r
            <th>Entrega</th>\r
          </tr>\r
        </thead>\r
        <tbody>\r
          @for (row of detail!.orders; track row.id) {\r
            <tr>\r
              <td>\r
                <button type="button" class="folio-link" (click)="openSalesOrder(row)">\r
                  {{ row.folio || row.id.substring(0, 8) }}\r
                </button>\r
              </td>\r
              <td>{{ formatDate(row.created_at) }}</td>\r
              <td>{{ row.customer_display_name || '\u2014' }}</td>\r
              <td>{{ sellerLabel(row) }}</td>\r
              <td>{{ formatCurrency(row.total) }}</td>\r
              <td>{{ formatDate(row.expected_delivery_date || row.delivery_date) }}</td>\r
            </tr>\r
          }\r
        </tbody>\r
      </table>\r
    }\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/accounting/components/receivable-detail-dialog/receivable-detail-dialog.component.scss */\n.receivable-detail-dialog {\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n}\n.receivable-detail-dialog__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n.receivable-detail-dialog__header h2 {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n}\n.receivable-detail-dialog__meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin-top: 0.35rem;\n  font-size: 0.8125rem;\n  color: #64748b;\n}\n.close-btn {\n  border: none;\n  background: #f1f5f9;\n  color: #475569;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 9999px;\n  font-size: 1.25rem;\n  cursor: pointer;\n}\n.receivable-detail-dialog__body {\n  padding: 1rem 1.25rem 1.25rem;\n  overflow: auto;\n}\n.loading-text {\n  color: #64748b;\n  text-align: center;\n  padding: 2rem 1rem;\n}\n.detail-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n}\n.detail-table th {\n  text-align: left;\n  padding: 0.65rem 0.75rem;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  color: #64748b;\n  border-bottom: 1px solid #e2e8f0;\n}\n.detail-table td {\n  padding: 0.75rem;\n  border-bottom: 1px solid #f1f5f9;\n  color: #334155;\n}\n.folio-link {\n  border: none;\n  background: transparent;\n  color: #4f46e5;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n}\n.folio-link:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=receivable-detail-dialog.component.css.map */\n"] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [MAT_DIALOG_DATA]
  }] }, { type: MatDialogRef }, { type: MatDialog }, { type: AccountingService }, { type: TaxCalculatorService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReceivableDetailDialogComponent, { className: "ReceivableDetailDialogComponent", filePath: "src/app/features/accounting/components/receivable-detail-dialog/receivable-detail-dialog.component.ts", lineNumber: 24 });
})();

// src/app/features/accounting/components/accounts-receivable-tab/accounts-receivable-tab.component.ts
var _c04 = ["tableTemplate"];
function AccountsReceivableTabComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 8)(2, "span", 9);
    \u0275\u0275text(3, "Cuentas con saldo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 10);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 8)(7, "span", 9);
    \u0275\u0275text(8, "Total por cobrar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 10);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.summary.total_accounts ?? 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.summary.total_amount_pending ?? 0));
  }
}
function AccountsReceivableTabComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 11)(1, "button", 12);
    \u0275\u0275listener("click", function AccountsReceivableTabComponent_ng_template_7_Template_button_click_1_listener() {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openReceivableDetail(item_r4));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 11);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 11);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r4.razon_social, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.fiscal_rfc || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.pending_order_count);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(item_r4.amount_pending));
  }
}
var AccountsReceivableTabComponent = class _AccountsReceivableTabComponent {
  accountingService;
  dialog;
  taxCalculator;
  tableTemplate;
  billingBranchId;
  reloadToken = 0;
  searchControl = new FormControl("", { nonNullable: true });
  destroy$ = new Subject();
  summary = null;
  tableConfig = {
    rows: [],
    columns: [
      { name: "Raz\xF3n social", prop: "razon_social", sortable: false, canAutoResize: false, width: 240 },
      { name: "RFC", prop: "fiscal_rfc", sortable: false, canAutoResize: false, width: 160 },
      { name: "# \xD3rdenes", prop: "pending_order_count", sortable: false, canAutoResize: false, width: 110 },
      { name: "Debe", prop: "amount_pending", sortable: false, canAutoResize: false, width: 140 }
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin adeudos", subtitle: "No hay cuentas por cobrar pendientes" },
    columnMode: "force",
    reorderable: false
  };
  constructor(accountingService, dialog, taxCalculator) {
    this.accountingService = accountingService;
    this.dialog = dialog;
    this.taxCalculator = taxCalculator;
  }
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => this.loadPage(1));
    this.loadPage(1);
  }
  ngOnChanges(changes) {
    if (changes["billingBranchId"] && !changes["billingBranchId"].firstChange) {
      this.loadPage(1);
      return;
    }
    if (changes["reloadToken"] && !changes["reloadToken"].firstChange) {
      this.loadPage(this.tableConfig.page);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  formatCurrency(value) {
    return this.taxCalculator.formatCurrency(value);
  }
  onPageChange(event) {
    this.loadPage(event.page);
  }
  openReceivableDetail(row) {
    this.dialog.open(ReceivableDetailDialogComponent, {
      width: "92vw",
      maxWidth: "1200px",
      maxHeight: "90vh",
      data: {
        razonSocial: row.razon_social,
        fiscalRfc: row.fiscal_rfc,
        billingBranchId: this.billingBranchId
      }
    });
  }
  loadPage(page) {
    this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), { loading: true, page });
    this.accountingService.getAccountsReceivable(this.billingBranchId, this.searchControl.value, page, this.tableConfig.limit).subscribe({
      next: (res) => {
        this.summary = res.summary ?? null;
        this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), {
          rows: res.data,
          page: res.page,
          totalResults: res.total,
          loading: false
        });
      },
      error: () => {
        this.summary = null;
        this.tableConfig = __spreadProps(__spreadValues({}, this.tableConfig), { rows: [], totalResults: 0, loading: false });
      }
    });
  }
  static \u0275fac = function AccountsReceivableTabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountsReceivableTabComponent)(\u0275\u0275directiveInject(AccountingService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(TaxCalculatorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountsReceivableTabComponent, selectors: [["app-accounts-receivable-tab"]], viewQuery: function AccountsReceivableTabComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c04, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, inputs: { billingBranchId: "billingBranchId", reloadToken: "reloadToken" }, features: [\u0275\u0275NgOnChangesFeature], decls: 9, vars: 4, consts: [["tableTemplate", ""], [1, "receivable-tab"], [1, "receivable-summary"], [1, "receivable-search"], ["aria-hidden", "true", 1, "fi", "fi-rr-search", "receivable-search__icon"], ["type", "search", "placeholder", "Buscar por raz\xF3n social o RFC", "aria-label", "Buscar cuentas por cobrar", 1, "receivable-search__input", 3, "formControl"], [1, "receivable-table-wrap"], [3, "pageChange", "config", "rowTemplate"], [1, "receivable-summary__card"], [1, "receivable-summary__label"], [1, "receivable-summary__value"], [1, "px-2", "py-2"], ["type", "button", 1, "row-link", 3, "click"]], template: function AccountsReceivableTabComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1);
      \u0275\u0275conditionalCreate(1, AccountsReceivableTabComponent_Conditional_1_Template, 11, 2, "div", 2);
      \u0275\u0275elementStart(2, "div", 3);
      \u0275\u0275element(3, "i", 4)(4, "input", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 6)(6, "app-datatable-wrapper", 7);
      \u0275\u0275listener("pageChange", function AccountsReceivableTabComponent_Template_app_datatable_wrapper_pageChange_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(7, AccountsReceivableTabComponent_ng_template_7_Template, 9, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r5 = \u0275\u0275reference(8);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.summary ? 1 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("formControl", ctx.searchControl);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.tableConfig)("rowTemplate", tableTemplate_r5);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, FormControlDirective, DatatableWrapperComponent], styles: ["\n\n.receivable-tab[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.receivable-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n  max-width: 36rem;\n}\n.receivable-summary__card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.85rem 1rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #fff 100%);\n}\n.receivable-summary__label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.receivable-summary__value[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.receivable-search[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 28rem;\n}\n.receivable-search__icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.85rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #94a3b8;\n  pointer-events: none;\n}\n.receivable-search__input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 2.75rem;\n  padding: 0.65rem 0.85rem 0.65rem 2.35rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  color: #334155;\n  background: #fff;\n}\n.receivable-search__input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #a5b4fc;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.receivable-table-wrap[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.row-link[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #1e293b;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  text-align: left;\n}\n.row-link[_ngcontent-%COMP%]:hover {\n  color: #4f46e5;\n}\n/*# sourceMappingURL=accounts-receivable-tab.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountsReceivableTabComponent, [{
    type: Component,
    args: [{ selector: "app-accounts-receivable-tab", standalone: true, imports: [CommonModule, ReactiveFormsModule, DatatableWrapperComponent], template: `<div class="receivable-tab">\r
  @if (summary) {\r
    <div class="receivable-summary">\r
      <div class="receivable-summary__card">\r
        <span class="receivable-summary__label">Cuentas con saldo</span>\r
        <span class="receivable-summary__value">{{ summary.total_accounts ?? 0 }}</span>\r
      </div>\r
      <div class="receivable-summary__card">\r
        <span class="receivable-summary__label">Total por cobrar</span>\r
        <span class="receivable-summary__value">{{ formatCurrency(summary.total_amount_pending ?? 0) }}</span>\r
      </div>\r
    </div>\r
  }\r
\r
  <div class="receivable-search">\r
    <i class="fi fi-rr-search receivable-search__icon" aria-hidden="true"></i>\r
    <input\r
      type="search"\r
      class="receivable-search__input"\r
      [formControl]="searchControl"\r
      placeholder="Buscar por raz\xF3n social o RFC"\r
      aria-label="Buscar cuentas por cobrar" />\r
  </div>\r
\r
  <div class="receivable-table-wrap">\r
    <app-datatable-wrapper\r
      [config]="tableConfig"\r
      [rowTemplate]="tableTemplate"\r
      (pageChange)="onPageChange($event)">\r
    </app-datatable-wrapper>\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td class="px-2 py-2">\r
    <button type="button" class="row-link" (click)="openReceivableDetail(item)">\r
      {{ item.razon_social }}\r
    </button>\r
  </td>\r
  <td class="px-2 py-2">{{ item.fiscal_rfc || '\u2014' }}</td>\r
  <td class="px-2 py-2">{{ item.pending_order_count }}</td>\r
  <td class="px-2 py-2">{{ formatCurrency(item.amount_pending) }}</td>\r
</ng-template>\r
`, styles: ["/* src/app/features/accounting/components/accounts-receivable-tab/accounts-receivable-tab.component.scss */\n.receivable-tab {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.receivable-summary {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n  max-width: 36rem;\n}\n.receivable-summary__card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.85rem 1rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #fff 100%);\n}\n.receivable-summary__label {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n.receivable-summary__value {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.receivable-search {\n  position: relative;\n  max-width: 28rem;\n}\n.receivable-search__icon {\n  position: absolute;\n  left: 0.85rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #94a3b8;\n  pointer-events: none;\n}\n.receivable-search__input {\n  width: 100%;\n  min-height: 2.75rem;\n  padding: 0.65rem 0.85rem 0.65rem 2.35rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  font-size: 0.875rem;\n  color: #334155;\n  background: #fff;\n}\n.receivable-search__input:focus {\n  outline: none;\n  border-color: #a5b4fc;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);\n}\n.receivable-table-wrap {\n  background: #fff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.row-link {\n  border: none;\n  background: transparent;\n  color: #1e293b;\n  font-size: 0.875rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0;\n  text-align: left;\n}\n.row-link:hover {\n  color: #4f46e5;\n}\n/*# sourceMappingURL=accounts-receivable-tab.component.css.map */\n"] }]
  }], () => [{ type: AccountingService }, { type: MatDialog }, { type: TaxCalculatorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }], billingBranchId: [{
    type: Input
  }], reloadToken: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountsReceivableTabComponent, { className: "AccountsReceivableTabComponent", filePath: "src/app/features/accounting/components/accounts-receivable-tab/accounts-receivable-tab.component.ts", lineNumber: 20 });
})();

// src/app/features/accounting/pages/accounting-page/accounting-page.component.ts
var _forTrack04 = ($index, $item) => $item.id;
function AccountingPageComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-report-period-selector", 13);
    \u0275\u0275listener("periodChange", function AccountingPageComponent_Conditional_8_Template_app_report_period_selector_periodChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPeriodChange($event));
    })("rangeChange", function AccountingPageComponent_Conditional_8_Template_app_report_period_selector_rangeChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onRangeChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("period", ctx_r1.period())("dateFrom", ctx_r1.dateFrom())("dateTo", ctx_r1.dateTo())("includeYear", false);
  }
}
function AccountingPageComponent_Conditional_9_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function AccountingPageComponent_Conditional_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 18);
    \u0275\u0275text(1, "Todas las sucursales");
    \u0275\u0275elementEnd();
  }
}
function AccountingPageComponent_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 19);
    \u0275\u0275text(1, "Selecciona sucursal");
    \u0275\u0275elementEnd();
  }
}
function AccountingPageComponent_Conditional_9_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", b_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.branchLabel(b_r4));
  }
}
function AccountingPageComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 14)(2, "label", 15);
    \u0275\u0275text(3, " Sucursal ");
    \u0275\u0275conditionalCreate(4, AccountingPageComponent_Conditional_9_Conditional_4_Template, 2, 0, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 17);
    \u0275\u0275listener("ngModelChange", function AccountingPageComponent_Conditional_9_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.billingBranchId.set($event);
      return \u0275\u0275resetView(ctx_r1.onBranchChange());
    });
    \u0275\u0275conditionalCreate(6, AccountingPageComponent_Conditional_9_Conditional_6_Template, 2, 0, "option", 18)(7, AccountingPageComponent_Conditional_9_Conditional_7_Template, 2, 0, "option", 19);
    \u0275\u0275repeaterCreate(8, AccountingPageComponent_Conditional_9_For_9_Template, 2, 2, "option", 20, _forTrack04);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.branchRequired() ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.billingBranchId());
    \u0275\u0275attribute("aria-required", ctx_r1.branchRequired());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.branchOptional() ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.branches);
  }
}
function AccountingPageComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function AccountingPageComponent_For_12_Template_button_click_0_listener() {
      const tab_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTabChange(tab_r6.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("accounting-tabs__btn--active", ctx_r1.activeTab() === tab_r6.id);
    \u0275\u0275attribute("aria-selected", ctx_r1.activeTab() === tab_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r6.label, " ");
  }
}
function AccountingPageComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-pos-summary-tab", 10);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("billingBranchId", ctx_r1.billingBranchId())("period", ctx_r1.period())("dateFrom", ctx_r1.dateFrom())("dateTo", ctx_r1.dateTo())("reloadToken", ctx_r1.reloadToken());
  }
}
function AccountingPageComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-accounts-payable-tab", 11);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("reloadToken", ctx_r1.reloadToken());
  }
}
function AccountingPageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-accounts-receivable-tab", 12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("billingBranchId", ctx_r1.billingBranchId() || void 0)("reloadToken", ctx_r1.reloadToken());
  }
}
var AccountingPageComponent = class _AccountingPageComponent {
  branchService;
  posTab;
  payableTab;
  receivableTab;
  activeTab = signal("pos", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  period = signal("month", ...ngDevMode ? [{ debugName: "period" }] : []);
  dateFrom = signal("", ...ngDevMode ? [{ debugName: "dateFrom" }] : []);
  dateTo = signal("", ...ngDevMode ? [{ debugName: "dateTo" }] : []);
  billingBranchId = signal("", ...ngDevMode ? [{ debugName: "billingBranchId" }] : []);
  reloadToken = signal(0, ...ngDevMode ? [{ debugName: "reloadToken" }] : []);
  branches = [];
  tabs = [
    { id: "pos", label: "Puntos de venta" },
    { id: "payable", label: "Cuentas por pagar" },
    { id: "receivable", label: "Cuentas por cobrar" }
  ];
  constructor(branchService) {
    this.branchService = branchService;
  }
  ngOnInit() {
    this.loadBranches();
  }
  showPeriodFilters() {
    return this.activeTab() !== "payable";
  }
  branchRequired() {
    return this.activeTab() === "pos";
  }
  branchOptional() {
    return this.activeTab() === "receivable";
  }
  onTabChange(tab) {
    this.activeTab.set(tab);
    this.reloadActiveTab();
  }
  onPeriodChange(preset) {
    if (preset === "year") {
      return;
    }
    this.period.set(preset);
    if (preset === "range") {
      return;
    }
    this.reloadActiveTab();
  }
  onRangeChange(range) {
    this.dateFrom.set(range.dateFrom);
    this.dateTo.set(range.dateTo);
    this.period.set("range");
    this.reloadActiveTab();
  }
  onBranchChange() {
    this.reloadActiveTab();
  }
  branchLabel(b) {
    return b.display_name?.trim() || `${b.city} (${b.code})`;
  }
  loadBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        this.branches = branches ?? [];
        if (this.branches.length === 1 && !this.billingBranchId()) {
          this.billingBranchId.set(this.branches[0].id);
          this.reloadActiveTab();
        }
      },
      error: () => {
        this.branches = [];
      }
    });
  }
  reloadActiveTab() {
    this.reloadToken.update((v) => v + 1);
  }
  static \u0275fac = function AccountingPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountingPageComponent)(\u0275\u0275directiveInject(BranchService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountingPageComponent, selectors: [["app-accounting-page"]], viewQuery: function AccountingPageComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(PosSummaryTabComponent, 5)(AccountsPayableTabComponent, 5)(AccountsReceivableTabComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.posTab = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.payableTab = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.receivableTab = _t.first);
    }
  }, decls: 17, vars: 5, consts: [[1, "accounting-page"], [1, "accounting-content"], [1, "accounting-header"], [1, "accounting-title"], [1, "accounting-subtitle"], ["dateFromId", "accounting-date-from", "dateToId", "accounting-date-to", "ariaLabel", "Periodo contable", 3, "period", "dateFrom", "dateTo", "includeYear"], [1, "accounting-filters"], ["role", "tablist", "aria-label", "Secciones de contabilidad", 1, "accounting-tabs"], ["type", "button", "role", "tab", 1, "accounting-tabs__btn", 3, "accounting-tabs__btn--active"], ["role", "tabpanel", 1, "accounting-tab-panel"], [3, "billingBranchId", "period", "dateFrom", "dateTo", "reloadToken"], [3, "reloadToken"], [3, "billingBranchId", "reloadToken"], ["dateFromId", "accounting-date-from", "dateToId", "accounting-date-to", "ariaLabel", "Periodo contable", 3, "periodChange", "rangeChange", "period", "dateFrom", "dateTo", "includeYear"], [1, "accounting-filters__field"], ["for", "accounting-branch", 1, "accounting-filters__label"], [1, "accounting-filters__required"], ["id", "accounting-branch", 1, "accounting-filters__select", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "", "disabled", ""], [3, "value"], ["type", "button", "role", "tab", 1, "accounting-tabs__btn", 3, "click"]], template: function AccountingPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h2", 3);
      \u0275\u0275text(5, "Cobranza / Contabilidad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Resumen POS, cuentas por pagar y cuentas por cobrar");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(8, AccountingPageComponent_Conditional_8_Template, 1, 4, "app-report-period-selector", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, AccountingPageComponent_Conditional_9_Template, 10, 4, "div", 6);
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275repeaterCreate(11, AccountingPageComponent_For_12_Template, 2, 4, "button", 8, _forTrack04);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 9);
      \u0275\u0275conditionalCreate(14, AccountingPageComponent_Conditional_14_Template, 1, 5, "app-pos-summary-tab", 10);
      \u0275\u0275conditionalCreate(15, AccountingPageComponent_Conditional_15_Template, 1, 1, "app-accounts-payable-tab", 11);
      \u0275\u0275conditionalCreate(16, AccountingPageComponent_Conditional_16_Template, 1, 2, "app-accounts-receivable-tab", 12);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.showPeriodFilters() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showPeriodFilters() ? 9 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.tabs);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.activeTab() === "pos" ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "payable" ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "receivable" ? 16 : -1);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    ReportPeriodSelectorComponent,
    PosSummaryTabComponent,
    AccountsPayableTabComponent,
    AccountsReceivableTabComponent
  ], styles: [`

[_nghost-%COMP%] {
  display: block;
  height: 100%;
}
.accounting-page[_ngcontent-%COMP%] {
  min-height: 100%;
}
.accounting-content[_ngcontent-%COMP%] {
  padding: 0 1rem 2rem;
}
.accounting-header[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  margin-bottom: 1.25rem;
}
.accounting-title[_ngcontent-%COMP%] {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}
.accounting-subtitle[_ngcontent-%COMP%] {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #64748b;
}
.accounting-filters[_ngcontent-%COMP%] {
  margin-bottom: 1.25rem;
  max-width: 22rem;
}
.accounting-filters__field[_ngcontent-%COMP%] {
  min-width: 0;
}
.accounting-filters__label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #64748b;
  margin-bottom: 0.35rem;
}
.accounting-filters__required[_ngcontent-%COMP%] {
  color: #dc2626;
}
.accounting-filters__select[_ngcontent-%COMP%] {
  width: 100%;
  min-height: 2.5rem;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #334155;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.65rem center;
  background-size: 16px;
}
.accounting-tabs[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}
.accounting-tabs__btn[_ngcontent-%COMP%] {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.55rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}
.accounting-tabs__btn[_ngcontent-%COMP%]:hover:not(.accounting-tabs__btn--active) {
  background: #f8fafc;
  border-color: #cbd5e1;
}
.accounting-tabs__btn--active[_ngcontent-%COMP%] {
  background: #eef2ff;
  border-color: #a5b4fc;
  color: #4338ca;
}
.accounting-tab-panel[_ngcontent-%COMP%] {
  min-height: 12rem;
}
@media (max-width: 640px) {
  .accounting-header[_ngcontent-%COMP%] {
    flex-direction: column;
  }
}
/*# sourceMappingURL=accounting-page.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountingPageComponent, [{
    type: Component,
    args: [{ selector: "app-accounting-page", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReportPeriodSelectorComponent,
      PosSummaryTabComponent,
      AccountsPayableTabComponent,
      AccountsReceivableTabComponent
    ], template: `<div class="accounting-page">\r
  <div class="accounting-content">\r
    <div class="accounting-header">\r
      <div>\r
        <h2 class="accounting-title">Cobranza / Contabilidad</h2>\r
        <p class="accounting-subtitle">Resumen POS, cuentas por pagar y cuentas por cobrar</p>\r
      </div>\r
\r
      @if (showPeriodFilters()) {\r
        <app-report-period-selector\r
          [period]="period()"\r
          [dateFrom]="dateFrom()"\r
          [dateTo]="dateTo()"\r
          [includeYear]="false"\r
          dateFromId="accounting-date-from"\r
          dateToId="accounting-date-to"\r
          ariaLabel="Periodo contable"\r
          (periodChange)="onPeriodChange($event)"\r
          (rangeChange)="onRangeChange($event)" />\r
      }\r
    </div>\r
\r
    @if (showPeriodFilters()) {\r
      <div class="accounting-filters">\r
        <div class="accounting-filters__field">\r
          <label class="accounting-filters__label" for="accounting-branch">\r
            Sucursal\r
            @if (branchRequired()) {\r
              <span class="accounting-filters__required">*</span>\r
            }\r
          </label>\r
          <select\r
            id="accounting-branch"\r
            class="accounting-filters__select"\r
            [ngModel]="billingBranchId()"\r
            (ngModelChange)="billingBranchId.set($event); onBranchChange()"\r
            [attr.aria-required]="branchRequired()">\r
            @if (branchOptional()) {\r
              <option value="">Todas las sucursales</option>\r
            } @else {\r
              <option value="" disabled>Selecciona sucursal</option>\r
            }\r
            @for (b of branches; track b.id) {\r
              <option [value]="b.id">{{ branchLabel(b) }}</option>\r
            }\r
          </select>\r
        </div>\r
      </div>\r
    }\r
\r
    <div class="accounting-tabs" role="tablist" aria-label="Secciones de contabilidad">\r
      @for (tab of tabs; track tab.id) {\r
        <button\r
          type="button"\r
          class="accounting-tabs__btn"\r
          role="tab"\r
          [class.accounting-tabs__btn--active]="activeTab() === tab.id"\r
          [attr.aria-selected]="activeTab() === tab.id"\r
          (click)="onTabChange(tab.id)">\r
          {{ tab.label }}\r
        </button>\r
      }\r
    </div>\r
\r
    <div class="accounting-tab-panel" role="tabpanel">\r
      @if (activeTab() === 'pos') {\r
        <app-pos-summary-tab\r
          [billingBranchId]="billingBranchId()"\r
          [period]="period()"\r
          [dateFrom]="dateFrom()"\r
          [dateTo]="dateTo()"\r
          [reloadToken]="reloadToken()" />\r
      }\r
\r
      @if (activeTab() === 'payable') {\r
        <app-accounts-payable-tab [reloadToken]="reloadToken()" />\r
      }\r
\r
      @if (activeTab() === 'receivable') {\r
        <app-accounts-receivable-tab\r
          [billingBranchId]="billingBranchId() || undefined"\r
          [reloadToken]="reloadToken()" />\r
      }\r
    </div>\r
  </div>\r
</div>\r
`, styles: [`/* src/app/features/accounting/pages/accounting-page/accounting-page.component.scss */
:host {
  display: block;
  height: 100%;
}
.accounting-page {
  min-height: 100%;
}
.accounting-content {
  padding: 0 1rem 2rem;
}
.accounting-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem 1.5rem;
  margin-bottom: 1.25rem;
}
.accounting-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}
.accounting-subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #64748b;
}
.accounting-filters {
  margin-bottom: 1.25rem;
  max-width: 22rem;
}
.accounting-filters__field {
  min-width: 0;
}
.accounting-filters__label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #64748b;
  margin-bottom: 0.35rem;
}
.accounting-filters__required {
  color: #dc2626;
}
.accounting-filters__select {
  width: 100%;
  min-height: 2.5rem;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #334155;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.65rem center;
  background-size: 16px;
}
.accounting-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}
.accounting-tabs__btn {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.55rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}
.accounting-tabs__btn:hover:not(.accounting-tabs__btn--active) {
  background: #f8fafc;
  border-color: #cbd5e1;
}
.accounting-tabs__btn--active {
  background: #eef2ff;
  border-color: #a5b4fc;
  color: #4338ca;
}
.accounting-tab-panel {
  min-height: 12rem;
}
@media (max-width: 640px) {
  .accounting-header {
    flex-direction: column;
  }
}
/*# sourceMappingURL=accounting-page.component.css.map */
`] }]
  }], () => [{ type: BranchService }], { posTab: [{
    type: ViewChild,
    args: [PosSummaryTabComponent]
  }], payableTab: [{
    type: ViewChild,
    args: [AccountsPayableTabComponent]
  }], receivableTab: [{
    type: ViewChild,
    args: [AccountsReceivableTabComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountingPageComponent, { className: "AccountingPageComponent", filePath: "src/app/features/accounting/pages/accounting-page/accounting-page.component.ts", lineNumber: 28 });
})();
export {
  AccountingPageComponent
};
//# sourceMappingURL=chunk-VZBXCQO3.js.map
