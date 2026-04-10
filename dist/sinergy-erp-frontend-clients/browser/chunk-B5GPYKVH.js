import {
  PropertyEditModalComponent,
  PropertyService
} from "./chunk-ADUVL4TN.js";
import {
  SearchComponent
} from "./chunk-B3LR2PTH.js";
import {
  DatatableWrapperComponent
} from "./chunk-QW7YUBWU.js";
import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import "./chunk-K22JBEUE.js";
import "./chunk-Y4MZBWJH.js";
import "./chunk-3BQHHGSZ.js";
import {
  ButtonComponent
} from "./chunk-CL7CZJUC.js";
import "./chunk-OC6N764R.js";
import {
  ArrowRight
} from "./chunk-XYBC4MWB.js";
import "./chunk-KNFYVOET.js";
import {
  MatDialog
} from "./chunk-OO2OLRGJ.js";
import "./chunk-TXPVZZCM.js";
import "./chunk-2BSLK6RD.js";
import {
  ActivatedRoute,
  HttpClient,
  Router,
  environment
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  CurrencyPipe,
  NgIf
} from "./chunk-GZH4LDOW.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Subject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

// src/app/features/properties/components/property-group-dropdown/property-group-dropdown.component.ts
var PropertyGroupDropdownComponent = class _PropertyGroupDropdownComponent {
  http;
  selectedGroupId = null;
  groupSelect = new EventEmitter();
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
      placeholder: "Filtrar por proyecto",
      data: this.groups(),
      value: "id",
      option: "name",
      form_control: null,
      loading: this.loading(),
      all: true,
      all_message: "Todos los proyectos",
      value_default: this.selectedGroupId
    };
  }
  loadGroups() {
    this.loading.set(true);
    this.http.get(`${this.api}/tenant/property-groups`).subscribe({
      next: (response) => {
        const groupsData = Array.isArray(response) ? response : [];
        this.groups.set(groupsData);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.groups.set([]);
      }
    });
  }
  onGroupChange(event) {
    const groupId = event?.value || null;
    const groupName = groupId ? this.groups().find((g) => g.id === groupId)?.name || null : null;
    this.groupSelect.emit({ groupId, groupName });
  }
  static \u0275fac = function PropertyGroupDropdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertyGroupDropdownComponent)(\u0275\u0275directiveInject(HttpClient));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PropertyGroupDropdownComponent, selectors: [["app-property-group-dropdown"]], inputs: { selectedGroupId: "selectedGroupId" }, outputs: { groupSelect: "groupSelect" }, decls: 1, vars: 1, consts: [[3, "changeOption", "config"]], template: function PropertyGroupDropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-select", 0);
      \u0275\u0275listener("changeOption", function PropertyGroupDropdownComponent_Template_app_select_changeOption_0_listener($event) {
        return ctx.onGroupChange($event);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("config", ctx.selectConfig());
    }
  }, dependencies: [CommonModule, SelectComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertyGroupDropdownComponent, [{
    type: Component,
    args: [{ selector: "app-property-group-dropdown", standalone: true, imports: [CommonModule, SelectComponent], template: `
    <app-select
      [config]="selectConfig()"
      (changeOption)="onGroupChange($event)">
    </app-select>
  ` }]
  }], () => [{ type: HttpClient }], { selectedGroupId: [{
    type: Input
  }], groupSelect: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PropertyGroupDropdownComponent, { className: "PropertyGroupDropdownComponent", filePath: "src/app/features/properties/components/property-group-dropdown/property-group-dropdown.component.ts", lineNumber: 26 });
})();

