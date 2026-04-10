import {
  ContractDetailModalComponent,
  ContractService,
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatTooltip,
  MatTooltipModule
} from "./chunk-PBP4LXTZ.js";
import {
  CustomerEditModalComponent
} from "./chunk-XGVGRBFF.js";
import {
  CustomerService
} from "./chunk-EFTXQRRM.js";
import {
  PropertyEditModalComponent,
  PropertyService
} from "./chunk-ADUVL4TN.js";
import {
  UserService
} from "./chunk-NHTCDOXE.js";
import {
  MatOption
} from "./chunk-SWPKLNPW.js";
import {
  SearchComponent
} from "./chunk-B3LR2PTH.js";
import {
  DatatableWrapperComponent
} from "./chunk-QW7YUBWU.js";
import {
  ButtonDirective,
  ButtonModule
} from "./chunk-LYQXEO3O.js";
import {
  SelectComponent
} from "./chunk-JWKB62XF.js";
import "./chunk-X6ESXIRL.js";
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
  ArrowRight,
  CircleAlert,
  Download,
  LucideAngularComponent,
  LucideAngularModule,
  X
} from "./chunk-XYBC4MWB.js";
import "./chunk-KNFYVOET.js";
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-OO2OLRGJ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-TXPVZZCM.js";
import "./chunk-2BSLK6RD.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-NC3JAQUC.js";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  NgForOf,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-7ZU2RCPO.js";

