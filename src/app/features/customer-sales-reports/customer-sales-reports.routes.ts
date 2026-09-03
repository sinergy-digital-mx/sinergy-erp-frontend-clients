import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { CUSTOMER_SALES_REPORT_PERMISSIONS } from './config/permissions.config';

export const CUSTOMER_SALES_REPORTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/customer-sales-report/customer-sales-report.component').then(
        (m) => m.CustomerSalesReportComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [CUSTOMER_SALES_REPORT_PERMISSIONS.read, CUSTOMER_SALES_REPORT_PERMISSIONS.viewMenu],
      permissionMode: 'any',
      title: 'Reporte de ventas clientes',
    },
  },
];
