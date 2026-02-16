import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

interface PermissionObject {
  id: string;
  action: string;
  description: string;
}

/**
 * PermissionService
 * Centralized permission management based on JWT token
 * No hardcoding - all permissions come from backend via JWT
 * 
 * Handles both permission formats:
 * 1. Flat array: ["leads:Create", "customers:Read"]
 * 2. Object structure: { "Leads": [{action: "Create"}, ...], "Customers": [...] }
 */
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private authService: AuthService) {}

  /**
   * Get all permissions in flat format
   * @returns Array of permission strings
   */
  private getFlatPermissions(): string[] {
    const permissions = this.authService.user_info?.permissions;
    
    // If permissions is already an array, return it
    if (Array.isArray(permissions)) {
      return permissions;
    }
    
    // If permissions is an object with modules, flatten it
    if (permissions && typeof permissions === 'object') {
      const flat: string[] = [];
      for (const [module, actions] of Object.entries(permissions)) {
        if (Array.isArray(actions)) {
          actions.forEach((action: any) => {
            const actionStr = action.action || action;
            flat.push(`${module}:${actionStr}`);
          });
        }
      }
      return flat;
    }
    
    return [];
  }

  /**
   * Check if user has a specific permission
   * @param permission - Permission string (e.g., 'leads:Create', 'Leads:Create')
   * @returns true if user has permission
   */
  hasPermission(permission: string): boolean {
    const flatPermissions = this.getFlatPermissions();
    // Case-insensitive comparison
    return flatPermissions.some(p => p.toLowerCase() === permission.toLowerCase());
  }

  /**
   * Check if user has any of the given permissions
   * @param permissions - Array of permission strings
   * @returns true if user has at least one permission
   */
  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }

  /**
   * Check if user has all of the given permissions
   * @param permissions - Array of permission strings
   * @returns true if user has all permissions
   */
  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(p => this.hasPermission(p));
  }

  /**
   * Check if user has admin role
   * @returns true if user has admin role
   */
  isAdmin(): boolean {
    return this.authService.user_info?.hasAdminRole ?? false;
  }

  /**
   * Check if user has a specific role
   * @param roleName - Role name (e.g., 'Admin', 'Sales Representative')
   * @returns true if user has role
   */
  hasRole(roleName: string): boolean {
    const roles = this.authService.user_info?.roles || [];
    if (Array.isArray(roles) && roles.length > 0) {
      // If roles is array of strings
      if (typeof roles[0] === 'string') {
        return (roles as unknown as string[]).some(r => r.toLowerCase() === roleName.toLowerCase());
      }
      // If roles is array of objects with 'name' property
      return (roles as unknown as any[]).some((role: any) => 
        (role.name || role).toLowerCase() === roleName.toLowerCase()
      );
    }
    return false;
  }

  /**
   * Get all user permissions in flat format
   * @returns Array of permission strings (e.g., ['Leads:Create', 'Customers:Read'])
   */
  getPermissions(): string[] {
    return this.getFlatPermissions();
  }

  /**
   * Get permissions grouped by module
   * @returns Object with modules as keys and permission arrays as values
   */
  getPermissionsByModule(): Record<string, PermissionObject[]> {
    const permissions = this.authService.user_info?.permissions;
    
    if (permissions && typeof permissions === 'object' && !Array.isArray(permissions)) {
      return permissions as Record<string, PermissionObject[]>;
    }
    
    return {};
  }

  /**
   * Get all user roles
   * @returns Array of role names
   */
  getRoles(): string[] {
    const roles = this.authService.user_info?.roles || [];
    if (Array.isArray(roles) && roles.length > 0) {
      if (typeof roles[0] === 'string') {
        return roles as unknown as string[];
      }
      return (roles as unknown as any[]).map((role: any) => role.name || role);
    }
    return [];
  }

  /**
   * Check if user can access settings (admin only)
   * @returns true if user can access settings
   */
  canAccessSettings(): boolean {
    return this.isAdmin();
  }

  /**
   * Check if user can manage users
   * @returns true if user can manage users
   */
  canManageUsers(): boolean {
    return this.isAdmin();
  }

  /**
   * Check if user can manage roles
   * @returns true if user can manage roles
   */
  canManageRoles(): boolean {
    return this.isAdmin();
  }

  /**
   * Check if user can view reports
   * @returns true if user can view reports
   */
  canViewReports(): boolean {
    return this.hasPermission('Reports:Read');
  }

  /**
   * Check if user can create leads
   * @returns true if user can create leads
   */
  canCreateLeads(): boolean {
    return this.hasPermission('Leads:Create');
  }

  /**
   * Check if user can edit leads
   * @returns true if user can edit leads
   */
  canEditLeads(): boolean {
    return this.hasPermission('Leads:Edit');
  }

  /**
   * Check if user can delete leads
   * @returns true if user can delete leads
   */
  canDeleteLeads(): boolean {
    return this.hasPermission('Leads:Delete');
  }

  /**
   * Check if user can export data
   * @returns true if user can export data
   */
  canExport(): boolean {
    return this.hasAnyPermission(['Leads:Export', 'Customers:Export']);
  }
}
