import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { LocationMapFieldsComponent } from '../../../../core/components/location-map-fields/location-map-fields.component';
import { WarehouseService } from '../../../settings/services/warehouse.service';

export interface WarehouseLocationDialogData {
  warehouseId: string;
  warehouseName?: string;
}

@Component({
  selector: 'app-warehouse-location-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    LucideAngularModule,
    LocationMapFieldsComponent,
  ],
  templateUrl: './warehouse-location-dialog.component.html',
  styleUrl: './warehouse-location-dialog.component.scss',
})
export class WarehouseLocationDialogComponent implements OnInit {
  readonly X = X;
  form: FormGroup;
  loading = signal(true);
  saving = signal(false);
  mapActive = false;
  warehouseName = '';

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<WarehouseLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WarehouseLocationDialogData
  ) {
    this.warehouseName = data.warehouseName || 'CEDIS';
    this.form = this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      country: ['México'],
      latitude: [null as number | null, Validators.required],
      longitude: [null as number | null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      this.mapActive = !this.loading();
    });

    this.warehouseService.getWarehouse(this.data.warehouseId).subscribe({
      next: (warehouse) => {
        const w = (warehouse as any)?.data ?? warehouse;
        this.warehouseName = w?.name || this.warehouseName;
        this.form.patchValue({
          street: w?.street ?? '',
          city: w?.city ?? '',
          state: w?.state ?? '',
          zip_code: w?.zip_code ?? '',
          country: w?.country ?? 'México',
          latitude: w?.latitude ?? null,
          longitude: w?.longitude ?? null,
        });
        this.loading.set(false);
        this.mapActive = true;
      },
      error: () => {
        this.loading.set(false);
        this.mapActive = true;
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'No se pudo cargar el almacén', type: 'error' },
          duration: 5000,
        });
      },
    });
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
    const payload = {
      street: raw.street?.trim() || undefined,
      city: raw.city?.trim() || undefined,
      state: raw.state?.trim() || undefined,
      zip_code: raw.zip_code?.trim() || undefined,
      country: raw.country?.trim() || undefined,
      latitude: Number(raw.latitude),
      longitude: Number(raw.longitude),
    };
    this.saving.set(true);
    this.warehouseService.updateWarehouse(this.data.warehouseId, payload).subscribe({
      next: (res) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Ubicación del CEDIS guardada', type: 'success' },
          duration: 4000,
        });
        this.dialogRef.close(res ?? true);
      },
      error: (err) => {
        this.saving.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: err?.error?.message || 'No se pudo guardar la ubicación',
            type: 'error',
          },
          duration: 6000,
        });
      },
    });
  }
}
