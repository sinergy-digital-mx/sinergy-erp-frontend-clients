import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Role, Module, RoleDefinition } from '../../models';

/**
 * RoleDetailsComponent
 * Presentational component for displaying role details and permissions
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5
 */
@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 space-y-6">
      <!-- Role Header -->
      <div>
        <h3 class="text-xl font-semibold text-gray-900">{{ role.name }}</h3>
        <p class="text-sm text-gray-600 mt-1">{{ role.description }}</p>
      </div>

      <!-- Permissions Section -->
      <div>
        <h4 class="text-sm font-medium text-gray-900 mb-4">Permissions</h4>
        
        <div *ngIf="(modules$ | async) as modules" class="space-y-4">
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

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4 border-t border-gray-200">
        <button
          (click)="onCancel()"
          class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          (click)="onSave()"
          [disabled]="!isModified()"
          [class.opacity-50]="!isModified()"
          [class.cursor-not-allowed]="!isModified()"
          class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:hover:bg-blue-600"
        >
          Save Changes
        </button>
        <button
          (click)="onDelete()"
          class="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class RoleDetailsComponent {
  /**
   * The role to display
   */
  @Input() role!: Role;

  /**
   * Observable stream of available modules with their permissions
   */
  @Input() modules$!: Observable<Module[]>;

  /**
   * Event emitted when role is saved
   */
  @Output() roleSaved = new EventEmitter<RoleDefinition>();

  /**
   * Event emitted when role is deleted
   */
  @Output() roleDeleted = new EventEmitter<string>();

  /**
   * Event emitted when form is cancelled
   */
  @Output() cancelled = new EventEmitter<void>();

  // Internal state
  expandedModules: Set<string> = new Set();
  selectedPermissions: Set<string> = new Set();
  originalPermissions: Set<string> = new Set();

  ngOnInit(): void {
    // Initialize selected permissions from role
    this.selectedPermissions = new Set(this.role.permissions);
    this.originalPermissions = new Set(this.role.permissions);
  }

  /**
   * Toggles the expansion state of a module
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
   */
  isModuleExpanded(moduleId: string): boolean {
    return this.expandedModules.has(moduleId);
  }

  /**
   * Toggles the selection state of a permission
   */
  togglePermission(permissionId: string): void {
    if (this.selectedPermissions.has(permissionId)) {
      this.selectedPermissions.delete(permissionId);
    } else {
      this.selectedPermissions.add(permissionId);
    }
  }

  /**
   * Checks if a permission is selected
   */
  isPermissionSelected(permissionId: string): boolean {
    return this.selectedPermissions.has(permissionId);
  }

  /**
   * Checks if the role has been modified
   */
  isModified(): boolean {
    if (this.selectedPermissions.size !== this.originalPermissions.size) {
      return true;
    }
    
    for (const permission of this.selectedPermissions) {
      if (!this.originalPermissions.has(permission)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Handles form cancellation
   */
  onCancel(): void {
    this.selectedPermissions = new Set(this.originalPermissions);
    this.cancelled.emit();
  }

  /**
   * Handles form submission
   */
  onSave(): void {
    if (!this.isModified()) {
      return;
    }

    const roleDefinition: RoleDefinition = {
      name: this.role.name,
      description: this.role.description,
      permissions: Array.from(this.selectedPermissions)
    };

    this.roleSaved.emit(roleDefinition);
  }

  /**
   * Handles role deletion
   */
  onDelete(): void {
    this.roleDeleted.emit(this.role.id);
  }
}
