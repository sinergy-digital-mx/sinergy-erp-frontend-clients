import { Component, OnInit, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { LucideAngularModule, X } from 'lucide-angular';
import { combineLatest, startWith, debounceTime, distinctUntilChanged, forkJoin, fromEvent } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { ContractService } from '../../services/contract.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { PropertyService } from '../../../properties/services/property.service';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { CreateContractDto } from '../../models/contract.model';
import { CustomerEditModalComponent } from '../../../customers/components/customer-edit-modal/customer-edit-modal.component';
import { CUSTOMER_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { GroupSelectComponent } from '../../../../core/components/group-select/group-select.component';
import { LeadService } from '../../../../core/services/leads.service';

/**
 * Convierte montos del formulario a número.
 * Evita parseFloat('36,000') === 36; acepta miles con coma (36,000), decimal (36000,50), EU (1.234,56).
 */
function parseContractAmount(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const raw = String(value).trim().replace(/\s/g, '').replace(/\u00a0/g, '');
  if (!raw) return 0;

  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(raw)) {
    return parseFloat(raw.replace(/,/g, '')) || 0;
  }
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(raw)) {
    const withoutThousands = raw.replace(/\./g, '');
    return parseFloat(withoutThousands.replace(',', '.')) || 0;
  }
  if (/^\d+,\d{1,2}$/.test(raw)) {
    return parseFloat(raw.replace(',', '.')) || 0;
  }
  const fallback = raw.replace(/,/g, '');
  const n = parseFloat(fallback);
  return Number.isFinite(n) ? n : 0;
}

function contractMoneyValidator(control: AbstractControl): ValidationErrors | null {
  const raw = control.value;
  if (raw === null || raw === undefined || (typeof raw === 'string' && raw.trim() === '')) {
    return { required: true };
  }
  const n = parseContractAmount(raw);
  if (!Number.isFinite(n) || n < 0) {
    return { min: true };
  }
  return null;
}

/** Permite vacío o 0 (meta de enganche desconocida al crear). */
function contractMoneyOptionalValidator(control: AbstractControl): ValidationErrors | null {
  const raw = control.value;
  if (raw === null || raw === undefined || (typeof raw === 'string' && raw.trim() === '')) {
    return null;
  }
  const n = parseContractAmount(raw);
  if (!Number.isFinite(n) || n < 0) {
    return { min: true };
  }
  return null;
}

@Component({
  selector: 'app-contract-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    GroupSelectComponent
  ],
  templateUrl: './contract-create-modal.component.html',
  styleUrls: ['./contract-create-modal.component.scss']
})
export class ContractCreateModalComponent implements OnInit, AfterViewInit {
  readonly X = X;

  @ViewChild('customerAutocompleteTrigger', { read: MatAutocompleteTrigger }) customerAutocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('propertyAutocompleteTrigger', { read: MatAutocompleteTrigger }) propertyAutocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('sellerAutocompleteTrigger', { read: MatAutocompleteTrigger }) sellerAutocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('leadAutocompleteTrigger', { read: MatAutocompleteTrigger }) leadAutocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('modalBody') modalBody: ElementRef;

  // Signals para estado reactivo
  loading = signal(false);
  customers = signal<any[]>([]);
  filteredCustomers = signal<any[]>([]);
  properties = signal<any[]>([]);
  filteredProperties = signal<any[]>([]);
  sellers = signal<any[]>([]);
  filteredSellers = signal<any[]>([]);
  leads = signal<any[]>([]);
  filteredLeads = signal<any[]>([]);
  propertyListPrice = signal<number | null>(null);
  
  // Signals para valores formateados
  formattedRemainingBalance = signal<string>('0.00');
  formattedMonthlyPayment = signal<string>('0.00');

  // Formulario reactivo
  form: FormGroup;

  // Configuraciones para selects
  currencySelectConfig: ISelect = {
    placeholder: 'Selecciona una moneda',
    data: [
      { value: 'MXN', label: 'MXN - Peso Mexicano' },
      { value: 'USD', label: 'USD - Dólar' },
      { value: 'EUR', label: 'EUR - Euro' }
    ],
    value: 'value',
    option: 'label',
    form_control: null
  };

