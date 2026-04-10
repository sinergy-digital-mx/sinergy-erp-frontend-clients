import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { LEAD_PERMISSIONS } from './config/permissions.config';

export const LEADS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/leads-list/leads-list')
        .then(m => m.LeadsList),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewList]
    }
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/lead-detail/lead-detail')
        .then(m => m.LeadDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewDetail]
    }
  },
];
