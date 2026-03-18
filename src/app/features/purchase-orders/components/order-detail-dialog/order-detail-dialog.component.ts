import { Component, Inject, signal, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { PaymentsListComponent } from '../payments-list/payments-list.component';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    PaymentsListComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent {
  order = signal<PurchaseOrder | null>(null);
  loading = signal<boolean>(true);
  activeIndex = signal<number>(0);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    private purchaseOrderService: PurchaseOrderService,
    public taxCalculator: TaxCalculatorService
  ) {
    this.loadOrder();
  }

  loadOrder(): void {
    this.loading.set(true);
    this.purchaseOrderService.getOrderById(this.data.orderId).subscribe({
      next: (order) => {
        this.order.set(order);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.loading.set(false);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'En Proceso': 'status-en-proceso',
      'Recibida': 'status-recibida',
      'Cancelada': 'status-cancelada'
    };
    return statusMap[status] || 'status-en-proceso';
  }

  formatCurrency(value: number | string): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numValue) ? '$0.00' : this.taxCalculator.formatCurrency(numValue);
  }

  onTabChange(event: any): void {
    this.activeIndex.set(event.index);
  }
}
