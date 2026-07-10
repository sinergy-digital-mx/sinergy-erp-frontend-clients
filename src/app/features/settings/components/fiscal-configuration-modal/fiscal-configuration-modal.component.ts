import { Component, Inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiscalConfigurationService } from '../../services/fiscal-configuration.service';
import { BranchService } from '../../services/branch.service';
import { AuthService } from '../../../../core/services/auth.service';
import { FiscalConfiguration, CreateFiscalConfigurationDto, FISCAL_REGIMES } from '../../models/fiscal-configuration.model';
import {
  FinkokEnvironment,
  FinkokStatusResponse,
  getFinkokRegistrationStatusLabel,
} from '../../models/finkok-configuration.model';
import { Branch } from '../../models/branch.model';
import { fileToBase64, isCerFile, isKeyFile } from '../../utils/csd-file.util';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { BranchModalComponent } from '../branch-modal/branch-modal.component';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-fiscal-configuration-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent, SelectComponent, TabComponent, LucideAngularModule],
  templateUrl: './fiscal-configuration-modal.component.html',
  styleUrl: './fiscal-configuration-modal.component.scss'
})
export class FiscalConfigurationModalComponent implements OnInit {
  X = X;
  form: FormGroup;
  saving = signal(false);
  loading = signal(false);
  uploadingLogo = signal(false);
  isNew = true;
  logoUrl: string | null = null;
  logoFileName: string | null = null;
  digitalSealFileName: string | null = null;
  privateKeyFileName: string | null = null;
  hasDigitalSealStored = false;
  hasPrivateKeyStored = false;
  hasDigitalSealPasswordStored = false;

  // Tabs
  tabs: TabItem[] = [
    { id: 'configuracion', title: 'Configuración' },
    { id: 'sucursales', title: 'Sucursales' },
    { id: 'logo', title: 'Logo' }
  ];
  activeTab = 'configuracion';

  // Branches
  branches: Branch[] = [];
  loadingBranches = false;

  // Finkok registration
  finkokEnvironment: FinkokEnvironment = 'demo';
  finkokStatusLoading = false;
  finkokRegisterLoading = false;
  finkokRegisterMode: 'verify' | 'add' | null = null;
  finkokStatusResult: FinkokStatusResponse | null = null;
  readonly canUpdateFinkok: boolean;

  personaTypeOptions = [
    { id: 'Persona Física', name: 'Persona Física' },
    { id: 'Persona Moral', name: 'Persona Moral' }
  ];

  statusOptions = [
    { id: 'active', name: 'Activo' },
    { id: 'inactive', name: 'Inactivo' }
  ];

  fiscalRegimes = FISCAL_REGIMES;

  // Select configurations
  personaTypeSelectConfig: any;
  fiscalRegimeSelectConfig: any;
  statusSelectConfig: any;

