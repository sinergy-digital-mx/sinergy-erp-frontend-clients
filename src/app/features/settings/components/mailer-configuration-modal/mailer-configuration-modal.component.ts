import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { MailerConfiguration, CreateMailerConfigurationDto, UpdateMailerConfigurationDto } from '../../models/mailer-configuration.model';
import { MailerConfigurationService } from '../../services/mailer-configuration.service';

@Component({
  selector: 'app-mailer-configuration-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mailer-configuration-modal.component.html',
  styleUrls: ['./mailer-configuration-modal.component.scss']
})
export class MailerConfigurationModalComponent implements OnInit {
  form: FormGroup;
  loading = false;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private mailerConfigurationService: MailerConfigurationService,
    private interceptorService: InterceptorService,
    public dialogRef: MatDialogRef<MailerConfigurationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { configuration?: MailerConfiguration }
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      apiKey: ['', [Validators.required]],
      fromEmail: ['', [Validators.required, Validators.email]],
      fromName: [''],
      replyTo: ['', [Validators.email]],
      isActive: [true]
    });
  }

  ngOnInit() {
    if (this.data?.configuration) {
      const vendorConfig = this.getVendorConfig(this.data.configuration);
      this.isEdit = true;
      this.form.get('apiKey')?.clearValidators();
      this.form.get('apiKey')?.updateValueAndValidity();
      this.form.patchValue({
        name: this.data.configuration.name,
        apiKey: '',
        fromEmail: vendorConfig.fromEmail ?? '',
        fromName: vendorConfig.fromName ?? '',
        replyTo: vendorConfig.replyTo ?? '',
        isActive: this.isConfigurationActive(this.data.configuration)
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.interceptorService.openSnackbar({
        type: 'error',
        title: 'Error',
        message: 'Completa los campos requeridos'
      });
      return;
    }

    this.loading = true;
    const formValue = this.form.value;
    const request$ = this.isEdit && this.data?.configuration
      ? this.mailerConfigurationService.updateMailerConfiguration(this.data.configuration.id, this.buildUpdatePayload())
      : this.mailerConfigurationService.createMailerConfiguration(this.buildCreatePayload(formValue));

    request$.subscribe({
      next: (result) => {
        if (formValue.isActive) {
          this.activateAndClose(result);
          return;
        }

        this.finishSuccessfully(result);
      },
      error: (err) => {
        this.loading = false;
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al guardar configuración'
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  private buildCreatePayload(formValue: any): CreateMailerConfigurationDto {
    return {
      name: formValue.name,
      vendor: 'resend',
      vendorConfig: this.buildVendorConfig(formValue, true),
      apiKey: formValue.apiKey,
      isActive: formValue.isActive
    };
  }

  private buildUpdatePayload(): UpdateMailerConfigurationDto {
    const formValue = this.form.value;
    const payload: UpdateMailerConfigurationDto = {
      name: formValue.name,
      vendorConfig: this.buildVendorConfig(formValue, Boolean(formValue.apiKey?.trim())),
      isActive: formValue.isActive
    };

    if (formValue.apiKey?.trim()) {
      payload.apiKey = formValue.apiKey.trim();
    }

    return payload;
  }

  private buildVendorConfig(formValue: any, includeApiKey: boolean) {
    return {
      ...(includeApiKey && { apiKey: formValue.apiKey.trim() }),
      fromEmail: formValue.fromEmail.trim(),
      ...(formValue.fromName?.trim() && { fromName: formValue.fromName.trim() }),
      ...(formValue.replyTo?.trim() && { replyTo: formValue.replyTo.trim() })
    };
  }

  private activateAndClose(configuration: MailerConfiguration) {
    const configurationId = configuration?.id ?? this.data?.configuration?.id;

    if (!configurationId) {
      this.finishSuccessfully(configuration);
      return;
    }

    this.mailerConfigurationService.activateMailerConfiguration(configurationId).subscribe({
      next: (activatedConfiguration) => {
        this.finishSuccessfully(activatedConfiguration);
      },
      error: (err) => {
        this.loading = false;
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'La configuración se guardó, pero no se pudo activar'
        });
      }
    });
  }

  private finishSuccessfully(configuration: MailerConfiguration) {
    this.loading = false;
    this.interceptorService.openSnackbar({
      type: 'success',
      title: 'Éxito',
      message: this.isEdit ? 'Configuración actualizada correctamente' : 'Configuración creada correctamente'
    });
    this.dialogRef.close(configuration);
  }

  private isConfigurationActive(configuration: MailerConfiguration): boolean {
    return Boolean(configuration.is_active ?? configuration.isActive);
  }

  private getVendorConfig(configuration: MailerConfiguration) {
    return configuration.vendorConfig ?? configuration.vendor_config ?? {};
  }
}
