import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { SHIPPING_PERMISSIONS, TRUCK_PERMISSIONS } from './config/permissions.config';

export const LOGISTICS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'shippings',
    pathMatch: 'full',
  },
  {
    path: 'shippings',
    loadComponent: () =>
      import('./pages/shippings-calendar/shippings-calendar.component').then(
        (m) => m.ShippingsCalendarComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [SHIPPING_PERMISSIONS.viewList],
      title: 'Envíos',
    },
  },
  {
    path: 'trucks',
    loadComponent: () =>
      import('./pages/trucks-list/trucks-list.component').then((m) => m.TrucksListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [TRUCK_PERMISSIONS.viewList],
      title: 'Camiones',
    },
  },
];