  constructor(
    private fb: FormBuilder,
    private fiscalConfigService: FiscalConfigurationService,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    public dialogRef: MatDialogRef<FiscalConfigurationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fiscalConfig: FiscalConfiguration | null }
  ) {
    this.isNew = !data.fiscalConfig;
    this.form = this.createForm();
    this.canUpdateFinkok = this.authService.hasEntityPermission('FiscalConfiguration', 'Update');
  }

  ngOnInit(): void {
    this.initializeSelectConfigs();
    if (this.data.fiscalConfig) {
      this.applyFiscalConfigToForm(this.data.fiscalConfig);
      this.logoUrl = this.data.fiscalConfig.logo || null;
      this.clearStaleFinkokError();
      this.loadBranches();
    }
  }

  private applyFiscalConfigToForm(config: FiscalConfiguration): void {
    this.hasDigitalSealStored = this.hasStoredCsdField(config, 'digital_seal', 'has_digital_seal');
    this.hasPrivateKeyStored = this.hasStoredCsdField(config, 'private_key', 'has_private_key');
    this.hasDigitalSealPasswordStored = !!(
      config.has_digital_seal_password ?? config.digital_seal_password
    );

    this.form.patchValue({
      razon_social: config.razon_social,
      rfc: config.rfc,
      persona_type: config.persona_type,
      fiscal_regime: config.fiscal_regime ?? '',
      status: config.status,
      digital_seal: '',
      private_key: '',
      digital_seal_password: '',
    });
  }

  private hasStoredCsdField(
    config: FiscalConfiguration,
    valueKey: 'digital_seal' | 'private_key',
    flagKey: 'has_digital_seal' | 'has_private_key'
  ): boolean {
    if (config[flagKey] === true || config[flagKey] === 1) {
      return true;
    }
    const value = config[valueKey];
    return typeof value === 'string' && value.trim().length > 0;
  }

  private clearStaleFinkokError(): void {
    const config = this.data.fiscalConfig;
    if (!config?.finkok_registration_error || config.finkok_registration_status === 'registered') {
      return;
    }

    const currentRfc = String(config.rfc || '').trim().toUpperCase();
    const error = config.finkok_registration_error;
    if (currentRfc && !error.toUpperCase().includes(currentRfc)) {
      config.finkok_registration_error = null;
    }
  }

  openLogoPicker(input: HTMLInputElement): void {
    if (this.uploadingLogo() || this.isNew) return;
    input.click();
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const fiscalConfig = this.data.fiscalConfig;

    if (!file || !fiscalConfig) {
      return;
    }

    this.logoFileName = file.name;
    this.uploadingLogo.set(true);
    this.fiscalConfigService.uploadFiscalLogo(fiscalConfig.id, file).subscribe({
      next: () => {
        this.fiscalConfigService.getFiscalConfiguration(fiscalConfig.id).subscribe({
          next: (updatedConfig) => {
            this.data.fiscalConfig = updatedConfig;
            this.logoUrl = updatedConfig.logo || null;
            this.uploadingLogo.set(false);
            input.value = '';
            this.cdr.detectChanges();
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: 'Logo subido correctamente', type: 'success' },
              duration: 3000
            });
          },
          error: (error) => {
            this.uploadingLogo.set(false);
            input.value = '';
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: { message: error.error?.message || 'Logo subido, pero no se pudo refrescar la vista', type: 'error' },
              duration: 4000
            });
          }
        });
      },
      error: (error) => {
        this.uploadingLogo.set(false);
        input.value = '';
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Error al subir logo', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  loadBranches(): void {
    if (!this.data.fiscalConfig) return;
    
    this.loadingBranches = true;
    this.branchService.getBranches(this.data.fiscalConfig.id).subscribe({
      next: (branches) => {
        this.branches = branches;
        this.loadingBranches = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading branches:', error);
        this.loadingBranches = false;
        this.cdr.detectChanges();
      }
    });
  }

  openBranchModal(branch?: Branch): void {
    if (!this.data.fiscalConfig) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Debes guardar la configuración fiscal antes de agregar sucursales', type: 'error' },
        duration: 3000
      });
      return;
    }

    const dialogRef = this.dialog.open(BranchModalComponent, {
      width: '92vw',
      maxWidth: '680px',
      data: {
        fiscalConfigId: this.data.fiscalConfig.id,
        branchId: branch?.id || null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBranches();
      }
    });
  }

  getWarehousesCount(branch: Branch): number {
    if (branch.warehouses_count != null) {
      return branch.warehouses_count;
    }
    return branch.warehouses?.length ?? 0;
  }

  getStatusLabel(status: number): string {
    return status === 1 ? 'Activo' : 'Inactivo';
  }

  getStatusClass(status: number): string {
    return status === 1 ? 'status-active' : 'status-inactive';
  }

  private initializeSelectConfigs(): void {
    this.personaTypeSelectConfig = {
      placeholder: 'Selecciona tipo de persona',
      data: this.personaTypeOptions,
      value: 'id',
      option: 'name',
      form_control: this.form.get('persona_type'),
      name_select: 'persona_type'
    };

    this.fiscalRegimeSelectConfig = {
      placeholder: 'Selecciona un régimen fiscal',
      data: this.fiscalRegimes,
      value: 'id',
      option: 'name',
      form_control: this.form.get('fiscal_regime'),
      name_select: 'fiscal_regime'
    };

    this.statusSelectConfig = {
      placeholder: 'Selecciona status',
      data: this.statusOptions,
      value: 'id',
      option: 'name',
      form_control: this.form.get('status'),
      name_select: 'status'
    };
  }

  private createForm(): FormGroup {
    return this.fb.group({
      razon_social: ['', [Validators.required, Validators.minLength(2)]],
      rfc: ['', [Validators.required, Validators.pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/)]],
      persona_type: ['Persona Moral', [Validators.required]],
      fiscal_regime: [''],
      digital_seal: [''],
      digital_seal_password: [''],
      private_key: [''],
      status: ['active']
    });
  }

  getFinkokRegistrationLabel(): string {
    if (this.data.fiscalConfig?.finkok_registration_status === 'registered') {
      return getFinkokRegistrationStatusLabel('registered');
    }
    if (this.finkokStatusResult?.exists_in_finkok) {
      return 'Verificado en Finkok';
    }
    return getFinkokRegistrationStatusLabel(this.data.fiscalConfig?.finkok_registration_status);
  }

  getFinkokRegistrationClass(): string {
    const status = this.data.fiscalConfig?.finkok_registration_status;
    if (status === 'registered') return 'finkok-badge--registered';
    if (this.finkokStatusResult?.exists_in_finkok) return 'finkok-badge--verified';
    if (status === 'failed') return 'finkok-badge--failed';
    return 'finkok-badge--pending';
  }

  getFinkokRegistrationError(): string | null {
    const error = this.data.fiscalConfig?.finkok_registration_error;
    if (!error) {
      return null;
    }

    if (this.data.fiscalConfig?.finkok_registration_status === 'registered') {
      return null;
    }

    if (this.finkokStatusResult?.exists_in_finkok) {
      return null;
    }

    const currentRfc = String(this.form.get('rfc')?.value || '').trim().toUpperCase();
    if (currentRfc && !error.toUpperCase().includes(currentRfc)) {
      return null;
    }

    return error;
  }

  onFinkokEnvironmentChange(): void {
    this.finkokStatusResult = null;
  }

  openCerPicker(input: HTMLInputElement): void {
    input.click();
  }

  openKeyPicker(input: HTMLInputElement): void {
    input.click();
  }

  async onDigitalSealSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!isCerFile(file)) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Selecciona un archivo .cer válido', type: 'error' },
        duration: 4000,
      });
      input.value = '';
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      this.form.patchValue({ digital_seal: base64 });
      this.digitalSealFileName = file.name;
      this.hasDigitalSealStored = false;
      this.cdr.detectChanges();
    } catch {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'No se pudo leer el archivo .cer', type: 'error' },
        duration: 4000,
      });
      input.value = '';
    }
  }

  async onPrivateKeySelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!isKeyFile(file)) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Selecciona un archivo .key o .pem válido', type: 'error' },
        duration: 4000,
      });
      input.value = '';
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      this.form.patchValue({ private_key: base64 });
      this.privateKeyFileName = file.name;
      this.hasPrivateKeyStored = false;
      this.cdr.detectChanges();
    } catch {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'No se pudo leer el archivo de llave privada', type: 'error' },
        duration: 4000,
      });
      input.value = '';
    }
  }

  private buildSavePayload(): CreateFiscalConfigurationDto {
    const formValue = this.form.getRawValue();
    const payload: CreateFiscalConfigurationDto = {
      razon_social: String(formValue.razon_social).trim(),
      rfc: String(formValue.rfc).trim().toUpperCase(),
      persona_type: formValue.persona_type,
      fiscal_regime: formValue.fiscal_regime || undefined,
      status: formValue.status,
    };

    const digitalSeal = String(formValue.digital_seal || '').trim();
    const privateKey = String(formValue.private_key || '').trim();
    const password = String(formValue.digital_seal_password || '').trim();

    if (digitalSeal) {
      payload.digital_seal = digitalSeal;
    }
    if (privateKey) {
      payload.private_key = privateKey;
    }
    if (password) {
      payload.digital_seal_password = password;
    }

    return payload;
  }

  checkFinkokStatus(): void {
    const config = this.data.fiscalConfig;
    if (!config?.id || this.finkokStatusLoading) return;

    this.finkokStatusLoading = true;
    this.finkokStatusResult = null;

    this.fiscalConfigService.getFinkokStatus(config.id, this.finkokEnvironment).subscribe({
      next: (result) => {
        this.finkokStatusResult = result;

        if (this.data.fiscalConfig) {
          if (result.exists_in_finkok) {
            this.data.fiscalConfig.finkok_registration_error = null;
          }
          if (result.finkok_registration_status) {
            this.data.fiscalConfig.finkok_registration_status = result.finkok_registration_status;
          }
        }

        this.finkokStatusLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.finkokStatusLoading = false;
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Error al consultar Finkok', type: 'error' },
          duration: 5000,
        });
        this.cdr.detectChanges();
      },
    });
  }

  linkFinkok(): void {
    this.registerFinkok('verify');
  }

  registerInFinkok(): void {
    this.registerFinkok('add', true);
  }

  private registerFinkok(mode: 'verify' | 'add', addIfMissing = false): void {
    const config = this.data.fiscalConfig;
    if (!config?.id || this.finkokRegisterLoading || !this.canUpdateFinkok) return;

    this.finkokRegisterLoading = true;
    this.finkokRegisterMode = mode;

    this.fiscalConfigService
      .registerFinkok(config.id, {
        mode,
        environment: this.finkokEnvironment,
        ...(mode === 'add' ? { add_if_missing: addIfMissing } : {}),
      })
      .subscribe({
        next: (updated) => {
          this.data.fiscalConfig = updated;
          this.finkokRegisterLoading = false;
          this.finkokRegisterMode = null;
          this.finkokStatusResult = null;
          this.cdr.detectChanges();
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message:
                updated.finkok_registration_status === 'registered'
                  ? 'Razón emisora vinculada con Finkok correctamente'
                  : 'Operación completada',
              type: 'success',
            },
            duration: 4000,
          });
        },
        error: (error) => {
          this.finkokRegisterLoading = false;
          this.finkokRegisterMode = null;
          this.cdr.detectChanges();
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al registrar en Finkok', type: 'error' },
            duration: 5000,
          });
        },
      });
  }

  save() {
    if (this.form.invalid || this.saving()) return;

    this.saving.set(true);
    const payload = this.buildSavePayload();

    if (this.isNew) {
      this.fiscalConfigService.createFiscalConfiguration(payload).subscribe({
        next: (config) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Configuración fiscal creada correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(config);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al crear configuración fiscal', type: 'error' },
            duration: 5000
          });
          this.saving.set(false);
        }
      });
    } else {
      this.fiscalConfigService.updateFiscalConfiguration(this.data.fiscalConfig!.id, payload).subscribe({
        next: (config) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Configuración fiscal actualizada correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.data.fiscalConfig = config;
          this.applyFiscalConfigToForm(config);
          this.digitalSealFileName = null;
          this.privateKeyFileName = null;
          this.dialogRef.close(config);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al actualizar configuración fiscal', type: 'error' },
            duration: 5000
          });
          this.saving.set(false);
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  onPersonaTypeChange(event: any): void {
    this.form.get('persona_type')?.setValue(event.value, { emitEvent: false });
  }

  onFiscalRegimeChange(event: any): void {
    this.form.get('fiscal_regime')?.setValue(event.value, { emitEvent: false });
  }

  onStatusChange(event: any): void {
    this.form.get('status')?.setValue(event.value, { emitEvent: false });
  }
}
