import { Routes } from '@angular/router';
import { permissionGuard } from '../../core/guards/permission.guard';
import { EMPLOYEE_PERMISSIONS } from './config/permissions.config';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [EMPLOYEE_PERMISSIONS.viewList],
      title: 'Empleados',
    },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/employee-detail/employee-detail.component').then(
        (m) => m.EmployeeDetailComponent
      ),
    canActivate: [permissionGuard],
    data: {
      permissions: [EMPLOYEE_PERMISSIONS.viewDetail],
      title: 'Detalle de Empleado',
    },
  },
];
