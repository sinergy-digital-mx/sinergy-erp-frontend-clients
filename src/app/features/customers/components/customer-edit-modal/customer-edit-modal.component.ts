import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PhoneCountrySelectComponent } from '../../../../core/components/phone-country-select/phone-country-select.component';
import { PhoneCodeSelectComponent } from '../../../../core/components/phone-code-select/phone-code-select.component';
import { PhoneDigitsDirective } from '../../../../core/directives/phone-digits.directive';
import { LucideAngularModule, X } from 'lucide-angular';
import { CustomerService } from '../../../../core/services/customer.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { CustomerGroupDropdownComponent } from '../customer-group-dropdown/customer-group-dropdown.component';
import { Customer } from '../../models/customer-group.model';

@Component({
  selector: 'app-customer-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    LucideAngularModule,
    CustomerGroupDropdownComponent,
    PhoneCountrySelectComponent,
    PhoneCodeSelectComponent,
    PhoneDigitsDirective
  ],
  templateUrl: './customer-edit-modal.html',
  styleUrls: ['./customer-edit-modal.scss']
})
export class CustomerEditModalComponent {
  loading = signal(false);
  update = signal(false);
  selectedGroup = signal<any>(null);
  isCreateMode = signal(false);

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
      phone: [''],
      phone_code: ['+52', [Validators.required]],
      phone_country: ['MX', [Validators.required]],
      company_name: ['']
    });

    if (this.data?.customer) {
      this.isCreateMode.set(false);
      // Clean phone number to remove country code if present
      const cleanPhone = this.data.customer.phone?.replace(/\D/g, '').slice(-10) || '';
      this.form.patchValue({
        name: this.data.customer.name,
        lastname: this.data.customer.lastname || '',
        email: this.data.customer.email,
        phone: cleanPhone,
        phone_code: this.data.customer.phone_code || '+52',
        phone_country: this.data.customer.phone_country || 'MX',
        company_name: this.data.customer.company_name || ''
      });
      this.selectedGroup.set(this.data.customer.group || null);
    } else {
      this.isCreateMode.set(true);
    }
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

  closeDialog() {
    if (!this.loading()) {
      this.dialog_ref.close(this.update());
    }
  }

  submit() {
    if (this.isCreateMode()) {
      this.createCustomer();
    } else {
      this.updateCustomer();
    }
  }

  createCustomer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = {
      ...this.form.value,
      group_id: this.selectedGroup()?.id || null
    };

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
      error: () => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos crear el cliente. Por favor intenta de nuevo.'
        });
      }
    });
  }

  updateCustomer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = {
      ...this.data.customer,
      ...this.form.value,
      group_id: this.selectedGroup()?.id || null
    };

    this.customerService.updateCustomer(payload.id, payload).subscribe({
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
      error: () => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos actualizar el cliente. Por favor intenta de nuevo.'
        });
      }
    });
  }
}
