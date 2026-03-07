import { Component, Inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarehouseService } from '../../services/warehouse.service';
import { FiscalConfigurationService } from '../../services/fiscal-configuration.service';
import { Warehouse, CreateWarehouseDto } from '../../models/warehouse.model';
import { FiscalConfiguration } from '../../models/fiscal-configuration.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent } from '../../../../core/components/select/select.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-warehouse-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SelectComponent, LucideAngularModule],
  templateUrl: './warehouse-detail-modal.component.html',
  styleUrl: './warehouse-detail-modal.component.scss'
})
export class WarehouseDetailModalComponent implements OnInit {
  X = X;
  form: FormGroup;
  saving = signal(false);
  isNew = true;
  fiscalConfigurations = signal<FiscalConfiguration[]>([]);
  loadingFiscalConfigs = signal(false);

  statusOptions = [
    { id: 'active', name: 'Activo' },
    { id: 'inactive', name: 'Inactivo' }
  ];

  countryOptions = [
    { id: 'México', name: 'México' },
    { id: 'Estados Unidos', name: 'Estados Unidos' },
    { id: 'Canadá', name: 'Canadá' },
    { id: 'España', name: 'España' },
    { id: 'Argentina', name: 'Argentina' },
    { id: 'Brasil', name: 'Brasil' },
    { id: 'Chile', name: 'Chile' },
    { id: 'Colombia', name: 'Colombia' },
    { id: 'Perú', name: 'Perú' },
    { id: 'Venezuela', name: 'Venezuela' },
    { id: 'Guatemala', name: 'Guatemala' },
    { id: 'Honduras', name: 'Honduras' },
    { id: 'El Salvador', name: 'El Salvador' },
    { id: 'Nicaragua', name: 'Nicaragua' },
    { id: 'Costa Rica', name: 'Costa Rica' },
    { id: 'Panamá', name: 'Panamá' },
    { id: 'Cuba', name: 'Cuba' },
    { id: 'República Dominicana', name: 'República Dominicana' },
    { id: 'Puerto Rico', name: 'Puerto Rico' }
  ];

  // Select configurations
  statusSelectConfig: any;
  countrySelectConfig: any;
  fiscalConfigSelectConfig: any;

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private fiscalConfigService: FiscalConfigurationService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<WarehouseDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { warehouse: Warehouse | null }
  ) {
    this.isNew = !data.warehouse;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadFiscalConfigurations();
    this.initializeSelectConfigs();
    if (this.data.warehouse) {
      this.form.patchValue(this.data.warehouse);
    }
  }

  private initializeSelectConfigs(): void {
    this.statusSelectConfig = {
      placeholder: 'Selecciona status',
      data: this.statusOptions,
      value: 'id',
      option: 'name',
      form_control: this.form.get('status'),
      name_select: 'status'
    };

    this.countrySelectConfig = {
      placeholder: 'Selecciona un país',
      data: this.countryOptions,
      value: 'id',
      option: 'name',
      form_control: this.form.get('country'),
      name_select: 'country'
    };

    this.fiscalConfigSelectConfig = {
      placeholder: 'Selecciona una configuración fiscal (opcional)',
      data: this.fiscalConfigurations(),
      value: 'id',
      option: 'razon_social',
      form_control: this.form.get('fiscal_configuration_id'),
      name_select: 'fiscal_configuration_id'
    };
  }

  private loadFiscalConfigurations(): void {
    this.loadingFiscalConfigs.set(true);
    this.fiscalConfigService.listFiscalConfigurations({ limit: 100, status: 'active' }).subscribe({
      next: (response) => {
        this.fiscalConfigurations.set(response.data);
        this.loadingFiscalConfigs.set(false);
        // Update select config with new data
        this.fiscalConfigSelectConfig = {
          ...this.fiscalConfigSelectConfig,
          data: response.data
        };
      },
      error: () => {
        this.loadingFiscalConfigs.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar configuraciones fiscales', type: 'error' },
          duration: 3000
        });
      }
    });
  }

  getFiscalConfigLabel(config: FiscalConfiguration): string {
    return `${config.razon_social} - ${config.rfc}`;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: [''],
      description: [''],
      street: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      country: [''],
      fiscal_configuration_id: [''],
      status: ['active']
    });
  }

  save() {
    if (this.form.invalid || this.saving()) return;

    this.saving.set(true);
    const formValue = this.form.value;

    if (this.isNew) {
      this.warehouseService.createWarehouse(formValue).subscribe({
        next: (warehouse) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Almacén creado correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(warehouse);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al crear almacén', type: 'error' },
            duration: 5000
          });
          this.saving.set(false);
        }
      });
    } else {
      this.warehouseService.updateWarehouse(this.data.warehouse!.id, formValue).subscribe({
        next: (warehouse) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Almacén actualizado correctamente', type: 'success' },
            duration: 3000
          });
          this.saving.set(false);
          this.dialogRef.close(warehouse);
        },
        error: (error) => {
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: error.error?.message || 'Error al actualizar almacén', type: 'error' },
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

  onStatusChange(event: any): void {
    this.form.get('status')?.setValue(event.value, { emitEvent: false });
  }

  onCountryChange(event: any): void {
    this.form.get('country')?.setValue(event.value, { emitEvent: false });
  }

  onFiscalConfigChange(event: any): void {
    this.form.get('fiscal_configuration_id')?.setValue(event.value, { emitEvent: false });
  }
}