  statusSelectConfig: ISelect = {
    placeholder: 'Selecciona un estado',
    data: [
      { value: 'activo', label: 'Activo' },
      { value: 'completado', label: 'Completado' },
      { value: 'cancelado', label: 'Cancelado' },
      { value: 'suspendido', label: 'Suspendido' }
    ],
    value: 'value',
    option: 'label',
    form_control: null
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContractCreateModalComponent>,
    private contractService: ContractService,
    private customerService: CustomerService,
    private propertyService: PropertyService,
    private userService: UserService,
    private interceptorService: InterceptorService,
    private dialog: MatDialog,
    private leadService: LeadService
  ) {
    this.form = this.fb.group({
      // Búsqueda y selección
      customer_search: [''],
      customer_id: [null, Validators.required],
      property_search: [''],
      property_id: ['', Validators.required],
      seller_search: [''],
      seller_id: [null],
      lead_search: [''],
      lead_id: [null],
      lead_group_id: [null],
      list_price: [null, [contractMoneyOptionalValidator]],

      // Datos del contrato
      contract_date: [this.getTodayDate(), Validators.required],
      total_price: [0, [contractMoneyValidator]],
      down_payment: [0, [contractMoneyValidator]],
      payment_months: [1, [Validators.required, Validators.min(1)]],
      first_payment_date: ['', Validators.required],
      currency: ['MXN', Validators.required],
      status: ['activo', Validators.required],
      notes: [''],

      // Campos calculados (readonly en UI)
      remaining_balance: [{ value: 0, disabled: true }],
      monthly_payment: [{ value: 0, disabled: true }],

      // Enganche financiado: solo habilita la pestaña; cuotas se generan en detalle
      down_payment_financed: [false]
    });

    // Vincular form controls a las configuraciones de select
    this.currencySelectConfig.form_control = this.form.get('currency');
    this.statusSelectConfig.form_control = this.form.get('status');
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setupCalculations();
    this.setupDownPaymentFinancingRules();
    this.loadInitialData();
  }

