import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { isVerduleria } from '../../core/config/organizations.constants';
import { permissionGuard } from '../../core/guards/permission.guard';
import { AuthService } from '../../core/services/auth.service';
import { PRICE_UPDATE_PERMISSIONS } from './config/permissions.config';

/** La hoja solo está prendida para la verdulería. */
export const verduleriaPriceUpdateGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (isVerduleria(auth.user_info?.tenant_id)) {
    return true;
  }
  const fallback = auth.getFirstAccessibleRoute();
  return router.createUrlTree([fallback || '/customers']);
};

export const PRICE_UPDATE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [verduleriaPriceUpdateGuard, permissionGuard],
    loadComponent: () =>
      import('./pages/price-update-page/price-update-page.component').then(
        (m) => m.PriceUpdatePageComponent,
      ),
    data: {
      permissions: [PRICE_UPDATE_PERMISSIONS.read, PRICE_UPDATE_PERMISSIONS.viewMenu],
      permissionMode: 'any',
      title: 'Actualización de precio',
    },
  },
];
