import { Routes } from '@angular/router';
import { madereriaRealEstateGuard } from '../../core/guards/madereria-real-estate.guard';
import { permissionGuard } from '../../core/guards/permission.guard';
import { PROPERTY_PERMISSIONS } from './config/permissions.config';

export const PROPERTIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/properties-list/properties-list.component').then(m => m.PropertiesListComponent),
    canActivate: [madereriaRealEstateGuard, permissionGuard],
    data: {
      permissions: [PROPERTY_PERMISSIONS.viewList]
    }
  }
];
