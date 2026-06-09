import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LucideAngularModule, Plus, Edit, Trash2, DollarSign, RotateCcw, X } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { HoaPayment, HoaPaymentStats, getSuggestedHoaFirstPaymentDate, getSuggestedHoaMonthlyAmount } from '../../models/hoa-payment.model';
import { HoaPaymentService } from '../../services/hoa-payment.service';
import { GenerateHoaDialogComponent } from '../generate-hoa-dialog/generate-hoa-dialog.component';
import { EditHoaPaymentModalComponent } from '../edit-hoa-payment-modal/edit-hoa-payment-modal.component';
import { PartialHoaPaymentModalComponent } from '../partial-hoa-payment-modal/partial-hoa-payment-modal.component';
import { LocalDatePipe } from '../../../../core/pipes/local-date.pipe';

@Component({
  selector: 'app-contract-hoa-payments',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule, LocalDatePipe, MatTooltipModule],
  templateUrl: './contract-hoa-payments.component.html',
  styleUrl: './contract-hoa-payments.component.scss'
})
export class ContractHoaPaymentsComponent implements OnInit {
  @Input() contractId!: string;
  @Input() contract: any;
  @Input() currency = 'USD';
  @Input() contractStatus: string | null = null;
  @Output() dataChanged = new EventEmitter<void>();

  payments = signal<HoaPayment[]>([]);
  stats = signal<HoaPaymentStats | null>(null);
  loading = signal(false);
  generating = signal(false);
  currentPage = signal(1);
  readonly pageSize = 20;

  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly DollarSign = DollarSign;
  readonly RotateCcw = RotateCcw;
  readonly X = X;
  readonly Math = Math;

  constructor(
    private hoaPaymentService: HoaPaymentService,
    private interceptorService: InterceptorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPayments();
    this.loadStats();
  }

  get isContractCancelled(): boolean {
    const status = (this.contractStatus || '').toLowerCase().trim();
    return status === 'cancelado' || status === 'cancelled' || status === 'canceled';
  }

