import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LucideAngularModule, DollarSign, Edit, RotateCcw, Trash2 } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { DownPaymentPayment, DownPaymentStats } from '../../models/downpayment-payment.model';
import { DownpaymentPaymentService } from '../../services/downpayment-payment.service';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';
import { PartialDownpaymentModalComponent } from '../partial-downpayment-modal/partial-downpayment-modal.component';
import { EditDownpaymentPaymentModalComponent } from '../edit-downpayment-payment-modal/edit-downpayment-payment-modal.component';

@Component({
  selector: 'app-contract-downpayment-payments',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LocalDatePipe, MatTooltipModule, LucideAngularModule],
  templateUrl: './contract-downpayment-payments.component.html',
  styleUrl: './contract-downpayment-payments.component.scss'
})
export class ContractDownpaymentPaymentsComponent implements OnInit {
  @Input() contractId!: string;
  @Input() currency = 'USD';
  @Input() contract: any;
  @Output() dataChanged = new EventEmitter<void>();

  payments = signal<DownPaymentPayment[]>([]);
  stats = signal<DownPaymentStats | null>(null);
  loading = signal(false);
  generating = signal(false);
  currentPage = signal(1);
  readonly pageSize = 20;
  readonly Math = Math;
  readonly DollarSign = DollarSign;
  readonly Edit = Edit;
  readonly RotateCcw = RotateCcw;
  readonly Trash2 = Trash2;

  constructor(
    private downpaymentService: DownpaymentPaymentService,
    private interceptorService: InterceptorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPayments();
    this.loadStats();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.payments().length / this.pageSize));
  }

  get paginatedPayments(): DownPaymentPayment[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.payments().slice(start, start + this.pageSize);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage.set(page);
  }

  loadPayments(): void {
    this.loading.set(true);
    this.downpaymentService.getPayments(this.contractId).subscribe({
      next: (payments) => {
        this.payments.set(payments);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No se pudieron cargar los pagos de enganche'
        });
      }
    });
  }

  loadStats(): void {
    this.downpaymentService.getStats(this.contractId).subscribe({
      next: (stats) => this.stats.set(stats),
      error: () => {}
    });
  }

  generatePayments(): void {
    this.generating.set(true);
    this.downpaymentService.generate(this.contractId).subscribe({
      next: () => {
        this.generating.set(false);
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pagos de enganche generados correctamente'
        });
      },
      error: (err) => {
        this.generating.set(false);
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudieron generar los pagos de enganche'
        });
      }
    });
  }

  registerPayment(payment: DownPaymentPayment): void {
    const dialogRef = this.dialog.open(PartialDownpaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }

  editPayment(payment: DownPaymentPayment): void {
    const dialogRef = this.dialog.open(EditDownpaymentPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }

  cancelPayment(payment: DownPaymentPayment): void {
    if (!confirm(`¿Cancelar el pago de enganche #${payment.payment_number}?`)) return;
    this.downpaymentService.cancelPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo cancelar el pago de enganche'
        });
      }
    });
  }

  resetPayment(payment: DownPaymentPayment): void {
    if (!confirm(`¿Resetear el pago de enganche #${payment.payment_number}?`)) return;
    this.downpaymentService.resetPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo resetear el pago de enganche'
        });
      }
    });
  }

  deletePayment(payment: DownPaymentPayment): void {
    if (!confirm(`¿Eliminar permanentemente el pago de enganche #${payment.payment_number}?`)) return;
    this.downpaymentService.deletePayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo eliminar el pago de enganche'
        });
      }
    });
  }

  canRegisterPayment(payment: DownPaymentPayment): boolean {
    return payment.status === 'pendiente' || payment.status === 'parcial';
  }

  canResetPayment(payment: DownPaymentPayment): boolean {
    return payment.status === 'pagado' || payment.status === 'parcial';
  }

  canEdit(payment: DownPaymentPayment): boolean {
    return payment.status !== 'cancelado';
  }

  getStatusClass(status: string, isOverdue = false): string {
    const baseClass = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ';
    if (isOverdue && (status === 'pendiente' || status === 'parcial')) {
      return baseClass + 'bg-red-500 text-white shadow-sm';
    }
    const statusMap: Record<string, string> = {
      pendiente: 'bg-amber-500 text-white shadow-sm',
      pagado: 'bg-emerald-500 text-white shadow-sm',
      parcial: 'bg-blue-500 text-white shadow-sm',
      cancelado: 'bg-gray-500 text-white shadow-sm'
    };
    return baseClass + (statusMap[status] || 'bg-gray-500 text-white shadow-sm');
  }

  getStatusLabel(status: string, isOverdue = false): string {
    if (status === 'parcial' && isOverdue) return 'Parcial Vencido';
    if (status === 'pendiente' && isOverdue) return 'Pendiente Vencido';
    if (status === 'parcial') return 'Parcial';
    if (status === 'pendiente') return 'Pendiente';
    if (status === 'pagado') return 'Pagado';
    if (status === 'cancelado') return 'Cancelado';
    return status;
  }
}
