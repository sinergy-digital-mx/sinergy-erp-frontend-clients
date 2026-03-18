import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaymentService } from '../../services/payment.service';
import { Payment, PaymentStats } from '../../models/payment.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LucideAngularModule, Plus, RefreshCw, Edit, Trash2, X, DollarSign, RotateCcw } from 'lucide-angular';
import { PartialPaymentModalComponent } from '../partial-payment-modal/partial-payment-modal.component';
import { EditPaymentModalComponent } from '../edit-payment-modal/edit-payment-modal.component';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';

@Component({
  selector: 'app-contract-payments',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    LucideAngularModule,
    LocalDatePipe,
    MatTooltipModule
  ],
  providers: [DatePipe],
  templateUrl: './contract-payments.component.html',
  styleUrls: ['./contract-payments.component.scss']
})
export class ContractPaymentsComponent implements OnInit {
  @Input() contractId!: string;
  @Input() currency: string = 'USD';

  payments = signal<Payment[]>([]);
  stats = signal<PaymentStats | null>(null);
  loading = signal(false);
  generating = signal(false);
  regenerating = signal(false);

  readonly Plus = Plus;
  readonly RefreshCw = RefreshCw;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly X = X;
  readonly DollarSign = DollarSign;
  readonly RotateCcw = RotateCcw;

  constructor(
    private paymentService: PaymentService,
    private interceptorService: InterceptorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadPayments();
    this.loadStats();
  }

  loadPayments() {
    this.loading.set(true);
    this.paymentService.getPayments(this.contractId).subscribe({
      next: (payments) => {
        this.payments.set(payments);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los pagos'
        });
      }
    });
  }

  loadStats() {
    this.paymentService.getPaymentStats(this.contractId).subscribe({
      next: (stats) => {
        console.log('Payment stats received:', stats);
        this.stats.set(stats);
      },
      error: () => {
        // Stats are optional, don't show error
      }
    });
  }

  generatePayments() {
    if (!confirm('¿Generar todos los pagos del contrato? Esta acción solo se puede realizar una vez.')) return;

    this.generating.set(true);
    this.paymentService.generatePayments(this.contractId).subscribe({
      next: () => {
        this.generating.set(false);
        this.loadPayments();
        this.loadStats();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pagos generados correctamente'
        });
      },
      error: (err) => {
        this.generating.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al generar pagos'
        });
      }
    });
  }

  regeneratePayments() {
    const confirmMessage = `⚠️ ADVERTENCIA: Regenerar Pagos

Esta acción:
• Eliminará TODOS los pagos existentes del contrato
• Creará nuevos pagos basados en la configuración actual del contrato
• Se perderán todos los registros de pagos realizados
• Esta acción NO se puede deshacer

¿Estás seguro de que deseas continuar?`;

    if (!confirm(confirmMessage)) return;

    // Segunda confirmación para mayor seguridad
    if (!confirm('¿Confirmas que deseas ELIMINAR todos los pagos existentes y regenerarlos? Esta acción es IRREVERSIBLE.')) return;

    this.regenerating.set(true);
    this.paymentService.regeneratePayments(this.contractId).subscribe({
      next: () => {
        this.regenerating.set(false);
        this.loadPayments();
        this.loadStats();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pagos regenerados correctamente'
        });
      },
      error: (err) => {
        this.regenerating.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al regenerar pagos'
        });
      }
    });
  }

  editPayment(payment: Payment) {
    const dialogRef = this.dialog.open(EditPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPayments();
        this.loadStats();
      }
    });
  }

  cancelPayment(payment: Payment) {
    if (!confirm(`¿Cancelar el pago #${payment.payment_number}?`)) return;

    this.paymentService.cancelPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago cancelado'
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo cancelar el pago'
        });
      }
    });
  }

  deletePayment(payment: Payment) {
    if (!confirm(`¿Eliminar permanentemente el pago #${payment.payment_number}? Esta acción no se puede deshacer.`)) return;

    this.paymentService.deletePayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago eliminado'
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo eliminar el pago'
        });
      }
    });
  }

  getStatusClass(status: string, isOverdue: boolean = false): string {
    let baseClass = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ';
    
    if (isOverdue && (status === 'pendiente' || status === 'parcial')) {
      return baseClass + 'bg-red-500 text-white shadow-sm';
    }
    
    const statusMap: Record<string, string> = {
      'pendiente': 'bg-amber-500 text-white shadow-sm',
      'pagado': 'bg-emerald-500 text-white shadow-sm',
      'parcial': 'bg-blue-500 text-white shadow-sm',
      'cancelado': 'bg-gray-500 text-white shadow-sm'
    };
    
    return baseClass + (statusMap[status] || 'bg-gray-500 text-white shadow-sm');
  }

  getStatusLabel(status: string, isOverdue: boolean = false): string {
    if (status === 'parcial' && isOverdue) {
      return 'Parcial Vencido';
    } else if (status === 'pendiente' && isOverdue) {
      return 'Pendiente Vencido';
    } else if (status === 'parcial') {
      return 'Parcial';
    } else if (status === 'pendiente') {
      return 'Pendiente';
    } else if (status === 'pagado') {
      return 'Pagado';
    } else if (status === 'cancelado') {
      return 'Cancelado';
    } else {
      return status;
    }
  }

  canEdit(payment: Payment): boolean {
    return payment.status === 'pendiente' || payment.status === 'pagado' || payment.status === 'parcial';
  }

  canDelete(payment: Payment): boolean {
    return payment.status !== 'pagado';
  }

  canCancel(payment: Payment): boolean {
    return payment.status === 'pendiente';
  }

  canRegisterPayment(payment: Payment): boolean {
    return payment.status === 'pendiente' || payment.status === 'parcial';
  }

  canResetPayment(payment: Payment): boolean {
    return payment.status === 'pagado' || payment.status === 'parcial';
  }

  resetPayment(payment: Payment) {
    if (!confirm(`¿Resetear el pago #${payment.payment_number}? Esto volverá el pago a estado pendiente y eliminará toda la información de pago.`)) return;

    this.paymentService.resetPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago reseteado correctamente'
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo resetear el pago'
        });
      }
    });
  }

  registerPayment(payment: Payment) {
    const dialogRef = this.dialog.open(PartialPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPayments();
        this.loadStats();
      }
    });
  }
}