// src/app/features/properties/components/property-status-dropdown/property-status-dropdown.component.ts
var PropertyStatusDropdownComponent = class _PropertyStatusDropdownComponent {
  selectedStatus = null;
  statusSelect = new EventEmitter();
  statusOptions = [
    { value: "disponible", label: "Disponible" },
    { value: "vendido", label: "Vendido" },
    { value: "reservado", label: "Reservado" },
    { value: "cancelado", label: "Cancelado" }
  ];
  selectConfig() {
    return {
      placeholder: "Filtrar por estado",
      data: this.statusOptions,
      value: "value",
      option: "label",
      form_control: null,
      loading: false,
      all: true,
      all_message: "Todos los estados",
      value_default: this.selectedStatus
    };
  }
  onStatusChange(event) {
    const status = event?.value || null;
    this.statusSelect.emit({ status });
  }
  static \u0275fac = function PropertyStatusDropdownComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertyStatusDropdownComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PropertyStatusDropdownComponent, selectors: [["app-property-status-dropdown"]], inputs: { selectedStatus: "selectedStatus" }, outputs: { statusSelect: "statusSelect" }, decls: 1, vars: 1, consts: [[3, "changeOption", "config"]], template: function PropertyStatusDropdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-select", 0);
      \u0275\u0275listener("changeOption", function PropertyStatusDropdownComponent_Template_app_select_changeOption_0_listener($event) {
        return ctx.onStatusChange($event);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("config", ctx.selectConfig());
    }
  }, dependencies: [CommonModule, SelectComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertyStatusDropdownComponent, [{
    type: Component,
    args: [{ selector: "app-property-status-dropdown", standalone: true, imports: [CommonModule, SelectComponent], template: `
    <app-select
      [config]="selectConfig()"
      (changeOption)="onStatusChange($event)">
    </app-select>
  ` }]
  }], null, { selectedStatus: [{
    type: Input
  }], statusSelect: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PropertyStatusDropdownComponent, { className: "PropertyStatusDropdownComponent", filePath: "src/app/features/properties/components/property-status-dropdown/property-status-dropdown.component.ts", lineNumber: 23 });
})();

