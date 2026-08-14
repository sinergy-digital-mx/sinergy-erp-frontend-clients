import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * /pos: si puede vender y cobrar, deja el hub (ambas opciones).
 * Si solo cobra → /pos/cobranza. Si solo vende → /pos/ventas.
 */
export const posEntryRedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensurePosProfile().pipe(
    map(() => {
      if (auth.canPosSell() && auth.canPosCollect()) {
        return true;
      }
      if (auth.canPosCollect()) {
        return router.createUrlTree(['/pos/cobranza']);
      }
      if (auth.canPosSell()) {
        return router.createUrlTree(['/pos/ventas']);
      }
      return router.createUrlTree(['/pos/ventas']);
    })
  );
};

/** Permite Ventas si pos_can_sell. Solo cobranza → /pos/cobranza. */
export const posVentasGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensurePosProfile().pipe(
    map(() => {
      if (auth.canPosSell()) {
        return true;
      }
      if (auth.canPosCollect()) {
        return router.createUrlTree(['/pos/cobranza']);
      }
      return true;
    })
  );
};

/** Permite Cobranza si pos_can_collect. Solo ventas → /pos/ventas. */
export const posCobranzaGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensurePosProfile().pipe(
    map(() => {
      if (auth.canPosCollect()) {
        return true;
      }
      if (auth.canPosSell()) {
        return router.createUrlTree(['/pos/ventas']);
      }
      return true;
    })
  );
};
