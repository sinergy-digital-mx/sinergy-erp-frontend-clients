import { Component, Input, OnChanges, OnInit, SimpleChanges, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaymentService } from '../../services/payment.service';
import { Payment, PaymentStats } from '../../models/payment.model';
import { Contract } from '../../models/contract.model';
import { DownPaymentStats } from '../../models/downpayment-payment.model';
import { DownpaymentPaymentService } from '../../services/downpayment-payment.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { LucideAngularModule, Plus, Edit, Trash2, X, DollarSign, RotateCcw, Mail, Check, AlertTriangle } from 'lucide-angular';
import { PartialPaymentModalComponent } from '../partial-payment-modal/partial-payment-modal.component';
import { EditPaymentModalComponent } from '../edit-payment-modal/edit-payment-modal.component';
import { SendPaymentEmailModalComponent } from '../send-payment-email-modal/send-payment-email-modal.component';
import { GeneratePaymentsDialogComponent } from '../generate-payments-dialog/generate-payments-dialog.component';
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
export class ContractPaymentsComponent implements OnInit, OnChanges {
  @Input() contractId!: string;
  @Input() currency: string = 'USD';
  @Input() contractStatus: string | null = null;
  @Input() contract: Contract | null = null;
  @Output() dataChanged = new EventEmitter<void>();

  payments = signal<Payment[]>([]);
  stats = signal<PaymentStats | null>(null);
  downpaymentStats = signal<DownPaymentStats | null>(null);
  loading = signal(false);
  currentPage = signal(1);
  readonly pageSize = 20;

  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly X = X;
  readonly DollarSign = DollarSign;
  readonly RotateCcw = RotateCcw;
  readonly Mail = Mail;
  readonly Math = Math;
  readonly Check = Check;
  readonly AlertTriangle = AlertTriangle;

  constructor(
    private paymentService: PaymentService,
    private downpaymentService: DownpaymentPaymentService,
    private interceptorService: InterceptorService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadPayments();
    this.loadStats();
    this.refreshDownpaymentStats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contractId'] && !changes['contractId'].firstChange) {
      this.loadPayments();
      this.loadStats();
      this.refreshDownpaymentStats();
      return;
    }

