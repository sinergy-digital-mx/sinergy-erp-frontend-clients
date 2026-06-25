import {
  SelectComponent
} from "./chunk-DFLPJ3H7.js";
import {
  ReactiveFormsModule
} from "./chunk-EF42XV6X.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-524KR27D.js";
import {
  CommonModule,
  HttpClient,
  environment
} from "./chunk-MNFUR22A.js";
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-CJAGDKD4.js";

// src/app/core/services/leads.service.ts
var LeadService = class _LeadService {
  router;
  http;
  activated_route;
  api = environment.api;
  constructor(router, http, activated_route) {
    this.router = router;
    this.http = http;
    this.activated_route = activated_route;
  }
  getLeads(params) {
    return this.http.get(`${this.api}/leads`, {
      params
    });
  }
  getDetail(id) {
    return this.http.get(`${this.api}/leads/${id}`);
  }
  createLead(params) {
    return this.http.post(`${this.api}/leads`, params);
  }
  updateLead(params) {
    return this.http.put(`${this.api}/leads/${params.id}`, params);
  }
  createActivity(data) {
    return this.http.post(`${this.api}/leads/${data.lead_id}/activities`, data);
  }
  getLeadsStats() {
    return this.http.get(`${this.api}/leads/stats/overview`);
  }
  static \u0275fac = function LeadService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeadService)(\u0275\u0275inject(Router), \u0275\u0275inject(HttpClient), \u0275\u0275inject(ActivatedRoute));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LeadService, factory: _LeadService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LeadService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: Router }, { type: HttpClient }, { type: ActivatedRoute }], null);
})();

// src/app/core/components/group-select/group-select.component.ts
function GroupSelectComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 0);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label);
  }
}
var GroupSelectComponent = class _GroupSelectComponent {
  http;
  control = null;
  groupType = "lead";
  label = "";
  groupSelected = new EventEmitter();
  groups = signal([], ...ngDevMode ? [{ debugName: "groups" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  api = environment.api;
  constructor(http) {
    this.http = http;
  }
  ngOnInit() {
    this.loadGroups();
  }
  selectConfig() {
    return {
      placeholder: "Selecciona un grupo",
      data: this.groups(),
      value: "id",
      option: "displayName",
      form_control: this.control,
      loading: this.loading()
    };
  }
  loadGroups() {
    this.loading.set(true);
    const endpoint = this.groupType === "lead" ? "/lead-groups" : "/customer-groups";
    this.http.get(`${this.api}${endpoint}`).subscribe({
      next: (response) => {
        const groupsData = Array.isArray(response) ? response : response.groups || response.data || [];
        this.groups.set(groupsData.map((item) => ({
          id: item.id,
          name: item.name,
          count: item.lead_count || item.customer_count || 0,
          displayName: `${item.name} (${item.lead_count || item.customer_count || 0})`
        })));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.groups.set([]);
      }
    });
  }
  static \u0275fac = function GroupSelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GroupSelectComponent)(\u0275\u0275directiveInject(HttpClient));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GroupSelectComponent, selectors: [["app-group-select"]], inputs: { control: "control", groupType: "groupType", label: "label" }, outputs: { groupSelected: "groupSelected" }, decls: 3, vars: 3, consts: [[1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [3, "config", "has_error"]], template: function GroupSelectComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275conditionalCreate(1, GroupSelectComponent_Conditional_1_Template, 2, 1, "label", 0);
      \u0275\u0275element(2, "app-select", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.label ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.selectConfig())("has_error", (ctx.control == null ? null : ctx.control.invalid) && (ctx.control == null ? null : ctx.control.touched));
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, SelectComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GroupSelectComponent, [{
    type: Component,
    args: [{ selector: "app-group-select", standalone: true, imports: [CommonModule, ReactiveFormsModule, SelectComponent], template: `
    <div>
      @if (label) {
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
      }
      <app-select
        [config]="selectConfig()"
        [has_error]="control?.invalid && control?.touched">
      </app-select>
    </div>
  ` }]
  }], () => [{ type: HttpClient }], { control: [{
    type: Input
  }], groupType: [{
    type: Input
  }], label: [{
    type: Input
  }], groupSelected: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GroupSelectComponent, { className: "GroupSelectComponent", filePath: "src/app/core/components/group-select/group-select.component.ts", lineNumber: 31 });
})();

export {
  GroupSelectComponent,
  LeadService
};
//# sourceMappingURL=chunk-GDXOHYZA.js.map