// src/app/features/contracts/components/contract-create-modal/contract-create-modal.component.ts
var _c0 = ["customerAutocompleteTrigger"];
var _c1 = ["propertyAutocompleteTrigger"];
var _c2 = ["sellerAutocompleteTrigger"];
var _c3 = ["modalBody"];
function ContractCreateModalComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function ContractCreateModalComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, " Selecciona un cliente ");
    \u0275\u0275elementEnd();
  }
}
function ContractCreateModalComponent_mat_option_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 41);
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
    \u0275\u0275elementStart(0, "mat-option", 42)(1, "span", 43);
    \u0275\u0275text(2, "No se encontraron clientes");
    \u0275\u0275elementEnd()();
  }
}
function ContractCreateModalComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function ContractCreateModalComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, " Selecciona un lote ");
    \u0275\u0275elementEnd();
  }
}
function ContractCreateModalComponent_mat_option_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 41);
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
    \u0275\u0275elementStart(0, "mat-option", 42)(1, "span", 43);
    \u0275\u0275text(2, "No hay lotes disponibles");
    \u0275\u0275elementEnd()();
  }
}
function ContractCreateModalComponent_mat_option_53_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-option", 41);
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
    \u0275\u0275elementStart(0, "mat-option", 42)(1, "span", 43);
    \u0275\u0275text(2, "No se encontraron vendedores");
    \u0275\u0275elementEnd()();
  }
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
  X = X;
  customerAutocompleteTrigger;
  propertyAutocompleteTrigger;
  sellerAutocompleteTrigger;
  modalBody;
  // Signals para estado reactivo
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  customers = signal([], ...ngDevMode ? [{ debugName: "customers" }] : []);
  filteredCustomers = signal([], ...ngDevMode ? [{ debugName: "filteredCustomers" }] : []);
  properties = signal([], ...ngDevMode ? [{ debugName: "properties" }] : []);
  filteredProperties = signal([], ...ngDevMode ? [{ debugName: "filteredProperties" }] : []);
  sellers = signal([], ...ngDevMode ? [{ debugName: "sellers" }] : []);
  filteredSellers = signal([], ...ngDevMode ? [{ debugName: "filteredSellers" }] : []);
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
  constructor(fb, dialogRef, contractService, customerService, propertyService, userService, interceptorService, dialog) {
    this.fb = fb;
    this.dialogRef = dialogRef;
    this.contractService = contractService;
    this.customerService = customerService;
    this.propertyService = propertyService;
    this.userService = userService;
    this.interceptorService = interceptorService;
    this.dialog = dialog;
    this.form = this.fb.group({
      // Búsqueda y selección
      customer_search: [""],
      customer_id: [null, Validators.required],
      property_search: [""],
      property_id: ["", Validators.required],
      seller_search: [""],
      seller_id: [null],
      // Datos del contrato
      contract_date: [this.getTodayDate(), Validators.required],
      total_price: [0, [Validators.required, Validators.min(0)]],
      down_payment: [0, [Validators.required, Validators.min(0)]],
      payment_months: [1, [Validators.required, Validators.min(1)]],
      first_payment_date: ["", Validators.required],
      currency: ["MXN", Validators.required],
      status: ["activo", Validators.required],
      notes: [""],
      // Campos calculados (readonly en UI)
      remaining_balance: [{ value: 0, disabled: true }],
      monthly_payment: [{ value: 0, disabled: true }]
    });
    this.currencySelectConfig.form_control = this.form.get("currency");
    this.statusSelectConfig.form_control = this.form.get("status");
  }
  ngOnInit() {
    this.initializeForm();
    this.setupCalculations();
    this.loadInitialData();
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
  }
  setupCalculations() {
    combineLatest([
      this.form.get("total_price").valueChanges.pipe(startWith(this.form.get("total_price").value)),
      this.form.get("down_payment").valueChanges.pipe(startWith(this.form.get("down_payment").value))
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
    this.form.patchValue({
      property_id: property.id,
      total_price: property.total_price
    });
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
    const dialogRef = this.dialog.open(CustomerEditModalComponent, {
      width: "600px",
      data: { customer: null }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCustomers();
      }
    });
  }
  calculateRemainingBalance() {
    const totalPrice = Number(this.form.get("total_price").value) || 0;
    const downPayment = Number(this.form.get("down_payment").value) || 0;
    const remainingBalance = totalPrice - downPayment;
    this.form.get("remaining_balance").setValue(remainingBalance, { emitEvent: true });
    this.formattedRemainingBalance.set(this.formatNumber(remainingBalance));
  }
  calculateMonthlyPayment() {
    const remainingBalance = Number(this.form.get("remaining_balance").value) || 0;
    const paymentMonths = Number(this.form.get("payment_months").value) || 1;
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
    const totalPrice = Number(this.form.get("total_price").value) || 0;
    const downPayment = Number(this.form.get("down_payment").value) || 0;
    if (downPayment > totalPrice) {
      this.interceptorService.openSnackbar({
        type: "error",
        title: "Error",
        message: "El enganche no puede ser mayor al precio total"
      });
      return;
    }
    const payload = {
      customer_id: this.form.get("customer_id").value,
      property_id: this.form.get("property_id").value,
      seller_id: this.form.get("seller_id").value || void 0,
      contract_date: this.form.get("contract_date").value,
      total_price: this.form.get("total_price").value,
      down_payment: this.form.get("down_payment").value,
      payment_months: this.form.get("payment_months").value,
      first_payment_date: this.form.get("first_payment_date").value,
      currency: this.form.get("currency").value,
      status: this.form.get("status").value,
      notes: this.form.get("notes").value || void 0
    };
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
    return new (__ngFactoryType__ || _ContractCreateModalComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(ContractService), \u0275\u0275directiveInject(CustomerService), \u0275\u0275directiveInject(PropertyService), \u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(InterceptorService), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractCreateModalComponent, selectors: [["app-contract-create-modal"]], viewQuery: function ContractCreateModalComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5, MatAutocompleteTrigger)(_c1, 5, MatAutocompleteTrigger)(_c2, 5, MatAutocompleteTrigger)(_c3, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.customerAutocompleteTrigger = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.propertyAutocompleteTrigger = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sellerAutocompleteTrigger = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.modalBody = _t.first);
    }
  }, decls: 81, vars: 69, consts: [["modalBody", ""], ["customerAutocompleteTrigger", "matAutocompleteTrigger"], ["autoCustomer", "matAutocomplete"], ["propertyAutocompleteTrigger", "matAutocompleteTrigger"], ["autoProperty", "matAutocomplete"], ["sellerAutocompleteTrigger", "matAutocompleteTrigger"], ["autoSeller", "matAutocomplete"], [1, "modal-container"], [1, "modal-header"], ["type", "button", 1, "close-button", 3, "click"], [3, "img", "size"], [1, "modal-body"], [3, "formGroup"], [1, "section"], [1, "autocomplete-with-button"], [1, "autocomplete-field"], ["for", "customer-search", 1, "field-label"], [1, "text-red-500"], ["id", "customer-search", "type", "text", "formControlName", "customer_search", "placeholder", "Buscar por nombre, apellido o email", "aria-label", "Buscar cliente", "role", "combobox", "aria-expanded", "false", "aria-autocomplete", "list", 1, "autocomplete-input", 3, "matAutocomplete"], ["id", "customer-help-text", 1, "sr-only"], ["id", "customer-error", "role", "alert", 1, "mt-1", "text-sm", "text-red-600"], [3, "displayWith"], [3, "value", "onSelectionChange", 4, "ngFor", "ngForOf"], ["disabled", "", 4, "ngIf"], [3, "clicked", "text", "variant", "size", "fullWidth"], ["for", "property-search", 1, "field-label"], ["id", "property-search", "type", "text", "formControlName", "property_search", "placeholder", "Buscar por c\xF3digo, nombre o manzana", "aria-label", "Buscar propiedad", "role", "combobox", "aria-expanded", "false", "aria-autocomplete", "list", 1, "autocomplete-input", 3, "matAutocomplete"], ["id", "property-help-text", 1, "sr-only"], ["id", "property-error", "role", "alert", 1, "mt-1", "text-sm", "text-red-600"], ["for", "seller-search", 1, "field-label"], ["id", "seller-search", "type", "text", "formControlName", "seller_search", "placeholder", "Buscar por nombre o email", "aria-label", "Buscar vendedor", "role", "combobox", "aria-expanded", "false", "aria-autocomplete", "list", 1, "autocomplete-input", 3, "matAutocomplete"], [1, "grid", "grid-cols-2", "gap-4"], [3, "label", "form_control", "type"], [3, "label", "placeholder", "form_control", "type"], [1, "w-full", "p-1"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], [1, "w-full", "rounded-lg", "border", "border-gray-300", "bg-gray-50", "px-3", "py-2", "text-sm", "text-gray-700"], [3, "label", "config"], [1, "mt-4"], [1, "modal-footer"], [3, "clicked", "text", "variant", "size", "fullWidth", "disabled", "loading"], [3, "onSelectionChange", "value"], ["disabled", ""], [1, "no-results-text"]], template: function ContractCreateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "h2");
      \u0275\u0275text(3, "Crear Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 9);
      \u0275\u0275listener("click", function ContractCreateModalComponent_Template_button_click_4_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.close());
      });
      \u0275\u0275element(5, "lucide-icon", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 11, 0)(8, "form", 12)(9, "div", 13)(10, "h3");
      \u0275\u0275text(11, "Cliente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 14)(13, "div", 15)(14, "label", 16);
      \u0275\u0275text(15, " Cliente * ");
      \u0275\u0275conditionalCreate(16, ContractCreateModalComponent_Conditional_16_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275element(17, "input", 18, 1);
      \u0275\u0275elementStart(19, "span", 19);
      \u0275\u0275text(20, "Busca clientes por nombre, apellido o email. Usa las flechas para navegar por los resultados.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(21, ContractCreateModalComponent_Conditional_21_Template, 2, 0, "p", 20);
      \u0275\u0275elementStart(22, "mat-autocomplete", 21, 2);
      \u0275\u0275template(24, ContractCreateModalComponent_mat_option_24_Template, 2, 2, "mat-option", 22)(25, ContractCreateModalComponent_mat_option_25_Template, 3, 0, "mat-option", 23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "app-button", 24);
      \u0275\u0275listener("clicked", function ContractCreateModalComponent_Template_app_button_clicked_26_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateCustomerModal());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 13)(28, "h3");
      \u0275\u0275text(29, "Propiedad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 15)(31, "label", 25);
      \u0275\u0275text(32, " Lote * ");
      \u0275\u0275conditionalCreate(33, ContractCreateModalComponent_Conditional_33_Template, 2, 0, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "input", 26, 3);
      \u0275\u0275elementStart(36, "span", 27);
      \u0275\u0275text(37, "Busca propiedades disponibles por c\xF3digo, nombre o manzana. Usa las flechas para navegar por los resultados.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(38, ContractCreateModalComponent_Conditional_38_Template, 2, 0, "p", 28);
      \u0275\u0275elementStart(39, "mat-autocomplete", 21, 4);
      \u0275\u0275template(41, ContractCreateModalComponent_mat_option_41_Template, 2, 2, "mat-option", 22)(42, ContractCreateModalComponent_mat_option_42_Template, 3, 0, "mat-option", 23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 13)(44, "h3");
      \u0275\u0275text(45, "Vendedor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "div", 15)(47, "label", 29);
      \u0275\u0275text(48, " Vendido Por ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(49, "input", 30, 5);
      \u0275\u0275elementStart(51, "mat-autocomplete", 21, 6);
      \u0275\u0275template(53, ContractCreateModalComponent_mat_option_53_Template, 2, 2, "mat-option", 22)(54, ContractCreateModalComponent_mat_option_54_Template, 3, 0, "mat-option", 23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "div", 13)(56, "h3");
      \u0275\u0275text(57, "Datos del Contrato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div", 31);
      \u0275\u0275element(59, "app-input", 32)(60, "app-input", 33)(61, "app-input", 33);
      \u0275\u0275elementStart(62, "div", 34)(63, "label", 35);
      \u0275\u0275text(64, " Saldo Pendiente ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "div", 36);
      \u0275\u0275text(66);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(67, "app-input", 33);
      \u0275\u0275elementStart(68, "div", 34)(69, "label", 35);
      \u0275\u0275text(70, " Pago Mensual ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "div", 36);
      \u0275\u0275text(72);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(73, "app-input", 32)(74, "app-select", 37)(75, "app-select", 37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "div", 38);
      \u0275\u0275element(77, "app-input", 33);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(78, "div", 39)(79, "app-button", 24);
      \u0275\u0275listener("clicked", function ContractCreateModalComponent_Template_app_button_clicked_79_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.close());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "app-button", 40);
      \u0275\u0275listener("clicked", function ContractCreateModalComponent_Template_app_button_clicked_80_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.submit());
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_10_0;
      let tmp_11_0;
      let tmp_13_0;
      let tmp_14_0;
      let tmp_15_0;
      let tmp_23_0;
      let tmp_24_0;
      let tmp_26_0;
      let tmp_27_0;
      let tmp_28_0;
      const autoCustomer_r9 = \u0275\u0275reference(23);
      const autoProperty_r10 = \u0275\u0275reference(40);
      const autoSeller_r11 = \u0275\u0275reference(52);
      \u0275\u0275advance(5);
      \u0275\u0275property("img", ctx.X)("size", 20);
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(((tmp_10_0 = ctx.form.get("customer_id")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx.form.get("customer_id")) == null ? null : tmp_10_0.touched) ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("error-border", ((tmp_11_0 = ctx.form.get("customer_id")) == null ? null : tmp_11_0.invalid) && ((tmp_11_0 = ctx.form.get("customer_id")) == null ? null : tmp_11_0.touched));
      \u0275\u0275property("matAutocomplete", autoCustomer_r9);
      \u0275\u0275attribute("aria-describedby", ((tmp_13_0 = ctx.form.get("customer_id")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx.form.get("customer_id")) == null ? null : tmp_13_0.touched) ? "customer-error" : "customer-help-text")("aria-invalid", ((tmp_14_0 = ctx.form.get("customer_id")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx.form.get("customer_id")) == null ? null : tmp_14_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(((tmp_15_0 = ctx.form.get("customer_id")) == null ? null : tmp_15_0.invalid) && ((tmp_15_0 = ctx.form.get("customer_id")) == null ? null : tmp_15_0.touched) ? 21 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayCustomer.bind(ctx));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredCustomers());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredCustomers().length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("text", "Crear Cliente")("variant", "secondary")("size", "md")("fullWidth", false);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(((tmp_23_0 = ctx.form.get("property_id")) == null ? null : tmp_23_0.invalid) && ((tmp_23_0 = ctx.form.get("property_id")) == null ? null : tmp_23_0.touched) ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("error-border", ((tmp_24_0 = ctx.form.get("property_id")) == null ? null : tmp_24_0.invalid) && ((tmp_24_0 = ctx.form.get("property_id")) == null ? null : tmp_24_0.touched));
      \u0275\u0275property("matAutocomplete", autoProperty_r10);
      \u0275\u0275attribute("aria-describedby", ((tmp_26_0 = ctx.form.get("property_id")) == null ? null : tmp_26_0.invalid) && ((tmp_26_0 = ctx.form.get("property_id")) == null ? null : tmp_26_0.touched) ? "property-error" : "property-help-text")("aria-invalid", ((tmp_27_0 = ctx.form.get("property_id")) == null ? null : tmp_27_0.invalid) && ((tmp_27_0 = ctx.form.get("property_id")) == null ? null : tmp_27_0.touched));
      \u0275\u0275advance(4);
      \u0275\u0275conditional(((tmp_28_0 = ctx.form.get("property_id")) == null ? null : tmp_28_0.invalid) && ((tmp_28_0 = ctx.form.get("property_id")) == null ? null : tmp_28_0.touched) ? 38 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("displayWith", ctx.displayProperty.bind(ctx));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredProperties());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredProperties().length === 0);
      \u0275\u0275advance(7);
      \u0275\u0275property("matAutocomplete", autoSeller_r11);
      \u0275\u0275advance(2);
      \u0275\u0275property("displayWith", ctx.displaySeller.bind(ctx));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filteredSellers());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredSellers().length === 0);
      \u0275\u0275advance(5);
      \u0275\u0275property("label", "Fecha de Contrato *")("form_control", ctx.form.get("contract_date"))("type", "date");
      \u0275\u0275advance();
      \u0275\u0275property("label", "Precio Total *")("placeholder", "0.00")("form_control", ctx.form.get("total_price"))("type", "number");
      \u0275\u0275advance();
      \u0275\u0275property("label", "Enganche *")("placeholder", "0.00")("form_control", ctx.form.get("down_payment"))("type", "number");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.formattedRemainingBalance(), " ");
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
    SelectComponent
  ], styles: ["\n\n.modal-container[_ngcontent-%COMP%] {\n  width: 900px;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: background-color 0.2s;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-header[_ngcontent-%COMP%]   .close-button[_ngcontent-%COMP%]:hover {\n  background-color: #f3f4f6;\n}\n.modal-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.modal-body[_ngcontent-%COMP%]   .section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 1rem;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-with-button[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-end;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-with-button[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.625rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input.error-border[_ngcontent-%COMP%] {\n  border-color: #f87171;\n}\n.modal-body[_ngcontent-%COMP%]   .autocomplete-field[_ngcontent-%COMP%]   .autocomplete-input.error-border[_ngcontent-%COMP%]:focus {\n  border-color: #ef4444;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.modal-body[_ngcontent-%COMP%]   .no-results-text[_ngcontent-%COMP%] {\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-style: italic;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n}\n.grid-cols-2[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.gap-4[_ngcontent-%COMP%] {\n  gap: 1rem;\n}\n.mt-4[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n  .mat-mdc-autocomplete-panel {\n  background: white;\n  border-radius: 0.375rem;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e5e7eb;\n  max-height: 256px;\n  overflow-y: auto;\n}\n  .mat-mdc-autocomplete-panel .mat-mdc-option {\n  font-size: 0.875rem;\n  padding: 0.75rem 1rem;\n  min-height: 48px;\n}\n  .mat-mdc-autocomplete-panel .mat-mdc-option:hover {\n  background-color: #f3f4f6;\n}\n  .mat-mdc-autocomplete-panel .mat-mdc-option.mat-mdc-option-active, \n  .mat-mdc-autocomplete-panel .mat-mdc-option.mdc-list-item--selected {\n  background-color: #eef2ff;\n  color: #4f46e5;\n}\n  .mat-mdc-autocomplete-panel .mat-mdc-option .mdc-list-item__primary-text {\n  color: #374151;\n}\n/*# sourceMappingURL=contract-create-modal.component.css.map */"] });
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
      SelectComponent
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
      <!-- Secci\xF3n: Datos del Contrato -->\r
      <div class="section">\r
        <h3>Datos del Contrato</h3>\r
        <div class="grid grid-cols-2 gap-4">\r
          <app-input\r
            [label]="'Fecha de Contrato *'"\r
            [form_control]="form.get('contract_date')"\r
            [type]="'date'">\r
          </app-input>\r
\r
          <app-input\r
            [label]="'Precio Total *'"\r
            [placeholder]="'0.00'"\r
            [form_control]="form.get('total_price')"\r
            [type]="'number'">\r
          </app-input>\r
\r
          <app-input\r
            [label]="'Enganche *'"\r
            [placeholder]="'0.00'"\r
            [form_control]="form.get('down_payment')"\r
            [type]="'number'">\r
          </app-input>\r
\r
          <div class="w-full p-1">\r
            <label class="block text-sm font-medium text-gray-700 mb-1">\r
              Saldo Pendiente\r
            </label>\r
            <div class="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700">\r
              {{ formattedRemainingBalance() }}\r
            </div>\r
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
`, styles: ["/* src/app/features/contracts/components/contract-create-modal/contract-create-modal.component.scss */\n.modal-container {\n  width: 900px;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n}\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid #e5e7eb;\n}\n.modal-header h2 {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #111827;\n  margin: 0;\n}\n.modal-header .close-button {\n  padding: 0.5rem;\n  border-radius: 0.375rem;\n  transition: background-color 0.2s;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-header .close-button:hover {\n  background-color: #f3f4f6;\n}\n.modal-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1.5rem;\n}\n.modal-body .section {\n  margin-bottom: 2rem;\n}\n.modal-body .section h3 {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 1rem;\n}\n.modal-body .autocomplete-with-button {\n  display: flex;\n  gap: 1rem;\n  align-items: flex-end;\n}\n.modal-body .autocomplete-with-button .autocomplete-field {\n  flex: 1;\n}\n.modal-body .autocomplete-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.modal-body .autocomplete-field .field-label {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #374151;\n}\n.modal-body .autocomplete-field .autocomplete-input {\n  width: 100%;\n  padding: 0.625rem 0.75rem;\n  border: 1px solid #d1d5db;\n  border-radius: 0.375rem;\n  font-size: 0.875rem;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.modal-body .autocomplete-field .autocomplete-input:focus {\n  outline: none;\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n}\n.modal-body .autocomplete-field .autocomplete-input::placeholder {\n  color: #9ca3af;\n}\n.modal-body .autocomplete-field .autocomplete-input.error-border {\n  border-color: #f87171;\n}\n.modal-body .autocomplete-field .autocomplete-input.error-border:focus {\n  border-color: #ef4444;\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);\n}\n.modal-body .no-results-text {\n  color: #6b7280;\n  font-size: 0.875rem;\n  font-style: italic;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.5rem;\n  border-top: 1px solid #e5e7eb;\n}\n.grid {\n  display: grid;\n}\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.gap-4 {\n  gap: 1rem;\n}\n.mt-4 {\n  margin-top: 1rem;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n::ng-deep .mat-mdc-autocomplete-panel {\n  background: white;\n  border-radius: 0.375rem;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e5e7eb;\n  max-height: 256px;\n  overflow-y: auto;\n}\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option {\n  font-size: 0.875rem;\n  padding: 0.75rem 1rem;\n  min-height: 48px;\n}\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option:hover {\n  background-color: #f3f4f6;\n}\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option.mat-mdc-option-active,\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option.mdc-list-item--selected {\n  background-color: #eef2ff;\n  color: #4f46e5;\n}\n::ng-deep .mat-mdc-autocomplete-panel .mat-mdc-option .mdc-list-item__primary-text {\n  color: #374151;\n}\n/*# sourceMappingURL=contract-create-modal.component.css.map */\n"] }]
  }], () => [{ type: FormBuilder }, { type: MatDialogRef }, { type: ContractService }, { type: CustomerService }, { type: PropertyService }, { type: UserService }, { type: InterceptorService }, { type: MatDialog }], { customerAutocompleteTrigger: [{
    type: ViewChild,
    args: ["customerAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }], propertyAutocompleteTrigger: [{
    type: ViewChild,
    args: ["propertyAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }], sellerAutocompleteTrigger: [{
    type: ViewChild,
    args: ["sellerAutocompleteTrigger", { read: MatAutocompleteTrigger }]
  }], modalBody: [{
    type: ViewChild,
    args: ["modalBody"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractCreateModalComponent, { className: "ContractCreateModalComponent", filePath: "src/app/features/contracts/components/contract-create-modal/contract-create-modal.component.ts", lineNumber: 35 });
})();

// src/app/features/contracts/components/contract-filter-indicator/contract-filter-indicator.component.ts
function ContractFilterIndicatorComponent_div_0_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "i");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 8);
    \u0275\u0275listener("click", function ContractFilterIndicatorComponent_div_0_div_5_Template_button_click_4_listener() {
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
function ContractFilterIndicatorComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "span", 3);
    \u0275\u0275text(3, "Filtros activos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275template(5, ContractFilterIndicatorComponent_div_0_div_5_Template, 6, 3, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 6);
    \u0275\u0275listener("click", function ContractFilterIndicatorComponent_div_0_Template_button_click_6_listener() {
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
var ContractFilterIndicatorComponent = class _ContractFilterIndicatorComponent {
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
        return "pi-filter";
      case "search":
        return "pi-search";
      default:
        return "pi-filter";
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
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContractFilterIndicatorComponent, selectors: [["app-contract-filter-indicator"]], inputs: { activeSearchTerm: "activeSearchTerm", activeStatusFilter: "activeStatusFilter" }, outputs: { filterClear: "filterClear" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "filter-indicator", 4, "ngIf"], [1, "filter-indicator"], [1, "filters-container"], [1, "filters-label"], [1, "filter-chips"], ["class", "filter-chip", 4, "ngFor", "ngForOf"], ["type", "button", "pButton", "", "label", "Limpiar todos", 1, "p-button-sm", "p-button-text", 3, "click"], [1, "filter-chip"], ["type", "button", "title", "Limpiar filtro", 1, "remove-btn", 3, "click"], [1, "pi", "pi-times"]], template: function ContractFilterIndicatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, ContractFilterIndicatorComponent_div_0_Template, 7, 1, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", ctx.hasActiveFilters());
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, ButtonModule, ButtonDirective], styles: ["\n\n.filter-indicator[_ngcontent-%COMP%] {\n  background-color: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filters-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1e40af;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  border: 1px solid #3b82f6;\n  border-radius: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  color: #1e40af;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #1e40af;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  transition: color 0.2s ease;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%]   .remove-btn[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .clear-all-btn[_ngcontent-%COMP%] {\n  margin-left: auto;\n}\n@media (max-width: 767px) {\n  .filter-indicator[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filters-label[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n  }\n  .filter-indicator[_ngcontent-%COMP%]   .filters-container[_ngcontent-%COMP%]   .filter-chips[_ngcontent-%COMP%]   .filter-chip[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=contract-filter-indicator.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContractFilterIndicatorComponent, [{
    type: Component,
    args: [{ selector: "app-contract-filter-indicator", standalone: true, imports: [CommonModule, ButtonModule], template: `<div *ngIf="hasActiveFilters()" class="filter-indicator">
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
</div>`, styles: ["/* angular:styles/component:scss;5eafe1f49632f40ef030e9f3893b4585823f916072e39b713d6bd8d40ec593aa;C:/Projects/Synergy/sinergy-erp-frontend-clients/src/app/features/contracts/components/contract-filter-indicator/contract-filter-indicator.component.ts */\n.filter-indicator {\n  background-color: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 0.375rem;\n  padding: 1rem;\n  margin-bottom: 1rem;\n}\n.filter-indicator .filters-container {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.filter-indicator .filters-container .filters-label {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #1e40af;\n}\n.filter-indicator .filters-container .filter-chips {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: white;\n  border: 1px solid #3b82f6;\n  border-radius: 0.25rem;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n  color: #1e40af;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip i {\n  font-size: 0.75rem;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn {\n  background: none;\n  border: none;\n  color: #1e40af;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  transition: color 0.2s ease;\n}\n.filter-indicator .filters-container .filter-chips .filter-chip .remove-btn:hover {\n  color: #dc2626;\n}\n.filter-indicator .filters-container .clear-all-btn {\n  margin-left: auto;\n}\n@media (max-width: 767px) {\n  .filter-indicator {\n    padding: 0.75rem;\n  }\n  .filter-indicator .filters-container {\n    gap: 0.5rem;\n  }\n  .filter-indicator .filters-container .filters-label {\n    font-size: 0.8125rem;\n  }\n  .filter-indicator .filters-container .filter-chips .filter-chip {\n    font-size: 0.8125rem;\n    padding: 0.25rem 0.5rem;\n  }\n}\n/*# sourceMappingURL=contract-filter-indicator.component.css.map */\n"] }]
  }], null, { activeSearchTerm: [{
    type: Input
  }], activeStatusFilter: [{
    type: Input
  }], filterClear: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractFilterIndicatorComponent, { className: "ContractFilterIndicatorComponent", filePath: "src/app/features/contracts/components/contract-filter-indicator/contract-filter-indicator.component.ts", lineNumber: 126 });
})();

// src/app/features/contracts/pages/contracts-list/contracts-list.component.ts
var _c02 = ["tableTemplate"];
function ContractsListComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12);
    \u0275\u0275listener("click", function ContractsListComponent_div_9_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter("total"));
    });
    \u0275\u0275elementStart(2, "div", 13)(3, "p", 14);
    \u0275\u0275text(4, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 15);
    \u0275\u0275text(6, "Todos los contratos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 16)(8, "p", 17);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 18);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 19);
    \u0275\u0275listener("click", function ContractsListComponent_div_9_Template_div_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter("completed"));
    });
    \u0275\u0275elementStart(14, "div", 13)(15, "p", 20);
    \u0275\u0275text(16, "Completados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 21);
    \u0275\u0275text(18, "Pagados en su totalidad");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 16)(20, "p", 22);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 23);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 24);
    \u0275\u0275listener("click", function ContractsListComponent_div_9_Template_div_click_25_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter("pending"));
    });
    \u0275\u0275elementStart(26, "div", 13)(27, "p", 25);
    \u0275\u0275text(28, "Activos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p", 26);
    \u0275\u0275text(30, "En proceso de pago");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 27)(32, "p", 28);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 29);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 30)(38, "span", 31);
    \u0275\u0275text(39, "Pagado: ");
    \u0275\u0275elementStart(40, "strong");
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "span", 32);
    \u0275\u0275text(44, "Pendiente: ");
    \u0275\u0275elementStart(45, "strong");
    \u0275\u0275text(46);
    \u0275\u0275pipe(47, "currency");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 33);
    \u0275\u0275listener("click", function ContractsListComponent_div_9_Template_div_click_48_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter("overdue"));
    });
    \u0275\u0275elementStart(49, "div", 13)(50, "p", 34);
    \u0275\u0275text(51, "Vencidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "p", 35);
    \u0275\u0275text(53, "Con pagos atrasados");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 27)(55, "p", 36);
    \u0275\u0275text(56);
    \u0275\u0275pipe(57, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "span", 37);
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 30)(61, "span", 38);
    \u0275\u0275text(62, "Contratos: ");
    \u0275\u0275elementStart(63, "strong");
    \u0275\u0275text(64);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "span", 38);
    \u0275\u0275text(66, "Pagos: ");
    \u0275\u0275elementStart(67, "strong");
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("ring-2", ctx_r2.activeFilter() === "total")("ring-gray-500", ctx_r2.activeFilter() === "total");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(10, 28, ctx_r2.stats().total.value, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.stats().total.count);
    \u0275\u0275advance();
    \u0275\u0275classProp("ring-2", ctx_r2.activeFilter() === "completed")("ring-blue-500", ctx_r2.activeFilter() === "completed");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(22, 33, ctx_r2.stats().completed.value, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.stats().completed.count);
    \u0275\u0275advance();
    \u0275\u0275classProp("ring-2", ctx_r2.activeFilter() === "pending")("ring-green-500", ctx_r2.activeFilter() === "pending");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(34, 38, ctx_r2.stats().pending.value, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.stats().pending.count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(42, 43, ctx_r2.stats().pending.paid, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(47, 48, ctx_r2.stats().pending.remaining, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("ring-2", ctx_r2.activeFilter() === "overdue")("ring-red-500", ctx_r2.activeFilter() === "overdue");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(57, 53, ctx_r2.stats().overdue.value, "USD", "symbol", "1.0-0"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.stats().overdue.contracts_count);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.stats().overdue.contracts_count);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.stats().overdue.payments_count);
  }
}
function ContractsListComponent_ng_template_11_span_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275listener("click", function ContractsListComponent_ng_template_11_span_4_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.navigateToCustomer(item_r6.customer.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r2.getCustomerName(item_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCustomerName(item_r6), " ");
  }
}
function ContractsListComponent_ng_template_11_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractsListComponent_ng_template_11_span_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 49);
    \u0275\u0275listener("click", function ContractsListComponent_ng_template_11_span_7_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.navigateToProperty(item_r6.property.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r6.property.code, " ");
  }
}
function ContractsListComponent_ng_template_11_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275elementEnd();
  }
}
function ContractsListComponent_ng_template_11_div_23_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r6.overdue_payments_count, " ");
  }
}
function ContractsListComponent_ng_template_11_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "lucide-icon", 51);
    \u0275\u0275template(2, ContractsListComponent_ng_template_11_div_23_span_2_Template, 2, 1, "span", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("title", item_r6.overdue_payments_count + " pagos vencidos");
    \u0275\u0275advance();
    \u0275\u0275property("img", ctx_r2.AlertCircle);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r6.overdue_payments_count > 1);
  }
}
function ContractsListComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td")(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275template(4, ContractsListComponent_ng_template_11_span_4_Template, 2, 2, "span", 40)(5, ContractsListComponent_ng_template_11_span_5_Template, 2, 0, "span", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275template(7, ContractsListComponent_ng_template_11_span_7_Template, 2, 1, "span", 42)(8, ContractsListComponent_ng_template_11_span_8_Template, 2, 0, "span", 41);
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
    \u0275\u0275elementStart(18, "td")(19, "div", 43)(20, "span");
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, ContractsListComponent_ng_template_11_div_23_Template, 3, 3, "div", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "td")(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "td", 45);
    \u0275\u0275listener("click", function ContractsListComponent_ng_template_11_Template_td_click_27_listener($event) {
      \u0275\u0275restoreView(_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(28, "app-button", 46);
    \u0275\u0275listener("clicked", function ContractsListComponent_ng_template_11_Template_app_button_clicked_28_listener() {
      const item_r6 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.viewDetail(item_r6));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", item_r6.contract_number, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r6.customer);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r6.customer);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r6.property);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r6.property);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 15, item_r6.contract_date, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 18, item_r6.total_price, item_r6.currency));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 21, item_r6.remaining_balance, item_r6.currency));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(22, 24, item_r6.next_payment_date, "mediumDate"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r6.has_overdue);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getStatusClass(item_r6.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getStatusLabel(item_r6.status), " ");
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
    const dialogRef = this.dialog.open(ContractCreateModalComponent, {
      width: "900px",
      disableClose: false
    });
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
    const dialogRef = this.dialog.open(ContractDetailModalComponent, {
      data: { contract }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "deleted" || result === true) {
        this.getContracts();
        this.loadStats();
      }
    });
  }
  navigateToCustomer(customerId) {
    this.router.navigate(["/customers/detail", customerId]);
  }
  navigateToProperty(propertyId) {
    this.propertyService.getProperty(propertyId).subscribe({
      next: (property) => {
        this.dialog.open(PropertyEditModalComponent, {
          data: { property }
        });
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
  }, decls: 13, vars: 7, consts: [["tableTemplate", ""], [1, "px-4"], [1, "flex", "flex-col", "gap-3", "md:flex-row", "md:items-center", "md:justify-between", "mb-4"], [1, "text-2xl", "font-semibold", "text-gray-800"], [1, "flex", "items-center", "gap-3"], ["param_name", "search", 1, "w-64", 3, "searchChange", "param_activate"], ["text", "Crear Contrato", "custom_class", "btn_primary", 3, "clicked"], ["custom_class", "btn_primary", "size", "md", "matTooltip", "Reporte general", "matTooltipPosition", "above", 3, "clicked", "icon"], [3, "filterClear", "activeSearchTerm", "activeStatusFilter"], ["class", "grid grid-cols-4 gap-4 mb-6", 4, "ngIf"], [3, "pageChange", "sortChange", "rowClick", "config", "rowTemplate"], [1, "grid", "grid-cols-4", "gap-4", "mb-6"], [1, "bg-gradient-to-br", "from-gray-50", "to-gray-100", "p-4", "rounded-xl", "border", "border-gray-200", "cursor-pointer", "hover:shadow-lg", "transition-all", 3, "click"], [1, "mb-2"], [1, "text-xs", "text-gray-600", "font-semibold", "uppercase", "tracking-wide", "mb-0.5"], [1, "text-[10px]", "text-gray-500"], [1, "flex", "items-center", "justify-between"], [1, "text-xl", "font-bold", "text-gray-900"], [1, "text-2xl", "font-bold", "text-gray-900"], [1, "bg-gradient-to-br", "from-blue-50", "to-blue-100", "p-4", "rounded-xl", "border", "border-blue-200", "cursor-pointer", "hover:shadow-lg", "transition-all", 3, "click"], [1, "text-xs", "text-blue-600", "font-semibold", "uppercase", "tracking-wide", "mb-0.5"], [1, "text-[10px]", "text-blue-500"], [1, "text-xl", "font-bold", "text-blue-900"], [1, "text-2xl", "font-bold", "text-blue-900"], [1, "bg-gradient-to-br", "from-green-50", "to-green-100", "p-4", "rounded-xl", "border", "border-green-200", "cursor-pointer", "hover:shadow-lg", "transition-all", 3, "click"], [1, "text-xs", "text-green-600", "font-semibold", "uppercase", "tracking-wide", "mb-0.5"], [1, "text-[10px]", "text-green-500"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-xl", "font-bold", "text-green-900"], [1, "text-2xl", "font-bold", "text-green-900"], [1, "flex", "gap-2", "text-xs"], [1, "text-green-700"], [1, "text-orange-700"], [1, "bg-gradient-to-br", "from-red-50", "to-red-100", "p-4", "rounded-xl", "border", "border-red-200", "cursor-pointer", "hover:shadow-lg", "transition-all", 3, "click"], [1, "text-xs", "text-red-600", "font-semibold", "uppercase", "tracking-wide", "mb-0.5"], [1, "text-[10px]", "text-red-500"], [1, "text-xl", "font-bold", "text-red-900"], [1, "text-2xl", "font-bold", "text-red-900"], [1, "text-red-700"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-purple-100", "text-purple-800", "whitespace-nowrap"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors max-w-[200px] truncate", 3, "title", "click", 4, "ngIf"], ["class", "text-sm text-gray-400", 4, "ngIf"], ["class", "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap cursor-pointer hover:bg-green-200 transition-colors", 3, "click", 4, "ngIf"], [1, "flex", "items-center", "gap-2"], ["class", "flex items-center gap-1", 3, "title", 4, "ngIf"], [3, "click"], ["text", "Detalle", "size", "sm", "custom_class", "btn_primary", 3, "clicked", "fullWidth", "icon"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-blue-100", "text-blue-800", "cursor-pointer", "hover:bg-blue-200", "transition-colors", "max-w-[200px]", "truncate", 3, "click", "title"], [1, "text-sm", "text-gray-400"], [1, "inline-flex", "items-center", "px-2", "py-1", "rounded", "text-xs", "font-medium", "bg-green-100", "text-green-800", "whitespace-nowrap", "cursor-pointer", "hover:bg-green-200", "transition-colors", 3, "click"], [1, "flex", "items-center", "gap-1", 3, "title"], [1, "w-5", "h-5", "text-red-500", 3, "img"], ["class", "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white", 4, "ngIf"], [1, "inline-flex", "items-center", "px-2", "py-0.5", "rounded-full", "text-xs", "font-bold", "bg-red-500", "text-white"]], template: function ContractsListComponent_Template(rf, ctx) {
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
      \u0275\u0275elementStart(6, "app-button", 6);
      \u0275\u0275listener("clicked", function ContractsListComponent_Template_app_button_clicked_6_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openCreateContractModal());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "app-button", 7);
      \u0275\u0275listener("clicked", function ContractsListComponent_Template_app_button_clicked_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.downloadGeneralReport());
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "app-contract-filter-indicator", 8);
      \u0275\u0275listener("filterClear", function ContractsListComponent_Template_app_contract_filter_indicator_filterClear_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFilterClear($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, ContractsListComponent_div_9_Template, 69, 58, "div", 9);
      \u0275\u0275elementStart(10, "app-datatable-wrapper", 10);
      \u0275\u0275listener("pageChange", function ContractsListComponent_Template_app_datatable_wrapper_pageChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      })("sortChange", function ContractsListComponent_Template_app_datatable_wrapper_sortChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSortChange($event));
      })("rowClick", function ContractsListComponent_Template_app_datatable_wrapper_rowClick_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onRowClick($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(11, ContractsListComponent_ng_template_11_Template, 29, 27, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const tableTemplate_r8 = \u0275\u0275reference(12);
      \u0275\u0275advance(5);
      \u0275\u0275property("param_activate", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("icon", ctx.Download);
      \u0275\u0275advance();
      \u0275\u0275property("activeSearchTerm", ctx.search)("activeStatusFilter", ctx.getActiveStatusFilter());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.stats());
      \u0275\u0275advance();
      \u0275\u0275property("config", ctx.table_config())("rowTemplate", tableTemplate_r8);
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
  ], styles: ["\n\n/*# sourceMappingURL=contracts-list.component.css.map */"] });
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
    ], template: `<div class="px-4">\r
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">\r
    <h2 class="text-2xl font-semibold text-gray-800">Contratos</h2>\r
\r
    <div class="flex items-center gap-3">\r
      <app-search\r
        class="w-64"\r
        [param_activate]="true"\r
        param_name="search"\r
        (searchChange)="onSearchChange($event)">\r
      </app-search>\r
\r
      <app-button\r
        text="Crear Contrato"\r
        custom_class="btn_primary"\r
        (clicked)="openCreateContractModal()">\r
      </app-button>\r
\r
      <app-button\r
        custom_class="btn_primary"\r
        [icon]="Download"\r
        size="md"\r
        (clicked)="downloadGeneralReport()"\r
        matTooltip="Reporte general"\r
        matTooltipPosition="above">\r
      </app-button>\r
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
  <!-- Stats Cards -->\r
  <div *ngIf="stats()" class="grid grid-cols-4 gap-4 mb-6">\r
    <!-- Total -->\r
    <div \r
      (click)="applyFilter('total')"\r
      [class.ring-2]="activeFilter() === 'total'"\r
      [class.ring-gray-500]="activeFilter() === 'total'"\r
      class="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 cursor-pointer hover:shadow-lg transition-all">\r
      <div class="mb-2">\r
        <p class="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-0.5">Total</p>\r
        <p class="text-[10px] text-gray-500">Todos los contratos</p>\r
      </div>\r
      <div class="flex items-center justify-between">\r
        <p class="text-xl font-bold text-gray-900">{{ stats()!.total.value | currency:'USD':'symbol':'1.0-0' }}</p>\r
        <span class="text-2xl font-bold text-gray-900">{{ stats()!.total.count }}</span>\r
      </div>\r
    </div>\r
\r
    <!-- Completados -->\r
    <div \r
      (click)="applyFilter('completed')"\r
      [class.ring-2]="activeFilter() === 'completed'"\r
      [class.ring-blue-500]="activeFilter() === 'completed'"\r
      class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 cursor-pointer hover:shadow-lg transition-all">\r
      <div class="mb-2">\r
        <p class="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-0.5">Completados</p>\r
        <p class="text-[10px] text-blue-500">Pagados en su totalidad</p>\r
      </div>\r
      <div class="flex items-center justify-between">\r
        <p class="text-xl font-bold text-blue-900">{{ stats()!.completed.value | currency:'USD':'symbol':'1.0-0' }}</p>\r
        <span class="text-2xl font-bold text-blue-900">{{ stats()!.completed.count }}</span>\r
      </div>\r
    </div>\r
\r
    <!-- Activos (Pendientes) -->\r
    <div \r
      (click)="applyFilter('pending')"\r
      [class.ring-2]="activeFilter() === 'pending'"\r
      [class.ring-green-500]="activeFilter() === 'pending'"\r
      class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 cursor-pointer hover:shadow-lg transition-all">\r
      <div class="mb-2">\r
        <p class="text-xs text-green-600 font-semibold uppercase tracking-wide mb-0.5">Activos</p>\r
        <p class="text-[10px] text-green-500">En proceso de pago</p>\r
      </div>\r
      <div class="flex items-center justify-between mb-2">\r
        <p class="text-xl font-bold text-green-900">{{ stats()!.pending.value | currency:'USD':'symbol':'1.0-0' }}</p>\r
        <span class="text-2xl font-bold text-green-900">{{ stats()!.pending.count }}</span>\r
      </div>\r
      <div class="flex gap-2 text-xs">\r
        <span class="text-green-700">Pagado: <strong>{{ stats()!.pending.paid | currency:'USD':'symbol':'1.0-0' }}</strong></span>\r
        <span class="text-orange-700">Pendiente: <strong>{{ stats()!.pending.remaining | currency:'USD':'symbol':'1.0-0' }}</strong></span>\r
      </div>\r
    </div>\r
\r
    <!-- Vencidos -->\r
    <div \r
      (click)="applyFilter('overdue')"\r
      [class.ring-2]="activeFilter() === 'overdue'"\r
      [class.ring-red-500]="activeFilter() === 'overdue'"\r
      class="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200 cursor-pointer hover:shadow-lg transition-all">\r
      <div class="mb-2">\r
        <p class="text-xs text-red-600 font-semibold uppercase tracking-wide mb-0.5">Vencidos</p>\r
        <p class="text-[10px] text-red-500">Con pagos atrasados</p>\r
      </div>\r
      <div class="flex items-center justify-between mb-2">\r
        <p class="text-xl font-bold text-red-900">{{ stats()!.overdue.value | currency:'USD':'symbol':'1.0-0' }}</p>\r
        <span class="text-2xl font-bold text-red-900">{{ stats()!.overdue.contracts_count }}</span>\r
      </div>\r
      <div class="flex gap-2 text-xs">\r
        <span class="text-red-700">Contratos: <strong>{{ stats()!.overdue.contracts_count }}</strong></span>\r
        <span class="text-red-700">Pagos: <strong>{{ stats()!.overdue.payments_count }}</strong></span>\r
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
`, styles: ["/* src/app/features/contracts/pages/contracts-list/contracts-list.component.scss */\n/*# sourceMappingURL=contracts-list.component.css.map */\n"] }]
  }], () => [{ type: Router }, { type: ActivatedRoute }, { type: ContractService }, { type: PropertyService }, { type: MatDialog }, { type: InterceptorService }], { tableTemplate: [{
    type: ViewChild,
    args: ["tableTemplate"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContractsListComponent, { className: "ContractsListComponent", filePath: "src/app/features/contracts/pages/contracts-list/contracts-list.component.ts", lineNumber: 37 });
})();
export {
  ContractsListComponent
};
//# sourceMappingURL=chunk-IR55O5S3.js.map
