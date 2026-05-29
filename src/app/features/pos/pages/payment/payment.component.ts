import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from '../../../../core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { POSService } from '../../services/pos.service';
import { PaymentMethod } from '../../models/pos.model';
import { OpenShiftDialogComponent } from '../../components/open-shift-dialog/open-shift-dialog.component';
import { CloseShiftDialogComponent } from '../../components/close-shift-dialog/close-shift-dialog.component';
import { OpenShiftDialogResult } from '../../models/pos-session.model';
import { applyOpenShiftDialogResult } from '../../utils/pos-session.util';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  orders = signal<any[]>([]);
  filteredOrders = signal<any[]>([]);
  selectedOrder = signal<any | null>(null);
  activeCashShift = signal<any | null>(null);
  
  searchTerm = signal<string>('');
  loading = signal<boolean>(false);
  processing = signal<boolean>(false);
  checkingShift = signal<boolean>(false);

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
    private posService: POSService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Check if orderId is provided in query params
    this.route.queryParams.subscribe(params => {
      const orderId = params['orderId'];
      if (orderId) {
        this.loadOrderById(orderId);
      } else {
        this.loadOrders();
      }
    });
    
    // Check for active cash shift
    this.checkActiveCashShift();
  }
  
  checkActiveCashShift(): void {
    // Get warehouse_id from first order or selected order
    const warehouseId = this.selectedOrder()?.warehouse_id || this.orders()[0]?.warehouse_id;
    
    if (!warehouseId) {
      // Will check again when orders are loaded
      return;
    }
    
    this.checkingShift.set(true);
    this.posService.getActiveCashShift(warehouseId).subscribe({
      next: (shift) => {
        this.activeCashShift.set(shift);
        this.checkingShift.set(false);
      },
      error: (error) => {
        console.log('No active cash shift found');
        this.activeCashShift.set(null);
        this.checkingShift.set(false);
      }
    });
  }
  
  openCashShift(): void {
    const dialogRef = this.dialog.open(OpenShiftDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((result: OpenShiftDialogResult | undefined) => {
      if (!result) {
        return;
      }

      this.checkingShift.set(true);
      applyOpenShiftDialogResult(result, this.posService).subscribe({
        next: (shift) => {
          this.activeCashShift.set(shift);
          this.checkingShift.set(false);
          this.toast.success(
            result.action === 'resume' ? 'Sesión POS reanudada' : 'Sesión POS iniciada'
          );
        },
        error: (error) => {
          this.checkingShift.set(false);
          this.toast.error(error.error?.message || 'Error al abrir turno de caja');
        },
      });
    });
  }
  
  closeCashShift(): void {
    const shift = this.activeCashShift();
    
    if (!shift) {
      this.toast.warning('No hay turno activo para cerrar');
      return;
    }

    const dialogRef = this.dialog.open(CloseShiftDialogComponent, {
      width: '650px',
      disableClose: true,
      data: { shift }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return; // User cancelled
      }

      const { closing_balance, notes } = result;

      this.checkingShift.set(true);
      this.posService.closeCashShift(shift.id, {
        closing_balance,
        notes
      }).subscribe({
        next: (closedShift) => {
          this.activeCashShift.set(null);
          localStorage.removeItem('pos_configuration_id');
          localStorage.removeItem('pos_configuration_code');
          this.checkingShift.set(false);
          
          const difference = closedShift.difference || 0;
          const diffText = difference === 0 
            ? 'Sin diferencia' 
            : difference > 0 
              ? `Sobrante: ${this.formatCurrency(difference)}`
              : `Faltante: ${this.formatCurrency(Math.abs(difference))}`;
          
          this.toast.success(`Turno cerrado. ${diffText}`);
        },
        error: (error) => {
          this.checkingShift.set(false);
          this.toast.error(error.error?.message || 'Error al cerrar turno de caja');
        }
      });
    });
  }

  loadOrders(): void {
    this.loading.set(true);

    this.posService.getOrders({ status: 'pending' }).subscribe({
      next: (response) => {
        const orders = Array.isArray(response) ? response : response.data || [];
        this.orders.set(orders);
        this.filteredOrders.set(orders);
        this.loading.set(false);
        
        // Check for active cash shift after loading orders
        if (orders.length > 0 && !this.activeCashShift()) {
          this.checkActiveCashShift();
        }
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.toast.error('Error al cargar órdenes');
        this.loading.set(false);
      }
    });
  }

  loadOrderById(orderId: string): void {
    this.loading.set(true);

    this.posService.getOrderById(orderId).subscribe({
      next: (order) => {
        this.selectedOrder.set(order);
        this.paymentAmount.set(order.total || 0);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.toast.error('Error al cargar la orden');
        this.loading.set(false);
        this.loadOrders(); // Fallback to loading all orders
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

  selectOrder(order: any): void {
    // Load full order details when selecting an order
    this.loadOrderById(order.id);
  }

  processPayment(): void {
    const order = this.selectedOrder();
    if (!order) {
      this.toast.warning('Selecciona una orden');
      return;
    }

    if (this.paymentAmount() <= 0) {
      this.toast.warning('Ingresa un monto válido');
      return;
    }
    
    // Check if cash shift is active
    if (!this.activeCashShift()) {
      const snackBarRef = this.snackBar.open('Debes abrir un turno de caja primero', 'Abrir Turno', { 
        duration: 5000
      });
      snackBarRef.onAction().subscribe(() => {
        this.openCashShift();
      });
      return;
    }

    this.processing.set(true);

    const paymentData = {
      payment_method: this.paymentMethod(),
      amount_paid: this.paymentAmount(),
      tip: 0
    };

    this.posService.processPayment(order.id, paymentData).subscribe({
      next: () => {
        this.toast.success('Pago procesado exitosamente');
        this.selectedOrder.set(null);
        this.paymentAmount.set(0);
        this.paymentReference.set('');
        this.loadOrders();
        this.processing.set(false);
      },
      error: (error) => {
        const errorMsg = error.error?.message || error.message || 'Error al procesar pago';
        
        // Check if error is about missing cash shift
        if (errorMsg.includes('cash shift') || errorMsg.includes('turno')) {
          this.activeCashShift.set(null);
          const snackBarRef = this.snackBar.open('No hay turno de caja activo. Abre un turno primero.', 'Abrir Turno', { 
            duration: 5000 
          });
          snackBarRef.onAction().subscribe(() => {
            this.openCashShift();
          });
        } else {
          this.toast.error(errorMsg);
        }
        
        this.processing.set(false);
      }
    });
  }

  calculateChange(): number {
    const order = this.selectedOrder();
    if (!order) return 0;
    const total = order.total || 0;
    return Math.max(0, this.paymentAmount() - total);
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
