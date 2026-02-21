import { Component, Inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputComponent } from '../../../../core/components/input/input.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { LucideAngularModule, X } from 'lucide-angular';
import { PropertyService } from '../../services/property.service';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { Property, MeasurementUnit, PropertyStatus } from '../../models/property.model';

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
  update = signal(false);
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
    placeholder: 'Selecciona un proyecto',
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
    private interceptor_service: InterceptorService,
    private router: Router
  ) {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      block: [''],
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

    if (this.data?.property) {
      this.form.patchValue({
        code: this.data.property.code,
        block: this.data.property.block || '',
        name: this.data.property.name,
        description: this.data.property.description || '',
        location: this.data.property.location || '',
        group_id: this.data.property.group_id,
        total_area: this.data.property.total_area,
        measurement_unit_id: this.data.property.measurement_unit_id,
        total_price: this.data.property.total_price,
        currency: this.data.property.currency,
        status: this.data.property.status
      });
    }
  }

  ngOnInit() {
    this.loadMeasurementUnits();
    this.loadPropertyGroups();
  }

  loadPropertyGroups() {
    this.loadingGroups.set(true);
    
    // Por ahora usamos el grupo hardcodeado que mencionaste
    // Más adelante puedes crear un endpoint para obtener todos los grupos
    const groups = [
      {
        id: '550e8400-e29b-41d4-a716-446655440100',
        name: 'Campestre Divino'
      }
    ];
    
    this.propertyGroups.set(groups);
    this.groupSelectConfig = {
      ...this.groupSelectConfig,
      data: groups,
      loading: false
    };
    this.loadingGroups.set(false);
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

  getOwnerName(): string | null {
    const owner = this.data?.property?.contracts?.[0]?.customer;
    if (!owner) return null;
    
    return `${owner.name} ${owner.lastname}`;
  }

  navigateToCustomer(): void {
    const customerId = this.data?.property?.contracts?.[0]?.customer?.id;
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

    const payload = {
      ...this.form.value
    };

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
      error: () => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos crear el lote. Por favor intenta de nuevo.'
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

    const payload = {
      ...this.form.value
    };

    this.propertyService.updateProperty(this.data.property!.id, payload).subscribe({
      next: () => {
        this.update.set(true);
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Lote actualizado correctamente.'
        });

        this.closeDialog();
      },
      error: () => {
        this.loading.set(false);

        this.interceptor_service.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos actualizar el lote. Por favor intenta de nuevo.'
        });
      }
    });
  }
}
