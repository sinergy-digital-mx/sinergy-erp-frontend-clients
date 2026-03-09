import { describe, it, expect, beforeEach } from 'vitest';
import { DashboardComponent } from './dashboard.component';
import { PurchaseOrder } from '../../models/purchase-order.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    component = new DashboardComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('calculateStatusDistribution', () => {
    it('should return empty array when no orders', () => {
      component.orders = [];
      const distribution = component.calculateStatusDistribution();
      
      expect(distribution).toEqual([]);
    });

    it('should calculate correct distribution for orders', () => {
      const mockOrders: PurchaseOrder[] = [
        { status: 'En Proceso', payment_status: 'No pagado' } as PurchaseOrder,
        { status: 'En Proceso', payment_status: 'No pagado' } as PurchaseOrder,
        { status: 'Recibida', payment_status: 'Pagada' } as PurchaseOrder,
        { status: 'Cancelada', payment_status: 'No pagado' } as PurchaseOrder,
      ];

      component.orders = mockOrders;
      const distribution = component.calculateStatusDistribution();

      expect(distribution).toHaveLength(3);
      expect(distribution[0]).toEqual({
        status: 'En Proceso',
        count: 2,
        percentage: 50
      });
      expect(distribution[1]).toEqual({
        status: 'Recibida',
        count: 1,
        percentage: 25
      });
      expect(distribution[2]).toEqual({
        status: 'Cancelada',
        count: 1,
        percentage: 25
      });
    });

    it('should handle all orders with same status', () => {
      const mockOrders: PurchaseOrder[] = [
        { status: 'En Proceso', payment_status: 'No pagado' } as PurchaseOrder,
        { status: 'En Proceso', payment_status: 'No pagado' } as PurchaseOrder,
        { status: 'En Proceso', payment_status: 'No pagado' } as PurchaseOrder,
      ];

      component.orders = mockOrders;
      const distribution = component.calculateStatusDistribution();

      expect(distribution[0]).toEqual({
        status: 'En Proceso',
        count: 3,
        percentage: 100
      });
      expect(distribution[1].count).toBe(0);
      expect(distribution[2].count).toBe(0);
    });
  });

  describe('calculatePaymentStatusDistribution', () => {
    it('should return empty array when no orders', () => {
      component.orders = [];
      const distribution = component.calculatePaymentStatusDistribution();
      
      expect(distribution).toEqual([]);
    });

    it('should calculate correct payment distribution', () => {
      const mockOrders: PurchaseOrder[] = [
        { status: 'En Proceso', payment_status: 'No pagado' } as PurchaseOrder,
        { status: 'Recibida', payment_status: 'Pagada' } as PurchaseOrder,
        { status: 'Recibida', payment_status: 'Pagada' } as PurchaseOrder,
        { status: 'En Proceso', payment_status: 'Parcial' } as PurchaseOrder,
      ];

      component.orders = mockOrders;
      const distribution = component.calculatePaymentStatusDistribution();

      expect(distribution).toHaveLength(3);
      expect(distribution[0]).toEqual({
        paymentStatus: 'Pagada',
        count: 2,
        percentage: 50
      });
      expect(distribution[1]).toEqual({
        paymentStatus: 'Parcial',
        count: 1,
        percentage: 25
      });
      expect(distribution[2]).toEqual({
        paymentStatus: 'No pagado',
        count: 1,
        percentage: 25
      });
    });
  });

  describe('chart updates', () => {
    it('should update charts when orders change', () => {
      const mockOrders: PurchaseOrder[] = [
        { status: 'En Proceso', payment_status: 'No pagado' } as PurchaseOrder,
        { status: 'Recibida', payment_status: 'Pagada' } as PurchaseOrder,
      ];

      component.orders = mockOrders;
      component.ngOnChanges({
        orders: {
          currentValue: mockOrders,
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        }
      });

      expect(component.statusChartData).toBeDefined();
      expect(component.paymentStatusChartData).toBeDefined();
      expect(component.statusChartData.labels).toEqual(['En Proceso', 'Recibida', 'Cancelada']);
      expect(component.statusChartData.datasets[0].data).toEqual([1, 1, 0]);
    });

    it('should have correct chart colors', () => {
      const mockOrders: PurchaseOrder[] = [
        { status: 'En Proceso', payment_status: 'No pagado' } as PurchaseOrder,
      ];

      component.orders = mockOrders;
      component.ngOnChanges({
        orders: {
          currentValue: mockOrders,
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        }
      });

      // Status chart colors
      expect(component.statusChartData.datasets[0].backgroundColor).toEqual([
        '#FFA726', // En Proceso - Orange
        '#66BB6A', // Recibida - Green
        '#EF5350'  // Cancelada - Red
      ]);

      // Payment status chart colors
      expect(component.paymentStatusChartData.datasets[0].backgroundColor).toEqual([
        '#66BB6A', // Pagada - Green
        '#FFA726', // Parcial - Orange
        '#EF5350'  // No pagado - Red
      ]);
    });
  });
});
