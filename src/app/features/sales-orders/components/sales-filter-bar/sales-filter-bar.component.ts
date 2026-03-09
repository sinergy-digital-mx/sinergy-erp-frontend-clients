import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesOrderFilters, SalesOrderStatus } from '../../models/sales-order.model';

@Component({
  selector: 'app-sales-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-filter-bar.component.html',
  styleUrls: ['./sales-filter-bar.component.scss']
})
export class SalesFilterBarComponent {
  @Output() filtersChange = new EventEmitter<SalesOrderFilters>();

  search = signal<string>('');
  status = signal<string>('');

  statuses: { value: string; label: string }[] = [
    { value: '', label: 'Todos los estados' },
    { value: 'draft', label: 'Borrador' },
    { value: 'confirmed', label: 'Confirmada' },
    { value: 'processing', label: 'En Proceso' },
    { value: 'completed', label: 'Completada' },
    { value: 'cancelled', label: 'Cancelada' }
  ];

  applyFilters(): void {
    const filters: SalesOrderFilters = {
      search: this.search() || undefined,
      status: (this.status() as SalesOrderStatus) || undefined
    };
    this.filtersChange.emit(filters);
  }

  clearFilters(): void {
    this.search.set('');
    this.status.set('');
    this.applyFilters();
  }
}