  get canGeneratePayments(): boolean {
    return !this.isContractCancelled;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.payments().length / this.pageSize));
  }

  get paginatedPayments(): HoaPayment[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.payments().slice(start, start + this.pageSize);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage.set(page);
  }

  loadPayments(): void {
    this.loading.set(true);
    this.hoaPaymentService.getPayments(this.contractId).subscribe({
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
          message: 'No se pudieron cargar los pagos HOA'
        });
      }
    });
  }

  loadStats(): void {
    this.hoaPaymentService.getStats(this.contractId).subscribe({
      next: (stats) => this.stats.set(stats),
      error: () => {}
    });
  }

  generatePayments(): void {
    if (!this.contract || !this.canGeneratePayments) return;

    const existingPayments = this.payments();
    const dialogRef = this.dialog.open(GenerateHoaDialogComponent, {
      width: '500px',
      data: {
        contract: this.contract,
        existingPayments,
        suggestedFirstPaymentDate: getSuggestedHoaFirstPaymentDate(existingPayments),
        suggestedMonthlyAmount: getSuggestedHoaMonthlyAmount(existingPayments)
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const monthlyAmount = Number(result.monthly_amount);
      if (!monthlyAmount || monthlyAmount <= 0) {
        this.interceptorService.openSnackbar({
          type: 'warning',
          title: 'Advertencia',
          message: 'El monto mensual debe ser mayor a 0'
        });
        return;
      }

      this.generating.set(true);
      this.hoaPaymentService.generatePayments(this.contractId, {
        first_payment_date: result.first_payment_date,
        payments_count: Number(result.payments_count),
        payment_day: Number(result.payment_day) || 5,
        monthly_amount: monthlyAmount
      }).subscribe({
        next: (created) => {
          this.generating.set(false);
          this.loadPayments();
          this.loadStats();
          this.dataChanged.emit();
          const count = created?.length ?? 0;
          this.interceptorService.openSnackbar({
            type: 'success',
            title: 'Éxito',
            message: count > 0
              ? `${count} cuota${count === 1 ? '' : 's'} HOA generada${count === 1 ? '' : 's'} correctamente`
              : 'Pagos HOA generados correctamente'
          });
        },
        error: (err) => {
          this.generating.set(false);
          this.interceptorService.openSnackbar({
            type: 'error',
            title: 'Error',
            message: err.error?.message || 'Error al generar pagos HOA'
          });
        }
      });
    });
  }

  editPayment(payment: HoaPayment): void {
    const dialogRef = this.dialog.open(EditHoaPaymentModalComponent, {
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

  registerPayment(payment: HoaPayment): void {
    const dialogRef = this.dialog.open(PartialHoaPaymentModalComponent, {
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

  cancelPayment(payment: HoaPayment): void {
    if (!confirm(`¿Cancelar el pago HOA #${payment.payment_number}?`)) return;
    this.hoaPaymentService.cancelPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo cancelar el pago HOA'
        });
      }
    });
  }

  resetPayment(payment: HoaPayment): void {
    if (!confirm(`¿Resetear el pago HOA #${payment.payment_number}?`)) return;
    this.hoaPaymentService.resetPayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo resetear el pago HOA'
        });
      }
    });
  }

  deletePayment(payment: HoaPayment): void {
    if (!confirm(`¿Eliminar permanentemente el pago HOA #${payment.payment_number}?`)) return;
    this.hoaPaymentService.deletePayment(this.contractId, payment.id).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
        this.dataChanged.emit();
      },
      error: (err) => {
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'No se pudo eliminar el pago HOA'
        });
      }
    });
  }

  markOverdue(): void {
    this.hoaPaymentService.markOverdue(this.contractId).subscribe({
      next: () => {
        this.loadPayments();
        this.loadStats();
      },
      error: () => {}
    });
  }

  getStatusClass(status: string): string {
    const baseClass = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ';
    const statusMap: Record<string, string> = {
      pendiente: 'bg-amber-500 text-white shadow-sm',
      pagado: 'bg-emerald-500 text-white shadow-sm',
      parcial: 'bg-blue-500 text-white shadow-sm',
      cancelado: 'bg-gray-500 text-white shadow-sm'
    };
    return baseClass + (statusMap[status] || 'bg-gray-500 text-white shadow-sm');
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pendiente: 'Pendiente',
      parcial: 'Parcial',
      pagado: 'Pagado',
      cancelado: 'Cancelado'
    };
    return labels[status] || status;
  }

  getPaymentMonthLabel(payment: HoaPayment): string {
    const date = new Date(payment.due_date);
    return new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' }).format(date);
  }

  canRegisterPayment(payment: HoaPayment): boolean {
    return payment.status === 'pendiente' || payment.status === 'parcial';
  }

  canEdit(payment: HoaPayment): boolean {
    return payment.status === 'pendiente' || payment.status === 'parcial' || payment.status === 'pagado';
  }

  canCancelPayment(payment: HoaPayment): boolean {
    return payment.status === 'pendiente' || payment.status === 'parcial' || payment.status === 'pagado';
  }

  canDeletePayment(payment: HoaPayment): boolean {
    return payment.status === 'cancelado';
  }

  canResetPayment(payment: HoaPayment): boolean {
    return payment.status === 'pagado' || payment.status === 'parcial';
  }

  private autoSelectProgressPage(payments: HoaPayment[]): void {
    if (!payments.length) {
      this.currentPage.set(1);
      return;
    }
    let lastPaidIndex = -1;
    for (let i = payments.length - 1; i >= 0; i--) {
      const p = payments[i];
      const hasAnyPayment = (p.amount_paid || 0) > 0 || p.status === 'pagado' || p.status === 'parcial';
      if (hasAnyPayment) {
        lastPaidIndex = i;
        break;
      }
    }
    const targetIndex = lastPaidIndex >= 0 ? lastPaidIndex : 0;
    const targetPage = Math.floor(targetIndex / this.pageSize) + 1;
    this.currentPage.set(targetPage);
  }
}
