import {
  ContractService
} from "./chunk-4OJSQQ2S.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-PYPM5BT2.js";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "./chunk-7BUZEU6Z.js";
import {
  PropertyEditModalComponent,
  PropertyService
} from "./chunk-A7EHO6MT.js";
import {
  UserService
} from "./chunk-KUHTQ3XH.js";
import {
  GroupSelectComponent,
  LeadService
} from "./chunk-6TS4YTOW.js";
import {
  CustomerEditModalComponent
} from "./chunk-ICUJPGZG.js";
import {
  CustomerService
} from "./chunk-MQPBVVXA.js";
import {
  CONTRACT_CREATE_DIALOG_CONFIG,
  CUSTOMER_FORM_DIALOG_CONFIG,
  PROPERTY_FORM_DIALOG_CONFIG
} from "./chunk-OF4HYHND.js";
import "./chunk-N7SBDJ32.js";
import "./chunk-UWLWJ5OR.js";
import {
  SearchComponent
} from "./chunk-7XQ3OKZP.js";
import {
  DatatableWrapperComponent
} from "./chunk-E6XUO6IC.js";
import "./chunk-Y7ULKCBD.js";
import {
  SelectComponent
} from "./chunk-FJKKJVBI.js";
import {
  InterceptorService
} from "./chunk-6CHEJEJW.js";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-X4R6VVPV.js";
import {
  InputComponent
} from "./chunk-ESTBWOCJ.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-5M3EQ6HX.js";
import {
  ButtonComponent
} from "./chunk-QII3XD7X.js";
import "./chunk-CDP25QD6.js";
import "./chunk-YTYO4VTK.js";
import "./chunk-4K6KH37Z.js";
import {
  ArrowRight,
  CircleAlert,
  Download,
  Funnel,
  LucideAngularComponent,
  LucideAngularModule,
  Search,
  X
} from "./chunk-SNZEVNJV.js";
import "./chunk-QU2SCCOO.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-YUPXBHST.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-FGZNYMY3.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Subject,
  ViewChild,
  __spreadProps,
  __spreadValues,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  fromEvent,
  setClassMetadata,
  signal,
  startWith,
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
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-XEFUC5ED.js";

