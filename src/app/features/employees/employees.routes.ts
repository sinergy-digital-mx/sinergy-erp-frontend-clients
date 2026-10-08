import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { permissionGuard } from '../../core/guards/permission.guard';
import { AuthService } from '../../core/services/auth.service';
import { EMPLOYEE_PERMISSIONS } from './config/permissions.config';
import { EmployeeService } from './services/employee.service';

/** ViewOwn no entra al listado: va directo a su expediente. */
const ownEmployeeGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const employees = inject(EmployeeService);
  if (auth.hasPermission(EMPLOYEE_PERMISSIONS.viewList) || auth.hasAdminRole()) {
    return true;
  }
  return employees.getEmployees({}, { page: 1, limit: 1 }).pipe(
    map((res) => {
      const id = res.data?.[0]?.id;
      return id ? router.createUrlTree(['/employees', id]) : true;
    }),
    catchError(() => of(true)),
  );
};

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
    canActivate: [permissionGuard, ownEmployeeGuard],
    data: {
      permissions: [EMPLOYEE_PERMISSIONS.viewList, EMPLOYEE_PERMISSIONS.viewOwn],
      permissionMode: 'any',
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
      permissions: [EMPLOYEE_PERMISSIONS.viewDetail, EMPLOYEE_PERMISSIONS.viewOwn],
      permissionMode: 'any',
      title: 'Detalle de Empleado',
    },
  },
];
