import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { CustomerGroupAdminService } from '../../services/customer-group-admin.service';
import {
  CreateCustomerGroupDto,
  CustomerGroupAdmin,
  UpdateCustomerGroupDto,
} from '../../models/customer-group-admin.model';

export interface CustomerGroupFormDialogData {
  group?: CustomerGroupAdmin | null;
}

@Component({
  selector: 'app-customer-group-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, LucideAngularModule],
  templateUrl: './customer-group-form-dialog.component.html',
  styleUrl: './customer-group-form-dialog.component.scss',
})
export class CustomerGroupFormDialogComponent {
  readonly X = X;
  form: FormGroup;
  saving = signal(false);
  isNew = true;

  constructor(
    private fb: FormBuilder,
    private customerGroupAdminService: CustomerGroupAdminService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CustomerGroupFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerGroupFormDialogData
  ) {
    this.isNew = !data?.group;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(2000)]],
    });
    if (data?.group) {
      this.form.patchValue({
        name: data.group.name,
        description: data.group.description ?? '',
      });
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const raw = this.form.getRawValue();
    const payload: CreateCustomerGroupDto | UpdateCustomerGroupDto = {
      name: String(raw.name ?? '').trim(),
      description: String(raw.description ?? '').trim() || undefined,
    };

    const request$ = this.isNew
      ? this.customerGroupAdminService.createCustomerGroup(payload as CreateCustomerGroupDto)
      : this.customerGroupAdminService.updateCustomerGroup(this.data.group!.id, payload);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: this.isNew ? 'Grupo creado' : 'Grupo actualizado',
            type: 'success',
          },
          duration: 3000,
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: this.resolveErrorMessage(error),
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }

  private resolveErrorMessage(error: unknown): string {
    const fallback = 'No se pudo guardar el grupo';
    if (!error || typeof error !== 'object') {
      return fallback;
    }
    const httpError = error as { status?: number; error?: { message?: string | string[] } };
    const msg = httpError.error?.message;
    if (Array.isArray(msg)) {
      return msg.join(', ');
    }
    if (typeof msg === 'string' && msg.trim()) {
      return msg;
    }
    if (httpError.status === 409) {
      return 'Ya existe un grupo con ese nombre en esta organización';
    }
    return fallback;
  }
}
