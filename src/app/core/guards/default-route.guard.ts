import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard that redirects to the first accessible route based on user permissions.
 * Used for the default empty path redirect.
 */
export const defaultRouteGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const firstRoute = authService.getFirstAccessibleRoute();
  
  if (firstRoute) {
    router.navigate([firstRoute]);
  } else {
    console.error('No accessible routes found for user');
    router.navigate(['/login']);
  }
  
  return false;
};
