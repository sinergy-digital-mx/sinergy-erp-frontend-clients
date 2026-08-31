import { Component, Inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { PropertyService } from '../../services/property.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { Property, MeasurementUnit, normalizeCadastralKey } from '../../models/property.model';
import { CustomerGroupFetchService } from '../../../customers/services/customer-group-fetch.service';

@Component({
  selector: 'app-property-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    LucideAngularModule
  ],
  templateUrl: './property-edit-modal.component.html',
  styleUrls: ['./property-edit-modal.component.scss']
})
export class PropertyEditModalComponent implements OnInit {
  loading = signal(false);
  loadingProperty = signal(false);
  update = signal(false);
  /** Lote fresco del GET /:id (no recortar el objeto local). */
  loadedProperty = signal<Property | null>(null);
  measurementUnits = signal<MeasurementUnit[]>([]);
  loadingUnits = signal(false);
  propertyGroups = signal<any[]>([]);
  loadingGroups = signal(false);

  readonly X = X;
  form: FormGroup;

  statusSelectConfig: ISelect = {
    placeholder: 'Selecciona un estado',
    data: [
      { value: 'disponible', label: 'Disponible' },
      { value: 'vendido', label: 'Vendido' },
      { value: 'reservado', label: 'Reservado' },
      { value: 'cancelado', label: 'Cancelado' }
    ],
    value: 'value',
    option: 'label',
    form_control: null
  };

  measurementUnitSelectConfig: ISelect = {
    placeholder: 'Selecciona una unidad',
    data: [],
    value: 'id',
    option: 'displayName',
    form_control: null,
    loading: true
  };

  currencySelectConfig: ISelect = {
    placeholder: 'Selecciona una moneda',
    data: [
      { value: 'MXN', label: 'MXN - Peso Mexicano' },
      { value: 'USD', label: 'USD - Dólar' },
      { value: 'EUR', label: 'EUR - Euro' }
    ],
    value: 'value',
    option: 'label',
    form_control: null
  };

  groupSelectConfig: ISelect = {
    placeholder: 'Selecciona un grupo',
    data: [],
    value: 'id',
    option: 'name',
    form_control: null,
    loading: true
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialog_ref: MatDialogRef<PropertyEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { property: Property | null },
    private propertyService: PropertyService,
    private customerGroupFetch: CustomerGroupFetchService,
    private interceptor_service: InterceptorService,
    private router: Router
  ) {
    this.form = this.fb.group({
      code: [{ value: '', disabled: true }], // Auto-generado, solo lectura
      block: ['', [Validators.required]],
      lot_number: ['', [Validators.required]],
      cadastral_key: ['', [Validators.maxLength(100)]],
      name: ['', [Validators.required]],
      description: [''],
      location: [''],
      group_id: ['', [Validators.required]],
      total_area: ['', [Validators.required, Validators.min(0)]],
      measurement_unit_id: ['', [Validators.required]],
      total_price: ['', [Validators.required, Validators.min(0)]],
      currency: ['MXN'],
      status: ['disponible']
    });

    // Update select configs with form controls
    this.statusSelectConfig.form_control = this.form.get('status');
    this.measurementUnitSelectConfig.form_control = this.form.get('measurement_unit_id');
    this.currencySelectConfig.form_control = this.form.get('currency');
    this.groupSelectConfig.form_control = this.form.get('group_id');

    // Suscribirse a cambios en manzana y número de lote para generar código automáticamente
    this.form.get('block')?.valueChanges.subscribe(() => {
      this.generateCode();
    });

    this.form.get('lot_number')?.valueChanges.subscribe(() => {
      this.generateCode();
    });
  }

  ngOnInit() {
    this.loadMeasurementUnits();
    this.loadCustomerGroups();
    this.loadPropertyForForm();
  }

  /** Editar: GET /properties/:id y pintar todos los campos, incluido cadastral_key. */
  private loadPropertyForForm() {
    const id = this.data?.property?.id;
    if (!id) {
      return;
    }

    this.loadingProperty.set(true);
    this.propertyService.getProperty(id).subscribe({
      next: (property) => {
        this.loadedProperty.set(property);
        this.patchProperty(property);
        this.loadingProperty.set(false);
      },
      error: () => {
        this.patchProperty(this.data.property!);
        this.loadingProperty.set(false);
      }
    });
  }