// src/app/features/contracts/components/contract-create-modal/contract-create-modal.component.ts
var _c0 = ["customerAutocompleteTrigger"];
var _c1 = ["propertyAutocompleteTrigger"];
var _c2 = ["sellerAutocompleteTrigger"];
var _c3 = ["leadAutocompleteTrigger"];
var _c4 = ["modalBody"];
function ContractCreateModalComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function ContractCreateModalComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, " Selecciona un cliente ");
    \u0275\u0275elementEnd();
  }
}
function ContractCreateModalComponent_mat_option_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 51);
    \u0275\u0275listener("onSelectionChange", function ContractCreateModalComponent_mat_option_24_Template_mat_option_onSelectionChange_0_listener() {
      const customer_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onCustomerSelected(customer_r3));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const customer_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("value", customer_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.displayCustomer(customer_r3), " ");
  }
}
function ContractCreateModalComponent_mat_option_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 52)(1, "span", 53);
    \u0275\u0275text(2, "No se encontraron clientes");
    \u0275\u0275elementEnd()();
  }
}
function ContractCreateModalComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function ContractCreateModalComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, " Selecciona un lote ");
    \u0275\u0275elementEnd();
  }
}
function ContractCreateModalComponent_mat_option_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 51);
    \u0275\u0275listener("onSelectionChange", function ContractCreateModalComponent_mat_option_41_Template_mat_option_onSelectionChange_0_listener() {
      const property_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPropertySelected(property_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const property_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("value", property_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.displayProperty(property_r6), " ");
  }
}
function ContractCreateModalComponent_mat_option_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 52)(1, "span", 53);
    \u0275\u0275text(2, "No hay lotes disponibles");
    \u0275\u0275elementEnd()();
  }
}
function ContractCreateModalComponent_mat_option_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 51);
    \u0275\u0275listener("onSelectionChange", function ContractCreateModalComponent_mat_option_53_Template_mat_option_onSelectionChange_0_listener() {
      const seller_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onSellerSelected(seller_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const seller_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("value", seller_r8);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.displaySeller(seller_r8), " ");
  }
}
function ContractCreateModalComponent_mat_option_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 52)(1, "span", 53);
    \u0275\u0275text(2, "No se encontraron vendedores");
    \u0275\u0275elementEnd()();
  }
}
function ContractCreateModalComponent_mat_option_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 51);
    \u0275\u0275listener("onSelectionChange", function ContractCreateModalComponent_mat_option_67_Template_mat_option_onSelectionChange_0_listener() {
      const lead_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onLeadSelected(lead_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const lead_r10 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("value", lead_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.displayLead(lead_r10), " ");
  }
}
function ContractCreateModalComponent_mat_option_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 52)(1, "span", 53);
    \u0275\u0275text(2, "No se encontraron leads");
    \u0275\u0275elementEnd()();
  }
}
function ContractCreateModalComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Habilita la pesta\xF1a de enganche en el detalle. Puedes registrar abonos y generar cuotas despu\xE9s; no hace falta definir meses ni fechas aqu\xED. ");
  }
}
function ContractCreateModalComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " El enganche se descuenta del precio total al crear el contrato. ");
  }
}
function ContractCreateModalComponent_Conditional_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-input", 38);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Enganche *")("placeholder", "Ej. 0 o 36,000")("form_control", ctx_r3.form.get("down_payment"))("type", "text");
  }
}
function ContractCreateModalComponent_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-input", 38);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("label", "Meta de enganche (opcional)")("placeholder", "Dejar en 0 si a\xFAn no la conocen")("form_control", ctx_r3.form.get("down_payment"))("type", "text");
  }
}
function ContractCreateModalComponent_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 42);
    \u0275\u0275text(1, " Diferencia del lote despu\xE9s de liquidar el enganche. Si la meta es 0, equivale al precio total. ");
    \u0275\u0275elementEnd();
  }
}
function parseContractAmount(value) {
  if (value === null || value === void 0)
    return 0;
  if (typeof value === "number" && Number.isFinite(value))
    return value;
  const raw = String(value).trim().replace(/\s/g, "").replace(/\u00a0/g, "");
  if (!raw)
    return 0;
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(raw)) {
    return parseFloat(raw.replace(/,/g, "")) || 0;
  }
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(raw)) {
    const withoutThousands = raw.replace(/\./g, "");
    return parseFloat(withoutThousands.replace(",", ".")) || 0;
  }
  if (/^\d+,\d{1,2}$/.test(raw)) {
    return parseFloat(raw.replace(",", ".")) || 0;
  }
  const fallback = raw.replace(/,/g, "");
  const n = parseFloat(fallback);
  return Number.isFinite(n) ? n : 0;
}
function contractMoneyValidator(control) {
  const raw = control.value;
  if (raw === null || raw === void 0 || typeof raw === "string" && raw.trim() === "") {
    return { required: true };
  }
  const n = parseContractAmount(raw);
  if (!Number.isFinite(n) || n < 0) {
    return { min: true };
  }
  return null;
}
function contractMoneyOptionalValidator(control) {
  const raw = control.value;
  if (raw === null || raw === void 0 || typeof raw === "string" && raw.trim() === "") {
    return null;
  }
  const n = parseContractAmount(raw);
  if (!Number.isFinite(n) || n < 0) {
    return { min: true };
  }
  return null;
}
var ContractCreateModalComponent = class _ContractCreateModalComponent {
  fb;
  dialogRef;
  contractService;
  customerService;
  propertyService;
  userService;
  interceptorService;
  dialog;
  leadService;
  X = X;
  customerAutocompleteTrigger;
  propertyAutocompleteTrigger;
  sellerAutocompleteTrigger;
  leadAutocompleteTrigger;
  modalBody;
  // Signals para estado reactivo
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  customers = signal([], ...ngDevMode ? [{ debugName: "customers" }] : []);
  filteredCustomers = signal([], ...ngDevMode ? [{ debugName: "filteredCustomers" }] : []);
  properties = signal([], ...ngDevMode ? [{ debugName: "properties" }] : []);
  filteredProperties = signal([], ...ngDevMode ? [{ debugName: "filteredProperties" }] : []);
  sellers = signal([], ...ngDevMode ? [{ debugName: "sellers" }] : []);
  filteredSellers = signal([], ...ngDevMode ? [{ debugName: "filteredSellers" }] : []);
  leads = signal([], ...ngDevMode ? [{ debugName: "leads" }] : []);
  filteredLeads = signal([], ...ngDevMode ? [{ debugName: "filteredLeads" }] : []);
  propertyListPrice = signal(null, ...ngDevMode ? [{ debugName: "propertyListPrice" }] : []);
  // Signals para valores formateados
  formattedRemainingBalance = signal("0.00", ...ngDevMode ? [{ debugName: "formattedRemainingBalance" }] : []);
  formattedMonthlyPayment = signal("0.00", ...ngDevMode ? [{ debugName: "formattedMonthlyPayment" }] : []);
  // Formulario reactivo
  form;
  // Configuraciones para selects
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
  statusSelectConfig = {
    placeholder: "Selecciona un estado",
    data: [
      { value: "activo", label: "Activo" },
      { value: "completado", label: "Completado" },
      { value: "cancelado", label: "Cancelado" },
      { value: "suspendido", label: "Suspendido" }
    ],
    value: "value",
    option: "label",
    form_control: null
  };
  constructor(fb, dialogRef, contractService, customerService, propertyService, userService, interceptorService, dialog, leadService) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.contractService = contractService;
    this.customerService = customerService;
    this.propertyService = propertyService;
    this.userService = userService;
    this.interceptorService = interceptorService;
    this.dialog = dialog;
    this.leadService = leadService;
    this.form = this.fb.group({
      // Búsqueda y selección
      customer_search: [""],
      customer_id: [null, Validators.required],
      property_search: [""],
      property_id: ["", Validators.required],
      seller_search: [""],
      seller_id: [null],
      lead_search: [""],
      lead_id: [null],
      lead_group_id: [null],
      list_price: [null, [contractMoneyOptionalValidator]],
      // Datos del contrato
      contract_date: [this.getTodayDate(), Validators.required],
      total_price: [0, [contractMoneyValidator]],
      down_payment: [0, [contractMoneyValidator]],
      payment_months: [1, [Validators.required, Validators.min(1)]],
      first_payment_date: ["", Validators.required],
      currency: ["MXN", Validators.required],
      status: ["activo", Validators.required],
      notes: [""],
      // Campos calculados (readonly en UI)
      remaining_balance: [{ value: 0, disabled: true }],
      monthly_payment: [{ value: 0, disabled: true }],
      // Enganche financiado: solo habilita la pestaña; cuotas se generan en detalle
      down_payment_financed: [false]
    });
    this.currencySelectConfig.form_control = this.form.get("currency");
    this.statusSelectConfig.form_control = this.form.get("status");
  }
  ngOnInit() {
    this.initializeForm();
    this.setupCalculations();
    this.setupDownPaymentFinancingRules();
    this.loadInitialData();
  }
  /** Al financiar enganche: meta opcional (puede ser 0); sin meses/fechas en el alta. */
  setupDownPaymentFinancingRules() {
    const financed = this.form.get("down_payment_financed");
    const downPayment = this.form.get("down_payment");
    const apply = (isFinanced) => {
      if (isFinanced) {
        downPayment.setValidators([contractMoneyOptionalValidator]);
      } else {
        downPayment.setValidators([contractMoneyValidator]);
      }
      downPayment.updateValueAndValidity({ emitEvent: false });
    };
    apply(!!financed.value);
    financed.valueChanges.subscribe((v) => apply(!!v));
  }
  ngAfterViewInit() {
    if (this.modalBody) {
      fromEvent(this.modalBody.nativeElement, "scroll").subscribe(() => {
        if (this.customerAutocompleteTrigger?.panelOpen) {
          this.customerAutocompleteTrigger.closePanel();
        }
        if (this.propertyAutocompleteTrigger?.panelOpen) {
          this.propertyAutocompleteTrigger.closePanel();
        }
      });
    }
  }
  getTodayDate() {
    const today = /* @__PURE__ */ new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  initializeForm() {
    this.form.get("customer_search").valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      this.filterCustomers(searchTerm || "");
    });
    this.form.get("property_search").valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      this.filterProperties(searchTerm || "");
    });
    this.form.get("seller_search").valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      this.filterSellers(searchTerm || "");
    });
    this.form.get("lead_search").valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchTerm) => {
      this.filterLeads(searchTerm || "");
    });
  }
  setupCalculations() {
    combineLatest([
      this.form.get("total_price").valueChanges.pipe(startWith(this.form.get("total_price").value)),
      this.form.get("down_payment").valueChanges.pipe(startWith(this.form.get("down_payment").value)),
      this.form.get("down_payment_financed").valueChanges.pipe(startWith(this.form.get("down_payment_financed").value))
    ]).subscribe(() => {
      this.calculateRemainingBalance();
    });
    combineLatest([
      this.form.get("remaining_balance").valueChanges.pipe(startWith(this.form.get("remaining_balance").value)),
      this.form.get("payment_months").valueChanges.pipe(startWith(this.form.get("payment_months").value))
    ]).subscribe(() => {
      this.calculateMonthlyPayment();
    });
  }
  loadInitialData() {
    forkJoin({
      customers: this.customerService.getCustomers({ limit: 100 }),
      properties: this.propertyService.getProperties({ status: "disponible", limit: 100 }),
      sellers: this.userService.getUsers()
    }).subscribe({
      next: ({ customers, properties, sellers }) => {
        let customerData = [];
        if (customers.data) {
          customerData = customers.data;
        } else if (Array.isArray(customers)) {
          customerData = customers;
        } else if (customers.results) {
          customerData = customers.results;
        }
        this.customers.set(customerData);
        this.filteredCustomers.set(customerData);
        let propertyData = [];
        if (properties.data) {
          propertyData = properties.data;
        } else if (Array.isArray(properties)) {
          propertyData = properties;
        } else if (properties.results) {
          propertyData = properties.results;
        }
        this.properties.set(propertyData);
        this.filteredProperties.set(propertyData);
        let sellerData = [];
        if (sellers && Array.isArray(sellers)) {
          sellerData = sellers;
        }
        this.sellers.set(sellerData);
        this.filteredSellers.set(sellerData);
      },
      error: (err) => {
        console.error("Error loading initial data:", err);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los datos iniciales"
        });
      }
    });
  }
  loadCustomers() {
    this.customerService.getCustomers({ limit: 100 }).subscribe({
      next: (response) => {
        let customerData = [];
        if (response.data) {
          customerData = response.data;
        } else if (Array.isArray(response)) {
          customerData = response;
        } else if (response.results) {
          customerData = response.results;
        }
        this.customers.set(customerData);
        this.filteredCustomers.set(customerData);
      },
      error: (err) => {
        console.error("Error loading customers:", err);
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar los clientes"
        });
      }
    });
  }
  loadAvailableProperties() {
    this.propertyService.getProperties({ status: "disponible" }).subscribe({
      next: (response) => {
        const propertyData = response.data || response;
        this.properties.set(propertyData);
        this.filteredProperties.set(propertyData);
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: "No se pudieron cargar las propiedades"
        });
      }
    });
  }
  filterCustomers(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.customerService.getCustomers({ limit: 100 }).subscribe({
        next: (response) => {
          let customerData = [];
          if (response.data) {
            customerData = response.data;
          } else if (Array.isArray(response)) {
            customerData = response;
          } else if (response.results) {
            customerData = response.results;
          }
          this.filteredCustomers.set(customerData);
        },
        error: (err) => {
          console.error("Error loading customers:", err);
        }
      });
      return;
    }
    this.customerService.getCustomers({ search: searchTerm.trim(), limit: 100 }).subscribe({
      next: (response) => {
        let customerData = [];
        if (response.data) {
          customerData = response.data;
        } else if (Array.isArray(response)) {
          customerData = response;
        } else if (response.results) {
          customerData = response.results;
        }
        this.filteredCustomers.set(customerData);
      },
      error: (err) => {
        console.error("Error searching customers:", err);
        this.filteredCustomers.set([]);
      }
    });
  }
  filterProperties(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.filteredProperties.set(this.properties());
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = this.properties().filter((property) => property.code.toLowerCase().includes(term) || property.name.toLowerCase().includes(term) || property.block.toLowerCase().includes(term));
    this.filteredProperties.set(filtered);
  }
  filterSellers(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.filteredSellers.set(this.sellers());
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = this.sellers().filter((seller) => seller.first_name?.toLowerCase().includes(term) || "" || (seller.last_name?.toLowerCase().includes(term) || "") || (seller.email?.toLowerCase().includes(term) || ""));
    this.filteredSellers.set(filtered);
  }
  onCustomerSelected(customer) {
    this.form.patchValue({
      customer_id: customer.id
    });
  }
  onPropertySelected(property) {
    const listPrice = property.list_price ?? property.total_price ?? null;
    this.propertyListPrice.set(listPrice);
    this.form.patchValue({
      property_id: property.id,
      total_price: property.total_price,
      list_price: listPrice
    });
  }
  onLeadSelected(lead) {
    this.form.patchValue({
      lead_id: lead.id,
      lead_group_id: lead.group_id ?? this.form.get("lead_group_id").value
    });
  }
  displayLead(lead) {
    if (!lead)
      return "";
    const name = [lead.name, lead.lastname].filter(Boolean).join(" ");
    return name ? `${name} (${lead.email})` : lead.email;
  }
  filterLeads(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.leadService.getLeads({ limit: 50 }).subscribe({
        next: (response) => {
          const data = response.data ?? response.results ?? (Array.isArray(response) ? response : []);
          this.filteredLeads.set(data);
        },
        error: () => this.filteredLeads.set([])
      });
      return;
    }
    this.leadService.getLeads({ search: searchTerm.trim(), limit: 50 }).subscribe({
      next: (response) => {
        const data = response.data ?? response.results ?? (Array.isArray(response) ? response : []);
        this.filteredLeads.set(data);
      },
      error: () => this.filteredLeads.set([])
    });
  }
  get formattedPropertyListPrice() {
    const v = this.propertyListPrice();
    return v != null ? this.formatNumber(v) : "\u2014";
  }
  onSellerSelected(seller) {
    this.form.patchValue({
      seller_id: seller.id
    });
  }
  displaySeller(seller) {
    return seller ? `${seller.first_name} ${seller.last_name} (${seller.email})` : "";
  }
  openCreateCustomerModal() {
    const dialogRef = this.dialog.open(CustomerEditModalComponent, __spreadProps(__spreadValues({}, CUSTOMER_FORM_DIALOG_CONFIG), {
      data: { customer: null }
    }));
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCustomers();
      }
    });
  }
  calculateRemainingBalance() {
    const totalPrice = parseContractAmount(this.form.get("total_price").value);
    const downPayment = parseContractAmount(this.form.get("down_payment").value);
    const isFinanced = !!this.form.get("down_payment_financed").value;
    const remainingBalance = isFinanced ? downPayment > 0 ? totalPrice - downPayment : totalPrice : totalPrice - downPayment;
    this.form.get("remaining_balance").setValue(remainingBalance, { emitEvent: true });
    this.formattedRemainingBalance.set(this.formatNumber(remainingBalance));
  }
  get isDownPaymentFinanced() {
    return !!this.form.get("down_payment_financed")?.value;
  }
  calculateMonthlyPayment() {
    const remainingBalance = parseContractAmount(this.form.get("remaining_balance").value);
    const paymentMonths = Math.max(1, Math.round(parseContractAmount(this.form.get("payment_months").value) || 1));
    const monthlyPayment = paymentMonths > 0 ? remainingBalance / paymentMonths : 0;
    this.form.get("monthly_payment").setValue(monthlyPayment, { emitEvent: false });
    this.formattedMonthlyPayment.set(this.formatNumber(monthlyPayment));
  }
  displayCustomer(customer) {
    return customer ? `${customer.name} ${customer.lastname} (${customer.email})` : "";
  }
  displayProperty(property) {
    return property ? `${property.code} - ${property.name} (Mz: ${property.block}, ${property.total_price.toLocaleString()})` : "";
  }
  formatNumber(value) {
    if (value === null || value === void 0 || isNaN(value)) {
      return "0";
    }
    return value.toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.interceptorService.openSnackbar({
        type: "warning",
        title: "Advertencia",
        message: "Completa todos los campos obligatorios"
      });
      return;
    }
    const totalPrice = parseContractAmount(this.form.get("total_price").value);
    const downPayment = parseContractAmount(this.form.get("down_payment").value);
    if (downPayment > totalPrice) {
      this.interceptorService.openSnackbar({
        type: "error",
        title: "Error",
        message: "El enganche no puede ser mayor al precio total"
      });
      return;
    }
    const downPaymentFinanced = !!this.form.get("down_payment_financed").value;
    const payload = {
      customer_id: this.form.get("customer_id").value,
      property_id: this.form.get("property_id").value,
      seller_id: this.form.get("seller_id").value || void 0,
      contract_date: this.form.get("contract_date").value,
      total_price: parseContractAmount(this.form.get("total_price").value),
      down_payment: downPaymentFinanced ? 0 : parseContractAmount(this.form.get("down_payment").value),
      payment_months: Math.max(1, Math.round(parseContractAmount(this.form.get("payment_months").value) || 1)),
      first_payment_date: this.form.get("first_payment_date").value,
      currency: this.form.get("currency").value,
      status: this.form.get("status").value,
      notes: this.form.get("notes").value || void 0
    };
    if (downPaymentFinanced) {
      payload.down_payment_financed = true;
      const target = parseContractAmount(this.form.get("down_payment").value);
      if (target > 0) {
        payload.down_payment_target = target;
      }
    }
    const listPrice = parseContractAmount(this.form.get("list_price").value);
    if (listPrice > 0) {
      payload.list_price = listPrice;
    }
    const leadId = this.form.get("lead_id").value;
    if (leadId) {
      payload.lead_id = leadId;
    }
    const leadGroupId = this.form.get("lead_group_id").value;
    if (leadGroupId) {
      payload.lead_group_id = leadGroupId;
    }
    this.loading.set(true);
    this.contractService.createContract(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: "success",
          title: "\xC9xito",
          message: "Contrato creado correctamente"
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.loading.set(false);
        const message = err.error?.message || "No se pudo crear el contrato";
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
  static \u0275fac = function ContractCreateModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractCreateModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(ContractService), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(LeadService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractCreateModalComponent, selectors: [["app-contract-create-modal"]], viewQuery: function ContractCreateModalComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5, MatAutocompleteTrigger)(_c1, 5, MatAutocompleteTrigger)(_c2, 5, MatAutocompleteTrigger)(_c3, 5, MatAutocompleteTrigger)(_c4, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.customerAutocompleteTrigger = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.propertyAutocompleteTrigger = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sellerAutocompleteTrigger = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.leadAutocompleteTrigger = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.modalBody = _t.first);
    }
  }, decls: 113, vars: 79, consts: [["modalBody", ""], ["customerAutocompleteTrigger", "matAutocompleteTrigger"], ["autoCustomer", "matAutocomplete"], ["propertyAutocompleteTrigger", "matAutocompleteTrigger"], ["autoProperty", "matAutocomplete"], ["sellerAutocompleteTrigger", "matAutocompleteTrigger"], ["autoSeller", "matAutocomplete"], ["leadAutocompleteTrigger", "matAutocompleteTrigger"], ["autoLead", "matAutocomplete"], [1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-button", 3, "click"], [3, "img", "size"], [1, "modal-body"], [3, "formGroup"], [1, "section"], [1, "autocomplete-with-button"], [1, "autocomplete-field"], ["for", "customer-search", 1, "field-label"], [1, "text-red-500"], ["id", "customer-search", "type", "text", "formControlName", "customer_search", "placeholder", "Buscar por nombre, apellido o email", "aria-label", "Buscar cliente", "role", "combobox", "aria-expanded", "false", "aria-autocomplete", "list", 1, "autocomplete-input", 3, "matAutocomplete"], ["id", "customer-help-text", 1, "sr-only"], ["id", "customer-error", "role", "alert", 1, "mt-1", "text-sm", "text-red-600"], [3, "displayWith"], [3, "value", "onSelectionChange", 4, "ngFor", "ngForOf"], ["disabled", "", 4, "ngIf"], [3, "clicked", "text", "variant", "size", "fullWidth"], ["for", "property-search", 1, "field-label"], ["id", "property-search", "type", "text", "formControlName", "property_search", "placeholder", "Buscar por c\xF3digo, nombre o manzana", "aria-label", "Buscar propiedad", "role", "combobox", "aria-expanded", "false", "aria-autocomplete", "list", 1, "autocomplete-input", 3, "matAutocomplete"], ["id", "property-help-text", 1, "sr-only"], ["id", "property-error", "role", "alert", 1, "mt-1", "text-sm", "text-red-600"], ["for", "seller-search", 1, "field-label"], ["id", "seller-search", "type", "text", "formControlName", "seller_search", "placeholder", "Buscar por nombre o email", "aria-label", "Buscar vendedor", "role", "combobox", "aria-expanded", "false", "aria-autocomplete", "list", 1, "autocomplete-input", 3, "matAutocomplete"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4"], ["label", "Origen (grupo de lead)", "groupType", "lead", 3, "control"], ["for", "lead-search", 1, "field-label"], ["id", "lead-search", "type", "text", "formControlName", "lead_search", "placeholder", "Buscar lead por nombre o email", "aria-label", "Buscar lead", 1, "autocomplete-input", 3, "matAutocomplete"], [3, "label", "form_control", "type"], [3, "label", "placeholder", "form_control", "type"], [1, "w-full", "p-1"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "w-full", "rounded-lg", "border", "border-gray-300", "bg-gray-50", "px-3", "py-2", "text-sm", "text-gray-700"], [1, "mt-1", "text-xs", "text-gray-500"], [1, "col-span-1", "sm:col-span-2", "downpayment-financing"], [1, "financing-checkbox-label"], ["type", "checkbox", "formControlName", "down_payment_financed", 1, "financing-checkbox"], [1, "financing-hint"], [3, "label", "config"], [1, "mt-4"], [1, "modal-footer"], [3, "clicked", "text", "variant", "size", "fullWidth", "disabled", "loading"], [3, "onSelectionChange", "value"], ["disabled", ""], [1, "no-results-text"]], template: function ContractCreateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "h2");
      \u0275\u0275text(3, "Crear Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 11);
      \u0275\u0275listener("click", function ContractCreateModalComponent_Template_button_click_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.close());
      });
      \u0275\u0275element(5, "lucide-icon", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 13, 0)(8, "form", 14)(9, "div", 15)(10, "h3");
      \u0275\u0275text(11, "Cliente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 16)(13, "div", 17)(14, "label", 18);
      \u0275\u0275text(15, " Cliente * ");
      \u0275\u0275conditionalCreate(16, ContractCreateModalComponent_Conditional_16_Template, 2, 0, "span", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 20, 1);
      \u0275\u0275elementStart(19, "span", 21);
      \u0275\u0275text(20, "Busca clientes por nombre, apellido o email. Usa las flechas para navegar por los resultados.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, ContractCreateModalComponent_Conditional_21_Template, 2, 0, "p", 22);
      \u0275\u0275elementStart(22, "mat-autocomplete", 23, 2);
      \u0275\u0275template(24, ContractCreateModalComponent_mat_option_24_Template, 2, 2, "mat-option", 24)(25, ContractCreateModalComponent_mat_option_25_Template, 3, 0, "mat-option", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "app-button", 26);
      \u0275\u0275listener("clicked", function ContractCreateModalComponent_Template_app_button_clicked_26_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateCustomerModal());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 15)(28, "h3");
      \u0275\u0275text(29, "Propiedad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 17)(31, "label", 27);
      \u0275\u0275text(32, " Lote * ");
      \u0275\u0275conditionalCreate(33, ContractCreateModalComponent_Conditional_33_Template, 2, 0, "span", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "input", 28, 3);
      \u0275\u0275elementStart(36, "span", 29);
      \u0275\u0275text(37, "Busca propiedades disponibles por c\xF3digo, nombre o manzana. Usa las flechas para navegar por los resultados.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(38, ContractCreateModalComponent_Conditional_38_Template, 2, 0, "p", 30);
      \u0275\u0275elementStart(39, "mat-autocomplete", 23, 4);
      \u0275\u0275template(41, ContractCreateModalComponent_mat_option_41_Template, 2, 2, "mat-option", 24)(42, ContractCreateModalComponent_mat_option_42_Template, 3, 0, "mat-option", 25);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 15)(44, "h3");
      \u0275\u0275text(45, "Vendedor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 17)(47, "label", 31);
      \u0275\u0275text(48, " Vendido Por ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(49, "input", 32, 5);
      \u0275\u0275elementStart(51, "mat-autocomplete", 23, 6);
      \u0275\u0275template(53, ContractCreateModalComponent_mat_option_53_Template, 2, 2, "mat-option", 24)(54, ContractCreateModalComponent_mat_option_54_Template, 3, 0, "mat-option", 25);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "div", 15)(56, "h3");
      \u0275\u0275text(57, "Origen de venta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div", 33);
      \u0275\u0275element(59, "app-group-select", 34);
      \u0275\u0275elementStart(60, "div", 17)(61, "label", 35);
      \u0275\u0275text(62, "Lead vinculado (opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(63, "input", 36, 7);
      \u0275\u0275elementStart(65, "mat-autocomplete", 23, 8);
      \u0275\u0275template(67, ContractCreateModalComponent_mat_option_67_Template, 2, 2, "mat-option", 24)(68, ContractCreateModalComponent_mat_option_68_Template, 3, 0, "mat-option", 25);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(69, "div", 15)(70, "h3");
      \u0275\u0275text(71, "Datos del Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "div", 33);
      \u0275\u0275element(73, "app-input", 37)(74, "app-input", 38);
      \u0275\u0275elementStart(75, "div", 39)(76, "label", 40);
      \u0275\u0275text(77, "Precio lista del lote");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "div", 41);
      \u0275\u0275text(79);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "p", 42);
      \u0275\u0275text(81, "Desde el lote seleccionado; editable abajo.");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(82, "app-input", 38);
      \u0275\u0275elementStart(83, "div", 43)(84, "label", 44);
      \u0275\u0275element(85, "input", 45);
      \u0275\u0275elementStart(86, "span");
      \u0275\u0275text(87, "Financiar enganche en pagos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(88, "p", 46);
      \u0275\u0275conditionalCreate(89, ContractCreateModalComponent_Conditional_89_Template, 1, 0)(90, ContractCreateModalComponent_Conditional_90_Template, 1, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(91, ContractCreateModalComponent_Conditional_91_Template, 1, 4, "app-input", 38)(92, ContractCreateModalComponent_Conditional_92_Template, 1, 4, "app-input", 38);
      \u0275\u0275elementStart(93, "div", 39)(94, "label", 40);
      \u0275\u0275text(95);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(96, "div", 41);
      \u0275\u0275text(97);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(98, ContractCreateModalComponent_Conditional_98_Template, 2, 0, "p", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275element(99, "app-input", 38);
      \u0275\u0275elementStart(100, "div", 39)(101, "label", 40);
      \u0275\u0275text(102, " Pago Mensual ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "div", 41);
      \u0275\u0275text(104);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(105, "app-input", 37)(106, "app-select", 47)(107, "app-select", 47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "div", 48);
      \u0275\u0275element(109, "app-input", 38);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(110, "div", 49)(111, "app-button", 26);
      \u0275\u0275listener("clicked", function ContractCreateModalComponent_Template_app_button_clicked_111_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.close());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(112, "app-button", 50);
      \u0275\u0275listener("clicked", function ContractCreateModalComponent_Template_app_button_clicked_112_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submit());
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_12_0;
      let tmp_13_0;
      let tmp_15_0;
      let tmp_16_0;
      let tmp_17_0;
      let tmp_25_0;
      let tmp_26_0;
      let tmp_28_0;
      let tmp_29_0;
      let tmp_30_0;
      const autoCustomer_r11 = \u0275\u0275reference(23);
      const autoProperty_r12 = \u0275\u0275reference(40);
      const autoSeller_r13 = \u0275\u0275reference(52);
      const autoLead_r14 = \u0275\u0275reference(66);
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(((tmp_12_0 = ctx.form.get("customer_id")) == null ? null : tmp_12_0.invalid) && ((tmp_12_0 = ctx.form.get("customer_id")) == null ? null : tmp_12_0.touched) ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("error-border", ((tmp_13_0 = ctx.form.get("customer_id")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx.form.get("customer_id")) == null ? null : tmp_13_0.touched));
      \u0275\u0275property("matAutocomplete", autoCustomer_r11);
      \u0275\u0275attribute("aria-describedby", ((tmp_15_0 = ctx.form.get("customer_id")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx.form.get("customer_id")) == null ? null : tmp_15_0.touched) ? "customer-error" : "customer-help-text")("aria-invalid", ((tmp_16_0 = ctx.form.get("customer_id")) == null ? null : tmp_16_0.invalid) && ((tmp_16_0 = ctx.form.get("customer_id")) == null ? null : tmp_16_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(((tmp_17_0 = ctx.form.get("customer_id")) == null ? null : tmp_17_0.invalid) && ((tmp_17_0 = ctx.form.get("customer_id")) == null ? null : tmp_17_0.touched) ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayCustomer.bind(ctx));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredCustomers());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredCustomers().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("text", "Crear Cliente")("variant", "secondary")("size", "md")("fullWidth", false);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(((tmp_25_0 = ctx.form.get("property_id")) == null ? null : tmp_25_0.invalid) && ((tmp_25_0 = ctx.form.get("property_id")) == null ? null : tmp_25_0.touched) ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("error-border", ((tmp_26_0 = ctx.form.get("property_id")) == null ? null : tmp_26_0.invalid) && ((tmp_26_0 = ctx.form.get("property_id")) == null ? null : tmp_26_0.touched));
      \u0275\u0275property("matAutocomplete", autoProperty_r12);
      \u0275\u0275attribute("aria-describedby", ((tmp_28_0 = ctx.form.get("property_id")) == null ? null : tmp_28_0.invalid) && ((tmp_28_0 = ctx.form.get("property_id")) == null ? null : tmp_28_0.touched) ? "property-error" : "property-help-text")("aria-invalid", ((tmp_29_0 = ctx.form.get("property_id")) == null ? null : tmp_29_0.invalid) && ((tmp_29_0 = ctx.form.get("property_id")) == null ? null : tmp_29_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(((tmp_30_0 = ctx.form.get("property_id")) == null ? null : tmp_30_0.invalid) && ((tmp_30_0 = ctx.form.get("property_id")) == null ? null : tmp_30_0.touched) ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayProperty.bind(ctx));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredProperties());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredProperties().length === 0);
      \u0275\u0275advance(7);
      \u0275\u0275property("matAutocomplete", autoSeller_r13);
      \u0275\u0275advance(2);
      \u0275\u0275property("displayWith", ctx.displaySeller.bind(ctx));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredSellers());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredSellers().length === 0);
      \u0275\u0275advance(5);
      \u0275\u0275property("control", ctx.form.get("lead_group_id"));
      \u0275\u0275advance(4);
      \u0275\u0275property("matAutocomplete", autoLead_r14);
      \u0275\u0275advance(2);
      \u0275\u0275property("displayWith", ctx.displayLead.bind(ctx));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredLeads());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredLeads().length === 0);
      \u0275\u0275advance(5);
      \u0275\u0275property("label", "Fecha de Contrato *")("form_control", ctx.form.get("contract_date"))("type", "date");
      \u0275\u0275advance();
      \u0275\u0275property("label", "Precio Total *")("placeholder", "Ej. 36000 o 36,000")("form_control", ctx.form.get("total_price"))("type", "text");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.formattedPropertyListPrice, " ");
      \u0275\u0275advance(3);
      \u0275\u0275property("label", "Precio lista (override)")("placeholder", "Opcional \u2014 sobreescribe precio del lote")("form_control", ctx.form.get("list_price"))("type", "text");
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.isDownPaymentFinanced ? 89 : 90);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isDownPaymentFinanced ? 91 : 92);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.isDownPaymentFinanced ? "Saldo para pagos normales" : "Saldo Pendiente", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.formattedRemainingBalance(), " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isDownPaymentFinanced ? 98 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("label", "Meses de Pago *")("placeholder", "1")("form_control", ctx.form.get("payment_months"))("type", "number");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.formattedMonthlyPayment(), " ");
      \u0275\u0275advance();
      \u0275\u0275property("label", "Fecha Primer Pago *")("form_control", ctx.form.get("first_payment_date"))("type", "date");
      \u0275\u0275advance();
      \u0275\u0275property("label", "Moneda *")("config", ctx.currencySelectConfig);
      \u0275\u0275advance();
      \u0275\u0275property("label", "Estado *")("config", ctx.statusSelectConfig);
      \u0275\u0275advance(2);
      \u0275\u0275property("label", "Notas")("placeholder", "Notas adicionales (opcional)")("form_control", ctx.form.get("notes"))("type", "textarea");
      \u0275\u0275advance(2);
      \u0275\u0275property("text", "Cancelar")("variant", "secondary")("size", "md")("fullWidth", false);
      \u0275\u0275advance();
      \u0275\u0275property("text", "Crear Contrato")("variant", "primary")("size", "md")("fullWidth", false)("disabled", ctx.form.invalid || ctx.loading())("loading", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    CheckboxControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatDialogModule,
    MatAutocompleteModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    LucideAngularModule,
    LucideAngularComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    GroupSelectComponent
  ], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 900px;\n  max-height: 90dvh;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n}\n.modal-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: background-color 0.2s;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n}\n.downpayment-financing[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  background: #f9fafb;\n}\n.financing-checkbox-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #111827;\n  cursor: pointer;\n}\n.financing-checkbox[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  accent-color: #4f46e5;\n  flex-shrink: 0;\n}\n.financing-hint[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  font-size: 0.8125rem;\n  color: #6b7280;\n  line-height: 1.4;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 1rem 1.25rem;\n}\n.modal-body[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.75rem;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-with-button[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  align-items: stretch;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-with-button[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-with-button[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.625rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input.error-border[_ngcontent-%COMP%] {\n  border-color: #f87171;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input.error-border[_ngcontent-%COMP%]:focus {\n  border-color: #ef4444;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.modal-body[_ngcontent-%COMP%]   .no-results-text[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-style: italic;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column-reverse;\n  gap: 0.75rem;\n  padding: 1rem 1.25rem;\n  border-top: 1px solid #e5e7eb;\n  background: #f9fafb;\n}\n.modal-footer[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n}\n.grid-cols-1[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n@media (min-width: 640px) {\n  .modal-header[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .modal-body[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .modal-body[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%] {\n    margin-bottom: 2rem;\n  }\n  .modal-body[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n    margin-bottom: 1rem;\n  }\n  .modal-body[_ngcontent-%COMP%]   .autocomplete-with-button[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: 1rem;\n    align-items: flex-end;\n  }\n  .modal-body[_ngcontent-%COMP%]   .autocomplete-with-button[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%] {\n    width: auto;\n    flex-shrink: 0;\n  }\n  .modal-footer[_ngcontent-%COMP%] {\n    flex-direction: row;\n    justify-content: flex-end;\n    padding: 1.5rem;\n  }\n  .modal-footer[_ngcontent-%COMP%]   app-button[_ngcontent-%COMP%] {\n    width: auto;\n  }\n}\n@media (min-width: 640px) {\n  .sm\\:grid-cols-2[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .sm\\:col-span-2[_ngcontent-%COMP%] {\n    grid-column: span 2/span 2;\n  }\n}\n.gap-4[_ngcontent-%COMP%] {\n  gap: 1rem;\n}\n.mt-4[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n@media (max-width: 767px) {\n  .modal-container[_ngcontent-%COMP%] {\n    max-height: 100dvh;\n    height: 100dvh;\n  }\n}\n  .mat-mdc-autocomplete-panel {\n  background: white;\n  border-radius: 0.375rem;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e5e7eb;\n  max-height: 256px;\n  overflow-y: auto;\n}\n  .mat-mdc-autocomplete-panel .mat-mdc-option {\n  font-size: 0.875rem;\n  padding: 0.75rem 1rem;\n  min-height: 48px;\n}\n  .mat-mdc-autocomplete-panel .mat-mdc-option:hover {\n  background-color: #f3f4f6;\n}\n  .mat-mdc-autocomplete-panel .mat-mdc-option.mat-mdc-option-active, \n  .mat-mdc-autocomplete-panel .mat-mdc-option.mdc-list-item--selected {\n  background-color: #eef2ff;\n  color: #4f46e5;\n}\n  .mat-mdc-autocomplete-panel .mat-mdc-option .mdc-list-item__primary-text {\n  color: #374151;\n}\n/*# sourceMappingURL=contract-create-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractCreateModalComponent, [{
    type: Component,
    args: [{ selector: "app-contract-create-modal", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatAutocompleteModule,
      LucideAngularModule,
      ButtonComponent,
      InputComponent,
      SelectComponent,
      GroupSelectComponent
    ], template: `<div class="modal-container">\r
  <!-- Header -->\r
  <div class="modal-header">\r
    <h2>Crear Contrato</h2>\r
    <button type="button" (click)="close()" class="close-button">\r
      <lucide-icon [img]="X" [size]="20"></lucide-icon>\r
    </button>\r
  </div>\r
\r
  <!-- Body -->\r
  <div class="modal-body" #modalBody>\r
    <form [formGroup]="form">\r
      <!-- Secci\xF3n: Cliente -->\r
      <div class="section">\r
        <h3>Cliente</h3>\r
        <div class="autocomplete-with-button">\r
          <div class="autocomplete-field">\r
            <label for="customer-search" class="field-label">\r
              Cliente *\r
              @if (form.get('customer_id')?.invalid && form.get('customer_id')?.touched) {\r
                <span class="text-red-500">*</span>\r
              }\r
            </label>\r
            <input\r
              #customerAutocompleteTrigger="matAutocompleteTrigger"\r
              id="customer-search"\r
              type="text"\r
              formControlName="customer_search"\r
              placeholder="Buscar por nombre, apellido o email"\r
              class="autocomplete-input"\r
              [class.error-border]="form.get('customer_id')?.invalid && form.get('customer_id')?.touched"\r
              [matAutocomplete]="autoCustomer"\r
              aria-label="Buscar cliente"\r
              [attr.aria-describedby]="(form.get('customer_id')?.invalid && form.get('customer_id')?.touched) ? 'customer-error' : 'customer-help-text'"\r
              [attr.aria-invalid]="form.get('customer_id')?.invalid && form.get('customer_id')?.touched"\r
              role="combobox"\r
              aria-expanded="false"\r
              aria-autocomplete="list">\r
            <span id="customer-help-text" class="sr-only">Busca clientes por nombre, apellido o email. Usa las flechas para navegar por los resultados.</span>\r
            @if (form.get('customer_id')?.invalid && form.get('customer_id')?.touched) {\r
              <p id="customer-error" class="mt-1 text-sm text-red-600" role="alert">\r
                Selecciona un cliente\r
              </p>\r
            }\r
            <mat-autocomplete #autoCustomer="matAutocomplete" [displayWith]="displayCustomer.bind(this)">\r
              <mat-option *ngFor="let customer of filteredCustomers()" [value]="customer" (onSelectionChange)="onCustomerSelected(customer)">\r
                {{ displayCustomer(customer) }}\r
              </mat-option>\r
              <mat-option *ngIf="filteredCustomers().length === 0" disabled>\r
                <span class="no-results-text">No se encontraron clientes</span>\r
              </mat-option>\r
            </mat-autocomplete>\r
          </div>\r
          <app-button\r
            [text]="'Crear Cliente'"\r
            [variant]="'secondary'"\r
            [size]="'md'"\r
            [fullWidth]="false"\r
            (clicked)="openCreateCustomerModal()">\r
          </app-button>\r
        </div>\r
      </div>\r
\r
      <!-- Secci\xF3n: Propiedad -->\r
      <div class="section">\r
        <h3>Propiedad</h3>\r
        <div class="autocomplete-field">\r
          <label for="property-search" class="field-label">\r
            Lote *\r
            @if (form.get('property_id')?.invalid && form.get('property_id')?.touched) {\r
              <span class="text-red-500">*</span>\r
            }\r
          </label>\r
          <input\r
            #propertyAutocompleteTrigger="matAutocompleteTrigger"\r
            id="property-search"\r
            type="text"\r
            formControlName="property_search"\r
            placeholder="Buscar por c\xF3digo, nombre o manzana"\r
            class="autocomplete-input"\r
            [class.error-border]="form.get('property_id')?.invalid && form.get('property_id')?.touched"\r
            [matAutocomplete]="autoProperty"\r
            aria-label="Buscar propiedad"\r
            [attr.aria-describedby]="(form.get('property_id')?.invalid && form.get('property_id')?.touched) ? 'property-error' : 'property-help-text'"\r
            [attr.aria-invalid]="form.get('property_id')?.invalid && form.get('property_id')?.touched"\r
            role="combobox"\r
            aria-expanded="false"\r
            aria-autocomplete="list">\r
          <span id="property-help-text" class="sr-only">Busca propiedades disponibles por c\xF3digo, nombre o manzana. Usa las flechas para navegar por los resultados.</span>\r
          @if (form.get('property_id')?.invalid && form.get('property_id')?.touched) {\r
            <p id="property-error" class="mt-1 text-sm text-red-600" role="alert">\r
              Selecciona un lote\r
            </p>\r
          }\r
          <mat-autocomplete #autoProperty="matAutocomplete" [displayWith]="displayProperty.bind(this)">\r
            <mat-option *ngFor="let property of filteredProperties()" [value]="property" (onSelectionChange)="onPropertySelected(property)">\r
              {{ displayProperty(property) }}\r
            </mat-option>\r
            <mat-option *ngIf="filteredProperties().length === 0" disabled>\r
              <span class="no-results-text">No hay lotes disponibles</span>\r
            </mat-option>\r
          </mat-autocomplete>\r
        </div>\r
      </div>\r
\r
      <!-- Secci\xF3n: Vendedor -->\r
      <div class="section">\r
        <h3>Vendedor</h3>\r
        <div class="autocomplete-field">\r
          <label for="seller-search" class="field-label">\r
            Vendido Por\r
          </label>\r
          <input\r
            #sellerAutocompleteTrigger="matAutocompleteTrigger"\r
            id="seller-search"\r
            type="text"\r
            formControlName="seller_search"\r
            placeholder="Buscar por nombre o email"\r
            class="autocomplete-input"\r
            [matAutocomplete]="autoSeller"\r
            aria-label="Buscar vendedor"\r
            role="combobox"\r
            aria-expanded="false"\r
            aria-autocomplete="list">\r
          <mat-autocomplete #autoSeller="matAutocomplete" [displayWith]="displaySeller.bind(this)">\r
            <mat-option *ngFor="let seller of filteredSellers()" [value]="seller" (onSelectionChange)="onSellerSelected(seller)">\r
              {{ displaySeller(seller) }}\r
            </mat-option>\r
            <mat-option *ngIf="filteredSellers().length === 0" disabled>\r
              <span class="no-results-text">No se encontraron vendedores</span>\r
            </mat-option>\r
          </mat-autocomplete>\r
        </div>\r
      </div>\r
\r
      <!-- Secci\xF3n: Origen y Lead -->\r
      <div class="section">\r
        <h3>Origen de venta</h3>\r
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
          <app-group-select\r
            label="Origen (grupo de lead)"\r
            groupType="lead"\r
            [control]="form.get('lead_group_id')">\r
          </app-group-select>\r
\r
          <div class="autocomplete-field">\r
            <label for="lead-search" class="field-label">Lead vinculado (opcional)</label>\r
            <input\r
              #leadAutocompleteTrigger="matAutocompleteTrigger"\r
              id="lead-search"\r
              type="text"\r
              formControlName="lead_search"\r
              placeholder="Buscar lead por nombre o email"\r
              class="autocomplete-input"\r
              [matAutocomplete]="autoLead"\r
              aria-label="Buscar lead">\r
            <mat-autocomplete #autoLead="matAutocomplete" [displayWith]="displayLead.bind(this)">\r
              <mat-option *ngFor="let lead of filteredLeads()" [value]="lead" (onSelectionChange)="onLeadSelected(lead)">\r
                {{ displayLead(lead) }}\r
              </mat-option>\r
              <mat-option *ngIf="filteredLeads().length === 0" disabled>\r
                <span class="no-results-text">No se encontraron leads</span>\r
              </mat-option>\r
            </mat-autocomplete>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Secci\xF3n: Datos del Contrato -->\r
      <div class="section">\r
        <h3>Datos del Contrato</h3>\r
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
          <app-input\r
            [label]="'Fecha de Contrato *'"\r
            [form_control]="form.get('contract_date')"\r
            [type]="'date'">\r
          </app-input>\r
\r
          <app-input\r
            [label]="'Precio Total *'"\r
            [placeholder]="'Ej. 36000 o 36,000'"\r
            [form_control]="form.get('total_price')"\r
            [type]="'text'">\r
          </app-input>\r
\r
          <div class="w-full p-1">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio lista del lote</label>\r
            <div class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700">\r
              {{ formattedPropertyListPrice }}\r
            </div>\r
            <p class="mt-1 text-xs text-gray-500">Desde el lote seleccionado; editable abajo.</p>\r
          </div>\r
\r
          <app-input\r
            [label]="'Precio lista (override)'"\r
            [placeholder]="'Opcional \u2014 sobreescribe precio del lote'"\r
            [form_control]="form.get('list_price')"\r
            [type]="'text'">\r
          </app-input>\r
\r
          <div class="col-span-1 sm:col-span-2 downpayment-financing">\r
            <label class="financing-checkbox-label">\r
              <input type="checkbox" formControlName="down_payment_financed" class="financing-checkbox" />\r
              <span>Financiar enganche en pagos</span>\r
            </label>\r
            <p class="financing-hint">\r
              @if (isDownPaymentFinanced) {\r
                Habilita la pesta\xF1a de enganche en el detalle. Puedes registrar abonos y generar cuotas despu\xE9s; no hace falta definir meses ni fechas aqu\xED.\r
              } @else {\r
                El enganche se descuenta del precio total al crear el contrato.\r
              }\r
            </p>\r
          </div>\r
\r
          @if (!isDownPaymentFinanced) {\r
            <app-input\r
              [label]="'Enganche *'"\r
              [placeholder]="'Ej. 0 o 36,000'"\r
              [form_control]="form.get('down_payment')"\r
              [type]="'text'">\r
            </app-input>\r
          } @else {\r
            <app-input\r
              [label]="'Meta de enganche (opcional)'"\r
              [placeholder]="'Dejar en 0 si a\xFAn no la conocen'"\r
              [form_control]="form.get('down_payment')"\r
              [type]="'text'">\r
            </app-input>\r
          }\r
\r
          <div class="w-full p-1">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">\r
              {{ isDownPaymentFinanced ? 'Saldo para pagos normales' : 'Saldo Pendiente' }}\r
            </label>\r
            <div class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700">\r
              {{ formattedRemainingBalance() }}\r
            </div>\r
            @if (isDownPaymentFinanced) {\r
              <p class="mt-1 text-xs text-gray-500">\r
                Diferencia del lote despu\xE9s de liquidar el enganche. Si la meta es 0, equivale al precio total.\r
              </p>\r
            }\r
          </div>\r
\r
          <app-input\r
            [label]="'Meses de Pago *'"\r
            [placeholder]="'1'"\r
            [form_control]="form.get('payment_months')"\r
            [type]="'number'">\r
          </app-input>\r
\r
          <div class="w-full p-1">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">\r
              Pago Mensual\r
            </label>\r
            <div class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700">\r
              {{ formattedMonthlyPayment() }}\r
            </div>\r
          </div>\r
\r
          <app-input\r
            [label]="'Fecha Primer Pago *'"\r
            [form_control]="form.get('first_payment_date')"\r
            [type]="'date'">\r
          </app-input>\r
\r
          <app-select\r
            [label]="'Moneda *'"\r
            [config]="currencySelectConfig">\r
          </app-select>\r
\r
          <app-select\r
            [label]="'Estado *'"\r
            [config]="statusSelectConfig">\r
          </app-select>\r
        </div>\r
\r
        <div class="mt-4">\r
          <app-input\r
            [label]="'Notas'"\r
            [placeholder]="'Notas adicionales (opcional)'"\r
            [form_control]="form.get('notes')"\r
            [type]="'textarea'">\r
          </app-input>\r
        </div>\r
      </div>\r
    </form>\r
  </div>\r
\r
  <!-- Footer -->\r
  <div class="modal-footer">\r
    <app-button\r
      [text]="'Cancelar'"\r
      [variant]="'secondary'"\r
      [size]="'md'"\r
      [fullWidth]="false"\r
      (clicked)="close()">\r
    </app-button>\r
    <app-button\r
      [text]="'Crear Contrato'"\r
      [variant]="'primary'"\r
      [size]="'md'"\r
      [fullWidth]="false"\r
      [disabled]="form.invalid || loading()"\r
      [loading]="loading()"\r
      (clicked)="submit()">\r
    </app-button>\r
  </div>\r
</div>\r
`, styles: ["/* src/app/features/contracts/components/contract-create-modal/contract-create-modal.component.scss */\n.modal-container {\n  width: 100%;\n  max-width: 900px;\n  max-height: 90dvh;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #fff;\n}\n.modal-header {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-header h2 {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.modal-header .close-button {\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: background-color 0.2s;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-header .close-button:hover {\n  background-color: #f3f4f6;\n}\n.downpayment-financing {\n  padding: 1rem;\n  border: 1px solid #e5e7eb;\n  border-radius: 0.5rem;\n  background: #f9fafb;\n}\n.financing-checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: #111827;\n  cursor: pointer;\n}\n.financing-checkbox {\n  width: 1rem;\n  height: 1rem;\n  accent-color: #4f46e5;\n  flex-shrink: 0;\n}\n.financing-hint {\n  margin: 0.5rem 0 0;\n  font-size: 0.8125rem;\n  color: #6b7280;\n  line-height: 1.4;\n}\n.modal-body {\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 1rem 1.25rem;\n}\n.modal-body .section {\n  margin-bottom: 1.5rem;\n}\n.modal-body .section h3 {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.75rem;\n}\n.modal-body .autocomplete-with-button {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  align-items: stretch;\n}\n.modal-body .autocomplete-with-button .autocomplete-field {\n  flex: 1;\n  width: 100%;\n}\n.modal-body .autocomplete-with-button app-button {\n  width: 100%;\n}\n.modal-body .autocomplete-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.modal-body .autocomplete-field .field-label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.modal-body .autocomplete-field .autocomplete-input {\n  width: 100%;\n  padding: 0.625rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.modal-body .autocomplete-field .autocomplete-input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.modal-body .autocomplete-field .autocomplete-input::placeholder {\n  color: #9ca3af;\n}\n.modal-body .autocomplete-field .autocomplete-input.error-border {\n  border-color: #f87171;\n}\n.modal-body .autocomplete-field .autocomplete-input.error-border:focus {\n  border-color: #ef4444;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.modal-body .no-results-text {\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-style: italic;\n}\n.modal-footer {\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column-reverse;\n  gap: 0.75rem;\n  padding: 1rem 1.25rem;\n  border-top: 1px solid #e5e7eb;\n  background: #f9fafb;\n}\n.modal-footer app-button {\n  width: 100%;\n}\n.grid {\n  display: grid;\n}\n.grid-cols-1 {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n@media (min-width: 640px) {\n  .modal-header {\n    padding: 1.5rem;\n  }\n  .modal-header h2 {\n    font-size: 1.5rem;\n  }\n  .modal-body {\n    padding: 1.5rem;\n  }\n  .modal-body .section {\n    margin-bottom: 2rem;\n  }\n  .modal-body .section h3 {\n    font-size: 1.125rem;\n    margin-bottom: 1rem;\n  }\n  .modal-body .autocomplete-with-button {\n    flex-direction: row;\n    gap: 1rem;\n    align-items: flex-end;\n  }\n  .modal-body .autocomplete-with-button app-button {\n    width: auto;\n    flex-shrink: 0;\n  }\n  .modal-footer {\n    flex-direction: row;\n    justify-content: flex-end;\n    padding: 1.5rem;\n  }\n  .modal-footer app-button {\n    width: auto;\n  }\n}\n@media (min-width: 640px) {\n  .sm\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n  .sm\\:col-span-2 {\n    grid-column: span 2/span 2;\n  }\n}\n.gap-4 {\n  gap: 1rem;\n}\n.mt-4 {\n  margin-top: 1rem;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n@media (max-width: 767px) {\n  .modal-container {\n    max-height: 100dvh;\n    height: 100dvh;\n  }\n}\n::ng-deep .mat-mdc-autocomplete-panel {\n  background: white;\n  border-radius: 0.375rem;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e5e7eb;\n  max-height: 256px;\n  overflow-y: auto;\n}\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option {\n  font-size: 0.875rem;\n  padding: 0.75rem 1rem;\n  min-height: 48px;\n}\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option:hover {\n  background-color: #f3f4f6;\n}\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option.mat-mdc-option-active,\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option.mdc-list-item--selected {\n  background-color: #eef2ff;\n  color: #4f46e5;\n}\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option .mdc-list-item__primary-text {\n  color: #374151;\n}\n/*# sourceMappingURL=contract-create-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialogRef }, { type: ContractService }, { type: CustomerService }, { type: PropertyService }, { type: UserService }, { type: InterceptorService }, { type: MatDialog }, { type: LeadService }], { customerAutocompleteTrigger: [{
    type: ViewChild,
    args: ["customerAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }], propertyAutocompleteTrigger: [{
    type: ViewChild,
    args: ["propertyAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }], sellerAutocompleteTrigger: [{
    type: ViewChild,
    args: ["sellerAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }], leadAutocompleteTrigger: [{
    type: ViewChild,
    args: ["leadAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }], modalBody: [{
    type: ViewChild,
    args: ["modalBody"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractCreateModalComponent, { className: "ContractCreateModalComponent", filePath: "src/app/features/contracts/components/contract-create-modal/contract-create-modal.component.ts", lineNumber: 96 });
})();

// src/app/features/contracts/components/contract-filter-indicator/contract-filter-indicator.component.ts
function ContractFilterIndicatorComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "lucide-icon", 8);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 9);
    \u0275\u0275listener("click", function ContractFilterIndicatorComponent_div_0_div_5_Template_button_click_4_listener() {
      const filter_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.clearFilter(filter_r3.type));
    });
    \u0275\u0275element(5, "lucide-icon", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const filter_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r3.getFilterIcon(filter_r3.type))("size", 14);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(filter_r3.label);
    \u0275\u0275advance(2);
    \u0275\u0275property("img", ctx_r3.X)("size", 12);
  }
}
function ContractFilterIndicatorComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "span", 3);
    \u0275\u0275text(3, "Filtros activos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275template(5, ContractFilterIndicatorComponent_div_0_div_5_Template, 6, 5, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function ContractFilterIndicatorComponent_div_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearAllFilters());
    });
    \u0275\u0275text(7, " Limpiar todos ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r3.activeFilters);
  }
}
var ContractFilterIndicatorComponent = class _ContractFilterIndicatorComponent {
  Filter = Funnel;
  Search = Search;
  X = X;
  activeSearchTerm = null;
  activeStatusFilter = null;
  filterClear = new EventEmitter();
  activeFilters = [];
  ngOnChanges() {
    this.updateActiveFilters();
  }
  updateActiveFilters() {
    this.activeFilters = [];
    if (this.activeStatusFilter) {
      const statusLabel = this.getStatusLabel(this.activeStatusFilter);
      this.activeFilters.push({
        type: "status",
        value: this.activeStatusFilter,
        label: `Estado: ${statusLabel}`
      });
    }
    if (this.activeSearchTerm) {
      this.activeFilters.push({
        type: "search",
        value: this.activeSearchTerm,
        label: `B\xFAsqueda: ${this.activeSearchTerm}`
      });
    }
  }
  hasActiveFilters() {
    return this.activeFilters.length > 0;
  }
  clearFilter(filterType) {
    this.filterClear.emit(filterType);
  }
  clearAllFilters() {
    this.filterClear.emit("all");
  }
  getFilterIcon(filterType) {
    switch (filterType) {
      case "status":
        return this.Filter;
      case "search":
        return this.Search;
      default:
        return this.Filter;
    }
  }
  getStatusLabel(status) {
    const labels = {
      "activo": "Activo",
      "completado": "Completado",
      "cancelado": "Cancelado",
      "suspendido": "Suspendido"
    };
    return labels[status] || status;
  }
  static \u0275fac = function ContractFilterIndicatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractFilterIndicatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractFilterIndicatorComponent, selectors: [["app-contract-filter-indicator"]], inputs: { activeSearchTerm: "activeSearchTerm", activeStatusFilter: "activeStatusFilter" }, outputs: { filterClear: "filterClear" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "filter-indicator", 4, "ngIf"], [1, "filter-indicator"], [1, "filters-container"], [1, "filters-label"], [1, "filter-chips"], ["class", "filter-chip", 4, "ngFor", "ngForOf"], ["type", "button", "aria-label", "Limpiar todos los filtros", 1, "clear-all-btn", 3, "click"], [1, "filter-chip"], [3, "img", "size"], ["type", "button", "title", "Limpiar filtro", 1, "remove-btn", 3, "click"]], template: function ContractFilterIndicatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ContractFilterIndicatorComponent_div_0_Template, 8, 1, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.hasActiveFilters());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, LucideAngularModule, LucideAngularComponent], styles: ["\n\n.filter-indicator[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filters-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1e40af;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  border: 1px solid #3b82f6;\n  border-radius: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  color: #1e40af;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #1e40af;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  transition: color 0.2s ease;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .clear-all-btn[_ngcontent-%COMP%] {\n  margin-left: auto;\n  border: none;\n  background: transparent;\n  color: #1d4ed8;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .clear-all-btn[_ngcontent-%COMP%]:hover {\n  background: #dbeafe;\n}\n@media (max-width: 767px) {\n  .filter-indicator[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filters-label[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=contract-filter-indicator.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractFilterIndicatorComponent, [{
    type: Component,
    args: [{ selector: "app-contract-filter-indicator", standalone: true, imports: [CommonModule, LucideAngularModule], template: `<div *ngIf="hasActiveFilters()" class="filter-indicator">
  <div class="filters-container">
    <span class="filters-label">Filtros activos:</span>
    <div class="filter-chips">
      <div *ngFor="let filter of activeFilters" class="filter-chip">
        <lucide-icon [img]="getFilterIcon(filter.type)" [size]="14"></lucide-icon>
        <span>{{ filter.label }}</span>
        <button 
          type="button"
          class="remove-btn"
          (click)="clearFilter(filter.type)"
          title="Limpiar filtro">
          <lucide-icon [img]="X" [size]="12"></lucide-icon>
        </button>
      </div>
    </div>
    <button 
      type="button"
      class="clear-all-btn"
      (click)="clearAllFilters()"
      aria-label="Limpiar todos los filtros">
      Limpiar todos
    </button>
  </div>
</div>`, styles: ["/* angular:styles/component:scss;2937026a46cda13589d3a342cacb16d3f370bf5959b61db7eace6709124f13bd;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/contracts/components/contract-filter-indicator/contract-filter-indicator.component.ts */\n.filter-indicator {\n  background-color: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.filter-indicator .filters-container {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.filter-indicator .filters-container .filters-label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1e40af;\n}\n.filter-indicator .filters-container .filter-chips {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  border: 1px solid #3b82f6;\n  border-radius: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  color: #1e40af;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip i {\n  font-size: 0.75rem;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn {\n  background: none;\n  border: none;\n  color: #1e40af;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  transition: color 0.2s ease;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn:hover {\n  color: #dc2626;\n}\n.filter-indicator .filters-container .clear-all-btn {\n  margin-left: auto;\n  border: none;\n  background: transparent;\n  color: #1d4ed8;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.25rem 0.5rem;\n  border-radius: 0.25rem;\n}\n.filter-indicator .filters-container .clear-all-btn:hover {\n  background: #dbeafe;\n}\n@media (max-width: 767px) {\n  .filter-indicator {\n    padding: 0.75rem;\n  }\n  .filter-indicator .filters-container {\n    gap: 0.5rem;\n  }\n  .filter-indicator .filters-container .filters-label {\n    font-size: 0.8125rem;\n  }\n  .filter-indicator .filters-container .filter-chips .filter-chip {\n    font-size: 0.8125rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=contract-filter-indicator.component.css.map */\n"] }]
  }], null, { activeSearchTerm: [{
    type: Input
  }], activeStatusFilter: [{
    type: Input
  }], filterClear: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractFilterIndicatorComponent, { className: "ContractFilterIndicatorComponent", filePath: "src/app/features/contracts/components/contract-filter-indicator/contract-filter-indicator.component.ts", lineNumber: 137 });
})();

