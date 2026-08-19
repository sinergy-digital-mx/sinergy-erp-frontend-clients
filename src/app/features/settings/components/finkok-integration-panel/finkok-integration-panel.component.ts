import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import {
  FinkokConfigurationsResponse,
  FinkokEnvironment,
  FinkokEnvironmentConfig,
  getFinkokConnectionStatusLabel,
  SaveFinkokConfigurationDto,
} from '../../models/finkok-configuration.model';
import { FinkokConfigurationService } from '../../services/finkok-configuration.service';

@Component({
  selector: 'app-finkok-integration-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, TabComponent],
  templateUrl: './finkok-integration-panel.component.html',
  styleUrl: './finkok-integration-panel.component.scss',
})
export class FinkokIntegrationPanelComponent implements OnInit {
  readonly canRead: boolean;
  readonly canUpdate: boolean;
  readonly environmentTabs: TabItem[] = [
    { id: 'demo', title: 'Demo' },
    { id: 'production', title: 'Producción' },
  ];

  loading = false;
  saving = false;
  testing = false;
  savingStampingEnvironment = false;
  activeEnvironmentTab: FinkokEnvironment = 'demo';
  stampingEnvironment: FinkokEnvironment = 'demo';
  statusMessage = '';
  errorMessage = '';
  testMessage = '';
  configResponse: FinkokConfigurationsResponse | null = null;

