import {
  SearchComponent
} from "./chunk-B3LR2PTH.js";
import {
  DatatableWrapperComponent
} from "./chunk-QW7YUBWU.js";
import {
  LeadEditDialog,
  LeadService
} from "./chunk-6NZ5SRD5.js";
import {
  PhoneComponent,
  TagModule
} from "./chunk-RBESK2KT.js";
import {
  BaseComponent,
  BindModule,
  ButtonDirective,
  ButtonModule,
  ConnectedOverlayScrollHandler,
  PARENT_INSTANCE,
  s
} from "./chunk-LYQXEO3O.js";
import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import {
  $,
  BaseStyle,
  C,
  Gt,
  R,
  U,
  h,
  ht,
  k,
  ut,
  v,
  z
} from "./chunk-X6ESXIRL.js";
import "./chunk-K22JBEUE.js";
import "./chunk-Y4MZBWJH.js";
import "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import "./chunk-OC6N764R.js";
import {
  AtSign,
  LucideAngularComponent,
  LucideAngularModule,
  Send,
  SquareCheckBig
} from "./chunk-XYBC4MWB.js";
import "./chunk-KNFYVOET.js";
import {
  MatDialog
} from "./chunk-OO2OLRGJ.js";
import {
  FormsModule
} from "./chunk-TXPVZZCM.js";
import "./chunk-2BSLK6RD.js";
import {
  ActivatedRoute,
  HttpClient,
  Router,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-GZH4LDOW.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Observable,
  Output,
  Subject,
  ViewChild,
  ViewContainerRef,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  catchError,
  computed,
  effect,
  inject,
  input,
  map,
  numberAttribute,
  retry,
  setClassMetadata,
  signal,
  takeUntil,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
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
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

// src/app/features/leads/components/leads-stats/leads-stats.component.ts
var _c0 = (a0) => ({ active: a0 });
function LeadsStatsComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275listener("click", function LeadsStatsComponent_div_2_Template_div_click_0_listener() {
      const stat_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCardClick(stat_r2.filter));
    });
    \u0275\u0275elementStart(1, "div", 4)(2, "div", 5);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 6)(5, "p", 7);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(9, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const stat_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(5, _c0, ctx_r2.isActive(stat_r2.filter)));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r2.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(stat_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r2.value);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "gradient-" + stat_r2.gradient);
  }
}
var LeadsStatsComponent = class _LeadsStatsComponent {
  leadsService;
  cdr;
  activeFilter = null;
  filterChange = new EventEmitter();
  stats = [];
  loading = false;
  constructor(leadsService, cdr) {
    this.leadsService = leadsService;
    this.cdr = cdr;
  }
  ngOnInit() {
    this.loadStats();
  }
  loadStats() {
    this.loading = true;
    this.cdr.markForCheck();
    this.leadsService.getLeadsStats().subscribe({
      next: (data) => {
        this.stats = [
          {
            title: "Total de Leads",
            value: data.total_leads,
            icon: "\u{1F4CA}",
            gradient: "from-blue-500 to-blue-600",
            filter: null
          },
          {
            title: "No Contactados",
            value: data.not_contacted,
            icon: "\u{1F4E7}",
            gradient: "from-gray-500 to-gray-600",
            filter: "not_contacted"
          },
          {
            title: "Contactados",
            value: data.customer_responded_no_reply,
            icon: "\u23F3",
            gradient: "from-orange-500 to-orange-600",
            filter: "contacted_no_response"
          },
          {
            title: "Cliente Respondi\xF3",
            value: data.customer_responded,
            icon: "\u2705",
            gradient: "from-green-500 to-green-600",
            filter: "customer_responded"
          }
        ];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
  onCardClick(filter) {
    this.filterChange.emit(filter);
  }
  isActive(filter) {
    return this.activeFilter === filter;
  }
  static \u0275fac = function LeadsStatsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeadsStatsComponent)(\u0275\u0275directiveInject(LeadService), \u0275\u0275directiveInject(ChangeDetectorRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeadsStatsComponent, selectors: [["app-leads-stats"]], inputs: { activeFilter: "activeFilter" }, outputs: { filterChange: "filterChange" }, decls: 3, vars: 1, consts: [[1, "stats-container"], [1, "stats-grid"], ["class", "stat-card", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "stat-card", 3, "click", "ngClass"], [1, "card-content"], [1, "icon"], [1, "info"], [1, "title"], [1, "value"], [3, "ngClass"]], template: function LeadsStatsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275template(2, LeadsStatsComponent_div_2_Template, 10, 7, "div", 2);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.stats);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf], styles: ["\n\n.stats-container[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  position: relative;\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card.active[_ngcontent-%COMP%] {\n  border-color: #6366f1;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  min-width: 48px;\n  text-align: center;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 13px;\n  color: #6b7280;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  margin: 4px 0 0 0;\n  font-size: 28px;\n  font-weight: 700;\n  color: #1f2937;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .gradient-from-blue-500[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1),\n      rgba(37, 99, 235, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .gradient-from-purple-500[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.1),\n      rgba(147, 51, 234, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .gradient-from-green-500[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.1),\n      rgba(22, 163, 74, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .gradient-from-orange-500[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(249, 115, 22, 0.1),\n      rgba(234, 88, 12, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .gradient-from-teal-500[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(20, 184, 166, 0.1),\n      rgba(13, 148, 136, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .gradient-from-gray-500[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(107, 114, 128, 0.1),\n      rgba(75, 85, 99, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n@media (max-width: 1024px) {\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 14px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {\n    gap: 14px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n    font-size: 28px;\n    min-width: 44px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n}\n@media (max-width: 640px) {\n  .stats-container[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 10px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%] {\n    gap: 10px;\n    flex-direction: column;\n    text-align: center;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n    font-size: 24px;\n    min-width: auto;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .stats-container[_ngcontent-%COMP%]   .stats-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .card-content[_ngcontent-%COMP%]   .info[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n/*# sourceMappingURL=leads-stats.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeadsStatsComponent, [{
    type: Component,
    args: [{ selector: "app-leads-stats", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="stats-container">\r
  <div class="stats-grid">\r
    <div\r
      *ngFor="let stat of stats"\r
      class="stat-card"\r
      [ngClass]="{ active: isActive(stat.filter) }"\r
      (click)="onCardClick(stat.filter)"\r
    >\r
      <div class="card-content">\r
        <div class="icon">{{ stat.icon }}</div>\r
        <div class="info">\r
          <p class="title">{{ stat.title }}</p>\r
          <p class="value">{{ stat.value }}</p>\r
        </div>\r
      </div>\r
      <div [ngClass]="'gradient-' + stat.gradient"></div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/leads/components/leads-stats/leads-stats.component.scss */\n.stats-container {\n  margin-bottom: 24px;\n}\n.stats-container .stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.stats-container .stats-grid .stat-card {\n  position: relative;\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.stats-container .stats-grid .stat-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);\n}\n.stats-container .stats-grid .stat-card.active {\n  border-color: #6366f1;\n  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);\n}\n.stats-container .stats-grid .stat-card .card-content {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.stats-container .stats-grid .stat-card .card-content .icon {\n  font-size: 32px;\n  min-width: 48px;\n  text-align: center;\n}\n.stats-container .stats-grid .stat-card .card-content .info {\n  flex: 1;\n  min-width: 0;\n}\n.stats-container .stats-grid .stat-card .card-content .info .title {\n  margin: 0;\n  font-size: 13px;\n  color: #6b7280;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.stats-container .stats-grid .stat-card .card-content .info .value {\n  margin: 4px 0 0 0;\n  font-size: 28px;\n  font-weight: 700;\n  color: #1f2937;\n}\n.stats-container .stats-grid .stat-card .gradient-from-blue-500 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(59, 130, 246, 0.1),\n      rgba(37, 99, 235, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container .stats-grid .stat-card .gradient-from-purple-500 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(168, 85, 247, 0.1),\n      rgba(147, 51, 234, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container .stats-grid .stat-card .gradient-from-green-500 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(34, 197, 94, 0.1),\n      rgba(22, 163, 74, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container .stats-grid .stat-card .gradient-from-orange-500 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(249, 115, 22, 0.1),\n      rgba(234, 88, 12, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container .stats-grid .stat-card .gradient-from-teal-500 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(20, 184, 166, 0.1),\n      rgba(13, 148, 136, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n.stats-container .stats-grid .stat-card .gradient-from-gray-500 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100px;\n  height: 100px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(107, 114, 128, 0.1),\n      rgba(75, 85, 99, 0.05));\n  border-radius: 50%;\n  z-index: 1;\n}\n@media (max-width: 1024px) {\n  .stats-container .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 14px;\n  }\n  .stats-container .stats-grid .stat-card {\n    padding: 18px;\n  }\n  .stats-container .stats-grid .stat-card .card-content {\n    gap: 14px;\n  }\n  .stats-container .stats-grid .stat-card .card-content .icon {\n    font-size: 28px;\n    min-width: 44px;\n  }\n  .stats-container .stats-grid .stat-card .card-content .info .title {\n    font-size: 12px;\n  }\n  .stats-container .stats-grid .stat-card .card-content .info .value {\n    font-size: 24px;\n  }\n}\n@media (max-width: 640px) {\n  .stats-container {\n    margin-bottom: 16px;\n  }\n  .stats-container .stats-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 10px;\n  }\n  .stats-container .stats-grid .stat-card {\n    padding: 14px;\n  }\n  .stats-container .stats-grid .stat-card .card-content {\n    gap: 10px;\n    flex-direction: column;\n    text-align: center;\n  }\n  .stats-container .stats-grid .stat-card .card-content .icon {\n    font-size: 24px;\n    min-width: auto;\n  }\n  .stats-container .stats-grid .stat-card .card-content .info .title {\n    font-size: 11px;\n  }\n  .stats-container .stats-grid .stat-card .card-content .info .value {\n    font-size: 20px;\n  }\n}\n/*# sourceMappingURL=leads-stats.component.css.map */\n"] }]
  }], () => [{ type: LeadService }, { type: ChangeDetectorRef }], { activeFilter: [{
    type: Input
  }], filterChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeadsStatsComponent, { className: "LeadsStatsComponent", filePath: "src/app/features/leads/components/leads-stats/leads-stats.component.ts", lineNumber: 22 });
})();

// node_modules/primeng/fesm2022/primeng-utils.mjs
function ZIndexUtils() {
  let zIndexes = [];
  const generateZIndex = (key, baseZIndex) => {
    let lastZIndex = zIndexes.length > 0 ? zIndexes[zIndexes.length - 1] : { key, value: baseZIndex };
    let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 2;
    zIndexes.push({ key, value: newZIndex });
    return newZIndex;
  };
  const revertZIndex = (zIndex) => {
    zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
  };
  const getCurrentZIndex = () => {
    return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
  };
  const getZIndex = (el) => {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: (key, el, baseZIndex) => {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, baseZIndex));
      }
    },
    clear: (el) => {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: () => getCurrentZIndex(),
    generateZIndex,
    revertZIndex
  };
}
var zindexutils = ZIndexUtils();

// node_modules/@primeuix/styles/dist/tooltip/index.mjs
var style = "\n    .p-tooltip {\n        position: absolute;\n        display: none;\n        max-width: dt('tooltip.max.width');\n    }\n\n    .p-tooltip-right,\n    .p-tooltip-left {\n        padding: 0 dt('tooltip.gutter');\n    }\n\n    .p-tooltip-top,\n    .p-tooltip-bottom {\n        padding: dt('tooltip.gutter') 0;\n    }\n\n    .p-tooltip-text {\n        white-space: pre-line;\n        word-break: break-word;\n        background: dt('tooltip.background');\n        color: dt('tooltip.color');\n        padding: dt('tooltip.padding');\n        box-shadow: dt('tooltip.shadow');\n        border-radius: dt('tooltip.border.radius');\n    }\n\n    .p-tooltip-arrow {\n        position: absolute;\n        width: 0;\n        height: 0;\n        border-color: transparent;\n        border-style: solid;\n    }\n\n    .p-tooltip-right .p-tooltip-arrow {\n        margin-top: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter') 0;\n        border-right-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-left .p-tooltip-arrow {\n        margin-top: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') 0 dt('tooltip.gutter') dt('tooltip.gutter');\n        border-left-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-top .p-tooltip-arrow {\n        margin-left: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') dt('tooltip.gutter') 0 dt('tooltip.gutter');\n        border-top-color: dt('tooltip.background');\n        border-bottom-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-bottom .p-tooltip-arrow {\n        margin-left: calc(-1 * dt('tooltip.gutter'));\n        border-width: 0 dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter');\n        border-top-color: dt('tooltip.background');\n        border-bottom-color: dt('tooltip.background');\n    }\n";

// node_modules/primeng/fesm2022/primeng-tooltip.mjs
var classes = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
};
var TooltipStyle = class _TooltipStyle extends BaseStyle {
  name = "tooltip";
  style = style;
  classes = classes;
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275TooltipStyle_BaseFactory;
    return function TooltipStyle_Factory(__ngFactoryType__) {
      return (\u0275TooltipStyle_BaseFactory || (\u0275TooltipStyle_BaseFactory = \u0275\u0275getInheritedFactory(_TooltipStyle)))(__ngFactoryType__ || _TooltipStyle);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TooltipStyle,
    factory: _TooltipStyle.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipStyle, [{
    type: Injectable
  }], null, null);
})();
var TooltipClasses;
(function(TooltipClasses2) {
  TooltipClasses2["root"] = "p-tooltip";
  TooltipClasses2["arrow"] = "p-tooltip-arrow";
  TooltipClasses2["text"] = "p-tooltip-text";
})(TooltipClasses || (TooltipClasses = {}));
var TOOLTIP_INSTANCE = new InjectionToken("TOOLTIP_INSTANCE");
var Tooltip = class _Tooltip extends BaseComponent {
  zone;
  viewContainer;
  componentName = "Tooltip";
  $pcTooltip = inject(TOOLTIP_INSTANCE, {
    optional: true,
    skipSelf: true
  }) ?? void 0;
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition;
  /**
   * Event to show the tooltip.
   * @group Props
   */
  tooltipEvent = "hover";
  /**
   * Type of CSS position.
   * @group Props
   */
  positionStyle;
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass;
  /**
   * Whether the z-index should be managed automatically to always go on top or have a fixed value.
   * @group Props
   */
  tooltipZIndex;
  /**
   * By default the tooltip contents are rendered as text. Set to false to support html tags in the content.
   * @group Props
   */
  escape = true;
  /**
   * Delay to show the tooltip in milliseconds.
   * @group Props
   */
  showDelay;
  /**
   * Delay to hide the tooltip in milliseconds.
   * @group Props
   */
  hideDelay;
  /**
   * Time to wait in milliseconds to hide the tooltip even it is active.
   * @group Props
   */
  life;
  /**
   * Specifies the additional vertical offset of the tooltip from its default position.
   * @group Props
   */
  positionTop;
  /**
   * Specifies the additional horizontal offset of the tooltip from its default position.
   * @group Props
   */
  positionLeft;
  /**
   * Whether to hide tooltip when hovering over tooltip content.
   * @group Props
   */
  autoHide = true;
  /**
   * Automatically adjusts the element position when there is not enough space on the selected position.
   * @group Props
   */
  fitContent = true;
  /**
   * Whether to hide tooltip on escape key press.
   * @group Props
   */
  hideOnEscape = true;
  /**
   * Whether to show the tooltip only when the target text overflows (e.g., ellipsis is active).
   * @group Props
   */
  showOnEllipsis = false;
  /**
   * Content of the tooltip.
   * @group Props
   */
  content;
  /**
   * When present, it specifies that the component should be disabled.
   * @defaultValue false
   * @group Props
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(val) {
    this._disabled = val;
    this.deactivate();
  }
  /**
   * Specifies the tooltip configuration options for the component.
   * @group Props
   */
  tooltipOptions;
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @defaultValue 'self'
   * @group Props
   */
  appendTo = input(void 0, ...ngDevMode ? [{
    debugName: "appendTo"
  }] : (
    /* istanbul ignore next */
    []
  ));
  $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{
    debugName: "$appendTo"
  }] : (
    /* istanbul ignore next */
    []
  ));
  _tooltipOptions = {
    tooltipLabel: null,
    tooltipPosition: "right",
    tooltipEvent: "hover",
    appendTo: "body",
    positionStyle: null,
    tooltipStyleClass: null,
    tooltipZIndex: "auto",
    escape: true,
    disabled: null,
    showDelay: null,
    hideDelay: null,
    positionTop: null,
    positionLeft: null,
    life: null,
    autoHide: true,
    hideOnEscape: true,
    showOnEllipsis: false,
    id: s("pn_id_") + "_tooltip"
  };
  _disabled;
  container;
  styleClass;
  tooltipText;
  rootPTClasses = "";
  showTimeout;
  hideTimeout;
  active;
  mouseEnterListener;
  mouseLeaveListener;
  containerMouseleaveListener;
  clickListener;
  focusListener;
  blurListener;
  touchStartListener;
  touchEndListener;
  documentTouchListener;
  documentEscapeListener;
  scrollHandler;
  resizeListener;
  _componentStyle = inject(TooltipStyle);
  interactionInProgress = false;
  /**
   * Used to pass attributes to DOM elements inside the Tooltip component.
   * @defaultValue undefined
   * @deprecated use pTooltipPT instead.
   * @group Props
   */
  ptTooltip = input(...ngDevMode ? [void 0, {
    debugName: "ptTooltip"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Used to pass attributes to DOM elements inside the Tooltip component.
   * @defaultValue undefined
   * @group Props
   */
  pTooltipPT = input(...ngDevMode ? [void 0, {
    debugName: "pTooltipPT"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Indicates whether the component should be rendered without styles.
   * @defaultValue undefined
   * @group Props
   */
  pTooltipUnstyled = input(...ngDevMode ? [void 0, {
    debugName: "pTooltipUnstyled"
  }] : (
    /* istanbul ignore next */
    []
  ));
  constructor(zone, viewContainer) {
    super();
    this.zone = zone;
    this.viewContainer = viewContainer;
    effect(() => {
      const pt = this.ptTooltip() || this.pTooltipPT();
      pt && this.directivePT.set(pt);
    });
    effect(() => {
      this.pTooltipUnstyled() && this.directiveUnstyled.set(this.pTooltipUnstyled());
    });
  }
  onAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        const tooltipEvent = this.getOption("tooltipEvent");
        if (tooltipEvent === "hover" || tooltipEvent === "both") {
          this.mouseEnterListener = this.onMouseEnter.bind(this);
          this.mouseLeaveListener = this.onMouseLeave.bind(this);
          this.clickListener = this.onInputClick.bind(this);
          this.el.nativeElement.addEventListener("mouseenter", this.mouseEnterListener);
          this.el.nativeElement.addEventListener("click", this.clickListener);
          this.el.nativeElement.addEventListener("mouseleave", this.mouseLeaveListener);
          this.touchStartListener = this.onTouchStart.bind(this);
          this.touchEndListener = this.onTouchEnd.bind(this);
          this.el.nativeElement.addEventListener("touchstart", this.touchStartListener, {
            passive: true
          });
          this.el.nativeElement.addEventListener("touchend", this.touchEndListener, {
            passive: true
          });
        }
        if (tooltipEvent === "focus" || tooltipEvent === "both") {
          this.focusListener = this.onFocus.bind(this);
          this.blurListener = this.onBlur.bind(this);
          let target = this.el.nativeElement.querySelector(".p-component");
          if (!target) {
            target = this.getTarget(this.el.nativeElement);
          }
          target.addEventListener("focus", this.focusListener);
          target.addEventListener("blur", this.blurListener);
        }
      });
    }
  }
  onChanges(simpleChange) {
    if (simpleChange.tooltipPosition) {
      this.setOption({
        tooltipPosition: simpleChange.tooltipPosition.currentValue
      });
    }
    if (simpleChange.tooltipEvent) {
      this.setOption({
        tooltipEvent: simpleChange.tooltipEvent.currentValue
      });
    }
    if (simpleChange.appendTo) {
      this.setOption({
        appendTo: simpleChange.appendTo.currentValue
      });
    }
    if (simpleChange.positionStyle) {
      this.setOption({
        positionStyle: simpleChange.positionStyle.currentValue
      });
    }
    if (simpleChange.tooltipStyleClass) {
      this.setOption({
        tooltipStyleClass: simpleChange.tooltipStyleClass.currentValue
      });
    }
    if (simpleChange.tooltipZIndex) {
      this.setOption({
        tooltipZIndex: simpleChange.tooltipZIndex.currentValue
      });
    }
    if (simpleChange.escape) {
      this.setOption({
        escape: simpleChange.escape.currentValue
      });
    }
    if (simpleChange.showDelay) {
      this.setOption({
        showDelay: simpleChange.showDelay.currentValue
      });
    }
    if (simpleChange.hideDelay) {
      this.setOption({
        hideDelay: simpleChange.hideDelay.currentValue
      });
    }
    if (simpleChange.life) {
      this.setOption({
        life: simpleChange.life.currentValue
      });
    }
    if (simpleChange.positionTop) {
      this.setOption({
        positionTop: simpleChange.positionTop.currentValue
      });
    }
    if (simpleChange.positionLeft) {
      this.setOption({
        positionLeft: simpleChange.positionLeft.currentValue
      });
    }
    if (simpleChange.disabled) {
      this.setOption({
        disabled: simpleChange.disabled.currentValue
      });
    }
    if (simpleChange.content) {
      this.setOption({
        tooltipLabel: simpleChange.content.currentValue
      });
      if (this.active) {
        if (simpleChange.content.currentValue) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
    if (simpleChange.autoHide) {
      this.setOption({
        autoHide: simpleChange.autoHide.currentValue
      });
    }
    if (simpleChange.showOnEllipsis) {
      this.setOption({
        showOnEllipsis: simpleChange.showOnEllipsis.currentValue
      });
    }
    if (simpleChange.id) {
      this.setOption({
        id: simpleChange.id.currentValue
      });
    }
    if (simpleChange.tooltipOptions) {
      this._tooltipOptions = __spreadValues(__spreadValues({}, this._tooltipOptions), simpleChange.tooltipOptions.currentValue);
      this.deactivate();
      if (this.active) {
        if (this.getOption("tooltipLabel")) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
  }
  isAutoHide() {
    return this.getOption("autoHide");
  }
  onMouseEnter(e) {
    if (!this.container && !this.showTimeout) {
      this.activate();
    }
  }
  onMouseLeave(e) {
    if (!this.isAutoHide()) {
      const valid = R(e.relatedTarget, "p-tooltip") || R(e.relatedTarget, "p-tooltip-text") || R(e.relatedTarget, "p-tooltip-arrow");
      !valid && this.deactivate();
    } else {
      this.deactivate();
    }
  }
  onTouchStart(e) {
    if (!this.container && !this.showTimeout) {
      this.activate();
      if (!this.isAutoHide()) {
        this.bindDocumentTouchListener();
      }
    }
  }
  onTouchEnd(e) {
    if (this.isAutoHide()) {
      this.deactivate();
    }
  }
  bindDocumentTouchListener() {
    if (!this.documentTouchListener) {
      this.documentTouchListener = this.renderer.listen("document", "touchstart", (e) => {
        if (this.container && !this.container.contains(e.target) && !this.el.nativeElement.contains(e.target)) {
          this.deactivate();
          this.unbindDocumentTouchListener();
        }
      });
    }
  }
  unbindDocumentTouchListener() {
    if (this.documentTouchListener) {
      this.documentTouchListener();
      this.documentTouchListener = null;
    }
  }
  onFocus(e) {
    this.activate();
  }
  onBlur(e) {
    this.deactivate();
  }
  onInputClick(e) {
    this.deactivate();
  }
  hasEllipsis() {
    const el = this.el.nativeElement;
    return el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight;
  }
  activate() {
    if (!this.interactionInProgress) {
      if (this.getOption("showOnEllipsis") && !this.hasEllipsis()) {
        return;
      }
      this.active = true;
      this.clearHideTimeout();
      if (this.getOption("showDelay")) this.showTimeout = setTimeout(() => {
        this.show();
      }, this.getOption("showDelay"));
      else this.show();
      if (this.getOption("life")) {
        let duration = this.getOption("showDelay") ? this.getOption("life") + this.getOption("showDelay") : this.getOption("life");
        this.hideTimeout = setTimeout(() => {
          this.hide();
        }, duration);
      }
      if (this.getOption("hideOnEscape")) {
        this.documentEscapeListener = this.renderer.listen("document", "keydown.escape", () => {
          this.deactivate();
          this.documentEscapeListener?.();
        });
      }
      this.interactionInProgress = true;
    }
  }
  deactivate() {
    this.interactionInProgress = false;
    this.active = false;
    this.clearShowTimeout();
    if (this.getOption("hideDelay")) {
      this.clearHideTimeout();
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, this.getOption("hideDelay"));
    } else {
      this.hide();
    }
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
    }
  }
  create() {
    if (this.container) {
      this.clearHideTimeout();
      this.remove();
    }
    this.container = U("div", {
      class: this.cx("root"),
      "p-bind": this.ptm("root"),
      "data-pc-section": "root"
    });
    this.container.setAttribute("role", "tooltip");
    let tooltipArrow = U("div", {
      class: this.cx("arrow"),
      "p-bind": this.ptm("arrow"),
      "data-pc-section": "arrow"
    });
    this.container.appendChild(tooltipArrow);
    this.tooltipText = U("div", {
      class: this.cx("text"),
      "p-bind": this.ptm("text"),
      "data-pc-section": "text"
    });
    this.updateText();
    if (this.getOption("positionStyle")) {
      this.container.style.position = this.getOption("positionStyle");
    }
    this.container.appendChild(this.tooltipText);
    if (this.getOption("appendTo") === "body") document.body.appendChild(this.container);
    else if (this.getOption("appendTo") === "target") ut(this.container, this.el.nativeElement);
    else ut(this.getOption("appendTo"), this.container);
    this.container.style.display = "none";
    if (this.fitContent) {
      this.container.style.width = "fit-content";
    }
    if (this.isAutoHide()) {
      this.container.style.pointerEvents = "none";
    } else {
      this.container.style.pointerEvents = "unset";
      this.bindContainerMouseleaveListener();
    }
  }
  bindContainerMouseleaveListener() {
    if (!this.containerMouseleaveListener) {
      const targetEl = this.container ?? this.container.nativeElement;
      this.containerMouseleaveListener = this.renderer.listen(targetEl, "mouseleave", (e) => {
        this.deactivate();
      });
    }
  }
  unbindContainerMouseleaveListener() {
    if (this.containerMouseleaveListener) {
      this.bindContainerMouseleaveListener();
      this.containerMouseleaveListener = null;
    }
  }
  show() {
    if (!this.getOption("tooltipLabel") || this.getOption("disabled")) {
      return;
    }
    this.create();
    const nativeElement = this.el.nativeElement;
    const pDialogWrapper = nativeElement.closest("p-dialog");
    if (pDialogWrapper) {
      setTimeout(() => {
        this.container && (this.container.style.display = "inline-block");
        this.container && this.align();
      }, 100);
    } else {
      this.container.style.display = "inline-block";
      this.align();
    }
    ht(this.container, 250);
    if (this.getOption("tooltipZIndex") === "auto") zindexutils.set("tooltip", this.container, this.config.zIndex.tooltip);
    else this.container.style.zIndex = this.getOption("tooltipZIndex");
    this.bindDocumentResizeListener();
    this.bindScrollListener();
  }
  hide() {
    if (this.getOption("tooltipZIndex") === "auto") {
      zindexutils.clear(this.container);
    }
    this.remove();
  }
  updateText() {
    const content = this.getOption("tooltipLabel");
    if (content && typeof content.createEmbeddedView === "function") {
      const embeddedViewRef = this.viewContainer.createEmbeddedView(content);
      embeddedViewRef.detectChanges();
      embeddedViewRef.rootNodes.forEach((node) => this.tooltipText.appendChild(node));
    } else if (this.getOption("escape")) {
      this.tooltipText.innerHTML = "";
      this.tooltipText.appendChild(document.createTextNode(content));
    } else {
      this.tooltipText.innerHTML = content;
    }
  }
  align() {
    const position = this.getOption("tooltipPosition");
    const positionPriority = {
      top: [this.alignTop, this.alignBottom, this.alignRight, this.alignLeft],
      bottom: [this.alignBottom, this.alignTop, this.alignRight, this.alignLeft],
      left: [this.alignLeft, this.alignRight, this.alignTop, this.alignBottom],
      right: [this.alignRight, this.alignLeft, this.alignTop, this.alignBottom]
    };
    const alignFns = positionPriority[position] || [];
    for (let [index, alignmentFn] of alignFns.entries()) {
      if (index === 0) alignmentFn.call(this);
      else if (this.isOutOfBounds()) alignmentFn.call(this);
      else break;
    }
  }
  getHostOffset() {
    if (this.getOption("appendTo") === "body" || this.getOption("appendTo") === "target") {
      let offset = this.el.nativeElement.getBoundingClientRect();
      let targetLeft = offset.left + k();
      let targetTop = offset.top + $();
      return {
        left: targetLeft,
        top: targetTop
      };
    } else {
      return {
        left: 0,
        top: 0
      };
    }
  }
  get activeElement() {
    return this.el.nativeElement.nodeName.startsWith("P-") ? z(this.el.nativeElement, ".p-component") : this.el.nativeElement;
  }
  alignRight() {
    this.preAlign("right");
    const el = this.activeElement;
    const offsetLeft = v(el);
    const offsetTop = (C(el) - C(this.container)) / 2;
    this.alignTooltip(offsetLeft, offsetTop);
    let arrowElement = this.getArrowElement();
    arrowElement.style.top = "50%";
    arrowElement.style.right = null;
    arrowElement.style.bottom = null;
    arrowElement.style.left = "0";
  }
  alignLeft() {
    this.preAlign("left");
    let arrowElement = this.getArrowElement();
    let offsetLeft = v(this.container);
    let offsetTop = (C(this.el.nativeElement) - C(this.container)) / 2;
    this.alignTooltip(-offsetLeft, offsetTop);
    arrowElement.style.top = "50%";
    arrowElement.style.right = "0";
    arrowElement.style.bottom = null;
    arrowElement.style.left = null;
  }
  alignTop() {
    this.preAlign("top");
    let arrowElement = this.getArrowElement();
    let hostOffset = this.getHostOffset();
    let elementWidth = v(this.container);
    let offsetLeft = (v(this.el.nativeElement) - v(this.container)) / 2;
    let offsetTop = C(this.container);
    this.alignTooltip(offsetLeft, -offsetTop);
    let elementRelativeCenter = hostOffset.left - this.getHostOffset().left + elementWidth / 2;
    arrowElement.style.top = null;
    arrowElement.style.right = null;
    arrowElement.style.bottom = "0";
    arrowElement.style.left = elementRelativeCenter + "px";
  }
  getArrowElement() {
    return z(this.container, '[data-pc-section="arrow"]');
  }
  alignBottom() {
    this.preAlign("bottom");
    let arrowElement = this.getArrowElement();
    let elementWidth = v(this.container);
    let hostOffset = this.getHostOffset();
    let offsetLeft = (v(this.el.nativeElement) - v(this.container)) / 2;
    let offsetTop = C(this.el.nativeElement);
    this.alignTooltip(offsetLeft, offsetTop);
    let elementRelativeCenter = hostOffset.left - this.getHostOffset().left + elementWidth / 2;
    arrowElement.style.top = "0";
    arrowElement.style.right = null;
    arrowElement.style.bottom = null;
    arrowElement.style.left = elementRelativeCenter + "px";
  }
  alignTooltip(offsetLeft, offsetTop) {
    let hostOffset = this.getHostOffset();
    let left = hostOffset.left + offsetLeft;
    let top = hostOffset.top + offsetTop;
    this.container.style.left = left + this.getOption("positionLeft") + "px";
    this.container.style.top = top + this.getOption("positionTop") + "px";
  }
  setOption(option) {
    this._tooltipOptions = __spreadValues(__spreadValues({}, this._tooltipOptions), option);
  }
  getOption(option) {
    return this._tooltipOptions[option];
  }
  getTarget(el) {
    return R(el, "p-inputwrapper") ? z(el, "input") : el;
  }
  preAlign(position) {
    this.container.style.left = "-999px";
    this.container.style.top = "-999px";
    this.container.className = this.cn(this.cx("root"), this.ptm("root")?.class, "p-tooltip-" + position, this.getOption("tooltipStyleClass"));
  }
  isOutOfBounds() {
    let offset = this.container.getBoundingClientRect();
    let targetTop = offset.top;
    let targetLeft = offset.left;
    let width = v(this.container);
    let height = C(this.container);
    let viewport = h();
    return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
  }
  onWindowResize(e) {
    this.hide();
  }
  bindDocumentResizeListener() {
    this.zone.runOutsideAngular(() => {
      this.resizeListener = this.onWindowResize.bind(this);
      window.addEventListener("resize", this.resizeListener);
    });
  }
  unbindDocumentResizeListener() {
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener);
      this.resizeListener = null;
    }
  }
  bindScrollListener() {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
        if (this.container) {
          this.hide();
        }
      });
    }
    this.scrollHandler.bindScrollListener();
  }
  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }
  unbindEvents() {
    const tooltipEvent = this.getOption("tooltipEvent");
    if (tooltipEvent === "hover" || tooltipEvent === "both") {
      this.el.nativeElement.removeEventListener("mouseenter", this.mouseEnterListener);
      this.el.nativeElement.removeEventListener("mouseleave", this.mouseLeaveListener);
      this.el.nativeElement.removeEventListener("click", this.clickListener);
      this.el.nativeElement.removeEventListener("touchstart", this.touchStartListener);
      this.el.nativeElement.removeEventListener("touchend", this.touchEndListener);
      this.unbindDocumentTouchListener();
    }
    if (tooltipEvent === "focus" || tooltipEvent === "both") {
      let target = this.el.nativeElement.querySelector(".p-component");
      if (!target) {
        target = this.getTarget(this.el.nativeElement);
      }
      target.removeEventListener("focus", this.focusListener);
      target.removeEventListener("blur", this.blurListener);
    }
    this.unbindDocumentResizeListener();
  }
  remove() {
    if (this.container && this.container.parentElement) {
      if (this.getOption("appendTo") === "body") document.body.removeChild(this.container);
      else if (this.getOption("appendTo") === "target") this.el.nativeElement.removeChild(this.container);
      else Gt(this.getOption("appendTo"), this.container);
    }
    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.unbindContainerMouseleaveListener();
    this.unbindDocumentTouchListener();
    this.clearTimeouts();
    this.container = null;
    this.scrollHandler = null;
  }
  clearShowTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }
  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
  clearTimeouts() {
    this.clearShowTimeout();
    this.clearHideTimeout();
  }
  onDestroy() {
    this.unbindEvents();
    if (this.container) {
      zindexutils.clear(this.container);
    }
    this.remove();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
    }
  }
  static \u0275fac = function Tooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Tooltip)(\u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ViewContainerRef));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _Tooltip,
    selectors: [["", "pTooltip", ""]],
    inputs: {
      tooltipPosition: "tooltipPosition",
      tooltipEvent: "tooltipEvent",
      positionStyle: "positionStyle",
      tooltipStyleClass: "tooltipStyleClass",
      tooltipZIndex: "tooltipZIndex",
      escape: [2, "escape", "escape", booleanAttribute],
      showDelay: [2, "showDelay", "showDelay", numberAttribute],
      hideDelay: [2, "hideDelay", "hideDelay", numberAttribute],
      life: [2, "life", "life", numberAttribute],
      positionTop: [2, "positionTop", "positionTop", numberAttribute],
      positionLeft: [2, "positionLeft", "positionLeft", numberAttribute],
      autoHide: [2, "autoHide", "autoHide", booleanAttribute],
      fitContent: [2, "fitContent", "fitContent", booleanAttribute],
      hideOnEscape: [2, "hideOnEscape", "hideOnEscape", booleanAttribute],
      showOnEllipsis: [2, "showOnEllipsis", "showOnEllipsis", booleanAttribute],
      content: [0, "pTooltip", "content"],
      disabled: [0, "tooltipDisabled", "disabled"],
      tooltipOptions: "tooltipOptions",
      appendTo: [1, "appendTo"],
      ptTooltip: [1, "ptTooltip"],
      pTooltipPT: [1, "pTooltipPT"],
      pTooltipUnstyled: [1, "pTooltipUnstyled"]
    },
    features: [\u0275\u0275ProvidersFeature([TooltipStyle, {
      provide: TOOLTIP_INSTANCE,
      useExisting: _Tooltip
    }, {
      provide: PARENT_INSTANCE,
      useExisting: _Tooltip
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tooltip, [{
    type: Directive,
    args: [{
      selector: "[pTooltip]",
      standalone: true,
      providers: [TooltipStyle, {
        provide: TOOLTIP_INSTANCE,
        useExisting: Tooltip
      }, {
        provide: PARENT_INSTANCE,
        useExisting: Tooltip
      }]
    }]
  }], () => [{
    type: NgZone
  }, {
    type: ViewContainerRef
  }], {
    tooltipPosition: [{
      type: Input
    }],
    tooltipEvent: [{
      type: Input
    }],
    positionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    tooltipZIndex: [{
      type: Input
    }],
    escape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showDelay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    hideDelay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    life: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    positionTop: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    positionLeft: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    autoHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    fitContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideOnEscape: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showOnEllipsis: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    content: [{
      type: Input,
      args: ["pTooltip"]
    }],
    disabled: [{
      type: Input,
      args: ["tooltipDisabled"]
    }],
    tooltipOptions: [{
      type: Input
    }],
    appendTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appendTo",
        required: false
      }]
    }],
    ptTooltip: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "ptTooltip",
        required: false
      }]
    }],
    pTooltipPT: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pTooltipPT",
        required: false
      }]
    }],
    pTooltipUnstyled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pTooltipUnstyled",
        required: false
      }]
    }]
  });
})();
var TooltipModule = class _TooltipModule {
  static \u0275fac = function TooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _TooltipModule,
    imports: [Tooltip, BindModule],
    exports: [Tooltip, BindModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BindModule, BindModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
    type: NgModule,
    args: [{
      imports: [Tooltip, BindModule],
      exports: [Tooltip, BindModule]
    }]
  }], null, null);
})();

