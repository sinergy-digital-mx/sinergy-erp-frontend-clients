import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { WAREHOUSE_CONTROL_PERMISSIONS } from './config/permissions.config';

export const WAREHOUSE_CONTROL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/warehouse-control-list/warehouse-control-list.component').then(
        (m) => m.WarehouseControlListComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [WAREHOUSE_CONTROL_PERMISSIONS.read, WAREHOUSE_CONTROL_PERMISSIONS.viewMenu],
      permissionMode: 'any',
      title: 'Control de almacén',
    },
  },
];