    if (changes['contract'] && !changes['contract'].firstChange) {
      this.refreshDownpaymentStats();
    }
  }

  private refreshDownpaymentStats(): void {
    if (this.contract?.down_payment_financed) {
      this.loadDownpaymentStats();
    } else {
      this.downpaymentStats.set(null);
    }
  }

  loadPayments() {
    this.loading.set(true);
    this.paymentService.getPayments(this.contractId).subscribe({
      next: (payments) => {
        this.payments.set(payments);
        this.autoSelectProgressPage(payments);
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
      error: () => {}
    });
  }

  loadDownpaymentStats(): void {
    this.downpaymentService.getStats(this.contractId).subscribe({
      next: (stats) => this.downpaymentStats.set(stats),
      error: () => {}
    });
  }

  openScheduleDialog(): void {
    if (!this.showScheduleForm) return;

    const dialogRef = this.dialog.open(GeneratePaymentsDialogComponent, {
      width: '520px',
      data: {
        contractId: this.contractId,
        contract: this.contract,
        mode: this.canRegenerate ? 'regenerate' : 'generate',
        defaultStartDate: this.stats()?.schedule?.start_date || this.contract?.first_payment_date,
        paymentMonths: this.paymentMonths,
        paymentsCount: this.stats()?.total_payments || this.payments().length,
        currency: this.currency
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.loadPayments();
      this.loadStats();
      this.dataChanged.emit();
    });
  }

  editPayment(payment: Payment) {
    const dialogRef = this.dialog.open(EditPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('✏️ Payment edited, emitting dataChanged event');
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }

  cancelPayment(payment: Payment) {
    if (!confirm(`¿Cancelar el pago #${payment.payment_number}?`)) return;

    this.paymentService.cancelPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
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
        this.dataChanged.emit();
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
    if (isOverdue && (status === 'pendiente' || status === 'parcial')) {
      return 'status-pill status-pill--overdue';
    }

    const statusMap: Record<string, string> = {
      pendiente: 'status-pill status-pill--pending',
      pagado: 'status-pill status-pill--paid',
      parcial: 'status-pill status-pill--partial',
      cancelado: 'status-pill status-pill--cancelled'
    };

    return statusMap[status] || 'status-pill status-pill--cancelled';
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
    if (!confirm(`¿Revertir el pago #${payment.payment_number}? Volverá a pendiente y se eliminará la información de cobro.`)) return;

    this.paymentService.resetPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Pago revertido correctamente'
        });
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo revertir el pago'
        });
      }
    });
  }

  sendPaymentEmail(payment: Payment) {
    const dialogRef = this.dialog.open(SendPaymentEmailModalComponent, {
      width: '640px',
      disableClose: false,
      data: { payment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Payment email sent:', result);
      }
    });
  }

  get isContractCompleted(): boolean {
    const status = (this.contractStatus || '').toLowerCase().trim();
    return status === 'completado' || status === 'completed';
  }

  get isDownpaymentFinancingBlocking(): boolean {
    if (!this.contract?.down_payment_financed) return false;
    const stats = this.downpaymentStats();
    if (!stats) return true;
    return !stats.downpayment_financing_complete;
  }

  get downpaymentBlockingMessage(): string {
    const stats = this.downpaymentStats();
    if (!stats?.down_payment_target_defined) {
      return 'Define y liquida el enganche financiado antes de generar los pagos del contrato.';
    }
    return 'Completa todos los pagos de enganche antes de generar los pagos del contrato.';
  }

  /** Monto pendiente solo de pagos vencidos (no todo total_pending). */
  get overdueAmount(): number {
    const stats = this.stats();
    if (!stats) return 0;

    if (stats.overdue_amount != null && stats.overdue_amount >= 0) {
      return stats.overdue_amount;
    }

    // Fallback si el backend aún no envía overdue_amount

    return this.payments()
      .filter((p) => p.is_overdue && (p.status === 'pendiente' || p.status === 'parcial'))
      .reduce((sum, p) => sum + (p.amount_pending || 0), 0);
  }

  get canGenerate(): boolean {
    const stats = this.stats();
    if (stats?.can_generate != null) return stats.can_generate;
    return this.payments().length === 0;
  }

  get canRegenerate(): boolean {
    const stats = this.stats();
    if (stats?.can_regenerate != null) return stats.can_regenerate;
    if (!stats) return false;
    return this.payments().length > 0 && (stats.paid_or_partial_count ?? 0) === 0;
  }

  get showScheduleForm(): boolean {
    return !this.isContractCompleted
      && !this.isDownpaymentFinancingBlocking
      && (this.canGenerate || this.canRegenerate);
  }

  get showRegenerateBlockedBanner(): boolean {
    const stats = this.stats();
    if (!stats || this.canGenerate || this.canRegenerate) return false;
    return (stats.paid_or_partial_count ?? 0) > 0 || !!stats.cannot_regenerate_reason;
  }

  get calendarStartDate(): string | null {
    return this.stats()?.schedule?.start_date || null;
  }

  get calendarEndDate(): string | null {
    return this.stats()?.schedule?.end_date || null;
  }

  get paymentMonths(): number {
    return this.stats()?.schedule?.payment_months
      || this.contract?.payment_months
      || 0;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.payments().length / this.pageSize));
  }

  get paginatedPayments(): Payment[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.payments().slice(start, start + this.pageSize);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage.set(page);
  }

  private autoSelectProgressPage(payments: Payment[]): void {
    if (!payments.length) {
      this.currentPage.set(1);
      return;
    }

    let lastPaidIndex = -1;
    for (let i = payments.length - 1; i >= 0; i--) {
      const payment = payments[i];
      const hasAnyPayment = (payment.amount_paid || 0) > 0 || payment.status === 'pagado' || payment.status === 'parcial';
      if (hasAnyPayment) {
        lastPaidIndex = i;
        break;
      }
    }

    const targetIndex = lastPaidIndex >= 0 ? lastPaidIndex : 0;
    const targetPage = Math.floor(targetIndex / this.pageSize) + 1;
    this.currentPage.set(targetPage);
  }

  registerPayment(payment: Payment) {
    const dialogRef = this.dialog.open(PartialPaymentModalComponent, {
      data: { payment, contractId: this.contractId, currency: this.currency }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('💰 Payment registered, emitting dataChanged event');
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      }
    });
  }
}
