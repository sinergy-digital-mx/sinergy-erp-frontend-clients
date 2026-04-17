import { Component, Inject, signal, ViewEncapsulation } from '@angular/core';
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
import { Customer, UpdateCustomerDto } from '../../models/customer-group.model';

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
    PhoneDigitsDirective
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
    private interceptor_service: InterceptorService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^$|^\d{1,10}$/)]],
      phone_code: ['+52', [Validators.required]],
      phone_country: ['MX', [Validators.required]],
      company_name: [''],
      additional_name: [''],
      additional_lastname: [''],
      additional_email: ['', [Validators.email]],
      additional_phone: ['', [Validators.pattern(/^$|^\d{1,10}$/)]],
      additional_phone_code: ['+52'],
      additional_phone_country: ['MX']
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
        additional_name: this.data.customer.additional_name || '',
        additional_lastname: this.data.customer.additional_lastname || '',
        additional_email: this.data.customer.additional_email || '',
        additional_phone: cleanAdditionalPhone,
        additional_phone_code: this.data.customer.additional_phone_code || '+52',
        additional_phone_country: this.data.customer.additional_phone_country || 'MX'
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
    const sid = this.data.customer?.status_id;
    if (sid != null && sid !== '') {
      dto.status_id = sid;
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