// src/app/features/properties/pages/properties-list/properties-list.component.ts
var _c0 = ["tableTemplate"];
function PropertiesListComponent_ng_template_12_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "span", 17);
    \u0275\u0275listener("click", function PropertiesListComponent_ng_template_12_div_10_Template_span_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const item_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.navigateToCustomer(item_r4));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r4.getOwnerName(item_r4), " ");
  }
}
function PropertiesListComponent_ng_template_12_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function PropertiesListComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "span", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 14);
    \u0275\u0275listener("click", function PropertiesListComponent_ng_template_12_Template_td_click_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(10, PropertiesListComponent_ng_template_12_div_10_Template, 3, 1, "div", 15)(11, PropertiesListComponent_ng_template_12_ng_template_11_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td")(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "td", 14);
    \u0275\u0275listener("click", function PropertiesListComponent_ng_template_12_Template_td_click_21_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(22, "app-button", 16);
    \u0275\u0275listener("clicked", function PropertiesListComponent_ng_template_12_Template_app_button_clicked_22_listener() {
      const item_r4 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.editProperty(item_r4));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const noOwner_r6 = \u0275\u0275reference(12);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r4.code, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.block || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((item_r4.group == null ? null : item_r4.group.name) || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r4.hasOwner(item_r4))("ngIfElse", noOwner_r6);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", item_r4.total_area, " ", (item_r4.measurement_unit == null ? null : item_r4.measurement_unit.symbol) || "m\xB2");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 14, item_r4.total_price, item_r4.currency));
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r4.getStatusClass(item_r4.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.getStatusLabel(item_r4.status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("fullWidth", false)("icon", ctx_r4.ArrowRight);
  }
}
var PropertiesListComponent = class _PropertiesListComponent {
  router;
  route;
  propertyService;
  dialog;
  tableTemplate;
  table_config = signal({
    rows: [],
    columns: [
      { name: "C\xF3digo", prop: "code", sortable: true, canAutoResize: true },
      { name: "Manzana", prop: "block", sortable: true, canAutoResize: true },
      { name: "Nombre", prop: "name", sortable: true, canAutoResize: true },
      { name: "Proyecto", prop: "group", sortable: false, canAutoResize: true },
      { name: "Cliente", prop: "contracts", sortable: false, canAutoResize: true },
      { name: "\xC1rea", prop: "total_area", sortable: true, canAutoResize: true },
      { name: "Precio", prop: "total_price", sortable: true, canAutoResize: true },
      { name: "Estado", prop: "status", sortable: true, canAutoResize: true },
      { name: "Acciones", prop: "actions", sortable: false, canAutoResize: true }
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron lotes" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  ArrowRight = ArrowRight;
  search = "";
  selectedGroupId = null;
  selectedGroupName = null;
  selectedStatus = null;
  currentSort = null;
  destroy$ = new Subject();
  lastQueryParams = "";
  constructor(router, route, propertyService, dialog) {
    this.router = router;
    this.route = route;
    this.propertyService = propertyService;
    this.dialog = dialog;
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;
      this.search = query?.search ?? "";
      this.selectedGroupId = query?.groupId ?? null;
      this.selectedStatus = query?.status ?? null;
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit
      }));
      this.getProperties();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getProperties() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const config = this.table_config();
    let data = __spreadValues(__spreadValues(__spreadValues(__spreadValues({
      page: config.page,
      limit: config.limit
    }, this.search && { search: this.search }), this.selectedGroupId && { groupId: this.selectedGroupId }), this.selectedStatus && { status: this.selectedStatus }), this.currentSort && this.currentSort.direction && {
      sort: this.currentSort.column.prop,
      order: this.currentSort.direction
    });
    this.propertyService.getProperties(data).subscribe((res) => {
      const properties = Array.isArray(res) ? res : res?.data ?? [];
      const total = Array.isArray(res) ? res.length : res?.total ?? 0;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        rows: properties,
        totalResults: total,
        hasNext: res?.hasNext ?? false,
        loading: false
      }));
    });
  }
  onPageChange(event) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.page,
        limit: event.limit,
        search: this.search || void 0,
        groupId: this.selectedGroupId || void 0,
        status: this.selectedStatus || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onSortChange(event) {
    this.currentSort = event;
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { page: 1 }));
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: this.search || void 0,
        groupId: this.selectedGroupId || void 0,
        status: this.selectedStatus || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onRowClick(event) {
    const row = event?.data || event;
    this.editProperty(row);
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: searchTerm || void 0,
        groupId: this.selectedGroupId || void 0,
        status: this.selectedStatus || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onGroupSelect(event) {
    this.selectedGroupId = event.groupId;
    this.selectedGroupName = event.groupName;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        groupId: event.groupId || void 0,
        search: this.search || void 0,
        status: this.selectedStatus || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  onStatusSelect(event) {
    this.selectedStatus = event.status;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        status: event.status || void 0,
        search: this.search || void 0,
        groupId: this.selectedGroupId || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  createProperty() {
    this.dialog.open(PropertyEditModalComponent, {
      data: { property: null }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getProperties();
      }
    });
  }
  editProperty(property) {
    console.log("Opening edit modal for property:", property);
    this.dialog.open(PropertyEditModalComponent, {
      data: { property },
      width: "700px",
      maxWidth: "90vw"
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getProperties();
      }
    });
  }
  viewDetail(row) {
    this.router.navigate(["/properties/detail", row.id]);
  }
  getStatusClass(status) {
    const statusMap = {
      "disponible": "bg-green-100 text-green-800",
      "vendido": "bg-blue-100 text-blue-800",
      "reservado": "bg-orange-100 text-orange-800",
      "cancelado": "bg-red-100 text-red-800"
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status] || "bg-gray-100 text-gray-800"}`;
  }
  getStatusLabel(status) {
    const labels = {
      "disponible": "Disponible",
      "vendido": "Vendido",
      "reservado": "Reservado",
      "cancelado": "Cancelado"
    };
    return labels[status] || status;
  }
  getOwnerName(property) {
    const owner = property.contracts?.[0]?.customer;
    if (!owner)
      return "\u2014";
    const firstLastname = owner.lastname?.split(" ")[0] || "";
    return `${owner.name} ${firstLastname}`.trim();
  }
  hasOwner(property) {
    return !!(property.contracts && property.contracts.length > 0 && property.contracts[0].customer);
  }
  navigateToCustomer(property) {
    const customerId = property.contracts?.[0]?.customer?.id;
    if (customerId) {
      this.router.navigate(["/customers/detail", customerId]);
    }
  }
  static \u0275fac = function PropertiesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PropertiesListComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PropertiesListComponent, selectors: [["app-properties-list"]], viewQuery: function PropertiesListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 14, vars: 5, consts: [["tableTemplate", ""], ["noOwner", ""], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-end"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center"], [3, "groupSelect", "selectedGroupId"], [3, "statusSelect", "selectedStatus"], [1, "flex", "items-center", "gap-3"], ["param_name", "search", 1, "w-64", 3, "searchChange", "param_activate"], ["text", "Crear Lote", "custom_class", "btn_primary", 3, "clicked"], [3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "whitespace-nowrap"], [3, "click"], [4, "ngIf", "ngIfElse"], ["text", "Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "whitespace-nowrap", "cursor-pointer", "hover:bg-blue-200", "transition-colors", 3, "click"], [1, "text-sm", "text-gray-400"]], template: function PropertiesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2", 4);
      \u0275\u0275text(3, "Lotes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "app-property-group-dropdown", 7);
      \u0275\u0275listener("groupSelect", function PropertiesListComponent_Template_app_property_group_dropdown_groupSelect_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onGroupSelect($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "app-property-status-dropdown", 8);
      \u0275\u0275listener("statusSelect", function PropertiesListComponent_Template_app_property_status_dropdown_statusSelect_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onStatusSelect($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 9)(9, "app-search", 10);
      \u0275\u0275listener("searchChange", function PropertiesListComponent_Template_app_search_searchChange_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "app-button", 11);
      \u0275\u0275listener("clicked", function PropertiesListComponent_Template_app_button_clicked_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createProperty());
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(11, "app-datatable-wrapper", 12);
      \u0275\u0275listener("pageChange", function PropertiesListComponent_Template_app_datatable_wrapper_pageChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function PropertiesListComponent_Template_app_datatable_wrapper_sortChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function PropertiesListComponent_Template_app_datatable_wrapper_rowClick_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onRowClick($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(12, PropertiesListComponent_ng_template_12_Template, 23, 17, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r7 = \u0275\u0275reference(13);
      \u0275\u0275advance(6);
      \u0275\u0275property("selectedGroupId", ctx.selectedGroupId);
      \u0275\u0275advance();
      \u0275\u0275property("selectedStatus", ctx.selectedStatus);
      \u0275\u0275advance(2);
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r7);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    PropertyGroupDropdownComponent,
    PropertyStatusDropdownComponent,
    CurrencyPipe
  ], styles: ["\n\n/*# sourceMappingURL=properties-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PropertiesListComponent, [{
    type: Component,
    args: [{ selector: "app-properties-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent,
      PropertyGroupDropdownComponent,
      PropertyStatusDropdownComponent
    ], template: `<div class="px-4">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <h2 class="text-2xl font-semibold text-gray-800">Lotes</h2>\r
\r
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">\r
      <!-- Filters -->\r
      <div class="flex flex-col gap-3 md:flex-row md:items-center">\r
        <app-property-group-dropdown\r
          [selectedGroupId]="selectedGroupId"\r
          (groupSelect)="onGroupSelect($event)">\r
        </app-property-group-dropdown>\r
\r
        <app-property-status-dropdown\r
          [selectedStatus]="selectedStatus"\r
          (statusSelect)="onStatusSelect($event)">\r
        </app-property-status-dropdown>\r
      </div>\r
\r
      <!-- Search + Button -->\r
      <div class="flex items-center gap-3">\r
        <app-search\r
          class="w-64"\r
          [param_activate]="true"\r
          param_name="search"\r
          (searchChange)="onSearchChange($event)">\r
        </app-search>\r
\r
        <app-button\r
          text="Crear Lote"\r
          custom_class="btn_primary"\r
          (clicked)="createProperty()">\r
        </app-button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate"\r
    (pageChange)="onPageChange($event)"\r
    (sortChange)="onSortChange($event)"\r
    (rowClick)="onRowClick($event)">\r
  </app-datatable-wrapper>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">\r
      {{ item.code }}\r
    </span>\r
  </td>\r
  <td>{{ item.block || '\u2014' }}</td>\r
  <td>{{ item.name }}</td>\r
  <td>{{ item.group?.name || '\u2014' }}</td>\r
  <td (click)="$event.stopPropagation()">\r
    <div *ngIf="hasOwner(item); else noOwner">\r
      <span \r
        (click)="navigateToCustomer(item)"\r
        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 whitespace-nowrap cursor-pointer hover:bg-blue-200 transition-colors">\r
        {{ getOwnerName(item) }}\r
      </span>\r
    </div>\r
    <ng-template #noOwner>\r
      <span class="text-sm text-gray-400">\u2014</span>\r
    </ng-template>\r
  </td>\r
  <td>{{ item.total_area }} {{ item.measurement_unit?.symbol || 'm\xB2' }}</td>\r
  <td>{{ item.total_price | currency:item.currency }}</td>\r
  <td>\r
    <span [class]="getStatusClass(item.status)">\r
      {{ getStatusLabel(item.status) }}\r
    </span>\r
  </td>\r
  <td (click)="$event.stopPropagation()">\r
    <app-button\r
      text="Detalle"\r
      size="sm"\r
      [fullWidth]="false"\r
      custom_class="btn_primary"\r
      (clicked)="editProperty(item)"\r
      [icon]="ArrowRight">\r
    </app-button>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/properties/pages/properties-list/properties-list.component.scss */\n/*# sourceMappingURL=properties-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: PropertyService }, { type: MatDialog }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PropertiesListComponent, { className: "PropertiesListComponent", filePath: "src/app/features/properties/pages/properties-list/properties-list.component.ts", lineNumber: 31 });
})();
export {
  PropertiesListComponent
};
//# sourceMappingURL=chunk-B5GPYKVH.js.map
