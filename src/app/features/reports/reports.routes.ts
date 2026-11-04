import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { isMadereriaZonaNorte } from '../../core/config/organizations.constants';
import { permissionGuard } from '../../core/guards/permission.guard';
import { AuthService } from '../../core/services/auth.service';
import { REPORTS_PERMISSIONS } from './config/permissions.config';

/** Reporte de requerimiento solo está prendido para Madereria Zona Norte. */
export const madereriaReportsGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (isMadereriaZonaNorte(auth.user_info?.tenant_id)) {
    return true;
  }
  const fallback = auth.getFirstAccessibleRoute();
  return router.createUrlTree([fallback || '/customers']);
};

export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [madereriaReportsGuard, permissionGuard],
    loadComponent: () =>
      import('./pages/stock-replenishment/stock-replenishment-page.component').then(
        (m) => m.StockReplenishmentPageComponent,
      ),
    data: {
      permissions: [REPORTS_PERMISSIONS.read, REPORTS_PERMISSIONS.viewMenu],
      permissionMode: 'any',
      title: 'Reporte de requerimiento',
    },
  },
];
