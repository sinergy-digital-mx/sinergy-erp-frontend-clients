import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  // LOGIN (público)
  {
    path: 'login',
    canActivate: [LoggedGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(m => m.Login),
  },

  // APP PROTEGIDA
  {
    path: '',
    component: MainLayout,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'leads',
        loadChildren: () =>
          import('./features/leads/leads.routes')
            .then(m => m.LEADS_ROUTES),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customers/customers.routes')
            .then(m => m.CUSTOMERS_ROUTES),
      },
      {
        path: '',
        redirectTo: 'leads',
        pathMatch: 'full',
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
