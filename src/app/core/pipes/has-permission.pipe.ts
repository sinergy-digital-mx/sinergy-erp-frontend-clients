import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Pipe for checking user permissions in templates.
 * 
 * The hasPermission pipe checks if the authenticated user has a specific permission.
 * It is marked as impure (pure: false) to react to permission changes automatically.
 * 
 * Usage in templates:
 * ```html
 * <!-- Check if user has permission -->
 * <button *ngIf="'customers:Create' | hasPermission">Create Customer</button>
 * 
 * <!-- Use with variable -->
 * <div *ngIf="permission | hasPermission">
 *   User has permission
 * </div>
 * ```
 * 
 * The pipe performs case-insensitive entity matching:
 * - If permissions contain "customers:Create", the pipe returns true for:
 *   - "customers:Create"
 *   - "Customers:Create"
 *   - "CUSTOMERS:Create"
 *   - Any other case variation of the entity name
 * 
 * @example
 * // In component template
 * <button *ngIf="'customers:Delete' | hasPermission" (click)="deleteCustomer()">
 *   Delete Customer
 * </button>
 * 
 * @example
 * // With component property
 * <div *ngIf="requiredPermission | hasPermission">
 *   <p>You have the required permission</p>
 * </div>
 */
@Pipe({
  name: 'hasPermission',
  pure: false  // Impure to react to permission changes
})
export class HasPermissionPipe implements PipeTransform {
  /**
   * Creates an instance of HasPermissionPipe.
   * 
   * @param authService - The authentication service for permission checking
   */
  constructor(private authService: AuthService) {}

  /**
   * Transforms a permission string to a boolean indicating if the user has that permission.
   * 
   * @param permission - The permission string to check in format "entity:Action"
   * @returns true if the user has the permission, false otherwise
   * 
   * Example:
   * - If user has "customers:Create" permission, transform("customers:Create") returns true
   * - If user has "customers:Create" permission, transform("Customers:Create") returns true (case-insensitive entity)
   * - If user lacks "customers:Delete" permission, transform("customers:Delete") returns false
   */
  transform(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }
}
