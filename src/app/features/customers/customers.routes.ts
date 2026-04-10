import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { CUSTOMER_PERMISSIONS } from './config/permissions.config';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/customers-list/customers-list')
        .then(m => m.CustomersList),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewList]
    }
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/customer-detail/customer-detail')
        .then(m => m.CustomerDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_PERMISSIONS.viewDetail]
    }
  },
];
