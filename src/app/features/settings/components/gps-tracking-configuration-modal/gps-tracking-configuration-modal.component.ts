import { CommonModule } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import {
  GpsTrackingConfiguration,
  GpsTrackingTestResult,
} from '../../models/gps-tracking-configuration.model';
import { GpsTrackingConfigurationService } from '../../services/gps-tracking-configuration.service';

@Component({
  selector: 'app-gps-tracking-configuration-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './gps-tracking-configuration-modal.component.html',
  styleUrl: './gps-tracking-configuration-modal.component.scss',
})
export class GpsTrackingConfigurationModalComponent {
  form: FormGroup;
  saving = signal(false);
  testing = signal(false);
  testResult = signal<GpsTrackingTestResult | null>(null);
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private gpsConfig: GpsTrackingConfigurationService,
    public dialogRef: MatDialogRef<GpsTrackingConfigurationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { configuration?: GpsTrackingConfiguration }
  ) {
    this.isEdit = !!data.configuration;
    this.form = this.fb.group({
      name: [data.configuration?.name ?? '', [Validators.required, Validators.minLength(3)]],
      username: [data.configuration?.username ?? '', [Validators.required]],
      password: ['', this.isEdit ? [] : [Validators.required]],
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }

  test(): void {
    const username = String(this.form.value.username ?? '').trim();
    const password = String(this.form.value.password ?? '').trim();
    if (!username || (!password && !this.data.configuration)) {
      this.form.markAllAsTouched();
      return;
    }
    this.testing.set(true);
    this.testResult.set(null);
    this.gpsConfig
      .test({
        configuration_id: this.data.configuration?.id,
        username,
        password: password || undefined,
      })
      .subscribe({
        next: (result) => {
          this.testing.set(false);
          this.testResult.set(result);
        },
        error: (err) => {
          this.testing.set(false);
          this.testResult.set({
            ok: false,
            message: err?.error?.message || 'No se pudo probar la conexión',
            unit_count: 0,
          });
        },
      });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const name = String(this.form.value.name).trim();
    const username = String(this.form.value.username).trim();
    const password = String(this.form.value.password ?? '').trim();
    this.saving.set(true);
    const request = this.data.configuration
      ? this.gpsConfig.update(this.data.configuration.id, {
          name,
          username,
          ...(password ? { password } : {}),
        })
      : this.gpsConfig.create({ name, username, password });

    request.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.saving.set(false);
        this.testResult.set({
          ok: false,
          message: err?.error?.message || 'No se pudo guardar la configuración',
          unit_count: 0,
        });
      },
    });
  }
}
