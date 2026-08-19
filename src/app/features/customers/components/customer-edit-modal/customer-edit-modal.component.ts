import { Component, DestroyRef, Inject, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { PhoneCountrySelectComponent } from '../../../../core/components/phone-country-select/phone-country-select.component';
import { PhoneCodeSelectComponent } from '../../../../core/components/phone-code-select/phone-code-select.component';
import { PhoneDigitsDirective } from '../../../../core/directives/phone-digits.directive';
import { LucideAngularModule, X } from 'lucide-angular';
import { CustomerService } from '../../../../core/services/customer.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { CustomerGroupDropdownComponent } from '../customer-group-dropdown/customer-group-dropdown.component';
import {
  CheckCustomerDuplicatesDto,
  Customer,
  CustomerDuplicateMatch,
  CustomerRegistrationBranchOption,
  CustomerRegistrationUserOption,
  CustomerStatus,
  UpdateCustomerDto,
} from '../../models/customer-group.model';
import { SlimSwitchComponent } from '../../../../core/components/slim-switch/slim-switch.component';
import { CustomerFiscalCreditsComponent } from '../customer-fiscal-credits/customer-fiscal-credits.component';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FISCAL_PERSON_TYPE_OPTIONS,
  inferFiscalPersonTypeFromRfc,
  isValidFiscalPersonType,
  resolveFiscalPersonType,
  sanitizeFiscalPersonTypeForApi,
} from '../../utils/fiscal-person-type.util';
import {
  SAT_COUNTRY_MEX,
  resolveFiscalMunicipio,
  resolveFiscalStreet,
} from '../../utils/fiscal-domicile.util';
import { formatRegistrationUserOption } from '../../utils/customer-registration.util';
import { CUSTOMER_DUPLICATE_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import {
  CustomerDuplicateWarningDialogComponent,
  CustomerDuplicateWarningResult,
} from '../customer-duplicate-warning-dialog/customer-duplicate-warning-dialog.component';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    LucideAngularModule,
    CustomerGroupDropdownComponent,
    PhoneCountrySelectComponent,
    PhoneCodeSelectComponent,
    PhoneDigitsDirective,
    TabComponent,
    SlimSwitchComponent,
    CustomerFiscalCreditsComponent
  ],
  templateUrl: './customer-edit-modal.html',
  styleUrls: ['./customer-edit-modal.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerEditModalComponent {
  loading = signal(false);
  update = signal(false);
  selectedGroup = signal<any>(null);
  isCreateMode = signal(false);
  activeTab = signal<'customer' | 'credit' | 'fiscal' | 'registration'>('customer');
  tabs: TabItem[] = [
    { id: 'customer', title: 'Información del Cliente' },
    { id: 'credit', title: 'Credito' },
    { id: 'fiscal', title: 'Información Fiscal' },
    { id: 'registration', title: 'Registro' }
  ];
  registrationBranches = signal<CustomerRegistrationBranchOption[]>([]);
  registrationUsers = signal<CustomerRegistrationUserOption[]>([]);
  registrationOptionsLoading = signal(false);
  /** Tras “Continuar de todos modos”, no volver a consultar duplicados en este intento. */
  private duplicateWarningAccepted = false;
  readonly fiscalPersonTypeOptions = FISCAL_PERSON_TYPE_OPTIONS;
  private readonly destroyRef = inject(DestroyRef);
  statuses = signal<CustomerStatus[]>([]);
  statusesLoading = signal(false);
  /** Sección persona adicional: colapsada por defecto en crear; abierta si ya hay datos al editar. */
  additionalPersonExpanded = signal(false);

  readonly X = X;
  form: FormGroup;
  @ViewChild(CustomerFiscalCreditsComponent) fiscalCredits?: CustomerFiscalCreditsComponent;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialog_ref: MatDialogRef<CustomerEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      customer: Customer | null;
      initialTab?: 'customer' | 'credit' | 'fiscal' | 'registration';
    },
    private customerService: CustomerService,
    private interceptor_service: InterceptorService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^$|^\d{1,10}$/)]],
      phone_code: ['+52', [Validators.required]],
      phone_country: ['MX', [Validators.required]],
      company_name: [''],
      fiscal_rfc: [''],
      fiscal_razon_social: [''],
      fiscal_person_type: [''],
      fiscal_postal_code: ['', [Validators.pattern(/^$|^\d{5}$/)]],
      fiscal_street: [''],
      fiscal_exterior_number: [''],
      fiscal_interior_number: [''],
      fiscal_colonia: [''],
      fiscal_localidad: [''],
      fiscal_municipio: [''],
      fiscal_state: [''],
      fiscal_country: [SAT_COUNTRY_MEX, [Validators.pattern(/^$|^[A-Za-z]{3}$/)]],
      auto_generate_invoice: [false],
      additional_name: [''],
      additional_lastname: [''],
      additional_email: ['', [Validators.email]],
      additional_phone: ['', [Validators.pattern(/^$|^\d{1,10}$/)]],
      additional_phone_code: ['+52'],
      additional_phone_country: ['MX'],
      status_id: [null as number | null],
      registered_billing_branch_id: [''],
      registered_by_user_id: [''],
    });

    if (this.data?.customer) {
      this.isCreateMode.set(false);
      // Clean phone number to remove country code if present
      const cleanPhone = this.data.customer.phone?.replace(/\D/g, '').slice(-10) || '';
      const cleanAdditionalPhone =
        this.data.customer.additional_phone?.replace(/\D/g, '').slice(-10) || '';
      const titularCountry =
        this.data.customer.country || this.data.customer.phone_country || 'MX';
      this.form.patchValue({
        name: this.data.customer.name,
        lastname: this.data.customer.lastname || '',
        email: this.data.customer.email,
        phone: cleanPhone,
        phone_code: this.data.customer.phone_code || '+52',
        phone_country: titularCountry,
        company_name: this.data.customer.company_name || '',
        fiscal_rfc: this.data.customer.fiscal_rfc || '',
        fiscal_razon_social: this.data.customer.fiscal_razon_social || '',
        fiscal_person_type: resolveFiscalPersonType(
          this.data.customer.fiscal_person_type,
          this.data.customer.fiscal_rfc
        ),
        fiscal_postal_code: this.data.customer.fiscal_postal_code || '',
        fiscal_street: resolveFiscalStreet(this.data.customer),
        fiscal_exterior_number: this.data.customer.fiscal_exterior_number || '',
        fiscal_interior_number: this.data.customer.fiscal_interior_number || '',
        fiscal_colonia: this.data.customer.fiscal_colonia || '',
        fiscal_localidad: this.data.customer.fiscal_localidad || '',
        fiscal_municipio: resolveFiscalMunicipio(this.data.customer),
        fiscal_state: this.data.customer.fiscal_state || '',
        fiscal_country: (this.data.customer.fiscal_country || SAT_COUNTRY_MEX).trim().toUpperCase(),
        auto_generate_invoice: this.data.customer.auto_generate_invoice === true,
        additional_name: this.data.customer.additional_name || '',
        additional_lastname: this.data.customer.additional_lastname || '',
        additional_email: this.data.customer.additional_email || '',
        additional_phone: cleanAdditionalPhone,
        additional_phone_code: this.data.customer.additional_phone_code || '+52',
        additional_phone_country: this.data.customer.additional_phone_country || 'MX',
        status_id: this.resolveStatusId(this.data.customer),
        registered_billing_branch_id: this.data.customer.registered_billing_branch_id || '',
        registered_by_user_id: this.data.customer.registered_by_user_id || '',
      });
      this.selectedGroup.set(
        this.data.customer.group ??
          (this.data.customer.group_id
            ? { id: this.data.customer.group_id, name: '' }
            : null)
      );
      if (this.customerHasAdditionalPersonData(this.data.customer)) {
        this.additionalPersonExpanded.set(true);
      }
    } else {
      this.isCreateMode.set(true);
      const userId = this.authService.user_info?.sub;
      if (userId) {
        this.form.patchValue({ registered_by_user_id: userId });
      }
      this.form.get('registered_by_user_id')?.disable({ emitEvent: false });
    }
    this.loadStatuses();
    this.loadRegistrationOptions();
    this.setupFiscalRfcAutoPersonType();
    if (this.data?.initialTab) {
      this.setActiveTab(this.data.initialTab);
    }
  }

  isWalkInCustomer(): boolean {
    return this.data?.customer?.is_walk_in === true;
  }

  private setupFiscalRfcAutoPersonType(): void {
    this.form
      .get('fiscal_rfc')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((rfc) => this.applyInferredFiscalPersonType(rfc));
  }

  private applyInferredFiscalPersonType(rfc: string | null | undefined): void {
    const inferred = inferFiscalPersonTypeFromRfc(rfc);
    if (!inferred) return;

    const control = this.form.get('fiscal_person_type');
    const current = (control?.value ?? '').trim().toLowerCase();
    if (!current || !isValidFiscalPersonType(current)) {
      control?.setValue(inferred, { emitEvent: false });
    }
  }

  get canEditStatus(): boolean {
    return this.isCreateMode() || this.authService.hasPermission('customers:Update');
  }

  private resolveStatusId(customer: Customer): number | null {
    const raw = customer.status_id ?? customer.status?.id;
    if (raw == null || raw === '') return null;
    const id = Number(raw);
    return Number.isFinite(id) ? id : null;
  }

  private loadStatuses(): void {
    this.statusesLoading.set(true);
    this.customerService.getCustomerStatuses().subscribe({
      next: (list) => {
        this.statuses.set(list);
        this.statusesLoading.set(false);
        if (this.isCreateMode() && this.form.get('status_id')?.value == null) {
          const active = list.find((s) => s.code === 'ACTIVE');
          if (active) {
            this.form.patchValue({ status_id: active.id });
          }
        }
      },
      error: () => this.statusesLoading.set(false),
    });
  }

  private loadRegistrationOptions(): void {
    this.registrationOptionsLoading.set(true);
    this.customerService.getRegistrationOptions().subscribe({
      next: (options) => {
        this.registrationBranches.set(options?.branches ?? []);
        this.registrationUsers.set(options?.users ?? []);
        this.ensureSavedRegistrationOptions();
        if (this.isCreateMode()) {
          this.applyRegistrationPrefill();
        }
        this.registrationOptionsLoading.set(false);
      },
      error: () => {
        if (this.isCreateMode()) {
          this.applyRegistrationPrefill();
        }
        this.registrationOptionsLoading.set(false);
      },
    });
  }

  private ensureSavedRegistrationOptions(): void {
    const customer = this.data?.customer;
    if (!customer) return;

    const branchId = customer.registered_billing_branch_id;
    if (branchId && !this.registrationBranches().some((branch) => branch.id === branchId)) {
      this.registrationBranches.update((branches) => [
        {
          id: branchId,
          name: customer.registered_billing_branch?.code || branchId,
        },
        ...branches,
      ]);
    }

    const userId = customer.registered_by_user_id;
    if (userId && !this.registrationUsers().some((user) => user.id === userId)) {
      this.registrationUsers.update((users) => [
        customer.registered_by_user ?? { id: userId },
        ...users,
      ]);
    }
  }

  private applyRegistrationPrefill(): void {
    const branchId = this.authService.getBillingBranchId();
    if (branchId && this.registrationBranches().some((branch) => branch.id === branchId)) {
      this.form.patchValue({ registered_billing_branch_id: branchId });
    }

    const userId = this.authService.user_info?.sub;
    if (userId) {
      this.form.patchValue({ registered_by_user_id: userId });
    }
    this.form.get('registered_by_user_id')?.disable({ emitEvent: false });
  }

  registeredByCreateLabel(): string {
    const userId = this.authService.user_info?.sub;
    const fromCatalog = this.registrationUsers().find((user) => user.id === userId);
    if (fromCatalog) {
      return formatRegistrationUserOption(fromCatalog);
    }
    return this.authService.user_info?.email || 'Usuario actual';
  }

  private emptyToNull(value: unknown): string | null {
    if (value == null) return null;
    const trimmed = String(value).trim();
    return trimmed === '' ? null : trimmed;
  }

  /** Campos CSF. No envía `fiscal_address` ni `fiscal_city`. */
  private buildFiscalApiFields(mode: 'create' | 'update'): Pick<
    UpdateCustomerDto,
    | 'fiscal_rfc'
    | 'fiscal_razon_social'
    | 'fiscal_person_type'
    | 'fiscal_postal_code'
    | 'fiscal_street'
    | 'fiscal_exterior_number'
    | 'fiscal_interior_number'
    | 'fiscal_colonia'
    | 'fiscal_localidad'
    | 'fiscal_municipio'
    | 'fiscal_state'
    | 'fiscal_country'
  > {
    const v = this.form.getRawValue();
    const postal = this.emptyToNull(v.fiscal_postal_code);
    const street = this.emptyToNull(v.fiscal_street);
    const exterior = this.emptyToNull(v.fiscal_exterior_number);
    const interior = this.emptyToNull(v.fiscal_interior_number);
    const colonia = this.emptyToNull(v.fiscal_colonia);
    const localidad = this.emptyToNull(v.fiscal_localidad);
    const municipio = this.emptyToNull(v.fiscal_municipio);
    const state = this.emptyToNull(v.fiscal_state);
    const country = this.emptyToNull(v.fiscal_country)?.toUpperCase() ?? null;
    const hasDomicilio = !!(postal || street || exterior || interior || colonia || localidad || municipio || state);
    const razonSocial = this.emptyToNull(v.fiscal_razon_social)?.toUpperCase() ?? null;

    return {
      fiscal_rfc: this.emptyToNull(v.fiscal_rfc)?.toUpperCase() ?? undefined,
      fiscal_razon_social: razonSocial ?? (mode === 'update' ? null : undefined),
      fiscal_person_type: sanitizeFiscalPersonTypeForApi(v.fiscal_person_type),
      fiscal_postal_code: postal,
      fiscal_street: street,
      fiscal_exterior_number: exterior,
      fiscal_interior_number: interior,
      fiscal_colonia: colonia,
      fiscal_localidad: localidad,
      fiscal_municipio: municipio,
      fiscal_state: state,
      fiscal_country: hasDomicilio ? country || SAT_COUNTRY_MEX : country,
    };
  }

  setActiveTab(tab: string): void {
    if (tab === 'customer' || tab === 'credit' || tab === 'fiscal' || tab === 'registration') {
      this.activeTab.set(tab);
    }
  }

  registrationUserLabel(user: CustomerRegistrationUserOption): string {
    return formatRegistrationUserOption(user);
  }

  private customerHasAdditionalPersonData(c: Customer): boolean {
    const t = (s: string | null | undefined) => (s ?? '').trim();
    return !!(
      t(c.additional_name) ||
      t(c.additional_lastname) ||
      t(c.additional_email) ||
      t(c.additional_phone)
    );
  }

  toggleAdditionalPerson(): void {
    this.additionalPersonExpanded.update((v) => !v);
  }

  /** Borde rojo / mensaje para inputs nativos (teléfono con appPhoneDigits). */
  controlShowError(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!(c?.invalid && c.touched);
  }

  controlErrorMessage(controlName: string): string {
    const c = this.form.get(controlName);
    if (!c?.errors || !c.touched) return '';
    const e = c.errors;
    if (e['required']) return 'Este campo es obligatorio';
    if (e['email']) return 'Ingresa un email válido';
    if (e['pattern']) return 'Solo números, hasta 10 dígitos';
    return 'Este campo tiene un error';
  }

  private validateFormBeforeSubmit(): boolean {
    if (this.form.valid) return true;
    this.form.markAllAsTouched();
    const fiscalKeys = ['fiscal_postal_code', 'fiscal_country'];
    if (fiscalKeys.some((key) => !!this.form.get(key)?.invalid)) {
      this.activeTab.set('fiscal');
    }
    if (!this.additionalPersonExpanded()) {
      const keys = ['additional_email', 'additional_phone', 'additional_name', 'additional_lastname'];
      if (keys.some((key) => !!this.form.get(key)?.invalid)) {
        this.additionalPersonExpanded.set(true);
      }
    }
    return false;
  }

  onGroupSelected(event: { groupId: string | null; groupName: string | null }): void {
    // Find the group object from the event
    this.selectedGroup.set(event.groupId ? { id: event.groupId, name: event.groupName } : null);
  }

  get phoneCodeControl() {
    return this.form.get('phone_code');
  }

  get phoneCountryControl() {
    return this.form.get('phone_country');
  }

  getPhoneCodeControl() {
    return this.form.get('phone_code');
  }

  getPhoneCountryControl() {
    return this.form.get('phone_country');
  }

  getAdditionalPhoneCodeControl() {
    return this.form.get('additional_phone_code');
  }

  getAdditionalPhoneCountryControl() {
    return this.form.get('additional_phone_country');
  }

  closeDialog() {
    if (!this.loading()) {
      this.dialog_ref.close(this.update());
    }
  }

  private resolveApiErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse && error.error?.message != null) {
      const msg = error.error.message;
      return Array.isArray(msg) ? msg.join(', ') : String(msg);
    }
    return fallback;
  }

  /**
   * PUT /tenant/customers/:id — solo campos del DTO de update (sin `phone_country` del titular).
   * El país del titular va como `country` (valor del control interno `phone_country`).
   * Opcionales vacíos se omiten (`undefined`) para no pisar datos en el servidor.
   */
  private buildUpdatePayload(): UpdateCustomerDto {
    const v = this.form.getRawValue();
    const trim = (s: string | null | undefined) => (typeof s === 'string' ? s.trim() : '');
    const dto: UpdateCustomerDto = {
      name: v.name,
      lastname: trim(v.lastname) || undefined,
      email: v.email,
      phone: trim(v.phone) || undefined,
      phone_code: v.phone_code,
      country: v.phone_country,
      company_name: trim(v.company_name) || undefined,
      auto_generate_invoice: !!v.auto_generate_invoice,
      ...this.buildFiscalApiFields('update'),
      group_id: this.selectedGroup()?.id ?? null,
      registered_billing_branch_id: this.emptyToNull(v.registered_billing_branch_id),
      registered_by_user_id: this.emptyToNull(v.registered_by_user_id),
    };
    if (trim(v.additional_name)) dto.additional_name = trim(v.additional_name);
    if (trim(v.additional_lastname)) dto.additional_lastname = trim(v.additional_lastname);
    if (trim(v.additional_email)) dto.additional_email = trim(v.additional_email);
    if (trim(v.additional_phone)) {
      dto.additional_phone = trim(v.additional_phone);
      dto.additional_phone_code = v.additional_phone_code;
      dto.additional_phone_country = v.additional_phone_country;
    }
    if (this.canEditStatus && v.status_id != null && v.status_id !== '') {
      dto.status_id = Number(v.status_id);
    }
    return dto;
  }

  submit() {
    if (this.isCreateMode()) {
      this.createCustomer();
    } else {
      this.updateCustomer();
    }
  }

  createCustomer(): void {
    if (!this.validateFormBeforeSubmit()) {
      return;
    }

    if (this.duplicateWarningAccepted) {
      this.postCreateCustomer();
      return;
    }

    const duplicatesPayload = this.buildDuplicatesPayload();
    if (!duplicatesPayload) {
      this.postCreateCustomer();
      return;
    }

    this.loading.set(true);
    this.customerService.checkCustomerDuplicates(duplicatesPayload).subscribe({
      next: (response) => {
        if (response?.found && response.matches?.length) {
          this.loading.set(false);
          this.openDuplicateWarning(response.matches);
          return;
        }
        this.postCreateCustomer();
      },
      error: () => {
        this.postCreateCustomer();
      },
    });
  }

  private buildDuplicatesPayload(): CheckCustomerDuplicatesDto | null {
    const v = this.form.getRawValue();
    const trim = (s: string | null | undefined) => (typeof s === 'string' ? s.trim() : '');
    const payload: CheckCustomerDuplicatesDto = {};

    if (trim(v.email)) payload.email = trim(v.email);
    if (trim(v.phone)) {
      payload.phone = trim(v.phone);
      if (trim(v.phone_code)) payload.phone_code = trim(v.phone_code);
    }
    if (trim(v.name) && trim(v.lastname)) {
      payload.name = trim(v.name);
      payload.lastname = trim(v.lastname);
    }
    if (trim(v.fiscal_rfc)) payload.fiscal_rfc = trim(v.fiscal_rfc);

    return Object.keys(payload).length > 0 ? payload : null;
  }

  private openDuplicateWarning(matches: CustomerDuplicateMatch[]): void {
    this.dialog
      .open(CustomerDuplicateWarningDialogComponent, {
        ...CUSTOMER_DUPLICATE_DIALOG_CONFIG,
        data: { matches },
      })
      .afterClosed()
      .subscribe((result: CustomerDuplicateWarningResult | undefined) => {
        if (result?.action === 'continue') {
          this.duplicateWarningAccepted = true;
          this.postCreateCustomer();
        }
      });
  }

  private postCreateCustomer(): void {
    this.loading.set(true);

    const v = this.form.getRawValue();
    const trim = (s: string | null | undefined) => (typeof s === 'string' ? s.trim() : '');
    const payload: Record<string, unknown> = {
      name: v.name,
      lastname: v.lastname,
      email: v.email,
      phone: v.phone,
      phone_code: v.phone_code,
      phone_country: v.phone_country,
      company_name: v.company_name,
      auto_generate_invoice: !!v.auto_generate_invoice,
      ...this.buildFiscalApiFields('create'),
      group_id: this.selectedGroup()?.id ?? null,
      registered_billing_branch_id: this.emptyToNull(v.registered_billing_branch_id),
      registered_by_user_id: this.emptyToNull(v.registered_by_user_id),
    };
    if (trim(v.additional_name)) payload.additional_name = trim(v.additional_name);
    if (trim(v.additional_lastname)) payload.additional_lastname = trim(v.additional_lastname);
    if (trim(v.additional_email)) payload.additional_email = trim(v.additional_email);
    if (trim(v.additional_phone)) payload.additional_phone = trim(v.additional_phone);
    if (trim(v.additional_phone_code)) payload.additional_phone_code = trim(v.additional_phone_code);
    if (trim(v.additional_phone_country)) {
      payload.additional_phone_country = trim(v.additional_phone_country);
    }
    if (v.status_id != null && v.status_id !== '') {
      payload.status_id = Number(v.status_id);
    }

    this.customerService.createCustomer(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Cliente creado correctamente.'
        });

        this.closeDialog();
      },
      error: (err: unknown) => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: this.resolveApiErrorMessage(
            err,
            'No pudimos crear el cliente. Por favor intenta de nuevo.'
          )
        });
      }
    });
  }

  updateCustomer(): void {
    if (!this.validateFormBeforeSubmit()) {
      return;
    }

    if (this.fiscalCredits?.hasInvalidEnabledCredit()) {
      this.activeTab.set('credit');
      this.interceptor_service.openSnackbar({
        type: 'error',
        title: 'Crédito',
        message: 'Revisa días y monto de crédito en las razones sociales activadas.',
      });
      return;
    }

    this.loading.set(true);

    const payload = this.buildUpdatePayload();
    const customerId = String(this.data.customer!.id);
    const credits = this.fiscalCredits?.buildUpdateItems();

    this.customerService.updateCustomer(customerId, payload).pipe(
      switchMap((updated) => {
        if (!credits?.length) {
          return of(updated);
        }
        return this.customerService.updateCustomerCredits(customerId, credits).pipe(
          map(() => updated)
        );
      })
    ).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Cliente actualizado correctamente.'
        });

        this.closeDialog();
      },
      error: (err: unknown) => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: this.resolveApiErrorMessage(
            err,
            'No pudimos actualizar el cliente. Por favor intenta de nuevo.'
          )
        });
      }
    });
  }
}
