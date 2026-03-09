import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { PurchaseOrder, OrderStatus, PaymentStatus } from '../../models/purchase-order.model';
import { StatusDistribution, PaymentStatusDistribution } from '../../models/filters.model';

/**
 * Dashboard component that displays metrics with pie charts
 * Shows distribution by order status and payment status
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnChanges {
  @Input() orders: PurchaseOrder[] = [];

  statusChartData: any;
  paymentStatusChartData: any;
  chartOptions: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders']) {
      this.updateCharts();
    }
  }

  /**
   * Calculate distribution of orders by status
   */
  calculateStatusDistribution(): StatusDistribution[] {
    if (!this.orders || this.orders.length === 0) {
      return [];
    }

    const statusCounts = new Map<OrderStatus, number>();
    const statuses: OrderStatus[] = ['En Proceso', 'Recibida', 'Cancelada'];

    // Initialize counts
    statuses.forEach(status => statusCounts.set(status, 0));

    // Count orders by status
    this.orders.forEach(order => {
      const count = statusCounts.get(order.status) || 0;
      statusCounts.set(order.status, count + 1);
    });

    // Calculate percentages
    const total = this.orders.length;
    return statuses.map(status => ({
      status,
      count: statusCounts.get(status) || 0,
      percentage: total > 0 ? ((statusCounts.get(status) || 0) / total) * 100 : 0
    }));
  }

  /**
   * Calculate distribution of orders by payment status
   */
  calculatePaymentStatusDistribution(): PaymentStatusDistribution[] {
    if (!this.orders || this.orders.length === 0) {
      return [];
    }

    const paymentStatusCounts = new Map<PaymentStatus, number>();
    const paymentStatuses: PaymentStatus[] = ['Pagada', 'Parcial', 'No pagado'];

    // Initialize counts
    paymentStatuses.forEach(status => paymentStatusCounts.set(status, 0));

    // Count orders by payment status
    this.orders.forEach(order => {
      const count = paymentStatusCounts.get(order.payment_status) || 0;
      paymentStatusCounts.set(order.payment_status, count + 1);
    });

    // Calculate percentages
    const total = this.orders.length;
    return paymentStatuses.map(paymentStatus => ({
      paymentStatus,
      count: paymentStatusCounts.get(paymentStatus) || 0,
      percentage: total > 0 ? ((paymentStatusCounts.get(paymentStatus) || 0) / total) * 100 : 0
    }));
  }

  /**
   * Update chart data based on current orders
   */
  private updateCharts(): void {
    const statusDistribution = this.calculateStatusDistribution();
    const paymentDistribution = this.calculatePaymentStatusDistribution();

    // Status chart data
    this.statusChartData = {
      labels: statusDistribution.map(d => d.status),
      datasets: [
        {
          data: statusDistribution.map(d => d.count),
          backgroundColor: [
            '#FFA726', // En Proceso - Orange
            '#66BB6A', // Recibida - Green
            '#EF5350'  // Cancelada - Red
          ],
          hoverBackgroundColor: [
            '#FB8C00',
            '#4CAF50',
            '#E53935'
          ]
        }
      ]
    };

    // Payment status chart data
    this.paymentStatusChartData = {
      labels: paymentDistribution.map(d => d.paymentStatus),
      datasets: [
        {
          data: paymentDistribution.map(d => d.count),
          backgroundColor: [
            '#66BB6A', // Pagada - Green
            '#FFA726', // Parcial - Orange
            '#EF5350'  // No pagado - Red
          ],
          hoverBackgroundColor: [
            '#4CAF50',
            '#FB8C00',
            '#E53935'
          ]
        }
      ]
    };

    // Chart options
    this.chartOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 10,
            font: {
              size: 11
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5
    };
  }
}
