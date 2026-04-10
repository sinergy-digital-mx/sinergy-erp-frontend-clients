import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { CONTRACT_PERMISSIONS } from './config/permissions.config';

export const CONTRACTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/contracts-list/contracts-list.component').then(
        (m) => m.ContractsListComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
];
