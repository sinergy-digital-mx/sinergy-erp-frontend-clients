import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DIVINO_DASHBOARD_TENANT_ID } from '../config/divino-dashboard.constants';
import { DIVINO_DASHBOARD_PERMISSIONS } from '../config/permissions.config';

/** Restringe acceso al tenant Campestre Divino con permiso divinodashboard:Read. */
export const divinoDashboardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const tenantId = authService.user_info?.tenant_id;
  if (tenantId !== DIVINO_DASHBOARD_TENANT_ID) {
    router.navigate(['/']);
    return false;
  }

  if (!authService.hasPermission(DIVINO_DASHBOARD_PERMISSIONS.read)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
