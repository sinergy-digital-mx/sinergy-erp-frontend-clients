import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrder, OrderStatus, PaymentStatus } from '../../models/purchase-order.model';
import { TaxCalculatorService } from '../../services/tax-calculator.service';

/**
 * Orders table component with infinite scroll
 * Displays purchase orders in a responsive table (desktop/tablet) or cards (mobile)
 */
@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit, OnDestroy {
  @Input() orders: PurchaseOrder[] = [];
  @Input() loading: boolean = false;
  @Output() orderClick = new EventEmitter<string>();
  @Output() loadMore = new EventEmitter<void>();

  @ViewChild('scrollSentinel', { read: ElementRef }) scrollSentinel?: ElementRef;

  private intersectionObserver?: IntersectionObserver;

  constructor(private taxCalculator: TaxCalculatorService) {}

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  ngAfterViewInit(): void {
    if (this.scrollSentinel) {
      this.intersectionObserver?.observe(this.scrollSentinel.nativeElement);
    }
  }

  /**
   * Setup Intersection Observer for infinite scroll
   */
  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.loading) {
            this.loadMore.emit();
          }
        });
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );
  }

  /**
   * Handle order row click
   */
  onOrderClick(orderId: string): void {
    this.orderClick.emit(orderId);
  }

  /**
   * Handle keyboard navigation (Enter or Space)
   */
  onKeyDown(event: KeyboardEvent, orderId: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onOrderClick(orderId);
    }
  }

  /**
   * Get status badge class
   */
  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case 'En Proceso':
        return 'status-badge status-badge--en-proceso';
      case 'Recibida':
        return 'status-badge status-badge--recibida';
      case 'Cancelada':
        return 'status-badge status-badge--cancelada';
      default:
        return 'status-badge';
    }
  }

  /**
   * Get payment status badge class
   */
  getPaymentStatusClass(paymentStatus: PaymentStatus): string {
    switch (paymentStatus) {
      case 'Pagada':
        return 'payment-badge payment-badge--pagada';
      case 'Parcial':
        return 'payment-badge payment-badge--parcial';
      case 'No pagado':
        return 'payment-badge payment-badge--no-pagado';
      default:
        return 'payment-badge';
    }
  }

  /**
   * Format currency amount
   */
  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }
}
