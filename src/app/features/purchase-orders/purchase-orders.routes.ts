import { Routes } from '@angular/router';

export const PURCHASE_ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/purchase-order-list/purchase-order-list.component')
        .then(m => m.PurchaseOrderListComponent),
    data: { 
      permission: 'purchase_orders:Read',
      title: 'Órdenes de Compra'
    }
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/purchase-order-form/purchase-order-form.component')
        .then(m => m.PurchaseOrderFormComponent),
    data: { 
      permission: 'purchase_orders:Create',
      title: 'Crear Orden de Compra'
    }
  },
  {
    path: ':id',
    loadComponent: () => 
      import('./pages/purchase-order-detail/purchase-order-detail.component')
        .then(m => m.PurchaseOrderDetailComponent),
    data: { 
      permission: 'purchase_orders:Read',
      title: 'Detalle de Orden'
    }
  },
  {
    path: ':id/edit',
    loadComponent: () => 
      import('./pages/purchase-order-form/purchase-order-form.component')
        .then(m => m.PurchaseOrderFormComponent),
    data: { 
      permission: 'purchase_orders:Update',
      title: 'Editar Orden de Compra'
    }
  }
];
