import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { SALES_ORDER_PERMISSIONS } from './config/permissions.config';

export const SALES_ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/sales-order-list/sales-order-list.component')
        .then(m => m.SalesOrderListComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [SALES_ORDER_PERMISSIONS.viewList],
      title: 'Órdenes de Venta'
    }
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/sales-order-form/sales-order-form.component')
        .then(m => m.SalesOrderFormComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [SALES_ORDER_PERMISSIONS.create],
      title: 'Crear Orden de Venta'
    }
  },
  {
    path: ':id/edit',
    loadComponent: () => 
      import('./pages/sales-order-form/sales-order-form.component')
        .then(m => m.SalesOrderFormComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [SALES_ORDER_PERMISSIONS.update],
      title: 'Editar Orden de Venta'
    }
  }
];
