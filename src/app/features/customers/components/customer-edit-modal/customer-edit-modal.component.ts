import { Component, DestroyRef, Inject, inject, signal, ViewEncapsulation } from '@angular/core';
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
import { Customer, CustomerStatus, UpdateCustomerDto } from '../../models/customer-group.model';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { AuthService } from '../../../../core/services/auth.service';
import {
  FISCAL_PERSON_TYPE_OPTIONS,
  inferFiscalPersonTypeFromRfc,
  isValidFiscalPersonType,
  resolveFiscalPersonType,
  sanitizeFiscalPersonTypeForApi,
} from '../../utils/fiscal-person-type.util';

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
    TabComponent
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
  activeTab = signal<'customer' | 'credit' | 'fiscal'>('customer');
  tabs: TabItem[] = [
    { id: 'customer', title: 'Información del Cliente' },
    { id: 'credit', title: 'Credito' },
    { id: 'fiscal', title: 'Información Fiscal' }
  ];
  readonly fiscalPersonTypeOptions = FISCAL_PERSON_TYPE_OPTIONS;
  private readonly destroyRef = inject(DestroyRef);
  warehouses = signal<Warehouse[]>([]);
  warehousesLoading = signal(false);
  statuses = signal<CustomerStatus[]>([]);
  statusesLoading = signal(false);
  /** Sección persona adicional: colapsada por defecto en crear; abierta si ya hay datos al editar. */
  additionalPersonExpanded = signal(false);

  readonly X = X;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialog_ref: MatDialogRef<CustomerEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: Customer | null },
    private customerService: CustomerService,
    private interceptor_service: InterceptorService,
    private warehouseService: WarehouseService,
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
      warehouse_id: [''],
      credit_days: ['', [Validators.min(0), Validators.pattern(/^$|^\d+$/)]],
      credit_amount: ['', [Validators.min(0), Validators.pattern(/^$|^\d+(\.\d{1,2})?$/)]],
      fiscal_rfc: [''],
      fiscal_razon_social: [''],
      fiscal_person_type: [''],
      fiscal_address: [''],
      fiscal_city: [''],
      fiscal_state: [''],
      fiscal_postal_code: [''],
      additional_name: [''],
      additional_lastname: [''],
      additional_email: ['', [Validators.email]],
      additional_phone: ['', [Validators.pattern(/^$|^\d{1,10}$/)]],
      additional_phone_code: ['+52'],
      additional_phone_country: ['MX'],
      status_id: [null as number | null],
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
        warehouse_id: this.data.customer.warehouse_id || '',
        credit_days: this.data.customer.credit_days ?? '',
        credit_amount: this.data.customer.credit_amount ?? '',
        fiscal_rfc: this.data.customer.fiscal_rfc || '',
        fiscal_razon_social: this.data.customer.fiscal_razon_social || '',
        fiscal_person_type: resolveFiscalPersonType(
          this.data.customer.fiscal_person_type,
          this.data.customer.fiscal_rfc
        ),
        fiscal_address: this.data.customer.fiscal_address || '',
        fiscal_city: this.data.customer.fiscal_city || '',
        fiscal_state: this.data.customer.fiscal_state || '',
        fiscal_postal_code: this.data.customer.fiscal_postal_code || '',
        additional_name: this.data.customer.additional_name || '',
        additional_lastname: this.data.customer.additional_lastname || '',
        additional_email: this.data.customer.additional_email || '',
        additional_phone: cleanAdditionalPhone,
        additional_phone_code: this.data.customer.additional_phone_code || '+52',
        additional_phone_country: this.data.customer.additional_phone_country || 'MX',
        status_id: this.resolveStatusId(this.data.customer),
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
    }
    this.loadWarehouses();
    this.loadStatuses();
    this.setupFiscalRfcAutoPersonType();
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

  setActiveTab(tab: string): void {
    if (tab === 'customer' || tab === 'credit' || tab === 'fiscal') {
      this.activeTab.set(tab);
    }
  }

  private parseNullableInteger(value: unknown): number | null {
    if (value === null || value === undefined || value === '') return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return null;
    return Math.max(0, Math.trunc(parsed));
  }

  private parseNullableDecimal(value: unknown): number | null {
    if (value === null || value === undefined || value === '') return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return null;
    return Math.max(0, Number(parsed.toFixed(2)));
  }

  private loadWarehouses(): void {
    this.warehousesLoading.set(true);
    this.warehouseService.getWarehouses({ page: 1, limit: 200 }).subscribe({
      next: (response) => {
        const warehouses = this.extractWarehousesFromResponse(response);
        if (warehouses.length > 0) {
          this.warehouses.set(warehouses);
          this.warehousesLoading.set(false);
          return;
        }

        // Fallback por compatibilidad con backends que ignoran/rompen paginación.
        this.warehouseService.getWarehouses().subscribe({
          next: (fallbackResponse) => {
            this.warehouses.set(this.extractWarehousesFromResponse(fallbackResponse));
            this.warehousesLoading.set(false);
          },
          error: () => {
            this.warehousesLoading.set(false);
          }
        });
      },
      error: () => {
        this.warehouseService.getWarehouses().subscribe({
          next: (fallbackResponse) => {
            this.warehouses.set(this.extractWarehousesFromResponse(fallbackResponse));
            this.warehousesLoading.set(false);
          },
          error: () => {
            this.warehousesLoading.set(false);
          }
        });
      }
    });
  }

  private extractWarehousesFromResponse(response: unknown): Warehouse[] {
    const payload = response as any;
    if (Array.isArray(payload)) return payload as Warehouse[];
    if (Array.isArray(payload?.data)) return payload.data as Warehouse[];
    if (Array.isArray(payload?.items)) return payload.items as Warehouse[];
    if (Array.isArray(payload?.results)) return payload.results as Warehouse[];
    if (Array.isArray(payload?.data?.data)) return payload.data.data as Warehouse[];
    if (Array.isArray(payload?.data?.items)) return payload.data.items as Warehouse[];
    return [];
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
      warehouse_id: v.warehouse_id || null,
      credit_days: this.parseNullableInteger(v.credit_days),
      credit_amount: this.parseNullableDecimal(v.credit_amount),
      fiscal_rfc: trim(v.fiscal_rfc) || undefined,
      fiscal_razon_social: trim(v.fiscal_razon_social) || undefined,
      fiscal_person_type: sanitizeFiscalPersonTypeForApi(v.fiscal_person_type),
      fiscal_address: trim(v.fiscal_address) || undefined,
      fiscal_city: trim(v.fiscal_city) || undefined,
      fiscal_state: trim(v.fiscal_state) || undefined,
      fiscal_postal_code: trim(v.fiscal_postal_code) || undefined,
      group_id: this.selectedGroup()?.id ?? null
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

    this.loading.set(true);

    const v = this.form.value;
    const trim = (s: string | null | undefined) => (typeof s === 'string' ? s.trim() : '');
    const payload: Record<string, unknown> = {
      name: v.name,
      lastname: v.lastname,
      email: v.email,
      phone: v.phone,
      phone_code: v.phone_code,
      phone_country: v.phone_country,
      company_name: v.company_name,
      warehouse_id: v.warehouse_id || null,
      credit_days: this.parseNullableInteger(v.credit_days),
      credit_amount: this.parseNullableDecimal(v.credit_amount),
      fiscal_rfc: trim(v.fiscal_rfc) || undefined,
      fiscal_razon_social: trim(v.fiscal_razon_social) || undefined,
      fiscal_person_type: sanitizeFiscalPersonTypeForApi(v.fiscal_person_type),
      fiscal_address: trim(v.fiscal_address) || undefined,
      fiscal_city: trim(v.fiscal_city) || undefined,
      fiscal_state: trim(v.fiscal_state) || undefined,
      fiscal_postal_code: trim(v.fiscal_postal_code) || undefined,
      group_id: this.selectedGroup()?.id || null
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

    this.loading.set(true);

    const payload = this.buildUpdatePayload();

    this.customerService.updateCustomer(this.data.customer!.id, payload).subscribe({
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
