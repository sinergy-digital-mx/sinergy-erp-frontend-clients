import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { VEXIA_TENANT_ID } from '../config/service-subscription.constants';
import { SERVICE_SUBSCRIPTION_PERMISSIONS } from '../config/permissions.config';

export const serviceSubscriptionGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.user_info?.tenant_id !== VEXIA_TENANT_ID) {
    router.navigate(['/']);
    return false;
  }
  if (!authService.hasPermission(SERVICE_SUBSCRIPTION_PERMISSIONS.read)) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
