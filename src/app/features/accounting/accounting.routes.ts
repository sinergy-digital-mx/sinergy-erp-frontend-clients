import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { ACCOUNTING_PERMISSIONS } from './config/permissions.config';

export const ACCOUNTING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/accounting-page/accounting-page.component').then((m) => m.AccountingPageComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [ACCOUNTING_PERMISSIONS.read],
      title: 'Cobranza / Contabilidad',
    },
  },
];
