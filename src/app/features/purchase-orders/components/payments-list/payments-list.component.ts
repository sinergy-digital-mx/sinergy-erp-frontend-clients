import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payment } from '../../models/payment.model';
import { TaxCalculatorService } from '../../services/tax-calculator.service';

/**
 * Payments list component
 * Displays registered payments with formatted amounts and dates
 * Shows "Registrar Pago" button if canAddPayment is true
 * Responsive layout (table on desktop, cards on mobile)
 */
@Component({
  selector: 'app-payments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsListComponent {
  @Input() payments: Payment[] = [];
  @Input() canAddPayment: boolean = false;
  @Output() addPayment = new EventEmitter<void>();

  constructor(private taxCalculator: TaxCalculatorService) {}

  /**
   * Format currency amount
   */
  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }

  /**
   * Format date to Spanish locale
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Handle add payment button click
   */
  onAddPayment(): void {
    this.addPayment.emit();
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByPayment(index: number, payment: Payment): string {
    return payment.id;
  }
}
