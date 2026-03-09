import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItem } from '../../models/inventory-item.model';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent {
  @Input() items: InventoryItem[] = [];
  @Input() loading: boolean = false;
  @Output() itemClick = new EventEmitter<string>();
  @Output() loadMore = new EventEmitter<void>();

  formatCurrency(value: number | string | undefined): string {
    if (value === undefined || value === null) return '$0.00';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '$0.00';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(numValue);
  }

  formatNumber(value: number | undefined): string {
    if (value === undefined || value === null) return '0';
    return new Intl.NumberFormat('es-MX').format(value);
  }

  isLowStock(item: InventoryItem): boolean {
    // Consider low stock if available quantity is less than 10
    return item.quantity_available < 10;
  }

  onItemClick(id: string): void {
    this.itemClick.emit(id);
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    
    if (atBottom && !this.loading) {
      this.loadMore.emit();
    }
  }
}
