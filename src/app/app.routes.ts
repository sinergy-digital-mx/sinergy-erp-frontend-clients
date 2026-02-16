import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedGuard } from './core/guards/logged.guard';
import { AdminGuard } from './core/guards/admin.guard';

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
    canActivate: [AuthGuard],
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
        path: 'settings',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./features/rbac-tenant-ui/rbac-tenant-ui.routes')
            .then(m => m.RBAC_TENANT_UI_ROUTES),
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
