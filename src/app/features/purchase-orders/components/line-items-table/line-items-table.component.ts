import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LineItem } from '../../models/line-item.model';
import { TaxCalculatorService } from '../../services/tax-calculator.service';

/**
 * Line items table component
 * Displays line items with calculated totals
 * Supports virtual scrolling for > 50 items
 * Responsive layout (table on desktop, cards on mobile)
 */
@Component({
  selector: 'app-line-items-table',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './line-items-table.component.html',
  styleUrls: ['./line-items-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineItemsTableComponent {
  @Input() lineItems: LineItem[] = [];
  @Input() editable: boolean = false;
  @Output() lineItemChange = new EventEmitter<LineItem>();
  @Output() lineItemRemove = new EventEmitter<number>();

  constructor(private taxCalculator: TaxCalculatorService) {}

  /**
   * Check if virtual scrolling should be enabled
   */
  get useVirtualScroll(): boolean {
    return this.lineItems.length > 50;
  }

  /**
   * Calculate totals for all line items
   */
  get totals() {
    return this.taxCalculator.calculateOrderTotals(this.lineItems);
  }

  /**
   * Format currency amount
   */
  formatCurrency(amount: number): string {
    return this.taxCalculator.formatCurrency(amount);
  }

  /**
   * Handle line item change
   */
  onLineItemChange(item: LineItem): void {
    if (this.editable) {
      this.lineItemChange.emit(item);
    }
  }

  /**
   * Handle line item removal
   */
  onLineItemRemove(index: number): void {
    if (this.editable) {
      this.lineItemRemove.emit(index);
    }
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByLineItem(index: number, item: LineItem): string {
    return item.id;
  }
}
