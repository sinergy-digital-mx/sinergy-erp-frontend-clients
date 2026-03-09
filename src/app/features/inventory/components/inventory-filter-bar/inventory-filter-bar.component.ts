import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryFilters } from '../../models/inventory-item.model';

@Component({
  selector: 'app-inventory-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-filter-bar.component.html',
  styleUrls: ['./inventory-filter-bar.component.scss']
})
export class InventoryFilterBarComponent {
  @Input() warehouses: any[] = [];
  @Output() filtersChange = new EventEmitter<InventoryFilters>();

  search = signal<string>('');
  warehouseId = signal<string>('');
  lowStock = signal<boolean>(false);

  applyFilters(): void {
    const filters: InventoryFilters = {
      search: this.search() || undefined,
      warehouse_id: this.warehouseId() || undefined,
      low_stock: this.lowStock() || undefined
    };
    this.filtersChange.emit(filters);
  }

  clearFilters(): void {
    this.search.set('');
    this.warehouseId.set('');
    this.lowStock.set(false);
    this.applyFilters();
  }
}
