import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { LocationMapFieldsComponent } from '../../../../core/components/location-map-fields/location-map-fields.component';
import { CustomerService } from '../../../../core/services/customer.service';
import { CustomerAddress } from '../../models/customer-group.model';

export interface CustomerAddressDialogData {
  customerId: string;
  address?: CustomerAddress | null;
  /** Preferido en logística: `shipping` (Entrega). */
  defaultType?: string;
}

@Component({
  selector: 'app-customer-address-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    LucideAngularModule,
    LocationMapFieldsComponent,
  ],
  templateUrl: './customer-address-dialog.component.html',
  styleUrl: './customer-address-dialog.component.scss',
})
export class CustomerAddressDialogComponent implements OnInit {
  readonly X = X;
  form: FormGroup;
  saving = signal(false);
  isNew = true;
  mapActive = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CustomerAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerAddressDialogData
  ) {
    this.isNew = !data.address;
    this.form = this.fb.group({
      type: [data.defaultType || data.address?.type || 'shipping', Validators.required],
      street_address: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      postal_code: [''],
      country: ['México'],
      is_primary: [false],
      latitude: [null as number | null],
      longitude: [null as number | null],
    });
  }

  ngOnInit(): void {
    if (this.data.address) {
      this.form.patchValue(this.data.address);
    }
    this.dialogRef.afterOpened().subscribe(() => {
      this.mapActive = true;
    });
    setTimeout(() => {
      this.mapActive = true;
    }, 200);
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const raw = this.form.getRawValue();
    const payload: Partial<CustomerAddress> = {
      type: raw.type,
      street_address: String(raw.street_address).trim(),
      city: String(raw.city).trim(),
      state: raw.state?.trim() || undefined,
      postal_code: raw.postal_code?.trim() || undefined,
      country: raw.country?.trim() || undefined,
      is_primary: !!raw.is_primary,
    };
    if (raw.latitude !== null && raw.latitude !== '' && !Number.isNaN(Number(raw.latitude))) {
      payload.latitude = Number(raw.latitude);
    }
    if (raw.longitude !== null && raw.longitude !== '' && !Number.isNaN(Number(raw.longitude))) {
      payload.longitude = Number(raw.longitude);
    }

    this.saving.set(true);
    const req$ =
      this.isNew || !this.data.address?.id
        ? this.customerService.createCustomerAddress(this.data.customerId, payload)
        : this.customerService.updateCustomerAddress(
            this.data.customerId,
            this.data.address.id,
            payload
          );

    req$.subscribe({
      next: (res) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: res?.message || (this.isNew ? 'Dirección creada' : 'Dirección actualizada'),
            type: 'success',
          },
          duration: 4000,
        });
        this.dialogRef.close(res?.data ?? res ?? true);
      },
      error: (err) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: err?.error?.message || 'No se pudo guardar la dirección',
            type: 'error',
          },
          duration: 6000,
        });
      },
    });
  }
}
