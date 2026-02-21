import { Routes } from '@angular/router';

export const PROPERTIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/properties-list/properties-list.component').then(m => m.PropertiesListComponent)
  }
];
