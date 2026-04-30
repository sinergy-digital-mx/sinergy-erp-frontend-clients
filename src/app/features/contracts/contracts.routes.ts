import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { CONTRACT_PERMISSIONS } from './config/permissions.config';

export const CONTRACTS_ROUTES: Routes = [
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/contract-detail-page/contract-detail-page.component').then(
        (m) => m.ContractDetailPageComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
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
