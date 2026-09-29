import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isCostaCampestreDivino } from '../config/organizations.constants';
import { AuthService } from '../services/auth.service';

const BLOCKED_PATHS = ['/inventory', '/quotations', '/pos', '/pos/ventas', '/pos/cobranza', '/pos/pending-orders'];

/** Costa Campestre Divino no opera inventario, cotizaciones ni punto de venta. */
export const divinoInventoryGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!isCostaCampestreDivino(authService.user_info?.tenant_id)) {
    return true;
  }

  const fallback = authService.getFirstAccessibleRoute();
  router.navigateByUrl(fallback && !BLOCKED_PATHS.includes(fallback) ? fallback : '/customers');
  return false;
};
