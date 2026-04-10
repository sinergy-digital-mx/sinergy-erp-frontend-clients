import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { POS_PERMISSIONS } from './config/permissions.config';

export const POS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/pos-home/pos-home.component')
        .then(m => m.POSHomeComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [POS_PERMISSIONS.viewDashboard],
      title: 'Punto de Venta'
    }
  },
  {
    path: 'take-order',
    loadComponent: () => 
      import('./pages/take-order/take-order.component')
        .then(m => m.TakeOrderComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [POS_PERMISSIONS.createSale],
      title: 'Tomar Orden'
    }
  },
  {
    path: 'pending-orders',
    loadComponent: () => 
      import('./pages/pending-orders/pending-orders.component')
        .then(m => m.PendingOrdersComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [POS_PERMISSIONS.viewSales],
      title: 'Órdenes Pendientes'
    }
  },
  {
    path: 'payment',
    loadComponent: () => 
      import('./pages/payment/payment.component')
        .then(m => m.PaymentComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [POS_PERMISSIONS.createSale],
      title: 'Cobrar Orden'
    }
  }
];