// src/app/features/contracts/pages/contracts-list/contracts-list.component.ts
var _c02 = ["tableTemplate"];
var _forTrack0 = ($index, $item) => $item.id;
function ContractsListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "button", 15);
    \u0275\u0275listener("click", function ContractsListComponent_div_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter("total"));
    });
    \u0275\u0275elementStart(2, "div", 16)(3, "p", 17);
    \u0275\u0275text(4, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 18);
    \u0275\u0275text(6, "Todos los contratos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 19)(8, "p", 20);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 21);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "button", 22);
    \u0275\u0275listener("click", function ContractsListComponent_div_10_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter("completed"));
    });
    \u0275\u0275elementStart(14, "div", 16)(15, "p", 17);
    \u0275\u0275text(16, "Completados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 18);
    \u0275\u0275text(18, "Pagados en su totalidad");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 19)(20, "p", 20);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 21);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "button", 23);
    \u0275\u0275listener("click", function ContractsListComponent_div_10_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter("pending"));
    });
    \u0275\u0275elementStart(26, "div", 16)(27, "p", 17);
    \u0275\u0275text(28, "Activos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p", 18);
    \u0275\u0275text(30, "En proceso de pago");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 19)(32, "p", 20);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "p", 21);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 24)(38, "span", 25);
    \u0275\u0275text(39, "Pagado: ");
    \u0275\u0275elementStart(40, "strong");
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "span", 26);
    \u0275\u0275text(44, "Pendiente: ");
    \u0275\u0275elementStart(45, "strong");
    \u0275\u0275text(46);
    \u0275\u0275pipe(47, "currency");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "button", 27);
    \u0275\u0275listener("click", function ContractsListComponent_div_10_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter("overdue"));
    });
    \u0275\u0275elementStart(49, "div", 16)(50, "p", 17);
    \u0275\u0275text(51, "Vencidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "p", 18);
    \u0275\u0275text(53, "Con pagos atrasados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 19)(55, "p", 20);
    \u0275\u0275text(56);
    \u0275\u0275pipe(57, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "p", 21);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 24)(61, "span");
    \u0275\u0275text(62, "Contratos: ");
    \u0275\u0275elementStart(63, "strong");
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "span");
    \u0275\u0275text(66, "Pagos: ");
    \u0275\u0275elementStart(67, "strong");
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("stats-v2-card--active", ctx_r2.activeFilter() === "total");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(10, 20, ctx_r2.stats().total.value, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.stats().total.count);
    \u0275\u0275advance();
    \u0275\u0275classProp("stats-v2-card--active", ctx_r2.activeFilter() === "completed");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(22, 25, ctx_r2.stats().completed.value, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.stats().completed.count);
    \u0275\u0275advance();
    \u0275\u0275classProp("stats-v2-card--active", ctx_r2.activeFilter() === "pending");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(34, 30, ctx_r2.stats().pending.value, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.stats().pending.count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(42, 35, ctx_r2.stats().pending.paid, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(47, 40, ctx_r2.stats().pending.remaining, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("stats-v2-card--active", ctx_r2.activeFilter() === "overdue");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(57, 45, ctx_r2.stats().overdue.value, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.stats().overdue.contracts_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.stats().overdue.contracts_count);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.stats().overdue.payments_count);
  }
}
function ContractsListComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "Cargando contratos...");
    \u0275\u0275elementEnd();
  }
}
function ContractsListComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, "No se encontraron contratos");
    \u0275\u0275elementEnd();
  }
}
function ContractsListComponent_Conditional_15_For_2_p_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 48);
    \u0275\u0275listener("click", function ContractsListComponent_Conditional_15_For_2_p_5_Template_p_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const item_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.navigateToCustomer(item_r5.customer.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCustomerName(item_r5), " ");
  }
}
function ContractsListComponent_Conditional_15_For_2_span_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275listener("click", function ContractsListComponent_Conditional_15_For_2_span_12_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.navigateToProperty(item_r5.property.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r5.property.code, " ");
  }
}
function ContractsListComponent_Conditional_15_For_2_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractsListComponent_Conditional_15_For_2_div_39_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r5.overdue_payments_count, " ");
  }
}
function ContractsListComponent_Conditional_15_For_2_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275element(1, "lucide-icon", 52);
    \u0275\u0275template(2, ContractsListComponent_Conditional_15_For_2_div_39_span_2_Template, 2, 1, "span", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r2.AlertCircle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r5.overdue_payments_count > 1);
  }
}
function ContractsListComponent_Conditional_15_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275listener("click", function ContractsListComponent_Conditional_15_For_2_Template_div_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewDetail(item_r5));
    });
    \u0275\u0275elementStart(1, "div", 32)(2, "div", 33)(3, "span", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ContractsListComponent_Conditional_15_For_2_p_5_Template, 2, 1, "p", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 36)(9, "div")(10, "span", 37);
    \u0275\u0275text(11, "Lote");
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, ContractsListComponent_Conditional_15_For_2_span_12_Template, 2, 1, "span", 38)(13, ContractsListComponent_Conditional_15_For_2_span_13_Template, 2, 0, "span", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "span", 37);
    \u0275\u0275text(16, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 40);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div")(21, "span", 37);
    \u0275\u0275text(22, "Precio Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 41);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div")(27, "span", 37);
    \u0275\u0275text(28, "Saldo Pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 42);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 43)(33, "span", 37);
    \u0275\u0275text(34, "Siguiente Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 44)(36, "span", 40);
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(39, ContractsListComponent_Conditional_15_For_2_div_39_Template, 3, 2, "div", 45);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "div", 46);
    \u0275\u0275listener("click", function ContractsListComponent_Conditional_15_For_2_Template_div_click_40_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(41, "app-button", 47);
    \u0275\u0275listener("clicked", function ContractsListComponent_Conditional_15_For_2_Template_app_button_clicked_41_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewDetail(item_r5));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", item_r5.contract_number, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r5.customer);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getStatusClass(item_r5.status) + " shrink-0");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r5.status), " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", item_r5.property);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r5.property);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 14, item_r5.contract_date, "mediumDate"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 17, item_r5.total_price, item_r5.currency));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(31, 20, item_r5.remaining_balance, item_r5.currency));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(38, 23, item_r5.next_payment_date, "mediumDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r5.has_overdue);
    \u0275\u0275advance(2);
    \u0275\u0275property("fullWidth", true)("icon", ctx_r2.ArrowRight);
  }
}
function ContractsListComponent_Conditional_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 44)(2, "button", 55);
    \u0275\u0275listener("click", function ContractsListComponent_Conditional_15_Conditional_3_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onPageChange({ page: (ctx_r2.table_config().page ?? 1) - 1, limit: ctx_r2.table_config().limit ?? 20 }));
    });
    \u0275\u0275text(3, " Anterior ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 56);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 55);
    \u0275\u0275listener("click", function ContractsListComponent_Conditional_15_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onPageChange({ page: (ctx_r2.table_config().page ?? 1) + 1, limit: ctx_r2.table_config().limit ?? 20 }));
    });
    \u0275\u0275text(7, " Siguiente ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.table_config().page === 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r2.table_config().page, " / ", ctx_r2.Math.ceil((ctx_r2.table_config().totalResults ?? 0) / (ctx_r2.table_config().limit ?? 20)), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r2.table_config().hasNext);
  }
}
function ContractsListComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275repeaterCreate(1, ContractsListComponent_Conditional_15_For_2_Template, 42, 26, "div", 29, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, ContractsListComponent_Conditional_15_Conditional_3_Template, 8, 4, "div", 30);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.table_config().rows);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((ctx_r2.table_config().totalResults ?? 0) > (ctx_r2.table_config().limit ?? 20) ? 3 : -1);
  }
}
function ContractsListComponent_ng_template_16_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275listener("click", function ContractsListComponent_ng_template_16_span_4_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const item_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.navigateToCustomer(item_r11.customer.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r2.getCustomerName(item_r11));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCustomerName(item_r11), " ");
  }
}
function ContractsListComponent_ng_template_16_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractsListComponent_ng_template_16_span_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275listener("click", function ContractsListComponent_ng_template_16_span_7_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r12);
      const item_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.navigateToProperty(item_r11.property.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r11.property.code, " ");
  }
}
function ContractsListComponent_ng_template_16_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractsListComponent_ng_template_16_div_23_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r11.overdue_payments_count, " ");
  }
}
function ContractsListComponent_ng_template_16_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275element(1, "lucide-icon", 68);
    \u0275\u0275template(2, ContractsListComponent_ng_template_16_div_23_span_2_Template, 2, 1, "span", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("title", item_r11.overdue_payments_count + " pagos vencidos");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r2.AlertCircle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r11.overdue_payments_count > 1);
  }
}
function ContractsListComponent_ng_template_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "span", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275template(4, ContractsListComponent_ng_template_16_span_4_Template, 2, 2, "span", 58)(5, ContractsListComponent_ng_template_16_span_5_Template, 2, 0, "span", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275template(7, ContractsListComponent_ng_template_16_span_7_Template, 2, 1, "span", 60)(8, ContractsListComponent_ng_template_16_span_8_Template, 2, 0, "span", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td")(19, "div", 44)(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, ContractsListComponent_ng_template_16_div_23_Template, 3, 3, "div", 61);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td")(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "td", 62);
    \u0275\u0275listener("click", function ContractsListComponent_ng_template_16_Template_td_click_27_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(28, "app-button", 63);
    \u0275\u0275listener("clicked", function ContractsListComponent_ng_template_16_Template_app_button_clicked_28_listener() {
      const item_r11 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewDetail(item_r11));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r11.contract_number, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r11.customer);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r11.customer);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r11.property);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r11.property);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 15, item_r11.contract_date, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 18, item_r11.total_price, item_r11.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 21, item_r11.remaining_balance, item_r11.currency));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 24, item_r11.next_payment_date, "mediumDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r11.has_overdue);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getStatusClass(item_r11.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r11.status), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("fullWidth", false)("icon", ctx_r2.ArrowRight);
  }
}
var ContractsListComponent = class _ContractsListComponent {
  router;
  route;
  contractService;
  propertyService;
  dialog;
  interceptorService;
  tableTemplate;
  table_config = signal({
    rows: [],
    columns: [
      { name: "N\xFAmero", prop: "contract_number", sortable: true, canAutoResize: true, width: 120 },
      { name: "Cliente", prop: "customer", sortable: false, canAutoResize: false, width: 200 },
      { name: "Lote", prop: "property", sortable: false, canAutoResize: true, width: 120 },
      { name: "Fecha Inicio", prop: "contract_date", sortable: true, canAutoResize: true, width: 120 },
      { name: "Precio Total", prop: "total_price", sortable: true, canAutoResize: true, width: 120 },
      { name: "Saldo Pendiente", prop: "remaining_balance", sortable: true, canAutoResize: true, width: 130 },
      { name: "Siguiente Pago", prop: "first_payment_date", sortable: true, canAutoResize: true, width: 130 },
      { name: "Estado", prop: "status", sortable: true, canAutoResize: true, width: 100 },
      { name: "Acciones", prop: "actions", sortable: false, canAutoResize: true, width: 120 }
    ],
    externalPaging: true,
    externalSorting: true,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: "Sin resultados", subtitle: "No se encontraron contratos" },
    columnMode: "force",
    reorderable: false
  }, ...ngDevMode ? [{ debugName: "table_config" }] : []);
  ArrowRight = ArrowRight;
  AlertCircle = CircleAlert;
  Download = Download;
  Math = Math;
  search = "";
  currentSort = null;
  stats = signal(null, ...ngDevMode ? [{ debugName: "stats" }] : []);
  activeFilter = signal(null, ...ngDevMode ? [{ debugName: "activeFilter" }] : []);
  destroy$ = new Subject();
  lastQueryParams = "";
  constructor(router, route, contractService, propertyService, dialog, interceptorService) {
    this.router = router;
    this.route = route;
    this.contractService = contractService;
    this.propertyService = propertyService;
    this.dialog = dialog;
    this.interceptorService = interceptorService;
    this.loadStats();
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;
      this.search = query?.search ?? "";
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit
      }));
      if (query?.status === "completado") {
        this.activeFilter.set("completed");
      } else if (query?.status === "activo") {
        this.activeFilter.set("pending");
      } else if (query?.hasOverdue === "true") {
        this.activeFilter.set("overdue");
      } else if (!query?.status && !query?.hasOverdue) {
        this.activeFilter.set("total");
      } else {
        this.activeFilter.set(null);
      }
      if (!query?.page || !query?.limit) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: __spreadValues(__spreadValues(__spreadValues({
            page,
            limit
          }, this.search && { search: this.search }), query?.status && { status: query.status }), query?.hasOverdue && { hasOverdue: query.hasOverdue }),
          replaceUrl: true
        });
        return;
      }
      this.getContracts();
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadStats() {
    this.contractService.getContractStats().subscribe({
      next: (stats) => {
        this.stats.set(stats);
      },
      error: (error) => {
        console.error("Error loading stats:", error);
      }
    });
  }
  applyFilter(filter) {
    const config = this.table_config();
    const queryParams = __spreadValues({
      page: 1,
      limit: config.limit
    }, this.search && { search: this.search });
    switch (filter) {
      case "completed":
        queryParams.status = "completado";
        break;
      case "pending":
        queryParams.status = "activo";
        break;
      case "overdue":
        queryParams.hasOverdue = "true";
        break;
      case "total":
      default:
        break;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }
  getContracts() {
    this.table_config.update((c) => __spreadProps(__spreadValues({}, c), { loading: true }));
    const config = this.table_config();
    const page = isNaN(config.page) ? 1 : config.page;
    const limit = isNaN(config.limit) ? 20 : config.limit;
    const queryParams = this.route.snapshot.queryParams;
    let data = __spreadValues(__spreadValues(__spreadValues({
      page,
      limit
    }, this.search && { search: this.search }), queryParams.status && { status: queryParams.status }), queryParams.hasOverdue && { hasOverdue: queryParams.hasOverdue });
    console.log("\u{1F50D} Requesting contracts with:", data);
    this.contractService.getContracts(data).subscribe((res) => {
      console.log("\u{1F4E6} API Response:", res);
      let contracts = [];
      let total = 0;
      let hasNext = false;
      if (Array.isArray(res)) {
        console.log("\u26A0\uFE0F API returned array directly, length:", res.length);
        contracts = res;
        total = res.length;
        hasNext = false;
      } else if (res?.data) {
        console.log("\u2705 API returned paginated response, data length:", res.data.length, "total:", res.pagination?.total ?? res.total);
        contracts = res.data;
        total = res.pagination?.total ?? res.total ?? res.data.length;
        hasNext = res.pagination?.hasNext ?? page * limit < total;
      }
      console.log("\u{1F4CA} Setting table with:", { rows: contracts.length, total, hasNext, page, limit });
      this.table_config.update((c) => __spreadProps(__spreadValues({}, c), {
        rows: contracts,
        totalResults: total,
        hasNext,
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
    this.currentSort = event;
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
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams.status) {
      params.status = queryParams.status;
    }
    if (queryParams.hasOverdue) {
      params.hasOverdue = queryParams.hasOverdue;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      replaceUrl: true
    });
  }
  onRowClick(row) {
    const contract = row?.data || row;
    console.log("\u{1F4CB} Row clicked:", contract);
    console.log("\u{1F4CB} Row ID:", contract?.id);
    this.viewDetail(contract);
  }
  onSearchChange(searchTerm) {
    this.search = searchTerm;
    const config = this.table_config();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        limit: config.limit,
        search: searchTerm || void 0
      },
      queryParamsHandling: "merge"
    });
  }
  clearFilters() {
    this.search = "";
    this.activeFilter.set(null);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
  onFilterClear(filterType) {
    if (filterType === "search" || filterType === "all") {
      this.search = "";
    }
    if (filterType === "status" || filterType === "all") {
      this.activeFilter.set(null);
    }
    const queryParams = {};
    if (filterType !== "all") {
      if (filterType === "search") {
        queryParams.status = this.route.snapshot.queryParams.status || void 0;
      } else if (filterType === "status") {
        queryParams.search = this.search || void 0;
      }
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }
  getActiveStatusFilter() {
    const queryParams = this.route.snapshot.queryParams;
    return queryParams.status || null;
  }
  createContract() {
    console.log("Create contract");
  }
  openCreateContractModal() {
    const dialogRef = this.dialog.open(ContractCreateModalComponent, __spreadProps(__spreadValues({}, CONTRACT_CREATE_DIALOG_CONFIG), {
      disableClose: false
    }));
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getContracts();
      }
    });
  }
  viewDetail(contract) {
    if (!contract || !contract.id) {
      console.error("\u274C Contract or contract.id is missing:", contract);
      this.interceptorService.openSnackbar({
        type: "error",
        title: "Error",
        message: "No se pudo cargar el contrato. ID no disponible."
      });
      return;
    }
    this.router.navigate(["/contracts/detail", contract.id]);
  }
  navigateToCustomer(customerId) {
    this.router.navigate(["/customers/detail", customerId]);
  }
  navigateToProperty(propertyId) {
    this.propertyService.getProperty(propertyId).subscribe({
      next: (property) => {
        this.dialog.open(PropertyEditModalComponent, __spreadProps(__spreadValues({}, PROPERTY_FORM_DIALOG_CONFIG), {
          data: { property }
        }));
      },
      error: (error) => {
        console.error("Error loading property:", error);
      }
    });
  }
  getStatusClass(status) {
    const statusMap = {
      "activo": "bg-green-100 text-green-800",
      "completado": "bg-blue-100 text-blue-800",
      "cancelado": "bg-red-100 text-red-800",
      "suspendido": "bg-yellow-100 text-yellow-800"
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status] || "bg-gray-100 text-gray-800"}`;
  }
  getStatusLabel(status) {
    const labels = {
      "activo": "Activo",
      "completado": "Completado",
      "cancelado": "Cancelado",
      "suspendido": "Suspendido"
    };
    return labels[status] || status;
  }
  getCustomerName(contract) {
    if (!contract.customer)
      return "\u2014";
    return `${contract.customer.name} ${contract.customer.lastname}`;
  }
  downloadGeneralReport() {
    this.contractService.exportToExcel().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "contratos.xlsx";
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: "error",
          title: "Error",
          message: err.error?.message || "Error al descargar el reporte"
        });
      }
    });
  }
  static \u0275fac = function ContractsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContractsListComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ContractService), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(InterceptorService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractsListComponent, selectors: [["app-contracts-list"]], viewQuery: function ContractsListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableTemplate = _t.first);
    }
  }, decls: 18, vars: 8, consts: [["tableTemplate", ""], [1, "px-0", "sm:px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-xl", "sm:text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "gap-3", "w-full", "md:w-auto"], ["param_name", "search", 1, "w-full", "sm:w-64", 3, "searchChange", "param_activate"], [1, "flex", "items-center", "gap-3"], ["text", "Crear Contrato", "custom_class", "btn_primary flex-1 sm:flex-none", 3, "clicked"], ["custom_class", "btn_primary shrink-0", "size", "md", "matTooltip", "Reporte general", "matTooltipPosition", "above", 3, "clicked", "icon"], [3, "filterClear", "activeSearchTerm", "activeStatusFilter"], ["class", "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6", 4, "ngIf"], [1, "hidden", "md:block", 3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "block", "md:hidden"], [1, "py-10", "text-center", "text-gray-500", "text-sm"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "xl:grid-cols-4", "gap-4", "mb-6"], ["type", "button", 1, "stats-v2-card", "stats-v2-card--total", 3, "click"], [1, "stats-v2-card__top"], [1, "stats-v2-card__title"], [1, "stats-v2-card__subtitle"], [1, "stats-v2-card__bottom"], [1, "stats-v2-card__amount"], [1, "stats-v2-card__count"], ["type", "button", 1, "stats-v2-card", "stats-v2-card--completed", 3, "click"], ["type", "button", 1, "stats-v2-card", "stats-v2-card--pending", 3, "click"], [1, "stats-v2-card__meta"], [1, "stats-v2-card__meta-paid"], [1, "stats-v2-card__meta-debt"], ["type", "button", 1, "stats-v2-card", "stats-v2-card--overdue", 3, "click"], [1, "space-y-3"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", "active:bg-gray-50"], [1, "mt-4", "flex", "justify-center"], [1, "bg-white", "border", "border-gray-200", "rounded-lg", "p-4", "shadow-sm", "active:bg-gray-50", 3, "click"], [1, "flex", "justify-between", "items-start", "gap-2", "mb-3"], [1, "min-w-0", "flex-1"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-purple-100", "text-purple-800"], ["class", "mt-1.5 text-sm font-medium text-gray-900 truncate", 3, "click", 4, "ngIf"], [1, "grid", "grid-cols-2", "gap-x-4", "gap-y-2", "text-sm"], [1, "text-xs", "text-gray-500", "block"], ["class", "text-green-700 font-medium", 3, "click", 4, "ngIf"], ["class", "text-gray-400", 4, "ngIf"], [1, "text-gray-900"], [1, "text-gray-900", "font-medium"], [1, "text-red-600", "font-medium"], [1, "col-span-2"], [1, "flex", "items-center", "gap-2"], ["class", "flex items-center gap-1", 4, "ngIf"], [1, "mt-3", "pt-3", "border-t", "border-gray-100", 3, "click"], ["text", "Ver Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "mt-1.5", "text-sm", "font-medium", "text-gray-900", "truncate", 3, "click"], [1, "text-green-700", "font-medium", 3, "click"], [1, "text-gray-400"], [1, "flex", "items-center", "gap-1"], [1, "w-4", "h-4", "text-red-500", 3, "img"], ["class", "inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white", 4, "ngIf"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded-full", "text-[10px]", "font-bold", "bg-red-500", "text-white"], ["type", "button", 1, "px-3", "py-1.5", "text-sm", "border", "rounded-lg", "disabled:opacity-50", "bg-white", 3, "click", "disabled"], [1, "text-sm", "text-gray-600"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-purple-100", "text-purple-800", "whitespace-nowrap"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors max-w-[200px] truncate", 3, "title", "click", 4, "ngIf"], ["class", "text-sm text-gray-400", 4, "ngIf"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap cursor-pointer hover:bg-green-200 transition-colors", 3, "click", 4, "ngIf"], ["class", "flex items-center gap-1", 3, "title", 4, "ngIf"], [3, "click"], ["text", "Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "cursor-pointer", "hover:bg-blue-200", "transition-colors", "max-w-[200px]", "truncate", 3, "click", "title"], [1, "text-sm", "text-gray-400"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "whitespace-nowrap", "cursor-pointer", "hover:bg-green-200", "transition-colors", 3, "click"], [1, "flex", "items-center", "gap-1", 3, "title"], [1, "w-5", "h-5", "text-red-500", 3, "img"], ["class", "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white", 4, "ngIf"], [1, "inline-flex", "items-center", "px-2", "py-0.5", "rounded-full", "text-xs", "font-bold", "bg-red-500", "text-white"]], template: function ContractsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2", 3);
      \u0275\u0275text(3, "Contratos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "app-search", 5);
      \u0275\u0275listener("searchChange", function ContractsListComponent_Template_app_search_searchChange_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearchChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "app-button", 7);
      \u0275\u0275listener("clicked", function ContractsListComponent_Template_app_button_clicked_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateContractModal());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "app-button", 8);
      \u0275\u0275listener("clicked", function ContractsListComponent_Template_app_button_clicked_8_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.downloadGeneralReport());
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(9, "app-contract-filter-indicator", 9);
      \u0275\u0275listener("filterClear", function ContractsListComponent_Template_app_contract_filter_indicator_filterClear_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterClear($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(10, ContractsListComponent_div_10_Template, 69, 50, "div", 10);
      \u0275\u0275elementStart(11, "app-datatable-wrapper", 11);
      \u0275\u0275listener("pageChange", function ContractsListComponent_Template_app_datatable_wrapper_pageChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function ContractsListComponent_Template_app_datatable_wrapper_sortChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function ContractsListComponent_Template_app_datatable_wrapper_rowClick_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onRowClick($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 12);
      \u0275\u0275conditionalCreate(13, ContractsListComponent_Conditional_13_Template, 2, 0, "div", 13)(14, ContractsListComponent_Conditional_14_Template, 2, 0, "div", 13)(15, ContractsListComponent_Conditional_15_Template, 4, 1);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(16, ContractsListComponent_ng_template_16_Template, 29, 27, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      let tmp_8_0;
      const tableTemplate_r13 = \u0275\u0275reference(17);
      \u0275\u0275advance(5);
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(3);
      \u0275\u0275property("icon", ctx.Download);
      \u0275\u0275advance();
      \u0275\u0275property("activeSearchTerm", ctx.search)("activeStatusFilter", ctx.getActiveStatusFilter());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.stats());
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r13);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.table_config().loading ? 13 : !((tmp_8_0 = ctx.table_config().rows) == null ? null : tmp_8_0.length) ? 14 : 15);
    }
  }, dependencies: [
    CommonModule,
    NgIf,
    DatatableWrapperComponent,
    SearchComponent,
    ButtonComponent,
    ContractFilterIndicatorComponent,
    LucideAngularModule,
    LucideAngularComponent,
    MatTooltipModule,
    MatTooltip,
    CurrencyPipe,
    DatePipe
  ], styles: ["\n\n.stats-v2-card[_ngcontent-%COMP%] {\n  border: 1px solid #e5e7eb;\n  border-radius: 0.9rem;\n  background: #ffffff;\n  padding: 1rem 1.1rem;\n  text-align: left;\n  transition: all 0.2s ease;\n}\n.stats-v2-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);\n}\n.stats-v2-card--active[_ngcontent-%COMP%] {\n  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);\n  border-color: #818cf8;\n}\n.stats-v2-card__top[_ngcontent-%COMP%] {\n  margin-bottom: 0.8rem;\n}\n.stats-v2-card__title[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.stats-v2-card__subtitle[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  font-size: 0.7rem;\n  color: #64748b;\n}\n.stats-v2-card__bottom[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n}\n.stats-v2-card__amount[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 700;\n  line-height: 1.1;\n}\n.stats-v2-card__count[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 800;\n  line-height: 1;\n}\n.stats-v2-card__meta[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  font-size: 0.75rem;\n}\n.stats-v2-card--total[_ngcontent-%COMP%]   .stats-v2-card__title[_ngcontent-%COMP%], \n.stats-v2-card--total[_ngcontent-%COMP%]   .stats-v2-card__amount[_ngcontent-%COMP%], \n.stats-v2-card--total[_ngcontent-%COMP%]   .stats-v2-card__count[_ngcontent-%COMP%] {\n  color: #111827;\n}\n.stats-v2-card--completed[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #eff6ff 0%,\n      #ffffff 100%);\n  border-color: #bfdbfe;\n}\n.stats-v2-card--completed[_ngcontent-%COMP%]   .stats-v2-card__title[_ngcontent-%COMP%], \n.stats-v2-card--completed[_ngcontent-%COMP%]   .stats-v2-card__amount[_ngcontent-%COMP%], \n.stats-v2-card--completed[_ngcontent-%COMP%]   .stats-v2-card__count[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n.stats-v2-card--pending[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #ecfdf5 0%,\n      #ffffff 100%);\n  border-color: #bbf7d0;\n}\n.stats-v2-card--pending[_ngcontent-%COMP%]   .stats-v2-card__title[_ngcontent-%COMP%], \n.stats-v2-card--pending[_ngcontent-%COMP%]   .stats-v2-card__amount[_ngcontent-%COMP%], \n.stats-v2-card--pending[_ngcontent-%COMP%]   .stats-v2-card__count[_ngcontent-%COMP%] {\n  color: #047857;\n}\n.stats-v2-card--pending[_ngcontent-%COMP%]   .stats-v2-card__meta[_ngcontent-%COMP%] {\n  color: #0f766e;\n}\n.stats-v2-card--pending[_ngcontent-%COMP%]   .stats-v2-card__meta-paid[_ngcontent-%COMP%] {\n  color: #047857;\n}\n.stats-v2-card--pending[_ngcontent-%COMP%]   .stats-v2-card__meta-debt[_ngcontent-%COMP%] {\n  color: #b45309;\n}\n.stats-v2-card--overdue[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #fef2f2 0%,\n      #ffffff 100%);\n  border-color: #fecaca;\n}\n.stats-v2-card--overdue[_ngcontent-%COMP%]   .stats-v2-card__title[_ngcontent-%COMP%], \n.stats-v2-card--overdue[_ngcontent-%COMP%]   .stats-v2-card__amount[_ngcontent-%COMP%], \n.stats-v2-card--overdue[_ngcontent-%COMP%]   .stats-v2-card__count[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n.stats-v2-card--overdue[_ngcontent-%COMP%]   .stats-v2-card__meta[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n@media (max-width: 639px) {\n  .stats-v2-card__amount[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .stats-v2-card__count[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=contracts-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractsListComponent, [{
    type: Component,
    args: [{ selector: "app-contracts-list", standalone: true, imports: [
      CommonModule,
      DatatableWrapperComponent,
      SearchComponent,
      ButtonComponent,
      ContractFilterIndicatorComponent,
      LucideAngularModule,
      MatTooltipModule
    ], template: `<div class="px-0 sm:px-4">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Contratos</h2>\r
