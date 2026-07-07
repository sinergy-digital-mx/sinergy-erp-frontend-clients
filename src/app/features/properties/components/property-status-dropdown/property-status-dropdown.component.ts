import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { SelectComponent } from '../../../../core/components/select/select.component';
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
      [config]="selectConfig"
      (changeOption)="onStatusChange($event)">
    </app-select>
  `,
  styles: [],
})
export class PropertyStatusDropdownComponent implements OnChanges {
  @Input() selectedStatus: PropertyStatus | null = null;
  @Output() statusSelect = new EventEmitter<{ status: PropertyStatus | null }>();

  private readonly statusControl = new FormControl<PropertyStatus | null>(null);

  private readonly statusOptions: StatusOption[] = [
    { value: 'disponible', label: 'Disponible' },
    { value: 'vendido', label: 'Vendido' },
    { value: 'reservado', label: 'Reservado' },
    { value: 'cancelado', label: 'Cancelado' },
  ];

  selectConfig = {
    placeholder: 'Estado',
    data: this.statusOptions,
    value: 'value',
    option: 'label',
    form_control: this.statusControl,
    loading: false,
    all: true,
    all_message: 'Todos los estados',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedStatus']) {
      this.statusControl.setValue(this.selectedStatus, { emitEvent: false });
    }
  }

  onStatusChange(event: { value?: PropertyStatus | null }): void {
    this.statusSelect.emit({ status: event?.value || null });
  }
}
