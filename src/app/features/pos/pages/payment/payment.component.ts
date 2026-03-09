import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { SalesOrder } from '../../../sales-orders/models/sales-order.model';
import { POSOrderForPayment, PaymentMethod } from '../../models/pos.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  orders = signal<SalesOrder[]>([]);
  filteredOrders = signal<SalesOrder[]>([]);
  selectedOrder = signal<SalesOrder | null>(null);
  
  searchTerm = signal<string>('');
  loading = signal<boolean>(false);
  processing = signal<boolean>(false);

  // Payment
  paymentMethod = signal<PaymentMethod>('cash');
  paymentAmount = signal<number>(0);
  paymentReference = signal<string>('');

  paymentMethods: { value: PaymentMethod; label: string; icon: string }[] = [
    { value: 'cash', label: 'Efectivo', icon: '💵' },
    { value: 'card', label: 'Tarjeta', icon: '💳' },
    { value: 'transfer', label: 'Transferencia', icon: '🏦' }
  ];

  constructor(
    private salesOrderService: SalesOrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);

    this.salesOrderService.getOrders(
      { status: 'draft' },
      { page: 1, limit: 100 }
    ).subscribe({
      next: (response) => {
        const orders = Array.isArray(response) ? response : response.data || [];
        this.orders.set(orders);
        this.filteredOrders.set(orders);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.snackBar.open('Error al cargar órdenes', 'Cerrar', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  onSearchChange(): void {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      this.filteredOrders.set(this.orders());
      return;
    }

    const filtered = this.orders().filter(o => 
      o.id.toLowerCase().includes(term) ||
      o.customer?.name?.toLowerCase().includes(term)
    );
    this.filteredOrders.set(filtered);
  }

  selectOrder(order: SalesOrder): void {
    this.selectedOrder.set(order);
    this.paymentAmount.set(order.grand_total);
  }

  processPayment(): void {
    const order = this.selectedOrder();
    if (!order) {
      this.snackBar.open('Selecciona una orden', 'Cerrar', { duration: 3000 });
      return;
    }

    if (this.paymentAmount() <= 0) {
      this.snackBar.open('Ingresa un monto válido', 'Cerrar', { duration: 3000 });
      return;
    }

    this.processing.set(true);

    // Update order status to confirmed (this will create stock reservations)
    this.salesOrderService.updateOrder(order.id, { 
      status: 'confirmed',
      metadata: {
        ...order.metadata,
        payment: {
          method: this.paymentMethod(),
          amount: this.paymentAmount(),
          reference: this.paymentReference(),
          paid_at: new Date().toISOString()
        }
      }
    }).subscribe({
      next: () => {
        this.snackBar.open('Pago procesado exitosamente', 'Cerrar', { duration: 3000 });
        this.selectedOrder.set(null);
        this.paymentAmount.set(0);
        this.paymentReference.set('');
        this.loadOrders();
        this.processing.set(false);
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Error al procesar pago', 'Cerrar', { duration: 5000 });
        this.processing.set(false);
      }
    });
  }

  calculateChange(): number {
    const order = this.selectedOrder();
    if (!order) return 0;
    return Math.max(0, this.paymentAmount() - order.grand_total);
  }

  cancel(): void {
    if (this.selectedOrder()) {
      this.selectedOrder.set(null);
      this.paymentAmount.set(0);
      this.paymentReference.set('');
    } else {
      this.router.navigate(['/pos']);
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  }
}
