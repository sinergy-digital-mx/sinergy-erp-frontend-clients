import { Routes } from '@angular/router';
import { madereriaRealEstateGuard } from '../../core/guards/madereria-real-estate.guard';
import { permissionGuard } from '../../core/guards/permission.guard';
import { CONTRACT_PERMISSIONS } from './config/permissions.config';

export const CONTRACTS_ROUTES: Routes = [
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/contract-detail-page/contract-detail-page.component').then(
        (m) => m.ContractDetailPageComponent
      ),
    canActivate: [madereriaRealEstateGuard, permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
  {
    path: 'metrics',
    loadComponent: () =>
      import('./pages/contract-metrics-page/contract-metrics-page.component').then(
        (m) => m.ContractMetricsPageComponent
      ),
    canActivate: [madereriaRealEstateGuard, permissionGuard],
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
    canActivate: [madereriaRealEstateGuard, permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
];
