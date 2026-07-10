import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import {
  FinkokConfigurationsResponse,
  FinkokEnvironment,
  FinkokEnvironmentConfig,
  getFinkokConnectionStatusLabel,
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

  form!: ReturnType<FinkokIntegrationPanelComponent['createForm']>;

  constructor(
    private fb: FormBuilder,
    private finkokService: FinkokConfigurationService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.createForm();
    this.canRead = this.authService.hasEntityPermission('FiscalConfiguration', 'Read');
    this.canUpdate = this.authService.hasEntityPermission('FiscalConfiguration', 'Update');
  }

  private createForm() {
    return this.fb.group({
      finkok_username: ['', [Validators.required, Validators.minLength(1)]],
      finkok_password: ['', [Validators.required]],
      is_active: [true],
      is_stamping_default: [false],
    });
  }

  ngOnInit(): void {
    if (this.canRead) {
      this.loadConfiguration();
    }
  }

  get currentEnvironmentConfig(): FinkokEnvironmentConfig | null {
    return this.configResponse?.environments?.[this.activeEnvironmentTab] ?? null;
  }

  get hasSavedConfigForActiveTab(): boolean {
    return this.currentEnvironmentConfig !== null;
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
    this.applyEnvironmentToForm(this.currentEnvironmentConfig);
  }

  onStampingEnvironmentChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as FinkokEnvironment;
    if (!this.canUpdate || value === this.stampingEnvironment || this.savingStampingEnvironment) {
      return;
    }

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
        next: (config) => {
          this.configResponse = config;
          this.stampingEnvironment = config.stamping_environment;
          this.statusMessage = `Ambiente de timbrado actualizado a ${value === 'demo' ? 'Demo' : 'Producción'}.`;
        },
        error: (error) => {
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
          this.configResponse = config;
          if (config) {
            this.stampingEnvironment = config.stamping_environment || 'demo';
            this.activeEnvironmentTab = this.stampingEnvironment;
          }
          this.applyEnvironmentToForm(this.currentEnvironmentConfig);
        },
        error: (error) => {
          this.configResponse = null;
          this.errorMessage = error?.error?.message || 'No se pudo cargar la configuración Finkok.';
        },
      });
  }

  saveConfiguration(): void {
    if (!this.canUpdate || this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.statusMessage = '';
    this.testMessage = '';

    const formValue = this.form.getRawValue();

    this.finkokService
      .saveConfiguration({
        environment: this.activeEnvironmentTab,
        finkok_username: String(formValue.finkok_username).trim(),
        finkok_password: String(formValue.finkok_password),
        is_active: formValue.is_active ? 1 : 0,
        is_stamping_default: formValue.is_stamping_default ? 1 : 0,
      })
      .pipe(
        finalize(() => {
          this.saving = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (config) => {
          this.configResponse = config;
          this.stampingEnvironment = config.stamping_environment;
          this.statusMessage = `Credenciales ${this.activeEnvironmentTab === 'demo' ? 'demo' : 'de producción'} guardadas correctamente.`;
          this.form.patchValue({ finkok_password: '' });
          this.form.get('finkok_password')?.markAsUntouched();
          this.applyEnvironmentToForm(this.currentEnvironmentConfig);
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

    this.testing = true;
    this.errorMessage = '';
    this.testMessage = '';

    this.finkokService
      .testConnection(this.activeEnvironmentTab)
      .pipe(
        finalize(() => {
          this.testing = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (result) => {
          if (this.configResponse?.environments[this.activeEnvironmentTab]) {
            this.configResponse.environments[this.activeEnvironmentTab] = {
              ...this.configResponse.environments[this.activeEnvironmentTab]!,
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

  private applyEnvironmentToForm(config: FinkokEnvironmentConfig | null): void {
    if (!config) {
      this.form.reset({
        finkok_username: '',
        finkok_password: '',
        is_active: true,
        is_stamping_default: this.stampingEnvironment === this.activeEnvironmentTab,
      });
      return;
    }

    this.form.patchValue({
      finkok_username: config.finkok_username ?? '',
      finkok_password: '',
      is_active: config.is_active === 1 || config.is_active === true,
      is_stamping_default:
        config.is_stamping_default === 1 ||
        config.is_stamping_default === true ||
        this.stampingEnvironment === this.activeEnvironmentTab,
    });
  }
}
