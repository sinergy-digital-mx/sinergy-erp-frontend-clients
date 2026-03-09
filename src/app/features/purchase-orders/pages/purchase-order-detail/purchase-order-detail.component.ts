import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { TaxCalculatorService } from '../../services/tax-calculator.service';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { OrderHeaderComponent } from '../../components/order-header/order-header.component';
import { LineItemsTableComponent } from '../../components/line-items-table/line-items-table.component';
import { PaymentsListComponent } from '../../components/payments-list/payments-list.component';
import { PaymentDialogComponent, PaymentFormData } from '../../components/payment-dialog/payment-dialog.component';
import { CancelDialogComponent } from '../../components/cancel-dialog/cancel-dialog.component';

@Component({
  selector: 'app-purchase-order-detail',
  standalone: true,
  imports: [CommonModule, OrderHeaderComponent, LineItemsTableComponent, PaymentsListComponent],
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.scss']
})
export class PurchaseOrderDetailComponent implements OnInit {
  // State signals
  private orderData = signal<PurchaseOrder | null>(null);
  private loadingState = signal<boolean>(false);
  private errorState = signal<string | null>(null);
  
  // Public readonly signals
  order = this.orderData.asReadonly();
  loading = this.loadingState.asReadonly();
  error = this.errorState.asReadonly();
  
  // Computed: permission flags (simplified - would check actual permissions)
  canEdit = computed(() => {
    const order = this.orderData();
    return order?.status === 'En Proceso';
  });
  
  canDelete = computed(() => {
    const order = this.orderData();
    if (!order) return false;
    
    // Can only delete if:
    // 1. Order has no payments
    // 2. Order is not in "Recibida" status
    const hasNoPayments = !order.payments || order.payments.length === 0;
    const isNotReceived = order.status !== 'Recibida';
    
    return hasNoPayments && isNotReceived;
  });
  
  canChangeStatus = computed(() => {
    const order = this.orderData();
    return order?.status === 'En Proceso';
  });
  
  canAddPayment = computed(() => {
    const order = this.orderData();
    return order && order.remaining_amount > 0 && order.status !== 'Cancelada';
  });
  
  canCancel = computed(() => {
    const order = this.orderData();
    return order?.status === 'En Proceso';
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private taxCalculator: TaxCalculatorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrder(id);
    }
  }

  /**
   * Load order from API
   */
  loadOrder(id: string): void {
    this.loadingState.set(true);
    this.errorState.set(null);
    
    this.purchaseOrderService.getOrderById(id).subscribe({
      next: (order) => {
        this.orderData.set(order);
        this.loadingState.set(false);
      },
      error: (error) => {
        this.errorState.set(error.message);
        this.loadingState.set(false);
      }
    });
  }

  /**
   * Navigate to edit page
   */
  editOrder(): void {
    const order = this.orderData();
    if (order) {
      this.router.navigate(['/purchase-orders', order.id, 'edit']);
    }
  }

  /**
   * Change order status with validation and confirmation
   */
  changeStatus(): void {
    const order = this.orderData();
    if (!order) return;
    
    // Validate order is in "En Proceso" status
    if (order.status !== 'En Proceso') {
      alert('Solo se puede cambiar el estado de órdenes en proceso');
      return;
    }
    
    // Confirm status change to "Recibida"
    if (confirm('¿Cambiar estado a "Recibida"? Esta acción no se puede deshacer.')) {
      this.purchaseOrderService.changeStatus(order.id, 'Recibida').subscribe({
        next: (updatedOrder) => {
          this.orderData.set(updatedOrder);
          alert('Estado actualizado exitosamente');
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
        }
      });
    }
  }

  /**
   * Cancel order using dialog with validation
   */
  cancelOrder(): void {
    const order = this.orderData();
    if (!order) return;
    
    // Validate order is in "En Proceso" status
    if (order.status !== 'En Proceso') {
      alert('Solo se pueden cancelar órdenes en proceso');
      return;
    }
    
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((cancellationReason: string | null) => {
      if (cancellationReason && order) {
        this.purchaseOrderService.cancelOrder(order.id, { reason: cancellationReason }).subscribe({
          next: (updatedOrder) => {
            this.orderData.set(updatedOrder);
            alert('Orden cancelada exitosamente');
          },
          error: (error) => {
            alert(`Error: ${error.message}`);
          }
        });
      }
    });
  }

  /**
   * Delete order with validation
   */
  deleteOrder(): void {
    const order = this.orderData();
    if (!order) return;
    
    // Validate order has no payments registered
    if (order.payments && order.payments.length > 0) {
      alert('No se puede eliminar una orden con pagos registrados');
      return;
    }
    
    // Validate order is not in "Recibida" status
    if (order.status === 'Recibida') {
      alert('No se puede eliminar una orden recibida');
      return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar esta orden? Esta acción no se puede deshacer.')) {
      this.purchaseOrderService.deleteOrder(order.id).subscribe({
        next: () => {
          alert('Orden eliminada exitosamente');
          this.router.navigate(['/purchase-orders']);
        },
        error: (error) => {
          alert(`Error: ${error.message}`);
        }
      });
    }
  }

  /**
   * Register payment using dialog
   */
  registerPayment(): void {
    const order = this.orderData();
    if (!order) return;
    
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '500px',
      data: {
        remainingAmount: order.remaining_amount
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((paymentData: PaymentFormData | null) => {
      if (paymentData && order) {
        this.purchaseOrderService.registerPayment(order.id, paymentData).subscribe({
          next: () => {
            alert('Pago registrado exitosamente');
            this.loadOrder(order.id);
          },
          error: (error) => {
            alert(`Error: ${error.message}`);
          }
        });
      }
    });
  }

  /**
   * Go back to list
   */
  goBack(): void {
    this.router.navigate(['/purchase-orders']);
  }

  /**
   * Format currency
   */
  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }
}
