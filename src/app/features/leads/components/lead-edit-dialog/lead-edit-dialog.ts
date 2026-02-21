import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PhoneCountrySelectComponent } from '../../../../core/components/phone-country-select/phone-country-select.component';
import { PhoneCodeSelectComponent } from '../../../../core/components/phone-code-select/phone-code-select.component';
import { GroupSelectComponent } from '../../../../core/components/group-select/group-select.component';
import { PhoneDigitsDirective } from '../../../../core/directives/phone-digits.directive';
import { LucideAngularModule, X } from 'lucide-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeadService } from '../../../../core/services/leads.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-lead-edit-dialog',
  standalone: true,
  styleUrls: ['./lead-edit-dialog.scss'],
  imports: [CommonModule, TableModule, TagModule, ButtonModule, ButtonComponent, LucideAngularModule, InputComponent, ReactiveFormsModule, GroupSelectComponent, PhoneCountrySelectComponent, PhoneCodeSelectComponent, PhoneDigitsDirective],
  templateUrl: 'lead-edit-dialog.html',
})
export class LeadEditDialog {
  loading = signal(false);
  update = signal(false);
  selectedGroupId = signal<string | null>(null);

  readonly X = X;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialog_ref: MatDialogRef<LeadEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lead_service: LeadService,
    public interceptor_service: InterceptorService,
    public auth_service: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [''],
      phone: ['', [Validators.required]],
      phone_code: ['+1', [Validators.required]],
      phone_country: ['US', [Validators.required]],
      source: [''],
      status_id: [''],
      company_name: [''],
      website: [''],
      group_id: ['']
    });

    if (this.data?.id) {
      this.form.patchValue({
        name: this.data.name,
        lastname: this.data.lastname,
        email: this.data.email,
        phone: this.data.phone,
        phone_code: this.data.phone_code,
        phone_country: this.data.phone_country,
        source: this.data.source,
        status_id: this.data?.status?.id,
        company_name: this.data.company_name,
        website: this.data.website,
        group_id: this.data.group_id || ''
      });
      this.selectedGroupId.set(this.data.group_id || null);
    }
  }

  ngOnInit() {}

  onGroupSelected(groupId: string | null): void {
    this.selectedGroupId.set(groupId);
    this.form.patchValue({ group_id: groupId });
  }

  get phoneCodeControl() {
    return this.form.get('phone_code');
  }

  get phoneCountryControl() {
    return this.form.get('phone_country');
  }

  get groupControl() {
    return this.form.get('group_id');
  }

  getPhoneCodeControl() {
    return this.form.get('phone_code');
  }

  getPhoneCountryControl() {
    return this.form.get('phone_country');
  }

  getGroupControl() {
    return this.form.get('group_id');
  }

  closeDialog() {
    if (!this.loading()) {
      this.dialog_ref.close(this.update());
    }
  }

  submit() {
    if (this.data?.id) {
      this.updateLead();
    } else {
      this.createLead();
    }
  }

  updateLead(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = {
      id: this.data.id,
      ...this.form.value,
      group_id: this.selectedGroupId()
    };

    this.lead_service.updateLead(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Lead actualizado exitosamente.'
        });
      },
      error: () => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos actualizar el lead. Por favor intenta de nuevo.'
        });
      }
    });
  }

  createLead(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = {
      tenant_id: this.auth_service.user_info.tenant_id,
      status_id: 1,
      ...this.form.value,
      group_id: this.selectedGroupId()
    };

    this.lead_service.createLead(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Lead creado exitosamente.'
        });

        this.closeDialog();
      },
      error: () => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos crear el lead. Por favor intenta de nuevo.'
        });
      }
    });
  }
}
