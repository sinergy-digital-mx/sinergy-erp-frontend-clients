import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { Payment, PaymentStats } from '../../models/payment.model';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LucideAngularModule, Plus, RefreshCw, Edit, Trash2, Check, X } from 'lucide-angular';
import { MarkPaymentPaidModalComponent } from '../mark-payment-paid-modal/mark-payment-paid-modal.component';
import { EditPaymentModalComponent } from '../edit-payment-modal/edit-payment-modal.component';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';

@Component({
  selector: 'app-contract-payments',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    LucideAngularModule,
    LocalDatePipe
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

  readonly Plus = Plus;
  readonly RefreshCw = RefreshCw;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Check = Check;
  readonly X = X;

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

  markAsPaid(payment: Payment) {
    const dialogRef = this.dialog.open(MarkPaymentPaidModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPayments();
        this.loadStats();
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

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'pagado': 'bg-green-100 text-green-800',
      'vencido': 'bg-red-100 text-red-800',
      'cancelado': 'bg-gray-100 text-gray-800'
    };
    return `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusMap[status] || 'bg-gray-100 text-gray-800'}`;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'pendiente': 'Pendiente',
      'pagado': 'Pagado',
      'vencido': 'Vencido',
      'cancelado': 'Cancelado'
    };
    return labels[status] || status;
  }

  canEdit(payment: Payment): boolean {
    return payment.status === 'pendiente' || payment.status === 'vencido';
  }

  canDelete(payment: Payment): boolean {
    return payment.status !== 'pagado';
  }

  canCancel(payment: Payment): boolean {
    return payment.status === 'pendiente' || payment.status === 'vencido';
  }

  canMarkAsPaid(payment: Payment): boolean {
    return payment.status === 'pendiente' || payment.status === 'vencido';
  }
}
