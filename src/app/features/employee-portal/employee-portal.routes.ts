import { Routes } from '@angular/router';

export const EMPLOYEE_PORTAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/employee-portal/employee-portal.component').then(
        (m) => m.EmployeePortalComponent
      ),
    data: { title: 'Portal de empleado' },
  },
];
