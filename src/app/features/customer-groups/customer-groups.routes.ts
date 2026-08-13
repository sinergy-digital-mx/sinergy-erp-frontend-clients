import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { CUSTOMER_GROUP_PERMISSIONS } from './config/permissions.config';

export const CUSTOMER_GROUPS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/customer-groups-list/customer-groups-list.component').then(
        (m) => m.CustomerGroupsListComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_GROUP_PERMISSIONS.view],
      permissionMode: 'any',
      title: 'Grupos de clientes',
    },
  },
];