  /** Al financiar enganche: meta opcional (puede ser 0); sin meses/fechas en el alta. */
  private setupDownPaymentFinancingRules(): void {
    const financed = this.form.get('down_payment_financed')!;
    const downPayment = this.form.get('down_payment')!;

    const apply = (isFinanced: boolean) => {
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

  ngAfterViewInit(): void {
    // Cerrar autocompletados cuando se hace scroll en el modal
    if (this.modalBody) {
      fromEvent(this.modalBody.nativeElement, 'scroll').subscribe(() => {
        if (this.customerAutocompleteTrigger?.panelOpen) {
          this.customerAutocompleteTrigger.closePanel();
        }
        if (this.propertyAutocompleteTrigger?.panelOpen) {
          this.propertyAutocompleteTrigger.closePanel();
        }
      });
    }
  }

  private getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  initializeForm(): void {
    // Configurar debouncing para búsqueda de clientes
    this.form.get('customer_search')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterCustomers(searchTerm || '');
      });

    // Configurar debouncing para búsqueda de propiedades
    this.form.get('property_search')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterProperties(searchTerm || '');
      });

    // Configurar debouncing para búsqueda de vendedores
    this.form.get('seller_search')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterSellers(searchTerm || '');
      });

    this.form.get('lead_search')!.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(searchTerm => {
        this.filterLeads(searchTerm || '');
      });
  }

  setupCalculations(): void {
    combineLatest([
      this.form.get('total_price')!.valueChanges.pipe(startWith(this.form.get('total_price')!.value)),
      this.form.get('down_payment')!.valueChanges.pipe(startWith(this.form.get('down_payment')!.value)),
      this.form.get('down_payment_financed')!.valueChanges.pipe(startWith(this.form.get('down_payment_financed')!.value))
    ]).subscribe(() => {
      this.calculateRemainingBalance();
    });

    // Recalcular pago mensual cuando cambia saldo pendiente o meses
    combineLatest([
      this.form.get('remaining_balance')!.valueChanges.pipe(startWith(this.form.get('remaining_balance')!.value)),
      this.form.get('payment_months')!.valueChanges.pipe(startWith(this.form.get('payment_months')!.value))
    ]).subscribe(() => {
      this.calculateMonthlyPayment();
    });
  }

  loadInitialData(): void {
    // Cargar datos en paralelo usando forkJoin
    // Usar limit máximo permitido por el API
    forkJoin({
      customers: this.customerService.getCustomers({ limit: 100 }),
      properties: this.propertyService.getProperties({ status: 'disponible', limit: 100 }),
      sellers: this.userService.getUsers()
    }).subscribe({
      next: ({ customers, properties, sellers }) => {
        // Procesar clientes - manejar tanto respuestas paginadas como arrays directos
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

        // Procesar propiedades - manejar tanto respuestas paginadas como arrays directos
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

        // Procesar vendedores
        let sellerData = [];
        if (sellers && Array.isArray(sellers)) {
          sellerData = sellers;
        }
        
        this.sellers.set(sellerData);
        this.filteredSellers.set(sellerData);
      },
      error: (err) => {
        // Manejar errores globales
        console.error('Error loading initial data:', err);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los datos iniciales'
        });
      }
    });
  }

  loadCustomers(): void {
      this.customerService.getCustomers({ limit: 100 }).subscribe({
        next: (response) => {
          // Manejar diferentes formatos de respuesta
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
          console.error('Error loading customers:', err);
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: 'No se pudieron cargar los clientes'
          });
        }
      });
    }


  loadAvailableProperties(): void {
    this.propertyService.getProperties({ status: 'disponible' }).subscribe({
      next: (response) => {
        const propertyData = response.data || response;
        this.properties.set(propertyData);
        this.filteredProperties.set(propertyData);
      },
      error: () => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar las propiedades'
        });
      }
    });
  }

  filterCustomers(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim().length === 0) {
      // Si no hay término de búsqueda, cargar los primeros 100 clientes
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
          console.error('Error loading customers:', err);
        }
      });
      return;
    }

    // Búsqueda en el servidor usando el parámetro search
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
        console.error('Error searching customers:', err);
        this.filteredCustomers.set([]);
      }
    });
  }

  filterProperties(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim().length === 0) {
      // Si no hay término de búsqueda, mostrar solo las propiedades disponibles cargadas
      this.filteredProperties.set(this.properties());
      return;
    }

    // Filtrar localmente solo entre las propiedades disponibles ya cargadas
    const term = searchTerm.toLowerCase();
    const filtered = this.properties().filter(property =>
      property.code.toLowerCase().includes(term) ||
      property.name.toLowerCase().includes(term) ||
      property.block.toLowerCase().includes(term)
    );

    this.filteredProperties.set(filtered);
  }

  filterSellers(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.filteredSellers.set(this.sellers());
      return;
    }

    // Filtrar localmente por nombre o email
    const term = searchTerm.toLowerCase();
    const filtered = this.sellers().filter(seller =>
      (seller.first_name?.toLowerCase().includes(term) || '') ||
      (seller.last_name?.toLowerCase().includes(term) || '') ||
      (seller.email?.toLowerCase().includes(term) || '')
    );

    this.filteredSellers.set(filtered);
  }

  onCustomerSelected(customer: any): void {
    this.form.patchValue({
      customer_id: customer.id
    });
  }

  onPropertySelected(property: any): void {
    const listPrice = property.list_price ?? property.total_price ?? null;
    this.propertyListPrice.set(listPrice);
    this.form.patchValue({
      property_id: property.id,
      total_price: property.total_price,
      list_price: listPrice,
    });
  }

  onLeadSelected(lead: any): void {
    this.form.patchValue({
      lead_id: lead.id,
      lead_group_id: lead.group_id ?? this.form.get('lead_group_id')!.value,
    });
  }

  displayLead(lead: any): string {
    if (!lead) return '';
    const name = [lead.name, lead.lastname].filter(Boolean).join(' ');
    return name ? `${name} (${lead.email})` : lead.email;
  }

  filterLeads(searchTerm: string): void {
    if (!searchTerm || searchTerm.trim().length === 0) {
      this.leadService.getLeads({ limit: 50 }).subscribe({
        next: (response) => {
          const data = response.data ?? response.results ?? (Array.isArray(response) ? response : []);
          this.filteredLeads.set(data);
        },
        error: () => this.filteredLeads.set([]),
      });
      return;
    }

    this.leadService.getLeads({ search: searchTerm.trim(), limit: 50 }).subscribe({
      next: (response) => {
        const data = response.data ?? response.results ?? (Array.isArray(response) ? response : []);
        this.filteredLeads.set(data);
      },
      error: () => this.filteredLeads.set([]),
    });
  }

  get formattedPropertyListPrice(): string {
    const v = this.propertyListPrice();
    return v != null ? this.formatNumber(v) : '—';
  }

  onSellerSelected(seller: any): void {
    this.form.patchValue({
      seller_id: seller.id
    });
  }

  displaySeller(seller: any): string {
    return seller ? `${seller.first_name} ${seller.last_name} (${seller.email})` : '';
  }

  openCreateCustomerModal(): void {
    const dialogRef = this.dialog.open(CustomerEditModalComponent, {
      ...CUSTOMER_FORM_DIALOG_CONFIG,
      data: { customer: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Recargar clientes cuando se crea uno nuevo
        this.loadCustomers();
      }
    });
  }

  calculateRemainingBalance(): void {
    const totalPrice = parseContractAmount(this.form.get('total_price')!.value);
    const downPayment = parseContractAmount(this.form.get('down_payment')!.value);
    const isFinanced = !!this.form.get('down_payment_financed')!.value;
    const remainingBalance = isFinanced
      ? (downPayment > 0 ? totalPrice - downPayment : totalPrice)
      : totalPrice - downPayment;
    
    this.form.get('remaining_balance')!.setValue(remainingBalance, { emitEvent: true });
    this.formattedRemainingBalance.set(this.formatNumber(remainingBalance));
  }

  get isDownPaymentFinanced(): boolean {
    return !!this.form.get('down_payment_financed')?.value;
  }

  calculateMonthlyPayment(): void {
    const remainingBalance = parseContractAmount(this.form.get('remaining_balance')!.value);
    const paymentMonths = Math.max(1, Math.round(parseContractAmount(this.form.get('payment_months')!.value) || 1));
    
    // Validar payment_months > 0 para evitar división por cero
    const monthlyPayment = paymentMonths > 0 ? remainingBalance / paymentMonths : 0;
    
    this.form.get('monthly_payment')!.setValue(monthlyPayment, { emitEvent: false });
    this.formattedMonthlyPayment.set(this.formatNumber(monthlyPayment));
  }

  displayCustomer(customer: any): string {
    return customer ? `${customer.name} ${customer.lastname} (${customer.email})` : '';
  }

  displayProperty(property: any): string {
    return property
      ? `${property.code} - ${property.name} (Mz: ${property.block}, ${property.total_price.toLocaleString()})`
      : '';
  }

  formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }
    return value.toLocaleString('es-MX', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  }

  submit(): void {
    // Verificar form.invalid y marcar todos los campos como touched
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.interceptorService.openSnackbar({
        type: 'warning',
        title: 'Advertencia',
        message: 'Completa todos los campos obligatorios'
      });
      return;
    }

    // Validar que down_payment <= total_price
    const totalPrice = parseContractAmount(this.form.get('total_price')!.value);
    const downPayment = parseContractAmount(this.form.get('down_payment')!.value);

    if (downPayment > totalPrice) {
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'El enganche no puede ser mayor al precio total'
      });
      return;
    }

    const downPaymentFinanced = !!this.form.get('down_payment_financed')!.value;

    const payload: CreateContractDto = {
      customer_id: this.form.get('customer_id')!.value,
      property_id: this.form.get('property_id')!.value,
      seller_id: this.form.get('seller_id')!.value || undefined,
      contract_date: this.form.get('contract_date')!.value,
      total_price: parseContractAmount(this.form.get('total_price')!.value),
      down_payment: downPaymentFinanced ? 0 : parseContractAmount(this.form.get('down_payment')!.value),
      payment_months: Math.max(1, Math.round(parseContractAmount(this.form.get('payment_months')!.value) || 1)),
      first_payment_date: this.form.get('first_payment_date')!.value,
      currency: this.form.get('currency')!.value,
      status: this.form.get('status')!.value,
      notes: this.form.get('notes')!.value || undefined
    };

    if (downPaymentFinanced) {
      payload.down_payment_financed = true;
      const target = parseContractAmount(this.form.get('down_payment')!.value);
      if (target > 0) {
        payload.down_payment_target = target;
      }
    }

    const listPrice = parseContractAmount(this.form.get('list_price')!.value);
    if (listPrice > 0) {
      payload.list_price = listPrice;
    }
    const leadId = this.form.get('lead_id')!.value;
    if (leadId) {
      payload.lead_id = leadId;
    }
    const leadGroupId = this.form.get('lead_group_id')!.value;
    if (leadGroupId) {
      payload.lead_group_id = leadGroupId;
    }

    // Establecer loading signal en true
    this.loading.set(true);

    // Llamar a contractService.createContract(payload)
    this.contractService.createContract(payload).subscribe({
      next: () => {
        // En éxito: establecer loading en false
        this.loading.set(false);
        // Mostrar snackbar de éxito
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Contrato creado correctamente'
        });
        // Cerrar modal con dialogRef.close(true)
        this.dialogRef.close(true);
      },
      error: (err) => {
        // En error: establecer loading en false
        this.loading.set(false);
        // Mostrar snackbar de error con mensaje del servidor
        const message = err.error?.message || 'No se pudo crear el contrato';
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message
        });
        // Mantener modal abierto (no cerrar)
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