\r
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">\r
      <app-search\r
        class="w-full sm:w-64"\r
        [param_activate]="true"\r
        param_name="search"\r
        (searchChange)="onSearchChange($event)">\r
      </app-search>\r
\r
      <div class="flex items-center gap-3">\r
        <app-button\r
          text="Crear Contrato"\r
          custom_class="btn_primary flex-1 sm:flex-none"\r
          (clicked)="openCreateContractModal()">\r
        </app-button>\r
\r
        <app-button\r
          custom_class="btn_primary shrink-0"\r
          [icon]="Download"\r
          size="md"\r
          (clicked)="downloadGeneralReport()"\r
          matTooltip="Reporte general"\r
          matTooltipPosition="above">\r
        </app-button>\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- Filter Indicator -->\r
  <app-contract-filter-indicator\r
    [activeSearchTerm]="search"\r
    [activeStatusFilter]="getActiveStatusFilter()"\r
    (filterClear)="onFilterClear($event)">\r
  </app-contract-filter-indicator>\r
\r
  <!-- Stats Cards V2 -->\r
  <div *ngIf="stats()" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">\r
    <button\r
      type="button"\r
      (click)="applyFilter('total')"\r
      class="stats-v2-card stats-v2-card--total"\r
      [class.stats-v2-card--active]="activeFilter() === 'total'">\r
      <div class="stats-v2-card__top">\r
        <p class="stats-v2-card__title">Total</p>\r
        <p class="stats-v2-card__subtitle">Todos los contratos</p>\r
      </div>\r
      <div class="stats-v2-card__bottom">\r
        <p class="stats-v2-card__amount">{{ stats()!.total.value | currency:'USD':'symbol':'1.0-0' }}</p>\r
        <p class="stats-v2-card__count">{{ stats()!.total.count }}</p>\r
      </div>\r
    </button>\r
