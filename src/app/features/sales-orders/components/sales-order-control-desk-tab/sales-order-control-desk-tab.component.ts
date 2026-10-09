import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SalesOrder } from '../../models/sales-order.model';
import { SalesOrderService } from '../../services/sales-order.service';
import { warehouseControlJobStatusLabel } from '../../../warehouse-control/models/warehouse-control.model';
import { AddToShippingDialogComponent } from '../../../warehouse-control/components/add-to-shipping-dialog/add-to-shipping-dialog.component';

@Component({
  selector: 'app-sales-order-control-desk-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-order-control-desk-tab.component.html',
  styleUrl: './sales-order-control-desk-tab.component.scss',
})
export class SalesOrderControlDeskTabComponent {
  @Input({ required: true }) order!: SalesOrder;
  @Output() changed = new EventEmitter<void>();

  private orders = inject(SalesOrderService);
  private dialog = inject(MatDialog);
  acting = signal(false);
  error = signal<string | null>(null);

  statusLabel(): string {
    return warehouseControlJobStatusLabel(this.order.control_desk?.status);
  }

  canSend(): boolean {
    if (this.order.sales_order_type === 'POS' || this.order.sale_scope === 'services') return false;
    if (this.order.requires_selection_assembly && this.order.control_desk?.job_id) return false;
    return this.order.general_status === 'Creada' || this.order.general_status === 'En Selección';
  }

  canRemove(): boolean {
    const desk = this.order.control_desk;
    if (!this.order.requires_selection_assembly || !desk?.job_id) return false;
    return !desk.status || desk.status === 'released';
  }

  canAddToShipping(): boolean {
    return this.order.general_status === 'Lista para entrega' || this.order.control_desk?.status === 'assembled';
  }

  send(enabled: boolean): void {
    if (this.acting()) return;
    this.acting.set(true);
    this.error.set(null);
    this.orders.setControlDesk(this.order.id, enabled).subscribe({
      next: () => {
        this.acting.set(false);
        this.changed.emit();
      },
      error: (err) => {
        this.acting.set(false);
        this.error.set(err?.error?.message || 'No se pudo actualizar Mesa de Control');
      },
    });
  }

  addToShipping(): void {
    this.dialog.open(AddToShippingDialogComponent, {
      width: '440px',
      maxWidth: '96vw',
      data: {
        salesOrderId: this.order.id,
        billingBranchId: this.order.billing_branch_id || this.order.billing_branch?.id,
      },
    });
  }
}
