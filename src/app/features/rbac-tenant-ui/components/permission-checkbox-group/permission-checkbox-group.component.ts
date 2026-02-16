import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Module } from '../../models';

/**
 * PermissionCheckboxGroupComponent
 * Presentational component for displaying module-grouped permission checkboxes
 * 
 * Requirements: 17.1, 17.2, 17.3, 17.4, 17.5
 */
@Component({
  selector: 'app-permission-checkbox-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <div *ngIf="(modules$ | async) as modules">
        <div *ngFor="let module of modules" class="border border-gray-200 rounded-lg p-4">
          <!-- Module Header -->
          <button
            (click)="toggleModule(module.id)"
            class="w-full text-left flex items-center justify-between hover:bg-gray-50 p-2 rounded"
          >
            <span class="font-medium text-gray-900">{{ module.name }}</span>
            <span class="text-gray-500">
              {{ isModuleExpanded(module.id) ? '▼' : '▶' }}
            </span>
          </button>

          <!-- Module Permissions -->
          <div *ngIf="isModuleExpanded(module.id)" class="mt-3 space-y-2 pl-4">
            <div *ngFor="let permission of module.permissions" class="flex items-center">
              <input
                type="checkbox"
                [id]="permission.id"
                [checked]="isPermissionSelected(permission.id)"
                (change)="togglePermission(permission.id)"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label [for]="permission.id" class="ml-2 block text-sm text-gray-700">
                {{ permission.displayName }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PermissionCheckboxGroupComponent implements OnInit {
  /**
   * Observable stream of modules with their permissions
   */
  @Input() modules$!: Observable<Module[]>;

  /**
   * Observable stream of selected permission IDs
   */
  @Input() selectedPermissions$!: Observable<string[]>;

  /**
   * Event emitted when permissions are changed
   */
  @Output() permissionsChanged = new EventEmitter<string[]>();

  // Internal state
  expandedModules: Set<string> = new Set();
  selectedPermissions: Set<string> = new Set();

  ngOnInit(): void {
    // Subscribe to selected permissions observable
    if (this.selectedPermissions$) {
      this.selectedPermissions$.subscribe(permissions => {
        this.selectedPermissions = new Set(permissions);
      });
    }
  }

  /**
   * Toggles the expansion state of a module
   * @param moduleId - The ID of the module to toggle
   */
  toggleModule(moduleId: string): void {
    if (this.expandedModules.has(moduleId)) {
      this.expandedModules.delete(moduleId);
    } else {
      this.expandedModules.add(moduleId);
    }
  }

  /**
   * Checks if a module is expanded
   * @param moduleId - The ID of the module
   * @returns true if the module is expanded
   */
  isModuleExpanded(moduleId: string): boolean {
    return this.expandedModules.has(moduleId);
  }

  /**
   * Toggles the selection state of a permission
   * @param permissionId - The ID of the permission to toggle
   */
  togglePermission(permissionId: string): void {
    if (this.selectedPermissions.has(permissionId)) {
      this.selectedPermissions.delete(permissionId);
    } else {
      this.selectedPermissions.add(permissionId);
    }
    
    // Emit the updated permissions
    this.permissionsChanged.emit(Array.from(this.selectedPermissions));
  }

  /**
   * Checks if a permission is selected
   * @param permissionId - The ID of the permission
   * @returns true if the permission is selected
   */
  isPermissionSelected(permissionId: string): boolean {
    return this.selectedPermissions.has(permissionId);
  }
}