\r
    <button\r
      type="button"\r
      (click)="applyFilter('completed')"\r
      class="stats-v2-card stats-v2-card--completed"\r
      [class.stats-v2-card--active]="activeFilter() === 'completed'">\r
      <div class="stats-v2-card__top">\r
        <p class="stats-v2-card__title">Completados</p>\r
        <p class="stats-v2-card__subtitle">Pagados en su totalidad</p>\r
      </div>\r
      <div class="stats-v2-card__bottom">\r
        <p class="stats-v2-card__amount">{{ stats()!.completed.value | currency:'USD':'symbol':'1.0-0' }}</p>\r
        <p class="stats-v2-card__count">{{ stats()!.completed.count }}</p>\r
      </div>\r
    </button>\r
\r
    <button\r
      type="button"\r
      (click)="applyFilter('pending')"\r
      class="stats-v2-card stats-v2-card--pending"\r
      [class.stats-v2-card--active]="activeFilter() === 'pending'">\r
      <div class="stats-v2-card__top">\r
        <p class="stats-v2-card__title">Activos</p>\r
        <p class="stats-v2-card__subtitle">En proceso de pago</p>\r
      </div>\r
      <div class="stats-v2-card__bottom">\r
        <p class="stats-v2-card__amount">{{ stats()!.pending.value | currency:'USD':'symbol':'1.0-0' }}</p>\r
        <p class="stats-v2-card__count">{{ stats()!.pending.count }}</p>\r
      </div>\r
      <div class="stats-v2-card__meta">\r
        <span class="stats-v2-card__meta-paid">Pagado: <strong>{{ stats()!.pending.paid | currency:'USD':'symbol':'1.0-0' }}</strong></span>\r
        <span class="stats-v2-card__meta-debt">Pendiente: <strong>{{ stats()!.pending.remaining | currency:'USD':'symbol':'1.0-0' }}</strong></span>\r
      </div>\r
    </button>\r
