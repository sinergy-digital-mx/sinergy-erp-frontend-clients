import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DIVINO_TENANT_ID } from '../config/divino-reservation-formats.constants';
import { DIVINO_RESERVATION_FORMAT_PERMISSIONS } from '../config/permissions.config';

/** Restringe acceso al tenant Campestre Divino con permiso DivinoReservationFormat:Read. */
export const divinoReservationFormatsGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const tenantId = authService.user_info?.tenant_id;
  if (tenantId !== DIVINO_TENANT_ID) {
    router.navigate(['/']);
    return false;
  }

  if (!authService.hasPermission(DIVINO_RESERVATION_FORMAT_PERMISSIONS.read)) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