  demoForm: FormGroup;
  prodForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private finkokService: FinkokConfigurationService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.demoForm = this.createForm();
    this.prodForm = this.createForm();
    this.canRead = this.authService.hasEntityPermission('FiscalConfiguration', 'Read');
    this.canUpdate = this.authService.hasEntityPermission('FiscalConfiguration', 'Update');
  }

  ngOnInit(): void {
    if (this.canRead) {
      this.loadConfiguration();
    }
  }

  get activeForm(): FormGroup {
    return this.activeEnvironmentTab === 'production' ? this.prodForm : this.demoForm;
  }

  get currentEnvironmentConfig(): FinkokEnvironmentConfig | null {
    return this.configResponse?.environments?.[this.activeEnvironmentTab] ?? null;
  }

  get hasSavedConfigForActiveTab(): boolean {
    return this.currentEnvironmentConfig !== null;
  }

  get hasPasswordForActiveTab(): boolean {
    return this.currentEnvironmentConfig?.has_password === true;
  }

  get connectionStatusLabel(): string {
    return getFinkokConnectionStatusLabel(this.currentEnvironmentConfig?.last_connection_test_status);
  }

  get showDemoBanner(): boolean {
    return this.stampingEnvironment === 'demo';
  }

  onEnvironmentTabChange(tabId: string): void {
    this.activeEnvironmentTab = tabId as FinkokEnvironment;
    this.statusMessage = '';
    this.errorMessage = '';
    this.testMessage = '';
  }

  onStampingEnvironmentChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value as FinkokEnvironment;
    if (!this.canUpdate || value === this.stampingEnvironment || this.savingStampingEnvironment) {
      select.value = this.stampingEnvironment;
      return;
    }

    const previous = this.stampingEnvironment;
    this.savingStampingEnvironment = true;
    this.errorMessage = '';

    this.finkokService
      .setStampingEnvironment(value)
      .pipe(
        finalize(() => {
          this.savingStampingEnvironment = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (stampingEnvironment) => {
          this.stampingEnvironment = stampingEnvironment;
          if (this.configResponse) {
            this.configResponse = {
              ...this.configResponse,
              stamping_environment: stampingEnvironment,
            };
          }
          this.statusMessage = `Ambiente de timbrado actualizado a ${
            stampingEnvironment === 'demo' ? 'Demo' : 'Producción'
          }.`;
        },
        error: (error) => {
          select.value = previous;
          this.stampingEnvironment = previous;
          this.errorMessage = error?.error?.message || 'No se pudo actualizar el ambiente de timbrado.';
        },
      });
  }

  loadConfiguration(): void {
    this.loading = true;
    this.errorMessage = '';
    this.statusMessage = '';
    this.testMessage = '';

    this.finkokService
      .getConfiguration()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (config) => {
          this.applyCredentialBundle(config, true);
        },
        error: (error) => {
          this.configResponse = null;
          this.errorMessage = error?.error?.message || 'No se pudo cargar la configuración Finkok.';
        },
      });
  }

  saveConfiguration(): void {
    if (!this.canUpdate || this.activeForm.invalid || this.saving) {
      this.activeForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.statusMessage = '';
    this.testMessage = '';

    const environment = this.activeEnvironmentTab;
    const formValue = this.activeForm.getRawValue();
    const payload: SaveFinkokConfigurationDto = {
      environment,
      finkok_username: String(formValue.finkok_username ?? '').trim(),
      is_active: formValue.is_active ? 1 : 0,
    };

    const password = String(formValue.finkok_password ?? '').trim();
    if (password) {
      payload.finkok_password = password;
    }

    this.finkokService
      .saveConfiguration(payload)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (config) => {
          this.applyCredentialBundle(config, true);
          this.statusMessage = `Credenciales ${
            environment === 'demo' ? 'demo' : 'de producción'
          } guardadas correctamente.`;
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'No se pudo guardar la configuración Finkok.';
        },
      });
  }

  testConnection(): void {
    if (!this.canUpdate || !this.hasSavedConfigForActiveTab || this.testing) {
      return;
    }

    const environment = this.activeEnvironmentTab;
    this.testing = true;
    this.errorMessage = '';
    this.testMessage = '';

    this.finkokService
      .testConnection(environment)
      .pipe(
        finalize(() => {
          this.testing = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (result) => {
          if (this.configResponse?.environments[environment]) {
            this.configResponse.environments[environment] = {
              ...this.configResponse.environments[environment]!,
              last_connection_test_status: result.last_connection_test_status,
            };
          }

          if (result.last_connection_test_status === 'connected') {
            this.testMessage = result.message || 'Conexión con Finkok verificada correctamente.';
          } else {
            this.testMessage = result.message || 'No se pudo verificar la conexión con Finkok.';
          }
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Error al probar la conexión con Finkok.';
        },
      });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      finkok_username: ['', [Validators.required, Validators.minLength(1)]],
      finkok_password: [''],
      is_active: [true],
    });
  }

  private applyCredentialBundle(
    incoming: FinkokConfigurationsResponse | null,
    hydrateForms: boolean
  ): void {
    const current = this.configResponse?.environments ?? { demo: null, production: null };
    const nextEnvironments = {
      demo: incoming?.environments?.demo ?? current.demo,
      production: incoming?.environments?.production ?? current.production,
    };

    this.configResponse = {
      stamping_environment: incoming?.stamping_environment || this.stampingEnvironment,
      environments: nextEnvironments,
    };
    this.stampingEnvironment = this.configResponse.stamping_environment;

    if (hydrateForms) {
      this.hydrateForm(this.demoForm, nextEnvironments.demo);
      this.hydrateForm(this.prodForm, nextEnvironments.production);
    }
  }

  private hydrateForm(form: FormGroup, config: FinkokEnvironmentConfig | null): void {
    const hasPassword = config?.has_password === true;
    form.reset({
      finkok_username: config?.finkok_username ?? '',
      finkok_password: '',
      is_active: config ? config.is_active === 1 || config.is_active === true : true,
    });
    this.syncPasswordValidator(form, hasPassword);
  }

  private syncPasswordValidator(form: FormGroup, hasPassword: boolean): void {
    const control = form.get('finkok_password');
    if (!control) {
      return;
    }

    if (hasPassword) {
      control.clearValidators();
    } else {
      control.setValidators([Validators.required]);
    }
    control.updateValueAndValidity({ emitEvent: false });
  }
}