\r
    <button\r
      type="button"\r
      (click)="applyFilter('overdue')"\r
      class="stats-v2-card stats-v2-card--overdue"\r
      [class.stats-v2-card--active]="activeFilter() === 'overdue'">\r
      <div class="stats-v2-card__top">\r
        <p class="stats-v2-card__title">Vencidos</p>\r
        <p class="stats-v2-card__subtitle">Con pagos atrasados</p>\r
      </div>\r
      <div class="stats-v2-card__bottom">\r
        <p class="stats-v2-card__amount">{{ stats()!.overdue.value | currency:'USD':'symbol':'1.0-0' }}</p>\r
        <p class="stats-v2-card__count">{{ stats()!.overdue.contracts_count }}</p>\r
      </div>\r
      <div class="stats-v2-card__meta">\r
        <span>Contratos: <strong>{{ stats()!.overdue.contracts_count }}</strong></span>\r
        <span>Pagos: <strong>{{ stats()!.overdue.payments_count }}</strong></span>\r
      </div>\r
    </button>\r
  </div>\r
\r
  <app-datatable-wrapper\r
    class="hidden md:block"\r
    [config]="table_config()"\r
    [rowTemplate]="tableTemplate"\r
    (pageChange)="onPageChange($event)"\r
    (sortChange)="onSortChange($event)"\r
    (rowClick)="onRowClick($event)">\r
  </app-datatable-wrapper>\r
