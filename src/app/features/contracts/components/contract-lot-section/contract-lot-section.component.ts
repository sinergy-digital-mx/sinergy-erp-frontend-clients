import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, MapPin, Pencil } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InputComponent } from '../../../../core/components/input/input.component';
import { PROPERTY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { PropertyEditModalComponent } from '../../../properties/components/property-edit-modal/property-edit-modal.component';
import {
  Property,
  displayCadastralKey,
  normalizeCadastralKey
} from '../../../properties/models/property.model';
import { PropertyService } from '../../../properties/services/property.service';

@Component({
  selector: 'app-contract-lot-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    LucideAngularModule
  ],
  templateUrl: './contract-lot-section.component.html',
  styleUrl: './contract-lot-section.component.scss'
})
export class ContractLotSectionComponent implements OnChanges {
  @Input({ required: true }) propertyId!: string;
  @Output() updated = new EventEmitter<Property>();

  readonly MapPin = MapPin;
  readonly Pencil = Pencil;
  readonly displayCadastralKey = displayCadastralKey;

  lot = signal<Property | null>(null);
  loading = signal(false);
  saving = signal(false);
  editingCadastralKey = signal(false);

  cadastralKeyControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.maxLength(100)]
  });

  constructor(
    private propertyService: PropertyService,
    private dialog: MatDialog,
    private interceptorService: InterceptorService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propertyId'] && this.propertyId) {
      this.loadLot();
    }
  }

  hasCadastralKey(): boolean {
    return !!this.lot()?.cadastral_key?.trim();
  }

  showCadastralEditor(): boolean {
    return this.editingCadastralKey() || !this.hasCadastralKey();
  }

  startEditCadastralKey(): void {
    this.cadastralKeyControl.setValue(this.lot()?.cadastral_key ?? '');
    this.editingCadastralKey.set(true);
  }

  cancelEditCadastralKey(): void {
    this.cadastralKeyControl.setValue(this.lot()?.cadastral_key ?? '');
    this.editingCadastralKey.set(false);
  }

  saveCadastralKey(): void {
    const lot = this.lot();
    if (!lot || this.cadastralKeyControl.invalid) {
      this.cadastralKeyControl.markAsTouched();
      return;
    }

    this.saving.set(true);
    this.propertyService.updateProperty(lot.id, this.buildUpdatePayload(lot)).subscribe({
      next: (saved) => {
        this.applyProperty(saved);
        this.editingCadastralKey.set(false);
        this.saving.set(false);
        this.updated.emit(saved);
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Clave catastral guardada.'
        });
      },
      error: (error) => {
        this.saving.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: error.error?.message || 'No se pudo guardar la clave catastral.'
        });
      }
    });
  }

  openFullEditor(): void {
    const lot = this.lot();
    if (!lot) {
      return;
    }

    this.dialog.open(PropertyEditModalComponent, {
      ...PROPERTY_FORM_DIALOG_CONFIG,
      data: { property: lot }
    }).afterClosed().subscribe((changed) => {
      if (changed) {
        this.loadLot(true);
      }
    });
  }

  formatArea(property: Property): string {
    const unit = property.measurement_unit?.symbol || 'm²';
    const area = property.total_area ?? '—';
    return `${area} ${unit}`;
  }

  formatPrice(property: Property): string {
    const value = Number(property.total_price ?? 0);
    const currency = property.currency || 'MXN';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number.isFinite(value) ? value : 0);
  }

  private loadLot(emitAfterLoad = false): void {
    this.loading.set(true);
    this.propertyService.getProperty(this.propertyId).subscribe({
      next: (property) => {
        this.applyProperty(property);
        this.loading.set(false);
        if (emitAfterLoad) {
          this.updated.emit(property);
        }
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudo cargar el lote del contrato.'
        });
      }
    });
  }

  private applyProperty(property: Property): void {
    this.lot.set(property);
    this.cadastralKeyControl.setValue(property.cadastral_key ?? '');
    this.editingCadastralKey.set(!property.cadastral_key?.trim());
  }

  private buildUpdatePayload(lot: Property) {
    return {
      code: lot.code,
      block: lot.block,
      lot_number: lot.lot_number,
      cadastral_key: normalizeCadastralKey(this.cadastralKeyControl.value),
      name: lot.name,
      description: lot.description,
      location: lot.location,
      group_id: lot.group_id,
      total_area: lot.total_area,
      measurement_unit_id: lot.measurement_unit_id,
      total_price: lot.total_price,
      currency: lot.currency,
      status: lot.status
    };
  }
}
