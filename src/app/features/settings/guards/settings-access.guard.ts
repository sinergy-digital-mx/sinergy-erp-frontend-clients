import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SETTINGS_PERMISSIONS } from '../config/permissions.config';

/** Menú Configuración y catálogo de productos/proveedores. */
export function canShowSettings(authService: AuthService): boolean {
  return authService.hasPermission(SETTINGS_PERMISSIONS.viewMenu);
}

export const settingsAccessGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (canShowSettings(authService)) {
    return true;
  }

  if (authService.isEmployeeUser()) {
    return router.createUrlTree(['/employee-portal']);
  }

  const fallback = authService.getFirstAccessibleRoute();
  if (fallback && !fallback.startsWith('/settings')) {
    return router.createUrlTree([fallback]);
  }

  return router.createUrlTree(['/']);
};
