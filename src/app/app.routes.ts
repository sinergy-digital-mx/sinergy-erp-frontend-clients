import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedGuard } from './core/guards/logged.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { defaultRouteGuard } from './core/guards/default-route.guard';
import { posCobranzaGuard, posEntryRedirectGuard, posVentasGuard } from './core/guards/pos-user-type.guard';

export const routes: Routes = [
  // LOGIN (público)
  {
    path: 'login',
    canActivate: [LoggedGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(m => m.Login),
  },

  // POS - Tomar Orden y Cobrar Orden (pantalla completa, sin layout)
  {
    path: 'pos/pending-orders',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/pos/pages/pending-orders/pending-orders.component')
        .then(m => m.PendingOrdersComponent),
    data: { 
      permission: 'pos:Read',
      title: 'Órdenes Pendientes'
    }
  },
  {
    path: 'pos/payment',
    redirectTo: 'pos/cobranza',
    pathMatch: 'full',
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
        path: 'properties',
        loadChildren: () =>
          import('./features/properties/properties.routes')
            .then(m => m.PROPERTIES_ROUTES),
      },
      {
        path: 'contracts',
        loadChildren: () =>
          import('./features/contracts/contracts.routes')
            .then(m => m.CONTRACTS_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/rbac-tenant-ui/rbac-tenant-ui.routes')
            .then(m => m.RBAC_TENANT_UI_ROUTES),
      },
      {
        path: 'marketing',
        loadChildren: () =>
          import('./features/marketing/marketing.routes')
            .then(m => m.MARKETING_ROUTES),
      },
      {
        path: 'purchase-orders',
        loadChildren: () =>
          import('./features/purchase-orders/purchase-orders.routes')
            .then(m => m.PURCHASE_ORDERS_ROUTES),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./features/inventory/inventory.routes')
            .then(m => m.INVENTORY_ROUTES),
      },
      {
        path: 'sales-orders',
        loadChildren: () =>
          import('./features/sales-orders/sales-orders.routes')
            .then(m => m.SALES_ORDERS_ROUTES),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employees/employees.routes')
            .then(m => m.EMPLOYEES_ROUTES),
      },
      {
        path: 'employee-portal',
        loadChildren: () =>
          import('./features/employee-portal/employee-portal.routes')
            .then(m => m.EMPLOYEE_PORTAL_ROUTES),
      },
      {
        path: 'pos/ventas',
        canActivate: [posVentasGuard],
        loadComponent: () =>
          import('./features/pos/pages/take-order/take-order.component')
            .then(m => m.TakeOrderComponent),
        data: {
          permission: 'pos:Create',
          title: 'Punto de Venta'
        }
      },
      {
        path: 'pos/cobranza',
        canActivate: [posCobranzaGuard],
        loadComponent: () =>
          import('./features/pos/pages/payment/payment.component')
            .then(m => m.PaymentComponent),
        data: {
          permission: 'pos:Update',
          title: 'Cobranza POS'
        }
      },
      {
        path: 'pos',
        pathMatch: 'full',
        canActivate: [posEntryRedirectGuard],
        children: [],
      },
      {
        path: 'zona-norte-reports',
        loadChildren: () =>
          import('./features/zona-norte-reports/zona-norte-reports.routes')
            .then(m => m.ZONA_NORTE_REPORTS_ROUTES),
      },
      {
        path: 'accounting',
        loadChildren: () =>
          import('./features/accounting/accounting.routes')
            .then(m => m.ACCOUNTING_ROUTES),
      },
      {
        path: 'goals',
        redirectTo: 'settings/goals',
        pathMatch: 'full',
      },
      {
        path: 'global-discounts',
        redirectTo: 'settings/global-discounts',
        pathMatch: 'full',
      },

      {
        path: 'divino-dashboard',
        loadChildren: () =>
          import('./features/divino-dashboard/divino-dashboard.routes')
            .then(m => m.DIVINO_DASHBOARD_ROUTES),
      },
      {
        path: 'divino-reservation-formats',
        loadChildren: () =>
          import('./features/divino-reservation-formats/divino-reservation-formats.routes')
            .then(m => m.DIVINO_RESERVATION_FORMATS_ROUTES),
      },
      {
        path: '',
        canActivate: [defaultRouteGuard],
        children: []
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