  private patchProperty(property: Property) {
    this.form.patchValue({
      code: property.code,
      block: property.block || '',
      lot_number: property.lot_number || '',
      cadastral_key: property.cadastral_key ?? '',
      name: property.name,
      description: property.description || '',
      location: property.location || '',
      group_id: property.group_id,
      total_area: property.total_area,
      measurement_unit_id: property.measurement_unit_id,
      total_price: property.total_price,
      currency: property.currency,
      status: property.status
    });
  }

  private buildPayload() {
    const raw = this.form.getRawValue();
    return {
      ...raw,
      cadastral_key: normalizeCadastralKey(raw.cadastral_key)
    };
  }

  generateCode(): void {
    const block = this.form.get('block')?.value;
    const lotNumber = this.form.get('lot_number')?.value;
    
    if (block && lotNumber) {
      const code = `LOT-${block}-${lotNumber.toString().padStart(2, '0')}`;
      this.form.get('code')?.setValue(code);
    } else {
      this.form.get('code')?.setValue('');
    }
  }

  loadCustomerGroups() {
    this.loadingGroups.set(true);

    this.customerGroupFetch.fetchGroups().subscribe({
      next: (groups) => {
        this.propertyGroups.set(groups);
        this.groupSelectConfig = {
          ...this.groupSelectConfig,
          data: groups,
          loading: false
        };
        this.loadingGroups.set(false);
      },
      error: () => {
        this.propertyGroups.set([]);
        this.groupSelectConfig = {
          ...this.groupSelectConfig,
          data: [],
          loading: false
        };
        this.loadingGroups.set(false);
        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos cargar los grupos de cliente.'
        });
      }
    });
  }

  loadMeasurementUnits() {
    this.loadingUnits.set(true);
    
    this.propertyService.getMeasurementUnits().subscribe({
      next: (units) => {
        this.measurementUnits.set(units);
        const mappedUnits = units.map(unit => ({
          id: unit.id,
          name: unit.name,
          symbol: unit.symbol,
          displayName: `${unit.name} (${unit.symbol})`
        }));
        
        // Update the config data and loading state together
        this.measurementUnitSelectConfig = {
          ...this.measurementUnitSelectConfig,
          data: mappedUnits,
          loading: false
        };
        this.loadingUnits.set(false);
      },
      error: () => {
        this.measurementUnitSelectConfig = {
          ...this.measurementUnitSelectConfig,
          loading: false
        };
        this.loadingUnits.set(false);
        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos cargar las unidades de medida.'
        });
      }
    });
  }

  closeDialog() {
    if (!this.loading()) {
      this.dialog_ref.close(this.update());
    }
  }

  private resolveApiErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse && error.error?.message != null) {
      const msg = error.error.message;
      return Array.isArray(msg) ? msg.join(', ') : String(msg);
    }
    return fallback;
  }

  getOwnerName(): string | null {
    const owner = (this.loadedProperty() ?? this.data?.property)?.contracts?.[0]?.customer;
    if (!owner) return null;
    
    return `${owner.name} ${owner.lastname}`;
  }

  navigateToCustomer(): void {
    const customerId = (this.loadedProperty() ?? this.data?.property)?.contracts?.[0]?.customer?.id;
    if (customerId) {
      this.dialog_ref.close();
      this.router.navigate(['/customers/detail', customerId]);
    }
  }

  submit() {
    if (this.data?.property?.id) {
      this.updateProperty();
    } else {
      this.createProperty();
    }
  }

  createProperty(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = this.buildPayload();

    this.propertyService.createProperty(payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Lote creado correctamente.'
        });

        this.closeDialog();
      },
      error: (err: unknown) => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: this.resolveApiErrorMessage(
            err,
            'No pudimos crear el lote. Por favor intenta de nuevo.'
          )
        });
      }
    });
  }

  updateProperty(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload = this.buildPayload();

    this.propertyService.updateProperty(this.data.property!.id, payload).subscribe({
      next: (saved) => {
        this.form.patchValue({ cadastral_key: saved.cadastral_key ?? '' });
        this.loadedProperty.set(saved);
        this.update.set(true);
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Lote actualizado correctamente.'
        });

        this.closeDialog();
      },
      error: (err: unknown) => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: this.resolveApiErrorMessage(
            err,
            'No pudimos actualizar el lote. Por favor intenta de nuevo.'
          )
        });
      }
    });
  }
}
