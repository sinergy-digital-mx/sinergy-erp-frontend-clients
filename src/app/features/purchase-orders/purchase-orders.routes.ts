import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { PURCHASE_ORDER_PERMISSIONS } from './config/permissions.config';

export const PURCHASE_ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/purchase-order-list/purchase-order-list.component')
        .then(m => m.PurchaseOrderListComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewList],
      title: 'Órdenes de Compra'
    }
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/purchase-order-form/purchase-order-form.component')
        .then(m => m.PurchaseOrderFormComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [PURCHASE_ORDER_PERMISSIONS.create],
      title: 'Crear Orden de Compra'
    }
  },
  {
    path: ':id',
    loadComponent: () => 
      import('./pages/purchase-order-detail/purchase-order-detail.component')
        .then(m => m.PurchaseOrderDetailComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [PURCHASE_ORDER_PERMISSIONS.viewDetail],
      title: 'Detalle de Orden'
    }
  },
  {
    path: ':id/edit',
    loadComponent: () => 
      import('./pages/purchase-order-form/purchase-order-form.component')
        .then(m => m.PurchaseOrderFormComponent),
    canActivate: [permissionGuard],
    data: { 
      permissions: [PURCHASE_ORDER_PERMISSIONS.update],
      title: 'Editar Orden de Compra'
    }
  }
];
