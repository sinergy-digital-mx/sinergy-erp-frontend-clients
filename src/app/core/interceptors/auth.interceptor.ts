import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { isPublicApiRequest } from '../http/skip-auth.context';

function isPermissionsChanged(error: HttpErrorResponse): boolean {
  return (
    error.status === 401 &&
    (error.error?.error === 'PERMISSIONS_CHANGED' ||
      error.error?.code === 'PERMISSIONS_CHANGED' ||
      error.error?.message === 'PERMISSIONS_CHANGED')
  );
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const publicRequest = isPublicApiRequest(req);

  // Portal público: sin Bearer. El resto anexa token si existe.
  if (publicRequest) {
    if (req.headers.has('Authorization')) {
      req = req.clone({ headers: req.headers.delete('Authorization') });
    }
  } else {
    const token = authService.token;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (isPermissionsChanged(error) && !publicRequest) {
        console.log('🔄 Permissions changed detected, refreshing token...');
        
        // Call refresh endpoint to get new token
        return authService.refresh().pipe(
          switchMap(() => {
            const newToken = authService.token;
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            
            return next(clonedRequest);
          }),
          catchError((refreshError) => {
            console.error('❌ Error refreshing token:', refreshError);
            // If refresh fails, logout user
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      
      // For other errors, just pass them through
      return throwError(() => error);
    })
  );
};
