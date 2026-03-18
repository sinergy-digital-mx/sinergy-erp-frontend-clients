import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { PropertyStatus } from '../../models/property.model';

export interface StatusOption {
  value: PropertyStatus;
  label: string;
}

@Component({
  selector: 'app-property-status-dropdown',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  template: `
    <app-select
      [config]="selectConfig()"
      (changeOption)="onStatusChange($event)">
    </app-select>
  `,
  styles: []
})
export class PropertyStatusDropdownComponent {
  @Input() selectedStatus: PropertyStatus | null = null;
  @Output() statusSelect = new EventEmitter<{ status: PropertyStatus | null }>();

  private statusOptions: StatusOption[] = [
    { value: 'disponible', label: 'Disponible' },
    { value: 'vendido', label: 'Vendido' },
    { value: 'reservado', label: 'Reservado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  selectConfig(): ISelect {
    return {
      placeholder: 'Filtrar por estado',
      data: this.statusOptions,
      value: 'value',
      option: 'label',
      form_control: null,
      loading: false,
      all: true,
      all_message: 'Todos los estados',
      value_default: this.selectedStatus
    };
  }

  onStatusChange(event: any) {
    const status = event?.value || null;
    this.statusSelect.emit({ status });
  }
}