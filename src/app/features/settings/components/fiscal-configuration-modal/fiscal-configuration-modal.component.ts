import { Component, Inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiscalConfigurationService } from '../../services/fiscal-configuration.service';
import { FiscalConfiguration, CreateFiscalConfigurationDto, FISCAL_REGIMES } from '../../models/fiscal-configuration.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-fiscal-configuration-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, LucideAngularModule],
  templateUrl: './fiscal-configuration-modal.component.html',
  styleUrl: './fiscal-configuration-modal.component.scss'
})
export class FiscalConfigurationModalComponent implements OnInit {
  X = X;
  form: FormGroup;
  saving = signal(false);
  isNew = true;

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
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FiscalConfigurationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fiscalConfig: FiscalConfiguration | null }
  ) {
    this.isNew = !data.fiscalConfig;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.initializeSelectConfigs();
    if (this.data.fiscalConfig) {
      this.form.patchValue(this.data.fiscalConfig);
    }
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

  save() {
    if (this.form.invalid || this.saving()) return;

    this.saving.set(true);
    const formValue = this.form.value;

    if (this.isNew) {
      this.fiscalConfigService.createFiscalConfiguration(formValue).subscribe({
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
      this.fiscalConfigService.updateFiscalConfiguration(this.data.fiscalConfig!.id, formValue).subscribe({
        next: (config) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Configuración fiscal actualizada correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
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
