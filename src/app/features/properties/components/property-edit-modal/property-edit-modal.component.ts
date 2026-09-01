import { Component, Inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { PropertyService } from '../../services/property.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import {
  Property,
  MeasurementUnit,
  CreatePropertyDto,
  UpdatePropertyDto,
  normalizeCadastralKey,
  parseOptionalNumber,
} from '../../models/property.model';
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
  /** Evita bucles al prellenar total desde precio/m². */
  private syncingPrice = false;
  /** Si el usuario escribió solo el total, no mandar price_per_m2. */
  private omitPricePerM2 = false;

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
    const isEdit = !!this.data?.property?.id;
    this.form = this.fb.group(
      {
        code: [{ value: '', disabled: true }], // Auto-generado, solo lectura
        block: ['', [Validators.required]],
        lot_number: ['', [Validators.required]],
        cadastral_key: ['', [Validators.maxLength(100)]],
        name: ['', [Validators.required]],
        description: [''],
        location: [''],
        group_id: ['', [Validators.required]],
        total_area: ['', isEdit ? [Validators.min(0)] : [Validators.required, Validators.min(0)]],
        measurement_unit_id: ['', [Validators.required]],
        price_per_m2: ['', [Validators.min(0)]],
        total_price: ['', [Validators.min(0)]],
        currency: ['MXN'],
        status: ['disponible']
      },
      { validators: isEdit ? null : lotCreatePriceValidator }
    );

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

    this.form.get('total_area')?.valueChanges.subscribe(() => {
      if (!this.syncingPrice) {
        this.prefillTotalFromPricePerM2();
      }
    });

    this.form.get('price_per_m2')?.valueChanges.subscribe(() => {
      if (!this.syncingPrice) {
        this.omitPricePerM2 = parseOptionalNumber(this.form.get('price_per_m2')?.value) == null;
        this.prefillTotalFromPricePerM2();
      }
    });

    this.form.get('total_price')?.valueChanges.subscribe(() => {
      if (this.syncingPrice) {
        return;
      }
      this.omitPricePerM2 = true;
      this.syncingPrice = true;
      this.form.get('price_per_m2')?.setValue('', { emitEvent: false });
      this.syncingPrice = false;
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
    this.syncingPrice = true;
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
      price_per_m2: property.price_per_m2 ?? '',
      total_price: property.total_price,
      currency: property.currency,
      status: property.status
    });
    this.syncingPrice = false;
    this.omitPricePerM2 = parseOptionalNumber(property.price_per_m2) == null;
  }

  private prefillTotalFromPricePerM2(): void {
    const area = parseOptionalNumber(this.form.get('total_area')?.value);
    const perM2 = parseOptionalNumber(this.form.get('price_per_m2')?.value);
    if (area == null || perM2 == null) {
      return;
    }
    const total = Math.round((area * perM2 + Number.EPSILON) * 100) / 100;
    this.syncingPrice = true;
    this.form.get('total_price')?.setValue(total);
    this.syncingPrice = false;
    this.omitPricePerM2 = false;
  }

  private buildPayload() {
    const raw = this.form.getRawValue();
    const totalArea = parseOptionalNumber(raw.total_area);
    const totalPrice = parseOptionalNumber(raw.total_price);
    const pricePerM2 = parseOptionalNumber(raw.price_per_m2);

    const payload: Record<string, unknown> = {
      ...raw,
      cadastral_key: normalizeCadastralKey(raw.cadastral_key)
    };

    if (totalArea != null) {
      payload['total_area'] = totalArea;
    } else {
      delete payload['total_area'];
    }

    if (totalPrice != null) {
      payload['total_price'] = totalPrice;
    } else {
      delete payload['total_price'];
    }

    if (pricePerM2 != null && !this.omitPricePerM2) {
      payload['price_per_m2'] = pricePerM2;
    } else {
      delete payload['price_per_m2'];
    }

    return payload;
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

    this.propertyService.createProperty(payload as unknown as CreatePropertyDto).subscribe({
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

    this.propertyService.updateProperty(this.data.property!.id, payload as unknown as UpdatePropertyDto).subscribe({
      next: (saved) => {
        this.syncingPrice = true;
        this.form.patchValue({
          cadastral_key: saved.cadastral_key ?? '',
          total_price: saved.total_price,
          price_per_m2: saved.price_per_m2 ?? '',
        });
        this.syncingPrice = false;
        this.omitPricePerM2 = parseOptionalNumber(saved.price_per_m2) == null;
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

  get showPriceRequiredError(): boolean {
    return this.form.hasError('priceRequired') &&
      !!(this.form.get('total_price')?.touched || this.form.get('price_per_m2')?.touched);
  }
}

/** Alta: hace falta total_price o price_per_m2. */
function lotCreatePriceValidator(group: AbstractControl): ValidationErrors | null {
  const total = parseOptionalNumber(group.get('total_price')?.value);
  const perM2 = parseOptionalNumber(group.get('price_per_m2')?.value);
  if (total == null && perM2 == null) {
    return { priceRequired: true };
  }
  return null;
}
