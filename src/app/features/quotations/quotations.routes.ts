import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { QUOTATION_PERMISSIONS } from './config/permissions.config';

export const QUOTATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/quotation-list/quotation-list.component').then(
        (m) => m.QuotationListComponent,
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [QUOTATION_PERMISSIONS.viewList],
      title: 'Cotizaciones',
    },
  },
];
