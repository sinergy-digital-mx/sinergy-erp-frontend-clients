import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { WAREHOUSE_CONTROL_PERMISSIONS } from './config/permissions.config';

export const WAREHOUSE_CONTROL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/warehouse-control-board/warehouse-control-board.component').then(
        (m) => m.WarehouseControlBoardComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [WAREHOUSE_CONTROL_PERMISSIONS.read, WAREHOUSE_CONTROL_PERMISSIONS.viewMenu],
      permissionMode: 'any',
      title: 'Mesa de Control',
    },
  },
  {
    path: 'positions',
    loadComponent: () =>
      import('./pages/warehouse-control-positions/warehouse-control-positions.component').then(
        (m) => m.WarehouseControlPositionsComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [WAREHOUSE_CONTROL_PERMISSIONS.create],
      title: 'Configurar posiciones',
    },
  },
];
