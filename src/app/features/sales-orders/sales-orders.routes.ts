import { Routes } from '@angular/router';

export const SALES_ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/sales-order-list/sales-order-list.component')
        .then(m => m.SalesOrderListComponent),
    data: { 
      permission: 'sales_orders:Read',
      title: 'Órdenes de Venta'
    }
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/sales-order-form/sales-order-form.component')
        .then(m => m.SalesOrderFormComponent),
    data: { 
      permission: 'sales_orders:Create',
      title: 'Crear Orden de Venta'
    }
  },
  {
    path: ':id/edit',
    loadComponent: () => 
      import('./pages/sales-order-form/sales-order-form.component')
        .then(m => m.SalesOrderFormComponent),
    data: { 
      permission: 'sales_orders:Update',
      title: 'Editar Orden de Venta'
    }
  }
];