// src/app/features/leads/models/lead-group.model.ts
var CommunicationStatus;
(function(CommunicationStatus2) {
  CommunicationStatus2["NOT_CONTACTED"] = "not_contacted";
  CommunicationStatus2["CONTACTED"] = "contacted";
  CommunicationStatus2["RESPONDED"] = "responded";
})(CommunicationStatus || (CommunicationStatus = {}));

// src/app/features/leads/components/status-badge/status-badge.component.ts
var _c02 = (a0) => ({ "active-filter": a0 });
function StatusBadgeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function StatusBadgeComponent_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBadgeClick());
    });
    \u0275\u0275element(1, "lucide-icon", 2);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-color", ctx_r1.getBgColor())("border-color", ctx_r1.getBorderColor())("border-style", ctx_r1.getBorderStyle());
    \u0275\u0275property("pTooltip", ctx_r1.badgeData.tooltip)("ngClass", \u0275\u0275pureFunction1(15, _c02, ctx_r1.isFilterActive));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.badgeData.color);
    \u0275\u0275property("img", ctx_r1.getIcon())("size", 12);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", ctx_r1.badgeData.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.badgeData.label);
  }
}
var StatusBadgeComponent = class _StatusBadgeComponent {
  lead;
  isFilterActive = false;
  statusFilterChange = new EventEmitter();
  badgeData = null;
  CommunicationStatus = CommunicationStatus;
  // Lucide icons
  AtSign = AtSign;
  Send = Send;
  CheckSquare = SquareCheckBig;
  statusConfig = {
    [CommunicationStatus.NOT_CONTACTED]: {
      label: "No Contactado",
      icon: this.AtSign,
      color: "#9CA3AF",
      bgColor: "#F3F4F6",
      tooltip: "Sin contactar"
    },
    [CommunicationStatus.CONTACTED]: {
      label: "Contactado",
      icon: this.Send,
      color: "#3B82F6",
      bgColor: "#EFF6FF",
      tooltip: (date) => {
        if (!date)
          return "Fecha no disponible";
        return `Contactado: ${this.formatDate(date)}`;
      }
    },
    [CommunicationStatus.RESPONDED]: {
      label: "Respondido",
      icon: this.CheckSquare,
      color: "#10B981",
      bgColor: "#ECFDF5",
      tooltip: (date) => {
        if (!date)
          return "Fecha no disponible";
        return `Respondido: ${this.formatDate(date)}`;
      }
    }
  };
  ngOnInit() {
    this.updateBadgeData();
  }
  ngOnChanges() {
    this.updateBadgeData();
  }
  /**
   * Determine the communication status based on lead properties
   */
  getStatusFromLead(lead) {
    if (lead.email_contacted && lead.customer_answered) {
      return CommunicationStatus.RESPONDED;
    } else if (lead.email_contacted) {
      return CommunicationStatus.CONTACTED;
    } else {
      return CommunicationStatus.NOT_CONTACTED;
    }
  }
  /**
   * Update badge data based on lead status
   */
  updateBadgeData() {
    if (!this.lead)
      return;
    const status = this.getStatusFromLead(this.lead);
    const config = this.statusConfig[status];
    let tooltip = "";
    if (typeof config.tooltip === "function") {
      let dateField = null;
      switch (status) {
        case CommunicationStatus.CONTACTED:
          dateField = this.lead.first_email_sent_at;
          break;
        case CommunicationStatus.RESPONDED:
          dateField = this.lead.customer_answered_at;
          break;
      }
      tooltip = config.tooltip(dateField);
    } else {
      tooltip = config.tooltip;
    }
    this.badgeData = {
      status,
      label: config.label,
      icon: config.icon,
      color: config.color,
      tooltip
    };
  }
  /**
   * Format date to dd/MM/yyyy HH:mm format
   */
  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (e) {
      return "Fecha no disponible";
    }
  }
  /**
   * Handle badge click to filter by status
   */
  onBadgeClick() {
    if (this.badgeData) {
      this.statusFilterChange.emit(this.badgeData.status);
    }
  }
  /**
   * Get the background color for the badge
   */
  getBgColor() {
    if (!this.badgeData)
      return "#F3F4F6";
    return this.statusConfig[this.badgeData.status].bgColor;
  }
  /**
   * Get the border style for active filter
   */
  getBorderStyle() {
    return this.isFilterActive ? "2px solid" : "1px solid";
  }
  /**
   * Get the border color
   */
  getBorderColor() {
    if (!this.badgeData)
      return "#E5E7EB";
    return this.isFilterActive ? this.badgeData.color : "#E5E7EB";
  }
  /**
   * Get the icon for the badge
   */
  getIcon() {
    return this.badgeData?.icon;
  }
  static \u0275fac = function StatusBadgeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StatusBadgeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatusBadgeComponent, selectors: [["app-status-badge"]], inputs: { lead: "lead", isFilterActive: "isFilterActive" }, outputs: { statusFilterChange: "statusFilterChange" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [["tooltipPosition", "top", 1, "status-badge", 3, "backgroundColor", "borderColor", "borderStyle", "pTooltip", "ngClass"], ["tooltipPosition", "top", 1, "status-badge", 3, "click", "pTooltip", "ngClass"], [3, "img", "size"]], template: function StatusBadgeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, StatusBadgeComponent_Conditional_0_Template, 4, 17, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.badgeData ? 0 : -1);
    }
  }, dependencies: [CommonModule, NgClass, TooltipModule, Tooltip, TagModule, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: 1px solid #E5E7EB;\n  white-space: nowrap;\n}\n.status-badge[_ngcontent-%COMP%]   lucide-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.status-badge[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.status-badge[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.status-badge.active-filter[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);\n}\n/*# sourceMappingURL=status-badge.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatusBadgeComponent, [{
    type: Component,
    args: [{ selector: "app-status-badge", standalone: true, imports: [CommonModule, TooltipModule, TagModule, LucideAngularModule], template: `@if (badgeData) {
  <div 
    class="status-badge"
    [style.backgroundColor]="getBgColor()"
    [style.borderColor]="getBorderColor()"
    [style.borderStyle]="getBorderStyle()"
    [pTooltip]="badgeData.tooltip"
    tooltipPosition="top"
    (click)="onBadgeClick()"
    [ngClass]="{ 'active-filter': isFilterActive }">
    <lucide-icon [img]="getIcon()" [size]="12" [style.color]="badgeData.color"></lucide-icon>
    <span [style.color]="badgeData.color">{{ badgeData.label }}</span>
  </div>
}`, styles: ["/* angular:styles/component:scss;9497d8ca477f5511c6aaef4eb1df991ff6702d896b1c00e345a6fa7875692399;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/leads/components/status-badge/status-badge.component.ts */\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: 1px solid #E5E7EB;\n  white-space: nowrap;\n}\n.status-badge lucide-icon {\n  flex-shrink: 0;\n}\n.status-badge span {\n  flex-shrink: 0;\n}\n.status-badge:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.status-badge.active-filter {\n  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);\n}\n/*# sourceMappingURL=status-badge.component.css.map */\n"] }]
  }], null, { lead: [{
    type: Input
  }], isFilterActive: [{
    type: Input
  }], statusFilterChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatusBadgeComponent, { className: "StatusBadgeComponent", filePath: "src/app/features/leads/components/status-badge/status-badge.component.ts", lineNumber: 59 });
})();

