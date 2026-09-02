import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PROPERTY_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { PropertyEditModalComponent } from '../../../properties/components/property-edit-modal/property-edit-modal.component';
import { Property } from '../../../properties/models/property.model';
import { PropertyService } from '../../../properties/services/property.service';
import { formatPolluxMoney } from '../../../../core/utils/pollux-money.util';

@Component({
  selector: 'app-contract-lot-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-lot-section.component.html',
  styleUrl: './contract-lot-section.component.scss'
})
export class ContractLotSectionComponent implements OnChanges {
  @Input({ required: true }) propertyId!: string;
  @Output() updated = new EventEmitter<Property>();

  lot = signal<Property | null>(null);
  loading = signal(false);

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

  openEditor(): void {
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

  formatAreaValue(property: Property): string {
    const area = Number(property.total_area);
    if (!Number.isFinite(area)) {
      return '—';
    }
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(area);
  }

  formatAreaUnit(property: Property): string {
    return property.measurement_unit?.symbol || 'm²';
  }

  formatPrice(property: Property): string {
    return formatPolluxMoney(property.total_price, property.currency);
  }

  formatPricePerM2(property: Property): string {
    const value = Number(property.price_per_m2);
    if (!Number.isFinite(value)) {
      return '—';
    }
    return formatPolluxMoney(value, property.currency);
  }

  private loadLot(emitAfterLoad = false): void {
    this.loading.set(true);
    this.propertyService.getProperty(this.propertyId).subscribe({
      next: (property) => {
        this.lot.set(property);
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
}
