import { Routes } from '@angular/router';
import { divinoDashboardGuard } from './guards/divino-dashboard.guard';

export const DIVINO_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    canActivate: [divinoDashboardGuard],
    loadComponent: () =>
      import('./pages/divino-dashboard/divino-dashboard.component').then(
        (m) => m.DivinoDashboardComponent,
      ),
    data: { title: 'Divino Dashboard' },
  },
];
