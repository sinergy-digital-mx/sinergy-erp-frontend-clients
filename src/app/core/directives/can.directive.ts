import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * Configuration object for permission checking with action and entity.
 * Used for the object syntax of the appCan directive.
 * 
 * Example:
 * { action: 'Create', entity: 'customers' }
 */
interface PermissionCheckConfig {
  action: string;  // PascalCase: Create, Read, Update, Delete, Download, Export, Edit
  entity: string;  // lowercase entity name
}

/**
 * Union type for the appCan directive input.
 * Supports three different syntaxes for specifying permissions:
 * 
 * 1. Object syntax: { action: 'Create', entity: 'customers' }
 *    - Checks for a single permission with explicit action and entity
 * 
 * 2. String syntax: 'customers:Create'
 *    - Checks for a single permission in "entity:Action" format
 * 
 * 3. Array syntax: ['customers:Create', 'customers:Update']
 *    - Checks for multiple permissions with OR logic (renders if user has ANY permission)
 */
type CanInput = 
  | PermissionCheckConfig                    // { action: 'Create', entity: 'customers' }
  | string                                   // 'customers:Create'
  | string[];                                // ['customers:Create', 'customers:Update']

/**
 * Structural directive for conditional rendering based on user permissions.
 * 
 * The appCan directive controls element visibility based on the authenticated user's permissions.
 * It completely removes elements from the DOM when permissions are not met (not just hiding with CSS).
 * 
 * Supports three input syntaxes:
 * 1. Object syntax: *appCan="{ action: 'Create', entity: 'customers' }"
 * 2. String syntax: *appCan="'customers:Create'"
 * 3. Array syntax: *appCan="['customers:Create', 'customers:Update']"
 * 
 * The directive subscribes to the AuthService's permissions$ observable and updates
 * element visibility reactively when permissions change.
 * 
 * Example usage:
 * ```html
 * <!-- Object syntax -->
 * <button *appCan="{ action: 'Create', entity: 'customers' }">Create Customer</button>
 * 
 * <!-- String syntax -->
 * <button *appCan="'customers:Create'">Create Customer</button>
 * 
 * <!-- Array syntax (OR logic) -->
 * <button *appCan="['customers:Create', 'customers:Update']">Create or Update</button>
 * ```
 * 
 * @example
 * // In component template
 * <div *appCan="{ action: 'Delete', entity: 'customers' }">
 *   <button (click)="deleteCustomer()">Delete</button>
 * </div>
 * 
 * @example
 * // With string syntax
 * <div *appCan="'customers:Delete'">
 *   <button (click)="deleteCustomer()">Delete</button>
 * </div>
 * 
 * @example
 * // With array syntax (OR logic)
 * <div *appCan="['customers:Read', 'customers:Update']">
 *   <p>You can read or update customers</p>
 * </div>
 */
@Directive({
  selector: '[appCan]'
})
export class CanDirective implements OnInit, OnDestroy {
  /**
   * Input property for the appCan directive.
   * Accepts three different syntaxes for specifying permissions.
   * 
   * @param value - The permission specification (object, string, or array)
   */
  @Input() set appCan(value: CanInput) {
    this._canInput = value;
    this.updateView();
  }

  private _canInput: CanInput;
  private destroy$ = new Subject<void>();

  /**
   * Creates an instance of CanDirective.
   * 
   * @param templateRef - Reference to the template element
   * @param viewContainer - Reference to the view container for DOM manipulation
   * @param authService - The authentication service for permission checking
   */
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  /**
   * Angular lifecycle hook called after the directive is initialized.
   * Subscribes to the permissions$ observable to react to permission changes.
   */
  ngOnInit(): void {
    // Subscribe to permission changes and update view whenever permissions change
    this.authService.permissions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateView();
      });
  }

  /**
   * Angular lifecycle hook called when the directive is destroyed.
   * Cleans up subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Updates the view based on current permissions.
   * Renders the element if the user has the required permission(s),
   * otherwise removes it from the DOM.
   * 
   * @private
   */
  private updateView(): void {
    const hasPermission = this.checkPermission();
    
    if (hasPermission) {
      // Render the element
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Remove the element from DOM
      this.viewContainer.clear();
    }
  }

  /**
   * Checks if the user has the required permission(s).
   * Normalizes the input to a string array and checks permissions.
   * 
   * For array inputs, uses OR logic (returns true if user has ANY permission).
   * For single permission inputs, returns true only if user has that permission.
   * 
   * @private
   * @returns true if the user has the required permission(s), false otherwise
   */
  private checkPermission(): boolean {
    const permissions = this.normalizePermissions(this._canInput);
    
    // OR logic: return true if user has ANY of the permissions
    return permissions.some(permission => this.authService.hasPermission(permission));
  }

  /**
   * Normalizes the directive input to a string array of permissions.
   * Converts all three input syntaxes to a consistent string array format.
   * 
   * @private
   * @param input - The permission specification (object, string, or array)
   * @returns Array of permission strings in "entity:Action" format
   * 
   * Examples:
   * - { action: 'Create', entity: 'customers' } → ['customers:Create']
   * - 'customers:Create' → ['customers:Create']
   * - ['customers:Create', 'customers:Update'] → ['customers:Create', 'customers:Update']
   */
  private normalizePermissions(input: CanInput): string[] {
    if (Array.isArray(input)) {
      // Array syntax: already an array of strings
      return input;
    } else if (typeof input === 'string') {
      // String syntax: wrap in array
      return [input];
    } else if (input && typeof input === 'object') {
      // Object syntax: construct permission string from action and entity
      const config = input as PermissionCheckConfig;
      const permission = `${config.entity}:${config.action}`;
      return [permission];
    }
    
    // Fallback for invalid input
    return [];
  }
}
