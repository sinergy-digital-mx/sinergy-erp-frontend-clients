import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { CRM_PERMISSIONS } from './config/permissions.config';

export const CRM_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/crm-inbox/crm-inbox.component').then((m) => m.CrmInboxComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CRM_PERMISSIONS.viewInbox, CRM_PERMISSIONS.viewMenu],
      permissionMode: 'any',
      title: 'CRM',
    },
  },
];
