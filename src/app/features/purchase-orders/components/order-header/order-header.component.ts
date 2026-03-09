import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrder, OrderStatus } from '../../models/purchase-order.model';

/**
 * Order header component
 * Displays order information and action buttons
 */
@Component({
  selector: 'app-order-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent {
  @Input() order!: PurchaseOrder;
  @Input() canEdit: boolean = false;
  @Input() canDelete: boolean = false;
  @Input() canChangeStatus: boolean = false;

  @Output() edit = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  /**
   * Get status badge class
   */
  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case 'En Proceso':
        return 'status-badge status-badge--en-proceso';
      case 'Recibida':
        return 'status-badge status-badge--recibida';
      case 'Cancelada':
        return 'status-badge status-badge--cancelada';
      default:
        return 'status-badge';
    }
  }

  /**
   * Check if edit button should be shown
   */
  shouldShowEditButton(): boolean {
    return this.canEdit;
  }

  /**
   * Check if change status button should be shown
   */
  shouldShowChangeStatusButton(): boolean {
    return this.canChangeStatus && this.order.status === 'En Proceso';
  }

  /**
   * Check if cancel button should be shown
   */
  shouldShowCancelButton(): boolean {
    return this.order.status === 'En Proceso';
  }

  /**
   * Check if delete button should be shown
   */
  shouldShowDeleteButton(): boolean {
    return this.canDelete;
  }

  /**
   * Handle edit button click
   */
  onEdit(): void {
    this.edit.emit();
  }

  /**
   * Handle change status button click
   */
  onChangeStatus(): void {
    this.changeStatus.emit();
  }

  /**
   * Handle cancel button click
   */
  onCancel(): void {
    this.cancel.emit();
  }

  /**
   * Handle delete button click
   */
  onDelete(): void {
    this.delete.emit();
  }
}
