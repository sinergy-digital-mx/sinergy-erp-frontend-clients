import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InterceptorService } from '../services/interceptor.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const interceptorService = inject(InterceptorService);

  // Add authorization header if token exists
  const token = authService.token;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Check if error is 401 with PERMISSIONS_CHANGED
      if (error.status === 401 && error.error?.error === 'PERMISSIONS_CHANGED') {
        console.log('🔄 Permissions changed detected, refreshing token...');
        
        // Call refresh endpoint to get new token
        return authService.refresh().pipe(
          switchMap((response: any) => {
            console.log('✅ Token refreshed successfully');
            
            // Show notification to user
            interceptorService.openSnackbar({
              type: 'info',
              title: 'Permisos Actualizados',
              message: 'Tus permisos han sido actualizados'
            });
            
            // Retry the original request with new token
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
