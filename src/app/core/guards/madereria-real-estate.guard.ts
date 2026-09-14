import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isMadereriaZonaNorte } from '../config/organizations.constants';
import { AuthService } from '../services/auth.service';

/** Madereria Zona Norte no tiene lotes ni contratos inmobiliarios. */
export const madereriaRealEstateGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!isMadereriaZonaNorte(authService.user_info?.tenant_id)) {
    return true;
  }

  const fallback = authService.resolvePostLoginRoute();
  router.navigateByUrl(fallback && fallback !== '/properties' && fallback !== '/contracts' ? fallback : '/customers');
  return false;
};