\r
  <!-- Mobile Cards -->\r
  <div class="block md:hidden">\r
    @if (table_config().loading) {\r
      <div class="py-10 text-center text-gray-500 text-sm">Cargando contratos...</div>\r
    } @else if (!table_config().rows?.length) {\r
      <div class="py-10 text-center text-gray-500 text-sm">No se encontraron contratos</div>\r
    } @else {\r
      <div class="space-y-3">\r
        @for (item of table_config().rows; track item.id) {\r
          <div\r
            class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm active:bg-gray-50"\r
            (click)="viewDetail(item)">\r
            <div class="flex justify-between items-start gap-2 mb-3">\r
              <div class="min-w-0 flex-1">\r
                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">\r
                  {{ item.contract_number }}\r
                </span>\r
                <p\r
                  *ngIf="item.customer"\r
                  class="mt-1.5 text-sm font-medium text-gray-900 truncate"\r
                  (click)="navigateToCustomer(item.customer.id); $event.stopPropagation()">\r
                  {{ getCustomerName(item) }}\r
                </p>\r
              </div>\r
              <span [class]="getStatusClass(item.status) + ' shrink-0'">\r
                {{ getStatusLabel(item.status) }}\r
              </span>\r
            </div>\r
\r
            <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">\r
              <div>\r
                <span class="text-xs text-gray-500 block">Lote</span>\r
                <span\r
                  *ngIf="item.property"\r
                  class="text-green-700 font-medium"\r
                  (click)="navigateToProperty(item.property.id); $event.stopPropagation()">\r
                  {{ item.property.code }}\r
                </span>\r
                <span *ngIf="!item.property" class="text-gray-400">\u2014</span>\r
              </div>\r
              <div>\r
                <span class="text-xs text-gray-500 block">Fecha</span>\r
                <span class="text-gray-900">{{ item.contract_date | date:'mediumDate' }}</span>\r
              </div>\r
              <div>\r
                <span class="text-xs text-gray-500 block">Precio Total</span>\r
                <span class="text-gray-900 font-medium">{{ item.total_price | currency:item.currency }}</span>\r
              </div>\r
              <div>\r
                <span class="text-xs text-gray-500 block">Saldo Pendiente</span>\r
                <span class="text-red-600 font-medium">{{ item.remaining_balance | currency:item.currency }}</span>\r
              </div>\r
              <div class="col-span-2">\r
                <span class="text-xs text-gray-500 block">Siguiente Pago</span>\r
                <div class="flex items-center gap-2">\r
                  <span class="text-gray-900">{{ item.next_payment_date | date:'mediumDate' }}</span>\r
                  <div *ngIf="item.has_overdue" class="flex items-center gap-1">\r
                    <lucide-icon [img]="AlertCircle" class="w-4 h-4 text-red-500"></lucide-icon>\r
                    <span *ngIf="item.overdue_payments_count > 1" class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">\r
                      {{ item.overdue_payments_count }}\r
                    </span>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <div class="mt-3 pt-3 border-t border-gray-100" (click)="$event.stopPropagation()">\r
              <app-button\r
                text="Ver Detalle"\r
                size="sm"\r
                [fullWidth]="true"\r
                custom_class="btn_primary"\r
                (clicked)="viewDetail(item)"\r
                [icon]="ArrowRight">\r
              </app-button>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      @if ((table_config().totalResults ?? 0) > (table_config().limit ?? 20)) {\r
        <div class="mt-4 flex justify-center">\r
          <div class="flex items-center gap-2">\r
            <button\r
              type="button"\r
              [disabled]="table_config().page === 1"\r
              (click)="onPageChange({page: (table_config().page ?? 1) - 1, limit: table_config().limit ?? 20})"\r
              class="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 bg-white">\r
              Anterior\r
            </button>\r
            <span class="text-sm text-gray-600">\r
              {{ table_config().page }} / {{ Math.ceil((table_config().totalResults ?? 0) / (table_config().limit ?? 20)) }}\r
            </span>\r
            <button\r
              type="button"\r
              [disabled]="!table_config().hasNext"\r
              (click)="onPageChange({page: (table_config().page ?? 1) + 1, limit: table_config().limit ?? 20})"\r
              class="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 bg-white">\r
              Siguiente\r
            </button>\r
          </div>\r
        </div>\r
      }\r
    }\r
  </div>\r
</div>\r
\r
<ng-template #tableTemplate let-item="$implicit">\r
  <td>\r
    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 whitespace-nowrap">\r
      {{ item.contract_number }}\r
    </span>\r
  </td>\r
  <td>\r
    <span \r
      *ngIf="item.customer"\r
      (click)="navigateToCustomer(item.customer.id); $event.stopPropagation()"\r
      class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors max-w-[200px] truncate"\r
      [title]="getCustomerName(item)">\r
      {{ getCustomerName(item) }}\r
    </span>\r
    <span *ngIf="!item.customer" class="text-sm text-gray-400">\u2014</span>\r
  </td>\r
  <td>\r
    <span \r
      *ngIf="item.property"\r
      (click)="navigateToProperty(item.property.id); $event.stopPropagation()"\r
      class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap cursor-pointer hover:bg-green-200 transition-colors">\r
      {{ item.property.code }}\r
    </span>\r
    <span *ngIf="!item.property" class="text-sm text-gray-400">\u2014</span>\r
  </td>\r
  <td>{{ item.contract_date | date:'mediumDate' }}</td>\r
  <td>{{ item.total_price | currency:item.currency }}</td>\r
  <td>{{ item.remaining_balance | currency:item.currency }}</td>\r
  <td>\r
    <div class="flex items-center gap-2">\r
      <span>{{ item.next_payment_date | date:'mediumDate' }}</span>\r
      <div *ngIf="item.has_overdue" class="flex items-center gap-1" [title]="item.overdue_payments_count + ' pagos vencidos'">\r
        <lucide-icon [img]="AlertCircle" class="w-5 h-5 text-red-500"></lucide-icon>\r
        <span *ngIf="item.overdue_payments_count > 1" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">\r
          {{ item.overdue_payments_count }}\r
        </span>\r
      </div>\r
    </div>\r
  </td>\r
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
      (clicked)="viewDetail(item)"\r
      [icon]="ArrowRight">\r
    </app-button>\r
  </td>\r
</ng-template>\r
`, styles: ["/* src/app/features/contracts/pages/contracts-list/contracts-list.component.scss */\n.stats-v2-card {\n  border: 1px solid #e5e7eb;\n  border-radius: 0.9rem;\n  background: #ffffff;\n  padding: 1rem 1.1rem;\n  text-align: left;\n  transition: all 0.2s ease;\n}\n.stats-v2-card:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);\n}\n.stats-v2-card--active {\n  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);\n  border-color: #818cf8;\n}\n.stats-v2-card__top {\n  margin-bottom: 0.8rem;\n}\n.stats-v2-card__title {\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n.stats-v2-card__subtitle {\n  margin-top: 0.2rem;\n  font-size: 0.7rem;\n  color: #64748b;\n}\n.stats-v2-card__bottom {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n}\n.stats-v2-card__amount {\n  font-size: 1.6rem;\n  font-weight: 700;\n  line-height: 1.1;\n}\n.stats-v2-card__count {\n  font-size: 2rem;\n  font-weight: 800;\n  line-height: 1;\n}\n.stats-v2-card__meta {\n  margin-top: 0.5rem;\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  font-size: 0.75rem;\n}\n.stats-v2-card--total .stats-v2-card__title,\n.stats-v2-card--total .stats-v2-card__amount,\n.stats-v2-card--total .stats-v2-card__count {\n  color: #111827;\n}\n.stats-v2-card--completed {\n  background:\n    linear-gradient(\n      180deg,\n      #eff6ff 0%,\n      #ffffff 100%);\n  border-color: #bfdbfe;\n}\n.stats-v2-card--completed .stats-v2-card__title,\n.stats-v2-card--completed .stats-v2-card__amount,\n.stats-v2-card--completed .stats-v2-card__count {\n  color: #1d4ed8;\n}\n.stats-v2-card--pending {\n  background:\n    linear-gradient(\n      180deg,\n      #ecfdf5 0%,\n      #ffffff 100%);\n  border-color: #bbf7d0;\n}\n.stats-v2-card--pending .stats-v2-card__title,\n.stats-v2-card--pending .stats-v2-card__amount,\n.stats-v2-card--pending .stats-v2-card__count {\n  color: #047857;\n}\n.stats-v2-card--pending .stats-v2-card__meta {\n  color: #0f766e;\n}\n.stats-v2-card--pending .stats-v2-card__meta-paid {\n  color: #047857;\n}\n.stats-v2-card--pending .stats-v2-card__meta-debt {\n  color: #b45309;\n}\n.stats-v2-card--overdue {\n  background:\n    linear-gradient(\n      180deg,\n      #fef2f2 0%,\n      #ffffff 100%);\n  border-color: #fecaca;\n}\n.stats-v2-card--overdue .stats-v2-card__title,\n.stats-v2-card--overdue .stats-v2-card__amount,\n.stats-v2-card--overdue .stats-v2-card__count {\n  color: #b91c1c;\n}\n.stats-v2-card--overdue .stats-v2-card__meta {\n  color: #b91c1c;\n}\n@media (max-width: 639px) {\n  .stats-v2-card__amount {\n    font-size: 1.25rem;\n  }\n  .stats-v2-card__count {\n    font-size: 1.5rem;\n  }\n}\n/*# sourceMappingURL=contracts-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: ContractService }, { type: PropertyService }, { type: MatDialog }, { type: InterceptorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractsListComponent, { className: "ContractsListComponent", filePath: "src/app/features/contracts/pages/contracts-list/contracts-list.component.ts", lineNumber: 38 });
})();
export {
  ContractsListComponent
};
//# sourceMappingURL=chunk-ZTKJUJH5.js.map
