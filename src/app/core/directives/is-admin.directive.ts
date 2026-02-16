import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { PermissionService } from '../services/permission.service';

/**
 * IsAdminDirective
 * Structural directive to show/hide elements for admin users only
 * 
 * Usage:
 * <div *appIsAdmin>Admin Only Section</div>
 */
@Directive({
  selector: '[appIsAdmin]',
  standalone: true
})
export class IsAdminDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    if (this.permissionService.isAdmin()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
