import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private router: Router, private auth_service: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = this.auth_service.token  
    if (token) {
      // User is logged in, redirect to first accessible route
      const firstRoute = this.auth_service.getFirstAccessibleRoute();
      if (firstRoute) {
        this.router.navigate([firstRoute]);
      } else {
        // No accessible routes, stay on login and show error
        console.error('User has no accessible routes');
      }
      return false;
    }

    return true;
  }
}
