import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { LocationMapFieldsComponent } from '../../../../core/components/location-map-fields/location-map-fields.component';
import { BranchService } from '../../../settings/services/branch.service';

export interface BranchLocationDialogData {
  fiscalConfigId: string;
  branchId: string;
  branchName?: string;
}

@Component({
  selector: 'app-branch-location-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    LucideAngularModule,
    LocationMapFieldsComponent,
    SpinnerComponent,
  ],
  templateUrl: './branch-location-dialog.component.html',
  styleUrl: './branch-location-dialog.component.scss',
})
export class BranchLocationDialogComponent implements OnInit {
  readonly X = X;
  form: FormGroup;
  loading = signal(true);
  saving = signal(false);
  mapActive = false;
  branchName = '';

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BranchLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BranchLocationDialogData
  ) {
    this.branchName = data.branchName || 'Sucursal';
    this.form = this.fb.group({
      address: [''],
      city: [''],
      state: [''],
      postal_code: [''],
      country: ['México'],
      latitude: [null as number | null, Validators.required],
      longitude: [null as number | null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.dialogRef.afterOpened().subscribe(() => {
      this.mapActive = !this.loading();
    });

    this.branchService.getBranch(this.data.fiscalConfigId, this.data.branchId).subscribe({
      next: (branch) => {
        this.branchName = branch?.name || branch?.code || this.branchName;
        this.form.patchValue({
          address: branch?.address ?? '',
          city: branch?.city ?? '',
          state: branch?.state ?? '',
          postal_code: branch?.postal_code ?? '',
          country: branch?.country ?? 'México',
          latitude: branch?.latitude ?? null,
          longitude: branch?.longitude ?? null,
        });
        this.loading.set(false);
        this.mapActive = true;
      },
      error: () => {
        this.loading.set(false);
        this.mapActive = true;
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'No se pudo cargar la sucursal', type: 'error' },
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
      address: raw.address?.trim() || undefined,
      city: raw.city?.trim() || undefined,
      state: raw.state?.trim() || undefined,
      postal_code: raw.postal_code?.trim() || undefined,
      country: raw.country?.trim() || undefined,
      latitude: Number(raw.latitude),
      longitude: Number(raw.longitude),
    };
    this.saving.set(true);
    this.branchService
      .updateBranch(this.data.fiscalConfigId, this.data.branchId, payload)
      .subscribe({
        next: (res) => {
          this.saving.set(false);
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Ubicación de la sucursal guardada', type: 'success' },
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
