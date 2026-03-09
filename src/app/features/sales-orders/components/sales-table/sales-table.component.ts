import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesOrder } from '../../models/sales-order.model';

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent {
  @Input() orders: SalesOrder[] = [];
  @Input() loading: boolean = false;
  @Output() orderClick = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<{ id: string; status: string }>();
  @Output() deleteOrder = new EventEmitter<string>();

  statuses = [
    { value: 'draft', label: 'Borrador' },
    { value: 'confirmed', label: 'Confirmada' },
    { value: 'processing', label: 'En Proceso' },
    { value: 'completed', label: 'Completada' },
    { value: 'cancelled', label: 'Cancelada' }
  ];

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'draft': 'status-draft',
      'confirmed': 'status-confirmed',
      'processing': 'status-processing',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || '';
  }

  getStatusLabel(status: string): string {
    const statusObj = this.statuses.find(s => s.value === status);
    return statusObj?.label || status;
  }

  onStatusChange(order: SalesOrder, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value;
    
    if (newStatus !== order.status) {
      this.statusChange.emit({ id: order.id, status: newStatus });
    }
  }

  onDeleteClick(event: Event, id: string): void {
    event.stopPropagation();
    if (confirm('¿Estás seguro de eliminar esta orden de venta?')) {
      this.deleteOrder.emit(id);
    }
  }

  onRowClick(id: string): void {
    this.orderClick.emit(id);
  }

  /**
   * Format currency
   */
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }
}
