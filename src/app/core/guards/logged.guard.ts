import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private router: Router, private auth_service: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.auth_service.token;
    if (!token) {
      return true;
    }

    const firstRoute = this.auth_service.resolvePostLoginRoute();
    if (firstRoute) {
      this.router.navigate([firstRoute]);
      return false;
    }

    this.auth_service.redirectToLoginNoAccess();
    return false;
  }
}
