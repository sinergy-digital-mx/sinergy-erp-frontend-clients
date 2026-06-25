import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/** Redirige /pos → /pos/ventas o /pos/cobranza según pos_user_type. */
export const posEntryRedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensurePosProfile().pipe(
    map(() => {
      if (auth.getPosUserType() === 'COBRANZA') {
        return router.createUrlTree(['/pos/cobranza']);
      }
      return router.createUrlTree(['/pos/ventas']);
    })
  );
};

/** Solo terminales VENTAS. COBRANZA → /pos/cobranza. */
export const posVentasGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensurePosProfile().pipe(
    map(() => {
      if (auth.getPosUserType() === 'COBRANZA') {
        return router.createUrlTree(['/pos/cobranza']);
      }
      return true;
    })
  );
};

/** Solo terminales COBRANZA. VENTAS → /pos/ventas. */
export const posCobranzaGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensurePosProfile().pipe(
    map(() => {
      if (auth.getPosUserType() === 'VENTAS') {
        return router.createUrlTree(['/pos/ventas']);
      }
      return true;
    })
  );
};
