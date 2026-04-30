import { Component, Inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder, SalesOrderLineItem } from '../../models/sales-order.model';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';

@Component({
  selector: 'app-sales-order-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RemoveTrailingZerosPipe],
  templateUrl: './sales-order-detail-dialog.component.html',
  styleUrl: './sales-order-detail-dialog.component.scss',
  host: {
    'class': 'order-detail-dialog-container'
  }
})
export class SalesOrderDetailDialogComponent {
  order = signal<SalesOrder | null>(null);
  lineItems = signal<SalesOrderLineItem[]>([]);
  loading = signal(true);
  activeTabIndex = signal(0);

  canEditOrder = computed(() => this.order()?.general_status === 'Creada');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderId: string },
    private dialogRef: MatDialogRef<SalesOrderDetailDialogComponent>,
    private salesOrderService: SalesOrderService,
    private router: Router,
    private taxCalculator: TaxCalculatorService
  ) {
    this.loadOrder();
  }

  loadOrder(): void {
    this.loading.set(true);
    this.salesOrderService.getOrderDetailById(this.data.orderId).subscribe({
      next: (payload) => {
        this.order.set(payload?.header || null);
        this.lineItems.set(payload?.line_items || payload?.header?.line_items || []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  goToEditForm(): void {
    const id = this.order()?.id;
    if (!id) return;
    this.dialogRef.close();
    void this.router.navigate(['/sales-orders', id, 'edit']);
  }

  parseNumber(value: number | string | undefined | null): number {
    if (value === null || value === undefined) return 0;
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  formatCurrency(value: number | string | undefined | null): string {
    return this.taxCalculator.formatCurrency(this.parseNumber(value));
  }

  getStatusClass(status?: string): string {
    if (status === 'Creada') return 'bg-blue-100 text-blue-700';
    if (status === 'Surtida') return 'bg-green-100 text-green-700';
    if (status === 'Cancelada') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  }

  getPaymentStatusClass(status?: string): string {
    if (status === 'Pendiente') return 'bg-red-50 text-red-600';
    if (status === 'Pagado') return 'bg-green-50 text-green-600';
    return 'bg-gray-100 text-gray-600';
  }

  getCustomerDisplayName(): string {
    const customer = this.order()?.customer;
    if (!customer) return 'N/A';
    const fullName = `${customer.name || ''} ${customer.lastname || ''}`.trim();
    return fullName || customer.company_name || 'N/A';
  }

  getFiscalDisplayName(): string {
    const fiscal = this.order()?.fiscal_configuration;
    return fiscal?.business_name || fiscal?.razon_social || this.order()?.fiscal_razon_social || 'N/A';
  }

  getLineUom(item: SalesOrderLineItem): string {
    return (
      item.uom_name ||
      item.product_uom?.uom?.name ||
      item.base_uom_name ||
      item.base_uom?.name ||
      'Unidad'
    );
  }

  getLineTotal(item: SalesOrderLineItem): number {
    const qty = this.parseNumber(item.quantity);
    const unit = this.parseNumber(item.unit_price);
    const discountPct = this.parseNumber(item.discount_percentage);
    const taxable = unit * qty;
    const discount = taxable * (discountPct / 100);
    const discountedSubtotal = Math.max(taxable - discount, 0);
    const iva = discountedSubtotal * (this.parseNumber(item.iva_percentage) / 100);
    const ieps = discountedSubtotal * (this.parseNumber(item.ieps_percentage) / 100);
    return discountedSubtotal + iva + ieps;
  }

  getBatchAllocationsRows(): Array<{ item: SalesOrderLineItem; allocation: any }> {
    const rows: Array<{ item: SalesOrderLineItem; allocation: any }> = [];
    for (const item of this.lineItems()) {
      const allocations = Array.isArray(item.batch_allocations) ? item.batch_allocations : [];
      for (const allocation of allocations) {
        rows.push({ item, allocation });
      }
    }
    return rows;
  }
}
