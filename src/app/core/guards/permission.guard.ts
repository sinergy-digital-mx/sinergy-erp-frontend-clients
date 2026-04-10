import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Generic permission guard that reads required permissions from route data.
 * 
 * Usage in routes:
 * 
 * {
 *   path: 'customers',
 *   component: CustomersListComponent,
 *   canActivate: [permissionGuard],
 *   data: { 
 *     permissions: ['customers:Read']  // Single or multiple permissions
 *   }
 * }
 * 
 * Multiple permissions (ALL required by default):
 * data: { permissions: ['customers:Read', 'customers:Update'] }
 * 
 * Multiple permissions (ANY required):
 * data: { 
 *   permissions: ['customers:Create', 'customers:Update'],
 *   permissionMode: 'any'
 * }
 */
export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const requiredPermissions = route.data['permissions'] as string[] | string | undefined;
  const permissionMode = route.data['permissionMode'] as 'all' | 'any' | undefined;
  
  // If no permissions specified, allow access
  if (!requiredPermissions) {
    return true;
  }
  
  // Normalize to array
  const permissions = Array.isArray(requiredPermissions) 
    ? requiredPermissions 
    : [requiredPermissions];
  
  // Check permissions based on mode
  let hasAccess: boolean;
  if (permissionMode === 'any') {
    // User needs at least ONE permission
    hasAccess = permissions.some(p => authService.hasPermission(p));
  } else {
    // User needs ALL permissions (default)
    hasAccess = permissions.every(p => authService.hasPermission(p));
  }
  
  if (!hasAccess) {
    console.warn(`Access denied to /${route.url.join('/')}. Required permissions:`, permissions);
    console.warn('User permissions:', Array.from(authService.permissions$.getValue()));
    
    // TEMPORARY: Allow access anyway for development
    // TODO: Remove this once backend permissions are in English format
    console.warn('⚠️ ALLOWING ACCESS ANYWAY (temporary for development)');
    return true;
    
    // Don't redirect - just block access
    // The router will handle finding an accessible route
    // return false;
  }
  
  return true;
};
