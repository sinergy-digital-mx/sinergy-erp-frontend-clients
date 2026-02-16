import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { PermissionService } from '../services/permission.service';

/**
 * HasPermissionDirective
 * Structural directive to show/hide elements based on user permissions
 * 
 * Usage:
 * <div *appHasPermission="'Lead:Create'">Create Lead Button</div>
 * <div *appHasPermission="['Lead:Create', 'Lead:Update']">Edit Section</div>
 */
@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit {
  private permissions: string[] = [];

  @Input()
  set appHasPermission(permission: string | string[]) {
    this.permissions = Array.isArray(permission) ? permission : [permission];
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    if (this.permissionService.hasAnyPermission(this.permissions)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
