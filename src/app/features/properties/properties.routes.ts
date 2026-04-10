import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { PROPERTY_PERMISSIONS } from './config/permissions.config';

export const PROPERTIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/properties-list/properties-list.component').then(m => m.PropertiesListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [PROPERTY_PERMISSIONS.viewList]
    }
  }
];
