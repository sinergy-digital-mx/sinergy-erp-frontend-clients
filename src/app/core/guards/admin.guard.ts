import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionService } from '../services/permission.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private permissionService: PermissionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Check if user is admin using PermissionService (reads from JWT)
    if (this.permissionService.isAdmin()) {
      return true;
    }

    // Redirect to leads if not admin
    this.router.navigate(['/leads']);
    return false;
  }
}
