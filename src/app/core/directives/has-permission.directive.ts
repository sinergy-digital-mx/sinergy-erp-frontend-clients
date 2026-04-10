import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

/**
 * Structural directive to conditionally show/hide elements based on user permissions.
 * 
 * Usage:
 * 
 * Single permission:
 * <button *hasPermission="'customers:Create'">Create</button>
 * <button *hasPermission="CUSTOMER_PERMISSIONS.create">Create</button>
 * 
 * Multiple permissions (ALL required):
 * <button *hasPermission="['customers:Read', 'customers:Update']">Bulk Edit</button>
 * <button *hasPermission="CUSTOMER_PERMISSIONS.bulkEdit">Bulk Edit</button>
 * 
 * Multiple permissions (ANY required):
 * <button *hasPermission="['customers:Create', 'customers:Update']; mode: 'any'">Edit or Create</button>
 */
@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  @Input() hasPermission: string | string[];
  @Input() hasPermissionMode: 'all' | 'any' = 'all';
  
  private permissionsSubscription?: Subscription;
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to permission changes to update view reactively
    this.permissionsSubscription = this.authService.permissions$.subscribe(() => {
      this.updateView();
    });
  }

  ngOnDestroy() {
    this.permissionsSubscription?.unsubscribe();
  }

  private updateView() {
    const hasAccess = this.checkPermissions();
    
    if (hasAccess && !this.hasView) {
      // User has permission and view is not shown - show it
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasAccess && this.hasView) {
      // User doesn't have permission and view is shown - hide it
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  private checkPermissions(): boolean {
    if (!this.hasPermission) {
      return true; // No permission specified, show by default
    }

    const permissions = Array.isArray(this.hasPermission) 
      ? this.hasPermission 
      : [this.hasPermission];

    if (this.hasPermissionMode === 'any') {
      // User needs at least ONE of the permissions
      return permissions.some(p => this.authService.hasPermission(p));
    } else {
      // User needs ALL permissions (default)
      return permissions.every(p => this.authService.hasPermission(p));
    }
  }
}