// src/app/features/leads/components/filter-indicator/filter-indicator.component.ts
function FilterIndicatorComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 8);
    \u0275\u0275listener("click", function FilterIndicatorComponent_div_0_div_5_Template_button_click_4_listener() {
      const filter_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.clearFilter(filter_r3.type));
    });
    \u0275\u0275element(5, "i", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const filter_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap("pi " + ctx_r3.getFilterIcon(filter_r3.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(filter_r3.label);
  }
}
function FilterIndicatorComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "span", 3);
    \u0275\u0275text(3, "Filtros activos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275template(5, FilterIndicatorComponent_div_0_div_5_Template, 6, 3, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function FilterIndicatorComponent_div_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearAllFilters());
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r3.activeFilters);
  }
}
var FilterIndicatorComponent = class _FilterIndicatorComponent {
  activeStatusFilter = null;
  activeGroupId = null;
  activeGroupName = null;
  filterClear = new EventEmitter();
  activeFilters = [];
  statusLabels = {
    [CommunicationStatus.NOT_CONTACTED]: "No Contactados",
    [CommunicationStatus.CONTACTED]: "Contactados",
    [CommunicationStatus.RESPONDED]: "Cliente Respondi\xF3"
  };
  ngOnChanges() {
    this.updateActiveFilters();
  }
  /**
   * Update the list of active filters
   */
  updateActiveFilters() {
    this.activeFilters = [];
    if (this.activeStatusFilter) {
      this.activeFilters.push({
        type: "status",
        value: this.activeStatusFilter,
        label: this.statusLabels[this.activeStatusFilter] || this.activeStatusFilter
      });
    }
    if (this.activeGroupId && this.activeGroupName) {
      this.activeFilters.push({
        type: "group",
        value: this.activeGroupId,
        label: `Grupo: ${this.activeGroupName}`
      });
    }
  }
  /**
   * Check if there are any active filters
   */
  hasActiveFilters() {
    return this.activeFilters.length > 0;
  }
  /**
   * Clear a specific filter
   */
  clearFilter(filterType) {
    this.filterClear.emit(filterType);
  }
  /**
   * Clear all filters
   */
  clearAllFilters() {
    this.filterClear.emit("all");
  }
  /**
   * Get the icon for a filter type
   */
  getFilterIcon(filterType) {
    return filterType === "status" ? "pi-filter" : "pi-tag";
  }
  static \u0275fac = function FilterIndicatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FilterIndicatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FilterIndicatorComponent, selectors: [["app-filter-indicator"]], inputs: { activeStatusFilter: "activeStatusFilter", activeGroupId: "activeGroupId", activeGroupName: "activeGroupName" }, outputs: { filterClear: "filterClear" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "filter-indicator", 4, "ngIf"], [1, "filter-indicator"], [1, "filters-container"], [1, "filters-label"], [1, "filter-chips"], ["class", "filter-chip", 4, "ngFor", "ngForOf"], ["type", "button", "pButton", "", "label", "Limpiar todos", 1, "p-button-sm", "p-button-text", 3, "click"], [1, "filter-chip"], ["type", "button", "title", "Limpiar filtro", 1, "remove-btn", 3, "click"], [1, "pi", "pi-times"]], template: function FilterIndicatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, FilterIndicatorComponent_div_0_Template, 7, 1, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.hasActiveFilters());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ButtonModule, ButtonDirective], styles: ["\n\n.filter-indicator[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filters-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1e40af;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  border: 1px solid #3b82f6;\n  border-radius: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  color: #1e40af;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #1e40af;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  transition: color 0.2s ease;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .clear-all-btn[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n@media (max-width: 767px) {\n  .filter-indicator[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filters-label[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=filter-indicator.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterIndicatorComponent, [{
    type: Component,
    args: [{ selector: "app-filter-indicator", standalone: true, imports: [CommonModule, ButtonModule], template: `<div *ngIf="hasActiveFilters()" class="filter-indicator">
  <div class="filters-container">
    <span class="filters-label">Filtros activos:</span>
    <div class="filter-chips">
      <div *ngFor="let filter of activeFilters" class="filter-chip">
        <i [class]="'pi ' + getFilterIcon(filter.type)"></i>
        <span>{{ filter.label }}</span>
        <button 
          type="button"
          class="remove-btn"
          (click)="clearFilter(filter.type)"
          title="Limpiar filtro">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
    <button 
      type="button"
      class="clear-all-btn"
      (click)="clearAllFilters()"
      pButton
      label="Limpiar todos"
      class="p-button-sm p-button-text">
    </button>
  </div>
</div>`, styles: ["/* angular:styles/component:scss;5eafe1f49632f40ef030e9f3893b4585823f916072e39b713d6bd8d40ec593aa;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/leads/components/filter-indicator/filter-indicator.component.ts */\n.filter-indicator {\n  background-color: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.filter-indicator .filters-container {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.filter-indicator .filters-container .filters-label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1e40af;\n}\n.filter-indicator .filters-container .filter-chips {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  border: 1px solid #3b82f6;\n  border-radius: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  color: #1e40af;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip i {\n  font-size: 0.75rem;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn {\n  background: none;\n  border: none;\n  color: #1e40af;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  transition: color 0.2s ease;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn:hover {\n  color: #dc2626;\n}\n.filter-indicator .filters-container .clear-all-btn {\n  margin-left: auto;\n}\n@media (max-width: 767px) {\n  .filter-indicator {\n    padding: 0.75rem;\n  }\n  .filter-indicator .filters-container {\n    gap: 0.5rem;\n  }\n  .filter-indicator .filters-container .filters-label {\n    font-size: 0.8125rem;\n  }\n  .filter-indicator .filters-container .filter-chips .filter-chip {\n    font-size: 0.8125rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=filter-indicator.component.css.map */\n"] }]
  }], null, { activeStatusFilter: [{
    type: Input
  }], activeGroupId: [{
    type: Input
  }], activeGroupName: [{
    type: Input
  }], filterClear: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FilterIndicatorComponent, { className: "FilterIndicatorComponent", filePath: "src/app/features/leads/components/filter-indicator/filter-indicator.component.ts", lineNumber: 127 });
})();

