import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { GLOBAL_DISCOUNT_PERMISSIONS } from './config/permissions.config';

export const GLOBAL_DISCOUNTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/global-discounts-list/global-discounts-list.component').then(
        (m) => m.GlobalDiscountsListComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [...GLOBAL_DISCOUNT_PERMISSIONS.viewList],
      permissionMode: 'any',
      title: 'Descuentos globales',
    },
  },
];