// src/app/features/leads/services/group-fetch.service.ts
var GroupFetchService = class _GroupFetchService {
  http;
  api = environment.api;
  groupsCache = null;
  cacheExpiry = 0;
  CACHE_DURATION = 5 * 60 * 1e3;
  // 5 minutes
  groupsSubject = new BehaviorSubject([]);
  groups$ = this.groupsSubject.asObservable();
  constructor(http) {
    this.http = http;
  }
  /**
   * Fetches all available groups from the API
   * Uses caching to avoid repeated requests
   * @returns Observable<LeadGroup[]> - Array of available groups
   * @throws Error if the API request fails
   */
  fetchGroups() {
    if (this.groupsCache && Date.now() < this.cacheExpiry) {
      return new Observable((observer) => {
        observer.next(this.groupsCache);
        observer.complete();
      });
    }
    return this.http.get(`${this.api}/lead-groups`).pipe(
      retry(2),
      // Retry up to 2 times on failure
      tap((response) => {
        const groups = Array.isArray(response) ? response : response.groups || [];
        this.groupsCache = groups;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        this.groupsSubject.next(groups);
      }),
      map((response) => {
        return Array.isArray(response) ? response : response.groups || [];
      }),
      catchError((error) => {
        console.error("Error fetching groups:", error);
        let errorMessage = "Failed to fetch groups. Please try again.";
        let errorType = "network";
        if (error.status >= 500) {
          errorMessage = "Error del servidor. Por favor, intenta m\xE1s tarde.";
          errorType = "server";
        } else if (error.status >= 400) {
          errorMessage = "Error de validaci\xF3n. Por favor, verifica los datos.";
          errorType = "validation";
        } else if (error.status === 0) {
          errorMessage = "No se puede conectar. Por favor, verifica tu conexi\xF3n a internet.";
          errorType = "network";
        }
        return throwError(() => ({
          type: errorType,
          message: errorMessage,
          originalError: error
        }));
      })
    );
  }
  /**
   * Invalidate the cache to force a fresh fetch
   */
  invalidateCache() {
    this.groupsCache = null;
    this.cacheExpiry = 0;
  }
  /**
   * Get cached groups synchronously
   */
  getCachedGroups() {
    return this.groupsCache || [];
  }
  static \u0275fac = function GroupFetchService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupFetchService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GroupFetchService, factory: _GroupFetchService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupFetchService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/leads/pages/leads-list/leads-list.ts
var _c03 = ["tableTemplate"];
var _forTrack0 = ($index, $item) => $item.id;
function LeadsList_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275listener("click", function LeadsList_For_17_Template_div_click_0_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.viewDetail(item_r3));
    });
    \u0275\u0275elementStart(1, "div", 19)(2, "h3", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "app-button", 21);
    \u0275\u0275listener("click", function LeadsList_For_17_Template_app_button_click_4_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.viewDetail(item_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 22)(6, "div", 23)(7, "span", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "app-status-badge", 25);
    \u0275\u0275listener("statusFilterChange", function LeadsList_For_17_Template_app_status_badge_statusFilterChange_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onStatusFilterChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 26);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 27)(13, "div", 28);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 29);
    \u0275\u0275element(16, "app-phone", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 31);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.name);
    \u0275\u0275advance();
    \u0275\u0275property("fullWidth", false);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", (item_r3.status == null ? null : item_r3.status.name) || "Sin estado", " ");
    \u0275\u0275advance();
    \u0275\u0275property("lead", item_r3)("isFilterActive", ctx_r3.isStatusFilterActive(item_r3.id));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (item_r3.group == null ? null : item_r3.group.name) || "Sin grupo", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("phone", item_r3.phone)("countryCode", item_r3.phone_country)("countryPhoneCode", item_r3.phone_code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(19, 11, item_r3.created_at, "shortDate"), " ");
  }
}
function LeadsList_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 32)(2, "button", 33);
    \u0275\u0275listener("click", function LeadsList_Conditional_18_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPageChange({ page: ctx_r3.table_config().page - 1, limit: ctx_r3.table_config().limit }));
    });
    \u0275\u0275text(3, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 33);
    \u0275\u0275listener("click", function LeadsList_Conditional_18_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPageChange({ page: ctx_r3.table_config().page + 1, limit: ctx_r3.table_config().limit }));
    });
    \u0275\u0275text(7, " Siguiente ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.table_config().page === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" P\xE1gina ", ctx_r3.table_config().page, " de ", ctx_r3.Math.ceil(ctx_r3.table_config().totalResults / ctx_r3.table_config().limit), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.table_config().hasNext);
  }
}
function LeadsList_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 34)(1, "p", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td", 36)(4, "span", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 38)(7, "app-status-badge", 25);
    \u0275\u0275listener("statusFilterChange", function LeadsList_ng_template_19_Template_app_status_badge_statusFilterChange_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onStatusFilterChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 39)(9, "span", 40);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 41)(12, "span", 42);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 34);
    \u0275\u0275element(15, "app-phone", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 43);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 44)(20, "button", 45);
    \u0275\u0275listener("click", function LeadsList_ng_template_19_Template_button_click_20_listener($event) {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.viewDetail(item_r7);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(21, "i", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (item_r7.status == null ? null : item_r7.status.name) || "N/A", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("lead", item_r7)("isFilterActive", ctx_r3.isStatusFilterActive(item_r7.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (item_r7.group == null ? null : item_r7.group.name) || "Sin grupo", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r7.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("phone", item_r7.phone)("countryCode", item_r7.phone_country)("countryPhoneCode", item_r7.phone_code);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 10, item_r7.created_at, "M/d/yy"));
  }
}
var LeadsList = class _LeadsList {
  router;
  leads_service;
  route;
  dialog;
  groupFetchService;
  tableTemplate;
  Math = Math;
  table_config = signal({
    rows: [],
    columns: [
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: false, width: 100 },
      { name: "Estado", prop: "status", sortable: false, canAutoResize: false, width: 75 },
      { name: "Contacto", prop: "contact_status", sortable: false, canAutoResize: false, width: 85 },
      { name: "Grupo", prop: "group", sortable: false, canAutoResize: false, width: 110 },
      { name: "Email", prop: "email", sortable: true, canAutoResize: false, width: 140 },
      { name: "Tel\xE9fono", prop: "phone", sortable: true, canAutoResize: false, width: 100 },
      { name: "Fecha", prop: "created_at", sortable: true, canAutoResize: false, width: 75 },
      { name: "", prop: "actions", sortable: false, canAutoResize: false, width: 45 }
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 15,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron leads" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  search = "";
  destroy$ = new Subject();
  lastQueryParams = "";
  activeFilter = null;
  activeStatusFilter = null;
  activeGroupId = null;
  activeGroupName = null;
  groupSelectConfig = {
    placeholder: "Filtrar por grupo",
    data: [],
    value: "id",
    option: "name",
    all: true,
    all_message: "Ver Todos",
    loading: false,
    error: false,
    value_default: null
  };
  constructor(router, leads_service, route, dialog, groupFetchService) {
    this.router = router;
    this.leads_service = leads_service;
    this.route = route;
    this.dialog = dialog;
    this.groupFetchService = groupFetchService;
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;
      this.search = query?.search ?? "";
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 15;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 15 : limit
      }));
      if (query?.email_contacted === "false") {
        this.activeStatusFilter = CommunicationStatus.NOT_CONTACTED;
        this.activeFilter = "not_contacted";
      } else if (query?.email_contacted === "true" && query?.customer_answered === "false") {
        this.activeStatusFilter = CommunicationStatus.CONTACTED;
        this.activeFilter = "contacted_no_response";
      } else if (query?.email_contacted === "true" && query?.customer_answered === "true") {
        this.activeStatusFilter = CommunicationStatus.RESPONDED;
        this.activeFilter = "customer_responded";
      } else {
        this.activeStatusFilter = null;
        this.activeFilter = null;
      }
      if (query?.group_id) {
        this.activeGroupId = query.group_id;
      } else {
        this.activeGroupId = null;
      }
      this.getLeads();
    });
    this.loadGroups();
  }
  /**
   * Load groups for the select dropdown
   */
  loadGroups() {
    this.groupSelectConfig.loading = true;
    this.groupSelectConfig.error = false;
    this.groupFetchService.fetchGroups().pipe(takeUntil(this.destroy$)).subscribe({
      next: (groups) => {
        this.groupSelectConfig.data = groups.map((group) => ({
          id: group.id,
          name: `${group.name} (${group.lead_count || 0})`,
          lead_count: group.lead_count || 0
        }));
        this.groupSelectConfig.loading = false;
      },
      error: (error) => {
        this.groupSelectConfig.loading = false;
        this.groupSelectConfig.error = true;
        console.error("Error loading groups:", error);
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getLeads() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const config = this.table_config();
    const page = isNaN(config.page) ? 1 : config.page;
    const limit = isNaN(config.limit) ? 15 : config.limit;
    let data = {
      search: this.search,
      page,
      limit
    };
    if (this.activeFilter === "not_contacted") {
      data.email_contacted = false;
    } else if (this.activeFilter === "contacted_no_response") {
      data.email_contacted = true;
      data.customer_answered = false;
    } else if (this.activeFilter === "customer_responded") {
      data.email_contacted = true;
      data.customer_answered = true;
    }
    if (this.activeGroupId) {
      data.group_id = this.activeGroupId;
    }
    this.leads_service.getLeads(data).subscribe((res) => {
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        rows: res?.data ?? [],
        totalResults: res?.total ?? 0,
        hasNext: res?.hasNext ?? false,
        loading: false
      }));
    });
  }
  onPageChange(event) {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
      page: event.page,
      limit: event.limit
    }));
    this.updateUrlParams();
  }
  onSortChange(event) {
    console.log("Sort changed:", event);
  }
  updateUrlParams() {
    const config = this.table_config();
    const params = {
      page: config.page,
      limit: config.limit
    };
    if (this.search) {
      params.search = this.search;
    }
    if (this.activeFilter === "not_contacted") {
      params.email_contacted = "false";
    } else if (this.activeFilter === "contacted_no_response") {
      params.email_contacted = "true";
      params.customer_answered = "false";
    } else if (this.activeFilter === "customer_responded") {
      params.email_contacted = "true";
      params.customer_answered = "true";
    }
    if (this.activeGroupId) {
      params.group_id = this.activeGroupId;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true
    });
  }
  getSeverity(status) {
    switch (status) {
      case "Al corriente":
        return "success";
      case "Atrasado":
        return "danger";
      case "Sin iniciar":
        return "info";
      default:
        return "warn";
    }
  }
  viewDetail(row) {
    this.router.navigate(["/leads/detail", row.id]);
  }
  createLead() {
    this.dialog.open(LeadEditDialog, {
      data: {}
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.getLeads();
      }
    });
  }
  onFilterChange(filter) {
    this.activeFilter = filter;
    this.activeStatusFilter = null;
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
    if (filter === "not_contacted") {
      this.activeStatusFilter = CommunicationStatus.NOT_CONTACTED;
    } else if (filter === "contacted_no_response") {
      this.activeStatusFilter = CommunicationStatus.CONTACTED;
    } else if (filter === "customer_responded") {
      this.activeStatusFilter = CommunicationStatus.RESPONDED;
    }
    this.updateUrlParams();
  }
  /**
   * Handle status badge filter change
   */
  onStatusFilterChange(status) {
    if (this.activeStatusFilter === status) {
      this.activeStatusFilter = null;
    } else {
      this.activeStatusFilter = status;
    }
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
    this.updateUrlParams();
  }
  /**
   * Handle group dropdown selection
   */
  onGroupDropdownSelect(event) {
    this.activeGroupId = event.groupId;
    this.activeGroupName = event.groupName;
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
    this.updateUrlParams();
  }
  /**
   * Handle group select change (new method for app-select)
   */
  onGroupSelectChange(event) {
    const selectedGroupId = event.value;
    const selectedGroup = this.groupSelectConfig.data.find((g) => g.id === selectedGroupId);
    const groupName = selectedGroup?.name?.split(" (")[0] || null;
    this.activeGroupId = selectedGroupId;
    this.activeGroupName = groupName;
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
    this.updateUrlParams();
  }
  /**
   * Handle filter clearing
   */
  onFilterClear(filterType) {
    if (filterType === "status" || filterType === "all") {
      this.activeStatusFilter = null;
      this.activeFilter = null;
    }
    if (filterType === "group" || filterType === "all") {
      this.activeGroupId = null;
      this.activeGroupName = null;
    }
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
    const params = {
      page: 1,
      limit: this.table_config().limit
    };
    if (this.search) {
      params.search = this.search;
    }
    if (filterType !== "status" && filterType !== "all" && this.activeFilter) {
      if (this.activeFilter === "not_contacted") {
        params.email_contacted = "false";
      } else if (this.activeFilter === "contacted_no_response") {
        params.email_contacted = "true";
        params.customer_answered = "false";
      } else if (this.activeFilter === "customer_responded") {
        params.email_contacted = "true";
        params.customer_answered = "true";
      }
    }
    if (filterType !== "group" && filterType !== "all" && this.activeGroupId) {
      params.group_id = this.activeGroupId;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true
    });
  }
  /**
   * Check if a status is the active filter
   */
  isStatusFilterActive(leadId) {
    return this.activeStatusFilter !== null;
  }
  static \u0275fac = function LeadsList_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeadsList)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(LeadService), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(GroupFetchService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeadsList, selectors: [["app-leads-list"]], viewQuery: function LeadsList_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 21, vars: 9, consts: [["tableTemplate", ""], [1, "leads-list-container"], [1, "leads-content"], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "items-center", "gap-3", "md:justify-end", "flex-wrap"], [3, "changeOption", "config"], ["param_name", "search", 1, "w-64", 3, "searchChange", "param_activate"], ["text", "Crear lead", "custom_class", "btn_primary", 3, "click"], [3, "filterClear", "activeStatusFilter", "activeGroupId", "activeGroupName"], [3, "filterChange", "activeFilter"], [1, "hidden", "md:block"], [3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "block", "md:hidden"], [1, "space-y-3"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm"], [1, "mt-4", "flex", "justify-center"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", 3, "click"], [1, "flex", "justify-between", "items-start", "mb-2"], [1, "font-semibold", "text-gray-900", "truncate", "flex-1", "mr-2"], ["text", "Ver", "size", "sm", "custom_class", "btn_primary text-xs px-2 py-1", 3, "click", "fullWidth"], [1, "space-y-2"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800"], [3, "statusFilterChange", "lead", "isFilterActive"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-xs", "font-medium", "bg-gray-100", "text-gray-600"], [1, "text-sm", "text-gray-600"], [1, "truncate"], [1, "mt-1"], [3, "phone", "countryCode", "countryPhoneCode"], [1, "text-xs", "text-gray-500", "mt-1"], [1, "flex", "items-center", "gap-2"], [1, "px-3", "py-1", "text-sm", "border", "rounded", "disabled:opacity-50", 3, "click", "disabled"], [1, "px-2", "py-2", "w-[100px]"], [1, "truncate", "text-sm", "font-medium", "m-0"], [1, "px-2", "py-2", "w-[75px]"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "whitespace-nowrap", "max-w-[70px]", "h-[24px]", "min-h-[24px]", "overflow-hidden", "text-ellipsis"], [1, "px-2", "py-2", "w-[85px]"], [1, "px-2", "py-2", "w-[110px]"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-gray-100", "text-gray-600", "whitespace-nowrap", "max-w-[105px]", "h-[24px]", "min-h-[24px]", "overflow-hidden", "text-ellipsis"], [1, "px-2", "py-2", "w-[140px]"], [1, "truncate", "text-sm", "block", "m-0"], [1, "px-2", "py-2", "w-[75px]", "text-xs"], [1, "px-2", "py-2", "w-[45px]"], ["title", "Ver", 1, "text-blue-600", "hover:text-blue-800", "text-sm", "p-1", 3, "click"], [1, "pi", "pi-arrow-right", "w-4", "h-4"]], template: function LeadsList_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h2", 5);
      \u0275\u0275text(5, "Leads");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "app-select", 7);
      \u0275\u0275listener("changeOption", function LeadsList_Template_app_select_changeOption_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onGroupSelectChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "app-search", 8);
      \u0275\u0275listener("searchChange", function LeadsList_Template_app_search_searchChange_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.search = $event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "app-button", 9);
      \u0275\u0275listener("click", function LeadsList_Template_app_button_click_9_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createLead());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "app-filter-indicator", 10);
      \u0275\u0275listener("filterClear", function LeadsList_Template_app_filter_indicator_filterClear_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterClear($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "app-leads-stats", 11);
      \u0275\u0275listener("filterChange", function LeadsList_Template_app_leads_stats_filterChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 12)(13, "app-datatable-wrapper", 13);
      \u0275\u0275listener("pageChange", function LeadsList_Template_app_datatable_wrapper_pageChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function LeadsList_Template_app_datatable_wrapper_sortChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function LeadsList_Template_app_datatable_wrapper_rowClick_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.viewDetail($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 14)(15, "div", 15);
      \u0275\u0275repeaterCreate(16, LeadsList_For_17_Template, 20, 14, "div", 16, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(18, LeadsList_Conditional_18_Template, 8, 4, "div", 17);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(19, LeadsList_ng_template_19_Template, 22, 13, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r8 = \u0275\u0275reference(20);
      \u0275\u0275advance(7);
      \u0275\u0275property("config", ctx.groupSelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("activeStatusFilter", ctx.activeStatusFilter)("activeGroupId", ctx.activeGroupId)("activeGroupName", ctx.activeGroupName);
      \u0275\u0275advance();
      \u0275\u0275property("activeFilter", ctx.activeFilter);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r8);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.table_config().rows);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.table_config().totalResults > ctx.table_config().limit ? 18 : -1);
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    TagModule,
    ButtonModule,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    LeadsStatsComponent,
    StatusBadgeComponent,
    SelectComponent,
    FilterIndicatorComponent,
    PhoneComponent,
    DatePipe
  ], styles: ["\n\n.leads-list-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0;\n  min-height: 100vh;\n  background-color: transparent;\n}\n.leads-list-container[_ngcontent-%COMP%]   .leads-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  background-color: transparent;\n}\n.leads-list-container[_ngcontent-%COMP%]   .name-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.leads-list-container[_ngcontent-%COMP%]   .name-cell[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n[_nghost-%COMP%]     .datatable-wrapper .ngx-datatable {\n  width: 100% !important;\n  max-width: 760px !important;\n  font-size: 12px !important;\n}\n[_nghost-%COMP%]     .datatable-wrapper .ngx-datatable .datatable-header .datatable-header-cell {\n  padding: 0.5rem 0.25rem !important;\n  font-size: 0.875rem !important;\n  font-weight: 600 !important;\n  height: 32px !important;\n  min-height: 32px !important;\n}\n[_nghost-%COMP%]     .datatable-wrapper .ngx-datatable .datatable-body .datatable-body-row {\n  height: 40px !important;\n  min-height: 40px !important;\n}\n[_nghost-%COMP%]     .datatable-wrapper .ngx-datatable .datatable-body .datatable-body-row .datatable-body-cell {\n  padding: 0.5rem 0.25rem !important;\n  font-size: 0.875rem !important;\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n  line-height: 1.4 !important;\n}\n[_nghost-%COMP%]     .datatable-wrapper .ngx-datatable .datatable-row-wrapper .datatable-body-row {\n  height: 40px !important;\n  min-height: 40px !important;\n}\n@media (max-width: 767px) {\n  .leads-list-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .leads-list-container[_ngcontent-%COMP%]   .leads-content[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .leads-list-container[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 0;\n  }\n}\n@media (min-width: 1024px) {\n  .leads-list-container[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 0;\n  }\n}\n/*# sourceMappingURL=leads-list.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeadsList, [{
    type: Component,
    args: [{ selector: "app-leads-list", imports: [
      CommonModule,
      FormsModule,
      TagModule,
      ButtonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent,
      LeadsStatsComponent,
      StatusBadgeComponent,
      SelectComponent,
      FilterIndicatorComponent,
      PhoneComponent
    ], template: `<div class="leads-list-container">\r
  <!-- Main content area -->\r
  <div class="leads-content">\r
    <div class="px-4">\r
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
        <h2 class="text-2xl font-semibold text-gray-800">Leads</h2>\r
\r
        <!-- Right side: Group Filter + Search + Button -->\r
        <div class="flex items-center gap-3 md:justify-end flex-wrap">\r
          <app-select\r
            [config]="groupSelectConfig"\r
            (changeOption)="onGroupSelectChange($event)">\r
          </app-select>\r
\r
          <app-search\r
            class="w-64"\r
            [param_activate]="true"\r
            param_name="search"\r
            (searchChange)="search = $event;">\r
          </app-search>\r
\r
          <app-button\r
            text="Crear lead"\r
            custom_class="btn_primary"\r
            (click)="createLead()">\r
          </app-button>\r
        </div>\r
      </div>\r
\r
      <!-- Filter Indicator -->\r
      <app-filter-indicator\r
        [activeStatusFilter]="activeStatusFilter"\r
        [activeGroupId]="activeGroupId"\r
        [activeGroupName]="activeGroupName"\r
        (filterClear)="onFilterClear($event)">\r
      </app-filter-indicator>\r
\r
      <!-- Stats Dashboard -->\r
      <app-leads-stats \r
        [activeFilter]="activeFilter"\r
        (filterChange)="onFilterChange($event)">\r
      </app-leads-stats>\r
\r
      <!-- Desktop Table -->\r
      <div class="hidden md:block">\r
        <app-datatable-wrapper\r
          [config]="table_config()"\r
          [rowTemplate]="tableTemplate"\r
          (pageChange)="onPageChange($event)"\r
          (sortChange)="onSortChange($event)"\r
          (rowClick)="viewDetail($event)">\r
        </app-datatable-wrapper>\r
      </div>\r
\r
      <!-- Mobile Cards -->\r
      <div class="block md:hidden">\r
        <div class="space-y-3">\r
          @for (item of table_config().rows; track item.id) {\r
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" (click)="viewDetail(item)">\r
              <div class="flex justify-between items-start mb-2">\r
                <h3 class="font-semibold text-gray-900 truncate flex-1 mr-2">{{ item.name }}</h3>\r
                <app-button\r
                  text="Ver"\r
                  size="sm"\r
                  [fullWidth]="false"\r
                  custom_class="btn_primary text-xs px-2 py-1"\r
                  (click)="viewDetail(item); $event.stopPropagation()">\r
                </app-button>\r
              </div>\r
              \r
              <div class="space-y-2">\r
                <div class="flex items-center gap-2 flex-wrap">\r
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">\r
                    {{ item.status?.name || 'Sin estado' }}\r
                  </span>\r
                  <app-status-badge\r
                    [lead]="item"\r
                    [isFilterActive]="isStatusFilterActive(item.id)"\r
                    (statusFilterChange)="onStatusFilterChange($event)">\r
                  </app-status-badge>\r
                  <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">\r
                    {{ item.group?.name || 'Sin grupo' }}\r
                  </span>\r
                </div>\r
                \r
                <div class="text-sm text-gray-600">\r
                  <div class="truncate">{{ item.email }}</div>\r
                  <div class="mt-1">\r
                    <app-phone \r
                      [phone]="item.phone"\r
                      [countryCode]="item.phone_country"\r
                      [countryPhoneCode]="item.phone_code">\r
                    </app-phone>\r
                  </div>\r
                  <div class="text-xs text-gray-500 mt-1">\r
                    {{ item.created_at | date:'shortDate' }}\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
\r
        <!-- Mobile Pagination -->\r
        @if (table_config().totalResults > table_config().limit) {\r
          <div class="mt-4 flex justify-center">\r
            <div class="flex items-center gap-2">\r
              <button \r
                [disabled]="table_config().page === 1"\r
                (click)="onPageChange({page: table_config().page - 1, limit: table_config().limit})"\r
                class="px-3 py-1 text-sm border rounded disabled:opacity-50">\r
                Anterior\r
              </button>\r
              <span class="text-sm text-gray-600">\r
                P\xE1gina {{ table_config().page }} de {{ Math.ceil(table_config().totalResults / table_config().limit) }}\r
              </span>\r
              <button \r
                [disabled]="!table_config().hasNext"\r
                (click)="onPageChange({page: table_config().page + 1, limit: table_config().limit})"\r
                class="px-3 py-1 text-sm border rounded disabled:opacity-50">\r
                Siguiente\r
              </button>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit" let-rowIndex="rowIndex">\r
  <td class="px-2 py-2 w-[100px]">\r
    <p class="truncate text-sm font-medium m-0">{{ item.name }}</p>\r
  </td>\r
  <td class="px-2 py-2 w-[75px]">\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap max-w-[70px] h-[24px] min-h-[24px] overflow-hidden text-ellipsis">\r
      {{ item.status?.name || 'N/A' }}\r
    </span>\r
  </td>\r
  <td class="px-2 py-2 w-[85px]">\r
    <app-status-badge\r
      [lead]="item"\r
      [isFilterActive]="isStatusFilterActive(item.id)"\r
      (statusFilterChange)="onStatusFilterChange($event)">\r
    </app-status-badge>\r
  </td>\r
  <td class="px-2 py-2 w-[110px]">\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 whitespace-nowrap max-w-[105px] h-[24px] min-h-[24px] overflow-hidden text-ellipsis">\r
      {{ item.group?.name || 'Sin grupo' }}\r
    </span>\r
  </td>\r
  <td class="px-2 py-2 w-[140px]">\r
    <span class="truncate text-sm block m-0">{{ item.email }}</span>\r
  </td>\r
  <td class="px-2 py-2 w-[100px]">\r
    <app-phone \r
      [phone]="item.phone"\r
      [countryCode]="item.phone_country"\r
      [countryPhoneCode]="item.phone_code">\r
    </app-phone>\r
  </td>\r
  <td class="px-2 py-2 w-[75px] text-xs">{{ item.created_at | date:'M/d/yy' }}</td>\r
  <td class="px-2 py-2 w-[45px]">\r
    <button\r
      class="text-blue-600 hover:text-blue-800 text-sm p-1"\r
      (click)="viewDetail(item); $event.stopPropagation()"\r
      title="Ver">\r
      <i class="pi pi-arrow-right w-4 h-4"></i>\r
    </button>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/leads/pages/leads-list/leads-list.scss */\n.leads-list-container {\n  display: flex;\n  gap: 0;\n  min-height: 100vh;\n  background-color: transparent;\n}\n.leads-list-container .leads-content {\n  flex: 1;\n  overflow-y: auto;\n  background-color: transparent;\n}\n.leads-list-container .name-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.leads-list-container .name-cell p {\n  margin: 0;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n:host ::ng-deep .datatable-wrapper .ngx-datatable {\n  width: 100% !important;\n  max-width: 760px !important;\n  font-size: 12px !important;\n}\n:host ::ng-deep .datatable-wrapper .ngx-datatable .datatable-header .datatable-header-cell {\n  padding: 0.5rem 0.25rem !important;\n  font-size: 0.875rem !important;\n  font-weight: 600 !important;\n  height: 32px !important;\n  min-height: 32px !important;\n}\n:host ::ng-deep .datatable-wrapper .ngx-datatable .datatable-body .datatable-body-row {\n  height: 40px !important;\n  min-height: 40px !important;\n}\n:host ::ng-deep .datatable-wrapper .ngx-datatable .datatable-body .datatable-body-row .datatable-body-cell {\n  padding: 0.5rem 0.25rem !important;\n  font-size: 0.875rem !important;\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n  line-height: 1.4 !important;\n}\n:host ::ng-deep .datatable-wrapper .ngx-datatable .datatable-row-wrapper .datatable-body-row {\n  height: 40px !important;\n  min-height: 40px !important;\n}\n@media (max-width: 767px) {\n  .leads-list-container {\n    flex-direction: column;\n  }\n  .leads-list-container .leads-content {\n    flex: 1;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .leads-list-container {\n    display: flex;\n    gap: 0;\n  }\n}\n@media (min-width: 1024px) {\n  .leads-list-container {\n    display: flex;\n    gap: 0;\n  }\n}\n/*# sourceMappingURL=leads-list.css.map */\n"] }]
  }], () => [{ type: Router }, { type: LeadService }, { type: ActivatedRoute }, { type: MatDialog }, { type: GroupFetchService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeadsList, { className: "LeadsList", filePath: "src/app/features/leads/pages/leads-list/leads-list.ts", lineNumber: 45 });
})();
export {
  LeadsList
};
//# sourceMappingURL=chunk-P6QRAKAS.js.map
